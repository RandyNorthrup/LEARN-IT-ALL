---
id: private-vs-public-ip
title: Private vs. Public IP Addresses
chapterId: ch5-ip-addressing
order: 45
duration: 75
objectives:
  - Understand the difference between private and public IP addresses
  - Identify RFC 1918 private address ranges
  - Explain NAT and PAT operations
  - Configure NAT on routers
  - Understand IPv4 address conservation
---

# Lesson 45: Private vs. Public IP Addresses

## Learning Objectives
- Understand the difference between private and public IP addresses
- Identify RFC 1918 private address ranges
- Explain NAT and PAT operations
- Recognize when to use private vs. public addresses
- Understand IPv4 address exhaustion and conservation strategies

## Introduction

Not all IP addresses are created equal. IPv4 addresses fall into two main categories: **private** and **public**. Understanding the distinction is critical for network design, security, and troubleshooting.

**Key Concept:** Private addresses are used within organizations and cannot be routed on the Internet. Public addresses are globally unique and directly routable on the Internet.

The development of private addressing (RFC 1918, 1996) was a direct response to IPv4 address exhaustion. Without private addresses and NAT, the Internet would have run out of IPv4 addresses decades ago.

---

## Public IP Addresses

### Definition

**Public IP addresses** are globally unique addresses assigned by Internet registries and routable on the public Internet.

```
Characteristics:
✅ Globally unique (no duplicates worldwide)
✅ Directly routable on the Internet
✅ Must be registered/leased from ISP or RIR
✅ Finite and increasingly scarce
✅ Required for Internet-facing services
```

### Regional Internet Registries (RIRs)

Public IPv4 addresses are allocated by five regional registries:

| RIR | Region | Website |
|-----|--------|---------|
| ARIN | North America | arin.net |
| RIPE NCC | Europe, Middle East, Central Asia | ripe.net |
| APNIC | Asia-Pacific | apnic.net |
| LACNIC | Latin America, Caribbean | lacnic.net |
| AFRINIC | Africa | afrinic.net |

### Public Address Allocation Chain

```
IANA (Internet Assigned Numbers Authority)
    ↓
Regional Internet Registries (RIRs)
    ↓
Internet Service Providers (ISPs)
    ↓
Organizations and End Users
```

### Public Address Usage

```
Common Uses:
- Web servers (public-facing websites)
- Email servers (MX records)
- VPN gateways (remote access endpoints)
- DNS servers (public name resolution)
- Cloud services (AWS, Azure, GCP)
- Router WAN interfaces (ISP connections)
```

### Public Address Example

```
Company Web Server:
Public IP: 203.0.113.50
Domain: www.company.com
DNS Record: company.com → 203.0.113.50

Internet User:
1. User types www.company.com
2. DNS resolves to 203.0.113.50
3. Browser connects directly to public IP
4. Server responds directly
```

---

## Private IP Addresses

### Definition

**Private IP addresses** are reserved ranges defined by RFC 1918 that can be used freely by anyone but cannot be routed on the public Internet.

```
Characteristics:
✅ NOT globally unique (can be used by anyone)
✅ NOT routable on the Internet
✅ Free to use (no registration required)
✅ Must use NAT for Internet access
✅ Conserve public IPv4 addresses
```

### RFC 1918 Private Address Ranges

Three private address ranges are defined:

```
Class A Private Range:
10.0.0.0 - 10.255.255.255
CIDR: 10.0.0.0/8
Total Networks: 1 massive network
Total Hosts: 16,777,216 (minus 2)
Use Case: Large enterprises, service providers

Class B Private Range:
172.16.0.0 - 172.31.255.255
CIDR: 172.16.0.0/12
Total Networks: 16 Class B networks
Total Hosts per /16: 65,534
Use Case: Medium-sized organizations

Class C Private Range:
192.168.0.0 - 192.168.255.255
CIDR: 192.168.0.0/16
Total Networks: 256 Class C networks
Total Hosts per /24: 254
Use Case: Small offices, home networks (most common!)
```

### Private Address Visual

