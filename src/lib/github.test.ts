import { getPublicRepos, githubRestJsonHeaders } from "@/lib/github";

function mockResponse(
  body: unknown,
  init: { ok?: boolean; status?: number; jsonRejects?: boolean } = {},
): Response {
  const ok = init.ok ?? true;
  const status = init.status ?? (ok ? 200 : 500);
  return {
    ok,
    status,
    json: init.jsonRejects
      ? () => Promise.reject(new Error("invalid json"))
      : () => Promise.resolve(body),
  } as Response;
}

describe("getPublicRepos", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("calls the GitHub API with encoded username and expected headers", async () => {
    const fetchMock = jest.fn().mockResolvedValue(mockResponse([]));
    global.fetch = fetchMock;

    await getPublicRepos("some-user");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/users/some-user/repos?per_page=50&sort=updated&type=owner",
      expect.objectContaining({
        next: { revalidate: 3600 },
        headers: githubRestJsonHeaders,
      }),
    );
  });

  it("encodes special characters in the username", async () => {
    const fetchMock = jest.fn().mockResolvedValue(mockResponse([]));
    global.fetch = fetchMock;

    await getPublicRepos("a/b");

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.github.com/users/${encodeURIComponent("a/b")}/repos?per_page=50&sort=updated&type=owner`,
      expect.any(Object),
    );
  });

  it("filters archived repos, sorts by stars descending, and returns at most 12", async () => {
    const repos = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      name: `repo-${i}`,
      description: null,
      html_url: `https://github.com/u/repo-${i}`,
      language: "TS",
      stargazers_count: i,
      fork: false,
      archived: i === 3 || i === 7,
    }));

    global.fetch = jest.fn().mockResolvedValue(mockResponse(repos));

    const { repos: out, loadError } = await getPublicRepos("u");

    expect(loadError).toBeNull();
    expect(out).toHaveLength(12);
    expect(out.map((r) => r.name)).not.toContain("repo-3");
    expect(out.map((r) => r.name)).not.toContain("repo-7");
    expect(out[0]?.stargazers_count).toBe(14);
    expect(out[1]?.stargazers_count).toBe(13);
    expect(out[11]?.stargazers_count).toBe(1);
  });

  it("returns loadError when fetch throws", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new TypeError("Failed to fetch"));

    const result = await getPublicRepos("u");

    expect(result.repos).toEqual([]);
    expect(result.loadError).toContain("GitHub went off-grid");
  });

  it("returns loadError when response is not ok", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(mockResponse([], { ok: false, status: 403 }));

    const result = await getPublicRepos("u");

    expect(result.repos).toEqual([]);
    expect(result.loadError).toContain("403");
    expect(result.loadError).toContain("GitHub waved HTTP");
  });

  it("returns loadError when JSON parsing fails", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(mockResponse(null, { jsonRejects: true }));

    const result = await getPublicRepos("u");

    expect(result.repos).toEqual([]);
    expect(result.loadError).toContain("JSON");
  });

  it("returns loadError when body is not an array", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(mockResponse({ message: "nope" }));

    const result = await getPublicRepos("u");

    expect(result.repos).toEqual([]);
    expect(result.loadError).toContain("Schrödinger");
  });

  it("returns empty repos with no error when the user has no repositories", async () => {
    global.fetch = jest.fn().mockResolvedValue(mockResponse([]));

    const result = await getPublicRepos("u");

    expect(result).toEqual({ repos: [], loadError: null });
  });
});
