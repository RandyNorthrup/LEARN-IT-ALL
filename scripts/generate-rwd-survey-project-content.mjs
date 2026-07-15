import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const courseId = 'responsive-web-design';
const moduleId = 'community-needs-survey-project';
const activityId = 'mapped-lab-survey-form';
const artifactId = 'community-needs-survey';
const outputRoot = path.join(process.cwd(), 'content', 'v2', 'courses', courseId);
const coverage = [
  'form-purpose-method',
  'form-labels-instructions',
  'form-input-types',
  'form-grouping-options',
  'form-native-validation',
  'semantic-landmarks',
  'form-table-testing',
];

const milestones = [
  {
    phase: 'Discovery',
    title: 'Create a standards-mode document shell',
    instruction:
      'Create the project document, declare English, and name the page for browser history and tabs.',
    competencyId: 'semantic-landmarks',
    correct: 'Start with a valid document contract before adding visible survey regions.',
    misconception:
      'A fragment beginning with a form is equivalent because browsers repair the missing document shell.',
    terms: ['document', 'language', 'title'],
    requirements: [
      ['doctype', '<!doctype html>'],
      ['document-language', '<html lang="en">'],
      ['document-title', '<title>Community Heat-Relief Needs Survey</title>'],
    ],
  },
  {
    phase: 'Discovery',
    title: 'Establish the unique main landmark',
    instruction: 'Add a skip destination and one main region for the survey task.',
    competencyId: 'semantic-landmarks',
    correct:
      'A skip link and one named main destination expose the primary task without depending on layout.',
    misconception:
      'A visually centered div creates the same navigation affordance as a main landmark.',
    terms: ['skip', 'main', 'focus'],
    requirements: [
      ['skip-link', '<a href="#main-content">Skip to survey</a>'],
      ['main-landmark', '<main id="main-content">'],
    ],
  },
  {
    phase: 'Discovery',
    title: 'Name and explain the survey',
    instruction:
      'Add the required project heading and a concise explanation of who uses the answers.',
    competencyId: 'semantic-landmarks',
    correct: 'A specific h1 and adjacent description make purpose clear before the first control.',
    misconception:
      'Placeholder text in the first input can carry the page title and survey purpose.',
    terms: ['heading', 'purpose', 'description'],
    requirements: [
      ['survey-title', '<h1 id="title">Community Heat-Relief Needs Survey</h1>'],
      [
        'survey-description',
        '<p id="description">Tell the neighborhood response team which heat-relief services are needed.</p>',
      ],
    ],
  },
  {
    phase: 'Contract',
    title: 'Define the submission contract',
    instruction:
      'Create the survey form with a state-changing destination and connect its overall description.',
    competencyId: 'form-purpose-method',
    correct:
      'POST to a named receiving resource and stable control names create an inspectable submission contract.',
    misconception:
      'A submit button alone decides where values go and whether they appear in the URL.',
    terms: ['action', 'post', 'payload'],
    requirements: [
      [
        'survey-form',
        '<form id="survey-form" action="/community-needs" method="post" aria-describedby="description">',
      ],
    ],
  },
  {
    phase: 'Contract',
    title: 'Give the resident name a persistent label',
    instruction: 'Add a visible label and a uniquely identified name control.',
    competencyId: 'form-labels-instructions',
    correct: 'Matching for and id values provide a persistent name and enlarge the pointer target.',
    misconception: 'The word Name inside a placeholder remains available after the resident types.',
    terms: ['label', 'for', 'id'],
    requirements: [
      ['name-label', '<label id="name-label" for="name">Name</label>'],
      ['name-input', '<input id="name" name="residentName" type="text"'],
    ],
  },
  {
    phase: 'Contract',
    title: 'Connect name guidance',
    instruction: 'Publish durable name guidance and connect it to the control description.',
    competencyId: 'form-labels-instructions',
    correct: 'Visible help plus aria-describedby supplements the label without replacing it.',
    misconception:
      'A title tooltip is guaranteed to remain visible and be announced on every device.',
    terms: ['guidance', 'description', 'visible'],
    requirements: [
      ['name-help', '<p id="name-help">Enter the name the response team should use.</p>'],
      ['name-description', 'aria-describedby="name-help"'],
    ],
  },
  {
    phase: 'Contract',
    title: 'Collect a contact email by purpose',
    instruction: 'Add the certification-project email label and purpose-specific control.',
    competencyId: 'form-input-types',
    correct:
      'Type email and autocomplete email expose truthful purpose, keyboard, and basic format behavior.',
    misconception: 'Type text is preferable because email changes only the border style.',
    terms: ['email', 'autocomplete', 'keyboard'],
    requirements: [
      ['email-label', '<label id="email-label" for="email">Email</label>'],
      ['email-input', '<input id="email" name="email" type="email" autocomplete="email"'],
    ],
  },
  {
    phase: 'Contract',
    title: 'Collect age within an honest range',
    instruction: 'Add an optional age field with numeric purpose and realistic service bounds.',
    competencyId: 'form-input-types',
    correct:
      'A bounded number input fits count-like age data while the label explains that disclosure is optional.',
    misconception: 'Telephone input is correct for age because both may open a numeric keyboard.',
    terms: ['number', 'minimum', 'maximum'],
    requirements: [
      ['age-label', '<label id="number-label" for="number">Age (optional)</label>'],
      ['age-input', '<input id="number" name="age" type="number" min="13" max="120"'],
    ],
  },
  {
    phase: 'Build',
    title: 'Group the primary service choice',
    instruction: 'Create a fieldset and legend for one mutually exclusive requested service.',
    competencyId: 'form-grouping-options',
    correct: 'Fieldset and legend announce the shared question before individual radio labels.',
    misconception: 'A bold paragraph above nearby radios creates the same group relationship.',
    terms: ['fieldset', 'legend', 'group'],
    requirements: [
      ['service-fieldset', '<fieldset id="service-group">'],
      ['service-legend', '<legend>Which service is most urgent?</legend>'],
    ],
  },
  {
    phase: 'Build',
    title: 'Implement one exclusive radio set',
    instruction:
      'Add cooling-center, transport, and water-delivery options under one submitted name.',
    competencyId: 'form-grouping-options',
    correct: 'Radios with one shared name preserve mutual exclusion and submit the selected value.',
    misconception: 'Each radio needs a different name so its label remains unique.',
    terms: ['radio', 'name', 'exclusive'],
    requirements: [
      [
        'cooling-radio',
        '<input id="service-cooling" name="primaryService" type="radio" value="cooling-center"',
      ],
      [
        'transport-radio',
        '<input id="service-transport" name="primaryService" type="radio" value="transport"',
      ],
      [
        'water-radio',
        '<input id="service-water" name="primaryService" type="radio" value="water-delivery"',
      ],
    ],
  },
  {
    phase: 'Build',
    title: 'Group independent support needs',
    instruction: 'Create a second fieldset for support needs that may be selected together.',
    competencyId: 'form-grouping-options',
    correct:
      'A distinct fieldset separates an independent multi-select question from the exclusive service question.',
    misconception: 'All options belong in one fieldset because they appear on one page.',
    terms: ['independent', 'fieldset', 'question'],
    requirements: [
      ['needs-fieldset', '<fieldset id="support-needs-group">'],
      ['needs-legend', '<legend>Which additional supports would help?</legend>'],
    ],
  },
  {
    phase: 'Build',
    title: 'Implement independent checkboxes',
    instruction: 'Add language, mobility, and caregiver-support checkboxes with submitted values.',
    competencyId: 'form-grouping-options',
    correct:
      'Checkboxes allow zero, one, or several independent needs and preserve each selected value.',
    misconception: 'Radios are better because every question should permit exactly one response.',
    terms: ['checkbox', 'multiple', 'value'],
    requirements: [
      [
        'language-checkbox',
        '<input id="need-language" name="supportNeeds" type="checkbox" value="language"',
      ],
      [
        'mobility-checkbox',
        '<input id="need-mobility" name="supportNeeds" type="checkbox" value="mobility"',
      ],
      [
        'caregiver-checkbox',
        '<input id="need-caregiver" name="supportNeeds" type="checkbox" value="caregiver"',
      ],
    ],
  },
  {
    phase: 'Build',
    title: 'Add a bounded neighborhood selector',
    instruction: 'Add a visible label and select control for the service area.',
    competencyId: 'form-grouping-options',
    correct:
      'A native select fits a known bounded service-area list and retains keyboard behavior.',
    misconception:
      'A row of clickable div elements submits values and keyboard behavior automatically.',
    terms: ['select', 'label', 'bounded'],
    requirements: [
      ['area-label', '<label for="dropdown">Service area</label>'],
      ['area-select', '<select id="dropdown" name="serviceArea">'],
    ],
  },
  {
    phase: 'Build',
    title: 'Provide an unselected prompt and real options',
    instruction: 'Add a disabled prompt followed by three service-area values.',
    competencyId: 'form-grouping-options',
    correct:
      'An empty disabled prompt avoids silently submitting the first real area before a deliberate choice.',
    misconception:
      'The first real neighborhood should be preselected even when no default is valid.',
    terms: ['option', 'value', 'default'],
    requirements: [
      ['area-prompt', '<option value="" selected disabled>Choose a service area</option>'],
      ['north-option', '<option value="north">North district</option>'],
      ['central-option', '<option value="central">Central district</option>'],
      ['south-option', '<option value="south">South district</option>'],
    ],
  },
  {
    phase: 'Build',
    title: 'Collect detailed context',
    instruction:
      'Add a labeled textarea for constraints or details that fixed choices cannot express.',
    competencyId: 'form-labels-instructions',
    correct:
      'A labeled textarea supports open context while length guidance sets a predictable expectation.',
    misconception: 'A one-line text input is always equivalent because CSS can make it taller.',
    terms: ['textarea', 'label', 'guidance'],
    requirements: [
      ['details-label', '<label for="details">Details or access needs</label>'],
      [
        'details-textarea',
        '<textarea id="details" name="details" rows="6" maxlength="600" aria-describedby="details-help"></textarea>',
      ],
      [
        'details-help',
        '<p id="details-help">Use up to 600 characters. Do not include medical record numbers.</p>',
      ],
    ],
  },
  {
    phase: 'Constraints',
    title: 'Require only operationally necessary data',
    instruction:
      'Require name, email, primary service, and service area while leaving age and details optional.',
    competencyId: 'form-native-validation',
    correct: 'Required belongs only on fields the response workflow cannot complete without.',
    misconception:
      'Every field should be required because more collected data always improves service.',
    terms: ['required', 'necessary', 'optional'],
    requirements: [
      ['required-name', 'id="name" name="residentName" type="text" required'],
      ['required-email', 'id="email" name="email" type="email" autocomplete="email" required'],
      ['required-service', 'name="primaryService" type="radio" value="cooling-center" required'],
      ['required-area', '<select id="dropdown" name="serviceArea" required>'],
    ],
  },
  {
    phase: 'Constraints',
    title: 'Set inclusive text constraints',
    instruction:
      'Add an inclusive minimum to the resident name and preserve the existing message limit.',
    competencyId: 'form-native-validation',
    correct:
      'Small truthful length bounds help catch omission without inventing hostile name rules.',
    misconception: 'A letters-only regular expression safely validates names for every resident.',
    terms: ['minlength', 'inclusive', 'constraint'],
    requirements: [
      ['name-minimum', 'name="residentName" type="text" required minlength="2"'],
      ['details-maximum', 'name="details" rows="6" maxlength="600"'],
    ],
  },
  {
    phase: 'Constraints',
    title: 'Expose a native submit action',
    instruction: 'Add the required project submit button with an action-specific label.',
    competencyId: 'form-purpose-method',
    correct:
      'A native submit button participates in form validation, keyboard activation, and payload submission.',
    misconception:
      'A clickable paragraph is preferable because every element can submit a form without scripting.',
    terms: ['button', 'submit', 'validation'],
    requirements: [
      ['submit-button', '<button id="submit" type="submit">Send community needs survey</button>'],
    ],
  },
  {
    phase: 'Recovery',
    title: 'Reserve a named status region',
    instruction: 'Add an initially empty output for submission progress or confirmation messages.',
    competencyId: 'form-table-testing',
    correct:
      'A named output can receive concise status text without moving focus or replacing visible errors.',
    misconception:
      'All confirmation can be shown only through color because successful users can infer green.',
    terms: ['status', 'output', 'message'],
    requirements: [
      ['status-label', '<span id="survey-status-label">Survey status</span>'],
      [
        'status-output',
        '<output id="survey-status" aria-labelledby="survey-status-label"></output>',
      ],
    ],
  },
  {
    phase: 'Recovery',
    title: 'Publish a privacy boundary',
    instruction: 'Add a visible note explaining data use and connect it to the form.',
    competencyId: 'form-labels-instructions',
    correct:
      'A visible privacy note before submission makes the data-use constraint available to every input method.',
    misconception:
      'Privacy information may remain in a hover tooltip because every user can hover.',
    terms: ['privacy', 'visible', 'description'],
    requirements: [
      [
        'privacy-note',
        '<p id="privacy-note">Responses are used only to coordinate neighborhood heat-relief services.</p>',
      ],
      ['privacy-connection', 'aria-describedby="description privacy-note"'],
    ],
  },
  {
    phase: 'Verification',
    title: 'Create a release evidence record',
    instruction: 'Add a named section containing the project verification checklist.',
    competencyId: 'form-table-testing',
    correct:
      'A written evidence record turns accessibility and robustness into repeatable release work.',
    misconception: 'Passing appearance on the author’s laptop is a durable test record.',
    terms: ['evidence', 'checklist', 'release'],
    requirements: [
      ['verification-section', '<section aria-labelledby="verification-title">'],
      ['verification-heading', '<h2 id="verification-title">Survey verification record</h2>'],
      ['verification-list', '<ul id="verification-list">'],
    ],
  },
  {
    phase: 'Verification',
    title: 'Record keyboard and focus evidence',
    instruction: 'Add the keyboard-only completion and error-recovery case to the evidence record.',
    competencyId: 'form-table-testing',
    correct:
      'Keyboard evidence must cover order, group movement, submit validation, recovery, and visible focus.',
    misconception: 'Pressing Tab once proves every control and recovery path works.',
    terms: ['keyboard', 'focus', 'recovery'],
    requirements: [
      [
        'keyboard-evidence',
        '<li>Keyboard: logical order, radio movement, visible focus, validation, and recovery verified.</li>',
      ],
    ],
  },
  {
    phase: 'Verification',
    title: 'Record zoom and narrow-width evidence',
    instruction: 'Add a case for four-hundred-percent zoom and a narrow mobile viewport.',
    competencyId: 'form-table-testing',
    correct:
      'Reflow evidence checks readable labels, reachable controls, no two-dimensional page scrolling, and preserved order.',
    misconception:
      'Responsive behavior is proven by shrinking a desktop window until it looks approximately narrow.',
    terms: ['zoom', 'reflow', 'viewport'],
    requirements: [
      [
        'reflow-evidence',
        '<li>Reflow: 400% zoom and 320 CSS-pixel width preserve labels, order, and controls.</li>',
      ],
    ],
  },
  {
    phase: 'Verification',
    title: 'Record validation and semantic evidence',
    instruction:
      'Add invalid, boundary, payload, and accessibility-tree cases to complete the record.',
    competencyId: 'form-table-testing',
    correct:
      'Changed values and failure states reveal whether names, constraints, groups, and instructions survive real use.',
    misconception:
      'One valid submission covers error behavior and announced relationships automatically.',
    terms: ['invalid', 'payload', 'semantics'],
    requirements: [
      [
        'validation-evidence',
        '<li>Validation: blank, malformed, boundary, and corrected values verified.</li>',
      ],
      [
        'payload-evidence',
        '<li>Payload: intended names and selected values verified at the request boundary.</li>',
      ],
      [
        'semantic-evidence',
        '<li>Semantics: landmarks, labels, descriptions, groups, and status names verified.</li>',
      ],
    ],
  },
];

