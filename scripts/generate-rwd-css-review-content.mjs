import { generateRwdCumulativeAssessment } from './lib/generate-rwd-cumulative-assessment.mjs';

const caseFor = (competencyId, title, context, correct, misconception, terms, requirements) => ({
  competencyId,
  title,
  context,
  correct,
  misconception,
  terms,
  requirements,
  sequence: [
    'Reproduce the exact user task and changed condition',
    'Inspect parsed source cascade computed values and layout evidence',
    'Apply the smallest cause-level repair while preserving earlier contracts',
    'Rerun the failed case and the retained responsive accessibility matrix',
  ],
});

const cases = [
  caseFor(
    'css-cascade-origins-layers',
    'Layer Order Theme Regression',
    'a component layer loses to an unlayered campaign rule',
    'Inspect origin, importance, layer order, scope, specificity, and source order before changing the selector.',
    'Adding more IDs is the safest way to defeat an unknown cascade winner.',
    ['layer', 'origin', 'winner'],
    [
      ['layer-order', '@layer reset, base, components, utilities;', 'css'],
      ['component-layer', '@layer components {\n  .launch-action { color: #ffffff; }\n}', 'css'],
    ]
  ),
  caseFor(
    'css-cascade-origins-layers',
    'Inherited Token and Shorthand Incident',
    'a shorthand resets a longhand and a child inherits an unintended value',
    'Separate shorthand reset, direct declaration, inheritance, and custom-property resolution in the computed trace.',
    'Inherited values always outrank declarations written directly on the child.',
    ['shorthand', 'inheritance', 'computed'],
    [
      ['longhand-repair', '.evidence-card {\n  background-color: var(--launch-surface);\n}', 'css'],
      [
        'cascade-note',
        '/* Trace shorthand resets separately from inherited and directly declared values. */',
        'css',
      ],
    ]
  ),
  caseFor(
    'css-box-model',
    'Border-Box Width Overflow',
    'padding and border push a launch panel beyond its container',
    'Use predictable box sizing and inspect content, padding, border, margin, and intrinsic minimums before hiding overflow.',
    'Width one hundred percent always includes padding and border automatically.',
    ['box', 'padding', 'intrinsic'],
    [
      ['border-box', '*, *::before, *::after {\n  box-sizing: border-box;\n}', 'css'],
      ['panel-width', '.launch-panel {\n  max-inline-size: 100%;\n}', 'css'],
    ]
  ),
  caseFor(
    'css-box-model',
    'Margin Collapse and Logical Spacing',
    'vertical rhythm changes when wrappers and writing mode change',
    'Identify whether margins collapse, use flow ownership deliberately, and express spacing on logical axes.',
    'All adjacent margins add together and physical top is always the block start.',
    ['collapse', 'logical', 'flow'],
    [
      ['flow-spacing', '.launch-flow > * + * {\n  margin-block-start: 1.5rem;\n}', 'css'],
      [
        'logical-padding',
        '.launch-panel {\n  padding-block: 1rem;\n  padding-inline: 1.25rem;\n}',
        'css',
      ],
    ]
  ),
  caseFor(
    'flex-pattern-selection',
    'Flex Shrink and Auto-Minimum Failure',
    'long action text forces a toolbar beyond the viewport',
    'Inspect base size, free space, shrink factors, and automatic minimums before choosing a bounded wrap or min-inline-size repair.',
    'Flex one makes every item equal width regardless of intrinsic content.',
    ['basis', 'shrink', 'minimum'],
    [
      [
        'flex-toolbar',
        '.launch-toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}',
        'css',
      ],
      ['flex-child', '.launch-toolbar > * {\n  min-inline-size: 0;\n}', 'css'],
    ]
  ),
  caseFor(
    'flex-pattern-selection',
    'Flex Visual Order Accessibility Risk',
    'CSS order moves the primary action before its explanation',
    'Keep meaningful DOM and focus order, then use Flexbox only for visual distribution that remains understandable.',
    'The order property updates screen-reader and keyboard order to match the screen.',
    ['source', 'focus', 'order'],
    [
      [
        'order-policy',
        '/* Flex visual order never replaces meaningful DOM, reading, and focus order. */',
        'css',
      ],
      ['action-order', '.launch-action {\n  order: 0;\n}', 'css'],
    ]
  ),
  caseFor(
    'grid-track-sizing',
    'Grid Auto-Minimum Overflow',
    'a long command expands a one-fr content track',
    'Account for min-content contribution before fr distribution and use minmax zero only when wrapping or localized overflow preserves content.',
    'One fr always shrinks below every content minimum.',
    ['min-content', 'minmax', 'fr'],
    [
      [
        'grid-tracks',
        '.launch-grid {\n  grid-template-columns: fit-content(18rem) minmax(0, 1fr);\n}',
        'css',
      ],
      ['grid-child', '.launch-grid__content {\n  min-inline-size: 0;\n}', 'css'],
    ]
  ),
  caseFor(
    'grid-track-sizing',
    'Implicit Track Placement Drift',
    'an extra evidence card creates an unexpected implicit column',
    'Inspect explicit tracks, auto-flow, placement, and generated-track sizing under changed item counts.',
    'Implicit tracks use the same size as explicit tracks automatically.',
    ['implicit', 'placement', 'auto-flow'],
    [
      ['implicit-rows', '.evidence-grid {\n  grid-auto-rows: minmax(min-content, auto);\n}', 'css'],
      [
        'placement-policy',
        '/* Inspect implicit tracks whenever item count or explicit placement changes. */',
        'css',
      ],
    ]
  ),
  caseFor(
    'responsive-test-matrix',
    'Zoom and Long-Content Breakpoint Failure',
    'translated claims collide immediately below a device-named breakpoint',
    'Choose thresholds from actual content failure and test below, at, and above them with zoom and translation.',
    'Phone tablet and desktop screenshots cover responsive behavior sufficiently.',
    ['breakpoint', 'zoom', 'boundary'],
    [
      [
        'breakpoint-note',
        '/* Breakpoint follows measured content collision, not a device category. */',
        'css',
      ],
      [
        'boundary-note',
        '/* Retest below, at, and above the threshold with 200% zoom and translated content. */',
        'css',
      ],
    ]
  ),
  caseFor(
    'responsive-test-matrix',
    'Media and Preference Matrix Gap',
    'image selection and forced-color states were omitted from release evidence',
    'Record currentSrc, embed ratio, input modes, preferences, print, containers, and task outcomes alongside viewport sizes.',
    'A layout screenshot proves suitable image bytes and preference behavior.',
    ['currentSrc', 'preference', 'outcome'],
    [
      [
        'matrix-note',
        '/* Matrix: currentSrc, embed ratio, keyboard, touch, reduced motion, forced colors, print, and containers. */',
        'css',
      ],
      ['media-width', '.launch-media {\n  max-inline-size: 100%;\n}', 'css'],
    ]
  ),
  caseFor(
    'css-accessibility-regression',
    'Focus and Forced-Color Boundary Loss',
    'focus disappears on themed actions in forced colors',
    'Preserve a visible focus boundary with system-color behavior and verify it is not clipped in every state.',
    'Hover color is an adequate keyboard focus indicator.',
    ['focus', 'system', 'boundary'],
    [
      [
        'focus-ring',
        '.launch-shell :is(a, button, input):focus-visible {\n  outline: 0.2rem solid var(--launch-focus);\n  outline-offset: 0.2rem;\n}',
        'css',
      ],
      [
        'forced-focus',
        '@media (forced-colors: active) {\n  .launch-shell :focus-visible { outline-color: Highlight; }\n}',
        'css',
      ],
    ]
  ),
  caseFor(
    'css-accessibility-regression',
    'Hidden State and Motion Preference Loss',
    'a hidden panel remains focusable and status vanishes when motion stops',
    'Synchronize semantic hidden state, focus reachability, visible text, and a nonmotion status alternative.',
    'Opacity zero removes descendants from keyboard and accessibility navigation.',
    ['hidden', 'focus', 'status'],
    [
      ['hidden-state', '[hidden] {\n  display: none !important;\n}', 'css'],
      [
        'motion-status',
        '@media (prefers-reduced-motion: reduce) {\n  .save-status { animation: none; opacity: 1; }\n}',
        'css',
      ],
    ]
  ),
  caseFor(
    'css-debug-method',
    'Computed Cascade Root-Cause Trace',
    'a valid declaration appears in source but not in computed output',
    'Verify parsing, selector match, cascade winner, variable resolution, and property grammar before editing.',
    'Valid-looking source means the browser must apply the declaration.',
    ['parsed', 'winner', 'computed'],
    [
      [
        'debug-hypothesis',
        '/* Hypothesis: a later layer wins; verify matched rules and computed value before repair. */',
        'css',
      ],
      [
        'debug-retest',
        '/* Retest default, theme, component override, and forced-color states. */',
        'css',
      ],
    ]
  ),
  caseFor(
    'css-debug-method',
    'Layout and Overflow Root-Cause Trace',
    'horizontal scrolling returns only with long generated content',
    'Reduce the content case, inspect boxes and intrinsic tracks, identify the first overflowing descendant, and repair its contract.',
    'Overflow hidden on body is the fastest complete solution.',
    ['overflow', 'intrinsic', 'descendant'],
    [
      ['overflow-probe', '.overflow-probe {\n  outline: 2px solid magenta;\n}', 'css'],
      [
        'overflow-repair',
        '.long-content {\n  min-inline-size: 0;\n  overflow-wrap: anywhere;\n}',
        'css',
      ],
    ]
  ),
  caseFor(
    'css-animation-debug',
    'Transform Composition Conflict',
    'an orbit animation removes a static positioning transform',
    'Inspect the complete animated transform value and compose every required function explicitly or separate wrapper responsibilities.',
    'Animated and static transforms merge automatically.',
    ['transform', 'composition', 'wrapper'],
    [
      [
        'motion-wrapper',
        '.motion-position {\n  transform: translate(var(--x), var(--y));\n}',
        'css',
      ],
      [
        'motion-child',
        '.motion-rotation {\n  animation: rotate-only 12s linear infinite;\n}',
        'css',
      ],
    ]
  ),
  caseFor(
    'css-animation-debug',
    'Animation Precedence and Preference Incident',
    'a shorthand resets timing and reduced-motion override loses',
    'Trace active animation, shorthand longhands, keyframe name, precedence, fill, and preference rule order in computed evidence.',
    'Important on animation-name repairs every timing and preference conflict.',
    ['shorthand', 'precedence', 'preference'],
    [
      [
        'motion-longhands',
        '.motion-rotation {\n  animation-name: rotate-only;\n  animation-duration: 12s;\n  animation-iteration-count: infinite;\n}',
        'css',
      ],
      [
        'motion-reduction',
        '@media (prefers-reduced-motion: reduce) {\n  .motion-rotation { animation: none; transform: none; }\n}',
        'css',
      ],
    ]
  ),
];

