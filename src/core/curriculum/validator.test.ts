import { describe, expect, it } from 'vitest';
import type { CurriculumCheck } from './schema';
import { validateCurriculumChecks } from './validator';

describe('validateCurriculumChecks', () => {
  it('grades HTML and CSS against canonical checks', () => {
    const checks: CurriculumCheck[] = [
      {
        id: 'check-cards',
        type: 'selector-exists',
        description: 'Three project cards exist.',
        failureMessage: 'Add all three project cards.',
        hidden: false,
        competencyIds: ['responsive-layout'],
        selector: '.project-card',
        minimum: 3,
      },
      {
        id: 'check-grid',
        type: 'css-declaration',
        description: 'The gallery uses grid.',
        failureMessage: 'Set the gallery display mode.',
        hidden: false,
        competencyIds: ['responsive-layout'],
        selector: '.gallery',
        property: 'display',
        expected: 'grid',
      },
    ];
    const results = validateCurriculumChecks(
      {
        files: {
          html: '<section class="gallery"><article class="project-card"></article><article class="project-card"></article><article class="project-card"></article></section>',
          css: '.gallery { display: grid; }',
        },
      },
      checks
    );

    expect(results.every((result) => result.passed)).toBe(true);
  });

  it('grades answers without accepting the browser as authority', () => {
    const checks: CurriculumCheck[] = [
      {
        id: 'check-layout-answer',
        type: 'choice-equals',
        description: 'The answer chooses content-driven breakpoints.',
        failureMessage: 'Choose the condition based on content needs.',
        hidden: true,
        competencyIds: ['responsive-layout'],
        expectedOptionId: 'answer-content',
      },
    ];

    const result = validateCurriculumChecks({ selectedOptionId: 'answer-device' }, checks)[0];
    expect(result.passed).toBe(false);
    expect(result.feedback).toBe('Choose the condition based on content needs.');
    expect(result.feedback).not.toContain('answer-device');
  });

  it('grades an accessible ordered interaction', () => {
    const checks: CurriculumCheck[] = [
      {
        id: 'check-render-order',
        type: 'order-equals',
        description: 'The browser processing stages are in evidence-based order.',
        failureMessage: 'Trace what the browser receives before what it produces.',
        hidden: false,
        competencyIds: ['browser-rendering-model'],
        expectedOptionIds: ['receive-bytes', 'parse-html', 'build-tree', 'paint-pixels'],
      },
    ];

    const passed = validateCurriculumChecks(
      {
        orderedOptionIds: ['receive-bytes', 'parse-html', 'build-tree', 'paint-pixels'],
      },
      checks
    )[0];
    const failed = validateCurriculumChecks(
      {
        orderedOptionIds: ['paint-pixels', 'build-tree', 'parse-html', 'receive-bytes'],
      },
      checks
    )[0];
    expect(passed.passed).toBe(true);
    expect(failed.passed).toBe(false);
    expect(failed.feedback).not.toContain('paint-pixels');
  });

  it('requires a substantive reflection with named evidence', () => {
    const checks: CurriculumCheck[] = [
      {
        id: 'check-reflection',
        type: 'text-response',
        description: 'The explanation names both source and rendered evidence.',
        failureMessage: 'Explain the difference using both forms of evidence.',
        hidden: false,
        competencyIds: ['browser-rendering-model'],
        minimumCharacters: 40,
        requiredTerms: ['source', 'DOM'],
      },
    ];

    const result = validateCurriculumChecks(
      {
        textResponse:
          'The source is the saved HTML, while the DOM is the browser-built tree inspected after parsing.',
      },
      checks
    )[0];
    expect(result.passed).toBe(true);
  });

  it('grades a calculated quantity with tolerance and a required unit', () => {
    const checks: CurriculumCheck[] = [
      {
        id: 'check-unit-rate',
        type: 'number-equals',
        description: 'The unit rate is accurate and labeled.',
        failureMessage: 'Recalculate the rate and include kilometers per hour.',
        hidden: false,
        competencyIds: ['math-unit-rates'],
        expected: 12.5,
        tolerance: 0.01,
        acceptedUnits: ['km/h', 'kilometers per hour'],
      },
    ];

    expect(validateCurriculumChecks({ textResponse: '12.504 km/h' }, checks)[0].passed).toBe(true);
    expect(validateCurriculumChecks({ textResponse: '12.5' }, checks)[0].passed).toBe(false);
    expect(validateCurriculumChecks({ textResponse: '13 km/h' }, checks)[0].passed).toBe(false);
  });

  it('grades Python, SQL, shell, prompt, and config source evidence', () => {
    const checks: CurriculumCheck[] = [
      {
        id: 'check-python-function',
        type: 'source-matches',
        description: 'A typed total function is defined.',
        failureMessage: 'Define total with a return annotation.',
        hidden: false,
        competencyIds: ['python-functions'],
        file: 'python',
        pattern: 'def\\s+total\\([^)]*\\)\\s*->\\s*float',
        flags: 'i',
      },
      {
        id: 'check-sql-group',
        type: 'source-matches',
        description: 'The query groups tickets by team.',
        failureMessage: 'Add the requested grouped SQL query.',
        hidden: false,
        competencyIds: ['sql-aggregation'],
        file: 'sql',
        pattern: 'GROUP\\s+BY\\s+team_id',
        flags: 'i',
      },
      {
        id: 'check-dns-command',
        type: 'source-includes',
        description: 'The DNS investigation queries the target.',
        failureMessage: 'Query the target with dig.',
        hidden: false,
        competencyIds: ['network-tools'],
        file: 'shell',
        expected: 'dig example.test',
      },
      {
        id: 'check-prompt-goal',
        type: 'source-includes',
        description: 'The prompt states a measurable goal.',
        failureMessage: 'Add the goal contract.',
        hidden: false,
        competencyIds: ['prompt-contract'],
        file: 'prompt',
        expected: 'Goal:',
      },
      {
        id: 'check-lint-gate',
        type: 'source-includes',
        description: 'The gate manifest runs linting.',
        failureMessage: 'Add the lint command.',
        hidden: false,
        competencyIds: ['quality-gates'],
        file: 'config',
        expected: 'lint:',
      },
    ];

    const result = validateCurriculumChecks(
      {
        files: {
          python: 'def total(values: list[float]) -> float:\n    return sum(values)',
          sql: 'SELECT team_id, COUNT(*) FROM tickets GROUP BY team_id;',
          shell: 'dig example.test',
          prompt: 'Goal: diagnose the failure',
          config: 'lint: biome check .',
        },
      },
      checks
    );
    expect(result.every((entry) => entry.passed)).toBe(true);
  });

  it('grades prompt and configuration contract structure beyond source substrings', () => {
    const checks: CurriculumCheck[] = [
      {
        id: 'check-prompt-contract',
        type: 'prompt-contract',
        description: 'The prompt defines goal and completion evidence.',
        failureMessage: 'Add the missing prompt contract fields.',
        hidden: false,
        competencyIds: ['prompt-contract'],
        requiredCriteria: ['goal', 'done'],
      },
      {
        id: 'check-mcp-contract',
        type: 'config-contract',
        description: 'The MCP manifest defines transport and typed tools.',
        failureMessage: 'Add the missing MCP contract fields.',
        hidden: false,
        competencyIds: ['mcp-contract'],
        workspace: 'mcp',
        requiredCriteria: ['transport', 'tools', 'input'],
      },
    ];

    const passed = validateCurriculumChecks(
      {
        files: {
          prompt: 'Goal: Diagnose the failure.\nDone when: The regression test passes.',
          config: 'workspace: mcp\ntransport: stdio\ntools: [diagnose]\ninput-schema: strict',
        },
      },
      checks
    );
    expect(passed.every((entry) => entry.passed)).toBe(true);

    const failed = validateCurriculumChecks(
      { files: { prompt: 'Please help.', config: 'workspace: mcp' } },
      checks
    );
    expect(failed.every((entry) => !entry.passed)).toBe(true);
  });

  it('grades Docker configuration contracts through safe text analysis', () => {
    const checks: CurriculumCheck[] = [
      {
        id: 'check-docker-contract',
        type: 'config-contract',
        description: 'The delivery record defines immutable identity, verification, and repair.',
        failureMessage: 'Complete the Docker delivery contract.',
        hidden: false,
        competencyIds: ['docker-release-evidence'],
        workspace: 'docker',
        requiredCriteria: ['artifact', 'immutable', 'verification', 'failure', 'repair'],
      },
    ];

    const passed = validateCurriculumChecks(
      {
        files: {
          config: `workspace: docker
artifact: release-policy.yaml
image: example.test/status@sha256:verified
verify: docker buildx imagetools inspect candidate
failure: Reject mutable tag promotion and missing recovery evidence.
repair: Pin the digest, rehearse rollback, and retain the inspected result.`,
        },
      },
      checks
    );
    expect(passed[0].passed).toBe(true);

    const failed = validateCurriculumChecks(
      { files: { config: 'workspace: docker\nimage: latest' } },
      checks
    );
    expect(failed[0].passed).toBe(false);
  });

  it('grades Kubernetes object contracts through safe text analysis', () => {
    const checks: CurriculumCheck[] = [
      {
        id: 'check-kubernetes-contract',
        type: 'config-contract',
        description: 'The object record defines state, verification, failure, and repair.',
        failureMessage: 'Complete the Kubernetes object contract.',
        hidden: false,
        competencyIds: ['k8s-object-evidence'],
        workspace: 'kubernetes',
        requiredCriteria: ['object', 'reconciliation', 'verification', 'failure', 'repair'],
      },
    ];

    const passed = validateCurriculumChecks(
      {
        files: {
          config: `workspace: kubernetes
transfer-boundary: authorized-disposable-cluster
artifact: deployment.yaml
apiVersion: apps/v1
kind: Deployment
desired-state: replicas-3
observed-status: available-3
verify: kubectl get deployment status-api -o json
failure: Reject stale status and an unknown API field.
repair: Validate the schema and wait for observedGeneration.`,
        },
      },
      checks
    );
    expect(passed[0].passed).toBe(true);

    const failed = validateCurriculumChecks(
      { files: { config: 'workspace: kubernetes\nkind: Deployment' } },
      checks
    );
    expect(failed[0].passed).toBe(false);
  });

  it('grades CI/CD contracts through safe text analysis', () => {
    const checks: CurriculumCheck[] = [
      {
        id: 'check-cicd-contract',
        type: 'config-contract',
        description: 'The delivery record defines identity, trust, verification, and recovery.',
        failureMessage: 'Complete the CI/CD evidence contract.',
        hidden: false,
        competencyIds: ['ci-delivery-evidence'],
        workspace: 'cicd',
        requiredCriteria: ['identity', 'trust', 'verification', 'failure-repair'],
      },
    ];

    const passed = validateCurriculumChecks(
      {
        files: {
          config: `workspace: cicd
workflow-ref: owner/repo/.github/workflows/ci.yml@refs/heads/main
source-revision: reviewed-sha
permissions: contents-read
fork-policy: untrusted-input-is-data
verify: inspect workflow, revision, event, actor, and token scope
failure: Reject executing fork code with write authority.
repair: Reduce permissions and pin the reviewed revision.`,
        },
      },
      checks
    );
    expect(passed[0].passed).toBe(true);

    const failed = validateCurriculumChecks(
      { files: { config: 'workspace: cicd\nworkflow: release' } },
      checks
    );
    expect(failed[0].passed).toBe(false);
  });
});
