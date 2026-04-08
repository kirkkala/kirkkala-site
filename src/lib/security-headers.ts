export type SecurityHeader = { key: string; value: string };

/** Full CSP string for production responses. */
export function buildContentSecurityPolicy(): string {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
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
    "frame-ancestors 'none'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src ${connectSrc}`,
    "manifest-src 'self'",
  ];
  return directives.join("; ");
}

export function getSecurityHeaders(isProduction: boolean): SecurityHeader[] {
  return [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ...(isProduction
      ? [
          {
            key: "Content-Security-Policy",
            value: buildContentSecurityPolicy(),
          },
        ]
      : []),
  ];
}
