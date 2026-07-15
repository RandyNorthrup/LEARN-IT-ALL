import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const courseId = 'responsive-web-design';
const moduleId = 'volunteer-shift-deck-project';
const activityId = 'mapped-lab-page-of-playing-cards';
const artifactId = 'volunteer-shift-deck';
const outputRoot = path.join(process.cwd(), 'content', 'v2', 'courses', courseId);
const coverage = [
  'semantic-landmarks',
  'css-box-model',
  'flex-formatting-context',
  'flex-wrapping',
  'css-action-pseudo-classes',
  'css-color-contrast',
  'flex-order-accessibility',
  'flex-pattern-selection',
];

const milestones = [
  [
    'Brief',
    'Create the project document contract',
    'Build a complete English HTML document and connect the project stylesheet.',
    'semantic-landmarks',
    'A valid document and linked stylesheet create the shared parsing and presentation contract.',
    'A body fragment is equivalent because browsers infer every missing document relationship.',
    ['document', 'stylesheet', 'language'],
    [
      ['doctype', '<!doctype html>', 'html'],
      ['language', '<html lang="en">', 'html'],
      ['title', '<title>Heat-Relief Volunteer Shift Deck</title>', 'html'],
      ['stylesheet', '<link rel="stylesheet" href="styles.css">', 'html'],
    ],
  ],
  [
    'Brief',
    'Create the primary landmark and skip route',
    'Add a skip link and one main region for the shift-selection task.',
    'semantic-landmarks',
    'One main landmark and a working skip target expose the unique task before visual card layout.',
    'A centered wrapper creates the same navigation structure as main.',
    ['main', 'skip', 'task'],
    [
      ['skip-link', '<a href="#main-content">Skip to shift deck</a>', 'html'],
      ['main', '<main id="main-content">', 'html'],
    ],
  ],
  [
    'Brief',
    'Name and explain the scheduling task',
    'Add a specific h1 and concise instruction that does not depend on card color.',
    'semantic-landmarks',
    'A clear heading and text instruction establish purpose before users encounter repeated cards.',
    'Card colors alone explain what the page is for.',
    ['heading', 'instruction', 'purpose'],
    [
      ['heading', '<h1>Heat-Relief Volunteer Shift Deck</h1>', 'html'],
      [
        'instruction',
        '<p class="deck-intro">Compare open shifts, then choose one that matches your availability and training.</p>',
        'html',
      ],
    ],
  ],
  [
    'Structure',
    'Create the labeled card collection',
    'Add a section and heading that group the repeated shift articles.',
    'semantic-landmarks',
    'A named section creates a meaningful collection without turning the visual deck into navigation.',
    'A flex container class supplies the same semantic grouping as a section heading.',
    ['section', 'heading', 'collection'],
    [
      ['deck-section', '<section aria-labelledby="open-shifts-heading">', 'html'],
      ['deck-heading', '<h2 id="open-shifts-heading">Open volunteer shifts</h2>', 'html'],
      ['deck-container', '<div class="shift-deck">', 'html'],
    ],
  ],
  [
    'Structure',
    'Build the morning hydration shift card',
    'Add a standalone article with a unique heading and visible availability text.',
    'semantic-landmarks',
    'An article with its own heading can stand as one understandable shift option.',
    'A colored div needs no heading because position identifies the shift.',
    ['article', 'heading', 'status'],
    [
      ['morning-card', '<article class="shift-card shift-card--morning">', 'html'],
      ['morning-heading', '<h3>Morning hydration station</h3>', 'html'],
      ['morning-status', '<p class="shift-status">4 openings</p>', 'html'],
    ],
  ],
  [
    'Structure',
    'Build the midday transport shift card',
    'Add a second article with different real content and availability.',
    'semantic-landmarks',
    'Repeated semantic structure supports comparison while each card keeps distinct content.',
    'Duplicate IDs are acceptable when cards share one visual component.',
    ['article', 'unique', 'comparison'],
    [
      ['midday-card', '<article class="shift-card shift-card--midday">', 'html'],
      ['midday-heading', '<h3>Midday transport support</h3>', 'html'],
      ['midday-status', '<p class="shift-status">2 openings</p>', 'html'],
    ],
  ],
  [
    'Structure',
    'Build the evening wellness shift card',
    'Add a third article for the evening wellness check.',
    'semantic-landmarks',
    'A third realistic option exercises wrapping and changed content rather than duplicating placeholder cards.',
    'All cards should use identical text so equal height proves layout quality.',
    ['content', 'wrapping', 'article'],
    [
      ['evening-card', '<article class="shift-card shift-card--evening">', 'html'],
      ['evening-heading', '<h3>Evening wellness calls</h3>', 'html'],
      ['evening-status', '<p class="shift-status">6 openings</p>', 'html'],
    ],
  ],
  [
    'Structure',
    'Add comparable shift facts',
    'Give every card a real list of time, location, and training facts.',
    'semantic-landmarks',
    'Semantic lists expose comparable facts even when card presentation disappears.',
    'Manual bullets in paragraphs preserve list relationships just as well.',
    ['list', 'facts', 'comparison'],
    [
      ['facts-list', '<ul class="shift-facts">', 'html'],
      ['time-fact', '<li><strong>Time:</strong> 8:00 AM–12:00 PM</li>', 'html'],
      ['location-fact', '<li><strong>Location:</strong> Central cooling center</li>', 'html'],
      ['training-fact', '<li><strong>Training:</strong> Hydration safety</li>', 'html'],
    ],
  ],
  [
    'Actions',
    'Add destination-specific card actions',
    'Add a clear application link to each card without visually reordering it.',
    'css-action-pseudo-classes',
    'Destination-specific links remain understandable outside card context and retain native navigation behavior.',
    'Every card action can say Click here because the heading remains nearby visually.',
    ['link', 'destination', 'focus'],
    [
      [
        'morning-link',
        '<a class="shift-action" href="/volunteer/apply?shift=morning-hydration">Apply for morning hydration</a>',
        'html',
      ],
      [
        'midday-link',
        '<a class="shift-action" href="/volunteer/apply?shift=midday-transport">Apply for midday transport</a>',
        'html',
      ],
      [
        'evening-link',
        '<a class="shift-action" href="/volunteer/apply?shift=evening-wellness">Apply for evening wellness</a>',
        'html',
      ],
    ],
  ],
  [
    'Foundation',
    'Apply predictable box sizing',
    'Use border-box for project elements and pseudo-elements.',
    'css-box-model',
    'Border-box makes card width calculations include padding and border.',
    'Declared width always includes padding without any box-sizing rule.',
    ['box-sizing', 'padding', 'border'],
    [['box-sizing', '*, *::before, *::after {\n  box-sizing: border-box;\n}', 'css']],
  ],
  [
    'Foundation',
    'Create a readable project shell',
    'Constrain the page measure and preserve narrow viewport gutters.',
    'css-box-model',
    'Intrinsic inline constraints preserve readable measure without fixed viewport assumptions.',
    'A fixed pixel width is safest because every volunteer uses the same screen.',
    ['measure', 'intrinsic', 'gutter'],
    [
      [
        'shell',
        '.project-shell {\n  inline-size: min(100% - 2rem, 72rem);\n  margin-inline: auto;\n}',
        'css',
      ],
    ],
  ],
  [
    'Layout',
    'Create the one-dimensional deck context',
    'Make direct card children flex items and add resilient gutters.',
    'flex-formatting-context',
    'Flexbox fits one-dimensional card distribution and keeps DOM order intact.',
    'Every descendant becomes a flex item when an ancestor uses display flex.',
    ['container', 'items', 'axis'],
    [['deck-flex', '.shift-deck {\n  display: flex;\n  gap: 1rem;\n}', 'css']],
  ],
  [
    'Layout',
    'Enable content-driven card wrapping',
    'Allow cards to move to new lines before content becomes cramped.',
    'flex-wrapping',
    'Wrapping plus a content-derived basis responds to available space and content length.',
    'Flex-wrap alone guarantees every card keeps a usable minimum width.',
    ['wrap', 'basis', 'content'],
    [
      ['deck-wrap', '.shift-deck {\n  flex-wrap: wrap;\n}', 'css'],
      [
        'card-flex',
        '.shift-card {\n  flex: 1 1 18rem;\n  min-inline-size: min(100%, 16rem);\n}',
        'css',
      ],
    ],
  ],
  [
    'Layout',
    'Build a content-growing card box',
    'Add padding, border, radius, and content-driven block sizing.',
    'css-box-model',
    'Content-driven block size preserves long labels, zoom, and translated facts.',
    'Fixed height keeps cards aligned without risking clipped content.',
    ['padding', 'border', 'growth'],
    [
      [
        'card-box',
        '.shift-card {\n  padding: 1.25rem;\n  border: 0.125rem solid #475569;\n  border-radius: 0.75rem;\n  min-block-size: 16rem;\n  block-size: auto;\n}',
        'css',
      ],
    ],
  ],
  [
    'Color',
    'Create a readable default card surface',
    'Set explicit text and surface colors with strong contrast.',
    'css-color-contrast',
    'Explicit readable foreground and background roles survive decorative accent changes.',
    'A harmonious hue relationship automatically guarantees readable text.',
    ['contrast', 'text', 'surface'],
    [['card-color', '.shift-card {\n  color: #172033;\n  background-color: #ffffff;\n}', 'css']],
  ],
  [
    'Color',
    'Distinguish shift types without color alone',
    'Pair accent color with different border patterns and visible headings.',
    'css-color-contrast',
    'Border pattern and heading text preserve distinctions when author colors disappear.',
    'Three different pastel backgrounds count as independent non-color cues.',
    ['color', 'pattern', 'text'],
    [
      [
        'morning-style',
        '.shift-card--morning {\n  border-block-start: 0.5rem solid #075985;\n}',
        'css',
      ],
      [
        'midday-style',
        '.shift-card--midday {\n  border-block-start: 0.5rem double #7c2d12;\n}',
        'css',
      ],
      [
        'evening-style',
        '.shift-card--evening {\n  border-block-start: 0.5rem dashed #5b21b6;\n}',
        'css',
      ],
    ],
  ],
  [
    'Actions',
    'Style durable link identity',
    'Keep action links identifiable without relying on color or hover.',
    'css-action-pseudo-classes',
    'Underline and weight create durable link identity across input modes.',
    'Hover color is enough because every device exposes hover before activation.',
    ['link', 'underline', 'identity'],
    [
      [
        'link-style',
        '.shift-action:link {\n  color: #075985;\n  font-weight: 700;\n  text-decoration-thickness: 0.12em;\n}',
        'css',
      ],
      ['visited-style', '.shift-action:visited {\n  color: #6b21a8;\n}', 'css'],
    ],
  ],
  [
    'Actions',
    'Create distinct hover and focus feedback',
    'Add separate pointer and keyboard-visible treatments.',
    'css-action-pseudo-classes',
    'Distinct hover and focus-visible rules serve different input conditions.',
    'One hover rule represents pointer, touch, and keyboard focus equally.',
    ['hover', 'focus-visible', 'input'],
    [
      ['hover-style', '.shift-action:hover {\n  text-decoration-thickness: 0.2em;\n}', 'css'],
      [
        'focus-style',
        '.shift-action:focus-visible {\n  outline: 0.2rem solid #b45309;\n  outline-offset: 0.2rem;\n}',
        'css',
      ],
    ],
  ],
  [
    'Order',
    'Preserve logical source and visual order',
    'Document and enforce natural card and action order without reverse directions.',
    'flex-order-accessibility',
    'Natural DOM order keeps reading, focus, copy, and visual sequences aligned.',
    'Order values change screen-reader and keyboard sequence along with pixels.',
    ['source order', 'focus', 'visual'],
    [
      ['order-comment', '/* Card DOM, reading, focus, and visual order remain aligned. */', 'css'],
      ['natural-order', '.shift-card {\n  order: 0;\n}', 'css'],
    ],
  ],
  [
    'Resilience',
    'Support forced-color boundaries',
    'Ensure cards and actions retain visible structure under system colors.',
    'css-color-contrast',
    'System-color overrides preserve card and focus boundaries when author colors are replaced.',
    'Forced colors preserve every author shadow and gradient automatically.',
    ['forced colors', 'boundary', 'focus'],
    [
      [
        'forced-colors',
        '@media (forced-colors: active) {\n  .shift-card {\n    border-color: CanvasText;\n  }\n  .shift-action:focus-visible {\n    outline-color: Highlight;\n  }\n}',
        'css',
      ],
    ],
  ],
  [
    'Resilience',
    'Respect reduced-motion preference',
    'Remove nonessential card motion while keeping state feedback.',
    'css-action-pseudo-classes',
    'Reduced motion retains visible state changes without movement.',
    'Reduced motion means all focus and hover feedback should disappear.',
    ['motion', 'preference', 'feedback'],
    [
      ['card-transition', '.shift-card {\n  transition: transform 160ms ease;\n}', 'css'],
      [
        'reduced-motion',
        '@media (prefers-reduced-motion: reduce) {\n  .shift-card {\n    transition: none;\n  }\n}',
        'css',
      ],
    ],
  ],
  [
    'Output',
    'Create a printable shift deck',
    'Remove decorative effects and preserve card boundaries in print.',
    'flex-pattern-selection',
    'Print rules adapt presentation while semantic source and logical order remain unchanged.',
    'Printing a responsive screen layout needs no output-specific verification.',
    ['print', 'boundary', 'order'],
    [
      [
        'print-rule',
        '@media print {\n  .shift-card {\n    break-inside: avoid;\n    box-shadow: none;\n  }\n}',
        'css',
      ],
    ],
  ],
  [
    'Evidence',
    'Publish a project verification record',
    'Add keyboard, wrapping, zoom, contrast, forced-color, and print evidence.',
    'flex-pattern-selection',
    'A written matrix turns project quality into repeatable release evidence.',
    'Three equal-looking cards prove all layout and accessibility states passed.',
    ['evidence', 'wrapping', 'keyboard'],
    [
      ['evidence-section', '<section aria-labelledby="deck-evidence-heading">', 'html'],
      ['evidence-heading', '<h2 id="deck-evidence-heading">Shift deck verification</h2>', 'html'],
      [
        'evidence-list',
        '<ul><li>Keyboard order and focus visibility verified.</li><li>Wrapping, zoom, and long content verified.</li><li>Contrast, forced colors, reduced motion, and print verified.</li></ul>',
        'html',
      ],
    ],
  ],
  [
    'Handoff',
    'Record the final layout decision',
    'Document why Flexbox owns this card relationship and what evidence would trigger Grid or block flow.',
    'flex-pattern-selection',
    'A dimensional decision record prevents Flexbox from becoming a default recipe.',
    'Flexbox is modern, so no alternative layout method needs consideration.',
    ['Flexbox', 'dimension', 'evidence'],
    [
      [
        'decision-comment',
        '/* Flexbox fits this one-dimensional wrapping deck; use Grid only when shared row and column tracks become required. */',
        'css',
      ],
    ],
  ],
];

