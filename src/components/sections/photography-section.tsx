import { PhotographyGallery } from "@/components/photography-gallery";
import { photography } from "@/data/site";

export function PhotographySection() {
  return (
    <section id="photos">
      <h2 className="title-section">Analogue days</h2>
      <p className="prose-muted-constrained mt-3">
        A few frames from when I spent more time in the darkroom than in the
        terminal.
      </p>

      <PhotographyGallery photos={photography} />
    </section>
  );
}
