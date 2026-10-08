import { useEffect, type ComponentType } from 'react';
import { useLocation } from 'react-router-dom';
import { SECTIONS, type SectionId } from '../data/sections';
import { profile } from '../data/profile';
import { useTitle } from '../hooks/useTitle';
import About from '../sections/About';
import UniLife from '../sections/UniLife';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import TechStack from '../sections/TechStack';

const CONTENT: Record<SectionId, ComponentType> = {
  about: About,
  'uni-life': UniLife,
  experience: Experience,
  projects: Projects,
  'tech-stack': TechStack,
};

export default function Home({ onActive }: { onActive: (id: SectionId) => void }) {
  useTitle(`${profile.name} - ${profile.headline}`);
  const location = useLocation();

  // Highlight the section crossing the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) onActive(e.target.id as SectionId);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [onActive]);

  // Arriving from a detail page via the nav: jump to the requested section.
  useEffect(() => {
    const section = (location.state as { section?: string } | null)?.section;
    if (section) {
      requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView({ block: 'start' }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key, location.state]);

  return (
    <>
      {SECTIONS.map(({ id, label }) => {
        const Content = CONTENT[id];
        return (
          <section key={id} id={id} className="section" aria-labelledby={`${id}-title`} tabIndex={-1}>
            <h2 id={`${id}-title`} className="section-title">
              <span className="idx">o.</span> {label}
            </h2>
            <Content />
          </section>
        );
      })}
    </>
  );
}
