import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const courseId = 'responsive-web-design';
const moduleId = 'computer-browser-foundations';
const outputRoot = path.join(process.cwd(), 'content', 'v2', 'courses', courseId);

const competencies = [
  {
    id: 'computer-systems-model',
    statement:
      'Explain how hardware, operating systems, applications, and data cooperate to run a web page.',
    knowledgeType: 'conceptual',
    level: 'explain',
    prerequisiteIds: [],
    misconceptions: [
      'A browser performs every hardware and operating-system responsibility by itself.',
    ],
    masteryEvidence: [
      'A systems trace correctly connects input, processing, storage, browser work, graphics work, and output.',
    ],
  },
  {
    id: 'files-folders-paths',
    statement:
      'Create, organize, identify, and reference web project files using reliable paths and extensions.',
    knowledgeType: 'procedural',
    level: 'apply',
    prerequisiteIds: ['computer-systems-model'],
    misconceptions: [
      'A displayed filename always proves the actual extension, location, and file type.',
    ],
    masteryEvidence: [
      'A project keeps loading its resources after the complete project folder moves to a new location.',
    ],
  },
  {
    id: 'internet-web-model',
    statement:
      'Distinguish the internet, web, browser, server, URL, request, response, and local-file roles.',
    knowledgeType: 'conceptual',
    level: 'explain',
    prerequisiteIds: ['files-folders-paths'],
    misconceptions: ['The internet and the web are interchangeable names for the same system.'],
    masteryEvidence: [
      'A request trace identifies the browser, network, server, response, and rendered document without confusing them with local storage access.',
    ],
  },
  {
    id: 'browser-rendering-model',
    statement:
      'Trace how a browser turns saved HTML source into a document tree, accessibility information, layout, and pixels.',
    knowledgeType: 'conceptual',
    level: 'analyze',
    prerequisiteIds: ['internet-web-model'],
    misconceptions: [
      'The browser displays source text directly without parsing, constructing objects, or recovering from errors.',
    ],
    masteryEvidence: [
      'A learner predicts and verifies how a source change affects the DOM and rendered page.',
    ],
  },
  {
    id: 'browser-devtools',
    statement:
      'Use browser developer tools to inspect source-derived structure, styles, layout, accessibility, and network evidence.',
    knowledgeType: 'strategic',
    level: 'apply',
    prerequisiteIds: ['browser-rendering-model'],
    misconceptions: [
      'Changing a value in developer tools permanently edits the saved project source.',
    ],
    masteryEvidence: [
      'A defect report links an observed problem to specific DevTools evidence, a saved-source cause, and a verified repair.',
    ],
  },
  {
    id: 'web-research-verification',
    statement:
      'Find, compare, and verify technical information using primary specifications and official documentation.',
    knowledgeType: 'metacognitive',
    level: 'evaluate',
    prerequisiteIds: ['browser-devtools'],
    misconceptions: [
      'The first search result is current and authoritative because it ranks above primary documentation.',
    ],
    masteryEvidence: [
      'A technical decision cites a current primary source and connects the documented claim to reproducible browser evidence.',
    ],
  },
];

