import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Note we enable CSP only in production, dev mode not bothered to set it up..
function contentSecurityPolicy(): string {
  // script-src rules.
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    "https://vercel.live",
    "https://cdn.vercel-insights.com",
    "https://va.vercel-scripts.com",
  ].join(" ");

  // connect-src rules.
  const connectSrc = [
    "'self'",
    "https://vercel.live",
    "https://cdn.vercel-insights.com",
  ].join(" ");

  // All directives together that are needed for the app to work, add to variables if any directive start getting more rules
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

const securityHeaders: { key: string; value: string }[] = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  ...(isProd
    ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy() }]
    : []),
];

const nextConfig: NextConfig = {
  // Inline CSS with HTML to avoid render-blocking stylesheet requests.
  experimental: {
    inlineCss: true,
  },
  images: {
    // When developing, Sharp-backed optimization for many large originals can peg CPU/RAM.
    unoptimized: process.env.NODE_ENV === "development",
    formats: ["image/avif", "image/webp"],
    // Must list every `quality` used by <Image /> (gallery thumbs use 72; default is 75).
    qualities: [72, 75],
    // Layout is max-w-3xl (~768px); thumbs are ~1/3 width — skip 2K/4K srcset buckets.
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
