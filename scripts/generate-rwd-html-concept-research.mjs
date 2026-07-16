import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const stages = ['introduce', 'model', 'guided', 'faded', 'debug', 'retrieve', 'assess', 'transfer'];

const anchor = (sourceId, locator, claim) => ({ sourceId, locator, claim });
const concepts = [];
const concept = (
  id,
  title,
  objective,
  moduleId,
  prerequisiteIds,
  sourceAnchors,
  misconceptions,
  evidenceRequirements,
  retainedInModuleIds = ['html-independent-project']
) => {
  concepts.push({
    id,
    title,
    objective,
    order: concepts.length + 1,
    moduleId,
    prerequisiteIds,
    sourceAnchors,
    misconceptions,
    evidenceRequirements,
    stages,
    retainedInModuleIds,
    currentState: 'researched-not-authored',
  });
};

concept(
  'html-workspace-feedback-loop',
  'Source, preview, and saved artifact',
  'Edit one bounded source file, connect the changed characters to parsed preview output, save it, and resume the exact artifact state.',
  'html-first-page',
  [],
  [
    anchor(
      'rwd-fcc-opening-inspection',
      'workshop-curriculum-outline steps 1-3',
      'Current benchmark introduces the editor and connects an immediate source edit to preview output.'
    ),
  ],
  ['The preview is the source file, so a visible result proves the saved source is correct.'],
  [
    'Changed text must appear in the preview and remain after a reload.',
    'Learner must identify source, parsed output, saved draft, and last passing checkpoint separately.',
  ],
  ['html-documents-and-paths', 'html-independent-project']
);

concept(
  'html-purpose-structure',
  'HTML purpose and boundary',
  'Explain and demonstrate that HTML describes document content and meaning while CSS handles presentation and JavaScript handles dynamic behavior.',
  'html-first-page',
  ['html-workspace-feedback-loop'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Web standards 1.2 and Semantic HTML overview',
      'MDN separates HTML structure and semantics from CSS presentation and JavaScript behavior.'
    ),
  ],
  ['HTML is a programming language whose element names directly specify visual styling.'],
  [
    'Learner must classify changed requirements as content, semantics, presentation, or behavior.',
    'Artifact must remain understandable before author CSS or JavaScript is added.',
  ]
);

concept(
  'html-element-anatomy',
  'Element anatomy',
  'Identify and author element, start tag, tag name, content, and end tag without confusing any part for the complete element.',
  'html-first-page',
  ['html-purpose-structure'],
  [
    anchor(
      'rwd-whatwg-html',
      'HTML syntax 13.1.2',
      'The standard defines tags as markup delimiters and gives normative start-tag and end-tag syntax.'
    ),
    anchor(
      'rwd-webdev-html',
      'Overview: Elements',
      'Learn HTML distinguishes opening tag, closing tag, content, and complete element.'
    ),
  ],
  ['An opening tag by itself is the complete HTML element.'],
  [
    'Learner must label anatomy in valid and malformed examples.',
    'Learner must author an unfamiliar normal element from a content requirement without copied source.',
  ]
);

concept(
  'html-tag-element-distinction',
  'Tags, elements, and nodes',
  'Distinguish source tags from DOM elements and text nodes, then explain why source serialization and parsed structure can differ.',
  'html-first-page',
  ['html-element-anatomy'],
  [
    anchor(
      'rwd-webdev-html',
      'Overview: document tree and elements',
      'HTML documents are node trees containing elements and text nodes rather than a flat sequence of visible tags.'
    ),
  ],
  ['Every tag becomes a separate visible DOM node, including closing tags.'],
  [
    'Learner must match source ranges to resulting element and text nodes.',
    'Changed-case inspection must explain one source-to-DOM difference without relying on appearance.',
  ]
);

concept(
  'html-text-whitespace',
  'Text nodes and whitespace',
  'Predict how ordinary text, spaces, line breaks, and reserved characters become text nodes and rendered inline content.',
  'html-first-page',
  ['html-element-anatomy'],
  [
    anchor(
      'rwd-whatwg-html',
      'HTML syntax text and character references',
      'Normal elements may contain text and character references subject to syntax and content-model restrictions.'
    ),
  ],
  ['Indentation and repeated source spaces always render exactly as typed.'],
  [
    'Learner must predict DOM text and visible spacing for changed indentation and text.',
    'Artifact must preserve intended words while using elements rather than spaces for document structure.',
  ]
);

concept(
  'html-nesting-tree',
  'Nesting and tree relationships',
  'Author and inspect parent, child, descendant, ancestor, and sibling relationships using valid nesting rather than indentation alone.',
  'html-first-page',
  ['html-element-anatomy', 'html-text-whitespace'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.2 good document structure',
      'MDN requires correct nesting because browser repair may produce a different structure than the author intended.'
    ),
  ],
  ['Indentation creates parent-child relationships even when tags close in another order.'],
  [
    'Learner must draw and verify the tree produced by nested source.',
    'Malformed close-order case must be repaired from DOM evidence and then survive a changed sibling insertion.',
  ]
);

concept(
  'html-content-models',
  'Allowed content relationships',
  'Use element content models and contextual author requirements to decide whether a parent-child relationship is conforming and meaningful.',
  'html-first-page',
  ['html-nesting-tree'],
  [
    anchor(
      'rwd-whatwg-html',
      'HTML elements and content models',
      'Elements impose content categories, models, and contextual author restrictions beyond basic tag syntax.'
    ),
  ],
  ['Any element can contain any other element when the browser displays it.'],
  [
    'Learner must reject a visually plausible but invalid content relationship and cite the controlling model.',
    'Independent build must pass parsed-relationship checks rather than source token checks.',
  ]
);

concept(
  'html-void-elements',
  'Void elements',
  'Recognize and author void elements without invented end tags or XHTML self-closing assumptions, then explain how their attributes provide behavior.',
  'html-first-page',
  ['html-element-anatomy'],
  [
    anchor(
      'rwd-whatwg-html',
      'HTML syntax 13.1.2 void elements',
      'Void elements have no end tag; a trailing slash does not make an HTML void element self-closing.'
    ),
  ],
  ['A trailing slash closes any HTML element and prevents later text from becoming its content.'],
  [
    'Learner must distinguish normal, void, and foreign-element syntax in changed examples.',
    'Malformed void-element source must be diagnosed from parsed attributes and following content.',
  ]
);

concept(
  'html-attribute-syntax',
  'Attribute names and values',
  'Place attributes inside a start tag and author separated names and values using unambiguous quoting and specification-defined names.',
  'html-first-page',
  ['html-element-anatomy'],
  [
    anchor(
      'rwd-whatwg-html',
      'HTML syntax 13.1.2.3 attributes',
      'The standard defines attribute placement, names, values, separators, and four serialization forms.'
    ),
  ],
  [
    'Attributes belong after an element or inside its closing tag because they describe the complete element.',
  ],
  [
    'Learner must parse name, separator, quote, value, and start-tag boundaries in malformed source.',
    'Changed-case build must apply a valid element-specific attribute and verify its parsed value and behavior.',
  ]
);

