---
id: lesson-075-sd-wan
title: "SD-WAN (Software-Defined WAN)"
chapterId: ch8-wan-technologies
order: 75
duration: 21
objectives:
  - Understand SD-WAN architecture and benefits
  - Explain how SD-WAN differs from traditional WAN
  - Describe SD-WAN components and operation
  - Identify SD-WAN use cases and deployment models
  - Compare SD-WAN vendors and technologies
---

# SD-WAN (Software-Defined WAN)

## Introduction

**SD-WAN (Software-Defined Wide Area Network)** uses software to intelligently route traffic across multiple WAN connections, replacing expensive MPLS circuits with cost-effective broadband while maintaining performance and security.

This lesson covers SD-WAN fundamentals—important for the CompTIA Network+ N10-009 exam.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand SD-WAN architecture and benefits
- Explain how SD-WAN differs from traditional WAN
- Describe SD-WAN components and operation
- Identify SD-WAN use cases and deployment models
- Compare SD-WAN vendors and technologies

---

## What is SD-WAN?

### SD-WAN Definition

**SD-WAN** is a virtual WAN architecture that uses software to:
- Intelligently route traffic across multiple connections
- Prioritize critical applications
- Improve performance and reduce costs

**Key concept:**
- Traditional WAN: Relies on expensive MPLS, manual configuration
- SD-WAN: Uses broadband + intelligence, centralized management

### The Problem SD-WAN Solves

**Traditional WAN challenges:**

❌ **Expensive**: MPLS circuits costly
❌ **Slow provisioning**: Weeks/months for new circuits
❌ **Inflexible**: Difficult to adjust bandwidth
❌ **Complex**: Manual configuration per site
❌ **Suboptimal routing**: Traffic backhauled through HQ (inefficient for cloud apps)

**SD-WAN solutions:**

✅ **Cost-effective**: Use broadband (cable, DSL, LTE) instead of MPLS
✅ **Fast deployment**: New sites online in days
✅ **Flexible**: Easy to scale bandwidth
✅ **Centralized management**: Configure all sites from controller
✅ **Intelligent routing**: Direct internet breakout for cloud apps

---

## Traditional WAN vs SD-WAN

### Traditional WAN Architecture

```
Branch Office                 Headquarters
┌─────────┐                  ┌─────────┐
│ Router  │                  │ Router  │
└────┬────┘                  └────┬────┘
     │                            │
  MPLS Circuit                    │
     └────────────────────────────┘
          (Expensive)

  All internet traffic backhauled to HQ:
  Branch → MPLS → HQ → Internet → SaaS App
```

**Characteristics:**
- Single MPLS connection per branch
- All traffic (including internet) through HQ
- Expensive MPLS circuits
- Manual configuration per router

### SD-WAN Architecture

```
Branch Office                 Cloud
┌─────────┐                  ┌─────────┐
│SD-WAN   │──MPLS───────────▶│  MPLS   │
│Appliance│                  │ Network │
└────┬────┘                  └─────────┘
     │
     ├─Cable Internet────────▶ Internet
     │                        (Direct breakout)
     └─LTE───────────────────▶ Internet
       (Backup)               (Direct breakout)

  Internet traffic goes directly to cloud:
  Branch → Internet → SaaS App (Low latency)
```

**Characteristics:**
- Multiple WAN connections (MPLS, broadband, LTE)
- Intelligent path selection per application
- Direct internet breakout (local breakout)
- Centralized controller (zero-touch provisioning)

---

## SD-WAN Components

### SD-WAN Edge Devices

**SD-WAN appliance at each branch:**
- Physical appliance or virtual router
- Multiple WAN interfaces (MPLS, cable, LTE)
- Creates encrypted overlay network

**Examples:**
- Cisco vEdge
- VMware VeloCloud Edge
- Fortinet FortiGate (SD-WAN enabled)

### SD-WAN Controller

**Centralized management platform:**
- Configures all edge devices
- Monitors network health
- Defines policies (application routing, QoS)

**Zero-touch provisioning:**
- Ship appliance to branch
- Plug in, automatically connects to controller
- Controller pushes config

### SD-WAN Orchestrator

**Management interface (GUI/API):**
- Network administrators configure policies
- View dashboards, analytics
- Manage entire SD-WAN from single pane

---

## How SD-WAN Works

### Application-Aware Routing

**SD-WAN identifies applications** and routes based on policies:

