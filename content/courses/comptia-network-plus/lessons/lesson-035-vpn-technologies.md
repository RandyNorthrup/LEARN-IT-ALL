---
id: vpn-technologies
title: VPNs and Remote Access
chapterId: ch4-network-security
order: 35
duration: 90
objectives:
  - Understand VPN types and protocols
  - Configure site-to-site and remote access VPNs
  - Implement IPsec, SSL/TLS VPNs
  - Secure remote access connections
  - Troubleshoot VPN connectivity
---

# Lesson 35: VPNs and Remote Access

## Introduction

Virtual Private Networks (VPNs) extend private networks over public infrastructure, creating encrypted tunnels that protect data in transit. VPNs enable remote workers to securely access corporate resources, connect branch offices, and protect communications over untrusted networks.

In this lesson, we'll explore VPN technologies including IPsec, SSL/TLS VPNs, remote access methods, and best practices for securing remote connectivity.

**Key Principle:** VPNs provide confidentiality, integrity, and authentication for data traversing untrusted networks.

## VPN Fundamentals

### What is a VPN?

**Definition:**
```
VPN: Virtual Private Network
- Creates encrypted tunnel through public network (Internet)
- Makes public network behave like private network
- Protects data from eavesdropping and tampering

Analogy:
Public Internet = Public highway (anyone can see your traffic)
VPN Tunnel = Armored car on highway (encrypted, protected)
```

**VPN Benefits:**
```
1. Confidentiality: Encryption protects data from eavesdropping
2. Integrity: Detects tampering
3. Authentication: Verifies identity of endpoints
4. Cost Savings: Use Internet instead of expensive leased lines
5. Flexibility: Remote access from anywhere
6. Scalability: Easy to add new sites/users
```

**VPN Use Cases:**
```
1. Remote Access VPN (Client-to-Site):
   - Employees work from home
   - Mobile workforce
   - Access corporate resources securely

2. Site-to-Site VPN:
   - Connect branch offices to headquarters
   - Replace expensive MPLS/leased lines
   - Always-on connectivity

3. Extranet VPN:
   - Partner/vendor access to specific resources
   - Controlled access to select systems
   - B2B communications

4. Mobile VPN:
   - Maintains VPN connection as device roams
   - Cellular networks, WiFi hotspots
   - Seamless connectivity
```

### VPN Types Overview

**Remote Access VPN:**
```
Topology: Client → VPN Gateway → Corporate Network

Use Case: Individual users connecting remotely
Example: Employee at home connects to office network

Components:
- VPN Client: Software on user device (Cisco AnyConnect, OpenVPN)
- VPN Concentrator: Server accepting connections (ASA, router)
- Authentication Server: RADIUS/AD validating users

Connection Flow:
1. User launches VPN client
2. Authenticates (username/password/MFA)
3. Encrypted tunnel established
4. User assigned IP from corporate subnet
5. Access to internal resources
```

**Site-to-Site VPN:**
```
Topology: Router/Firewall ↔ Internet ↔ Router/Firewall

Use Case: Connecting entire networks
Example: Branch office to headquarters

Components:
- VPN Gateway: Router or firewall at each site
- Pre-shared key or certificates for authentication
- Always-on tunnel

Connection Flow:
1. Traffic destined for remote network triggers VPN
2. Gateways authenticate (PSK or certificates)
3. Encrypted tunnel established
4. All traffic between sites encrypted
5. Transparent to end users (no client needed)
```

## IPsec VPN

### IPsec Overview

**IPsec (Internet Protocol Security):**
```
Purpose: Suite of protocols for securing IP communications
Layer: Network layer (Layer 3)
Components:
- AH (Authentication Header): Integrity and authentication
- ESP (Encapsulating Security Payload): Encryption + integrity + auth
- IKE (Internet Key Exchange): Key management

Use: Site-to-site VPNs, remote access (with L2TP)
```

**IPsec Modes:**

