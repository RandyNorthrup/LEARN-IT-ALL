---
id: cryptography-fundamentals
title: Cryptography Fundamentals
chapterId: ch4-network-security
order: 34
duration: 85
objectives:
  - Understand symmetric and asymmetric encryption
  - Explain hashing and digital signatures
  - Implement PKI and certificate management
  - Use encryption protocols (TLS/SSL, IPsec)
  - Apply cryptography best practices
---

# Lesson 34: Cryptography Fundamentals

## Introduction

Cryptography is the practice of securing communications and data through mathematical techniques that transform readable information (plaintext) into unreadable format (ciphertext). It's the foundation of modern network security, protecting data in transit and at rest from unauthorized access, ensuring data integrity, and providing authentication.

In this lesson, we'll explore encryption algorithms, hashing functions, digital signatures, certificates, and Public Key Infrastructure (PKI) that protect network communications and verify identities.

**Key Principle:** Cryptography provides confidentiality, integrity, authentication, and non-repudiation.

## Cryptography Fundamentals

### Core Security Services

**Confidentiality:**
```
Definition: Ensuring data is accessible only to authorized parties
Method: Encryption
Example: HTTPS encrypts web traffic so eavesdroppers cannot read it

Tools:
- Symmetric encryption: AES, 3DES
- Asymmetric encryption: RSA, ECC
```

**Integrity:**
```
Definition: Ensuring data has not been altered
Method: Hashing, digital signatures
Example: File hash verifies download wasn't corrupted or tampered with

Tools:
- Hash functions: SHA-256, SHA-3
- HMAC: Keyed hash for authentication
```

**Authentication:**
```
Definition: Verifying identity of parties
Method: Digital signatures, certificates
Example: TLS certificate proves you're connected to real bank website

Tools:
- Digital signatures: RSA, DSA, ECDSA
- Certificates: X.509
```

**Non-Repudiation:**
```
Definition: Preventing denial of actions
Method: Digital signatures
Example: Digitally signed email proves sender cannot deny sending it

Requirement: Private key must be kept secret
Legal: Digital signatures legally binding in many jurisdictions
```

### Cryptographic Concepts

**Plaintext and Ciphertext:**
```
Plaintext: Original readable data
Ciphertext: Encrypted unreadable data

Example:
Plaintext:  "MEET AT DAWN"
Ciphertext: "zPmK9vL2xQn8" (after encryption)

Process:
Encryption:   Plaintext + Key → Ciphertext
Decryption:   Ciphertext + Key → Plaintext
```

**Key Space:**
```
Definition: Total number of possible keys
Calculation: 2^(key length in bits)

Examples:
- 40-bit key: 2^40 = 1.1 trillion keys (insecure - breakable in hours)
- 56-bit key (DES): 2^56 = 72 quadrillion (broken in 1999)
- 128-bit key (AES-128): 2^128 = 3.4×10^38 keys (secure)
- 256-bit key (AES-256): 2^256 = 1.1×10^77 keys (extremely secure)

Rule: Each additional bit doubles key space
```

**Cryptographic Strength:**
```
Factors:
1. Key length (longer = stronger)
2. Algorithm quality (proven algorithms)
3. Implementation quality (no coding errors)
4. Key management (secure storage, rotation)
5. Random number generation (true randomness)

Weak Link Principle:
Security is only as strong as the weakest component
Example: AES-256 with "password123" = weak
```

## Symmetric Encryption

### Symmetric Encryption Concepts

**How It Works:**
```
Single Key: Same key for encryption and decryption
Speed: Very fast (hardware acceleration)
Key Distribution Problem: How to securely share the key?

Process:
Alice                    Bob
Plaintext                Plaintext
   ↓                        ↑
Encrypt (Key)          Decrypt (Key)
   ↓                        ↑
Ciphertext  →  Network  →  Ciphertext

Challenge: Alice and Bob must share the key securely
```

**Use Cases:**
```
- Bulk data encryption (large files, disk encryption)
- VPN tunnels (IPsec, TLS data phase)
- Wireless encryption (WPA2/WPA3)
- Database encryption
- File system encryption (BitLocker, FileVault)

Reason: Much faster than asymmetric encryption
Performance: 100-1000× faster than RSA
```

### Symmetric Algorithms

