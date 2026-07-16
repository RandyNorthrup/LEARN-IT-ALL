import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const tsx = path.join(root, 'node_modules', '.bin', 'tsx');

function run(script: string, ...args: string[]) {
  return spawnSync(tsx, [script, ...args], {
    cwd: root,
    encoding: 'utf8',
  });
}

describe('empty curriculum audit boundaries', () => {
  it.each([
    ['scripts/audit-v2-duplication.ts', 'No reviewed curriculum activities exist to audit.'],
    ['scripts/audit-v2-learning-quality.ts', 'No reviewed curriculum courses exist to audit.'],
  ])('%s cannot report an empty source tree as passing', (script, blocker) => {
    const result = run(script);
    expect(result.status, result.stderr).toBe(1);
    expect(JSON.parse(result.stdout)).toMatchObject({ passed: false, blocker });
  });

  it('reports the real research inventory without claiming research completion', () => {
    const result = run('scripts/audit-research-program.ts', '--report-only');
    expect(result.status, result.stderr).toBe(0);
    expect(JSON.parse(result.stdout)).toMatchObject({
      courses: 54,
      pendingCourses: 53,
      dossierStarted: 1,
      researchedDossiers: 0,
      blockerGroups: 53,
      warningGroups: 1,
    });
  });
});
