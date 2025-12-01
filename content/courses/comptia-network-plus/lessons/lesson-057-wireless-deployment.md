---
id: lesson-057-wireless-deployment
title: "Wireless Deployment and Site Surveys"
chapterId: "chapter-006-wireless-networking"
order: 57
duration: 16
objectives:
  - Understand wireless site survey types and processes
  - Plan wireless channel allocation and power settings
  - Identify optimal AP placement strategies
  - Understand capacity planning and density considerations
  - Configure wireless controllers and roaming
---

# Wireless Deployment and Site Surveys

Deploying a wireless network requires careful planning to ensure optimal coverage, capacity, and performance. **Site surveys** and proper planning are essential for successful wireless implementations.

---

## Wireless Site Surveys

### What is a Site Survey?

**Site survey** is the process of evaluating a location to determine the optimal placement, configuration, and number of access points needed for wireless coverage.

**Goals**:
- Identify optimal AP locations
- Determine required AP quantity
- Measure signal strength and coverage
- Identify sources of interference
- Plan channel allocation
- Document RF environment

### Types of Site Surveys

**1. Passive Survey**:
- **Listen-only** mode (no transmission)
- Measure existing RF environment
- Detect interferers, noise, other networks
- Analyze signal strength from existing APs
- **Tools**: Wi-Fi analyzer, spectrum analyzer

**2. Active Survey**:
- **Connect and transmit** to test APs
- Measure throughput, latency, packet loss
- Test client experience (roaming, connectivity)
- Verify authentication and DHCP
- **Most comprehensive**

**3. Predictive Survey** (Pre-deployment):
- **Software-based modeling** before installation
- Import floor plans
- Add walls, materials, AP locations
- Predict coverage and capacity
- **Tools**: Ekahau, AirMagnet Planner
- **Limitation**: Less accurate than physical surveys

### Site Survey Process

**Step 1: Gather Requirements**:
- Number of users/devices
- Application requirements (bandwidth, latency)
- Coverage area (indoors, outdoors, specific zones)
- Device types (laptops, phones, IoT)
- Security requirements

**Step 2: Physical Inspection**:
- Walk the facility
- Identify obstacles (walls, metal, water)
- Note building materials
- Locate power/Ethernet access
- Identify mounting locations

**Step 3: Conduct RF Survey**:
- Deploy temporary APs or use predictive model
- Measure signal strength (RSSI)
- Test in multiple locations
- Document coverage gaps
- Identify interference sources

**Step 4: Analyze Results**:
- Generate heat maps
- Identify dead zones
- Calculate AP density
- Plan channel allocation

**Step 5: Create Deployment Plan**:
- Final AP locations
- Channel assignments
- Power settings
- Equipment list
- Cable runs

**Step 6: Post-Deployment Validation**:
- Verify coverage matches plan
- Test client connectivity
- Measure throughput
- Document actual performance

---

## Channel Planning

### 2.4 GHz Channel Planning

**Non-Overlapping Channels**: 1, 6, 11 (North America)

**Strategies**:

**1. Honeycomb Pattern** (Enterprise):
- APs on channels 1, 6, 11 in repeating pattern
- Adjacent APs on different channels
- 20-30% overlap for seamless roaming

```
Floor Plan Layout:
   [AP-1]     [AP-6]     [AP-11]
      \       /   \       /   \
       [AP-11]     [AP-1]     [AP-6]
      /   \       /   \       /
   [AP-6]     [AP-11]    [AP-1]
```

**2. Minimize Co-Channel Interference**:
- Same-channel APs far apart
- Use power control to limit overlap
- 19 dB separation between same-channel APs

**3. Single Channel** (Small Deployments):
- Use only channel 6 (center channel)
- Better than random channels
- Simpler management

### 5 GHz Channel Planning

**Many non-overlapping channels** available:

**UNII-1** (36, 40, 44, 48): Indoor, no DFS
**UNII-2A** (52, 56, 60, 64): DFS required
**UNII-2C** (100-144): DFS required
**UNII-3** (149, 153, 157, 161, 165): Indoor/outdoor, no DFS

