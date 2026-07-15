import { describe, expect, it } from 'vitest';
import {
  ARCADE_CHALLENGES,
  ARCADE_MODES,
  gradeArcadeTask,
  initialArcadeResponse,
  practicePoints,
} from './arcade';

describe('deterministic practice arcade', () => {
  it('provides five unique, causal, changed-case challenges per mode', () => {
    const ids = new Set<string>();
    for (const mode of ARCADE_MODES) {
      const challenges = ARCADE_CHALLENGES[mode];
      expect(challenges).toHaveLength(5);
      for (const challenge of challenges) {
        expect(challenge.mode).toBe(mode);
        expect(ids.has(challenge.id)).toBe(false);
        ids.add(challenge.id);
        expect(challenge.scenario.length).toBeGreaterThan(30);
        expect(challenge.competency.length).toBeGreaterThan(20);
        expect(challenge.explanation.length).toBeGreaterThan(40);
        expect(challenge.hints).toHaveLength(3);
        expect(gradeArcadeTask(challenge.primary, correctResponse(challenge.primary))).toBe(true);
        expect(gradeArcadeTask(challenge.transfer, correctResponse(challenge.transfer))).toBe(true);
      }
    }
  });

  it('rejects untouched starting responses and wrong answers', () => {
    for (const mode of ARCADE_MODES) {
      for (const challenge of ARCADE_CHALLENGES[mode]) {
        expect(gradeArcadeTask(challenge.primary, initialArcadeResponse(challenge.primary))).toBe(
          false
        );
      }
    }
  });

  it('awards bounded practice points without random outcomes', () => {
    expect(practicePoints(1, 0)).toBe(25);
    expect(practicePoints(2, 1)).toBe(18);
    expect(practicePoints(100, 3)).toBe(5);
  });
});

function correctResponse(
  task: (typeof ARCADE_CHALLENGES)[keyof typeof ARCADE_CHALLENGES][number]['primary']
) {
  if (task.kind === 'choice') return task.correctOptionId;
  if (task.kind === 'typing') return task.target;
  return task.correctOrder;
}
