export interface PromptHarnessCriterion {
  id: string;
  label: string;
  passed: boolean;
  evidence: string;
}

interface PromptCriterionDefinition {
  id: string;
  label: string;
  patterns: RegExp[];
  sectionPattern?: RegExp;
  missing: string;
}

const CRITERIA: PromptCriterionDefinition[] = [
  {
    id: 'goal',
    label: 'Measurable goal',
    patterns: [
      /\b(goal|objective|task|outcome)\s*:/i,
      /\b(create|build|diagnose|compare|produce)\b/i,
    ],
    sectionPattern: /^\s*(?:goal|objective|task|outcome)\s*:\s*(.+)$/im,
    missing: 'Name the concrete outcome the agent must produce.',
  },
  {
    id: 'context',
    label: 'Relevant context',
    patterns: [/\b(context|background|audience|scenario|repository)\s*:/i],
    sectionPattern: /^\s*(?:context|background|audience|scenario|repository)\s*:\s*(.+)$/im,
    missing: 'Supply only the context needed to make a good decision.',
  },
  {
    id: 'boundaries',
    label: 'Boundaries and constraints',
    patterns: [/\b(constraints?|boundaries|must|must not|do not|never|only)\b/i],
    sectionPattern: /^\s*(?:constraints?|boundaries)\s*:\s*(.+)$/im,
    missing: 'State authority, safety, scope, or resource boundaries.',
  },
  {
    id: 'output',
    label: 'Output contract',
    patterns: [/\b(output|format|return|respond|deliverable|artifact)\s*:/i],
    sectionPattern: /^\s*(?:output|format|deliverable|artifact)\s*:\s*(.+)$/im,
    missing: 'Describe the shape and level of detail of the response.',
  },
  {
    id: 'done',
    label: 'Definition of done',
    patterns: [
      /\b(done when|acceptance|success criteria|complete when|definition of done|verify)\b/i,
    ],
    sectionPattern:
      /^\s*(?:done when|acceptance|success criteria|complete when|definition of done)\s*:\s*(.+)$/im,
    missing: 'Give observable completion and verification criteria.',
  },
  {
    id: 'uncertainty',
    label: 'Uncertainty behavior',
    patterns: [/\b(if (?:blocked|uncertain|missing)|ask|clarif|assumption|escalat|unknown)\b/i],
    sectionPattern: /^\s*(?:if blocked|if uncertain|if missing|uncertainty)\s*:\s*(.+)$/im,
    missing: 'Say how the agent should handle missing evidence or material uncertainty.',
  },
];

export function evaluatePrompt(source: string): PromptHarnessCriterion[] {
  const prompt = source.trim();
  return CRITERIA.map((criterion) => {
    const sectionMatch = criterion.sectionPattern?.exec(prompt);
    const sectionValue = sectionMatch?.[1]?.trim();
    const hasMeaningfulSection = Boolean(
      sectionValue &&
        sectionValue.length >= 12 &&
        !/\b(?:todo|tbd|replace|placeholder|write here|fill in)\b/i.test(sectionValue)
    );
    const match = criterion.patterns
      .map((pattern) => prompt.match(pattern))
      .find((candidate) => candidate?.[0]);
    return {
      id: criterion.id,
      label: criterion.label,
      passed: sectionMatch ? hasMeaningfulSection : Boolean(match),
      evidence:
        sectionMatch && !hasMeaningfulSection
          ? `${criterion.label} exists but needs a concrete value.`
          : (sectionValue ?? match?.[0] ?? criterion.missing),
    };
  });
}

export function formatPromptHarnessReport(source: string): string {
  if (source.trim().length === 0)
    return 'No prompt supplied. Write a prompt, then run the harness.';
  const results = evaluatePrompt(source);
  const passed = results.filter((result) => result.passed).length;
  const lines = results.map(
    (result) => `${result.passed ? 'PASS' : 'MISS'}  ${result.label} — ${result.evidence}`
  );
  return [
    `PROMPT CONTRACT: ${passed}/${results.length}`,
    ...lines,
    '',
    passed === results.length
      ? 'Ready for changed-case and adversarial evaluation.'
      : 'Revise missing contract elements before judging model output quality.',
  ].join('\n');
}
