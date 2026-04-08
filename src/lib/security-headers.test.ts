import {
  buildContentSecurityPolicy,
  getSecurityHeaders,
} from "@/lib/security-headers";

describe("getSecurityHeaders", () => {
  it("always sets nosniff and referrer policy", () => {
    for (const prod of [true, false]) {
      const headers = getSecurityHeaders(prod);
      expect(headers).toEqual(
        expect.arrayContaining([
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ]),
      );
    }
  });

  it("includes Content-Security-Policy only in production", () => {
    expect(
      getSecurityHeaders(false).some(
        (h) => h.key === "Content-Security-Policy",
      ),
    ).toBe(false);

    const prod = getSecurityHeaders(true);
    const csp = prod.find((h) => h.key === "Content-Security-Policy");
    expect(csp).toBeDefined();
    expect(csp?.value).toBe(buildContentSecurityPolicy());
  });
});

describe("buildContentSecurityPolicy", () => {
  it("contains core directives and allowlisted script/connect sources", () => {
    const csp = buildContentSecurityPolicy();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toMatch(/script-src[^;]+https:\/\/vercel\.live/);
    expect(csp).toMatch(/connect-src[^;]+https:\/\/cdn\.vercel-insights\.com/);
  });
});
