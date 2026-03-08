---
id: lesson-039-network-access-control
title: Network Access Control (NAC)
chapterId: ch5-network-security
order: 39
duration: 80
objectives:
  - Understand NAC concepts and benefits
  - Implement 802.1X port-based authentication
  - Configure device posture assessment
  - Deploy network segmentation
  - Implement quarantine and remediation
---

# Lesson 39: Network Access Control (NAC)

## Introduction

Network Access Control (NAC) is a security approach that enforces policies on devices attempting to access network resources. NAC ensures only compliant, authorized devices gain network access, reducing the attack surface and enforcing security standards across the organization.

In this lesson, we'll explore NAC technologies, 802.1X port-based authentication, posture assessment, remediation, guest access management, and NAC deployment strategies.

**Key Principle:** Trust but verify - authenticate devices and validate security posture before granting network access.

## Learning Objectives

After completing this lesson, you will be able to:

- Understand NAC concepts and benefits
- Implement 802.1X port-based authentication
- Configure device posture assessment
- Deploy network segmentation
- Implement quarantine and remediation

---

## NAC Fundamentals

### What is NAC?

**Definition:**
```
NAC: Network Access Control
Purpose: Control device access to network based on policies
Function: Authentication + Authorization + Posture Assessment

NAC Enforces:
1. Who: User/device identity
2. What: Device security posture
3. Where: Network location/VLAN
4. When: Time-based access
5. How: Compliance with security policies
```

**NAC Components:**
```
1. Policy Server:
   - Defines access policies
   - Makes access decisions
   - Centralized management

2. Authentication:
   - Identity verification (802.1X, MAB, WebAuth)
   - Integration with directories (AD, LDAP)

3. Posture Assessment:
   - Check device compliance
   - Antivirus status
   - OS patches
   - Encryption status

4. Enforcement:
   - VLAN assignment
   - ACL application
   - Quarantine non-compliant devices

5. Remediation:
   - Guide users to compliance
   - Auto-remediation if possible
   - Self-service portals
```

**Use Cases:**
```
Corporate Network:
- Only domain-joined computers access corporate resources
- Personal devices restricted to guest network
- Non-compliant devices quarantined until patched

BYOD (Bring Your Own Device):
- Employees use personal devices
- Separate VLAN from corporate
- Limited access to specific resources

Guest Access:
- Time-limited access
- Internet-only (no corporate access)
- Self-registration portal

IoT Devices:
- Separate network segment
- Profile-based access (printers, cameras, sensors)
- Monitor for anomalies
```

## 802.1X Port-Based Authentication

### 802.1X Overview

**Components:**
```
Supplicant:
- Client device (laptop, phone, printer)
- Sends credentials
- EAP protocol

Authenticator:
- Switch or access point
- Enforces authentication
- Passes EAP to RADIUS
- Controls port access

Authentication Server:
- RADIUS server (often integrated with NAC)
- Validates credentials
- Returns authorization attributes
```

**Authentication Flow:**
```
1. Device connects to switch port
2. Port in unauthorized state (EAPoL only)
3. Authenticator: "EAP-Request/Identity"
4. Supplicant: "EAP-Response/Identity (username)"
5. Authenticator forwards to RADIUS
6. RADIUS: Challenge (EAP method dependent)
7. Supplicant: Credentials
8. RADIUS: Access-Accept or Access-Reject
9. If Accept: Port → authorized state
   - VLAN assignment
   - ACL application
   - QoS settings
10. If Reject: Port remains unauthorized

Port States:
- Unauthorized: Only 802.1X traffic
- Authorized: All traffic allowed
```

### Switch Configuration

**Cisco Catalyst 802.1X Configuration:**
```cisco
! Global 802.1X configuration
aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius

! RADIUS server
radius server ISE-PRIMARY
 address ipv4 10.1.1.100 auth-port 1812 acct-port 1813
 key ISEr@diusK3y!

radius server ISE-SECONDARY
 address ipv4 10.1.1.101 auth-port 1812 acct-port 1813
 key ISEr@diusK3y!

aaa group server radius ISE-GROUP
 server name ISE-PRIMARY
 server name ISE-SECONDARY

! Enable 802.1X globally
dot1x system-auth-control

! Interface configuration (access port)
interface GigabitEthernet1/0/10
 description User Access Port
 switchport mode access
 switchport access vlan 999  ! Pre-auth VLAN
 
 ! Authentication methods (in order)
 authentication order dot1x mab webauth
 authentication priority dot1x mab webauth
 
 ! Port control
 authentication port-control auto
 authentication host-mode multi-auth
 authentication violation restrict
 
 ! 802.1X specific
 dot1x pae authenticator
 dot1x timeout tx-period 3
 
 ! MAB configuration
 mab
 
 ! Enable features
 spanning-tree portfast
 spanning-tree bpduguard enable
```

