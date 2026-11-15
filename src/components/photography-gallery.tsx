"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { LoadMore, useLoadMore } from "@/components/load-more";
import type { Photo } from "@/data/site";

/** Lightbox JS + CSS load on first open, not with the page. */
const PhotographyLightbox = dynamic(
  () =>
    import("@/components/photography-lightbox").then(
      (m) => m.PhotographyLightbox,
    ),
  { ssr: false },
);

export function PhotographyGallery({ photos }: { photos: readonly Photo[] }) {
  const [open, setOpen] = useState(false);
  /** `null` until the first open, so the lightbox chunk isn't requested before then. */
  const [index, setIndex] = useState<number | null>(null);
  // 6 = two rows on desktop (3 columns), three on tablet (2 columns).
  const { visible, reveal, more } = useLoadMore(photos, 6);

  return (
    <>
      <ul className="photo-grid">
        {visible.map((photo, i) => (
          <li key={photo.image.src} className="photo-item" {...reveal(i)}>
            <button
              type="button"
              className="photo-tile"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              aria-label={`Enlarge: ${photo.alt}`}
            >
              <div className="photo-frame">
                <Image
                  src={photo.image}
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
      <LoadMore {...more}>Load more photos</LoadMore>

      {/* The lightbox gets every photo, so swiping can continue past the visible ones. */}
      {index !== null ? (
        <PhotographyLightbox
          photos={photos}
          open={open}
          index={index}
          onClose={() => setOpen(false)}
          onView={setIndex}
        />
      ) : null}
    </>
  );
}