concept(
  'html-attribute-value-types',
  'Boolean, enumerated, and text attributes',
  'Distinguish boolean presence, enumerated keywords, token lists, IDs, URLs, and free text so values follow each attribute contract.',
  'html-first-page',
  ['html-attribute-syntax'],
  [
    anchor(
      'rwd-whatwg-html',
      'Common microsyntaxes and element attribute definitions',
      'Attribute meaning depends on its specification-defined value type rather than one universal string rule.'
    ),
  ],
  [
    'Writing a boolean attribute as false disables it because the word false becomes a false value.',
  ],
  [
    'Learner must predict behavior for present, absent, invalid, and changed attribute values.',
    'Artifact must use boolean and enumerated attributes without relying on string truthiness assumptions.',
  ]
);

concept(
  'html-comments-character-references',
  'Comments and character references',
  'Use comments for bounded author notes and character references where literal syntax would be ambiguous, without using either as page structure.',
  'html-first-page',
  ['html-element-anatomy'],
  [
    anchor(
      'rwd-whatwg-html',
      'HTML syntax comments and character references',
      'HTML defines separate comment syntax and character-reference parsing rules.'
    ),
  ],
  ['Commented secrets are safe because users cannot see comments in the rendered page.'],
  [
    'Learner must render reserved characters without accidentally creating markup.',
    'Inspection must locate a comment in source and DOM and explain why sensitive data never belongs there.',
  ]
);

concept(
  'html-parser-recovery',
  'Browser parsing and recovery',
  'Compare authored source with the DOM produced by browser error recovery, then repair the cause and verify a conforming stable tree.',
  'html-first-page',
  ['html-nesting-tree', 'html-content-models'],
  [
    anchor(
      'rwd-whatwg-html',
      'Parsing HTML documents',
      'Browsers construct a DOM through defined parsing and error-recovery behavior rather than displaying source literally.'
    ),
  ],
  ['If malformed HTML looks acceptable in one browser, the source is valid and interoperable.'],
  [
    'Learner must predict and inspect recovery for a missing or misplaced tag.',
    'Repair must pass source conformance, expected DOM structure, and a changed insertion case.',
  ]
);

concept(
  'tooling-local-computer-resources',
  'Local computer components and resource evidence',
  'Distinguish processor, memory, persistent storage, input, output, operating system, and application roles, then use observable resource evidence to explain one bounded development constraint.',
  'web-tooling-just-in-time',
  ['html-workspace-feedback-loop'],
  [
    anchor(
      'rwd-fcc-v9',
      'computer basics: basic parts of a computer',
      'The pinned benchmark introduces major computer components before broader developer tooling.'
    ),
  ],
  [
    'Memory and persistent storage are interchangeable places where every running program permanently keeps its files.',
  ],
  [
    'Learner must match processor, memory, storage, input, output, operating-system, and application evidence to their bounded roles.',
    'A constrained preview case must be diagnosed from supplied resource evidence without making hardware-performance guarantees.',
  ],
  ['html-documents-and-paths', 'html-independent-project']
);

concept(
  'tooling-input-methods-ergonomics',
  'Keyboard, pointer, alternative input, and ergonomic operation',
  'Use keyboard, pointer, touch, and alternative input paths safely while adjusting posture, reach, repetition, and breaks without treating one body or device as the default.',
  'web-tooling-just-in-time',
  ['tooling-local-computer-resources'],
  [
    anchor(
      'rwd-fcc-v9',
      'computer basics: keyboards, pointing devices, and safe use',
      'The pinned benchmark covers keyboard, mouse, alternative pointing devices, and safer physical operation.'
    ),
    anchor(
      'rwd-mdn-dealing-files',
      'keyboard navigation in the editor and file explorer',
      'MDN supplies keyboard-operable file and editor paths rather than assuming pointer-only operation.'
    ),
  ],
  [
    'Keyboard shortcuts are inherently inaccessible, while pointer gestures are always the simpler universal path.',
  ],
  [
    'Learner must complete the same bounded workspace and file task with a documented keyboard path and another supported input path.',
    'Learner must identify one reach, repetition, posture, or break risk and choose a reversible adjustment without medical claims.',
  ],
  ['html-accessibility-and-debugging', 'html-independent-project']
);

concept(
  'tooling-internet-access-layers',
  'Device, local network, provider, internet, and web layers',
  'Distinguish a local device, local network, internet service provider, internet connectivity, web service, and browser request so a failure is located at the smallest supported layer.',
  'web-tooling-just-in-time',
  ['tooling-local-computer-resources'],
  [
    anchor(
      'rwd-fcc-v9',
      'computer basics: internet service providers',
      'The pinned benchmark explicitly introduces internet service providers and access relationships.'
    ),
    anchor(
      'rwd-mdn-how-internet-works',
      'internet infrastructure and ISP connection',
      'MDN distinguishes the internet infrastructure from the web and places an ISP between a local network and wider connectivity.'
    ),
  ],
  [
    'A working Wi-Fi icon proves the browser, DNS, remote web service, and every requested page resource are working.',
  ],
  [
    'Learner must classify changed failure evidence at device, local-network, provider, internet, DNS, server, or browser-request layer.',
    'Diagnosis must state what the supplied evidence proves and what requires an authorized provider or administrator.',
  ],
  ['html-documents-and-paths', 'html-independent-project']
);

concept(
  'tooling-account-signin-security',
  'Safe local sign-in and account boundaries',
  'Use unique accounts, trusted sign-in surfaces, password-manager-generated credentials, phishing-resistant multifactor authentication where available, locking, updates, and least privilege without exposing real secrets.',
  'web-tooling-just-in-time',
  ['tooling-local-computer-resources'],
  [
    anchor(
      'rwd-fcc-v9',
      'computer basics: safe ways to sign into a computer',
      'The pinned benchmark includes safe computer sign-in as beginner coverage.'
    ),
    anchor(
      'rwd-cisa-phishing-resistant-mfa',
      'phishing-resistant MFA guidance',
      'CISA recommends phishing-resistant multifactor authentication and explains limits of weaker factors.'
    ),
  ],
  [
    'A long reused password makes a shared administrator account safe enough for ordinary development work.',
  ],
  [
    'Learner must reject a simulated lookalike sign-in, secret-sharing request, shared administrator account, and weak recovery path with a reason.',
    'A fictional setup plan must preserve individual identity, least privilege, locking, updates, recovery, and no collection of real credentials.',
  ],
  ['html-independent-project']
);

concept(
  'tooling-developer-tool-landscape',
  'Developer tool roles and transfer boundaries',
  'Choose among editor, browser, developer tools, terminal, version control, graphics, testing, and deployment tools by the evidence-producing job each performs.',
  'web-tooling-just-in-time',
  ['html-workspace-feedback-loop', 'tooling-local-computer-resources'],
  [
    anchor(
      'rwd-mdn-installing-software',
      'code editors, browsers, local servers, graphics, version control, and deployment tools',
      'MDN separates essential beginner tools from tools that should enter later when a task requires them.'
    ),
    anchor(
      'rwd-mdn-code-editors',
      'basic code-editor functionality',
      'MDN describes editors as source tools with file, search, syntax, completion, and extension capabilities.'
    ),
  ],
  [
    'Professional developers use one application that edits, renders, validates, deploys, and proves every web requirement.',
  ],
  [
    'Learner must select the smallest suitable tool for source editing, DOM inspection, computed style, requests, revision evidence, and deployment transfer.',
    'Learner must identify which simulated workspace evidence still needs verification in an authentic external toolchain.',
  ],
  ['html-accessibility-and-debugging', 'html-independent-project']
);

