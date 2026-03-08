---
id: lesson-056-wireless-security-protocols
title: "Wireless Security Protocols"
chapterId: ch6-wireless-networking
order: 56
duration: 55
objectives:
  - Compare WEP, WPA, WPA2, and WPA3 security protocols
  - Understand encryption methods (TKIP, CCMP, AES)
  - Explain authentication modes (Open, PSK, Enterprise)
  - Identify wireless security best practices
  - Understand common wireless attacks and mitigations
---

# Lesson 56: Wireless Security Protocols

## Introduction

Wireless network security presents unique challenges that wired networks do not face. Unlike Ethernet traffic confined to physical cables, radio signals propagate through walls, floors, and open air — anyone within range can potentially intercept transmissions. This fundamental reality makes robust encryption and authentication protocols essential for every wireless deployment.

*This lesson provides an in-depth analysis of wireless security protocol internals and cryptographic mechanisms. For wireless attack techniques, defensive strategies, and security operations, see [Lesson 38: Wireless Security](lesson-038-wireless-security).*

This lesson traces the evolution of wireless security from the fatally flawed WEP through WPA and WPA2 to the modern WPA3 standard. For each protocol, we examine the underlying cryptographic mechanisms, authentication processes, known vulnerabilities, and real-world attack vectors. Understanding this progression is critical for both the CompTIA Network+ exam and for making informed security decisions in production environments.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Compare WEP, WPA, WPA2, and WPA3 security protocols
- Understand encryption methods (TKIP, CCMP, AES)
- Explain authentication modes (Open, PSK, Enterprise)
- Identify wireless security best practices
- Understand common wireless attacks and mitigations

---

## Wireless Security Evolution

### Why Wireless Security Matters

Wired networks require physical access to tap a cable. Wireless networks broadcast data through the air — an attacker with a laptop and a Wi-Fi adapter in a parking lot can capture every frame. This means:

- **Confidentiality**: Without encryption, all data is readable by any receiver
- **Integrity**: Without message integrity checks, frames can be modified in transit
- **Authentication**: Without proper authentication, unauthorized devices can join the network
- **Availability**: Without management frame protection, attackers can disconnect legitimate clients

### Security Protocol Timeline

| Protocol | Year | Encryption Algorithm | Cipher | Auth Modes | Status | Key Length |
|----------|------|---------------------|--------|------------|--------|------------|
| **WEP** | 1999 | RC4 (stream) | WEP | Open/Shared | Broken | 64/128-bit |
| **WPA** | 2003 | RC4 (stream) | TKIP | PSK/802.1X | Deprecated | 128-bit |
| **WPA2** | 2004 | AES (block) | CCMP | PSK/802.1X | Current | 128-bit |
| **WPA3** | 2018 | AES (block) | GCMP-256 | SAE/802.1X | Modern | 128/192/256-bit |

---

## WEP (Wired Equivalent Privacy)

### Overview

WEP was the **original security protocol** defined in the IEEE 802.11 standard (1999). Its stated goal was to provide confidentiality equivalent to that of a wired LAN — a goal it failed to achieve.

- **Standard**: IEEE 802.11 (original)
- **Year**: 1999
- **Encryption**: RC4 stream cipher
- **Status**: **Completely broken — NEVER use**
- **Deprecated**: Officially removed from 802.11i (2004)

### How WEP Works

WEP encrypts each frame using the **RC4 stream cipher** with a key composed of a static secret key concatenated with a per-frame **Initialization Vector (IV)**.

```
WEP Encryption Process:

  Plaintext Data                  WEP Key (40 or 104 bits)
       |                                |
       v                                v
  +----------+              +-----------+-----------+
  | CRC-32   |              | IV (24 bits) | Secret Key |
  | Checksum |              +-----------+-----------+
  +----------+                        |
       |                              v
       v                    +-------------------+
  Plaintext + ICV           | RC4 Key Schedule  |
       |                    +-------------------+
       |                              |
       v                              v
       +----------XOR----------------+
                    |
                    v
              Ciphertext
                    |
                    v
  Transmitted Frame: [IV (cleartext)] [Ciphertext]
```

### WEP Key Sizes

| WEP Variant | IV Size | Secret Key | Total Key Material | Marketing Name |
|-------------|---------|------------|-------------------|----------------|
| WEP-64 | 24 bits | 40 bits | 64 bits | "64-bit WEP" |
| WEP-128 | 24 bits | 104 bits | 128 bits | "128-bit WEP" |

### WEP Vulnerabilities — Why It Is Completely Broken

**1. Initialization Vector (IV) Weakness**:
- Only 24 bits long = 2^24 = 16,777,216 possible values
- On a busy network, IVs repeat within **hours** (often minutes)
- IV reuse with the same key produces identical RC4 keystreams
- XOR of two ciphertexts encrypted with the same keystream reveals plaintext

**2. IV Transmitted in Cleartext**:
- The IV is prepended to every frame **unencrypted**
- Attacker knows the IV and can observe which IVs produce weak key schedules
- Certain "weak IVs" (Fluhrer-Mantin-Shamir attack) leak key bytes

**3. Static Keys**:
- WEP keys are manually configured and **never change automatically**
- All users share the same key
- If one device is compromised, the entire network is compromised
- Key rotation requires manual reconfiguration of every device

**4. No Integrity Protection**:
- CRC-32 is a checksum, not a cryptographic hash
- CRC-32 is **linear** — an attacker can modify a packet and recalculate the CRC without knowing the key
- Enables bit-flipping attacks and packet injection

**5. No Replay Protection**:
- WEP has no sequence counter
- Captured frames can be replayed to generate traffic (accelerating IV collection)

### RC4 Stream Cipher Weakness

WEP's fundamental cryptographic failure lies in how it constructs the per-packet RC4 key. Understanding this mechanism reveals why WEP is irrecoverable — no configuration can fix its broken design.

**IV + Key Concatenation (The Fatal Design Flaw)**

RC4 requires a key to initialize its internal state (the Key Scheduling Algorithm, or KSA). WEP constructs this key by directly **concatenating** the 24-bit IV with the static secret key:

```
WEP Per-Packet Key Construction:

  +----------+-------------------+
  | IV       | Secret Key        |
  | (24 bits)| (40 or 104 bits)  |
  +----------+-------------------+
       ↓
  RC4 Key Scheduling Algorithm (KSA)
       ↓
  256-byte permutation table (S-box)
       ↓
  Pseudo-Random Generation Algorithm (PRGA)
       ↓
  Keystream XORed with plaintext
```

This concatenation creates **related keys** — keys that share a common suffix (the static secret key) and differ only in the first 3 bytes (the IV). This structure enables the Fluhrer-Mantin-Shamir (FMS) attack.

**The FMS Attack Principle (2001)**

Fluhrer, Mantin, and Shamir discovered that certain IV values (called "weak IVs") cause the first few bytes of the RC4 keystream to correlate with specific key bytes. The attack exploits the KSA's sequential processing:

1. **RC4 KSA processes key bytes sequentially**: The algorithm initializes a 256-byte S-box by swapping elements based on each key byte in order. Bytes 0–2 are the IV (known to the attacker), bytes 3+ are the secret key (unknown).

2. **Weak IVs create predictable S-box states**: When the IV has the form `(A+3, N-1, X)` (where A is the key byte index being targeted and N is 256), the S-box state after processing the IV bytes is partially predictable.

3. **Keystream byte leaks key byte**: For these weak IVs, the first output byte of the PRGA correlates with the next unknown key byte with probability ~5% (vs. 0.39% for random chance).

4. **Statistical accumulation**: By collecting frames encrypted with many weak IVs (approximately 60 per key byte for 99% confidence), each byte of the secret key can be individually recovered.

```
FMS Attack — Key Byte Recovery:

  For each key byte position A (0 to 12 for WEP-128):
    1. Collect frames with IVs of form (A+3, 255, X)
    2. For each frame:
       - Known: IV, first ciphertext byte, first plaintext byte
         (SNAP header = 0xAA)
       - Compute: first keystream byte = ciphertext ⊕ plaintext
       - Run KSA for first A+3 steps
         (using known IV + previously recovered key bytes)
       - Vote: keystream byte → candidate for key[A]
    3. Most voted value = key[A] (with ~5% signal per weak IV)

  Result: Each key byte recovered independently
  Complexity: O(n) where n = key length in bytes (not exponential!)
```

**Later Improvements (PTW Attack, 2007)**

The Pyshkin-Tews-Weinmann (PTW) attack extended FMS by exploiting correlations in *all* IVs (not just weak ones), reducing the required number of captured frames from ~500,000 to approximately 40,000 for WEP-128. This made WEP cracking possible in under one minute on a busy network.

