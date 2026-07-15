const SPECS = {
  'crypto-go-outcomes-threat-evidence': {
    parameters:
      'asset, adversary string, properties, trustBoundaries int, evidenceBound, authorized bool',
    results: '(bool, int, string)',
    body: `\tif asset == "" || adversary == "" { return false, 0, "threat-input" }
\tif properties < 1 || trustBoundaries < 1 { return false, properties, "security-goal" }
\tif !authorized { return false, trustBoundaries, "authorization" }
\tif !evidenceBound { return false, properties, "claim-overreach" }
\treturn true, properties + trustBoundaries, "bounded-outcome"`,
    anchors: ['asset\\s*==\\s*""', 'properties\\s*<\\s*1', '!authorized', '!evidenceBound'],
    task: 'gate a cryptographic claim on asset, adversary, properties, trust boundaries, authorization, and bounded evidence',
  },
  'crypto-go-primitives-encoding': {
    parameters:
      'operation, canonical string, reversible, authentic, confidential, domainSeparated bool',
    results: '(bool, int, string)',
    body: `\tif canonical == "" { return false, 0, "canonical-bytes" }
\tif operation == "encoding" && (confidential || authentic) { return false, len(canonical), "encoding-overclaim" }
\tif operation == "hash" && reversible { return false, len(canonical), "reversibility" }
\tif !domainSeparated { return false, len(canonical), "domain-separation" }
\treturn true, len(canonical), operation`,
    anchors: [
      'canonical\\s*==\\s*""',
      'operation\\s*==\\s*"encoding"',
      'operation\\s*==\\s*"hash"',
      '!domainSeparated',
    ],
    task: 'separate encoding, hashing, authentication, confidentiality, reversibility, and canonical domain-bound bytes',
  },
  'crypto-go-randomness-nonces': {
    parameters:
      'source, purpose string, generated, used, maximum uint64, unpredictable, restartSafe bool',
    results: '(bool, int, string)',
    body: `\tif source != "crypto/rand" { return false, 0, "csprng" }
\tif purpose == "" || maximum == 0 { return false, 0, "purpose-limit" }
\tif generated > maximum || used > generated { return false, int(used), "nonce-ledger" }
\tif !unpredictable || !restartSafe { return false, int(generated), "randomness-system" }
\treturn true, int(maximum - used), "unique-budget"`,
    anchors: [
      'source\\s*!=\\s*"crypto/rand"',
      'maximum\\s*==\\s*0',
      'used\\s*>\\s*generated',
      '!unpredictable\\s*\\|\\|\\s*!restartSafe',
    ],
    task: 'budget cryptographic randomness and nonce uniqueness across use, restart, and rollback',
  },
  'crypto-go-secret-bytes-lifecycle': {
    parameters:
      'copies, maximumCopies int, fixedLength, constantTime, redacted, erasedEverywhere bool',
    results: '(bool, int, string)',
    body: `\tif copies < 0 || maximumCopies < 0 || copies > maximumCopies { return false, copies, "secret-copies" }
\tif !fixedLength || !constantTime { return false, copies, "comparison" }
\tif !redacted { return false, copies, "secret-observability" }
\tif erasedEverywhere { return false, copies, "erasure-overclaim" }
\treturn true, maximumCopies - copies, "bounded-custody"`,
    anchors: [
      'copies\\s*>\\s*maximumCopies',
      '!fixedLength\\s*\\|\\|\\s*!constantTime',
      '!redacted',
      'if\\s+erasedEverywhere',
    ],
    task: 'bound secret copies, constant-time comparison scope, redaction, and honest erasure claims',
  },
  'crypto-go-classical-cryptanalysis': {
    parameters:
      'algorithm string, keyspace, guessesPerSecond, seconds int, authorized, migrationOnly bool',
    results: '(bool, int, string)',
    body: `\tif !authorized { return false, 0, "authorization" }
\tif keyspace <= 0 || guessesPerSecond <= 0 || seconds < 0 { return false, 0, "cost-model" }
\tguesses := guessesPerSecond * seconds
\tif guesses >= keyspace && !migrationOnly { return false, guesses, "broken-toy" }
\tif algorithm == "production" { return false, guesses, "legacy-prohibited" }
\treturn true, guesses, "bounded-defect-lab"`,
    anchors: [
      '!authorized',
      'keyspace\\s*<=\\s*0',
      'guesses\\s*>=\\s*keyspace',
      'algorithm\\s*==\\s*"production"',
    ],
    task: 'model an authorized classical-cipher attack while quarantining all legacy use to migration or defect labs',
  },
  'crypto-go-aes-block-ciphers': {
    parameters: 'keyBytes, blockBytes, inputBytes int, knownAnswer, approvedModule bool',
    results: '(bool, int, string)',
    body: `\tvalidKey := keyBytes == 16 || keyBytes == 24 || keyBytes == 32
\tif !validKey { return false, keyBytes, "aes-key" }
\tif blockBytes != 16 || inputBytes != blockBytes { return false, inputBytes, "aes-block" }
\tif !knownAnswer { return false, blockBytes, "vector" }
\tif !approvedModule { return false, keyBytes * 8, "implementation-boundary" }
\treturn true, keyBytes * 8, "aes-primitive"`,
    anchors: ['keyBytes\\s*==\\s*16', 'blockBytes\\s*!=\\s*16', '!knownAnswer', '!approvedModule'],
    task: 'validate AES key and block contracts with known-answer and implementation-boundary evidence',
  },
  'crypto-go-modes-padding': {
    parameters:
      'mode string, nonce, counter uint64, authenticated, uniformFailure, decryptOnly bool',
    results: '(bool, int, string)',
    body: `\tif mode == "ECB" { return false, 0, "pattern-leak" }
\tif (mode == "CBC" || mode == "CTR") && !authenticated { return false, int(counter), "malleable" }
\tif mode == "CTR" && counter == 0 && nonce == 0 { return false, 0, "keystream-reuse" }
\tif !uniformFailure || !decryptOnly { return false, int(counter), "legacy-boundary" }
\treturn true, int(nonce ^ counter), "legacy-read-only"`,
    anchors: [
      'mode\\s*==\\s*"ECB"',
      '!authenticated',
      'counter\\s*==\\s*0\\s*&&\\s*nonce\\s*==\\s*0',
      '!uniformFailure\\s*\\|\\|\\s*!decryptOnly',
    ],
    task: 'reject ECB and unauthenticated modes while containing CBC or CTR to uniform decrypt-only migration',
  },
  'crypto-go-aead-aes-gcm': {
    parameters:
      'version string, nonce, maximumNonce uint64, aadFields, ciphertextBytes int, tagValid, plaintextReleased bool',
    results: '(bool, int, string)',
    body: `\tif version == "" || aadFields < 3 { return false, aadFields, "envelope-context" }
\tif maximumNonce == 0 || nonce >= maximumNonce { return false, int(nonce), "nonce-budget" }
\tif ciphertextBytes < 0 { return false, ciphertextBytes, "length" }
\tif !tagValid && plaintextReleased { return false, ciphertextBytes, "unauthenticated-plaintext" }
\tif !tagValid { return false, ciphertextBytes, "authentication" }
\treturn true, ciphertextBytes, "gcm-open"`,
    anchors: [
      'aadFields\\s*<\\s*3',
      'nonce\\s*>=\\s*maximumNonce',
      'ciphertextBytes\\s*<\\s*0',
      '!tagValid\\s*&&\\s*plaintextReleased',
    ],
    task: 'validate a versioned AES-GCM envelope, nonce budget, AAD, lengths, and atomic plaintext release',
  },
  'crypto-go-chacha-poly1305': {
    parameters:
      'suite string, nonceBytes, keyBytes int, aadBound, vectorPassed, interoperable bool',
    results: '(bool, int, string)',
    body: `\tif keyBytes != 32 { return false, keyBytes, "key-size" }
\tif suite == "chacha20poly1305" && nonceBytes != 12 { return false, nonceBytes, "ietf-nonce" }
\tif suite == "xchacha20poly1305" && nonceBytes != 24 { return false, nonceBytes, "xchacha-nonce" }
\tif !aadBound || !vectorPassed || !interoperable { return false, nonceBytes, "suite-evidence" }
\treturn true, keyBytes + nonceBytes, suite`,
    anchors: [
      'keyBytes\\s*!=\\s*32',
      'nonceBytes\\s*!=\\s*12',
      'nonceBytes\\s*!=\\s*24',
      '!aadBound\\s*\\|\\|\\s*!vectorPassed',
    ],
    task: 'select and verify standard or XChaCha20-Poly1305 with exact sizes, AAD, vectors, and interoperability',
  },
  'crypto-go-hashes-sha3': {
    parameters:
      'purpose, algorithm string, digestBits, sourceBytes int, expectedTrusted, canonical bool',
    results: '(bool, int, string)',
    body: `\tif sourceBytes < 0 || digestBits < 128 { return false, digestBits, "hash-bounds" }
\tif purpose == "adversarial-integrity" && (algorithm == "MD5" || algorithm == "SHA-1") { return false, digestBits, "weak-hash" }
\tif !canonical { return false, sourceBytes, "canonical-bytes" }
\tif purpose == "authenticity" && !expectedTrusted { return false, digestBits, "digest-not-authentication" }
\treturn true, sourceBytes, algorithm`,
    anchors: [
      'digestBits\\s*<\\s*128',
      'algorithm\\s*==\\s*"MD5"',
      '!canonical',
      '!expectedTrusted',
    ],
    task: 'select a hash by purpose while rejecting weak algorithms, ambiguous bytes, and unauthenticated digest claims',
  },
  'crypto-go-mac-hmac': {
    parameters:
      'keyPurpose, requestID string, timestampSkew, maximumSkew int, tagValid, duplicate bool',
    results: '(bool, int, string)',
    body: `\tif keyPurpose != "hmac-request" { return false, 0, "key-separation" }
\tif requestID == "" { return false, 0, "request-identity" }
\tif timestampSkew < 0 || timestampSkew > maximumSkew { return false, timestampSkew, "freshness" }
\tif !tagValid { return false, timestampSkew, "authentication" }
\tif duplicate { return false, timestampSkew, "replay" }
\treturn true, maximumSkew - timestampSkew, "hmac-accepted"`,
    anchors: [
      'keyPurpose\\s*!=\\s*"hmac-request"',
      'requestID\\s*==\\s*""',
      'timestampSkew\\s*>\\s*maximumSkew',
      'if\\s+duplicate',
    ],
    task: 'verify a purpose-separated canonical HMAC request with freshness and durable replay rejection',
  },
  'crypto-go-kdf-hkdf': {
    parameters: 'secretBytes, saltBytes, outputBytes int, label, role string, transcriptBound bool',
    results: '(bool, int, string)',
    body: `\tif secretBytes < 16 || saltBytes < 0 || outputBytes <= 0 { return false, 0, "kdf-input" }
\tif outputBytes > 255*32 { return false, outputBytes, "hkdf-limit" }
\tif label == "" || role == "" { return false, outputBytes, "domain-label" }
\tif !transcriptBound { return false, outputBytes, "transcript" }
\treturn true, outputBytes, label + ":" + role`,
    anchors: [
      'secretBytes\\s*<\\s*16',
      'outputBytes\\s*>\\s*255\\*32',
      'label\\s*==\\s*""',
      '!transcriptBound',
    ],
    task: 'derive bounded purpose- and role-separated HKDF keys bound to the negotiated transcript',
  },
  'crypto-go-password-hashing': {
    parameters:
      'algorithm string, memoryKiB, iterations, parallelism, maximumMemory int, recordValid, needsUpgrade bool',
    results: '(bool, int, string)',
    body: `\tif algorithm != "argon2id" && algorithm != "scrypt" && algorithm != "pbkdf2" { return false, 0, "algorithm" }
\tif memoryKiB < 0 || iterations <= 0 || parallelism <= 0 { return false, 0, "parameters" }
\tif memoryKiB > maximumMemory { return false, memoryKiB, "resource-admission" }
\tif !recordValid { return false, memoryKiB, "record" }
\tif needsUpgrade { return true, memoryKiB, "verify-then-rehash" }
\treturn true, memoryKiB, "current-verifier"`,
    anchors: [
      'algorithm\\s*!=\\s*"argon2id"',
      'iterations\\s*<=\\s*0',
      'memoryKiB\\s*>\\s*maximumMemory',
      '!recordValid',
    ],
    task: 'admit a versioned password verifier, bound KDF work, and select verify-then-rehash migration',
  },
  'crypto-go-modular-arithmetic': {
    parameters: 'value, modulus, gcd, exponent, operations int, approvedGroup, constantTime bool',
    results: '(bool, int, string)',
    body: `\tif modulus <= 1 || operations < 0 { return false, 0, "modulus" }
\treduced := ((value % modulus) + modulus) % modulus
\tif gcd != 1 { return false, reduced, "no-inverse" }
\tif exponent < 0 { return false, reduced, "exponent" }
\tif !approvedGroup || !constantTime { return false, reduced, "production-boundary" }
\treturn true, reduced, "modular-model"`,
    anchors: [
      'modulus\\s*<=\\s*1',
      'value\\s*%\\s*modulus',
      'gcd\\s*!=\\s*1',
      '!approvedGroup\\s*\\|\\|\\s*!constantTime',
    ],
    task: 'normalize modular values and distinguish mathematical correctness from approved constant-time group execution',
  },
  'crypto-go-rsa-oaep-pss': {
    parameters:
      'operation, padding string, modulusBits, messageBytes, maximumBytes int, keyTrusted, uniformFailure bool',
    results: '(bool, int, string)',
    body: `\tif modulusBits < 2048 || !keyTrusted { return false, modulusBits, "rsa-key" }
\tif operation == "encrypt" && padding != "OAEP" { return false, messageBytes, "oaep-required" }
\tif operation == "sign" && padding != "PSS" { return false, messageBytes, "pss-required" }
\tif messageBytes < 0 || messageBytes > maximumBytes { return false, messageBytes, "payload-bound" }
\tif !uniformFailure { return false, messageBytes, "oracle" }
\treturn true, modulusBits, operation + ":" + padding`,
    anchors: [
      'modulusBits\\s*<\\s*2048',
      'padding\\s*!=\\s*"OAEP"',
      'padding\\s*!=\\s*"PSS"',
      '!uniformFailure',
    ],
    task: 'gate RSA on trusted keys, OAEP or PSS purpose, payload limits, and uniform failure',
  },
  'crypto-go-ecdh-x25519': {
    parameters: 'curve, peerIdentity, role string, publicKeyValid, transcriptBound, ephemeral bool',
    results: '(bool, int, string)',
    body: `\tif curve != "X25519" && curve != "P-256" { return false, 0, "curve-policy" }
\tif peerIdentity == "" || role == "" { return false, 0, "identity-role" }
\tif !publicKeyValid { return false, len(peerIdentity), "public-key" }
\tif !transcriptBound { return false, len(role), "kdf-context" }
\tif !ephemeral { return false, len(curve), "forward-secrecy" }
\treturn true, len(peerIdentity) + len(role), "authenticated-ecdh"`,
    anchors: [
      'curve\\s*!=\\s*"X25519"',
      'peerIdentity\\s*==\\s*""',
      '!publicKeyValid',
      '!ephemeral',
    ],
    task: 'authenticate and transcript-bind an ephemeral X25519 or approved ECDH exchange',
  },
  'crypto-go-ed25519-ecdsa': {
    parameters:
      'algorithm, context, signer string, canonical, trustedKey, signatureValid, authorized bool',
    results: '(bool, int, string)',
    body: `\tif algorithm != "Ed25519" && algorithm != "ECDSA" { return false, 0, "signature-suite" }
\tif context == "" || signer == "" || !canonical { return false, 0, "signed-bytes" }
\tif !trustedKey { return false, len(signer), "key-trust" }
\tif !signatureValid { return false, len(context), "signature" }
\tif !authorized { return false, len(signer), "policy" }
\treturn true, len(context) + len(signer), algorithm`,
    anchors: ['algorithm\\s*!=\\s*"Ed25519"', 'context\\s*==\\s*""', '!trustedKey', '!authorized'],
    task: 'verify canonical context-bound Ed25519 or ECDSA bytes under a trusted key and separate authorization policy',
  },
  'crypto-go-hpke-envelope': {
    parameters:
      'suite, recipient, objectID string, wrappedKeys, payloadBytes int, metadataBound, rewrapAudited bool',
    results: '(bool, int, string)',
    body: `\tif suite == "" || recipient == "" || objectID == "" { return false, 0, "envelope-identity" }
\tif wrappedKeys < 1 || payloadBytes < 0 { return false, wrappedKeys, "envelope-bounds" }
\tif !metadataBound { return false, payloadBytes, "swap-defense" }
\tif wrappedKeys > 1 && !rewrapAudited { return false, wrappedKeys, "recipient-audit" }
\treturn true, payloadBytes, suite + ":" + recipient`,
    anchors: ['suite\\s*==\\s*""', 'wrappedKeys\\s*<\\s*1', '!metadataBound', '!rewrapAudited'],
    task: 'bind an HPKE or hybrid envelope to recipient, object, suite, payload, and audited rewrap state',
  },
  'crypto-go-key-management': {
    parameters:
      'keyID, version, purpose, state string, ageDays, cryptoperiodDays int, leastPrivilege, recoveryTested bool',
    results: '(bool, int, string)',
    body: `\tif keyID == "" || version == "" || purpose == "" { return false, 0, "key-identity" }
\tif state != "active" && state != "decrypt-only" { return false, ageDays, "key-state" }
\tif ageDays < 0 || cryptoperiodDays <= 0 || ageDays > cryptoperiodDays { return false, ageDays, "cryptoperiod" }
\tif !leastPrivilege { return false, ageDays, "key-authority" }
\tif !recoveryTested { return false, ageDays, "recovery" }
\treturn true, cryptoperiodDays - ageDays, keyID + ":" + version`,
    anchors: [
      'keyID\\s*==\\s*""',
      'state\\s*!=\\s*"active"',
      'ageDays\\s*>\\s*cryptoperiodDays',
      '!recoveryTested',
    ],
    task: 'enforce immutable key identity, state, cryptoperiod, least privilege, and tested recovery',
  },
  'crypto-go-x509-pki': {
    parameters:
      'dnsName string, chainLength, maximumChain int, timeValid, usagesValid, rootTrusted, revocationKnown bool',
    results: '(bool, int, string)',
    body: `\tif dnsName == "" { return false, 0, "dns-name" }
\tif chainLength < 1 || chainLength > maximumChain { return false, chainLength, "path-bound" }
\tif !timeValid || !usagesValid { return false, chainLength, "certificate-policy" }
\tif !rootTrusted { return false, chainLength, "trust-anchor" }
\tif !revocationKnown { return false, chainLength, "revocation-policy" }
\treturn true, chainLength, dnsName`,
    anchors: [
      'dnsName\\s*==\\s*""',
      'chainLength\\s*>\\s*maximumChain',
      '!timeValid\\s*\\|\\|\\s*!usagesValid',
      '!rootTrusted',
    ],
    task: 'validate a bounded X.509 path against name, time, usage, trust-anchor, and explicit revocation policy',
  },
  'crypto-go-tls13': {
    parameters:
      'version, serverName, alpn string, chainVerified, insecureSkip, replaySafe, liveTested bool',
    results: '(bool, int, string)',
    body: `\tif version != "TLS1.3" { return false, 0, "protocol-version" }
\tif serverName == "" || alpn == "" { return false, 0, "peer-context" }
\tif insecureSkip || !chainVerified { return false, len(serverName), "verification" }
\tif !replaySafe { return false, len(alpn), "early-data" }
\tif !liveTested { return false, len(version), "transfer-gate" }
\treturn true, len(serverName) + len(alpn), "tls-channel"`,
    anchors: [
      'version\\s*!=\\s*"TLS1.3"',
      'serverName\\s*==\\s*""',
      'insecureSkip\\s*\\|\\|\\s*!chainVerified',
      '!liveTested',
    ],
    task: 'gate a TLS 1.3 channel on peer context, certificate verification, replay policy, and live transfer evidence',
  },
  'crypto-go-protocol-design': {
    parameters:
      'role, state, sessionID string, sequence, previousSequence uint64, transcriptBound, downgradeRejected bool',
    results: '(bool, int, string)',
    body: `\tif role == "" || state == "" || sessionID == "" { return false, 0, "protocol-identity" }
\tif sequence <= previousSequence { return false, int(sequence), "replay-order" }
\tif !transcriptBound { return false, int(sequence), "transcript" }
\tif !downgradeRejected { return false, int(sequence), "negotiation" }
\tif state == "terminal" { return true, int(sequence), "closed" }
\treturn true, int(sequence), role + ":" + state`,
    anchors: [
      'role\\s*==\\s*""',
      'sequence\\s*<=\\s*previousSequence',
      '!transcriptBound',
      '!downgradeRejected',
    ],
    task: 'advance a role-bound protocol state with session identity, ordered replay defense, transcript binding, and downgrade rejection',
  },
  'crypto-go-file-stream-formats': {
    parameters:
      'version string, chunk, totalChunks, plaintextBytes, maximumBytes int, headerBound, finalTag, partialRemoved bool',
    results: '(bool, int, string)',
    body: `\tif version == "" || chunk < 0 || totalChunks < 1 || chunk >= totalChunks { return false, chunk, "chunk-index" }
\tif plaintextBytes < 0 || plaintextBytes > maximumBytes { return false, plaintextBytes, "byte-admission" }
\tif !headerBound { return false, chunk, "header-authentication" }
\tif chunk == totalChunks-1 && !finalTag { return false, chunk, "truncation" }
\tif !partialRemoved { return false, chunk, "partial-output" }
\treturn true, plaintextBytes, "authenticated-chunk"`,
    anchors: [
      'chunk\\s*>=\\s*totalChunks',
      'plaintextBytes\\s*>\\s*maximumBytes',
      '!headerBound',
      '!partialRemoved',
    ],
    task: 'validate a bounded authenticated chunk format with final-state and partial-output cleanup evidence',
  },
  'crypto-go-post-quantum': {
    parameters:
      'kem, signature, combiner string, inventoryComplete, transcriptBound, downgradeRejected, rollbackReady bool',
    results: '(bool, int, string)',
    body: `\tif kem != "ML-KEM" || signature != "ML-DSA" { return false, 0, "pq-suite" }
\tif combiner == "" || !inventoryComplete { return false, 0, "migration-design" }
\tif !transcriptBound || !downgradeRejected { return false, len(combiner), "hybrid-binding" }
\tif !rollbackReady { return false, len(kem), "rollout" }
\treturn true, len(kem) + len(signature), "hybrid-pq"`,
    anchors: [
      'kem\\s*!=\\s*"ML-KEM"',
      'combiner\\s*==\\s*""',
      '!transcriptBound\\s*\\|\\|\\s*!downgradeRejected',
      '!rollbackReady',
    ],
    task: 'gate hybrid ML-KEM and ML-DSA migration on inventory, specified combiner, transcript binding, downgrade defense, and rollback',
  },
  'crypto-go-side-channels-misuse': {
    parameters:
      'inputBytes, maximumBytes, work, maximumWork int, uniformFailure, nativeMeasured, secretsRedacted bool',
    results: '(bool, int, string)',
    body: `\tif inputBytes < 0 || inputBytes > maximumBytes { return false, inputBytes, "input-admission" }
\tif work < 0 || work > maximumWork { return false, work, "work-admission" }
\tif !uniformFailure { return false, work, "oracle" }
\tif !secretsRedacted { return false, inputBytes, "secret-leak" }
\tif !nativeMeasured { return false, work, "side-channel-transfer" }
\treturn true, maximumWork - work, "bounded-operation"`,
    anchors: [
      'inputBytes\\s*>\\s*maximumBytes',
      'work\\s*>\\s*maximumWork',
      '!uniformFailure',
      '!nativeMeasured',
    ],
    task: 'bound attacker-controlled cryptographic work and move oracle and side-channel claims to native evidence',
  },
  'crypto-go-testing-vectors-fuzz': {
    parameters:
      'positiveVectors, negativeVectors, fuzzSeeds, peers int, parserBounded, tamperRejected, reproducible bool',
    results: '(bool, int, string)',
    body: `\tif positiveVectors < 1 || negativeVectors < 1 { return false, 0, "vector-coverage" }
\tif fuzzSeeds < 1 || !parserBounded { return false, fuzzSeeds, "fuzz-contract" }
\tif !tamperRejected { return false, negativeVectors, "negative-evidence" }
\tif peers < 2 { return false, peers, "interoperability" }
\tif !reproducible { return false, fuzzSeeds, "regression" }
\treturn true, positiveVectors + negativeVectors + fuzzSeeds, "layered-tests"`,
    anchors: ['positiveVectors\\s*<\\s*1', '!parserBounded', '!tamperRejected', 'peers\\s*<\\s*2'],
    task: 'combine authoritative vectors, negative mutation, bounded fuzzing, reproducibility, and cross-implementation evidence',
  },
  'crypto-go-agility-compliance': {
    parameters:
      'goVersion, moduleVersion, algorithm string, inventoried, enforced, statusAccurate, exceptionExpired bool',
    results: '(bool, int, string)',
    body: `\tif goVersion != "1.26.5" || moduleVersion == "" { return false, 0, "version-contract" }
\tif algorithm == "" || !inventoried { return false, 0, "crypto-inventory" }
\tif !enforced { return false, len(algorithm), "policy-enforcement" }
\tif !statusAccurate { return false, len(moduleVersion), "compliance-overclaim" }
\tif exceptionExpired { return false, len(goVersion), "expired-exception" }
\treturn true, len(moduleVersion), algorithm`,
    anchors: [
      'goVersion\\s*!=\\s*"1.26.5"',
      '!inventoried',
      '!statusAccurate',
      'if\\s+exceptionExpired',
    ],
    task: 'bind crypto inventory, Go and module versions, policy enforcement, honest compliance status, and expiring exceptions',
  },
  'crypto-go-operations-release': {
    parameters: 'unit, vectors, fuzz, interop, nativeSideChannel, load, rollback, recovery bool',
    results: '(bool, int, string)',
    body: `\tpassed := 0
\tfor _, gate := range []bool{unit, vectors, fuzz, interop, nativeSideChannel, load, rollback, recovery} { if gate { passed++ } }
\tif !unit || !vectors { return false, passed, "deterministic-gates" }
\tif !fuzz || !interop || !nativeSideChannel { return false, passed, "security-transfer-gates" }
\tif !load || !rollback || !recovery { return false, passed, "production-gates" }
\treturn true, passed, "production-defense"`,
    anchors: [
      'passed\\s*:=\\s*0',
      '!unit\\s*\\|\\|\\s*!vectors',
      '!fuzz\\s*\\|\\|\\s*!interop',
      '!load\\s*\\|\\|\\s*!rollback',
    ],
    task: 'gate release on deterministic, vector, fuzz, interoperability, native side-channel, load, rollback, and recovery evidence',
  },
};

