---
id: lesson-014-vlans
title: VLANs (Virtual Local Area Networks)
chapterId: ch3-network-implementations
order: 14
duration: 55
objectives:
  - Understand VLAN concepts and benefits
  - Configure and verify VLANs on switches
  - Understand VLAN membership types
  - Implement inter-VLAN routing
  - Troubleshoot common VLAN issues
---

# Lesson 14: VLANs (Virtual Local Area Networks)

## Learning Objectives
- Understand VLAN concepts and benefits
- Configure and verify VLANs on switches
- Understand VLAN membership types
- Implement inter-VLAN routing
- Troubleshoot common VLAN issues

## Introduction

A **VLAN (Virtual Local Area Network)** is a logical segmentation of a physical network into separate broadcast domains. VLANs allow network administrators to group devices logically regardless of physical location, improving security, performance, and management.

VLANs are fundamental to modern network design and a critical topic for the CompTIA Network+ exam.

---

## VLAN Fundamentals

### What is a VLAN?

**Definition:** A VLAN creates a logical broadcast domain within a switched network

**Key Concept:** Devices in the same VLAN can communicate directly at Layer 2. Devices in different VLANs require Layer 3 routing to communicate.

### Without VLANs

```
[Switch]
   |
   +--- PC1 (Accounting)
   +--- PC2 (Sales)
   +--- PC3 (IT)
   +--- PC4 (Accounting)
```

**Problem:**
- All devices in same broadcast domain
- Broadcasts reach everyone (poor performance)
- No logical segmentation
- Security concerns (all traffic visible)

### With VLANs

```
[Switch with VLANs]
   |
   +--- PC1 (VLAN 10: Accounting)
   +--- PC2 (VLAN 20: Sales)
   +--- PC3 (VLAN 30: IT)
   +--- PC4 (VLAN 10: Accounting)
```

**Benefits:**
- Separate broadcast domains (VLAN 10, 20, 30)
- Broadcasts only within same VLAN
- Logical segmentation improves security
- Better performance (reduced broadcast traffic)

---

## VLAN Benefits

### 1. Security

**Segmentation:**
- Isolate sensitive departments (HR, Finance)
- Separate guest network from corporate
- Limit access to servers/resources

**Example:** Place servers in VLAN 100, users in VLAN 10. Firewall controls access between VLANs.

### 2. Performance

**Reduced Broadcast Domains:**
- Smaller broadcast domains = less broadcast traffic
- Improves network performance
- Reduces unnecessary traffic

**Example:** 500 devices in one broadcast domain vs. 5 VLANs of 100 devices each

### 3. Simplified Management

**Logical Grouping:**
- Group devices by function, not location
- Move users between VLANs without physical changes
- Easier to apply policies

**Example:** All voice devices in Voice VLAN, all printers in Printer VLAN

### 4. Flexibility

**Virtual Workgroups:**
- Create logical groups independent of physical location
- Project teams across multiple floors
- Temporary VLANs for events

---

## VLAN Types

### Default VLAN (VLAN 1)

**Characteristics:**
- All ports assigned to VLAN 1 by default
- Cannot be deleted or renamed
- Carries control traffic (CDP, VTP, STP BPDUs)
- **Security risk** if used for user data

**Best Practice:** ⚠️ Do not use VLAN 1 for user traffic. Change native VLAN.

### Data VLANs

**Purpose:** User-generated traffic

**Examples:**
- VLAN 10: Employees
- VLAN 20: Contractors
- VLAN 30: Guests

**Configuration:**
```
Switch(config)# vlan 10
Switch(config-vlan)# name EMPLOYEES
```

### Voice VLANs

**Purpose:** VoIP traffic (separate from data)

**Benefits:**
- QoS (Quality of Service) prioritization
- Simplified troubleshooting
- Security separation

**Configuration:**
```
Switch(config-if)# switchport voice vlan 150
```

**Dual VLANs on One Port:**
- Data VLAN: PC traffic (untagged)
- Voice VLAN: Phone traffic (tagged with 802.1Q)

```
     [Switch Port]
           |
      [IP Phone]
           |
         [PC]
```

- PC → untagged frames (data VLAN)
- Phone → tagged frames (voice VLAN)

### Management VLAN

**Purpose:** Switch management traffic (SSH, SNMP, syslog)

**Best Practice:** Separate from user VLANs for security

