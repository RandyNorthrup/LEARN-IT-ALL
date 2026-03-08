---
id: lesson-058-wireless-authentication
title: "Wireless Authentication Methods"
chapterId: ch6-wireless-networking
order: 58
duration: 65
objectives:
  - Compare PSK and Enterprise authentication modes
  - Understand 802.1X and RADIUS authentication
  - Explain EAP methods (PEAP, EAP-TLS, EAP-TTLS)
  - Configure captive portals for guest access
  - Understand certificate-based authentication
---

# Lesson 58: Wireless Authentication Methods

## Introduction

Wireless authentication is the gatekeeper of every Wi-Fi network. Before a single data frame traverses the airwaves, the network must answer a fundamental question: **Is this client authorized to be here?** The answer to that question determines whether the client receives network access, gets placed into a quarantine VLAN, or is rejected outright.

Authentication and encryption are distinct but complementary functions. Authentication establishes **identity** — verifying who or what is connecting. Encryption establishes **confidentiality** — protecting data from eavesdroppers once the connection is established. A secure wireless network requires both, yet they operate through different mechanisms and protocols.

This lesson examines every major wireless authentication method you will encounter on the CompTIA Network+ exam and in real-world deployments: Pre-Shared Key (PSK) authentication in both WPA2 and WPA3, the full 802.1X/EAP enterprise framework, RADIUS in its wireless role, captive portals for guest access, MAC filtering, open authentication, certificate-based authentication via PKI, and federated authentication systems like eduroam. By the end, you will be able to select and justify the appropriate authentication method for any given environment.

> *This lesson focuses specifically on wireless authentication technologies and deployment. For general AAA frameworks, TACACS+, Kerberos, LDAP/Active Directory, and identity federation (SAML/OAuth), see [Lesson 33: Authentication and Authorization](lesson-033-authentication-authorization).*

---

## Learning Objectives

After completing this lesson, you will be able to:

- Compare PSK and Enterprise authentication modes
- Understand 802.1X and RADIUS authentication
- Explain EAP methods (PEAP, EAP-TLS, EAP-TTLS)
- Configure captive portals for guest access
- Understand certificate-based authentication

---

## Authentication vs. Encryption

Before diving into specific methods, it is essential to clearly distinguish these two security functions:

| Function | Purpose | Example Mechanism |
|----------|---------|-------------------|
| **Authentication** | Verify the identity of the connecting entity | PSK passphrase, 802.1X/RADIUS, certificates |
| **Encryption** | Protect data confidentiality in transit | AES-CCMP (WPA2), AES-GCMP (WPA3) |
| **Integrity** | Ensure data has not been modified | MIC (Message Integrity Check) |

**Both are required** for a secure wireless network:

- Authentication without encryption allows authorized users but exposes their data
- Encryption without authentication protects data but allows anyone to connect
- Most real attacks target the authentication layer first (credential theft, brute force)

---

## Open Authentication

The simplest (and least secure) form of wireless authentication is **open authentication**, where no credentials are required to associate with the access point.

**How It Works**:

1. Client sends an authentication request frame
2. AP responds with an authentication success frame
3. Client sends an association request
4. AP responds with an association response
5. Client is now associated — no password, no certificates, no identity verification

```
Client                         Access Point
  |                                |
  |--- Authentication Request --->|
  |<-- Authentication Success  ---|
  |--- Association Request ------>|
  |<-- Association Response -------|
  |                                |
  |   (Traffic flows freely)       |
```

**Security Implications**:

- **No identity verification** — any device can connect
- **No encryption** (unless paired with OWE)
- Vulnerable to **evil twin** attacks
- Vulnerable to **eavesdropping** on all traffic
- Suitable **only** when paired with a captive portal or OWE

**OWE (Opportunistic Wireless Encryption)**:

WPA3 introduced **OWE** (also called Wi-Fi Enhanced Open), which provides encryption on open networks without requiring a password:

- Uses a **Diffie-Hellman key exchange** during association
- Each client gets a **unique encryption key**
- No authentication — anyone can still connect
- Protects against **passive eavesdropping** but not active attacks
- Ideal for public Wi-Fi (coffee shops, airports)

---

## Pre-Shared Key (PSK) Authentication

### Overview

**PSK** (Pre-Shared Key) authentication uses a **shared passphrase** known by all users and configured on the access point. It is also called **Personal Mode** in the WPA2/WPA3 naming convention.

**Key Characteristics**:

- Single passphrase shared by all users
- Also marketed as WPA2-Personal or WPA3-Personal
- No backend authentication server required
- Simple to deploy and manage
- No per-user accountability

### WPA2-PSK: The 4-Way Handshake

WPA2-PSK uses **PBKDF2** (Password-Based Key Derivation Function 2) to derive cryptographic keys from the passphrase. The process works as follows:

**Step 1 — Key Derivation**:

The passphrase and SSID are processed through PBKDF2 with 4,096 iterations of HMAC-SHA1 to produce a 256-bit **Pairwise Master Key (PMK)**.

```
Passphrase + SSID
       |
       v
  PBKDF2 (4096 iterations, HMAC-SHA1)
       |
       v
  PMK (256 bits)
```

**Step 2 — The 4-Way Handshake**:

Once both client and AP have the PMK, they perform a 4-way handshake to derive session-specific keys:

```
Client (Supplicant)              Access Point (Authenticator)
       |                                    |
       |  Msg 1: ANonce                     |
       |<-----------------------------------|
       |                                    |
       |  (Client generates SNonce,         |
       |   derives PTK from PMK +           |
       |   ANonce + SNonce + MACs)          |
       |                                    |
       |  Msg 2: SNonce + MIC              |
       |----------------------------------->|
       |                                    |
       |  (AP derives PTK, verifies MIC,    |
       |   generates GTK)                   |
       |                                    |
       |  Msg 3: GTK + MIC                 |
       |<-----------------------------------|
       |                                    |
       |  Msg 4: ACK                        |
       |----------------------------------->|
       |                                    |
       |  === Encrypted Traffic Begins ===  |
```

**Key Hierarchy**:

| Key | Full Name | Purpose |
|-----|-----------|---------|
| **PMK** | Pairwise Master Key | Derived from passphrase; used to generate PTK |
| **PTK** | Pairwise Transient Key | Per-session unicast encryption key |
| **GTK** | Group Temporal Key | Shared multicast/broadcast encryption key |
| **ANonce** | Authenticator Nonce | Random value generated by AP |
| **SNonce** | Supplicant Nonce | Random value generated by client |

**Critical Vulnerability**: Because the PMK is derived solely from the passphrase and SSID, an attacker who captures the 4-way handshake can attempt an **offline dictionary/brute-force attack** against the passphrase. This is the basis of tools like Hashcat and Aircrack-ng.

### WPA3-SAE: Simultaneous Authentication of Equals

WPA3-Personal replaces the PSK 4-way handshake with **SAE** (Simultaneous Authentication of Equals), based on the **Dragonfly Key Exchange** protocol (RFC 7664).

**How SAE Differs from PSK**:

| Feature | WPA2-PSK | WPA3-SAE |
|---------|----------|----------|
| Key exchange | 4-way handshake | Dragonfly handshake |
| Offline attack resistance | Vulnerable | **Resistant** |
| Forward secrecy | No | **Yes** |
| Dictionary attack protection | No | **Yes** (rate limiting) |
| Equal authentication | No (client/server model) | **Yes** (peer-to-peer) |

**SAE Process**:

1. **Commit Exchange**: Both parties commit to a shared password element derived from the passphrase using elliptic curve cryptography. Neither party reveals the passphrase.
2. **Confirm Exchange**: Both parties confirm they derived the same key without revealing it.
3. **PMK Derivation**: A unique PMK is derived for this session.
4. **4-Way Handshake**: Standard 4-way handshake uses the SAE-derived PMK.

```
Client                           Access Point
  |                                   |
  |  SAE Commit (scalar, element)     |
  |---------------------------------->|
  |  SAE Commit (scalar, element)     |
  |<----------------------------------|
  |                                   |
  |  SAE Confirm (confirm value)      |
  |---------------------------------->|
  |  SAE Confirm (confirm value)      |
  |<----------------------------------|
  |                                   |
  |  (Both derive unique PMK)         |
  |                                   |
  |  Standard 4-Way Handshake         |
  |<=================================>|
  |                                   |
  |  === Encrypted Traffic Begins === |
```

**Forward Secrecy**: Even if the passphrase is later compromised, previously captured traffic **cannot be decrypted** because each session derives unique keying material through the Diffie-Hellman exchange.

### PSK Best Practices

**Passphrase Requirements**:

- **Minimum**: 8 characters (WPA2 standard requirement)
- **Recommended**: 20+ characters for security
- Use random, complex passphrases
- Avoid dictionary words, company names, addresses

**Passphrase Quality Examples**:

```
WEAK (easily cracked):
  Password123
  CompanyName2025
  Welcome!
  12345678

MODERATE (better but still predictable):
  MyW1F1P@ssw0rd
  Summer2025!Wifi

STRONG (20+ characters, mixed):
  Correct-Horse-Battery-Staple-42
  8kJ#mP9$vL2qR6nT4wF1zX
  BlueDolphins&PurpleRain@Dawn!2025
```

