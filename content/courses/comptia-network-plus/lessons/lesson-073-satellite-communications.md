---
id: lesson-073-satellite-communications
title: "Satellite Communications (VSAT, Latency Considerations)"
chapterId: ch8-wan-technologies
order: 73
duration: 19
objectives:
  - Understand satellite communication technology
  - Explain VSAT architecture and operation
  - Describe satellite orbit types (GEO, LEO, MEO)
  - Identify latency characteristics and impact
  - Compare satellite internet use cases and limitations
---

# Satellite Communications (VSAT, Latency Considerations)

## Introduction

**Satellite communications** provide internet and data connectivity via orbiting satellites, enabling coverage in remote areas where terrestrial infrastructure is unavailable. Key technology is **VSAT (Very Small Aperture Terminal)**.

This lesson covers satellite fundamentals—important for the CompTIA Network+ N10-009 exam.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand satellite communication technology
- Explain VSAT architecture and operation
- Describe satellite orbit types (GEO, LEO, MEO)
- Identify latency characteristics and impact
- Compare satellite internet use cases and limitations

---

## Satellite Communication Overview

### What is Satellite Communication?

**Satellite communication:**
- Uses satellites orbiting Earth as relay stations
- Ground stations transmit to satellite (uplink)
- Satellite retransmits to other ground stations (downlink)

### Basic Architecture

```
    Ground Station A          Satellite          Ground Station B
    (Customer Site)          (Orbiting)          (Customer Site)
         🏠                      🛰️                    🏢
         │                       │                    │
         │      Uplink           │      Downlink      │
         └──────────────────────▶│◀──────────────────┘
                           22,000 miles
                      (Geostationary orbit)
```

**Components:**

**Satellite dish:**
- Parabolic antenna
- Transmits and receives signals

**Modem:**
- Modulates/demodulates signals
- Connects to router via Ethernet

**Satellite:**
- Receives uplink signal
- Amplifies and retransmits (downlink)

---

## Satellite Orbits

### Orbit Types

| Orbit | Altitude | Latency | Coverage | Examples |
|-------|----------|---------|----------|----------|
| **GEO** | 35,786 km (22,236 mi) | 500-700 ms | 1/3 of Earth | HughesNet, Viasat |
| **MEO** | 2,000-35,786 km | 50-150 ms | Regional | O3b, GPS |
| **LEO** | 180-2,000 km | 20-40 ms | Local | Starlink, OneWeb |

### GEO (Geostationary Orbit)

**Characteristics:**
- **Altitude**: 35,786 km (22,236 miles) above equator
- **Orbital period**: 24 hours (matches Earth rotation)
- **Position**: Appears stationary from ground
- **Latency**: 500-700 ms round-trip

**Advantages:**
✅ Fixed position (dish points at same location)
✅ Wide coverage (1 satellite covers 1/3 of Earth)
✅ 3 satellites can cover entire Earth

**Disadvantages:**
❌ Very high latency (long distance)
❌ Expensive to launch
❌ Limited coverage at poles

**Use cases:**
- Traditional satellite internet (HughesNet, Viasat)
- Satellite TV (DirecTV, Dish)
- Weather satellites

### MEO (Medium Earth Orbit)

**Characteristics:**
- **Altitude**: 2,000-35,786 km
- **Orbital period**: 2-24 hours
- **Latency**: 50-150 ms round-trip

**Advantages:**
✅ Lower latency than GEO
✅ Better coverage than LEO (higher altitude)

**Use cases:**
- GPS (20,200 km altitude)
- O3b satellite internet (8,000 km)

### LEO (Low Earth Orbit)

**Characteristics:**
- **Altitude**: 180-2,000 km (typical: 340-550 km for internet)
- **Orbital period**: 90-120 minutes
- **Latency**: 20-40 ms round-trip
- **Speed**: 7-8 km/s

**Advantages:**
✅ Very low latency (close to Earth)
✅ Lower launch cost
✅ Smaller, cheaper satellites

**Disadvantages:**
❌ Satellites move (not stationary)
❌ Need many satellites (constellation)
❌ Hand-off between satellites required

**Use cases:**
- Starlink (SpaceX): 12,000+ satellites planned
- OneWeb: 648 satellites
- Amazon Kuiper: 3,236 satellites planned

### LEO Constellation

**Example: Starlink**
```
Multiple satellites in LEO (550 km altitude)

   🛰️     🛰️     🛰️     🛰️     🛰️
    \      |      |      |      /
     \     |      |      |     /
      \    |      |      |    /
       \   |      |      |   /
        🏠 Ground Station 🏢
```

