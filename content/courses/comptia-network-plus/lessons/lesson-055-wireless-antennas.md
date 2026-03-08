---
id: lesson-055-wireless-antennas
title: "Wireless Antennas and Propagation"
chapterId: ch6-wireless-networking
order: 55
duration: 50
objectives:
  - Understand antenna types and radiation patterns
  - Compare omnidirectional and directional antennas
  - Explain antenna gain and its effects
  - Understand MIMO and spatial diversity
  - Identify appropriate antenna selection for scenarios
---

# Lesson 55: Wireless Antennas and Propagation

## Introduction

Antennas are the critical interface between a wireless device's electronic circuitry and the radio frequency (RF) environment. They **convert electrical signals to electromagnetic waves** for transmission and perform the reverse conversion for reception. While access points and wireless controllers receive significant attention in network design, antenna selection and placement often determine whether a deployment succeeds or fails.

This lesson provides comprehensive coverage of antenna types (omnidirectional, directional, and sector), their radiation patterns, gain characteristics measured in dBi, polarization considerations, EIRP calculations, MIMO antenna arrays, and practical guidance for selecting and mounting antennas in indoor and outdoor scenarios. Mastering these concepts is essential for designing wireless networks that deliver reliable coverage, adequate capacity, and predictable performance.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand antenna types and radiation patterns
- Compare omnidirectional and directional antennas
- Explain antenna gain and its effects
- Understand MIMO and spatial diversity
- Identify appropriate antenna selection for scenarios

---

## Antenna Fundamentals

### How Antennas Work

An antenna is a transducer — it converts between two forms of energy:

- **Transmission**: Alternating electrical current from the radio creates a time-varying electromagnetic field that radiates outward as a wave
- **Reception**: An incoming electromagnetic wave induces an alternating current in the antenna's conductive element
- **Reciprocity Principle**: An antenna's transmission pattern and reception pattern are **identical** — a property guaranteed by the Lorentz reciprocity theorem

Every antenna has an inherent **resonant frequency** determined by its physical dimensions. A half-wave dipole for 2.4 GHz is approximately 6.25 cm long (half of the ~12.5 cm wavelength). For 5 GHz, the half-wave length is approximately 2.8 cm. Antenna design balances resonance, bandwidth, gain, and physical form factor.

### Key Antenna Characteristics

**1. Radiation Pattern**:
The radiation pattern is a **three-dimensional representation** of the antenna's radiated power as a function of direction. Patterns are typically visualized as two 2D cross-sections:
- **E-plane (elevation)**: Vertical slice through the pattern
- **H-plane (azimuth)**: Horizontal slice through the pattern

**2. Gain (dBi)**:
Antenna gain measures how much the antenna focuses energy in a particular direction compared to a theoretical **isotropic radiator** (a point source radiating equally in all directions). Gain is measured in **dBi** (decibels relative to isotropic). Important: gain does not amplify signal — it **redirects** energy from less-useful directions to more-useful ones.

**3. Beamwidth**:
Beamwidth is the angular width of the main radiation lobe, measured between the **-3 dB points** (where power drops to half). Narrower beamwidth means higher gain and longer range, but less area covered.
- **Horizontal beamwidth**: Coverage width (azimuth plane)
- **Vertical beamwidth**: Coverage height (elevation plane)

**4. Polarization**:
Polarization describes the orientation of the electric field vector as the wave propagates:
- **Vertical polarization**: Electric field oscillates perpendicular to the ground (most common for Wi-Fi)
- **Horizontal polarization**: Electric field oscillates parallel to the ground
- **Circular polarization**: Electric field rotates as the wave propagates (used in GPS, some outdoor links)
- **Cross-polarization loss**: When transmitter and receiver polarizations are mismatched, signal loss of **20 dB or more** can occur at 90 degree misalignment

**5. Impedance**:
Most Wi-Fi antennas are designed for **50 ohm impedance** to match the radio's output. Impedance mismatch causes signal reflection, quantified by **VSWR** (Voltage Standing Wave Ratio) — a VSWR of 2:1 or lower is acceptable.

**6. Front-to-Back Ratio**:
For directional antennas, this ratio (in dB) compares the power radiated in the main direction vs. the opposite direction. Higher is better — a 25 dB front-to-back ratio means the back lobe is 300x weaker than the main lobe.

---

## Antenna Types

