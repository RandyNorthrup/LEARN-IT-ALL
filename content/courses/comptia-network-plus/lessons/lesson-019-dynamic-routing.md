---
id: dynamic-routing
title: Dynamic Routing Protocols (RIP, OSPF, EIGRP)
chapterId: ch2-network-implementations
order: 19
duration: 90
objectives:
  - Understand how dynamic routing protocols operate
  - Differentiate between distance vector, link-state, and hybrid protocols
  - Explain RIP operation, configuration, and limitations
  - Understand OSPF concepts including areas, LSAs, and SPF algorithm
  - Explain EIGRP operation and DUAL algorithm
  - Compare routing protocol characteristics and select appropriate protocol
  - Configure and verify basic dynamic routing
---

# Lesson 18: Dynamic Routing Protocols (RIP, OSPF, EIGRP)

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand how dynamic routing protocols operate
- Differentiate between distance vector, link-state, and hybrid protocols
- Explain RIP operation, configuration, and limitations
- Understand OSPF concepts including areas, LSAs, and SPF algorithm
- Explain EIGRP operation and DUAL algorithm
- Compare routing protocol characteristics and select appropriate protocol
- Configure and verify basic dynamic routing

## Introduction

While **static routes** require manual configuration and don't adapt to network changes, **dynamic routing protocols** automatically discover routes, share routing information with neighbors, and adapt to topology changes. Dynamic routing protocols are essential for large, complex networks where manual configuration would be impractical.

**Dynamic routing protocols** perform several functions:
- **Discover remote networks** automatically
- **Maintain routing information** and update when topology changes
- **Choose best paths** using metrics
- **Find alternative paths** when primary paths fail

This lesson covers three major routing protocols commonly encountered in enterprise networks: RIP (Routing Information Protocol), OSPF (Open Shortest Path First), and EIGRP (Enhanced Interior Gateway Routing Protocol).

---

## Routing Protocol Classifications

### Interior vs. Exterior Gateway Protocols

**Interior Gateway Protocols (IGPs)**
- Route within a single autonomous system (AS)
- Examples: RIP, OSPF, EIGRP, IS-IS
- Used inside organizations
- Faster convergence, simpler configuration

**Exterior Gateway Protocols (EGPs)**
- Route between different autonomous systems
- Example: BGP (Border Gateway Protocol)
- Used on the Internet between ISPs
- Complex policy-based routing

**Autonomous System (AS):**
- Collection of networks under single administrative control
- Identified by AS Number (ASN)
- Example: Company network = one AS, ISP network = different AS

### Distance Vector vs. Link-State vs. Hybrid

**Distance Vector Protocols**

**Characteristics:**
- Know distance (metric) and direction (vector) to destinations
- Route by "rumor" - rely on neighbor's information
- Send complete routing tables to neighbors periodically
- Slow convergence (may take minutes)
- Prone to routing loops without countermeasures

**How They Work:**
- Router learns routes from directly connected neighbors
- Each router tells neighbors: "I can reach network X with cost Y"
- Neighbors add their link cost and advertise to their neighbors
- Information propagates hop-by-hop through network

**Analogy:**
Like asking for directions to a city:
- "How far to New York?"
- Neighbor: "I don't know exactly, but Boston is 100 miles away and they can reach it in 200 miles"
- You calculate: 100 + 200 = 300 miles total

**Examples:** RIP, IGRP (legacy)

**Link-State Protocols**

**Characteristics:**
- Know complete network topology (like having a map)
- Each router builds identical topology database
- Calculate best paths using Dijkstra's SPF algorithm
- Send only topology changes (not full tables)
- Fast convergence (seconds)
- More CPU/memory intensive

**How They Work:**
- Each router discovers neighbors (adjacencies)
- Each router floods information about directly connected links
- All routers build identical topology database
- Each router independently calculates best paths to all destinations
- Triggered updates when topology changes

**Analogy:**
Like having a complete road map:
- Know all roads, intersections, and distances
- Calculate shortest path yourself using map
- If road closes, recalculate immediately

**Examples:** OSPF, IS-IS

**Hybrid Protocols**

**Characteristics:**
- Combine best features of distance vector and link-state
- Maintain topology information like link-state
- Update neighbors like distance vector
- Very fast convergence
- Efficient updates

**Example:** EIGRP (Cisco proprietary)

### Routing Protocol Comparison

