---
id: layer1-physical
title: Layer 1 - The Physical Layer
chapterId: ch1-networking-fundamentals
order: 2
duration: 50
objectives:
  - Understand the functions and characteristics of the Physical layer
  - Identify different types of network cables and their specifications
  - Recognize various network connectors and their applications
  - Distinguish between copper and fiber optic transmission media
  - Explain cable categories and their maximum speeds/distances
  - Understand transceivers and their role in network connectivity
---

# Lesson 2: Layer 1 - The Physical Layer

## Learning Objectives
- Understand the functions and characteristics of the Physical layer
- Identify different types of network cables and their specifications
- Recognize various network connectors and their applications
- Distinguish between copper and fiber optic transmission media
- Explain cable categories and their maximum speeds/distances
- Understand transceivers and their role in network connectivity

## Introduction

The **Physical layer** (Layer 1) is the foundation of the OSI model. It's responsible for the actual transmission of raw bits over a physical medium. If the Physical layer isn't working correctly, nothing above it can function—making it the most critical layer for basic connectivity.

### Key Concept
**"No Layer 1, no network!"**

The Physical layer doesn't care about the meaning of the data; it simply transmits 1s and 0s as electrical signals, light pulses, or radio waves.

---

## Physical Layer Functions

### Primary Responsibilities

1. **Physical Connectivity**: Defining physical connections between devices
2. **Signal Transmission**: Converting data bits into signals (electrical, optical, or radio)
3. **Signal Encoding**: Determining how bits are represented (voltage levels, light patterns)
4. **Bit Synchronization**: Ensuring sender and receiver agree on timing
5. **Transmission Rate**: Defining data transfer speed (bandwidth)
6. **Physical Topology**: Determining how devices are physically connected

### Signal Types

| Signal Type | Medium | Examples |
|-------------|--------|----------|
| **Electrical** | Copper cable | Cat5e, Cat6, Coaxial |
| **Light** | Fiber optic | Single-mode, Multi-mode |
| **Radio** | Wireless | Wi-Fi, Bluetooth, Cellular |

---

## Copper Cabling

Copper cables transmit data using electrical signals. They're the most common type of cabling in local area networks (LANs).

### Twisted Pair Cable

**Why Twisted?**
Wires are twisted together in pairs to reduce **electromagnetic interference (EMI)** and **crosstalk** (signal bleeding between pairs). The tighter the twist, the better the protection.

#### Types of Twisted Pair

**1. Unshielded Twisted Pair (UTP)**
- **Description**: Most common type, no additional shielding
- **Cost**: Inexpensive
- **Interference**: More susceptible to EMI
- **Use cases**: Office buildings, homes
- **Connector**: RJ45

**2. Shielded Twisted Pair (STP)**
- **Description**: Metal shielding around pairs
- **Cost**: More expensive than UTP
- **Interference**: Better protection against EMI
- **Use cases**: Industrial environments, near fluorescent lights, motors
- **Connector**: RJ45

**3. Foiled Twisted Pair (FTP)**
- **Description**: Single foil shield around all pairs
- **Protection**: Moderate EMI protection
- **Use cases**: Mid-range installations

**4. Screened Foiled Twisted Pair (S/FTP)**
- **Description**: Individual foil shields plus overall braid shield
- **Protection**: Maximum EMI protection
- **Use cases**: High-interference environments

### Ethernet Cable Categories

| Category | Speed | Frequency | Distance | Common Use |
|----------|-------|-----------|----------|------------|
| **Cat3** | 10 Mbps | 16 MHz | 100m | Obsolete (phone lines) |
| **Cat5** | 100 Mbps | 100 MHz | 100m | Legacy (mostly obsolete) |
| **Cat5e** | 1 Gbps | 100 MHz | 100m | Most common today |
| **Cat6** | 1 Gbps / 10 Gbps* | 250 MHz | 100m / 55m* | Modern networks |
| **Cat6a** | 10 Gbps | 500 MHz | 100m | Data centers, server rooms |
| **Cat7** | 10 Gbps | 600 MHz | 100m | Specialized installations |
| **Cat8** | 25/40 Gbps | 2000 MHz | 30m | Server rooms, data centers |

