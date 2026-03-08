---
id: lesson-091-network-design-capstone
title: "Capstone: Enterprise Network Design Case Study"
chapterId: ch10-exam-prep
order: 91
duration: 90
objectives:
  - "Apply all networking concepts to a realistic multi-site design project"
  - "Gather and analyze business requirements for network infrastructure"
  - "Design a complete network topology with IP addressing, routing, and security"
  - "Estimate costs and justify design decisions with engineering trade-offs"
  - "Create professional network documentation suitable for stakeholder review"
---

# Capstone: Enterprise Network Design Case Study

## Introduction

This capstone lesson brings together everything you've learned across Chapters 1-9 into a single, realistic network design project. You'll work through the same process a network architect follows: gathering requirements, designing the topology, selecting protocols and equipment, implementing security, and documenting everything.

> **How to approach this lesson**: Read the business scenario, then work through each design section. There are no single "correct" answers — real network design involves trade-offs. The key is **justifying your decisions** with the principles you've learned.

---

## The Scenario: MedTech Solutions

### Company Background

MedTech Solutions is a healthcare technology company with 350 employees. They develop and sell electronic health record (EHR) software and host a SaaS platform for 200+ hospital clients. The company is growing rapidly and needs a network redesign to support expansion.

### Sites and Headcount

| Site | Location | Employees | Current Status |
|------|----------|-----------|----------------|
| **HQ** | Denver, CO | 200 | Existing building, network needs overhaul |
| **Branch Office** | Austin, TX | 80 | New lease, greenfield network deployment |
| **Data Center** | Phoenix, AZ | 20 (NOC staff) | Colocation facility, 4 cabinets |
| **Remote Workers** | Various | 50 | Home offices, VPN access required |

### Business Requirements

1. **Compliance**: Must meet HIPAA requirements (healthcare data, PHI/ePHI)
2. **Uptime**: 99.99% availability for the SaaS platform (≤52.6 minutes downtime/year)
3. **Performance**: EHR application requires <10ms latency between client hospital and data center
4. **Growth**: Network must scale to 500 employees within 3 years
5. **Budget**: $250,000 for initial deployment, $50,000/year operational
6. **Security**: Zero-trust architecture preferred; SOC 2 Type II compliance in progress

### Application Requirements

| Application | Users | Bandwidth | Latency | Protocol | Priority |
|-------------|-------|-----------|---------|----------|----------|
| EHR SaaS Platform | External clients | 500 Mbps sustained | <10ms | HTTPS (443) | Critical |
| Internal EHR Dev/Test | 60 developers | 200 Mbps | <5ms | Various | High |
| VoIP (Cisco UCM) | 280 phones | 100 kbps/call × 50 concurrent | <150ms, <30ms jitter | RTP/SIP | High |
| Video Conferencing | All staff | 5 Mbps/session × 20 concurrent | <200ms | HTTPS/WebRTC | Medium |
| Email (Microsoft 365) | All staff | 50 Mbps | Best effort | HTTPS | Medium |
| Guest WiFi | Visitors | 50 Mbps cap | Best effort | HTTP/HTTPS | Low |
| Building IoT (HVAC, Access) | 100 devices | 10 Mbps | <500ms | MQTT/HTTPS | Medium |

---

## Phase 1: Network Topology Design

### 1.1 Campus Network Architecture (HQ — Denver)

For the 200-person headquarters, we apply the **three-tier hierarchical model** (Core, Distribution, Access):

```
                    ┌─────────────┐
                    │  Core Layer │
                    │ (2× L3 SW)  │
                    │ Redundant   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────┴─────┐ ┌───┴───┐ ┌──────┴─────┐
        │Distribution│ │Distrib│ │Distribution│
        │ Building A │ │  DMZ  │ │ Building B │
        └─────┬─────┘ └───┬───┘ └──────┬─────┘
              │            │            │
        ┌─────┴─────┐     │      ┌─────┴─────┐
        │ Access     │     │      │ Access     │
        │ Floor 1-3  │     │      │ Floor 4-5  │
        │ (6× L2 SW)│     │      │ (4× L2 SW)│
        └───────────┘     │      └───────────┘
                    ┌──────┴──────┐
                    │  Firewall   │
                    │  Cluster    │
                    │ (HA Pair)   │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │   WAN Edge  │
                    │  (2× Router)│
                    └─────────────┘
```

