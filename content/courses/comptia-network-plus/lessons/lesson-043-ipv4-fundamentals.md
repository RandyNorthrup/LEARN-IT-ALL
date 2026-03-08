---
id: lesson-043-ipv4-fundamentals
title: IPv4 Fundamentals
chapterId: ch2-ip-addressing
order: 43
duration: 60
objectives:
  - Understand IPv4 address structure and format
  - Convert between binary and decimal notation
  - Identify IPv4 address components (network and host portions)
  - Explain dotted decimal notation
  - Understand IPv4 packet structure
---

# Lesson 43: IPv4 Fundamentals

## Learning Objectives
- Understand IPv4 address structure and format
- Convert between binary and decimal notation
- Identify IPv4 address components (network and host portions)
- Understand the purpose and structure of subnet masks
- Work with dotted decimal and CIDR notation

## Introduction

IPv4 (Internet Protocol version 4) is the foundational addressing system that enables device communication across networks. Every device on a TCP/IP network needs a unique IP address to send and receive data. Understanding IPv4 addressing is absolutely critical for network administration, troubleshooting, and passing the Network+ exam.

IPv4 addresses are 32-bit numbers that provide approximately 4.3 billion unique addresses. While this seemed sufficient in the 1980s, address exhaustion led to the development of IPv6. However, IPv4 remains the dominant protocol in use today.

**Key Concept:** An IPv4 address consists of two parts: the **network portion** (identifies the network) and the **host portion** (identifies the specific device on that network).

---

## IPv4 Address Structure

### 32-Bit Binary Format

IPv4 addresses are 32 bits long, divided into four 8-bit sections called **octets**.

```
Binary Format (32 bits total):
┌──────────┬──────────┬──────────┬──────────┐
│  Octet 1 │  Octet 2 │  Octet 3 │  Octet 4 │
│  8 bits  │  8 bits  │  8 bits  │  8 bits  │
└──────────┴──────────┴──────────┴──────────┘

Example Binary Address:
11000000.10101000.00000001.01100100
```

Each octet can represent values from **0 to 255** (2^8 = 256 possible values).

### Dotted Decimal Notation

For human readability, IPv4 addresses are written in **dotted decimal notation** - four decimal numbers separated by dots.

```
Binary:    11000000.10101000.00000001.01100100
           ↓         ↓         ↓         ↓
Decimal:   192    .  168    .  1     .  100

Result: 192.168.1.100
```

**Valid Range:** Each octet ranges from **0 to 255**.

---

## Binary to Decimal Conversion

Understanding binary conversion is essential for subnetting calculations.

### Binary Place Values

Each bit position has a value based on powers of 2:

```
Position:  8th   7th   6th   5th   4th   3rd   2nd   1st
Value:     128    64    32    16     8     4     2     1
           ↓      ↓     ↓     ↓      ↓     ↓     ↓     ↓
Binary:     1      0     1     0      1     0     0     0
           128  +  0  + 32  +  0   +  8  +  0  +  0  +  0  = 168
```

### Conversion Examples

**Example 1: Binary to Decimal**
```
Binary: 11000000

128  64  32  16   8   4   2   1
 1    1   0   0   0   0   0   0
128+ 64 = 192

Answer: 192
```

**Example 2: Decimal to Binary**
```
Convert 203 to binary:

203 - 128 = 75   (128 fits, bit = 1)
75  - 64  = 11   (64 fits, bit = 1)
11  - 32  = X    (32 too large, bit = 0)
11  - 16  = X    (16 too large, bit = 0)
11  - 8   = 3    (8 fits, bit = 1)
3   - 4   = X    (4 too large, bit = 0)
3   - 2   = 1    (2 fits, bit = 1)
1   - 1   = 0    (1 fits, bit = 1)

Binary: 11001011
```

**Practice Table:**

| Decimal | Binary    |
|---------|-----------|
| 255     | 11111111  |
| 192     | 11000000  |
| 128     | 10000000  |
| 64      | 01000000  |
| 32      | 00100000  |
| 16      | 00010000  |
| 0       | 00000000  |

**Quick Tip:** Memorize common values (128, 192, 224, 240, 248, 252, 254, 255) for faster subnetting.

---

## IPv4 Address Components

Every IPv4 address has two parts determined by the subnet mask:

### Network Portion
- Identifies the **specific network**
- Remains constant for all devices on the same network
- Used by routers for routing decisions

### Host Portion
- Identifies the **specific device** on that network
- Unique for each device on the network
- Used for local delivery within the network

