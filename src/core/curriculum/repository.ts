import { createHash } from 'node:crypto';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';
import Database from 'better-sqlite3';
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

const RUNTIME_INDEX_PATH = path.join(
  process.cwd(),
  'content',
  'v2',
  '.runtime',
  'curriculum.sqlite'
);

type CurriculumDocumentKind = 'course' | 'module' | 'activity' | 'outline';

interface CurriculumDocumentRow {
  compressed_json: Buffer;
  raw_bytes: number;
  sha256: string;
}

let runtimeIndex: Database.Database | null = null;
let documentQuery: Database.Statement<[string], CurriculumDocumentRow> | null = null;

function getDocumentQuery(): Database.Statement<[string], CurriculumDocumentRow> {
  if (!runtimeIndex) {
    runtimeIndex = new Database(RUNTIME_INDEX_PATH, { readonly: true, fileMustExist: true });
    runtimeIndex.pragma('query_only = ON');
  }
  documentQuery ??= runtimeIndex.prepare(
    'SELECT compressed_json, raw_bytes, sha256 FROM curriculum_documents WHERE document_key = ?'
  );
  return documentQuery;
}

function documentKey(kind: CurriculumDocumentKind, courseId: string, documentId?: string): string {
  IdentifierSchema.parse(courseId);
  if (kind === 'course' || kind === 'outline') return `${kind}:${courseId}`;
  const parsedDocumentId = IdentifierSchema.parse(documentId);
  return `${kind}:${courseId}:${parsedDocumentId}`;
}

function readRuntimeJson(
  kind: CurriculumDocumentKind,
  courseId: string,
  documentId?: string
): unknown {
  const key = documentKey(kind, courseId, documentId);
  const row = getDocumentQuery().get(key);
  if (!row) throw new Error(`Missing curriculum document: ${key}`);
  const source = gunzipSync(row.compressed_json);
  if (source.byteLength !== row.raw_bytes) {
    throw new Error(`Curriculum document length mismatch: ${key}`);
  }
  const digest = createHash('sha256').update(source).digest('hex');
  if (digest !== row.sha256) throw new Error(`Curriculum document digest mismatch: ${key}`);
  return JSON.parse(source.toString('utf8'));
}

export function loadCurriculumCourse(courseId: string): CurriculumCourse {
  return CurriculumCourseSchema.parse(readRuntimeJson('course', courseId));
}

export function loadCurriculumModule(courseId: string, moduleId: string): CurriculumModule {
  return CurriculumModuleSchema.parse(readRuntimeJson('module', courseId, moduleId));
}

export function loadCurriculumActivity(courseId: string, activityId: string): CurriculumActivity {
  return CurriculumActivitySchema.parse(readRuntimeJson('activity', courseId, activityId));
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

export function loadCurriculumOutline(courseId: string): CurriculumOutline {
  const outline = CurriculumOutlineSchema.parse(readRuntimeJson('outline', courseId));
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

export function loadCurriculumGraph(courseId: string): CurriculumGraph {
  const course = loadCurriculumCourse(courseId);
  const modules = course.moduleIds.map((moduleId) => loadCurriculumModule(courseId, moduleId));
  const activities = modules.flatMap((module) =>
    module.activityIds.map((activityId) => loadCurriculumActivity(courseId, activityId))
  );
  const graph = { course, modules, activities };
  const errors = validateCurriculumGraph(graph);
  if (errors.length > 0) throw new Error(`Invalid curriculum graph:\n- ${errors.join('\n- ')}`);
  return graph;
}
