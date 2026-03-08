---
id: lesson-069-leased-lines
title: "Leased Lines (T1/E1, T3/E3, Fractional T1)"
chapterId: ch8-wan-technologies
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

## Introduction

**Leased lines** are dedicated point-to-point connections providing permanent, symmetric bandwidth between two locations. **T-carrier** (North America) and **E-carrier** (Europe) are the primary leased line standards.

This lesson covers leased line technologies—important for the CompTIA Network+ N10-009 exam.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand leased line technology and characteristics
- Explain T-carrier and E-carrier systems
- Describe fractional T1/E1 services
- Compare T1, T3, E1, and E3 specifications
- Identify use cases for leased lines

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

### TDM (Time-Division Multiplexing) in Detail

T-carrier and E-carrier systems use **TDM** to combine multiple channels onto a single physical circuit. Understanding TDM is fundamental to how leased lines work.

**How TDM works:**
```
Time Division Multiplexing (T1 Example):

  24 input channels → Multiplexer → Single T1 circuit

  Frame (repeats 8000 times/second):
  ┌───┬───────┬───────┬───┬───────┬───────┐
  │ F │ Ch 1  │ Ch 2  │...│ Ch 23 │ Ch 24 │
  │bit│ 8bits │ 8bits │   │ 8bits │ 8bits │
  └───┴───────┴───────┴───┴───────┴───────┘
   1 bit + (24 × 8 bits) = 193 bits per frame

  Each channel gets a guaranteed time slot:
  - Channel 1 always occupies bits 2-9
  - Channel 2 always occupies bits 10-17
  - ...and so on

  Rate: 193 bits × 8000 frames/sec = 1,544,000 bps = 1.544 Mbps
```

**Synchronous TDM vs Statistical TDM:**

| Feature | Synchronous TDM (T1/E1) | Statistical TDM |
|---------|------------------------|------------------|
| **Slot allocation** | Fixed (reserved even if idle) | Dynamic (on-demand) |
| **Bandwidth efficiency** | Lower (unused slots wasted) | Higher (no wasted bandwidth) |
| **Latency** | Constant, predictable | Variable |
| **Used in** | T-carrier, E-carrier, SONET | Frame Relay, ATM |

> **Exam Tip:** T1 uses **synchronous TDM**, which guarantees each channel its time slot but wastes bandwidth when channels are idle. This is why T1 is **dedicated but not always efficient**. Statistical multiplexing (used in Frame Relay and MPLS) is more efficient for bursty data traffic.

### Superframe and Extended Superframe

**Superframe (SF/D4):**
- 12 consecutive T1 frames
- Framing bits provide synchronization
- Older format

**Extended Superframe (ESF):**
- 24 consecutive T1 frames
- Uses framing bits more efficiently:
  - 6 bits for synchronization
  - 6 bits for CRC-6 error checking
  - 12 bits for Facilities Data Link (FDL)
- Allows in-service monitoring and diagnostics
- **Preferred format** for modern T1 circuits

```
Extended Superframe (ESF) - 24 frames:
  Frame  1: F=FDL   | 24 channels…
  Frame  2: F=CRC   | 24 channels…
  Frame  3: F=FDL   | 24 channels…
  Frame  4: F=Sync  | 24 channels…
  Frame  5: F=FDL   | 24 channels…
  Frame  6: F=CRC   | 24 channels…
  … (pattern repeats through frame 24)

  FDL (Facilities Data Link):
    4 Kbps channel for remote diagnostics
    Provider can test circuit without interrupting service
```

> **Key Insight:** ESF's Facilities Data Link channel allows the provider to perform **remote loopback testing** on the T1 circuit without taking it out of service. This is invaluable for troubleshooting—the provider's smartjack at the demarc can loop back the signal to isolate whether the problem is on the customer side or provider side.

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

## SONET/SDH Overview

For higher-bandwidth leased lines, T-carrier and E-carrier are part of the broader **SONET/SDH** hierarchy.

### What is SONET/SDH?

**SONET (Synchronous Optical Network):** North American fiber optic standard
**SDH (Synchronous Digital Hierarchy):** International equivalent

**SONET/SDH rates:**

| SONET Level | SDH Level | Rate | T1 Equivalent |
|-------------|-----------|------|----------------|
| OC-1 | — | 51.84 Mbps | 28 T1s |
| OC-3 | STM-1 | 155.52 Mbps | 84 T1s |
| OC-12 | STM-4 | 622.08 Mbps | 336 T1s |
| OC-48 | STM-16 | 2.488 Gbps | 1,344 T1s |
| OC-192 | STM-64 | 9.953 Gbps | 5,376 T1s |
| OC-768 | STM-256 | 39.812 Gbps | 21,504 T1s |

