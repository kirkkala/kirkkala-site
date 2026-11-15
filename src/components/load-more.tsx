import { ChevronDown } from "lucide-react";
import { type CSSProperties, type ReactNode, useState } from "react";

type LoadMoreState = { shown: number; total: number; onLoadMore: () => void };

/**
 * Reveals `items` in batches of `step`. Spread `reveal(i)` onto each item so loaded
 * batches animate in, and `more` onto `<LoadMore>`:
 *
 *   const { visible, reveal, more } = useLoadMore(photos, 6);
 *   {visible.map((photo, i) => <li key={…} {...reveal(i)}>…</li>)}
 *   <LoadMore {...more}>Load more photos</LoadMore>
 */
export function useLoadMore<T>(items: readonly T[], step: number) {
  const [count, setCount] = useState(step);
  const visible = items.slice(0, count);
  const more: LoadMoreState = {
    shown: visible.length,
    total: items.length,
    onLoadMore: () => setCount((n) => n + step),
  };
  /** The first batch renders as-is; later items fade in, staggered within their batch. */
  const reveal = (index: number) =>
    index < step
      ? {}
      : {
          "data-reveal": true,
          style: { "--reveal-index": (index - step) % step } as CSSProperties,
        };
  return { visible, reveal, more };
}

/**
 * Hairline progress bar with "Showing x of y" and a text button. Renders nothing
 * once everything is shown.
 */
export function LoadMore({
  shown,
  total,
  onLoadMore,
  children,
}: LoadMoreState & { children: ReactNode }) {
  if (shown >= total) return null;
  return (
    <div
      className="load-more"
      style={{ "--load-more-progress": shown / total } as CSSProperties}
    >
      <p role="status" className="load-more-status">
        Showing {shown} of {total}
      </p>
      <button
        type="button"
        className="link-accent load-more-button"
        onClick={onLoadMore}
      >
        {children}
        <ChevronDown aria-hidden className="load-more-icon" />
      </button>
    </div>
  );
}
