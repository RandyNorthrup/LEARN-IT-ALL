---
id: lesson-013-switching-basics
title: Switching Basics (MAC Address Tables and Frame Forwarding)
chapterId: ch3-network-implementations
order: 13
duration: 45
objectives:
  - Understand how switches operate at Layer 2
  - Explain MAC address table learning and aging
  - Describe the frame forwarding process
  - Differentiate between switching methods (store-and-forward, cut-through)
  - Understand flooding, filtering, and forwarding decisions
  - Identify switching loops and broadcast storms
---

# Lesson 13: Switching Basics (MAC Address Tables and Frame Forwarding)

## Learning Objectives
- Understand how switches operate at Layer 2
- Explain MAC address table learning and aging
- Describe the frame forwarding process
- Differentiate between switching methods (store-and-forward, cut-through)
- Understand flooding, filtering, and forwarding decisions
- Identify switching loops and broadcast storms

## Introduction

**Network switches** are Layer 2 devices that forward frames between devices on a local area network (LAN). Unlike hubs that broadcast to all ports, switches make intelligent forwarding decisions based on **MAC address tables**, significantly improving network performance and security.

This lesson covers fundamental switching concepts including MAC address learning, frame forwarding methods, and switching decision processes—critical knowledge for the CompTIA Network+ N10-009 exam.

---

## What is a Network Switch?

### Switch Definition

A **switch** (or **switching hub**) is a Layer 2 network device that:
- Forwards frames based on destination MAC addresses
- Creates separate collision domains for each port
- Learns MAC addresses dynamically
- Filters traffic (sends frames only to intended recipient)
- Operates in full-duplex mode

### Switch vs Hub vs Router

| Feature | Hub | Switch | Router |
|---------|-----|--------|--------|
| **OSI Layer** | Layer 1 (Physical) | Layer 2 (Data Link) | Layer 3 (Network) |
| **Forwarding Decision** | None (broadcasts all) | MAC address | IP address |
| **Collision Domains** | 1 (all ports share) | 1 per port | 1 per interface |
| **Broadcast Domains** | 1 | 1 (unless VLANs) | 1 per interface |
| **Intelligence** | None | MAC learning | Routing table |
| **Duplex** | Half-duplex | Full-duplex | Full-duplex |
| **Performance** | Low (shared bandwidth) | High (dedicated per port) | Medium (routing overhead) |

---

## MAC Address Table (CAM Table)

### What is a MAC Address Table?

The **MAC address table** (also called **CAM table** - Content Addressable Memory) is the switch's database that maps MAC addresses to specific switch ports.

**Structure:**
```
MAC Address         Port    VLAN    Age (seconds)
-------------------------------------------------
00:1A:2B:3C:4D:5E   Fa0/1   1       120
00:AA:BB:CC:DD:EE   Fa0/5   1       45
00:11:22:33:44:55   Fa0/12  1       200
```

**Fields:**
- **MAC Address:** 48-bit address of device
- **Port:** Physical switch port where device is connected
- **VLAN:** VLAN membership (default: VLAN 1)
- **Age:** Time since last frame received from this MAC (in seconds)

### MAC Address Learning Process

**Step 1: Switch Powers On**
- MAC address table is empty
- Switch doesn't know which devices are on which ports

**Step 2: Frame Arrives on Port**
- Switch examines **source MAC address** in frame
- Adds entry: `[Source MAC → Port received on]`
- Updates age timer

**Step 3: Learning Complete**
- Switch now knows which port to use to reach that device
- Entry remains in table until aging timeout (default: 300 seconds / 5 minutes)

**Example:**

```
Time: 0 seconds
MAC Table: Empty

PC-A (MAC: AA:AA:AA:AA:AA:AA) on Port 1 sends frame to PC-B
↓
Time: 1 second
MAC Table:
AA:AA:AA:AA:AA:AA → Port 1 (Age: 1)

PC-B (MAC: BB:BB:BB:BB:BB:BB) on Port 5 replies to PC-A
↓
Time: 2 seconds
MAC Table:
AA:AA:AA:AA:AA:AA → Port 1 (Age: 2)
BB:BB:BB:BB:BB:BB → Port 5 (Age: 1)
```

### MAC Address Aging

**Purpose:** Remove stale entries to keep table current

