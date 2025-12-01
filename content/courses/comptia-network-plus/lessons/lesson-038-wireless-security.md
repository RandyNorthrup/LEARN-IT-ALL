---
id: wireless-security
title: Wireless Security
chapterId: ch4-network-security
order: 38
duration: 85
objectives:
  - Understand wireless security protocols (WEP, WPA, WPA2, WPA3)
  - Configure enterprise wireless security (802.1X, RADIUS)
  - Implement guest network isolation
  - Prevent wireless attacks
  - Secure wireless infrastructure
---

# Lesson 38: Wireless Security

## Introduction

Wireless networks provide convenience and mobility but introduce unique security challenges. Unlike wired networks where physical access is required, wireless signals extend beyond organizational boundaries, making them accessible to anyone within range. Securing wireless networks requires understanding wireless protocols, encryption standards, authentication mechanisms, and common attacks.

In this lesson, we'll explore WPA2/WPA3 security, 802.1X authentication, wireless attacks, rogue access point detection, and best practices for secure wireless deployments.

**Key Principle:** Wireless security requires strong encryption, authentication, and continuous monitoring.

## Wireless Security Standards

### WEP (Wired Equivalent Privacy) - OBSOLETE

**Overview:**
```
Status: BROKEN - Never use
Released: 1997
Encryption: RC4 stream cipher
Key Size: 40-bit or 104-bit
Authentication: Open or Shared Key

Fatal Flaws:
1. Weak initialization vector (IV)
   - Only 24 bits
   - IV reuse after ~5,000 packets
   - Allows key recovery

2. Weak integrity check (CRC-32)
   - Can be forged
   - Bit-flipping attacks possible

3. Shared key authentication weakness
   - Exposes keystream
   - Easier to crack than open auth

Breaking Time: Minutes with tools (aircrack-ng)
```

**Why WEP Failed:**
```
Attack: IV collision attack
1. Capture enough packets (~40,000-80,000)
2. Analyze IV reuse patterns
3. Statistical analysis reveals key
4. Tools: aircrack-ng, WEPcrack

Result: Full key recovery in 3-5 minutes
Lesson: Never use WEP, even for "low-security" networks
```

### WPA (Wi-Fi Protected Access)

**Overview:**
```
Status: Legacy, use WPA2/WPA3
Released: 2003 (interim solution until 802.11i)
Encryption: TKIP (Temporal Key Integrity Protocol)
Key Size: 128-bit
Improvements over WEP:
- Per-packet key mixing
- Message integrity check (Michael)
- Larger IV (48-bit)
```

**TKIP (Temporal Key Integrity Protocol):**
```
Features:
- Per-packet key generation
- Extended 48-bit IV
- MIC (Message Integrity Check)
- Countermeasures (shuts down if attack detected)

Weakness: TKIP deprecated (2012)
- Michael MIC can be broken
- Key recovery possible (though difficult)

Recommendation: Use WPA2/WPA3, not WPA/TKIP
```

### WPA2 (802.11i)

**Overview:**
```
Status: Current standard (minimum acceptable)
Released: 2004
Encryption: CCMP (AES-based)
Mode: Personal (PSK) or Enterprise (802.1X)
Security: Strong (when configured properly)
```

**CCMP (Counter Mode with CBC-MAC Protocol):**
```
Encryption: AES in Counter Mode (128-bit)
Integrity: CBC-MAC (128-bit)
Replay Protection: Packet Number (PN)

Process:
1. Fresh key per session (PTK - Pairwise Transient Key)
2. Each packet encrypted with unique value
3. CBC-MAC provides authentication
4. Replay protection via packet numbering

Strength: No practical attacks against AES-CCMP
Weakness: PSK mode vulnerable to offline dictionary attack
```

**WPA2-Personal (PSK):**
```
Authentication: Pre-Shared Key (passphrase)
Use Case: Home, small office

Configuration:
SSID: CompanyWiFi
Passphrase: MyStr0ng!WiFiP@ssw0rd!2024
Encryption: AES-CCMP

Key Derivation:
PMK (Pairwise Master Key) = PBKDF2(passphrase, SSID, 4096 iterations)
PTK = PRF(PMK, ANonce, SNonce, AA, SPA)

Security Considerations:
- Strong passphrase required (20+ characters)
- Same key for all users (no per-user control)
- Key compromise affects all users
- Cannot revoke individual access

Vulnerability: 4-way handshake capture
1. Attacker captures handshake
2. Offline dictionary attack on PMK
3. Weak passphrase = key recovery

Protection:
- Long random passphrase (20+ characters)
- Avoid dictionary words
- Change regularly
```