concept(
  'tooling-file-manager-operations',
  'Bounded file and folder operations with recovery',
  'Create, select, copy, move, rename, delete, restore, and search project files inside a learner-owned boundary while predicting path and reference consequences.',
  'web-tooling-just-in-time',
  ['tooling-input-methods-ergonomics', 'tooling-developer-tool-landscape'],
  [
    anchor(
      'rwd-mdn-dealing-files',
      'manipulating files and folders',
      'MDN demonstrates visual and keyboard file operations inside a safe learner-owned project location.'
    ),
  ],
  [
    'Moving a file only changes where its icon appears; references to the old path continue resolving automatically.',
  ],
  [
    'Learner must complete reversible operations in a disposable project and predict resulting paths before applying them.',
    'A mistaken rename or deletion must be recovered from retained evidence without modifying operating-system or unrelated user files.',
  ],
  ['html-documents-and-paths', 'html-independent-project']
);

concept(
  'tooling-file-naming-portability',
  'Portable web file names and identity',
  'Name web files with intentional extensions, portable characters, consistent case, and URL-safe separators while distinguishing display labels from file identity.',
  'web-tooling-just-in-time',
  ['tooling-file-manager-operations'],
  [
    anchor(
      'rwd-mdn-dealing-files',
      'file names and extensions',
      'MDN explains case sensitivity, extensions, URL mapping, spaces, and portable lowercase hyphenated names.'
    ),
  ],
  [
    'File names are case-insensitive everywhere and a renamed extension changes the encoded contents into the new format.',
  ],
  [
    'Changed Windows-like and case-sensitive deployment cases must resolve the same intended assets without spaces or case drift.',
    'Learner must distinguish base name, extension, file content, MIME handling, and public URL rather than inferring one from another.',
  ],
  ['html-documents-and-paths', 'html-independent-project']
);

concept(
  'tooling-project-folder-organization',
  'Project roots, folders, and asset relationships',
  'Organize one project root with entry document, styles, scripts, media, and bounded data so each reference is portable and ownership remains clear.',
  'web-tooling-just-in-time',
  ['tooling-file-naming-portability'],
  [
    anchor(
      'rwd-mdn-dealing-files',
      'website structure and file paths',
      'MDN introduces one project root with index, image, style, and script locations tied together by relative paths.'
    ),
  ],
  [
    'A folder named images automatically makes every nested image available to every HTML document without a path.',
  ],
  [
    'Learner must build and explain a portable project tree from artifact requirements without receiving the final folder layout.',
    'A moved document and renamed asset case must expose and repair every affected reference without machine-specific paths.',
  ],
  ['html-documents-and-paths', 'html-independent-project']
);

concept(
  'tooling-file-types-search-inspection',
  'File types, extensions, search, and content inspection',
  'Search by bounded name, extension, location, content, or modification evidence and verify a file by inspecting its actual content instead of trusting an icon.',
  'web-tooling-just-in-time',
  ['tooling-file-manager-operations', 'tooling-file-naming-portability'],
  [
    anchor(
      'rwd-fcc-v9',
      'computer basics: searching files and common web file types',
      'The pinned benchmark covers file search plus common document, style, script, image, audio, video, and archive extensions.'
    ),
    anchor(
      'rwd-mdn-dealing-files',
      'file extensions and project contents',
      'MDN connects extensions to expected content and applications while warning that names alone do not transform content.'
    ),
  ],
  [
    'A familiar icon or extension proves a file has the expected content and is safe to open or publish.',
  ],
  [
    'Learner must locate a changed target among same-name and wrong-extension distractors using at least two evidence fields.',
    'Learner must classify common web source, media, data, and archive files while preserving an unknown-file safety boundary.',
  ],
  ['html-documents-and-paths', 'html-independent-project']
);

concept(
  'tooling-browser-install-update-engines',
  'Current browsers, updates, and rendering-engine coverage',
  'Choose supported current browsers, verify update state, distinguish browser brand from rendering engine, and plan bounded cross-engine testing without unsafe downloads.',
  'web-tooling-just-in-time',
  ['tooling-developer-tool-landscape', 'tooling-account-signin-security'],
  [
    anchor(
      'rwd-mdn-installing-software',
      'modern web browsers and update guidance',
      'MDN recommends current browsers and testing across distinct rendering engines while noting platform limits.'
    ),
  ],
  [
    'Installing two Chromium-based browser brands proves behavior across all major rendering engines and assistive environments.',
  ],
  [
    'Learner must identify browser brand, engine family, version evidence, update source, and unsupported platform combinations.',
    'A fictional installation plan must use official distribution, avoid bundled software, and name remaining authentic-device tests.',
  ],
  ['html-accessibility-and-debugging', 'html-independent-project']
);

concept(
  'tooling-browser-site-search-engine',
  'Browser, website, web page, address, and search engine distinctions',
  'Distinguish browser application, web page, website, web server, URL, address-bar navigation, search query, and search-engine results through observable evidence.',
  'web-tooling-just-in-time',
  ['tooling-browser-install-update-engines', 'tooling-internet-access-layers'],
  [
    anchor(
      'rwd-mdn-browsing-web',
      'browsers, websites, search engines, requests, parsing, and rendering',
      'MDN separates browser software, websites, search engines, URLs, requests, and rendered results.'
    ),
  ],
  [
    'The address bar is a search engine, and a search-result title is the address of the destination page.',
  ],
  [
    'Learner must label browser chrome, URL, origin, page, site, search query, result, and destination in a changed navigation trace.',
    'Learner must navigate directly by URL and by search while explaining distinct requests, intermediaries, and privacy limits.',
  ],
  ['html-documents-and-paths', 'html-independent-project']
);

concept(
  'tooling-search-query-refinement',
  'Bounded search queries and evidence refinement',
  'Turn a web-development problem into constrained search terms, compare result authority and freshness, refine the query from evidence, and preserve unanswered uncertainty.',
  'web-tooling-just-in-time',
  ['tooling-browser-site-search-engine'],
  [
    anchor(
      'rwd-mdn-browsing-web',
      'searching for technical information',
      'MDN recommends problem-specific search terms, technology context, result evaluation, and iterative refinement.'
    ),
  ],
  [
    'Adding more words always improves a query, and the first result with matching code resolves the technical claim.',
  ],
  [
    'Learner must create, refine, and compare queries for an unfamiliar browser problem while recording excluded ambiguity.',
    'Evidence record must distinguish result snippet, opened source, authority, date, version, tested behavior, and remaining uncertainty.',
  ],
  ['html-documents-and-paths', 'html-accessibility-and-debugging', 'html-independent-project']
);