**Configuration:**
```
Switch(config)# vlan 99
Switch(config-vlan)# name MANAGEMENT

Switch(config)# interface vlan 99
Switch(config-if)# ip address 192.168.99.10 255.255.255.0
Switch(config-if)# no shutdown
```

### Native VLAN

**Purpose:** Untagged traffic on trunk ports (default: VLAN 1)

**Security:** Change from default VLAN 1

**Configuration:**
```
Switch(config-if)# switchport trunk native vlan 999
```

---

## VLAN Ranges

### Normal Range VLANs

**VLAN IDs:** 1-1005

**Characteristics:**
- Stored in vlan.dat file (flash memory)
- Configurable on all switches
- Used for most implementations

**VTP Support:** Can be advertised via VTP (VLAN Trunking Protocol)

### Extended Range VLANs

**VLAN IDs:** 1006-4094

**Characteristics:**
- Not stored in vlan.dat
- Stored in running-config (IOS)
- Require VTP transparent or off mode
- Used in large enterprise/data center

**Use Cases:**
- Service provider networks
- Large enterprise with >1000 VLANs
- Data center environments

### Reserved VLANs

- **VLAN 0:** Reserved (not used)
- **VLAN 1:** Default VLAN (cannot delete)
- **VLAN 1002-1005:** Reserved for legacy (FDDI, Token Ring)
- **VLAN 4095:** Reserved (not used)

---

## VLAN Membership Types

### Static VLANs (Port-Based)

**Definition:** VLAN assigned manually to port

**Configuration:**
```
Switch(config)# interface gi0/5
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
```

**Characteristics:**
- Most common method
- Administrator configures each port
- Secure and predictable
- Easy to troubleshoot

### Dynamic VLANs

**Definition:** VLAN assigned automatically based on MAC address, username, or protocol

**Requirements:**
- VLAN Membership Policy Server (VMPS)
- RADIUS server with VLAN assignment
- 802.1X authentication

**Example:** User authenticates via 802.1X, RADIUS assigns VLAN based on group membership

**Use Cases:**
- Large deployments with mobile users
- Guest access with automatic VLAN assignment
- Bring Your Own Device (BYOD) environments

---

## VLAN Configuration

### Creating VLANs

**Method 1: VLAN Configuration Mode**
```
Switch(config)# vlan 10
Switch(config-vlan)# name SALES
Switch(config-vlan)# exit

Switch(config)# vlan 20
Switch(config-vlan)# name ENGINEERING
Switch(config-vlan)# exit
```

**Method 2: Database Configuration Mode (Legacy)**
```
Switch# vlan database
Switch(vlan)# vlan 10 name SALES
Switch(vlan)# vlan 20 name ENGINEERING
Switch(vlan)# exit
```

**Best Practice:** Use VLAN configuration mode (Method 1)

### Assigning Ports to VLANs

**Access Port:**
```
Switch(config)# interface gi0/5
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
```

**Range of Ports:**
```
Switch(config)# interface range gi0/1-24
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
```

### Verification Commands

**Show all VLANs:**
```
Switch# show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Gi0/1, Gi0/2
10   SALES                            active    Gi0/5, Gi0/6
20   ENGINEERING                      active    Gi0/7, Gi0/8
99   MANAGEMENT                       active    
```

**Show specific VLAN:**
```
Switch# show vlan id 10
Switch# show vlan name SALES
```

**Show interface VLAN assignment:**
```
Switch# show interfaces gi0/5 switchport
Name: Gi0/5
Switchport: Enabled
Administrative Mode: static access
Operational Mode: static access
Access Mode VLAN: 10 (SALES)
```

**Show VLAN interface:**
```
Switch# show ip interface brief
Interface              IP-Address      OK? Method Status                Protocol
Vlan10                 192.168.10.1    YES manual up                    up
Vlan99                 192.168.99.10   YES manual up                    up
```

### Deleting VLANs

**Delete specific VLAN:**
```
Switch(config)# no vlan 10
```

**Delete all VLANs (reset):**
```
Switch# delete vlan.dat
Switch# reload
```

### Multi-Vendor VLAN Configuration Comparison

Real enterprise networks use equipment from multiple vendors. VLAN concepts are the same, but CLI syntax differs:

