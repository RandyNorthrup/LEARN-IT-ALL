---
id: lesson-038-wireless-security
title: Wireless Security
chapterId: ch5-network-security
order: 38
duration: 85
objectives:
  - Identify wireless threats, attack vectors, and defense strategies
  - Configure enterprise wireless security (802.1X, RADIUS)
  - Implement guest network isolation
  - Prevent wireless attacks
  - Secure wireless infrastructure
---

# Lesson 38: Wireless Security

## Introduction

Wireless networks provide convenience and mobility but introduce unique security challenges. Unlike wired networks where physical access is required, wireless signals extend beyond organizational boundaries, making them accessible to anyone within range. Securing wireless networks requires understanding wireless protocols, encryption standards, authentication mechanisms, and common attacks.

> **Note:** This lesson covers wireless security from an attack-and-defense perspective. If you are not yet familiar with wireless fundamentals (SSIDs, BSSIDs, frequency bands, 802.11 standards, access points), you may wish to preview [Lesson 53: Wireless Fundamentals](lesson-053-wireless-fundamentals) first. For detailed protocol internals and cryptographic mechanisms of WEP, WPA, WPA2, and WPA3, see [Lesson 56: Wireless Security Protocols](lesson-056-wireless-security-protocols).

In this lesson, we'll explore wireless attack methodologies, man-in-the-middle techniques, denial-of-service vectors, rogue access point detection, wireless intrusion detection systems, security auditing, and incident response for wireless environments.

**Key Principle:** Wireless security requires strong encryption, authentication, and continuous monitoring — but equally demands proactive threat hunting, attack surface reduction, and rehearsed incident response.

## Learning Objectives

After completing this lesson, you will be able to:

- Identify wireless threats, attack vectors, and defense strategies
- Configure enterprise wireless security (802.1X, RADIUS)
- Implement guest network isolation
- Prevent wireless attacks
- Secure wireless infrastructure

---

## Wireless Security Standards Overview

*This section provides a high-level comparison of wireless security protocols. For detailed cryptographic analysis, key hierarchy diagrams, and protocol internals, see [Lesson 56: Wireless Security Protocols](lesson-056-wireless-security-protocols).*

### Protocol Comparison

| Protocol | Year | Encryption | Key Management | Status |
|----------|------|-----------|----------------|--------|
| **WEP** | 1999 | RC4 (40/104-bit) | Static shared key + 24-bit IV | **Broken** — never use |
| **WPA** | 2003 | TKIP (RC4-based, 128-bit) | Per-packet key mixing | **Deprecated** |
| **WPA2** | 2004 | AES-CCMP (128-bit) | 4-way handshake (PSK or 802.1X) | **Current minimum** |
| **WPA3** | 2018 | AES-CCMP / GCMP-256 | SAE (Personal) or 802.1X (Enterprise) | **Recommended** |

### Security Implications Summary

From a security perspective, the key takeaways for each protocol are:

- **WEP**: Completely broken — can be cracked in minutes. Never deploy under any circumstances.
- **WPA (TKIP)**: Deprecated — key recovery attacks are feasible. Do not use.
- **WPA2-Personal**: Vulnerable to offline dictionary attacks if the 4-way handshake is captured. Requires strong passphrases (20+ characters).
- **WPA2-Enterprise**: Strong when properly configured with 802.1X/RADIUS and certificate validation.
- **WPA3-Personal**: Immune to offline dictionary attacks thanks to SAE. Recommended.
- **WPA3-Enterprise**: Strongest option. Makes Management Frame Protection (802.11w) mandatory, preventing deauthentication attacks that are central to many wireless attack chains.

For detailed protocol internals, cryptographic mechanisms, key hierarchy analysis, and frame-level protocol behavior, see [Lesson 56: Wireless Security Protocols](lesson-056-wireless-security-protocols).

## 802.1X Wireless Authentication

*For a comprehensive comparison of all wireless authentication methods including PSK, SAE, captive portals, and certificate-based auth, see [Lesson 58: Wireless Authentication Methods](lesson-058-wireless-authentication).*

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

### Wireless Attack Methodology

Wireless attacks generally follow a structured kill chain. Understanding this chain helps defenders know where to detect and disrupt an attacker.