```
┌─────────────────────────────────────────┐
│     Internet (Public IPs Only)          │
│                                          │
│  Web servers: 203.0.113.x                │
│  DNS servers: 8.8.8.8                    │
│  Cloud services: Public IPs              │
└────────────┬────────────────────────────┘
             │
        ┌────┴────┐
        │ Router  │ Public IP: 203.0.113.100
        │  (NAT)  │ Private IP: 192.168.1.1
        └────┬────┘
             │
┌────────────┴───────────────────────────┐
│  Internal Network (Private IPs)        │
│                                         │
│  PC1: 192.168.1.100                     │
│  PC2: 192.168.1.101                     │
│  Server: 192.168.1.50                   │
│  Printer: 192.168.1.200                 │
└─────────────────────────────────────────┘
```

### Why Private Addresses?

**Problem (early 1990s):**
```
IPv4 Space: ~4.3 billion addresses
Growing Internet users: Billions
Result: Running out of addresses!
```

**Solution (RFC 1918):**
```
- Define private ranges everyone can use internally
- Use NAT to share public IPs
- Drastically reduces public IP consumption
- Extended IPv4 lifespan by decades
```

---

## Network Address Translation (NAT)

### NAT Purpose

**NAT** allows multiple devices with private IPs to share a single public IP address for Internet access.

```
Without NAT:
Every device needs unique public IP
100 computers = 100 public IPs needed ❌

With NAT:
All devices share 1 public IP
100 computers = 1 public IP needed ✅
```

### How NAT Works

```
Outbound Traffic:
┌──────────────────────────────────────────────┐
│ 1. PC sends packet                           │
│    Source: 192.168.1.100:50000               │
│    Dest: 93.184.216.34:80 (example.com)      │
├──────────────────────────────────────────────┤
│ 2. NAT router translates                     │
│    Replace source with public IP             │
│    Track translation in NAT table            │
│    Source: 203.0.113.100:50000               │
│    Dest: 93.184.216.34:80                    │
├──────────────────────────────────────────────┤
│ 3. Web server receives and responds          │
│    Source: 93.184.216.34:80                  │
│    Dest: 203.0.113.100:50000                 │
├──────────────────────────────────────────────┤
│ 4. NAT router translates back               │
│    Check NAT table for translation           │
│    Replace dest with private IP              │
│    Source: 93.184.216.34:80                  │
│    Dest: 192.168.1.100:50000                 │
└──────────────────────────────────────────────┘
```

### NAT Translation Table

```
Inside Local    | Inside Global     | Outside IP
(Private IP)    | (Public IP)       | (Destination)
────────────────┼───────────────────┼──────────────────────
192.168.1.100:50000 | 203.0.113.100:50000 | 93.184.216.34:80
192.168.1.101:50001 | 203.0.113.100:50001 | 151.101.1.140:443
192.168.1.102:50002 | 203.0.113.100:50002 | 8.8.8.8:53

Note: Different source ports distinguish internal devices
```

---

## Types of NAT

### 1. Static NAT (One-to-One)

```
Purpose: Permanent mapping between private and public IP
Use Case: Hosting public servers on private network

Configuration:
Inside Private: 192.168.1.50
Outside Public: 203.0.113.50
Mapping: PERMANENT

Example - Web Server:
Internet → 203.0.113.50:80 → NAT → 192.168.1.50:80

Benefits:
✅ Server accessible from Internet
✅ Predictable mapping
✅ Simplifies firewall rules

Drawbacks:
❌ Consumes one public IP per server
❌ Less efficient for address conservation
```

### 2. Dynamic NAT (Pool)

```
Purpose: Map private IPs to pool of public IPs
Use Case: Multiple users sharing limited public IPs

Configuration:
Inside Private: 192.168.1.0/24 (254 hosts)
Outside Pool: 203.0.113.10 - 203.0.113.20 (11 public IPs)

How it works:
- First request gets first available public IP
- Mapping expires after idle timeout
- Returned to pool for reuse

Example:
192.168.1.100 → 203.0.113.10 (assigned)
192.168.1.101 → 203.0.113.11 (assigned)
...
192.168.1.110 → 203.0.113.20 (assigned)
192.168.1.111 → ❌ WAIT (pool exhausted)
```

### 3. PAT (Port Address Translation) / NAT Overload