const steps = [];
const checks = [];
const cumulativeCodeCheckIds = [];
const supportInteractions = ['read', 'predict', 'inspect', 'debug', 'arrange', 'answer', 'reflect'];

function nextStepId() {
  return `${activityId}-step-${String(steps.length + 1).padStart(2, '0')}`;
}

function addBase(milestone, interaction, title, instruction) {
  const step = {
    id: nextStepId(),
    title: `${milestone.phase} · ${title}`.slice(0, 100),
    interaction,
    instruction: `Project checkpoint ${steps.length + 1}: ${instruction}`,
    why: `${milestone.title} ${interaction} checkpoint ${steps.length + 1} creates distinct evidence needed by later Community Needs Survey requirements and final release testing.`,
    buildsOnStepIds:
      steps.length === 0
        ? []
        : steps.length > 2
          ? [steps.at(-1).id, steps[0].id]
          : [steps.at(-1).id],
    content: [],
    checkIds: [],
    competencyIds: [milestone.competencyId],
    hints: [
      `${milestone.phase} checkpoint ${steps.length + 1}: restate the resident task before choosing markup.`,
      `${milestone.phase} checkpoint ${steps.length + 1}: inspect source, native behavior, and submitted or announced relationships.`,
      `${milestone.phase} checkpoint ${steps.length + 1}: preserve every earlier passing requirement while making one bounded change.`,
    ],
    xp: interaction === 'code' || interaction === 'debug' ? 18 : 12,
  };
  return step;
}

