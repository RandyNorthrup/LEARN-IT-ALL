---
id: lesson-033-authentication-authorization
title: Authentication and Authorization
chapterId: ch5-network-security
order: 33
duration: 95
objectives:
  - Understand authentication methods and factors
  - Implement multi-factor authentication (MFA)
  - Configure authorization and access control
  - Use RADIUS, TACACS+, and Kerberos
  - Implement least privilege principles
---

# Lesson 33: Authentication and Authorization

## Introduction

Authentication and authorization are fundamental security concepts that control who can access network resources and what they can do once authenticated. Authentication proves identity ("Who are you?"), while authorization determines permissions ("What can you do?").

These mechanisms protect networks from unauthorized access, enforce security policies, and provide accountability through logging. In this lesson, we'll explore authentication protocols, directory services, access control models, and implementation strategies for enterprise networks.

> *This lesson covers general authentication, authorization, and accounting (AAA) principles across all network contexts. For wireless-specific authentication methods including PSK, SAE, captive portals, and EAP deployment, see [Lesson 58: Wireless Authentication Methods](lesson-058-wireless-authentication).*

**Key Principle:** Never trust, always verify. Authenticate every access request and enforce least privilege authorization.

## Learning Objectives

After completing this lesson, you will be able to:

- Understand authentication methods and factors
- Implement multi-factor authentication (MFA)
- Configure authorization and access control
- Use RADIUS, TACACS+, and Kerberos
- Implement least privilege principles

---

## Authentication vs Authorization vs Accounting

### The AAA Framework

**Authentication:**
```
Definition: Verifying the identity of a user, device, or system
Question: "Who are you?"

Methods:
- Something you know (password, PIN)
- Something you have (smart card, token)
- Something you are (biometric)
- Somewhere you are (location, IP address)
- Something you do (typing pattern, gait)

Example: User enters username "jsmith" and password
System verifies credentials against database
Result: Authenticated as John Smith
```

**Authorization:**
```
Definition: Determining what an authenticated entity is allowed to do
Question: "What can you do?"

Models:
- Role-Based Access Control (RBAC)
- Attribute-Based Access Control (ABAC)
- Mandatory Access Control (MAC)
- Discretionary Access Control (DAC)

Example: John Smith authenticated
Authorized roles: Network Engineer, VLAN 50 access
Permissions: Read/write configs on access switches, read-only on core
Denied: Router configuration changes
```

**Accounting (Auditing):**
```
Definition: Tracking what authenticated users do
Question: "What did you do?"

Logged Information:
- Login/logout times
- Commands executed
- Configuration changes
- Files accessed
- Resources consumed (bandwidth, time)
- Failed access attempts

Purpose:
- Forensics and incident response
- Compliance reporting
- Billing (ISP usage)
- Capacity planning
```

## Authentication Methods

### Single-Factor Authentication

**Password-Based Authentication:**

**Password Security:**
```
Strong Password Requirements:
- Minimum length: 12+ characters (16+ for admin accounts)
- Complexity: Uppercase, lowercase, numbers, symbols
- No dictionary words or common patterns
- No personal information (names, birthdays)
- Unique per account (no reuse)

Password Storage (Server-Side):
- NEVER store plaintext passwords
- Use strong hashing: bcrypt, scrypt, Argon2
- Salt hashes (unique salt per password)
- Multiple iterations (bcrypt: cost factor 12+)

Example bcrypt hash:
$2b$12$KIXxBk67WJVvAJKzF8RGweJ5YQzWZLZ6tPzIvFq7M2VqMDhQJNzXq
^   ^  ^                                                    ^
|   |  |                                                    |
|   |  Salt (22 characters)                                Hash (31 characters)
|   Cost factor (2^12 = 4096 iterations)
Algorithm (bcrypt)
```

**Password Attacks:**
```
1. Brute Force:
   - Try all possible combinations
   - Prevention: Account lockout, rate limiting, strong passwords

2. Dictionary Attack:
   - Try common words/passwords
   - Prevention: Complexity requirements, check against breached password lists

3. Credential Stuffing:
   - Use leaked passwords from other breaches
   - Prevention: Multi-factor auth, monitor for breached credentials

4. Password Spraying:
   - Try common password against many accounts
   - Prevention: Account lockout, anomaly detection

5. Rainbow Tables:
   - Pre-computed hash tables
   - Prevention: Salted hashes
```

**Cisco Router Password Configuration:**
```cisco
! Enable secret (hashed with MD5 - legacy)
enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0

! Better: Type 9 (scrypt) - modern
enable algorithm-type scrypt secret MyStr0ngP@ssw0rd

! Console password
line console 0
 password MyConsoleP@ss
 login

! VTY (SSH) password
line vty 0 4
 password MyVTYP@ss
 login

! Local user accounts (best practice)
username admin privilege 15 algorithm-type scrypt secret AdminP@ssw0rd
username neteng privilege 10 algorithm-type scrypt secret NetEngP@ssw0rd

line vty 0 4
 login local
 transport input ssh
```

**Password Policies:**
```
Best Practices:
- Minimum age: 1 day (prevent rapid changes to cycle back)
- Maximum age: 90 days (60 for high-security)
- History: Remember last 24 passwords
- Lockout: 5 failed attempts, 30-minute lockout
- Complexity: Enforced by policy

NIST Recommendations (2023):
- Minimum 8 characters (12+ recommended)
- No mandatory complexity requirements (increases usability)
- No mandatory password rotation (only on breach indication)
- Check against breached password lists
- Rate limiting on attempts
- Support for password managers
- Allow paste functionality (encourages strong passwords)
```

### Multi-Factor Authentication (MFA)

**Authentication Factors:**

**Something You Know:**
```
Examples: Password, PIN, security question
Strengths: Easy to implement, no hardware required
Weaknesses: Can be guessed, phished, or shared
```

**Something You Have:**
```
Examples: 
- Smart card / CAC (Common Access Card)
- Hardware token (RSA SecurID)
- Smartphone (authenticator app)
- Security key (YubiKey, Titan)

Strengths: Physical possession required
Weaknesses: Can be lost, stolen, or duplicated
```

**Something You Are:**
```
Examples: Fingerprint, facial recognition, iris scan, voice
Strengths: Cannot be lost or forgotten
Weaknesses: Cannot be changed if compromised, privacy concerns
```

**MFA Implementations:**

**Time-Based One-Time Password (TOTP):**
```
How It Works:
1. Shared secret established during enrollment
2. Secret + current time = 6-digit code
3. Code changes every 30 seconds
4. Server verifies code using same algorithm

Standard: RFC 6238 (TOTP)
Apps: Google Authenticator, Microsoft Authenticator, Authy

Example TOTP Code Generation:
Time: 2025-11-21 14:30:00 UTC
Shared Secret: JBSWY3DPEHPK3PXP
Hash: HMAC-SHA1(Secret, Time/30)
Code: 123456 (valid for 30 seconds)

Cisco Configuration (TOTP):
aaa new-model
aaa authentication login default group tacacs+ local
tacacs-server host 10.1.1.100 key TacacsKey123
username admin privilege 15 secret AdminPassword

# On TACACS+ server: Configure TOTP/MFA
```

**Push Notification:**
```
How It Works:
1. User enters username/password
2. System sends push notification to registered device
3. User approves or denies login on device
4. System grants or denies access

Advantages:
- Easy for users (one tap)
- Resistant to phishing
- No code to type

Disadvantages:
- Requires Internet connectivity
- User might approve without verification (MFA fatigue)

Solutions: Duo, Microsoft Authenticator, Okta Verify
```

**Hardware Security Keys:**
```
Standards: FIDO2, WebAuthn, U2F

How It Works:
1. User inserts/touches security key
2. Key performs cryptographic challenge-response
3. Private key never leaves device
4. Resistant to phishing (domain-bound)

Advantages:
- Strongest phishing resistance
- No shared secrets
- Works offline

Disadvantages:
- Cost ($20-$70 per key)
- Can be lost (need backup)
- Not universally supported

Examples: YubiKey, Google Titan, Feitian
```