**Host Modes:**
```
single-host:
- One device per port
- One MAC address
- First device authenticated
- Use: Secure environments

multi-host:
- Multiple devices allowed
- First device authenticates
- Others piggyback
- Use: IP phones + PC

multi-auth:
- Multiple devices, each authenticated
- Each MAC authenticated separately
- Most secure multi-device mode
- Use: Modern deployments

multi-domain:
- One data device + one voice device
- Separate authentication for each
- Use: IP phone + PC scenarios
```

### Authentication Methods

**802.1X (EAP):**
```
Description: Standards-based authentication
Supplicant Required: Yes
Best For: Domain-joined computers, managed devices

EAP Methods:
- EAP-TLS: Certificate-based (strongest)
- PEAP-MSCHAPv2: Username/password (Active Directory)
- EAP-FAST: Cisco (no certificate required)

Advantages:
- Strongest security
- User and device authentication
- Supports MFA

Disadvantages:
- Requires supplicant software
- Complex configuration
- Not supported by all devices
```

**MAB (MAC Authentication Bypass):**
```
Description: Authenticate based on MAC address
Supplicant Required: No
Best For: Devices without 802.1X support (printers, cameras)

Process:
1. Device connects
2. Switch captures MAC address
3. RADIUS lookup: Is MAC authorized?
4. If authorized: Grant access
5. If not: Deny or redirect

Configuration:
interface GigabitEthernet1/0/15
 description Printer Port
 authentication order mab
 mab

RADIUS Configuration:
MAC Address: aa:bb:cc:dd:ee:ff
Authorization: VLAN 70 (IoT VLAN)

Disadvantages:
- MAC addresses can be spoofed
- Less secure than 802.1X
- Static database management

Use: Legacy devices, printers, IoT
```

**WebAuth (Captive Portal):**
```
Description: Web-based authentication
Supplicant Required: No (uses browser)
Best For: Guest access, BYOD

Process:
1. Device connects
2. Switch allows HTTP/HTTPS only
3. User opens browser → redirect to portal
4. User enters credentials (or accepts terms)
5. RADIUS validates
6. If valid: Full network access

Types:
- Local Web Authentication: Switch-hosted portal
- Central Web Authentication: External portal

Use Cases:
- Guest access
- BYOD registration
- Contractor access
- Public WiFi

Configuration:
ip http server
ip http secure-server

interface GigabitEthernet1/0/20
 authentication order webauth
 authentication priority webauth
```

### Dynamic VLAN Assignment

**RADIUS Attributes:**
```
Tunnel-Type = VLAN (13)
Tunnel-Medium-Type = IEEE-802 (6)
Tunnel-Private-Group-ID = 50

RADIUS Response:
Access-Accept
  User-Name = "jsmith"
  Tunnel-Type = VLAN
  Tunnel-Medium-Type = IEEE-802
  Tunnel-Private-Group-ID = "50"

Result: User placed in VLAN 50
```

**Use Cases:**
```
1. Role-Based Access:
   - Employee → VLAN 10 (full access)
   - Contractor → VLAN 20 (limited)
   - Guest → VLAN 30 (Internet only)

2. Department-Based:
   - Engineering → VLAN 50
   - Finance → VLAN 60
   - HR → VLAN 70

3. Compliance-Based:
   - Compliant → VLAN 10 (production)
   - Non-compliant → VLAN 99 (quarantine)

4. Device Type:
   - Computers → VLAN 10
   - Printers → VLAN 70
   - IoT → VLAN 80
```

## Posture Assessment

### Compliance Checks

**What to Check:**
```
Operating System:
- OS type and version
- Patch level
- Security updates installed

Antivirus:
- Installed
- Running
- Definitions updated (within 7 days)
- Real-time protection enabled

Firewall:
- Host firewall enabled
- Proper configuration

Encryption:
- Full disk encryption (BitLocker, FileVault)
- Enabled and active

Software:
- Approved applications only
- No prohibited software
- Required software installed

Configuration:
- Screen lock enabled (15 minutes)
- Password complexity met
- Auto-updates enabled
```