**Example:**
```
IP Address:    192.168.1.100
Subnet Mask:   255.255.255.0

Network Portion: 192.168.1     (first 3 octets)
Host Portion:    100            (last octet)

Interpretation: Device #100 on network 192.168.1
```

---

## Subnet Masks

A **subnet mask** determines which portion of an IP address is the network and which is the host.

### Subnet Mask Structure

```
Subnet Mask: 255.255.255.0

Binary:      11111111.11111111.11111111.00000000
             ↑                           ↑
             Network bits (1s)           Host bits (0s)
```

**Rules:**
1. Network bits are represented by **1s** (consecutive from left)
2. Host bits are represented by **0s** (consecutive from right)
3. 1s and 0s cannot be mixed (no interleaving)

### Common Subnet Masks

| Subnet Mask      | Binary                              | CIDR | Network Bits | Host Bits |
|------------------|-------------------------------------|------|--------------|-----------|
| 255.0.0.0        | 11111111.00000000.00000000.00000000 | /8   | 8            | 24        |
| 255.255.0.0      | 11111111.11111111.00000000.00000000 | /16  | 16           | 16        |
| 255.255.255.0    | 11111111.11111111.11111111.00000000 | /24  | 24           | 8         |
| 255.255.255.128  | 11111111.11111111.11111111.10000000 | /25  | 25           | 7         |
| 255.255.255.192  | 11111111.11111111.11111111.11000000 | /26  | 26           | 6         |
| 255.255.255.224  | 11111111.11111111.11111111.11100000 | /27  | 27           | 5         |
| 255.255.255.240  | 11111111.11111111.11111111.11110000 | /28  | 28           | 4         |
| 255.255.255.252  | 11111111.11111111.11111111.11111100 | /30  | 30           | 2         |

---

## CIDR Notation (Classless Inter-Domain Routing)

**CIDR notation** is a shorthand way to represent subnet masks using a slash followed by the number of network bits.

### Format

```
IP Address / Number of Network Bits

Examples:
192.168.1.100/24
10.0.0.0/8
172.16.50.1/16
```

### CIDR Examples

```
192.168.1.100/24

Breakdown:
- IP Address: 192.168.1.100
- /24 = 24 network bits
- Subnet Mask: 255.255.255.0
- Network: 192.168.1.0
- Host range: 192.168.1.1 - 192.168.1.254
```

**Converting CIDR to Subnet Mask:**
```
/24 = 24 ones followed by 8 zeros
     = 11111111.11111111.11111111.00000000
     = 255.255.255.0

/16 = 16 ones followed by 16 zeros
     = 11111111.11111111.00000000.00000000
     = 255.255.0.0
```

---

## Determining Network and Host Portions

To find the network and host portions, perform a **logical AND** operation between the IP address and subnet mask.

### Logical AND Operation

```
Rules:
1 AND 1 = 1
1 AND 0 = 0
0 AND 1 = 0
0 AND 0 = 0
```

### Example Calculation

```
IP Address:    192.168.1.100
Subnet Mask:   255.255.255.0

Binary IP:     11000000.10101000.00000001.01100100
Binary Mask:   11111111.11111111.11111111.00000000
               ──────────────────────────────────────  (AND operation)
Network:       11000000.10101000.00000001.00000000
               = 192.168.1.0

Result: This device is on network 192.168.1.0
```

---

## Special IPv4 Addresses

### Network Address
- **First address** in a subnet
- All host bits set to **0**
- Identifies the network itself
- Cannot be assigned to a device

```
Example:
192.168.1.0/24
Network Address: 192.168.1.0
```

### Broadcast Address
- **Last address** in a subnet
- All host bits set to **1**
- Sends data to all devices on the network
- Cannot be assigned to a device

```
Example:
192.168.1.0/24
Broadcast Address: 192.168.1.255
```

### Usable Host Range
- All addresses **between** network and broadcast addresses
- Can be assigned to devices

```
Example:
192.168.1.0/24
Usable Range: 192.168.1.1 - 192.168.1.254
Total Usable Hosts: 254
```

---

## IPv4 Packet Structure

Understanding the IPv4 packet header is essential for troubleshooting and analyzing network traffic. Every IPv4 packet contains a header with control information followed by the payload (data).

### IPv4 Header Format

```
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |    DSCP   |ECN|          Total Length         |
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

Minimum header size: 20 bytes (no options)
Maximum header size: 60 bytes (with options)
```

### Header Fields Explained

