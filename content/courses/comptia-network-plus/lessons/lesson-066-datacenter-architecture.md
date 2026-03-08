---
id: lesson-066-datacenter-architecture
title: "Datacenter Network Architecture (Three-Tier, Spine-Leaf)"
chapterId: ch7-cloud-datacenter
order: 66
duration: 22
objectives:
  - Understand datacenter network design principles
  - Describe three-tier datacenter architecture
  - Explain spine-leaf architecture and benefits
  - Compare traditional vs modern datacenter designs
  - Identify datacenter network components and roles
---

# Datacenter Network Architecture (Three-Tier, Spine-Leaf)

## Introduction

**Datacenter network architecture** defines how network devices are organized and interconnected to support scalability, performance, and redundancy. Key architectures include **three-tier (hierarchical)** and **spine-leaf (Clos network)**.

This lesson covers datacenter network design fundamentals—important for the CompTIA Network+ N10-009 exam.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand datacenter network design principles
- Describe three-tier datacenter architecture
- Explain spine-leaf architecture and benefits
- Compare traditional vs modern datacenter designs
- Identify datacenter network components and roles

---

## Datacenter Network Design Principles

### Why Architecture Matters

**Requirements for datacenter networks:**
- **Scalability**: Support thousands of servers
- **High performance**: Low latency, high bandwidth
- **Redundancy**: No single point of failure
- **Predictability**: Consistent performance
- **Simplicity**: Easy to manage and troubleshoot

### Design Considerations

**Traffic patterns:**
- **North-South traffic**: Client-to-datacenter (internet → servers)
- **East-West traffic**: Server-to-server (within datacenter)

**Modern datacenters:**
- More **East-West** traffic (microservices, distributed apps)
- Traditional architecture optimized for North-South

---

## Three-Tier Architecture (Traditional)

### What is Three-Tier Architecture?

**Three-tier** (also called **hierarchical**) divides network into three layers: **Core**, **Aggregation (Distribution)**, and **Access**.

### Three-Tier Diagram

```
                 ┌──────────┐
                 │ Internet │
                 └─────┬────┘
                       │
             ┌─────────▼─────────┐
             │   CORE LAYER      │
             │  (L3 Routing)     │
             │  Core Switches    │
             └─────────┬─────────┘
                   ┌───┴───┐
           ┌───────▼───┐ ┌─▼───────┐
           │AGGREGATION│ │AGGREGATION│
           │  LAYER    │ │  LAYER   │
           │(L2/L3 Agg)│ │(L2/L3 Agg)│
           │Distribution│ │Distribution│
           │ Switches  │ │ Switches  │
           └─────┬─────┘ └─────┬────┘
             ┌───┴───┐     ┌───┴───┐
         ┌───▼──┐┌──▼──┐┌──▼──┐┌──▼──┐
         │ACCESS││ACCESS││ACCESS││ACCESS│
         │LAYER ││LAYER ││LAYER ││LAYER │
         │(ToR) ││(ToR) ││(ToR) ││(ToR) │
         │Switch││Switch││Switch││Switch│
         └──┬───┘└──┬───┘└──┬───┘└──┬───┘
            │       │       │       │
         Servers Servers Servers Servers
```

### Three-Tier Layers

#### 1. Core Layer

**Purpose:**
- High-speed backbone
- Connects aggregation switches
- Routes traffic between distribution layers and to internet

**Characteristics:**
- **Layer 3** routing
- **High capacity**: 40 Gbps, 100 Gbps, 400 Gbps links
- **Redundancy**: Multiple core switches
- **Minimal latency**: Fast packet forwarding
- **No packet filtering**: Simple routing only

**Devices:**
- High-performance core routers/switches

#### 2. Aggregation Layer (Distribution)

**Purpose:**
- Aggregates access layer switches
- Provides policy enforcement (ACLs, QoS)
- Default gateway for servers (VLAN routing)

**Characteristics:**
- **Layer 2/Layer 3**: VLANs and routing
- **Load balancing**: Distribute traffic across multiple uplinks
- **Redundancy**: Dual uplinks to core, dual downlinks from access

**Devices:**
- Aggregation switches (multi-layer switches)

