---
id: lesson-093-network-architecture-review
title: "Network Architecture Review: A Packet's Journey"
chapterId: ch10-exam-prep
order: 93
duration: 75
objectives:
  - "Trace a complete packet journey from application to destination across all OSI layers"
  - "Connect concepts from all 9 prior chapters into a unified mental model"
  - "Identify every protocol, device, and decision point in an end-to-end flow"
  - "Diagnose where in the journey common failure modes occur"
  - "Build a comprehensive mental model for Network+ exam troubleshooting scenarios"
---

# Network Architecture Review: A Packet's Journey

## Introduction

This final lesson ties together **everything** you've learned across Chapters 1-9 by following a single user action — opening a web page — through every layer, device, and protocol involved. By the end, you'll have a unified mental model of how networks actually work, end to end.

> **Why this matters for the exam**: CompTIA Network+ questions often test your ability to identify which protocol or device is responsible at a specific point in a flow. This lesson gives you the complete map.

---

## The Scenario

**Alice**, an employee at MedTech Solutions (our capstone company), sits at her desk in the Denver HQ and opens her browser. She types `https://ehr.medtech.com` and presses Enter.

Let's trace every step of what happens.

---

## Step 1: Application Layer — The Browser's Request

### 1.1 URL Parsing

The browser parses the URL:
- **Scheme**: `https` → Port 443, TLS required
- **Host**: `ehr.medtech.com` → Needs DNS resolution
- **Path**: `/` (implicit)

### 1.2 HSTS Check

The browser checks its **HSTS (HTTP Strict Transport Security)** preload list. If `ehr.medtech.com` has been visited before with an HSTS header, the browser **won't even attempt** HTTP — it goes straight to HTTPS.

### 1.3 Browser Cache Check

Before any network activity:
1. Check **browser DNS cache** — has this hostname been resolved recently?
2. Check **HTTP cache** — is there a valid cached response? (Check `Cache-Control`, `ETag`, `Last-Modified`)
3. Check **HSTS cache** — force HTTPS?

**If cache miss on DNS** → proceed to DNS resolution.

---

## Step 2: DNS Resolution — Finding the IP Address

### 2.1 The DNS Resolution Chain

```
  Alice's PC            Recursive Resolver       Root NS         .com TLD NS      Authoritative NS
  (Stub Resolver)       (10.10.10.1)             (a.root-servers) (a.gtld-servers) (ns1.medtech.com)
       │                      │                       │                │                │
       │──── A? ehr.medtech  │                       │                │                │
       │     .com ──────────►│                       │                │                │
       │                      │── A? ehr.medtech ───►│                │                │
       │                      │   .com                │                │                │
       │                      │◄── Referral: ask ────│                │                │
       │                      │    .com TLD servers   │                │                │
       │                      │                       │                │                │
       │                      │── A? ehr.medtech ────────────────────►│                │
       │                      │   .com                │                │                │
       │                      │◄── Referral: ask ─────────────────────│                │
       │                      │    ns1.medtech.com    │                │                │
       │                      │                       │                │                │
       │                      │── A? ehr.medtech ──────────────────────────────────────►│
       │                      │   .com                │                │                │
       │                      │◄── A: 10.30.100.10 ────────────────────────────────────│
       │                      │    TTL: 300           │                │                │
       │◄── A: 10.30.100.10 ─│                       │                │                │
       │    TTL: 300          │                       │                │                │
```

### 2.2 What's Happening at Each Layer

| Step | Layer | Protocol | Detail |
|------|-------|----------|--------|
| App constructs query | L7 | DNS | Query type A, class IN, name ehr.medtech.com |
| DNS message created | L7/L4 | UDP | DNS query → UDP port 53 (or TCP if response >512 bytes) |
| Socket created | L4 | UDP | Source port: ephemeral (e.g., 51234), Dest: 53 |
| IP packet built | L3 | IPv4 | Src: 10.10.20.50, Dst: 10.10.10.1 (DNS server from DHCP) |
| ARP resolution | L2 | ARP | "Who has 10.10.10.1?" → Gets MAC of default gateway |
| Frame sent | L1/L2 | Ethernet | Dst MAC: gateway MAC, Src MAC: Alice's NIC, EtherType: 0x0800 |

