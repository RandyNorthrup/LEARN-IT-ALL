---
id: security-concepts
title: Security Concepts and Principles
chapterId: ch4-network-security
order: 31
duration: 85
objectives:
  - Understand the CIA triad (Confidentiality, Integrity, Availability)
  - Explain defense in depth strategies
  - Identify common security threats and vulnerabilities
  - Understand the security lifecycle
  - Apply security principles to network design
---

# Lesson 31: Security Concepts and Principles

## Introduction

Network security is the foundation of protecting an organization's digital assets, ensuring confidentiality, integrity, and availability of data and services. In this lesson, we'll explore fundamental security concepts, the CIA triad, defense in depth strategies, and the security lifecycle that guides all network security implementations.

Understanding these core principles is essential before implementing specific security technologies. Security is not a product you purchase—it's a process that requires continuous attention, adaptation, and improvement.

## The CIA Triad

The CIA triad represents the three fundamental principles of information security:

### Confidentiality

**Definition:** Ensuring that information is accessible only to authorized individuals or systems.

**Threats to Confidentiality:**
- Unauthorized access to data
- Man-in-the-middle attacks
- Eavesdropping on network traffic
- Social engineering attacks
- Stolen credentials or devices

**Protection Mechanisms:**
- **Encryption:** AES-256 for data at rest, TLS 1.3 for data in transit
- **Access controls:** Role-based access control (RBAC), least privilege principle
- **Authentication:** Multi-factor authentication (MFA), strong password policies
- **VPNs:** Encrypted tunnels for remote access
- **Data classification:** Labeling data by sensitivity level

**Example Scenario:**
A healthcare organization must protect patient medical records (HIPAA compliance). They implement:
- Database encryption (AES-256)
- VPN access for remote workers
- MFA for all system access
- Data loss prevention (DLP) to prevent unauthorized transfers

### Integrity

**Definition:** Ensuring that data remains accurate, complete, and unaltered except by authorized modifications.

**Threats to Integrity:**
- Data tampering or modification
- Man-in-the-middle attacks
- Malware or ransomware
- Unauthorized database changes
- Configuration drift

**Protection Mechanisms:**
- **Hashing:** SHA-256, SHA-3 for file integrity verification
- **Digital signatures:** Verify sender authenticity and detect tampering
- **Version control:** Git for configuration management
- **Access controls:** Prevent unauthorized modifications
- **Input validation:** Prevent SQL injection, cross-site scripting

**Example:**
```bash
# Verify file integrity using SHA-256 hash
$ sha256sum router-config.txt
a7b3c8d9e1f2...  router-config.txt

# After transfer, verify hash matches
$ sha256sum downloaded-config.txt
a7b3c8d9e1f2...  downloaded-config.txt
# Match confirms file integrity maintained
```

**Real-World Example:**
A financial institution uses digital signatures on all transactions to ensure:
- Transaction originates from legitimate source (authentication)
- Transaction data hasn't been altered (integrity)
- Sender cannot deny sending transaction (non-repudiation)

### Availability

**Definition:** Ensuring that information and systems are accessible to authorized users when needed.

**Threats to Availability:**
- Denial of Service (DoS) attacks
- Distributed Denial of Service (DDoS) attacks
- Hardware failures
- Power outages
- Natural disasters
- Ransomware attacks

**Protection Mechanisms:**
- **Redundancy:** RAID, redundant power supplies, failover systems
- **High availability:** HSRP, VRRP, clustering
- **DDoS mitigation:** Rate limiting, traffic filtering, CDN services
- **Backups:** Regular backups with tested restore procedures
- **Disaster recovery:** Hot/warm/cold sites
- **UPS and generators:** Power continuity

**Example Configuration - Rate Limiting:**
```cisco
! Protect against DoS attacks with rate limiting
interface GigabitEthernet0/1
  description Internet-facing interface
  ip access-group RATE-LIMIT in
  
access-list RATE-LIMIT remark Limit ICMP to prevent ping floods
access-list RATE-LIMIT permit icmp any any echo rate-limit 100
access-list RATE-LIMIT permit ip any any
```

**Availability Calculation:**
```
Uptime = (Total Time - Downtime) / Total Time

Example:
- Total time per year: 525,600 minutes
- Target: 99.99% (four nines)
- Maximum downtime: 525,600 × 0.0001 = 52.56 minutes/year
```

