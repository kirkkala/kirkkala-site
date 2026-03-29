"use client";

import { ArrowUpToLine } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  closeAllSectionAccordions,
  openSectionAccordion,
} from "@/components/section-accordion";
import { site } from "@/data/site";

const items = [
  { id: "work", label: "Code" },
  { id: "basketball", label: "Hoops" },
  { id: "film", label: "Film" },
  { id: "repos", label: "Repos" },
] as const;

/** Breathing room so the section title sits just under the header border. */
const HEADER_SCROLL_BUFFER_PX = 8;

/** Slightly after `.section-accordion-panel-outer` close transition (280ms) so layout is settled before scroll. */
const ACCORDION_CLOSE_LAYOUT_MS = 300;

/**
 * Close every section, scroll to the target (collapsed, so the title aligns under the header),
 * then open that section after scrolling settles.
 */
function closeScrollThenOpenSection(id: string) {
  closeAllSectionAccordions();
  window.history.replaceState(null, "", `#${id}`);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const waitAfterCloseMs = reducedMotion ? 0 : ACCORDION_CLOSE_LAYOUT_MS;

  window.setTimeout(() => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ block: "start", behavior: "smooth" });

    let opened = false;
    const openTarget = () => {
      if (opened) return;
      opened = true;
      openSectionAccordion(id);
    };

    window.addEventListener("scrollend", openTarget, { once: true });
    window.setTimeout(openTarget, reducedMotion ? 40 : 420);
  }, waitAfterCloseMs);
}

export function HeaderInPageNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(!onHome);

  /** Match `--header-scroll-gap` to the real sticky header height for `scroll-margin` / `scroll-padding`. */
  useLayoutEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const apply = () => {
      const h = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty(
        "--header-scroll-gap",
        `${h + HEADER_SCROLL_BUFFER_PX}px`,
      );
    };

    apply();
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(apply) : null;
    ro?.observe(header);
    window.addEventListener("resize", apply);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", apply);
      document.documentElement.style.removeProperty("--header-scroll-gap");
    };
  }, []);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const sync = () => {
      if (!onHome) {
        header.setAttribute("data-past-hero", "true");
        setPastHero(true);
        setActiveId(null);
        return;
      }

      const hero = document.querySelector("main .hero-block");
      if (!hero) {
        header.setAttribute("data-past-hero", "true");
        setPastHero(true);
      } else {
        const r = hero.getBoundingClientRect();
        const heroVisible = r.bottom > 0 && r.top < window.innerHeight;
        if (heroVisible) {
          header.removeAttribute("data-past-hero");
          setPastHero(false);
        } else {
          header.setAttribute("data-past-hero", "true");
          setPastHero(true);
        }
      }

      const pad = parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
      );
      const band =
        Math.max(header.getBoundingClientRect().bottom, pad || 0) + 2;
      let id: string | null = null;
      for (const x of items) {
        const el = document.getElementById(x.id);
        if (el && el.getBoundingClientRect().top <= band) id = x.id;
      }
      setActiveId(id);
    };

    sync();
    addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    addEventListener("hashchange", sync);
    window.addEventListener("scrollend", sync, { passive: true });
    return () => {
      removeEventListener("scroll", sync);
      removeEventListener("resize", sync);
      removeEventListener("hashchange", sync);
      window.removeEventListener("scrollend", sync);
    };
  }, [onHome]);

  return (
    <>
      <a
        href={onHome ? "#top" : "/#top"}
        className="nav-link nav-link-inpage nav-link-top"
        tabIndex={pastHero ? undefined : -1}
        onClick={() => {
          if (onHome) closeAllSectionAccordions();
        }}
      >
        <ArrowUpToLine
          className="size-[1.125rem] shrink-0 sm:size-5"
          strokeWidth={2}
          aria-hidden
        />
        <span className="sr-only">Back to top · {site.name}</span>
      </a>
      {items.map((item) => {
        const active = onHome && activeId === item.id;
        return (
          <a
            key={item.id}
            href={onHome ? `#${item.id}` : `/#${item.id}`}
            className={`nav-link nav-link-inpage${active ? " nav-link-inpage-active" : ""}`}
            aria-current={active ? "location" : undefined}
            onClick={(e) => {
              if (!onHome) return;
              e.preventDefault();
              closeScrollThenOpenSection(item.id);
            }}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}