const steps = [];
const checks = [];
const codeCheckIds = [];
const supportPattern = ['inspect', 'predict', 'arrange', 'debug', 'answer', 'reflect', 'read'];

function base(milestone, interaction) {
  const number = steps.length + 1;
  return {
    id: `${activityId}-step-${String(number).padStart(2, '0')}`,
    title: `${milestone[0]} ${number} · ${milestone[1]}`.slice(0, 100),
    interaction,
    instruction: `Shift Deck checkpoint ${number}: ${milestone[2]} Preserve all earlier project evidence.`,
    why: `${milestone[1]} ${interaction} checkpoint ${number} retrieves ${milestone[3].replaceAll('-', ' ')} in an independent artifact.`,
    buildsOnStepIds:
      number === 1 ? [] : number > 3 ? [steps.at(-1).id, steps[0].id] : [steps.at(-1).id],
    content: [],
    checkIds: [],
    competencyIds: [milestone[3]],
    hints: [
      `${milestone[0]} checkpoint ${number}: restate the volunteer task and content relationship.`,
      `${milestone[0]} checkpoint ${number}: inspect source, layout, focus, and changed-content evidence.`,
      `${milestone[0]} checkpoint ${number}: make one bounded change and rerun accumulated project checks.`,
    ],
    xp: interaction === 'code' || interaction === 'debug' ? 18 : 12,
  };
}

