---
id: inter-vlan-routing
title: Inter-VLAN Routing (Router-on-a-Stick and Layer 3 Switches)
chapterId: ch2-network-implementations
order: 15
duration: 50
objectives:
  - Understand why VLANs need routing to communicate
  - Configure router-on-a-stick for inter-VLAN routing
  - Implement Layer 3 switching with SVIs
  - Compare traditional routing vs Layer 3 switching
  - Troubleshoot inter-VLAN routing issues
  - Understand subinterfaces and 802.1Q encapsulation
---

# Lesson 15: Inter-VLAN Routing (Router-on-a-Stick and Layer 3 Switches)

## Learning Objectives
- Understand why VLANs need routing to communicate
- Configure router-on-a-stick for inter-VLAN routing
- Implement Layer 3 switching with SVIs
- Compare traditional routing vs Layer 3 switching
- Troubleshoot inter-VLAN routing issues
- Understand subinterfaces and 802.1Q encapsulation

## Introduction

**Inter-VLAN routing** enables communication between devices on different VLANs. Since VLANs create separate broadcast domains, a Layer 3 device (router or Layer 3 switch) is required to route traffic between them.

This lesson covers two primary methods: **router-on-a-stick** (using a router with subinterfaces) and **Layer 3 switching** (using Switch Virtual Interfaces). Both are essential for the CompTIA Network+ N10-008 exam.

---

## Why Inter-VLAN Routing is Needed

### VLANs Create Separate Broadcast Domains

**Without routing:**
- Devices in VLAN 10 cannot communicate with devices in VLAN 20
- Each VLAN is isolated at Layer 2
- Broadcast traffic stays within each VLAN

**Example Network:**
```
VLAN 10 (Sales):     192.168.10.0/24
VLAN 20 (Engineering): 192.168.20.0/24
VLAN 30 (HR):        192.168.30.0/24
```

**Problem:** Sales PC (VLAN 10) needs to access file server (VLAN 20)
**Solution:** Inter-VLAN routing

---

## Method 1: Router-on-a-Stick

### What is Router-on-a-Stick?

**Router-on-a-stick** uses a single physical router interface with multiple logical **subinterfaces** (one per VLAN) to route between VLANs.

**Key Concepts:**
- **One physical interface** connects router to switch
- **Multiple subinterfaces** (virtual interfaces) configured
- **802.1Q trunk** link between router and switch
- Each subinterface has IP address in different subnet

### Topology

```
        [Router]
        Fa0/0.10 (VLAN 10)
        Fa0/0.20 (VLAN 20)
        Fa0/0.30 (VLAN 30)
           |
        [802.1Q Trunk]
           |
        [Switch]
       /    |    \
    VLAN10 VLAN20 VLAN30
```

### Configuration Example (Cisco)

**Switch Configuration:**

```cisco
Switch(config)# interface Gi0/1
Switch(config-if)# description Trunk to Router
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
Switch(config-if)# no shutdown
```

**Router Configuration:**

```cisco
Router(config)# interface Fa0/0
Router(config-if)# description Trunk from Switch
Router(config-if)# no shutdown

! Subinterface for VLAN 10
Router(config)# interface Fa0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config-subif)# description Sales VLAN

! Subinterface for VLAN 20
Router(config)# interface Fa0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
Router(config-subif)# description Engineering VLAN

! Subinterface for VLAN 30
Router(config)# interface Fa0/0.30
Router(config-subif)# encapsulation dot1Q 30
Router(config-subif)# ip address 192.168.30.1 255.255.255.0
Router(config-subif)# description HR VLAN
```

**Explanation:**
- `encapsulation dot1Q <vlan-id>`: Associates subinterface with VLAN
- Each subinterface gets IP address (default gateway for that VLAN)
- Physical interface (`Fa0/0`) must be up (no IP address)

### How Router-on-a-Stick Works

