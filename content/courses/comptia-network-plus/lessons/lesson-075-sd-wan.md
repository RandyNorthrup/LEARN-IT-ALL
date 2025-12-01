---
id: lesson-075-sd-wan
title: "SD-WAN (Software-Defined WAN)"
chapterId: "chapter-008-wan-technologies"
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

**SD-WAN (Software-Defined Wide Area Network)** uses software to intelligently route traffic across multiple WAN connections, replacing expensive MPLS circuits with cost-effective broadband while maintaining performance and security.

This lesson covers SD-WAN fundamentals—important for the CompTIA Network+ N10-008 exam.

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

## Key Takeaways

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

## References

- **CompTIA Network+ N10-008 Objective 1.2:** Software-Defined WAN
- Gartner: SD-WAN Magic Quadrant
- Cisco SD-WAN Documentation
- VMware VeloCloud Architecture Guide
- Professor Messer: Network+ N10-008 - SD-WAN

---

**Next Lesson:** Lesson 76 - Network Troubleshooting Methodology
