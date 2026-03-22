import { site, skills } from "@/data/site";

export function CodingSection() {
  return (
    <section id="work" className="page-section">
      <h2 className="title-section">Coding</h2>
      <p className="prose-muted-constrained">{site.intro}</p>
      <ul className="skill-list">
        {skills.map((skill) => (
          <li key={skill} className="skill-chip">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
