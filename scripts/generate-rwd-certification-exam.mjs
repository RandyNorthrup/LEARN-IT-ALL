import { generateRwdCumulativeAssessment } from './lib/generate-rwd-cumulative-assessment.mjs';

const examCase = (competencyId, title, context, correct, misconception, terms, requirements) => ({
  competencyId,
  title,
  context,
  correct,
  misconception,
  terms,
  requirements,
  sequence: [
    'Identify the user task contract and exact changed failure condition',
    'Collect source native behavior computed layout accessibility and performance evidence',
    'Apply one cause-level repair without discarding earlier certification requirements',
    'Rerun the failure plus retained content input preference media and output scenarios',
  ],
});

const cases = [
  examCase(
    'html-document-boilerplate',
    'Multilingual Document Contract Release',
    'a localization build drops language title and viewport metadata',
    'Restore standards mode, encoding, document language, specific title, and viewport behavior before judging body fragments.',
    'Rendered body content proves head metadata and document language are optional.',
    ['doctype', 'language', 'viewport'],
    [
      [
        'document-head',
        '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Community Learning Service Status</title>',
        'html',
      ],
    ]
  ),
  examCase(
    'html-document-boilerplate',
    'Parsing and Metadata Failure Isolation',
    'a copied component places body content in head and duplicates IDs',
    'Validate the full document boundary, repair parsing structure, and make every referenced ID unique before styling symptoms.',
    'Browsers repair invalid nesting consistently enough that validation adds no useful evidence.',
    ['parsing', 'metadata', 'unique'],
    [
      ['body-boundary', '</head>\n<body>', 'html'],
      ['unique-main', '<main id="service-status">', 'html'],
    ]
  ),
  examCase(
    'semantic-landmarks',
    'Duplicate Main and Navigation Map',
    'two application shells each expose main and unnamed navigation',
    'Keep one main for the page and label repeated navigation landmarks by distinct purpose using native elements.',
    'Every visually important panel should be a main landmark.',
    ['main', 'navigation', 'label'],
    [
      ['landmark-map', '<header><nav aria-label="Service status sections">', 'html'],
      ['single-main', '<main id="service-status">', 'html'],
    ]
  ),
  examCase(
    'semantic-landmarks',
    'Source Order and Section Relationship Audit',
    'visual Grid placement makes evidence appear before its heading and context',
    'Write meaningful source order with headings inside their sections, then use layout without changing reading or focus relationships.',
    'Grid placement updates the semantic reading order automatically.',
    ['source', 'heading', 'section'],
    [
      [
        'evidence-section',
        '<section aria-labelledby="evidence-heading">\n  <h2 id="evidence-heading">Verification evidence</h2>',
        'html',
      ],
      [
        'order-policy',
        '<!-- Visual placement never replaces meaningful DOM, reading, and focus order. -->',
        'html',
      ],
    ]
  ),
  examCase(
    'form-labels-instructions',
    'Interest Form Name and Description Repair',
    'placeholder-only fields lose instructions after typing',
    'Provide persistent visible labels, unique for-id pairs, autocomplete, and programmatic descriptions for help and errors.',
    'Placeholder and visual proximity create a durable accessible label and description.',
    ['label', 'description', 'autocomplete'],
    [
      [
        'email-field',
        '<label for="status-email">Email address</label>\n<input id="status-email" name="email" type="email" autocomplete="email" required aria-describedby="email-help email-error">',
        'html',
      ],
      [
        'email-help',
        '<p id="email-help">Used only for requested service-status updates.</p>',
        'html',
      ],
    ]
  ),
  examCase(
    'form-labels-instructions',
    'Grouped Choices and Error Recovery',
    'checkbox purpose and invalid-field recovery are unclear',
    'Group related choices with fieldset and legend, publish text errors, and connect a summary back to each invalid control.',
    'A colored border and a heading above checkbox divs provide equivalent grouping and recovery.',
    ['fieldset', 'error', 'recovery'],
    [
      ['choice-group', '<fieldset><legend>Optional update topics</legend>', 'html'],
      [
        'error-summary',
        '<div role="alert" tabindex="-1"><h2>Check the update form</h2><a href="#status-email">Enter a valid email address</a></div>',
        'html',
      ],
    ]
  ),
  examCase(
    'accessibility-test-strategy',
    'Automation-Only Release Decision',
    'a clean rule scan is treated as certification proof',
    'Combine validation and automated rules with task-based keyboard, zoom, reflow, preferences, changed states, and assistive-technology checks.',
    'A perfect automated score proves usable access and complete conformance.',
    ['automated', 'manual', 'evidence'],
    [
      [
        'test-record',
        '<ul><li>Automated: parsing, names, contrast, and rule scans recorded.</li><li>Manual: keyboard, zoom, reflow, screen-reader structure, forced colors, reduced motion, and print verified.</li></ul>',
        'html',
      ],
    ]
  ),
  examCase(
    'accessibility-test-strategy',
    'Keyboard Zoom and Preference Regression Matrix',
    'the release passes at default desktop settings but loses focus at zoom and status without motion',
    'Test representative tasks across input, zoom, content, orientation, preferences, output, and failure states with reproducible outcomes.',
    'Desktop mouse completion is representative of every supported access path.',
    ['keyboard', 'zoom', 'preference'],
    [
      [
        'matrix-record',
        '<p>Matrix result: keyboard and touch tasks pass at narrow width and 200% zoom; focus, forced colors, reduced motion, long content, invalid forms, and print preserve meaning.</p>',
        'html',
      ],
    ]
  ),
  examCase(
    'css-cascade-origins-layers',
    'Layered Theme Cascade Conflict',
    'an unlayered campaign rule overrides a component theme unexpectedly',
    'Trace origin, importance, layer order, specificity, scope, and source order before changing selector strength.',
    'Adding an ID and important is the correct first repair for any cascade conflict.',
    ['origin', 'layer', 'winner'],
    [
      ['layer-order', '@layer reset, base, components, utilities;', 'css'],
      [
        'component-layer',
        '@layer components {\n  .status-action { color: var(--action-text); }\n}',
        'css',
      ],
    ]
  ),
  examCase(
    'css-cascade-origins-layers',
    'Custom Property and Shorthand Resolution',
    'a theme token is present but a shorthand and local override change the result',
    'Inspect the winning token at the consumer, shorthand resets, inheritance, and final property grammar in computed styles.',
    'Custom properties are replaced before cascade and cannot be overridden locally.',
    ['token', 'shorthand', 'computed'],
    [
      [
        'semantic-token',
        ':root {\n  --action-text: #ffffff;\n}\n.status-panel {\n  --action-text: #f8fafc;\n}',
        'css',
      ],
      [
        'computed-note',
        '/* Inspect the winning custom property on the consumer and the final computed property separately. */',
        'css',
      ],
    ]
  ),
  examCase(
    'css-box-model',
    'Intrinsic Box Overflow at Zoom',
    'padding, border, and an unbreakable identifier widen a status card',
    'Inspect content padding border margin and intrinsic minimums, then make sizing predictable and preserve the identifier through wrapping or localized overflow.',
    'Overflow hidden on the page proves the box model defect is repaired.',
    ['border-box', 'intrinsic', 'overflow'],
    [
      ['box-sizing', '*, *::before, *::after {\n  box-sizing: border-box;\n}', 'css'],
      [
        'identifier-wrap',
        '.service-identifier {\n  min-inline-size: 0;\n  overflow-wrap: anywhere;\n}',
        'css',
      ],
    ]
  ),
  examCase(
    'css-box-model',
    'Logical Spacing and Containing Block Audit',
    'a positioned badge and physical margins fail in vertical writing mode',
    'Identify the containing block and use logical inset and spacing properties that follow the content axes.',
    'Top and left always match block-start and inline-start.',
    ['containing block', 'logical', 'inset'],
    [
      [
        'position-context',
        '.status-card {\n  position: relative;\n  padding-block: 1rem;\n  padding-inline: 1.25rem;\n}',
        'css',
      ],
      [
        'logical-badge',
        '.status-badge {\n  position: absolute;\n  inset-block-start: 0.5rem;\n  inset-inline-end: 0.5rem;\n}',
        'css',
      ],
    ]
  ),
  examCase(
    'flex-pattern-selection',
    'Flex Free-Space Algorithm Incident',
    'long translated actions shrink unpredictably in a toolbar',
    'Trace base sizes, grow and shrink factors, free space, automatic minimums, and wrapping rather than guessing equal widths.',
    'Flex one means every item remains exactly equal regardless of content.',
    ['basis', 'shrink', 'free space'],
    [
      [
        'toolbar-flex',
        '.status-toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}',
        'css',
      ],
      [
        'toolbar-items',
        '.status-toolbar > * {\n  flex: 1 1 12rem;\n  min-inline-size: 0;\n}',
        'css',
      ],
    ]
  ),
  examCase(
    'flex-pattern-selection',
    'Flex Source and Focus Order Audit',
    'CSS order makes a secondary action appear first while focus follows DOM',
    'Keep task priority in source order and use Flexbox distribution without visual reordering that contradicts reading or focus.',
    'Positive tabindex values should copy the current visual Flexbox order.',
    ['source', 'visual', 'focus'],
    [
      [
        'flex-order-note',
        '/* DOM, reading, and focus order carry task priority; Flex visual order does not replace them. */',
        'css',
      ],
      ['default-order', '.status-toolbar > * {\n  order: 0;\n}', 'css'],
    ]
  ),
  examCase(
    'grid-track-sizing',
    'Grid Intrinsic Track Sizing Failure',
    'one-fr content overflows beside a fixed navigation track',
    'Resolve fixed and intrinsic minimums before leftover fr space, then use a shrinkable minmax track only when content remains accessible.',
    'One fr is one viewport fraction and always shrinks below min-content.',
    ['intrinsic', 'minmax', 'fr'],
    [
      [
        'grid-layout',
        '.status-layout {\n  display: grid;\n  grid-template-columns: fit-content(18rem) minmax(0, 1fr);\n  gap: 2rem;\n}',
        'css',
      ],
      ['grid-content', '.status-content {\n  min-inline-size: 0;\n}', 'css'],
    ]
  ),
  examCase(
    'grid-track-sizing',
    'Grid Placement and Subgrid Alignment Case',
    'visual placement changes source meaning and nested card rows drift',
    'Preserve source order, use placement only for presentation, and share parent tracks with subgrid behind a usable fallback.',
    'Nested grids inherit parent tracks automatically and placement changes focus order.',
    ['placement', 'subgrid', 'fallback'],
    [
      [
        'card-fallback',
        '.status-card {\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n}',
        'css',
      ],
      [
        'card-subgrid',
        '@supports (grid-template-rows: subgrid) {\n  .status-card {\n    grid-row: span 3;\n    grid-template-rows: subgrid;\n  }\n}',
        'css',
      ],
    ]
  ),
  examCase(
    'responsive-test-matrix',
    'Content-Driven Breakpoint and Container Case',
    'a reusable status card fails in a narrow sidebar at a wide viewport',
    'Keep a narrow-first base, use viewport queries for page conditions and container queries for local component space, with content-derived thresholds.',
    'A wide viewport guarantees every nested component also has wide space.',
    ['breakpoint', 'container', 'content'],
    [
      [
        'card-container',
        '.status-card-region {\n  container: status-card / inline-size;\n}',
        'css',
      ],
      [
        'card-query',
        '@container status-card (width >= 32rem) {\n  .status-card { grid-template-columns: 10rem minmax(0, 1fr); }\n}',
        'css',
      ],
    ]
  ),
  examCase(
    'responsive-test-matrix',
    'Responsive Media and Boundary Evidence',
    'the layout fits but downloads oversized images and clips video controls',
    'Verify currentSrc, rendered slot, intrinsic dimensions, ratio, labels, controls, and below-at-above breakpoint behavior across zoom and content.',
    'A fluid CSS width proves responsive image selection and embed accessibility.',
    ['currentSrc', 'ratio', 'boundary'],
    [
      [
        'responsive-image',
        '<img src="/images/status-640.jpg" srcset="/images/status-320.jpg 320w, /images/status-640.jpg 640w, /images/status-1280.jpg 1280w" sizes="(width >= 60rem) 50vw, 100vw" width="1280" height="720" alt="Support engineer verifying the community service dashboard">',
        'html',
      ],
      ['media-ratio', '.status-demo {\n  inline-size: 100%;\n  aspect-ratio: 16 / 9;\n}', 'css'],
    ]
  ),
  examCase(
    'css-animation-debug',
    'Animated Transform Composition Failure',
    'a keyframe rotation replaces the component position transform',
    'Inspect the full computed animated transform and compose functions explicitly or split positioning and motion across wrappers.',
    'Static and animated transform declarations merge function by function automatically.',
    ['transform', 'composition', 'computed'],
    [
      [
        'motion-wrapper',
        '.motion-position {\n  transform: translate(var(--motion-x), var(--motion-y));\n}',
        'css',
      ],
      [
        'motion-keyframes',
        '@keyframes status-rotate {\n  from { transform: rotate(0turn); }\n  to { transform: rotate(1turn); }\n}',
        'css',
      ],
    ]
  ),
  examCase(
    'css-animation-debug',
    'Motion Precedence Performance and Reduction Case',
    'a shorthand resets timing and full motion survives the user preference',
    'Trace animation longhands and precedence, measure rendering cost, and provide a status-equivalent reduced-motion state.',
    'Running the complete animation in one millisecond satisfies reduced-motion needs.',
    ['precedence', 'performance', 'alternative'],
    [
      [
        'motion-longhands',
        '.status-motion {\n  animation-name: status-rotate;\n  animation-duration: 8s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n}',
        'css',
      ],
      [
        'motion-reduction',
        '@media (prefers-reduced-motion: reduce) {\n  .status-motion { animation: none; transform: none; }\n  .status-text { opacity: 1; border-inline-start: 0.4rem solid currentColor; }\n}',
        'css',
      ],
    ]
  ),
  examCase(
    'css-debug-method',
    'Parsed Rule and Computed Winner Investigation',
    'a declaration exists in source but never appears in computed styles',
    'Verify parsing, selector match, cascade winner, token resolution, support, and property grammar with one falsifiable hypothesis.',
    'Valid-looking source means the browser must apply the declaration.',
    ['parsed', 'selector', 'computed'],
    [
      [
        'debug-hypothesis',
        '/* Hypothesis: declaration is parsed but loses its layer; verify matched rules and computed winner. */',
        'css',
      ],
      [
        'debug-result',
        '/* Result: bounded layer-order repair passes default, theme, component, and forced-color states. */',
        'css',
      ],
    ]
  ),
  examCase(
    'css-debug-method',
    'End-to-End Certification Regression Trace',
    'long translated content triggers overflow focus clipping and animation jank only at zoom',
    'Reduce the case, identify the first failing relationship across content, tracks, overflow, focus, and motion, repair it, and rerun the full matrix.',
    'Body overflow hidden and disabled animation are sufficient because the visible symptom disappears.',
    ['root cause', 'bounded', 'regression'],
    [
      [
        'root-cause-record',
        '/* Root cause: intrinsic Grid minimum widened the content track, clipped the focus outline, and enlarged the animated layer at 200% zoom. */',
        'css',
      ],
      [
        'bounded-repair',
        '.certification-content {\n  min-inline-size: 0;\n  overflow-wrap: anywhere;\n}',
        'css',
      ],
      [
        'final-matrix',
        '/* Final matrix: long and short content, narrow and wide containers, 200% zoom, keyboard, touch, image selection, forced colors, reduced motion, and print pass. */',
        'css',
      ],
    ]
  ),
];

