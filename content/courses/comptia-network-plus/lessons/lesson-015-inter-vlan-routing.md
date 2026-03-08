---
id: lesson-015-inter-vlan-routing
title: Inter-VLAN Routing (Router-on-a-Stick and Layer 3 Switches)
chapterId: ch3-network-implementations
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

This lesson covers two primary methods: **router-on-a-stick** (using a router with subinterfaces) and **Layer 3 switching** (using Switch Virtual Interfaces). Both are essential for the CompTIA Network+ N10-009 exam.

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

### Detailed Packet Flow Diagram

The following diagram traces a packet from PC-A (VLAN 10) to PC-B (VLAN 20) through the entire router-on-a-stick process:

```
  PC-A (VLAN 10)                                PC-B (VLAN 20)
  192.168.10.5                                  192.168.20.10
       |                                              |
       | 1. Untagged frame                            |
       |    Src MAC: AA:AA    Dst MAC: R1-MAC         |
       |    Src IP: 10.5     Dst IP: 20.10            |
       v                                              |
  [Switch Port Fa0/1]                                 |
  (Access VLAN 10)                                    |
       |                                              |
       | 2. Switch adds VLAN 10 tag                   |
       |    on trunk to router                        |
       v                                              |
  [Switch Trunk Port Gi0/1] ---- 802.1Q Trunk ----> [Router Fa0/0]
       |                                              |
       |                    3. Router receives on     |
       |                       subinterface Fa0/0.10  |
       |                       Strips VLAN 10 tag     |
       |                       Routes: 192.168.20.x   |
       |                       → use Fa0/0.20         |
       |                       Adds VLAN 20 tag       |
       |                       Rewrites dst MAC       |
       |                                              |
  [Switch Trunk Port Gi0/1] <---- 802.1Q Trunk ---- [Router Fa0/0]
       |                                              |
       | 4. Switch receives tagged frame              |
       |    Strips VLAN 20 tag                        |
       |    Forwards to access port                   |
       v                                              |
  [Switch Port Fa0/12]                                |
  (Access VLAN 20)                                    |
       |                                              |
       | 5. Untagged frame delivered                   |
       +----------------------------------------------+
                        PC-B receives packet
```

### Native VLAN Considerations

The **native VLAN** is the VLAN whose traffic is sent **untagged** across a trunk link. This has important implications for router-on-a-stick:

**Default Native VLAN:** VLAN 1

**Configuration for Native VLAN on Router:**

```cisco
! If VLAN 10 is the native VLAN on the trunk:
Router(config)# interface Fa0/0.10
Router(config-subif)# encapsulation dot1Q 10 native
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
```

**Best Practice:** Change the native VLAN to a dedicated unused VLAN for security:

```cisco
Switch(config)# interface Gi0/1
Switch(config-if)# switchport trunk native vlan 999

Router(config)# interface Fa0/0.999
Router(config-subif)# encapsulation dot1Q 999 native
! No IP address needed — native VLAN unused
```

**Security Risk:** If the native VLAN matches a production VLAN, attackers can craft double-tagged frames to hop VLANs (VLAN hopping attack).

### Verification Commands (Router-on-a-Stick)

Use these commands to verify and troubleshoot the configuration:

```cisco
! Verify subinterface status and IP assignments
Router# show ip interface brief
Interface           IP-Address      OK? Method Status Protocol
Fa0/0               unassigned      YES unset  up     up
Fa0/0.10             192.168.10.1   YES manual up     up
Fa0/0.20             192.168.20.1   YES manual up     up
Fa0/0.30             192.168.30.1   YES manual up     up

! Verify encapsulation type on subinterfaces
Router# show interfaces Fa0/0.10
FastEthernet0/0.10 is up, line protocol is up
  Encapsulation 802.1Q Virtual LAN, Vlan ID  10.
  ARP type: ARPA, ARP Timeout 04:00:00
  ...

! Verify routing table
Router# show ip route
C    192.168.10.0/24 is directly connected, FastEthernet0/0.10
C    192.168.20.0/24 is directly connected, FastEthernet0/0.20
C    192.168.30.0/24 is directly connected, FastEthernet0/0.30

! Verify trunk on the switch side
Switch# show interfaces trunk
Port        Mode         Encapsulation  Status        Native vlan
Gi0/1       on           802.1q         trunking      1

Port        Vlans allowed on trunk
Gi0/1       10,20,30

! Verify ARP resolution across VLANs
Router# show arp
Protocol  Address         Age  Hardware Addr   Type  Interface
Internet  192.168.10.1     -   c201.0a00.0001  ARPA  Fa0/0.10
Internet  192.168.10.5    12   00aa.bbcc.ddee  ARPA  Fa0/0.10
Internet  192.168.20.1     -   c201.0a00.0001  ARPA  Fa0/0.20
```

