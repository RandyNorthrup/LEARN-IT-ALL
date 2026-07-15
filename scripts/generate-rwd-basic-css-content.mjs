import { generateRwdModule } from './lib/generate-rwd-module.mjs';

const cumulativeArtifactId = 'community-needs-survey';
const starterFiles = {
  html: '<!-- Continue the Community Needs Survey artifact and connect styles.css. -->',
  css: '/* Build the survey design system here. */',
  javascript: '',
};

const models = [
  {
    id: 'css-rules-syntax',
    activityId: 'css-parser-evidence-lab',
    title: 'Write and Diagnose CSS Rules',
    context: 'survey stylesheet parser investigation',
    concept:
      'A CSS rule combines a selector with a declaration block. Each declaration has a property and value. Comments document intent, and at-rules add conditional or structural instructions. Browsers normally discard an invalid declaration or rule and continue parsing later valid input, so DevTools source, parsed rules, warnings, and computed values reveal the actual failure boundary.',
    misconception: 'Browsers stop processing an entire stylesheet after one invalid declaration.',
    correct:
      'Locate the parsing boundary, inspect which declarations survive, repair the smallest syntax error, and confirm computed output.',
    distractors: [
      'Add semicolons between selectors because selectors are declarations.',
      'Rewrite the complete stylesheet whenever one property is crossed out in DevTools.',
    ],
    sequence: [
      'Identify the selector and intended property-value pair',
      'Inspect parsed rules and the first ignored token',
      'Repair delimiters property spelling or value grammar',
      'Confirm the declaration and computed value in the target state',
    ],
    terms: ['selector', 'property', 'value'],
    prerequisiteIds: ['accessibility-test-strategy'],
    stimulusKind: 'code-diff',
    requirements: [
      ['base-comment', '/* Community Needs Survey base styles */'],
      ['body-rule', 'body {\n  color: #1f2933;\n  background-color: #f7fafc;\n}'],
      ['heading-rule', 'h1, h2 {\n  line-height: 1.2;\n}'],
    ],
  },
  {
    id: 'css-application-methods',
    activityId: 'stylesheet-delivery-decision',
    title: 'Choose How Styles Reach the Document',
    context: 'multi-page survey stylesheet delivery review',
    concept:
      'External stylesheets provide reusable cacheable presentation across pages. Embedded style elements can support a narrowly scoped document or critical exception. Inline style attributes couple presentation to individual elements and create high-specificity maintenance costs. The choice depends on reuse, delivery, security policy, critical rendering, and ownership rather than convenience alone.',
    misconception: 'Inline styles are best for reusable design because they have high specificity.',
    correct:
      'Use a shared external stylesheet by default and document any embedded or inline exception from concrete delivery constraints.',
    distractors: [
      'Copy one style element into every page so each page owns an identical source of truth.',
      'Use inline declarations for all component states because selectors should never be reused.',
    ],
    sequence: [
      'Inventory reuse ownership performance and policy constraints',
      'Choose external embedded or inline delivery from those constraints',
      'Connect the stylesheet and confirm load order plus failure behavior',
      'Change one shared rule and verify every intended consumer without unintended reach',
    ],
    terms: ['external', 'reuse', 'maintenance'],
    prerequisiteIds: ['css-rules-syntax'],
    requirements: [
      [
        'external-stylesheet',
        '<link rel="stylesheet" href="styles.css">',
        'source-includes',
        'html',
      ],
      ['base-section', '/* 1. Base document styles */'],
      ['component-section', '/* 2. Survey component styles */'],
      ['utility-section', '/* 3. Bounded utility styles */'],
    ],
  },
  {
    id: 'css-type-class-id-selectors',
    activityId: 'selector-scope-workbench',
    title: 'Select by Stable Scope and Relationship',
    context: 'survey component selector architecture',
    concept:
      'Type selectors address element kinds, classes represent reusable component or state hooks, IDs target unique document identities, attributes match explicit data, and combinators express relationships. Good selectors use the least brittle scope that communicates ownership. More specificity is not inherently safer; it can make component states and overrides difficult to reason about.',
    misconception: 'More specific selectors are always safer and easier to maintain.',
    correct:
      'Choose selectors from stable component ownership and DOM relationships, then test intended matches and non-matches after content changes.',
    distractors: [
      'Encode the full ancestor chain in every selector so markup can never change silently.',
      'Use one global ID selector for every repeated field because IDs always win.',
    ],
    sequence: [
      'Identify the elements and states the rule should own',
      'Choose a stable type class attribute or relationship hook',
      'Inspect matched and accidentally matched nodes',
      'Change nesting or repeated content and verify selector scope remains correct',
    ],
    terms: ['selector', 'scope', 'specificity'],
    prerequisiteIds: ['css-application-methods'],
    requirements: [
      ['section-class', '.survey-section {\n  margin-block: 2rem;\n}'],
      ['direct-label', '.survey-section > label {\n  font-weight: 700;\n}'],
      [
        'required-attribute',
        '.survey-section input[required] {\n  border-inline-start-width: 0.35rem;\n}',
      ],
    ],
  },
  {
    id: 'css-cascade-origins-layers',
    activityId: 'cascade-trace-control-room',
    title: 'Trace Why a Declaration Wins',
    context: 'conflicting survey theme declaration trace',
    concept:
      'The cascade considers relevance, origin and importance, layer order, specificity, scope proximity, and source order. Specificity matters only among declarations still tied at earlier stages. Cascade layers make architectural precedence explicit, while low-specificity selectors such as :where() keep component rules easier to override. Important is an escalation tool, not a default fix.',
    misconception: 'Specificity alone determines every winning declaration.',
    correct:
      'Trace origin, importance, layer, specificity, scope, and order in sequence, then repair the earliest unintended winner.',
    distractors: [
      'Add !important repeatedly until the desired pixels appear.',
      'Move every rule to the end because layers and origins never affect precedence.',
    ],
    sequence: [
      'Collect every declaration targeting the property and state',
      'Eliminate irrelevant declarations and compare origin importance and layer',
      'Compare specificity scope proximity and source order only as needed',
      'Repair architectural precedence and confirm the computed-style trace',
    ],
    terms: ['cascade', 'layer', 'specificity'],
    prerequisiteIds: ['css-type-class-id-selectors'],
    requirements: [
      ['layer-order', '@layer reset, base, components, utilities;'],
      ['base-layer', '@layer base {'],
      ['component-layer', '@layer components {'],
      ['low-specificity-shell', ':where(.survey-shell) {\n  color: #1f2933;\n}'],
    ],
  },
  {
    id: 'css-inheritance-initial',
    activityId: 'inheritance-boundary-lab',
    title: 'Control Inheritance and Default Values',
    context: 'nested survey component theme boundary',
    concept:
      'Many text properties inherit; most box and layout properties do not. Initial selects a property’s specification-defined initial value, inherit explicitly copies the parent’s computed value, unset chooses inherit or initial according to the property, revert rolls back the current origin, and currentColor reuses the computed color. Deliberate boundaries reduce duplicated declarations and surprising leaks.',
    misconception: 'Every CSS property inherits from the parent by default.',
    correct:
      'Identify whether the property inherits, inspect computed parent and child values, and use inherit, initial, unset, revert, or currentColor intentionally.',
    distractors: [
      'Repeat every text declaration on every descendant to prevent inheritance.',
      'Use initial whenever a child should visually match its parent.',
    ],
    sequence: [
      'Name the property and expected parent-child relationship',
      'Check whether the property inherits and inspect computed values',
      'Choose natural inheritance or an explicit reset keyword',
      'Test nested components themes controls and changed content',
    ],
    terms: ['inheritance', 'initial', 'currentColor'],
    prerequisiteIds: ['css-cascade-origins-layers'],
    requirements: [
      [
        'document-typography',
        'body {\n  color: #1f2933;\n  font-family: system-ui, sans-serif;\n}',
      ],
      ['control-font', 'button, input, select, textarea {\n  font: inherit;\n}'],
      [
        'current-color-border',
        '.status-icon {\n  color: currentColor;\n  border: 0.125rem solid currentColor;\n}',
      ],
    ],
  },
  {
    id: 'css-box-model',
    activityId: 'box-dimension-forensics',
    title: 'Predict Real Box Dimensions',
    context: 'overflowing survey card dimension incident',
    concept:
      'Every box has content, padding, border, and margin. With content-box, declared width applies to content and padding plus border add to the outer size. With border-box, declared width includes content, padding, and border. Vertical margins between block boxes may collapse in normal flow, while padding and borders do not. DevTools box-model evidence should match a written calculation.',
    misconception: 'Declared width always equals the final border-box width.',
    correct:
      'State the sizing mode, calculate content padding border and margin, then compare the predicted and measured box.',
    distractors: [
      'Use negative margins whenever padding makes a box too large.',
      'Assume all adjacent margins add because margin collapse never occurs.',
    ],
    sequence: [
      'Record declared size sizing mode padding border and margins',
      'Calculate content and outer dimensions on each axis',
      'Inspect the rendered box model and overflow source',
      'Change one constraint and repeat the calculation at narrow width',
    ],
    terms: ['content', 'padding', 'border-box'],
    prerequisiteIds: ['css-inheritance-initial'],
    requirements: [
      ['global-box-sizing', '*, *::before, *::after {\n  box-sizing: border-box;\n}'],
      [
        'survey-shell-box',
        '.survey-shell {\n  width: min(100% - 2rem, 52rem);\n  margin-inline: auto;\n}',
      ],
      [
        'survey-card-box',
        '.survey-card {\n  padding: 1.5rem;\n  border: 0.125rem solid currentColor;\n  margin-block: 1.5rem;\n}',
      ],
    ],
  },
  {
    id: 'css-display-flow',
    activityId: 'formatting-context-decisions',
    title: 'Choose Display from Formatting Behavior',
    context: 'survey action and help-text flow repair',
    concept:
      'Block boxes participate in block flow, inline boxes flow inside lines, inline-block combines inline placement with box dimensions, and flow-root establishes a new block formatting context. Display none removes an element from layout and the accessibility tree. Display choice should follow formatting and access requirements, not a desire to make arbitrary elements behave like controls.',
    misconception:
      'Display none hides content visually while preserving it for assistive technology.',
    correct:
      'Choose block, inline, inline-block, flow-root, or none from layout participation and accessibility consequences, then inspect both trees.',
    distractors: [
      'Set every element to inline-block so normal document flow no longer matters.',
      'Use display contents on every wrapper because semantics always survive unchanged.',
    ],
    sequence: [
      'Identify line block containment and access-tree requirements',
      'Choose the formatting behavior that matches those relationships',
      'Inspect dimensions wrapping containment and exposed semantics',
      'Test hidden changed-content and narrow-width states',
    ],
    terms: ['display', 'flow', 'accessibility'],
    prerequisiteIds: ['css-box-model'],
    requirements: [
      ['section-flow-root', '.survey-section {\n  display: flow-root;\n}'],
      ['help-block', '.field-help {\n  display: block;\n}'],
      ['action-inline-block', '.survey-actions > button {\n  display: inline-block;\n}'],
      ['hidden-contract', '[hidden] {\n  display: none;\n}'],
    ],
  },
  {
    id: 'css-list-styling',
    activityId: 'list-marker-editor',
    title: 'Style Lists without Losing Structure',
    context: 'survey verification checklist redesign',
    concept:
      'List markers, position, spacing, and ::marker presentation can improve scanning while the ul, ol, and li structure preserves grouping and sequence. Removing markers can reduce visible affordance and may affect semantics in some browser and assistive-technology combinations, especially when list-like display is also removed. Test the structure instead of treating bullets as decoration alone.',
    misconception:
      'Removing bullets always removes list semantics from every browser and screen reader.',
    correct:
      'Preserve list markup, make grouping visually clear, and verify semantics plus marker alignment after styling.',
    distractors: [
      'Replace every list item with a paragraph and a manually typed bullet character.',
      'Use background images for essential sequence numbers because they align consistently.',
    ],
    sequence: [
      'Confirm whether order or grouping carries meaning',
      'Keep semantic list and item elements',
      'Adjust marker position type spacing and ::marker presentation',
      'Inspect wrapping zoom forced colors and announced list structure',
    ],
    terms: ['list', 'marker', 'structure'],
    prerequisiteIds: ['css-display-flow'],
    requirements: [
      [
        'verification-list',
        '.verification-list {\n  list-style-position: outside;\n  padding-inline-start: 1.5rem;\n}',
      ],
      [
        'verification-marker',
        '.verification-list li::marker {\n  color: #075985;\n  font-weight: 700;\n}',
      ],
      ['list-spacing', '.verification-list li + li {\n  margin-block-start: 0.75rem;\n}'],
    ],
  },
  {
    id: 'css-link-states',
    activityId: 'link-state-matrix',
    title: 'Design Every Link Interaction State',
    context: 'transcript and emergency-navigation state audit',
    concept:
      'Links must remain identifiable without color alone and expose meaningful link, visited, hover, focus-visible, and active states. LVHFA ordering can prevent broad state rules from unintentionally masking later interaction feedback. Hover cannot substitute for focus, visited styling has privacy restrictions, and removing underlines requires another durable non-color cue.',
    misconception: 'Hover is sufficient feedback because every device can emulate it.',
    correct:
      'Design default and visited identity plus distinct hover, focus-visible, and active feedback, then test keyboard, touch, pointer, and forced colors.',
    distractors: [
      'Remove every underline and rely on a small hue difference inside paragraphs.',
      'Make visited links identical to the page background so old destinations disappear.',
    ],
    sequence: [
      'Establish a durable default link affordance',
      'Add constrained visited feedback',
      'Design distinct hover focus-visible and active states',
      'Test keyboard pointer touch contrast and forced-color behavior',
    ],
    terms: ['link', 'focus-visible', 'hover'],
    prerequisiteIds: ['css-list-styling'],
    requirements: [
      ['default-link', 'a:link {\n  color: #075985;\n  text-decoration-thickness: 0.12em;\n}'],
      ['visited-link', 'a:visited {\n  color: #6b21a8;\n}'],
      [
        'focus-link',
        'a:focus-visible {\n  outline: 0.2rem solid #f59e0b;\n  outline-offset: 0.2rem;\n}',
      ],
      ['active-link', 'a:active {\n  text-decoration-thickness: 0.2em;\n}'],
    ],
  },
  {
    id: 'css-backgrounds-borders',
    activityId: 'decorative-layer-composer',
    title: 'Compose Decorative Layers Responsibly',
    context: 'heat-relief survey card visual system',
    concept:
      'Background color and images paint behind content; multiple layers, size, position, repeat, and gradients can create decoration. Borders define box edges; radii round corners; shadows suggest elevation. Decorative layers must preserve text contrast, forced-color resilience, reflow, and print behavior, and must never carry information that lacks an HTML equivalent.',
    misconception:
      'A background image communicates essential content as reliably as an img element.',
    correct:
      'Keep essential information in content, use backgrounds only as decoration, and test contrast plus fallback when images or effects disappear.',
    distractors: [
      'Place all status text inside a background image to prevent layout shifts.',
      'Use large blur shadows as the only boundary between controls and the page.',
    ],
    sequence: [
      'Separate essential information from decoration',
      'Choose color image gradient border radius and shadow layers',
      'Verify contrast fallback clipping and narrow-width behavior',
      'Disable images effects and colors and confirm the task still works',
    ],
    terms: ['background', 'border', 'decoration'],
    prerequisiteIds: ['css-link-states'],
    requirements: [
      ['page-background', 'body {\n  background-color: #f7fafc;\n}'],
      [
        'card-background',
        '.survey-card {\n  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);\n}',
      ],
      [
        'card-border',
        '.survey-card {\n  border: 0.125rem solid #075985;\n  border-radius: 0.75rem;\n}',
      ],
      ['bounded-shadow', '.survey-card {\n  box-shadow: 0 0.5rem 1.25rem rgb(15 23 42 / 0.12);\n}'],
    ],
  },
];