```
Wireless Attack Kill Chain:

┌──────────────────────────────────────────────────────────────┐
│ 1. RECONNAISSANCE                                           │
│    Passive scanning, wardriving, probe request monitoring    │
│    Goal: Discover target networks, clients, and encryption   │
├──────────────────────────────────────────────────────────────┤
│ 2. ENUMERATION                                               │
│    BSSID fingerprinting, vendor identification, client list  │
│    Goal: Map the attack surface and identify weak targets     │
├──────────────────────────────────────────────────────────────┤
│ 3. EXPLOITATION                                              │
│    Handshake capture, evil twin, credential theft, MITM      │
│    Goal: Gain access to the network or intercept data        │
├──────────────────────────────────────────────────────────────┤
│ 4. POST-EXPLOITATION                                         │
│    Lateral movement, data exfiltration, persistence           │
│    Goal: Achieve the attacker's ultimate objective            │
└──────────────────────────────────────────────────────────────┘

Defense Strategy: Detect at stage 1, block at stage 2,
                  contain at stage 3, respond at stage 4.
```

### Reconnaissance Attacks

**Wardriving:**
```
Definition: Driving around mapping wireless networks
Tools: Kismet, inSSIDer, Ekahau, WiGLE
Goal: Identify networks, encryption types, signal strength

Information Gathered:
- SSID and hidden network indicators
- BSSID (MAC address) → vendor OUI lookup
- Channel and frequency band (2.4 GHz / 5 GHz)
- Encryption type (Open, WEP, WPA, WPA2, WPA3)
- Signal strength (RSSI in dBm)
- Geolocation (GPS coordinates)
- Client count and probe requests

Countermeasures:
- Cannot prevent (radio waves travel freely)
- Reduce signal leakage (directional antennas, TX power tuning)
- Strong encryption (makes network less attractive target)
- Monitor for suspicious vehicles or repeated probe requests
```

**Wireless Sniffing and Enumeration:**
```
Method: Capture wireless traffic for analysis
Requirement: Monitor mode wireless adapter

Process:
1. Enable monitor mode
   airmon-ng start wlan0

2. Scan all channels and capture metadata
   airodump-ng wlan0mon

Example airodump-ng Output:
 BSSID              PWR  Beacons  #Data  CH  ENC   ESSID
 AA:BB:CC:DD:EE:FF  -42  1523     892    6   WPA2  CorpWiFi
 11:22:33:44:55:66  -68  347      12     1   WEP   OldPrinter
 77:88:99:AA:BB:CC  -55  941      458   11   WPA3  SecureNet

 STATION            BSSID              PWR   Frames  Probe
 DE:AD:BE:EF:00:01  AA:BB:CC:DD:EE:FF  -38   2841    CorpWiFi
 CA:FE:BA:BE:00:02  (not associated)   -71   14      FreeWiFi,HomeNet

Key Observations:
- OldPrinter uses WEP → immediate vulnerability
- Station CA:FE:BA:BE:00:02 is probing for FreeWiFi → evil twin target
- CorpWiFi has active clients → handshake capture possible

Tools: Wireshark, tcpdump, Kismet, airodump-ng
```

**Probe Request Analysis:**
```
What Are Probe Requests?
- Frames sent by clients looking for known networks
- Reveal SSIDs the device has previously connected to
- Sent even when not actively connected

Attacker Use:
- Build profile of target's network history
- Identify SSIDs to impersonate (evil twin)
- Track device movement patterns

Example (Wireshark filter: wlan.fc.type_subtype == 0x04):
  Device AA:BB:CC → Probe Request for "Airport_Free_WiFi"
  Device AA:BB:CC → Probe Request for "Hilton_Guest"
  Device AA:BB:CC → Probe Request for "CorpWiFi"

Defense:
- Disable "auto-connect" on client devices
- Remove old SSIDs from saved networks
- Use 802.11w to protect management frames
- WPA3 devices randomize MAC in probes
```

**Hidden SSID Detection:**
```
Myth: Hiding SSID improves security
Reality: Hidden SSIDs are trivially discoverable

Methods to Reveal Hidden SSIDs:
1. Wait for a client to connect (SSID in association request)
   airodump-ng wlan0mon → shows <hidden> with BSSID
   When client connects → SSID auto-populated

2. Send deauth to force reconnection
   aireplay-ng --deauth 5 -a <BSSID> wlan0mon
   Client reconnects → SSID visible in probe/assoc frames

3. Passive probe response monitoring
   Clients probing for hidden SSID broadcast it in plaintext

Conclusion: SSID hiding is security through obscurity
            and actually makes devices LESS secure (clients
            broadcast the SSID in probes everywhere they go)
```