function addSupport(milestone, milestoneIndex) {
  const interaction = supportInteractions[milestoneIndex % supportInteractions.length];
  const step = addBase(
    milestone,
    interaction,
    `${interaction.charAt(0).toUpperCase()}${interaction.slice(1)}: ${milestone.title}`,
    `Use the brief to decide how ${milestone.title.toLowerCase()} should behave before editing code.`
  );
  if (interaction === 'arrange') {
    const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-order`;
    step.options = [
      'State the resident task and data relationship',
      'Implement the smallest native contract',
      'Exercise success, failure, and changed-data states',
      'Record evidence and preserve passing work',
    ].map((text, optionIndex) => ({
      id: `${step.id}-event-${optionIndex + 1}`,
      text: `${milestone.phase} ${milestoneIndex + 1}.${optionIndex + 1}: ${text}`,
    }));
    step.checkIds = [checkId];
    step.content = [
      {
        type: 'paragraph',
        text: `Order the ${milestone.title.toLowerCase()} workflow by evidence dependency.`,
      },
    ];
    checks.push({
      id: checkId,
      type: 'order-equals',
      description: `${milestone.title} follows a testable build sequence.`,
      failureMessage: 'Find the first event whose required evidence does not exist yet.',
      hidden: false,
      competencyIds: [milestone.competencyId],
      expectedOptionIds: step.options.map((option) => option.id),
    });
  } else if (interaction === 'reflect') {
    const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-reflection`;
    step.checkIds = [checkId];
    step.content = [
      {
        type: 'callout',
        tone: 'question',
        title: `${milestone.phase} design defense`,
        text: `Connect ${milestone.title.toLowerCase()} to one implementation fact, one resident consequence, one failure state, and one retest.`,
      },
    ];
    checks.push({
      id: checkId,
      type: 'text-response',
      description: `${milestone.title} is defended with implementation and user evidence.`,
      failureMessage:
        'Explain the implementation, user consequence, failed state, and retest with the required terms.',
      hidden: false,
      competencyIds: [milestone.competencyId],
      minimumCharacters: 110,
      requiredTerms: milestone.terms,
    });
  } else {
    const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-choice`;
    const prefix = `${milestone.phase} case ${milestoneIndex + 1}`;
    step.options = [
      { id: `${step.id}-option-a`, text: `${prefix}: ${milestone.misconception}` },
      { id: `${step.id}-option-b`, text: `${prefix}: ${milestone.correct}` },
      {
        id: `${step.id}-option-c`,
        text: `${prefix}: Replace the complete survey with a generic scripted control before isolating this requirement.`,
      },
    ];
    step.checkIds = [checkId];
    step.content =
      interaction === 'inspect'
        ? [
            {
              type: 'callout',
              tone: 'note',
              title: `${milestone.phase} evidence trace`,
              text: `Compare visible output with source, payload, keyboard, validation, and announced evidence for ${milestone.title.toLowerCase()}.`,
            },
          ]
        : [
            {
              type: 'paragraph',
              text: `${milestone.correct} Evaluate that claim against the changed Community Needs Survey brief.`,
            },
          ];
    if (interaction === 'inspect' || interaction === 'debug') {
      step.stimulus = {
        kind: interaction === 'debug' ? 'code-diff' : 'browser',
        title: `${milestone.title} evidence`,
        caption: `Conflicting happy-path and contract evidence from project checkpoint ${steps.length + 1}.`,
        lines: [
          {
            id: `${step.id}-risk`,
            label: 'observed risk',
            text: milestone.misconception,
            tone: 'problem',
          },
          {
            id: `${step.id}-contract`,
            label: 'required contract',
            text: milestone.correct,
            tone: 'focus',
          },
        ],
      };
    }
    checks.push({
      id: checkId,
      type: 'choice-equals',
      description: `${milestone.title} preserves the project requirement and user task.`,
      failureMessage: `Recheck the ${milestone.phase.toLowerCase()} brief, native behavior, and changed-state evidence.`,
      hidden: false,
      competencyIds: [milestone.competencyId],
      expectedOptionId: `${step.id}-option-b`,
    });
  }
  steps.push(step);
}

function addCode(milestone, milestoneIndex) {
  const step = addBase(
    milestone,
    'code',
    `Build ${milestoneIndex + 1}: ${milestone.title}`,
    `${milestone.instruction} Keep all earlier project checks passing.`
  );
  for (const [name, expected] of milestone.requirements) {
    const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-${name}`;
    cumulativeCodeCheckIds.push(checkId);
    checks.push({
      id: checkId,
      type: 'source-includes',
      description: `${milestone.title} includes the ${name.replaceAll('-', ' ')} requirement.`,
      failureMessage: `Add or restore the ${name.replaceAll('-', ' ')} requirement without deleting earlier valid work.`,
      hidden: false,
      competencyIds: [milestone.competencyId],
      file: 'html',
      expected,
    });
  }
  step.checkIds = [...cumulativeCodeCheckIds];
  step.targetFile = 'html';
  step.content = [
    {
      type: 'callout',
      tone: 'note',
      title: `${milestone.phase} build increment ${milestoneIndex + 1}`,
      text: `${milestone.instruction} Test source, native behavior, invalid input, and changed data before continuing.`,
    },
  ];
  steps.push(step);
}

