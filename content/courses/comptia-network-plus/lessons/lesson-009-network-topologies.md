---
id: lesson-009-network-topologies
title: Network Topologies
chapterId: ch1-networking-fundamentals
order: 9
duration: 70
objectives:
  - Understand physical vs. logical network topologies
  - Identify and describe common network topologies
  - Recognize advantages and disadvantages of each topology
  - Understand topology selection criteria
  - Apply topology concepts to real-world scenarios
---

# Lesson 9: Network Topologies

## Learning Objectives
- Understand physical vs. logical network topologies
- Identify and describe common network topologies
- Recognize advantages and disadvantages of each topology
- Understand topology selection criteria
- Apply topology concepts to real-world scenarios

## Introduction

A **network topology** describes how network devices are arranged and how data flows between them. Understanding topologies is essential for network design, troubleshooting, and optimization.

**Two Types of Topologies:**
- **Physical topology:** Actual physical layout of cables and devices
- **Logical topology:** How data flows through the network

These can differ - for example, a network may be physically wired in a star but logically function as a bus.

---

## Physical vs. Logical Topologies

### Physical Topology

**Definition:** The actual physical arrangement of cables, devices, and connections.

**What it shows:**
- Cable routes
- Device locations
- Physical connections
- Distance between devices

**Example:** All devices connected to a central switch with individual cables (star topology physically).

### Logical Topology

**Definition:** The path data takes through the network, regardless of physical layout.

**What it shows:**
- Data flow paths
- Communication patterns
- Broadcast domains
- Network segments

**Example:** Devices may be physically connected in a star to a hub, but logically operate as a bus (all devices share bandwidth).

### Why the Distinction Matters

**Ethernet Example:**
- **Physical:** Star topology (all devices connect to switch)
- **Logical:** Star topology (switch forwards to specific devices)

**Token Ring Example (legacy):**
- **Physical:** Star topology (devices connect to MAU)
- **Logical:** Ring topology (token passes in circular order)

---

## Bus Topology

### Description

All devices connect to a single central cable (the bus or backbone). Data travels in both directions along the bus.

```
Device -- Device -- Device -- Device -- Device
    |        |        |        |        |
    +--------+--------+--------+--------+
              Single Bus Cable
```

### Characteristics

**Cable:** Single coaxial cable (10BASE2, 10BASE5)  
**Termination:** Terminators required at both ends  
**Data flow:** Broadcasts to all devices  
**Max devices:** Limited by cable specifications  

### How It Works

1. Device sends data onto the bus
2. Data travels in both directions
3. All devices receive the data
4. Only intended recipient processes it
5. Others ignore it

**Collision Detection:** CSMA/CD (Carrier Sense Multiple Access with Collision Detection)
- Listen before transmitting
- If collision occurs, wait random time and retry

### Advantages

✅ **Simple and inexpensive:** Minimal cabling  
✅ **Easy to implement:** Small networks  
✅ **No additional hardware:** No hubs or switches needed  

### Disadvantages

❌ **Single point of failure:** Cable break disables entire network  
❌ **Difficult to troubleshoot:** Hard to isolate problems  
❌ **Limited scalability:** Performance degrades with more devices  
❌ **Collision domain:** All devices share bandwidth  
❌ **Security issues:** All devices see all traffic  
❌ **Difficult to expand:** Adding devices requires network downtime  

### Use Cases

**Modern use:** Virtually obsolete (legacy 10BASE2/10BASE5 Ethernet)  
**Historical use:** Early Ethernet networks  

---

## Star Topology

### Description

All devices connect to a central device (hub or switch). Most common topology today.

```
        Device
          |
Device -- HUB/SWITCH -- Device
          |
        Device
```

### Characteristics

**Central device:** Hub, switch, or router  
**Cables:** Individual cable to each device  
**Data flow:** Through central device  
**Typical:** Modern Ethernet (802.3)  

### How It Works

**With Hub (Legacy):**
1. Device sends data to hub
2. Hub broadcasts to all ports (like bus)
3. Creates single collision domain
4. Half-duplex operation

**With Switch (Modern):**
1. Device sends data to switch
2. Switch forwards only to destination port
3. Each port is separate collision domain
4. Full-duplex operation possible
5. Much more efficient

### Advantages

✅ **Easy to install and manage:** Straightforward cabling  
✅ **Easy to troubleshoot:** Isolate failed device/cable  
✅ **No network disruption:** Add/remove devices without downtime  
✅ **Fault tolerance:** One cable failure affects only one device  
✅ **Scalable:** Easy to expand (add switch ports)  
✅ **Better performance:** With switches (dedicated bandwidth per port)  

