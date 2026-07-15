import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const courseId = 'responsive-web-design';
const moduleId = 'cumulative-html-review';
const activityId = 'mapped-review-html';
const artifactId = 'community-needs-survey';
const outputRoot = path.join(process.cwd(), 'content', 'v2', 'courses', courseId);

const cases = [
  {
    competencyId: 'html-document-boilerplate',
    title: 'Document Contract Regression',
    context: 'a translation pipeline removed head metadata from the survey release',
    correct:
      'Restore standards mode, language, character encoding, viewport metadata, and a specific title before evaluating page fragments.',
    misconception: 'Rendered body content proves document metadata is optional.',
    sequence: [
      'Inspect raw document boundaries',
      'Restore parsing and language metadata',
      'Verify title and viewport behavior',
      'Revalidate the complete document',
    ],
    terms: ['doctype', 'language', 'title'],
    requirement: ['document-contract', '<meta charset="utf-8">'],
  },
  {
    competencyId: 'html-links-urls',
    title: 'Navigation Destination Incident',
    context: 'a transcript link resolves against the wrong deployment path',
    correct:
      'Choose the URL from the destination relationship, preserve meaningful link text, and verify keyboard plus visited behavior in the deployed location.',
    misconception: 'Any text containing a URL becomes a keyboard-operable link automatically.',
    sequence: [
      'Identify destination and base URL',
      'Choose fragment relative or absolute reference intentionally',
      'Write destination-specific link text',
      'Activate with keyboard and inspect the resolved URL',
    ],
    terms: ['link', 'destination', 'URL'],
    requirement: [
      'transcript-link',
      '<a href="#advisory-transcript">Read the heat advisory transcript</a>',
    ],
  },
  {
    competencyId: 'html-images-alt',
    title: 'Service Entrance Image Decision',
    context: 'a cooling-center entrance photo is the only location cue in a changed survey',
    correct:
      'Write concise alternative text for the task-relevant entrance information and keep decorative detail out of the required cue.',
    misconception: 'Every image should use alt="image" so screen readers know its element type.',
    sequence: [
      'Determine the image purpose in surrounding content',
      'Identify information unavailable elsewhere',
      'Write concise task-equivalent alternative text',
      'Review with the image unavailable and context intact',
    ],
    terms: ['purpose', 'alternative', 'context'],
    requirement: [
      'entrance-image',
      '<img src="cooling-center-entrance.jpg" alt="Blue accessible entrance beside the east parking lot">',
    ],
  },
  {
    competencyId: 'semantic-landmarks',
    title: 'Repeated Navigation Landmark Conflict',
    context: 'survey and emergency navigation regions share an indistinguishable name',
    correct:
      'Choose landmarks from content purpose, keep one unique main region, and give repeated navigation regions distinct accessible names.',
    misconception: 'All visually boxed regions should use main so important content is announced.',
    sequence: [
      'Inventory major page regions',
      'Match each region to its native relationship',
      'Name repeated landmarks by purpose',
      'Inspect the landmark map and skip route',
    ],
    terms: ['landmark', 'main', 'navigation'],
    requirement: ['survey-navigation', '<nav aria-label="Survey sections">'],
  },
  {
    competencyId: 'form-labels-instructions',
    title: 'Dynamic Help Text Disconnect',
    context: 'resident guidance is visible but no longer associated after a form redesign',
    correct:
      'Preserve the visible label, unique for-id association, and programmatic description connection through every state.',
    misconception:
      'Placeholder text and visual proximity provide a persistent accessible label and description.',
    sequence: [
      'Identify the control purpose and stable visible label',
      'Match label for to one unique control id',
      'Connect only relevant help and error text',
      'Inspect name and description before and after invalid input',
    ],
    terms: ['label', 'description', 'error'],
    requirement: ['resident-name-description', 'aria-describedby="name-help name-error"'],
  },
  {
    competencyId: 'table-header-associations',
    title: 'Audit Evidence Table Header Loss',
    context: 'release evidence uses bold cells but exposes no row or column relationship',
    correct:
      'Use real header cells with scope for simple relationships and inspect the headers announced for representative data cells.',
    misconception: 'Bold first-row data cells create the same relationship as th and scope.',
    sequence: [
      'Identify row and column dimensions',
      'Mark header cells with th',
      'Apply scope or explicit associations as complexity requires',
      'Inspect announced headers across representative cells',
    ],
    terms: ['header', 'scope', 'cell'],
    requirement: ['audit-column-header', '<th scope="col">Evidence source</th>'],
  },
  {
    competencyId: 'keyboard-focus',
    title: 'Post-Validation Focus Trap',
    context: 'a failed submit moves focus into an error summary with no predictable return route',
    correct:
      'Use a deliberate focus target, preserve logical DOM order and visible focus, and complete correction plus resubmission with the keyboard.',
    misconception: 'Positive tabindex values are the safest way to force a recovery sequence.',
    sequence: [
      'Submit invalid data with keyboard only',
      'Observe focus target and announced error context',
      'Navigate to and correct affected fields',
      'Resubmit and confirm focus remains predictable',
    ],
    terms: ['focus', 'keyboard', 'recovery'],
    requirement: [
      'focusable-error-summary',
      'id="error-summary" aria-labelledby="error-summary-title" tabindex="-1"',
    ],
  },
  {
    competencyId: 'accessible-names-descriptions',
    title: 'Conflicting Control Name Sources',
    context: 'an aria-label silently replaces clearer visible survey wording',
    correct:
      'Prefer the visible label as the primary name, remove conflicting overrides, and keep supporting instructions in the description.',
    misconception: 'More naming attributes always produce a more complete accessible name.',
    sequence: [
      'List visible and programmatic naming sources',
      'Predict the accessible-name computation result',
      'Keep one concise name and separate supporting description',
      'Inspect computed output in normal and invalid states',
    ],
    terms: ['name', 'visible', 'description'],
    requirement: ['visible-survey-name', 'aria-labelledby="title"'],
  },
  {
    competencyId: 'accessibility-test-strategy',
    title: 'Perfect Automation Score Challenge',
    context: 'a release owner treats a clean automated report as final proof',
    correct:
      'Combine automated findings with task-based keyboard, zoom, preference, changed-state, and assistive-technology evidence.',
    misconception: 'A perfect automated score proves conformance and usable access.',
    sequence: [
      'Define representative tasks and risk states',
      'Run validation and automated rules',
      'Run manual preference and assistive checks',
      'Record environments repair causes and rerun affected tasks',
    ],
    terms: ['automated', 'manual', 'evidence'],
    requirement: [
      'manual-audit-evidence',
      '<li>Manual: keyboard, zoom, reflow, forced colors, and reduced motion verified.</li>',
    ],
  },
];