**Why No Fix Is Possible**

WEP's failure is architectural, not implementational:
- The IV is too short (24 bits) to avoid reuse
- The key construction (concatenation) cannot be changed without breaking the protocol
- RC4's KSA is inherently vulnerable to related-key analysis
- The integrity check (CRC-32) is linear and provides no cryptographic protection
- No key derivation function separates the IV from the key material

**Verdict**: **WEP's cryptographic design is fundamentally and irreparably broken. It can be cracked in minutes with freely available tools. Never deploy WEP on any network.**

---

## WPA (Wi-Fi Protected Access)

### Overview

WPA was an **interim solution** released in 2003 by the Wi-Fi Alliance while the full IEEE 802.11i security standard (WPA2) was being finalized. It was designed to run on existing WEP-era hardware through firmware upgrades.

- **Standard**: Based on IEEE 802.11i draft
- **Year**: 2003
- **Encryption**: TKIP (still uses RC4 internally)
- **Status**: **Deprecated — avoid if possible**

### TKIP (Temporal Key Integrity Protocol)

TKIP was engineered to fix WEP's worst flaws while remaining compatible with WEP hardware (which could only run RC4). Key improvements:

| WEP Problem | TKIP Solution |
|-------------|---------------|
| 24-bit IV (repeats quickly) | 48-bit IV (sequence counter) — won't repeat for decades |
| Static keys | Per-packet key mixing — unique key per packet |
| No integrity check | MIC (Message Integrity Check) using Michael algorithm |
| No replay protection | Sequence counter rejects out-of-order packets |
| Shared key for all users | Pairwise keys derived per session |

### MIC (Message Integrity Check) — The Michael Algorithm

The MIC provides frame integrity verification. However, the Michael algorithm is cryptographically weak compared to later solutions:
- Designed for hardware-constrained WEP-era chipsets
- Includes **MIC countermeasures**: if two MIC failures occur within 60 seconds, the AP shuts down TKIP for 60 seconds (denial-of-service risk)

### WPA Authentication Modes

**WPA-Personal (WPA-PSK)**:
- Pre-Shared Key (PSK) — same passphrase configured on AP and all clients
- 8-63 character ASCII passphrase (or 64-character hex)
- PSK is combined with SSID to derive PMK (Pairwise Master Key)
- Suitable for home and small office

**WPA-Enterprise (WPA-802.1X)**:
- Centralized authentication via RADIUS server
- Each user has unique credentials
- EAP (Extensible Authentication Protocol) methods
- Suitable for business environments

### WPA Vulnerabilities

**1. TKIP Weaknesses**:
- Still based on RC4 (inherited structural weaknesses)
- Beck-Tews attack (2008) can decrypt short packets and inject frames
- Ohigashi-Morii attack accelerates this further

**2. PSK Dictionary Attacks**:
- Weak passphrases can be cracked via offline dictionary attack on captured 4-way handshake
- Rainbow tables exist for common SSIDs

**Verdict**: **WPA was a necessary bridge from WEP but should not be used today. Deploy WPA2 or WPA3 instead.**

---

## WPA2 (Wi-Fi Protected Access 2)

### Overview

WPA2 implements the **full IEEE 802.11i** security standard and has been the dominant wireless security protocol since its introduction. It replaces TKIP/RC4 with the far stronger **CCMP/AES** combination.

- **Standard**: IEEE 802.11i (full)
- **Year**: 2004 (mandatory for Wi-Fi certification since 2006)
- **Encryption**: CCMP using AES
- **Status**: **Current standard — secure when properly configured**

### CCMP (Counter Mode with CBC-MAC Protocol)

CCMP provides both **confidentiality** (encryption) and **integrity** (message authentication) using the AES block cipher:

| Component | Function | Details |
|-----------|----------|---------|
| Counter Mode (CTR) | Encryption | AES encrypts incrementing counter values; output XORed with plaintext |
| CBC-MAC | Integrity | Cipher Block Chaining MAC produces a cryptographic integrity check |
| AES | Core Cipher | 128-bit block cipher, 128-bit key, extremely well-analyzed |
| Replay Protection | Freshness | 48-bit packet number prevents replay attacks |

**Why AES/CCMP Is Far Superior to RC4/TKIP**:
- AES is a **block cipher** (processes fixed 128-bit blocks) vs. RC4's stream cipher (processes byte-by-byte)
- AES has undergone extensive cryptanalysis with no practical attacks found
- CBC-MAC provides a true cryptographic integrity check (not the weak Michael or CRC-32)
- CCMP was designed from scratch for security, not constrained by legacy hardware

### AES-CCMP Detailed Operation

CCMP (Counter Mode with CBC-MAC Protocol) combines two AES-based operations into a single authenticated encryption scheme. Understanding its internal mechanics reveals why WPA2 provides robust security.

**CCM Mode (Counter with CBC-MAC)**

CCM is an authenticated encryption mode defined in NIST SP 800-38C. It uses a single AES key for both confidentiality (via Counter mode) and integrity (via CBC-MAC), applied in a specific order:

```
CCMP Encryption Process (per MPDU):

  Input: Plaintext frame data, AAD (Additional Authentication Data)
         AES Key (TK, 128 bits), Packet Number (PN, 48 bits)

  Step 1: Construct Nonce (104 bits)
  +----------+-----------+-----------+
  | Priority | Source    | Packet    |
  | (8 bits) | Address   | Number    |
  |          | (48 bits) | (48 bits) |
  +----------+-----------+-----------+

  Step 2: CBC-MAC (Integrity — computed FIRST)
  +---------+     +---------+     +---------+     +---------+
  | B_0     |---->| AES-Enc |---->| ⊕ B_1   |---->| AES-Enc |---> ...
  | (nonce  |     |         |     | (AAD    |     |         |
  |  block) |     |         |     |  block) |     |         |
  +---------+     +---------+     +---------+     +---------+
                                                        |
                                                        v
                                                  MIC (64 bits)
                                              (truncated CBC-MAC)

  Step 3: Counter Mode (Encryption — applied SECOND)
  +---------+     +---------+
  | Ctr_0   |---->| AES-Enc |----> XOR with MIC → Encrypted MIC
  +---------+     +---------+
  +---------+     +---------+
  | Ctr_1   |---->| AES-Enc |----> XOR with Plaintext[0:15] → Ciphertext[0:15]
  +---------+     +---------+
  +---------+     +---------+
  | Ctr_2   |---->| AES-Enc |----> XOR with Plaintext[16:31] → Ciphertext[16:31]
  +---------+     +---------+
  ...

  Output: [CCMP Header (PN) | Ciphertext | Encrypted MIC]
```

**Nonce Construction**

The CCMP nonce ensures that each encrypted frame uses a unique AES input, preventing keystream reuse. It is constructed from three fields:

| Field | Size | Source | Purpose |
|-------|------|--------|---------|
| Priority | 8 bits | QoS TID (or 0) | Prevents cross-priority nonce collision |
| Source Address (A2) | 48 bits | Transmitter MAC | Prevents cross-device nonce collision |
| Packet Number (PN) | 48 bits | Incrementing counter | Prevents same-device nonce reuse |

The 48-bit Packet Number (PN) is a strictly incrementing counter. At 1,000 frames/second, it would take approximately 8,900 years to wrap around (2^48 ≈ 281 trillion). This eliminates the IV-reuse problem that destroyed WEP.

**Why Replay Protection Works**

CCMP's replay protection is built into the PN:

1. The receiver maintains the **highest PN seen** for each transmitter
2. Any frame with a PN ≤ the last received PN is **silently discarded**
3. Since the PN is authenticated by CBC-MAC, an attacker cannot modify it without invalidating the MIC
4. This creates a cryptographically enforced ordering — replayed or reordered frames are automatically rejected

**Encrypt-then-MAC in Practice**

Although CCM technically computes MAC-then-encrypt (the CBC-MAC is calculated over the plaintext, then the MIC is encrypted along with the data), the Counter mode encryption of the MIC creates an effective encrypt-then-MAC construction. The receiver first decrypts everything, then verifies the MIC over the recovered plaintext — if verification fails, the frame is silently discarded before any further processing.

### Key Hierarchy

WPA2 uses a rigorous key hierarchy to derive unique, session-specific encryption keys from either a pre-shared key or RADIUS-provided credentials. Each level of the hierarchy serves a distinct purpose, and understanding the exact derivation steps is essential for analyzing protocol security.

**PSK to PMK Derivation**

