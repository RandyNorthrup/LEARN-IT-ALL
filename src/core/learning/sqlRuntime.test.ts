import { describe, expect, it } from 'vitest';
import {
  formatSqlValue,
  SQL_LAB_SEED,
  SQL_MAX_RESULT_ROWS,
  SQL_MAX_SOURCE_CHARACTERS,
  toSqlDisplayResults,
  validateSqlSource,
} from './sqlRuntime';

describe('SQL learning runtime', () => {
  it('ships a relational seed with keys, constraints, nulls, and joinable data', () => {
    expect(SQL_LAB_SEED).toContain('PRAGMA foreign_keys = ON');
    expect(SQL_LAB_SEED).toContain('REFERENCES teams(team_id)');
    expect(SQL_LAB_SEED).toContain('CHECK (severity IN');
    expect(SQL_LAB_SEED).toContain('(104, 2, NULL');
    expect(SQL_LAB_SEED).toContain('INSERT INTO ticket_events');
  });

  it('rejects missing, oversized, and null-byte source before worker execution', () => {
    expect(validateSqlSource('   ')).toContain('Write a SQL statement');
    expect(validateSqlSource('x'.repeat(SQL_MAX_SOURCE_CHARACTERS + 1))).toContain('under');
    expect(validateSqlSource('SELECT\0 1')).toContain('null bytes');
    expect(validateSqlSource('SELECT name FROM teams;')).toBeNull();
  });

  it('formats SQL nulls and blobs without HTML rendering', () => {
    expect(formatSqlValue(null)).toBe('NULL');
    expect(formatSqlValue(new Uint8Array([1, 2, 3]))).toBe('[BLOB · 3 bytes]');
    expect(formatSqlValue(42)).toBe('42');
  });

  it('caps rendered rows and preserves worker truncation evidence', () => {
    const rows = Array.from({ length: SQL_MAX_RESULT_ROWS + 2 }, (_, index) => [index]);
    const [result] = toSqlDisplayResults([{ columns: ['value'], values: rows, truncated: false }]);

    expect(result.rows).toHaveLength(SQL_MAX_RESULT_ROWS);
    expect(result.rows[0].cells[0].value).toBe('0');
    expect(result.columns[0].label).toBe('value');
    expect(result.truncated).toBe(true);
  });
});