| Feature | RIP | OSPF | EIGRP |
|---------|-----|------|-------|
| **Type** | Distance Vector | Link-State | Hybrid/Advanced Distance Vector |
| **Standard** | RFC 2453 (RIPv2) | RFC 2328 (OSPFv2) | Cisco Proprietary |
| **Algorithm** | Bellman-Ford | Dijkstra SPF | DUAL |
| **Metric** | Hop Count | Cost (bandwidth) | Bandwidth + Delay |
| **Max Hops** | 15 (16 = unreachable) | Unlimited | 255 (default 100) |
| **Convergence** | Slow (minutes) | Fast (seconds) | Very Fast (sub-second) |
| **Scalability** | Small networks | Large networks | Large networks |
| **Administrative Distance** | 120 | 110 | 90 (internal) |
| **Updates** | Periodic (30 sec) | Triggered | Triggered |
| **Load Balancing** | Equal-cost (16 paths) | Equal-cost (4 paths default) | Equal/unequal-cost (4 paths default) |
| **Hierarchical Design** | No | Yes (areas) | Yes (AS) |
| **Compatibility** | All vendors | All vendors | Cisco only |

---

## RIP (Routing Information Protocol)

### RIP Overview

**RIP** is one of the oldest routing protocols, simple to configure but limited in capability. It's a distance vector protocol that uses hop count as its metric.

**RIP Versions:**
- **RIPv1** (RFC 1058, 1988): Classful, no subnet masks, broadcast updates
- **RIPv2** (RFC 2453, 1998): Classless (CIDR), includes subnet masks, multicast updates, authentication
- **RIPng** (RFC 2080): RIP for IPv6

**Key Characteristics:**
- Maximum hop count: 15 (16 = unreachable/infinity)
- Updates every 30 seconds (full routing table)
- Uses UDP port 520
- Metric: Hop count only (all links = 1 hop)
- Administrative Distance: 120

### RIP Operation

**1. Route Advertisement**
- Every 30 seconds, router sends entire routing table to neighbors
- RIPv1: Broadcast (255.255.255.255)
- RIPv2: Multicast (224.0.0.9)

**2. Route Learning**
- Receive updates from neighbors
- Add routes to routing table if:
  - New network discovered, OR
  - Better metric (fewer hops), OR
  - Same metric but update from current next-hop (refresh)

**3. Route Aging (Timers)**
- **Update Timer**: 30 seconds (send routing updates)
- **Invalid Timer**: 180 seconds (mark route invalid if no updates)
- **Holddown Timer**: 180 seconds (wait before accepting new route to failed network)
- **Flush Timer**: 240 seconds (remove invalid route from table)

### RIP Loop Prevention

Distance vector protocols are susceptible to routing loops. RIP uses several mechanisms:

**1. Maximum Hop Count**
- 15 hops maximum
- 16 = infinity (unreachable)
- Limits network size, but prevents infinite loops

**2. Split Horizon**
- Don't advertise routes back out the interface they were learned from
- Example: If learned route to 10.0.0.0/24 from RouterA, don't advertise it back to RouterA

**3. Route Poisoning**
- When network fails, advertise it with metric of 16 (unreachable)
- Quickly informs all routers of failure

**4. Poison Reverse**
- When receiving poisoned route, send poison back to confirm
- Overrides split horizon

**5. Holddown Timer**
- After route fails, wait before accepting new information about that route
- Prevents temporary loops during convergence

**Example Scenario:**
```
Network: R1 ---- R2 ---- R3 ---- Network A (10.0.0.0/24)

Normal Operation:
R3 advertises 10.0.0.0/24, 1 hop
R2 learns route, advertises 10.0.0.0/24, 2 hops
R1 learns route, advertises 10.0.0.0/24, 3 hops

Network A Fails:
R3 detects failure
R3 advertises 10.0.0.0/24, 16 hops (poison)
R2 receives poison, marks route invalid
R2 sends poison reverse to R3 (confirms)
R2 advertises poison to R1
R1 marks route invalid

Without Loop Prevention:
R3 loses Network A
R2 still thinks route valid (hasn't updated yet)
R3 asks R2: "How to reach 10.0.0.0/24?"
R2 responds: "Through you, R3!"
R3 installs route pointing to R2 (LOOP)
Packets loop between R2 and R3 until TTL expires
```

### RIP Configuration (Cisco IOS)