**How it works:**
1. User dish connects to nearest overhead satellite
2. Satellite hands off to next satellite as it moves
3. Eventually reaches satellite over ground station (gateway)
4. Gateway connects to internet

**Phased array antenna:**
- Electronic beam steering (no moving parts)
- Tracks satellites as they move

### LEO vs GEO Detailed Comparison

| Characteristic | GEO | LEO |
|---------------|-----|-----|
| **Altitude** | 35,786 km | 180-2,000 km |
| **Round-trip latency** | 500-700 ms | 20-40 ms |
| **Satellites for global coverage** | 3 | 600-12,000+ |
| **Satellite lifespan** | 15-20 years | 5-7 years |
| **Ground antenna** | Fixed (stationary satellite) | Phased array (tracking) |
| **Coverage per satellite** | ~1/3 of Earth | ~1,000 km radius |
| **Launch cost per satellite** | $100-400 million | $0.5-5 million |
| **Inter-satellite links** | Rare | Common (laser links) |
| **Suitable for VoIP** | No (too much latency) | Yes |
| **Weather sensitivity** | Moderate | Lower (shorter path) |

### Satellite Signal Propagation

Understanding how satellite signals travel is important for troubleshooting and design:

**Free Space Path Loss (FSPL):**

Signal strength decreases with distance according to the inverse square law. The longer the path, the weaker the received signal.

```
FSPL (dB) = 20 × log10(d) + 20 × log10(f) + 32.44

Where:
  d = distance in km
  f = frequency in MHz

Example (GEO at Ku-band, 12 GHz):
  FSPL = 20×log10(35786) + 20×log10(12000) + 32.44
  FSPL = 91.07 + 81.58 + 32.44
  FSPL = 205.09 dB

Example (LEO at Ku-band, 550 km):
  FSPL = 20×log10(550) + 20×log10(12000) + 32.44
  FSPL = 54.81 + 81.58 + 32.44
  FSPL = 168.83 dB

Difference: 205.09 - 168.83 = 36.26 dB
  (GEO signal is ~4,200 times weaker than LEO!)
```

> **Key Insight:** LEO satellites have a **36 dB advantage** in signal strength over GEO at the same frequency, which translates to roughly 4,200 times more signal power at the receiver. This is why LEO satellites can use much smaller dishes and lower-power transmitters.

### Link Budget Basics

A **link budget** calculates whether a satellite link will work reliably:

```
Link Budget:

  Transmit Power (EIRP):        +50 dBW
  Free Space Path Loss:        -205 dB
  Atmospheric Loss:              -2 dB
  Rain Fade Margin:              -6 dB
  Receive Antenna Gain:         +40 dBi
  System Noise:                 -25 dBW
                               --------
  Carrier-to-Noise (C/N):     = 12 dB  (need >10 dB for reliable link)

  If C/N < required threshold → link margin insufficient
  Solutions: Larger dish, more transmit power, lower data rate
```

---

## VSAT (Very Small Aperture Terminal)

### What is VSAT?

**VSAT** is a satellite ground station with small antenna (typically 0.75-2.4 meters).

**"Very Small"** compared to large satellite dishes (3-10 meters).

### VSAT Architecture

#### Two-Way VSAT

```
Customer Site               Hub Station
┌────────────┐             ┌────────────┐
│   VSAT     │             │  Large     │
│   Dish     │             │  Dish      │
│  (0.75-2m) │             │  (5-10m)   │
└──────┬─────┘             └──────┬─────┘
       │                          │
       │        Satellite         │
       └──────────▶🛰️◀───────────┘
                   │
              GEO Satellite
```

**Hub station:**
- Central ground station (large antenna)
- Connects to internet/corporate network
- Manages multiple VSATs

**Customer VSAT:**
- Small dish at customer site
- Sends/receives via hub

#### Mesh VSAT

**Direct satellite-to-satellite:**
- VSATs communicate directly via satellite
- No hub required (for VSAT-to-VSAT traffic)

**Use case:**
- Branch offices connecting to each other

### VSAT Components

**ODU (Outdoor Unit):**
- Antenna (dish)
- LNB (Low-Noise Block): Receives downlink signal
- BUC (Block Upconverter): Transmits uplink signal

**IDU (Indoor Unit):**
- Satellite modem
- Connects to router via Ethernet

**Cabling:**
- Coaxial cable between ODU and IDU

---

## Satellite Internet Technologies

