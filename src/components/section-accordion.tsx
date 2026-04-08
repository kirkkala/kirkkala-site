"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";

const EV_OPEN = "accordion:open";
const EV_CLOSE_ALL = "accordion:closeAll";

export type SectionAccordionProps = {
  id: string;
  summary: ReactNode;
  children: ReactNode;
  panelClassName?: string;
  className?: string;
};

function dispatchOpen(targetId: string) {
  document.dispatchEvent(
    new CustomEvent(EV_OPEN, { detail: { id: targetId } }),
  );
}

export function SectionAccordion({
  id,
  summary,
  children,
  panelClassName = "page-section",
  className = "",
}: SectionAccordionProps) {
  const [open, setOpen] = useState(false);
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  useEffect(() => {
    const onOpenEvent = (e: Event) => {
      const targetId = (e as CustomEvent<{ id: string }>).detail?.id;
      setOpen(targetId === id);
    };
    const onCloseAll = () => setOpen(false);
    const syncHash = () => {
      if (window.location.hash.slice(1) === id) setOpen(true);
    };

    document.addEventListener(EV_OPEN, onOpenEvent);
    document.addEventListener(EV_CLOSE_ALL, onCloseAll);
    window.addEventListener("hashchange", syncHash);
    syncHash();

    return () => {
      document.removeEventListener(EV_OPEN, onOpenEvent);
      document.removeEventListener(EV_CLOSE_ALL, onCloseAll);
      window.removeEventListener("hashchange", syncHash);
    };
  }, [id]);

  const toggle = useCallback(() => {
    if (open) setOpen(false);
    else dispatchOpen(id);
  }, [id, open]);

  const rootClass =
    className === "" ? "section-accordion" : `section-accordion ${className}`;

  return (
    <div id={id} data-open={open} className={rootClass}>
      <h2 className="section-accordion-heading title-section title-section-with-icon m-0">
        <button
          type="button"
          id={triggerId}
          className="section-accordion-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
        >
          {summary}
        </button>
      </h2>
      <div className="section-accordion-panel-outer">
        <div className="section-accordion-panel-sizer">
          <section
            id={panelId}
            aria-labelledby={triggerId}
            inert={!open}
            className={`section-accordion-panel ${panelClassName}`}
          >
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}

export function openSectionAccordion(sectionId: string): void {
  dispatchOpen(sectionId);
}

export function closeAllSectionAccordions(): void {
  document.dispatchEvent(new CustomEvent(EV_CLOSE_ALL));
}
