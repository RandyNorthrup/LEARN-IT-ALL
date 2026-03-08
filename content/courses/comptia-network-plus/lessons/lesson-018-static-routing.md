---
id: lesson-018-static-routing
title: Static Routing (Configuration and Use Cases)
chapterId: ch3-network-implementations
order: 18
duration: 55
objectives:
  - Understand static routing concepts and operation
  - Configure static routes on routers
  - Implement default routes and static default gateways
  - Compare static routing vs dynamic routing
  - Troubleshoot static route issues
  - Identify appropriate use cases for static routing
---

# Lesson 18: Static Routing (Configuration and Use Cases)

## Learning Objectives
- Understand static routing concepts and operation
- Configure static routes on routers
- Implement default routes and static default gateways
- Compare static routing vs dynamic routing
- Troubleshoot static route issues
- Identify appropriate use cases for static routing

## Introduction

**Static routing** is the manual configuration of routes in a router's routing table. Unlike dynamic routing protocols that automatically learn routes, static routes are explicitly configured by network administrators and remain in the routing table until manually removed.

This lesson covers static route configuration, default routes, floating static routes, and troubleshooting—essential knowledge for the CompTIA Network+ N10-009 exam.

---

## What is Static Routing?

### Definition

A **static route** is a manually configured route that tells the router:
- **Destination network** (where to go)
- **Next-hop address** OR **exit interface** (how to get there)
- **Administrative distance** (route priority - optional)

**Characteristics:**
- Configured manually by administrator
- Does not change automatically
- Remains in routing table until removed
- No bandwidth or CPU overhead (no routing protocol)
- No automatic failover (unless using object tracking)

### How Routers Make Forwarding Decisions

**Step 1:** Packet arrives at router
**Step 2:** Router examines destination IP address
**Step 3:** Router looks up destination in routing table
**Step 4:** Router forwards packet to next-hop or out exit interface

**Routing Table Match Priority:**
1. **Most specific match** (longest prefix match)
2. If multiple routes to same destination: **lowest administrative distance** wins
3. If same AD: **lowest metric** wins (for dynamic routes)

---

## Static Route Configuration

### Cisco IOS Syntax

**Basic Syntax:**
```cisco
Router(config)# ip route <destination-network> <subnet-mask> <next-hop-ip | exit-interface> [administrative-distance]
```

**Parameters:**
- `destination-network`: Network you want to reach
- `subnet-mask`: Subnet mask of destination network
- `next-hop-ip`: IP address of next router
- `exit-interface`: Interface to send traffic out
- `administrative-distance`: Optional (default: 1)

### Configuration Examples

**Example 1: Static Route to Specific Network**

```cisco
! Route to 10.2.0.0/16 via next-hop 192.168.1.2
Router(config)# ip route 10.2.0.0 255.255.0.0 192.168.1.2
```

**Explanation:**
- Destination: 10.2.0.0/16 network
- Next-hop: Send packets to router at 192.168.1.2
- That router will forward packets toward 10.2.0.0/16

---

**Example 2: Static Route Using Exit Interface**

```cisco
! Route to 172.16.0.0/16 out Serial0/0/0
Router(config)# ip route 172.16.0.0 255.255.0.0 Serial0/0/0
```

**Explanation:**
- Destination: 172.16.0.0/16
- Exit interface: Send packets out Serial0/0/0
- Used on point-to-point links (no next-hop needed)

---

**Example 3: Static Route with Next-Hop and Interface (Preferred)**

```cisco
! Route to 192.168.5.0/24 via Gi0/1 interface to 10.1.1.2
Router(config)# ip route 192.168.5.0 255.255.255.0 GigabitEthernet0/1 10.1.1.2
```

**Explanation:**
- Specifies both exit interface AND next-hop
- **Best practice** on Ethernet networks
- Avoids recursive lookups

---

### Next-Hop vs Exit Interface: Detailed Comparison

Understanding the difference between specifying a **next-hop IP address** and an **exit interface** is critical for proper static route configuration. Each method has distinct behaviors that affect how the router resolves the forwarding path.

**Forwarding Resolution Process:**

```
Next-Hop IP Method:
  Router receives packet → Checks routing table → Finds next-hop IP
  → Performs RECURSIVE LOOKUP to find exit interface for next-hop
  → Performs ARP resolution on exit interface for next-hop MAC
  → Forwards packet

Exit Interface Method:
  Router receives packet → Checks routing table → Finds exit interface
  → Performs ARP for DESTINATION IP directly (proxy ARP)
  → Forwards packet out interface
  → Problem: ARP entry for EVERY destination host!

Next-Hop + Exit Interface (Recommended):
  Router receives packet → Checks routing table → Finds both
  → No recursive lookup needed
  → ARP only for next-hop IP
  → Most efficient method
```