**Default Aging Time:** 300 seconds (5 minutes)
- If no frames received from a MAC for 5 minutes, entry removed
- Prevents table from filling with disconnected devices

**Refresh:** Each time a frame is received from a MAC, age resets to 0

**Why Aging Matters:**
- Devices move to different ports
- Devices disconnect
- Table has finite size (modern switches: 8,000-128,000 entries)

### MAC Address Table CLI Commands (Cisco IOS)

Network administrators use these commands to inspect and manage the MAC address table:

```cisco
! View the entire MAC address table
Switch# show mac address-table
          Mac Address Table
-------------------------------------------
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    00aa.bbcc.0001    DYNAMIC     Fa0/1
   1    00aa.bbcc.0002    DYNAMIC     Fa0/5
   1    00aa.bbcc.0003    DYNAMIC     Fa0/12
  10    00aa.bbcc.0010    DYNAMIC     Gi0/1
  10    00aa.bbcc.0011    DYNAMIC     Gi0/2
Total Mac Addresses for this criterion: 5

! View MAC addresses for a specific VLAN
Switch# show mac address-table vlan 10

! View MAC addresses on a specific interface
Switch# show mac address-table interface Fa0/1

! Find which port a specific MAC address is on
Switch# show mac address-table address 00aa.bbcc.0001

! View MAC address table count
Switch# show mac address-table count
Mac Entries for Vlan 1:    3
Mac Entries for Vlan 10:   2
Total Mac Addresses:       5

! Clear the MAC address table (force re-learning)
Switch# clear mac address-table dynamic

! Clear specific entry
Switch# clear mac address-table dynamic address 00aa.bbcc.0001

! Change aging time (default: 300 seconds)
Switch(config)# mac address-table aging-time 120

! Configure a static MAC address entry
Switch(config)# mac address-table static 00aa.bbcc.ffff vlan 1 interface Fa0/1
```

### Static vs Dynamic MAC Addresses

| Characteristic | Dynamic MAC Entry | Static MAC Entry |
|---|---|---|
| **How learned** | Automatically from incoming frames | Manually configured by admin |
| **Aging** | Removed after aging timer expires | Permanent (survives reboot if saved) |
| **Use case** | Normal operation | Security, fixed device assignment |
| **Table type label** | DYNAMIC | STATIC |
| **Override** | Can be overwritten by new learning | Cannot be overwritten dynamically |

### MAC Address Table Overflow Attack (CAM Table Overflow)

The MAC address table has a finite size. An attacker can exploit this:

```
Attack Process:
1. Attacker sends thousands of frames with random source MACs
2. Switch MAC table fills to capacity
3. Switch cannot learn new legitimate MAC addresses
4. All unknown unicast frames are FLOODED to all ports
5. Attacker can now sniff traffic destined for other devices

Defense: Port Security (limits MAC addresses per port)
```

**Impact:** Switch degrades to hub-like behavior (flooding all traffic)

**Prevention Strategies:**
- Enable port security to limit MACs per port
- Use 802.1X authentication
- Implement DHCP snooping
- Monitor for MAC flapping (rapid MAC address changes)

---

## Frame Forwarding Process

### Switching Decision (3 Actions)

When a frame arrives, the switch makes one of three decisions:

**1. Forward**
- Destination MAC is known and on a different port
- Frame sent only to destination port
- **Example:** MAC table shows destination on Port 5, frame arrived on Port 1 → Forward to Port 5

**2. Filter (Drop)**
- Destination MAC is known and on the SAME port frame arrived on
- Frame not forwarded (already on correct segment)
- **Example:** Frame arrived on Port 1, destination also on Port 1 → Filter (drop)

**3. Flood**
- Destination MAC is UNKNOWN (not in MAC table)
- Frame sent to ALL ports except the port it arrived on
- Also used for broadcast and multicast frames
- **Example:** MAC table has no entry for destination → Flood all ports

### Frame Forwarding Step-by-Step

**Step 1:** Frame arrives on switch port
**Step 2:** Switch reads **source MAC** → Learn (add to MAC table)
**Step 3:** Switch reads **destination MAC** → Make forwarding decision

**Decision Logic:**

```
Is destination MAC in MAC table?
  ├─ NO → FLOOD to all ports (except incoming)
  │
  └─ YES → Is destination port same as source port?
            ├─ YES → FILTER (drop frame)
            └─ NO → FORWARD to destination port only
```

