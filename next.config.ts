import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  output: 'standalone',
  outputFileTracingIncludes: {
    '/api/v2/runtime/typescript': ['./node_modules/@typescript/old/lib/*.d.ts'],
  },
};

export default nextConfig;
