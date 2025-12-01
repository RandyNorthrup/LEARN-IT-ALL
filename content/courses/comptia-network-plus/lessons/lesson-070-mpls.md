---
id: lesson-070-mpls
title: "MPLS (Multiprotocol Label Switching)"
chapterId: "chapter-008-wan-technologies"
order: 70
duration: 24
objectives:
  - Understand MPLS architecture and operation
  - Explain label switching and forwarding
  - Describe MPLS network components (PE, P, CE routers)
  - Differentiate MPLS from traditional IP routing
  - Identify MPLS benefits and use cases
---

# MPLS (Multiprotocol Label Switching)

**MPLS (Multiprotocol Label Switching)** is a high-performance WAN technology that uses **labels** instead of IP addresses for forwarding packets. MPLS provides scalability, QoS, traffic engineering, and VPN services for enterprise networks.

This lesson covers MPLS fundamentals—essential for the CompTIA Network+ N10-008 exam.

---

## What is MPLS?

### MPLS Definition

**MPLS** is a packet-forwarding technology that uses **short labels** (not IP addresses) to make forwarding decisions, operating between Layer 2 and Layer 3.

**Key concept:**
- Traditional routing: Router examines **IP header** (destination IP) at each hop
- MPLS: Router examines **MPLS label** (32-bit value) for fast forwarding

### Why MPLS?

**Problems with traditional IP routing:**
- **Slow**: Router must look up destination IP in routing table at each hop
- **Complex**: Difficult to implement traffic engineering (control path selection)
- **No QoS guarantees**: Best-effort delivery

**MPLS solutions:**
- **Fast forwarding**: Simple label lookup (faster than IP routing table)
- **Traffic engineering**: Explicit path control
- **QoS support**: Prioritize traffic classes
- **VPN services**: Isolated customer networks over shared infrastructure

### MPLS Position in OSI Model

**Layer 2.5:**
- Between Data Link Layer (Layer 2) and Network Layer (Layer 3)
- Works with any Layer 2 technology (Ethernet, Frame Relay, ATM)
- Works with any Layer 3 protocol (IP, IPv6, IPX)

```
┌────────────────────┐
│  Layer 3 (IP)      │
├────────────────────┤
│  MPLS (Layer 2.5)  │ ← MPLS operates here
├────────────────────┤
│  Layer 2 (Ethernet)│
└────────────────────┘
```

---

## MPLS Architecture

### MPLS Network Components

```
Customer Site A           MPLS Provider Network        Customer Site B
┌───────────┐            ┌───┐    ┌───┐    ┌───┐      ┌───────────┐
│    CE     │────────────│ PE│────│ P │────│ PE│──────│    CE     │
│  Router   │ Access Link│   │    │   │    │   │Access│  Router   │
└───────────┘            └───┘    └───┘    └───┘Link  └───────────┘
   Customer                 Provider                      Customer
```

**CE (Customer Edge) Router:**
- Customer-owned router at customer site
- Connects to provider MPLS network
- No MPLS configuration required

**PE (Provider Edge) Router:**
- Provider router at edge of MPLS network
- Connects to CE routers
- Adds/removes MPLS labels
- Also called **LER (Label Edge Router)**

**P (Provider) Router:**
- Provider router in core of MPLS network
- Forwards packets based on labels only
- Does NOT look at IP headers
- Also called **LSR (Label Switching Router)**

### MPLS Domain

**MPLS domain** = Provider network running MPLS
- P routers and PE routers
- Customer routers (CE) outside MPLS domain

---

## MPLS Labels

### Label Structure

**MPLS label** = 32 bits inserted between Layer 2 and Layer 3 headers

```
┌────────────┬───────────┬────────────┬───────────┐
│ Label (20) │ Exp (3)   │ S (1)      │ TTL (8)   │
└────────────┴───────────┴────────────┴───────────┘
        32 bits total
```

**Fields:**
- **Label (20 bits)**: Label value (0-1,048,575)
- **Exp (3 bits)**: Experimental bits (used for QoS/CoS)
- **S (1 bit)**: Stack bit (1 = bottom of stack, 0 = more labels)
- **TTL (8 bits)**: Time to Live (prevents loops)

### Label Stack

**MPLS supports multiple labels** (label stack):
- Top label used for forwarding
- Additional labels for VPN, traffic engineering

**Example:**
```
┌─────────────────┐
│  Ethernet       │
├─────────────────┤
│  MPLS Label 2   │ ← VPN label
├─────────────────┤
│  MPLS Label 1   │ ← Transport label (top)
├─────────────────┤
│  IP Header      │
├─────────────────┤
│  Payload        │
└─────────────────┘
```

---

## How MPLS Works

### LSP (Label Switched Path)

**LSP** is the path packets follow through MPLS network from ingress to egress PE router.

**Example LSP:**
```
CE1 → PE1 → P1 → P2 → PE2 → CE2
       └──────────LSP───────┘
```

### Label Distribution

**LDP (Label Distribution Protocol):**
- Routers exchange label mappings
- Each router assigns labels to destinations
- Labels have local significance only (different on each link)

### MPLS Forwarding Process

