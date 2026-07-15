import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseDocument } from 'yaml';

interface WorkflowStep {
  if?: string;
  name?: string;
  run?: string;
  uses?: string;
  with?: Record<string, unknown>;
}

interface WorkflowJob {
  needs?: string;
  permissions?: Record<string, string>;
  'runs-on'?: string;
  steps: WorkflowStep[];
  strategy?: { 'fail-fast'?: boolean; matrix?: { profile?: string[] } };
  'timeout-minutes'?: number;
}

interface ReleaseWorkflow {
  concurrency?: { 'cancel-in-progress'?: boolean; group?: string };
  jobs: Record<string, WorkflowJob>;
  on?: Record<string, unknown>;
  permissions?: Record<string, string>;
}

const root = process.cwd();
const workflowPath = path.join(root, '.github', 'workflows', 'quality.yml');
const workflowSource = readFileSync(workflowPath, 'utf8');
const workflowDocument = parseDocument(workflowSource);
const workflow = workflowDocument.toJS() as ReleaseWorkflow;
const matrixProfileExpression = '$' + '{{ matrix.profile }}';
const alwaysExpression = '$' + '{{ always() }}';

function runs(job: WorkflowJob): string[] {
  return job.steps.flatMap((step) => (step.run ? [step.run] : []));
}

describe('GitHub release gates', () => {
  it('uses valid least-privilege workflow syntax on protected events', () => {
    expect(workflowDocument.errors).toEqual([]);
    expect(Object.keys(workflow.on ?? {}).sort()).toEqual([
      'pull_request',
      'push',
      'workflow_dispatch',
    ]);
    expect(workflow.permissions).toEqual({ contents: 'read' });
    expect(workflow.concurrency?.['cancel-in-progress']).toBe(true);
    expect(workflow.concurrency?.group).toContain('github.ref');
  });

  it('pins current official actions and the repository toolchain', () => {
    expect(workflowSource).toContain(
      'actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2'
    );
    expect(workflowSource).toContain(
      'actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e # v6.4.0'
    );
    expect(workflowSource).toContain(
      'actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a # v7.0.1'
    );
    expect(workflowSource).toContain('node-version: 24.18.0');
    expect(workflowSource).toContain('npm install --global npm@12.0.1 --ignore-scripts');
    expect(workflowSource).toContain('persist-credentials: false');
  });

  it('runs every required non-Lighthouse gate before viewport audits', () => {
    const quality = workflow.jobs.quality;
    const lighthouse = workflow.jobs.lighthouse;
    expect(quality['runs-on']).toBe('ubuntu-24.04');
    expect(quality['timeout-minutes']).toBe(60);
    expect(runs(quality)).toEqual(
      expect.arrayContaining([
        'npm ci',
        'npm test',
        'npm run type-check',
        'npm run lint',
        'npm run lint:strict',
        'npm run format:check',
        'npm run build',
        'npm audit --audit-level=moderate',
      ])
    );
    expect(lighthouse.needs).toBe('quality');
  });

  it('runs and retains all three strict Lighthouse profiles', () => {
    const lighthouse = workflow.jobs.lighthouse;
    expect(lighthouse.strategy?.['fail-fast']).toBe(false);
    expect(lighthouse.strategy?.matrix?.profile).toEqual(['mobile', 'tablet', 'desktop']);
    expect(runs(lighthouse)).toContain(`npm run "lighthouse:${matrixProfileExpression}"`);

    const upload = lighthouse.steps.find((step) => step.name === 'Retain Lighthouse reports');
    expect(upload?.if).toBe(alwaysExpression);
    expect(upload?.with).toMatchObject({
      path: `.lighthouseci/${matrixProfileExpression}/`,
      'if-no-files-found': 'error',
      'include-hidden-files': true,
      'retention-days': 30,
    });
    expect(upload?.with?.name).toContain('github.sha');
  });

  it('keeps SEO excluded and statistically stable 99 assertions immutable', () => {
    const lighthouseConfig = readFileSync(path.join(root, 'lighthouserc.cjs'), 'utf8');
    const lighthouseRunner = readFileSync(
      path.join(root, 'scripts', 'run-lighthouse-after-content.mjs'),
      'utf8'
    );
    expect(lighthouseConfig).toContain(
      "onlyCategories: ['performance', 'accessibility', 'best-practices']"
    );
    expect(lighthouseConfig).not.toMatch(/onlyCategories:[^\n]*seo/u);
    expect(lighthouseConfig).toContain('numberOfRuns: 5');
    expect(lighthouseConfig.match(/minScore: 0\.99/g)).toHaveLength(3);
    expect(lighthouseConfig).toContain("aggregationMethod: 'median'");
    expect(lighthouseConfig.match(/aggregationMethod: 'pessimistic'/g)).toHaveLength(2);
    expect(lighthouseRunner).toContain("['mobile', 'tablet', 'desktop']");
    expect(existsSync(path.join(root, 'content', 'v2', 'CONTENT_COMPLETE'))).toBe(true);
  });
});