concept(
  'html-doctype-rendering-mode',
  'Doctype and rendering mode',
  'Place the HTML doctype first and explain its current rendering-mode purpose without treating it as an HTML element or version declaration.',
  'html-documents-and-paths',
  ['html-parser-recovery'],
  [
    anchor(
      'rwd-whatwg-html',
      'HTML syntax 13.1.1 DOCTYPE',
      'A doctype is required legacy preamble that avoids incompatible rendering modes.'
    ),
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.1 basic syntax',
      'MDN requires understanding both doctype use and its historical status.'
    ),
  ],
  [
    'The doctype is the root HTML element and tells the browser which modern HTML version to download.',
  ],
  [
    'Learner must distinguish doctype node, document element, and rendered content.',
    'Changed document without a correct doctype must expose mode evidence and be repaired.',
  ]
);

concept(
  'html-document-root-head-body',
  'Complete document structure',
  'Author a complete document with doctype, html root, metadata head, titled document, and content body from an empty file.',
  'html-documents-and-paths',
  ['html-doctype-rendering-mode', 'html-nesting-tree'],
  [
    anchor(
      'rwd-whatwg-html',
      'HTML syntax writing documents',
      'A conforming serialized document has a doctype and html document element containing head and body structure.'
    ),
  ],
  ['A body fragment that renders is equivalent to a complete portable HTML document.'],
  [
    'Learner must build the complete envelope without receiving hidden scaffold source.',
    'Source, DOM, title-bar, and validation evidence must distinguish head metadata from body content.',
  ]
);

concept(
  'html-document-language',
  'Document language',
  'Declare the primary human language and identify bounded language changes so pronunciation and language processing have programmatic evidence.',
  'html-documents-and-paths',
  ['html-document-root-head-body', 'html-attribute-syntax'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.1 language outcome',
      'MDN requires setting document language on the opening html element.'
    ),
    anchor(
      'rwd-wcag-two-two',
      'Success Criteria 3.1.1 and 3.1.2',
      'Page language and language changes need programmatic determination.'
    ),
  ],
  ['The lang attribute translates visible text into the chosen language.'],
  [
    'Learner must select valid language tags for page and changed inline-language content.',
    'DOM and accessibility evidence must expose primary and changed language scopes.',
  ]
);

concept(
  'html-character-encoding',
  'Character encoding declaration',
  'Declare UTF-8 early in the head and diagnose text corruption as a bytes-to-characters interpretation problem.',
  'html-documents-and-paths',
  ['html-document-root-head-body', 'html-attribute-syntax'],
  [
    anchor(
      'rwd-whatwg-html',
      'Character encoding declarations',
      'HTML constrains encoding declarations and their serialization position.'
    ),
  ],
  ['UTF-8 is a font that visually supports more symbols.'],
  [
    'Learner must explain bytes, encoding declaration, characters, and font as separate layers.',
    'Changed non-ASCII content must survive save, reload, parse, and copy evidence.',
  ]
);

concept(
  'html-title-metadata',
  'Document title and bounded metadata',
  'Write a unique useful document title and only metadata whose consumer and purpose can be named and verified.',
  'html-documents-and-paths',
  ['html-document-root-head-body'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.1 head outcomes',
      'MDN includes title, search metadata, icons, stylesheets, and script links in head knowledge.'
    ),
  ],
  ['The title element creates the largest visible heading in the page body.'],
  [
    'Learner must verify document title separately from visible heading text.',
    'Changed multi-page case must produce distinct meaningful titles without keyword stuffing.',
  ]
);

concept(
  'html-discovery-metadata',
  'Search and sharing discovery metadata',
  'Provide accurate descriptions, canonical identity, icons, and bounded sharing metadata whose consumers, limitations, and visible-content relationship can be verified.',
  'html-documents-and-paths',
  ['html-title-metadata', 'html-document-language'],
  [
    anchor(
      'rwd-webdev-html',
      'Metadata and document head coverage',
      'Document metadata describes the page to browsers, search systems, sharing tools, and other consumers without replacing visible content.'
    ),
  ],
  [
    'Metadata keywords can guarantee ranking and may describe content that the visible page does not provide.',
  ],
  [
    'Changed multi-page cases must expose unique truthful title, description, canonical, icon, and sharing evidence without duplicated identity.',
    'Learner must name each metadata consumer, verify inspectable output where possible, and state what the metadata cannot guarantee.',
  ]
);

concept(
  'html-viewport-metadata',
  'Viewport configuration',
  'Configure the layout viewport for responsive design without restricting zoom or treating metadata as a substitute for resilient CSS.',
  'html-documents-and-paths',
  ['html-document-root-head-body', 'html-attribute-syntax'],
  [
    anchor(
      'rwd-wcag-two-two',
      'Success Criteria 1.4.4 and 1.4.10',
      'Text resizing and reflow must remain available across viewport configuration.'
    ),
  ],
  ['Setting width=device-width automatically makes fixed-width content responsive.'],
  [
    'Learner must compare layout viewport evidence before and after safe metadata.',
    'Changed fixed-width page must still fail until CSS constraints are repaired, proving metadata is not the layout solution.',
  ]
);

concept(
  'html-files-paths-urls',
  'Files, paths, and URL references',
  'Organize a portable project and resolve relative, root-relative, absolute, and fragment references from the correct base URL.',
  'html-documents-and-paths',
  ['html-workspace-feedback-loop', 'tooling-project-folder-organization'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.5 links',
      'MDN requires absolute and relative paths plus detailed slash, dot, and double-dot syntax.'
    ),
  ],
  [
    'A relative path is relative to the project folder regardless of the current document location.',
  ],
  [
    'Moved-folder and nested-document cases must resolve expected resources without machine-specific paths.',
    'Learner must diagnose case, extension, base, path-segment, and URL-encoding failures from network evidence.',
  ],
  ['html-images-and-media', 'html-independent-project']
);

concept(
  'html-browser-request-parse-render',
  'Browser request, parse, and render evidence',
  'Trace navigation through URL resolution, requests, responses, resource discovery, HTML parsing, DOM construction, CSS matching, layout, paint, and interactive output at a beginner-appropriate level.',
  'html-documents-and-paths',
  [
    'html-files-paths-urls',
    'html-document-root-head-body',
    'html-parser-recovery',
    'tooling-internet-access-layers',
  ],
  [
    anchor(
      'rwd-mdn-browser-loading',
      'Requests, responses, HTML handling, CSS handling, and rendering',
      'Browsers request multiple resources, parse HTML into a DOM, parse and match CSS, then assemble rendered output.'
    ),
  ],
  [
    'Opening one HTML file makes the browser read every project file automatically without references or requests.',
  ],
  [
    'Learner must connect changed source, requested resources, response failures, DOM nodes, computed styles, and rendered output without collapsing them into one layer.',
    'A missing-resource case must be diagnosed at URL, request, response, parse, match, or render stage using the evidence surface that can prove it.',
  ],
  ['html-images-and-media', 'html-accessibility-and-debugging', 'html-independent-project']
);

concept(
  'html-authority-research-verification',
  'Technical authority and claim verification',
  'Turn an HTML or browser question into a bounded claim, locate current specification or official documentation evidence, record version and context, test behavior where appropriate, and preserve uncertainty.',
  'html-documents-and-paths',
  ['html-browser-request-parse-render', 'tooling-search-query-refinement'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Research technical information and web standards outcomes',
      'Professional web work requires finding authoritative technical information and separating standards from examples, compatibility observations, and unsupported claims.'
    ),
  ],
  [
    'The first search result or generated answer is authoritative when its code appears to work in one browser.',
  ],
  [
    'Learner must produce a claim-evidence-limit-test record for a changed HTML question using a current authority rather than a copied answer.',
    'Conflicting or outdated evidence must be resolved by version, normative status, browser observation, and an explicit remaining-uncertainty statement.',
  ],
  ['html-accessibility-and-debugging', 'html-independent-project']
);

