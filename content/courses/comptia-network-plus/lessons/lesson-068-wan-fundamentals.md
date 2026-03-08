---
id: lesson-068-wan-fundamentals
title: "WAN Fundamentals and Service Providers"
chapterId: ch8-wan-technologies
order: 68
duration: 21
objectives:
  - Understand WAN concepts and terminology
  - Differentiate WAN from LAN and MAN
  - Explain WAN service provider roles
  - Describe demarcation point and customer premises equipment
  - Identify WAN connection types and characteristics
---

# WAN Fundamentals and Service Providers

## Introduction

**Wide Area Networks (WANs)** connect geographically dispersed locations across cities, countries, or continents. Unlike LANs (local) and MANs (metro), WANs typically involve **service providers** and cover long distances.

This lesson covers WAN fundamentals—essential for the CompTIA Network+ N10-009 exam.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand WAN concepts and terminology
- Differentiate WAN from LAN and MAN
- Explain WAN service provider roles
- Describe demarcation point and customer premises equipment
- Identify WAN connection types and characteristics

---

## What is a WAN?

### WAN Definition

**WAN (Wide Area Network):**
- Network spanning large geographic area
- Connects multiple LANs across cities/countries
- Uses telecommunications providers (carriers)

**Characteristics:**
- **Long distance**: 100s or 1000s of kilometers
- **Lower speed**: Typically slower than LAN (though improving)
- **Higher latency**: Longer distances = more delay
- **Leased lines**: Often require paying service provider

### LAN vs MAN vs WAN

| Type | Area | Speed | Ownership | Example |
|------|------|-------|-----------|---------|
| **LAN** | Building, campus | High (1-100 Gbps) | Organization | Office network |
| **MAN** | City | Medium-High (10-100 Gbps) | Organization or ISP | City-wide fiber |
| **WAN** | Country, world | Medium (1.5 Mbps - 100 Gbps) | Service provider | Branch offices |

### WAN Example

**Company with multiple locations:**
```
     Headquarters (New York)
            │
         WAN Link
        ╱   │   ╲
       ╱    │    ╲
  Branch  Branch  Branch
  (LA)   (Chicago)(Miami)
```

Each location has its own LAN; WAN connects them.

---

## WAN Terminology

### Key WAN Terms

**CPE (Customer Premises Equipment):**
- Equipment located at customer site
- Examples: Router, firewall, modem

**Demarc (Demarcation Point):**
- Boundary between customer equipment and provider network
- Defines responsibility (customer vs provider)

**Last Mile:**
- Final leg from provider to customer
- Also called "local loop" or "access network"

**CO (Central Office):**
- Service provider facility
- Houses equipment connecting customers to provider network

**POP (Point of Presence):**
- Provider facility where customers can connect
- May have multiple POPs in a region

### Demarc Diagram

```
Customer Site        │     Provider Network
                     │
┌─────────────┐      │      ┌──────────┐
│   Router    │◀─────┼──────│ Provider │
│   (CPE)     │ Circuit     │ Network  │
└─────────────┘      │      └──────────┘
                     │
                  Demarc
         (Responsibility boundary)
```

**Customer responsible:**
- Equipment on customer side (router, switches)
- Internal wiring

**Provider responsible:**
- Circuit from demarc to provider network
- Provider equipment

### Smart Jack and MPOE

The **smartjack** (also called a **network interface device** or **NID**) is the provider-installed device at the demarcation point that provides diagnostic capabilities.

**Smartjack capabilities:**
- Remote loopback testing (provider can test circuit remotely)
- LED status indicators (power, signal, alarm)
- Signal regeneration/amplification
- Converts between provider and customer cabling standards

**MPOE (Minimum Point of Entry):**
- Physical location where provider cabling enters the building
- Typically in the basement or ground floor of commercial buildings
- May include a patch panel distributing circuits to different floors

```
Physical Layout (typical enterprise building):

  Provider CO ─── Underground conduit ───▶ MPOE (Basement)
                                            │
                                       Smartjack
                                            │
                                   Riser cable (vertical)
                                            │
                                     Patch panel (3rd floor)
                                            │
                                   Customer Router (CPE)
                                            │
                                     LAN switches → Users
```

> **Exam Tip:** Everything on the **provider side** of the demarc is the provider's responsibility. Everything on the **customer side** is the customer's responsibility. When troubleshooting WAN issues, the first question is always: "Which side of the demarc is the problem on?" Loopback testing at the smartjack helps answer this.

