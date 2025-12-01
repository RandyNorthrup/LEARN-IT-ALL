---
id: lesson-069-leased-lines
title: "Leased Lines (T1/E1, T3/E3, Fractional T1)"
chapterId: "chapter-008-wan-technologies"
order: 69
duration: 20
objectives:
  - Understand leased line technology and characteristics
  - Explain T-carrier and E-carrier systems
  - Describe fractional T1/E1 services
  - Compare T1, T3, E1, and E3 specifications
  - Identify use cases for leased lines
---

# Leased Lines (T1/E1, T3/E3, Fractional T1)

**Leased lines** are dedicated point-to-point connections providing permanent, symmetric bandwidth between two locations. **T-carrier** (North America) and **E-carrier** (Europe) are the primary leased line standards.

This lesson covers leased line technologies—important for the CompTIA Network+ N10-008 exam.

---

## What is a Leased Line?

### Leased Line Definition

**Leased line** (also called **dedicated line** or **private line**):
- Permanent point-to-point connection
- Reserved exclusively for customer
- Always on (24/7/365)
- Fixed monthly cost regardless of usage

### Characteristics

**Dedicated bandwidth:**
- Not shared with other customers
- Guaranteed throughput

**Symmetric:**
- Same speed upload and download
- Example: T1 = 1.544 Mbps both directions

**Point-to-point:**
- Connects exactly two locations
- No intermediate hops (private circuit)

**Expensive:**
- Monthly recurring cost
- Cost increases with bandwidth and distance

### Leased Line Diagram

```
Company HQ                        Branch Office
┌─────────┐                       ┌─────────┐
│ Router  │                       │ Router  │
│  (CPE)  │                       │  (CPE)  │
└────┬────┘                       └────┬────┘
     │                                 │
   Demarc                           Demarc
     │                                 │
┌────▼────┐                       ┌───▼─────┐
│Provider │   Leased Line (T1)   │ Provider│
│   CO    │◀─────────────────────▶│   CO    │
└─────────┘                       └─────────┘
```

---

## T-Carrier System (North America)

### T-Carrier Overview

**T-carrier** is a digital transmission system developed by Bell Labs in the 1960s for voice telephony, now used for data.

**Hierarchy:**
- T1, T2, T3, T4, T5

**Most common:**
- **T1**: 1.544 Mbps (widely deployed)
- **T3**: 44.736 Mbps (higher bandwidth)

### T1 Line

**T1 specifications:**
- **Bandwidth**: 1.544 Mbps (both directions)
- **Channels**: 24 DS0 channels (64 Kbps each)
- **Encoding**: AMI (Alternate Mark Inversion) or B8ZS
- **Connector**: RJ-48C (looks like RJ-45)
- **Distance**: Up to 6000 feet (1.8 km) without repeaters

**T1 frame structure:**
```
T1 Frame = 193 bits
  - 24 channels × 8 bits/channel = 192 bits (payload)
  - 1 framing bit
  
8000 frames/second → 1.544 Mbps
```

**DS0 channel:**
- **DS0 (Digital Signal 0)**: 64 Kbps
- One voice call or data channel
- 24 DS0 channels in T1

**T1 calculation:**
```
24 channels × 64 Kbps + 8 Kbps (framing) = 1.544 Mbps
```

### T1 Use Cases

**Voice:**
- 24 simultaneous phone calls (one per DS0)
- PBX (Private Branch Exchange) connection

**Data:**
- Internet connectivity
- Point-to-point network connection
- VPN termination

### Fractional T1

**What is Fractional T1?**
- Portion of T1 capacity (not full 24 channels)
- Example: 6 channels = 384 Kbps
- Lower cost than full T1

**Pricing:**
- Pay for channels used (e.g., 12 channels = half T1)
- Good for smaller bandwidth needs

**Example:**
- Small business needs 768 Kbps
- Order Fractional T1 with 12 DS0 channels (12 × 64 Kbps = 768 Kbps)

### T3 Line

**T3 specifications:**
- **Bandwidth**: 44.736 Mbps (both directions)
- **Channels**: 28 T1 lines (672 DS0 channels)
- **Connector**: BNC or fiber optic
- **Use case**: High-bandwidth connections (ISPs, large enterprises)

**T3 calculation:**
```
28 T1 lines × 1.544 Mbps = 43.232 Mbps
Add overhead = 44.736 Mbps
```

