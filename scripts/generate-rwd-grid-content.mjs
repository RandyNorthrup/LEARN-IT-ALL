import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'developer-field-manual';
const starterFiles = {
  html: '<!-- Continue the Developer Field Manual Grid and debugging work here. -->',
  css: '/* Continue the Developer Field Manual Grid and debugging work here. */',
  javascript: '',
};

const models = [
  {
    id: 'grid-formatting-context',
    activityId: 'grid-formatting-context-inspector',
    title: 'Trace Explicit and Implicit Grid Structure',
    context: 'field manual topic index grid inspection',
    concept:
      'Display grid creates a two-dimensional formatting context for direct child grid items. Declared rows and columns form the explicit grid; auto-placement can create implicit tracks whose size comes from grid-auto-rows or grid-auto-columns. Text runs may become anonymous grid items. Grid is appropriate when rows and columns matter together, while Flexbox is often clearer for one-dimensional distribution.',
    misconception: 'Only explicitly declared cells can participate in Grid layout.',
    correct:
      'Inspect explicit tracks, implicit tracks, direct items, and auto-placement before deciding whether the layout contract is two-dimensional.',
    distractors: [
      'Declare a cell for every possible item because Grid cannot generate tracks.',
      'Use Grid for every row of links because it is newer than Flexbox.',
    ],
    sequence: [
      'Identify direct children and the two-dimensional relationship',
      'Declare the minimum explicit track structure',
      'Inspect auto-placement and any generated implicit tracks',
      'Change item count and content then verify reading order and overflow',
    ],
    terms: ['explicit', 'implicit', 'items'],
    prerequisiteIds: ['flex-pattern-selection', 'css-property-registration'],
    requirements: [
      [
        'grid-context',
        '.manual-index {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: var(--manual-space-3);\n}',
      ],
      ['implicit-rows', '.manual-index {\n  grid-auto-rows: minmax(min-content, auto);\n}'],
      [
        'structure-record',
        '/* Inspect direct grid items plus explicit and generated implicit tracks when item count changes. */',
      ],
    ],
  },
  {
    id: 'grid-track-sizing',
    activityId: 'grid-track-sizing-algorithm-lab',
    title: 'Size Tracks through Intrinsic and Flexible Constraints',
    context: 'field manual navigation and article track sizing trace',
    concept:
      'Grid track sizing resolves fixed and percentage constraints, intrinsic contributions, min and max track functions, and remaining flexible space. One fr is a share of leftover space, not a viewport fraction. Auto minimums can preserve min-content width and cause overflow, so minmax(0, 1fr) is a deliberate opt-out when content may shrink and wrap. Fit-content caps growth without behaving like a fixed size.',
    misconception: 'One fractional unit always equals one fixed fraction of viewport width.',
    correct:
      'Account for intrinsic minimums and fixed constraints before distributing leftover space to fr tracks, then stress the content that defines those minimums.',
    distractors: [
      'Replace every track with equal 1fr values so long code and navigation cannot affect sizing.',
      'Set overflow hidden on the grid when an auto minimum makes a track wider than expected.',
    ],
    sequence: [
      'Inventory fixed intrinsic minimum and maximum contributions',
      'Resolve definite tracks and content-based minimums',
      'Distribute remaining space among flexible tracks',
      'Stress long words code zoom and narrow containers while inspecting tracks',
    ],
    terms: ['intrinsic', 'minmax', 'remaining'],
    prerequisiteIds: ['grid-formatting-context'],
    requirements: [
      [
        'resilient-tracks',
        '.manual-layout {\n  display: grid;\n  grid-template-columns: fit-content(18rem) minmax(0, 1fr);\n  gap: clamp(1rem, 3vw, 2rem);\n}',
      ],
      [
        'intrinsic-cards',
        '.manual-index {\n  grid-template-columns: repeat(2, minmax(min-content, 1fr));\n}',
      ],
      [
        'track-record',
        '/* 1fr shares leftover space after fixed and intrinsic constraints; it is not a viewport fraction. */',
      ],
      [
        'shrink-contract',
        '.manual-article {\n  min-inline-size: 0;\n  overflow-wrap: anywhere;\n}',
      ],
    ],
  },
  {
    id: 'grid-placement',
    activityId: 'grid-placement-source-order-lab',
    title: 'Place Items without Reordering Meaning',
    context: 'field manual feature and evidence card placement audit',
    concept:
      'Grid items can use numbered or named lines, spans, negative indices, and auto-placement. These tools change visual placement but not DOM, reading, focus, speech, or copy order. Dense packing can visually move later items into earlier holes, so it is risky for sequential or interactive content. Start with meaningful source order and use placement only for presentation that remains understandable when CSS disappears.',
    misconception: 'Explicit visual placement changes reading and keyboard focus order.',
    correct:
      'Preserve meaningful DOM order, place items against named lines where useful, and avoid dense or arbitrary visual reordering for task sequences.',
    distractors: [
      'Use grid placement to move the most important interactive item first for every input mode.',
      'Add tabindex values that copy the visual order after each responsive layout change.',
    ],
    sequence: [
      'Write content in meaningful reading and focus order',
      'Name stable lines or use clear spans for visual placement',
      'Inspect auto-placement holes and dense behavior',
      'Test CSS-off reading keyboard focus speech and breakpoint changes',
    ],
    terms: ['source', 'placement', 'focus'],
    prerequisiteIds: ['grid-track-sizing'],
    requirements: [
      [
        'named-lines',
        '.manual-layout {\n  grid-template-columns: [nav-start] fit-content(18rem) [nav-end content-start] minmax(0, 1fr) [content-end];\n}',
      ],
      ['nav-placement', '.manual-nav {\n  grid-column: nav-start / nav-end;\n}'],
      ['content-placement', '.manual-content {\n  grid-column: content-start / content-end;\n}'],
      [
        'order-record',
        '/* Visual Grid placement never replaces meaningful DOM, reading, and keyboard focus order. */',
      ],
    ],
  },
  {
    id: 'grid-areas',
    activityId: 'grid-area-template-studio',
    title: 'Define Rectangular Named Areas across Breakpoints',
    context: 'field manual header navigation content and evidence composition',
    concept:
      'Grid-template-areas provides a readable map when each named area forms one filled rectangle. A period creates an empty cell. Items opt into areas with grid-area. Responsive templates may redefine the area map, but content priority and DOM order must remain valid in every version. Area names should describe structural roles rather than coordinates or temporary colors.',
    misconception: 'One area name can form disconnected or L-shaped regions in a valid template.',
    correct:
      'Use rectangular semantic areas, redefine the complete template at real content breakpoints, and keep source order independent of the visual map.',
    distractors: [
      'Repeat an area name in disconnected cells because the browser will join them visually.',
      'Name areas left blue and bottom so the template mirrors the current screenshot.',
    ],
    sequence: [
      'Name structural regions from content purpose',
      'Create a valid narrow rectangular area map',
      'Assign items and verify unstyled source order',
      'Redefine a complete wide map and retest every region',
    ],
    terms: ['areas', 'rectangle', 'source'],
    prerequisiteIds: ['grid-placement'],
    requirements: [
      [
        'narrow-areas',
        '.manual-shell {\n  display: grid;\n  grid-template-areas: "header" "nav" "content" "evidence";\n}',
      ],
      [
        'area-assignments',
        '.manual-header { grid-area: header; }\n.manual-nav { grid-area: nav; }\n.manual-content { grid-area: content; }\n.manual-evidence { grid-area: evidence; }',
      ],
      [
        'wide-areas',
        '@media (width >= 56rem) {\n  .manual-shell {\n    grid-template-areas: "header header" "nav content" "nav evidence";\n  }\n}',
      ],
      [
        'area-record',
        '/* Every repeated grid-area name must form one rectangle; visual areas do not change source order. */',
      ],
    ],
  },
  {
    id: 'grid-auto-fit-fill',
    activityId: 'auto-fit-fill-comparison-lab',
    title: 'Choose Auto-Fit or Auto-Fill from Empty-Track Behavior',
    context: 'field manual related-topic card collection',
    concept:
      'Repeat with auto-fill creates as many tracks as fit and retains empty tracks; auto-fit collapses unused tracks so occupied tracks may expand. With minmax, both support content-driven repetition without device breakpoints. The minimum must not exceed the container at narrow sizes, item count changes must be tested, and the choice depends on whether empty track alignment is useful.',
    misconception: 'Auto-fit and auto-fill always create identical empty-track behavior.',
    correct:
      'Choose auto-fit when occupied tracks should expand after empty tracks collapse, or auto-fill when the empty track structure should remain.',
    distractors: [
      'Use auto-fit for a fixed number of columns because it guarantees exactly three tracks.',
      'Set a minimum wider than the container and expect minmax to shrink it automatically.',
    ],
    sequence: [
      'Define the smallest usable card width from content',
      'Decide whether empty tracks should remain or collapse',
      'Implement repeat with minmax and a narrow-safe minimum',
      'Test zero one few and many items across continuous container widths',
    ],
    terms: ['auto-fit', 'auto-fill', 'empty'],
    prerequisiteIds: ['grid-areas'],
    requirements: [
      [
        'auto-fit-grid',
        '.related-topics {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));\n  gap: 1rem;\n}',
      ],
      [
        'auto-fill-demo',
        '.reserved-topic-slots {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(min(100%, 12rem), 1fr));\n}',
      ],
      [
        'fit-fill-record',
        '/* auto-fit collapses empty tracks; auto-fill retains their track structure. Test changing item counts. */',
      ],
    ],
  },
  {
    id: 'grid-alignment',
    activityId: 'grid-alignment-axis-lab',
    title: 'Align Tracks, Items, and Individual Cells on Correct Axes',
    context: 'field manual card and track alignment diagnosis',
    concept:
      'Justify-content and align-content distribute the grid tracks inside extra container space. Justify-items and align-items set default alignment inside each grid area, while justify-self and align-self override one item. Place shorthand combines axes. Stretch is common, baseline can align text, and safe alignment avoids moving content where it becomes unreachable. Logical inline and block axes change with writing mode.',
    misconception: 'Align-items positions the entire grid inside its container.',
    correct:
      'Identify whether tracks, all items, or one item must move, then choose content, items, or self alignment on the logical axis.',
    distractors: [
      'Use justify-content to align text within every individual grid item.',
      'Use physical left and right assumptions because Grid alignment axes never change with writing mode.',
    ],
    sequence: [
      'Identify the grid container tracks area and target item',
      'Name the logical axis and available free space',
      'Choose content items or self alignment at the right level',
      'Test stretch baseline overflow writing mode and changed content',
    ],
    terms: ['content', 'items', 'self'],
    prerequisiteIds: ['grid-auto-fit-fill'],
    requirements: [
      [
        'track-alignment',
        '.manual-index {\n  justify-content: safe center;\n  align-content: start;\n}',
      ],
      ['item-alignment', '.manual-index {\n  justify-items: stretch;\n  align-items: start;\n}'],
      ['self-alignment', '.topic-card__action {\n  justify-self: start;\n  align-self: end;\n}'],
      [
        'alignment-record',
        '/* content aligns tracks, items supplies cell defaults, and self overrides one grid item. */',
      ],
    ],
  },
  {
    id: 'grid-subgrid',
    activityId: 'subgrid-component-alignment-lab',
    title: 'Share Parent Tracks with Nested Components',
    context: 'field manual topic cards with aligned headings summaries and actions',
    concept:
      'A nested grid normally creates independent tracks. Subgrid lets a child grid use parent row or column tracks so repeated components align internal regions without copying track values. The parent must define the relevant tracks and the child must span them. A usable fallback should preserve reading and action access even when cross-card alignment is unavailable.',
    misconception: 'Nested grids automatically inherit the track lines of their parent grid.',
    correct:
      'Use subgrid when nested content must align to parent tracks, make the child span those tracks, and retain an independent-grid fallback.',
    distractors: [
      'Copy fixed row heights into every card so text remains aligned after zoom.',
      'Apply subgrid without spanning parent tracks because the browser creates missing lines automatically.',
    ],
    sequence: [
      'Identify repeated nested regions that need shared alignment',
      'Define parent tracks and make each component span the required tracks',
      'Apply subgrid on the relevant axis behind a usable fallback',
      'Test varied headings summaries actions support and zoom',
    ],
    terms: ['subgrid', 'parent', 'fallback'],
    prerequisiteIds: ['grid-alignment'],
    requirements: [
      [
        'subgrid-fallback',
        '.topic-card {\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n}',
      ],
      ['parent-rows', '.related-topics {\n  grid-auto-rows: auto auto minmax(2.75rem, auto);\n}'],
      [
        'subgrid-support',
        '@supports (grid-template-rows: subgrid) {\n  .topic-card {\n    grid-row: span 3;\n    grid-template-rows: subgrid;\n  }\n}',
      ],
      [
        'subgrid-record',
        '/* Subgrid shares parent tracks; nested grids remain independent without it. */',
      ],
    ],
  },
  {
    id: 'css-debug-method',
    activityId: 'css-evidence-debugging-studio',
    title: 'Debug CSS with Reproduction, Hypothesis, and Regression Evidence',
    context: 'field manual Grid overflow and cascade incident',
    concept:
      'A repeatable CSS debugging method records the failing task and conditions, reduces the case, checks parsed and matched rules, inspects cascade and computed values, turns on box and Grid overlays, tests intrinsic sizes and overflow ancestors, changes one variable, and reruns retained scenarios. Random declarations can mask causes and create regressions even when the screenshot improves.',
    misconception:
      'Trying random property changes is faster than isolating the smallest failing case.',
    correct:
      'Reproduce precisely, form one falsifiable hypothesis, inspect browser evidence, make a bounded repair, and rerun a named regression matrix.',
    distractors: [
      'Add important and overflow hidden first because they fix most CSS defects quickly.',
      'Rewrite the component when computed styles differ from expectations instead of tracing the cascade.',
    ],
    sequence: [
      'Record task viewport content input preference and exact symptom',
      'Reduce the case and form one falsifiable cause hypothesis',
      'Inspect parsed rules cascade computed layout tracks boxes and overflow',
      'Apply one bounded repair then rerun failed and retained scenarios',
    ],
    terms: ['hypothesis', 'computed', 'regression'],
    prerequisiteIds: ['grid-subgrid'],
    requirements: [
      [
        'debug-record',
        '/* Reproduce: long command at 200% zoom in 40rem container. Hypothesis: auto min-content track prevents shrink. */',
      ],
      ['bounded-repair', '.manual-content {\n  min-inline-size: 0;\n}'],
      [
        'regression-record',
        '/* Retest: narrow and wide layouts, long and short content, keyboard focus, Grid overlay, print, and forced colors. */',
      ],
      [
        'cause-record',
        '/* Evidence: computed track exceeded container before repair; no selector or cascade mismatch remained. */',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-working-with-css-grid': {
    title: 'Trace Grid Formatting, Sizing, Placement, and Alignment',
    context: 'field manual Grid algorithm evidence lab',
    focus: allFocus.slice(0, 7),
    artifactId: cumulativeArtifactId,
    targetSteps: 10,
  },
  'mapped-workshop-magazine': {
    title: 'Workshop: Build an Accessible Civic Magazine Layout',
    context: 'editorial layout with intrinsic tracks areas placement and subgrid',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 96,
  },
  'mapped-lab-newspaper-layout': {
    title: 'Lab: Build a Content-Driven Emergency Newspaper',
    context: 'independent source-order track-sizing and alignment build',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
  },
  'mapped-lecture-debugging-css': {
    title: 'Trace a CSS Defect from Reproduction to Regression Proof',
    context: 'computed-style Grid overflow debugging case',
    focus: ['css-debug-method', 'grid-track-sizing', 'grid-placement'],
    artifactId: cumulativeArtifactId,
    targetSteps: 10,
  },
  'mapped-review-css-grid': {
    title: 'Retrieval Review: CSS Grid and Evidence-Driven Debugging',
    context: 'changed content tracks placement areas alignment and defect evidence',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 24,
  },
  'mapped-quiz-css-grid': {
    title: 'Mastery Exam: CSS Grid and Debugging',
    context: 'independent Grid algorithm source-order and root-cause decisions',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 30,
  },
};

const milestones = models.flatMap((model) =>
  model.requirements.map(([name, expected, checkType, file]) => [
    `${model.title}: ${name.replaceAll('-', ' ')}`,
    expected,
    model.id,
    checkType,
    file,
  ])
);

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'css-grid',
  moduleId: 'two-dimensional-grid-layout-debugging',
  title: 'Two-Dimensional Grid Layout and CSS Debugging',
  description:
    'Reason through explicit and implicit grids, intrinsic and flexible track sizing, source-order-safe placement, named areas, auto-fit and auto-fill, alignment levels, subgrid, and a reproducible browser-evidence debugging method.',
  order: 25,
  objectives: [
    'Distinguish explicit and implicit Grid structure and choose Grid only for genuine two-dimensional relationships.',
    'Predict intrinsic, fixed, minmax, fit-content, repeat, and flexible track sizing under changed content.',
    'Use lines, spans, auto-placement, and named areas while preserving meaningful DOM, reading, and focus order.',
    'Choose auto-fit or auto-fill and apply content, item, and self alignment on the correct logical axis.',
    'Use subgrid with a usable fallback for shared nested alignment.',
    'Debug cascade, computed values, tracks, overflow, and rendering with a recorded hypothesis and regression cycle.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: [
    'flex-pattern-selection',
    'css-property-registration',
    'responsive-test-matrix',
    'css-accessibility-regression',
  ],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'code', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'custom-properties-design-tokens',
  priorLastActivityId: 'mapped-quiz-css-variables',
  insertAfterCompetencyId: 'css-property-registration',
  insertAfterModuleId: 'custom-properties-design-tokens',
  estimatedHours: 3060,
  milestones,
  mappedPlans,
  activityIds: [
    'grid-formatting-context-inspector',
    'grid-track-sizing-algorithm-lab',
    'grid-placement-source-order-lab',
    'grid-area-template-studio',
    'auto-fit-fill-comparison-lab',
    'grid-alignment-axis-lab',
    'subgrid-component-alignment-lab',
    'css-evidence-debugging-studio',
    'mapped-lecture-working-with-css-grid',
    'mapped-workshop-magazine',
    'mapped-lab-newspaper-layout',
    'mapped-lecture-debugging-css',
    'mapped-review-css-grid',
    'mapped-quiz-css-grid',
  ],
});

console.log(
  `Generated CSS Grid: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
