---
id: layer2-datalink
title: Layer 2 - The Data Link Layer
chapterId: ch1-networking-fundamentals
order: 3
duration: 50
objectives:
  - Understand the functions of the Data Link layer and its sublayers
  - Explain MAC addressing and its role in local network communication
  - Identify the components of an Ethernet frame
  - Distinguish between Layer 2 switches and Layer 1 hubs
  - Understand VLAN concepts and their benefits
  - Explain the Spanning Tree Protocol (STP) and its purpose
---

# Lesson 3: Layer 2 - The Data Link Layer

## Learning Objectives
- Understand the functions of the Data Link layer and its sublayers
- Explain MAC addressing and its role in local network communication
- Identify the components of an Ethernet frame
- Distinguish between Layer 2 switches and Layer 1 hubs
- Understand VLAN concepts and their benefits
- Explain the Spanning Tree Protocol (STP) and its purpose

## Introduction

The **Data Link layer** (Layer 2) bridges the gap between the Physical layer's raw bits and the Network layer's logical addressing. It's responsible for node-to-node delivery of frames within the same network segment.

### Key Responsibilities

1. **Physical addressing** using MAC addresses
2. **Framing** - encapsulating network layer packets
3. **Error detection** using CRC (Cyclic Redundancy Check)
4. **Media access control** - determining when devices can transmit
5. **Flow control** - preventing receiver overflow

---

## Data Link Sublayers

The Data Link layer is divided into two sublayers defined by IEEE 802 standards:

### LLC (Logical Link Control) - Upper Sublayer

**Functions:**
- Interface between Network layer and MAC sublayer
- Flow control between sender and receiver
- Error control and retransmission
- Multiplexing network layer protocols

**Standard:** IEEE 802.2

### MAC (Media Access Control) - Lower Sublayer

**Functions:**
- Frame assembly/disassembly
- Physical addressing with MAC addresses
- Media access management (CSMA/CD, CSMA/CA)
- Error detection using FCS (Frame Check Sequence)

**Standards:** IEEE 802.3 (Ethernet), 802.11 (Wi-Fi), 802.5 (Token Ring)

---

## MAC Addresses

A **MAC address** (Media Access Control address) is a unique 48-bit identifier assigned to network interface cards (NICs) by the manufacturer.

### Format

**Standard notation:** `00:1A:2B:3C:4D:5E` (hexadecimal, colon-separated)

**Alternative notations:**
- `00-1A-2B-3C-4D-5E` (dash-separated)
- `001A.2B3C.4D5E` (Cisco format, dot-separated)

### Structure

```
   OUI (24 bits)    |  Device Identifier (24 bits)
00:1A:2B           |  3C:4D:5E
Manufacturer       |  Unique device number
```

**OUI (Organizationally Unique Identifier):**
- First 24 bits (3 bytes)
- Assigned by IEEE to manufacturers
- Examples:
  - `00:50:56` = VMware
  - `00:0C:29` = VMware
  - `08:00:27` = Oracle VirtualBox
  - `00:1B:63` = Apple
  - `00:15:5D` = Microsoft Hyper-V

**Device Identifier:**
- Last 24 bits (3 bytes)
- Assigned by manufacturer to each device
- Should be unique worldwide

### Special MAC Addresses

| Type | Address | Purpose |
|------|---------|---------|
| **Broadcast** | FF:FF:FF:FF:FF:FF | Send to all devices on network |
| **Multicast** | 01:00:5E:xx:xx:xx | Send to group of devices (IPv4) |
| **Multicast** | 33:33:xx:xx:xx:xx | Send to group of devices (IPv6) |
| **Locally Administered** | x2, x6, xA, xE in 2nd char | Modified by administrator |

### MAC Address Types

**Unicast:**
- Least significant bit of first byte = 0
- Sent to single destination
- Example: `00:1A:2B:3C:4D:5E`

**Multicast:**
- Least significant bit of first byte = 1
- Sent to group of devices
- Example: `01:00:5E:00:00:01`

**Broadcast:**
- All bits set to 1
- Sent to all devices on local network
- `FF:FF:FF:FF:FF:FF`

