---
id: lesson-012-ethernet-standards
title: Ethernet Standards (10BASE-T to 400GBASE-T)
chapterId: ch3-network-implementations
order: 12
duration: 55
objectives:
  - Understand Ethernet evolution from 10BASE-T to 400GBASE-T
  - Identify different Ethernet standards and their specifications
  - Recognize cable requirements for each Ethernet standard
  - Understand Ethernet frame structure and operation
  - Differentiate between half-duplex and full-duplex operation
---

# Lesson 12: Ethernet Standards (10BASE-T, 100BASE-TX, 1000BASE-T, 10GBASE-T)

## Learning Objectives
- Understand Ethernet evolution from 10BASE-T to 400GBASE-T
- Identify different Ethernet standards and their specifications
- Recognize cable requirements for each Ethernet standard
- Understand Ethernet frame structure and operation
- Differentiate between half-duplex and full-duplex operation

## Introduction

**Ethernet** is the dominant wired LAN technology, originally developed in the 1970s at Xerox PARC and standardized by IEEE as **802.3**. Modern Ethernet has evolved from 10 Mbps shared coaxial cable networks to 400 Gbps switched fiber networks.

This lesson covers Ethernet standards, naming conventions, frame structure, and operation—essential knowledge for the CompTIA Network+ exam.

---

## Ethernet Naming Convention

Ethernet standards follow a naming pattern: **<Speed>BASE-<Signal Type>**

### Format Breakdown

**<Speed>:**
- Transmission speed in Mbps or Gbps
- Examples: 10, 100, 1000 (1 Gbps), 10G (10 Gbps), 40G, 100G

**BASE:**
- Baseband transmission (entire cable bandwidth used for one signal)
- Alternative: BROAD (broadband, obsolete)

**<Signal Type>:**
- **T:** Twisted pair copper (UTP)
- **TX:** Two pairs of twisted pair
- **T4:** Four pairs of twisted pair
- **F:** Fiber optic
- **S:** Short wavelength fiber (850nm)
- **L:** Long wavelength fiber (1310nm)
- **E:** Extended wavelength fiber (1550nm)
- **X:** Encoding type (various)

### Examples

- **10BASE-T:** 10 Mbps, Baseband, Twisted pair
- **100BASE-TX:** 100 Mbps (Fast Ethernet), Baseband, Two twisted pairs
- **1000BASE-T:** 1000 Mbps (1 Gbps, Gigabit Ethernet), Twisted pair
- **10GBASE-T:** 10 Gbps, Twisted pair
- **10GBASE-SR:** 10 Gbps, Short-reach fiber

---

## Ethernet Standards Evolution

### Legacy Ethernet (Obsolete)

**10BASE2 (Thinnet):**
- Speed: 10 Mbps
- Cable: RG-58 coaxial (thin)
- Max Distance: 185 meters
- Topology: Bus
- Connectors: BNC
- Status: Obsolete (1980s)

**10BASE5 (Thicknet):**
- Speed: 10 Mbps
- Cable: RG-8 coaxial (thick)
- Max Distance: 500 meters
- Topology: Bus
- Connectors: Vampire taps
- Status: Obsolete (1970s-1980s)

**10BASE-T:**
- Speed: 10 Mbps
- Cable: Cat3 UTP (minimum)
- Max Distance: 100 meters
- Topology: Star (hub-based initially, then switched)
- Connectors: RJ45
- Status: Legacy, rarely used

---

## Modern Copper Ethernet Standards

### Fast Ethernet (100 Mbps)

**100BASE-TX (Most Common):**
- **Speed:** 100 Mbps
- **Cable:** Cat5 or better (2 pairs used out of 4)
- **Max Distance:** 100 meters
- **Connectors:** RJ45
- **Status:** Common for endpoint connections
- **Encoding:** 4B5B

**100BASE-T4:**
- **Speed:** 100 Mbps
- **Cable:** Cat3 (all 4 pairs used)
- **Status:** Obsolete

**100BASE-FX:**
- **Speed:** 100 Mbps
- **Cable:** Multimode fiber
- **Max Distance:** 2 km
- **Status:** Still used in some industrial environments

### Gigabit Ethernet (1 Gbps)

