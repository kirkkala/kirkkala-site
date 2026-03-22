import { Code2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { skills } from "@/data/site";

export function CodingSection() {
  return (
    <section id="work" className="page-section">
      <SectionHeading icon={Code2}>Coding</SectionHeading>
      <p className="prose-muted-constrained">
        I've worked with Drupal for a living since 2009 — it's still what I know
        best. In recent years I've leaned into more modern stacks: TypeScript,
        React, and Node where it fits. And Opensearch/Elasticsearch for whenever
        I like to index anything.
      </p>
      <p className="prose-muted-constrained">
        I build and ship web products at work, care about clear UX and
        maintainable code, and like teams that can move without breaking things.
      </p>
      <p className="prose-muted-constrained">
        See more about the work me at{" "}
        <a
          href="https://www.linkedin.com/in/timokirkkala/"
          className="link-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        . Expect updates there maybe twice a year.
      </p>
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