---

## Ethernet Frames

An **Ethernet frame** is the PDU at the Data Link layer. It encapsulates the packet from the Network layer.

### Ethernet II Frame Structure

```
+----------+----------+------+------+---------+-----+
| Preamble |   SFD    | Dest | Src  | Type/   | FCS |
| 7 bytes  | 1 byte   | MAC  | MAC  | Length  | 4 B |
|          |          | 6 B  | 6 B  | 2 bytes |     |
+----------+----------+------+------+---------+-----+
                      |                       |
                      |     Payload Data      |
                      |    46-1500 bytes      |
                      +--------- -------------+
```

### Frame Fields

**1. Preamble (7 bytes)**
- Alternating 1s and 0s: `10101010...`
- Purpose: Synchronization between sender and receiver
- Not considered part of frame by most tools

**2. Start Frame Delimiter (SFD) - 1 byte**
- Pattern: `10101011`
- Marks end of preamble and start of frame

**3. Destination MAC Address (6 bytes)**
- MAC address of intended recipient
- Can be unicast, multicast, or broadcast

**4. Source MAC Address (6 bytes)**
- MAC address of sender
- Always unicast (cannot be broadcast/multicast)

**5. Type/Length Field (2 bytes)**
- **Type** (>= 1536): Indicates protocol (0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6)
- **Length** (<= 1500): Indicates payload size (IEEE 802.3)

**6. Payload (46-1500 bytes)**
- Data from Network layer
- Minimum 46 bytes (padded if necessary)
- Maximum 1500 bytes (MTU - Maximum Transmission Unit)

**7. Frame Check Sequence (FCS) - 4 bytes**
- CRC (Cyclic Redundancy Check) error detection
- Calculated by sender, verified by receiver
- If check fails, frame is discarded

### Frame Size

- **Minimum:** 64 bytes (including headers, excluding preamble/SFD)
- **Maximum:** 1518 bytes (standard Ethernet)
- **Jumbo frames:** Up to 9000 bytes (non-standard, data center use)

---

## How Switches Work

A **switch** is a Layer 2 device that uses MAC addresses to forward frames intelligently.

### Switch vs. Hub

| Feature | Hub (Layer 1) | Switch (Layer 2) |
|---------|---------------|------------------|
| **Intelligence** | None | Uses MAC address table |
| **Forwarding** | Broadcasts to all ports | Sends only to destination |
| **Collisions** | Yes (half-duplex) | No (full-duplex) |
| **Bandwidth** | Shared | Dedicated per port |
| **Performance** | Poor | Excellent |
| **Cost** | Very cheap | More expensive |
| **Status** | Obsolete | Standard |

### Switch Operation

**1. Learning**
- Switch receives frame on a port
- Reads source MAC address
- Records "MAC address → Port" in MAC address table
- Sets aging timer (typically 300 seconds)

**2. Forwarding**
- Switch reads destination MAC address
- Looks up MAC in address table
- Forwards frame only to destination port
- If MAC not found: floods to all ports except source

**3. Filtering**
- Switch knows source and destination on same port
- Drops frame (no forwarding needed)

**4. Aging**
- Entries removed after timeout (default 300 sec)
- Prevents stale entries from outdated devices

### MAC Address Table Example

```
Port  | MAC Address        | Age (seconds)
------|-------------------|-------------
1     | 00:1A:2B:3C:4D:01 | 45
1     | 00:1A:2B:3C:4D:02 | 120
2     | AA:BB:CC:DD:EE:01 | 30
3     | 11:22:33:44:55:66 | 200
```

### Flooding

**When does flooding occur?**
- Destination MAC not in table
- Broadcast frame (FF:FF:FF:FF:FF:FF)
- Multicast frame (depends on configuration)

**What is flooding?**
- Sending frame to all ports except the source port
- Necessary for initial learning and broadcasts
- Can cause performance issues if excessive

---

## Switching Methods

### Store-and-Forward

**Process:**
1. Receive entire frame
2. Check FCS for errors
3. Look up destination MAC
4. Forward frame

**Advantages:**
- Error checking (drops bad frames)
- Most reliable