**SONET ring topology:**
```
  ┌───── Node A ─────┐
  │                   │
  │    Working Ring    │
  │    ---------->     │
  │                   │
 Node D   SONET    Node B
  │      Ring         │
  │                   │
  │    Protection Ring │
  │    <----------     │
  │                   │
  └───── Node C ─────┘

  If fiber cut between A and B:
  Traffic wraps around the protection ring
  Failover time: <50 ms
```

> **Exam Tip:** SONET ring failover takes **less than 50 milliseconds**—so fast that voice calls aren’t dropped. This self-healing capability is why SONET was the backbone of telephone networks for decades.

---

## T1/E1 Troubleshooting

### Common T1 Alarms and Errors

| Alarm/Error | Meaning | Likely Cause |
|-------------|---------|-------------|
| **Red Alarm (LOF)** | Loss of Frame | Local equipment can’t sync with incoming signal |
| **Yellow Alarm (RAI)** | Remote Alarm Indication | Far-end is transmitting Red Alarm back |
| **Blue Alarm (AIS)** | Alarm Indication Signal | Upstream failure; all-ones pattern received |
| **BPV (Bipolar Violation)** | Line coding error | Cabling issue, interference, or CSU/DSU fault |
| **CRC errors** | Frame integrity failures | Noise, distance issues, or equipment failure |
| **Slip errors** | Clocking mismatch | CSU/DSU clock source misconfigured |

### Loopback Testing

Loopback tests isolate whether the problem is on the customer side or the provider side:

```
Local Loopback (tests CPE):
  Router → CSU/DSU → [LOOP BACK] → CSU/DSU → Router
  (Tests router and CSU/DSU only)

Remote Loopback (tests circuit):
  Router → CSU/DSU → T1 circuit → Provider Smartjack
  [LOOP BACK at demarc] → T1 circuit → CSU/DSU → Router
  (Tests entire circuit up to demarc)

Diagnosis logic:
  ─ Local loopback fails?  → Problem is CPE (router/CSU/DSU)
  ─ Local passes, remote fails? → Problem is T1 circuit (provider)
  ─ Both pass? → Problem is on far-end CPE
```

> **Key Insight:** When opening a trouble ticket with the provider for a T1 issue, performing a loopback test first demonstrates due diligence. If the local loopback passes but the remote loopback fails, you have evidence that the fault is in the provider’s circuit, significantly accelerating the troubleshooting process.

### Multilink PPP (MLPPP)

**Multilink PPP** bonds multiple T1 (or E1) circuits into a single logical connection with higher aggregate bandwidth.

```
Multilink PPP (bonding 4 × T1):

  T1 #1 (1.544 Mbps) ─┐
  T1 #2 (1.544 Mbps) ─┼─── MLPPP Bundle ─── 6.176 Mbps aggregate
  T1 #3 (1.544 Mbps) ─┼─── (single logical interface)
  T1 #4 (1.544 Mbps) ─┘

  Cisco configuration example:
    interface Multilink1
     ip address 10.1.1.1 255.255.255.252
     ppp multilink
     ppp multilink group 1
    
    interface Serial0/0/0
     encapsulation ppp
     ppp multilink
     ppp multilink group 1
    
    interface Serial0/0/1
     encapsulation ppp
     ppp multilink
     ppp multilink group 1
```

**Benefits of MLPPP:**
- Increased bandwidth without replacing equipment
- Automatic load balancing across links
- If one T1 fails, remaining T1s continue (graceful degradation)

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

### Leased Line Cost Analysis

Understanding the economics of leased lines versus alternatives is important for making informed WAN decisions:

```
Cost comparison for 45 Mbps WAN connection:

  Option 1: T3 Leased Line
    Monthly cost: $3,000-8,000
    Installation: $2,000-5,000
    Lead time: 30-90 days
    SLA: 99.99% uptime

  Option 2: Metro Ethernet (50 Mbps)
    Monthly cost: $500-1,500
    Installation: $500-1,000
    Lead time: 14-30 days
    SLA: 99.9% uptime

  Option 3: Business Broadband + SD-WAN
    Monthly cost: $200-500 (broadband) + $50/month (SD-WAN)
    Installation: minimal
    Lead time: 3-7 days
    SLA: Best-effort (no guarantee)

  5-year Total Cost of Ownership:
    T3:           $180,000-$480,000
    Metro:        $30,000-$90,000
    Broadband:    $15,000-$33,000
```

> **Key Insight:** T1/T3 leased lines have largely become **legacy technology** in urban and suburban areas. However, they remain relevant in **rural locations** where Metro Ethernet or fiber services haven’t been deployed. The CompTIA Network+ exam expects you to know both the technology and when it’s appropriate to use.

---

## Summary

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

## Practice Questions

**Q1.** What is the bandwidth of a T1 leased line?

A) 64 Kbps
B) 1.544 Mbps
C) 2.048 Mbps
D) 44.736 Mbps

<details>
<summary>Answer</summary>