### 2.3 DNSSEC Validation (If Enabled)

If the resolver validates DNSSEC:
1. Check RRSIG on the A record (signed by `medtech.com` zone key)
2. Validate DNSKEY for `medtech.com` against DS record in `.com` zone
3. Chain of trust up to the root zone's trust anchor
4. If validation fails → **SERVFAIL** (record not returned)

**Protocols involved**: DNS (UDP/53), ARP (L2), Ethernet (L2), IPv4 (L3)

---

## Step 3: TCP Three-Way Handshake — Establishing the Connection

Now Alice's browser knows the server IP is `10.30.100.10` (the EHR server in the Phoenix data center).

### 3.1 The Handshake

```
Alice (10.10.20.50)                          EHR Server (10.30.100.10)
       │                                              │
       │──── SYN ───────────────────────────────────►│
       │     Seq=1000, Win=65535                      │
       │     MSS=1460, SACK Permitted                 │
       │     Window Scale=7                           │
       │                                              │
       │◄─── SYN-ACK ───────────────────────────────│
       │     Seq=5000, Ack=1001                       │
       │     MSS=1460, SACK Permitted                 │
       │     Window Scale=7                           │
       │                                              │
       │──── ACK ───────────────────────────────────►│
       │     Seq=1001, Ack=5001                       │
       │     [Connection ESTABLISHED]                 │
```

### 3.2 What Happens at Each Device Along the Path

The SYN packet traverses multiple devices. Let's trace it:

```
Alice's PC → Access Switch → Distribution Switch → Core Switch → Firewall 
→ WAN Router → MPLS Network → DC Router → DC Firewall → Spine Switch 
→ Leaf Switch → EHR Server
```

**At each hop**:

| Device | Layer | Action |
|--------|-------|--------|
| **Access Switch** | L2 | Looks up dst MAC in CAM table → forwards to uplink port |
| **Distribution Switch** | L3 | Inter-VLAN routing (VLAN 20 → VLAN routing table). Decrements TTL. Rewrites src/dst MAC |
| **Core Switch** | L3 | OSPF route lookup → next hop is WAN router. Rewrites MAC addresses |
| **Firewall** | L3-L7 | Stateful inspection: creates session entry (src:10.10.20.50:51235 → dst:10.30.100.10:443). IPS inspection. Allows SYN |
| **WAN Router** | L3 | OSPF/BGP lookup → MPLS label push (label 42). Encapsulates in MPLS header |
| **MPLS Network** | L2.5 | Label switching — no IP lookup! Each P-router swaps labels until PE-router pops label |
| **DC Firewall** | L3-L7 | Stateful inspection — creates reverse session entry. Allows SYN |
| **Spine/Leaf** | L3/L2 | ECMP routing to appropriate leaf → L2 forward to server port |
| **EHR Server** | L4 | TCP stack receives SYN, allocates socket, responds SYN-ACK |

### 3.3 The Firewall Session Table

After the three-way handshake, the HQ firewall's session table contains:

```
Session ID: 847291
Src: 10.10.20.50:51235
Dst: 10.30.100.10:443
Protocol: TCP
State: ESTABLISHED
Bytes In: 0
Bytes Out: 128
Timeout: 3600s
NAT: None (internal traffic)
Policy: Allow-EHR-Access (rule 15)
App-ID: ssl (will update to "ehr-medtech" after TLS inspection)
```

---

## Step 4: TLS 1.3 Handshake — Securing the Connection

### 4.1 TLS 1.3 Message Flow