**Disadvantages:**
- Higher latency

**Use:** Most modern switches

### Cut-Through

**Process:**
1. Read destination MAC (first 14 bytes)
2. Immediately start forwarding
3. No error checking

**Advantages:**
- Lower latency
- Faster forwarding

**Disadvantages:**
- Forwards bad frames
- Can propagate errors

**Variants:**
- **Fast-forward:** Forwards immediately after reading dest MAC
- **Fragment-free:** Waits for first 64 bytes (collision window)

---

## VLANs (Virtual Local Area Networks)

A **VLAN** is a logical grouping of devices on different physical network segments, as if they were on the same LAN.

### Why Use VLANs?

**Benefits:**
- **Segmentation:** Separate broadcast domains
- **Security:** Isolate sensitive traffic
- **Performance:** Reduce broadcast traffic
- **Flexibility:** Group users logically, not physically
- **Cost savings:** No need for multiple switches

### VLAN Types

**1. Default VLAN (VLAN 1)**
- All ports belong to VLAN 1 by default
- Cannot be deleted or renamed
- Best practice: Don't use for user traffic

**2. Data VLAN**
- User traffic
- Most common type

**3. Voice VLAN**
- Dedicated to VoIP traffic
- QoS priority
- Often separate from data VLAN on same port

**4. Management VLAN**
- Switch management traffic
- Should be separate from user VLANs

**5. Native VLAN**
- Untagged traffic on trunk ports
- Default: VLAN 1
- Security risk if not changed

### VLAN Tagging (IEEE 802.1Q)

**802.1Q Tag:**
- Inserted after source MAC address
- 4 bytes total
- Contains VLAN ID (1-4094)

**Tag Structure:**
```
+------+-----+--------+--------+
| TPID | PCP |  DEI   | VID    |
| 2 B  | 3 b |  1 bit | 12 bits|
+------+-----+--------+--------+
```

- **TPID:** Tag Protocol Identifier (0x8100 = 802.1Q)
- **PCP:** Priority Code Point (QoS)
- **DEI:** Drop Eligible Indicator
- **VID:** VLAN Identifier (1-4094, 0 and 4095 reserved)

### Access vs. Trunk Ports

**Access Port:**
- Connects to end devices (PC, printer, server)
- Belongs to single VLAN
- Untagged traffic
- Configuration: `switchport mode access`

**Trunk Port:**
- Connects between switches
- Carries multiple VLANs
- Tagged traffic (802.1Q)
- Configuration: `switchport mode trunk`

### VLAN Benefits Example

**Without VLANs:**
```
[Switch]
  |-- [Sales PCs] } Same broadcast domain
  |-- [HR PCs]    } Security risk
  |-- [IT PCs]    } Performance issues
```

**With VLANs:**
```
[Switch]
  |-- [Sales PCs] → VLAN 10
  |-- [HR PCs]    → VLAN 20  
  |-- [IT PCs]    → VLAN 30
```
- Separate broadcast domains
- Improved security and performance

---

## Spanning Tree Protocol (STP)

**STP** prevents Layer 2 loops in networks with redundant paths, while maintaining redundancy for failover.

### The Problem: Broadcast Storms

**Without STP:**
```
    [Switch A]
      /     \
     /       \
[Switch B]--[Switch C]
```

- Broadcast frames loop infinitely
- MAC address table instability
- Network becomes unusable in seconds

### How STP Works

**1. Elect Root Bridge**
- Switch with lowest Bridge ID becomes root
- Bridge ID = Priority (default 32768) + MAC address
- Root bridge is reference point for tree

**2. Determine Root Ports**
- Each non-root switch selects one port closest to root
- Based on path cost

**3. Determine Designated Ports**
- One per segment
- Port closest to root on each link

**4. Block Remaining Ports**
- Prevents loops
- Can transition to forwarding if link fails

### STP Port States

| State | Forwards Data | Learns MACs | Duration |
|-------|---------------|-------------|----------|
| **Blocking** | No | No | 20 sec (max age) |
| **Listening** | No | No | 15 sec |
| **Learning** | No | Yes | 15 sec |
| **Forwarding** | Yes | Yes | Indefinite |
| **Disabled** | No | No | Manual |

