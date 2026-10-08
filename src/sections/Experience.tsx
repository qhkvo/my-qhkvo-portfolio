import { experience } from '../data/experience';
import PhotoStack from '../components/PhotoStack';
import s from './Experience.module.css';

// "Jan 2026" + "Apr 2026" -> "Jan – Apr 2026"
function range(start: string, end: string) {
  if (!end) return start;
  const [sm, sy] = start.split(' ');
  const [, ey] = end.split(' ');
  return sy === ey ? `${sm} – ${end}` : `${start} – ${end}`;
}

export default function Experience() {
  return (
    <ol className={s.timeline}>
      {experience.map((e) => (
        <li key={e.id} className={s.entry}>
          <div className={s.text}>
            <h3 className={s.role}>{e.role}</h3>
            <p>
              {e.company} · {e.location}
            </p>
            <p className={s.dates}>{range(e.start, e.end)}</p>
            <ul className={s.bullets}>
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {e.stack && <p className={s.stack}>{e.stack.join(' · ')}</p>}
          </div>
          <PhotoStack photos={e.photos} />
        </li>
      ))}
    </ol>
  );
}
