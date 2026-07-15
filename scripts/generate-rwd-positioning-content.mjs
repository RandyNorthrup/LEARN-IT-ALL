import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'volunteer-shift-deck';
const starterFiles = {
  html: '<!-- Continue the Volunteer Shift Deck positioning work here. -->',
  css: '/* Continue the flow, containing-block, and layer system here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-normal-flow',
    activityId: 'normal-flow-baseline-lab',
    title: 'Start Every Layout in Normal Flow',
    context: 'shift deck layout enhancement baseline',
    concept:
      'Normal flow places block boxes in block sequence and inline content in line boxes according to writing mode. It provides resilient source order, content-driven block growth, wrapping, and predictable accessibility before floats, positioning, Flexbox, or Grid enhance a specific relationship. Removing major content from flow creates manual space and overlap obligations.',
    misconception: 'Professional layouts require positioning every major region explicitly.',
    correct:
      'Build a readable source-ordered flow baseline first and remove an element from flow only for a relationship that flow cannot express.',
    distractors: [
      'Absolutely position every heading card and action so browser flow cannot affect the design.',
      'Use fixed heights to reserve space for all content removed from flow.',
    ],
    sequence: [
      'Order content logically in the DOM',
      'Verify readable block and inline flow without enhancement',
      'Identify the one relationship needing float positioning Flexbox or Grid',
      'Enhance it and retest content growth zoom and focus order',
    ],
    terms: ['normal flow', 'source order', 'enhancement'],
    prerequisiteIds: ['css-effects-debugging', 'css-accessibility-regression'],
    requirements: [
      ['content-flow', '.shift-content {\n  display: block;\n}'],
      ['flow-growth', '.shift-card {\n  block-size: auto;\n}'],
      ['flow-comment', '/* Source-ordered normal flow remains the readable baseline. */'],
    ],
  },
  {
    id: 'css-floats',
    activityId: 'float-wrap-containment-lab',
    title: 'Use Floats Only for Inline Content Wrapping',
    context: 'shift coordinator portrait and biography wrap',
    concept:
      'A float shifts a box to an inline side and lets following inline content wrap around it. It is useful for media embedded in prose, not general two-dimensional page layout. Floats can protrude from a parent or affect following content; flow-root creates a new block formatting context that contains them, while clear moves a box below relevant floats.',
    misconception: 'Floats are a general two-dimensional page-layout system equivalent to Grid.',
    correct:
      'Use float for genuine prose wrapping, contain it with a formatting context, and choose Flexbox or Grid for component layout.',
    distractors: [
      'Float every card left and calculate percentage widths to replace Flexbox wrapping.',
      'Clear every paragraph so text never wraps beside floated media.',
    ],
    sequence: [
      'Confirm the relationship is media wrapped by inline prose',
      'Choose inline-start or inline-end float and bounded size',
      'Contain the float or clear only the required following content',
      'Test short long narrow zoomed and no-image states',
    ],
    terms: ['float', 'wrapping', 'flow-root'],
    prerequisiteIds: ['css-normal-flow'],
    requirements: [
      ['bio-context', '.coordinator-bio {\n  display: flow-root;\n}'],
      [
        'portrait-float',
        '.coordinator-portrait {\n  float: inline-start;\n  inline-size: min(40%, 10rem);\n  margin-inline-end: 1rem;\n  margin-block-end: 0.5rem;\n}',
      ],
      ['float-clear', '.bio-follow-up {\n  clear: both;\n}'],
    ],
  },
  {
    id: 'css-relative-position',
    activityId: 'relative-offset-reference-lab',
    title: 'Offset Paint while Preserving Flow Space',
    context: 'shift status badge local offset investigation',
    concept:
      'Position relative keeps an element’s original flow allocation and offsets its painted box with logical or physical inset properties. Following content behaves as if the element remained at its original position. A positioned relative box also establishes the containing block for many absolutely positioned descendants without requiring a visual offset.',
    misconception: 'Relative offsets cause following siblings to move into the vacated space.',
    correct:
      'Distinguish the original flow box from painted offset, use small local adjustments, and establish containing blocks explicitly.',
    distractors: [
      'Use relative top offsets to create all vertical spacing between sections.',
      'Assume relative positioning removes an element from document flow.',
    ],
    sequence: [
      'Record the original flow allocation',
      'Identify the local offset or containing-block need',
      'Apply position relative and bounded logical insets',
      'Inspect overlap hit targets focus and sibling flow space',
    ],
    terms: ['relative', 'flow space', 'offset'],
    prerequisiteIds: ['css-floats'],
    requirements: [
      ['card-containing-block', '.shift-card {\n  position: relative;\n}'],
      [
        'badge-relative',
        '.shift-status {\n  position: relative;\n  inset-block-start: -0.125rem;\n}',
      ],
      ['relative-comment', '/* Relative offsets preserve the original flow allocation. */'],
    ],
  },
  {
    id: 'css-absolute-position',
    activityId: 'absolute-containing-block-map',
    title: 'Anchor Absolute Content to the Intended Containing Block',
    context: 'shift capacity badge escaping its card',
    concept:
      'Absolute positioning removes a box from normal flow and positions it against a containing block established by a suitable ancestor or initial containing block. Insets, size, margins, and writing mode determine geometry. The parent must reserve any necessary content space, and essential text cannot be allowed to overlap when it wraps or zooms.',
    misconception: 'Absolutely positioned content always uses the viewport as its reference.',
    correct:
      'Identify and establish the intended containing block, reserve real flow space, and test long text zoom and changed card size.',
    distractors: [
      'Set a large z-index because z-index decides the containing block.',
      'Absolutely position every fact row so cards maintain equal height.',
    ],
    sequence: [
      'Identify the element that should own the anchored content',
      'Establish its containing block deliberately',
      'Reserve space and apply logical insets to the absolute child',
      'Test wrapping zoom source order and overlap at every card size',
    ],
    terms: ['absolute', 'containing block', 'space'],
    prerequisiteIds: ['css-relative-position'],
    requirements: [
      ['card-space', '.shift-card {\n  padding-block-start: 3.5rem;\n}'],
      [
        'absolute-badge',
        '.shift-capacity {\n  position: absolute;\n  inset-block-start: 1rem;\n  inset-inline-end: 1rem;\n}',
      ],
      ['badge-max', '.shift-capacity {\n  max-inline-size: calc(100% - 2rem);\n}'],
    ],
  },
  {
    id: 'css-fixed-sticky',
    activityId: 'sticky-obstruction-safe-area-lab',
    title: 'Keep Fixed and Sticky UI Useful without Obstruction',
    context: 'shift filter bar sticky and mobile safe-area incident',
    concept:
      'Fixed boxes are positioned relative to a viewport-like containing block and stay during scrolling. Sticky boxes behave in flow until crossing an inset within their nearest relevant scroll container. Ancestor overflow, available scroll range, transforms, offsets, browser UI, safe areas, and zoom affect behavior. Persistent UI must not cover focus targets or content.',
    misconception:
      'Sticky positioning works independently of ancestor overflow and scroll containers.',
    correct:
      'Map scroll containers and containing blocks, use logical offsets and safe-area padding, and test obstruction at zoom plus short and long content.',
    distractors: [
      'Set every ancestor overflow hidden so sticky knows which box to follow.',
      'Use fixed navigation across the whole viewport without reserving or testing content space.',
    ],
    sequence: [
      'Identify the relevant viewport scroll container and ancestor effects',
      'Keep sticky content in flow and set a logical inset',
      'Account for safe areas and scroll target clearance',
      'Test short long zoomed keyboard and mobile-browser states',
    ],
    terms: ['sticky', 'scroll container', 'obstruction'],
    prerequisiteIds: ['css-absolute-position'],
    requirements: [
      [
        'sticky-filter',
        '.shift-filters {\n  position: sticky;\n  inset-block-start: 0;\n  z-index: 2;\n}',
      ],
      ['safe-area', '.shift-filters {\n  padding-block-start: env(safe-area-inset-top, 0);\n}'],
      ['scroll-clearance', '.shift-card {\n  scroll-margin-block-start: 5rem;\n}'],
      [
        'sticky-comment',
        '/* Sticky behavior is tested against the actual scroll container and zoomed viewport. */',
      ],
    ],
  },
  {
    id: 'css-stacking-contexts',
    activityId: 'positioned-layer-tree-lab',
    title: 'Predict Paint Order across Nested Stacking Contexts',
    context: 'sticky filter and card badge layer conflict',
    concept:
      'Stacking contexts are created by positioned elements with z-index and by properties such as opacity, transforms, filters, isolation, and containment. Descendant z-index values compete only inside their context. Paint order compares sibling contexts first, then their internal layers. Top-layer UI such as dialogs follows a separate mechanism.',
    misconception: 'The numerically largest z-index must appear above every page element.',
    correct:
      'Draw context ancestors and sibling relationships, compare context paint order, and remove accidental boundaries rather than escalating numbers.',
    distractors: [
      'Give the hidden card badge z-index one million so it escapes its transformed ancestor.',
      'Add opacity 0.999 to every component to simplify global layer control.',
    ],
    sequence: [
      'List overlapping elements and ancestor chains',
      'Mark every context-creating property',
      'Compare sibling contexts before descendant z-index values',
      'Repair the accidental boundary and retest focus clipping and overlays',
    ],
    terms: ['stacking context', 'paint order', 'z-index'],
    prerequisiteIds: ['css-fixed-sticky'],
    requirements: [
      ['page-isolation', '.shift-page {\n  isolation: isolate;\n}'],
      ['filter-layer', '.shift-filters {\n  position: sticky;\n  z-index: 2;\n}'],
      ['card-layer', '.shift-card {\n  position: relative;\n  z-index: 1;\n}'],
      [
        'layer-comment',
        '/* Compare sibling stacking contexts before descendant z-index values. */',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-understanding-how-to-work-with-floats-and-positioning-in-css': {
    title: 'Trace Flow, Containing Blocks, Scroll Containers, and Layers',
    context: 'Volunteer Shift Deck positioning evidence lab',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-cat-painting': {
    title: 'Workshop: Build a Layered Emergency Radio Diagram',
    context: 'semantic emergency-radio illustration with contained decorative layers',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-house-painting': {
    title: 'Lab: Repair a Cooling-Center Wayfinding Diagram',
    context: 'unfamiliar containing-block sticky and stacking incident',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 16,
  },
  'mapped-review-css-positioning': {
    title: 'Retrieval Review: Flow, Positioning, and Stacking',
    context: 'changed content scroll and layer constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
  },
  'mapped-quiz-css-positioning': {
    title: 'Mastery Exam: Flow, Positioning, and Stacking',
    context: 'independent positioning and obstruction decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 30,
  },
};

const milestones = [
  ['Keep shift content in block flow', '.shift-content {\n  display: block;', 'css-normal-flow'],
  ['Allow cards to grow in flow', 'block-size: auto;', 'css-normal-flow'],
  [
    'Document normal-flow baseline',
    '/* Source-ordered normal flow remains the readable baseline. */',
    'css-normal-flow',
  ],
  [
    'Contain a coordinator portrait float',
    '.coordinator-bio {\n  display: flow-root;',
    'css-floats',
  ],
  ['Float only prose media', 'float: inline-start;', 'css-floats'],
  ['Bound the floated portrait', 'inline-size: min(40%, 10rem);', 'css-floats'],
  ['Clear the required follow-up only', '.bio-follow-up {\n  clear: both;', 'css-floats'],
  [
    'Establish the card containing block',
    '.shift-card {\n  position: relative;',
    'css-relative-position',
  ],
  ['Apply a small relative badge offset', 'inset-block-start: -0.125rem;', 'css-relative-position'],
  [
    'Document preserved flow allocation',
    '/* Relative offsets preserve the original flow allocation. */',
    'css-relative-position',
  ],
  [
    'Reserve card space for anchored capacity',
    'padding-block-start: 3.5rem;',
    'css-absolute-position',
  ],
  [
    'Anchor capacity to the card',
    '.shift-capacity {\n  position: absolute;',
    'css-absolute-position',
  ],
  [
    'Use logical absolute insets',
    'inset-block-start: 1rem;\n  inset-inline-end: 1rem;',
    'css-absolute-position',
  ],
  ['Bound anchored content width', 'max-inline-size: calc(100% - 2rem);', 'css-absolute-position'],
  ['Create a sticky filter bar', '.shift-filters {\n  position: sticky;', 'css-fixed-sticky'],
  ['Use a logical sticky offset', 'inset-block-start: 0;', 'css-fixed-sticky'],
  [
    'Respect the top safe area',
    'padding-block-start: env(safe-area-inset-top, 0);',
    'css-fixed-sticky',
  ],
  ['Clear sticky UI for scroll targets', 'scroll-margin-block-start: 5rem;', 'css-fixed-sticky'],
  ['Isolate page layers intentionally', 'isolation: isolate;', 'css-stacking-contexts'],
  ['Create the filter sibling layer', 'position: sticky;\n  z-index: 2;', 'css-stacking-contexts'],
  ['Create the card sibling layer', 'position: relative;\n  z-index: 1;', 'css-stacking-contexts'],
  [
    'Document context comparison order',
    '/* Compare sibling stacking contexts before descendant z-index values. */',
    'css-stacking-contexts',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'css-positioning',
  moduleId: 'css-flow-positioning-stacking',
  title: 'Flow, Positioning, and Stacking',
  description:
    'Keep normal flow as the resilient baseline, use floats only for prose wrapping, map relative and absolute containing blocks, test fixed and sticky obstruction, and predict paint order through stacking-context trees.',
  order: 19,
  objectives: [
    'Build source-ordered normal flow before enhancing a specific relationship with another layout or positioning method.',
    'Use floats for inline media wrapping and contain or clear them without turning them into a page grid.',
    'Distinguish relative flow allocation from absolute containing-block geometry and reserve necessary space.',
    'Map sticky scroll containers, safe areas, obstructions, and nested stacking contexts with evidence.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: ['css-effects-debugging', 'css-accessibility-regression'],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'answer', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'accessible-css-preferences-regression',
  priorLastActivityId: 'mapped-quiz-css-accessibility',
  insertAfterCompetencyId: 'css-accessibility-regression',
  insertAfterModuleId: 'accessible-css-preferences-regression',
  estimatedHours: 2060,
  milestones,
  mappedPlans,
  activityIds: [
    'normal-flow-baseline-lab',
    'float-wrap-containment-lab',
    'relative-offset-reference-lab',
    'absolute-containing-block-map',
    'sticky-obstruction-safe-area-lab',
    'positioned-layer-tree-lab',
    'mapped-lecture-understanding-how-to-work-with-floats-and-positioning-in-css',
    'mapped-workshop-cat-painting',
    'mapped-lab-house-painting',
    'mapped-review-css-positioning',
    'mapped-quiz-css-positioning',
  ],
});

console.log(
  `Generated CSS Positioning: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
