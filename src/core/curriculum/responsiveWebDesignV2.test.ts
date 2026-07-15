import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { toLearnerActivity } from './publicActivity';
import { loadCurriculumGraph } from './repository';

const graph = loadCurriculumGraph('responsive-web-design');
const activity = graph.activities.find((entry) => entry.id === 'browser-evidence-studio');
if (!activity) throw new Error('browser-evidence-studio fixture is missing');

describe('Responsive Web Design v2 curriculum', () => {
  it('expands the foundation into a full multi-format module', () => {
    expect(graph.modules[0].activityIds).toHaveLength(13);
    expect(
      graph.activities.reduce((total, entry) => total + entry.steps.length, 0)
    ).toBeGreaterThanOrEqual(125);
    expect(new Set(graph.activities.map((entry) => entry.kind)).size).toBeGreaterThanOrEqual(7);
    expect(
      new Set(graph.activities.flatMap((entry) => entry.steps.map((step) => step.interaction)))
    ).toEqual(
      new Set(['read', 'code', 'predict', 'inspect', 'arrange', 'debug', 'answer', 'reflect'])
    );
  });

  it('chains every activity to the immediately preceding cumulative artifact', () => {
    graph.activities.forEach((entry, index) => {
      expect(entry.prerequisites).toEqual(index === 0 ? [] : [graph.activities[index - 1].id]);
    });
  });

  it('introduces every foundation competency exactly once and only then reinforces it', () => {
    const introductions = graph.activities.flatMap((entry) => entry.competencyCoverage.introduces);
    expect(introductions).toEqual(graph.course.competencies.map((competency) => competency.id));
    expect(new Set(introductions).size).toBe(graph.course.competencies.length);
  });

  it('delivers the complete basic HTML map as substantial original practice', () => {
    const htmlModule = graph.modules.find((entry) => entry.id === 'documents-content-media');
    if (!htmlModule) throw new Error('documents-content-media fixture is missing');
    const htmlActivities = graph.activities.filter((entry) => entry.moduleId === htmlModule.id);
    const blueprint = JSON.parse(
      readFileSync(path.join(process.cwd(), 'blueprints', 'responsive-web-design.json'), 'utf8')
    ) as {
      modules: Array<{
        id: string;
        activities: Array<{ id: string; reference?: { upstreamChallengeCount: number } }>;
      }>;
    };
    const basicHtml = blueprint.modules.find((entry) => entry.id === 'basic-html');
    if (!basicHtml) throw new Error('basic-html blueprint fixture is missing');

    expect(htmlActivities).toHaveLength(34);
    expect(htmlActivities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(328);
    expect(new Set(htmlActivities.map((entry) => entry.kind))).toEqual(
      new Set(['theory', 'workshop', 'lab', 'review', 'quiz'])
    );
    for (const mapped of basicHtml.activities.filter((entry) => entry.reference)) {
      const authored = htmlActivities.find((entry) => entry.id === mapped.id);
      expect(authored, mapped.id).toBeDefined();
      expect(authored?.steps.length, mapped.id).toBeGreaterThanOrEqual(
        mapped.reference?.upstreamChallengeCount ?? 1
      );
      if (authored?.kind === 'lab') expect(authored.steps.length).toBeGreaterThanOrEqual(8);
    }
  });

  it('delivers semantic HTML as varied relationship practice rather than cloned lessons', () => {
    const semanticModule = graph.modules.find(
      (entry) => entry.id === 'semantic-html-relationships'
    );
    if (!semanticModule) throw new Error('semantic-html-relationships fixture is missing');
    const semanticActivities = graph.activities.filter(
      (entry) => entry.moduleId === semanticModule.id
    );
    const blueprint = JSON.parse(
      readFileSync(path.join(process.cwd(), 'blueprints', 'responsive-web-design.json'), 'utf8')
    ) as {
      modules: Array<{
        id: string;
        activities: Array<{ id: string; reference?: { upstreamChallengeCount: number } }>;
      }>;
    };
    const semanticBlueprint = blueprint.modules.find((entry) => entry.id === 'semantic-html');
    if (!semanticBlueprint) throw new Error('semantic-html blueprint fixture is missing');

    expect(semanticActivities).toHaveLength(17);
    expect(semanticActivities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(162);
    expect(new Set(semanticActivities.map((entry) => entry.kind))).toEqual(
      new Set(['theory', 'workshop', 'lab', 'review', 'quiz'])
    );
    for (const mapped of semanticBlueprint.activities.filter((entry) => entry.reference)) {
      const authored = semanticActivities.find((entry) => entry.id === mapped.id);
      expect(authored, mapped.id).toBeDefined();
      expect(authored?.steps.length, mapped.id).toBeGreaterThanOrEqual(
        mapped.reference?.upstreamChallengeCount ?? 1
      );
    }
    const introductions = semanticActivities.filter(
      (entry) => entry.competencyCoverage.introduces.length > 0
    );
    expect(
      new Set(introductions.map((entry) => entry.steps.map((step) => step.interaction).join(',')))
        .size
    ).toBeGreaterThanOrEqual(6);
    expect(introductions.every((entry) => entry.artifactId === 'heat-relief-information-hub')).toBe(
      true
    );
  });

  it('builds forms and tables through ordered contracts, authentic builds, and failure testing', () => {
    const formsModule = graph.modules.find((entry) => entry.id === 'forms-tables-data');
    if (!formsModule) throw new Error('forms-tables-data fixture is missing');
    const formsActivities = graph.activities.filter((entry) => entry.moduleId === formsModule.id);
    const blueprint = JSON.parse(
      readFileSync(path.join(process.cwd(), 'blueprints', 'responsive-web-design.json'), 'utf8')
    ) as {
      modules: Array<{
        id: string;
        activities: Array<{ id: string; reference?: { upstreamChallengeCount: number } }>;
      }>;
    };
    const formsBlueprint = blueprint.modules.find((entry) => entry.id === 'html-forms-and-tables');
    if (!formsBlueprint) throw new Error('html-forms-and-tables blueprint fixture is missing');

    expect(formsActivities).toHaveLength(16);
    expect(formsActivities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(167);
    expect(new Set(formsActivities.map((entry) => entry.kind))).toEqual(
      new Set(['theory', 'workshop', 'lab', 'review', 'quiz'])
    );
    expect(formsActivities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      formsModule.competencyIds
    );
    expect(
      formsActivities.every((entry) => entry.artifactId === 'heat-relief-information-hub')
    ).toBe(true);

    for (const mapped of formsBlueprint.activities.filter((entry) => entry.reference)) {
      const authored = formsActivities.find((entry) => entry.id === mapped.id);
      expect(authored, mapped.id).toBeDefined();
      expect(authored?.steps.length, mapped.id).toBeGreaterThanOrEqual(
        mapped.reference?.upstreamChallengeCount ?? 1
      );
      if (authored?.kind === 'lab') expect(authored.steps.length).toBeGreaterThanOrEqual(8);
    }

    const conceptActivities = formsActivities.filter(
      (entry) => entry.competencyCoverage.introduces.length > 0
    );
    expect(
      new Set(
        conceptActivities.map((entry) => entry.steps.map((step) => step.interaction).join(','))
      ).size
    ).toBeGreaterThanOrEqual(6);
    const workshop = formsActivities.find(
      (entry) => entry.id === 'mapped-workshop-hotel-feedback-form'
    );
    expect(workshop?.steps).toHaveLength(33);
    expect(new Set(workshop?.steps.map((step) => step.interaction))).toEqual(
      new Set(['code', 'inspect', 'debug', 'arrange'])
    );
  });

  it('turns the first certification project into a cumulative independent build', () => {
    const projectModule = graph.modules.find(
      (entry) => entry.id === 'community-needs-survey-project'
    );
    const project = graph.activities.find((entry) => entry.id === 'mapped-lab-survey-form');
    if (!projectModule || !project) throw new Error('Community Needs Survey project is missing');

    expect(projectModule.activityIds).toEqual([project.id]);
    expect(project.kind).toBe('project');
    expect(project.artifactId).toBe('community-needs-survey');
    expect(graph.course.credential.requiredProjectIds).toContain(project.artifactId);
    expect(project.steps).toHaveLength(48);
    expect(project.steps.filter((step) => step.interaction === 'code')).toHaveLength(24);
    expect(project.checks).toHaveLength(78);
    expect(new Set(project.steps.map((step) => step.interaction))).toEqual(
      new Set(['read', 'code', 'predict', 'inspect', 'arrange', 'debug', 'answer', 'reflect'])
    );
    expect(project.competencyCoverage.introduces).toEqual([]);
    expect(project.competencyCoverage.assesses).toEqual(projectModule.competencyIds);
    expect(project.steps.at(-1)?.checkIds).toEqual(
      expect.arrayContaining(project.steps[1].checkIds)
    );
  });

  it('teaches accessible HTML as barrier removal plus multi-method engineering evidence', () => {
    const accessibilityModule = graph.modules.find(
      (entry) => entry.id === 'accessible-html-engineering'
    );
    if (!accessibilityModule) throw new Error('accessible-html-engineering fixture is missing');
    const accessibilityActivities = graph.activities.filter(
      (entry) => entry.moduleId === accessibilityModule.id
    );
    const blueprint = JSON.parse(
      readFileSync(path.join(process.cwd(), 'blueprints', 'responsive-web-design.json'), 'utf8')
    ) as {
      modules: Array<{
        id: string;
        activities: Array<{ id: string; reference?: { upstreamChallengeCount: number } }>;
      }>;
    };
    const accessibilityBlueprint = blueprint.modules.find(
      (entry) => entry.id === 'html-and-accessibility'
    );
    if (!accessibilityBlueprint) throw new Error('HTML accessibility blueprint is missing');

    expect(accessibilityActivities).toHaveLength(21);
    expect(accessibilityActivities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(
      187
    );
    expect(accessibilityActivities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      accessibilityModule.competencyIds
    );
    expect(
      accessibilityActivities.every((entry) => entry.artifactId === 'community-needs-survey')
    ).toBe(true);
    for (const mapped of accessibilityBlueprint.activities.filter((entry) => entry.reference)) {
      const authored = accessibilityActivities.find((entry) => entry.id === mapped.id);
      expect(authored, mapped.id).toBeDefined();
      expect(authored?.steps.length, mapped.id).toBeGreaterThanOrEqual(
        mapped.reference?.upstreamChallengeCount ?? 1
      );
      if (authored?.kind === 'lab') expect(authored.steps.length).toBeGreaterThanOrEqual(8);
    }
    const concepts = accessibilityActivities.filter(
      (entry) => entry.competencyCoverage.introduces.length > 0
    );
    expect(
      new Set(concepts.map((entry) => entry.steps.map((step) => step.interaction).join(','))).size
    ).toBeGreaterThanOrEqual(6);
    expect(
      accessibilityActivities.find(
        (entry) => entry.id === 'mapped-workshop-tech-conference-schedule'
      )?.steps
    ).toHaveLength(14);
  });

  it('closes the HTML sequence with cumulative retrieval instead of new disconnected theory', () => {
    const reviewModule = graph.modules.find((entry) => entry.id === 'cumulative-html-review');
    const review = graph.activities.find((entry) => entry.id === 'mapped-review-html');
    if (!reviewModule || !review) throw new Error('Cumulative HTML review is missing');

    expect(reviewModule.activityIds).toEqual([review.id]);
    expect(review.kind).toBe('review');
    expect(review.steps).toHaveLength(72);
    expect(review.steps.filter((step) => step.interaction === 'code')).toHaveLength(9);
    expect(new Set(review.steps.map((step) => step.interaction))).toEqual(
      new Set(['read', 'code', 'predict', 'inspect', 'arrange', 'debug', 'answer', 'reflect'])
    );
    expect(review.competencyCoverage.introduces).toEqual([]);
    expect(review.competencyCoverage.assesses).toEqual(reviewModule.competencyIds);
    expect(review.artifactId).toBe('community-needs-survey');
  });

  it('builds CSS foundations through real cascade, box, flow, state, and decoration practice', () => {
    const cssModule = graph.modules.find((entry) => entry.id === 'css-foundations-cascade-flow');
    if (!cssModule) throw new Error('css-foundations-cascade-flow fixture is missing');
    const cssActivities = graph.activities.filter((entry) => entry.moduleId === cssModule.id);
    const blueprint = JSON.parse(
      readFileSync(path.join(process.cwd(), 'blueprints', 'responsive-web-design.json'), 'utf8')
    ) as {
      modules: Array<{
        id: string;
        activities: Array<{ id: string; reference?: { upstreamChallengeCount: number } }>;
      }>;
    };
    const cssBlueprint = blueprint.modules.find((entry) => entry.id === 'basic-css');
    if (!cssBlueprint) throw new Error('basic-css blueprint fixture is missing');

    expect(cssActivities).toHaveLength(22);
    expect(cssActivities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(291);
    expect(cssActivities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      cssModule.competencyIds
    );
    for (const mapped of cssBlueprint.activities.filter((entry) => entry.reference)) {
      const authored = cssActivities.find((entry) => entry.id === mapped.id);
      expect(authored, mapped.id).toBeDefined();
      expect(authored?.steps.length, mapped.id).toBeGreaterThanOrEqual(
        mapped.reference?.upstreamChallengeCount ?? 1
      );
      if (authored?.kind === 'lab') expect(authored.steps.length).toBeGreaterThanOrEqual(8);
    }
    const workshop = cssActivities.find((entry) => entry.id === 'mapped-workshop-cafe-menu');
    expect(workshop?.steps).toHaveLength(89);
    expect(new Set(workshop?.steps.map((step) => step.interaction))).toEqual(
      new Set(['predict', 'code', 'inspect', 'debug', 'arrange', 'reflect'])
    );
    expect(
      cssActivities
        .flatMap((entry) => entry.steps)
        .filter((step) => step.interaction === 'code')
        .every((step) => step.targetFile === 'css')
    ).toBe(true);
    expect(
      cssActivities
        .flatMap((entry) => entry.checks)
        .some(
          (check) =>
            check.type === 'source-includes' &&
            check.file === 'html' &&
            check.expected.includes('styles.css')
        )
    ).toBe(true);
  });

  it('moves interface design from evidence through faded build and unfamiliar transfer', () => {
    const designModule = graph.modules.find(
      (entry) => entry.id === 'user-centered-interface-design'
    );
    if (!designModule) throw new Error('user-centered-interface-design fixture is missing');
    const designActivities = graph.activities.filter((entry) => entry.moduleId === designModule.id);
    const blueprint = JSON.parse(
      readFileSync(path.join(process.cwd(), 'blueprints', 'responsive-web-design.json'), 'utf8')
    ) as {
      modules: Array<{
        id: string;
        activities: Array<{ id: string; reference?: { upstreamChallengeCount: number } }>;
      }>;
    };
    const designBlueprint = blueprint.modules.find((entry) => entry.id === 'design-for-developers');
    if (!designBlueprint) throw new Error('design-for-developers blueprint fixture is missing');

    expect(designActivities).toHaveLength(13);
    expect(designActivities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(155);
    expect(designActivities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      designModule.competencyIds
    );
    for (const mapped of designBlueprint.activities.filter((entry) => entry.reference)) {
      const authored = designActivities.find((entry) => entry.id === mapped.id);
      expect(authored, mapped.id).toBeDefined();
      expect(authored?.steps.length, mapped.id).toBeGreaterThanOrEqual(
        mapped.reference?.upstreamChallengeCount ?? 1
      );
    }
    expect(
      designActivities.find((entry) => entry.id === 'design-for-developers-faded-build')?.steps
    ).toHaveLength(32);
    expect(
      designActivities.find((entry) => entry.id === 'design-for-developers-transfer-lab')?.steps
    ).toHaveLength(16);
    expect(designActivities.every((entry) => entry.artifactId === 'community-needs-survey')).toBe(
      true
    );
  });

  it('teaches sizing by reference context and requires bounded fluid transfer practice', () => {
    const unitsModule = graph.modules.find(
      (entry) => entry.id === 'css-units-intrinsic-constraints'
    );
    if (!unitsModule) throw new Error('css-units-intrinsic-constraints fixture is missing');
    const unitsActivities = graph.activities.filter((entry) => entry.moduleId === unitsModule.id);

    expect(unitsActivities).toHaveLength(10);
    expect(unitsActivities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(120);
    expect(unitsActivities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      unitsModule.competencyIds
    );
    expect(
      unitsActivities.find((entry) => entry.id === 'absolute-and-relative-units-faded-build')?.steps
    ).toHaveLength(32);
    expect(
      unitsActivities.find((entry) => entry.id === 'mapped-lab-event-flyer-page')?.steps
    ).toHaveLength(8);
  });

  it('separates input states, structural matching, functional specificity, and generated content', () => {
    const stateModule = graph.modules.find(
      (entry) => entry.id === 'css-state-structure-generated-presentation'
    );
    if (!stateModule) throw new Error('CSS state and pseudo-element fixture is missing');
    const stateActivities = graph.activities.filter((entry) => entry.moduleId === stateModule.id);

    expect(stateActivities).toHaveLength(11);
    expect(stateActivities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(153);
    expect(stateActivities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      stateModule.competencyIds
    );
    expect(
      stateActivities.find((entry) => entry.id === 'mapped-workshop-greeting-card')?.steps
    ).toHaveLength(27);
    expect(
      stateActivities.find((entry) => entry.id === 'mapped-workshop-parent-teacher-conference-form')
        ?.steps
    ).toHaveLength(37);
    expect(
      stateActivities
        .flatMap((entry) => entry.checks)
        .some(
          (check) =>
            check.type === 'source-includes' &&
            check.file === 'css' &&
            check.expected.includes('content: ""')
        )
    ).toBe(true);
  });

  it('crosses two thousand interactions with color evidence rather than color-only decoration', () => {
    const colorModule = graph.modules.find((entry) => entry.id === 'css-color-contrast-gradients');
    if (!colorModule) throw new Error('css-color-contrast-gradients fixture is missing');
    const colorActivities = graph.activities.filter((entry) => entry.moduleId === colorModule.id);
    const totalInteractions = graph.activities.reduce(
      (total, entry) => total + entry.steps.length,
      0
    );

    expect(totalInteractions).toBeGreaterThanOrEqual(2_000);
    expect(colorActivities).toHaveLength(10);
    expect(colorActivities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(201);
    expect(colorActivities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      colorModule.competencyIds
    );
    expect(
      colorActivities.find((entry) => entry.id === 'mapped-workshop-colored-markers')?.steps
    ).toHaveLength(89);
    expect(
      colorActivities.find((entry) => entry.id === 'mapped-lab-colored-boxes')?.steps
    ).toHaveLength(16);
    expect(
      colorActivities.find((entry) => entry.id === 'mapped-review-css-colors')?.steps
    ).toHaveLength(20);
    expect(
      colorActivities.find((entry) => entry.id === 'mapped-quiz-css-colors')?.steps
    ).toHaveLength(30);
    expect(
      colorActivities
        .flatMap((entry) => entry.checks)
        .some(
          (check) =>
            check.type === 'source-includes' &&
            check.file === 'html' &&
            check.expected.includes('Available now')
        )
    ).toBe(true);
  });

  it('styles forms through native behavior, reflow, focus, multi-cue states, and preferences', () => {
    const formsModule = graph.modules.find(
      (entry) => entry.id === 'resilient-form-interface-design'
    );
    if (!formsModule) throw new Error('resilient-form-interface-design fixture is missing');
    const activities = graph.activities.filter((entry) => entry.moduleId === formsModule.id);

    expect(activities).toHaveLength(13);
    expect(activities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(205);
    expect(activities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      formsModule.competencyIds
    );
    expect(
      activities.find((entry) => entry.id === 'mapped-workshop-registration-form')?.steps
    ).toHaveLength(61);
    expect(
      activities.find((entry) => entry.id === 'mapped-workshop-game-settings-panel')?.steps
    ).toHaveLength(16);
    expect(activities.find((entry) => entry.id === 'mapped-lab-contact-form')?.steps).toHaveLength(
      12
    );
    expect(
      activities.find((entry) => entry.id === 'mapped-lab-feature-selection')?.steps
    ).toHaveLength(12);
    expect(
      activities.find((entry) => entry.id === 'mapped-review-styling-forms')?.steps
    ).toHaveLength(20);
    expect(
      activities.find((entry) => entry.id === 'mapped-quiz-styling-forms')?.steps
    ).toHaveLength(30);
    expect(activities.every((entry) => entry.artifactId === 'community-needs-survey')).toBe(true);
  });

  it('debugs overflow, transformed paint, effects, and stacking through computed evidence', () => {
    const effectsModule = graph.modules.find(
      (entry) => entry.id === 'css-overflow-effects-geometry'
    );
    if (!effectsModule) throw new Error('css-overflow-effects-geometry fixture is missing');
    const activities = graph.activities.filter((entry) => entry.moduleId === effectsModule.id);

    expect(activities).toHaveLength(12);
    expect(activities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(173);
    expect(activities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      effectsModule.competencyIds
    );
    expect(
      activities.find((entry) => entry.id === 'mapped-workshop-rothko-painting')?.steps
    ).toHaveLength(44);
    expect(
      activities.find((entry) => entry.id === 'mapped-lab-confidential-email-page')?.steps
    ).toHaveLength(16);
    expect(
      activities.find((entry) => entry.id === 'mapped-review-css-layout-and-effects')?.steps
    ).toHaveLength(20);
    expect(
      activities.find((entry) => entry.id === 'mapped-quiz-css-layout-and-effects')?.steps
    ).toHaveLength(30);
  });

  it('teaches the Flexbox algorithm, content-driven wrapping, and source-order safety', () => {
    const flexModule = graph.modules.find((entry) => entry.id === 'one-dimensional-flex-layout');
    if (!flexModule) throw new Error('one-dimensional-flex-layout fixture is missing');
    const activities = graph.activities.filter((entry) => entry.moduleId === flexModule.id);

    expect(activities).toHaveLength(12);
    expect(activities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(185);
    expect(activities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      flexModule.competencyIds
    );
    expect(
      activities.find((entry) => entry.id === 'mapped-workshop-flexbox-photo-gallery')?.steps
    ).toHaveLength(22);
    expect(
      activities.find((entry) => entry.id === 'mapped-workshop-colorful-boxes')?.steps
    ).toHaveLength(43);
    expect(
      activities.find((entry) => entry.id === 'mapped-lab-pricing-plans-layout')?.steps
    ).toHaveLength(16);
    expect(
      activities.find((entry) => entry.id === 'mapped-review-css-flexbox')?.steps
    ).toHaveLength(20);
    expect(activities.find((entry) => entry.id === 'mapped-quiz-css-flexbox')?.steps).toHaveLength(
      30
    );
  });

  it('requires a second independent project artifact with layout and preference evidence', () => {
    const project = graph.activities.find(
      (entry) => entry.id === 'mapped-lab-page-of-playing-cards'
    );
    if (!project) throw new Error('Volunteer Shift Deck project is missing');

    expect(project.kind).toBe('project');
    expect(project.artifactId).toBe('volunteer-shift-deck');
    expect(project.steps).toHaveLength(48);
    expect(project.steps.filter((step) => step.interaction === 'code')).toHaveLength(24);
    expect(project.checks).toHaveLength(75);
    expect(new Set(project.steps.map((step) => step.interaction))).toEqual(
      new Set(['read', 'code', 'predict', 'inspect', 'arrange', 'debug', 'answer', 'reflect'])
    );
  });

  it('requires an independent accessible data-table project with cumulative HTML and CSS proof', () => {
    const projectModule = graph.modules.find(
      (entry) => entry.id === 'accessible-resource-inventory-project'
    );
    const project = graph.activities.find((entry) => entry.id === 'mapped-lab-book-inventory-app');
    if (!projectModule || !project) {
      throw new Error('Accessible Resource Inventory project is missing');
    }

    expect(projectModule.activityIds).toEqual([project.id]);
    expect(project.kind).toBe('project');
    expect(project.artifactId).toBe('accessible-resource-inventory');
    expect(project.steps).toHaveLength(48);
    expect(project.steps.filter((step) => step.interaction === 'code')).toHaveLength(24);
    expect(project.checks).toHaveLength(76);
    expect(new Set(project.steps.map((step) => step.interaction))).toEqual(
      new Set(['read', 'code', 'predict', 'inspect', 'arrange', 'debug', 'answer', 'reflect'])
    );
    expect(
      new Set(project.checks.flatMap((check) => ('file' in check ? [check.file] : [])))
    ).toEqual(new Set(['html', 'css']));
    const finalCodeStep = project.steps.findLast((step) => step.interaction === 'code');
    expect(finalCodeStep?.checkIds).toHaveLength(52);
    expect(finalCodeStep?.checkIds).toEqual(
      expect.arrayContaining(
        project.steps.find((step) => step.interaction === 'code')?.checkIds ?? []
      )
    );
  });

  it('builds responsive systems from content failures through a multivariable test matrix', () => {
    const responsiveModule = graph.modules.find(
      (entry) => entry.id === 'responsive-systems-content-out'
    );
    if (!responsiveModule) throw new Error('responsive-systems-content-out fixture is missing');
    const activities = graph.activities.filter((entry) => entry.moduleId === responsiveModule.id);

    expect(activities).toHaveLength(12);
    expect(activities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(212);
    expect(activities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      responsiveModule.competencyIds
    );
    expect(activities.find((entry) => entry.id === 'mapped-workshop-piano')?.steps).toHaveLength(
      64
    );
    expect(
      activities.find((entry) => entry.id === 'responsive-design-transfer-lab')?.steps
    ).toHaveLength(20);
    expect(
      activities.find((entry) => entry.id === 'mapped-review-responsive-web-design')?.steps
    ).toHaveLength(24);
    expect(
      activities.find((entry) => entry.id === 'mapped-quiz-responsive-web-design')?.steps
    ).toHaveLength(36);
    expect(
      activities
        .flatMap((entry) => entry.checks)
        .some(
          (check) =>
            check.type === 'source-includes' &&
            check.file === 'html' &&
            check.expected.includes('Responsive verification matrix')
        )
    ).toBe(true);
  });

  it('requires the credentialed developer field manual with responsive navigation evidence', () => {
    const project = graph.activities.find(
      (entry) => entry.id === 'mapped-lab-technical-documentation-page'
    );
    if (!project) throw new Error('Developer Field Manual project is missing');

    expect(project.kind).toBe('project');
    expect(project.artifactId).toBe('developer-field-manual');
    expect(graph.course.credential.requiredProjectIds).toContain(project.artifactId);
    expect(project.steps).toHaveLength(50);
    expect(project.steps.filter((step) => step.interaction === 'code')).toHaveLength(25);
    expect(project.checks).toHaveLength(86);
    expect(new Set(project.steps.map((step) => step.interaction))).toEqual(
      new Set(['read', 'code', 'predict', 'inspect', 'arrange', 'debug', 'answer', 'reflect'])
    );
    expect(
      new Set(project.checks.flatMap((check) => ('file' in check ? [check.file] : [])))
    ).toEqual(new Set(['html', 'css']));
    expect(project.steps.findLast((step) => step.interaction === 'code')?.checkIds).toHaveLength(
      61
    );
  });

  it('teaches custom-property cascade, computed failures, semantic tokens, and registration', () => {
    const tokenModule = graph.modules.find(
      (entry) => entry.id === 'custom-properties-design-tokens'
    );
    if (!tokenModule) throw new Error('custom-properties-design-tokens fixture is missing');
    const activities = graph.activities.filter((entry) => entry.moduleId === tokenModule.id);

    expect(activities).toHaveLength(10);
    expect(activities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(246);
    expect(activities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      tokenModule.competencyIds
    );
    expect(
      activities.find((entry) => entry.id === 'mapped-workshop-city-skyline')?.steps
    ).toHaveLength(128);
    expect(
      activities.find((entry) => entry.id === 'mapped-lab-availability-table')?.steps
    ).toHaveLength(16);
    expect(
      activities.find((entry) => entry.id === 'mapped-review-css-variables')?.steps
    ).toHaveLength(24);
    expect(
      activities.find((entry) => entry.id === 'mapped-quiz-css-variables')?.steps
    ).toHaveLength(30);
  });

  it('teaches Grid algorithms, source-order safety, subgrid, and evidence-driven debugging', () => {
    const gridModule = graph.modules.find(
      (entry) => entry.id === 'two-dimensional-grid-layout-debugging'
    );
    if (!gridModule) throw new Error('two-dimensional-grid-layout-debugging fixture is missing');
    const activities = graph.activities.filter((entry) => entry.moduleId === gridModule.id);

    expect(activities).toHaveLength(14);
    expect(activities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(254);
    expect(activities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      gridModule.competencyIds
    );
    expect(activities.find((entry) => entry.id === 'mapped-workshop-magazine')?.steps).toHaveLength(
      96
    );
    expect(
      activities.find((entry) => entry.id === 'mapped-lab-newspaper-layout')?.steps
    ).toHaveLength(20);
    expect(activities.find((entry) => entry.id === 'mapped-review-css-grid')?.steps).toHaveLength(
      24
    );
    expect(activities.find((entry) => entry.id === 'mapped-quiz-css-grid')?.steps).toHaveLength(30);
  });

  it('requires the credentialed ethical launch with honest claims, media, form, and state proof', () => {
    const project = graph.activities.find(
      (entry) => entry.id === 'mapped-lab-product-landing-page'
    );
    if (!project) throw new Error('Ethical Product Launch project is missing');

    expect(project.kind).toBe('project');
    expect(project.artifactId).toBe('ethical-learning-product-launch');
    expect(graph.course.credential.requiredProjectIds).toContain(project.artifactId);
    expect(project.steps).toHaveLength(52);
    expect(project.steps.filter((step) => step.interaction === 'code')).toHaveLength(26);
    expect(project.checks).toHaveLength(93);
    expect(new Set(project.steps.map((step) => step.interaction))).toEqual(
      new Set(['read', 'code', 'predict', 'inspect', 'arrange', 'debug', 'answer', 'reflect'])
    );
    expect(
      new Set(project.checks.flatMap((check) => ('file' in check ? [check.file] : [])))
    ).toEqual(new Set(['html', 'css']));
    expect(project.steps.findLast((step) => step.interaction === 'code')?.checkIds).toHaveLength(
      67
    );
  });

  it('teaches purposeful motion with performance, reduced-motion, and composition evidence', () => {
    const motionModule = graph.modules.find(
      (entry) => entry.id === 'purposeful-accessible-motion-systems'
    );
    if (!motionModule) throw new Error('purposeful-accessible-motion-systems fixture is missing');
    const activities = graph.activities.filter((entry) => entry.moduleId === motionModule.id);

    expect(activities).toHaveLength(13);
    expect(activities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(318);
    expect(activities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      motionModule.competencyIds
    );
    expect(
      activities.find((entry) => entry.id === 'mapped-workshop-ferris-wheel')?.steps
    ).toHaveLength(48);
    expect(
      activities.find((entry) => entry.id === 'mapped-workshop-flappy-penguin')?.steps
    ).toHaveLength(120);
    expect(
      activities.find((entry) => entry.id === 'mapped-lab-personal-portfolio')?.steps
    ).toHaveLength(20);
    expect(
      activities.find((entry) => entry.id === 'mapped-quiz-css-animations')?.steps
    ).toHaveLength(30);
  });

  it('runs a sixteen-incident cumulative CSS review with retained code checks', () => {
    const review = graph.activities.find((entry) => entry.id === 'mapped-review-css');
    if (!review) throw new Error('Cumulative CSS review is missing');

    expect(review.kind).toBe('review');
    expect(review.steps).toHaveLength(128);
    expect(review.steps.filter((step) => step.interaction === 'code')).toHaveLength(16);
    expect(review.checks).toHaveLength(144);
    expect(new Set(review.steps.map((step) => step.interaction))).toEqual(
      new Set(['read', 'code', 'predict', 'inspect', 'arrange', 'debug', 'answer', 'reflect'])
    );
    const codeSteps = review.steps.filter((step) => step.interaction === 'code');
    expect(codeSteps.at(-1)?.checkIds).toEqual(expect.arrayContaining(codeSteps[0].checkIds));
  });

  it('finishes the full certification map with thousands of original interactions', () => {
    expect(graph.modules).toHaveLength(29);
    expect(graph.course.competencies).toHaveLength(138);
    expect(graph.activities).toHaveLength(303);
    expect(graph.activities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(4_855);
    expect(graph.activities.reduce((total, entry) => total + entry.checks.length, 0)).toBe(5_407);
  });

  it('uses the mapped certification exam as a cumulative credential gate', () => {
    const exam = graph.activities.find(
      (entry) => entry.id === 'mapped-exam-responsive-web-design-certification'
    );
    if (!exam) throw new Error('Responsive Web Design certification exam is missing');

    expect(graph.course.credential.finalExamId).toBe(exam.id);
    expect(exam.kind).toBe('exam');
    expect(exam.steps).toHaveLength(176);
    expect(exam.steps.filter((step) => step.interaction === 'code')).toHaveLength(22);
    expect(exam.checks).toHaveLength(196);
    expect(new Set(exam.steps.map((step) => step.interaction))).toEqual(
      new Set(['read', 'code', 'predict', 'inspect', 'arrange', 'debug', 'answer', 'reflect'])
    );
    expect(new Set(exam.checks.flatMap((check) => ('file' in check ? [check.file] : [])))).toEqual(
      new Set(['html', 'css'])
    );
    expect(exam.steps.findLast((step) => step.interaction === 'code')?.checkIds).toHaveLength(42);
  });

  it('teaches typography as font resources, metrics, reading rhythm, and resilient content', () => {
    const typeModule = graph.modules.find((entry) => entry.id === 'readable-responsive-typography');
    if (!typeModule) throw new Error('readable-responsive-typography fixture is missing');
    const activities = graph.activities.filter((entry) => entry.moduleId === typeModule.id);

    expect(activities).toHaveLength(11);
    expect(activities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(189);
    expect(activities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      typeModule.competencyIds
    );
    expect(
      activities.find((entry) => entry.id === 'mapped-workshop-nutritional-label')?.steps
    ).toHaveLength(68);
    expect(
      activities.find((entry) => entry.id === 'mapped-lab-newspaper-article')?.steps
    ).toHaveLength(16);
    expect(
      activities.find((entry) => entry.id === 'mapped-review-css-typography')?.steps
    ).toHaveLength(20);
    expect(
      activities.find((entry) => entry.id === 'mapped-quiz-css-typography')?.steps
    ).toHaveLength(30);
    expect(activities.every((entry) => entry.artifactId === 'volunteer-shift-deck')).toBe(true);
  });

  it('repeats CSS accessibility checks across zoom, hidden states, preferences, and targets', () => {
    const accessModule = graph.modules.find(
      (entry) => entry.id === 'accessible-css-preferences-regression'
    );
    if (!accessModule) throw new Error('accessible-css-preferences-regression fixture is missing');
    const activities = graph.activities.filter((entry) => entry.moduleId === accessModule.id);

    expect(activities).toHaveLength(11);
    expect(activities.reduce((total, entry) => total + entry.steps.length, 0)).toBe(187);
    expect(activities.flatMap((entry) => entry.competencyCoverage.introduces)).toEqual(
      accessModule.competencyIds
    );
    expect(
      activities.find((entry) => entry.id === 'mapped-workshop-accessibility-quiz')?.steps
    ).toHaveLength(67);
    expect(activities.find((entry) => entry.id === 'mapped-lab-tribute-page')?.steps).toHaveLength(
      16
    );
    expect(
      activities.find((entry) => entry.id === 'mapped-review-css-accessibility')?.steps
    ).toHaveLength(20);
    expect(
      activities.find((entry) => entry.id === 'mapped-quiz-css-accessibility')?.steps
    ).toHaveLength(30);
    expect(
      activities
        .flatMap((entry) => entry.checks)
        .some(
          (check) =>
            check.type === 'source-includes' &&
            check.file === 'html' &&
            check.expected.includes('CSS accessibility regression record')
        )
    ).toBe(true);
  });

  it('identifies every code artifact and keeps earlier code checks active', () => {
    const codeActivities = graph.activities.filter((entry) =>
      entry.steps.some((step) => step.interaction === 'code')
    );
    expect(codeActivities.length).toBeGreaterThan(20);
    for (const entry of codeActivities) {
      expect(entry.artifactId, entry.id).toBeTruthy();
      let earlierCodeCheckIds = new Set<string>();
      for (const step of entry.steps) {
        if (step.interaction !== 'code') continue;
        expect(step.checkIds, `${entry.id}/${step.id}`).toEqual(
          expect.arrayContaining([...earlierCodeCheckIds])
        );
        earlierCodeCheckIds = new Set(step.checkIds);
      }
    }
  });

  it('contains no exact duplicated step prose, hints, or answer choices', () => {
    const steps = graph.activities.flatMap((entry) => entry.steps);
    const values = [
      steps.map((step) => step.title),
      steps.map((step) => step.instruction),
      steps.map((step) => step.why),
      steps.flatMap((step) => step.hints),
    ];
    values.forEach((entries) => {
      expect(new Set(entries).size).toBe(entries.length);
    });
    graph.activities.forEach((entry) => {
      const options = entry.steps.flatMap(
        (step) => step.options?.map((option) => option.text) ?? []
      );
      expect(new Set(options).size).toBe(options.length);
    });
  });

  it('uses varied interactions instead of one repeated lesson template', () => {
    expect(new Set(activity.steps.map((step) => step.interaction)).size).toBeGreaterThanOrEqual(6);
    expect(activity.steps.map((step) => step.interaction)).toEqual([
      'predict',
      'arrange',
      'inspect',
      'read',
      'predict',
      'arrange',
      'inspect',
      'debug',
      'code',
      'reflect',
    ]);
  });

  it('requires every later step to point back to earlier completed work', () => {
    const seen = new Set<string>();
    activity.steps.forEach((step, index) => {
      if (index === 0) expect(step.buildsOnStepIds).toEqual([]);
      else expect(step.buildsOnStepIds.length).toBeGreaterThan(0);
      step.buildsOnStepIds.forEach((stepId) => {
        expect(seen.has(stepId)).toBe(true);
      });
      seen.add(step.id);
    });
  });

  it('keeps repaired document requirements in the next coding increment', () => {
    const debugStep = activity.steps.find((step) => step.id === 'debug-document-shell');
    const buildStep = activity.steps.find((step) => step.id === 'build-main-region');
    expect(debugStep?.checkIds).toEqual(['check-html-language', 'check-page-title']);
    expect(buildStep?.checkIds).toEqual(
      expect.arrayContaining(['check-html-language', 'check-page-title', 'check-main-region'])
    );
  });

  it('does not ship canonical hints or hidden requirements to the browser', () => {
    const learner = toLearnerActivity(activity);
    expect(JSON.stringify(learner)).not.toContain('Use <main><h1>');
    expect(JSON.stringify(learner)).not.toContain('check-main-heading');
  });
});
