import { generateRwdProject } from './lib/generate-rwd-project.mjs';

const milestone = (
  phase,
  title,
  instruction,
  competencyId,
  correct,
  misconception,
  terms,
  requirements
) => ({ phase, title, instruction, competencyId, correct, misconception, terms, requirements });

const milestones = [
  milestone(
    'Document',
    'Establish a complete technical document',
    'Create the document language, metadata, title, and responsive viewport contract.',
    'html-document-boilerplate',
    'A complete head gives browsers and assistive technology stable language, encoding, title, and viewport context.',
    'A main heading can replace document metadata because visible text supplies every browser contract.',
    ['document', 'language', 'viewport'],
    [
      ['doctype', '<!doctype html>', 'html'],
      ['language', '<html lang="en">', 'html'],
      ['viewport', '<meta name="viewport" content="width=device-width, initial-scale=1">', 'html'],
      ['title', '<title>Incident Response Developer Field Manual</title>', 'html'],
    ]
  ),
  milestone(
    'Access',
    'Add a first-focus skip link',
    'Provide a visible-on-focus route directly to the manual content.',
    'keyboard-focus',
    'A native link before repeated navigation lets keyboard users bypass it and lands on a real target.',
    'A visually hidden skip link works even when focus never makes it visible.',
    ['skip', 'focus', 'target'],
    [
      [
        'skip-link',
        '<a class="skip-link" href="#manual-content">Skip to manual content</a>',
        'html',
      ],
      ['skip-focus', '.skip-link:focus-visible {\n  inset-block-start: 1rem;\n}', 'css'],
    ]
  ),
  milestone(
    'Landmarks',
    'Create distinct header navigation and main regions',
    'Use semantic landmarks whose labels communicate purpose without duplicating roles.',
    'semantic-landmarks',
    'Header, labeled navigation, and main expose a small understandable page-region map.',
    'Adding role attributes to generic containers is always clearer than native elements.',
    ['landmark', 'label', 'main'],
    [
      ['header', '<header class="manual-header">', 'html'],
      ['navigation', '<nav class="manual-nav" aria-labelledby="manual-nav-heading">', 'html'],
      ['nav-heading', '<h2 id="manual-nav-heading">Field manual sections</h2>', 'html'],
      ['main', '<main id="manual-content" tabindex="-1">', 'html'],
    ]
  ),
  milestone(
    'Outline',
    'Name one page topic and its audience',
    'Add a single h1 plus a concise incident-use description.',
    'semantic-heading-outline',
    'One descriptive h1 anchors the page outline while subordinate sections describe distinct tasks.',
    'The logo should be the h1 because it appears first and is visually prominent.',
    ['heading', 'topic', 'audience'],
    [
      ['page-heading', '<h1>Incident Response Developer Field Manual</h1>', 'html'],
      [
        'audience',
        '<p>Linkable recovery procedures for support engineers working under incident pressure.</p>',
        'html',
      ],
    ]
  ),
  milestone(
    'Navigation',
    'Create stable internal destinations',
    'Add five descriptive fragment links in a real list.',
    'html-links-urls',
    'Fragment links and matching unique IDs make instructions shareable and keyboard reachable.',
    'JavaScript click handlers on paragraphs create equivalent internal navigation.',
    ['fragment', 'destination', 'list'],
    [
      ['nav-list', '<ul class="manual-nav__list">', 'html'],
      ['triage-link', '<a href="#triage">Triage the incident</a>', 'html'],
      ['logs-link', '<a href="#logs">Collect diagnostic logs</a>', 'html'],
      ['rollback-link', '<a href="#rollback">Run a safe rollback</a>', 'html'],
      ['verify-link', '<a href="#verification">Verify recovery</a>', 'html'],
      ['handoff-link', '<a href="#handoff">Prepare the handoff</a>', 'html'],
    ]
  ),
  milestone(
    'Sections',
    'Build the five linkable technical sections',
    'Create semantic sections whose IDs exactly match navigation fragments.',
    'semantic-landmarks',
    'Section elements with headings and stable IDs expose meaningful grouped destinations.',
    'A collection of identically styled div elements communicates the same section structure.',
    ['section', 'id', 'destination'],
    [
      ['triage-section', '<section id="triage" class="manual-section">', 'html'],
      ['logs-section', '<section id="logs" class="manual-section">', 'html'],
      ['rollback-section', '<section id="rollback" class="manual-section">', 'html'],
      ['verification-section', '<section id="verification" class="manual-section">', 'html'],
      ['handoff-section', '<section id="handoff" class="manual-section">', 'html'],
    ]
  ),
  milestone(
    'Outline',
    'Give every technical section a task heading',
    'Add one h2 per section in the same order as navigation.',
    'semantic-heading-outline',
    'A consistent h2 level makes the manual outline reflect peer incident tasks.',
    'Heading levels should follow font size rather than document relationships.',
    ['outline', 'level', 'task'],
    [
      ['triage-heading', '<h2>Triage the incident</h2>', 'html'],
      ['logs-heading', '<h2>Collect diagnostic logs</h2>', 'html'],
      ['rollback-heading', '<h2>Run a safe rollback</h2>', 'html'],
      ['verify-heading', '<h2>Verify recovery</h2>', 'html'],
      ['handoff-heading', '<h2>Prepare the handoff</h2>', 'html'],
    ]
  ),
  milestone(
    'Instructions',
    'Write ordered triage actions',
    'Use an ordered list for steps whose sequence changes the result.',
    'html-text-headings-lists',
    'An ordered list preserves procedural dependency in visual and announced structure.',
    'Number characters typed into paragraphs create an equivalent procedural list.',
    ['ordered', 'procedure', 'dependency'],
    [
      [
        'triage-steps',
        '<ol><li>Confirm the affected user task and time window.</li><li>Preserve current evidence before changing state.</li><li>Reproduce the smallest failed path.</li></ol>',
        'html',
      ],
    ]
  ),
  milestone(
    'Code',
    'Add a copyable log command',
    'Represent a multi-line shell command with pre and code rather than decorative prose.',
    'semantic-text-meaning',
    'Pre preserves meaningful line breaks and code identifies machine-readable command text.',
    'A monospace CSS class supplies the complete semantics of a command example.',
    ['pre', 'code', 'command'],
    [
      [
        'log-command',
        '<pre class="code-block" tabindex="0" aria-label="Log collection command"><code>journalctl --since "15 minutes ago"\n  --priority warning</code></pre>',
        'html',
      ],
    ]
  ),
  milestone(
    'Code',
    'Localize long-line code overflow',
    'Allow only the code block to scroll horizontally and expose its focus boundary.',
    'css-overflow',
    'Localized auto overflow keeps every command reachable without forcing page-level horizontal scrolling.',
    'Overflow hidden improves code readability because clipped flags are rarely important.',
    ['overflow', 'scroll', 'focus'],
    [
      [
        'code-overflow',
        '.code-block {\n  max-inline-size: 100%;\n  overflow-x: auto;\n  white-space: pre;\n}',
        'css',
      ],
      [
        'code-focus',
        '.code-block:focus-visible {\n  outline: 0.2rem solid #b45309;\n  outline-offset: 0.2rem;\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Safety',
    'Separate rollback warnings from procedure',
    'Add a labeled aside before destructive rollback commands.',
    'semantic-landmarks',
    'A labeled complementary warning preserves context while distinguishing risk from the primary procedure.',
    'Red text without a label communicates destructive risk to every reader.',
    ['aside', 'warning', 'risk'],
    [
      [
        'warning-aside',
        '<aside class="warning" aria-labelledby="rollback-warning-heading">',
        'html',
      ],
      ['warning-heading', '<h3 id="rollback-warning-heading">Rollback safety check</h3>', 'html'],
      [
        'warning-text',
        '<p>Confirm the backup, change owner, and recovery path before running rollback commands.</p>',
        'html',
      ],
    ]
  ),
  milestone(
    'Links',
    'Add destination-specific references',
    'Link the handoff to a named runbook and make external context explicit in text.',
    'html-links-urls',
    'Descriptive link text remains meaningful when read out of surrounding prose.',
    'Read more is sufficient because users can always inspect its URL.',
    ['link', 'destination', 'context'],
    [
      [
        'runbook-link',
        '<a href="/runbooks/service-recovery">Open the service recovery runbook</a>',
        'html',
      ],
      [
        'status-link',
        '<a href="https://status.example.org/incidents">Review current incident status on the public status site</a>',
        'html',
      ],
    ]
  ),
  milestone(
    'Table',
    'Create a compact verification command reference',
    'Use real column and row headers for two-dimensional command data.',
    'table-header-associations',
    'Table headers preserve command and outcome relationships during cell navigation.',
    'Bold first-row cells provide all required table associations.',
    ['table', 'header', 'association'],
    [
      ['command-table', '<table><caption>Recovery verification commands</caption>', 'html'],
      [
        'command-headers',
        '<thead><tr><th scope="col">Check</th><th scope="col">Command</th><th scope="col">Pass evidence</th></tr></thead>',
        'html',
      ],
      [
        'command-row',
        '<tbody><tr><th scope="row">Health endpoint</th><td><code>curl /health</code></td><td>HTTP 200 with ready status</td></tr></tbody>',
        'html',
      ],
    ]
  ),
  milestone(
    'Base',
    'Create a readable narrow-first manual',
    'Apply intrinsic width, readable measure, flexible spacing, and border-box sizing.',
    'responsive-mobile-first',
    'The unqueried base must complete every reading and navigation task at narrow widths.',
    'The narrow base may omit the navigation because a desktop query restores it.',
    ['base', 'measure', 'intrinsic'],
    [
      ['box-sizing', '*, *::before, *::after {\n  box-sizing: border-box;\n}', 'css'],
      [
        'manual-width',
        '.manual-shell {\n  inline-size: min(100% - 2rem, 80rem);\n  margin-inline: auto;\n}',
        'css',
      ],
      ['reading-measure', '.manual-section > :is(p, ol, ul) {\n  max-inline-size: 70ch;\n}', 'css'],
    ]
  ),
  milestone(
    'Base',
    'Keep narrow navigation in normal flow',
    'Make links wrap and keep navigation non-sticky by default.',
    'responsive-mobile-first',
    'Normal-flow navigation avoids covering content when narrow space or zoom leaves no stable sticky region.',
    'Sticky positioning should be the mobile default because navigation must always stay visible.',
    ['flow', 'wrap', 'narrow'],
    [
      ['nav-flow', '.manual-nav {\n  position: static;\n}', 'css'],
      [
        'nav-wrap',
        '.manual-nav__list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Breakpoint',
    'Add a content-driven two-column enhancement',
    'Create a navigation and content grid only after the section links fit.',
    'responsive-content-breakpoints',
    'The threshold repairs a documented content need and retains a flexible main track.',
    'The breakpoint should equal a popular tablet width even if the navigation collides earlier.',
    ['content', 'breakpoint', 'grid'],
    [
      [
        'breakpoint-record',
        '/* At 56rem the full navigation fits beside 70ch technical content without collision. */',
        'css',
      ],
      [
        'manual-grid',
        '@media (width >= 56rem) {\n  .manual-shell {\n    display: grid;\n    grid-template-columns: minmax(12rem, 18rem) minmax(0, 1fr);\n    gap: 2rem;\n  }\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Sticky',
    'Enhance the wide navigation with bounded sticky behavior',
    'Apply sticky positioning inside its own grid track with a visible offset.',
    'css-fixed-sticky',
    'Sticky navigation remains in flow until its threshold and stays bounded by its containing block.',
    'Sticky navigation behaves like fixed positioning and never depends on ancestor overflow.',
    ['sticky', 'offset', 'container'],
    [
      [
        'sticky-nav',
        '@media (width >= 56rem) {\n  .manual-nav {\n    position: sticky;\n    inset-block-start: 1rem;\n    align-self: start;\n    max-block-size: calc(100dvh - 2rem);\n    overflow-y: auto;\n  }\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Targets',
    'Prevent sticky navigation from obscuring fragments',
    'Give every manual section a logical scroll margin.',
    'css-fixed-sticky',
    'Scroll margin reserves space at fragment destinations without changing document order.',
    'Extra top padding on every section is the only reliable fragment offset.',
    ['fragment', 'margin', 'target'],
    [
      ['scroll-margin', '.manual-section {\n  scroll-margin-block-start: 2rem;\n}', 'css'],
      [
        'target-emphasis',
        '.manual-section:target {\n  outline: 0.2rem solid #0369a1;\n  outline-offset: 0.35rem;\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Focus',
    'Give every manual link durable focus',
    'Add a visible focus-visible boundary that is not clipped by navigation or code overflow.',
    'keyboard-focus',
    'A high-contrast outline and offset preserve location across links, skip routes, and scroll regions.',
    'Removing outlines is acceptable when links change color on hover.',
    ['focus-visible', 'outline', 'contrast'],
    [
      [
        'link-focus',
        '.manual-shell a:focus-visible {\n  outline: 0.2rem solid #b45309;\n  outline-offset: 0.2rem;\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Current',
    'Represent current navigation state truthfully',
    'Add a current-page example with text and structural styling rather than color alone.',
    'css-data-aria-state',
    'ARIA current state is authored by the navigation behavior and CSS only reflects it.',
    'A bold navigation link automatically receives aria-current semantics.',
    ['ARIA', 'current', 'state'],
    [
      [
        'current-link',
        '<a href="#triage" aria-current="location">Triage the incident — current section</a>',
        'html',
      ],
      [
        'current-style',
        '.manual-nav [aria-current="location"] {\n  font-weight: 800;\n  text-decoration-thickness: 0.2em;\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Preferences',
    'Preserve manual structure in forced colors',
    'Use system colors for focus target and warning boundaries.',
    'css-accessibility-regression',
    'System colors keep important boundaries aligned with the user color environment.',
    'Forced-colors mode preserves all author background and outline colors unchanged.',
    ['forced colors', 'system', 'boundary'],
    [
      [
        'forced-colors',
        '@media (forced-colors: active) {\n  .manual-section:target,\n  .manual-shell a:focus-visible,\n  .warning {\n    border-color: CanvasText;\n    outline-color: Highlight;\n  }\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Print',
    'Create an incident-ready print version',
    'Remove sticky and scrolling constraints while exposing link destinations.',
    'responsive-test-matrix',
    'Print adaptation keeps procedures and command lines readable when interactive navigation is unavailable.',
    'The browser automatically prints sticky sidebars and clipped code in a useful order.',
    ['print', 'links', 'overflow'],
    [
      [
        'print-rules',
        '@media print {\n  .manual-shell {\n    display: block;\n  }\n  .manual-nav {\n    position: static;\n    max-block-size: none;\n    overflow: visible;\n  }\n  .code-block {\n    white-space: pre-wrap;\n  }\n  .manual-section {\n    break-inside: avoid;\n  }\n}',
        'css',
      ],
      [
        'print-links',
        '@media print {\n  .manual-section a[href^="http"]::after {\n    content: " (" attr(href) ")";\n  }\n}',
        'css',
      ],
    ]
  ),
  milestone(
    'Evidence',
    'Publish the responsive manual test matrix',
    'Record fragment, keyboard, zoom, content, sticky, code, preference, and print outcomes.',
    'responsive-test-matrix',
    'A recorded matrix makes responsive claims reproducible across task and environmental changes.',
    'Three viewport screenshots prove navigation, fragments, code overflow, focus, and print behavior.',
    ['matrix', 'outcome', 'boundary'],
    [
      ['evidence-section', '<section aria-labelledby="manual-evidence-heading">', 'html'],
      [
        'evidence-heading',
        '<h2 id="manual-evidence-heading">Field manual verification record</h2>',
        'html',
      ],
      [
        'evidence-list',
        '<ul><li>Every fragment lands with its heading visible and focus preserved.</li><li>Long commands, translated links, 200% zoom, and narrow widths avoid page overflow.</li><li>Keyboard, touch, forced colors, and print preserve every incident task.</li></ul>',
        'html',
      ],
    ]
  ),
  milestone(
    'Audit',
    'Verify heading and landmark navigation',
    'Add a concise assistive-technology inspection record.',
    'accessibility-test-strategy',
    'Manual plus automated evidence catches outline, landmark, link, focus, and zoom failures that markup validation alone misses.',
    'Passing an automated audit proves the reading order and link purpose are correct.',
    ['manual', 'automated', 'assistive'],
    [
      [
        'access-audit',
        '<p>Audit record: landmark and heading lists match the visual order; links are meaningful out of context; skip, fragment, and code-scroll focus were manually verified.</p>',
        'html',
      ],
    ]
  ),
  milestone(
    'Handoff',
    'Document the sticky-navigation decision',
    'Record why sticky behavior is an enhancement and how its boundaries are retested.',
    'css-fixed-sticky',
    'A decision record preserves the evidence and conditions behind a potentially risky positioning choice.',
    'Sticky navigation needs no documentation because its effect is visually obvious.',
    ['sticky', 'boundary', 'retest'],
    [
      [
        'sticky-decision',
        '/* Sticky navigation activates only when content fits beside the manual; retest fragments, zoom, short viewports, and ancestor overflow after changes. */',
        'css',
      ],
    ]
  ),
];

const result = await generateRwdProject({
  courseId: 'responsive-web-design',
  moduleId: 'developer-field-manual-project',
  moduleTitle: 'Certification Project: Developer Field Manual',
  moduleDescription:
    'Build an incident-ready, linkable technical manual with semantic information architecture, readable code, responsive and sticky navigation, durable fragment and keyboard behavior, print adaptation, and a reproducible accessibility matrix.',
  moduleObjectives: [
    'Organize technical instructions with semantic landmarks, headings, lists, code, tables, warnings, and descriptive links.',
    'Build narrow-first navigation and enhance it with bounded sticky behavior only when content supports it.',
    'Preserve fragment targets, keyboard focus, code access, zoom, forced colors, and print output.',
    'Publish implementation and manual-test evidence suitable for support-engineering handoff.',
  ],
  order: 23,
  prerequisiteModuleId: 'responsive-systems-content-out',
  priorLastActivityId: 'mapped-quiz-responsive-web-design',
  insertAfterModuleId: 'responsive-systems-content-out',
  courseEstimatedHours: 2520,
  activityId: 'mapped-lab-technical-documentation-page',
  activityTitle: 'Certification Project: Incident Response Developer Field Manual',
  shortTitle: 'field manual',
  summary:
    'Deliver an original support-engineering manual whose technical content, navigation, code examples, fragment destinations, responsive behavior, keyboard access, and test evidence remain useful during incidents on any supported device.',
  activityObjectives: [
    'Create five or more linkable technical sections and a coherent semantic outline.',
    'Implement narrow-first navigation whose optional sticky enhancement never obscures content or targets.',
    'Keep prose, code, commands, warnings, tables, and links readable and operable at zoom and narrow widths.',
    'Verify keyboard, fragment, long-content, forced-color, short-viewport, and print behavior with recorded evidence.',
  ],
  context: 'an incident manual used by support engineers under time pressure',
  artifactId: 'developer-field-manual',
  coverage: [
    'html-document-boilerplate',
    'semantic-landmarks',
    'semantic-heading-outline',
    'html-text-headings-lists',
    'semantic-text-meaning',
    'html-links-urls',
    'table-header-associations',
    'responsive-mobile-first',
    'responsive-content-breakpoints',
    'css-fixed-sticky',
    'css-data-aria-state',
    'keyboard-focus',
    'accessibility-test-strategy',
    'responsive-test-matrix',
    'css-overflow',
    'css-accessibility-regression',
  ],
  estimatedMinutes: 560,
  starterFiles: {
    html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n</body>\n</html>',
    css: '/* Build the Incident Response Developer Field Manual here. */',
    javascript: '',
  },
  supportPattern: ['inspect', 'predict', 'arrange', 'debug', 'answer', 'reflect', 'read'],
  codeFirstOn: [1, 4, 7, 10, 13, 16, 19, 22],
  milestones,
});

console.log(
  `Generated Developer Field Manual project: ${result.interactions} interactions, ${result.checks} checks.`
);
