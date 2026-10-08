import { SECTIONS, type SectionId } from '../data/sections';

// Playful fraction-style section counter, top right.
export default function Counter({ active }: { active: SectionId | null }) {
  const n = active ? SECTIONS.findIndex((s) => s.id === active) + 1 : 0;
  return (
    <div className="counter" aria-hidden="true">
      <span className="counter-top">{n}</span>
      <span className="counter-rule" />
      <span className="counter-mid">0</span>
      <span className="counter-row">
        {SECTIONS.map((s, i) => (
          <span key={s.id} className={i + 1 === n ? 'is-on' : undefined}>
            {i + 1}
          </span>
        ))}
      </span>
    </div>
  );
}