**Cost:**
- Much more expensive than T1
- Often replaced by fiber Ethernet (cheaper per Mbps)

---

## E-Carrier System (Europe, International)

### E-Carrier Overview

**E-carrier** is the European/international equivalent of T-carrier.

**Hierarchy:**
- E1, E2, E3, E4, E5

**Most common:**
- **E1**: 2.048 Mbps (European T1 equivalent)
- **E3**: 34.368 Mbps (European T3 equivalent)

### E1 Line

**E1 specifications:**
- **Bandwidth**: 2.048 Mbps (both directions)
- **Channels**: 32 timeslots (30 for data, 2 for signaling/sync)
- **DS0 equivalent**: 64 Kbps per timeslot
- **Connector**: RJ-48C, BNC, or fiber

**E1 structure:**
```
32 timeslots × 64 Kbps = 2.048 Mbps
  - 30 timeslots for voice/data
  - 1 timeslot for framing/sync
  - 1 timeslot for signaling
```

**E1 vs T1:**
- E1 has **more capacity** (2.048 Mbps vs 1.544 Mbps)
- E1 has **30 usable channels** vs T1's 24
- Different framing standards (E1 uses CRC-4)

### E3 Line

**E3 specifications:**
- **Bandwidth**: 34.368 Mbps (both directions)
- **Channels**: 16 E1 lines (480 DS0 channels)
- **Use case**: High-bandwidth European connections

---

## T-Carrier and E-Carrier Comparison

| Type | Region | Bandwidth | Channels | Usable Channels |
|------|--------|-----------|----------|-----------------|
| **T1** | North America | 1.544 Mbps | 24 DS0 | 24 |
| **E1** | Europe/Int'l | 2.048 Mbps | 32 timeslots | 30 |
| **T3** | North America | 44.736 Mbps | 28 T1 (672 DS0) | 672 |
| **E3** | Europe/Int'l | 34.368 Mbps | 16 E1 (480 DS0) | 480 |

### T-Carrier Hierarchy

| Level | Name | Bandwidth | T1 Equivalent |
|-------|------|-----------|---------------|
| DS0 | Digital Signal 0 | 64 Kbps | 1/24 T1 |
| T1 | Trunk Level 1 | 1.544 Mbps | 1 |
| T2 | Trunk Level 2 | 6.312 Mbps | 4 |
| T3 | Trunk Level 3 | 44.736 Mbps | 28 |
| T4 | Trunk Level 4 | 274.176 Mbps | 168 |

**Note:** T2 and T4 rarely deployed; T1 and T3 most common.

### E-Carrier Hierarchy

| Level | Bandwidth | E1 Equivalent |
|-------|-----------|---------------|
| E1 | 2.048 Mbps | 1 |
| E2 | 8.448 Mbps | 4 |
| E3 | 34.368 Mbps | 16 |
| E4 | 139.264 Mbps | 64 |
| E5 | 565.148 Mbps | 256 |

---

## CSU/DSU (Channel Service Unit / Data Service Unit)

### What is CSU/DSU?

**CSU/DSU** converts digital signals between customer router and T1/E1 line.

**CSU (Channel Service Unit):**
- Terminates digital circuit
- Provides diagnostics and remote loopback
- Line conditioning

**DSU (Data Service Unit):**
- Converts router signals to T1/E1 format
- Handles clocking and timing

### CSU/DSU Diagram

```
Customer Site             Provider Network
┌────────┐  ┌─────────┐      │      ┌──────────┐
│ Router │──│ CSU/DSU │──────┼──────│ Provider │
│ (CPE)  │  │         │ T1   │      │   CO     │
└────────┘  └─────────┘      │      └──────────┘
                           Demarc
```

### Modern Deployment

**CSU/DSU built into routers:**
- Modern routers have integrated CSU/DSU
- Separate CSU/DSU device no longer needed
- Router has **WAN Interface Card (WIC)** with T1/E1 port

**Example:**
- Cisco router with WIC-1T (1 T1 port)
- Built-in CSU/DSU functionality

---

## Leased Line Configuration

### T1 Interface Configuration

**Cisco router T1 configuration example:**
```
interface Serial0/0/0
 description T1 to Branch Office
 bandwidth 1544
 ip address 10.1.1.1 255.255.255.252
 encapsulation ppp
 clock rate 1544000
 no shutdown
```