### PSK Limitations and When to Use It

**Security Concerns**:

1. **Shared secret** — everyone knows the same password
2. **No individual accountability** — cannot identify who connected
3. **Difficult to revoke access** — must change password on all devices
4. **Password sharing** — users may share with unauthorized people
5. **No forward secrecy** (WPA2) — compromised key decrypts past captures
6. **No dynamic VLAN assignment** — all users get the same network
7. **No per-user policies** — bandwidth, access rules apply to all equally

**Appropriate Use Cases**:

| Environment | Recommendation |
|------------|----------------|
| Home network | WPA3-SAE preferred, WPA2-PSK acceptable |
| Small office (< 10 users) | PSK acceptable, enterprise preferred |
| Guest network with isolation | PSK with client isolation enabled |
| IoT devices | PSK on dedicated SSID/VLAN |
| Enterprise (> 25 users) | **Do not use PSK** — use 802.1X |

---

## Enterprise Authentication (802.1X)

### Overview

Enterprise authentication provides **individual user/device authentication** through the IEEE 802.1X standard. Rather than a single shared passphrase, each user authenticates with unique credentials verified by a centralized authentication server.

**Key Benefits Over PSK**:

- **Individual accountability** — every connection tied to a specific identity
- **Centralized credential management** — add/remove users in one place
- **Dynamic VLAN assignment** — place users in appropriate VLANs
- **Per-user policies** — bandwidth limits, access rules, session timeouts
- **Revoke access instantly** — disable one account without affecting others
- **Certificate-based options** — eliminate password vulnerabilities entirely

### 802.1X Components

The 802.1X framework involves three distinct entities:

```
+------------------+       +-------------------+       +---------------------+
|   SUPPLICANT     |       |   AUTHENTICATOR   |       |  AUTHENTICATION     |
|   (Client)       |       |   (Access Point)  |       |  SERVER (RADIUS)    |
|                  |       |                   |       |                     |
| - Laptop/phone   | EAPoL | - Wireless AP     | RADIUS| - FreeRADIUS        |
| - 802.1X client  |<----->| - Wired switch    |<----->| - Microsoft NPS     |
| - Provides creds |       | - VPN gateway     |       | - Cisco ISE         |
|                  |       | - Enforces policy  |       | - Verifies identity |
+------------------+       +-------------------+       +---------------------+
                                    |
                           Controlled Port
                           (blocked until auth)
                                    |
                            +---------------+
                            |   NETWORK     |
                            |   RESOURCES   |
                            +---------------+
```

**1. Supplicant (Client)**:

- The device or user requesting network access
- Runs 802.1X client software (built into most modern OSes)
- Provides credentials (username/password, certificate, token)
- Communicates with authenticator via **EAPoL** (EAP over LAN)

**2. Authenticator (Access Point / Switch)**:

- The network device that controls access
- Maintains two virtual ports: **controlled** (blocked) and **uncontrolled** (EAP only)
- **Does not make authentication decisions** — merely relays credentials
- Enforces the result: grants or denies access based on RADIUS response

**3. Authentication Server (RADIUS)**:

- The backend server that verifies credentials
- Checks against identity stores: Active Directory, LDAP, SQL database
- Returns **Access-Accept**, **Access-Reject**, or **Access-Challenge**
- Can return attributes: VLAN ID, bandwidth policy, session timeout

### Detailed 802.1X Authentication Flow

```
Supplicant              Authenticator            RADIUS Server
 (Client)                 (AP)                   (Auth Server)
    |                       |                         |
    |  EAPOL-Start          |                         |
    |---------------------->|                         |
    |                       |                         |
    |  EAP-Request/Identity |                         |
    |<----------------------|                         |
    |                       |                         |
    |  EAP-Response/Identity|                         |
    |  (username)           |                         |
    |---------------------->|                         |
    |                       |  RADIUS Access-Request  |
    |                       |  (EAP-Response)         |
    |                       |------------------------>|
    |                       |                         |
    |                       |  RADIUS Access-Challenge|
    |                       |  (EAP-Request)          |
    |                       |<------------------------|
    |  EAP-Request          |                         |
    |  (Auth Method)        |                         |
    |<----------------------|                         |
    |                       |                         |
    |  EAP-Response         |                         |
    |  (Credentials)        |                         |
    |---------------------->|                         |
    |                       |  RADIUS Access-Request  |
    |                       |------------------------>|
    |                       |                         |
    |                       |  (Credential validation |
    |                       |   against AD/LDAP/DB)   |
    |                       |                         |
    |                       |  RADIUS Access-Accept   |
    |                       |  (VLAN, policy attrs)   |
    |                       |<------------------------|
    |  EAP-Success          |                         |
    |<----------------------|                         |
    |                       |                         |
    |  4-Way Handshake      |                         |
    |<=====================>|                         |
    |                       |                         |
    |  === Encrypted Traffic Begins ===               |
```

### EAP (Extensible Authentication Protocol)

**EAP** is not a single authentication method but a **framework** that supports many different authentication methods (called EAP types or EAP methods). EAP messages are transported between the supplicant and authenticator using **EAPoL** (EAP over LAN, IEEE 802.1X), and between the authenticator and RADIUS server inside RADIUS packets.

**EAP Packet Structure**:

```
+--------+--------+--------+--------+
|  Code  |  ID    |     Length      |
+--------+--------+--------+--------+
|  Type  |     Type Data ...        |
+--------+--------+--------+--------+

Codes: 1=Request, 2=Response, 3=Success, 4=Failure
```

### EAP Methods in Detail

#### 1. PEAP (Protected EAP)

**PEAP** is the **most widely deployed** EAP method for wireless enterprise authentication, developed jointly by Microsoft, Cisco, and RSA Security.

**Architecture**: PEAP creates a **TLS tunnel** using the server's certificate, then runs an inner authentication method inside that tunnel.

```
+--------------------------------------------------+
|                 TLS Tunnel (outer)                |
|  +--------------------------------------------+  |
|  |    Inner Authentication (EAP-MSCHAPv2)     |  |
|  |    - Username: jsmith                       |  |
|  |    - Password: ********                     |  |
|  +--------------------------------------------+  |
+--------------------------------------------------+
         Protected by server certificate
```

**PEAP Versions**:

| Version | Inner Method | Vendor | Notes |
|---------|-------------|--------|-------|
| PEAPv0/EAP-MSCHAPv2 | MSCHAPv2 | Microsoft | Most common; integrates with AD |
| PEAPv1/EAP-GTC | GTC (Generic Token Card) | Cisco | Supports OTP tokens |

**PEAP Authentication Process**:

1. AP sends EAP-Request/Identity to client
2. Client responds with identity (username)
3. RADIUS server presents its **server certificate**
4. Client validates the certificate against its **trusted CA store**
5. **TLS tunnel** is established (encrypted channel)
6. Inside the tunnel: client sends **username and password** via MSCHAPv2
7. RADIUS verifies credentials against Active Directory / LDAP
8. RADIUS sends Access-Accept or Access-Reject

**Advantages**:
- Easy client deployment — only requires username/password
- No client certificates needed
- Server certificate protects credentials in transit
- Integrates seamlessly with Active Directory

**Disadvantages**:
- Server certificate must be managed and trusted by all clients
- Passwords can still be weak or compromised
- Single-factor (password only, unless combined with MFA)

#### 2. EAP-TLS (EAP-Transport Layer Security)

**EAP-TLS** is the **most secure** EAP method, providing **mutual certificate authentication** — both the server and client present digital certificates.

**Architecture**: No passwords are involved. Authentication is based entirely on the cryptographic verification of X.509 certificates.

```
Client                              RADIUS Server
  |                                       |
  |  Server presents certificate          |
  |<--------------------------------------|
  |  Client validates server cert         |
  |  (checks CA chain, expiration,        |
  |   revocation via CRL/OCSP)            |
  |                                       |
  |  Client presents certificate          |
  |-------------------------------------->|
  |  Server validates client cert         |
  |  (checks CA chain, expiration,        |
  |   maps cert to user identity)         |
  |                                       |
  |  TLS tunnel established               |
  |<=====================================>|
  |                                       |
  |  EAP-Success                          |
  |<--------------------------------------|
```

**Advantages**:
- **Strongest security** of any EAP method
- Immune to password attacks (no passwords used)
- Mutual authentication prevents rogue server attacks
- Non-repudiation through certificate binding

**Disadvantages**:
- Requires full **PKI infrastructure** (Certificate Authority)
- Client certificate must be deployed to **every device**
- Certificate lifecycle management (issuance, renewal, revocation)
- More complex initial setup

**Certificate Deployment Methods**:

| Method | Platform | Automation Level |
|--------|----------|-----------------|
| Manual (.pfx/.p12 import) | Any | None |
| Group Policy (GPO) | Windows domain | Full |
| MDM profiles | iOS, Android, macOS | Full |
| SCEP (Simple Certificate Enrollment Protocol) | Cross-platform | Full |
| EST (Enrollment over Secure Transport) | Cross-platform | Full |

#### 3. EAP-TTLS (EAP-Tunneled TLS)