**Step 1:** PC in VLAN 10 sends packet to PC in VLAN 20
- Source: 192.168.10.5
- Destination: 192.168.20.10
- Default gateway: 192.168.10.1 (router subinterface)

**Step 2:** Packet sent to default gateway (192.168.10.1)
- Encapsulated in 802.1Q frame with VLAN 10 tag
- Sent over trunk to router

**Step 3:** Router receives on subinterface Fa0/0.10
- Removes VLAN 10 tag
- Makes routing decision

**Step 4:** Router forwards to VLAN 20
- Adds VLAN 20 tag
- Sends out subinterface Fa0/0.20

**Step 5:** Switch receives frame
- Sees VLAN 20 tag
- Forwards to destination PC on VLAN 20 access port

---

### Advantages of Router-on-a-Stick

✅ **Simple:** Only one physical connection needed
✅ **Cost-effective:** Uses existing router
✅ **Flexible:** Easy to add new VLANs (new subinterface)
✅ **Centralized routing:** All routing at router

### Disadvantages of Router-on-a-Stick

❌ **Performance bottleneck:** All traffic through single link
❌ **Slower:** Router processes all inter-VLAN traffic
❌ **Single point of failure:** If link fails, no inter-VLAN routing
❌ **Scalability:** Limited by router interface bandwidth

**Use Case:** Small networks (< 100 devices), branch offices

---

## Method 2: Layer 3 Switching (SVIs)

### What is a Layer 3 Switch?

A **Layer 3 switch** (multilayer switch) performs both switching (Layer 2) and routing (Layer 3) in hardware at wire speed.

**Key Features:**
- Routes between VLANs without external router
- Uses **SVIs (Switch Virtual Interfaces)** as VLAN gateways
- Hardware-based routing (ASIC) = faster than router
- Each SVI is a virtual interface representing a VLAN

### Switch Virtual Interfaces (SVIs)

An **SVI** is a virtual Layer 3 interface associated with a VLAN.

**Characteristics:**
- Each VLAN can have one SVI
- SVI IP address = default gateway for VLAN
- No physical port (virtual interface)
- Routing performed in switch hardware

### Configuration Example (Cisco)

**Enable IP Routing:**

```cisco
Switch(config)# ip routing
```

**Create VLANs:**

```cisco
Switch(config)# vlan 10
Switch(config-vlan)# name Sales
Switch(config)# vlan 20
Switch(config-vlan)# name Engineering
Switch(config)# vlan 30
Switch(config-vlan)# name HR
```

**Create SVIs:**

```cisco
! VLAN 10 SVI
Switch(config)# interface vlan 10
Switch(config-if)# description Sales Gateway
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown

! VLAN 20 SVI
Switch(config)# interface vlan 20
Switch(config-if)# description Engineering Gateway
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown

! VLAN 30 SVI
Switch(config)# interface vlan 30
Switch(config-if)# description HR Gateway
Switch(config-if)# ip address 192.168.30.1 255.255.255.0
Switch(config-if)# no shutdown
```

**Assign Ports to VLANs:**

```cisco
Switch(config)# interface range Gi0/1-10
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10

Switch(config)# interface range Gi0/11-20
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 20
```

**Verification:**

```cisco
Switch# show ip interface brief
Interface         IP-Address      Status  Protocol
Vlan10            192.168.10.1    up      up
Vlan20            192.168.20.1    up      up
Vlan30            192.168.30.1    up      up

Switch# show ip route
Gateway of last resort is not set

C    192.168.10.0/24 is directly connected, Vlan10
C    192.168.20.0/24 is directly connected, Vlan20
C    192.168.30.0/24 is directly connected, Vlan30
```

### How Layer 3 Switching Works

**Step 1:** PC in VLAN 10 sends packet to PC in VLAN 20
- Destination different subnet → sends to default gateway (SVI 192.168.10.1)

**Step 2:** Switch receives frame
- Looks up destination MAC (SVI MAC address)
- Sends to SVI (VLAN 10 interface)