**Comparison Table:**

| Feature | Next-Hop Only | Exit Interface Only | Next-Hop + Exit Interface |
|---------|--------------|--------------------|--------------------------|
| **ARP Behavior** | ARP for next-hop | ARP for each destination | ARP for next-hop |
| **Recursive Lookup** | Yes (extra CPU) | No | No |
| **Best Link Type** | Any | Point-to-point only | Any (recommended) |
| **ARP Table Size** | Small (1 entry) | Large (per destination) | Small (1 entry) |
| **Proxy ARP Risk** | None | Yes (on Ethernet) | None |
| **CEF Compatibility** | Full | May cause issues | Full |

**Why Exit Interface Alone is Problematic on Ethernet:**

```
Scenario: ip route 10.0.0.0 255.0.0.0 GigabitEthernet0/0

What happens:
  1. Packet arrives for 10.5.5.5
  2. Router finds: "send out Gi0/0"
  3. Router ARPs for 10.5.5.5 on Gi0/0
  4. Next-hop router replies via Proxy ARP
  5. Router caches ARP entry for 10.5.5.5
  6. Next packet for 10.5.5.6 → Another ARP!
  7. ARP table grows with EVERY destination

Result: Large ARP table, increased ARP traffic,
        Proxy ARP dependency (security risk)
```

**When Exit Interface Alone is Acceptable:**

```
Point-to-Point Links (Serial, PPP, HDLC):
  - Only one possible next-hop
  - No ARP needed (layer 2 encapsulation handles it)
  - No ambiguity about destination

Example:
  Router(config)# ip route 10.2.0.0 255.255.0.0 Serial0/0/0
  ✓ Correct - Serial is point-to-point

  Router(config)# ip route 10.2.0.0 255.255.0.0 GigabitEthernet0/0
  ⚠ Avoid - Ethernet is multi-access
```

---

### Default Route Variations

Default routes can be configured in several ways depending on the network design:

**Standard Default Route:**
```cisco
! Simple default route to ISP
Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1
```

**Dual-ISP Default Routes with Floating Static:**
```cisco
! Primary ISP (AD 1 - default)
Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1

! Secondary ISP (AD 10 - backup)
Router(config)# ip route 0.0.0.0 0.0.0.0 198.51.100.1 10

! Verification:
Router# show ip route static
S*   0.0.0.0/0 [1/0] via 203.0.113.1    ← Active (lower AD)
```

**Load-Balanced Default Routes (Equal AD):**
```cisco
! Both routes active with same AD - traffic load-balanced
Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1
Router(config)# ip route 0.0.0.0 0.0.0.0 198.51.100.1

! Result: Per-destination load balancing
Router# show ip route
S*   0.0.0.0/0 [1/0] via 203.0.113.1
                [1/0] via 198.51.100.1
```

---

### Summary Route (Route Aggregation)

Instead of configuring multiple specific static routes, you can use a **summary route** to cover a range of networks:

```cisco
! Instead of these 4 specific routes:
Router(config)# ip route 10.1.0.0 255.255.255.0 192.168.1.2
Router(config)# ip route 10.1.1.0 255.255.255.0 192.168.1.2
Router(config)# ip route 10.1.2.0 255.255.255.0 192.168.1.2
Router(config)# ip route 10.1.3.0 255.255.255.0 192.168.1.2

! Use one summary route:
Router(config)# ip route 10.1.0.0 255.255.252.0 192.168.1.2

! 10.1.0.0/22 covers 10.1.0.0 through 10.1.3.255
```

**Benefits of Summary Routes:**
- Fewer routing table entries
- Simpler configuration
- Easier to maintain
- Reduces lookup time

---

### Verification Commands

**View Routing Table:**
```cisco
Router# show ip route

Codes: C - connected, S - static, R - RIP, O - OSPF
Gateway of last resort is not set

S    10.2.0.0/16 [1/0] via 192.168.1.2
C    192.168.1.0/24 is directly connected, GigabitEthernet0/0
C    192.168.2.0/24 is directly connected, GigabitEthernet0/1
```

**Legend:**
- `S`: Static route
- `[1/0]`: [Administrative Distance / Metric]
- `via 192.168.1.2`: Next-hop address

