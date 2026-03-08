---
id: lesson-022-network-devices
title: Network Devices (Hubs, Switches, Routers, Firewalls, Load Balancers)
chapterId: ch3-network-implementations
order: 22
duration: 50
objectives:
  - Identify common network devices and their functions
  - Understand the OSI layer each device operates at
  - Compare hubs, switches, and routers
  - Explain firewall types and functions
  - Describe load balancer operation and use cases
  - Recognize specialized network devices (IDS/IPS, proxy servers)
---

# Lesson 22: Network Devices (Hubs, Switches, Routers, Firewalls, Load Balancers)

## Learning Objectives
- Identify common network devices and their functions
- Understand the OSI layer each device operates at
- Compare hubs, switches, and routers
- Explain firewall types and functions
- Describe load balancer operation and use cases
- Recognize specialized network devices (IDS/IPS, proxy servers)

## Introduction

**Network devices** are hardware components that enable connectivity, security, and traffic management in computer networks. Understanding the purpose, operation, and appropriate placement of each device is essential for network design and troubleshooting.

This lesson covers fundamental and advanced network devices tested on the CompTIA Network+ N10-009 exam.

---

## Layer 1 Devices (Physical Layer)

### Hub (Multiport Repeater)

**Function:** Broadcasts incoming signals to all ports

**OSI Layer:** Layer 1 (Physical)

**Characteristics:**
- **No intelligence:** Cannot make forwarding decisions
- **Broadcasts everything:** All devices receive all traffic
- **One collision domain:** All ports share same collision domain
- **One broadcast domain:** All ports in same broadcast domain
- **Half-duplex only:** Cannot send and receive simultaneously
- **Status:** Obsolete (replaced by switches)

**How it works:**
1. Frame arrives on one port
2. Hub amplifies signal
3. Broadcasts to all other ports (including noise/collisions)

**Use case:** None (legacy devices only)

---

### Repeater

**Function:** Amplifies and regenerates signals to extend cable distance

**OSI Layer:** Layer 1 (Physical)

**Characteristics:**
- Extends network beyond distance limitations
- No filtering or intelligence
- Simply regenerates signal
- Does NOT create separate collision domains

**Use Case:**
- Extend Ethernet beyond 100m limit
- Rarely used (replaced by switches)

---

### Media Converter

**Function:** Converts between different media types (copper ↔ fiber)

**OSI Layer:** Layer 1 (Physical)

**Examples:**
- Copper (RJ45) to Fiber (SC/LC/ST)
- Single-mode fiber to multimode fiber
- Coax to fiber

**Use Case:**
- Connect fiber backbone to copper access layer
- Extend distance using fiber where copper insufficient

---

## Layer 2 Devices (Data Link Layer)

### Switch (Layer 2 Switch)

**Function:** Forwards frames based on MAC addresses

**OSI Layer:** Layer 2 (Data Link)

**Characteristics:**
- **MAC address table:** Learns source MACs dynamically
- **Forwarding decisions:** Based on destination MAC
- **Separate collision domains:** Each port = separate domain
- **Full-duplex:** Send and receive simultaneously
- **VLAN support:** Creates multiple broadcast domains

**How it works:**
1. Receives frame
2. Learns source MAC → port mapping
3. Looks up destination MAC in table
4. Forwards to specific port (or floods if unknown)

**Types:**
- **Unmanaged:** No configuration, plug-and-play
- **Managed:** VLAN, QoS, SNMP, port security features
- **Smart/Web-managed:** Limited management via web interface

### Managed vs Unmanaged Switches: Detailed Comparison

| Feature | Unmanaged Switch | Managed Switch | Smart/Web-Managed |
|---|---|---|---|
| **Configuration** | None (plug & play) | Full CLI/GUI | Limited web GUI |
| **VLANs** | No | Yes | Basic VLAN support |
| **QoS** | No | Yes (802.1p, DSCP) | Limited |
| **Port Security** | No | Yes (MAC filtering, 802.1X) | Some models |
| **SNMP Monitoring** | No | Yes (v1/v2c/v3) | Basic |
| **Spanning Tree** | Basic or none | Full (STP/RSTP/MSTP) | Basic STP |
| **PoE** | Some models | Yes (PoE/PoE+/PoE++) | Some models |
| **Remote Management** | No | SSH, Telnet, Web | Web only |
| **Cost** | $50-200 | $500-10,000+ | $150-500 |
| **Use Case** | Home, small office | Enterprise, data center | Small business |

