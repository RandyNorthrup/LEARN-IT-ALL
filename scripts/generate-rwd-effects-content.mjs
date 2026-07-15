import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'community-needs-survey';
const starterFiles = {
  html: '<!-- Continue the Community Needs Survey geometry and effects work here. -->',
  css: '/* Continue the overflow, geometry, and effects system here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-overflow',
    activityId: 'overflow-access-forensics',
    title: 'Choose Overflow without Hiding Content or Focus',
    context: 'long translated survey status card incident',
    concept:
      'Overflow visible paints beyond a box, hidden clips and creates a scroll container without visible scrollbars, clip clips without scrolling, auto adds scrolling when needed, and scroll always creates a scrolling mechanism. Clipping can hide text, focus indicators, sticky content, and keyboard destinations. Repair the sizing cause before choosing an intentional overflow behavior.',
    misconception:
      'Overflow hidden is a harmless way to repair any layout that extends beyond a card.',
    correct:
      'Identify the overflowing content and sizing cause, preserve access, and use auto, scroll, clip, hidden, or visible only for an intentional contract.',
    distractors: [
      'Apply overflow hidden to the body so no component can cause horizontal scrolling.',
      'Use overflow clip on every focusable card because clipped focus is still keyboard reachable.',
    ],
    sequence: [
      'Locate the exact overflowing box and content',
      'Inspect intrinsic size min size wrapping and containing block',
      'Repair the constraint or choose an intentional scroll or clipping contract',
      'Test long text zoom focus touch and keyboard scrolling',
    ],
    terms: ['overflow', 'focus', 'scroll'],
    prerequisiteIds: ['css-form-autofill-motion'],
    requirements: [
      ['status-scroll', '.status-panel {\n  max-block-size: 20rem;\n  overflow: auto;\n}'],
      ['long-token-wrap', '.survey-card {\n  overflow-wrap: anywhere;\n}'],
      ['decorative-clip', '.decorative-frame {\n  overflow: clip;\n}'],
    ],
  },
  {
    id: 'css-sizing-constraints',
    activityId: 'intrinsic-constraint-lab',
    title: 'Constrain Components without Fixed-Height Traps',
    context: 'variable-content survey card alignment review',
    concept:
      'Min and max sizes create safe bounds; min-content and max-content expose intrinsic contributions; fit-content() combines available and intrinsic limits; aspect-ratio supplies a preferred ratio; and min-inline-size zero may allow flexible children to shrink. Fixed heights often clip translated, zoomed, or user-sized content.',
    misconception: 'Fixed height is the most reliable way to keep cards aligned.',
    correct:
      'Use intrinsic sizing and min or max constraints, allow content-driven block growth, and test extreme content before adding fixed dimensions.',
    distractors: [
      'Set identical block-size on every card and hide anything that exceeds it.',
      'Use max-content for every narrow-screen control because intrinsic width always fits the viewport.',
    ],
    sequence: [
      'Inventory minimum readable content and maximum useful measure',
      'Choose intrinsic size aspect ratio and min or max constraints',
      'Allow block size to grow with content',
      'Test shortest longest translated zoomed and missing-content states',
    ],
    terms: ['intrinsic', 'minimum', 'aspect-ratio'],
    prerequisiteIds: ['css-overflow'],
    requirements: [
      [
        'card-width-bound',
        '.survey-card {\n  inline-size: min(100%, 42rem);\n  min-inline-size: 0;\n}',
      ],
      ['growing-card', '.survey-card {\n  min-block-size: 12rem;\n  block-size: auto;\n}'],
      ['media-ratio', '.survey-card-media {\n  aspect-ratio: 16 / 9;\n  inline-size: 100%;\n}'],
      ['fit-content-label', '.status-label {\n  inline-size: fit-content(100%);\n}'],
    ],
  },
  {
    id: 'css-transforms',
    activityId: 'transform-geometry-studio',
    title: 'Separate Visual Transforms from Document Flow',
    context: 'survey status badge transform collision',
    concept:
      'Translate, rotate, scale, and skew change an element’s painted geometry without moving its original layout box or reflowing neighbors. Transform functions apply in sequence, transform-origin sets the reference point, and individual translate, rotate, and scale properties can make composition clearer. Transforms may create stacking and containing contexts.',
    misconception: 'Transforms move surrounding layout boxes and create space for neighbors.',
    correct:
      'Calculate original and painted geometry separately, compose transforms in a known order, and reserve layout space without relying on transformed bounds.',
    distractors: [
      'Translate a card downward to make following content move down with it.',
      'Assume rotate then translate always produces the same result as translate then rotate.',
    ],
    sequence: [
      'Record the original layout box and transform origin',
      'Apply transform functions in written order',
      'Predict painted bounds and stacking effects',
      'Inspect collisions focus hit targets and reduced-motion behavior',
    ],
    terms: ['transform', 'flow', 'origin'],
    prerequisiteIds: ['css-sizing-constraints'],
    requirements: [
      ['badge-origin', '.status-badge {\n  transform-origin: center;\n}'],
      ['badge-translate', '.status-badge {\n  translate: 0 -0.125rem;\n}'],
      ['badge-scale', '.status-badge[data-priority="high"] {\n  scale: 1.05;\n}'],
      ['decorative-rotate', '.decorative-stamp {\n  rotate: -2deg;\n}'],
    ],
  },
  {
    id: 'css-filters',
    activityId: 'filter-fallback-review',
    title: 'Use Filters without Carrying Essential Meaning',
    context: 'survey illustration and status contrast review',
    concept:
      'Filter functions such as blur, brightness, contrast, grayscale, hue-rotate, saturate, sepia, opacity, and drop-shadow alter rendered pixels and can trigger extra compositing work. They do not understand text or image meaning and cannot reliably repair arbitrary contrast. Essential content needs an unfiltered readable path and effects need performance and preference checks.',
    misconception: 'A brightness filter reliably repairs contrast for arbitrary images and text.',
    correct:
      'Use filters only for bounded visual treatment, preserve an unfiltered fallback, and remeasure contrast, legibility, and performance on actual content.',
    distractors: [
      'Blur required instructions until hover so the form looks less crowded.',
      'Hue-rotate every status icon and assume users understand the new state colors.',
    ],
    sequence: [
      'Classify the content as essential or decorative',
      'Choose a bounded filter and unfiltered fallback',
      'Inspect contrast edges text and compositing cost',
      'Test disabled effects forced colors print and reduced capability',
    ],
    terms: ['filter', 'fallback', 'contrast'],
    prerequisiteIds: ['css-transforms'],
    requirements: [
      ['decorative-filter', '.decorative-photo {\n  filter: saturate(0.9) contrast(1.05);\n}'],
      ['filter-hover', '.decorative-photo:hover {\n  filter: none;\n}'],
      [
        'filter-fallback',
        '@media (forced-colors: active) {\n  .decorative-photo {\n    filter: none;\n  }\n}',
      ],
    ],
  },
  {
    id: 'css-shadows-depth',
    activityId: 'depth-cue-boundary-lab',
    title: 'Use Shadows as Secondary Depth Cues',
    context: 'survey card elevation and focus ambiguity audit',
    concept:
      'Box-shadow paints around a box and text-shadow around glyphs. Offset, blur, spread, color, inset, and multiple layers shape the effect. Shadows can support grouping or elevation but may disappear in forced colors, print, low-quality displays, or user styles. Real borders, spacing, headings, and focus indicators must preserve the relationship.',
    misconception: 'More shadows always make interactive elevation clearer.',
    correct:
      'Use restrained shadows as secondary presentation and keep boundaries, hierarchy, and focus understandable with shadows removed.',
    distractors: [
      'Use a shadow as the only focus indicator because it looks softer than an outline.',
      'Stack many large blur layers on every control to increase discoverability.',
    ],
    sequence: [
      'Identify the grouping or elevation relationship',
      'Create a restrained shadow with a real structural fallback',
      'Check overlap contrast and rendering cost',
      'Disable shadows and verify boundaries hierarchy and focus remain clear',
    ],
    terms: ['shadow', 'boundary', 'focus'],
    prerequisiteIds: ['css-filters'],
    requirements: [
      ['card-boundary', '.survey-card {\n  border: 0.125rem solid #94a3b8;\n}'],
      ['card-shadow', '.survey-card {\n  box-shadow: 0 0.5rem 1.25rem rgb(15 23 42 / 0.12);\n}'],
      ['status-inset', '.status-panel {\n  box-shadow: inset 0 0 0 1px rgb(7 89 133 / 0.25);\n}'],
    ],
  },
  {
    id: 'css-containment-effects',
    activityId: 'stacking-context-map',
    title: 'Map Stacking and Containing Context Boundaries',
    context: 'survey overlay trapped beneath sibling card',
    concept:
      'Transforms, filters, opacity below one, isolation, positioned elements with z-index, containment, and other properties can create stacking contexts. Descendant z-index values compete only inside their context; they do not compare globally. Some effects also establish containing blocks for positioned descendants. Paint order starts with context boundaries, not the largest number.',
    misconception: 'Z-index values compare globally across every element on the page.',
    correct:
      'Draw the stacking-context tree and containing blocks, compare sibling contexts first, and change the boundary rather than escalating descendant z-index.',
    distractors: [
      'Set the trapped child to z-index 999999 because large values escape ancestor contexts.',
      'Add transforms to every component so each has independent global z-index control.',
    ],
    sequence: [
      'Identify the overlapping elements and their ancestor chains',
      'Mark every property that creates a stacking or containing context',
      'Compare sibling contexts and local descendant paint order',
      'Remove or relocate the unintended boundary and retest focus and clipping',
    ],
    terms: ['stacking context', 'z-index', 'ancestor'],
    prerequisiteIds: ['css-shadows-depth'],
    requirements: [
      ['isolated-shell', '.survey-shell {\n  isolation: isolate;\n}'],
      ['local-overlay', '.survey-overlay {\n  position: absolute;\n  z-index: 2;\n}'],
      ['local-card', '.survey-card {\n  position: relative;\n  z-index: 1;\n}'],
      ['context-comment', '/* z-index compares inside the nearest stacking context. */'],
    ],
  },
  {
    id: 'css-effects-debugging',
    activityId: 'effects-reduction-debug-lab',
    title: 'Debug Effects through Reduced Cases and Computed Evidence',
    context: 'clipping stacking and transform production incident',
    concept:
      'Effect bugs often combine overflow, transforms, filters, opacity, containment, positioning, and stacking. A reduced case preserves the failing relationship while removing unrelated styling. Computed styles, layout and paint overlays, stacking-context inspection, and property toggles reveal which boundary creates the defect. Raising z-index without a model usually adds noise.',
    misconception: 'Raising z-index repeatedly is a dependable stacking-context fix.',
    correct:
      'Reduce the case, toggle one context-creating or clipping property at a time, record computed evidence, and repair the first causal boundary.',
    distractors: [
      'Rewrite all component CSS because isolated property toggles cannot represent production.',
      'Keep adding overflow hidden and z-index until the screenshot matches.',
    ],
    sequence: [
      'Capture the exact overlap clipping focus and viewport conditions',
      'Remove unrelated content and styles while preserving failure',
      'Toggle overflow transform filter opacity containment and positioning individually',
      'Repair the earliest causal boundary and rerun full interaction states',
    ],
    terms: ['reduced case', 'computed', 'boundary'],
    prerequisiteIds: ['css-containment-effects'],
    requirements: [
      [
        'debug-outline',
        '[data-debug="geometry"] * {\n  outline: 1px solid rgb(220 38 38 / 0.65);\n}',
      ],
      ['debug-transform', '[data-debug="geometry"] .survey-card {\n  transform: none;\n}'],
      ['debug-filter', '[data-debug="geometry"] .decorative-photo {\n  filter: none;\n}'],
      ['debug-comment', '/* Toggle one clipping or context-creating property at a time. */'],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-working-with-css-transforms-overflow-and-filters': {
    title: 'Trace Overflow, Geometry, Filters, and Contexts',
    context: 'community survey layout and paint evidence lab',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-rothko-painting': {
    title: 'Workshop: Build an Accessible Heat-Index Art Panel',
    context: 'decorative layered heat-index poster beside semantic status text',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-confidential-email-page': {
    title: 'Lab: Repair a Restricted Volunteer Notice',
    context: 'unfamiliar clipping stacking and transformed-label incident',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 16,
  },
  'mapped-review-css-layout-and-effects': {
    title: 'Retrieval Review: Overflow, Geometry, and Effects',
    context: 'changed content paint and context constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
  },
  'mapped-quiz-css-layout-and-effects': {
    title: 'Mastery Exam: Overflow, Geometry, and Effects',
    context: 'independent multi-effect production incident',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 30,
  },
};

