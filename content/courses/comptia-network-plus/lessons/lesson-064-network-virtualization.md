---
id: lesson-064-network-virtualization
title: "Network Virtualization (vNICs, vSwitches, SDN)"
chapterId: "chapter-007-cloud-datacenter"
order: 64
duration: 25
objectives:
  - Understand virtual network interface cards (vNICs)
  - Explain virtual switches (vSwitches) and their operation
  - Describe Software-Defined Networking (SDN) concepts
  - Identify network virtualization use cases
  - Compare traditional networking to virtualized networking
---

# Network Virtualization (vNICs, vSwitches, SDN)

**Network virtualization** abstracts physical network resources into software-defined components, enabling flexible, scalable, and efficient network management. Key technologies include **vNICs**, **vSwitches**, and **Software-Defined Networking (SDN)**.

This lesson covers network virtualization fundamentals—essential for the CompTIA Network+ N10-008 exam.

---

## What is Network Virtualization?

### Definition

**Network virtualization** separates network functions from physical hardware, creating virtual network components that operate independently of underlying physical infrastructure.

### Traditional vs Virtualized Networking

**Traditional Physical Network:**
```
┌────────┐     ┌────────┐     ┌────────┐
│ Server │─────│Physical│─────│Physical│
│   1    │     │ Switch │     │ Router │
└────────┘     └────────┘     └────────┘
┌────────┐          │              │
│ Server │──────────┘              │
│   2    │                         │
└────────┘                         │
                              External Network
```

**Virtualized Network:**
```
┌─────────────────────────────────────────┐
│         Physical Server (Hypervisor)     │
│  ┌─────┐  ┌─────┐  ┌─────────────────┐ │
│  │ VM1 │  │ VM2 │  │  Virtual Router │ │
│  │vNIC │  │vNIC │  │                 │ │
│  └──┬──┘  └──┬──┘  └────────┬────────┘ │
│     └────────┴──────────────┘          │
│           Virtual Switch                │
│                 │                       │
└─────────────────┼───────────────────────┘
                  │
         Physical NIC → External Network
```

### Benefits of Network Virtualization

✅ **Flexibility**: Create/modify networks instantly without physical cabling
✅ **Isolation**: Separate traffic for security and multi-tenancy
✅ **Cost reduction**: Fewer physical devices needed
✅ **Scalability**: Scale networks programmatically
✅ **Simplified management**: Centralized control
✅ **Rapid provisioning**: Deploy networks in seconds vs hours/days

---

## Virtual NICs (vNICs)

### What is a vNIC?

**Virtual Network Interface Card (vNIC)** is a software emulation of a physical network adapter, providing VMs with network connectivity.

### How vNICs Work

**VM perspective:**
- VM sees vNIC as standard network adapter (Intel E1000, VMware vmxnet3, etc.)
- OS installs drivers and treats it like physical NIC
- Sends/receives frames normally

**Hypervisor perspective:**
- Intercepts frames from vNIC
- Forwards to virtual switch
- Translates to physical NIC for external communication

### vNIC Architecture

```
┌──────────────────────────────────┐
│      Virtual Machine             │
│  ┌────────────────────────────┐  │
│  │   Operating System         │  │
│  │  ┌──────────────────────┐  │  │
│  │  │  Network Driver      │  │  │
│  │  └──────────┬───────────┘  │  │
│  └─────────────┼──────────────┘  │
│                │                 │
│  ┌─────────────▼──────────────┐  │
│  │  Virtual NIC (vNIC)        │  │
│  │  MAC: 00:50:56:XX:XX:XX    │  │
│  └─────────────┬──────────────┘  │
└────────────────┼─────────────────┘
                 │
          Hypervisor Layer
                 │
┌────────────────▼─────────────────┐
│       Virtual Switch             │
└──────────────────────────────────┘
```

### vNIC Types (VMware Example)

**E1000:**
- Emulates Intel 82545EM Gigabit Ethernet
- Compatible with most OSes
- Lower performance (emulation overhead)

**E1000e:**
- Emulates Intel 82574
- Better performance than E1000

**VMXNET2 (Enhanced vmxnet):**
- Paravirtualized driver
- Requires VMware Tools installed
- Better performance than E1000