**EAP-TTLS** is similar to PEAP but offers greater flexibility in inner authentication methods.

**Key Differences from PEAP**:

| Feature | PEAP | EAP-TTLS |
|---------|------|----------|
| Inner methods | MSCHAPv2, GTC | PAP, CHAP, MSCHAPv2, EAP |
| Vendor support | Excellent (Windows native) | Moderate (requires supplicant) |
| Legacy system support | Limited | **Better** (PAP for older systems) |
| Client cert option | No | Optional |

**Use Case**: Environments with legacy systems that need PAP or CHAP for inner authentication, or heterogeneous environments requiring flexible authentication backends.

#### 4. EAP-FAST (EAP-Flexible Authentication via Secure Tunneling)

Originally developed by **Cisco** as a replacement for LEAP, EAP-FAST eliminates the need for server certificates by using **PACs** (Protected Access Credentials).

**PAC Provisioning**:

- **Phase 0** (optional): Automatic PAC provisioning — the PAC is delivered to the client
- **Phase 1**: TLS tunnel established using the PAC
- **Phase 2**: Inner authentication (MSCHAPv2, GTC, or TLS)

**Advantages**:
- No PKI infrastructure required
- Faster deployment than certificate-based methods
- Supports automatic PAC provisioning

**Disadvantages**:
- Automatic PAC provisioning (Phase 0) is vulnerable to MITM attacks
- Less widely supported outside Cisco environments
- PAC management adds operational complexity

#### 5. LEAP (Lightweight EAP) — DEPRECATED

**LEAP** was an early Cisco-proprietary EAP method. It is **deprecated and should never be used** due to critical security vulnerabilities:

- Uses a modified MS-CHAPv2 that is vulnerable to **offline dictionary attacks**
- Tools like **ASLEAP** can crack LEAP credentials in minutes
- No TLS tunnel — credentials are exposed
- **Replace with EAP-FAST or PEAP** in any environment still using LEAP

### Comprehensive EAP Method Comparison

| Feature | PEAP | EAP-TLS | EAP-TTLS | EAP-FAST | LEAP |
|---------|------|---------|----------|----------|------|
| **Server Certificate** | Required | Required | Required | Optional (PAC) | No |
| **Client Certificate** | No | **Required** | Optional | No | No |
| **Credential Type** | Username/Password | Certificates | Username/Password | Username/Password | Username/Password |
| **TLS Tunnel** | Yes | Yes | Yes | Yes (PAC-based) | No |
| **Security Level** | Good | **Excellent** | Good | Good | **Broken** |
| **Deployment Ease** | Easy | Complex | Moderate | Easy | Easy |
| **Windows Native** | Yes | Yes | No (needs supplicant) | No | No |
| **AD Integration** | Excellent | Good | Good | Good | N/A |
| **Vendor** | Microsoft/Cisco | IETF Standard | IETF Standard | Cisco | Cisco |
| **Status** | Active | Active | Active | Active | **Deprecated** |

---

## RADIUS in Wireless Networks

### Overview

RADIUS (UDP 1812/1813) is the backend authentication server for enterprise wireless — it is the protocol that makes 802.1X work in practice. For a full treatment of the RADIUS protocol (message format, shared secrets, proxy chains, and the comparison with TACACS+), see [Lesson 33: Authentication and Authorization](lesson-033-authentication-authorization). This section focuses on how RADIUS is deployed and configured **specifically for wireless authentication**.

### Wireless RADIUS Architecture

```
                     +---------------------------+
                     |     Identity Stores       |
                     |  +--------+ +----------+  |
                     |  | Active | |   LDAP   |  |
                     |  |Directory| |  Server  |  |
                     |  +--------+ +----------+  |
                     |  +--------+ +----------+  |
                     |  |  SQL   | | Token    |  |
                     |  |Database| | Server   |  |
                     |  +--------+ +----------+  |
                     +------------+--------------+
                                  |
                     +------------v--------------+
                     |      RADIUS Server        |
                     |  - FreeRADIUS (Linux)      |
                     |  - Microsoft NPS (Windows) |
                     |  - Cisco ISE (Enterprise)  |
                     |  - Aruba ClearPass         |
                     +------------+--------------+
                                  | RADIUS
                    +-------------+-------------+
                    |             |             |
              +-----v-----+ +---v-------+ +---v-------+
              |   AP #1   | |   AP #2   | |   AP #3   |
              | (RADIUS   | | (RADIUS   | | (RADIUS   |
              |  Client)  | |  Client)  | |  Client)  |
              +-----------+ +-----------+ +-----------+
```

### Wireless-Specific RADIUS Attributes

RADIUS responses carry attributes that instruct the AP how to handle the authenticated wireless client. Several attributes are especially important in wireless deployments:

| Attribute | Purpose | Example |
|-----------|---------|---------|
| **Tunnel-Type** | VLAN assignment type | VLAN (13) |
| **Tunnel-Medium-Type** | Network medium | IEEE-802 (6) |
| **Tunnel-Private-Group-Id** | VLAN ID to assign | 100 |
| **Called-Station-Id** | AP MAC + SSID identifier | 00:1A:2B:3C:4D:5E:Corp-WiFi |
| **Calling-Station-Id** | Client MAC address | AA:BB:CC:DD:EE:FF |
| **Session-Timeout** | Auto-disconnect timer | 3600 (seconds) |
| **Filter-Id** | Firewall/ACL policy | "EMPLOYEE-ACL" |
| **Acct-Interim-Interval** | Accounting update frequency | 300 (seconds) |
| **Class** | Group membership tag | "Staff" |
| **Airespace-ACL-Name** (Cisco VSA) | Wireless ACL | "BYOD-Restrict" |
| **Aruba-User-Role** (Aruba VSA) | Wireless role assignment | "employee" |

The **Called-Station-Id** attribute is particularly important for wireless because it encodes both the AP's BSSID and the SSID name. This enables RADIUS policies that differentiate behavior based on *which SSID* the user connected to — for example, applying different VLAN assignments for the same user depending on whether they joined "Corp-WiFi" or "BYOD-WiFi".

**Policy Differentiation by SSID**:

```
RADIUS Policy: "Corporate SSID Policy"
  Condition: Called-Station-Id contains "Corp-WiFi"
  Action: Tunnel-Private-Group-Id = 110 (Corporate VLAN)
          Filter-Id = "Full-Access-ACL"

RADIUS Policy: "BYOD SSID Policy"
  Condition: Called-Station-Id contains "BYOD-WiFi"
  Action: Tunnel-Private-Group-Id = 150 (BYOD VLAN)
          Filter-Id = "Internet-Only-ACL"
          Session-Timeout = 28800 (8 hours)
```

**Dynamic VLAN Assignment Example**:

```
User: jsmith (Engineering department)
  → RADIUS returns: Tunnel-Private-Group-Id = 110
  → AP places client on VLAN 110 (Engineering)

User: mjones (Marketing department)
  → RADIUS returns: Tunnel-Private-Group-Id = 120
  → AP places client on VLAN 120 (Marketing)

User: contractor1 (External contractor)
  → RADIUS returns: Tunnel-Private-Group-Id = 200
  → AP places client on VLAN 200 (Guest/Restricted)
```

### RADIUS High Availability for Wireless

Because RADIUS is the single point of authentication for all enterprise wireless clients, high availability is critical. If the RADIUS server is unreachable, **no new clients can authenticate**.

**HA Strategies**:

| Strategy | Description |
|----------|-------------|
| **Primary/Secondary** | APs configured with two RADIUS servers; failover on timeout |
| **Load Balancing** | WLC distributes requests across multiple RADIUS servers |
| **Local Authentication Fallback** | WLC caches credentials for emergency use when RADIUS is down |
| **RADIUS Server Clustering** | Active/active or active/passive cluster (e.g., NPS with SQL backend) |

**Typical AP RADIUS Configuration**:

```
# Cisco WLC RADIUS configuration example
radius server PRIMARY-RADIUS
  address ipv4 10.1.1.50 auth-port 1812 acct-port 1813
  key 0 S3cur3Sh@r3dK3y!
  priority 1

radius server SECONDARY-RADIUS
  address ipv4 10.1.2.50 auth-port 1812 acct-port 1813
  key 0 S3cur3Sh@r3dK3y!
  priority 2

# Failover: 5-second timeout, 3 retransmits before failover
aaa server radius dynamic-author
  client 10.1.1.50 server-key S3cur3Sh@r3dK3y!
```

> For a detailed comparison of RADIUS vs. TACACS+ (transport, encryption, AAA separation, and use cases), see [Lesson 33: Authentication and Authorization](lesson-033-authentication-authorization).

---

## MAC Filtering

### How It Works

**MAC filtering** restricts network access based on the client's **MAC address** (hardware address). The AP maintains an **allow list** (whitelist) or **deny list** (blacklist) of MAC addresses.

**Allow-list approach**: Only listed MACs can connect
**Deny-list approach**: Listed MACs are blocked; all others can connect

### MAC Filtering Limitations

MAC filtering is **not a true security mechanism** and should never be relied upon as the sole authentication method:

