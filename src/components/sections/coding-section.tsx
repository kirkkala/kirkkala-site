import { Code2 } from "lucide-react";
import { LinkExternal } from "@/components/link-external";
import { Section } from "@/components/section";
import { site, skills } from "@/data/site";

export function CodingSection() {
  return (
    <Section id="work" icon={Code2} title="Coding">
      <p className="prose-muted-constrained">
        Drupal has paid the rent since 2009 and is still my deepest stack.
        Lately I've been into TypeScript, React and NodeJS when it fits.
        OpenSearch/Elasticsearch when something really ought to be searchable.
      </p>
      <p className="prose-muted-constrained">
        Day job: shipping web products as tech delivery lead. Caring about UX,
        code that won&apos;t haunt the next person and happiness within the
        team. Projects that move fast without tripping the alarms are my
        favorite.
      </p>
      <p className="prose-muted-constrained">
        Coding outside of work: Scroll to the next section for some of my side
        projects.
      </p>
      <p className="prose-muted-constrained">
        <LinkExternal href={site.links.linkedin} className="link-accent">
          LinkedIn
        </LinkExternal>{" "}
        has the CV-shaped version, don't expect updates too often there.
      </p>
      <ul className="flex flex-wrap gap-2 pt-2">
        {skills.map((skill) => (
          <li key={skill} className="skill-chip">
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  );
}
