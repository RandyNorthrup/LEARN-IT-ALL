import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'community-needs-survey';
const starterFiles = {
  html: '<!-- Continue and harden the Community Needs Survey artifact here. -->',
  css: '',
  javascript: '',
};

const models = [
  {
    id: 'accessibility-disability-models',
    activityId: 'barrier-system-mapping',
    title: 'Treat Accessibility as Barrier Removal',
    context: 'extreme-heat service barrier review',
    concept:
      'Disability emerges from interaction between people, environments, tools, and design barriers. Visual, auditory, motor, speech, cognitive, vestibular, and neurological access needs may be permanent, temporary, situational, or overlapping. Barrier analysis starts with real tasks and conditions instead of guessing one fixed user category.',
    misconception: 'Accessibility is a niche feature for a small fixed category of users.',
    correct:
      'Trace each task through varied input, perception, comprehension, motion, and environmental conditions, then remove the barrier at its source.',
    distractors: [
      'Build one separate accessible version after the standard product is complete.',
      'Choose a single representative disability and assume its solution covers every barrier.',
    ],
    sequence: [
      'Name the real task and surrounding conditions',
      'Identify where perception, input, comprehension, or motion can fail',
      'Connect barriers to permanent, temporary, situational, and overlapping needs',
      'Change the product constraint and verify the task with affected users and tools',
    ],
    terms: ['barrier', 'environment', 'task'],
    prerequisiteIds: ['form-table-testing'],
    requirements: [
      ['access-needs-section', '<section aria-labelledby="access-needs-heading">'],
      ['access-needs-heading', '<h2 id="access-needs-heading">Access conditions considered</h2>'],
      [
        'situational-condition',
        '<li>Situational: glare, noise, one-handed use, and low bandwidth</li>',
      ],
      [
        'temporary-condition',
        '<li>Temporary: injury, fatigue, illness, and lost assistive equipment</li>',
      ],
    ],
  },
  {
    id: 'accessibility-tree',
    activityId: 'accessibility-tree-observatory',
    title: 'Trace Source into the Accessibility Tree',
    context: 'survey control announcement investigation',
    concept:
      'Browsers derive an accessibility tree from DOM semantics, accessible names, roles, states, properties, and rendered availability. Assistive technologies consume that platform representation, not a screenshot. CSS, hidden states, labels, native elements, and ARIA can change what is exposed. Inspecting the tree explains what a control is, what it is called, and its current state.',
    misconception:
      'Screen readers announce exactly the visible text and ignore programmatic semantics.',
    correct:
      'Inspect computed name, role, state, description, and tree position, then trace unexpected output back to source and rendered state.',
    distractors: [
      'Read the screenshot aloud because pixels are the accessibility tree.',
      'Add aria-label to every node so DOM semantics no longer matter.',
    ],
    sequence: [
      'Select a representative interactive element in the DOM',
      'Predict its name, role, state, description, and tree position',
      'Inspect the computed accessibility properties and rendered exposure',
      'Repair the earliest source relationship and confirm the announcement',
    ],
    terms: ['name', 'role', 'state'],
    prerequisiteIds: ['accessibility-disability-models'],
    requirements: [
      ['section-navigation', '<nav aria-label="Survey sections">'],
      [
        'native-progress',
        '<progress id="survey-progress" value="3" max="4">3 of 4 sections</progress>',
      ],
      ['progress-label', '<label for="survey-progress">Survey completion</label>'],
    ],
  },
  {
    id: 'keyboard-focus',
    activityId: 'keyboard-route-lab',
    title: 'Preserve a Visible Predictable Focus Route',
    context: 'keyboard-only survey completion route',
    concept:
      'Keyboard access requires native activation, logical DOM order, visible focus, safe skip navigation, and focus movement only when the task needs it. Positive tabindex values create brittle alternate order. Tab reaches interactive elements, arrow keys operate radio groups and other composite controls, Enter activates links, and Space activates buttons and checkboxes according to native conventions.',
    misconception: 'Adding positive tabindex values repairs any keyboard sequence.',
    correct:
      'Keep DOM and visual order aligned, use native controls, preserve visible focus, and test every task without a pointer.',
    distractors: [
      'Remove focus outlines after mouse use because keyboard users can remember position.',
      'Add tabindex zero to every heading and paragraph so all content becomes interactive.',
    ],
    sequence: [
      'Start before the page and use only the keyboard',
      'Verify skip navigation, focus order, visibility, labels, and native activation',
      'Complete grouped choices, validation failure, correction, and submission',
      'Repair DOM order or control semantics and repeat the complete route',
    ],
    terms: ['keyboard', 'focus', 'order'],
    prerequisiteIds: ['accessibility-tree'],
    requirements: [
      ['focusable-main', '<main id="main-content" tabindex="-1">'],
      ['native-submit', '<button id="submit" type="submit">Send community needs survey</button>'],
      ['skip-target', '<a href="#main-content">Skip to survey</a>'],
    ],
  },
  {
    id: 'accessible-names-descriptions',
    activityId: 'name-description-computation',
    title: 'Compute Names and Descriptions Deliberately',
    context: 'ambiguous survey control naming audit',
    concept:
      'An accessible name identifies an element’s purpose; a description supplies supporting detail. Visible label text usually provides the clearest control name. Aria-labelledby references visible naming text, aria-label supplies a name when no suitable visible label exists, and aria-describedby connects help or error details. Conflicting naming sources can hide useful visible wording.',
    misconception:
      'Adding aria-label improves every element even when visible text already names it.',
    correct:
      'Prefer visible native labels, predict the name-computation result, and add a separate description only when supporting detail is needed.',
    distractors: [
      'Repeat the label text in aria-label and aria-describedby to guarantee three announcements.',
      'Give all controls the same short name because surrounding layout supplies context.',
    ],
    sequence: [
      'State the concise user-facing purpose of the element',
      'Identify existing visible and programmatic naming sources',
      'Choose one primary name and connect only relevant supporting description',
      'Inspect computed name and description in normal, error, and changed-content states',
    ],
    terms: ['name', 'label', 'description'],
    prerequisiteIds: ['keyboard-focus'],
    requirements: [
      ['form-name', 'aria-labelledby="title"'],
      ['form-description', 'aria-describedby="description privacy-note"'],
      ['details-description', 'aria-describedby="details-help"'],
      ['status-name', '<output id="survey-status" aria-labelledby="survey-status-label"></output>'],
    ],
  },
  {
    id: 'aria-use',
    activityId: 'native-before-aria-clinic',
    title: 'Use ARIA Only to Fill a Real Semantic Gap',
    context: 'custom survey behavior architecture review',
    concept:
      'ARIA changes exposed semantics; it does not add focus, keyboard behavior, form participation, validation, or state logic. Native HTML is the first choice when it provides the needed contract. When a genuine custom pattern remains, its role, states, properties, keyboard interactions, focus management, and state updates must stay synchronized.',
    misconception:
      'ARIA attributes automatically implement keyboard interaction and state changes.',
    correct:
      'Start with native HTML, use the smallest ARIA addition for an actual gap, and verify semantics plus complete behavior over time.',
    distractors: [
      'Replace every button with a div role button so visual styling is easier.',
      'Set aria-expanded once in markup and let assistive technology update it after clicks.',
    ],
    sequence: [
      'Define the required name, role, state, behavior, and form contract',
      'Check whether a native element already provides the complete contract',
      'Add only missing ARIA semantics when custom behavior is unavoidable',
      'Implement keyboard and state logic, then inspect updates across every transition',
    ],
    terms: ['native', 'ARIA', 'behavior'],
    prerequisiteIds: ['accessible-names-descriptions'],
    requirements: [
      ['error-alert', '<div id="survey-errors" role="alert" aria-atomic="true"></div>'],
      [
        'status-live-region',
        '<output id="survey-status" aria-labelledby="survey-status-label" aria-live="polite"></output>',
      ],
    ],
  },
  {
    id: 'accessible-errors-status',
    activityId: 'error-recovery-control-room',
    title: 'Make Errors and Status Recoverable',
    context: 'failed survey submission recovery incident',
    concept:
      'Errors need specific text, programmatic connection to affected controls, preserved user input, and a predictable focus route. Color and borders may supplement but cannot carry the message alone. Dynamic status belongs in an appropriate live region; urgent blocking errors may use alert behavior, while routine progress should remain polite. Repeated submission must not create duplicate or stale announcements.',
    misconception: 'Color and a red border give every learner enough error information.',
    correct:
      'Summarize what failed, connect specific text to each invalid field, move focus deliberately, preserve input, and announce status at the right urgency.',
    distractors: [
      'Clear the form after failure so users can enter cleaner data on the next attempt.',
      'Use assertive live regions for every keystroke so no change can be missed.',
    ],
    sequence: [
      'Trigger blank, malformed, boundary, server, and repeated-submit failures',
      'Confirm visible text, programmatic association, preserved input, and focus route',
      'Verify announcement timing and remove stale status before the next attempt',
      'Correct one value, resubmit, and confirm both error removal and success status',
    ],
    terms: ['error', 'focus', 'status'],
    prerequisiteIds: ['aria-use'],
    requirements: [
      [
        'error-summary',
        '<section id="error-summary" aria-labelledby="error-summary-title" tabindex="-1">',
      ],
      [
        'error-summary-title',
        '<h2 id="error-summary-title">Fix the following survey problems</h2>',
      ],
      ['name-error', '<p id="name-error">Enter at least two characters for the resident name.</p>'],
      ['name-error-connection', 'aria-describedby="name-help name-error"'],
    ],
  },
  {
    id: 'accessible-media-equivalents',
    activityId: 'media-equivalence-editor',
    title: 'Publish Equivalent Media Information',
    context: 'multilingual heat-advisory media release',
    concept:
      'Captions communicate dialogue and meaningful sound; transcripts provide an equivalent text path; audio description conveys important visual information; and text or image alternatives must preserve the task-relevant meaning. Automatic output requires human review for timing, speakers, terminology, and critical sounds. Controls must remain operable and media must not autoplay unexpectedly.',
    misconception: 'Machine-generated captions need no review before publication.',
    correct:
      'Plan alternatives from the information carried by each channel, review them against the source, and verify controls plus equivalent task completion.',
    distractors: [
      'Provide a filename as the transcript because users can infer the spoken content.',
      'Autoplay the advisory with sound so people cannot miss urgent information.',
    ],
    sequence: [
      'Inventory speech, meaningful sound, visual-only action, text, and interactive controls',
      'Author captions, transcript, and audio-description support for the relevant information',
      'Review timing, speakers, terminology, reading order, and control access',
      'Complete the same information task with sound off, visuals unavailable, and keyboard only',
    ],
    terms: ['captions', 'transcript', 'equivalent'],
    prerequisiteIds: ['accessible-errors-status'],
    requirements: [
      ['advisory-audio', '<audio controls preload="metadata">'],
      ['audio-source', '<source src="heat-advisory.mp3" type="audio/mpeg">'],
      ['transcript-link', '<a href="#advisory-transcript">Read the heat advisory transcript</a>'],
      [
        'transcript-section',
        '<section id="advisory-transcript" aria-labelledby="transcript-heading">',
      ],
      ['transcript-heading', '<h2 id="transcript-heading">Heat advisory transcript</h2>'],
    ],
  },
  {
    id: 'accessibility-test-strategy',
    activityId: 'multi-method-accessibility-audit',
    title: 'Combine Automated and Manual Accessibility Evidence',
    context: 'community survey release audit',
    concept:
      'Automated checks quickly find some machine-detectable failures but cannot prove usable access or conformance. A strong strategy combines validation and automation with keyboard, zoom, reflow, forced colors, reduced motion, screen-reader sampling, changed content, error recovery, and human judgment. Reports distinguish tool results from manual observations and record environment plus reproduction steps.',
    misconception: 'A perfect automated score proves conformance and usable access.',
    correct:
      'Use automation as one evidence source, run task-based manual and assistive checks, document environments, and retest affected paths after repair.',
    distractors: [
      'Skip automated checks because only manual review can ever produce useful evidence.',
      'Test one browser and viewport because accessibility APIs normalize every environment.',
    ],
    sequence: [
      'Define representative tasks, risks, environments, and success criteria',
      'Run validation and automation to locate machine-detectable failures',
      'Run keyboard, zoom, preference, changed-state, and assistive-technology checks',
      'Record evidence, repair root causes, and rerun all affected tasks',
    ],
    terms: ['automated', 'manual', 'evidence'],
    prerequisiteIds: ['accessible-media-equivalents'],
    requirements: [
      ['audit-section', '<section aria-labelledby="accessibility-audit-heading">'],
      ['audit-heading', '<h2 id="accessibility-audit-heading">Accessibility audit evidence</h2>'],
      [
        'automated-evidence',
        '<li>Automated: HTML validation and machine-detectable accessibility checks recorded.</li>',
      ],
      [
        'manual-evidence',
        '<li>Manual: keyboard, zoom, reflow, forced colors, and reduced motion verified.</li>',
      ],
      [
        'assistive-evidence',
        '<li>Assistive technology: representative names, roles, states, errors, and media alternatives verified.</li>',
      ],
    ],
  },
];

