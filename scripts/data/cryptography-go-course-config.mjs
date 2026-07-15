import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-15T01:30:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception)
    throw new Error(`Missing misconception for Cryptography in Go competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function cryptoModule(id, title, context, artifact, skills) {
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict the asset, adversary, security property, trust boundary, and falsifying evidence before opening the governing standard.`,
      workshop: `A product-security pair incrementally builds ${artifact}, changes one attacker-controlled input, and keeps earlier Go, accessibility, secret-lifecycle, testing, and evidence invariants active.`,
      debug: `An incident packet contains a plausible ${artifact} with one primitive, parameter, nonce, context, key, parser, trust, timing, migration, or recovery defect; preserve the symptom and isolate first cause before repair.`,
      lab: `An independent team receives different assets, adversaries, data sizes, cryptoperiods, interoperability duties, availability limits, and compliance claims and transfers ${title.toLowerCase()} into a new ${artifact}.`,
      review: `A delayed security review reconstructs ${title.toLowerCase()} from threat, algorithm, parameter, implementation, key-custody, failure, test-vector, operations, and stakeholder evidence, then challenges one retained misconception.`,
      quiz: `A release board compares near-miss decisions for ${title.toLowerCase()} and accepts only bounded behavior, causal changed-case evidence, and an explicit native, entropy, interoperability, side-channel, compliance, or production transfer gate.`,
    },
  };
}