**View Specific Static Routes:**
```cisco
Router# show ip route static
```

**Test Connectivity:**
```cisco
Router# ping 10.2.0.1
Router# traceroute 10.2.0.1
```

---

## Default Route (Gateway of Last Resort)

### What is a Default Route?

A **default route** is a static route that matches ALL destinations not explicitly in the routing table. It's the "catch-all" route.

**Use Cases:**
- Edge routers connecting to ISP
- Stub networks (networks with single exit point)
- Small branch offices

### Default Route Configuration

**Syntax:**
```cisco
Router(config)# ip route 0.0.0.0 0.0.0.0 <next-hop | exit-interface>
```

**Explanation:**
- `0.0.0.0 0.0.0.0`: Matches any destination (0.0.0.0/0)
- Called the "quad-zero" route

**Example: Branch Office Default Route**

```cisco
! All unknown traffic goes to ISP at 203.0.113.1
Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1
```

**Verification:**
```cisco
Router# show ip route
Gateway of last resort is 203.0.113.1 to network 0.0.0.0

S*   0.0.0.0/0 [1/0] via 203.0.113.1
```

**The `*` indicates this is the default route (gateway of last resort)**

---

## Administrative Distance (AD)

### What is Administrative Distance?

**Administrative Distance (AD)** is a value (0-255) that indicates the trustworthiness of a routing source. **Lower AD = more trusted.**

When a router has multiple routes to the same destination from different sources, it uses the route with the lowest AD.

### Common AD Values

| Route Source | AD Value |
|--------------|----------|
| Connected interface | 0 |
| Static route | 1 |
| EIGRP summary | 5 |
| External BGP (eBGP) | 20 |
| Internal EIGRP | 90 |
| OSPF | 110 |
| IS-IS | 115 |
| RIP | 120 |
| External EIGRP | 170 |
| Internal BGP (iBGP) | 200 |
| Unknown/Unreachable | 255 |

### Floating Static Routes

A **floating static route** is a static route with a higher AD than a dynamic routing protocol. It serves as a **backup route**.

**How it works:**
- Normal route: Dynamic protocol (e.g., OSPF, AD 110)
- Backup route: Static route with higher AD (e.g., 120)
- If dynamic route fails, static route becomes active

**Configuration Example:**

```cisco
! Primary route via OSPF (AD 110)
Router(config)# router ospf 1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0

! Floating static route (AD 120) as backup
Router(config)# ip route 10.5.0.0 255.255.0.0 192.168.2.1 120
```

**Normal Operation:**
- OSPF route active (AD 110)
- Static route in config but not in routing table

**OSPF Failure:**
- OSPF route removed
- Static route (AD 120) becomes active
- Traffic fails over to backup path

---

## Static Routing vs Dynamic Routing

### Comparison Table

| Feature | Static Routing | Dynamic Routing |
|---------|----------------|-----------------|
| **Configuration** | Manual | Automatic |
| **Bandwidth Usage** | None | Routing protocol overhead |
| **CPU Usage** | Minimal | Higher (protocol processing) |
| **Scalability** | Poor (large networks) | Excellent |
| **Convergence** | No automatic recovery | Automatic failover |
| **Security** | More secure (no protocol) | Less secure (routing updates) |
| **Maintenance** | High (manual updates) | Low (automatic updates) |
| **Predictability** | Highly predictable | Less predictable (topology changes) |
| **Best For** | Small networks, stub networks | Large, dynamic networks |

---

## Use Cases for Static Routing

### When to Use Static Routes

✅ **Small Networks:**
- Few routers (< 5)
- Simple topology
- Rare network changes

✅ **Stub Networks:**
- Single exit point
- No need for dynamic routing
- Branch offices with one ISP connection

✅ **Default Routes:**
- Edge routers to ISP
- All traffic goes to one destination

✅ **Backup Routes:**
- Floating static routes
- Failover when primary route fails

✅ **Security:**
- No routing protocol = no routing protocol attacks
- Explicit control over routing

✅ **Bandwidth-Constrained Links:**
- Slow WAN links
- Avoid routing protocol overhead

### When NOT to Use Static Routes

❌ **Large Networks:**
- Too many routes to configure manually
- High administrative overhead

❌ **Redundant Topologies:**
- Multiple paths require dynamic failover
- Manual intervention too slow

❌ **Frequent Network Changes:**
- Adding/removing networks often
- Topology changes frequently

---

## Troubleshooting Static Routes

### Issue 1: Destination Unreachable

**Symptoms:**
- Ping fails
- "Destination unreachable" message

