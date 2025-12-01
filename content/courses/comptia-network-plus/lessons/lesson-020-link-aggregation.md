---
id: link-aggregation
title: Link Aggregation (EtherChannel/LACP)
chapterId: ch2-network-implementations
order: 20
duration: 50
objectives:
  - Understand link aggregation concepts and benefits
  - Configure EtherChannel on Cisco switches
  - Implement LACP (IEEE 802.3ad/802.1AX)
  - Troubleshoot link aggregation issues
  - Recognize load balancing methods
---

# Lesson 15: Link Aggregation (EtherChannel/LACP)

## Learning Objectives
- Understand link aggregation concepts and benefits
- Configure EtherChannel on Cisco switches
- Implement LACP (IEEE 802.3ad/802.1AX)
- Troubleshoot link aggregation issues
- Recognize load balancing methods

## Introduction

**Link Aggregation** combines multiple physical links into a single logical link, increasing bandwidth and providing redundancy. Cisco calls this **EtherChannel**, while the IEEE standard is **802.3ad (now 802.1AX)** using **LACP (Link Aggregation Control Protocol)**.

This technology is essential for eliminating bottlenecks between switches and servers in modern networks.

---

## Link Aggregation Fundamentals

### The Problem

**Single Link Bottleneck:**
```
[Switch A] ---1 Gbps--- [Switch B]
```
- Maximum bandwidth: 1 Gbps
- Single point of failure
- Spanning Tree blocks redundant links

**Traditional Solution:**
- Add more links → STP blocks all but one (no bandwidth increase)
- Upgrade to faster links (expensive: 10 Gbps, 40 Gbps)

### Link Aggregation Solution

```
[Switch A] ====4x 1 Gbps==== [Switch B]
            (Logical 4 Gbps)
```

**Benefits:**
✅ **Increased bandwidth:** 4x 1 Gbps = 4 Gbps aggregate  
✅ **Redundancy:** If one link fails, others continue  
✅ **Cost-effective:** Use existing infrastructure  
✅ **No STP blocking:** All links active  
✅ **Automatic failover:** Transparent to upper layers  

---

## EtherChannel Protocols

### PAgP (Port Aggregation Protocol)

**Type:** Cisco proprietary  
**Status:** Legacy (not recommended)  
**Modes:**
- **On:** Forces EtherChannel (no negotiation)
- **Desirable:** Actively negotiates
- **Auto:** Passively responds to negotiation

**Use Case:** Legacy Cisco-only environments

### LACP (Link Aggregation Control Protocol)

**Type:** IEEE 802.3ad / 802.1AX (industry standard)  
**Status:** ✅ Recommended (works with all vendors)  
**Modes:**
- **Active:** Actively sends LACP packets (recommended)
- **Passive:** Responds to LACP packets

**Best Practice:** Always use LACP in modern networks

### Static (On Mode)

**No protocol:** Forces bundling without negotiation

**Risk:** Misconfiguration can cause loops  
**Use Case:** When other side doesn't support LACP (rare)

### Mode Combinations

| Switch A | Switch B | Result |
|----------|----------|--------|
| **Active** | Active | Channel forms ✅ |
| **Active** | Passive | Channel forms ✅ |
| **Passive** | Passive | No channel ❌ (both wait) |
| **On** | On | Channel forms (no negotiation) |
| **On** | Active/Passive | No channel ❌ (incompatible) |

**Recommendation:** Use **Active** mode on both sides

---

## EtherChannel Configuration Requirements

### Prerequisites

**All member ports must have identical configuration:**

✅ **Same speed:** All 1 Gbps or all 10 Gbps  
✅ **Same duplex:** All full-duplex  
✅ **Same VLAN (access):** All in same VLAN  
✅ **Same trunk config:** Native VLAN, allowed VLANs  
✅ **Same STP settings:** PortFast, BPDU Guard, etc.  

**Maximum Links:**
- Cisco: 8 active links per EtherChannel
- LACP: 16 total (8 active, 8 standby)

**Minimum Links:**
- Typically 2 links minimum
- Can configure minimum bundle size (e.g., require 3 out of 4 links up)

---

## EtherChannel Configuration (Cisco)

### Layer 2 EtherChannel (Trunk)

**Configuration:**
```
! Configure physical interfaces first
Switch(config)# interface range gi0/1-4
Switch(config-if-range)# switchport mode trunk
Switch(config-if-range)# switchport trunk native vlan 999
Switch(config-if-range)# switchport trunk allowed vlan 10,20,30
Switch(config-if-range)# channel-group 1 mode active
Switch(config-if-range)# exit

! Configure port-channel interface
Switch(config)# interface port-channel 1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk native vlan 999
Switch(config-if)# switchport trunk allowed vlan 10,20,30
```

**Key Commands:**

**channel-group:**
```
channel-group <number> mode {on | active | passive | desirable | auto}
```
- **Number:** 1-255 (locally significant)
- **Mode:** LACP (active/passive) recommended

**port-channel interface:**
- Automatically created when channel-group configured
- Configure like any physical interface
- Settings override member port settings

### Layer 2 EtherChannel (Access)