const modules = [
  cryptoModule(
    'crypto-go-outcomes-threat-evidence',
    'Security Outcomes, Threat Models, and Evidence',
    'A medical records product says data is encrypted but cannot name the protected asset, attacker capability, required property, trust boundary, or evidence that would falsify the claim.',
    'cryptographic outcome and evidence map',
    [
      outcome(
        'crypto-go-security-properties',
        'Define confidentiality, integrity, authenticity, freshness, forward secrecy, availability, privacy, and accountability as separate observable outcomes.',
        'Encryption automatically supplies every security property.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-asset-adversary-model',
        'Model assets, actors, capabilities, entry points, trust boundaries, abuse cases, and acceptable residual risk before choosing a primitive.',
        'Selecting AES first is an adequate threat model.',
        'strategic',
        'create'
      ),
      outcome(
        'crypto-go-claim-evidence-ladder',
        'Separate mathematical primitive claims, API behavior, implementation evidence, deployment controls, compliance status, and stakeholder outcomes.',
        'A passing encrypt-decrypt round trip proves production security.',
        'metacognitive',
        'evaluate'
      ),
      outcome(
        'crypto-go-kerckhoffs-library',
        'Apply Kerckhoffs principle and choose reviewed standard-library or maintained cryptographic APIs instead of secret algorithms.',
        'An unpublished algorithm is secure because attackers cannot inspect it.',
        'professional',
        'evaluate'
      ),
      outcome(
        'crypto-go-ethical-legal-boundary',
        'Bound cryptographic testing by authorization, data minimization, export, privacy, disclosure, and incident duties.',
        'A security learning objective authorizes testing any reachable system.',
        'professional',
        'create'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-primitives-encoding',
    'Bytes, Encodings, and Cryptographic Primitive Selection',
    'An API team base64-encodes tokens, labels the result encrypted, hashes secrets for transport, and compares text representations without defining canonical bytes.',
    'byte representation and primitive decision table',
    [
      outcome(
        'crypto-go-bytes-text-boundary',
        'Trace strings, UTF-8, bytes, hexadecimal, base64, binary fields, lengths, and canonical encodings without changing their security meaning.',
        'Encoding bytes makes them confidential.'
      ),
      outcome(
        'crypto-go-transform-distinction',
        'Distinguish encoding, checksums, hashing, MACs, signatures, encryption, key agreement, KEMs, and password hashing by purpose and reversibility.',
        'Hashing, encryption, and encoding are interchangeable transforms.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-primitive-composition',
        'Choose a vetted high-level construction that supplies the required combined properties instead of composing low-level primitives casually.',
        'Combining individually secure primitives always produces a secure protocol.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'crypto-go-domain-separation',
        'Assign unambiguous labels, contexts, versions, roles, and byte encodings so one cryptographic use cannot be replayed as another.',
        'Reusing one digest or key across unrelated purposes is harmless when lengths match.'
      ),
      outcome(
        'crypto-go-format-canonicalization',
        'Define injective length-delimited serialization and reject ambiguous or non-canonical inputs before signing or authenticating.',
        'Concatenating fields without boundaries produces one unique signed message.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-randomness-nonces',
    'Cryptographic Randomness, Entropy, Keys, Salts, and Nonces',
    'A service seeds math/rand with time, generates keys and reset tokens from it, retries by reusing a nonce, and cannot prove fork or startup entropy behavior.',
    'randomness and uniqueness contract',
    [
      outcome(
        'crypto-go-csprng-source',
        'Use current Go cryptographic randomness APIs for keys, tokens, salts, nonces, and blinding while handling failure according to the API contract.',
        'math/rand becomes cryptographically secure when seeded frequently.'
      ),
      outcome(
        'crypto-go-entropy-vs-randomness',
        'Distinguish entropy sources, deterministic random bit generators, unpredictability, uniqueness, bias, and statistical appearance.',
        'A sequence that looks random is necessarily unpredictable.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-key-generation-strength',
        'Generate algorithm-compatible keys at supported strengths and retain provenance, purpose, owner, and creation evidence.',
        'Any random byte string is a valid key for every algorithm.'
      ),
      outcome(
        'crypto-go-nonce-uniqueness',
        'Enforce construction-specific nonce uniqueness or misuse limits across concurrency, restart, rollback, and replication.',
        'A nonce must always be secret but may repeat.'
      ),
      outcome(
        'crypto-go-salt-token-boundary',
        'Separate public unique salts, unpredictable bearer tokens, nonces, IVs, seeds, and secret keys by their exact guarantees.',
        'Salt, nonce, IV, token, seed, and key are synonyms.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-secret-bytes-lifecycle',
    'Secret Bytes, Constant-Time Decisions, and Memory Lifecycle',
    'A Go service converts secrets to immutable strings, logs parse failures with raw material, compares tags with ordinary equality, and promises memory erasure the runtime cannot prove.',
    'secret custody and comparison protocol',
    [
      outcome(
        'crypto-go-secret-custody',
        'Trace secret creation, copies, aliases, use, retention, rotation, destruction limits, logs, crashes, backups, and ownership across Go boundaries.',
        'Calling clear on one slice proves every secret copy is erased.'
      ),
      outcome(
        'crypto-go-secret-string-copy',
        'Minimize conversions and copies of secret-bearing strings and byte slices while documenting unavoidable runtime limits.',
        'Strings are preferable secret containers because they are immutable.'
      ),
      outcome(
        'crypto-go-constant-time-compare',
        'Use constant-time comparison APIs for fixed-length secret-dependent values and reject length or parse errors without secret-dependent detail.',
        'Ordinary byte equality is safe for MACs because network noise hides timing.'
      ),
      outcome(
        'crypto-go-side-channel-scope',
        'Identify timing, cache, branch, allocation, power, fault, error, and length channels and state which are or are not tested.',
        'Using a constant-time compare makes the whole application constant time.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-redaction-observability',
        'Design useful logs, metrics, traces, dumps, and incident artifacts that never expose keys, plaintext, password material, tokens, or high-cardinality identities.',
        'Base64 or hashing a secret always makes it safe to log.',
        'professional',
        'create'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-classical-cryptanalysis',
    'Classical Ciphers and Cryptanalysis as Defect Labs',
    'A training tool presents Caesar, substitution, repeating-key XOR, and one-time pads as equivalent encryption choices and accidentally ships the toy implementation.',
    'classical cipher attack and migration dossier',
    [
      outcome(
        'crypto-go-caesar-frequency-break',
        'Implement and break a bounded shift or substitution cipher to connect keyspace, language redundancy, frequency evidence, and attacker cost.',
        'A large-looking text keyspace makes a classical cipher secure.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-xor-reuse-break',
        'Demonstrate how repeated XOR keystream use reveals relationships between plaintexts without presenting XOR alone as production encryption.',
        'XOR is secure whenever the key bytes are hidden.'
      ),
      outcome(
        'crypto-go-one-time-pad-conditions',
        'Explain one-time-pad key length, uniformity, secrecy, single use, distribution, and destruction requirements and their operational cost.',
        'A short password repeated across a message is a one-time pad.',
        'conceptual',
        'evaluate'
      ),
      outcome(
        'crypto-go-bruteforce-cost-model',
        'Model offline and online search by keyspace, guess rate, parallelism, detection, lockout, value, and uncertainty without attacking unauthorized targets.',
        'Brute force feasibility is determined by key length alone.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'crypto-go-legacy-migration-boundary',
        'Quarantine toy and obsolete algorithms behind fixtures, negative tests, decryption-only migration, telemetry, deadlines, and deletion criteria.',
        'Legacy cryptography can remain available indefinitely if marked deprecated.',
        'professional',
        'create'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-aes-block-ciphers',
    'AES, Block Ciphers, and Primitive Boundaries',
    'A developer calls AES.Encrypt directly on repeated application records, invents padding, and assumes a strong block cipher alone protects a message.',
    'AES primitive boundary and known-answer harness',
    [
      outcome(
        'crypto-go-aes-key-block-size',
        'Apply AES key-size and fixed block-size contracts without confusing key, block, message, and security strength.',
        'AES-256 uses a 256-byte block and is always twice as secure as AES-128.',
        'conceptual',
        'apply'
      ),
      outcome(
        'crypto-go-block-permutation',
        'Explain block-cipher keyed permutation behavior and why messages require an approved mode or higher-level construction.',
        'Encrypting each block independently preserves message confidentiality.'
      ),
      outcome(
        'crypto-go-aes-api-bounds',
        'Validate key and block lengths before using low-level AES APIs and convert panics or errors into bounded caller behavior.',
        'The AES API safely truncates keys and partial blocks.'
      ),
      outcome(
        'crypto-go-known-answer-test',
        'Use authoritative known-answer vectors to verify byte order, exact inputs, exact outputs, and implementation wiring without treating vectors as a security proof.',
        'An encrypt-decrypt round trip detects every incorrect AES implementation.'
      ),
      outcome(
        'crypto-go-hardware-fips-boundary',
        'Distinguish algorithm approval, implementation selection, hardware acceleration, side-channel assumptions, and Go FIPS module status.',
        'Using AES automatically means the application is FIPS compliant.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-modes-padding',
    'Modes, Padding, Malleability, and Legacy Decryption',
    'A database encrypts records with ECB, a migration endpoint exposes CBC padding failures, and a CTR counter can repeat after restoring a snapshot.',
    'mode failure laboratory and migration adapter',
    [
      outcome(
        'crypto-go-ecb-pattern-leak',
        'Demonstrate deterministic block-pattern leakage and prohibit ECB for application messages.',
        'ECB is acceptable when plaintext blocks are not human-readable.'
      ),
      outcome(
        'crypto-go-cbc-padding-oracle',
        'Trace CBC chaining, IV requirements, padding validation, malleability, and oracle behavior as a legacy risk.',
        'A random CBC IV supplies authenticity and prevents padding oracles.'
      ),
      outcome(
        'crypto-go-ctr-counter-reuse',
        'Trace CTR keystream generation and prove that key-counter reuse destroys confidentiality and enables malleation.',
        'CTR can reuse a counter when plaintext lengths differ.'
      ),
      outcome(
        'crypto-go-encrypt-then-mac',
        'For unavoidable legacy modes, authenticate versioned context and ciphertext before decryption with independent keys and uniform failures.',
        'MAC-then-encrypt and encrypt-then-MAC are interchangeable compositions.'
      ),
      outcome(
        'crypto-go-legacy-decrypt-only',
        'Build a bounded decrypt-only adapter that authenticates format, suppresses oracles, records migration, and never emits new legacy ciphertext.',
        'Supporting legacy decryption requires keeping legacy encryption enabled.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-aead-aes-gcm',
    'Authenticated Encryption with AES-GCM',
    'A multi-tenant service reuses GCM nonces after restart, omits tenant and version context from additional data, and releases plaintext before authentication succeeds.',
    'versioned AES-GCM record envelope',
    [
      outcome(
        'crypto-go-aead-contract',
        'Use AEAD Seal and Open as atomic confidentiality-and-integrity operations and release plaintext only after successful authentication.',
        'AEAD decryption may stream unauthenticated plaintext safely if errors are checked later.'
      ),
      outcome(
        'crypto-go-gcm-nonce-system',
        'Design a crash-, concurrency-, rollback-, and replication-safe GCM nonce strategy within the construction limits.',
        'Random GCM nonces can be generated forever without collision analysis.'
      ),
      outcome(
        'crypto-go-aad-binding',
        'Bind protocol version, tenant, object identity, algorithm suite, direction, and other non-secret context as canonical associated data.',
        'Associated data is encrypted and therefore suitable for secret metadata.'
      ),
      outcome(
        'crypto-go-gcm-record-format',
        'Define magic, version, suite, key ID, nonce, ciphertext, tag, lengths, and parsing limits before calling Open.',
        'Because GCM authenticates ciphertext, the outer record parser needs no bounds.'
      ),
      outcome(
        'crypto-go-gcm-failure-uniformity',
        'Collapse attacker-visible authentication failures while retaining safe internal classification and metrics.',
        'Detailed tag, key, nonce, and padding errors help clients recover securely.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-chacha-poly1305',
    'ChaCha20-Poly1305 and Algorithm Choice',
    'A mobile product chooses an AEAD from benchmark folklore, mixes XChaCha and IETF nonce formats, and assumes changing algorithms repairs nonce reuse.',
    'portable AEAD selection and compatibility matrix',
    [
      outcome(
        'crypto-go-chacha-aead-contract',
        'Use ChaCha20-Poly1305 through its AEAD contract with correct key, nonce, tag, additional-data, and failure handling.',
        'ChaCha20 alone supplies message authenticity.'
      ),
      outcome(
        'crypto-go-xchacha-nonce',
        'Distinguish standard and XChaCha nonce sizes, interoperability, random-nonce design, and protocol compatibility.',
        'XChaCha ciphertext can be opened by any ChaCha20-Poly1305 implementation.'
      ),
      outcome(
        'crypto-go-aead-selection',
        'Choose AES-GCM or ChaCha20-Poly1305 from platform acceleration, protocol requirements, misuse risk, compliance, interoperability, and measured performance.',
        'One AEAD is universally faster and more secure on every platform.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'crypto-go-algorithm-agility-envelope',
        'Represent algorithm suite and parameters in an authenticated allow-listed envelope without negotiation downgrade.',
        'An unauthenticated algorithm identifier safely enables agility.'
      ),
      outcome(
        'crypto-go-aead-cross-implementation',
        'Verify authoritative vectors and cross-implementation fixtures for exact nonce, AAD, ciphertext, tag, and rejection behavior.',
        'Local round trips prove interoperability.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-hashes-sha3',
    'Cryptographic Hashes, SHA-2, SHA-3, and Commitment Boundaries',
    'A download service calls SHA-256 encryption, truncates digests without analysis, uses MD5 for adversarial integrity, and hashes ambiguous JSON.',
    'hash-purpose and digest verification contract',
    [
      outcome(
        'crypto-go-hash-properties',
        'Distinguish preimage, second-preimage, collision, length, domain, and security-strength properties required by a use case.',
        'A hash is either secure or insecure without regard to its use.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-sha2-sha3-selection',
        'Select supported SHA-2 or SHA-3 functions and output lengths from protocol, interoperability, performance, compliance, and security needs.',
        'SHA-3 simply replaces SHA-2 in every existing protocol.'
      ),
      outcome(
        'crypto-go-streaming-hash',
        'Hash bounded streams incrementally, propagate read errors, freeze canonical byte identity, and compare expected digests safely.',
        'io.Copy into a hash proves the source bytes were complete and trusted.'
      ),
      outcome(
        'crypto-go-weak-hash-migration',
        'Confine MD5 and SHA-1 to explicitly non-adversarial compatibility or migration checks and reject security claims based on them.',
        'A collision-broken hash remains safe for signatures if the input is long.'
      ),
      outcome(
        'crypto-go-hash-not-authentication',
        'Require an authenticated trusted expected digest or MAC/signature when attackers can modify both data and digest.',
        'Publishing a checksum next to a file proves the file is authentic.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-mac-hmac',
    'Message Authentication Codes and HMAC',
    'A webhook signs concatenated fields with raw SHA-256, reuses an encryption key, compares hex strings, and accepts the same request repeatedly.',
    'replay-resistant HMAC request authenticator',
    [
      outcome(
        'crypto-go-mac-authenticity',
        'Use a MAC to provide symmetric origin authentication and integrity while stating its lack of public verifiability and non-repudiation.',
        'A MAC is a digital signature that anyone can verify.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-hmac-api',
        'Compute and verify HMAC with a supported hash, sufficient independent key, canonical message, and constant-time tag comparison.',
        'Hashing key concatenated with message is equivalent to HMAC.'
      ),
      outcome(
        'crypto-go-mac-key-separation',
        'Derive or provision separate purpose- and direction-specific MAC keys and bind the use context.',
        'The same symmetric key should encrypt and authenticate to simplify rotation.'
      ),
      outcome(
        'crypto-go-webhook-canonicalization',
        'Define exact method, target, selected headers, body bytes, timestamp, key ID, and version canonicalization before MAC verification.',
        'Re-serializing parsed JSON preserves a sender MAC.'
      ),
      outcome(
        'crypto-go-replay-window',
        'Enforce bounded freshness and one-time request identity after authenticating the request, with durable duplicate handling.',
        'A valid MAC makes replayed requests harmless.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-kdf-hkdf',
    'Key Derivation, HKDF, and Key Separation',
    'A protocol slices one shared secret into keys, uses user passwords as HKDF input, omits transcript context, and changes output length without versioning.',
    'labeled key schedule and derivation tree',
    [
      outcome(
        'crypto-go-kdf-purpose',
        'Distinguish extraction, expansion, password stretching, entropy concentration limits, and deterministic key schedules.',
        'A KDF creates new entropy from weak input.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-hkdf-extract-expand',
        'Apply HKDF extract and expand with supported hashes, salt, labeled info, bounded output, and one-way key schedule ownership.',
        'HKDF salt and info are secret passwords.'
      ),
      outcome(
        'crypto-go-key-separation-tree',
        'Derive independent role, direction, epoch, algorithm, and purpose keys from a versioned hierarchy without key cycles.',
        'Taking adjacent bytes from one secret gives permanent domain separation.'
      ),
      outcome(
        'crypto-go-transcript-binding',
        'Bind negotiated identities, algorithms, public values, roles, and transcript hashes into derivation context.',
        'A shared secret alone authenticates who participated and what was negotiated.'
      ),
      outcome(
        'crypto-go-kdf-version-migration',
        'Version derivation labels and parameters, preserve old read paths, prevent downgrade, and prove rotation rollback.',
        'Changing HKDF labels is compatible because key length stays the same.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-password-hashing',
    'Password Hashing, Verification, and Upgrade',
    'An account service stores unsalted SHA-256 passwords, benchmarks only the happy path, leaks user existence through timing, and cannot upgrade work factors.',
    'versioned password credential verifier',
    [
      outcome(
        'crypto-go-password-hash-not-encrypt',
        'Store password verifiers with a slow password-hashing construction rather than plaintext, reversible encryption, or fast general hashes.',
        'Passwords should be encrypted so users can recover them.'
      ),
      outcome(
        'crypto-go-argon2id-parameters',
        'Select and encode Argon2id memory, time, parallelism, salt, and output parameters from current guidance and measured service budgets.',
        'The largest possible Argon2 memory setting is always the safest production choice.'
      ),
      outcome(
        'crypto-go-scrypt-pbkdf2-fallback',
        'Choose scrypt or PBKDF2 only from explicit availability and compliance constraints with current calibrated parameters.',
        'All password KDF parameter numbers measure the same work.'
      ),
      outcome(
        'crypto-go-password-record-parser',
        'Parse an allow-listed versioned verifier record with strict lengths, integer bounds, base64 rules, and resource admission before deriving.',
        'An authenticated database makes password hash records safe to parse without limits.'
      ),
      outcome(
        'crypto-go-password-upgrade-pepper',
        'Perform successful-login rehash, legacy migration, pepper custody and rotation, dummy verification, rate limits, and account recovery without weakening enumeration defenses.',
        'A pepper can be rotated transparently without user passwords or resets.',
        'professional',
        'create'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-modular-arithmetic',
    'Modular Arithmetic and Public-Key Reasoning',
    'An implementation team manipulates big integers without normalizing signs, confuses modular inverse with division, and mistakes a worked toy example for secure key generation.',
    'bounded modular arithmetic reasoning notebook',
    [
      outcome(
        'crypto-go-modular-congruence',
        'Compute and explain modular equivalence, reduction, addition, multiplication, exponentiation, and negative representatives.',
        'Modulo is ordinary remainder with identical behavior for negative inputs in every language.'
      ),
      outcome(
        'crypto-go-gcd-inverse',
        'Use Euclid and extended Euclid to determine coprimality and modular inverses and identify non-invertible cases.',
        'Every nonzero value has an inverse modulo any modulus.'
      ),
      outcome(
        'crypto-go-fast-exponentiation',
        'Trace square-and-multiply cost and state why secret exponent code must use vetted constant-time implementations.',
        'A mathematically correct big.Int exponentiation is automatically side-channel safe.'
      ),
      outcome(
        'crypto-go-prime-group-boundary',
        'Explain primes, groups, orders, generators, finite fields, and subgroup validation at the level needed to use approved APIs safely.',
        'Any large prime and any point create a secure public-key group.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-toy-math-separation',
        'Keep small-number demonstrations outside production code and name the parameter, randomness, validation, and side-channel evidence they omit.',
        'A toy RSA example is production-ready after increasing the integer values.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-rsa-oaep-pss',
    'RSA Encryption, Signatures, and Safe Migration',
    'A service encrypts large payloads directly with textbook RSA, verifies PKCS#1 v1.5 signatures by default, and accepts any PEM key without purpose or size validation.',
    'RSA-OAEP and RSA-PSS boundary adapter',
    [
      outcome(
        'crypto-go-rsa-key-validation',
        'Generate or parse supported RSA keys with minimum strength, valid public exponent, purpose, provenance, and bounded encodings.',
        'Any PEM block labeled RSA is a valid encryption and signing key.'
      ),
      outcome(
        'crypto-go-rsa-oaep',
        'Use RSA-OAEP only for bounded key material with matching hash and label context and uniform decryption failure.',
        'RSA-OAEP is suitable for encrypting arbitrary files directly.'
      ),
      outcome(
        'crypto-go-rsa-pss',
        'Hash exact canonical bytes and use RSA-PSS with explicit hash and salt policy for new RSA signatures.',
        'RSA encryption and RSA signing are the same operation with reversed keys.'
      ),
      outcome(
        'crypto-go-rsa-padding-oracles',
        'Recognize textbook RSA and PKCS#1 v1.5 encryption oracle risks and isolate unavoidable legacy interoperability.',
        'Keeping decryption errors generic fully repairs every RSA padding oracle.'
      ),
      outcome(
        'crypto-go-rsa-agility-migration',
        'Inventory RSA uses, migrate by purpose to modern approved alternatives, retain verified old-read windows, and remove obsolete private keys.',
        'Increasing an RSA modulus solves every long-term cryptographic migration need.',
        'strategic',
        'create'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-ecdh-x25519',
    'ECDH, X25519, and Authenticated Key Agreement',
    'A device protocol treats ECDH output as an encryption key, never authenticates peer keys, accepts malformed encodings, and reuses ephemeral keys indefinitely.',
    'authenticated X25519 key-agreement transcript',
    [
      outcome(
        'crypto-go-ecdh-contract',
        'Use supported ECDH curves through Go interfaces with private/public key separation, strict parsing, and shared-secret error handling.',
        'ECDH encrypts messages by itself.'
      ),
      outcome(
        'crypto-go-x25519-choice',
        'Select X25519 or approved NIST curves from protocol, hardware, compliance, interoperability, and implementation constraints.',
        'All elliptic curves and encodings are interchangeable.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'crypto-go-shared-secret-kdf',
        'Feed the ECDH result and full context into a labeled KDF rather than using raw shared bytes directly.',
        'ECDH output is already a uniformly formatted application key.'
      ),
      outcome(
        'crypto-go-peer-authentication',
        'Authenticate peer identities and ephemeral public keys with signatures, certificates, PSKs, or an established trust channel.',
        'Successful ECDH proves the identity of the peer.'
      ),
      outcome(
        'crypto-go-forward-secrecy-ephemeral',
        'Rotate and erase ephemeral private keys, prevent reuse, bind roles, and state when compromise does or does not expose prior sessions.',
        'Using elliptic curves automatically supplies forward secrecy.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-ed25519-ecdsa',
    'Digital Signatures with Ed25519 and ECDSA',
    'A package signs human-readable JSON, accepts keys from the message being verified, ignores signature context, and reports that signatures prove truth and non-repudiation.',
    'versioned signed artifact verifier',
    [
      outcome(
        'crypto-go-signature-guarantees',
        'State exactly what a valid signature proves about bytes, key control, and context—and what it does not prove about truth, time, authorization, or intent.',
        'A valid signature proves that the signed statement is true and legally non-repudiable.',
        'conceptual',
        'evaluate'
      ),
      outcome(
        'crypto-go-ed25519-api',
        'Generate, parse, sign, and verify Ed25519 keys and signatures with exact message/context rules and trusted key selection.',
        'The public key embedded beside a signature establishes its own trust.'
      ),
      outcome(
        'crypto-go-ecdsa-api',
        'Use ECDSA through current Go APIs with approved curves, supported hashes, canonical encodings, and no custom nonce generation.',
        'ECDSA signatures are deterministic and byte-identical by definition.'
      ),
      outcome(
        'crypto-go-signature-context-canonical',
        'Bind artifact type, version, role, tenant, key ID, expiry, and canonical bytes to prevent cross-protocol signature reuse.',
        'Signing a display string safely authenticates every structured interpretation.'
      ),
      outcome(
        'crypto-go-signature-policy',
        'Apply threshold, authorization, revocation, expiry, transparency, and audit policy after cryptographic verification.',
        'Cryptographic verification is the final authorization decision.',
        'professional',
        'create'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-hpke-envelope',
    'HPKE, Hybrid Encryption, and Envelope Systems',
    'A sharing service encrypts one payload separately for every recipient, stores long-lived data keys in metadata, and invents a hybrid construction without binding recipient or suite context.',
    'multi-recipient envelope encryption format',
    [
      outcome(
        'crypto-go-hybrid-encryption',
        'Combine public-key key establishment with symmetric AEAD for bounded scalable payload encryption and explicit recipient identity.',
        'Public-key encryption should process the entire large payload directly.'
      ),
      outcome(
        'crypto-go-hpke-contract',
        'Use Go HPKE suites and modes with exact KEM, KDF, AEAD, info, associated data, key encoding, and one-shot or context lifecycle.',
        'HPKE authenticates sender identity in every mode automatically.'
      ),
      outcome(
        'crypto-go-envelope-dek-kek',
        'Generate per-object data keys, wrap them under recipient or key-encryption keys, authenticate metadata, and separate data from key custody.',
        'Encrypting a DEK means its wrapping key may be stored beside it without concern.'
      ),
      outcome(
        'crypto-go-multi-recipient-binding',
        'Bind each recipient, wrapped key, suite, object version, and payload digest so entries cannot be swapped or replayed.',
        'All recipients may safely share one unauthenticated wrapped-key list.'
      ),
      outcome(
        'crypto-go-rewrap-without-reencrypt',
        'Rotate recipient or KEK protection by authenticated rewrapping while preserving payload identity, audit, rollback, and revocation limits.',
        'Rewrapping a data key revokes every old copy of that key.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-key-management',
    'Key Management, Rotation, HSMs, KMS, and Compromise',
    'A platform stores a master key in source control, rotates aliases without proving old reads, grants every service decrypt authority, and has no compromise recovery drill.',
    'key lifecycle, custody, and rotation runbook',
    [
      outcome(
        'crypto-go-key-lifecycle',
        'Define generation, registration, activation, distribution, use, suspension, rotation, archival, recovery, revocation, destruction, and evidence ownership.',
        'Key management begins and ends with generating random bytes.',
        'professional',
        'create'
      ),
      outcome(
        'crypto-go-key-id-version-alias',
        'Separate immutable key version, stable logical key ID, mutable alias, algorithm, purpose, state, and cryptoperiod.',
        'A key alias is immutable evidence of which key protected data.'
      ),
      outcome(
        'crypto-go-least-privilege-custody',
        'Grant narrow sign, verify, encrypt, decrypt, wrap, unwrap, derive, rotate, export, and administer capabilities across separate identities.',
        'A service that can encrypt must also be allowed to decrypt and export keys.'
      ),
      outcome(
        'crypto-go-hsm-kms-boundary',
        'Design an interface for non-exportable HSM or KMS operations and state what attestation, latency, quota, availability, and audit evidence remains external.',
        'Using a cloud KMS proves keys can never be exposed.'
      ),
      outcome(
        'crypto-go-key-compromise-recovery',
        'Inventory affected uses, contain authority, rotate or revoke, rewrap or re-encrypt, restore service, notify stakeholders, and prove old-key handling.',
        'Deleting the suspected key immediately is always the safest first response.',
        'strategic',
        'create'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-x509-pki',
    'X.509, PKI, Trust Stores, and Certificate Validation',
    'An internal client accepts any certificate signed by a familiar CA, skips hostname checks, ignores key usage and time, and assumes revocation always works online.',
    'certificate path validation and issuance profile',
    [
      outcome(
        'crypto-go-x509-structure',
        'Parse certificates, names, SANs, key usages, extensions, serials, validity, signatures, and chains without treating parsed data as trusted.',
        'A certificate that parses successfully is valid for every purpose.'
      ),
      outcome(
        'crypto-go-path-validation',
        'Build and verify a path to an explicit trust anchor with DNS name, time, basic constraints, key usage, policy, and algorithm checks.',
        'Verifying a certificate signature alone verifies the full chain and hostname.'
      ),
      outcome(
        'crypto-go-trust-store-scope',
        'Separate system, application, private, tenant, and test roots and prevent accidental trust expansion.',
        'Adding a root for one service safely trusts it for every application.'
      ),
      outcome(
        'crypto-go-revocation-limits',
        'Model short lifetimes, OCSP, CRLs, stapling, soft-fail or hard-fail policy, caching, privacy, and offline behavior.',
        'Revocation guarantees immediate rejection of every compromised certificate.'
      ),
      outcome(
        'crypto-go-certificate-issuance',
        'Issue bounded leaf certificates with unique serials, correct SANs, usages, profiles, audit, renewal, and protected CA keys.',
        'Copying one certificate template is sufficient for servers, clients, and CAs.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-tls13',
    'TLS 1.3 Configuration and Secure Channels in Go',
    'A Go service disables verification to fix staging, pins one leaf certificate forever, exposes secrets in key logs, and claims a successful handshake authenticates application users.',
    'TLS 1.3 client/server security profile',
    [
      outcome(
        'crypto-go-tls-security-properties',
        'Trace TLS negotiation, key exchange, certificate or PSK authentication, transcript binding, record protection, resumption, and closure.',
        'TLS only encrypts bytes and has no integrity or peer-authentication role.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-tls-config-safe',
        'Configure current Go TLS defaults, minimum versions, certificates, roots, names, ALPN, timeouts, and safe verification hooks without insecure skip shortcuts.',
        'InsecureSkipVerify is acceptable when a custom hostname check happens later.'
      ),
      outcome(
        'crypto-go-tls-resumption-early-data',
        'Model tickets, PSKs, rotation, replay, forward secrecy, and application idempotency before enabling resumption or early data.',
        'TLS 1.3 early data has the same replay protection as ordinary application data.'
      ),
      outcome(
        'crypto-go-tls-post-quantum-hybrid',
        'Understand Go 1.26 hybrid post-quantum key-exchange defaults, compatibility controls, size/latency effects, downgrade evidence, and rollout.',
        'A hybrid TLS key exchange makes certificates and all application data quantum-safe forever.'
      ),
      outcome(
        'crypto-go-tls-live-evidence',
        'Verify handshakes, chains, names, protocol, cipher, exporter, failure, rotation, resumption, and load in controlled environments.',
        'A unit test over net.Pipe proves public-network TLS deployment behavior.'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-protocol-design',
    'Secure Protocols, State Machines, Replay, and Downgrade',
    'A device pairing protocol encrypts messages but has no explicit roles, transcript, sequence numbers, version negotiation, terminal states, or duplicate policy.',
    'authenticated protocol state machine',
    [
      outcome(
        'crypto-go-protocol-goals-roles',
        'Define initiator, responder, identities, trust assumptions, authentication goals, secrecy goals, compromise model, and terminal states.',
        'Choosing strong primitives makes an informal message flow secure.',
        'strategic',
        'create'
      ),
      outcome(
        'crypto-go-transcript-state-machine',
        'Bind ordered message type, role, version, suite, identities, ephemeral values, session ID, sequence, and prior transcript into each state transition.',
        'Encrypting each message prevents reordering and cross-session replay.'
      ),
      outcome(
        'crypto-go-replay-duplicate-policy',
        'Use nonces, counters, windows, durable identities, expiry, and idempotent effects according to channel and availability constraints.',
        'Timestamps alone prevent replay in distributed systems.'
      ),
      outcome(
        'crypto-go-downgrade-negotiation',
        'Authenticate offered and selected versions, algorithms, parameters, and features and fail closed on unsupported or stripped choices.',
        'Allowing both modern and legacy suites cannot weaken modern peers.'
      ),
      outcome(
        'crypto-go-protocol-analysis-transfer',
        'Use attack trees, state exploration, test vectors, interop peers, and formal tools as distinct evidence with explicit model limitations.',
        'One protocol diagram and code review prove resistance to active attackers.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-file-stream-formats',
    'Encrypted Files, Streams, Chunks, and Format Evolution',
    'A backup tool encrypts an unbounded stream under one nonce, writes unauthenticated headers, exposes partial plaintext, and cannot distinguish truncation from a clean end.',
    'seekable authenticated backup container',
    [
      outcome(
        'crypto-go-file-envelope-format',
        'Define a bounded versioned file envelope with magic, suite, key reference, KDF parameters, nonce base, chunk policy, metadata, and authenticated lengths.',
        'AEAD makes every surrounding file-format field trustworthy automatically.'
      ),
      outcome(
        'crypto-go-chunk-nonce-derivation',
        'Derive unique per-chunk nonces and associated data from immutable file identity, epoch, chunk index, length, and final marker.',
        'Incrementing a nonce is safe without bounding chunk count or restart behavior.'
      ),
      outcome(
        'crypto-go-truncation-reorder-defense',
        'Authenticate chunk position, total or final state, and file identity to reject deletion, duplication, insertion, reordering, and splicing.',
        'Valid independent chunk tags prove the file is complete and ordered.'
      ),
      outcome(
        'crypto-go-stream-release-policy',
        'Buffer or stage plaintext until each chunk and required file-level commitments authenticate, then clean partial outputs on failure.',
        'Streaming decryption may publish every plaintext byte before its tag is checked.'
      ),
      outcome(
        'crypto-go-format-migration-recovery',
        'Support versioned read, controlled rewrite, interrupted migration recovery, key loss behavior, corrupt-media diagnostics, and deletion evidence.',
        'An encrypted backup is recoverable because ciphertext exists in two places.',
        'professional',
        'create'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-post-quantum',
    'Post-Quantum Cryptography and Hybrid Migration',
    'A roadmap replaces every algorithm with one new primitive immediately, ignores harvest-now-decrypt-later exposure, and labels a pending module fully compliant.',
    'post-quantum inventory and hybrid migration plan',
    [
      outcome(
        'crypto-go-quantum-threat-inventory',
        'Inventory long-lived confidentiality, authentication, signatures, roots, protocols, dependencies, data lifetime, and migration lead time.',
        'Quantum migration risk is determined only by when a large quantum computer arrives.',
        'strategic',
        'create'
      ),
      outcome(
        'crypto-go-mlkem',
        'Use Go ML-KEM interfaces for key encapsulation with strict key/ciphertext parsing, shared-key custody, failure handling, and hybrid context.',
        'ML-KEM encrypts arbitrary application messages directly.'
      ),
      outcome(
        'crypto-go-mldsa',
        'Use Go ML-DSA parameter sets and context-aware signing with explicit key, signature-size, interoperability, and policy tradeoffs.',
        'ML-DSA signatures are drop-in byte-for-byte replacements for Ed25519.'
      ),
      outcome(
        'crypto-go-slhdsa-boundary',
        'Explain SLH-DSA standardization, conservative hash-based assumptions, size/performance tradeoffs, and implementation availability limits.',
        'Every NIST post-quantum signature has the same performance and deployment role.',
        'conceptual',
        'evaluate'
      ),
      outcome(
        'crypto-go-hybrid-pq-migration',
        'Design hybrid classical-plus-post-quantum rollout, transcript binding, downgrade defense, telemetry, compatibility, rollback, and cryptographic agility.',
        'A hybrid construction is secure if either secret is concatenated without a specified combiner.',
        'professional',
        'create'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-side-channels-misuse',
    'API Misuse, Oracles, Side Channels, and Defensive Boundaries',
    'A decryption API reports precise failure stages, accepts attacker-controlled work parameters, retries expensive operations, and exposes timing differences through caches and downstream calls.',
    'cryptographic misuse and oracle threat review',
    [
      outcome(
        'crypto-go-oracle-classification',
        'Identify padding, validity, format, key, user, replay, decompression, and timing oracles across direct and indirect observations.',
        'Returning HTTP 400 for all errors removes every oracle.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'crypto-go-resource-admission',
        'Bound lengths, counts, nesting, KDF work, signature sets, certificate paths, retries, concurrency, memory, CPU, and deadlines before expensive cryptography.',
        'Authenticated cryptographic inputs cannot be used for denial of service.'
      ),
      outcome(
        'crypto-go-error-taxonomy',
        'Keep useful internal typed causes and safe telemetry while exposing uniform bounded failures and terminal cleanup to untrusted callers.',
        'All cryptographic errors must be discarded, making operations impossible to diagnose.'
      ),
      outcome(
        'crypto-go-compression-encryption',
        'Analyze compression-before-encryption length leakage, attacker influence, secret proximity, padding limits, and protocol-specific mitigations.',
        'Encryption hides compressed message length.'
      ),
      outcome(
        'crypto-go-constant-time-transfer',
        'Move timing, cache, compiler, hardware, co-tenancy, and fault claims to controlled native measurement and specialist review.',
        'Browser timing of a Go interpreter proves production constant-time behavior.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-testing-vectors-fuzz',
    'Known-Answer Tests, Negative Vectors, Fuzzing, and Interoperability',
    'A library has only round-trip tests, generates random fixtures on every run, never mutates tags or headers, and calls 100 percent line coverage cryptographic assurance.',
    'layered cryptographic verification harness',
    [
      outcome(
        'crypto-go-authoritative-vectors',
        'Use authoritative known-answer and protocol vectors with provenance, exact bytes, expected successes, expected failures, and stable fixtures.',
        'Random local round trips are stronger than published vectors.'
      ),
      outcome(
        'crypto-go-negative-mutation-tests',
        'Mutate every authenticated field, key, nonce, tag, length, order, version, context, and boundary and require clean rejection without partial effects.',
        'Testing one wrong password sufficiently covers decryption failure.'
      ),
      outcome(
        'crypto-go-property-tests',
        'Define properties such as round-trip within valid domains, tamper rejection, parser totality, uniqueness invariants, and version separation without asserting false universal laws.',
        'Property tests can prove cryptographic hardness.'
      ),
      outcome(
        'crypto-go-fuzz-parsers-state',
        'Fuzz deterministic parsers and state machines with bounded resources, seed corpora, regression artifacts, no global secrets, and reproducible failures.',
        'Fuzzing a cryptographic primitive itself replaces protocol and parser tests.'
      ),
      outcome(
        'crypto-go-interoperability-matrix',
        'Cross-test supported Go versions, architectures, algorithms, parameter sets, external implementations, old data, malformed data, and rollout states.',
        'Passing on one Go version and architecture proves long-term compatibility.',
        'professional',
        'create'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-agility-compliance',
    'Cryptographic Agility, Dependencies, FIPS, and Policy Evidence',
    'A compliance document lists approved algorithms but not the executing module, configuration, boundary, certificate status, dependencies, exceptions, or operating procedures.',
    'algorithm inventory and compliance evidence packet',
    [
      outcome(
        'crypto-go-algorithm-inventory',
        'Maintain machine-readable use, purpose, owner, suite, key location, dependency, data lifetime, protocol, version, and migration state for cryptographic assets.',
        'A source search for AES finds the complete cryptographic inventory.',
        'professional',
        'create'
      ),
      outcome(
        'crypto-go-agility-without-downgrade',
        'Centralize policy and versioned suites, authenticate selection, reject unknowns, measure use, retain read compatibility, and remove obsolete write paths.',
        'Supporting many algorithms is the same as cryptographic agility.',
        'strategic',
        'create'
      ),
      outcome(
        'crypto-go-fips-module-status',
        'Distinguish approved algorithms, Go cryptographic module version, GOFIPS140 selection, enforcement, validation status, operating environment, and application boundary.',
        'Turning on a FIPS flag certifies the whole application.'
      ),
      outcome(
        'crypto-go-dependency-vulnerability',
        'Pin supported Go and x/crypto versions, review release and security notes, run govulncheck, verify reachable findings, and execute compatibility gates.',
        'Cryptographic dependencies should never be updated because changes create risk.'
      ),
      outcome(
        'crypto-go-policy-exception',
        'Record scoped exception owner, rationale, compensating controls, telemetry, expiry, migration work, approval, and verified closure.',
        'A documented exception may remain permanent if the legacy client is important.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cryptoModule(
    'crypto-go-operations-release',
    'Production Operations, Incidents, Recovery, and Release Defense',
    'A release rotates keys and formats in one irreversible deployment, has no old-data corpus or rollback, monitors only errors, and discovers restore failure during an incident.',
    'cryptographic production defense and recovery drill',
    [
      outcome(
        'crypto-go-observability-slos',
        'Define low-cardinality success, reject, latency, work-factor, key-version, algorithm, expiry, rotation, migration, dependency, and recovery signals without secret leakage.',
        'Cryptographic operations are either correct or failed, so service-level objectives add no value.',
        'professional',
        'create'
      ),
      outcome(
        'crypto-go-capacity-dependency-failure',
        'Load-test entropy, CPU, memory-hard KDFs, HSM/KMS quotas, certificate services, revocation, key caches, queues, and degraded modes with bounded admission.',
        'Crypto capacity scales linearly with ordinary request throughput.'
      ),
      outcome(
        'crypto-go-compatible-release',
        'Canary reader/writer, algorithm, key, format, certificate, and dependency changes with old/new matrices, dual-read boundaries, telemetry, and rollback.',
        'A successful new-format write proves old readers and rollback remain safe.',
        'strategic',
        'create'
      ),
      outcome(
        'crypto-go-incident-response',
        'Detect, contain, preserve evidence, classify exposure, rotate or revoke, migrate data, restore service, communicate, and verify closure after key or algorithm compromise.',
        'Immediate mass key deletion is always the correct incident response.'
      ),
      outcome(
        'crypto-go-production-defense',
        'Defend threat model, primitive choice, parameters, implementation, key custody, tests, interoperability, side channels, compliance limits, rollout, rollback, recovery, and residual risk before release.',
        'Passing unit tests and a security scan is sufficient release evidence.',
        'metacognitive',
        'create'
      ),
    ]
  ),
];

const sources = [
  [
    'Go 1.26 Release Contract',
    'https://go.dev/doc/go1.26',
    'Go 1.26.5 release family',
    'Current language, crypto API, FIPS, ECDH, ECDSA, ML-KEM, TLS hybrid key exchange, tooling, and compatibility changes.',
  ],
  [
    'Go Cryptography Packages',
    'https://pkg.go.dev/crypto',
    'Go 1.26.5 standard library',
    'Current standard cryptographic interfaces and packages.',
  ],
  [
    'Go Cryptographic Randomness',
    'https://pkg.go.dev/crypto/rand',
    'Go 1.26.5',
    'Cryptographically secure random bytes and integer generation.',
  ],
  [
    'Go AES Package',
    'https://pkg.go.dev/crypto/aes',
    'Go 1.26.5 and FIPS 197',
    'AES key, block, API, acceleration, and side-channel boundaries.',
  ],
  [
    'Go Cipher and AEAD Package',
    'https://pkg.go.dev/crypto/cipher',
    'Go 1.26.5',
    'Block modes, stream modes, AEAD, GCM, nonce, overlap, and deprecation contracts.',
  ],
  [
    'Go SHA-2 and SHA-3 Packages',
    'https://pkg.go.dev/crypto/sha3',
    'Go 1.26.5, FIPS 180-4 and FIPS 202',
    'Current SHA-2, SHA-3, SHAKE, digest, and streaming hash contracts.',
  ],
  [
    'Go HMAC Package',
    'https://pkg.go.dev/crypto/hmac',
    'Go 1.26.5',
    'HMAC construction and constant-time tag comparison.',
  ],
  [
    'Go HKDF Package',
    'https://pkg.go.dev/crypto/hkdf',
    'Go 1.26.5 and RFC 5869',
    'HKDF extraction, expansion, limits, and labels.',
  ],
  [
    'Go PBKDF2 Package',
    'https://pkg.go.dev/crypto/pbkdf2',
    'Go 1.26.5 and RFC 8018',
    'Standard-library PBKDF2 API and parameter validation.',
  ],
  [
    'Go RSA Package',
    'https://pkg.go.dev/crypto/rsa',
    'Go 1.26.5 and RFC 8017',
    'RSA key generation, OAEP, PSS, verification, and legacy limits.',
  ],
  [
    'Go ECDH Package',
    'https://pkg.go.dev/crypto/ecdh',
    'Go 1.26.5',
    'X25519 and NIST curve key generation, parsing, key exchange, and hardware abstraction.',
  ],
  [
    'Go Ed25519 Package',
    'https://pkg.go.dev/crypto/ed25519',
    'Go 1.26.5 and RFC 8032',
    'Ed25519 keys, signatures, options, contexts, and verification.',
  ],
  [
    'Go ECDSA Package',
    'https://pkg.go.dev/crypto/ecdsa',
    'Go 1.26.5 and FIPS 186-5',
    'ECDSA keys, signatures, current random behavior, and deprecated representations.',
  ],
  [
    'Go HPKE Package',
    'https://pkg.go.dev/crypto/hpke',
    'Go 1.26.5 and RFC 9180',
    'Hybrid Public Key Encryption suites, modes, one-shot APIs, and hybrid keys.',
  ],
  [
    'Go ML-KEM Package',
    'https://pkg.go.dev/crypto/mlkem',
    'Go 1.26.5 and FIPS 203',
    'ML-KEM key encapsulation, parameter sets, parsing, and shared-key handling.',
  ],
  [
    'Go ML-DSA Package',
    'https://pkg.go.dev/crypto/mldsa',
    'Go 1.26.5 and FIPS 204',
    'ML-DSA parameter sets, contexts, key sizes, signatures, and verification.',
  ],
  [
    'Go X.509 Package',
    'https://pkg.go.dev/crypto/x509',
    'Go 1.26.5 and RFC 5280',
    'Certificate parsing, issuance, path validation, trust stores, usages, names, and revocation data.',
  ],
  [
    'Go TLS Package',
    'https://pkg.go.dev/crypto/tls',
    'Go 1.26.5 and TLS 1.3',
    'TLS configuration, handshake state, certificates, resumption, exporters, and post-quantum hybrid defaults.',
  ],
  [
    'Go Constant-Time Package',
    'https://pkg.go.dev/crypto/subtle',
    'Go 1.26.5',
    'Constant-time comparison and selection primitives with scope limitations.',
  ],
  [
    'Go x/crypto Module',
    'https://pkg.go.dev/golang.org/x/crypto',
    'golang.org/x/crypto v0.54.0',
    'Argon2, scrypt, ChaCha20-Poly1305, and maintained supplemental cryptography.',
  ],
  [
    'Go FIPS 140-3 Compliance',
    'https://go.dev/doc/security/fips140',
    'Go Cryptographic Module v1.26.0 status reviewed 2026-07-14',
    'Module selection, enforcement, versioning, CAVP/CMVP status, and application limits.',
  ],
  [
    'Go Security Best Practices',
    'https://go.dev/doc/security/best-practices',
    'current 2026-07-14',
    'Fuzzing, race testing, vulnerability management, dependency review, and production security practice.',
  ],
  [
    'NIST FIPS 197 AES',
    'https://csrc.nist.gov/pubs/fips/197/final',
    'FIPS 197 updated 2023',
    'Advanced Encryption Standard definition, key sizes, blocks, and transformations.',
  ],
  [
    'NIST SP 800-38D GCM',
    'https://csrc.nist.gov/pubs/sp/800/38/d/final',
    'SP 800-38D',
    'Galois/Counter Mode authenticated encryption, IV, tag, and usage limits.',
  ],
  [
    'NIST SP 800-57 Key Management',
    'https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final',
    'SP 800-57 Part 1 Revision 5',
    'Key types, strength, protection, cryptoperiod, lifecycle, recovery, and compromise guidance.',
  ],
  [
    'NIST FIPS 203 ML-KEM',
    'https://csrc.nist.gov/pubs/fips/203/final',
    'FIPS 203 with 2025 planning note',
    'Module-Lattice-Based Key-Encapsulation Mechanism and current errata notice.',
  ],
  [
    'NIST FIPS 204 ML-DSA',
    'https://csrc.nist.gov/pubs/fips/204/final',
    'FIPS 204',
    'Module-Lattice-Based Digital Signature Standard.',
  ],
  [
    'NIST FIPS 205 SLH-DSA',
    'https://csrc.nist.gov/pubs/fips/205/final',
    'FIPS 205',
    'Stateless Hash-Based Digital Signature Standard.',
  ],
  [
    'TLS 1.3 RFC 8446',
    'https://www.rfc-editor.org/rfc/rfc8446',
    'RFC 8446',
    'TLS 1.3 protocol, transcript, key schedule, authentication, resumption, early data, and alerts.',
  ],
  [
    'ChaCha20-Poly1305 RFC 8439',
    'https://www.rfc-editor.org/rfc/rfc8439',
    'RFC 8439',
    'ChaCha20, Poly1305, AEAD construction, nonce, and test vectors.',
  ],
  [
    'Argon2 RFC 9106',
    'https://www.rfc-editor.org/rfc/rfc9106',
    'RFC 9106',
    'Argon2 variants, parameters, security considerations, and test vectors.',
  ],
  [
    'OWASP Cryptographic Storage',
    'https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html',
    'current reviewed 2026-07-14',
    'Application cryptographic design, algorithms, randomness, key management, and storage boundaries.',
  ],
  [
    'OWASP Password Storage',
    'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
    'current reviewed 2026-07-14',
    'Argon2id, scrypt, PBKDF2, salts, peppers, work factors, and migration.',
  ],
  [
    'CS2023 Cryptography Curriculum',
    'https://csed.acm.org/cryptography-supplement/',
    'ACM IEEE CS2023 supplement reviewed 2026-07-14',
    'Recognized cryptography outcomes, mathematical foundations, vetted libraries, protocols, PKI, and real-world applications.',
  ],
].map(([title, url, version, scope]) => ({
  title,
  authority: 'official-docs',
  url,
  version,
  reviewedAt: REVIEWED_AT,
  scope,
}));

export const cryptographyGoConfig = finalizeCourse(
  {
    id: 'cryptography-go',
    competencyIdPrefix: 'crypto-go-',
    title: 'Applied Cryptographic Engineering in Go 1.26',
    version: '2026.07',
    audience: {
      description:
        'Go developers who can build and test ordinary programs and need to select, implement, verify, migrate, and operate cryptographic systems without inventing cryptography or overstating evidence.',
      entryKnowledge: [
        'Write, test, fuzz, and debug Go 1.26 packages using functions, methods, interfaces, slices, errors, files, contexts, modules, and deterministic fixtures.',
        'Explain basic binary and text representation, concurrency ownership, resource bounds, authentication and authorization boundaries, dependency pinning, and safe release practice.',
      ],
      deviceConstraints: [
        'Modern browser; instant Go work uses an isolated deterministic interpreter for byte, state, format, policy, key-lifecycle, protocol, evidence models, and a narrow allowlist of deterministic AES, AEAD, hash, HMAC, constant-time comparison, ECDH, Ed25519, RSA verification, X.509 parsing, and encoding exercises. It never supplies production entropy or keys, secret custody, native constant-time proof, networks, TLS, HSM/KMS, certificate infrastructure, compliance, or production effects.',
      ],
      accessibilityAssumptions: [
        'Byte traces, protocol timelines, attack trees, key hierarchies, state machines, certificate paths, parameter tables, test-vector diffs, and dashboards have keyboard operation, announced status, large targets, reduced motion, structured text alternatives, and no color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Go 1.26.5 and x/crypto v0.54.0; threat modeling; bytes and canonical formats; randomness; secret lifecycle; classical defect labs; AES; modes; AEAD; hashes; HMAC; HKDF; password hashing; modular reasoning; RSA; X25519; Ed25519 and ECDSA; HPKE; envelope encryption; key management; X.509; TLS 1.3; secure protocol state machines; encrypted file formats; ML-KEM, ML-DSA, and SLH-DSA migration; misuse resistance; vectors, negative tests, fuzzing and interoperability; FIPS boundaries; operations, incidents, recovery, and release defense',
        'Runnable deterministic pure-Go security decision functions and allowlisted cryptographic API exercises plus explicit Go 1.26.5 native compile, OS entropy, native timing, vector, fuzz, race, interop, TLS, HSM/KMS, certificate, load, fault, compliance, recovery, and production transfer gates',
        'Five cumulative authentic cryptographic systems and a performance-based production defense examination',
      ],
      excludes: [
        'Browser claims about real cryptographic strength, production entropy or key custody, secret erasure, native constant-time execution, non-allowlisted or native crypto behavior, network/TLS peers, HSM/KMS custody, CA/revocation infrastructure, Go FIPS module status, compliance certification, or production security',
        'Production recipes for Caesar, substitution, repeating-key XOR, ECB, unauthenticated CBC/CTR, DES/3DES, RC4, textbook RSA, MD5, SHA-1 signatures, custom primitives, credential cracking, or unauthorized testing; these appear only in bounded attack, rejection, compatibility, or migration labs',
      ],
      nextCourses: ['build-ecommerce-api-go', 'build-social-media-api-go'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves Go correctness, canonical bytes, explicit threat and trust boundaries, purpose-separated keys, bounded attacker-controlled work, uniform safe failures, secret-safe observability, negative tests, and evidence limits before adding one cryptographic boundary.',
      'Browser Go is deterministic and isolated. It models byte identity, formats, nonce and key state, policies, protocol transitions, attacks, migration, and evidence decisions and runs only an allowlisted side-effect-free cryptographic API subset with fixed fixtures. It never generates production keys, proves entropy or constant time, opens networks, contacts TLS, HSM/KMS or certificate systems, reads host secrets, executes commands, or causes external effects.',
      'Passing work requires stable scenario and artifact identity, a named asset and adversary, exact security property, canonical inputs, versioned algorithm and parameter policy, key/nonce ownership, bounded work, observable success and failure, tamper and changed-case evidence, recovery, and explicit native or production transfer limits.',
    ],
    modules,
    projects: [
      project(
        'crypto-go-password-vault',
        'Credential Verifier and Upgrade Service',
        'crypto-go-password-hashing',
        'A regional public library identity team',
        'They need versioned Argon2id password records, strict parser admission, enumeration-resistant verification, calibrated resource limits, pepper custody, legacy migration, successful-login upgrades, accessible recovery status, and abuse evidence.',
        [
          'crypto-go-password-hash-not-encrypt',
          'crypto-go-argon2id-parameters',
          'crypto-go-password-record-parser',
          'crypto-go-password-upgrade-pepper',
          'crypto-go-secret-custody',
        ]
      ),
      project(
        'crypto-go-signed-update',
        'Signed Software Update Manifest',
        'crypto-go-ed25519-ecdsa',
        'A medical device maintenance group',
        'They need canonical versioned manifests, trusted Ed25519 signing keys, key-purpose policy, threshold approval, expiry and rollback resistance, negative vectors, offline verification, rotation, and incident revocation.',
        [
          'crypto-go-signature-guarantees',
          'crypto-go-ed25519-api',
          'crypto-go-signature-context-canonical',
          'crypto-go-signature-policy',
          'crypto-go-nonce-uniqueness',
        ]
      ),
      project(
        'crypto-go-secure-backup',
        'Seekable Encrypted Backup Container',
        'crypto-go-file-stream-formats',
        'A legal-aid case archive',
        'They need per-backup data keys, wrapped-key envelopes, chunked AEAD, authenticated metadata, truncation and reorder rejection, bounded streaming, interrupted-write cleanup, version migration, independent restore drills, and accessibility-safe operator feedback.',
        [
          'crypto-go-envelope-dek-kek',
          'crypto-go-file-envelope-format',
          'crypto-go-chunk-nonce-derivation',
          'crypto-go-truncation-reorder-defense',
          'crypto-go-format-migration-recovery',
        ]
      ),
      project(
        'crypto-go-device-channel',
        'Authenticated Hybrid Device Channel',
        'crypto-go-post-quantum',
        'A municipal sensor and safety network',
        'They need explicit roles and device identity, X25519 and ML-KEM hybrid establishment, signed transcript, downgrade defense, labeled key schedule, ordered AEAD records, replay handling, certificate rotation, compatibility telemetry, and rollback.',
        [
          'crypto-go-peer-authentication',
          'crypto-go-transcript-state-machine',
          'crypto-go-downgrade-negotiation',
          'crypto-go-mlkem',
          'crypto-go-hybrid-pq-migration',
        ]
      ),
      project(
        'crypto-go-production-defense',
        'Cryptographic Platform Production Defense',
        'crypto-go-operations-release',
        'An engineering, security, accessibility, privacy, compliance, and operations board',
        'The board needs an algorithm and key inventory, Go 1.26 and x/crypto compatibility evidence, FIPS-status accuracy, vectors and fuzzing, interop, native side-channel scope, capacity and dependency faults, canary migration, rollback, compromise response, restore drills, and residual-risk ownership.',
        [
          'crypto-go-algorithm-inventory',
          'crypto-go-fips-module-status',
          'crypto-go-interoperability-matrix',
          'crypto-go-compatible-release',
          'crypto-go-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar Go 1.26 cryptographic engineering cases spanning threats, bytes, randomness, secret custody, classical attacks, AES and modes, AEAD, hashes, MACs, KDFs, passwords, modular reasoning, RSA, curves, signatures, HPKE, envelope systems, key management, X.509, TLS 1.3, protocol state machines, file formats, post-quantum migration, oracles, side channels, vectors, fuzzing, interoperability, agility, FIPS limits, operations, incidents, recovery, release, rollback, and residual-risk defense with explicit browser and production evidence limits.',
    minimumQuestionBankSize: 900,
  },
  { researchedAt: RESEARCHED_AT, prerequisiteCourseIds: ['go-basics'] }
);