**VMXNET3:**
- Latest paravirtualized adapter
- Highest performance
- Supports advanced features (TSO, LRO, RSS)
- Requires VMware Tools

**SR-IOV (Single Root I/O Virtualization):**
- Direct hardware passthrough
- Near-native performance
- Bypasses virtual switch

### vNIC Configuration

**Multiple vNICs per VM:**
```
VM with 3 vNICs:
  vNIC1 → Management network (VLAN 10)
  vNIC2 → Production network (VLAN 20)
  vNIC3 → Backup network (VLAN 30)
```

**MAC Address Assignment:**
- Automatically assigned by hypervisor
- Typically in vendor-specific range (VMware: 00:50:56:XX:XX:XX)
- Can be manually configured

### vNIC Security

**Promiscuous Mode:**
- Allows vNIC to see all traffic on virtual switch
- Disabled by default (security)
- Enable for packet capture/monitoring

**MAC Address Changes:**
- Allow VMs to change their MAC address
- Disabled by default
- Enable for specific use cases (clustering)

**Forged Transmits:**
- Allow VMs to send frames with different source MAC
- Disabled by default

---

## Virtual Switches (vSwitches)

### What is a vSwitch?

**Virtual Switch (vSwitch)** is a software switch running in the hypervisor that connects vNICs to each other and to physical NICs.

### vSwitch Architecture

```
┌─────────────────────────────────────────────┐
│              Hypervisor Host                │
│                                             │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐        │
│  │ VM1 │  │ VM2 │  │ VM3 │  │ VM4 │        │
│  │vNIC │  │vNIC │  │vNIC │  │vNIC │        │
│  └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘        │
│     │        │        │        │           │
│     └────────┼────────┼────────┘           │
│              │        │                    │
│  ┌───────────▼────────▼─────────────────┐  │
│  │       Virtual Switch (vSwitch)       │  │
│  │  ┌─────────────────────────────────┐ │  │
│  │  │   MAC Address Table            │ │  │
│  │  │   VLAN Configuration           │ │  │
│  │  │   Port Groups                  │ │  │
│  │  └─────────────────────────────────┘ │  │
│  └──────────────┬───────────────────────┘  │
│                 │                          │
│     ┌───────────┼───────────┐              │
│     │           │           │              │
│  ┌──▼───┐   ┌──▼───┐   ┌──▼───┐           │
│  │pNIC1 │   │pNIC2 │   │pNIC3 │           │
│  └──┬───┘   └──┬───┘   └──┬───┘           │
└─────┼─────────┼─────────┼─────────────────┘
      │         │         │
   Physical Network
```

### vSwitch Operations

**Layer 2 Switching:**
- Learns MAC addresses from connected vNICs
- Forwards frames based on destination MAC
- Floods unknown unicast, broadcast, multicast

**VLAN Support:**
- Tagging/untagging VLAN frames (802.1Q)
- Separate traffic into VLANs
- Port groups associated with VLANs

**Port Groups:**
- Logical grouping of ports with same config
- Each port group can have different VLAN, security, QoS settings

### VMware vSwitch Types

**Standard vSwitch (vSS):**
- Configured per ESXi host
- No centralized management
- Free (included with ESXi)

```
Host 1: vSwitch1 (configured independently)
Host 2: vSwitch1 (separate configuration)
Host 3: vSwitch1 (separate configuration)
```

**Distributed vSwitch (vDS):**
- Configured centrally via vCenter
- Single logical switch spans multiple hosts
- Consistent configuration across hosts
- Requires vSphere Enterprise Plus license

```
         vCenter
            │
    ┌───────┼───────┐
    │       │       │
  Host1   Host2   Host3
    └───────┼───────┘
       vDS (single logical switch)
```

### Hyper-V Virtual Switch Types

**External:**
- Bound to physical NIC
- VMs can communicate with external network

**Internal:**
- VMs + host can communicate
- No external connectivity

**Private:**
- VMs can communicate with each other only
- Host cannot access

### Uplinks and Load Balancing

**Uplinks:**
- Physical NICs connected to vSwitch
- Multiple uplinks for redundancy and bandwidth

**Load Balancing Policies:**

**Route based on originating virtual port:**
- Each VM assigned to specific uplink
- Simple, but not dynamic