### Cryptographic Attacks

**WPA2-PSK Handshake Capture:**
```
Attack: Capture 4-way handshake for offline cracking

Process:
1. Monitor target network
   airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon

2. Deauthenticate a client (force reconnection)
   aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon

3. Capture handshake (client reconnects)
   airodump-ng shows "WPA handshake: AA:BB:CC:DD:EE:FF"

4. Offline dictionary/brute-force attack
   aircrack-ng -w wordlist.txt capture.cap
   hashcat -m 22000 capture.hc22000 wordlist.txt

Time to Crack:
- Weak password (8 char, dictionary): Minutes
- Medium password (10 char, mixed): Days to weeks
- Strong password (20+ random): Infeasible

Protection:
- Strong passphrase (20+ characters, random)
- WPA3-SAE (immune to offline attack)
- WPA2-Enterprise (per-user keys)
```

**KRACK Attack (Key Reinstallation Attack):**
```
Year: 2017
Target: WPA2 4-way handshake (client-side)
CVE: CVE-2017-13077 through CVE-2017-13088

Vulnerability:
- Forces nonce reuse in handshake message 3 retransmission
- Allows replay, decryption, and packet forging

Impact:
- Decrypt WPA2 traffic without knowing the passphrase
- Inject malicious packets into encrypted streams
- Hijack TCP connections

Mitigation:
- Patch all client devices (client-side vulnerability)
- WPA3 not vulnerable (SAE handshake immune)
- All major vendors patched (2017-2018)

Status: Historical (patched), but demonstrates that protocol
        implementation bugs can undermine strong cryptography
```

### Man-in-the-Middle (MITM) Attacks

**ARP Spoofing over Wireless:**
```
Scenario: Attacker on the same wireless network

Attack:
1. Join target wireless network (open or known PSK)
2. ARP spoof the default gateway
   arpspoof -i wlan0 -t <victim_IP> <gateway_IP>
3. Enable IP forwarding
   echo 1 > /proc/sys/net/ipv4/ip_forward
4. All victim traffic flows through attacker

Capture:
- HTTP credentials (plaintext)
- DNS queries (browsing history)
- Email (unencrypted SMTP/POP3)
- Session cookies

Defense:
- Client isolation on the AP (prevents client-to-client traffic)
- Dynamic ARP Inspection (DAI) on switches
- Use encrypted protocols (HTTPS, SSH, VPN)
- Static ARP entries for critical gateways (impractical at scale)
```

**SSL Stripping on Open Networks:**
```
Scenario: Open WiFi (airport, coffee shop, hotel)

Attack:
1. Set up or join open network
2. ARP spoof to become MITM
3. Run SSL strip tool
   sslstrip -l 8080
   iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 8080
4. Intercept HTTPS downgrade
   - User types "bank.com" → HTTP redirect intercepted
   - Attacker connects to bank via HTTPS
   - Victim sees HTTP version (no lock icon)

What Is Captured:
- Login credentials
- Session tokens
- Personal data submitted over "secure" forms

Defense:
- HSTS (HTTP Strict Transport Security) on web servers
- HSTS preload lists in browsers
- VPN on all untrusted networks
- User education: always verify HTTPS lock icon
- Avoid open networks for sensitive operations
```

**HTTPS Downgrade Attacks:**
```
Beyond SSL Stripping:
1. BEAST/POODLE: Force downgrade to SSL 3.0 / TLS 1.0
2. DNS spoofing: Redirect to attacker-controlled lookalike site
3. Captive portal abuse: Inject JavaScript before portal auth

Mitigation:
- Disable TLS 1.0/1.1 on servers
- Certificate pinning in mobile apps
- DNS over HTTPS (DoH) or DNS over TLS (DoT)
- Always use VPN on wireless networks you don't control
```

### Denial of Service (DoS) Attacks