#### 3. Access Layer (Top-of-Rack / ToR)

**Purpose:**
- Connects servers directly
- First hop for servers

**Characteristics:**
- **Layer 2**: Switching only
- **High port density**: 48-port switches
- **ToR (Top-of-Rack)**: One switch per rack
- **Dual uplinks**: Connect to two aggregation switches (redundancy)

**Devices:**
- Access switches (ToR switches)

**Example:** 
```
Rack with 40 servers → ToR Switch (48 ports) → 2 uplinks to Agg switches
```

### Three-Tier Traffic Flow

**Example: Server A → Server B (different racks)**
```
Server A → Access Switch A → Aggregation Switch → 
Core Switch → Aggregation Switch → Access Switch B → Server B
```

**Hops:** 5 hops (variable depending on location)

### Advantages of Three-Tier

✅ **Proven design**: Used for decades
✅ **Clear hierarchy**: Easy to understand
✅ **Scalability**: Can add more access/agg switches
✅ **Separation of concerns**: Each layer has specific role

### Disadvantages of Three-Tier

❌ **Oversubscription**: Limited bandwidth between layers
❌ **Variable latency**: Different hop counts between servers
❌ **Spanning Tree**: Blocks redundant links (inefficient)
❌ **Poor East-West**: Traffic must go up hierarchy and back down
❌ **Scalability limits**: Adding capacity requires forklift upgrades

### Oversubscription Problem

**Example:**
- Access switch: 48 x 10 Gbps ports = 480 Gbps total
- Uplinks: 2 x 40 Gbps = 80 Gbps to aggregation
- **Oversubscription ratio**: 480:80 = **6:1**

If all servers transmit simultaneously, only 1/6 bandwidth available.

### Spanning Tree Protocol (STP) in Three-Tier

The three-tier model relies on **Spanning Tree Protocol** to prevent Layer 2 loops. STP blocks redundant links, meaning purchased bandwidth goes unused.

```
       Agg Switch A ─────── Agg Switch B
           │    ╲               │
           │     ╲ (BLOCKED)    │
           │      ╲             │
       Access 1    Access 2    Access 3
```

**STP impact:**
- Only one active path at a time (50% link utilization)
- Convergence time: 30-50 seconds (classic STP) or 1-6 seconds (RSTP)
- During reconvergence, traffic is black-holed

> **Exam Tip:** Spanning Tree convergence time is a frequently tested concept. Classic STP (802.1D) takes 30-50 seconds to converge after a topology change. RSTP (802.1w) converges in 1-6 seconds. **Spine-leaf avoids STP entirely** by using Layer 3 ECMP.

### Practical Scenario: Three-Tier Failure

**Scenario:** A core switch fails in a three-tier datacenter.

```
Before failure:
  Core A (Active) ←→ Core B (Standby via STP)
      ↕                    ↕
  Agg Switches         Agg Switches

After Core A fails:
  1. STP detects topology change
  2. Blocked links transition to forwarding
  3. Convergence time: 30-50 sec (STP) or 1-6 sec (RSTP)
  4. Traffic forwarded via Core B
```

**Impact:** Applications experience 1-50 seconds of downtime during failover—unacceptable for modern real-time applications.

---

## Spine-Leaf Architecture (Modern)

### What is Spine-Leaf?

**Spine-Leaf** is a two-tier **Clos network** architecture with **spine switches** (core) and **leaf switches** (access), providing **non-blocking**, **predictable performance**.

### Spine-Leaf Diagram

```
        ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
        │ Spine 1│  │ Spine 2│  │ Spine 3│  │ Spine 4│
        └────┬───┘  └───┬────┘  └───┬────┘  └───┬────┘
             │  ╲    ╱  │  ╲    ╱  │  ╲    ╱  │
             │   ╲  ╱   │   ╲  ╱   │   ╲  ╱   │
             │    ╲╱    │    ╲╱    │    ╲╱    │
             │    ╱╲    │    ╱╲    │    ╱╲    │
             │   ╱  ╲   │   ╱  ╲   │   ╱  ╲   │
             │  ╱    ╲  │  ╱    ╲  │  ╱    ╲  │
        ┌────▼───┐┌───▼───┐┌───▼───┐┌───▼───┐
        │ Leaf 1 ││ Leaf 2││ Leaf 3││ Leaf 4│
        └────┬───┘└───┬───┘└───┬───┘└───┬───┘
             │        │        │        │
          Servers  Servers  Servers  Servers
```

