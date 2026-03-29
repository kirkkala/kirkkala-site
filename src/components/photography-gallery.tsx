"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

type PhotographyGalleryProps = {
  photos: readonly GalleryPhoto[];
};

export function PhotographyGallery({ photos }: PhotographyGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = useMemo(
    () =>
      photos.map((p) => ({
        src: p.src,
        alt: p.alt,
        ...(p.caption ? { description: p.caption } : {}),
      })),
    [photos],
  );

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  return (
    <>
      <ul className="photo-grid">
        {photos.map((photo, i) => (
          <li key={photo.src} className="photo-item">
            <button
              type="button"
              className="photo-tile"
              onClick={() => openAt(i)}
              aria-label={`Enlarge: ${photo.alt}`}
            >
              <div className="photo-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 232px"
                  quality={72}
                />
              </div>
            </button>
            {photo.caption ? (
              <p className="photo-caption">{photo.caption}</p>
            ) : null}
          </li>
        ))}
      </ul>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Captions, Zoom]}
        carousel={{ finite: true, padding: "16px", spacing: "12px" }}
        animation={{ fade: 280 }}
        captions={{
          showToggle: true,
          descriptionTextAlign: "center",
        }}
        controller={{ closeOnBackdropClick: true }}
        on={{ view: ({ index: next }) => setIndex(next) }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
      />
    </>
  );
}