**Design decisions**:
- **Core**: Two Cisco Catalyst 9500 switches in VSS (Virtual Switching System) for L3 redundancy, OSPF backbone
- **Distribution**: Separate distribution blocks per building wing; inter-VLAN routing happens here
- **Access**: Cisco Catalyst 9200 switches; 48-port PoE+ for IP phones and APs; 802.1X authentication
- **Why three-tier instead of collapsed core**: 200+ users across a multi-building campus justifies full three-tier for scalability

### 1.2 Branch Office Architecture (Austin)

For 80 users in a single building, a **collapsed core** (two-tier) model is more cost-effective:

```
        ┌─────────────────┐
        │ Distribution/   │
        │ Core (2× L3 SW) │
        │ OSPF Area 1     │
        └────────┬────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
┌────┴────┐ ┌───┴───┐ ┌─────┴────┐
│ Access  │ │Access │ │ Access   │
│ Floor 1 │ │Floor 2│ │ Server   │
│(2× SW)  │ │(2× SW)│ │ Closet   │
└─────────┘ └───────┘ └──────────┘
```

### 1.3 Data Center Architecture (Phoenix)

Production infrastructure uses a **spine-leaf** topology for east-west traffic optimization:

```
    ┌────────┐    ┌────────┐
    │ Spine 1│    │ Spine 2│   (Full mesh between spines and leaves)
    └───┬────┘    └────┬───┘
        │    ╲    ╱    │
        │     ╲  ╱     │
        │      ╲╱      │
        │      ╱╲      │
        │     ╱  ╲     │
    ┌───┴────┐    ┌────┴───┐
    │ Leaf 1 │    │ Leaf 2 │    (Each leaf = 1 rack pair)
    └───┬────┘    └────┬───┘
        │              │
   [EHR Servers]  [DB Cluster]
   [Web Tier]     [Backup]
```

**Design decision**: Spine-leaf provides predictable low latency for database replication and microservice communication (every server is the same number of hops from every other server).

### 1.4 WAN Connectivity

| Link | Type | Bandwidth | Purpose | Redundancy |
|------|------|-----------|---------|------------|
| HQ ↔ Data Center | MPLS (primary) | 1 Gbps | Production traffic | IPsec VPN over DIA (failover) |
| HQ ↔ Data Center | DIA IPsec VPN (backup) | 500 Mbps | Failover | Automatic failover via PBR |
| Austin ↔ Data Center | SD-WAN (dual ISP) | 500 Mbps aggregate | Branch traffic | Active-active load balancing |
| Austin ↔ HQ | SD-WAN overlay | — | Admin/VoIP | Rides over SD-WAN fabric |
| Remote Workers | Always-On VPN | Per user: 10 Mbps | Remote access | Split tunnel with SaaS direct |

**Why SD-WAN for the branch**: Lower cost than MPLS, application-aware routing for VoIP/video, dual-ISP resilience, centralized policy management.

---

## Phase 2: IP Addressing Scheme

### 2.1 Address Space Allocation

Using **10.0.0.0/8** (RFC 1918 private space) with VLSM:

| Site | Supernet | Notation |
|------|----------|----------|
| HQ Denver | 10.10.0.0/16 | 65,534 addresses |
| Branch Austin | 10.20.0.0/16 | 65,534 addresses |
| Data Center Phoenix | 10.30.0.0/16 | 65,534 addresses |
| WAN Links | 10.255.0.0/24 | Point-to-point /30 and /31 subnets |
| VPN Pool | 10.100.0.0/16 | Remote worker addresses |

### 2.2 VLAN and Subnet Design (HQ)

| VLAN ID | Name | Subnet | Mask | Usable Hosts | Purpose |
|---------|------|--------|------|---------------|---------|
| 10 | MGMT | 10.10.10.0 | /24 | 254 | Switch/AP management |
| 20 | CORP-DATA | 10.10.20.0 | /23 | 510 | Employee workstations |
| 25 | VOIP | 10.10.25.0 | /24 | 254 | IP phones (voice VLAN) |
| 30 | DEV | 10.10.30.0 | /24 | 254 | Developer workstations |
| 40 | WIFI-CORP | 10.10.40.0 | /23 | 510 | Corporate wireless |
| 50 | WIFI-GUEST | 10.10.50.0 | /24 | 254 | Guest wireless (isolated) |
| 60 | IOT | 10.10.60.0 | /24 | 254 | Building IoT devices |
| 99 | NATIVE | 10.10.99.0 | /24 | 254 | Native VLAN (unused) |
| 100 | SERVERS | 10.10.100.0 | /24 | 254 | On-prem servers |

