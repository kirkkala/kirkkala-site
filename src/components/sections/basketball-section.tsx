import { Globe, Trophy } from "lucide-react";
import type { ReactNode } from "react";
import { GitHubIcon } from "@/components/brand-icons";
import {
  ContentCardBlock,
  ContentCardDescription,
  ContentCardExternalLink,
  ContentCardEyebrow,
  ContentCardTitle,
} from "@/components/content-card";
import { LinkExternal } from "@/components/link-external";
import { SectionHeading } from "@/components/section-heading";

function ProductCard({
  eyebrow,
  title,
  externalLinks,
  children,
}: {
  eyebrow: string;
  title: string;
  externalLinks?: { href: string; text: ReactNode; icon?: ReactNode }[];
  children: ReactNode;
}) {
  return (
    <ContentCardBlock>
      <ContentCardEyebrow>{eyebrow}</ContentCardEyebrow>
      <ContentCardTitle>{title}</ContentCardTitle>
      <ContentCardDescription>{children}</ContentCardDescription>
      {externalLinks?.length ? (
        <div className="content-card-external-links">
          {externalLinks.map((link) => (
            <ContentCardExternalLink
              key={link.href}
              href={link.href}
              icon={link.icon}
            >
              {link.text}
            </ContentCardExternalLink>
          ))}
        </div>
      ) : null}
    </ContentCardBlock>
  );
}

export function BasketballSection() {
  return (
    <section id="basketball" className="page-section">
      <SectionHeading icon={Trophy}>Basketball</SectionHeading>
      <p className="prose-muted-constrained">
        My daughter plays at{" "}
        <LinkExternal href="https://hnmky.fi" className="link-accent">
          HNMKY
        </LinkExternal>{" "}
        and I play too, since 2025. Post ice-hockey, post floorball, post
        soccer, so that basketball court still feels suspiciously new.
      </p>
      <p className="prose-muted-constrained mb-3">
        I&apos;m also a volunteer with the role of{" "}
        <span lang="fi" className="text-ink">
          joukkueenjohtaja
        </span>{" "}
        (team manager). Scheduling and spreadsheets got painful, so I shipped
        two web app products for the club, all open source:
      </p>
      <div className="basketball-products">
        <ProductCard
          eyebrow="Club tooling · converter"
          title="eLSA → MyClub"
          externalLinks={[
            {
              href: "https://elsa-myclub.hnmky.fi/",
              text: "elsa-myclub.hnmky.fi",
              icon: <Globe />,
            },
            {
              href: "https://github.com/kirkkala/elsa-myclub",
              text: "kirkkala/elsa-myclub",
              icon: <GitHubIcon />,
            },
          ]}
        >
          A tool to convert the association&apos;s{" "}
          <LinkExternal href="https://elsa.basket.fi" className="link-accent">
            eLSA
          </LinkExternal>{" "}
          excel sheets into{" "}
          <LinkExternal href="https://www.myclub.fi/" className="link-accent">
            MyClub
          </LinkExternal>{" "}
          compatible format. Saves hours of manual work in the start of every
          season.
        </ProductCard>
        <ProductCard
          eyebrow="Club tooling · operations"
          title="Home game officials"
          externalLinks={[
            {
              href: "https://github.com/kirkkala/homegame-officials",
              text: "kirkkala/homegame-officials",
              icon: <GitHubIcon />,
            },
          ]}
        >
          We app for home-game officials assignments across HNMKY clubs —
          including tracking each team&apos;s first-aid kit status.
        </ProductCard>
      </div>
    </section>
  );
}
