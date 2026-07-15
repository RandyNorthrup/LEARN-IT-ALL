import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'community-needs-survey';
const starterFiles = {
  html: '<!-- Continue the Community Needs Survey form interface here. -->',
  css: '/* Continue the resilient form design system here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-form-inheritance',
    activityId: 'form-control-normalization-lab',
    title: 'Normalize Controls without Erasing Their Contract',
    context: 'cross-browser survey control typography audit',
    concept:
      'Form controls do not inherit every typography and color property consistently across browsers. A bounded normalization can apply font, color, line height, and box sizing while preserving recognizable native affordances, platform states, and high-contrast behavior. Global appearance removal creates a full custom-control obligation.',
    misconception: 'Form controls inherit every font and color property automatically.',
    correct:
      'Inspect native computed styles, normalize only shared design-system properties, and retest every control type and state across browsers.',
    distractors: [
      'Apply appearance none to every input select and button before deciding how each control works.',
      'Copy the body font size onto each option because select descendants render identically everywhere.',
    ],
    sequence: [
      'Inventory control types browsers and native states',
      'Compare computed typography color sizing and appearance',
      'Apply a bounded shared normalization',
      'Retest recognition keyboard states zoom and forced colors',
    ],
    terms: ['inherit', 'native', 'control'],
    prerequisiteIds: ['form-native-validation', 'css-gradients'],
    requirements: [
      ['control-font', 'button, input, select, textarea {\n  font: inherit;\n}'],
      ['control-color', 'button, input, select, textarea {\n  color: inherit;\n}'],
      ['control-box-sizing', 'button, input, select, textarea {\n  box-sizing: border-box;\n}'],
    ],
  },
  {
    id: 'css-form-layout',
    activityId: 'form-reflow-target-studio',
    title: 'Lay Out Forms for Reading, Touch, and Reflow',
    context: 'narrow-width shelter intake layout review',
    concept:
      'Form layout keeps labels, controls, hints, errors, and actions in a predictable reading and focus sequence. Controls need generous target size, readable measure, wrapping labels, intrinsic widths, and block flow that survives zoom and translation. A compact desktop arrangement cannot simply be scaled down for touch.',
    misconception: 'A compact desktop form can be proportionally shrunk for touch screens.',
    correct:
      'Design from content order and target needs, use intrinsic block layout, and verify no horizontal scrolling at narrow width and zoom.',
    distractors: [
      'Place every label and control in one fixed-width line so the form stays visually compact.',
      'Use a transform scale on the entire form to create the mobile version.',
    ],
    sequence: [
      'Map label control guidance error and action order',
      'Set readable measures intrinsic widths and generous targets',
      'Allow text controls and groups to wrap without reordering',
      'Test touch keyboard zoom translation and narrow widths',
    ],
    terms: ['reflow', 'target', 'measure'],
    prerequisiteIds: ['css-form-inheritance'],
    requirements: [
      [
        'control-width',
        '.field-group :is(input, select, textarea) {\n  inline-size: 100%;\n  max-inline-size: 42rem;\n}',
      ],
      [
        'control-target',
        '.field-group :is(input, select, button) {\n  min-block-size: 2.75rem;\n}',
      ],
      ['label-layout', '.field-group > label {\n  display: block;\n  max-inline-size: 60ch;\n}'],
      ['form-rhythm', '.field-group + .field-group {\n  margin-block-start: 1.5rem;\n}'],
    ],
  },
  {
    id: 'css-form-focus',
    activityId: 'focus-survival-control-room',
    title: 'Make Focus Strong, Unclipped, and Mode-Resilient',
    context: 'survey focus indicator clipping incident',
    concept:
      ':focus-visible can expose strong keyboard focus without assuming focus came from one device. :focus-within can reinforce the active group. Indicators need sufficient contrast, thickness, offset, and space so overflow, borders, shadows, and adjacent content do not clip or obscure them. Forced colors may replace author colors, so system-color fallbacks matter.',
    misconception: 'Removing outlines is safe when hover styling exists.',
    correct:
      'Create a distinct focus-visible indicator, reserve unclipped space, reinforce groups carefully, and test keyboard plus forced-color paths.',
    distractors: [
      'Use a color-only background change under hover and focus because both states mean selection.',
      'Clip overflow on every field group so focus rings cannot change card dimensions.',
    ],
    sequence: [
      'Tab through every control and identify indicator loss or clipping',
      'Create a high-contrast focus-visible boundary and offset',
      'Add focus-within group context without hiding the control ring',
      'Test zoom overflow forced colors themes and validation states',
    ],
    terms: ['focus-visible', 'contrast', 'clipped'],
    prerequisiteIds: ['css-form-layout'],
    requirements: [
      [
        'control-focus',
        '.field-group :is(input, select, textarea, button):focus-visible {\n  outline: 0.2rem solid #b45309;\n  outline-offset: 0.2rem;\n}',
      ],
      ['group-focus', '.field-group:focus-within {\n  border-inline-start-color: #075985;\n}'],
      [
        'forced-focus',
        '@media (forced-colors: active) {\n  .field-group :focus-visible {\n    outline-color: Highlight;\n  }\n}',
      ],
    ],
  },
  {
    id: 'css-form-errors',
    activityId: 'multi-cue-form-state-system',
    title: 'Style Help, Error, Success, Required, and Disabled States',
    context: 'survey correction and status recovery audit',
    concept:
      'Form states need multiple coordinated cues: specific text, programmatic association, visible boundaries or icons, and color as reinforcement. Help is not an error, required is not invalid, disabled needs explanation, and success must not erase user context. Strong invalid styling should follow interaction or submission rather than blame an untouched form.',
    misconception: 'Red borders alone provide clear error recovery.',
    correct:
      'Give each state distinct text and semantics plus visual treatment, time it appropriately, and test correction and repeated submission.',
    distractors: [
      'Use the same red border for required help invalid and server status so all important states match.',
      'Reduce disabled control opacity until its label and value are no longer readable.',
    ],
    sequence: [
      'Inventory help required invalid success disabled and server states',
      'Write visible state text and programmatic connections',
      'Add boundary icon shape or weight cues with color reinforcement',
      'Test untouched failure correction retry success and forced colors',
    ],
    terms: ['error', 'text', 'recovery'],
    prerequisiteIds: ['css-form-focus'],
    requirements: [
      [
        'field-error',
        '.field-error {\n  color: #991b1b;\n  border-inline-start: 0.25rem solid currentColor;\n  font-weight: 700;\n}',
      ],
      [
        'invalid-control',
        '.field-group :user-invalid {\n  border-color: #b91c1c;\n  background-color: #fef2f2;\n}',
      ],
      [
        'success-state',
        '.form-success {\n  color: #14532d;\n  border-inline-start: 0.25rem solid currentColor;\n}',
      ],
      ['disabled-state', '.field-group :disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}'],
    ],
  },
  {
    id: 'css-form-native-custom',
    activityId: 'native-custom-control-decision',
    title: 'Keep Native Controls unless Custom Behavior Is Complete',
    context: 'checkbox and select customization architecture review',
    concept:
      'Native controls include semantics, keyboard interaction, form participation, validation, states, platform conventions, and forced-color behavior. Accent-color and bounded styling often provide enough design control. A custom pattern must retain or rebuild every behavior and keep the real input available to assistive technology without shrinking it to an unusable target.',
    misconception: 'Custom checkboxes need only a hidden native input and decorative box.',
    correct:
      'Start with the native control, use accent-color or bounded appearance changes, and customize only with complete semantic and behavioral evidence.',
    distractors: [
      'Set display none on the real checkbox and attach clicks to a decorative span.',
      'Replace select with a list of div elements because options are only visual rows.',
    ],
    sequence: [
      'List the native control behavior contract and design need',
      'Try accent color sizing and bounded native styling first',
      'If custom behavior remains implement semantics keyboard state and form participation',
      'Test zoom touch forced colors validation reset and submission',
    ],
    terms: ['native', 'keyboard', 'forced colors'],
    prerequisiteIds: ['css-form-errors'],
    requirements: [
      ['accent-color', '.option-row input {\n  accent-color: #075985;\n}'],
      ['native-select', '.field-group select {\n  appearance: auto;\n}'],
      ['checkbox-target', '.option-row {\n  min-block-size: 2.75rem;\n}'],
      [
        'visible-native-input',
        '.option-row input {\n  inline-size: 1.25rem;\n  block-size: 1.25rem;\n}',
      ],
    ],
  },
  {
    id: 'css-form-autofill-motion',
    activityId: 'browser-state-preference-lab',
    title: 'Respect Autofill, Placeholder, and Motion Preferences',
    context: 'completed-field readability and motion preference incident',
    concept:
      'Browsers expose autofill, placeholder, search decorations, and other platform-specific states differently. Styling must keep stored data readable and recognizable rather than fighting the browser. Placeholder remains supporting example text, not a label. Motion around focus, error, and success should be optional and disabled or reduced under prefers-reduced-motion.',
    misconception:
      'Autofill colors can be overridden without checking readability or user expectations.',
    correct:
      'Inspect browser states, preserve readable data and labels, keep overrides bounded, and remove nonessential transitions under reduced motion.',
    distractors: [
      'Make autofilled text transparent so browser highlight colors fit the theme.',
      'Animate every invalid field continuously because motion guarantees discovery.',
    ],
    sequence: [
      'Trigger empty placeholder autofill validation and completed states',
      'Inspect text background contrast labels and browser cues',
      'Apply only bounded readable overrides',
      'Enable reduced motion and verify focus error and success remain clear',
    ],
    terms: ['autofill', 'placeholder', 'reduced motion'],
    prerequisiteIds: ['css-form-native-custom'],
    requirements: [
      ['placeholder-style', '.field-group ::placeholder {\n  color: #475569;\n  opacity: 1;\n}'],
      ['autofill-text', '.field-group input:autofill {\n  -webkit-text-fill-color: #172033;\n}'],
      [
        'bounded-transition',
        '.field-group :is(input, select, textarea) {\n  transition: border-color 160ms ease, box-shadow 160ms ease;\n}',
      ],
      [
        'reduced-motion',
        '@media (prefers-reduced-motion: reduce) {\n  .field-group :is(input, select, textarea) {\n    transition: none;\n  }\n}',
      ],
    ],
  },
];

