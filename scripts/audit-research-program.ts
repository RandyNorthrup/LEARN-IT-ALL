import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  type CourseResearchDossier,
  CourseResearchDossierSchema,
  CourseResearchInventorySchema,
  PlatformResearchRegisterSchema,
} from '../src/core/curriculum/research';

interface ResearchFinding {
  severity: 'blocker' | 'warning';
  code: 'missing-dossier' | 'dossier-course-mismatch' | 'research-incomplete';
  message: string;
}

interface CourseAudit {
  courseId: string;
  inventoryState: 'pending' | 'researching' | 'in-review' | 'approved';
  dossierStatus: CourseResearchDossier['status'] | 'missing';
  sourceCount: number;
  findings: ResearchFinding[];
}

interface ResearchAuditSummary {
  generatedAt: string;
  courses: number;
  pendingCourses: number;
  dossierStarted: number;
  researchedDossiers: number;
  sources: number;
  blockerGroups: number;
  warningGroups: number;
  findingsByCode: Record<string, number>;
  audits: CourseAudit[];
}

function argumentValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function auditCourse(
  entry: {
    courseId: string;
    state: CourseAudit['inventoryState'];
  },
  dossier?: CourseResearchDossier
): CourseAudit {
  const findings: ResearchFinding[] = [];
  if (!dossier) {
    findings.push({
      severity: 'blocker',
      code: 'missing-dossier',
      message: 'Research questions, evidence, decisions, and review state are not documented yet.',
    });
  } else {
    if (dossier.courseId !== entry.courseId) {
      findings.push({
        severity: 'blocker',
        code: 'dossier-course-mismatch',
        message: `Dossier belongs to ${dossier.courseId}.`,
      });
    }
    if (!['researched', 'in-review', 'approved'].includes(dossier.status)) {
      findings.push({
        severity: 'warning',
        code: 'research-incomplete',
        message: `Dossier remains ${dossier.status}.`,
      });
    }
  }

  return {
    courseId: entry.courseId,
    inventoryState: entry.state,
    dossierStatus: dossier?.status ?? 'missing',
    sourceCount: dossier?.sources.length ?? 0,
    findings,
  };
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
      return `| \`${audit.courseId}\` | ${audit.inventoryState} | ${audit.dossierStatus} | ${audit.sourceCount} | ${blockers} | ${warnings} |`;
    })
    .join('\n');

  return `# Research program status

Generated: ${summary.generatedAt}

This report measures current research evidence. It does not inspect rejected blueprints or generated course output, and it does not claim course quality or publication readiness.

## Result

- Planned courses: ${summary.courses}
- Research pending: ${summary.pendingCourses}
- Course dossiers started: ${summary.dossierStarted}/${summary.courses}
- Course dossiers at \`researched\` or later: ${summary.researchedDossiers}/${summary.courses}
- Current source records: ${summary.sources}
- Blocker groups: ${summary.blockerGroups}
- Warning groups: ${summary.warningGroups}

## Finding inventory

| Finding | Courses |
| --- | ---: |
${findingRows}

## Course inventory

| Course | Research state | Dossier | Sources | Blockers | Warnings |
| --- | --- | --- | ---: | ---: | ---: |
${courseRows}
`;
}

async function main() {
  const root = process.cwd();
  const inventory = CourseResearchInventorySchema.parse(
    JSON.parse(await readFile(path.join(root, 'docs/research/course-inventory.json'), 'utf8'))
  );
  PlatformResearchRegisterSchema.parse(
    JSON.parse(
      await readFile(path.join(root, 'docs/research/platform-research-register.json'), 'utf8')
    )
  );

  const audits: CourseAudit[] = [];
  for (const entry of inventory.courses) {
    const dossier = entry.dossierPath
      ? CourseResearchDossierSchema.parse(
          JSON.parse(await readFile(path.resolve(root, entry.dossierPath), 'utf8'))
        )
      : undefined;
    audits.push(auditCourse(entry, dossier));
  }

  const findings = audits.flatMap((audit) => audit.findings);
  const findingsByCode = findings.reduce<Record<string, number>>((counts, finding) => {
    counts[finding.code] = (counts[finding.code] ?? 0) + 1;
    return counts;
  }, {});
  const summary: ResearchAuditSummary = {
    generatedAt: new Date().toISOString(),
    courses: audits.length,
    pendingCourses: audits.filter((audit) => audit.inventoryState === 'pending').length,
    dossierStarted: audits.filter((audit) => audit.dossierStatus !== 'missing').length,
    researchedDossiers: audits.filter((audit) =>
      ['researched', 'in-review', 'approved'].includes(audit.dossierStatus)
    ).length,
    sources: audits.reduce((sum, audit) => sum + audit.sourceCount, 0),
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