**Transport Mode:**
```
Purpose: Encrypt payload only (not IP header)
Use: End-to-end encryption between hosts

Packet Structure:
[Original IP Header] [IPsec Header] [Encrypted Payload]

Use Cases:
- Host-to-host communication
- L2TP/IPsec (Layer 2 Tunneling Protocol)

Advantage: Lower overhead (original IP header intact)
Disadvantage: IP header visible (source/destination exposed)
```

**Tunnel Mode:**
```
Purpose: Encrypt entire original packet
Use: Gateway-to-gateway (site-to-site VPN)

Packet Structure:
[New IP Header] [IPsec Header] [Encrypted Original IP + Payload]

Use Cases:
- Site-to-site VPN
- Remote access VPN (gateway terminates tunnel)

Advantage: Original IP hidden (only gateway IPs visible)
Disadvantage: Higher overhead (double IP headers)
```

### IPsec Protocols

**ESP (Encapsulating Security Payload):**
```
Provides:
- Confidentiality (encryption)
- Integrity (hashing)
- Authentication (HMAC)
- Anti-replay (sequence numbers)

Protocol Number: 50

Recommendation: Use ESP (not AH)
Reason: Provides all security services including encryption
```

**AH (Authentication Header):**
```
Provides:
- Integrity (hashing)
- Authentication (HMAC)
- Anti-replay (sequence numbers)

Does NOT provide:
- Confidentiality (no encryption)

Protocol Number: 51

Issue: Incompatible with NAT (authenticates IP header)
Status: Rarely used (ESP preferred)
```

### IKE (Internet Key Exchange)

**Purpose:**
```
IKE: Negotiate and establish IPsec security associations (SAs)
Function: Key exchange, authentication, parameter negotiation

IKE Versions:
- IKEv1: Original, complex, two phases
- IKEv2: Modern, simplified, faster, better

Recommendation: Use IKEv2
```

**IKEv1 Phases:**

**Phase 1 (ISAKMP SA):**
```
Purpose: Establish secure management channel
Result: Bidirectional ISAKMP SA

Negotiated Parameters:
- Authentication method (PSK, RSA signatures, certificates)
- Encryption (AES, 3DES)
- Hash (SHA-256, SHA-1)
- DH group (14, 16, 19, 20)
- Lifetime (default 24 hours)

Modes:
- Main Mode: 6 messages, more secure
- Aggressive Mode: 3 messages, faster, less secure

Example (Cisco):
crypto isakmp policy 10
 encryption aes 256
 hash sha256
 authentication pre-share
 group 14
 lifetime 86400
```

**Phase 2 (IPsec SA):**
```
Purpose: Establish data protection channel
Result: Unidirectional IPsec SAs (one per direction)

Negotiated Parameters:
- Protocol (ESP or AH)
- Encryption (AES)
- Hash (SHA-256)
- PFS group (optional Perfect Forward Secrecy)
- Lifetime (default 3600 seconds)

Mode: Quick Mode

Example (Cisco):
crypto ipsec transform-set VPN-TRANSFORM esp-aes 256 esp-sha256-hmac
 mode tunnel
```

**IKEv2:**
```
Improvements over IKEv1:
- Fewer messages (4 vs 6-9)
- Built-in NAT-T
- Better reliability (keepalives, dead peer detection)
- Mobility (MOBIKE - maintains VPN during IP change)
- Simpler configuration

Message Exchange:
1-2: IKE_SA_INIT (DH exchange, establish encryption)
3-4: IKE_AUTH (authenticate, establish IPsec SAs)

Result: Both IKE SA and IPsec SAs established in 4 messages

Example (Cisco IKEv2):
crypto ikev2 proposal VPN-PROP
 encryption aes-gcm-256
 integrity sha384
 group 16

crypto ikev2 policy VPN-POLICY
 proposal VPN-PROP

crypto ikev2 keyring VPN-KEYRING
 peer REMOTE-SITE
  address 203.0.113.10
  pre-shared-key MySecureKey123!
```

