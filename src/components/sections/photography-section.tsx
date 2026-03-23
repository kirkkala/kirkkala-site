import { Aperture } from "lucide-react";
import { PhotographyGallery } from "@/components/photography-gallery";
import { SectionHeading } from "@/components/section-heading";
import { photography } from "@/data/site";

export function PhotographySection() {
  return (
    <section id="photos">
      <SectionHeading icon={Aperture}>Analogue days</SectionHeading>
      <p className="prose-muted-constrained mt-3">
        From back when the darkroom saw more of me than the terminal. Mostly
        film, that odd streak of my life when I had extra time.
      </p>

      <PhotographyGallery photos={photography} />
    </section>
  );
}
