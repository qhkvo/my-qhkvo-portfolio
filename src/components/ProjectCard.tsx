import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { asset } from '../asset';
import TileArrows from './TileArrows';

// How many stack tags to show on a card; the rest collapse into "+N".
const MAX_TAGS = 4;

export default function ProjectCard({ project: p }: { project: Project }) {
  // The cover first, then the gallery images.
  const images = [p.cover, ...(p.gallery ?? [])];
  const [index, setIndex] = useState(0);
  const to = `/projects/${p.slug}`;

  return (
    <div className="card">
      <div className="tile-wrap">
        <Link to={to} tabIndex={-1} aria-hidden="true">
          <div className={`tile${p.coverBg ? ' tile-custom' : ''}`} style={p.coverBg ? { background: p.coverBg } : undefined}>
            <img key={images[index]} src={asset(images[index])} alt="" width={600} height={800} loading="lazy" decoding="async" />
          </div>
        </Link>
        <TileArrows images={images} index={index} onIndex={setIndex} label={p.title} />
      </div>
      <Link to={to} className="card-link">
        <p className="caption">
          <span className="cap-text">
            {p.title} - {p.tagline}
          </span>
          {p.type === 'hackathon' && <span className="tag">Hackathon</span>}
        </p>
      </Link>
      {p.stack.length > 0 && (
        <ul className="stack-tags" aria-label="Tech stack">
          {p.stack.slice(0, MAX_TAGS).map((t) => (
            <li key={t}>{t}</li>
          ))}
          {p.stack.length > MAX_TAGS && <li className="more">+{p.stack.length - MAX_TAGS}</li>}
        </ul>
      )}
    </div>
  );
}