```
Alice's Browser                              EHR Server
       │                                          │
       │──── ClientHello ────────────────────────►│
       │     Supported versions: TLS 1.3          │
       │     Cipher suites: TLS_AES_256_GCM_SHA384│
       │     Key share: X25519 (+ ML-KEM hybrid?) │
       │     SNI: ehr.medtech.com                 │
       │     ALPN: h2, http/1.1                   │
       │                                          │
       │◄─── ServerHello ────────────────────────│
       │     Selected: TLS_AES_256_GCM_SHA384     │
       │     Key share: X25519                    │
       │     {EncryptedExtensions}                 │
       │     {Certificate}                         │
       │     {CertificateVerify}                   │
       │     {Finished}                            │
       │     ← Everything after ServerHello is     │
       │       encrypted (0-RTT improvement)       │
       │                                          │
       │──── {Finished} ────────────────────────►│
       │     [TLS Session Established]             │
       │     [Symmetric key derived via HKDF]      │
       │                                          │
```

### 4.2 Certificate Chain Validation

Alice's browser validates the server certificate:

```
1. ehr.medtech.com certificate
   ├── Issued by: DigiCert TLS RSA SHA256 2024 CA1
   ├── Valid: 2024-01-15 to 2025-01-15
   ├── SAN: ehr.medtech.com, *.medtech.com
   ├── Key: RSA 2048-bit
   └── OCSP Stapling: Good (checked via TLS extension)

2. DigiCert TLS RSA SHA256 2024 CA1 (Intermediate CA)
   ├── Issued by: DigiCert Global Root G2
   └── Valid: 2023-03-08 to 2033-03-08

3. DigiCert Global Root G2 (Root CA)
   └── In browser's trusted root store ✓

Chain valid ✓ | Expiry valid ✓ | OCSP Good ✓ | SAN matches ✓
```

### 4.3 Key Derivation

Once the handshake completes:
- **ECDHE shared secret** computed from X25519 key exchange
- **HKDF** (HMAC-based Key Derivation Function) derives:
  - Client write key (for encrypting client → server data)
  - Server write key (for encrypting server → client data)
  - Client write IV, Server write IV
- **Forward secrecy**: Even if the server's RSA key is later compromised, past sessions cannot be decrypted (ephemeral keys are discarded)

---

## Step 5: HTTP/2 Request — Fetching the Page

### 5.1 The HTTP Request (Inside the TLS Tunnel)

```
:method: GET
:authority: ehr.medtech.com
:path: /
:scheme: https
accept: text/html,application/xhtml+xml
accept-encoding: gzip, br
accept-language: en-US
cookie: session_id=a8b3c9d1e2f4; csrf_token=x7y8z9
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130
```

### 5.2 HTTP/2 Features in Action

| Feature | What Happens |
|---------|-------------|
| **Multiplexing** | Multiple requests share one TCP connection (no head-of-line blocking at HTTP layer) |
| **Header compression** (HPACK) | Headers compressed from ~800 bytes to ~50 bytes using static/dynamic tables |
| **Server push** | Server proactively sends CSS/JS files it knows the browser will need |
| **Stream prioritization** | HTML document gets priority over images |
| **Binary framing** | HTTP/2 uses binary frames, not text (more efficient parsing) |

### 5.3 The Response

```
:status: 200
content-type: text/html; charset=utf-8
content-encoding: br  (Brotli compression)
strict-transport-security: max-age=31536000; includeSubDomains
content-security-policy: default-src 'self'; script-src 'self' cdn.medtech.com
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
set-cookie: session_id=a8b3c9d1e2f4; Secure; HttpOnly; SameSite=Strict

[HTML body: 45 KB compressed, 180 KB uncompressed]
```

---

## Step 6: The Return Path — Response Delivery

### 6.1 QoS Classification

As the response traverses the network, QoS policies apply:

