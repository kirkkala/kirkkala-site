import Image from "next/image";
import { HeaderInPageNav } from "@/components/header-in-page-nav";
import { site } from "@/data/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="content-shell header-inner">
        <a href="/" aria-label={`${site.name} — home`} className="site-logo">
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
          <HeaderInPageNav />
        </nav>
      </div>
    </header>
  );
}
