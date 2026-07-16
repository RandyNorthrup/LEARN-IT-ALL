import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface PackageManifest {
  packageManager?: string;
  engines?: Record<string, string>;
  allowScripts?: Record<string, boolean>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  overrides?: Record<string, string>;
}

interface PackageLock {
  packages?: Record<
    string,
    {
      resolved?: string;
    }
  >;
}

describe('production JavaScript toolchain pins', () => {
  const root = process.cwd();
  const manifest = JSON.parse(
    readFileSync(path.join(root, 'package.json'), 'utf8')
  ) as PackageManifest;
  const dockerfile = readFileSync(path.join(root, 'Dockerfile'), 'utf8');
  const dockerignore = readFileSync(path.join(root, '.dockerignore'), 'utf8');
  const nextConfig = readFileSync(path.join(root, 'next.config.ts'), 'utf8');
  const npmrc = readFileSync(path.join(root, '.npmrc'), 'utf8');
  const lock = JSON.parse(
    readFileSync(path.join(root, 'package-lock.json'), 'utf8')
  ) as PackageLock;

  it('pins the latest verified Node 24 LTS and compatible npm release', () => {
    expect(manifest.packageManager).toBe('npm@12.0.1');
    expect(manifest.engines).toEqual({
      node: '>=24.18.0 <25',
      npm: '>=12.0.1 <13',
    });
  });

  it('uses one direct TypeScript compiler compatible with current Next.js tooling', () => {
    expect(manifest.devDependencies?.typescript).toBe('^6.0.3');
    expect(Object.keys(manifest.devDependencies ?? {})).not.toContain('@typescript/native');
    expect(manifest.devDependencies?.typescript).not.toContain('npm:');
  });

  it('runs the latest Lighthouse engine through the latest compatible LHCI harness', () => {
    expect(manifest.devDependencies?.['@lhci/cli']).toBe('^0.15.1');
    expect(manifest.devDependencies?.lighthouse).toBe('^13.4.0');
    expect(manifest.overrides?.lighthouse).toBe('^13.4.0');
    expect(manifest.overrides?.['@sentry/node']).toBe('^10.65.0');
  });

  it('uses the same verified runtime and package manager in production images', () => {
    expect(dockerfile).toContain('FROM node:24.18.0-alpine AS base');
    expect(dockerfile).toContain('ARG NPM_VERSION=12.0.1');
    expect(dockerfile).toMatch(/npm install --global "npm@\$\{NPM_VERSION\}"/u);
    expect(dockerfile).toContain('COPY package.json package-lock.json .npmrc ./');
    expect(dockerfile).not.toContain('COPY --from=builder /app/content ./content');
    expect(dockerignore).toContain('content/v2/.runtime');
    expect(dockerignore).toContain('!scripts/compile-curriculum-runtime-index.mjs');
    expect(dockerfile).not.toContain('FROM node:20');
  });

  it('does not expose an unisolated host-side learner compiler route', () => {
    expect(nextConfig).not.toContain('/api/v2/runtime/typescript');
    expect(existsSync(path.join(root, 'src/app/api/v2/runtime/typescript/route.ts'))).toBe(false);
  });

  it('uses route-scoped curriculum traces instead of a global content wildcard', () => {
    expect(nextConfig).toContain("'/learn/*/*/*'");
    expect(nextConfig).toContain("'/api/v2/courses/*/activities/*/*'");
    expect(nextConfig).toContain("'./content/v2/.runtime/curriculum.sqlite'");
    expect(nextConfig).not.toMatch(/content\/v2\/courses\/.*\*/u);
  });

  it('inlines production CSS to remove the first-load render-blocking waterfall', () => {
    expect(nextConfig).toMatch(/experimental:\s*\{\s*inlineCss:\s*true,/u);
  });

  it('does not patch framework internals or ship an application compatibility runtime', () => {
    expect(nextConfig).not.toContain('resolveAlias');
    expect(nextConfig).not.toContain('polyfill-module');
    expect(existsSync(path.join(root, 'src/lib/currentBrowserRuntime.ts'))).toBe(false);
    expect(existsSync(path.join(root, 'src/lib/modernBrowserCompatibility.ts'))).toBe(false);
  });

  it('pins every dependency install script that was reviewed for npm 12', () => {
    expect(manifest.allowScripts).toEqual({
      'agent-browser@0.32.0': true,
      'better-sqlite3@12.11.1': true,
      'esbuild@0.28.1': true,
      'sharp@0.34.5': true,
    });
    expect(npmrc).toContain('strict-allow-scripts=true');
  });

  it('blocks git and transitive local dependencies', () => {
    expect(npmrc).toContain('allow-git=none');
    expect(npmrc).toContain('allow-file=root');
    expect(npmrc).toContain('allow-directory=root');

    const rootSpecs = {
      ...manifest.dependencies,
      ...manifest.devDependencies,
      ...manifest.overrides,
    };
    for (const spec of Object.values(rootSpecs)) {
      expect(spec).not.toMatch(/^(?:git(?:\+[^:]+)?:|https?:|file:)/u);
    }
  });

  it('keeps every locked remote tarball on the configured npm registry', () => {
    expect(npmrc).toContain('allow-remote=all');
    const remoteUrls = Object.values(lock.packages ?? {})
      .map((entry) => entry.resolved)
      .filter((value): value is string => /^https?:/u.test(value ?? ''));

    expect(remoteUrls.length).toBeGreaterThan(0);
    for (const value of remoteUrls) {
      const url = new URL(value);
      expect(url.protocol).toBe('https:');
      expect(url.hostname).toBe('registry.npmjs.org');
    }
  });
});