### Disadvantages

❌ **Single point of failure:** Central device failure disables network  
❌ **More expensive:** Requires switch/hub  
❌ **More cable:** Each device needs separate cable  
❌ **Central device capacity:** Limited by port count  

### Variants

**Extended Star (Hierarchical Star):**
- Multiple switches connected in hierarchy
- Core, distribution, and access layers
- Common in enterprise networks

```
        Core Switch
          /    \
    Switch-1  Switch-2
      / \       / \
    PC  PC    PC  PC
```

### Use Cases

✅ **Modern LANs:** Virtually all Ethernet networks  
✅ **Enterprise networks:** With hierarchical design  
✅ **Home networks:** Consumer routers/switches  
✅ **Office networks:** Workstations to switches  

---

## Ring Topology

### Description

Each device connects to exactly two other devices, forming a circular pathway for data.

```
    Device -- Device
      |          |
    Device      Device
      |          |
    Device -- Device
```

### Characteristics

**Data flow:** Circular (unidirectional or bidirectional)  
**Token passing:** Often uses token for transmission rights  
**Redundancy:** Can be single ring or dual ring  

### How It Works

**Token Ring (IEEE 802.5):**
1. Token circulates around ring
2. Device wanting to transmit waits for token
3. Device captures token, attaches data
4. Data travels around ring to destination
5. Destination copies data, marks as received
6. Original sender removes data, releases token

**Dual Ring:**
- Two counter-rotating rings
- If one ring fails, use other ring
- Self-healing capability

### Advantages

✅ **No collisions:** Token passing ensures orderly transmission  
✅ **Equal access:** Fair access for all devices  
✅ **Predictable performance:** Known maximum delay  
✅ **Self-healing:** With dual ring (FDDI, SONET)  

### Disadvantages

❌ **Failure affects network:** Single ring disrupted by one failure  
❌ **Difficult to troubleshoot:** Requires checking entire ring  
❌ **Difficult to reconfigure:** Adding/removing devices disruptive  
❌ **Slower than switched star:** For small networks  

### Technologies Using Ring

**Token Ring (802.5):**
- Legacy LAN technology
- Obsolete, replaced by Ethernet

**FDDI (Fiber Distributed Data Interface):**
- 100 Mbps over fiber
- Dual counter-rotating rings
- Used in backbone networks
- Mostly obsolete

**SONET/SDH:**
- Telecommunications networks
- Ring topology for redundancy
- Still in use for WAN backbones

### Use Cases

**Modern use:** Rare in LANs, some WAN applications  
**Legacy:** Token Ring networks  
**Specialized:** SONET rings in telecom  

---

## Mesh Topology

### Description

Multiple connections between devices, providing redundancy and fault tolerance.

### Full Mesh

Every device connects directly to every other device.

```
Device -------- Device
  |  \      /  |
  |   \    /   |
  |    \  /    |
  |     \/     |
  |     /\     |
  |    /  \    |
  |   /    \   |
  |  /      \  |
Device -------- Device
```

**Formula:** Connections = n(n-1)/2  
- 4 devices = 6 connections
- 10 devices = 45 connections
- 100 devices = 4,950 connections

### Partial Mesh

Some devices have multiple connections, but not all possible connections exist.

```
Device -------- Device
  |              |
  |              |
Device        Device
  |              |
  +---Device----+
```

### Characteristics

**Full mesh:**
- Maximum redundancy
- Maximum cost
- Complex cabling

**Partial mesh:**
- Balanced redundancy and cost
- Strategic connections
- More practical

### How It Works

1. Multiple paths between devices
2. If one path fails, use alternate path
3. Routing protocols determine best path
4. Load balancing possible across paths

### Advantages

✅ **High redundancy:** Multiple paths if one fails  
✅ **Fault tolerance:** Network remains functional with failures  
✅ **No single point of failure:** Multiple paths available  
✅ **Load balancing:** Distribute traffic across links  
✅ **High bandwidth:** Dedicated links between devices  

### Disadvantages

❌ **Very expensive:** Many cables/connections required  
❌ **Complex installation:** Difficult to cable and configure  
❌ **Complex management:** Routing and troubleshooting difficult  
❌ **Not scalable:** Connections grow exponentially (full mesh)  

### Mesh in Modern Networks

**Physical mesh:** Rare (too expensive for full mesh)  