### 1. Omnidirectional Antennas

Omnidirectional antennas radiate energy **equally in all horizontal directions** (360 degree azimuth). The radiation pattern viewed from above is a circle; from the side, it is a **donut (toroid)** shape with nulls directly above and below.

```
Omnidirectional Radiation Pattern:

  Top View (Azimuth):          Side View (Elevation):
  
         N                           Null (top)
         |                              |
    W ---*--- E                    /----*----\
         |                        /     |     \
         S                       < Max signal  >
                                  \     |     /
  Equal signal in                  \----*----/
  all horizontal                        |
  directions                       Null (bottom)
                              
                              "Donut" or toroid shape
```

**Types of Omnidirectional Antennas**:

#### Dipole Antenna
- The most fundamental antenna design — two conductive elements of equal length
- Standard half-wave dipole has **2.14 dBi** gain (the reference for dBd measurements)
- Often the baseline for comparison
- Physical length: ~6.25 cm per element at 2.4 GHz

#### Rubber Duck Antenna
- A flexible, helically-wound monopole antenna common on consumer routers
- Typically **2-5 dBi** gain
- Vertically oriented for vertical polarization
- Convenient form factor; adjustable angle on many devices
- Range: adequate for single-room or small-office coverage

#### High-Gain Omnidirectional Antenna
- Extended collinear array design achieving **7-9 dBi** gain
- The donut pattern becomes **flatter and wider** — more energy radiates horizontally, less vertically
- Ideal for: large single-floor warehouses, retail spaces, outdoor plazas
- Trade-off: reduced coverage directly below (if ceiling-mounted) or above (if pole-mounted)

```
Gain vs. Pattern Shape (Omnidirectional):

  Low Gain (2 dBi):       Medium Gain (5 dBi):      High Gain (9 dBi):
  
       /--\                    /----\                   /--------\
      |    |                  |      |                 |          |
      | .  |                 -|  .   |-              --|    .    |--
      |    |                  |      |                 |          |
       \--/                    \----/                   \--------/
  
  Tall donut              Medium donut              Flat donut
  Short range             Moderate range            Long range
  Good vertical           Balanced                  Poor vertical
```

#### Ceiling-Mounted AP (Integrated Omni)
- Enterprise access points (Cisco, Aruba, Ruckus) integrate **3-6 dBi** omnidirectional antennas
- Pattern is usually **downtilted** to project coverage below the AP
- Internal antennas are MIMO arrays (2x2, 4x4, or 8x8) within the AP enclosure
- Cannot be replaced independently — AP model selection determines antenna performance

**Best Uses for Omnidirectional**:
- General indoor coverage (offices, lobbies, classrooms)
- Central AP placement serving clients in all directions
- Mobile client environments where users move freely
- Deployments where simplicity is valued over range

---

### 2. Directional Antennas

Directional antennas concentrate RF energy into a **focused beam**, achieving higher gain and longer range in one direction at the expense of coverage in other directions.

#### Yagi-Uda Antenna

The Yagi (formally Yagi-Uda) consists of a **driven element**, a **reflector** behind it, and one or more **directors** in front, all mounted on a boom.

- **Gain**: 10-18 dBi (increases with more directors)
- **Horizontal Beamwidth**: 30-60 degrees
- **Vertical Beamwidth**: 20-40 degrees
- **Front-to-Back Ratio**: 15-25 dB
- **Typical Use**: Point-to-point links up to 1-2 km

```
Yagi-Uda Antenna Structure:

           Directors (shorter)
  Reflector   |    |    |    |
  (longer)    |    |    |    |
     |        |    |    |    |
  ---|----|---|----|----|----|--> Main Radiation Direction
     |        |    |    |    |
     |        |    |    |    |
               Driven Element
              (connected to radio)

  Radiation Pattern (Top View):
  
  Back lobe        Main lobe
  (small)          (large, focused)
     /\          /------------------\
    |  |        |                    |
    |  *--------|--------------------|--->
    |  |        |                    |
     \/          \------------------/
```

#### Patch (Panel) Antenna

A flat, planar antenna with a radiating patch element over a ground plane. Compact and aesthetically discreet.

- **Gain**: 8-14 dBi
- **Horizontal Beamwidth**: 60-90 degrees
- **Vertical Beamwidth**: 40-70 degrees
- **Form Factor**: Flat panel, easily wall-mounted
- **Typical Use**: Hallways, corridors, warehouse aisles, stadium seating sections

