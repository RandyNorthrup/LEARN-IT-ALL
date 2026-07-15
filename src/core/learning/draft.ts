import type { StepProgressRecord } from './progress';

export interface LearningFiles {
  html: string;
  css: string;
  javascript: string;
  typescript: string;
  python: string;
  go: string;
  c: string;
  sql: string;
  shell: string;
  prompt: string;
  config: string;
}

export interface LearningInputDrafts {
  selectedByStep: Record<string, string>;
  orderByStep: Record<string, string[]>;
  textByStep: Record<string, string>;
}

export const EMPTY_LEARNING_FILES: LearningFiles = {
  html: '',
  css: '',
  javascript: '',
  typescript: '',
  python: '',
  go: '',
  c: '',
  sql: '',
  shell: '',
  prompt: '',
  config: '',
};

export const EMPTY_LEARNING_INPUT_DRAFTS: LearningInputDrafts = {
  selectedByStep: {},
  orderByStep: {},
  textByStep: {},
};

export function learningInputDrafts(records: StepProgressRecord[]): LearningInputDrafts {
  const drafts: LearningInputDrafts = {
    selectedByStep: {},
    orderByStep: {},
    textByStep: {},
  };

  for (const record of records) {
    if (!record.draftJson) continue;
    try {
      const draft = JSON.parse(record.draftJson) as {
        selectedOptionId?: unknown;
        orderedOptionIds?: unknown;
        textResponse?: unknown;
      };
      if (typeof draft.selectedOptionId === 'string') {
        drafts.selectedByStep[record.stepId] = draft.selectedOptionId;
      }
      if (
        Array.isArray(draft.orderedOptionIds) &&
        draft.orderedOptionIds.every((optionId) => typeof optionId === 'string')
      ) {
        drafts.orderByStep[record.stepId] = draft.orderedOptionIds;
      }
      if (typeof draft.textResponse === 'string') {
        drafts.textByStep[record.stepId] = draft.textResponse;
      }
    } catch {
      // Ignore corrupt history without discarding other recoverable step drafts.
    }
  }

  return drafts;
}

export function latestLearningFiles(
  records: StepProgressRecord[],
  fallback: LearningFiles
): LearningFiles {
  for (const record of [...records].reverse()) {
    if (!record.draftJson) continue;
    try {
      const draft = JSON.parse(record.draftJson) as { files?: Partial<LearningFiles> };
      if (draft.files) {
        return {
          html: draft.files.html ?? fallback.html,
          css: draft.files.css ?? fallback.css,
          javascript: draft.files.javascript ?? fallback.javascript,
          typescript: draft.files.typescript ?? fallback.typescript,
          python: draft.files.python ?? fallback.python,
          go: draft.files.go ?? fallback.go,
          c: draft.files.c ?? fallback.c,
          sql: draft.files.sql ?? fallback.sql,
          shell: draft.files.shell ?? fallback.shell,
          prompt: draft.files.prompt ?? fallback.prompt,
          config: draft.files.config ?? fallback.config,
        };
      }
    } catch {
      // Ignore corrupt history and continue toward an earlier usable increment.
    }
  }
  return fallback;
}

export function cumulativeLearningFiles(
  currentRecords: StepProgressRecord[],
  prerequisiteRecordGroups: StepProgressRecord[][],
  fallback: LearningFiles
): LearningFiles {
  const emptyMarker = { ...EMPTY_LEARNING_FILES };
  const current = latestLearningFiles(currentRecords, emptyMarker);
  if (current !== emptyMarker) return current;

  for (const records of [...prerequisiteRecordGroups].reverse()) {
    const inherited = latestLearningFiles(records, emptyMarker);
    if (inherited !== emptyMarker) return inherited;
  }
  return fallback;
}