**Troubleshooting Steps:**

1. **Verify static route exists:**
   ```cisco
   Router# show ip route static
   ```

2. **Check destination network and mask:**
   ```cisco
   Router# show running-config | include ip route
   ```
   Verify correct network and subnet mask

3. **Verify next-hop reachable:**
   ```cisco
   Router# ping <next-hop-ip>
   ```
   Next-hop must be reachable

4. **Check exit interface status:**
   ```cisco
   Router# show ip interface brief
   ```
   Interface must be up/up

5. **Return route exists?**
   - Remote router needs route back to source
   - Check routing on destination router

---

### Issue 2: Static Route Not in Routing Table

**Symptoms:**
- Static route configured but not showing in routing table
- Traffic not forwarding

**Possible Causes:**

1. **Next-hop unreachable:**
   - Router can't reach next-hop IP
   - Static route won't install until next-hop reachable

2. **Exit interface down:**
   - If using exit interface method, interface must be up
   - Check: `show ip interface brief`

3. **Competing route with lower AD:**
   - Another route to same destination with lower AD
   - Check AD values

**Solution:**
- Verify next-hop reachable: `ping <next-hop>`
- Check interface status: `show interfaces`
- Verify no conflicting routes: `show ip route`

---

### Issue 3: Routing Loop

**Symptoms:**
- Packets loop between routers
- TTL expires
- High CPU usage

**Cause:**
- Misconfigured static routes pointing to each other

**Example of Loop:**
```
Router A: ip route 10.1.0.0 255.255.0.0 <Router B>
Router B: ip route 10.1.0.0 255.255.0.0 <Router A>
```

**Solution:**
- Verify routing table on all routers
- Ensure routes point toward destination, not back toward source
- Use `traceroute` to identify loop

---

### Issue 4: Asymmetric Routing

**Symptoms:**
- Connections work in one direction but not the other
- Stateful firewalls drop return traffic
- Inconsistent connectivity

**Cause:**
- Forward path uses one route, return path uses a different route
- Common when static and dynamic routes are mixed

**Troubleshooting:**
```cisco
! Check forward path on Router A
Router-A# traceroute 10.5.0.1

! Check return path FROM destination
Router-B# traceroute 192.168.1.100

! Compare: paths should be symmetric or at least
! both pass through same firewall/security devices
```

**Solution:**
- Ensure return routes exist on all intermediate routers
- Verify static routes are consistent across the path
- Check that firewalls see traffic in both directions

---

### Systematic Troubleshooting Workflow

```
Static Route Troubleshooting Checklist:
┌─────────────────────────────────────────┐
│ 1. Is the static route in the config?   │
│    show running-config | include route  │
├─────────────────────────────────────────┤
│ 2. Is it in the routing table?          │
│    show ip route static                 │
│    (If NO → next-hop unreachable or     │
│     interface down)                     │
├─────────────────────────────────────────┤
│ 3. Is the next-hop reachable?           │
│    ping <next-hop-ip>                   │
├─────────────────────────────────────────┤
│ 4. Is the exit interface up/up?         │
│    show ip interface brief              │
├─────────────────────────────────────────┤
│ 5. Is there a more specific route?      │
│    show ip route <destination>          │
│    (Longest prefix match wins)          │
├─────────────────────────────────────────┤
│ 6. Does the remote end have a return?   │
│    Check routing on destination router  │
├─────────────────────────────────────────┤
│ 7. Are ACLs or firewalls blocking?      │
│    show access-lists                    │
└─────────────────────────────────────────┘
```

---

## Configuration Best Practices

### 1. Document All Static Routes

Maintain documentation:
- Destination network
- Next-hop or exit interface
- Purpose of route
- Date added

### 2. Use Descriptions (If Supported)

```cisco
! Cisco doesn't support descriptions for static routes
! Use comments in configuration
```

### 3. Be Specific with Subnet Masks

**Bad (too broad):**
```cisco
ip route 10.0.0.0 255.0.0.0 192.168.1.1
```

**Good (specific):**
```cisco
ip route 10.5.2.0 255.255.255.0 192.168.1.1
```

### 4. Prefer Next-Hop + Exit Interface on Ethernet

**Best Practice:**
```cisco
ip route 10.2.0.0 255.255.0.0 GigabitEthernet0/1 192.168.1.2
```

Avoids ARP lookups and recursive route lookups

### 5. Use Floating Static Routes for Redundancy