### Power over Ethernet (PoE) Switches

PoE switches deliver electrical power over Ethernet cables, eliminating the need for separate power supplies:

| Standard | IEEE | Power per Port | Total Power (typical) |
|---|---|---|---|
| **PoE** | 802.3af | 15.4W | 150-370W |
| **PoE+** | 802.3at | 30W | 370-740W |
| **PoE++** | 802.3bt | 60W (Type 3) / 100W (Type 4) | 1000W+ |

**Common PoE-powered devices:**
- VoIP phones (PoE: ~7W)
- Wireless access points (PoE+: ~15-25W)
- IP cameras (PoE+: ~15-25W)
- Door access controllers
- Thin clients

```
PoE Switch Deployment Example:

    [PoE Switch - 48 ports, 740W budget]
      |       |       |        |        |
    [VoIP]  [VoIP]  [WAP]   [Camera] [Camera]
     7W      7W     22W      15W      15W
                            Total: 66W of 740W budget
```

**Use Case:** Standard LAN connectivity (most common network device)

### Switch Selection Criteria

When selecting switches for a network deployment:

1. **Port count and speed:** 8, 24, 48 ports at 1G, 10G, 25G
2. **Uplink speed:** 10G or higher uplinks to core/distribution
3. **PoE budget:** Calculate total wattage needed for powered devices
4. **Management level:** Unmanaged for simple, managed for enterprise
5. **Layer 2 vs Layer 3:** L3 needed for inter-VLAN routing
6. **Stackable:** Multiple switches managed as single unit
7. **Form factor:** Desktop, rack-mount (1U, 2U)
8. **Redundancy:** Dual power supplies for critical deployments

---

### Bridge

**Function:** Connects two network segments and filters traffic

**OSI Layer:** Layer 2 (Data Link)

**Characteristics:**
- Creates separate collision domains
- Filters traffic based on MAC addresses
- Fewer ports than switch (typically 2-4)
- **Status:** Mostly obsolete (switches are multi-port bridges)

**Use Case:**
- Segment large collision domains (historical)
- Replaced by switches in modern networks

---

### Wireless Access Point (WAP)

**Function:** Provides wireless connectivity to wired network

**OSI Layer:** Layer 2 (Data Link)

**Characteristics:**
- Converts wireless (802.11) to wired (802.3)
- SSID broadcasts
- Security: WPA2/WPA3
- Can support multiple SSIDs/VLANs

**Modes:**
- **Autonomous AP:** Standalone configuration
- **Lightweight AP:** Managed by wireless controller

**Use Case:** Provide WiFi access in office, campus, public spaces

---

## Layer 3 Devices (Network Layer)

### Router

**Function:** Routes packets between different networks based on IP addresses

**OSI Layer:** Layer 3 (Network)

**Characteristics:**
- **Routing table:** Stores routes to destination networks
- **Routing decisions:** Based on destination IP address
- **Separate broadcast domains:** Each interface = separate domain
- **NAT/PAT:** Can translate IP addresses
- **ACLs:** Can filter traffic based on IP/port

**How it works:**
1. Receives packet
2. Examines destination IP address
3. Looks up in routing table
4. Forwards to next-hop or outbound interface
5. Decrements TTL, recalculates checksum

**Types:**
- **Enterprise routers:** Cisco ISR, Juniper MX
- **Home routers:** Wireless router/gateway combo
- **Core routers:** ISP backbone routers

**Use Case:** Connect different networks (LANs to WAN, branch to HQ)

---

### Layer 3 Switch (Multilayer Switch)

**Function:** Switches at Layer 2 AND routes at Layer 3 (wire-speed)

**OSI Layer:** Layer 2 + Layer 3

**Characteristics:**
- Performs switching (MAC) and routing (IP) in hardware
- SVIs (Switch Virtual Interfaces) for inter-VLAN routing
- Hardware-based routing (ASIC) = faster than router
- Full switching features (VLANs, STP, etc.)

**Use Case:** Enterprise LAN core, data center, inter-VLAN routing

---

### Wireless LAN Controller (WLC)

**Function:** Centrally manages multiple wireless access points

**OSI Layer:** Layer 2-3

**Characteristics:**
- Manages configuration of all lightweight APs from a single console
- Provides roaming support across APs (seamless handoff)
- Centralized security policy enforcement (802.1X, WPA3)
- RF management (auto channel selection, power adjustment)
- Guest wireless management with captive portal
- Firmware updates pushed to all APs simultaneously

