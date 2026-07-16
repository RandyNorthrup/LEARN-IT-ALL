import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'docker-architecture-isolation-evidence',
  'docker-containers-lifecycle-cli',
  'docker-images-layers-registries',
  'dockerfile-build-context-instructions',
  'docker-buildkit-cache-multistage',
  'docker-process-signals-health-resources',
  'docker-storage-mounts-backup',
  'docker-networking-dns-publishing',
  'docker-compose-model-lifecycle',
  'docker-compose-development-testing',
  'docker-security-least-privilege',
  'docker-config-secrets-environment',
  'docker-observability-debugging',
  'docker-testing-validation-quality',
  'docker-performance-reproducibility',
  'docker-multiplatform-buildx-bake',
  'docker-supply-chain-registry-release',
  'docker-production-operations-defense',
];

const similarityStopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one evidence target case docker container task implementing it competency probe current changed keep connected mechanically reviewable artifact transfer decision scenario variant change verify failure repair reject record'.split(
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

const graph = loadCurriculumGraph('docker-basics');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', 'docker-basics.json'), 'utf8'))
);

describe('Docker Basics v2 course', () => {
  it('follows the researched architecture-to-production prerequisite sequence', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(90);
    expect(graph.modules).toHaveLength(18);
    expect(graph.activities).toHaveLength(186);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      1514
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      1664
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('docker-basics-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and interaction-complete', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('audit-required');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['linux-basics']);
    expect(graph.course.prerequisites).toEqual(['linux-basics']);
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

  it('gives every build increment a scoped Docker artifact, failure, repair, and transfer contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );

    expect(codeSteps).toHaveLength(150);
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
          marker.expected.includes('# Evidence: docker') &&
          structure?.type === 'source-matches' &&
          structure.file === 'config' &&
          example?.type === 'code' &&
          example.language === 'yaml' &&
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
          activity.starterFiles?.config.includes('workspace: docker') &&
          activity.starterFiles.config.includes('never connect to a Docker daemon') &&
          activity.starterFiles.config.includes('engine: 29.6.1') &&
          activity.starterFiles.config.includes('compose: 5.3.1') &&
          activity.starterFiles.config.includes('buildx: 0.35.0') &&
          activity.starterFiles.config.includes('buildkit: 0.31.1') &&
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
      `near-duplicate Docker evidence examples ${closest.left} and ${closest.right}`
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
    expect(new Set(theoryExamples).size).toBe(18);
  });

  it('routes current primary research to each governing Docker boundary', () => {
    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-14')).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('29.6.1'))).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('Compose 5.3.1'))).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('BuildKit 0.31.1'))).toBe(
      true
    );

    const evidenceFor = (moduleId: string) =>
      graph.activities
        .filter((activity) => activity.moduleId === moduleId)
        .flatMap((activity) =>
          activity.steps.flatMap((step) =>
            step.content.flatMap((block) => (block.type === 'evidence' ? [block.value] : []))
          )
        );
    const mappings = [
      ['docker-architecture-isolation-evidence', 'Docker Engine 29 Architecture'],
      ['docker-images-layers-registries', 'OCI Image, Runtime'],
      ['dockerfile-build-context-instructions', 'Dockerfile Reference'],
      ['docker-buildkit-cache-multistage', 'BuildKit 0.31.1'],
      ['docker-storage-mounts-backup', 'Docker Storage'],
      ['docker-networking-dns-publishing', 'Docker Networking'],
      ['docker-compose-model-lifecycle', 'Compose Specification'],
      ['docker-security-least-privilege', 'Docker Engine Security'],
      ['docker-supply-chain-registry-release', 'Docker Build Attestations'],
    ] as const;
    for (const [moduleId, authority] of mappings) {
      expect(evidenceFor(moduleId).some((value) => value.includes(authority))).toBe(true);
    }
  });

  it('keeps browser Docker work deterministic and disconnected from host execution', () => {
    const learnerSources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.config ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    expect(
      learnerSources.every((source) => !/\/var\/run\/docker\.sock|DOCKER_HOST=/i.test(source))
    ).toBe(true);

    const runtimeSource = [
      'src/core/learning/configLabSimulator.ts',
      'src/components/learning/QualityGatePanel.tsx',
      'src/core/curriculum/validator.ts',
    ]
      .map((fileName) => readFileSync(path.join(process.cwd(), fileName), 'utf8'))
      .join('\n');
    expect(runtimeSource).not.toMatch(
      /node:child_process|from ['"]dockerode|\/var\/run\/docker\.sock|DOCKER_HOST|fetch\s*\(|new\s+WebSocket/
    );
    expect(runtimeSource).toContain('never executes learner commands');
    expect(blueprint.audience.deviceConstraints.join(' ')).toContain('disposable Docker');
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
      `near-duplicate Docker activities ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });
});
