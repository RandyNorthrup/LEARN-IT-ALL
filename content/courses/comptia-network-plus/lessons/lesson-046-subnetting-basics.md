---
id: lesson-046-subnetting-basics
chapterId: ch2-ip-addressing
order: 46
title: "Subnetting Basics"
sidebar_label: "Lesson 46: Subnetting Basics"
description: "Master subnet mask calculation, network boundaries, CIDR notation, and subnetting fundamentals"
duration: 90
objectives:
  - Understand the purpose and benefits of subnetting
  - Calculate subnet masks in binary and decimal notation
  - Determine network and broadcast addresses
  - Master CIDR notation and prefix lengths
  - Calculate the number of hosts per subnet
  - Apply subnetting to solve network design problems
---

# Lesson 46: Subnetting Basics

## Introduction

Subnetting is the process of dividing a large network into smaller, more manageable sub-networks (subnets). It's one of the most critical skills for network professionals, enabling efficient IP address allocation, improved security through network segmentation, and reduced broadcast traffic.

In this lesson, we'll build a solid foundation in subnetting mechanics, from understanding subnet masks to calculating network boundaries and working with CIDR notation.

**Key Principle:** Subnetting is simply borrowing bits from the host portion to create network divisions.

## Learning Objectives

After completing this lesson, you will be able to:

- Understand the purpose and benefits of subnetting
- Calculate subnet masks in binary and decimal notation
- Determine network and broadcast addresses
- Master CIDR notation and prefix lengths
- Calculate the number of hosts per subnet
- Apply subnetting to solve network design problems

---

## Why Subnet?

### Business and Technical Benefits

**Address Efficiency:**
```
Problem: Class B network (172.16.0.0) provides 65,534 hosts
Reality: Most organizations don't need 65,534 hosts on one network

Solution: Subnet into smaller networks
172.16.0.0/24 = 254 hosts (typical department)
172.16.1.0/24 = 254 hosts (another department)
172.16.2.0/24 = 254 hosts (guest network)

Benefit: Allocate appropriate network sizes
```

**Broadcast Domain Control:**
```
Without Subnetting:
Single network = All 65,534 hosts in one broadcast domain
Every broadcast reaches every device
Network performance degrades

With Subnetting:
Multiple smaller networks = Isolated broadcast domains
Broadcast only reaches devices in same subnet
Better performance and security
```

**Security Segmentation:**
```
Network Design:
172.16.10.0/24 = Finance Department
172.16.20.0/24 = HR Department  
172.16.30.0/24 = Guest WiFi
172.16.40.0/24 = Server Network

Firewall Rules:
Finance ↔ Servers: Allowed
Guest ↔ Finance: Denied
HR ↔ Servers: Allowed with restrictions

Result: Lateral movement prevention
```

**Geographic Distribution:**
```
Company Network: 10.0.0.0/8

Branch Office Subnets:
New York: 10.1.0.0/16 (65,534 hosts available)
London: 10.2.0.0/16
Tokyo: 10.3.0.0/16
Sydney: 10.4.0.0/16

Each office independently manages their subnets
Central IT maintains overall address plan
```

## Understanding Subnet Masks

### Binary Foundation

**Subnet Mask Structure:**
```
Rule: Subnet mask is a 32-bit number
- Contiguous 1s (network/subnet bits)
- Contiguous 0s (host bits)
- Network bits MUST be on the left
- Host bits MUST be on the right

Valid Example:
11111111.11111111.11111111.00000000
^^^^^^^^ ^^^^^^^^ ^^^^^^^^ ^^^^^^^^
Network  Network  Network  Host
255.255.255.0

Invalid Example:
11111111.00000000.11111111.00000000  ❌
         ^^^^^^^^          
         Cannot have 0s in the middle
```

**Default Subnet Masks:**
```
Class A:
Binary:  11111111.00000000.00000000.00000000
Decimal: 255.0.0.0
CIDR:    /8

Class B:
Binary:  11111111.11111111.00000000.00000000
Decimal: 255.255.0.0
CIDR:    /16

Class C:
Binary:  11111111.11111111.11111111.00000000
Decimal: 255.255.255.0
CIDR:    /24

Note: These are called "classful" masks
Subnetting creates "classless" masks
```