**WPA2-Enterprise (802.1X):**
```
Authentication: RADIUS server (EAP)
Use Case: Enterprise, organization

Components:
- Supplicant: Client device
- Authenticator: Access point
- Authentication Server: RADIUS

Benefits:
- Per-user credentials
- Strong authentication (certificates, MFA)
- Centralized management
- User/device tracking
- Easy revocation

Configuration:
SSID: CorpWiFi-Secure
Security: WPA2-Enterprise
Authentication: 802.1X (PEAP-MSCHAPv2 or EAP-TLS)
RADIUS: 10.1.1.100, shared secret
```

### WPA3

**Overview:**
```
Status: Latest standard (recommended)
Released: 2018
Improvements over WPA2:
- Forward secrecy (SAE)
- Stronger encryption (192-bit option)
- Protection against offline attacks
- Simplified IoT device setup (Easy Connect)
```

**WPA3-Personal (SAE):**
```
SAE: Simultaneous Authentication of Equals (Dragonfly)
Replaces: PSK 4-way handshake

Advantages:
1. Forward Secrecy
   - Each session has unique key
   - Captured traffic cannot be decrypted later
   - Even if password compromised

2. Dictionary Attack Protection
   - Cannot capture and crack offline
   - Active attack only (rate-limited)

3. Equal Authentication
   - Both parties prove knowledge of password
   - Without revealing password

Security: Immune to offline dictionary attacks
```

**WPA3-Enterprise:**
```
Improvements:
- Optional 192-bit security mode
- GCMP-256 encryption (vs AES-128)
- HMAC-SHA384 (vs HMAC-SHA1)
- ECDH exchange (vs RSA)

Use: Government, high-security environments

Required:
- 802.1X authentication
- Suite-B cryptographic algorithms
- Management frame protection (MFP)
```

**WPA3 Features:**
```
1. Management Frame Protection (MFP):
   - Protects management frames (deauth, disassoc)
   - Prevents deauthentication attacks
   - Optional in WPA2, mandatory in WPA3

2. Protected Management Frames (PMF/802.11w):
   Protects:
   - Deauthentication
   - Disassociation  
   - Action frames
   
   Does NOT protect:
   - Beacon frames
   - Probe requests/responses
   - Authentication/Association requests

3. Easy Connect (DPP):
   - QR code device provisioning
   - Simplified IoT onboarding
   - No need to enter passphrase
```

## 802.1X Wireless Authentication

### EAP Methods

**EAP-TLS (EAP-Transport Layer Security):**
```
Security: Strongest
Authentication: Mutual (client + server certificates)
Credentials: Digital certificates

Requirements:
- PKI infrastructure
- Client certificates on all devices
- Server certificate on RADIUS

Process:
1. Client connects to AP
2. AP requests authentication (EAP-Request Identity)
3. Client certificate sent to RADIUS
4. RADIUS validates client certificate
5. Client validates RADIUS certificate
6. Mutual TLS authentication
7. If successful, encryption keys generated

Advantages:
- No password (cannot be phished)
- Mutual authentication
- Strongest security

Disadvantages:
- Complex (PKI required)
- Certificate management overhead
- Difficult for BYOD

Use: High-security environments, managed devices
```

**PEAP (Protected EAP):**
```
Security: Strong
Authentication: Server certificate + user credentials
Credentials: Username/password

Process:
1. TLS tunnel established (server cert validated)
2. Client authenticates inside tunnel (MSCHAPv2)
3. Password protected by TLS tunnel

Advantages:
- No client certificate needed
- Protects password (encrypted tunnel)
- Easy for users
- Active Directory integration

Disadvantages:
- Password-based (can be weak)
- Server certificate must be validated (often skipped)

Variants:
- PEAP-MSCHAPv2: Microsoft (Active Directory)
- PEAP-GTC: Cisco, token-based

Use: Enterprise with Active Directory
```