```
Switch(config)# interface range gi0/5-8
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
Switch(config-if-range)# channel-group 2 mode active

Switch(config)# interface port-channel 2
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
```

### Layer 3 EtherChannel (Routed)

```
Switch(config)# interface range gi0/9-12
Switch(config-if-range)# no switchport
Switch(config-if-range)# channel-group 3 mode active

Switch(config)# interface port-channel 3
Switch(config-if)# no switchport
Switch(config-if)# ip address 10.1.1.1 255.255.255.252
```

---

## LACP Configuration Details

### System Priority

**Lower value = higher priority**

```
Switch(config)# lacp system-priority 32768
```
- Range: 1-65535
- Default: 32768
- Used to determine which switch controls the bundle

### Port Priority

```
Switch(config-if)# lacp port-priority 32768
```
- Range: 1-65535
- Default: 32768
- Determines which ports are active vs standby (if >8 links)

### Fast LACP

```
Switch(config-if)# lacp rate fast
```
- **Normal:** LACP packets every 30 seconds
- **Fast:** LACP packets every 1 second
- Faster failure detection

---

## Load Balancing

### Concept

EtherChannel distributes traffic across member links using a **hash algorithm** based on packet headers.

**NOT round-robin:** Same source/destination always uses same link (maintains packet order)

### Load Balancing Methods

**src-mac:** Source MAC address only  
**dst-mac:** Destination MAC address only  
**src-dst-mac:** Source AND destination MAC (default on many switches)  
**src-ip:** Source IP address  
**dst-ip:** Destination IP address  
**src-dst-ip:** Source AND destination IP  
**src-port:** Source TCP/UDP port  
**dst-port:** Destination TCP/UDP port  
**src-dst-port:** Source AND destination port  

### Configuration

```
Switch(config)# port-channel load-balance src-dst-ip
```

**Verification:**
```
Switch# show etherchannel load-balance
EtherChannel Load-Balancing Configuration:
        src-dst-ip

EtherChannel Load-Balancing Addresses Used Per-Protocol:
Non-IP: Source XOR Destination MAC address
  IPv4: Source XOR Destination IP address
  IPv6: Source XOR Destination IP address
```

### Load Balancing Considerations

**Server to switch:**
- Multiple clients → server: Use **dst-ip** or **dst-mac**
- Server → multiple clients: Use **src-ip** or **src-mac**
- Bidirectional: Use **src-dst-ip** or **src-dst-mac**

**Switch to switch:**
- Multiple VLANs/subnets: Use **src-dst-ip**
- Single VLAN: Use **src-dst-mac**

**Example Hash:**
```
Hash(src-IP XOR dst-IP) % number_of_links = selected link
```

---

## Verification Commands

### Show EtherChannel Summary

```
Switch# show etherchannel summary

Group  Port-channel  Protocol    Ports
------+-------------+-----------+-----------------------------------------------
1      Po1(SU)       LACP        Gi0/1(P)    Gi0/2(P)    Gi0/3(P)    Gi0/4(P)
2      Po2(SD)       LACP        Gi0/5(P)    Gi0/6(D)
```

**Flags:**
- **S:** Layer 2 (switched)
- **R:** Layer 3 (routed)
- **U:** In use (at least one member up)
- **D:** Down (all members down)
- **P:** Port bundled in port-channel
- **I:** Individual (not bundled)
- **H:** Hot-standby (LACP)
- **s:** Suspended (incompatible config)

### Show EtherChannel Detail

```
Switch# show etherchannel 1 detail

Group: 1
----------
Port-channels in the group: 
---------------------------

Port-channel: Po1    (Primary Aggregator)
------------

Age of the Port-channel   = 0d:01h:23m:45s
Logical slot/port   = 10/1          Number of ports = 4
HotStandBy port = null
Port state          = Port-channel Ag-Inuse
Protocol            =   LACP
Port security       = Disabled
Fast-switchover     = disabled

Ports in the Port-channel:

Index   Load   Port     EC state        No of bits
------+------+------+------------------+-----------
  0     00     Gi0/1    Active             0
  0     00     Gi0/2    Active             0
  0     00     Gi0/3    Active             0
  0     00     Gi0/4    Active             0
```

### Show LACP Neighbor

```
Switch# show lacp neighbor

Flags:  S - Device is requesting Slow LACPDUs
        F - Device is requesting Fast LACPDUs
        A - Device is in Active mode       P - Device is in Passive mode

Port      Flags   LACP port    Admin  Oper   Port    Port
          Priority Dev ID       Key    Key    Number  State
Gi0/1     SA      32768 0023.abcd.ef00  1      1      1      bndl
Gi0/2     SA      32768 0023.abcd.ef00  1      1      2      bndl
```

### Show Interfaces Port-Channel

```
Switch# show interfaces port-channel 1
Port-channel1 is up, line protocol is up (connected)
  Hardware is EtherChannel, address is 0012.3456.789a
  MTU 1500 bytes, BW 4000000 Kbit/sec
```

---

## Troubleshooting EtherChannel

### Common Issues

**1. EtherChannel Not Forming**

