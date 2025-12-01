---
id: routing-fundamentals
title: Routing Fundamentals and Static Routing
chapterId: ch2-network-implementations
order: 17
duration: 80
objectives:
  - Explain how routers forward packets between networks
  - Understand routing table structure and operation
  - Differentiate between administrative distance and routing metrics
  - Configure and verify static routes
  - Implement default routes and floating static routes
  - Understand route summarization concepts
  - Troubleshoot static routing issues
---

# Lesson 17: Routing Fundamentals and Static Routing

## Learning Objectives
By the end of this lesson, you will be able to:
- Explain how routers forward packets between networks
- Understand routing table structure and operation
- Differentiate between administrative distance and routing metrics
- Configure and verify static routes
- Implement default routes and floating static routes
- Understand route summarization concepts
- Troubleshoot static routing issues

## Introduction

**Routing** is the process of forwarding packets between different networks based on IP addresses. While switches operate at Layer 2 using MAC addresses within a single network, **routers** operate at Layer 3 to interconnect multiple networks.

Routers make forwarding decisions by consulting their **routing table**, which contains information about known networks and the best paths to reach them. Routes can be learned through:
- **Directly Connected Networks** - Interfaces with configured IP addresses
- **Static Routes** - Manually configured by administrators
- **Dynamic Routes** - Learned through routing protocols (OSPF, EIGRP, BGP)

This lesson focuses on routing fundamentals and static routing, which provides the foundation for understanding dynamic routing protocols covered in later lessons.

---

## How Routers Work

### Router Operation Overview

Routers perform three primary functions:

**1. Path Determination**
- Examine destination IP address in packet
- Consult routing table to find best path
- Select appropriate exit interface

**2. Packet Forwarding**
- Decapsulate Layer 2 frame (strip Ethernet header)
- Examine Layer 3 packet (IP header)
- Encapsulate packet in new Layer 2 frame
- Forward out appropriate interface

**3. Packet Switching**
- Move packets from input interface to output interface
- Switch packets through router's internal architecture
- Process routing decisions at wire speed

### Routing vs. Switching

Key differences between routers and switches:

| Feature | Switch (Layer 2) | Router (Layer 3) |
|---------|------------------|------------------|
| **Operating Layer** | Data Link (Layer 2) | Network (Layer 3) |
| **Addressing** | MAC addresses | IP addresses |
| **Forwarding Table** | MAC address table | Routing table |
| **Broadcast Domain** | Forwards broadcasts | Blocks broadcasts |
| **Scope** | Single network segment | Interconnects networks |
| **Learning** | Learns MAC dynamically | Learns routes (manual or protocol) |
| **Speed** | Wire-speed (hardware) | Historically slower (now hardware) |

**Example:**
```
PC1 (192.168.1.10) wants to reach Server1 (10.0.0.50)

Without Router:
- PC1 and Server1 on different networks
- Cannot communicate (no path)

With Router:
- PC1 sends to default gateway (router)
- Router forwards between 192.168.1.0/24 and 10.0.0.0/24
- Communication established
```

### Router Packet Forwarding Process

**Step-by-Step Process:**

**1. Receive Packet**
- Packet arrives on ingress interface
- Router checks Frame Check Sequence (FCS)
- If valid, accepts packet; if invalid, drops packet

**2. Decapsulate**
- Strip Layer 2 Ethernet frame header
- Expose Layer 3 IP packet
- Check IP header checksum

**3. Examine Destination IP**
- Look at destination IP address in IP header
- Determine if packet is for router itself or needs forwarding
- If for router (routing protocol, management), process locally
- If for another host, proceed to routing lookup

**4. Routing Table Lookup**
- Search routing table for longest prefix match
- Example: Destination 192.168.10.50
  - Match 192.168.10.0/24 (specific, 24-bit match)
  - Match 192.168.0.0/16 (less specific, 16-bit match)
  - Match 0.0.0.0/0 (default route, 0-bit match)
- Select most specific match (longest prefix)

**5. Decrement TTL**
- Decrease Time-to-Live (TTL) by 1
- If TTL reaches 0, drop packet and send ICMP Time Exceeded
- TTL prevents infinite routing loops

