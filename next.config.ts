import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  output: 'standalone',
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './src/lib/modernBrowserCompatibility.ts',
    },
  },
  experimental: {
    inlineCss: true,
  },
  outputFileTracingIncludes: {
    '/api/v2/runtime/typescript': ['./node_modules/@typescript/old/lib/*.d.ts'],
  },
};

export default nextConfig;