```
Purpose: Many private IPs to ONE public IP using ports
Use Case: Home/office networks (MOST COMMON!)

How it works:
- Uses port numbers to distinguish connections
- Thousands of simultaneous connections possible
- Default on most home routers

Example:
Private IP          Public IP (Shared)        Destination
192.168.1.100:50000 → 203.0.113.100:50000 → example.com:80
192.168.1.101:50001 → 203.0.113.100:50001 → google.com:443
192.168.1.102:50002 → 203.0.113.100:50002 → github.com:443

Benefits:
✅ Maximum address conservation
✅ Thousands of devices share 1 public IP
✅ Cost effective

Drawbacks:
❌ Incoming connections blocked (security benefit!)
❌ Port exhaustion possible (64K ports max)
❌ Some applications require port forwarding
```

---

## NAT Benefits and Limitations

### Benefits

```
1. Address Conservation
   - Extends IPv4 lifespan
   - Reduces public IP costs
   - Enables large private networks

2. Security (by obscurity)
   - Hides internal network structure
   - Blocks unsolicited inbound connections
   - Acts as basic firewall

3. Flexibility
   - Change ISP without renumbering
   - Merge networks with overlapping IPs
   - Control outbound access

4. Cost Savings
   - Reduce public IP leases
   - Lower ISP fees
   - Simplifies management
```

### Limitations and Issues

```
1. Application Compatibility
   ❌ FTP active mode (uses dynamic ports)
   ❌ SIP/VoIP (complex port requirements)
   ❌ IPsec (encrypted packet issues)
   ❌ Gaming (requires port forwarding)
   ❌ P2P applications (BitTorrent, etc.)

2. Performance Impact
   - NAT translation overhead
   - Table lookup latency
   - Connection tracking memory

3. End-to-End Principle Violation
   - Breaks true peer-to-peer communication
   - Complicates network troubleshooting
   - Requires workarounds (STUN, TURN, ICE)

4. Logging and Auditing
   - Multiple users share same public IP
   - Difficult to trace individual users
   - Legal/compliance issues
```

---

## Port Forwarding

### Purpose

**Port forwarding** allows external access to services on private network.

```
Problem:
You host web server (192.168.1.50:80) on private network
Internet users cannot reach private IP

Solution - Port Forwarding:
Internet → Public IP:80 → NAT forwards to → 192.168.1.50:80
```

### Port Forwarding Configuration

```
Router NAT Configuration:
┌──────────────┬─────────────┬──────────────┬────────┐
│ Service      │ External Port│ Internal IP  │ Int Port│
├──────────────┼─────────────┼──────────────┼────────┤
│ Web Server   │ 80          │ 192.168.1.50 │ 80     │
│ HTTPS Server │ 443         │ 192.168.1.50 │ 443    │
│ SSH Server   │ 22          │ 192.168.1.60 │ 22     │
│ Gaming       │ 25565       │ 192.168.1.100│ 25565  │
│ RDP          │ 3389        │ 192.168.1.70 │ 3389   │
└──────────────┴─────────────┴──────────────┴────────┘

Result:
Internet user accesses 203.0.113.100:80
Router forwards to 192.168.1.50:80
Server responds through NAT
```

### DMZ (Demilitarized Zone) Configuration

```
Purpose: Expose one device to Internet (all ports)
Risk: HIGH - device fully exposed

Configuration:
DMZ Host: 192.168.1.50
Effect: ALL incoming traffic → 192.168.1.50

Use Case: Gaming console requiring many ports
Warning: Only use for non-critical devices!
```

---

## When to Use Private vs. Public

### Use Private Addresses When:

```
✅ Internal corporate networks
✅ Home/office LANs
✅ Development/test environments
✅ Backend servers (databases, file servers)
✅ User workstations
✅ Printers, IoT devices
✅ Private VLANs
✅ Cost-sensitive deployments
```

### Use Public Addresses When:

```
✅ Public-facing web servers
✅ Email servers (SMTP, IMAP)
✅ Public DNS servers
✅ VPN gateways
✅ Load balancers (external)
✅ Content delivery networks (CDN)
✅ Cloud services requiring direct access
✅ Services requiring inbound connections
```

### Hybrid Approach (Most Common)

