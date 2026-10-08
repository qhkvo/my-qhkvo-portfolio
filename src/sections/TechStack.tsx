import { techStack } from '../data/techStack';

export default function TechStack() {
  return (
    <div className="tech">
      {techStack.map((g) => (
        <div key={g.group}>
          <h3 className="tech-group">{g.group}</h3>
          <ul>
            {g.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
