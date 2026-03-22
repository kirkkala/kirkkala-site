import { OpensInNewTab } from "@/components/opens-new-tab";
import { RepoCard } from "@/components/repo-card";
import { site } from "@/data/site";
import { getPublicRepos } from "@/lib/github";

export async function ReposSection() {
  const { repos, loadError } = await getPublicRepos(site.handle);

  return (
    <section id="repos" className="page-section-loose">
      <div className="repos-intro">
        <h2 className="title-section">Public repositories</h2>
        <p className="prose-muted">My own coding projects.</p>
      </div>
      {loadError ? (
        <p className="empty-panel" role="status">
          {loadError}{" "}
          <a
            href={site.links.github}
            className="link-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            View them on GitHub
            <OpensInNewTab />
          </a>
        </p>
      ) : repos.length > 0 ? (
        <ul className="repo-grid">
          {repos.map((repo) => (
            <li key={repo.id}>
              <RepoCard repo={repo} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-panel">
          Nothing to list after filtering — either you’re incredibly minimalist
          or the API sent an empty shelf.{" "}
          <a
            href={site.links.github}
            className="link-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            View them on GitHub
            <OpensInNewTab />
          </a>
        </p>
      )}
    </section>
  );
}
