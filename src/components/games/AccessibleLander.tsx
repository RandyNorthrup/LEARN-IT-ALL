'use client';

import { ArrowLeft, Play, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  advanceLander,
  initialLanderState,
  LANDER_SCENARIOS,
  type LanderState,
  landerStatusMessage,
  parseFlightProgram,
  runLanderProgram,
  THRUST_COMMANDS,
  type ThrustCommandName,
} from '@/core/games/lander';
import styles from './AccessibleLander.module.css';

interface AccessibleLanderProps {
  variant: 'manual' | 'program';
}

function FlightTrace({ trace }: { trace: LanderState[] }) {
  return (
    <div className={styles.tableScroll}>
      <table>
        <caption>Deterministic telemetry trace</caption>
        <thead>
          <tr>
            <th scope="col">Turn</th>
            <th scope="col">Command</th>
            <th scope="col">Altitude</th>
            <th scope="col">Down velocity</th>
            <th scope="col">Fuel</th>
            <th scope="col">State</th>
          </tr>
        </thead>
        <tbody>
          {trace.map((state) => (
            <tr key={`${state.turn}-${state.lastCommand ?? 'initial'}`}>
              <td>{state.turn}</td>
              <td>{state.lastCommand ?? 'INITIAL'}</td>
              <td>{state.altitude.toFixed(2)}</td>
              <td>{state.velocity.toFixed(2)}</td>
              <td>{state.fuel.toFixed(0)}</td>
              <td>{state.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AccessibleLander({ variant }: AccessibleLanderProps) {
  const scenario = LANDER_SCENARIOS[variant === 'manual' ? 'lunar' : 'code'];
  const [trace, setTrace] = useState<LanderState[]>(() => [initialLanderState(scenario)]);
  const [program, setProgram] = useState(
    '# One command per turn\nCOAST\nCOAST\nCOAST\n# Add PULSE or BURN before impact'
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [runs, setRuns] = useState(0);
  const state = trace.at(-1) as LanderState;
  const status = landerStatusMessage(state, scenario.safeVelocity);
  const altitudePercent = Math.max(
    0,
    Math.min(100, (state.altitude / scenario.initialAltitude) * 100)
  );

  function sendCommand(command: ThrustCommandName) {
    const next = advanceLander(scenario, state, command);
    setTrace((current) => [...current, next]);
  }

  function runProgram() {
    const result = parseFlightProgram(program, scenario.maxTurns);
    setErrors(result.errors);
    if (result.errors.length > 0) return;
    setTrace(runLanderProgram(scenario, result.commands));
    setRuns((current) => current + 1);
  }

  function resetMission() {
    setTrace([initialLanderState(scenario)]);
    setErrors([]);
  }

  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <Link href="/games" className={styles.back}>
          <ArrowLeft aria-hidden="true" /> Practice arcade
        </Link>
        <span className={styles.brand}>LEARN / BUILD</span>
        <button type="button" className={styles.reset} onClick={resetMission}>
          <RotateCcw aria-hidden="true" /> Reset mission
        </button>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Deterministic control systems</span>
          <h1>{scenario.title}</h1>
          <p>{scenario.mission}</p>
        </div>
        <dl className={styles.limits} aria-label="Mission limits">
          <div>
            <dt>Safe impact</dt>
            <dd>≤ {scenario.safeVelocity.toFixed(1)}</dd>
          </div>
          <div>
            <dt>Fuel</dt>
            <dd>{scenario.initialFuel}</dd>
          </div>
          <div>
            <dt>Turn limit</dt>
            <dd>{scenario.maxTurns}</dd>
          </div>
        </dl>
      </section>

      <p className={styles.boundary}>
        Mission results are deterministic session practice. They do not grant course XP or mastery.
      </p>

      <section className={styles.workspace} aria-labelledby="mission-heading">
        <div className={styles.flightPanel}>
          <div className={styles.sky} aria-hidden="true">
            <span className={styles.ship} style={{ bottom: `${altitudePercent}%` }}>
              ◆
            </span>
            <span className={styles.pad}>LANDING ZONE</span>
          </div>
          <div className={styles.telemetry}>
            <span>ALT {state.altitude.toFixed(2)}</span>
            <span>VEL {state.velocity.toFixed(2)}</span>
            <span>FUEL {state.fuel.toFixed(0)}</span>
            <span>TURN {state.turn}</span>
          </div>
          <p
            className={styles.status}
            data-state={state.status}
            aria-live="polite"
            aria-atomic="true"
          >
            {status}
          </p>
        </div>

        <div className={styles.controlPanel}>
          <span className={styles.eyebrow}>
            {variant === 'manual' ? 'Pilot console' : 'Program console'}
          </span>
          <h2 id="mission-heading">
            {variant === 'manual'
              ? 'Choose the next control input.'
              : 'Write, run, inspect, revise.'}
          </h2>
          <p>
            Downward velocity rises by gravity each turn. PULSE applies one thrust unit; BURN
            applies two and spends twice the fuel. Touchdown must stay within the safe impact limit.
          </p>

          {variant === 'manual' ? (
            <fieldset className={styles.manualControls} disabled={state.status !== 'flying'}>
              <legend>Send one command</legend>
              {THRUST_COMMANDS.map((command) => (
                <button key={command} type="button" onClick={() => sendCommand(command)}>
                  <strong>{command}</strong>
                  <span>
                    {command === 'COAST'
                      ? '0 thrust'
                      : command === 'PULSE'
                        ? '1 thrust'
                        : '2 thrust'}
                  </span>
                </button>
              ))}
            </fieldset>
          ) : (
            <div className={styles.programControls}>
              <label htmlFor="flight-program">Flight program</label>
              <p id="program-help">
                One command per line: COAST, PULSE, or BURN. Lines starting with # are comments.
                Source is parsed as data and never executed.
              </p>
              <textarea
                id="flight-program"
                aria-describedby="program-help"
                value={program}
                onChange={(event) => setProgram(event.target.value)}
                rows={12}
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
              />
              {errors.length > 0 ? (
                <div className={styles.errors} role="alert">
                  <strong>Program blocked</strong>
                  <ul>
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <button type="button" className={styles.run} onClick={runProgram}>
                <Play aria-hidden="true" /> Run deterministic simulation
              </button>
              <span className={styles.runCount}>Programs tested this session: {runs}</span>
            </div>
          )}

          <aside className={styles.model}>
            <h3>Model contract</h3>
            <code>next velocity = velocity + gravity − thrust</code>
            <code>next altitude = altitude − next velocity</code>
            <p>No randomness. Same state plus same command always produces the same result.</p>
          </aside>
        </div>
      </section>

      <section className={styles.traceSection} aria-labelledby="trace-heading">
        <div>
          <span className={styles.eyebrow}>Evidence, not animation</span>
          <h2 id="trace-heading">Read every state transition.</h2>
        </div>
        <FlightTrace trace={trace} />
      </section>
    </main>
  );
}
