---
id: network-types
title: Network Types and Classifications
chapterId: ch1-networking-fundamentals
order: 10
duration: 65
objectives:
  - Identify and describe different network types by size and scope
  - Understand the characteristics of LAN, WAN, MAN, PAN, CAN, and SAN
  - Recognize network classification criteria
  - Differentiate between network types in real-world scenarios
  - Understand when to use each network type
---

# Lesson 10: Network Types and Classifications

## Learning Objectives
- Identify and describe different network types by size and scope
- Understand the characteristics of LAN, WAN, MAN, PAN, CAN, and SAN
- Recognize network classification criteria
- Differentiate between network types in real-world scenarios
- Understand when to use each network type

## Introduction

Networks are classified by their **geographic scope**, **ownership**, **architecture**, and **purpose**. Understanding these classifications helps in network design, troubleshooting, and selecting appropriate technologies.

This lesson covers the major network types you'll encounter in the CompTIA Network+ exam and professional networking.

---

## Network Classification Criteria

Networks can be classified by:

**1. Geographic Scope:**
- How large an area the network covers
- Distance between devices
- Examples: PAN, LAN, MAN, WAN

**2. Ownership:**
- Private (organization-owned)
- Public (ISP-provided)
- Hybrid (combination)

**3. Architecture:**
- Client-server
- Peer-to-peer
- Cloud-based

**4. Topology:**
- Physical layout (covered in Lesson 9)
- Logical data flow

**5. Purpose:**
- Storage (SAN)
- Campus (CAN)
- Data center
- Industrial (ICS/SCADA)

---

## PAN (Personal Area Network)

### Definition

A **Personal Area Network** connects devices in a person's immediate vicinity, typically within 10 meters (33 feet).

### Characteristics

**Coverage:** 1-10 meters  
**Devices:** Personal devices (phone, laptop, watch, headphones)  
**Technologies:** Bluetooth, NFC, Infrared, USB  
**Speed:** Usually low to moderate  
**Ownership:** Individual  

### Technologies

**Bluetooth:**
- **Range:** Up to 10m (Class 2), 100m (Class 1)
- **Speed:** Up to 3 Mbps (Bluetooth 5.0: 50 Mbps)
- **Use:** Wireless headphones, keyboards, mice, speakers
- **Versions:** 4.0 (LE), 5.0, 5.2, 5.3

**NFC (Near Field Communication):**
- **Range:** <10 cm (very close)
- **Speed:** 424 kbps
- **Use:** Contactless payments, pairing, data exchange
- **Examples:** Apple Pay, Google Pay, tap-to-pair

**Infrared (IrDA):**
- **Range:** 1-2 meters (line of sight)
- **Speed:** Up to 4 Mbps
- **Use:** Legacy (TV remotes, old phones)
- **Status:** Mostly obsolete

**USB (Universal Serial Bus):**
- **Range:** 5 meters (without repeater)
- **Speed:** USB 2.0 (480 Mbps), USB 3.0 (5 Gbps), USB 3.1 (10 Gbps), USB4 (40 Gbps)
- **Use:** Wired connections, charging, data transfer

**Zigbee:**
- **Range:** 10-100 meters
- **Speed:** 250 kbps
- **Use:** IoT, smart home devices, low power
- **Protocol:** IEEE 802.15.4

### Examples

**Typical PAN devices:**
- Smartphone ↔ Bluetooth headphones
- Laptop ↔ Wireless mouse/keyboard
- Smartwatch ↔ Phone
- Phone ↔ Fitness tracker
- Tablet ↔ Stylus

### Use Cases

✅ **Personal devices:** Connecting peripherals  
✅ **Wearables:** Smartwatches, fitness trackers  
✅ **IoT devices:** Smart home sensors  
✅ **Mobile payments:** NFC transactions  

---

## LAN (Local Area Network)

### Definition

A **Local Area Network** connects devices within a limited geographic area, typically a single building or campus.

### Characteristics

