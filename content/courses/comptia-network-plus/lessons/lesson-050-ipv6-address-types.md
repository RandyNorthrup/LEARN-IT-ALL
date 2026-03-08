---
id: lesson-050-ipv6-address-types
chapterId: ch2-ip-addressing
order: 50
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

## Learning Objectives

After completing this lesson, you will be able to:

- Distinguish between IPv6 address types and their uses
- Understand global unicast address structure and allocation
- Configure and use unique local addresses (ULA)
- Work with link-local addresses and zone identifiers
- Identify IPv6 multicast addresses and their purposes
- Understand anycast addressing concepts

---

## IPv6 Address Type Overview

### Address Type Comparison

The following table provides a comprehensive comparison of all IPv6 address types:

| Feature | Unicast | Multicast | Anycast |
|---------|---------|-----------|----------|
| **Communication** | One-to-one | One-to-many | One-to-nearest |
| **Recipients** | Single interface | Group members | Closest instance |
| **Prefix** | Varies (2000::/3, fc00::/7, fe80::/10) | ff00::/8 | Same as unicast |
| **Scope** | Global, site, link | Interface, link, site, org, global | Same as assigned unicast |
| **Routing** | Standard routing | Group membership (MLD) | Standard routing to nearest |
| **Example** | 2001:db8::1 | ff02::1 | DNS root servers |
| **IPv4 Equivalent** | Unicast | Multicast + Broadcast | No direct equivalent |

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

### Interface ID Generation Methods

IPv6 offers two primary methods for generating the 64-bit Interface ID portion of an address. Understanding both is important for troubleshooting and security.

**Method 1: EUI-64 (Extended Unique Identifier)**

EUI-64 creates a 64-bit Interface ID from the 48-bit MAC address by inserting `FF:FE` in the middle and flipping the 7th bit (Universal/Local bit).

```
EUI-64 Conversion Process:

Step 1: Start with MAC address
  MAC: 00:0c:29:ab:cd:ef

Step 2: Split MAC into two halves
  First half:  00:0c:29
  Second half: ab:cd:ef

Step 3: Insert FF:FE between halves
  00:0c:29:FF:FE:ab:cd:ef

Step 4: Flip the 7th bit (U/L bit) of first byte
  00 in binary: 00000000
  Flip 7th bit:  00000010 = 02
  
  Result: 02:0c:29:FF:FE:ab:cd:ef

Step 5: Convert to IPv6 Interface ID format
  Group into 16-bit pairs: 020c:29ff:feab:cdef

Final Link-Local: fe80::20c:29ff:feab:cdef
Final GUA:        2001:db8:1234:5678:20c:29ff:feab:cdef
```

**Why Flip the U/L Bit?**
```
7th bit = Universal/Local (U/L) bit

In MAC addresses:
  0 = Universally administered (factory-set)
  1 = Locally administered (manually set)

In IPv6 EUI-64 (inverted meaning):
  0 = Locally administered
  1 = Universally administered (factory-set)

The inversion was designed so that manually configured
Interface IDs (starting with 0) would be visually distinct
from auto-generated ones (starting with a modified byte).
```

**More EUI-64 Examples:**

| MAC Address | After FF:FE Insert | After Bit Flip | Interface ID |
|-------------|-------------------|----------------|---------------|
| 00:1A:2B:3C:4D:5E | 00:1A:2B:FF:FE:3C:4D:5E | 02:1A:2B:FF:FE:3C:4D:5E | 021a:2bff:fe3c:4d5e |
| AA:BB:CC:DD:EE:FF | AA:BB:CC:FF:FE:DD:EE:FF | A8:BB:CC:FF:FE:DD:EE:FF | a8bb:ccff:fedd:eeff |
| 00:50:56:12:34:56 | 00:50:56:FF:FE:12:34:56 | 02:50:56:FF:FE:12:34:56 | 0250:56ff:fe12:3456 |

**Method 2: Random (Privacy Extensions, RFC 4941)**

```
Problem with EUI-64:
  - MAC address embedded in IPv6 address
  - Anyone can track a device across networks
  - Privacy concern: device fingerprinting

Solution: Privacy Extensions (RFC 4941)
  - Generate random 64-bit Interface ID
  - No MAC address relationship
  - Temporary addresses that change periodically
  - Default on most modern operating systems

Behavior:
  Windows:  Privacy extensions ON by default
  Linux:    Privacy extensions ON by default (most distros)
  macOS:    Privacy extensions ON by default
  iOS/Android: Privacy extensions ON by default

Result:
  EUI-64:  fe80::20c:29ff:feab:cdef  (predictable)
  Random:  fe80::7d2a:1f8b:4e9c:3a05 (random, changes)
```

**Checking and Configuring Privacy Extensions:**
```bash
# Linux - check current setting
sysctl net.ipv6.conf.all.use_tempaddr
# 0 = disabled, 1 = enabled but prefer public, 2 = prefer temporary

# Linux - enable privacy extensions
sudo sysctl -w net.ipv6.conf.all.use_tempaddr=2

# Windows - check privacy settings
netsh interface ipv6 show privacy

# Windows - enable random IDs
netsh interface ipv6 set privacy state=enabled

# Cisco - disable EUI-64, use random
interface GigabitEthernet0/0
  ipv6 address autoconfig
```