**Example policy:**
```
Application: Microsoft 365
  - Primary path: Broadband (direct internet)
  - Backup path: MPLS
  - Priority: High
  - Required bandwidth: 5 Mbps

Application: File server access
  - Primary path: MPLS
  - Backup path: Broadband (VPN)
  - Priority: Medium

Application: General web browsing
  - Primary path: Broadband
  - Priority: Low
```

**How it identifies apps:**
- **Deep Packet Inspection (DPI)**: Examines packet contents
- **Port/protocol**: HTTP (80), HTTPS (443), etc.
- **DNS**: Resolves domain names (e.g., office365.com)
- **IP address**: Cloud service IP ranges

### Active/Active WAN Links

**Traditional WAN:**
- Active/standby (MPLS primary, backup idle)

**SD-WAN:**
- Active/active (all links used simultaneously)
- Load balancing across links
- Automatically fails over if link degrades

### Overlay Network

**SD-WAN creates virtual overlay:**
- Encrypted tunnels between sites
- Abstraction layer above physical WAN
- Independent of underlay (can use any transport)

```
     Overlay (SD-WAN virtual network)
    ┌────────────────────────────────┐
    │    Encrypted tunnels           │
    └────────────────────────────────┘
           │         │         │
     Underlay (Physical connections)
    MPLS    Broadband    LTE
```

### Traffic Steering Algorithms

SD-WAN uses sophisticated algorithms to determine the optimal path for each application flow:

**1. Threshold-Based Steering:**
```
Monitor link metrics continuously:
  MPLS:      Latency=15ms  Jitter=2ms  Loss=0.0%
  Broadband: Latency=25ms  Jitter=8ms  Loss=0.1%
  LTE:       Latency=35ms  Jitter=12ms Loss=0.5%

Policy for VoIP (requires latency<30ms, jitter<5ms, loss<0.1%):
  ✔ MPLS:      meets all thresholds → PRIMARY PATH
  ✘ Broadband: jitter exceeds 5ms threshold
  ✘ LTE:       jitter and loss exceed thresholds

If MPLS degrades (latency spikes to 45ms):
  Re-evaluate → switch VoIP to broadband
  (broadband jitter acceptable for short-term use)
```

**2. Weighted Path Selection:**
```
Assign weights to link quality metrics:
  Latency weight:  40%
  Jitter weight:   30%
  Packet loss:     30%

Link score calculation:
  MPLS:      (15×0.4) + (2×0.3) + (0×0.3)   = 6.6  (lower is better)
  Broadband: (25×0.4) + (8×0.3) + (0.1×0.3) = 12.43
  LTE:       (35×0.4) + (12×0.3) + (0.5×0.3) = 17.75

  MPLS wins with lowest score → selected for critical traffic
```

**3. SLA-Based Steering:**
- Define SLA classes (Platinum, Gold, Silver, Bronze)
- Each class has specific latency/jitter/loss requirements
- Applications mapped to SLA classes
- Paths continuously measured against SLA requirements

```
SLA Classes:
  Platinum (VoIP):     Latency<30ms  Jitter<5ms   Loss<0.1%
  Gold (Video):        Latency<50ms  Jitter<10ms  Loss<0.5%
  Silver (Business):   Latency<100ms Jitter<20ms  Loss<1.0%
  Bronze (Best-effort): No requirements
```

> **Key Insight:** Unlike traditional WAN where static routes or OSPF determine paths based solely on link cost metrics, SD-WAN evaluates **real-time application requirements against live path telemetry**. This means the same application’s traffic might take different paths at different times of day as link conditions change.

### SD-WAN vs MPLS: Detailed Comparison

| Feature | Traditional MPLS | SD-WAN |
|---------|-----------------|--------|
| **Monthly cost (100 Mbps)** | $1,500-3,000 | $200-500 (broadband) |
| **Provisioning time** | 30-90 days | 1-7 days |
| **SLA guarantee** | Yes (99.99% typical) | Depends on underlay |
| **QoS** | Provider-managed (6 classes typical) | Application-aware (unlimited policies) |
| **Encryption** | Optional (not default) | Always encrypted (IPsec) |
| **Path selection** | Static (provider-managed) | Dynamic (real-time) |
| **Cloud access** | Backhaul through hub | Direct internet breakout |
| **Visibility** | Limited (provider dashboard) | Full (application-level analytics) |
| **Redundancy** | Active/standby | Active/active |
| **Management** | Provider-managed | Self-managed or co-managed |
| **Best for** | Guaranteed SLA, legacy apps | Cloud apps, cost savings, agility |