In Personal mode, the PMK is derived from the passphrase using PBKDF2 (Password-Based Key Derivation Function 2):

```
PMK = PBKDF2(SHA-1, Passphrase, SSID, 4096, 256)

Parameters:
  - PRF:         SHA-1 (HMAC-SHA-1 internally)
  - Password:    The ASCII passphrase (8-63 characters)
  - Salt:        The SSID (network name, up to 32 bytes)
  - Iterations:  4096 (fixed by specification)
  - Output:      256 bits (32 bytes) = the PMK
```

In Enterprise mode, the PMK is derived from the Master Session Key (MSK) provided by the RADIUS server after successful EAP authentication. The MSK is typically 512 bits; the first 256 bits become the PMK.

**PMK to PTK Derivation (4-Way Handshake)**

The Pairwise Transient Key (PTK) is derived during the 4-way handshake using the PRF-X (Pseudo-Random Function) with the following inputs:

```
PTK = PRF-X(PMK, "Pairwise key expansion",
            Min(AA, SPA) || Max(AA, SPA) ||
            Min(ANonce, SNonce) || Max(ANonce, SNonce))

Inputs:
  - PMK:     256 bits (Pairwise Master Key)
  - Label:   "Pairwise key expansion" (fixed string)
  - AA:      Authenticator Address (AP MAC, 48 bits)
  - SPA:     Supplicant Address (Client MAC, 48 bits)
  - ANonce:  Authenticator Nonce (random, 256 bits)
  - SNonce:  Supplicant Nonce (random, 256 bits)

  Min/Max ensures both sides compute identical input
  regardless of which MAC or nonce is numerically larger.
```

The PTK length depends on the cipher suite. For CCMP (AES-128), the PTK is **384 bits (48 bytes)**, divided into three sub-keys:

```
PTK Decomposition (CCMP):

  PTK (384 bits total)
  +--------------------+--------------------+--------------------+
  | KCK                | KEK                | TK                 |
  | (128 bits/16 bytes)| (128 bits/16 bytes)| (128 bits/16 bytes)|
  +--------------------+--------------------+--------------------+
  | Key Confirmation   | Key Encryption     | Temporal Key       |
  | Key                | Key                | (data encryption)  |
  | Used in: 4-way     | Used in: encrypt   | Used in: CCMP      |
  | handshake MIC      | GTK delivery in    | encrypt/decrypt    |
  | (HMAC-SHA-1-128)   | Msg 3 of 4-way     | all data frames    |
  +--------------------+--------------------+--------------------+

  For TKIP: PTK = 512 bits (KCK:128 + KEK:128 + TK:256)
  For CCMP: PTK = 384 bits (KCK:128 + KEK:128 + TK:128)
```

**KCK (Key Confirmation Key) — 128 bits**: Used exclusively during the 4-way handshake to calculate the MIC (Message Integrity Code) on handshake messages. This proves that both parties derived the same PTK without revealing the PMK or any key material.

**KEK (Key Encryption Key) — 128 bits**: Used to encrypt the Group Temporal Key (GTK) when the AP delivers it in Message 3 of the 4-way handshake. This ensures only the intended client can decrypt the GTK.

**TK (Temporal Key) — 128 bits (CCMP) / 256 bits (TKIP)**: The actual data encryption key used by CCMP (or TKIP) to encrypt and authenticate every data frame. For CCMP, this single 128-bit key feeds both the Counter mode encryption and CBC-MAC integrity operations.

**GTK (Group Temporal Key)**

The GTK encrypts broadcast and multicast traffic. It is generated by the AP and distributed to all associated clients:

```
GTK Distribution:
  - Generated by: AP (random)
  - Length: 128 bits (CCMP) or 256 bits (TKIP)
  - Delivered in: Message 3 of 4-way handshake (encrypted with KEK)
  - Rotated via: Group Key Handshake (2-message exchange)
  - Shared by: All clients on the same BSS
```

The GTK is periodically rotated by the AP using a 2-message Group Key Handshake. Rotation occurs when a client disassociates (to prevent departed clients from decrypting future broadcasts) and at administrator-configured intervals.

### The 4-Way Handshake

The 4-way handshake establishes the PTK without ever transmitting the PMK:

```
WPA2 4-Way Handshake:

  Supplicant (Client)              Authenticator (AP)
  Both know PMK                    Both know PMK
       |                                |
       |  Message 1: ANonce             |
       |<-------------------------------|  AP generates random ANonce
       |                                |
       |  [Client derives PTK from      |
       |   PMK + ANonce + SNonce +      |
       |   AP MAC + Client MAC]         |
       |                                |
       |  Message 2: SNonce + MIC       |
       |------------------------------->|  Client sends its random SNonce
       |                                |  + MIC (using KCK from PTK)
       |                                |
       |                                |  [AP derives same PTK,
       |                                |   verifies MIC]
       |                                |
       |  Message 3: GTK + MIC          |
       |<-------------------------------|  AP sends GTK (encrypted with KEK)
       |                                |  + MIC for integrity
       |                                |
       |  Message 4: ACK + MIC          |
       |------------------------------->|  Client confirms key installation
       |                                |
       |  === Encrypted Data Exchange ===|
       |  (using TK from PTK)           |

  Both sides independently derive the same PTK
  from shared PMK + exchanged nonces.
  The PMK itself is NEVER transmitted.
```

### WPA2-Personal vs. WPA2-Enterprise

| Feature | WPA2-Personal (PSK) | WPA2-Enterprise (802.1X) |
|---------|--------------------|-----------------------|
| Authentication | Shared passphrase | Individual credentials per user |
| Key Source | PSK -> PMK | RADIUS/EAP -> MSK -> PMK |
| Key Uniqueness | Same PMK for all users (if same PSK) | Unique PMK per user session |
| Credential Revocation | Must change PSK on all devices | Disable individual user account |
| Infrastructure | AP only | AP + RADIUS server + CA (for certs) |
| Complexity | Low | High |
| Best For | Home, small office | Enterprise, education, government |
| Accountability | None (shared password) | Full (per-user logging) |

### EAP Methods (Enterprise Mode)

| EAP Method | Client Certificate | Server Certificate | Inner Auth | Security Level |
|------------|-------------------|-------------------|------------|----------------|
| EAP-TLS | Required | Required | N/A (mutual TLS) | Highest |
| PEAP (PEAPv0/EAP-MSCHAPv2) | Not required | Required | MSCHAPv2 | High |
| EAP-TTLS | Not required | Required | PAP/CHAP/MS-CHAPv2 | High |
| EAP-FAST | Not required | Optional (PAC) | MSCHAPv2 | High |

### WPA2 Vulnerabilities

**1. KRACK Attack (Key Reinstallation Attack) — 2017**:
The KRACK attack, discovered by Mathy Vanhoef, exploits the 4-way handshake by forcing **nonce reuse**:

```
KRACK Attack Mechanism:

  Client                              AP
    |                                  |
    |  Msg 1: ANonce                   |
    |<---------------------------------|
    |  Msg 2: SNonce + MIC             |
    |--------------------------------->|
    |  Msg 3: GTK + MIC               |
    |<---------------------------------|
    |  Msg 4: ACK + MIC               |
    |-------X  (attacker blocks)       |
    |                                  |
    |  AP retransmits Msg 3            |
    |<---------------------------------|
    |  Client reinstalls key           |
    |  (resets nonce counter to 0!)    |
    |                                  |
    |  Nonce reuse allows              |
    |  keystream recovery!             |

  Impact: Decrypt packets, inject frames
  Mitigation: Patched in all major OS updates
```

**2. Offline PSK Dictionary Attack**:
- Attacker captures the 4-way handshake (only needs one)
- Uses offline brute-force or dictionary attack against the PSK
- Tools: hashcat, aircrack-ng
- **Short or common passphrases can be cracked in hours**
- Mitigation: Use 20+ character random passphrases

**3. No Forward Secrecy**:
- If the PSK is later compromised, **all previously captured traffic** can be decrypted
- This is because the PMK (and therefore all PTKs) can be re-derived from the PSK
- WPA3's SAE addresses this limitation

**4. WPS (Wi-Fi Protected Setup) PIN Vulnerability**:
- 8-digit PIN can be brute-forced in two halves (10^4 + 10^3 = 11,000 combinations)
- Tools: Reaver, Bully
- **Always disable WPS on enterprise networks**

**Verdict**: **WPA2 remains secure when configured with strong passphrases (or Enterprise mode) and all devices are patched against KRACK. It is still the most widely deployed security protocol.**

---

## WPA3 (Wi-Fi Protected Access 3)

### Overview

