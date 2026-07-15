import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const courseId = 'responsive-web-design';
const moduleId = 'semantic-html-relationships';
const outputRoot = path.join(process.cwd(), 'content', 'v2', 'courses', courseId);
const blueprint = JSON.parse(
  await readFile(path.join(process.cwd(), 'blueprints', 'responsive-web-design.json'), 'utf8')
);
const blueprintModule = blueprint.modules.find((entry) => entry.id === 'semantic-html');
if (!blueprintModule) throw new Error('The semantic-html blueprint module is missing.');

const competencyIds = [
  'semantic-landmarks',
  'semantic-heading-outline',
  'semantic-text-meaning',
  'semantic-time-address-quotes',
  'semantic-disclosure',
  'semantic-content-models',
  'semantic-native-first',
];
const competencies = competencyIds.map((competencyId) => {
  const competency = blueprint.competencies.find((entry) => entry.id === competencyId);
  if (!competency) throw new Error(`Missing competency ${competencyId}`);
  return competency;
});

const models = [
  {
    id: 'semantic-landmarks',
    activityId: 'landmark-route-audit',
    title: 'Give Every Major Region a Navigable Purpose',
    context: 'regional heat-response portal audit',
    concept:
      'Landmark elements identify major page regions by purpose. Header introduces a page or section; nav groups major navigation; main contains the unique primary content; aside is complementary; article can stand independently; section groups a named theme; and footer carries contextual closing information. A page normally exposes one main landmark and gives repeated navigation regions distinct names.',
    misconception:
      'Header, section, article, aside, and div are interchangeable boxes once CSS makes them look identical.',
    correct:
      'Choose each region from its content relationship and navigation purpose, then verify the resulting landmark map.',
    distractors: [
      'Use main for every visually large panel so assistive technology finds all important boxes.',
      'Wrap every paragraph in nav because users may want to reach it.',
    ],
    sequence: [
      'Inventory the page regions and their purposes',
      'Choose the narrowest native landmark relationship',
      'Name repeated landmarks when their purposes differ',
      'Inspect the landmark map and keyboard route',
    ],
    terms: ['landmark', 'main', 'purpose'],
    requirements: [
      ['page-header', '<header>'],
      ['primary-nav', '<nav aria-label="Primary">'],
      ['main-region', '<main id="main-content">'],
      ['page-footer', '<footer>'],
    ],
  },
  {
    id: 'semantic-heading-outline',
    activityId: 'heading-outline-control',
    title: 'Make the Page Outline Explain the Content',
    context: 'cooling-service directory outline review',
    concept:
      'A heading names the page or a section and its rank communicates nesting. One descriptive page heading usually anchors the outline; h2 headings name major sections; deeper ranks belong only beneath a real parent section. Rank is not a font-size choice, and a heading should not be empty or used merely as a visual label.',
    misconception:
      'Every section should restart at h1, and h6 is correct whenever the desired text looks small.',
    correct:
      'Derive heading rank from the content hierarchy, then read the outline without CSS to verify it.',
    distractors: [
      'Choose ranks by visual size and repair the hierarchy later with aria-level.',
      'Skip from h1 to h4 whenever intermediate default sizes are inconvenient.',
    ],
    sequence: [
      'Name the complete page topic',
      'Identify its major content sections',
      'Nest subsections beneath their actual parents',
      'Read the heading-only outline and correct broken relationships',
    ],
    terms: ['heading', 'hierarchy', 'section'],
    requirements: [
      ['page-heading', '<h1>Heat Relief Network</h1>'],
      ['services-heading', '<h2>Available services</h2>'],
      ['location-heading', '<h3>Downtown cooling center</h3>'],
    ],
  },
  {
    id: 'semantic-text-meaning',
    activityId: 'inline-meaning-editor',
    title: 'Encode Meaning inside Sentences',
    context: 'emergency advisory copy edit',
    concept:
      'Text-level elements communicate linguistic meaning. Strong marks importance, em adds stress emphasis, dfn identifies a defining instance, abbr can connect an abbreviation to its expansion, cite names a creative work, and code identifies computer-language text. Their default appearance is incidental and may change.',
    misconception:
      'Strong and em are merely longer spellings of bold and italic, so they can style any text without changing meaning.',
    correct:
      'Select inline elements from the meaning the sentence needs, and leave purely visual treatment to CSS.',
    distractors: [
      'Use strong for every heading because bold text is always more semantic.',
      'Use abbr around unfamiliar full words even when no abbreviation exists.',
    ],
    sequence: [
      'Read the sentence for importance, stress, definition, abbreviation, citation, or code',
      'Choose the text-level element matching that meaning',
      'Preserve readable wording when markup is removed',
      'Inspect the resulting semantics rather than default bold or italic pixels',
    ],
    terms: ['meaning', 'importance', 'emphasis'],
    requirements: [
      ['strong-warning', '<strong>Extreme heat warning</strong>'],
      ['emphasis', '<em>before noon</em>'],
      ['abbreviation', '<abbr title="Emergency Cooling Center">ECC</abbr>'],
      ['inline-code', '<code>heat-alert</code>'],
    ],
  },
  {
    id: 'semantic-time-address-quotes',
    activityId: 'source-date-contact-desk',
    title: 'Represent Dates, Contacts, and Quoted Sources',
    context: 'public advisory provenance desk',
    concept:
      'Time connects human-readable dates to machine-readable datetime values. Address contains contact information for the nearest article or page author or owner, not every location mentioned in prose. Blockquote and q identify quoted material, while cite identifies the source work or title rather than a person by default.',
    misconception:
      'Address is the correct wrapper for any street location, even when it is not contact information for the page or article.',
    correct:
      'Use time, address, quotation, and citation elements only when their defined relationship matches the content.',
    distractors: [
      'Put every date in a generic span because machines infer dates from visible punctuation.',
      'Use cite as a universal wrapper around the name of any quoted speaker.',
    ],
    sequence: [
      'Identify whether the content is a date, responsible contact, quotation, or source work',
      'Choose the element whose relationship matches that content',
      'Add machine-readable values or source references where supported',
      'Read the content and inspect the parsed relationship after markup',
    ],
    terms: ['datetime', 'contact', 'quotation'],
    requirements: [
      ['machine-date', '<time datetime="2026-07-15T10:00:00-07:00">'],
      ['owner-contact', '<address>'],
      ['quoted-advisory', '<blockquote cite="https://example.org/heat-guidance">'],
      ['source-title', '<cite>Regional Heat Safety Guide</cite>'],
    ],
  },
  {
    id: 'semantic-disclosure',
    activityId: 'native-disclosure-decision',
    title: 'Use Disclosure Only When the Task Fits',
    context: 'cooling-center question panel',
    concept:
      'Details and summary provide a native disclosure with keyboard and pointer behavior. They fit optional supporting information that can be independently expanded. They are not a replacement for navigation menus, modal dialogs, select inputs, or custom widgets with different state and focus requirements.',
    misconception:
      'Any control that opens hidden content should be implemented with details, including navigation and modal dialogs.',
    correct:
      'Choose details and summary only when a native disclosure matches the information task and expected focus behavior.',
    distractors: [
      'Build every disclosure from a clickable div so the native marker never appears.',
      'Place the summary after the hidden content so screen-reader users encounter the answer first.',
    ],
    sequence: [
      'Define the user task and the content being revealed',
      'Compare disclosure behavior with navigation, dialog, and selection patterns',
      'Use summary as the first child when disclosure is the correct pattern',
      'Test pointer, keyboard, open state, and content order',
    ],
    terms: ['details', 'summary', 'keyboard'],
    requirements: [
      ['details', '<details>'],
      ['summary', '<summary>What should I bring?</summary>'],
      ['disclosure-answer', '<p>Bring water and any required medication.</p>'],
    ],
  },
  {
    id: 'semantic-content-models',
    activityId: 'content-model-forensics',
    title: 'Verify Which Elements May Contain Which Children',
    context: 'invalid parent-child incident',
    concept:
      'HTML content models define what kinds of children and descendants an element may contain. Browsers may move or close invalid nodes during parsing, so the DOM can differ from source. Conformance validation plus source-to-DOM comparison reveals broken list, paragraph, interactive, and phrasing-content relationships.',
    misconception:
      'If invalid nesting produces the intended pixels, the parent-child relationship has no user or interoperability cost.',
    correct:
      'Check the element content model, validate the source, and compare the parsed DOM before accepting the nesting.',
    distractors: [
      'Indentation overrides the content model because it makes author intent obvious to the browser.',
      'Add role presentation to invalid children so the parser keeps them in place.',
    ],
    sequence: [
      'Identify the intended parent-child relationship',
      'Check the permitted content model for both elements',
      'Validate source and inspect parser recovery in the DOM',
      'Repair the earliest invalid relationship and rerun both checks',
    ],
    terms: ['content model', 'validator', 'DOM'],
    requirements: [
      ['list-parent', '<ul>'],
      ['list-child', '<li>Free water refill</li>'],
      ['paragraph-close', '</p>'],
    ],
  },
  {
    id: 'semantic-native-first',
    activityId: 'native-control-selection',
    title: 'Start with the Native Control Contract',
    context: 'service-status interaction review',
    concept:
      'Native elements provide semantics, focus behavior, keyboard interaction, form participation, states, and platform conventions together. A button is for an action, a link changes location, input controls collect values, progress reports completion, and details discloses optional information. Custom roles recreate only part of those contracts.',
    misconception:
      'A styled div with role button is more professional than button because native controls are too limited.',
    correct:
      'Start with the native element whose complete behavior matches the task, then style it without deleting its contract.',
    distractors: [
      'Use a link for every action because both links and buttons can receive click handlers.',
      'Replace native controls with generic elements first and add keyboard behavior only if a test fails.',
    ],
    sequence: [
      'Classify the task as navigation, action, input, progress, or disclosure',
      'Select the native element with the matching behavior contract',
      'Add only attributes and styling required by the design',
      'Verify names, states, focus, keyboard behavior, and fallback',
    ],
    terms: ['native', 'button', 'keyboard'],
    requirements: [
      ['native-button', '<button type="button">Check center status</button>'],
      ['native-progress', '<progress value="3" max="5">3 of 5</progress>'],
    ],
  },
];
const modelById = new Map(models.map((model) => [model.id, model]));
const starterFiles = {
  html: '<!-- Continue the Heat Relief Network artifact here. -->',
  css: '',
  javascript: '',
};

