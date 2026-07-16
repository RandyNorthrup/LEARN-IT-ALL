import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function filesUnder(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? filesUnder(fullPath)
      : [path.relative(root, fullPath)];
  });
}

describe("current platform surface", () => {
  it("exposes one course catalog and one learner route hierarchy", () => {
    const appFiles = filesUnder(path.join(root, "src", "app"));

    expect(appFiles).toContain("src/app/courses/page.tsx");
    expect(appFiles).toContain("src/app/learn/[courseId]/page.tsx");
    expect(appFiles).toContain(
      "src/app/learn/[courseId]/[moduleId]/[activityId]/page.tsx",
    );
    for (const removedPrefix of [
      "src/app/api/courses/",
      "src/app/challenges/",
      "src/app/courses/[courseId]/",
      "src/app/dashboard/",
      "src/app/games/",
    ]) {
      expect(
        appFiles.some((file) => file.startsWith(removedPrefix)),
        removedPrefix,
      ).toBe(false);
    }
  });

  it("keeps only reproducible research and mechanical-index generators", () => {
    const generationScripts = readdirSync(path.join(root, "scripts"))
      .filter((file) => file.startsWith("generate-"))
      .sort();

    expect(generationScripts).toEqual([
      "generate-curriculum-outlines.mjs",
      "generate-curriculum-runtime-index.mjs",
      "generate-rwd-concept-alignment.mjs",
      "generate-rwd-css-concept-research.mjs",
      "generate-rwd-html-concept-research.mjs",
      "generate-rwd-research-architecture.mjs",
    ]);

    const packageJson = JSON.parse(
      readFileSync(path.join(root, "package.json"), "utf8"),
    ) as {
      scripts: Record<string, string>;
    };
    expect(
      Object.keys(packageJson.scripts).some((key) =>
        key.startsWith("curriculum:content:"),
      ),
    ).toBe(false);
    expect(
      Object.keys(packageJson.scripts).some((key) =>
        key.startsWith("curriculum:blueprint:"),
      ),
    ).toBe(false);
  });

  it("denies generated curriculum at every learner publication boundary", () => {
    const publication = readFileSync(
      path.join(root, "src", "lib", "data", "publishedCourses.ts"),
      "utf8",
    );
    expect(publication).toContain("PUBLISHED_COURSE_IDS = []");

    for (const relativePath of [
      "src/app/learn/[courseId]/page.tsx",
      "src/app/learn/[courseId]/[moduleId]/[activityId]/page.tsx",
      "src/app/api/v2/courses/[courseId]/activities/[activityId]/attempt/route.ts",
      "src/app/api/v2/courses/[courseId]/activities/[activityId]/draft/route.ts",
      "src/app/api/v2/courses/[courseId]/activities/[activityId]/hint/route.ts",
    ]) {
      const source = readFileSync(path.join(root, relativePath), "utf8");
      expect(source, relativePath).toContain("isPublishedCourse(courseId)");
    }

    const catalog = readFileSync(
      path.join(root, "src", "app", "courses", "page.tsx"),
      "utf8",
    );
    const settings = readFileSync(
      path.join(root, "src", "app", "settings", "page.tsx"),
      "utf8",
    );
    const tracksApi = readFileSync(
      path.join(root, "src", "app", "api", "tracks", "route.ts"),
      "utf8",
    );
    expect(catalog).toContain("PUBLISHED_COURSES");
    expect(settings).toContain("PUBLISHED_COURSES");
    expect(tracksApi).toContain("PUBLISHED_LEARNING_TRACKS");
  });

  it("keeps historical learner evidence without earlier runtime tables", () => {
    const databaseSource = readFileSync(
      path.join(root, "src", "lib", "db.ts"),
      "utf8",
    );
    expect(databaseSource).toContain(
      "CREATE TABLE IF NOT EXISTS historical_learning_records",
    );
    for (const removedTable of [
      "course_enrollments",
      "lesson_progress",
      "exercise_submissions",
      "quiz_attempts",
      "test_results",
      "certificates",
    ]) {
      expect(databaseSource, removedTable).not.toContain(removedTable);
    }
  });

  it("keeps parallel practice, arbitrary points, and streaks out of primary learner navigation", () => {
    const home = readFileSync(
      path.join(root, "src", "app", "page.tsx"),
      "utf8",
    );
    const progress = readFileSync(
      path.join(root, "src", "app", "progress", "page.tsx"),
      "utf8",
    );
    const studio = readFileSync(
      path.join(root, "src", "components", "learning", "LearningStudio.tsx"),
      "utf8",
    );
    const learnerSurface = `${home}\n${progress}\n${studio}`;

    expect(learnerSurface).not.toMatch(
      /href="\/(?:challenges|games|dashboard)"/u,
    );
    expect(learnerSurface).not.toContain(" XP");
    expect(learnerSurface).not.toMatch(/\bstreak\b/iu);
  });
});