## AAA Framework (Authentication, Authorization, Accounting)

The AAA framework provides comprehensive access control for network resources.

### Authentication

**Definition:** Verifying the identity of a user or device.

**Authentication Methods:**

1. **Something You Know:**
   - Passwords
   - PINs
   - Security questions

2. **Something You Have:**
   - Smart cards
   - Security tokens (RSA SecurID)
   - Mobile devices (SMS codes, authenticator apps)

3. **Something You Are:**
   - Fingerprints
   - Facial recognition
   - Retina scans
   - Voice recognition

4. **Multi-Factor Authentication (MFA):**
   - Combines two or more factors
   - Example: Password + SMS code + fingerprint

**Common Authentication Protocols:**

**RADIUS (Remote Authentication Dial-In User Service):**
```
Port: UDP 1812 (authentication), UDP 1813 (accounting)
- Centralized authentication
- Encrypts passwords only (not entire communication)
- Used for network access control (802.1X)
```

**TACACS+ (Terminal Access Controller Access-Control System Plus):**
```
Port: TCP 49
- Cisco proprietary
- Encrypts entire session
- Separates authentication, authorization, accounting
- Preferred for device administration
```

**Example RADIUS Configuration:**
```cisco
! Configure RADIUS authentication for network devices
aaa new-model
aaa authentication login default group radius local
aaa authorization exec default group radius local

radius server RADIUS-SERVER-01
  address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
  key StrongRadiusKey123!
  
radius server RADIUS-SERVER-02
  address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
  key StrongRadiusKey123!
```

### Authorization

**Definition:** Determining what resources an authenticated user can access.

**Authorization Models:**

1. **Role-Based Access Control (RBAC):**
   - Users assigned to roles (e.g., Admin, Engineer, Guest)
   - Roles have defined permissions
   - Simplifies management at scale

2. **Rule-Based Access Control:**
   - Access based on rules (time of day, location, device)
   - Example: "Finance users can access accounting server only during business hours from corporate network"

3. **Discretionary Access Control (DAC):**
   - Resource owner determines access
   - Example: File system permissions (rwx)

4. **Mandatory Access Control (MAC):**
   - System enforces access based on classification levels
   - Example: Military classifications (Top Secret, Secret, Confidential)

**Example Authorization Configuration:**
```cisco
! Define privilege levels for authorization
username network-admin privilege 15 secret AdminPass123!
username network-operator privilege 7 secret OperatorPass123!
username network-viewer privilege 1 secret ViewerPass123!

! Privilege level 15 = Full access
! Privilege level 7 = Limited configuration access
! Privilege level 1 = Read-only access
```

### Accounting

**Definition:** Tracking and logging user activities for auditing, compliance, and forensics.

**What to Log:**
- Login/logout times
- Commands executed
- Configuration changes
- File transfers
- Failed authentication attempts
- Resource usage

**Example Accounting Configuration:**
```cisco
! Enable AAA accounting
aaa accounting exec default start-stop group radius
aaa accounting commands 15 default start-stop group radius
aaa accounting network default start-stop group radius

! Send accounting to syslog
logging host 10.1.1.200
logging trap informational
service timestamps log datetime msec
```

## Defense in Depth (Layered Security)

Defense in depth is a strategy that implements multiple layers of security controls to protect assets. If one layer fails, others remain to protect the system.

### Security Layers

**1. Physical Security Layer:**
- Locked server rooms
- Biometric access controls
- Video surveillance
- Security guards
- Equipment cages

**2. Perimeter Security Layer:**
- Firewalls
- Border routers with ACLs
- IDS/IPS systems
- DDoS mitigation services

**3. Network Security Layer:**
- Network segmentation (VLANs)
- Private VLANs
- Access control lists (ACLs)
- Network access control (NAC - 802.1X)

**4. Host Security Layer:**
- Antivirus/anti-malware
- Host-based firewalls
- Patch management
- Disk encryption
- Endpoint Detection and Response (EDR)

**5. Application Security Layer:**
- Input validation
- Web application firewalls (WAF)
- Secure coding practices
- Application whitelisting

**6. Data Security Layer:**
- Encryption at rest
- Encryption in transit
- Data loss prevention (DLP)
- Database activity monitoring
- Rights management