**Architecture:**
```
             [Wireless LAN Controller]
              /       |        \
          [LWAP]   [LWAP]    [LWAP]
          Floor 1  Floor 2   Floor 3
           /  \      |  \       |  \
        Clients  Clients  Clients  Clients

  CAPWAP Tunnel: Control + Data traffic
  between each LWAP and the WLC
```

**Autonomous AP vs Lightweight AP (with WLC):**

| Feature | Autonomous AP | Lightweight AP + WLC |
|---|---|---|
| **Configuration** | Individual per AP | Centralized on WLC |
| **Firmware Updates** | Manual per AP | Automatic from WLC |
| **Roaming** | Limited | Seamless |
| **RF Management** | Manual | Automatic |
| **Scalability** | Poor (10+ APs) | Excellent (1000s of APs) |
| **Cost** | Lower (small scale) | Higher but efficient at scale |

**Use Case:** Enterprise campus, large office, hospitality, education

---

### Content Filter/Web Filter

**Function:** Controls access to web content based on policies

**OSI Layer:** Layer 7 (Application)

**Characteristics:**
- Blocks websites by category (gambling, adult, social media)
- URL filtering and domain blacklisting/whitelisting
- Can inspect HTTPS traffic (SSL/TLS decryption)
- User and group-based policies
- Logging and reporting of web activity

**Deployment Options:**
- **On-premises appliance:** Hardware device inline with traffic
- **Cloud-based:** DNS-level filtering (e.g., Cisco Umbrella, OpenDNS)
- **Proxy-based:** Integrated with proxy server
- **Endpoint agent:** Software on each device

**Example Policies:**
```
 Rule 1: Block category "Gambling" for all users
 Rule 2: Allow category "Social Media" for Marketing group only
 Rule 3: Block file downloads > 100MB during business hours
 Rule 4: Allow all categories for IT Admin group
 Rule 5: Log all HTTPS traffic for compliance
```

**Use Case:** Corporate policy enforcement, CIPA compliance (schools/libraries), parental controls

---

## Security Devices

### Firewall

**Function:** Controls traffic between networks based on security rules

**OSI Layer:** Layers 3-7 (depending on type)

**Types:**

**1. Packet-Filtering Firewall (Layer 3/4)**
- Filters based on: Source/Dest IP, Source/Dest Port, Protocol
- Stateless (examines each packet independently)
- Fast but limited security

**2. Stateful Firewall (Layer 3/4)**
- Tracks connection state (TCP handshake, sessions)
- Allows return traffic automatically
- More secure than packet-filtering

**3. Next-Generation Firewall (NGFW) (Layer 7)**
- Deep packet inspection (DPI)
- Application awareness (blocks specific apps)
- Intrusion Prevention System (IPS) integration
- URL filtering, malware detection
- Examples: Palo Alto, Fortinet, Cisco Firepower

**How it works:**
1. Packet arrives
2. Firewall checks against ACL rules (permit/deny)
3. If stateful: Checks session table
4. If NGFW: Inspects application layer payload
5. Permits or denies based on policy

**Deployment:**
- **Network firewall:** Between zones (DMZ, internal, external)
- **Host firewall:** On individual computers (Windows Firewall)

### Firewall Deployment Topologies

**Single Firewall with DMZ (Three-Legged):**
```
        [Internet]
            |
        [Firewall]
       /     |     \
  Outside   DMZ    Inside
  Zone     Zone    Zone
   |        |        |
  WAN    Web/Mail   LAN
         Servers   Users
```

**Dual Firewall DMZ (Sandwich Architecture):**
```
        [Internet]
            |
    [Outer Firewall]  ← Less restrictive
            |
          [DMZ]
       Web Servers
       Mail Servers
            |
    [Inner Firewall]  ← More restrictive
            |
       [Internal LAN]
       User Workstations
       Database Servers
```

**Firewall Rule Example (ACL-style):**

| Rule # | Action | Source | Destination | Protocol | Port | Description |
|---|---|---|---|---|---|---|
| 1 | PERMIT | Any | DMZ Web Server | TCP | 80, 443 | Allow web traffic |
| 2 | PERMIT | Internal | Any | TCP | 80, 443 | Allow outbound web |
| 3 | PERMIT | Internal | DNS Server | UDP | 53 | Allow DNS queries |
| 4 | DENY | DMZ | Internal | Any | Any | Block DMZ to LAN |
| 5 | DENY | Any | Any | Any | Any | Implicit deny all |