concept(
  'html-links-destinations',
  'Links and destinations',
  'Create anchors whose href values resolve to intended web, file, email, telephone, and same-document destinations with safe behavior.',
  'html-documents-and-paths',
  ['html-files-paths-urls', 'html-attribute-syntax'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.5 links',
      'Links are fundamental web navigation and require href, path, state, and link-text understanding.'
    ),
  ],
  ['An anchor without href remains an equivalent keyboard-operable hyperlink.'],
  [
    'All changed destinations must resolve and expose correct scheme, path, query, and fragment evidence.',
    'Keyboard and accessibility inspection must identify each functional link and its destination purpose.',
  ]
);

concept(
  'html-link-purpose-fragments',
  'Link purpose and fragment targets',
  'Write destination-specific link text and stable unique fragment targets that remain understandable outside surrounding prose.',
  'html-documents-and-paths',
  ['html-links-destinations', 'html-attribute-syntax'],
  [
    anchor(
      'rwd-wcag-two-two',
      'Success Criteria 2.4.4 and 4.1.1',
      'Link purpose needs context and identifiers must not create ambiguous relationships.'
    ),
  ],
  ['Repeated click-here links are accessible because each appears beside a descriptive paragraph.'],
  [
    'Link-list inspection must distinguish destinations without nearby prose.',
    'Changed long-page case must navigate to unique named targets without obscuring focus or heading context.',
  ]
);

concept(
  'html-images-purpose-alt',
  'Image purpose and text alternatives',
  'Classify informative, functional, decorative, complex, and text images, then provide the appropriate text alternative or exclusion.',
  'html-images-and-media',
  ['html-files-paths-urls', 'html-attribute-syntax', 'html-content-models'],
  [
    anchor(
      'rwd-wai-tutorials',
      'Images tutorial decision tree',
      'Alternative treatment depends on image purpose and surrounding content rather than appearance alone.'
    ),
  ],
  ['Every image needs a detailed literal description in its alt attribute.'],
  [
    'Learner must justify alternative treatment for changed image purposes.',
    'Missing-image and accessibility-tree checks must preserve equivalent task information without redundant announcements.',
  ]
);

concept(
  'html-image-dimensions-loading',
  'Image dimensions and loading behavior',
  'Provide intrinsic dimensions, appropriate loading behavior, safe sources, and performance evidence without distorting content.',
  'html-images-and-media',
  ['html-images-purpose-alt', 'html-attribute-value-types'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.6 media',
      'MDN includes image dimensions to reduce disruptive layout movement and media optimization.'
    ),
  ],
  ['Width and height attributes force an image to keep that exact visual size at every viewport.'],
  [
    'Changed aspect-ratio and missing-resource cases must preserve a stable non-distorted layout.',
    'Learner must separate intrinsic dimensions, rendered CSS dimensions, file bytes, and loading priority evidence.',
  ]
);

concept(
  'html-figures-captions',
  'Figures and captions',
  'Use figure and figcaption only when self-contained content and its caption form a meaningful relationship.',
  'html-images-and-media',
  ['html-images-purpose-alt', 'html-nesting-tree'],
  [
    anchor(
      'rwd-whatwg-html',
      'figure and figcaption elements',
      'HTML defines contextual figure content and caption relationships.'
    ),
  ],
  ['Every image belongs in a figure and its figcaption replaces alternative text.'],
  [
    'Learner must decide when a figure relationship is warranted and when ordinary flow is clearer.',
    'Accessibility inspection must distinguish caption, alternative text, and surrounding explanation roles.',
  ]
);

concept(
  'html-svg-semantics',
  'SVG embedding and accessible meaning',
  'Choose inline SVG, external image, or decorative treatment and expose or hide graphic meaning consistently.',
  'html-images-and-media',
  ['html-nesting-tree', 'html-attribute-syntax'],
  [
    anchor(
      'rwd-wai-tutorials',
      'Images tutorial',
      'Graphics need purpose-dependent text alternatives and must not duplicate nearby content.'
    ),
  ],
  ['SVG path data automatically gives assistive technology a useful accessible name.'],
  [
    'Meaningful and decorative changed cases must produce distinct accessibility-tree results.',
    'Learner must justify embedding choice using styling, caching, interaction, security, and accessibility constraints.',
  ]
);

concept(
  'html-audio-video',
  'Native audio and video',
  'Provide native controls, suitable sources, dimensions where relevant, fallback content, and user-controlled playback.',
  'html-images-and-media',
  ['html-files-paths-urls', 'html-attribute-syntax'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.6 media',
      'MDN includes audio, video, sources, controls, muted behavior, optimization, and licensing.'
    ),
  ],
  ['A media file that autoplays successfully is accessible without native controls.'],
  [
    'Keyboard and changed-source tests must preserve playback control and fallback information.',
    'Learner must justify autoplay, preload, controls, source, poster, and file-size decisions.',
  ]
);

concept(
  'html-captions-transcripts',
  'Captions, transcripts, and alternatives',
  'Provide synchronized captions, transcripts, audio description planning, and equivalent fallback according to media content and task.',
  'html-images-and-media',
  ['html-audio-video'],
  [
    anchor(
      'rwd-wcag-two-two',
      'Guideline 1.2 time-based media',
      'Prerecorded and live media alternatives depend on audio, video, timing, and conformance context.'
    ),
  ],
  ['Visible subtitles embedded in video always replace a selectable caption track and transcript.'],
  [
    'Changed silent-video, audio-only, and dialogue-plus-visual-detail cases must receive appropriate alternatives.',
    'Learner must verify track availability, labels, language, timing, and transcript access.',
  ]
);

concept(
  'html-iframe-title-permissions',
  'Embedded document boundaries',
  'Embed a document with an accurate title, minimal permissions, loading fallback, and responsive bounds while preserving origin awareness.',
  'html-images-and-media',
  ['html-files-paths-urls', 'html-attribute-syntax'],
  [
    anchor(
      'rwd-whatwg-html',
      'iframe element and sandbox attribute',
      'Embedded browsing contexts have distinct documents, origins, names, permissions, and sandbox capabilities.'
    ),
  ],
  [
    'An iframe title changes the title displayed inside the embedded page and grants no accessibility benefit beyond that.',
  ],
  [
    'Accessibility and security inspection must expose embed purpose, origin, sandbox, permissions, and navigation behavior.',
    'Changed untrusted embed case must be refused or constrained rather than granted convenience permissions.',
  ]
);

concept(
  'html-heading-hierarchy',
  'Headings and document hierarchy',
  'Choose heading ranks from content hierarchy and navigation needs rather than visual size, then verify a coherent outline.',
  'html-text-and-semantics',
  ['html-content-models', 'html-nesting-tree'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.2 document structure',
      'MDN requires logical heading levels and rejects choosing rank for appearance.'
    ),
  ],
  ['Every section must contain an h1, or only one h1 may ever appear in a conforming document.'],
  [
    'Learner must defend rank choices from a changed content outline with CSS removed.',
    'Heading navigation and accessibility-tree evidence must preserve page and section relationships.',
  ]
);

