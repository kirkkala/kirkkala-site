import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  icon: LucideIcon;
  children: ReactNode;
};

export function SectionHeading({ icon: Icon, children }: SectionHeadingProps) {
  return (
    <h2 className="title-section title-section-with-icon">
      <Icon aria-hidden className="title-section-icon" strokeWidth={1.5} />
      {children}
    </h2>
  );
}
