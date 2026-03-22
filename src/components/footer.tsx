import { OpensInNewTab } from "@/components/opens-new-tab";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-shell footer-inner">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav aria-label="Profiles" className="footer-nav">
          <a
            href={site.links.github}
            className="nav-link nav-link-footer"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/kirkkala
            <OpensInNewTab />
          </a>
          <a
            href={site.links.employer}
            className="nav-link nav-link-footer"
            target="_blank"
            rel="noopener noreferrer"
          >
            @digitalist-se
            <OpensInNewTab />
          </a>
        </nav>
      </div>
    </footer>
  );
}
