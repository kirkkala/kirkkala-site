import { Aperture } from "lucide-react";
import { PhotographyGallery } from "@/components/photography-gallery";
import { Section } from "@/components/section";
import { photography } from "@/data/site";

export function PhotographySection() {
  return (
    <Section id="film" icon={Aperture} title="Photography">
      <p className="prose-muted-constrained">
        Analogue days, from back when the darkroom saw more of me than the
        terminal. Mostly on film from that odd streak of my life when I had too
        much time.
      </p>

      <PhotographyGallery photos={photography} />
    </Section>
  );
}