**Link-Local Use Cases:**
```
  1. Neighbor Discovery
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

### Multicast Scope Comparison

Understanding scope boundaries is critical for proper multicast design:

| Scope | Value | Boundary | Routers Forward? | Example Use Case |
|-------|-------|----------|-----------------|------------------|
| Interface-local | 1 | Single interface (loopback) | No | Internal process communication |
| Link-local | 2 | Single link/subnet | No | NDP, address resolution, OSPF |
| Admin-local | 4 | Defined by admin | Configurable | Campus services |
| Site-local | 5 | Single site | Within site | DHCPv6 servers, site services |
| Organization | 8 | Entire organization | Between sites | Company-wide multicast |
| Global | e | Entire Internet | Yes | Internet-wide multicast streams |

### Complete Well-Known Multicast Addresses

The following table lists the most important well-known multicast addresses for the Network+ exam:

| Address | Scope | Purpose | IPv4 Equivalent |
|---------|-------|---------|------------------|
| ff02::1 | Link | All nodes | 224.0.0.1 / 255.255.255.255 |
| ff02::2 | Link | All routers | 224.0.0.2 |
| ff02::5 | Link | All OSPF routers | 224.0.0.5 |
| ff02::6 | Link | All OSPF DR/BDR | 224.0.0.6 |
| ff02::9 | Link | All RIP routers | 224.0.0.9 |
| ff02::a | Link | All EIGRP routers | 224.0.0.10 |
| ff02::d | Link | All PIM routers | 224.0.0.13 |
| ff02::fb | Link | mDNS (Bonjour) | 224.0.0.251 |
| ff02::1:2 | Link | All DHCPv6 relay agents | N/A |
| ff02::1:3 | Link | All LLMNR hosts | 224.0.0.252 |
| ff05::1:3 | Site | All DHCPv6 servers | N/A |
| ff02::1:ffxx:xxxx | Link | Solicited-node | ARP broadcast (replaced) |

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

## Practice Questions

**Q1.** Which IPv6 address prefix identifies a link-local address?

A) 2000::/3
B) fc00::/7
C) fe80::/10
D) ff00::/8

<details>
<summary>Answer</summary>

**C)** Link-local addresses use the prefix fe80::/10. They are automatically assigned to every IPv6-enabled interface and are only valid on the local network segment. 2000::/3 (A) identifies Global Unicast Addresses, fc00::/7 (B) identifies Unique Local Addresses, and ff00::/8 (D) identifies multicast addresses.
</details>

**Q2.** An IPv6 address begins with fd12:3456:789a::1. What type of address is this?

A) Global Unicast Address (GUA)
B) Link-local address
C) Multicast address
D) Unique Local Address (ULA)

<details>
<summary>Answer</summary>

**D)** Addresses beginning with fd (within the fc00::/7 range) are Unique Local Addresses (ULA), which are the IPv6 equivalent of IPv4 private addresses (RFC 1918). They are routable within an organization but not on the public Internet. GUA (A) starts with 2000::/3, link-local (B) starts with fe80::/10, and multicast (C) starts with ff00::/8.
</details>

**Q3.** A network engineer needs to send a message to all IPv6 nodes on the local link. Which address should be used as the destination?

A) ff02::2
B) ff02::1
C) fe80::1
D) ::1

<details>
<summary>Answer</summary>

**B)** The all-nodes multicast address ff02::1 reaches all IPv6-enabled devices on the local link, effectively replacing IPv4's broadcast functionality. ff02::2 (A) is the all-routers multicast address (only routers listen). fe80::1 (C) is a specific link-local unicast address for one device. ::1 (D) is the loopback address, equivalent to IPv4's 127.0.0.1.
</details>

**Q4.** How does IPv6 anycast addressing differ from multicast addressing?

A) Anycast delivers packets to all members of a group, while multicast delivers to the nearest
B) Anycast delivers packets to the nearest member sharing the address, while multicast delivers to all group members
C) Anycast uses a special prefix (ff00::/8), while multicast uses the same prefix as unicast
D) Anycast requires special hardware, while multicast works on standard routers

<details>
<summary>Answer</summary>

**B)** Anycast delivers packets to the topologically nearest interface that shares the anycast address (one-to-nearest), while multicast delivers to all members of a group (one-to-many). Option A reverses the definitions. Anycast uses the same address format as unicast, not ff00::/8 (C). Both work on standard routing infrastructure without special hardware (D).
</details>

**Q5.** Which statement about IPv6 addressing is TRUE?

A) IPv6 uses broadcast addresses to communicate with all devices on a segment
B) Every IPv6 interface must have a manually configured Global Unicast Address
C) An IPv6 interface can have multiple addresses of different types simultaneously
D) Unique Local Addresses are routable on the public Internet

<details>
<summary>Answer</summary>

**C)** An IPv6 interface typically has multiple addresses simultaneously—at minimum a link-local address (auto-assigned) and often a Global Unicast Address and possibly others. IPv6 has no broadcast addresses, using multicast instead (A). Interfaces auto-assign link-local addresses without manual configuration (B). ULAs are not routable on the public Internet by design (D).
</details>

## References

- CompTIA Network+ N10-009 Exam Objectives: Domain 1.4 – IPv6 address types and concepts
- RFC 4291: IP Version 6 Addressing Architecture
- RFC 4193: Unique Local IPv6 Unicast Addresses
- RFC 6724: Default Address Selection for IPv6
- RFC 8305: Happy Eyeballs Version 2: Better Connectivity Using Concurrency
- RFC 4862: IPv6 Stateless Address Autoconfiguration (SLAAC)
- Lammle, T. (2021). *CompTIA Network+ Study Guide (Exam N10-009)*. Sybex – IPv6 Address Types
- IANA: IPv6 Address Space Registry
