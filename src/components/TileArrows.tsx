import { useEffect, useState } from 'react';
import { asset } from '../asset';

type Props = {
  images: string[]; // site-relative paths, e.g. "/images/x.jpg"
  index: number;
  onIndex: (i: number) => void;
  label: string; // used in the buttons' accessible names
};

// ← / → buttons and an "n / total" counter laid over a card image.
// Renders nothing when there is only one image.
export default function TileArrows({ images, index, onIndex, label }: Props) {
  const n = images.length;
  const [warm, setWarm] = useState(false);

  // After the first click, preload the neighbours so the next one is instant.
  useEffect(() => {
    if (!warm) return;
    [index + 1, index - 1].forEach((i) => {
      new Image().src = asset(images[(i + n) % n]);
    });
  }, [warm, index, images, n]);

  if (n < 2) return null;
  const go = (d: number) => {
    setWarm(true);
    onIndex((index + d + n) % n);
  };

  return (
    <>
      <button type="button" className="tile-arrow tile-prev" onClick={() => go(-1)} aria-label={`Previous image of ${label}`}>
        ←
      </button>
      <button type="button" className="tile-arrow tile-next" onClick={() => go(1)} aria-label={`Next image of ${label}`}>
        →
      </button>
      <span className="tile-count" aria-live="polite">
        {index + 1} / {n}
      </span>
    </>
  );
}