### CIDR Notation (Slash Notation)

**Prefix Length:**
```
Format: IP_Address/Prefix_Length
Example: 192.168.1.0/24

The /24 means:
- First 24 bits are network bits
- Remaining 8 bits are host bits

Binary breakdown:
11111111.11111111.11111111.00000000
└──────24 network bits─────┘└─8 host─┘

/24 = 255.255.255.0
```

**Common CIDR Notations:**
```
/8  = 255.0.0.0         = 16,777,214 hosts
/16 = 255.255.0.0       = 65,534 hosts
/24 = 255.255.255.0     = 254 hosts
/25 = 255.255.255.128   = 126 hosts
/26 = 255.255.255.192   = 62 hosts
/27 = 255.255.255.224   = 30 hosts
/28 = 255.255.255.240   = 14 hosts
/29 = 255.255.255.248   = 6 hosts
/30 = 255.255.255.252   = 2 hosts (point-to-point links)
/31 = 255.255.255.254   = 0 hosts (RFC 3021 - special use)
/32 = 255.255.255.255   = 1 host (host route)
```

**Converting Between Notations:**
```
Step-by-Step: Convert /26 to dotted decimal

1. Write out 32 bits with first 26 as 1s:
   11111111.11111111.11111111.11000000
   └──────────26 ones──────────┘└─6 zeros─┘

2. Convert each octet to decimal:
   11111111 = 255
   11111111 = 255
   11111111 = 255
   11000000 = 192

3. Result: 255.255.255.192

Reverse: Convert 255.255.240.0 to CIDR

1. Convert to binary:
   255 = 11111111 (8 ones)
   255 = 11111111 (8 ones)
   240 = 11110000 (4 ones)
   0   = 00000000 (0 ones)

2. Count the 1s: 8 + 8 + 4 = 20

3. Result: /20
```

## Calculating Network Boundaries

### The Magic Number Method

**Finding the Block Size:**
```
Formula: Block Size = 256 - Subnet Mask Octet

Example: 255.255.255.192 (/26)

Step 1: Identify interesting octet (not 255 or 0)
  255.255.255.192
              ^^^
              This one!

Step 2: Calculate block size
  256 - 192 = 64

Step 3: The block size is the increment
  Networks increment by 64 in the last octet
```

**Subnet Boundaries:**
```
Network: 192.168.1.0/26
Mask: 255.255.255.192 (Block size = 64)

Subnets:
1st: 192.168.1.0   - 192.168.1.63
     Network: .0, Broadcast: .63, Hosts: .1-.62

2nd: 192.168.1.64  - 192.168.1.127
     Network: .64, Broadcast: .127, Hosts: .65-.126

3rd: 192.168.1.128 - 192.168.1.191
     Network: .128, Broadcast: .191, Hosts: .129-.190

4th: 192.168.1.192 - 192.168.1.255
     Network: .192, Broadcast: .255, Hosts: .193-.254

Total: 4 subnets, each with 62 usable hosts
```

**Network Address Rules:**
```
Network Address:
- First address in subnet
- All host bits set to 0
- Cannot be assigned to devices
- Used for routing

Example: 192.168.1.64/26
Binary: 11000000.10101000.00000001.01000000
                                  ^^^^^^^^^
                                  Host bits = 0
Network address: 192.168.1.64
```

**Broadcast Address Rules:**
```
Broadcast Address:
- Last address in subnet
- All host bits set to 1
- Cannot be assigned to devices
- Used for broadcasts within subnet

Example: 192.168.1.64/26
Binary: 11000000.10101000.00000001.01111111
                                  ^^^^^^^^^
                                  Host bits = 1
Broadcast address: 192.168.1.127
```

### Usable Host Range

