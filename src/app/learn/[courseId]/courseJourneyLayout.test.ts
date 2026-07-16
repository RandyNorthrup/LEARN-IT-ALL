import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(
  path.join(process.cwd(), 'src/app/learn/[courseId]/CourseJourney.module.css'),
  'utf8'
);
const journey = readFileSync(path.join(process.cwd(), 'src/app/learn/[courseId]/page.tsx'), 'utf8');

describe('course journey interaction layout', () => {
  it('keeps the brand link at least 44px tall', () => {
    expect(styles).toMatch(/\.brand\s*\{[^}]*min-height:\s*44px;/);
  });

  it('keeps every module action at least 44px tall', () => {
    expect(styles).toMatch(/\.currentModule,\s*\n\.moduleExplore\s*\{[^}]*min-height:\s*44px;/);
  });

  it('allows long course titles and hero content to shrink at mobile widths', () => {
    expect(styles).toMatch(/\.hero\s*>\s*\*\s*\{[^}]*min-width:\s*0;/);
    expect(styles).toMatch(/\.hero h1\s*\{[^}]*overflow-wrap:\s*anywhere;/);
    expect(styles).toMatch(
      /@media \(max-width:\s*560px\)[\s\S]*?\.hero h1\s*\{[^}]*font-size:\s*clamp\(2\.4rem,\s*11\.5vw,\s*4rem\);/
    );
    expect(styles).toMatch(
      /@media \(max-width:\s*900px\)[\s\S]*?\.hero h1\s*\{[^}]*max-width:\s*none;[^}]*text-wrap:\s*wrap;/
    );
  });

  it('keeps migrated-progress history responsive without granting mastery', () => {
    expect(styles).toMatch(/\.migrationNotice\s*\{[^}]*grid-template-columns:/);
    expect(styles).toMatch(
      /@media \(max-width:\s*900px\)[\s\S]*?\.migrationNotice\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/
    );
    expect(styles).toMatch(/\.migrationNotice\s*>\s*\*\s*\{[^}]*min-width:\s*0;/);
  });

  it('defers route prefetch work until the learner chooses a destination', () => {
    expect(journey.match(/prefetch=\{false\}/gu)).toHaveLength(4);
  });

  it('loads only course metadata while generating the document title', () => {
    const metadataBody = journey.match(
      /export async function generateMetadata[\s\S]*?\n}\n\nexport default/
    )?.[0];
    expect(metadataBody).toContain('loadCurriculumCourse(courseId).title');
    expect(metadataBody).not.toContain('loadCourse(courseId)');
    expect(metadataBody).not.toContain('loadCurriculumGraph(courseId)');
    expect(metadataBody).toContain('isPublishedCourse(courseId)');
  });

  it('uses the lightweight outline instead of lesson bodies for the course map', () => {
    expect(journey).toContain('loadCurriculumOutline(courseId)');
    expect(journey).toContain('activity.stepIds');
    expect(journey).not.toContain('loadCurriculumGraph');
  });

  it('shows competencies for the open module without rendering the whole course map', () => {
    expect(journey).toContain('visibleModule.competencyIds.flatMap');
    expect(journey).toContain('Competencies in the open module');
    expect(journey).toContain('{graph.course.competencies.length} across the course');
    expect(journey).not.toContain('{graph.course.competencies.map((competency) =>');
  });
});