**Example Defense in Depth Configuration:**
```cisco
! Layer 1: Physical - Server room with badge access

! Layer 2: Perimeter - Firewall
ip access-list extended PERIMETER-IN
  deny   ip 10.0.0.0 0.255.255.255 any  ! Block RFC1918 from Internet
  deny   ip 172.16.0.0 0.15.255.255 any
  deny   ip 192.168.0.0 0.0.255.255 any
  permit tcp any host 203.0.113.10 eq 443  ! Allow HTTPS to web server
  permit tcp any host 203.0.113.10 eq 80   ! Allow HTTP to web server
  deny   ip any any log  ! Deny and log all other traffic

! Layer 3: Network - VLAN segmentation
vlan 10
  name DMZ
vlan 20
  name INTERNAL
vlan 30
  name GUEST

! Layer 4: Host - Port security on access ports
interface range GigabitEthernet1/0/1-48
  switchport mode access
  switchport port-security
  switchport port-security maximum 2
  switchport port-security violation restrict
  switchport port-security mac-address sticky
```

## Security Policies and Frameworks

### Security Policy Hierarchy

**1. Security Policy (High-Level):**
- Organization's overall security philosophy
- Defines goals and responsibilities
- Approved by executive management
- Example: "All sensitive data must be encrypted"

**2. Standards:**
- Mandatory rules to support policies
- Specific and measurable
- Example: "Use AES-256 encryption for data at rest"

**3. Procedures:**
- Step-by-step instructions
- How to implement standards
- Example: "Steps to configure BitLocker encryption on Windows workstations"

**4. Guidelines:**
- Recommended practices
- Not mandatory
- Example: "Consider using password managers for complex passwords"

### Common Security Policies

**Acceptable Use Policy (AUP):**
- Defines acceptable use of IT resources
- Prohibits illegal activities, harassment, unauthorized access
- Consequences for violations

**Password Policy:**
- Minimum length (12+ characters)
- Complexity requirements
- Expiration period (90 days)
- Password history (prevent reuse of last 10 passwords)
- Account lockout (5 failed attempts, 30-minute lockout)

**Example Password Policy Configuration:**
```cisco
! Configure password policy on Cisco devices
aaa common-criteria policy PASSWORD-POLICY
  min-length 12
  max-length 127
  upper-case 1
  lower-case 1
  numeric-count 1
  special-case 1
  char-changes 4
```

**Remote Access Policy:**
- Who can access remotely
- Approved methods (VPN only)
- MFA requirement
- Endpoint security requirements

**Data Classification Policy:**
```
Classification Levels:
1. Public - No harm if disclosed
2. Internal Use - Minor harm if disclosed
3. Confidential - Significant harm if disclosed
4. Restricted - Severe harm if disclosed (customer data, financial records)

Handling Requirements:
- Restricted: Encryption required, access logged, cannot be emailed
- Confidential: Encryption recommended, limited access
- Internal Use: Internal network only
- Public: No restrictions
```

## Common Security Frameworks

### NIST Cybersecurity Framework

**Five Core Functions:**

1. **Identify:**
   - Asset inventory
   - Risk assessment
   - Governance policies

2. **Protect:**
   - Access controls
   - Data security
   - Security awareness training

3. **Detect:**
   - Continuous monitoring
   - Anomaly detection
   - Security event logging

4. **Respond:**
   - Incident response plan
   - Communication procedures
   - Mitigation strategies

5. **Recover:**
   - Recovery planning
   - Improvements based on lessons learned
   - Reputation management

### ISO 27001/27002

**Information Security Management System (ISMS):**
- International standard for information security
- Risk-based approach
- Plan-Do-Check-Act cycle
- Requires regular audits and certifications

**Control Categories (ISO 27002):**
- Organizational controls (14 domains)
- People controls
- Physical controls
- Technological controls

### CIS Controls (Center for Internet Security)

**Top 5 Critical Security Controls:**

1. **Inventory and Control of Enterprise Assets**
   - Know what devices are on your network
   - Unauthorized devices automatically isolated

2. **Inventory and Control of Software Assets**
   - Know what software is installed
   - Remove unauthorized software

3. **Data Protection**
   - Classify data
   - Encrypt sensitive data
   - Control data flow

4. **Secure Configuration**
   - Harden systems
   - Remove default credentials
   - Disable unnecessary services

