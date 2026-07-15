import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'community-needs-survey';
const starterFiles = {
  html: '<!-- Continue the Community Needs Survey one-dimensional layout work here. -->',
  css: '/* Continue the resilient Flexbox patterns here. */',
  javascript: '',
};

const models = [
  {
    id: 'flex-formatting-context',
    activityId: 'flex-axis-mapping-lab',
    title: 'Map Flex Axes from Direction and Writing Mode',
    context: 'survey action-row axis investigation',
    concept:
      'Display flex or inline-flex creates a flex formatting context. Flex-direction establishes the main axis and direction; the cross axis is perpendicular. Row follows the inline axis and column follows the block axis, so horizontal and vertical assumptions fail under changed writing modes and direction. Direct children become flex items.',
    misconception: 'The main axis is always horizontal and the cross axis always vertical.',
    correct:
      'Read writing mode, direction, and flex-direction first, then name the main and cross axes before choosing sizing or alignment.',
    distractors: [
      'Use justify-content for every horizontal decision because horizontal always means main axis.',
      'Apply flex properties to nested descendants because every descendant is a flex item.',
    ],
    sequence: [
      'Identify the flex container and direct items',
      'Read writing mode direction and flex direction',
      'Draw main-start main-end cross-start and cross-end',
      'Change direction and writing mode and verify item flow',
    ],
    terms: ['main axis', 'cross axis', 'direction'],
    prerequisiteIds: ['css-display-flow', 'css-effects-debugging'],
    requirements: [
      ['action-flex', '.survey-actions {\n  display: flex;\n}'],
      ['action-direction', '.survey-actions {\n  flex-direction: row;\n}'],
      ['status-inline-flex', '.status-badge {\n  display: inline-flex;\n}'],
    ],
  },
  {
    id: 'flex-sizing-algorithm',
    activityId: 'flex-free-space-calculator',
    title: 'Calculate Flex Base Size and Free-Space Distribution',
    context: 'survey action widths and long-label overflow incident',
    concept:
      'Flex sizing begins with each item’s flex base and hypothetical size, then distributes positive free space by flex-grow or negative free space by scaled flex-shrink factors while respecting min and max constraints. Flex: 1 commonly expands to a zero basis pattern, but automatic minimum content size can still prevent shrinking unless constraints such as min-inline-size zero are deliberate.',
    misconception: 'Flex one means each item always receives exactly the same width.',
    correct:
      'Calculate bases, container free space, grow or scaled shrink shares, and min or max clamping before predicting final sizes.',
    distractors: [
      'Set flex-grow one and ignore different bases because grow replaces intrinsic size.',
      'Use flex-shrink zero on every item so the container can always compress them.',
    ],
    sequence: [
      'Record container inner size and each item flex base',
      'Calculate positive or negative free space',
      'Distribute by grow factors or scaled shrink factors',
      'Apply min and max clamping and compare measured sizes',
    ],
    terms: ['flex-basis', 'free space', 'shrink'],
    prerequisiteIds: ['flex-formatting-context'],
    requirements: [
      [
        'primary-flex',
        '.survey-actions .primary-action {\n  flex: 1 1 14rem;\n  min-inline-size: 0;\n}',
      ],
      [
        'secondary-flex',
        '.survey-actions .secondary-action {\n  flex: 0 1 12rem;\n  min-inline-size: 0;\n}',
      ],
      ['card-flex-basis', '.service-card {\n  flex: 1 1 18rem;\n}'],
    ],
  },
  {
    id: 'flex-alignment',
    activityId: 'flex-alignment-evidence-lab',
    title: 'Align and Distribute along the Correct Axis',
    context: 'survey action and status alignment review',
    concept:
      'Justify-content distributes free space along the main axis; align-items aligns items within a flex line on the cross axis; align-content distributes multiple lines when extra cross-axis space exists; align-self overrides one item; gap creates consistent gutters. Centering can make overflowing content unreachable, so safe alignment and content growth matter.',
    misconception: 'Justify-content vertically centers items in every flex container.',
    correct:
      'Name the axis and whether the task needs item alignment or free-space distribution, then choose justify, align, self-alignment, or gap.',
    distractors: [
      'Use align-content on a single non-wrapping line to center its items.',
      'Replace gap with margins on every child because margins always collapse inside flex containers.',
    ],
    sequence: [
      'Draw main and cross axes for the current direction',
      'Distinguish item alignment from free-space distribution',
      'Choose justify content align items align content align self or gap',
      'Test wrapping overflow long labels and changed writing mode',
    ],
    terms: ['justify-content', 'align-items', 'gap'],
    prerequisiteIds: ['flex-sizing-algorithm'],
    requirements: [
      ['action-gap', '.survey-actions {\n  gap: 0.75rem;\n}'],
      ['action-alignment', '.survey-actions {\n  align-items: center;\n}'],
      ['action-distribution', '.survey-actions {\n  justify-content: flex-start;\n}'],
      ['badge-self', '.status-badge {\n  align-self: flex-start;\n}'],
    ],
  },
  {
    id: 'flex-wrapping',
    activityId: 'content-driven-flex-wrap-lab',
    title: 'Wrap from Content Constraints, Not Device Labels',
    context: 'service card row at narrow and translated widths',
    concept:
      'Flex-wrap allows items to create additional flex lines, but usable wrapping also needs a meaningful flexible basis, shrink behavior, min size, gaps, and content resilience. Wrapping decisions should follow when content becomes cramped or overflows rather than a fixed device-specific item count. Each line distributes free space independently.',
    misconception: 'Flex-wrap alone guarantees every card has a usable minimum width.',
    correct:
      'Set a content-derived flexible basis and minimum, enable wrapping, and test when real cards move to the next line across content changes.',
    distractors: [
      'Set flex-wrap and width 10% on every card so at least ten always fit.',
      'Use order values to keep rows visually balanced after wrapping.',
    ],
    sequence: [
      'Measure the smallest usable item width from content',
      'Choose flex basis grow shrink minimum and gap',
      'Enable wrapping and observe independent line distribution',
      'Test long labels zoom translation and one-item final lines',
    ],
    terms: ['flex-wrap', 'basis', 'content'],
    prerequisiteIds: ['flex-alignment'],
    requirements: [
      [
        'card-row-wrap',
        '.service-card-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}',
      ],
      [
        'card-content-basis',
        '.service-card {\n  flex: 1 1 18rem;\n  min-inline-size: min(100%, 16rem);\n}',
      ],
      [
        'media-wrap',
        '.evidence-gallery {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}',
      ],
    ],
  },
  {
    id: 'flex-order-accessibility',
    activityId: 'source-visual-order-audit',
    title: 'Keep Source, Reading, Focus, and Visual Order Aligned',
    context: 'responsive survey action reordering audit',
    concept:
      'Flex-direction reverse values and the order property can change visual order without changing DOM, reading, sequential focus, speech, or copy order. That mismatch can make instructions, fields, and actions appear in a different sequence than keyboard and assistive-technology navigation. Source order should express logical order at every layout.',
    misconception: 'Changing CSS order also changes screen-reader and keyboard sequence.',
    correct:
      'Put content in logical source order and use layout that preserves it, reserving visual reordering for nonessential presentation only.',
    distractors: [
      'Assign order values to every form field so mobile and desktop can have unrelated sequences.',
      'Use row-reverse to place the primary submit action first visually while leaving focus last.',
    ],
    sequence: [
      'Read the DOM and identify logical task sequence',
      'Compare visual reading keyboard and assistive sequences',
      'Remove reverse directions and meaningful order overrides',
      'Test narrow wide wrapped and zoomed layouts in source order',
    ],
    terms: ['source order', 'focus', 'visual'],
    prerequisiteIds: ['flex-wrapping'],
    requirements: [
      ['source-order-comment', '/* DOM, reading, focus, and visual task order stay aligned. */'],
      ['normal-direction', '.survey-actions {\n  flex-direction: row;\n}'],
      ['natural-order', '.survey-actions > * {\n  order: 0;\n}'],
    ],
  },
  {
    id: 'flex-pattern-selection',
    activityId: 'layout-method-decision-lab',
    title: 'Choose Flexbox Only for One-Dimensional Relationships',
    context: 'survey layout method architecture decision',
    concept:
      'Flexbox is content-driven and one-dimensional: it excels at distributing and aligning items along a row or column with optional wrapping. Grid is two-dimensional and track-driven. Block and inline flow remain best for ordinary document content. Layout choice follows dimensions, alignment, wrapping, intrinsic sizing, and source-order needs rather than novelty.',
    misconception: 'Flexbox is the modern replacement for every older layout mechanism.',
    correct:
      'Count meaningful layout dimensions, identify content or track control, and choose block flow, Flexbox, Grid, or another method from the actual relationship.',
    distractors: [
      'Use Flexbox on every paragraph so all modern pages share one layout model.',
      'Use nested Flexbox rows to simulate every two-dimensional data grid regardless of alignment needs.',
    ],
    sequence: [
      'Describe the content relationship and source order',
      'Count controlled dimensions and identify content or track sizing',
      'Choose block inline Flexbox Grid or another method',
      'Test wrapping alignment changed content and narrow width',
    ],
    terms: ['one-dimensional', 'Grid', 'flow'],
    prerequisiteIds: ['flex-order-accessibility'],
    requirements: [
      ['document-flow', '.survey-content {\n  display: block;\n}'],
      ['one-dimensional-actions', '.survey-actions {\n  display: flex;\n}'],
      ['pattern-comment', '/* Flexbox owns one-dimensional action and card relationships only. */'],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-working-with-css-flexbox': {
    title: 'Trace Flex Axes, Sizing, Alignment, and Order',
    context: 'community survey one-dimensional layout evidence lab',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-flexbox-photo-gallery': {
    title: 'Workshop: Build a Relief-Site Evidence Gallery',
    context: 'captioned service-location evidence gallery with content-driven wrapping',
    focus: [
      'flex-formatting-context',
      'flex-sizing-algorithm',
      'flex-alignment',
      'flex-wrapping',
      'flex-pattern-selection',
    ],
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-colorful-boxes': {
    title: 'Workshop: Build a Service Availability Card Row',
    context: 'translated multi-state relief-service dashboard',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-pricing-plans-layout': {
    title: 'Lab: Repair an Assistance Plan Comparison',
    context: 'unfamiliar flexible sizing and source-order incident',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 16,
  },
  'mapped-review-css-flexbox': {
    title: 'Retrieval Review: One-Dimensional Layout with Flexbox',
    context: 'changed writing mode content and wrapping constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
  },
  'mapped-quiz-css-flexbox': {
    title: 'Mastery Exam: One-Dimensional Layout with Flexbox',
    context: 'independent layout algorithm and accessibility decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 30,
  },
};

const milestones = [
  [
    'Create the action flex context',
    '.survey-actions {\n  display: flex;',
    'flex-formatting-context',
  ],
  ['Set explicit main-axis direction', 'flex-direction: row;', 'flex-formatting-context'],
  [
    'Create an inline flex badge',
    '.status-badge {\n  display: inline-flex;',
    'flex-formatting-context',
  ],
  [
    'Document main and cross axes',
    '/* Row follows the inline main axis; cross axis follows block direction. */',
    'flex-formatting-context',
  ],
  ['Give the primary action a flexible base', 'flex: 1 1 14rem;', 'flex-sizing-algorithm'],
  ['Give the secondary action a bounded base', 'flex: 0 1 12rem;', 'flex-sizing-algorithm'],
  ['Allow action content to shrink', 'min-inline-size: 0;', 'flex-sizing-algorithm'],
  ['Give service cards a content base', 'flex: 1 1 18rem;', 'flex-sizing-algorithm'],
  ['Create action gutters with gap', 'gap: 0.75rem;', 'flex-alignment'],
  ['Align action items on the cross axis', 'align-items: center;', 'flex-alignment'],
  ['Distribute actions from main start', 'justify-content: flex-start;', 'flex-alignment'],
  ['Align one badge independently', 'align-self: flex-start;', 'flex-alignment'],
  ['Enable service card wrapping', 'flex-wrap: wrap;', 'flex-wrapping'],
  [
    'Create service card row gaps',
    '.service-card-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;',
    'flex-wrapping',
  ],
  ['Set a content-derived card minimum', 'min-inline-size: min(100%, 16rem);', 'flex-wrapping'],
  [
    'Enable evidence gallery wrapping',
    '.evidence-gallery {\n  display: flex;\n  flex-wrap: wrap;',
    'flex-wrapping',
  ],
  [
    'Document aligned task sequences',
    '/* DOM, reading, focus, and visual task order stay aligned. */',
    'flex-order-accessibility',
  ],
  [
    'Keep normal action direction',
    '.survey-actions {\n  flex-direction: row;',
    'flex-order-accessibility',
  ],
  ['Keep natural item order', '.survey-actions > * {\n  order: 0;', 'flex-order-accessibility'],
  [
    'Document no meaningful visual reordering',
    '/* Never use order or reverse direction for meaningful task sequence. */',
    'flex-order-accessibility',
  ],
  [
    'Keep ordinary content in block flow',
    '.survey-content {\n  display: block;',
    'flex-pattern-selection',
  ],
  [
    'Use Flexbox for action relationship',
    '.survey-actions {\n  display: flex;',
    'flex-pattern-selection',
  ],
  [
    'Document one-dimensional ownership',
    '/* Flexbox owns one-dimensional action and card relationships only. */',
    'flex-pattern-selection',
  ],
  [
    'Document future two-dimensional Grid choice',
    '/* Use Grid when row and column tracks both need control. */',
    'flex-pattern-selection',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'css-flexbox',
  moduleId: 'one-dimensional-flex-layout',
  title: 'One-Dimensional Layout with Flexbox',
  description:
    'Map axes from writing mode and direction, calculate flexible sizing, align along the correct axis, wrap from content constraints, preserve source order, and choose Flexbox only for suitable one-dimensional relationships.',
  order: 15,
  objectives: [
    'Identify flex containers, direct items, main and cross axes under changed direction and writing modes.',
    'Calculate bases, positive or negative free space, grow, scaled shrink, and min or max clamping.',
    'Use alignment, gap, flexible bases, and wrapping from content constraints rather than device labels.',
    'Keep source, reading, focus, and visual order aligned and choose the correct layout method by dimensional need.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: ['css-display-flow', 'css-effects-debugging', 'keyboard-focus'],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'answer', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'css-overflow-effects-geometry',
  priorLastActivityId: 'mapped-quiz-css-layout-and-effects',
  insertAfterCompetencyId: 'css-effects-debugging',
  insertAfterModuleId: 'css-overflow-effects-geometry',
  estimatedHours: 1600,
  milestones,
  mappedPlans,
  activityIds: [
    'flex-axis-mapping-lab',
    'flex-free-space-calculator',
    'flex-alignment-evidence-lab',
    'content-driven-flex-wrap-lab',
    'source-visual-order-audit',
    'layout-method-decision-lab',
    'mapped-lecture-working-with-css-flexbox',
    'mapped-workshop-flexbox-photo-gallery',
    'mapped-workshop-colorful-boxes',
    'mapped-lab-pricing-plans-layout',
    'mapped-review-css-flexbox',
    'mapped-quiz-css-flexbox',
  ],
});

console.log(
  `Generated Flexbox: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