const patterns = [
  ['predict', 'inspect', 'answer', 'arrange', 'debug', 'code', 'read', 'reflect'],
  ['inspect', 'predict', 'arrange', 'answer', 'read', 'debug', 'code', 'reflect'],
  ['read', 'predict', 'inspect', 'debug', 'arrange', 'answer', 'code', 'reflect'],
];
const steps = [];
const checks = [];
const cumulativeCodeCheckIds = [];

function base(model, interaction) {
  const number = steps.length + 1;
  return {
    id: `${activityId}-step-${String(number).padStart(2, '0')}`,
    title: `${model.title} · ${interaction} ${number}`.slice(0, 100),
    interaction,
    instruction: `HTML review checkpoint ${number}: resolve ${model.context} without discarding earlier passing evidence.`,
    why: `${model.title} checkpoint ${number} retrieves ${model.competencyId.replaceAll('-', ' ')} in an unfamiliar failure state.`,
    buildsOnStepIds:
      number === 1 ? [] : number > 3 ? [steps.at(-1).id, steps[0].id] : [steps.at(-1).id],
    content: [],
    checkIds: [],
    competencyIds: [model.competencyId],
    hints: [
      `${model.title} checkpoint ${number}: restate the task and relationship before inspecting markup.`,
      `${model.title} checkpoint ${number}: compare source, native behavior, and announced or submitted evidence.`,
      `${model.title} checkpoint ${number}: repair the earliest broken contract and rerun the affected task.`,
    ],
    xp: interaction === 'code' || interaction === 'debug' ? 18 : 12,
  };
}