5. **Account Management**
   - Centralized authentication
   - MFA implementation
   - Regular account reviews

## Risk Management

### Risk Assessment Process

**1. Identify Assets:**
- Hardware (servers, switches, routers)
- Software (applications, databases)
- Data (customer records, intellectual property)
- People (employees, contractors)

**2. Identify Threats:**
- Natural disasters (floods, earthquakes)
- Cyber attacks (malware, ransomware, DDoS)
- Human error (misconfigurations, accidental deletion)
- Insider threats (malicious employees)

**3. Identify Vulnerabilities:**
- Unpatched software
- Weak passwords
- Missing encryption
- Open ports
- Misconfigured firewalls

**4. Calculate Risk:**
```
Risk = Likelihood × Impact

Likelihood Scale (1-5):
1 = Very unlikely (< 10% chance per year)
2 = Unlikely (10-30%)
3 = Possible (30-50%)
4 = Likely (50-70%)
5 = Very likely (> 70%)

Impact Scale (1-5):
1 = Negligible (< $1,000 loss)
2 = Minor ($1,000 - $10,000)
3 = Moderate ($10,000 - $100,000)
4 = Major ($100,000 - $1M)
5 = Catastrophic (> $1M or business closure)

Example:
Threat: Ransomware attack
Likelihood: 4 (Likely)
Impact: 5 (Catastrophic - $2M ransom + downtime)
Risk Score: 4 × 5 = 20 (Critical)
```

**Risk Matrix:**
```
       Impact →
    | 1  | 2  | 3  | 4  | 5  |
----+----+----+----+----+----|
  5 | 5  | 10 | 15 | 20 | 25 |
L 4 | 4  | 8  | 12 | 16 | 20 |
i 3 | 3  | 6  | 9  | 12 | 15 |
k 2 | 2  | 4  | 6  | 8  | 10 |
e 1 | 1  | 2  | 3  | 4  | 5  |

Risk Levels:
1-5   = Low (Accept)
6-10  = Medium (Monitor)
11-15 = High (Mitigate)
16-25 = Critical (Mitigate immediately)
```

### Risk Response Strategies

**1. Risk Avoidance:**
- Eliminate the activity that causes risk
- Example: Don't store customer credit cards (use payment processor instead)

**2. Risk Mitigation:**
- Implement controls to reduce likelihood or impact
- Example: Install firewalls, implement MFA, train employees

**3. Risk Transfer:**
- Shift risk to third party
- Example: Cyber insurance, cloud service providers, managed security services

**4. Risk Acceptance:**
- Acknowledge risk but take no action
- Used when mitigation cost exceeds potential loss
- Must be formally documented and approved

**Example Risk Treatment Plan:**
```
Risk: DDoS attack on public website
Likelihood: 4 (Likely)
Impact: 4 (Major - $500K revenue loss)
Risk Score: 16 (Critical)

Treatment Strategy: Mitigation + Transfer
- Implement CDN with DDoS protection (Cloudflare/Akamai)
- Configure rate limiting on firewalls
- Purchase cyber insurance
- Develop incident response plan

Residual Risk After Mitigation:
Likelihood: 2 (Unlikely)
Impact: 2 (Minor - $5K)
Residual Risk Score: 4 (Low - Accept)
```

## Security Threats and Attack Vectors

### Common Threat Actors

**1. Script Kiddies:**
- Low skill level
- Use pre-made tools
- Motivation: Curiosity, bragging rights
- Threat level: Low

**2. Hacktivists:**
- Politically motivated
- Target organizations with opposing views
- Tactics: Website defacement, DoS attacks, data leaks
- Threat level: Medium

**3. Organized Crime:**
- Financially motivated
- Professional operations
- Tactics: Ransomware, credit card theft, banking trojans
- Threat level: High

**4. Nation-State Actors (APT - Advanced Persistent Threat):**
- Government-sponsored
- Highly skilled and funded
- Long-term campaigns
- Targets: Critical infrastructure, intellectual property, espionage
- Threat level: Very High

**5. Insider Threats:**
- Current or former employees
- Authorized access to systems
- Motivation: Financial gain, revenge, ideology
- Threat level: High (hardest to detect)

### Attack Types

