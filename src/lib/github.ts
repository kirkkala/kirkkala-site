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

export async function getPublicRepos(
  username: string,
): Promise<PublicReposResult> {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=50&sort=updated&type=owner`;

  let res: Response;
  try {
    res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
      },
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
    // Stargazers = users who starred the repo on GitHub; sort puts the most-starred first for the grid.
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12);

  return { repos, loadError: null };
}
