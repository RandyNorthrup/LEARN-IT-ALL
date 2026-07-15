import { describe, expect, it } from 'vitest';
import { INTERACTION_PRESENTATIONS } from './interactionPresentation';

describe('interaction presentations', () => {
  it('gives every interaction a named learning mode', () => {
    expect(Object.keys(INTERACTION_PRESENTATIONS)).toHaveLength(9);
    expect(new Set(Object.values(INTERACTION_PRESENTATIONS).map((mode) => mode.label)).size).toBe(
      9
    );
  });

  it('uses multiple layouts instead of one repeated lesson template', () => {
    const layouts = new Set(Object.values(INTERACTION_PRESENTATIONS).map((mode) => mode.layout));
    expect(layouts.size).toBeGreaterThanOrEqual(6);
  });

  it('keeps coding and debugging in a cumulative workbench', () => {
    expect(INTERACTION_PRESENTATIONS.code.layout).toBe('workbench');
    expect(INTERACTION_PRESENTATIONS.debug.layout).toBe('workbench');
    expect(INTERACTION_PRESENTATIONS.code.guidance).toContain('earlier steps');
  });
});