**Deauthentication Flooding:**
```
Method: Flood deauth frames to disconnect all clients
Protocol: 802.11 management frames (unauthenticated in WPA2)

Attack:
# Continuous deauth against all clients on a BSSID
aireplay-ng --deauth 0 -a AA:BB:CC:DD:EE:FF wlan0mon

# Targeted deauth against a specific client
aireplay-ng --deauth 0 -a AA:BB:CC:DD:EE:FF -c 11:22:33:44:55:66 wlan0mon

Impact:
- All clients disconnected repeatedly
- Network unusable during attack
- Often used as precursor to evil twin or handshake capture

Mitigation:
- Management Frame Protection (802.11w / PMF)
- Mandatory in WPA3, optional in WPA2
- WIDS/WIPS detection and alerting

Cisco WLC Configuration:
config wlan security pmf enable 10
config wlan security pmf required 10
```

**CTS/RTS Spoofing:**
```
RTS/CTS: Request to Send / Clear to Send (collision avoidance)

Attack:
- Attacker sends spoofed CTS frames with long duration values
- All stations honor the CTS and stay silent
- Effective DoS without detectable deauth frames

Mechanism:
1. Craft CTS frame with duration = 32,767 μs (~33 ms)
2. Transmit continuously
3. All compliant stations defer transmission
4. Network throughput drops to near zero

Why It Works:
- CTS frames have no authentication
- All stations MUST honor CTS (802.11 standard)
- Hard to distinguish from legitimate CTS

Mitigation:
- WIDS detection of excessive CTS frames
- Firmware-level CTS rate limiting (vendor-specific)
- Physical security (locate and remove jammer)
```

**Association Flooding:**
```
Attack: Exhaust AP association table capacity

Method:
1. Send thousands of authentication/association requests
2. Use randomized source MAC addresses
3. AP fills connection table
4. Legitimate clients cannot associate

Impact:
- AP denies new connections
- Existing clients may be unaffected initially
- Degrades over time as AP resources are consumed

Mitigation:
- Rate limiting on authentication requests
- MAC address filtering (limited effectiveness)
- 802.1X (requires valid credentials to complete association)
- AP association table size tuning
- WIDS alerting on rapid association attempts
```

**Beacon Flooding:**
```
Attack: Flood the air with fake beacon frames

Method:
1. Transmit thousands of beacons with random SSIDs
   mdk3 wlan0mon b -f ssid_list.txt -s 1000
2. Client devices see hundreds of fake networks
3. Slows down scanning and network selection

Impact:
- Confuses users trying to find legitimate network
- Overwhelms wireless scanning tools
- May crash older client wireless drivers
- Can mask a rogue AP among fake SSIDs

Mitigation:
- WIDS detection of beacon anomalies
- Pre-configured SSIDs on managed devices
- 802.1X (even if user selects fake SSID, auth fails)
```

**RF Jamming:**
```
Definition: Transmit interference on same frequency
Goal: Deny wireless service at the physical layer

Types:
1. Continuous: Constant noise on target frequency
2. Intermittent: Periodic jamming (harder to detect)
3. Reactive: Jam only when legitimate traffic detected
4. Deceptive: Transmit valid-looking but malicious frames

Impact: Complete DoS of wireless network

Detection:
- Sudden drop in signal-to-noise ratio
- High frame retry rates across all clients
- Near-zero throughput despite strong signal
- Spectrum analyzer shows elevated noise floor

Mitigation:
- Physical security (prevent jammer placement)
- WIDS with spectrum analysis capability
- Band steering (move to unaffected frequency)
- Legal action: FCC violation in the US (report to authorities)
```

### Access Point Attacks

**Rogue Access Point:**
```
Definition: Unauthorized AP connected to the corporate network
Risk: Bypasses all network security controls

Scenarios:
1. Employee plugs in consumer AP for convenience
2. Attacker physically installs AP in wiring closet
3. Compromised device with hotspot enabled
4. IoT device with built-in AP (printers, cameras)

Rogue AP Characteristics (detection clues):
- Unknown BSSID not in authorized AP inventory
- Consumer vendor OUI (Netgear, TP-Link, Linksys)
- Unexpected channels or frequency bands
- No 802.1X / enterprise authentication
- Wired-side MAC appears on switch ports without NAC

Detection Methods:
- WIDS/WIPS continuous RF scanning
- Wired-side detection: correlate wireless BSSIDs to switch MAC tables
- Network Access Control (NAC) on switch ports
- Regular physical inspections of wiring closets
- SNMP traps for new MAC addresses on access ports

Containment:
- Automatic wireless containment (WIPS deauths rogue clients)
- Port shutdown on the switch (wired-side)
- Alert security team for physical removal
- Incident response procedures (investigate intent)
```