**SMS/Phone Call (Less Secure):**
```
How It Works:
1. User enters password
2. System sends code via SMS or voice call
3. User enters code

Security Issues:
- SIM swapping attacks
- SS7 vulnerabilities
- Phishing via fake sites
- No encryption

NIST Guidance: Deprecated, discouraged
Use Only: When no other option available
```

## Authentication Protocols

### RADIUS (Remote Authentication Dial-In User Service)

**Overview:**
```
Purpose: Centralized AAA for network access
Protocol: UDP (Auth: 1812, Accounting: 1813)
Standard: RFC 2865
Encryption: Only password encrypted (shared secret)

Use Cases:
- Wireless authentication (802.1X)
- VPN authentication
- Network device management
- Switch port authentication
```

**RADIUS Authentication Flow:**
```
1. Client requests access (username/password)
2. Network Access Server (NAS) sends Access-Request to RADIUS
3. RADIUS server validates credentials
4. RADIUS sends Access-Accept, Access-Reject, or Access-Challenge
5. If accepted, RADIUS includes authorization attributes (VLAN, ACL, etc.)
6. NAS grants access with specified attributes

Message Types:
- Access-Request: Client credentials
- Access-Accept: Success + authorization attributes
- Access-Reject: Failure
- Access-Challenge: Additional info required (MFA)
- Accounting-Request: Session start/stop/update
- Accounting-Response: Acknowledgment
```

**RADIUS Configuration (Cisco):**
```cisco
! Enable AAA
aaa new-model

! Define RADIUS servers
radius server RADIUS-PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 timeout 5
 retransmit 3
 key R@d1usK3y!2024

radius server RADIUS-SECONDARY
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 timeout 5
 retransmit 3
 key R@d1usK3y!2024

! Create server groups
aaa group server radius RADIUS-GROUP
 server name RADIUS-PRIMARY
 server name RADIUS-SECONDARY

! Authentication method lists
aaa authentication login default group RADIUS-GROUP local
aaa authentication enable default group RADIUS-GROUP enable
aaa authentication dot1x default group RADIUS-GROUP

! Authorization method lists
aaa authorization exec default group RADIUS-GROUP local
aaa authorization network default group RADIUS-GROUP

! Accounting method lists
aaa accounting exec default start-stop group RADIUS-GROUP
aaa accounting network default start-stop group RADIUS-GROUP
aaa accounting system default start-stop group RADIUS-GROUP

! Enable RADIUS on VTY lines
line vty 0 4
 authorization exec default
 accounting exec default
```

**RADIUS Attributes:**
```
Common Attributes:
- User-Name (1): Username
- User-Password (2): Encrypted password
- NAS-IP-Address (4): IP of network device
- Service-Type (6): Type of service (Login, Framed)
- Framed-IP-Address (8): IP to assign to user
- Filter-Id (11): ACL to apply
- Reply-Message (18): Message to display
- Class (25): Custom attribute
- Session-Timeout (27): Max session duration
- Tunnel-Type (64): VLAN tunneling
- Tunnel-Medium-Type (65): Medium (802)
- Tunnel-Private-Group-ID (81): VLAN ID

Vendor-Specific Attributes (VSA):
- Cisco-AVPair: Custom authorization attributes
  Example: "shell:priv-lvl=15" (full privilege)
```

**Dynamic VLAN Assignment:**
```cisco
! Switch configuration for dynamic VLAN
aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius

radius server RADIUS-SERVER
 address ipv4 10.1.1.100
 key RadiusSecret123

dot1x system-auth-control

interface GigabitEthernet0/1
 description User Port - Dynamic VLAN
 switchport mode access
 authentication port-control auto
 dot1x pae authenticator
 spanning-tree portfast

! On RADIUS server, configure user:
User: jsmith
Attributes:
  Tunnel-Type = VLAN
  Tunnel-Medium-Type = IEEE-802
  Tunnel-Private-Group-ID = 50  (VLAN 50)

Result: When jsmith authenticates, placed in VLAN 50
```

### TACACS+ (Terminal Access Controller Access-Control System Plus)

**Overview:**
```
Purpose: Device administration AAA (Cisco proprietary)
Protocol: TCP port 49
Encryption: Full packet encryption
Standard: Cisco proprietary (draft-ietf-opsawg-tacacs)

Advantages over RADIUS:
- Full packet encryption (vs password only)
- Separates AAA functions
- Command authorization per command
- TCP reliability

Use Cases:
- Router/switch administration
- Firewall management
- Granular command authorization
```

**TACACS+ vs RADIUS:**
```
Feature             TACACS+              RADIUS
Protocol            TCP 49               UDP 1812/1813
Encryption          Full packet          Password only
AAA Separation      Yes                  Combined
Packet Format       Fixed                Variable
Authorization       Per-command          Per-session
Best for            Device admin         Network access
Vendor              Cisco (proprietary)  Open standard
Command accounting  Detailed             Limited
```

**TACACS+ Configuration (Cisco):**
```cisco
! Enable AAA
aaa new-model

! Define TACACS+ servers
tacacs server TACACS-PRIMARY
 address ipv4 10.1.1.110
 timeout 5
 key T@c@csK3y!2024

tacacs server TACACS-SECONDARY
 address ipv4 10.1.1.111
 timeout 5
 key T@c@csK3y!2024

! Create server group
aaa group server tacacs+ TACACS-GROUP
 server name TACACS-PRIMARY
 server name TACACS-SECONDARY

! Authentication
aaa authentication login default group TACACS-GROUP local
aaa authentication enable default group TACACS-GROUP enable

! Authorization (per-command)
aaa authorization exec default group TACACS-GROUP local
aaa authorization commands 1 default group TACACS-GROUP local
aaa authorization commands 15 default group TACACS-GROUP local

! Accounting
aaa accounting exec default start-stop group TACACS-GROUP
aaa accounting commands 1 default start-stop group TACACS-GROUP
aaa accounting commands 15 default start-stop group TACACS-GROUP

! Apply to VTY lines
line vty 0 4
 authorization commands 1 default
 authorization commands 15 default
 authorization exec default
 accounting commands 1 default
 accounting commands 15 default
 accounting exec default
 login authentication default
```

**Command Authorization Example:**
```
Scenario: Network engineer needs to view configs but not change them

TACACS+ Server Configuration:
User: neteng
Group: ReadOnly

Authorized Commands (privilege 15):
- show running-config
- show startup-config
- show interface
- show ip route
- show version
- ping
- traceroute

Denied Commands:
- configure terminal
- write memory
- reload
- interface *
- ip route *

Result:
neteng-router# configure terminal
% Authorization failed.

neteng-router# show running-config
Building configuration...
[configuration displayed successfully]
```

**Privilege Levels:**
```
Cisco IOS Privilege Levels (0-15):
- Level 0: No access
- Level 1: User EXEC (show commands)
- Level 15: Privileged EXEC (all commands)
- Levels 2-14: Custom levels

Custom Privilege Level Example:
! Define level 5 for limited config access
privilege configure level 5 interface
privilege configure level 5 ip address
privilege interface level 5 description
privilege interface level 5 switchport

! Assign to user
username nettech privilege 5 secret TechPassword

! User nettech can:
- Enter configure terminal
- Configure interface descriptions
- Configure IP addresses
- Cannot: Change routing, VLANs, ACLs
```

### TACACS+ Packet Structure

Every TACACS+ message begins with a 12-byte fixed header followed by a variable-length body. Understanding the header format is important for troubleshooting and packet analysis.