const milestones = [
  ['Create an intentional status scroll region', 'overflow: auto;', 'css-overflow'],
  ['Wrap long unbroken content', 'overflow-wrap: anywhere;', 'css-overflow'],
  ['Clip only decorative paint', '.decorative-frame {\n  overflow: clip;', 'css-overflow'],
  [
    'Document focus access through overflow',
    '/* Scroll and focus destinations remain reachable. */',
    'css-overflow',
  ],
  [
    'Bound card inline size intrinsically',
    'inline-size: min(100%, 42rem);',
    'css-sizing-constraints',
  ],
  ['Allow flexible content to shrink', 'min-inline-size: 0;', 'css-sizing-constraints'],
  ['Allow card block growth', 'block-size: auto;', 'css-sizing-constraints'],
  ['Preserve media aspect ratio', 'aspect-ratio: 16 / 9;', 'css-sizing-constraints'],
  ['Set a transform origin', 'transform-origin: center;', 'css-transforms'],
  ['Translate a badge without claiming layout space', 'translate: 0 -0.125rem;', 'css-transforms'],
  ['Scale a priority badge slightly', 'scale: 1.05;', 'css-transforms'],
  ['Rotate only decorative paint', 'rotate: -2deg;', 'css-transforms'],
  ['Filter only decorative imagery', 'filter: saturate(0.9) contrast(1.05);', 'css-filters'],
  [
    'Provide an unfiltered interaction state',
    '.decorative-photo:hover {\n  filter: none;',
    'css-filters',
  ],
  ['Remove filters in forced colors', '@media (forced-colors: active) {', 'css-filters'],
  [
    'Document unfiltered content fallback',
    '/* Required content remains readable without filters. */',
    'css-filters',
  ],
  ['Keep a real card boundary', 'border: 0.125rem solid #94a3b8;', 'css-shadows-depth'],
  [
    'Add restrained card depth',
    'box-shadow: 0 0.5rem 1.25rem rgb(15 23 42 / 0.12);',
    'css-shadows-depth',
  ],
  [
    'Add a restrained inset cue',
    'box-shadow: inset 0 0 0 1px rgb(7 89 133 / 0.25);',
    'css-shadows-depth',
  ],
  [
    'Document shadow-independent focus',
    '/* Boundaries and focus remain clear with shadows disabled. */',
    'css-shadows-depth',
  ],
  ['Isolate survey stacking intentionally', 'isolation: isolate;', 'css-containment-effects'],
  ['Position the local overlay', 'position: absolute;\n  z-index: 2;', 'css-containment-effects'],
  [
    'Position the local card context',
    'position: relative;\n  z-index: 1;',
    'css-containment-effects',
  ],
  [
    'Document local z-index comparison',
    '/* z-index compares inside the nearest stacking context. */',
    'css-containment-effects',
  ],
  ['Expose geometry debug outlines', '[data-debug="geometry"] * {', 'css-effects-debugging'],
  ['Disable transforms in the reduced case', 'transform: none;', 'css-effects-debugging'],
  ['Disable filters in the reduced case', 'filter: none;', 'css-effects-debugging'],
  [
    'Document one-property toggles',
    '/* Toggle one clipping or context-creating property at a time. */',
    'css-effects-debugging',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'css-box-model',
  moduleId: 'css-overflow-effects-geometry',
  title: 'Overflow, Effects, and Transform Geometry',
  description:
    'Preserve access through overflow, constrain variable content intrinsically, distinguish transformed paint from layout, use filters and shadows as secondary effects, map stacking contexts, and debug combined failures through reduced evidence.',
  order: 14,
  objectives: [
    'Choose intentional overflow behavior while preserving long content, zoom, scrolling, and keyboard focus.',
    'Use intrinsic min, max, aspect-ratio, and content-driven block sizing instead of fixed-height clipping.',
    'Predict transform geometry and keep filters, shadows, and decorative paint nonessential and preference-safe.',
    'Explain stacking-context boundaries and isolate effect defects with reduced cases and computed evidence.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: [
    'css-form-autofill-motion',
    'css-box-model',
    'accessibility-test-strategy',
  ],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'answer', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'resilient-form-interface-design',
  priorLastActivityId: 'mapped-quiz-styling-forms',
  insertAfterCompetencyId: 'css-form-autofill-motion',
  insertAfterModuleId: 'resilient-form-interface-design',
  estimatedHours: 1470,
  milestones,
  mappedPlans,
  activityIds: [
    'overflow-access-forensics',
    'intrinsic-constraint-lab',
    'transform-geometry-studio',
    'filter-fallback-review',
    'depth-cue-boundary-lab',
    'stacking-context-map',
    'effects-reduction-debug-lab',
    'mapped-lecture-working-with-css-transforms-overflow-and-filters',
    'mapped-workshop-rothko-painting',
    'mapped-lab-confidential-email-page',
    'mapped-review-css-layout-and-effects',
    'mapped-quiz-css-layout-and-effects',
  ],
});

console.log(
  `Generated CSS Effects and Geometry: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
