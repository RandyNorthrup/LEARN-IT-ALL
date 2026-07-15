import { describe, expect, it } from 'vitest';
import {
  advanceLander,
  initialLanderState,
  LANDER_SCENARIOS,
  parseFlightProgram,
  runLanderProgram,
} from './lander';

describe('deterministic lander physics', () => {
  it('returns the same next state for the same evidence', () => {
    const scenario = LANDER_SCENARIOS.lunar;
    const state = initialLanderState(scenario);
    expect(advanceLander(scenario, state, 'COAST')).toEqual(
      advanceLander(scenario, state, 'COAST')
    );
  });

  it.each(
    Object.values(LANDER_SCENARIOS)
  )('ships a verified reference program for $title', (scenario) => {
    const trace = runLanderProgram(scenario, scenario.referenceProgram);
    expect(trace.at(-1)?.status).toBe('landed');
    expect(trace.at(-1)?.impactVelocity).toBeLessThanOrEqual(scenario.safeVelocity);
  });

  it('makes an all-coast program fail from the same initial state', () => {
    const scenario = LANDER_SCENARIOS.lunar;
    const trace = runLanderProgram(
      scenario,
      Array.from({ length: scenario.maxTurns }, () => 'COAST' as const)
    );
    expect(trace.at(-1)?.status).toBe('crashed');
  });
});

describe('flight program parser', () => {
  it('accepts comments and canonicalizes safe commands', () => {
    expect(parseFlightProgram('# approach\ncoast\nPULSE\nburn', 8)).toEqual({
      commands: ['COAST', 'PULSE', 'BURN'],
      errors: [],
    });
  });

  it('rejects unknown commands and overlong programs', () => {
    const result = parseFlightProgram('COAST\nEXEC shell\nPULSE\nBURN', 2);
    expect(result.commands).toEqual(['COAST', 'PULSE']);
    expect(result.errors).toEqual([
      'Line 2: use COAST, PULSE, or BURN.',
      'Program has 3 commands; maximum is 2.',
    ]);
  });
});