**Assessment Methods:**

**Agent-Based (Persistent):**
```
Description: Software agent installed on device
Frequency: Continuous monitoring

Advantages:
- Continuous compliance checking
- Deep inspection
- Remediation capabilities
- Works anywhere (VPN, remote)

Disadvantages:
- Must install on all devices
- Deployment overhead
- Not suitable for BYOD/guest

Products: Cisco ISE with AnyConnect, ForeScout
```

**Agent-Based (Dissolvable):**
```
Description: Temporary agent (Java/ActiveX)
Frequency: At connection time

Advantages:
- No permanent installation
- Suitable for guest/BYOD
- Quick assessment

Disadvantages:
- Limited checks
- Browser-dependent
- Java/ActiveX security concerns

Use: Guest access, temporary contractors
```

**Agentless:**
```
Description: Network-based scanning (no agent)
Frequency: Periodic or on-connect

Methods:
- Port scanning
- Banner grabbing
- Credential-based scanning (WMI, SSH)

Advantages:
- No software installation
- Works with any device

Disadvantages:
- Less accurate
- Limited visibility
- Cannot enforce remediation

Use: Supplementary to agent-based
```

### Remediation

**Quarantine VLAN:**
```
Purpose: Isolate non-compliant devices
Access: Restricted to remediation resources

Allowed Resources:
- Patch management server (WSUS, SCCM)
- Antivirus update server
- Remediation portal
- DNS (for updates)

Example:
Device: jsmith-laptop
Issue: Antivirus 30 days out of date
Action: Assign to VLAN 99 (quarantine)
Access: Antivirus update server only
Portal: "Update your antivirus to regain access"

Cisco ISE Authorization Policy:
IF Antivirus_OutOfDate
THEN VLAN = 99, ACL = Quarantine-ACL
```

**Remediation Portal:**
```
Self-Service:
1. Device redirected to portal
2. Portal shows compliance issues
3. Provide instructions/links
4. User remediates
5. Re-assess compliance
6. If compliant: Grant full access

Example Portal:
"Your device is not compliant:
 
 Issues:
 ☒ Antivirus definitions out of date (28 days old)
 ☐ OS patches missing
 
 To resolve:
 1. Click here to update antivirus
 2. Wait for scan to complete
 3. Click 'Re-check Compliance'
 
 [Re-check Compliance Button]"
```

**Automated Remediation:**
```
Agent-Based:
- Agent detects non-compliance
- Auto-trigger updates
- Example: Download AV definitions
- Re-assess after remediation

Push Remediation:
- NAC system pushes fix
- Windows: GPO, SCCM
- macOS: Jamf, MDM
- Linux: Ansible, Puppet
```

## Guest Access Management

### Guest Portal

**Self-Registration:**
```
Process:
1. Guest connects to guest SSID
2. Redirected to portal
3. Self-registers (email, SMS verification)
4. Accepts terms and conditions
5. Time-limited account created
6. Internet access granted

Portal Features:
- Multiple languages
- Branding (company logo)
- Terms acceptance (legal protection)
- Sponsor approval (optional)
- Device registration (MAC)
```

**Sponsor-Based:**
```
Workflow:
1. Guest arrives at lobby
2. Receptionist/sponsor creates account
3. Guest receives credentials (SMS, email, printed)
4. Guest connects with credentials
5. Access expires after set time

Benefits:
- More controlled
- Visitor tracking
- Sponsor accountability

Configuration:
Account Type: Guest
Duration: 8 hours
Access: Internet only (no corporate)
Sponsor: receptionist@company.com
```

**Social Login:**
```
Method: Authenticate via social media
Providers: Google, Facebook, LinkedIn

Process:
1. Guest selects "Login with Google"
2. Redirected to Google authentication
3. Guest authorizes app
4. Returned to portal
5. Access granted

Benefits:
- Easy for users (existing credentials)
- No registration needed
- Profile data collected (optional)

Privacy: Must comply with data protection laws
```

### Guest Network Isolation

