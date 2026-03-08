---
id: lesson-044-ipv4-address-classes
title: IPv4 Address Classes
chapterId: ch2-ip-addressing
order: 44
duration: 70
objectives:
  - Understand classful IPv4 addressing (Class A, B, C, D, E)
  - Identify address class from the first octet
  - Recognize default subnet masks for each class
  - Understand classful addressing limitations
  - Explain CIDR and classless addressing
---

# Lesson 44: IPv4 Address Classes

## Learning Objectives
- Understand classful IPv4 addressing (Class A, B, C, D, E)
- Identify address class from the first octet
- Recognize default subnet masks for each class
- Understand the transition from classful to classless addressing
- Calculate network and host capacities for each class

## Introduction

When IPv4 was first developed, addresses were organized into **classes** based on the first octet value. This **classful addressing** system provided a simple way to allocate addresses to organizations of different sizes. While classful addressing is largely obsolete today (replaced by CIDR), understanding address classes is still important for:

- **Exam preparation** (CompTIA Network+ tests this concept)
- **Legacy network support**
- **Quick subnet identification**
- **Understanding modern classless addressing context**

**Historical Note:** Classful addressing was used from 1981 to 1993, when CIDR was introduced to address IPv4 exhaustion caused by inefficient class-based allocation.

---

## The Five IPv4 Address Classes

IPv4 addresses are divided into five classes (A through E) based on the value of the first octet:

| Class | First Octet Range | Default Mask | Network Bits | Host Bits | Purpose |
|-------|-------------------|--------------|--------------|-----------|---------|
| A     | 1 - 126           | /8 (255.0.0.0) | 8 | 24 | Large organizations |
| B     | 128 - 191         | /16 (255.255.0.0) | 16 | 16 | Medium organizations |
| C     | 192 - 223         | /24 (255.255.255.0) | 24 | 8 | Small organizations |
| D     | 224 - 239         | N/A | N/A | N/A | Multicast |
| E     | 240 - 255         | N/A | N/A | N/A | Experimental/Reserved |

**Quick Memory Aid:**
- **A**pple (1-126) - **A**wesome big networks
- **B**anana (128-191) - **B**ig medium networks
- **C**arrot (192-223) - **C**ute small networks
- **D**ate (224-239) - **D**istribute multicast
- **E**xtra (240-255) - **E**xperimental zone

---

## Class A Addresses

### Class A Overview

```
First Octet Range: 1 - 126
First Bits: 0xxxxxxx (always starts with 0)
Default Mask: 255.0.0.0 (/8)
Network Bits: 8
Host Bits: 24
```

### Class A Structure

```
Format: N.H.H.H
Where: N = Network, H = Host

Example: 10.50.100.200
         ↑   └─────┘
      Network  Hosts
```

### Class A Binary Pattern

```
First Octet: 0xxxxxxx

Valid Range:
00000001 = 1    (minimum)
01111110 = 126  (maximum)

Note: 127.x.x.x reserved for loopback (localhost)
```

### Class A Calculations

```
Total Class A Networks: 126
(0.x.x.x and 127.x.x.x are reserved)

Hosts per Network: 2^24 - 2 = 16,777,214 hosts
(Massive! Suitable for the largest organizations)

Example Networks:
- 10.0.0.0 (private)
- 15.0.0.0
- 50.0.0.0
```

### Class A Examples

**Example 1: Identify the network**
```
IP: 25.100.50.200
Class: A (first octet 25 is in range 1-126)
Default Mask: 255.0.0.0
Network: 25.0.0.0
Host Range: 25.0.0.1 - 25.255.255.254
Broadcast: 25.255.255.255
```

**Example 2: Private Class A**
```
IP: 10.1.1.1
Network: 10.0.0.0/8
Private: Yes (RFC 1918)
Hosts: 16,777,214
Common Use: Large enterprise internal networks
```

### Class A Allocation History

```
Original Class A Assignments:
- IBM: 9.0.0.0/8
- MIT: 18.0.0.0/8  
- Apple: 17.0.0.0/8
- Xerox: 13.0.0.0/8
- Ford: 19.0.0.0/8

Problem: Wasteful! Most organizations don't need 16 million addresses
```