```
┌───────────────── Internet ──────────────────┐
│                                              │
│  [Public DNS]  [Public Web Server]          │
│  8.8.8.8       203.0.113.50                  │
└──────────────────┬───────────────────────────┘
                   │
              ┌────┴────┐
              │ Firewall│ Public: 203.0.113.1
              │   NAT   │ Private: 192.168.1.1
              └────┬────┘
                   │
    ┌──────────────┴─────────────────┐
    │ Private Network                │
    │                                 │
    │ [Internal Web] [Database]      │
    │ 192.168.1.50   192.168.1.51    │
    │                                 │
    │ [Workstations] [Printers]      │
    │ 192.168.1.100+ 192.168.1.200+  │
    └─────────────────────────────────┘
```

---

## IPv4 Address Exhaustion

### The Problem

```
Total IPv4 Addresses: 4,294,967,296 (~4.3 billion)

Less:
- Class D (multicast): 268 million
- Class E (experimental): 268 million
- Private addresses: ~18 million
- Reserved/special: ~100 million

Usable Public: ~3.7 billion addresses
World Population: ~8 billion people
Connected Devices: 20+ billion (IoT, mobile, etc.)

Result: NOT ENOUGH! Exhausted in 2011-2019 (regional)
```

### Regional IPv4 Exhaustion Timeline

```
2011: APNIC (Asia-Pacific) - EXHAUSTED
2012: RIPE NCC (Europe) - EXHAUSTED
2014: LACNIC (Latin America) - EXHAUSTED
2015: ARIN (North America) - EXHAUSTED
2017: AFRINIC (Africa) - EXHAUSTED

Current State:
- New IPv4 allocations: Minimal (waiting lists)
- IPv4 transfer market: Active (buying/selling)
- IPv4 prices: Increasing ($30-50 per IP)
```

### Conservation Strategies

```
1. NAT/PAT
   - Primary conservation method
   - Enabled home/office networks
   - Extended IPv4 by decades

2. CIDR (Classless addressing)
   - Efficient allocation
   - Reduced wasteful class assignments
   - Route aggregation

3. IPv6 Adoption
   - Long-term solution (128-bit = 340 undecillion addresses)
   - Slow adoption (chicken-egg problem)
   - Dual-stack deployments common

4. IPv4 Reclamation
   - Recovering unused allocations
   - Breaking up large legacy allocations
   - IPv4 transfer markets
```

---

## Identifying Private vs. Public Addresses

### Quick Identification Checklist

```
Is it private if:
✅ 10.x.x.x (any)
✅ 172.16.x.x - 172.31.x.x
✅ 192.168.x.x (any)
✅ 169.254.x.x (APIPA - link-local)
✅ 127.x.x.x (loopback)

Everything else = Public (with few exceptions)
```

### Practice Examples

| IP Address | Private or Public? | Notes |
|------------|-------------------|-------|
| 10.5.100.200 | Private | 10/8 range |
| 172.20.10.50 | Private | 172.16-31/12 range |
| 172.32.10.50 | Public | Outside 172.16-31 range! |
| 192.168.100.1 | Private | 192.168/16 range |
| 192.169.1.1 | Public | NOT 192.168! |
| 8.8.8.8 | Public | Google DNS |
| 203.0.113.50 | Public | Not in private ranges |
| 169.254.1.1 | APIPA | Link-local (special) |

---

## Real-World Scenarios

### Scenario 1: Small Office Network

```
Requirements:
- 50 employees
- Internal file server
- Shared printer
- Internet access

Design:
Private Network: 192.168.1.0/24
- Router: 192.168.1.1
- DHCP Pool: 192.168.1.100-192.168.1.200
- File Server: 192.168.1.10 (static)
- Printer: 192.168.1.20 (static)
- Employees: DHCP assigned

ISP Connection:
- Public IP: 203.0.113.100 (single IP)
- NAT: PAT enabled (all share one IP)
```

### Scenario 2: Web Hosting Company

```
Requirements:
- Host 100 customer websites
- Each needs public IP
- Backend management network

Design:
Public IPs: 203.0.113.0/25 (126 usable IPs)
- Web Server 1: 203.0.113.10
- Web Server 2: 203.0.113.11
- ... (100 servers)

Private Management: 10.0.0.0/24
- Management Network: 10.0.0.0/24
- Admin Workstations: 10.0.0.100+
- Monitoring Server: 10.0.0.10
- Backup Server: 10.0.0.20
```

