import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'http-protocol-go-outcomes-layers-evidence',
  'http-protocol-go-octets-streams-partial-io',
  'http-protocol-go-tcp-connections-deadlines',
  'http-protocol-go-semantics-wire-model',
  'http-protocol-go-abnf-parser-architecture',
  'http-protocol-go-request-line-targets',
  'http-protocol-go-fields-structured-values',
  'http-protocol-go-message-framing-precedence',
  'http-protocol-go-fixed-length-close-delimited',
  'http-protocol-go-chunked-trailers',
  'http-protocol-go-response-control-content',
  'http-protocol-go-response-serialization-writes',
  'http-protocol-go-persistence-pipelining-order',
  'http-protocol-go-expect-early-response',
  'http-protocol-go-intermediaries-hop-fields',
  'http-protocol-go-authority-host-routing',
  'http-protocol-go-tls13-alpn-identity',
  'http-protocol-go-upgrade-connect-transitions',
  'http-protocol-go-smuggling-splitting-differentials',
  'http-protocol-go-resource-limits-slow-clients',
  'http-protocol-go-state-machines-concurrency',
  'http-protocol-go-tests-differential-fuzz-race',
  'http-protocol-go-http2-frames-hpack-flow',
  'http-protocol-go-http3-quic-production',
];

const similarityStopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one go http protocol evidence current changed case team browser code model decision build deterministic production transfer gate competency probe request response parser bytes state'.split(
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

function evidenceForModule(moduleId: string): string[] {
  return graph.activities
    .filter((activity) => activity.moduleId === moduleId)
    .flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'evidence' ? [block.value] : []))
      )
    );
}

const graph = loadCurriculumGraph('http-protocol-go');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', 'http-protocol-go.json'), 'utf8'))
);

