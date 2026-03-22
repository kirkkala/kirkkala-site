import { Aperture } from "lucide-react";
import { PhotographyGallery } from "@/components/photography-gallery";
import { SectionHeading } from "@/components/section-heading";
import { photography } from "@/data/site";

export function PhotographySection() {
  return (
    <section id="photos">
      <SectionHeading icon={Aperture}>Analogue days</SectionHeading>
      <p className="prose-muted-constrained mt-3">
        A few frames from when I spent more time in the darkroom than in the
        terminal.
      </p>

      <PhotographyGallery photos={photography} />
    </section>
  );
}
