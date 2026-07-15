export const THRUST_COMMANDS = ['COAST', 'PULSE', 'BURN'] as const;

export type ThrustCommandName = (typeof THRUST_COMMANDS)[number];
export type ThrustLevel = 0 | 1 | 2;
export type LanderStatus = 'flying' | 'landed' | 'crashed' | 'out-of-time';

export interface LanderScenario {
  id: 'lunar' | 'code';
  title: string;
  mission: string;
  initialAltitude: number;
  initialVelocity: number;
  initialFuel: number;
  gravity: number;
  thrustPower: number;
  fuelPerLevel: number;
  safeVelocity: number;
  maxTurns: number;
  referenceProgram: ThrustCommandName[];
}

export interface LanderState {
  altitude: number;
  velocity: number;
  fuel: number;
  turn: number;
  status: LanderStatus;
  lastCommand: ThrustCommandName | null;
  impactVelocity: number | null;
}

export interface ProgramParseResult {
  commands: ThrustCommandName[];
  errors: string[];
}

const LEVEL_BY_COMMAND: Record<ThrustCommandName, ThrustLevel> = {
  COAST: 0,
  PULSE: 1,
  BURN: 2,
};

export const LANDER_SCENARIOS: Record<LanderScenario['id'], LanderScenario> = {
  lunar: {
    id: 'lunar',
    title: 'Lunar Lander',
    mission: 'Land by choosing one thrust command per telemetry update.',
    initialAltitude: 36,
    initialVelocity: 0,
    initialFuel: 18,
    gravity: 1.2,
    thrustPower: 1.05,
    fuelPerLevel: 1,
    safeVelocity: 2.8,
    maxTurns: 14,
    referenceProgram: [
      'COAST',
      'COAST',
      'COAST',
      'COAST',
      'COAST',
      'BURN',
      'BURN',
      'PULSE',
      'BURN',
      'BURN',
    ],
  },
  code: {
    id: 'code',
    title: 'Code Lander',
    mission: 'Write a command program, run it, and use the trace to revise your control logic.',
    initialAltitude: 48,
    initialVelocity: 0.5,
    initialFuel: 24,
    gravity: 1.35,
    thrustPower: 1.15,
    fuelPerLevel: 1,
    safeVelocity: 2.6,
    maxTurns: 16,
    referenceProgram: [
      'COAST',
      'COAST',
      'COAST',
      'COAST',
      'COAST',
      'BURN',
      'BURN',
      'BURN',
      'BURN',
      'BURN',
      'PULSE',
      'BURN',
    ],
  },
};

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function initialLanderState(scenario: LanderScenario): LanderState {
  return {
    altitude: scenario.initialAltitude,
    velocity: scenario.initialVelocity,
    fuel: scenario.initialFuel,
    turn: 0,
    status: 'flying',
    lastCommand: null,
    impactVelocity: null,
  };
}

export function advanceLander(
  scenario: LanderScenario,
  state: LanderState,
  command: ThrustCommandName
): LanderState {
  if (state.status !== 'flying') return state;

  const requestedLevel = LEVEL_BY_COMMAND[command];
  const affordableLevel = Math.floor(state.fuel / scenario.fuelPerLevel);
  const level = Math.min(requestedLevel, affordableLevel) as ThrustLevel;
  const fuel = round(state.fuel - level * scenario.fuelPerLevel);
  const velocity = round(state.velocity + scenario.gravity - level * scenario.thrustPower);
  const altitude = round(state.altitude - velocity);
  const turn = state.turn + 1;

  if (altitude <= 0) {
    return {
      altitude: 0,
      velocity,
      fuel,
      turn,
      status: velocity <= scenario.safeVelocity ? 'landed' : 'crashed',
      lastCommand: command,
      impactVelocity: velocity,
    };
  }

  return {
    altitude,
    velocity,
    fuel,
    turn,
    status: turn >= scenario.maxTurns ? 'out-of-time' : 'flying',
    lastCommand: command,
    impactVelocity: null,
  };
}

export function parseFlightProgram(source: string, maxCommands: number): ProgramParseResult {
  const commands: ThrustCommandName[] = [];
  const errors: string[] = [];

  for (const [index, rawLine] of source.split(/\r?\n/).entries()) {
    const line = rawLine.trim().toUpperCase();
    if (!line || line.startsWith('#')) continue;
    if (!THRUST_COMMANDS.includes(line as ThrustCommandName)) {
      errors.push(`Line ${index + 1}: use COAST, PULSE, or BURN.`);
      continue;
    }
    commands.push(line as ThrustCommandName);
  }

  if (commands.length === 0) errors.push('Add at least one flight command.');
  if (commands.length > maxCommands) {
    errors.push(`Program has ${commands.length} commands; maximum is ${maxCommands}.`);
  }

  return { commands: commands.slice(0, maxCommands), errors };
}

export function runLanderProgram(
  scenario: LanderScenario,
  commands: ThrustCommandName[]
): LanderState[] {
  const trace = [initialLanderState(scenario)];
  for (const command of commands.slice(0, scenario.maxTurns)) {
    const next = advanceLander(scenario, trace.at(-1) as LanderState, command);
    trace.push(next);
    if (next.status !== 'flying') break;
  }
  return trace;
}

export function landerStatusMessage(state: LanderState, safeVelocity: number): string {
  if (state.status === 'landed') {
    return `Safe landing at ${state.impactVelocity?.toFixed(2)} meters per turn.`;
  }
  if (state.status === 'crashed') {
    return `Hard impact at ${state.impactVelocity?.toFixed(2)}. Target ${safeVelocity.toFixed(2)} or slower.`;
  }
  if (state.status === 'out-of-time') {
    return 'Mission window ended before touchdown. Revise the command sequence.';
  }
  return `Flying: altitude ${state.altitude.toFixed(2)}, downward velocity ${state.velocity.toFixed(2)}, fuel ${state.fuel.toFixed(0)}.`;
}
