import { OpensInNewTab } from "@/components/opens-new-tab";
import type { GitHubRepo } from "@/lib/github";

export function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card group"
    >
      <div className="repo-card-row">
        <h3 className="repo-card-title">
          {repo.name}
          {repo.fork ? <span className="repo-card-fork">fork</span> : null}
        </h3>
        {repo.stargazers_count > 0 ? (
          <span className="repo-card-stars">
            <span className="sr-only">{repo.stargazers_count} stars</span>
            <span aria-hidden="true">★ {repo.stargazers_count}</span>
          </span>
        ) : null}
      </div>
      {repo.description ? (
        <p className="repo-card-desc">{repo.description}</p>
      ) : (
        <p className="repo-card-desc-empty">No description</p>
      )}
      {repo.language ? <p className="repo-card-lang">{repo.language}</p> : null}
      <OpensInNewTab />
    </a>
  );
}
