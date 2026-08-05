import type { SVGProps } from "react";

/**
 * Canonical "K" monogram path. Single source of truth for the mark rendered
 * in-app (e.g. the intro loader). The favicon at `src/app/icon.svg` mirrors this
 * because Next's icon convention requires a static SVG file — keep them in sync.
 */
export const BRAND_MARK_PATH =
  "M6 9h9m-4.5 0v15M17 9v15m0-8.5L24.5 9M17 15.5l7.5 6.5";

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  /** Class for the background disc (defaults to no fill class → transparent). */
  discClassName?: string;
  /** Class for the monogram stroke path. */
  strokeClassName?: string;
  /** Accessible label; when omitted the mark is treated as decorative. */
  title?: string;
};

export function BrandMark({
  discClassName,
  strokeClassName,
  title,
  ...props
}: BrandMarkProps) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: labeled (role=img) vs decorative (aria-hidden) is chosen via the `title` prop
    <svg
      viewBox="0 0 32 32"
      fill="none"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <circle className={discClassName} cx="16" cy="16" r="16" />
      <path
        className={strokeClassName}
        pathLength={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.75}
        d={BRAND_MARK_PATH}
      />
    </svg>
  );
}
