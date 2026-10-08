import { useState } from 'react';
import { profile } from '../data/profile';
import { asset } from '../asset';
import PdfViewer from '../components/PdfViewer';

export default function About() {
  // PDF links (the resume) open in an on-page viewer instead of downloading.
  const [pdf, setPdf] = useState<{ src: string; title: string } | null>(null);
  return (
    <div className="about">
      <div className="about-text">
        <h1 className="about-name">{profile.name}</h1>
        <p className="about-headline">
          {profile.headline} · {profile.location}
        </p>
        {profile.bio.map((line) => (
          <p key={line} className="about-bio">{line}</p>
        ))}
        <ul className="link-row">
          {profile.links.map((l) => (
            <li key={l.label}>
              <a
                href={asset(l.href)}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                onClick={(e) => {
                  if (!l.href.endsWith('.pdf')) return;
                  e.preventDefault();
                  setPdf({ src: asset(l.href), title: l.label.replace(/\s*\(PDF\)/i, '') });
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {profile.portrait && (
        <img className="about-portrait" src={asset(profile.portrait)} alt={`Portrait of ${profile.name}`} width={600} height={750} decoding="async" />
      )}
      {pdf && <PdfViewer src={pdf.src} title={pdf.title} onClose={() => setPdf(null)} />}
    </div>
  );
}