### Spine-Leaf Design Rules

1. **Every leaf connects to every spine** (full mesh)
2. **Leaf switches never connect to each other**
3. **Spine switches never connect to each other**
4. **Servers connect only to leaf switches**

### Spine-Leaf Layers

#### Spine Layer

**Purpose:**
- Backbone for leaf switches
- Forwards traffic between leaf switches

**Characteristics:**
- **Layer 3**: IP routing only (no VLANs)
- **High-speed links**: 40 Gbps, 100 Gbps, 400 Gbps per link
- **No oversubscription**: Full bandwidth available
- **Equal Cost Multi-Path (ECMP)**: Load balances across all links

**Devices:**
- Spine switches (high-density, high-speed)

#### Leaf Layer

**Purpose:**
- Connects servers (ToR)
- First and last hop for traffic

**Characteristics:**
- **Layer 2/Layer 3**: VLANs at leaf, routing to spine
- **VXLAN gateway**: Extends VLANs across fabric (overlay)
- **Dual-homed servers**: Servers can connect to two leaves (redundancy)

**Devices:**
- Leaf switches (high port density)

### Traffic Flow in Spine-Leaf

**Example: Server A (Leaf 1) → Server B (Leaf 3)**

```
Server A → Leaf 1 → Spine X → Leaf 3 → Server B
```

**Hops:** 3 hops (always consistent)

**ECMP load balancing:**
- Leaf 1 has 4 paths to Leaf 3 (via Spine 1, 2, 3, 4)
- Traffic hashed across all 4 links (5-tuple: src IP/port, dst IP/port, protocol)

### Advantages of Spine-Leaf

✅ **Predictable latency**: Always 3 hops (leaf → spine → leaf)
✅ **High bandwidth**: Full mesh, no oversubscription
✅ **Scalability**: Add more leaves or spines without disruption
✅ **Simplified design**: Only two layers
✅ **Optimized for East-West**: Efficient server-to-server traffic
✅ **ECMP**: Utilizes all links (no Spanning Tree blocking)
✅ **Fast convergence**: Failure reroutes in milliseconds

### Disadvantages of Spine-Leaf

❌ **Cost**: Requires many high-speed ports
❌ **Complexity**: Requires VXLAN, EVPN, or other overlays
❌ **Cabling**: Full mesh = lots of cables

### Spine-Leaf Scalability

**Adding capacity:**
- **Scale out (horizontal)**: Add more leaf switches
- **Scale up (vertical)**: Add more spine switches

**Example:**
- 4 spines, 20 leaves, each spine-leaf link 100 Gbps
- Each leaf has 4 x 100 Gbps uplinks = 400 Gbps bandwidth

### ECMP (Equal Cost Multi-Path) in Detail

ECMP is the cornerstone of spine-leaf performance. It allows multiple equal-cost paths to be used simultaneously, distributing traffic across all available links.

**How ECMP hashing works:**
```
Packet arrives at Leaf 1 destined for Leaf 3:

  Hash input (5-tuple):
    Source IP:        10.1.1.50
    Destination IP:   10.3.1.25
    Source Port:      49152
    Destination Port: 443
    Protocol:         TCP

  Hash result → selects Spine 2 (out of 4 spines)

  All packets in this FLOW use Spine 2
  Different flows may use Spine 1, 3, or 4
```

**ECMP key characteristics:**
- Uses **per-flow** hashing (not per-packet) to avoid reordering
- All spine links are active simultaneously
- Adding a spine switch automatically increases aggregate bandwidth
- Common hash algorithms: CRC-based, XOR-based

**ECMP bandwidth calculation:**
```
4 spine switches × 100 Gbps per link = 400 Gbps
aggregate bandwidth from each leaf to the fabric

With 8 spine switches:
8 × 100 Gbps = 800 Gbps per leaf (non-blocking)
```