**Basic RIPv2 Configuration:**
```cisco
! Enable RIP routing
Router(config)# router rip
Router(config-router)# version 2
! Use RIPv2 (classless, subnet masks included)

Router(config-router)# network 10.0.0.0
! Advertise networks (uses classful boundaries)
! This enables RIP on all interfaces in 10.0.0.0/8

Router(config-router)# network 192.168.1.0
! Advertise 192.168.1.0/24 network

Router(config-router)# no auto-summary
! Disable automatic summarization at classful boundaries
! Required for discontiguous networks

Router(config-router)# passive-interface GigabitEthernet0/0
! Don't send RIP updates out Gi0/0
! Use for interfaces with end users (security, efficiency)
```

**RIPv2 with Authentication:**
```cisco
! Configure authentication (prevent rogue updates)
Router(config)# key chain RIP_KEY
Router(config-keychain)# key 1
Router(config-keychain-key)# key-string MySecretKey

! Apply to interface
Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip rip authentication mode md5
Router(config-if)# ip rip authentication key-chain RIP_KEY
```

**Verification Commands:**
```cisco
! Show RIP routing table entries
Router# show ip route rip
R    10.2.0.0/16 [120/2] via 10.1.1.2, 00:00:15, GigabitEthernet0/1
R    172.16.0.0/16 [120/1] via 10.1.1.2, 00:00:15, GigabitEthernet0/1
! [120/2] = [AD/metric] = AD 120, 2 hops away

! Show RIP protocol information
Router# show ip protocols
Routing Protocol is "rip"
  Outgoing update filter list for all interfaces is not set
  Incoming update filter list for all interfaces is not set
  Sending updates every 30 seconds, next due in 12 seconds
  Invalid after 180 seconds, hold down 180, flushed after 240
  Redistributing: rip
  Default version control: send version 2, receive version 2
    Interface             Send  Recv  Triggered RIP  Key-chain
    GigabitEthernet0/1    2     2                    RIP_KEY
  Automatic network summarization is not in effect
  Maximum path: 4
  Routing for Networks:
    10.0.0.0
    192.168.1.0
  Passive Interface(s):
    GigabitEthernet0/0
  Routing Information Sources:
    Gateway         Distance      Last Update
    10.1.1.2            120      00:00:22
  Distance: (default is 120)

! Debug RIP updates (use carefully in production)
Router# debug ip rip
RIP protocol debugging is on
Router#
*Mar  1 12:00:00.000: RIP: received v2 update from 10.1.1.2 on GigabitEthernet0/1
*Mar  1 12:00:00.004:      10.2.0.0/16 via 0.0.0.0 in 2 hops
*Mar  1 12:00:00.008:      172.16.0.0/16 via 0.0.0.0 in 1 hops
```

### RIP Limitations

**1. Limited Scalability**
- Maximum 15 hops (unsuitable for large networks)
- Hop count doesn't consider bandwidth (100 Mbps = 10 Gbps = 1 hop)

**2. Slow Convergence**
- Can take minutes to converge after topology change
- Relies on timers (30-second updates + holddown)
- Counting to infinity problem

**3. Bandwidth Inefficiency**
- Sends entire routing table every 30 seconds
- Wastes bandwidth, especially on slow WAN links

**4. No Load Balancing Based on Link Quality**
- Only equal-cost load balancing (same hop count)
- Can't prefer faster links

**5. No Hierarchy**
- Flat routing domain (no areas or zones)
- All routers have all routes

**When to Use RIP:**
- Very small networks (<15 routers, <15 hops)
- Simple network topology
- Low-end routers with limited resources
- Legacy networks already running RIP
- Lab/learning environments

**Modern Alternatives:**
- Use OSPF or EIGRP for production networks
- RIP rarely deployed in new networks today

---

## OSPF (Open Shortest Path First)

### OSPF Overview

**OSPF** is a link-state routing protocol that is scalable, fast-converging, and vendor-neutral. It's the most widely used IGP in enterprise networks.

**OSPF Versions:**
- **OSPFv2** (RFC 2328): For IPv4
- **OSPFv3** (RFC 5340): For IPv6 (also supports IPv4 with extensions)

**Key Characteristics:**
- Link-state protocol (full topology knowledge)
- Metric: Cost (based on interface bandwidth)
- No hop count limit (scales to large networks)
- Fast convergence (sub-second to a few seconds)
- Hierarchical design using areas
- Administrative Distance: 110
- Multicast updates: 224.0.0.5 (AllSPFRouters), 224.0.0.6 (AllDRRouters)

