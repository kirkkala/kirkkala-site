import { render, screen } from "@testing-library/react";
import { RepoCard } from "@/components/repo-card";
import type { GitHubRepo } from "@/lib/github";

function repo(overrides: Partial<GitHubRepo> = {}): GitHubRepo {
  return {
    id: 1,
    name: "hello-world",
    description: "A friendly repo",
    html_url: "https://github.com/u/hello-world",
    language: "TypeScript",
    stargazers_count: 42,
    fork: false,
    archived: false,
    ...overrides,
  };
}

describe("RepoCard", () => {
  it("renders a full-card link to the repo with title, stars, description, and language", () => {
    render(<RepoCard repo={repo()} />);

    const card = screen.getByRole("link", { name: /hello-world/i });
    expect(card).toHaveAttribute("href", "https://github.com/u/hello-world");
    expect(card).toHaveAttribute("target", "_blank");
    expect(card).toHaveAttribute("rel", "noopener");
    expect(card.className).toContain("content-card-link");

    expect(
      screen.getByRole("heading", { level: 3, name: /hello-world/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("A friendly repo")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("★ 42")).toBeInTheDocument();
    expect(
      screen.getByText("(opens in new tab)", { exact: false }),
    ).toBeInTheDocument();
  });

  it("shows fork badge when the repo is a fork", () => {
    render(<RepoCard repo={repo({ fork: true })} />);
    expect(screen.getByText("fork")).toBeInTheDocument();
  });

  it("omits stars when count is zero", () => {
    render(<RepoCard repo={repo({ stargazers_count: 0 })} />);
    expect(screen.queryByText(/★/)).not.toBeInTheDocument();
  });

  it("shows empty description copy when description is null", () => {
    render(<RepoCard repo={repo({ description: null })} />);
    expect(screen.getByText("No description")).toBeInTheDocument();
  });

  it("omits language line when language is null", () => {
    render(<RepoCard repo={repo({ language: null })} />);
    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
  });
});