**Firewall Selection Criteria:**
- **Throughput:** Gbps capacity with full inspection enabled
- **Concurrent sessions:** How many active connections supported
- **VPN capacity:** Number of simultaneous VPN tunnels
- **Features:** IPS, URL filtering, application control, sandboxing
- **High availability:** Active/passive or active/active failover
- **Management:** Central management for multiple firewalls

**Use Case:** Protect network perimeter, segment internal networks

---

### Intrusion Detection System (IDS)

**Function:** Monitors traffic for suspicious activity and alerts

**OSI Layer:** Layers 2-7

**Characteristics:**
- **Passive monitoring:** Analyzes copies of traffic
- **Does NOT block:** Only alerts administrators
- **Detection methods:**
  - Signature-based (known attack patterns)
  - Anomaly-based (baseline deviation)

**Deployment:**
- SPAN/mirror port on switch
- Inline (promiscuous mode)

**Use Case:** Security monitoring, forensics, compliance

---

### Intrusion Prevention System (IPS)

**Function:** Monitors AND blocks malicious traffic

**OSI Layer:** Layers 2-7

**Characteristics:**
- **Inline deployment:** All traffic passes through IPS
- **Active blocking:** Drops malicious packets
- **Same detection as IDS** + prevention
- **Potential downside:** False positives can block legitimate traffic

**IDS vs IPS:**
- **IDS:** Passive, alerts only
- **IPS:** Active, blocks threats

**Use Case:** Active threat prevention, complement to firewall

---

### Proxy Server

**Function:** Intermediary between clients and servers

**OSI Layer:** Layer 7 (Application)

**Types:**

**1. Forward Proxy**
- Clients connect to proxy
- Proxy requests resources on behalf of client
- Hides client identity
- Use: Content filtering, caching, anonymity

**2. Reverse Proxy**
- External clients connect to proxy
- Proxy forwards to internal servers
- Hides server identity
- Use: Load balancing, SSL offloading, caching

**Features:**
- **Content filtering:** Block specific websites
- **Caching:** Store frequently accessed content (reduce bandwidth)
- **Anonymity:** Hide client IP addresses
- **Authentication:** Require login before internet access

**Use Case:** Corporate web filtering, improve performance (caching)

---

## Optimization Devices

### Load Balancer

**Function:** Distributes traffic across multiple servers

**OSI Layer:** Layer 4 (TCP/UDP) or Layer 7 (Application)

**Load Balancing Algorithms:**

**1. Round Robin**
- Distributes requests sequentially
- Server 1 → Server 2 → Server 3 → repeat

**2. Least Connections**
- Sends to server with fewest active connections
- Better for long-lived connections

**3. Weighted**
- More powerful servers get more traffic
- Example: 70% to Server 1, 30% to Server 2

**4. IP Hash**
- Client IP determines which server
- Same client always goes to same server (session persistence)

**Health Checks:**
- Load balancer monitors server health
- Removes failed servers from pool automatically

**Use Case:** Web servers, application servers, high-availability systems

### Layer 4 vs Layer 7 Load Balancing

| Feature | Layer 4 (Transport) | Layer 7 (Application) |
|---|---|---|
| **Decision Based On** | IP address, TCP/UDP port | URL, HTTP headers, cookies, content |
| **Speed** | Faster (less inspection) | Slower (deep inspection) |
| **SSL Termination** | No (pass-through) | Yes (offloads SSL from servers) |
| **Content Routing** | No | Yes (route /api to API servers, /images to CDN) |
| **Session Persistence** | Source IP only | Cookie-based, URL-based |
| **Use Case** | Simple TCP services, databases | Web applications, microservices |

**Layer 7 Load Balancing Example:**
```
  Client Request: https://app.example.com/api/users
                         |
                  [L7 Load Balancer]
                  Inspects URL path
                   /          \
             /api/*          /static/*
               |                |
        [API Server Pool]  [CDN/Static Servers]
        Server 1, 2, 3    Server A, B
```

### Load Balancer Deployment Architecture

```
              [Internet]
                  |
             [Firewall]
                  |
          [Load Balancer Pair]
          Active / Standby
            /    |    \
        [Web1] [Web2] [Web3]
                  |
          [App Load Balancer]
            /    |    \
        [App1] [App2] [App3]
                  |
          [Database Cluster]
        Primary / Replica
```

**Health Check Types:**
- **ICMP Ping:** Basic connectivity check
- **TCP Connect:** Verifies port is open
- **HTTP GET:** Checks for specific response code (200 OK)
- **Custom Script:** Application-specific health verification

