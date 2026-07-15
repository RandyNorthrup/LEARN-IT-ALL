export interface QualityGateResult {
  id: string;
  label: string;
  passed: boolean;
  evidence: string;
}

interface GateDefinition {
  id: string;
  label: string;
  patterns: RegExp[];
  remediation: string;
}

const GATES: GateDefinition[] = [
  {
    id: 'format',
    label: 'Deterministic formatting',
    patterns: [/\b(format|prettier|biome format|ruff format|gofmt|rustfmt)\b/i],
    remediation: 'Add a deterministic formatter and a check-only CI command.',
  },
  {
    id: 'lint',
    label: 'Static linting',
    patterns: [/\b(lint|eslint|biome check|ruff check|clippy)\b/i],
    remediation: 'Add a linter that fails on actionable diagnostics.',
  },
  {
    id: 'types',
    label: 'Type checking',
    patterns: [/\b(type-?check|tsc|mypy|pyright|cargo check)\b/i],
    remediation: 'Add a strict type checker with a non-zero failure exit.',
  },
  {
    id: 'tests',
    label: 'Automated tests',
    patterns: [/\b(test|vitest|jest|pytest|cargo test|go test)\b/i],
    remediation: 'Add fast repeatable tests before slower gates.',
  },
  {
    id: 'dead-code',
    label: 'Dead-code detection',
    patterns: [/\b(dead.?code|knip|vulture|unused|cargo udeps)\b/i],
    remediation: 'Detect unreachable, unused, and unreferenced production code.',
  },
  {
    id: 'security',
    label: 'Security and sanitizers',
    patterns: [/\b(security|audit|saniti[sz]er|asan|ubsan|bandit|semgrep|codeql|npm audit)\b/i],
    remediation: 'Add language-appropriate security analysis or runtime sanitizers.',
  },
  {
    id: 'constants',
    label: 'Constants and literal policy',
    patterns: [/\b(constants?|magic.?numbers?|literal|no.?magic|prefer.?const)\b/i],
    remediation: 'Enforce the repository policy for constants, literals, and magic values.',
  },
];

export function evaluateQualityGates(source: string): QualityGateResult[] {
  return GATES.map((gate) => {
    const match = gate.patterns
      .map((pattern) => source.match(pattern))
      .find((candidate) => candidate?.[0]);
    return {
      id: gate.id,
      label: gate.label,
      passed: Boolean(match),
      evidence: match?.[0] ?? gate.remediation,
    };
  });
}

export function formatQualityGateReport(source: string): string {
  if (source.trim().length === 0)
    return 'No gate manifest supplied. Add commands, then run review.';
  const results = evaluateQualityGates(source);
  const passed = results.filter((result) => result.passed).length;
  return [
    `QUALITY GATE REVIEW: ${passed}/${results.length}`,
    ...results.map(
      (result) => `${result.passed ? 'PASS' : 'MISS'}  ${result.label} — ${result.evidence}`
    ),
    '',
    passed === results.length
      ? 'Manifest covers the baseline gate families. Verify command behavior in the target repository.'
      : 'Missing families remain. Add justified commands or document why a gate does not apply.',
    'Safety: this review analyzes text and never executes learner commands.',
  ].join('\n');
}