```
Patch Antenna Coverage (Top View):

           |
           |  60-90 degrees
         /   \
        /     \
       /       \
      /         \
     /           \
    /             \
   /               \
  +--------*--------+
     Patch Antenna
      (wall mount)
```

**Advantages**: Low profile, easy to mount indoors or outdoors, moderate gain provides good balance of range and coverage angle.

#### Parabolic (Dish/Grid) Antenna

Uses a parabolic reflector to focus all collected energy to/from a focal point where the feed element is located.

- **Gain**: 19-30+ dBi
- **Horizontal Beamwidth**: 3-15 degrees
- **Vertical Beamwidth**: 3-15 degrees
- **Front-to-Back Ratio**: 25-35 dB
- **Typical Use**: Long-range point-to-point links (5-50+ km)

```
Parabolic Dish Antenna:

  Side View:                      Radiation Pattern (Top View):
  
      /--\                                   |
     |    |                                  | 3-15 degrees
     |  F |  <-- Feed at focal point         |
     |    |                              ====*=================>
     |    |                                  |
      \--/                                   |
       |                                     |
  Parabolic                            Very narrow,
  Reflector                            very long range
```

**Key Considerations**:
- Requires **precise alignment** — even a few degrees off can result in significant signal loss
- Wind loading is substantial; mounting must be rigid
- Grid-style parabolic antennas have lower wind resistance than solid dishes
- Used by WISPs (Wireless Internet Service Providers) for subscriber backhaul

#### Panel Antenna (High-Gain Flat Panel)

Higher-gain version of patch antennas, sometimes using arrays of patch elements:
- **Gain**: 14-23 dBi
- **Beamwidth**: 15-60 degrees
- Commonly used in outdoor point-to-multipoint deployments
- Flatter profile than parabolic, easier to mount

---

### 3. Sector Antennas

Sector antennas provide coverage over a **defined angular sector** (typically 60, 90, or 120 degrees) and are a staple of outdoor wireless and cellular deployments.

- **Gain**: 12-18 dBi
- **Horizontal Beamwidth**: 60, 90, or 120 degrees
- **Vertical Beamwidth**: 7-20 degrees (narrow, directing energy outward rather than up/down)
- **Typical Use**: Outdoor campus coverage, stadiums, cell towers

```
Sector Deployment (Top View — three 120-degree sectors for 360-degree coverage):

                    Sector 1 (Ch 36)
                   / 120d  \
                  /         \
                 /           \
                /             \
               /               \
  Sector 3 ---*--- Tower ----- Sector 2
  (Ch 149)    \               /  (Ch 100)
               \             /
                \           /
                 \         /
                  \ 120d  /
                   Sector 3
  
  Three sector antennas on a single tower/pole
  provide 360-degree coverage with different channels
  per sector to avoid co-channel interference.
```

**Where Sectors Excel**:
- Outdoor venues (concerts, sporting events, campus quads)
- Point-to-multipoint WISP deployments
- Cell tower installations (each sector serves a different area)
- High-density outdoor environments where omnidirectional gain is insufficient

---

## Antenna Gain in Depth

### Understanding dBi

**dBi** = decibels relative to an **isotropic radiator** (theoretical point source radiating uniformly in all directions as a perfect sphere).

| Gain (dBi) | Antenna Type | Relative Power vs. Isotropic | Typical Beamwidth |
|------------|--------------|------------------------------|-------------------|
| 0 dBi | Isotropic (theoretical) | 1x | 360 x 360 degrees |
| 2.14 dBi | Half-wave dipole | 1.64x | 360 x ~78 degrees |
| 5 dBi | Rubber duck omni | 3.16x | 360 x ~40 degrees |
| 9 dBi | High-gain omni | 7.94x | 360 x ~20 degrees |
| 12 dBi | Patch/panel | 15.8x | ~70 x ~50 degrees |
| 15 dBi | Sector | 31.6x | ~90 x ~15 degrees |
| 18 dBi | Yagi | 63.1x | ~30 x ~20 degrees |
| 24 dBi | Parabolic | 251x | ~10 x ~10 degrees |
| 30 dBi | Large parabolic | 1,000x | ~5 x ~5 degrees |