**Strategies**:
- **Prefer UNII-1 and UNII-3**: No DFS delays
- **Use 20 or 40 MHz**: More channels available
- **80/160 MHz**: Limited to low-density environments
- **Automatic channel selection**: Let controller optimize

### Dynamic Frequency Selection (DFS)

**Purpose**: Avoid radar interference

**DFS Channels**: 52-144 (UNII-2A, UNII-2C)

**Behavior**:
- AP monitors for radar on DFS channels
- If radar detected: **Switch channels immediately**
- **60-second wait** before using new DFS channel
- Can cause brief disconnections

**Best Practice**: 
- Use non-DFS channels (36-48, 149-165) when possible
- Essential for latency-sensitive applications (VoIP, video)

---

## AP Placement Strategies

### Coverage vs Capacity

**Coverage Design**:
- **Goal**: Maximum area covered
- Fewer APs, higher power
- Suitable for low-density environments
- **Target RSSI**: -65 to -70 dBm at edge

**Capacity Design**:
- **Goal**: Maximum client density
- More APs, lower power
- Prevents oversubscription
- **Target**: 25-50 clients per AP (depends on use case)

```
Coverage Design:          Capacity Design:
 [AP]   (large area)      [AP] [AP] [AP]
   \      /  |  \          (many small cells)
    \    /   |   \
   (wide coverage)        (high density)
```

### Indoor AP Placement

**General Guidelines**:

1. **Ceiling Mount**: 
   - 8-12 feet high
   - Provides downward coverage
   - Keeps out of reach

2. **Central Placement**:
   - Center of coverage area
   - Minimize distance to edge users

3. **Avoid Obstacles**:
   - Not above metal ducts or pipes
   - Clear of elevators, stairwells
   - Away from microwaves, refrigerators

4. **Power and Ethernet**:
   - Verify PoE availability
   - Cable run feasibility

5. **Aesthetics**:
   - Consider visual appearance
   - Blend with ceiling/environment

### High-Density Deployments

**Stadiums, auditoriums, conference centers**:

**Requirements**:
- Very high client density (100-1000+ per AP sector)
- Many APs in small area
- Careful channel planning

**Strategies**:

1. **Low Power**:
   - Reduce transmit power to 3-6 dBm
   - Creates small cells
   - More channel reuse

2. **Directional Antennas**:
   - Focus coverage to specific areas
   - Reduce interference

3. **5 GHz Preferred**:
   - More channels available
   - Less congestion

4. **Band Steering**:
   - Push capable clients to 5 GHz
   - Reserve 2.4 GHz for legacy devices

5. **Load Balancing**:
   - Distribute clients across APs
   - Prevent oversubscription

---

## Wireless Controllers

### Centralized vs Autonomous APs

**Autonomous (Standalone) APs**:
- **Independent** configuration per AP
- No central management
- Suitable for small deployments (1-10 APs)
- **Limitations**: Hard to scale, inconsistent config

**Controller-Based (Lightweight) APs**:
- **Centralized management** via wireless controller
- APs are "thin" (minimal intelligence)
- Controller handles config, security, roaming
- **CAPWAP** (Control and Provisioning of Wireless Access Points) tunnel
- Suitable for enterprise (10+ APs)

**Cloud-Managed APs**:
- Management via cloud service
- No on-premises controller needed
- Scalable, automatic updates
- **Examples**: Cisco Meraki, Aruba Central, UniFi Cloud

### Wireless LAN Controller (WLC) Functions

**1. Centralized Configuration**:
- SSIDs, security policies, VLANs
- Consistent settings across all APs
- Push config changes to all APs

**2. RF Management**:
- Automatic channel selection
- Transmit power control
- Rogue AP detection

**3. Client Roaming**:
- Fast handoff between APs
- Maintain session state
- Seamless roaming

**4. Load Balancing**:
- Distribute clients across APs
- Prevent overload

**5. Security**:
- Centralized authentication (RADIUS integration)
- IDS/IPS functions
- Rogue AP containment