**VLAN Segmentation:**
```
Guest VLAN: 60
Corporate VLAN: 10

Firewall Rules:
- Allow: Guest → Internet
- Deny: Guest → 10.0.0.0/8 (RFC 1918)
- Deny: Guest → 172.16.0.0/12
- Deny: Guest → 192.168.0.0/16
- Allow: Guest → DNS (10.1.1.11)

Additional:
- Client isolation (guest-to-guest blocked)
- Rate limiting (bandwidth)
- Captive portal
```

**Client Isolation:**
```
Purpose: Prevent guest devices from communicating

Implementation:
- Wireless: Private VLAN (PVLAN)
- Wired: Protected ports, PVLAN

Cisco Wireless:
config wlan client-isolation enable 5

Cisco Switch:
interface GigabitEthernet1/0/25
 switchport mode access
 switchport access vlan 60
 switchport protected  ! Client isolation
```

## NAC Products

### Cisco ISE (Identity Services Engine)

**Features:**
```
Authentication:
- 802.1X, MAB, WebAuth
- Multiple EAP methods
- Active Directory integration

Authorization:
- Dynamic VLAN assignment
- Downloadable ACLs (dACL)
- SGT (Security Group Tags)

Posture Assessment:
- AnyConnect posture module
- Agent or agentless
- Comprehensive compliance checks

Profiling:
- Automatic device classification
- 1,400+ device profiles
- Behavioral analysis

Guest Management:
- Self-registration
- Sponsor-based
- Social login
- SMS/Email delivery

TrustSec:
- Software-defined segmentation
- Security Group Tags (SGT)
- Policy-based access control
```

**Deployment:**
```
Components:
- PSN (Policy Service Node): Authentication
- MNT (Monitoring Node): Logging, reporting
- PAN (Policy Administration Node): Management

Sizing:
- Small: 1-5,000 endpoints → ISE-3315
- Medium: 5-50,000 endpoints → ISE-3355
- Large: 50-250,000 endpoints → ISE-3395
- Extra Large: 250-500,000 endpoints → ISE-3495

High Availability:
- Two PSN nodes minimum
- Two PAN nodes (primary/secondary)
- MNT node redundancy
```

### Other NAC Solutions

**ForeScout CounterACT:**
```
Approach: Agentless visibility and control
Strengths:
- No agent required
- Real-time device discovery
- OT/IoT device support
- Cloud and on-prem

Use: Heterogeneous environments, IoT-heavy
```

**Aruba ClearPass:**
```
Approach: Policy management platform
Strengths:
- Multi-vendor support
- Profiling and posture
- Guest access
- Cloud-managed option

Use: Aruba wireless deployments, multi-vendor
```

**PacketFence:**
```
Type: Open-source NAC
Features:
- 802.1X, WebAuth, SNMP trapping
- Captive portal
- Vulnerability assessment integration

Use: Budget-conscious, customization needed
```

## NAC Best Practices

### Deployment Strategy

**Phased Approach:**
```
Phase 1: Monitor Only
- Deploy infrastructure
- Collect device inventory
- Build policies (no enforcement)
- Duration: 2-4 weeks

Phase 2: Pilot
- Select small user group
- Enforce policies
- Refine policies based on feedback
- Duration: 2-4 weeks

Phase 3: Gradual Rollout
- Department by department
- Corporate users first
- Guest and BYOD later
- Duration: 3-6 months

Phase 4: Full Enforcement
- All locations
- All users
- Continuous improvement
```

**Policy Development:**
```
Start Permissive:
- Allow everything, log
- Identify normal behavior
- Build whitelist

Incremental Restriction:
- Block obvious threats first
- Refine based on data
- Don't break business processes

Test Thoroughly:
- Lab testing
- Pilot groups
- Fallback plan
```

### Troubleshooting

**Common Issues:**
```
1. Supplicant Configuration:
   - Wrong EAP method
   - Certificate issues
   - Credentials incorrect

2. Switch Configuration:
   - 802.1X not enabled globally
   - Interface not configured
   - RADIUS server unreachable

3. RADIUS Issues:
   - Shared secret mismatch
   - Firewall blocking (UDP 1812)
   - Attribute configuration wrong

4. Policy Issues:
   - Conflicting rules
   - Authorization profile incorrect
   - VLAN doesn't exist
```

**Debug Commands:**
```cisco
! Check authentication sessions
show authentication sessions

! Debug 802.1X (WARNING: verbose)
debug dot1x all

! Debug RADIUS
debug radius authentication
debug radius authorization

! Check AAA
show aaa servers
show aaa sessions
```