| Task | Cisco IOS | Juniper Junos | Arista EOS | Linux (iproute2) |
|------|-----------|---------------|------------|------------------|
| Create VLAN 100 | `vlan 100` `name Sales` | `set vlans Sales vlan-id 100` | `vlan 100` `name Sales` | `ip link add link eth0 name eth0.100 type vlan id 100` |
| Assign access port | `switchport mode access` `switchport access vlan 100` | `set interfaces ge-0/0/1 unit 0 family ethernet-switching vlan members Sales` | `switchport mode access` `switchport access vlan 100` | `bridge vlan add dev eth0 vid 100 pvid untagged` |
| Configure trunk | `switchport mode trunk` `switchport trunk allowed vlan 10,20` | `set interfaces ge-0/0/1 unit 0 family ethernet-switching port-mode trunk` `set interfaces ge-0/0/1 unit 0 family ethernet-switching vlan members [Sales Engineering]` | `switchport mode trunk` `switchport trunk allowed vlan 10,20` | `bridge vlan add dev eth0 vid 10` `bridge vlan add dev eth0 vid 20` |
| Show VLANs | `show vlan brief` | `show vlans` | `show vlan` | `bridge vlan show` |
| Show trunk ports | `show interfaces trunk` | `show ethernet-switching interface` | `show interfaces trunk` | `bridge link show` |

> **Key Insight:** Arista EOS uses nearly identical syntax to Cisco IOS because it was designed by former Cisco engineers. Juniper Junos uses a hierarchical set-based configuration model. Linux networking is increasingly important for SDN, cloud, and container networking.

---

## Inter-VLAN Routing

### The Problem

**VLANs create separate Layer 2 domains.** Devices in different VLANs cannot communicate without Layer 3 routing.

**Example:**
- PC1 in VLAN 10 (192.168.10.0/24)
- PC2 in VLAN 20 (192.168.20.0/24)
- Cannot ping each other without routing

### Solution 1: Router with Multiple Interfaces

**Router-on-a-Stick (Legacy):**

```
[Switch]---VLAN10---[Router Gi0/0.10]
      |                    |
    VLAN20-----[Router Gi0/0.20]
```

**Router Configuration:**
```
Router(config)# interface gi0/0.10
Router(config-subif)# encapsulation dot1q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0

Router(config)# interface gi0/0.20
Router(config-subif)# encapsulation dot1q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
```

**Limitations:**
- Single link bottleneck
- Lower performance
- Not scalable

### Solution 2: Layer 3 Switch (SVI - Switched Virtual Interface)

**Modern Approach:**

**Configuration:**
```
Switch(config)# ip routing

Switch(config)# interface vlan 10
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown

Switch(config)# interface vlan 20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown
```

**Benefits:**
✅ High performance (routing at wire speed)  
✅ Scalable (many VLANs)  
✅ No bottleneck (internal switching)  
✅ Cost-effective (fewer devices)  

**Use Case:** Enterprise networks, data centers

---

## Private VLANs (PVLAN)

### Concept

**Purpose:** Further segment a VLAN to isolate devices from each other

**Use Case:** Web hosting, hotels, ISPs (customers isolated from each other but can reach gateway)

### PVLAN Types

**Primary VLAN:**
- Parent VLAN containing secondary VLANs

**Secondary VLANs:**

**1. Isolated VLAN:**
- Ports cannot communicate with each other
- Can only communicate with promiscuous ports
- Example: Hotel guest rooms

**2. Community VLAN:**
- Ports can communicate within the community
- Can communicate with promiscuous ports
- Example: Department within company

**Promiscuous Port:**
- Can communicate with all ports in primary VLAN
- Typically gateway/router

---

## VLAN Troubleshooting

### Common Issues

**1. Incorrect VLAN Assignment**

**Symptom:** Device cannot communicate

**Verification:**
```
Switch# show vlan brief
Switch# show interfaces gi0/5 switchport
```

**Fix:**
```
Switch(config-if)# switchport access vlan <correct-vlan-id>
```

**2. VLAN Not Created**

**Symptom:** "% Access VLAN does not exist. Creating vlan X"

**Fix:** Create VLAN first:
```
Switch(config)# vlan 10
Switch(config-vlan)# name SALES
```

**3. Trunk Misconfiguration**

**Symptom:** VLANs not passing between switches

**Verification:**
```
Switch# show interfaces trunk
```

**Fix:** Configure trunk properly (covered in next lesson)

**4. Native VLAN Mismatch**

**Symptom:** CDP/VTP warnings, connectivity issues

**Verification:**
```
Switch# show cdp neighbors detail
```

**Fix:** Match native VLAN on both ends of trunk

**5. No Inter-VLAN Routing**

**Symptom:** Devices in different VLANs cannot communicate

