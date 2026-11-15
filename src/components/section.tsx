import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SectionProps = {
  /** Anchor target for the header nav (`/#id`). */
  id: string;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
};

export function Section({ id, icon: Icon, title, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="page-section">
      <h2 id={headingId} className="title-section title-section-with-icon">
        <Icon aria-hidden className="title-section-icon" strokeWidth={1.5} />
        {title}
      </h2>
      {children}
    </section>
  );
}
