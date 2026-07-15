import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'crypto-go-outcomes-threat-evidence',
  'crypto-go-primitives-encoding',
  'crypto-go-randomness-nonces',
  'crypto-go-secret-bytes-lifecycle',
  'crypto-go-classical-cryptanalysis',
  'crypto-go-aes-block-ciphers',
  'crypto-go-modes-padding',
  'crypto-go-aead-aes-gcm',
  'crypto-go-chacha-poly1305',
  'crypto-go-hashes-sha3',
  'crypto-go-mac-hmac',
  'crypto-go-kdf-hkdf',
  'crypto-go-password-hashing',
  'crypto-go-modular-arithmetic',
  'crypto-go-rsa-oaep-pss',
  'crypto-go-ecdh-x25519',
  'crypto-go-ed25519-ecdsa',
  'crypto-go-hpke-envelope',
  'crypto-go-key-management',
  'crypto-go-x509-pki',
  'crypto-go-tls13',
  'crypto-go-protocol-design',
  'crypto-go-file-stream-formats',
  'crypto-go-post-quantum',
  'crypto-go-side-channels-misuse',
  'crypto-go-testing-vectors-fuzz',
  'crypto-go-agility-compliance',
  'crypto-go-operations-release',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one go crypto cryptography cryptographic security evidence current changed case team browser code model decision build deterministic production transfer gate competency probe key bytes'.split(
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

const graph = loadCurriculumGraph('cryptography-go');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', 'cryptography-go.json'), 'utf8'))
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