---

## Class B Addresses

### Class B Overview

```
First Octet Range: 128 - 191
First Bits: 10xxxxxx (always starts with 10)
Default Mask: 255.255.0.0 (/16)
Network Bits: 16
Host Bits: 16
```

### Class B Structure

```
Format: N.N.H.H
Where: N = Network, H = Host

Example: 172.16.50.100
         └──┘ └───┘
       Network Hosts
```

### Class B Binary Pattern

```
First Octet: 10xxxxxx

Valid Range:
10000000 = 128 (minimum)
10111111 = 191 (maximum)
```

### Class B Calculations

```
Total Class B Networks: 16,384
(2^14 networks)

Hosts per Network: 2^16 - 2 = 65,534 hosts
(Good for medium-sized organizations)

Example Networks:
- 172.16.0.0 (private)
- 150.100.0.0
- 180.25.0.0
```

### Class B Examples

**Example 1: University network**
```
IP: 130.208.45.67
Class: B (first octet 130 is in range 128-191)
Default Mask: 255.255.0.0
Network: 130.208.0.0
Host Range: 130.208.0.1 - 130.208.255.254
Broadcast: 130.208.255.255
Total Hosts: 65,534
```

**Example 2: Private Class B**
```
IP: 172.16.10.50
Network: 172.16.0.0/16
Private: Yes (RFC 1918)
Range: 172.16.0.0 - 172.31.0.0 (16 Class B networks)
Common Use: Medium enterprise networks
```

---

## Class C Addresses

### Class C Overview

```
First Octet Range: 192 - 223
First Bits: 110xxxxx (always starts with 110)
Default Mask: 255.255.255.0 (/24)
Network Bits: 24
Host Bits: 8
```

### Class C Structure

```
Format: N.N.N.H
Where: N = Network, H = Host

Example: 192.168.1.100
         └────┘ └┘
        Network Host
```

### Class C Binary Pattern

```
First Octet: 110xxxxx

Valid Range:
11000000 = 192 (minimum)
11011111 = 223 (maximum)
```

### Class C Calculations

```
Total Class C Networks: 2,097,152
(2^21 networks)

Hosts per Network: 2^8 - 2 = 254 hosts
(Perfect for small networks)

Example Networks:
- 192.168.1.0 (private)
- 200.50.100.0
- 210.10.5.0
```

### Class C Examples

**Example 1: Small office network**
```
IP: 200.100.50.75
Class: C (first octet 200 is in range 192-223)
Default Mask: 255.255.255.0
Network: 200.100.50.0
Host Range: 200.100.50.1 - 200.100.50.254
Broadcast: 200.100.50.255
Total Hosts: 254
```

**Example 2: Private Class C**
```
IP: 192.168.10.50
Network: 192.168.10.0/24
Private: Yes (RFC 1918)
Range: 192.168.0.0 - 192.168.255.0 (256 Class C networks)
Common Use: Home/small office networks, most common!
```

---

## Class D Addresses (Multicast)

### Class D Overview

```
First Octet Range: 224 - 239
First Bits: 1110xxxx (always starts with 1110)
Purpose: Multicast (one-to-many communication)
No subnet mask: Not used for host addressing
```

### Multicast Concepts

**Multicast** sends data to multiple recipients simultaneously without using broadcast:

```
Unicast:   One sender → One receiver
Broadcast: One sender → All receivers
Multicast: One sender → Group of receivers
```

### Common Multicast Addresses

| Address | Purpose |
|---------|---------|
| 224.0.0.0 - 224.0.0.255 | Reserved link-local multicast |
| 224.0.0.1 | All hosts on subnet |
| 224.0.0.2 | All routers on subnet |
| 224.0.0.5 | OSPF routers |
| 224.0.0.6 | OSPF designated routers |
| 224.0.0.9 | RIPv2 routers |
| 224.0.0.13 | PIM routers |
| 239.0.0.0 - 239.255.255.255 | Administratively scoped |

### Multicast Examples

