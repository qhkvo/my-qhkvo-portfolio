export type Profile = {
  name: string;
  headline: string;
  bio: string[];
  location: string;
  email: string;
  portrait?: string;
  links: { label: string; href: string }[];
};

export const profile: Profile = {
  name: 'Quynh Vo',
  headline: 'Software Developer',
  bio: [
    'Bachelor of Computer Science, Stream in Software Engineering, Carleton University with High Distinction (GPA 3.9/4.0).',
    'Software developer with co-op and internship experience at Ciena, Ericsson and TMA Solutions, building React/Redux front ends, Python tooling and agentic AI. Two-time 1st place hackathon winner.',
  ],
  location: 'Canada',
  email: 'khanhquynh.havo@gmail.com',
  portrait: '/images/portrait.svg',
  links: [
    { label: 'GitHub', href: 'https://github.com/qhkvo' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/quynhvo1911' },
    { label: 'Email', href: 'mailto:khanhquynh.havo@gmail.com' },
    { label: 'Resume (PDF)', href: '/resume.pdf' },
  ],
};