1. **MAC addresses can be spoofed** — trivially easy with one command:
   ```
   # Linux: change MAC to match an authorized device
   sudo ifconfig wlan0 hw ether AA:BB:CC:DD:EE:FF
   ```
2. **MAC addresses are transmitted in cleartext** in 802.11 headers, even on encrypted networks
3. **Administrative burden** — every new device must be manually added
4. **No scalability** — impractical for environments with hundreds of devices
5. **Breaks BYOD** — personal devices constantly need to be registered

**Appropriate Use**: MAC filtering can serve as a **supplementary layer** on top of real authentication (defense in depth), but never as the primary access control.

### MAC Address Bypass (MAB) in Enterprise

Many network devices — printers, IP cameras, medical equipment, badge readers, IoT sensors — **cannot perform 802.1X authentication** because they lack a supplicant. **MAC Authentication Bypass (MAB)** provides a solution by using the device's MAC address as its credential against the RADIUS server.

**How MAB Works**:

```
IoT Device                   Switch/AP                  RADIUS Server
(No 802.1X supplicant)       (Authenticator)             (with MAC DB)
    |                             |                           |
    |  Connect to network         |                           |
    |  (no EAPOL-Start sent)      |                           |
    |---------------------------->|                           |
    |                             |                           |
    |  802.1X timeout (30s)       |                           |
    |  Switch falls back to MAB   |                           |
    |                             |                           |
    |                             |  Access-Request           |
    |                             |  User-Name = aabbccddeeff |
    |                             |  User-Password = aabbccddeeff
    |                             |  Service-Type = Call-Check|
    |                             |-------------------------->|
    |                             |                           |
    |                             |  RADIUS checks MAC DB     |
    |                             |  (static list or profiler)|
    |                             |                           |
    |                             |  Access-Accept            |
    |                             |  Tunnel-Private-Group-Id  |
    |                             |  = 300 (IoT VLAN)         |
    |                             |<--------------------------|
    |                             |                           |
    |  Port opened on VLAN 300    |                           |
    |<----------------------------|                           |
```

**MAB Security Considerations**:

- MAB is **inherently less secure** than 802.1X because MAC addresses can be spoofed
- Always place MAB devices on **restricted VLANs** with tight ACLs
- Use **device profiling** (Cisco ISE, Aruba ClearPass) to validate that the device type matches expectations (e.g., a device claiming to be a printer should behave like a printer)
- Implement **dynamic authorization (CoA)** — if profiling detects anomalous behavior, the device is re-evaluated or quarantined

**MAB with Device Profiling Integration**:

```
Phase 1: MAB Authentication
  → Device MAC aa:bb:cc:dd:ee:ff authenticated
  → Placed on IoT VLAN 300 with restricted ACL

Phase 2: Profiling (continuous)
  → ISE/ClearPass collects:
    - DHCP fingerprint (option 55, vendor class)
    - HTTP User-Agent string
    - DNS queries
    - LLDP/CDP information
    - TCP/UDP port behavior
  → Device profiled as: "HP LaserJet Printer"

Phase 3: Policy Refinement
  → RADIUS CoA (Change of Authorization) issued
  → Device moved to Printer VLAN 310
  → ACL updated: allow TCP 9100 (printing), deny all else

Phase 4: Anomaly Detection
  → If device starts SSH scanning or unusual traffic:
  → CoA issued → Device quarantined to VLAN 999
  → Alert sent to SOC team
```

**MAB Configuration Example (Cisco Switch)**:

```
interface GigabitEthernet1/0/24
  description IoT-Printer-Port
  switchport mode access
  switchport access vlan 300
  authentication port-control auto
  authentication order dot1x mab
  authentication priority dot1x mab
  mab
  dot1x pae authenticator
  dot1x timeout tx-period 10
  spanning-tree portfast
```

This configuration tries 802.1X first, then falls back to MAB if the device does not respond with EAPOL frames within the timeout period.

---

## Captive Portals

### Overview

A **captive portal** intercepts HTTP/HTTPS traffic from unauthenticated clients and redirects them to a web-based login page. This is the standard approach for **guest Wi-Fi** in hotels, airports, coffee shops, hospitals, and corporate visitor networks.

### Captive Portal Architecture

```
+-----------+         +------------------+        +--------------+
|  Guest    |  Open   |  Access Point /  |  VLAN  |  Captive     |
|  Device   |  Assoc  |  WLC             |  200   |  Portal      |
|           |-------->|                  |------->|  Server      |
+-----------+         |  (Firewall       |        |              |
                      |   blocks all     |        | - Login page |
  1. Connects to      |   traffic except |        | - RADIUS     |
     "Guest-WiFi"     |   DHCP, DNS,     |        | - Policy     |
                      |   portal)        |        |   engine     |
  2. Gets IP via      +------------------+        +--------------+
     DHCP                     |
                              |  After auth:
  3. Opens browser            |  Firewall rule added
     → Redirected to          |  for client MAC/IP
     captive portal           |
                              v
  4. Authenticates     +------------------+
     (or accepts ToS)  |   Internet       |
                       |   Access         |
  5. Internet access   +------------------+
     granted
```

### Captive Portal Authentication Methods

| Method | Description | Use Case |
|--------|-------------|----------|
| **Click-through** | Accept Terms of Service only | Coffee shops, free Wi-Fi |
| **Self-registration** | Email, phone number | Hotels, convention centers |
| **Voucher codes** | Pre-generated time-limited codes | Hotels (front desk issued) |
| **Social login** | Authenticate via Google, Facebook, etc. | Retail, restaurants |
| **RADIUS-backed** | Corporate credentials | Employee guest access |
| **SMS verification** | OTP sent to phone number | Public Wi-Fi with identity |
| **Sponsored access** | Employee sponsors/approves guest | Corporate visitor programs |

### Captive Portal Best Practices

- **HTTPS** for the portal page itself (protect submitted credentials)
- **VLAN isolation** — guest traffic on separate VLAN from corporate
- **Firewall rules** — block access to internal networks from guest VLAN
- **Bandwidth throttling** — fair-use limits per client
- **Session timeout** — auto-expire after defined period (e.g., 8 hours)
- **Client isolation** — block client-to-client traffic on the guest SSID
- **Logging** — maintain records per legal requirements
- **Walled garden** — allow certain destinations (e.g., company website) before authentication

### Captive Portal Security Considerations

Captive portals introduce unique security challenges that must be addressed in any deployment:

**HTTPS Enforcement**:

The portal login page itself **must** be served over HTTPS to protect user credentials in transit. However, the initial redirect from HTTP to the portal creates a brief window of vulnerability:

```
1. Client opens http://example.com
2. AP/WLC intercepts the HTTP request
3. AP returns HTTP 302 Redirect to https://portal.company.com/login
4. Client connects to portal over HTTPS
5. User submits credentials over encrypted connection

Risk: Step 2-3 is unencrypted. Mitigations:
  - Use HSTS (HTTP Strict Transport Security) on portal domain
  - Deploy CAPWAP or WISPr 2.0 for automatic portal detection
  - Modern devices use Captive Network Assistant (CNA) for auto-detection
    (Apple CNA, Android captive portal check, Windows NCSI)
```

**Session Timeout Management**:

| Timeout Type | Purpose | Typical Value |
|-------------|---------|---------------|
| **Session Timeout** | Maximum connection duration | 8-24 hours |
| **Idle Timeout** | Disconnect after inactivity | 30-60 minutes |
| **Reauthentication Interval** | Force periodic re-login | 24 hours |
| **Absolute Timeout** | Hard disconnect regardless of activity | 7 days |

Session timeouts should balance security with user convenience. Short timeouts improve security but frustrate users who must re-authenticate frequently. For hotel or conference scenarios, align session duration with the guest's expected stay.

**Terms of Service (ToS) Enforcement**:

- Present ToS/AUP (Acceptable Use Policy) before granting access
- Log acceptance with **timestamp, client MAC, IP address, and user identifier**
- Maintain logs for legal liability protection (typically 90-365 days)
- Consider **age verification** requirements for public Wi-Fi in some jurisdictions
- Store acceptance records in a tamper-evident audit log

**Bandwidth Throttling Integration**:

```
Guest Bandwidth Policy Example:

  Tier 1: Free Guest Access (click-through)
    - Download: 5 Mbps per client
    - Upload: 2 Mbps per client
    - Daily data cap: 500 MB
    - Session timeout: 4 hours

  Tier 2: Registered Guest (email/phone)
    - Download: 25 Mbps per client
    - Upload: 10 Mbps per client
    - Daily data cap: 2 GB
    - Session timeout: 24 hours

  Tier 3: Sponsored Guest (employee-approved)
    - Download: 50 Mbps per client
    - Upload: 25 Mbps per client
    - No data cap
    - Session timeout: 7 days

Implementation: RADIUS returns bandwidth attributes per tier:
  - Cisco-AVPair: "ip:sub-qos-policy-in=Guest-5Mbps-In"
  - Cisco-AVPair: "ip:sub-qos-policy-out=Guest-2Mbps-Out"
  - WISPr-Bandwidth-Max-Down: 5242880 (bits/sec)
  - WISPr-Bandwidth-Max-Up: 2097152 (bits/sec)
```