> **Key Insight:** ECMP eliminates the STP problem entirely. In a spine-leaf fabric, **every link is active and forwarding traffic**. There are no blocked ports. This is why spine-leaf achieves near **non-blocking** performance.

### Routing Protocols in Spine-Leaf

Spine-leaf fabrics use **Layer 3 routing** between spine and leaf switches. Common protocols:

**eBGP (External BGP):**
- Each leaf and spine is its own BGP AS (Autonomous System)
- Simple, well-understood protocol
- Used by large cloud providers (e.g., Microsoft Azure)
- Fast convergence with BFD (Bidirectional Forwarding Detection)

**OSPF (Open Shortest Path First):**
- Interior gateway protocol
- Simpler configuration than BGP
- Suitable for smaller fabrics
- All switches in same OSPF area (or multi-area for larger fabrics)

**IS-IS (Intermediate System to Intermediate System):**
- Used by some large-scale deployments
- Similar to OSPF but with different area concepts

```
Typical eBGP spine-leaf configuration:

  Spine 1 (AS 65000)
    ├── Leaf 1 (AS 65001) - eBGP peer
    ├── Leaf 2 (AS 65002) - eBGP peer
    ├── Leaf 3 (AS 65003) - eBGP peer
    └── Leaf 4 (AS 65004) - eBGP peer

  Each leaf-spine pair establishes an eBGP session
  ECMP enabled: maximum-paths 4 (one per spine)
```

### EVPN-VXLAN Fabric

Modern spine-leaf fabrics combine **EVPN (Ethernet VPN)** as the control plane with **VXLAN** as the data plane:

**EVPN provides:**
- MAC address learning via BGP (no flooding)
- ARP suppression (reduces broadcast traffic)
- Multi-tenancy support
- Efficient BUM (Broadcast, Unknown unicast, Multicast) handling

```
EVPN-VXLAN Architecture:

  Control Plane: MP-BGP EVPN
    - Leaf switches exchange MAC/IP info via BGP
    - No need for multicast or flood-and-learn

  Data Plane: VXLAN
    - L2 frames encapsulated in UDP/IP
    - 24-bit VNI provides 16M+ segments
    - VTEP at each leaf switch

  Underlay: IP/ECMP
    - Spine switches route VXLAN-encapsulated traffic
    - Pure L3 routing (no VLAN trunking on spines)
```

> **Exam Tip:** Know that VXLAN uses **UDP port 4789** for encapsulation. The VXLAN header adds 50 bytes of overhead to each frame (outer Ethernet 14 + outer IP 20 + outer UDP 8 + VXLAN 8), which affects MTU sizing. Datacenter networks typically use **jumbo frames (MTU 9216)** to accommodate this overhead.

---

## Three-Tier vs Spine-Leaf Comparison

| Aspect | Three-Tier | Spine-Leaf |
|--------|------------|------------|
| **Layers** | 3 (Core, Agg, Access) | 2 (Spine, Leaf) |
| **Traffic optimization** | North-South | East-West |
| **Latency** | Variable (depends on location) | Predictable (always 3 hops) |
| **Bandwidth** | Oversubscribed | Non-blocking |
| **Spanning Tree** | Yes (blocks links) | No (ECMP) |
| **Scalability** | Limited | High |
| **Complexity** | Simpler | More complex (overlays) |
| **Use case** | Traditional datacenters | Modern datacenters, cloud |

---

## Top-of-Rack (ToR) vs End-of-Row (EoR)

### Top-of-Rack (ToR)

**Design:**
- One switch per rack
- Servers connect to switch in same rack

**Advantages:**
✅ Short cable runs (within rack)
✅ Easy to manage (one switch per rack)
✅ Reduced cabling complexity

**Disadvantages:**
❌ More switches to manage
❌ Higher switch count = higher cost

### End-of-Row (EoR)

**Design:**
- One or two switches at end of row
- Servers from multiple racks connect to EoR switches

**Advantages:**
✅ Fewer switches to manage
✅ Lower switch count

**Disadvantages:**
❌ Longer cable runs (across row)
❌ Cable management complexity

