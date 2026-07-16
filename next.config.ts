import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  output: 'standalone',
  experimental: {
    inlineCss: true,
  },
  outputFileTracingIncludes: {
    '/': ['./content/v2/.runtime/curriculum.sqlite'],
    '/challenges': ['./content/v2/.runtime/curriculum.sqlite'],
    '/learn/*': ['./content/v2/.runtime/curriculum.sqlite'],
    '/learn/*/*/*': ['./content/v2/.runtime/curriculum.sqlite'],
    '/api/v2/courses/*/activities/*/*': ['./content/v2/.runtime/curriculum.sqlite'],
  },
};

export default nextConfig;
