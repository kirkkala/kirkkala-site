import type { ComponentPropsWithoutRef } from "react";

export type LinkExternalProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "rel" | "target"
>;

/** Opens in a new tab with safe `rel` and WCAG 3.2.5 sr-only hint. */
export function LinkExternal({ children, ...props }: LinkExternalProps) {
  return (
    <a target="_blank" rel="noopener" {...props}>
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
