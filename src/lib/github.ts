export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
};

export type PublicReposResult = {
  repos: GitHubRepo[];
  /** Set when the request fails so the page can explain instead of crashing */
  loadError: string | null;
};

export const githubRestJsonHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2026-03-10",
} as const satisfies Record<string, string>;

export async function getPublicRepos(
  username: string,
): Promise<PublicReposResult> {
  // Dev-only: set REPO_FETCH_DELAY_MS=3000 in `.env.local` to see the repos Suspense
  // fallback.
  if (
    process.env.NODE_ENV === "development" &&
    process.env.REPO_FETCH_DELAY_MS
  ) {
    const ms = Number(process.env.REPO_FETCH_DELAY_MS);
    if (Number.isFinite(ms) && ms > 0) {
      await new Promise((r) => setTimeout(r, ms));
    }
  }

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`;

  let res: Response;
  try {
    res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: githubRestJsonHeaders,
    });
  } catch {
    return {
      repos: [],
      loadError:
        "GitHub went off-grid — DNS drama, Wi-Fi gremlins or the internet blinked. The repos are probably fine; this page just can’t see them now.",
    };
  }

  if (!res.ok) {
    return {
      repos: [],
      loadError: `GitHub waved HTTP ${res.status} at us. Rude. No repo parade for now — unless you open the profile link below and cheer manually.`,
    };
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return {
      repos: [],
      loadError:
        "GitHub’s reply wasn’t JSON we could parse. Maybe a packet got stage fright halfway through or my coding skills are rusty.",
    };
  }

  if (!Array.isArray(data)) {
    return {
      repos: [],
      loadError:
        "Expected a tidy list of repositories; got… a mystery shape. Schrödinger’s API response.",
    };
  }

  const repos = (data as GitHubRepo[])
    .filter((r) => !r.archived)
    // Stargazers = those who starred the repo on GitHub, sorting by the most-starred first for the grid.
    .sort((a, b) => b.stargazers_count - a.stargazers_count);

  return { repos, loadError: null };
}
