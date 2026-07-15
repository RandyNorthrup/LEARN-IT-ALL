import { buildAiAgentPythonConfig } from './build-ai-agent-python-course-config.mjs';
import { buildAsteroidsPythonConfig } from './build-asteroids-python-course-config.mjs';
import { buildBlogAggregatorGoConfig } from './build-blog-aggregator-go-course-config.mjs';
import { buildBlogAggregatorTypescriptConfig } from './build-blog-aggregator-typescript-course-config.mjs';
import { buildBookbotPythonConfig } from './build-bookbot-python-course-config.mjs';
import { buildMazeSolverPythonConfig } from './build-maze-solver-python-course-config.mjs';
import { buildPokedexGoConfig } from './build-pokedex-go-course-config.mjs';
import { buildPokedexTypescriptConfig } from './build-pokedex-typescript-course-config.mjs';
import { buildStaticSitePythonConfig } from './build-static-site-python-course-config.mjs';
import { buildWebScraperGoConfig } from './build-web-scraper-go-course-config.mjs';
import { buildWebScraperPythonConfig } from './build-web-scraper-python-course-config.mjs';
import { buildWebScraperTypescriptConfig } from './build-web-scraper-typescript-course-config.mjs';
import { cMemoryManagementConfig } from './c-memory-management-course-config.mjs';
import { cicdGithubActionsConfig } from './cicd-course-config.mjs';
import { comptiaAPlusConfig } from './comptia-a-plus-course-config.mjs';
import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';
import { cryptographyGoConfig } from './cryptography-go-course-config.mjs';
import { dockerBasicsConfig } from './docker-course-config.mjs';
import { fileServersS3GoConfig } from './file-servers-s3-go-course-config.mjs';
import { fileServersS3TypescriptConfig } from './file-servers-s3-typescript-course-config.mjs';
import { gitAdvancedConfig } from './git-advanced-course-config.mjs';
import { goBasicsConfig } from './go-course-config.mjs';
import { httpClientCourseConfigs } from './http-client-course-configs.mjs';
import { httpProtocolGoConfig } from './http-protocol-go-course-config.mjs';
import { httpServerGoConfig } from './http-server-go-course-config.mjs';
import { httpServerTypescriptConfig } from './http-server-typescript-course-config.mjs';
import { jobSearchConfig } from './job-search-course-config.mjs';
import { kubernetesBasicsConfig } from './kubernetes-course-config.mjs';
import { portfolioProjectCourseConfigs } from './portfolio-project-course-configs.mjs';
import { rabbitmqGoConfig } from './rabbitmq-go-course-config.mjs';
import { rabbitmqTypescriptConfig } from './rabbitmq-typescript-course-config.mjs';
import { ragRetrievalAugmentedGenerationConfig } from './rag-retrieval-augmented-generation-course-config.mjs';
import { sqlBasicsConfig } from './sql-course-config.mjs';

const REVIEWED_AT = '2026-07-13';
const RESEARCHED_AT = '2026-07-13T22:00:00.000Z';

function finalize(config) {
  const prerequisiteCourseIds =
    {
      'applied-mathematics-intermediate': ['applied-mathematics-beginner'],
      'applied-mathematics-advanced': ['applied-mathematics-intermediate'],
      'agent-loops-goals': ['prompt-engineering-claude-codex'],
      'agent-skills-mcp': ['prompt-engineering-claude-codex'],
    }[config.id] ?? [];
  return finalizeCourse(config, {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds,
  });
}

const sharedAccessibility = [
  'All equations, diagrams, tables, terminal traces, and code examples require equivalent structured text and full keyboard operation.',
];

