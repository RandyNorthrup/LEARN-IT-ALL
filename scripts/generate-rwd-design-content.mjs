import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'community-needs-survey';
const starterFiles = {
  html: '<!-- Continue the Community Needs Survey redesign here. -->',
  css: '/* Continue the survey design system here. */',
  javascript: '',
};

const models = [
  {
    id: 'design-user-goals',
    activityId: 'user-goal-design-brief',
    title: 'Translate Requests into Testable User Goals',
    context: 'community survey redesign discovery interview',
    concept:
      'A stakeholder request is an input, not proof of a user need. A design brief names people, jobs, contexts, constraints, risks, assumptions, and observable success evidence. Prioritized goals prevent a feature list from competing equally and let the team test whether a resident can complete the actual service task.',
    misconception: 'The stakeholder feature list is equivalent to evidence about user needs.',
    correct:
      'Separate requests from research evidence, state prioritized user tasks and constraints, and define observable success before choosing interface features.',
    distractors: [
      'Treat every requested feature as equally urgent so no stakeholder preference is challenged.',
      'Choose colors and components first because visual polish reveals the correct user task.',
    ],
    sequence: [
      'Collect stakeholder requests research observations and service constraints',
      'Distinguish evidence assumptions risks and unresolved questions',
      'Prioritize user jobs and write task-based success criteria',
      'Test the brief with representative scenarios and revise priorities',
    ],
    terms: ['user', 'task', 'evidence'],
    prerequisiteIds: ['css-backgrounds-borders'],
    requirements: [
      [
        'design-brief',
        '<section id="design-brief" aria-labelledby="design-brief-heading">',
        'source-includes',
        'html',
      ],
      [
        'design-brief-heading',
        '<h2 id="design-brief-heading">Survey redesign brief</h2>',
        'source-includes',
        'html',
      ],
      [
        'primary-task',
        '<p><strong>Primary task:</strong> Request the right heat-relief service without avoidable delay.</p>',
        'source-includes',
        'html',
      ],
      [
        'success-evidence',
        '<p><strong>Success evidence:</strong> Residents identify, complete, correct, and submit the form across input methods.</p>',
        'source-includes',
        'html',
      ],
    ],
  },
  {
    id: 'design-information-hierarchy',
    activityId: 'information-hierarchy-map',
    title: 'Make Priority Visible and Structural',
    context: 'urgent-service survey content hierarchy review',
    concept:
      'Hierarchy comes from content order, heading structure, grouping, scale, weight, contrast, and whitespace working together. Primary and secondary tasks need clear distinction without making every item loud. Visual order must agree with reading and focus order so emphasis does not create a different task sequence for different users.',
    misconception: 'Making every important item larger creates a clearer hierarchy.',
    correct:
      'Rank content and actions from user goals, align structural and visual order, and verify that people locate primary and secondary tasks quickly.',
    distractors: [
      'Use maximum font weight and saturated color on every required field.',
      'Move the primary action visually with CSS while leaving it last in reading order.',
    ],
    sequence: [
      'Rank content and actions by the design brief',
      'Create structural order and heading relationships',
      'Apply restrained scale contrast grouping and whitespace',
      'Run find-and-act tasks with visual keyboard and reading-order checks',
    ],
    terms: ['hierarchy', 'order', 'primary'],
    prerequisiteIds: ['design-user-goals'],
    requirements: [
      [
        'hero-hierarchy',
        '.survey-hero {\n  padding-block: 2rem;\n  border-block-end: 0.125rem solid #075985;\n}',
      ],
      ['primary-heading-scale', '.survey-hero h1 {\n  font-size: 2rem;\n  max-width: 22ch;\n}'],
      ['secondary-copy', '.survey-hero .lede {\n  font-size: 1.125rem;\n  max-width: 60ch;\n}'],
    ],
  },
  {
    id: 'design-spacing-alignment',
    activityId: 'spacing-alignment-audit',
    title: 'Use Spacing to Explain Relationships',
    context: 'survey grouping and alignment consistency audit',
    concept:
      'Proximity signals relationship. A small deliberate spacing scale, shared alignment edges, logical properties, and consistent group rhythm reduce visual parsing work. Whitespace is functional separation, not unused capacity. Dense or arbitrary gaps can make labels, help, errors, fields, and actions appear connected to the wrong content.',
    misconception: 'Whitespace is unused room that should be filled to maximize value.',
    correct:
      'Map repeated relationships to a small spacing scale, align related edges, and test grouping at narrow width, zoom, and changed content length.',
    distractors: [
      'Choose a unique margin for each element so every section has a custom personality.',
      'Align content with repeated spaces because text spacing adapts to all fonts.',
    ],
    sequence: [
      'Inventory repeated content and control relationships',
      'Assign close medium and section spacing from one scale',
      'Align related labels controls guidance and actions',
      'Audit grouping with long text zoom narrow width and translated content',
    ],
    terms: ['spacing', 'alignment', 'proximity'],
    prerequisiteIds: ['design-information-hierarchy'],
    requirements: [
      ['field-rhythm', '.field-group + .field-group {\n  margin-block-start: 1.5rem;\n}'],
      [
        'label-control-gap',
        '.field-group > label + :is(input, select, textarea) {\n  margin-block-start: 0.5rem;\n}',
      ],
      ['help-gap', '.field-help {\n  margin-block-start: 0.375rem;\n}'],
      ['section-gap', '.survey-section + .survey-section {\n  margin-block-start: 3rem;\n}'],
    ],
  },
  {
    id: 'design-color-typography',
    activityId: 'readability-system-studio',
    title: 'Build a Readable Color and Type System',
    context: 'heat-relief brand and readability reconciliation',
    concept:
      'Typography and color systems must support comprehension, hierarchy, states, and brand without sacrificing access. Readable line length, line height, font size, resilient system fallbacks, sufficient contrast, and non-color cues matter across zoom and rendering conditions. Brand colors are inputs to refine, not exemptions from contrast.',
    misconception: 'A brand color must be used for text even when it fails contrast.',
    correct:
      'Choose type and color roles from reading and state needs, adjust brand usage for contrast, and test real content across zoom, themes, and forced colors.',
    distractors: [
      'Use one faint gray for all secondary text errors and disabled states.',
      'Set long-form survey guidance in all caps to strengthen the brand voice.',
    ],
    sequence: [
      'List reading hierarchy brand and interaction-state roles',
      'Choose font stack sizes line heights measures and contrast-safe colors',
      'Add non-color cues for links errors status and focus',
      'Test long content zoom themes forced colors and common rendering differences',
    ],
    terms: ['contrast', 'typography', 'readability'],
    prerequisiteIds: ['design-spacing-alignment'],
    requirements: [
      [
        'body-reading',
        'body {\n  font-family: system-ui, sans-serif;\n  font-size: 1rem;\n  line-height: 1.6;\n}',
      ],
      ['reading-measure', '.survey-content {\n  max-width: 68ch;\n}'],
      ['muted-readable', '.supporting-text {\n  color: #334155;\n}'],
      [
        'error-color-cue',
        '.field-error {\n  color: #991b1b;\n  border-inline-start: 0.25rem solid currentColor;\n}',
      ],
    ],
  },
  {
    id: 'design-consistency-feedback',
    activityId: 'feedback-pattern-library',
    title: 'Make Behavior Predictable and Feedback Useful',
    context: 'survey control and status consistency review',
    concept:
      'Consistency means comparable controls and states follow predictable patterns, while different purposes remain distinguishable. Feedback should be timely, specific, visible, programmatically exposed, and proportional to the action. Hover, focus, active, disabled, loading, error, empty, and success states need a shared behavioral language and clear recovery.',
    misconception: 'Consistency means every component must look identical regardless of purpose.',
    correct:
      'Standardize patterns by purpose and state, preserve meaningful distinctions, and verify immediate feedback plus recovery across the complete task.',
    distractors: [
      'Give every message the same blue treatment so users learn one universal state color.',
      'Delay all feedback until final submission because early guidance distracts users.',
    ],
    sequence: [
      'Inventory control purposes and every meaningful state',
      'Define shared visual semantic and behavioral patterns',
      'Apply specific feedback without erasing purposeful differences',
      'Run success delay empty error retry and repeated-action scenarios',
    ],
    terms: ['consistency', 'feedback', 'recovery'],
    prerequisiteIds: ['design-color-typography'],
    requirements: [
      [
        'primary-action',
        '.primary-action {\n  color: #ffffff;\n  background-color: #075985;\n  border: 0.125rem solid #075985;\n}',
      ],
      [
        'primary-focus',
        '.primary-action:focus-visible {\n  outline: 0.2rem solid #f59e0b;\n  outline-offset: 0.2rem;\n}',
      ],
      [
        'disabled-action',
        '.primary-action:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}',
      ],
      [
        'success-feedback',
        '.status-success {\n  color: #166534;\n  border-inline-start: 0.25rem solid currentColor;\n}',
      ],
    ],
  },
  {
    id: 'design-prototype-test',
    activityId: 'prototype-test-evidence-loop',
    title: 'Prototype Assumptions before Expensive Build Work',
    context: 'survey redesign prototype test session',
    concept:
      'Prototypes answer questions at the cheapest useful fidelity. Paper or low-fidelity flows can test order and vocabulary; interactive prototypes can test navigation and feedback; coded prototypes can test real browser behavior and access constraints. A polished mockup is still a hypothesis. Test reports connect observed behavior to evidence, decisions, revisions, and remaining uncertainty.',
    misconception: 'A polished mockup is proof that users can complete the intended task.',
    correct:
      'Choose fidelity from the risk being tested, observe representative tasks, record behavior rather than preference alone, and revise the design decision.',
    distractors: [
      'Build production-quality animation before testing whether users understand the task.',
      'Ask only whether participants like the colors and treat positive opinions as task success.',
    ],
    sequence: [
      'Name the riskiest assumption and observable task behavior',
      'Choose the cheapest prototype with enough fidelity to test it',
      'Observe representative attempts without leading the participant',
      'Connect findings to a revision remaining risk and next test',
    ],
    terms: ['prototype', 'observation', 'revision'],
    prerequisiteIds: ['design-consistency-feedback'],
    requirements: [
      [
        'prototype-report',
        '<section id="prototype-report" aria-labelledby="prototype-report-heading">',
        'source-includes',
        'html',
      ],
      [
        'prototype-heading',
        '<h2 id="prototype-report-heading">Prototype test report</h2>',
        'source-includes',
        'html',
      ],
      [
        'observed-behavior',
        '<p><strong>Observed behavior:</strong> Participants paused before choosing a primary service.</p>',
        'source-includes',
        'html',
      ],
      [
        'design-revision',
        '<p><strong>Revision:</strong> Clarify the service labels and test the changed choice order.</p>',
        'source-includes',
        'html',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-user-interface-design-fundamentals': {
    title: 'Connect Hierarchy, Rhythm, Type, and Feedback',
    context: 'community survey interface design critique',
    focus: [
      'design-information-hierarchy',
      'design-spacing-alignment',
      'design-color-typography',
      'design-consistency-feedback',
    ],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lecture-user-centered-design': {
    title: 'Translate Research into a Prioritized Design Brief',
    context: 'resident heat-relief research synthesis',
    focus: ['design-user-goals'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lecture-common-design-tools': {
    title: 'Choose Design Tools from the Question Being Tested',
    context: 'paper wireframe interactive and coded prototype decision',
    focus: ['design-prototype-test'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-review-design-fundamentals': {
    title: 'Retrieval Review: User-Centered Interface Design',
    context: 'changed community-service redesign brief',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-quiz-design-fundamentals': {
    title: 'Mastery Exam: User-Centered Interface Design',
    context: 'independent survey redesign release decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
};

const extraPlans = {
  'design-for-developers-faded-build': {
    title: 'Faded Build: Redesign the Survey Intake Experience',
    context: 'partially specified community survey redesign sprint',
    kind: 'workshop',
    targetSteps: 32,
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'design-for-developers-transfer-lab': {
    title: 'Transfer Lab: Repair an Emergency Shelter Intake',
    context: 'unfamiliar shelter intake hierarchy and feedback incident',
    kind: 'lab',
    targetSteps: 16,
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
};

const milestones = [
  [
    'Create the redesign brief region',
    '<section id="design-brief" aria-labelledby="design-brief-heading">',
    'design-user-goals',
    'source-includes',
    'html',
  ],
  [
    'Name the redesign brief',
    '<h2 id="design-brief-heading">Survey redesign brief</h2>',
    'design-user-goals',
    'source-includes',
    'html',
  ],
  [
    'State the primary resident task',
    '<p><strong>Primary task:</strong> Request the right heat-relief service without avoidable delay.</p>',
    'design-user-goals',
    'source-includes',
    'html',
  ],
  [
    'State observable success evidence',
    '<p><strong>Success evidence:</strong> Residents identify, complete, correct, and submit the form across input methods.</p>',
    'design-user-goals',
    'source-includes',
    'html',
  ],
  [
    'Record the unresolved assumption',
    '<p><strong>Assumption to test:</strong> Residents understand the difference between transport and delivery.</p>',
    'design-user-goals',
    'source-includes',
    'html',
  ],
  [
    'Separate the hero from the task body',
    '.survey-hero {\n  padding-block: 2rem;\n  border-block-end: 0.125rem solid #075985;\n}',
    'design-information-hierarchy',
  ],
  ['Constrain the primary heading measure', 'max-width: 22ch;', 'design-information-hierarchy'],
  ['Create secondary lead emphasis', '.survey-hero .lede {', 'design-information-hierarchy'],
  ['Distinguish the primary action', '.primary-action {', 'design-information-hierarchy'],
  [
    'Document structural and visual order agreement',
    '/* Visual hierarchy follows DOM and focus order. */',
    'design-information-hierarchy',
  ],
  [
    'Create consistent field rhythm',
    '.field-group + .field-group {\n  margin-block-start: 1.5rem;\n}',
    'design-spacing-alignment',
  ],
  [
    'Separate labels from controls consistently',
    'margin-block-start: 0.5rem;',
    'design-spacing-alignment',
  ],
  [
    'Keep help close to its control',
    '.field-help {\n  margin-block-start: 0.375rem;\n}',
    'design-spacing-alignment',
  ],
  [
    'Create larger section separation',
    '.survey-section + .survey-section {\n  margin-block-start: 3rem;\n}',
    'design-spacing-alignment',
  ],
  ['Use logical spacing properties', 'padding-inline: 1.5rem;', 'design-spacing-alignment'],
  ['Set a readable body rhythm', 'line-height: 1.6;', 'design-color-typography'],
  [
    'Constrain reading measure',
    '.survey-content {\n  max-width: 68ch;\n}',
    'design-color-typography',
  ],
  ['Keep supporting text readable', 'color: #334155;', 'design-color-typography'],
  [
    'Pair error color with a boundary cue',
    'border-inline-start: 0.25rem solid currentColor;',
    'design-color-typography',
  ],
  [
    'Preserve a resilient system font stack',
    'font-family: system-ui, sans-serif;',
    'design-color-typography',
  ],
  [
    'Style the primary action consistently',
    'background-color: #075985;',
    'design-consistency-feedback',
  ],
  [
    'Expose keyboard focus on primary actions',
    '.primary-action:focus-visible {',
    'design-consistency-feedback',
  ],
  ['Expose disabled action state', '.primary-action:disabled {', 'design-consistency-feedback'],
  ['Expose success with text and boundary', '.status-success {', 'design-consistency-feedback'],
  [
    'Document error recovery feedback',
    '/* Errors remain visible, named, associated, and recoverable. */',
    'design-consistency-feedback',
  ],
  [
    'Create the prototype report region',
    '<section id="prototype-report" aria-labelledby="prototype-report-heading">',
    'design-prototype-test',
    'source-includes',
    'html',
  ],
  [
    'Name the prototype report',
    '<h2 id="prototype-report-heading">Prototype test report</h2>',
    'design-prototype-test',
    'source-includes',
    'html',
  ],
  [
    'Record observed behavior',
    '<p><strong>Observed behavior:</strong> Participants paused before choosing a primary service.</p>',
    'design-prototype-test',
    'source-includes',
    'html',
  ],
  [
    'Record the evidence-based revision',
    '<p><strong>Revision:</strong> Clarify the service labels and test the changed choice order.</p>',
    'design-prototype-test',
    'source-includes',
    'html',
  ],
  [
    'Record remaining design risk',
    '<p><strong>Remaining risk:</strong> Translated service labels may change scan time and wrapping.</p>',
    'design-prototype-test',
    'source-includes',
    'html',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'design-for-developers',
  moduleId: 'user-centered-interface-design',
  title: 'User-Centered Interface Design',
  description:
    'Translate evidence into user goals, create structural and visual hierarchy, use spacing and alignment to explain relationships, choose readable color and typography, standardize feedback by purpose, and test assumptions at the cheapest useful prototype fidelity.',
  order: 9,
  objectives: [
    'Separate stakeholder requests, research evidence, assumptions, constraints, prioritized user tasks, and observable success.',
    'Create hierarchy and relationship cues whose visual, reading, and focus order agree.',
    'Build readable color, typography, state, and feedback systems that survive real content and access conditions.',
    'Choose prototype fidelity from risk and connect observed behavior to revisions and remaining uncertainty.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: ['css-backgrounds-borders', 'accessibility-test-strategy'],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'code', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'css-foundations-cascade-flow',
  priorLastActivityId: 'mapped-quiz-css-backgrounds-and-borders',
  insertAfterCompetencyId: 'css-backgrounds-borders',
  insertAfterModuleId: 'css-foundations-cascade-flow',
  estimatedHours: 860,
  milestones,
  mappedPlans,
  extraPlans,
  activityIds: [
    'user-goal-design-brief',
    'mapped-lecture-user-centered-design',
    'information-hierarchy-map',
    'spacing-alignment-audit',
    'readability-system-studio',
    'feedback-pattern-library',
    'prototype-test-evidence-loop',
    'mapped-lecture-user-interface-design-fundamentals',
    'mapped-lecture-common-design-tools',
    'design-for-developers-faded-build',
    'design-for-developers-transfer-lab',
    'mapped-review-design-fundamentals',
    'mapped-quiz-design-fundamentals',
  ],
});

console.log(
  `Generated User-Centered Design: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
