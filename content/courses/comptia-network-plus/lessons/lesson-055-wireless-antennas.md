---
id: lesson-055-wireless-antennas
title: "Wireless Antennas and Propagation"
chapterId: "chapter-006-wireless-networking"
order: 55
duration: 15
objectives:
  - Understand antenna types and radiation patterns
  - Compare omnidirectional and directional antennas
  - Explain antenna gain and its effects
  - Understand MIMO and spatial diversity
  - Identify appropriate antenna selection for scenarios
---

# Wireless Antennas and Propagation

Antennas are critical components of wireless networks that **transmit and receive radio frequency signals**. Understanding antenna types, characteristics, and placement is essential for designing optimal wireless coverage and performance.

---

## Antenna Fundamentals

### How Antennas Work

**Antennas convert electrical signals to radio waves (transmit) and radio waves to electrical signals (receive)**:

- **Transmission**: Electrical current creates electromagnetic field that propagates through space
- **Reception**: Electromagnetic waves induce electrical current in antenna
- **Reciprocity**: Transmission and reception patterns are identical

### Antenna Characteristics

**1. Radiation Pattern**:
- **3D representation** of signal strength in all directions
- Determines coverage shape
- Types: Omnidirectional, directional, sector

**2. Polarization**:
- **Orientation of electric field** in electromagnetic wave
- **Vertical**: Most common for Wi-Fi (antenna perpendicular to ground)
- **Horizontal**: Antenna parallel to ground
- **Mismatch reduces signal strength**

**3. Antenna Gain**:
- Measured in **dBi** (decibels relative to isotropic radiator)
- **Not amplification** - focuses energy in specific direction
- Higher gain = narrower beam, longer range in that direction
- Trade-off: Range vs coverage width

**4. Beamwidth**:
- **Angle** of main radiation lobe
- Measured in degrees
- Narrower beam = higher gain, longer range
- Wider beam = lower gain, broader coverage

---

## Antenna Types

### 1. Omnidirectional Antennas

**Radiate equally in all directions** (360° horizontal plane).

**Characteristics**:
- **Radiation pattern**: Donut-shaped (strongest at sides, weaker above/below)
- **Typical gain**: 2-9 dBi
- **Use case**: General coverage, mobile clients

**Types**:

**Dipole Antenna**:
- Simple, two-element design
- 2.14 dBi gain (standard reference)
- Most basic Wi-Fi antenna

**Rubber Duck Antenna**:
- Common on routers and APs
- 2-5 dBi gain
- Flexible, vertical orientation
- Omnidirectional coverage

**Ceiling-Mounted AP Antenna**:
- Integrated in enterprise APs
- 3-6 dBi gain
- Provides coverage below and around AP
- Ideal for office spaces

```
Top View (Omnidirectional):
        Weak
         ↑
         |
  ←──────●──────→  Strong (all directions)
         |
         ↓
       Weak

Side View (Donut pattern):
      Weak
        ↑
    ╱───●───╲
   ← Strong →
    ╲───●───╱
        ↓
      Weak
```

**Best For**:
- Indoor coverage
- Mobile clients moving in all directions
- Central AP placement
- Conference rooms, offices, homes

---

### 2. Directional Antennas

**Focus energy in specific direction** for long-range point-to-point or point-to-multipoint links.

#### Yagi Antenna

**Characteristics**:
- Multiple elements (director, driven, reflector)
- **High gain**: 10-18 dBi
- **Narrow beam**: 30-60° beamwidth
- Long range (outdoor)

**Use Cases**:
- Point-to-point wireless bridges
- Extending Wi-Fi to remote buildings
- Connecting distant sites
- Client bridge to distant AP

```
Yagi Pattern (Side View):
         
    ║    Main Lobe
    ║   ──────────>
    ║ 
  Yagi Antenna
```

#### Patch/Panel Antenna

**Characteristics**:
- Flat, panel-shaped
- **Moderate gain**: 8-14 dBi
- **Moderate beam**: 60-90° beamwidth
- Indoor/outdoor use

**Use Cases**:
- Covering hallways or corridors
- Warehouse aisles
- Stadium seating areas
- Wall-mounted coverage

```
Patch Pattern (Top View):
        |
        | 60-90°
      /   \
     /     \
    /       \
   └─────────┘
   Patch Antenna
```

#### Parabolic Grid Antenna