concept(
  'html-paragraphs-breaks',
  'Paragraphs, line breaks, and thematic breaks',
  'Use paragraphs, line breaks, and thematic breaks according to prose structure rather than visual spacing.',
  'html-text-and-semantics',
  ['html-element-anatomy'],
  [
    anchor(
      'rwd-whatwg-html',
      'Grouping content elements',
      'HTML assigns different semantics and content rules to paragraphs, line breaks, and thematic breaks.'
    ),
  ],
  [
    'Multiple br elements are the semantic way to create vertical spacing between unrelated blocks.',
  ],
  [
    'Learner must classify changed prose, address-line, poem-line, and topic-shift requirements.',
    'Artifact must preserve meaning with author styles disabled and at changed text length.',
  ]
);

concept(
  'html-lists',
  'Ordered, unordered, and description lists',
  'Select and correctly nest ordered, unordered, and description lists according to sequence and term-description relationships.',
  'html-text-and-semantics',
  ['html-nesting-tree', 'html-content-models'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.3 lists',
      'MDN distinguishes unordered, ordered, and description lists by relationship and includes navigation use.'
    ),
  ],
  ['Lists differ only in their default bullet or number styling.'],
  [
    'Changed sequence, collection, glossary, navigation, and nested-list cases must use appropriate structures.',
    'DOM and accessibility evidence must preserve list type, item count, nesting, terms, and descriptions.',
  ]
);

concept(
  'html-emphasis-importance',
  'Emphasis and importance',
  'Use emphasis, strong importance, and presentationally neutral text according to linguistic meaning rather than desired font style.',
  'html-text-and-semantics',
  ['html-element-anatomy', 'html-content-models'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.4 advanced text',
      'MDN requires correct use of emphasis, importance, and other text-level semantics.'
    ),
  ],
  ['Strong and em are interchangeable shortcuts for bold and italic appearance.'],
  [
    'Learner must select semantics for changed stress, warning, label, and purely visual requirements.',
    'Artifact must retain intended meaning when author styles and visual emphasis are removed.',
  ]
);

concept(
  'html-quotations-citations',
  'Quotations and citations',
  'Represent block and inline quotations, sources, and creative-work citations without inventing unsupported provenance.',
  'html-text-and-semantics',
  ['html-emphasis-importance'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.4 advanced text',
      'MDN includes quotations and citations among required text semantics.'
    ),
  ],
  ['The cite element is the correct container for a quoted speaker or any source URL.'],
  [
    'Changed inline quote, long quotation, title, speaker, and source cases must separate content roles.',
    'Learner must verify visible attribution and machine-readable relationships without fabricating metadata.',
  ]
);

concept(
  'html-machine-readable-text',
  'Dates, abbreviations, code, and contact context',
  'Use time, abbreviation, code-related, address, superscript, subscript, deletion, and insertion semantics where their defined meaning fits.',
  'html-text-and-semantics',
  ['html-attribute-syntax', 'html-emphasis-importance'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.4 advanced text',
      'MDN expects awareness and appropriate use of dates, abbreviations, addresses, code, and related text semantics.'
    ),
  ],
  ['The address element can mark up any street or postal address wherever it appears.'],
  [
    'Learner must select or reject specialized text semantics in changed editorial contexts.',
    'Machine-readable values must remain valid while visible localized text changes.',
  ]
);

concept(
  'html-landmarks',
  'Page landmarks',
  'Use header, nav, main, aside, and footer according to page relationships and verify useful non-duplicative landmark navigation.',
  'html-text-and-semantics',
  ['html-heading-hierarchy', 'html-content-models'],
  [
    anchor(
      'rwd-wai-tutorials',
      'Page structure regions',
      'Landmarks identify major page regions for navigation when element context and accessible names are appropriate.'
    ),
  ],
  ['Every header and footer element always creates a banner or contentinfo landmark.'],
  [
    'Accessibility-tree inspection must expose one useful main region and distinguish nested contextual headers and footers.',
    'Changed repeated navigation regions must receive unique purpose or names without redundant landmarks.',
  ]
);

concept(
  'html-sectioning-articles',
  'Sections, articles, and generic groups',
  'Choose section, article, div, and other groups from content relationships, heading needs, reuse, and semantics rather than styling convenience.',
  'html-text-and-semantics',
  ['html-landmarks', 'html-heading-hierarchy'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.2 good document structure',
      'MDN contrasts generic div containers with semantic structural elements and their accessibility benefits.'
    ),
  ],
  ['Section is a semantic replacement for every div and automatically fixes document structure.'],
  [
    'Learner must justify grouping choices for changed standalone, thematic, navigation, and styling-only content.',
    'Heading and landmark evidence must match intended relationships without unnecessary regions.',
  ]
);

concept(
  'html-details-summary',
  'Native disclosure',
  'Use details and summary when native disclosure behavior meets the need, and reject them when menu, dialog, or exclusive selection behavior is required.',
  'html-text-and-semantics',
  ['html-nesting-tree', 'html-content-models'],
  [
    anchor(
      'rwd-whatwg-html',
      'details and summary elements',
      'HTML defines disclosure content, summary labeling, and native open state behavior.'
    ),
  ],
  ['Details and summary are universal replacements for dropdown menus, accordions, and dialogs.'],
  [
    'Learner must choose or reject native disclosure for changed interaction requirements.',
    'Keyboard, focus, open-state, label, and no-script behavior must pass.',
  ]
);

concept(
  'html-native-controls-first',
  'Native interaction before custom roles',
  'Select native links, buttons, disclosures, and form controls before custom behavior unless a documented user need proves native behavior insufficient.',
  'html-text-and-semantics',
  ['html-content-models', 'html-parser-recovery'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.7 interactive elements',
      'MDN emphasizes native buttons and form elements because browsers provide keyboard, focus, and semantic behavior.'
    ),
  ],
  ['A div with role button is equivalent to button after adding one click handler.'],
  [
    'Learner must inventory semantics, keyboard, focus, states, submission, and disabled behavior before choosing custom interaction.',
    'Changed pointer-free and script-failure cases must retain the intended task where native behavior can provide it.',
  ]
);

concept(
  'html-form-submission-data',
  'Form purpose and submitted data',
  'Build a form whose action, method, control names, values, and submit behavior match a bounded data-collection purpose.',
  'html-forms',
  ['html-document-root-head-body', 'html-links-destinations', 'html-native-controls-first'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.7 forms',
      'MDN includes form submission, GET and POST, control names, values, and native behavior.'
    ),
  ],
  ['Every visible enabled form value is submitted even when its control has no name.'],
  [
    'Changed submission must produce the expected name-value set and omit disabled or unnamed controls by rule.',
    'Learner must justify method and data minimization without claiming client HTML secures server processing.',
  ]
);

