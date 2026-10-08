import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { useTitle } from '../hooks/useTitle';
import Lightbox from '../components/Lightbox';
import NotFound from '../components/NotFound';
import { asset } from '../asset';

const LINK_LABELS = { github: 'GitHub', demo: 'Live', devpost: 'Devpost', video: 'Video' } as const;

export default function ProjectDetail() {
  const { slug } = useParams();
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];
  const [open, setOpen] = useState<number | null>(null);

  useTitle(p ? `${p.title} - ${profile.name}` : `Project not found - ${profile.name}`);
  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(null);
  }, [slug]);

  if (!p) return <NotFound what="Project" />;

  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const gallery = (p.gallery ?? []).map((src, n) => ({ src: asset(src), alt: `${p.title} - image ${n + 1}` }));
  const links = Object.entries(p.links ?? {}).filter(([, href]) => href) as [keyof typeof LINK_LABELS, string][];

  return (
    <article className="detail">
      <p>
        <Link to="/" state={{ section: 'projects' }} className="muted">
          ← All projects
        </Link>
      </p>

      <header className="detail-head">
        <h1>{p.title}</h1>
        <p className="detail-tagline">{p.tagline}</p>
        <dl className="detail-meta">
          <div><dt>Year</dt><dd>{p.year}</dd></div>
          {p.role && <div><dt>Role</dt><dd>{p.role}</dd></div>}
          <div><dt>Type</dt><dd>{p.type === 'hackathon' ? 'Hackathon' : 'Project'}</dd></div>
        </dl>
        {links.length > 0 && (
          <ul className="link-row">
            {links.map(([k, href]) => (
              <li key={k}>
                <a href={href} target="_blank" rel="noreferrer">{LINK_LABELS[k]} ↗</a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className={`tile tile-hero${p.coverBg ? ' tile-custom' : ''}`} style={p.coverBg ? { background: p.coverBg } : undefined}>
        <img src={asset(p.cover)} alt={`${p.title} cover`} width={600} height={800} decoding="async" />
      </div>

      <div className="detail-body">
        <div className="detail-desc">
          {p.description.map((para) => <p key={para}>{para}</p>)}
        </div>
        <div className="detail-lists">
          {p.highlights && p.highlights.length > 0 && (
            <div>
              <h2 className="tech-group">Highlights</h2>
              <ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
          )}
          {p.stack.length > 0 && (
            <div>
              <h2 className="tech-group">Stack</h2>
              <ul>{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          )}
        </div>
      </div>

      {gallery.length > 0 && (
        <section aria-label="Gallery">
          <ul className="grid">
            {gallery.map((g, n) => (
              <li key={g.src}>
                <button type="button" className="card" onClick={() => setOpen(n)} aria-label={`Open ${g.alt}`}>
                  <div className="tile">
                    <img src={g.src} alt={g.alt} width={1200} height={800} loading="lazy" decoding="async" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="pager" aria-label="More projects">
        <Link to={`/projects/${prev.slug}`}>← {prev.title}</Link>
        <Link to={`/projects/${next.slug}`}>{next.title} →</Link>
      </nav>

      {open !== null && <Lightbox items={gallery} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </article>
  );
}
