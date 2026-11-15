import { LinkExternal } from "@/components/link-external";
import type { GitHubRepo } from "@/lib/github";

/** Full-card link to the repo; title styled as a link, description line-clamped. */
export function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <LinkExternal
      href={repo.html_url}
      className="content-card content-card-link group"
    >
      <div className="content-card-row">
        <h3 className="content-card-title">
          {repo.name}
          {repo.fork ? <span className="content-card-fork">fork</span> : null}
        </h3>
        {repo.stargazers_count > 0 ? (
          <span className="content-card-stars">
            <span className="sr-only">{repo.stargazers_count} stars</span>
            <span aria-hidden="true">★ {repo.stargazers_count}</span>
          </span>
        ) : null}
      </div>
      {repo.description ? (
        <p className="content-card-desc">{repo.description}</p>
      ) : (
        <p className="content-card-desc-empty">No description</p>
      )}
      {repo.language ? (
        <p className="content-card-lang">{repo.language}</p>
      ) : null}
    </LinkExternal>
  );
}