---

## Wireless Guest Access Architectures

### Overview

Enterprise guest wireless access requires more than just a captive portal. A complete guest access architecture must address **network segmentation, policy enforcement, lifecycle management, and regulatory compliance** while providing a seamless user experience.

### Anchor Controller Model

In campus networks with multiple wireless controllers, guest traffic from any AP can be **tunneled to a single anchor controller** located in the DMZ. This centralizes guest traffic handling and simplifies security policy enforcement.

```
                     Corporate Network
    +--------------------------------------------------+
    |                                                  |
    |   +------------+        +------------+           |
    |   | WLC-1      |        | WLC-2      |           |
    |   | (Building A)|        | (Building B)|          |
    |   +-----+------+        +------+-----+           |
    |         |                      |                 |
    |    +----+----+            +----+----+             |
    |    |AP  |AP  |            |AP  |AP  |             |
    |    +----+----+            +----+----+             |
    |         |                      |                 |
    |         |   Guest CAPWAP       |                 |
    |         |   Tunnel             |                 |
    |         +----------+-----------+                 |
    |                    |                             |
    +--------------------+-----------------------------+
                         |
                    +----v--------+
                    |  Anchor WLC |    DMZ
                    |  (Guest     |    Segment
                    |   Traffic)  |
                    +----+--------+
                         |
                    +----v--------+
                    |  Firewall   |
                    +----+--------+
                         |
                    +----v--------+
                    |  Internet   |
                    +-------------+
```

**Benefits**:
- Guest traffic **never traverses** the internal corporate network
- Single point of policy enforcement for all guest traffic
- Simplified firewall rules — only the anchor controller needs internet-facing rules
- Consistent guest experience regardless of physical location

### DMZ Wireless Placement

For organizations without wireless controllers that support anchoring, a dedicated **DMZ wireless segment** provides similar isolation:

```
Architecture Options:

  Option A: Dedicated Guest APs in DMZ VLAN
    - Separate VLAN trunked from APs to DMZ firewall zone
    - Guest SSID mapped to DMZ VLAN (e.g., VLAN 400)
    - Firewall rules: allow DNS, DHCP, HTTP/HTTPS to internet only
    - Deny: all RFC 1918 destinations (no internal access)

  Option B: Guest SSID with Firewall-Based Segmentation
    - Guest traffic on dedicated VLAN routed through firewall
    - Firewall applies per-user bandwidth limits
    - URL filtering / content inspection on guest traffic
    - IDS/IPS monitoring of guest segment

  Option C: Cloud-Managed Guest (Meraki, Mist)
    - Guest traffic tunneled directly to cloud gateway
    - No local breakout — traffic exits via cloud provider
    - Simplest segmentation but adds latency
```

### Temporal Access Policies

Guest access should be **time-bounded** to reduce the attack surface:

| Policy Element | Description | Example |
|---------------|-------------|----------|
| **Start Time** | When access becomes valid | Check-in date/time |
| **End Time** | When access expires | Check-out date + 2 hours |
| **Active Hours** | Hours of day access is allowed | 6:00 AM – 11:00 PM |
| **Maximum Duration** | Longest a single session can last | 24 hours |
| **Renewal Limit** | How many times access can be renewed | 3 renewals |
| **Cooldown Period** | Wait time before re-registration | 1 hour after expiry |

### Sponsor-Based Guest Approvals

In corporate environments, a **sponsor workflow** ensures that every guest has an accountable employee who approved their access:

```
Sponsor-Based Guest Access Workflow:

  1. Guest connects to "Guest-WiFi" SSID
     → Captive portal loads

  2. Guest enters:
     - Full name
     - Email address
     - Company/organization
     - Reason for visit
     - Sponsor's email (employee who invited them)

  3. System sends approval email to sponsor:
     "John Doe (Acme Corp) is requesting guest Wi-Fi access.
      Reason: Vendor meeting with Engineering team.
      [APPROVE] [DENY]"

  4. Sponsor clicks [APPROVE]
     → Guest receives email/SMS with access credentials
     → Time-limited account created (e.g., 8 hours)
     → Guest placed on Guest VLAN with restricted ACL

  5. Audit trail created:
     - Guest name, MAC, IP, sponsor name
     - Approval timestamp
     - Session start/end times
     - Bandwidth consumed
```

### Self-Registration Workflows

For public-facing environments (retail, hospitality, events) where sponsor approval is impractical:

```
Self-Registration Flow:

  1. Guest connects to open SSID
  2. Captive portal requests:
     - Email address or phone number
     - Acceptance of Terms of Service
  3. Verification:
     - Email: magic link sent to verify address
     - SMS: OTP code sent to phone number
  4. Guest enters verification code
  5. Account created with predefined policy:
     - Duration: 4 hours (renewable once)
     - Bandwidth: 10 Mbps down / 5 Mbps up
     - Content filter: enabled
     - VLAN: Guest-Public (VLAN 410)
  6. Device MAC cached for seamless reconnection
     within the session window
```

**Self-Registration Security Controls**:

- Rate-limit registration attempts per MAC address
- Require CAPTCHA to prevent automated abuse
- Block disposable email domains if using email verification
- Implement device registration limits (e.g., max 3 devices per email)
- Log all registrations for compliance and incident response

---

## Certificate-Based Authentication

### Public Key Infrastructure (PKI) Overview

Certificate-based authentication requires a **PKI** (Public Key Infrastructure) — a system for creating, distributing, managing, and revoking digital certificates.

**PKI Components**:

```
+---------------------------+
|     Root CA               |  (Offline, secured)
|  - Self-signed cert       |
|  - Signs Intermediate CAs |
+------------+--------------+
             |
+------------v--------------+
|  Intermediate CA          |  (Online, operational)
|  - Signed by Root CA      |
|  - Signs end-entity certs |
+-----+---------------+----+
      |               |
+-----v-----+   +-----v-----+
| Server    |   | Client    |
| Certificate|   | Certificate|
| (RADIUS)  |   | (Laptop/  |
|           |   |  Phone)   |
+-----------+   +-----------+
```

### X.509 Certificate Fields

| Field | Description | Example |
|-------|-------------|---------|
| **Subject** | Entity the cert identifies | CN=jsmith, O=Company Inc |
| **Issuer** | CA that signed the cert | CN=Company Intermediate CA |
| **Serial Number** | Unique identifier | 4A:3B:2C:1D... |
| **Not Before** | Validity start date | Jan 1, 2025 |
| **Not After** | Validity end date | Jan 1, 2027 |
| **Public Key** | Subject's public key | RSA 2048-bit |
| **Key Usage** | Permitted operations | Digital Signature, Key Encipherment |
| **Subject Alternative Name** | Additional identities | DNS:radius.company.com |
| **CRL Distribution Point** | Where to check revocation | http://crl.company.com/ca.crl |

### Certificate Validation Process

When a client validates the RADIUS server certificate (or vice versa), it performs these checks:

1. **Chain of Trust** — trace the certificate back to a trusted Root CA
2. **Expiration** — verify the certificate is within its validity period
3. **Revocation** — check CRL (Certificate Revocation List) or OCSP (Online Certificate Status Protocol)
4. **Name Match** — verify the server name matches the certificate's Subject/SAN
5. **Key Usage** — confirm the certificate is authorized for this purpose

---

## WPA2-Enterprise Configuration Workflow

Deploying WPA2-Enterprise involves coordinating multiple components. Here is a step-by-step workflow:

**Step 1: Deploy RADIUS Server**
- Install and configure RADIUS software (e.g., Microsoft NPS, FreeRADIUS)
- Connect to identity store (Active Directory, LDAP)
- Obtain and install a server certificate

**Step 2: Configure RADIUS Clients**
- Register each AP (or wireless controller) as a RADIUS client
- Configure shared secret between AP and RADIUS server
- Define IP address or range of RADIUS clients

**Step 3: Create Authentication Policies**
- Define which EAP methods are allowed (PEAP, EAP-TLS)
- Configure connection request policies
- Set authorization rules (VLAN assignment, access policies)

**Step 4: Configure Wireless Infrastructure**
- Set SSID security mode to WPA2-Enterprise
- Point AP/controller to RADIUS server IP and port
- Configure RADIUS shared secret on AP
- Enable 802.1X authentication

**Step 5: Configure Clients**
- Deploy CA certificate to client trust stores (GPO, MDM)
- Configure wireless profile with correct EAP method
- For EAP-TLS: deploy client certificates
- For PEAP: configure to validate server certificate

**Step 6: Test and Validate**
- Test authentication with multiple user accounts
- Verify VLAN assignment works correctly
- Test certificate validation (use wrong cert to verify rejection)
- Monitor RADIUS logs for errors

### Windows NPS Configuration for Wireless

Microsoft **Network Policy Server (NPS)** is the most common RADIUS implementation in Windows Active Directory environments. Below is a step-by-step configuration for WPA2-Enterprise with PEAP:

**1. Install NPS Role and Register in AD**:

```powershell
# Install NPS role via PowerShell
Install-WindowsFeature NPAS -IncludeManagementTools

# Register NPS in Active Directory
# (Grants NPS permission to read user dial-in properties)
netsh ras add registeredserver
```