const models = {
  systems: {
    competencyId: 'computer-systems-model',
    short: 'System chain',
    why: 'Separating system responsibilities makes a visible symptom traceable to the layer that can cause it.',
    concept:
      'A web page is an outcome of cooperation. Input hardware reports an action; the operating system coordinates storage, memory, processes, and devices; the browser parses document data; graphics work prepares output; and the display emits pixels. The HTML file is data, not a self-running application.',
    terms: ['operating system', 'browser', 'display'],
    sequence: [
      ['system-input', 'Input hardware reports the open-file action'],
      ['system-storage', 'The operating system reads document bytes from storage'],
      ['system-browser', 'The browser parses the received bytes and prepares output'],
      ['system-display', 'Graphics hardware and the display produce visible pixels'],
    ],
    stimulusKind: 'terminal',
    stimulusTitle: 'System event trace',
    stimulusCaption: 'A simplified trace captured while a saved notice opens.',
    stimulusLines: [
      ['system-event-one', 'input', 'pointer double-click reported', 'focus'],
      ['system-event-two', 'os', 'read community-notice/notice.html', 'good'],
      ['system-event-three', 'browser', 'parsed 428 document bytes', 'good'],
      ['system-event-four', 'display', 'frame presented at 16.7 ms', 'neutral'],
    ],
    decisions: [
      [
        'Assign the responsibilities',
        'Which account includes every required layer?',
        'Input reaches the operating system, which reads data for the browser to process before graphics and display hardware present pixels.',
        'The HTML file wakes the monitor and directly instructs it which characters to illuminate.',
        'The browser performs input, storage access, graphics processing, and display output without operating-system or hardware services.',
      ],
      [
        'Interpret the trace',
        'What does the read event establish?',
        'The operating system supplied stored document bytes before browser parsing began.',
        'The browser permanently rewrote the file as soon as the pointer was clicked.',
        'The display requested HTML tags directly from storage.',
      ],
      [
        'Locate a failure',
        'The file bytes are read, but no browser process starts. Which boundary should be investigated next?',
        'The operating-system handoff that launches or addresses the browser application.',
        'The CSS color selected by the page author.',
        'The monitor brightness setting, because no parsing event exists yet.',
      ],
      [
        'Correct the mental model',
        'Which statement about HTML is defensible?',
        'HTML is document data interpreted by a browser process running with operating-system and hardware support.',
        'HTML is executable machine code that runs without an application.',
        'HTML is a physical display protocol sent directly to the monitor.',
      ],
    ],
  },
  files: {
    competencyId: 'files-folders-paths',
    short: 'Project paths',
    why: 'Portable paths preserve the relationship between project resources when the containing folder moves.',
    concept:
      'A project is a directory tree. A filename includes its real extension, and a relative path describes one resource from the current document location. Keeping related resources inside the project and testing after moving the whole folder exposes machine-specific absolute paths and case mismatches.',
    terms: ['folder', 'relative path', 'extension'],
    sequence: [
      ['path-root', 'Create one project root folder'],
      ['path-files', 'Place the document and resource folders inside the root'],
      ['path-reference', 'Reference resources from the document with relative paths'],
      ['path-move', 'Move the complete root and retest every resource'],
    ],
    stimulusKind: 'file-tree',
    stimulusTitle: 'Community notice handoff',
    stimulusCaption: 'The delivered project tree and the path currently written in notice.html.',
    stimulusLines: [
      ['path-tree-root', 'folder', 'community-notice/', 'good'],
      ['path-tree-html', 'file', 'community-notice/notice.html', 'good'],
      ['path-tree-image', 'file', 'community-notice/images/map.svg', 'good'],
      ['path-tree-reference', 'source', 'src="/home/lee/Desktop/map.svg"', 'problem'],
    ],
    decisions: [
      [
        'Choose a portable reference',
        'Which source value survives moving community-notice as one folder?',
        'images/map.svg',
        '/home/lee/Desktop/map.svg',
        'C:\\Users\\Lee\\map.svg',
      ],
      [
        'Read the real filename',
        'The file manager shows schedule.html, but its type is Plain Text and hidden extensions are enabled. What should be checked?',
        'Reveal full extensions because the file may actually be schedule.html.txt.',
        'Rename the containing folder to HTML so the operating system changes the file type.',
        'Assume the browser ignores extensions and opens every file as HTML.',
      ],
      [
        'Diagnose the moved image',
        'Why does the current source reference fail on another learner’s computer?',
        'It names one user’s absolute machine location instead of the project-relative image location.',
        'SVG files can only load from a desktop folder.',
        'The browser requires every image to be copied into the HTML source text.',
      ],
      [
        'Check letter case',
        'Source requests Images/Map.svg, while the tree contains images/map.svg. What is the durable repair?',
        'Make the path casing exactly match the directory and filename casing.',
        'Add spaces until both strings have the same character count.',
        'Depend on all servers treating differently cased paths as identical.',
      ],
    ],
  },
  network: {
    competencyId: 'internet-web-model',
    short: 'Load journey',
    why: 'Local-file access and web requests can display similar pages but fail at different boundaries.',
    concept:
      'The internet is network infrastructure; the web is a system of linked resources exchanged with web protocols. A URL identifies how and where a browser should request a resource. For a web URL, the browser uses network services to send a request and receives a server response. A file URL reads local storage without contacting that web server.',
    terms: ['URL', 'request', 'response'],
    sequence: [
      ['network-url', 'The learner enters an HTTPS URL'],
      ['network-request', 'The browser sends a request toward the identified server'],
      ['network-response', 'The server returns a status, headers, and resource bytes'],
      ['network-render', 'The browser processes the response and renders the document'],
    ],
    stimulusKind: 'network-map',
    stimulusTitle: 'Two notice loads',
    stimulusCaption: 'Evidence from opening a saved file and visiting the published notice.',
    stimulusLines: [
      ['network-local', 'local', 'file:///home/learner/community-notice/notice.html', 'focus'],
      ['network-web', 'web', 'https://notices.example/repair-clinic', 'focus'],
      ['network-status', 'response', '200 OK · text/html · 428 B', 'good'],
      ['network-server', 'remote', 'notices.example responded in 84 ms', 'neutral'],
    ],
    decisions: [
      [
        'Distinguish internet and web',
        'Which relationship is accurate?',
        'The internet supplies network infrastructure; the web uses it to exchange linked resources through web protocols.',
        'The web is the physical cables, while the internet is only the pages displayed in browsers.',
        'Internet and web are exact synonyms with no useful distinction.',
      ],
      [
        'Identify the local journey',
        'Which evidence proves one load did not require notices.example?',
        'The file URL identifies a resource on local storage.',
        'The HTTPS response includes a 200 status.',
        'The remote host responded in 84 milliseconds.',
      ],
      [
        'Assign request and response',
        'Which event belongs to the server side of the web exchange?',
        'Returning an HTTP status, headers, and resource bytes to the browser.',
        'Painting the received document into the learner’s browser window.',
        'Interpreting a pointer click on the learner’s input device.',
      ],
      [
        'Choose the next evidence',
        'The local file works, but the HTTPS URL returns 404. What should be inspected first?',
        'The requested URL path and the server response evidence.',
        'The local monitor cable, because the file rendered successfully.',
        'The HTML heading color, because status codes are produced by CSS.',
      ],
    ],
  },
  browser: {
    competencyId: 'browser-rendering-model',
    short: 'Browser pipeline',
    why: 'Source, the browser-built DOM, layout, and pixels are related stages rather than interchangeable evidence.',
    concept:
      'A browser parses source into object models, applies error-recovery rules, derives accessibility information and styles, computes layout, and paints output. Source shows the input text; the DOM shows the current parsed structure; computed styles and layout show resolved presentation; pixels show only the final visual result.',
    terms: ['source', 'DOM', 'pixels'],
    sequence: [
      ['browser-source', 'Document bytes arrive as source input'],
      ['browser-parse', 'The parser tokenizes source and applies recovery rules'],
      ['browser-dom', 'The browser constructs the current document tree'],
      ['browser-paint', 'Style, layout, and paint produce visible pixels'],
    ],
    stimulusKind: 'dom-tree',
    stimulusTitle: 'Recovered document tree',
    stimulusCaption: 'The browser-built structure after parsing malformed source.',
    stimulusLines: [
      ['browser-source-line', 'source', '<main><p>Open clinic', 'problem'],
      ['browser-dom-main', 'dom', 'MAIN', 'good'],
      ['browser-dom-paragraph', 'child', 'P "Open clinic"', 'good'],
      ['browser-dom-recovery', 'parser', 'end tags inferred before document end', 'focus'],
    ],
    decisions: [
      [
        'Separate source and DOM',
        'Which statement accounts for the recovered tree?',
        'Source is parser input; the DOM is the browser’s current constructed representation and may include recovery.',
        'Source and DOM must remain identical character for character after parsing.',
        'The DOM is a screenshot made from the final pixels.',
      ],
      [
        'Interpret visible success',
        'The malformed page looks acceptable. What can that appearance prove?',
        'Only that the browser produced plausible output; source and DOM evidence are still needed to judge structure.',
        'That the source is conforming because browsers refuse to recover from errors.',
        'That assistive technology receives the same pixels as a sighted user.',
      ],
      [
        'Choose structural evidence',
        'Which artifact best answers what nodes currently exist?',
        'The inspected DOM tree.',
        'A screenshot of the text color.',
        'The saved filename without its source contents.',
      ],
      [
        'Locate painting',
        'At which stage do resolved geometry and visual layers become displayable output?',
        'After style and layout, during painting and compositing toward pixels.',
        'Before source bytes reach the parser.',
        'When the operating system changes the file extension.',
      ],
    ],
  },
  devtools: {
    competencyId: 'browser-devtools',
    short: 'DevTools evidence',
    why: 'A deliberate panel choice turns browser inspection into evidence instead of random experimentation.',
    concept:
      'Developer tools expose different evidence: Elements for the current DOM, Styles and Computed for declared and resolved CSS, Layout for geometry, Accessibility for names and roles, Network for requests and responses, and Sources for loaded code. Temporary panel edits test a hypothesis but do not save project files.',
    terms: ['Elements', 'Network', 'saved source'],
    sequence: [
      ['tools-reproduce', 'Reproduce the defect and state the expected behavior'],
      ['tools-panel', 'Choose the panel that exposes the responsible layer'],
      ['tools-experiment', 'Run the smallest temporary experiment that tests the hypothesis'],
      ['tools-save', 'Repair saved source, reload, and verify the evidence again'],
    ],
    stimulusKind: 'code-diff',
    stimulusTitle: 'Temporary edit versus saved file',
    stimulusCaption: 'Evidence collected before and after reloading the page.',
    stimulusLines: [
      ['tools-elements', 'elements', '<h1>Repair clinic today</h1>', 'focus'],
      ['tools-file', 'saved', '<h1>Repair clinic</h1>', 'problem'],
      ['tools-reload', 'reload', '<h1>Repair clinic</h1>', 'neutral'],
      ['tools-note', 'result', 'temporary DOM edit disappeared', 'good'],
    ],
    decisions: [
      [
        'Choose the right panel',
        'A stylesheet request returns 404. Which panel provides the direct evidence?',
        'Network, filtered to the stylesheet request and response status.',
        'Elements, because DOM nodes generate every HTTP status.',
        'The color picker, because missing resources are color defects.',
      ],
      [
        'Interpret a reload',
        'Why did the edited heading revert?',
        'The Elements edit changed the current DOM experiment, not the saved HTML file.',
        'The monitor cached the old pixels inside the display cable.',
        'HTML headings are forbidden from being saved after DevTools opens.',
      ],
      [
        'Inspect an accessible name',
        'Which evidence best verifies the current role and accessible name of a control?',
        'The browser accessibility inspection for that control.',
        'Only the visible border color around the control.',
        'The Network response time for the HTML document.',
      ],
      [
        'Close the debugging loop',
        'What turns a successful temporary experiment into a verified repair?',
        'Apply the responsible change to saved source, reload from that source, and repeat the failing check.',
        'Leave DevTools open so its temporary state remains visible.',
        'Capture a screenshot and skip the original reproduction steps.',
      ],
    ],
  },
  research: {
    competencyId: 'web-research-verification',
    short: 'Source verification',
    why: 'Technical guidance is safer when authority, currency, scope, and browser evidence agree.',
    concept:
      'A useful technical question names the exact behavior and environment. Primary specifications define the platform; official documentation explains it; compatibility data narrows support; and a reduced browser test verifies the local claim. Search rank, confident tone, and copied snippets are not authority.',
    terms: ['primary source', 'version', 'browser evidence'],
    sequence: [
      ['research-question', 'State the exact behavior, environment, and uncertainty'],
      ['research-primary', 'Locate the relevant current primary or official source'],
      ['research-scope', 'Check version, date, scope, and compatibility limits'],
      ['research-test', 'Run a reduced browser test and record the evidence'],
    ],
    stimulusKind: 'browser',
    stimulusTitle: 'Conflicting guidance',
    stimulusCaption: 'Three sources returned for the same browser-behavior question.',
    stimulusLines: [
      [
        'research-result-one',
        'blog',
        '2018 · no cited specification · confident answer',
        'problem',
      ],
      ['research-result-two', 'standard', 'Living Standard · normative requirement', 'good'],
      ['research-result-three', 'docs', 'Updated 2026 · examples and compatibility notes', 'good'],
      ['research-result-four', 'test', 'reduced case reproduces in current browser', 'focus'],
    ],
    decisions: [
      [
        'Rank the evidence',
        'Which combination provides the strongest basis for a platform claim?',
        'A current primary requirement, scoped official explanation, and reproducible browser test.',
        'The first search snippet plus the number of advertisements on its page.',
        'An undated forum answer repeated by several copied blog posts.',
      ],
      [
        'Check source scope',
        'Before applying the standard text, what must be confirmed?',
        'That the cited section addresses the same feature, conditions, and current version under investigation.',
        'That the page uses the same brand colors as the project.',
        'That the search engine placed it above all official documentation.',
      ],
      [
        'Use a reduced test',
        'What does a minimal browser case contribute?',
        'It connects the documented claim to observable behavior while removing unrelated project variables.',
        'It replaces the need to identify the tested browser and version.',
        'It proves every browser and assistive technology behaves identically.',
      ],
      [
        'Record uncertainty',
        'Two current sources disagree and the test is inconclusive. What is the professional response?',
        'Document the conflict, environment, and uncertainty; avoid presenting the decision as settled fact.',
        'Choose the shortest source and delete evidence of the disagreement.',
        'Present the preferred answer as universal because uncertainty reduces confidence.',
      ],
    ],
  },
};

