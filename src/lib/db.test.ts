import Database from 'better-sqlite3';
import { describe, expect, it } from 'vitest';
import { archiveUnpublishedLearningProgress, migrateCurrentLearningSchema } from './db';

describe('current learning database migration', () => {
  it('preserves real progress while removing point and streak storage', () => {
    const database = new Database(':memory:');
    database.exec(`
CREATE TABLE learning_step_progress (
  courseId TEXT NOT NULL,
  moduleId TEXT NOT NULL,
  activityId TEXT NOT NULL,
  stepId TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'IN_PROGRESS',
  attempts INTEGER NOT NULL DEFAULT 0,
  hintsUsed INTEGER NOT NULL DEFAULT 0,
  earnedXp INTEGER NOT NULL DEFAULT 0,
  draftJson TEXT,
  completedAt DATETIME,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (activityId, stepId)
);
CREATE TABLE learning_profile (
  id TEXT PRIMARY KEY,
  totalXp INTEGER NOT NULL,
  currentStreak INTEGER NOT NULL,
  longestStreak INTEGER NOT NULL,
  lastActiveDate TEXT,
  updatedAt DATETIME
);
INSERT INTO learning_step_progress
  (courseId, moduleId, activityId, stepId, status, attempts, hintsUsed, earnedXp, draftJson, completedAt)
VALUES
  ('responsive-web-design', 'html-first-content', 'first-workshop', 'first-step', 'COMPLETED', 3, 1, 40, '{"files":{"html":"<h1>Saved</h1>"}}', '2026-07-16 08:00:00');
INSERT INTO learning_profile
  (id, totalXp, currentStreak, longestStreak, lastActiveDate, updatedAt)
VALUES ('learner', 40, 8, 12, '2026-07-16', '2026-07-16 08:00:00');
`);

    migrateCurrentLearningSchema(database);
    migrateCurrentLearningSchema(database);

    const columns = database.pragma("table_info('learning_step_progress')") as Array<{
      name: string;
    }>;
    expect(columns.map((column) => column.name)).toEqual([
      'courseId',
      'moduleId',
      'activityId',
      'stepId',
      'status',
      'attempts',
      'hintsUsed',
      'draftJson',
      'completedAt',
      'updatedAt',
    ]);
    expect(database.prepare('SELECT * FROM learning_step_progress').get()).toMatchObject({
      status: 'COMPLETED',
      attempts: 3,
      hintsUsed: 1,
      draftJson: '{"files":{"html":"<h1>Saved</h1>"}}',
      completedAt: '2026-07-16 08:00:00',
    });
    expect(
      database
        .prepare("SELECT COUNT(*) AS count FROM sqlite_schema WHERE type = 'table' AND name = ?")
        .get('learning_profile')
    ).toEqual({ count: 0 });

    database.close();
  });

  it('moves unavailable-course records out of active progress without losing evidence', () => {
    const database = new Database(':memory:');
    database.exec(`
CREATE TABLE historical_learning_records (
  sourceCollection TEXT NOT NULL,
  sourceId TEXT NOT NULL,
  courseId TEXT,
  recordType TEXT NOT NULL,
  itemId TEXT NOT NULL,
  outcome TEXT NOT NULL,
  occurredAt DATETIME,
  payloadJson TEXT NOT NULL CHECK (json_valid(payloadJson)),
  importedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (sourceCollection, sourceId)
);
CREATE TABLE learning_step_progress (
  courseId TEXT NOT NULL,
  moduleId TEXT NOT NULL,
  activityId TEXT NOT NULL,
  stepId TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'IN_PROGRESS',
  attempts INTEGER NOT NULL DEFAULT 0,
  hintsUsed INTEGER NOT NULL DEFAULT 0,
  draftJson TEXT,
  completedAt DATETIME,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (activityId, stepId)
);
CREATE TABLE learning_review_queue (
  activityId TEXT NOT NULL,
  stepId TEXT NOT NULL,
  intervalDays INTEGER NOT NULL,
  dueAt DATETIME NOT NULL,
  completedAt DATETIME,
  PRIMARY KEY (activityId, stepId, intervalDays)
);
INSERT INTO learning_step_progress
  (courseId, moduleId, activityId, stepId, status, attempts, hintsUsed, draftJson, completedAt)
VALUES
  ('kept-course', 'kept-module', 'kept-activity', 'kept-step', 'IN_PROGRESS', 2, 1, '{"textResponse":"Keep"}', NULL),
  ('retired-course', 'retired-module', 'retired-activity', 'retired-step', 'COMPLETED', 4, 2, '{"files":{"html":"<h1>Past work</h1>"}}', '2026-07-16 09:00:00');
INSERT INTO learning_review_queue (activityId, stepId, intervalDays, dueAt)
VALUES
  ('kept-activity', 'kept-step', 1, '2026-07-17 09:00:00'),
  ('retired-activity', 'retired-step', 1, '2026-07-17 09:00:00');
`);

    expect(archiveUnpublishedLearningProgress(database, ['kept-course'])).toBe(1);
    expect(archiveUnpublishedLearningProgress(database, ['kept-course'])).toBe(0);
    expect(database.prepare('SELECT courseId FROM learning_step_progress').all()).toEqual([
      { courseId: 'kept-course' },
    ]);
    expect(database.prepare('SELECT activityId FROM learning_review_queue').all()).toEqual([
      { activityId: 'kept-activity' },
    ]);
    const archived = database
      .prepare(
        `SELECT sourceCollection, courseId, recordType, itemId, outcome, occurredAt, payloadJson
         FROM historical_learning_records`
      )
      .get() as Record<string, unknown> & { payloadJson: string };
    expect(archived).toMatchObject({
      sourceCollection: 'retired-v2-step-progress',
      courseId: 'retired-course',
      recordType: 'step',
      itemId: 'retired-step',
      outcome: 'COMPLETED',
      occurredAt: '2026-07-16 09:00:00',
    });
    expect(JSON.parse(archived.payloadJson)).toEqual({
      moduleId: 'retired-module',
      activityId: 'retired-activity',
      attempts: 4,
      hintsUsed: 2,
      draftJson: '{"files":{"html":"<h1>Past work</h1>"}}',
    });

    database.close();
  });
});