**Evil Twin — Setup, Detection, and Defense:**
```
Definition: Fake AP impersonating a legitimate network
Goal: Trick users into connecting for credential theft or MITM

Attack Setup:
1. Identify target SSID and channel (airodump-ng)
2. Clone SSID on attacker laptop
   hostapd configuration:
     interface=wlan0
     ssid=CorpWiFi
     channel=6
     hw_mode=g
3. Configure DHCP and DNS on attacker device
4. Optionally deauth clients from real AP
   aireplay-ng --deauth 20 -a <real_BSSID> wlan0mon
5. Victims auto-connect to stronger signal
6. Attacker runs transparent proxy / credential harvester

Detection Indicators:
- Two APs with same SSID but different BSSIDs
- Unexpected signal strength changes
- AP on an unauthorized channel
- Missing enterprise authentication (WPA2-Enterprise
  evil twin usually falls back to Open or WPA2-PSK)
- WIDS alert: SSID spoofing detected

Protection:
- WPA2/WPA3-Enterprise with certificate validation
  (client verifies RADIUS server certificate → evil twin fails)
- Pin CA certificate on managed devices (MDM policy)
- WIDS/WIPS with automatic containment
- VPN on all untrusted networks
- User awareness training: verify network before entering credentials
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
- Captive portal with terms of service
- WPA2/WPA3 Personal or Open + captive portal
```

**Authentication:**
```
Corporate Network:
- 802.1X (RADIUS)
- EAP-TLS (strongest) or PEAP-MSCHAPv2
- Integrate with Active Directory / LDAP
- Certificate validation on clients (prevent evil twin)
- MFA where supported

Small Office:
- WPA2/WPA3-Personal
- Strong passphrase (20+ characters, random)
- Rotate quarterly or on personnel changes

Guest Network:
- Separate authentication (captive portal)
- Time-limited access (session and account expiry)
- Bandwidth throttling
- No access to corporate resources
```

**SSID Management:**
```
Broadcasting:
- Broadcast SSID (hiding doesn't improve security)
- Hidden SSID = security through obscurity (ineffective)
- Hidden SSID causes client devices to probe for it everywhere

Naming:
- Avoid revealing information (company name, location, floor)
- Generic name reduces targeted attacks

Bad:  "CompanyName-HQ-Floor3"
Good: "Corporate-WiFi"

Multiple SSIDs:
- Corporate (WPA3-Enterprise, employee access)
- Guest (WPA2-Personal/Portal, visitor access)
- IoT (Separate VLAN, segmented, restricted)
- BYOD (Separate VLAN, limited corporate access)
```

### Network Segmentation

**VLAN Segmentation:**
```
Segmentation Strategy:
- Corporate: VLAN 50 (full access, managed devices)
- BYOD:     VLAN 55 (limited access, personal devices)
- Guest:    VLAN 60 (Internet only, isolated)
- IoT:      VLAN 70 (restricted, monitored)

Dynamic VLAN Assignment (802.1X):
User → Authenticate → RADIUS returns VLAN tag
- Employees (managed device)    → VLAN 50
- Employees (personal device)   → VLAN 55
- Contractors                   → VLAN 55
- Guests                        → VLAN 60

RADIUS Attribute:
Tunnel-Type = VLAN
Tunnel-Medium-Type = IEEE-802
Tunnel-Private-Group-ID = 50
```

**Micro-Segmentation:**
```
Beyond VLANs — Per-SSID and Per-Client Controls:

1. Per-SSID ACLs:
   - Each SSID mapped to unique ACL on the controller
   - Corporate SSID: permit internal + Internet
   - Guest SSID: permit Internet, deny RFC 1918
   - IoT SSID: permit only specific cloud endpoints

2. Dynamic ACLs via RADIUS:
   - RADIUS returns downloadable ACL per user/device
   - Example: Marketing → allow social media
   - Example: Finance → allow ERP, deny social media

   RADIUS Attribute:
   Cisco-AVPair = "ip:inacl#1=permit tcp any host 10.1.1.50 eq 443"
   Cisco-AVPair = "ip:inacl#2=deny ip any 10.0.0.0 0.255.255.255"
   Cisco-AVPair = "ip:inacl#3=permit ip any any"

3. Client Isolation:
   - Prevent wireless clients from communicating directly
   - Essential for guest and BYOD networks
   - Configured per-SSID on the wireless controller
```