**6. Guest Networks**:
- Captive portal
- Guest isolation
- Bandwidth limiting

### CAPWAP Protocol

**Control and Provisioning of Wireless Access Points**:
- **Split-MAC architecture**: Controller and AP share functions
- **Two tunnels**: Control (UDP 5246) and Data (UDP 5247)
- Encrypts traffic between AP and controller
- APs discover controller via DHCP Option 43, DNS, or broadcast

```
   Client
     ↓
   [AP] ──CAPWAP Tunnel──> [Controller] ──> [Network]
   (Radio,              (Authentication,
    Crypto)             Config, Roaming)
```

---

## Roaming and Handoff

### Client Roaming Process

**Roaming** occurs when client moves between APs with same SSID:

**1. Signal Degradation**:
- Client detects weak signal from current AP
- Scans for stronger APs

**2. Reassociation**:
- Client sends reassociation request to new AP
- New AP communicates with controller
- Session state transferred

**3. Handoff**:
- Client switches to new AP
- Encryption keys exchanged
- Traffic resumes

**Target**: <50ms handoff for seamless VoIP/video

### Fast Roaming Protocols

**802.11r (Fast BSS Transition)**:
- Pre-authenticates with neighbor APs
- Reduces handoff time to <50ms
- **Critical for VoIP and real-time apps**

**802.11k (Neighbor Reports)**:
- AP provides list of nearby APs
- Client scans only relevant channels
- Faster roaming decisions

**802.11v (BSS Transition Management)**:
- AP suggests better AP to client
- Load balancing
- Improved roaming

**Best Practice**: Enable 802.11r, k, v for enterprise deployments

---

## Capacity Planning

### Determining AP Quantity

**Factors**:

1. **Client Density**:
   - Office: 15-30 clients per AP
   - Classroom: 30-50 clients per AP
   - Auditorium: 50-100+ clients per AP (high-density AP)

2. **Bandwidth Requirements**:
   - Light use (email, web): 1-2 Mbps per client
   - Medium use (video streaming): 5-10 Mbps per client
   - Heavy use (file transfers): 20+ Mbps per client

3. **AP Capacity**:
   - 802.11n: ~200-300 Mbps real-world (per radio)
   - 802.11ac: ~500-1000 Mbps real-world
   - 802.11ax: ~900-1500 Mbps real-world

**Formula**:
```
APs Needed = (Total Clients × Avg Bandwidth) / (AP Throughput × 0.5)

Example:
100 clients × 5 Mbps = 500 Mbps needed
802.11ac AP: 800 Mbps × 0.5 (efficiency) = 400 Mbps per AP
APs needed: 500 / 400 = 1.25 → 2 APs minimum
```

---

## Summary

**Key Takeaways**:

1. **Site Survey**: Passive (listen), Active (test), Predictive (model)
2. **2.4 GHz Channels**: Use 1, 6, 11 (non-overlapping)
3. **5 GHz Channels**: Many available, prefer UNII-1 and UNII-3 (no DFS)
4. **Coverage Design**: Fewer APs, higher power, lower density
5. **Capacity Design**: More APs, lower power, high density
6. **High-Density**: Low power, 5 GHz, directional antennas
7. **Wireless Controller**: Centralized management, roaming, load balancing
8. **CAPWAP**: Protocol between AP and controller (UDP 5246/5247)
9. **Fast Roaming**: 802.11r/k/v for seamless handoff
10. **Capacity Planning**: 15-50 clients per AP (depends on use case)

**Deployment Checklist**:
- [ ] Conduct site survey (passive and active)
- [ ] Plan channel allocation (avoid overlap)
- [ ] Determine AP quantity (coverage vs capacity)
- [ ] Select AP locations (central, elevated, clear)
- [ ] Configure controller (SSIDs, security, VLANs)
- [ ] Enable fast roaming (802.11r/k/v)
- [ ] Set transmit power appropriately
- [ ] Test post-deployment (validate coverage)
- [ ] Document configuration and RF environment

Proper wireless deployment planning ensures reliable, high-performance Wi-Fi that meets coverage and capacity requirements.