**Modern datacenters favor ToR** due to shorter cables and simpler management.

---

## Overlay Networks (VXLAN)

### Why Overlays?

**Problem:**
- Traditional VLANs limited to 4096 (12-bit VLAN ID)
- Datacenters need more isolation (multi-tenancy)
- Layer 2 across datacenters (VM mobility)

**Solution: VXLAN (Virtual Extensible LAN)**
- Encapsulates Ethernet frames in UDP/IP
- **24-bit VNI (VXLAN Network Identifier)**: 16 million segments
- **Layer 3 underlay**: Spine-leaf uses IP routing
- **Layer 2 overlay**: VMs think they're on same Layer 2 network

### VXLAN in Spine-Leaf

```
   VM1 (VLAN 100)           VM2 (VLAN 100)
      │                         │
   ┌──▼──┐                  ┌──▼──┐
   │Leaf1│                  │Leaf3│
   │VTEP │                  │VTEP │
   └──┬──┘                  └──┬──┘
      │   VXLAN Tunnel (UDP)   │
      └─────────▶IP◀───────────┘
         Spine Layer (L3)
```

**VTEP (VXLAN Tunnel Endpoint):**
- Encapsulates/decapsulates VXLAN frames
- Typically at leaf switches

---

## Datacenter Interconnect (DCI)

### Connecting Multiple Datacenters

**Use cases:**
- **Disaster recovery**: Failover between DCs
- **VM mobility**: Move VMs between DCs
- **Distributed applications**: Apps span multiple DCs

### DCI Technologies

**Dark fiber:**
- Direct fiber connection between DCs
- High bandwidth, low latency
- Expensive (requires fiber rights)

**DWDM (Dense Wavelength Division Multiplexing):**
- Multiple wavelengths over single fiber
- Long distance (100+ km)

**MPLS Layer 3 VPN:**
- Provider network between DCs
- Lower cost than dark fiber

**VXLAN over WAN:**
- Extend Layer 2 across DCs
- Requires low latency (<10ms)

---

## Software-Defined Datacenter (SDDC)

### What is SDDC?

**SDDC** virtualizes all datacenter resources (compute, storage, network), managed by software.

**Components:**
- **Compute virtualization**: VMware ESXi, Hyper-V
- **Storage virtualization**: vSAN, SAN
- **Network virtualization**: NSX, ACI
- **Management**: vCenter, APIC

### Benefits

✅ **Automation**: Provision resources via API
✅ **Agility**: Deploy apps in minutes
✅ **Efficiency**: Better resource utilization

---

## Datacenter Power and Cooling

### Power Usage Effectiveness (PUE)

**PUE** measures datacenter energy efficiency:

```
PUE = Total Facility Power / IT Equipment Power

Example:
  Total power: 10 MW (megawatts)
  IT equipment: 7 MW
  PUE = 10 / 7 = 1.43
```

| PUE Value | Rating | Notes |
|-----------|--------|-------|
| 1.0 | Perfect | All power goes to IT (theoretical) |
| 1.2-1.4 | Excellent | Modern hyperscale datacenters |
| 1.5-1.8 | Average | Typical enterprise datacenter |
| 2.0+ | Poor | Significant cooling/power overhead |

**Cooling methods:**
- **Hot aisle/cold aisle**: Arrange racks so cold air intakes face one aisle, hot exhausts face another
- **Liquid cooling**: Direct liquid cooling to high-density racks
- **Free cooling**: Using outside air when ambient temperature is low enough
- **Containment**: Physical barriers to prevent hot/cold air mixing

```
Hot Aisle / Cold Aisle Layout:

    Cold Aisle          Hot Aisle         Cold Aisle
  ┌───────────┐      ┌───────────┐      ┌───────────┐
  │  ↓ Cool   │      │  ↑ Hot    │      │  ↓ Cool   │
  │  ↓ Air    │      │  ↑ Air    │      │  ↓ Air    │
  │           │      │           │      │           │
  │ Rack Front│      │ Rack Back │      │ Rack Front│
  │ (intake)  │      │ (exhaust) │      │ (intake)  │
  └───────────┘      └───────────┘      └───────────┘
       ↑                   ↑                  ↑
  Raised floor        Ceiling return     Raised floor
  (cold air supply)   (hot air return)   (cold air supply)
```

