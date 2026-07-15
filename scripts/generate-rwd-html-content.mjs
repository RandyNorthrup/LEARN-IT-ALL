import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const courseId = 'responsive-web-design';
const moduleId = 'documents-content-media';
const outputRoot = path.join(process.cwd(), 'content', 'v2', 'courses', courseId);
const blueprint = JSON.parse(
  await readFile(path.join(process.cwd(), 'blueprints', 'responsive-web-design.json'), 'utf8')
);
const blueprintModule = blueprint.modules.find((entry) => entry.id === 'basic-html');
if (!blueprintModule) throw new Error('The basic-html blueprint module is missing.');

const competencyIds = [
  'html-document-boilerplate',
  'html-elements-nesting',
  'html-attributes',
  'html-text-headings-lists',
  'html-links-urls',
  'html-images-alt',
  'html-svg',
  'html-audio',
  'html-video',
  'html-iframe',
  'html-validation-tools',
];
const competencies = competencyIds.map((competencyId) => {
  const competency = blueprint.competencies.find((entry) => entry.id === competencyId);
  if (!competency) throw new Error(`Missing competency ${competencyId}`);
  return competency;
});

const models = [
  {
    id: 'html-document-boilerplate',
    activityId: 'document-launch-checklist',
    title: 'Launch a Document the Browser Can Identify',
    context: 'heat-relief information hub launch desk',
    concept:
      'A deployable HTML document declares its parsing mode, document language, character encoding, responsive viewport behavior, and a useful browser-tab title. These signals belong in precise locations: the doctype begins the source, the language belongs on the root element, metadata belongs in head, and visible content belongs in body.',
    misconception:
      'A visible heading supplies the browser-tab title, language, encoding, and mobile viewport automatically.',
    correct:
      'The document needs an explicit doctype, root language, head metadata, title, viewport instruction, and body content.',
    distractors: [
      'A body element alone is a complete production document because browsers repair every missing signal identically.',
      'Metadata should be placed after the closing html tag so it stays invisible.',
    ],
    sequence: [
      'Declare the HTML parsing mode',
      'Open the root element and identify its language',
      'Provide machine-readable metadata and a title in head',
      'Place the public information inside body',
    ],
    terms: ['doctype', 'language', 'viewport'],
    codeTask:
      'Replace the launch placeholder with a complete document shell for the Heat Relief Network page.',
    requirements: [
      ['doctype', '<!doctype html>'],
      ['language', '<html lang="en">'],
      ['encoding', '<meta charset="utf-8">'],
      ['viewport', 'name="viewport"'],
      ['title', '<title>Heat Relief Network</title>'],
    ],
  },
  {
    id: 'html-elements-nesting',
    activityId: 'document-tree-builder',
    title: 'Turn a Content Brief into a Valid Tree',
    context: 'community service desk content map',
    concept:
      'Elements create relationships through start tags, end tags, and nesting. Indentation makes those relationships readable to people but does not create them. A child must close before its parent closes, while void elements such as img and meta do not receive end tags.',
    misconception:
      'Indenting a paragraph beneath main makes it a child even if the tags close out of order.',
    correct:
      'Parent-child relationships come from correctly nested tags; indentation should then mirror that structure.',
    distractors: [
      'All elements are void elements, so closing tags are optional whenever the page still appears.',
      'A browser screenshot proves the source tree is correctly nested.',
    ],
    sequence: [
      'Choose an element that represents the outer relationship',
      'Open the parent before its children',
      'Complete and close each child in order',
      'Close the parent after its final child',
    ],
    terms: ['parent', 'child', 'nesting'],
    codeTask:
      'Add a main region containing one heading and one explanatory paragraph without breaking the document shell.',
    requirements: [
      ['main', '<main>'],
      ['heading', '<h1>Heat Relief Network</h1>'],
      ['paragraph', '<p>Find free cooling spaces, water, and wellness checks.</p>'],
    ],
  },
  {
    id: 'html-attributes',
    activityId: 'attribute-behavior-clinic',
    title: 'Give Elements the Right Extra Instructions',
    context: 'cooling-center status board',
    concept:
      'Attributes add defined information or behavior to an element. Global attributes can apply broadly; element-specific attributes have narrower contracts; boolean attributes are true by presence; and enumerated attributes accept a defined vocabulary rather than arbitrary values.',
    misconception: 'Every attribute becomes more effective when given the text value true.',
    correct:
      'Attribute syntax and values must follow the contract defined for that element and attribute.',
    distractors: [
      'Any invented attribute changes native browser behavior if its name sounds descriptive.',
      'Boolean attributes are enabled only when written with the numeric value 1.',
    ],
    sequence: [
      'Identify the behavior or information the element needs',
      'Confirm the attribute is valid for that element',
      'Use the required value syntax or boolean presence',
      'Inspect the resulting DOM property and behavior',
    ],
    terms: ['attribute', 'boolean', 'enumerated'],
    codeTask:
      'Give the services section a fragment target and expose its current operational state as project data.',
    requirements: [
      ['section-id', 'id="services"'],
      ['data-state', 'data-status="open"'],
    ],
  },
  {
    id: 'html-text-headings-lists',
    activityId: 'content-hierarchy-desk',
    title: 'Make the Information Structure Survive without CSS',
    context: 'public health copy desk',
    concept:
      'Headings label sections and express an outline; paragraphs carry prose; lists express collections or sequences; block quotations identify quoted passages; and code elements identify computer input or output. Element choice should preserve meaning when presentation is removed.',
    misconception:
      'Heading rank is a font-size control, so smaller-looking sections should always use h6.',
    correct:
      'Select text elements for the relationship they communicate, then use CSS later for visual scale.',
    distractors: [
      'A sequence of br elements communicates the same list relationship as ol or ul.',
      'Every sentence should be a heading because headings receive stronger default styling.',
    ],
    sequence: [
      'Identify the page topic and give it one descriptive heading',
      'Group related content beneath section headings',
      'Represent collections and procedures with the correct list type',
      'Read the outline without presentation to verify the relationships',
    ],
    terms: ['heading', 'list', 'relationship'],
    codeTask:
      'Add a services heading, an unordered service list, and a quoted resident advisory to the existing main region.',
    requirements: [
      ['section-heading', '<h2>Available services</h2>'],
      ['service-list', '<ul>'],
      ['quotation', '<blockquote>'],
    ],
  },
  {
    id: 'html-links-urls',
    activityId: 'link-destination-control',
    title: 'Build Links That Explain Where They Go',
    context: 'multi-channel help directory',
    concept:
      'A link combines an understandable accessible name with a URL. Absolute URLs identify complete locations; relative URLs preserve project relationships; fragment URLs target IDs in a document; and mailto or tel schemes offer appropriate communication actions. Link purpose must remain clear outside its surrounding sentence.',
    misconception:
      'Click here is always sufficient link text because users read every surrounding sentence first.',
    correct:
      'The href must use the right URL form and the link text should identify the destination or action.',
    distractors: [
      'Every internal project link needs the author’s full local file-system path.',
      'A fragment link targets a heading by its visible text without requiring an id.',
    ],
    sequence: [
      'Identify the destination and user intent',
      'Choose absolute, relative, fragment, email, or telephone URL syntax',
      'Write link text that names the destination or action',
      'Activate the link and verify the resulting location',
    ],
    terms: ['URL', 'fragment', 'purpose'],
    codeTask:
      'Add a skip link to the services section plus direct email and telephone actions for the help team.',
    requirements: [
      ['fragment-link', 'href="#services"'],
      ['email-link', 'href="mailto:help@example.org"'],
      ['phone-link', 'href="tel:+1555010142"'],
    ],
  },
  {
    id: 'html-images-alt',
    activityId: 'image-purpose-audit',
    title: 'Describe Image Purpose, Not Pixel Inventory',
    context: 'clinic photo and map audit',
    concept:
      'Alternative text communicates an image’s purpose in context. Informative images need a concise equivalent; functional images name the action; complex images need a nearby extended explanation; and decorative images use an empty alt. Intrinsic width and height reserve the correct aspect ratio before the image loads.',
    misconception:
      'Every image needs a long visual description, including decorative flourishes already ignored by sighted readers.',
    correct:
      'Classify the image purpose first, then provide the shortest equivalent that preserves that purpose.',
    distractors: [
      'Omitting alt is the recommended way to mark an image decorative.',
      'The filename is always an adequate alternative because it identifies the asset.',
    ],
    sequence: [
      'Determine whether the image is informative, functional, complex, or decorative',
      'Write or omit verbal content according to that purpose',
      'Provide intrinsic dimensions to reserve its aspect ratio',
      'Test the surrounding content with the image unavailable',
    ],
    terms: ['purpose', 'alternative', 'dimensions'],
    codeTask:
      'Add the clinic photo with a contextual alternative and intrinsic dimensions inside a figure.',
    requirements: [
      ['figure', '<figure>'],
      ['photo-alt', 'alt="Volunteers repairing a bicycle at the clinic"'],
      ['photo-width', 'width="960"'],
      ['photo-height', 'height="640"'],
      ['caption', '<figcaption>Saturday repair clinic</figcaption>'],
    ],
  },
  {
    id: 'html-svg',
    activityId: 'vector-meaning-workbench',
    title: 'Ship Scalable Graphics with Intentional Names',
    context: 'service availability icon system',
    concept:
      'SVG can be loaded as an external image or embedded inline. Inline SVG exposes its internal structure to the document and can receive an accessible name; decorative SVG should be hidden from assistive technology. A viewBox defines scalable coordinates independently of rendered size.',
    misconception:
      'Path geometry automatically becomes a useful accessible name for every inline SVG.',
    correct:
      'Choose an embedding method deliberately, provide a name for meaningful graphics, and hide decorative graphics.',
    distractors: [
      'Removing the viewBox makes an SVG scale more reliably across containers.',
      'Every decorative path needs role img and a spoken title.',
    ],
    sequence: [
      'Decide whether the vector is content, a control, or decoration',
      'Choose external image or inline SVG behavior',
      'Set a viewBox that contains the drawing coordinates',
      'Name meaningful vectors or hide decorative ones',
    ],
    terms: ['SVG', 'viewBox', 'name'],
    codeTask:
      'Add a meaningful inline service-status icon with scalable coordinates and an explicit accessible name.',
    requirements: [
      ['svg-root', '<svg'],
      ['svg-viewbox', 'viewBox="0 0 24 24"'],
      ['svg-role', 'role="img"'],
      ['svg-title', '<title>Cooling center open</title>'],
    ],
  },
  {
    id: 'html-audio',
    activityId: 'audio-equivalence-studio',
    title: 'Publish Audio without Making Listening Mandatory',
    context: 'multilingual heat advisory archive',
    concept:
      'Native audio controls provide established playback behavior. Multiple source elements can offer compatible formats, fallback content supports browsers that cannot play them, and a full transcript gives equivalent access to the spoken information without requiring sound.',
    misconception:
      'Once an audio file plays, controls, fallback, and a transcript are optional accessibility extras.',
    correct:
      'Usable audio needs controls, supported sources, fallback, and an equivalent transcript.',
    distractors: [
      'Autoplay is required so keyboard users can discover that audio exists.',
      'A one-sentence summary is always equivalent to a detailed emergency advisory.',
    ],
    sequence: [
      'Prepare the audio and complete transcript',
      'Create an audio element with native controls',
      'Offer suitable sources and fallback content',
      'Link the player to the full transcript and test keyboard operation',
    ],
    terms: ['controls', 'source', 'transcript'],
    codeTask:
      'Add the recorded advisory with native controls, two source formats, fallback, and a transcript link.',
    requirements: [
      ['audio-controls', '<audio controls>'],
      ['audio-mp3', 'type="audio/mpeg"'],
      ['audio-ogg', 'type="audio/ogg"'],
      ['audio-transcript', 'href="transcripts/heat-advisory.html"'],
    ],
  },
  {
    id: 'html-video',
    activityId: 'captioned-video-bay',
    title: 'Build a Video Player with Equivalent Access',
    context: 'public cooling-center orientation',
    concept:
      'A usable video exposes controls, dimensions, compatible sources, synchronized captions, and fallback content. Captions communicate dialogue and relevant sound; a transcript supports reading and search; and avoiding forced autoplay preserves user control.',
    misconception:
      'Words burned into some frames replace synchronized captions for dialogue, sound, and speaker changes.',
    correct:
      'The player needs controls, supported sources, a caption track, fallback, and equivalent text access.',
    distractors: [
      'Muted autoplay is the only reliable way to make a public briefing accessible.',
      'The poster image supplies captions while the video is playing.',
    ],
    sequence: [
      'Prepare video formats, captions, poster, and transcript',
      'Create a dimensioned video element with native controls',
      'Add compatible source elements and the caption track',
      'Test playback, captions, fallback, and text-equivalent access',
    ],
    terms: ['captions', 'controls', 'fallback'],
    codeTask:
      'Add the orientation video with dimensions, native controls, a source, English captions, and fallback.',
    requirements: [
      ['video-controls', '<video controls'],
      ['video-width', 'width="960"'],
      ['video-source', 'type="video/mp4"'],
      ['caption-track', 'kind="captions"'],
      ['caption-language', 'srclang="en"'],
    ],
  },
  {
    id: 'html-iframe',
    activityId: 'embed-permission-gate',
    title: 'Constrain and Name an Embedded Document',
    context: 'city meeting stream embed review',
    concept:
      'An iframe creates a nested browsing context. Its title names the embedded content for assistive technology; loading can be deferred; sandbox and allow limit capabilities; and responsive sizing must prevent the nested document from breaking the parent layout.',
    misconception:
      'The iframe title edits the heading shown inside the remote page, so it can be omitted when that page has an h1.',
    correct:
      'The parent document must name the iframe, constrain its permissions, and make its box responsive.',
    distractors: [
      'An iframe automatically inherits the parent page language, permissions, and accessible name.',
      'Removing all constraints is safest because embedded content needs every browser capability.',
    ],
    sequence: [
      'Confirm an embed is preferable to a normal link',
      'Give the nested browsing context a descriptive title',
      'Grant only required permissions and loading behavior',
      'Test keyboard access, fallback link, and responsive sizing',
    ],
    terms: ['iframe', 'title', 'permissions'],
    codeTask:
      'Embed the public meeting stream with a descriptive title, lazy loading, and constrained capabilities.',
    requirements: [
      ['iframe-root', '<iframe'],
      ['iframe-title', 'title="City heat response meeting stream"'],
      ['iframe-loading', 'loading="lazy"'],
      ['iframe-sandbox', 'sandbox="allow-scripts allow-same-origin"'],
    ],
  },
  {
    id: 'html-validation-tools',
    activityId: 'markup-forensics-room',
    title: 'Find the Source Defect behind a Forgiving Render',
    context: 'pre-publication conformance review',
    concept:
      'Browsers recover from many source errors, so a visible page is not proof of conformance. A disciplined review combines an HTML validator, source inspection, the parsed DOM, the accessibility tree, and a retest after the smallest root-cause repair.',
    misconception: 'If the page looks correct in one browser, the HTML is valid and interoperable.',
    correct:
      'Rendering and conformance are different evidence; validate source and trace each message to a root cause.',
    distractors: [
      'Repair every visible symptom with extra div elements without reading validator output.',
      'Developer Tools DOM is the saved source, so differences between them prove the validator is wrong.',
    ],
    sequence: [
      'Reproduce the problem and preserve the failing source',
      'Run conformance and browser inspections',
      'Trace the earliest useful message to its source cause',
      'Apply the smallest repair and rerun the complete evidence set',
    ],
    terms: ['validator', 'source', 'root cause'],
    codeTask:
      'Repair the cumulative source so its main region closes before the body and the complete document closes once.',
    requirements: [
      ['main-close', '</main>'],
      ['body-close', '</body>'],
      ['document-close', '</html>'],
    ],
  },
];
const modelById = new Map(models.map((model) => [model.id, model]));

