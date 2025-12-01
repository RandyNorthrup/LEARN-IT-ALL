---
id: ethernet-fundamentals
title: Ethernet Fundamentals (802.3 and CSMA/CD)
chapterId: ch2-network-implementations
order: 11
duration: 50
objectives:
  - Understand the history and development of Ethernet
  - Explain the IEEE 802.3 standard and its significance
  - Describe CSMA/CD operation and collision detection
  - Differentiate between half-duplex and full-duplex Ethernet
  - Identify the components of an Ethernet frame
  - Understand MAC addressing in Ethernet networks
---

# Lesson 11: Ethernet Fundamentals (802.3 and CSMA/CD)

## Learning Objectives
- Understand the history and development of Ethernet
- Explain the IEEE 802.3 standard and its significance
- Describe CSMA/CD operation and collision detection
- Differentiate between half-duplex and full-duplex Ethernet
- Identify the components of an Ethernet frame
- Understand MAC addressing in Ethernet networks

## Introduction

**Ethernet** is the most widely deployed local area network (LAN) technology in the world. Developed in the 1970s at Xerox PARC by Robert Metcalfe and standardized by the **Institute of Electrical and Electronics Engineers (IEEE)** as **802.3**, Ethernet has evolved from a 10 Mbps shared medium to modern switched networks operating at speeds up to 400 Gbps.

This lesson covers the fundamental concepts of Ethernet technology, including the 802.3 standard, the CSMA/CD access method, frame structure, and MAC addressing—all essential knowledge for the CompTIA Network+ N10-008 exam.

---

## History of Ethernet

### Origins (1970s)

**1973:** Robert Metcalfe and David Boggs at Xerox PARC develop the first Ethernet network
- Original speed: 2.94 Mbps
- Used coaxial cable
- Designed to connect Xerox Alto computers to printers

**1980:** DIX Standard (Digital, Intel, Xerox)
- Ethernet II specification released
- Speed increased to 10 Mbps
- Became the foundation for IEEE standardization

### IEEE Standardization (1983)

**1983:** IEEE releases 802.3 standard
- Based on DIX Ethernet II with modifications
- Defines physical layer and data link layer specifications
- Part of the IEEE 802 family of LAN standards

**Key Difference: Ethernet II vs IEEE 802.3**
- **Ethernet II:** Uses EtherType field (protocol identification)
- **IEEE 802.3:** Uses Length field + LLC header
- **Modern networks:** Primarily use Ethernet II format

---

## IEEE 802.3 Standard

### What is 802.3?

The **IEEE 802.3** standard defines Ethernet at the **Physical Layer (Layer 1)** and the **Data Link Layer (Layer 2)** of the OSI model.

### 802.3 Sublayers

The Data Link Layer is divided into two sublayers:

**1. MAC (Media Access Control) Sublayer:**
- Controls how devices access the shared medium
- Handles frame addressing using MAC addresses
- Implements CSMA/CD for collision detection (in half-duplex)
- Performs frame encapsulation and error detection (FCS)

**2. LLC (Logical Link Control) Sublayer:**
- Defined by IEEE 802.2 (applies to all 802 LANs)
- Provides interface between MAC layer and Network Layer
- Handles flow control and error control
- Less commonly used in modern Ethernet (uses Ethernet II format instead)

### 802.3 Specifications

The 802.3 standard includes numerous specifications for different:
- **Speeds:** 10 Mbps, 100 Mbps, 1 Gbps, 10 Gbps, 40 Gbps, 100 Gbps, 400 Gbps
- **Media:** Copper (twisted pair, coaxial), Fiber optic (single-mode, multimode)
- **Cable distances:** 100m (copper) to 40km+ (fiber)

**Common 802.3 Variants:**
- **802.3:** 10BASE5 (original Thicknet)
- **802.3i:** 10BASE-T (twisted pair)
- **802.3u:** 100BASE-TX (Fast Ethernet)
- **802.3ab:** 1000BASE-T (Gigabit Ethernet over copper)
- **802.3ae:** 10GBASE-SR/LR (10 Gigabit Ethernet)
- **802.3bz:** 2.5GBASE-T and 5GBASE-T (for WiFi 6 backhaul)

---

## CSMA/CD: Carrier Sense Multiple Access with Collision Detection

### What is CSMA/CD?

**CSMA/CD** is the media access control method used by Ethernet to manage how devices share the network medium in **half-duplex** mode. It ensures that only one device transmits at a time on a shared network segment.

**CSMA/CD is NOT used in modern switched, full-duplex Ethernet** but remains an important concept for the Network+ exam.

### CSMA/CD Components

**CS (Carrier Sense):**
- Device "listens" to the network cable before transmitting
- Checks if another device is currently transmitting
- If medium is idle, device can transmit

