"use client";

import { ArrowUpToLine } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const items = [
  { id: "work", label: "Code" },
  { id: "basketball", label: "Hoops" },
  { id: "film", label: "Film" },
  { id: "repos", label: "Repos" },
] as const;

/**
 * A section counts as current while it overlaps this band: from just under the
 * sticky header (≈ `--header-scroll-gap`) down to 25% of the viewport height. Kept
 * shallow so a tall screen doesn't also catch the next section's heading.
 */
const SPY_ROOT_MARGIN = "-72px 0px -75% 0px";

/**
 * The header lives in the root layout and survives client-side navigation, so remount
 * the nav per route: its observers then attach to the new page's hero and sections.
 */
export function HeaderInPageNav() {
  return <InPageNav key={usePathname()} />;
}

function InPageNav() {
  const [pastHero, setPastHero] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Collapse the logo text and show "back to top" once the hero scrolls away.
  useEffect(() => {
    const hero = document.querySelector("main .hero-block");
    if (!hero) {
      setPastHero(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) =>
      setPastHero(!entry.isIntersecting),
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // The logo reveal CSS lives on `.site-header` (a server component), so mirror state there.
  useEffect(() => {
    document
      .querySelector(".site-header")
      ?.setAttribute("data-past-hero", String(pastHero));
  }, [pastHero]);

  // Scroll-spy: highlight the last (most recently reached) section in the band. Keep
  // the previous one while scrolling through the gap between sections.
  useEffect(() => {
    const lastId = items[items.length - 1].id;
    const inBand = new Set<string>();
    let lastFullyVisible = false;

    const update = () => {
      const current = lastFullyVisible
        ? lastId
        : items.findLast((item) => inBand.has(item.id))?.id;
      if (current) setActiveId(current);
    };

    const band = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        update();
      },
      { rootMargin: SPY_ROOT_MARGIN },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) band.observe(el);
    }

    // On tall screens a short final section can't scroll up into the band (the page
    // ends first), so treat it as current once it's entirely in view.
    const end = new IntersectionObserver(
      ([entry]) => {
        // Check both: after a long jump Chrome can report a stale ratio on an exit entry.
        lastFullyVisible =
          entry.isIntersecting && entry.intersectionRatio > 0.99;
        update();
      },
      { threshold: 1 },
    );
    const lastEl = document.getElementById(lastId);
    if (lastEl) end.observe(lastEl);

    return () => {
      band.disconnect();
      end.disconnect();
    };
  }, []);

  // Mark the current section so CSS can highlight its heading (see `.page-section[data-active]`).
  useEffect(() => {
    for (const item of items) {
      document
        .getElementById(item.id)
        ?.toggleAttribute("data-active", pastHero && activeId === item.id);
    }
  }, [pastHero, activeId]);

  return (
    <>
      <a
        href="#top"
        className="nav-link nav-link-inpage nav-link-top"
        tabIndex={pastHero ? undefined : -1}
      >
        <ArrowUpToLine
          className="size-[1.125rem] shrink-0 sm:size-5"
          strokeWidth={2}
          aria-hidden
        />
        <span className="sr-only">Back to top · {site.name}</span>
      </a>
      {items.map((item) => {
        const active = pastHero && activeId === item.id;
        return (
          // `/#id` scrolls in place on the home page and navigates home from elsewhere.
          <a
            key={item.id}
            href={`/#${item.id}`}
            className={`nav-link nav-link-inpage${active ? " nav-link-inpage-active" : ""}`}
            aria-current={active ? "location" : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}