```
TACACS+ Header Format (12 bytes):

 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 | Major Version | Minor Version |     Type      |   Seq No      |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |     Flags     |                  Session ID                   |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |                            Length                             |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

Field Descriptions:
- Major Version (4 bits): Protocol version (0xC = decimal 12)
- Minor Version (4 bits): Sub-version (0x0 default, 0x1 single-connect)
- Type (1 byte):
    0x01 = Authentication
    0x02 = Authorization
    0x03 = Accounting
- Seq No (1 byte): Sequence number within session
    Odd numbers = client-originated messages
    Even numbers = server-originated messages
- Flags (1 byte):
    0x01 = TAC_PLUS_UNENCRYPTED_FLAG (body NOT encrypted)
    0x04 = TAC_PLUS_SINGLE_CONNECT_FLAG (multiplex sessions)
- Session ID (4 bytes): Random value identifying the session
- Length (4 bytes): Byte length of the body (excluding header)
```

**Full Packet Encryption — How It Works:**

TACACS+ encrypts the **entire body** of every packet using a pseudo-random pad derived from MD5. This is fundamentally different from RADIUS, which only encrypts the User-Password attribute.

```
TACACS+ Encryption:
  Pad_1 = MD5(Session_ID + Secret_Key + Version + Seq_No)
  Pad_n = MD5(Session_ID + Secret_Key + Version + Seq_No + Pad_(n-1))
  Encrypted_Body = Plaintext_Body XOR (Pad_1 + Pad_2 + ... + Pad_n)

  - Session_ID provides per-session uniqueness
  - Seq_No provides per-message uniqueness
  - Every field in the body is encrypted: usernames, commands,
    privilege levels, authorization attributes, accounting data

RADIUS Encryption (for comparison):
  Encrypted_Password = Password XOR MD5(Shared_Secret + Request_Authenticator)

  - ONLY the User-Password attribute is encrypted
  - Username, NAS-IP, Called-Station-Id, VLAN assignments,
    ACL names, and all other attributes travel in CLEARTEXT
  - An attacker sniffing RADIUS sees everything except the password
  - Best practice: Always wrap RADIUS in IPsec, DTLS, or RadSec (TLS)

Security Implication:
  TACACS+ provides confidentiality for every AAA transaction by default.
  RADIUS requires additional transport security to achieve the same.
```

### TACACS+ Authorization Granularity

One of TACACS+'s most powerful features is **per-command authorization** — the TACACS+ server evaluates and approves or denies each individual CLI command before the device executes it. This enables fine-grained role-based policies for network device administration.

**Role-Based Command Policies:**

```
Help Desk Policy (Tier 1 Support):
  ✓ permit: show *
  ✓ permit: ping *
  ✓ permit: traceroute *
  ✓ permit: clear counters *
  ✓ permit: terminal length *
  ✗ deny:   configure *
  ✗ deny:   reload
  ✗ deny:   write *
  ✗ deny:   debug *
  ✗ deny:   undebug *
  ✗ deny:   copy *

Network Engineer Policy (Tier 2):
  ✓ permit: show *
  ✓ permit: ping *
  ✓ permit: traceroute *
  ✓ permit: configure terminal
  ✓ permit: interface *
  ✓ permit: ip address *
  ✓ permit: ip route *
  ✓ permit: switchport *
  ✓ permit: vlan *
  ✓ permit: spanning-tree *
  ✓ permit: write memory
  ✗ deny:   reload
  ✗ deny:   debug *
  ✗ deny:   aaa *
  ✗ deny:   tacacs *
  ✗ deny:   radius *
  ✗ deny:   snmp-server *
  ✗ deny:   crypto *

Senior Engineer / TAC Policy (Tier 3):
  ✓ permit: .*   (all commands authorized)
  ADDITIONAL: Full session recording enabled
  ADDITIONAL: All commands logged with timestamp and source IP
```

**Cisco ISE TACACS+ Device Administration Profile:**

```
Profile Name: HelpDesk-ReadOnly
Shell Profile:
  Default Privilege: 1
  Maximum Privilege: 7
  Idle Timeout: 15 minutes
  Session Timeout: 60 minutes

Command Sets:
  Rule 1: Permit  - Command: show       - Arguments: (any)
  Rule 2: Permit  - Command: ping       - Arguments: (any)
  Rule 3: Permit  - Command: traceroute - Arguments: (any)
  Rule 4: Permit  - Command: terminal   - Arguments: length *
  Rule 5: Deny    - Command: (any)      - Arguments: (any)  [implicit deny]

Conditions:
  Identity Group = Help_Desk_Users
  AND Device Type = Cisco_IOS_Devices
  AND Location = All_Locations
  AND Time = Business_Hours (Mon-Fri 07:00-19:00)
```

### Cisco IOS/NX-OS Advanced AAA Configuration

Named method lists allow different authentication, authorization, and accounting policies for different access methods (console vs VTY vs VPN). This is a critical best practice — the console line should always have a local authentication fallback for out-of-band recovery.

**Cisco IOS Named Method Lists:**

```cisco
aaa new-model

! --- Named Authentication Method Lists ---

! Default: TACACS+ first, fallback to local
aaa authentication login default group TACACS-GROUP local

! Console: Local only (ensures access if TACACS+ is unreachable)
aaa authentication login CONSOLE-AUTH local

! VTY: TACACS+ with local fallback
aaa authentication login VTY-AUTH group TACACS-GROUP local

! Enable: TACACS+ with enable secret fallback
aaa authentication enable default group TACACS-GROUP enable

! --- Named Authorization Method Lists ---

! VTY sessions: authorize EXEC shell
aaa authorization exec VTY-AUTHOR group TACACS-GROUP local

! Per-command authorization (privilege level 15)
aaa authorization commands 15 CMD-AUTHOR-15 group TACACS-GROUP local

! Per-command authorization (privilege level 1)
aaa authorization commands 1 CMD-AUTHOR-1 group TACACS-GROUP local

! Network authorization (RADIUS for 802.1X/VPN — separate protocol)
aaa authorization network NET-AUTHOR group RADIUS-GROUP local

! --- Named Accounting Method Lists ---

! EXEC session accounting
aaa accounting exec VTY-ACCT start-stop group TACACS-GROUP

! Command accounting (all privilege levels)
aaa accounting commands 0 CMD-ACCT start-stop group TACACS-GROUP
aaa accounting commands 1 CMD-ACCT start-stop group TACACS-GROUP
aaa accounting commands 15 CMD-ACCT start-stop group TACACS-GROUP

! --- Apply Named Lists to Lines ---

line console 0
 login authentication CONSOLE-AUTH

line vty 0 4
 login authentication VTY-AUTH
 authorization exec VTY-AUTHOR
 authorization commands 1 CMD-AUTHOR-1
 authorization commands 15 CMD-AUTHOR-15
 accounting exec VTY-ACCT
 accounting commands 0 CMD-ACCT
 accounting commands 1 CMD-ACCT
 accounting commands 15 CMD-ACCT
 transport input ssh
```

**Cisco NX-OS TACACS+ Configuration:**

```cisco
! NX-OS uses a slightly different syntax
feature tacacs+

tacacs-server host 10.1.1.110 key T@c@csK3y!2024
tacacs-server host 10.1.1.111 key T@c@csK3y!2024

aaa group server tacacs+ TACACS-GROUP
  server 10.1.1.110
  server 10.1.1.111
  use-vrf management
  source-interface mgmt0

! Authentication / Authorization / Accounting
aaa authentication login default group TACACS-GROUP local
aaa authentication login console local
aaa authorization commands default group TACACS-GROUP local
aaa accounting default group TACACS-GROUP
```

### TACACS+ vs RADIUS Decision Matrix

Use this comprehensive matrix when selecting the appropriate AAA protocol for each use case in your network:

| Criteria | TACACS+ | RADIUS |
|----------|---------|--------|
| **Transport** | TCP port 49 | UDP 1812 (auth) / 1813 (acct) |
| **Encryption** | Full packet body encrypted (MD5 pad) | Only User-Password attribute encrypted |
| **AAA Separation** | Auth, Authz, Acct are independent message exchanges | Auth + Authz combined in Access-Accept |
| **Authorization Model** | Per-command authorization (each CLI command evaluated) | Per-session attributes (VLAN, ACL, QoS) |
| **Accounting Detail** | Per-command logging (every CLI command recorded) | Session-level logging (start / stop / interim-update) |
| **Multiprotocol** | Supports AppleTalk, IPX, NetBIOS (legacy) | IP-centric with broad vendor extension support |
| **Vendor Support** | Primarily Cisco; growing adoption (Aruba, Juniper, Palo Alto) | Universal — every network vendor supports RADIUS |
| **Standards Status** | Cisco proprietary; RFC 8907 published 2020 | IETF standard (RFC 2865/2866) since 2000 |
| **Device Types** | Routers, switches, firewalls, WLCs (management plane) | APs, VPN gateways, NADs, captive portals (data plane) |
| **Scalability** | TCP connection overhead; single-connect mode mitigates | Lightweight UDP — scales well for high-volume access auth |
| **Failover** | TCP detects failures quickly (RST/FIN) | Requires application-level timeout and retry |
| **Change of Authorization** | Not natively supported | CoA (RFC 5176) — dynamic session re-auth and disconnect |
| **Primary Use Case** | Network device administration (CLI/GUI management) | Network access control (Wi-Fi, VPN, 802.1X, NAC) |
| **Typical Server Software** | Cisco ISE, Cisco ACS (legacy) | FreeRADIUS, Microsoft NPS, Cisco ISE, Aruba ClearPass |

**Decision Guide:**

```
Use TACACS+ when:
  ✓ Managing Cisco routers, switches, and firewalls
  ✓ Per-command authorization and accounting is required
  ✓ Compliance mandates logging every CLI command (PCI-DSS, SOX)
  ✓ Administrative access must be tightly controlled by role
  ✓ Full packet encryption is required without additional transport security

Use RADIUS when:
  ✓ Authenticating wireless clients (802.1X Enterprise)
  ✓ Authenticating VPN users
  ✓ Dynamic VLAN assignment is needed
  ✓ Vendor-neutral AAA is required (multi-vendor network)
  ✓ High-volume authentication (hundreds/thousands of concurrent clients)
  ✓ Change of Authorization (CoA) is needed for posture assessment / NAC

Enterprise Best Practice — Use BOTH:
  ✓ TACACS+ for device administration (SSH/console to routers and switches)
  ✓ RADIUS for network access control (wireless, VPN, wired 802.1X)
  ✓ Cisco ISE supports both protocols on a single platform
  ✓ Separate policies, separate audit trails, defense in depth
```

### 802.1X Port-Based Authentication

**Overview:**
```
Purpose: Authenticate devices before allowing network access
Standard: IEEE 802.1X
Use Cases: Switch ports, wireless networks, VPN

Components:
- Supplicant: Client device requesting access
- Authenticator: Switch/AP enforcing authentication
- Authentication Server: RADIUS server validating credentials

Benefit: Prevents unauthorized devices from accessing network
```

**802.1X Authentication Flow:**
```
1. Device connects to switch port
2. Port in unauthorized state (only EAPoL traffic allowed)
3. Authenticator sends EAP-Request Identity
4. Supplicant responds with identity
5. Authenticator forwards to RADIUS (EAP over RADIUS)
6. RADIUS challenges supplicant (EAP-TLS, PEAP, etc.)
7. Credential exchange and validation
8. RADIUS sends Access-Accept or Access-Reject
9. If accepted, port transitions to authorized state
10. Normal traffic allowed

Port States:
- Unauthorized: Only 802.1X traffic
- Authorized: All traffic allowed
```

**Switch Port 802.1X Configuration:**
```cisco
! Global 802.1X configuration
aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius

radius server DOT1X-SERVER
 address ipv4 10.1.1.100
 key Dot1xSecret123

dot1x system-auth-control

! Interface configuration
interface GigabitEthernet0/5
 description User Access Port with 802.1X
 switchport mode access
 switchport access vlan 10
 authentication port-control auto
 authentication host-mode single-host
 authentication violation restrict
 dot1x pae authenticator
 spanning-tree portfast

! Monitor authentication
show authentication sessions
show dot1x all
```

**EAP Methods Summary:**

The Extensible Authentication Protocol (EAP) provides a framework for multiple authentication methods within 802.1X. The following table summarizes the most common EAP types:

| EAP Method | Auth Type | Client Cert Required | Server Cert Required | Security Level | Typical Use |
|------------|-----------|---------------------|---------------------|----------------|-------------|
| **EAP-TLS** | Certificate (mutual) | Yes | Yes | Highest | High-security; government, finance |
| **PEAP (MSCHAPv2)** | Password in TLS tunnel | No | Yes | High | Windows/AD environments |
| **EAP-TTLS** | Password in TLS tunnel | No | Yes | High | Mixed OS environments |
| **EAP-FAST** | PAC (Protected Access Credential) | No | Optional | Medium-High | Cisco environments without PKI |
| **EAP-MD5** | Password hash (challenge) | No | No | Low | Legacy only — do not deploy |

> *For detailed EAP method comparisons, certificate requirements, inner/outer authentication mechanics, and wireless-specific deployment guidance, see [Lesson 58: Wireless Authentication Methods](lesson-058-wireless-authentication).*

**802.1X with MAB (MAC Authentication Bypass):**
```cisco
! For devices that don't support 802.1X (printers, cameras)
interface GigabitEthernet0/10
 description Printer - MAB
 switchport mode access
 authentication port-control auto
 authentication order dot1x mab
 authentication priority dot1x mab
 dot1x pae authenticator
 mab

! RADIUS server authenticates based on MAC address
! Less secure but necessary for non-supplicant devices
```

## Authorization Models

### Role-Based Access Control (RBAC)

**Concept:**
```
Definition: Permissions assigned to roles, users assigned to roles
Benefit: Easier management than assigning permissions per user

Example:
Roles:
- Network Administrator: Full access
- Network Engineer: Config read/write on access switches
- Help Desk: Read-only access, password resets
- Guest: Internet access only

User Assignment:
- Alice -> Network Administrator
- Bob -> Network Engineer
- Charlie -> Help Desk

Permission Inheritance:
If Bob needs temporary admin access, add to Network Administrator role
```

**RBAC Implementation:**
```
Cisco Role-Based CLI Access:
router(config)# parser view HELPDESK
router(config-view)# secret HelpDeskPass
router(config-view)# commands exec include show
router(config-view)# commands exec include ping
router(config-view)# commands exec include traceroute
router(config-view)# commands configure include username
router(config-view)# exit

router(config)# username helpdesk view HELPDESK secret HelpDesk123

Result: helpdesk user can only execute specified commands
```

### Attribute-Based Access Control (ABAC)

**Concept:**
```
Definition: Access based on attributes (user, resource, environment)
Flexibility: More granular than RBAC

Attributes:
- User: Department, clearance level, location
- Resource: Classification, owner, creation date
- Environment: Time of day, device type, network location

Example Rule:
Allow access IF:
  user.department == "Finance" AND
  resource.classification == "Financial" AND
  time >= 08:00 AND time <= 18:00 AND
  location == "Corporate Network"
```

### Least Privilege Principle

**Best Practice:**
```
Definition: Users should have minimum permissions necessary

Implementation:
1. Identify job functions
2. Determine required permissions
3. Grant only those permissions
4. Review regularly

Example:
Backup Operator:
- Needs: Read access to all files
- Doesn't need: Write, delete, execute
- Grant: Backup Operators group (read-only)

Network Monitoring:
- Needs: SNMP read, show commands
- Doesn't need: Configuration changes
- Grant: SNMP RO community, privilege level 1
```

## Directory Services

