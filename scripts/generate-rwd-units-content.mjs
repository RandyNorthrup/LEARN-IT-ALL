import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'community-needs-survey';
const starterFiles = {
  html: '<!-- Continue the Community Needs Survey sizing work here. -->',
  css: '/* Continue the bounded responsive sizing system here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-absolute-units',
    activityId: 'absolute-unit-medium-lab',
    title: 'Choose Absolute Units from Output Medium',
    context: 'screen and printed relief-pass sizing review',
    concept:
      'CSS absolute units include px, in, cm, mm, q, pt, and pc. On screens, a CSS pixel is a reference unit and may map to multiple physical pixels depending on device scale and zoom. Physical units are most meaningful in controlled print output. Unit choice follows the output medium, user zoom, and the thing being measured—not a blanket rule that pixels are inaccessible.',
    misconception: 'CSS pixels always correspond to one physical device pixel.',
    correct:
      'Choose px for suitable screen-relative details and physical units for controlled print constraints, then verify zoom and actual output.',
    distractors: [
      'Use centimeters for all screen text because physical measurements are always more consistent.',
      'Avoid every absolute unit because a one-pixel border can never zoom.',
    ],
    sequence: [
      'Identify screen print or another output medium',
      'State whether the measure is detail typography spacing or physical output',
      'Choose the unit whose reference behavior matches that constraint',
      'Verify browser zoom device scaling and printed dimensions as applicable',
    ],
    terms: ['CSS pixel', 'medium', 'zoom'],
    prerequisiteIds: ['design-spacing-alignment', 'design-prototype-test'],
    requirements: [
      ['screen-divider', '.survey-divider {\n  border-block-end: 1px solid currentColor;\n}'],
      ['print-pass', '@media print {\n  .relief-pass {\n    width: 90mm;\n  }\n}'],
    ],
  },
  {
    id: 'css-font-relative-units',
    activityId: 'font-relative-reference-map',
    title: 'Trace Font-Relative Reference Contexts',
    context: 'survey typography and component scaling audit',
    concept:
      'Rem resolves from the root font size; em usually resolves from the element font size and can compound when used for font-size; ch approximates the width of the zero glyph; lh follows line height; rlh follows root line height. Font-relative units can respect user preferences, but only when their reference context and compounding behavior are understood.',
    misconception: 'An em value always refers to the root font size.',
    correct:
      'Name the reference for each property, calculate nested results, and test root font changes plus long content before choosing rem, em, ch, or lh.',
    distractors: [
      'Use em at every nesting level because compounding always preserves the same visual size.',
      'Use ch as an exact physical character count for every font and language.',
    ],
    sequence: [
      'Identify the property and the element where it is declared',
      'Name the root element or font metric that supplies its reference',
      'Calculate nested and inherited results',
      'Change root font size content and language and inspect the outcome',
    ],
    terms: ['rem', 'em', 'reference'],
    prerequisiteIds: ['css-absolute-units'],
    requirements: [
      ['root-relative-heading', '.survey-hero h1 {\n  font-size: 2rem;\n}'],
      ['component-relative-padding', '.primary-action {\n  padding: 0.75em 1.25em;\n}'],
      ['reading-measure-ch', '.survey-content {\n  max-inline-size: 68ch;\n}'],
      ['line-height-spacing', '.field-group {\n  margin-block-end: 1lh;\n}'],
    ],
  },
  {
    id: 'css-percentage-units',
    activityId: 'percentage-basis-forensics',
    title: 'Find the Correct Percentage Basis',
    context: 'nested survey panel percentage overflow incident',
    concept:
      'A percentage has a property-specific basis. Inline size usually resolves against the containing block’s inline size; percentage block size needs a definite reference; padding and margin percentages use the containing block’s inline size in normal writing modes; transforms use the transformed box. Naming the containing block and property basis prevents viewport guesses.',
    misconception: 'Every percentage resolves against viewport width.',
    correct:
      'Identify the property, containing block, writing mode, and definite dimensions, then calculate and measure the percentage result.',
    distractors: [
      'Assume fifty percent means half the element’s own current size for every property.',
      'Replace every percentage with viewport width because the viewport is always the containing block.',
    ],
    sequence: [
      'Identify the percentage property and target element',
      'Find its containing block and property-specific reference dimension',
      'Determine whether the reference size is definite',
      'Calculate expected size and compare it with DevTools at changed nesting',
    ],
    terms: ['percentage', 'containing block', 'basis'],
    prerequisiteIds: ['css-font-relative-units'],
    requirements: [
      [
        'full-inline-control',
        '.field-group :is(input, select, textarea) {\n  inline-size: 100%;\n}',
      ],
      [
        'bounded-panel',
        '.survey-panel {\n  inline-size: 92%;\n  max-inline-size: 52rem;\n  margin-inline: auto;\n}',
      ],
      ['half-row-note', '.row-note {\n  inline-size: 50%;\n}'],
    ],
  },
  {
    id: 'css-viewport-dynamic-units',
    activityId: 'mobile-viewport-height-lab',
    title: 'Use Viewport Units without Hiding Content',
    context: 'mobile browser controls obscuring survey actions',
    concept:
      'Vw and vh use default viewport dimensions. Svh and svw represent the small viewport, lvh and lvw the large viewport, and dvh and dvw track the dynamic visible viewport as browser UI changes. A fixed 100vh section can place content behind mobile controls. Prefer natural flow or min-block-size, provide fallbacks, and test zoom, orientation, keyboards, and browser chrome.',
    misconception: 'One hundred vh always equals the visible mobile screen height.',
    correct:
      'Use natural content flow first, choose small or dynamic viewport units for a proven need, and verify controls never obscure or trap content.',
    distractors: [
      'Set height to 100vh and overflow hidden so mobile browser controls cannot change the layout.',
      'Use 100vw for every page wrapper even when a scrollbar consumes inline space.',
    ],
    sequence: [
      'Confirm the task truly needs a viewport-relative minimum',
      'Choose small large dynamic or default viewport behavior deliberately',
      'Use min size and content overflow rather than a rigid clipping height',
      'Test browser controls keyboard orientation zoom and long content',
    ],
    terms: ['dvh', 'mobile', 'overflow'],
    prerequisiteIds: ['css-percentage-units'],
    requirements: [
      ['viewport-fallback', '.survey-page {\n  min-block-size: 100vh;\n}'],
      [
        'small-viewport-minimum',
        '@supports (min-height: 100svh) {\n  .survey-page {\n    min-block-size: 100svh;\n  }\n}',
      ],
      ['dynamic-status-panel', '.status-panel {\n  max-block-size: 50dvh;\n  overflow: auto;\n}'],
    ],
  },
  {
    id: 'css-math-fluid-sizing',
    activityId: 'bounded-fluid-sizing-studio',
    title: 'Build Fluid Values with Hard Bounds',
    context: 'survey heading and spacing fluidity review',
    concept:
      'Min chooses the smallest candidate, max chooses the largest, clamp applies a minimum preferred value and maximum, and calc combines compatible values. Fluid values still need readable lower and upper bounds. The preferred expression may combine relative and viewport components, but zoom, long content, and extreme widths must not make text or controls unusable.',
    misconception:
      'Fluid values need no minimum or maximum because every viewport scales proportionally.',
    correct:
      'Write the minimum and maximum from usability constraints, build the preferred expression, and test every bound plus zoom and content changes.',
    distractors: [
      'Use only viewport-width text so every line scales in exact proportion to the screen.',
      'Put unrelated time and length units in one calc expression because calc converts any unit.',
    ],
    sequence: [
      'Define smallest and largest acceptable values from the task',
      'Choose a preferred relative or mixed expression',
      'Compose min max clamp or calc with compatible units',
      'Test below within and above bounds plus zoom and long content',
    ],
    terms: ['clamp', 'minimum', 'maximum'],
    prerequisiteIds: ['css-viewport-dynamic-units'],
    requirements: [
      ['fluid-heading', '.survey-hero h1 {\n  font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem);\n}'],
      [
        'fluid-section-space',
        '.survey-section + .survey-section {\n  margin-block-start: clamp(2rem, 1rem + 3vw, 4rem);\n}',
      ],
      ['bounded-shell', '.survey-shell {\n  inline-size: min(100% - 2rem, 52rem);\n}'],
      ['calculated-control', '.primary-action {\n  min-inline-size: calc(10ch + 2.5em);\n}'],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-working-with-relative-and-absolute-units': {
    title: 'Trace Unit References and Responsive Bounds',
    context: 'community survey sizing evidence lab',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-event-flyer-page': {
    title: 'Lab: Repair a Heat-Safety Event Flyer',
    context: 'unfamiliar print and mobile event flyer sizing incident',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-review-css-relative-and-absolute-units': {
    title: 'Retrieval Review: CSS Units and Bounded Fluid Sizing',
    context: 'changed output medium and viewport constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-quiz-css-relative-and-absolute-units': {
    title: 'Mastery Exam: CSS Units and Bounded Fluid Sizing',
    context: 'independent multi-medium sizing release decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
};

const extraPlans = {
  'absolute-and-relative-units-faded-build': {
    title: 'Faded Build: Create a Bounded Responsive Survey Shell',
    context: 'partially specified multi-viewport survey sizing sprint',
    kind: 'workshop',
    targetSteps: 32,
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
};

const milestones = [
  [
    'Create a one-CSS-pixel divider',
    'border-block-end: 1px solid currentColor;',
    'css-absolute-units',
  ],
  ['Size a printed relief pass in millimeters', 'width: 90mm;', 'css-absolute-units'],
  ['Create the print-medium boundary', '@media print {', 'css-absolute-units'],
  [
    'Document CSS-pixel reference behavior',
    '/* CSS px is a reference unit, not guaranteed one device pixel. */',
    'css-absolute-units',
  ],
  ['Set a print-safe point size exception', 'font-size: 11pt;', 'css-absolute-units'],
  ['Scale the hero heading from root text', 'font-size: 2rem;', 'css-font-relative-units'],
  [
    'Scale action padding from component text',
    'padding: 0.75em 1.25em;',
    'css-font-relative-units',
  ],
  ['Constrain reading measure with ch', 'max-inline-size: 68ch;', 'css-font-relative-units'],
  ['Space fields by line height', 'margin-block-end: 1lh;', 'css-font-relative-units'],
  [
    'Document em compounding risk',
    '/* em font sizes can compound through nested components. */',
    'css-font-relative-units',
  ],
  ['Fill the containing block inline size', 'inline-size: 100%;', 'css-percentage-units'],
  ['Create a percentage panel with a hard maximum', 'inline-size: 92%;', 'css-percentage-units'],
  ['Bound the percentage panel', 'max-inline-size: 52rem;', 'css-percentage-units'],
  ['Center the containing-block-relative panel', 'margin-inline: auto;', 'css-percentage-units'],
  ['Create a half-row note', '.row-note {\n  inline-size: 50%;\n}', 'css-percentage-units'],
  ['Provide a default viewport fallback', 'min-block-size: 100vh;', 'css-viewport-dynamic-units'],
  ['Prefer the small mobile viewport', 'min-block-size: 100svh;', 'css-viewport-dynamic-units'],
  ['Bound the dynamic status panel', 'max-block-size: 50dvh;', 'css-viewport-dynamic-units'],
  ['Preserve overflow access', 'overflow: auto;', 'css-viewport-dynamic-units'],
  [
    'Feature-detect small viewport units',
    '@supports (min-height: 100svh) {',
    'css-viewport-dynamic-units',
  ],
  [
    'Clamp fluid heading size',
    'font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem);',
    'css-math-fluid-sizing',
  ],
  [
    'Clamp responsive section space',
    'margin-block-start: clamp(2rem, 1rem + 3vw, 4rem);',
    'css-math-fluid-sizing',
  ],
  [
    'Use min for the bounded shell',
    'inline-size: min(100% - 2rem, 52rem);',
    'css-math-fluid-sizing',
  ],
  [
    'Calculate action minimum size',
    'min-inline-size: calc(10ch + 2.5em);',
    'css-math-fluid-sizing',
  ],
  [
    'Document fluid lower and upper bounds',
    '/* Fluid values retain explicit readable minimum and maximum bounds. */',
    'css-math-fluid-sizing',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'absolute-and-relative-units',
  moduleId: 'css-units-intrinsic-constraints',
  title: 'Sizing, Units, and Intrinsic Constraints',
  description:
    'Choose CSS units by their real reference context, calculate percentage bases, survive mobile browser viewport changes, and compose bounded fluid text, spacing, and component sizes.',
  order: 10,
  objectives: [
    'Justify absolute-unit choices from screen, print, device scale, and zoom behavior.',
    'Calculate rem, em, ch, lh, and percentage values from the correct reference context.',
    'Use small and dynamic viewport units without clipping content behind mobile browser controls.',
    'Compose min, max, clamp, and calc expressions with explicit usable lower and upper bounds.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: ['design-spacing-alignment', 'design-prototype-test'],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'code', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'user-centered-interface-design',
  priorLastActivityId: 'mapped-quiz-design-fundamentals',
  insertAfterCompetencyId: 'design-prototype-test',
  insertAfterModuleId: 'user-centered-interface-design',
  estimatedHours: 950,
  milestones,
  mappedPlans,
  extraPlans,
  activityIds: [
    'absolute-unit-medium-lab',
    'font-relative-reference-map',
    'percentage-basis-forensics',
    'mobile-viewport-height-lab',
    'bounded-fluid-sizing-studio',
    'mapped-lecture-working-with-relative-and-absolute-units',
    'absolute-and-relative-units-faded-build',
    'mapped-lab-event-flyer-page',
    'mapped-review-css-relative-and-absolute-units',
    'mapped-quiz-css-relative-and-absolute-units',
  ],
});

console.log(
  `Generated CSS Units: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