**AES (Advanced Encryption Standard):**
```
Status: Current standard, NIST approved
Key Sizes: 128, 192, 256 bits
Block Size: 128 bits
Algorithm: Substitution-permutation network (Rijndael)

Strength:
- AES-128: Secure for most applications
- AES-192: High security
- AES-256: Extremely high security (classified data)

Performance:
- Hardware acceleration (AES-NI on modern CPUs)
- Billions of blocks per second

Use Cases:
- TLS/SSL (HTTPS)
- VPNs (IPsec, OpenVPN)
- Wireless (WPA2/WPA3)
- Disk encryption
- Secure communications

Example (OpenSSL):
# Encrypt file with AES-256
openssl enc -aes-256-cbc -salt -in plaintext.txt -out encrypted.bin -k MySecretPassword

# Decrypt file
openssl enc -d -aes-256-cbc -in encrypted.bin -out decrypted.txt -k MySecretPassword
```

**3DES (Triple DES):**
```
Status: Legacy, being phased out
Key Size: 168 bits (effectively 112 bits)
Block Size: 64 bits
Algorithm: DES applied three times

Process:
Encrypt(Key1) → Decrypt(Key2) → Encrypt(Key3)

Weakness:
- Slow (3× DES operations)
- Small block size (64 bits)
- Vulnerable to birthday attacks

Replacement: AES
Use: Legacy systems only (banking, old equipment)
```

**DES (Data Encryption Standard):**
```
Status: BROKEN, do not use
Key Size: 56 bits (too small)
Broken: 1999 (brute-forced in 22 hours)

History:
- 1977: NIST standard
- 1998: EFF broke it in 56 hours ($250,000 machine)
- 1999: Broken in 22 hours (distributed.net)

Lesson: 56-bit keys no longer secure
Replacement: AES
```

### Block Cipher Modes

**ECB (Electronic Codebook) - DO NOT USE:**
```
How It Works:
- Each block encrypted independently
- Same plaintext block → same ciphertext block

Problem: Patterns visible
Example: Encrypted image shows outline of original

Plaintext:  [Block1] [Block2] [Block1] [Block3]
Ciphertext: [Crypt1] [Crypt2] [Crypt1] [Crypt3]
                                 ↑
                        Pattern reveals duplicate blocks

Status: Insecure, never use
```

**CBC (Cipher Block Chaining) - Common:**
```
How It Works:
- Each block XORed with previous ciphertext before encryption
- Requires Initialization Vector (IV) for first block
- IV must be unpredictable (random)

Process:
Block1: Plaintext1 XOR IV → Encrypt → Ciphertext1
Block2: Plaintext2 XOR Ciphertext1 → Encrypt → Ciphertext2
Block3: Plaintext3 XOR Ciphertext2 → Encrypt → Ciphertext3

Advantages:
- No patterns (same plaintext → different ciphertext)
- Widely supported

Disadvantages:
- Sequential (cannot parallelize encryption)
- Padding oracle attacks (if not implemented correctly)

Use: TLS (with AEAD preferred), VPNs, disk encryption
```

**GCM (Galois/Counter Mode) - Modern Best Practice:**
```
How It Works:
- Counter mode for encryption (parallelizable)
- Galois field multiplication for authentication (AEAD)
- Provides both confidentiality and integrity

Advantages:
- Fast (parallelizable)
- Authenticated encryption (detects tampering)
- No padding oracle attacks
- Hardware acceleration (AES-GCM)

Use: TLS 1.3 (mandatory), IPsec, SSH

Example TLS Cipher Suite:
TLS_AES_256_GCM_SHA384
^   ^   ^   ^   ^
|   |   |   |   HMAC algorithm (SHA-384)
|   |   |   Mode (GCM - authenticated encryption)
|   |   Key size (256 bits)
|   Algorithm (AES)
Protocol (TLS)
```

**CTR (Counter Mode):**
```
How It Works:
- Encrypts counter values
- XOR result with plaintext
- Parallelizable (fast)

Advantage: Turns block cipher into stream cipher
Use: Disk encryption, high-performance applications
```

### Stream Ciphers