**Symptoms:**
- Port shows suspended (s) or individual (I)
- show etherchannel summary shows no bundle

**Causes:**
- Configuration mismatch (speed, duplex, VLAN)
- Protocol mismatch (On vs LACP)
- Mode mismatch (Passive/Passive)

**Verification:**
```
Switch# show etherchannel summary
Switch# show interfaces gi0/1 switchport
Switch# show interfaces gi0/1 status
```

**Fix:** Ensure identical configuration on all member ports

**2. Suspended Ports**

**Symptoms:**
- Port shows (s) flag in show etherchannel summary

**Causes:**
- Speed mismatch
- Duplex mismatch
- VLAN mismatch
- STP configuration mismatch

**Verification:**
```
Switch# show etherchannel 1 detail
```

**Fix:** Make all ports identical

**3. Inconsistent Load Balancing**

**Symptoms:**
- One link heavily utilized, others idle
- Uneven traffic distribution

**Causes:**
- Hash algorithm doesn't distribute traffic well
- Few source/destination pairs
- All traffic from single source

**Fix:** Change load balancing method:
```
port-channel load-balance src-dst-ip
```

**4. STP Loop**

**Symptoms:**
- Broadcast storm
- Network down

**Causes:**
- Using "on" mode with misconfiguration
- Connecting EtherChannel back to itself

**Fix:**
- Use LACP instead of "on" mode
- Verify cabling

**5. LACP Not Negotiating**

**Symptoms:**
- Ports remain in individual mode
- No LACP neighbor shown

**Verification:**
```
Switch# show lacp neighbor
Switch# show lacp counters
```

**Causes:**
- One side not running LACP
- LACP packets blocked
- Cable issues

**Fix:** Ensure both sides configured for LACP (active/passive)

---

## Best Practices

### Configuration
✅ **Use LACP:** Industry standard, vendor-neutral  
✅ **Active mode:** On both sides for reliability  
✅ **Identical config:** All member ports must match  
✅ **Configure port-channel:** Don't rely on defaults  
✅ **Fast LACP:** For quick failure detection  

### Design
✅ **Maximum 8 links:** More doesn't help (LACP limit)  
✅ **Power of 2:** 2, 4, or 8 links for best load balancing  
✅ **Same line cards:** Avoid mixing hardware  
✅ **Same switches:** Don't mix switch models if possible  

### Load Balancing
✅ **Match traffic patterns:** Choose appropriate algorithm  
✅ **Test distribution:** Verify traffic spreads evenly  
✅ **Consider flows:** Few flows = poor distribution  
✅ **Layer 3:** Use IP-based when available  

### Monitoring
✅ **Check bundle status:** Regular verification  
✅ **Monitor utilization:** Ensure balanced load  
✅ **Track errors:** Watch for link issues  
✅ **Document config:** Keep records of bundles  

---

## Multi-Chassis Link Aggregation

### MLAG Concepts

**Traditional EtherChannel:** Both ends connect to same physical switch

**MLAG:** Ends connect to different physical switches (appearing as one logical switch)

### Technologies

**Cisco VSS (Virtual Switching System):**
- Two physical switches act as one
- No spanning tree between them

**Cisco vPC (Virtual Port Channel):**
- Nexus switches
- Dual-homed connections appear as single port-channel
- Active-active design

**Arista MLAG:**
- Similar to vPC
- Peer switches synchronized

**HPE IRF / Dell VLT:**
- Multi-chassis aggregation
- Vendor-specific implementations

### Benefits

✅ **Active-active:** Full bandwidth utilization  
✅ **No STP blocking:** All links active  
✅ **Server redundancy:** NIC teaming to two switches  
✅ **Fast failover:** Sub-second convergence  

---

## Summary

Link aggregation bundles multiple links into one logical link:

**Key Concepts:**
- **EtherChannel:** Cisco term for link aggregation
- **LACP:** IEEE 802.3ad/802.1AX standard protocol (use this)
- **Benefits:** Increased bandwidth, redundancy, no STP blocking
- **Maximum:** 8 active links per bundle

**Configuration Requirements:**
- Identical speed, duplex, VLAN, trunk settings
- Use LACP active mode on both sides
- Configure port-channel interface

**Load Balancing:**
- Hash-based (not round-robin)
- Methods: src-dst-mac, src-dst-ip, src-dst-port
- Choose based on traffic patterns

**Troubleshooting:**
- Verify identical configuration: `show etherchannel summary`
- Check protocol negotiation: `show lacp neighbor`
- Suspended ports indicate mismatch
- Use LACP instead of "on" mode

**Best Practices:**
- Always use LACP (not PAgP or static)
- Active mode on both sides
- Fast LACP for quick detection
- Powers of 2 links (2, 4, 8)

**Remember:** All member ports must have identical configuration. Use LACP active mode on both sides. Configure the port-channel interface to set trunk or access properties.

---

## References

- **CompTIA Network+ N10-008 Objective 2.3**: Link aggregation
- **IEEE 802.3ad / 802.1AX**: LACP standard
- **Cisco EtherChannel Configuration Guide**