---
id: lesson-050-ipv6-address-types
title: "IPv6 Address Types and Scopes"
sidebar_label: "Lesson 50: IPv6 Address Types"
description: "Master IPv6 unicast, multicast, and anycast addressing including global, unique local, and link-local scopes"
duration: 90
objectives:
  - Distinguish between IPv6 address types and their uses
  - Understand global unicast address structure and allocation
  - Configure and use unique local addresses (ULA)
  - Work with link-local addresses and zone identifiers
  - Identify IPv6 multicast addresses and their purposes
  - Understand anycast addressing concepts
---

# Lesson 50: IPv6 Address Types and Scopes

## Introduction

IPv6 defines several address types to serve different networking functions. Unlike IPv4's unicast/broadcast/multicast model, IPv6 uses unicast, multicast, and anycast addressing with different scope levels. Understanding these address types is essential for proper IPv6 network design and troubleshooting.

This lesson explores each IPv6 address type, their identifying prefixes, appropriate use cases, and configuration guidelines.

**Key Principle:** IPv6 addresses are categorized by type (unicast/multicast/anycast) and scope (interface/link/site/global).

## IPv6 Address Type Overview

### Address Categories

**Three Primary Types:**
```
1. Unicast - One-to-one communication
   - Global Unicast Address (GUA)
   - Unique Local Address (ULA)
   - Link-Local Address
   - Loopback (::1)
   - Unspecified (::)

2. Multicast - One-to-many communication
   - Replaces IPv4 broadcast
   - Prefix: ff00::/8
   - Various scopes (node, link, site, org, global)

3. Anycast - One-to-nearest communication
   - Same address on multiple interfaces
   - Routing delivers to closest instance
   - No special address format
```

**No Broadcast in IPv6:**
```
IPv4 Broadcast Examples:
  192.168.1.255 (directed broadcast)
  255.255.255.255 (limited broadcast)

IPv6 Replacement:
  All-nodes multicast: ff02::1
  All-routers multicast: ff02::2
  Solicited-node multicast: ff02::1:ffxx:xxxx

Advantages:
  - Reduces unnecessary processing
  - More efficient bandwidth usage
  - Hosts can ignore irrelevant multicasts
  - No broadcast storms
```

## Global Unicast Addresses (GUA)

### Format and Structure

**Identifying Prefix:**
```
Currently Allocated: 2000::/3

Binary prefix: 001xxxxx (first 3 bits)

Valid ranges:
  2000::/3 covers:
    2000:: to 3fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff

Examples:
  2001:db8::/32        (Documentation)
  2001:4860::/32       (Google)
  2606:4700::/32       (Cloudflare)
  2a00:1450::/32       (Google Europe)
```

**Standard GUA Structure:**
```
| 48 bits              | 16 bits  | 64 bits           |
|----------------------|----------|-------------------|
| Global Routing       | Subnet   | Interface ID      |
| Prefix               | ID       |                   |

Example: 2001:db8:1234:5678:abcd:ef01:2345:6789/64

Breakdown:
  2001:db8:1234        - Global routing prefix (48 bits)
  :5678                - Subnet ID (16 bits)
  :abcd:ef01:2345:6789 - Interface ID (64 bits)
```

**Allocation Hierarchy:**
```
IANA (Internet Assigned Numbers Authority)
  ↓ Allocates large blocks
RIR (Regional Internet Registry)
  ↓ ARIN, RIPE, APNIC, LACNIC, AFRINIC
LIR (Local Internet Registry / ISP)
  ↓ Receives /32 or larger
Customer (Organization)
  ↓ Typically receives /48
Subnets
  ↓ Creates /64 subnets
Devices
  ↓ Individual addresses /128
```

### GUA Use Cases

**Public Internet Addressing:**
```
Web Server:
  2001:db8:1234:1::80/64
  
Mail Server:
  2001:db8:1234:2::25/64
  
DNS Server:
  2001:db8:1234:3::53/64

Advantages:
  - Globally routable
  - No NAT required
  - End-to-end connectivity
  - IPsec works without NAT issues
  - Direct peer-to-peer possible
```

