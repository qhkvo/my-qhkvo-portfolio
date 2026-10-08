import { useState } from 'react';
import { projects, type Project } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

type Filter = 'all' | Project['type'];
const FILTERS: [Filter, string][] = [['all', 'All'], ['project', 'Projects'], ['hackathon', 'Hackathons']];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const list = filter === 'all' ? projects : projects.filter((p) => p.type === filter);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.map(([key, label], i) => (
          <span key={key}>
            {i > 0 && <span aria-hidden="true" className="muted"> / </span>}
            <button type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>
              {label}
            </button>
          </span>
        ))}
      </div>
      <ul className="grid">
        {list.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </>
  );
}
