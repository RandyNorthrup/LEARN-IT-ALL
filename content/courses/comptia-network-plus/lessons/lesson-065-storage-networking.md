---
id: lesson-065-storage-networking
title: "Storage Networking (SAN, NAS, iSCSI, Fibre Channel)"
chapterId: "chapter-007-cloud-datacenter"
order: 65
duration: 23
objectives:
  - Understand storage networking concepts
  - Differentiate between SAN and NAS
  - Explain iSCSI protocol and operation
  - Describe Fibre Channel technology
  - Identify storage networking use cases
---

# Storage Networking (SAN, NAS, iSCSI, Fibre Channel)

**Storage networking** connects servers to centralized storage systems, enabling shared access, improved performance, and simplified management. Key technologies include **SAN (Storage Area Network)**, **NAS (Network Attached Storage)**, **iSCSI**, and **Fibre Channel**.

This lesson covers storage networking fundamentals—important for the CompTIA Network+ N10-008 exam.

---

## Storage Networking Overview

### Why Storage Networking?

**Problems with Direct-Attached Storage (DAS):**
- Storage dedicated to single server (can't share)
- Limited scalability
- Difficult backups (must backup each server individually)
- Inefficient utilization (some servers have unused space)

**Storage Networking Solutions:**
- **Centralized storage**: Multiple servers access shared storage
- **Scalability**: Add storage capacity easily
- **Simplified backups**: Backup from central location
- **Better utilization**: Allocate storage dynamically

### Storage Networking Types

| Type | Protocol | Access Method | Use Case |
|------|----------|---------------|----------|
| **DAS** | SATA, SAS | Block-level | Single server |
| **NAS** | NFS, SMB/CIFS | File-level | File sharing |
| **SAN** | Fibre Channel, iSCSI, FCoE | Block-level | Databases, VMs |

---

## DAS (Direct-Attached Storage)

### What is DAS?

**Direct-Attached Storage** is storage directly connected to a single server (internal drives or external enclosure).

**Architecture:**
```
┌────────────┐     ┌──────────────┐
│   Server   │─────│  External    │
│            │SATA │  Disk Array  │
│  Internal  │ or  │              │
│  Drives    │SAS  └──────────────┘
└────────────┘
```

### Characteristics

**Directly connected:**
- SATA, SAS, or USB cables
- No network involvement

**Dedicated:**
- Storage used by single server only
- Cannot be shared with other servers

### Advantages of DAS

✅ **Simple**: Easy to setup
✅ **Low cost**: No additional networking hardware
✅ **Performance**: Direct connection, low latency

### Disadvantages of DAS

❌ **No sharing**: Other servers can't access
❌ **Limited scalability**: Physical connection limitations
❌ **Backup complexity**: Must backup each server
❌ **Inefficient**: Unused storage can't be reallocated

---

## NAS (Network Attached Storage)

### What is NAS?

**Network Attached Storage** is a dedicated file storage device connected to network, providing **file-level** access via standard network protocols.

### NAS Architecture

```
┌──────────┐   ┌──────────┐   ┌──────────┐
│ Server 1 │   │ Server 2 │   │ Server 3 │
└─────┬────┘   └─────┬────┘   └─────┬────┘
      │              │              │
      └──────────────┼──────────────┘
                     │
              Ethernet Network
                     │
           ┌─────────▼─────────┐
           │   NAS Device      │
           │ ┌───────────────┐ │
           │ │ File System   │ │
           │ │ (NFS, SMB)    │ │
           │ └───────┬───────┘ │
           │         │         │
           │  ┌──────▼──────┐  │
           │  │   Disks     │  │
           │  │  (RAID)     │  │
           │  └─────────────┘  │
           └───────────────────┘
```

### How NAS Works

**File-level access:**
- Clients mount NAS shares as network drives
- Access files/folders via file system
- NAS handles all disk management

**Network protocols:**
- **NFS (Network File System)**: Unix/Linux
- **SMB/CIFS (Server Message Block)**: Windows
- **AFP (Apple Filing Protocol)**: macOS (legacy)

### NAS Example

**Linux client mounting NFS share:**
```bash
mount 192.168.1.100:/share /mnt/nas
```

**Windows client accessing SMB share:**
```
\\NAS-SERVER\SharedFolder
```

### NAS Features

**File services:**
- File sharing across multiple clients
- User permissions and quotas
- Snapshots for point-in-time recovery

**RAID support:**
- RAID 0, 1, 5, 6, 10
- Protects against disk failures

**Protocols:**
- NFS, SMB/CIFS, FTP, HTTP

### Advantages of NAS

✅ **Easy to use**: Standard file sharing protocols
✅ **Shared access**: Multiple clients access same files
✅ **Centralized management**: Manage storage from single device
✅ **Cost-effective**: Relatively inexpensive
✅ **Cross-platform**: Supports Windows, Linux, macOS

### Disadvantages of NAS

❌ **File-level only**: Not suitable for block-level apps (databases)
❌ **Network dependency**: Performance limited by network speed
❌ **Latency**: Higher than DAS or SAN
❌ **Single point of failure**: Unless redundant NAS devices deployed

### Use Cases for NAS

- **File sharing**: Department file shares
- **Home directories**: User home folders
- **Backup storage**: Centralized backup target
- **Media storage**: Photos, videos
- **Small/medium businesses**: Cost-effective shared storage

---

## SAN (Storage Area Network)

### What is SAN?

**Storage Area Network** is a dedicated high-speed network that connects servers to shared block storage, appearing to servers as local disks.

### SAN Architecture

```
┌──────────┐   ┌──────────┐   ┌──────────┐
│ Server 1 │   │ Server 2 │   │ Server 3 │
│   HBA    │   │   HBA    │   │   HBA    │
└─────┬────┘   └─────┬────┘   └─────┬────┘
      │              │              │
      └──────────────┼──────────────┘
                     │
            SAN Fabric (Fibre Channel)
          ┌──────────┼──────────┐
          │          │          │
     ┌────▼────┐┌───▼────┐┌────▼────┐
     │  SAN    ││  SAN   ││  SAN    │
     │ Switch  ││ Switch ││ Switch  │
     └────┬────┘└───┬────┘└────┬────┘
          │          │          │
          └──────────┼──────────┘
                     │
            ┌────────▼────────┐
            │  Storage Array  │
            │  ┌───────────┐  │
            │  │   Disks   │  │
            │  │  (RAID)   │  │
            │  └───────────┘  │
            └─────────────────┘
```

### SAN Components

**HBA (Host Bus Adapter):**
- Specialized network card for SAN connectivity
- Connects server to SAN fabric
- Fibre Channel HBA or iSCSI HBA

**SAN Switch:**
- High-speed switch (Fibre Channel or Ethernet)
- Connects HBAs to storage arrays
- Redundant switches for fault tolerance

**Storage Array:**
- Disk array with multiple disks (RAID)
- Controllers manage I/O requests
- Examples: EMC, NetApp, Dell, HP

### How SAN Works

**Block-level access:**
- SAN presents **LUNs (Logical Unit Numbers)** to servers
- LUN appears as local disk to server
- Server formats with file system (NTFS, ext4, etc.)

**Example:**
```
Server sees:
  /dev/sdb (200 GB) ← Actually a LUN on SAN
  /dev/sdc (500 GB) ← Another LUN on SAN
```

### SAN Technologies

**Fibre Channel (FC):**
- Dedicated SAN protocol
- High speed: 8, 16, 32, 64 Gbps
- Expensive (specialized HBAs, switches, cables)

**iSCSI (IP-based):**
- SCSI over TCP/IP
- Uses standard Ethernet network
- Lower cost than Fibre Channel

**FCoE (Fibre Channel over Ethernet):**
- Fibre Channel frames over Ethernet
- 10 GbE or higher
- Unified network (storage + data)

### Advantages of SAN

✅ **High performance**: Low latency, high throughput
✅ **Block-level access**: Suitable for databases, VMs
✅ **Scalability**: Add storage without disrupting servers
✅ **Centralized management**: Manage all storage from central array
✅ **Advanced features**: Snapshots, replication, thin provisioning
✅ **Shared storage**: Multiple servers access (for clustering)

### Disadvantages of SAN

❌ **High cost**: Expensive hardware (HBAs, switches, arrays)
❌ **Complexity**: Requires specialized knowledge
❌ **Separate network**: Fibre Channel requires dedicated network

### Use Cases for SAN

- **Databases**: Oracle, SQL Server (require high IOPS)
- **Virtual machines**: VMware, Hyper-V (shared storage for VM mobility)
- **High-performance applications**: ERP, CRM systems
- **Clustering**: Multiple servers accessing same LUNs
- **Large enterprises**: Mission-critical applications

---

## Fibre Channel

### What is Fibre Channel?

**Fibre Channel** is a high-speed network technology designed specifically for storage networking, providing block-level access to storage.

### Fibre Channel Architecture

**Topology: SAN Fabric**
```
      ┌────────┐
      │ Server │
      │  HBA   │
      └───┬────┘
          │ FC Cable
     ┌────▼────┐
     │   FC    │
     │ Switch  │
     └────┬────┘
          │
     ┌────▼────────┐
     │   Storage   │
     │   Array     │
     └─────────────┘
```

### Fibre Channel Speeds

| Generation | Speed | Year |
|------------|-------|------|
| 1GFC | 1 Gbps | 1997 |
| 2GFC | 2 Gbps | 2001 |
| 4GFC | 4 Gbps | 2004 |
| 8GFC | 8 Gbps | 2005 |
| 16GFC | 16 Gbps | 2011 |
| 32GFC | 32 Gbps | 2016 |
| 64GFC | 64 Gbps | 2020 |
| 128GFC | 128 Gbps | 2022 |

### Fibre Channel Components

**HBA (Host Bus Adapter):**
- Connects server to FC switch
- Offloads SCSI processing from CPU
- Has unique **WWN (World Wide Name)** - like MAC address

**FC Switch:**
- Connects HBAs to storage
- Provides fabric services (zoning, aliasing)
- Redundant switches for high availability

**Storage Array:**
- FC ports connect to switches
- LUNs presented to servers

### Fibre Channel Zoning

**Zoning** controls which servers can see which storage devices (security and isolation).

**Types:**
- **Hard zoning**: Enforced by switch hardware
- **Soft zoning**: Enforced by name server

**Example:**
```
Zone 1: Server1 HBA → Storage Array Port 1 (LUN 0, LUN 1)
Zone 2: Server2 HBA → Storage Array Port 2 (LUN 2, LUN 3)
```

Server1 cannot see Server2's LUNs.

### Advantages of Fibre Channel

✅ **High performance**: Very high speeds (up to 128 Gbps)
✅ **Low latency**: Optimized for storage
✅ **Reliability**: Dedicated network, no TCP/IP overhead
✅ **Distance**: Up to 10 km (single-mode fiber)

### Disadvantages of Fibre Channel

❌ **Cost**: Expensive (HBAs $500-2000, switches $5000+)
❌ **Complexity**: Requires FC expertise
❌ **Separate network**: Cannot use existing Ethernet

---

## iSCSI (Internet Small Computer System Interface)

### What is iSCSI?

**iSCSI** encapsulates SCSI commands in TCP/IP, allowing block-level storage access over standard Ethernet networks.

### iSCSI Architecture

```
┌────────────┐                 ┌───────────────┐
│   Server   │                 │   Storage     │
│ (Initiator)│   Ethernet      │   Array       │
│            │◀───────────────▶│  (Target)     │
│ iSCSI      │    Network      │  iSCSI        │
│ Software or│    (TCP/IP)     │  (LUNs)       │
│  HBA       │                 │               │
└────────────┘                 └───────────────┘
```

### iSCSI Components

**Initiator (Client):**
- Server that accesses storage
- Software initiator (OS driver) or hardware initiator (iSCSI HBA)
- Sends SCSI commands over network

**Target (Storage):**
- Storage array providing LUNs
- Listens for iSCSI connections
- Has **IQN (iSCSI Qualified Name)**: unique identifier

**Example IQN:**
```
iqn.1991-05.com.microsoft:server01-target
```

### iSCSI Process

1. **Discovery**: Initiator discovers available targets
2. **Login**: Initiator authenticates and logs into target
3. **LUN mapping**: Target presents LUNs to initiator
4. **Access**: Initiator reads/writes blocks over TCP/IP

### iSCSI Configuration (Linux Example)

**Initiator side:**
```bash
# Discover targets
iscsiadm --mode discovery --type sendtargets --portal 192.168.1.100

# Login to target
iscsiadm --mode node --targetname iqn.2021-01.com.example:storage --portal 192.168.1.100 --login

# LUN appears as /dev/sdb
fdisk -l /dev/sdb
```

### Software vs Hardware iSCSI

**Software Initiator:**
- Uses standard Ethernet NIC
- iSCSI protocol handled by CPU
- Free (built into OS)
- Lower performance (CPU overhead)

**Hardware Initiator (iSCSI HBA):**
- Dedicated iSCSI HBA
- Offloads TCP/IP and iSCSI processing
- Higher cost ($200-500)
- Better performance (CPU offload)

### iSCSI Security

**CHAP (Challenge Handshake Authentication Protocol):**
- Authenticates initiator to target
- Unidirectional or bidirectional (mutual)

**IPsec:**
- Encrypts iSCSI traffic
- Protects data in transit

**VLANs:**
- Isolate iSCSI traffic on dedicated VLAN

### Advantages of iSCSI

✅ **Lower cost**: Uses standard Ethernet (no FC HBAs/switches)
✅ **Familiar**: IT staff already know Ethernet/IP
✅ **Long distance**: Can route over WAN
✅ **Flexibility**: Mix storage and data traffic (with QoS)

### Disadvantages of iSCSI

❌ **Performance**: Lower than Fibre Channel (TCP/IP overhead)
❌ **CPU overhead**: Software initiators use CPU cycles
❌ **Network dependency**: Competes with other traffic (unless dedicated network)

### Use Cases for iSCSI

- **Small/medium businesses**: Cost-effective SAN
- **Remote offices**: Access centralized storage over WAN
- **Virtual machines**: Shared storage for VMware/Hyper-V
- **Databases**: When Fibre Channel cost not justified

---

## FCoE (Fibre Channel over Ethernet)

### What is FCoE?

**FCoE** encapsulates Fibre Channel frames in Ethernet frames, allowing unified network for storage and data traffic.

### FCoE Architecture

```
┌───────────┐
│  Server   │
│  CNA      │  (Converged Network Adapter)
└─────┬─────┘
      │ 10 GbE
┌─────▼──────┐
│  FCoE      │
│  Switch    │
└─────┬──────┘
      ├───────▶ Ethernet (data traffic)
      │
      └───────▶ Fibre Channel (storage traffic)
```

### Advantages of FCoE

✅ **Unified network**: Single cable for storage + data
✅ **Reduced cables**: Fewer NICs/HBAs per server
✅ **10 GbE performance**: High bandwidth

### Disadvantages of FCoE

❌ **Complexity**: Requires FCoE-capable switches
❌ **Limited adoption**: iSCSI and FC more common
❌ **10 GbE required**: Minimum 10 Gigabit Ethernet

---

## SAN vs NAS Comparison

| Aspect | SAN | NAS |
|--------|-----|-----|
| **Access Method** | Block-level | File-level |
| **Protocol** | FC, iSCSI, FCoE | NFS, SMB/CIFS |
| **Appears as** | Local disk (/dev/sdb) | Network share (\\server\share) |
| **Use Case** | Databases, VMs | File sharing |
| **Performance** | Higher (low latency) | Lower (network latency) |
| **Cost** | Higher (FC expensive) | Lower |
| **Complexity** | More complex | Simpler |
| **File System** | Server manages | NAS manages |

**When to use SAN:**
- High-performance applications (databases)
- Virtual machine storage
- Require block-level access

**When to use NAS:**
- File sharing
- Home directories
- Media storage
- Cost-sensitive environments

---

## Key Takeaways

1. **DAS** is directly attached storage (single server), **NAS** is file-level network storage, **SAN** is block-level network storage
2. **NAS** uses standard protocols (NFS, SMB) for file sharing across multiple clients
3. **SAN** provides block-level access, appearing to servers as local disks (suitable for databases, VMs)
4. **Fibre Channel** is dedicated SAN technology with speeds up to 128 Gbps (expensive, high performance)
5. **iSCSI** encapsulates SCSI over TCP/IP, using standard Ethernet (lower cost than FC)
6. **HBA (Host Bus Adapter)** connects servers to SAN (FC HBA or iSCSI HBA)
7. **LUN (Logical Unit Number)** is a logical disk presented by SAN to server
8. **FCoE** combines Fibre Channel and Ethernet into unified network
9. **SAN** more complex/expensive but higher performance; **NAS** simpler/cheaper for file sharing
10. **iSCSI security** uses CHAP authentication and optionally IPsec encryption

---

## References

- **CompTIA Network+ N10-008 Objective 1.8:** Summarize cloud concepts and connectivity options (storage concepts)
- Fibre Channel Industry Association (FCIA)
- RFC 3720: iSCSI Specification
- VMware Storage Documentation
- Professor Messer: Network+ N10-008 - Storage Networking

---

**Next Lesson:** Lesson 66 - Datacenter Network Architecture (Three-Tier, Spine-Leaf)