const result = await generateRwdCumulativeAssessment({
  courseId: 'responsive-web-design',
  moduleId: 'responsive-web-design-certification-exam',
  moduleTitle: 'Responsive Web Design Certification Exam',
  moduleDescription:
    'Demonstrate integrated responsive web design mastery across twenty-two unfamiliar document, semantic, form, accessibility, cascade, box, Flexbox, Grid, responsive media, motion, and debugging incidents.',
  moduleObjectives: [
    'Integrate HTML, CSS, accessibility, responsive media, layout algorithms, motion, and debugging without guided examples.',
    'Apply twenty-two cumulative implementation repairs while preserving every earlier exam requirement.',
    'Defend cause-level decisions with user consequences, failure states, and multivariable regression evidence.',
  ],
  order: 29,
  prerequisiteModuleId: 'cumulative-css-review',
  priorLastActivityId: 'mapped-review-css',
  insertAfterModuleId: 'cumulative-css-review',
  courseEstimatedHours: 3830,
  kind: 'exam',
  activityId: 'mapped-exam-responsive-web-design-certification',
  activityTitle: 'Responsive Web Design Certification Examination',
  shortTitle: 'RWD exam',
  summary:
    'Complete twenty-two original integrated incidents that assess durable document structure, semantics, forms, accessibility evidence, cascade, box sizing, Flexbox, Grid, responsive media, motion preferences, and root-cause debugging.',
  activityObjectives: [
    'Solve unfamiliar integrated cases without copying workshop solutions.',
    'Keep all cumulative HTML and CSS checks active throughout the examination artifact.',
    'Explain each decision using implementation, user, failure-state, and regression evidence.',
    'Meet the credential threshold only after required projects and this examination pass.',
  ],
  estimatedMinutes: 600,
  artifactId: 'responsive-web-design-certification-evidence',
  artifactName: 'the independent certification evidence artifact',
  starterFiles: {
    html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n</body>\n</html>',
    css: '/* Apply independent certification repairs here. */',
    javascript: '',
  },
  cases,
});

console.log(
  `Generated RWD Certification Exam: ${result.interactions} interactions, ${result.checks} checks.`
);