| Field | Size | Description |
|-------|------|-------------|
| **Version** | 4 bits | IP version (always 4 for IPv4) |
| **IHL** | 4 bits | Internet Header Length in 32-bit words (min 5 = 20 bytes) |
| **DSCP** | 6 bits | Differentiated Services Code Point (QoS marking) |
| **ECN** | 2 bits | Explicit Congestion Notification |
| **Total Length** | 16 bits | Entire packet size in bytes (header + data, max 65,535) |
| **Identification** | 16 bits | Unique ID for fragment reassembly |
| **Flags** | 3 bits | Fragmentation control (DF = Don't Fragment, MF = More Fragments) |
| **Fragment Offset** | 13 bits | Position of fragment in original packet |
| **TTL** | 8 bits | Hop count limit (decremented by each router) |
| **Protocol** | 8 bits | Upper-layer protocol (6=TCP, 17=UDP, 1=ICMP) |
| **Header Checksum** | 16 bits | Error checking for header integrity |
| **Source Address** | 32 bits | Sender's IPv4 address |
| **Destination Address** | 32 bits | Recipient's IPv4 address |

### Time to Live (TTL) Behavior

TTL prevents packets from looping infinitely in the network. Each router that forwards the packet **decrements the TTL by 1**. When TTL reaches **0**, the router discards the packet and sends an ICMP "Time Exceeded" message back to the source.

```
Packet Lifecycle with TTL:

Source PC (TTL=128)
  │
  ▼
Router 1 (TTL=128 → 127, forward)
  │
  ▼
Router 2 (TTL=127 → 126, forward)
  │
  ▼
Router 3 (TTL=126 → 125, forward)
  │
  ▼
Destination Server (TTL=125, deliver to application)
```

**Default TTL Values by Operating System:**

| OS | Default TTL |
|----|-------------|
| Linux | 64 |
| Windows | 128 |
| macOS | 64 |
| Cisco IOS | 255 |
| Juniper | 64 |

**TTL in Troubleshooting:**
```bash
# Traceroute uses incrementing TTL values to discover path
# TTL=1 → first router replies with Time Exceeded
# TTL=2 → second router replies
# TTL=3 → third router replies
# Continues until destination reached

traceroute 8.8.8.8     # Linux/macOS
tracert 8.8.8.8        # Windows
```

**Identifying Remote OS by TTL:**
```
Reply from 10.5.5.5: TTL=126
  Original TTL was likely 128 (Windows) → 2 hops away

Reply from 10.5.5.5: TTL=61
  Original TTL was likely 64 (Linux) → 3 hops away
```

### IPv4 Fragmentation

When a packet is larger than the **Maximum Transmission Unit (MTU)** of a link, the router must **fragment** the packet into smaller pieces. Each fragment is transmitted independently and reassembled at the destination.

```
Original Packet (4000 bytes, MTU=1500):

┌────────────────────────────────────────────────────┐
│ Header (20B) │          Data (3980 bytes)          │
└────────────────────────────────────────────────────┘
                        │
              Fragmentation at Router
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│HDR│Data 1480B│ │HDR│Data 1480B│ │HDR│Data 1020B│
│MF=1 Offset=0│ │MF=1 Off=1480│ │MF=0 Off=2960│
└──────────────┘ └──────────────┘ └──────────────┘
  Fragment 1       Fragment 2       Fragment 3
```

**Key Fragmentation Concepts:**

| Concept | Description |
|---------|-------------|
| **MTU** | Maximum Transmission Unit (Ethernet default: 1500 bytes) |
| **DF Flag** | Don't Fragment - router drops packet instead of fragmenting |
| **MF Flag** | More Fragments - indicates more fragments follow |
| **Fragment Offset** | Position of fragment data relative to original |
| **Reassembly** | Always performed at destination, never intermediate routers |

**Path MTU Discovery (PMTUD):**
```
Purpose: Find smallest MTU along entire path
Method:
  1. Source sends packet with DF bit set
  2. If router can't forward (packet > MTU):
     → Drops packet
     → Sends ICMP "Fragmentation Needed" with its MTU
  3. Source reduces packet size and retries
  4. Repeats until packet reaches destination

Benefits:
  - Avoids fragmentation entirely
  - Better performance (no reassembly overhead)
  - Modern applications prefer this method

Test MTU:
  ping -f -l 1472 10.1.1.1    (Windows, DF flag set)
  ping -M do -s 1472 10.1.1.1 (Linux, DF flag set)
  # 1472 + 20 (IP) + 8 (ICMP) = 1500 (standard MTU)
```

---

## Calculating Number of Hosts

### Formula

```
Number of Usable Hosts = 2^n - 2

Where:
n = number of host bits
-2 accounts for network and broadcast addresses
```

### Examples

**Example 1: /24 Network**
```
Subnet: 192.168.1.0/24
Host bits: 32 - 24 = 8 bits
Hosts: 2^8 - 2 = 256 - 2 = 254 usable hosts
```

**Example 2: /26 Network**
```
Subnet: 192.168.1.0/26
Host bits: 32 - 26 = 6 bits
Hosts: 2^6 - 2 = 64 - 2 = 62 usable hosts
```

**Example 3: /30 Network (Point-to-Point Links)**
```
Subnet: 192.168.1.0/30
Host bits: 32 - 30 = 2 bits
Hosts: 2^2 - 2 = 4 - 2 = 2 usable hosts
Perfect for router-to-router links!
```

---

## IPv4 Address Configuration

### Static IP Configuration

Manually assigning IP parameters:

```
IP Address:       192.168.1.100
Subnet Mask:      255.255.255.0
Default Gateway:  192.168.1.1
DNS Server 1:     8.8.8.8
DNS Server 2:     8.8.4.4
```

**Use Cases:**
- Servers and network devices
- Printers and IoT devices
- Critical infrastructure

### Dynamic IP Configuration (DHCP)

Automatically obtaining IP parameters from a DHCP server:

```
DHCP Process (DORA):
1. Discover  - Client broadcasts "I need an IP"
2. Offer     - Server offers available IP
3. Request   - Client requests offered IP
4. Acknowledge - Server confirms assignment
```

**Use Cases:**
- End-user workstations
- Mobile devices
- Guest networks

---

## IPv4 Configuration Parameters

### Required Parameters

1. **IP Address**
   - Unique identifier for the device
   - Example: 192.168.1.100

2. **Subnet Mask**
   - Defines network boundaries
   - Example: 255.255.255.0 (/24)

3. **Default Gateway**
   - Router IP for reaching other networks
   - Example: 192.168.1.1

### Optional but Important Parameters

4. **DNS Server**
   - Resolves domain names to IP addresses
   - Example: 8.8.8.8 (Google DNS)

5. **WINS Server** (Legacy)
   - NetBIOS name resolution (older Windows networks)

6. **Domain Name**
   - DNS suffix for the device
   - Example: company.com

---

## Real-World Scenario

**Scenario:** You need to configure a new web server on your network.

```
Network Information:
Network: 192.168.10.0/24
Available IPs: 192.168.10.1 - 192.168.10.254
Gateway: 192.168.10.1
```

**Server Configuration:**
```bash
# Linux configuration
sudo ip addr add 192.168.10.50/24 dev eth0
sudo ip route add default via 192.168.10.1
echo "nameserver 8.8.8.8" >> /etc/resolv.conf

# Windows configuration
netsh interface ip set address "Ethernet" static 192.168.10.50 255.255.255.0 192.168.10.1
netsh interface ip set dns "Ethernet" static 8.8.8.8
```

**Verification:**
```bash
# Check IP configuration
ipconfig /all      (Windows)
ip addr show       (Linux)

# Test connectivity
ping 192.168.10.1        # Gateway
ping 8.8.8.8             # Internet
ping google.com          # DNS resolution
```

---

## Common IPv4 Troubleshooting

### Problem: Device cannot reach other networks

**Check:**
```bash
# 1. Verify IP configuration
ipconfig              # Windows
ip addr show          # Linux

# 2. Check gateway connectivity
ping <gateway_ip>

# 3. Check routing table
route print           # Windows
ip route show         # Linux

# Common Issue: Incorrect or missing default gateway
```

### Problem: Duplicate IP Address

**Symptoms:**
- IP conflict error messages
- Intermittent connectivity
- Network instability

**Solution:**
```bash
# Windows: Release and renew DHCP
ipconfig /release
ipconfig /renew

# Linux: Restart network service
sudo systemctl restart networking

# Prevention: Use DHCP reservations for static devices
```

### Problem: Wrong Subnet Mask

**Effect:** Cannot communicate with devices that should be on the same network

```
Correct:   IP: 192.168.1.100, Mask: 255.255.255.0   (/24)
Incorrect: IP: 192.168.1.100, Mask: 255.255.0.0     (/16)

With /16 mask, device thinks 192.168.2.50 is local (wrong!)
With /24 mask, device correctly routes to gateway for 192.168.2.50
```

---

## Key Terms and Definitions

- **IPv4:** Internet Protocol version 4, 32-bit addressing system
- **Octet:** 8-bit section of an IPv4 address (can be 0-255)
- **Dotted Decimal Notation:** Human-readable format (e.g., 192.168.1.1)
- **Subnet Mask:** Defines network and host portions of IP address
- **CIDR Notation:** Shorthand for subnet masks (e.g., /24)
- **Network Address:** First IP in subnet, identifies the network
- **Broadcast Address:** Last IP in subnet, sends to all devices
- **Default Gateway:** Router IP address for reaching other networks
- **Logical AND:** Binary operation used to determine network address

---

## Summary

IPv4 addressing is the foundation of network communication. Key takeaways:

1. **IPv4 = 32 bits** divided into 4 octets (0-255 each)
2. **Subnet mask** determines network vs. host portions
3. **CIDR notation** (/24, /16, etc.) is shorthand for subnet masks
4. **Network address** = first IP (all host bits 0)
5. **Broadcast address** = last IP (all host bits 1)
6. **Usable hosts** = 2^(host bits) - 2
7. **Binary conversion** is essential for subnetting

Master these concepts before moving to subnetting calculations!

---

## Practice Questions


**Q1.** How many bits are in an IPv4 address, and how are they typically divided?

A) 16 bits divided into two octets
B) 32 bits divided into four octets
C) 48 bits divided into six octets
D) 64 bits divided into eight octets