> **Exam Tip:** SD-WAN does **not** guarantee SLA the way MPLS does because the underlying broadband circuits are best-effort. Many organizations use a **hybrid approach**—keeping MPLS for mission-critical applications while routing cloud and internet traffic over broadband via SD-WAN.

---

## SD-WAN Features

### 1. Dynamic Path Selection

**Automatically choose best path:**
- Monitors link quality (latency, jitter, packet loss)
- Routes traffic based on current conditions

**Example:**
- MPLS: 30 ms latency
- Broadband: 15 ms latency
- SD-WAN routes VoIP over broadband (lower latency)

### 2. Link Bonding

**Combine multiple links for higher bandwidth:**
- 100 Mbps cable + 100 Mbps cable = 200 Mbps total
- Packets split across links

### 3. Application QoS

**Prioritize critical applications:**
- VoIP: Highest priority (low latency)
- Video conferencing: High priority
- File downloads: Low priority

### 4. Direct Internet Breakout

**Local internet breakout:**
- Cloud apps (Office 365, Salesforce) go directly to internet
- Don't backhaul through HQ (lower latency, less bandwidth)

### 5. WAN Optimization

**Built-in optimization:**
- Data deduplication
- Compression
- Caching

**Reduces bandwidth usage.**

### 6. Security

**Integrated security features:**
- Firewall (stateful inspection)
- IPS (Intrusion Prevention System)
- Antivirus
- Web filtering
- Encryption (IPsec, SSL/TLS)

**Unified Threat Management (UTM)** in single appliance.

### 7. Zero-Touch Provisioning

**Automated deployment:**
1. Appliance shipped to branch
2. Plug in WAN connections, power
3. Appliance contacts controller (via internet)
4. Controller pushes configuration
5. Site online (no IT staff needed on-site)

### 8. Forward Error Correction (FEC)

Advanced SD-WAN solutions include **FEC** to handle packet loss without retransmission:

```
Forward Error Correction:

  Without FEC (standard TCP):
    Sender: A B C D E
    Link drops packet C
    Receiver: A B _ D E
    → Must request retransmission of C (adds 1 RTT delay)

  With FEC (SD-WAN):
    Sender: A B C D E [parity]
    Link drops packet C
    Receiver: A B _ D E [parity]
    → Reconstructs C from parity data (no retransmission needed)
    → Zero additional latency
```

FEC adds ~10-20% bandwidth overhead but eliminates the latency penalty of retransmissions—critical for real-time applications over lossy broadband links.

### 9. Packet Duplication

For ultra-critical applications (e.g., emergency services, trading platforms), SD-WAN can **duplicate packets across multiple paths simultaneously**:

```
Packet Duplication:
  VoIP packet #1 sent on MPLS AND Broadband simultaneously
  Receiver accepts whichever arrives first, discards duplicate
  → Survives loss on either path without any degradation
  → Uses 2x bandwidth (only for critical traffic)
```

> **Key Insight:** FEC and packet duplication are differentiating features among SD-WAN vendors. On the exam, understand that SD-WAN goes beyond simple failover—it can **proactively compensate** for link impairments using these techniques.

---

## SD-WAN Benefits

### Cost Savings

✅ **Replace expensive MPLS with broadband:**
- MPLS: $500-2000/month
- Broadband: $50-200/month
- Savings: 60-90%

✅ **Reduced hardware:**
- Single SD-WAN appliance replaces multiple devices (router, firewall, WAN optimizer)

### Improved Performance

✅ **Active/active links:**
- Use all bandwidth simultaneously

✅ **Application-aware routing:**
- Route traffic over best path (latency, jitter)

✅ **Direct internet breakout:**
- Cloud apps don't backhaul through HQ (faster)

### Agility

✅ **Fast provisioning:**
- New site online in days (vs. weeks/months for MPLS)

✅ **Easy to scale:**
- Add bandwidth quickly (order broadband circuit)

✅ **Centralized management:**
- Configure all sites from controller (no manual router config)

### Reliability

✅ **Multi-path:**
- Automatic failover if link fails or degrades

✅ **Active monitoring:**
- Continuously measures link quality

---

## SD-WAN Deployment Models

### 1. MPLS + Broadband Hybrid

**Primary:** MPLS (guaranteed SLA)
**Secondary:** Broadband (cost-effective)

**Use case:**
- Transition from MPLS to SD-WAN
- Keep MPLS for critical apps

### 2. Broadband-Only

**No MPLS:**
- Multiple broadband circuits (cable, DSL, fiber)
- SD-WAN provides reliability via multiple paths