const allFocus = models.map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-best-practices-for-styling-forms': {
    title: 'Trace a Resilient Form Design System',
    context: 'community survey control-state and reflow evidence lab',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-registration-form': {
    title: 'Workshop: Build an Emergency Shelter Registration Form',
    context: 'multi-step shelter intake across touch keyboard and autofill',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-contact-form': {
    title: 'Lab: Repair a Relief-Coordinator Contact Form',
    context: 'unfamiliar focus reflow and error-recovery incident',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 12,
  },
  'mapped-workshop-game-settings-panel': {
    title: 'Workshop: Build Heat-Alert Notification Preferences',
    context: 'native checkbox radio and select preference panel',
    focus: [
      'css-form-layout',
      'css-form-focus',
      'css-form-native-custom',
      'css-form-autofill-motion',
    ],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-feature-selection': {
    title: 'Lab: Repair a Relief-Service Bundle Selector',
    context: 'unfamiliar selection state and forced-color incident',
    focus: ['css-form-focus', 'css-form-errors', 'css-form-native-custom'],
    artifactId: cumulativeArtifactId,
    targetSteps: 12,
  },
  'mapped-review-styling-forms': {
    title: 'Retrieval Review: Resilient Form Interface Design',
    context: 'changed browser state and input-mode constraints',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 20,
  },
  'mapped-quiz-styling-forms': {
    title: 'Mastery Exam: Resilient Form Interface Design',
    context: 'independent multi-browser form release decision',
    focus: allFocus,
    artifactId: cumulativeArtifactId,
    targetSteps: 30,
  },
};