**Calculating Host Count:**
```
Formula: Usable Hosts = 2^(host bits) - 2

Why -2?
- Subtract 1 for network address
- Subtract 1 for broadcast address

Example: /26 subnet
Host bits: 32 - 26 = 6 bits
Calculation: 2^6 - 2 = 64 - 2 = 62 usable hosts

Example: /24 subnet
Host bits: 32 - 24 = 8 bits
Calculation: 2^8 - 2 = 256 - 2 = 254 usable hosts

Example: /30 subnet (point-to-point)
Host bits: 32 - 30 = 2 bits
Calculation: 2^2 - 2 = 4 - 2 = 2 usable hosts
```

**Host Range Table:**
```
CIDR    Mask              Hosts    Use Case
/8      255.0.0.0         16M      ISP allocation
/16     255.255.0.0       65,534   Large campus
/20     255.255.240.0     4,094    Building
/24     255.255.255.0     254      Department/Floor
/25     255.255.255.128   126      Small department
/26     255.255.255.192   62       Office area
/27     255.255.255.224   30       Conference rooms
/28     255.255.255.240   14       Printer subnet
/29     255.255.255.248   6        Small server cluster
/30     255.255.255.252   2        Router-to-router link
/32     255.255.255.255   1        Single host route
```

## Binary AND Operation

### How Routing Works

**AND Operation:**
```
Rule: Compare IP address and subnet mask bit-by-bit
1 AND 1 = 1
1 AND 0 = 0
0 AND 1 = 0
0 AND 0 = 0

Purpose: Determine which network a packet belongs to
```

**Example Calculation:**
```
IP Address:    192.168.1.130
Subnet Mask:   255.255.255.192  (/26)
Find: Network address

Binary:
IP:    11000000.10101000.00000001.10000010
Mask:  11111111.11111111.11111111.11000000
       ───────────────────────────────────── AND
Net:   11000000.10101000.00000001.10000000

Decimal: 192.168.1.128

Result: 192.168.1.130 belongs to 192.168.1.128/26 network
```

**Routing Decision:**
```
Router receives packet destined for 192.168.1.130

Step 1: Router checks routing table
  192.168.1.0/26    via Interface 1
  192.168.1.64/26   via Interface 2
  192.168.1.128/26  via Interface 3
  192.168.1.192/26  via Interface 4

Step 2: Perform AND operation with each route
  192.168.1.130 AND 255.255.255.192 = 192.168.1.128

Step 3: Match found!
  Packet belongs to 192.168.1.128/26 network
  Forward via Interface 3
```

## Practical Subnetting Examples

### Example 1: Basic Subnetting

**Scenario:**
```
Given: 172.16.0.0/16 (Class B private network)
Requirement: Create 4 equal subnets for 4 departments
Each department needs ~15,000 hosts

Solution:
1. Determine bits needed for 4 subnets
   2^n >= 4 subnets
   2^2 = 4 ✓
   Need to borrow 2 bits

2. New subnet mask
   Original: /16 (255.255.0.0)
   Borrowed: +2 bits
   New: /18 (255.255.192.0)

3. Block size
   256 - 192 = 64
   (Third octet increments by 64)

4. Four subnets:
   Subnet 1: 172.16.0.0/18
     Range: 172.16.0.0 - 172.16.63.255
     Hosts: 16,382 usable

   Subnet 2: 172.16.64.0/18
     Range: 172.16.64.0 - 172.16.127.255
     Hosts: 16,382 usable

   Subnet 3: 172.16.128.0/18
     Range: 172.16.128.0 - 172.16.191.255
     Hosts: 16,382 usable

   Subnet 4: 172.16.192.0/18
     Range: 172.16.192.0 - 172.16.255.255
     Hosts: 16,382 usable

✓ All requirements met
```

### Example 2: Point-to-Point Links