**Enterprise Networks:**
```
Site Prefix: 2001:db8:abcd::/48

Subnet Allocation:
  HQ Data Center:     2001:db8:abcd:100::/56
    Web tier:         2001:db8:abcd:100::/64
    App tier:         2001:db8:abcd:101::/64
    DB tier:          2001:db8:abcd:102::/64
    
  Branch Office 1:    2001:db8:abcd:200::/56
  Branch Office 2:    2001:db8:abcd:300::/56
  Remote Workers:     2001:db8:abcd:400::/56
```

## Unique Local Addresses (ULA)

### RFC 4193 ULA Format

**Prefix: fc00::/7**
```
Currently Defined: fd00::/8 (locally assigned)

Format:
| 8 bits | 40 bits      | 16 bits  | 64 bits       |
|--------|--------------|----------|---------------|
| fd     | Global ID    | Subnet   | Interface ID  |
|        | (pseudo-random)         |               |

Full structure:
  fdxx:xxxx:xxxx:yyyy:zzzz:zzzz:zzzz:zzzz

Example:
  fd12:3456:789a:0001::/64
  fd12:3456:789a:0002::/64
  fd12:3456:789a:0003::/64
```

**Generating the Global ID:**
```
RFC 4193 Algorithm:
  1. Obtain EUI-64 identifier from device
  2. Append current timestamp
  3. Compute SHA-1 hash
  4. Use least significant 40 bits

Result: Pseudo-random 40-bit Global ID

Example:
  Time: 2024-11-22 15:30:45
  EUI-64: 00:0c:29:12:34:56:78:9a
  SHA-1 hash: [compute]
  Take last 40 bits: 12:3456:789a
  
  ULA Prefix: fd12:3456:789a::/48

Online generators available for convenience
```

### ULA Use Cases

**Private Internal Networks:**
```
Similar to IPv4 RFC 1918:
  IPv4: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
  IPv6: fd00::/8

Internal Network: fd00:1234:5678::/48

Departments:
  IT:          fd00:1234:5678:0010::/64
  Finance:     fd00:1234:5678:0020::/64
  HR:          fd00:1234:5678:0030::/64
  Engineering: fd00:1234:5678:0040::/64

Advantages:
  - Not routable on Internet (by policy)
  - Stable addressing (doesn't change with ISP)
  - Can use alongside GUA
  - No central registration needed
  - Collision unlikely with proper generation
```

**Dual Addressing Strategy:**
```
Best Practice: Use both GUA and ULA

Server Configuration:
  Public service:
    GUA: 2001:db8:1234:100::80/64
    (Internet-facing)
    
  Internal access:
    ULA: fd12:3456:789a:100::80/64
    (Intranet-only)

Benefits:
  - Internal services available if Internet fails
  - Can firewall GUA while keeping ULA open
  - Internal DNS points to ULA
  - External DNS points to GUA
  - Renumbering GUA doesn't affect internal access
```

**VPN and Site-to-Site:**
```
Corporate VPN Network: fd00:abcd:ef01::/48

Remote sites:
  Site A: fd00:abcd:ef01:0001::/64
  Site B: fd00:abcd:ef01:0002::/64
  Site C: fd00:abcd:ef01:0003::/64
  
VPN clients: fd00:abcd:ef01:1000::/64

Internal routing only, not Internet-routable
```

## Link-Local Addresses

### Format: fe80::/10

**Structure:**
```
Prefix: fe80::/10

Standard implementation: fe80::/64

Format:
| 10 bits | 54 bits  | 64 bits           |
|---------|----------|-------------------|
| fe80    | zeros    | Interface ID      |

Typical address:
  fe80:0000:0000:0000:xxxx:xxxx:xxxx:xxxx
  fe80::xxxx:xxxx:xxxx:xxxx (abbreviated)

Examples:
  fe80::1
  fe80::20c:29ff:fe12:3456
  fe80::abcd:ef01:2345:6789
```

**Mandatory on All IPv6 Interfaces:**
```
Every IPv6-enabled interface MUST have link-local

Automatic Generation:
  1. Interface enabled for IPv6
  2. Link-local automatically assigned
  3. Derived from MAC address (EUI-64) or random
  4. No configuration required

Example:
  Interface: eth0
  MAC: 00:0c:29:ab:cd:ef
  
  Link-Local (EUI-64):
    fe80::20c:29ff:feab:cdef
  
  OR
  
  Link-Local (Privacy):
    fe80::1234:5678:9abc:def0 (random)
```

### Link-Local Characteristics

