import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { asset } from '../asset';
import s from './PhotoStack.module.css';

type Photo = { src: string; alt: string };

// Offsets for each layer under the top print, so the pile's edges show.
const LAYERS = [
  { x: 0, y: 0, r: 0 },
  { x: 3, y: 2, r: 1.2 },
  { x: -3, y: 3, r: -0.9 },
  { x: 2, y: -3, r: 1.5 },
  { x: -4, y: -2, r: -1.3 },
  { x: 4, y: 4, r: 0.7 },
];
const DURATION = 350;
const OUT = 'translate(-50%, -50%) translateX(110%) rotate(6deg)';

export default function PhotoStack({ photos }: { photos: Photo[] }) {
  const n = photos.length;
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const busy = useRef(false);
  const timer = useRef<number>();
  const startX = useRef<number | null>(null);
  const swiped = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Preload the photo that will be on top next.
  useEffect(() => {
    const next = photos[order[1]];
    if (next) new Image().src = asset(next.src);
  }, [order, photos]);

  const next = () => {
    if (busy.current || n < 2) return;
    const rotate = () => setOrder((o) => [...o.slice(1), o[0]]);
    if (reduced) return rotate();
    busy.current = true;
    setPhase('out');
    timer.current = window.setTimeout(() => {
      rotate();
      setPhase('idle');
      busy.current = false;
    }, DURATION);
  };

  const prev = () => {
    if (busy.current || n < 2) return;
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
    if (reduced) return;
    // Place the incoming photo off to the side instantly, then slide it in.
    busy.current = true;
    setPhase('in');
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setPhase('idle');
        timer.current = window.setTimeout(() => (busy.current = false), DURATION);
      }),
    );
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const onPointerDown = (e: PointerEvent) => { startX.current = e.clientX; };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) {
      swiped.current = true;
      dx < 0 ? prev() : next();
    }
  };
  const onClick = () => {
    if (swiped.current) { swiped.current = false; return; }
    next();
  };

  const top = photos[order[0]];
  const nextNum = (order[1] ?? order[0]) + 1;

  return (
    <figure className={s.root}>
      <button
        type="button"
        className={s.panel}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
        aria-label={`Next photo, ${nextNum} of ${n}`}
      >
        {photos.map((p, i) => {
          const pos = order.indexOf(i);
          const L = LAYERS[Math.min(pos, LAYERS.length - 1)];
          const isTop = pos === 0;
          const out = isTop && phase !== 'idle';
          return (
            <span
              key={p.src}
              className={`${s.print}${isTop && phase === 'in' ? ` ${s.instant}` : ''}`}
              style={{
                zIndex: n - pos,
                transform: out ? OUT : `translate(-50%, -50%) translate(${L.x}px, ${L.y}px) rotate(${L.r}deg)`,
              }}
            >
              <img
                src={asset(p.src)}
                alt=""
                width={1200}
                height={800}
                loading={pos < 2 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </span>
          );
        })}
      </button>
      <figcaption className={s.meta}>
        <span>
          {order[0] + 1} / {n}
        </span>
        <span className={s.hint}>click to shuffle</span>
        <span className="visually-hidden" aria-live="polite">
          Photo {order[0] + 1} of {n}: {top.alt}
        </span>
      </figcaption>
    </figure>
  );
}
