import initSqlJs from 'sql.js';
import { describe, expect, it } from 'vitest';
import { SQL_LAB_SEED } from '../learning/sqlRuntime';
import { loadCurriculumGraph } from './repository';

describe('SQL curriculum executable examples', () => {
  it('runs every learner-facing SQL code block against a fresh seeded database', async () => {
    const SQL = await initSqlJs();
    const graph = loadCurriculumGraph('sql-basics');
    const examples = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.content.flatMap((block) =>
          block.type === 'code' ? [{ activityId: activity.id, stepId: step.id, block }] : []
        )
      )
    );
    const failures: string[] = [];

    for (const example of examples) {
      const database = new SQL.Database();
      try {
        database.exec(SQL_LAB_SEED);
        database.exec(example.block.code);
      } catch (error) {
        failures.push(
          `${example.activityId}/${example.stepId}: ${error instanceof Error ? error.message : String(error)}`
        );
      } finally {
        database.close();
      }
    }

    expect(examples.length).toBeGreaterThan(150);
    expect(failures).toEqual([]);
  });
});