**6. Encapsulate**
- Encapsulate IP packet in new Layer 2 frame
- Destination MAC = next-hop MAC or end host MAC
- Source MAC = router's egress interface MAC
- Calculate new FCS

**7. Forward**
- Send frame out egress interface
- Queue packet if interface congested
- Apply QoS policies if configured

**Example Packet Walk:**
```
PC1 (192.168.1.10) → Router1 → Router2 → Server1 (10.0.0.50)

PC1 sends packet:
- Source IP: 192.168.1.10
- Dest IP: 10.0.0.50
- Source MAC: PC1's MAC
- Dest MAC: Router1's GigabitEthernet0/0 MAC

Router1 receives, decapsulates:
- Checks dest IP: 10.0.0.50
- Routing table: 10.0.0.0/24 via Router2 (172.16.0.2)
- Decrements TTL: 64 → 63
- Encapsulates new frame:
  - Source MAC: Router1's GigabitEthernet0/1 MAC
  - Dest MAC: Router2's GigabitEthernet0/0 MAC
- Forwards to Router2

Router2 receives, decapsulates:
- Checks dest IP: 10.0.0.50
- Routing table: 10.0.0.0/24 directly connected
- Decrements TTL: 63 → 62
- Encapsulates new frame:
  - Source MAC: Router2's GigabitEthernet0/1 MAC
  - Dest MAC: Server1's MAC (from ARP)
- Forwards to Server1

Key Point: IP addresses never change (end-to-end)
           MAC addresses change at every hop (point-to-point)
```

---

## Routing Table Structure

### Routing Table Components

A routing table contains all known routes and information needed for forwarding decisions.

**Routing Table Entry Fields:**

**1. Destination Network**
- Network address and prefix length (CIDR notation)
- Example: 192.168.10.0/24

**2. Next Hop (Gateway)**
- IP address of next router in path
- Or "directly connected" if local network
- Or exit interface for point-to-point links

**3. Exit Interface**
- Router interface used to reach destination
- Example: GigabitEthernet0/1

**4. Metric**
- Cost to reach destination
- Used to compare routes from same protocol
- Lower metric = better route
- Examples: hop count, bandwidth, delay, cost

**5. Administrative Distance (AD)**
- Trustworthiness of route source
- Used to compare routes from different sources
- Lower AD = more trusted
- Example: Directly connected (AD=0) beats OSPF (AD=110)

**6. Route Source**
- How route was learned
- Codes: C (connected), S (static), O (OSPF), R (RIP), B (BGP)

**7. Timestamp**
- When route was learned
- Age of dynamic routes

### Viewing Routing Tables

**Linux/macOS:**
```bash
# View routing table
route -n
# or
netstat -rn
# or (modern)
ip route show

Output:
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 eth0
192.168.1.0     0.0.0.0         255.255.255.0   U     0      0        0 eth0

Explanation:
0.0.0.0 = Default route (matches everything)
192.168.1.1 = Default gateway (next hop)
192.168.1.0/24 = Directly connected network
```

**Windows:**
```cmd
route print

IPv4 Route Table
===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0      192.168.1.1    192.168.1.10       25
        192.168.1.0    255.255.255.0         On-link     192.168.1.10      281
       192.168.1.10  255.255.255.255         On-link     192.168.1.10      281
```

**Cisco IOS:**
```cisco
Router# show ip route

Codes: L - local, C - connected, S - static, R - RIP, O - OSPF, B - BGP
       * - candidate default, U - per-user static route

Gateway of last resort is 10.1.1.1 to network 0.0.0.0

S*    0.0.0.0/0 [1/0] via 10.1.1.1
C     10.1.1.0/24 is directly connected, GigabitEthernet0/0
L     10.1.1.2/32 is directly connected, GigabitEthernet0/0
S     192.168.10.0/24 [1/0] via 10.1.2.1
C     10.1.2.0/24 is directly connected, GigabitEthernet0/1
L     10.1.2.2/32 is directly connected, GigabitEthernet0/1

Explanation:
S* = Static default route
[1/0] = [Administrative Distance / Metric]
C = Directly connected network
L = Local interface address (/32 host route)
```

### Route Types

**1. Directly Connected Routes (C)**
- Networks attached to router interfaces
- Automatically added when interface configured and up
- Administrative Distance = 0 (most trusted)
- No next hop needed (local delivery)