const activitySpecs = [
  {
    id: 'systems-signal-room',
    title: 'From Double-Click to Display: Map the Whole System',
    kind: 'theory',
    scenario: 'repair-cafe signal room',
    summary:
      'Investigate one saved notice from input event to visible output and replace browser-only explanations with a complete systems model.',
    objectives: [
      'Assign input, operating-system, storage, browser, graphics, and display responsibilities.',
      'Use an event trace to locate the boundary where a failed load stops.',
    ],
    modelKeys: ['systems'],
    introduces: ['computer-systems-model'],
    reinforces: [],
    assesses: ['computer-systems-model'],
    difficulty: 'foundation',
    estimatedMinutes: 50,
    pattern: 0,
  },
  {
    id: 'file-path-rescue',
    title: 'Path Detective: Recover a Moved Community Site',
    kind: 'workshop',
    scenario: 'community-site handoff',
    summary:
      'Repair a project that lost resources after a handoff by exposing real extensions, reading its tree, and replacing machine-specific paths.',
    objectives: [
      'Interpret a project tree and distinguish filenames, extensions, folders, and paths.',
      'Choose and verify relative references that survive moving the project root.',
    ],
    modelKeys: ['files', 'systems'],
    introduces: ['files-folders-paths'],
    reinforces: ['computer-systems-model'],
    assesses: ['files-folders-paths', 'computer-systems-model'],
    difficulty: 'foundation',
    estimatedMinutes: 55,
    pattern: 1,
  },
  {
    id: 'local-network-trace',
    title: 'Local File or Web Request? Trace Two Different Journeys',
    kind: 'lab',
    scenario: 'offline-and-online notice comparison',
    summary:
      'Compare a file URL with an HTTPS URL and trace exactly where storage, browser, network, server, request, and response responsibilities diverge.',
    objectives: [
      'Distinguish internet infrastructure, the web, browser behavior, and server behavior.',
      'Diagnose a local success paired with a web response failure.',
    ],
    modelKeys: ['network', 'files', 'systems'],
    introduces: ['internet-web-model'],
    reinforces: ['files-folders-paths', 'computer-systems-model'],
    assesses: ['internet-web-model', 'files-folders-paths'],
    difficulty: 'practice',
    estimatedMinutes: 60,
    pattern: 2,
  },
  {
    id: 'devtools-case-file',
    title: 'DevTools Evidence Kit: Prove What the Browser Built',
    kind: 'debug',
    scenario: 'temporary-fix dispute',
    summary:
      'Resolve a disputed browser fix by choosing evidence panels deliberately, testing a narrow hypothesis, repairing saved source, and verifying after reload.',
    objectives: [
      'Choose DevTools evidence that matches structure, style, accessibility, or network questions.',
      'Distinguish a temporary runtime experiment from a persisted source repair.',
    ],
    modelKeys: ['devtools', 'browser'],
    introduces: ['browser-devtools'],
    reinforces: ['browser-rendering-model'],
    assesses: ['browser-devtools', 'browser-rendering-model'],
    difficulty: 'practice',
    estimatedMinutes: 60,
    pattern: 3,
  },
  {
    id: 'source-verification-trial',
    title: 'Source Trial: Verify a Web-Platform Claim',
    kind: 'theory',
    scenario: 'conflicting-guidance hearing',
    summary:
      'Judge conflicting technical claims through a precise question, current primary sources, scoped official guidance, and a reduced browser test.',
    objectives: [
      'Evaluate technical sources for authority, currency, scope, and relevance.',
      'Connect a documented claim to reproducible browser evidence and recorded uncertainty.',
    ],
    modelKeys: ['research', 'devtools', 'browser'],
    introduces: ['web-research-verification'],
    reinforces: ['browser-devtools', 'browser-rendering-model'],
    assesses: ['web-research-verification', 'browser-devtools'],
    difficulty: 'practice',
    estimatedMinutes: 55,
    pattern: 4,
  },
  {
    id: 'foundation-incident-room',
    title: 'Incident Room: Explain the Page Without Hand-Waving',
    kind: 'theory',
    scenario: 'emergency-notice incident room',
    summary:
      'Reconstruct an unfamiliar page incident by labeling observed, inferred, and documented claims across all six foundation models.',
    objectives: [
      'Integrate system, file, network, rendering, tooling, and research responsibilities.',
      'Separate direct observations from inferences and verified documentation.',
    ],
    modelKeys: ['systems', 'network', 'browser', 'files', 'devtools', 'research'],
    introduces: [],
    reinforces: competencies.map((competency) => competency.id),
    assesses: ['computer-systems-model', 'internet-web-model', 'browser-rendering-model'],
    difficulty: 'practice',
    estimatedMinutes: 60,
    pattern: 5,
  },
  {
    id: 'filesystem-dispatch',
    title: 'Filesystem Dispatch: Repair a Broken Project Handoff',
    kind: 'workshop',
    scenario: 'zipped-resource-site dispatch',
    summary:
      'Triage a project with nested duplicate folders, hidden extensions, case mismatches, absolute paths, and misleading browser symptoms.',
    objectives: [
      'Repair a portable directory tree without losing the original evidence.',
      'Discriminate filesystem defects from network and rendering defects.',
    ],
    modelKeys: ['files', 'systems', 'browser', 'network', 'devtools', 'research'],
    introduces: [],
    reinforces: competencies.map((competency) => competency.id),
    assesses: ['files-folders-paths', 'browser-devtools'],
    difficulty: 'challenge',
    estimatedMinutes: 70,
    pattern: 1,
  },
  {
    id: 'research-sprint',
    title: 'Research Sprint: Find, Judge, and Test Web Guidance',
    kind: 'lab',
    scenario: 'standards-and-browser research sprint',
    summary:
      'Turn an ambiguous defect question into a reproducible investigation with primary sources, current scope, browser evidence, and honest uncertainty.',
    objectives: [
      'Search from a precise behavior question rather than a vague symptom.',
      'Produce a recommendation another developer can independently verify.',
    ],
    modelKeys: ['research', 'devtools', 'browser', 'network', 'files', 'systems'],
    introduces: [],
    reinforces: competencies.map((competency) => competency.id),
    assesses: ['web-research-verification', 'browser-devtools'],
    difficulty: 'challenge',
    estimatedMinutes: 70,
    pattern: 2,
  },
  {
    id: 'foundation-cold-case-review',
    title: 'Cold-Case Review: Diagnose Three Similar Failures',
    kind: 'review',
    scenario: 'three-lookalike failure archive',
    summary:
      'Retrieve the foundation models without notes and separate path, response, parsing, tooling, and evidence-quality failures that share a visible symptom.',
    objectives: [
      'Select the responsible model from sparse mixed evidence.',
      'Reject plausible alternatives and name the next discriminating observation.',
    ],
    modelKeys: ['network', 'files', 'browser', 'systems', 'research', 'devtools'],
    introduces: [],
    reinforces: competencies.map((competency) => competency.id),
    assesses: competencies.map((competency) => competency.id),
    difficulty: 'challenge',
    estimatedMinutes: 65,
    pattern: 3,
  },
  {
    id: 'foundation-checkpoint',
    title: 'Foundation Checkpoint: Defend the Evidence',
    kind: 'quiz',
    scenario: 'foundation defense checkpoint',
    summary:
      'Complete a broad selected-response and constructed-response checkpoint with misconception-specific correction across every foundation competency.',
    objectives: [
      'Demonstrate stable retrieval of all six models under reduced support.',
      'Explain why a tempting incorrect account conflicts with available evidence.',
    ],
    modelKeys: ['systems', 'files', 'network', 'browser', 'devtools', 'research'],
    introduces: [],
    reinforces: competencies.map((competency) => competency.id),
    assesses: competencies.map((competency) => competency.id),
    difficulty: 'mastery',
    estimatedMinutes: 75,
    pattern: 4,
    extraRounds: 1,
  },
  {
    id: 'notice-pipeline-workshop',
    title: 'Notice Pipeline Workshop: Repair, Trace, and Verify',
    kind: 'workshop',
    scenario: 'partially working repair-clinic notice',
    summary:
      'Take over one cumulative notice artifact while prompts fade: organize it, trace both load paths, inspect browser recovery, and verify a durable repair.',
    objectives: [
      'Coordinate all foundation competencies while support fades.',
      'Preserve earlier correct work while diagnosing and verifying a changed defect.',
    ],
    modelKeys: ['files', 'network', 'browser', 'devtools', 'systems', 'research'],
    introduces: [],
    reinforces: competencies.map((competency) => competency.id),
    assesses: competencies.map((competency) => competency.id),
    difficulty: 'mastery',
    estimatedMinutes: 90,
    pattern: 5,
    extraRounds: 1,
  },
  {
    id: 'evacuation-resource-transfer-lab',
    title: 'Independent Transfer: Publish an Evacuation Resource Card',
    kind: 'project',
    scenario: 'offline-and-online evacuation resource card',
    summary:
      'Plan, diagnose, test, and defend an unfamiliar public-safety resource that must work from a moved folder and a web URL without a supplied recipe.',
    objectives: [
      'Transfer all foundation models to an unfamiliar high-consequence context.',
      'Deliver a reproducible evidence packet with honest technical limits.',
    ],
    modelKeys: ['systems', 'files', 'network', 'browser', 'devtools', 'research'],
    introduces: [],
    reinforces: competencies.map((competency) => competency.id),
    assesses: competencies.map((competency) => competency.id),
    difficulty: 'mastery',
    estimatedMinutes: 120,
    pattern: 0,
    extraRounds: 1,
  },
];

