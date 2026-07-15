export const ARCADE_MODES = [
  'algorithm-arena',
  'code-builder',
  'code-hunter',
  'logic-maze',
  'syntax-speed',
] as const;

export type ArcadeMode = (typeof ARCADE_MODES)[number];

export interface ChoiceTask {
  kind: 'choice';
  prompt: string;
  options: Array<{ id: string; text: string }>;
  correctOptionId: string;
}

export interface OrderTask {
  kind: 'order';
  prompt: string;
  items: Array<{ id: string; text: string }>;
  initialOrder: string[];
  correctOrder: string[];
}

export interface TypingTask {
  kind: 'typing';
  prompt: string;
  target: string;
  language: string;
}

export type ArcadeTask = ChoiceTask | OrderTask | TypingTask;
export type ArcadeResponse = string | string[];

export interface ArcadeChallenge {
  id: string;
  mode: ArcadeMode;
  title: string;
  scenario: string;
  competency: string;
  stimulus?: string;
  primary: ArcadeTask;
  transfer: ArcadeTask;
  explanation: string;
  hints: [string, string, string];
}

function choice(
  prompt: string,
  correctOptionId: string,
  options: Array<[id: string, text: string]>
): ChoiceTask {
  return {
    kind: 'choice',
    prompt,
    correctOptionId,
    options: options.map(([id, text]) => ({ id, text })),
  };
}

function order(
  prompt: string,
  items: Array<[id: string, text: string]>,
  initialOrder: string[],
  correctOrder: string[]
): OrderTask {
  return {
    kind: 'order',
    prompt,
    items: items.map(([id, text]) => ({ id, text })),
    initialOrder,
    correctOrder,
  };
}

function typing(prompt: string, target: string, language: string): TypingTask {
  return { kind: 'typing', prompt, target, language };
}