### Example Scenario

**Topology:**
```
     [Switch]
    /  |  |  \
  P1  P2  P3  P4
   |   |   |   |
  PC-A PC-B PC-C PC-D
```

**MAC Addresses:**
- PC-A: AA:AA:AA:AA:AA:AA (Port 1)
- PC-B: BB:BB:BB:BB:BB:BB (Port 2)
- PC-C: CC:CC:CC:CC:CC:CC (Port 3)
- PC-D: DD:DD:DD:DD:DD:DD (Port 4)

**Scenario 1: MAC Table Empty, PC-A pings PC-B**

1. **PC-A sends frame** (Src: AA, Dst: BB) → arrives Port 1
2. **Switch learns:** AA → Port 1
3. **Switch checks MAC table for BB:** Not found
4. **Switch floods frame** to Ports 2, 3, 4 (all except Port 1)
5. **PC-B receives frame** and replies (Src: BB, Dst: AA) → arrives Port 2
6. **Switch learns:** BB → Port 2
7. **Switch checks MAC table for AA:** Found on Port 1
8. **Switch forwards frame** to Port 1 only

**MAC Table After:**
```
AA:AA:AA:AA:AA:AA → Port 1
BB:BB:BB:BB:BB:BB → Port 2
```

**Scenario 2: MAC Table Populated, PC-A pings PC-B Again**