### Power Redundancy (N+1, 2N)

**Power redundancy tiers:**

| Design | Description | Availability |
|--------|-------------|-------------|
| **N** | Exact capacity needed, no redundancy | ~99.67% |
| **N+1** | One extra component beyond minimum | ~99.74% |
| **2N** | Fully duplicated power path | ~99.98% |
| **2N+1** | Dual path plus one extra | ~99.995% |

**Practical example (2N power):**
```
  Utility Feed A → UPS A → PDU A → Server (PSU 1)
  Utility Feed B → UPS B → PDU B → Server (PSU 2)

  Either feed can fail completely; server stays running
  on the surviving power path.
```

> **Key Insight:** Datacenter tiers (Tier I through Tier IV, defined by the Uptime Institute) correlate with power redundancy. Tier IV datacenters require **2N+1** power and cooling, providing 99.995% uptime (26.3 minutes of downtime per year).

---

## Practical Datacenter Design Scenario

**Scenario:** A company needs to design a new datacenter for 200 servers supporting a microservices application.

**Requirements analysis:**
- Predominantly East-West traffic (microservices communicating)
- Multi-tenant (dev, staging, production environments)
- Need to support VM mobility between racks
- 99.99% availability target

**Recommended design:**
```
Architecture: Spine-Leaf
  - 4 Spine switches (100G ports)
  - 10 Leaf switches (48x 25G server ports + 4x 100G uplinks)
  - eBGP underlay routing
  - EVPN-VXLAN overlay for multi-tenancy

Physical layout:
  - 10 racks, 20 servers per rack
  - ToR deployment (1 leaf per rack)
  - Hot aisle/cold aisle with containment
  - 2N power distribution

Bandwidth per leaf:
  - Server ports: 48 × 25 Gbps = 1,200 Gbps
  - Uplinks: 4 × 100 Gbps = 400 Gbps
  - Oversubscription: 3:1 (acceptable for most workloads)
```

---

## Summary

1. **Three-tier architecture** has Core, Aggregation, and Access layers (traditional, optimized for North-South)
2. **Spine-Leaf architecture** has Spine and Leaf layers (modern, optimized for East-West)
3. **Spine-Leaf** provides **predictable latency** (always 3 hops) and **non-blocking bandwidth**
4. **ECMP (Equal Cost Multi-Path)** load balances traffic across all spine-leaf links
5. **Top-of-Rack (ToR)** places one switch per rack (preferred in modern datacenters)
6. **VXLAN** provides Layer 2 overlay over Layer 3 underlay (solves VLAN limitation)
7. **Oversubscription** is common in three-tier (limited uplink bandwidth)
8. **Spine-Leaf scales horizontally** by adding more spine or leaf switches
9. **North-South traffic** is client-to-datacenter; **East-West traffic** is server-to-server
10. **Modern datacenters** favor spine-leaf due to microservices and distributed applications

---

## Practice Questions

**Q1.** Which datacenter network architecture provides predictable latency because traffic always traverses exactly three hops?

A) Three-tier (Core/Distribution/Access)
B) Hub-and-spoke
C) Spine-leaf
D) Ring topology

<details>
<summary>Answer</summary>

**C)** In a spine-leaf architecture, traffic between any two leaf switches always traverses exactly three hops: source leaf → spine → destination leaf. This provides consistent, predictable latency.
</details>

**Q2.** What type of traffic flow is MOST common in modern datacenters running microservices and distributed applications?

A) North-South (client to datacenter)
B) East-West (server to server)
C) Upstream only
D) Downstream only

<details>
<summary>Answer</summary>

**B)** Modern datacenters with microservices and distributed applications generate predominantly East-West traffic (server-to-server communication within the datacenter), which spine-leaf architecture is optimized to handle.
</details>

**Q3.** In a Top-of-Rack (ToR) deployment, where is the network switch placed?

A) In a centralized wiring closet
B) At the top of each server rack
C) In the core layer
D) At the network edge

<details>
<summary>Answer</summary>