**Fix:**
- Verify routing enabled: `ip routing`
- Verify SVI up: `show ip interface brief`
- Verify gateway configured on end devices

### Verification Checklist

✅ VLAN created: `show vlan brief`  
✅ Port assigned to VLAN: `show interfaces gi0/5 switchport`  
✅ Port status up: `show ip interface brief`  
✅ IP address configured (for SVI): `show running-config interface vlan 10`  
✅ Routing enabled (for inter-VLAN): `show ip route`  

---

## VLAN Best Practices

### Design

✅ **Meaningful names:** Use descriptive VLAN names (not just VLAN10)  
✅ **Document VLANs:** Maintain VLAN database/spreadsheet  
✅ **Consistent IDs:** Use same VLAN IDs across all switches  
✅ **Avoid VLAN 1:** Use different VLANs for user data  

### Security

✅ **Management VLAN:** Separate from user VLANs  
✅ **Change native VLAN:** Don't use default VLAN 1  
✅ **Prune unused VLANs:** Remove from trunks  
✅ **Disable unused ports:** Assign to "parking lot" VLAN  

### Scalability

✅ **Plan VLAN scheme:** Design addressing before deployment  
✅ **Reserve ranges:** Future growth (e.g., 100-199 for users, 200-299 for servers)  
✅ **Use Layer 3 switches:** For inter-VLAN routing  
✅ **Document changes:** Maintain up-to-date documentation  

---

## Summary

VLANs provide logical segmentation of switched networks:

**Key Concepts:**
- **VLAN:** Virtual broadcast domain (Layer 2 segmentation)
- **Benefits:** Security, performance, flexibility, management
- **Types:** Data, voice, management, native
- **Ranges:** Normal (1-1005), Extended (1006-4094)
- **Membership:** Static (port-based) or dynamic (MAC/802.1X)

**VLAN Configuration:**
```
vlan 10
 name SALES
interface gi0/5
 switchport mode access
 switchport access vlan 10
```

**Inter-VLAN Routing:**
- Router-on-a-stick (legacy)
- Layer 3 switch with SVIs (modern, preferred)

**Best Practices:**
- Avoid VLAN 1 for user traffic
- Use meaningful names
- Separate management VLAN
- Document all VLANs

**Remember:** Devices in the same VLAN communicate at Layer 2. Different VLANs require Layer 3 routing. VLANs are fundamental to network segmentation and security.

---

## Practice Questions

**Q1.** A network administrator creates VLAN 10 and VLAN 20 on a switch. A PC in VLAN 10 needs to communicate with a server in VLAN 20. What is required for this communication to occur?

A) A crossover cable between the two devices
B) A Layer 3 device to route between the VLANs
C) A trunk port configured on the PC's switch port
D) Both devices must be assigned to VLAN 1

<details>
<summary>Answer</summary>

**B)** VLANs create separate broadcast domains at Layer 2. Communication between different VLANs requires Layer 3 routing, either through a router (router-on-a-stick) or a Layer 3 switch with SVIs. A crossover cable doesn't solve Layer 3 separation. Trunk ports carry multiple VLANs between switches, not to PCs. Moving devices to VLAN 1 defeats the purpose of segmentation.
</details>

**Q2.** Which IEEE standard defines VLAN tagging on trunk links?

A) 802.1D
B) 802.1Q
C) 802.3ad
D) 802.11

<details>
<summary>Answer</summary>

**B)** IEEE 802.1Q is the standard for VLAN tagging on trunk links. It adds a 4-byte tag to Ethernet frames that identifies the VLAN. 802.1D is the Spanning Tree Protocol standard. 802.3ad is the Link Aggregation standard. 802.11 is the wireless LAN standard.
</details>

**Q3.** An IP phone is connected to a switch port, and a PC is connected through the phone. How does the switch differentiate between phone and PC traffic?

A) The phone uses a different IP subnet
B) The phone sends tagged frames on the voice VLAN and the PC sends untagged frames on the data VLAN
C) The phone uses a different MAC address format
D) The switch uses port security to separate the traffic

<details>
<summary>Answer</summary>

**B)** In a typical voice/data VLAN configuration, the IP phone sends 802.1Q-tagged frames on the voice VLAN while the PC sends untagged frames that are assigned to the access (data) VLAN. This allows QoS prioritization for voice traffic. While phones do use different subnets, that's a result of the VLAN separation, not the differentiating mechanism at Layer 2.
</details>

**Q4.** What is the valid range for normal VLAN IDs that can be stored in the vlan.dat file?