### LDAP (Lightweight Directory Access Protocol)

**Overview:**
```
Purpose: Access and maintain distributed directory information
Protocol: TCP 389 (LDAP), TCP 636 (LDAPS - encrypted)
Standard: RFC 4511
Use: Centralized user/device information database

Common Implementations:
- Microsoft Active Directory (AD)
- OpenLDAP
- Apache Directory Server
```

**LDAP Structure:**
```
Distinguished Name (DN):
cn=John Smith,ou=Engineering,ou=Users,dc=company,dc=com

Components:
- cn: Common Name (John Smith)
- ou: Organizational Unit (Engineering, Users)
- dc: Domain Component (company, com)

Tree Structure:
dc=com
  dc=company
    ou=Users
      ou=Engineering
        cn=John Smith
      ou=Finance
        cn=Jane Doe
    ou=Groups
      cn=NetworkAdmins
```

**LDAP Authentication:**
```
Simple Bind:
- Username and password sent to server
- MUST use LDAPS (TCP 636) or StartTLS to encrypt the connection
- Anonymous bind (no credentials) for public directory lookups

SASL (Simple Authentication and Security Layer):
- GSSAPI: Kerberos authentication (preferred in AD environments)
- DIGEST-MD5: Challenge-response without sending password
- EXTERNAL: Client certificate authentication
```

**LDAP Query Syntax and Search Filters:**

LDAP uses a prefix-notation filter syntax defined in RFC 4515. Understanding search filters is essential for troubleshooting directory integration with network devices.

```
Filter Syntax:
  (attribute=value)           Equality match
  (attribute=val*)            Substring (starts with)
  (attribute>=value)          Greater than or equal
  (attribute<=value)          Less than or equal
  (attribute=*)               Presence (attribute exists)
  (&(filter1)(filter2))       AND (both must match)
  (|(filter1)(filter2))       OR (either matches)
  (!(filter))                 NOT (negation)

Common LDAP Attributes:
  cn          Common Name (full display name)
  sn          Surname (last name)
  givenName   First name
  uid         User ID (login name)
  mail        Email address
  memberOf    Group memberships (AD-specific)
  userAccountControl  Account flags (AD-specific)
  distinguishedName   Full DN path of the object
  objectClass         Type of object (user, group, computer)

DN (Distinguished Name) Structure:
  cn=John Smith,ou=Engineering,ou=Users,dc=company,dc=com
  ^\_________/ ^\_____________/ ^\_____/ ^\_____/ ^\_____/
  |            |                |       |        |
  Common Name  Org Unit         OU     Domain   Domain
  (leaf)       (parent)         (root)  Component Component

Example Queries:

  # Find a specific user by login name
  ldapsearch -x -H ldaps://dc1.company.com:636 \
    -D "cn=svc-radius,ou=Service Accounts,dc=company,dc=com" \
    -W -b "ou=Users,dc=company,dc=com" \
    "(sAMAccountName=jsmith)"

  # Find all members of the NetworkAdmins group
  ldapsearch -x -H ldaps://dc1.company.com:636 \
    -D "cn=admin,dc=company,dc=com" -W \
    -b "ou=Users,dc=company,dc=com" \
    "(memberOf=cn=NetworkAdmins,ou=Groups,dc=company,dc=com)" \
    cn mail telephoneNumber

  # Find all disabled accounts (AD userAccountControl bit 2)
  ldapsearch -x -H ldaps://dc1.company.com:636 \
    -D "cn=admin,dc=company,dc=com" -W \
    -b "ou=Users,dc=company,dc=com" \
    "(userAccountControl:1.2.840.113556.1.4.803:=2)" \
    cn sAMAccountName

  # Find users in Engineering OR Finance
  "(|(ou=Engineering)(ou=Finance))"

Result Example:
  dn: cn=John Smith,ou=Engineering,ou=Users,dc=company,dc=com
  cn: John Smith
  sn: Smith
  givenName: John
  uid: jsmith
  mail: jsmith@company.com
  memberOf: cn=NetworkAdmins,ou=Groups,dc=company,dc=com
  memberOf: cn=VPN-Users,ou=Groups,dc=company,dc=com
  telephoneNumber: +1-555-0100
```

### Active Directory (AD)

**Components:**
```
Domain: Security boundary (company.com)
Domain Controller (DC): Server running AD DS (Directory Services)
Global Catalog: Index of all objects across the entire forest
Forest: Collection of one or more domain trees sharing a schema
Organizational Unit (OU): Container for organizing objects and applying GPOs
Site: Physical network location (for replication and service location)

Objects:
- Users (accounts, service accounts)
- Computers (workstations, servers, network devices)
- Groups (security groups, distribution lists)
- Printers
- Shared folders
- Group Policy Objects (GPOs)
```

**Group Policy:**
```
Purpose: Centralized configuration management applied to OUs

Common Policies:
- Password requirements
- Account lockout
- User rights assignment
- Software installation
- Desktop settings
- Certificate auto-enrollment
- Firewall rules

Example GPO:
Name: Workstation Security Policy
Settings:
- Minimum password length: 14 characters
- Account lockout: 5 attempts, 30 minute lockout
- Screen lock: 10 minutes of inactivity
- Windows Firewall: Enabled
- Antivirus: Required, auto-update
```

### Active Directory Integration for Network Devices

Network devices (routers, switches, firewalls, wireless controllers) typically cannot join an AD domain or perform Kerberos authentication directly. Instead, they authenticate administrators and network users against AD **indirectly** through RADIUS or TACACS+ servers that have AD connectivity.

**Architecture: AD → NPS/ISE → Network Devices**

```
Admin SSH to Switch
       |
       v
+------------------+       RADIUS/TACACS+       +------------------+
|  Network Device  | --------------------------> |   AAA Server     |
|  (Cisco Switch)  |                             |  (ISE / NPS)     |
+------------------+                             +--------+---------+
                                                          |
                                                     LDAP/Kerberos
                                                          |
                                                 +--------v---------+
                                                 | Active Directory  |
                                                 |  Domain Controller|
                                                 +------------------+

Flow:
1. Admin connects to switch via SSH
2. Switch sends RADIUS or TACACS+ Access-Request to AAA server
3. AAA server queries AD (LDAP bind or Kerberos) to validate credentials
4. AAA server checks AD group membership for authorization:
   - Member of "Network-Admins" → privilege 15, full access
   - Member of "Network-Engineers" → privilege 7, limited config
   - Member of "Help-Desk" → privilege 1, show commands only
5. AAA server returns Access-Accept with appropriate attributes
6. Switch grants access at the authorized privilege level
```

**Microsoft NPS (Network Policy Server) as RADIUS for AD:**

```
NPS Configuration Steps:
1. Join NPS server to Active Directory domain
2. Register NPS in AD (grants permission to read user accounts)
3. Add RADIUS clients (each network device with shared secret)
4. Create Connection Request Policies:
   - Match conditions: NAS-Port-Type, Called-Station-ID
   - Processing: Local or forward to another RADIUS server
5. Create Network Policies:
   - Conditions: Windows Group = "Domain\Network-Admins"
   - Constraints: Authentication methods (MSCHAPv2, EAP)
   - Settings: Vendor-Specific Attributes
     Cisco-AVPair = "shell:priv-lvl=15"

Example NPS Policy for Device Admin:
  Policy Name: Switch-Admin-Access
  Conditions:
    - Windows Group: COMPANY\Network-Admins
    - NAS-Port-Type: Virtual (SSH/Telnet)
  Constraints:
    - Authentication: MS-CHAPv2
  Settings:
    - Cisco-AVPair: shell:priv-lvl=15
    - Service-Type: Login
    - Session-Timeout: 3600
```

**Kerberos Authentication — Detailed Ticket Flow:**

Active Directory uses Kerberos v5 (RFC 4120) as its primary authentication protocol. Unlike LDAP simple bind, Kerberos never sends passwords over the network — it uses encrypted tickets.