**Note**: Cat6 supports 10 Gbps up to 55 meters; Cat6a extends this to 100 meters.

### Key Specifications

**Maximum Segment Length**: 100 meters (328 feet)
- This includes the cable run plus patch cables
- Beyond 100m, signals degrade (attenuation)
- Use repeaters or switches to extend distance

**Wire Gauge**: 
- Typically 22 to 24 AWG (American Wire Gauge)
- Lower number = thicker wire = better signal quality
- 23 AWG is common for structured cabling

### Plenum vs. PVC Cable

**PVC (Polyvinyl Chloride)**
- **Use**: Standard cables for most applications
- **Cost**: Less expensive
- **Fire rating**: Releases toxic fumes when burned
- **Installation**: Not allowed in plenum spaces

**Plenum-Rated Cable**
- **Use**: Air handling spaces (above drop ceilings, HVAC ducts)
- **Cost**: More expensive (20-30% premium)
- **Fire rating**: Fire-retardant, low smoke production
- **Installation**: Required by building codes for plenum spaces
- **Jacket material**: FEP (Fluorinated Ethylene Polymer) or low-smoke PVC

**Building Code Requirement**: Plenum-rated cable **MUST** be used in plenum spaces to comply with fire safety regulations.

---

## Coaxial Cable

Coaxial cable has a center conductor surrounded by insulation, braided shield, and outer jacket. It's less susceptible to EMI than twisted pair.

### Types

**1. RG-6**
- **Use**: Cable TV, cable Internet, satellite
- **Frequency**: Up to 1 GHz
- **Impedance**: 75 ohms
- **Connector**: F-connector
- **Distance**: Up to 300m for data

**2. RG-59**
- **Use**: Older cable TV installations, CCTV
- **Frequency**: Lower than RG-6
- **Impedance**: 75 ohms
- **Distance**: Shorter runs than RG-6
- **Status**: Being phased out

**3. RG-58**
- **Use**: Legacy Ethernet (10BASE2), thin coax
- **Impedance**: 50 ohms
- **Status**: Obsolete for networking

### Connectors

- **F-connector**: Cable TV, Internet (screw-on)
- **BNC (Bayonet Neill-Concelman)**: Old 10BASE2 networks, video equipment
- **N-connector**: Cellular antennas, professional radio

---

## Fiber Optic Cable

Fiber optic cable transmits data as pulses of light through glass or plastic fibers. It offers the highest bandwidth and longest distances of any cabling type.

### Advantages

✅ **Immunity to EMI**: Light doesn't interact with electrical/magnetic fields  
✅ **Higher Bandwidth**: Multi-Gbps to Tbps speeds  
✅ **Longer Distances**: Kilometers without signal degradation  
✅ **Security**: Difficult to tap without detection  
✅ **Lightweight**: Much lighter than copper for equivalent bandwidth  

### Disadvantages

❌ **Cost**: More expensive than copper (cable + equipment)  
❌ **Installation**: Requires specialized tools and training  
❌ **Fragility**: Glass fibers can break if bent too tightly  
❌ **Termination**: More complex than copper connectors  

### Types of Fiber

**1. Single-Mode Fiber (SMF)**
- **Core size**: 8-10 microns (very small)
- **Light source**: Laser
- **Distance**: 10-100+ km
- **Bandwidth**: Highest (100+ Gbps)
- **Cost**: More expensive
- **Use cases**: Long-distance telecommunications, campus backbones, data center interconnects
- **Color**: Usually yellow jacket

