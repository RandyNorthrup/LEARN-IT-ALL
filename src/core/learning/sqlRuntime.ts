export const SQL_RUN_TIMEOUT_MS = 3_000;
export const SQL_MAX_SOURCE_CHARACTERS = 50_000;
export const SQL_MAX_RESULT_ROWS = 100;

export const SQL_LAB_SEED = `
PRAGMA foreign_keys = ON;
PRAGMA recursive_triggers = OFF;
PRAGMA hard_heap_limit = 67108864;

CREATE TABLE teams (
  team_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL CHECK (region IN ('north', 'south', 'east', 'west'))
);

CREATE TABLE members (
  member_id INTEGER PRIMARY KEY,
  team_id INTEGER REFERENCES teams(team_id),
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('engineer', 'analyst', 'manager')),
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1))
);

CREATE TABLE tickets (
  ticket_id INTEGER PRIMARY KEY,
  team_id INTEGER NOT NULL REFERENCES teams(team_id),
  owner_id INTEGER REFERENCES members(member_id),
  title TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL CHECK (status IN ('open', 'investigating', 'resolved')),
  opened_at TEXT NOT NULL,
  resolved_at TEXT
);

CREATE TABLE ticket_events (
  event_id INTEGER PRIMARY KEY,
  ticket_id INTEGER NOT NULL REFERENCES tickets(ticket_id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  minutes_spent INTEGER NOT NULL CHECK (minutes_spent >= 0)
);

INSERT INTO teams (team_id, name, region) VALUES
  (1, 'Aurora', 'north'),
  (2, 'Beacon', 'east'),
  (3, 'Cedar', 'west'),
  (4, 'Drift', 'south');

INSERT INTO members (member_id, team_id, name, role, active) VALUES
  (1, 1, 'Amina', 'engineer', 1),
  (2, 1, 'Bo', 'analyst', 1),
  (3, 2, 'Cleo', 'manager', 1),
  (4, 2, 'Diego', 'engineer', 0),
  (5, 3, 'Emi', 'analyst', 1),
  (6, NULL, 'Farah', 'engineer', 1);

INSERT INTO tickets
  (ticket_id, team_id, owner_id, title, severity, status, opened_at, resolved_at)
VALUES
  (101, 1, 1, 'Login loop', 'critical', 'investigating', '2026-07-01T08:30:00Z', NULL),
  (102, 1, 2, 'Slow dashboard', 'medium', 'resolved', '2026-07-01T09:00:00Z', '2026-07-01T13:10:00Z'),
  (103, 2, 3, 'Missing export', 'high', 'open', '2026-07-02T10:15:00Z', NULL),
  (104, 2, NULL, 'Color contrast', 'low', 'open', '2026-07-03T11:20:00Z', NULL),
  (105, 3, 5, 'Duplicate invoice', 'high', 'resolved', '2026-07-03T14:40:00Z', '2026-07-04T09:05:00Z'),
  (106, 1, 1, 'Session timeout', 'high', 'resolved', '2026-07-05T16:05:00Z', '2026-07-05T17:45:00Z');

INSERT INTO ticket_events
  (event_id, ticket_id, event_type, occurred_at, minutes_spent)
VALUES
  (1001, 101, 'triaged', '2026-07-01T08:40:00Z', 15),
  (1002, 101, 'reproduced', '2026-07-01T09:10:00Z', 35),
  (1003, 102, 'triaged', '2026-07-01T09:20:00Z', 10),
  (1004, 102, 'fixed', '2026-07-01T12:55:00Z', 70),
  (1005, 103, 'triaged', '2026-07-02T10:35:00Z', 20),
  (1006, 105, 'reproduced', '2026-07-03T15:10:00Z', 45),
  (1007, 105, 'fixed', '2026-07-04T08:50:00Z', 80),
  (1008, 106, 'triaged', '2026-07-05T16:15:00Z', 10),
  (1009, 106, 'fixed', '2026-07-05T17:30:00Z', 50);
`;

export type SqlRawValue = string | number | null | Uint8Array;

export interface SqlWorkerQueryResult {
  columns: string[];
  values: SqlRawValue[][];
  truncated: boolean;
}

export interface SqlWorkerSuccess {
  id: number;
  ok: true;
  results: SqlWorkerQueryResult[];
  statementsExecuted: number;
  rowsModified: number;
}

export interface SqlWorkerFailure {
  id: number;
  ok: false;
  error: string;
}

export type SqlWorkerResponse = SqlWorkerSuccess | SqlWorkerFailure;

export interface SqlDisplayResult {
  id: string;
  columns: Array<{ id: string; label: string }>;
  rows: Array<{ id: string; cells: Array<{ id: string; value: string }> }>;
  truncated: boolean;
}

export function validateSqlSource(source: string): string | null {
  if (!source.trim()) return 'Write a SQL statement before running the lab.';
  if (source.length > SQL_MAX_SOURCE_CHARACTERS) {
    return `SQL source must stay under ${SQL_MAX_SOURCE_CHARACTERS.toLocaleString()} characters.`;
  }
  if (source.includes('\0')) return 'SQL source cannot contain null bytes.';
  return null;
}

export function formatSqlValue(value: SqlRawValue): string {
  if (value === null) return 'NULL';
  if (value instanceof Uint8Array) return `[BLOB · ${value.byteLength} bytes]`;
  return String(value);
}

export function toSqlDisplayResults(results: SqlWorkerQueryResult[]): SqlDisplayResult[] {
  return results.map((result, resultIndex) => ({
    id: `result-${resultIndex + 1}`,
    columns: result.columns.map((label, columnIndex) => ({
      id: `result-${resultIndex + 1}-column-${columnIndex + 1}`,
      label,
    })),
    rows: result.values.slice(0, SQL_MAX_RESULT_ROWS).map((row, rowIndex) => ({
      id: `result-${resultIndex + 1}-row-${rowIndex + 1}`,
      cells: row.map((value, columnIndex) => ({
        id: `result-${resultIndex + 1}-row-${rowIndex + 1}-cell-${columnIndex + 1}`,
        value: formatSqlValue(value),
      })),
    })),
    truncated: result.truncated || result.values.length > SQL_MAX_RESULT_ROWS,
  }));
}