const basicFocus = models.slice(0, 7).map((model) => model.id);
const mappedPlans = {
  'mapped-lecture-what-is-css': {
    title: 'Trace CSS from Source to Computed Output',
    context: 'community survey stylesheet parsing and rendering trace',
    focus: ['css-rules-syntax'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-workshop-cafe-menu': {
    title: 'Workshop: Style a Heat-Relief Service Menu',
    context: 'hydration station services embedded in the community survey',
    focus: basicFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-business-card': {
    title: 'Lab: Build a Mobile Outreach Contact Card',
    context: 'changed outreach coordinator contact component',
    focus: [
      'css-application-methods',
      'css-type-class-id-selectors',
      'css-box-model',
      'css-display-flow',
    ],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lecture-css-specificity-the-cascade-algorithm-and-inheritance': {
    title: 'Trace Cascade and Inheritance Evidence',
    context: 'conflicting survey component theme investigation',
    focus: ['css-type-class-id-selectors', 'css-cascade-origins-layers', 'css-inheritance-initial'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-review-basic-css': {
    title: 'Retrieval Review: CSS Syntax, Scope, Cascade, and Flow',
    context: 'changed community survey base-style release',
    focus: basicFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-quiz-basic-css': {
    title: 'Mastery Exam: CSS Syntax, Scope, Cascade, and Flow',
    context: 'independent base-style release decision',
    focus: basicFocus,
    artifactId: cumulativeArtifactId,
  },
  'mapped-lecture-styling-lists-and-links': {
    title: 'Preserve Structure across Lists and Link States',
    context: 'survey checklist and transcript-navigation design review',
    focus: ['css-list-styling', 'css-link-states'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-stylized-to-do-list': {
    title: 'Lab: Style a Heat-Response Readiness Checklist',
    context: 'keyboard-visible neighborhood readiness task list',
    focus: ['css-display-flow', 'css-list-styling', 'css-link-states'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lecture-working-with-backgrounds-and-borders': {
    title: 'Separate Decorative Layers from Information',
    context: 'survey card background border and fallback review',
    focus: ['css-backgrounds-borders'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-lab-blog-post-card': {
    title: 'Lab: Build a Heat-Advisory Update Card',
    context: 'responsive advisory card visual-boundary incident',
    focus: ['css-box-model', 'css-link-states', 'css-backgrounds-borders'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-review-css-backgrounds-and-borders': {
    title: 'Retrieval Review: Lists, Links, Backgrounds, and Borders',
    context: 'changed public-service visual layer',
    focus: ['css-list-styling', 'css-link-states', 'css-backgrounds-borders'],
    artifactId: cumulativeArtifactId,
  },
  'mapped-quiz-css-backgrounds-and-borders': {
    title: 'Mastery Exam: Lists, Links, Backgrounds, and Borders',
    context: 'independent decorative-layer and state release',
    focus: ['css-list-styling', 'css-link-states', 'css-backgrounds-borders'],
    artifactId: cumulativeArtifactId,
  },
};

const milestones = [
  [
    'Create the base stylesheet comment',
    '/* Community Needs Survey base styles */',
    'css-rules-syntax',
  ],
  ['Set readable document text color', 'color: #1f2933;', 'css-rules-syntax'],
  ['Set a resilient page background', 'background-color: #f7fafc;', 'css-rules-syntax'],
  ['Control heading line height', 'h1, h2 {\n  line-height: 1.2;\n}', 'css-rules-syntax'],
  ['Document the component boundary', '/* Survey component boundary */', 'css-rules-syntax'],
  [
    'Connect the external stylesheet',
    '<link rel="stylesheet" href="styles.css">',
    'css-application-methods',
    'source-includes',
    'html',
  ],
  [
    'Create the base organization section',
    '/* 1. Base document styles */',
    'css-application-methods',
  ],
  [
    'Create the component organization section',
    '/* 2. Survey component styles */',
    'css-application-methods',
  ],
  [
    'Create the bounded utility section',
    '/* 3. Bounded utility styles */',
    'css-application-methods',
  ],
  [
    'Record the external ownership decision',
    '/* Shared external stylesheet for survey routes */',
    'css-application-methods',
  ],
  [
    'Scope repeated survey sections with a class',
    '.survey-section {',
    'css-type-class-id-selectors',
  ],
  ['Select only direct field labels', '.survey-section > label {', 'css-type-class-id-selectors'],
  [
    'Select required inputs by attribute',
    '.survey-section input[required] {',
    'css-type-class-id-selectors',
  ],
  ['Select the unique error summary', '#error-summary {', 'css-type-class-id-selectors'],
  [
    'Select adjacent verification items',
    '.verification-list li + li {',
    'css-type-class-id-selectors',
  ],
  [
    'Declare the layer architecture',
    '@layer reset, base, components, utilities;',
    'css-cascade-origins-layers',
  ],
  ['Open the base layer', '@layer base {', 'css-cascade-origins-layers'],
  ['Open the component layer', '@layer components {', 'css-cascade-origins-layers'],
  ['Keep shell specificity low', ':where(.survey-shell) {', 'css-cascade-origins-layers'],
  ['Open the bounded utility layer', '@layer utilities {', 'css-cascade-origins-layers'],
  [
    'Set inherited document typography',
    'font-family: system-ui, sans-serif;',
    'css-inheritance-initial',
  ],
  [
    'Make controls inherit font',
    'button, input, select, textarea {\n  font: inherit;\n}',
    'css-inheritance-initial',
  ],
  ['Reuse computed color for status icons', 'color: currentColor;', 'css-inheritance-initial'],
  [
    'Reuse current color for boundaries',
    'border: 0.125rem solid currentColor;',
    'css-inheritance-initial',
  ],
  [
    'Document an inheritance boundary',
    '/* Text inherits; component geometry stays local. */',
    'css-inheritance-initial',
  ],
  [
    'Use border-box globally',
    '*, *::before, *::after {\n  box-sizing: border-box;\n}',
    'css-box-model',
  ],
  ['Constrain the survey shell intrinsically', 'width: min(100% - 2rem, 52rem);', 'css-box-model'],
  ['Center the survey shell', 'margin-inline: auto;', 'css-box-model'],
  ['Add card padding', 'padding: 1.5rem;', 'css-box-model'],
  ['Add card block spacing', 'margin-block: 1.5rem;', 'css-box-model'],
  [
    'Create a section formatting context',
    '.survey-section {\n  display: flow-root;\n}',
    'css-display-flow',
  ],
  ['Expose help text as a block', '.field-help {\n  display: block;\n}', 'css-display-flow'],
  [
    'Keep action buttons inline-block',
    '.survey-actions > button {\n  display: inline-block;\n}',
    'css-display-flow',
  ],
  ['Define the hidden-state contract', '[hidden] {\n  display: none;\n}', 'css-display-flow'],
  [
    'Keep inline status text in the line box',
    '.survey-status {\n  display: inline;\n}',
    'css-display-flow',
  ],
  ['Align checklist markers outside content', 'list-style-position: outside;', 'css-list-styling'],
  ['Reserve marker indentation', 'padding-inline-start: 1.5rem;', 'css-list-styling'],
  ['Style checklist markers', '.verification-list li::marker {', 'css-list-styling'],
  [
    'Space adjacent checklist items',
    '.verification-list li + li {\n  margin-block-start: 0.75rem;\n}',
    'css-list-styling',
  ],
  [
    'Keep semantic list structure documented',
    '/* Preserve ul and li semantics while styling markers. */',
    'css-list-styling',
  ],
  ['Style the default link affordance', 'a:link {', 'css-link-states'],
  ['Style visited links within privacy limits', 'a:visited {', 'css-link-states'],
  [
    'Expose pointer hover feedback',
    'a:hover {\n  text-decoration-thickness: 0.2em;\n}',
    'css-link-states',
  ],
  ['Expose keyboard focus visibly', 'a:focus-visible {', 'css-link-states'],
  ['Expose active link feedback', 'a:active {', 'css-link-states'],
  [
    'Set the page background fallback',
    'body {\n  background-color: #f7fafc;\n}',
    'css-backgrounds-borders',
  ],
  [
    'Add a decorative card gradient',
    'background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);',
    'css-backgrounds-borders',
  ],
  ['Create a card boundary', 'border: 0.125rem solid #075985;', 'css-backgrounds-borders'],
  ['Round the card without clipping content', 'border-radius: 0.75rem;', 'css-backgrounds-borders'],
  [
    'Add a restrained decorative shadow',
    'box-shadow: 0 0.5rem 1.25rem rgb(15 23 42 / 0.12);',
    'css-backgrounds-borders',
  ],
];

const result = await generateRwdModule({
  courseId: 'responsive-web-design',
  blueprintModuleId: 'basic-css',
  moduleId: 'css-foundations-cascade-flow',
  title: 'CSS Syntax, Cascade, and Visual Foundations',
  description:
    'Move from parsed rules to maintainable external styles, stable selector scope, explicit cascade layers, deliberate inheritance, calculable boxes, meaningful formatting contexts, structured lists, complete link states, and responsible decorative layers.',
  order: 8,
  objectives: [
    'Write valid CSS and diagnose parse failures with source, rule, and computed-style evidence.',
    'Choose delivery and selector architecture for reuse without specificity escalation.',
    'Trace cascade, inheritance, box dimensions, and display behavior instead of styling by trial and error.',
    'Preserve list meaning, complete link feedback, contrast, and content equivalence while adding visual design.',
  ],
  competencyIds: models.map((model) => model.id),
  models,
  retainedCompetencyIds: [
    'accessibility-test-strategy',
    'keyboard-focus',
    'accessible-names-descriptions',
  ],
  cumulativeArtifactId,
  starterFiles,
  targetFile: 'css',
  workshopPattern: ['predict', 'code', 'inspect', 'code', 'debug', 'arrange', 'code', 'reflect'],
  prerequisiteModuleId: 'cumulative-html-review',
  priorLastActivityId: 'mapped-review-html',
  insertAfterCompetencyId: 'accessibility-test-strategy',
  insertAfterModuleId: 'cumulative-html-review',
  estimatedHours: 760,
  milestones,
  mappedPlans,
  activityIds: [
    'css-parser-evidence-lab',
    'mapped-lecture-what-is-css',
    'stylesheet-delivery-decision',
    'selector-scope-workbench',
    'cascade-trace-control-room',
    'inheritance-boundary-lab',
    'mapped-lecture-css-specificity-the-cascade-algorithm-and-inheritance',
    'box-dimension-forensics',
    'formatting-context-decisions',
    'mapped-workshop-cafe-menu',
    'mapped-lab-business-card',
    'mapped-review-basic-css',
    'mapped-quiz-basic-css',
    'list-marker-editor',
    'link-state-matrix',
    'mapped-lecture-styling-lists-and-links',
    'mapped-lab-stylized-to-do-list',
    'decorative-layer-composer',
    'mapped-lecture-working-with-backgrounds-and-borders',
    'mapped-lab-blog-post-card',
    'mapped-review-css-backgrounds-and-borders',
    'mapped-quiz-css-backgrounds-and-borders',
  ],
});

console.log(
  `Generated Basic CSS: ${result.competencies} competencies, ${result.activities} activities, ${result.interactions} interactions.`
);
