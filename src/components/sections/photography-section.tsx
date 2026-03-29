import { Aperture } from "lucide-react";
import { PhotographyGallery } from "@/components/photography-gallery";
import { SectionAccordion } from "@/components/section-accordion";
import { SectionAccordionHeading } from "@/components/section-heading";
import { photography } from "@/data/site";

export function PhotographySection() {
  return (
    <SectionAccordion
      id="film"
      summary={
        <SectionAccordionHeading icon={Aperture}>
          Photography
        </SectionAccordionHeading>
      }
    >
      <p className="prose-muted-constrained">
        Analogue days, from back when the darkroom saw more of me than the
        terminal. Mostly on film from that odd streak of my life when I had too
        much time.
      </p>

      <PhotographyGallery photos={photography} />
    </SectionAccordion>
  );
}