**Scenario:**
```
Given: Need to connect 10 routers with point-to-point links
Each link needs exactly 2 IP addresses
Allocated space: 10.1.1.0/24

Solution:
1. Use /30 subnets (2 usable hosts each)
   Mask: 255.255.255.252
   Block size: 256 - 252 = 4

2. Subnet allocation:
   Link 1: 10.1.1.0/30    (.1 and .2 usable)
   Link 2: 10.1.1.4/30    (.5 and .6 usable)
   Link 3: 10.1.1.8/30    (.9 and .10 usable)
   Link 4: 10.1.1.12/30   (.13 and .14 usable)
   ...
   Link 10: 10.1.1.36/30  (.37 and .38 usable)

3. Address usage per link:
   Router A: .1 (first usable)
   Router B: .2 (second usable)
   Network: .0 (network address)
   Broadcast: .3 (broadcast address)

✓ Efficient use of IP space
✓ 64 possible /30 subnets in a /24
✓ Only using 10, can grow to 64 links
```

### Example 3: Variable Requirements

**Scenario:**
```
Given: 192.168.10.0/24
Requirements:
  Sales: 100 hosts
  Engineering: 50 hosts
  Management: 25 hosts
  IT: 10 hosts

Solution:
Start with largest requirement first

Sales (100 hosts):
  Need: 100 + network + broadcast = 102 IPs
  2^7 = 128 (closest power of 2)
  Host bits needed: 7
  Subnet mask: /25 (32 - 7 = 25)
  Subnet: 192.168.10.0/25
  Range: 192.168.10.0 - 192.168.10.127
  Usable: 192.168.10.1 - 192.168.10.126 (126 hosts) ✓

Engineering (50 hosts):
  Need: 50 + 2 = 52 IPs
  2^6 = 64
  Subnet: 192.168.10.128/26
  Range: 192.168.10.128 - 192.168.10.191
  Usable: 192.168.10.129 - 192.168.10.190 (62 hosts) ✓

Management (25 hosts):
  Need: 25 + 2 = 27 IPs
  2^5 = 32
  Subnet: 192.168.10.192/27
  Range: 192.168.10.192 - 192.168.10.223
  Usable: 192.168.10.193 - 192.168.10.222 (30 hosts) ✓

IT (10 hosts):
  Need: 10 + 2 = 12 IPs
  2^4 = 16
  Subnet: 192.168.10.224/28
  Range: 192.168.10.224 - 192.168.10.239
  Usable: 192.168.10.225 - 192.168.10.238 (14 hosts) ✓

Remaining space: 192.168.10.240 - 192.168.10.255
  Available for future growth
```

## Common Subnetting Mistakes

### Mistake 1: Invalid Subnet Masks

```
❌ WRONG: 255.255.255.192
          Binary: 11111111.11111111.11111111.11000000 ✓ Valid!

❌ WRONG: 255.255.192.255
          Binary: 11111111.11111111.11000000.11111111 ❌
          Problem: Has 0s before 1s (invalid)

❌ WRONG: 255.255.128.128
          Binary: 11111111.11111111.10000000.10000000 ❌
          Problem: Has 0s between 1s (invalid)

Rule: All network bits (1s) MUST be contiguous on the left
```

### Mistake 2: Overlapping Subnets

```
❌ WRONG Allocation:
   Subnet 1: 10.0.0.0/24   (10.0.0.0 - 10.0.0.255)
   Subnet 2: 10.0.0.128/25 (10.0.0.128 - 10.0.0.255)
                            ^^^^^^^^^^^^^^^^^^^^^^^^^^
                            OVERLAP! 10.0.0.128-255 in both

Problem: Ambiguous routing - which subnet does 10.0.0.150 belong to?

✓ CORRECT:
   Subnet 1: 10.0.0.0/25   (10.0.0.0 - 10.0.0.127)
   Subnet 2: 10.0.0.128/25 (10.0.0.128 - 10.0.0.255)
   No overlap, clean boundaries
```

### Mistake 3: Assigning Reserved Addresses

```
Subnet: 192.168.1.0/26

❌ WRONG: Assign 192.168.1.0 to server
   (This is the network address)

❌ WRONG: Assign 192.168.1.63 to workstation
   (This is the broadcast address)

✓ CORRECT: Assign 192.168.1.1 - 192.168.1.62
   (These are the usable host addresses)

Common Practice:
  .1 = Gateway/router (first usable)
  .2-.62 = Hosts
  .0 = Network (reserved)
  .63 = Broadcast (reserved)
```

