import { FolderGit2 } from "lucide-react";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Section } from "@/components/section";
import { BasketballSection } from "@/components/sections/basketball-section";
import { CodingSection } from "@/components/sections/coding-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PhotographySection } from "@/components/sections/photography-section";
import {
  ReposSection,
  ReposSectionSkeleton,
} from "@/components/sections/repos-section";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="content-shell main-column">
        <HeroSection />
        <CodingSection />
        <BasketballSection />
        <PhotographySection />
        <Section id="repos" icon={FolderGit2} title="Public repositories">
          <Suspense fallback={<ReposSectionSkeleton />}>
            <ReposSection />
          </Suspense>
        </Section>
      </main>
      <Footer />
    </>
  );
}