| Device | QoS Action | DSCP Marking |
|--------|-----------|--------------|
| DC Leaf Switch | Classify as business-critical | AF31 (DSCP 26) |
| DC Spine | Honor marking, priority queue | AF31 forwarded |
| MPLS PE Router | Map DSCP to MPLS EXP bits | EXP=3 |
| MPLS P Routers | Forward based on EXP | Priority scheduling |
| HQ WAN Router | Map EXP back to DSCP | AF31 restored |
| HQ Core Switch | Forward to distribution | Trust DSCP |
| HQ Distribution | Inter-VLAN routing | Best-effort (VLAN 20 not marked separately) |
| HQ Access Switch | Deliver to port | Port queue |

### 6.2 Meanwhile, on Alice's VLAN

At the same time Alice's web request is in flight, other traffic competes:

```
Priority Queue (DSCP EF):     VoIP calls from IP phones on VLAN 25
                               ← Strict priority, guaranteed <150ms latency

AF Queue (DSCP AF31):         EHR web traffic (Alice's request)
                               ← Guaranteed minimum bandwidth

Best Effort (DSCP 0):         Email sync, Windows updates, Slack
                               ← Gets remaining bandwidth

Scavenger (DSCP CS1):         Guest WiFi traffic
                               ← Rate-limited, dropped first during congestion
```

---

## Step 7: Putting It All Together — The Complete Stack

### 7.1 Protocol Stack at Each Layer (Alice's Request)

```
┌──────────────────────────────────────────────────────────┐
│ Layer 7: Application                                      │
│   HTTP/2 GET / (multiplexed stream, HPACK compressed)     │
├──────────────────────────────────────────────────────────┤
│ Layer 6: Presentation                                     │
│   TLS 1.3 (AES-256-GCM encryption, X25519 key exchange)  │
├──────────────────────────────────────────────────────────┤
│ Layer 5: Session                                          │
│   TLS session management (session tickets for resumption) │
├──────────────────────────────────────────────────────────┤
│ Layer 4: Transport                                        │
│   TCP (Seq/Ack, window scaling, SACK, Nagle algorithm)    │
│   Src port: 51235, Dst port: 443                          │
├──────────────────────────────────────────────────────────┤
│ Layer 3: Network                                          │
│   IPv4 (Src: 10.10.20.50, Dst: 10.30.100.10, TTL: 64)   │
│   DSCP: AF31 (QoS marking)                                │
├──────────────────────────────────────────────────────────┤
│ Layer 2: Data Link                                        │
│   Ethernet II (Src MAC: Alice's NIC, Dst MAC: Gateway)    │
│   VLAN tag: 802.1Q VLAN 20                                │
│   (Changes at every L3 hop — MAC rewritten by each router)│
├──────────────────────────────────────────────────────────┤
│ Layer 1: Physical                                         │
│   Cat6A → 1000BASE-T to access switch                     │
│   Switch uplinks: 10GBASE-SR (multi-mode fiber)           │
│   WAN: Single-mode fiber to MPLS provider                 │
└──────────────────────────────────────────────────────────┘
```

### 7.2 Every Protocol Involved

| Protocol | Layer | Role in This Flow |
|----------|-------|-------------------|
| **ARP** | 2 | Resolve gateway MAC address |
| **Ethernet** | 2 | Frame delivery on each LAN segment |
| **802.1Q** | 2 | VLAN tagging (VLAN 20 for corporate data) |
| **STP/RSTP** | 2 | Prevents loops on redundant switch links |
| **IPv4** | 3 | End-to-end addressing and routing |
| **OSPF** | 3 | Interior routing (HQ → WAN router → DC) |
| **MPLS** | 2.5 | Label switching across WAN (no IP lookup per hop) |
| **TCP** | 4 | Reliable, ordered delivery |
| **TLS 1.3** | 5-6 | Encryption, authentication, integrity |
| **HTTP/2** | 7 | Application data transfer |
| **DNS** | 7 | Initial hostname resolution |
| **DHCP** | 7 | Alice's PC got its IP, gateway, DNS server at boot |
| **802.1X** | 2 | Alice's PC authenticated to the switch at connection |
| **RADIUS** | 7 | 802.1X backend; verified Alice's credentials against AD |
| **NTP** | 7 | Time sync (certificates, logs, kerberos all need accurate time) |
| **SNMPv3** | 7 | Every device monitored; utilization, errors reported to NMS |
| **Syslog** | 7 | Firewall session events logged to Splunk |