**Route based on source MAC hash:**
- Hashes source MAC to select uplink
- Better distribution

**Route based on IP hash:**
- Requires EtherChannel/LACP on physical switch
- Best load distribution
- Uses source/dest IP to select uplink

**Explicit Failover Order:**
- Active/standby uplinks
- Failover only if active fails

### vSwitch QoS (Quality of Service)

**Traffic Shaping:**
- Limit bandwidth per port group
- Average bandwidth, peak bandwidth, burst size

**Network I/O Control (VMware):**
- Prioritize different traffic types
- Example: vMotion, management, VM traffic

---

## Software-Defined Networking (SDN)

### What is SDN?

**Software-Defined Networking (SDN)** decouples network control plane (decision-making) from data plane (packet forwarding), enabling centralized, programmable network management.

### Traditional vs SDN Architecture

**Traditional Network:**
```
┌──────────────────┐  ┌──────────────────┐
│     Switch 1     │  │     Switch 2     │
│ ┌──────────────┐ │  │ ┌──────────────┐ │
│ │ Control Plane│ │  │ │ Control Plane│ │
│ │  (Routing)   │ │  │ │  (Routing)   │ │
│ └──────┬───────┘ │  │ └──────┬───────┘ │
│        │         │  │        │         │
│ ┌──────▼───────┐ │  │ ┌──────▼───────┐ │
│ │  Data Plane  │ │  │ │  Data Plane  │ │
│ │ (Forwarding) │ │  │ │ (Forwarding) │ │
│ └──────────────┘ │  │ └──────────────┘ │
└──────────────────┘  └──────────────────┘
```

Each device makes independent decisions.

**SDN Architecture:**
```
┌────────────────────────────────────────┐
│       SDN Controller (Centralized)     │
│         Control Plane                  │
│  ┌──────────────────────────────────┐  │
│  │  Network Applications             │  │
│  │  (Routing, Firewall, Load Bal)   │  │
│  └────────────┬─────────────────────┘  │
│               │ Northbound API         │
│  ┌────────────▼─────────────────────┐  │
│  │  SDN Controller Logic            │  │
│  └────────────┬─────────────────────┘  │
│               │ Southbound API         │
│               │ (OpenFlow)             │
└───────────────┼────────────────────────┘
                │
     ┌──────────┼──────────┐
     │          │          │
┌────▼───┐  ┌───▼────┐  ┌─▼──────┐
│ Switch │  │ Switch │  │ Switch │
│ (Data  │  │ (Data  │  │ (Data  │
│ Plane) │  │ Plane) │  │ Plane) │
└────────┘  └────────┘  └────────┘
```

### SDN Components

**1. Application Layer:**
- SDN applications
- Uses Northbound API (RESTful APIs)
- Examples: Routing apps, firewall apps, traffic engineering

**2. Control Layer:**
- SDN Controller
- Network intelligence and control logic
- Examples: OpenDaylight, ONOS, Cisco ACI, VMware NSX

**3. Infrastructure Layer:**
- Network devices (switches, routers)
- Data plane only (forwarding)
- Controlled via Southbound API (OpenFlow)

### OpenFlow Protocol

**Most common Southbound API for SDN.**

**Flow Table:**
```
┌────────────────┬─────────────┬──────────┐
│  Match Fields  │  Actions    │ Priority │
├────────────────┼─────────────┼──────────┤
│ Src: 10.1.1.10 │ Forward     │    100   │
│ Dst: 10.2.2.20 │ Port 5      │          │
├────────────────┼─────────────┼──────────┤
│ Dst: 10.2.0.0/16│ Drop       │    50    │
├────────────────┼─────────────┼──────────┤
│ *:*            │ Send to     │     1    │
│                │ Controller  │          │
└────────────────┴─────────────┴──────────┘
```

**How it works:**
1. Packet arrives at OpenFlow switch
2. Switch checks flow table for match
3. If match, execute action (forward, drop, modify)
4. If no match, send to controller (packet-in)
5. Controller installs new flow rule (flow-mod)

### VMware NSX (SDN Platform)

**VMware NSX** provides network virtualization and SDN for vSphere environments.