**EAP-TTLS (EAP-Tunneled TLS):**
```
Security: Strong
Authentication: Server certificate + various inner methods
Credentials: Username/password, PAP, CHAP, MSCHAPv2

Similar to PEAP:
- TLS tunnel with server certificate
- Inner authentication protected

Advantages:
- Flexible inner authentication
- No client certificate
- More flexible than PEAP

Use: Mixed environments, non-Microsoft networks
```

**EAP-FAST (EAP-Flexible Authentication via Secure Tunneling):**
```
Security: Good
Authentication: PAC (Protected Access Credential) + user credentials
Credentials: Username/password

Cisco Proprietary:
- No certificate required initially
- Uses PAC instead
- PAC provisioned automatically

Advantages:
- No PKI needed
- Fast deployment
- Automatic PAC provisioning

Disadvantages:
- Cisco proprietary
- Less secure than EAP-TLS
- PAC can be compromised

Use: Cisco environments, quick deployment
```

### RADIUS Configuration

**Wireless Controller Configuration:**
```
! Cisco WLC - RADIUS Configuration
config radius auth add 1 10.1.1.100 1812 ascii MyR@diusS3cr3t
config radius auth enable 1

! Create WLAN
config wlan create 10 CorpWiFi-Secure
config wlan ssid CorpWiFi-Secure 10
config wlan security wpa enable 10
config wlan security wpa wpa2 enable 10
config wlan security wpa wpa2 ciphers aes enable 10
config wlan security wpa akm 802.1x enable 10
config wlan radius_server auth add 10 1
config wlan enable 10
```

**FreeRADIUS Configuration:**
```
# /etc/freeradius/clients.conf
client wireless-controller {
    ipaddr = 10.1.1.50
    secret = MyR@diusS3cr3t
    shortname = wlc-01
}

# /etc/freeradius/users
# User with PEAP-MSCHAPv2
jsmith Cleartext-Password := "UserP@ssw0rd"
    Service-Type = Framed-User,
    Tunnel-Type = VLAN,
    Tunnel-Medium-Type = IEEE-802,
    Tunnel-Private-Group-ID = 50

# /etc/freeradius/eap.conf
eap {
    default_eap_type = peap
    
    tls-config tls-common {
        private_key_file = /etc/ssl/server-key.pem
        certificate_file = /etc/ssl/server-cert.pem
        ca_file = /etc/ssl/ca-cert.pem
    }
    
    peap {
        tls = tls-common
        default_eap_type = mschapv2
    }
}
```

## Wireless Attacks

### Reconnaissance Attacks

**Wardriving:**
```
Definition: Driving around mapping wireless networks
Tools: Kismet, inSSIDer, Ekahau
Goal: Identify networks, encryption types, signal strength

Information Gathered:
- SSID
- BSSID (MAC address)
- Channel
- Encryption type (WEP, WPA, WPA3)
- Signal strength (RSSI)
- Geolocation (GPS coordinates)

Countermeasures:
- Cannot prevent (radio waves travel freely)
- Reduce signal leakage (directional antennas)
- Strong encryption (makes network less attractive target)
```

**Wireless Sniffing:**
```
Method: Capture wireless traffic for analysis
Requirement: Monitor mode (capture all packets)

Process:
1. Put wireless card in monitor mode
   iwconfig wlan0 mode monitor
   
2. Capture packets
   tcpdump -i wlan0mon -w capture.pcap
   
3. Analyze with Wireshark

What Can Be Seen:
- Management frames (SSIDs, MAC addresses)
- Encrypted data frames (cannot decrypt without key)
- Handshakes (for offline cracking)

Tools: Wireshark, tcpdump, Kismet
```

### Cryptographic Attacks

**WPA2-PSK Handshake Capture:**
```
Attack: Capture 4-way handshake for offline cracking

Process:
1. Monitor network
   airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon
   
2. Deauth client (force reconnection)
   aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon
   
3. Capture handshake (client reconnects)
   
4. Offline dictionary attack
   aircrack-ng -w wordlist.txt capture.cap

Time to Crack:
- Weak password (8 char, dictionary): Minutes
- Strong password (20+ random): Infeasible

Protection:
- Strong passphrase (20+ characters)
- WPA3 (immune to offline attack)
```