**Characteristics**:
- Dish or grid reflector
- **Very high gain**: 19-30+ dBi
- **Very narrow beam**: 5-20° beamwidth
- Long-range outdoor

**Use Cases**:
- Long-distance point-to-point (5-10+ km)
- Wireless ISP (WISP) backhaul
- Building-to-building connections
- Requires precise aiming

```
Parabolic Pattern:
         
    (    Highly Focused
    (    ═══════════════>
    (    
  Parabolic Dish
```

---

### 3. Sector Antennas

**Cover specific sector** (e.g., 120° or 90°), used in cellular and outdoor Wi-Fi.

**Characteristics**:
- **Gain**: 12-18 dBi
- **Beamwidth**: 60-120° horizontal, 7-20° vertical
- Narrow vertical beam (focuses energy outward, not up)

**Use Cases**:
- Outdoor coverage (stadiums, campuses)
- Cell towers (three 120° sectors = 360° coverage)
- High-density outdoor events
- Point-to-multipoint

```
Sector Coverage (Top View - 3 sectors):
           
      120°   120°   120°
       ╱│╲   ╱│╲   ╱│╲
      ╱ │ ╲ ╱ │ ╲ ╱ │ ╲
       Sector Antennas on Tower
```

---

## Antenna Gain

### Understanding dBi

**dBi** (decibels relative to isotropic radiator) measures antenna gain:

- **Isotropic antenna**: Theoretical antenna radiating equally in all directions (sphere)
- **0 dBi**: Isotropic reference
- **2.14 dBi**: Standard dipole antenna
- **Higher dBi**: More focused energy

**Gain vs Coverage**:
| Gain | Type | Pattern | Range | Coverage |
|------|------|---------|-------|----------|
| 2-5 dBi | Omni | Donut | Medium | Wide 360° |
| 7-9 dBi | Omni | Flatter donut | Longer | Wider horizontal |
| 10-15 dBi | Directional | Focused beam | Long | Narrow sector |
| 20+ dBi | Parabolic | Tight beam | Very long | Very narrow |

**Key Principle**: 
- **+3 dBi doubles effective range** in that direction
- But narrows coverage angle

```
Low Gain (5 dBi):        High Gain (15 dBi):
     Wide                    Narrow
   ╱───╲                      │
  ╱     ╲                     │
 ╱       ╲                    │
 Short Range                Long Range
```

### EIRP (Effective Isotropic Radiated Power)

**EIRP = Transmit Power + Antenna Gain - Cable Loss**

Example:
- Transmit Power: 20 dBm
- Antenna Gain: +12 dBi
- Cable Loss: -2 dB
- **EIRP = 20 + 12 - 2 = 30 dBm**

**Regulatory Limits**:
- FCC (USA): 36 dBm EIRP maximum (point-to-multipoint)
- Higher EIRP allowed for point-to-point with restrictions

---

## MIMO and Spatial Streams

### MIMO (Multiple Input Multiple Output)

**Multiple antennas** on both transmitter and receiver enable simultaneous data streams.

**Notation**: **TxR:S**
- **T**: Transmit antennas (radio chains)
- **R**: Receive antennas
- **S**: Spatial streams (simultaneous data streams)

**Examples**:
- **2x2:2** - 2 transmit, 2 receive, 2 spatial streams
- **4x4:4** - 4 transmit, 4 receive, 4 spatial streams
- **4x4:3** - 4 transmit, 4 receive, 3 spatial streams (common)

**Benefits**:
- **Higher throughput**: Each spatial stream carries independent data
- **Spatial diversity**: Multiple paths improve reliability
- **Beamforming**: Focus signal toward client

### Spatial Diversity

**Multiple antennas** improve reliability by providing:

**1. Antenna Diversity**:
- AP selects best antenna for each transmission
- Combats multipath and fading
- Minimum 2 antennas per radio

**2. Spatial Multiplexing** (MIMO):
- Transmits multiple streams simultaneously
- Requires multipath (reflections)
- Increases throughput

**3. Beamforming**:
- Adjusts phase of each antenna
- Focuses signal toward client
- Improves range and SNR

```
Single Antenna:           MIMO (2x2):
   AP                        AP
   ║                       ║ ║
   ║                       ║ ║
   ↓                       ↓ ↓
 Client                  ║   ║
                        Client
                       (2 streams)
```

