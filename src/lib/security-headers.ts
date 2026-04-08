export type SecurityHeader = { key: string; value: string };

/**
 * Production CSP (used from `middleware.ts` with a per-request nonce).
 * `script-src` uses `'nonce-…'` + `'strict-dynamic'` so trusted scripts can load
 * dependents (e.g. Vercel Analytics) without `'unsafe-inline'`.
 *
 * Next reads the nonce from this policy on the *request* header and adds it to
 * `<script>` tags — requires `dynamic = 'force-dynamic'` on the root layout.
 */
export function buildContentSecurityPolicy(nonce: string): string {
  const frameSrc = ["'self'", "https://vercel.live"].join(" ");

  const nonceSrc = `'nonce-${nonce}'`;
  const scriptSrc = [
    nonceSrc,
    "'strict-dynamic'",
    "https://vercel.live",
    "https://cdn.vercel-insights.com",
    "https://va.vercel-scripts.com",
  ].join(" ");

  const connectSrc = [
    "'self'",
    "https://vercel.live",
    "https://cdn.vercel-insights.com",
  ].join(" ");

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    `frame-src ${frameSrc}`,
    "frame-ancestors 'none'",
    `script-src ${scriptSrc}`,
    // `experimental.inlineCss` — inline style blocks still need this
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src ${connectSrc}`,
    "manifest-src 'self'",
  ];
  return directives.join("; ");
}

/** Headers applied via `next.config` (CSP itself is set in middleware). */
export function getSecurityHeaders(): SecurityHeader[] {
  return [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  ];
}