const result = await generateRwdCumulativeAssessment({
  courseId: 'responsive-web-design',
  moduleId: 'cumulative-css-review',
  moduleTitle: 'Cumulative CSS Review',
  moduleDescription:
    'Retrieve CSS cascade, box, Flexbox, Grid, responsive, accessibility, debugging, and motion skills across sixteen changed production incidents with cumulative repairs and regression evidence.',
  moduleObjectives: [
    'Integrate CSS algorithms and accessibility constraints without introducing new concepts.',
    'Diagnose changed production failures from source, computed, layout, interaction, and user evidence.',
    'Repair root causes while preserving all earlier responsive and accessible requirements.',
  ],
  order: 28,
  prerequisiteModuleId: 'purposeful-accessible-motion-systems',
  priorLastActivityId: 'mapped-quiz-css-animations',
  insertAfterModuleId: 'purposeful-accessible-motion-systems',
  courseEstimatedHours: 3650,
  kind: 'review',
  activityId: 'mapped-review-css',
  activityTitle: 'Cumulative CSS Production Review',
  shortTitle: 'CSS review',
  summary:
    'Integrate retained cascade, box, Flexbox, Grid, responsive, accessibility, debugging, and motion knowledge through sixteen unfamiliar production failures and cumulative code repairs.',
  activityObjectives: [
    'Diagnose CSS failures with algorithms and browser evidence instead of random declarations.',
    'Apply sixteen bounded repairs while every earlier code check remains active.',
    'Defend each decision with cause, user consequence, failed state, and regression retest.',
  ],
  estimatedMinutes: 600,
  artifactId: 'ethical-learning-product-launch',
  artifactName: 'the Ethical Product Launch',
  starterFiles: {
    html: '<!-- Continue the Ethical Product Launch release candidate here. -->',
    css: '/* Apply cumulative CSS review repairs here. */',
    javascript: '',
  },
  cases,
});

console.log(
  `Generated Cumulative CSS Review: ${result.interactions} interactions, ${result.checks} checks.`
);
