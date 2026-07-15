import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const routeNames = [
  'algorithm-arena',
  'code-builder',
  'code-hunter',
  'logic-maze',
  'syntax-speed',
  'lunar-lander',
  'code-lander',
];

function read(relativePath: string) {
  return readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

describe('game route contracts', () => {
  it('routes every game through the deterministic practice engines', () => {
    const sources = routeNames.map((route) => read(`src/app/games/${route}/page.tsx`));
    expect(sources.filter((source) => source.includes('PracticeArcade'))).toHaveLength(5);
    expect(sources.filter((source) => source.includes('AccessibleLander'))).toHaveLength(2);
  });

  it('contains no random grading, fake delays, or canvas-only landers', () => {
    const sources = [
      read('src/core/games/arcade.ts'),
      read('src/core/games/lander.ts'),
      read('src/components/games/PracticeArcade.tsx'),
      read('src/components/games/AccessibleLander.tsx'),
      ...routeNames.map((route) => read(`src/app/games/${route}/page.tsx`)),
    ].join('\n');
    expect(sources).not.toContain('Math.random');
    expect(sources).not.toContain('setTimeout');
    expect(sources).not.toContain('<canvas');
  });

  it('keeps every game linked from the arcade hub', () => {
    const hub = read('src/app/games/page.tsx');
    for (const route of routeNames) expect(hub).toContain(`/games/${route}`);
  });
});