function addCode(milestone, index) {
  const step = base(milestone, 'code');
  for (const [name, expected, file] of milestone[7]) {
    const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-${name}`;
    codeCheckIds.push(checkId);
    checks.push({
      id: checkId,
      type: 'source-includes',
      description: `${milestone[1]} includes the ${name.replaceAll('-', ' ')} requirement.`,
      failureMessage: `Restore the ${name.replaceAll('-', ' ')} requirement without deleting earlier Shift Deck work.`,
      hidden: false,
      competencyIds: [milestone[3]],
      file,
      expected,
    });
  }
  step.checkIds = [...codeCheckIds];
  step.targetFile = milestone[7][0][2];
  step.content = [
    {
      type: 'callout',
      tone: 'note',
      title: `${milestone[0]} build ${index + 1}`,
      text: `${milestone[2]} Verify normal, narrow, long-content, keyboard, and preference states as relevant.`,
    },
  ];
  steps.push(step);
}

function addSupport(milestone, index) {
  const interaction = supportPattern[index % supportPattern.length];
  const step = base(milestone, interaction);
  if (interaction === 'arrange') {
    const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-order`;
    step.options = [
      'State the volunteer task and relationship',
      'Implement the smallest semantic or layout contract',
      'Exercise changed content input and viewport states',
      'Record evidence and preserve earlier requirements',
    ].map((text, optionIndex) => ({
      id: `${step.id}-event-${optionIndex + 1}`,
      text: `Shift Deck ${index + 1}.${optionIndex + 1}: ${text}`,
    }));
    step.checkIds = [checkId];
    step.content = [
      {
        type: 'paragraph',
        text: `Order the ${milestone[1].toLowerCase()} work by evidence dependency.`,
      },
    ];
    checks.push({
      id: checkId,
      type: 'order-equals',
      description: `${milestone[1]} follows a testable implementation sequence.`,
      failureMessage: 'Find the first phase whose required evidence does not exist yet.',
      hidden: false,
      competencyIds: [milestone[3]],
      expectedOptionIds: step.options.map((option) => option.id),
    });
  } else if (interaction === 'reflect') {
    const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-reflection`;
    step.checkIds = [checkId];
    step.content = [
      {
        type: 'callout',
        tone: 'question',
        title: `${milestone[0]} decision defense`,
        text: `Connect ${milestone[1].toLowerCase()} to implementation evidence, volunteer impact, a failure state, and a retest.`,
      },
    ];
    checks.push({
      id: checkId,
      type: 'text-response',
      description: `${milestone[1]} is defended with implementation and user evidence.`,
      failureMessage:
        'Explain the decision, consequence, failed state, and retest with the required terms.',
      hidden: false,
      competencyIds: [milestone[3]],
      minimumCharacters: 110,
      requiredTerms: milestone[6],
    });
  } else {
    const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-choice`;
    const prefix = `Shift Deck case ${index + 1} step ${steps.length + 1}`;
    step.options = [
      { id: `${step.id}-option-a`, text: `${prefix}: ${milestone[5]}` },
      { id: `${step.id}-option-b`, text: `${prefix}: ${milestone[4]}` },
      {
        id: `${step.id}-option-c`,
        text: `${prefix}: replace the complete project before isolating this relationship.`,
      },
    ];
    step.checkIds = [checkId];
    step.content =
      interaction === 'read'
        ? [
            {
              type: 'paragraph',
              text: `${milestone[4]} Apply this contract to the changed Volunteer Shift Deck case.`,
            },
          ]
        : [
            {
              type: 'callout',
              tone: interaction === 'debug' ? 'warning' : 'question',
              title: `${milestone[0]} evidence`,
              text: 'Choose the conclusion supported across source, layout, focus, preference, and changed-content evidence.',
            },
          ];
    if (interaction === 'inspect' || interaction === 'debug')
      step.stimulus = {
        kind: interaction === 'debug' ? 'code-diff' : 'browser',
        title: `${milestone[1]} trace`,
        caption: `Conflicting project evidence from milestone ${index + 1}.`,
        lines: [
          { id: `${step.id}-risk`, label: 'observed risk', text: milestone[5], tone: 'problem' },
          {
            id: `${step.id}-contract`,
            label: 'durable contract',
            text: milestone[4],
            tone: 'focus',
          },
        ],
      };
    checks.push({
      id: checkId,
      type: 'choice-equals',
      description: `${milestone[1]} preserves the volunteer task and project contract.`,
      failureMessage: 'Recheck source, behavior, changed content, and input-mode evidence.',
      hidden: false,
      competencyIds: [milestone[3]],
      expectedOptionId: `${step.id}-option-b`,
    });
  }
  steps.push(step);
}