**MA (Multiple Access):**
- Multiple devices share the same network medium (cable)
- All devices have equal access to the medium

**CD (Collision Detection):**
- Device monitors the medium while transmitting
- Detects if another device transmits simultaneously (collision)
- If collision detected, stops transmission and sends jam signal

### CSMA/CD Operation (Step-by-Step)

**Step 1: Device has data to send**
- NIC receives frame from upper layers
- Prepares to transmit on the network

**Step 2: Carrier Sense (Listen)**
- Device listens to the network medium
- Checks if any other device is transmitting
- **If busy:** Wait until medium is idle
- **If idle:** Proceed to Step 3

**Step 3: Transmit Frame**
- Device begins transmitting the frame
- Monitors the medium during transmission (collision detection)

**Step 4: Collision Detection**
- **No collision detected:** Frame transmitted successfully
- **Collision detected:** Proceed to Step 5

**Step 5: Jam Signal**
- Device detects collision (voltage spike on cable)
- Stops transmitting data
- Sends **jam signal** (32-bit pattern) to ensure all devices know collision occurred

**Step 6: Backoff Algorithm**
- Device calculates random backoff time using **exponential backoff**
- Waits for backoff period
- Returns to Step 2 (listen before retransmitting)

**Step 7: Retry**
- After waiting, device attempts retransmission
- **Maximum retries:** 16 attempts
- **If 16 attempts fail:** Frame is discarded, error reported to upper layers

### Exponential Backoff Algorithm

After a collision, devices use **binary exponential backoff** to determine wait time:

**Formula:** Slot time × Random(0, 2^n - 1)

- **n:** Number of collisions (capped at 10)
- **Slot time:** 512 bit times (51.2 microseconds for 10 Mbps Ethernet)
- **Random range:** Increases exponentially with each collision

**Example:**
- **1st collision (n=1):** Wait 0 or 1 slot times (random choice)
- **2nd collision (n=2):** Wait 0, 1, 2, or 3 slot times
- **3rd collision (n=3):** Wait 0 to 7 slot times
- **10th collision (n=10):** Wait 0 to 1023 slot times (maximum)

This ensures devices don't immediately re-collide after waiting.

### Collision Domain

A **collision domain** is a network segment where collisions can occur.

**Characteristics:**
- All devices in a collision domain share the same bandwidth
- Only ONE device can transmit at a time
- More devices = more collisions = lower effective throughput

**Devices that create separate collision domains:**
- **Switches:** Each switch port is a separate collision domain
- **Routers:** Each router interface is a separate collision domain