**KRACK Attack (Key Reinstallation Attack):**
```
Year: 2017
Target: WPA2 4-way handshake
CVE: CVE-2017-13077 through CVE-2017-13088

Vulnerability:
- Forces nonce reuse in handshake
- Allows replay, decryption, forging packets

Impact:
- Decrypt WPA2 traffic
- Inject malicious packets
- Hijack TCP connections

Mitigation:
- Patch all devices (client-side vulnerability)
- WPA3 not vulnerable
- All major vendors patched (2017-2018)

Status: Historical (patched), but shows WPA2 weaknesses
```

### Access Point Attacks

**Rogue Access Point:**
```
Definition: Unauthorized AP installed on network
Risk: Bypasses security controls

Scenarios:
1. Employee plugs in consumer AP
2. Attacker physically installs AP
3. Compromised device acts as AP

Detection:
- Wireless IPS (WIPS)
- RF scanning
- Network Access Control (NAC)
- Regular physical inspection

Example:
Authorized AP: Corporate-WiFi (vendor SSID, managed)
Rogue AP: Corporate-WiFi (consumer SSID, unmanaged)
User connects to rogue, traffic monitored by attacker

Countermeasures:
- Wireless intrusion detection
- Physical port security (802.1X on wired)
- Regular audits
- User education
```

**Evil Twin:**
```
Definition: Fake AP with same SSID as legitimate
Goal: Trick users into connecting

Attack:
1. Set up AP with same SSID
2. Stronger signal or deauth legitimate AP
3. Users connect to evil twin
4. MITM attack (intercept all traffic)

Example:
Legitimate: SSID="CoffeeShop", WPA2, 10.1.1.1
Evil Twin:  SSID="CoffeeShop", Open, 192.168.1.1

User sees same SSID, connects to evil twin
Attacker captures credentials, session cookies

Protection:
- 802.1X (authenticates network)
- Certificate validation (PEAP, EAP-TLS)
- VPN on untrusted networks
- User awareness
```

**Deauthentication Attack:**
```
Method: Send deauth frames to disconnect clients
Goal: Force reconnection (capture handshake)
Protocol: 802.11 management frames (unauthenticated)

Attack:
aireplay-ng --deauth 0 -a AA:BB:CC:DD:EE:FF wlan0mon

Impact:
- Disconnects all clients
- Denial of service
- Forces handshake capture

Mitigation:
- Management Frame Protection (802.11w)
- Mandatory in WPA3
- Optional in WPA2 (enable if supported)

Configuration (Cisco WLC):
config wlan security pmf enable 10
config wlan security pmf required 10
```

### Jamming Attacks

**RF Jamming:**
```
Definition: Transmit interference on same frequency
Goal: Deny wireless service

Types:
1. Continuous: Constant noise
2. Intermittent: Periodic jamming
3. Reactive: Jam when traffic detected
4. Deceptive: Transmit fake frames

Impact: Complete DoS of wireless network

Detection:
- Sudden signal strength drop
- High retry rates
- Low throughput
- Interference visualization tools

Mitigation:
- Physical security (prevent jamming devices)
- Wireless intrusion detection
- Spread spectrum (frequency hopping)
- Legal: FCC violation (report to authorities)
```

## Wireless Security Best Practices

### Secure Configuration

**Encryption:**
```
Priority Order:
1. WPA3-Enterprise (best)
2. WPA3-Personal
3. WPA2-Enterprise
4. WPA2-Personal (minimum acceptable)

Never Use:
- WEP (broken)
- WPA/TKIP (deprecated)
- Open networks (no encryption)

Guest Network:
- Separate SSID
- Isolated from corporate network
- Captive portal
- WPA2/WPA3 Personal or Open + portal
```

**Authentication:**
```
Corporate Network:
- 802.1X (RADIUS)
- EAP-TLS (strongest) or PEAP-MSCHAPv2
- Integrate with Active Directory
- Certificate validation (prevent evil twin)

Small Office:
- WPA2/WPA3-Personal
- Strong passphrase (20+ characters)
- Change regularly (quarterly)

Guest Network:
- Separate authentication
- Time-limited access
- No access to corporate resources
```