const beginnerMathModules = [
  module(
    'math-beginner-quantitative-reasoning',
    'Quantitative Reasoning, Estimation, and Problem Framing',
    'Estimate attendance, supplies, time, and uncertainty for a neighborhood event before exact values are available.',
    'a transparent event-planning estimate notebook',
    [
      skill(
        'math-beg-quantity-meaning',
        'Interpret a number together with its unit, reference population, time window, and practical meaning.',
        'A bare number has the same meaning in every context.',
        'conceptual',
        'explain'
      ),
      skill(
        'math-beg-estimation',
        'Estimate magnitudes with benchmarks and defend an appropriate tolerance before calculating exactly.',
        'An estimate is merely an uneducated guess.',
        'strategic',
        'evaluate'
      ),
      skill(
        'math-beg-problem-translation',
        'Translate a practical question into known quantities, unknown quantities, constraints, and operations.',
        'The first visible number always determines the first operation.'
      ),
      skill(
        'math-beg-reasonableness',
        'Check signs, scale, units, and limiting cases to reject unreasonable numerical answers.',
        'Calculator output is automatically a valid answer.',
        'metacognitive',
        'evaluate'
      ),
      skill(
        'math-beg-assumption-record',
        'State assumptions and distinguish measured, given, estimated, and derived values.',
        'Assumptions should remain hidden so an answer looks certain.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  module(
    'math-beginner-number-operations',
    'Number Systems, Signed Quantities, and Reliable Operations',
    'Reconcile inventory gains, losses, temperatures, elevations, and account changes from mixed records.',
    'a signed-quantity inventory reconciliation',
    [
      skill(
        'math-beg-number-sets',
        'Classify natural, whole, integer, rational, irrational, and real numbers by the operations a model needs.',
        'Every decimal is rational and every square root is irrational.',
        'conceptual',
        'analyze'
      ),
      skill(
        'math-beg-place-value',
        'Use place value, scientific notation, and powers of ten to compare very large and very small quantities.',
        'Moving a decimal point does not change scale when zeros are added.'
      ),
      skill(
        'math-beg-signed-operations',
        'Model direction and change with signed numbers and explain each operation on a number line.',
        'A negative sign always means a quantity is physically bad.'
      ),
      skill(
        'math-beg-operation-order',
        'Evaluate grouped expressions with a documented order of operations and intermediate checks.',
        'Operations are performed strictly from left to right.'
      ),
      skill(
        'math-beg-rounding-precision',
        'Round only at a justified reporting boundary while preserving sufficient working precision.',
        'Rounding every intermediate value improves accuracy.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'math-beginner-fractions-ratios',
    'Fractions, Decimals, Ratios, and Proportional Structure',
    'Scale recipes, medication-free training examples, mixtures, maps, and staffing plans without changing relationships.',
    'a proportional scaling and comparison workbook',
    [
      skill(
        'math-beg-fraction-meaning',
        'Represent fractions as part-whole, quotient, ratio, operator, and location meanings in context.',
        'A fraction always describes a piece of one physical object.',
        'conceptual',
        'explain'
      ),
      skill(
        'math-beg-fraction-operations',
        'Add, subtract, multiply, and divide fractions by reasoning about units and equivalent forms.',
        'Numerators and denominators can always be combined independently.'
      ),
      skill(
        'math-beg-decimal-conversion',
        'Convert among fractions, decimals, and terminating or repeating representations without losing meaning.',
        'A longer decimal representation is necessarily more precise.'
      ),
      skill(
        'math-beg-ratio-rate',
        'Distinguish ratios, rates, and unit rates and use units to choose a valid comparison.',
        'Every comparison should be made by subtracting totals.'
      ),
      skill(
        'math-beg-proportion-test',
        'Test proportionality with tables, graphs, equations, and constant ratios.',
        'Two quantities are proportional whenever both increase.',
        'strategic',
        'analyze'
      ),
    ]
  ),
  module(
    'math-beginner-percent-change',
    'Percent, Rates, Markups, Discounts, and Repeated Change',
    'Audit prices, discounts, taxes, tips, population changes, and performance claims.',
    'a consumer percent-claim audit',
    [
      skill(
        'math-beg-percent-base',
        'Identify the comparison base before calculating a percent, percentage, or whole.',
        'The percent base is whichever number appears first.'
      ),
      skill(
        'math-beg-percent-change',
        'Calculate absolute and relative change and explain when each comparison is useful.',
        'A change of ten units always means a ten percent change.'
      ),
      skill(
        'math-beg-markup-discount',
        'Model markup, discount, tax, and tip as ordered multiplicative factors.',
        'A twenty percent increase and twenty percent decrease cancel.'
      ),
      skill(
        'math-beg-repeated-percent',
        'Model repeated percent change with compounding rather than repeated addition.',
        'Repeated rates always apply to the original amount.'
      ),
      skill(
        'math-beg-percent-claims',
        'Detect denominator switching, percentage-point confusion, and selective baselines in public claims.',
        'Percent and percentage-point differences are interchangeable.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'math-beginner-measurement-units',
    'Measurement, SI Units, Dimensional Analysis, and Uncertainty',
    'Measure a room, select materials, convert specifications, and report tolerances for a community repair.',
    'a unit-safe materials estimate',
    [
      skill(
        'math-beg-si-units',
        'Choose appropriate SI base and derived units and write their symbols correctly.',
        'Unit capitalization and spacing never affect technical meaning.',
        'conceptual',
        'apply'
      ),
      skill(
        'math-beg-dimensional-analysis',
        'Convert quantities with unit factors that equal one and cancel dimensions explicitly.',
        'A conversion is safe whenever the numerical value looks familiar.'
      ),
      skill(
        'math-beg-area-volume-units',
        'Square or cube conversion factors when converting area and volume.',
        'Area units use the same linear conversion factor as length.'
      ),
      skill(
        'math-beg-measurement-error',
        'Distinguish resolution, accuracy, precision, tolerance, and measurement uncertainty.',
        'More decimal places guarantee a more accurate measurement.',
        'conceptual',
        'analyze'
      ),
      skill(
        'math-beg-unit-validation',
        'Use dimensional consistency to detect formula and data-entry errors before calculation.',
        'Units are decorative labels added after the arithmetic.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'math-beginner-algebra-formulas',
    'Variables, Expressions, Equations, and Practical Formulas',
    'Build reusable cost, distance, energy, and capacity formulas from stakeholder requirements.',
    'a formula-driven planning calculator',
    [
      skill(
        'math-beg-variable-meaning',
        'Define variables with units and domains rather than treating letters as unlabeled blanks.',
        'A variable may change meaning midway through a solution.',
        'conceptual',
        'apply'
      ),
      skill(
        'math-beg-expression-evaluation',
        'Substitute values into expressions with grouping, units, and intermediate reasonableness checks.',
        'Substitution means deleting parentheses around negative values.'
      ),
      skill(
        'math-beg-linear-equations',
        'Solve one-variable linear equations while preserving equality at every transformation.',
        'Moving a term across the equals sign changes it by magic.'
      ),
      skill(
        'math-beg-formula-rearrange',
        'Rearrange literal formulas to isolate a required quantity and verify dimensions.',
        'A formula can only be used in the arrangement first shown.'
      ),
      skill(
        'math-beg-inequality-constraints',
        'Model limits and feasible ranges with inequalities, including sign reversal under negative scaling.',
        'An inequality behaves exactly like an equation under every operation.'
      ),
    ]
  ),
  module(
    'math-beginner-geometry-scale',
    'Geometry, Scale, Similarity, and Spatial Planning',
    'Create a scale plan for an accessible room layout with paths, clearances, paint, and flooring.',
    'an accessible scale floor plan',
    [
      skill(
        'math-beg-angle-shape',
        'Classify angles and two- and three-dimensional shapes by defining properties rather than appearance.',
        'Rotating a shape changes its mathematical classification.',
        'conceptual',
        'analyze'
      ),
      skill(
        'math-beg-perimeter-area',
        'Choose and justify perimeter or area models for borders, surfaces, and composite regions.',
        'Perimeter and area are interchangeable measures of size.'
      ),
      skill(
        'math-beg-volume-surface',
        'Choose volume or surface-area models for capacity, covering, and packaging tasks.',
        'Doubling every length merely doubles volume.'
      ),
      skill(
        'math-beg-scale-drawing',
        'Use a consistent scale factor to move between drawings and actual dimensions.',
        'A scale drawing can use different scale factors on each axis.'
      ),
      skill(
        'math-beg-similarity-pythagorean',
        'Use similarity and the Pythagorean theorem only when their geometric conditions hold.',
        'The Pythagorean theorem applies to every triangle.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'math-beginner-financial-math',
    'Budgets, Interest, Loans, and Financial Decisions',
    'Compare household plans, emergency savings, credit costs, and loan offers without hiding assumptions.',
    'an explainable household decision model',
    [
      skill(
        'math-beg-budget-model',
        'Classify fixed, variable, periodic, and discretionary cash flows in a time-aligned budget.',
        'A monthly budget can ignore annual and irregular costs.'
      ),
      skill(
        'math-beg-simple-interest',
        'Calculate simple interest and distinguish principal, rate, and time units.',
        'An annual rate can be multiplied by any time value without conversion.'
      ),
      skill(
        'math-beg-compound-interest',
        'Model compound growth by period and distinguish nominal from effective change.',
        'Compound interest adds the same dollar amount every period.'
      ),
      skill(
        'math-beg-loan-total-cost',
        'Compare payment, total repayment, term, fees, and opportunity cost across loan offers.',
        'The smallest monthly payment always identifies the cheapest loan.'
      ),
      skill(
        'math-beg-finance-risk',
        'Perform sensitivity checks on income, rate, and expense assumptions before recommending a plan.',
        'A financial forecast should present one certain future.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'math-beginner-logic-sets',
    'Logic, Sets, Counting, and Decision Rules',
    'Audit eligibility rules and resource allocation without double-counting people or contradicting policy.',
    'a tested eligibility and allocation rule set',
    [
      skill(
        'math-beg-set-membership',
        'Represent categories, subsets, unions, intersections, and complements from precise definitions.',
        'Categories that overlap must be counted as disjoint.'
      ),
      skill(
        'math-beg-venn-counting',
        'Use Venn diagrams and inclusion-exclusion to count overlapping groups exactly once.',
        'Adding group totals always gives the union total.'
      ),
      skill(
        'math-beg-logic-statements',
        'Distinguish statements, predicates, quantifiers, negation, converse, inverse, and contrapositive.',
        'A statement and its converse always have the same truth value.',
        'conceptual',
        'analyze'
      ),
      skill(
        'math-beg-truth-tables',
        'Build truth tables to test compound conditions and policy rules.',
        'The word or always means exactly one condition can be true.'
      ),
      skill(
        'math-beg-decision-consistency',
        'Find unreachable, overlapping, and contradictory cases in multi-condition decision rules.',
        'A rule is complete if its common case works.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'math-beginner-probability-risk',
    'Probability, Counting, Expected Value, and Risk',
    'Compare warranties, games, reliability claims, and scheduling risks with transparent assumptions.',
    'a practical risk and expected-value brief',
    [
      skill(
        'math-beg-sample-space',
        'Define outcomes and sample spaces before assigning probabilities.',
        'Possible outcomes are automatically equally likely.',
        'conceptual',
        'apply'
      ),
      skill(
        'math-beg-probability-rules',
        'Use complement, addition, and multiplication rules with explicit event relationships.',
        'Probabilities of any two events can always be multiplied.'
      ),
      skill(
        'math-beg-conditional-probability',
        'Interpret conditional probability as a changed reference group.',
        'Conditional probability merely reverses the wording of an event.',
        'conceptual',
        'analyze'
      ),
      skill(
        'math-beg-counting-methods',
        'Use tables, trees, multiplication, permutations, or combinations according to order and replacement.',
        'Permutations and combinations answer the same counting question.'
      ),
      skill(
        'math-beg-expected-value',
        'Compute and interpret expected value without claiming it predicts a single outcome.',
        'Expected value is the outcome most likely to occur once.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'math-beginner-data-statistics',
    'Data Questions, Displays, Summaries, and Responsible Claims',
    'Investigate service wait times and satisfaction while protecting the context behind the data.',
    'a community-service data story',
    [
      skill(
        'math-beg-statistical-question',
        'Formulate a statistical question that anticipates variability and names a population.',
        'A question with one fixed answer is automatically statistical.',
        'conceptual',
        'create'
      ),
      skill(
        'math-beg-data-types-sampling',
        'Classify variables and evaluate whether a sample can represent the target population.',
        'A large convenience sample removes selection bias.',
        'strategic',
        'evaluate'
      ),
      skill(
        'math-beg-data-displays',
        'Choose tables and graphs whose encodings fit the variable and comparison.',
        'Any graph type communicates any dataset equally well.'
      ),
      skill(
        'math-beg-center-spread',
        'Compare mean, median, mode, range, quartiles, and standard deviation in context.',
        'The mean is always the most representative center.'
      ),
      skill(
        'math-beg-data-claims',
        'Identify misleading scales, omitted groups, confounding, and correlation-causation errors.',
        'A strong association proves that one variable caused the other.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'math-beginner-graphs-functions',
    'Coordinates, Graphs, Functions, and Rates of Change',
    'Model water use, travel, cost, and capacity from tables, graphs, formulas, and descriptions.',
    'a multi-representation resource dashboard',
    [
      skill(
        'math-beg-coordinate-plane',
        'Plot and interpret ordered pairs with axis quantities, units, origin, and scale.',
        'Swapping coordinates leaves a plotted relationship unchanged.'
      ),
      skill(
        'math-beg-function-input-output',
        'Determine whether a relationship is a function and define practical input and output domains.',
        'Every curved graph fails to represent a function.',
        'conceptual',
        'analyze'
      ),
      skill(
        'math-beg-representation-translate',
        'Translate a relationship among words, tables, graphs, and formulas while preserving meaning.',
        'Equivalent representations must look visually similar.'
      ),
      skill(
        'math-beg-slope-rate',
        'Interpret slope as a signed rate with output units per input unit.',
        'Slope is only a geometric steepness number without units.'
      ),
      skill(
        'math-beg-intercept-domain',
        'Interpret intercepts and restrict conclusions to the meaningful domain of a model.',
        'Every intercept has a practical real-world meaning.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  module(
    'math-beginner-computational-tools',
    'Spreadsheets, Python, Reproducibility, and Calculation Checks',
    'Turn a hand calculation into a reusable, tested worksheet and small Python model.',
    'a reproducible calculation tool with test cases',
    [
      skill(
        'math-beg-spreadsheet-references',
        'Use relative and absolute cell references intentionally in copied formulas.',
        'Copied formulas always keep the intended reference.'
      ),
      skill(
        'math-beg-spreadsheet-validation',
        'Add input constraints, units, labels, and audit cells to a spreadsheet model.',
        'A spreadsheet is self-explanatory because formulas are visible.'
      ),
      skill(
        'math-beg-python-arithmetic',
        'Express a unit-aware calculation as readable Python variables, functions, and output.',
        'Code removes the need to define variables and assumptions.'
      ),
      skill(
        'math-beg-computation-tests',
        'Test normal, boundary, invalid, and independently calculated cases.',
        'One matching example proves a calculation tool is correct.',
        'strategic',
        'evaluate'
      ),
      skill(
        'math-beg-reproducible-report',
        'Publish inputs, method, version, results, limitations, and rerun instructions.',
        'A screenshot is sufficient evidence that a model can be reproduced.',
        'professional',
        'create'
      ),
    ]
  ),
  module(
    'math-beginner-modeling-capstone',
    'Integrated Applied Modeling and Communication',
    'Answer an unfamiliar community planning question from raw requirements through a defensible recommendation.',
    'an independently validated applied-math decision packet',
    [
      skill(
        'math-beg-model-cycle',
        'Iterate through question, assumptions, variables, model, computation, validation, and communication.',
        'Modeling is a one-pass calculation after choosing a formula.',
        'strategic',
        'create'
      ),
      skill(
        'math-beg-model-choice',
        'Compare candidate models and choose the simplest one that preserves material behavior.',
        'The most complicated available model is automatically best.',
        'strategic',
        'evaluate'
      ),
      skill(
        'math-beg-sensitivity',
        'Change material inputs and assumptions to identify which conclusions remain stable.',
        'A result that looks precise does not need sensitivity analysis.'
      ),
      skill(
        'math-beg-limitations',
        'State scope, limitations, uncertainty, and data gaps without weakening useful conclusions.',
        'Limitations should be hidden because they make work look less confident.',
        'professional',
        'evaluate'
      ),
      skill(
        'math-beg-stakeholder-defense',
        'Defend a recommendation with calculations, visual evidence, alternatives, and clear next actions.',
        'Showing arithmetic alone communicates a complete recommendation.',
        'professional',
        'create'
      ),
    ]
  ),
];

export const appliedMathematicsBeginnerConfig = finalize({
  id: 'applied-mathematics-beginner',
  title: 'Beginner Applied Mathematics: Quantitative Decisions',
  version: '2026.1',
  audience: {
    description:
      'Adults and secondary-level learners rebuilding mathematical confidence through practical decisions, measurement, data, finance, and entry-level computational modeling.',
    entryKnowledge: [
      'Read everyday English and use a basic calculator; no algebra or programming course is required.',
    ],
    deviceConstraints: [
      'Desktop or tablet browser with a keyboard; all coding runs in the built-in browser workspace.',
    ],
    accessibilityAssumptions: sharedAccessibility,
  },
  scope: {
    includes: [
      'Quantitative literacy through introductory algebra',
      'Measurement, finance, probability, statistics, geometry, and logic',
      'Spreadsheet and Python-supported applied modeling',
    ],
    excludes: ['Proof-centered pure mathematics', 'Calculus and matrix methods'],
    nextCourses: ['applied-mathematics-intermediate'],
  },
  sources: [
    {
      title: 'OpenStax Contemporary Mathematics',
      authority: 'curriculum-framework',
      url: 'https://openstax.org/details/books/contemporary-mathematics/',
      version: '2023 web edition',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls quantitative-literacy scope, authentic applications, and prerequisite ordering.',
    },
    {
      title: 'NIST SI Units and Metric Education',
      authority: 'standard',
      url: 'https://www.nist.gov/pml/owm/metric-si/si-units',
      version: 'Current 2026 guidance',
      reviewedAt: REVIEWED_AT,
      scope: 'Controls unit notation, dimensional reasoning, measurement, and estimation practice.',
    },
    {
      title: 'ASA GAISE Reports',
      authority: 'curriculum-framework',
      url: 'https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-%28gaise%29-reports',
      version: 'GAISE II and College GAISE',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls the statistical question, data, analysis, and interpretation learning cycle.',
    },
    {
      title: 'SIAM Modeling Across the Curriculum',
      authority: 'curriculum-framework',
      url: 'https://www.siam.org/publications/reports/modeling-across-the-curriculum/',
      version: '2014 report',
      reviewedAt: REVIEWED_AT,
      scope: 'Controls the modeling thread and changed-context project design.',
    },
  ],
  modules: beginnerMathModules,
  projects: [
    project(
      'math-beg-event-budget',
      'Accessible Community Event Budget',
      'math-beginner-percent-change',
      'A volunteer event coordinator',
      'The coordinator needs a quantity, percent, staffing, and contingency plan that survives changed attendance.',
      [
        'math-beg-estimation',
        'math-beg-proportion-test',
        'math-beg-percent-change',
        'math-beg-repeated-percent',
      ]
    ),
    project(
      'math-beg-room-plan',
      'Measured Community Room Retrofit',
      'math-beginner-financial-math',
      'A community center facilities lead',
      'The center needs a measured accessible layout, materials estimate, and financing comparison.',
      [
        'math-beg-dimensional-analysis',
        'math-beg-area-volume-units',
        'math-beg-scale-drawing',
        'math-beg-loan-total-cost',
      ]
    ),
    project(
      'math-beg-service-data',
      'Service Wait-Time and Access Study',
      'math-beginner-data-statistics',
      'A public service program manager',
      'The manager needs an honest data summary that identifies variation, bias, and actionable access problems.',
      [
        'math-beg-statistical-question',
        'math-beg-data-types-sampling',
        'math-beg-center-spread',
        'math-beg-data-claims',
      ]
    ),
    project(
      'math-beg-decision-capstone',
      'Local Resource Decision Model',
      'math-beginner-modeling-capstone',
      'A neighborhood resource coalition',
      'The coalition needs a reproducible recommendation that integrates quantities, constraints, uncertainty, and stakeholder communication.',
      [
        'math-beg-model-cycle',
        'math-beg-model-choice',
        'math-beg-sensitivity',
        'math-beg-stakeholder-defense',
      ]
    ),
  ],
  examContext:
    'A cumulative set of unfamiliar household, workplace, civic, measurement, data, and computational decisions with no copied exercise wording.',
  minimumQuestionBankSize: 320,
});

function mathSkill(prefix, id, statement, misconception, type = 'procedural', level = 'apply') {
  return skill(`${prefix}-${id}`, statement, misconception, type, level);
}

const intermediateMathModules = [
  [
    'modeling-uncertainty',
    'Modeling Cycles, Units, Error, and Uncertainty',
    'Evaluate demand and capacity for a public program using incomplete measurements.',
    'a validated demand-capacity model',
    [
      [
        'model-questions',
        'Turn stakeholder needs into answerable model questions, quantities, constraints, and validation criteria.',
        'A stakeholder request arrives as a complete mathematical problem.',
      ],
      [
        'units-scales',
        'Track units, scales, significant digits, and uncertainty through multi-stage calculations.',
        'Units can be restored after a dimensionless calculation.',
      ],
      [
        'error-propagation',
        'Estimate how measurement and rounding error affect a computed result.',
        'Small input errors never matter in a long calculation.',
      ],
      [
        'model-assumptions',
        'Classify structural, parameter, and data assumptions and test material ones.',
        'All assumptions have equal influence on a conclusion.',
        'strategic',
        'evaluate',
      ],
      [
        'model-validation',
        'Validate a model against held-out cases, limits, units, and stakeholder behavior.',
        'A model is valid when its training examples fit.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'algebra-structure',
    'Algebraic Structure, Equations, and Inequalities',
    'Build a tariff and break-even calculator with piecewise constraints.',
    'an audited tariff and break-even model',
    [
      [
        'algebra-equivalence',
        'Transform expressions and equations while stating domain restrictions and preserving equivalence.',
        'Any canceled factor may be ignored for every input.',
      ],
      [
        'rational-radical',
        'Solve rational and radical equations and reject introduced or excluded solutions.',
        'Every algebraically produced solution satisfies the original equation.',
      ],
      [
        'absolute-piecewise',
        'Model thresholds and distance with absolute-value and piecewise relationships.',
        'A piecewise function is discontinuous at every boundary.',
      ],
      [
        'inequality-systems',
        'Solve and graph compound and two-variable inequality systems as feasible regions.',
        'Testing one point proves an entire boundary is feasible.',
      ],
      [
        'parameter-sensitivity',
        'Analyze how parameter changes move roots, intersections, and feasible ranges.',
        'Parameters are fixed constants with no modeling interpretation.',
        'strategic',
        'analyze',
      ],
    ],
  ],
  [
    'functions-representations',
    'Functions, Transformations, Inverses, and Composition',
    'Model sensor calibration and reversible conversions across representations.',
    'a calibration and conversion library',
    [
      [
        'function-contract',
        'Define function domain, codomain, range, units, and practical interpretation.',
        'A formula alone fully defines a practical function.',
      ],
      [
        'function-transform',
        'Predict how translations, scaling, reflection, and composition change a model.',
        'Graph transformations change every coefficient in the same way.',
      ],
      [
        'inverse-functions',
        'Construct and validate inverses under one-to-one domain restrictions.',
        'Every function has an inverse function on its original domain.',
      ],
      [
        'composition',
        'Compose functions while checking intermediate domain and unit compatibility.',
        'Compatible-looking formulas can always be composed.',
      ],
      [
        'multi-representation',
        'Reconcile tables, equations, graphs, and code implementations of one function.',
        'Visual agreement at a few points proves implementations equivalent.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'linear-systems',
    'Linear Models, Regression, and Systems',
    'Allocate staff and supplies under multiple linear constraints.',
    'a linear allocation and scenario model',
    [
      [
        'linear-rate-intercept',
        'Fit and interpret linear rate and intercept parameters with units and domain limits.',
        'A nonzero intercept is always meaningful.',
      ],
      [
        'linear-regression',
        'Fit a linear regression and inspect residuals before using its predictions.',
        'A high correlation guarantees a suitable linear model.',
      ],
      [
        'system-solutions',
        'Solve linear systems and classify unique, absent, and infinite solutions.',
        'Every pair of linear equations intersects once.',
      ],
      [
        'system-matrices',
        'Represent and solve systems with augmented matrices and row operations.',
        'Row operations change the solution set.',
      ],
      [
        'linear-decision',
        'Use sensitivity and shadow interpretations to defend a constrained linear decision.',
        'An optimizer output needs no interpretation or stress test.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'nonlinear-models',
    'Polynomial, Rational, and Nonlinear Models',
    'Compare alternative growth and geometry models for a production process.',
    'a nonlinear model comparison report',
    [
      [
        'polynomial-shape',
        'Relate polynomial degree, roots, multiplicity, end behavior, and turning points.',
        'A polynomial graph can cross each root only once.',
      ],
      [
        'polynomial-fit',
        'Fit and critique polynomial models without extrapolating unsupported behavior.',
        'Higher degree always produces a better predictive model.',
      ],
      [
        'rational-asymptotes',
        'Interpret zeros, holes, asymptotes, and domain restrictions in rational models.',
        'An asymptote is a line a graph can never cross.',
      ],
      [
        'nonlinear-roots',
        'Find nonlinear roots graphically and numerically and verify them in the original model.',
        'A calculator root is exact and unique.',
      ],
      [
        'model-selection',
        'Compare nonlinear candidates using residual patterns, simplicity, mechanism, and validation.',
        'The curve with the smallest training error must be selected.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'growth-logarithms',
    'Exponential Growth, Decay, and Logarithmic Scales',
    'Model adoption, cooling, depreciation, and sound-level measurements.',
    'an exponential and logarithmic scenario lab',
    [
      [
        'exponential-factors',
        'Distinguish additive change from multiplicative growth and derive period factors.',
        'A constant percentage produces a linear graph.',
      ],
      [
        'growth-decay-models',
        'Fit exponential growth and decay parameters with explicit initial conditions.',
        'Every decreasing process follows exponential decay.',
      ],
      [
        'logarithm-inverse',
        'Use logarithms as inverses to solve for time, rate, or exponent.',
        'Logarithms are merely calculator buttons without model meaning.',
      ],
      [
        'log-scales',
        'Interpret orders of magnitude and changes on logarithmic measurement scales.',
        'Equal distances on a log scale represent equal additive changes.',
      ],
      [
        'growth-limitations',
        'Identify saturation, regime changes, and extrapolation risks in exponential models.',
        'Exponential growth can continue indefinitely in a finite system.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'trigonometry-vectors',
    'Trigonometry, Vectors, and Periodic Systems',
    'Plan bearings, slopes, cyclic demand, and resultant forces.',
    'a navigation and periodic-demand model',
    [
      [
        'radian-unit-circle',
        'Use radians and the unit circle to define trigonometric functions and periodicity.',
        'Degrees are intrinsic inputs to every trigonometric formula.',
      ],
      [
        'right-triangle-models',
        'Apply right-triangle ratios with diagrams, units, and angle conditions.',
        'Any known angle and side always determine a unique triangle.',
      ],
      [
        'nonright-triangles',
        'Choose laws of sines or cosines and detect ambiguous cases.',
        'The law of sines always returns one physical configuration.',
      ],
      [
        'vectors-components',
        'Resolve vectors into components and reconstruct magnitude and direction.',
        'Vector magnitudes can be added regardless of direction.',
      ],
      [
        'sinusoidal-fit',
        'Fit amplitude, period, phase, and midline to a periodic dataset.',
        'Every repeating pattern is exactly sinusoidal.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'sequences-discrete',
    'Sequences, Recurrences, and Discrete Change',
    'Forecast savings, inventory, and staged population processes.',
    'a discrete recurrence forecast',
    [
      [
        'sequence-notation',
        'Represent explicit and recursive sequences and state valid index domains.',
        'An explicit formula and recurrence require identical inputs.',
      ],
      [
        'arithmetic-geometric',
        'Model constant differences and constant ratios with arithmetic and geometric sequences.',
        'Any increasing sequence is geometric.',
      ],
      [
        'finite-series',
        'Calculate finite sums and explain their accumulated quantity and units.',
        'A sequence term and its partial sum are the same quantity.',
      ],
      [
        'recurrence-models',
        'Build and simulate recurrence relations with initial conditions and constraints.',
        'A recurrence can run without an initial state.',
      ],
      [
        'discrete-stability',
        'Inspect long-run behavior and sensitivity of discrete models.',
        'A small one-step error remains small forever.',
        'strategic',
        'analyze',
      ],
    ],
  ],
  [
    'probability-combinatorics',
    'Combinatorics, Conditional Probability, and Simulation',
    'Analyze staffing reliability, screening results, and queue risks.',
    'a simulated operational risk model',
    [
      [
        'counting-design',
        'Choose multiplication, permutations, combinations, or inclusion-exclusion from event structure.',
        'All counting problems can be solved by factorials alone.',
      ],
      [
        'conditional-bayes',
        'Update probabilities with conditional information and Bayes reasoning.',
        'A positive result probability equals the condition probability in reverse.',
      ],
      [
        'independence',
        'Test independence and distinguish it from mutually exclusive events.',
        'Events that cannot co-occur are independent.',
      ],
      [
        'random-variables',
        'Define discrete random variables and calculate expectation and variance.',
        'Expected value must be a possible observed value.',
      ],
      [
        'monte-carlo',
        'Design reproducible simulations and quantify Monte Carlo sampling error.',
        'One large simulation produces an exact probability.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'statistics-inference',
    'Sampling, Inference, Regression, and Causal Limits',
    'Evaluate a program change from sampled observational and experimental evidence.',
    'an inference and limitations brief',
    [
      [
        'study-design',
        'Distinguish observational studies, experiments, sampling frames, randomization, and blocking.',
        'Random sampling and random assignment serve the same purpose.',
      ],
      [
        'sampling-distributions',
        'Explain sampling variability through simulated sampling distributions.',
        'A sample statistic has no uncertainty once calculated.',
      ],
      [
        'confidence-intervals',
        'Construct and interpret confidence intervals without probability misstatements.',
        'A computed interval has the stated probability of containing a fixed parameter.',
      ],
      [
        'hypothesis-tests',
        'Define hypotheses, errors, significance, effect size, and decision limits.',
        'A small p-value measures practical importance.',
      ],
      [
        'regression-diagnostics',
        'Inspect residuals, leverage, confounding, and extrapolation before regression claims.',
        'Regression software validates causal conclusions automatically.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'matrix-methods',
    'Vectors, Matrices, Transformations, and Data Systems',
    'Represent flows and transformations across a small service system.',
    'a matrix-based flow and transformation model',
    [
      [
        'matrix-operations',
        'Use matrix dimensions to validate addition, multiplication, and transformations.',
        'Matrix multiplication is element-by-element multiplication.',
      ],
      [
        'linear-transformations',
        'Interpret matrices as transformations of vectors and coordinate systems.',
        'A matrix is only a rectangular storage table.',
      ],
      [
        'inverse-conditioning',
        'Solve invertible systems and distinguish existence from numerical stability.',
        'A nonzero determinant guarantees a reliable numerical solution.',
      ],
      [
        'determinant-geometry',
        'Interpret determinants as signed scale factors and singularity evidence.',
        'The determinant is merely a memorized arithmetic recipe.',
      ],
      [
        'matrix-applications',
        'Build transition, network, and resource matrices from domain relationships.',
        'Matrix orientation does not affect the meaning of a model.',
        'strategic',
        'create',
      ],
    ],
  ],
  [
    'optimization',
    'Linear Programming and Constrained Optimization',
    'Choose a fair production and distribution plan under limited resources.',
    'an explainable constrained optimization model',
    [
      [
        'objective-constraints',
        'Define decision variables, objective, constraints, units, and feasible domain.',
        'Optimization begins by selecting an algorithm.',
      ],
      [
        'graphical-linear-programming',
        'Solve two-variable linear programs graphically and verify corner candidates.',
        'The optimum must occur where both axes are positive.',
      ],
      [
        'solver-modeling',
        'Encode a constrained model for a solver and independently validate its solution.',
        'A solver status of success proves the model matches reality.',
      ],
      [
        'sensitivity-tradeoffs',
        'Analyze active constraints, slack, parameter changes, and competing objectives.',
        'One optimal solution remains best under any parameter change.',
      ],
      [
        'optimization-ethics',
        'Evaluate whose costs and benefits an objective includes or omits.',
        'A mathematically optimal plan is automatically fair.',
        'professional',
        'evaluate',
      ],
    ],
  ],
  [
    'numerical-python',
    'Numerical Computing, Arrays, Visualization, and Reproducibility',
    'Implement and test reusable computational models over real datasets.',
    'a tested numerical Python notebook and module',
    [
      [
        'floating-point',
        'Explain floating-point approximation and compare values with justified tolerances.',
        'Binary floating-point stores every decimal exactly.',
      ],
      [
        'numpy-arrays',
        'Use NumPy arrays, shapes, dtypes, indexing, and vectorized operations intentionally.',
        'A NumPy array behaves exactly like a nested Python list.',
      ],
      [
        'visualization',
        'Choose visual encodings, scales, labels, and uncertainty displays that support the question.',
        'A decorative chart is evidence even when scales and units are absent.',
      ],
      [
        'numerical-tests',
        'Test numerical code with invariants, reference cases, tolerances, and randomized cases.',
        'Exact equality is the correct assertion for all computed floats.',
      ],
      [
        'reproducible-computation',
        'Pin inputs and environments and separate exploration from rerunnable analysis.',
        'A notebook that ran once is inherently reproducible.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'graphs-networks',
    'Graph Theory, Networks, Scheduling, and Routing',
    'Design routes and schedules for deliveries and shared services.',
    'a network routing and scheduling analysis',
    [
      [
        'graph-representation',
        'Represent vertices, edges, direction, weights, and attributes from a real system.',
        'Every network edge should be undirected and equally weighted.',
      ],
      [
        'paths-connectivity',
        'Analyze paths, cycles, components, reachability, and bottlenecks.',
        'A connected network guarantees short routes.',
      ],
      [
        'trees-spanning',
        'Use trees and spanning structures for hierarchy and low-cost connectivity.',
        'Every connected subgraph is a tree.',
      ],
      [
        'shortest-path',
        'Compute shortest paths and verify that edge assumptions fit the algorithm.',
        'The route with the fewest edges always has minimum cost.',
      ],
      [
        'network-tradeoffs',
        'Compare efficiency, resilience, fairness, and capacity in network decisions.',
        'A globally shortest route cannot overload shared resources.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'integrated-capstone',
    'Integrated Intermediate Modeling Capstone',
    'Build a decision model from messy requirements, data, constraints, and alternatives.',
    'a stakeholder-ready computational modeling portfolio',
    [
      [
        'problem-decomposition',
        'Decompose an unfamiliar decision into linked algebraic, statistical, and computational submodels.',
        'One familiar formula should control the whole problem.',
        'strategic',
        'create',
      ],
      [
        'candidate-comparison',
        'Compare multiple plausible models with validation evidence and complexity costs.',
        'Model selection can be based on fit alone.',
        'strategic',
        'evaluate',
      ],
      [
        'uncertainty-scenarios',
        'Propagate uncertainty through best, expected, and adverse scenarios.',
        'Scenario analysis is equivalent to predicting three futures.',
      ],
      [
        'technical-communication',
        'Explain methods and limitations with equations, code, visuals, and plain-language implications.',
        'Technical correctness removes the need for audience adaptation.',
        'professional',
        'create',
      ],
      [
        'model-governance',
        'Document data provenance, revisions, approvals, and conditions requiring model retirement.',
        'A deployed model needs no ownership or maintenance plan.',
        'professional',
        'evaluate',
      ],
    ],
  ],
].map(([id, title, context, artifact, entries]) =>
  module(
    `math-intermediate-${id}`,
    title,
    context,
    artifact,
    entries.map(([skillId, statement, misconception, type, level]) =>
      mathSkill('math-int', skillId, statement, misconception, type, level)
    )
  )
);

export const appliedMathematicsIntermediateConfig = finalize({
  id: 'applied-mathematics-intermediate',
  title: 'Intermediate Applied Mathematics: Models and Data',
  version: '2026.1',
  audience: {
    description:
      'Learners with arithmetic and introductory algebra fluency who want rigorous function, data, probability, optimization, network, and computational modeling skill.',
    entryKnowledge: [
      'Complete Beginner Applied Mathematics or demonstrate fractions, percent, equations, graphs, units, and introductory Python skill.',
    ],
    deviceConstraints: [
      'Desktop or tablet browser with the built-in Python workspace; a local scientific Python environment is optional.',
    ],
    accessibilityAssumptions: sharedAccessibility,
  },
  scope: {
    includes: [
      'Algebra and trigonometry through model comparison',
      'Probability, inference, optimization, matrices, and graph methods',
      'NumPy-supported reproducible computation',
    ],
    excludes: ['Proof-centered real analysis', 'Multivariable calculus and differential equations'],
    nextCourses: ['applied-mathematics-advanced'],
  },
  sources: [
    {
      title: 'OpenStax Algebra and Trigonometry 2e',
      authority: 'curriculum-framework',
      url: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/preface',
      version: '2e',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls prerequisite order across algebra, functions, systems, trigonometry, sequences, and probability.',
    },
    {
      title: 'OpenStax Introductory Statistics 2e',
      authority: 'curriculum-framework',
      url: 'https://openstax.org/details/books/introductory-statistics-2e',
      version: '2e',
      reviewedAt: REVIEWED_AT,
      scope: 'Controls introductory inference, regression, and application scope.',
    },
    {
      title: 'NumPy Documentation',
      authority: 'official-docs',
      url: 'https://numpy.org/doc/stable/',
      version: 'NumPy 2.5',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls arrays, numerical operations, linear algebra, random simulation, and testing APIs.',
    },
    {
      title: 'ASA GAISE Reports',
      authority: 'curriculum-framework',
      url: 'https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-%28gaise%29-reports',
      version: 'GAISE II and College revision materials',
      reviewedAt: REVIEWED_AT,
      scope: 'Controls simulation-first statistical reasoning and interpretation.',
    },
  ],
  modules: intermediateMathModules,
  projects: [
    project(
      'math-int-tariff-model',
      'Equitable Utility Tariff Model',
      'math-intermediate-linear-systems',
      'A municipal utility analyst',
      'The analyst needs an explainable rate and assistance model under revenue and affordability constraints.',
      [
        'math-int-model-questions',
        'math-int-absolute-piecewise',
        'math-int-linear-regression',
        'math-int-linear-decision',
      ]
    ),
    project(
      'math-int-demand-risk',
      'Program Demand and Reliability Forecast',
      'math-intermediate-statistics-inference',
      'A regional service planner',
      'The planner needs demand scenarios and reliability risks with honest uncertainty and causal limits.',
      [
        'math-int-growth-decay-models',
        'math-int-monte-carlo',
        'math-int-confidence-intervals',
        'math-int-regression-diagnostics',
      ]
    ),
    project(
      'math-int-routing-allocation',
      'Mobile Service Routing and Allocation',
      'math-intermediate-graphs-networks',
      'A mobile health outreach coordinator',
      'The coordinator needs feasible routes and resource allocations that balance travel, capacity, access, and resilience.',
      [
        'math-int-objective-constraints',
        'math-int-sensitivity-tradeoffs',
        'math-int-shortest-path',
        'math-int-network-tradeoffs',
      ]
    ),
    project(
      'math-int-modeling-capstone',
      'Regional Resource Modeling Portfolio',
      'math-intermediate-integrated-capstone',
      'A cross-agency planning group',
      'The group needs a reproducible model portfolio that joins demand, uncertainty, constraints, and alternatives.',
      [
        'math-int-problem-decomposition',
        'math-int-candidate-comparison',
        'math-int-uncertainty-scenarios',
        'math-int-model-governance',
      ]
    ),
  ],
  examContext:
    'Unfamiliar scientific, civic, financial, operational, and data cases requiring model construction, calculation, code, critique, and transfer.',
  minimumQuestionBankSize: 360,
});

const advancedMathModules = [
  [
    'model-rigor',
    'Model Formulation, Identifiability, and Validation',
    [
      'identifiability',
      'nondimensionalization',
      'calibration-validation',
      'sensitivity-analysis',
      'model-governance',
    ],
  ],
  [
    'vector-geometry',
    'Vectors, Geometry, and Multivariable Functions',
    [
      'vector-spaces',
      'dot-cross-products',
      'planes-surfaces',
      'multivariable-functions',
      'coordinate-transforms',
    ],
  ],
  [
    'differential-calculus',
    'Limits, Derivatives, and Local Approximation',
    [
      'limit-models',
      'derivative-definition',
      'derivative-rules',
      'linearization',
      'optimization-calculus',
    ],
  ],
  [
    'integral-calculus',
    'Integration, Accumulation, and Continuous Models',
    [
      'riemann-accumulation',
      'fundamental-theorem',
      'integration-methods',
      'improper-integrals',
      'physical-accumulation',
    ],
  ],
  [
    'multivariable-calculus',
    'Multivariable Calculus and Fields',
    [
      'partial-derivatives',
      'gradient-directional',
      'multiple-integrals',
      'line-surface-integrals',
      'vector-field-theorems',
    ],
  ],
  [
    'linear-transformations',
    'Linear Systems, Spaces, and Transformations',
    [
      'linear-independence',
      'basis-dimension',
      'matrix-transformations',
      'rank-nullspace',
      'least-squares',
    ],
  ],
  [
    'spectral-methods',
    'Eigenvalues, Decompositions, and Dimension Reduction',
    [
      'eigen-systems',
      'diagonalization',
      'orthogonality-qr',
      'svd-pseudoinverse',
      'principal-components',
    ],
  ],
  [
    'differential-equations',
    'Ordinary Differential Equations and Initial Values',
    [
      'first-order-odes',
      'second-order-odes',
      'systems-odes',
      'laplace-transforms',
      'numerical-ivp',
    ],
  ],
  [
    'dynamical-systems',
    'Nonlinear Dynamics, Stability, and Control',
    [
      'phase-portraits',
      'equilibria-stability',
      'linearization-systems',
      'bifurcation-chaos',
      'feedback-control',
    ],
  ],
  [
    'stochastic-models',
    'Probability Models and Stochastic Processes',
    [
      'continuous-random-variables',
      'joint-conditional',
      'limit-theorems',
      'markov-chains',
      'poisson-processes',
    ],
  ],
  [
    'advanced-statistics',
    'Statistical Inference, Bayesian Updating, and Prediction',
    [
      'likelihood-estimation',
      'interval-test-theory',
      'bayesian-models',
      'generalized-regression',
      'predictive-validation',
    ],
  ],
  [
    'numerical-foundations',
    'Numerical Error, Roots, Interpolation, and Quadrature',
    [
      'conditioning-stability',
      'root-finding',
      'interpolation-splines',
      'numerical-differentiation',
      'numerical-quadrature',
    ],
  ],
  [
    'numerical-linear-optimization',
    'Numerical Linear Algebra and Optimization',
    [
      'direct-iterative-solvers',
      'matrix-conditioning',
      'gradient-methods',
      'constrained-optimization',
      'automatic-differentiation',
    ],
  ],
  [
    'partial-differential-equations',
    'Partial Differential Equations and Continuum Models',
    [
      'pde-classification',
      'boundary-initial-conditions',
      'separation-variables',
      'finite-difference-pde',
      'conservation-laws',
    ],
  ],
  [
    'signals-fourier',
    'Fourier Analysis, Signals, and Time Series',
    [
      'fourier-series',
      'fourier-transform',
      'sampling-aliasing',
      'filtering-convolution',
      'time-series-forecast',
    ],
  ],
  [
    'operations-research',
    'Networks, Queues, Simulation, and Operations Research',
    [
      'network-flow',
      'integer-programming',
      'queueing-models',
      'discrete-event-simulation',
      'multiobjective-decisions',
    ],
  ],
  [
    'capstone-reproducibility',
    'Advanced Modeling Capstone and Reproducible Research',
    [
      'research-question',
      'computational-experiment',
      'verification-validation',
      'uncertainty-communication',
      'reproducible-release',
    ],
  ],
].map(([id, title, skillIds], moduleIndex) => {
  const contexts = [
    'energy demand and storage',
    'navigation and spatial sensing',
    'changing biological or economic rates',
    'accumulated flow and exposure',
    'temperature and transport fields',
    'coupled production and measurement systems',
    'high-dimensional sensor data',
    'population and mechanical dynamics',
    'controlled nonlinear systems',
    'reliability and arrival processes',
    'evidence-based prediction',
    'precision-sensitive scientific computation',
    'large constrained computational models',
    'diffusion, waves, and transport',
    'signals and temporal demand',
    'routing, queues, and allocation',
    'an independently reviewed applied research question',
  ];
  return module(
    `math-advanced-${id}`,
    title,
    `Build, test, and communicate a model involving ${contexts[moduleIndex]}.`,
    `a reproducible ${id.replaceAll('-', ' ')} computational study`,
    skillIds.map((idValue, skillIndex) =>
      mathSkill(
        'math-adv',
        idValue,
        `${['Formulate', 'Derive', 'Compute', 'Validate', 'Communicate'][skillIndex]} ${idValue.replaceAll('-', ' ')} in a dimensioned applied model and defend the method's assumptions.`,
        `${idValue.replaceAll('-', ' ')} can be applied from a memorized formula without checking assumptions, conditioning, or validation.`,
        skillIndex === 0 ? 'conceptual' : skillIndex === 4 ? 'professional' : 'procedural',
        skillIndex >= 3 ? 'evaluate' : 'apply'
      )
    )
  );
});

export const appliedMathematicsAdvancedConfig = finalize({
  id: 'applied-mathematics-advanced',
  title: 'Advanced Applied Mathematics: Computational Systems',
  version: '2026.1',
  audience: {
    description:
      'Learners prepared for calculus-level work who want an integrated computational path through continuous, discrete, stochastic, optimization, and research-grade modeling.',
    entryKnowledge: [
      'Complete Intermediate Applied Mathematics or demonstrate algebra, trigonometry, probability, matrices, statistics, and Python numerical computing.',
    ],
    deviceConstraints: [
      'Desktop strongly recommended; browser Python supports core work while optional local NumPy and SciPy environments support extended projects.',
    ],
    accessibilityAssumptions: sharedAccessibility,
  },
  scope: {
    includes: [
      'Single and multivariable calculus with applications',
      'Linear algebra, differential equations, probability, statistics, and optimization',
      'Numerical methods, PDEs, signals, operations research, and reproducible modeling',
    ],
    excludes: ['Measure-theoretic probability', 'Proof-centered graduate functional analysis'],
    nextCourses: [],
  },
  sources: [
    {
      title: 'OpenStax Calculus Volumes 1 through 3',
      authority: 'curriculum-framework',
      url: 'https://openstax.org/subjects/math/',
      version: 'Current web editions',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls calculus scope and prerequisite order across single and multivariable topics.',
    },
    {
      title: 'SIAM Applied Mathematics Program Report',
      authority: 'curriculum-framework',
      url: 'https://epubs.siam.org/doi/10.1137/15M1008002',
      version: 'SIAM education report',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls integrated applied, computational, industry, research, and communication outcomes.',
    },
    {
      title: 'NumPy Documentation',
      authority: 'official-docs',
      url: 'https://numpy.org/doc/stable/',
      version: 'NumPy 2.5',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls array, linear algebra, random, Fourier, and numerical implementation practice.',
    },
    {
      title: 'SciPy Documentation',
      authority: 'official-docs',
      url: 'https://docs.scipy.org/doc/scipy/',
      version: 'Current 2026 stable',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls numerical integration, optimization, interpolation, differential equations, and scientific validation APIs.',
    },
  ],
  modules: advancedMathModules,
  projects: [
    project(
      'math-adv-energy-system',
      'Energy Demand and Storage Dynamics',
      'math-advanced-differential-equations',
      'A community microgrid planning team',
      'The team needs a calibrated dynamic storage model with unit, solver, and uncertainty evidence.',
      [
        'math-adv-identifiability',
        'math-adv-numerical-ivp',
        'math-adv-least-squares',
        'math-adv-calibration-validation',
      ]
    ),
    project(
      'math-adv-reliability-study',
      'Stochastic Service Reliability Study',
      'math-advanced-advanced-statistics',
      'A critical service reliability manager',
      'The manager needs arrival, failure, and recovery predictions with Bayesian and simulation evidence.',
      [
        'math-adv-markov-chains',
        'math-adv-poisson-processes',
        'math-adv-bayesian-models',
        'math-adv-predictive-validation',
      ]
    ),
    project(
      'math-adv-transport-optimization',
      'Regional Transport and Allocation Optimizer',
      'math-advanced-operations-research',
      'A regional emergency logistics group',
      'The group needs a resilient routing, queueing, and allocation policy under competing objectives.',
      [
        'math-adv-network-flow',
        'math-adv-integer-programming',
        'math-adv-queueing-models',
        'math-adv-multiobjective-decisions',
      ]
    ),
    project(
      'math-adv-research-capstone',
      'Reproducible Applied Mathematics Research Capstone',
      'math-advanced-capstone-reproducibility',
      'An interdisciplinary technical review panel',
      'The panel needs a novel, reproducible model with verification, validation, uncertainty, and an auditable release.',
      [
        'math-adv-research-question',
        'math-adv-computational-experiment',
        'math-adv-uncertainty-communication',
        'math-adv-reproducible-release',
      ]
    ),
  ],
  examContext:
    'Cumulative unfamiliar continuous, discrete, stochastic, numerical, and optimization cases requiring derivation, implementation, validation, and professional defense.',
  minimumQuestionBankSize: 420,
});

function agentModules(coursePrefix, rawModules) {
  return rawModules.map(([id, title, context, artifact, rawSkills]) =>
    module(
      `${coursePrefix}-${id}`,
      title,
      context,
      artifact,
      rawSkills.map(([skillId, statement, misconception, type, level]) =>
        skill(`${coursePrefix}-${skillId}`, statement, misconception, type, level)
      )
    )
  );
}

const promptModules = agentModules('prompt', [
  [
    'success-evals',
    'Success Criteria, Baselines, and Prompt Evals',
    'Define and test a support-triage prompt before optimizing its wording.',
    'a versioned prompt evaluation harness',
    [
      [
        'task-contract',
        'Define the user, task, decision, acceptable output, and material failure modes before drafting a prompt.',
        'Prompt quality can be judged without a defined task outcome.',
        'strategic',
        'create',
      ],
      [
        'success-criteria',
        'Turn subjective quality goals into observable criteria and representative test cases.',
        'A prompt is good when one impressive example works.',
        'strategic',
        'evaluate',
      ],
      [
        'baseline-prompt',
        'Create a minimal baseline prompt before adding scaffolding or examples.',
        'The longest initial prompt is the fairest baseline.',
      ],
      [
        'eval-dataset',
        'Build normal, boundary, adversarial, and changed-context evaluation cases.',
        'Random happy-path examples reveal production reliability.',
        'strategic',
        'create',
      ],
      [
        'judge-review',
        'Combine deterministic checks, rubric review, and human inspection without treating one judge as truth.',
        'An LLM judge eliminates the need for calibrated human review.',
        'metacognitive',
        'evaluate',
      ],
    ],
  ],
  [
    'model-surface',
    'Model, Surface, Capability, and Constraint Selection',
    'Choose between Claude and Codex surfaces for a repository and document task.',
    'a capability and surface decision matrix',
    [
      [
        'surface-fit',
        'Choose chat, coding-agent, API, or workflow surfaces according to state, tools, latency, and review needs.',
        'All model surfaces differ only in visual appearance.',
        'strategic',
        'evaluate',
      ],
      [
        'capability-discovery',
        'Verify current model and tool capabilities from official documentation rather than remembered names.',
        'A remembered model list remains current indefinitely.',
        'professional',
        'evaluate',
      ],
      [
        'reasoning-effort',
        'Match reasoning effort and autonomy to task complexity, reversibility, and verification cost.',
        'Maximum reasoning is always the fastest and cheapest option.',
      ],
      [
        'context-budget',
        'Allocate context to governing instructions, task evidence, examples, and tool results according to value.',
        'More context always improves output quality.',
      ],
      [
        'provider-portability',
        'Separate stable task contracts from provider-specific syntax and capability assumptions.',
        'One provider prompt should be copied unchanged everywhere.',
        'strategic',
        'create',
      ],
    ],
  ],
  [
    'prompt-anatomy',
    'Goals, Context, Outputs, Boundaries, and Done Conditions',
    'Write a production-ready prompt for a high-impact code and document change.',
    'a reusable goal-context-output-boundary template',
    [
      [
        'goal-first',
        'State the desired result and audience before prescribing implementation steps.',
        'A prompt should begin with every action the model must take.',
      ],
      [
        'relevant-context',
        'Provide context that can change the result and route the agent to authoritative sources.',
        'Attaching the entire repository is always optimal.',
      ],
      [
        'output-contract',
        'Specify output structure, granularity, evidence, and machine-readable constraints when they matter.',
        'The word professional defines a complete output format.',
      ],
      [
        'boundaries',
        'Name material do-not-change, authorization, safety, and escalation boundaries.',
        'More prohibitions always make an agent safer and more capable.',
      ],
      [
        'done-conditions',
        'Define observable completion checks including tests, review, and unresolved-evidence reporting.',
        'Done means the model produced a fluent answer.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'context-engineering',
    'Context Engineering and Repository Grounding',
    'Ground an agent in a large unfamiliar repository without flooding its context.',
    'a repository context map and retrieval plan',
    [
      [
        'source-authority',
        'Rank repository files, official docs, generated artifacts, tests, and user statements by authority for the task.',
        'The first matching file is the source of truth.',
        'strategic',
        'evaluate',
      ],
      [
        'context-routing',
        'Provide paths, search terms, dependency boundaries, and examples that route efficient discovery.',
        'Context engineering means pasting all potentially related text.',
      ],
      [
        'durable-instructions',
        'Separate one-turn constraints from durable repository instructions such as AGENTS.md or CLAUDE.md.',
        'Every task detail belongs in a permanent instruction file.',
      ],
      [
        'conflict-resolution',
        'Detect conflicting instructions and evidence and apply a documented precedence rule.',
        'Models silently reconcile contradictory sources correctly.',
      ],
      [
        'context-refresh',
        'Refresh drift-prone facts and summarize stable discoveries before context compaction.',
        'Once loaded, external documentation never needs revalidation.',
        'metacognitive',
        'evaluate',
      ],
    ],
  ],
  [
    'examples-structure',
    'Examples, Delimiters, Templates, and Structured Output',
    'Stabilize a classification and extraction prompt across varied inputs.',
    'a tested prompt template with diverse examples',
    [
      [
        'example-selection',
        'Choose relevant and diverse examples that cover boundaries without teaching accidental shortcuts.',
        'One ideal example is sufficient for every input distribution.',
      ],
      [
        'negative-examples',
        'Include counterexamples and near misses when category boundaries are material.',
        'Only successful examples can teach desired behavior.',
      ],
      [
        'structured-sections',
        'Separate instructions, context, examples, and variable data with clear headings or provider-appropriate tags.',
        'Decorative structure improves performance regardless of content.',
      ],
      [
        'schema-output',
        'Use explicit schemas and validation when downstream code requires structured output.',
        'Asking for JSON guarantees syntactically valid schema-conforming data.',
      ],
      [
        'template-versioning',
        'Version fixed prompt text separately from variable inputs and evaluation data.',
        'Prompts are informal text and do not need change control.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'reasoning-planning',
    'Reasoning, Planning, Decomposition, and Verification',
    'Prompt a difficult migration without exposing or demanding hidden reasoning.',
    'a plan-execute-verify task contract',
    [
      [
        'reasoning-selection',
        'Request concise conclusions, evidence, and checks rather than hidden chain-of-thought disclosure.',
        'Reliable reasoning requires the model to print every private thought.',
      ],
      [
        'plan-mode',
        'Use planning before implementation when scope, dependencies, or user choices are materially uncertain.',
        'Planning is overhead for every task regardless of complexity.',
      ],
      [
        'decomposition',
        'Decompose work around independently verifiable outcomes and dependency order.',
        'Breaking a task into the most files produces the best plan.',
      ],
      [
        'self-checks',
        'Ask for targeted final checks tied to known failure modes instead of vague self-critique.',
        'Telling a model to double-check guarantees correctness.',
      ],
      [
        'uncertainty-report',
        'Require bounded uncertainty, missing evidence, and blockers to remain visible.',
        'A confident answer should never mention uncertainty.',
        'professional',
        'evaluate',
      ],
    ],
  ],
  [
    'tools-actions',
    'Tool Choice, Evidence, Actions, and Approval Boundaries',
    'Design a tool-using investigation that reads evidence before changing state.',
    'a safe tool-use decision protocol',
    [
      [
        'tool-description',
        'Write tool descriptions and schemas that make capability, inputs, outputs, and side effects unambiguous.',
        'The tool name alone is enough for reliable selection.',
      ],
      [
        'read-before-write',
        'Sequence read-only discovery before mutations unless the user explicitly requests an immediate safe action.',
        'An agent should change state to learn what the state is.',
      ],
      [
        'tool-result-grounding',
        'Base the next decision on actual tool results and distinguish inference from observation.',
        'A successful tool call proves the intended outcome occurred.',
      ],
      [
        'approval-boundary',
        'Require approval for consequential, external, destructive, or authority-expanding actions.',
        'User interest in a topic authorizes every related mutation.',
      ],
      [
        'tool-failure-recovery',
        'Handle timeouts, partial results, retries, and alternate evidence without looping blindly.',
        'Repeating the identical failing tool call is a robust recovery strategy.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'coding-edits',
    'Coding Prompts, Scoped Edits, and Regression Control',
    'Implement a repository change with tests and minimal unrelated churn.',
    'a coding-agent implementation brief',
    [
      [
        'change-scope',
        'Name desired behavior, relevant area, preserved contracts, and authorized refactor scope.',
        'A total rewrite is implied whenever existing code is low quality.',
      ],
      [
        'repo-conventions',
        'Ground implementation in repository commands, architecture, dependency policy, and local instructions.',
        'Generic best practices override project-specific contracts.',
      ],
      [
        'test-expectation',
        'Specify risk-proportionate tests and observable regression checks.',
        'Asking for tests without naming behavior produces complete coverage.',
      ],
      [
        'diff-discipline',
        'Request intentional, reviewable changes while preserving unrelated user work.',
        'Formatting every file improves every pull request.',
      ],
      [
        'implementation-evidence',
        'Require command output, behavior checks, and a concise unresolved-risk handoff.',
        'A code diff is sufficient proof that a change works.',
        'professional',
        'evaluate',
      ],
    ],
  ],
  [
    'debug-review',
    'Debugging, Review, and Adversarial Prompting',
    'Diagnose a failing build and review the repair against a base branch.',
    'an evidence-first debug and review playbook',
    [
      [
        'reproduction',
        'Capture a minimal reproduction, exact error, environment, and last-known-good boundary before repair.',
        'The first plausible cause should be fixed immediately.',
      ],
      [
        'hypothesis-tests',
        'Rank competing hypotheses and choose discriminating checks.',
        'Collecting more logs is useful even without a hypothesis.',
      ],
      [
        'cause-repair',
        'Prompt for the smallest cause-level repair and a regression test.',
        'Suppressing an error is equivalent to fixing its cause.',
      ],
      [
        'review-frame',
        'Define review baseline, risk categories, and evidence required for actionable findings.',
        'A code review should list every stylistic preference.',
      ],
      [
        'adversarial-cases',
        'Test prompts and code against misleading context, malformed inputs, and instruction injection.',
        'Normal examples predict behavior under adversarial input.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'long-context',
    'Long Tasks, Compaction, Steering, and Handoffs',
    'Keep a multi-hour repository task coherent across context changes and user steering.',
    'a durable task state and handoff record',
    [
      [
        'state-summary',
        'Maintain objective, decisions, evidence, plan status, changed files, tests, and blockers in a compact state.',
        'Conversation length itself preserves every important decision.',
      ],
      [
        'compaction-ready',
        'Store durable task details in files or structured summaries before context compaction.',
        'Compaction always preserves minor but critical constraints.',
      ],
      [
        'steer-queue',
        'Distinguish messages that change the active run from follow-up work that should wait.',
        'Every new message should restart the entire task.',
      ],
      [
        'checkpointing',
        'Checkpoint at verified boundaries with rerunnable commands and safe restart instructions.',
        'A long task should defer all verification until the end.',
      ],
      [
        'handoff-quality',
        'Produce a handoff that another agent or human can continue without rediscovery.',
        'A list of edited filenames is a complete handoff.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'claude-practice',
    'Claude 2026 Prompting and Claude Code Practice',
    'Apply current Anthropic guidance to tool use, examples, context, and long-running coding.',
    'a Claude-specific prompt and eval suite',
    [
      [
        'claude-clarity-context',
        'Use clear direct instructions, motivation, and relevant context for current Claude models.',
        'Claude should infer unstated above-and-beyond requirements.',
      ],
      [
        'claude-examples-tags',
        'Use diverse examples and structural tags when they improve task boundary recognition.',
        'XML tags compensate for weak task definitions.',
      ],
      [
        'claude-tool-steering',
        'Steer tool selection with descriptions and instructions, using enforced tool choice only when required.',
        'Claude must always call every available tool.',
      ],
      [
        'claude-thinking',
        'Match adaptive or extended thinking to complex tasks without demanding verbose reasoning output.',
        'Extended thinking improves every simple or latency-sensitive task.',
      ],
      [
        'claude-code-context',
        'Provide Claude Code repository guidance, verification commands, permissions, and durable project context.',
        'Claude Code needs only a feature request to modify any repository safely.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'codex-practice',
    'Codex 2026 Prompting and Repository Practice',
    'Apply current Codex guidance across CLI, IDE, app, planning, and repository instructions.',
    'a Codex-specific prompt and AGENTS.md package',
    [
      [
        'codex-four-parts',
        'Use goal, context, constraints, and done conditions for material coding work.',
        'Codex requires a rigid magic prompt syntax.',
      ],
      [
        'codex-plan-interview',
        'Use Plan mode or an interview when requirements are fuzzy or choices are consequential.',
        'Codex should guess product requirements to preserve momentum.',
      ],
      [
        'codex-agents-md',
        'Place recurring build, test, lint, review, and boundary guidance in the nearest applicable AGENTS.md.',
        'AGENTS.md should contain every task ever performed.',
      ],
      [
        'codex-config-surfaces',
        'Separate prompt instructions, AGENTS.md, skills, MCP, hooks, and config by scope and enforcement need.',
        'All Codex customization belongs in one global prompt.',
      ],
      [
        'codex-review-verify',
        'Prompt Codex to test, inspect the diff, review risk, and report evidence before completion.',
        'Codex-generated code can skip independent verification.',
        'professional',
        'evaluate',
      ],
    ],
  ],
  [
    'security-injection',
    'Prompt Security, Untrusted Context, Privacy, and Authorization',
    'Harden a tool-using prompt that processes untrusted documents and external results.',
    'a prompt threat model and red-team suite',
    [
      [
        'instruction-data-separation',
        'Separate trusted instructions from untrusted data and label authority boundaries.',
        'Text inside a retrieved document is safe to follow as instruction.',
      ],
      [
        'prompt-injection',
        'Recognize direct and indirect prompt injection and prevent authority escalation.',
        'Prompt injection is solved by one warning sentence.',
      ],
      [
        'least-context',
        'Exclude secrets and irrelevant proprietary context and minimize tool privileges.',
        'Hidden system prompts are a secure secret store.',
      ],
      [
        'output-validation',
        'Validate model outputs before execution, publication, or use in security decisions.',
        'Structured model output can be executed without validation.',
      ],
      [
        'red-team-maintenance',
        'Maintain adversarial cases and re-run them when prompts, models, tools, or data change.',
        'A one-time red-team exercise permanently secures a prompt.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'production-capstone',
    'Prompt Lifecycle, Monitoring, and Production Capstone',
    'Ship and maintain a cross-provider prompt system with regression evidence.',
    'a production prompt portfolio and release gate',
    [
      [
        'prompt-registry',
        'Store owners, versions, model assumptions, templates, and evaluation links in a prompt registry.',
        'Prompt text can be edited in production without traceability.',
      ],
      [
        'regression-gates',
        'Block prompt releases on material deterministic, rubric, safety, or human-review regressions.',
        'Average score alone captures every important regression.',
      ],
      [
        'online-monitoring',
        'Monitor outcome, refusal, tool, latency, cost, and drift signals without logging sensitive content unnecessarily.',
        'Offline evaluation removes the need for production monitoring.',
      ],
      [
        'rollback-experiment',
        'Use controlled experiments, canaries, and rollback criteria for prompt changes.',
        'Prompt changes are too small to require release controls.',
      ],
      [
        'portfolio-defense',
        'Defend prompt design choices with evidence across Claude, Codex, changed cases, and limitations.',
        'A portfolio of successful screenshots proves transferable prompt skill.',
        'professional',
        'create',
      ],
    ],
  ],
]);

const promptSources = [
  {
    title: 'OpenAI Codex Manual: Prompting and Best Practices',
    authority: 'official-docs',
    url: 'https://developers.openai.com/codex/codex-manual.md',
    version: 'Verified current 2026-07-13',
    reviewedAt: REVIEWED_AT,
    scope: 'Controls Codex prompting, Plan mode, AGENTS.md, verification, and surface guidance.',
  },
  {
    title: 'Anthropic Prompt Engineering Overview',
    authority: 'official-docs',
    url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview',
    version: 'Current 2026-07-13',
    reviewedAt: REVIEWED_AT,
    scope:
      'Controls success criteria, empirical evaluation, and the living Claude prompt-engineering workflow.',
  },
  {
    title: 'Anthropic Prompting Best Practices',
    authority: 'official-docs',
    url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices',
    version: 'Current Claude model guidance',
    reviewedAt: REVIEWED_AT,
    scope:
      'Controls clear instructions, examples, structure, reasoning, tools, and model-specific migration cautions.',
  },
  {
    title: 'Anthropic Agent Evaluation Guidance',
    authority: 'official-docs',
    url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents',
    version: '2026',
    reviewedAt: REVIEWED_AT,
    scope: 'Controls multi-turn and tool-using evaluation design for agentic prompts.',
  },
];

export const promptEngineering2026Config = finalize({
  id: 'prompt-engineering-claude-codex',
  title: '2026 Prompt Engineering with Claude and Codex',
  version: '2026.07',
  audience: {
    description:
      'Writers, analysts, developers, and technical leads who need empirically tested prompts for current Claude and Codex chat, coding, tool, and long-running workflows.',
    entryKnowledge: [
      'Use a modern AI chat interface and edit text files; basic repository and terminal familiarity is recommended for coding labs.',
    ],
    deviceConstraints: [
      'Desktop or tablet browser; vendor accounts are optional because all core design and evaluation labs use local artifacts.',
    ],
    accessibilityAssumptions: sharedAccessibility,
  },
  scope: {
    includes: [
      'Prompt contracts, context engineering, examples, tools, coding, and long tasks',
      'Current Claude and Codex differences and shared principles',
      'Evaluation, security, versioning, monitoring, and release gates',
    ],
    excludes: [
      'Guarantees tied to undocumented model behavior',
      'Training or fine-tuning foundation models',
    ],
    nextCourses: ['agent-loops-goals', 'agent-skills-mcp'],
  },
  sources: promptSources,
  modules: promptModules,
  projects: [
    project(
      'prompt-support-evals',
      'Evaluated Support Triage Prompt',
      'prompt-examples-structure',
      'A public-interest support desk',
      'The desk needs consistent classification and next actions across normal, ambiguous, and adversarial requests.',
      [
        'prompt-task-contract',
        'prompt-eval-dataset',
        'prompt-example-selection',
        'prompt-schema-output',
      ]
    ),
    project(
      'prompt-repo-change',
      'Cross-Agent Repository Change Brief',
      'prompt-debug-review',
      'A software maintenance team',
      'The team needs one task contract adapted and verified for both Claude Code and Codex.',
      [
        'prompt-change-scope',
        'prompt-test-expectation',
        'prompt-reproduction',
        'prompt-review-frame',
      ]
    ),
    project(
      'prompt-secure-tools',
      'Secure Tool-Using Research Prompt',
      'prompt-security-injection',
      'A research operations group',
      'The group needs sourced research across untrusted documents without unauthorized actions or instruction injection.',
      [
        'prompt-tool-result-grounding',
        'prompt-approval-boundary',
        'prompt-instruction-data-separation',
        'prompt-red-team-maintenance',
      ]
    ),
    project(
      'prompt-production-portfolio',
      'Claude and Codex Prompt Production Portfolio',
      'prompt-production-capstone',
      'A cross-functional AI enablement team',
      'The team needs versioned prompts, evals, release gates, and provider-specific operating guides.',
      [
        'prompt-claude-code-context',
        'prompt-codex-agents-md',
        'prompt-regression-gates',
        'prompt-portfolio-defense',
      ]
    ),
  ],
  examContext:
    'Fresh writing, coding, tool, security, and long-task cases requiring prompt design, diagnosis, cross-provider adaptation, and evaluation evidence.',
  minimumQuestionBankSize: 360,
});

const loopModules = agentModules('loops', [
  [
    'foundations',
    'Agents, Workflows, and the Control Loop',
    'Compare a fixed workflow with an adaptive tool-using agent.',
    'an agent-system boundary map',
    [
      [
        'workflow-agent',
        'Distinguish predefined workflows from model-directed agents and choose the simpler sufficient architecture.',
        'Every multi-step automation requires an autonomous agent.',
        'conceptual',
        'evaluate',
      ],
      [
        'observe-decide-act',
        'Model the observe, decide, act, and verify cycle with explicit state transitions.',
        'An agent loop is merely repeated prompting.',
      ],
      [
        'environment-state',
        'Separate model context, application state, external state, and durable records.',
        'Conversation history is the complete system state.',
      ],
      [
        'tool-boundary',
        'Define which effects occur in the model, host, tools, and external services.',
        'The model itself executes every requested action.',
      ],
      [
        'loop-invariants',
        'State invariants that must hold before and after every loop iteration.',
        'Only the final answer needs validation.',
        'strategic',
        'create',
      ],
    ],
  ],
  [
    'goal-contracts',
    'Goal Contracts and Observable Completion',
    'Turn a vague long-running objective into an executable goal contract.',
    'a measurable goal and done-condition specification',
    [
      [
        'goal-outcome',
        'Write a goal as an outcome rather than an unbounded activity.',
        'Work longer is a valid measurable goal.',
      ],
      [
        'success-measures',
        'Attach observable success measures, boundaries, and evidence requirements.',
        'A goal is complete when the agent says it is complete.',
      ],
      [
        'goal-scope',
        'Separate current objective, durable constraints, and optional next work.',
        'A goal authorizes any adjacent useful action.',
      ],
      [
        'goal-revision',
        'Revise goals explicitly when new evidence changes scope or feasibility.',
        'The original goal should remain unchanged despite contradictory evidence.',
      ],
      [
        'goal-hierarchy',
        'Relate mission, milestone, task, and step without losing the terminal outcome.',
        'Every low-level action deserves its own persistent goal.',
        'strategic',
        'analyze',
      ],
    ],
  ],
  [
    'persistent-goals',
    'Codex Persistent Goals and Automatic Continuation',
    'Operate a long Codex task with a persistent goal, checkpoints, and user control.',
    'a Codex persistent-goal operating playbook',
    [
      [
        'codex-goal-command',
        'Set, view, edit, pause, resume, and clear a Codex persistent goal with the documented goal interface.',
        'A persistent goal is the same as a plan checklist.',
      ],
      [
        'goal-file-routing',
        'Keep long instructions in a referenced file while the goal remains concise.',
        'A persistent goal should contain every implementation detail.',
      ],
      [
        'automatic-continuation',
        'Design automatic continuation around verified progress and safe terminal conditions.',
        'Automatic continuation grants broader action authority.',
      ],
      [
        'goal-status',
        'Distinguish active, paused, completed, and genuinely blocked states.',
        'Difficult or unfinished work should be marked blocked immediately.',
      ],
      [
        'goal-handoff',
        'Preserve goal state, decisions, tests, and next actions across sessions.',
        'The goal sentence alone is a complete handoff.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'planning-decomposition',
    'Planning, Dependencies, and Adaptive Decomposition',
    'Plan a migration whose dependencies and risks emerge during work.',
    'a dependency-aware adaptive execution plan',
    [
      [
        'dependency-graph',
        'Order outcomes by prerequisite evidence rather than arbitrary file sequence.',
        'A long flat checklist exposes all dependencies.',
      ],
      [
        'milestones',
        'Choose milestones that leave a verified, restartable artifact.',
        'A milestone is any convenient stopping point.',
      ],
      [
        'replanning',
        'Update the plan when evidence changes while preserving the goal and recorded decisions.',
        'Changing a plan means the original work failed.',
      ],
      [
        'critical-path',
        'Identify serial dependencies and safe opportunities for parallel work.',
        'Every task benefits from maximum parallelism.',
      ],
      [
        'plan-user-choice',
        'Pause for user direction only when missing authority or a choice materially changes the outcome.',
        'Agents should ask before every implementation decision.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'tool-loop',
    'Tool Selection, Calls, Results, and State Updates',
    'Implement a typed client-side tool loop over read and write tools.',
    'a tested tool-loop state machine',
    [
      [
        'tool-routing',
        'Select tools from capability, authority, cost, and evidence requirements.',
        'The tool with the closest name is always correct.',
      ],
      [
        'schema-validation',
        'Validate tool arguments and results at the host boundary.',
        'Model-generated tool JSON is trusted application input.',
      ],
      [
        'parallel-calls',
        'Parallelize independent reads while sequencing dependent or mutating calls.',
        'All tool calls can run concurrently.',
      ],
      [
        'result-integration',
        'Update loop state from complete, partial, empty, and conflicting tool results.',
        'No-result and tool-failure states are equivalent.',
      ],
      [
        'side-effect-ledger',
        'Record intended and observed side effects for idempotency and audit.',
        'A successful HTTP status proves the exact side effect occurred.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'termination-budgets',
    'Termination, Budgets, Timeouts, and Progress Detection',
    'Stop an agent safely under success, failure, budget, and no-progress conditions.',
    'a loop termination and budget policy',
    [
      [
        'success-stop',
        'Terminate only when completion evidence satisfies the goal contract.',
        'A fluent final message is a success condition.',
      ],
      [
        'failure-stop',
        'Classify retryable, recoverable, authority-blocked, and terminal failures.',
        'Every error deserves another identical retry.',
      ],
      [
        'resource-budgets',
        'Budget turns, tokens, time, tool calls, money, and external side effects.',
        'Token limits alone control every agent cost.',
      ],
      [
        'no-progress',
        'Detect repeated state, unchanged evidence, and oscillating repairs.',
        'An active agent is progressing whenever it emits output.',
      ],
      [
        'graceful-handoff',
        'Stop with a resumable state, evidence, and explicit unmet conditions.',
        'When a budget ends, incomplete work should be called complete.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'retries-idempotency',
    'Retries, Idempotency, Compensation, and Recovery',
    'Harden a loop that calls unreliable external services.',
    'a fault-injected recovery harness',
    [
      [
        'retry-policy',
        'Use bounded retries with backoff and error classification.',
        'Immediate unlimited retries maximize reliability.',
      ],
      [
        'idempotency-keys',
        'Design idempotent operations and deduplication for repeated requests.',
        'Read-only calls are the only operations that can be retried safely.',
      ],
      [
        'checkpoint-restart',
        'Checkpoint durable state so a process can restart without replaying completed effects.',
        'Restarting from the initial prompt is always safe.',
      ],
      [
        'compensation',
        'Define compensating actions when atomic rollback is unavailable.',
        'Every external side effect can be rolled back automatically.',
      ],
      [
        'recovery-tests',
        'Inject timeouts, partial failures, duplicates, and restarts into loop tests.',
        'Happy-path integration tests cover distributed failure behavior.',
        'strategic',
        'create',
      ],
    ],
  ],
  [
    'memory-context',
    'Memory, Context Windows, Compaction, and Retrieval',
    'Keep a long-running agent grounded without unlimited history.',
    'a context and durable-memory policy',
    [
      [
        'working-memory',
        'Keep only current decision-relevant state in working context.',
        'More conversation history always improves decisions.',
      ],
      [
        'durable-memory',
        'Store stable facts with provenance, scope, freshness, and deletion rules.',
        'Any model inference is safe to save as fact.',
      ],
      [
        'retrieval-policy',
        'Retrieve the smallest authoritative evidence set for the next decision.',
        'Semantic similarity alone determines authoritative context.',
      ],
      [
        'compaction',
        'Compact history into goal, decisions, evidence, unresolved work, and restart commands.',
        'A generic summary preserves operational state.',
      ],
      [
        'memory-privacy',
        'Minimize sensitive retention and honor access, correction, and deletion boundaries.',
        'Agent convenience justifies indefinite data retention.',
        'professional',
        'evaluate',
      ],
    ],
  ],
  [
    'human-control',
    'Human Gates, Permissions, and Reversible Autonomy',
    'Set human review points for a consequential operations agent.',
    'a risk-tiered approval matrix',
    [
      [
        'risk-tiering',
        'Classify actions by reversibility, blast radius, sensitivity, and external impact.',
        'All tool calls have equivalent risk.',
      ],
      [
        'approval-design',
        'Place approvals immediately before consequential effects with enough evidence to decide.',
        'Approval at session start covers every later action.',
      ],
      [
        'least-privilege',
        'Give each loop and tool only the capabilities and data required for its current goal.',
        'Broad credentials reduce errors without adding risk.',
      ],
      [
        'user-steering',
        'Apply user corrections immediately without silently broadening the task.',
        'New user context should be queued even when it invalidates current work.',
      ],
      [
        'emergency-stop',
        'Implement pause, cancel, revoke, and containment paths that work during tool execution.',
        'A stop button is sufficient without testing cancellation behavior.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'subagents',
    'Subagents, Parallelism, and Coordination',
    'Coordinate specialist agents without duplicate or conflicting work.',
    'a bounded multi-agent execution map',
    [
      [
        'delegation-fit',
        'Delegate only concrete independent work with a clear return contract.',
        'More agents always finish a task faster.',
      ],
      [
        'context-forking',
        'Give a subagent the minimum context required without losing governing constraints.',
        'Subagents automatically inherit every relevant detail.',
      ],
      [
        'shared-state',
        'Coordinate shared files, locks, messages, and ownership boundaries.',
        'Independent agents cannot conflict in a shared workspace.',
      ],
      [
        'result-synthesis',
        'Verify subagent claims and integrate evidence rather than concatenating outputs.',
        'A subagent final answer is trusted proof.',
      ],
      [
        'coordination-cost',
        'Compare parallel speedup with communication, merge, and review cost.',
        'Parallelism has no overhead or new failure modes.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'observability-evals',
    'Tracing, Evals, and Failure Analysis',
    'Evaluate a multi-turn tool agent across realistic environments.',
    'an agent trace and evaluation suite',
    [
      [
        'trace-events',
        'Record decisions, tool calls, results, state changes, timing, and identifiers without exposing private reasoning.',
        'Final answers contain enough data to debug agent behavior.',
      ],
      [
        'trajectory-evals',
        'Evaluate action trajectories and state outcomes as well as final text.',
        'Output quality alone measures an agent.',
      ],
      [
        'scenario-fixtures',
        'Build deterministic environments and representative multi-turn cases.',
        'Live production systems are the best first eval environment.',
      ],
      [
        'failure-taxonomy',
        'Classify planning, tool, state, recovery, authorization, and communication failures.',
        'All agent failures are prompt failures.',
      ],
      [
        'regression-analysis',
        'Compare agent versions by material outcome slices and investigate regressions.',
        'One average score safely determines release readiness.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'long-running',
    'Durable Long-Running Work and Operations',
    'Operate a multi-hour or multi-day agent task through interruptions.',
    'a durable runbook and restartable workflow',
    [
      [
        'durable-execution',
        'Separate durable orchestration state from ephemeral model turns.',
        'Keeping one process alive makes a workflow durable.',
      ],
      [
        'scheduled-heartbeats',
        'Use scheduled checks or heartbeats only when timing or external state requires them.',
        'Every unfinished goal should poll continuously.',
      ],
      [
        'external-state-waits',
        'Wait or subscribe for expected external changes without classifying unchanged state as failure.',
        'No change during one poll means the workflow is blocked.',
      ],
      [
        'versioned-runbooks',
        'Version runbooks, tools, schemas, and migration rules for in-flight work.',
        'Running agents can adopt breaking workflow changes automatically.',
      ],
      [
        'operator-handoff',
        'Expose current phase, next wake condition, authority, costs, and safe interventions.',
        'Operators only need a binary running indicator.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'capstone',
    'Production Agent Loop and Goal Capstone',
    'Build a safe goal-driven agent for a realistic repository or operations task.',
    'a production-ready agent-loop reference implementation',
    [
      [
        'architecture-choice',
        'Choose workflow or agent patterns and justify complexity from task uncertainty.',
        'An impressive capstone must maximize autonomy.',
      ],
      [
        'goal-loop-integration',
        'Connect persistent goals, adaptive plans, tool state, and terminal conditions.',
        'Goals, plans, and loops can be designed independently.',
      ],
      [
        'safety-recovery',
        'Integrate permissions, idempotency, stop controls, and fault recovery.',
        'Safety can be added after the happy path works.',
      ],
      [
        'eval-release',
        'Gate release on scenario, trajectory, security, and recovery evidence.',
        'A demo is adequate release evidence for an agent.',
      ],
      [
        'operations-defense',
        'Defend architecture, limitations, cost, monitoring, and operator procedures.',
        'A technically functioning agent requires no operational explanation.',
        'professional',
        'create',
      ],
    ],
  ],
]);

export const agentLoopsGoalsConfig = finalize({
  id: 'agent-loops-goals',
  title: 'Agent Loops, Persistent Goals, and Durable Work',
  version: '2026.07',
  audience: {
    description:
      'Developers and technical operators building reliable multi-turn agents, persistent Codex goals, tool loops, and restartable long-running workflows.',
    entryKnowledge: [
      'Write basic Python or TypeScript functions and understand JSON, APIs, tests, and command-line tools.',
    ],
    deviceConstraints: [
      'Desktop recommended; conceptual labs run locally and no production credentials are required.',
    ],
    accessibilityAssumptions: sharedAccessibility,
  },
  scope: {
    includes: [
      'Workflow versus agent architecture',
      'Persistent goals, plans, tool loops, termination, recovery, and memory',
      'Human control, subagents, observability, evals, and durable operations',
    ],
    excludes: ['Unbounded autonomous production access', 'Provider-internal hidden reasoning'],
    nextCourses: ['agent-skills-mcp'],
  },
  sources: [
    {
      title: 'OpenAI Codex Manual: Goals and Long-Running Work',
      authority: 'official-docs',
      url: 'https://developers.openai.com/codex/codex-manual.md',
      version: 'Verified current 2026-07-13',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls persisted goals, automatic continuation, goal commands, planning, and long-running Codex behavior.',
    },
    {
      title: 'Anthropic Building Effective Agents',
      authority: 'official-docs',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      version: 'Current architecture guidance',
      reviewedAt: REVIEWED_AT,
      scope: 'Controls workflow-agent distinctions and simple composable agent patterns.',
    },
    {
      title: 'Anthropic Tool Use with Claude',
      authority: 'official-docs',
      url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview',
      version: 'Current 2026-07-13',
      reviewedAt: REVIEWED_AT,
      scope: 'Controls client and server tool loops, stop reasons, schemas, and tool choice.',
    },
    {
      title: 'Anthropic Agent Evaluation Guidance',
      authority: 'official-docs',
      url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents',
      version: '2026',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls multi-turn environment, trajectory, grader, and regression evaluation practice.',
    },
  ],
  modules: loopModules,
  projects: [
    project(
      'loops-goal-runbook',
      'Persistent Repository Migration Goal',
      'loops-planning-decomposition',
      'A software modernization lead',
      'The lead needs a persistent, checkpointed migration that can be paused, steered, resumed, and audited.',
      [
        'loops-goal-outcome',
        'loops-codex-goal-command',
        'loops-dependency-graph',
        'loops-replanning',
      ]
    ),
    project(
      'loops-resilient-tools',
      'Fault-Tolerant Tool Loop',
      'loops-retries-idempotency',
      'An internal operations team',
      'The team needs bounded retries, idempotent effects, compensation, and restart safety under injected failures.',
      [
        'loops-schema-validation',
        'loops-side-effect-ledger',
        'loops-idempotency-keys',
        'loops-recovery-tests',
      ]
    ),
    project(
      'loops-human-agent',
      'Human-Controlled Multi-Agent Investigation',
      'loops-observability-evals',
      'A high-stakes incident coordinator',
      'The coordinator needs parallel evidence gathering with permissions, traceability, synthesis, and explicit stop conditions.',
      [
        'loops-approval-design',
        'loops-delegation-fit',
        'loops-result-synthesis',
        'loops-trajectory-evals',
      ]
    ),
    project(
      'loops-production-capstone',
      'Durable Goal-Driven Agent Capstone',
      'loops-capstone',
      'A production automation review board',
      'The board needs a restartable agent with bounded authority, recovery, eval, monitoring, and operator documentation.',
      [
        'loops-goal-loop-integration',
        'loops-safety-recovery',
        'loops-eval-release',
        'loops-operations-defense',
      ]
    ),
  ],
  examContext:
    'Fresh agent architecture, goal, tool, failure, memory, permission, and operations cases requiring state-machine design and evidence-based tradeoffs.',
  minimumQuestionBankSize: 340,
});

const skillsMcpModules = agentModules('agent-ext', [
  [
    'surface-choice',
    'Choose Instructions, Skills, Plugins, Hooks, or MCP',
    'Route recurring agent needs to the smallest durable extension surface.',
    'an extension-surface decision matrix',
    [
      [
        'scope-layers',
        'Separate one-turn prompts, repository instructions, reusable skills, enforcement hooks, plugins, and external tools by scope.',
        'All recurring agent behavior belongs in a skill.',
      ],
      [
        'agents-guidance',
        'Use AGENTS.md or equivalent repository guidance for durable local conventions.',
        'Repository instructions should implement external API access.',
      ],
      [
        'skill-fit',
        'Use a skill for a reusable workflow, expertise, scripts, references, or assets.',
        'A skill is merely a long system prompt.',
      ],
      [
        'mcp-fit',
        'Use MCP when live tools or external context must cross the agent-host boundary.',
        'MCP is needed for ordinary local file edits.',
      ],
      [
        'plugin-fit',
        'Use a plugin to distribute skills, connectors, hooks, and presentation assets as one installable unit.',
        'Every personal skill requires a plugin package.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'skill-standard',
    'Agent Skills Standard and SKILL.md Anatomy',
    'Create a minimal standards-conforming skill for a repeated review workflow.',
    'a valid focused agent skill',
    [
      [
        'skill-directory',
        'Create the required SKILL.md and optional scripts, references, and assets with valid names.',
        'A skill is a single prompt file stored anywhere.',
      ],
      [
        'frontmatter',
        'Write valid name and description metadata within specification constraints.',
        'Frontmatter fields do not affect discovery.',
      ],
      [
        'instructions',
        'Write imperative workflow steps, boundaries, inputs, outputs, and verification criteria.',
        'Long narrative background is more useful than operational steps.',
      ],
      [
        'resource-routing',
        'Route the agent to only the references or scripts needed for the current variant.',
        'Every skill invocation should load every resource.',
      ],
      [
        'portable-contract',
        'Keep skill logic portable while documenting host-specific integrations separately.',
        'A skill should hard-code one machine layout.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'triggers',
    'Skill Discovery, Trigger Descriptions, and Boundaries',
    'Make explicit and implicit invocation reliable without false positives.',
    'a trigger evaluation dataset',
    [
      [
        'description-triggers',
        'Front-load use cases and trigger terms in a concise skill description.',
        'The skill name alone controls implicit selection.',
      ],
      [
        'positive-cases',
        'Write diverse prompts that should activate the skill.',
        'One exact phrase is sufficient trigger coverage.',
      ],
      [
        'negative-cases',
        'Write adjacent prompts that must not activate the skill.',
        'False-positive skill activation has no cost.',
      ],
      [
        'explicit-invocation',
        'Support explicit invocation when deterministic use is required.',
        'Implicit matching should be mandatory for every skill.',
      ],
      [
        'trigger-evals',
        'Measure missed triggers, false triggers, and competing-skill selection.',
        'A skill that works after manual selection needs no trigger tests.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'progressive-disclosure',
    'Progressive Disclosure, References, Scripts, and Assets',
    'Refactor an oversized skill into a compact router and focused resources.',
    'a progressively disclosed skill package',
    [
      [
        'metadata-budget',
        'Keep metadata discriminative within shared context budgets.',
        'Descriptions should contain the full workflow.',
      ],
      [
        'instruction-router',
        'Keep SKILL.md complete but route variant details to named resources.',
        'Progressive disclosure means reading only part of SKILL.md.',
      ],
      [
        'reference-design',
        'Organize authoritative references by decision point and expected use.',
        'A references folder is an unstructured document dump.',
      ],
      [
        'script-design',
        'Use deterministic scripts for repeatable validation, extraction, or scaffolding.',
        'Scripts should replace agent judgment in ambiguous decisions.',
      ],
      [
        'asset-reuse',
        'Provide templates and assets that prevent inconsistent recreation.',
        'Agents should regenerate standard artifacts on every run.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'skill-testing',
    'Skill Testing, Safety, Versioning, and Maintenance',
    'Build a regression suite for a skill and its helper scripts.',
    'a skill test and release harness',
    [
      [
        'instruction-tests',
        'Test workflow outcomes under normal, boundary, and failure prompts.',
        'A readable SKILL.md guarantees correct execution.',
      ],
      [
        'script-tests',
        'Unit-test helper scripts and verify safe behavior in temporary fixtures.',
        'Skill scripts need no tests because an agent supervises them.',
      ],
      [
        'security-review',
        'Review skill scripts, dependencies, file scope, and requested permissions.',
        'A local skill is automatically trusted code.',
      ],
      [
        'version-migration',
        'Version behavior changes and provide migration notes for consumers.',
        'Editing a shared skill never breaks callers.',
      ],
      [
        'usage-feedback',
        'Use missed triggers, repeated corrections, and failures to improve the skill.',
        'More instructions always fix skill reliability.',
        'professional',
        'evaluate',
      ],
    ],
  ],
  [
    'distribution',
    'Install, Scope, Package, and Govern Skills',
    'Move a proven local skill into a team-distributed package.',
    'a distributable skill plugin',
    [
      [
        'skill-locations',
        'Choose repository, user, admin, or system scope according to ownership and audience.',
        'All skills should be global for convenience.',
      ],
      [
        'install-review',
        'Inspect source, scripts, dependencies, and permissions before installing a skill.',
        'Curated or popular skills need no security review.',
      ],
      [
        'plugin-package',
        'Package skills and related extension assets in a valid plugin manifest.',
        'A plugin and a skill are the same artifact.',
      ],
      [
        'invocation-policy',
        'Configure explicit or implicit invocation policy and declared dependencies.',
        'Invocation policy cannot affect safety.',
      ],
      [
        'governance',
        'Define ownership, approval, updates, disablement, and deprecation for shared skills.',
        'Installed skills maintain themselves indefinitely.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'mcp-architecture',
    'MCP Architecture, Negotiation, and Trust Boundaries',
    'Trace one tool call across host, client, server, and external system.',
    'an MCP architecture and threat-boundary diagram',
    [
      [
        'host-client-server',
        'Distinguish host, per-server client, server, model, user, and external service responsibilities.',
        'The MCP server is the model host.',
      ],
      [
        'protocol-messages',
        'Trace initialization, capability negotiation, requests, responses, notifications, and errors.',
        'MCP is a stateless REST convention in every stable version.',
      ],
      [
        'capabilities',
        'Advertise and negotiate only implemented protocol capabilities.',
        'Clients can assume every server supports every primitive.',
      ],
      [
        'trust-boundaries',
        'Map permissions, data flow, instruction authority, and side effects at each boundary.',
        'All connected MCP servers share one trust boundary.',
      ],
      [
        'spec-versioning',
        'Target a named stable specification and isolate release-candidate changes.',
        'The newest announced release candidate is already the stable protocol.',
        'professional',
        'evaluate',
      ],
    ],
  ],
  [
    'mcp-primitives',
    'Tools, Resources, Prompts, and Server Instructions',
    'Design a minimal MCP surface for an internal knowledge and action service.',
    'an MCP primitive and naming contract',
    [
      [
        'tool-contracts',
        'Expose actions as narrow tools with descriptive schemas and side-effect annotations.',
        'One generic execute tool is the most flexible MCP design.',
      ],
      [
        'resources',
        'Expose readable addressable context as resources or templates rather than action tools.',
        'Every piece of context should be returned by a tool.',
      ],
      [
        'prompts',
        'Expose reusable user-controlled prompt templates only when they improve discovery and composition.',
        'MCP prompts are hidden system instructions.',
      ],
      [
        'server-instructions',
        'Write concise server-wide constraints, workflows, and rate limits with critical guidance first.',
        'Tool descriptions should repeat all server instructions.',
      ],
      [
        'primitive-choice',
        'Choose the smallest primitive that preserves consent, discoverability, caching, and semantics.',
        'Tools, resources, and prompts are interchangeable.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'transports',
    'STDIO, Streamable HTTP, Lifecycle, and Deployment',
    'Choose and configure a transport for local and remote MCP servers.',
    'a local and remote transport deployment plan',
    [
      [
        'stdio',
        'Implement newline-safe STDIO transport without logging protocol noise to standard output.',
        'STDIO servers should print human logs to stdout.',
      ],
      [
        'streamable-http',
        'Implement remote Streamable HTTP with correct routing, content types, and transport security.',
        'Remote MCP requires legacy SSE transport.',
      ],
      [
        'lifecycle',
        'Handle startup, initialization, shutdown, timeout, and reconnect behavior.',
        'A server process that starts is ready for tool calls.',
      ],
      [
        'deployment',
        'Choose local process or remote service deployment from access, trust, scale, and operations needs.',
        'Remote hosting is always more secure than local execution.',
      ],
      [
        'observability',
        'Log identifiers, latency, errors, and side effects without leaking protocol secrets.',
        'Complete request bodies should always be logged for debugging.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'server-build',
    'Build and Test an MCP Server with Official SDKs',
    'Implement a typed server with tools, resources, and automated protocol tests.',
    'a runnable tested MCP server',
    [
      [
        'sdk-selection',
        'Select an official maintained SDK and pin a compatible protocol target.',
        'Any abandoned wrapper is equivalent to an official SDK.',
      ],
      [
        'server-scaffold',
        'Create server metadata, capabilities, handlers, and transport entry points.',
        'A handler function alone is a complete server.',
      ],
      [
        'schema-validation',
        'Validate structured inputs and return typed content or structured errors.',
        'The model guarantees handler inputs match the schema.',
      ],
      [
        'protocol-tests',
        'Test discovery, valid calls, invalid arguments, errors, concurrency, and shutdown.',
        'Testing handlers directly proves protocol interoperability.',
      ],
      [
        'inspector-debug',
        'Use protocol inspection and client logs to diagnose negotiation and transport failures.',
        'A connection failure always means authentication is wrong.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'tool-quality',
    'Tool Design, Errors, Pagination, and Context Efficiency',
    'Refine an MCP server whose tools are ambiguous and return too much data.',
    'an efficient tool API and evaluation suite',
    [
      [
        'tool-granularity',
        'Choose tool granularity that maps to meaningful user intent without unsafe generic execution.',
        'More tiny tools always improve selection.',
      ],
      [
        'descriptions-schemas',
        'Write discriminative descriptions, constrained schemas, examples, and side-effect metadata.',
        'Schema property names alone teach reliable tool use.',
      ],
      [
        'errors-recovery',
        'Return actionable domain errors without exposing secrets or stack internals.',
        'Every failure should be a generic server error.',
      ],
      [
        'pagination-filtering',
        'Provide filters, pagination, summaries, and stable identifiers for large result sets.',
        'The model benefits from receiving every matching record.',
      ],
      [
        'tool-evals',
        'Evaluate selection, argument construction, recovery, context cost, and side-effect accuracy.',
        'Handler unit tests measure agent usability.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'clients',
    'Connect and Operate MCP in Codex and Claude',
    'Configure one safe server in both Codex and Claude Code.',
    'cross-client MCP configuration and smoke tests',
    [
      [
        'codex-config',
        'Configure scoped Codex STDIO or HTTP servers, timeouts, tools, approvals, and authentication.',
        'ChatGPT web reads local Codex MCP configuration.',
      ],
      [
        'claude-config',
        'Configure Claude Code local, project, or user MCP scope and review shared server trust.',
        'All Claude MCP scopes are private to one user.',
      ],
      [
        'discovery-smoke',
        'Verify initialization, primitive discovery, tool calls, errors, and shutdown in each client.',
        'Appearing in a server list proves the integration works.',
      ],
      [
        'client-differences',
        'Document client-specific config, approval, prompt, resource, and output behavior.',
        'Every MCP client exposes identical features.',
      ],
      [
        'support-runbook',
        'Create a connection, auth, timeout, output-limit, and version troubleshooting runbook.',
        'Reinstalling the server is the first fix for every issue.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'authorization',
    'OAuth, Secrets, Identity, and Least Privilege',
    'Secure a remote MCP server serving user-specific data.',
    'an OAuth and credential-handling design',
    [
      [
        'auth-boundary',
        'Decide when authentication and user authorization are required by data and action scope.',
        'MCP authorization is mandatory for local STDIO.',
      ],
      [
        'oauth-flow',
        'Implement protected resource metadata and OAuth-aligned authorization for remote HTTP.',
        'An API key query parameter is equivalent to an authorization flow.',
      ],
      [
        'token-validation',
        'Validate token audience, issuer, scopes, expiry, and resource binding.',
        'Possessing any valid token authorizes every server action.',
      ],
      [
        'secret-storage',
        'Keep secrets out of source, prompts, logs, and shared configuration.',
        'Environment variables may be committed because values differ per machine.',
      ],
      [
        'least-privilege-tools',
        'Map scopes and approvals to narrow tools and user intent.',
        'Read-only tool names guarantee read-only implementation.',
        'professional',
        'evaluate',
      ],
    ],
  ],
  [
    'mcp-security',
    'MCP Security, Prompt Injection, and Supply Chain Trust',
    'Threat-model an MCP server consuming untrusted content and exposing write tools.',
    'an MCP security test suite and operating policy',
    [
      [
        'server-trust',
        'Inspect server provenance, dependencies, update channel, permissions, and data destinations.',
        'A listed community MCP server is officially verified.',
      ],
      [
        'indirect-injection',
        'Treat external resource and tool content as untrusted data that cannot redefine authority.',
        'MCP-delivered content is trusted because the server is configured.',
      ],
      [
        'confused-deputy',
        'Bind actions to user intent, authorization, audience, and protected resource.',
        'OAuth alone prevents confused-deputy attacks.',
      ],
      [
        'ssrf-exfiltration',
        'Restrict outbound destinations, redirects, local addresses, and sensitive response data.',
        'Schema validation prevents SSRF and data exfiltration.',
      ],
      [
        'security-operations',
        'Patch, rotate, revoke, audit, rate-limit, and incident-test MCP deployments.',
        'A secure launch configuration requires no ongoing operations.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'integration-capstone',
    'Skills plus MCP Integration and 2026 Evolution',
    'Ship a skill-driven MCP workflow across Codex and Claude with migration controls.',
    'a production skill and MCP integration package',
    [
      [
        'workflow-orchestration',
        'Use a skill to define the workflow while MCP provides narrow live capabilities.',
        'MCP tool descriptions should encode the entire business workflow.',
      ],
      [
        'dependency-declaration',
        'Declare skill tool dependencies and provide actionable setup and fallback behavior.',
        'A skill can assume every required server is installed.',
      ],
      [
        'cross-client-evals',
        'Run trigger, tool selection, permission, error, and outcome evals in both clients.',
        'Success in one agent host proves cross-client behavior.',
      ],
      [
        'spec-migration',
        'Track stable MCP specifications and test release-candidate migrations behind explicit compatibility gates.',
        'A breaking protocol release should be adopted automatically.',
      ],
      [
        'integration-defense',
        'Defend scope, trust, maintainability, context cost, and operator experience.',
        'A technically working demo is a complete extension product.',
        'professional',
        'create',
      ],
    ],
  ],
]);

export const agentSkillsMcpConfig = finalize({
  id: 'agent-skills-mcp',
  title: 'Creating Agent Skills and MCP Servers',
  version: '2026.07',
  audience: {
    description:
      'Developers and advanced agent users who need portable skills, secure MCP servers, and reliable integrations across Codex and Claude.',
    entryKnowledge: [
      'Write basic Python or TypeScript, understand JSON schemas and HTTP, and use a terminal and version control.',
    ],
    deviceConstraints: [
      'Desktop recommended for server labs; no paid external service is required.',
    ],
    accessibilityAssumptions: sharedAccessibility,
  },
  scope: {
    includes: [
      'Agent Skills standard, discovery, progressive disclosure, tests, and distribution',
      'MCP architecture, primitives, transports, SDK server construction, clients, and authorization',
      'Cross-client security, evaluation, operations, and 2026 protocol migration',
    ],
    excludes: [
      'Installing unreviewed third-party servers with production credentials',
      'Treating release candidates as stable specifications',
    ],
    nextCourses: ['repository-quality-gates'],
  },
  sources: [
    {
      title: 'OpenAI Codex Manual: Build Skills',
      authority: 'official-docs',
      url: 'https://developers.openai.com/codex/codex-manual.md',
      version: 'Verified current 2026-07-13',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls Codex skill structure, progressive disclosure, locations, invocation, plugins, and dependencies.',
    },
    {
      title: 'Agent Skills Specification',
      authority: 'standard',
      url: 'https://agentskills.io/specification',
      version: 'Current 2026-07-13',
      reviewedAt: REVIEWED_AT,
      scope: 'Controls portable skill directory, metadata, naming, and resource conventions.',
    },
    {
      title: 'MCP Stable Specification Architecture',
      authority: 'standard',
      url: 'https://modelcontextprotocol.io/specification/2025-06-18/architecture',
      version: '2025-06-18 stable',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls stable client-host-server architecture, lifecycle, capability negotiation, and primitives.',
    },
    {
      title: 'MCP Security Best Practices',
      authority: 'standard',
      url: 'https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices',
      version: 'Current 2026-07-13',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls authorization threats, confused deputy, injection, SSRF, and mitigation practice.',
    },
    {
      title: 'Anthropic Claude Code MCP',
      authority: 'official-docs',
      url: 'https://docs.anthropic.com/en/docs/claude-code/mcp',
      version: 'Current 2026-07-13',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls Claude Code MCP transports, scopes, commands, trust prompts, resources, and prompts.',
    },
  ],
  modules: skillsMcpModules,
  projects: [
    project(
      'skill-review-workflow',
      'Tested Repository Review Skill',
      'agent-ext-skill-testing',
      'A software platform team',
      'The team needs a focused review skill with reliable triggers, references, scripts, tests, and safe failure behavior.',
      [
        'agent-ext-skill-fit',
        'agent-ext-description-triggers',
        'agent-ext-script-design',
        'agent-ext-instruction-tests',
      ]
    ),
    project(
      'mcp-local-knowledge',
      'Local Knowledge MCP Server',
      'agent-ext-tool-quality',
      'A documentation engineering group',
      'The group needs efficient resource search and narrow update tools with typed errors and protocol tests.',
      [
        'agent-ext-host-client-server',
        'agent-ext-resources',
        'agent-ext-protocol-tests',
        'agent-ext-pagination-filtering',
      ]
    ),
    project(
      'mcp-secure-remote',
      'Authorized Remote Operations MCP',
      'agent-ext-mcp-security',
      'An internal service operations group',
      'The group needs a least-privilege remote server resilient to injection, confused deputy, SSRF, and credential leakage.',
      [
        'agent-ext-oauth-flow',
        'agent-ext-token-validation',
        'agent-ext-confused-deputy',
        'agent-ext-security-operations',
      ]
    ),
    project(
      'skill-mcp-capstone',
      'Cross-Client Skill and MCP Capstone',
      'agent-ext-integration-capstone',
      'A shared AI enablement team',
      'The team needs one production workflow installed, tested, and operated in both Codex and Claude.',
      [
        'agent-ext-workflow-orchestration',
        'agent-ext-cross-client-evals',
        'agent-ext-spec-migration',
        'agent-ext-integration-defense',
      ]
    ),
  ],
  examContext:
    'Fresh skill design, trigger, packaging, MCP protocol, transport, schema, client, authorization, threat, and integration cases with build tasks.',
  minimumQuestionBankSize: 380,
});

const gateModules = agentModules('gates', [
  [
    'risk-contract',
    'Repository Purpose, Risk Profile, and Definition of Done',
    'Design quality gates for a new repository according to its actual failure costs.',
    'a repository engineering contract',
    [
      [
        'repo-purpose',
        'Define users, runtime, data sensitivity, deployment, ownership, and expected lifetime.',
        'Every new repository should use the same maximum gate set.',
      ],
      [
        'risk-profile',
        'Rank correctness, security, accessibility, performance, compatibility, and maintenance risks.',
        'All quality dimensions deserve identical thresholds.',
      ],
      [
        'done-contract',
        'Define machine-verifiable and human-reviewed completion criteria.',
        'A passing build is a complete definition of done.',
      ],
      [
        'gate-economics',
        'Balance detection value, feedback speed, noise, and maintenance cost.',
        'Adding more tools always improves quality.',
      ],
      [
        'exception-policy',
        'Document bounded suppressions, owners, expiry, and review evidence.',
        'A disabled rule needs no explanation if CI passes.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'toolchain',
    'Toolchain Selection, Compatibility, and Reproducible Setup',
    'Select a minimal compatible toolchain and prove clean-machine setup.',
    'a pinned bootstrap and compatibility matrix',
    [
      [
        'runtime-version',
        'Pin supported runtime and package-manager versions with one authoritative source.',
        'Latest floating versions produce reproducible builds.',
      ],
      [
        'dependency-lock',
        'Commit appropriate lockfiles and verify deterministic clean installs.',
        'A version range in a manifest fully locks dependencies.',
      ],
      [
        'tool-overlap',
        'Choose tools with clear ownership and minimal duplicate diagnostics.',
        'Two linters finding the same issue are twice as safe.',
      ],
      [
        'config-authority',
        'Keep one canonical config per concern and document generated files.',
        'Copying defaults across files improves clarity.',
      ],
      [
        'bootstrap-smoke',
        'Test setup, build, and checks from a clean environment.',
        'If setup works on the author machine it is documented correctly.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'format-style',
    'Formatting, Style, and Editor Consistency',
    'Create one fast deterministic formatting path for code and configuration.',
    'a zero-diff formatting gate',
    [
      [
        'formatter-choice',
        'Choose a deterministic formatter and define supported file scope.',
        'Formatting preferences should be enforced manually in review.',
      ],
      [
        'check-write-modes',
        'Separate local write mode from CI check-only mode.',
        'CI should silently rewrite committed code.',
      ],
      [
        'editorconfig',
        'Use editor-independent whitespace, newline, and charset settings.',
        'A formatter handles every non-code file and editor behavior.',
      ],
      [
        'generated-vendor',
        'Exclude generated, vendored, fixture, and snapshot files intentionally.',
        'Ignoring all large directories is safe.',
      ],
      [
        'format-migration',
        'Introduce or replace formatting with isolated reviewable migration commits.',
        'A style migration should be mixed with behavioral refactoring.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'lint-correctness',
    'Linting for Correctness, Safety, and Maintainability',
    'Configure a high-signal linter beyond default style warnings.',
    'a risk-based lint policy and fixtures',
    [
      [
        'recommended-baseline',
        'Start with maintained recommended rules and promote material findings to errors.',
        'Recommended rules cover every repository risk.',
      ],
      [
        'bug-rules',
        'Enable rules for invalid control flow, unsafe APIs, promises, hooks, and accessibility as applicable.',
        'Linters only enforce subjective style.',
      ],
      [
        'rule-severity',
        'Set severity from failure impact and confidence rather than preference strength.',
        'Every available rule should block merges.',
      ],
      [
        'lint-fixtures',
        'Keep failing and passing fixtures for important custom policy.',
        'A configuration file proves the rules behave as intended.',
      ],
      [
        'lint-upgrades',
        'Review new, removed, renamed, and changed rules during tool upgrades.',
        'Linter upgrades are behavior-free dependency bumps.',
        'professional',
        'evaluate',
      ],
    ],
  ],
  [
    'typing',
    'Strict Typing, Nullability, and Boundary Validation',
    'Establish a strict type baseline without confusing static types with runtime validation.',
    'a strict type and boundary contract',
    [
      [
        'strict-mode',
        'Enable the language or checker strict baseline and document intentional deviations.',
        'Gradual typing has value only when every value is annotated.',
      ],
      [
        'null-unknown',
        'Model null, missing, unknown, and unchecked indexed access explicitly.',
        'Non-null assertions are equivalent to runtime checks.',
      ],
      [
        'boundary-validation',
        'Validate files, network data, environment variables, and user input at runtime.',
        'A TypeScript or Python annotation validates external data.',
      ],
      [
        'type-tests',
        'Test public type contracts and intentional compile failures.',
        'Runtime unit tests cover type-level regressions.',
      ],
      [
        'typing-migration',
        'Ratchet strictness without permanently exempting legacy areas.',
        'A giant first-pass strict migration is the only honest approach.',
        'strategic',
        'create',
      ],
    ],
  ],
  [
    'constants-literals',
    'Constants, Literals, Domain Types, and Configuration',
    'Replace ambiguous magic values without creating meaningless constant noise.',
    'a domain constant and configuration policy',
    [
      [
        'literal-risk',
        'Distinguish harmless local literals from repeated domain rules, units, limits, and protocol values.',
        'Every numeric or string literal must become a constant.',
      ],
      [
        'named-constants',
        'Name stable domain values by meaning and keep them near their owning policy.',
        'A global constants file improves every codebase.',
      ],
      [
        'literal-types',
        'Use enums, unions, literal types, branded values, or value objects for closed domains.',
        'A plain string is sufficient for every domain state.',
      ],
      [
        'units-configuration',
        'Separate units, deploy-time configuration, feature flags, and code constants.',
        'All values that might change belong in environment variables.',
      ],
      [
        'constant-tests',
        'Test boundary values and downstream behavior instead of only constant equality.',
        'A constant declaration cannot cause behavioral regressions.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'dead-code',
    'Dead Code, Unused Dependencies, and Reachability',
    'Remove unreachable code and dependencies with evidence rather than guesswork.',
    'a dead-code and dependency audit',
    [
      [
        'unused-symbols',
        'Treat unused imports, variables, parameters, private members, and exports according to language semantics.',
        'Prefixing every unused value with an underscore fixes dead code.',
      ],
      [
        'unreachable-code',
        'Detect unreachable branches, impossible states, and obsolete feature paths.',
        'Code is live if a text search finds its name.',
      ],
      [
        'dependency-analysis',
        'Detect unused, missing, duplicate, and undeclared dependencies.',
        'A package is needed whenever it appears in a lockfile.',
      ],
      [
        'dynamic-reachability',
        'Account for plugins, reflection, generated entry points, and framework conventions.',
        'Static analysis can see every runtime registration.',
      ],
      [
        'safe-removal',
        'Remove dead code with tests, telemetry, deprecation, and rollback evidence proportionate to risk.',
        'Deleting unused-looking code is always a harmless cleanup.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'tests',
    'Test Strategy, Contracts, Properties, and Mutation',
    'Design a layered test suite around risks rather than file counts.',
    'a risk-to-test coverage matrix',
    [
      [
        'test-layers',
        'Assign unit, integration, contract, browser, system, and acceptance tests to distinct risks.',
        'More end-to-end tests make lower-level tests unnecessary.',
      ],
      [
        'behavior-contracts',
        'Test public behavior, invariants, boundaries, and failure recovery.',
        'Mirroring implementation lines produces robust tests.',
      ],
      [
        'property-tests',
        'Use generated cases for algebraic properties, parser boundaries, and state invariants.',
        'Property-based tests are random examples without reproducibility.',
      ],
      [
        'mutation-testing',
        'Use mutation analysis selectively to find assertions that do not detect behavior changes.',
        'High line coverage proves assertions are meaningful.',
      ],
      [
        'flaky-tests',
        'Detect, quarantine briefly, diagnose, and remove nondeterminism with ownership.',
        'Retrying a flaky test converts it into a reliable gate.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'coverage',
    'Coverage, Thresholds, and Meaningful Evidence',
    'Set coverage policy that exposes risk without encouraging empty tests.',
    'a changed-code coverage and exception policy',
    [
      [
        'coverage-kinds',
        'Interpret line, branch, function, condition, and path coverage limitations.',
        'One coverage percentage describes all tested behavior.',
      ],
      [
        'threshold-design',
        'Choose global, package, and changed-code thresholds from risk and baseline.',
        'A universal one-hundred-percent threshold guarantees quality.',
      ],
      [
        'exclusions',
        'Exclude generated or unreachable code with reviewed narrow rules.',
        'Coverage exclusions are harmless configuration details.',
      ],
      [
        'coverage-diff',
        'Prevent new untested behavior while ratcheting legacy coverage.',
        'Only repository-wide coverage should gate a pull request.',
      ],
      [
        'coverage-review',
        'Pair coverage gaps with mutation, defect, and risk evidence.',
        'The highest-coverage test suite is automatically best.',
        'strategic',
        'evaluate',
      ],
    ],
  ],
  [
    'security',
    'Secrets, Dependencies, Static Analysis, and Supply Chain',
    'Build layered security gates for source, dependencies, workflows, and releases.',
    'a secure-development gate stack',
    [
      [
        'secret-scanning',
        'Prevent, detect, revoke, and remediate committed credentials and sensitive files.',
        'Deleting a secret from the latest commit removes its exposure.',
      ],
      [
        'dependency-vulnerability',
        'Scan direct and transitive dependencies and triage exploitability and reachability.',
        'Every advisory requires an immediate blind major upgrade.',
      ],
      [
        'sast-codeql',
        'Use static security analysis for data flow and dangerous patterns with reviewed queries.',
        'A general linter replaces security analysis.',
      ],
      [
        'workflow-security',
        'Pin and minimize CI actions, tokens, permissions, and untrusted-code exposure.',
        'CI configuration is not production code.',
      ],
      [
        'artifact-provenance',
        'Record build provenance, checksums, signatures, and dependency inventories when risk requires.',
        'A release tag proves artifact integrity.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'sanitizers',
    'Runtime Sanitizers, Dynamic Analysis, and Language Profiles',
    'Add runtime instrumentation to native and managed-language test profiles.',
    'a sanitizer and dynamic-analysis matrix',
    [
      [
        'asan',
        'Use AddressSanitizer builds to detect memory safety defects in native code.',
        'Passing ordinary tests proves memory access is safe.',
      ],
      [
        'ubsan',
        'Use UndefinedBehaviorSanitizer with appropriate recover or trap policy.',
        'Undefined behavior always crashes without instrumentation.',
      ],
      [
        'thread-memory-sanitizers',
        'Select thread, memory, leak, race, or platform sanitizers according to risk and compatibility.',
        'All sanitizers can run together in one fast build.',
      ],
      [
        'managed-dynamic',
        'Use runtime warnings, leak checks, fuzzing, and framework diagnostics for managed languages.',
        'Sanitizers are relevant only to C and C++.',
      ],
      [
        'sanitizer-ci',
        'Run expensive dynamic checks in a documented matrix with symbolized actionable output.',
        'A sanitizer finding can be suppressed without root-cause review.',
        'strategic',
        'create',
      ],
    ],
  ],
  [
    'docs-contracts',
    'Documentation, APIs, Licenses, and Generated-Artifact Gates',
    'Keep human and machine contracts synchronized with implementation.',
    'a documentation and contract drift suite',
    [
      [
        'readme-setup',
        'Test README setup and core commands from a clean environment.',
        'Documentation is correct if it looks complete.',
      ],
      [
        'api-schema',
        'Validate API schemas, generated clients, migrations, and compatibility changes.',
        'Compilation catches every API compatibility break.',
      ],
      [
        'doc-links-examples',
        'Test documentation links and executable examples where practical.',
        'Examples can remain stale because they are not production code.',
      ],
      [
        'licenses-notices',
        'Check dependency licenses, attribution, notices, and source obligations.',
        'Open source dependencies have no distribution obligations.',
      ],
      [
        'generated-drift',
        'Regenerate schemas, clients, docs, and fixtures and fail on unexplained diffs.',
        'Generated files can be edited safely by hand.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'local-hooks',
    'Fast Local Feedback, Hooks, and Developer Experience',
    'Create fast local gates that match CI without blocking ordinary iteration.',
    'a one-command local verification workflow',
    [
      [
        'command-interface',
        'Expose stable format, lint, type, test, and verify commands independent of tool internals.',
        'Developers should memorize every underlying command.',
      ],
      [
        'hook-scope',
        'Run fast deterministic changed-file checks in local hooks and keep heavier checks elsewhere.',
        'Every commit should run the complete system test matrix.',
      ],
      [
        'hook-bypass',
        'Treat local hooks as convenience while CI remains authoritative and bypasses stay visible.',
        'A local hook cannot be skipped.',
      ],
      [
        'agent-guidance',
        'Document exact gate commands and completion expectations in AGENTS.md or equivalent.',
        'Agents infer repository verification commands reliably.',
      ],
      [
        'feedback-quality',
        'Make failures concise, reproducible locally, and linked to remediation.',
        'A nonzero exit code is sufficient developer feedback.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'ci-required',
    'CI Matrices, Required Checks, Caching, and Merge Policy',
    'Build a secure required-check workflow across supported environments.',
    'a required CI quality-gate workflow',
    [
      [
        'event-trust',
        'Separate trusted branch workflows from untrusted pull-request code and secrets.',
        'All GitHub Actions events have the same trust model.',
      ],
      [
        'job-graph',
        'Order cheap discriminating checks before expensive matrices while preserving useful parallelism.',
        'One serial mega-job is easiest to diagnose.',
      ],
      [
        'matrix-support',
        'Test declared runtime, operating-system, database, and feature support intentionally.',
        'Testing the newest environment implies older support.',
      ],
      [
        'cache-artifacts',
        'Use dependency caches and test artifacts without trusting executable output across boundaries.',
        'CI caches are always safe and correct.',
      ],
      [
        'required-status',
        'Connect stable named checks to branch protection and define cancellation and rerun policy.',
        'A workflow file automatically blocks unsafe merges.',
        'professional',
        'create',
      ],
    ],
  ],
  [
    'maintenance',
    'Gate Maintenance, Upgrades, Metrics, and Capstone',
    'Operate a reusable repository template without letting gates rot or overwhelm contributors.',
    'a reusable quality-gated repository template',
    [
      [
        'quality-metrics',
        'Measure defect escape, false positives, duration, flakiness, suppression age, and developer friction.',
        'More failed checks indicate a healthier repository.',
      ],
      [
        'tool-upgrades',
        'Schedule compatibility-tested tool and runtime upgrades with rollback paths.',
        'Automatic dependency updates need no test matrix.',
      ],
      [
        'policy-ratchets',
        'Raise standards gradually with changed-code gates and expiring debt records.',
        'Legacy debt justifies permanent exemptions.',
      ],
      [
        'template-variants',
        'Offer risk-based language and project profiles instead of one universal template.',
        'One repository template fits libraries, CLIs, web apps, and native services.',
      ],
      [
        'capstone-defense',
        'Defend each gate by risk, ownership, feedback time, evidence, and maintenance plan.',
        'A fashionable tool list is a quality strategy.',
        'professional',
        'create',
      ],
    ],
  ],
]);

export const repositoryQualityGatesConfig = finalize({
  id: 'repository-quality-gates',
  title: 'Engineering New Repositories with Quality Gates',
  version: '2026.07',
  audience: {
    description:
      'Developers and technical leads who want reproducible new-project setup with high-signal style, lint, type, test, dead-code, security, sanitizer, and CI enforcement.',
    entryKnowledge: [
      'Use Git, a package manager, tests, and a hosted pull-request workflow in at least one programming language.',
    ],
    deviceConstraints: [
      'Desktop recommended; labs use local configuration files and safe fixture repositories.',
    ],
    accessibilityAssumptions: sharedAccessibility,
  },
  scope: {
    includes: [
      'Risk-based repository contracts and compatible toolchains',
      'Formatting, linting, typing, literals, dead code, tests, security, sanitizers, and docs',
      'Local hooks, CI required checks, maintenance, and reusable templates',
    ],
    excludes: [
      'Blindly enabling every available rule',
      'One universal stack presented as correct for every language',
    ],
    nextCourses: [],
  },
  sources: [
    {
      title: 'GitHub Actions and Status Checks Documentation',
      authority: 'official-docs',
      url: 'https://docs.github.com/en/actions',
      version: 'Current 2026-07-13',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls workflow events, jobs, matrices, artifacts, security, and required check integration.',
    },
    {
      title: 'TypeScript TSConfig Reference',
      authority: 'official-docs',
      url: 'https://www.typescriptlang.org/tsconfig/',
      version: 'TypeScript 5.9',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls strict typing, unused code checks, indexed access, and compiler gate behavior.',
    },
    {
      title: 'Biome Linter Rules',
      authority: 'official-docs',
      url: 'https://biomejs.dev/linter/rules/',
      version: 'Biome 2.5',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls modern JavaScript and TypeScript formatting, correctness, accessibility, and unused-code lint examples.',
    },
    {
      title: 'Ruff Rules',
      authority: 'official-docs',
      url: 'https://docs.astral.sh/ruff/rules/',
      version: 'Current 2026-07-13',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls Python linting, unused code, safe fixes, suppression review, and rule selection.',
    },
    {
      title: 'Clang AddressSanitizer and UndefinedBehaviorSanitizer',
      authority: 'official-docs',
      url: 'https://clang.llvm.org/docs/AddressSanitizer.html',
      version: 'Clang 23 development documentation',
      reviewedAt: REVIEWED_AT,
      scope:
        'Controls native-code runtime sanitizer purpose, build profiles, output, limitations, and security cautions.',
    },
  ],
  modules: gateModules,
  projects: [
    project(
      'gates-typescript-library',
      'Strict TypeScript Library Template',
      'gates-dead-code',
      'A shared frontend platform team',
      'The team needs a reproducible library repo with formatting, correctness linting, strict typing, domain literals, and dead-code controls.',
      [
        'gates-runtime-version',
        'gates-bug-rules',
        'gates-boundary-validation',
        'gates-safe-removal',
      ]
    ),
    project(
      'gates-python-service',
      'Tested Python Service Template',
      'gates-security',
      'A small backend engineering team',
      'The team needs a Python service template with Ruff, strict typing, tests, dependency and secret gates, and clean setup.',
      [
        'gates-tool-overlap',
        'gates-strict-mode',
        'gates-test-layers',
        'gates-dependency-vulnerability',
      ]
    ),
    project(
      'gates-native-cli',
      'Sanitized Native CLI Template',
      'gates-docs-contracts',
      'A systems tools team',
      'The team needs a native CLI repo with warnings, tests, fuzz-ready boundaries, sanitizers, documentation, and release evidence.',
      ['gates-asan', 'gates-ubsan', 'gates-sanitizer-ci', 'gates-artifact-provenance']
    ),
    project(
      'gates-template-capstone',
      'Risk-Profiled Repository Gate Factory',
      'gates-maintenance',
      'An engineering enablement group',
      'The group needs maintained repository variants with compatible tools, required checks, fast local feedback, and measurable value.',
      [
        'gates-risk-profile',
        'gates-required-status',
        'gates-template-variants',
        'gates-capstone-defense',
      ]
    ),
  ],
  examContext:
    'Fresh repository setup, configuration review, failing-gate diagnosis, sanitizer, CI security, and maintenance cases across TypeScript, Python, and native code.',
  minimumQuestionBankSize: 380,
});

export const expandedCourseConfigs = [
  appliedMathematicsBeginnerConfig,
  appliedMathematicsIntermediateConfig,
  appliedMathematicsAdvancedConfig,
  promptEngineering2026Config,
  agentLoopsGoalsConfig,
  agentSkillsMcpConfig,
  repositoryQualityGatesConfig,
  sqlBasicsConfig,
  goBasicsConfig,
  dockerBasicsConfig,
  kubernetesBasicsConfig,
  cicdGithubActionsConfig,
  gitAdvancedConfig,
  httpServerGoConfig,
  httpServerTypescriptConfig,
  httpProtocolGoConfig,
  rabbitmqTypescriptConfig,
  rabbitmqGoConfig,
  fileServersS3GoConfig,
  fileServersS3TypescriptConfig,
  cMemoryManagementConfig,
  cryptographyGoConfig,
  ragRetrievalAugmentedGenerationConfig,
  buildBookbotPythonConfig,
  buildAsteroidsPythonConfig,
  buildStaticSitePythonConfig,
  buildMazeSolverPythonConfig,
  buildWebScraperPythonConfig,
  buildAiAgentPythonConfig,
  buildPokedexGoConfig,
  buildPokedexTypescriptConfig,
  buildBlogAggregatorGoConfig,
  buildBlogAggregatorTypescriptConfig,
  buildWebScraperGoConfig,
  buildWebScraperTypescriptConfig,
  ...portfolioProjectCourseConfigs,
  jobSearchConfig,
  comptiaAPlusConfig,
  ...httpClientCourseConfigs,
];