**Example: Video streaming**
```
Multicast Group: 239.192.1.100
Purpose: Corporate video broadcast
Benefit: Single stream serves multiple viewers
Efficiency: Saves bandwidth vs. multiple unicast streams

Traditional Unicast:
Server → Client1 (separate stream)
Server → Client2 (separate stream)
Server → Client3 (separate stream)
Bandwidth: 3x video bitrate

Multicast:
Server → Network (single stream)
Network → Clients (replicated by routers)
Bandwidth: 1x video bitrate
```

### Multicast Address Scoping

Multicast addresses are organized into scopes that control how far multicast traffic travels:

| Range | Scope | Forwarded by Routers? | Purpose |
|-------|-------|----------------------|---------|
| 224.0.0.0/24 | Link-local | No | Protocols on the local segment (OSPF, RIP, HSRP) |
| 224.0.1.0 – 238.255.255.255 | Globally scoped | Yes | Internet-wide multicast (rare in practice) |
| 239.0.0.0/8 | Administratively scoped | Controlled | Enterprise-internal multicast (SSM) |

**Link-local multicast** (224.0.0.0/24) is critical for network protocols. These packets have TTL=1 and are **never forwarded** by routers:

```
224.0.0.1  → All hosts on the local subnet
224.0.0.2  → All multicast-capable routers
224.0.0.5  → OSPF all routers (Hello packets)
224.0.0.6  → OSPF designated routers (DR/BDR)
224.0.0.9  → RIPv2 routers
224.0.0.10 → EIGRP routers
224.0.0.13 → PIM routers
224.0.0.18 → VRRP routers
224.0.0.102 → HSRP routers (v2)
224.0.0.251 → mDNS (Bonjour/Avahi)
224.0.0.252 → LLMNR (Link-Local Multicast Name Resolution)
```

### IGMP (Internet Group Management Protocol)

**IGMP** operates between hosts and their local router, allowing hosts to join and leave multicast groups dynamically. It operates at Layer 3 (Network) and uses IP protocol number 2.

**IGMPv2 Operation (RFC 2236):**

```
┌──────────┐                           ┌──────────┐
│  Router   │                           │   Host   │
│ (Querier) │                           │ (Client) │
└─────┬─────┘                           └─────┬────┘
      │                                       │
      │  1. Membership Query (224.0.0.1)       │
      │──────────────────────────────────────►│
      │     "Who wants multicast traffic?"     │
      │                                       │
      │  2. Membership Report (group addr)     │
      │◄──────────────────────────────────────│
      │     "I want to receive 239.1.1.1"     │
      │                                       │
      │  3. Router forwards multicast traffic  │
      │  ════════════════════════════════════►│
      │                                       │
      │  4. Leave Group (224.0.0.2)            │
      │◄──────────────────────────────────────│
      │     "I no longer want 239.1.1.1"      │
      │                                       │
      │  5. Group-Specific Query (239.1.1.1)   │
      │──────────────────────────────────────►│
      │     "Does anyone still want this?"     │
      │                                       │
      │  (No response → stop forwarding)       │
      │                                       │
```

| IGMP Message | Destination | Purpose |
|--------------|-------------|---------|
| General Query | 224.0.0.1 (all hosts) | Router polls: "Which groups are wanted?" |
| Membership Report | Group address | Host replies: "I want this group" |
| Leave Group | 224.0.0.2 (all routers) | Host signals: "I'm leaving this group" |
| Group-Specific Query | Specific group | Router verifies: "Anyone still listening?" |

**IGMPv3 (RFC 3376)** adds **source filtering** — hosts can specify which sources they want to receive from:
```
IGMPv2: "I want group 239.1.1.1"         (any source)
IGMPv3: "I want group 239.1.1.1 from 10.0.0.5"  (specific source)
```

This enables **Source-Specific Multicast (SSM)**, where receivers choose both the group and the source. SSM uses the 232.0.0.0/8 range and eliminates the need for a Rendezvous Point.

### IGMP Snooping

Switches (Layer 2) don't understand multicast by default — they flood multicast frames to all ports like broadcast. **IGMP snooping** solves this:

```
Without IGMP Snooping:                With IGMP Snooping:
Switch floods to ALL ports             Switch forwards only to members

  ┌────┐                                ┌────┐
  │ SW │→ Port 1 (wants it) ✓           │ SW │→ Port 1 (wants it) ✓
  │    │→ Port 2 (doesn't want it) ✗    │    │  Port 2 (not forwarded) 
  │    │→ Port 3 (doesn't want it) ✗    │    │→ Port 3 (wants it) ✓
  │    │→ Port 4 (wants it) ✓           │    │  Port 4 (not forwarded)
  └────┘                                └────┘
  Bandwidth wasted on ports 2,3         Only members receive traffic
```

The switch inspects IGMP join/leave messages and builds a multicast forwarding table mapping groups to ports. IGMP snooping is enabled by default on most managed switches.

### PIM (Protocol Independent Multicast)

While IGMP operates between hosts and their local router, **PIM** operates between routers to build multicast distribution trees across the network. PIM is "protocol independent" because it uses the existing unicast routing table (from OSPF, EIGRP, etc.) rather than maintaining its own.

**PIM Sparse Mode (PIM-SM)** is the dominant multicast routing protocol in enterprise networks:

```
Key Concepts:

Rendezvous Point (RP): Central router where senders register and
                       receivers join. Acts as the meeting point.

Shared Tree (*,G):     Traffic flows: Source → RP → Receivers
                       Represented as (*,G) — any source, group G
                       Less efficient but simple setup

Shortest-Path Tree:    Traffic flows: Source → Receivers (direct)
(S,G)                  Represented as (S,G) — specific source S, group G
                       More efficient, built after traffic threshold

PIM Join:  Router signals upstream "I have receivers for group G"
PIM Prune: Router signals upstream "No more receivers — stop sending"
```

```
PIM-SM Shared Tree vs Shortest-Path Tree:

Shared Tree (*,G):                Shortest-Path Tree (S,G):
                                  
    Source                            Source
      │                                │
      ▼                                ▼
     RP ◄── All traffic via RP       Router A (direct path)
    / \                               │
   ▼   ▼                              ▼
 Rcv1  Rcv2                         Rcv1   Rcv2 ← via Router B
                                           (direct from source)
```

### Enterprise Multicast Use Cases

| Use Case | Protocol | Why Multicast? |
|----------|----------|----------------|
| **IPTV / Video streaming** | IGMP + PIM-SM | One stream serves thousands of viewers simultaneously |
| **Video conferencing** | RTP multicast | Reduces bandwidth vs N separate unicast streams |
| **OS deployment** (WDS/SCCM) | IGMP | Deploy a disk image to 100 PCs simultaneously |
| **Financial market data** | Multicast | Ultra-low-latency one-to-many price distribution |
| **Network protocol discovery** | Link-local multicast | OSPF, EIGRP, RIPv2 use multicast for neighbor communication |
| **Service discovery** | mDNS (224.0.0.251) | Apple Bonjour, Linux Avahi for zero-config networking |

### Multicast vs Unicast vs Broadcast vs Anycast

```
┌────────────┬─────────────────┬──────────────────┬────────────────┐
│   Type     │ Destinations    │ Efficiency       │ Example        │
├────────────┼─────────────────┼──────────────────┼────────────────┤
│ Unicast    │ Exactly one     │ Scales poorly    │ HTTP request   │
│            │                 │ (N streams for   │ to web server  │
│            │                 │  N receivers)    │                │
├────────────┼─────────────────┼──────────────────┼────────────────┤
│ Broadcast  │ All hosts on    │ Wastes bandwidth │ ARP request,   │
│            │ subnet          │ (forces all to   │ DHCP discover  │
│            │                 │  process)        │                │
├────────────┼─────────────────┼──────────────────┼────────────────┤
│ Multicast  │ Subscribed      │ Efficient        │ IPTV, OSPF,    │
│            │ group members   │ (1 stream,       │ video conf.    │
│            │ only            │  replicated at   │                │
│            │                 │  branch points)  │                │
├────────────┼─────────────────┼──────────────────┼────────────────┤
│ Anycast    │ Nearest one     │ Load balancing   │ DNS root       │
│            │ (of many with   │ and geolocation  │ servers,       │
│            │  same address)  │                  │ CDN endpoints  │
└────────────┴─────────────────┴──────────────────┴────────────────┘
```

---

## Class E Addresses (Experimental)

