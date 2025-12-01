---
id: firewalls-acls
title: Firewalls and ACLs
chapterId: ch4-network-security
order: 36
duration: 95
objectives:
  - Understand firewall types and architectures
  - Configure firewall rules and policies
  - Implement Access Control Lists (ACLs)
  - Deploy DMZ and network segmentation
  - Troubleshoot firewall issues
---

# Lesson 36: Firewalls and ACLs

## Introduction

Firewalls are security devices that monitor and control network traffic based on predetermined security rules. They form the first line of defense between trusted internal networks and untrusted external networks (Internet). Access Control Lists (ACLs) are the foundation of firewall functionality, defining what traffic is permitted or denied.

In this lesson, we'll explore firewall types, ACL configurations, stateful inspection, next-generation firewall features, and best practices for network security perimeter defense.

**Key Principle:** Default deny - block everything by default, explicitly allow only necessary traffic.

## Firewall Fundamentals

### What is a Firewall?

**Definition:**
```
Firewall: Security device that filters traffic based on rules
Purpose: Separate trusted and untrusted networks
Function: Inspect, allow, or block traffic

Analogy:
Network = Building
Firewall = Security guard at entrance
Rules = Who is allowed to enter/exit

Traffic Flow:
External Network → Firewall (inspect) → Internal Network
Internal Network → Firewall (inspect) → External Network
```

**Firewall Zones:**
```
Outside (External/Untrusted):
- Internet
- Lowest security level
- Assume hostile

Inside (Internal/Trusted):
- Corporate network
- Highest security level
- Protected resources

DMZ (Demilitarized Zone):
- Public-facing servers
- Medium security level
- Web servers, email servers, DNS

Typical Flow:
Internet (0) ← → Firewall ← → DMZ (50) ← → Firewall ← → LAN (100)
^                              ^                          ^
Untrusted                      Semi-trusted              Trusted
```

**Security Levels (Cisco ASA):**
```
Level 0-100:
- 0: Lowest security (outside/Internet)
- 50: Medium security (DMZ)
- 100: Highest security (inside/LAN)

Default Rules:
- Higher → Lower: Allow (outbound)
- Lower → Higher: Deny (inbound)
- Same level: Deny

Example:
Inside (100) → DMZ (50): Allowed by default
DMZ (50) → Inside (100): Denied (must explicitly allow)
Outside (0) → Inside (100): Denied
```

### Firewall Rules

**Rule Components:**
```
1. Source: Where traffic originates
   - IP address: 192.168.1.10
   - Network: 192.168.1.0/24
   - Any: 0.0.0.0/0

2. Destination: Where traffic is going
   - IP address: 10.1.1.100
   - Network: 10.1.0.0/16
   - Any: 0.0.0.0/0

3. Service/Port: What protocol/port
   - TCP 80 (HTTP)
   - UDP 53 (DNS)
   - ICMP (ping)
   - Any

4. Action: What to do with traffic
   - Allow/Permit
   - Deny/Block
   - Reject (deny + notify sender)

5. Direction: Traffic flow
   - Inbound (outside → inside)
   - Outbound (inside → outside)

6. Logging: Record the event
   - Enable/Disable
```

**Rule Processing:**
```
Order Matters:
1. Rules processed top to bottom
2. First match wins
3. No further rules processed after match
4. Implicit deny at end (if no match, deny)

Example:
Rule 1: Allow 192.168.1.10 to Any → Matches, allow
Rule 2: Deny 192.168.1.0/24 to Any → Not evaluated (rule 1 matched)
...
Implicit: Deny all → Applied if no rule matches
```

**Best Practices:**
```
1. Most specific rules first
   - Allow 192.168.1.10 (specific)
   - Then deny 192.168.1.0/24 (general)

2. Default deny (implicit deny all at end)

3. Document rules (description/comments)

4. Review regularly (remove unused rules)

5. Group similar rules (organization)

6. Log security-relevant events

7. Test before deploying
```

## Access Control Lists (ACLs)

### Router ACLs (Cisco)

