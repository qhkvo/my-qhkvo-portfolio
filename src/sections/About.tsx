import { profile } from '../data/profile';
import { asset } from '../asset';

export default function About() {
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
              <a href={asset(l.href)} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {profile.portrait && (
        <img className="about-portrait" src={asset(profile.portrait)} alt={`Portrait of ${profile.name}`} width={600} height={750} decoding="async" />
      )}
    </div>
  );
}
