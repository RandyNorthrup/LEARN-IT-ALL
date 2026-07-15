import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'heat-relief-information-hub';
const starterFiles = {
  html: '<!-- Continue the Heat Relief Network artifact here. -->',
  css: '',
  javascript: '',
};

const models = [
  {
    id: 'form-purpose-method',
    activityId: 'submission-contract-studio',
    title: 'Design a Form Submission Contract',
    context: 'cooling-center transport request intake',
    concept:
      'A form is a data contract. Its action identifies the receiving resource, its method expresses retrieval or state change, and each successful control contributes a name-value pair. GET suits repeatable searches whose parameters may appear in a URL. POST suits submissions that change state or contain data that should not be placed in a URL. Visible values without names are not submitted.',
    misconception: 'A visible input value is submitted even when its control has no name.',
    correct:
      'Choose action, method, and control names from the request workflow, then inspect the submitted name-value payload.',
    distractors: [
      'Use POST for every form because method never changes browser or server behavior.',
      'Put the destination on the submit button because forms do not need an action.',
    ],
    sequence: [
      'List the data the receiving service needs',
      'Choose GET for retrieval or POST for state-changing submission',
      'Give each submitted control a stable name',
      'Inspect the request payload and verify omitted, empty, and changed values',
    ],
    terms: ['form', 'method', 'name'],
    prerequisiteIds: ['semantic-native-first'],
    requirements: [
      ['request-form', '<form action="/transport-requests" method="post">'],
      ['service-name', 'name="service"'],
      ['submit-action', '<button type="submit">Request transport</button>'],
    ],
  },
  {
    id: 'form-labels-instructions',
    activityId: 'persistent-label-clinic',
    title: 'Connect Persistent Labels and Instructions',
    context: 'heat-relief registration label clinic',
    concept:
      'A label gives a control its accessible name and remains available after typing. Explicit for and id associations support pointer activation and robust naming. Placeholder text is a temporary example, not a label. Shared help and error text can be connected with aria-describedby while the visible label stays concise.',
    misconception: 'Placeholder text provides an equivalent replacement for a visible label.',
    correct:
      'Keep a visible label, connect it with for and id, and reference durable instructions or errors from the control.',
    distractors: [
      'Repeat the same id on every control so one label can name the whole form.',
      'Use title alone because it is always visible and announced consistently.',
    ],
    sequence: [
      'Write a concise visible label for the requested value',
      'Give the control a unique id and match the label for value',
      'Place durable format or error guidance in visible text',
      'Connect guidance and verify name plus description in the accessibility tree',
    ],
    terms: ['label', 'for', 'description'],
    prerequisiteIds: ['form-purpose-method'],
    requirements: [
      ['name-label', '<label for="requester-name">Your name</label>'],
      ['name-control', '<input id="requester-name" name="requesterName"'],
      ['request-help', '<p id="request-help">Choose the service you need today.</p>'],
      ['help-connection', 'aria-describedby="request-help"'],
    ],
  },
  {
    id: 'form-input-types',
    activityId: 'input-purpose-device-lab',
    title: 'Match Input Type to Data Purpose',
    context: 'mobile emergency contact intake',
    concept:
      'Purpose-specific input types expose useful semantics, browser validation, autofill, and mobile keyboards. Email, tel, date, number, url, and search are not visual themes. Inputmode can refine the on-screen keyboard without changing submitted data semantics. Type selection must allow realistic international values and must not pretend to prove identity or correctness.',
    misconception:
      'All short text values should use type text because other types only change appearance.',
    correct:
      'Choose the narrowest truthful input type, add inputmode only when useful, and test real device keyboards plus valid edge cases.',
    distractors: [
      'Use number for telephone numbers because every telephone number contains digits.',
      'Use email for a display name so the browser prevents spaces.',
    ],
    sequence: [
      'Identify the meaning and valid range of the requested value',
      'Choose a type whose native contract matches that meaning',
      'Add autocomplete or inputmode without narrowing valid data incorrectly',
      'Test desktop and mobile entry with ordinary and edge-case values',
    ],
    terms: ['type', 'inputmode', 'keyboard'],
    prerequisiteIds: ['form-labels-instructions'],
    requirements: [
      ['email-input', '<input id="contact-email" name="email" type="email" autocomplete="email"'],
      ['telephone-input', '<input id="contact-phone" name="phone" type="tel" inputmode="tel"'],
      ['visit-date', '<input id="visit-date" name="visitDate" type="date"'],
      ['party-size', '<input id="party-size" name="partySize" type="number" min="1" max="12"'],
    ],
  },
  {
    id: 'form-grouping-options',
    activityId: 'option-grouping-workbench',
    title: 'Build Understandable Option Groups',
    context: 'transport and accessibility preference form',
    concept:
      'Fieldset and legend give a related control group an announced purpose. Radio controls sharing one name represent one mutually exclusive choice. Checkboxes represent independent yes-or-no choices. Select is useful for a compact bounded list, but native radios may make a small critical choice easier to compare. Visual proximity alone does not create programmatic grouping.',
    misconception: 'Visually adjacent radio buttons automatically form an announced group.',
    correct:
      'Choose radio, checkbox, or select from the choice relationship and expose group purpose with native structure.',
    distractors: [
      'Give each radio a different name so the browser knows each label is unique.',
      'Use checkboxes for one required exclusive answer and repair multiple selections on the server.',
    ],
    sequence: [
      'Classify choices as exclusive, independent, or a compact bounded list',
      'Add fieldset and legend when controls answer one shared question',
      'Apply shared or independent names according to the relationship',
      'Test announcement, keyboard movement, initial state, and submitted values',
    ],
    terms: ['fieldset', 'legend', 'radio'],
    prerequisiteIds: ['form-input-types'],
    requirements: [
      ['transport-fieldset', '<fieldset>'],
      ['transport-legend', '<legend>Preferred transport</legend>'],
      ['bus-radio', '<input id="transport-bus" name="transport" type="radio" value="bus"'],
      ['van-radio', '<input id="transport-van" name="transport" type="radio" value="van"'],
      ['follow-up-checkbox', '<input id="follow-up" name="followUp" type="checkbox"'],
      ['center-select', '<select id="center" name="center">'],
    ],
  },
  {
    id: 'form-native-validation',
    activityId: 'humane-validation-triage',
    title: 'Apply Helpful Native Validation',
    context: 'cooling-service request validation review',
    concept:
      'Native constraints such as required, minlength, maxlength, min, max, step, and truthful type checks prevent specific impossible or incomplete states. Autocomplete communicates input purpose. Validation must accept realistic names, addresses, phone numbers, and languages. A restrictive pattern often blocks valid people while adding little security; server validation is still required.',
    misconception:
      'A restrictive regular expression is always the strongest way to improve data quality.',
    correct:
      'Use the least restrictive native constraints that match the real rule, explain failures clearly, and repeat validation on the server.',
    distractors: [
      'Mark every control required so the service receives the largest possible data set.',
      'Trust client-side validation as the authorization and security boundary.',
    ],
    sequence: [
      'State the real-world completeness or range rule in plain language',
      'Choose the native constraint that expresses only that rule',
      'Try blank, boundary, realistic international, and malicious values',
      'Improve guidance and confirm equivalent server-side enforcement',
    ],
    terms: ['constraint', 'required', 'server'],
    prerequisiteIds: ['form-grouping-options'],
    requirements: [
      ['required-name', 'name="requesterName" required'],
      ['message-length', 'name="message" minlength="20" maxlength="500"'],
      ['party-range', 'name="partySize" type="number" min="1" max="12"'],
      ['name-autocomplete', 'autocomplete="name"'],
    ],
  },
  {
    id: 'table-structure',
    activityId: 'data-table-architecture',
    title: 'Model Two-Dimensional Data with a Table',
    context: 'cooling-center capacity report',
    concept:
      'A data table represents relationships across rows and columns. Caption names the table’s purpose. Thead, tbody, and tfoot group meaningful row regions. Tr contains a row; th identifies a header; td contains data. Tables are not page-layout grids, and visual borders do not create data relationships.',
    misconception: 'Tables are an efficient general-purpose tool for aligning page layout.',
    correct:
      'Use a table only for two-dimensional data, give it a caption, and preserve row and column meaning without CSS.',
    distractors: [
      'Put every cell directly inside table because browsers infer the missing rows.',
      'Use div elements with grid styling because visual columns automatically announce table relationships.',
    ],
    sequence: [
      'Confirm the content has meaningful row and column intersections',
      'Write a caption that identifies the table and reporting context',
      'Build row groups, rows, header cells, and data cells',
      'Disable styles and inspect whether the data relationship still reads correctly',
    ],
    terms: ['table', 'caption', 'row'],
    prerequisiteIds: ['form-native-validation'],
    requirements: [
      ['capacity-table', '<table>'],
      ['capacity-caption', '<caption>Cooling center capacity by time</caption>'],
      ['table-head', '<thead>'],
      ['table-body', '<tbody>'],
      ['table-foot', '<tfoot>'],
    ],
  },
  {
    id: 'table-header-associations',
    activityId: 'cell-header-map',
    title: 'Preserve Every Cell’s Header Context',
    context: 'multi-center resource matrix',
    concept:
      'Header cells create programmatic context. Scope col and scope row are clear for simple tables. Complex matrices may require stable header ids and headers references so each data cell identifies all relevant headers. Bold text or a first-row visual style cannot replace th relationships.',
    misconception:
      'Bold first-row cells provide the same programmatic relationship as header cells.',
    correct:
      'Use th with scope for simple relationships and explicit id-headers mappings only when the matrix truly needs them.',
    distractors: [
      'Put scope on td cells because data cells know which direction they belong to.',
      'Add one aria-label to the table and omit individual row and column headers.',
    ],
    sequence: [
      'Identify the row and column headers for representative data cells',
      'Use th and scope when each relationship is unambiguous',
      'Add id and headers only for multi-level or irregular relationships',
      'Inspect announced headers for first, middle, empty, and total cells',
    ],
    terms: ['header', 'scope', 'headers'],
    prerequisiteIds: ['table-structure'],
    requirements: [
      ['column-header', '<th scope="col" id="capacity-time">Time</th>'],
      ['row-header', '<th scope="row" id="downtown-center">Downtown</th>'],
      ['explicit-association', '<td headers="downtown-center capacity-time">2:00 PM</td>'],
    ],
  },
  {
    id: 'form-table-testing',
    activityId: 'form-table-test-matrix',
    title: 'Test Forms and Tables across Failure States',
    context: 'release-readiness evidence matrix',
    concept:
      'One successful mouse submission proves little. Robust forms and tables need keyboard-only completion, visible focus, zoom and reflow, narrow-width inspection, valid and invalid data, error recovery, source and accessibility-tree checks, and representative screen-reader semantics. Record evidence and retest after each repair.',
    misconception: 'Successful mouse submission proves the form is accessible and robust.',
    correct:
      'Run a written matrix across input methods, viewport changes, validation failures, and announced relationships, then keep the evidence.',
    distractors: [
      'Inspect only the default desktop state because responsive CSS does not affect semantics.',
      'Run an automated checker once and skip keyboard plus assistive-technology verification.',
    ],
    sequence: [
      'Define success and failure cases for controls and representative data cells',
      'Run keyboard, zoom, narrow-width, validation, and semantic checks',
      'Record source, behavior, announcement, and recovery evidence',
      'Repair the earliest cause and rerun the complete affected matrix',
    ],
    terms: ['keyboard', 'validation', 'evidence'],
    prerequisiteIds: ['table-header-associations'],
    requirements: [
      ['test-section', '<section aria-labelledby="verification-heading">'],
      ['test-heading', '<h2 id="verification-heading">Verification record</h2>'],
      ['test-plan', '<ul id="form-table-test-plan">'],
      ['keyboard-case', '<li>Keyboard-only completion and error recovery</li>'],
      ['reflow-case', '<li>Four-hundred-percent zoom and narrow-width reflow</li>'],
      ['semantics-case', '<li>Form names and representative table header announcements</li>'],
    ],
  },
];