```
Kerberos Ticket Flow (Step by Step):

  Client                        KDC (Domain Controller)           Service
    |                                    |                           |
    |  1. AS-REQ (Authentication         |                           |
    |     Service Request)               |                           |
    |     Contains: Username,            |                           |
    |     timestamp encrypted with       |                           |
    |     user's password hash           |                           |
    |----------------------------------->|                           |
    |                                    |                           |
    |  2. AS-REP (Authentication         |                           |
    |     Service Reply)                 |                           |
    |     Contains: TGT (encrypted       |                           |
    |     with KDC's secret key),        |                           |
    |     Session Key (encrypted         |                           |
    |     with user's password hash)     |                           |
    |<-----------------------------------|                           |
    |                                    |                           |
    |  3. TGS-REQ (Ticket Granting       |                           |
    |     Service Request)               |                           |
    |     Contains: TGT + target         |                           |
    |     service SPN + authenticator    |                           |
    |     (encrypted with session key)   |                           |
    |----------------------------------->|                           |
    |                                    |                           |
    |  4. TGS-REP (Ticket Granting       |                           |
    |     Service Reply)                 |                           |
    |     Contains: Service Ticket       |                           |
    |     (encrypted with service's      |                           |
    |     secret key) + new session key  |                           |
    |<-----------------------------------|                           |
    |                                    |                           |
    |  5. AP-REQ (Application Request)                               |
    |     Contains: Service Ticket +                                 |
    |     authenticator (encrypted with                              |
    |     service session key)                                       |
    |--------------------------------------------------------------->|
    |                                    |                           |
    |  6. AP-REP (Application Reply)     |                           |
    |     Contains: Mutual auth proof    |                           |
    |     (server proves it could        |                           |
    |     decrypt the service ticket)    |                           |
    |<---------------------------------------------------------------|
    |                                    |                           |
    |  === Authenticated Session Established ===                     |

Key Concepts:
- TGT (Ticket Granting Ticket): Proves identity to the KDC; valid ~10 hours
- Service Ticket: Proves identity to a specific service; valid ~10 hours
- Session Key: Symmetric key for encrypting communication within a session
- SPN (Service Principal Name): Unique identifier for a service instance
  Example: HTTP/webserver.company.com, MSSQLSvc/dbserver.company.com:1433
- PAC (Privilege Attribute Certificate): Embedded in tickets;
  contains user SID, group SIDs — used for authorization decisions
- KDC: Key Distribution Center (runs on every Domain Controller)
  Composed of: AS (Authentication Service) + TGS (Ticket Granting Service)

Kerberos Security Properties:
- Password never sent over the network (only hash used for initial encryption)
- Mutual authentication (client and server both prove identity)
- Replay protection (timestamps and sequence numbers in authenticators)
- Ticket expiration limits exposure window
- Delegation support (constrained/unconstrained) for multi-tier applications
```

## Single Sign-On (SSO) and Federation

### SSO Concepts

**Definition:**
```
Single Sign-On: Authenticate once, access multiple systems
Benefit: User convenience, reduced password fatigue, fewer credentials to manage

Example:
User logs into Windows (AD/Kerberos authentication)
Automatically authenticated to:
- Email (Exchange/Outlook via Kerberos)
- SharePoint (Kerberos or SAML)
- Internal web applications (SAML or OIDC)
- Network devices (via RADIUS/TACACS+ with AD backend)
- Cloud applications (via SAML federation with Azure AD/Okta)

SSO Protocols:
- Kerberos: On-premises SSO within AD domain (transparent)
- SAML 2.0: Cross-domain SSO for web applications
- OAuth 2.0 + OIDC: Modern SSO for web and mobile applications
- WS-Federation: Microsoft-ecosystem SSO (legacy)
```

### SAML (Security Assertion Markup Language)

**Overview:**
```
Purpose: Exchange authentication and authorization data between domains
Standard: OASIS SAML 2.0
Use Case: SSO between identity provider and service provider
Transport: HTTP POST binding (most common) or HTTP Redirect binding

Roles:
- Identity Provider (IdP): Authenticates user (e.g., AD FS, Okta, Azure AD)
- Service Provider (SP): Application providing service (e.g., Salesforce, AWS)
- Principal: The user (subject of the assertion)

SP-Initiated Flow:
1. User accesses SP application
2. SP generates SAML AuthnRequest, redirects user to IdP
3. User authenticates at IdP (username/password, MFA, etc.)
4. IdP generates SAML Response containing Assertion
5. IdP POSTs SAML Response to SP's ACS (Assertion Consumer Service) URL
6. SP validates assertion signature, checks conditions, grants access
```

**SAML Assertion Structure:**

A SAML assertion is an XML document containing claims about the user. Understanding its structure is important for troubleshooting SSO integrations.

```xml
<saml:Assertion Version="2.0" IssueInstant="2025-11-21T14:30:00Z">

  <!-- Issuer: The IdP that created this assertion -->
  <saml:Issuer>https://idp.company.com/saml/metadata</saml:Issuer>

  <!-- Digital Signature: Proves assertion was issued by the IdP -->
  <ds:Signature>...</ds:Signature>

  <!-- Subject: Who this assertion is about -->
  <saml:Subject>
    <saml:NameID Format="emailAddress">jsmith@company.com</saml:NameID>
    <saml:SubjectConfirmation Method="bearer">
      <saml:SubjectConfirmationData
        Recipient="https://app.example.com/saml/acs"
        NotOnOrAfter="2025-11-21T14:35:00Z" />
    </saml:SubjectConfirmation>
  </saml:Subject>

  <!-- Conditions: When and where this assertion is valid -->
  <saml:Conditions NotBefore="2025-11-21T14:29:00Z"
                   NotOnOrAfter="2025-11-21T15:30:00Z">
    <saml:AudienceRestriction>
      <saml:Audience>https://app.example.com</saml:Audience>
    </saml:AudienceRestriction>
  </saml:Conditions>

  <!-- AuthnStatement: How and when the user authenticated -->
  <saml:AuthnStatement AuthnInstant="2025-11-21T14:30:00Z"
                       SessionIndex="_abc123">
    <saml:AuthnContext>
      <saml:AuthnContextClassRef>
        urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
      </saml:AuthnContextClassRef>
    </saml:AuthnContext>
  </saml:AuthnStatement>

  <!-- AttributeStatement: Additional claims about the user -->
  <saml:AttributeStatement>
    <saml:Attribute Name="groups">
      <saml:AttributeValue>NetworkAdmins</saml:AttributeValue>
      <saml:AttributeValue>VPN-Users</saml:AttributeValue>
    </saml:Attribute>
    <saml:Attribute Name="department">
      <saml:AttributeValue>Engineering</saml:AttributeValue>
    </saml:Attribute>
  </saml:AttributeStatement>

</saml:Assertion>
```

### OAuth 2.0 and OpenID Connect

**OAuth 2.0:**

OAuth 2.0 is a **delegation protocol for authorization** — it allows an application to access resources on behalf of a user without the user sharing their password. OAuth is NOT an authentication protocol (that role belongs to OIDC).

```
OAuth 2.0 Roles:
- Resource Owner: The user who owns the data
- Client: The application requesting access
- Authorization Server: Issues tokens (e.g., Google, Azure AD, Okta)
- Resource Server: API hosting the protected data
```

**Authorization Code Flow (most common, most secure):**