**How They Work:**
```
Concept: Encrypt one bit/byte at a time (not blocks)
Method: XOR plaintext with keystream

Process:
Keystream: Pseudo-random stream generated from key
Plaintext:  01101001 01110100
Keystream:  10110101 11001010
Ciphertext: 11011100 10111110 (Plaintext XOR Keystream)

Advantages:
- No padding needed
- Low latency (real-time)

Disadvantages:
- Keystream must never repeat
- If keystream reused: Plaintext1 XOR Plaintext2 = Ciphertext1 XOR Ciphertext2 (broken!)
```

**RC4 (Rivest Cipher 4):**
```
Status: BROKEN, do not use
Key Size: 40-2048 bits (variable)
Use: Legacy (WEP, old TLS)

Vulnerabilities:
- Biases in keystream
- Key reuse attacks
- WEP broken due to RC4 weakness

Replacement: AES-GCM, ChaCha20
```

**ChaCha20:**
```
Status: Modern, secure alternative to AES
Key Size: 256 bits
Designer: Daniel Bernstein (also created Curve25519)

Advantages:
- Constant-time (resistant to timing attacks)
- Fast in software (no hardware acceleration needed)
- Secure

Use:
- ChaCha20-Poly1305 (authenticated encryption)
- TLS (Google's preference on mobile)
- WireGuard VPN
- OpenSSH

Example Cipher Suite:
TLS_CHACHA20_POLY1305_SHA256
```

## Asymmetric Encryption

### Asymmetric Encryption Concepts

**How It Works:**
```
Key Pair: Public key (shareable) + Private key (secret)
Encryption: Encrypt with public key, decrypt with private key
Digital Signature: Sign with private key, verify with public key

Key Distribution:
- Public key: Freely distributed (everyone can have it)
- Private key: Never shared (kept secret)

Alice                              Bob
Alice's Private Key                Bob's Public Key (from certificate)
Alice's Public Key (shared)        Bob's Private Key

Alice encrypts with Bob's public key → Only Bob can decrypt with his private key
Bob encrypts with Alice's public key → Only Alice can decrypt with her private key
```

**Use Cases:**
```
1. Key Exchange: Securely share symmetric key
   - Alice encrypts AES key with Bob's public key
   - Bob decrypts with his private key
   - Both now have shared AES key for bulk encryption

2. Digital Signatures: Prove identity/integrity
   - Alice signs document with her private key
   - Bob verifies with Alice's public key
   - Proves Alice signed it, not tampered

3. Authentication: Verify identity
   - TLS certificates
   - SSH key authentication
```

### Asymmetric Algorithms

**RSA (Rivest-Shamir-Adleman):**
```
Status: Widely used, being phased out (performance, key size)
Key Size: 2048, 3072, 4096 bits
Algorithm: Based on factoring large prime numbers

Strength:
- RSA-1024: Deprecated (breakable)
- RSA-2048: Current minimum (secure until ~2030)
- RSA-3072: High security
- RSA-4096: Maximum security (slow)

Performance: Slow (1000× slower than AES)

Use Cases:
- TLS certificates (key exchange)
- SSH key authentication
- Email encryption (PGP/GPG)
- Code signing

Generate RSA Key Pair:
# 2048-bit RSA private key
openssl genrsa -out private_key.pem 2048

# Extract public key
openssl rsa -in private_key.pem -pubout -out public_key.pem

# View key details
openssl rsa -in private_key.pem -text -noout
```

**DSA (Digital Signature Algorithm):**
```
Status: Legacy, replaced by RSA/ECDSA
Key Size: 1024, 2048, 3072 bits
Use: Digital signatures only (not encryption)

Limitation: 1024-bit DSA deprecated (too weak)
Replacement: RSA, ECDSA
```

**ECC (Elliptic Curve Cryptography):**
```
Concept: Based on elliptic curve mathematics
Advantage: Smaller keys = same security as RSA

Key Size Comparison (equivalent security):
- ECC-256 = RSA-3072
- ECC-384 = RSA-7680
- ECC-512 = RSA-15360

Benefits:
- Faster than RSA
- Smaller certificates
- Less bandwidth
- Lower power (mobile devices)

Common Curves:
- P-256 (secp256r1): 128-bit security, widely supported
- P-384 (secp384r1): 192-bit security
- Curve25519: 128-bit security, modern, fast
- Curve448: 224-bit security, modern

Example: Generate ECC key (Curve25519)
openssl genpkey -algorithm X25519 -out ecc_private.pem
openssl pkey -in ecc_private.pem -pubout -out ecc_public.pem
```