---

## WAN Service Providers

### Types of Service Providers

#### 1. ISP (Internet Service Provider)

**Provides:**
- Internet connectivity
- Public IP addresses
- DNS services

**Examples:**
- Comcast, AT&T, Verizon (consumer/business)
- Cogent, Level 3, Lumen (enterprise)

#### 2. Telco (Telecommunications Company)

**Provides:**
- Leased lines (T1, T3, E1, E3)
- MPLS networks
- Metro Ethernet

**Examples:**
- AT&T, Verizon, CenturyLink

#### 3. Cloud Service Provider

**Provides:**
- Direct connectivity to cloud (AWS, Azure, Google Cloud)
- Bypasses public internet

**Examples:**
- AWS Direct Connect
- Azure ExpressRoute
- Google Cloud Interconnect

#### 4. MSP (Managed Service Provider)

**Provides:**
- Managed WAN services
- SD-WAN management
- 24/7 monitoring

**Examples:**
- Masergy, Windstream, GTT

### Service Provider Hierarchy

```
          Tier 1 ISPs
     (Global backbone, no transit fees)
      AT&T, Lumen, Cogent
              │
          Tier 2 ISPs
      (Regional, buy transit)
         Comcast, Cox
              │
          Tier 3 ISPs
       (Local, buy transit)
        Small local ISPs
              │
          End Customers
    (Homes, businesses)
```

**Tier 1 ISPs:**
- Global reach
- Peer with other Tier 1s (no fees)
- "Internet backbone"

**Tier 2 ISPs:**
- Regional or national
- Buy transit from Tier 1
- Peer with other Tier 2s

**Tier 3 ISPs:**
- Local coverage
- Buy transit from Tier 2/Tier 1

### Peering and Transit

Understanding how ISPs exchange traffic is important for WAN design:

**Peering:**
- Two ISPs agree to exchange traffic directly (free or settlement-based)
- Occurs at **IXP (Internet Exchange Point)** facilities
- Reduces latency by avoiding intermediate hops

**Transit:**
- One ISP pays another for access to the rest of the internet
- Tier 3 buys transit from Tier 2; Tier 2 buys from Tier 1

```
ISP Peering at an Internet Exchange Point (IXP):

  ┌────────┐     ┌──────────┐     ┌────────┐
  │ ISP A  │─────│   IXP    │─────│ ISP B  │
  │ (Tier2)│ Peer │ Switch   │ Peer │ (Tier2)│
  └────────┘     └────┬─────┘     └────────┘
                       │
                  ┌────▼───┐
                  │ ISP C  │
                  │ (Tier1)│ ← Provides transit
                  └────────┘
```

**Major IXPs worldwide:**
- DE-CIX (Frankfurt) – largest by traffic volume
- AMS-IX (Amsterdam)
- LINX (London)
- Equinix IX (multiple global locations)

> **Key Insight:** When traffic between two endpoints traverses fewer ISP hops (through peering), latency decreases. Enterprise WAN design sometimes considers ISP peering relationships when selecting providers for latency-sensitive applications.

---

## WAN Connection Components

### Customer Premises Equipment (CPE)

**Router:**
- Connects LAN to WAN
- Performs routing, NAT, firewall functions
- Serial or Ethernet WAN interface

**CSU/DSU (Channel Service Unit / Data Service Unit):**
- Converts digital signals for WAN circuit
- Built into modern routers
- Legacy term (older T1/T3 circuits)

**Modem (Modulator/Demodulator):**
- Converts digital to analog (and vice versa)
- Used for DSL, cable, dial-up

**Firewall:**
- Protects network from external threats
- May be separate device or integrated into router

### Provider Equipment

**Smartjack:**
- Intelligent demarcation device
- Allows provider to remotely test circuit
- LEDs indicate circuit status

**Switch/Router (at CO):**
- Provider equipment connecting to customer
- Not customer's responsibility

---

## WAN Connection Types

### Circuit-Switched Networks

**How it works:**
- Dedicated path established for duration of connection
- Examples: Traditional telephone (PSTN), ISDN

**Characteristics:**
- **Dedicated bandwidth**: Full bandwidth during call
- **Connection-oriented**: Must establish connection
- **Billing**: By time (per minute)

**Example:**
- Dial-up modem (56 Kbps)
- ISDN (64-128 Kbps)