**2. Multi-Mode Fiber (MMF)**
- **Core size**: 50 or 62.5 microns (larger)
- **Light source**: LED or VCSEL laser
- **Distance**: 300m to 2km (depending on speed)
- **Bandwidth**: Lower than SMF (10-40 Gbps typical)
- **Cost**: Less expensive than SMF
- **Use cases**: Building backbones, data centers, shorter runs
- **Color**: Usually orange (OM1/OM2) or aqua (OM3/OM4/OM5) jacket

### Multi-Mode Fiber Grades

| Grade | Core | Distance @ 10G | Distance @ 40/100G | Use Case |
|-------|------|----------------|---------------------|----------|
| **OM1** | 62.5μm | 33m | Not supported | Legacy |
| **OM2** | 50μm | 82m | Not supported | Legacy |
| **OM3** | 50μm | 300m | 100m | Common |
| **OM4** | 50μm | 400m | 150m | Data centers |
| **OM5** | 50μm | 400m | 150m | Wideband (SWDM) |

### How to Choose?

- **Short distance (<300m) + High speed**: Multi-mode (OM3/OM4)
- **Long distance (>1km)**: Single-mode
- **Campus backbone**: Single-mode
- **Building riser/horizontal**: Could use either, often multi-mode
- **Budget limited**: Multi-mode (if distance allows)

---

## Fiber Optic Connectors

### Common Connector Types

**1. SC (Subscriber Connector / Standard Connector)**
- **Description**: Square-shaped, push-pull design
- **Use**: Very common in data centers
- **Duplex**: Available (SC-DC)
- **Ease**: Easy to connect/disconnect
- **Key feature**: Push-pull mechanism

**2. LC (Lucent Connector / Little Connector)**
- **Description**: Small form factor (SFF)
- **Size**: Half the size of SC
- **Use**: Most common today, high-density applications
- **Duplex**: LC duplex (two fibers side-by-side)
- **Ease**: Very easy to use, latching mechanism
- **Key feature**: Space-saving design

**3. ST (Straight Tip)**
- **Description**: Bayonet-style twist lock
- **Use**: Legacy installations, older networks
- **Connection**: Twist and lock (like BNC)
- **Status**: Being replaced by LC and SC
- **Key feature**: Round connector, twist-lock

**4. MPO/MTP (Multi-fiber Push-On)**
- **Description**: Up to 72 fibers in single connector
- **Use**: High-density data centers, 40/100/400G connections
- **Fibers**: 12 or 24 fiber arrays typical
- **Cost**: More expensive
- **Key feature**: Ribbon fiber, multiple fibers

### Connector Comparison

| Connector | Size | Fibers | Connection Method | Common Use |
|-----------|------|--------|-------------------|------------|
| **SC** | Large | 1 or 2 | Push-pull | General purpose |
| **LC** | Small | 1 or 2 | Push-pull latch | Most common today |
| **ST** | Large | 1 | Twist-lock | Legacy |
| **MPO/MTP** | Medium | 12-72 | Push-pull | High-density 40/100G |

### Connector Polish Types

- **PC (Physical Contact)**: Slightly curved, some back reflection
- **UPC (Ultra Physical Contact)**: Better polish, less back reflection (blue connector)
- **APC (Angled Physical Contact)**: 8-degree angle, minimal back reflection (green connector)

**Rule**: Never connect UPC to APC! Angles don't match, causing damage and signal loss.

---

## Copper Connectors

### RJ45 (8P8C - 8 Position 8 Contact)

- **Use**: Ethernet networking (Cat5e, Cat6, Cat6a)
- **Pins**: 8 pins in the connector
- **Wiring**: T568A or T568B standards
- **Latching**: Plastic tab that clicks into place

### RJ11 (6P4C or 6P2C)

- **Use**: Telephone connections
- **Pins**: Typically 4 or 2 contacts used
- **Appearance**: Smaller than RJ45
- **Note**: Can physically insert into RJ45 jack but won't work for Ethernet

### F-Connector