**2. Add RADIUS Clients (Wireless Controllers/APs)**:

```
NPS Console → RADIUS Clients and Servers → RADIUS Clients → New

  Friendly Name:    WLC-Primary
  Address (IP):     10.1.1.10
  Shared Secret:    [Generate strong 32+ char random secret]
  Vendor Name:      RADIUS Standard (or select Cisco, Aruba, etc.)
```

**3. Create Connection Request Policy**:

```
NPS Console → Policies → Connection Request Policies → New

  Policy Name:      Wireless-802.1X
  Type of network access server: IEEE 802.1X (Wireless)
  Conditions:
    - NAS Port Type = Wireless - IEEE 802.11
  Settings:
    - Authentication: Authenticate requests on this server
```

**4. Create Network Policy for Wireless Users**:

```
NPS Console → Policies → Network Policies → New

  Policy Name:       Corporate-Wireless-Access
  Access Permission: Grant access

  Conditions:
    - Windows Groups = "Domain Users" (or specific Wi-Fi group)
    - NAS Port Type = Wireless - IEEE 802.11
    - Called-Station-Id matches ".*Corp-WiFi" (optional: SSID filter)

  Constraints → Authentication Methods:
    - Add: Microsoft: Protected EAP (PEAP)
    - PEAP Settings:
        Certificate Issued To: radius.company.com
        EAP Types: EAP-MSCHAPv2
        Enable Fast Reconnect: Yes

  Settings → RADIUS Attributes → Standard:
    - Tunnel-Type = VLAN
    - Tunnel-Medium-Type = 802
    - Tunnel-Private-Group-Id = 110  (Corporate VLAN)
    - Session-Timeout = 28800 (8 hours)
```

**5. Configure Server Certificate**:

```
# Option A: Enterprise CA auto-enrollment via Group Policy
# Configure certificate template: "RAS and IAS Server"
# NPS auto-enrolls and selects the certificate

# Option B: Manual certificate request
# Use certlm.msc → Personal → Request New Certificate
# Select "RAS and IAS Server" template
# Ensure Subject Alternative Name includes: radius.company.com
```

### Linux FreeRADIUS Configuration for Wireless

**FreeRADIUS** is the most widely deployed open-source RADIUS server, used in both small deployments and large-scale environments (ISPs, universities, eduroam).

**1. Install FreeRADIUS**:

```bash
# Debian/Ubuntu
sudo apt install freeradius freeradius-utils freeradius-ldap

# RHEL/CentOS
sudo dnf install freeradius freeradius-utils freeradius-ldap
```

**2. Configure RADIUS Clients** (`/etc/freeradius/3.0/clients.conf`):

```
# Wireless LAN Controller
client wlc-primary {
    ipaddr          = 10.1.1.10
    secret          = Y0urStr0ngSh@r3dS3cret!
    shortname       = wlc-primary
    nastype         = cisco    # or "other" for generic
}

# Individual APs (if not using a WLC)
client ap-building-a {
    ipaddr          = 10.1.5.0/24
    secret          = APsh@r3dK3y2025!
    shortname       = building-a-aps
}
```

**3. Configure EAP** (`/etc/freeradius/3.0/mods-enabled/eap`):

```
eap {
    default_eap_type = peap
    timer_expire     = 60
    ignore_unknown_eap_types = no
    max_sessions     = 4096

    tls-config tls-common {
        private_key_file    = /etc/freeradius/3.0/certs/server.key
        certificate_file    = /etc/freeradius/3.0/certs/server.pem
        ca_file             = /etc/freeradius/3.0/certs/ca.pem
        dh_file             = /etc/freeradius/3.0/certs/dh
        tls_min_version     = "1.2"
        cipher_list         = "HIGH:!aNULL:!MD5:!RC4"
    }

    peap {
        default_eap_type = mschapv2
        copy_request_to_tunnel = yes
        use_tunneled_reply = yes
    }

    tls {
        tls = tls-common
    }
}
```

**4. Configure VLAN Assignment** (`/etc/freeradius/3.0/policy.d/wireless-vlan`):

```
# Assign VLAN based on LDAP group membership
post-auth {
    if (&LDAP-Group == "cn=Engineering,ou=Groups,dc=company,dc=com") {
        update reply {
            Tunnel-Type := VLAN
            Tunnel-Medium-Type := IEEE-802
            Tunnel-Private-Group-Id := 110
        }
    }
    elsif (&LDAP-Group == "cn=Marketing,ou=Groups,dc=company,dc=com") {
        update reply {
            Tunnel-Type := VLAN
            Tunnel-Medium-Type := IEEE-802
            Tunnel-Private-Group-Id := 120
        }
    }
    elsif (&LDAP-Group == "cn=Contractors,ou=Groups,dc=company,dc=com") {
        update reply {
            Tunnel-Type := VLAN
            Tunnel-Medium-Type := IEEE-802
            Tunnel-Private-Group-Id := 200
            Session-Timeout := 14400    # 4-hour limit for contractors
        }
    }
}
```

**5. Test Authentication**:

```bash
# Test with radtest utility
radtest jsmith P@ssw0rd123 localhost 0 testing123

# Test with EAP (eapol_test from wpa_supplicant package)
eapol_test -c peap-mschapv2.conf -a 127.0.0.1 -s testing123

# Monitor authentication in real time
sudo freeradius -X    # Debug mode — shows full auth flow
```

---

## Federated Authentication (eduroam)

### Overview

**eduroam** (education roaming) is a federated wireless authentication service used by universities, research institutions, and educational organizations worldwide. It allows users to authenticate on any participating institution's network using their **home institution credentials**.

### How eduroam Works

```
Student from University A                 University B Campus
visits University B                       (Visited Institution)
         |                                        |
         |  Connects to "eduroam" SSID            |
         |--------------------------------------->|
         |                                        |
         |  802.1X/PEAP authentication            |
         |  Username: student@university-a.edu    |
         |--------------------------------------->|
         |                                        |
         |  University B RADIUS sees @domain      |
         |  → Proxies to eduroam hierarchy        |
         |                       |                |
         |              +-------v--------+        |
         |              | National RADIUS |        |
         |              | Proxy Server    |        |
         |              +-------+--------+        |
         |                      |                 |
         |            +---------v----------+      |
         |            | University A       |      |
         |            | RADIUS Server      |      |
         |            | (Home Institution) |      |
         |            +---------+----------+      |
         |                      |                 |
         |  Access-Accept/Reject proxied back     |
         |<---------------------------------------|
```

**Key Concepts**:
- Authentication is **always** performed by the user's **home institution**
- The visited institution **never sees** the user's password
- Uses the **realm** (domain after @) to route authentication requests
- Standard EAP methods: PEAP or EAP-TLS
- Available at thousands of institutions in 100+ countries

---

## Authentication Method Selection Guide

### Comparison Table: All Methods

| Method | Security | Scalability | Cost | Complexity | Best For |
|--------|----------|-------------|------|------------|----------|
| **Open** | None | Unlimited | Free | None | Public hotspots (with OWE) |
| **MAC Filtering** | Very Low | Poor | Free | Low | Supplementary control only |
| **WPA2-PSK** | Moderate | Poor (< 25) | Free | Low | Home, small office |
| **WPA3-SAE** | Good | Poor (< 25) | Free | Low | Home, small office |
| **Captive Portal** | Low-Moderate | Good | Moderate | Moderate | Guest networks |
| **PEAP** | Good | Excellent | Moderate | Moderate | Corporate Wi-Fi |
| **EAP-TLS** | Excellent | Excellent | High | High | High-security enterprise |
| **EAP-TTLS** | Good | Excellent | Moderate | Moderate | Mixed/legacy environments |
| **EAP-FAST** | Good | Excellent | Moderate | Low-Moderate | Cisco environments |

### Decision Flowchart

```
Start: How many users?
  |
  +--> < 10 users
  |      |
  |      +--> WPA3-SAE (or WPA2-PSK)
  |
  +--> 10-50 users
  |      |
  |      +--> Sensitive data? 
  |             |
  |             +--> Yes --> WPA2/3-Enterprise (PEAP)
  |             +--> No  --> WPA3-SAE acceptable
  |
  +--> 50+ users
  |      |
  |      +--> WPA2/3-Enterprise required
  |             |
  |             +--> PKI available?
  |                    |
  |                    +--> Yes --> EAP-TLS (most secure)
  |                    +--> No  --> PEAP (username/password)
  |
  +--> Guest access
         |
         +--> Captive portal on isolated VLAN
```

---

## Troubleshooting Wireless Authentication

### Common 802.1X Failure Scenarios

Enterprise wireless authentication failures can be difficult to diagnose because the problem may lie at any layer: supplicant configuration, AP settings, RADIUS server, certificate infrastructure, or the identity store. Below are the most common failure scenarios and their resolutions.

#### Certificate-Related Failures