### Traditional GEO Satellite Internet

**Providers:**
- HughesNet
- Viasat

**Specifications:**
- **Speeds**: 25-100 Mbps download, 3-10 Mbps upload
- **Latency**: 500-700 ms (round-trip)
- **Data caps**: 10-150 GB/month
- **Dish size**: 0.75-1.2 meters

**Limitations:**
- High latency (unsuitable for VoIP, gaming, video calls)
- Data caps (overage charges or throttling)
- Weather sensitivity (rain fade)

### LEO Satellite Internet (Starlink)

**Provider:**
- SpaceX Starlink (most deployed)

**Specifications:**
- **Speeds**: 50-200 Mbps download, 10-20 Mbps upload
- **Latency**: 20-40 ms (much lower than GEO)
- **No hard data caps** (may throttle heavy users)
- **Dish size**: 0.48 meters (19 inches)

**Advantages over GEO:**
✅ Much lower latency (usable for gaming, VoIP)
✅ Higher speeds
✅ No hard data caps

**Disadvantages:**
❌ More expensive equipment ($599+ dish)
❌ Requires clear view of sky (northern sky for USA)
❌ Not available everywhere (coverage expanding)

---

## Latency Considerations

### Why Satellite Has High Latency

**Distance causes delay:**

**GEO satellite example:**
```
Ground → Satellite: 35,786 km
Satellite → Ground: 35,786 km
Total distance: 71,572 km

At speed of light (300,000 km/s):
71,572 km ÷ 300,000 km/s = 238 ms (one way)

Round-trip: 238 × 2 = 476 ms
Add processing/queuing: ~500-700 ms total
```

**LEO satellite (Starlink) example:**
```
Ground → Satellite: 550 km
Satellite → Ground: 550 km
Total distance: 1,100 km

1,100 km ÷ 300,000 km/s = 3.7 ms (one way)
Round-trip: 7.4 ms
Add processing/inter-satellite links: ~20-40 ms total
```

### Impact of High Latency

**Affected applications:**

❌ **VoIP (Voice over IP):**
- Noticeable delay (talking over each other)
- Acceptable latency: <150 ms
- GEO satellite: 500-700 ms (poor experience)

❌ **Video conferencing:**
- Laggy, out-of-sync
- Similar to VoIP issues

❌ **Online gaming:**
- Slow response time
- Unplayable for fast-paced games (FPS, racing)

❌ **VPN:**
- Slow to establish connection
- TCP handshakes take longer

**Less affected applications:**

✅ **Web browsing:**
- Noticeable page load delay
- Still usable

✅ **Email:**
- Not latency-sensitive

✅ **File downloads:**
- Throughput matters more than latency

✅ **Video streaming:**
- Buffering compensates for latency

### TCP Performance Over Satellite

**TCP challenges:**
- TCP window size limits throughput
- High latency = long RTT (Round-Trip Time)
- Window exhaustion (sender waits for ACKs)

**TCP throughput over satellite calculation:**
```
Maximum TCP throughput = Window Size / RTT

Example with default TCP window (64 KB) over GEO:
  Throughput = 65,536 bytes × 8 bits / 0.6 sec
  Throughput = 524,288 / 0.6
  Throughput = 873,813 bps ≈ 874 Kbps

  Even on a 25 Mbps satellite link, a single TCP
  connection can only achieve ~874 Kbps!

With TCP window scaling (1 MB window):
  Throughput = 1,048,576 × 8 / 0.6
  Throughput = 13,981,013 bps ≈ 14 Mbps

  Better, but still only 56% of 25 Mbps link capacity
```

**Solutions:**
- **TCP acceleration (PEP – Performance Enhancing Proxy)**: Proxies at hub and VSAT terminal spoof TCP acknowledgments locally, preventing the sender from waiting for the actual ACK to traverse the satellite link
- **Large TCP windows (Window Scaling)**: RFC 7323 allows TCP window sizes up to 1 GB, improving throughput on high-bandwidth, high-latency links
- **UDP-based protocols**: QUIC (used by HTTP/3) handles loss recovery more efficiently than TCP over satellite
- **Multiple parallel TCP streams**: Applications like download accelerators open many TCP connections simultaneously to multiply throughput

```
PEP (Performance Enhancing Proxy) Architecture:

  Client ←─ TCP ─→ Local PEP ←─ Optimized ─→ Remote PEP ←─ TCP ─→ Server
     (normal TCP)     (at VSAT)    (protocol)     (at hub)    (normal TCP)

  Local PEP sends ACKs immediately to the client
  Uses optimized protocol over satellite segment
  Remote PEP reconstructs normal TCP to server
```