- **Use**: Coaxial cable for cable TV/Internet
- **Connection**: Screw-on threads
- **Impedance**: 75 ohms
- **Installation**: Simple to terminate

### BNC Connector

- **Use**: Legacy 10BASE2 networks, video equipment
- **Connection**: Bayonet twist-lock
- **Impedance**: 50 or 75 ohms
- **Status**: Rare in modern networking

---

## Transceivers and Media Converters

### Transceivers

A **transceiver** (transmitter + receiver) is a modular device that connects a network device to various types of media.

### SFP (Small Form-Factor Pluggable)

- **Speed**: Up to 1 Gbps
- **Use**: Gigabit Ethernet
- **Media**: Copper or fiber
- **Hot-swappable**: Yes
- **Common**: Very common in switches and routers

### SFP+ (Enhanced SFP)

- **Speed**: Up to 10 Gbps
- **Use**: 10 Gigabit Ethernet
- **Media**: Fiber (usually), some copper (DAC)
- **Backward compatible**: With SFP ports (at 1G speed)

### QSFP/QSFP+ (Quad Small Form-Factor Pluggable)

- **Speed**: 40 Gbps (QSFP+), 100 Gbps (QSFP28)
- **Use**: High-speed data center connections
- **Channels**: 4 channels combined
- **Density**: Higher port density

### QSFP28

- **Speed**: 100 Gbps
- **Use**: Modern data centers, cloud infrastructure
- **Also known as**: 100GBASE transceiver

### GBIC (Gigabit Interface Converter)

- **Speed**: 1 Gbps
- **Size**: Larger than SFP
- **Status**: Obsolete, replaced by SFP
- **Backwards compatibility**: SFP replaced GBIC

### Direct Attach Copper (DAC)

- **Description**: Fixed copper cable with transceivers on both ends
- **Length**: 1-10 meters typically
- **Speed**: 10G, 40G, 100G
- **Cost**: Less expensive than optical transceivers
- **Use**: Top-of-rack to aggregation switch connections

---

## Cable Testing and Troubleshooting

### Common Cable Issues

**1. Attenuation**
- **Definition**: Signal loss over distance
- **Cause**: Resistance in cable, poor quality cable
- **Solution**: Use proper cable category, keep runs under 100m

**2. Crosstalk**
- **Definition**: Signal from one pair bleeding into another
- **Types**: NEXT (Near-End), FEXT (Far-End), ANEXT (Alien)
- **Solution**: Properly twisted pairs, good quality cable

**3. EMI (Electromagnetic Interference)**
- **Definition**: External electrical noise affecting signal
- **Sources**: Motors, fluorescent lights, power lines
- **Solution**: Shielded cable, route away from interference sources

**4. Incorrect Termination**
- **Definition**: Wires connected to wrong pins
- **Standard**: Must use T568A or T568B consistently
- **Solution**: Re-terminate correctly, test with cable tester

**5. Open/Short**
- **Open**: Wire broken or not connected
- **Short**: Two conductors touching
- **Solution**: Test with cable tester, replace or re-terminate

### T568A vs. T568B Wiring Standards

Both standards define which wire goes to which pin in an RJ45 connector.

**T568B (More Common)**
1. Orange/White
2. Orange
3. Green/White
4. Blue
5. Blue/White
6. Green
7. Brown/White
8. Brown

**T568A**
1. Green/White
2. Green
3. Orange/White
4. Blue
5. Blue/White
6. Orange
7. Brown/White
8. Brown

**Important**: Use the same standard on both ends! Mixing standards creates a crossover cable.

### Straight-Through vs. Crossover Cables

**Straight-Through Cable**
- **Use**: Connect different device types (PC to switch, switch to router)
- **Wiring**: Same standard on both ends (T568B to T568B)
- **Most common**: 99% of network cables

**Crossover Cable**
- **Use**: Connect similar device types (PC to PC, switch to switch)
- **Wiring**: T568A on one end, T568B on other end
- **Modern networks**: Often not needed due to Auto-MDIX