const mappedPlans = {
  'mapped-lecture-importance-of-accessibility-and-good-html-structure': {
    title: 'Trace Barriers through an Emergency Service Task',
    context: 'extreme-heat response task and environment briefing',
    focus: ['accessibility-disability-models'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-debug-coding-journey-blog-page': {
    title: 'Workshop: Debug a Resident Support Journal',
    context: 'broken community-support case journal',
    focus: [
      'accessibility-disability-models',
      'accessibility-tree',
      'keyboard-focus',
      'accessible-names-descriptions',
    ],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lecture-accessible-tables-forms': {
    title: 'Inspect Accessible Form and Table Relationships',
    context: 'survey and service-capacity relationship audit',
    focus: ['accessibility-tree', 'keyboard-focus', 'accessible-names-descriptions'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-tech-conference-schedule': {
    title: 'Workshop: Build an Emergency Volunteer Briefing Schedule',
    context: 'multi-track heat-response volunteer briefing schedule',
    focus: ['accessibility-tree', 'keyboard-focus', 'accessible-names-descriptions'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-debug-donation-form': {
    title: 'Lab: Repair a Relief-Donation Pickup Form',
    context: 'keyboard and naming failure in a donation pickup request',
    focus: ['keyboard-focus', 'accessible-names-descriptions'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lecture-introduction-to-aria': {
    title: 'Decide When Native HTML Needs ARIA',
    context: 'native and custom survey pattern decision lab',
    focus: ['aria-use'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-accessible-audio-controller': {
    title: 'Workshop: Build a Public-Alert Audio Controller',
    context: 'keyboard-operated multilingual emergency audio advisory',
    focus: [
      'keyboard-focus',
      'accessible-names-descriptions',
      'aria-use',
      'accessible-media-equivalents',
    ],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lecture-accessible-media-elements': {
    title: 'Plan Captions, Transcripts, and Audio Description',
    context: 'heat-advisory media equivalence editorial desk',
    focus: ['accessible-media-equivalents'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-checkout-page': {
    title: 'Lab: Repair a Water-Delivery Request Checkout',
    context: 'failed water-delivery validation and status recovery',
    focus: ['accessible-names-descriptions', 'accessible-errors-status'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-movie-review-page': {
    title: 'Lab: Audit an Emergency-Training Video Review',
    context: 'missing equivalents in a responder training review',
    focus: ['accessible-names-descriptions', 'accessible-media-equivalents'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-multimedia-player': {
    title: 'Lab: Repair a Multi-Format Public Alert Player',
    context: 'keyboard semantics and transcript incident in a public alert player',
    focus: ['keyboard-focus', 'aria-use', 'accessible-media-equivalents'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-review-html-accessibility': {
    title: 'Retrieval Review: Accessible HTML Engineering',
    context: 'changed civic-service accessibility release',
    focus: models.map((model) => model.id),
    artifactId: cumulativeArtifactId,
  },
  'mapped-quiz-html-accessibility': {
    title: 'Mastery Exam: Accessible HTML Engineering',
    context: 'independent multi-barrier release decision',
    focus: models.map((model) => model.id),
    artifactId: cumulativeArtifactId,
  },
};

const milestones = [
  [
    'Publish the access-conditions brief',
    '<h2 id="access-needs-heading">Access conditions considered</h2>',
    'accessibility-disability-models',
  ],
  [
    'Record glare and one-handed situational barriers',
    '<li>Situational: glare, noise, one-handed use, and low bandwidth</li>',
    'accessibility-disability-models',
  ],
  [
    'Record temporary access barriers',
    '<li>Temporary: injury, fatigue, illness, and lost assistive equipment</li>',
    'accessibility-disability-models',
  ],
  [
    'Connect barriers to a real survey task',
    '<li>Task: understand, complete, correct, and submit the community needs survey</li>',
    'accessibility-disability-models',
  ],
  ['Expose survey section navigation', '<nav aria-label="Survey sections">', 'accessibility-tree'],
  [
    'Add native completion semantics',
    '<progress id="survey-progress" value="3" max="4">3 of 4 sections</progress>',
    'accessibility-tree',
  ],
  [
    'Name the completion control',
    '<label for="survey-progress">Survey completion</label>',
    'accessibility-tree',
  ],
  ['Preserve the primary landmark', '<main id="main-content" tabindex="-1">', 'accessibility-tree'],
  ['Keep a safe skip destination', '<a href="#main-content">Skip to survey</a>', 'keyboard-focus'],
  [
    'Use a native form submit control',
    '<button id="submit" type="submit">Send community needs survey</button>',
    'keyboard-focus',
  ],
  [
    'Make the error summary a deliberate focus target',
    'id="error-summary" aria-labelledby="error-summary-title" tabindex="-1"',
    'keyboard-focus',
  ],
  [
    'Keep the media player natively keyboard operable',
    '<audio controls preload="metadata">',
    'keyboard-focus',
  ],
  ['Name the survey from visible text', 'aria-labelledby="title"', 'accessible-names-descriptions'],
  [
    'Connect survey purpose and privacy detail',
    'aria-describedby="description privacy-note"',
    'accessible-names-descriptions',
  ],
  [
    'Connect detailed-entry guidance',
    'aria-describedby="details-help"',
    'accessible-names-descriptions',
  ],
  [
    'Name the status output visibly',
    '<span id="survey-status-label">Survey status</span>',
    'accessible-names-descriptions',
  ],
  [
    'Create an atomic error announcement',
    '<div id="survey-errors" role="alert" aria-atomic="true"></div>',
    'aria-use',
  ],
  ['Use polite status updates for routine progress', 'aria-live="polite"', 'aria-use'],
  [
    'Keep native progress instead of a custom role',
    '<progress id="survey-progress" value="3" max="4">3 of 4 sections</progress>',
    'aria-use',
  ],
  [
    'Create a focusable error summary',
    '<section id="error-summary" aria-labelledby="error-summary-title" tabindex="-1">',
    'accessible-errors-status',
  ],
  [
    'Name the error summary actionably',
    '<h2 id="error-summary-title">Fix the following survey problems</h2>',
    'accessible-errors-status',
  ],
  [
    'Publish a specific resident-name error',
    '<p id="name-error">Enter at least two characters for the resident name.</p>',
    'accessible-errors-status',
  ],
  [
    'Connect name help and error text',
    'aria-describedby="name-help name-error"',
    'accessible-errors-status',
  ],
  [
    'Publish an operable advisory audio element',
    '<audio controls preload="metadata">',
    'accessible-media-equivalents',
  ],
  [
    'Declare the advisory media source',
    '<source src="heat-advisory.mp3" type="audio/mpeg">',
    'accessible-media-equivalents',
  ],
  [
    'Link directly to the transcript',
    '<a href="#advisory-transcript">Read the heat advisory transcript</a>',
    'accessible-media-equivalents',
  ],
  [
    'Create the transcript region',
    '<section id="advisory-transcript" aria-labelledby="transcript-heading">',
    'accessible-media-equivalents',
  ],
  [
    'Name the transcript',
    '<h2 id="transcript-heading">Heat advisory transcript</h2>',
    'accessible-media-equivalents',
  ],
  [
    'Record caption review status',
    '<li>Captions: timing, speakers, terminology, and meaningful sounds reviewed.</li>',
    'accessible-media-equivalents',
  ],
  [
    'Create the accessibility audit region',
    '<section aria-labelledby="accessibility-audit-heading">',
    'accessibility-test-strategy',
  ],
  [
    'Name the audit evidence',
    '<h2 id="accessibility-audit-heading">Accessibility audit evidence</h2>',
    'accessibility-test-strategy',
  ],
  [
    'Separate automated evidence',
    '<li>Automated: HTML validation and machine-detectable accessibility checks recorded.</li>',
    'accessibility-test-strategy',
  ],
  [
    'Record task-based manual evidence',
    '<li>Manual: keyboard, zoom, reflow, forced colors, and reduced motion verified.</li>',
    'accessibility-test-strategy',
  ],
  [
    'Record assistive-technology evidence',
    '<li>Assistive technology: representative names, roles, states, errors, and media alternatives verified.</li>',
    'accessibility-test-strategy',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'html-and-accessibility',
  moduleId: 'accessible-html-engineering',
  title: 'HTML Accessibility as an Engineering Practice',
  description:
    'Remove task barriers through semantic source, predictable keyboard and focus behavior, deliberate name computation, minimal ARIA, recoverable errors, equivalent media, and multi-method test evidence.',
  order: 6,
  objectives: [
    'Connect product and environmental barriers to varied permanent, temporary, situational, and overlapping access needs.',
    'Trace DOM source into accessibility-tree names, roles, states, descriptions, and exposed relationships.',
    'Build predictable keyboard routes, accurate control names, minimal ARIA, and recoverable error and status flows.',
    'Provide reviewed media equivalents and combine automated results with task-based manual and assistive checks.',
  ],
  competencyIds: models.map((model) => model.id),
  models,
  retainedCompetencyIds: [
    'form-table-testing',
    'semantic-native-first',
    'form-labels-instructions',
    'table-header-associations',
  ],
  cumulativeArtifactId,
  starterFiles,
  prerequisiteModuleId: 'community-needs-survey-project',
  priorLastActivityId: 'mapped-lab-survey-form',
  insertAfterCompetencyId: 'form-table-testing',
  insertAfterModuleId: 'community-needs-survey-project',
  estimatedHours: 520,
  milestones,
  mappedPlans,
  activityIds: [
    'barrier-system-mapping',
    'mapped-lecture-importance-of-accessibility-and-good-html-structure',
    'accessibility-tree-observatory',
    'keyboard-route-lab',
    'name-description-computation',
    'mapped-workshop-debug-coding-journey-blog-page',
    'mapped-lecture-accessible-tables-forms',
    'mapped-workshop-tech-conference-schedule',
    'mapped-lab-debug-donation-form',
    'native-before-aria-clinic',
    'mapped-lecture-introduction-to-aria',
    'error-recovery-control-room',
    'media-equivalence-editor',
    'mapped-lecture-accessible-media-elements',
    'mapped-workshop-accessible-audio-controller',
    'mapped-lab-checkout-page',
    'mapped-lab-movie-review-page',
    'mapped-lab-multimedia-player',
    'multi-method-accessibility-audit',
    'mapped-review-html-accessibility',
    'mapped-quiz-html-accessibility',
  ],
});

console.log(
  `Generated Accessible HTML: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