### Bandwidth and Performance Calculations

Router-on-a-stick shares a single physical link for all inter-VLAN traffic. Understanding bandwidth constraints is critical:

```
Example: 1 Gbps trunk link
  - VLAN 10 → VLAN 20 traffic: 300 Mbps
  - VLAN 10 → VLAN 30 traffic: 200 Mbps
  - VLAN 20 → VLAN 30 traffic: 100 Mbps
  - Total inter-VLAN traffic: 600 Mbps
  - But traffic traverses trunk TWICE (to router + back)
  - Effective load: 1200 Mbps > 1000 Mbps link capacity
  - Result: CONGESTION and packet drops
```

**Rule of Thumb:** The trunk link carries inter-VLAN traffic **twice** (once in each direction), so effective bandwidth is halved. A 1 Gbps trunk supports only ~500 Mbps of inter-VLAN throughput.

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

### SVI Deep Dive: How SVIs Work Internally

Understanding SVI internals is important for troubleshooting and the CompTIA exam:

**SVI State Requirements (for an SVI to be "up/up"):**
1. The VLAN must exist in the VLAN database (`show vlan brief`)
2. At least one port in the VLAN must be in `up/up` state
3. That port must be a switchport (access or trunk carrying the VLAN)
4. The SVI must have `no shutdown` configured
5. If all ports in a VLAN go down, the SVI goes to `down/down`

**SVI vs Physical Interface:**

| Characteristic | SVI (interface vlan X) | Physical Interface |
|---|---|---|
| **Type** | Virtual | Physical port |
| **Speed** | Aggregate of VLAN ports | Single port speed |
| **Redundancy** | Up if any port in VLAN is up | Single point of failure |
| **MAC address** | Switch base MAC + offset | Port hardware MAC |
| **Use** | Default gateway for VLAN | Point-to-point link |

```cisco
! Check SVI status in detail
Switch# show interface vlan 10
Vlan10 is up, line protocol is up
  Hardware is EtherSVI, address is aabb.cc00.0100
  Internet address is 192.168.10.1/24
  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec,
  ...
  Input queue: 0/75/0/0 (size/max/drops/flushes)
  5 minute input rate 125000 bits/sec, 98 packets/sec
  5 minute output rate 250000 bits/sec, 195 packets/sec
```

### Routed Ports on Layer 3 Switches

Layer 3 switches also support **routed ports** — physical switch ports converted to act like router interfaces:

```cisco
! Convert a switchport to a routed port
Switch(config)# interface Gi0/24
Switch(config-if)# no switchport
Switch(config-if)# ip address 10.0.0.1 255.255.255.252
Switch(config-if)# no shutdown
```

**When to use routed ports:**
- Point-to-point links between Layer 3 switches
- Uplinks to routers or WAN devices
- When you need a Layer 3 interface without VLAN association

```
  [L3 Switch A]-----Routed Port-----[L3 Switch B]
   Gi0/24: 10.0.0.1/30             Gi0/24: 10.0.0.2/30
     |                                  |
   SVI VLAN 10: 192.168.10.1      SVI VLAN 20: 192.168.20.1
     |                                  |
  [VLAN 10 Hosts]                  [VLAN 20 Hosts]
```

### DHCP Relay for Inter-VLAN Environments

In networks with a centralized DHCP server, clients in different VLANs need **DHCP relay** (ip helper-address) because DHCP broadcasts do not cross VLAN boundaries:

```cisco
! DHCP server is at 192.168.10.100 on VLAN 10
! Clients on VLAN 20 need DHCP

Switch(config)# interface vlan 20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# ip helper-address 192.168.10.100
Switch(config-if)# no shutdown

! Also configure on VLAN 30
Switch(config)# interface vlan 30
Switch(config-if)# ip address 192.168.30.1 255.255.255.0
Switch(config-if)# ip helper-address 192.168.10.100
Switch(config-if)# no shutdown
```

**How DHCP Relay works across VLANs:**
```
1. Client on VLAN 20 sends DHCP Discover (broadcast)
2. SVI for VLAN 20 receives the broadcast
3. ip helper-address converts broadcast to unicast
4. Unicast DHCP Discover forwarded to 192.168.10.100
5. DHCP server assigns address from VLAN 20 pool (192.168.20.x)
6. Reply routed back through SVI to client on VLAN 20
```

### Applying ACLs to SVIs (Inter-VLAN Security)

Access Control Lists on SVIs control which traffic is allowed between VLANs:

```cisco
! Block VLAN 30 (Guest) from accessing VLAN 10 (Servers)
! But allow VLAN 30 to reach the internet (VLAN 99)

Switch(config)# ip access-list extended GUEST-FILTER
Switch(config-ext-nacl)# deny ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255
Switch(config-ext-nacl)# permit ip 192.168.30.0 0.0.0.255 any

Switch(config)# interface vlan 30
Switch(config-if)# ip access-group GUEST-FILTER in
```

**Common ACL scenarios for inter-VLAN routing:**
- Block guest VLAN from server VLAN
- Allow management VLAN to access all VLANs
- Restrict IoT devices to internet-only access
- Permit specific protocols between VLANs (e.g., only HTTP/HTTPS)

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

### Systematic Troubleshooting Methodology

When inter-VLAN routing fails, follow this structured approach:

```
Step 1: Verify Layer 1 (Physical)
  └─ Are cables connected? Are link lights on?
     └─ show interfaces status

Step 2: Verify Layer 2 (VLAN & Trunk)
  └─ Is the trunk up? Are VLANs allowed?
     └─ show interfaces trunk
     └─ show vlan brief

Step 3: Verify Layer 3 (IP & Routing)
  └─ Are SVIs/subinterfaces up with correct IPs?
     └─ show ip interface brief
     └─ show ip route

Step 4: Verify Client Configuration
  └─ Correct IP, mask, and default gateway?
     └─ ping default gateway from client

Step 5: Test End-to-End
  └─ Ping from source to destination
     └─ traceroute to identify where traffic stops
```

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

6. **Wrong default gateway on client:**
   - Verify: `ipconfig /all` (Windows) or `ip route show` (Linux)
   - Fix: Set correct gateway (SVI or subinterface IP for the client's VLAN)

7. **Native VLAN mismatch:**
   - Verify: `show interfaces trunk` — check native VLAN on both ends
   - Symptom: CDP/STP warnings about native VLAN mismatch
   - Fix: Set matching native VLAN on both trunk endpoints

8. **ACL blocking inter-VLAN traffic:**
   - Verify: `show ip access-lists` and `show ip interface` (check access-group)
   - Fix: Modify ACL to permit required traffic

**Issue 2: Routing works but slow performance**

**Cause:** Router-on-a-stick bottleneck
**Solution:** Upgrade to Layer 3 switch

**Issue 3: Intermittent connectivity**

**Possible Causes:**
- Duplicate IP addresses
- Spanning-tree blocking trunk
- VLAN pruning removing needed VLANs

### Troubleshooting Command Reference

```cisco
! === Layer 2 Verification ===
Switch# show vlan brief
VLAN Name                     Status    Ports
---- ----------------------- --------- ----------------
1    default                 active    Gi0/21, Gi0/22
10   Sales                   active    Gi0/1, Gi0/2
20   Engineering             active    Gi0/11, Gi0/12
30   HR                      active    Gi0/15, Gi0/16

Switch# show interfaces trunk
Port     Mode         Encapsulation  Status   Native vlan
Gi0/24   on           802.1q         trunking 1

Port     Vlans allowed on trunk
Gi0/24   10,20,30

Port     Vlans allowed and active in management domain
Gi0/24   10,20,30

! === Layer 3 Verification ===
Switch# show ip interface brief
Interface    IP-Address      OK? Method Status    Protocol
Vlan10       192.168.10.1    YES manual up        up
Vlan20       192.168.20.1    YES manual up        up
Vlan30       192.168.30.1    YES manual up        up

Switch# show ip route connected
C    192.168.10.0/24 is directly connected, Vlan10
C    192.168.20.0/24 is directly connected, Vlan20
C    192.168.30.0/24 is directly connected, Vlan30

! === ARP Verification ===
Switch# show ip arp vlan 10
Protocol  Address       Age(min)  Hardware Addr   Type   Interface
Internet  192.168.10.1        -   aabb.cc00.0100  ARPA   Vlan10
Internet  192.168.10.5       3    00aa.bbcc.0001  ARPA   Vlan10

! === Connectivity Testing ===
Switch# ping 192.168.10.5 source vlan 10
!!!
Switch# ping 192.168.20.10 source vlan 20
!!!
```

### Troubleshooting Scenario Walkthrough

**Scenario:** Users in VLAN 20 (Engineering) report they cannot access the file server in VLAN 10 (Servers), but can reach other devices in VLAN 20.

**Step-by-step diagnosis:**

```
1. From Engineering PC (192.168.20.50):
   > ping 192.168.20.1    → SUCCESS (gateway reachable)
   > ping 192.168.10.100  → FAIL (file server unreachable)

2. From Layer 3 Switch:
   Switch# ping 192.168.10.100  → SUCCESS
   (Switch can reach server — routing works)

3. Check ACLs on SVI:
   Switch# show run interface vlan 20
   ip access-group ENGINEERING-OUT in   ← ACL applied!

4. Check ACL entries:
   Switch# show ip access-list ENGINEERING-OUT
   10 deny ip any 192.168.10.0 0.0.0.255   ← BLOCKING!
   20 permit ip any any

5. Fix: Modify ACL to allow file server access
   Switch(config)# ip access-list extended ENGINEERING-OUT
   Switch(config-ext-nacl)# no 10
   Switch(config-ext-nacl)# 10 permit tcp any host 192.168.10.100 eq 445
   Switch(config-ext-nacl)# 15 deny ip any 192.168.10.0 0.0.0.255
   Switch(config-ext-nacl)# 20 permit ip any any
```

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

```
         [Internet]
             |
         [Router]
         Fa0/0 (trunk)   Fa0/1 (WAN)
             |
         [L2 Switch]
        /     |      \
   VLAN 10  VLAN 20  VLAN 30
   Staff    Guests   Printers
   10 PCs   25 PCs   15 Printers
```

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

```
                    [WAN Router]
                         |
              [Core L3 Switch Pair]
              HSRP Active / Standby
            /        |        \
     [Access SW]  [Access SW]  [Access SW]
     Building A   Building B   Building C
     VLAN 10-15   VLAN 20-25   VLAN 30-35
     500 users    800 users    700 users
```

---

**Scenario 3: Mixed Environment with Legacy Equipment**

**Requirements:**
- Existing Layer 2 switches cannot be replaced immediately
- New Layer 3 core switch being added
- Transition from router-on-a-stick to Layer 3 switching

**Solution:** Phased migration
- Phase 1: Deploy L3 switch as core, keep router for WAN
- Phase 2: Move inter-VLAN routing from router subinterfaces to L3 SVIs
- Phase 3: Configure routed ports between L3 switches
- Phase 4: Decommission router-on-a-stick configuration

```cisco
! Phase 2: Migration — move gateway from router to L3 switch
! Old router subinterface (to be removed):
!   Fa0/0.10 — 192.168.10.1/24
! New SVI on L3 switch:
Switch(config)# interface vlan 10
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown
! Clients keep same gateway — no reconfiguration needed
```

---

## Summary

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


**Q1.** What type of interface is used on a router for router-on-a-stick inter-VLAN routing?

A) Physical interfaces (one per VLAN)
B) Subinterfaces
C) Switch Virtual Interfaces (SVIs)
D) Loopback interfaces

