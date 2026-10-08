import { useState } from 'react';
import { uniLife, type UniLifeItem } from '../data/uniLife';
import Lightbox from '../components/Lightbox';
import TileArrows from '../components/TileArrows';
import { asset } from '../asset';

function UniLifeCard({ item, onOpen }: { item: UniLifeItem; onOpen: (index: number) => void }) {
  const [index, setIndex] = useState(0);
  const photo = item.photos[index];
  return (
    <div className="card">
      <div className="tile-wrap">
        <button type="button" className="tile-open" onClick={() => onOpen(index)} aria-label={`Open photo: ${item.caption}`}>
          <div className="tile tile-photo">
            <img key={photo.src} src={asset(photo.src)} alt={photo.alt} width={1200} height={900} loading="lazy" decoding="async" />
          </div>
        </button>
        <TileArrows images={item.photos.map((p) => p.src)} index={index} onIndex={setIndex} label={item.caption} />
      </div>
      <p className="caption">
        <span className="cap-text">{item.caption}</span>
        {item.award && <span className="tag">Award</span>}
      </p>
      {item.org && <p className="caption-sub">{item.org}</p>}
      <p className="caption-sub">{item.date}</p>
      {item.summary && <p className="card-summary">{item.summary}</p>}
    </div>
  );
}

export default function UniLife() {
  // Which card's photos are open in the lightbox, and at which photo.
  const [open, setOpen] = useState<{ item: UniLifeItem; index: number } | null>(null);
  return (
    <>
      <ul className="grid">
        {uniLife.map((item) => (
          <li key={item.id}>
            <UniLifeCard item={item} onOpen={(index) => setOpen({ item, index })} />
          </li>
        ))}
      </ul>
      {open && (
        <Lightbox
          items={open.item.photos.map((p) => ({
            src: asset(p.src),
            alt: p.alt,
            caption: [open.item.caption, open.item.org, open.item.date].filter(Boolean).join(' - '),
          }))}
          index={open.index}
          onIndex={(index) => setOpen({ ...open, index })}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