| Symptom | Root Cause | Resolution |
|---------|-----------|-------------|
| "Server certificate not trusted" | Client missing CA certificate in trust store | Deploy Root/Intermediate CA cert via GPO, MDM, or manual import |
| "Certificate has expired" | Server or client certificate past validity date | Renew certificate; check `Not After` field with `openssl x509 -enddate -noout -in cert.pem` |
| "Certificate name mismatch" | Server cert CN/SAN doesn't match RADIUS server FQDN | Reissue certificate with correct Subject Alternative Name |
| "Certificate revoked" | Certificate appears on CRL or OCSP returns "revoked" | Issue new certificate; investigate why it was revoked |
| CRL/OCSP unreachable | Client can't check revocation (network not yet available) | Configure client to not require revocation check during 802.1X, or use OCSP stapling |

#### RADIUS Communication Failures

| Symptom | Root Cause | Resolution |
|---------|-----------|-------------|
| RADIUS timeout (no response) | Firewall blocking UDP 1812/1813 | Open UDP 1812/1813 between AP/WLC and RADIUS server |
| RADIUS timeout | Wrong RADIUS server IP on AP | Verify RADIUS server IP configuration on AP/WLC |
| Access-Reject for valid credentials | Shared secret mismatch between AP and RADIUS | Verify shared secret matches exactly (case-sensitive) on both sides |
| Access-Reject | NPS/FreeRADIUS policy not matching | Check conditions in network policy (NAS-Port-Type, Called-Station-Id, group membership) |
| Intermittent authentication failures | RADIUS server overloaded | Check server CPU/memory; consider load balancing across multiple RADIUS servers |

#### EAP Type Mismatch

```
Scenario: Client configured for EAP-TLS, but RADIUS only allows PEAP

Client Log:     "EAP authentication failed - no common EAP type"
RADIUS Log:     "eap_tls: Client offered EAP-TLS but it is not enabled"

Resolution:
  Option A: Enable EAP-TLS on RADIUS server and configure cert auth
  Option B: Reconfigure client supplicant to use PEAP
  Option C: NPS → Network Policy → Constraints → Authentication Methods
            → Add the required EAP type
```

#### Supplicant Misconfiguration

| Issue | Symptom | Fix |
|-------|---------|-----|
| Wrong EAP type selected | Auth fails immediately | Match client EAP type to RADIUS server policy |
| "Validate server certificate" unchecked | Vulnerable to evil twin / MITM | Always enable server cert validation; specify expected server name |
| Inner authentication wrong | PEAP tunnel builds but inner auth fails | Verify inner method (MSCHAPv2 vs. GTC) |
| Saved credentials stale | Auth fails after password change | Delete and recreate wireless profile or clear cached creds |
| Machine vs. user authentication | Device can't auth before login | Enable machine authentication in supplicant and create matching RADIUS policy |

### Diagnostic Commands

**Cisco WLC/Switch — 802.1X Debugging**:

```
! Show all active 802.1X sessions
show authentication sessions

! Detailed view of a specific interface
show authentication sessions interface GigabitEthernet1/0/5 details

! Show 802.1X statistics
show dot1x all summary

! Real-time 802.1X debugging
debug dot1x all
debug radius authentication
debug eap all

! Show RADIUS server status and statistics
show radius server-group all
show aaa servers

! Example output — successful authentication:
MAC: aa:bb:cc:dd:ee:ff
  Status:           Authorized
  Domain:           DATA
  Oper host mode:   multi-auth
  Session ID:       0A010132000000150025B3A7
  Auth Method:      dot1x
  Authorized By:    Authentication Server
  VLAN Policy:      110
  Session timeout:  28800s (server), Remaining: 25142s
```

**Windows Client — Supplicant Diagnostics**:

```powershell
# View wireless connection events in Event Viewer
Get-WinEvent -LogName "Microsoft-Windows-WLAN-AutoConfig/Operational" |
  Where-Object { $_.Id -in 8000,8001,8002,8003,11000,11001,11002,11004,11005 } |
  Select-Object -First 20 TimeCreated, Id, Message | Format-Table -Wrap

# Key Event IDs:
# 8000 = WLAN AutoConfig service started connection
# 8001 = Successfully connected to wireless network
# 8002 = WLAN AutoConfig failed to connect
# 8003 = WLAN AutoConfig disconnected
# 11001 = Wireless security started
# 11004 = Wireless security stopped (check for errors)
# 11005 = Wireless security succeeded

# Export wireless profile for inspection
netsh wlan show profiles name="Corp-WiFi" key=clear

# Test RADIUS connectivity from NPS server
Test-NetConnection -ComputerName radius.company.com -Port 1812 -InformationLevel Detailed
```

**Linux — FreeRADIUS and wpa_supplicant Diagnostics**:

```bash
# Run FreeRADIUS in full debug mode
sudo freeradius -X 2>&1 | tee /tmp/radius-debug.log

# Search for specific auth failures
grep -E "(Login OK|Login incorrect|Error|Reject)" /var/log/freeradius/radius.log

# Test EAP authentication from command line
eapol_test -c /etc/wpa_supplicant/peap-test.conf \
  -a 10.1.1.50 -p 1812 -s SharedSecret123

# wpa_supplicant debug logging
wpa_supplicant -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf \
  -d -f /tmp/wpa-debug.log

# Check wpa_supplicant status
wpa_cli status
wpa_cli list_networks
```

### Authentication Flow Packet Capture Analysis

Capturing and analyzing 802.1X authentication traffic with Wireshark is essential for diagnosing complex failures. Here is what to look for at each stage:

**Capture Setup**:

```
Wireshark Capture Filter (on RADIUS server or mirror port):
  port 1812 or port 1813 or ether proto 0x888e

  0x888e = EAPoL (802.1X) Ethertype

Display Filters:
  eapol                         — All 802.1X frames
  radius                        — All RADIUS packets
  radius.code == 2              — Access-Accept only
  radius.code == 3              — Access-Reject only
  eap.type == 25                — PEAP packets
  eap.type == 13                — EAP-TLS packets
  tls.handshake.type == 11      — Certificate messages
  radius && radius.code == 11   — Access-Challenge (EAP exchange)
```

**Successful PEAP Authentication — Expected Packet Sequence**:

```
Packet  Direction              Protocol   Description
──────  ─────────────────────  ─────────  ──────────────────────────────────
  1     Client → AP            EAPoL      EAPOL-Start
  2     AP → Client            EAP        Request Identity
  3     Client → AP            EAP        Response Identity (username)
  4     AP → RADIUS            RADIUS     Access-Request (EAP-Response/Identity)
  5     RADIUS → AP            RADIUS     Access-Challenge (EAP-Request/PEAP Start)
  6     AP → Client            EAP        Request PEAP (ServerHello, Certificate)
  7     Client → AP            EAP        Response PEAP (ClientKeyExchange)
  8-15  AP ↔ RADIUS            RADIUS     Multiple Access-Challenge/Request rounds
                                          (TLS tunnel + inner MSCHAPv2)
  16    RADIUS → AP            RADIUS     Access-Accept (VLAN attributes)
  17    AP → Client            EAP        EAP-Success
  18-21 Client ↔ AP            EAPoL      4-Way Handshake (key exchange)
  22+   Client ↔ AP            802.11     Encrypted data frames
```

**Common Failure Patterns in Packet Captures**:

| Pattern | Packets Observed | Diagnosis |
|---------|-----------------|------------|
| EAPoL-Start sent, no response | Only packet 1 visible | AP not configured for 802.1X, or wired port not enabled |
| Identity exchange then silence | Packets 1-4, then nothing | RADIUS server unreachable (check firewall, routing) |
| Multiple Access-Challenge then Access-Reject | Packets 1-15, then Reject | Credential failure (wrong password) or policy mismatch |
| TLS alert in EAP | TLS Fatal Alert: unknown_ca | Client doesn't trust the RADIUS server's CA certificate |
| TLS alert: certificate_expired | TLS handshake fails | Server or client certificate has expired |
| Repeated Access-Challenge loops | Dozens of RADIUS exchanges | EAP fragmentation issue or MTU problem; try reducing EAP fragment size |
| EAP-Success but no 4-Way Handshake | Packets 1-17, then disconnect | WPA/RSNA key negotiation failure; check AP security settings |

**Pro Tip**: When troubleshooting 802.1X, always capture on **both sides** — EAPoL between client and AP (requires monitor mode or port mirror), and RADIUS between AP and server (standard port mirror or span). This pinpoints whether the failure is on the wireless segment or the RADIUS segment.

---

## Summary

1. **Authentication vs. Encryption**: Authentication verifies identity; encryption protects data. Both are essential for wireless security.

2. **Open Authentication**: No credentials required. Insecure unless paired with OWE (Wi-Fi Enhanced Open) for encryption without authentication.

3. **WPA2-PSK**: Shared passphrase hashed via PBKDF2 to derive the PMK; vulnerable to offline brute-force attacks on the captured 4-way handshake.

4. **WPA3-SAE**: Replaces PSK with the Dragonfly key exchange, providing resistance to offline dictionary attacks and forward secrecy.

5. **802.1X/Enterprise**: Three-party architecture (supplicant, authenticator, RADIUS server) providing individual user authentication, dynamic VLAN assignment, and per-user policies.

6. **PEAP**: Most widely deployed EAP method — creates a TLS tunnel using a server certificate, then authenticates with username/password (MSCHAPv2) inside the tunnel.

