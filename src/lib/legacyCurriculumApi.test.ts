import { describe, expect, it } from 'vitest';
import { legacyCurriculumApiResponse } from './legacyCurriculumApi';

describe('retired curriculum API', () => {
  it('returns Gone with an equivalent V2 target and never replays a legacy method', async () => {
    const response = legacyCurriculumApiResponse(
      'responsive-web-design',
      'lesson',
      'lesson-001-computer-browser-tooling'
    );
    const body = await response.json();

    expect(response.status).toBe(410);
    expect(body).toMatchObject({
      code: 'LEGACY_CURRICULUM_RETIRED',
      methodNotReplayed: true,
    });
    expect(body.migratedTo).toMatch(/^\/learn\/responsive-web-design\//);
    expect(response.headers.get('link')).toContain(body.migratedTo);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('returns a real not-found response for an unknown course', async () => {
    const response = legacyCurriculumApiResponse('missing-course');
    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'Course not found' });
  });
});