const blankArtifact = {
  html: '<!-- Build the public information artifact here. -->',
  css: '',
  javascript: '',
};

function activityBuilder(meta) {
  const steps = [];
  const checks = [];
  const cumulativeCodeCheckIds = [];
  const stepId = () => `${meta.id}-step-${String(steps.length + 1).padStart(2, '0')}`;
  const checkId = (suffix = 'claim') =>
    `${meta.id}-check-${String(checks.length + 1).padStart(2, '0')}-${suffix}`;
  const buildsOn = () => {
    if (steps.length === 0) return [];
    const previous = steps.at(-1).id;
    const anchor = steps.length > 2 ? steps[0].id : null;
    return anchor && anchor !== previous ? [previous, anchor] : [previous];
  };
  const base = (title, interaction, instruction, why, competencyIdsForStep) => ({
    id: stepId(),
    title: `${title} · ${meta.kind}`,
    interaction,
    instruction: `Checkpoint ${steps.length + 1}: ${instruction} Work context: ${meta.context}.`,
    why: `${why} This is checkpoint ${steps.length + 1} in the ${meta.context}.`,
    buildsOnStepIds: buildsOn(),
    content: [],
    checkIds: [],
    competencyIds: competencyIdsForStep,
    hints: [
      `${meta.title}: first isolate the evidence required by “${title}.”`,
      `${meta.title}: compare the current artifact with the named ${interaction} goal for step ${steps.length + 1}.`,
      `${meta.title}: use the smallest defensible change or claim that satisfies “${title}.”`,
    ],
    xp: interaction === 'code' || interaction === 'debug' ? 14 : 10,
  });

  return {
    steps,
    checks,
    addChoice({
      title,
      interaction = 'answer',
      prompt,
      correct,
      distractors,
      competencyId,
      stimulus,
    }) {
      const step = base(
        title,
        interaction,
        prompt,
        `${meta.title} requires this decision because ${meta.why}`,
        [competencyId]
      );
      const id = checkId('choice');
      step.checkIds = [id];
      const casePrefix = `${meta.context.charAt(0).toUpperCase()}${meta.context.slice(1)} case ${steps.length + 1}`;
      const contextualize = (text) =>
        `${casePrefix}: ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
      step.options = [
        { id: `${step.id}-option-a`, text: contextualize(distractors[0]) },
        { id: `${step.id}-option-b`, text: contextualize(correct) },
        { id: `${step.id}-option-c`, text: contextualize(distractors[1]) },
      ];
      step.content = [
        {
          type: interaction === 'read' ? 'paragraph' : 'callout',
          ...(interaction === 'read'
            ? { text: `${meta.context}: ${meta.explanation}` }
            : {
                tone: interaction === 'predict' ? 'question' : 'note',
                title: `${meta.context} · evidence decision`,
                text: `Commit before feedback, then connect the selected claim to the ${meta.context} evidence.`,
              }),
        },
      ];
      if (stimulus) step.stimulus = stimulus;
      checks.push({
        id,
        type: 'choice-equals',
        description: `${title} is resolved with evidence in ${meta.context}.`,
        failureMessage: `Recheck the named HTML contract and the available evidence for ${title}.`,
        hidden: false,
        competencyIds: [competencyId],
        expectedOptionId: `${step.id}-option-b`,
      });
      steps.push(step);
    },
    addOrder({ title, prompt, options, competencyId }) {
      const step = base(
        title,
        'arrange',
        prompt,
        `${meta.title} depends on causal ordering because ${meta.why}`,
        [competencyId]
      );
      const id = checkId('order');
      step.checkIds = [id];
      step.options = options.map((text, index) => ({
        id: `${step.id}-event-${index + 1}`,
        text: `${meta.context} phase ${steps.length + 1}.${index + 1}: ${text.charAt(0).toLowerCase()}${text.slice(1)}`,
      }));
      step.content = [
        {
          type: 'paragraph',
          text: `Reconstruct the ${meta.context} sequence by dependency, not by how familiar each term looks.`,
        },
      ];
      checks.push({
        id,
        type: 'order-equals',
        description: `${title} preserves the required dependency order.`,
        failureMessage: `Find the first ${meta.context} event whose required input does not yet exist.`,
        hidden: false,
        competencyIds: [competencyId],
        expectedOptionIds: step.options.map((option) => option.id),
      });
      steps.push(step);
    },
    addReflect({ title, prompt, competencyId, terms }) {
      const step = base(
        title,
        'reflect',
        prompt,
        `${meta.title} uses explanation to expose guesses that a passing visual result could hide.`,
        [competencyId]
      );
      const id = checkId('explanation');
      step.checkIds = [id];
      step.content = [
        {
          type: 'callout',
          tone: 'question',
          title: `Defend the ${meta.context} decision`,
          text: 'Name the evidence, connect it to the relevant HTML contract, and state what a retest should prove.',
        },
      ];
      checks.push({
        id,
        type: 'text-response',
        description: `${title} cites the required HTML concepts.`,
        failureMessage: `Explain the decision with the required terms and at least one evidence-to-conclusion link.`,
        hidden: false,
        competencyIds: [competencyId],
        minimumCharacters: 90,
        requiredTerms: terms,
      });
      steps.push(step);
    },
    addCode({ title, prompt, competencyId, requirements }) {
      const step = base(
        title,
        'code',
        prompt,
        `${meta.title} keeps earlier work active while adding one testable HTML increment.`,
        [competencyId]
      );
      for (const [name, expected, type = 'source-includes'] of requirements) {
        const id = checkId(name);
        cumulativeCodeCheckIds.push(id);
        checks.push({
          id,
          type,
          description: `${title} preserves the ${name.replaceAll('-', ' ')} requirement.`,
          failureMessage: `Repair the ${name.replaceAll('-', ' ')} requirement without removing earlier valid work.`,
          hidden: false,
          competencyIds: [competencyId],
          ...(type === 'source-matches'
            ? { file: 'html', pattern: expected, flags: 'i' }
            : { file: 'html', expected }),
        });
      }
      step.checkIds = [...cumulativeCodeCheckIds];
      step.targetFile = 'html';
      step.content = [
        {
          type: 'callout',
          tone: 'note',
          title: `Build increment ${steps.length + 1}`,
          text: `Edit the existing ${meta.context} artifact. Run the checks, inspect the preview, and preserve every earlier passing requirement.`,
        },
      ];
      steps.push(step);
    },
  };
}

function finalizeActivity(meta, builder) {
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

function makeConceptActivity(model, earlierHtmlCompetencyIds) {
  const meta = {
    id: model.activityId,
    kind: 'theory',
    title: model.title,
    context: model.context,
    why: 'the learner must distinguish a specification-defined relationship from a browser-recovered appearance.',
    explanation: model.concept,
    summary: `${model.concept} Predict, inspect, explain, and apply the contract in a cumulative public-information build.`,
    objectives: [
      `Explain ${model.id.replaceAll('-', ' ')} with source and browser evidence.`,
      `Apply ${model.id.replaceAll('-', ' ')} without discarding earlier document work.`,
      `Diagnose the named misconception in a changed public-service scenario.`,
    ],
    coverage: {
      introduces: [model.id],
      reinforces: ['browser-devtools', 'web-research-verification', ...earlierHtmlCompetencyIds],
      assesses: [model.id],
    },
    difficulty: earlierHtmlCompetencyIds.length < 3 ? 'foundation' : 'practice',
    estimatedMinutes: 55,
    artifactId: 'heat-relief-information-hub',
    starterFiles: blankArtifact,
  };
  const builder = activityBuilder(meta);
  builder.addChoice({
    title: `Predict the ${model.context} failure`,
    interaction: 'predict',
    prompt: `Which claim should guide the first ${model.context} decision before the page is opened?`,
    correct: model.correct,
    distractors: model.distractors,
    competencyId: model.id,
  });
  builder.addOrder({
    title: `Reconstruct the ${model.context} workflow`,
    prompt: `Put the four ${model.id.replaceAll('-', ' ')} decisions into a defensible working order.`,
    options: model.sequence,
    competencyId: model.id,
  });
  builder.addChoice({
    title: `Inspect the ${model.context} evidence`,
    interaction: 'inspect',
    prompt: `Which conclusion is supported by the source and browser evidence in this ${model.context}?`,
    correct: model.correct,
    distractors: [model.misconception, model.distractors[1]],
    competencyId: model.id,
    stimulus: {
      kind: 'code-diff',
      title: `${model.title} · evidence sample`,
      caption: `Source and browser observations from the ${model.context} before repair.`,
      lines: [
        {
          id: `${model.activityId}-evidence-source`,
          label: 'source',
          text: model.misconception,
          tone: 'problem',
        },
        {
          id: `${model.activityId}-evidence-contract`,
          label: 'contract',
          text: model.correct,
          tone: 'focus',
        },
      ],
    },
  });
  builder.addChoice({
    title: `Connect the rule to the ${model.context}`,
    interaction: 'read',
    prompt: `After reading the explanation, which statement preserves the intended HTML relationship?`,
    correct: model.correct,
    distractors: [model.distractors[1], model.misconception],
    competencyId: model.id,
  });
  builder.addChoice({
    title: `Debug the misleading ${model.context} result`,
    interaction: 'debug',
    prompt: `The browser produces a plausible page despite the defect. Which diagnosis reaches the source cause?`,
    correct: `The render is recovery evidence, not proof of conformance. ${model.correct}`,
    distractors: [
      `Keep the defect because this browser recovered it during the ${model.context}.`,
      `Add presentation until the ${model.context} source relationship no longer matters.`,
    ],
    competencyId: model.id,
  });
  builder.addChoice({
    title: `Transfer the rule beyond the ${model.context}`,
    interaction: 'answer',
    prompt: 'Which action still works when the content, device, and browser evidence change?',
    correct: `Identify the purpose, apply the defined ${model.id.replaceAll('-', ' ')} contract, and verify the result with more than appearance.`,
    distractors: [
      `Copy the visible ${model.context} pixels and assume the underlying relationships transfer.`,
      `Use the longest available element or attribute name because it must be more semantic.`,
    ],
    competencyId: model.id,
  });
  builder.addReflect({
    title: `Defend the ${model.context} repair`,
    prompt: `Explain why “${model.misconception}” is unreliable and name the evidence that would verify the repair.`,
    competencyId: model.id,
    terms: model.terms,
  });
  builder.addCode({
    title: `Build the ${model.context} increment`,
    prompt: model.codeTask,
    competencyId: model.id,
    requirements: model.requirements,
  });
  return finalizeActivity(meta, builder);
}

const masterMilestones = [
  ['Declare standards-mode HTML', '<!doctype html>', 'html-document-boilerplate'],
  ['Identify the document language', '<html lang="en">', 'html-document-boilerplate'],
  ['Create the metadata container', '<head>', 'html-elements-nesting'],
  ['Declare UTF-8 encoding', '<meta charset="utf-8">', 'html-document-boilerplate'],
  ['Configure responsive viewport behavior', 'name="viewport"', 'html-document-boilerplate'],
  ['Write a useful tab title', '<title>', 'html-document-boilerplate'],
  ['Add a search description', 'name="description"', 'html-attributes'],
  ['Open the visible document body', '<body>', 'html-elements-nesting'],
  ['Create a page header', '<header>', 'html-elements-nesting'],
  ['Name the page topic', '<h1>', 'html-text-headings-lists'],
  ['Write the audience-facing introduction', '<p>', 'html-text-headings-lists'],
  ['Create the primary content region', '<main', 'html-elements-nesting'],
  ['Add a service section target', '<section id="services">', 'html-attributes'],
  ['Label the service section', '<h2>Services</h2>', 'html-text-headings-lists'],
  ['Represent the service collection', '<ul>', 'html-text-headings-lists'],
  ['Add the first service item', '<li>', 'html-text-headings-lists'],
  ['Link a project-relative detail page', 'href="services/', 'html-links-urls'],
  ['Link the official city resource', 'href="https://', 'html-links-urls'],
  ['Add an in-page fragment route', 'href="#services"', 'html-links-urls'],
  ['Offer an email action', 'href="mailto:', 'html-links-urls'],
  ['Offer a telephone action', 'href="tel:', 'html-links-urls'],
  ['Group a photo with its caption', '<figure>', 'html-images-alt'],
  ['Load the service photo', '<img', 'html-images-alt'],
  ['Describe the informative photo', 'alt="', 'html-images-alt'],
  ['Reserve the image width', 'width="', 'html-images-alt'],
  ['Reserve the image height', 'height="', 'html-images-alt'],
  ['Caption the photo', '<figcaption>', 'html-images-alt'],
  ['Create a scalable status symbol', '<svg', 'html-svg'],
  ['Set vector coordinates', 'viewBox=', 'html-svg'],
  ['Name the meaningful vector', '<title>', 'html-svg'],
  ['Create the advisory audio player', '<audio controls', 'html-audio'],
  ['Offer an audio source', 'type="audio/', 'html-audio'],
  ['Link the complete transcript', 'transcript', 'html-audio'],
  ['Create the briefing video player', '<video controls', 'html-video'],
  ['Reserve video dimensions', 'poster=', 'html-video'],
  ['Offer a video source', 'type="video/', 'html-video'],
  ['Attach synchronized captions', 'kind="captions"', 'html-video'],
  ['Provide video fallback access', 'Download the video', 'html-video'],
  ['Create the public meeting embed', '<iframe', 'html-iframe'],
  ['Name and defer the embed', 'loading="lazy"', 'html-iframe'],
  ['Constrain embedded capabilities', 'sandbox=', 'html-iframe'],
  ['Close with source and contact context', '<footer>', 'html-validation-tools'],
];

const mappedPlans = {
  'mapped-workshop-curriculum-outline': {
    title: 'Workshop: Architect the Heat-Relief Information Hub',
    context: 'information-architecture wall',
    focus: ['html-document-boilerplate', 'html-elements-nesting', 'html-text-headings-lists'],
    artifactId: 'heat-relief-information-hub',
  },
  'mapped-lab-debug-camperbots-profile-page': {
    title: 'Lab: Repair a Volunteer Profile before Publication',
    context: 'volunteer profile incident',
    focus: ['html-elements-nesting', 'html-attributes'],
    artifactId: 'volunteer-profile-repair',
  },
  'mapped-lecture-understanding-html-attributes': {
    title: 'Field Briefing: Attributes that Change Real Behavior',
    context: 'attribute contract briefing',
    focus: ['html-attributes'],
  },
  'mapped-lab-debug-pet-adoption-page': {
    title: 'Lab: Recover a Broken Animal-Support Directory',
    context: 'animal support directory incident',
    focus: ['html-elements-nesting', 'html-attributes'],
    artifactId: 'animal-support-repair',
  },
  'mapped-lecture-understanding-the-html-boilerplate': {
    title: 'Field Briefing: What Every Deployable Document Declares',
    context: 'document launch briefing',
    focus: ['html-document-boilerplate'],
  },
  'mapped-workshop-cat-photo-app': {
    title: 'Workshop: Build a Neighborhood Animal-Support Hub',
    context: 'animal-support hub build',
    focus: competencyIds.slice(0, 7),
    artifactId: 'animal-support-hub',
  },
  'mapped-lab-recipe-page': {
    title: 'Lab: Publish an Emergency Community-Meal Guide',
    context: 'community meal handoff',
    focus: ['html-document-boilerplate', 'html-text-headings-lists', 'html-images-alt'],
    artifactId: 'community-meal-guide',
  },
  'mapped-lecture-html-fundamentals': {
    title: 'Field Briefing: Read HTML as a Relationship Language',
    context: 'document relationship briefing',
    focus: ['html-document-boilerplate', 'html-elements-nesting', 'html-text-headings-lists'],
  },
  'mapped-workshop-bookstore-page': {
    title: 'Workshop: Build a Neighborhood Library Shelf',
    context: 'library shelf build',
    focus: [
      'html-elements-nesting',
      'html-attributes',
      'html-text-headings-lists',
      'html-links-urls',
    ],
    artifactId: 'neighborhood-library-shelf',
  },
  'mapped-lecture-understanding-how-html-affects-seo': {
    title: 'Field Briefing: Human Structure and Search Signals',
    context: 'search-result evidence briefing',
    focus: ['html-document-boilerplate', 'html-text-headings-lists', 'html-links-urls'],
  },
  'mapped-lab-travel-agency-page': {
    title: 'Lab: Deliver an Accessible Transit-Visit Guide',
    context: 'transit visit guide handoff',
    focus: ['html-text-headings-lists', 'html-links-urls', 'html-images-alt'],
    artifactId: 'transit-visit-guide',
  },
  'mapped-lecture-working-with-audio-and-video-elements': {
    title: 'Field Briefing: Native Media and Equivalent Access',
    context: 'media access briefing',
    focus: ['html-audio', 'html-video'],
  },
  'mapped-workshop-html-music-player': {
    title: 'Workshop: Build an Oral-History Audio Archive',
    context: 'oral-history archive build',
    focus: ['html-text-headings-lists', 'html-links-urls', 'html-audio'],
    artifactId: 'oral-history-archive',
  },
  'mapped-workshop-html-video-player': {
    title: 'Workshop: Build a Captioned Safety-Briefing Player',
    context: 'safety briefing player build',
    focus: ['html-text-headings-lists', 'html-video'],
    artifactId: 'safety-briefing-player',
  },
  'mapped-lab-html-audio-and-video-player': {
    title: 'Lab: Assemble a Community Media Center',
    context: 'community media center handoff',
    focus: ['html-audio', 'html-video', 'html-links-urls'],
    artifactId: 'community-media-center',
  },
  'mapped-lecture-working-with-images-and-svgs': {
    title: 'Field Briefing: Raster Purpose and Vector Meaning',
    context: 'image and vector evidence briefing',
    focus: ['html-images-alt', 'html-svg'],
  },
  'mapped-workshop-build-a-heart-icon': {
    title: 'Workshop: Build an Accessible Service-Status Icon',
    context: 'service status icon build',
    focus: ['html-svg'],
    artifactId: 'service-status-icon',
  },
  'mapped-lecture-working-with-media': {
    title: 'Field Briefing: Choose the Right Media Delivery Pattern',
    context: 'media delivery briefing',
    focus: ['html-images-alt', 'html-svg', 'html-audio', 'html-video', 'html-iframe'],
  },
  'mapped-workshop-build-a-video-display-using-iframe': {
    title: 'Workshop: Embed a Constrained Public-Meeting Stream',
    context: 'public meeting stream build',
    focus: ['html-iframe', 'html-links-urls'],
    artifactId: 'public-meeting-stream',
  },
  'mapped-lab-video-compilation-page': {
    title: 'Lab: Publish a Training-Video Library',
    context: 'training video library handoff',
    focus: ['html-video', 'html-iframe', 'html-links-urls'],
    artifactId: 'training-video-library',
  },
  'mapped-lecture-working-with-links': {
    title: 'Field Briefing: URLs, Destinations, and Link Purpose',
    context: 'link destination briefing',
    focus: ['html-links-urls'],
  },
  'mapped-review-basic-html': {
    title: 'Cumulative Review: Triage a Failing Public Site',
    context: 'HTML incident review',
    focus: competencyIds,
  },
  'mapped-quiz-basic-html': {
    title: 'Readiness Exam: Documents, Links, Images, and Media',
    context: 'HTML readiness exam',
    focus: competencyIds,
  },
};

function mappedMeta(id, kind, targetSteps, plan) {
  return {
    id,
    kind,
    title: plan.title,
    context: plan.context,
    why: 'each decision must preserve document meaning, user control, portability, and inspectable evidence.',
    explanation: plan.focus
      .map((entry) => modelById.get(entry)?.concept)
      .filter(Boolean)
      .join(' '),
    summary: `${plan.title} uses an original ${plan.context} scenario to retrieve earlier HTML skills, add a bounded artifact layer, and verify transfer with source and browser evidence.`,
    objectives: [
      `Retrieve ${plan.focus.map((entry) => entry.replaceAll('-', ' ')).join(', ')} without step-by-step imitation.`,
      `Produce and verify a real ${plan.context} artifact or evidence report.`,
      'Preserve earlier valid requirements while diagnosing changed content and constraints.',
    ],
    coverage: {
      introduces: [],
      reinforces: [...new Set(plan.focus)],
      assesses: [...new Set(plan.focus)],
    },
    difficulty: kind === 'theory' ? 'practice' : kind === 'quiz' ? 'mastery' : 'challenge',
    estimatedMinutes: Math.max(35, targetSteps * (kind === 'workshop' ? 7 : 5)),
    artifactId: plan.artifactId,
    starterFiles: blankArtifact,
  };
}

function makeTheory(meta, focusModel) {
  const builder = activityBuilder(meta);
  builder.addChoice({
    title: `Predict the ${meta.context} outcome`,
    interaction: 'predict',
    prompt: `Which claim should the team test first in the ${meta.context}?`,
    correct: focusModel.correct,
    distractors: focusModel.distractors,
    competencyId: focusModel.id,
  });
  builder.addOrder({
    title: `Order the ${meta.context} investigation`,
    prompt: `Arrange the evidence workflow before changing the ${meta.context} source.`,
    options: focusModel.sequence,
    competencyId: focusModel.id,
  });
  builder.addChoice({
    title: `Inspect the ${meta.context} contradiction`,
    interaction: 'inspect',
    prompt: 'Which conclusion distinguishes the source contract from a forgiving visual result?',
    correct: focusModel.correct,
    distractors: [focusModel.misconception, focusModel.distractors[1]],
    competencyId: focusModel.id,
    stimulus: {
      kind: 'dom-tree',
      title: `${meta.title} · source versus DOM`,
      caption: `A simplified observation collected during the ${meta.context}.`,
      lines: [
        {
          id: `${meta.id}-source-observation`,
          label: 'source',
          text: focusModel.misconception,
          tone: 'problem',
        },
        {
          id: `${meta.id}-dom-observation`,
          label: 'finding',
          text: focusModel.correct,
          tone: 'focus',
        },
      ],
    },
  });
  builder.addChoice({
    title: `Read the ${meta.context} contract`,
    interaction: 'read',
    prompt: 'Which practice follows the explanation and remains valid in a changed document?',
    correct: focusModel.correct,
    distractors: [focusModel.distractors[1], focusModel.misconception],
    competencyId: focusModel.id,
  });
  builder.addChoice({
    title: `Resolve the ${meta.context} misconception`,
    interaction: 'answer',
    prompt: `Which response corrects “${focusModel.misconception}”?`,
    correct: focusModel.correct,
    distractors: focusModel.distractors,
    competencyId: focusModel.id,
  });
  builder.addReflect({
    title: `Write the ${meta.context} evidence rule`,
    prompt: 'Explain the source evidence, browser evidence, and retest that support the decision.',
    competencyId: focusModel.id,
    terms: focusModel.terms,
  });
  return finalizeActivity(meta, builder);
}

function workshopMilestones(plan) {
  const focused = masterMilestones.filter((entry) => plan.focus.includes(entry[2]));
  if (focused.length === 0) throw new Error(`No build milestones cover ${plan.title}`);
  return focused;
}

function makeWorkshop(meta, targetSteps, plan) {
  const builder = activityBuilder(meta);
  const milestones = workshopMilestones(plan);
  let milestoneIndex = 0;
  for (let index = 0; index < targetSteps; index += 1) {
    const focusId = plan.focus[index % plan.focus.length];
    const focusModel = modelById.get(focusId);
    const cycle = index % 8;
    if (cycle === 2) {
      builder.addChoice({
        title: `Inspect build checkpoint ${index + 1} in the ${meta.context}`,
        interaction: 'inspect',
        prompt: `Which evidence should control checkpoint ${index + 1} before more source is added?`,
        correct: focusModel.correct,
        distractors: [focusModel.misconception, focusModel.distractors[1]],
        competencyId: focusId,
        stimulus: {
          kind: 'browser',
          title: `${meta.title} · checkpoint ${index + 1}`,
          caption: `Preview and source observations at checkpoint ${index + 1} of the ${meta.context}.`,
          lines: [
            {
              id: `${meta.id}-checkpoint-${index + 1}-preview`,
              label: 'preview',
              text: 'Visible output exists, but not every source relationship has been verified.',
              tone: 'neutral',
            },
            {
              id: `${meta.id}-checkpoint-${index + 1}-source`,
              label: 'source',
              text: focusModel.misconception,
              tone: 'problem',
            },
          ],
        },
      });
    } else if (cycle === 5) {
      builder.addChoice({
        title: `Debug build checkpoint ${index + 1} in the ${meta.context}`,
        interaction: 'debug',
        prompt:
          'Which repair reaches the relationship failure without deleting earlier valid work?',
        correct: focusModel.correct,
        distractors: [
          `Ignore checkpoint ${index + 1} because one browser recovered the ${meta.context} source.`,
          `Replace the complete ${meta.context} artifact instead of isolating the failing relationship.`,
        ],
        competencyId: focusId,
      });
    } else if (cycle === 7) {
      builder.addOrder({
        title: `Rehearse checkpoint ${index + 1} for the ${meta.context}`,
        prompt:
          'Put this verification cycle in the order that exposes the earliest source failure.',
        options: focusModel.sequence,
        competencyId: focusId,
      });
    } else {
      const [task, expected, competencyId] = milestones[milestoneIndex % milestones.length];
      milestoneIndex += 1;
      builder.addCode({
        title: `${task} · ${meta.context} checkpoint ${index + 1}`,
        prompt: `${task} in the existing ${meta.context} artifact, then rerun every accumulated check.`,
        competencyId,
        requirements: [[`increment-${index + 1}`, expected]],
      });
    }
  }
  return finalizeActivity(meta, builder);
}

function makeLab(meta, plan) {
  const builder = activityBuilder(meta);
  const milestones = workshopMilestones(plan).slice(0, 4);
  const focusModel = modelById.get(plan.focus[0]);
  builder.addChoice({
    title: `Triage the ${meta.context}`,
    interaction: 'predict',
    prompt: 'Which observation identifies the highest-value source boundary to test first?',
    correct: focusModel.correct,
    distractors: focusModel.distractors,
    competencyId: focusModel.id,
  });
  builder.addCode({
    title: `${milestones[0][0]} · ${meta.context}`,
    prompt: `Apply the first bounded repair in the ${meta.context} artifact.`,
    competencyId: milestones[0][2],
    requirements: [['repair-one', milestones[0][1]]],
  });
  builder.addChoice({
    title: `Inspect the first ${meta.context} retest`,
    interaction: 'inspect',
    prompt: 'Which conclusion is supported after the first repair but before the whole lab passes?',
    correct: focusModel.correct,
    distractors: [focusModel.misconception, focusModel.distractors[1]],
    competencyId: focusModel.id,
  });
  builder.addCode({
    title: `${milestones[1][0]} · ${meta.context}`,
    prompt: `Add the second repair while preserving the first passing requirement.`,
    competencyId: milestones[1][2],
    requirements: [['repair-two', milestones[1][1]]],
  });
  builder.addOrder({
    title: `Reconstruct the ${meta.context} root cause`,
    prompt: 'Arrange the investigation from reproducible symptom to verified repair.',
    options: [
      'Capture the failing source and observable symptom',
      'Inspect source, DOM, and relevant accessibility evidence',
      'Change the smallest root-cause relationship',
      'Rerun the complete requirement set',
    ],
    competencyId: focusModel.id,
  });
  builder.addCode({
    title: `${milestones[2][0]} · ${meta.context}`,
    prompt: `Complete the third independent repair and keep both earlier checks green.`,
    competencyId: milestones[2][2],
    requirements: [['repair-three', milestones[2][1]]],
  });
  builder.addReflect({
    title: `Defend the ${meta.context} repair strategy`,
    prompt:
      'Explain which evidence found the source cause and why a screenshot alone could not prove the repair.',
    competencyId: focusModel.id,
    terms: focusModel.terms,
  });
  builder.addCode({
    title: `${milestones[3][0]} · ${meta.context}`,
    prompt: `Finish the handoff artifact and run all four cumulative source checks.`,
    competencyId: milestones[3][2],
    requirements: [['repair-four', milestones[3][1]]],
  });
  return finalizeActivity(meta, builder);
}

function makeReviewOrQuiz(meta, targetSteps, plan) {
  const builder = activityBuilder(meta);
  for (let index = 0; index < targetSteps; index += 1) {
    const focusId = plan.focus[index % plan.focus.length];
    const model = modelById.get(focusId);
    const phase = index % 5;
    if (phase === 1) {
      builder.addOrder({
        title: `Sequence ${index + 1}: ${model.context}`,
        prompt: `Reconstruct the ${model.id.replaceAll('-', ' ')} workflow without hints from the original activity.`,
        options: model.sequence,
        competencyId: focusId,
      });
    } else if (phase === 3 && meta.kind === 'review') {
      builder.addReflect({
        title: `Case note ${index + 1}: ${model.context}`,
        prompt: `Explain the defect, governing contract, and verification evidence for this changed ${model.context}.`,
        competencyId: focusId,
        terms: model.terms,
      });
    } else {
      builder.addChoice({
        title: `${phase === 0 ? 'Predict' : phase === 2 ? 'Inspect' : 'Decide'} ${index + 1}: ${model.context}`,
        interaction: phase === 0 ? 'predict' : phase === 2 ? 'inspect' : 'answer',
        prompt: `Which claim survives a changed ${model.context} case with incomplete visual evidence?`,
        correct: model.correct,
        distractors: [model.misconception, model.distractors[index % 2]],
        competencyId: focusId,
      });
    }
  }
  return finalizeActivity(meta, builder);
}

const mappedBlueprintById = new Map(
  blueprintModule.activities
    .filter((activity) => activity.reference)
    .map((activity) => [activity.id, activity])
);
const conceptActivityByCompetency = new Map();
const introduced = [];
for (const model of models) {
  conceptActivityByCompetency.set(model.id, makeConceptActivity(model, [...introduced]));
  introduced.push(model.id);
}

const mappedActivities = new Map();
for (const [id, plan] of Object.entries(mappedPlans)) {
  const blueprintActivity = mappedBlueprintById.get(id);
  if (!blueprintActivity) throw new Error(`Mapped blueprint activity ${id} is missing.`);
  const kind = blueprintActivity.kind;
  const minimum = { theory: 6, workshop: 8, lab: 8, review: 14, quiz: 20 }[kind] ?? 8;
  const targetSteps = Math.max(minimum, blueprintActivity.reference.upstreamChallengeCount);
  const meta = mappedMeta(id, kind, targetSteps, plan);
  const activity =
    kind === 'theory'
      ? makeTheory(meta, modelById.get(plan.focus[0]))
      : kind === 'workshop'
        ? makeWorkshop(meta, targetSteps, plan)
        : kind === 'lab'
          ? makeLab(meta, plan)
          : makeReviewOrQuiz(meta, targetSteps, plan);
  mappedActivities.set(id, activity);
}

const activityIds = [
  'document-launch-checklist',
  'mapped-lecture-understanding-the-html-boilerplate',
  'document-tree-builder',
  'attribute-behavior-clinic',
  'mapped-lecture-understanding-html-attributes',
  'content-hierarchy-desk',
  'mapped-lecture-html-fundamentals',
  'mapped-workshop-curriculum-outline',
  'mapped-lab-debug-camperbots-profile-page',
  'mapped-lab-debug-pet-adoption-page',
  'link-destination-control',
  'image-purpose-audit',
  'vector-meaning-workbench',
  'mapped-workshop-cat-photo-app',
  'mapped-lab-recipe-page',
  'mapped-lecture-working-with-links',
  'mapped-workshop-bookstore-page',
  'mapped-lecture-understanding-how-html-affects-seo',
  'mapped-lab-travel-agency-page',
  'mapped-lecture-working-with-images-and-svgs',
  'mapped-workshop-build-a-heart-icon',
  'audio-equivalence-studio',
  'captioned-video-bay',
  'mapped-lecture-working-with-audio-and-video-elements',
  'mapped-workshop-html-music-player',
  'mapped-workshop-html-video-player',
  'mapped-lab-html-audio-and-video-player',
  'embed-permission-gate',
  'mapped-lecture-working-with-media',
  'mapped-workshop-build-a-video-display-using-iframe',
  'mapped-lab-video-compilation-page',
  'markup-forensics-room',
  'mapped-review-basic-html',
  'mapped-quiz-basic-html',
];
const activities = activityIds.map((activityId) => {
  const concept = [...conceptActivityByCompetency.values()].find(
    (activity) => activity.id === activityId
  );
  const activity = concept ?? mappedActivities.get(activityId);
  if (!activity) throw new Error(`Missing authored activity ${activityId}`);
  return activity;
});
activities.forEach((activity, index) => {
  activity.prerequisites = [
    index === 0 ? 'evacuation-resource-transfer-lab' : activities[index - 1].id,
  ];
});

const module = {
  schemaVersion: 2,
  id: moduleId,
  courseId,
  title: 'Documents, Content, Links, and Media',
  description:
    'Build and audit public-information documents from the shell outward: valid trees, purposeful attributes, explicit text structure, trustworthy destinations, equivalent images and media, constrained embeds, and validator-led debugging.',
  order: 2,
  objectives: [
    'Author a complete portable HTML document and explain its source-to-DOM relationships.',
    'Structure headings, prose, lists, links, images, vectors, audio, video, and embeds by purpose rather than appearance.',
    'Carry a real artifact through cumulative code increments while transferring the same skills to unfamiliar labs.',
    'Use source validation, browser inspection, accessibility evidence, and retesting to diagnose root causes.',
  ],
  competencyIds,
  prerequisites: ['computer-browser-foundations'],
  activityIds,
};

const coursePath = path.join(outputRoot, 'course.json');
const course = JSON.parse(await readFile(coursePath, 'utf8'));
const htmlCompetencyIdSet = new Set(competencyIds);
const retainedCompetencies = course.competencies.filter(
  (competency) => !htmlCompetencyIdSet.has(competency.id)
);
const foundationBoundary = retainedCompetencies.findIndex(
  (competency) => competency.id === 'web-research-verification'
);
retainedCompetencies.splice(foundationBoundary + 1, 0, ...competencies);
course.competencies = retainedCompetencies;
const foundationIndex = course.moduleIds.indexOf('computer-browser-foundations');
course.moduleIds = course.moduleIds.filter((existingModuleId) => existingModuleId !== moduleId);
course.moduleIds.splice(foundationIndex + 1, 0, moduleId);
course.estimatedHours = Math.max(course.estimatedHours, 4.7);

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
  `Wrote ${activities.length} authored HTML activities with ${interactionCount} cumulative interactions across ${competencyIds.length} competencies.`
);