**Auto-MDIX**: Modern switches and NICs automatically detect and adjust, eliminating the need for crossover cables.

---

## Physical Topologies

The physical topology describes how devices are physically connected with cables.

### Bus Topology

```
[PC]---[PC]---[PC]---[PC]
      (Single Cable)
```

- **Description**: All devices on single cable segment
- **Terminators**: Required on both ends
- **Failure**: Break anywhere = entire network down
- **Status**: Obsolete (10BASE2 coaxial)

### Star Topology

```
        [Switch]
       /  |  |  \
    [PC][PC][PC][PC]
```

- **Description**: All devices connect to central point
- **Central device**: Switch or hub
- **Failure**: Single cable break = one device down
- **Most common**: Modern Ethernet networks
- **Advantage**: Easy troubleshooting, easy to expand

### Ring Topology

```
[PC]---[PC]
 |       |
[PC]---[PC]
```

- **Description**: Devices form closed loop
- **Data flow**: Unidirectional or bidirectional
- **Failure**: Break = network failure (unless dual ring)
- **Example**: FDDI, Token Ring (obsolete)

### Mesh Topology

```
[Device]--------[Device]
   |\     X     /|
   | \   / \   / |
   |  \ /   \ /  |
[Device]---[Device]
```

- **Description**: Every device connects to every other device
- **Connections**: n(n-1)/2 connections for n devices
- **Redundancy**: High
- **Cost**: Very expensive
- **Use**: Critical infrastructure, WANs
- **Types**: Full mesh (all connected) or partial mesh (some connected)

---

## Ethernet Physical Standards

| Standard | Speed | Medium | Distance | Notes |
|----------|-------|--------|----------|-------|
| **10BASE-T** | 10 Mbps | Cat3 UTP | 100m | Legacy |
| **100BASE-TX** | 100 Mbps | Cat5 UTP | 100m | Fast Ethernet |
| **1000BASE-T** | 1 Gbps | Cat5e/6 UTP | 100m | Gigabit Ethernet |
| **10GBASE-T** | 10 Gbps | Cat6a UTP | 100m | 10 Gigabit |
| **100BASE-FX** | 100 Mbps | MMF | 2km | Fast Ethernet Fiber |
| **1000BASE-SX** | 1 Gbps | MMF | 550m | Short wavelength |
| **1000BASE-LX** | 1 Gbps | SMF/MMF | 10km | Long wavelength |
| **10GBASE-SR** | 10 Gbps | MMF | 400m | Short range |
| **10GBASE-LR** | 10 Gbps | SMF | 10km | Long range |

**Naming Convention**:
- **Number**: Speed in Mbps (10, 100, 1000=1G, 10000=10G)
- **BASE**: Baseband transmission
- **Letter**: Medium type (T=Twisted Pair, S=Short, L=Long, etc.)

---

## Summary

The Physical layer is the foundation of network communication. Key takeaways:

- **Cable types**: Copper (twisted pair, coaxial) and fiber optic (single-mode, multi-mode)
- **Copper categories**: Cat5e (1 Gbps), Cat6 (1-10 Gbps), Cat6a (10 Gbps)
- **Distance limits**: 100m for copper, km for fiber
- **Connectors**: RJ45 (copper), LC/SC/ST (fiber), F-connector (coax)
- **Transceivers**: SFP, SFP+, QSFP for modular connectivity
- **Plenum cable**: Required in air handling spaces
- **Standards**: T568A/B for termination, various Ethernet standards for speeds

Remember: **No Layer 1, no network!** Always start troubleshooting at the Physical layer.

---

## References

- **CompTIA Network+ N10-008 Objective 1.5**: Transmission Media
- **TIA/EIA-568**: Commercial Building Telecommunications Cabling Standard
- **IEEE 802.3**: Ethernet Standards
- **Professor Messer**: "Copper Cabling" and "Optical Fiber" - N10-008 Course