**Devices that DO NOT separate collision domains:**
- **Hubs:** All ports share ONE collision domain
- **Repeaters:** Extend collision domain (don't separate it)

**Modern Impact:**
- Switched Ethernet with full-duplex: **NO collision domains**
- CSMA/CD is disabled in full-duplex mode
- Each device has dedicated bandwidth

---

## Half-Duplex vs Full-Duplex

### Half-Duplex Ethernet

**Definition:** Device can send OR receive, but not both simultaneously

**Characteristics:**
- Uses CSMA/CD
- Collisions can occur
- Shared bandwidth
- Used in hub-based networks (legacy)

**Example:**
- 10 Mbps half-duplex = 10 Mbps shared (send OR receive)

**Analogy:** Single-lane road (one direction at a time)

### Full-Duplex Ethernet

**Definition:** Device can send AND receive simultaneously

**Characteristics:**
- **No CSMA/CD** (collision detection disabled)
- **No collisions** possible
- Dedicated bandwidth in both directions
- Requires point-to-point connection (switch to device)
- Standard in modern switched Ethernet

**Example:**
- 1 Gbps full-duplex = 1 Gbps send + 1 Gbps receive = 2 Gbps total throughput

**Analogy:** Two-lane road (both directions simultaneously)

**Requirements for Full-Duplex:**
- Point-to-point link (switch port to single device)
- Both devices must support full-duplex
- No hubs in the path

---

## Ethernet Frame Structure

An **Ethernet frame** is the data unit transmitted on an Ethernet network. Understanding frame structure is critical for troubleshooting and network analysis.

### Ethernet II Frame Format (Most Common)

```
| Preamble | SFD | Dest MAC | Src MAC | EtherType | Payload | FCS |
|  7 bytes | 1 B |  6 bytes | 6 bytes |  2 bytes  | 46-1500 | 4 B |
```

### Field-by-Field Breakdown

**1. Preamble (7 bytes)**
- **Purpose:** Synchronizes clocks between sender and receiver
- **Pattern:** Alternating 1s and 0s (10101010... repeated 7 times)
- **Function:** Allows receiver's NIC to lock onto signal timing
- **Not considered part of frame** in most contexts

**2. Start Frame Delimiter (SFD) - 1 byte**
- **Purpose:** Indicates start of actual frame data
- **Pattern:** 10101011 (ends with two consecutive 1s)
- **Function:** Signals "frame data starts NOW"

**3. Destination MAC Address (6 bytes)**
- **Purpose:** Identifies intended recipient
- **Format:** 48-bit address (12 hexadecimal digits)
- **Types:**
  - Unicast: Single device (00:1A:2B:3C:4D:5E)
  - Broadcast: All devices (FF:FF:FF:FF:FF:FF)
  - Multicast: Group of devices (01:00:5E:xx:xx:xx)

**4. Source MAC Address (6 bytes)**
- **Purpose:** Identifies sender
- **Format:** 48-bit address
- **Usage:** Allows recipient to reply

**5. EtherType (2 bytes) - Ethernet II**
- **Purpose:** Identifies protocol in payload
- **Common values:**
  - `0x0800`: IPv4
  - `0x0806`: ARP (Address Resolution Protocol)
  - `0x86DD`: IPv6
  - `0x8100`: VLAN-tagged frame (802.1Q)

**Alternative: Length Field (IEEE 802.3)**
- Specifies length of payload
- Used with LLC header
- Less common in modern networks

**6. Payload (Data) - 46 to 1500 bytes**
- **Purpose:** Actual data being transmitted
- **Minimum:** 46 bytes (padded if necessary)
- **Maximum:** 1500 bytes (standard MTU)
- **Jumbo frames:** Up to 9000 bytes (non-standard)

**Padding:**
- If data < 46 bytes, padding added to reach minimum
- Ensures collision detection works properly (minimum frame time)

**7. Frame Check Sequence (FCS) - 4 bytes**
- **Purpose:** Error detection
- **Method:** CRC-32 (Cyclic Redundancy Check)
- **Calculation:** Computed over entire frame (Dest MAC through Payload)
- **Verification:** Receiver recalculates CRC and compares
- **If mismatch:** Frame discarded (corrupted data)

### Frame Size Constraints

**Minimum Frame Size: 64 bytes**
- Includes: Dest MAC (6) + Src MAC (6) + EtherType (2) + Payload (46) + FCS (4)
- **Why?** Ensures collision detection works (minimum transmission time)
- Frames < 64 bytes are **runt frames** (usually errors)

**Maximum Frame Size: 1518 bytes (standard)**
- Includes: Dest MAC (6) + Src MAC (6) + EtherType (2) + Payload (1500) + FCS (4)
- **MTU (Maximum Transmission Unit):** 1500 bytes (payload only)
- Frames > 1518 bytes are **jumbo frames** (non-standard, up to 9000 bytes)
- Frames > maximum are **giant frames** (errors)

---

## MAC Addressing

### What is a MAC Address?

A **MAC (Media Access Control) address** is a unique 48-bit identifier assigned to network interface cards (NICs). MAC addresses operate at **Layer 2 (Data Link Layer)**.

### MAC Address Format

**Format:** 48 bits (6 bytes) written as 12 hexadecimal digits

**Notation styles:**
- **Colon-separated:** `00:1A:2B:3C:4D:5E` (Linux/Unix)
- **Hyphen-separated:** `00-1A-2B-3C-4D-5E` (Windows)
- **Dot-separated:** `001A.2B3C.4D5E` (Cisco)

### MAC Address Structure

```
   OUI (24 bits)          NIC Specific (24 bits)
|------------------|  |------------------------|
  00:1A:2B         :     3C:4D:5E
```

**OUI (Organizationally Unique Identifier) - First 24 bits:**
- Assigned by IEEE to manufacturer
- Identifies the vendor
- Examples:
  - `00:50:56` = VMware
  - `00:1B:63` = Apple
  - `00:0C:29` = VMware virtual NICs

**NIC Specific - Last 24 bits:**
- Assigned by manufacturer
- Should be unique for each device
- Provides 16,777,216 unique addresses per OUI

### Special MAC Address Bits

**I/G Bit (Individual/Group) - Bit 0 of first byte:**
- **0:** Unicast (single destination)
- **1:** Multicast/Broadcast (multiple destinations)

**U/L Bit (Universal/Local) - Bit 1 of first byte:**
- **0:** Universally administered (IEEE assigned)
- **1:** Locally administered (manually configured)

**Example:** `00:1A:2B:3C:4D:5E`
- First byte: `00` (binary: 00000000)
- Bit 0 = 0 (Unicast)
- Bit 1 = 0 (Universally administered)

### Types of MAC Addresses

**1. Unicast MAC Address**
- Identifies a single device
- Used for one-to-one communication
- Example: `00:1A:2B:3C:4D:5E`

**2. Broadcast MAC Address**
- Identifies all devices on the network
- Address: `FF:FF:FF:FF:FF:FF`
- All devices must process broadcast frames
- Used by ARP, DHCP Discover, etc.

**3. Multicast MAC Address**
- Identifies a group of devices
- First byte: `01:00:5E` for IPv4 multicast
- Only devices subscribed to multicast group process frame
- Example: `01:00:5E:00:00:01` (all hosts multicast)

---

## Key Takeaways

1. **Ethernet is standardized as IEEE 802.3** and operates at Layer 1 and Layer 2
2. **CSMA/CD** manages media access in half-duplex Ethernet (legacy)
3. **Full-duplex Ethernet** eliminates collisions and doubles throughput
4. **Collision domains** are separated by switches (each port = separate domain)
5. **Ethernet frames** have minimum (64 bytes) and maximum (1518 bytes) sizes
6. **MAC addresses** are 48-bit Layer 2 addresses burned into NICs
7. **Modern Ethernet** uses full-duplex switching (no CSMA/CD, no collisions)

---

## Real-World Application

**Scenario:** Troubleshooting network slowness in an office

**Using Ethernet fundamentals:**

1. **Check for collisions:** If using old hubs (unlikely), collisions cause retransmissions
   - **Solution:** Replace hubs with switches (creates separate collision domains)

2. **Verify full-duplex:** Ensure switch ports and NICs configured for full-duplex
   - **Duplex mismatch:** Causes performance issues and errors
   - **Check:** `show interface` on switch, NIC properties on PC

3. **Analyze frame errors:** Use Wireshark to capture traffic
   - **Runt frames** (< 64 bytes): Collision fragments, bad NICs
   - **Giant frames** (> 1518 bytes): Misconfigured MTU, NIC errors
   - **FCS errors:** Bad cables, EMI, faulty NICs

4. **Check MAC address table:** Verify switch learned correct MAC addresses
   - **Flooding:** If switch doesn't know destination MAC, floods all ports
   - **MAC address conflicts:** Duplicate MACs cause intermittent issues

---

## Practice Questions

**1. What does CSMA/CD stand for?**
- A) Carrier Sense Media Access with Collision Detection
- B) Collision Sense Multiple Access with Carrier Detection
- C) Carrier Sense Multiple Access with Collision Detection ✓
- D) Carrier Signal Multiple Access with Collision Domain