### IPsec Configuration Example

**Site-to-Site VPN (Cisco):**
```cisco
! ===============================================
! SITE A (10.1.0.0/16) - Public IP: 198.51.100.5
! ===============================================

! Phase 1: ISAKMP/IKE Policy
crypto isakmp policy 10
 encryption aes 256
 hash sha256
 authentication pre-share
 group 14
 lifetime 86400

! Pre-shared key for peer
crypto isakmp key MySecureKey123! address 203.0.113.10

! Phase 2: Transform Set
crypto ipsec transform-set VPN-TRANSFORM esp-aes 256 esp-sha256-hmac
 mode tunnel

! Define interesting traffic (traffic to encrypt)
access-list 100 permit ip 10.1.0.0 0.0.255.255 10.2.0.0 0.0.255.255

! Crypto Map (tie everything together)
crypto map VPN-MAP 10 ipsec-isakmp
 set peer 203.0.113.10
 set transform-set VPN-TRANSFORM
 match address 100

! Apply to outbound interface
interface GigabitEthernet0/0
 description WAN Interface
 ip address 198.51.100.5 255.255.255.0
 crypto map VPN-MAP

! ===============================================
! SITE B (10.2.0.0/16) - Public IP: 203.0.113.10
! ===============================================

crypto isakmp policy 10
 encryption aes 256
 hash sha256
 authentication pre-share
 group 14
 lifetime 86400

crypto isakmp key MySecureKey123! address 198.51.100.5

crypto ipsec transform-set VPN-TRANSFORM esp-aes 256 esp-sha256-hmac
 mode tunnel

! Note: Reversed source/destination
access-list 100 permit ip 10.2.0.0 0.0.255.255 10.1.0.0 0.0.255.255

crypto map VPN-MAP 10 ipsec-isakmp
 set peer 198.51.100.5
 set transform-set VPN-TRANSFORM
 match address 100

interface GigabitEthernet0/0
 description WAN Interface
 ip address 203.0.113.10 255.255.255.0
 crypto map VPN-MAP
```

**Verification Commands:**
```cisco
! Check Phase 1 (ISAKMP SA)
show crypto isakmp sa
# Should show: QM_IDLE (Phase 1 complete, waiting for traffic)

! Check Phase 2 (IPsec SA)
show crypto ipsec sa
# Shows encryption/decryption counters

! Troubleshooting
show crypto isakmp sa detail
show crypto ipsec sa detail
debug crypto isakmp
debug crypto ipsec
```

### IPsec Parameters

**Encryption Algorithms:**
```
DES: 56-bit (BROKEN - do not use)
3DES: 168-bit (legacy, slow)
AES-128: 128-bit (good)
AES-192: 192-bit (better)
AES-256: 256-bit (best)
AES-GCM: Authenticated encryption (modern, recommended)

Recommendation: AES-256 or AES-GCM-256
```

**Hashing Algorithms:**
```
MD5: BROKEN - do not use
SHA-1: Deprecated - avoid
SHA-256: Good (minimum)
SHA-384: Better
SHA-512: Best

Recommendation: SHA-256 minimum, SHA-384 for high security
```

**DH (Diffie-Hellman) Groups:**
```
Group 1: 768-bit (BROKEN)
Group 2: 1024-bit (WEAK)
Group 5: 1536-bit (legacy)
Group 14: 2048-bit (minimum acceptable)
Group 15: 3072-bit (good)
Group 16: 4096-bit (better)
Group 19: 256-bit ECC (good, faster)
Group 20: 384-bit ECC (better, faster)
Group 21: 521-bit ECC (best, faster)

Recommendation:
- Group 14 minimum
- Group 19/20 (ECC) for modern deployments
- Higher groups for high-security environments
```

