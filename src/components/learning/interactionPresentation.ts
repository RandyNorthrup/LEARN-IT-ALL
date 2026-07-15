import type { LearnerStep } from '@/core/curriculum/publicActivity';

type Interaction = LearnerStep['interaction'];

export interface InteractionPresentation {
  symbol: string;
  label: string;
  guidance: string;
  layout: 'briefing' | 'decision' | 'evidence' | 'sequence' | 'workbench' | 'notebook';
}

export const INTERACTION_PRESENTATIONS: Record<Interaction, InteractionPresentation> = {
  read: {
    symbol: '¶',
    label: 'Concept briefing',
    guidance: 'Connect the explanation to evidence, then retrieve the idea without copying.',
    layout: 'briefing',
  },
  predict: {
    symbol: '◉',
    label: 'Prediction desk',
    guidance: 'Commit before seeing the result. Surprise is useful evidence for your mental model.',
    layout: 'decision',
  },
  answer: {
    symbol: '?',
    label: 'Decision point',
    guidance: 'Choose the strongest claim and reject distractors for a specific reason.',
    layout: 'decision',
  },
  calculate: {
    symbol: '∑',
    label: 'Calculation bench',
    guidance:
      'Show the quantity with its unit, then reject results that fail scale or boundary checks.',
    layout: 'notebook',
  },
  inspect: {
    symbol: '⌕',
    label: 'Evidence lab',
    guidance: 'Read the artifact itself. Base the answer on an observable detail, not a guess.',
    layout: 'evidence',
  },
  arrange: {
    symbol: '⇅',
    label: 'Sequence board',
    guidance: 'Reconstruct the causal order, then test whether each transition explains the next.',
    layout: 'sequence',
  },
  debug: {
    symbol: '⚠',
    label: 'Repair bay',
    guidance:
      'Reproduce the defect, change the smallest responsible cause, and keep prior behavior.',
    layout: 'workbench',
  },
  code: {
    symbol: '</>',
    label: 'Build workbench',
    guidance: 'Extend the same artifact. Passing work from earlier steps must keep passing.',
    layout: 'workbench',
  },
  reflect: {
    symbol: '✎',
    label: 'Field notebook',
    guidance: 'Explain the causal model in your own words and cite the evidence that changed it.',
    layout: 'notebook',
  },
};

export function getInteractionPresentation(interaction: Interaction): InteractionPresentation {
  return INTERACTION_PRESENTATIONS[interaction];
}