concept(
  'html-form-labels-instructions',
  'Labels, instructions, and descriptions',
  'Provide persistent labels and programmatic instructions or descriptions so every control purpose and format remains available across states.',
  'html-forms',
  ['html-form-submission-data', 'html-attribute-syntax'],
  [
    anchor(
      'rwd-wai-tutorials',
      'Forms labels and instructions',
      'Controls need explicit labels and instructions associated in programmatically determinable ways.'
    ),
  ],
  ['Placeholder text is an equivalent accessible label because it appears inside the control.'],
  [
    'Accessibility-name and description inspection must identify every changed control without visual proximity.',
    'Labels and shared instructions must remain persistent under zoom, autofill, entered values, and validation errors.',
  ]
);

concept(
  'html-input-types-autocomplete',
  'Input purpose, keyboard, and autocomplete',
  'Choose input type, autocomplete token, inputmode, name, and value constraints from data meaning without blocking realistic international input.',
  'html-forms',
  ['html-form-submission-data', 'html-form-labels-instructions'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.7 common input types',
      'MDN requires common input types, attributes, validation, and form states.'
    ),
  ],
  [
    'Input type only changes appearance and never affects semantics, keyboard, validation, or submission.',
  ],
  [
    'Changed data examples must accept valid edge cases and reject impossible values for the right reason.',
    'Learner must verify accessible purpose, browser keyboard hint, autocomplete behavior, and submitted value separately.',
  ]
);

concept(
  'html-choice-groups',
  'Radio, checkbox, and grouped choices',
  'Use fieldset, legend, radio names, checkbox independence, labels, and values to expose exclusive and multiple-choice relationships.',
  'html-forms',
  ['html-form-labels-instructions', 'html-input-types-autocomplete'],
  [
    anchor(
      'rwd-wai-tutorials',
      'Forms grouping controls',
      'Related controls need group structure and labels that communicate shared purpose and choice relationships.'
    ),
  ],
  ['Visually adjacent radio buttons automatically form an announced exclusive group.'],
  [
    'Keyboard and accessibility checks must expose group name, option names, state, and exclusive or independent behavior.',
    'Changed default, missing-value, and dynamically reordered choices must submit the intended data.',
  ]
);

concept(
  'html-textarea-select-buttons',
  'Text areas, selections, and button types',
  'Use textarea, select, option groups, and explicit button types with correct labels, initial values, and submission behavior.',
  'html-forms',
  ['html-form-submission-data', 'html-form-labels-instructions'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.7 interactive elements',
      'MDN includes textarea, select, option, button types, and warns against routine reset buttons.'
    ),
  ],
  ['A button inside a form does nothing unless a click handler explicitly assigns behavior.'],
  [
    'Changed form must distinguish submit, reset risk, and ordinary button behavior without accidental submission.',
    'Selected, disabled, multiple, placeholder-like, and submitted option states must be verified.',
  ]
);

concept(
  'html-native-validation',
  'Constraint validation',
  'Apply required, length, range, and pattern constraints only where they match realistic data, then inspect validity and browser behavior.',
  'html-forms',
  ['html-input-types-autocomplete', 'html-textarea-select-buttons'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.7 client-side validation',
      'MDN treats native constraint validation as usability support, not a substitute for server validation.'
    ),
  ],
  ['The strictest regular expression always improves data quality and secures submitted data.'],
  [
    'Valid diverse and invalid changed cases must produce correct validity states without excluding legitimate users.',
    'Learner must explain client usability, server authority, disabled behavior, and bypass boundaries.',
  ]
);

concept(
  'html-form-errors-recovery',
  'Form error identification and recovery',
  'Provide specific persistent errors, programmatic relationships, summary or focus strategy, retained valid data, and successful correction.',
  'html-forms',
  ['html-form-labels-instructions', 'html-native-validation'],
  [
    anchor(
      'rwd-wcag-two-two',
      'Success Criteria 3.3.1 through 3.3.8',
      'Input errors need identification, instructions, suggestions, prevention, and accessible authentication or redundant-entry treatment by context.'
    ),
  ],
  ['A red border and failed submission provide sufficient error identification for all users.'],
  [
    'Keyboard, screen-reader, zoom, and changed multi-error cases must identify, locate, explain, and correct every error.',
    'Successful retry must retain unrelated valid values and produce submitted evidence without duplicate side effects.',
  ]
);

concept(
  'html-tables-purpose',
  'Data tables versus layout',
  'Choose a table only for two-dimensional data relationships and reject table markup for page layout or unrelated item lists.',
  'html-tables',
  ['html-lists', 'html-content-models'],
  [
    anchor(
      'rwd-wai-tutorials',
      'Tables tutorial purpose',
      'WAI limits table guidance to grid data and rejects tables as a layout technique.'
    ),
  ],
  ['Any aligned columns should use table markup because tables guarantee responsive layout.'],
  [
    'Learner must classify changed grid data, layout, comparison cards, and key-value content.',
    'Chosen structure must remain understandable under linearized and alternative rendering.',
  ]
);

concept(
  'html-table-structure',
  'Rows, cells, groups, and captions',
  'Build table, caption, row groups, rows, header cells, and data cells that preserve intended data dimensions.',
  'html-tables',
  ['html-tables-purpose', 'html-nesting-tree'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.8 tables',
      'MDN includes basic table cells, spanning, groups, captions, and accessible structure.'
    ),
  ],
  ['Bold text in the first row is equivalent to header-cell semantics.'],
  [
    'Parsed table grid must match changed row, column, span, and group requirements.',
    'Caption and group structure must remain meaningful with author styles disabled.',
  ]
);

concept(
  'html-table-header-associations',
  'Header associations',
  'Use th, scope, and explicit headers relationships according to simple and complex table structure so each data cell retains context.',
  'html-tables',
  ['html-table-structure', 'html-form-labels-instructions'],
  [
    anchor(
      'rwd-wai-tutorials',
      'Tables one-header, two-header, and multi-level tutorials',
      'Header and data cells need programmatic relationships, with explicit associations for complex cases.'
    ),
  ],
  ['Scope belongs on data cells because it points each value toward its header.'],
  [
    'Representative cell inspection must report correct row and column headers after changed spans or groups.',
    'Learner must choose simple scope or explicit id and headers without overcomplicating a simple table.',
  ]
);

concept(
  'html-native-accessibility-tree',
  'Native semantics and accessibility information',
  'Trace HTML element, attribute, content, and relationship choices into role, accessible name, description, state, property, and structure evidence.',
  'html-accessibility-and-debugging',
  ['html-landmarks', 'html-form-labels-instructions', 'html-table-header-associations'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Accessibility HTML learning outcomes',
      'Semantic HTML provides browser accessibility hooks including names, tables, alternatives, keyboard use, and source order.'
    ),
  ],
  ['Visible text and visual grouping automatically produce the same accessibility information.'],
  [
    'Learner must predict and inspect role, name, description, state, and relationships for changed native markup.',
    'Artifact must remain operable and understandable when visual styling is removed or altered.',
  ]
);

concept(
  'html-source-order-keyboard',
  'Source order and keyboard path',
  'Keep reading, focus, and interaction order logical from source structure without positive tabindex or visual reordering dependence.',
  'html-accessibility-and-debugging',
  ['html-native-controls-first', 'html-native-accessibility-tree'],
  [
    anchor(
      'rwd-wcag-two-two',
      'Success Criteria 1.3.2, 2.1.1, 2.4.3, and 2.4.11',
      'Meaningful sequence, keyboard operation, focus order, and unobscured focus need observable evidence.'
    ),
  ],
  ['CSS visual order or positive tabindex safely fixes any source-order problem.'],
  [
    'Keyboard-only changed flow must follow meaningful order, expose visible focus, and avoid traps.',
    'Linearized source and accessibility order must preserve task meaning across responsive layouts.',
  ]
);