**Perfect Forward Secrecy (PFS):**
```
Definition: New DH exchange for each IPsec SA
Benefit: Compromise of one session key doesn't compromise others

Without PFS:
- Long-term key compromise = all sessions compromised

With PFS:
- Each session has unique ephemeral key
- Compromise of long-term key doesn't affect past sessions

Configuration:
crypto map VPN-MAP 10 ipsec-isakmp
 set pfs group14
 
Recommendation: Always enable PFS
```

### NAT Traversal (NAT-T)

**Problem:**
```
IPsec AH/ESP packets don't contain port numbers
NAT requires port numbers to track sessions
Result: IPsec breaks through NAT

ESP Packet:
[IP Header] [ESP Header] [Encrypted Payload]
             ^
             No port numbers for NAT to use
```

**Solution: NAT-T:**
```
NAT Traversal (NAT-T):
- Encapsulates IPsec packets in UDP port 4500
- NAT can track sessions using UDP port
- Both endpoints must support NAT-T
- Auto-detection: If NAT detected, NAT-T enabled

Packet Structure with NAT-T:
[IP Header] [UDP 4500] [ESP Header] [Encrypted Payload]

Cisco Configuration:
crypto isakmp nat-traversal 20  (keepalive interval in seconds)

IKEv2: Built-in NAT-T support (no extra config needed)
```

## SSL/TLS VPN

### SSL VPN Overview

**SSL VPN (SSL/TLS VPN):**
```
Purpose: VPN using SSL/TLS protocol (HTTPS)
Layer: Application layer (Layer 7)
Protocol: TLS 1.2 or TLS 1.3
Port: TCP 443 (HTTPS)

Advantages:
- No client software required (clientless - web browser)
- Works through firewalls (port 443 typically open)
- Easy for users (just open browser)
- Per-application access control

Disadvantages:
- Limited protocol support (clientless mode)
- Slightly higher overhead than IPsec
- Full tunnel requires client software

Use Cases:
- Remote access VPN
- Quick access for contractors/partners
- BYOD (Bring Your Own Device)
- Locations blocking VPN protocols
```

### SSL VPN Modes

**Clientless Mode (Portal):**
```
Description: Access via web browser only
No software installation required

Supported Applications:
- Web applications (HTTP/HTTPS)
- File shares (via web interface)
- SSH/RDP (via HTML5 portal)
- Email (OWA, webmail)

Limitations:
- Cannot access applications requiring thick client
- Limited to web-based protocols
- No full network access

User Experience:
1. User navigates to https://vpn.company.com
2. Authenticates (username/password/MFA)
3. Web portal displays available resources
4. Click resource to access via browser

Example: Cisco ASA WebVPN Portal
```

**Thin Client Mode (Port Forwarding):**
```
Description: Java/ActiveX applet downloaded to browser
Forwards specific TCP ports through VPN

Supported Applications:
- Email clients (Outlook - IMAP/SMTP)
- SSH clients
- RDP clients
- Custom TCP applications

Configuration:
- Specify application and port to forward
- Applet runs in browser (limited installation)

Example:
- Forward port 3389 (RDP) to internal server
- User launches local RDP client to localhost:3389
- Portal forwards to internal server
```

**Full Tunnel Mode (VPN Client):**
```
Description: Full VPN client software installed
All traffic or specified traffic routed through VPN

Supported Applications:
- All protocols (TCP, UDP, ICMP)
- Full network access like IPsec VPN
- Thick client applications

Client Software:
- Cisco AnyConnect
- Pulse Secure
- GlobalProtect (Palo Alto)
- OpenVPN

Split Tunneling:
- Enabled: Only corporate traffic through VPN, Internet direct
- Disabled: All traffic through VPN (more secure)
```

### SSL VPN Configuration