**Scope: Link-Only**
```
Properties:
  - NOT routable (by design)
  - Valid only on local link (broadcast domain)
  - Packets never leave the subnet
  - Router will not forward
  - Can duplicate across different links

Analogy:
  Similar to IPv4 169.254.0.0/16 (APIPA)
  But link-local is REQUIRED, not a failure state
```

**Critical Functions:**
```
Uses:
  1. Neighbor Discovery Protocol (NDP)
     - Router discovery
     - Address resolution (ARP replacement)
     - Duplicate address detection
  
  2. Router Communications
     - Default gateway is link-local
     - Routing protocol neighbors (OSPFv3, RIPng)
  
  3. Local Management
     - SSH to devices on same link
     - Local troubleshooting
  
  4. Automatic Configuration
     - SLAAC uses router's link-local
     - No DHCP needed for basic connectivity

Key Point: IPv6 networks function with ONLY link-local addresses
          GUA or ULA optional for Internet/WAN connectivity
```

### Zone Identifiers

**Format: address%zone_id**
```
When Needed:
  - Device has multiple interfaces
  - Same link-local on each interface
  - Must specify which interface

Syntax:
  fe80::1%interface_name
  fe80::1%interface_index

Examples:
  Linux:    fe80::1%eth0
  macOS:    fe80::1%en0
  Windows:  fe80::1%2 (interface index)
  BSD:      fe80::1%em0
  
Commands:
  ping fe80::1%eth0
  ssh admin@fe80::20c:29ff:fe12:3456%en0
  traceroute6 fe80::1%eth1
```

**Finding Zone IDs:**
```
Linux:
  $ ip -6 addr show
  $ ifconfig

macOS:
  $ ifconfig
  $ networksetup -listallhardwareports

Windows:
  C:\> netsh interface ipv6 show addresses
  C:\> ipconfig

Example output:
  2: eth0: <BROADCAST,MULTICAST,UP>
     inet6 fe80::20c:29ff:fe5c:1234/64 scope link
     
  Use: fe80::20c:29ff:fe5c:1234%eth0
```

## Multicast Addresses

### Format: ff00::/8

**Multicast Structure:**
```
| 8 bits | 4 bits | 4 bits | 112 bits      |
|--------|--------|--------|---------------|
| ff     | Flags  | Scope  | Group ID      |

Example: ff02::1

Breakdown:
  ff   - Multicast prefix
  0    - Flags (0 = well-known, 1 = transient)
  2    - Scope (2 = link-local)
  ::1  - Group ID (all nodes)
```

**Multicast Flags:**
```
Bit 3 (T): 0 = Permanent, 1 = Temporary
Bit 2 (P): 0 = Not based on unicast, 1 = Based on unicast
Bit 1 (R): Rendezvous point
Bit 0: Reserved

Common:
  ff0x - Permanent (well-known)
  ff1x - Temporary (dynamically assigned)
```

**Multicast Scopes:**
```
Scope  Name           Description
1      Interface      Loopback only
2      Link-local     Single link (most common)
3      Reserved       -
4      Admin-local    Administrative boundary
5      Site-local     Single site/campus
8      Organization   Multiple sites
e      Global         Internet-wide

Examples:
  ff01::1 - All nodes (interface-local)
  ff02::1 - All nodes (link-local)
  ff05::1 - All nodes (site-local)
  ff0e::1 - All nodes (global)
```

### Well-Known Multicast Addresses

**All-Nodes and All-Routers:**
```
ff02::1 - All nodes (link-local)
  Purpose: Reach all devices on link
  Use: NDP, ICMPv6 announcements
  Similar to: IPv4 broadcast 255.255.255.255
  
ff02::2 - All routers (link-local)
  Purpose: Reach all routers on link
  Use: Router discovery, routing updates
  Similar to: IPv4 224.0.0.2 (OSPF)

ff02::5 - All OSPF routers
ff02::6 - All OSPF DR/BDR routers
ff02::9 - All RIP routers
ff02::a - All EIGRP routers
```

**Solicited-Node Multicast:**
```
Format: ff02::1:ffxx:xxxx

Derived from last 24 bits of IPv6 address

Example:
  IPv6 Address: 2001:db8::abcd:ef01:2345:6789
  Last 24 bits: 45:6789
  Solicited-node: ff02::1:ff45:6789

Purpose:
  - Efficient address resolution
  - Duplicate address detection
  - Replaces IPv4 ARP broadcast
  
Advantage:
  Only devices with matching last 24 bits listen
  Much more efficient than broadcast
```

