import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // Disable ESLint during `next build` — the built-in Next.js ESLint plugin
  // throws "nextVitalsConfig is not iterable" on 15.5.x, which fails the
  // Vercel build. Type-checking and linting run separately in CI.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