7. **EAP-TLS**: Most secure EAP method — mutual certificate authentication with no passwords. Requires full PKI infrastructure.

8. **EAP-TTLS**: Similar to PEAP but supports more inner authentication methods (PAP, CHAP). Useful for legacy environments.

9. **EAP-FAST**: Cisco-developed alternative using PACs instead of certificates. Quick to deploy but less widely supported.

10. **LEAP**: Deprecated. Known cryptographic vulnerabilities. Must be replaced immediately wherever found.

11. **RADIUS for Wireless**: RADIUS (UDP 1812/1813) is the backend for enterprise wireless authentication. Wireless-specific attributes like Called-Station-Id and Tunnel-Private-Group-Id enable per-SSID and per-user VLAN assignment. For general RADIUS protocol details and RADIUS vs. TACACS+ comparison, see Lesson 33.

12. **MAC Authentication Bypass (MAB)**: For devices that cannot perform 802.1X (printers, IoT, cameras), MAB uses the MAC address as a credential against RADIUS. Always pair with device profiling and restricted VLANs.

13. **MAC Filtering**: Not a real security mechanism — MAC addresses are easily spoofed and visible in cleartext. Use only as a supplementary layer.

14. **Captive Portals**: Web-based authentication for guest networks. Must be paired with VLAN isolation, HTTPS enforcement, session timeouts, bandwidth throttling, and client isolation.

15. **Guest Access Architecture**: Enterprise guest access requires proper segmentation (anchor controllers or DMZ placement), temporal access policies, and accountability (sponsor-based or self-registration workflows).

16. **Certificate-Based Auth (PKI)**: Strongest form of wireless authentication. Requires Root CA, Intermediate CA, server certificates, and client certificates with proper lifecycle management.

17. **Federated Authentication (eduroam)**: RADIUS proxy hierarchy that routes 802.1X authentication to the user's home institution based on the realm (@domain) in their username.

18. **Troubleshooting 802.1X**: Common failures include expired certificates, RADIUS timeouts, shared secret mismatches, EAP type mismatches, and supplicant misconfiguration. Use debug dot1x, Wireshark captures, and RADIUS debug logs to isolate issues.

19. **Selection Principle**: Match authentication method to environment — PSK for home/small office, PEAP for most enterprises, EAP-TLS for high security, captive portal for guests.

## Practice Questions

**Q1.** In an 802.1X wireless authentication architecture, what are the three roles involved?

A) Client, server, firewall
B) Supplicant, authenticator (AP), authentication server (RADIUS)
C) User, administrator, auditor
D) AP, WLC, DNS server

<details>
<summary>Answer</summary>

**B)** The three-party 802.1X architecture consists of: the supplicant (client software requesting access), the authenticator (the AP that controls port access), and the authentication server (typically a RADIUS server that validates credentials and returns access policies).
</details>

**Q2.** Which EAP method is considered the most secure and requires certificates on both the server and every client device?

A) PEAP
B) EAP-FAST
C) EAP-TLS
D) LEAP

<details>
<summary>Answer</summary>

**C)** EAP-TLS (Transport Layer Security) provides mutual certificate authentication — both the RADIUS server and each client present certificates. No passwords are transmitted, eliminating password-based attack vectors. It requires a full PKI infrastructure with certificate lifecycle management.
</details>

**Q3.** What is the primary advantage of PEAP over EAP-TLS for enterprise wireless authentication?

A) PEAP provides stronger encryption than EAP-TLS
B) PEAP only requires a server certificate, not client certificates, making deployment simpler
C) PEAP supports more wireless devices
D) PEAP uses TCP instead of UDP for better reliability

<details>
<summary>Answer</summary>

**B)** PEAP creates a TLS tunnel using only a server certificate, then authenticates users with username/password (MSCHAPv2) inside the tunnel. This eliminates the need to deploy and manage client certificates on every device, significantly reducing administrative overhead compared to EAP-TLS.
</details>

**Q4.** Why is LEAP (Lightweight Extensible Authentication Protocol) considered deprecated and insecure?

A) It uses a weak encryption algorithm that has been fully broken
B) It has known cryptographic vulnerabilities that allow offline dictionary attacks on the MS-CHAPv1 challenge/response
C) It only supports 64-bit encryption
D) It requires an internet connection to function

<details>
<summary>Answer</summary>

**B)** LEAP uses a modified MS-CHAPv1 challenge/response that is vulnerable to offline dictionary attacks. Tools like asleap can crack LEAP credentials from captured authentication exchanges. LEAP must be replaced with PEAP or EAP-TLS wherever it is found.
</details>

**Q5.** What ports does RADIUS use, and what is a key security limitation of the protocol?

A) TCP 389/636; it cannot handle concurrent users
B) UDP 1812 (authentication) and 1813 (accounting); it only encrypts the password field, not the entire packet
C) TCP 49; it uses plaintext communication
D) UDP 53; it conflicts with DNS traffic

<details>
<summary>Answer</summary>

**B)** RADIUS uses UDP 1812 for authentication and UDP 1813 for accounting. A key limitation is that only the password (User-Password attribute) is encrypted in the RADIUS packet — other attributes like username and VLAN assignments are sent in cleartext. TACACS+ encrypts the entire packet body.
</details>

**Q6.** How does TACACS+ differ from RADIUS in terms of protocol characteristics?

A) TACACS+ uses UDP; RADIUS uses TCP
B) TACACS+ encrypts only the password; RADIUS encrypts the entire packet
C) TACACS+ uses TCP port 49 and encrypts the entire packet body; RADIUS uses UDP 1812/1813 and encrypts only the password
D) There is no significant difference between them

<details>
<summary>Answer</summary>

**C)** TACACS+ (Cisco-developed) uses TCP port 49 and encrypts the entire packet body, providing better security. RADIUS uses UDP 1812/1813 and encrypts only the password field. TACACS+ is primarily used for device administration (router/switch CLI), while RADIUS is used for network access (wireless, VPN).
</details>

**Q7.** Why is MAC address filtering NOT considered a strong security mechanism for wireless networks?

A) MAC addresses change every time a device reboots
B) MAC addresses are transmitted in cleartext in 802.11 frames and can be easily spoofed
C) MAC filtering only works with WEP encryption
D) MAC addresses are too long to manage effectively

<details>
<summary>Answer</summary>

**B)** MAC addresses are sent unencrypted in 802.11 frame headers, making them visible to anyone monitoring wireless traffic. An attacker can easily observe an authorized MAC address and spoof it on their own device. MAC filtering provides no real security and should only be used as a supplementary layer.
</details>

**Q8.** What is the purpose of a captive portal in wireless networking?

A) To encrypt all wireless traffic with WPA3
B) To provide a web-based authentication gateway for guest network access
C) To prevent rogue AP attacks
D) To manage DHCP address allocation

<details>
<summary>Answer</summary>

**B)** A captive portal redirects clients to a web page for authentication before granting network access. It is commonly used for guest networks and requires entering credentials, accepting terms, or providing payment. Captive portals should be paired with VLAN isolation, HTTPS, session timeouts, and client isolation.
</details>

**Q9.** In the eduroam federated authentication system, how is a user authenticated when visiting another institution?

A) The user creates a new account at the visited institution
B) The visited institution's RADIUS server proxies the authentication request to the user's home institution based on the realm (@domain)
C) The user authenticates via a shared global password
D) Authentication is handled entirely by the user's device without server involvement

<details>
<summary>Answer</summary>

**B)** Eduroam uses a RADIUS proxy hierarchy. The visited institution's RADIUS server identifies the user's home institution from the realm portion of the username (e.g., user@university.edu), then proxies the 802.1X authentication request through the hierarchy to the home institution's RADIUS server for validation.
</details>

**Q10.** An organization with 200 employees handles sensitive financial data. Which wireless authentication method is most appropriate?

A) WPA2-PSK with a strong passphrase
B) Open network with captive portal
C) WPA2/WPA3-Enterprise with EAP-TLS (certificate-based)
D) MAC address filtering with WEP

<details>
<summary>Answer</summary>

**C)** For an organization handling sensitive data with 200+ users, WPA2/WPA3-Enterprise with EAP-TLS provides the strongest security: individual user authentication, per-session unique encryption keys, mutual certificate validation, and individual accountability. The PKI overhead is justified by the security requirements.
</details>

## References

- CompTIA Network+ N10-009 Exam Objectives: Domain 4.1 – Explain common security concepts; Domain 4.3 – Given a scenario, apply network hardening techniques
- IEEE 802.1X-2020: Port-Based Network Access Control
- RFC 3748: Extensible Authentication Protocol (EAP)
- RFC 2865: Remote Authentication Dial In User Service (RADIUS)
- RFC 5281: Extensible Authentication Protocol Tunneled Transport Layer Security Authenticated Protocol Version 0 (EAP-TTLSv0)
- RFC 7170: Tunnel Extensible Authentication Protocol (TEAP)
- Lammle, T. (2021). *CompTIA Network+ Study Guide (Exam N10-009)*. Sybex – Network Authentication and AAA
- NIST SP 800-120: Recommendation for EAP Methods Used in Wireless Network Access Authentication
