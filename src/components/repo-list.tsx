"use client";

import { useState } from "react";
import { LoadMoreButton } from "@/components/load-more-button";
import { RepoCard } from "@/components/repo-card";
import type { GitHubRepo } from "@/lib/github";

const STEP = 4;

export function RepoList({ repos }: { repos: readonly GitHubRepo[] }) {
  const [visible, setVisible] = useState(STEP);
  const remaining = repos.length - visible;

  return (
    <>
      <ul className="repo-grid">
        {repos.slice(0, visible).map((repo) => (
          <li key={repo.id}>
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
      {remaining > 0 ? (
        <LoadMoreButton
          next={Math.min(STEP, remaining)}
          noun={["repository", "repositories"]}
          onClick={() => setVisible((n) => n + STEP)}
        />
      ) : null}
    </>
  );
}