**Legacy technology** (largely replaced by packet-switched).

### Packet-Switched Networks

**How it works:**
- Data divided into packets
- Packets routed independently through network
- Shared infrastructure

**Characteristics:**
- **Shared bandwidth**: Multiple customers share links
- **Connectionless or connection-oriented**: Depends on protocol
- **Billing**: By data usage or flat rate

**Examples:**
- Frame Relay (legacy)
- MPLS
- Metro Ethernet

**Advantages:**
✅ Efficient use of bandwidth
✅ Lower cost than dedicated circuits

**Disadvantages:**
❌ Variable latency (shared network)
❌ Potential congestion

### Dedicated Leased Lines

**How it works:**
- Permanent, dedicated point-to-point connection
- Always on, fixed bandwidth

**Characteristics:**
- **Dedicated bandwidth**: Full bandwidth 24/7
- **Symmetric**: Same speed upload/download
- **Guaranteed SLA**: Provider guarantees uptime/performance

**Examples:**
- T1 (1.544 Mbps)
- T3 (44.736 Mbps)
- E1 (2.048 Mbps) - Europe
- E3 (34.368 Mbps) - Europe

**Advantages:**
✅ Predictable performance
✅ High reliability
✅ Symmetric speeds

**Disadvantages:**
❌ Expensive (especially long distances)
❌ Slow to provision (weeks/months)
❌ Fixed bandwidth (can't easily upgrade)

### Broadband

**Technologies:**
- DSL (Digital Subscriber Line)
- Cable
- Fiber (FTTP/FTTH)
- Wireless (cellular, satellite)

**Characteristics:**
- **Asymmetric**: Faster download than upload
- **Shared bandwidth**: Contention with neighbors
- **Cost-effective**: Lower cost than leased lines

**Use cases:**
- Small offices
- Residential
- Branch offices (with VPN)

---

## Metro Ethernet and Carrier Ethernet

### What is Metro Ethernet?

**Metro Ethernet** extends Ethernet technology over metropolitan area networks, providing WAN connectivity using the familiar Ethernet frame format.

**Key advantage:** Organizations use the same Ethernet interface (RJ-45 or SFP) for both LAN and WAN—no specialized WAN interfaces (serial, T1) needed.

### Metro Ethernet Service Types (MEF)

The **Metro Ethernet Forum (MEF)** defines standard service types:

| Service Type | MEF Term | Description | Topology |
|-------------|----------|-------------|----------|
| **E-Line** | Ethernet Virtual Private Line (EVPL) | Point-to-point connection | Site A ↔ Site B |
| **E-LAN** | Ethernet Virtual Private LAN (EVPLAN) | Multipoint-to-multipoint | Any site ↔ any site |
| **E-Tree** | Ethernet Virtual Private Tree | Hub-and-spoke (rooted multipoint) | Hub ↔ spokes |

```
E-Line (Point-to-Point):
  Site A ◀──────────────▶ Site B
        100 Mbps Ethernet

E-LAN (Multipoint):
  Site A ◀───▶ Metro ◀───▶ Site B
              Ethernet
  Site C ◀───▶ Cloud ◀───▶ Site D
  (Any site can communicate with any other)

E-Tree (Hub-and-Spoke):
       ┌──── Spoke A
  Hub ─┼──── Spoke B
       └──── Spoke C
  (Spokes communicate via Hub only)
```

### Metro Ethernet Bandwidth Options

| Bandwidth | Common Use | Monthly Cost (approx.) |
|-----------|-----------|----------------------|
| 10 Mbps | Small branch office | $300-500 |
| 100 Mbps | Medium branch | $500-1,500 |
| 1 Gbps | Large branch / datacenter | $1,500-5,000 |
| 10 Gbps | Datacenter interconnect | $5,000-15,000 |
| 100 Gbps | Carrier backbone | $15,000+ |

**Metro Ethernet vs T1 cost comparison:**
```
100 Mbps Metro Ethernet: ~$1,000/month
  vs.
65 × T1 lines to match bandwidth: ~$19,500/month
  (each T1 = 1.544 Mbps, ~$300/month)

Cost savings: ~95%
```

> **Exam Tip:** Metro Ethernet has largely replaced T1/T3 leased lines for WAN connectivity due to **higher bandwidth, lower cost per Mbps, and simpler management** (standard Ethernet interface). However, leased lines may still be required in rural areas where Ethernet services are unavailable.

---

## WAN Redundancy Design

### Dual-Homed vs Multi-Homed

**Single-homed:** One connection to one ISP (no redundancy)

**Dual-homed:** Two connections to one ISP
- Protects against link failure
- Does NOT protect against ISP failure

**Multi-homed:** Connections to two or more ISPs
- Protects against both link and ISP failure
- Requires BGP for routing decisions

**Dual multi-homed:** Two connections to each of two ISPs
- Highest redundancy
- Most complex (requires BGP with multiple AS relationships)

```
Single-homed:        Dual-homed:
  ┌────┐               ┌────┐
  │Site│───ISP A      │Site│═══ISP A
  └────┘               └────┘

Multi-homed:         Dual multi-homed:
  ┌────┐               ┌────┐
  │Site│───ISP A      │Site│═══ISP A
  │    │───ISP B      │    │═══ISP B
  └────┘               └────┘
  (═ = two links)
```

### WAN Failover Strategies

| Strategy | Primary | Backup | Failover Time | Cost |
|----------|---------|--------|---------------|------|
| **Active/Standby** | MPLS | Broadband VPN | 30-60 sec | Medium |
| **Active/Active** | MPLS + Broadband | Load balanced | Instant | Higher |
| **SD-WAN** | Multiple links | All active | Sub-second | Varies |
| **Diverse path** | Fiber (Route A) | Fiber (Route B) | 50 ms (SONET) | High |

> **Key Insight:** True WAN redundancy requires **path diversity**—ensuring that backup circuits don't share the same physical conduit or central office as primary circuits. If both circuits run through the same underground conduit, a single backhoe cut takes out both links.

---

## WAN Topologies

### Point-to-Point

**Design:**
- Direct connection between two sites

```
   Site A ◀─────▶ Site B
```

**Advantages:**
✅ Simple
✅ Low latency
✅ Secure (no intermediate hops)

**Disadvantages:**
❌ Not scalable (need N-1 links for N sites)

### Hub-and-Spoke (Star)

**Design:**
- Central hub site
- Spokes connect to hub only

```
       Spoke 1
           ╲
            ╲
   Spoke 2──Hub──Spoke 3
            ╱
           ╱
       Spoke 4
```

**Advantages:**
✅ Scalable (add spokes easily)
✅ Centralized management

**Disadvantages:**
❌ Single point of failure (hub)
❌ Spoke-to-spoke traffic goes through hub

**Use case:**
- Branch offices connecting to headquarters

### Full Mesh

**Design:**
- Every site connects to every other site

```
   Site A ◀──▶ Site B
     ╲         ╱
      ╲       ╱
       ╲     ╱
        ╲   ╱
         ╲ ╱
        Site C
```

**Formula:** N(N-1)/2 links for N sites
- 3 sites = 3 links
- 10 sites = 45 links

**Advantages:**
✅ Redundancy (multiple paths)
✅ Low latency (direct connections)

**Disadvantages:**
❌ Expensive (many links)
❌ Complex to manage

### Partial Mesh

**Design:**
- Some sites fully meshed, others hub-and-spoke

```
   Site A ◀──▶ Site B
     │         │
     │         │
   Site C    Site D
```

**Compromise** between cost and redundancy.

---

## WAN Performance Factors

### Bandwidth

**Definition:**
- Maximum data rate (bits per second)

**Symmetric vs Asymmetric:**
- **Symmetric**: Same upload/download (T1, Metro Ethernet)
- **Asymmetric**: Different upload/download (DSL, cable)

**Example:**
- DSL: 25 Mbps down / 5 Mbps up (asymmetric)
- T1: 1.544 Mbps both directions (symmetric)

### Latency

**Definition:**
- Time for packet to travel from source to destination

**Factors affecting latency:**
- **Distance**: Speed of light limit (~1 ms per 100 km fiber)
- **Propagation delay**: Physical transmission time
- **Processing delay**: Router/switch processing
- **Queuing delay**: Waiting in buffers

**Example latency:**
- LAN: <1 ms
- WAN (same continent): 10-50 ms
- WAN (intercontinental): 100-300 ms
- Satellite: 500-700 ms (geosynchronous orbit)

### Jitter

**Definition:**
- Variation in latency over time

**Impact:**
- Voice/video calls distorted
- Real-time applications suffer

**Solution:**
- QoS (Quality of Service) to prioritize traffic

### Throughput vs Bandwidth

An important distinction that's often tested:

**Bandwidth:** The maximum theoretical data rate of a link (e.g., 100 Mbps)

**Throughput:** The actual data rate achieved after accounting for overhead, congestion, and protocol efficiency

```
Throughput calculation example:

  Link bandwidth: 100 Mbps
  TCP overhead: ~5% (headers, ACKs)
  Ethernet overhead: ~3% (preamble, IFG, CRC)
  Network congestion: ~10% loss

  Actual throughput: 100 × 0.95 × 0.97 × 0.90 = ~83 Mbps
```

**Goodput:** The useful application data rate (excludes retransmissions, protocol overhead)

```
Bandwidth > Throughput > Goodput

  Bandwidth:  100 Mbps (theoretical max)
  Throughput:  83 Mbps (actual transfer rate)
  Goodput:     78 Mbps (useful data, no TCP overhead)
```

> **Exam Tip:** The CompTIA exam distinguishes between bandwidth, throughput, and goodput. **Bandwidth** is theoretical maximum, **throughput** is actual measured rate, and **goodput** is the rate of useful data delivered to the application.

### WAN Latency Calculation

**Real-world example: New York to London WAN link**

```
Fiber distance: ~5,500 km (undersea cable)
Speed of light in fiber: ~200,000 km/s (0.67c due to refraction)

Propagation delay (one way):
  5,500 km ÷ 200,000 km/s = 27.5 ms

Round-trip propagation: 55 ms

Add router processing (5 hops × 0.5 ms each): +2.5 ms
Add queuing delays: +2-5 ms

Total RTT: ~60-63 ms
```

Compare with satellite (GEO): ~600 ms RTT for the same path—**10x worse latency**.

---

## SLA (Service Level Agreement)

### What is SLA?

**SLA** defines guaranteed service levels from provider.

**Typical SLA metrics:**
- **Uptime**: 99.9% (8.76 hours downtime/year)
- **Latency**: <50 ms average
- **Packet loss**: <0.1%
- **MTTR (Mean Time To Repair)**: 4 hours

**SLA tiers:**
- **99.9%**: 3 nines (43 min downtime/month)
- **99.99%**: 4 nines (4.3 min downtime/month)
- **99.999%**: 5 nines (26 sec downtime/month)

### SLA Penalties

**If provider fails to meet SLA:**
- Service credits (partial refund)
- Contract termination rights

**Customer responsibilities:**
- Must report issues promptly
- Provider not responsible for customer equipment failures

---

## Choosing WAN Technologies

### Factors to Consider

**Bandwidth requirements:**
- How much data transferred?
- Peak usage times?

**Latency sensitivity:**
- Voice/video (low latency required)
- File transfers (less sensitive)

**Budget:**
- Leased lines expensive
- Broadband cost-effective

**Availability/Reliability:**
- Mission-critical apps need SLA
- Backup WAN link?

**Geographic location:**
- Remote areas: limited options (satellite?)
- Urban areas: many options (fiber, cable, DSL)

### Typical WAN Choices

**Large enterprise:**
- MPLS network connecting offices
- Direct Connect to cloud providers
- Backup: broadband + VPN

**Small/medium business:**
- Broadband (fiber, cable, DSL) + VPN
- SD-WAN for branch offices

**Remote site:**
- Cellular (4G/5G)
- Satellite (if no terrestrial options)

---

## Summary

1. **WAN** connects geographically dispersed locations using service providers
2. **CPE (Customer Premises Equipment)** is equipment at customer site; **Demarc** is boundary between customer and provider
3. **Service providers** include ISPs (internet), Telcos (leased lines), and Cloud providers (direct connectivity)
4. **Circuit-switched** establishes dedicated path (PSTN); **packet-switched** shares infrastructure (MPLS, Metro Ethernet)
5. **Leased lines** provide dedicated bandwidth 24/7 with guaranteed SLA (expensive)
6. **Hub-and-spoke** is common WAN topology for branch offices (spokes connect to central hub)
7. **Latency** increases with distance; **jitter** is variation in latency
8. **SLA (Service Level Agreement)** defines guaranteed uptime, latency, and packet loss
9. **Last mile** (local loop) is final connection from provider to customer
10. **Symmetric** bandwidth has same upload/download; **asymmetric** has different speeds

---

## Practice Questions

**Q1.** Which WAN switching method establishes a dedicated communication path between two endpoints for the duration of the session?

A) Packet switching
B) Circuit switching
C) Message switching
D) Cell switching