### Class E Overview

```
First Octet Range: 240 - 255
First Bits: 1111xxxx (always starts with 1111)
Purpose: Experimental, reserved for future use
Status: Never implemented, addresses mostly wasted
```

### Special Case: 255.255.255.255

```
Address: 255.255.255.255
Purpose: Limited broadcast (local subnet only)
Behavior: Never forwarded by routers
Use Case: DHCP discovery, ARP, local announcements
```

---

## Quick Class Identification

### Method 1: First Octet Value

```
First Octet    Class
1 - 126        A
127            Loopback (special)
128 - 191      B
192 - 223      C
224 - 239      D (multicast)
240 - 255      E (experimental)
```

### Method 2: First Bits (Binary)

```
First Bits     Class
0xxxxxxx       A
10xxxxxx       B
110xxxxx       C
1110xxxx       D
1111xxxx       E
```

### Practice Identification

| IP Address | First Octet | Class | Default Mask |
|------------|-------------|-------|--------------|
| 15.50.100.200 | 15 | A | 255.0.0.0 |
| 172.16.10.50 | 172 | B | 255.255.0.0 |
| 192.168.1.1 | 192 | C | 255.255.255.0 |
| 224.0.0.5 | 224 | D | N/A |
| 127.0.0.1 | 127 | Loopback | N/A |

---

## Special and Reserved Addresses

### Loopback Addresses (127.0.0.0/8)

```
Range: 127.0.0.0 - 127.255.255.255
Most Common: 127.0.0.1 (localhost)
Purpose: Internal testing, local communication
Behavior: Traffic never leaves the computer

Use Cases:
- Testing TCP/IP stack: ping 127.0.0.1
- Local services: http://127.0.0.1:8080
- Debugging network applications
```

### APIPA (Automatic Private IP Addressing)

```
Range: 169.254.0.0 - 169.254.255.255 (169.254.0.0/16)
Purpose: Self-assigned when DHCP fails
Indication: Problem - no DHCP server available
Scope: Link-local only (no routing)

Example:
Client requests DHCP → No response
Client self-assigns: 169.254.100.50/16
Symptom: Can communicate locally, cannot reach Internet
```

### Documentation Addresses (TEST-NET)

```
Reserved for documentation and examples:
- 192.0.2.0/24 (TEST-NET-1)
- 198.51.100.0/24 (TEST-NET-2)
- 203.0.113.0/24 (TEST-NET-3)

Purpose: Use in documentation, books, training
Should never appear in real networks
```

---

## Private vs. Public Addresses

### RFC 1918 Private Address Ranges

```
Class A: 10.0.0.0 - 10.255.255.255 (10.0.0.0/8)
Class B: 172.16.0.0 - 172.31.255.255 (172.16.0.0/12)
Class C: 192.168.0.0 - 192.168.255.255 (192.168.0.0/16)

Characteristics:
- NOT routable on the public Internet
- Can be used freely by anyone (no registration)
- Requires NAT for Internet access
- Most common in internal networks
```

### Public Addresses

```
Definition: All IP addresses except:
- Private addresses (RFC 1918)
- Loopback (127.0.0.0/8)
- APIPA (169.254.0.0/16)
- Multicast (224.0.0.0/4)
- Reserved ranges

Characteristics:
- Globally unique
- Must be registered/leased from ISP or RIR
- Directly routable on Internet
- Increasingly scarce (IPv4 exhaustion)
```

### Private vs. Public Usage

```
Private Network (behind NAT):
[PC: 192.168.1.100] → [Router] → Internet
                       NAT changes to
                       public IP: 203.0.113.50

Public Network (direct):
[Server: 203.0.113.50] ← → Internet
(No NAT required)
```

---

## Detailed Classful Addressing Reference

### Complete Network and Host Bit Breakdown

The following table provides a comprehensive reference for all five IPv4 address classes, including binary patterns, bit allocation, and capacity:

```
┌───────┬─────────────┬──────────┬────────────┬──────────┬───────────────────┬──────────────┐
│ Class │ First Octet │ Leading  │ Net Bits / │ Default  │ # of Networks     │ Hosts/Network│
│       │ Range       │ Bits     │ Host Bits  │ Mask     │                   │              │
├───────┼─────────────┼──────────┼────────────┼──────────┼───────────────────┼──────────────┤
│ A     │ 1 - 126     │ 0        │ 8 / 24     │ /8       │ 126               │ 16,777,214   │
│ B     │ 128 - 191   │ 10       │ 16 / 16    │ /16      │ 16,384            │ 65,534       │
│ C     │ 192 - 223   │ 110      │ 24 / 8     │ /24      │ 2,097,152         │ 254          │
│ D     │ 224 - 239   │ 1110     │ N/A        │ N/A      │ N/A (multicast)   │ N/A          │
│ E     │ 240 - 255   │ 1111     │ N/A        │ N/A      │ N/A (reserved)    │ N/A          │
└───────┴─────────────┴──────────┴────────────┴──────────┴───────────────────┴──────────────┘
```

### Special Reserved Address Ranges

Several address ranges have special purposes and cannot be assigned to regular hosts:

| Address Range | Name | Purpose |
|---------------|------|---------|
| 0.0.0.0/8 | This Network | Used as source before IP is assigned |
| 10.0.0.0/8 | Private (RFC 1918) | Internal networks, not Internet-routable |
| 100.64.0.0/10 | Shared Address (RFC 6598) | Carrier-Grade NAT (CGNAT) space |
| 127.0.0.0/8 | Loopback | Local host testing (127.0.0.1 = localhost) |
| 169.254.0.0/16 | Link-Local (APIPA) | Auto-assigned when DHCP fails |
| 172.16.0.0/12 | Private (RFC 1918) | Internal networks (172.16-172.31) |
| 192.0.2.0/24 | TEST-NET-1 | Documentation and examples |
| 192.88.99.0/24 | 6to4 Relay | IPv6 transition (deprecated) |
| 192.168.0.0/16 | Private (RFC 1918) | Home/small office networks |
| 198.51.100.0/24 | TEST-NET-2 | Documentation and examples |
| 203.0.113.0/24 | TEST-NET-3 | Documentation and examples |
| 224.0.0.0/4 | Multicast (Class D) | One-to-many communication |
| 240.0.0.0/4 | Reserved (Class E) | Experimental, future use |
| 255.255.255.255/32 | Limited Broadcast | Local subnet broadcast only |

### Historical Context: Why Classful Addressing Was Created

```
Timeline of Classful Addressing:

1981: RFC 791 defines IPv4 with classful architecture
  → Simple allocation: Organization size determines class
  → Easy routing: Class determines mask automatically
  → Internet was small (~200 hosts)

1985-1990: Internet grows rapidly
  → Class B addresses in high demand (medium organizations)
  → Class A blocks mostly wasted (16M addresses each)
  → Class C too small for many organizations

1992: Class B address space nearly exhausted
  → "Class B crisis" - only ~6,000 Class B networks available
  → Projected complete exhaustion within 2 years

1993: RFC 1519 introduces CIDR
  → Classless addressing replaces classful
  → Variable-length prefixes /1 through /32
  → Route aggregation reduces routing table size

1996: RFC 1918 formalizes private address ranges
  → Combined with NAT, extends IPv4 lifetime

2011: IANA exhausts top-level IPv4 pool
  → Regional registries begin running out
  → IPv6 deployment accelerates
```

---

## Classful Addressing Problems

### Issue 1: Wasteful Allocation

```
Company needs 500 hosts
Class C: 254 hosts (too small) ❌
Class B: 65,534 hosts (wastes 65,034 addresses!) ❌

Result: Either too small or extremely wasteful

Waste Calculation Examples:
┌────────────┬─────────┬──────────┬──────────┬───────────┐
│ Need       │ Class   │ Given    │ Wasted   │ Efficiency│
├────────────┼─────────┼──────────┼──────────┼───────────┤
│ 500 hosts  │ B (/16) │ 65,534   │ 65,034   │ 0.76%     │
│ 2,000      │ B (/16) │ 65,534   │ 63,534   │ 3.05%     │
│ 30 hosts   │ C (/24) │ 254      │ 224      │ 11.8%     │
│ 5,000      │ A (/8)  │ 16.7M   │ 16.7M    │ 0.03%     │
└────────────┴─────────┴──────────┴──────────┴───────────┘
```