**Session Persistence (Sticky Sessions):**
- Ensures a client always reaches the same server
- Methods: Source IP hash, cookie insertion, URL parameter
- Important for applications that store state locally

---

### Content Delivery Network (CDN)

**Function:** Distributed network of servers that deliver content based on geographic location

**How it works:**
- Content cached at edge servers worldwide
- Users connect to nearest edge server
- Reduces latency and improves performance

**Examples:** Cloudflare, Akamai, AWS CloudFront

**Use Case:** Deliver web content, streaming video, software downloads

---

### WAN Optimizer

**Function:** Improves WAN performance through compression, caching, deduplication

**Techniques:**
- **Data compression:** Reduce bandwidth usage
- **Deduplication:** Send only changed data
- **Caching:** Store frequently accessed data locally
- **Protocol optimization:** Reduce chattiness

**Use Case:** Branch offices with slow WAN links

---

## VoIP and Unified Communications Devices

### VoIP Gateway

**Function:** Converts between VoIP (IP) and traditional PSTN (analog/digital)

**Use Case:** Connect IP phone system to traditional phone lines

---

### VoIP PBX (IP-PBX)

**Function:** Private phone system for business using VoIP

**Features:**
- Call routing
- Voicemail
- Auto-attendant
- Conference calling

**Examples:** Cisco CUCM, Asterisk, FreePBX

---

## Specialized Devices

### Network Attached Storage (NAS)

**Function:** File-level storage accessible over network

**Protocols:** SMB/CIFS (Windows), NFS (Linux)

**Use Case:** Shared storage for files, backups

---

### Storage Area Network (SAN)

**Function:** Block-level storage network (dedicated storage network)

**Protocols:** iSCSI (IP), Fibre Channel

**Use Case:** Enterprise databases, virtualization storage

---

### VPN Concentrator

**Function:** Terminates VPN connections (multiple simultaneous VPNs)

**Features:**
- IPsec, SSL/TLS VPN support
- Authentication (RADIUS, LDAP)
- High concurrent connection capacity

**Use Case:** Remote access VPN for enterprise

---

## Device Comparison Table

| Device | OSI Layer | Function | Collision Domains | Broadcast Domains |
|--------|-----------|----------|-------------------|-------------------|
| Hub | 1 | Broadcast signal | 1 (all ports) | 1 |
| Switch | 2 | Forward frames (MAC) | 1 per port | 1 (or VLANs) |
| Router | 3 | Route packets (IP) | 1 per interface | 1 per interface |
| Firewall | 3-7 | Filter traffic | Varies | Varies |
| IDS/IPS | 2-7 | Detect/prevent threats | N/A (monitor/inline) | N/A |
| Load Balancer | 4/7 | Distribute traffic | Varies | Varies |
| WAP | 2 | Wireless connectivity | Shared (wireless) | 1 per SSID/VLAN |
| WLC | 2-3 | Manage APs centrally | N/A | N/A |
| Proxy Server | 7 | Intermediary for web | N/A | N/A |
| Content Filter | 7 | Control web access | N/A | N/A |
| VPN Concentrator | 3-7 | Terminate VPN tunnels | N/A | N/A |

### Multi-Vendor Device Management Comparison

Network engineers must manage devices from multiple vendors. While concepts are the same, each vendor has its own CLI and management model:

| Task | Cisco IOS | Juniper Junos | Arista EOS | HP/Aruba |
|------|-----------|---------------|------------|----------|
| Access CLI | `enable` → `configure terminal` | `cli` → `configure` | `enable` → `configure terminal` | `enable` → `configure terminal` |
| Show running config | `show running-config` | `show configuration` | `show running-config` | `show running-config` |
| Save config | `copy running-config startup-config` | `commit` (auto-saves) | `copy running-config startup-config` | `write memory` |
| Rollback config | `configure replace` (limited) | `rollback 1` (built-in) | `configure replace` | `cfg-restore` |
| Show interfaces | `show ip interface brief` | `show interfaces terse` | `show ip interface brief` | `show interfaces brief` |
| Show version | `show version` | `show version` | `show version` | `show version` |
| Show logs | `show logging` | `show log messages` | `show logging` | `show logging` |
| Config model | Imperative (changes apply immediately) | Candidate-commit (stage → commit) | Imperative (like Cisco) | Imperative |