**Use case:**
- Cost-sensitive deployments
- Small branches

### 3. Broadband + LTE

**Primary:** Broadband
**Backup:** LTE/5G (cellular)

**Use case:**
- Ensure uptime (diverse transport)
- LTE as emergency backup

### 4. Cloud-Delivered SD-WAN (SaaS)

**Managed SD-WAN service:**
- Provider hosts controller
- Provides appliances
- Manages network

**Examples:**
- Cato Networks (SASE platform)
- Cisco Meraki SD-WAN

**Use case:**
- No in-house SD-WAN expertise
- Prefer managed service

---

## SD-WAN Use Cases

### 1. Branch Office Connectivity

**Replace MPLS with broadband:**
- 50+ branch offices
- Each has cable internet (low cost)
- SD-WAN creates secure overlay

**Benefits:**
- 70% cost reduction
- Improved performance for cloud apps

### 2. Cloud Connectivity

**Optimize access to SaaS apps:**
- Office 365, Salesforce, AWS
- Direct internet breakout (local)
- No backhauling through HQ

**Benefits:**
- Lower latency
- Better user experience

### 3. Retail Stores

**POS, inventory, guest Wi-Fi:**
- Multiple WAN links (broadband + LTE backup)
- Automatic failover (no downtime during checkout)

**Benefits:**
- High availability
- Cost-effective

### 4. Mergers & Acquisitions

**Quickly integrate acquired company:**
- Deploy SD-WAN at acquired sites
- Connect to corporate network (days, not months)

**Benefits:**
- Fast integration
- No MPLS lead times

---

## SD-WAN Vendors

### Major Vendors

**Cisco (Viptela/Meraki SD-WAN):**
- Enterprise focus
- Cloud-managed (Meraki)
- On-prem controller (Viptela)

**VMware (VeloCloud):**
- Cloud-delivered SD-WAN
- Strong for multi-cloud

**Fortinet (FortiGate SD-WAN):**
- Integrated security (UTM)
- SD-WAN + firewall

**Palo Alto Networks (Prisma SD-WAN):**
- Security-first approach
- SASE integration

**Silver Peak (HPE Aruba):**
- WAN optimization focus

**Cato Networks:**
- Cloud-native SASE platform
- Fully managed

---

## SD-WAN and SASE

### What is SASE?

**SASE (Secure Access Service Edge):**
- Convergence of SD-WAN and network security
- Cloud-delivered service
- Combines: SD-WAN, firewall, CASB, SWG, ZTNA

**SASE = SD-WAN + Security (cloud-based)**

### SASE Architecture

```
Branch Office         Cloud SASE PoP         SaaS Apps
┌─────────┐          ┌──────────┐          ┌─────────┐
│ SD-WAN  │──────────│ Firewall │──────────│ Office  │
│ Edge    │          │ CASB     │          │  365    │
└─────────┘          │ SWG      │          └─────────┘
                     │ ZTNA     │
                     └──────────┘
```

**Benefits:**
- Consolidated security and networking
- Cloud-delivered (no hardware)
- Global PoPs (low latency)

---

## SD-WAN Considerations

### Limitations

❌ **Broadband not guaranteed:**
- No SLA like MPLS
- Variable performance (shared medium)

❌ **Security:**
- Must encrypt traffic over broadband (built into SD-WAN)

❌ **Complexity:**
- Requires planning (policies, QoS)
- Training for IT staff

### When MPLS Still Makes Sense

**Use MPLS for:**
- Mission-critical apps (guaranteed SLA)
- Voice traffic (consistent QoS)
- Hybrid approach (MPLS + broadband)

**SD-WAN doesn't eliminate MPLS, but reduces reliance**

---

## SD-WAN Troubleshooting and Monitoring

### Key Metrics to Monitor

SD-WAN provides rich telemetry that network administrators should actively monitor:

```
SD-WAN Dashboard Metrics:

  Per-Link Health:
    MPLS:      ██████████ 100% healthy
               Latency: 12ms  Jitter: 1ms  Loss: 0%
    Broadband: ████████░░  82% healthy
               Latency: 28ms  Jitter: 9ms  Loss: 0.2%
    LTE:       ██████░░░░  65% healthy
               Latency: 42ms  Jitter: 15ms Loss: 0.8%

  Top Applications by Bandwidth:
    1. Microsoft 365:    45 Mbps  (Broadband - direct breakout)
    2. SAP ERP:          12 Mbps  (MPLS)
    3. Video conferencing: 8 Mbps  (MPLS)
    4. Web browsing:      5 Mbps  (Broadband)
    5. Backup/replication: 3 Mbps  (Broadband)
```