**Other Well-Known Groups:**
```
ff02::fb   - mDNSv6 (Bonjour, multicast DNS)
ff02::1:2  - All DHCP agents
ff02::1:3  - All LLMNR hosts
ff05::1:3  - All DHCPv6 servers (site-local)

ff0x::101  - All NTP servers
ff0x::181  - All PTP devices
```

### Multicast Address Assignment

**Modified EUI-64 for Multicast:**
```
Ethernet Multicast MAC:
  33:33:xx:xx:xx:xx

Last 32 bits of IPv6 multicast → Last 32 bits of MAC

Example:
  Multicast: ff02::1
  MAC: 33:33:00:00:00:01
  
  Multicast: ff02::1:ff12:3456
  MAC: 33:33:ff:12:34:56

Ethernet frames sent to this multicast MAC
```

## Anycast Addresses

### Concept and Use

**Definition:**
```
Anycast: Same address assigned to multiple interfaces
         Routing delivers to nearest instance

No special address format
Any unicast address can be anycast
Configuration declares it as anycast

Example:
  DNS Root Servers use anycast
  Address: 2001:503:ba3e::2:30 (A root server)
  Multiple locations worldwide
  Client reaches geographically nearest instance
```

**How Anycast Works:**
```
Scenario: DNS service on three routers

Router A (New York):    2001:db8::53 (anycast)
Router B (London):      2001:db8::53 (anycast)
Router C (Tokyo):       2001:db8::53 (anycast)

All advertise same route: 2001:db8::53/128

Client in US:
  Routes to Router A (closest)
  
Client in Europe:
  Routes to Router B (closest)
  
Client in Asia:
  Routes to Router C (closest)

Benefits:
  - Load distribution
  - Fault tolerance (automatic failover)
  - Reduced latency
  - DDoS mitigation (traffic distributed)
```

**Common Anycast Applications:**
```
Use Cases:
  1. DNS Root/TLD Servers
     - 13 root server addresses
     - Hundreds of physical servers
     - Anycast distributes load
  
  2. CDN (Content Delivery Networks)
     - Same address, multiple edge servers
     - Client reaches nearest cache
  
  3. Load Balancers
     - Multiple load balancers with same IP
     - High availability
  
  4. Default Gateways
     - Multiple routers share gateway address
     - Automatic failover with routing
  
  5. IPv6 Transition Services
     - 6to4 relay routers
     - Teredo servers
```

**Anycast Configuration:**
```
Cisco IOS Example:
  interface Loopback0
   ipv6 address 2001:db8::53/128 anycast
   
Linux Example:
  ip -6 addr add 2001:db8::53/128 dev lo anycast
  
Key: Routing protocol must advertise the anycast address
     BGP for inter-AS, OSPF/EIGRP for intra-AS
```

## Special-Purpose Addresses

### Reserved for Special Uses

**Loopback:**
```
::1/128

Purpose: Local device testing
Use: Same as IPv4 127.0.0.1
Command: ping ::1

Only one address (not a range like 127.0.0.0/8)
```

**Unspecified:**
```
::/128  or  ::

Purpose: Absence of address
Uses:
  - Source address before configuration
  - Default route (::/0)
  - "Any address" in configurations

Never assigned to interface
```

**IPv4-Mapped IPv6:**
```
Format: ::ffff:192.0.2.1

Structure:
  0:0:0:0:0:ffff:192.0.2.1
  ::ffff:c000:0201 (hex notation)

Purpose:
  Represent IPv4 addresses in IPv6 format
  Used by dual-stack applications
  
Example:
  IPv4: 203.0.113.1
  Mapped: ::ffff:203.0.113.1
  Hex: ::ffff:cb00:7101
```

**IPv4-Compatible IPv6 (Deprecated):**
```
Format: ::192.0.2.1

Was used for tunneling
Now deprecated (RFC 4291)
Don't use in new deployments
```

**Documentation Prefixes:**
```
2001:db8::/32 - For examples and documentation
  Safe to use in manuals
  Not routable on Internet
  
Example addresses:
  2001:db8::1
  2001:db8:1234:5678::1
  2001:db8:dead:beef::1
```