**Firewall Rules:**
```
Guest Network:
- Allow outbound HTTP/HTTPS (ports 80, 443)
- Allow DNS (port 53)
- Block all RFC 1918 (internal networks)
- Block inter-guest communication (client isolation)
- Rate limit per client (prevent abuse)

IoT Network:
- Allow only required destinations (whitelist approach)
- Block Internet (if not needed)
- Monitor for anomalous traffic patterns
- Log all connections for forensic analysis
- Deny lateral movement to other VLANs
```

### Wireless Intrusion Detection/Prevention (WIDS/WIPS)

**Architecture and Capabilities:**
```
WIDS (Detection) vs WIPS (Prevention):
- WIDS: Detects threats and alerts administrators
- WIPS: Detects threats AND takes automatic action

Core Detection Capabilities:
- Rogue AP detection (unknown BSSIDs)
- SSID spoofing / evil twin detection
- Deauthentication flood detection
- Unauthorized client detection
- Ad-hoc network detection
- RF interference and jamming detection
- Policy violation detection (e.g., WEP AP on network)

Deployment Models:
1. Integrated: APs split time between serving clients and scanning
   - Pro: Lower cost, no extra hardware
   - Con: Reduced scanning coverage during high traffic

2. Overlay: Dedicated sensor APs for full-time scanning
   - Pro: Continuous monitoring, no impact on client service
   - Con: Additional hardware and licensing cost

3. Hybrid: Mix of integrated and dedicated sensors
   - Most common enterprise deployment

Products:
- Cisco CleanAir / aWIPS
- Aruba WIP (Wireless Intrusion Protection)
- Extreme AirDefense
- Open Source: Kismet (detection only)
```

**Rogue AP Detection and Containment:**
```
Detection Methods:
1. RF Scanning:
   - Scan all 2.4 GHz and 5 GHz channels
   - Compare discovered BSSIDs to authorized AP database
   - Alert on unknown BSSIDs

2. Wired-Side Correlation:
   - Match wireless BSSID MAC to wired switch MAC table
   - If rogue AP is on the corporate network → high severity
   - If rogue is neighbor's AP → classify as external (lower risk)

3. SSID Spoofing Detection:
   - Alert when authorized SSID appears on unauthorized BSSID
   - Evil twin indicator

Containment Techniques:
1. Over-the-Air Containment:
   - WIPS sends deauth frames to clients of the rogue AP
   - Clients disconnect and rejoin legitimate AP
   - Caution: legal implications (only contain APs on your network)

2. Wired-Side Containment:
   - Disable switch port connected to rogue AP
   - Requires wired-side correlation
   - More effective and less legally risky

3. Alert-Only Mode:
   - Notify security team for manual investigation
   - Appropriate when automatic containment is too aggressive

Alert Policies:
- Rogue on wire: CRITICAL (immediate containment)
- SSID spoofing: HIGH (potential evil twin)
- Unknown AP (not on wire): MEDIUM (may be neighbor)
- Ad-hoc network: LOW (policy violation)
```

### Wireless Security Auditing

**Periodic Penetration Testing:**
```
Scope:
- Attempt to crack WPA2-PSK passphrases
- Test evil twin resilience (do clients validate certificates?)
- Verify client isolation (can guests reach internal hosts?)
- Verify VLAN segmentation from wireless side
- Test for rogue AP detection response time

Methodology:
1. Passive reconnaissance (airodump-ng, Kismet)
2. Attempt handshake capture and offline cracking
3. Deploy evil twin, measure time to WIDS detection
4. Test ACLs from each SSID/VLAN
5. Attempt lateral movement from guest to corporate
6. Document findings and remediation steps

Frequency:
- Full penetration test: Annually (or after major changes)
- Automated scanning: Monthly
- Continuous WIDS monitoring: Always-on
```