### Common SD-WAN Issues and Resolution

| Issue | Symptom | Resolution |
|-------|---------|------------|
| **Tunnel flapping** | Frequent up/down on overlay tunnels | Check underlay stability; adjust tunnel keepalive timers |
| **Asymmetric routing** | Outbound on MPLS, return on broadband | Verify SD-WAN policy symmetry; check NAT/firewall rules |
| **Application misclassification** | Wrong path for critical app | Update DPI signatures; add manual application definitions |
| **Brown-out** | Link up but degraded (high loss/jitter) | SD-WAN should auto-steer; verify SLA thresholds |
| **MTU issues** | Fragmentation, slow speeds | Adjust tunnel MTU (typically 1400-1450 bytes with IPsec) |
| **DNS resolution** | Direct breakout fails for SaaS | Configure DNS to resolve to nearest cloud PoP |

### SD-WAN Design Best Practices

**1. Transport diversity:**
- Use at least two different transport types (e.g., MPLS + broadband or broadband + LTE)
- Ensure circuits don’t share the same last-mile provider or physical path

**2. Bandwidth sizing:**
```
Branch sizing example (50 users):

  Application bandwidth requirements:
    VoIP:           50 users × 100 Kbps = 5 Mbps
    Video conf:     10 concurrent × 2 Mbps = 20 Mbps
    Microsoft 365:  50 users × 500 Kbps = 25 Mbps
    General web:    50 users × 200 Kbps = 10 Mbps
    ERP/business:   constant 5 Mbps
                    ________________________
    Total:          65 Mbps peak demand

  Recommended circuits:
    Primary:   100 Mbps broadband (fiber)
    Secondary: 50 Mbps broadband (cable, different ISP)
    Backup:    LTE/5G (10-50 Mbps, metered)
```

**3. Security integration:**
- Enable IPsec on all overlay tunnels (AES-256 recommended)
- Use SASE or cloud-based security for direct internet breakout
- Implement micro-segmentation for IoT/guest traffic

**4. Gradual migration:**
- Don’t remove MPLS immediately
- Run hybrid (MPLS + broadband) during transition
- Monitor application performance for 90+ days before removing MPLS

> **Key Insight:** The most common SD-WAN deployment mistake is underestimating the importance of **DNS configuration** for direct internet breakout. If branch DNS still points to headquarter’s DNS servers, SaaS applications may resolve to far-away cloud instances, negating the latency benefits of local breakout.

---

## Summary

1. **SD-WAN** uses software to intelligently route traffic across multiple WAN connections (MPLS, broadband, LTE)
2. **Application-aware routing** identifies apps and routes based on policies (priority, path selection)
3. **Active/active links** use all WAN connections simultaneously (not active/standby)
4. **Direct internet breakout** sends cloud traffic directly to internet (not backhauled through HQ)
5. **Zero-touch provisioning** enables rapid deployment (plug in appliance, auto-configures from controller)
6. **SD-WAN benefits**: Cost savings (60-90% vs MPLS), improved performance, fast provisioning, centralized management
7. **Overlay network** creates encrypted tunnels over any underlay (MPLS, broadband, LTE)
8. **SD-WAN components**: Edge devices at branches, controller for management, orchestrator for GUI/API
9. **SASE** combines SD-WAN with cloud-delivered security (firewall, CASB, SWG, ZTNA)
10. **SD-WAN vendors**: Cisco, VMware, Fortinet, Palo Alto, Cato Networks, Silver Peak

---

## Practice Questions

**Q1.** What is the PRIMARY benefit of SD-WAN compared to traditional MPLS WAN?

A) Better encryption
B) Significant cost savings (60-90%) while maintaining application performance
C) Higher maximum bandwidth
D) Simpler physical installation

<details>
<summary>Answer</summary>

**B)** SD-WAN can reduce WAN costs by 60-90% compared to MPLS by using cheaper broadband and LTE connections while using software-defined intelligence to maintain application performance.
</details>

**Q2.** In SD-WAN architecture, what is the function of the overlay network?

A) It provides the physical WAN connections
B) It creates encrypted tunnels over any underlay transport (MPLS, broadband, LTE)
C) It replaces the need for routers
D) It manages IP address allocation

<details>
<summary>Answer</summary>

**B)** The SD-WAN overlay creates encrypted tunnels that run over any available underlay transport (MPLS, broadband internet, LTE). This abstracts the underlying network and provides consistent connectivity.
</details>

