import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { CourseBlueprintSchema } from '../src/core/curriculum/blueprint';
import {
  auditCourseResearch,
  type CourseResearchAudit,
  type CourseResearchDossier,
  CourseResearchDossierSchema,
  PlatformResearchRegisterSchema,
} from '../src/core/curriculum/research';

interface ResearchAuditSummary {
  generatedAt: string;
  courses: number;
  auditRequiredBlueprints: number;
  dossierStarted: number;
  researchedDossiers: number;
  sources: number;
  modules: number;
  modulesWithSourceObjectives: number;
  blockerGroups: number;
  warningGroups: number;
  findingsByCode: Record<string, number>;
  audits: CourseResearchAudit[];
}

function argumentValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function renderMarkdown(summary: ResearchAuditSummary): string {
  const findingRows = Object.entries(summary.findingsByCode)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([code, count]) => `| \`${code}\` | ${count} |`)
    .join('\n');
  const courseRows = summary.audits
    .map((audit) => {
      const blockers = audit.findings.filter((finding) => finding.severity === 'blocker').length;
      const warnings = audit.findings.filter((finding) => finding.severity === 'warning').length;
      return `| \`${audit.courseId}\` | ${audit.blueprintStatus} | ${audit.sourceCount} | ${audit.modulesWithSourceObjectives}/${audit.moduleCount} | ${audit.dossierStatus} | ${blockers} | ${warnings} |`;
    })
    .join('\n');

  return `# Research Program Baseline

Generated: ${summary.generatedAt}

This report measures research traceability, not course quality or completion. A source count does not make a course researched. Blockers remain expected while the reopened audit is active.

## Result

- Courses: ${summary.courses}
- Blueprints honestly marked \`audit-required\`: ${summary.auditRequiredBlueprints}/${summary.courses}
- Course dossiers started: ${summary.dossierStarted}/${summary.courses}
- Course dossiers at \`researched\` or later: ${summary.researchedDossiers}/${summary.courses}
- Existing source records: ${summary.sources}
- Modules with source-objective IDs: ${summary.modulesWithSourceObjectives}/${summary.modules}
- Blocker groups: ${summary.blockerGroups}
- Warning groups: ${summary.warningGroups}

## Finding inventory

| Finding | Courses |
| --- | ---: |
${findingRows}

## Course inventory

| Course | Blueprint state | Sources | Mapped modules | Dossier | Blockers | Warnings |
| --- | --- | ---: | ---: | --- | ---: | ---: |
${courseRows}

## Interpretation

Existing blueprints contain useful intended learners, scope, competencies, source lists, and activity maps. They do not yet provide stable source IDs, stated evidence limitations, research-to-design decision links, source expiry triggers, complete module objective traceability, or course research dossiers. None may be called researched, approved, or published from this evidence.
`;
}

async function main() {
  const root = process.cwd();
  const blueprintRoot = path.join(root, 'blueprints');
  const dossierRoot = path.join(root, 'docs', 'research', 'courses');
  const registerPath = path.join(root, 'docs', 'research', 'platform-research-register.json');
  PlatformResearchRegisterSchema.parse(JSON.parse(await readFile(registerPath, 'utf8')));

  const blueprintFiles = (await readdir(blueprintRoot))
    .filter((file) => file.endsWith('.json'))
    .sort();
  const audits: CourseResearchAudit[] = [];

  for (const file of blueprintFiles) {
    const blueprint = CourseBlueprintSchema.parse(
      JSON.parse(await readFile(path.join(blueprintRoot, file), 'utf8'))
    );
    let dossier: CourseResearchDossier | undefined;
    try {
      dossier = CourseResearchDossierSchema.parse(
        JSON.parse(await readFile(path.join(dossierRoot, file), 'utf8'))
      );
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code !== 'ENOENT') throw error;
    }
    audits.push(auditCourseResearch(blueprint, dossier));
  }

  const findings = audits.flatMap((audit) => audit.findings);
  const findingsByCode = findings.reduce<Record<string, number>>((counts, finding) => {
    counts[finding.code] = (counts[finding.code] ?? 0) + 1;
    return counts;
  }, {});
  const summary: ResearchAuditSummary = {
    generatedAt: new Date().toISOString(),
    courses: audits.length,
    auditRequiredBlueprints: audits.filter((audit) => audit.blueprintStatus === 'audit-required')
      .length,
    dossierStarted: audits.filter((audit) => audit.dossierStatus !== 'missing').length,
    researchedDossiers: audits.filter((audit) =>
      ['researched', 'in-review', 'approved'].includes(audit.dossierStatus)
    ).length,
    sources: audits.reduce((sum, audit) => sum + audit.sourceCount, 0),
    modules: audits.reduce((sum, audit) => sum + audit.moduleCount, 0),
    modulesWithSourceObjectives: audits.reduce(
      (sum, audit) => sum + audit.modulesWithSourceObjectives,
      0
    ),
    blockerGroups: findings.filter((finding) => finding.severity === 'blocker').length,
    warningGroups: findings.filter((finding) => finding.severity === 'warning').length,
    findingsByCode,
    audits,
  };

  const reportPath = argumentValue('--report');
  if (reportPath) await writeFile(path.resolve(root, reportPath), renderMarkdown(summary));
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  if (!process.argv.includes('--report-only') && summary.blockerGroups > 0) process.exitCode = 1;
}

main().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
