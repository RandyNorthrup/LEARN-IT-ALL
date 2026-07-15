'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  SQL_LAB_SEED,
  SQL_MAX_RESULT_ROWS,
  SQL_RUN_TIMEOUT_MS,
  type SqlDisplayResult,
  type SqlWorkerResponse,
  toSqlDisplayResults,
  validateSqlSource,
} from '@/core/learning/sqlRuntime';
import styles from './LearningStudio.module.css';

interface SqlRunPanelProps {
  source: string;
}

interface SqlRunState {
  message: string;
  results: SqlDisplayResult[];
  statementsExecuted?: number;
  rowsModified?: number;
  tone: 'idle' | 'running' | 'success' | 'error';
}

const INITIAL_STATE: SqlRunState = {
  message: 'Run the file to query a fresh support-operations database.',
  results: [],
  tone: 'idle',
};

export function SqlRunPanel({ source }: SqlRunPanelProps) {
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const requestIdRef = useRef(0);
  const [runState, setRunState] = useState<SqlRunState>(INITIAL_STATE);
  const isRunning = runState.tone === 'running';

  const stopWorker = useCallback(() => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    workerRef.current?.terminate();
    workerRef.current = null;
  }, []);

  useEffect(() => () => stopWorker(), [stopWorker]);

  function runSql() {
    if (isRunning) return;
    const validationError = validateSqlSource(source);
    if (validationError) {
      setRunState({ message: validationError, results: [], tone: 'error' });
      return;
    }

    stopWorker();
    const worker = new Worker('/sql-worker.js');
    const id = ++requestIdRef.current;
    workerRef.current = worker;
    setRunState({ message: 'Running in isolated SQLite…', results: [], tone: 'running' });

    timeoutRef.current = window.setTimeout(() => {
      stopWorker();
      setRunState({
        message: 'Run stopped after 3 seconds. Bound the query or check recursive logic.',
        results: [],
        tone: 'error',
      });
    }, SQL_RUN_TIMEOUT_MS);

    worker.onmessage = (event: MessageEvent<SqlWorkerResponse>) => {
      if (event.data.id !== id) return;
      stopWorker();

      if (!event.data.ok) {
        setRunState({
          message: `SQLite error: ${event.data.error || 'The statement could not run.'}`,
          results: [],
          tone: 'error',
        });
        return;
      }

      const results = toSqlDisplayResults(event.data.results);
      setRunState({
        message: results.length
          ? `${results.length} result set${results.length === 1 ? '' : 's'} returned.`
          : 'Statements completed without a result set.',
        results,
        statementsExecuted: event.data.statementsExecuted,
        rowsModified: event.data.rowsModified,
        tone: 'success',
      });
    };

    worker.onerror = (event) => {
      stopWorker();
      setRunState({
        message: `SQLite runtime error: ${event.message || 'The browser worker could not load.'}`,
        results: [],
        tone: 'error',
      });
    };

    worker.postMessage({ id, source, seed: SQL_LAB_SEED, maxRows: SQL_MAX_RESULT_ROWS });
  }

  return (
    <section className={styles.runtimePanel} aria-labelledby="sql-output-title">
      <div className={styles.previewBar}>
        <span id="sql-output-title">
          <b aria-hidden="true">SQL</b> Query results
        </span>
        <button type="button" onClick={runSql} disabled={isRunning}>
          {isRunning ? 'Running…' : 'Run SQL'}
        </button>
      </div>
      <div
        className={styles.sqlOutput}
        aria-live="polite"
        aria-busy={isRunning}
        data-tone={runState.tone}
      >
        <p className={styles.sqlStatus}>{runState.message}</p>
        {runState.results.map((result, resultIndex) => (
          <div className={styles.sqlTableScroll} key={result.id}>
            <table className={styles.sqlTable}>
              <caption>
                Result set {resultIndex + 1}
                {result.truncated ? ` · first ${SQL_MAX_RESULT_ROWS} rows shown` : ''}
              </caption>
              <thead>
                <tr>
                  {result.columns.map((column) => (
                    <th scope="col" key={column.id}>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row) => (
                  <tr key={row.id}>
                    {row.cells.map((cell) => (
                      <td key={cell.id}>{cell.value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        {runState.statementsExecuted !== undefined && (
          <p className={styles.sqlSummary}>
            {runState.statementsExecuted} statement
            {runState.statementsExecuted === 1 ? '' : 's'} executed · {runState.rowsModified ?? 0}{' '}
            rows changed by the last data-changing statement
          </p>
        )}
      </div>
      <p className={styles.runtimeNote}>
        Fresh in-memory SQLite runs in a disposable browser worker. Results stop at 100 rows; long
        runs stop automatically.
      </p>
    </section>
  );
}