**Compliance Scanning:**
```
What to Verify:
- No WEP or WPA/TKIP APs active (PCI DSS requirement)
- All APs running current firmware
- 802.1X properly configured on corporate SSIDs
- Management Frame Protection (802.11w) enabled
- Default AP credentials changed
- RADIUS shared secrets are strong and unique per AP
- Guest network properly isolated

Tools:
- Wireless controller built-in compliance reports
- Nessus/OpenVAS with wireless plugins
- Custom scripts checking controller API

Regulatory Frameworks:
- PCI DSS 4.0: Requirement 2.2.7, 4.2.1 (wireless encryption)
- HIPAA: Technical safeguards for ePHI over wireless
- NIST 800-153: Wireless LAN security guidelines
```

**802.11 Frame Analysis:**
```
Purpose: Deep inspection of wireless frames for anomalies

Key Analysis Areas:
1. Management Frames:
   - Excessive deauth/disassoc → possible attack
   - Beacons from unknown BSSIDs → possible rogue
   - Probe responses with corporate SSID from unknown source

2. Control Frames:
   - Excessive CTS without preceding RTS → CTS spoofing DoS
   - Abnormal NAV (Network Allocation Vector) values

3. Data Frames:
   - WEP-encrypted frames → policy violation
   - Unencrypted data frames → misconfigured AP
   - Unusual frame sizes → possible exfiltration

Tools:
- Wireshark with wireless capture (monitor mode)
- OmniPeek (enterprise wireless analysis)
- Eye P.A. (packet analysis visualization)

Wireshark Display Filters:
  wlan.fc.type == 0             # Management frames
  wlan.fc.type_subtype == 0x0c  # Deauthentication
  wlan.fc.type_subtype == 0x08  # Beacon
  wlan.fc.protected == 0        # Unencrypted frames
```

### Incident Response for Wireless

**Rogue AP Detected — Response Procedure:**
```
Step 1: Classify (0-15 minutes)
- Is the rogue on the corporate wired network?
  → If YES: CRITICAL — contains path to internal resources
  → If NO: May be neighbor AP — lower priority
- Is the SSID spoofing a corporate network name?
  → If YES: Likely evil twin — escalate immediately

Step 2: Contain (15-30 minutes)
- Enable WIPS containment (over-the-air deauth of rogue clients)
- Disable switch port if wired-side correlation is confirmed
- Do NOT physically remove yet (preserve evidence)

Step 3: Investigate (30-60 minutes)
- Triangulate physical location using WIDS RF data
- Retrieve the device
- Analyze:
  - Who installed it? (MAC OUI vendor, device model)
  - Configuration (open? forwarding traffic?)
  - Connected clients (who was affected?)
  - Traffic captures (any data exfiltration?)

Step 4: Eradicate
- Remove the rogue AP from the network
- Revoke any compromised credentials
- Rotate PSK if shared key was potentially exposed
- Patch switch port with 802.1X if not already enabled

Step 5: Recover and Document
- Verify legitimate services restored
- Update authorized AP inventory
- Document timeline, actions taken, and root cause
- Update WIDS policies if detection was delayed
```

**Unauthorized Client Detected — Response Procedure:**
```
Step 1: Identify
- WIDS alert: unknown MAC on corporate SSID
- Determine if client authenticated (802.1X) or bypassed controls
- Check RADIUS logs for authentication attempts

Step 2: Assess
- If authenticated: valid credentials may be compromised
- If not authenticated: indicates AP misconfiguration or vulnerability
- Check what resources the client accessed (firewall/proxy logs)

Step 3: Respond
- Block MAC address on wireless controller
- Disable compromised user account if credential theft suspected
- Force re-authentication of all sessions on affected SSID
- If 802.1X bypass: investigate AP configuration immediately

Step 4: Follow-Up
- Review and tighten MAC filtering policies (defense in depth only)
- Verify NAC posture checks are functioning
- Conduct targeted security awareness if insider threat
- Update incident response playbook with lessons learned
```

## Summary

In this lesson, we explored wireless security threats, defenses, and enterprise authentication. WEP (RC4, 24-bit IV) is completely broken and must never be used; WPA (TKIP) is deprecated; WPA2 uses AES-CCMP as the current minimum standard; and WPA3 adds SAE for offline-dictionary-attack resistance and mandatory Management Frame Protection (802.11w) to block deauthentication attacks. Enterprise wireless should use 802.1X with RADIUS — EAP-TLS (mutual certificate authentication) is the strongest method, while PEAP wraps MSCHAPv2 credentials inside a TLS tunnel for environments using Active Directory. The wireless attack kill chain progresses through reconnaissance (wardriving, probe monitoring), enumeration (BSSID fingerprinting), exploitation (evil twin, handshake capture, MITM), and post-exploitation (lateral movement, data exfiltration). Key defenses include strong encryption, WIDS/WIPS for rogue AP detection, guest network isolation on separate VLANs, and TX power tuning to reduce signal leakage beyond facility boundaries.