WPA3, announced in 2018, addresses the remaining weaknesses in WPA2 and introduces several new security capabilities.

- **Standard**: Wi-Fi Alliance WPA3 specification
- **Year**: 2018 (certification began 2019)
- **Encryption**: GCMP-256 (Personal) / GCMP-256 or CCMP-256 (Enterprise)
- **Status**: **Modern standard — deploy whenever possible**

### SAE (Simultaneous Authentication of Equals)

SAE replaces PSK authentication with a **zero-knowledge proof** based on the Dragonfly key exchange protocol. Unlike the WPA2 4-way handshake, SAE ensures that even a weak password cannot be attacked offline.

```
SAE (Dragonfly) Key Exchange:

  Client                              AP
  Both know passphrase               Both know passphrase
    |                                  |
    | --- Commit (Point + Scalar) ---> |
    | <-- Commit (Point + Scalar) ---- |
    |                                  |
    |  Both derive PMK independently   |
    |  using Dragonfly protocol        |
    |  (elliptic curve Diffie-Hellman  |
    |   with password as input)        |
    |                                  |
    | --- Confirm (Hash proof) ------> |
    | <-- Confirm (Hash proof) ------- |
    |                                  |
    |  PMK established                 |
    |  Forward secrecy guaranteed      |
    |  (new PMK each session)          |

  Key properties:
  - Password NEVER transmitted (not even as a hash)
  - Each session gets a UNIQUE PMK
  - Offline dictionary attacks are IMPOSSIBLE
  - Brute-force requires online interaction (rate-limited by AP)
```

### Forward Secrecy

**Forward secrecy** (also called Perfect Forward Secrecy, PFS) means that compromising the password **does not compromise past sessions**:

| Property | WPA2-PSK | WPA3-SAE |
|----------|----------|----------|
| Same PMK every session? | Yes (derived from static PSK) | No (unique per session via Dragonfly) |
| Past traffic decryptable if password leaked? | Yes | No |
| Offline dictionary attack possible? | Yes (from captured handshake) | No |
| Online brute-force? | Possible (but slow) | Possible but rate-limited |

### SAE Commit-Confirm Exchange

The SAE (Simultaneous Authentication of Equals) protocol uses the Dragonfly key exchange (RFC 7664) to establish a shared PMK from a password without revealing any information that would enable offline attacks. Below is a detailed step-by-step walkthrough of the complete SAE handshake.

**Step 0: Password Element Derivation (Both Sides, Independently)**

Before any messages are exchanged, both the client and AP independently derive a point on an elliptic curve from the password and the MAC addresses of both parties:

```
Password Element Derivation:

  Input: password, MAC_A (AP), MAC_S (Client)

  1. seed = HMAC-SHA-256(Max(MAC_A, MAC_S) || Min(MAC_A, MAC_S),
                         password)
  2. For counter = 1, 2, 3, ...:
     a. value = KDF-256(seed,
                "SAE Hunting and Pecking", p || counter)
     b. If value < p (the prime of the curve):
        - Compute y² = x³ + ax + b (mod p) where x = value
        - If y² is a quadratic residue:
          - PWE (Password Element) = point(x, y) on the curve
          - STOP
     c. Else: increment counter, try again

  Output: PWE — a curve point derived deterministically
          from the password

  Security: The counter at which PWE was found is SECRET
            (prevents timing side-channel attacks)
```

The "hunting and pecking" method ensures constant-time execution (iterates a fixed number of times in implementation) to prevent timing attacks that could reveal which counter value produced a valid point.

**Step 1: Commit Exchange**

Each side generates a random scalar and computes a commit element:

```
Commit Phase (each side performs independently):

  1. Generate random value: rand ← random integer in [2, q-1]
     (q = order of the curve)

  2. Generate mask: mask ← random integer in [2, q-1]

  3. Compute scalar:
     scalar = (rand + mask) mod q

  4. Compute element (curve point):
     Element = inverse(mask × PWE)
     (scalar multiplication of PWE by mask, then point inversion)

  5. Send: (scalar, Element) to the peer

  Both sides exchange commits simultaneously (or in either order).
```

```
Commit Exchange:

  Client                              AP
  rand_c, mask_c ← random           rand_a, mask_a ← random
  scalar_c = rand_c + mask_c        scalar_a = rand_a + mask_a
  Element_c = -mask_c × PWE         Element_a = -mask_a × PWE
    |                                  |
    | --- (scalar_c, Element_c) -----> |
    | <-- (scalar_a, Element_a) ------ |
    |                                  |
```

**Step 2: Shared Secret Computation**

Upon receiving the peer's commit, each side computes the shared secret:

```
Shared Secret Computation (Client side):

  1. Verify: scalar_a × PWE + Element_a ≠ identity point
     (rejects invalid commits)

  2. Compute shared secret point:
     ss = rand_c × (scalar_a × PWE + Element_a)

     Expanding:
       ss = rand_c × ((rand_a + mask_a) × PWE + (-mask_a × PWE))
          = rand_c × (rand_a × PWE)
          = rand_c × rand_a × PWE

  The AP computes:
     ss = rand_a × (scalar_c × PWE + Element_c)
        = rand_a × rand_c × PWE    (same point!)

  3. KCK || PMK = KDF-512(ss.x,
       "SAE KCK and PMK",
       (scalar_c + scalar_a) mod q)
```

The shared secret `ss = rand_c × rand_a × PWE` is identical on both sides because point multiplication is commutative. Neither `rand_c` nor `rand_a` is ever transmitted — only `scalar` and `Element` are exchanged, from which recovering `rand` requires solving the discrete logarithm problem (computationally infeasible).

**Step 3: Confirm Exchange**

Both sides prove they derived the same KCK (and therefore the same PMK):

```
Confirm Exchange:

  Client                              AP
    |                                  |
    | Confirm_c = HMAC-SHA-256(KCK,    |
    |   scalar_c || scalar_a ||        |
    |   Element_c || Element_a ||      |
    |   peer-commit-counter)           |
    |                                  |
    | --- Confirm_c -----------------> |
    |                                  |
    |                                  | Verify Confirm_c matches
    |                                  | expected value
    |                                  |
    |           Confirm_a = HMAC-SHA-256(KCK,
    |             scalar_a || scalar_c ||
    |             Element_a || Element_c ||
    |             peer-commit-counter)
    |                                  |
    | <-- Confirm_a ------------------ |
    | Verify Confirm_a                 |
    |                                  |
    | PMK established!                 |
    | Proceed to 4-way handshake       |

  The confirm messages prove both sides derived the same KCK
  (and therefore the same PMK) without revealing any key material.
```

**Why SAE Defeats Offline Dictionary Attacks**

An attacker who captures the SAE exchange observes only `(scalar, Element)` pairs. To verify a candidate password, the attacker would need to:

1. Derive PWE from the candidate password
2. Attempt to find `rand` and `mask` values consistent with the observed `scalar` and `Element`
3. This requires solving the elliptic curve discrete logarithm problem — computationally infeasible

Each password guess requires an **online interaction** with the AP, which can rate-limit authentication attempts (e.g., exponential backoff after failed attempts). This transforms the attack from an offline dictionary attack (billions of guesses per second with GPU) to an online attack (a few guesses per second, rate-limited).

### WPA3 Encryption: GCMP-256

| Feature | WPA2 (CCMP-128) | WPA3-Personal (GCMP-256) | WPA3-Enterprise (192-bit) |
|---------|-----------------|-------------------------|--------------------------|
| Cipher | AES-128 | AES-256 | AES-256 |
| Mode | Counter + CBC-MAC | Galois/Counter Mode | GCMP-256 or CCMP-256 |
| Key Length | 128-bit | 256-bit | 192-bit equivalent suite |
| Auth Tag | 64-bit CBC-MAC | 128-bit GHASH | 128-bit |
| Performance | Fast | Fast (hardware-accelerated GCM) | Fast |

### GCMP-256 vs CCMP-128

WPA3 introduces GCMP-256 (Galois/Counter Mode Protocol with 256-bit keys) as an upgrade to WPA2's CCMP-128. Both are authenticated encryption modes built on AES, but they differ in their construction and security properties.

**Galois/Counter Mode (GCM) vs Counter with CBC-MAC (CCM)**