> **Rule of Thumb**: Every **+3 dBi** of antenna gain **doubles** the effective radiated power in the main lobe direction. Every **+6 dBi** doubles the effective range (in free space, assuming inverse-square law and identical receiver sensitivity).

### dBi vs. dBd

Two gain reference systems exist:
- **dBi**: Referenced to isotropic radiator (most common in specifications)
- **dBd**: Referenced to half-wave dipole
- **Conversion**: dBi = dBd + 2.14

When comparing specifications, always confirm which unit is used. A "5 dBd" antenna is actually **7.14 dBi**.

---

## EIRP — Effective Isotropic Radiated Power

**EIRP** represents the total effective power radiated in the direction of maximum antenna gain, accounting for all gains and losses in the RF chain.

### EIRP Formula

```
EIRP (dBm) = Transmit Power (dBm) + Antenna Gain (dBi) - Cable Loss (dB) - Connector Loss (dB)
```

### Worked Examples

**Example 1 — Indoor Enterprise AP**:

| Component | Value |
|-----------|-------|
| AP Transmit Power | 20 dBm (100 mW) |
| Integrated Antenna Gain | +5 dBi |
| Cable Loss | 0 dB (integrated) |
| **EIRP** | **25 dBm (316 mW)** |

**Example 2 — Outdoor Point-to-Point Link**:

| Component | Value |
|-----------|-------|
| Radio Transmit Power | 23 dBm (200 mW) |
| Antenna Gain | +24 dBi (parabolic) |
| 10m LMR-400 Cable Loss | -2.5 dB |
| 2 Connectors | -0.5 dB each = -1.0 dB |
| **EIRP** | **43.5 dBm (22.4 W)** |

**Example 3 — Calculating Required Transmit Power**:
If FCC limits EIRP to 36 dBm and you have an 18 dBi antenna with 3 dB cable loss:
```
Max Tx Power = EIRP Limit - Antenna Gain + Cable Loss
Max Tx Power = 36 - 18 + 3 = 21 dBm
```

### Regulatory EIRP Limits

| Regulatory Body | Band | Max EIRP (PtMP) | Max EIRP (PtP) |
|----------------|------|-----------------|-----------------|
| FCC (USA) | 2.4 GHz | 36 dBm (4 W) | 36 dBm |
| FCC (USA) | 5 GHz UNII-1 | 30 dBm (1 W) | 30 dBm |
| FCC (USA) | 5 GHz UNII-3 | 36 dBm (4 W) | 53 dBm* |
| ETSI (Europe) | 2.4 GHz | 20 dBm (100 mW) | 20 dBm |
| FCC (USA) | 6 GHz (LPI) | 30 dBm | N/A |

*FCC allows higher PtP EIRP on UNII-3 with directional antennas (1 dB antenna gain increase per 3 dB reduction in transmit power above 1 W).

> **Exam Warning**: Exceeding regulatory EIRP limits is illegal. Always calculate EIRP before deploying outdoor wireless links, especially with high-gain antennas.

---

## Polarization in Practice

### Matching Polarization

For optimal signal reception, transmitting and receiving antennas should use the **same polarization**:

```
Matched Polarization (Vertical):      Mismatched Polarization:

  Tx Antenna    Rx Antenna            Tx Antenna     Rx Antenna
     |              |                    |               ---
     |              |                    | (vertical)    (horizontal)
     |              |                    |
  (both vertical)                     ~20 dB loss at 90 degree mismatch!
  0 dB loss                          Signal nearly undetectable
```

### Cross-Polarization for MIMO

Modern MIMO access points use **dual-polarity** (or cross-polarized) antenna elements — one set vertically polarized, the other at +/-45 degrees or horizontal. This creates **decorrelated signal paths** even without physical antenna separation, enabling spatial multiplexing:

```
Dual-Polarity MIMO Antenna:

     /    |
    /     |     Two orthogonal elements
   /      |     in same physical housing
  /       |
           
  +45    -45   or  Vertical + Horizontal
  
  Each polarization carries an independent
  spatial stream for MIMO operation.
```

### Circular Polarization

Circular polarization (CP) rotates the electric field as the wave propagates. Available in right-hand (RHCP) and left-hand (LHCP) variants:
- **Advantage**: Tolerant of antenna orientation mismatches; effective at penetrating foliage
- **Disadvantage**: 3 dB loss when received by a linearly polarized antenna
- **Use Cases**: GPS, some outdoor links, RFID systems