describe('applied cryptographic engineering in Go 1.26 v2 course', () => {
  it('follows the threat-model-to-production-defense prerequisite sequence at full depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(140);
    expect(graph.modules).toHaveLength(28);
    expect(graph.activities).toHaveLength(286);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      2331
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      2561
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('cryptography-go-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and scenario-diverse', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('approved');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['go-basics']);
    expect(graph.course.prerequisites).toEqual(['go-basics']);
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

  it('gives every cryptographic build an exact compile-ready changed-case contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );
    expect(codeSteps).toHaveLength(230);
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
          marker.expected.includes('// Evidence: crypto-go-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'go' &&
          example?.type === 'code' &&
          example.language === 'go' &&
          example.code.includes('// Changed case:') &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.go.includes('deterministic pure-Go models') &&
          activity.starterFiles.go.includes('explicit authorized transfer gates')
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
      `near-duplicate cryptographic Go examples ${closest.left} and ${closest.right}`
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
    expect(codeBlocks.length).toBe(370);
    const goRoot = spawnSync('go', ['env', 'GOROOT'], { encoding: 'utf8' });
    expect(goRoot.status, goRoot.stderr).toBe(0);
    const gofmt = path.join(goRoot.stdout.trim(), 'bin', 'gofmt');
    for (const source of codeBlocks) {
      const complete = source.trimStart().startsWith('package ')
        ? source
        : `package main\n${source}\n`;
      const parsed = spawnSync(gofmt, { input: complete, encoding: 'utf8' });
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
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-crypto-go-'));
    try {
      writeFileSync(
        path.join(directory, 'go.mod'),
        'module example.test/cryptoevidence\n\ngo 1.26\n'
      );
      writeFileSync(
        path.join(directory, 'evidence_test.go'),
        `package cryptoevidence\n\n${exactFunctions.join('\n\n')}\n`
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

  it('keeps browser execution deterministic while naming complete native transfer gates', () => {
    const sources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.go ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    const forbidden =
      /import\s+["'(]*(?:crypto\/(?:rand|tls)|golang[.]org\/x\/crypto|net|os|os\/exec)|\b(?:Dial|DialTLS|exec[.]Command|rand[.]Read|tls[.]Dial)\s*\(/u;
    expect(sources.length).toBeGreaterThan(650);
    expect(sources.every((source) => !forbidden.test(source))).toBe(true);
    const sourceText = sources.join('\n');
    for (const safePackage of [
      'crypto/aes',
      'crypto/cipher',
      'crypto/ecdh',
      'crypto/ed25519',
      'crypto/hmac',
      'crypto/sha256',
      'crypto/subtle',
    ]) {
      expect(sourceText).toContain(`"${safePackage}"`);
    }
    const transferText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'entropy',
      'secret',
      'constant-time',
      'TLS',
      'HSM/KMS',
      'certificate',
      'FIPS',
      'compliance',
      'interoperability',
      'load',
      'recovery',
      'production',
    ]) {
      expect(transferText).toContain(boundary);
    }
  });

  it('contains obsolete algorithms only as attack, rejection, compatibility, or migration material', () => {
    const scope = `${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const term of [
      'Caesar',
      'XOR',
      'ECB',
      'CBC',
      'DES/3DES',
      'RC4',
      'textbook RSA',
      'MD5',
      'SHA-1',
    ]) {
      expect(scope).toContain(term);
    }
    expect(blueprint.scope.excludes.join(' ')).toContain(
      'only in bounded attack, rejection, compatibility, or migration labs'
    );
    const classical = blueprint.modules.find(
      (module) => module.id === 'crypto-go-classical-cryptanalysis'
    );
    const modes = blueprint.modules.find((module) => module.id === 'crypto-go-modes-padding');
    const classicalArtifact = classical?.activities[0]?.learningDesign.learnerArtifact ?? '';
    const modesArtifact = modes?.activities[0]?.learningDesign.learnerArtifact ?? '';
    expect(classicalArtifact.toLowerCase()).toContain('attack');
    expect(classicalArtifact.toLowerCase()).toContain('migration');
    expect(modesArtifact.toLowerCase()).toContain('migration');
  });

  it('keeps cryptographic activities free of inherited HTTP and storage sequencing language', () => {
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
      'resolution, transport, redirect, status, representation',
      'request or response model',
      'live-network transfer limits',
      'S3 storage decision',
      'RabbitMQ messaging model',
    ]) {
      expect(learnerText).not.toContain(leakage);
    }
    expect(learnerText).toContain('threat-to-evidence cycle');
    expect(learnerText).toContain('asset, adversary, required property');
  });

  it('routes current primary research to every governing cryptographic boundary', () => {
    const expectations: Array<[string, string]> = [
      ['crypto-go-outcomes-threat-evidence', 'CS2023 Cryptography Curriculum'],
      ['crypto-go-randomness-nonces', 'Go Cryptographic Randomness'],
      ['crypto-go-aes-block-ciphers', 'NIST FIPS 197 AES'],
      ['crypto-go-aead-aes-gcm', 'NIST SP 800-38D GCM'],
      ['crypto-go-chacha-poly1305', 'ChaCha20-Poly1305 RFC 8439'],
      ['crypto-go-hashes-sha3', 'Go SHA-2 and SHA-3 Packages'],
      ['crypto-go-mac-hmac', 'Go HMAC Package'],
      ['crypto-go-kdf-hkdf', 'Go HKDF Package'],
      ['crypto-go-password-hashing', 'OWASP Password Storage'],
      ['crypto-go-rsa-oaep-pss', 'Go RSA Package'],
      ['crypto-go-ecdh-x25519', 'Go ECDH Package'],
      ['crypto-go-ed25519-ecdsa', 'Go Ed25519 Package'],
      ['crypto-go-hpke-envelope', 'Go HPKE Package'],
      ['crypto-go-key-management', 'NIST SP 800-57 Key Management'],
      ['crypto-go-x509-pki', 'Go X.509 Package'],
      ['crypto-go-tls13', 'TLS 1.3 RFC 8446'],
      ['crypto-go-post-quantum', 'NIST FIPS 203 ML-KEM'],
      ['crypto-go-agility-compliance', 'Go FIPS 140-3 Compliance'],
      ['crypto-go-operations-release', 'Go Security Best Practices'],
    ];
    for (const [moduleId, title] of expectations) {
      expect(evidenceForModule(moduleId).some((value) => value.includes(title))).toBe(true);
    }
    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-15')).toBe(true);
    expect(blueprint.sources).toHaveLength(34);
    const versionText = blueprint.sources.map((source) => source.version).join(' ');
    for (const version of ['Go 1.26.5', 'v0.54.0', 'FIPS 203', 'FIPS 204', 'FIPS 205']) {
      expect(versionText).toContain(version);
    }
  });
});