> **Exam Tip:** TCP window scaling (RFC 7323) is critical for satellite links. Without it, the default 64 KB window limits throughput regardless of available bandwidth. This applies to any high-latency, high-bandwidth link—known as a **Long Fat Network (LFN)** or "elephan" pipe.

---

## Satellite Interference and Regulatory Considerations

### Types of Interference

**Adjacent Satellite Interference (ASI):**
- Signals from nearby GEO satellites (spaced 2° apart) bleed into the dish
- Mitigation: Precise dish alignment, larger dishes with narrower beamwidth

**Terrestrial Interference:**
- Microwave towers, radar, 5G C-band signals can interfere with satellite frequencies
- The FCC’s C-band auction (2021) reallocated 3.7-4.0 GHz from satellite to 5G, requiring filters on satellite dishes

**Co-channel Interference:**
- Multiple VSAT terminals on the same frequency in the same beam
- Managed by the hub station’s TDMA or FDMA access scheme

### Regulatory Bodies

| Organization | Role |
|-------------|------|
| **ITU (International Telecom Union)** | Allocates satellite frequency bands and orbital slots |
| **FCC (Federal Communications Commission)** | Regulates satellite communications in the United States |
| **Ofcom** | Regulates satellite communications in the United Kingdom |
| **ETSI** | European standards for satellite equipment |

### Orbital Slot Management

GEO orbital slots are a **limited resource**—only so many satellites can be placed 2° apart along the equatorial arc without causing interference. The ITU coordinates slot assignments internationally to prevent conflicts.

---

## Frequency Bands

### Satellite Frequency Bands

| Band | Frequency | Use |
|------|-----------|-----|
| **L-band** | 1-2 GHz | Mobile satellite (Iridium) |
| **S-band** | 2-4 GHz | Mobile satellite |
| **C-band** | 4-8 GHz | Traditional satellite internet/TV |
| **X-band** | 8-12 GHz | Military, government |
| **Ku-band** | 12-18 GHz | Satellite internet, TV (common) |
| **Ka-band** | 26-40 GHz | High-throughput satellite (HughesNet, Viasat) |

**Higher frequency = higher bandwidth but:**
- More susceptible to rain fade
- Requires more precise dish alignment

---

## Advantages of Satellite Communication

✅ **Global coverage**: Works anywhere (even oceans, deserts)
✅ **No infrastructure required**: No cables/fiber needed
✅ **Rapid deployment**: Install dish quickly
✅ **Remote locations**: Only option for some areas
✅ **Mobile**: Can be used on ships, planes, vehicles

---

## Disadvantages of Satellite Communication

❌ **High latency**: 500-700 ms for GEO (20-40 ms for LEO)
❌ **Weather-dependent**: Rain/snow degrades signal (rain fade)
❌ **Line-of-sight required**: Trees, buildings block signal
❌ **Data caps**: Limited monthly data (GEO providers)
❌ **Expensive**: Higher cost per Mbps than terrestrial
❌ **Latency issues**: Poor for VoIP, gaming, video calls (GEO)

---

## Use Cases for Satellite Internet

### Primary Internet (Remote Areas)

**Scenario:**
- Rural location with no DSL/cable/fiber
- Too far from cell towers

**Solution:**
- Satellite internet (Starlink or GEO provider)

### Backup WAN Connection

**Scenario:**
- Business needs redundant internet
- Primary: Fiber or cable
- Backup: Satellite (failover)

**Benefit:**
- Diverse path (not affected by cable cuts)

### Mobile Connectivity

**Maritime:**
- Ships at sea
- VSAT for crew internet, operations

**Aviation:**
- In-flight Wi-Fi
- GEO or LEO satellites

**Land mobile:**
- RVs, trucks
- Starlink Roam (mobile service)

### Emergency/Disaster Recovery

**Scenario:**
- Natural disaster destroys terrestrial infrastructure

**Solution:**
- Portable VSAT (rapid deployment)
- Starlink (quick setup)

### Government/Military

**Remote bases:**
- Military operations in remote areas
- X-band satellite (secure, dedicated)

---

## Rain Fade

### What is Rain Fade?

**Rain fade:**
- Signal attenuation caused by rain
- Water droplets absorb/scatter radio waves

**Severity increases with:**
- Higher frequency (Ka-band worse than Ku-band)
- Heavier rain
- Longer path through rain