---

## Antenna Diversity and MIMO Arrays

### Antenna Diversity

**Diversity** combats multipath fading by providing multiple independent signal paths:

**Spatial Diversity**: Two or more antennas physically separated (by at least half a wavelength) receive slightly different versions of the signal. The radio selects the stronger one or combines them.

**Polarization Diversity**: Antennas with different polarizations (V and H) receive decorrelated signals, effective even without physical separation.

**Pattern Diversity**: Antennas with different radiation patterns (e.g., one tilted left, one tilted right) receive energy from different directions.

```
Spatial Diversity (Receive):

  Tx Antenna                     Rx Antenna 1
       |                              |
       | --- Direct Path ----------> |
       |                              |
       | --- Reflected Path \        |
       |                      \      |
       |          Wall -------  \   Rx Antenna 2
       |                         \   |
       |                          -> |

  If direct path fades at Rx1, reflected
  path may be strong at Rx2 (or vice versa).
  System picks the best signal.
```

### MIMO Antenna Arrays

Modern enterprise APs contain **multiple antenna elements** per radio band:

| Wi-Fi Standard | Typical AP Config | Antenna Elements per Band |
|---------------|-------------------|--------------------------|
| 802.11n (Wi-Fi 4) | 3x3:3 | 3 |
| 802.11ac (Wi-Fi 5) | 4x4:4 | 4 (with dual-pol = 8 physical elements) |
| 802.11ax (Wi-Fi 6) | 4x4:4 or 8x8:8 | 4-8 (with dual-pol = 8-16 physical elements) |
| 802.11be (Wi-Fi 7) | 8x8:8 or 16x16 | 8-16+ |

**Beamforming with Antenna Arrays**:
By adjusting the **phase shift** applied to each antenna element, the AP creates constructive interference in the direction of the target client and destructive interference elsewhere. This is **explicit transmit beamforming** and is standard in Wi-Fi 5 and later.

```
Beamforming with 4-Element Array:

  Element 1 --\
  Element 2 ---\--> Constructive interference
  Element 3 ---/    toward client
  Element 4 --/

  Phase shifts calculated from client's
  channel sounding feedback (NDP/NDP-A).
```

---

## Cable Loss Considerations

The cable connecting an antenna to a radio introduces loss that **directly reduces EIRP** and degrades receive sensitivity. Cable loss depends on cable type, length, and frequency.

### Common Cable Types and Loss

| Cable Type | Loss at 2.4 GHz (per meter) | Loss at 5 GHz (per meter) | Typical Use |
|-----------|---------------------------|--------------------------|-------------|
| RG-58 | 0.65 dB/m | 1.05 dB/m | Short runs only (<2m) |
| RG-8 | 0.26 dB/m | 0.44 dB/m | Moderate runs (indoor) |
| LMR-240 | 0.26 dB/m | 0.43 dB/m | Indoor runs (up to 10m) |
| LMR-400 | 0.13 dB/m | 0.22 dB/m | Outdoor runs (up to 30m) |
| LMR-600 | 0.09 dB/m | 0.14 dB/m | Long outdoor runs |

### Connector Loss

Each connector in the RF path adds loss:
- **N-Type connector**: ~0.15 dB per connection
- **SMA connector**: ~0.10-0.25 dB per connection
- **RP-SMA (common on consumer gear)**: ~0.15 dB per connection

**Best Practices**:
- **Minimize cable length** — shorter is always better
- **Use high-quality, low-loss cable** (LMR-400 or better for outdoor)
- **Minimize connectors** — each adapter/connector adds loss
- **Mount radio at antenna** when possible (modern outdoor APs integrate the radio and antenna, eliminating cable loss entirely)
- **Never use indoor cable outdoors** — UV degradation and moisture ingress cause progressive loss increase

### Cable Loss Calculation Example

10-meter outdoor run at 5 GHz using LMR-400 with 2 N-type connectors:
```
Cable Loss = (10m x 0.22 dB/m) + (2 x 0.15 dB) = 2.2 + 0.3 = 2.5 dB
```

---

## Indoor vs. Outdoor Antenna Mounting

### Indoor Mounting Considerations