**Step 3:** Switch routes at Layer 3
- Checks routing table
- Destination 192.168.20.10 is on VLAN 20 (connected route)

**Step 4:** Switch forwards to VLAN 20
- Rewrites destination MAC to destination PC MAC
- Forwards out port in VLAN 20

**All processing in hardware ASIC = wire-speed routing**

---

### Advantages of Layer 3 Switching

✅ **High performance:** Hardware-based routing (wire speed)
✅ **Scalability:** Handles high inter-VLAN traffic volumes
✅ **No external router needed:** Simplifies topology
✅ **Low latency:** Faster than router-on-a-stick
✅ **Redundancy:** Multiple uplinks possible

### Disadvantages of Layer 3 Switching

❌ **Cost:** Layer 3 switches more expensive than Layer 2
❌ **Complexity:** More configuration than router-on-a-stick
❌ **Limited routing features:** May lack advanced routing protocols
❌ **License requirements:** Some features require licenses (e.g., Cisco IP Services)

**Use Case:** Enterprise networks, data centers, high-traffic environments

---

## Comparison: Router-on-a-Stick vs Layer 3 Switching

| Feature | Router-on-a-Stick | Layer 3 Switch |
|---------|-------------------|----------------|
| **Hardware** | External router + Layer 2 switch | Single Layer 3 switch |
| **Performance** | Limited (single trunk link) | High (wire-speed routing) |
| **Scalability** | Low (bandwidth bottleneck) | High (hardware forwarding) |
| **Cost** | Lower (uses existing equipment) | Higher (L3 switch expensive) |
| **Configuration** | Subinterfaces + trunk | SVIs + IP routing |
| **Routing Features** | Full routing capabilities | May be limited |
| **Use Case** | Small networks, branch offices | Enterprise, data centers |
| **Latency** | Higher (software routing) | Lower (hardware routing) |

---

## Troubleshooting Inter-VLAN Routing

### Common Issues

**Issue 1: No connectivity between VLANs**

**Symptoms:**
- Devices in different VLANs cannot ping each other
- Devices can ping their default gateway

**Possible Causes & Solutions:**

1. **Trunk not configured:**
   - Verify: `show interface trunk`
   - Fix: Configure trunk port on switch

2. **VLAN not allowed on trunk:**
   - Verify: `show interface Gi0/1 switchport`
   - Fix: `switchport trunk allowed vlan add <vlan-id>`

3. **Subinterface wrong VLAN tag:**
   - Verify: `show running-config interface Fa0/0.10`
   - Fix: Correct `encapsulation dot1Q <vlan-id>`

4. **IP routing disabled (Layer 3 switch):**
   - Verify: `show ip route`
   - Fix: `ip routing`

5. **SVI down:**
   - Verify: `show ip interface brief`
   - Fix: `no shutdown` on SVI

**Issue 2: Routing works but slow performance**

**Cause:** Router-on-a-stick bottleneck
**Solution:** Upgrade to Layer 3 switch

**Issue 3: Intermittent connectivity**

**Possible Causes:**
- Duplicate IP addresses
- Spanning-tree blocking trunk
- VLAN pruning removing needed VLANs

---

## Configuration Best Practices

### Router-on-a-Stick Best Practices

1. **Enable physical interface first:** `no shutdown` on physical interface before subinterfaces
2. **Use descriptive names:** `description Sales VLAN` on each subinterface
3. **Document VLAN mappings:** Keep record of VLAN to subinterface mapping
4. **Monitor bandwidth:** Watch trunk utilization for bottlenecks
5. **Implement redundancy:** Use HSRP/VRRP for gateway redundancy

### Layer 3 Switching Best Practices

1. **Enable IP routing globally:** `ip routing` first step
2. **Create SVIs before assigning ports:** Configure VLAN and SVI before access ports
3. **Use naming conventions:** Consistent VLAN naming
4. **Monitor SVI status:** SVIs go down if no active ports in VLAN
5. **Implement security:** Apply ACLs to SVIs for inter-VLAN filtering

