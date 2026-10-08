export type TechGroup = { group: string; items: string[] };

export const techStack: TechGroup[] = [
  { group: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'SQL', 'HTML/CSS'] },
  { group: 'Frontend', items: ['React', 'Redux Toolkit', 'Material-UI', 'Ember.js', 'GoJS', 'Mapbox'] },
  { group: 'Backend', items: ['Node.js', 'Flask', 'FastAPI', 'PostgreSQL / pgvector', 'REST APIs', 'WebSockets'] },
  { group: 'AI/ML', items: ['Google ADK', 'Gemini', 'GPT-4o', 'Pydantic', 'Pandas', 'OpenCV', 'ONNX Runtime', 'Solace Agent Mesh'] },
  { group: 'Infra/DevOps', items: ['Docker Compose', 'GitLab CI', 'Jenkins', 'RabbitMQ', 'Solace PubSub+', 'Google Cloud Platform', 'Ubuntu'] },
  { group: 'Tools', items: ['Git', 'Bitbucket Server', 'Gerrit', 'CMake', 'Valgrind', 'GDB'] },
];
