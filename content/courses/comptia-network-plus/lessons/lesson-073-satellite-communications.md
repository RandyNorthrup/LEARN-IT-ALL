---
id: lesson-073-satellite-communications
title: "Satellite Communications (VSAT, Latency Considerations)"
chapterId: "chapter-008-wan-technologies"
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

**Satellite communications** provide internet and data connectivity via orbiting satellites, enabling coverage in remote areas where terrestrial infrastructure is unavailable. Key technology is **VSAT (Very Small Aperture Terminal)**.

This lesson covers satellite fundamentals—important for the CompTIA Network+ N10-008 exam.

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

**Solutions:**
- **TCP acceleration**: Proxies/optimizers at hub
- **Large TCP windows**: Increase window size
- **UDP-based protocols**: QUIC, custom protocols

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

---

## Key Takeaways

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

## References

- **CompTIA Network+ N10-008 Objective 2.1:** Compare and contrast WAN technologies (Satellite)
- SpaceX Starlink Documentation
- ITU Radio Regulations (Satellite Frequency Allocations)
- Viasat/HughesNet Technical Specifications
- Professor Messer: Network+ N10-008 - Satellite Communications

---

**Next Lesson:** Lesson 74 - Remote Access Technologies (VPN, RDP, SSH)
