import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'k8s-architecture-reconciliation-evidence',
  'k8s-api-objects-schema-status',
  'k8s-kubectl-contexts-declarative',
  'k8s-metadata-namespaces-ownership',
  'k8s-pods-lifecycle-composition',
  'k8s-config-secrets-projection',
  'k8s-health-resources-qos',
  'k8s-deployments-rollouts-recovery',
  'k8s-workload-controller-selection',
  'k8s-services-endpoints-dns',
  'k8s-gateway-ingress-routing-tls',
  'k8s-network-model-policy-troubleshooting',
  'k8s-storage-persistence-recovery',
  'k8s-scheduling-placement-eviction',
  'k8s-availability-disruption-autoscaling',
  'k8s-identity-rbac-serviceaccounts',
  'k8s-workload-security-admission',
  'k8s-observability-debugging-incidents',
  'k8s-packaging-kustomize-helm-promotion',
  'k8s-extensions-admission-operators',
  'k8s-cluster-lifecycle-upgrade-recovery',
];

const similarityStopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one evidence target case kubernetes k8s cluster task implementing it competency probe current changed keep connected mechanically reviewable object manifest transfer decision scenario variant change verify failure repair reject record'.split(
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

const graph = loadCurriculumGraph('kubernetes-basics');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', 'kubernetes-basics.json'), 'utf8'))
);

describe('Kubernetes Basics v2 course', () => {
  it('follows the researched architecture-to-recovery prerequisite sequence', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(105);
    expect(graph.modules).toHaveLength(21);
    expect(graph.activities).toHaveLength(216);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      1757
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      1931
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('kubernetes-basics-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and interaction-complete', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('audit-required');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['docker-basics']);
    expect(graph.course.prerequisites).toEqual(['docker-basics']);
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

  it('gives every build increment a scoped object, failure, repair, and transfer contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );

    expect(codeSteps).toHaveLength(174);
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
          marker.expected.includes('# Evidence: k8s-') &&
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
          activity.starterFiles?.config.includes('workspace: kubernetes') &&
          activity.starterFiles.config.includes('never invoke kubectl') &&
          activity.starterFiles.config.includes('kubernetes: 1.36.2') &&
          activity.starterFiles.config.includes('minikube: 1.38.1') &&
          activity.starterFiles.config.includes('gateway-api: 1.5.1') &&
          activity.starterFiles.config.includes('helm: 4.2.2') &&
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
      `near-duplicate Kubernetes evidence examples ${closest.left} and ${closest.right}`
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
    expect(new Set(theoryExamples).size).toBe(21);
  });

  it('routes current primary research to each governing Kubernetes boundary', () => {
    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-14')).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('1.36.2'))).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('Gateway API 1.5.1'))).toBe(
      true
    );
    expect(blueprint.sources.some((source) => source.version.includes('Helm 4.2.2'))).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('minikube 1.38.1'))).toBe(
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
      ['k8s-architecture-reconciliation-evidence', 'Kubernetes 1.36 Releases'],
      ['k8s-pods-lifecycle-composition', 'Kubernetes Workloads'],
      ['k8s-services-endpoints-dns', 'Kubernetes Services'],
      ['k8s-gateway-ingress-routing-tls', 'Kubernetes Gateway API'],
      ['k8s-storage-persistence-recovery', 'Kubernetes Storage'],
      ['k8s-scheduling-placement-eviction', 'Kubernetes Scheduling'],
      ['k8s-identity-rbac-serviceaccounts', 'Kubernetes Security'],
      ['k8s-observability-debugging-incidents', 'Kubernetes Observability'],
      ['k8s-packaging-kustomize-helm-promotion', 'kubectl Kustomize and Helm'],
    ] as const;
    for (const [moduleId, authority] of mappings) {
      expect(evidenceFor(moduleId).some((value) => value.includes(authority))).toBe(true);
    }
  });

  it('keeps browser Kubernetes work deterministic and disconnected from host execution', () => {
    const runtimeSource = [
      'src/core/learning/configLabSimulator.ts',
      'src/components/learning/QualityGatePanel.tsx',
      'src/core/curriculum/validator.ts',
    ]
      .map((fileName) => readFileSync(path.join(process.cwd(), fileName), 'utf8'))
      .join('\n');
    expect(runtimeSource).not.toMatch(
      /node:child_process|@kubernetes\/client-node|from ['"]kubernetes|fetch\s*\(|new\s+WebSocket|execSync|spawnSync/
    );
    expect(runtimeSource).toContain('never executes learner commands');
    expect(blueprint.audience.deviceConstraints.join(' ')).toContain(
      'authorized disposable Kubernetes cluster'
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
      `near-duplicate Kubernetes activities ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });
});