**Convergence time:** ~50 seconds (30 sec transition + 20 sec max age)

### STP Variants

**CST (Common Spanning Tree)**
- Original STP (IEEE 802.1D)
- Slow convergence (50 seconds)
- One spanning tree for all VLANs

**PVST+ (Per-VLAN Spanning Tree Plus)**
- Cisco proprietary
- Separate spanning tree per VLAN
- Better load balancing

**RSTP (Rapid Spanning Tree Protocol)**
- IEEE 802.1w
- Fast convergence (< 6 seconds)
- Backward compatible with STP
- **Most common today**

**MSTP (Multiple Spanning Tree Protocol)**
- IEEE 802.1s
- Groups VLANs into instances
- Reduces overhead vs. PVST+

### PortFast

**Feature:** Port transitions immediately to forwarding state

**Use case:** Access ports connected to end devices

**Warning:** **Never** enable on ports connected to switches (causes loops)

**Configuration:** Manual enable on access ports

---

## Layer 2 vs. Layer 3 Switches

### Layer 2 Switch
- Forwards based on MAC addresses
- Single broadcast domain (unless VLANs configured)
- No routing between VLANs
- Lower cost
- Simple configuration

### Layer 3 Switch
- Forwards based on IP addresses (routing)
- Can route between VLANs
- Combines switch and router functions
- Higher cost
- Faster than separate router
- Common in modern networks

---

## Common Layer 2 Issues

### 1. Broadcast Storms
**Cause:** Layer 2 loops, missing STP  
**Symptom:** Network completely unusable, high CPU on switches  
**Solution:** Enable STP/RSTP, fix cabling loops

### 2. MAC Address Table Overflow
**Cause:** Attack flooding table with fake MACs  
**Symptom:** Switch becomes hub (floods everything)  
**Solution:** Port security, limit MAC addresses per port

### 3. VLAN Hopping
**Cause:** Misconfigured trunk ports, native VLAN issues  
**Symptom:** Unauthorized access to other VLANs  
**Solution:** Change native VLAN, disable unused ports, proper trunk configuration

### 4. Duplex Mismatch
**Cause:** One side auto, other side hardcoded  
**Symptom:** Slow performance, late collisions  
**Solution:** Match duplex settings (both auto or both fixed)

---

## Key Protocols at Layer 2

### ARP (Address Resolution Protocol)
- Resolves IP address to MAC address
- Broadcasts "Who has IP x.x.x.x?"
- Target responds with MAC address
- Results cached in ARP table

### CDP/LLDP (Discovery Protocols)
- **CDP:** Cisco Discovery Protocol (Cisco proprietary)
- **LLDP:** Link Layer Discovery Protocol (IEEE 802.1AB, vendor-neutral)
- Share device information between neighbors
- Helps with network mapping

### PPP (Point-to-Point Protocol)
- Layer 2 WAN protocol
- Dial-up, DSL connections
- Authentication: PAP, CHAP

---

## Summary

The Data Link layer (Layer 2) is crucial for local network communication:

**Key Functions:**
- **MAC addressing** for physical device identification
- **Framing** to encapsulate Network layer packets
- **Error detection** using FCS/CRC
- **Switching** for intelligent frame forwarding

**Key Devices:**
- **Switches** operate at Layer 2
- Use MAC address tables for forwarding decisions
- Support VLANs for logical segmentation

**Key Protocols:**
- **802.1Q** for VLAN tagging
- **STP/RSTP** for loop prevention
- **ARP** for IP-to-MAC resolution

**Remember:** The Data Link layer ensures reliable transmission over a physical link and enables communication within the same network segment.

---

## References

- **CompTIA Network+ N10-008 Objective 1.1**: OSI Model - Data Link Layer
- **CompTIA Network+ N10-008 Objective 2.2**: Switching Technologies
- **IEEE 802.3**: Ethernet Standard
- **IEEE 802.1Q**: VLAN Tagging
- **IEEE 802.1D/w**: Spanning Tree Protocols
- **Professor Messer**: N10-008 Network+ Course