**VLAN design rationale**:
- **Separate voice VLAN (25)**: QoS marking at switch port level (DSCP EF for voice), 802.1p priority, DHCP Option 150 for phone provisioning
- **Isolated guest WiFi (50)**: Cannot reach corporate VLANs; ACLs permit only internet access; captive portal authentication
- **IoT VLAN (60)**: Microsegmented from corporate; only permits MQTT to IoT controller; compensates for often-unpatched IoT firmware
- **/23 for CORP-DATA**: 510 hosts supports 200 employees + growth to 400 without resubnetting

### 2.3 Point-to-Point WAN Links

| Link | Subnet | Side A | Side B |
|------|--------|--------|--------|
| HQ ↔ DC (MPLS) | 10.255.0.0/31 | .0 (HQ) | .1 (DC) |
| HQ ↔ DC (VPN backup) | 10.255.0.2/31 | .2 (HQ) | .3 (DC) |
| HQ ↔ Austin (SD-WAN) | 10.255.0.4/31 | .4 (HQ) | .5 (Austin) |

Using **/31 subnets** (RFC 3021) for point-to-point links conserves address space — no need for network/broadcast addresses on a two-endpoint link.

---

## Phase 3: Routing Protocol Design

### 3.1 OSPF Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        OSPF Area 0 (Backbone)                │
│                                                              │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐         │
│   │  HQ Core │──────│ WAN Edge │──────│ DC Spine │         │
│   │  ABR     │      │  ASBR    │      │  ABR     │         │
│   └────┬─────┘      └──────────┘      └────┬─────┘         │
│        │                                    │                │
└────────┼────────────────────────────────────┼────────────────┘
         │                                    │
    ┌────┴────┐                          ┌────┴────┐
    │ Area 1  │                          │ Area 2  │
    │ HQ      │                          │ DC      │
    │ Distrib │                          │ Leaf    │
    │ + Access│                          │ Layer   │
    └─────────┘                          └─────────┘

    ┌─────────┐
    │ Area 3  │  (Austin branch — stub area)
    │ Branch  │
    │ Austin  │
    └─────────┘
```

**OSPF design decisions**:
- **Multi-area OSPF**: Limits LSA flooding; each site is its own area
- **Area 3 as stub**: Branch doesn't need external routes — default route from ABR suffices, reducing LSDB size on branch routers
- **ASBR at WAN edge**: Redistributes default route from ISP BGP into OSPF
- **Router IDs**: Use Loopback0 addresses (stable, never go down)
- **Authentication**: OSPF MD5 authentication on all adjacencies (prevent rogue router injection)
- **Timers**: Default hello/dead (10/40s) for Ethernet; tuned to 1/4s on point-to-point WAN links for faster convergence

### 3.2 BGP (WAN Edge)

The WAN edge routers run eBGP with two ISPs for internet redundancy:

```
ISP-A (AS 7018) ── eBGP ── WAN-Router-1
                                  │ iBGP
ISP-B (AS 3356) ── eBGP ── WAN-Router-2
```

- **Local preference**: ISP-A preferred for outbound (local-pref 200 vs 100)
- **AS-path prepend**: Outbound on ISP-B to prefer ISP-A for inbound
- **Default route only**: Accept default route from ISPs, not full table (saves memory, simplifies policy)

---

## Phase 4: Security Architecture

### 4.1 Defense in Depth

```
Internet
    │
┌───┴───────────────────────────────────────┐
│  Layer 1: Edge Firewall (Palo Alto HA)    │
│  - Stateful inspection                    │
│  - IPS signatures                         │
│  - TLS decryption (outbound)              │
│  - Geo-IP blocking                        │
└───┬───────────────────────────────────────┘
    │