**2. Local Routes (L)**
- Host routes (/32) for router's own IP addresses
- Added automatically for each interface IP
- Used for packets destined to router itself
- Administrative Distance = 0

**3. Static Routes (S)**
- Manually configured by administrator
- Remain in table until removed or interface goes down
- Administrative Distance = 1 (default)
- Used for small networks or backup paths

**4. Dynamic Routes**
- Learned through routing protocols
- Automatically updated when topology changes
- Administrative Distance varies by protocol
- Examples: RIP, OSPF, EIGRP, BGP

**Example Routing Table:**
```
C     192.168.1.0/24 is directly connected, GigabitEthernet0/0
L     192.168.1.1/32 is directly connected, GigabitEthernet0/0
S     10.0.0.0/8 [1/0] via 192.168.1.254
O     172.16.0.0/16 [110/65] via 192.168.1.253, 00:15:32
S*    0.0.0.0/0 [1/0] via 192.168.1.254

Translation:
- 192.168.1.0/24: Local network on Gi0/0
- 192.168.1.1: Router's IP on Gi0/0
- 10.0.0.0/8: Static route via 192.168.1.254
- 172.16.0.0/16: OSPF learned route (AD=110, metric=65)
- 0.0.0.0/0: Default static route via 192.168.1.254
```

---

## Administrative Distance (AD)

**Administrative Distance** is a measure of trustworthiness of a routing protocol. When multiple routing sources provide routes to the same destination, AD determines which route is installed in the routing table.

### Default Administrative Distance Values

| Route Source | Administrative Distance |
|--------------|------------------------|
| Directly Connected | 0 |
| Static Route | 1 |
| EIGRP Summary Route | 5 |
| External BGP (eBGP) | 20 |
| Internal EIGRP | 90 |
| OSPF | 110 |
| IS-IS | 115 |
| RIP | 120 |
| External EIGRP | 170 |
| Internal BGP (iBGP) | 200 |
| Unknown/Unreachable | 255 |

**Lower AD = More Trusted**

### AD vs. Metric

Important distinction:

**Administrative Distance:**
- Compares routes from **different sources**
- Example: Static (AD=1) vs OSPF (AD=110)
- Static route wins regardless of metric

**Metric:**
- Compares routes from **same source**
- Example: Two OSPF routes to 10.0.0.0/24
- Route with lower metric (cost) wins

**Decision Process:**
```
Step 1: Longest Prefix Match
- More specific route wins
- 192.168.10.0/24 beats 192.168.0.0/16

Step 2: Administrative Distance (if prefix lengths equal)
- Lower AD wins
- Static (AD=1) beats OSPF (AD=110)

Step 3: Metric (if AD equal)
- Lower metric wins
- OSPF cost 10 beats OSPF cost 20
```

**Example Scenario:**
```
Router has three routes to 10.0.0.0/24:
1. Static route: AD=1, metric=0
2. OSPF route: AD=110, metric=50
3. RIP route: AD=120, metric=3

Winner: Static route (lowest AD = 1)
- Even though RIP has lowest metric (3)
- AD compared first, static always wins
```

### Modifying Administrative Distance

Administrators can modify AD for specific scenarios:

**Cisco IOS - Modify Static Route AD:**
```cisco
! Normal static route (AD = 1)
Router(config)# ip route 10.0.0.0 255.255.255.0 192.168.1.254

! Static route with AD = 5
Router(config)# ip route 10.0.0.0 255.255.255.0 192.168.1.254 5

! Floating static route (backup, AD = 130)
Router(config)# ip route 10.0.0.0 255.255.255.0 192.168.2.254 130
! Only used if OSPF (AD=110) route fails
```

---

## Static Routes

**Static routes** are manually configured routes that remain in the routing table until removed by the administrator or until the exit interface goes down.

### When to Use Static Routes

**Appropriate Use Cases:**
- **Small networks** with few routes and stable topology
- **Stub networks** with single exit point
- **Default routes** to Internet or upstream provider
- **Backup routes** (floating static) when dynamic routing fails
- **Security** - explicit control over routing paths
- **Lab environments** for learning and testing

**Inappropriate Use Cases:**
- Large networks (hundreds of routes, difficult to manage)
- Networks with frequent topology changes
- Networks requiring automatic failover
- Networks needing load balancing across multiple paths

