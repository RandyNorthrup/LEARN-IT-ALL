import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import Database from 'better-sqlite3';
import { PUBLISHED_COURSE_IDS } from './data/publishedCourses';

// Lazy initialization - only create DB connection when needed
let db: Database.Database | null = null;

export function migrateCurrentLearningSchema(database: Database.Database): void {
  const progressColumns = database.pragma("table_info('learning_step_progress')") as Array<{
    name: string;
  }>;
  const hasEarnedXp = progressColumns.some((column) => column.name === 'earnedXp');

  database.transaction(() => {
    if (hasEarnedXp) {
      database.exec(`
CREATE TABLE learning_step_progress_current (
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

INSERT INTO learning_step_progress_current
  (courseId, moduleId, activityId, stepId, status, attempts, hintsUsed, draftJson, completedAt, updatedAt)
SELECT courseId, moduleId, activityId, stepId, status, attempts, hintsUsed, draftJson, completedAt, updatedAt
FROM learning_step_progress;

DROP TABLE learning_step_progress;
ALTER TABLE learning_step_progress_current RENAME TO learning_step_progress;
`);
    }

    database.exec('DROP TABLE IF EXISTS learning_profile;');
  })();
}

export function archiveUnpublishedLearningProgress(
  database: Database.Database,
  publishedCourseIds: readonly string[]
): number {
  const placeholders = publishedCourseIds.map(() => '?').join(', ');
  const unpublishedWhere = publishedCourseIds.length
    ? `WHERE courseId NOT IN (${placeholders})`
    : '';
  const records = database
    .prepare(
      `SELECT courseId, moduleId, activityId, stepId, status, attempts, hintsUsed,
              draftJson, completedAt, updatedAt
       FROM learning_step_progress
       ${unpublishedWhere}
       ORDER BY courseId, activityId, stepId`
    )
    .all(...publishedCourseIds) as Array<{
    courseId: string;
    moduleId: string;
    activityId: string;
    stepId: string;
    status: string;
    attempts: number;
    hintsUsed: number;
    draftJson: string | null;
    completedAt: string | null;
    updatedAt: string | null;
  }>;

  if (records.length === 0) return 0;

  return database.transaction(() => {
    const archive = database.prepare(
      `INSERT OR IGNORE INTO historical_learning_records
        (sourceCollection, sourceId, courseId, recordType, itemId, outcome, occurredAt, payloadJson)
       VALUES ('retired-v2-step-progress', ?, ?, 'step', ?, ?, ?, ?)`
    );
    const retiredActivityIds = new Set<string>();

    for (const record of records) {
      retiredActivityIds.add(record.activityId);
      archive.run(
        `${record.courseId}:${record.activityId}:${record.stepId}`,
        record.courseId,
        record.stepId,
        record.status,
        record.completedAt ?? record.updatedAt,
        JSON.stringify({
          moduleId: record.moduleId,
          activityId: record.activityId,
          attempts: record.attempts,
          hintsUsed: record.hintsUsed,
          draftJson: record.draftJson,
        })
      );
    }

    const clearReviews = database.prepare('DELETE FROM learning_review_queue WHERE activityId = ?');
    for (const activityId of retiredActivityIds) clearReviews.run(activityId);

    const clearProgress = database.prepare(
      'DELETE FROM learning_step_progress WHERE courseId = ? AND activityId = ? AND stepId = ?'
    );
    for (const record of records) {
      clearProgress.run(record.courseId, record.activityId, record.stepId);
    }

    return records.length;
  })();
}

function getDb(): Database.Database {
  if (!db) {
    // Create singleton database connection
    const dbPath = join(process.cwd(), 'database', 'learn-it-all.db');
    // Ensure the database directory exists
    mkdirSync(dirname(dbPath), { recursive: true });
    db = new Database(dbPath);

    // Enable foreign keys and set pragmas
    db.pragma('foreign_keys = ON');
    db.pragma('journal_mode = WAL');

    // Initialize database schema
    const initSchema = `
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'settings',
  displayName TEXT NOT NULL DEFAULT 'Learner',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS historical_learning_records (
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

CREATE TABLE IF NOT EXISTS learning_step_progress (
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

CREATE TABLE IF NOT EXISTS learning_review_queue (
  activityId TEXT NOT NULL,
  stepId TEXT NOT NULL,
  intervalDays INTEGER NOT NULL,
  dueAt DATETIME NOT NULL,
  completedAt DATETIME,
  PRIMARY KEY (activityId, stepId, intervalDays)
);

-- Insert default settings if not exists
INSERT OR IGNORE INTO settings (id, displayName) VALUES ('settings', 'Learner');
`;

    // Run initialization
    db.exec(initSchema);
    migrateCurrentLearningSchema(db);
    archiveUnpublishedLearningProgress(db, PUBLISHED_COURSE_IDS);
  }

  return db;
}