### Issue 2: Rapid IPv4 Exhaustion

```
Problem: Organizations assigned entire classes
- Class A: 16M addresses (mostly unused)
- Class B: 65K addresses (often excessive)
- Inefficient allocation depleted IPv4 quickly
```

### Issue 3: Routing Table Growth

```
Problem: Each class = separate routing entry
- Internet routers overwhelmed
- Slow routing decisions
- Increased memory requirements
```

---

## Transition to Classless Addressing (CIDR)

### CIDR Introduction

**CIDR (Classless Inter-Domain Routing)** introduced in 1993:

```
Key Changes:
✅ Variable-length subnet masks (VLSM)
✅ Subnetting not limited to class boundaries
✅ Efficient address allocation
✅ Route aggregation (supernetting)
```

### Classful vs CIDR Comparison

| Feature | Classful | CIDR (Classless) |
|---------|----------|------------------|
| **Subnet Mask** | Fixed per class (A=/8, B=/16, C=/24) | Any prefix length (/1 to /32) |
| **Allocation** | Entire class blocks only | Any size block |
| **Flexibility** | Three sizes only | Exact fit possible |
| **Route Aggregation** | Not possible | Supernetting supported |
| **VLSM** | Not supported | Fully supported |
| **Efficiency** | Very low (3-12% typical) | High (80-95% typical) |
| **Routing** | Each network = 1 entry | Aggregated entries |
| **Era** | 1981-1993 | 1993-present |

### CIDR Examples

```
Old Classful:
Company gets 192.168.1.0/24 (254 hosts)
If need 500 hosts, must get 2 more Class C networks
Routing table: 3 entries

New CIDR:
Company gets 192.168.0.0/23 (510 hosts)
Single allocation, single routing entry
More efficient!

CIDR Right-Sizing Examples:
┌────────────┬────────────┬──────────┬───────────┐
│ Need       │ CIDR Block │ Hosts    │ Efficiency│
├────────────┼────────────┼──────────┼───────────┤
│ 500 hosts  │ /23        │ 510      │ 98.0%     │
│ 2,000      │ /21        │ 2,046    │ 97.8%     │
│ 30 hosts   │ /27        │ 30       │ 100%      │
│ 5,000      │ /19        │ 8,190    │ 61.1%     │
│ 2 (PtP)    │ /30        │ 2        │ 100%      │
└────────────┴────────────┴──────────┴───────────┘
```

### Modern Usage

```
Today:
- CIDR used everywhere (classless)
- Classes still useful for quick identification
- Exam questions still test classful concepts
- Legacy systems may still use default masks
```

---

## Real-World Scenario

**Scenario:** You're troubleshooting connectivity issues and discover:

```
Device Configuration:
IP: 192.168.1.100
Mask: 255.0.0.0 (Class A mask!)

Problem: Wrong mask for Class C address
Result: Device thinks 192.168.2.50 is on same network
Fix: Change mask to 255.255.255.0 (correct Class C)
```

**Another Scenario:** Identifying network issues

```
User IP: 169.254.10.50
Symptom: Cannot reach Internet

Analysis:
- 169.254.x.x = APIPA address
- Indicates DHCP failure
- Check: DHCP server availability, network cable, VLAN config

Solution:
1. Verify DHCP server is running
2. Check network cable connection
3. Release/renew: ipconfig /release, ipconfig /renew
```

---

## Key Terms and Definitions

- **Classful Addressing:** Original IPv4 allocation system based on address classes
- **Class A:** First octet 1-126, /8 default mask, 16M hosts
- **Class B:** First octet 128-191, /16 default mask, 65K hosts
- **Class C:** First octet 192-223, /24 default mask, 254 hosts
- **Class D:** Multicast addresses (224-239)
- **Class E:** Experimental/reserved (240-255)
- **Private Addresses:** RFC 1918 ranges, non-routable on Internet
- **Public Addresses:** Globally routable, must be unique
- **APIPA:** 169.254.0.0/16, self-assigned when DHCP fails
- **Loopback:** 127.0.0.0/8, internal testing
- **CIDR:** Classless Inter-Domain Routing, replaced classful addressing