**Coverage:** Single building or campus (up to a few kilometers)  
**Devices:** Computers, printers, servers, switches  
**Technologies:** Ethernet (802.3), Wi-Fi (802.11)  
**Speed:** 100 Mbps - 100 Gbps (Ethernet), 1-10 Gbps (Wi-Fi 6/6E)  
**Ownership:** Private (organization-owned)  
**Latency:** Very low (<1ms)  

### Common LAN Technologies

**Wired Ethernet (IEEE 802.3):**
- **Standards:** 10BASE-T, 100BASE-TX, 1000BASE-T, 10GBASE-T
- **Cables:** Cat5e, Cat6, Cat6a, Cat7
- **Speed:** 10 Mbps to 100 Gbps
- **Topology:** Star (switched)

**Wireless (Wi-Fi - IEEE 802.11):**
- **Standards:** 802.11a/b/g/n/ac/ax (Wi-Fi 6), 802.11be (Wi-Fi 7)
- **Frequency:** 2.4 GHz, 5 GHz, 6 GHz (Wi-Fi 6E)
- **Speed:** 11 Mbps (802.11b) to 10+ Gbps (Wi-Fi 6E)
- **Range:** 30-100 meters indoors

### LAN Characteristics

**Advantages:**
✅ High speed and low latency  
✅ High reliability  
✅ Full control over infrastructure  
✅ Secure (physical control)  
✅ Cost-effective (no monthly fees)  

**Disadvantages:**
❌ Limited geographic area  
❌ Infrastructure costs (switches, cabling)  
❌ Maintenance responsibility  

### LAN Types

**SOHO (Small Office/Home Office):**
- 1-20 devices
- Single router/switch
- Consumer-grade equipment

**SMB (Small to Medium Business):**
- 20-250 devices
- Multiple switches
- VLANs for segmentation
- Professional-grade equipment

**Enterprise:**
- 250+ devices
- Hierarchical design (core/distribution/access)
- Multiple VLANs
- High redundancy
- Enterprise-grade equipment

### Examples

- Office network (computers, printers, servers)
- School campus network
- Hospital network
- Home network
- Factory floor network

### Use Cases

✅ **Office connectivity:** Connect workstations, printers  
✅ **Resource sharing:** Files, printers, applications  
✅ **Internal communication:** Email, messaging  
✅ **Centralized services:** Authentication, storage  

---

## WLAN (Wireless Local Area Network)

### Definition

A wireless version of LAN using radio frequencies (Wi-Fi) instead of cables.

### Characteristics

**Coverage:** Similar to LAN (building or campus)  
**Technology:** IEEE 802.11 (Wi-Fi)  
**Speed:** Up to 10+ Gbps (Wi-Fi 6E/7)  
**Frequency Bands:** 2.4 GHz, 5 GHz, 6 GHz  

### Wi-Fi Standards

| Standard | Year | Frequency | Max Speed | Range |
|----------|------|-----------|-----------|-------|
| **802.11b** | 1999 | 2.4 GHz | 11 Mbps | Good |
| **802.11a** | 1999 | 5 GHz | 54 Mbps | Short |
| **802.11g** | 2003 | 2.4 GHz | 54 Mbps | Good |
| **802.11n** (Wi-Fi 4) | 2009 | 2.4/5 GHz | 600 Mbps | Good |
| **802.11ac** (Wi-Fi 5) | 2014 | 5 GHz | 6.9 Gbps | Good |
| **802.11ax** (Wi-Fi 6) | 2019 | 2.4/5 GHz | 9.6 Gbps | Better |
| **802.11ax** (Wi-Fi 6E) | 2020 | 6 GHz | 9.6 Gbps | Better |
| **802.11be** (Wi-Fi 7) | 2024 | 2.4/5/6 GHz | 46 Gbps | Better |

### WLAN Components

**Access Point (AP):**
- Connects wireless clients to wired network
- SSID (Service Set Identifier) broadcast
- Multiple SSIDs supported (guest networks)

**Wireless Controller:**
- Manages multiple APs
- Centralized configuration
- Roaming support

**Wireless Client:**
- Laptop, smartphone, tablet
- Wi-Fi adapter required

### Security

