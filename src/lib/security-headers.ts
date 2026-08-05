export type SecurityHeader = { key: string; value: string };

/**
 * Static CSP applied via `next.config` headers so the HTML shell can be
 * statically generated and cached on the CDN (fast TTFB on Vercel).
 *
 * `script-src` uses `'unsafe-inline'` instead of a per-request nonce: nonce-based
 * CSP forces dynamic rendering (Next only stamps a nonce into scripts during SSR),
 * which disables CDN caching. Next's experimental hash-based SRI can't replace the
 * nonce here either — it doesn't cover the inline flight scripts (`self.__next_f`)
 * and is webpack-only (this project builds with Turbopack). Everything else stays
 * locked down: `default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`.
 *
 * `'strict-dynamic'` is intentionally omitted — with it present, CSP3 browsers
 * ignore both `'unsafe-inline'` and the host allowlist.
 *
 * `'unsafe-eval'` is added in development only: React uses `eval()` for debugging
 * features (e.g. reconstructing server callstacks). It is never used in production.
 */
export function buildContentSecurityPolicy(): string {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    ...(process.env.NODE_ENV === "development" ? ["'unsafe-eval'"] : []),
    "https://vercel.live",
    "https://cdn.vercel-insights.com",
    "https://va.vercel-scripts.com",
  ].join(" ");

  const connectSrc = [
    "'self'",
    "https://vercel.live",
    "https://cdn.vercel-insights.com",
  ].join(" ");

  const frameSrc = ["'self'", "https://vercel.live"].join(" ");

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    `frame-src ${frameSrc}`,
    "frame-ancestors 'none'",
    `script-src ${scriptSrc}`,
    // `experimental.inlineCss` — inline style blocks need `'unsafe-inline'`
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src ${connectSrc}`,
    "manifest-src 'self'",
  ];
  return directives.join("; ");
}

/** Security headers applied to every response via `next.config`. */
export function getSecurityHeaders(): SecurityHeader[] {
  return [
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    // Deny powerful features by default (empty allowlist = disabled for this origin).
    {
      key: "Permissions-Policy",
      value:
        "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
    },
  ];
}