### Mistake 4: Wrong Prefix Length

```
Requirement: Subnet needs 50 hosts

❌ WRONG: Use /26 (62 usable hosts)
   Math: 2^6 - 2 = 62 ✓ Seems OK...
   
   But if growth is expected:
   50 hosts = 80% utilization
   Little room for growth

✓ BETTER: Use /25 (126 usable hosts)
   50 hosts = 40% utilization
   Room for 100% growth

Best Practice: Plan for 30-50% future growth
```

## Subnetting Practice Strategies

### The Cheat Sheet

**Powers of 2 (Memorize!):**
```
2^1 = 2
2^2 = 4
2^3 = 8
2^4 = 16
2^5 = 32
2^6 = 64
2^7 = 128
2^8 = 256
2^9 = 512
2^10 = 1,024
2^16 = 65,536
```

**Quick Conversion Table:**
```
Prefix  Mask            Block Size  Hosts
/24     255.255.255.0   1           254
/25     255.255.255.128 128         126
/26     255.255.255.192 64          62
/27     255.255.255.224 32          30
/28     255.255.255.240 16          14
/29     255.255.255.248 8           6
/30     255.255.255.252 4           2

Pattern: Block size = 256 - mask value
         Hosts = block size - 2
```

### Speed Calculation Method

**Given: 172.16.35.47/21, find network address**

```
Fast method:

1. Identify interesting octet: /21
   8 bits (1st) + 8 bits (2nd) + 5 bits (3rd) = 21
   Third octet is interesting!

2. Mask for third octet: 5 bits on
   11111000 = 248
   256 - 248 = 8 (block size)

3. Find network: Which multiple of 8 contains 35?
   0, 8, 16, 24, 32, 40...
   35 is between 32 and 40
   Network starts at 32

4. Answer: 172.16.32.0/21

Verification:
  Network: 172.16.32.0
  Broadcast: 172.16.39.255
  Range: 172.16.32.0 - 172.16.39.255
  172.16.35.47 is within range ✓
```

## Real-World Subnetting Scenarios

### Scenario 1: Office Deployment

```
Company: TechStartup Inc.
Network: 10.50.0.0/16
Departments:
  - Development (200 users)
  - Sales (100 users)
  - Support (50 users)
  - Management (20 users)
  - Guest WiFi (100 concurrent)
  - Servers (30 servers)
  - Network devices (20)

Subnet Design:

Development: 10.50.10.0/24 (254 hosts)
Sales: 10.50.20.0/25 (126 hosts)
Support: 10.50.30.0/26 (62 hosts)
Management: 10.50.40.0/27 (30 hosts)
Guest WiFi: 10.50.50.0/25 (126 hosts)
Servers: 10.50.100.0/27 (30 hosts)
Network: 10.50.200.0/27 (30 hosts)
Point-to-Point: 10.50.250.0/24 (for router links)

Firewall rules by subnet enable granular control
VLAN per subnet for Layer 2 isolation
```

### Scenario 2: ISP Allocation

```
ISP receives: 100.64.0.0/16 from RIR

Customer allocations:
  Enterprise A: 100.64.0.0/20   (4,094 hosts)
  Enterprise B: 100.64.16.0/20  (4,094 hosts)
  SMB pool: 100.64.32.0/19      (8,190 addresses for SMBs)
  Residential: 100.64.64.0/18   (16,382 addresses)
  Infrastructure: 100.64.128.0/24 (ISP routers, DNS, etc.)

From SMB pool, create /24s for individual businesses:
  SMB-001: 100.64.32.0/24
  SMB-002: 100.64.33.0/24
  ...
  SMB-032: 100.64.64.0/24

Hierarchical addressing enables route aggregation
```

## Supernetting and Route Aggregation (CIDR)

### What is Supernetting?

**Supernetting** (also called **route aggregation** or **route summarization**) is the reverse of subnetting: it combines multiple smaller networks into a single, larger network for more efficient routing.

**Key Concept:** While subnetting borrows bits from the host portion, supernetting returns bits from the network portion to create a shorter prefix.