**Encryption Standards:**
- **WEP:** Obsolete, extremely insecure
- **WPA:** Deprecated, TKIP encryption
- **WPA2:** Current standard, AES encryption
- **WPA3:** Latest, enhanced security (SAE)

**Authentication:**
- **Personal (PSK):** Pre-shared key
- **Enterprise (802.1X):** RADIUS authentication

### Use Cases

✅ **Mobile devices:** Laptops, phones, tablets  
✅ **Guest networks:** Public Wi-Fi  
✅ **IoT devices:** Smart home, sensors  
✅ **Temporary connectivity:** Events, construction  

---

## MAN (Metropolitan Area Network)

### Definition

A **Metropolitan Area Network** spans a city or metropolitan area, larger than LAN but smaller than WAN.

### Characteristics

**Coverage:** City or metropolitan area (5-50 km)  
**Technologies:** Fiber optic, WiMAX, Metro Ethernet  
**Speed:** 10 Gbps - 100 Gbps  
**Ownership:** Often ISP-owned, sometimes organization-owned  

### Technologies

**Metro Ethernet:**
- Ethernet over fiber in metropolitan area
- Carrier-grade Ethernet services
- E-Line, E-LAN services

**WiMAX (IEEE 802.16):**
- Wireless MAN technology
- Long-range wireless (up to 50 km)
- Mostly obsolete (replaced by LTE/5G)

**SONET/SDH:**
- Synchronous optical networking
- Fiber optic ring topology
- Telecommunications standard

### Examples

- Connecting multiple offices in a city
- University campus across city
- City-wide public Wi-Fi
- Cable TV network in a city
- Smart city infrastructure

### Use Cases

✅ **Branch connectivity:** Connect offices in same city  
✅ **Campus extension:** Multiple locations in metro area  
✅ **Service provider backbone:** ISP infrastructure  
✅ **Smart city:** Traffic lights, cameras, sensors  

---

## WAN (Wide Area Network)

### Definition

A **Wide Area Network** spans large geographic areas, connecting LANs across cities, countries, or continents.

### Characteristics

**Coverage:** Cities, countries, continents (unlimited)  
**Technologies:** MPLS, leased lines, VPN, SD-WAN  
**Speed:** 1.5 Mbps (T1) to 100+ Gbps  
**Ownership:** Typically leased from ISPs  
**Latency:** Higher than LAN (10-100+ ms)  

### WAN Technologies

**Leased Lines:**
- **T1:** 1.544 Mbps (24 DS0 channels)
- **E1:** 2.048 Mbps (European)
- **T3:** 44.736 Mbps
- **OC-3:** 155 Mbps (SONET)
- **OC-12:** 622 Mbps
- Dedicated, point-to-point, expensive

**Frame Relay:**
- Legacy packet-switching technology
- Virtual circuits (PVCs)
- Variable bandwidth
- Mostly obsolete

**ATM (Asynchronous Transfer Mode):**
- Cell-switching technology (53-byte cells)
- QoS support
- Legacy, mostly replaced

**MPLS (Multiprotocol Label Switching):**
- Label-based forwarding
- Traffic engineering
- VPN support (L2VPN, L3VPN)
- Common for enterprise WANs

**VPN (Virtual Private Network):**
- Encrypted tunnel over public Internet
- IPsec, SSL/TLS VPN
- Cost-effective WAN alternative
- Site-to-site or remote access

**SD-WAN (Software-Defined WAN):**
- Modern WAN approach
- Multiple transport types (MPLS, Internet, LTE)
- Application-aware routing
- Centralized management
- Cost-effective and flexible

**Broadband:**
- **Cable:** DOCSIS (up to 10 Gbps)
- **DSL:** ADSL, VDSL (up to 100 Mbps)
- **Fiber:** FTTH, FTTP (up to 10 Gbps)
- **Satellite:** Starlink, HughesNet (up to 200+ Mbps)
- **Cellular:** 4G LTE, 5G (up to 10+ Gbps)

### The Internet

The **Internet** is the largest WAN, connecting billions of devices worldwide.

**Characteristics:**
- Public network
- ISPs provide connectivity
- TCP/IP protocol suite
- Hierarchical structure (Tier 1, 2, 3 ISPs)
- BGP routing between ISPs

