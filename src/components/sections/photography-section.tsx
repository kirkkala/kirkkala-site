import Image from "next/image";
import { photography } from "@/data/site";

const photoPlaceholders = ["ph-1", "ph-2", "ph-3"] as const;

export function PhotographySection() {
  const hasPhotos = photography.length > 0;

  return (
    <section id="photos">
      <h2 className="title-section">Analogue days</h2>
      <p className="prose-muted-constrained mt-3">
        Forage edison bulb butcher master cleanse authentic gluten-free.
        Humblebrag biodiesel kombucha.
      </p>

      <ul className="photo-grid">
        {hasPhotos
          ? photography.map((photo) => (
              <li key={photo.src} className="photo-item">
                <div className="photo-frame">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {photo.caption ? (
                  <p className="photo-caption">{photo.caption}</p>
                ) : null}
              </li>
            ))
          : photoPlaceholders.map((id, i) => (
              <li key={id}>
                <div className="photo-placeholder" aria-hidden="true">
                  <div className="photo-placeholder-shade" />
                  <span className="photo-placeholder-label">Frame {i + 1}</span>
                </div>
              </li>
            ))}
      </ul>
    </section>
  );
}