**Cisco ASA AnyConnect Example:**
```cisco
! Enable WebVPN on outside interface
webvpn
 enable outside
 anyconnect image disk0:/anyconnect-win-4.10.xxxxx-webdeploy-k9.pkg
 anyconnect enable
 tunnel-group-list enable

! Create address pool for VPN clients
ip local pool VPN-POOL 10.10.10.100-10.10.10.200 mask 255.255.255.0

! Group policy (defines user permissions)
group-policy VPN-POLICY internal
group-policy VPN-POLICY attributes
 dns-server value 10.1.1.10 10.1.1.11
 vpn-tunnel-protocol ssl-client
 split-tunnel-policy tunnelspecified
 split-tunnel-network-list value SPLIT-TUNNEL-ACL
 default-domain value company.com

! Split tunnel ACL (only these networks through VPN)
access-list SPLIT-TUNNEL-ACL standard permit 10.1.0.0 255.255.0.0
access-list SPLIT-TUNNEL-ACL standard permit 10.2.0.0 255.255.0.0

! Tunnel group (connection profile)
tunnel-group VPN-USERS type remote-access
tunnel-group VPN-USERS general-attributes
 address-pool VPN-POOL
 default-group-policy VPN-POLICY
tunnel-group VPN-USERS webvpn-attributes
 group-alias VPN-USERS enable

! Authentication (RADIUS with local fallback)
aaa-server RADIUS-GROUP protocol radius
aaa-server RADIUS-GROUP (inside) host 10.1.1.100
 key RadiusSecretKey

tunnel-group VPN-USERS general-attributes
 authentication-server-group RADIUS-GROUP LOCAL

! WebVPN customization
webvpn
 title "Company VPN Portal"
 logo file company-logo.png
```

**User Connection Process:**
```
1. User navigates to https://vpn.company.com
2. Certificate warning if self-signed (trust and continue)
3. Select connection profile: "VPN-USERS"
4. Enter credentials (username/password)
5. MFA challenge (if configured)
6. AnyConnect client auto-downloads and installs
7. Tunnel established
8. User assigned IP from VPN-POOL
9. DNS set to corporate DNS servers
10. Access to corporate resources (10.1.0.0/16, 10.2.0.0/16)
```

### SSL VPN Security Features

**Multi-Factor Authentication:**
```
Methods:
- RADIUS challenge-response
- RSA SecurID
- Duo Security
- SMS/Email OTP
- TOTP (Google Authenticator)

Configuration (Cisco ASA + Duo):
aaa-server DUO protocol radius
aaa-server DUO (inside) host 10.1.1.100
 key DuoSecretKey

tunnel-group VPN-USERS general-attributes
 authentication-server-group DUO
```

**Posture Assessment:**
```
Definition: Check client security before allowing access
Checks:
- Antivirus installed and updated
- Firewall enabled
- OS patches current
- Disk encryption enabled
- No unauthorized software

Actions:
- Allow: Full access
- Quarantine: Limited access (remediation servers only)
- Deny: No access until compliant

Cisco Implementation: Cisco ISE (Identity Services Engine)
```

**Always-On VPN:**
```
Feature: VPN automatically connects before user login
Benefit: Device always protected, users don't forget to connect

Use Cases:
- Managed corporate devices
- High-security environments
- Zero Trust architecture

Configuration:
- Deploy via GPO or MDM
- Enable "Connect Before Logon"
- Optional: Only allow VPN connections (block local network)
```

## Other VPN Technologies

### L2TP/IPsec

**Layer 2 Tunneling Protocol:**
```
L2TP: Tunneling protocol (no encryption)
IPsec: Provides encryption/authentication

Why Combine?
- L2TP provides tunnel
- IPsec provides security
- Common on Windows, macOS, iOS

Ports:
- UDP 500: IKE
- UDP 4500: NAT-T
- UDP 1701: L2TP

Advantage: Native support on most OSes
Disadvantage: Blocked by some firewalls, slower than modern VPNs
```

### PPTP (DO NOT USE)