**Logical mesh:** Common in:
- **Internet backbone:** ISPs interconnected
- **Cloud networks:** Multiple paths for redundancy
- **SD-WAN:** Multiple WAN connections
- **Wireless mesh:** Wi-Fi mesh networks

### Use Cases

✅ **WAN backbone:** ISP and enterprise WANs  
✅ **Data center interconnects:** Between facilities  
✅ **Critical systems:** High-availability requirements  
✅ **Wireless mesh:** Wi-Fi mesh networks (Google Wifi, Eero)  
❌ **LAN:** Too expensive for most LANs  

---

## Hybrid Topologies

### Description

Combination of two or more basic topologies.

### Common Hybrid Topologies

**Star-Bus (Tree Topology):**
```
          Root Switch
          /    |    \
     Switch  Switch  Switch
      /|\     /|\     /|\
    PC PC PC PC PC PC PC PC
```
- Star at access layer
- Bus or star at distribution layer
- Most common enterprise design

**Star-Ring:**
- Devices in star to MAU
- MAU creates logical ring
- Token Ring networks

**Mesh-Star:**
- Core network in mesh
- Access layer in star
- Enterprise WANs with multiple sites

### Advantages

✅ **Flexibility:** Combine benefits of multiple topologies  
✅ **Scalability:** Easy to expand  
✅ **Reliability:** Redundancy where needed  
✅ **Cost-effective:** Redundancy only where necessary  

### Disadvantages

❌ **Complex design:** Requires careful planning  
❌ **Difficult to manage:** Multiple topology types  
❌ **Troubleshooting complexity:** More variables to consider  

### Use Cases

✅ **Enterprise networks:** Most large organizations  
✅ **Campus networks:** Multiple buildings  
✅ **Data centers:** Hierarchical design  

---

## Point-to-Point Topology

### Description

Direct connection between exactly two devices.

```
Device ----------- Device
```

### Characteristics

**Dedicated link:** Only two devices  
**Full bandwidth:** No sharing  
**Simple:** Minimal configuration  

### Examples

- Serial connection between routers
- Fiber link between buildings
- Direct cable between two computers
- Leased line (T1, E1)
- Point-to-point wireless link

### Advantages

✅ **Simple:** Easy to configure  
✅ **Full bandwidth:** No sharing  
✅ **Secure:** Only two devices  
✅ **Low latency:** Direct path  

### Disadvantages

❌ **Limited:** Only two devices  
❌ **No redundancy:** Single path  
❌ **Cost per device:** Expensive to connect many devices  

### Protocols

- PPP (Point-to-Point Protocol)
- HDLC (High-Level Data Link Control)
- Frame Relay (legacy)

### Use Cases

✅ **WAN connections:** Router to router  
✅ **Building interconnects:** Fiber between buildings  
✅ **Dedicated circuits:** Leased lines  
✅ **Wireless bridges:** Point-to-point wireless  

---

## Point-to-Multipoint Topology

### Description

One central device connects to multiple remote devices.

```
        Central Device
        /    |    \
       /     |     \
    Device Device Device
```

### Characteristics

**Hub-and-spoke:** Central site to multiple remote sites  
**Shared medium:** All remote sites share central link  
**One-to-many:** Communication from central to many  

### Examples

- Wireless access point to clients
- Satellite communication
- Cellular tower to phones
- Cable TV distribution

### Advantages

✅ **Cost-effective:** One central connection  
✅ **Centralized control:** Managed from one location  
✅ **Good for distribution:** Content delivery  

### Disadvantages

❌ **Single point of failure:** Central device  
❌ **Shared bandwidth:** All remotes share central link  
❌ **No direct communication:** Remote-to-remote requires central device  

### Use Cases

✅ **Wireless networks:** AP to clients  
✅ **Branch offices:** Hub-and-spoke WAN  
✅ **Broadcast services:** Radio, TV, satellite  

---

## Topology Comparison

| Topology | Fault Tolerance | Cost | Scalability | Performance | Use Case |
|----------|----------------|------|-------------|-------------|----------|
| **Bus** | Low | Low | Poor | Poor | Obsolete |
| **Star** | Medium | Medium | Good | Good | Modern LANs |
| **Ring** | Medium (Low for single, High for dual) | Medium | Medium | Good | Legacy/WAN |
| **Mesh** | Very High | Very High | Poor (full) | Excellent | WAN backbone |
| **Hybrid** | High | High | Excellent | Excellent | Enterprise |
| **Point-to-Point** | Low | Low | Poor | Excellent | WAN links |
| **Point-to-Multipoint** | Low | Low | Good | Medium | Wireless |

