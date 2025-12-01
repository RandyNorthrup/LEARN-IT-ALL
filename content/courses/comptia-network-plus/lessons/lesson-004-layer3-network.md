---
id: layer3-network
title: Layer 3 - The Network Layer
chapterId: ch1-networking-fundamentals
order: 4
duration: 50
objectives:
  - Understand the functions and responsibilities of the Network layer
  - Explain IP addressing (IPv4 and IPv6 basics)
  - Identify the components of an IP packet
  - Understand how routers operate at Layer 3
  - Explain routing concepts and routing table basics
  - Understand ICMP and its role in network diagnostics
---

# Lesson 4: Layer 3 - The Network Layer

## Learning Objectives
- Understand the functions and responsibilities of the Network layer
- Explain IP addressing (IPv4 and IPv6 basics)
- Identify the components of an IP packet
- Understand how routers operate at Layer 3
- Explain routing concepts and routing table basics
- Understand ICMP and its role in network diagnostics

## Introduction

The **Network layer** (Layer 3) is responsible for logical addressing and routing packets across different networks. Unlike Layer 2, which only handles communication within the same network segment, Layer 3 enables end-to-end communication across multiple networks.

### Key Responsibilities

1. **Logical addressing** using IP addresses
2. **Routing** packets between different networks
3. **Packet forwarding** based on destination IP
4. **Fragmentation and reassembly** when needed
5. **Path determination** - choosing best route
6. **Quality of Service (QoS)** - prioritizing traffic

---

## Network Layer Functions

### Logical Addressing

**IP addresses** provide unique identification for devices across interconnected networks.

**Characteristics:**
- Hierarchical (network portion + host portion)
- Routable across networks
- Assigned by administrator or DHCP
- Can change when device moves networks
- Two versions: IPv4 (32-bit) and IPv6 (128-bit)

**Comparison: MAC vs. IP Addresses**

| Feature | MAC Address (Layer 2) | IP Address (Layer 3) |
|---------|----------------------|---------------------|
| **Type** | Physical | Logical |
| **Assignment** | Manufacturer (burned-in) | Administrator/DHCP |
| **Scope** | Local network | Global (internetwork) |
| **Changes** | Rarely (can be spoofed) | Frequently |
| **Format** | 48-bit hex (6 bytes) | IPv4: 32-bit, IPv6: 128-bit |
| **Routing** | Not routable | Routable |

### Routing

**Routing** is the process of forwarding packets from source network to destination network through intermediate routers.

**Key concepts:**
- **Hop:** Movement from one router to the next
- **Metric:** Cost of a route (based on distance, speed, etc.)
- **Default gateway:** Router used when destination is not on local network
- **Routing table:** Database of known networks and how to reach them

### Packet Forwarding

Routers make forwarding decisions based on:
1. Destination IP address in packet
2. Routing table lookup
3. Best matching route (longest prefix match)
4. Forward to next-hop router or directly to destination

---

## IPv4 Addressing

**IPv4** uses 32-bit addresses, written in dotted-decimal notation.

### Format

**Binary:** `11000000.10101000.00000001.00000001`  
**Decimal:** `192.168.1.1`

### IPv4 Address Classes (Historical)

| Class | First Octet | Default Mask | Networks | Hosts per Network | Purpose |
|-------|------------|--------------|----------|-------------------|---------|
| **A** | 1-126 | /8 (255.0.0.0) | 126 | 16,777,214 | Large organizations |
| **B** | 128-191 | /16 (255.255.0.0) | 16,384 | 65,534 | Medium organizations |
| **C** | 192-223 | /24 (255.255.255.0) | 2,097,152 | 254 | Small organizations |
| **D** | 224-239 | N/A | N/A | N/A | Multicast |
| **E** | 240-255 | N/A | N/A | N/A | Experimental |

**Note:** Classful addressing is obsolete. Modern networks use CIDR (Classless Inter-Domain Routing).

### Special IPv4 Addresses