**Point-to-Point Tunneling Protocol:**
```
Status: OBSOLETE, INSECURE
Encryption: MPPE (broken)
Authentication: MS-CHAPv2 (broken)

Vulnerabilities:
- Weak encryption (MPPE easily cracked)
- Authentication flaws
- No integrity checking

Recommendation: Never use PPTP
Replacement: IKEv2, SSL VPN, WireGuard
```

### OpenVPN

**Open-Source VPN:**
```
Protocol: Custom (SSL/TLS-based)
Ports: Configurable (typically UDP 1194 or TCP 443)
Encryption: OpenSSL library (AES-256-GCM recommended)

Advantages:
- Open source (auditable)
- Cross-platform (Windows, Linux, macOS, mobile)
- Flexible (runs over UDP or TCP)
- Strong encryption
- Active development community

Disadvantages:
- Requires third-party client
- More complex configuration
- Slightly higher overhead

Use Cases:
- Personal VPN
- Small business VPN
- Travel/mobile VPN

Example Configuration:
# Server config
port 1194
proto udp
dev tun
ca ca.crt
cert server.crt
key server.key
dh dh2048.pem
cipher AES-256-GCM
auth SHA256
server 10.8.0.0 255.255.255.0
push "route 10.1.0.0 255.255.0.0"
push "dhcp-option DNS 10.1.1.10"
keepalive 10 120
```

### WireGuard

**Modern VPN Protocol:**
```
Status: Newest, fastest, simplest
Encryption: ChaCha20-Poly1305, Curve25519
Code: ~4,000 lines (vs OpenVPN ~100,000 lines)
Performance: Significantly faster than OpenVPN/IPsec

Advantages:
- Extremely fast (near line-speed)
- Simple configuration (minimal options)
- Modern cryptography (no legacy algorithms)
- Small codebase (easier to audit)
- Built into Linux kernel (5.6+)

Disadvantages:
- Newer (less enterprise adoption)
- Limited logging (privacy by design)
- Static IP assignment (no DHCP)

Use Cases:
- High-performance VPN
- Cloud interconnections
- Container networking
- Personal VPN

Example Configuration:
# Server
[Interface]
PrivateKey = <server-private-key>
Address = 10.9.0.1/24
ListenPort = 51820

[Peer]
PublicKey = <client-public-key>
AllowedIPs = 10.9.0.2/32

# Client
[Interface]
PrivateKey = <client-private-key>
Address = 10.9.0.2/24

[Peer]
PublicKey = <server-public-key>
Endpoint = vpn.company.com:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
```

## VPN Best Practices

### Security Best Practices

**Strong Authentication:**
```
1. Multi-Factor Authentication (MFA)
   - Something you know (password)
   - Something you have (token, phone)
   - Something you are (biometric)

2. Certificate-Based Authentication
   - More secure than PSK
   - Per-user certificates
   - Easy revocation

3. Avoid Pre-Shared Keys (PSK) for remote access
   - Use for site-to-site only
   - Long, random PSK (256+ bits entropy)
```

**Strong Cryptography:**
```
Encryption:
- AES-256 or AES-GCM-256
- Never: DES, 3DES, RC4

Hashing:
- SHA-256 minimum
- SHA-384 or SHA-512 for high security
- Never: MD5, SHA-1

Key Exchange:
- DH Group 14+ or ECC Group 19/20
- Enable PFS (Perfect Forward Secrecy)

TLS Version:
- TLS 1.2 minimum
- TLS 1.3 preferred
- Never: SSL 2.0, SSL 3.0, TLS 1.0, TLS 1.1
```

**Split Tunneling Considerations:**
```
Disabled (All traffic through VPN):
Pros:
- More secure (all traffic inspected)
- Consistent security policies
- Simpler monitoring

Cons:
- Higher VPN bandwidth
- Slower Internet access
- VPN gateway bottleneck

Enabled (Only corporate traffic through VPN):
Pros:
- Lower VPN bandwidth
- Faster Internet access
- Better user experience

Cons:
- Less secure (traffic bypasses controls)
- Malware could access corporate network
- Split personality (corporate + home network)

Recommendation:
- Disable for high-security environments
- Enable with caution (trust user endpoint security)
- Consider Always-On VPN with cloud security gateway
```