## Summary

In this lesson, we explored Network Access Control (NAC) and how it enforces security policies on devices before granting network access. The 802.1X framework has three components: the supplicant (client device), the authenticator (switch or AP that controls port access), and the authentication server (RADIUS). Ports start in an unauthorized state allowing only EAPoL traffic until credentials are validated. When devices lack 802.1X support (printers, IoT), MAC Authentication Bypass (MAB) authenticates based on MAC address — though this is less secure since MACs can be spoofed. Host modes include single-host, multi-host (first device authenticates, others piggyback), multi-auth (each device authenticated separately), and multi-domain (one data + one voice device). Posture assessment checks device compliance — antivirus status, OS patches, encryption — before granting access, quarantining non-compliant devices to a remediation VLAN with self-service portals for guided fixes.

## Practice Questions


**Q1.** What are the three components of 802.1X port-based authentication?

A) Firewall, IDS, and SIEM
B) Supplicant, authenticator, and authentication server
C) Router, switch, and access point
D) Client, proxy, and gateway

<details>
<summary>Answer</summary>

**B)** The three components of 802.1X are the supplicant (client device requesting access), the authenticator (switch or access point that enforces authentication), and the authentication server (RADIUS server that validates credentials). The other options describe different network components not specific to the 802.1X framework.
</details>


**Q2.** What is the purpose of posture assessment in a NAC solution?

A) To verify the physical location of a device
B) To check whether a device complies with security policies such as antivirus status, OS patches, and firewall configuration
C) To measure network bandwidth usage per device
D) To assign DNS settings to new devices

<details>
<summary>Answer</summary>

**B)** Posture assessment evaluates whether a connecting device meets the organization's security policy requirements, including antivirus definitions, OS patch level, encryption status, and firewall state. Devices that fail posture checks can be quarantined or given limited access until remediated. It does not check physical location, bandwidth, or DNS settings.
</details>


**Q3.** A network administrator needs to provide network access for IP-based security cameras that do not support 802.1X supplicant software. Which authentication method should be used?

A) EAP-TLS
B) WebAuth (captive portal)
C) MAC Authentication Bypass (MAB)
D) PEAP-MSCHAPv2

<details>
<summary>Answer</summary>

**C)** MAC Authentication Bypass (MAB) authenticates devices based on their MAC address and does not require supplicant software on the device, making it ideal for IoT devices, printers, and cameras. EAP-TLS and PEAP require a supplicant. WebAuth requires a browser, which security cameras do not have.
</details>


**Q4.** A company's NAC system detects that an employee's laptop is missing critical OS patches. The laptop is placed on a restricted VLAN with access only to update servers. What NAC function does this describe?

A) Authentication
B) Accounting
C) Quarantine and remediation
D) Load balancing

<details>
<summary>Answer</summary>

**C)** Quarantine and remediation is the NAC function that isolates non-compliant devices on a restricted VLAN and provides access to remediation resources (such as update servers) so the device can become compliant. Authentication verifies identity. Accounting tracks usage. Load balancing distributes traffic.
</details>


**Q5.** In an 802.1X deployment, a switch port is configured with `authentication host-mode multi-domain`. What does this host mode allow?

A) Unlimited devices on the port with no authentication
B) One data device and one voice device, each authenticated separately
C) Multiple devices where only the first device authenticates
D) Only a single device on the port at any time

<details>
<summary>Answer</summary>

**B)** Multi-domain host mode allows one device in the data domain and one device in the voice domain (typically an IP phone plus a PC), with each device authenticated separately. Single-host allows only one device. Multi-host authenticates the first device and allows others to piggyback. Multi-auth authenticates each device individually without domain restrictions.
</details>


## References

- CompTIA Network+ N10-009 Exam Objectives: Objective 4.3 — Given a scenario, apply network hardening techniques (NAC)
- IEEE 802.1X-2020: Port-Based Network Access Control
- NIST SP 800-53 Rev. 5: Security and Privacy Controls — AC (Access Control) Family
- IETF RFC 3748: Extensible Authentication Protocol (EAP)
- Stallings, W. (2021). *Network Security Essentials: Applications and Standards* (7th ed.). Pearson — Access Control
- Trusted Computing Group (TCG): Trusted Network Connect (TNC) Architecture