**1000BASE-T (Most Common):**
- **Speed:** 1 Gbps (1000 Mbps)
- **Cable:** Cat5e or better (all 4 pairs used)
- **Max Distance:** 100 meters
- **Connectors:** RJ45
- **Status:** Current standard for most networks
- **Encoding:** 4D-PAM5 (all 4 pairs transmit and receive simultaneously)

**1000BASE-TX:**
- **Speed:** 1 Gbps
- **Cable:** Cat6
- **Status:** Rarely implemented (1000BASE-T more common)

### 10 Gigabit Ethernet (10 Gbps)

**10GBASE-T:**
- **Speed:** 10 Gbps
- **Cable:** Cat6a (100m), Cat6 (55m)
- **Max Distance:** 100 meters (Cat6a), 55 meters (Cat6)
- **Connectors:** RJ45
- **Power:** Higher power consumption
- **Status:** Growing adoption for backbone and server connections

**Cable Requirements:**
| Cable | Distance at 10 Gbps |
|-------|---------------------|
| Cat6 | 55 meters |
| Cat6a | 100 meters |
| Cat7 | 100 meters |

### Multi-Gigabit Ethernet

**2.5GBASE-T / 5GBASE-T:**
- **Speed:** 2.5 Gbps or 5 Gbps
- **Cable:** Cat5e (2.5G), Cat6 (5G)
- **Max Distance:** 100 meters
- **Use Case:** Wi-Fi 6/6E access point uplinks (AP speeds exceed 1 Gbps)
- **Status:** Growing (IEEE 802.3bz standard)
- **Advantage:** Uses existing Cat5e/6 cabling

### 25/40/100 Gigabit Ethernet

**25GBASE-T:**
- **Speed:** 25 Gbps
- **Cable:** Cat8
- **Max Distance:** 30 meters
- **Use Case:** Data center server connections

**40GBASE-T:**
- **Speed:** 40 Gbps
- **Cable:** Cat8
- **Max Distance:** 30 meters
- **Use Case:** Data center backbone

---

## Fiber Optic Ethernet Standards

### Gigabit Ethernet Fiber

**1000BASE-SX:**
- **Speed:** 1 Gbps
- **Cable:** Multimode fiber (MMF)
- **Wavelength:** 850nm (short wavelength)
- **Max Distance:** 220-550 meters (depends on fiber type)
- **Use Case:** Building backbone, short runs

**1000BASE-LX:**
- **Speed:** 1 Gbps
- **Cable:** Single-mode fiber (SMF) or MMF
- **Wavelength:** 1310nm (long wavelength)
- **Max Distance:** 5 km (MMF), 10 km (SMF)
- **Use Case:** Campus backbone, longer distances

### 10 Gigabit Ethernet Fiber

**10GBASE-SR (Short Reach):**
- **Speed:** 10 Gbps
- **Cable:** Multimode fiber
- **Wavelength:** 850nm
- **Max Distance:** 26-400 meters (depends on fiber type - OM1/OM2/OM3/OM4)
- **Connector:** LC
- **Use Case:** Data center, short backbone

**10GBASE-LR (Long Reach):**
- **Speed:** 10 Gbps
- **Cable:** Single-mode fiber
- **Wavelength:** 1310nm
- **Max Distance:** 10 km
- **Connector:** LC
- **Use Case:** Campus backbone, metropolitan

**10GBASE-ER (Extended Reach):**
- **Speed:** 10 Gbps
- **Cable:** Single-mode fiber
- **Wavelength:** 1550nm
- **Max Distance:** 40 km
- **Use Case:** Long-distance connections

**10GBASE-LRM:**
- **Speed:** 10 Gbps
- **Cable:** Legacy multimode fiber (FDDI-grade)
- **Max Distance:** 220 meters
- **Use Case:** Upgrading legacy fiber plants

### 40 Gigabit Ethernet Fiber

**40GBASE-SR4:**
- **Speed:** 40 Gbps
- **Cable:** Multimode fiber (4 pairs, 12 fibers via MPO/MTP connector)
- **Max Distance:** 100-150 meters
- **Use Case:** Data center spine-leaf

**40GBASE-LR4:**
- **Speed:** 40 Gbps
- **Cable:** Single-mode fiber
- **Max Distance:** 10 km
- **Use Case:** Long-distance 40G connections

