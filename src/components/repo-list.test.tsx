import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RepoList } from "@/components/repo-list";
import type { GitHubRepo } from "@/lib/github";

function makeRepo(id: number, name: string): GitHubRepo {
  return {
    id,
    name,
    description: "Test",
    html_url: `https://github.com/u/${name}`,
    language: "TS",
    stargazers_count: 0,
    fork: false,
  };
}

describe("RepoList", () => {
  it("shows four cards initially, loads four more per click, then hides the button", async () => {
    const user = userEvent.setup();
    const repos = Array.from({ length: 10 }, (_, i) =>
      makeRepo(i, `repo-${i}`),
    );
    render(<RepoList repos={repos} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(4);

    await user.click(
      screen.getByRole("button", { name: "Load more GitHub projects" }),
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(8);

    await user.click(
      screen.getByRole("button", { name: "Load more GitHub projects" }),
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("animates only items revealed by Load more, staggered within the batch", async () => {
    const user = userEvent.setup();
    const repos = Array.from({ length: 10 }, (_, i) =>
      makeRepo(i, `repo-${i}`),
    );
    render(<RepoList repos={repos} />);
    await user.click(
      screen.getByRole("button", { name: "Load more GitHub projects" }),
    );

    const items = screen.getAllByRole("listitem");
    for (const item of items.slice(0, 4)) {
      expect(item).not.toHaveAttribute("data-reveal");
    }
    items.slice(4).forEach((item, i) => {
      expect(item).toHaveAttribute("data-reveal");
      expect(item.style.getPropertyValue("--reveal-index")).toBe(String(i));
    });
  });

  it("does not render Load more when at most four repos", () => {
    const repos = [makeRepo(1, "a"), makeRepo(2, "b")];
    render(<RepoList repos={repos} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