| Address/Range | Purpose |
|---------------|---------|
| **0.0.0.0/8** | "This network" (used in routing) |
| **127.0.0.0/8** | Loopback (localhost) - 127.0.0.1 most common |
| **169.254.0.0/16** | APIPA (Automatic Private IP Addressing) - DHCP failure |
| **10.0.0.0/8** | Private network (Class A) |
| **172.16.0.0/12** | Private network (Class B) |
| **192.168.0.0/16** | Private network (Class C) |
| **224.0.0.0/4** | Multicast addresses |
| **255.255.255.255** | Broadcast (limited broadcast) |

### Public vs. Private IP Addresses

**Public IP addresses:**
- Routable on the Internet
- Must be unique globally
- Assigned by ISPs (from regional Internet registries)
- Limited availability (IPv4 exhaustion)

**Private IP addresses:**
- **NOT** routable on the Internet
- Can be used by anyone internally
- Must use NAT to access Internet
- Defined in RFC 1918

**RFC 1918 Private Ranges:**
- `10.0.0.0/8` (10.0.0.0 - 10.255.255.255) - 16.7 million addresses
- `172.16.0.0/12` (172.16.0.0 - 172.31.255.255) - 1 million addresses
- `192.168.0.0/16` (192.168.0.0 - 192.168.255.255) - 65,536 addresses

---

## IPv4 Packet Structure

An **IPv4 packet** (or datagram) encapsulates the Transport layer segment.

### IPv4 Header Fields

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |         Header Checksum       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source IP Address                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination IP Address                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (if IHL > 5)                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### Key Header Fields

**1. Version (4 bits)**
- IP version: 4 for IPv4, 6 for IPv6

**2. IHL - Internet Header Length (4 bits)**
- Header length in 32-bit words
- Minimum: 5 (20 bytes), Maximum: 15 (60 bytes)

**3. Type of Service (ToS) / DiffServ (8 bits)**
- QoS and priority information
- Used for traffic prioritization

**4. Total Length (16 bits)**
- Total packet size (header + data)
- Maximum: 65,535 bytes
- Typical: 1500 bytes (Ethernet MTU)

**5. Identification (16 bits)**
- Unique identifier for packet fragments
- Used for reassembly