const milestones = [
  ['Make controls inherit typography', 'font: inherit;', 'css-form-inheritance'],
  ['Make controls inherit text color', 'color: inherit;', 'css-form-inheritance'],
  ['Normalize control box sizing', 'box-sizing: border-box;', 'css-form-inheritance'],
  [
    'Document native-appearance boundary',
    '/* Preserve useful native appearance and platform states. */',
    'css-form-inheritance',
  ],
  ['Normalize control line height', 'line-height: 1.4;', 'css-form-inheritance'],
  ['Fill available field width intrinsically', 'inline-size: 100%;', 'css-form-layout'],
  ['Bound readable control width', 'max-inline-size: 42rem;', 'css-form-layout'],
  ['Create generous control targets', 'min-block-size: 2.75rem;', 'css-form-layout'],
  [
    'Keep labels in readable block flow',
    '.field-group > label {\n  display: block;',
    'css-form-layout',
  ],
  [
    'Create consistent field rhythm',
    '.field-group + .field-group {\n  margin-block-start: 1.5rem;',
    'css-form-layout',
  ],
  ['Create a strong focus-visible ring', 'outline: 0.2rem solid #b45309;', 'css-form-focus'],
  ['Offset focus from control borders', 'outline-offset: 0.2rem;', 'css-form-focus'],
  ['Reinforce the focused field group', '.field-group:focus-within {', 'css-form-focus'],
  ['Support forced-color focus', 'outline-color: Highlight;', 'css-form-focus'],
  [
    'Document unclipped focus requirement',
    '/* Focus indicators remain visible outside control borders. */',
    'css-form-focus',
  ],
  ['Create multi-cue error text', '.field-error {', 'css-form-errors'],
  ['Delay invalid styling until interaction', '.field-group :user-invalid {', 'css-form-errors'],
  ['Create multi-cue success feedback', '.form-success {', 'css-form-errors'],
  ['Keep disabled controls readable', 'opacity: 0.7;', 'css-form-errors'],
  [
    'Document correction-state retesting',
    '/* Test untouched, invalid, corrected, retry, and success states. */',
    'css-form-errors',
  ],
  ['Apply native accent color', 'accent-color: #075985;', 'css-form-native-custom'],
  ['Retain native select appearance', 'appearance: auto;', 'css-form-native-custom'],
  [
    'Create a generous option target',
    '.option-row {\n  min-block-size: 2.75rem;',
    'css-form-native-custom',
  ],
  [
    'Keep the real input visible',
    'inline-size: 1.25rem;\n  block-size: 1.25rem;',
    'css-form-native-custom',
  ],
  [
    'Document full custom-control obligation',
    '/* Custom controls require semantics, keyboard, state, form, zoom, and forced-color evidence. */',
    'css-form-native-custom',
  ],
  [
    'Keep placeholder examples readable',
    '.field-group ::placeholder {',
    'css-form-autofill-motion',
  ],
  [
    'Keep autofilled text readable',
    '-webkit-text-fill-color: #172033;',
    'css-form-autofill-motion',
  ],
  [
    'Bound control state transitions',
    'transition: border-color 160ms ease, box-shadow 160ms ease;',
    'css-form-autofill-motion',
  ],
  [
    'Detect reduced motion preference',
    '@media (prefers-reduced-motion: reduce) {',
    'css-form-autofill-motion',
  ],
  ['Remove nonessential control transitions', 'transition: none;', 'css-form-autofill-motion'],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'styling-forms',
  moduleId: 'resilient-form-interface-design',
  title: 'Resilient Form Interface Design',
  description:
    'Normalize controls without erasing native behavior, build readable reflowing layouts, preserve strong focus, communicate every state with multiple cues, choose native before custom, and respect browser autofill and motion preferences.',
  order: 13,
  objectives: [
    'Normalize typography, color, and sizing across form controls while preserving useful platform behavior.',
    'Lay out labels, controls, help, errors, and actions for touch, keyboard, zoom, narrow width, and translation.',
    'Build focus and state treatments that remain visible, recoverable, and understandable without color alone.',
    'Retain native controls unless a custom pattern has complete semantic, keyboard, state, form, zoom, and forced-color evidence.',
  ],
  competencyIds: allFocus,
  models,
  retainedCompetencyIds: ['form-native-validation', 'css-gradients', 'keyboard-focus'],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'answer', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'css-color-contrast-gradients',
  priorLastActivityId: 'mapped-quiz-css-colors',
  insertAfterCompetencyId: 'css-gradients',
  insertAfterModuleId: 'css-color-contrast-gradients',
  estimatedHours: 1350,
  milestones,
  mappedPlans,
  activityIds: [
    'form-control-normalization-lab',
    'form-reflow-target-studio',
    'focus-survival-control-room',
    'multi-cue-form-state-system',
    'native-custom-control-decision',
    'browser-state-preference-lab',
    'mapped-lecture-best-practices-for-styling-forms',
    'mapped-workshop-registration-form',
    'mapped-lab-contact-form',
    'mapped-workshop-game-settings-panel',
    'mapped-lab-feature-selection',
    'mapped-review-styling-forms',
    'mapped-quiz-styling-forms',
  ],
});

console.log(
  `Generated Resilient Form Styling: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