| Property | CCMP-128 (WPA2) | GCMP-256 (WPA3) |
|----------|----------------|------------------|
| **AES Key Size** | 128 bits | 256 bits |
| **Encryption Mode** | Counter Mode (CTR) | Counter Mode (CTR) |
| **Authentication Mode** | CBC-MAC (sequential AES chaining) | GHASH (Galois field multiplication) |
| **Auth Tag Size** | 64 bits (truncated) | 128 bits |
| **Parallelizable Auth** | No (CBC is sequential) | Yes (GHASH is parallelizable) |
| **Hardware Acceleration** | AES-NI | AES-NI + PCLMULQDQ (carry-less multiply) |
| **Throughput (modern HW)** | ~3–5 Gbps | ~5–10 Gbps |
| **Brute-Force Resistance** | 2^128 operations | 2^256 operations |
| **Post-Quantum Security** | ~64 bits (Grover's algorithm) | ~128 bits (Grover's algorithm) |

**GHASH vs CBC-MAC: Architectural Difference**

CBC-MAC (used in CCMP) authenticates data by chaining AES encryptions sequentially — each block depends on the previous block's output. This means authentication cannot be parallelized across CPU cores or hardware pipelines.

GHASH (used in GCMP) authenticates data by performing **Galois field multiplication** (GF(2^128)) with each data block and a hash key H (derived from AES-encrypting a zero block). These multiplications are independent and can be processed in parallel:

```
CCMP Authentication (CBC-MAC) — Sequential:

  B0 → AES → ⊕B1 → AES → ⊕B2 → AES → ... → Tag
  (each step depends on the previous)


GCMP Authentication (GHASH) — Parallelizable:

  Tag = C1·H^n ⊕ C2·H^(n-1) ⊕ ... ⊕ Cn·H ⊕ Len·H
  (each term C_i·H^(n-i+1) is computable independently,
   then all terms are XORed to produce the final tag)
```

**When to Use Each**

| Scenario | Recommended Suite | Rationale |
|----------|------------------|-----------|
| WPA2 networks (current) | CCMP-128 | Only option; still secure |
| WPA3-Personal | GCMP-256 | Default for WPA3; stronger keys |
| WPA3-Enterprise (standard) | CCMP-256 or GCMP-256 | Either supported |
| WPA3-Enterprise (192-bit / CNSA) | GCMP-256 | Required for Suite B compliance |
| Performance-critical / high-throughput | GCMP-256 | Parallelizable auth is faster |
| IoT / constrained devices | CCMP-128 | Lower computational requirements |

### WPA3 Modes

**WPA3-Personal**:
- SAE (Dragonfly) replaces PSK
- GCMP-256 encryption
- Forward secrecy
- Resistance to offline dictionary attacks
- Natural resistance to brute-force (rate-limiting built into protocol)

**WPA3-Enterprise**:
- Optional **192-bit security suite** (CNSA - Commercial National Security Algorithm)
- Based on Suite B cryptography (NIST-approved for classified data)
- GCMP-256 or CCMP-256 encryption
- EAP-TLS with 384-bit ECDSA certificates
- HMAC-SHA-384 for key derivation
- Suitable for government, defense, financial, and healthcare

**WPA3-Enhanced Open (OWE — Opportunistic Wireless Encryption)**:
- Encrypts traffic on **open networks** (no password required)
- Uses unauthenticated Diffie-Hellman key exchange
- Each client gets a unique encryption key
- Protects against passive eavesdropping on public Wi-Fi (coffee shops, airports)
- Does NOT provide authentication (still need captive portal for access control)

```
Traditional Open Network:              OWE (Enhanced Open):

  Client --[plaintext data]--> AP      Client --[encrypted data]--> AP
                                       (unique key per client via DH)
  ANYONE within range can               Passive sniffing defeated!
  read all traffic!                     (Active MitM still possible
                                         without authentication)
```

### Protected Management Frames (PMF / 802.11w)

PMF protects management frames (deauthentication, disassociation, action frames) from spoofing:

| PMF Status | WPA2 | WPA3 |
|------------|------|------|
| Requirement | Optional (rarely enabled) | **Mandatory** |
| Protection Against | Deauth attacks, disassoc attacks | Same |
| How It Works | Adds MIC to management frames | Same, but always on |

Without PMF, an attacker can send forged deauthentication frames to disconnect any client — the basis for many Wi-Fi attacks (evil twin, handshake capture).

### WPA3 Transition Mode

To support gradual migration, WPA3 access points can operate in **transition mode**:
- AP accepts both WPA2 and WPA3 clients simultaneously
- WPA2 clients use PSK/CCMP; WPA3 clients use SAE/GCMP
- Mixed security: WPA2 clients do not benefit from SAE's protections
- **Best practice**: Set a migration deadline and disable WPA2 after all clients are upgraded

---

## Security Protocol Comparison

### Comprehensive Comparison Table

| Feature | WEP | WPA | WPA2 | WPA3 |
|---------|-----|-----|------|------|
| **Year** | 1999 | 2003 | 2004 | 2018 |
| **Cipher** | RC4 | RC4 | AES | AES |
| **Encryption Protocol** | WEP | TKIP | CCMP | GCMP-256 |
| **Key Length** | 64/128-bit | 128-bit | 128-bit | 256-bit |
| **IV Size** | 24-bit | 48-bit | 48-bit PN | 48-bit PN |
| **Integrity** | CRC-32 | Michael MIC | CBC-MAC | GHASH |
| **Key Management** | Static | Dynamic (TKIP) | Dynamic (4-way) | Dynamic (SAE) |
| **Forward Secrecy** | No | No | No | Yes |
| **PMF** | No | No | Optional | Mandatory |
| **Offline Attack** | Minutes | Hours-days | Hours-years* | Not possible |
| **Status** | Broken | Deprecated | Current | Modern |
| **Recommendation** | Never use | Avoid | Use (strong PSK) | Preferred |

*Depends entirely on passphrase strength.

### Encryption Algorithm Comparison

```
Cipher Evolution:

  WEP:    RC4 (stream) ---> BROKEN (weak IV, no integrity)
           |
  WPA:    RC4 + TKIP   ---> DEPRECATED (RC4 still flawed)
           |
  WPA2:   AES-128/CCMP ---> CURRENT (strong, well-analyzed)
           |
  WPA3:   AES-256/GCMP ---> MODERN (stronger key, GCM mode)
```

---

## Enterprise vs. Personal Mode

### Architecture Comparison

```
Personal Mode (PSK/SAE):

  +--------+                    +-----+
  | Client | --- Wi-Fi ------>  | AP  |
  +--------+   (PSK or SAE)    +-----+
  
  Simple: Client and AP share a passphrase.
  No external servers required.


Enterprise Mode (802.1X):

  +--------+          +-----+          +---------+          +------+
  | Client | - Wi-Fi ->| AP  | - RADIUS ->| RADIUS  | - LDAP ->| AD/  |
  | (Supp) |          |(Auth)|          | Server  |          | LDAP |
  +--------+          +-----+          +---------+          +------+
                                       (FreeRADIUS,         (User
                                        NPS, ISE)           Database)
  
  Complex: Individual credentials verified by RADIUS server.
  Supports certificate-based auth (EAP-TLS).
```

### When to Use Each Mode

| Criterion | Personal | Enterprise |
|-----------|----------|------------|
| Number of users | <20 | 20+ |
| User turnover | Low | Any |
| Accountability needed | No | Yes |
| Budget | Low | Higher (RADIUS infra) |
| IT staff | Minimal | Dedicated |
| Compliance requirements | None | HIPAA, PCI, FERPA, etc. |
| Certificate management | N/A | Required (EAP-TLS) or optional |

---

## Backward Compatibility Issues

### Mixed Security Environments

Running multiple security protocols on the same AP creates vulnerabilities:

| Configuration | Risk |
|---------------|------|
| WEP + WPA2 | WEP clients compromise entire network |
| WPA + WPA2 | TKIP attacks possible; extra overhead |
| WPA2 + WPA3 (transition) | WPA2 clients lack forward secrecy; downgrade attacks possible |
| WPA3-only | Legacy clients cannot connect |

**Best Practice Migration Path**:
1. Audit all wireless clients for WPA3 support
2. Enable WPA3 transition mode (WPA2 + WPA3 simultaneously)
3. Set minimum security policy to WPA2-AES (disable TKIP)
4. Upgrade or replace legacy devices that only support WPA/WEP
5. After migration window, disable WPA2 and run WPA3-only

---

## Wireless Security Protocol Vulnerabilities

The following table summarizes attacks that exploit specific weaknesses in wireless security protocol cryptography. For detailed attack methodologies, tools, and defensive countermeasures (including evil twin attacks, rogue AP detection, WIDS/WIPS deployment, and security monitoring), see [Lesson 38: Wireless Security](lesson-038-wireless-security).

### Protocol Vulnerability Summary

