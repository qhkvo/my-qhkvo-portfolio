export type UniLifeItem = {
  id: string;
  photos: { src: string; alt: string }[]; // the first one is shown on the card; add as many as you like
  caption: string; // role or award title
  org?: string; // organization, shown under the caption
  date: string;
  summary?: string; // one or two sentences shown under the card
  award?: boolean;
};

// Placeholder photos until real ones are added to public/images/uni-life/<id>/
const photos = (id: string, what: string) =>
  [1, 2, 3].map((n) => ({ src: `/images/uni-life/${id}/${n}.svg`, alt: `Placeholder: ${what}, photo ${n}` }));

// Newest first.
export const uniLife: UniLifeItem[] = [
  {
    id: 'uottahack8',
    photos: photos('uottahack8', 'uOttaHack8 win'),
    caption: '1st Place, uOttaHack8',
    date: 'Jan 2026',
    summary: 'Won with Smart Appetite Manager, an agentic AI platform for groceries, recipes and price comparison built in 36 hours.',
    award: true,
  },
  {
    id: 'technolhack2025',
    photos: photos('technolhack2025', 'TechNolHack2025 win'),
    caption: '1st Place, TechNolHack2025',
    date: 'Oct 2025',
    summary: 'Won with Safe Walkie, a hands-free safety app with voice-triggered SOS alerts and live guardian notifications.',
    award: true,
  },
  {
    id: 'quantum-society',
    photos: photos('quantum-society', 'Carleton Quantum Computing Society event'),
    caption: 'Researcher & Content Creator',
    org: 'Carleton Quantum Computing Society',
    date: 'Since Jan 2024',
    summary: 'Researched quantum computing topics and helped run seminars, workshops and networking events introducing Carleton students to the field.',
  },
  {
    id: 'visa',
    photos: photos('visa', 'VISA cultural event'),
    caption: 'Vice President',
    org: 'Vietnamese International Student Association',
    date: 'Jan 2023 – Jan 2025',
    summary: 'Co-led the association and ran cultural events from planning to execution, building a welcoming community for Vietnamese students at Carleton.',
  },
  {
    id: 'teaching-assistant',
    photos: photos('teaching-assistant', 'tutorial session'),
    caption: 'Teaching Assistant',
    org: 'Carleton University',
    date: 'Jun 2022 – Dec 2024',
    summary: 'Led tutorials and office hours for Intro to Computer Science and Object-Oriented Software Engineering, coaching students in programming, design and UML.',
  },
  {
    id: 'student-ambassador',
    photos: photos('student-ambassador', 'campus recruitment event'),
    caption: 'International Student Ambassador',
    org: 'Carleton University',
    date: 'Jun 2022 – Aug 2024',
    summary: 'Represented Carleton at recruitment events and made blogs and videos to help prospective and newly arrived international students.',
  },
];