milestones.forEach((milestone, index) => {
  if (index % 2 === 0) {
    addSupport(milestone, index);
    addCode(milestone, index);
  } else {
    addCode(milestone, index);
    addSupport(milestone, index);
  }
});

const activity = {
  schemaVersion: 2,
  id: activityId,
  courseId,
  moduleId,
  kind: 'project',
  title: 'Certification Project: Volunteer Shift Deck',
  summary:
    'Independently build a semantic, wrapping volunteer shift-card deck and defend its box model, Flexbox algorithm, content order, interaction states, contrast, preference behavior, print output, and release evidence.',
  objectives: [
    'Model repeated shift options as semantic standalone content with clear comparison facts and actions.',
    'Use content-driven Flexbox wrapping and box constraints without fixed card heights or visual reordering.',
    'Preserve link identity, keyboard focus, contrast, forced colors, reduced motion, and print boundaries.',
    'Document why Flexbox fits the relationship and provide a multi-state project verification record.',
  ],
  competencyCoverage: { introduces: [], reinforces: coverage, assesses: coverage },
  prerequisites: ['mapped-quiz-css-flexbox'],
  difficulty: 'mastery',
  estimatedMinutes: 480,
  artifactId,
  starterFiles: {
    html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n</body>\n</html>',
    css: '/* Build the Volunteer Shift Deck here. */',
    javascript: '',
  },
  steps,
  checks,
  mastery: { passingPercent: 90, maxHintsForMastery: 3, spacedReviewDays: [2, 14, 45, 90] },
};