| Attack | Protocol Affected | Cryptographic Root Cause | Fixed In |
|--------|-------------------|--------------------------|----------|
| IV Collection / FMS | WEP | 24-bit IV + RC4 related-key weakness | WPA (48-bit IV + per-packet mixing) |
| Bit-Flipping | WEP | CRC-32 is linear (not cryptographic) | WPA (Michael MIC) |
| TKIP MIC (Beck-Tews) | WPA | Michael algorithm limited to 2^20 operations | WPA2 (CBC-MAC) |
| PSK Dictionary | WPA/WPA2 | PMK derived from low-entropy passphrase via PBKDF2 | WPA3 (SAE — offline attacks infeasible) |
| KRACK (Nonce Reuse) | WPA2 | 4-way handshake allows key reinstallation, resetting nonce | Vendor patches; WPA3 SAE mitigates |
| PMKID Hash Capture | WPA2 | PMKID derivable from beacon without full handshake | Strong passphrases; WPA3 SAE |
| WPS PIN Brute-Force | WPA/WPA2 | PIN validated in two halves (11,000 combinations) | Disable WPS; WPA3 drops WPS |
| Hole196 (GTK) | WPA2 | GTK shared by all clients; insider can forge broadcast | WPA3 improved group key handling |
| Deauthentication | WPA/WPA2 (without PMF) | Management frames are unprotected | WPA3 (PMF mandatory) |

### Why Each Protocol Generation Failed

**WEP**: The core failure is cryptographic — RC4's Key Scheduling Algorithm leaks key material when fed related keys (same suffix, varying 24-bit IV prefix). CRC-32 provides no integrity protection because it is a linear function. These are **design-level** flaws inherent to the protocol specification.

**WPA/TKIP**: TKIP patched WEP's worst problems (48-bit IV, per-packet key mixing) but still used RC4. The Michael MIC was intentionally weak due to hardware constraints, enabling the Beck-Tews attack to decrypt short packets by exploiting MIC predictability. This is a **constraint-driven** weakness — TKIP had to run on WEP-era hardware.

**WPA2/CCMP**: AES-CCMP itself remains cryptographically sound. WPA2's vulnerabilities are in the **key exchange layer**, not the cipher suite — the KRACK attack exploits the 4-way handshake's state machine, and PSK dictionary attacks exploit weak user-chosen passwords fed into PBKDF2.

**WPA3/SAE**: The Dragonblood research (2019) revealed side-channel vulnerabilities in early SAE implementations (timing leaks in the hunting-and-pecking PWE derivation), not fundamental protocol flaws. These were addressed through implementation fixes and the hash-to-curve method (RFC 9380).

---

## Protocol Selection Guidelines

Selecting the appropriate wireless security protocol depends on the deployment scenario, device ecosystem, and compliance requirements. For operational security best practices including WIDS/WIPS deployment, RF monitoring, rogue AP detection, and incident response, see [Lesson 38: Wireless Security](lesson-038-wireless-security).

### Deployment Scenario Matrix

| Scenario | Recommended Protocol | Authentication | Encryption | Rationale |
|----------|---------------------|----------------|------------|----------|
| **Enterprise office** | WPA3-Enterprise (192-bit) | EAP-TLS (certificates) | GCMP-256 | Per-user keys, strongest crypto, compliance |
| **Enterprise (transition)** | WPA2/WPA3 transition | 802.1X | CCMP-128 / GCMP-256 | Supports legacy + modern clients |
| **SOHO / Home** | WPA3-Personal | SAE | GCMP-256 | Forward secrecy, offline attack resistance |
| **SOHO (legacy devices)** | WPA2-Personal | PSK (20+ chars) | CCMP-128 | Still secure with strong passphrase |
| **IoT / Constrained Devices** | WPA2-Personal | PSK | CCMP-128 | Many IoT devices lack WPA3 support |
| **IoT (dedicated network)** | WPA2 on isolated VLAN | PSK | CCMP-128 | VLAN isolation limits blast radius |
| **Public Wi-Fi (open)** | WPA3-OWE (Enhanced Open) | None (unauthenticated DH) | GCMP-256 | Encrypted without password; protects passive sniffing |
| **Guest network** | WPA2/WPA3-Personal | Simple PSK / captive portal | CCMP/GCMP | Isolated VLAN, bandwidth-limited |
| **High-security / Government** | WPA3-Enterprise (CNSA) | EAP-TLS (384-bit ECDSA) | GCMP-256 | Suite B compliance, 192-bit security |

### Protocol Selection Decision Flow

```
Start → Do all clients support WPA3?
  ├── Yes → Is it Enterprise or Personal?
  │    ├── Enterprise → WPA3-Enterprise (192-bit if CNSA required)
  │    └── Personal → WPA3-SAE (GCMP-256)
  ├── No → Can you isolate legacy clients on a separate SSID/VLAN?
  │    ├── Yes → WPA3-only on primary + WPA2-only on legacy VLAN
  │    └── No → WPA2/WPA3 transition mode (set migration deadline)
  └── Is it an open/public network?
       ├── OWE supported → WPA3-Enhanced Open (OWE)
       └── OWE not supported → Open + captive portal + VPN advisory
```

### Critical Protocol Configuration Rules

| Rule | Requirement | Why |
|------|-------------|-----|
| Minimum protocol | WPA2-AES (CCMP) | WEP and WPA-TKIP are cryptographically broken |
| Disable TKIP | Always | TKIP uses weak RC4-based construction |
| Disable WPS | Always | PIN brute-force recovers PSK in hours |
| Enable PMF | Always (mandatory in WPA3) | Prevents deauth/disassoc frame spoofing |
| PSK length | 20+ random characters | Defeats offline dictionary attacks against WPA2 |
| SSID naming | Avoid defaults | Default SSIDs have precomputed rainbow tables |

---

## Protocol Frame Analysis

Understanding how each security protocol is identified at the frame level is essential for protocol analysis, troubleshooting, and security auditing. Wireless security parameters are communicated through specific fields in the 802.11 MAC header and information elements (IEs).

### 802.11 Frame Header Security Indicators

The Frame Control field (2 bytes) at the beginning of every 802.11 frame contains a **Protected Frame bit** (bit 14) that indicates whether the frame body is encrypted:

```
802.11 Frame Control Field (2 bytes):

  Bit:  0-1    2-3    4-7    8     9     10    11    12    13    14    15
       +------+------+------+-----+-----+-----+-----+-----+-----+-----+-----+
       | Proto| Type | Sub- | To  |From |More |Retry|Pwr  |More |Protd|+HTC |
       | Ver  |      | type | DS  | DS  |Frag |     |Mgmt |Data |Frame|     |
       +------+------+------+-----+-----+-----+-----+-----+-----+-----+-----+
                                                                  |
                                         Bit 14 = 1: Frame body is encrypted
                                         Bit 14 = 0: Frame body is plaintext
```

### Protocol Identification by Frame Structure

Each security protocol produces distinctly different encrypted frame formats:

```
WEP Frame:
  +--------+----+------+-----------+-----+
  | MAC Hdr| IV | Key  | Encrypted | ICV |
  | (24B)  |(3B)| ID   | Payload   |(4B) |
  |        |    |(1B)  |           |     |
  +--------+----+------+-----------+-----+
  IV: 3 bytes (24 bits), cleartext
  Key ID: 2 bits in the 4th byte (bits 6-7)
  ICV: CRC-32, encrypted with payload


TKIP Frame (WPA):
  +--------+------+--------+-----------+-----+-----+
  | MAC Hdr| IV/  | Ext IV | Encrypted | MIC | ICV |
  | (24B)  |KeyID | (4B)   | Payload   |(8B) |(4B) |
  |        |(4B)  |        |           |     |     |
  +--------+------+--------+-----------+-----+-----+
  IV: 4 bytes (TSC1 | WEPSeed | TSC0 | KeyID)
  Extended IV: 4 bytes (TSC2-TSC5), ExtIV bit set
  MIC: Michael algorithm (8 bytes), encrypted
  ICV: CRC-32, encrypted


CCMP Frame (WPA2):
  +--------+--------+--------+-----------+-----+
  | MAC Hdr| CCMP   | Rsvd/  | Encrypted | MIC |
  | (24B)  | Header | ExtIV  | Payload   |(8B) |
  |        | (8B)   |        |           |     |
  +--------+--------+--------+-----------+-----+
  CCMP Header: PN0 | PN1 | Rsvd | Rsvd/ExtIV/KeyID | PN2-PN5
  PN: 48-bit Packet Number (split across header)
  MIC: 64-bit CBC-MAC (appended after encryption)


GCMP Frame (WPA3):
  +--------+--------+--------+-----------+------+
  | MAC Hdr| GCMP   | Rsvd/  | Encrypted | MIC  |
  | (24B)  | Header | ExtIV  | Payload   |(16B) |
  |        | (8B)   |        |           |      |
  +--------+--------+--------+-----------+------+
  GCMP Header: PN0 | PN1 | Rsvd | Rsvd/ExtIV/KeyID | PN2-PN5
  PN: 48-bit Packet Number (identical layout to CCMP)
  MIC: 128-bit GHASH tag (longer than CCMP's 64-bit tag)
```