**ECDSA (Elliptic Curve Digital Signature Algorithm):**
```
Purpose: Digital signatures using ECC
Advantages: Smaller signatures, faster than RSA

Use Cases:
- TLS certificates (increasingly common)
- Bitcoin/cryptocurrency transactions
- Code signing
- SSH keys (Ed25519)

Example: Generate SSH key with Ed25519
ssh-keygen -t ed25519 -C "user@example.com"
# Creates ~/.ssh/id_ed25519 (private) and ~/.ssh/id_ed25519.pub (public)
```

**Diffie-Hellman (DH / ECDH):**
```
Purpose: Key exchange (not encryption or signing)
Concept: Two parties establish shared secret over insecure channel

How It Works:
1. Alice and Bob agree on parameters (group, generator)
2. Alice generates private key a, calculates public A = g^a mod p
3. Bob generates private key b, calculates public B = g^b mod p
4. They exchange public values (A and B)
5. Alice calculates shared secret: S = B^a mod p
6. Bob calculates shared secret: S = A^b mod p
7. Both have same shared secret S without transmitting it

Result: Shared secret used as symmetric key (AES)

Variants:
- DH: Original (discrete logarithm)
- ECDH: Elliptic curve version (faster, smaller keys)
- DHE: Ephemeral DH (perfect forward secrecy)
- ECDHE: Ephemeral ECDH (modern TLS standard)

Example TLS Cipher Suite (ECDHE):
TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
    ^^^^^
    Ephemeral Elliptic Curve Diffie-Hellman key exchange
```

## Hashing

### Hash Function Concepts

**What is a Hash?**
```
Definition: One-way function that produces fixed-size output (digest)
Properties:
1. Deterministic: Same input always produces same hash
2. Fast: Quick to compute
3. One-way: Cannot reverse hash to get input
4. Avalanche effect: Small input change → completely different hash
5. Collision-resistant: Hard to find two inputs with same hash

Example:
Input: "Hello World"
SHA-256: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e

Input: "Hello World!"  (added "!")
SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                       ^^^^ Completely different
```

**Uses:**
```
1. Data Integrity: Verify file not tampered with
   - Download hash published on website
   - Calculate hash of downloaded file
   - Compare: if same, file intact

2. Password Storage: Never store plaintext passwords
   - Store hash of password
   - Login: Hash entered password, compare with stored hash
   - Attacker with database cannot retrieve passwords

3. Digital Signatures: Hash document, sign hash
   - More efficient than signing entire document

4. Blockchain: Each block contains hash of previous block
   - Tamper-evident chain

5. HMAC: Keyed hash for message authentication
```

### Hash Algorithms

**MD5 (Message Digest 5):**
```
Status: BROKEN, do not use
Output: 128 bits (32 hex characters)
Broken: 2008 (collision attack)

Example:
echo -n "Hello World" | md5sum
b10a8db164e0754105b7a99be72e3fe5

Vulnerability: Collision attacks (different inputs, same hash)
Use: Legacy only (backwards compatibility)
Replacement: SHA-256 or better
```

**SHA-1 (Secure Hash Algorithm 1):**
```
Status: DEPRECATED, do not use for security
Output: 160 bits (40 hex characters)
Broken: 2017 (Google demonstrated collision)

Example:
echo -n "Hello World" | sha1sum
0a4d55a8d778e5022fab701977c5d840bbc486d0

Timeline:
- 1995: Published by NIST
- 2005: Theoretical attacks
- 2017: Practical collision (Google)
- 2020: Deprecated by major browsers

Use: Git (for non-security purposes), legacy
Replacement: SHA-256 or SHA-3
```

**SHA-2 Family:**
```
Status: Current standard
Variants: SHA-224, SHA-256, SHA-384, SHA-512
Output: 224, 256, 384, 512 bits

SHA-256 (most common):
echo -n "Hello World" | sha256sum
a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e

SHA-512:
echo -n "Hello World" | sha512sum
2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b

Use Cases:
- SHA-256: TLS, certificates, Bitcoin, general use
- SHA-384: High-security TLS
- SHA-512: Very high-security applications

Performance: SHA-256 optimized for 32-bit, SHA-512 for 64-bit
```