**Features:**
- **Logical switches**: Virtual L2 segments
- **Logical routers**: Virtual L3 routing
- **Distributed firewall**: VM-level firewall (micro-segmentation)
- **Load balancing**: Virtual load balancers
- **VPN**: Site-to-site and remote access VPN

**NSX Architecture:**
```
┌────────────────────────────────────┐
│       NSX Manager                  │
│    (Control Plane)                 │
└─────────────┬──────────────────────┘
              │
     ┌────────┼────────┐
     │        │        │
┌────▼───┐ ┌──▼────┐ ┌▼────────┐
│ ESXi 1 │ │ ESXi 2│ │ ESXi 3  │
│ NSX    │ │ NSX   │ │ NSX     │
│ vSwitch│ │ vSwitch│ │ vSwitch│
└────────┘ └───────┘ └─────────┘
```

**Use Cases:**
- Micro-segmentation (security)
- Multi-tenancy (isolate customers)
- Network automation
- Disaster recovery

### Cisco ACI (Application Centric Infrastructure)

**Cisco ACI** is Cisco's SDN solution for datacenter.

**Components:**
- **APIC (Application Policy Infrastructure Controller)**: Centralized controller
- **Nexus 9000 switches**: ACI-capable switches (spine-leaf topology)
- **Application Network Profiles (ANPs)**: Define application connectivity

**Policy-Based:**
- Define policies (which apps can talk to which)
- ACI automatically configures network

---

## Network Virtualization Use Cases

### 1. Multi-Tenancy

**Problem:** Multiple customers sharing same physical infrastructure

**Solution:** Network virtualization provides isolation
```
┌──────────────┐  ┌──────────────┐
│ Customer A   │  │ Customer B   │
│ VMs          │  │ VMs          │
│ (VLAN 10)    │  │ (VLAN 20)    │
└──────┬───────┘  └──────┬───────┘
       │                  │
       └─────────┬────────┘
            Virtual Switch
                 │
           Physical Network
```

### 2. Micro-Segmentation

**Traditional:** Firewall at network edge

**Micro-segmentation:** Firewall between every VM
```
VM1 ──┬─── Firewall ───┬─── VM2
      │                │
      └─ Firewall ─────┴─── VM3
```

**Benefits:**
- Limit lateral movement (if VM1 compromised, can't reach VM2)
- Granular security policies

### 3. VM Mobility

**Problem:** Moving VM to different host changes network configuration

**Solution:** Virtual networks follow VM
```
Host 1               Host 2
┌─────────┐          ┌─────────┐
│ VM      │  vMotion │ VM      │
│ VLAN 10 │─────────▶│ VLAN 10 │
└─────────┘          └─────────┘
   (Same virtual network maintained)
```

### 4. Development/Test Environments

**Rapidly create/destroy networks:**
- Create isolated test networks
- No physical cabling changes
- Delete when testing complete

### 5. Disaster Recovery

**Stretch VLANs across datacenters:**
- VMs retain IP addresses when failed over
- Network configuration consistent

---

## Key Takeaways

1. **vNICs** provide VMs with network connectivity, appearing as physical NICs to guest OS
2. **vSwitches** connect vNICs and provide Layer 2 switching within hypervisor
3. **Port groups** logically group vSwitch ports with same VLAN/security/QoS config
4. **VMware vDS** (Distributed Switch) provides centralized management across multiple hosts
5. **SDN** separates control plane (controller) from data plane (switches)
6. **OpenFlow** is the most common Southbound API for SDN
7. **VMware NSX** and **Cisco ACI** are leading SDN/network virtualization platforms
8. **Micro-segmentation** places firewalls between every VM for enhanced security
9. Network virtualization enables **multi-tenancy**, **VM mobility**, and **rapid provisioning**
10. **SR-IOV** provides near-native performance by bypassing virtual switch

---

## References

- **CompTIA Network+ N10-008 Objective 1.8:** Summarize cloud concepts and connectivity options (network virtualization)
- VMware vSphere Networking Guide
- VMware NSX documentation
- Cisco ACI documentation
- OpenFlow Specification
- Professor Messer: Network+ N10-008 - Network Virtualization

---

**Next Lesson:** Lesson 65 - Storage Networking (SAN, NAS, iSCSI, Fibre Channel)
