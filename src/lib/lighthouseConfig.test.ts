import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

interface LighthouseConfig {
  ci: {
    collect: {
      numberOfRuns: number;
      settings: {
        formFactor: string;
        onlyCategories: string[];
        screenEmulation: { width: number; height: number };
        throttling?: { rttMs: number; throughputKbps: number; cpuSlowdownMultiplier: number };
      };
    };
    assert: { assertions: Record<string, [string, { minScore: number }]> };
  };
}

function loadProfile(profile: string): LighthouseConfig {
  const output = execFileSync(
    process.execPath,
    ['-e', "process.stdout.write(JSON.stringify(require('./lighthouserc.cjs')))"],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
      env: { ...process.env, LIGHTHOUSE_PROFILE: profile },
    }
  );
  return JSON.parse(output) as LighthouseConfig;
}

describe('Lighthouse profiles', () => {
  it.each([
    ['mobile', 412, 823],
    ['tablet', 768, 1024],
    ['desktop', 1440, 900],
  ])('measures the %s viewport three times without SEO', (profile, width, height) => {
    const config = loadProfile(profile);
    expect(config.ci.collect.numberOfRuns).toBe(3);
    expect(config.ci.collect.settings.screenEmulation).toMatchObject({ width, height });
    expect(config.ci.collect.settings.onlyCategories).toEqual([
      'performance',
      'accessibility',
      'best-practices',
    ]);
  });

  it('uses the official desktop Dense 4G profile instead of mobile throttling', () => {
    const desktop = loadProfile('desktop');
    expect(desktop.ci.collect.settings.formFactor).toBe('desktop');
    expect(desktop.ci.collect.settings.throttling).toMatchObject({
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    });
  });

  it.each([
    'performance',
    'accessibility',
    'best-practices',
  ])('requires at least 99 for %s', (category) => {
    const config = loadProfile('mobile');
    expect(config.ci.assert.assertions[`categories:${category}`][1].minScore).toBe(0.99);
  });
});