**6to4:**
```
2002::/16 - 6to4 transition mechanism

Format: 2002:AABB:CCDD::/48
  Where AA.BB.CC.DD is IPv4 address

Example:
  IPv4: 203.0.113.1
  6to4: 2002:cb00:7101::/48
```

## Address Selection

### Source Address Selection

**RFC 6724 Rules (Simplified):**
```
When device has multiple addresses, choose source by:

1. Prefer appropriate scope
   Same scope as destination

2. Prefer matching type
   ULA to ULA, GUA to GUA

3. Avoid deprecated addresses

4. Prefer Home addresses (Mobile IPv6)

5. Prefer matching prefix (longest match)

6. Prefer higher precedence label

7. Prefer native vs tunneled

8. Prefer smaller scope (if equal)

9. Longest matching prefix

10. Prefer temporary addresses (privacy)
```

**Example Selection:**
```
Device has:
  - GUA: 2001:db8:1234::1/64
  - ULA: fd00:5678:9abc::1/64
  - Link-local: fe80::1/64

Destination: 2001:db8:5678::1
  Choose: GUA 2001:db8:1234::1
  (Same type and scope)

Destination: fd00:1111:2222::1
  Choose: ULA fd00:5678:9abc::1
  (Matching ULA type)

Destination: fe80::5
  Choose: Link-local fe80::1
  (Matching scope)
```

### Destination Address Selection

**Prefer IPv6 over IPv4:**
```
Modern systems prefer IPv6 if available

DNS returns both A and AAAA records:
  www.example.com
    A: 192.0.2.1 (IPv4)
    AAAA: 2001:db8::1 (IPv6)

Client tries:
  1. IPv6 first (2001:db8::1)
  2. If fails, fallback to IPv4 (192.0.2.1)

"Happy Eyeballs" (RFC 8305):
  - Try IPv6 and IPv4 in parallel
  - Use whichever connects first
  - Improves user experience
```

## Summary

IPv6 address types provide flexible addressing for various needs:

**Unicast Addresses:**
- Global Unicast (2000::/3): Internet-routable, public addresses
- Unique Local (fd00::/8): Private internal networks
- Link-Local (fe80::/10): Mandatory on all interfaces, local communication

**Multicast (ff00::/8):**
- Replaces IPv4 broadcast
- Various scopes (interface, link, site, global)
- Efficient one-to-many communication
- Solicited-node multicast for address resolution

**Anycast:**
- Same address on multiple interfaces
- Routing delivers to nearest instance
- Used for DNS, CDN, load balancing
- No special address format

**Key Concepts:**
- Every interface has link-local automatically
- Devices can have multiple address types simultaneously
- No broadcast in IPv6 (multicast instead)
- Address selection rules determine which to use
- Proper addressing design critical for IPv6 success

**Best Practices:**
- Use GUA for Internet-facing services
- Use ULA for stable internal addressing
- Configure both GUA and ULA (dual addressing)
- Document multicast groups in use
- Plan anycast for high-availability services

## Additional Resources

- **RFC 4291**: IPv6 Addressing Architecture
- **RFC 4193**: Unique Local IPv6 Unicast Addresses
- **RFC 4291**: IPv6 Multicast Address Assignments
- **RFC 6724**: Default Address Selection for IPv6
- **RFC 8305**: Happy Eyeballs Version 2
- **CompTIA Network+ N10-008**: Domain 1.4 - IPv6 address types
- **IANA**: IPv6 Address Space Registry

## Practice Exercises

1. Identify address types: 2001:db8::1, fd12:3456:789a::1, fe80::1, ff02::1

2. Generate ULA prefix for your network (use online tool)

3. What is the solicited-node multicast for 2001:db8::1234:5678:9abc:def0?

4. Why must you use zone ID with link-local addresses sometimes?

5. Design addressing scheme using both GUA (2001:db8::/32) and ULA for a company

6. What scope is ff05::1? ff02::1?

**Answers:**
1. GUA, ULA, Link-local unicast, Link-local multicast
2. fd[random 40 bits]::/48 (e.g., fd12:3456:789a::/48)
3. ff02::1:ffbc:def0
4. Multiple interfaces may have same link-local; zone ID specifies which interface
5. Design should include GUA for external, ULA for internal services
6. ff05 = site-local scope, ff02 = link-local scope