```
User        Client App      Auth Server      Resource Server
 |              |                |                  |
 | 1. Click     |                |                  |
 |   "Login"    |                |                  |
 |------------->|                |                  |
 |              |                |                  |
 |  2. Redirect to Auth Server   |                  |
 |    with client_id, scope,     |                  |
 |    redirect_uri, state        |                  |
 |<-------------|                |                  |
 |              |                |                  |
 | 3. User authenticates & consents                  |
 |------------------------------>|                  |
 |              |                |                  |
 | 4. Redirect back with         |                  |
 |    authorization CODE         |                  |
 |<------------------------------|                  |
 |------------->|                |                  |
 |              |                |                  |
 |              | 5. Exchange code for tokens        |
 |              |    (code + client_secret)           |
 |              |--------------->|                  |
 |              |                |                  |
 |              | 6. Access Token + Refresh Token    |
 |              |<---------------|                  |
 |              |                |                  |
 |              | 7. API call with Access Token       |
 |              |---------------------------------->|
 |              |                |                  |
 |              | 8. Protected resource data          |
 |              |<----------------------------------|
```

**Client Credentials Flow (machine-to-machine):**

```
Client App         Auth Server        Resource Server
    |                   |                   |
    | 1. Token request  |                   |
    |   (client_id +    |                   |
    |    client_secret) |                   |
    |------------------>|                   |
    |                   |                   |
    | 2. Access Token   |                   |
    |<------------------|                   |
    |                   |                   |
    | 3. API call with token                |
    |-------------------------------------->|
    |                   |                   |
    | 4. Response       |                   |
    |<--------------------------------------|

Use case: Automated scripts, service accounts, API-to-API
No user interaction — the client IS the resource owner
```

**OpenID Connect (OIDC):**

OIDC adds an **authentication layer** on top of OAuth 2.0. While OAuth answers "what can this app access?", OIDC answers "who is this user?"

```
OIDC adds to OAuth 2.0:
- ID Token: JWT containing user identity claims
- UserInfo Endpoint: API to fetch additional profile data
- Discovery: Well-known configuration endpoint
- Standard Scopes: openid, profile, email, address, phone
```

**OIDC ID Token Claims:**

```json
{
  "iss": "https://idp.company.com",          // Issuer — who issued this token
  "sub": "user-uuid-12345",                   // Subject — unique user identifier
  "aud": "client-app-id-67890",               // Audience — intended recipient app
  "exp": 1732200600,                           // Expiration — Unix timestamp
  "iat": 1732197000,                           // Issued At — Unix timestamp
  "auth_time": 1732197000,                     // When user actually authenticated
  "nonce": "abc123xyz",                        // Replay protection value
  "acr": "urn:mfa",                            // Authentication Context Reference
  "amr": ["pwd", "otp"],                       // Authentication Methods used
  "name": "John Smith",                        // Display name
  "email": "jsmith@company.com",               // Email address
  "groups": ["NetworkAdmins", "VPN-Users"]     // Group memberships (custom claim)
}
```

### Identity Federation for Network Access

Modern enterprise networks integrate identity federation protocols (SAML, OIDC) with network access control systems. This allows organizations to use cloud identity providers (Azure AD, Okta, Ping Identity) for both application SSO and network authentication.

**Cisco ISE with Azure AD (SAML):**

```
Architecture:
  User → Network Device → Cisco ISE → Azure AD (via SAML)

Use Cases:
  - Guest portal authentication via Azure AD
  - BYOD onboarding with Azure AD credentials
  - Sponsor portal SSO for guest management
  - Admin portal SSO for ISE administrators

Configuration Flow:
  1. Register Cisco ISE as a SAML SP in Azure AD
     - Entity ID: https://ise.company.com/admin/saml
     - ACS URL: https://ise.company.com/portal/SSOLoginResponse.action
  2. Download Azure AD Federation Metadata XML
  3. Import metadata into ISE as External Identity Source
  4. Map Azure AD groups to ISE authorization profiles:
     - Azure AD "NetworkAdmins" → ISE "FullAccess" profile
     - Azure AD "Employees" → ISE "Corporate-VLAN" profile
     - Azure AD "Contractors" → ISE "Restricted-VLAN" profile
  5. Create ISE Authorization Policy referencing SAML groups
```

**Aruba ClearPass with Okta (SAML/OIDC):**

```
Architecture:
  User → Aruba AP/Switch → ClearPass → Okta (via SAML or OIDC)

Use Cases:
  - Captive portal authentication with Okta SSO
  - Certificate enrollment via Okta identity verification
  - Device onboarding with Okta-managed user attributes

Flow:
  1. User connects to SSID, receives captive portal redirect
  2. Captive portal redirects to Okta for authentication
  3. User authenticates with Okta (MFA enforced by Okta policy)
  4. Okta returns SAML assertion to ClearPass
  5. ClearPass maps Okta attributes to network authorization:
     - Department = "Engineering" → VLAN 50 + full access ACL
     - Department = "Guest" → VLAN 99 + internet-only ACL
  6. ClearPass sends RADIUS Access-Accept to Aruba AP with attributes
  7. User placed in appropriate VLAN with correct ACL
```

**Key Benefits of Identity Federation for Networking:**

```
- Single identity source for both applications and network access
- MFA enforced by the IdP applies to network authentication
- Centralized user lifecycle management (disable in IdP = lose network access)
- Cloud-managed identity scales without on-premises AD dependency
- Consistent audit trail across application and network access
```

## Privileged Access Management (PAM)

Privileged Access Management (PAM) addresses the security risks associated with **privileged accounts** — those with elevated permissions to configure network devices, access sensitive systems, or manage infrastructure. Compromised privileged credentials are involved in the majority of data breaches, making PAM a critical component of network security.

### Credential Vaulting

Credential vaulting stores privileged passwords in an encrypted, centralized repository ("vault") rather than allowing administrators to know or manage passwords directly.

```
How Credential Vaulting Works:

1. Privileged passwords (enable secrets, root passwords, service accounts)
   are stored in an encrypted vault
2. Administrators request access through a PAM portal
3. PAM system checks authorization (role, time, approval workflow)
4. If approved, PAM either:
   a. Reveals the password temporarily (checked out), OR
   b. Injects the password automatically (user never sees it)
5. After use, password is automatically rotated
6. All access is logged with user identity, timestamp, and duration

Key Platforms:
- CyberArk Privileged Access Security: Enterprise vault for passwords,
  SSH keys, and certificates. Supports automatic password rotation
  on network devices (Cisco, Juniper, Palo Alto).
- HashiCorp Vault: Open-source secrets management. Dynamic secrets
  (generates short-lived credentials on demand). Popular for
  cloud and DevOps environments.
- Thycotic Secret Server: Web-based password vault with
  discovery and auto-rotation capabilities.
- BeyondTrust: Combines PAM with endpoint privilege management.

Network Device Example:
  Without PAM: Engineer knows enable secret "Cisco123!" for all switches
  With PAM:    Engineer requests access → CyberArk checks out unique
               credential → auto-connects via SSH → password rotated
               after session ends. Engineer never sees the password.
```

### Just-in-Time (JIT) Access Provisioning

JIT access grants privileged permissions only when needed and automatically revokes them after a defined period. This implements the principle of least privilege over time.

```
JIT Access Workflow:

1. Engineer needs to troubleshoot a core router (normally read-only access)
2. Engineer requests elevated access through PAM portal
   - Specifies: Target device, required privilege level, duration, reason
3. Request routed through approval workflow:
   - Auto-approved: If within pre-authorized maintenance window
   - Manager approval: For ad-hoc requests during business hours
   - Dual approval: For critical infrastructure (core routers, firewalls)
4. PAM grants temporary privilege escalation:
   - TACACS+ policy updated to allow privilege 15 for this user
   - Time-limited: Access expires in 2 hours (or custom duration)
   - Scope-limited: Only for the specified device(s)
5. Engineer performs work (all commands logged)
6. Access automatically revoked when timer expires
7. PAM rotates any credentials that were exposed

Benefits:
- No standing privileges: Admin rights exist only when actively needed
- Reduced attack surface: Compromised account has minimal permissions
- Audit trail: Every elevation request is documented with justification
- Compliance: Satisfies PCI-DSS, SOX, HIPAA least-privilege requirements
```

