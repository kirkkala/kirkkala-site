import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { LinkExternal } from "@/components/link-external";
import { site } from "@/data/site";

function linkPath(href: string) {
  let path = new URL(href).pathname;
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path;
}

export function Footer() {
  const githubPath = linkPath(site.links.github);
  const linkedinPath = linkPath(site.links.linkedin);

  return (
    <footer className="site-footer">
      <div className="content-shell footer-inner">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav aria-label="Profiles" className="footer-nav">
          <LinkExternal
            href={site.links.github}
            className="nav-link nav-link-footer gap-1.5"
            aria-label={`${site.name} on GitHub`}
          >
            <GitHubIcon className="size-4 shrink-0 opacity-90" />
            {githubPath}
          </LinkExternal>
          <LinkExternal
            href={site.links.linkedin}
            className="nav-link nav-link-footer gap-1.5"
            aria-label={`${site.name} on LinkedIn`}
          >
            <LinkedInIcon className="size-4 shrink-0 opacity-90" />
            {linkedinPath}
          </LinkExternal>
        </nav>
      </div>
    </footer>
  );
}