**B)** A T1 line provides 1.544 Mbps of bandwidth, consisting of 24 DS0 channels at 64 Kbps each, plus 8 Kbps of framing overhead.
</details>

**Q2.** How many DS0 channels does a T1 line contain?

A) 16
B) 24
C) 28
D) 30

<details>
<summary>Answer</summary>

**B)** A T1 line contains 24 DS0 channels. Each DS0 channel provides 64 Kbps, and all 24 channels together provide 1.544 Mbps.
</details>

**Q3.** Which leased line standard is used in Europe and provides 2.048 Mbps with 30 usable timeslots?

A) T1
B) T3
C) E1
D) OC-3

<details>
<summary>Answer</summary>

**C)** E1 is the European/international equivalent of T1, providing 2.048 Mbps with 32 timeslots (30 usable for data, 1 for framing, 1 for signaling).
</details>

**Q4.** A company needs dedicated bandwidth but cannot afford a full T1 line. Which option allows them to purchase only a portion of a T1's capacity?

A) E1
B) Fractional T1
C) T3
D) DSL

<details>
<summary>Answer</summary>

**B)** Fractional T1 allows customers to lease fewer than 24 DS0 channels, paying only for the bandwidth they need. For example, 6 channels would provide 384 Kbps.
</details>

**Q5.** What is the function of a CSU/DSU in a leased line connection?

A) It encrypts the data before transmission
B) It converts signals between the router and the T1/E1 line
C) It provides DHCP services
D) It manages VLAN tagging

<details>
<summary>Answer</summary>

**B)** A CSU/DSU (Channel Service Unit/Data Service Unit) converts between the router's digital signals and the format required by the T1/E1 line. In modern equipment, CSU/DSU functionality is built into the router.
</details>

**Q6.** What is the bandwidth of a T3 line, and how many T1 lines does it combine?

A) 10 Mbps, 10 T1 lines
B) 44.736 Mbps, 28 T1 lines
C) 34.368 Mbps, 16 T1 lines
D) 100 Mbps, 64 T1 lines

<details>
<summary>Answer</summary>

**B)** A T3 (DS3) line provides 44.736 Mbps by combining 28 T1 lines. It is used by organizations requiring higher bandwidth than a single T1.
</details>

**Q7.** Which two data-link layer protocols are commonly used for encapsulation on leased lines?

A) Ethernet and Wi-Fi
B) PPP and HDLC
C) TCP and UDP
D) HTTP and HTTPS

<details>
<summary>Answer</summary>

**B)** PPP (Point-to-Point Protocol) and HDLC (High-Level Data Link Control) are the two common encapsulation protocols used on serial leased lines. PPP is preferred because it supports authentication and multiprotocol.
</details>

**Q8.** What is a DS0, and what bandwidth does it provide?

A) A fiber optic standard at 155 Mbps
B) A basic digital channel at 64 Kbps
C) A multiplexed T3 channel at 1.544 Mbps
D) A synchronous frame at 51.84 Mbps

<details>
<summary>Answer</summary>

**B)** DS0 (Digital Signal 0) is the basic unit of the T-carrier and E-carrier hierarchy, providing a single 64 Kbps channel. It was originally designed to carry one digitized voice call.
</details>

**Q9.** What type of multiplexing does a T1 circuit use to combine 24 channels onto a single physical link?

A) Frequency Division Multiplexing (FDM)
B) Statistical Time Division Multiplexing (STDM)
C) Synchronous Time Division Multiplexing (TDM)
D) Wavelength Division Multiplexing (WDM)

<details>
<summary>Answer</summary>

**C)** T1 circuits use synchronous TDM, where each of the 24 channels is assigned a fixed, guaranteed time slot that repeats 8,000 times per second. Unlike statistical TDM, synchronous TDM reserves the time slot even when the channel is idle, ensuring consistent and predictable performance.
</details>

**Q10.** A network technician performs a local loopback test on a T1 circuit and it passes, but a remote loopback test at the smartjack fails. Where is the fault MOST likely located?

A) The customer's router (CPE)
B) The CSU/DSU
C) The provider's T1 circuit between the customer and the central office
D) The customer's LAN switch

<details>
<summary>Answer</summary>

**C)** If the local loopback passes, the CPE (router and CSU/DSU) is working correctly. If the remote loopback at the smartjack fails, the problem lies in the provider's T1 circuit between the customer premises and the central office. This evidence helps when opening a trouble ticket with the provider.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 2.1:** Compare and contrast WAN technologies (T1, T3, E1, E3)
- Bell Labs: T-Carrier System History
- ITU-T G.704: E-Carrier Specifications
- Cisco: T1/E1 Configuration Guide
- Professor Messer: Network+ N10-009 - Leased Lines

---

**Next Lesson:** Lesson 70 - MPLS (Multiprotocol Label Switching)