**Standard ACLs:**
```
Purpose: Filter based on source IP only
Number Range: 1-99, 1300-1999
Use: Simple filtering, NAT, route filtering

Limitation: Cannot filter by destination or port

Configuration:
Router(config)# access-list 10 permit 192.168.1.0 0.0.0.255
Router(config)# access-list 10 deny any log
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip access-group 10 in

Explanation:
- Permit traffic from 192.168.1.0/24
- Deny all other traffic (log it)
- Apply inbound on GigabitEthernet0/0

Best Practice: Place standard ACLs close to destination
```

**Extended ACLs:**
```
Purpose: Filter based on source, destination, protocol, port
Number Range: 100-199, 2000-2699
Use: Complex filtering, firewall functionality

Configuration:
Router(config)# access-list 100 permit tcp any host 10.1.1.100 eq 80
Router(config)# access-list 100 permit tcp any host 10.1.1.100 eq 443
Router(config)# access-list 100 deny ip any any log
Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip access-group 100 in

Explanation:
- Allow HTTP (80) to web server 10.1.1.100
- Allow HTTPS (443) to web server 10.1.1.100
- Deny everything else (log)
- Apply inbound on GigabitEthernet0/1

Best Practice: Place extended ACLs close to source
```

**Named ACLs (Recommended):**
```
Advantages:
- Descriptive names (easier to manage)
- Can insert/delete specific entries
- Can add comments

Configuration:
Router(config)# ip access-list extended WEB-SERVER-ACL
Router(config-ext-nacl)# remark Allow HTTP and HTTPS to web server
Router(config-ext-nacl)# permit tcp any host 10.1.1.100 eq 80
Router(config-ext-nacl)# permit tcp any host 10.1.1.100 eq 443
Router(config-ext-nacl)# remark Block everything else
Router(config-ext-nacl)# deny ip any any log
Router(config-ext-nacl)# exit
Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip access-group WEB-SERVER-ACL in

Editing:
Router(config)# ip access-list extended WEB-SERVER-ACL
Router(config-ext-nacl)# no 10  (remove entry 10)
Router(config-ext-nacl)# 15 permit tcp any host 10.1.1.100 eq 8080
```

**Wildcard Masks:**
```
Wildcard: Inverse of subnet mask
- 0 = Must match
- 1 = Don't care

Examples:
Host: 192.168.1.10 0.0.0.0
  Matches: 192.168.1.10 only

Network: 192.168.1.0 0.0.0.255
  Matches: 192.168.1.0 - 192.168.1.255

Range: 192.168.1.64 0.0.0.31
  Matches: 192.168.1.64 - 192.168.1.95 (32 addresses)

Any: 0.0.0.0 255.255.255.255
  Matches: All addresses (shortcut: "any")

Converting Subnet Mask to Wildcard:
Subnet mask: 255.255.255.0
Wildcard:    0.0.0.255
Formula: 255.255.255.255 - subnet mask = wildcard
```

### ACL Examples

**Block Specific Host:**
```cisco
! Block 192.168.1.50 from accessing anything
access-list 100 deny ip host 192.168.1.50 any log
access-list 100 permit ip any any
interface GigabitEthernet0/0
 ip access-group 100 in
```

**Allow Only Specific Services:**
```cisco
! Allow only DNS, HTTP, HTTPS to Internet
ip access-list extended INTERNET-ACCESS
 permit udp any any eq 53                 ! DNS
 permit tcp any any eq 80                 ! HTTP
 permit tcp any any eq 443                ! HTTPS
 permit icmp any any echo-reply           ! Ping responses
 deny ip any any log                      ! Block everything else
 
interface GigabitEthernet0/1
 description To Internet
 ip access-group INTERNET-ACCESS out
```

**Protect Management Access:**
```cisco
! Allow SSH only from management network
ip access-list extended VTY-ACCESS
 permit tcp 10.1.1.0 0.0.0.255 any eq 22
 deny tcp any any eq 22 log
 permit ip any any

line vty 0 4
 access-class VTY-ACCESS in
 transport input ssh
```

**Prevent Spoofing:**
```cisco
! Block packets with source IPs that shouldn't come from Internet
ip access-list extended ANTI-SPOOF-IN
 deny ip 10.0.0.0 0.255.255.255 any log     ! RFC 1918
 deny ip 172.16.0.0 0.15.255.255 any log    ! RFC 1918
 deny ip 192.168.0.0 0.0.255.255 any log    ! RFC 1918
 deny ip 127.0.0.0 0.255.255.255 any log    ! Loopback
 deny ip 224.0.0.0 15.255.255.255 any log   ! Multicast
 deny ip host 0.0.0.0 any log               ! Invalid source
 deny ip host 255.255.255.255 any log       ! Broadcast
 permit ip any any

interface GigabitEthernet0/0
 description To Internet
 ip access-group ANTI-SPOOF-IN in
```