describe('HTTP Protocol Engineering in Go 1.26 v2 course', () => {
  it('follows the byte-stream-to-HTTP/3 prerequisite sequence at full depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(120);
    expect(graph.modules).toHaveLength(24);
    expect(graph.activities).toHaveLength(246);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      2006
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      2204
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('http-protocol-go-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and interaction-complete', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('approved');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['http-servers-go']);
    expect(graph.course.prerequisites).toEqual(['http-servers-go']);
    expect(new Set(graph.activities.map((activity) => activity.kind))).toEqual(
      new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
    );
    expect(
      graph.activities.every((activity, index) =>
        index === 0 ? activity.prerequisites.length === 0 : activity.prerequisites.length === 1
      )
    ).toBe(true);
    expect(
      blueprint.competencies.every(
        (competency) =>
          competency.misconceptions.length > 0 &&
          competency.misconceptions.every((misconception) => misconception.length >= 24)
      )
    ).toBe(true);

    for (const module of blueprint.modules) {
      const contexts = module.activities
        .filter((activity) =>
          ['workshop', 'debug', 'lab', 'review', 'quiz'].includes(activity.kind)
        )
        .map((activity) => ({ id: activity.id, terms: contentTerms(activity.authenticContext) }));
      expect(contexts).toHaveLength(5);
      for (const [index, left] of contexts.entries()) {
        for (const right of contexts.slice(index + 1)) {
          expect(
            jaccard(left.terms, right.terms),
            `${module.id} repeats ${left.id} as ${right.id}`
          ).toBeLessThan(0.72);
        }
      }
    }
  });

  it('gives every protocol increment an exact compile-ready changed-case contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );

    expect(codeSteps).toHaveLength(198);
    expect(codeSteps.every(({ step }) => step.targetFile === 'go')).toBe(true);
    expect(
      codeSteps.every(({ activity, step }) => {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const marker = checks.find((check) => check.type === 'source-includes');
        const structure = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        return (
          marker?.type === 'source-includes' &&
          marker.file === 'go' &&
          marker.expected.includes('// Evidence: httpproto-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'go' &&
          example?.type === 'code' &&
          example.language === 'go' &&
          example.code.includes('// Operating constraint:') &&
          example.code.includes('// Changed case:') &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.go.includes('deterministic pure-Go octet') &&
          activity.starterFiles.go.includes('explicit authorized Go 1.26 protocol transfer gates')
      )
    ).toBe(true);

    const examples = codeSteps.map(({ step }) => {
      const block = step.content.find((entry) => entry.type === 'code');
      return block?.type === 'code' ? block.code : '';
    });
    expect(new Set(examples).size).toBe(examples.length);
    const terms = examples.map(contentTerms);
    let closest = { score: 0, left: 0, right: 0 };
    for (const [index, left] of terms.entries()) {
      for (const [offset, right] of terms.slice(index + 1).entries()) {
        const score = jaccard(left, right);
        if (score > closest.score) closest = { score, left: index, right: index + offset + 1 };
      }
    }
    expect(
      closest.score,
      `near-duplicate HTTP protocol examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });

  it('parses every Go lesson block and compiles every exact learner evidence function', () => {
    const codeBlocks = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.content.flatMap((block) =>
          block.type === 'code' && block.language === 'go' ? [block.code] : []
        )
      )
    );
    expect(codeBlocks.length).toBeGreaterThan(300);
    const goRoot = spawnSync('go', ['env', 'GOROOT'], { encoding: 'utf8' });
    expect(goRoot.status, goRoot.stderr).toBe(0);
    const gofmt = path.join(goRoot.stdout.trim(), 'bin', 'gofmt');
    for (const source of codeBlocks) {
      const parsed = spawnSync(gofmt, {
        input: `package main\n${source}\n`,
        encoding: 'utf8',
      });
      expect(parsed.status, parsed.stderr).toBe(0);
    }

    const exactFunctions = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.interaction === 'code'
          ? step.content.flatMap((block) =>
              block.type === 'code' && block.language === 'go' ? [block.code] : []
            )
          : []
      )
    );
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-http-protocol-go-'));
    try {
      writeFileSync(
        path.join(directory, 'go.mod'),
        'module example.test/httpprotocolevidence\n\ngo 1.26\n'
      );
      writeFileSync(
        path.join(directory, 'evidence_test.go'),
        `package httpprotocolevidence\n\n${exactFunctions.join('\n\n')}\n`
      );
      const result = spawnSync('go', ['test', './...'], {
        cwd: directory,
        encoding: 'utf8',
        env: { ...process.env, GOWORK: 'off' },
      });
      expect(result.status, result.stderr || result.stdout).toBe(0);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }, 30_000);

  it('keeps browser execution pure while naming every real protocol transfer gate', () => {
    const sources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.go ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    const forbidden =
      /import\s+["'(]*(?:net|net\/http|crypto\/tls|os|os\/exec|syscall)|\b(?:ListenAndServe|ServeTLS|exec\.Command|net\.Listen|tls\.Dial)\s*\(/;
    expect(sources.length).toBeGreaterThan(450);
    expect(sources.every((source) => !forbidden.test(source))).toBe(true);
    const transferText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'sockets',
      'listeners',
      'TLS',
      'proxies',
      'packet',
      'fuzz',
      'race',
      'load',
      'HTTP/2',
      'HTTP/3',
      'production',
    ]) {
      expect(transferText).toContain(boundary);
    }
  });

  it('routes current primary research to the governing protocol boundaries', () => {
    const expectations: Array<[string, string]> = [
      ['http-protocol-go-octets-streams-partial-io', 'Go bufio'],
      ['http-protocol-go-tcp-connections-deadlines', 'Transmission Control Protocol'],
      ['http-protocol-go-semantics-wire-model', 'HTTP Semantics'],
      ['http-protocol-go-message-framing-precedence', 'HTTP/1.1'],
      ['http-protocol-go-fields-structured-values', 'Structured Field Values'],
      ['http-protocol-go-tls13-alpn-identity', 'Transport Layer Security'],
      ['http-protocol-go-upgrade-connect-transitions', 'Optimistic Protocol Transitions'],
      ['http-protocol-go-tests-differential-fuzz-race', 'Go Fuzzing'],
      ['http-protocol-go-http2-frames-hpack-flow', 'HTTP/2'],
      ['http-protocol-go-http3-quic-production', 'HTTP/3'],
    ];
    for (const [moduleId, title] of expectations) {
      expect(evidenceForModule(moduleId).some((value) => value.includes(title))).toBe(true);
    }

    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources).toHaveLength(20);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-14')).toBe(true);
    for (const version of [
      'Go 1.26.5',
      'RFC 9110',
      'RFC 9112',
      'RFC 9113',
      'RFC 9114',
      'RFC 9651',
      'RFC 9931',
    ]) {
      expect(blueprint.sources.some((source) => source.version.includes(version))).toBe(true);
    }
  });

  it('covers byte-level protocol work rather than renaming the Go server course', () => {
    const serverGraph = loadCurriculumGraph('http-servers-go');
    const normalizedStatements = (values: string[]) =>
      new Set(values.map((value) => [...contentTerms(value)].sort().join(' ')));
    const protocolStatements = normalizedStatements(
      graph.course.competencies.map((competency) => competency.statement)
    );
    const serverStatements = normalizedStatements(
      serverGraph.course.competencies.map((competency) => competency.statement)
    );
    expect([...protocolStatements].filter((statement) => serverStatements.has(statement))).toEqual(
      []
    );

    const corpus =
      `${blueprint.modules.map((entry) => `${entry.id} ${entry.title}`).join(' ')} ${blueprint.competencies
        .flatMap((competency) => [competency.statement, ...competency.misconceptions])
        .join(' ')}`.toLowerCase();
    for (const phrase of [
      'short write',
      'abnf',
      'request-target',
      'content-length',
      'chunked',
      'structured fields',
      '100 continue',
      'rfc 9931',
      'request smuggling',
      'net.pipe',
      'hpack',
      'qpack',
      'http/3',
    ]) {
      expect(corpus).toContain(phrase);
    }
  });

  it('uses learner-facing protocol language instead of internal identifier fragments', () => {
    const learnerLabelsAndNarrative = graph.activities.flatMap((activity) => [
      activity.title,
      activity.summary,
      ...activity.steps.flatMap((step) => [step.title, step.why]),
    ]);
    expect(learnerLabelsAndNarrative.every((value) => !/httpproto/i.test(value))).toBe(true);
    expect(
      learnerLabelsAndNarrative.every(
        (value) => !/\b(concept|workshop|lab|quiz)\s+\1\b/i.test(value)
      )
    ).toBe(true);

    const instructionsWithInternalMarkers = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => step.instruction)
        .filter((instruction) => /httpproto/i.test(instruction))
    );
    expect(instructionsWithInternalMarkers).not.toHaveLength(0);
    expect(
      instructionsWithInternalMarkers.every((instruction) =>
        instruction.includes('"// Evidence: httpproto-')
      )
    ).toBe(true);
  });
});