<details>
<summary>Answer</summary>

**B)** An IPv4 address is 32 bits long, divided into four 8-bit sections called octets. Each octet is represented as a decimal number (0–255) separated by dots in dotted decimal notation (e.g., 192.168.1.100). 48 bits describes a MAC address, and 128 bits describes an IPv6 address.
</details>


**Q2.** What is the purpose of a subnet mask?

A) To encrypt network traffic between devices
B) To determine which portion of an IP address identifies the network and which identifies the host
C) To assign IP addresses automatically via DHCP
D) To translate domain names to IP addresses

<details>
<summary>Answer</summary>

**B)** A subnet mask determines which bits of an IP address represent the network portion and which represent the host portion. The mask's binary 1s mark network bits and binary 0s mark host bits. This distinction is essential for routers and hosts to determine whether a destination is local or remote. DHCP assigns addresses, DNS translates names, and encryption is handled by other protocols.
</details>


**Q3.** What is the decimal value of the binary octet 11001000?

A) 168
B) 192
C) 200
D) 204

<details>
<summary>Answer</summary>

**C)** Converting 11001000: 128 + 64 + 0 + 0 + 8 + 0 + 0 + 0 = 200. Each bit position represents a power of 2 from left to right: 128, 64, 32, 16, 8, 4, 2, 1. Only the positions with a 1 bit are added together.
</details>