### Examples

- Corporate network connecting global offices
- Bank network connecting branches nationwide
- The Internet
- Cloud service provider infrastructure

### Use Cases

✅ **Branch connectivity:** Connect geographically dispersed offices  
✅ **Remote access:** VPN for remote workers  
✅ **Cloud connectivity:** Connect to AWS, Azure, GCP  
✅ **Disaster recovery:** Off-site backup connections  

---

## CAN (Campus Area Network)

### Definition

A **Campus Area Network** connects multiple LANs within a limited geographic area, typically multiple buildings.

### Characteristics

**Coverage:** Multiple buildings in close proximity (1-5 km)  
**Technologies:** Fiber optic backbone, Ethernet  
**Speed:** 10 Gbps - 100 Gbps  
**Ownership:** Organization-owned  

### CAN vs LAN

**CAN:**
- Multiple buildings
- Fiber backbone between buildings
- Larger scale
- More complex routing

**LAN:**
- Single building
- Typically copper cabling
- Smaller scale
- Simple switching

### Examples

- University campus (multiple buildings, dorms, labs)
- Corporate campus (multiple office buildings)
- Hospital complex (multiple buildings, parking structures)
- Military base
- Industrial park

### Typical Architecture

```
Building A       Building B       Building C
[LAN Switches]   [LAN Switches]   [LAN Switches]
      |                |                |
      +----------------+----------------+
              Fiber Optic Backbone
              (10-100 Gbps)
```

### Use Cases

✅ **Educational institutions:** Universities, colleges  
✅ **Corporate campuses:** Multi-building headquarters  
✅ **Healthcare facilities:** Hospital complexes  
✅ **Government facilities:** Multi-building complexes  

---

## SAN (Storage Area Network)

### Definition

A **Storage Area Network** is a dedicated high-speed network for storage devices.

### Characteristics

**Purpose:** Storage access (block-level)  
**Technologies:** Fibre Channel, iSCSI, FCoE  
**Speed:** 8 Gbps - 128 Gbps (Fibre Channel)  
**Protocol:** SCSI over network  
**Separation:** Dedicated network, isolated from LAN  

### SAN Technologies

**Fibre Channel (FC):**
- Dedicated FC switches and HBAs
- Very high speed (8, 16, 32, 64, 128 Gbps)
- Expensive
- Most reliable
- Block-level storage access

**iSCSI (Internet Small Computer System Interface):**
- SCSI over TCP/IP
- Uses standard Ethernet
- Cost-effective
- Good performance (up to 100 Gbps with modern Ethernet)
- More flexible than FC

**FCoE (Fibre Channel over Ethernet):**
- FC frames over Ethernet
- Convergence solution
- Requires lossless Ethernet (DCB)
- Reduced cabling

### SAN vs NAS

| Feature | SAN | NAS |
|---------|-----|-----|
| **Access** | Block-level | File-level |
| **Protocol** | FC, iSCSI | NFS, SMB/CIFS |
| **Network** | Dedicated | Shared LAN |
| **Speed** | Very high | High |
| **Cost** | Expensive | Moderate |
| **Use case** | Databases, VMs | File sharing |
| **Management** | Complex | Simple |

### Components

**Storage Array:**
- Disk enclosure with multiple drives
- RAID configurations
- Controllers

**SAN Switch/Fabric:**
- Fibre Channel switches
- Connect servers to storage

**HBA (Host Bus Adapter):**
- Fibre Channel adapter in server
- Connects server to SAN

**Initiator (iSCSI):**
- Software or hardware initiator
- Client side of iSCSI connection

**Target (iSCSI):**
- Storage side of iSCSI connection

### Use Cases

✅ **Database servers:** SQL, Oracle  
✅ **Virtualization:** VMware, Hyper-V storage  
✅ **High-performance computing:** Fast storage access  
✅ **Backup and disaster recovery:** Centralized storage  

---

## Other Network Classifications

### SDWAN (Software-Defined WAN)

**Modern WAN approach:**
- Software-controlled WAN connections
- Multiple transport types (MPLS, Internet, LTE, 5G)
- Application-aware routing
- Centralized management (cloud-based)
- Cost savings (use Internet instead of MPLS)