> **Key Insight:** Juniper's **candidate-commit model** is considered safer for production networks — you stage all changes in a candidate configuration, review them with `show | compare`, then apply atomically with `commit`. If something breaks, `rollback 1` instantly reverts. Cisco and Arista apply changes immediately as you type them.

---

## Device Selection and Placement Guide

Choosing the right network device depends on several factors. Here is a decision framework:

### By Network Tier

```
                        [Internet]
                            |
  PERIMETER TIER:     [Firewall/NGFW] + [IDS/IPS]
                            |
  DMZ TIER:           [Load Balancer] → [Web Servers]
                      [Reverse Proxy]
                      [Content Filter]
                            |
  CORE TIER:          [Core L3 Switch] (routing between VLANs)
                      [WAN Router] (branch connectivity)
                            |
  DISTRIBUTION TIER:  [Distribution L3 Switches]
                      [Wireless LAN Controller]
                            |
  ACCESS TIER:        [Access L2 Switches (PoE)]
                      [Wireless APs]
                      [VoIP Phones]
```

### Device Selection by Requirement

| Requirement | Primary Device | Alternative |
|---|---|---|
| Connect 48 users to LAN | 48-port managed switch | Stackable switches |
| Provide WiFi for 200 users | WLC + lightweight APs | Autonomous APs (small scale) |
| Block unauthorized internet access | NGFW or content filter | Proxy server |
| Distribute web traffic across servers | Load balancer | DNS round-robin |
| Connect branch office to HQ | Router with VPN | SD-WAN appliance |
| Monitor for intrusions | IDS (passive) | IPS (active blocking) |
| Route between VLANs | Layer 3 switch | Router-on-a-stick |
| Power IP phones and cameras | PoE+ switch (802.3at) | PoE injectors |
| Centralize file storage | NAS | SAN (block-level) |

---

## Summary

1. **Hubs** are obsolete (replaced by switches)
2. **Switches** forward frames based on MAC addresses (Layer 2)
3. **Routers** route packets based on IP addresses (Layer 3)
4. **Firewalls** control traffic based on security policies
5. **IDS monitors, IPS blocks** malicious traffic
6. **Load balancers** distribute traffic across multiple servers
7. **Layer 3 switches** combine switching and routing in hardware

---

## Practice Questions


**Q1.** At which OSI layer does a router operate?

A) Layer 1
B) Layer 2
C) Layer 3
D) Layer 7

<details>
<summary>Answer</summary>

**C)** ** C - Routers operate at Layer 3 (Network Layer), making forwarding decisions based on IP addresses.
</details>

**Q2.** What is the primary difference between an IDS and an IPS?

A) IDS operates at Layer 2, IPS at Layer 3
B) IDS monitors and alerts, IPS blocks traffic
C) IDS is faster than IPS
D) IPS cannot detect zero-day attacks

<details>
<summary>Answer</summary>

**B)** ** B - IDS (Intrusion Detection System) passively monitors and alerts, while IPS (Intrusion Prevention System) actively blocks malicious traffic inline.
</details>

**Q3.** Which device creates a separate collision domain for each port?

A) Hub
B) Switch
C) Repeater
D) Bridge (per segment, not per port)

<details>
<summary>Answer</summary>

**B)** ** B - Switches create a separate collision domain for each port, allowing full-duplex communication and eliminating collisions.
</details>

**Q4.** What is the primary function of a load balancer?

A) Filter traffic based on security rules
B) Distribute traffic across multiple servers
C) Convert analog signals to digital
D) Encrypt network traffic

<details>
<summary>Answer</summary>

**B)** ** B - Load balancers distribute incoming traffic across multiple servers to improve performance, reliability, and availability.
</details>

**Q5.** Which type of firewall can inspect application-layer protocols?

A) Packet-filtering firewall
B) Stateful firewall
C) Next-Generation Firewall (NGFW)
D) Circuit-level firewall

<details>
<summary>Answer</summary>

**C)** ** C - Next-Generation Firewalls (NGFWs) perform deep packet inspection at Layer 7 (Application Layer), allowing them to identify and control specific applications.
</details>


## References

- **CompTIA Network+ N10-009 Objective 2.1:** Compare and contrast various devices, their features, and their appropriate placement on the network
- **CompTIA Network+ N10-009 Objective 2.3:** Explain the purposes and use cases for advanced networking devices
- Cisco CCNA: Network Devices Overview
- Professor Messer: Network+ N10-009 - Network Devices

---

**Next Lesson:** Lesson 23 - Network Documentation (Diagrams, Cable Management, Labels)

