import { FolderGit2 } from "lucide-react";
import { LinkExternal } from "@/components/link-external";
import { RepoList } from "@/components/repo-list";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";
import { getPublicRepos } from "@/lib/github";

/** Suspense fallback while GitHub is fetched — keeps the rest of the page streaming. */
export function ReposSectionSkeleton() {
  return (
    <section
      id="repos"
      className="page-section-loose"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="prose-muted animate-pulse">Loading repositories…</p>
    </section>
  );
}

export async function ReposSection() {
  const { repos, loadError } = await getPublicRepos(site.handle);

  return (
    <section id="repos" className="page-section-loose">
      <div className="repos-intro">
        <SectionHeading icon={FolderGit2}>Public repositories</SectionHeading>
        <p className="prose-muted">
          Some work related, some just for fun and some useful - or at least I
          think so.
        </p>
      </div>
      {loadError ? (
        <p className="empty-panel" role="status">
          {loadError}{" "}
          <LinkExternal href={site.links.github} className="link-accent">
            View them on GitHub
          </LinkExternal>
        </p>
      ) : repos.length > 0 ? (
        <RepoList repos={repos} />
      ) : (
        <p className="empty-panel">
          Nothing to list after filtering — either you’re incredibly minimalist
          or the API sent an empty shelf.{" "}
          <LinkExternal href={site.links.github} className="link-accent">
            View them on GitHub
          </LinkExternal>
        </p>
      )}
    </section>
  );
}