**SHA-3:**
```
Status: Modern alternative to SHA-2
Algorithm: Keccak (different from SHA-2)
Output: 224, 256, 384, 512 bits (same as SHA-2)

Advantages:
- Different algorithm (not vulnerable to same attacks as SHA-2)
- More secure against length extension attacks

Use: Future-proofing (SHA-2 still recommended)

Example:
echo -n "Hello World" | openssl dgst -sha3-256
SHA3-256(stdin)= 592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba
```

### Password Hashing

**Weak: Direct Hashing (Don't Do This):**
```
Problem: Fast hashes make brute-forcing easy

Example (bad):
password = "password123"
hash = SHA256(password)
# Attacker can try billions of passwords per second

Problem 2: Same password = same hash
# If two users have same password, hashes match (rainbow tables)
```

**Salt:**
```
Definition: Random value added to password before hashing
Purpose: Same password → different hashes (per user)

Example:
User 1: SHA256("password123" + "k3J8mQ2n") = hash1
User 2: SHA256("password123" + "9xL5pR4t") = hash2
# hash1 ≠ hash2 despite same password

Salt storage: Store salt with hash (not secret)
Format: $algorithm$salt$hash
```

**bcrypt (Recommended):**
```
Purpose: Slow hash designed for passwords
Algorithm: Based on Blowfish cipher
Cost factor: Adjustable work factor (2^cost iterations)

Format:
$2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW
^  ^  ^                              ^
|  |  Salt (22 characters)           Hash (31 characters)
|  Cost factor (12 = 2^12 = 4096 iterations)
Algorithm (2b = bcrypt)

Cost factor impact:
- 10: ~100ms (fast, acceptable for logins)
- 12: ~300ms (recommended minimum)
- 14: ~1200ms (high security)

As hardware improves, increase cost factor
```

**scrypt (Recommended):**
```
Purpose: Memory-hard hash (resist GPU/ASIC attacks)
Parameters: N (CPU/memory cost), r (block size), p (parallelization)

Advantage: Requires large amounts of memory
Benefit: Expensive to attack with specialized hardware (GPUs, FPGAs)

Use: Cryptocurrency, high-security applications

Example (Cisco IOS):
username admin algorithm-type scrypt secret AdminPassword
```

**Argon2 (Modern Best Practice):**
```
Status: Winner of Password Hashing Competition (2015)
Variants:
- Argon2i: Resistant to side-channel attacks (password hashing)
- Argon2d: Resistant to GPU attacks (cryptocurrency)
- Argon2id: Hybrid (recommended)

Parameters: Memory, iterations, parallelism
Benefit: Best resistance to all attack types

Recommendation: Use Argon2id for new applications
```

### HMAC (Hash-Based Message Authentication Code)

**Purpose:**
```
Provides: Message authentication and integrity
Uses: Keyed hash (requires secret key)

Difference from hash:
- Hash: Anyone can compute (no key)
- HMAC: Only those with key can compute/verify

Formula:
HMAC(K, m) = H((K ⊕ opad) || H((K ⊕ ipad) || m))
Where:
- K = secret key
- m = message
- H = hash function (SHA-256)
- opad/ipad = padding constants
- || = concatenation
- ⊕ = XOR
```

**Use Cases:**
```
1. API Authentication:
   HMAC-SHA256(API_secret, request_data) = signature
   Server verifies signature to authenticate request

2. Message Integrity:
   Send: Message + HMAC(key, message)
   Receiver verifies HMAC to ensure message not tampered

3. JWT (JSON Web Tokens):
   Signature = HMAC-SHA256(secret, header + payload)

4. IPsec:
   HMAC-SHA256 for packet authentication
```

**Example (OpenSSL):**
```bash
# Generate HMAC-SHA256
echo -n "Hello World" | openssl dgst -sha256 -hmac "secret_key"
HMAC-SHA256(stdin)= 9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7

# Different key = different HMAC (even same message)
echo -n "Hello World" | openssl dgst -sha256 -hmac "different_key"
HMAC-SHA256(stdin)= 7f03c16ade2e3f4c1f6c24f8e6b1a85d4a20e96f7d6c8a5e4b3c2d1e0f9e8d7c
```

## Digital Signatures

### How Digital Signatures Work

**Process:**
```
Signing (Alice):
1. Hash the document (SHA-256)
2. Encrypt hash with Alice's private key = signature
3. Send: Document + signature

Verification (Bob):
1. Hash the received document (SHA-256)
2. Decrypt signature with Alice's public key = original hash
3. Compare: If hashes match, signature valid

Proves:
- Authentication: Alice signed it (only she has private key)
- Integrity: Document not modified (hash would differ)
- Non-repudiation: Alice cannot deny signing (her private key)
```

**Why Hash First?**
```
Efficiency: Signing entire document is slow
Solution: Sign small hash instead (256 bits)

Example:
- Document: 1 GB
- SHA-256 hash: 256 bits (32 bytes)
- Sign 32 bytes instead of 1 GB (much faster)
```

### Digital Signature Standards

**RSA Signatures:**
```
Algorithm: RSA-PSS (Probabilistic Signature Scheme)
Key Size: 2048+ bits
Hash: SHA-256 or better

Example:
# Sign file
openssl dgst -sha256 -sign private_key.pem -out signature.bin document.pdf

# Verify signature
openssl dgst -sha256 -verify public_key.pem -signature signature.bin document.pdf
Verified OK
```

**ECDSA (Elliptic Curve Digital Signature Algorithm):**
```
Advantage: Smaller signatures than RSA
Performance: Faster than RSA
Key Size: 256 bits (ECC) = 3072 bits (RSA)

Use: Modern TLS, cryptocurrency (Bitcoin), SSH (Ed25519)

Example:
# Generate ECC key
openssl ecparam -genkey -name prime256v1 -out ecc_private.pem

# Sign file
openssl dgst -sha256 -sign ecc_private.pem -out signature.bin document.pdf
```

**Ed25519 (Edwards-curve Digital Signature Algorithm):**
```
Status: Modern, fast, secure
Key Size: 256 bits
Performance: Much faster than RSA/ECDSA

Advantages:
- Constant-time (resistant to timing attacks)
- No random number required (deterministic)
- Small keys and signatures
- Fast verification

Use: SSH, modern applications, cryptocurrency

Example:
# Generate SSH key with Ed25519
ssh-keygen -t ed25519 -C "user@example.com"
```

## Review Questions

1. **What is the difference between symmetric and asymmetric encryption?**
   - Symmetric uses one key (fast, bulk encryption), asymmetric uses key pair (slower, key exchange/signatures)

2. **What is the current recommended symmetric encryption algorithm?**
   - AES (128, 192, or 256-bit keys)

3. **Why is ECB mode insecure?**
   - Same plaintext blocks produce same ciphertext blocks, revealing patterns

4. **What is GCM and why is it preferred?**
   - Galois/Counter Mode provides authenticated encryption (confidentiality + integrity), parallelizable, modern standard

5. **What is the key size comparison between ECC and RSA?**
   - ECC-256 ≈ RSA-3072 (ECC much smaller for equivalent security)

6. **What is the difference between a hash and HMAC?**
   - Hash is keyless (anyone can compute), HMAC is keyed (requires secret key for authentication)

7. **Why should passwords never be hashed with SHA-256 directly?**
   - Too fast (brute-force easy), no salt (rainbow tables), use bcrypt/scrypt/Argon2 instead

8. **What does a digital signature prove?**
   - Authentication (signer identity), integrity (not modified), non-repudiation (cannot deny)

9. **What is Perfect Forward Secrecy?**
   - Ephemeral keys (DHE/ECDHE) ensure compromise of long-term key doesn't compromise past sessions

10. **Why is SHA-1 deprecated?**
    - Collision attacks demonstrated (Google 2017), no longer cryptographically secure

## Key Takeaways

- **AES** is the current symmetric encryption standard (GCM mode preferred)
- **RSA** is being phased out in favor of **ECC** (smaller keys, better performance)
- **SHA-256** or better for hashing (SHA-1 and MD5 deprecated)
- **bcrypt/scrypt/Argon2** for password hashing (never SHA-256 directly)
- **HMAC** provides keyed authentication (message integrity + authentication)
- **Digital signatures** prove identity and integrity (non-repudiation)
- **ECDHE** provides perfect forward secrecy (modern TLS requirement)
- **Key management** is critical (cryptography only as strong as weakest link)

## Next Steps

In the next lesson, we'll explore **VPNs and Remote Access**, including IPsec, SSL VPN, and secure remote connectivity.

---

**Lesson Complete!** You now understand cryptographic algorithms and techniques that protect data confidentiality, integrity, and authenticity.