**Steps:**

1. **Ingress PE (Label Push):**
   - Packet arrives from CE router (plain IP)
   - PE examines IP destination
   - PE adds (pushes) MPLS label
   - Forwards to next hop based on label

2. **P Routers (Label Swap):**
   - Examines incoming label
   - Looks up label in **LFIB (Label Forwarding Information Base)**
   - Swaps label with outgoing label
   - Forwards to next hop

3. **Egress PE (Label Pop):**
   - Removes (pops) label
   - Forwards plain IP packet to CE router

### MPLS Forwarding Example

```
Step 1: CE1 sends IP packet to CE2
   CE1 → PE1: IP packet (Dest: 10.2.2.2)

Step 2: PE1 (Ingress) pushes label 100
   PE1 → P1: [Label: 100] IP packet

Step 3: P1 swaps label 100 → 200
   P1 → P2: [Label: 200] IP packet

Step 4: P2 swaps label 200 → 300
   P2 → PE2: [Label: 300] IP packet

Step 5: PE2 (Egress) pops label
   PE2 → CE2: IP packet (Dest: 10.2.2.2)
```

**Label operations:**
- **Push**: Add label (ingress PE)
- **Swap**: Replace label (P routers)
- **Pop**: Remove label (egress PE or penultimate router)

### Penultimate Hop Popping (PHP)

**Optimization:**
- Egress PE already knows packet is for it (no need to look at label)
- **Penultimate router** (P2 in example) pops label
- Egress PE receives plain IP packet (saves one lookup)

**With PHP:**
```
P2 → PE2: IP packet (no label)
PE2 → CE2: IP packet
```

---

## MPLS vs Traditional IP Routing

| Aspect | Traditional IP Routing | MPLS |
|--------|------------------------|------|
| **Lookup** | IP routing table (longest prefix match) | Label table (exact match) |
| **Speed** | Slower (complex lookup) | Faster (simple lookup) |
| **QoS** | Difficult (DiffServ/ToS) | Easy (Exp bits in label) |
| **Traffic Engineering** | Limited (routing protocols) | Advanced (explicit paths) |
| **VPN** | Requires tunneling (GRE, IPsec) | Built-in (VPN labels) |
| **Path Selection** | Routing protocol decides | Provider controls (LSP) |

**MPLS advantages:**
- Simpler forwarding (label vs IP lookup)
- Traffic engineering (control exact path)
- Built-in VPN support

---

## MPLS VPN (Layer 3 VPN)

### What is MPLS VPN?

**MPLS Layer 3 VPN** provides isolated virtual networks for multiple customers over shared MPLS infrastructure.

### MPLS VPN Architecture

```
Customer A Site 1      MPLS Provider       Customer A Site 2
┌────────┐           ┌────────────┐        ┌────────┐
│   CE   │───────────│  PE (VRF)  │────────│   CE   │
└────────┘           │   VPN-A    │        └────────┘
                     └────────────┘
                           │
Customer B Site 1          │             Customer B Site 2
┌────────┐           ┌────────────┐        ┌────────┐
│   CE   │───────────│  PE (VRF)  │────────│   CE   │
└────────┘           │   VPN-B    │        └────────┘
                     └────────────┘
```

**VRF (Virtual Routing and Forwarding):**
- Separate routing table per customer at PE router
- Customer A traffic isolated from Customer B
- Customers can use overlapping IP addresses (e.g., both use 10.0.0.0/8)

### MPLS VPN Benefits

✅ **Isolation**: Customer traffic separated (security)
✅ **Scalability**: Add customers without new infrastructure
✅ **Any-to-any connectivity**: All sites can reach each other
✅ **Overlapping IP addresses**: Different customers can use same IPs

### Customer Perspective

**Customer sees:**
- Private WAN connecting all sites
- No knowledge of MPLS labels

**Example:**
- Company has 10 branch offices
- MPLS VPN connects all sites (full mesh)
- Each site can reach all others directly

---

## MPLS QoS (Quality of Service)

### QoS Support

**MPLS Exp bits:**
- 3 bits = 8 classes of service (CoS)
- Map IP DSCP values to MPLS Exp bits

**Example QoS classes:**
- **0**: Best effort (default)
- **5**: Voice (low latency, low jitter)
- **4**: Video (medium latency)
- **3**: Business-critical apps

### QoS Example

**Voice traffic:**
1. CE sends VoIP packet (DSCP = EF, Expedited Forwarding)
2. PE maps DSCP EF → MPLS Exp = 5
3. P routers prioritize Exp = 5 packets (low latency queues)
4. Voice call has low latency and jitter

---

## MPLS Traffic Engineering

### What is Traffic Engineering?

**Traffic engineering** controls the path packets take through network (not based on shortest path).

**Use cases:**
- Load balancing across multiple paths
- Avoid congested links
- Reserve bandwidth for critical apps

### RSVP-TE (Resource Reservation Protocol - Traffic Engineering)

**RSVP-TE:**
- Signals LSPs with specific path constraints
- Reserve bandwidth along path
- Example: Reserve 100 Mbps for video traffic

