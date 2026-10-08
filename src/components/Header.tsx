import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SECTIONS, type SectionId } from '../data/sections';
import { profile } from '../data/profile';
import { scrollToSection } from '../scroll';
import { prefersReducedMotion } from '../hooks/useReducedMotion';
import Counter from './Counter';

export default function Header({ active }: { active: SectionId | null }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const onHome = pathname === '/';

  return (
    <header className={`site-header${compact ? ' is-compact' : ''}`}>
      <Link
        to="/"
        className="logo"
        aria-label={`${profile.name} - home`}
        onClick={(e) => {
          if (onHome) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
          }
        }}
      >
        <span className="logo-text" aria-hidden="true">In Progress...</span>
      </Link>
      <nav className="site-nav" aria-label="Sections">
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="nav-list"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <ul id="nav-list" className={open ? 'is-open' : undefined}>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <Link
                to="/"
                state={{ section: s.id }}
                aria-current={active === s.id ? 'true' : undefined}
                onClick={(e) => {
                  setOpen(false);
                  if (onHome) {
                    e.preventDefault();
                    scrollToSection(s.id);
                  }
                }}
              >
                <span className="idx">o.</span> {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Counter active={active} />
    </header>
  );
}