### Static Route Configuration

**Syntax:**
```cisco
Router(config)# ip route <destination_network> <subnet_mask> {next-hop-ip | exit-interface} [distance]
```

**Parameters:**
- **destination_network**: Network to reach (e.g., 10.0.0.0)
- **subnet_mask**: Subnet mask (e.g., 255.255.255.0)
- **next-hop-ip**: IP address of next router
- **exit-interface**: Local interface to use (point-to-point)
- **distance**: Administrative distance (optional, default=1)

### Static Route Types

**1. Next-Hop Static Route**
```cisco
Router(config)# ip route 192.168.20.0 255.255.255.0 10.1.1.2

Explanation:
- To reach 192.168.20.0/24
- Send to next-hop router 10.1.1.2
- Router must know how to reach 10.1.1.2 (recursive lookup)
```

**Advantages:**
- Works on multi-access networks (Ethernet)
- Doesn't depend on interface state

**Disadvantages:**
- Requires recursive lookup (extra processing)
- Next-hop must be reachable (in routing table)

**2. Exit Interface Static Route**
```cisco
Router(config)# ip route 192.168.20.0 255.255.255.0 Serial0/0/0

Explanation:
- To reach 192.168.20.0/24
- Forward out Serial0/0/0 interface
- Best for point-to-point links (Serial, PPP)
```

**Advantages:**
- No recursive lookup needed
- Faster processing (single lookup)

**Disadvantages:**
- Doesn't work well on multi-access networks
- Route active as long as interface is up (even if next-hop down)

**3. Fully Specified Static Route**
```cisco
Router(config)# ip route 192.168.20.0 255.255.255.0 GigabitEthernet0/1 10.1.1.2

Explanation:
- To reach 192.168.20.0/24
- Exit interface GigabitEthernet0/1
- Next-hop 10.1.1.2
- Combines both methods
```

**Advantages:**
- Works on multi-access networks
- No recursive lookup needed
- Explicit control over forwarding

**Disadvantages:**
- More complex configuration

**Best Practice Recommendation:**
- **Point-to-Point Links (Serial, PPP, GRE):** Use exit interface
- **Multi-Access Networks (Ethernet):** Use next-hop or fully specified
- **Modern Networks (Ethernet dominant):** Use next-hop IP

### Default Route

A **default route** (0.0.0.0/0) matches all destinations not explicitly in the routing table. Also called the "gateway of last resort."

**Configuration:**
```cisco
! IPv4 default route
Router(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.1

! IPv6 default route
Router(config)# ipv6 route ::/0 2001:db8::1

! Using exit interface
Router(config)# ip route 0.0.0.0 0.0.0.0 GigabitEthernet0/0
```

**Use Cases:**
- **Stub routers**: Single connection to rest of network
- **Internet gateway**: Route to ISP
- **Default forwarding**: When no specific route matches

**Example Stub Network:**
```
Branch Office Router:
Local networks: 192.168.10.0/24, 192.168.20.0/24
Corporate WAN: 10.0.0.0/8

Config:
ip route 0.0.0.0 0.0.0.0 10.1.1.1
! Send everything else to corporate router
```

### Static Host Route

A **host route** specifies path to single host (/32 subnet mask).

**Configuration:**
```cisco
Router(config)# ip route 10.0.0.50 255.255.255.255 192.168.1.254

! Specific route for host 10.0.0.50 only
! More specific than network route (longest prefix match)
```

**Use Cases:**
- Traffic engineering for specific server
- Workaround for routing issues
- Testing and troubleshooting

### Floating Static Route

A **floating static route** has a higher AD than the primary route and serves as a backup.

**Configuration:**
```cisco
! Primary route: OSPF (AD = 110)
router ospf 1
 network 10.0.0.0 0.255.255.255 area 0

! Backup route: Floating static (AD = 130)
ip route 10.0.0.0 255.0.0.0 192.168.100.1 130

Normal operation:
- OSPF route used (AD=110 < AD=130)
- Static route not installed in routing table

OSPF failure:
- OSPF route removed from table
- Static route installed (now best route)
- Traffic flows over backup link

OSPF recovery:
- OSPF route returns (AD=110)
- OSPF route replaces static route
- Traffic returns to primary path
```