### 100 Gigabit Ethernet Fiber

**100GBASE-SR4:**
- **Speed:** 100 Gbps
- **Cable:** Multimode fiber (4 lanes, 25 Gbps each)
- **Max Distance:** 70-100 meters
- **Use Case:** Data center core

**100GBASE-LR4:**
- **Speed:** 100 Gbps
- **Cable:** Single-mode fiber (4 wavelengths multiplexed)
- **Max Distance:** 10 km
- **Use Case:** Data center interconnect (DCI)

**100GBASE-ER4:**
- **Speed:** 100 Gbps
- **Cable:** Single-mode fiber
- **Max Distance:** 40 km
- **Use Case:** Metropolitan/long-haul

### 200/400 Gigabit Ethernet

**200GBASE-SR4 / 400GBASE-SR16:**
- **Speed:** 200/400 Gbps
- **Cable:** Multimode fiber
- **Use Case:** Hyperscale data centers
- **Status:** Latest standards (IEEE 802.3bs)

---

## Ethernet Frame Structure

### Standard Ethernet II Frame

```
+----------+-------------+-------------+------+--------+---------+-----+
| Preamble | Destination | Source      | Type | Data   | Padding | FCS |
| 7 bytes  | MAC 6 bytes | MAC 6 bytes | 2 B  | 46-1500| 0-46 B  | 4 B |
+----------+-------------+-------------+------+--------+---------+-----+
           |<----------------- 64-1518 bytes ------------------>|
```

### Frame Fields

**1. Preamble (7 bytes):**
- Pattern: 10101010 (repeated 7 times)
- Purpose: Synchronize receiver's clock
- Allows receiver to prepare for frame

**2. Start Frame Delimiter (SFD) - 1 byte:**
- Pattern: 10101011
- Signals start of actual frame
- Combined with preamble = 8 bytes (often grouped together)

**3. Destination MAC Address (6 bytes):**
- Recipient's hardware address
- Can be unicast, multicast, or broadcast (FF:FF:FF:FF:FF:FF)

**4. Source MAC Address (6 bytes):**
- Sender's hardware address
- Always unicast

**5. EtherType / Length (2 bytes):**
- **EtherType:** Protocol identifier (Ethernet II)
  - 0x0800: IPv4
  - 0x0806: ARP
  - 0x86DD: IPv6
  - 0x8100: 802.1Q VLAN tag
- **Length:** Frame payload size (IEEE 802.3)

**6. Data / Payload (46-1500 bytes):**
- Actual data being transmitted
- **Minimum:** 46 bytes (padding added if less)
- **Maximum:** 1500 bytes (MTU - Maximum Transmission Unit)
- **Jumbo Frames:** Up to 9000 bytes (non-standard, configurable)

**7. Padding (0-46 bytes):**
- Added if payload < 46 bytes
- Ensures minimum frame size of 64 bytes (excluding preamble)
- Required for collision detection in half-duplex

**8. Frame Check Sequence (FCS) - 4 bytes:**
- 32-bit CRC (Cyclic Redundancy Check)
- Error detection
- Calculated over Destination MAC through Padding
- Receiver recalculates; if mismatch, frame discarded

### Frame Size

**Minimum Frame Size:** 64 bytes (excluding preamble/SFD)
- 14 bytes header + 46 bytes data + 4 bytes FCS

**Maximum Frame Size:** 1518 bytes (standard Ethernet)
- 14 bytes header + 1500 bytes data + 4 bytes FCS

**With VLAN Tag:** 1522 bytes (4-byte 802.1Q tag added)

**Jumbo Frames:** Up to 9216 bytes (non-standard)
- Reduces CPU overhead for large data transfers
- Must be supported by all devices in path
- Common in storage networks (iSCSI, NFS)

---

## Half-Duplex vs Full-Duplex

### Half-Duplex

**Definition:** Device can send OR receive, but not simultaneously.

**Characteristics:**
- Shared collision domain
- Uses CSMA/CD (Carrier Sense Multiple Access with Collision Detection)
- Lower effective throughput (30-40% of bandwidth)
- Legacy mode (hubs)

