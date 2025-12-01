---
id: lesson-066-datacenter-architecture
title: "Datacenter Network Architecture (Three-Tier, Spine-Leaf)"
chapterId: "chapter-007-cloud-datacenter"
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

**Datacenter network architecture** defines how network devices are organized and interconnected to support scalability, performance, and redundancy. Key architectures include **three-tier (hierarchical)** and **spine-leaf (Clos network)**.

This lesson covers datacenter network design fundamentals—important for the CompTIA Network+ N10-008 exam.

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

## Key Takeaways

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

## References

- **CompTIA Network+ N10-008 Objective 1.7:** Explain basic corporate and datacenter network architecture
- Cisco: Datacenter Design Guide
- Arista: Spine-Leaf Architecture White Paper
- RFC 7348: VXLAN Specification
- Professor Messer: Network+ N10-008 - Datacenter Network Architecture

---

**Next Lesson:** Lesson 67 - Cloud Connectivity Options (Direct Connect, ExpressRoute, VPN)