**B)** In a ToR deployment, a network switch is placed at the top of each server rack. Servers in the rack connect to this local switch with short cables, and the ToR switch uplinks to the distribution or spine layer.
</details>

**Q4.** Which protocol distributes traffic evenly across all available spine-leaf links?

A) STP (Spanning Tree Protocol)
B) ECMP (Equal Cost Multi-Path)
C) OSPF
D) LACP

<details>
<summary>Answer</summary>

**B)** ECMP (Equal Cost Multi-Path) load balances traffic across all equal-cost paths between leaf and spine switches. Unlike STP which blocks redundant paths, ECMP uses all available links simultaneously.
</details>

**Q5.** What problem does VXLAN solve in a datacenter environment?

A) Replacing IPv4 with IPv6
B) Overcoming the 4,094 VLAN ID limitation
C) Encrypting all datacenter traffic
D) Eliminating the need for switches

<details>
<summary>Answer</summary>

**B)** VXLAN (Virtual Extensible LAN) extends Layer 2 networks over a Layer 3 underlay and supports up to 16 million segment IDs (VNIs), solving the 4,094 VLAN ID limitation of traditional VLANs.
</details>

**Q6.** Which traditional datacenter architecture uses Core, Distribution, and Access layers?

A) Spine-leaf
B) Three-tier
C) Collapsed core
D) Flat network

<details>
<summary>Answer</summary>

**B)** The three-tier (hierarchical) architecture uses Core (high-speed backbone), Distribution (routing/policy), and Access (server connections) layers. It was designed primarily for North-South traffic patterns.
</details>

**Q7.** What is oversubscription in a datacenter network?

A) Having too many administrators
B) The ratio of total access bandwidth to available uplink bandwidth
C) Using more IP addresses than available
D) Exceeding the maximum VLAN count

<details>
<summary>Answer</summary>

**B)** Oversubscription is the ratio of total bandwidth at the access layer to the available uplink bandwidth. For example, a 4:1 oversubscription means the uplink can handle only 25% of the total access bandwidth simultaneously.
</details>

**Q8.** How does a spine-leaf architecture scale to accommodate additional servers?

A) By adding more core routers
B) By adding more leaf switches and connecting them to every spine switch
C) By increasing spanning tree priority
D) By replacing existing switches with faster ones

<details>
<summary>Answer</summary>

**B)** Spine-leaf scales horizontally by adding new leaf switches (for more server ports) and connecting them to every spine switch. Additional spine switches can be added for more bandwidth.
</details>

**Q9.** Which protocol is commonly used in spine-leaf fabrics to provide Layer 2 overlay connectivity across a Layer 3 underlay network?

A) Spanning Tree Protocol (STP)
B) VXLAN (Virtual Extensible LAN)
C) HDLC
D) PPP

<details>
<summary>Answer</summary>

**B)** VXLAN encapsulates Layer 2 Ethernet frames inside UDP/IP packets, allowing Layer 2 segments to span across a Layer 3 routed spine-leaf fabric. STP is used in traditional three-tier designs but is avoided in spine-leaf. HDLC and PPP are WAN encapsulation protocols, not datacenter overlay technologies.
</details>

**Q10.** In a traditional three-tier datacenter architecture, what is the PRIMARY role of the aggregation (distribution) layer?

A) Directly connecting servers to the network
B) Providing the high-speed backbone between buildings
C) Aggregating access layer switches and enforcing policies such as ACLs and QoS
D) Providing internet connectivity to external users

<details>
<summary>Answer</summary>

**C)** The aggregation (distribution) layer sits between the core and access layers, aggregating traffic from access switches and enforcing network policies including ACLs, QoS, and VLAN routing. The access layer connects servers directly, and the core layer provides the high-speed backbone.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 1.7:** Explain basic corporate and datacenter network architecture
- Cisco: Datacenter Design Guide
- Arista: Spine-Leaf Architecture White Paper
- RFC 7348: VXLAN Specification
- Professor Messer: Network+ N10-009 - Datacenter Network Architecture

---

**Next Lesson:** Lesson 67 - Cloud Connectivity Options (Direct Connect, ExpressRoute, VPN)