**CSMA/CD Process:**
1. **Listen:** Check if medium is idle
2. **Send:** If idle, transmit
3. **Detect Collision:** If two devices send simultaneously, collision occurs
4. **Jam Signal:** Send jam signal to notify all devices
5. **Backoff:** Wait random time using binary exponential backoff
6. **Retry:** Attempt retransmission

**Collision Domain:**
- Area where collisions can occur
- Limited by round-trip propagation time
- Max cable length dependent on speed (100m for 10/100BASE-T)

### Full-Duplex

**Definition:** Device can send AND receive simultaneously.

**Characteristics:**
- No collisions (dedicated connections)
- No CSMA/CD needed
- Double the bandwidth (100 Mbps becomes 200 Mbps aggregate)
- Standard for switched networks
- **Mandatory for Gigabit Ethernet and above**

**Requirements:**
- Point-to-point connection (switch to device)
- Both devices support full-duplex
- Full-duplex explicitly configured or auto-negotiated

### Comparison

| Feature | Half-Duplex | Full-Duplex |
|---------|-------------|-------------|
| **Direction** | One at a time | Simultaneous both ways |
| **Collisions** | Yes (CSMA/CD) | No |
| **Environment** | Hubs (legacy) | Switches |
| **Efficiency** | 30-40% | ~100% |
| **Speed** | 10/100 Mbps | 10/100/1000+ Mbps |
| **Required for** | Nothing (obsolete) | Gigabit+ |

---

## Auto-Negotiation

### Purpose

Auto-negotiation (IEEE 802.3u) allows Ethernet devices to automatically configure the best common speed and duplex mode.

### Parameters Negotiated

1. **Speed:** 10/100/1000 Mbps, etc.
2. **Duplex:** Half-duplex or full-duplex
3. **Flow Control:** Pause frames (IEEE 802.3x)

### Priority Order (Highest to Lowest)

1. 1000BASE-T full-duplex
2. 1000BASE-T half-duplex
3. 100BASE-TX full-duplex
4. 100BASE-TX half-duplex
5. 10BASE-T full-duplex
6. 10BASE-T half-duplex

### Duplex Mismatch

**Common Problem:** One side full-duplex, other side half-duplex

**Symptoms:**
- Slow performance
- High collision count (half-duplex side)
- Late collisions
- FCS errors

**Causes:**
- Manual configuration on one side only
- Auto-negotiation disabled on one side
- Hardware failure

**Resolution:**
- Enable auto-negotiation on both sides, OR
- Manually configure both sides identically

**Best Practice:** Use auto-negotiation unless you have a specific reason to hardcode speed/duplex.

---

## Ethernet Statistics and Troubleshooting

### Key Metrics

**CRC Errors:**
- Frame Check Sequence errors
- Indicates physical layer issues (bad cable, interference)

**Runts:**
- Frames smaller than 64 bytes
- Often caused by collisions

**Giants:**
- Frames larger than 1518 bytes (or 1522 with VLAN tag)
- Configuration error or hardware issue

**Late Collisions:**
- Collision detected after 64 bytes transmitted
- Indicates cable too long or duplex mismatch

**Collisions (normal in half-duplex):**
- Expected in half-duplex networks
- Should be 0 in full-duplex

### Troubleshooting Commands

**Windows:**
```
ipconfig /all           # View adapter settings
netsh interface show interface
```

**Linux:**
```bash
ethtool eth0           # Show link speed, duplex
ifconfig eth0          # Show interface stats
ip link show eth0      # Modern alternative
```

**Cisco:**
```
show interfaces GigabitEthernet0/1
show interfaces status
```

---

## Power over Ethernet (PoE)

### Overview

PoE delivers electrical power over Ethernet cabling along with data, eliminating the need for separate power adapters.

### Standards

**IEEE 802.3af (PoE):**
- **Power:** 15.4W at PSE, 12.95W at PD (powered device)
- **Voltage:** 48V DC
- **Use Case:** IP phones, basic access points, cameras

**IEEE 802.3at (PoE+):**
- **Power:** 30W at PSE, 25.5W at PD
- **Use Case:** Advanced access points, PTZ cameras, videophones

**IEEE 802.3bt (PoE++ / Ultra PoE):**
- **Type 3:** 60W at PSE, 51W at PD
- **Type 4:** 100W at PSE, 71W at PD
- **Use Case:** High-power devices (Wi-Fi 6E APs, building automation, LED lighting)