export const ARCADE_CHALLENGES: Record<ArcadeMode, ArcadeChallenge[]> = {
  'algorithm-arena': [
    {
      id: 'arena-binary-search-invariant',
      mode: 'algorithm-arena',
      title: 'Protect the Search Interval',
      scenario: 'A sorted incident ledger must be searched without skipping a possible match.',
      competency: 'Maintain and explain a binary-search interval invariant.',
      stimulus: 'values = [3, 8, 13, 21, 34, 55, 89]\ntarget = 21\nleft = 0, right = 6, mid = 3',
      primary: choice(
        'The midpoint equals the target. What proves this run is complete?',
        'return',
        [
          ['scan', 'Scan both neighboring values before deciding.'],
          ['return', 'Return index 3 because values[3] equals the target.'],
          ['shrink', 'Set right to mid - 1 and keep searching.'],
        ]
      ),
      transfer: choice(
        'Changed case: target is 20 and values[mid] is 21. Which update preserves every possible match?',
        'move-right',
        [
          ['move-left', 'Set left = mid + 1.'],
          ['move-right', 'Set right = mid - 1.'],
          ['drop-both', 'Set left = mid + 1 and right = mid - 1.'],
        ]
      ),
      explanation:
        'Equality is direct success. When the midpoint is too large in ascending data, only the left interval can still contain the target.',
      hints: [
        'State what remains possible before changing either boundary.',
        'The collection is ascending.',
        'A midpoint larger than the target rules out the midpoint and everything to its right.',
      ],
    },
    {
      id: 'arena-bfs-shortest-path',
      mode: 'algorithm-arena',
      title: 'Choose the Frontier',
      scenario: 'An evacuation map has unweighted corridors and needs the fewest-hop safe route.',
      competency: 'Select a traversal from the graph and path-cost contract.',
      stimulus: 'A—B—D\n|  |\nC—E',
      primary: choice('Which frontier guarantees the first visit uses the fewest edges?', 'queue', [
        ['stack', 'A last-in, first-out stack.'],
        ['queue', 'A first-in, first-out queue.'],
        ['heap', 'A heap ordered by node label.'],
      ]),
      transfer: choice(
        'Changed case: corridors gain different nonnegative travel times. What must replace plain BFS?',
        'dijkstra',
        [
          ['dfs', 'Depth-first search with a visited set.'],
          ['dijkstra', 'Dijkstra with a distance-priority queue.'],
          ['same-bfs', 'The same FIFO BFS without weights.'],
        ]
      ),
      explanation:
        'FIFO expansion visits an unweighted graph by hop layer. Once edge costs differ, the frontier must be ordered by best known distance.',
      hints: [
        'Ask what one edge means in the original graph.',
        'The first problem optimizes hop count.',
        'A FIFO queue processes all distance-k nodes before distance-k+1 nodes.',
      ],
    },
    {
      id: 'arena-stable-sort',
      mode: 'algorithm-arena',
      title: 'Keep Equal Records Honest',
      scenario: 'A support dashboard sorts tickets by priority while preserving arrival order.',
      competency: 'Recognize when sort stability is part of observable correctness.',
      stimulus: '[(high, A), (low, B), (high, C), (high, D)]',
      primary: choice(
        'After a stable priority sort, what order must the high tickets keep?',
        'acd',
        [
          ['dca', 'D, C, A'],
          ['acd', 'A, C, D'],
          ['any', 'Any order because priorities are equal.'],
        ]
      ),
      transfer: choice(
        'Changed case: each ticket also has an explicit monotonic sequence key. Which approach makes stability independently verifiable?',
        'tuple',
        [
          ['tuple', 'Sort by (priority, sequence).'],
          ['shuffle', 'Shuffle ties, then sort by priority.'],
          ['reverse', 'Reverse before sorting by priority.'],
        ]
      ),
      explanation:
        'A stable sort preserves the earlier relative order of equal keys. An explicit secondary key makes the intended tie rule portable and testable.',
      hints: [
        'Ignore low-priority B and read the high tickets from left to right.',
        'Stability concerns equal primary keys.',
        'A, C, and D arrived in that order.',
      ],
    },
    {
      id: 'arena-negative-edge',
      mode: 'algorithm-arena',
      title: 'Reject the Broken Assumption',
      scenario: 'A route optimizer introduces rebate edges that can reduce a path cost below zero.',
      competency: 'Identify the precondition that makes Dijkstra finalization sound.',
      primary: choice('Why can ordinary Dijkstra no longer defend its result?', 'negative', [
        ['cycles', 'The graph contains any cycle.'],
        ['negative', 'A later negative edge can improve a node already treated as final.'],
        ['directed', 'The graph is directed.'],
      ]),
      transfer: choice(
        'Changed case: all edges are nonnegative but the heuristic in A* can overestimate. What claim is now unsafe?',
        'optimal',
        [
          ['termination', 'The search can never terminate.'],
          ['optimal', 'The first goal removed from the frontier is guaranteed optimal.'],
          ['memory', 'The graph cannot be represented in memory.'],
        ]
      ),
      explanation:
        'Greedy finalization depends on costs never becoming cheaper through a later edge. A* optimality likewise depends on a bounded heuristic contract.',
      hints: [
        'Focus on what final means.',
        'Can a path discovered later become cheaper?',
        'A negative edge can invalidate an earlier minimum-distance decision.',
      ],
    },
    {
      id: 'arena-dynamic-state',
      mode: 'algorithm-arena',
      title: 'Name the Smallest Reusable State',
      scenario: 'A robot crosses a grid with obstacles and can move only right or down.',
      competency: 'Define dynamic-programming state and transition evidence.',
      primary: choice('Which state is sufficient for counting routes to each cell?', 'cell', [
        ['history', 'The full sequence of every route taken so far.'],
        ['cell', 'The number of valid routes reaching row r, column c.'],
        ['global', 'One global count shared by every cell.'],
      ]),
      transfer: choice(
        'Changed case: the robot may spend one token to cross a single obstacle. What state dimension must be added?',
        'token',
        [
          ['direction', 'The color of the previous cell.'],
          ['token', 'Whether the obstacle token has been used.'],
          ['route-text', 'The printed route string.'],
        ]
      ),
      explanation:
        'A DP state keeps exactly the information future transitions need. Adding a one-use capability requires tracking its remaining availability.',
      hints: [
        'Discard history that cannot change future choices.',
        'The original future depends on position only.',
        'The changed future depends on position plus token availability.',
      ],
    },
  ],
  'code-hunter': [
    {
      id: 'hunter-off-by-one',
      mode: 'code-hunter',
      title: 'Find the Missing Final Item',
      scenario: 'A batch report silently omits its last record.',
      competency: 'Locate an off-by-one boundary and explain the missing case.',
      stimulus:
        '1  const rows = ["a", "b", "c"];\n2  const output = [];\n3  for (let i = 0; i < rows.length - 1; i += 1) {\n4    output.push(rows[i]);\n5  }',
      primary: choice('Which line causes the omission?', 'line-3', [
        ['line-1', 'Line 1'],
        ['line-3', 'Line 3'],
        ['line-4', 'Line 4'],
      ]),
      transfer: choice(
        'Changed case: the loop starts at index 1 with i < rows.length. What is omitted now?',
        'first',
        [
          ['first', 'Only the first row.'],
          ['last', 'Only the last row.'],
          ['none', 'No row.'],
        ]
      ),
      explanation:
        'Subtracting one from the exclusive upper bound stops before the final valid index. Starting at one instead skips the first valid index.',
      hints: [
        'List the valid indexes.',
        'The final valid index is length - 1.',
        'An exclusive bound should be i < rows.length.',
      ],
    },
    {
      id: 'hunter-truthy-zero',
      mode: 'code-hunter',
      title: 'Stop Losing Valid Zeroes',
      scenario: 'A capacity dashboard replaces a valid zero reading with an unknown marker.',
      competency: 'Distinguish absence from falsy but valid domain values.',
      stimulus:
        '1  function labelCapacity(value) {\n2    return value || "unknown";\n3  }\n4  labelCapacity(0);',
      primary: choice('Which line collapses valid zero into absence?', 'line-2', [
        ['line-1', 'Line 1'],
        ['line-2', 'Line 2'],
        ['line-4', 'Line 4'],
      ]),
      transfer: choice(
        'Which replacement preserves 0 but defaults null and undefined?',
        'nullish',
        [
          ['or', 'value || "unknown"'],
          ['nullish', 'value ?? "unknown"'],
          ['boolean', 'Boolean(value)'],
        ]
      ),
      explanation:
        'Logical OR defaults every falsy value. Nullish coalescing defaults only null and undefined, preserving a meaningful numeric zero.',
      hints: [
        'Evaluate 0 || "unknown".',
        'Zero is falsy but valid here.',
        'Use an operator based on absence, not truthiness.',
      ],
    },
    {
      id: 'hunter-shared-default',
      mode: 'code-hunter',
      title: 'Isolate Mutable State',
      scenario: 'New Python request objects inherit tags from earlier requests.',
      competency: 'Locate shared mutable default state and repair object isolation.',
      stimulus:
        '1  def add_tag(tag, tags=[]):\n2      tags.append(tag)\n3      return tags\n4\n5  add_tag("urgent")\n6  add_tag("new")',
      primary: choice('Which line creates state shared across calls?', 'line-1', [
        ['line-1', 'Line 1'],
        ['line-2', 'Line 2'],
        ['line-6', 'Line 6'],
      ]),
      transfer: choice(
        'Which signature and initialization creates a fresh list per omitted argument?',
        'none',
        [
          ['copy', 'def add_tag(tag, tags=[]): tags = tags.copy()'],
          ['none', 'def add_tag(tag, tags=None): tags = [] if tags is None else tags'],
          ['tuple', 'def add_tag(tag, tags=()): tags.append(tag)'],
        ]
      ),
      explanation:
        'Default arguments are created once at function definition. An absence sentinel lets each call allocate independent mutable state.',
      hints: [
        'Ask when the default list is created.',
        'The list survives after one call returns.',
        'Use None as the absence sentinel.',
      ],
    },
    {
      id: 'hunter-sql-null',
      mode: 'code-hunter',
      title: 'Repair the NULL Predicate',
      scenario:
        'A cleanup query finds no rows even though several deletion timestamps are missing.',
      competency: 'Apply SQL three-valued logic to absence checks.',
      stimulus: '1  SELECT id\n2  FROM jobs\n3  WHERE deleted_at = NULL;',
      primary: choice('Which line contains the ineffective NULL comparison?', 'line-3', [
        ['line-1', 'Line 1'],
        ['line-2', 'Line 2'],
        ['line-3', 'Line 3'],
      ]),
      transfer: choice(
        'What predicate selects rows whose deletion timestamp is present?',
        'not-null',
        [
          ['neq', 'deleted_at != NULL'],
          ['not-null', 'deleted_at IS NOT NULL'],
          ['truthy', 'WHERE deleted_at'],
        ]
      ),
      explanation:
        'Equality with NULL yields unknown, not true. SQL uses IS NULL and IS NOT NULL for absence predicates.',
      hints: [
        'NULL is not an ordinary value.',
        'The WHERE clause keeps only true.',
        'Use IS rather than equals.',
      ],
    },
    {
      id: 'hunter-async-return',
      mode: 'code-hunter',
      title: 'Return the Awaited Value',
      scenario: 'A TypeScript client resolves successfully but its caller receives undefined.',
      competency: 'Trace an async return contract across an awaited boundary.',
      stimulus:
        '1  async function loadProfile() {\n2    const response = await fetch("/profile");\n3    const profile = await response.json();\n4    console.info(profile.id);\n5  }',
      primary: choice('Which line must return profile to satisfy the caller contract?', 'line-5', [
        ['line-2', 'Line 2'],
        ['line-4', 'Line 4'],
        ['line-5', 'Line 5, before the closing brace'],
      ]),
      transfer: choice(
        'Changed case: response.ok is false. What must happen before parsing success data?',
        'reject',
        [
          ['parse', 'Parse JSON and hope it matches Profile.'],
          ['reject', 'Reject or return a typed failure based on status.'],
          ['log', 'Log the status and still return undefined.'],
        ]
      ),
      explanation:
        'Awaiting computes a local value; it does not return that value to the caller. HTTP failure must also be admitted before success-shape parsing.',
      hints: [
        'Follow the value after line 3.',
        'Logging is not returning.',
        'The function reaches its closing brace without a return statement.',
      ],
    },
  ],
  'code-builder': [
    {
      id: 'builder-http-client',
      mode: 'code-builder',
      title: 'Assemble a Defensible HTTP Read',
      scenario:
        'A client must fetch untrusted JSON without hanging or accepting an error page as data.',
      competency: 'Order admission, transport, status, parsing, and schema evidence.',
      primary: order(
        'Move the steps into a safe request sequence.',
        [
          ['admit', 'Validate the destination and request inputs.'],
          ['timeout', 'Create a bounded timeout or cancellation signal.'],
          ['request', 'Send the request with the bounded signal.'],
          ['status', 'Reject unexpected HTTP status.'],
          ['parse', 'Parse the response as unknown JSON.'],
          ['schema', 'Validate unknown data against the domain schema.'],
        ],
        ['parse', 'request', 'schema', 'admit', 'status', 'timeout'],
        ['admit', 'timeout', 'request', 'status', 'parse', 'schema']
      ),
      transfer: choice(
        'Changed case: the request is retried. What extra evidence prevents duplicate writes?',
        'idempotency',
        [
          ['sleep', 'A longer fixed sleep before every retry.'],
          ['idempotency', 'An idempotency key and server-side replay contract.'],
          ['catch', 'A catch block that ignores every error.'],
        ]
      ),
      explanation:
        'Each layer narrows uncertainty before the next one trusts it. Retried writes require an explicit idempotency boundary, not timing luck.',
      hints: [
        'Start before any network side effect.',
        'Status comes before trusting the body.',
        'Unknown JSON becomes domain data only after validation.',
      ],
    },
    {
      id: 'builder-accessible-form',
      mode: 'code-builder',
      title: 'Build a Recoverable Form Flow',
      scenario:
        'A public-benefit form must work by keyboard and explain repair without erasing input.',
      competency: 'Order accessible form admission, focus, feedback, and success evidence.',
      primary: order(
        'Arrange the submission lifecycle.',
        [
          ['labels', 'Associate visible labels and instructions before input.'],
          ['submit', 'Accept keyboard or pointer submission.'],
          ['validate', 'Validate all fields without deleting learner input.'],
          ['summary', 'Render and announce an error summary.'],
          ['focus', 'Move focus to the summary when repair is required.'],
          ['success', 'Announce success and next action after valid submission.'],
        ],
        ['submit', 'focus', 'labels', 'success', 'validate', 'summary'],
        ['labels', 'submit', 'validate', 'summary', 'focus', 'success']
      ),
      transfer: choice(
        'Changed case: errors update while typing. What prevents disruptive repeated announcements?',
        'bounded-live',
        [
          ['alert-all', 'Make every field an assertive live region.'],
          ['bounded-live', 'Use a bounded status region and announce meaningful state changes.'],
          ['color', 'Use red borders without text.'],
        ]
      ),
      explanation:
        'The interface establishes meaning before interaction, preserves work during repair, and moves attention only when necessary. Live feedback must remain bounded.',
      hints: [
        'Labels exist before submission.',
        'Validation produces the error evidence.',
        'Render the summary before moving focus to it.',
      ],
    },
    {
      id: 'builder-transaction',
      mode: 'code-builder',
      title: 'Protect a Multi-Table Change',
      scenario: 'An order and its inventory reservation must commit together or not at all.',
      competency: 'Order transaction work around invariants and rollback.',
      primary: order(
        'Arrange the database operation.',
        [
          ['begin', 'Begin the transaction.'],
          ['read', 'Read and lock the inventory row required by policy.'],
          ['check', 'Check that the invariant permits reservation.'],
          ['reserve', 'Write the reservation and inventory change.'],
          ['order', 'Write the order record.'],
          ['commit', 'Commit; roll back on any failure.'],
        ],
        ['reserve', 'begin', 'commit', 'read', 'order', 'check'],
        ['begin', 'read', 'check', 'reserve', 'order', 'commit']
      ),
      transfer: choice(
        'Changed case: two workers reserve the final item. What evidence is still required?',
        'concurrency',
        [
          ['unit', 'Only a single-threaded unit test.'],
          [
            'concurrency',
            'A concurrent changed-case test under the chosen isolation/locking policy.',
          ],
          ['logging', 'A log line before commit.'],
        ]
      ),
      explanation:
        'The invariant is checked inside the same protected transaction as its writes. Concurrency evidence verifies the isolation claim under contention.',
      hints: [
        'Establish the transaction before protected reads.',
        'Check before writing.',
        'Commit is the final success boundary.',
      ],
    },
    {
      id: 'builder-file-upload',
      mode: 'code-builder',
      title: 'Admit an Untrusted Upload',
      scenario:
        'A community archive accepts documents but must bound cost and prevent executable surprises.',
      competency: 'Order authorization, streaming admission, storage, and retrieval safety.',
      primary: order(
        'Arrange the upload pipeline.',
        [
          ['authorize', 'Authorize the actor and intended collection.'],
          ['limit', 'Enforce request and streaming byte limits.'],
          ['sniff', 'Validate content from bytes, not filename alone.'],
          ['scan', 'Apply the bounded malware/content policy.'],
          ['store', 'Store under a generated non-executable object key.'],
          ['record', 'Commit metadata, integrity, owner, and lifecycle evidence.'],
        ],
        ['store', 'authorize', 'record', 'sniff', 'limit', 'scan'],
        ['authorize', 'limit', 'sniff', 'scan', 'store', 'record']
      ),
      transfer: choice(
        'Changed case: metadata commit fails after object storage succeeds. What closes the orphan gap?',
        'reconcile',
        [
          ['ignore', 'Ignore the object because no database row exists.'],
          ['reconcile', 'Use compensating deletion or a durable reconciliation ledger.'],
          ['public', 'Make the object public so an operator can find it.'],
        ]
      ),
      explanation:
        'Admission happens before durable trust. Cross-system partial failure needs explicit compensation or reconciliation rather than an invisible orphan.',
      hints: [
        'Authority comes first.',
        'Bound bytes before reading an unbounded body.',
        'Store only after validation and scanning policy.',
      ],
    },
    {
      id: 'builder-debug-method',
      mode: 'code-builder',
      title: 'Run a Bounded Investigation',
      scenario: 'A release makes checkout slower, but the cause is unknown.',
      competency: 'Order baseline, hypothesis, bounded test, repair, and prevention evidence.',
      primary: order(
        'Arrange the investigation loop.',
        [
          ['impact', 'Bound user impact, safety, authority, and rollback.'],
          ['baseline', 'Capture a reproducible before-change baseline.'],
          ['hypothesis', 'State one falsifiable causal hypothesis.'],
          ['test', 'Run the smallest controlled test that distinguishes causes.'],
          ['repair', 'Apply or roll back one justified change.'],
          ['verify', 'Repeat the baseline and a changed case; record prevention.'],
        ],
        ['repair', 'hypothesis', 'verify', 'impact', 'test', 'baseline'],
        ['impact', 'baseline', 'hypothesis', 'test', 'repair', 'verify']
      ),
      transfer: choice(
        'Changed case: the test is inconclusive. What is the honest next move?',
        'revise',
        [
          ['guess', 'Apply the most popular fix anyway.'],
          ['revise', 'Record uncertainty and revise the hypothesis or measurement.'],
          ['hide', 'Delete the inconclusive trace.'],
        ]
      ),
      explanation:
        'A defensible investigation protects users, captures comparison evidence, changes one uncertainty at a time, and verifies both repair and transfer.',
      hints: [
        'Protect users before diagnosis.',
        'A hypothesis needs baseline evidence.',
        'Verification repeats the original measurement after repair.',
      ],
    },
  ],
  'logic-maze': [
    {
      id: 'maze-incident-response',
      mode: 'logic-maze',
      title: 'Navigate an Incident Without Destroying Evidence',
      scenario: 'An authorized service account shows suspicious activity during business hours.',
      competency: 'Sequence incident safety, preservation, containment, recovery, and learning.',
      primary: order(
        'Choose the path through the incident.',
        [
          ['scope', 'Confirm authority, impact, safety, and escalation path.'],
          ['preserve', 'Preserve relevant volatile and durable evidence.'],
          ['contain', 'Apply the least-destructive approved containment.'],
          ['eradicate', 'Remove the verified cause within authority.'],
          ['recover', 'Restore service and monitor changed-case behavior.'],
          ['learn', 'Document timeline, prevention, owners, and follow-up.'],
        ],
        ['eradicate', 'scope', 'learn', 'contain', 'recover', 'preserve'],
        ['scope', 'preserve', 'contain', 'eradicate', 'recover', 'learn']
      ),
      transfer: choice(
        'Changed case: containment would endanger a medical device. What controls the next action?',
        'safety',
        [
          ['speed', 'Contain immediately because security always wins.'],
          ['safety', 'Safety and authorized escalation before technical containment.'],
          ['silence', 'Avoid documenting the exception.'],
        ]
      ),
      explanation:
        'Incident sequence protects people and evidence before changing state. New safety constraints can legitimately change or pause containment.',
      hints: [
        'Authority and human safety are first.',
        'Preserve evidence before state-changing containment.',
        'Learning follows verified recovery.',
      ],
    },
    {
      id: 'maze-git-recovery',
      mode: 'logic-maze',
      title: 'Recover Work Without Rewriting Shared History',
      scenario:
        'A local commit disappeared after moving a branch pointer; collaborators already use the remote branch.',
      competency: 'Sequence non-destructive Git evidence and recovery.',
      primary: order(
        'Arrange the recovery path.',
        [
          ['stop', 'Stop new destructive operations and record the current state.'],
          ['reflog', 'Inspect reflog and object evidence for the lost commit.'],
          ['branch', 'Create a recovery branch at the verified object.'],
          ['compare', 'Compare recovered content and tests with intended work.'],
          ['integrate', 'Integrate through a normal merge/cherry-pick policy.'],
          ['publish', 'Publish after review without force-rewriting shared history.'],
        ],
        ['publish', 'reflog', 'integrate', 'stop', 'compare', 'branch'],
        ['stop', 'reflog', 'branch', 'compare', 'integrate', 'publish']
      ),
      transfer: choice(
        'Changed case: the object is unreachable and garbage collection may run. What becomes urgent?',
        'preserve',
        [
          ['force', 'Force-push an unrelated branch.'],
          ['preserve', 'Create a reference or backup that preserves the verified object.'],
          ['reset', 'Run another hard reset.'],
        ]
      ),
      explanation:
        'Recovery first preserves evidence, then creates a safe name for the object before integration. Shared history is not rewritten as a shortcut.',
      hints: [
        'Stop changing the evidence.',
        'Reflog locates earlier references.',
        'Name the recovered object before manipulating it.',
      ],
    },
    {
      id: 'maze-progressive-delivery',
      mode: 'logic-maze',
      title: 'Cross the Release Gates',
      scenario: 'A schema-compatible service release must reach production with bounded user risk.',
      competency: 'Order immutable release, canary evidence, promotion, and rollback.',
      primary: order(
        'Arrange the delivery gates.',
        [
          ['artifact', 'Build, scan, sign, and identify one immutable artifact.'],
          ['staging', 'Deploy that artifact to production-like staging checks.'],
          ['canary', 'Expose a small canary cohort with guardrails.'],
          ['observe', 'Compare service and user signals with the baseline.'],
          ['promote', 'Promote only when explicit thresholds hold.'],
          ['close', 'Verify full rollout or exercise rollback and record evidence.'],
        ],
        ['promote', 'artifact', 'close', 'canary', 'observe', 'staging'],
        ['artifact', 'staging', 'canary', 'observe', 'promote', 'close']
      ),
      transfer: choice(
        'Changed case: canary errors stay flat but task completion drops. What should the gate do?',
        'stop',
        [
          ['promote', 'Promote because server errors are flat.'],
          ['stop', 'Stop or roll back because a user guardrail failed.'],
          ['ignore', 'Remove the task-completion metric.'],
        ]
      ),
      explanation:
        'A release is one traceable artifact promoted through bounded exposure. User outcomes are first-class guardrails, not optional decoration.',
      hints: [
        'Identity exists before deployment.',
        'Observe the canary before promotion.',
        'Close with verified success or rollback evidence.',
      ],
    },
    {
      id: 'maze-account-recovery',
      mode: 'logic-maze',
      title: 'Restore Access Without Creating an Attack Path',
      scenario: 'A user lost a second factor and needs accessible account recovery.',
      competency:
        'Sequence identity evidence, risk controls, user communication, and session repair.',
      primary: order(
        'Arrange the recovery flow.',
        [
          ['request', 'Accept the recovery request without revealing account existence.'],
          ['risk', 'Apply rate, abuse, and contextual risk controls.'],
          ['proof', 'Collect approved identity evidence through accessible alternatives.'],
          ['notify', 'Notify established channels with a safe dispute path.'],
          ['rotate', 'Rotate recovery secrets and revoke affected sessions.'],
          ['verify', 'Verify restored access and audit the recovery event.'],
        ],
        ['rotate', 'request', 'verify', 'risk', 'notify', 'proof'],
        ['request', 'risk', 'proof', 'notify', 'rotate', 'verify']
      ),
      transfer: choice(
        'Changed case: the user cannot use the visual identity method. What must the system provide?',
        'alternative',
        [
          ['deny', 'Permanent denial because one method failed.'],
          ['alternative', 'An equivalent accessible, abuse-resistant alternative path.'],
          ['weaken', 'A public security question with guessable answers.'],
        ]
      ),
      explanation:
        'Recovery is a security-sensitive identity workflow. It must resist enumeration and abuse while preserving equivalent access paths.',
      hints: [
        'Do not reveal whether the account exists.',
        'Control abuse before accepting proof.',
        'Rotate and revoke before declaring recovery complete.',
      ],
    },
    {
      id: 'maze-data-migration',
      mode: 'logic-maze',
      title: 'Move Data Through an Expand-Contract Maze',
      scenario: 'A live service must replace one overloaded column without downtime.',
      competency: 'Order compatible schema expansion, backfill, cutover, and cleanup.',
      primary: order(
        'Arrange the migration stages.',
        [
          ['expand', 'Add the new backward-compatible schema.'],
          ['dual', 'Deploy compatible reads/writes with observable dual behavior.'],
          ['backfill', 'Run a resumable, idempotent backfill with reconciliation.'],
          ['verify', 'Verify counts, invariants, and changed records.'],
          ['cutover', 'Switch authoritative reads after evidence holds.'],
          ['contract', 'Remove old writes and schema only after rollback expiry.'],
        ],
        ['contract', 'backfill', 'expand', 'cutover', 'dual', 'verify'],
        ['expand', 'dual', 'backfill', 'verify', 'cutover', 'contract']
      ),
      transfer: choice(
        'Changed case: backfill restarts midway. What property prevents duplicate corruption?',
        'idempotent',
        [
          ['fast', 'The backfill runs quickly.'],
          ['idempotent', 'Each batch is idempotent and checkpointed.'],
          ['manual', 'An operator remembers the last row.'],
        ]
      ),
      explanation:
        'Expand-contract keeps old and new versions compatible while evidence accumulates. Resumable idempotent batches make interruption an expected state.',
      hints: [
        'Add before removing.',
        'Backfill while both shapes are compatible.',
        'Contract is last, after cutover and rollback expiry.',
      ],
    },
  ],
  'syntax-speed': [
    {
      id: 'speed-javascript-guard',
      mode: 'syntax-speed',
      title: 'Type a Nullish Guard',
      scenario: 'Preserve valid zero while defaulting absent values.',
      competency: 'Accurately produce a JavaScript nullish-coalescing expression.',
      primary: typing('Type the expression exactly.', 'const capacity = input ?? 0;', 'javascript'),
      transfer: typing(
        'Changed variable: type the equivalent label default.',
        'const label = name ?? "Unknown";',
        'javascript'
      ),
      explanation:
        'Exact syntax practice is paired with a changed identifier and value so recall transfers beyond one memorized line.',
      hints: [
        'Use const.',
        'The operator is two question marks.',
        'End the statement with a semicolon.',
      ],
    },
    {
      id: 'speed-python-enumerate',
      mode: 'syntax-speed',
      title: 'Type an Indexed Python Loop',
      scenario: 'Render human-readable row numbers without manual counter drift.',
      competency: 'Accurately use enumerate with a one-based start.',
      primary: typing(
        'Type the loop header exactly.',
        'for index, item in enumerate(items, start=1):',
        'python'
      ),
      transfer: typing(
        'Changed names: type the equivalent loop.',
        'for rank, score in enumerate(scores, start=1):',
        'python'
      ),
      explanation:
        'The changed case preserves the enumerate contract while requiring retrieval of punctuation, names, and keyword argument syntax.',
      hints: ['Unpack two values.', 'Pass start=1.', 'Python loop headers end with a colon.'],
    },
    {
      id: 'speed-typescript-unknown',
      mode: 'syntax-speed',
      title: 'Type an Unknown Boundary',
      scenario: 'Keep external JSON untrusted until validation.',
      competency: 'Accurately annotate an external TypeScript value as unknown.',
      primary: typing(
        'Type the declaration exactly.',
        'const payload: unknown = await response.json();',
        'typescript'
      ),
      transfer: typing(
        'Changed source: type the equivalent declaration.',
        'const config: unknown = JSON.parse(source);',
        'typescript'
      ),
      explanation:
        'Both cases force an explicit unknown boundary before domain validation; the source mechanism changes while the contract remains.',
      hints: [
        'The annotation follows the variable name.',
        'The boundary type is unknown.',
        'The first expression awaits response.json().',
      ],
    },
    {
      id: 'speed-sql-null',
      mode: 'syntax-speed',
      title: 'Type a SQL Absence Predicate',
      scenario: 'Select jobs that have not been deleted.',
      competency: 'Accurately use IS NULL rather than equality with NULL.',
      primary: typing('Type the predicate exactly.', 'WHERE deleted_at IS NULL', 'sql'),
      transfer: typing(
        'Changed field: type the present-value predicate.',
        'WHERE completed_at IS NOT NULL',
        'sql'
      ),
      explanation:
        'SQL absence uses IS NULL and IS NOT NULL because ordinary equality produces unknown under three-valued logic.',
      hints: ['Start with WHERE.', 'Use IS, not equals.', 'The changed case adds NOT.'],
    },
    {
      id: 'speed-go-error',
      mode: 'syntax-speed',
      title: 'Type an Early Go Error Return',
      scenario: 'Stop work immediately when a dependency returns an error.',
      competency: 'Accurately produce the conventional Go error guard.',
      primary: typing('Type the guard exactly.', 'if err != nil { return err }', 'go'),
      transfer: typing(
        'Changed return shape: type the equivalent guard.',
        'if err != nil { return nil, err }',
        'go'
      ),
      explanation:
        'The transfer case changes the function return arity while preserving the error-first control-flow invariant.',
      hints: ['Compare err with nil.', 'Use !=.', 'The changed case returns nil before err.'],
    },
  ],
};

function normalizeTyped(value: string): string {
  return value.replace(/\r\n/g, '\n').trimEnd();
}

export function initialArcadeResponse(task: ArcadeTask): ArcadeResponse {
  return task.kind === 'order' ? [...task.initialOrder] : '';
}

export function gradeArcadeTask(task: ArcadeTask, response: ArcadeResponse): boolean {
  if (task.kind === 'choice') return response === task.correctOptionId;
  if (task.kind === 'typing') {
    return typeof response === 'string' && normalizeTyped(response) === task.target;
  }
  return (
    Array.isArray(response) &&
    response.length === task.correctOrder.length &&
    response.every((itemId, index) => itemId === task.correctOrder[index])
  );
}

export function practicePoints(attempts: number, hintsUsed: number): number {
  return Math.max(5, 25 - Math.max(0, attempts - 1) * 3 - hintsUsed * 4);
}