### Scenario 3: Enterprise with Branch Offices

```
Headquarters (main office):
- Public: 203.0.113.0/28
- Private: 10.0.0.0/16

Branch Office 1:
- Public: 1 IP (from ISP)
- Private: 10.1.0.0/16
- VPN to HQ

Branch Office 2:
- Public: 1 IP (from ISP)
- Private: 10.2.0.0/16
- VPN to HQ

Benefits:
- Consistent private addressing scheme
- VPN connects branches over Internet
- Minimal public IP usage
- Scalable design
```

---

## Common Troubleshooting

### Problem: Cannot access Internet from private network

```
Checklist:
1. Verify private IP in correct range
   ipconfig /all (Windows)
   ip addr (Linux)

2. Check NAT configuration on router
   - Is NAT enabled?
   - Is inside/outside interface correct?

3. Verify default gateway
   ping <gateway_ip>

4. Check DNS resolution
   nslookup google.com

5. Verify routing
   tracert google.com (Windows)
   traceroute google.com (Linux)
```

### Problem: Public server unreachable from Internet

```
Checklist:
1. Verify port forwarding configured
   - External port correct?
   - Internal IP correct?
   - Protocol (TCP/UDP) correct?

2. Check firewall rules
   - Allow inbound on external interface?
   - Allow to internal server?

3. Test from internal network first
   - Can internal clients reach server?

4. Verify public DNS records
   - nslookup domain.com
   - Does it resolve to correct public IP?

5. Test from external location
   - Use online port checker
   - telnet public_ip port
```

---

## Key Terms and Definitions

- **Public IP:** Globally unique, Internet-routable address
- **Private IP:** RFC 1918 address, not Internet-routable
- **NAT:** Network Address Translation, converts private to public
- **PAT:** Port Address Translation, many-to-one NAT using ports
- **Static NAT:** Permanent one-to-one mapping
- **Dynamic NAT:** Temporary mappings from pool
- **Port Forwarding:** Directing external traffic to internal server
- **DMZ:** Exposed host receiving all external traffic
- **RFC 1918:** Standard defining private address ranges
- **IPv4 Exhaustion:** Depletion of available public IPv4 addresses

---

## Summary

Understanding private vs. public addressing is fundamental:

1. **Public IPs**: Globally unique, routable, scarce, costly
2. **Private IPs**: RFC 1918 ranges (10/8, 172.16/12, 192.168/16)
3. **NAT**: Enables private-to-public translation
4. **PAT**: Most common, many IPs share one public IP using ports
5. **Conservation**: NAT extended IPv4 lifespan significantly
6. **Future**: IPv6 provides long-term solution

Private addressing with NAT is the foundation of modern Internet connectivity!

---

## Review Questions

1. **What are the three RFC 1918 private ranges?**
   - Answer: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16

2. **Is 172.32.10.50 a private address?**
   - Answer: No, public (outside 172.16-172.31 range)

3. **What type of NAT do most home routers use?**
   - Answer: PAT (Port Address Translation / NAT Overload)

4. **Why was RFC 1918 created?**
   - Answer: Address IPv4 exhaustion by allowing reusable private addresses

5. **What is required for private IPs to access the Internet?**
   - Answer: NAT (Network Address Translation)

6. **What is port forwarding used for?**
   - Answer: Allow external access to services on private network

7. **How many devices can share one public IP with PAT?**
   - Answer: Thousands (limited by ~65K ports)

---

## References

- **RFC 1918:** Address Allocation for Private Internets
- **RFC 2663:** IP Network Address Translator Terminology
- **RFC 3022:** Traditional IP Network Address Translator
- **CompTIA Network+ N10-008:** Domain 1.4 - Private vs Public
- **IANA:** IPv4 Address Space Registry

---

## Next Steps

Lesson 46: **Subnetting Basics** will cover:
- Subnet mask calculation
- CIDR notation in depth
- Determining network boundaries
- Calculating usable host ranges
- Binary subnetting techniques

Master private/public addressing before tackling subnetting!