**Rate Limiting (QoS ACL):**
```cisco
! Rate limit ICMP to prevent flood
ip access-list extended RATE-LIMIT-ICMP
 permit icmp any any

class-map match-all ICMP-CLASS
 match access-group name RATE-LIMIT-ICMP

policy-map RATE-LIMIT-POLICY
 class ICMP-CLASS
  police 8000 1000 1000 conform-action transmit exceed-action drop

interface GigabitEthernet0/0
 service-policy input RATE-LIMIT-POLICY
```

## Firewall Types

### Packet Filtering Firewall

**How It Works:**
```
Function: Inspects packet headers only
Checks: Source IP, destination IP, protocol, ports
Decision: Allow or deny based on ACL rules

Advantages:
- Fast (minimal processing)
- Low resource usage
- Simple configuration

Disadvantages:
- No state tracking
- No application awareness
- Vulnerable to certain attacks (spoofing, fragmentation)
- Cannot handle dynamic protocols (FTP passive mode)

Example: Router with ACLs
```

**Stateless vs Stateful:**
```
Stateless (Packet Filtering):
Rule needed for each direction:
- Outbound: Permit 192.168.1.0/24 to any TCP 80
- Inbound: Permit any to 192.168.1.0/24 TCP source-port 80

Problem: Inbound rule too permissive (allows unsolicited connections)

Stateful (State Tracking):
Rule needed for outbound only:
- Outbound: Permit 192.168.1.0/24 to any TCP 80

Firewall automatically allows return traffic (tracks state)
```

### Stateful Firewall

**How It Works:**
```
Function: Tracks connection state
Maintains: Connection table (state table)
Decision: Allow based on rules + connection state

Connection States:
- NEW: First packet of new connection
- ESTABLISHED: Part of existing connection
- RELATED: Related to existing connection (FTP data channel)
- INVALID: Malformed or suspicious

Advantages:
- Automatic return traffic handling
- Protects against spoofed packets
- Handles dynamic protocols (FTP, SIP)
- More secure than stateless

State Table Example:
Source IP       Dest IP         Sport  Dport  Protocol  State       Timeout
192.168.1.10    93.184.216.34   50123  443    TCP       ESTABLISHED 3600
192.168.1.15    8.8.8.8         54321  53     UDP       ESTABLISHED 30
```

**Stateful Inspection:**
```
Process:
1. Outbound packet: Check rules, create state entry
2. Inbound packet: Check state table first
   - If in state table: Allow (bypass rules)
   - If not in state table: Check rules
3. State entry removed when connection closes or times out

Example (Cisco ASA):
access-list OUTSIDE-IN permit tcp any host 203.0.113.10 eq 443
access-group OUTSIDE-IN in interface outside

! Return traffic automatically allowed (stateful)
! No need for return traffic rule
```

### Application Firewall (Proxy)

**How It Works:**
```
Function: Terminates connections, inspects application data
Acts as: Intermediary (proxy) between client and server

Process:
1. Client connects to firewall
2. Firewall validates request
3. Firewall opens new connection to server (on behalf of client)
4. Firewall relays application data

Advantages:
- Deep inspection (application layer)
- Can inspect/modify content
- Hides internal network structure
- Strong authentication

Disadvantages:
- Slower (terminates connections)
- Higher resource usage
- Protocol-specific (separate proxy per protocol)

Types:
- Web proxy (HTTP/HTTPS)
- Email proxy (SMTP)
- FTP proxy
```

**Web Application Firewall (WAF):**
```
Purpose: Protect web applications from attacks
Layer: Application layer (Layer 7)

Protections:
- SQL injection
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- File inclusion
- Buffer overflow
- Session hijacking

How It Works:
1. Inspect HTTP/HTTPS traffic
2. Analyze request parameters, headers, cookies
3. Compare against attack signatures
4. Block malicious requests
5. Allow legitimate traffic

Example Rules:
- Block SQL keywords in URL parameters ('; DROP TABLE--)
- Validate input length/format
- Enforce authentication on admin pages
- Rate limit requests per IP

Products: ModSecurity, AWS WAF, Cloudflare WAF, F5 ASM
```