const ENVIRONMENTS = [
  'a credential migration window',
  'a signed release review',
  'a replicated device restart',
  'a certificate rollover incident',
  'a post-quantum compatibility canary',
  'a backup restoration drill',
];

const CHANGES = [
  'change one authenticated byte and prove clean rejection without partial effect',
  'repeat or roll back a nonce, sequence, or key version and reject the stale state',
  'double attacker-controlled size or work and remain inside the admission budget',
  'swap the role, tenant, recipient, algorithm, or context and prove domain separation',
  'rotate the active key while old data remains readable and new writes cannot downgrade',
  'remove one transfer gate and state exactly which production claim is no longer supported',
];

const CONSTRAINTS = [
  'retain exact canonical bytes, purpose, role, version, and artifact identity',
  'cap bytes, work, memory, time, attempts, concurrency, and retained secret material before use',
  'keep browser execution deterministic and move production entropy, native timing, non-allowlisted crypto, network, HSM, and compliance claims to authorized transfer gates',
  'preserve accessible status, non-color meaning, keyboard operation, error recovery, and secret-safe diagnostics',
  'reject toy, obsolete, unauthenticated, self-signed-trust, downgrade, and security-by-obscurity shortcuts',
  'record key custody, terminal failure, rollback, recovery, and residual-risk ownership',
];