**Why Supernetting Matters:**
- Reduces the size of routing tables (fewer entries)
- Decreases router CPU and memory usage
- Speeds up routing lookups
- Critical for internet-scale routing (BGP)

### Supernetting Example

```
Problem: A router has 4 separate routes:
  192.168.0.0/24  → Interface 1
  192.168.1.0/24  → Interface 1
  192.168.2.0/24  → Interface 1
  192.168.3.0/24  → Interface 1

All 4 routes go to the same next hop.
Can we summarize them into one route?

Step 1: Convert network addresses to binary (third octet matters):
  192.168.0.0    →  00000000
  192.168.1.0    →  00000001
  192.168.2.0    →  00000010
  192.168.3.0    →  00000011

Step 2: Find common bits:
  000000 00  ← these 6 bits are the same in all 4
  000000 01
  000000 10
  000000 11

  Common prefix: first two octets (16 bits) + 6 bits = 22 bits

Step 3: Supernet route:
  192.168.0.0/22 (replaces all 4 /24 routes)

Verification:
  /22 mask = 255.255.252.0
  Block size: 256 - 252 = 4
  Range: 192.168.0.0 - 192.168.3.255 ✓ (covers all 4 networks)
```

### When Aggregation Works

**Requirements for successful aggregation:**
```
✓ Networks must be contiguous (no gaps)
✓ Networks must fall on a natural power-of-2 boundary
✓ All summarized routes must use the same next hop

Can aggregate:
  10.0.0.0/24, 10.0.1.0/24  → 10.0.0.0/23 ✓

Cannot aggregate:
  10.0.0.0/24, 10.0.2.0/24  → Gap at 10.0.1.0/24 ✗
  10.0.1.0/24, 10.0.2.0/24  → Not on /23 boundary ✗
```

---

## Common Subnet Sizes Quick-Reference Table

Memorize these common subnet allocations for the Network+ exam and real-world deployment planning:

```
┌─────────┬─────────────────────┬────────┬──────────────┬──────────────────────────┐
│ Prefix  │ Subnet Mask         │ Block  │ Usable Hosts │ Typical Use              │
├─────────┼─────────────────────┼────────┼──────────────┼──────────────────────────┤
│ /30     │ 255.255.255.252     │ 4      │ 2            │ Point-to-point WAN link  │
│ /29     │ 255.255.255.248     │ 8      │ 6            │ Small DMZ, printer VLAN  │
│ /28     │ 255.255.255.240     │ 16     │ 14           │ Management network       │
│ /27     │ 255.255.255.224     │ 32     │ 30           │ Conference rooms, IoT    │
│ /26     │ 255.255.255.192     │ 64     │ 62           │ Small department         │
│ /25     │ 255.255.255.128     │ 128    │ 126          │ Medium department        │
│ /24     │ 255.255.255.0       │ 256    │ 254          │ Standard LAN segment     │
│ /23     │ 255.255.254.0       │ 512    │ 510          │ Large floor / building   │
│ /22     │ 255.255.252.0       │ 1024   │ 1022         │ Campus, large VLAN       │
│ /21     │ 255.255.248.0       │ 2048   │ 2046         │ Campus aggregate         │
│ /20     │ 255.255.240.0       │ 4096   │ 4094         │ Datacenter or large site │
│ /16     │ 255.255.0.0         │ 65536  │ 65534        │ Major campus or region   │
└─────────┴─────────────────────┴────────┴──────────────┴──────────────────────────┘
```

**Exam Tip:** The /24, /25, /26, /27, /28, /29, and /30 prefixes are most commonly tested on the CompTIA Network+ exam. Be able to calculate subnets for any of these from memory.

---

## Subnet Planning Best Practices

### 1. Start with Requirements, Not Addresses

Before assigning any addresses, document:
- Number of subnets needed (departments, VLANs, WAN links)
- Number of hosts per subnet (current and projected growth)
- Any special requirements (/30 for WAN links, /32 for loopbacks)

### 2. Allocate Largest Subnets First