---

## Real-World Scenarios

**Scenario 1: Small Office with 3 VLANs**

**Requirements:**
- 50 devices total
- VLANs: Staff, Guests, Printers
- Budget-conscious

**Solution:** Router-on-a-stick
- Single router with 3 subinterfaces
- Layer 2 switch with trunk to router
- Cost-effective for small scale

---

**Scenario 2: Enterprise Campus with 20 VLANs**

**Requirements:**
- 2,000 devices
- High inter-VLAN traffic (file servers, databases)
- Low latency required

**Solution:** Layer 3 switching
- Core Layer 3 switch with SVIs for all VLANs
- Access switches connect to core
- Wire-speed routing between VLANs
- HSRP for SVI redundancy

---

## Key Takeaways

1. **Inter-VLAN routing** requires Layer 3 device (router or Layer 3 switch)
2. **Router-on-a-stick:** Single physical link, multiple subinterfaces, 802.1Q trunk
3. **Layer 3 switching:** SVIs provide VLAN gateways, hardware routing
4. **Subinterfaces:** Virtual interfaces on router, one per VLAN
5. **SVIs:** Virtual interfaces on Layer 3 switch, one per VLAN
6. **Performance:** Layer 3 switching faster than router-on-a-stick
7. **Cost:** Router-on-a-stick cheaper, Layer 3 switch better for large networks
8. **Troubleshooting:** Check trunk configuration, VLAN tags, IP routing enabled

---

## Practice Questions

**1. What type of interface is used on a router for router-on-a-stick inter-VLAN routing?**
- A) Physical interfaces (one per VLAN)
- B) Subinterfaces ✓
- C) Switch Virtual Interfaces (SVIs)
- D) Loopback interfaces

**Answer:** B - Router-on-a-stick uses subinterfaces (e.g., Fa0/0.10, Fa0/0.20) on a single physical interface, with each subinterface configured for a different VLAN.

---

**2. What command enables routing functionality on a Cisco Layer 3 switch?**
- A) `enable routing`
- B) `ip routing` ✓
- C) `router enable`
- D) `routing on`

**Answer:** B - The `ip routing` global configuration command enables Layer 3 routing on a Cisco Layer 3 switch, allowing it to route between VLANs.

---

**3. Which encapsulation must be configured on router subinterfaces for router-on-a-stick?**
- A) PPP
- B) Frame Relay
- C) ISL
- D) 802.1Q ✓

**Answer:** D - 802.1Q (dot1Q) encapsulation must be configured on subinterfaces to tag frames with the appropriate VLAN ID on the trunk link.

---

**4. What is the primary advantage of Layer 3 switching over router-on-a-stick?**
- A) Lower cost
- B) Easier configuration
- C) Hardware-based routing provides higher performance ✓
- D) Requires no VLANs

**Answer:** C - Layer 3 switches use hardware ASICs to route at wire speed, providing much higher performance than software-based routing in routers.

---

**5. In a Layer 3 switch, what provides the default gateway for each VLAN?**
- A) Physical switch ports
- B) Router interfaces
- C) Switch Virtual Interfaces (SVIs) ✓
- D) Trunk ports

**Answer:** C - SVIs (Switch Virtual Interfaces) serve as the default gateway for each VLAN, with each SVI having an IP address in the VLAN's subnet.

---

## References

- **CompTIA Network+ N10-008 Objective 2.2:** Compare and contrast routing technologies and bandwidth management concepts
- **CompTIA Network+ N10-008 Objective 2.3:** Given a scenario, configure and deploy common Ethernet switching features
- **IEEE 802.1Q:** VLAN Tagging Standard
- Cisco CCNA: Inter-VLAN Routing
- Professor Messer: Network+ N10-008 - VLANs and Inter-VLAN Routing

---

**Next Lesson:** Lesson 16 - Spanning Tree Protocol (STP, RSTP, Loop Prevention)