---

## Topology Selection Criteria

### Factors to Consider

**1. Cost:**
- Equipment (switches, routers, access points)
- Cabling (copper, fiber)
- Installation labor
- Ongoing maintenance

**2. Scalability:**
- Easy to add devices?
- Growth capacity
- Future expansion plans

**3. Reliability:**
- Fault tolerance requirements
- Acceptable downtime
- Redundancy needs

**4. Performance:**
- Bandwidth requirements
- Latency sensitivity
- Number of users

**5. Geographic Layout:**
- Building layout
- Distance between devices
- Cable distance limitations

**6. Security:**
- Data sensitivity
- Isolation requirements
- Traffic visibility

### Common Designs by Organization Size

**Small Office (1-20 users):**
- Simple star topology
- Single switch
- Minimal redundancy

**Medium Business (20-200 users):**
- Hierarchical star
- Multiple access switches
- Single or dual core switches
- Some redundancy

**Enterprise (200+ users):**
- Hybrid topology (mesh-star)
- Three-tier hierarchy (core, distribution, access)
- Full redundancy
- Multiple paths

---

## Modern Network Design Principles

### Three-Tier Hierarchical Design

**Core Layer:**
- High-speed backbone
- Mesh or partial mesh
- No access devices
- Focus: Speed and reliability

**Distribution Layer:**
- Aggregates access switches
- Routing between VLANs
- Policy enforcement
- Star to core, star to access

**Access Layer:**
- Connect end devices
- Star topology
- Port security
- VLANs

```
         [Core Switches]        ← Mesh
            /    \
           /      \
    [Dist Switch][Dist Switch]  ← Star up, Star down
       /   \        /   \
      /     \      /     \
   [Access Switches]           ← Star to endpoints
      |  |  |
    [End Devices]
```

### Spine-Leaf Architecture (Data Centers)

**Modern data center topology:**

```
    [Spine]  [Spine]  [Spine]
      / \      / \      / \
     /   \    /   \    /   \
[Leaf] [Leaf] [Leaf] [Leaf]
  |      |      |      |
[Servers in racks]
```

**Characteristics:**
- Every leaf connects to every spine
- Predictable latency
- High bandwidth
- East-west traffic optimization

---

## Wireless Topologies

### Infrastructure Mode

**Star topology:**
- Access Point (AP) is center
- All clients connect to AP
- AP connects to wired network

### Ad Hoc Mode

**Peer-to-peer:**
- Devices connect directly
- No AP required
- Limited range and scalability

### Mesh Topology

**Wireless mesh network:**
- Multiple APs interconnected
- Self-healing
- Extended coverage
- Examples: Google Wifi, Eero, Orbi

---

## Troubleshooting by Topology

### Bus
- Check termination
- Test cable segments
- Look for breaks or shorts

### Star
- Check central device (switch)
- Test individual cables
- Check port status
- Verify link lights

### Ring
- Identify break in ring
- Check all devices in sequence
- Use beaconing (Token Ring)

### Mesh
- Identify failed paths
- Check routing tables
- Verify alternate paths working
- Monitor link states

---

## Summary

Network topologies define how devices connect and communicate:

**Physical Topologies:**
- **Bus:** Linear cable, obsolete
- **Star:** Central device, most common
- **Ring:** Circular, mostly legacy
- **Mesh:** Multiple connections, high redundancy
- **Hybrid:** Combination of topologies

**Key Concepts:**
- Physical vs. logical topologies can differ
- Star is most common for modern LANs
- Mesh provides redundancy for critical links
- Hybrid topologies combine benefits of multiple types
- Topology selection depends on cost, scalability, and reliability needs

**Modern Networks:**
- Hierarchical star (three-tier)
- Spine-leaf (data centers)
- Wireless mesh (home/office)

**Remember:** Understanding topologies helps with network design, troubleshooting, and understanding how data flows through your network.

---

## Practice Questions

**Q1.** Which network topology connects all devices to a single central device such as a switch?

A) Bus
B) Star
C) Ring
D) Mesh

<details>
<summary>Answer</summary>

**B)** A star topology connects all devices to a single central device (hub or switch). This is the most common topology in modern LANs. One cable failure only affects a single device, making troubleshooting easy, though the central device is a single point of failure.
</details>

**Q2.** A company requires maximum redundancy for its critical network links between data centers. Which topology provides the highest level of fault tolerance?

A) Bus
B) Star
C) Full mesh
D) Ring

<details>
<summary>Answer</summary>