// Query helpers
export const dbHelpers = {
  // Settings
  getSettings: () => {
    return getDb().prepare('SELECT * FROM settings WHERE id = ?').get('settings');
  },

  updateSettings: (displayName: string) => {
    return getDb()
      .prepare('UPDATE settings SET displayName = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?')
      .run(displayName, 'settings');
  },

  // Current learning engine
  getLearningStepProgress: (activityId: string) => {
    return getDb()
      .prepare(
        `SELECT stepId, status, attempts, hintsUsed, draftJson
         FROM learning_step_progress
         WHERE activityId = ?
         ORDER BY updatedAt ASC`
      )
      .all(activityId);
  },

  saveLearningDraft: (
    courseId: string,
    moduleId: string,
    activityId: string,
    stepId: string,
    draft: Record<string, unknown>
  ) => {
    return getDb()
      .prepare(
        `INSERT INTO learning_step_progress
          (courseId, moduleId, activityId, stepId, draftJson, updatedAt)
         VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(activityId, stepId) DO UPDATE SET
          draftJson = excluded.draftJson,
          updatedAt = CURRENT_TIMESTAMP`
      )
      .run(courseId, moduleId, activityId, stepId, JSON.stringify(draft));
  },

  revealLearningHint: (courseId: string, moduleId: string, activityId: string, stepId: string) => {
    getDb()
      .prepare(
        `INSERT INTO learning_step_progress
          (courseId, moduleId, activityId, stepId, hintsUsed, updatedAt)
         VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
         ON CONFLICT(activityId, stepId) DO UPDATE SET
          hintsUsed = MIN(3, learning_step_progress.hintsUsed + 1),
          updatedAt = CURRENT_TIMESTAMP`
      )
      .run(courseId, moduleId, activityId, stepId);
    return getDb()
      .prepare(
        `SELECT stepId, status, attempts, hintsUsed, draftJson
         FROM learning_step_progress WHERE activityId = ? AND stepId = ?`
      )
      .get(activityId, stepId) as {
      stepId: string;
      status: string;
      attempts: number;
      hintsUsed: number;
      draftJson: string | null;
    };
  },

  recordLearningAttempt: (
    courseId: string,
    moduleId: string,
    activityId: string,
    stepId: string,
    passed: boolean,
    reviewDays: number[],
    draft: Record<string, unknown>
  ) => {
    const database = getDb();
    return database.transaction(() => {
      const existing = database
        .prepare('SELECT status FROM learning_step_progress WHERE activityId = ? AND stepId = ?')
        .get(activityId, stepId) as { status: string } | undefined;
      const newlyCompleted = passed && existing?.status !== 'COMPLETED';

      database
        .prepare(
          `INSERT INTO learning_step_progress
            (courseId, moduleId, activityId, stepId, status, attempts, draftJson, completedAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, 1, ?, CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE NULL END, CURRENT_TIMESTAMP)
           ON CONFLICT(activityId, stepId) DO UPDATE SET
            status = CASE WHEN excluded.status = 'COMPLETED' THEN 'COMPLETED' ELSE learning_step_progress.status END,
            attempts = learning_step_progress.attempts + 1,
            draftJson = excluded.draftJson,
            completedAt = CASE WHEN excluded.status = 'COMPLETED' THEN COALESCE(learning_step_progress.completedAt, CURRENT_TIMESTAMP) ELSE learning_step_progress.completedAt END,
            updatedAt = CURRENT_TIMESTAMP`
        )
        .run(
          courseId,
          moduleId,
          activityId,
          stepId,
          passed ? 'COMPLETED' : 'IN_PROGRESS',
          JSON.stringify(draft),
          passed ? 1 : 0
        );

      if (newlyCompleted) {
        const queueReview = database.prepare(
          `INSERT OR IGNORE INTO learning_review_queue
            (activityId, stepId, intervalDays, dueAt)
           VALUES (?, ?, ?, datetime('now', '+' || ? || ' days'))`
        );
        reviewDays.forEach((days) => {
          queueReview.run(activityId, stepId, days, days);
        });
      }

      return { newlyCompleted };
    })();
  },

  getDueLearningReviews: () => {
    return getDb()
      .prepare(
        `SELECT activityId, stepId, intervalDays, dueAt
         FROM learning_review_queue
         WHERE completedAt IS NULL AND dueAt <= CURRENT_TIMESTAMP
         ORDER BY dueAt ASC`
      )
      .all();
  },

  getHistoricalCourseProgressSummary: (courseId: string) => {
    const completedLessons = getDb()
      .prepare(
        `SELECT COUNT(DISTINCT itemId) AS count
         FROM historical_learning_records
         WHERE courseId = ? AND recordType = 'lesson' AND outcome = 'COMPLETED'`
      )
      .get(courseId) as { count: number };
    const passedExercises = getDb()
      .prepare(
        `SELECT COUNT(DISTINCT itemId) AS count
         FROM historical_learning_records
         WHERE courseId = ? AND recordType = 'exercise' AND outcome = 'PASSED'`
      )
      .get(courseId) as { count: number };
    const passedQuizzes = getDb()
      .prepare(
        `SELECT COUNT(DISTINCT itemId) AS count
         FROM historical_learning_records
         WHERE courseId = ? AND recordType = 'quiz' AND outcome = 'PASSED'`
      )
      .get(courseId) as { count: number };

    return {
      completedLessons: completedLessons.count,
      passedExercises: passedExercises.count,
      passedQuizzes: passedQuizzes.count,
    };
  },

  clearLearningActivityProgress: (activityId: string) => {
    const database = getDb();
    return database.transaction(() => {
      database.prepare('DELETE FROM learning_review_queue WHERE activityId = ?').run(activityId);
      database.prepare('DELETE FROM learning_step_progress WHERE activityId = ?').run(activityId);
    })();
  },

  // Progress Stats
  getProgressStats: () => {
    const coursesStarted = getDb()
      .prepare('SELECT COUNT(DISTINCT courseId) AS count FROM learning_step_progress')
      .get() as { count: number };
    const activitiesPracticed = getDb()
      .prepare(
        'SELECT COUNT(DISTINCT activityId) AS count FROM learning_step_progress WHERE attempts > 0'
      )
      .get() as { count: number };
    const interactionsCompleted = getDb()
      .prepare("SELECT COUNT(*) AS count FROM learning_step_progress WHERE status = 'COMPLETED'")
      .get() as { count: number };
    const totalAttempts = getDb()
      .prepare('SELECT COALESCE(SUM(attempts), 0) AS count FROM learning_step_progress')
      .get() as { count: number };
    const reviewsDue = getDb()
      .prepare(
        'SELECT COUNT(*) AS count FROM learning_review_queue WHERE completedAt IS NULL AND dueAt <= CURRENT_TIMESTAMP'
      )
      .get() as { count: number };
    const historicalRecords = getDb()
      .prepare('SELECT COUNT(*) AS count FROM historical_learning_records')
      .get() as { count: number };

    return {
      coursesStarted: coursesStarted.count,
      activitiesPracticed: activitiesPracticed.count,
      interactionsCompleted: interactionsCompleted.count,
      totalAttempts: totalAttempts.count,
      reviewsDue: reviewsDue.count,
      historicalRecords: historicalRecords.count,
    };
  },

  // Progress Clearing
  clearAllProgress: () => {
    getDb().prepare('DELETE FROM historical_learning_records').run();
    getDb().prepare('DELETE FROM learning_step_progress').run();
    getDb().prepare('DELETE FROM learning_review_queue').run();
  },

  clearCourseProgress: (courseId: string) => {
    getDb().prepare('DELETE FROM historical_learning_records WHERE courseId = ?').run(courseId);
    const activities = getDb()
      .prepare('SELECT DISTINCT activityId FROM learning_step_progress WHERE courseId = ?')
      .all(courseId) as Array<{ activityId: string }>;
    const clearReviews = getDb().prepare('DELETE FROM learning_review_queue WHERE activityId = ?');
    activities.forEach(({ activityId }) => {
      clearReviews.run(activityId);
    });
    getDb().prepare('DELETE FROM learning_step_progress WHERE courseId = ?').run(courseId);
  },
};

// Graceful shutdown
process.on('exit', () => {
  if (db) db.close();
});
process.on('SIGINT', () => {
  if (db) db.close();
  process.exit(0);
});
