import { PhotographyGallery } from "@/components/photography-gallery";
import { photography } from "@/data/site";

export function PhotographySection() {
  return (
    <section id="photos">
      <h2 className="title-section">Analogue days</h2>
      <p className="prose-muted-constrained mt-3">
        Forage edison bulb butcher master cleanse authentic gluten-free.
        Humblebrag biodiesel kombucha.
      </p>

      <PhotographyGallery photos={photography} />
    </section>
  );
}