### RSN Information Element (RSN IE)

WPA2 and WPA3 networks advertise their security capabilities in Beacon and Probe Response frames using the **RSN Information Element** (Element ID 48). This IE tells clients which cipher suites and authentication methods the AP supports:

```
RSN Information Element Structure:

  +------------+---------+---------+----------+----------+---------+
  | Element ID | Length  | Version | Group    | Pairwise | AKM     |
  | (48 = RSN) |         | (1)     | Cipher   | Cipher   | Suite   |
  |            |         |         | Suite    | Suite(s) | Count + |
  |            |         |         |          |          | List    |
  +------------+---------+---------+----------+----------+---------+
  | RSN        | PMKID   | Group   |
  | Capabilities| Count + | Mgmt   |
  | (2 bytes)  | List    | Cipher  |
  |            |         | Suite   |
  +------------+---------+---------+


Cipher Suite OUI Values (00-0F-AC):
  +-------+-------------------------------+--------------------+
  | Value | Cipher Suite                  | Used By            |
  +-------+-------------------------------+--------------------+
  | 1     | WEP-40                        | WEP                |
  | 2     | TKIP                          | WPA                |
  | 4     | CCMP-128                      | WPA2               |
  | 5     | WEP-104                       | WEP                |
  | 8     | GCMP-128                      | WPA3 (optional)    |
  | 9     | GCMP-256                      | WPA3               |
  | 10    | CCMP-256                      | WPA3-Enterprise    |
  | 11    | BIP-GMAC-128                  | WPA3 (mgmt frames) |
  | 12    | BIP-GMAC-256                  | WPA3 (mgmt frames) |
  | 13    | BIP-CMAC-256                  | WPA3 (mgmt frames) |
  +-------+-------------------------------+--------------------+


AKM Suite OUI Values (00-0F-AC):
  +-------+-------------------------------+--------------------+
  | Value | Authentication Method         | Used By            |
  +-------+-------------------------------+--------------------+
  | 1     | 802.1X (PMKSA caching)        | WPA2-Enterprise    |
  | 2     | PSK                           | WPA2-Personal      |
  | 3     | FT over 802.1X                | Fast Roaming       |
  | 4     | FT over PSK                   | Fast Roaming       |
  | 8     | SAE                           | WPA3-Personal      |
  | 9     | FT over SAE                   | WPA3 Fast Roaming  |
  | 12    | 802.1X (Suite B, 192-bit)     | WPA3-Enterprise    |
  | 18    | OWE                           | Enhanced Open      |
  +-------+-------------------------------+--------------------+
```

### RSN Capabilities Field

The RSN Capabilities field (2 bytes) contains important security flags:

| Bit | Name | Description |
|-----|------|-------------|
| 0 | Pre-Authentication | AP supports pre-authentication for fast roaming |
| 1 | No Pairwise | Group cipher used for unicast (insecure, rarely used) |
| 2-3 | PTKSA Replay Counter | Number of replay counters (0=1, 1=2, 2=4, 3=16) |
| 4-5 | GTKSA Replay Counter | Number of group replay counters |
| 6 | MFP Required | **Management Frame Protection mandatory (set in WPA3)** |
| 7 | MFP Capable | **Management Frame Protection supported** |
| 8 | Joint Multi-band RSNA | Cross-band security association |
| 9 | PeerKey Enabled | Direct link setup |
| 10 | SPP A-MSDU Capable | Security-aware A-MSDU handling |
| 11 | SPP A-MSDU Required | Mandatory security-aware A-MSDU |
| 12 | PBAC | Protected block ack capable |
| 13 | Extended Key ID | Uses Key ID 0 and 1 for PTK |

**Identifying WPA3 vs WPA2 in the RSN IE**: A WPA3-Personal AP is distinguished from WPA2 by the AKM suite value (8 = SAE vs. 2 = PSK) and the MFP Required bit (bit 6 = 1). A WPA3-Enterprise 192-bit AP uses AKM suite 12 and GCMP-256 cipher suite 9.

---

## Key Exchange Vulnerabilities Timeline

This chronological table documents the major discovered vulnerabilities in wireless security protocols, focusing on the cryptographic and protocol-level weaknesses that drove the evolution from WEP through WPA3.

| Year | Vulnerability | CVE / Reference | Protocol | Cryptographic Root Cause | Impact | Resolution |
|------|--------------|-----------------|----------|--------------------------|--------|-----------|
| 2001 | **FMS Attack** (Fluhrer-Mantin-Shamir) | Academic paper | WEP | RC4 KSA leaks key bytes with related-key IVs | Full key recovery (~1M packets) | Migrate to WPA |
| 2004 | **KoreK/chopchop Attack** | Academic paper | WEP | RC4 keystream recovery via CRC-32 linearity | Decrypt packets without full key | Migrate to WPA |
| 2007 | **PTW Attack** (Pyshkin-Tews-Weinmann) | Academic paper | WEP | Extended FMS to all IVs (not just weak ones) | Key recovery in ~40K packets (<1 min) | Migrate to WPA2 |
| 2008 | **Beck-Tews Attack** | Academic paper | WPA (TKIP) | Michael MIC predictability + TKIP chopchop | Decrypt short packets, inject frames | Migrate to WPA2 (CCMP) |
| 2009 | **Ohigashi-Morii Attack** | Academic paper | WPA (TKIP) | Accelerated Beck-Tews via man-in-the-middle | Faster TKIP decryption | Migrate to WPA2 (CCMP) |
| 2010 | **Hole196** | Academic disclosure | WPA2 | GTK shared by all clients; insider can forge broadcast | Insider MitM, ARP poisoning via broadcast | Network segmentation; WPA3 |
| 2017 | **KRACK** (Key Reinstallation Attacks) | CVE-2017-13077 – CVE-2017-13088 | WPA2 | 4-way handshake state machine allows key reinstallation → nonce reuse | Decrypt traffic, inject frames, TCP hijack | Vendor patches; WPA3 SAE mitigates |
| 2018 | **PMKID Hash Attack** | Hashcat disclosure | WPA2 | PMKID computable from AP beacon (no client needed) | Offline PSK dictionary attack without client handshake | Strong passphrases; WPA3 SAE |
| 2019 | **Dragonblood** | CVE-2019-9494 – CVE-2019-9499 | WPA3 (SAE) | Timing side-channels in hunting-and-pecking PWE derivation | Offline dictionary attack via side-channel | Implementation fixes; hash-to-curve (RFC 9380) |
| 2020 | **Kr00k** | CVE-2019-15126 | WPA2 (implementation) | Broadcom/Cypress chipsets use all-zero TK after disassociation | Decrypt buffered frames with zero key | Chipset firmware update |
| 2021 | **FragAttacks** | CVE-2020-24586 – CVE-2020-26146 | All (WEP–WPA3) | Design flaws in 802.11 frame aggregation and fragmentation | Inject frames, exfiltrate data on any Wi-Fi network | Vendor patches; specification amendments |
| 2023 | **SSID Confusion Attack** | Academic paper | WPA3 (multi-band) | SSID not authenticated in 4-way handshake | Client tricked into connecting to wrong network | Proposed: include SSID in handshake derivation |

### Vulnerability Pattern Analysis

The timeline reveals a clear evolutionary pattern in wireless security vulnerabilities:

1. **WEP era (2001–2007)**: Fundamental **cipher-level** flaws — the RC4 algorithm itself leaks key material through related-key attacks. No amount of configuration can fix WEP.

2. **WPA/TKIP era (2008–2009)**: **Integrity mechanism** weakness — TKIP's Michael MIC was intentionally weak due to hardware constraints, enabling packet decryption through MIC manipulation.

3. **WPA2 era (2010–2018)**: **Key exchange protocol** flaws — AES-CCMP itself is sound, but vulnerabilities in the 4-way handshake state machine and reliance on user-selected passwords create attack vectors.

4. **WPA3 era (2019–present)**: **Implementation and side-channel** attacks — the SAE protocol design is mathematically sound, but specific implementations leak information through timing or cache behavior. Additionally, **design-level** issues in the underlying 802.11 specification (fragmentation, aggregation) affect all protocol versions.