┌───┴───────────────────────────────────────┐
│  Layer 2: DMZ Segment                     │
│  - Reverse proxy / WAF                    │
│  - Public-facing EHR API endpoints        │
│  - Separate from internal network         │
└───┬───────────────────────────────────────┘
    │
┌───┴───────────────────────────────────────┐
│  Layer 3: Internal Segmentation           │
│  - Micro-segmentation via VLANs + ACLs    │
│  - East-west traffic inspection           │
│  - 802.1X port authentication             │
│  - NAC (posture assessment)               │
└───┬───────────────────────────────────────┘
    │
┌───┴───────────────────────────────────────┐
│  Layer 4: Endpoint Protection             │
│  - EDR agents on all workstations         │
│  - Certificate-based VPN auth             │
│  - Encrypted drives (BitLocker/FileVault) │
└───────────────────────────────────────────┘
```

### 4.2 HIPAA Network Controls

| HIPAA Requirement | Implementation |
|-------------------|----------------|
| Access Control (§164.312(a)) | 802.1X + AD group-based VLANs; MFA for remote access |
| Audit Controls (§164.312(b)) | Centralized syslog (Splunk); NetFlow for traffic analysis |
| Integrity (§164.312(c)) | TLS 1.3 for data in transit; AES-256 for data at rest |
| Transmission Security (§164.312(e)) | IPsec VPN for WAN; WPA3-Enterprise for wireless |
| ePHI Segmentation | Database VLAN isolated; ACLs restrict to app servers only |

### 4.3 Zero-Trust Elements

- **Identity**: All access requires authentication (no implicit trust from network location)
- **Device**: NAC checks device health before granting VLAN access
- **Network**: Micro-segmentation limits lateral movement
- **Application**: WAF + API gateway enforce application-level policies
- **Data**: DLP (Data Loss Prevention) monitors for PHI exfiltration

---

## Phase 5: Wireless Design

### 5.1 AP Placement and Channel Plan

**HQ (5 floors, ~4,000 sq ft per floor)**:

| Floor | APs | Band | Channels | Coverage |
|-------|-----|------|----------|----------|
| 1 (Lobby + Conf) | 4 | 5 GHz: 36,44,149,157 | 2.4 GHz: 1,6,11,1 | High density conference rooms |
| 2 (Engineering) | 6 | 5 GHz: 36,40,44,149,153,157 | 2.4 disabled | Dev workstations — 5 GHz only for throughput |
| 3 (Operations) | 4 | 5 GHz: 36,44,149,157 | 2.4 GHz: 1,6,11,1 | Standard coverage |
| 4 (Executive) | 3 | 5 GHz: 36,149,44 | 2.4 GHz: 1,6,11 | Lower density |
| 5 (NOC + Training) | 4 | 5 GHz: 36,44,149,157 | 2.4 GHz: 1,6,11,1 | Training room high-density |
| **Total** | **21 APs** | | | |

### 5.2 SSID Design

| SSID | VLAN | Auth | Band | Purpose |
|------|------|------|------|---------|
| MedTech-Corp | 40 | WPA3-Enterprise (802.1X/EAP-TLS) | 5 GHz preferred | Employee devices |
| MedTech-IoT | 60 | WPA2-PSK (unique per device via PPSK) | 2.4 + 5 GHz | IoT devices |
| MedTech-Guest | 50 | Captive portal + T&C | 2.4 + 5 GHz | Visitor access |

**Design note**: Limit to 3 SSIDs. Each SSID adds beacon frame overhead — more than 4 SSIDs per radio significantly impacts airtime efficiency.

---

## Phase 6: Monitoring and Management

### 6.1 Network Monitoring Stack

| Tool | Protocol | Purpose |
|------|----------|---------|
| SolarWinds NPM | SNMPv3 | Device monitoring, alerts, dashboards |
| Splunk | Syslog (TLS) | Log aggregation, security analytics |
| Cisco Prime/DNA Center | NETCONF/RESTCONF | Configuration management, compliance |
| ThousandEyes | Synthetic monitoring | SaaS/WAN performance validation |
| Wireshark/ntopng | NetFlow/sFlow | Traffic analysis, troubleshooting |

### 6.2 Alert Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| Link utilization | >70% sustained 15m | >90% sustained 5m | Page NOC, evaluate capacity |
| CPU utilization | >80% sustained 10m | >95% sustained 5m | Escalate to engineering |
| Interface errors | >0.1% error rate | >1% error rate | Check cable, SFP, config |
| BGP peer down | — | Immediate | Auto-failover + page |
| AP client count | >30 clients/radio | >50 clients/radio | Consider AP density increase |

---

## Phase 7: Cost Estimation

### 7.1 Capital Expenditure (CapEx)

| Category | Item | Qty | Unit Cost | Total |
|----------|------|-----|-----------|-------|
| Core Switches | Catalyst 9500-48Y4C | 2 | $18,000 | $36,000 |
| Distribution | Catalyst 9300-48P | 4 | $6,500 | $26,000 |
| Access Switches | Catalyst 9200-48P | 14 | $3,200 | $44,800 |
| Firewalls | Palo Alto PA-3220 HA | 2 | $12,000 | $24,000 |
| WAN Routers | ISR 4431 | 2 | $6,000 | $12,000 |
| Wireless APs | Catalyst 9120AXI | 30 | $1,200 | $36,000 |
| WLC | Catalyst 9800-L | 1 | $8,000 | $8,000 |
| Cabling | Cat6A + fiber | — | — | $25,000 |
| UPS | APC Smart-UPS | 4 | $3,000 | $12,000 |
| Installation | Professional services | — | — | $26,200 |
| **Total CapEx** | | | | **$250,000** |

### 7.2 Operational Expenditure (OpEx) — Annual

| Category | Annual Cost |
|----------|-------------|
| MPLS circuit (1 Gbps) | $18,000 |
| ISP DIA (500 Mbps × 2) | $9,600 |
| SD-WAN licenses | $6,000 |
| Palo Alto Threat Prevention | $5,400 |
| SolarWinds NPM license | $3,000 |
| Cisco DNA Essentials | $8,000 |
| **Total OpEx** | **$50,000** |

---

## Phase 8: Documentation Deliverables

Every professional network design includes:

1. **Network Diagram** — Logical topology showing VLANs, subnets, connections
2. **Physical Topology** — Rack layouts, cable paths, port assignments
3. **IP Address Management (IPAM)** — Complete IP allocation spreadsheet
4. **Configuration Standards** — Templates for switch/router/firewall configs
5. **Runbook** — Procedures for common operations (add VLAN, add user, failover test)
6. **Change Management Plan** — How changes are proposed, tested, approved, implemented
7. **Disaster Recovery Plan** — RTO/RPO targets, backup procedures, failover testing schedule

---

## Self-Assessment Design Challenge

Now it's your turn. Using the MedTech Solutions scenario, modify the design for one of these changes:

1. **Budget cut**: The budget is reduced to $150,000. What do you sacrifice? What stays? Justify every cut.

2. **Acquisition**: MedTech acquires a 40-person company in Seattle. How do you integrate them? What changes to WAN, IP addressing, and routing?

3. **Cloud migration**: The company decides to move the SaaS platform from the Phoenix data center to AWS. How does this change the network architecture? What new services replace physical infrastructure?

4. **Compliance expansion**: In addition to HIPAA, MedTech must now comply with SOC 2 Type II and ISO 27001. What additional network controls are needed?

Consider these questions as you evaluate each scenario:
- What is the impact on availability?
- What security trade-offs are introduced?
- How does this affect operational complexity?
- What is the total cost of ownership (TCO) over 3 years?

---

## Key Takeaways

1. **Requirements drive design** — Always start with business needs, not technology preferences
2. **Defense in depth** — No single security control is sufficient; layer them
3. **Plan for growth** — VLSM, modular topology, and scalable protocols prevent costly redesigns
4. **Document everything** — The network exists in documentation as much as in hardware
5. **Trade-offs are inevitable** — Budget, complexity, performance, and security compete; justify your choices
6. **Compliance is non-negotiable** — In regulated industries, compliance requirements constrain design choices

---

## References

- CompTIA Network+ N10-009 Objectives: All domains
- RFC 1918 — Address Allocation for Private Internets
- RFC 3021 — Using 31-Bit Prefixes on Point-to-Point Links
- NIST SP 800-66 — HIPAA Security Rule Implementation Guide
- Cisco Validated Design Guides — Enterprise Campus Architecture
- BICSI TDMM — Telecommunications Distribution Methods Manual