function details(suffix) {
  const cleaned = suffix.replace(/[^a-z0-9]/giu, '').toLowerCase() || '0';
  let value = 2166136261;
  for (const character of cleaned) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  value >>>= 0;
  return {
    caseNumber: (value % 9000) + 1000,
    environment: ENVIRONMENTS[value % ENVIRONMENTS.length],
    change: CHANGES[(value >>> 4) % CHANGES.length],
    constraint: CONSTRAINTS[(value >>> 8) % CONSTRAINTS.length],
  };
}

function lookaheads(anchors, scope) {
  return anchors.map((anchor) => `(?=${scope}*?${anchor})`).join('');
}

export function cryptographyGoScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Cryptography in Go scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} cryptographic engineering team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Go evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure state models or the narrow side-effect-free crypto allowlist with fixed fixtures. Production entropy and keys, secret custody, native timing and side channels, networks, TLS, HSM/KMS, certificate systems, FIPS or compliance state, load, faults, restore, and production behavior require explicit authorized transfer gates.${probe}`;
}

export function cryptographyGoEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Cryptography in Go evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const scope = '(?:(?!// Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${scope}*?func\\s+${functionName}\\s*\\([^)]*\\)\\s*\\([^)]*\\)\\s*\\{${lookaheads(spec.anchors, scope)}(?=${scope}*?return)${scope}*?return`,
    example: `${marker}
// Competency: ${competencyId}.
// Case ${chosen.caseNumber}: ${chosen.environment}.
// Operating constraint: ${chosen.constraint}.
// Changed case: ${chosen.change}.
func ${functionName}(${spec.parameters}) ${spec.results} {
\tevidenceVariant${suffix} := "${suffix}-${[...suffix].reverse().join('')}-${chosen.caseNumber}"
\t_ = evidenceVariant${suffix}
${spec.body}
}`,
    requirement: `Append a compile-ready pure-Go function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Return observable changed-case evidence. Browser code must not import cryptographic packages, generate or handle production keys, open sockets, contact TLS, HSM/KMS, certificate systems, compliance services, or external effects, read host state, execute host commands, or use credentials; verify those boundaries later with Go 1.26.5 compile, standard crypto APIs, authoritative vectors, fuzz, race, native side-channel measurement, interoperability, controlled network and key-custody systems, load, fault, recovery, compliance, and production gates.`,
  };
}

