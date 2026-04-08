import {
  buildContentSecurityPolicy,
  getSecurityHeaders,
} from "@/lib/security-headers";

const testNonce = "dGVzdC1ub25jZS12YWx1ZQ";

describe("getSecurityHeaders", () => {
  it("sets nosniff and referrer policy (CSP is applied in middleware)", () => {
    const headers = getSecurityHeaders();
    expect(headers).toEqual([
      { key: "X-Content-Type-Options", value: "nosniff" },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value:
          "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
      },
    ]);
    expect(headers.some((h) => h.key === "Content-Security-Policy")).toBe(
      false,
    );
  });
});

describe("buildContentSecurityPolicy", () => {
  it("uses nonce + strict-dynamic and allowlisted script/connect sources", () => {
    const csp = buildContentSecurityPolicy(testNonce);
    expect(csp).toContain(`'nonce-${testNonce}'`);
    expect(csp).toContain("'strict-dynamic'");
    expect(csp).not.toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toMatch(/script-src[^;]+https:\/\/vercel\.live/);
    expect(csp).toMatch(/connect-src[^;]+https:\/\/cdn\.vercel-insights\.com/);
  });
});
