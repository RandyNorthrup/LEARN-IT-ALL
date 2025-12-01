---
id: ipv4-address-classes
title: IPv4 Address Classes
chapterId: ch5-ip-addressing
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

## Classful Addressing Problems

### Issue 1: Wasteful Allocation

```
Company needs 500 hosts
Class C: 254 hosts (too small) ❌
Class B: 65,534 hosts (wastes 65,034 addresses!) ❌

Result: Either too small or extremely wasteful
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

## Practice Problems

### Problem 1: Identify the class and network
**Given:** 150.100.50.200

**Solution:**
```
First octet: 150
Range: 128-191 = Class B
Default mask: 255.255.0.0 (/16)
Network: 150.100.0.0
Host range: 150.100.0.1 - 150.100.255.254
```

### Problem 2: Private or public?
**Classify these addresses:**

```
a) 10.5.5.5 → Private (Class A private range)
b) 172.20.10.50 → Private (Class B private range)
c) 192.168.100.1 → Private (Class C private range)
d) 200.50.100.200 → Public (not in private ranges)
e) 169.254.1.1 → APIPA (link-local, not private)
```

### Problem 3: Calculate hosts
**How many usable hosts in each default class network?**

```
Class A (/8): 2^24 - 2 = 16,777,214 hosts
Class B (/16): 2^16 - 2 = 65,534 hosts
Class C (/24): 2^8 - 2 = 254 hosts
```

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

## Review Questions

1. **What class is 172.16.50.100?**
   - Answer: Class B (172 is in range 128-191)

2. **What is the default subnet mask for Class C?**
   - Answer: 255.255.255.0 (/24)

3. **Is 192.168.1.1 a private or public address?**
   - Answer: Private (RFC 1918)

4. **What does 169.254.x.x indicate?**
   - Answer: APIPA - DHCP failure

5. **How many usable hosts in a default Class B network?**
   - Answer: 65,534 (2^16 - 2)

6. **What is 224.0.0.5 used for?**
   - Answer: Multicast (Class D) - OSPF routers

7. **What replaced classful addressing?**
   - Answer: CIDR (Classless Inter-Domain Routing)

---

## References

- **CompTIA Network+ N10-008:** Domain 1.4 - IPv4 addressing
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
