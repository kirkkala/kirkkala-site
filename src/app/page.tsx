import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CodingSection } from "@/components/sections/coding-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PhotographySection } from "@/components/sections/photography-section";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="content-shell main-column">
        <HeroSection />
        <CodingSection />
        <PhotographySection />
      </main>
      <Footer />
    </>
  );
}