milestones.forEach((milestone, index) => {
  addSupport(milestone, index);
  addCode(milestone, index);
});

const activity = {
  schemaVersion: 2,
  id: activityId,
  courseId,
  moduleId,
  kind: 'project',
  title: 'Certification Project: Community Heat-Relief Needs Survey',
  summary:
    'Independently translate a civic-service brief into a complete semantic survey, preserve a cumulative implementation contract across 24 build increments, and submit keyboard, reflow, validation, payload, and accessibility evidence.',
  objectives: [
    'Translate a real community data workflow into a form action, method, and stable payload names.',
    'Build persistent labels, descriptions, input purposes, exclusive and independent groups, and inclusive native constraints.',
    'Preserve semantic landmarks and native behavior while implementing an unfamiliar project from a brief.',
    'Produce a release record covering keyboard, focus, reflow, validation, payload, and announced semantics.',
  ],
  competencyCoverage: { introduces: [], reinforces: coverage, assesses: coverage },
  prerequisites: ['mapped-quiz-html-tables-and-forms'],
  difficulty: 'mastery',
  estimatedMinutes: 480,
  artifactId,
  starterFiles: {
    html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n</body>\n</html>',
    css: '',
    javascript: '',
  },
  steps,
  checks,
  mastery: {
    passingPercent: 90,
    maxHintsForMastery: 3,
    spacedReviewDays: [2, 14, 45, 90],
  },
};

const module = {
  schemaVersion: 2,
  id: moduleId,
  courseId,
  title: 'Certification Project: Community Needs Survey',
  description:
    'Plan, build, audit, and defend a complete community heat-relief survey from a real-world brief using retained HTML, semantic, form, validation, and test skills.',
  order: 5,
  objectives: [
    'Create a complete unfamiliar survey without step solutions or disposable practice files.',
    'Keep every earlier contract passing while requirements accumulate across the project.',
    'Defend the release with implementation, behavior, failure-state, and accessibility evidence.',
  ],
  competencyIds: coverage,
  prerequisites: ['forms-tables-data'],
  activityIds: [activityId],
};

const coursePath = path.join(outputRoot, 'course.json');
const course = JSON.parse(await readFile(coursePath, 'utf8'));
const insertAfter = course.moduleIds.indexOf('forms-tables-data');
if (insertAfter < 0) throw new Error('forms-tables-data insertion boundary is missing');
course.moduleIds = course.moduleIds.filter((id) => id !== moduleId);
course.moduleIds.splice(insertAfter + 1, 0, moduleId);
course.estimatedHours = Math.max(course.estimatedHours, 7.2);

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
  `Generated Community Needs Survey project: ${steps.length} interactions, ${checks.length} checks.`
);