const patterns = [
  ['predict', 'arrange', 'inspect', 'read', 'answer', 'inspect', 'predict', 'reflect'],
  ['inspect', 'predict', 'read', 'arrange', 'inspect', 'answer', 'predict', 'reflect'],
  ['answer', 'arrange', 'inspect', 'predict', 'read', 'inspect', 'answer', 'reflect'],
  ['inspect', 'read', 'predict', 'arrange', 'answer', 'inspect', 'predict', 'reflect'],
  ['predict', 'inspect', 'answer', 'read', 'arrange', 'inspect', 'answer', 'reflect'],
  ['answer', 'inspect', 'arrange', 'predict', 'read', 'inspect', 'answer', 'reflect'],
];

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildActivity(spec, activityIndex) {
  const interactions = patterns[spec.pattern];
  const roundCount = 1 + (spec.extraRounds ?? 0);
  const taskDefinitions = [];

  for (let round = 0; round < roundCount; round += 1) {
    interactions.forEach((interaction, interactionIndex) => {
      const modelKey = spec.modelKeys[(interactionIndex + round * 2) % spec.modelKeys.length];
      const model = models[modelKey];
      taskDefinitions.push({ interaction, model, round, interactionIndex });
    });
  }

  const steps = [];
  const checks = [];
  let choiceIndex = activityIndex;
  const decisionUses = new Map();
  const sequenceUses = new Map();

  taskDefinitions.forEach(({ interaction, model, round, interactionIndex }, index) => {
    const stepNumber = index + 1;
    const roundLabel = round === 0 ? spec.scenario : `${spec.scenario} transfer round`;
    const scenarioLabel = spec.scenario.split(' ').slice(-2).join(' ');
    const transferPrefix = round > 0 ? 'Transfer ' : '';
    const stepId = `${slug(spec.id)}-step-${String(stepNumber).padStart(2, '0')}`;
    const checkId = `${slug(spec.id)}-check-${String(stepNumber).padStart(2, '0')}`;
    const earlierIds = index ? [...new Set([steps[index - 1].id, steps[0].id])] : [];
    const base = {
      id: stepId,
      title: `${transferPrefix}${
        interaction === 'arrange'
          ? `Rebuild ${model.short.toLowerCase()}`
          : interaction === 'reflect'
            ? 'Write the evidence note'
            : model.decisions[choiceIndex % model.decisions.length][0]
      } · ${scenarioLabel}`,
      interaction,
      instruction: '',
      why: model.why,
      buildsOnStepIds: earlierIds,
      content: [],
      checkIds: [checkId],
      competencyIds:
        interaction === 'reflect'
          ? [...new Set(spec.modelKeys.map((key) => models[key].competencyId))]
          : [model.competencyId],
      hints: [],
      xp: interaction === 'reflect' ? 18 : interaction === 'arrange' ? 12 : 10,
    };

    if (interaction === 'arrange') {
      const priorSequenceUses = sequenceUses.get(model.competencyId) ?? 0;
      sequenceUses.set(model.competencyId, priorSequenceUses + 1);
      base.instruction = `Within the ${roundLabel}, reconstruct the ${model.short.toLowerCase()} in causal order.`;
      base.why = `${model.why} Ordering the ${roundLabel} exposes its first unsupported causal handoff.`;
      base.content = [
        {
          type: 'paragraph',
          text: `Do not order by vocabulary or visual position. Test whether each event creates the conditions required by the next event in the ${roundLabel}.`,
        },
      ];
      base.options = model.sequence.map(([id, text]) => ({
        id: `${slug(spec.id)}-${id}-${round}`,
        text:
          priorSequenceUses === 0
            ? text
            : `In the ${roundLabel} transfer, ${text.charAt(0).toLowerCase()}${text.slice(1)}.`,
      }));
      checks.push({
        id: checkId,
        type: 'order-equals',
        description: `The ${model.short.toLowerCase()} follows a defensible causal order.`,
        failureMessage: `Find the first event whose required input has not happened yet in the ${model.short.toLowerCase()}.`,
        hidden: false,
        competencyIds: [model.competencyId],
        expectedOptionIds: base.options.map((option) => option.id),
      });
    } else if (interaction === 'reflect') {
      const requiredTerms = [
        ...new Set(spec.modelKeys.flatMap((key) => models[key].terms).slice(0, 5)),
      ];
      base.instruction = `Write a concise case note for the ${roundLabel}. Explain the mechanism, cite observed evidence, and reject one plausible alternative.`;
      base.why = `Explaining the ${roundLabel} from memory exposes gaps that selected answers can hide. Cite the mechanism and its evidence.`;
      base.content = [
        {
          type: 'callout',
          tone: 'success',
          title: 'Transfer brief',
          text: `A teammate must be able to reproduce your conclusion without seeing the earlier answer choices. Name evidence and limits, not only the final verdict.`,
        },
      ];
      base.hints = [
        `Start the ${roundLabel} case note with the earliest observed event.`,
        `Use these ${roundLabel} technical anchors where they fit: ${requiredTerms.join(', ')}.`,
        `Close the ${roundLabel} note by naming one alternative and the evidence that rules it out.`,
      ];
      checks.push({
        id: checkId,
        type: 'text-response',
        description: 'The case note explains the model with specific technical evidence.',
        failureMessage: `Expand the note to at least 160 characters and connect the required technical terms to evidence.`,
        hidden: false,
        competencyIds: base.competencyIds,
        minimumCharacters: 160,
        requiredTerms,
      });
    } else {
      const decisionIndex = choiceIndex % model.decisions.length;
      const decision = model.decisions[decisionIndex];
      choiceIndex += 1;
      const [decisionTitle, question, correct, distractorOne, distractorTwo] = decision;
      const decisionKey = `${model.competencyId}-${decisionIndex}`;
      const priorUses = decisionUses.get(decisionKey) ?? 0;
      decisionUses.set(decisionKey, priorUses + 1);
      base.title = `${transferPrefix}${decisionTitle}${priorUses ? ' with new evidence' : ''} · ${scenarioLabel}`;
      base.instruction = `${priorUses ? 'Using the new evidence in' : 'In'} the ${roundLabel}, ${question.charAt(0).toLowerCase()}${question.slice(1)}`;
      const modePurpose = {
        predict: 'before the result is shown',
        inspect: 'while you inspect the artifact',
        read: 'as you connect the explanation to evidence',
        answer: 'while you defend the selected claim',
      }[interaction];
      base.why = `${model.why} Working through ${decisionTitle.toLowerCase()} narrows the ${roundLabel} ${modePurpose}.`;
      const contextualize = (text) => {
        if (priorUses === 0) return text;
        return `Applied to the ${roundLabel} ${interaction}: ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
      };
      base.options = [
        { id: `${stepId}-option-a`, text: contextualize(distractorOne) },
        { id: `${stepId}-option-b`, text: contextualize(correct) },
        { id: `${stepId}-option-c`, text: contextualize(distractorTwo) },
      ];
      base.content = [
        interaction === 'read'
          ? {
              type: 'paragraph',
              text: `${model.concept} Apply this distinction during the ${roundLabel} ${interaction} task.`,
            }
          : {
              type: 'callout',
              tone: interaction === 'predict' ? 'question' : 'note',
              title: `${decisionTitle} — ${roundLabel}`,
              text: `Commit to the claim that explains the ${roundLabel} evidence without assigning work to the wrong layer.`,
            },
      ];
      if (interaction === 'inspect') {
        base.stimulus = {
          kind: model.stimulusKind,
          title: `${model.stimulusTitle} · ${roundLabel}`,
          caption: `${model.stimulusCaption} Case: ${roundLabel}; focus: ${decisionTitle.toLowerCase()}.`,
          lines: model.stimulusLines.map(([id, label, text, tone]) => ({
            id: `${slug(spec.id)}-${id}-${round}-${interactionIndex}`,
            label,
            text,
            tone,
          })),
        };
      }
      base.hints = [
        `During ${roundLabel} ${interaction}, identify which ${model.short.toLowerCase()} boundary “${decisionTitle}” asks about.`,
        `Compare every ${roundLabel} option with the named “${decisionTitle}” evidence during ${interaction}.`,
        `For ${roundLabel} ${interaction}, reject claims that skip a required layer or invent unavailable evidence for “${decisionTitle}.”`,
      ];
      checks.push({
        id: checkId,
        type: 'choice-equals',
        description: `The ${interaction} claim correctly handles ${decisionTitle.toLowerCase()} in the ${roundLabel}.`,
        failureMessage: `During ${roundLabel} ${interaction}, recheck the responsible layer and available ${decisionTitle.toLowerCase()} evidence.`,
        hidden: false,
        competencyIds: [model.competencyId],
        expectedOptionId: `${stepId}-option-b`,
      });
    }

    if (base.hints.length === 0) {
      base.hints = [
        `In the ${roundLabel} sequence, locate the first event whose required input is not ready.`,
        `Separate ${roundLabel} ${model.short.toLowerCase()} events from later visible outcomes.`,
        `Rebuild the ${roundLabel} sequence one causal handoff at a time.`,
      ];
    }
    steps.push(base);
  });

  return {
    schemaVersion: 2,
    id: spec.id,
    courseId,
    moduleId,
    kind: spec.kind,
    title: spec.title,
    summary: spec.summary,
    objectives: spec.objectives,
    competencyCoverage: {
      introduces: spec.introduces,
      reinforces: spec.reinforces,
      assesses: spec.assesses,
    },
    prerequisites: [],
    difficulty: spec.difficulty,
    estimatedMinutes: spec.estimatedMinutes,
    steps,
    checks,
    mastery: {
      passingPercent: spec.kind === 'quiz' || spec.kind === 'project' ? 85 : 80,
      maxHintsForMastery: spec.kind === 'quiz' || spec.kind === 'project' ? 0 : 4,
      spacedReviewDays: [1, 7, 21, 60],
    },
  };
}

const generatedActivities = activitySpecs.map(buildActivity);
const activityIds = [
  'systems-signal-room',
  'file-path-rescue',
  'local-network-trace',
  'browser-evidence-studio',
  'devtools-case-file',
  'source-verification-trial',
  'foundation-incident-room',
  'filesystem-dispatch',
  'research-sprint',
  'foundation-cold-case-review',
  'foundation-checkpoint',
  'notice-pipeline-workshop',
  'evacuation-resource-transfer-lab',
];

const generatedById = new Map(generatedActivities.map((activity) => [activity.id, activity]));
activityIds.forEach((activityId, index) => {
  if (activityId === 'browser-evidence-studio') return;
  const activity = generatedById.get(activityId);
  if (!activity) throw new Error(`Missing generated activity ${activityId}`);
  activity.prerequisites = index === 0 ? [] : [activityIds[index - 1]];
});

const coursePath = path.join(outputRoot, 'course.json');
let existingCourse;
try {
  existingCourse = JSON.parse(await readFile(coursePath, 'utf8'));
} catch {
  existingCourse = null;
}
const foundationCompetencyIds = new Set(competencies.map((competency) => competency.id));
const course = {
  schemaVersion: 2,
  id: courseId,
  title: 'Responsive Web Design: Build for Everyone',
  description:
    'A cumulative, evidence-driven path from computer and browser foundations to independently designed, accessible, responsive web experiences.',
  outcomes: [
    'Build semantic web documents that remain understandable across devices and assistive technology.',
    'Design resilient responsive systems using modern CSS, content-driven constraints, and accessible interaction patterns.',
    'Investigate defects with browser evidence and verify finished work through automated and manual tests.',
  ],
  prerequisites: [],
  competencies: [
    ...competencies,
    ...(existingCourse?.competencies ?? []).filter(
      (competency) => !foundationCompetencyIds.has(competency.id)
    ),
  ],
  moduleIds: [
    moduleId,
    ...(existingCourse?.moduleIds ?? []).filter(
      (existingModuleId) => existingModuleId !== moduleId
    ),
  ],
  estimatedHours: Math.max(4, Math.min(65, existingCourse?.estimatedHours ?? 0)),
  credential: {
    title: 'Responsive Web Design Builder Certificate',
    requiredProjectIds: [
      'community-needs-survey',
      'developer-field-manual',
      'ethical-learning-product-launch',
    ],
    finalExamId: 'mapped-exam-responsive-web-design-certification',
    passingPercent: 80,
  },
  status: 'draft',
};

const module = {
  schemaVersion: 2,
  id: moduleId,
  courseId,
  title: 'Computers, Files, Browsers, and Evidence',
  description:
    'Trace a page from input and storage through local and network loading, browser construction, developer-tool evidence, and verified technical documentation.',
  order: 1,
  objectives: [
    'Trace a page from user input and stored data through operating-system, browser, graphics, and display responsibilities.',
    'Organize a portable project and diagnose extensions, case mismatches, moved files, and broken relative paths.',
    'Distinguish local-file loading from browser-server request and response behavior.',
    'Use browser evidence and primary sources to test claims about source, DOM, accessibility information, layout, and pixels.',
  ],
  competencyIds: competencies.map((competency) => competency.id),
  prerequisites: [],
  activityIds,
};

await mkdir(path.join(outputRoot, 'activities'), { recursive: true });
await mkdir(path.join(outputRoot, 'modules'), { recursive: true });
await writeFile(coursePath, `${JSON.stringify(course, null, 2)}\n`);
await writeFile(
  path.join(outputRoot, 'modules', `${moduleId}.json`),
  `${JSON.stringify(module, null, 2)}\n`
);
for (const activity of generatedActivities) {
  await writeFile(
    path.join(outputRoot, 'activities', `${activity.id}.json`),
    `${JSON.stringify(activity, null, 2)}\n`
  );
}

const generatedStepCount = generatedActivities.reduce(
  (total, activity) => total + activity.steps.length,
  0
);
console.log(
  `Wrote ${generatedActivities.length} foundation activities with ${generatedStepCount} generated interactions; browser-evidence-studio remains hand-authored.`
);
