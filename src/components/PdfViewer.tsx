import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

type Props = { src: string; title: string; onClose: () => void };

// Shows a PDF on top of the page. Pages are drawn with pdf.js, so it works even in
// browsers without a built-in PDF viewer (VS Code, in-app browsers, iOS).
// pdf.js is only downloaded when the viewer is opened.
export default function PdfViewer({ src, title, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  // Focus, scroll lock, and restoring focus on close.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('[data-close]')?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, []);

  // Render every page of the PDF into a canvas.
  useEffect(() => {
    let cancelled = false;
    let destroy: (() => void) | undefined;
    const box = pagesRef.current!;

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        const { default: workerSrc } = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

        const task = pdfjs.getDocument(src);
        destroy = () => void task.destroy();
        const doc = await task.promise;
        const width = box.clientWidth;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let n = 1; n <= doc.numPages; n++) {
          const page = await doc.getPage(n);
          if (cancelled) return;
          const scale = width / page.getViewport({ scale: 1 }).width;
          const viewport = page.getViewport({ scale: scale * dpr });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.setAttribute('role', 'img');
          canvas.setAttribute('aria-label', `${title}, page ${n} of ${doc.numPages}`);
          box.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise;
        }
        if (!cancelled) setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      destroy?.();
      box.replaceChildren();
    };
  }, [src, title]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'Tab') {
      // Keep focus inside the viewer's toolbar.
      const f = ref.current!.querySelectorAll<HTMLElement>('a, button');
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  return (
    <div
      ref={ref}
      className="pdf-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="pdf-panel">
        <div className="pdf-bar">
          <span className="pdf-title">{title}</span>
          <a href={src} download>Download</a>
          <a href={src} target="_blank" rel="noreferrer">Open in new tab ↗</a>
          <button type="button" data-close onClick={onClose}>Close</button>
        </div>
        <div className="pdf-scroll">
          {status === 'loading' && <p className="pdf-status">Loading…</p>}
          {status === 'error' && (
            <p className="pdf-status">
              Couldn't display the PDF here.{' '}
              <a href={src} target="_blank" rel="noreferrer">Open it in a new tab</a>.
            </p>
          )}
          <div ref={pagesRef} className="pdf-pages" />
        </div>
      </div>
    </div>
  );
}