const module = {
  schemaVersion: 2,
  id: moduleId,
  courseId,
  title: 'Certification Project: Volunteer Shift Deck',
  description:
    'Build and verify a new semantic volunteer shift-card artifact using retained box, Flexbox, state, contrast, preference, source-order, and layout-method decisions.',
  order: 16,
  objectives: [
    'Create a complete unfamiliar card collection from a service brief.',
    'Keep all requirements cumulative across alternating design and code checkpoints.',
    'Defend the finished project through multi-state accessibility and layout evidence.',
  ],
  competencyIds: coverage,
  prerequisites: ['one-dimensional-flex-layout'],
  activityIds: [activityId],
};

const coursePath = path.join(outputRoot, 'course.json');
const course = JSON.parse(await readFile(coursePath, 'utf8'));
const boundary = course.moduleIds.indexOf('one-dimensional-flex-layout');
if (boundary < 0) throw new Error('one-dimensional-flex-layout insertion boundary is missing');
course.moduleIds = course.moduleIds.filter((id) => id !== moduleId);
course.moduleIds.splice(boundary + 1, 0, moduleId);
course.estimatedHours = Math.max(course.estimatedHours, 27.3);

await mkdir(path.join(outputRoot, 'activities'), { recursive: true });
await mkdir(path.join(outputRoot, 'modules'), { recursive: true });
await writeFile(coursePath, `${JSON.stringify(course, null, 2)}\n`);
await writeFile(
  path.join(outputRoot, 'modules', `${moduleId}.json`),
  `${JSON.stringify(module, null, 2)}\n`
);
await writeFile(
  path.join(outputRoot, 'activities', `${activityId}.json`),
  `${JSON.stringify(activity, null, 2)}\n`
);

console.log(
  `Generated Volunteer Shift Deck project: ${steps.length} interactions, ${checks.length} checks.`
);