1. **PC-A sends frame** (Src: AA, Dst: BB) → arrives Port 1
2. **Switch checks MAC table for BB:** Found on Port 2
3. **Switch forwards frame** to Port 2 only (PC-C and PC-D don't see it)

---

## Switching Methods (Frame Forwarding Techniques)

Switches use different methods to process and forward frames, each with trade-offs between speed and error checking.

### 1. Store-and-Forward Switching

**How it works:**
- Receives entire frame into buffer
- Calculates CRC (Frame Check Sequence)
- Compares calculated CRC to FCS in frame
- **If CRC matches:** Forward frame
- **If CRC mismatch:** Drop frame (error detected)

**Advantages:**
- **Error checking:** Drops corrupt frames
- **No bad frames forwarded:** Network stays clean
- **Supports different speeds:** Can buffer frames between ports of different speeds

**Disadvantages:**
- **Higher latency:** Must receive entire frame before forwarding
- **Slower:** Typically 10-40 microseconds delay

**Use Case:** Default on most modern switches, preferred for reliability

---

### 2. Cut-Through Switching

**How it works:**
- Begins forwarding as soon as **destination MAC address** is read (first 6 bytes after preamble)
- Does NOT wait for entire frame
- Does NOT check CRC

**Advantages:**
- **Lower latency:** Faster forwarding (microseconds)
- **High performance:** Ideal for low-latency applications

**Disadvantages:**
- **No error checking:** Forwards corrupt frames
- **Can propagate errors:** Bad frames reach destination
- **No speed adaptation:** Source and destination must be same speed

**Use Case:** High-frequency trading, real-time gaming, latency-sensitive applications

---

### 3. Fragment-Free Switching (Modified Cut-Through)

**How it works:**
- Reads first **64 bytes** of frame (minimum frame size)
- Checks for collision fragments (runt frames)
- Then forwards frame without full CRC check

**Advantages:**
- **Faster than store-and-forward:** Less delay
- **Catches most errors:** Collision fragments < 64 bytes dropped
- **Compromise:** Balance between speed and reliability

**Disadvantages:**
- **No full CRC check:** Can forward frames with errors in payload
- **Not as fast as cut-through:** Slightly higher latency

**Use Case:** Networks where some error checking is needed but low latency desired

---

### Comparison Table

| Method | Latency | Error Detection | Forwards Bad Frames? | Speed Adaptation |
|--------|---------|-----------------|----------------------|------------------|
| **Store-and-Forward** | High (10-40 µs) | Full CRC check | No | Yes |
| **Cut-Through** | Low (few µs) | None | Yes | No |
| **Fragment-Free** | Medium | Collision fragments only | Some | No |

### Adaptive Switching

Some modern switches support **adaptive switching**, which dynamically switches between methods:

- **Normal operation:** Uses cut-through for lowest latency
- **High error rate detected:** Automatically switches to store-and-forward
- **Error rate decreases:** Returns to cut-through mode

This provides the best of both worlds — low latency when the network is healthy, error protection when problems arise.

---

## Switch Port Types

Switch ports can be configured in different modes depending on their function:

### Access Ports

**Function:** Connect end devices (PCs, printers, phones) to a single VLAN

**Characteristics:**
- Carries traffic for **one VLAN only**
- Frames are **untagged** (no 802.1Q header)
- Default port type on most switches

```cisco
Switch(config)# interface Fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
```

### Trunk Ports

**Function:** Connect switches to switches (or to routers) carrying multiple VLANs

**Characteristics:**
- Carries traffic for **multiple VLANs**
- Frames are **tagged** with 802.1Q VLAN ID
- One **native VLAN** sends/receives frames untagged

```cisco
Switch(config)# interface Gi0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
Switch(config-if)# switchport trunk native vlan 99
```

### Port Mode Negotiation (DTP)

**Dynamic Trunking Protocol (DTP)** allows ports to negotiate trunk/access status:

| Mode | Description | Forms trunk with |
|---|---|---|
| `switchport mode access` | Always access port | Nothing (no negotiation) |
| `switchport mode trunk` | Always trunk | trunk, dynamic desirable, dynamic auto |
| `switchport mode dynamic desirable` | Actively tries to form trunk | trunk, dynamic desirable, dynamic auto |
| `switchport mode dynamic auto` | Passively waits | trunk, dynamic desirable |

**Best Practice:** Disable DTP and manually set port modes for security:

```cisco
! On access ports:
Switch(config-if)# switchport mode access
Switch(config-if)# switchport nonegotiate

! On trunk ports:
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport nonegotiate
```

### Access Port vs Trunk Port Comparison

```
  ACCESS PORT                    TRUNK PORT
  (to end devices)               (to switches/routers)

  [PC] ---- [Switch Port]       [Switch] ---- [Switch]
       Fa0/1 (VLAN 10)                Gi0/1 (trunk)

  Frame on wire:                 Frame on wire:
  +---------+---------+          +---------+--------+---------+
  | Dst MAC | Src MAC |...       | Dst MAC | 802.1Q | Src MAC |...
  +---------+---------+          +---------+--------+---------+
  (no VLAN tag)                  (VLAN tag = 10, 20, 30...)
```

---

## Port Security

Port security restricts which devices can connect to a switch port by limiting allowed MAC addresses.

### Why Port Security?

- Prevent unauthorized devices from connecting
- Mitigate MAC address table overflow attacks
- Control which devices access the network
- Enforce organizational security policies

### Port Security Configuration

```cisco
! Enable port security on an access port
Switch(config)# interface Fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 2
Switch(config-if)# switchport port-security mac-address sticky
Switch(config-if)# switchport port-security violation shutdown
```

**Port Security Parameters:**

| Parameter | Description | Default |
|---|---|---|
| **maximum** | Max MAC addresses allowed on port | 1 |
| **mac-address** | Specific MAC to allow | (none) |
| **mac-address sticky** | Dynamically learn and save MACs | Disabled |
| **violation** | Action when violation occurs | Shutdown |

### Violation Modes

| Mode | Action | Sends Alert | Port Status | Counter |
|---|---|---|---|---|
| **Shutdown** | Disables port (err-disabled) | Yes (SNMP/syslog) | Down | Yes |
| **Restrict** | Drops violating frames | Yes (SNMP/syslog) | Up | Yes |
| **Protect** | Drops violating frames | No | Up | No |

**Recovery from err-disabled (shutdown violation):**
```cisco
! Manual recovery:
Switch(config)# interface Fa0/1
Switch(config-if)# shutdown
Switch(config-if)# no shutdown

! Automatic recovery (after 300 seconds):
Switch(config)# errdisable recovery cause psecure-violation
Switch(config)# errdisable recovery interval 300
```

### Verifying Port Security

```cisco
Switch# show port-security interface Fa0/1
Port Security              : Enabled
Port Status                : Secure-up
Violation Mode             : Shutdown
Aging Time                 : 0 mins
Aging Type                 : Absolute
Maximum MAC Addresses      : 2
Total MAC Addresses        : 1
Configured MAC Addresses   : 0
Sticky MAC Addresses       : 1
Last Source Address:Vlan   : 00aa.bbcc.0001:10
Security Violation Count   : 0
```

---

## Broadcast, Unicast, and Multicast Handling

### Unicast Frame

**Destination MAC:** Specific device (e.g., `00:1A:2B:3C:4D:5E`)

**Switch Action:**
- **If MAC in table:** Forward to specific port
- **If MAC unknown:** Flood to all ports

---

### Broadcast Frame

**Destination MAC:** `FF:FF:FF:FF:FF:FF`

**Switch Action:**
- **Always floods** to all ports (except incoming port)
- All devices on the LAN receive broadcast
- **Broadcast domain:** All ports on same VLAN

**Examples:**
- ARP requests
- DHCP Discover
- NetBIOS name resolution

---

### Multicast Frame

**Destination MAC:** Starts with `01:00:5E` (IPv4 multicast)

**Switch Action (depends on configuration):**
- **Default (no multicast optimization):** Flood to all ports
- **With IGMP snooping:** Forward only to ports with subscribers

---

## Managed vs Unmanaged Switches

### Unmanaged Switches

**Characteristics:**
- No configuration interface (no CLI, no web GUI)
- Plug-and-play operation
- All ports in single VLAN (VLAN 1)
- No SNMP monitoring capability
- No QoS, port security, or spanning tree control
- Fixed settings (auto speed/duplex negotiation)

**Best for:** Home networks, small workgroups, temporary setups

### Managed Switches

**Characteristics:**
- Full configuration via CLI (SSH/Telnet) and/or web GUI
- VLAN support, QoS, port mirroring, SNMP
- Port security, 802.1X authentication
- STP/RSTP control, link aggregation (LACP)
- Firmware upgradable, configuration backup/restore
- Logging (syslog), RMON statistics

**Best for:** Enterprise networks, data centers, any deployment requiring monitoring

### When to Use Which

```
  Home Office with 5 devices
  → Unmanaged 8-port switch ($30-50)
    Reason: No VLANs, no monitoring needed

  Small Business with 20 employees + VoIP
  → Smart/web-managed 24-port PoE switch ($200-500)
    Reason: Basic VLANs for voice/data, PoE for phones

  Enterprise Floor with 200 users + WAPs + cameras
  → Managed 48-port PoE+ switch ($2,000-5,000)
    Reason: VLANs, QoS, port security, SNMP, 802.1X

  Data Center Top-of-Rack
  → Managed L3 switch with 10G/25G ports ($10,000+)
    Reason: Inter-VLAN routing, high throughput, redundancy
```

---

## Layer 2 vs Layer 3 Switching

### Layer 2 Switching

**Operates at:** Data Link Layer (Layer 2)

**Forwarding based on:** Destination MAC address

**Functions:**
- Frame forwarding using MAC address table
- VLAN segmentation
- Spanning Tree Protocol (loop prevention)
- Link aggregation (EtherChannel/LACP)

**Cannot do:** Route between VLANs (requires external router)

### Layer 3 Switching (Multilayer Switching)

**Operates at:** Data Link (Layer 2) + Network (Layer 3)

**Forwarding based on:** MAC address (L2) AND IP address (L3)

**Functions:**
- Everything a Layer 2 switch does, PLUS:
- Inter-VLAN routing using SVIs (Switch Virtual Interfaces)
- IP routing (static routes, OSPF, EIGRP)
- ACLs based on IP addresses
- DHCP relay (ip helper-address)

### Comparison Table

| Feature | Layer 2 Switch | Layer 3 Switch |
|---|---|---|
| **Forwarding** | MAC addresses only | MAC + IP addresses |
| **VLANs** | Yes (creates them) | Yes (creates + routes between) |
| **Routing** | No | Yes (hardware-based, wire speed) |
| **Default Gateway** | No (needs router) | Yes (SVIs act as gateways) |
| **ACLs** | Port-based only | Port-based + IP-based |
| **Cost** | Lower | Higher |
| **Placement** | Access layer | Distribution/Core layer |
| **Example** | Cisco Catalyst 2960 | Cisco Catalyst 3850, 9300 |

### Where Each Switch Type is Deployed

```
                [WAN Router]
                     |
              [Core L3 Switch]          ← Layer 3 (routes between VLANs)
               /           \
    [Distribution L3 SW]  [Distribution L3 SW]  ← Layer 3 (aggregation)
       /        \              /        \
  [Access L2]  [Access L2]  [Access L2]  [Access L2]  ← Layer 2 (end devices)
    |    |       |    |       |    |       |    |
   PCs  Phones  PCs  Phones  PCs  Phones  PCs  Phones
```

---

## Switching Loops and Broadcast Storms

### What is a Switching Loop?

A **switching loop** occurs when there are multiple paths between switches without loop prevention, causing frames to circulate indefinitely.

**Causes:**
- Redundant links between switches
- No Spanning Tree Protocol (STP) enabled
- Misconfigured network

**Topology Example:**
```
     [Switch A]
      /      \
     /        \
[Switch B]----[Switch C]
```
Two paths from A to B (direct and via C) = Loop potential

### Broadcast Storm

A **broadcast storm** happens when a broadcast frame endlessly circulates in a switching loop, consuming all bandwidth.

**Process:**
1. PC sends broadcast frame
2. Switch A receives, floods to all ports
3. Frame reaches Switch B and Switch C
4. Both switches flood back to Switch A
5. Switch A floods again → infinite loop

**Impact:**
- Network saturated (100% utilization)
- All devices overwhelmed
- Network effectively DOWN

**Solution:** **Spanning Tree Protocol (STP)** - disables redundant links to prevent loops (covered in Lesson 16)

---

## Duplex and Speed Settings

### Full-Duplex vs Half-Duplex

| Setting | Half-Duplex | Full-Duplex |
|---|---|---|
| **Communication** | One direction at a time | Both directions simultaneously |
| **Collision Detection** | Yes (CSMA/CD required) | No (no collisions possible) |
| **Bandwidth** | Shared (e.g., 100 Mbps total) | Dedicated each direction (e.g., 100 Mbps in + 100 Mbps out) |
| **Used with** | Hubs (legacy) | Switches (modern) |

**Duplex Mismatch Problem:**

A duplex mismatch occurs when one end is set to full-duplex and the other to half-duplex. This causes:
- Late collisions and FCS errors on the half-duplex side
- Packet loss and very poor performance
- Difficult to diagnose (link still shows "up")

```cisco
! Check interface duplex and speed
Switch# show interfaces Fa0/1 status
Port    Name      Status       Vlan  Duplex  Speed  Type
Fa0/1             connected    1     a-full  a-100  10/100BaseTX

! Manually set speed and duplex (if auto-negotiation fails)
Switch(config)# interface Fa0/1
Switch(config-if)# speed 100
Switch(config-if)# duplex full

! Best practice: Use auto-negotiation when possible
Switch(config-if)# speed auto
Switch(config-if)# duplex auto
```

### Auto-Negotiation (IEEE 802.3u)

- Devices exchange capabilities advertisements
- Highest common speed and duplex selected
- Works well between modern devices
- Can fail between old/new equipment (manual setting recommended)

---

## Switch Monitoring and Diagnostics

### Essential Show Commands

```cisco
! Interface status overview
Switch# show interfaces status
Port    Name     Status       Vlan  Duplex  Speed  Type
Fa0/1            connected    10    a-full  a-100  10/100BaseTX
Fa0/2            connected    10    a-full  a-1000 10/100/1000
Fa0/3            notconnect   20    auto    auto   10/100BaseTX
Gi0/1            connected    trunk a-full  a-1000 10/100/1000

! Interface error counters
Switch# show interfaces Fa0/1 counters errors
Port      Align-Err  FCS-Err  Xmit-Err  Rcv-Err  UnderSize  OutDiscards
Fa0/1     0          0        0         0        0          0

! Interface utilization
Switch# show interfaces Fa0/1
  5 minute input rate 1234000 bits/sec, 985 packets/sec
  5 minute output rate 2345000 bits/sec, 1523 packets/sec

! Spanning Tree status
Switch# show spanning-tree brief

! VLAN information
Switch# show vlan brief
```

### Port Mirroring (SPAN)

Switch Port Analyzer (SPAN) copies traffic from one or more ports to a monitoring port for analysis:

```cisco
! Mirror all traffic from Fa0/1 to Fa0/24 (where analyzer is connected)
Switch(config)# monitor session 1 source interface Fa0/1
Switch(config)# monitor session 1 destination interface Fa0/24

! Mirror entire VLAN traffic
Switch(config)# monitor session 1 source vlan 10
Switch(config)# monitor session 1 destination interface Fa0/24
```

**Use cases for SPAN:**
- Network troubleshooting with Wireshark
- IDS/IPS monitoring
- Compliance recording
- Performance analysis

---

## Summary

1. **Switches forward frames based on destination MAC addresses** using MAC address tables
2. **MAC learning:** Switch learns source MAC addresses automatically
3. **Forward, Filter, Flood:** Three possible switching actions
4. **Store-and-forward:** Checks CRC, most reliable (default)
5. **Cut-through:** Lowest latency, no error checking
6. **Broadcast frames always flood** to all ports in broadcast domain
7. **Switching loops cause broadcast storms** (prevented by STP)
8. **Each switch port = separate collision domain**, full-duplex, no CSMA/CD

---

## Real-World Application

**Scenario:** Network slowness and high switch CPU usage

**Troubleshooting using switching concepts:**

1. **Check MAC address table:**
   - Command (Cisco): `show mac address-table`
   - **Issue:** Table constantly changing (MAC flapping)
   - **Cause:** Loop in network topology
   - **Solution:** Enable STP, identify and remove redundant link

2. **Monitor for broadcast storms:**
   - Use switch monitoring: Check interface utilization
   - **Symptom:** All interfaces near 100% utilization
   - **Cause:** Switching loop causing broadcasts to circulate
   - **Solution:** Disconnect redundant link, verify STP

3. **Check switching method:**
   - High error rate on network
   - Verify switch uses **store-and-forward** (not cut-through)
   - Store-and-forward drops corrupt frames before forwarding

4. **Verify MAC aging time:**
   - Devices moving between wireless APs and wired ports
   - If aging time too long, switch sends to wrong port
   - **Solution:** Reduce aging time to 60-120 seconds

---

## Practice Questions


**Q1.** What information does a switch use to populate its MAC address table?

A) Destination MAC addresses from incoming frames
B) Source MAC addresses from incoming frames
C) IP addresses from incoming packets
D) Port numbers from TCP headers