### Components

**PSE (Power Sourcing Equipment):**
- Provides power
- Examples: PoE switch, PoE injector (midspan)

**PD (Powered Device):**
- Receives power
- Examples: IP phone, access point, camera

### Benefits

✅ **No power outlets needed** at device location  
✅ **Centralized UPS backup** (power switch/injector from UPS)  
✅ **Simplified installation**  
✅ **Remote power management** (switch can reboot devices)  

### Power Budget

Switches have a **PoE power budget** (total watts available for all ports).

**Example:** 24-port PoE+ switch with 370W budget
- Can power ~12 PoE+ devices at full 30W, OR
- Can power 24 PoE devices at 15W

**Planning:** Calculate total power needed for all connected PDs.

---

## Summary

Ethernet has evolved from 10 Mbps coaxial networks to 400 Gbps fiber:

**Key Standards:**
- **10BASE-T:** 10 Mbps (legacy)
- **100BASE-TX:** 100 Mbps Fast Ethernet
- **1000BASE-T:** 1 Gbps Gigabit Ethernet (current standard)
- **10GBASE-T:** 10 Gbps (Cat6a, 100m)
- **2.5GBASE-T / 5GBASE-T:** Multi-gig for Wi-Fi 6 uplinks
- **10GBASE-SR/LR/ER:** 10 Gbps fiber (short/long/extended reach)
- **40/100GBASE:** Data center core

**Ethernet Frame:**
- 64-1518 bytes (standard), up to 9216 bytes (jumbo frames)
- Destination MAC, Source MAC, EtherType, Data, FCS
- Minimum 64 bytes enforced for collision detection

**Duplex Modes:**
- **Half-Duplex:** One direction at a time, CSMA/CD, collisions
- **Full-Duplex:** Simultaneous bidirectional, no collisions, required for Gigabit+

**Auto-Negotiation:** Automatically configures best speed/duplex

**PoE:** Delivers power over data cables (15W/30W/60W/100W standards)

**Remember:** Modern networks use full-duplex switched Ethernet. Half-duplex and hubs are obsolete. Duplex mismatch is a common troubleshooting issue.

---

## Practice Questions

**Q1.** Which Ethernet standard requires a minimum of Cat5e cabling and uses all four pairs for data transmission at 1 Gbps?

A) 100BASE-TX
B) 1000BASE-T
C) 10GBASE-T
D) 100BASE-T4

<details>
<summary>Answer</summary>

**B)** 1000BASE-T operates at 1 Gbps, requires Cat5e or better cabling, and uses all four twisted pairs simultaneously with 4D-PAM5 encoding. 100BASE-TX only uses two pairs. 10GBASE-T requires Cat6a for full 100m distance. 100BASE-T4 is an obsolete standard that used Cat3.
</details>

**Q2.** A network technician needs to run a 10 Gbps Ethernet link between two switches that are 80 meters apart using copper cabling. Which cable category is the MINIMUM required?

A) Cat5e
B) Cat6
C) Cat6a
D) Cat7

<details>
<summary>Answer</summary>

**C)** Cat6a supports 10GBASE-T at distances up to 100 meters. Cat6 only supports 10GBASE-T up to 55 meters, so at 80 meters it would not work. Cat5e does not support 10 Gbps speeds at all. While Cat7 would also work, Cat6a is the minimum requirement.
</details>

**Q3.** What is the maximum standard Ethernet frame size, excluding the preamble and SFD?

A) 64 bytes
B) 1500 bytes
C) 1518 bytes
D) 1522 bytes

<details>
<summary>Answer</summary>

**C)** The maximum standard Ethernet frame size is 1518 bytes (14 bytes header + 1500 bytes data + 4 bytes FCS), excluding preamble/SFD. 64 bytes is the minimum frame size. 1500 bytes is the MTU (data payload only). 1522 bytes is the maximum with an 802.1Q VLAN tag.
</details>

**Q4.** A switch port is experiencing late collisions and FCS errors. What is the MOST likely cause?

A) A broadcast storm on the network
B) A duplex mismatch between connected devices
C) An incorrect VLAN assignment
D) A faulty DNS configuration