**6. Flags (3 bits)**
- **Bit 0:** Reserved (always 0)
- **Bit 1:** DF (Don't Fragment) - prevents fragmentation
- **Bit 2:** MF (More Fragments) - indicates more fragments coming

**7. Fragment Offset (13 bits)**
- Position of fragment in original packet
- Measured in 8-byte blocks

**8. Time to Live (TTL) - 8 bits**
- Maximum hops before packet is discarded
- Decremented by 1 at each router
- Prevents infinite routing loops
- Typical initial values: 64, 128, 255

**9. Protocol (8 bits)**
- Upper layer protocol using this packet
- Values: 1 = ICMP, 6 = TCP, 17 = UDP, 89 = OSPF

**10. Header Checksum (16 bits)**
- Error detection for header only (not data)
- Recalculated at each hop (due to TTL change)

**11. Source IP Address (32 bits)**
- IP address of sender

**12. Destination IP Address (32 bits)**
- IP address of final destination

**13. Options (variable)**
- Rarely used in modern networks
- Can include security, timestamps, routing info

---

## How Routers Work

A **router** is a Layer 3 device that forwards packets between different networks based on IP addresses.

### Router Functions

**1. Path Determination**
- Examine destination IP address
- Consult routing table
- Select best path based on metrics

**2. Packet Forwarding**
- Receive packet on one interface
- Remove Layer 2 frame (de-encapsulation)
- Examine Layer 3 packet
- Determine exit interface
- Create new Layer 2 frame (re-encapsulation)
- Forward packet out appropriate interface

**3. TTL Decrement**
- Reduce TTL by 1
- If TTL reaches 0, drop packet and send ICMP "Time Exceeded"

### Routing Table

A **routing table** contains routes to known networks.

**Route Entry Components:**
- **Destination network:** Network address with prefix length
- **Next-hop:** IP address of next router OR "directly connected"
- **Interface:** Local interface to send packet out
- **Metric:** Cost of route (lower is better)
- **Administrative distance:** Trustworthiness of route source

**Example Routing Table:**
```
Destination      Mask            Gateway         Interface    Metric
0.0.0.0          0.0.0.0         192.168.1.1     eth0         1    (default route)
192.168.1.0      255.255.255.0   0.0.0.0         eth0         0    (directly connected)
10.0.0.0         255.255.255.0   192.168.1.254   eth0         10
172.16.0.0       255.255.0.0     192.168.1.254   eth0         20
```

### Routing Types

**Static Routing:**
- Manually configured by administrator
- Routes don't change automatically
- Simple, predictable
- Good for small networks or specific routes
- No overhead, but not scalable

**Dynamic Routing:**
- Routes learned automatically via routing protocols
- Adapts to network changes
- More complex
- Good for large networks
- Examples: RIP, OSPF, EIGRP, BGP

**Default Route:**
- Route of last resort (0.0.0.0/0)
- Used when no specific route matches
- Typically points to ISP or upstream router

---

## Routing Decision Process

When a router receives a packet:

**1. Check Destination IP**
- Is it for this router? → Process locally
- Is it a broadcast? → Drop or process
- Otherwise → Forward

**2. Routing Table Lookup**
- Find most specific matching route (longest prefix match)
- Example: Packet to 192.168.1.50
  - Matches: 192.168.1.0/24 (more specific) ✓
  - Also matches: 192.168.0.0/16 (less specific)
  - Choose: 192.168.1.0/24

**3. Determine Next Hop**
- If directly connected → Send directly to destination
- If not → Send to next-hop router

**4. ARP Resolution (if needed)**
- Get MAC address of next-hop or destination
- Use ARP cache or send ARP request

**5. Re-encapsulate and Forward**
- Create new Layer 2 frame
- Source MAC = router's interface
- Destination MAC = next-hop or destination
- Forward packet

---

## ICMP (Internet Control Message Protocol)

**ICMP** is a Layer 3 protocol used for error reporting and diagnostics.

### ICMP Message Types

| Type | Name | Purpose |
|------|------|---------|
| **0** | Echo Reply | Response to ping |
| **3** | Destination Unreachable | Cannot reach destination |
| **4** | Source Quench | Congestion control (obsolete) |
| **5** | Redirect | Better route available |
| **8** | Echo Request | Ping request |
| **9** | Router Advertisement | Router announces itself |
| **10** | Router Solicitation | Host requests router info |
| **11** | Time Exceeded | TTL reached 0 (traceroute) |
| **12** | Parameter Problem | Malformed packet |

### Destination Unreachable Codes

| Code | Meaning |
|------|---------|
| **0** | Network unreachable |
| **1** | Host unreachable |
| **2** | Protocol unreachable |
| **3** | Port unreachable |
| **4** | Fragmentation needed but DF set |
| **13** | Communication administratively prohibited |

### ICMP Tools

**Ping (Echo Request/Reply):**
- Tests connectivity
- Measures round-trip time (RTT)
- Command: `ping <destination>`
- Example: `ping 8.8.8.8`

**Traceroute/Tracert (Time Exceeded):**
- Shows path packets take
- Uses TTL to discover routers
- Linux/Mac: `traceroute`
- Windows: `tracert`
- Example: `traceroute google.com`

**How Traceroute Works:**
1. Send packet with TTL=1 → First router responds "Time Exceeded"
2. Send packet with TTL=2 → Second router responds
3. Continue until destination reached or max hops

---

## IPv6 Introduction

**IPv6** is the next-generation Internet Protocol with 128-bit addresses.

### Why IPv6?

**Problems with IPv4:**
- Address exhaustion (4.3 billion addresses not enough)
- NAT complexity
- Limited header fields

**IPv6 Benefits:**
- Vast address space: 340 undecillion addresses (3.4 × 10³⁸)
- Simplified header (faster routing)
- Built-in IPsec support
- No NAT required
- Better multicast support
- Autoconfiguration (SLAAC)

### IPv6 Address Format

**Representation:**
- 8 groups of 4 hexadecimal digits
- Separated by colons
- Example: `2001:0db8:0000:0042:0000:8a2e:0370:7334`

**Shortening Rules:**
- Leading zeros in a group can be omitted
  - `2001:0db8:0000:0042` → `2001:db8:0:42`
- One sequence of all-zero groups can be replaced with `::`
  - `2001:0db8:0000:0000:0000:0000:0000:0001` → `2001:db8::1`
- Only one `::` allowed per address

### IPv6 Address Types

**Unicast:**
- Global Unicast: `2000::/3` (routable on Internet)
- Link-Local: `fe80::/10` (not routable, local segment only)
- Loopback: `::1` (equivalent to 127.0.0.1)

**Multicast:**
- `ff00::/8`
- No broadcast in IPv6!

**Anycast:**
- Same address assigned to multiple devices
- Packet routed to nearest instance

---

## Layer 3 Devices

### Router
- Connects different networks
- Forwards based on IP addresses
- Operates at Layer 3
- Breaks up broadcast domains
- Can filter traffic (ACLs)

### Layer 3 Switch (Multilayer Switch)
- Combines switch and router
- High-speed routing between VLANs
- Wire-speed performance
- Common in enterprise networks

---

## Common Layer 3 Issues

### 1. Incorrect Subnet Mask
**Symptom:** Can't reach some devices on "local" network  
**Cause:** Subnet mask misconfigured  
**Solution:** Verify and correct subnet mask

### 2. Wrong Default Gateway
**Symptom:** Can reach local devices but not Internet  
**Cause:** Incorrect or missing default gateway  
**Solution:** Configure correct default gateway

### 3. IP Address Conflict
**Symptom:** Intermittent connectivity, duplicate IP warnings  
**Cause:** Two devices with same IP address  
**Solution:** Use DHCP or assign unique static IPs

### 4. Routing Loop
**Symptom:** Packet loss, high latency  
**Cause:** Circular routing paths  
**Solution:** Fix routing tables, use dynamic routing protocols

### 5. TTL Exceeded
**Symptom:** "Time to live exceeded" errors  
**Cause:** Routing loop or too many hops  
**Solution:** Fix routing loop, increase initial TTL if too many legitimate hops

---

## Troubleshooting Layer 3

### Common Commands

**Check IP configuration:**
- Windows: `ipconfig /all`
- Linux/Mac: `ifconfig` or `ip addr`

**Test connectivity:**
- `ping <destination>` - Test reachability
- `ping -t <destination>` - Continuous ping (Windows)
- `ping -c 10 <destination>` - 10 pings (Linux/Mac)

**Trace route:**
- Windows: `tracert <destination>`
- Linux/Mac: `traceroute <destination>`

**View routing table:**
- Windows: `route print`
- Linux: `ip route` or `route -n`
- Mac: `netstat -rn`

**Check ARP cache:**
- Windows: `arp -a`
- Linux: `ip neigh` or `arp -n`

---

## Summary

The Network layer (Layer 3) enables internetwork communication:

**Key Functions:**
- **Logical addressing** using IP addresses (IPv4 and IPv6)
- **Routing** packets across multiple networks
- **Packet forwarding** based on routing tables
- **Path determination** to find best route

**Key Devices:**
- **Routers** connect different networks
- **Layer 3 switches** provide high-speed routing

**Key Protocols:**
- **IP (IPv4/IPv6)** for logical addressing and packet delivery
- **ICMP** for error reporting and diagnostics
- **ARP** (Layer 2.5) for IP-to-MAC resolution

**Remember:** The Network layer makes it possible for devices on different networks to communicate, which is essential for the Internet and large enterprise networks.

---

## References

- **CompTIA Network+ N10-008 Objective 1.1**: OSI Model - Network Layer
- **CompTIA Network+ N10-008 Objective 1.4**: IPv4 and IPv6 Addressing
- **RFC 791**: Internet Protocol (IPv4)
- **RFC 2460**: Internet Protocol Version 6 (IPv6)
- **RFC 792**: Internet Control Message Protocol (ICMP)
- **Professor Messer**: N10-008 Network+ Course