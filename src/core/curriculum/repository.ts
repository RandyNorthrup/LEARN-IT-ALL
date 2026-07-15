import { readFileSync } from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import {
  ActivityKindSchema,
  type CurriculumActivity,
  CurriculumActivitySchema,
  type CurriculumCourse,
  CurriculumCourseSchema,
  type CurriculumModule,
  CurriculumModuleSchema,
  IdentifierSchema,
} from './schema';

const DEFAULT_CONTENT_ROOT = path.join(process.cwd(), 'content', 'v2', 'courses');

function readJson(filePath: string): unknown {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

export function loadCurriculumCourse(
  courseId: string,
  contentRoot = DEFAULT_CONTENT_ROOT
): CurriculumCourse {
  return CurriculumCourseSchema.parse(readJson(path.join(contentRoot, courseId, 'course.json')));
}

export function loadCurriculumModule(
  courseId: string,
  moduleId: string,
  contentRoot = DEFAULT_CONTENT_ROOT
): CurriculumModule {
  return CurriculumModuleSchema.parse(
    readJson(path.join(contentRoot, courseId, 'modules', `${moduleId}.json`))
  );
}

export function loadCurriculumActivity(
  courseId: string,
  activityId: string,
  contentRoot = DEFAULT_CONTENT_ROOT
): CurriculumActivity {
  return CurriculumActivitySchema.parse(
    readJson(path.join(contentRoot, courseId, 'activities', `${activityId}.json`))
  );
}

export interface CurriculumGraph {
  course: CurriculumCourse;
  modules: CurriculumModule[];
  activities: CurriculumActivity[];
}

const CurriculumOutlineActivitySchema = z.object({
  schemaVersion: z.literal(2),
  id: IdentifierSchema,
  courseId: IdentifierSchema,
  moduleId: IdentifierSchema,
  kind: ActivityKindSchema,
  title: z.string().min(5).max(140),
  prerequisites: z.array(IdentifierSchema),
  estimatedMinutes: z.number().int().positive().max(600),
  stepIds: z.array(IdentifierSchema).min(1),
});

const CurriculumOutlineSchema = z.object({
  schemaVersion: z.literal(1),
  course: CurriculumCourseSchema,
  modules: z.array(CurriculumModuleSchema).min(1),
  activities: z.array(CurriculumOutlineActivitySchema).min(1),
});

export type CurriculumOutlineActivity = z.infer<typeof CurriculumOutlineActivitySchema>;
export type CurriculumOutline = z.infer<typeof CurriculumOutlineSchema>;

export function loadCurriculumOutline(
  courseId: string,
  contentRoot = DEFAULT_CONTENT_ROOT
): CurriculumOutline {
  const outline = CurriculumOutlineSchema.parse(
    readJson(path.join(contentRoot, courseId, 'outline.json'))
  );
  if (outline.course.id !== courseId) {
    throw new Error(`Curriculum outline ${outline.course.id} does not match ${courseId}`);
  }
  return outline;
}

export function validateCurriculumGraph(graph: CurriculumGraph): string[] {
  const errors: string[] = [];
  const moduleById = new Map(graph.modules.map((module) => [module.id, module]));
  const activityById = new Map(graph.activities.map((activity) => [activity.id, activity]));
  const competencyIds = new Set(graph.course.competencies.map((competency) => competency.id));
  const moduleSequence = new Map(
    graph.course.moduleIds.map((moduleId, index) => [moduleId, index])
  );
  const activitySequence = new Map<string, number>();
  let nextActivitySequence = 0;

  for (const moduleId of graph.course.moduleIds) {
    const module = moduleById.get(moduleId);
    if (!module) continue;
    for (const activityId of module.activityIds) {
      if (!activitySequence.has(activityId)) {
        activitySequence.set(activityId, nextActivitySequence);
        nextActivitySequence += 1;
      }
    }
  }

  if (moduleById.size !== graph.modules.length) errors.push('Duplicate module IDs');
  if (activityById.size !== graph.activities.length) errors.push('Duplicate activity IDs');

  for (const [index, moduleId] of graph.course.moduleIds.entries()) {
    const module = moduleById.get(moduleId);
    if (!module) {
      errors.push(`Course references missing module: ${moduleId}`);
      continue;
    }
    if (module.courseId !== graph.course.id) {
      errors.push(`Module ${moduleId} belongs to ${module.courseId}, not ${graph.course.id}`);
    }
    if (module.order !== index + 1) {
      errors.push(`Module ${moduleId} has order ${module.order}; expected ${index + 1}`);
    }
  }

  for (const module of graph.modules) {
    for (const competencyId of module.competencyIds) {
      if (!competencyIds.has(competencyId)) {
        errors.push(`Module ${module.id} references missing competency: ${competencyId}`);
      }
    }
    for (const prerequisite of module.prerequisites) {
      if (!moduleById.has(prerequisite)) {
        errors.push(`Module ${module.id} has missing prerequisite: ${prerequisite}`);
      } else if (
        (moduleSequence.get(prerequisite) ?? Number.POSITIVE_INFINITY) >=
        (moduleSequence.get(module.id) ?? Number.POSITIVE_INFINITY)
      ) {
        errors.push(`Module ${module.id} depends on later module: ${prerequisite}`);
      }
    }
    for (const activityId of module.activityIds) {
      const activity = activityById.get(activityId);
      if (!activity) {
        errors.push(`Module ${module.id} references missing activity: ${activityId}`);
        continue;
      }
      if (activity.moduleId !== module.id || activity.courseId !== graph.course.id) {
        errors.push(`Activity ${activityId} has an invalid course or module owner`);
      }
    }
  }

  for (const activity of graph.activities) {
    const coveredCompetencies = [
      ...activity.competencyCoverage.introduces,
      ...activity.competencyCoverage.reinforces,
      ...activity.competencyCoverage.assesses,
    ];
    for (const competencyId of coveredCompetencies) {
      if (!competencyIds.has(competencyId)) {
        errors.push(`Activity ${activity.id} references missing competency: ${competencyId}`);
      }
    }
    for (const prerequisite of activity.prerequisites) {
      if (!activityById.has(prerequisite)) {
        errors.push(`Activity ${activity.id} has missing prerequisite: ${prerequisite}`);
      } else if (
        (activitySequence.get(prerequisite) ?? Number.POSITIVE_INFINITY) >=
        (activitySequence.get(activity.id) ?? Number.POSITIVE_INFINITY)
      ) {
        errors.push(`Activity ${activity.id} depends on later activity: ${prerequisite}`);
      }
    }
  }

  const introducedCompetencies = new Set<string>();
  const orderedActivities = [...graph.activities].sort(
    (left, right) =>
      (activitySequence.get(left.id) ?? Number.POSITIVE_INFINITY) -
      (activitySequence.get(right.id) ?? Number.POSITIVE_INFINITY)
  );
  for (const activity of orderedActivities) {
    for (const competencyId of activity.competencyCoverage.reinforces) {
      const introducedHere = activity.competencyCoverage.introduces.includes(competencyId);
      if (!introducedCompetencies.has(competencyId) && !introducedHere) {
        errors.push(`Activity ${activity.id} reinforces ${competencyId} before it is introduced`);
      }
    }
    for (const competencyId of activity.competencyCoverage.assesses) {
      const introducedHere = activity.competencyCoverage.introduces.includes(competencyId);
      if (!introducedCompetencies.has(competencyId) && !introducedHere) {
        errors.push(`Activity ${activity.id} assesses ${competencyId} before it is introduced`);
      }
    }
    for (const competencyId of activity.competencyCoverage.introduces) {
      if (introducedCompetencies.has(competencyId)) {
        errors.push(`Activity ${activity.id} introduces ${competencyId} more than once`);
      }
      introducedCompetencies.add(competencyId);
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visitModule = (moduleId: string) => {
    if (visiting.has(moduleId)) {
      errors.push(`Module prerequisite cycle includes ${moduleId}`);
      return;
    }
    if (visited.has(moduleId)) return;
    visiting.add(moduleId);
    moduleById.get(moduleId)?.prerequisites.forEach(visitModule);
    visiting.delete(moduleId);
    visited.add(moduleId);
  };
  graph.course.moduleIds.forEach(visitModule);

  return [...new Set(errors)];
}

export function loadCurriculumGraph(
  courseId: string,
  contentRoot = DEFAULT_CONTENT_ROOT
): CurriculumGraph {
  const course = loadCurriculumCourse(courseId, contentRoot);
  const modules = course.moduleIds.map((moduleId) =>
    loadCurriculumModule(courseId, moduleId, contentRoot)
  );
  const activities = modules.flatMap((module) =>
    module.activityIds.map((activityId) =>
      loadCurriculumActivity(courseId, activityId, contentRoot)
    )
  );
  const graph = { course, modules, activities };
  const errors = validateCurriculumGraph(graph);
  if (errors.length > 0) throw new Error(`Invalid curriculum graph:\n- ${errors.join('\n- ')}`);
  return graph;
}