| Factor | Recommendation |
|--------|---------------|
| Height | Ceiling-mount at 2.5-3.5m (8-12 ft) |
| Position | Center of coverage area; avoid corners (wastes 75% of coverage) |
| Obstacles | Keep clear of metal ducts, elevator shafts, thick concrete |
| Orientation | Internal omni: horizontal (facing down); external dipole: vertical |
| Aesthetics | Enterprise APs with internal antennas blend with ceiling tiles |
| Density | Space APs for 15-20% overlap between coverage cells |

**Common Indoor Mistakes**:
- Mounting in IT closets or behind walls (severe attenuation)
- Placing above drop ceilings with metal grid (signal blocked downward)
- Co-locating with fluorescent lighting ballasts (RF interference)
- Using high-power settings instead of adding more APs (causes co-channel interference)

### Outdoor Mounting Considerations

| Factor | Recommendation |
|--------|---------------|
| Height | As high as practical; 6-15m for campus, 20-40m for WISP |
| Weatherproofing | IP67-rated enclosures, outdoor-rated cable, weatherproof connectors |
| Lightning Protection | Grounding kit on antenna cable, surge protector at entry point |
| Wind Loading | Use grid antennas in high-wind areas; verify mount structural rating |
| Line of Sight | Clear 60%+ of the first Fresnel zone; avoid trees, buildings |
| Aiming | Directional antennas need precise alignment (use alignment tools) |
| Sun Exposure | Radome/enclosure must tolerate UV; position to minimize solar heating |

### Fresnel Zone Clearance

For point-to-point links, the **Fresnel zone** is an ellipsoidal region around the line-of-sight path. Obstructions within this zone cause signal degradation even if the direct path is clear.

```
Fresnel Zone (Side View):

  Antenna A                              Antenna B
      *----------------------------------------*
      |  \                                /  |
      |    \    First Fresnel Zone      /    |
      |      \   (60% must be clear)  /      |
      |        \--------------------/        |
      |                                      |
                   Distance (d)
                                           
  Fresnel zone radius at midpoint:
  r = 17.3 x sqrt(d / (4 x f))
  where d = distance in km, f = frequency in GHz, r in meters
  
  Example: 2 km link at 5 GHz:
  r = 17.3 x sqrt(2 / (4 x 5)) = 17.3 x sqrt(0.1) = 17.3 x 0.316 = 5.47 m
  60% clearance needed: 3.28 m minimum clearance at midpoint
```

---

## Antenna Selection Guide

### Scenario-Based Selection Matrix

| Deployment Scenario | Antenna Type | Gain Range | Key Considerations |
|--------------------|--------------|------------|-------------------|
| Open-plan office | Integrated omni (ceiling AP) | 3-6 dBi | Downtilt pattern, MIMO, aesthetics |
| Long corridor / hallway | Patch or panel | 8-12 dBi | Mount at end of hall, aim down length |
| Single-story warehouse | High-gain omni | 7-9 dBi | Wide horizontal coverage, minimal vertical |
| Multi-story building (per floor) | Integrated omni | 3-5 dBi | Low gain limits floor-to-floor bleed |
| Outdoor courtyard / plaza | Sector (120 degrees) | 14-18 dBi | Multiple sectors for 360 degrees if needed |
| Stadium seating | Sector or high-density patch | 15-18 dBi | Narrow vertical beam aimed at seats |
| Building-to-building (<1 km) | Yagi or flat panel | 12-18 dBi | Clear line of sight, pole mount |
| Building-to-building (1-10 km) | Parabolic dish or grid | 24-30 dBi | Precise alignment, Fresnel clearance |
| WISP subscriber connection | Parabolic or flat panel | 19-25 dBi | Customer premises equipment (CPE) |
| Conference room | Integrated omni | 3-5 dBi | Low gain prevents bleed to neighbors |
| Hotel room (in-room AP) | Low-gain omni | 2-3 dBi | Minimal coverage area per room |

### Decision Flowchart

```
                    +---------------------+
                    | What is the use case?|
                    +----------+----------+
                               |
              +----------------+----------------+
              v                v                v
        Indoor General    Outdoor Area    Point-to-Point
              |                |                |
              v                v                v
     +--------+--------+      |         +------+------+
     |  One direction  |      |         |  Distance?  |
     |  or all around? |      |         +------+------+
     +--------+--------+      |         +------+------+
      +-------+-------+       |         v      v      v
      v               v       |       <1km   1-5km  >5km
  All Around     One Dir.     |         |      |      |
      |               |       |         v      v      v
      v               v       v       Yagi   Panel  Parabolic
  Omni 3-9dBi  Patch 8-14  Sector    12-16  18-23  24-30+
                            12-18 dBi  dBi    dBi    dBi
```

