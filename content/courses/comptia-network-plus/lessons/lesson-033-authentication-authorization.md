---
id: authentication-authorization
title: Authentication and Authorization
chapterId: ch4-network-security
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

**Key Principle:** Never trust, always verify. Authenticate every access request and enforce least privilege authorization.

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

**EAP Methods:**
```
EAP-TLS (EAP-Transport Layer Security):
- Strongest security
- Requires client certificates
- Mutual authentication (client + server)
- No password
- Use: High-security environments

PEAP (Protected EAP):
- TLS tunnel for password protection
- Server certificate required
- Username/password authentication
- Use: Enterprise with Active Directory

PEAP-MSCHAPv2:
- Microsoft implementation
- Active Directory integration
- Cached credentials support
- Use: Windows environments

EAP-TTLS (EAP-Tunneled TLS):
- Similar to PEAP
- More flexible inner authentication
- Use: Mixed environments

EAP-FAST (EAP-Flexible Authentication via Secure Tunneling):
- Cisco proprietary
- No certificate required (uses PAC - Protected Access Credential)
- Use: Quick deployment without PKI
```

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
- Username and password
- Should use LDAPS (TLS encryption)

SASL (Simple Authentication and Security Layer):
- Kerberos authentication
- More secure than simple bind

Example LDAP Query:
ldapsearch -x -H ldap://ldap.company.com \
  -D "cn=admin,dc=company,dc=com" \
  -W -b "ou=Users,dc=company,dc=com" \
  "(uid=jsmith)"

Result:
dn: cn=John Smith,ou=Engineering,ou=Users,dc=company,dc=com
cn: John Smith
uid: jsmith
mail: jsmith@company.com
telephoneNumber: +1-555-0100
```

### Active Directory (AD)

**Components:**
```
Domain: Security boundary (company.com)
Domain Controller (DC): Server running AD
Global Catalog: Index of all objects in forest
Forest: Collection of domains
Organizational Unit (OU): Container for objects

Objects:
- Users
- Computers
- Groups
- Printers
- Shared folders
```

**Group Policy:**
```
Purpose: Centralized configuration management

Common Policies:
- Password requirements
- Account lockout
- User rights assignment
- Software installation
- Desktop settings

Example GPO:
Name: Workstation Security Policy
Settings:
- Minimum password length: 14 characters
- Account lockout: 5 attempts, 30 minute lockout
- Screen lock: 10 minutes of inactivity
- Windows Firewall: Enabled
- Antivirus: Required, auto-update
```

**Kerberos Authentication:**
```
AD uses Kerberos for authentication (not LDAP passwords)

Kerberos Process:
1. User logs in, requests Ticket Granting Ticket (TGT) from KDC
2. KDC validates credentials, issues TGT
3. User requests Service Ticket for resource
4. KDC validates TGT, issues Service Ticket
5. User presents Service Ticket to resource
6. Resource validates ticket, grants access

Benefits:
- Mutual authentication (client and server)
- No password sent over network
- Ticket expiration (default 10 hours)
- Single Sign-On (SSO)
```

## Single Sign-On (SSO) and Federation

### SSO Concepts

**Definition:**
```
Single Sign-On: Authenticate once, access multiple systems
Benefit: User convenience, reduced password fatigue

Example:
User logs into Windows (AD authentication)
Automatically authenticated to:
- Email (Exchange/Outlook)
- SharePoint
- Internal web applications
- Network devices (via RADIUS/TACACS+ with AD)
```

### SAML (Security Assertion Markup Language)

**Overview:**
```
Purpose: Exchange authentication and authorization data
Use Case: SSO between identity provider and service provider

Roles:
- Identity Provider (IdP): Authenticates user (e.g., AD, Okta)
- Service Provider (SP): Application providing service (e.g., Salesforce)

Flow:
1. User accesses SP
2. SP redirects to IdP for authentication
3. User authenticates at IdP
4. IdP sends SAML assertion to SP
5. SP validates assertion, grants access
```

### OAuth 2.0 and OpenID Connect

**OAuth 2.0:**
```
Purpose: Delegated authorization (not authentication)
Use Case: Grant app access to your data without sharing password

Example: "Log in with Google"
1. App redirects to Google
2. User authorizes app
3. Google issues access token
4. App uses token to access user's Google data

Note: OAuth is for authorization, not authentication
```

**OpenID Connect (OIDC):**
```
Purpose: Authentication layer on top of OAuth 2.0
Use Case: SSO for web applications

Adds to OAuth:
- ID Token (JWT) with user identity
- UserInfo endpoint for profile data
- Standardized authentication

Example: "Sign in with Google/Microsoft/GitHub"
```

## Review Questions

1. **What are the three components of AAA?**
   - Authentication (who are you), Authorization (what can you do), Accounting (what did you do)

2. **What is the difference between RADIUS and TACACS+?**
   - RADIUS uses UDP, encrypts only password, combines auth/authz. TACACS+ uses TCP, encrypts full packet, separates AAA, better for device administration

3. **What is 802.1X and what are its three components?**
   - Port-based authentication standard; components: supplicant (client), authenticator (switch/AP), authentication server (RADIUS)

4. **What is the strongest EAP method?**
   - EAP-TLS (requires client certificates, mutual authentication)

5. **What is RBAC?**
   - Role-Based Access Control: permissions assigned to roles, users assigned to roles

6. **What is the principle of least privilege?**
   - Users should have minimum permissions necessary to perform their job

7. **What protocol does Active Directory use for authentication?**
   - Kerberos (not LDAP passwords)

8. **What is the difference between OAuth and OpenID Connect?**
   - OAuth is for authorization (delegated access), OIDC adds authentication layer (identity verification)

9. **What port does LDAPS use?**
   - TCP 636 (LDAP is TCP 389)

10. **What is multi-factor authentication?**
    - Using two or more authentication factors (something you know, have, are, where, do)

## Key Takeaways

- **AAA Framework** separates authentication, authorization, and accounting functions
- **Multi-factor authentication** significantly improves security over passwords alone
- **RADIUS** is best for network access (wireless, VPN), **TACACS+** for device administration
- **802.1X** prevents unauthorized network access at the port level
- **RBAC** simplifies permission management by assigning users to roles
- **Least privilege** minimizes security risk by limiting permissions
- **Directory services** (AD, LDAP) centralize user management
- **SSO and federation** improve user experience while maintaining security
- **Kerberos** provides mutual authentication without sending passwords

## Next Steps

In the next lesson, we'll explore **Cryptography Fundamentals**, including encryption, hashing, digital signatures, and PKI.

---

**Lesson Complete!** You now understand authentication and authorization mechanisms that control access to network resources.