### Next-Generation Firewall (NGFW)

**Definition:**
```
NGFW: Combines traditional firewall + advanced features
Components:
- Packet filtering
- Stateful inspection
- Deep packet inspection (DPI)
- Application awareness
- Intrusion prevention (IPS)
- User/identity awareness
- SSL/TLS inspection
- Threat intelligence

Difference from Traditional:
Traditional: Block based on IP, port, protocol
NGFW: Block based on application, user, content, threats
```

**Application Awareness:**
```
Traditional Firewall:
Rule: Allow TCP port 80
Result: Allows all HTTP traffic

Problem: Cannot distinguish between:
- Web browsing (legitimate)
- P2P over HTTP (policy violation)
- Malware C2 over HTTP (threat)

NGFW:
Rule: Allow application "web-browsing" for group "employees"
Result: Allows legitimate HTTP browsing, blocks P2P, malware

How: Deep packet inspection identifies application regardless of port
Example: Palo Alto App-ID, Cisco Firepower, Fortinet
```

**User/Identity Awareness:**
```
Traditional Firewall:
Rule: Allow 192.168.1.10 to any HTTPS
Problem: Who is 192.168.1.10? Changes with DHCP

NGFW:
Rule: Allow user "jsmith" to any HTTPS
Benefit: Policy follows user (not IP)

Integration:
- Active Directory
- RADIUS/TACACS+
- LDAP
- Single Sign-On (SSO)

Example (Palo Alto):
security-rule "Internet-Access"
  source user "domain\employees"
  destination zone "untrust"
  application ["web-browsing", "ssl"]
  action allow
```

**Intrusion Prevention System (IPS):**
```
Function: Detect and block attacks in real-time
Method: Signature-based and anomaly-based detection

Capabilities:
- Exploit detection (buffer overflow, RCE)
- Malware detection
- Vulnerability protection
- Protocol anomaly detection

Actions:
- Alert only (IDS mode)
- Block packet
- Block connection
- Block source IP

Signatures:
Signature 12345: MS17-010 (EternalBlue)
  Protocol: SMB
  Pattern: 0x00000000 ... [exploit shellcode]
  Action: Drop and alert
  Severity: Critical
```

**SSL/TLS Inspection:**
```
Problem: 80%+ of traffic is encrypted (HTTPS)
Challenge: Cannot inspect encrypted traffic for threats

Solution: SSL Inspection (Decrypt → Inspect → Re-encrypt)

Process:
1. Client initiates HTTPS to server
2. Firewall intercepts connection
3. Firewall presents certificate to client (signed by internal CA)
4. Client encrypts with firewall's certificate
5. Firewall decrypts, inspects content
6. Firewall re-encrypts to server
7. Server receives encrypted traffic

Requirements:
- Install firewall's CA certificate on clients (GPO)
- Sufficient processing power (CPU/hardware acceleration)
- Privacy/legal considerations

Exceptions:
- Banking sites (pin certificate, bypass inspection)
- Healthcare (HIPAA compliance)
- Government sites
- User privacy (employee rights)

Configuration (Palo Alto):
ssl-decryption-rule "Decrypt-Outbound"
  source zone "trust"
  destination zone "untrust"
  category ["business-use", "general-surfing"]
  action decrypt
  
ssl-decryption-rule "No-Decrypt-Financial"
  destination zone "untrust"
  category ["financial-services"]
  action no-decrypt
```

**Threat Intelligence:**
```
Definition: Real-time updates on known threats
Sources:
- Vendor threat feeds (Cisco Talos, Palo Alto WildFire)
- Open-source (Spamhaus, EmergingThreats)
- Government (US-CERT, CISA)
- Commercial (Recorded Future, ThreatConnect)

Use Cases:
- Block malicious IPs (botnets, C2 servers)
- Block malicious domains
- Identify malware signatures
- Detect zero-day exploits

Auto-Update:
- Signatures updated hourly/daily
- Critical threats pushed immediately
- Machine learning for unknown threats

Example:
Threat Feed: Known botnet C2 IP: 203.0.113.45
Action: Block all traffic to 203.0.113.45
Alert: "Host 192.168.1.55 attempted connection to botnet C2"
```