**Traditional routing:**
- Shortest path only (based on routing protocol metrics)

**MPLS-TE:**
- Explicitly define path (A → B → C → D)
- Avoid shortest path if congested

---

## MPLS Advantages

✅ **Faster forwarding**: Label lookup simpler than IP routing table
✅ **Traffic engineering**: Control exact path through network
✅ **QoS support**: Prioritize traffic classes easily
✅ **Scalability**: Support thousands of VPNs on single infrastructure
✅ **Any-to-any connectivity**: Full mesh without point-to-point circuits
✅ **Protocol agnostic**: Works with IP, IPv6, and other Layer 3 protocols
✅ **VPN services**: Isolated customer networks (Layer 3 VPN)
✅ **Fast failover**: Backup LSPs precomputed (sub-second convergence)

---

## MPLS Disadvantages

❌ **Provider dependency**: Customer relies on provider's MPLS network
❌ **Cost**: More expensive than internet VPN
❌ **Complexity**: Requires MPLS expertise
❌ **Vendor lock-in**: Migrating providers difficult
❌ **Not encrypted by default**: Customer must add encryption if needed
❌ **Limited geographic reach**: Only where provider has MPLS network

---

## MPLS Use Cases

### Enterprise WAN

**Scenario:**
- Company with 50 branch offices
- Need reliable, secure connectivity

**MPLS solution:**
- Provider offers MPLS VPN
- All sites connected (any-to-any)
- QoS for voice/video
- Provider manages network

### Service Provider Backbone

**Scenario:**
- ISP needs high-performance backbone
- Support traffic engineering and fast reroute

**MPLS solution:**
- Core network runs MPLS
- Traffic engineering avoids congestion
- Fast failover (50ms convergence)

### Datacenter Interconnect

**Scenario:**
- Connect multiple datacenters
- Require low latency and high bandwidth

**MPLS solution:**
- MPLS circuit between datacenters
- Guaranteed bandwidth (SLA)
- Low latency for synchronous replication

---

## MPLS vs VPN over Internet

| Aspect | MPLS VPN | Internet VPN (IPsec) |
|--------|----------|----------------------|
| **Cost** | Higher | Lower |
| **Performance** | Predictable (SLA) | Variable (best effort) |
| **QoS** | Built-in | Limited |
| **Latency** | Low, consistent | Higher, variable |
| **Security** | Isolated (no encryption by default) | Encrypted (IPsec) |
| **Provisioning** | Weeks (provider setup) | Days (self-service) |
| **Management** | Provider managed | Customer managed |

**When to use MPLS:**
- Mission-critical apps
- Need guaranteed performance
- Multiple sites (10+)
- Budget available

**When to use Internet VPN:**
- Cost-sensitive
- Few sites (1-5)
- Can tolerate variable performance
- Need encryption

---

## MPLS Protocols

### Label Distribution Protocols

**LDP (Label Distribution Protocol):**
- Standard protocol for distributing labels
- Used for basic MPLS (no traffic engineering)

**RSVP-TE (Resource Reservation Protocol - Traffic Engineering):**
- Used for traffic engineering LSPs
- Reserve bandwidth along path

**BGP (Border Gateway Protocol):**
- Used for MPLS VPNs (MP-BGP)
- Distributes VPN routes between PE routers

### Routing Protocols in MPLS

**Between CE and PE:**
- **BGP**: Large enterprise
- **OSPF**: Common choice
- **EIGRP**: Cisco environments
- **Static routes**: Simple deployments

**Within MPLS core (between P and PE):**
- **OSPF or IS-IS**: Interior gateway protocol

---

## Key Takeaways

1. **MPLS** uses labels instead of IP addresses for fast packet forwarding (Layer 2.5 technology)
2. **CE routers** are customer-owned; **PE routers** add/remove labels at edge; **P routers** forward based on labels only
3. **Label operations**: Push (add label at ingress), Swap (change label at core), Pop (remove label at egress)
4. **LSP (Label Switched Path)** is the path packets follow through MPLS network
5. **MPLS VPN (Layer 3 VPN)** provides isolated customer networks over shared infrastructure using VRFs
6. **MPLS QoS** uses Exp bits (3 bits = 8 classes) to prioritize traffic
7. **Traffic engineering** with MPLS controls exact packet path (not shortest path)
8. **MPLS advantages**: Fast forwarding, traffic engineering, QoS, VPN support, any-to-any connectivity
9. **MPLS vs Internet VPN**: MPLS has predictable performance and higher cost; Internet VPN is cheaper with variable performance
10. **LDP** distributes labels; **RSVP-TE** used for traffic engineering; **MP-BGP** used for MPLS VPNs

---

## References

- **CompTIA Network+ N10-008 Objective 2.1:** Compare and contrast WAN technologies (MPLS)
- RFC 3031: MPLS Architecture
- RFC 4364: BGP/MPLS IP VPNs
- RFC 3036: LDP Specification
- Cisco: MPLS Fundamentals
- Professor Messer: Network+ N10-008 - MPLS

---

**Next Lesson:** Lesson 71 - Broadband Technologies (Cable, DSL, Fiber/FTTP)