### Mitigation

**Adaptive coding and modulation:**
- Reduce data rate during rain (more robust encoding)
- Maintain connection (slower speeds)

**Site diversity:**
- Multiple ground stations (geographically separated)
- Route traffic through station with clear weather

**Fade margin:**
- Design link with extra power (headroom)

### Rain Fade by Frequency Band

The impact of rain on satellite signals varies significantly by frequency:

```
Rain Attenuation (moderate rain, 10 mm/hr):

  C-band  (6 GHz):   0.1 dB   █          (minimal impact)
  Ku-band (14 GHz):  2.5 dB   █████      (moderate)
  Ka-band (30 GHz):  8.0 dB   ███████████████  (severe)
  V-band  (50 GHz): 15.0 dB   ████████████████████████  (extreme)
```

This is why **C-band** has historically been preferred for satellite TV and communications in tropical regions with heavy rainfall, despite offering lower bandwidth. **Ka-band** provides much more bandwidth but requires larger fade margins.

> **Exam Tip:** When selecting satellite service for a location with frequent heavy rain (e.g., Southeast Asia, equatorial regions), C-band or Ku-band may be more reliable than Ka-band despite offering lower throughput. The exam may test your understanding of this **frequency vs rain fade trade-off**.

---

## Emerging Satellite Technologies

### Inter-Satellite Links (ISLs)

Modern LEO constellations use **laser inter-satellite links** to relay data between satellites without touching the ground:

```
  User → LEO Sat A → (laser link) → LEO Sat B → (laser link) 
  → LEO Sat C → Ground Station → Internet

  Speed of light in vacuum: 299,792 km/s
  Speed of light in fiber:  ~200,000 km/s

  For long distances, satellite laser links can actually be
  FASTER than fiber due to the speed advantage in vacuum!
```

Starlink’s laser ISLs can potentially provide **lower latency** than undersea fiber cables for intercontinental routes—a major advantage for financial trading and real-time applications.

### Non-Terrestrial Networks (NTN) and 5G

3GPP Release 17 introduced **Non-Terrestrial Network** support, enabling direct satellite-to-smartphone communication without specialized satellite phones. This represents the convergence of cellular and satellite technologies.

---

## Summary

1. **Satellite communication** uses orbiting satellites as relay stations for remote connectivity
2. **GEO satellites** at 35,786 km altitude appear stationary but have 500-700 ms latency
3. **LEO satellites** at 180-2,000 km altitude have 20-40 ms latency but require constellation (many satellites)
4. **VSAT (Very Small Aperture Terminal)** is satellite ground station with small dish (0.75-2.4 meters)
5. **High latency** impacts VoIP, gaming, video conferencing (TCP performance suffers)
6. **Starlink** uses LEO constellation for low latency (20-40 ms) compared to GEO (500-700 ms)
7. **Rain fade** degrades signal quality during heavy rain (higher frequencies more affected)
8. **Satellite internet use cases**: Remote areas, backup WAN, mobile connectivity, disaster recovery
9. **Frequency bands**: C-band, Ku-band, Ka-band (higher frequency = more bandwidth but more rain fade)
10. **LEO advantages**: Low latency, suitable for real-time apps; **GEO advantages**: Wide coverage, stationary position

---

## Practice Questions

**Q1.** At what altitude do GEO (Geostationary Earth Orbit) satellites orbit, and what is their typical round-trip latency?

A) 2,000 km; 20-40 ms
B) 35,786 km; 500-700 ms
C) 10,000 km; 100-200 ms
D) 180 km; 5-10 ms

<details>
<summary>Answer</summary>

**B)** GEO satellites orbit at 35,786 km altitude, which causes round-trip latency of 500-700 ms. At this altitude, the satellite's orbital period matches Earth's rotation, making it appear stationary.
</details>

**Q2.** Which satellite orbit type does Starlink use to achieve low latency comparable to terrestrial broadband?

A) GEO (Geostationary)
B) MEO (Medium Earth Orbit)
C) LEO (Low Earth Orbit)
D) HEO (Highly Elliptical Orbit)

<details>
<summary>Answer</summary>

**C)** Starlink uses LEO (Low Earth Orbit) satellites at approximately 550 km altitude, achieving latency of 20-40 ms. LEO requires a constellation of many satellites to maintain continuous coverage.
</details>

**Q3.** What is a VSAT (Very Small Aperture Terminal)?

A) A type of satellite in orbit
B) A satellite ground station with a small dish antenna (0.75-2.4 meters)
C) A cellular base station
D) A fiber optic termination point