## Firewall Architectures

### Screened Subnet (DMZ)

**Design:**
```
Internet → Firewall → DMZ → Firewall → Internal LAN
           (FW1)           (FW2)

DMZ Contains:
- Web servers
- Email servers (SMTP relay)
- DNS servers (public)
- VPN concentrators

Security:
- Internet can access DMZ services only
- DMZ cannot initiate connections to LAN
- LAN can access DMZ and Internet
- Double firewall provides defense in depth
```

**Three-Interface Firewall:**
```
           Internet (Security 0)
                 |
           +-----+-----+
           |  Firewall  |
           +-----+-----+
          /             \
    DMZ (50)          LAN (100)
    
Rules:
1. Internet → DMZ: Allow specific services (80, 443)
2. Internet → LAN: Deny all
3. LAN → DMZ: Allow (management)
4. LAN → Internet: Allow (outbound)
5. DMZ → LAN: Deny (prevent compromise spread)
6. DMZ → Internet: Allow specific (updates only)
```

**Example Configuration (Cisco ASA):**
```cisco
! Define interfaces and security levels
interface GigabitEthernet0/0
 nameif outside
 security-level 0
 ip address 203.0.113.5 255.255.255.0

interface GigabitEthernet0/1
 nameif dmz
 security-level 50
 ip address 10.10.10.1 255.255.255.0

interface GigabitEthernet0/2
 nameif inside
 security-level 100
 ip address 10.1.1.1 255.255.255.0

! Object groups for easier management
object network WEB-SERVER
 host 10.10.10.100
object service HTTP
 service tcp destination eq 80
object service HTTPS
 service tcp destination eq 443

! NAT for web server
object network WEB-SERVER
 nat (dmz,outside) static 203.0.113.10

! Access rules
access-list OUTSIDE-IN permit tcp any object WEB-SERVER eq 80
access-list OUTSIDE-IN permit tcp any object WEB-SERVER eq 443
access-list OUTSIDE-IN deny ip any any log
access-group OUTSIDE-IN in interface outside

! DMZ to inside: Deny
access-list DMZ-IN deny ip any any log
access-group DMZ-IN in interface dmz
```

### High Availability

**Active/Standby:**
```
Design:
Primary Firewall (Active) ←→ Secondary Firewall (Standby)
         |                            |
    (Failover Link)              (Failover Link)
         |                            |
    Internal Network

Function:
- Primary handles all traffic
- Secondary monitors primary (heartbeat)
- If primary fails, secondary takes over
- Stateful failover (maintains connections)

Configuration (Cisco ASA):
Primary:
failover
failover lan unit primary
failover lan interface FAILOVER GigabitEthernet0/3
failover link FAILOVER GigabitEthernet0/3
failover interface ip FAILOVER 10.255.255.1 255.255.255.252 standby 10.255.255.2

Secondary:
failover
failover lan unit secondary
failover lan interface FAILOVER GigabitEthernet0/3
failover link FAILOVER GigabitEthernet0/3
failover interface ip FAILOVER 10.255.255.1 255.255.255.252 standby 10.255.255.2

Failover Time: 1-3 seconds
Connection Preservation: Yes (stateful)
```

**Active/Active:**
```
Design:
Firewall 1 ←→ Firewall 2
    |              |
Load Balancer
    |
Internal Network

Function:
- Both firewalls handle traffic
- Load balancer distributes traffic
- Higher throughput
- If one fails, other handles all traffic

Load Balancing Methods:
- Round robin
- Least connections
- Source IP hash

Benefit: Better resource utilization
Complexity: Higher (more difficult to troubleshoot)
```

## Firewall Best Practices

### Rule Management

**Rule Hygiene:**
```
1. Default Deny:
   - Last rule: Deny all (implicit or explicit)
   - Only allow necessary traffic

2. Least Privilege:
   - Allow only minimum required access
   - Specific source, destination, port

3. Documentation:
   - Comment every rule
   - Include: Purpose, ticket number, owner, date

4. Regular Review:
   - Quarterly review of all rules
   - Remove unused rules
   - Update for business changes

5. Change Management:
   - All changes approved
   - Test in lab first
   - Document changes
   - Rollback plan

Example:
! Bad: Too permissive
permit ip any any

! Good: Specific
! Ticket: INC-12345 | Owner: J.Smith | Date: 2025-11-20
! Allow HTTP/HTTPS from LAN to Internet for web browsing
permit tcp 192.168.1.0 0.0.0.255 any eq 80
permit tcp 192.168.1.0 0.0.0.255 any eq 443
```