**Key settings:**
- **Bandwidth**: 1544 (Kbps) for T1
- **Encapsulation**: PPP or HDLC
- **Clock rate**: DCE side provides clock

### Encapsulation Protocols

**PPP (Point-to-Point Protocol):**
- Standard protocol for leased lines
- Authentication (PAP, CHAP)
- Multilink support (combine multiple T1s)

**HDLC (High-Level Data Link Control):**
- Cisco proprietary (by default)
- Simpler than PPP
- No authentication

**Frame Relay:**
- Legacy packet-switching protocol
- Used over T1/E1
- Largely replaced by MPLS/Ethernet

---

## Advantages of Leased Lines

✅ **Guaranteed bandwidth**: Dedicated, not shared
✅ **Symmetric**: Same upload/download speed
✅ **Predictable performance**: Consistent latency and throughput
✅ **Secure**: Private circuit (not on public internet)
✅ **SLA**: Service Level Agreement with uptime guarantees
✅ **No congestion**: Always-available capacity

---

## Disadvantages of Leased Lines

❌ **Expensive**: High monthly cost (distance-dependent)
❌ **Slow provisioning**: Weeks or months to install
❌ **Fixed bandwidth**: Can't easily upgrade without new circuit
❌ **Geographic limitations**: Availability varies by location
❌ **Lower bandwidth**: T1 (1.544 Mbps) insufficient for modern needs
❌ **Legacy technology**: Replaced by Metro Ethernet and MPLS

---

## Modern Alternatives to Leased Lines

### Metro Ethernet

**Advantages over T1/T3:**
- Higher bandwidth (10 Mbps - 10 Gbps+)
- Lower cost per Mbps
- Easier to scale (upgrade without new circuit)
- Standard Ethernet interface (familiar)

**Example:**
- 100 Mbps Metro Ethernet circuit
- Ethernet handoff (RJ-45 or fiber)
- Lower cost than T3 (44 Mbps)

### MPLS (Multiprotocol Label Switching)

**Advantages:**
- Any-to-any connectivity (not point-to-point)
- QoS support (prioritize traffic)
- Scalable (add sites easily)

### Fiber Optic

**Advantages:**
- Very high bandwidth (1 Gbps - 100 Gbps)
- Long distances
- Low latency

**Use case:**
- Major datacenter connections
- ISP backbone

---

## When to Use Leased Lines (T1/T3) Today?

### Still Relevant For:

**Legacy systems:**
- Existing T1 installations
- PBX phone systems

**Remote locations:**
- T1 available where fiber/Metro Ethernet not available

**SLA requirements:**
- Guaranteed uptime and performance

**Government/regulated industries:**
- Specific compliance requirements

### Increasingly Replaced By:

- **Metro Ethernet**: Higher bandwidth, lower cost
- **Fiber**: Much higher speeds
- **MPLS**: Better scalability
- **Broadband + SD-WAN**: Cost-effective for branch offices

---

## Key Takeaways

1. **Leased lines** provide dedicated, symmetric, point-to-point connections (expensive but reliable)
2. **T1** offers 1.544 Mbps with 24 DS0 channels (64 Kbps each) in North America
3. **E1** offers 2.048 Mbps with 30 usable timeslots in Europe/international markets
4. **T3** offers 44.736 Mbps (28 T1 lines); **E3** offers 34.368 Mbps (16 E1 lines)
5. **Fractional T1** allows ordering partial bandwidth (fewer than 24 channels) at lower cost
6. **CSU/DSU** converts signals between router and T1/E1 line (now built into routers)
7. **DS0** is 64 Kbps channel (basic unit of T-carrier and E-carrier)
8. **PPP and HDLC** are common encapsulation protocols for leased lines
9. **Leased lines** guarantee bandwidth with SLA but are expensive and slow to provision
10. **Metro Ethernet and MPLS** increasingly replace T1/T3 for higher bandwidth and lower cost

---

## References

- **CompTIA Network+ N10-008 Objective 2.1:** Compare and contrast WAN technologies (T1, T3, E1, E3)
- Bell Labs: T-Carrier System History
- ITU-T G.704: E-Carrier Specifications
- Cisco: T1/E1 Configuration Guide
- Professor Messer: Network+ N10-008 - Leased Lines

---

**Next Lesson:** Lesson 70 - MPLS (Multiprotocol Label Switching)
