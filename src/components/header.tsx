import Image from "next/image";
import { OpensInNewTab } from "@/components/opens-new-tab";
import { site } from "@/data/site";

const nav = [
  { href: "#work", label: "Code" },
  { href: "#photos", label: "Film" },
  { href: "#repos", label: "Repos" },
] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="content-shell header-inner">
        <a
          href="#top"
          aria-label={`${site.name} — back to top`}
          className="group site-logo"
        >
          <Image
            src="/icon.svg"
            alt=""
            width={36}
            height={36}
            className="site-logo-mark"
            priority
          />
          <span className="site-logo-reveal">
            <span className="site-logo-reveal-inner">
              <span className="site-logo-text">{site.handle}</span>
            </span>
          </span>
        </a>
        <nav aria-label="Page sections" className="header-nav">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link nav-link-inpage"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.links.github}
            className="nav-link nav-link-header-external"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <OpensInNewTab />
          </a>
        </nav>
      </div>
    </header>
  );
}