**Benefits:**
- Lower cost
- Better application performance
- Simplified management
- Faster deployment
- Enhanced security

### GAN (Global Area Network)

**Definition:** Network spanning multiple countries/continents.

**Example:** The Internet, multinational corporation networks

**Characteristics:**
- Largest geographic scope
- Multiple WAN connections
- International carriers
- Complex routing

### VPN (Virtual Private Network)

**Types:**

**Site-to-Site VPN:**
- Connect two networks
- Always-on
- Router-to-router
- Replaces expensive leased lines

**Remote Access VPN:**
- Individual users connect to corporate network
- On-demand
- Client software required
- Secure remote work

**Protocols:**
- IPsec (most common for site-to-site)
- SSL/TLS VPN (common for remote access)
- OpenVPN
- WireGuard

---

## Network Type Comparison

| Type | Coverage | Speed | Cost | Ownership | Example |
|------|----------|-------|------|-----------|---------|
| **PAN** | 1-10m | Low-Med | Low | Personal | Bluetooth headphones |
| **LAN** | Building | High | Medium | Private | Office network |
| **WLAN** | Building | Medium-High | Medium | Private | Wi-Fi network |
| **CAN** | Campus | Very High | High | Private | University campus |
| **MAN** | City | Very High | High | Mixed | City-wide fiber |
| **WAN** | Country+ | Varies | Very High | Leased | Branch connectivity |
| **SAN** | Data Center | Extreme | Very High | Private | Storage network |

---

## Selecting Network Type

### Factors to Consider

**1. Geographic Scope:**
- How far apart are locations?
- Single room, building, campus, city, country?

**2. Performance Requirements:**
- Bandwidth needs
- Latency tolerance
- Reliability requirements

**3. Budget:**
- Initial investment
- Ongoing costs (ISP fees)
- Maintenance costs

**4. Control:**
- Full control (LAN) vs. shared control (WAN)
- Regulatory compliance
- Security requirements

**5. Scalability:**
- Growth plans
- Flexibility needs

### Decision Matrix Example

**Single office building:**
- Choose: LAN (Ethernet) + WLAN (Wi-Fi)
- Why: Limited area, full control, high performance

**Multiple buildings (same campus):**
- Choose: CAN with fiber backbone
- Why: Short distances, high speed needed, full control

**Multiple cities:**
- Choose: WAN (MPLS, VPN, or SD-WAN)
- Why: Long distances, leased connectivity

**High-performance storage:**
- Choose: SAN (FC or iSCSI)
- Why: Block-level access, dedicated network

---

## Summary

Networks are classified by geographic scope and purpose:

**By Size (smallest to largest):**
1. **PAN:** Personal devices (Bluetooth, NFC)
2. **LAN:** Single building (Ethernet, Wi-Fi)
3. **CAN:** Multiple buildings/campus (Fiber backbone)
4. **MAN:** City/metro area (Metro Ethernet, fiber)
5. **WAN:** Multiple cities/countries (MPLS, VPN, Internet)

**By Purpose:**
- **SAN:** Dedicated storage network (FC, iSCSI)
- **WLAN:** Wireless LAN (Wi-Fi)
- **VPN:** Secure connectivity over public networks

**Key Distinctions:**
- **Coverage area:** PAN (meters) → LAN (building) → CAN (campus) → MAN (city) → WAN (country)
- **Ownership:** Private (LAN, CAN, SAN) vs. Leased (WAN, MAN)
- **Speed:** Generally higher for smaller geographic areas
- **Cost:** Generally higher for larger geographic areas

**Remember:** Choose network type based on geographic scope, performance requirements, budget, and control needs. Most organizations use a combination of network types.

---

## References

- **CompTIA Network+ N10-008 Objective 1.2**: Network types and characteristics
- **IEEE 802.3**: Ethernet (LAN)
- **IEEE 802.11**: Wireless LAN (WLAN)
- **IEEE 802.16**: WiMAX (MAN)
- **Professor Messer**: N10-008 Network+ Course