---

## Step 8: What Can Go Wrong — Failure Mode Analysis

### Layer-by-Layer Troubleshooting

| Failure | Layer | Symptom | Tool | Resolution |
|---------|-------|---------|------|------------|
| Cable unplugged | L1 | No link light | `show interface status` | Reseat cable, check patch panel |
| Duplex mismatch | L1/L2 | Slow, many errors | `show interface` (CRC errors) | Set both sides to auto-negotiate |
| VLAN mismatch | L2 | No connectivity, can't ping gateway | `show vlan brief` | Correct switchport VLAN assignment |
| STP blocking | L2 | Intermittent connectivity | `show spanning-tree` | Check topology, verify root bridge |
| Wrong subnet mask | L3 | Can ping some hosts, not others | `ipconfig`, `show ip interface` | Correct subnet mask |
| OSPF neighbor down | L3 | No route to data center | `show ip ospf neighbor` | Check area ID, hello timers, auth |
| Firewall blocking | L3-L7 | Connection timeout | Firewall logs | Add/modify policy rule |
| DNS failure | L7 | "Server not found" | `nslookup`, `dig` | Check DNS server, records |
| Certificate expired | L5-L6 | Browser security warning | Check cert dates | Renew certificate |
| MTU mismatch | L3 | Large transfers fail, small pings work | `ping -f -l 1472` | Set consistent MTU or enable PMTUD |
| ACL denying traffic | L3-L4 | Connection refused | `show access-lists` (hit counters) | Modify ACL entries |

### Common Multi-Layer Failures

**Scenario**: "Alice can ping the EHR server but can't load the web page"

```
Troubleshooting decision tree:

1. Ping works → L1, L2, L3 are OK
2. Can she reach port 443? → telnet 10.30.100.10 443
   - If timeout → Firewall blocking TCP 443 (L4 issue)
   - If connection refused → Server not listening on 443 (L7 issue)
   - If connects → TLS or HTTP issue
3. Check TLS → openssl s_client -connect 10.30.100.10:443
   - Certificate error → Expired, wrong CN, untrusted CA (L6)
   - Handshake failure → Cipher mismatch or TLS version mismatch
4. Check HTTP → curl -v https://ehr.medtech.com
   - 403 Forbidden → Application authorization issue (L7)
   - 503 Service Unavailable → Backend server down (L7)
   - 301 Redirect loop → HTTP/HTTPS config issue (L7)
```

---

## Step 9: The Supporting Cast — Background Protocols

While Alice's single web request happens, these protocols are continuously running:

### 9.1 Spanning Tree (STP/RSTP)

Every 2 seconds, switches exchange BPDUs to maintain a loop-free topology:

```
Root Bridge (Core-1, Priority 4096)
    │
    ├── Designated Port → Distribution-A (Root Port)
    │                          │
    │                          ├── DP → Access-1 (RP)
    │                          └── DP → Access-2 (RP)
    │
    └── Designated Port → Distribution-B (Root Port)
                               │
                               ├── DP → Access-3 (RP)
                               └── DP → Access-4 (RP ── Backup: Alternate Port)
```

If Core-1 fails, RSTP converges in <1 second: Core-2 becomes root, alternate ports transition to forwarding.

### 9.2 FHRP (HSRP/VRRP)

Alice's default gateway (10.10.20.1) is a **virtual IP** shared between two distribution switches:

```
Distribution-A (10.10.20.2) ── Active (Priority 110)    ─┐
                                                           ├── VIP: 10.10.20.1
Distribution-B (10.10.20.3) ── Standby (Priority 100)   ─┘
```