Always assign the largest subnet first, then fill in smaller ones. This prevents fragmentation of your address space and avoids situations where a large block is needed but the space is split by smaller allocations.

```
Correct order (largest to smallest):
  10.1.0.0/24   (254 hosts) — Production VLAN
  10.1.1.0/25   (126 hosts) — Development VLAN
  10.1.1.128/26 (62 hosts)  — Guest WiFi
  10.1.1.192/27 (30 hosts)  — Server VLAN
  10.1.1.224/28 (14 hosts)  — Management
  10.1.1.240/30 (2 hosts)   — WAN link 1
  10.1.1.244/30 (2 hosts)   — WAN link 2
```

### 3. Reserve Space for Growth

Plan for 50–100% growth in each subnet. A department with 40 users today should get a /26 (62 hosts) rather than a /26 at exactly 80% utilization—or even a /25 (126 hosts) if budget allows.

### 4. Use Consistent Numbering Schemes

Adopt a logical numbering pattern so administrators can identify subnets at a glance:

```
Convention example:
  10.{site}.{function}.0/24

  Site codes:    1 = HQ,  2 = Branch A,  3 = Branch B
  Function:      10 = Users, 20 = Servers, 30 = VoIP, 40 = Guest

  Result:
  10.1.10.0/24 = HQ Users
  10.1.20.0/24 = HQ Servers
  10.2.10.0/24 = Branch A Users
  10.2.30.0/24 = Branch A VoIP
```

### 5. Document Everything

Maintain an IP Address Management (IPAM) spreadsheet or tool that records:
- Subnet address and prefix length
- VLAN assignment
- Gateway address (typically .1 or .254)
- DHCP scope range
- Purpose and responsible team

---

## Introduction to Variable-Length Subnet Masking (VLSM)

### What is VLSM?

**Variable-Length Subnet Masking (VLSM)** allows different subnets within the same network to use different prefix lengths. Without VLSM (classful subnetting), every subnet must be the same size—which wastes addresses.

### VLSM vs Fixed-Length Subnetting

```
Fixed-Length Subnetting (wasteful):
  Given: 192.168.1.0/24
  Requirement: 100 hosts, 50 hosts, 10 hosts, 2 hosts (WAN link)

  All subnets use /26 (62 hosts each):
  192.168.1.0/26   → 62 hosts (for 100-host dept — NOT ENOUGH!)
  
  Must use /25 for all:
  192.168.1.0/25   → 126 hosts (for 100) — wastes 26
  192.168.1.128/25 → 126 hosts (for 50)  — wastes 76
  Only 2 subnets possible — NOT ENOUGH for 4 needs!

VLSM (efficient):
  192.168.1.0/25   → 126 hosts (for 100 users)   ✓
  192.168.1.128/26 → 62 hosts  (for 50 users)    ✓
  192.168.1.192/28 → 14 hosts  (for 10 users)    ✓
  192.168.1.208/30 → 2 hosts   (for WAN link)    ✓
  Remaining: 192.168.1.212 – 192.168.1.255 (free for growth)
```

### VLSM Design Steps

1. **List all subnets** with required host counts
2. **Sort by size** (largest first)
3. **Assign the largest subnet** starting at the base network address
4. **Assign the next largest** starting at the first available address after the previous subnet
5. **Repeat** until all subnets are assigned
6. **Verify** no subnets overlap

### VLSM and Routing Protocols

VLSM requires a **classless routing protocol** that carries subnet mask information in routing updates:

- **Supports VLSM:** OSPF, EIGRP, BGP, IS-IS, RIPv2
- **Does NOT support VLSM:** RIPv1, IGRP (legacy protocols)

**Exam Tip:** If a question asks about a routing protocol that supports VLSM or CIDR, look for classless protocols (OSPF, EIGRP, BGP, RIPv2). RIPv1 is classful and cannot carry subnet mask information.

---

## Summary

Subnetting is a fundamental networking skill that enables:

**Technical Benefits:**
- Efficient IP address allocation
- Reduced broadcast traffic
- Improved network performance
- Better security through segmentation
- Hierarchical network design