**SSID Management:**
```
Broadcasting:
- Broadcast SSID (hiding doesn't improve security)
- Hidden SSID = security through obscurity (ineffective)
- Hidden SSID actually broadcasts in probe responses

Naming:
- Avoid revealing information (company name, location)
- Generic name better (don't advertise target)

Bad:  "CompanyName-HQ-Floor3"
Good: "Corporate-WiFi"

Multiple SSIDs:
- Corporate (WPA3-Enterprise, employee access)
- Guest (WPA2-Personal/Portal, visitor access)
- IoT (Separate VLAN, segmented)
```

### Network Segmentation

**VLANs:**
```
Segmentation Strategy:
- Corporate: VLAN 50 (full access)
- Guest: VLAN 60 (Internet only, isolated)
- IoT: VLAN 70 (limited access, monitored)

Dynamic VLAN Assignment (802.1X):
User → Authenticate → RADIUS returns VLAN
- Employees → VLAN 50
- Contractors → VLAN 55 (limited)
- Guests → VLAN 60

RADIUS Attribute:
Tunnel-Type = VLAN
Tunnel-Medium-Type = IEEE-802
Tunnel-Private-Group-ID = 50
```

**Firewall Rules:**
```
Guest Network:
- Allow outbound HTTP/HTTPS
- Allow DNS
- Block all RFC 1918 (internal networks)
- Block inter-guest communication (client isolation)

IoT Network:
- Allow only required destinations
- Block Internet (if not needed)
- Monitor for anomalies
- Log all connections
```

### Monitoring and Detection

**Wireless Intrusion Detection:**
```
WIDS/WIPS Capabilities:
- Rogue AP detection
- Evil twin detection
- Deauth attack detection
- Unauthorized client detection
- RF interference detection

Deployment:
- Dedicated sensors or integrated (controller APs)
- Overlapping coverage
- Centralized monitoring

Products:
- Cisco MSE (Mobility Services Engine)
- Aruba AirWave
- Enterprise wireless controllers (built-in)
```

**Rogue AP Detection:**
```
Methods:
1. RF Scanning:
   - Scan all channels
   - Identify unknown BSSIDs
   - Correlate with authorized list

2. Wired Detection:
   - Detect rogue AP on wired network
   - MAC address correlation

3. Manual Audits:
   - Physical inspection
   - Quarterly sweeps

Response:
- Automatic containment (deauth to rogue)
- Alert security team
- Physical location (triangulation)
- Remove and investigate
```

## Review Questions

1. **Why should WEP never be used?**
   - Broken encryption (RC4 weak IV), can be cracked in minutes

2. **What is the main improvement of WPA3 over WPA2?**
   - Forward secrecy (SAE), protection against offline dictionary attacks

3. **What is the strongest EAP method?**
   - EAP-TLS (mutual certificate authentication)

4. **What is an evil twin attack?**
   - Fake AP with same SSID as legitimate network to trick users

5. **What does 802.11w provide?**
   - Management Frame Protection (prevents deauth attacks)

6. **What is KRACK?**
   - Key Reinstallation Attack against WPA2 (patched in 2017)

7. **What is the difference between WPA2-Personal and WPA2-Enterprise?**
   - Personal uses PSK (shared key), Enterprise uses 802.1X (per-user auth)

8. **How does WPA3 prevent offline dictionary attacks?**
   - SAE (Simultaneous Authentication of Equals) requires active attack, rate-limited

9. **What is a rogue access point?**
   - Unauthorized AP installed on network, bypasses security controls

10. **What is client isolation?**
    - Prevents wireless clients from communicating directly with each other

## Key Takeaways

- **WPA3 is recommended** - forward secrecy, offline attack protection
- **WPA2 minimum acceptable** - use Enterprise (802.1X) for organizations
- **Never use WEP or WPA/TKIP** - completely broken
- **802.1X provides per-user authentication** - centralized, manageable
- **EAP-TLS strongest** - certificate-based, no password
- **Management Frame Protection** - prevents deauth attacks (mandatory in WPA3)
- **Segment wireless networks** - corporate, guest, IoT on separate VLANs
- **Monitor for rogue APs** - WIDS/WIPS essential for enterprise
- **Strong passphrases** - 20+ characters for PSK networks
- **Certificate validation** - prevent evil twin attacks

## Next Steps

In the next lesson, we'll explore **Network Access Control (NAC)**, including 802.1X port authentication, posture assessment, and guest access management.

---

**Lesson Complete!** You now understand wireless security protocols, attacks, and best practices for secure wireless deployments.