<details>
<summary>Answer</summary>

**A) is incorrect. B)** Circuit switching establishes a dedicated path (circuit) between endpoints for the entire session. The traditional PSTN telephone network is the classic example.
</details>

**Q2.** What is the demarcation point (demarc) in a WAN connection?

A) The router at the ISP's datacenter
B) The boundary between the customer's network and the service provider's network
C) The DNS server at the edge
D) The firewall between internal and external networks

<details>
<summary>Answer</summary>

**B)** The demarcation point (demarc) is the boundary where the service provider's responsibility ends and the customer's responsibility begins. It is typically located at the customer premises.
</details>

**Q3.** Which WAN topology connects all branch offices through a central site?

A) Full mesh
B) Partial mesh
C) Hub-and-spoke
D) Ring

<details>
<summary>Answer</summary>

**C)** Hub-and-spoke topology connects all branch offices (spokes) to a central site (hub). Traffic between branches must traverse the hub. It is common for branch office WAN designs.
</details>

**Q4.** What does CPE stand for in WAN terminology, and where is it located?

A) Central Processing Equipment, located at ISP datacenter
B) Customer Premises Equipment, located at the customer site
C) Cloud Provider Equipment, located in the cloud
D) Core Processing Engine, located in the WAN backbone

<details>
<summary>Answer</summary>