**Key Concepts Mastered:**
- Subnet mask structure and CIDR notation
- Network, broadcast, and host addresses
- Binary AND operation for routing
- Magic number method for quick calculations
- Host count formulas

**Practical Skills:**
- Calculate subnet boundaries
- Determine usable host ranges
- Design subnet schemes for requirements
- Avoid common subnetting mistakes
- Apply subnetting to real scenarios

**Next Steps:**
- Practice with different prefix lengths
- Work through complex subnetting problems
- Learn Variable Length Subnet Masking (VLSM)
- Study route summarization (supernetting)

## Practice Questions

**Q1.** What is the primary purpose of subnetting a network?

A) To increase the total number of available IP addresses
B) To divide a large network into smaller, more manageable sub-networks
C) To convert IPv4 addresses into IPv6 addresses
D) To encrypt traffic between network segments

<details>
<summary>Answer</summary>

**B)** Subnetting divides a large network into smaller sub-networks (subnets) to improve manageability, reduce broadcast domains, enhance security through segmentation, and allocate IP addresses more efficiently. It does not increase the total address count (A), convert between IP versions (C), or provide encryption (D).
</details>

**Q2.** A host has the IP address 192.168.10.45 with a subnet mask of 255.255.255.224 (/27). What is the network address for this host?

A) 192.168.10.0
B) 192.168.10.32
C) 192.168.10.48
D) 192.168.10.64

<details>
<summary>Answer</summary>

**B)** With a /27 mask (255.255.255.224), subnets increment by 32 (256 − 224 = 32). The subnet boundaries are .0, .32, .64, .96, etc. The host address .45 falls between .32 and .64, so the network address is 192.168.10.32. Options A (.0), C (.48), and D (.64) are not valid network addresses for this mask.
</details>

**Q3.** How many usable host addresses are available on a /26 subnet?

A) 30
B) 62
C) 64
D) 126

<details>
<summary>Answer</summary>

**B)** A /26 subnet has 6 host bits (32 − 26 = 6), giving 2^6 = 64 total addresses. Subtracting 2 for the network and broadcast addresses yields 62 usable host addresses. Option A (30) corresponds to /27, C (64) doesn't subtract reserved addresses, and D (126) corresponds to /25.
</details>

**Q4.** A company needs to create 8 subnets from the 10.1.0.0/16 network. What is the minimum subnet mask they should use?

A) /17
B) /18
C) /19
D) /20

<details>
<summary>Answer</summary>

**C)** To create 8 subnets, you need to borrow 3 bits from the host portion (2^3 = 8). Starting from /16 and adding 3 borrowed bits gives /19. A /17 (A) creates only 2 subnets, /18 (B) creates 4 subnets, and /20 (D) creates 16 subnets—more than needed and wastes address space per subnet.
</details>

**Q5.** Which of the following is NOT a valid subnet mask?

A) 255.255.255.128
B) 255.255.254.0
C) 255.255.255.100
D) 255.255.240.0

<details>
<summary>Answer</summary>

**C)** A valid subnet mask must consist of contiguous 1-bits followed by contiguous 0-bits in binary. 255.255.255.100 in binary is 11111111.11111111.11111111.01100100, which has non-contiguous 1-bits in the last octet, making it invalid. Options A (/25), B (/23), and D (/20) all have contiguous 1-bits and are valid masks.
</details>

## References

- CompTIA Network+ N10-009 Exam Objectives: Domain 1.4 – Given a scenario, configure a subnet and use appropriate IP addressing schemes
- RFC 950: Internet Standard Subnetting Procedure
- RFC 4632: Classless Inter-Domain Routing (CIDR): The Internet Address Assignment and Aggregation Plan
- RFC 1878: Variable Length Subnet Table For IPv4
- Lammle, T. (2021). *CompTIA Network+ Study Guide (Exam N10-009)*. Sybex – Chapter on IP Subnetting
- IEEE 802: LAN/MAN Standards Committee – Network addressing fundamentals
- Interactive Tools: SubnettingPractice.com, subnetting calculators
- Subnet Calculators: ipcalc, sipcalc (verify your work)