This progression shows each generation fixing the previous generation's class of vulnerability, while new attack research probes increasingly subtle weaknesses — moving from broken ciphers to broken integrity to broken key exchange to implementation side-channels.

---

## Summary

1. **WEP** uses RC4 with a 24-bit IV that repeats rapidly, enabling key recovery in minutes. It provides no meaningful security and must never be deployed.

2. **WPA** introduced TKIP to fix WEP's worst flaws while running on the same hardware, but TKIP's reliance on RC4 leaves it vulnerable. It is deprecated.

3. **WPA2** uses **CCMP/AES** (128-bit), providing strong encryption and integrity. It remains secure with strong passphrases and patched devices, and is the most widely deployed protocol.

4. **WPA3** introduces **SAE (Dragonfly)** for key exchange, providing **forward secrecy** and immunity to offline dictionary attacks. It uses **GCMP-256** encryption.

5. The **4-way handshake** (WPA2) derives the PTK from the PMK and exchanged nonces without transmitting the PMK. The **KRACK attack** exploits this by forcing nonce reuse — patch your devices.

6. **PMK/PTK key hierarchy**: PSK derives the PMK (via PBKDF2), the 4-way handshake derives the PTK (containing KCK, KEK, TK), and the GTK encrypts broadcast traffic.

7. **Enterprise mode (802.1X)** provides per-user authentication via RADIUS, unique encryption keys per session, and individual accountability — essential for business environments.

8. **Personal mode (PSK/SAE)** uses a shared passphrase — simple but offers no individual accountability. Use 20+ character random passphrases.

9. **OWE (Enhanced Open)** encrypts open-network traffic without passwords using Diffie-Hellman, protecting against passive eavesdropping on public Wi-Fi.

10. **Protected Management Frames (PMF)** prevent deauthentication attacks and are mandatory in WPA3 but optional (and rarely enabled) in WPA2.

11. **Backward compatibility** between security protocols creates vulnerabilities. Minimize the transition window and disable weaker protocols as soon as possible.

12. **Defense in depth**: Combine WPA3/WPA2-Enterprise with VLANs, firewalls, WIPS, PMF, disabled WPS, and strong passphrases for comprehensive wireless security.

## Practice Questions

**Q1.** Which wireless security protocol uses RC4 encryption with a 24-bit Initialization Vector (IV) that can be cracked in minutes?

A) WPA
B) WPA2
C) WEP
D) WPA3

<details>
<summary>Answer</summary>

**C)** WEP uses RC4 encryption with a 24-bit IV that repeats rapidly (after approximately 5,000 packets). This repetition allows attackers to collect enough IVs to derive the encryption key, typically within minutes using tools like aircrack-ng.
</details>

**Q2.** What encryption algorithm does WPA2 use for data confidentiality?

A) RC4-TKIP
B) AES-CCMP
C) DES-CBC
D) 3DES

<details>
<summary>Answer</summary>

**B)** WPA2 uses AES-CCMP (Counter Mode with CBC-MAC Protocol) with 128-bit keys for both data encryption and integrity verification. CCMP provides stronger security than TKIP's RC4-based approach used in original WPA.
</details>

**Q3.** What key advantage does WPA3-Personal's SAE (Simultaneous Authentication of Equals) handshake provide over WPA2-PSK's 4-way handshake?

A) Faster connection speeds
B) Support for longer passwords
C) Resistance to offline dictionary attacks and forward secrecy
D) Compatibility with legacy devices

<details>
<summary>Answer</summary>

**C)** SAE (Dragonfly key exchange) derives unique session keys through a zero-knowledge proof, meaning captured handshake data cannot be used for offline brute-force attacks. It also provides forward secrecy — even if the passphrase is later compromised, previously captured traffic cannot be decrypted.
</details>

**Q4.** In WPA2-Enterprise, what generates unique encryption keys for each wireless client session?

A) The access point generates random keys
B) The RADIUS server shares a single master key with all clients
C) The 4-way handshake derives per-session PTK from the PMK and exchanged nonces
D) The client generates its own key and sends it to the AP

<details>
<summary>Answer</summary>

**C)** The 4-way handshake uses the PMK (from RADIUS authentication), AP nonce (ANonce), client nonce (SNonce), and MAC addresses to derive a unique Pairwise Transient Key (PTK) for each session. The PTK contains the KCK, KEK, and Temporal Key.
</details>

**Q5.** What is the KRACK (Key Reinstallation Attack) vulnerability in WPA2?

A) It cracks the WPA2 password through brute force
B) It forces nonce reuse in the 4-way handshake, allowing traffic decryption
C) It exploits a weakness in AES encryption
D) It targets the RADIUS authentication server

<details>
<summary>Answer</summary>

**B)** KRACK exploits the WPA2 4-way handshake by forcing the client to reinstall an already-in-use key, resetting the nonce counter. This nonce reuse allows the attacker to replay, decrypt, and potentially forge packets. The fix is applying vendor patches, not changing protocols.
</details>

**Q6.** What does OWE (Opportunistic Wireless Encryption) provide for open Wi-Fi networks?

A) Password-based authentication for all users
B) Encryption without requiring a password, using Diffie-Hellman key exchange
C) MAC address filtering for access control
D) Certificate-based mutual authentication

<details>
<summary>Answer</summary>

**B)** OWE (Wi-Fi Enhanced Open) uses a Diffie-Hellman key exchange to establish encrypted connections on open networks without requiring users to enter a password. It protects against passive eavesdropping on public Wi-Fi while maintaining the ease of open network access.
</details>

**Q7.** What is the purpose of Protected Management Frames (PMF) in wireless security?

A) To encrypt all data frames with AES-256
B) To prevent deauthentication and disassociation attacks by protecting management frames
C) To increase the wireless transmission range
D) To enable faster roaming between access points

<details>
<summary>Answer</summary>

**B)** PMF protects management frames (such as deauthentication and disassociation frames) from being forged by attackers. Without PMF, attackers can send spoofed deauth frames to disconnect clients. PMF is mandatory in WPA3 and optional in WPA2.
</details>

**Q8.** Why should WPS (Wi-Fi Protected Setup) be disabled on enterprise networks?

A) It conflicts with RADIUS authentication
B) Its 8-digit PIN is vulnerable to brute-force attacks due to a design flaw that splits it into two halves
C) It only works with WEP encryption
D) It reduces wireless signal range

<details>
<summary>Answer</summary>

**B)** WPS PIN mode splits the 8-digit PIN into two halves validated separately, reducing the brute-force search space from 10⁸ to 10⁴ + 10³ attempts (approximately 11,000). This allows an attacker to recover the PIN and WPA2 passphrase in hours.
</details>

**Q9.** An attacker sets up a rogue access point with the same SSID as a legitimate corporate network. What is this attack called?

A) Bluesnarfing
B) DNS poisoning
C) Evil twin attack
D) ARP spoofing

<details>
<summary>Answer</summary>

**C)** An evil twin attack involves setting up a rogue AP that mimics a legitimate network's SSID. Clients connect to the fake AP, allowing the attacker to intercept traffic and credentials. Mitigation includes 802.1X authentication (where clients verify the server certificate) and wireless IPS.
</details>

**Q10.** What is the minimum recommended passphrase length for WPA2-Personal deployments?

A) 8 characters (the protocol minimum)
B) 12 characters
C) 20+ random characters
D) 6 characters

<details>
<summary>Answer</summary>

**C)** While WPA2 requires a minimum of 8 characters, security best practices recommend 20+ random characters for PSK deployments. Shorter passphrases are vulnerable to offline dictionary attacks using captured 4-way handshakes and GPU-accelerated cracking tools.
</details>

## References

- CompTIA Network+ N10-009 Exam Objectives: Domain 4.1 – Explain common security concepts; Domain 4.3 – Given a scenario, apply network hardening techniques
- IEEE 802.11i-2004: Medium Access Control (MAC) Security Enhancements (WPA2/CCMP)
- Wi-Fi Alliance: WPA3 Specification, OWE (Enhanced Open) Specification
- RFC 6347: Datagram Transport Layer Security (DTLS) – referenced in WPA3 SAE
- Vanhoef, M. & Piessens, F. (2017). *Key Reinstallation Attacks: Forcing Nonce Reuse in WPA2* (KRACK paper)
- Lammle, T. (2021). *CompTIA Network+ Study Guide (Exam N10-009)*. Sybex – Wireless Security
- NIST SP 800-153: Guidelines for Securing Wireless Local Area Networks (WLANs)
