export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'uni-life', label: 'Uni Life' },
  { id: 'tech-stack', label: 'Tech Stack' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];
