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

export function HeaderInPageNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(!onHome);

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
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}
