import { Trophy } from "lucide-react";
import { OpensInNewTab } from "@/components/opens-new-tab";
import { SectionHeading } from "@/components/section-heading";
import { basketballLinks } from "@/data/site";

export function BasketballSection() {
  return (
    <section id="basketball" className="page-section">
      <SectionHeading icon={Trophy}>Basketball</SectionHeading>
      <p className="prose-muted-constrained">
        A lot of evenings and weekends revolve around youth hoops nowadays. My
        daughter plays at{" "}
        <a
          href={basketballLinks.club}
          className="link-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          HNMKY
          <OpensInNewTab />
        </a>
        , and I play too — mostly for fun after years of ice hockey, floorball,
        and soccer, so the court still feels pretty new.
      </p>
      <p className="prose-muted-constrained mb-3">
        In addition I am a volunteering{" "}
        <span lang="fi" className="text-ink">
          joukkueenjohtaja
        </span>{" "}
        (team manager) there. Schedules and spreadsheets got painful, so I put
        together a couple of small apps for the club:
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
            Excel convert tool to bring games from the association&apos;s{" "}
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
            &apos;s event management in just few minutes.
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
            A web app for assigning the game officials for home games of all
            HNMKY teams.
          </span>
        </li>
      </ul>
    </section>
  );
}
