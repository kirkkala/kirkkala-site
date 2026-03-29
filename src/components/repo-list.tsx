"use client";

import { useEffect, useRef, useState } from "react";
import { RepoCard } from "@/components/repo-card";
import type { GitHubRepo } from "@/lib/github";

const INITIAL = 4;
const STEP = 4;
/** Brief delay so the loading state is visible (purely UI). */
const LOAD_MS = 220;

export function RepoList({ repos }: { repos: readonly GitHubRepo[] }) {
  const [visible, setVisible] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    },
    [],
  );

  const shown = repos.slice(0, visible);
  const hasMore = visible < repos.length;
  const nextBatch = Math.min(STEP, repos.length - visible);

  function loadMore() {
    if (loading) return;
    setLoading(true);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setVisible((n) => Math.min(n + STEP, repos.length));
      setLoading(false);
    }, LOAD_MS);
  }

  return (
    <>
      <ul className="repo-grid" aria-busy={loading}>
        {shown.map((repo) => (
          <li key={repo.id}>
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
      {hasMore ? (
        <button
          type="button"
          className="repo-load-more"
          disabled={loading}
          aria-busy={loading}
          aria-label={
            loading
              ? "Loading repositories"
              : `Load ${nextBatch} more ${nextBatch === 1 ? "repository" : "repositories"}`
          }
          onClick={loadMore}
        >
          {loading ? "Loading…" : "Load more"}
        </button>
      ) : null}
    </>
  );
}
