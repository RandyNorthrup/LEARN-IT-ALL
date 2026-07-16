import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function filesUnder(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(fullPath) : [path.relative(root, fullPath)];
  });
}

describe('current platform surface', () => {
  it('exposes one course catalog and one learner route hierarchy', () => {
    const appFiles = filesUnder(path.join(root, 'src', 'app'));

    expect(appFiles).toContain('src/app/courses/page.tsx');
    expect(appFiles).toContain('src/app/learn/[courseId]/page.tsx');
    expect(appFiles).toContain('src/app/learn/[courseId]/[moduleId]/[activityId]/page.tsx');
    for (const removedPrefix of [
      'src/app/api/courses/',
      'src/app/challenges/',
      'src/app/courses/[courseId]/',
      'src/app/dashboard/',
      'src/app/games/',
    ]) {
      expect(
        appFiles.some((file) => file.startsWith(removedPrefix)),
        removedPrefix
      ).toBe(false);
    }
  });

  it('keeps no curriculum generators and only explicit research/runtime compilers', () => {
    const scriptFiles = readdirSync(path.join(root, 'scripts'), { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .sort();

    expect(scriptFiles).toEqual([
      'audit-research-program.ts',
      'audit-v2-duplication.ts',
      'audit-v2-learning-quality.ts',
      'compile-curriculum-runtime-index.mjs',
      'compile-rwd-concept-alignment.mjs',
      'compile-rwd-css-concept-research.mjs',
      'compile-rwd-html-concept-research.mjs',
      'compile-rwd-research-architecture.mjs',
      'import-fcc-rwd-reference.mjs',
      'run-lighthouse-after-content.mjs',
      'sync-go-runtime.mjs',
      'sync-python-runtime.mjs',
      'sync-sql-runtime.mjs',
    ]);

    const generationScripts = readdirSync(path.join(root, 'scripts'))
      .filter((file) => file.startsWith('generate-'))
      .sort();

    expect(generationScripts).toEqual([]);
    expect(
      readdirSync(path.join(root, 'scripts'))
        .filter((file) => file.startsWith('compile-'))
        .sort()
    ).toEqual([
      'compile-curriculum-runtime-index.mjs',
      'compile-rwd-concept-alignment.mjs',
      'compile-rwd-css-concept-research.mjs',
      'compile-rwd-html-concept-research.mjs',
      'compile-rwd-research-architecture.mjs',
    ]);

    const packageJson = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>;
    };
    expect(
      Object.keys(packageJson.scripts).some((key) => key.startsWith('curriculum:content:'))
    ).toBe(false);
    expect(
      Object.keys(packageJson.scripts).some((key) => key.startsWith('curriculum:blueprint:'))
    ).toBe(false);
  });

  it('denies generated curriculum at every learner publication boundary', () => {
    const publication = readFileSync(
      path.join(root, 'src', 'lib', 'data', 'publishedCourses.ts'),
      'utf8'
    );
    expect(publication).toContain('PUBLISHED_COURSES = []');

    for (const relativePath of [
      'src/app/learn/[courseId]/page.tsx',
      'src/app/learn/[courseId]/[moduleId]/[activityId]/page.tsx',
      'src/app/api/v2/courses/[courseId]/activities/[activityId]/attempt/route.ts',
      'src/app/api/v2/courses/[courseId]/activities/[activityId]/draft/route.ts',
      'src/app/api/v2/courses/[courseId]/activities/[activityId]/hint/route.ts',
    ]) {
      const source = readFileSync(path.join(root, relativePath), 'utf8');
      expect(source, relativePath).toContain('isPublishedCourse(courseId)');
    }

    const catalog = readFileSync(path.join(root, 'src', 'app', 'courses', 'page.tsx'), 'utf8');
    const settings = readFileSync(path.join(root, 'src', 'app', 'settings', 'page.tsx'), 'utf8');
    const tracksApi = readFileSync(
      path.join(root, 'src', 'app', 'api', 'tracks', 'route.ts'),
      'utf8'
    );
    expect(catalog).toContain('PUBLISHED_COURSES');
    expect(settings).toContain('PUBLISHED_COURSES');
    expect(tracksApi).toContain('PUBLISHED_LEARNING_TRACKS');
    expect(
      readFileSync(path.join(root, 'src', 'app', 'api', 'progress', 'clear', 'route.ts'), 'utf8')
    ).toContain('isPublishedCourse(parsed.data.courseId)');
    expect(filesUnder(path.join(root, 'blueprints'))).toEqual([]);
    expect(
      filesUnder(path.join(root, 'content', 'v2', 'courses')).filter((file) =>
        file.endsWith('.json')
      )
    ).toEqual([]);
  });

  it('keeps historical learner evidence without earlier runtime tables', () => {
    const databaseSource = readFileSync(path.join(root, 'src', 'lib', 'db.ts'), 'utf8');
    expect(databaseSource).toContain('CREATE TABLE IF NOT EXISTS historical_learning_records');
    for (const removedTable of [
      'course_enrollments',
      'lesson_progress',
      'exercise_submissions',
      'quiz_attempts',
      'test_results',
      'certificates',
    ]) {
      expect(databaseSource, removedTable).not.toContain(removedTable);
    }
  });

  it('keeps parallel practice, arbitrary points, and streaks out of primary learner navigation', () => {
    const home = readFileSync(path.join(root, 'src', 'app', 'page.tsx'), 'utf8');
    const progress = readFileSync(path.join(root, 'src', 'app', 'progress', 'page.tsx'), 'utf8');
    const studio = readFileSync(
      path.join(root, 'src', 'components', 'learning', 'LearningStudio.tsx'),
      'utf8'
    );
    const learnerSurface = `${home}\n${progress}\n${studio}`;

    expect(learnerSurface).not.toMatch(/href="\/(?:challenges|games|dashboard)"/u);
    expect(learnerSurface).not.toContain(' XP');
    expect(learnerSurface).not.toMatch(/\bstreak\b/iu);
  });

  it('keeps retired game assets out of the current public surface', () => {
    for (const retiredAsset of ['landingpad.png', 'rocket.png', 'terrain.png']) {
      expect(existsSync(path.join(root, 'public', retiredAsset)), retiredAsset).toBe(false);
    }
  });
});