---

## Summary

1. **Omnidirectional antennas** (dipole, rubber duck, ceiling-mount) radiate in a 360-degree donut pattern with 2-9 dBi gain — ideal for general indoor coverage and mobile clients.

2. **Directional antennas** focus energy into a narrow beam: Yagi (10-18 dBi, 30-60 degrees), patch/panel (8-14 dBi, 60-90 degrees), and parabolic (19-30+ dBi, 3-15 degrees).

3. **Sector antennas** (12-18 dBi, 60-120 degrees) cover defined angular sectors — three 120-degree sectors on a tower provide full 360-degree outdoor coverage.

4. **Antenna gain (dBi)** does not amplify — it focuses energy. Every +3 dBi doubles power in the main direction; every +6 dBi approximately doubles range.

5. **Beamwidth** is inversely related to gain: higher-gain antennas have narrower beams covering less area but reaching farther.

6. **Polarization mismatch** between transmitter and receiver causes severe signal loss (up to 20+ dB). Always match polarization or use dual-polarity MIMO antennas.

7. **EIRP = Tx Power + Antenna Gain - Cable Loss - Connector Loss**. EIRP must not exceed regulatory limits (FCC, ETSI).

8. **Cable loss** is significant — use low-loss cable (LMR-400+) for outdoor runs, minimize cable length, and reduce connector count.

9. **MIMO antenna arrays** use multiple elements with spatial or polarization diversity to enable spatial multiplexing and beamforming.

10. **Indoor mounting**: ceiling-mount centrally at 2.5-3.5m, avoid corners and metal obstacles, ensure 15-20% overlap between cells.

11. **Outdoor mounting**: ensure line-of-sight with 60%+ Fresnel zone clearance, provide lightning protection and weatherproofing, and precisely align directional antennas.

12. **Antenna selection** must match the deployment scenario — there is no universal "best" antenna. Consider gain, beamwidth, distance, environment, client density, and regulatory limits.

## Practice Questions

**Q1.** Which antenna type radiates signal in a 360-degree horizontal pattern and is most commonly used for general indoor coverage?

A) Yagi
B) Parabolic dish
C) Omnidirectional
D) Sector

<details>
<summary>Answer</summary>

**C)** Omnidirectional antennas radiate in a 360-degree donut-shaped pattern around the antenna, providing coverage in all horizontal directions. They are ideal for general indoor coverage where clients are located in all directions from the AP.
</details>

**Q2.** An engineer needs to establish a point-to-point wireless link between two buildings 5 km apart. Which antenna type is most appropriate?

A) Omnidirectional dipole
B) Rubber duck antenna
C) Parabolic dish
D) Ceiling-mount integrated antenna

<details>
<summary>Answer</summary>

**C)** Parabolic dish antennas provide the highest gain (24-30+ dBi) with very narrow beamwidths (3-15 degrees), making them ideal for long-range point-to-point links of 1-10+ km where precise alignment and maximum signal concentration are needed.
</details>

**Q3.** What does EIRP represent in wireless networking, and how is it calculated?

A) EIRP = Tx Power × Antenna Gain × Cable Length
B) EIRP = Tx Power + Antenna Gain (dBi) - Cable Loss (dB) - Connector Loss (dB)
C) EIRP = Antenna Gain - Tx Power + Noise Floor
D) EIRP = Frequency × Distance × Antenna Gain

<details>
<summary>Answer</summary>

**B)** EIRP (Effective Isotropic Radiated Power) is the total power radiated by the antenna system, calculated by adding the transmit power and antenna gain, then subtracting cable and connector losses. EIRP must not exceed regulatory limits set by the FCC or ETSI.
</details>

**Q4.** A wireless signal is transmitted with vertical polarization but the receiving antenna is configured for horizontal polarization. What is the likely result?

A) The signal is amplified due to cross-polarization gain
B) Severe signal loss of up to 20+ dB due to polarization mismatch
C) No effect on signal quality
D) The frequency shifts to compensate

<details>
<summary>Answer</summary>

