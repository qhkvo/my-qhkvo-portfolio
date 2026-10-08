export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string; // "Jan 2026"
  end: string; // "May 2026"
  bullets: string[];
  stack?: string[];
  photos: { src: string; alt: string }[]; // for PhotoStack, 3–6 each
};

// Placeholder photos until real ones are added to public/images/experience/<id>/
const photos = (id: string, company: string) =>
  [1, 2, 3, 4].map((n) => ({ src: `/images/experience/${id}/${n}.svg`, alt: `${company}, placeholder photo ${n}` }));

// Newest first.
export const experience: Experience[] = [
  {
    id: 'ciena-2026',
    role: 'Full Stack Software Developer Co-op',
    company: 'Ciena',
    location: 'Ottawa, ON',
    start: 'Jan 2026',
    end: 'May 2026',
    bullets: [
      'Built a bidirectional CLI serialization engine (React, Redux) that automates provisioning across distributed environments and 15+ parameters via the Bitbucket API.',
      'Wrote a Python CLI that syncs manifests across 60+ microservices, using DFS cycle detection on a JSON inheritance graph and automated HTML diff reports.',
      'Built real-time observability dashboards (WebSockets, Redux) for memory profiling and heap diagnostics across distributed service domains.',
    ],
    stack: ['React', 'Redux', 'Python', 'WebSockets', 'Bitbucket API', 'Linux'],
    photos: photos('ciena-2026', 'Ciena'),
  },
  {
    id: 'ericsson-2023',
    role: 'Software Developer Co-op',
    company: 'Ericsson',
    location: 'Ottawa, ON',
    start: 'May 2023',
    end: 'Aug 2024',
    bullets: [
      'Built a Structure Editing vector tool (GoJS, React) for drawing floorplans with frequency-dependent material attenuation.',
      'Worked with backend engineers on REST APIs to extend the Traffic View component with Mbps/Sub units, reducing network configuration errors.',
      'Wrote frontend test cases, fixed critical UI defects and reviewed code in Gerrit across Agile sprints.',
    ],
    stack: ['React', 'Redux', 'TypeScript', 'GoJS', 'REST APIs', 'Gerrit'],
    photos: [
      { src: '/images/experience/ericsson-2023/logo.png', alt: 'Ericsson logo' },
      { src: '/images/experience/ericsson-2023/presentation.jpg', alt: 'Quynh presenting the Ericsson Indoor Planner structure editing features on stage' },
      { src: '/images/experience/ericsson-2023/team-sign.jpg', alt: 'Ericsson co-op students in front of the Ericsson sign' },
      { src: '/images/experience/ericsson-2023/team-picnic.jpg', alt: 'Ericsson team photo at an outdoor team event' },
      { src: '/images/experience/ericsson-2023/eip.jpg', alt: 'Quynh holding the EIP team staff at the Ericsson office' },
    ],
  },
  {
    id: 'ciena-2022',
    role: 'Software Developer Co-op',
    company: 'Ciena',
    location: 'Ottawa, ON',
    start: 'Sep 2022',
    end: 'Dec 2022',
    bullets: [
      'Built UI components and REST interfaces for MCP network applications in TypeScript and Ember.js, improving dashboard load performance by 15%.',
      'Automated test suites and CI/CD workflows, speeding up deployments and making releases more reliable.',
    ],
    stack: ['TypeScript', 'Ember.js', 'REST APIs', 'CI/CD'],
    photos: [
      { src: '/images/experience/ciena-2022/logo.png', alt: 'Ciena logo' },
      { src: '/images/experience/ciena-2022/office-sign.jpg', alt: 'Quynh in front of the Ciena sign in the office lobby' },
      { src: '/images/experience/ciena-2022/building.jpg', alt: 'Ciena headquarters building in Ottawa' },
      { src: '/images/experience/ciena-2022/sweater.jpg', alt: 'Quynh in a red Ciena sweater' },
    ],
  },
  {
    // TODO: add dates and bullets.
    id: 'tma',
    role: 'Software Developer Intern',
    company: 'TMA Solutions',
    location: 'Ho Chi Minh City, Vietnam',
    start: 'TBD',
    end: '',
    bullets: ['Details coming soon.'],
    photos: [
      { src: '/images/experience/tma/logo.png', alt: 'TMA Solutions logo' },
      { src: '/images/experience/tma/office.jpg', alt: 'Interns reflected in the TMA Solutions office sign' },
      { src: '/images/experience/tma/team-dinner.jpg', alt: 'Team dinner with TMA Solutions colleagues in Ho Chi Minh City' },
    ],
  },
];