```cisco
! Primary: OSPF (AD 110)
! Backup: Static (AD 120)
ip route 10.5.0.0 255.255.0.0 192.168.2.1 120
```

### 6. Implement Default Route at Edge

```cisco
! Branch router to ISP
ip route 0.0.0.0 0.0.0.0 <ISP-next-hop>
```

---

## Real-World Scenarios

**Scenario 1: Small Office with 3 Routers**

**Topology:**
```
[Router A] --- [Router B] --- [Router C]
 10.1.0.0/16    10.2.0.0/16    10.3.0.0/16
```

**Router A Configuration:**
```cisco
! Route to 10.2.0.0/16 (directly connected via Router B)
ip route 10.2.0.0 255.255.0.0 <Router-B-IP>

! Route to 10.3.0.0/16 (via Router B)
ip route 10.3.0.0 255.255.0.0 <Router-B-IP>
```

**Router B Configuration:**
```cisco
! Route to 10.1.0.0/16 (back to Router A)
ip route 10.1.0.0 255.255.0.0 <Router-A-IP>

! Route to 10.3.0.0/16 (to Router C)
ip route 10.3.0.0 255.255.0.0 <Router-C-IP>
```

---

**Scenario 2: Branch Office with Backup ISP Link**

**Requirements:**
- Primary ISP: Fast fiber
- Backup ISP: Slower DSL
- Automatic failover

**Configuration:**
```cisco
! Primary route (default AD 1)
ip route 0.0.0.0 0.0.0.0 <Primary-ISP-IP>

! Backup floating static route (AD 10)
ip route 0.0.0.0 0.0.0.0 <Backup-ISP-IP> 10
```

**Operation:**
- Normal: Primary route active
- Primary failure: Backup route automatically activated

---

## Summary

1. **Static routes** are manually configured and don't change automatically
2. **Default route** (0.0.0.0/0) matches all destinations
3. **Administrative Distance** determines route preference (lower = better)
4. **Floating static routes** provide backup with higher AD
5. **Best for small networks** and stub networks with single exit
6. **Static routing** has no bandwidth/CPU overhead but requires manual maintenance
7. **Troubleshooting:** Verify route exists, next-hop reachable, return route configured

---

## Practice Questions


**Q1.** What is the default administrative distance for a static route?

A) 0
B) 1
C) 90
D) 110

<details>
<summary>Answer</summary>

**B)** ** B - Static routes have a default administrative distance of 1 (connected interfaces are 0, making them even more trusted).
</details>

**Q2.** Which command configures a default route on a Cisco router?

A) `ip default-route 0.0.0.0 0.0.0.0 <next-hop>`
B) `ip route 0.0.0.0 0.0.0.0 <next-hop>`
C) `ip default-network 0.0.0.0`
D) `default-route <next-hop>`

<details>
<summary>Answer</summary>

**B)** ** B - The command `ip route 0.0.0.0 0.0.0.0 <next-hop>` creates a default route (gateway of last resort).
</details>

**Q3.** What is a floating static route?

A) A static route that changes dynamically
B) A static route with higher AD used as backup
C) A static route that doesn't appear in the routing table
D) A default route

<details>
<summary>Answer</summary>

**B)** ** B - A floating static route has a higher administrative distance than the primary route and only becomes active if the primary route fails.
</details>

**Q4.** When is static routing preferred over dynamic routing?

A) Large enterprise networks
B) Networks with frequent topology changes
C) Small networks or stub networks
D) Networks requiring fast convergence

<details>
<summary>Answer</summary>

**C)** ** C - Static routing is best for small networks, stub networks with single exit points, and networks that rarely change.
</details>

**Q5.** If a router has two routes to 10.1.0.0/16 (one OSPF with AD 110, one static with AD 1), which route is used?

A) OSPF route (AD 110)
B) Static route (AD 1)
C) Both routes (load balancing)
D) Neither (routing loop)

<details>
<summary>Answer</summary>

**B)** ** B - The static route (AD 1) is preferred because it has a lower administrative distance than OSPF (AD 110). Lower AD = more trusted.
</details>


## References

- **CompTIA Network+ N10-009 Objective 2.2:** Compare and contrast routing technologies and bandwidth management concepts
- **CompTIA Network+ N10-009 Objective 5.3:** Given a scenario, use the appropriate network software tools and commands
- Cisco CCNA: IP Routing Fundamentals
- Professor Messer: Network+ N10-009 - Routing

---

**Next Lesson:** Lesson 19 - Dynamic Routing Protocols (RIP, OSPF, EIGRP Overview)