### Session Recording and Audit Trails

PAM solutions can record every action performed during a privileged session, providing a complete audit trail for compliance and forensic investigation.

```
Session Recording Capabilities:

1. Keystroke Logging:
   - Every command typed is recorded with timestamps
   - Includes command output (show commands, error messages)
   - Stored in tamper-proof, encrypted audit logs

2. Video Recording:
   - Screen recording of GUI-based sessions (ASDM, web consoles)
   - Playback capability for incident investigation
   - Searchable by metadata (user, device, time, commands)

3. Real-Time Monitoring:
   - SOC analysts can watch privileged sessions live
   - Alert on suspicious commands (e.g., "debug all", "write erase")
   - Ability to terminate sessions in real-time if policy is violated

4. Audit Log Integration:
   - Forward session logs to SIEM (Splunk, QRadar, Sentinel)
   - Correlate privileged access with network changes
   - Automated compliance reports (who did what, when, on which device)

Example Audit Log Entry:
  Timestamp: 2025-11-21T14:32:15Z
  User: jsmith (via CyberArk)
  Target: core-rtr-01 (10.1.1.1)
  Protocol: SSH
  Session Duration: 00:23:45
  Commands Executed: 47
  Privilege Level: 15
  Checkout Reason: "Troubleshoot OSPF adjacency issue - INC0012345"
  Approval: Auto-approved (maintenance window)
  Password Rotated: Yes (post-session)
```

### Break-Glass Procedures

Break-glass (also called "emergency access" or "firecall") procedures provide a controlled way to bypass normal PAM workflows during emergencies when the PAM system itself may be unavailable.

```
Break-Glass Procedure Components:

1. Emergency Accounts:
   - Dedicated local accounts on each device (e.g., "emergency-admin")
   - Passwords stored in sealed envelopes, physical safes, or
     offline password managers
   - Accounts disabled by default; enabled only during emergencies

2. Trigger Conditions:
   - PAM system outage (vault unreachable)
   - AAA server failure (TACACS+/RADIUS servers down)
   - Network partition isolating management plane
   - Active security incident requiring immediate response

3. Procedure:
   a. Declare emergency (notify SOC, manager, or on-call lead)
   b. Retrieve break-glass credentials from secure storage
   c. Access device using local emergency account
   d. Perform necessary actions (document everything manually)
   e. Notify security team when emergency access is complete
   f. Rotate break-glass credentials immediately
   g. File incident report with justification and actions taken

4. Cisco IOS Break-Glass Configuration:
   ! Local emergency account (always present as fallback)
   username break-glass privilege 15 algorithm-type scrypt secret [COMPLEX]

   ! AAA method list with local fallback
   aaa authentication login default group TACACS-GROUP local
   ! If TACACS+ is unreachable, local account is used

   ! Accounting still logs local authentication attempts
   aaa accounting exec default start-stop group TACACS-GROUP

5. Post-Incident Review:
   - Verify all break-glass actions were appropriate
   - Confirm credentials were rotated
   - Update sealed envelopes / safe with new credentials
   - Identify root cause of PAM/AAA outage
   - Update runbooks if procedure gaps were identified
```

## Summary

In this lesson, we explored how authentication ("who are you?"), authorization ("what can you do?"), and accounting ("what did you do?") work together to secure network access. Authentication uses three factor types: something you know (passwords), something you have (smart cards, TOTP tokens generating codes every 30 seconds per RFC 6238), and something you are (biometrics). Key protocols include RADIUS (UDP 1812/1813, encrypts passwords only, used for network access via 802.1X), TACACS+ (TCP 49, encrypts entire session, separates AAA functions), and Kerberos (ticket-based, used in Active Directory with TGTs and service tickets). Authorization models include RBAC (role-based), DAC (owner-controlled), and MAC (classification-based). Modern best practices mandate MFA for privileged accounts, NIST-aligned password policies (12+ characters, no forced rotation), and the principle of least privilege — granting only the minimum access required.

## Practice Questions

**Q1.** Which authentication protocol encrypts the entire session and separates authentication, authorization, and accounting functions?

A) RADIUS
B) Kerberos
C) TACACS+
D) LDAP

<details>
<summary>Answer</summary>

**C)** TACACS+ (TCP port 49) encrypts the entire session payload and separates AAA into independent functions, making it ideal for device administration. RADIUS (A) only encrypts passwords and combines authentication with authorization. Kerberos (B) is a ticket-based authentication protocol used in Active Directory environments. LDAP (D) is a directory access protocol, not an AAA protocol.
</details>

**Q2.** What does multi-factor authentication (MFA) require?

A) Two different passwords from two different systems
B) At least two factors from different categories (something you know, have, or are)
C) A password that meets complexity requirements and is changed every 30 days
D) Biometric authentication combined with a second biometric scan

<details>
<summary>Answer</summary>

**B)** MFA requires authentication using at least two different factor categories: something you know (password/PIN), something you have (smart card/token), or something you are (biometric). Two passwords (A) are the same factor category. Password complexity (C) is a single-factor policy. Two biometrics (D) are the same category — true MFA requires factors from different categories.
</details>

**Q3.** A company wants to ensure that network engineers can configure access switches but cannot modify core router configurations. Which access control model best supports this requirement?

A) Mandatory Access Control (MAC)
B) Discretionary Access Control (DAC)
C) Role-Based Access Control (RBAC)
D) Rule-Based Access Control

<details>
<summary>Answer</summary>

**C)** Role-Based Access Control (RBAC) assigns permissions based on job roles. A "Network Engineer" role can be configured with read/write access to access switches and read-only access to core routers, matching permissions to job function. MAC (A) uses classification levels and is typically used in military contexts. DAC (B) lets resource owners set permissions, which is harder to manage at scale. Rule-Based (D) applies access based on conditions like time or location, not job function.
</details>

**Q4.** Which EAP method provides the strongest security for wireless authentication by requiring both server and client certificates for mutual authentication?

A) EAP-FAST
B) PEAP
C) EAP-TLS
D) EAP-MD5

<details>
<summary>Answer</summary>

**C)** EAP-TLS requires both server and client digital certificates, providing mutual authentication — the strongest EAP method. EAP-FAST (A) uses Protected Access Credentials and does not require client certificates. PEAP (B) only requires a server certificate and uses an encrypted tunnel for credential exchange. EAP-MD5 (D) only provides one-way authentication with no encryption and is considered the weakest EAP method.
</details>

**Q5.** A security audit reveals that a former contractor's RADIUS account was used to access the VPN three weeks after their contract ended. The logs show successful authentication and multiple file downloads. Which principle was violated, and what should be implemented to prevent recurrence?

A) Separation of duties — require two people to approve VPN access
B) Least privilege — the contractor had excessive file permissions
C) Account lifecycle management — accounts must be disabled immediately upon contract termination
D) Defense in depth — additional firewall rules should block contractor IP ranges

<details>
<summary>Answer</summary>

**C)** Account lifecycle management requires that accounts be disabled or deleted immediately when personnel leave or contracts end. The root cause was that the account remained active after termination. Separation of duties (A) applies to preventing fraud, not access revocation. Least privilege (B) addresses permission scope but doesn't solve the terminated-account problem. Firewall rules (D) cannot reliably block users who have valid VPN credentials.
</details>

## References

- CompTIA Network+ N10-009 Exam Objectives: Objective 4.1 — Explain common security concepts (AAA, authentication methods)
- IETF RFC 2865: Remote Authentication Dial In User Service (RADIUS)
- IETF RFC 8907: The Terminal Access Controller Access-Control System Plus (TACACS+) Protocol
- IEEE 802.1X-2020: Port-Based Network Access Control
- NIST SP 800-63-3: Digital Identity Guidelines
- Stallings, W. (2021). *Network Security Essentials: Applications and Standards* (7th ed.). Pearson — Chapter 4: Authentication