<details>
<summary>Answer</summary>

**B)** A VSAT is a satellite ground station consisting of a small dish antenna (0.75-2.4 meters), a transceiver, and a modem. It communicates with satellites for data, voice, and video transmission.
</details>

**Q4.** Which atmospheric condition MOST commonly degrades satellite communication signals?

A) Wind
B) Snow
C) Heavy rain (rain fade)
D) Fog

<details>
<summary>Answer</summary>

**C)** Rain fade is the most significant atmospheric impairment for satellite signals. Heavy rain absorbs and scatters radio waves, with higher frequencies (Ka-band) being more affected than lower frequencies (C-band).
</details>

**Q5.** Why is GEO satellite internet problematic for VoIP and online gaming?

A) Limited bandwidth
B) High latency (500-700 ms round trip)
C) Frequent disconnections
D) Incompatible protocols

<details>
<summary>Answer</summary>

**B)** GEO satellite's 500-700 ms round-trip latency causes noticeable delays in real-time applications like VoIP and gaming. It also degrades TCP performance due to the long delay in acknowledgments.
</details>

**Q6.** Which satellite frequency band offers the MOST bandwidth but is MOST susceptible to rain fade?

A) C-band
B) Ku-band
C) Ka-band
D) L-band

<details>
<summary>Answer</summary>

**C)** Ka-band operates at the highest frequencies among common satellite bands, providing the most bandwidth but being most susceptible to rain fade. C-band has the least rain fade but lower bandwidth.
</details>

**Q7.** What is the PRIMARY use case for satellite internet connectivity?

A) High-frequency trading
B) Replacing fiber in urban areas
C) Providing internet to remote and rural areas without terrestrial infrastructure
D) Datacenter interconnection

<details>
<summary>Answer</summary>

**C)** Satellite internet is primarily used to provide connectivity to remote and rural areas where terrestrial broadband (DSL, cable, fiber) is not available. It also serves as backup WAN and for mobile/maritime use.
</details>

**Q8.** What is the PRIMARY disadvantage of LEO satellite constellations compared to GEO satellites?

A) Higher latency
B) Requires hundreds or thousands of satellites for global coverage
C) Cannot provide broadband speeds
D) Signals cannot penetrate clouds

<details>
<summary>Answer</summary>

**B)** Because LEO satellites orbit much closer to Earth and move quickly across the sky, hundreds or thousands of satellites are needed to provide continuous global coverage. A single GEO satellite can cover about one-third of Earth.
</details>

**Q9.** What is rain fade, and which satellite frequency bands are MOST affected by it?

A) Signal loss caused by the satellite moving out of range; affects L-band most
B) Signal attenuation caused by rain absorbing or scattering radio waves; higher-frequency bands like Ka-band are most affected
C) A reduction in satellite transmit power during storms; affects all bands equally
D) Interference from lightning strikes; affects C-band most

<details>
<summary>Answer</summary>

**B)** Rain fade is the attenuation (weakening) of a satellite signal caused by rain droplets absorbing and scattering radio waves. Higher-frequency bands such as Ka-band (26-40 GHz) and Ku-band (12-18 GHz) are most susceptible because their shorter wavelengths interact more with raindrops. Lower frequencies like C-band are more resistant to rain fade.
</details>

**Q10.** Why does TCP perform poorly over GEO satellite links with default settings, and what is the recommended solution?

A) TCP cannot operate over wireless links; use UDP instead
B) The high latency causes the default TCP window size to limit throughput; TCP window scaling should be enabled
C) TCP packets are too large for satellite transmission; reduce the MTU to 512 bytes
D) Satellite links do not support TCP acknowledgments; use connectionless protocols

<details>
<summary>Answer</summary>

**B)** With GEO satellite latency of 500-700 ms round-trip, the default TCP window size (64 KB) limits throughput to approximately 874 Kbps regardless of available bandwidth. Enabling TCP window scaling (RFC 7323) allows much larger windows (up to 1 GB), significantly improving throughput on high-latency, high-bandwidth links known as Long Fat Networks (LFNs).
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 2.1:** Compare and contrast WAN technologies (Satellite)
- SpaceX Starlink Documentation
- ITU Radio Regulations (Satellite Frequency Allocations)
- Viasat/HughesNet Technical Specifications
- Professor Messer: Network+ N10-009 - Satellite Communications

---

**Next Lesson:** Lesson 74 - Remote Access Technologies (VPN, RDP, SSH)