<details>
<summary>Answer</summary>

**B)** ** B - Switches learn by examining the source MAC address of incoming frames and associating it with the port the frame arrived on.
</details>

**Q2.** When a switch receives a frame with an unknown destination MAC address, what action does it take?

A) Drops the frame
B) Forwards to the default gateway
C) Floods the frame to all ports except the incoming port
D) Broadcasts an ARP request

<details>
<summary>Answer</summary>

**C)** ** C - Unknown unicast frames are flooded to all ports except the port the frame arrived on. This is called "flooding."
</details>

**Q3.** Which switching method provides the lowest latency?

A) Store-and-forward
B) Cut-through
C) Fragment-free
D) Adaptive switching

<details>
<summary>Answer</summary>

**B)** ** B - Cut-through switching begins forwarding as soon as the destination MAC is read, providing the lowest latency. However, it doesn't perform error checking.
</details>

**Q4.** What is the default MAC address aging time on most switches?

A) 30 seconds
B) 60 seconds
C) 300 seconds (5 minutes)
D) 3600 seconds (1 hour)

<details>
<summary>Answer</summary>

**C)** ** C - The default MAC address aging time is typically 300 seconds (5 minutes). If no frames are received from a MAC address within this time, the entry is removed from the table.
</details>

**Q5.** What problem can occur when redundant links exist between switches without Spanning Tree Protocol?

A) MAC address conflicts
B) Broadcast storms
C) VLAN mismatches
D) Duplex mismatch

<details>
<summary>Answer</summary>

**B)** ** B - Redundant links without STP create switching loops, which cause broadcast storms. Broadcast frames circulate indefinitely, consuming all bandwidth.
</details>


## References

- **CompTIA Network+ N10-009 Objective 2.1:** Compare and contrast various devices, their features, and their appropriate placement on the network
- **CompTIA Network+ N10-009 Objective 2.3:** Explain the purposes and use cases for advanced networking devices
- **IEEE 802.1D:** MAC Bridges (Spanning Tree Protocol)
- Cisco CCNA: Switching Concepts
- Professor Messer: Network+ N10-009 - Switching

---

**Next Lesson:** Lesson 14 - VLANs (Virtual Local Area Networks)