---

## Summary

IPv4 address classes provide historical context and quick identification:

1. **Class A** (1-126): Large networks, /8, 16M hosts
2. **Class B** (128-191): Medium networks, /16, 65K hosts
3. **Class C** (192-223): Small networks, /24, 254 hosts
4. **Class D** (224-239): Multicast groups
5. **Class E** (240-255): Experimental
6. **Private ranges:** 10/8, 172.16/12, 192.168/16
7. **Special addresses:** Loopback (127/8), APIPA (169.254/16)
8. **Modern networks:** Use CIDR (classless), not limited by classes

While classful addressing is obsolete, understanding classes helps with troubleshooting and exam preparation!

---

## Practice Questions


**Q1.** Which first-octet range identifies a Class B IPv4 address?

A) 1–126
B) 128–191
C) 192–223
D) 224–239

<details>
<summary>Answer</summary>

**B)** Class B addresses have a first octet in the range 128–191 (binary pattern 10xxxxxx). Class A is 1–126, Class C is 192–223, and Class D (multicast) is 224–239.
</details>


**Q2.** What is the purpose of Class D addresses (224–239)?

A) Unicast addressing for large organizations
B) Experimental and reserved use
C) Multicast group communication
D) Private network addressing

<details>
<summary>Answer</summary>

**C)** Class D addresses (224.0.0.0–239.255.255.255) are reserved for multicast communication, where data is sent to a group of interested receivers simultaneously. Examples include OSPF (224.0.0.5/224.0.0.6) and streaming media. Class E (240–255) is experimental/reserved. Class A handles large unicast networks, and private addressing is defined by RFC 1918 across multiple classes.
</details>


**Q3.** An IP address begins with 200. What is its default classful subnet mask?

A) 255.0.0.0
B) 255.255.0.0
C) 255.255.255.0
D) 255.255.255.128

<details>
<summary>Answer</summary>

**C)** An address starting with 200 falls in the Class C range (192–223). The default Class C subnet mask is 255.255.255.0 (/24), providing 8 host bits. 255.0.0.0 is the Class A default, 255.255.0.0 is the Class B default, and 255.255.255.128 is a subnetted mask (/25).
</details>


**Q4.** A Class A network using its default /8 subnet mask can support how many usable host addresses?

A) 254
B) 65,534
C) 16,777,214
D) 4,294,967,294

<details>
<summary>Answer</summary>

**C)** A Class A /8 network has 24 host bits, yielding 2^24 − 2 = 16,777,214 usable host addresses (subtracting the network and broadcast addresses). 254 is the count for a /24 (Class C default), 65,534 is for a /16 (Class B default), and the last option would require 32 host bits.
</details>


**Q5.** Why was classful IPv4 addressing replaced by CIDR (Classless Inter-Domain Routing)?

A) Classful addressing did not support binary notation
B) Classful addressing wasted large blocks of address space because organizations were assigned entire Class A, B, or C networks regardless of actual need
C) CIDR eliminated the need for subnet masks entirely
D) Classful addressing could not support more than 254 total networks

<details>
<summary>Answer</summary>

**B)** Classful addressing was highly inefficient because organizations received fixed-size blocks (Class A = 16M hosts, Class B = 65K hosts, Class C = 254 hosts) regardless of actual requirements, leading to massive address waste and accelerating IPv4 exhaustion. CIDR (introduced in 1993) allows variable-length subnet allocation (e.g., /20, /22) to match actual needs. CIDR still uses subnet masks — it does not eliminate them.
</details>


## References

- **CompTIA Network+ N10-009:** Domain 1.4 - IPv4 addressing
- **RFC 791:** Internet Protocol specification
- **RFC 1918:** Private address allocation
- **RFC 3927:** APIPA (Link-Local addressing)
- **RFC 4632:** CIDR specification

---

## Next Steps

In Lesson 45, we'll explore **Private vs. Public IP Addressing** in depth:
- RFC 1918 private ranges in detail
- NAT and PAT concepts
- When to use private vs. public
- IPv4 address exhaustion and solutions

Understanding address classes provides the foundation for mastering modern subnetting!