**Q3.** Which SD-WAN feature allows traffic to be routed based on application type and real-time path quality?

A) Static routing
B) Application-aware routing
C) OSPF
D) DNS load balancing

<details>
<summary>Answer</summary>

**B)** Application-aware routing identifies applications (e.g., voice, video, web) and dynamically routes them over the best available path based on real-time metrics like latency, jitter, and packet loss.
</details>

**Q4.** What does zero-touch provisioning (ZTP) enable in SD-WAN deployments?

A) Eliminating the need for WAN connections
B) Automatic configuration of branch devices without on-site IT staff
C) Removing the need for encryption
D) Disabling all security features

<details>
<summary>Answer</summary>

**B)** Zero-touch provisioning allows SD-WAN edge devices to be shipped to branch offices and automatically configure themselves by connecting to the central controller, eliminating the need for skilled IT staff on-site.
</details>

**Q5.** How does SD-WAN handle multiple WAN connections differently from traditional WAN?

A) SD-WAN uses only one connection at a time
B) SD-WAN uses active/active across all WAN links simultaneously
C) SD-WAN requires MPLS on all links
D) SD-WAN does not support multiple connections

<details>
<summary>Answer</summary>

**B)** SD-WAN uses all available WAN connections in active/active mode simultaneously, unlike traditional WAN which often uses active/standby. This maximizes bandwidth utilization across all links.
</details>

**Q6.** What is SASE (Secure Access Service Edge) in relation to SD-WAN?

A) A competing technology to SD-WAN
B) A combination of SD-WAN with cloud-delivered security services (firewall, CASB, SWG, ZTNA)
C) A type of MPLS service
D) A wireless access technology

<details>
<summary>Answer</summary>

**B)** SASE combines SD-WAN networking capabilities with cloud-delivered security services including firewall-as-a-service, Cloud Access Security Broker (CASB), Secure Web Gateway (SWG), and Zero Trust Network Access (ZTNA).
</details>

**Q7.** What is the role of the SD-WAN controller in the architecture?

A) It forwards data packets between branches
B) It provides centralized management, policy configuration, and orchestration
C) It replaces the internet connection
D) It provides DNS services

<details>
<summary>Answer</summary>

**B)** The SD-WAN controller provides centralized management for all edge devices, enabling administrators to configure policies, monitor performance, and orchestrate the entire WAN from a single interface.
</details>

**Q8.** Which feature of SD-WAN sends cloud-destined traffic directly to the internet from the branch rather than backhauling it through headquarters?

A) Full tunnel VPN
B) Direct internet breakout
C) MPLS forwarding
D) Traffic shaping

<details>
<summary>Answer</summary>

**B)** Direct internet breakout (also called local internet breakout) sends cloud and SaaS traffic directly to the internet from the branch office, avoiding the latency and bandwidth waste of backhauling through the headquarters datacenter.
</details>

**Q9.** Which of the following is a component of the SD-WAN underlay?

A) Encrypted tunnels
B) Application-aware policies
C) Physical WAN transports such as MPLS, broadband, and LTE
D) The SD-WAN controller

<details>
<summary>Answer</summary>

**C)** The underlay consists of the physical WAN transport links (MPLS, broadband internet, LTE/5G) that carry the SD-WAN overlay tunnels. SD-WAN is transport-agnostic and can use any combination of underlay connections.
</details>

**Q10.** An SD-WAN solution detects that a broadband link's jitter has exceeded the acceptable threshold for VoIP traffic. What action does the SD-WAN appliance take?

A) Drops all VoIP packets until the link recovers
B) Dynamically reroutes VoIP traffic to an alternate path that meets the application's SLA requirements
C) Increases the bandwidth of the degraded link
D) Disables QoS policies for all applications

<details>
<summary>Answer</summary>

**B)** SD-WAN continuously monitors link metrics (latency, jitter, packet loss) and compares them against defined SLA thresholds for each application. When a link degrades below the required SLA for an application like VoIP, SD-WAN dynamically reroutes that traffic to an alternate path (e.g., MPLS or LTE) that meets the performance requirements—without dropping calls or requiring manual intervention.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 1.2:** Software-Defined WAN
- Gartner: SD-WAN Magic Quadrant
- Cisco SD-WAN Documentation
- VMware VeloCloud Architecture Guide
- Professor Messer: Network+ N10-009 - SD-WAN

---

**Next Lesson:** Lesson 76 - Network Troubleshooting Methodology
