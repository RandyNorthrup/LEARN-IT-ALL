import { readFileSync } from 'node:fs';
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

  it('uses the same verified runtime and package manager in production images', () => {
    expect(dockerfile).toContain('FROM node:24.18.0-alpine AS base');
    expect(dockerfile).toContain('ARG NPM_VERSION=12.0.1');
    expect(dockerfile).toMatch(/npm install --global "npm@\$\{NPM_VERSION\}"/u);
    expect(dockerfile).toContain('COPY package.json package-lock.json .npmrc ./');
    expect(dockerfile).not.toContain('FROM node:20');
  });

  it('ships TypeScript standard-library declarations in standalone runtime traces', () => {
    expect(nextConfig).toContain("'/api/v2/runtime/typescript'");
    expect(nextConfig).toContain("'./node_modules/@typescript/old/lib/*.d.ts'");
  });

  it('pins every dependency install script that was reviewed for npm 12', () => {
    expect(manifest.allowScripts).toEqual({
      'agent-browser@0.31.2': true,
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
