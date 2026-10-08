export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  type: 'project' | 'hackathon';
  role?: string;
  cover: string;
  coverBg?: string;
  description: string[];
  highlights?: string[];
  stack: string[];
  links?: { github?: string; demo?: string; devpost?: string; video?: string };
  gallery?: string[];
};

// Image paths for a project. Files live in public/images/projects/<slug>/.
// The first argument after the slug is the cover; the gallery is shown in list order.
const media = (slug: string, cover: string, gallery: string[] = []) => ({
  cover: `/images/projects/${slug}/${cover}`,
  gallery: gallery.map((file) => `/images/projects/${slug}/${file}`),
});

// Newest first. GitHub links point to the profile until repo links are added.
export const projects: Project[] = [
  {
    slug: 'museboard',
    title: 'Museboard',
    tagline: 'A mood board that finds related images by meaning or by color',
    year: '2026',
    type: 'project',
    ...media('museboard', 'board.jpg', ['find-similar.jpg', 'architecture.png']),
    description: [
      'A mood-board web app for collecting images into boards, tagging them with your own subjects, and finding related images across every board, either by what an image shows or by its colors.',
      'React and TypeScript handle boards, uploads, processing status and discovery. FastAPI stores image metadata and coordinates a PostgreSQL-backed job queue.',
      'Two C++17 CPU workers use OpenCV to generate thumbnails and five-color palettes, and one C++17 AI worker runs a pretrained CLIP image encoder through ONNX Runtime to produce embeddings. PostgreSQL with pgvector ranks semantic matches, while color search compares weighted palettes in LAB color space.',
      'Each upload creates independent CPU and AI jobs that workers claim through internal API endpoints. Expired jobs are retried and stale results are rejected, so thumbnails and palettes stay usable even if AI processing fails. Docker Compose runs every service on one machine, with persistent volumes for the database and images.',
    ],
    highlights: [
      'Semantic image search over CLIP embeddings with pgvector',
      'Color search over weighted five-color palettes in LAB color space',
      'Job queue with worker claiming, retries and stale-result rejection',
      'Keeps working when AI processing fails: thumbnails and palettes stay available',
    ],
    stack: ['C++17', 'React', 'FastAPI', 'PostgreSQL / pgvector', 'OpenCV', 'ONNX Runtime', 'TypeScript', 'Docker Compose', 'Nginx'],
    links: { github: 'https://github.com/qhkvo/museboardLite' },
  },
  {
    slug: 'transit-routing-engine',
    title: 'Transit Routing & Compression Engine',
    tagline: "Trip planning over Montreal's STM network",
    year: '2026',
    type: 'project',
    ...media('transit-routing-engine', 'cover.svg', ['gallery-1.svg', 'gallery-2.svg', 'gallery-3.svg']),
    coverBg: '#000',
    description: [
      "A C++ transit trip-planning engine over Montreal's STM network: 9,188 stops and millions of GTFS records.",
      'Delta and varint compression shrink stored coordinates by 79.5% while keeping sub-meter accuracy.',
    ],
    highlights: [
      'Dijkstra-based routing over the full GTFS feed',
      '79.5% coordinate size reduction with sub-meter accuracy',
    ],
    stack: ['C++', 'Dijkstra', 'GTFS', 'Data compression', 'CMake'],
    links: { github: 'https://github.com/qhkvo' },
  },
  {
    slug: 'ai-test-coverage-analyzer',
    title: 'AI Test Coverage Analyzer',
    tagline: 'Multi-agent AI that audits test coverage (Ciena Hackathon)',
    year: '2026',
    type: 'hackathon',
    ...media('ai-test-coverage-analyzer', 'cover.svg', ['gallery-1.svg', 'gallery-2.svg', 'gallery-3.svg']),
    description: [
      'A multi-agent AI backend pipeline (Google ADK, Gemini 2.5 Flash, asyncio) that audits test coverage across 500+ files, cutting manual review by 4 to 6 hours per release.',
      'A hybrid extraction layer combines deterministic Pandas ingestion with parallel LLM calls, and Pydantic models validate every AI-generated result.',
    ],
    highlights: [
      'Concurrent agent scheduling with asyncio',
      'Pydantic schema enforcement on LLM output',
      'Saves 4 to 6 hours of manual review per release',
    ],
    stack: ['Python', 'Gemini 2.5 Flash', 'Google ADK', 'Pydantic', 'Pandas', 'asyncio'],
    links: { github: 'https://github.com/qhkvo' },
  },
  {
    slug: 'smart-appetite-manager',
    title: 'Smart Appetite Manager',
    tagline: 'Agentic AI for groceries, recipes and prices (1st Place, uOttaHack8)',
    year: '2026',
    type: 'hackathon',
    ...media('smart-appetite-manager', 'award.jpg', [
      'smart-shopper.jpg',
      'architecture.jpg',
      'chef-agent.jpg',
      'inventory.jpg',
      'price-comparison.jpg',
      'agent-mesh-workflow.jpg',
      'team.jpg',
      'solace-challenge.jpg',
    ]),
    description: [
      'An event-driven agentic AI platform built in a 36-hour sprint, with 4 orchestrators and 9 specialized agents that track inventory, recommend recipes and compare prices across 13 grocery chains.',
      'A multi-step LLM enrichment pipeline chains text filtering, categorization and vision-model extraction, cutting noisy API results from 77 to 15 relevant products per query.',
      "The web app covers a kitchen dashboard, an inventory you can fill by scanning receipts, a Recipe Studio with a pantry-aware Chef Agent, and a Smart Shopper that compares live prices across stores, picks the best deals and plans the shopping route. Inventory, recipe and shopping orchestrators coordinate agents such as a receipt scanner, ingredient parser, flyer specialist, grocery store pricing specialist and route planner, all talking over Solace's event mesh.",
    ],
    highlights: [
      '1st Place at uOttaHack8',
      '4 orchestrators and 9 specialized agents',
      'Price comparison across 13 grocery chains',
      'Noisy results cut from 77 to 15 relevant products per query',
    ],
    stack: ['Python', 'JavaScript', 'React', 'Solace Agent Mesh', 'LLM APIs'],
    links: { github: 'https://github.com/qhkvo', devpost: 'https://devpost.com/software/smart-appetite-manager' },
  },
  {
    slug: 'pacghost-rl',
    title: 'PacGhost RL Agent',
    tagline: 'Reinforcement learning ghosts that learn to catch Pac-Man',
    year: '2025',
    type: 'project',
    role: 'Approximate Q-Learning and SARSA agents (team of 4)',
    ...media('pacghost-rl', 'cover.png', [
      'q-learning-training.png',
      'sarsa-training.png',
      'dqn-tau-comparison.png',
    ]),
    description: [
      "A team project for Carleton's COMP 4010 reinforcement learning course that flips the classic game: instead of training Pac-Man, five RL algorithms train the ghost to chase and catch Pac-Man in a custom grid environment built on OpenAI Gym.",
      'The game is modelled as a Markov decision process over Pac-Man and ghost positions, pill and power-pill status and a scared timer, with rewards for catching Pac-Man and penalties for being eaten or letting Pac-Man clear the pills.',
      'I built the Approximate Q-Learning and SARSA agents on a shared 8-feature state representation (distance, line of sight, alignment, adjacency, chase direction, scared timer, power-pill distance, pill eaten), trained each for 100,000 episodes, and compared how off-policy and on-policy updates change the ghost\'s behaviour.',
    ],
    highlights: [
      'Approximate Q-Learning: 85.60% win rate over 100,000 games',
      'SARSA: 85.49% win rate, with more cautious play near risky states',
      'Five algorithms compared: Deep Q-Learning, Approximate Q-Learning, SARSA, Dyna-Q and Actor-Critic',
      'Interpretable linear agents whose learned weights show what drives each decision',
    ],
    stack: ['Python', 'Reinforcement learning', 'Q-Learning', 'SARSA', 'OpenAI Gym', 'Function approximation'],
    links: { github: 'https://github.com/dbkhanh/PacGhost-RL-Agent' },
  },
  {
    slug: 'safe-walkie',
    title: 'Safe Walkie',
    tagline: 'A voice-triggered safety app with live SOS alerts (1st Place, TechNolHack2025)',
    year: '2025',
    type: 'hackathon',
    ...media('safe-walkie', 'cover.JPEG'),
    description: [
      'An event-driven safety app (Flask, RabbitMQ, React, Mapbox) with async message delivery for SOS alerts and live guardian notifications.',
      'Real-time risk detection and route visualization on Mapbox, with voice-triggered routing through the Web Speech API across concurrent sessions.',
    ],
    highlights: [
      '1st Place at TechNolHack2025',
      'Async SOS alerts and guardian notifications over RabbitMQ',
      'Voice-triggered routing with the Web Speech API',
    ],
    stack: ['Python', 'React', 'Flask', 'RabbitMQ', 'Mapbox', 'Web Speech API', 'Vite'],
    links: { github: 'https://github.com/qhkvo' },
  },
  {
    slug: 'fighter-drones',
    title: 'Fighter Drones',
    tagline: 'A multi-process firefighting drone simulator',
    year: '2025',
    type: 'project',
    role: 'Drone scheduling, capacity limits and sequence diagrams (team of 6)',
    ...media('fighter-drones', 'cover.svg', ['gallery-1.svg', 'gallery-2.svg', 'gallery-3.svg']),
    coverBg: '#000',
    description: [
      'A distributed simulation, built for SYSC 3303 (Real-Time Concurrent Systems) at Carleton, in which a scheduler dispatches firefighting drones to fire incidents read from event and zone files.',
      'The scheduler, drone and fire incident subsystems run as separate processes and talk over UDP with RPC-style messaging. Any number of drones can run at once, each as its own process.',
      'I built the drone scheduling behaviour and capacity limits, and drew the sequence diagrams for the system.',
    ],
    highlights: [
      'Event-driven state machines for each drone and for the scheduler',
      'Scheduling under capacity constraints across multiple concurrent drones',
      'Fault scenarios for stuck drones, nozzle jams and corrupted messages',
      'JUnit tests for the scheduler, drones, UDP messaging and logging, plus a performance logger',
    ],
    stack: ['Java', 'Multithreading', 'UDP / RPC', 'State machines', 'JUnit', 'Maven'],
    links: { github: 'https://github.com/ashwitha001/FighterDrones' },
  },
  {
    slug: 'hack-the-flush',
    title: 'Hack The Fllush',
    tagline: 'Real-time smart washroom management (uOttaHack 7)',
    year: '2025',
    type: 'hackathon',
    ...media('hack-the-flush', 'cover.jpg', [
      'website.png',
      'admin-dashboard.png',
      'pubsub-diagram.png',
      'hacking.jpg',
      'team.jpg',
    ]),
    description: [
      'A real-time web app for managing washrooms in smart buildings, built on Solace PubSub+ Cloud event-driven architecture.',
      'Visitors see washrooms on an indoor Mappedin map with live stall availability, filterable by gender. Facility staff get an admin dashboard with usage counts, how often each washroom fills up, and unavailability over time.',
      'Behind it, a publish-subscribe system moves data asynchronously between IoT sensors, dashboards and user interfaces, and Flask pipelines turn it into usage analytics and automated cleaning workflows.',
    ],
    highlights: [
      'Live stall availability on an indoor map',
      'Publish-subscribe data flow from IoT sensors to dashboards',
      'Admin analytics for usage, occupancy and downtime',
    ],
    stack: ['Python', 'React', 'Flask', 'Solace PubSub+', 'Mappedin'],
    links: {
      github: 'https://github.com/QuangMinh-Le/uottahack2025',
      video: 'https://youtu.be/WoqqyPd7O_s',
    },
  },
  {
    slug: 'little-eye',
    title: 'Little Eye',
    tagline: 'Voice-activated object and color recognition for visually impaired users (Hack The Hill)',
    year: '2022',
    type: 'hackathon',
    ...media('little-eye', 'cover.svg', ['gallery-1.svg', 'gallery-2.svg', 'gallery-3.svg']),
    description: [
      'A voice-activated web app that helps visually impaired users identify objects and colors through real-time image capture and spoken feedback.',
      'Built in 48 hours with Flask and the Google Speech-to-Text and Text-to-Speech APIs, using REST API pipelines for fully hands-free interaction.',
    ],
    highlights: [
      'Hands-free voice interaction from start to finish',
      '95% detection accuracy',
      'Built in 48 hours',
    ],
    stack: ['Python', 'React', 'Flask', 'Google Cloud Speech APIs'],
    links: { github: 'https://github.com/qhkvo' },
  },
  {
    slug: 'autograder',
    title: 'Autograder',
    tagline: "Open-source autograding system for Carleton's COMP 2402",
    year: '2022',
    type: 'project',
    role: 'Autograder Developer, CCSS Dev Projects',
    ...media('autograder', 'cover.svg', ['gallery-1.svg', 'gallery-2.svg', 'gallery-3.svg']),
    description: [
      "An open-source autograding system built by the Carleton Computer Science Society's Dev Projects team for COMP 2402. Students submit assignments through it, and instructors and TAs manage grading from it.",
      'I sped up the submission server and made the code and error handling consistent across both sides of the system: the student submission flow and the instructor/TA management page.',
    ],
    highlights: [
      'Faster submission server runtime',
      'Consistent code across the student and instructor/TA interfaces',
      'Clearer handling of technical errors for students and staff',
    ],
    stack: [],
    links: { github: 'https://github.com/qhkvo' },
  },
];
