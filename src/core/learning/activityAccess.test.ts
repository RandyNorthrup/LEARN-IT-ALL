import { describe, expect, it } from 'vitest';
import { activityAccess, orderedActivityPrerequisiteIds } from './activityAccess';

describe('activityAccess', () => {
  it('opens an activity with no prerequisites', () => {
    expect(activityAccess([], new Set())).toEqual({ canOpen: true, unmetPrerequisiteIds: [] });
  });

  it('reports every incomplete prerequisite', () => {
    expect(activityAccess(['first-studio', 'second-lab'], new Set(['first-studio']))).toEqual({
      canOpen: false,
      unmetPrerequisiteIds: ['second-lab'],
    });
  });

  it('orders the complete prerequisite chain from earliest to latest', () => {
    const dependencies = new Map([
      ['incident-room', ['network-trace']],
      ['network-trace', ['file-rescue']],
      ['file-rescue', ['signal-room']],
      ['signal-room', []],
    ]);

    expect(
      orderedActivityPrerequisiteIds(
        ['incident-room'],
        (activityId) => dependencies.get(activityId) ?? []
      )
    ).toEqual(['signal-room', 'file-rescue', 'network-trace', 'incident-room']);
  });

  it('lists shared prerequisites only once', () => {
    const dependencies = new Map([
      ['lab', ['theory']],
      ['quiz', ['theory']],
      ['theory', []],
    ]);

    expect(
      orderedActivityPrerequisiteIds(
        ['lab', 'quiz'],
        (activityId) => dependencies.get(activityId) ?? []
      )
    ).toEqual(['theory', 'lab', 'quiz']);
  });
});