for (const [caseIndex, model] of cases.entries()) {
  for (const interaction of patterns[caseIndex % patterns.length]) {
    const step = base(model, interaction);
    if (interaction === 'code') {
      const [name, expected] = model.requirement;
      const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-${name}`;
      cumulativeCodeCheckIds.push(checkId);
      checks.push({
        id: checkId,
        type: 'source-includes',
        description: `${model.title} restores the ${name.replaceAll('-', ' ')} requirement.`,
        failureMessage: `Restore the ${name.replaceAll('-', ' ')} requirement and preserve earlier review repairs.`,
        hidden: false,
        competencyIds: [model.competencyId],
        file: 'html',
        expected,
      });
      step.checkIds = [...cumulativeCodeCheckIds];
      step.targetFile = 'html';
      step.content = [
        {
          type: 'callout',
          tone: 'note',
          title: `${model.title} repair`,
          text: `Apply the bounded repair to the continuing Community Needs Survey and rerun all accumulated review checks.`,
        },
      ];
    } else if (interaction === 'arrange') {
      const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-order`;
      step.options = model.sequence.map((text, index) => ({
        id: `${step.id}-event-${index + 1}`,
        text: `${model.title} phase ${index + 1}: ${text}`,
      }));
      step.checkIds = [checkId];
      step.content = [
        {
          type: 'paragraph',
          text: `Order the ${model.title.toLowerCase()} response by evidence dependency.`,
        },
      ];
      checks.push({
        id: checkId,
        type: 'order-equals',
        description: `${model.title} follows a defensible diagnostic sequence.`,
        failureMessage:
          'Find the first phase whose required observation or decision has not happened yet.',
        hidden: false,
        competencyIds: [model.competencyId],
        expectedOptionIds: step.options.map((option) => option.id),
      });
    } else if (interaction === 'reflect') {
      const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-reflection`;
      step.checkIds = [checkId];
      step.content = [
        {
          type: 'callout',
          tone: 'question',
          title: `${model.title} handoff`,
          text: 'Defend the chosen repair with source evidence, a user consequence, a failure state, and a specific retest.',
        },
      ];
      checks.push({
        id: checkId,
        type: 'text-response',
        description: `${model.title} is defended with implementation and user evidence.`,
        failureMessage:
          'Connect the implementation decision to user impact and retest using the required terms.',
        hidden: false,
        competencyIds: [model.competencyId],
        minimumCharacters: 110,
        requiredTerms: model.terms,
      });
    } else {
      const checkId = `${activityId}-check-${String(checks.length + 1).padStart(2, '0')}-choice`;
      const prefix = `HTML case ${caseIndex + 1} checkpoint ${steps.length + 1}`;
      step.options = [
        { id: `${step.id}-option-a`, text: `${prefix}: ${model.misconception}` },
        { id: `${step.id}-option-b`, text: `${prefix}: ${model.correct}` },
        {
          id: `${step.id}-option-c`,
          text: `${prefix}: replace the full artifact before isolating the failed relationship.`,
        },
      ];
      step.checkIds = [checkId];
      step.content = [
        {
          type: interaction === 'read' ? 'paragraph' : 'callout',
          ...(interaction === 'read'
            ? { text: `${model.correct} Apply the rule to ${model.context}.` }
            : {
                tone: interaction === 'debug' ? 'warning' : 'question',
                title: `${model.title} evidence`,
                text: `Choose the conclusion supported across source, behavior, failure, and changed-content evidence.`,
              }),
        },
      ];
      if (interaction === 'inspect' || interaction === 'debug')
        step.stimulus = {
          kind: interaction === 'debug' ? 'code-diff' : 'browser',
          title: `${model.title} trace`,
          caption: `Conflicting evidence collected during HTML review case ${caseIndex + 1}.`,
          lines: [
            {
              id: `${step.id}-risk`,
              label: 'observed risk',
              text: model.misconception,
              tone: 'problem',
            },
            {
              id: `${step.id}-contract`,
              label: 'durable contract',
              text: model.correct,
              tone: 'focus',
            },
          ],
        };
      checks.push({
        id: checkId,
        type: 'choice-equals',
        description: `${model.title} conclusion survives the changed case.`,
        failureMessage:
          'Recheck the task relationship and evidence instead of visible success alone.',
        hidden: false,
        competencyIds: [model.competencyId],
        expectedOptionId: `${step.id}-option-b`,
      });
    }
    steps.push(step);
  }
}

const coverage = cases.map((entry) => entry.competencyId);
const activity = {
  schemaVersion: 2,
  id: activityId,
  courseId,
  moduleId,
  kind: 'review',
  title: 'Cumulative HTML Release Review',
  summary:
    'Retrieve and integrate core document, navigation, image, landmark, form, table, keyboard, naming, and accessibility-test skills across nine changed production incidents in the continuing Community Needs Survey.',
  objectives: [
    'Diagnose changed HTML failures from task, source, browser behavior, and accessibility evidence.',
    'Repair one bounded relationship while preserving every earlier passing review requirement.',
    'Explain why each repair works and identify the success, failure, and transfer retests it needs.',
  ],
  competencyCoverage: { introduces: [], reinforces: coverage, assesses: coverage },
  prerequisites: ['mapped-quiz-html-accessibility'],
  difficulty: 'mastery',
  estimatedMinutes: 540,
  artifactId,
  starterFiles: {
    html: '<!-- Continue the Community Needs Survey release artifact here. -->',
    css: '',
    javascript: '',
  },
  steps,
  checks,
  mastery: { passingPercent: 88, maxHintsForMastery: 2, spacedReviewDays: [3, 14, 45, 90] },
};

const module = {
  schemaVersion: 2,
  id: moduleId,
  courseId,
  title: 'Cumulative HTML Review',
  description:
    'Retrieve the complete HTML foundation in changed production incidents before adding CSS, with cumulative repairs and explicit implementation, failure-state, and accessibility evidence.',
  order: 7,
  objectives: [
    'Integrate retained HTML and accessibility skills without introducing new concepts.',
    'Repair production-like regressions while preserving all earlier passing requirements.',
    'Reach CSS study with verified control over document, content, form, table, and accessibility contracts.',
  ],
  competencyIds: coverage,
  prerequisites: ['accessible-html-engineering'],
  activityIds: [activityId],
};

const coursePath = path.join(outputRoot, 'course.json');
const course = JSON.parse(await readFile(coursePath, 'utf8'));
const boundary = course.moduleIds.indexOf('accessible-html-engineering');
if (boundary < 0) throw new Error('accessible-html-engineering insertion boundary is missing');
course.moduleIds = course.moduleIds.filter((id) => id !== moduleId);
course.moduleIds.splice(boundary + 1, 0, moduleId);
course.estimatedHours = Math.max(course.estimatedHours, 9.5);

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
  `Generated Cumulative HTML Review: ${steps.length} interactions, ${checks.length} checks.`
);
