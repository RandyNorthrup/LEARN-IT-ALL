import { generateRwdProject } from './lib/generate-rwd-project.mjs';

const milestones = [
  {
    phase: 'Contract',
    title: 'Create the inventory document contract',
    instruction: 'Build a complete English document and connect the inventory stylesheet.',
    competencyId: 'table-structure',
    correct:
      'A valid document shell and linked stylesheet establish predictable parsing before table presentation.',
    misconception:
      'A table fragment has the same language, title, viewport, and stylesheet contract as a complete document.',
    terms: ['document', 'language', 'stylesheet'],
    requirements: [
      ['doctype', '<!doctype html>', 'html'],
      ['language', '<html lang="en">', 'html'],
      ['title', '<title>Accessible Heat-Relief Resource Inventory</title>', 'html'],
      ['stylesheet', '<link rel="stylesheet" href="styles.css">', 'html'],
    ],
  },
  {
    phase: 'Contract',
    title: 'Create the primary task landmark',
    instruction: 'Add a skip route, one main region, and a specific inventory heading.',
    competencyId: 'table-structure',
    correct:
      'A skip target and named main task remain navigable before responsive table treatment.',
    misconception: 'The table caption replaces the page heading and main landmark.',
    terms: ['main', 'skip', 'heading'],
    requirements: [
      ['skip', '<a href="#main-content">Skip to resource inventory</a>', 'html'],
      ['main', '<main id="main-content">', 'html'],
      ['heading', '<h1>Accessible Heat-Relief Resource Inventory</h1>', 'html'],
    ],
  },
  {
    phase: 'Model',
    title: 'Explain the inventory workflow',
    instruction: 'Publish concise guidance that names comparison, status, and action tasks.',
    competencyId: 'table-structure',
    correct:
      'Visible guidance explains how to compare inventory rows without relying on color or position alone.',
    misconception: 'Users infer every status and action from column color automatically.',
    terms: ['guidance', 'status', 'action'],
    requirements: [
      [
        'guidance',
        '<p id="inventory-guidance">Compare item, category, availability, location, and request action for each resource.</p>',
        'html',
      ],
    ],
  },
  {
    phase: 'Model',
    title: 'Create the responsive table region',
    instruction:
      'Add a labeled wrapper that may scroll horizontally without forcing the page to scroll.',
    competencyId: 'css-overflow',
    correct:
      'A localized scroll region preserves genuinely two-dimensional table relationships and page reflow.',
    misconception:
      'The full page should scroll horizontally whenever a data table is wider than the viewport.',
    terms: ['scroll region', 'table', 'reflow'],
    requirements: [
      [
        'table-region',
        '<div class="table-region" role="region" aria-labelledby="inventory-caption" tabindex="0">',
        'html',
      ],
    ],
  },
  {
    phase: 'Model',
    title: 'Create the table and descriptive caption',
    instruction: 'Add a real table whose caption names scope and update context.',
    competencyId: 'table-structure',
    correct: 'A caption identifies the table as a whole before row and column navigation begins.',
    misconception:
      'A visually large paragraph above a div grid provides an equivalent table caption.',
    terms: ['table', 'caption', 'context'],
    requirements: [
      ['table', '<table class="resource-table">', 'html'],
      [
        'caption',
        '<caption id="inventory-caption">Heat-relief supplies updated for the current response period</caption>',
        'html',
      ],
    ],
  },
  {
    phase: 'Headers',
    title: 'Build the column header group',
    instruction: 'Create thead, one row, and five scoped column headers.',
    competencyId: 'table-header-associations',
    correct: 'Real th cells with col scope preserve category context for each data cell.',
    misconception: 'Bold td cells in the first row create the same programmatic associations.',
    terms: ['thead', 'scope', 'column'],
    requirements: [
      ['thead', '<thead>', 'html'],
      ['item-header', '<th scope="col" id="resource-item">Item</th>', 'html'],
      ['category-header', '<th scope="col" id="resource-category">Category</th>', 'html'],
      ['status-header', '<th scope="col" id="resource-status">Availability</th>', 'html'],
      ['location-header', '<th scope="col" id="resource-location">Location</th>', 'html'],
      ['action-header', '<th scope="col" id="resource-action">Action</th>', 'html'],
    ],
  },
  {
    phase: 'Rows',
    title: 'Create the inventory body',
    instruction: 'Add tbody as the owner of changing resource records.',
    competencyId: 'table-structure',
    correct:
      'Tbody groups current inventory records separately from headers and any summary footer.',
    misconception:
      'Rows can be direct arbitrary children of table because browsers always expose the intended grouping.',
    terms: ['tbody', 'rows', 'records'],
    requirements: [['tbody', '<tbody>', 'html']],
  },
  {
    phase: 'Rows',
    title: 'Build the available water row',
    instruction:
      'Add a row header, data cells, truthful status attribute, and visible status text.',
    competencyId: 'css-data-aria-state',
    correct:
      'DOM data state and visible text agree, while the row header provides resource context.',
    misconception: 'A green row is a complete available state even without text or DOM state.',
    terms: ['data state', 'text', 'header'],
    requirements: [
      ['water-row', '<tr data-status="available" data-category="hydration">', 'html'],
      ['water-header', '<th scope="row" id="resource-water">Bottled water cases</th>', 'html'],
      [
        'water-status',
        '<td headers="resource-water resource-status"><span class="status-label">Available</span></td>',
        'html',
      ],
    ],
  },
  {
    phase: 'Rows',
    title: 'Build the limited fan row',
    instruction: 'Add a second row with limited status and different category data.',
    competencyId: 'css-data-aria-state',
    correct:
      'A changed row exercises exact-value state styling without duplicating placeholder content.',
    misconception: 'Every row should use available state so consistent styling proves correctness.',
    terms: ['limited', 'state', 'data'],
    requirements: [
      ['fan-row', '<tr data-status="limited" data-category="cooling">', 'html'],
      ['fan-header', '<th scope="row" id="resource-fans">Portable fans</th>', 'html'],
      [
        'fan-status',
        '<td headers="resource-fans resource-status"><span class="status-label">Limited</span></td>',
        'html',
      ],
    ],
  },
  {
    phase: 'Rows',
    title: 'Build the unavailable transport row',
    instruction: 'Add an unavailable service row with explicit text and no false request action.',
    competencyId: 'css-data-aria-state',
    correct: 'Unavailable state remains truthful in attributes, text, and available actions.',
    misconception:
      'Leaving an active request link is harmless when the row color says unavailable.',
    terms: ['unavailable', 'action', 'truth'],
    requirements: [
      ['transport-row', '<tr data-status="unavailable" data-category="transport">', 'html'],
      [
        'transport-header',
        '<th scope="row" id="resource-transport">Wheelchair transport</th>',
        'html',
      ],
      [
        'transport-status',
        '<td headers="resource-transport resource-status"><span class="status-label">Unavailable</span></td>',
        'html',
      ],
      [
        'transport-action',
        '<td headers="resource-transport resource-action">Join notification list</td>',
        'html',
      ],
    ],
  },
  {
    phase: 'Actions',
    title: 'Associate data cells with complex headers',
    instruction: 'Add explicit headers references for representative category and location cells.',
    competencyId: 'table-header-associations',
    correct:
      'Explicit header IDs make representative complex cells announce row and column context.',
    misconception: 'Cell position and border lines are enough programmatic context.',
    terms: ['headers', 'row', 'column'],
    requirements: [
      ['water-category', '<td headers="resource-water resource-category">Hydration</td>', 'html'],
      [
        'water-location',
        '<td headers="resource-water resource-location">Central warehouse</td>',
        'html',
      ],
      [
        'fan-location',
        '<td headers="resource-fans resource-location">North cooling center</td>',
        'html',
      ],
    ],
  },
  {
    phase: 'Actions',
    title: 'Add destination-specific request actions',
    instruction: 'Add clear links for resources whose current state permits requests.',
    competencyId: 'css-focus-visibility',
    correct:
      'Native links with specific destination text preserve keyboard and contextual meaning.',
    misconception:
      'Every table action can say Select because row position supplies permanent context.',
    terms: ['link', 'destination', 'focus'],
    requirements: [
      [
        'water-action',
        '<a class="resource-action" href="/resources/request?item=water">Request bottled water</a>',
        'html',
      ],
      [
        'fan-action',
        '<a class="resource-action" href="/resources/request?item=fans">Request a portable fan</a>',
        'html',
      ],
    ],
  },
  {
    phase: 'Foundation',
    title: 'Apply predictable table box sizing',
    instruction: 'Use border-box and keep table cells content-driven.',
    competencyId: 'table-structure',
    correct: 'Predictable sizing supports borders and padding while row height grows with content.',
    misconception: 'Fixed cell heights are required for a professional data table.',
    terms: ['box-sizing', 'content', 'growth'],
    requirements: [
      ['box-sizing', '*, *::before, *::after {\n  box-sizing: border-box;\n}', 'css'],
      ['cell-growth', '.resource-table :is(th, td) {\n  block-size: auto;\n}', 'css'],
    ],
  },
  {
    phase: 'Foundation',
    title: 'Localize unavoidable horizontal overflow',
    instruction: 'Make only the table region horizontally scrollable and preserve visible focus.',
    competencyId: 'css-overflow',
    correct: 'Localized auto overflow protects page reflow while leaving all table data reachable.',
    misconception:
      'Overflow hidden repairs a wide table because inaccessible columns are noncritical.',
    terms: ['overflow', 'scroll', 'focus'],
    requirements: [
      [
        'table-overflow',
        '.table-region {\n  max-inline-size: 100%;\n  overflow-x: auto;\n}',
        'css',
      ],
      [
        'region-focus',
        '.table-region:focus-visible {\n  outline: 0.2rem solid #b45309;\n  outline-offset: 0.2rem;\n}',
        'css',
      ],
    ],
  },
  {
    phase: 'Table',
    title: 'Create readable table structure',
    instruction: 'Collapse borders, set full intrinsic width, and align text for scanning.',
    competencyId: 'table-structure',
    correct:
      'Table layout and visible cell boundaries support scanning without replacing semantic associations.',
    misconception: 'Removing every boundary makes dense data easier to track.',
    terms: ['border', 'width', 'scan'],
    requirements: [
      [
        'table-layout',
        '.resource-table {\n  inline-size: 100%;\n  min-inline-size: 48rem;\n  border-collapse: collapse;\n}',
        'css',
      ],
      [
        'cell-style',
        '.resource-table :is(th, td) {\n  padding: 0.75rem;\n  border: 1px solid #64748b;\n  text-align: start;\n}',
        'css',
      ],
    ],
  },
  {
    phase: 'Table',
    title: 'Make caption and headers durable',
    instruction: 'Style caption and headers with readable contrast and non-color boundaries.',
    competencyId: 'css-color-not-only',
    correct: 'Typography and boundaries reinforce table regions independently of background color.',
    misconception: 'Header background hue alone distinguishes every column relationship.',
    terms: ['caption', 'boundary', 'contrast'],
    requirements: [
      [
        'caption-style',
        '.resource-table caption {\n  padding-block: 0.75rem;\n  font-size: 1.25rem;\n  font-weight: 800;\n  text-align: start;\n}',
        'css',
      ],
      [
        'header-style',
        '.resource-table th {\n  color: #ffffff;\n  background-color: #075985;\n  border-block-end-width: 0.2rem;\n}',
        'css',
      ],
    ],
  },
  {
    phase: 'States',
    title: 'Style available state with multiple cues',
    instruction: 'Use exact data state plus a solid boundary and visible status text.',
    competencyId: 'css-attribute-presence-value',
    correct:
      'Exact attribute state drives presentation while solid boundary and text survive color loss.',
    misconception: 'A pale green row alone communicates availability in every mode.',
    terms: ['attribute', 'boundary', 'text'],
    requirements: [
      [
        'available-style',
        '.resource-table tr[data-status="available"] {\n  border-inline-start: 0.4rem solid #166534;\n}',
        'css',
      ],
    ],
  },
  {
    phase: 'States',
    title: 'Style limited state with a different pattern',
    instruction: 'Use exact limited state and a double boundary.',
    competencyId: 'css-data-aria-state',
    correct:
      'A distinct boundary pattern and visible label separate limited state without color alone.',
    misconception: 'A second shade is an independent non-color status cue.',
    terms: ['state', 'pattern', 'label'],
    requirements: [
      [
        'limited-style',
        '.resource-table tr[data-status="limited"] {\n  border-inline-start: 0.4rem double #92400e;\n}',
        'css',
      ],
    ],
  },
  {
    phase: 'States',
    title: 'Style unavailable state without hiding data',
    instruction: 'Use dashed boundary and preserve readable content.',
    competencyId: 'css-data-aria-state',
    correct:
      'Unavailable presentation remains legible and does not remove row context or notification information.',
    misconception: 'Display none is the clearest unavailable-state style.',
    terms: ['unavailable', 'readable', 'context'],
    requirements: [
      [
        'unavailable-style',
        '.resource-table tr[data-status="unavailable"] {\n  border-inline-start: 0.4rem dashed #991b1b;\n}',
        'css',
      ],
    ],
  },
  {
    phase: 'Actions',
    title: 'Protect visible link focus inside the scroll region',
    instruction: 'Add durable link identity and focus that stays above row paint.',
    competencyId: 'css-focus-visibility',
    correct:
      'Underline plus strong focus-visible boundary works across pointer, keyboard, scroll, and row states.',
    misconception: 'Row hover supplies enough focus feedback for links inside it.',
    terms: ['focus-visible', 'link', 'scroll'],
    requirements: [
      [
        'action-link',
        '.resource-action:link {\n  color: #075985;\n  font-weight: 700;\n  text-decoration-thickness: 0.12em;\n}',
        'css',
      ],
      [
        'action-focus',
        '.resource-action:focus-visible {\n  outline: 0.2rem solid #b45309;\n  outline-offset: 0.2rem;\n}',
        'css',
      ],
    ],
  },
  {
    phase: 'Preferences',
    title: 'Preserve the inventory under forced colors',
    instruction: 'Use system colors for table and focus boundaries.',
    competencyId: 'css-color-not-only',
    correct: 'System-color boundaries preserve structure and focus when author colors disappear.',
    misconception: 'Forced colors retains every author background and status hue.',
    terms: ['forced colors', 'system', 'boundary'],
    requirements: [
      [
        'forced-colors',
        '@media (forced-colors: active) {\n  .resource-table :is(th, td) {\n    border-color: CanvasText;\n  }\n  .resource-action:focus-visible {\n    outline-color: Highlight;\n  }\n}',
        'css',
      ],
    ],
  },
  {
    phase: 'Output',
    title: 'Create a printable inventory',
    instruction:
      'Remove scroll constraints and preserve header repetition and row integrity in print.',
    competencyId: 'table-structure',
    correct:
      'Print rules adapt the same semantic table without clipping columns or splitting records carelessly.',
    misconception:
      'A horizontally scrolling screen region prints all hidden columns automatically.',
    terms: ['print', 'headers', 'rows'],
    requirements: [
      [
        'print-table',
        '@media print {\n  .table-region {\n    overflow: visible;\n  }\n  .resource-table {\n    min-inline-size: 0;\n  }\n  .resource-table tr {\n    break-inside: avoid;\n  }\n}',
        'css',
      ],
    ],
  },
  {
    phase: 'Evidence',
    title: 'Publish the inventory regression record',
    instruction: 'Add table navigation, zoom, scrolling, state, forced-color, and print evidence.',
    competencyId: 'css-accessibility-regression',
    correct:
      'A written matrix proves header context, data access, state meaning, focus, and output across changed conditions.',
    misconception: 'A valid HTML table proves scrolling, focus, contrast, and print behavior.',
    terms: ['evidence', 'headers', 'reflow'],
    requirements: [
      ['evidence-section', '<section aria-labelledby="inventory-evidence-heading">', 'html'],
      [
        'evidence-heading',
        '<h2 id="inventory-evidence-heading">Inventory verification record</h2>',
        'html',
      ],
      [
        'evidence-list',
        '<ul><li>Representative cells announce row and column headers.</li><li>Zoom and narrow-width scrolling preserve every column and focus target.</li><li>Status meaning survives grayscale, forced colors, and print.</li></ul>',
        'html',
      ],
    ],
  },
  {
    phase: 'Handoff',
    title: 'Record the table-versus-layout decision',
    instruction:
      'Document why genuine two-dimensional data remains a table and why page layout does not.',
    competencyId: 'table-structure',
    correct: 'A decision record distinguishes data relationships from general visual alignment.',
    misconception:
      'Any aligned card collection should use a table because table cells stay in rows.',
    terms: ['data', 'table', 'layout'],
    requirements: [
      [
        'decision-comment',
        '/* Use table for row-column data relationships; never use it as a general page-layout grid. */',
        'css',
      ],
    ],
  },
];

