import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'community-needs-survey';
const starterFiles = {
  html: '<!-- Continue the Community Needs Survey state work here. -->',
  css: '/* Continue the survey state and selector system here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-action-pseudo-classes',
    activityId: 'multi-input-state-matrix',
    title: 'Design States for Pointer, Keyboard, and Navigation',
    context: 'survey action-state and focus-route audit',
    concept:
      'Action pseudo-classes expose different conditions: :link and :visited reflect navigation history, :hover pointer proximity, :active activation, :focus current focus, :focus-visible a browser heuristic for visible focus, :focus-within descendant focus, and :target a matching URL fragment. They overlap but are not interchangeable, and touch has no durable hover state.',
    misconception: 'Hover and focus represent the same interaction for every user.',
    correct:
      'Define each state from its actual input or navigation condition, keep focus visible, and test pointer, touch, keyboard, and fragment navigation separately.',
    distractors: [
      'Put every interaction style under hover because browsers synthesize hover on all devices.',
      'Remove focus outlines when an element also has an active state.',
    ],
    sequence: [
      'List link pointer keyboard activation and fragment states',
      'Assign distinct useful feedback to each relevant state',
      'Order overlapping rules so one state does not erase another',
      'Test mouse touch keyboard history and fragment navigation',
    ],
    terms: ['hover', 'focus-visible', 'active'],
    prerequisiteIds: ['css-math-fluid-sizing'],
    requirements: [
      ['action-hover', '.primary-action:hover {\n  background-color: #0c4a6e;\n}'],
      [
        'action-focus',
        '.primary-action:focus-visible {\n  outline: 0.2rem solid #f59e0b;\n  outline-offset: 0.2rem;\n}',
      ],
      ['action-active', '.primary-action:active {\n  transform: translateY(1px);\n}'],
      ['target-section', '.survey-section:target {\n  scroll-margin-block-start: 1rem;\n}'],
    ],
  },
  {
    id: 'css-structural-pseudo-classes',
    activityId: 'structural-selector-trace',
    title: 'Trace Structural Selectors against the Real DOM',
    context: 'dynamic service-list selector investigation',
    concept:
      'Structural pseudo-classes match document relationships. :first-child and :last-child consider sibling position; :nth-child() counts all element siblings before applying its pattern unless modern of syntax narrows the set; :first-of-type and :nth-of-type count element types; :empty matches no children or text; :root targets the document root. Whitespace and inserted nodes can change results.',
    misconception: 'Nth-child counts only elements that match the selector before it.',
    correct:
      'Draw the sibling list, identify what the pseudo-class counts, predict matches, and confirm them after dynamic content is inserted.',
    distractors: [
      'Use nth-child and nth-of-type interchangeably because both count visible rows only.',
      'Assume empty matches elements containing whitespace and comments as visible placeholders.',
    ],
    sequence: [
      'List the target element siblings in DOM order',
      'Identify whether the selector counts all children or one element type',
      'Apply the formula and selector filtering in the correct order',
      'Insert remove and hide nodes and verify the resulting matches',
    ],
    terms: ['nth-child', 'siblings', 'DOM'],
    prerequisiteIds: ['css-action-pseudo-classes'],
    requirements: [
      ['first-field', '.field-group:first-child {\n  margin-block-start: 0;\n}'],
      [
        'alternating-evidence',
        '.verification-list li:nth-child(odd) {\n  background-color: #e0f2fe;\n}',
      ],
      ['last-field', '.field-group:last-child {\n  margin-block-end: 0;\n}'],
      ['empty-status', '.survey-status:empty {\n  display: none;\n}'],
    ],
  },
  {
    id: 'css-form-state-pseudo-classes',
    activityId: 'form-state-timing-lab',
    title: 'Style Form State without Premature Blame',
    context: 'survey validation and selection-state timing review',
    concept:
      'Form pseudo-classes include :required, :optional, :valid, :invalid, :user-valid, :user-invalid, :checked, :indeterminate, :enabled, :disabled, :read-only, and :placeholder-shown. Native validity reflects constraints, not whether a user has interacted. User-state selectors or a submitted-state class can delay strong error styling. Color must be paired with text, icons, or boundaries.',
    misconception:
      'Invalid styling should appear before a learner has interacted with a blank form.',
    correct:
      'Distinguish requirement, interaction, validity, selection, and availability states, then time feedback and pair it with explicit text.',
    distractors: [
      'Hide disabled controls completely so users never wonder why they are unavailable.',
      'Use :valid as proof that server validation and business rules passed.',
    ],
    sequence: [
      'List required optional validity selection and availability states',
      'Decide which states need immediate or post-interaction feedback',
      'Pair pseudo-class presentation with visible and programmatic text',
      'Test untouched invalid corrected checked disabled and server-failure paths',
    ],
    terms: ['user-invalid', 'checked', 'disabled'],
    prerequisiteIds: ['css-structural-pseudo-classes'],
    requirements: [
      ['required-field', '.field-group :required {\n  border-inline-start-width: 0.35rem;\n}'],
      [
        'user-invalid-field',
        '.field-group :user-invalid {\n  border-color: #b91c1c;\n  background-color: #fef2f2;\n}',
      ],
      ['checked-option', '.option-row input:checked + label {\n  font-weight: 700;\n}'],
      ['disabled-control', '.field-group :disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}'],
    ],
  },
  {
    id: 'css-functional-pseudo-classes',
    activityId: 'functional-selector-scope-lab',
    title: 'Simplify Selectors while Controlling Specificity',
    context: 'survey component selector consolidation',
    concept:
      ':is() matches any selector in its list and takes the specificity of its most specific argument. :where() also matches a list but contributes zero specificity. :not() excludes matches and takes argument specificity. :has() selects an element based on relative descendant or sibling conditions and may need feature support planning. Functional selectors can simplify architecture or accidentally escalate reach.',
    misconception: 'The where function adds the specificity of its most specific argument.',
    correct:
      'Choose is, where, not, or has from matching intent, calculate resulting specificity, and test both intended and excluded component states.',
    distractors: [
      'Use :has() as a replacement for every class because relational selectors cannot affect performance or support.',
      'Put an ID inside :is() whenever one branch needs a reusable low-specificity rule.',
    ],
    sequence: [
      'Write the intended match set and exclusions',
      'Choose is where not or has from the relationship',
      'Calculate argument and resulting specificity',
      'Test changed descendants unsupported behavior and accidental matches',
    ],
    terms: [':where', ':is', 'specificity'],
    prerequisiteIds: ['css-form-state-pseudo-classes'],
    requirements: [
      [
        'field-control-list',
        '.field-group :is(input, select, textarea) {\n  inline-size: 100%;\n}',
      ],
      ['low-specificity-stack', ':where(.survey-stack) > * + * {\n  margin-block-start: 1rem;\n}'],
      [
        'exclude-submit',
        '.field-group input:not([type="submit"]) {\n  min-block-size: 2.75rem;\n}',
      ],
      [
        'invalid-group',
        '.field-group:has(:user-invalid) {\n  border-inline-start: 0.25rem solid #b91c1c;\n}',
      ],
    ],
  },
  {
    id: 'css-pseudo-elements',
    activityId: 'generated-presentation-boundary',
    title: 'Keep Generated Presentation Nonessential',
    context: 'survey marker and decorative-content audit',
    concept:
      'Pseudo-elements style generated or selected fragments: ::before and ::after create generated boxes, ::marker styles list markers, ::selection styles selected text, ::placeholder styles placeholder text, and ::first-letter targets a typographic fragment. Generated content can be unavailable, inconsistently exposed, or absent from copied text, so required instructions and status must remain in HTML.',
    misconception: 'Generated content is a reliable place for required instructions.',
    correct:
      'Use pseudo-elements for optional presentation, keep required meaning in HTML, and verify the task with generated styles disabled.',
    distractors: [
      'Put required-field instructions only in ::after content because CSS is always loaded.',
      'Use ::placeholder as the persistent label for every field.',
    ],
    sequence: [
      'Classify the proposed content as essential or decorative',
      'Keep essential wording status and instructions in HTML',
      'Add bounded pseudo-element presentation without blocking interaction',
      'Disable generated styles and verify reading copying printing and forced colors',
    ],
    terms: ['pseudo-element', 'decorative', 'HTML'],
    prerequisiteIds: ['css-functional-pseudo-classes'],
    requirements: [
      [
        'decorative-callout',
        '.survey-note::before {\n  content: "";\n  inline-size: 0.5rem;\n  background-color: currentColor;\n}',
      ],
      [
        'marker-style',
        '.verification-list li::marker {\n  color: #075985;\n  font-weight: 700;\n}',
      ],
      ['selection-style', '::selection {\n  color: #0f172a;\n  background-color: #fde68a;\n}'],
      ['placeholder-style', '::placeholder {\n  color: #475569;\n  opacity: 1;\n}'],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-working-with-pseudo-classes-and-pseudo-elements-in-css': {
    title: 'Trace State, Structure, and Generated Presentation',
    context: 'community survey selector and state evidence lab',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-greeting-card': {
    title: 'Workshop: Build a Heat-Check Notification Card',
    context: 'interactive neighbor wellness notification card',
    focus: [
      'css-action-pseudo-classes',
      'css-structural-pseudo-classes',
      'css-functional-pseudo-classes',
      'css-pseudo-elements',
    ],
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-parent-teacher-conference-form': {
    title: 'Workshop: Build a Cooling-Center Appointment Form',
    context: 'multi-state community cooling appointment workflow',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-job-application-form': {
    title: 'Lab: Repair an Emergency Volunteer Application',
    context: 'unfamiliar state timing and selector-scope incident',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-review-css-pseudo-classes': {
    title: 'Retrieval Review: Pseudo-Classes and Pseudo-Elements',
    context: 'changed multi-input survey state system',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-quiz-css-pseudo-classes': {
    title: 'Mastery Exam: Pseudo-Classes and Pseudo-Elements',
    context: 'independent selector and state release decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
};

const milestones = [
  [
    'Style pointer hover without replacing focus',
    '.primary-action:hover {',
    'css-action-pseudo-classes',
  ],
  ['Expose keyboard focus visibly', '.primary-action:focus-visible {', 'css-action-pseudo-classes'],
  ['Expose active press feedback', '.primary-action:active {', 'css-action-pseudo-classes'],
  [
    'Offset fragment targets below persistent UI',
    'scroll-margin-block-start: 1rem;',
    'css-action-pseudo-classes',
  ],
  [
    'Highlight a group containing focus',
    '.field-group:focus-within {\n  border-color: #075985;\n}',
    'css-action-pseudo-classes',
  ],
  [
    'Reset only the first field group margin',
    '.field-group:first-child {',
    'css-structural-pseudo-classes',
  ],
  [
    'Stripe odd verification items',
    '.verification-list li:nth-child(odd) {',
    'css-structural-pseudo-classes',
  ],
  [
    'Reset only the last field group margin',
    '.field-group:last-child {',
    'css-structural-pseudo-classes',
  ],
  ['Hide a truly empty status box', '.survey-status:empty {', 'css-structural-pseudo-classes'],
  [
    'Document nth-child sibling counting',
    '/* nth-child counts element siblings before testing the formula. */',
    'css-structural-pseudo-classes',
  ],
  [
    'Mark required controls without color alone',
    '.field-group :required {',
    'css-form-state-pseudo-classes',
  ],
  [
    'Delay strong invalid styling until interaction',
    '.field-group :user-invalid {',
    'css-form-state-pseudo-classes',
  ],
  [
    'Expose selected option state',
    '.option-row input:checked + label {',
    'css-form-state-pseudo-classes',
  ],
  [
    'Expose disabled availability state',
    '.field-group :disabled {',
    'css-form-state-pseudo-classes',
  ],
  [
    'Document server validation boundary',
    '/* CSS validity does not replace server validation. */',
    'css-form-state-pseudo-classes',
  ],
  [
    'Group control types with is',
    '.field-group :is(input, select, textarea) {',
    'css-functional-pseudo-classes',
  ],
  [
    'Create a zero-specificity stack default',
    ':where(.survey-stack) > * + * {',
    'css-functional-pseudo-classes',
  ],
  [
    'Exclude submit controls deliberately',
    '.field-group input:not([type="submit"]) {',
    'css-functional-pseudo-classes',
  ],
  [
    'Select groups containing user-invalid fields',
    '.field-group:has(:user-invalid) {',
    'css-functional-pseudo-classes',
  ],
  [
    'Feature-detect relational selection',
    '@supports selector(.field-group:has(:user-invalid)) {',
    'css-functional-pseudo-classes',
  ],
  ['Add a nonessential generated accent', '.survey-note::before {', 'css-pseudo-elements'],
  ['Style semantic list markers', '.verification-list li::marker {', 'css-pseudo-elements'],
  ['Style text selection legibly', '::selection {', 'css-pseudo-elements'],
  ['Keep placeholder contrast readable', '::placeholder {', 'css-pseudo-elements'],
  [
    'Document generated-content boundary',
    '/* Essential instructions stay in HTML, never generated content. */',
    'css-pseudo-elements',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'pseudo-classes-and-elements',
  moduleId: 'css-state-structure-generated-presentation',
  title: 'State, Structure, and Generated Presentation',
  description:
    'Style input and navigation states without modality assumptions, trace structural matching against the DOM, time form feedback responsibly, control functional-selector specificity, and keep pseudo-element content nonessential.',
  order: 11,
  objectives: [
    'Differentiate link, pointer, keyboard, activation, group-focus, and fragment-target states across input modes.',
    'Predict structural pseudo-class matching from the actual sibling and element-type sequence.',
    'Style form validity, selection, and availability with humane timing and non-color feedback.',
    'Use is, where, not, has, and pseudo-elements without accidental specificity or essential generated content.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: ['css-math-fluid-sizing', 'keyboard-focus', 'form-native-validation'],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'code', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'css-units-intrinsic-constraints',
  priorLastActivityId: 'mapped-quiz-css-relative-and-absolute-units',
  insertAfterCompetencyId: 'css-math-fluid-sizing',
  insertAfterModuleId: 'css-units-intrinsic-constraints',
  estimatedHours: 1070,
  milestones,
  mappedPlans,
  activityIds: [
    'multi-input-state-matrix',
    'structural-selector-trace',
    'form-state-timing-lab',
    'functional-selector-scope-lab',
    'generated-presentation-boundary',
    'mapped-lecture-working-with-pseudo-classes-and-pseudo-elements-in-css',
    'mapped-workshop-greeting-card',
    'mapped-workshop-parent-teacher-conference-form',
    'mapped-lab-job-application-form',
    'mapped-review-css-pseudo-classes',
    'mapped-quiz-css-pseudo-classes',
  ],
});

console.log(
  `Generated CSS State and Pseudo-Elements: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
