import { NextResponse } from 'next/server';
import {
  getLegacyCurriculumRedirect,
  type LegacySurface,
} from '../core/curriculum/legacyMigration';
import { getCourseById } from './data/courses';

export function legacyCurriculumApiResponse(
  courseId: string,
  surface?: LegacySurface,
  legacyId?: string
) {
  const course = getCourseById(courseId);
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  const target =
    surface && legacyId ? getLegacyCurriculumRedirect(courseId, surface, legacyId) : null;
  const migratedTo = target?.href ?? `/learn/${courseId}`;

  return NextResponse.json(
    {
      error: 'This version 1 curriculum endpoint has been retired.',
      code: 'LEGACY_CURRICULUM_RETIRED',
      migratedTo,
      methodNotReplayed: true,
    },
    {
      status: 410,
      headers: {
        Link: `<${migratedTo}>; rel="alternate"`,
        'Cache-Control': 'no-store',
      },
    }
  );
}