function cryptographyGoApiExample(moduleId, seed) {
  const n = (seed % 4) + 2;
  if (moduleId === 'crypto-go-primitives-encoding') {
    return `package main

import (
\t"encoding/hex"
\t"fmt"
)

func main() {
\toriginal := []byte("record-${n}:tenant-a")
\tencoded := hex.EncodeToString(original)
\tdecoded, err := hex.DecodeString(encoded)
\tfmt.Printf("encoded=%s confidential=false roundtrip=%t err=%v\\n", encoded, string(decoded) == string(original), err)
}`;
  }
  if (moduleId === 'crypto-go-secret-bytes-lifecycle') {
    return `package main

import (
\t"crypto/subtle"
\t"fmt"
)

func main() {
\texpected := []byte{${n}, 7, 9, 11}
\tchanged := []byte{${n}, 7, 9, 12}
\tfmt.Printf("same=%d changed=%d erasure_proved=false\\n",
\t\tsubtle.ConstantTimeCompare(expected, expected),
\t\tsubtle.ConstantTimeCompare(expected, changed))
}`;
  }
  if (moduleId === 'crypto-go-classical-cryptanalysis') {
    return `package main

import "fmt"

func shift(input string, distance byte) string {
\toutput := []byte(input)
\tfor index, value := range output {
\t\tif value >= 'A' && value <= 'Z' { output[index] = 'A' + (value-'A'+distance)%26 }
\t}
\treturn string(output)
}

func main() {
\tciphertext := shift("MEETATNOON", ${n})
\tfmt.Printf("ciphertext=%s recovered=%s production=false\\n", ciphertext, shift(ciphertext, 26-${n}))
}`;
  }
  if (moduleId === 'crypto-go-aes-block-ciphers') {
    return `package main

import (
\t"crypto/aes"
\t"encoding/hex"
\t"fmt"
)

func main() {
\tkey := make([]byte, 16)
\tkey[0] = ${n}
\tplaintext := []byte("0123456789ABCDEF")
\tblock, err := aes.NewCipher(key)
\tif err != nil { panic(err) }
\tciphertext := make([]byte, aes.BlockSize)
\trecovered := make([]byte, aes.BlockSize)
\tblock.Encrypt(ciphertext, plaintext)
\tblock.Decrypt(recovered, ciphertext)
\tfmt.Printf("block=%d ciphertext=%s recovered=%t message_mode=false\\n", aes.BlockSize, hex.EncodeToString(ciphertext), string(recovered) == string(plaintext))
}`;
  }
  if (moduleId === 'crypto-go-modes-padding') {
    return `package main

import (
\t"crypto/aes"
\t"crypto/cipher"
\t"fmt"
)

func ctr(key, nonce, input []byte) []byte {
\tblock, err := aes.NewCipher(key)
\tif err != nil { panic(err) }
\toutput := make([]byte, len(input))
\tcipher.NewCTR(block, nonce).XORKeyStream(output, input)
\treturn output
}

func main() {
\tkey, nonce := make([]byte, 16), make([]byte, 16)
\tkey[0], nonce[15] = ${n}, 1
\tleft, right := ctr(key, nonce, []byte("PAY-ALICE-1000")), ctr(key, nonce, []byte("PAY-BOB---900"))
\tfmt.Printf("same_nonce=%t relation_leaked=%t authenticated=false production=false\\n", true, left[0]^right[0] == 'P'^'P')
}`;
  }
  if (moduleId === 'crypto-go-aead-aes-gcm') {
    return `package main

import (
\t"crypto/aes"
\t"crypto/cipher"
\t"fmt"
)

func main() {
\tkey := make([]byte, 16)
\tkey[0] = ${n}
\tblock, err := aes.NewCipher(key)
\tif err != nil { panic(err) }
\taead, err := cipher.NewGCM(block)
\tif err != nil { panic(err) }
\tnonce := make([]byte, aead.NonceSize())
\tnonce[len(nonce)-1] = ${n}
\taad := []byte("v1|tenant-a|record-${n}")
\tciphertext := aead.Seal(nil, nonce, []byte("private-evidence"), aad)
\tplaintext, openErr := aead.Open(nil, nonce, ciphertext, aad)
\ttampered := append([]byte(nil), ciphertext...)
\ttampered[len(tampered)-1] ^= 1
\t_, tamperErr := aead.Open(nil, nonce, tampered, aad)
\tfmt.Printf("opened=%t plaintext=%s tamper_rejected=%t\\n", openErr == nil, plaintext, tamperErr != nil)
}`;
  }
  if (moduleId === 'crypto-go-hashes-sha3') {
    return `package main

import (
\t"crypto/sha256"
\t"fmt"
)

func main() {
\tmessage := []byte("artifact-${n}|version=1")
\tdigest := sha256.Sum256(message)
\tchanged := sha256.Sum256(append(message, '!'))
\tfmt.Printf("digest=%x changed=%t authentic_without_trust=false\\n", digest, digest != changed)
}`;
  }
  if (moduleId === 'crypto-go-mac-hmac') {
    return `package main

import (
\t"crypto/hmac"
\t"crypto/sha256"
\t"fmt"
)

func tag(key, message []byte) []byte {
\tmac := hmac.New(sha256.New, key)
\t_, _ = mac.Write(message)
\treturn mac.Sum(nil)
}

func main() {
\tkey := []byte("request-auth-key-${n}-not-production")
\tmessage := []byte("v1|POST|/events|id=${n}")
\texpected := tag(key, message)
\tchanged := tag(key, append(message, '!'))
\tfmt.Printf("valid=%t changed_rejected=%t replay_checked_separately=true\\n", hmac.Equal(expected, tag(key, message)), !hmac.Equal(expected, changed))
}`;
  }
  if (moduleId === 'crypto-go-modular-arithmetic') {
    return `package main

import (
\t"fmt"
\t"math/big"
)

func main() {
\tbase, exponent, modulus := big.NewInt(${n + 3}), big.NewInt(13), big.NewInt(23)
\tresult := new(big.Int).Exp(base, exponent, modulus)
\tinverse := new(big.Int).ModInverse(base, modulus)
\tfmt.Printf("power=%s inverse=%s toy_only=true constant_time_unproved=true\\n", result, inverse)
}`;
  }
  if (moduleId === 'crypto-go-ecdh-x25519') {
    return `package main

import (
\t"bytes"
\t"crypto/ecdh"
\t"fmt"
)

func main() {
\tcurve := ecdh.X25519()
\tleftBytes, rightBytes := make([]byte, 32), make([]byte, 32)
\tleftBytes[31], rightBytes[31] = ${n}, ${n + 1}
\tleft, leftErr := curve.NewPrivateKey(leftBytes)
\tright, rightErr := curve.NewPrivateKey(rightBytes)
\tif leftErr != nil || rightErr != nil { panic("fixed fixture rejected") }
\tleftSecret, errLeft := left.ECDH(right.PublicKey())
\trightSecret, errRight := right.ECDH(left.PublicKey())
\tfmt.Printf("shared=%t errors=%t authenticated=false kdf_required=true\\n", bytes.Equal(leftSecret, rightSecret), errLeft == nil && errRight == nil)
}`;
  }
  if (moduleId === 'crypto-go-ed25519-ecdsa') {
    return `package main

import (
\t"crypto/ed25519"
\t"fmt"
)

func main() {
\tseed := make([]byte, ed25519.SeedSize)
\tseed[0] = ${n}
\tprivateKey := ed25519.NewKeyFromSeed(seed)
\tpublicKey := privateKey.Public().(ed25519.PublicKey)
\tmessage := []byte("update-manifest|v1|artifact-${n}")
\tsignature := ed25519.Sign(privateKey, message)
\tvalid := ed25519.Verify(publicKey, message, signature)
\tchanged := ed25519.Verify(publicKey, append(message, '!'), signature)
\tfmt.Printf("valid=%t changed_valid=%t trust_policy_required=true fixture_key_only=true\\n", valid, changed)
}`;
  }
  if (moduleId === 'crypto-go-file-stream-formats') {
    return `package main

import (
\t"crypto/aes"
\t"crypto/cipher"
\t"encoding/binary"
\t"fmt"
)

func nonceFor(size, index int) []byte {
\tnonce := make([]byte, size)
\tbinary.BigEndian.PutUint64(nonce[size-8:], uint64(index))
\treturn nonce
}

func main() {
\tkey := make([]byte, 16)
\tkey[0] = ${n}
\tblock, _ := aes.NewCipher(key)
\taead, _ := cipher.NewGCM(block)
\taad := []byte("backup-v1|file-${n}|chunk=0|final=true")
\tsealed := aead.Seal(nil, nonceFor(aead.NonceSize(), 0), []byte("bounded chunk"), aad)
\t_, validErr := aead.Open(nil, nonceFor(aead.NonceSize(), 0), sealed, aad)
\t_, reorderedErr := aead.Open(nil, nonceFor(aead.NonceSize(), 1), sealed, aad)
\tfmt.Printf("valid=%t reordered_rejected=%t final_marker_bound=true\\n", validErr == nil, reorderedErr != nil)
}`;
  }
  if (moduleId === 'crypto-go-side-channels-misuse') {
    return `package main

import (
\t"crypto/subtle"
\t"fmt"
)

func verify(expected, supplied []byte, maximum int) bool {
\tif len(expected) != 32 || len(supplied) != 32 || len(supplied) > maximum { return false }
\treturn subtle.ConstantTimeCompare(expected, supplied) == 1
}

func main() {
\texpected, changed := make([]byte, 32), make([]byte, 32)
\texpected[0], changed[0] = ${n}, ${n + 1}
\tfmt.Printf("same=%t changed=%t whole_app_constant_time_unproved=true\\n", verify(expected, expected, 32), verify(expected, changed, 32))
}`;
  }
  if (moduleId === 'crypto-go-testing-vectors-fuzz') {
    return `package main

import (
\t"crypto/hmac"
\t"crypto/sha256"
\t"encoding/hex"
\t"fmt"
)

func main() {
\tkey := []byte{0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b, 0x0b}
\tmac := hmac.New(sha256.New, key)
\t_, _ = mac.Write([]byte("Hi There"))
\tgot := hex.EncodeToString(mac.Sum(nil))
\twant := "b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7"
\tfmt.Printf("rfc_vector=%t changed_case=${n} negative_vectors_required=true\\n", got == want)
}`;
  }
  return null;
}

export function cryptographyGoWorkedExample(moduleId, seed) {
  const apiExample = cryptographyGoApiExample(moduleId, seed);
  if (apiExample) return apiExample;
  return cryptographyGoEvidenceContract({
    competencyId: `crypto-go-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `// Evidence: crypto-go-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const cryptographyGoEvidenceModuleIds = Object.freeze(Object.keys(SPECS));