<details>
<summary>Answer</summary>

**B)** ** B - Router-on-a-stick uses subinterfaces (e.g., Fa0/0.10, Fa0/0.20) on a single physical interface, with each subinterface configured for a different VLAN.
</details>

**Q2.** What command enables routing functionality on a Cisco Layer 3 switch?

A) `enable routing`
B) `ip routing`
C) `router enable`
D) `routing on`

<details>
<summary>Answer</summary>

**B)** ** B - The `ip routing` global configuration command enables Layer 3 routing on a Cisco Layer 3 switch, allowing it to route between VLANs.
</details>

**Q3.** Which encapsulation must be configured on router subinterfaces for router-on-a-stick?

A) PPP
B) Frame Relay
C) ISL
D) 802.1Q

<details>
<summary>Answer</summary>

**D)** ** D - 802.1Q (dot1Q) encapsulation must be configured on subinterfaces to tag frames with the appropriate VLAN ID on the trunk link.
</details>

**Q4.** What is the primary advantage of Layer 3 switching over router-on-a-stick?

A) Lower cost
B) Easier configuration
C) Hardware-based routing provides higher performance
D) Requires no VLANs

<details>
<summary>Answer</summary>

**C)** ** C - Layer 3 switches use hardware ASICs to route at wire speed, providing much higher performance than software-based routing in routers.
</details>

**Q5.** In a Layer 3 switch, what provides the default gateway for each VLAN?

A) Physical switch ports
B) Router interfaces
C) Switch Virtual Interfaces (SVIs)
D) Trunk ports

<details>
<summary>Answer</summary>

**C)** ** C - SVIs (Switch Virtual Interfaces) serve as the default gateway for each VLAN, with each SVI having an IP address in the VLAN's subnet.
</details>


## References

- **CompTIA Network+ N10-009 Objective 2.2:** Compare and contrast routing technologies and bandwidth management concepts
- **CompTIA Network+ N10-009 Objective 2.3:** Given a scenario, configure and deploy common Ethernet switching features
- **IEEE 802.1Q:** VLAN Tagging Standard
- Cisco CCNA: Inter-VLAN Routing
- Professor Messer: Network+ N10-009 - VLANs and Inter-VLAN Routing

---

**Next Lesson:** Lesson 16 - Spanning Tree Protocol (STP, RSTP, Loop Prevention)
