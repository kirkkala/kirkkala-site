import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  icon: LucideIcon;
  children: ReactNode;
};

function SectionTitleIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon aria-hidden className="title-section-icon" strokeWidth={1.5} />;
}

export function SectionHeading({ icon, children }: SectionHeadingProps) {
  return (
    <h2 className="title-section title-section-with-icon">
      <SectionTitleIcon icon={icon} />
      {children}
    </h2>
  );
}

/** Icon + label for `SectionAccordion` triggers (the accordion supplies the `h2`). */
export function SectionAccordionHeading({
  icon,
  children,
}: SectionHeadingProps) {
  return (
    <>
      <SectionTitleIcon icon={icon} />
      {children}
    </>
  );
}
