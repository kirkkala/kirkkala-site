import type { NextConfig } from "next";

import { getSecurityHeaders } from "./src/lib/security-headers";

const securityHeaders = getSecurityHeaders();

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