const result = await generateRwdProject({
  courseId: 'responsive-web-design',
  moduleId: 'accessible-resource-inventory-project',
  activityId: 'mapped-lab-book-inventory-app',
  artifactId: 'accessible-resource-inventory',
  shortTitle: 'Resource Inventory',
  context: 'an independent emergency resource inventory',
  activityTitle: 'Certification Project: Accessible Resource Inventory',
  summary:
    'Independently model real resource data in a semantic table, preserve header context, reflect truthful attribute state, localize overflow, communicate status without color alone, and produce keyboard, forced-color, print, and regression evidence.',
  activityObjectives: [
    'Build a genuine two-dimensional inventory with caption, row groups, scoped headers, and representative explicit associations.',
    'Use exact data state and visible text without making CSS the state source of truth.',
    'Preserve every column, action, focus target, and status under zoom, narrow width, forced colors, and print.',
    'Defend table use and attach a repeatable project verification record.',
  ],
  moduleTitle: 'Certification Project: Accessible Resource Inventory',
  moduleDescription:
    'Build and verify a new inventory artifact integrating semantic tables, attribute-driven state, localized responsive overflow, non-color meaning, focus, forced colors, and print.',
  moduleObjectives: [
    'Create a complete unfamiliar data inventory from a service brief.',
    'Keep table, state, focus, overflow, and output requirements cumulative.',
    'Defend the release with representative header, input, preference, and print evidence.',
  ],
  order: 21,
  coverage: [
    'table-structure',
    'table-header-associations',
    'css-attribute-presence-value',
    'css-data-aria-state',
    'css-overflow',
    'css-color-not-only',
    'css-focus-visibility',
    'css-accessibility-regression',
  ],
  prerequisiteModuleId: 'attribute-driven-styling',
  priorLastActivityId: 'mapped-quiz-css-attribute-selectors',
  insertAfterModuleId: 'attribute-driven-styling',
  courseEstimatedHours: 2220,
  estimatedMinutes: 500,
  starterFiles: {
    html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n</body>\n</html>',
    css: '/* Build the Accessible Resource Inventory here. */',
    javascript: '',
  },
  supportPattern: ['predict', 'read', 'inspect', 'arrange', 'answer', 'debug', 'reflect'],
  codeFirstOn: [0, 3, 4, 7, 9, 12, 15, 18, 21, 23],
  milestones,
});

console.log(
  `Generated Accessible Resource Inventory project: ${result.interactions} interactions, ${result.checks} checks.`
);
