type LoadMoreButtonProps = {
  /** How many items the next click reveals. */
  next: number;
  /** Item name for the accessible label, e.g. `["photo", "photos"]`. */
  noun: readonly [singular: string, plural: string];
  onClick: () => void;
};

export function LoadMoreButton({ next, noun, onClick }: LoadMoreButtonProps) {
  return (
    <button
      type="button"
      className="load-more"
      aria-label={`Load ${next} more ${next === 1 ? noun[0] : noun[1]}`}
      onClick={onClick}
    >
      Load more
    </button>
  );
}
