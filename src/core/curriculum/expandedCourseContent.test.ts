import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadCurriculumGraph } from './repository';

const expectations = {
  'python-basics': { modules: 14, activities: 164 },
  'python-oop': { modules: 13, activities: 147 },
  'comptia-network-plus': { modules: 18, activities: 218 },
  'applied-mathematics-beginner': { modules: 14, activities: 145 },
  'applied-mathematics-intermediate': { modules: 15, activities: 155 },
  'applied-mathematics-advanced': { modules: 17, activities: 175 },
  'prompt-engineering-claude-codex': { modules: 14, activities: 145 },
  'agent-loops-goals': { modules: 13, activities: 135 },
  'agent-skills-mcp': { modules: 15, activities: 155 },
  'repository-quality-gates': { modules: 15, activities: 155 },
  'javascript-basics': { modules: 14, activities: 159 },
  'typescript-basics': { modules: 15, activities: 155 },
  'python-functional': { modules: 12, activities: 125 },
  'python-dsa': { modules: 16, activities: 165 },
  'python-dsa-2': { modules: 16, activities: 165 },
  'linux-basics': { modules: 14, activities: 145 },
  'git-basics': { modules: 14, activities: 145 },
} as const;

const requiredModuleKinds = ['theory', 'workshop', 'debug', 'lab', 'review', 'quiz'] as const;

describe('expanded learner-facing course content', () => {
  let portfolioSteps = 0;

  for (const [courseId, expected] of Object.entries(expectations)) {
    it(`${courseId} is a complete cumulative interactive graph`, () => {
      const graph = loadCurriculumGraph(courseId);
      const blueprint = JSON.parse(
        readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8')
      ) as { competencies: Array<{ id: string }> };
      const introduced = new Set<string>();
      const reinforced = new Set<string>();
      const assessed = new Set<string>();
      const activityTitles = new Set<string>();
      const activitySummaries = new Set<string>();
      const activityShapes = new Set<string>();
      const activityLayouts = new Set<string>();
      const interactions = new Set<string>();

      expect(graph.modules).toHaveLength(expected.modules);
      expect(graph.activities).toHaveLength(expected.activities);
      expect(graph.course.status).toBe('preview');
      expect(graph.course.credential.requiredProjectIds).toHaveLength(4);
      expect(graph.course.prerequisites).toEqual(
        courseId === 'python-oop'
          ? ['python-basics']
          : courseId === 'python-functional' || courseId === 'python-dsa'
            ? ['python-basics', 'python-oop']
            : courseId === 'python-dsa-2'
              ? ['python-dsa']
              : courseId === 'applied-mathematics-intermediate'
                ? ['applied-mathematics-beginner']
                : courseId === 'applied-mathematics-advanced'
                  ? ['applied-mathematics-intermediate']
                  : courseId === 'agent-loops-goals' || courseId === 'agent-skills-mcp'
                    ? ['prompt-engineering-claude-codex']
                    : courseId === 'javascript-basics'
                      ? ['responsive-web-design']
                      : courseId === 'typescript-basics'
                        ? ['javascript-basics']
                        : courseId === 'git-basics'
                          ? ['linux-basics']
                          : []
      );

      for (const module of graph.modules) {
        const moduleActivities = module.activityIds.map((activityId) => {
          const activity = graph.activities.find((entry) => entry.id === activityId);
          if (!activity) throw new Error(`Missing ${activityId}`);
          return activity;
        });
        const kinds = new Set(moduleActivities.map((activity) => activity.kind));
        for (const kind of requiredModuleKinds) expect(kinds.has(kind)).toBe(true);
      }

      for (const activity of graph.activities) {
        expect(activity.steps.length, activity.id).toBeGreaterThanOrEqual(7);
        expect(new Set(activity.steps.map((step) => step.id)).size).toBe(activity.steps.length);
        expect(new Set(activity.checks.map((check) => check.id)).size).toBe(activity.checks.length);
        expect(activityTitles.has(activity.title), activity.title).toBe(false);
        expect(activitySummaries.has(activity.summary), activity.id).toBe(false);
        activityTitles.add(activity.title);
        activitySummaries.add(activity.summary);
        expect(activity.summary).not.toMatch(/learners produce (add|build|repair|record)/i);
        activityShapes.add(
          `${activity.kind}:${activity.steps.map((step) => step.interaction).join('>')}`
        );
        const layout = activity.steps.map((step) => `${step.interaction}:${step.title}`).join('|');
        expect(activityLayouts.has(layout), `${activity.id} repeats an activity layout`).toBe(
          false
        );
        activityLayouts.add(layout);
        activity.steps.forEach((step) => {
          interactions.add(step.interaction);
        });
        activity.competencyCoverage.introduces.forEach((id) => {
          introduced.add(id);
        });
        activity.competencyCoverage.reinforces.forEach((id) => {
          reinforced.add(id);
        });
        activity.competencyCoverage.assesses.forEach((id) => {
          assessed.add(id);
        });

        if (activity.steps.some((step) => step.interaction === 'code')) {
          expect(
            activity.checks.some(
              (check) => check.type !== 'source-includes' && check.type !== 'source-matches'
            ),
            `${activity.id} must not use source shape as its sole mastery evidence`
          ).toBe(true);
        }
        if (activity.kind === 'theory') {
          expect(activity.steps[0].interaction, `${activity.id} prediction order`).toBe('predict');
          const calloutTitles = activity.steps.flatMap((step) =>
            step.content.filter((block) => block.type === 'callout').map((block) => block.title)
          );
          expect(calloutTitles).toContain('Worked case pattern');
          expect(calloutTitles).toContain('Non-worked case');
        }
      }

      const stepCount = graph.activities.reduce((sum, activity) => sum + activity.steps.length, 0);
      portfolioSteps += stepCount;
      expect(stepCount).toBeGreaterThan(1_000);
      expect(activityShapes.size).toBeGreaterThanOrEqual(12);
      expect(interactions.size).toBeGreaterThanOrEqual(courseId.startsWith('applied-') ? 9 : 8);
      expect(
        graph.activities.find((activity) => activity.id === graph.course.credential.finalExamId)
          ?.steps.length
      ).toBeGreaterThanOrEqual(20);

      for (const competency of blueprint.competencies) {
        expect(introduced.has(competency.id), `${competency.id} introduction`).toBe(true);
        expect(reinforced.has(competency.id), `${competency.id} reinforcement`).toBe(true);
        expect(assessed.has(competency.id), `${competency.id} assessment`).toBe(true);
      }
    });
  }

  it('contains thousands of deliberate learner interactions across the new portfolio', () => {
    expect(portfolioSteps).toBeGreaterThan(21_000);
  });
});