**Q4.** Given the IP address 10.20.30.40 with a subnet mask of 255.255.255.0, what is the network address?

A) 10.0.0.0
B) 10.20.0.0
C) 10.20.30.0
D) 10.20.30.40

<details>
<summary>Answer</summary>

**C)** To find the network address, perform a logical AND between the IP address and subnet mask. With a /24 mask (255.255.255.0), the first three octets are the network portion and the last octet is zeroed out: 10.20.30.0. The answer 10.0.0.0 would correspond to a /8 mask, and 10.20.0.0 would correspond to a /16 mask.
</details>


**Q5.** A /30 subnet mask provides how many usable host addresses, and what is its primary use case?

A) 4 usable hosts — small office networks
B) 6 usable hosts — server VLANs
C) 2 usable hosts — point-to-point links between routers
D) 14 usable hosts — wireless access points

<details>
<summary>Answer</summary>

**C)** A /30 subnet has 2 host bits, giving 2^2 = 4 total addresses minus 2 (network and broadcast) = 2 usable host addresses. This is the ideal size for point-to-point links between two routers, where exactly two addresses are needed — one for each router interface. Using larger subnets for point-to-point links wastes address space.
</details>


## References

- **CompTIA Network+ N10-009 Exam Objectives:** Domain 1.4 - IPv4 addressing and subnetting
- **RFC 791:** Internet Protocol (IPv4 specification)
- **RFC 950:** Internet Standard Subnetting Procedure
- **RFC 1918:** Address Allocation for Private Internets
- **IANA:** IPv4 Address Space Registry

---

## Next Steps

In Lesson 44, we'll explore **IPv4 Address Classes** including:
- Classful addressing (Class A, B, C, D, E)
- Default subnet masks for each class
- Historical context and modern classless addressing
- How to identify address class from first octet

Understanding IPv4 fundamentals is critical before tackling advanced subnetting!