A) 0-1005
B) 1-1005
C) 1-4094
D) 1006-4094

<details>
<summary>Answer</summary>

**B)** Normal range VLANs are 1-1005 and are stored in the vlan.dat file in flash memory. VLAN 0 is reserved and not usable. Extended range VLANs (1006-4094) are stored in the running configuration and require VTP transparent or off mode. The full range 1-4094 includes both normal and extended VLANs.
</details>

**Q5.** A network administrator notices that a newly created VLAN 30 is not passing traffic between two switches. The trunk link between the switches is operational. What should be checked FIRST?

A) Whether VLAN 30 exists on both switches
B) Whether the spanning tree root bridge is configured
C) Whether the IP addresses are in the correct subnet
D) Whether DHCP is configured for VLAN 30

<details>
<summary>Answer</summary>

**A)** The most common cause of a VLAN not working between switches is that the VLAN hasn't been created on all switches. Each switch must have the VLAN defined locally for traffic to pass. Use `show vlan brief` to verify. STP, IP configuration, and DHCP are valid concerns but come after confirming the VLAN exists on both switches.
</details>

**Q6.** Why is it considered a security best practice to avoid using VLAN 1 for user traffic?

A) VLAN 1 has limited bandwidth capacity
B) VLAN 1 cannot be assigned to access ports
C) VLAN 1 carries control traffic (CDP, VTP, STP BPDUs) by default and is the default native VLAN
D) VLAN 1 does not support 802.1Q tagging

<details>
<summary>Answer</summary>

**C)** VLAN 1 is the default VLAN on all switches and carries control plane traffic such as CDP, VTP, and STP BPDUs. Using it for user data increases the attack surface and risk of VLAN hopping attacks. It can be assigned to access ports and supports tagging, but best practice is to use separate VLANs for user traffic and change the native VLAN from VLAN 1.
</details>

**Q7.** A company wants users to be automatically assigned to a VLAN based on their Active Directory group membership when they connect to the network. Which technology should be implemented?

A) Static VLAN assignment
B) Private VLANs
C) Dynamic VLAN assignment with 802.1X and RADIUS
D) VTP (VLAN Trunking Protocol)

<details>
<summary>Answer</summary>

**C)** Dynamic VLAN assignment using 802.1X authentication with a RADIUS server allows automatic VLAN assignment based on user credentials and group membership. Static VLANs require manual port configuration. Private VLANs isolate ports within a VLAN, not assign them. VTP propagates VLAN databases between switches but doesn't assign ports.
</details>

**Q8.** Which inter-VLAN routing method provides the highest performance and is preferred in modern enterprise networks?

A) Router-on-a-stick with subinterfaces
B) Router with separate physical interfaces per VLAN
C) Layer 3 switch with SVIs (Switched Virtual Interfaces)
D) Proxy ARP between VLANs

<details>
<summary>Answer</summary>

**C)** Layer 3 switches with SVIs perform inter-VLAN routing at wire speed using hardware-based switching, making them the highest-performance and most scalable option. Router-on-a-stick creates a single-link bottleneck. Separate physical interfaces waste ports and don't scale. Proxy ARP is not a proper inter-VLAN routing solution.
</details>

**Q9.** In a Private VLAN (PVLAN) configuration, which port type can communicate with all other ports including isolated and community ports?

A) Isolated port
B) Community port
C) Promiscuous port
D) Trunk port

<details>
<summary>Answer</summary>

**C)** A promiscuous port can communicate with all ports in the primary VLAN, including both isolated and community ports. It is typically assigned to gateways or routers. Isolated ports can only communicate with promiscuous ports. Community ports can communicate within their community and with promiscuous ports. Trunk ports carry VLANs between switches but are not a PVLAN port type.
</details>

**Q10.** What command would you use to verify which VLAN a specific switch port is assigned to?

A) show vlan brief
B) show interfaces switchport
C) show interfaces trunk
D) show ip interface brief

<details>
<summary>Answer</summary>

**B)** `show interfaces <interface> switchport` displays detailed port information including the assigned access VLAN, administrative mode, and operational mode. While `show vlan brief` shows all VLANs and their port assignments, `show interfaces switchport` provides the most specific per-port information. `show interfaces trunk` shows trunk port details. `show ip interface brief` shows IP addressing, not VLAN assignment.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 2.3**: VLANs and inter-VLAN routing
- **IEEE 802.1Q**: VLAN tagging standard
- **Cisco VLAN Configuration Guide**