concept(
  'html-aria-boundary',
  'ARIA role, state, and property boundary',
  'Use ARIA only when native semantics cannot express a required relationship or state, and supply the complete interaction contract.',
  'html-accessibility-and-debugging',
  ['html-native-controls-first', 'html-native-accessibility-tree'],
  [
    anchor(
      'rwd-aria-apg',
      'Patterns and practices',
      'Custom widget roles require coordinated names, states, properties, focus, and keyboard interaction.'
    ),
  ],
  [
    'Adding an ARIA role automatically gives a generic element native keyboard behavior and state management.',
  ],
  [
    'Learner must reject unnecessary ARIA and identify missing behavior in partial custom-widget cases.',
    'Any accepted custom pattern must pass complete role, name, state, property, focus, keyboard, and changed-state checks.',
  ]
);

concept(
  'html-validation-inspection',
  'Validation, source, DOM, and accessibility inspection',
  'Use conformance validation, source, DOM, accessibility, network, and console evidence to locate root cause rather than guess from appearance.',
  'html-accessibility-and-debugging',
  ['html-parser-recovery', 'html-document-root-head-body', 'html-native-accessibility-tree'],
  [
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML 2.9 debugging',
      'MDN requires validation, view source, and DOM inspection for markup debugging.'
    ),
  ],
  [
    'A clean validator result proves correct semantics, accessibility, links, content, and task behavior.',
  ],
  [
    'Learner must select the evidence surface that can falsify each changed defect hypothesis.',
    'Repair record must distinguish source conformance, parsed behavior, accessibility information, and user-task verification.',
  ]
);

concept(
  'html-changed-case-testing',
  'Changed-content and failure testing',
  'Test HTML with long and translated text, missing resources, duplicate identifiers, invalid input, keyboard use, zoom, and altered content relationships.',
  'html-accessibility-and-debugging',
  ['html-validation-inspection', 'html-form-errors-recovery', 'html-table-header-associations'],
  [
    anchor(
      'rwd-wcag-two-two',
      'Conformance requirements and applicable success criteria',
      'Accessibility requirements apply to complete processes and responsive variations rather than one ideal screenshot.'
    ),
  ],
  [
    'Passing the supplied example proves the markup will survive realistic content and user variation.',
  ],
  [
    'Hidden changed cases must alter content, order, resources, identifiers, input, and viewport without changing the objective.',
    'Learner must explain which invariant each test protects and diagnose at least one rejected near-miss.',
  ]
);

concept(
  'html-independent-transfer-defense',
  'Independent HTML transfer and defense',
  'Design, build, test, and defend an unfamiliar multi-section HTML information and data-collection artifact from an empty project.',
  'html-independent-project',
  [
    'html-link-purpose-fragments',
    'html-iframe-title-permissions',
    'html-sectioning-articles',
    'html-form-errors-recovery',
    'html-table-header-associations',
    'html-changed-case-testing',
  ],
  [
    anchor(
      'rwd-fcc-v9',
      'HTML certification project and review blocks',
      'Current benchmark requires independent HTML project, review, quiz, and cumulative examination evidence.'
    ),
    anchor(
      'rwd-mdn-curriculum',
      'Semantic HTML module outcomes',
      'Core HTML competence spans documents, structure, text, links, media, controls, forms, tables, and debugging.'
    ),
  ],
  [
    'Completing a project from a nearly identical workshop starter proves independent HTML transfer.',
  ],
  [
    'Artifact must begin from empty project constraints and pass behavior, accessibility, failure, changed-content, and validation evidence.',
    'Learner must defend element choices, relationships, alternatives, form data, table context, test limits, and remaining uncertainty.',
  ],
  ['html-independent-project']
);

const graph = {
  schemaVersion: 1,
  courseId: 'responsive-web-design',
  scopeId: 'html-foundations',
  status: 'researching',
  reviewedAt: '2026-07-15',
  sourceIds: [
    'rwd-whatwg-html',
    'rwd-wcag-two-two',
    'rwd-mdn-curriculum',
    'rwd-webdev-html',
    'rwd-mdn-browser-loading',
    'rwd-mdn-environment-setup',
    'rwd-mdn-installing-software',
    'rwd-mdn-code-editors',
    'rwd-mdn-dealing-files',
    'rwd-mdn-browsing-web',
    'rwd-mdn-how-internet-works',
    'rwd-cisa-phishing-resistant-mfa',
    'rwd-wai-tutorials',
    'rwd-aria-apg',
    'rwd-fcc-v9',
    'rwd-fcc-opening-inspection',
  ],
  moduleIds: [
    'html-first-page',
    'web-tooling-just-in-time',
    'html-documents-and-paths',
    'html-images-and-media',
    'html-text-and-semantics',
    'html-forms',
    'html-tables',
    'html-accessibility-and-debugging',
    'html-independent-project',
  ],
  requiredStages: stages,
  concepts,
  architectureFindings: [
    'Current blueprint delays first HTML construction behind thirteen tooling activities; files, browser, DevTools, and research must enter just in time around the first artifact.',
    'Pinned v9 computer-basics sources cover twelve distinct entry competencies that the previous four-concept tooling map omitted; the target keeps their coverage after the first HTML edit and integrates each skill at its first authentic use.',
    'Current basic HTML and semantic HTML boundaries separate concepts that depend on one another; proposed modules follow element, document, content, interaction, data, access, and transfer prerequisites.',
    'Current generated activities map all competencies across broad source blocks, but this does not prove each concept receives explicit explanation, malformed cases, fading, debugging, retrieval, or independent transfer.',
    'Current HTML project follows existing generated work and cannot count as transfer until its scenario, empty starter, requirements, grading, and defense differ meaningfully from instruction.',
  ],
  gaps: [
    'Subject-matter review must verify each locator, standards claim, prerequisite edge, misconception, and scope boundary.',
    'Instructional and assessment review must map each concept into original activities and inspect full evidence progression.',
    'Accessibility review and representative beginner observation must test the sequence, editor, feedback, recovery, and independent project.',
    'HTML-to-CSS cross-boundary prerequisites and exact alignment to all pinned v9 objectives require reviewer closure before the complete course dossier can enter review.',
  ],
};

const output = path.join(
  process.cwd(),
  'docs',
  'research',
  'courses',
  'responsive-web-design-html-concepts.json'
);
await mkdir(path.dirname(output), { recursive: true });
const serialized = `${JSON.stringify(graph, null, 2)}\n`;
if (process.argv.includes('--check')) {
  const current = await readFile(output, 'utf8');
  if (current !== serialized) throw new Error(`${output} is stale; regenerate it.`);
  console.log(`Current ${output}: ${graph.concepts.length} researched HTML concepts.`);
} else {
  await writeFile(output, serialized);
  console.log(`Wrote ${output}: ${graph.concepts.length} researched HTML concepts.`);
}