**Social Engineering:**
- Manipulating people to divulge information or perform actions
- **Phishing:** Fraudulent emails requesting credentials
- **Spear phishing:** Targeted phishing against specific individuals
- **Whaling:** Phishing targeting executives
- **Vishing:** Voice phishing (phone calls)
- **Smishing:** SMS phishing
- **Pretexting:** Creating false scenario to gain trust
- **Baiting:** Offering something to entice victim (free USB drive with malware)

**Prevention:**
- Security awareness training
- Email filtering
- MFA (even if credentials stolen, can't log in)
- Verify requests through alternate communication channel

**Malware:**
- **Virus:** Self-replicating code attached to files
- **Worm:** Self-replicating, spreads without user action
- **Trojan:** Disguised as legitimate software
- **Ransomware:** Encrypts data, demands payment
- **Spyware:** Monitors user activities
- **Keylogger:** Records keystrokes
- **Rootkit:** Hides malware presence
- **Botnet:** Network of compromised computers

**Man-in-the-Middle (MITM):**
- Attacker intercepts communication between two parties
- Can read, modify, or inject data
- **ARP spoofing:** Attacker associates their MAC with victim's IP
- **DNS spoofing:** Redirect DNS queries to malicious site
- **SSL stripping:** Downgrade HTTPS to HTTP

**Example ARP Spoofing Detection:**
```bash
# Monitor for duplicate IP addresses or MAC changes
$ arp-scan --interface=eth0 --localnet
192.168.1.1    00:11:22:33:44:55    Router
192.168.1.1    aa:bb:cc:dd:ee:ff    DUPLICATE IP!
```

**Prevention:**
- Encryption (TLS, IPsec)
- Certificate pinning
- VPNs
- Dynamic ARP inspection
- DHCP snooping

**Denial of Service (DoS) / Distributed DoS (DDoS):**
- Overwhelm system to make it unavailable
- **SYN flood:** Exploit TCP handshake
- **UDP flood:** Overwhelming with UDP packets
- **Amplification attacks:** Exploit protocols (DNS, NTP, SNMP)
- **Application layer attacks:** Target web applications (HTTP floods)

**Example DDoS Mitigation:**
```cisco
! Configure Control Plane Policing (CoPP)
ip access-list extended COPP-ICMP
  permit icmp any any

class-map match-all COPP-ICMP-CLASS
  match access-group name COPP-ICMP

policy-map COPP-POLICY
  class COPP-ICMP-CLASS
    police 100000 conform-action transmit exceed-action drop

control-plane
  service-policy input COPP-POLICY
```

## Security Best Practices

### Principle of Least Privilege

**Definition:** Users should have only the minimum access necessary to perform their job functions.

**Implementation:**
- Use RBAC for access management
- Regular access reviews (quarterly)
- Just-in-time access for administrative tasks
- Remove access immediately upon role change or termination

**Example:**
```
Bad: All IT staff have domain admin rights
Good: 
- Help desk: User account management only
- Network engineers: Network device admin only
- Security team: Security tool admin only
- True domain admins: < 3 people, MFA required, logged
```

### Separation of Duties

**Definition:** No single person should have complete control over critical processes.

**Example in Network Management:**
- Person A: Submits change request
- Person B: Reviews and approves change
- Person C: Implements change
- Person D: Verifies implementation

This prevents:
- Unauthorized changes
- Covering up mistakes
- Fraud or malicious activity

### Security Through Obscurity (Not Recommended)

**Definition:** Relying on secrecy as primary security measure.

**Why It Fails:**
- Security should remain effective even if details are known
- Obscurity can be reverse-engineered
- Creates false sense of security

**Examples of Security Through Obscurity:**
- Changing SSH port from 22 to 2222 (easily discovered)
- Custom encryption algorithms (likely flawed)
- Hiding network shares with "$" (still accessible if known)

**Better Approach:**
- Use proven security technologies (encryption, authentication)
- Implement defense in depth
- Obscurity as additional layer, not primary defense

### Zero Trust Security Model

**Core Principle:** "Never trust, always verify"

**Traditional Model:**
- Trust inside network, distrust outside
- Problem: Insider threats, lateral movement after breach

**Zero Trust Model:**
- Verify explicitly (authenticate and authorize every request)
- Assume breach (segment network, limit blast radius)
- Least privilege access

**Implementation:**
```
1. Identify all assets and data flows
2. Segment network (micro-segmentation)
3. Implement strong authentication (MFA everywhere)
4. Encrypt all traffic (even internal)
5. Monitor and log everything
6. Automate security responses
```

**Example Zero Trust Network:**
```cisco
! Every VLAN isolated, communication requires firewall approval
! No implicit trust between VLANs

! Engineering VLAN - isolated
vlan 10
  name Engineering

! Finance VLAN - isolated  
vlan 20
  name Finance

! All inter-VLAN routing goes through firewall
! Firewall has granular rules:
! Engineering can access code repository (port 443 to 10.50.0.10)
! Finance can access accounting server (port 1433 to 10.50.0.20)
! No other communication allowed
```

## Compliance and Regulations

### Common Compliance Requirements

**PCI-DSS (Payment Card Industry Data Security Standard):**
- Applies to: Organizations handling credit card data
- Requirements:
  - Firewall between internet and cardholder data
  - Encrypt transmission of cardholder data
  - Restrict access to cardholder data
  - Regularly test security systems
  - Maintain information security policy

**HIPAA (Health Insurance Portability and Accountability Act):**
- Applies to: Healthcare providers, health plans, clearinghouses
- Requirements:
  - Protect electronic health records (ePHI)
  - Encryption of data at rest and in transit
  - Access controls and audit logs
  - Business associate agreements
  - Breach notification procedures

**GDPR (General Data Protection Regulation):**
- Applies to: Organizations handling EU citizen data
- Requirements:
  - Consent for data collection
  - Right to be forgotten
  - Data portability
  - Breach notification (72 hours)
  - Data protection by design

**SOX (Sarbanes-Oxley Act):**
- Applies to: Publicly traded companies
- Requirements:
  - Financial data integrity
  - Change management controls
  - Access controls to financial systems
  - Audit trails

### Compliance Impact on Network Security

**Network Segmentation:**
- Isolate systems handling regulated data
- Example: Separate PCI-DSS cardholder data environment

**Access Logging:**
- Log all access to regulated systems
- Retain logs per compliance requirements (typically 90 days to 7 years)

**Encryption Requirements:**
- Encrypt regulated data at rest and in transit
- Use approved algorithms (AES-256, TLS 1.2+)

**Audit Requirements:**
- Regular security assessments
- Penetration testing
- Vulnerability scanning

## Review Questions

1. **What are the three principles of the CIA triad?**
   - Confidentiality, Integrity, Availability

2. **What is the difference between authentication and authorization?**
   - Authentication verifies identity ("who you are"), authorization determines access rights ("what you can do")

3. **What authentication protocol encrypts the entire session?**
   - TACACS+ (vs RADIUS which only encrypts passwords)

4. **What is defense in depth?**
   - Implementing multiple layers of security controls so if one fails, others protect the system

5. **What are the four risk response strategies?**
   - Avoidance, Mitigation, Transfer, Acceptance

6. **What is the principle of least privilege?**
   - Users should have only minimum access necessary for their job functions

7. **What is the Zero Trust security model?**
   - "Never trust, always verify" - authenticate and authorize every request regardless of location

8. **What is multi-factor authentication (MFA)?**
   - Using two or more authentication factors: something you know, have, or are

9. **What is the difference between RADIUS and TACACS+?**
   - RADIUS: UDP, encrypts passwords only, combines authentication/authorization
   - TACACS+: TCP, encrypts entire session, separates AAA functions

10. **What is a SPOF in security context?**
    - Single Point of Failure - a component whose failure causes complete system failure

## Key Takeaways

- **CIA Triad** is the foundation of information security: Confidentiality, Integrity, Availability
- **AAA Framework** (Authentication, Authorization, Accounting) provides comprehensive access control
- **Defense in depth** implements multiple security layers to protect against threats
- **Risk management** involves identifying, assessing, and treating risks based on likelihood and impact
- **Least privilege** and **separation of duties** are critical principles for access control
- **Zero Trust** model assumes breach and verifies every access request
- **Compliance requirements** (PCI-DSS, HIPAA, GDPR) drive many security implementations
- **Security is a process**, not a product - requires continuous monitoring and improvement

## Next Steps

In the next lesson, we'll explore **Physical Security** measures that protect network infrastructure, including access controls, environmental controls, and facility security best practices.

---

**Lesson Complete!** You now understand fundamental security concepts and principles that guide all network security implementations.