### MU-MIMO (Multi-User MIMO)

**Transmits to multiple clients simultaneously** (802.11ac Wave 2+):

- **Downlink MU-MIMO** (802.11ac): AP to clients
- **Uplink + Downlink MU-MIMO** (802.11ax): Both directions
- Up to 4 clients (802.11ac) or 8 clients (802.11ax)
- Requires compatible clients

```
Without MU-MIMO:
AP → [Client 1] → [Client 2] → [Client 3] (sequential)

With MU-MIMO:
AP → [Client 1]
   → [Client 2]  (simultaneous)
   → [Client 3]
```

---

## Antenna Placement and Design

### Indoor Antenna Placement

**Best Practices**:

1. **Central Location**: Place AP centrally for even coverage
2. **Elevation**: Mount at ceiling height (8-12 feet)
3. **Avoid Obstacles**: Keep clear of metal, concrete, water
4. **Orientation**: Match antenna polarization (usually vertical)
5. **Spacing**: Overlap coverage 20-30% for seamless roaming

**Common Mistakes**:
- Mounting in corner (wastes half the coverage)
- Too low (obstructed by furniture, people)
- Behind metal cabinets or in closets
- Too many APs (co-channel interference)

### Outdoor Antenna Placement

**Considerations**:

1. **Line of Sight**: Clear Fresnel zone (60% minimum)
2. **Height**: Higher is better (reduces obstacles)
3. **Weather Protection**: Use outdoor-rated equipment
4. **Grounding**: Lightning protection essential
5. **Aiming**: Precise alignment for directional antennas

**Fresnel Zone**:
- Elliptical area around line-of-sight path
- Must be 60%+ clear for optimal performance
- Obstructions cause signal loss

```
Fresnel Zone (Side View):
        ╱───╲
    AP ●     ● Client
        ╲───╱
   Keep 60% clear
```

---

## Antenna Selection Guide

### Scenario-Based Selection

| Scenario | Antenna Type | Gain | Notes |
|----------|--------------|------|-------|
| Office (ceiling AP) | Omni | 3-5 dBi | Standard integrated |
| Large warehouse | High-gain omni | 7-9 dBi | Wider horizontal |
| Hallway/corridor | Patch/panel | 8-12 dBi | Directional coverage |
| Outdoor event | Sector | 14-18 dBi | Multiple sectors |
| Point-to-point <1km | Yagi | 12-16 dBi | 30-60° beam |
| Point-to-point >1km | Parabolic | 24-30 dBi | 5-15° beam |
| Stadium | Sector array | 15-18 dBi | High capacity |

### Regulatory Considerations

**Power Limits**:
- Must comply with FCC (USA), ETSI (Europe), or local regulations
- **2.4 GHz**: Typically 30 dBm EIRP (1 watt)
- **5 GHz**: Varies by channel, typically 30-36 dBm EIRP

**Unlicensed Operation**:
- Wi-Fi operates in **unlicensed ISM bands**
- No license required for low-power operation
- Must accept interference from other devices

---

## Summary

**Key Takeaways**:

1. **Omnidirectional**: 360° coverage, 2-9 dBi, indoor/general use
2. **Directional (Yagi)**: Narrow beam, 10-18 dBi, point-to-point
3. **Directional (Parabolic)**: Very narrow beam, 20-30+ dBi, long-range
4. **Sector**: 60-120° coverage, 12-18 dBi, outdoor/cellular
5. **Antenna Gain (dBi)**: Focuses energy, longer range but narrower coverage
6. **MIMO**: Multiple antennas, multiple spatial streams, higher throughput
7. **MU-MIMO**: Transmit to multiple clients simultaneously (802.11ac+)
8. **Spatial Diversity**: Multiple antennas improve reliability
9. **Placement**: Central location, elevated, clear of obstacles
10. **Selection**: Match antenna type and gain to use case and environment

**Quick Reference**:
- **Indoor coverage**: Omnidirectional (3-5 dBi)
- **Long hallway**: Directional patch (8-12 dBi)
- **Outdoor campus**: Sector array (14-18 dBi)
- **Building-to-building**: Directional Yagi or parabolic (15-30 dBi)

Proper antenna selection and placement are crucial for achieving optimal wireless coverage, capacity, and performance. Understanding antenna characteristics enables informed design decisions.
