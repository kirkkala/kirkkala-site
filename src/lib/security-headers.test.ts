import {
  buildContentSecurityPolicy,
  getSecurityHeaders,
} from "@/lib/security-headers";

describe("getSecurityHeaders", () => {
  it("includes the static CSP plus hardening headers", () => {
    const headers = getSecurityHeaders();
    expect(headers).toEqual([
      {
        key: "Content-Security-Policy",
        value: buildContentSecurityPolicy(),
      },
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
  });
});

describe("buildContentSecurityPolicy", () => {
  it("uses a static (nonce-free) policy that keeps everything but scripts locked down", () => {
    const csp = buildContentSecurityPolicy();
    // Static, cacheable policy: no per-request nonce, no strict-dynamic.
    expect(csp).not.toContain("nonce-");
    expect(csp).not.toContain("'strict-dynamic'");
    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toMatch(/script-src[^;]+https:\/\/vercel\.live/);
    expect(csp).toMatch(/connect-src[^;]+https:\/\/cdn\.vercel-insights\.com/);
  });
});
