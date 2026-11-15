"use client";

import { LoadMore, useLoadMore } from "@/components/load-more";
import { RepoCard } from "@/components/repo-card";
import type { GitHubRepo } from "@/lib/github";

export function RepoList({ repos }: { repos: readonly GitHubRepo[] }) {
  const { visible, reveal, more } = useLoadMore(repos, 4);

  return (
    <>
      <ul className="repo-grid">
        {visible.map((repo, i) => (
          <li key={repo.id} {...reveal(i)}>
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
      <LoadMore {...more}>Load more GitHub projects</LoadMore>
    </>
  );
}
