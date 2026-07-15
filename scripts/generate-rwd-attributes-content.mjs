import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'volunteer-shift-deck';
const starterFiles = {
  html: '<!-- Continue the Volunteer Shift Deck attribute-state work here. -->',
  css: '/* Continue the attribute-driven styling system here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-attribute-presence-value',
    activityId: 'attribute-presence-value-lab',
    title: 'Match Truthful Attribute Presence and Exact Values',
    context: 'shift form type and requirement styling audit',
    concept:
      'Attribute selectors match DOM facts. [required] matches presence regardless of value, while [type="email"] matches an exact serialized value. Styling does not add, remove, or validate the semantic state; HTML or application logic remains the source of truth. Selectors should reflect stable meaningful attributes rather than duplicate them with decorative classes.',
    misconception: 'An attribute selector changes the underlying semantic state it matches.',
    correct:
      'Set truthful attributes in HTML or behavior logic, then use presence or exact-value selectors to reflect those facts visually.',
    distractors: [
      'Style a control with [required] and assume the browser now requires it.',
      'Use [type] whenever only email inputs should receive the rule.',
    ],
    sequence: [
      'Identify the semantic type or state source in the DOM',
      'Choose presence or exact-value matching',
      'Apply presentation without pretending CSS changes state',
      'Change remove and mistype the attribute and verify matches plus behavior',
    ],
    terms: ['attribute', 'presence', 'state'],
    prerequisiteIds: ['css-type-class-id-selectors', 'css-stacking-contexts'],
    requirements: [
      ['required-selector', '.shift-form [required] {\n  border-inline-start-width: 0.35rem;\n}'],
      ['email-selector', '.shift-form input[type="email"] {\n  inline-size: min(100%, 36rem);\n}'],
      ['disabled-selector', '.shift-form [disabled] {\n  opacity: 0.7;\n}'],
    ],
  },
  {
    id: 'css-attribute-token-language',
    activityId: 'token-language-selector-lab',
    title: 'Distinguish Tokens, Hyphenated Prefixes, and Case Rules',
    context: 'multilingual shift classification selector review',
    concept:
      '[attr~="token"] matches one whitespace-separated token. [lang|="es"] matches es or values beginning es-. These are not arbitrary substring checks. Optional i and s modifiers control ASCII case sensitivity where supported and appropriate. The value model must match how the attribute is defined and authored.',
    misconception: 'The contains operator is interchangeable with token matching.',
    correct:
      'Identify whether the value is a token list, hyphenated language code, or exact string, then choose the matching operator and case rule.',
    distractors: [
      'Use *= for language because any value containing en belongs to English.',
      'Use ~= on a comma-separated value and assume commas count as whitespace tokens.',
    ],
    sequence: [
      'Document the attribute value grammar',
      'Choose token hyphen-prefix exact or another operator',
      'Declare case handling only when the value model permits it',
      'Test whole partial adjacent mixed-case and language-subcode values',
    ],
    terms: ['token', 'language', 'case'],
    prerequisiteIds: ['css-attribute-presence-value'],
    requirements: [
      [
        'skill-token',
        '.shift-card[data-skills~="first-aid"] {\n  border-inline-start-color: #075985;\n}',
      ],
      ['language-prefix', '.shift-card[lang|="es"] {\n  hyphens: auto;\n}'],
      [
        'case-insensitive-type',
        '.shift-card[data-shift-type="transport" i] {\n  border-block-start-style: double;\n}',
      ],
    ],
  },
  {
    id: 'css-attribute-substrings',
    activityId: 'substring-convention-risk-lab',
    title: 'Use Substring Selectors Only against Stable Conventions',
    context: 'shift resource URL and filename convention audit',
    concept:
      '[attr^="prefix"] matches a beginning, [attr$="suffix"] an ending, and [attr*="fragment"] any substring. These operators can encode brittle assumptions about filenames, URLs, IDs, or generated values. Query strings, localization, CDNs, renamed files, and unexpected fragments can change matches. Prefer explicit data or class state when no stable external convention exists.',
    misconception:
      'Substring selectors remain safe when filenames and URL formats change arbitrarily.',
    correct:
      'Document the stable convention, choose the narrowest substring operator, test format changes, and replace brittle inference with explicit state.',
    distractors: [
      'Use href*="pdf" because any URL containing those letters must be a PDF.',
      'Use id^="error" as the application error state even when IDs are generated randomly.',
    ],
    sequence: [
      'Identify the external convention and its owner',
      'Choose prefix suffix or substring matching narrowly',
      'Test query fragments case changes CDNs and renamed resources',
      'Use explicit data or class state when the convention is not durable',
    ],
    terms: ['prefix', 'suffix', 'convention'],
    prerequisiteIds: ['css-attribute-token-language'],
    requirements: [
      [
        'external-link',
        '.shift-resources a[href^="https://"] {\n  text-decoration-style: solid;\n}',
      ],
      ['pdf-link', '.shift-resources a[href$=".pdf" i] {\n  text-decoration-style: double;\n}'],
      ['telephone-link', '.shift-resources a[href^="tel:"] {\n  font-weight: 700;\n}'],
      [
        'convention-comment',
        '/* URL substring selectors depend on documented stable schemes and suffixes. */',
      ],
    ],
  },
  {
    id: 'css-data-aria-state',
    activityId: 'data-aria-state-contract-lab',
    title: 'Reflect Data and ARIA State without Making CSS the Controller',
    context: 'shift availability and disclosure state synchronization',
    concept:
      'Data attributes can expose application-specific state and ARIA states communicate accessibility semantics. CSS may style [data-status="open"], [aria-current="true"], or [aria-expanded="true"], but generated content and colors do not update DOM state, keyboard behavior, focus, or business logic. State changes must happen in the owning HTML or script and styling must visibly reflect truth.',
    misconception: 'Changing generated content or color updates an ARIA state automatically.',
    correct:
      'Update state in the owning behavior, synchronize ARIA and data attributes, then use selectors as presentation and verify every transition.',
    distractors: [
      'Set content "expanded" in ::after and assume aria-expanded becomes true.',
      'Use a red background as the only source of closed status without changing DOM text or data.',
    ],
    sequence: [
      'Name the behavior owner and state transition',
      'Update truthful data and ARIA attributes in the DOM',
      'Style exact states with independent text and structural cues',
      'Test keyboard focus announcement visual state and repeated transitions',
    ],
    terms: ['ARIA', 'data', 'behavior'],
    prerequisiteIds: ['css-attribute-substrings'],
    requirements: [
      [
        'open-state',
        '.shift-card[data-status="open"] {\n  border-inline-start: 0.4rem solid #166534;\n}',
      ],
      [
        'closed-state',
        '.shift-card[data-status="closed"] {\n  border-inline-start: 0.4rem double #991b1b;\n}',
      ],
      [
        'current-state',
        '.shift-filter[aria-current="true"] {\n  font-weight: 800;\n  text-decoration: underline;\n}',
      ],
      [
        'expanded-state',
        '.shift-disclosure[aria-expanded="true"] .disclosure-icon {\n  rotate: 180deg;\n}',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-working-with-attribute-selectors': {
    title: 'Trace Attribute Value Models and State Ownership',
    context: 'Volunteer Shift Deck selector evidence lab',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-balance-sheet': {
    title: 'Workshop: Build a Relief-Supply Budget Ledger',
    context: 'multi-period supply ledger with truthful data and state attributes',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-review-css-attribute-selectors': {
    title: 'Retrieval Review: Attribute-Driven Styling',
    context: 'changed value grammar URL and application-state constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
  },
  'mapped-quiz-css-attribute-selectors': {
    title: 'Mastery Exam: Attribute-Driven Styling',
    context: 'independent selector and state-ownership decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 30,
  },
};

const extraPlans = {
  'attribute-selectors-transfer-lab': {
    title: 'Transfer Lab: Repair an Emergency Resource Directory',
    context: 'unfamiliar token language URL and ARIA-state selector incident',
    kind: 'lab',
    targetSteps: 16,
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
};

const milestones = [
  [
    'Style truthfully required controls',
    '.shift-form [required] {',
    'css-attribute-presence-value',
  ],
  ['Style exact email control types', 'input[type="email"] {', 'css-attribute-presence-value'],
  ['Style disabled presence', '.shift-form [disabled] {', 'css-attribute-presence-value'],
  [
    'Document CSS state reflection only',
    '/* Attribute selectors reflect DOM facts; they do not create behavior. */',
    'css-attribute-presence-value',
  ],
  ['Match one skill token', '[data-skills~="first-aid"]', 'css-attribute-token-language'],
  ['Match a language and subcodes', '[lang|="es"]', 'css-attribute-token-language'],
  [
    'Match a case-insensitive controlled value',
    '[data-shift-type="transport" i]',
    'css-attribute-token-language',
  ],
  [
    'Document token grammar',
    '/* ~= matches whitespace tokens; |= matches exact or hyphen-prefixed language values. */',
    'css-attribute-token-language',
  ],
  ['Match secure URL prefixes', 'a[href^="https://"]', 'css-attribute-substrings'],
  ['Match PDF suffixes case-insensitively', 'a[href$=".pdf" i]', 'css-attribute-substrings'],
  ['Match telephone schemes', 'a[href^="tel:"]', 'css-attribute-substrings'],
  [
    'Document substring convention ownership',
    '/* URL substring selectors depend on documented stable schemes and suffixes. */',
    'css-attribute-substrings',
  ],
  ['Style open data state', '[data-status="open"]', 'css-data-aria-state'],
  ['Style closed data state with a second cue', '[data-status="closed"]', 'css-data-aria-state'],
  ['Style current ARIA state', '[aria-current="true"]', 'css-data-aria-state'],
  ['Style expanded ARIA state', '[aria-expanded="true"]', 'css-data-aria-state'],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'attribute-selectors',
  moduleId: 'attribute-driven-styling',
  title: 'Attribute-Driven Styling',
  description:
    'Match presence, exact values, tokens, language subcodes, stable URL conventions, data state, and ARIA state accurately while keeping HTML and behavior—not CSS—as the source of truth.',
  order: 20,
  objectives: [
    'Use presence and exact-value selectors to reflect truthful semantic type and state attributes.',
    'Distinguish whitespace tokens, hyphenated language prefixes, exact values, and case-sensitivity rules.',
    'Use prefix, suffix, and substring matching only against documented stable conventions.',
    'Style data and ARIA states while keeping interaction logic, semantics, keyboard behavior, and state transitions synchronized.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: ['css-type-class-id-selectors', 'css-stacking-contexts'],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'answer', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'css-flow-positioning-stacking',
  priorLastActivityId: 'mapped-quiz-css-positioning',
  insertAfterCompetencyId: 'css-stacking-contexts',
  insertAfterModuleId: 'css-flow-positioning-stacking',
  estimatedHours: 2180,
  milestones,
  mappedPlans,
  extraPlans,
  activityIds: [
    'attribute-presence-value-lab',
    'token-language-selector-lab',
    'substring-convention-risk-lab',
    'data-aria-state-contract-lab',
    'mapped-lecture-working-with-attribute-selectors',
    'mapped-workshop-balance-sheet',
    'attribute-selectors-transfer-lab',
    'mapped-review-css-attribute-selectors',
    'mapped-quiz-css-attribute-selectors',
  ],
});

console.log(
  `Generated Attribute Styling: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
