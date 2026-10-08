import { useEffect, useRef, type KeyboardEvent } from 'react';

export type LightboxItem = { src: string; alt: string; caption?: string };

type Props = {
  items: LightboxItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
};

export default function Lightbox({ items, index, onIndex, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const item = items[index];
  const go = (d: number) => onIndex((index + d + items.length) % items.length);

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

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'Tab') {
      // Trap focus inside the dialog.
      const f = ref.current!.querySelectorAll<HTMLElement>('button');
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  return (
    <div
      ref={ref}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" className="lb-close" data-close onClick={onClose}>
        Close
      </button>
      <figure className="lb-figure">
        <img src={item.src} alt={item.alt} />
        <figcaption>
          <span>{item.caption ?? item.alt}</span>
          <span className="muted">
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>
      {items.length > 1 && (
        <>
          <button type="button" className="lb-nav lb-prev" aria-label="Previous image" onClick={() => go(-1)}>
            ←
          </button>
          <button type="button" className="lb-nav lb-next" aria-label="Next image" onClick={() => go(1)}>
            →
          </button>
        </>
      )}
    </div>
  );
}