**B)** CPE (Customer Premises Equipment) refers to networking equipment located at the customer's site, such as routers, CSU/DSUs, and modems.
</details>

**Q5.** Which of the following is an example of a packet-switched WAN technology?

A) PSTN
B) ISDN
C) MPLS
D) Analog modem

<details>
<summary>Answer</summary>

**C)** MPLS is a packet-switched technology that shares infrastructure among multiple customers. Data is divided into packets that can take different paths. PSTN and ISDN are circuit-switched.
</details>

**Q6.** A WAN connection advertised as "50 Mbps down / 10 Mbps up" is an example of what type of bandwidth?

A) Symmetric
B) Asymmetric
C) Dedicated
D) Burstable

<details>
<summary>Answer</summary>

**B)** Asymmetric bandwidth has different upload and download speeds. This is common with consumer broadband services like DSL and cable where download speeds exceed upload speeds.
</details>

**Q7.** What does an SLA (Service Level Agreement) define for a WAN service?

A) The physical cable type to use
B) Guaranteed uptime, latency, and packet loss metrics
C) The programming language for network equipment
D) The maximum number of connected devices

<details>
<summary>Answer</summary>

**B)** An SLA defines guaranteed performance metrics including uptime percentage (e.g., 99.99%), maximum latency, maximum packet loss, and mean time to repair. Penalties apply if the provider fails to meet SLA terms.
</details>

