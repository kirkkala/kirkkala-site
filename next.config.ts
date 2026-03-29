import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // When developing, Sharp-backed optimization for many large originals can peg CPU/RAM.
    // Hence optimization only for production builds.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
