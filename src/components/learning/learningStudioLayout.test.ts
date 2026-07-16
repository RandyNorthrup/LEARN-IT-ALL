import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(
  path.join(process.cwd(), 'src/components/learning/LearningStudio.module.css'),
  'utf8'
);
const studio = readFileSync(
  path.join(process.cwd(), 'src/components/learning/LearningStudio.tsx'),
  'utf8'
);
const stepWorkspace = readFileSync(
  path.join(process.cwd(), 'src/components/learning/StepWorkspace.tsx'),
  'utf8'
);
const codeWorkspace = readFileSync(
  path.join(process.cwd(), 'src/components/learning/CodeWorkspace.tsx'),
  'utf8'
);
const activityPage = readFileSync(
  path.join(process.cwd(), 'src/app/learn/[courseId]/[moduleId]/[activityId]/page.tsx'),
  'utf8'
);

describe('learning studio responsive runtime layout', () => {
  it('gives every activity page a screen-reader-visible level-one heading', () => {
    expect(studio).toContain('<h1 className={styles.visuallyHidden}>{activity.title}</h1>');
    expect(styles).toMatch(
      /\.visuallyHidden\s*\{[^}]*position: absolute;[^}]*clip-path: inset\(50%\);[^}]*white-space: nowrap;/
    );
  });

  it('keeps runtime controls below the sticky course header on wide screens', () => {
    expect(styles).toMatch(
      /@media \(min-width: 901px\)[\s\S]*?\.runtimePanel\s*\{[\s\S]*?position: sticky;[\s\S]*?top: calc\(76px \+ 1rem\);[\s\S]*?align-self: start;/
    );
  });

  it('clips the rounded workspace without creating a scroll container that defeats sticky controls', () => {
    expect(styles).toMatch(/\.codeWorkspace\s*\{[^}]*overflow: clip;/);
    expect(styles).not.toMatch(/\.codeWorkspace\s*\{[^}]*overflow: hidden;/);
  });

  it('gives runtime actions a touch-size target', () => {
    expect(styles).toMatch(/\.previewBar button\s*\{[^}]*min-height: 44px;/);
    expect(styles).toMatch(/\.feedback button\s*\{[^}]*min-height: 44px;/);
    expect(styles).toMatch(/\.orderActions button\s*\{[^}]*width: 44px;[^}]*height: 44px;/);
  });

  it('uses the verified high-contrast studio token for hint guidance', () => {
    expect(styles).toMatch(/\.hintSection small\s*\{[^}]*color: var\(--studio-muted\);/);
  });

  it('keeps arbitrary points out of the learner interface', () => {
    expect(studio).not.toContain(' XP');
    expect(studio).not.toContain('initialXp');
  });

  it('uses a direct exit without prefetch and does not post an unchanged first-paint draft', () => {
    expect(studio).toContain('<a href="/" className={styles.exitButton}');
    expect(studio).toContain('<span className={styles.visuallyHidden}>Exit learning studio</span>');
    expect(studio).not.toContain("from 'next/link'");
    expect(studio).toContain('const lastScheduledDraft = useRef(draftSnapshot);');
    expect(studio).toContain('if (draftSnapshot === lastScheduledDraft.current) return;');
  });

  it('loads code runtimes only when the active step needs a code workspace', () => {
    expect(stepWorkspace).toContain('lazy(async () =>');
    expect(stepWorkspace).toContain("import('./CodeWorkspace')");
    expect(stepWorkspace).toContain('<Suspense fallback={<CodeWorkspaceLoading />}>');
    expect(stepWorkspace).toContain('role="status"');
    expect(stepWorkspace).not.toMatch(
      /from '\.\/(?:C|Go|JavaScript|Network|Python|Sql|TypeScript)RunPanel'/u
    );
    expect(codeWorkspace).toContain("from './TypeScriptRunPanel'");
    expect(codeWorkspace).toContain('role="tablist"');
  });

  it('keeps the initial non-interactive task heading in the server-rendered path', () => {
    expect(activityPage).toContain('initialStepIntro={<StepIntro step={initialStep} />}');
    expect(studio).toContain('step.id === initialProgress.currentStepId');
    expect(stepWorkspace).toContain('initialIntro ?? <StepIntro step={step} />');
  });

  it('stacks evidence labels and long source text on narrow screens', () => {
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.inlineEvidence\s*\{[\s\S]*?grid-template-columns: 1fr;[\s\S]*?gap: 0\.35rem;/
    );
    expect(styles).toMatch(/\.inlineEvidence dd\s*\{[^}]*overflow-wrap: anywhere;/);
  });

  it('removes costly decorative paint and balanced text layout on mobile', () => {
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.topbar\s*\{[^}]*backdrop-filter: none;/
    );
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.studioShell\s*\{[^}]*background-image: none;/
    );
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.taskIntro h2\s*\{[^}]*text-wrap: wrap;/
    );
  });

  it('uses solid chrome and bounded typography throughout the tablet layout', () => {
    expect(styles).toMatch(
      /@media \(641px <= width <= 1024px\)[\s\S]*?\.topbar\s*\{[^}]*backdrop-filter: none;/
    );
    expect(styles).toMatch(
      /@media \(641px <= width <= 1024px\)[\s\S]*?\.taskIntro h2\s*\{[^}]*font-size: clamp\(2\.2rem, 5vw, 3rem\);[^}]*text-wrap: wrap;/
    );
  });

  it('keeps long prose evidence readable inside the narrow desktop comparison pane', () => {
    expect(styles).toMatch(
      /\.workspace\[data-layout="evidence"\] \.stimulusLine\s*\{[^}]*grid-template-columns: 1fr;[^}]*gap: 0\.2rem;/
    );
    expect(styles).toMatch(
      /\.stimulusLine code\s*\{[^}]*overflow-wrap: break-word;[^}]*word-break: normal;/
    );
  });
});