**Q8.** What is the "last mile" in WAN connectivity?

A) The backbone connection between ISPs
B) The final connection from the service provider to the customer premises
C) The distance between the router and the switch
D) The length of the fiber optic trunk

<details>
<summary>Answer</summary>

**B)** The last mile (also called the local loop) is the final connection between the service provider's network and the customer premises. It is often the bandwidth bottleneck in WAN connectivity.
</details>

**Q9.** What is jitter in the context of WAN performance?

A) Total time for a packet to reach its destination
B) Variation in latency between packets
C) The number of dropped packets
D) The available bandwidth on the link

<details>
<summary>Answer</summary>

**B)** Jitter is the variation in latency (delay) between packets. High jitter is particularly problematic for real-time applications like VoIP and video conferencing.
</details>

**Q10.** A company has connections to two different ISPs and uses BGP to manage routing between them. Which WAN redundancy design does this describe?

A) Single-homed
B) Dual-homed
C) Multi-homed
D) Direct connect

<details>
<summary>Answer</summary>

**C)** Multi-homed means the organization has connections to two or more different ISPs, providing protection against both link failure and ISP failure. BGP is required to manage routing decisions between multiple providers. Dual-homed uses two connections to the same ISP, and single-homed has only one connection.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 1.2:** Explain the characteristics of network topologies and types (WAN)
- **CompTIA Network+ N10-009 Objective 2.1:** Compare and contrast WAN technologies
- Cisco: WAN Technologies Overview
- Professor Messer: Network+ N10-009 - WAN Technologies

---

**Next Lesson:** Lesson 69 - Leased Lines (T1/E1, T3/E3, Fractional T1)