function makeBuilder(meta) {
  const steps = [];
  const checks = [];
  const codeCheckIds = [];
  const nextStepId = () => `${meta.id}-step-${String(steps.length + 1).padStart(2, '0')}`;
  const nextCheckId = (suffix) =>
    `${meta.id}-check-${String(checks.length + 1).padStart(2, '0')}-${suffix}`;
  const base = (title, interaction, instruction, competencyId) => ({
    id: nextStepId(),
    title: `${title.slice(0, 97 - meta.kind.length).trimEnd()} · ${meta.kind}`,
    interaction,
    instruction: `Checkpoint ${steps.length + 1}: ${instruction} Scenario: ${meta.context}.`,
    why: `${meta.title} keeps meaning testable instead of depending on appearance. This is checkpoint ${steps.length + 1} in ${meta.context}.`,
    buildsOnStepIds:
      steps.length === 0
        ? []
        : steps.length > 2
          ? [steps.at(-1).id, steps[0].id]
          : [steps.at(-1).id],
    content: [],
    checkIds: [],
    competencyIds: [competencyId],
    hints: [
      `${meta.title} checkpoint ${steps.length + 1}: name the content relationship before choosing markup.`,
      `${meta.title} checkpoint ${steps.length + 1}: compare source, parsed structure, and keyboard route.`,
      `${meta.title} checkpoint ${steps.length + 1}: choose the smallest native relationship that survives changed styling.`,
    ],
    xp: interaction === 'code' || interaction === 'debug' ? 14 : 10,
  });

  return {
    steps,
    checks,
    choice({ title, interaction, prompt, correct, distractors, competencyId, stimulus }) {
      const step = base(title, interaction, prompt, competencyId);
      const checkId = nextCheckId('choice');
      const prefix = `${meta.context.charAt(0).toUpperCase()}${meta.context.slice(1)} case ${steps.length + 1}`;
      const optionText = (text) => `${prefix}: ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
      step.options = [
        { id: `${step.id}-option-a`, text: optionText(distractors[0]) },
        { id: `${step.id}-option-b`, text: optionText(correct) },
        { id: `${step.id}-option-c`, text: optionText(distractors[1]) },
      ];
      step.checkIds = [checkId];
      step.content = [
        interaction === 'read'
          ? { type: 'paragraph', text: `${meta.explanation} Apply it to ${meta.context}.` }
          : {
              type: 'callout',
              tone: interaction === 'predict' ? 'question' : 'note',
              title: `${meta.context} evidence`,
              text: 'Choose the claim that preserves content meaning when visual styling and browser recovery are removed.',
            },
      ];
      if (stimulus) step.stimulus = stimulus;
      checks.push({
        id: checkId,
        type: 'choice-equals',
        description: `${title} follows the named semantic relationship.`,
        failureMessage: `Recheck purpose, native behavior, and parsed structure for ${title}.`,
        hidden: false,
        competencyIds: [competencyId],
        expectedOptionId: `${step.id}-option-b`,
      });
      steps.push(step);
    },
    order({ title, prompt, options, competencyId }) {
      const step = base(title, 'arrange', prompt, competencyId);
      const checkId = nextCheckId('order');
      step.options = options.map((text, index) => ({
        id: `${step.id}-event-${index + 1}`,
        text: `${meta.context} phase ${steps.length + 1}.${index + 1}: ${text.charAt(0).toLowerCase()}${text.slice(1)}`,
      }));
      step.checkIds = [checkId];
      step.content = [
        {
          type: 'paragraph',
          text: `Order the ${meta.context} work by evidence dependency, then test whether each phase enables the next.`,
        },
      ];
      checks.push({
        id: checkId,
        type: 'order-equals',
        description: `${title} preserves a defensible evidence order.`,
        failureMessage: `Find the first ${meta.context} phase whose required evidence does not yet exist.`,
        hidden: false,
        competencyIds: [competencyId],
        expectedOptionIds: step.options.map((option) => option.id),
      });
      steps.push(step);
    },
    reflect({ title, prompt, competencyId, terms }) {
      const step = base(title, 'reflect', prompt, competencyId);
      const checkId = nextCheckId('reflection');
      step.checkIds = [checkId];
      step.content = [
        {
          type: 'callout',
          tone: 'question',
          title: `${meta.context} case note`,
          text: 'Connect author intent to source, parsed structure, user behavior, and the final retest.',
        },
      ];
      checks.push({
        id: checkId,
        type: 'text-response',
        description: `${title} explains the semantic decision with evidence.`,
        failureMessage: `Use the required terms and connect at least one source fact to a user-facing consequence.`,
        hidden: false,
        competencyIds: [competencyId],
        minimumCharacters: 90,
        requiredTerms: terms,
      });
      steps.push(step);
    },
    code({ title, prompt, competencyId, requirements }) {
      const step = base(title, 'code', prompt, competencyId);
      for (const [name, expected] of requirements) {
        const checkId = nextCheckId(name);
        codeCheckIds.push(checkId);
        checks.push({
          id: checkId,
          type: 'source-includes',
          description: `${title} preserves the ${name.replaceAll('-', ' ')} relationship.`,
          failureMessage: `Restore the ${name.replaceAll('-', ' ')} relationship without deleting earlier valid semantics.`,
          hidden: false,
          competencyIds: [competencyId],
          file: 'html',
          expected,
        });
      }
      step.checkIds = [...codeCheckIds];
      step.targetFile = 'html';
      step.content = [
        {
          type: 'callout',
          tone: 'note',
          title: `Semantic build increment ${steps.length + 1}`,
          text: `Edit the current ${meta.context} artifact, preserve earlier checks, and verify source plus browser behavior.`,
        },
      ];
      steps.push(step);
    },
  };
}

function finalize(meta, builder) {
  return {
    schemaVersion: 2,
    id: meta.id,
    courseId,
    moduleId,
    kind: meta.kind,
    title: meta.title,
    summary: meta.summary,
    objectives: meta.objectives,
    competencyCoverage: meta.coverage,
    prerequisites: [],
    difficulty: meta.difficulty,
    estimatedMinutes: meta.estimatedMinutes,
    ...(meta.artifactId ? { artifactId: meta.artifactId, starterFiles: meta.starterFiles } : {}),
    steps: builder.steps,
    checks: builder.checks,
    mastery: {
      passingPercent: meta.kind === 'quiz' || meta.kind === 'review' ? 85 : 80,
      maxHintsForMastery: meta.kind === 'quiz' ? 0 : 5,
      spacedReviewDays: [1, 7, 21, 60],
    },
  };
}

const conceptPatterns = [
  ['predict', 'arrange', 'inspect', 'read', 'debug', 'answer', 'reflect', 'code'],
  ['predict', 'inspect', 'arrange', 'debug', 'read', 'answer', 'reflect', 'code'],
  ['inspect', 'predict', 'read', 'arrange', 'answer', 'debug', 'reflect', 'code'],
  ['predict', 'read', 'inspect', 'answer', 'arrange', 'debug', 'reflect', 'code'],
  ['inspect', 'arrange', 'predict', 'read', 'debug', 'answer', 'reflect', 'code'],
  ['predict', 'debug', 'inspect', 'arrange', 'read', 'answer', 'reflect', 'code'],
  ['arrange', 'predict', 'inspect', 'read', 'answer', 'debug', 'reflect', 'code'],
];

function conceptActivity(model, earlierIds, pattern) {
  const meta = {
    id: model.activityId,
    kind: 'theory',
    title: model.title,
    context: model.context,
    explanation: model.concept,
    summary: `Build and verify ${model.id.replaceAll('-', ' ')} in ${model.context} through prediction, parsed-structure inspection, explanation, cumulative code, and changed-case transfer.`,
    objectives: [
      `Explain ${model.id.replaceAll('-', ' ')} from purpose and parsed structure.`,
      `Apply ${model.id.replaceAll('-', ' ')} while retaining prior HTML requirements.`,
      `Diagnose the named misconception in a changed content and interaction scenario.`,
    ],
    coverage: {
      introduces: [model.id],
      reinforces: ['html-validation-tools', ...earlierIds],
      assesses: [model.id],
    },
    difficulty: earlierIds.length < 2 ? 'practice' : 'challenge',
    estimatedMinutes: 60,
    artifactId: 'heat-relief-information-hub',
    starterFiles,
  };
  const builder = makeBuilder(meta);
  for (const interaction of pattern) {
    if (interaction === 'code') {
      builder.code({
        title: `Build the ${model.context} semantic layer`,
        prompt: `Add the required ${model.id.replaceAll('-', ' ')} relationships to the existing Heat Relief Network artifact.`,
        competencyId: model.id,
        requirements: model.requirements,
      });
    } else if (interaction === 'arrange') {
      builder.order({
        title: `Sequence the ${model.context} decisions`,
        prompt: `Arrange the ${model.id.replaceAll('-', ' ')} workflow from intent to verification.`,
        options: model.sequence,
        competencyId: model.id,
      });
    } else if (interaction === 'reflect') {
      builder.reflect({
        title: `Defend the ${model.context} semantics`,
        prompt: `Explain why “${model.misconception}” fails and how the repaired relationship should be verified.`,
        competencyId: model.id,
        terms: model.terms,
      });
    } else {
      const correct =
        interaction === 'debug'
          ? `A plausible render is recovery evidence, not proof. ${model.correct}`
          : model.correct;
      builder.choice({
        title: `${interaction.charAt(0).toUpperCase()}${interaction.slice(1)} the ${model.context} relationship`,
        interaction,
        prompt: `Which claim preserves ${model.id.replaceAll('-', ' ')} when the styling and content change?`,
        correct,
        distractors:
          interaction === 'debug'
            ? [
                `Keep the defect because one browser recovered the ${model.context} source.`,
                `Replace all semantic elements with div elements before locating the failed relationship.`,
              ]
            : [model.misconception, model.distractors[interaction === 'answer' ? 1 : 0]],
        competencyId: model.id,
        ...(interaction === 'inspect'
          ? {
              stimulus: {
                kind: 'dom-tree',
                title: `${model.title} · parsed evidence`,
                caption: `Source intent and parsed-structure evidence from ${model.context}.`,
                lines: [
                  {
                    id: `${model.activityId}-source-risk`,
                    label: 'source claim',
                    text: model.misconception,
                    tone: 'problem',
                  },
                  {
                    id: `${model.activityId}-relationship`,
                    label: 'required relationship',
                    text: model.correct,
                    tone: 'focus',
                  },
                ],
              },
            }
          : {}),
      });
    }
  }
  return finalize(meta, builder);
}

const semanticMilestones = [
  ['Create the page banner', '<header>', 'semantic-landmarks'],
  ['Group primary navigation', '<nav aria-label="Primary">', 'semantic-landmarks'],
  ['Expose one main content region', '<main', 'semantic-landmarks'],
  ['Create an independently distributable article', '<article>', 'semantic-landmarks'],
  ['Name a thematic section', '<section', 'semantic-landmarks'],
  ['Add complementary context', '<aside', 'semantic-landmarks'],
  ['Close with page ownership context', '<footer>', 'semantic-landmarks'],
  ['Name the complete page', '<h1>', 'semantic-heading-outline'],
  ['Name a major section', '<h2>', 'semantic-heading-outline'],
  ['Name a nested subsection', '<h3>', 'semantic-heading-outline'],
  ['Mark an important warning', '<strong>', 'semantic-text-meaning'],
  ['Add stress emphasis', '<em>', 'semantic-text-meaning'],
  ['Expand an abbreviation', '<abbr title=', 'semantic-text-meaning'],
  ['Identify computer-language text', '<code>', 'semantic-text-meaning'],
  ['Publish a machine-readable date', '<time datetime=', 'semantic-time-address-quotes'],
  ['Identify the responsible contact', '<address>', 'semantic-time-address-quotes'],
  ['Mark a sourced quotation', '<blockquote cite=', 'semantic-time-address-quotes'],
  ['Identify the quoted work', '<cite>', 'semantic-time-address-quotes'],
  ['Create a native disclosure', '<details>', 'semantic-disclosure'],
  ['Give the disclosure its control text', '<summary>', 'semantic-disclosure'],
  ['Preserve list content models', '<li>', 'semantic-content-models'],
  ['Use a native action control', '<button type="button">', 'semantic-native-first'],
  ['Report completion natively', '<progress', 'semantic-native-first'],
];

const mappedPlans = {
  'mapped-lecture-importance-of-semantic-html': {
    title: 'Field Briefing: Semantics as Shared Infrastructure',
    context: 'cross-device meaning briefing',
    focus: ['semantic-landmarks'],
  },
  'mapped-lecture-understanding-nuanced-semantic-elements': {
    title: 'Field Briefing: Similar-Looking Elements, Different Contracts',
    context: 'nuanced element comparison',
    focus: ['semantic-text-meaning'],
  },
  'mapped-workshop-major-browsers-list': {
    title: 'Workshop: Publish a Browser-Support Field Guide',
    context: 'browser support guide build',
    focus: ['semantic-landmarks', 'semantic-heading-outline'],
    artifactId: 'browser-support-guide',
  },
  'mapped-lecture-working-with-text-and-time-semantic-elements': {
    title: 'Field Briefing: Meaning across Text, Dates, and Sources',
    context: 'text and provenance briefing',
    focus: ['semantic-text-meaning', 'semantic-time-address-quotes'],
  },
  'mapped-workshop-quincys-job-tips': {
    title: 'Workshop: Build a Fair-Work Resource Brief',
    context: 'fair-work resource build',
    focus: ['semantic-heading-outline', 'semantic-text-meaning', 'semantic-time-address-quotes'],
    artifactId: 'fair-work-resource-brief',
  },
  'mapped-lecture-working-with-specialized-semantic-elements': {
    title: 'Field Briefing: Native Disclosure and Specialized Relationships',
    context: 'specialized relationship briefing',
    focus: ['semantic-disclosure', 'semantic-content-models', 'semantic-native-first'],
  },
  'mapped-workshop-blog-page': {
    title: 'Workshop: Build a Community Reporting Desk',
    context: 'community reporting desk build',
    focus: competencyIds,
    artifactId: 'community-reporting-desk',
  },
  'mapped-lab-event-hub': {
    title: 'Lab: Deliver an Inclusive Neighborhood Event Hub',
    context: 'neighborhood event hub handoff',
    focus: [
      'semantic-landmarks',
      'semantic-heading-outline',
      'semantic-time-address-quotes',
      'semantic-native-first',
    ],
    artifactId: 'neighborhood-event-hub',
  },
  'mapped-review-semantic-html': {
    title: 'Cumulative Review: Repair a Meaning Map',
    context: 'semantic incident review',
    focus: competencyIds,
  },
  'mapped-quiz-semantic-html': {
    title: 'Readiness Exam: Semantic Relationships',
    context: 'semantic readiness exam',
    focus: competencyIds,
  },
};

function mappedMeta(id, kind, targetSteps, plan) {
  return {
    id,
    kind,
    title: plan.title,
    context: plan.context,
    explanation: plan.focus
      .map((id) => modelById.get(id)?.concept)
      .filter(Boolean)
      .join(' '),
    summary: `${plan.title} retrieves prior HTML skills in an original ${plan.context} scenario and requires source, parsed-structure, keyboard, and content evidence.`,
    objectives: [
      `Apply ${plan.focus.map((id) => id.replaceAll('-', ' ')).join(', ')} in unfamiliar content.`,
      `Produce or audit a real ${plan.context} artifact without appearance-only reasoning.`,
      'Keep earlier document requirements active while verifying native behavior and valid relationships.',
    ],
    coverage: { introduces: [], reinforces: [...plan.focus], assesses: [...plan.focus] },
    difficulty: kind === 'theory' ? 'practice' : kind === 'quiz' ? 'mastery' : 'challenge',
    estimatedMinutes: Math.max(35, targetSteps * (kind === 'workshop' ? 7 : 5)),
    artifactId: plan.artifactId,
    starterFiles,
  };
}

function theoryActivity(meta, model) {
  const builder = makeBuilder(meta);
  builder.choice({
    title: `Predict the ${meta.context} failure`,
    interaction: 'predict',
    prompt: 'Which claim should be tested before changing markup?',
    correct: model.correct,
    distractors: model.distractors,
    competencyId: model.id,
  });
  builder.order({
    title: `Sequence the ${meta.context} evidence`,
    prompt: 'Arrange purpose, markup, inspection, and retest.',
    options: model.sequence,
    competencyId: model.id,
  });
  builder.choice({
    title: `Inspect the ${meta.context} structure`,
    interaction: 'inspect',
    prompt: 'Which conclusion survives a source-to-structure comparison?',
    correct: model.correct,
    distractors: [model.misconception, model.distractors[1]],
    competencyId: model.id,
    stimulus: {
      kind: 'dom-tree',
      title: `${meta.title} · relationship trace`,
      caption: `A simplified source and structure trace from ${meta.context}.`,
      lines: [
        { id: `${meta.id}-trace-risk`, label: 'risk', text: model.misconception, tone: 'problem' },
        { id: `${meta.id}-trace-rule`, label: 'finding', text: model.correct, tone: 'focus' },
      ],
    },
  });
  builder.choice({
    title: `Read the ${meta.context} contract`,
    interaction: 'read',
    prompt: 'Which practice follows the explanation when styling changes?',
    correct: model.correct,
    distractors: [model.distractors[1], model.misconception],
    competencyId: model.id,
  });
  builder.choice({
    title: `Resolve the ${meta.context} misconception`,
    interaction: 'debug',
    prompt: 'Which repair reaches the semantic cause rather than its pixels?',
    correct: `The render is incomplete evidence. ${model.correct}`,
    distractors: [
      `Keep the ${meta.context} defect because it renders.`,
      `Replace all native semantics with generic boxes.`,
    ],
    competencyId: model.id,
  });
  builder.reflect({
    title: `Defend the ${meta.context} decision`,
    prompt: 'Explain purpose, parsed evidence, user consequence, and retest.',
    competencyId: model.id,
    terms: model.terms,
  });
  return finalize(meta, builder);
}

function planMilestones(plan) {
  const matches = semanticMilestones.filter((entry) => plan.focus.includes(entry[2]));
  if (matches.length === 0) throw new Error(`No semantic milestones cover ${plan.title}`);
  return matches;
}

function workshopActivity(meta, targetSteps, plan) {
  const builder = makeBuilder(meta);
  const milestones = planMilestones(plan);
  let milestoneIndex = 0;
  for (let index = 0; index < targetSteps; index += 1) {
    const model = modelById.get(plan.focus[index % plan.focus.length]);
    const cycle = index % 7;
    if (cycle === 2) {
      builder.choice({
        title: `Inspect ${meta.context} checkpoint ${index + 1}`,
        interaction: 'inspect',
        prompt: 'Which relationship is supported by the current source and parsed structure?',
        correct: model.correct,
        distractors: [model.misconception, model.distractors[1]],
        competencyId: model.id,
      });
    } else if (cycle === 4) {
      builder.choice({
        title: `Debug ${meta.context} checkpoint ${index + 1}`,
        interaction: 'debug',
        prompt: 'Which bounded repair preserves earlier meaning?',
        correct: model.correct,
        distractors: [
          `Ignore checkpoint ${index + 1} because it renders.`,
          `Delete the complete ${meta.context} artifact and restart.`,
        ],
        competencyId: model.id,
      });
    } else if (cycle === 6) {
      builder.order({
        title: `Rehearse ${meta.context} checkpoint ${index + 1}`,
        prompt: 'Put the verification cycle in dependency order.',
        options: model.sequence,
        competencyId: model.id,
      });
    } else {
      const [task, expected, competencyId] = milestones[milestoneIndex % milestones.length];
      milestoneIndex += 1;
      builder.code({
        title: `${task} · ${meta.context} checkpoint ${index + 1}`,
        prompt: `${task} in the existing artifact and rerun every accumulated check.`,
        competencyId,
        requirements: [[`increment-${index + 1}`, expected]],
      });
    }
  }
  return finalize(meta, builder);
}

function labActivity(meta, plan) {
  const builder = makeBuilder(meta);
  const milestones = planMilestones(plan);
  const first = modelById.get(plan.focus[0]);
  builder.choice({
    title: `Triage ${meta.context}`,
    interaction: 'predict',
    prompt: 'Which relationship should be tested first?',
    correct: first.correct,
    distractors: first.distractors,
    competencyId: first.id,
  });
  for (let index = 0; index < 3; index += 1) {
    const [task, expected, competencyId] = milestones[index % milestones.length];
    builder.code({
      title: `${task} · ${meta.context} repair ${index + 1}`,
      prompt: `Apply repair ${index + 1} and keep earlier checks active.`,
      competencyId,
      requirements: [[`repair-${index + 1}`, expected]],
    });
    if (index < 2) {
      const model = modelById.get(plan.focus[(index + 1) % plan.focus.length]);
      builder.choice({
        title: `Inspect ${meta.context} retest ${index + 1}`,
        interaction: index === 0 ? 'inspect' : 'debug',
        prompt: 'Which conclusion reaches the remaining semantic cause?',
        correct: model.correct,
        distractors: [model.misconception, model.distractors[1]],
        competencyId: model.id,
      });
    }
  }
  builder.order({
    title: `Reconstruct ${meta.context} root cause`,
    prompt: 'Arrange the incident workflow.',
    options: first.sequence,
    competencyId: first.id,
  });
  builder.reflect({
    title: `Defend the ${meta.context} handoff`,
    prompt: 'Explain purpose, source evidence, user behavior, and final retest.',
    competencyId: first.id,
    terms: first.terms,
  });
  return finalize(meta, builder);
}

function assessmentActivity(meta, targetSteps, plan) {
  const builder = makeBuilder(meta);
  for (let index = 0; index < targetSteps; index += 1) {
    const model = modelById.get(plan.focus[index % plan.focus.length]);
    if (index % 5 === 1) {
      builder.order({
        title: `Sequence ${index + 1}: ${model.context}`,
        prompt: 'Reconstruct the semantic verification workflow.',
        options: model.sequence,
        competencyId: model.id,
      });
    } else if (index % 5 === 3 && meta.kind === 'review') {
      builder.reflect({
        title: `Case note ${index + 1}: ${model.context}`,
        prompt: 'Explain purpose, failed relationship, consequence, and retest.',
        competencyId: model.id,
        terms: model.terms,
      });
    } else {
      const interaction = index % 5 === 0 ? 'predict' : index % 5 === 2 ? 'inspect' : 'answer';
      builder.choice({
        title: `${interaction} ${index + 1}: ${model.context}`,
        interaction,
        prompt: 'Which claim preserves meaning in the changed case?',
        correct: model.correct,
        distractors: [model.misconception, model.distractors[index % 2]],
        competencyId: model.id,
      });
    }
  }
  return finalize(meta, builder);
}

const concepts = new Map();
const introduced = [];
models.forEach((model, index) => {
  concepts.set(model.activityId, conceptActivity(model, [...introduced], conceptPatterns[index]));
  introduced.push(model.id);
});

const mappedBlueprintById = new Map(
  blueprintModule.activities
    .filter((activity) => activity.reference)
    .map((activity) => [activity.id, activity])
);
const mapped = new Map();
for (const [id, plan] of Object.entries(mappedPlans)) {
  const blueprintActivity = mappedBlueprintById.get(id);
  if (!blueprintActivity) throw new Error(`Mapped blueprint activity ${id} is missing.`);
  const minimum =
    { theory: 6, workshop: 8, lab: 8, review: 14, quiz: 20 }[blueprintActivity.kind] ?? 8;
  const targetSteps = Math.max(minimum, blueprintActivity.reference.upstreamChallengeCount);
  const meta = mappedMeta(id, blueprintActivity.kind, targetSteps, plan);
  const activity =
    blueprintActivity.kind === 'theory'
      ? theoryActivity(meta, modelById.get(plan.focus[0]))
      : blueprintActivity.kind === 'workshop'
        ? workshopActivity(meta, targetSteps, plan)
        : blueprintActivity.kind === 'lab'
          ? labActivity(meta, plan)
          : assessmentActivity(meta, targetSteps, plan);
  mapped.set(id, activity);
}

const activityIds = [
  'landmark-route-audit',
  'mapped-lecture-importance-of-semantic-html',
  'heading-outline-control',
  'mapped-workshop-major-browsers-list',
  'inline-meaning-editor',
  'mapped-lecture-understanding-nuanced-semantic-elements',
  'source-date-contact-desk',
  'mapped-lecture-working-with-text-and-time-semantic-elements',
  'mapped-workshop-quincys-job-tips',
  'native-disclosure-decision',
  'content-model-forensics',
  'native-control-selection',
  'mapped-lecture-working-with-specialized-semantic-elements',
  'mapped-workshop-blog-page',
  'mapped-lab-event-hub',
  'mapped-review-semantic-html',
  'mapped-quiz-semantic-html',
];
const activities = activityIds.map((activityId) => {
  const activity = concepts.get(activityId) ?? mapped.get(activityId);
  if (!activity) throw new Error(`Missing semantic activity ${activityId}`);
  return activity;
});
activities.forEach((activity, index) => {
  activity.prerequisites = [index === 0 ? 'mapped-quiz-basic-html' : activities[index - 1].id];
});

const module = {
  schemaVersion: 2,
  id: moduleId,
  courseId,
  title: 'Semantic HTML and Content Relationships',
  description:
    'Turn valid tags into a durable meaning system: landmarks, outlines, text semantics, dates and sources, native disclosure, content models, and native-first interaction decisions.',
  order: 3,
  objectives: [
    'Choose landmark and heading structures from content relationships and verify the resulting navigation map.',
    'Encode text, dates, contacts, quotations, and sources so their meaning survives presentation changes.',
    'Evaluate content models and browser recovery with validation plus source-to-DOM evidence.',
    'Prefer complete native behavior contracts before adding roles, scripts, or custom controls.',
  ],
  competencyIds,
  prerequisites: ['documents-content-media'],
  activityIds,
};

const coursePath = path.join(outputRoot, 'course.json');
const course = JSON.parse(await readFile(coursePath, 'utf8'));
const semanticIdSet = new Set(competencyIds);
const retainedCompetencies = course.competencies.filter(
  (competency) => !semanticIdSet.has(competency.id)
);
const htmlBoundary = retainedCompetencies.findIndex(
  (competency) => competency.id === 'html-validation-tools'
);
retainedCompetencies.splice(htmlBoundary + 1, 0, ...competencies);
course.competencies = retainedCompetencies;
const htmlModuleIndex = course.moduleIds.indexOf('documents-content-media');
course.moduleIds = course.moduleIds.filter((existingId) => existingId !== moduleId);
course.moduleIds.splice(htmlModuleIndex + 1, 0, moduleId);
course.estimatedHours = Math.max(course.estimatedHours, 5.2);

await mkdir(path.join(outputRoot, 'activities'), { recursive: true });
await mkdir(path.join(outputRoot, 'modules'), { recursive: true });
await writeFile(coursePath, `${JSON.stringify(course, null, 2)}\n`);
await writeFile(
  path.join(outputRoot, 'modules', `${moduleId}.json`),
  `${JSON.stringify(module, null, 2)}\n`
);
for (const activity of activities) {
  await writeFile(
    path.join(outputRoot, 'activities', `${activity.id}.json`),
    `${JSON.stringify(activity, null, 2)}\n`
  );
}

const interactionCount = activities.reduce((total, activity) => total + activity.steps.length, 0);
console.log(
  `Wrote ${activities.length} semantic HTML activities with ${interactionCount} cumulative interactions across ${competencyIds.length} competencies.`
);
