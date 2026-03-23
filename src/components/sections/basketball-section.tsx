import { Trophy } from "lucide-react";
import { OpensInNewTab } from "@/components/opens-new-tab";
import { SectionHeading } from "@/components/section-heading";
import { basketballLinks } from "@/data/site";

export function BasketballSection() {
  return (
    <section id="basketball" className="page-section">
      <SectionHeading icon={Trophy}>Basketball</SectionHeading>
      <p className="prose-muted-constrained">
        My daughter plays at{" "}
        <a
          href={basketballLinks.club}
          className="link-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          HNMKY
          <OpensInNewTab />
        </a>{" "}
        and I play too, since 2025. Post ice-hockey, post floorball, post
        soccer, so that basketball court still feels suspiciously new.
      </p>
      <p className="prose-muted-constrained mb-3">
        I&apos;m also a volunteer with the role of{" "}
        <span lang="fi" className="text-ink">
          joukkueenjohtaja
        </span>{" "}
        (team manager). The sheduling and spreadsheets got painful so I built
        two cool react/NextJS apps for the club:
      </p>
      <ul className="basketball-tools mt-0">
        <li>
          <a
            href={basketballLinks.elsaMyclub}
            className="link-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            eLSA → MyClub
            <OpensInNewTab />
          </a>
          {" — "}
          <span className="text-sm text-muted">
            Pulls games from the association&apos;s{" "}
            <a
              href={basketballLinks.elsaProduct}
              className="link-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              eLSA
              <OpensInNewTab />
            </a>{" "}
            system to{" "}
            <a
              href={basketballLinks.myclub}
              className="link-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              MyClub
              <OpensInNewTab />
            </a>
            &apos;s events in just a few minutes insted of hours of manual work.
          </span>
        </li>
        <li>
          <a
            href={basketballLinks.homegameOfficials}
            className="link-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Home game officials
            <OpensInNewTab />
          </a>
          {" — "}
          <span className="text-sm text-muted">
            Assign tool for the home-game officials for all HNMKY, it even
            tracks the first aid kits of each team.
          </span>
        </li>
      </ul>
    </section>
  );
}