<details>
<summary>Answer</summary>

**B)** Late collisions and FCS errors are classic symptoms of a duplex mismatch, where one side is configured for full-duplex and the other for half-duplex. Broadcast storms cause high utilization but not late collisions. VLAN and DNS issues are Layer 2/3 problems unrelated to these Layer 1 symptoms.
</details>

**Q5.** Which fiber optic Ethernet standard uses single-mode fiber with a wavelength of 1310nm and supports distances up to 10 km?

A) 10GBASE-SR
B) 10GBASE-LR
C) 10GBASE-ER
D) 1000BASE-SX

<details>
<summary>Answer</summary>

**B)** 10GBASE-LR (Long Reach) uses single-mode fiber at 1310nm wavelength and supports distances up to 10 km. 10GBASE-SR uses multimode fiber at 850nm for short distances. 10GBASE-ER uses single-mode at 1550nm for up to 40 km. 1000BASE-SX uses multimode fiber at 850nm for shorter distances.
</details>

**Q6.** What is the purpose of padding in an Ethernet frame?

A) To encrypt the frame payload
B) To ensure the frame meets the minimum 64-byte size requirement
C) To add error correction data
D) To increase the maximum transmission unit

<details>
<summary>Answer</summary>

**B)** Padding is added when the payload is less than 46 bytes to ensure the minimum Ethernet frame size of 64 bytes (excluding preamble). This minimum size is required for proper collision detection in half-duplex mode. Padding does not provide encryption, error correction, or increase the MTU.
</details>

**Q7.** An organization wants to upgrade their wireless access point uplinks from 1 Gbps to support Wi-Fi 6 speeds without replacing their existing Cat5e cabling. Which Ethernet standard should they use?

A) 1000BASE-T
B) 10GBASE-T
C) 2.5GBASE-T
D) 100BASE-TX

<details>
<summary>Answer</summary>

**C)** 2.5GBASE-T (IEEE 802.3bz) supports 2.5 Gbps over existing Cat5e cabling at distances up to 100 meters, making it ideal for Wi-Fi 6 access point uplinks that exceed 1 Gbps. 10GBASE-T requires Cat6a. 1000BASE-T only provides 1 Gbps. 100BASE-TX would be a downgrade.
</details>

**Q8.** Which process allows two Ethernet devices to automatically determine the best common speed and duplex mode?

A) CSMA/CD
B) Spanning Tree Protocol
C) Auto-negotiation
D) Flow control

<details>
<summary>Answer</summary>

**C)** Auto-negotiation (IEEE 802.3u) allows Ethernet devices to automatically configure the best common speed and duplex mode. CSMA/CD is for collision detection in half-duplex. STP prevents Layer 2 loops. Flow control manages congestion using pause frames.
</details>

**Q9.** A server administrator wants to reduce CPU overhead when transferring large files over iSCSI to a storage array. Which Ethernet feature should be enabled on all devices in the path?

A) Flow control
B) Jumbo frames
C) Half-duplex mode
D) Auto-negotiation

<details>
<summary>Answer</summary>

**B)** Jumbo frames (up to 9000+ bytes) reduce CPU overhead by allowing larger payloads per frame, reducing the number of frames needed for large data transfers. They are commonly used in storage networks (iSCSI, NFS). All devices in the path must support jumbo frames. Flow control manages congestion but doesn't reduce per-frame overhead.
</details>

**Q10.** In the Ethernet naming convention 10GBASE-SR, what does the "SR" designate?

A) Single-mode, redundant fiber
B) Short-reach, multimode fiber
C) Standard rate, single-mode fiber
D) Shared resource, twisted pair

<details>
<summary>Answer</summary>

**B)** In Ethernet naming, "S" stands for short wavelength (850nm) which uses multimode fiber, and "R" indicates reach. 10GBASE-SR is a short-reach standard for multimode fiber with distances up to 400 meters depending on fiber type. "L" indicates long wavelength (1310nm, single-mode) and "E" indicates extended wavelength (1550nm).
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 1.3**: Ethernet standards
- **IEEE 802.3**: Ethernet standards family
- **IEEE 802.3af/at/bt**: Power over Ethernet
- **IEEE 802.3bz**: 2.5GBASE-T and 5GBASE-T