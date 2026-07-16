import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'ci-delivery-outcomes-flow-evidence',
  'gha-execution-model-contexts',
  'gha-workflow-syntax-expressions',
  'gha-events-refs-trust-boundaries',
  'gha-runners-isolation-capacity',
  'ci-node-typescript-reproducibility',
  'ci-quality-gate-orchestration',
  'ci-testing-services-coverage',
  'gha-matrices-needs-outputs-artifacts',
  'gha-cache-performance-integrity',
  'gha-concurrency-timeouts-flake-control',
  'gha-secrets-tokens-injection',
  'gha-actions-dependencies-supply-chain',
  'gha-reuse-composite-workflow-contracts',
  'ci-docker-build-test-cache',
  'ci-image-release-attestations',
  'cd-environments-oidc-cloud-auth',
  'cd-cloud-run-progressive-delivery',
  'cd-releases-packages-change-control',
  'ci-observability-incidents-governance',
];

const similarityStopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one evidence target case cicd ci cd github actions workflow delivery task implementing it competency probe current changed keep connected mechanically reviewable transfer decision scenario variant change verify failure repair reject record'.split(
    ' '
  )
);

function contentTerms(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((word) => word.length > 2 && !similarityStopWords.has(word))
  );
}

function jaccard(left: Set<string>, right: Set<string>): number {
  let intersection = 0;
  for (const term of left) if (right.has(term)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

const graph = loadCurriculumGraph('cicd-github-actions');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'cicd-github-actions.json'), 'utf8')
  )
);

