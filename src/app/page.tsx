import { FolderGit2 } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { BasketballSection } from "@/components/sections/basketball-section";
import { CodingSection } from "@/components/sections/coding-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PhotographySection } from "@/components/sections/photography-section";
import {
  ReposSection,
  ReposSectionSkeleton,
} from "@/components/sections/repos-section";
import { personJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  // Resolved against `metadataBase` in the root layout.
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <HeroSection />
      <CodingSection />
      <BasketballSection />
      <PhotographySection />
      <Section id="repos" icon={FolderGit2} title="Public repositories">
        <Suspense fallback={<ReposSectionSkeleton />}>
          <ReposSection />
        </Suspense>
      </Section>
    </>
  );
}