**Best Practice:**
- Set floating static AD between primary and less-preferred protocols
- Example: Primary OSPF (110), Floating Static (130), Backup RIP (120)

---

## Verification Commands

**1. Show IP Routing Table**
```cisco
Router# show ip route

Gateway of last resort is 10.1.1.1 to network 0.0.0.0

S*    0.0.0.0/0 [1/0] via 10.1.1.1
      10.0.0.0/8 is variably subnetted, 4 subnets, 2 masks
C        10.1.1.0/24 is directly connected, GigabitEthernet0/0
L        10.1.1.2/32 is directly connected, GigabitEthernet0/0
S        10.2.0.0/16 [1/0] via 10.1.1.254
O        10.3.0.0/16 [110/20] via 10.1.1.253, 01:23:45
```

**2. Show Specific Route**
```cisco
Router# show ip route 192.168.10.0
Routing entry for 192.168.10.0/24
  Known via "static", distance 1, metric 0
  Routing Descriptor Blocks:
  * 10.1.1.254
      Route metric is 0, traffic share count is 1
```

**3. Show Static Routes Only**
```cisco
Router# show ip route static
S*    0.0.0.0/0 [1/0] via 10.1.1.1
S     10.2.0.0/16 [1/0] via 10.1.1.254
S     192.168.100.0/24 [130/0] via 192.168.50.1
```

**4. Test Reachability**
```cisco
Router# ping 192.168.10.50
Type escape sequence to abort.
Sending 5, 100-byte ICMP Echos to 192.168.10.50, timeout is 2 seconds:
!!!!!
Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms

Router# traceroute 192.168.10.50
Type escape sequence to abort.
Tracing the route to 192.168.10.50
1 10.1.1.254 4 msec 4 msec 4 msec
2 192.168.10.50 8 msec 8 msec 8 msec
```

---

## Troubleshooting Static Routes

### Common Issues

**1. No Route to Destination**

**Symptoms:**
- Ping fails with "Destination host unreachable"
- Traceroute shows incomplete path

**Diagnosis:**
```cisco
Router# show ip route 192.168.50.0
% Network not in table

Router# show ip interface brief
Interface              IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0     10.1.1.2        YES manual up                    up
GigabitEthernet0/1     unassigned      YES unset  administratively down down
```

**Solutions:**
- Add missing static route
- Check interface status (must be up/up)
- Verify next-hop reachability

**2. Wrong Next-Hop or Exit Interface**

**Symptoms:**
- Packets sent to wrong router
- Routing loop (TTL exceeded)

**Diagnosis:**
```cisco
Router# traceroute 192.168.50.10
1 10.1.1.254 4 msec 4 msec 4 msec
2 10.1.1.2 4 msec 4 msec 4 msec  ← Loop!
3 10.1.1.254 4 msec * 8 msec
4 10.1.1.2 8 msec 8 msec *
```

**Solutions:**
- Verify next-hop IP address is correct
- Check next-hop router has route back (return path)
- Use traceroute to identify where packets go wrong

**3. Next-Hop Not Reachable**

**Symptoms:**
- Static route appears in config but not in routing table

**Diagnosis:**
```cisco
Router# show running-config | include ip route
ip route 192.168.50.0 255.255.255.0 10.99.99.1

Router# show ip route static
! No output - static route not installed

Router# show ip route 10.99.99.1
% Network not in table  ← Next-hop not reachable!
```

**Solutions:**
- Ensure next-hop IP is in a directly connected network
- Add route to next-hop network
- Use exit interface instead of next-hop IP

**4. Overlapping Routes (Longest Prefix Match)**

**Symptoms:**
- Traffic goes via unexpected path
- More specific route preferred over general route

**Example:**
```cisco
Router# show ip route
S     192.168.0.0/16 [1/0] via 10.1.1.1
S     192.168.10.0/24 [1/0] via 10.1.1.2

Packet to 192.168.10.50:
- Matches both routes
- 192.168.10.0/24 is more specific (/24 > /16)
- Packet sent via 10.1.1.2 (not 10.1.1.1)
```

**Solution:**
- Understand longest prefix match behavior
- Design routing table intentionally
- Use more specific routes for traffic engineering

**5. Return Path Missing (Asymmetric Routing)**