### Operational Best Practices

**Monitoring and Logging:**
```
Log Events:
- Connection attempts (success/failure)
- Authentication failures
- Disconnections
- Data transferred
- Configuration changes

Alerts:
- Multiple failed logins (brute force)
- Connections from unusual locations
- High bandwidth usage
- Concurrent logins (same user, different locations)

SIEM Integration:
- Forward VPN logs to SIEM
- Correlate with other security events
- Anomaly detection
```

**High Availability:**
```
Design:
- Redundant VPN concentrators
- Load balancing
- Automatic failover
- Geographic distribution

Example (Cisco):
- Two ASA firewalls in Active/Standby
- Shared VPN configuration
- Stateful failover (sessions maintained)
- DNS round-robin or load balancer

Capacity Planning:
- Size for peak usage + 30% growth
- Consider concurrent connections
- Bandwidth requirements per user
```

**Maintenance:**
```
Regular Tasks:
1. Update VPN software/firmware
2. Review and rotate certificates
3. Review access logs
4. Test failover procedures
5. Review and update ACLs
6. Decommission inactive accounts

Change Management:
- Test changes in lab first
- Maintenance windows for updates
- Rollback plan
- User notification
```

## Review Questions

1. **What is the difference between site-to-site and remote access VPN?**
   - Site-to-site connects networks (router-to-router), remote access connects individual users (client-to-gateway)

2. **What are the two IPsec modes?**
   - Transport mode (encrypts payload only), Tunnel mode (encrypts entire packet)

3. **What is the difference between IKE Phase 1 and Phase 2?**
   - Phase 1 establishes ISAKMP SA (management channel), Phase 2 establishes IPsec SA (data protection)

4. **What is NAT-T and why is it needed?**
   - NAT Traversal encapsulates IPsec in UDP 4500 so it can pass through NAT devices

5. **What are the three SSL VPN modes?**
   - Clientless (web browser), Thin client (port forwarding), Full tunnel (VPN client)

6. **What is Perfect Forward Secrecy (PFS)?**
   - New DH exchange for each session, so compromising one key doesn't compromise past sessions

7. **What is split tunneling?**
   - Only corporate traffic goes through VPN, Internet traffic goes direct (vs all traffic through VPN)

8. **Why should PPTP never be used?**
   - Weak encryption (MPPE), broken authentication (MS-CHAPv2), no integrity checking

9. **What makes WireGuard different from traditional VPNs?**
   - Much simpler (4,000 lines of code), faster, modern crypto only, no legacy algorithms

10. **What ports does IPsec use?**
    - UDP 500 (IKE), UDP 4500 (NAT-T), Protocol 50 (ESP), Protocol 51 (AH)

## Key Takeaways

- **VPNs** create encrypted tunnels through untrusted networks
- **IPsec** is best for site-to-site VPNs (tunnel mode, IKEv2)
- **SSL VPN** is best for remote access (works through firewalls, easy for users)
- **Use strong cryptography**: AES-256, SHA-256+, DH Group 14+, PFS enabled
- **Multi-factor authentication** essential for remote access VPNs
- **NAT-T** solves IPsec compatibility with NAT
- **Split tunneling** improves performance but reduces security
- **WireGuard** is the modern alternative (fast, simple, secure)
- **Never use PPTP** (broken security)
- **Monitor VPN logs** for security incidents and capacity planning

## Next Steps

In the next lesson, we'll explore **Firewalls and ACLs**, including packet filtering, stateful inspection, and next-generation firewall features.

---

**Lesson Complete!** You now understand VPN technologies and how to securely connect remote users and sites.