### OSPF Operation

**1. Neighbor Discovery**
- Routers send Hello packets on OSPF-enabled interfaces
- Hello interval: 10 seconds (broadcast/point-to-point), 30 seconds (NBMA)
- Dead interval: 40 seconds (4× Hello)
- Must match: Hello/Dead intervals, area ID, authentication, stub flag

**2. Adjacency Formation**
- Exchange Database Description (DBD) packets
- Contains summary of Link-State Database (LSDB)
- Routers request missing LSAs with Link-State Request (LSR)
- Receive full LSAs with Link-State Update (LSU)

**3. Link-State Database (LSDB)**
- All OSPF routers in same area have identical LSDB
- LSDB contains Link-State Advertisements (LSAs)
- Describes complete network topology

**4. SPF Calculation**
- Each router runs Dijkstra Shortest Path First algorithm
- Calculates shortest path tree with itself as root
- Populates routing table with best paths

**5. Maintaining the LSDB**
- LSA aging: 30-minute refresh
- Topology changes trigger immediate LSA flooding
- Incremental SPF for faster convergence

**OSPF Packet Types:**

| Type | Name | Purpose |
|------|------|---------|
| 1 | Hello | Discover neighbors, maintain adjacencies |
| 2 | Database Description (DBD) | Summarize LSDB during adjacency |
| 3 | Link-State Request (LSR) | Request specific LSAs |
| 4 | Link-State Update (LSU) | Carry LSAs (topology information) |
| 5 | Link-State Acknowledgment (LSAck) | Acknowledge LSU receipt |

### OSPF Areas

OSPF uses **hierarchical design** with areas to improve scalability:

**Area Benefits:**
- Reduce LSDB size (less memory)
- Reduce SPF calculations (less CPU)
- Confine topology changes to local area
- Enable route summarization at area boundaries

**Area Types:**

**1. Backbone Area (Area 0)**
- Core of OSPF network
- All areas must connect to Area 0
- Carries inter-area traffic

**2. Standard Area**
- Regular area with full LSA information
- Receives internal and external routes

**3. Stub Area**
- Doesn't receive external LSAs (Type 5)
- Reduces LSDB size
- Uses default route for external destinations

**4. Totally Stubby Area** (Cisco proprietary)
- Doesn't receive external or inter-area LSAs
- Receives only default route
- Smallest LSDB

**5. Not-So-Stubby Area (NSSA)**
- Stub area that allows limited external routes
- Used when connecting to another routing domain

**Area Design:**
```
              [Area 0 - Backbone]
                       |
        +-------------++--------------+
        |              |               |
   [Area 1]       [Area 2]        [Area 3]
  (Standard)       (Stub)      (Totally Stubby)
```

### OSPF Router Types

**1. Internal Router**
- All interfaces in same area
- Single LSDB for that area

**2. Area Border Router (ABR)**
- Interfaces in multiple areas
- Always has interface in Area 0
- Maintains separate LSDB for each area
- Performs inter-area routing and summarization

**3. Backbone Router**
- Has at least one interface in Area 0
- May be internal or ABR

**4. Autonomous System Boundary Router (ASBR)**
- Connects OSPF domain to external routing domain
- Redistributes routes from other protocols (RIP, BGP, static)
- Generates Type 5 LSAs (external routes)

### OSPF Cost Metric

OSPF uses **cost** based on interface bandwidth:

**Cost Calculation:**
```
Cost = Reference Bandwidth / Interface Bandwidth

Default Reference Bandwidth = 100 Mbps

Interface     Bandwidth     Cost
---------------------------------
Serial        1.544 Mbps    64
Ethernet      10 Mbps       10
Fast Ethernet 100 Mbps      1
Gigabit       1000 Mbps     1  ← Problem!
10 Gigabit    10000 Mbps    1  ← Problem!
```

