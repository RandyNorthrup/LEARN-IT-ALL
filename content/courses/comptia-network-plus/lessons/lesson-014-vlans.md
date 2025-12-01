---
id: vlans
title: VLANs (Virtual Local Area Networks)
chapterId: ch2-network-implementations
order: 14
duration: 55
objectives:
  - Understand VLAN concepts and benefits
  - Configure and verify VLANs on switches
  - Understand VLAN membership types
  - Implement inter-VLAN routing
  - Troubleshoot common VLAN issues
---

# Lesson 13: VLANs (Virtual Local Area Networks)

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

## References

- **CompTIA Network+ N10-008 Objective 2.3**: VLANs and inter-VLAN routing
- **IEEE 802.1Q**: VLAN tagging standard
- **Cisco VLAN Configuration Guide**