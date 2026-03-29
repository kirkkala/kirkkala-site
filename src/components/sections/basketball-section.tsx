import { Trophy } from "lucide-react";
import type { ReactNode } from "react";
import {
  ContentCardBlock,
  ContentCardDescription,
  ContentCardEyebrow,
  ContentCardTitle,
} from "@/components/content-card";
import { OpensInNewTab } from "@/components/opens-new-tab";
import { SectionHeading } from "@/components/section-heading";
import { basketballLinks } from "@/data/site";

function ProductCard({
  eyebrow,
  href,
  title,
  children,
}: {
  eyebrow: string;
  href: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <ContentCardBlock>
      <ContentCardEyebrow>{eyebrow}</ContentCardEyebrow>
      <ContentCardTitle>
        <a
          href={href}
          className="link-accent inline-flex flex-wrap items-baseline gap-x-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
          <OpensInNewTab />
        </a>
      </ContentCardTitle>
      <ContentCardDescription>{children}</ContentCardDescription>
    </ContentCardBlock>
  );
}

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
        (team manager). Scheduling and spreadsheets got painful, so I shipped
        two React / Next.js products for the club:
      </p>
      <div className="basketball-products">
        <ProductCard
          eyebrow="Club tooling · converter"
          href={basketballLinks.elsaMyclub}
          title="eLSA → MyClub"
        >
          A tool to convert the association&apos;s{" "}
          <a
            href={basketballLinks.elsaProduct}
            className="link-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            eLSA
            <OpensInNewTab />
          </a>{" "}
          excel sheets into{" "}
          <a
            href={basketballLinks.myclub}
            className="link-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            MyClub
            <OpensInNewTab />
          </a>{" "}
          compatible format. Saves hours of manual work in the start of every
          season.
        </ProductCard>
        <ProductCard
          eyebrow="Club tooling · operations"
          href={basketballLinks.homegameOfficials}
          title="Home game officials"
        >
          Assignment flow for home-game officials across HNMKY—including
          tracking each team&apos;s first-aid kit status.
        </ProductCard>
      </div>
    </section>
  );
}