**B)** Polarization mismatch between transmitter and receiver causes severe signal loss, potentially exceeding 20 dB. For optimal performance, transmitter and receiver polarization must match, or dual-polarity MIMO antennas should be used.
</details>

**Q5.** A cell tower needs to provide 360-degree outdoor coverage. Which antenna configuration is typically used?

A) A single high-gain omnidirectional antenna
B) Three 120-degree sector antennas
C) One parabolic dish pointed at each client
D) A single patch antenna

<details>
<summary>Answer</summary>

**B)** Three sector antennas, each covering 120 degrees, are mounted on the tower to provide full 360-degree coverage. Sector antennas provide higher gain (12-18 dBi) than omnidirectional antennas while maintaining focused coverage sectors.
</details>

**Q6.** Every time antenna gain is increased by 3 dBi, what happens to the effective radiated power in the main beam direction?

A) Power increases by 50%
B) Power triples
C) Power doubles
D) Power increases by 10%

<details>
<summary>Answer</summary>

**C)** Every 3 dB increase represents a doubling of power. A 3 dBi gain increase doubles the effective radiated power in the focused direction. Conversely, 6 dBi approximately doubles the effective range.
</details>

**Q7.** What is the Fresnel zone and why is it important for point-to-point wireless links?

A) The area immediately surrounding the antenna where radiation is strongest
B) An ellipsoidal zone around the direct path between antennas that must be at least 60% clear of obstructions for optimal signal propagation
C) The coverage area of a sector antenna
D) The area where multipath interference cancels out the primary signal

<details>
<summary>Answer</summary>

**B)** The Fresnel zone is an ellipsoidal region around the line-of-sight path between two antennas. At least 60% of the first Fresnel zone must be clear of obstructions to avoid signal degradation. Obstructions in this zone cause signal loss even without blocking the direct path.
</details>

**Q8.** For a multi-story office building, which antenna characteristic should be minimized to prevent signal bleed between floors?

A) Frequency
B) Horizontal beamwidth
C) Antenna gain (keep it low, 3-5 dBi)
D) Polarization

<details>
<summary>Answer</summary>

**C)** Using low-gain antennas (3-5 dBi) with ceiling-mounted APs limits the vertical radiation pattern, reducing signal bleed to floors above and below. High-gain antennas flatten the radiation pattern horizontally but could increase vertical leakage depending on mounting.
</details>

**Q9.** Which type of cable should be used for long outdoor antenna runs to minimize signal loss?

A) RG-58 coaxial cable
B) RG-59 coaxial cable
C) LMR-400 or equivalent low-loss coaxial cable
D) Standard Cat6 Ethernet cable

<details>
<summary>Answer</summary>

**C)** LMR-400 and similar low-loss coaxial cables have significantly lower attenuation per meter compared to standard coax like RG-58. For outdoor antenna runs, minimizing cable length and using low-loss cable is critical because cable loss directly reduces the EIRP.
</details>

**Q10.** A patch (panel) antenna with 10 dBi gain is best suited for which deployment scenario?

A) A 10 km building-to-building link
B) A general-purpose omnidirectional coverage area
C) A long corridor or hallway where directional coverage is needed
D) A stadium requiring 360-degree coverage

<details>
<summary>Answer</summary>

**C)** Patch/panel antennas with 8-14 dBi gain provide a moderately focused beam (60-90 degree beamwidth) ideal for hallways, corridors, or aiming coverage in a specific direction. They provide more focused coverage than omnidirectional antennas but less than Yagi or parabolic antennas.
</details>

## References

- CompTIA Network+ N10-009 Exam Objectives: Domain 2.4 – Given a scenario, install and configure the appropriate wireless standards and technologies
- IEEE 802.11-2020: Wireless LAN Medium Access Control (MAC) and Physical Layer (PHY) Specifications – Antenna requirements
- FCC Part 15: Radio Frequency Devices – EIRP limits and regulatory compliance
- ETSI EN 300 328: Wideband transmission systems operating in the 2.4 GHz ISM band
- Gast, M. (2013). *802.11 Wireless Networks: The Definitive Guide*. O'Reilly Media – Antenna Fundamentals
- Lammle, T. (2021). *CompTIA Network+ Study Guide (Exam N10-009)*. Sybex – Wireless Antennas and RF Propagation
- CWNA Study Guide (Exam CWNA-109): RF antenna theory, gain, beamwidth, and polarization