**Rule Optimization:**
```
1. Order by Frequency:
   - Most-hit rules at top
   - Reduces processing time

2. Combine Similar Rules:
   - Use object groups
   - Single rule with multiple objects

3. Remove Shadowed Rules:
   - Rules never matched due to earlier rules

Example Shadowed Rule:
Rule 10: permit ip 192.168.1.0 0.0.0.255 any
Rule 20: permit tcp host 192.168.1.10 any eq 80  ← Never matched!

Fix: Move specific rules before general rules
```

### Monitoring and Logging

**Log What Matters:**
```
Critical Events:
- Denied traffic (potential attacks)
- Configuration changes
- Failover events
- High connection rates (DoS)
- Authentication failures

Don't Log:
- Permitted routine traffic (too much noise)
- Known false positives

Log Format:
%ASA-4-106023: Deny tcp src outside:203.0.113.45/4444 dst inside:10.1.1.100/445
^    ^  ^                                                                     ^
|    |  Message ID                                                           Port
|    Severity (0=Emergency, 7=Debug)
Device type
```

**Syslog Configuration:**
```cisco
! Send logs to syslog server
logging enable
logging timestamp
logging buffer-size 100000
logging host inside 10.1.1.200
logging trap informational
logging facility 20

! Log denied traffic
access-list OUTSIDE-IN deny ip any any log

! Log specific events
logging message 106023 level alerts
```

**SIEM Integration:**
```
Benefits:
- Correlation with other logs
- Long-term storage
- Advanced analytics
- Dashboards and reporting

Example Alerts:
- Multiple denied connections to same internal IP (scan)
- Denied outbound connections (malware C2)
- Geographic anomaly (user in US, connection from China)
- Spike in traffic (DoS)
```

## Review Questions

1. **What is the difference between stateful and stateless firewalls?**
   - Stateless inspects packets individually, stateful tracks connection state and automatically allows return traffic

2. **What is the default action if no firewall rule matches?**
   - Deny (implicit deny all)

3. **What is a DMZ and why is it used?**
   - Demilitarized Zone - network segment for public-facing servers, provides security buffer between Internet and internal network

4. **What is the difference between standard and extended ACLs?**
   - Standard filters source IP only (1-99), extended filters source, destination, protocol, port (100-199)

5. **What additional features do NGFWs provide over traditional firewalls?**
   - Application awareness, user identity, IPS, SSL inspection, threat intelligence

6. **Why is SSL/TLS inspection controversial?**
   - Privacy concerns (decrypting user traffic), legal implications, must handle banking/healthcare differently

7. **What is a WAF and what does it protect against?**
   - Web Application Firewall protects against application-layer attacks (SQL injection, XSS, CSRF)

8. **Where should standard ACLs be placed?**
   - Close to destination (filter only by source IP)

9. **Where should extended ACLs be placed?**
   - Close to source (filter by multiple criteria, block traffic early)

10. **What is the benefit of stateful failover?**
    - Maintains existing connections during failover (seamless for users)

## Key Takeaways

- **Firewalls** are essential perimeter security devices (defense in depth)
- **Default deny** is fundamental principle (allow only necessary traffic)
- **Stateful inspection** is modern standard (tracks connection state)
- **NGFWs** provide application and user awareness (Layer 7 visibility)
- **ACLs** are the foundation of firewall rules (source, destination, service, action)
- **DMZ** provides security buffer for public-facing servers
- **High availability** ensures continuous protection (active/standby, active/active)
- **SSL inspection** enables visibility into encrypted traffic (privacy trade-offs)
- **Regular rule review** maintains security and performance
- **Logging and monitoring** essential for threat detection and incident response

## Next Steps

In the next lesson, we'll explore **IDS/IPS and Network Security Monitoring**, including intrusion detection systems, security monitoring tools, and threat hunting.

---

**Lesson Complete!** You now understand firewalls and ACLs that control network access and enforce security policies.
