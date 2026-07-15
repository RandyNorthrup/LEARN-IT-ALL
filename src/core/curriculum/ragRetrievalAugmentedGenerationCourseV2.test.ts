import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'rag-outcomes-task-evidence',
  'rag-ir-foundations-index',
  'rag-ingestion-provenance',
  'rag-normalization-tokenization',
  'rag-chunking-structure',
  'rag-lexical-tfidf-bm25',
  'rag-retrieval-metrics',
  'rag-embeddings-vector-semantics',
  'rag-dense-retrieval',
  'rag-ann-indexes',
  'rag-vector-store-lifecycle',
  'rag-hybrid-fusion',
  'rag-query-understanding',
  'rag-reranking',
  'rag-context-selection',
  'rag-grounded-generation',
  'rag-citations-user-experience',
  'rag-pipeline-architecture',
  'rag-end-to-end-evaluation',
  'rag-eval-datasets-judgments',
  'rag-security-poisoning-injection',
  'rag-privacy-governance',
  'rag-observability-reliability',
  'rag-performance-cost-capacity',
  'rag-ingestion-operations-recovery',
  'rag-structured-graph-rag',
  'rag-agentic-adaptive-rag',
  'rag-multimodal-rag',
  'rag-architecture-selection-evolution',
  'rag-testing-release-defense',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one rag python retrieval evidence current changed case team browser code model decision build deterministic production transfer gate competency probe source query document corpus'.split(
    ' '
  )
);

function terms(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((word) => word.length > 2 && !stopWords.has(word))
  );
}

function jaccard(left: Set<string>, right: Set<string>): number {
  let intersection = 0;
  for (const term of left) if (right.has(term)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

const graph = loadCurriculumGraph('rag-retrieval-augmented-generation');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(
      path.join(process.cwd(), 'blueprints', 'rag-retrieval-augmented-generation.json'),
      'utf8'
    )
  )
);

function evidenceForModule(moduleId: string): string[] {
  return graph.activities
    .filter((activity) => activity.moduleId === moduleId)
    .flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'evidence' ? [block.value] : []))
      )
    );
}