**C)** A full mesh topology provides the highest redundancy because every device is connected to every other device. If any single link fails, traffic can be rerouted through alternative paths. The formula for connections is n(n-1)/2. While expensive, it eliminates single points of failure for critical links.
</details>

**Q3.** In a bus topology, what happens if the main cable (backbone) is severed?

A) Only the devices on one side of the break lose connectivity
B) The entire network goes down
C) The network automatically reroutes traffic
D) Only the two devices nearest the break are affected

<details>
<summary>Answer</summary>

**B)** In a bus topology, the single cable is the backbone for the entire network. If the cable is severed, the unterminated ends cause signal reflections, and the entire network goes down. This single point of failure is one of the major disadvantages of bus topology and a key reason it is obsolete.
</details>

**Q4.** What is the difference between a physical topology and a logical topology?

A) Physical topology describes data flow; logical topology describes cable layout
B) Physical topology describes the actual cable layout; logical topology describes how data flows
C) They are the same thing
D) Physical topology is for WANs; logical topology is for LANs

<details>
<summary>Answer</summary>

**B)** Physical topology describes the actual physical arrangement of cables and devices, while logical topology describes the path data takes through the network. These can differ — for example, a Token Ring network may be physically wired as a star (to a MAU) but logically operates as a ring.
</details>

**Q5.** A network uses a hierarchical design with a core switch connecting to distribution switches, which in turn connect to access switches. What type of topology is this?

A) Bus
B) Ring
C) Extended star (hierarchical star)
D) Full mesh

<details>
<summary>Answer</summary>

**C)** An extended star (hierarchical star) topology is a multi-tier star design commonly used in enterprise networks. It has core, distribution, and access layers, with each layer using a star topology. This design provides scalability, ease of management, and organized network segmentation.
</details>

**Q6.** Which topology requires terminators at both ends of the cable to prevent signal reflections?

A) Star
B) Ring
C) Bus
D) Mesh

<details>
<summary>Answer</summary>

**C)** Bus topology requires terminators at both ends of the central cable. Without terminators, electrical signals would bounce back along the cable (reflection), causing interference and network errors. Star, ring, and mesh topologies do not use terminators because they don't have open cable ends.
</details>

**Q7.** A data center architect is designing a network that requires predictable latency and easy scalability. Which modern topology design is best suited for this?

A) Bus topology
B) Ring topology
C) Spine-leaf topology
D) Token Ring topology

<details>
<summary>Answer</summary>

**C)** Spine-leaf topology is the modern standard for data center networks. Every leaf switch connects to every spine switch, providing predictable latency (traffic always crosses the same number of hops), easy scalability (add more leafs or spines), and high bandwidth through multiple parallel paths. Bus and Token Ring are obsolete.
</details>

**Q8.** In a ring topology, how does data travel between devices?

A) Data is broadcast to all devices simultaneously
B) Data travels in one direction (or both in dual ring) around the ring
C) Data is sent only to the destination device via the central switch
D) Data travels along a single backbone cable

<details>
<summary>Answer</summary>

**B)** In a ring topology, data travels in one direction around the ring, passing through each device until it reaches the destination. In a dual-ring (FDDI), data can travel in both directions for redundancy. If one ring fails, the other can carry traffic. This is different from a bus (backbone) or star (central device) approach.
</details>

**Q9.** A partial mesh network has 6 devices, but not every device is connected to every other device. What distinguishes a partial mesh from a full mesh?

A) Partial mesh uses hubs instead of switches
B) In a partial mesh, only some devices have redundant connections, not all
C) Partial mesh is a type of bus topology
D) Partial mesh does not support routing

<details>
<summary>Answer</summary>

**B)** In a partial mesh topology, only some devices (typically the most critical ones) have redundant connections to other devices. A full mesh connects every device to every other device. Partial mesh provides a balance between redundancy and cost, as full mesh becomes expensive with many devices.
</details>

**Q10.** Which topology is most commonly used in modern Ethernet LANs?

A) Bus
B) Ring
C) Star
D) Full mesh

<details>
<summary>Answer</summary>

**C)** Star topology is the most common topology in modern Ethernet LANs. Devices connect individually to a central switch, providing dedicated bandwidth per port, easy troubleshooting, and simple expansion. Bus topology is obsolete, ring is mostly legacy, and full mesh is typically reserved for WAN links or critical connections due to cost.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 1.2**: Network topologies and types
- **IEEE 802.3**: Ethernet standards
- **Cisco CCNA**: Network design principles
- **Professor Messer**: N10-009 Network+ Course