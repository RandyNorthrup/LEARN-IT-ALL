---
id: lesson-068-wan-fundamentals
title: "WAN Fundamentals and Service Providers"
chapterId: "chapter-008-wan-technologies"
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

**Wide Area Networks (WANs)** connect geographically dispersed locations across cities, countries, or continents. Unlike LANs (local) and MANs (metro), WANs typically involve **service providers** and cover long distances.

This lesson covers WAN fundamentals—essential for the CompTIA Network+ N10-008 exam.

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

## Key Takeaways

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

## References

- **CompTIA Network+ N10-008 Objective 1.2:** Explain the characteristics of network topologies and types (WAN)
- **CompTIA Network+ N10-008 Objective 2.1:** Compare and contrast WAN technologies
- Cisco: WAN Technologies Overview
- Professor Messer: Network+ N10-008 - WAN Technologies

---

**Next Lesson:** Lesson 69 - Leased Lines (T1/E1, T3/E3, Fractional T1)