**Problem:** Fast Ethernet, Gigabit, and 10G all have cost 1 (can't differentiate)

**Solution:** Increase reference bandwidth:
```cisco
Router(config-router)# auto-cost reference-bandwidth 100000
! Reference bandwidth = 100 Gbps = 100,000 Mbps

New Costs:
Fast Ethernet: 100000/100 = 1000
Gigabit: 100000/1000 = 100
10 Gigabit: 100000/10000 = 10
100 Gigabit: 100000/100000 = 1
```

**Manual Cost Override:**
```cisco
Router(config-if)# ip ospf cost 50
! Manually set cost to 50 (overrides calculation)
```

### OSPF Configuration (Cisco IOS)

**Basic Single-Area OSPF:**
```cisco
! Enable OSPF process 1
Router(config)# router ospf 1
! Process ID is locally significant (doesn't need to match neighbors)

Router(config-router)# router-id 1.1.1.1
! Manually set Router ID (recommended)
! Otherwise: Highest loopback IP, or highest physical interface IP

Router(config-router)# network 10.1.1.0 0.0.0.255 area 0
! Enable OSPF on interfaces matching 10.1.1.0/24
! Wildcard mask: 0.0.0.255 = /24
! Place interfaces in Area 0

Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
! Enable OSPF on 192.168.1.0/24 interfaces, Area 0

Router(config-router)# passive-interface GigabitEthernet0/0
! Don't send OSPF Hello packets on Gi0/0
! Use for user-facing interfaces (security, efficiency)
```

**Multi-Area OSPF:**
```cisco
! Area Border Router configuration
Router(config)# router ospf 1
Router(config-router)# router-id 2.2.2.2
Router(config-router)# network 10.0.0.0 0.0.0.255 area 0
! Interface in Area 0 (backbone)
Router(config-router)# network 10.1.0.0 0.0.255.255 area 1
! Interfaces in Area 1

Router(config-router)# area 1 range 10.1.0.0 255.255.0.0
! Summarize Area 1 routes as single 10.1.0.0/16 summary
```

**OSPF Authentication:**
```cisco
! MD5 authentication on interface
Router(config-if)# ip ospf authentication message-digest
Router(config-if)# ip ospf message-digest-key 1 md5 MySecretKey

! Or area-wide authentication
Router(config-router)# area 0 authentication message-digest
Router(config-if)# ip ospf message-digest-key 1 md5 MySecretKey
```

**Adjust Reference Bandwidth:**
```cisco
Router(config-router)# auto-cost reference-bandwidth 100000
! Set to 100 Gbps for modern networks
! MUST BE CONSISTENT ON ALL ROUTERS
```

**Verification Commands:**
```cisco
! Show OSPF neighbors
Router# show ip ospf neighbor
Neighbor ID     Pri   State           Dead Time   Address         Interface
3.3.3.3          1   FULL/DR         00:00:35    10.1.1.3        Gi0/1
4.4.4.4          1   FULL/BDR        00:00:31    10.1.1.4        Gi0/1
! State: FULL = adjacency complete, DR = Designated Router

! Show OSPF routes
Router# show ip route ospf
O    10.2.0.0/16 [110/20] via 10.1.1.3, 00:10:15, GigabitEthernet0/1
O IA 10.3.0.0/16 [110/30] via 10.1.1.3, 00:05:22, GigabitEthernet0/1
! O = OSPF intra-area, O IA = OSPF inter-area
! [110/20] = [AD 110 / Cost 20]

! Show OSPF interface information
Router# show ip ospf interface GigabitEthernet0/1
GigabitEthernet0/1 is up, line protocol is up 
  Internet Address 10.1.1.2/24, Area 0, Attached via Network Statement
  Process ID 1, Router ID 2.2.2.2, Network Type BROADCAST, Cost: 1
  Topology-MTID    Cost    Disabled    Shutdown      Topology Name
        0           1         no          no            Base
  Transmit Delay is 1 sec, State DR, Priority 1
  Designated Router (ID) 2.2.2.2, Interface address 10.1.1.2
  Backup Designated router (ID) 4.4.4.4, Interface address 10.1.1.4
  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5

! Show OSPF database (LSDB)
Router# show ip ospf database
            OSPF Router with ID (2.2.2.2) (Process ID 1)
                Router Link States (Area 0)
Link ID         ADV Router      Age         Seq#       Checksum Link count
1.1.1.1         1.1.1.1         354         0x80000005 0x00E3B2 2
2.2.2.2         2.2.2.2         125         0x80000008 0x00A5F1 3

! Show detailed OSPF information
Router# show ip protocols
Routing Protocol is "ospf 1"
  Outgoing update filter list for all interfaces is not set
  Incoming update filter list for all interfaces is not set
  Router ID 2.2.2.2
  Number of areas in this router is 2. 2 normal 0 stub 0 nssa
  Maximum path: 4
  Routing for Networks:
    10.0.0.0 0.0.0.255 area 0
    10.1.0.0 0.0.255.255 area 1
  Passive Interface(s):
    GigabitEthernet0/0
  Routing Information Sources:
    Gateway         Distance      Last Update
    3.3.3.3              110      00:15:43
  Distance: (default is 110)
```

### OSPF Designated Router (DR) and BDR

On **multi-access networks** (Ethernet), OSPF elects:
- **Designated Router (DR)**: Central point for LSA exchange
- **Backup Designated Router (BDR)**: Backup to DR

**Purpose:**
- Reduce number of adjacencies (n routers = n(n-1)/2 adjacencies without DR)
- With DR: All routers adjacent to DR only (n-1 adjacencies)
- Reduces LSA flooding traffic

**Election Process:**
1. Highest **OSPF Priority** wins (default 1, range 0-255)
2. If priority tied, highest **Router ID** wins
3. Priority 0 = never become DR/BDR
4. Election only when DR/BDR not present (not preemptive)

**Configuration:**
```cisco
! Set priority to become DR
Router(config-if)# ip ospf priority 255

! Set priority to 0 (never become DR/BDR)
Router(config-if)# ip ospf priority 0
```

---

## EIGRP (Enhanced Interior Gateway Routing Protocol)

### EIGRP Overview

**EIGRP** is a Cisco-proprietary advanced distance vector (hybrid) protocol that combines the best features of distance vector and link-state protocols.

**Key Characteristics:**
- Protocol: Cisco proprietary (IP protocol 88)
- Metric: Composite (bandwidth, delay, reliability, load, MTU)
- Algorithm: DUAL (Diffusing Update Algorithm)
- Fast convergence (sub-second)
- Incremental updates (only changes sent)
- Administrative Distance: 90 (internal), 170 (external)
- Support: Classless (VLSM), manual summarization
- Load Balancing: Equal and unequal-cost

**EIGRP for Multi-Vendor:**
- Cisco released basic EIGRP as informational RFC 7868 (2016)
- Limited adoption by other vendors
- Still primarily Cisco-centric

### EIGRP Operation

**1. Neighbor Discovery**
- Send Hello packets (multicast 224.0.0.10)
- Hello interval: 5 seconds (LAN), 60 seconds (WAN)
- Hold time: 15 seconds (LAN), 180 seconds (WAN)

**2. Topology Table**
- EIGRP maintains topology table (all routes, not just best)
- Contains:
  - **Successor**: Best route (installed in routing table)
  - **Feasible Successor**: Backup route (loop-free alternative)

**3. DUAL Algorithm**
- Guarantees loop-free paths
- Provides instant convergence using feasible successors
- Only runs full DUAL calculation if no feasible successor exists

**4. Update Process**
- Bounded updates (only to affected routers)
- Partial updates (only changed routes)
- Reliable Transport Protocol (RTP) ensures delivery

### EIGRP Metric

EIGRP uses **composite metric** based on:
- **Bandwidth** (K1): Slowest link in path (primary factor)
- **Delay** (K3): Cumulative delay (primary factor)
- **Reliability** (K5): Link reliability (not used by default)
- **Load** (K4): Link utilization (not used by default)
- **MTU** (K2): Not used in calculation (tracked only)

**Default Metric Formula:**
```
Metric = 256 * [(K1*BW) + (K3*Delay)]

Default K-values: K1=1, K2=0, K3=1, K4=0, K5=0

Simplified:
Metric = 256 * [(10^7 / Slowest BW in kbps) + (Cumulative Delay in tens of microseconds)]

Example Path: Two Gigabit links (1,000,000 kbps, 10 μs delay each)
BW = 10^7 / 1,000,000 = 10
Delay = (10 + 10) / 10 = 2
Metric = 256 * (10 + 2) = 256 * 12 = 3,072
```

**Why 256 multiplier?**
- EIGRP internally uses 32-bit metric (fine granularity)
- Display scaled by 256 for readability
- Allows differentiation between similar paths

### EIGRP Terminology

**Advertised Distance (AD) / Reported Distance (RD)**
- Metric from neighbor to destination
- What neighbor reports to you

**Feasible Distance (FD)**
- Your total metric to destination (your cost + neighbor's AD)
- Best FD = metric in routing table

**Successor**
- Route with best (lowest) feasible distance
- Installed in routing table
- Primary path

**Feasible Successor**
- Backup route that satisfies feasibility condition
- AD of feasible successor < FD of successor
- Guarantees loop-free path
- Used immediately if successor fails (instant convergence)

**Feasibility Condition:**
```
Feasible Successor AD < Successor FD

Example:
To reach Network X:
- Via Router A (Successor): FD = 3072
- Via Router B (backup): AD = 2816

Is Router B a Feasible Successor?
2816 (B's AD) < 3072 (A's FD) → YES, loop-free
```

### EIGRP Configuration (Cisco IOS)

**Classic EIGRP Configuration:**
```cisco
! Enable EIGRP with AS number 100
Router(config)# router eigrp 100
! AS number must match on all routers (like OSPF process ID but must match)

Router(config-router)# eigrp router-id 1.1.1.1
! Manually set Router ID (recommended)

Router(config-router)# network 10.0.0.0
! Enable EIGRP on all interfaces in 10.0.0.0/8 (classful)

Router(config-router)# network 192.168.1.0 0.0.0.255
! Enable EIGRP on 192.168.1.0/24 interfaces (with wildcard mask)

Router(config-router)# no auto-summary
! Disable auto-summarization (required for discontiguous networks)

Router(config-router)# passive-interface GigabitEthernet0/0
! Don't send EIGRP updates on Gi0/0
```

**Named Mode EIGRP (Modern, Preferred):**
```cisco
! Named mode (introduced IOS 15.0)
Router(config)# router eigrp MY_EIGRP
Router(config-router)# address-family ipv4 unicast autonomous-system 100
Router(config-router-af)# network 10.0.0.0
Router(config-router-af)# network 192.168.1.0 0.0.0.255
Router(config-router-af)# eigrp router-id 1.1.1.1

Router(config-router-af-interface)# interface GigabitEthernet0/1
Router(config-router-af-interface)# passive-interface
```

**EIGRP Authentication:**
```cisco
! Key chain
Router(config)# key chain EIGRP_KEY
Router(config-keychain)# key 1
Router(config-keychain-key)# key-string MySecretKey

! Apply to interface (classic mode)
Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip authentication mode eigrp 100 md5
Router(config-if)# ip authentication key-chain eigrp 100 EIGRP_KEY
```

**Load Balancing:**
```cisco
! Equal-cost load balancing (default, up to 4 paths)
Router(config-router)# maximum-paths 6
! Increase to 6 equal-cost paths

! Unequal-cost load balancing (EIGRP only feature!)
Router(config-router)# variance 2
! Use paths with metric up to 2× the best metric
! Example: Best metric = 1000, variance 2 = use paths up to 2000
```

**Verification Commands:**
```cisco
! Show EIGRP neighbors
Router# show ip eigrp neighbors
IP-EIGRP neighbors for process 100
H   Address         Interface      Hold Uptime   SRTT   RTO  Q  Seq
                                   (sec)         (ms)       Cnt Num
0   10.1.1.2        Gi0/1          12   01:23:45  1     200  0  15
1   10.1.2.2        Gi0/2          13   01:23:40  5     300  0  22
! H = Handle, Hold = hold time, SRTT = Smooth Round Trip Time

! Show EIGRP topology table
Router# show ip eigrp topology
IP-EIGRP Topology Table for AS(100)/ID(1.1.1.1)

Codes: P - Passive, A - Active, U - Update, Q - Query, R - Reply,
       r - reply Status, s - sia Status

P 10.2.0.0/24, 1 successors, FD is 3072
        via 10.1.1.2 (3072/2816), GigabitEthernet0/1
        via 10.1.2.2 (3328/3072), GigabitEthernet0/2  ← Feasible Successor
! FD = 3072 (best metric)
! via 10.1.1.2 (3072/2816) = (FD/AD) via neighbor
! Second route is Feasible Successor (3072 < 3072? NO... wait)
! Actually: AD 3072 is NOT < FD 3072, so NOT feasible successor

! Show EIGRP routes in routing table
Router# show ip route eigrp
D    10.2.0.0/24 [90/3072] via 10.1.1.2, 01:23:45, GigabitEthernet0/1
D EX 172.16.0.0/16 [170/3328] via 10.1.1.2, 00:45:12, GigabitEthernet0/1
! D = EIGRP, D EX = EIGRP External
! [90/3072] = [AD 90 / Metric 3072]

! Show EIGRP interface information
Router# show ip eigrp interfaces
IP-EIGRP interfaces for process 100
                        Xmit Queue   Mean   Pacing Time   Multicast    Pending
Interface        Peers  Un/Reliable  SRTT   Un/Reliable   Flow Timer   Routes
Gi0/1              1        0/0         1       0/1           50           0
Gi0/2              1        0/0         5       0/1           50           0
```

---

## Routing Protocol Selection

### When to Use Each Protocol

**RIP:**
- Very small networks (<10 routers)
- Simple topology
- Low-end hardware
- Legacy support required
- **Generally NOT recommended for new deployments**

**OSPF:**
- Large enterprise networks
- Multi-vendor environment
- Standards-based requirement
- Hierarchical design needed
- Complex topologies
- **Most common choice for enterprise**

**EIGRP:**
- Cisco-only environment
- Fast convergence required
- Unequal-cost load balancing needed
- Simpler configuration than OSPF
- Medium to large networks
- **Good choice if all-Cisco network**

### Feature Comparison Decision Matrix

| Requirement | RIP | OSPF | EIGRP |
|-------------|-----|------|-------|
| Fast convergence | ❌ No | ✅ Yes | ✅ Yes (Best) |
| Scalability | ❌ Small only | ✅ Large | ✅ Large |
| Vendor neutral | ✅ Yes | ✅ Yes | ⚠️ Limited |
| Simple config | ✅ Yes | ❌ Complex | ⚠️ Moderate |
| Low CPU/memory | ✅ Yes | ❌ High | ⚠️ Moderate |
| Hierarchical design | ❌ No | ✅ Areas | ⚠️ AS |
| Unequal-cost load balance | ❌ No | ❌ No | ✅ Yes |
| Bandwidth awareness | ❌ No (hop count) | ✅ Yes | ✅ Yes |

---

## Summary

**Dynamic routing protocols** automatically discover networks, maintain routing information, and adapt to topology changes, making them essential for large networks.

**Key Concepts:**
- **IGP vs EGP**: Interior Gateway Protocols (within AS) vs Exterior (between AS)
- **Distance Vector**: Route by rumor, periodic updates, slow convergence (RIP)
- **Link-State**: Full topology knowledge, fast convergence, higher resource usage (OSPF)
- **Hybrid**: Combines best of both, very fast convergence (EIGRP)

**RIP:**
- Oldest, simplest protocol (hop count metric, max 15 hops)
- Slow convergence (minutes), periodic full updates (30 seconds)
- Loop prevention: Split horizon, poison reverse, holddown
- Use only for very small networks or legacy support
- Administrative Distance: 120

**OSPF:**
- Link-state protocol, industry standard (RFC 2328)
- Fast convergence (seconds), triggered updates only
- Metric: Cost (based on bandwidth), no hop limit
- Hierarchical design using areas (Area 0 = backbone)
- DR/BDR election on multi-access networks
- Administrative Distance: 110
- Best choice for multi-vendor enterprise networks

**EIGRP:**
- Cisco proprietary hybrid protocol
- Very fast convergence (sub-second) using DUAL algorithm
- Metric: Composite (bandwidth + delay)
- Feasible successors for instant backup paths
- Supports unequal-cost load balancing (variance)
- Administrative Distance: 90 (internal), 170 (external)
- Best choice for all-Cisco environments

**Configuration Best Practices:**
- Use passive-interface on user-facing interfaces (security + efficiency)
- Always configure authentication (prevent rogue updates)
- Manually set Router IDs for predictability
- Disable auto-summary in RIP/EIGRP (support VLSM/CIDR)
- Increase OSPF reference bandwidth for Gigabit+ networks
- Plan OSPF area design before deployment

**CompTIA Network+ Exam Tips:**
- Know protocol types: RIP=distance vector, OSPF=link-state, EIGRP=hybrid
- Memorize metrics: RIP=hop count, OSPF=cost, EIGRP=bandwidth+delay
- Remember AD values: EIGRP=90, OSPF=110, RIP=120
- Understand RIP limitations: 15 hop max, slow convergence
- Know OSPF uses areas (Area 0 = backbone required)
- EIGRP supports unequal-cost load balancing (unique feature)

---

## References

- RFC 2453: RIP Version 2
- RFC 2328: OSPF Version 2
- RFC 7868: Cisco's EIGRP Informational RFC
- CompTIA Network+ N10-008 Objectives: 2.2 Compare routing technologies
- "OSPF: Anatomy of an Internet Routing Protocol" - John Moy
- "Routing TCP/IP, Volume 1" - Jeff Doyle