describe('Secure CI/CD with GitHub Actions v2 course', () => {
  it('matches the installed TypeScript 7 native CLI and TypeScript 6 API compatibility stack', () => {
    const packageManifest = JSON.parse(
      readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
    ) as { devDependencies: Record<string, string> };
    const nativeManifest = JSON.parse(
      readFileSync(path.join(process.cwd(), 'node_modules/@typescript/native/package.json'), 'utf8')
    ) as { version: string };
    const compatibilityManifest = JSON.parse(
      readFileSync(path.join(process.cwd(), 'node_modules/typescript/package.json'), 'utf8')
    ) as { version: string };

    expect(packageManifest.devDependencies['@typescript/native']).toBe('npm:typescript@^7.0.2');
    expect(packageManifest.devDependencies.typescript).toBe('npm:@typescript/typescript6@^6.0.2');
    expect(nativeManifest.version).toBe('7.0.2');
    expect(compatibilityManifest.version).toBe('6.0.2');
  });

  it('follows the researched outcome-to-governance prerequisite sequence', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(100);
    expect(graph.modules).toHaveLength(20);
    expect(graph.activities).toHaveLength(206);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      1676
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      1842
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('cicd-github-actions-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and interaction-complete', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('audit-required');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual([
      'git-basics',
      'repository-quality-gates',
      'typescript-basics',
      'docker-basics',
    ]);
    expect(graph.course.prerequisites).toEqual(blueprint.pathways.prerequisiteCourseIds);
    expect(new Set(graph.activities.map((activity) => activity.kind))).toEqual(
      new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
    );
    expect(
      graph.activities.every((activity, index) =>
        index === 0 ? activity.prerequisites.length === 0 : activity.prerequisites.length === 1
      )
    ).toBe(true);

    for (const module of blueprint.modules) {
      const practiceContexts = module.activities
        .filter((activity) =>
          ['workshop', 'debug', 'lab', 'review', 'quiz'].includes(activity.kind)
        )
        .map((activity) => ({ id: activity.id, terms: contentTerms(activity.authenticContext) }));
      expect(practiceContexts).toHaveLength(5);
      for (const [index, left] of practiceContexts.entries()) {
        for (const right of practiceContexts.slice(index + 1)) {
          expect(
            jaccard(left.terms, right.terms),
            `${module.id} repeats ${left.id} as ${right.id}`
          ).toBeLessThan(0.72);
        }
      }
    }
  });

  it('gives every build increment exact workflow, fault, repair, and transfer evidence', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );

    expect(codeSteps).toHaveLength(166);
    expect(codeSteps.every(({ step }) => step.targetFile === 'config')).toBe(true);
    expect(
      codeSteps.every(({ activity, step }) => {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const marker = checks.find((check) => check.type === 'source-includes');
        const structure = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        return (
          marker?.type === 'source-includes' &&
          marker.file === 'config' &&
          marker.expected.includes('# Evidence: ci-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'config' &&
          example?.type === 'code' &&
          example.language === 'yaml' &&
          example.code.includes('environment:') &&
          example.code.includes('fault-injection:') &&
          example.code.includes('retained-proof:') &&
          example.code.includes('failure:') &&
          example.code.includes('repair:') &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.config.includes('workspace: cicd') &&
          activity.starterFiles.config.includes('never call GitHub APIs') &&
          activity.starterFiles.config.includes('checkout: 7.0.0') &&
          activity.starterFiles.config.includes('setup-node: 7.0.0') &&
          activity.starterFiles.config.includes('typescript-native: 7.0.2') &&
          activity.starterFiles.config.includes('typescript-api-compatibility: 6.0.2') &&
          activity.starterFiles.config.includes('build-push-action: 7') &&
          activity.starterFiles.config.includes('google-auth: 3') &&
          activity.starterFiles.config.includes('deploy-cloudrun: 3') &&
          activity.starterFiles.shell === ''
      )
    ).toBe(true);

    const examples = codeSteps.map(({ step }) => {
      const block = step.content.find((entry) => entry.type === 'code');
      return block?.type === 'code' ? block.code : '';
    });
    expect(new Set(examples).size).toBe(examples.length);
    let closest = { score: 0, left: 0, right: 0 };
    const exampleTerms = examples.map(contentTerms);
    for (const [index, left] of exampleTerms.entries()) {
      for (const [offset, right] of exampleTerms.slice(index + 1).entries()) {
        const score = jaccard(left, right);
        if (score > closest.score) closest = { score, left: index, right: index + offset + 1 };
      }
    }
    expect(
      closest.score,
      `near-duplicate CI/CD evidence examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);

    const theoryExamples = graph.modules.map((module) => {
      const example = graph.activities
        .filter((activity) => activity.moduleId === module.id && activity.kind === 'theory')
        .flatMap((activity) => activity.steps)
        .find((step) => step.interaction === 'code')
        ?.content.find((block) => block.type === 'code');
      expect(example?.type).toBe('code');
      return example?.type === 'code' ? example.code : '';
    });
    expect(new Set(theoryExamples).size).toBe(20);
  });

  it('routes current primary research to each governing delivery boundary', () => {
    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-14')).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('setup-node 7.0.0'))).toBe(
      true
    );
    expect(blueprint.sources.some((source) => source.version.includes('TypeScript 7.0.2'))).toBe(
      true
    );
    expect(blueprint.sources.some((source) => source.version.includes('typescript6 6.0.2'))).toBe(
      true
    );
    expect(blueprint.sources.some((source) => source.version.includes('SLSA 1.2'))).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('auth 3'))).toBe(true);

    const evidenceFor = (moduleId: string) =>
      graph.activities
        .filter((activity) => activity.moduleId === moduleId)
        .flatMap((activity) =>
          activity.steps.flatMap((step) =>
            step.content.flatMap((block) => (block.type === 'evidence' ? [block.value] : []))
          )
        );
    const mappings = [
      ['gha-execution-model-contexts', 'GitHub Actions Concepts'],
      ['ci-node-typescript-reproducibility', 'TypeScript 7.0 Native Compiler'],
      ['gha-secrets-tokens-injection', 'GitHub Actions Secure Use'],
      ['ci-docker-build-test-cache', 'Docker Build GitHub Actions'],
      ['ci-image-release-attestations', 'SLSA Supply-Chain'],
      ['cd-environments-oidc-cloud-auth', 'Google GitHub Actions Authentication'],
      ['cd-cloud-run-progressive-delivery', 'Google Cloud Run Deployment'],
      ['cd-releases-packages-change-control', 'npm Trusted Publishing'],
      ['ci-observability-incidents-governance', 'NIST Secure Software'],
    ] as const;
    for (const [moduleId, authority] of mappings) {
      expect(evidenceFor(moduleId).some((value) => value.includes(authority))).toBe(true);
    }
  });

  it('keeps browser CI/CD work deterministic and disconnected from external execution', () => {
    const runtimeSource = [
      'src/core/learning/configLabSimulator.ts',
      'src/components/learning/QualityGatePanel.tsx',
      'src/core/curriculum/validator.ts',
    ]
      .map((fileName) => readFileSync(path.join(process.cwd(), fileName), 'utf8'))
      .join('\n');
    expect(runtimeSource).not.toMatch(
      /node:child_process|@octokit|dockerode|googleapis|fetch\s*\(|new\s+WebSocket|execSync|spawnSync/
    );
    expect(runtimeSource).toContain('never executes learner commands');
    expect(blueprint.audience.deviceConstraints.join(' ')).toContain(
      'authorized disposable repository'
    );
  });

  it('keeps same-kind activities below the near-duplicate ceiling', () => {
    const comparable = graph.activities.map((activity) => ({
      id: activity.id,
      kind: activity.kind,
      terms: contentTerms(
        `${activity.title} ${activity.summary} ${activity.steps
          .map((step) => step.instruction)
          .join(' ')}`
      ),
    }));
    let closest = { score: 0, left: '', right: '' };
    for (const [index, left] of comparable.entries()) {
      for (const right of comparable.slice(index + 1)) {
        if (left.kind !== right.kind) continue;
        const score = jaccard(left.terms, right.terms);
        if (score > closest.score) closest = { score, left: left.id, right: right.id };
      }
    }
    expect(
      closest.score,
      `near-duplicate CI/CD activities ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });
});
