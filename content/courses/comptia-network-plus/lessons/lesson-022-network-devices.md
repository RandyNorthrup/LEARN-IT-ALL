---
id: network-devices
title: Network Devices (Hubs, Switches, Routers, Firewalls, Load Balancers)
chapterId: ch2-network-implementations
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

This lesson covers fundamental and advanced network devices tested on the CompTIA Network+ N10-008 exam.

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

**Use Case:** Standard LAN connectivity (most common network device)

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

---

## Key Takeaways

1. **Hubs** are obsolete (replaced by switches)
2. **Switches** forward frames based on MAC addresses (Layer 2)
3. **Routers** route packets based on IP addresses (Layer 3)
4. **Firewalls** control traffic based on security policies
5. **IDS monitors, IPS blocks** malicious traffic
6. **Load balancers** distribute traffic across multiple servers
7. **Layer 3 switches** combine switching and routing in hardware

---

## Practice Questions

**1. At which OSI layer does a router operate?**
- A) Layer 1
- B) Layer 2
- C) Layer 3 ✓
- D) Layer 7

**Answer:** C - Routers operate at Layer 3 (Network Layer), making forwarding decisions based on IP addresses.

---

**2. What is the primary difference between an IDS and an IPS?**
- A) IDS operates at Layer 2, IPS at Layer 3
- B) IDS monitors and alerts, IPS blocks traffic ✓
- C) IDS is faster than IPS
- D) IPS cannot detect zero-day attacks

**Answer:** B - IDS (Intrusion Detection System) passively monitors and alerts, while IPS (Intrusion Prevention System) actively blocks malicious traffic inline.

---

**3. Which device creates a separate collision domain for each port?**
- A) Hub
- B) Switch ✓
- C) Repeater
- D) Bridge (per segment, not per port)

**Answer:** B - Switches create a separate collision domain for each port, allowing full-duplex communication and eliminating collisions.

---

**4. What is the primary function of a load balancer?**
- A) Filter traffic based on security rules
- B) Distribute traffic across multiple servers ✓
- C) Convert analog signals to digital
- D) Encrypt network traffic

**Answer:** B - Load balancers distribute incoming traffic across multiple servers to improve performance, reliability, and availability.

---

**5. Which type of firewall can inspect application-layer protocols?**
- A) Packet-filtering firewall
- B) Stateful firewall
- C) Next-Generation Firewall (NGFW) ✓
- D) Circuit-level firewall

**Answer:** C - Next-Generation Firewalls (NGFWs) perform deep packet inspection at Layer 7 (Application Layer), allowing them to identify and control specific applications.

---

## References

- **CompTIA Network+ N10-008 Objective 2.1:** Compare and contrast various devices, their features, and their appropriate placement on the network
- **CompTIA Network+ N10-008 Objective 2.3:** Explain the purposes and use cases for advanced networking devices
- Cisco CCNA: Network Devices Overview
- Professor Messer: Network+ N10-008 - Network Devices

---

**Next Lesson:** Lesson 23 - Network Documentation (Diagrams, Cable Management, Labels)