**Answer:** C - CSMA/CD stands for Carrier Sense Multiple Access with Collision Detection. Devices listen (carrier sense) before transmitting, multiple devices share the medium (multiple access), and collisions are detected (collision detection).

---

**2. In a full-duplex Ethernet connection, which statement is TRUE?**
- A) CSMA/CD is enabled and collisions can occur
- B) Devices can send and receive simultaneously ✓
- C) Bandwidth is shared between all devices
- D) A hub must be used to connect devices

**Answer:** B - Full-duplex allows simultaneous send and receive, doubles throughput, and disables CSMA/CD. No collisions are possible in full-duplex mode.

---

**3. What is the minimum size of an Ethernet frame?**
- A) 46 bytes
- B) 64 bytes ✓
- C) 512 bytes
- D) 1518 bytes

**Answer:** B - The minimum Ethernet frame size is 64 bytes (includes Dest MAC, Src MAC, EtherType, 46-byte payload minimum, and FCS). Frames smaller than 64 bytes are called "runt frames" and indicate errors.

---

**4. Which device creates separate collision domains for each port?**
- A) Hub
- B) Repeater
- C) Switch ✓
- D) Wireless Access Point

**Answer:** C - Switches create separate collision domains for each port. Hubs and repeaters share one collision domain across all ports.

---

**5. What is the purpose of the FCS field in an Ethernet frame?**
- A) Identifies the protocol type
- B) Provides the source MAC address
- C) Detects transmission errors using CRC ✓
- D) Indicates the start of the frame

**Answer:** C - The Frame Check Sequence (FCS) uses a CRC-32 calculation to detect errors. The receiver recalculates the CRC and discards frames with mismatches.

---

## References

- **CompTIA Network+ N10-008 Objective 1.3:** Compare and contrast types of network topologies and technologies
- **CompTIA Network+ N10-008 Objective 2.3:** Compare and contrast routing technologies and bandwidth management concepts
- **IEEE 802.3 Standard:** Ethernet specifications
- **RFC 894:** A Standard for the Transmission of IP Datagrams over Ethernet Networks
- Professor Messer: Network+ N10-008 - Ethernet Fundamentals
- Cisco Networking Academy: CCNA - Ethernet Overview

---

**Next Lesson:** Lesson 12 - Ethernet Standards (10BASE-T, 100BASE-TX, 1000BASE-T, 10GBASE-T)