**Symptoms:**
- Ping fails in one direction
- TCP connections timeout

**Diagnosis:**
```cisco
RouterA can reach ServerB (192.168.50.10)
ServerB cannot reach RouterA's network (10.1.1.0/24)

RouterA# ping 192.168.50.10
Success rate is 0 percent (0/5)

ServerB's gateway missing route to 10.1.1.0/24
```

**Solution:**
- Configure routes on BOTH routers
- Ensure return path exists
- Check intermediate routers for complete path

---

## Route Summarization Basics

**Route summarization** (aggregation) combines multiple routes into a single summary route, reducing routing table size.

### Benefits of Summarization
- Smaller routing tables (less memory)
- Faster routing table lookups
- Reduced routing update traffic
- Improved network stability (topology changes hidden)

### Summarization Example

**Before Summarization:**
```
192.168.0.0/24
192.168.1.0/24
192.168.2.0/24
192.168.3.0/24
= 4 separate routes
```

**After Summarization:**
```
192.168.0.0/22
= 1 summary route (covers .0 to .3)
```

**Configuration:**
```cisco
! Instead of 4 routes:
ip route 192.168.0.0 255.255.255.0 10.1.1.1
ip route 192.168.1.0 255.255.255.0 10.1.1.1
ip route 192.168.2.0 255.255.255.0 10.1.1.1
ip route 192.168.3.0 255.255.255.0 10.1.1.1

! Use 1 summary:
ip route 192.168.0.0 255.255.252.0 10.1.1.1
```

### Calculating Summary Routes

**Find common bits in binary:**

```
192.168.0.0   = 11000000.10101000.00000000.00000000
192.168.1.0   = 11000000.10101000.00000001.00000000
192.168.2.0   = 11000000.10101000.00000010.00000000
192.168.3.0   = 11000000.10101000.00000011.00000000
                -----------------------------------------------
Common bits:    11000000.10101000.000000
                = 22 bits = /22

Summary: 192.168.0.0/22 (covers 192.168.0.0 - 192.168.3.255)
```

---

## Summary

**Routing** is the process of forwarding packets between networks using Layer 3 IP addresses. Routers make forwarding decisions by consulting their routing table, which contains known networks and paths.

**Key Concepts:**
- **Router Operation**: Decapsulates frames, examines IP addresses, performs table lookup, decrements TTL, re-encapsulates, and forwards
- **Routing Table**: Contains destination networks, next-hop addresses, exit interfaces, metrics, and administrative distances
- **Administrative Distance (AD)**: Measure of route source trustworthiness (lower = more trusted). Connected=0, Static=1, OSPF=110, RIP=120
- **Metric**: Cost value used to compare routes from the same source (lower = better)
- **Longest Prefix Match**: Most specific route wins, regardless of metric or AD

**Static Routing:**
- **Next-Hop Static**: Specifies next router's IP address
- **Exit Interface Static**: Specifies outgoing interface
- **Default Route**: 0.0.0.0/0 matches all destinations
- **Floating Static**: Backup route with higher AD (e.g., AD=130)
- **Use Cases**: Small networks, stub networks, backup paths, security

**Configuration Best Practices:**
- Use next-hop IP on Ethernet networks
- Use exit interface on point-to-point links
- Configure default route for stub routers
- Use floating statics for redundancy (AD > primary protocol)
- Always configure return paths (bidirectional routing)

**Troubleshooting:**
- Verify route exists: `show ip route <destination>`
- Check interface status: `show ip interface brief`
- Test reachability: `ping` and `traceroute`
- Verify next-hop reachability
- Check for return path on remote router

**CompTIA Network+ Exam Tips:**
- Know Administrative Distance values: Connected=0, Static=1, OSPF=110, RIP=120
- Understand longest prefix match (more specific always wins)
- Remember default route syntax: `ip route 0.0.0.0 0.0.0.0 <next-hop>`
- Know difference between next-hop and exit interface static routes
- Understand floating static routes use higher AD as backup

---

## References

- CompTIA Network+ N10-008 Objectives: 2.2 Compare routing technologies and bandwidth management concepts
- RFC 1812: Requirements for IPv4 Routers
- Cisco IOS IP Routing Configuration Guide
- "Routing TCP/IP, Volume 1" - Jeff Doyle