If Distribution-A fails, Distribution-B takes over the VIP within ~3 seconds (HSRP) or ~1 second (VRRP) — Alice's traffic continues with no IP change.

### 9.3 NTP Synchronization

All devices sync time to a stratum hierarchy:

```
Stratum 0: GPS/Atomic clock
Stratum 1: Core router (NTP server) ← syncs to pool.ntp.org
Stratum 2: Distribution switches, firewalls ← sync to core
Stratum 3: Access switches, APs ← sync to distribution
```

Accurate time is critical for: log correlation (Splunk), certificate validation, Kerberos authentication (5-minute tolerance), OSPF hello timers.

---

## Step 10: The Big Picture — Mental Model

```
┌─────────────────────────────────────────────────────────────────┐
│                        THE NETWORK STACK                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  USER EXPERIENCE                                           │ │
│  │  "I clicked a link and the page loaded"                    │ │
│  └────────────────────────────┬───────────────────────────────┘ │
│                               │                                  │
│  ┌────────────────────────────┴───────────────────────────────┐ │
│  │  APPLICATION PROTOCOLS (L5-L7)                              │ │
│  │  DNS → TLS → HTTP/2 → Application Logic                    │ │
│  │  + Supporting: DHCP, NTP, RADIUS, Syslog, SNMP             │ │
│  └────────────────────────────┬───────────────────────────────┘ │
│                               │                                  │
│  ┌────────────────────────────┴───────────────────────────────┐ │
│  │  TRANSPORT (L4)                                             │ │
│  │  TCP: Reliability, ordering, flow control, congestion ctrl  │ │
│  │  UDP: Low-overhead for DNS, VoIP, DHCP, SNMP               │ │
│  └────────────────────────────┬───────────────────────────────┘ │
│                               │                                  │
│  ┌────────────────────────────┴───────────────────────────────┐ │
│  │  NETWORK (L3)                                               │ │
│  │  IPv4/IPv6: Addressing, routing, fragmentation              │ │
│  │  OSPF/BGP: Path selection                                   │ │
│  │  MPLS: WAN label switching                                  │ │
│  │  ACLs/Firewall: Traffic filtering                           │ │
│  │  QoS: DSCP marking, queuing                                 │ │
│  └────────────────────────────┬───────────────────────────────┘ │
│                               │                                  │
│  ┌────────────────────────────┴───────────────────────────────┐ │
│  │  DATA LINK (L2)                                             │ │
│  │  Ethernet: MAC addressing, frame delivery                   │ │
│  │  802.1Q: VLAN tagging                                       │ │
│  │  STP/RSTP: Loop prevention                                  │ │
│  │  ARP: IP-to-MAC resolution                                  │ │
│  │  802.1X: Port authentication                                │ │
│  └────────────────────────────┬───────────────────────────────┘ │
│                               │                                  │
│  ┌────────────────────────────┴───────────────────────────────┐ │
│  │  PHYSICAL (L1)                                              │ │
│  │  Cat6A copper, multi-mode fiber, single-mode fiber          │ │
│  │  1000BASE-T, 10GBASE-SR, 100GBASE-LR4                     │ │
│  │  WiFi: 802.11ax (5 GHz, channel 36, 80 MHz width)          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  MANAGEMENT PLANE (Always Running)                          │ │
│  │  SNMPv3 monitoring │ Syslog │ NTP │ NETCONF │ Telemetry   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  SECURITY OVERLAY (Every Layer)                             │ │  
│  │  802.1X (L2) → ACLs (L3) → Firewall (L3-7) → TLS (L5-6)  │ │
│  │  → WAF (L7) → DLP → SIEM → Zero Trust                     │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Exam Preparation Checklist

Use this checklist to verify you can explain each concept. If any item feels uncertain, review the corresponding chapter:

### Chapter 1: Network Fundamentals
- [ ] OSI model — role of each layer
- [ ] TCP/IP model mapping
- [ ] Network topologies (star, mesh, hub-and-spoke)
- [ ] Copper and fiber cable types, standards, distances

### Chapter 2: Network Devices and Infrastructure
- [ ] Switch vs router vs firewall — what each inspects
- [ ] PoE standards (802.3af/at/bt)
- [ ] WAP placement, channel planning
- [ ] Virtualization (hypervisor, VMs, containers)

### Chapter 3: IP Addressing and Subnetting
- [ ] IPv4 subnetting (given a /CIDR, calculate network, broadcast, hosts)
- [ ] VLSM for efficient address allocation
- [ ] IPv6 addressing (GUA, LLA, multicast)
- [ ] Private vs public addresses (RFC 1918)

### Chapter 4: Routing and Switching
- [ ] Static vs dynamic routing
- [ ] OSPF areas, LSA types, neighbor states
- [ ] BGP basics (eBGP, iBGP, path attributes)
- [ ] VLANs, trunking (802.1Q), inter-VLAN routing
- [ ] STP/RSTP port roles and states

### Chapter 5: Wireless Networking
- [ ] 802.11 standards (a/b/g/n/ac/ax/be)
- [ ] WPA2/WPA3, 802.1X/EAP authentication
- [ ] Channel planning (1, 6, 11 for 2.4 GHz; DFS for 5 GHz)
- [ ] Antenna types, signal propagation, interference

### Chapter 6: Network Services and Cloud
- [ ] DNS (record types, resolution process, DNSSEC)
- [ ] DHCP (DORA process, relay agents, options)
- [ ] NAT (static, dynamic, PAT)
- [ ] Cloud models (IaaS, PaaS, SaaS, hybrid)
- [ ] SDN architecture (controller, data plane, management plane)

### Chapter 7: Network Security
- [ ] Defense in depth
- [ ] Firewall types (stateful, NGFW, WAF)
- [ ] IDS/IPS (signature vs anomaly-based)
- [ ] VPN protocols (IPsec, SSL/TLS, WireGuard)
- [ ] AAA (RADIUS, TACACS+)
- [ ] Common attacks (DDoS, MITM, ARP spoofing, phishing)

### Chapter 8: Network Monitoring and Management
- [ ] SNMP (v2c vs v3, OIDs, MIBs, traps)
- [ ] Syslog (severity levels 0-7, facilities)
- [ ] NetFlow/sFlow (flow-based vs sampled)
- [ ] Baselines, alerting thresholds
- [ ] Configuration management (backup, change control)

### Chapter 9: Network Troubleshooting
- [ ] CompTIA troubleshooting methodology (7 steps)
- [ ] Command-line tools (ping, traceroute, nslookup, netstat, arp, ipconfig)
- [ ] Cable testing (TDR, certifier, toner)
- [ ] Structured approach: isolate by layer (L1 → L2 → L3 → L4-L7)

---

## Key Takeaways

1. **Everything is connected** — A single web request involves 15+ protocols across all 7 OSI layers
2. **MAC addresses change at every L3 hop; IP addresses stay the same end-to-end** — This is the fundamental distinction between L2 and L3
3. **Security exists at every layer** — From 802.1X (L2) through TLS (L5-6) to WAF (L7)
4. **Background protocols are critical** — STP, HSRP, NTP, and SNMP run continuously even when "nothing is happening"
5. **Troubleshooting is elimination** — Start at L1, verify each layer works, narrow down to the failing layer
6. **The exam tests your mental model** — Can you identify which protocol operates at which layer and what happens when it fails?

---

## What's Next

You've now completed the CompTIA Network+ curriculum. Your next steps:

1. **Practice exams** — Take timed practice tests to identify weak areas
2. **Lab practice** — Use Packet Tracer or GNS3 to build the topologies from this course
3. **Schedule your exam** — N10-009 at a Pearson VUE testing center
4. **After certification** — Consider Security+ (CompTIA), CCNA (Cisco), or AWS Cloud Practitioner as your next certification

Good luck on the exam!