const formFocus = [
  'form-purpose-method',
  'form-labels-instructions',
  'form-input-types',
  'form-grouping-options',
  'form-native-validation',
];
const tableFocus = ['table-structure', 'table-header-associations'];
const allFocus = [...formFocus, ...tableFocus, 'form-table-testing'];

const mappedPlans = {
  'mapped-lecture-working-with-forms': {
    title: 'Trace a Complete Form Data Contract',
    context: 'neighborhood cooling transport intake design review',
    focus: formFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-hotel-feedback-form': {
    title: 'Workshop: Build a Cooling-Center Experience Report',
    context: 'community cooling-center feedback and follow-up workflow',
    focus: formFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lecture-working-with-tables': {
    title: 'Trace Relationships through a Data Table',
    context: 'regional heat-service capacity reporting desk',
    focus: tableFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-final-exams-table': {
    title: 'Workshop: Build a Volunteer Certification Results Table',
    context: 'heat-response volunteer certification results release',
    focus: tableFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-book-catalog-table': {
    title: 'Lab: Repair a Mutual-Aid Resource Catalog',
    context: 'broken relief-supply catalog incident',
    focus: tableFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lecture-working-with-html-tools': {
    title: 'Build a Form and Table Verification Record',
    context: 'validator keyboard zoom and semantics test desk',
    focus: ['form-table-testing'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-review-html-tables-and-forms': {
    title: 'Retrieval Review: Forms, Validation, and Tables',
    context: 'changed neighborhood registration and reporting system',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-quiz-html-tables-and-forms': {
    title: 'Mastery Exam: Forms, Validation, and Tables',
    context: 'independent heat-response release decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
};

const milestones = [
  [
    'Create the state-changing report contract',
    '<form action="/cooling-feedback" method="post">',
    'form-purpose-method',
  ],
  ['Name the center identifier payload', 'name="centerId"', 'form-purpose-method'],
  ['Name the visit date payload', 'name="visitDate"', 'form-purpose-method'],
  [
    'Add the native submit action',
    '<button type="submit">Send experience report</button>',
    'form-purpose-method',
  ],
  ['Label the visitor name', '<label for="visitor-name">Name</label>', 'form-labels-instructions'],
  [
    'Connect the visitor name control',
    '<input id="visitor-name" name="visitorName"',
    'form-labels-instructions',
  ],
  [
    'Publish persistent report guidance',
    '<p id="report-help">Include what worked and what needs attention.</p>',
    'form-labels-instructions',
  ],
  ['Connect report guidance', 'aria-describedby="report-help"', 'form-labels-instructions'],
  ['Label the contact email', '<label for="feedback-email">Email</label>', 'form-input-types'],
  [
    'Add the purpose-specific email control',
    '<input id="feedback-email" name="email" type="email" autocomplete="email"',
    'form-input-types',
  ],
  [
    'Add an international telephone control',
    '<input id="feedback-phone" name="phone" type="tel" inputmode="tel"',
    'form-input-types',
  ],
  [
    'Add the visit date control',
    '<input id="feedback-date" name="visitDate" type="date"',
    'form-input-types',
  ],
  [
    'Add a bounded party-size control',
    '<input id="feedback-party" name="partySize" type="number" min="1" max="12"',
    'form-input-types',
  ],
  ['Open the transport option group', '<fieldset>', 'form-grouping-options'],
  [
    'Name the transport question',
    '<legend>How did you reach the center?</legend>',
    'form-grouping-options',
  ],
  [
    'Add the bus option to one exclusive group',
    '<input id="arrival-bus" name="arrival" type="radio" value="bus"',
    'form-grouping-options',
  ],
  [
    'Add the walking option to the same group',
    '<input id="arrival-walk" name="arrival" type="radio" value="walk"',
    'form-grouping-options',
  ],
  [
    'Add an independent follow-up choice',
    '<input id="contact-follow-up" name="followUp" type="checkbox"',
    'form-grouping-options',
  ],
  [
    'Add a center selection list',
    '<select id="feedback-center" name="centerId">',
    'form-grouping-options',
  ],
  ['Require the report message', 'name="message" required', 'form-native-validation'],
  ['Set helpful message length bounds', 'minlength="20" maxlength="500"', 'form-native-validation'],
  ['Expose visitor-name autocomplete purpose', 'autocomplete="name"', 'form-native-validation'],
  [
    'Keep party size within service limits',
    'name="partySize" type="number" min="1" max="12"',
    'form-native-validation',
  ],
  ['Create the certification results table', '<table>', 'table-structure'],
  [
    'Name the certification report',
    '<caption>Heat-response volunteer certification results</caption>',
    'table-structure',
  ],
  ['Group column headings', '<thead>', 'table-structure'],
  ['Group volunteer results', '<tbody>', 'table-structure'],
  ['Group the completion totals', '<tfoot>', 'table-structure'],
  ['Create one results row', '<tr>', 'table-structure'],
  [
    'Identify the volunteer column',
    '<th scope="col" id="result-volunteer">Volunteer</th>',
    'table-header-associations',
  ],
  [
    'Identify the score column',
    '<th scope="col" id="result-score">Score</th>',
    'table-header-associations',
  ],
  [
    'Identify a volunteer row',
    '<th scope="row" id="volunteer-alex">Alex</th>',
    'table-header-associations',
  ],
  [
    'Associate Alex with the score header',
    '<td headers="volunteer-alex result-score">94</td>',
    'table-header-associations',
  ],
  [
    'Identify the status column',
    '<th scope="col" id="result-status">Status</th>',
    'table-header-associations',
  ],
  [
    'Associate Alex with the status header',
    '<td headers="volunteer-alex result-status">Certified</td>',
    'table-header-associations',
  ],
  [
    'Open the release verification record',
    '<section aria-labelledby="verification-heading">',
    'form-table-testing',
  ],
  [
    'Name the verification record',
    '<h2 id="verification-heading">Verification record</h2>',
    'form-table-testing',
  ],
  ['List the planned checks', '<ul id="form-table-test-plan">', 'form-table-testing'],
  [
    'Record keyboard evidence',
    '<li>Keyboard-only completion and error recovery</li>',
    'form-table-testing',
  ],
  [
    'Record reflow evidence',
    '<li>Four-hundred-percent zoom and narrow-width reflow</li>',
    'form-table-testing',
  ],
  [
    'Record semantic evidence',
    '<li>Form names and representative table header announcements</li>',
    'form-table-testing',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'html-forms-and-tables',
  moduleId: 'forms-tables-data',
  title: 'Forms, Validation, and Data Tables',
  description:
    'Design humane data-entry contracts and resilient two-dimensional reports, then verify names, groups, constraints, keyboard behavior, reflow, and announced relationships.',
  order: 4,
  objectives: [
    'Design form action, method, names, labels, instructions, types, and groups from a real submission workflow.',
    'Apply native validation that supports realistic input without treating the browser as a security boundary.',
    'Model two-dimensional data with captions, row groups, headers, cells, and durable header associations.',
    'Collect release evidence across keyboard, zoom, narrow widths, invalid states, and assistive semantics.',
  ],
  competencyIds: models.map((model) => model.id),
  models,
  retainedCompetencyIds: ['semantic-native-first', 'html-validation-tools'],
  cumulativeArtifactId,
  starterFiles,
  prerequisiteModuleId: 'semantic-html-relationships',
  priorLastActivityId: 'mapped-quiz-semantic-html',
  insertAfterCompetencyId: 'semantic-native-first',
  insertAfterModuleId: 'semantic-html-relationships',
  estimatedHours: 390,
  milestones,
  mappedPlans,
  activityIds: [
    'submission-contract-studio',
    'persistent-label-clinic',
    'input-purpose-device-lab',
    'option-grouping-workbench',
    'humane-validation-triage',
    'mapped-lecture-working-with-forms',
    'mapped-workshop-hotel-feedback-form',
    'data-table-architecture',
    'cell-header-map',
    'mapped-lecture-working-with-tables',
    'mapped-workshop-final-exams-table',
    'mapped-lab-book-catalog-table',
    'form-table-test-matrix',
    'mapped-lecture-working-with-html-tools',
    'mapped-review-html-tables-and-forms',
    'mapped-quiz-html-tables-and-forms',
  ],
});

console.log(
  `Generated Forms and Tables: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