## Practice Questions


**Q1.** Which encryption protocol does WPA2 use to protect wireless data?

A) RC4 with TKIP
B) AES-CCMP
C) DES with CBC
D) Blowfish

<details>
<summary>Answer</summary>

**B)** WPA2 uses AES-CCMP (Advanced Encryption Standard with Counter Mode CBC-MAC Protocol) for data encryption. RC4 with TKIP was used by WPA (not WPA2). DES and Blowfish are not used in any Wi-Fi security standard.
</details>


**Q2.** What type of wireless attack involves an attacker broadcasting a fake access point with the same SSID as a legitimate network to intercept traffic?

A) Wardriving
B) Bluesnarfing
C) Evil twin
D) Deauthentication flood

<details>
<summary>Answer</summary>

**C)** An evil twin attack uses a rogue access point configured with the same SSID as a legitimate network to trick users into connecting to it, enabling man-in-the-middle interception. Wardriving is passive reconnaissance of wireless networks. Bluesnarfing targets Bluetooth. A deauthentication flood is a denial-of-service technique, not an impersonation attack.
</details>


**Q3.** A company wants the strongest wireless authentication for its managed corporate laptops. Which EAP method should they deploy?

A) EAP-FAST
B) PEAP-MSCHAPv2
C) EAP-TLS
D) EAP-MD5

<details>
<summary>Answer</summary>

**C)** EAP-TLS provides the strongest wireless authentication by using mutual certificate-based authentication (both client and server present certificates), eliminating password-based vulnerabilities. PEAP-MSCHAPv2 is strong but still relies on passwords inside a TLS tunnel. EAP-FAST uses PACs instead of certificates and is Cisco-proprietary. EAP-MD5 provides only one-way authentication and is considered weak.
</details>


**Q4.** A network administrator notices an unknown access point on the network with an unusually strong signal during a routine wireless survey. What should the administrator suspect and do first?

A) Ignore it — it is likely a neighbor's AP
B) Suspect a rogue access point and use wireless intrusion detection to locate it
C) Disable all wireless networks immediately
D) Change the SSID of the corporate wireless network

<details>
<summary>Answer</summary>

**B)** An unknown access point with a strong signal on the corporate network is a likely rogue AP, which could be used for data interception or network attacks. The administrator should use WIDS/WIPS tools to locate and identify the device. Ignoring it creates a security risk. Disabling all wireless is disruptive and unnecessary. Changing the SSID does not address the rogue device.
</details>


**Q5.** Why is WPA2-Enterprise with 802.1X considered significantly more secure than WPA2-Personal for corporate environments?

A) WPA2-Enterprise uses a longer encryption key than WPA2-Personal
B) WPA2-Enterprise authenticates each user individually through a RADIUS server, while WPA2-Personal uses a single shared passphrase for all users
C) WPA2-Enterprise uses WPA3 encryption under the hood
D) WPA2-Personal does not encrypt wireless traffic

<details>
<summary>Answer</summary>

**B)** WPA2-Enterprise uses 802.1X with a RADIUS server to authenticate each user individually, generating unique per-session encryption keys. WPA2-Personal uses a single pre-shared key (PSK) shared by all users, meaning anyone with the passphrase can access the network and potentially decrypt other users' traffic. Both use AES-CCMP encryption (same key length), and WPA2-Personal does encrypt traffic.
</details>


## References

- CompTIA Network+ N10-009 Exam Objectives: Objective 4.3 — Given a scenario, apply network hardening techniques (wireless security)
- IEEE 802.11-2020: Wireless LAN Medium Access Control (MAC) and Physical Layer (PHY) Specifications
- IEEE 802.11i: Amendment for Enhanced Security (WPA2/WPA3 foundation)
- NIST SP 800-153: Guidelines for Securing Wireless Local Area Networks (WLANs)
- Wi-Fi Alliance: WPA3 Specification and Security Enhancements
- Stallings, W. (2021). *Network Security Essentials: Applications and Standards* (7th ed.). Pearson — Wireless Network Security
