import { describe, expect, it } from 'vitest';
import type { WebRequirement } from '@/types/exercise';
import { validateWebExercise } from './webExerciseValidator';

const requirements: WebRequirement[] = [
  {
    id: 'heading',
    type: 'text-includes',
    selector: 'h1',
    expected: 'Hello learners',
    description: 'Add page heading',
  },
  {
    id: 'nav-label',
    type: 'attribute-equals',
    selector: 'nav',
    attribute: 'aria-label',
    expected: 'Primary',
    description: 'Label navigation',
  },
  {
    id: 'layout',
    type: 'css-property',
    selector: '.cards',
    property: 'display',
    expected: 'grid',
    description: 'Use grid',
  },
];

describe('validateWebExercise', () => {
  it('validates semantic HTML and CSS declarations', () => {
    const results = validateWebExercise(
      {
        html: '<nav aria-label="Primary"></nav><h1>Hello learners</h1><div class="cards"></div>',
        css: '.cards { display: grid; gap: 1rem; }',
      },
      requirements
    );

    expect(results.every((result) => result.passed)).toBe(true);
  });

  it('returns useful failures without throwing on invalid CSS or selectors', () => {
    const results = validateWebExercise({ html: '<h1>Wrong</h1>', css: '.cards {' }, requirements);

    expect(results).toHaveLength(3);
    expect(results.every((result) => !result.passed)).toBe(true);
    expect(results[2].actual).toBeTruthy();
  });
});