describe('retrieval-augmented generation engineering with Python 3.14 v2 course', () => {
  it('follows the information-need-to-production-defense prerequisite sequence at full depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(150);
    expect(graph.modules).toHaveLength(30);
    expect(graph.activities).toHaveLength(306);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      2494
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      2740
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe(
      'rag-retrieval-augmented-generation-certification-exam'
    );
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and scenario-diverse', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('approved');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['python-basics', 'python-oop']);
    expect(graph.course.prerequisites).toEqual(['python-basics', 'python-oop']);
    expect(new Set(graph.activities.map((activity) => activity.kind))).toEqual(
      new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
    );
    expect(
      graph.activities.every((activity, index) =>
        index === 0 ? activity.prerequisites.length === 0 : activity.prerequisites.length === 1
      )
    ).toBe(true);

    for (const module of blueprint.modules) {
      const contexts = module.activities
        .filter((activity) =>
          ['workshop', 'debug', 'lab', 'review', 'quiz'].includes(activity.kind)
        )
        .map((activity) => ({ id: activity.id, words: terms(activity.authenticContext) }));
      expect(contexts).toHaveLength(5);
      for (const [index, left] of contexts.entries()) {
        for (const right of contexts.slice(index + 1)) {
          expect(
            jaccard(left.words, right.words),
            `${module.id} repeats ${left.id} as ${right.id}`
          ).toBeLessThan(0.72);
        }
      }
    }

    const projectContexts = blueprint.projects.map((entry) =>
      terms(`${entry.title} ${entry.userNeed}`)
    );
    for (const [index, left] of projectContexts.entries()) {
      for (const right of projectContexts.slice(index + 1)) {
        expect(jaccard(left, right)).toBeLessThan(0.35);
      }
    }
  });

  it('gives every RAG build an exact runnable changed-case contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );
    expect(codeSteps).toHaveLength(246);
    expect(codeSteps.every(({ step }) => step.targetFile === 'python')).toBe(true);
    expect(
      codeSteps.every(({ activity, step }) => {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const marker = checks.find((check) => check.type === 'source-includes');
        const structure = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        return (
          marker?.type === 'source-includes' &&
          marker.file === 'python' &&
          marker.expected.includes('# Evidence: rag-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'python' &&
          example?.type === 'code' &&
          example.language === 'python' &&
          example.code.includes('# Changed case:') &&
          example.code.includes('assert ') &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.python.includes('deterministic pure-Python models') &&
          activity.starterFiles.python.includes('authorized transfer gates')
      )
    ).toBe(true);

    const examples = codeSteps.map(({ step }) => {
      const block = step.content.find((entry) => entry.type === 'code');
      return block?.type === 'code' ? block.code : '';
    });
    expect(new Set(examples).size).toBe(examples.length);
    const exampleTerms = examples.map(terms);
    let closest = { score: 0, left: 0, right: 0 };
    for (const [index, left] of exampleTerms.entries()) {
      for (const [offset, right] of exampleTerms.slice(index + 1).entries()) {
        const score = jaccard(left, right);
        if (score > closest.score) closest = { score, left: index, right: index + offset + 1 };
      }
    }
    expect(
      closest.score,
      `near-duplicate RAG Python examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });

  it('parses every Python source and executes every lesson function with its fixed defaults', () => {
    const activityRoot = path.join(
      process.cwd(),
      'content',
      'v2',
      'courses',
      'rag-retrieval-augmented-generation',
      'activities'
    );
    const script = `
import json
import pathlib
import sys

root = pathlib.Path(sys.argv[1])
parsed = 0
executed = 0
for path in sorted(root.glob("*.json")):
    activity = json.loads(path.read_text(encoding="utf-8"))
    sources = []
    starter = activity.get("starterFiles", {}).get("python")
    if starter:
        sources.append((f"{activity['id']} starter", starter, False))
    for step_index, step in enumerate(activity.get("steps", []), start=1):
        for block_index, block in enumerate(step.get("content", []), start=1):
            if block.get("type") == "code" and block.get("language") == "python":
                sources.append((f"{activity['id']} step {step_index} block {block_index}", block["code"], True))
    for label, source, run_function in sources:
        compiled = compile(source, label, "exec")
        parsed += 1
        if not run_function:
            continue
        namespace = {"__name__": "rag_lesson_check"}
        exec(compiled, namespace)
        functions = [value for key, value in namespace.items() if key.startswith(("worked_", "evidence_")) and callable(value)]
        if len(functions) != 1:
            raise AssertionError(f"{label}: expected one lesson function, found {len(functions)}")
        result = functions[0]()
        if not isinstance(result, tuple) or len(result) != 3 or result[0] is not True:
            raise AssertionError(f"{label}: invalid default evidence {result!r}")
        executed += 1

if parsed != 702 or executed != 396:
    raise AssertionError(f"expected 702 parsed and 396 executed, got {parsed} and {executed}")
print(f"RAG Python content audit passed: {parsed} sources parsed and {executed} functions executed.")
`;
    const result = spawnSync('python3', ['-c', script, activityRoot], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });
    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(result.stdout).toContain('RAG Python content audit passed');
  }, 30_000);

  it('keeps browser execution deterministic while naming complete native transfer gates', () => {
    const sources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.python ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    const forbidden =
      /(?:^|\n)\s*(?:from|import)\s+(?:openai|anthropic|requests|httpx|socket|urllib|faiss|numpy|sklearn|sentence_transformers|psycopg)|\b(?:open|eval|exec|compile|__import__)\s*\(/u;
    expect(sources.length).toBeGreaterThan(700);
    expect(sources.every((source) => !forbidden.test(source))).toBe(true);

    const transferText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'Python 3.14.6',
      'NumPy 2.5.1',
      'scikit-learn 1.9.0',
      'sentence-transformers 5.6.0',
      'Faiss 1.14.3',
      'pgvector 0.8.2',
      'models',
      'vector',
      'provider',
      'OCR',
      'load',
      'security',
      'accessibility',
      'recovery',
      'production',
    ]) {
      expect(transferText).toContain(boundary);
    }
  });

  it('keeps RAG activities free of inherited HTTP, storage, messaging, and cryptography cycles', () => {
    const learnerText = graph.activities
      .flatMap((activity) =>
        activity.steps.flatMap((step) => [
          step.instruction,
          ...step.content.flatMap((block) =>
            block.type === 'paragraph' || block.type === 'callout' ? [block.text] : []
          ),
          ...(step.options?.map((option) => option.text) ?? []),
        ])
      )
      .join('\n');
    for (const leakage of [
      'HTTP evidence cycle',
      'method semantics, target authority',
      'request or response model',
      'S3 storage-delivery evidence cycle',
      'RabbitMQ messaging evidence cycle',
      'Cryptography and Go threat-to-evidence cycle',
    ]) {
      expect(learnerText).not.toContain(leakage);
    }
    expect(learnerText).toContain('source-to-claim evidence cycle');
    expect(learnerText).toContain('stakeholder outcome, corpus, source, document, chunk, query');
  });

  it('routes current primary research to every governing RAG boundary', () => {
    const expectations: Array<[string, string]> = [
      ['rag-outcomes-task-evidence', 'NIST Retrieval-Augmented Generation Definition'],
      ['rag-ir-foundations-index', 'NIST Text REtrieval Conference'],
      ['rag-normalization-tokenization', 'Unicode Normalization UAX 15'],
      ['rag-lexical-tfidf-bm25', 'scikit-learn Text Feature Extraction'],
      ['rag-embeddings-vector-semantics', 'MTEB Massive Text Embedding Benchmark'],
      ['rag-dense-retrieval', 'Dense Passage Retrieval Paper'],
      ['rag-ann-indexes', 'HNSW Approximate Nearest Neighbor Paper'],
      ['rag-vector-store-lifecycle', 'pgvector Documentation'],
      ['rag-hybrid-fusion', 'Reciprocal Rank Fusion Paper'],
      ['rag-query-understanding', 'HyDE Precise Zero-Shot Dense Retrieval Paper'],
      ['rag-reranking', 'Sentence Transformers Retrieve and Rerank'],
      ['rag-context-selection', 'Lost in the Middle Paper'],
      ['rag-end-to-end-evaluation', 'RAG Evaluation Survey'],
      ['rag-security-poisoning-injection', 'OWASP RAG Security Cheat Sheet'],
      ['rag-observability-reliability', 'OpenTelemetry GenAI Semantic Conventions'],
      ['rag-structured-graph-rag', 'Microsoft GraphRAG Documentation'],
      ['rag-multimodal-rag', 'ColPali Visual Document Retrieval Paper'],
      ['rag-testing-release-defense', 'OWASP LLM Verification Standard'],
    ];
    for (const [moduleId, title] of expectations) {
      expect(evidenceForModule(moduleId).some((value) => value.includes(title))).toBe(true);
    }
    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-15')).toBe(true);
    expect(blueprint.sources).toHaveLength(30);
    const versionText = blueprint.sources.map((source) => source.version).join(' ');
    for (const version of [
      'Python 3.14.6',
      'Unicode 17.0.0',
      'scikit-learn 1.9.0',
      'sentence-transformers 5.6.0',
      'faiss-cpu 1.14.3',
      'pgvector 0.8.2',
      '1.43.0',
    ]) {
      expect(versionText).toContain(version);
    }
  });
});
