---
id: lesson-057-wireless-deployment
title: "Wireless Deployment and Site Surveys"
chapterId: ch6-wireless-networking
order: 57
duration: 70
objectives:
  - Understand wireless site survey types and processes
  - Plan wireless channel allocation and power settings
  - Identify optimal AP placement strategies
  - Understand capacity planning and density considerations
  - Configure wireless controllers and roaming
---

# Lesson 57: Wireless Deployment and Site Surveys

## Introduction

Deploying a wireless network that actually meets user expectations requires far more than purchasing access points and mounting them on ceilings. Successful wireless deployments are **engineered**, not improvised. They begin with understanding the physical environment, continue through careful radio frequency (RF) planning, and conclude with post-deployment validation. The difference between a well-designed WLAN and a poorly designed one is the difference between seamless connectivity and constant help-desk tickets.

This lesson covers the complete wireless deployment lifecycle: site survey methodology (passive, active, and predictive), channel planning for both 2.4 GHz and 5 GHz bands, DFS channel considerations, AP placement strategies for coverage and capacity, cell sizing and overlap requirements, heat map creation, indoor versus outdoor deployment, wireless controller architectures, and roaming mechanisms. Mastery of these concepts is essential for the CompTIA Network+ exam and for any role involving wireless network design.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand wireless site survey types and processes
- Plan wireless channel allocation and power settings
- Identify optimal AP placement strategies
- Understand capacity planning and density considerations
- Configure wireless controllers and roaming

---

## Wireless Site Surveys

### What Is a Site Survey?

A **site survey** is the systematic process of evaluating a physical location to determine optimal AP placement, configuration, and quantity for reliable wireless coverage and performance. It is the foundation of every professional wireless deployment.

**Goals of a Site Survey**:
- Determine optimal AP locations and mounting strategies
- Calculate the required number of APs
- Measure existing RF environment (noise floor, interference sources)
- Identify signal-absorbing obstacles (walls, floors, metal, water)
- Plan channel allocation and transmit power settings
- Document the RF environment for future reference

### Types of Site Surveys

#### 1. Passive Survey

A passive survey operates in **listen-only mode** — the survey device does not transmit or associate with any network. It passively receives all RF signals in the environment.

**What It Measures**:
- Signal strength (RSSI) from existing APs
- Noise floor (background RF energy)
- Signal-to-noise ratio (SNR)
- Channel utilization and overlap
- Interference sources (microwave ovens, Bluetooth, cordless phones, neighboring WLANs)
- Signal propagation through building materials

**When To Use**:
- Pre-deployment assessment of existing RF environment
- Identifying interference sources before installing new APs
- Verifying coverage from existing APs
- Baseline measurements for comparison

**Tools**: Wi-Fi analyzer software (Ekahau Survey, AirMagnet), spectrum analyzer (for non-Wi-Fi interference), laptop with compatible adapter

```
Passive Survey Process:

  Surveyor walks through space with laptop/tablet

  +-----+-----+-----+-----+
  |     |     |     |     |
  | -45 | -52 | -58 | -65 |  <-- RSSI measurements (dBm)
  |     |     |     |     |      at each survey point
  +-----+-----+-----+-----+
  |     |     |     |     |
  | -48 | -50 | -55 | -70 |
  |     |     |     |     |
  +-----+-----+-----+-----+
  |     |     |     |     |
  | -55 | -58 | -63 | -75 |  -75 dBm = weak signal
  |     |     |     |     |      (potential dead zone)
  +-----+-----+-----+-----+

  Software generates heat map from collected data.
```

#### 2. Active Survey

An active survey goes beyond listening — the survey device **associates with the network** and actively transmits/receives data to measure real-world performance.

**What It Measures**:
- Everything in a passive survey, PLUS:
- Actual throughput (upload and download)
- Latency and jitter
- Packet loss rates
- Roaming behavior between APs
- DHCP response times
- Authentication success/failure
- Application-layer performance

**When To Use**:
- Post-deployment validation (verifying design meets requirements)
- Troubleshooting performance complaints
- Validating roaming between APs
- Testing quality of service for latency-sensitive applications (VoIP, video)

**Limitations**: More time-consuming than passive surveys; requires functional network infrastructure.

#### 3. Predictive Survey (Pre-Deployment)

A predictive survey uses **software modeling** to simulate RF propagation in a building before any equipment is installed.

**Process**:
1. Import building floor plans (CAD files, PDF, or image)
2. Define wall types and materials (drywall, concrete, glass, metal) with attenuation values
3. Place virtual APs on the floor plan
4. Software calculates predicted coverage, signal strength, SNR, and channel overlap
5. Iterate: adjust AP locations, power, and channels until design meets requirements

**Tools**: Ekahau AI Pro, Hamina Wireless Planner, AirMagnet Planner

**Wall Attenuation Values (Typical)**:

| Material | Attenuation (2.4 GHz) | Attenuation (5 GHz) |
|----------|----------------------|---------------------|
| Drywall (standard) | 3-5 dB | 4-7 dB |
| Glass (clear) | 2-3 dB | 3-5 dB |
| Glass (tinted/Low-E) | 6-8 dB | 8-12 dB |
| Wood door | 3-4 dB | 4-6 dB |
| Concrete block | 10-15 dB | 15-25 dB |
| Brick | 8-12 dB | 12-20 dB |
| Metal (elevator, filing cabinet) | 15-25 dB | 20-30+ dB |
| Floor/ceiling (concrete) | 12-18 dB | 18-25 dB |
| Water (fish tanks, human bodies) | 6-15 dB | 10-20 dB |

**Advantages**: Cost-effective, fast iteration, no physical installation needed during design phase.
**Limitations**: Less accurate than physical surveys; does not account for transient interference (microwaves, neighboring networks), temporal RF changes, or building material variations.

### Survey Equipment and Tools

| Tool | Purpose | Survey Type |
|------|---------|-------------|
| Wi-Fi survey software (Ekahau, AirMagnet) | RSSI measurement, heat map generation | Passive/Active |
| Spectrum analyzer (Wi-Spy, AirMagnet Spectrum) | Non-Wi-Fi interference detection | Passive |
| Survey-grade Wi-Fi adapter | Consistent, calibrated RF measurements | Passive/Active |
| GPS (outdoor) | Geo-reference measurement points | Outdoor surveys |
| Tablet/laptop with floor plan | Walk-and-tap survey point collection | All |
| Temporary APs (on tripods) | Simulate planned AP locations | Active |
| Measuring wheel/laser | Accurate distance measurement | All |
| PoE injector + battery pack | Power temporary APs without infrastructure | Active |

### Site Survey Process (Six Steps)

```
Complete Site Survey Workflow:

  +------------------+     +------------------+     +------------------+
  | Step 1:          |     | Step 2:          |     | Step 3:          |
  | Gather           | --> | Physical         | --> | Conduct RF       |
  | Requirements     |     | Inspection       |     | Survey           |
  +------------------+     +------------------+     +------------------+
         |                        |                        |
  - # of users/devices     - Walk facility          - Deploy temp APs
  - App requirements       - Note obstacles           (or predictive)
  - Coverage areas         - Building materials     - Measure RSSI
  - Device types           - Power/Ethernet access  - Identify dead zones
  - Security needs         - Mounting locations     - Find interference
         |                        |                        |
         v                        v                        v
  +------------------+     +------------------+     +------------------+
  | Step 4:          |     | Step 5:          |     | Step 6:          |
  | Analyze          | --> | Create Deploy    | --> | Post-Deploy      |
  | Results          |     | Plan             |     | Validation       |
  +------------------+     +------------------+     +------------------+
         |                        |                        |
  - Generate heat maps     - Final AP locations      - Verify coverage
  - Identify gaps          - Channel assignments     - Test throughput
  - Calculate AP density   - Power settings          - Validate roaming
  - Plan channels          - Equipment/cable list    - Document results
```

**Step 1 — Gather Requirements**:
Requirements drive every subsequent decision. Key questions:
- How many concurrent users/devices per area?
- What applications will run? (email = low bandwidth; video conferencing = high bandwidth, low latency)
- What is the minimum acceptable RSSI at cell edge? (typically -65 to -70 dBm)
- What minimum SNR is required? (typically 25+ dB for data, 30+ dB for VoIP)
- Are there specific compliance requirements (healthcare, PCI, education)?

**Step 2 — Physical Inspection**:
Walk the facility and document:
- Wall materials and thicknesses (concrete vs. drywall matters enormously)
- Metal obstacles (elevator shafts, filing cabinets, industrial equipment)
- Ceiling height and type (drop ceiling, open ceiling, metal grid)
- Existing Ethernet and power locations (for AP installation)
- Potential mounting points (consider aesthetics and physical security)
- Sources of RF interference (microwave ovens, wireless cameras, industrial equipment)

**Step 3 — Conduct RF Survey**:
Perform passive survey of existing RF environment, then either a predictive model or active survey with temporary APs placed at planned locations.

**Step 4 — Analyze Results**:
Generate heat maps showing signal strength, SNR, and channel utilization. Identify dead zones, areas of co-channel interference, and coverage gaps.

**Step 5 — Create Deployment Plan**:
Document final AP locations, channel assignments, power settings, antenna types, cable routing, and equipment list. This becomes the installation blueprint.

**Step 6 — Post-Deployment Validation**:
After installation, conduct an active survey to verify that the production network meets the original requirements. This catches installation errors, unexpected interference, and design oversights.

---

## Channel Planning

### 2.4 GHz Channel Plan

The 2.4 GHz band (2.400-2.4835 GHz) provides **14 channels** worldwide (channels 1-11 in North America, 1-13 in Europe/most countries, 1-14 in Japan). Each channel is 22 MHz wide with 5 MHz spacing, causing significant overlap between adjacent channels.

**Non-Overlapping Channels**: Only **3 channels** are fully non-overlapping in North America: **1, 6, and 11**.

```
2.4 GHz Channel Overlap (North America):

  Channel:  1    2    3    4    5    6    7    8    9   10   11
  
  Ch 1:   |===========|
  Ch 2:        |===========|
  Ch 3:             |===========|
  Ch 4:                  |===========|
  Ch 5:                       |===========|
  Ch 6:                            |===========|
  Ch 7:                                 |===========|
  Ch 8:                                      |===========|
  Ch 9:                                           |===========|
  Ch 10:                                               |===========|
  Ch 11:                                                    |===========|

  |----|----|----|----|----|----|----|----|----|----|----|
  2.401     2.411     2.421     2.431     2.441     2.451  (GHz)
  
  Non-overlapping set: Ch 1 (2.412), Ch 6 (2.437), Ch 11 (2.462)
  These three channels have ZERO spectral overlap.
```

**Honeycomb Channel Assignment Pattern**:

In multi-AP deployments, APs are assigned channels 1, 6, and 11 in a repeating honeycomb pattern so that **no two adjacent APs share the same channel**:

```
Honeycomb Pattern (Floor Plan View):

      [AP]         [AP]         [AP]
      Ch 1         Ch 6         Ch 11
        \         / | \         / |
         \       /  |  \       /  |
          \     /   |   \     /   |
      [AP]         [AP]         [AP]
      Ch 11        Ch 1         Ch 6
        |         / | \         / 
        |        /  |  \       /  
        |       /   |   \     /   
      [AP]         [AP]         [AP]
      Ch 6         Ch 11        Ch 1

  Rule: No two adjacent cells use the same channel.
  This minimizes co-channel interference (CCI).
```

**2.4 GHz Design Constraints**:
- Only 3 non-overlapping channels severely limits high-density deployments
- Long range means APs interfere with each other across large distances
- Susceptible to interference from non-Wi-Fi devices (microwave, Bluetooth, Zigbee)
- **Best practice**: Use 2.4 GHz only for legacy devices and IoT; steer modern clients to 5 GHz or 6 GHz

### 5 GHz Channel Plan

The 5 GHz band provides **significantly more channels** than 2.4 GHz, making it the preferred band for enterprise deployments.

**5 GHz Band Segments (FCC / North America)**:

| Band Segment | Channel Numbers | Frequency Range | DFS Required | Indoor/Outdoor |
|-------------|----------------|-----------------|--------------|----------------|
| UNII-1 | 36, 40, 44, 48 | 5.150-5.250 GHz | No | Indoor only* |
| UNII-2A | 52, 56, 60, 64 | 5.250-5.350 GHz | Yes | Indoor only |
| UNII-2C (Extended) | 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144 | 5.470-5.725 GHz | Yes | Indoor/Outdoor |
| UNII-3 | 149, 153, 157, 161, 165 | 5.725-5.850 GHz | No | Indoor/Outdoor |

*Recent FCC rules allow UNII-1 outdoor use under certain conditions.

**Total non-overlapping 20 MHz channels**: Up to **25** (vs. only 3 in 2.4 GHz)

**Channel Width and Available Channels**:

| Channel Width | Available Channels (all bands) | Typical Use |
|--------------|-------------------------------|-------------|
| 20 MHz | 25 channels | High-density deployments |
| 40 MHz | 12 channel pairs | Medium-density |
| 80 MHz | 6 channel groups | Standard enterprise |
| 160 MHz | 2-3 channel groups | Low-density, high-throughput |

> **Key Trade-off**: Wider channels provide higher speeds but fewer available channels, increasing co-channel interference in multi-AP deployments. **High-density environments should use 20 or 40 MHz channels** to maximize channel reuse.

### DFS Channels and Radar Detection

**Dynamic Frequency Selection (DFS)** is required on channels where Wi-Fi shares spectrum with radar systems (primarily weather and military radar).

**DFS Channels**: 52-64 (UNII-2A) and 100-144 (UNII-2C)

**DFS Behavior**:

```
DFS Operation Timeline:

  AP wants to use Ch 100 (DFS channel)
  
  +-- CAC Period (60 sec) --+---------- Normal Operation ----------+
  |                         |                                       |
  | AP listens for radar    | AP operates normally on channel       |
  | (Channel Availability   | Continuously monitors for radar      |
  |  Check)                 |                                       |
  | NO TRANSMISSION         |                                       |
  | during this period      |                                       |
  +-------------------------+---------------------------------------+
                                       |
                            Radar detected!
                                       |
                                       v
                            +---------------------+
                            | AP immediately       |
                            | vacates channel       |
                            | (within 200 ms)       |
                            | Moves to non-DFS      |
                            | channel               |
                            +---------------------+
                                       |
                                       v
                            +---------------------+
                            | Non-Occupancy Period  |
                            | (30 minutes)          |
                            | Cannot return to      |
                            | DFS channel           |
                            +---------------------+
```

**DFS Impact on Operations**:
- **60-second CAC delay** before the AP can transmit on a DFS channel (after boot or channel change)
- **Immediate channel evacuation** when radar is detected — causes client disconnections
- **30-minute non-occupancy period** before the AP can return to the vacated channel
- Some clients poorly support DFS channels (older devices may not scan DFS channels)

**DFS Best Practices**:
- **Avoid DFS channels for latency-sensitive applications** (VoIP, real-time video)
- Prefer UNII-1 (36-48) and UNII-3 (149-165) for critical applications
- DFS channels are excellent for additional capacity in data-only deployments
- Use a wireless controller with automatic DFS channel management
- Near airports or military bases, DFS channels may be frequently evacuated

---

## AP Placement Strategies

### Coverage Design vs. Capacity Design

These two design philosophies address fundamentally different requirements:

```
Coverage Design:                     Capacity Design:

     +----------------------------+       +----------------------------+
     |                            |       |                            |
     |                            |       |  [AP]   [AP]   [AP]   [AP]|
     |         [AP]               |       |                            |
     |                            |       |  [AP]   [AP]   [AP]   [AP]|
     |                            |       |                            |
     |                            |       |  [AP]   [AP]   [AP]   [AP]|
     |         [AP]               |       |                            |
     |                            |       |  [AP]   [AP]   [AP]   [AP]|
     |                            |       |                            |
     +----------------------------+       +----------------------------+
     
     Fewer APs, higher power              Many APs, lower power
     Larger cells, fewer channels          Smaller cells, more channel reuse
     Goal: Cover maximum area              Goal: Serve maximum clients
     Target: warehouse, basic office       Target: auditorium, stadium
```

| Attribute | Coverage Design | Capacity Design |
|-----------|----------------|-----------------|
| Number of APs | Fewer | Many |
| Transmit Power | Higher (15-20 dBm) | Lower (5-10 dBm) |
| Cell Size | Large | Small |
| Clients per AP | More (can overload) | Fewer (better per-client performance) |
| Channel Reuse | Limited | Extensive |
| Target RSSI at Edge | -65 to -70 dBm | -60 to -67 dBm |
| Target SNR | 20+ dB | 25+ dB |
| Cost | Lower | Higher |
| Use Cases | Warehouses, hallways | Lecture halls, stadiums, offices |

### Cell Sizing and Overlap

**Cell overlap** between adjacent APs is essential for seamless roaming. The standard recommendation is **15-20% overlap** between adjacent cells.

```
AP Cell Overlap (Side View):

  AP 1 Coverage              AP 2 Coverage
  +-----------+              +-----------+
  |           |              |           |
  |           |    15-20%    |           |
  |     *     |<-- Overlap ->|     *     |
  |   (AP1)   |    Region   |   (AP2)   |
  |           |              |           |
  +-----------+              +-----------+
              |              |
              +-- Overlap ---+
              
  In the overlap zone:
  - Client receives strong signal from BOTH APs
  - Client can roam without dropping connection
  - Both APs should be on DIFFERENT channels

  Too little overlap (<10%): Coverage gaps, dropped connections during roaming
  Too much overlap (>30%): Wasted resources, increased co-channel interference
```

**RSSI Thresholds for Different Applications**:

| Application | Minimum RSSI | Minimum SNR | Notes |
|-------------|-------------|-------------|-------|
| Basic web/email | -70 dBm | 20 dB | Tolerates moderate signal |
| Video streaming | -67 dBm | 25 dB | Needs consistent throughput |
| VoIP / video conferencing | -65 dBm | 25 dB | Sensitive to packet loss, jitter |
| High-density / real-time | -60 dBm | 30 dB | Maximum performance |
| Location services | -67 dBm from 3+ APs | 20 dB | Triangulation requires multiple APs |

### Indoor AP Placement Guidelines

**General Rules**:

1. **Ceiling Mount at 2.5-3.5 meters (8-12 feet)**
   - Provides optimal downward radiation pattern
   - Above head height; clear of furniture and people
   - Protected from accidental damage and tampering

2. **Center of Coverage Area**
   - Maximize distance to the cell edge in all directions
   - Never mount in corners (wastes 75% of omnidirectional coverage)
   - Never mount against exterior walls (wastes 50% of coverage outside building)

3. **Account for Building Materials**

```
Signal Attenuation Through Common Obstacles:

  Strong Signal                                      Weak Signal
  -45 dBm                                           -75 dBm
    |                                                    |
    | [Drywall]  [Glass]  [Concrete]  [Metal Door]      |
    |   -4 dB    -3 dB     -15 dB      -20 dB          |
    |                                                    |
    +---->|---->|----->|-------->|-----------> Dead Zone  |
    
  Design must account for cumulative attenuation.
  Multiple walls compound the signal loss.
```

4. **Avoid RF-Hostile Locations**
   - Not above or near metal ductwork, sprinkler piping, or I-beams
   - Away from elevator shafts (Faraday cage effect)
   - Distant from microwave ovens, wireless cameras, and medical equipment
   - Not in IT closets or electrical rooms

5. **Verify Infrastructure**
   - Ethernet cable path to each AP location (within 100m limit)
   - PoE availability (802.3af: 15.4W, 802.3at: 30W, 802.3bt: 60-90W)
   - Ceiling support strength for AP weight and mounting hardware

### Outdoor AP Deployment

Outdoor deployments present unique challenges not found indoors:

| Challenge | Consideration |
|-----------|---------------|
| Weather | IP67 or higher rating; operating temperature range (-40 to +65C) |
| Lightning | Grounding, surge protection on antenna cables and Ethernet |
| Wind | Secure mounting; wind-load rating for antennas > 1 sq ft |
| Height | Higher is better for coverage; consider maintenance access |
| Theft/Vandalism | Tamper-resistant mounting, locking enclosures |
| Power | PoE over fiber (distances > 100m) or local power with UPS |
| Backhaul | Fiber to outdoor APs, or point-to-point wireless backhaul |

**Outdoor Design Pattern — Campus Coverage**:

```
Outdoor Campus Deployment:

  Building A                                  Building B
  +--------+                                  +--------+
  |        |                                  |        |
  |        |    Courtyard / Quad              |        |
  |  [AP]--|--+                          +--|-[AP]   |
  |        |  |     [Sector AP]          |  |        |
  +--------+  |    /    |    \           |  +--------+
              |   /     |     \          |
              |  / 120d |      \         |
              |         |       |        |
              +---------|-------+--------+
              |  [Sector AP]  [Sector AP]|
              |         |                |
              | Three sectors at 120 deg |
              | provide 360-deg outdoor  |
              | coverage of the quad     |
  
  Building C                                  Building D
  +--------+                                  +--------+
  |        |                                  |        |
```

---

## Heat Map Creation

### What Is a Heat Map?

A **heat map** is a visual representation of wireless signal characteristics overlaid on a floor plan or outdoor map. Colors represent signal strength (or SNR, channel utilization, etc.) at each point.

```
Heat Map Color Legend (RSSI):

  =============================================
  | -30 to -50 dBm  |  GREEN   | Excellent    |
  | -50 to -60 dBm  |  YELLOW  | Good         |
  | -60 to -67 dBm  |  ORANGE  | Acceptable   |
  | -67 to -70 dBm  |  RED     | Marginal     |
  | Below -70 dBm   |  GRAY    | Unusable     |
  =============================================
```

**Types of Heat Maps**:

| Heat Map Type | Shows | Purpose |
|--------------|-------|---------|
| Coverage (RSSI) | Signal strength at each point | Identify dead zones and coverage gaps |
| SNR | Signal-to-noise ratio | Verify adequate SNR for applications |
| Channel Overlap | Co-channel interference areas | Identify channel planning problems |
| Throughput | Actual data rates at each point | Validate real-world performance |
| AP Association | Which AP each area connects to | Verify cell boundaries and load balance |

**Heat Map Best Practices**:
- Walk a consistent survey path covering the entire floor plan
- Take measurements at the same height as typical client devices (desk height, not ceiling height)
- Survey during normal business hours to capture real interference
- Generate separate heat maps for 2.4 GHz and 5 GHz (they will look very different)
- Save baseline heat maps for future comparison after changes

---

## Wireless Controller Architectures

### Three AP Management Models

#### 1. Autonomous (Standalone) APs

Each AP operates independently with its own complete configuration.

- **Configuration**: Per-AP via web interface or CLI
- **Intelligence**: All processing done locally on the AP
- **Scalability**: Impractical beyond 5-10 APs (configuration drift, no central policy)
- **Roaming**: Basic (independent authentication at each AP)
- **Best For**: Home, very small office, or isolated single-AP deployments

#### 2. Controller-Based (Lightweight / Thin) APs

APs are "thin" — they handle only RF operations while a central **Wireless LAN Controller (WLC)** manages configuration, policy, and advanced features.

```
Controller-Based Architecture:

  Clients                    Lightweight APs              WLC
  +------+                   +------+                +----------+
  |Phone | ---802.11--->     | AP 1 |===CAPWAP=====> |          |
  +------+                   +------+                |  Wireless|
  +------+                   +------+                |   LAN    |
  |Laptop| ---802.11--->     | AP 2 |===CAPWAP=====> | Control- |
  +------+                   +------+                |   ler    |
  +------+                   +------+                |          |
  |Tablet| ---802.11--->     | AP 3 |===CAPWAP=====> |          |
  +------+                   +------+                +----------+
                                                          |
                              CAPWAP Tunnel               |
                              Control: UDP 5246           v
                              Data:    UDP 5247     [Network Core]
```

**CAPWAP (Control and Provisioning of Wireless Access Points)**:
- RFC 5415 standard protocol between APs and controller
- **Split-MAC architecture**: RF functions on AP, management on controller
- **Control tunnel (UDP 5246)**: Configuration, firmware, channel/power management
- **Data tunnel (UDP 5247)**: Client data (can be locally switched or centrally switched)
- APs discover the controller via: DHCP Option 43, DNS lookup, broadcast, or static config

**WLC Functions**:

| Function | Description |
|----------|-------------|
| Centralized Configuration | SSIDs, security policies, VLANs pushed to all APs |
| RF Management (RRM) | Automatic channel selection, transmit power control, coverage hole detection |
| Client Roaming | Fast handoff between APs with session state preservation |
| Load Balancing | Distribute clients across APs to prevent overloading |
| Security | RADIUS integration, rogue AP detection, WIPS/WIDS |
| Guest Access | Captive portal, time-limited access, bandwidth throttling |
| Firmware Management | Push firmware updates to all APs simultaneously |
| Reporting/Analytics | Client health, RF quality, usage trends |

#### 3. Cloud-Managed APs

Cloud-managed APs are controlled by a vendor's cloud platform. The AP connects to the cloud for management but handles data locally.

```
Cloud-Managed Architecture:

  Clients              Cloud-Managed APs           Cloud Platform
  +------+              +------+                  +==============+
  |Phone | --802.11-->  | AP 1 |---HTTPS/TLS----> ||  Vendor    ||
  +------+              +------+                  ||  Cloud     ||
  +------+              +------+                  ||  Dashboard ||
  |Laptop| --802.11-->  | AP 2 |---HTTPS/TLS----> || (Meraki,   ||
  +------+              +------+                  ||  Aruba     ||
                                                  ||  Central,  ||
  Data path: LOCAL                                ||  UniFi)    ||
  (data does NOT go through cloud)                +==============+
  
  Management path: CLOUD
  (config, monitoring, firmware via internet)
```

**Advantages**: No on-premises controller hardware, automatic firmware updates, manage sites globally from one dashboard, subscription-based scaling.
**Disadvantages**: Requires internet connectivity for management changes (APs continue operating with last-known config if internet drops), ongoing subscription cost, data privacy considerations.

### Controller Architecture Comparison

| Feature | Autonomous | Controller-Based | Cloud-Managed |
|---------|------------|-----------------|---------------|
| Management | Per-AP | Centralized (WLC) | Centralized (cloud) |
| Scalability | 1-10 APs | 10-10,000+ APs | 10-100,000+ APs |
| Roaming | Basic | Fast (controller-assisted) | Good (cloud-assisted) |
| Initial Cost | Low | High (WLC hardware) | Medium (subscription) |
| Ongoing Cost | Low | Medium (WLC maintenance) | Higher (subscription) |
| Internet Dependency | None | None | Required for management |
| Best For | Home/SOHO | Enterprise campus | Distributed enterprises |
| Examples | Consumer routers | Cisco 9800, Aruba MC | Meraki, Aruba Central |

---

## Roaming Considerations

### Why Roaming Matters

When a client moves between coverage cells, it must **roam** from one AP to another while maintaining its network connection. Poor roaming results in dropped VoIP calls, frozen video, and momentary connectivity loss.

**Roaming Target**: **< 50 ms handoff** for real-time applications (VoIP requires < 150 ms total)

### The Roaming Process

```
Client Roaming Between APs:

  Step 1: Client detects         Step 2: Client scans for
  weakening signal               better AP
  
  [AP 1]         [AP 2]         [AP 1]         [AP 2]
    |  \           /  |            |              / |
    |   \         /   |            |             /  |
    |    *       /    |            |            /   |
    |  Client   /     |            |    *------/    |
    |  RSSI    /      |            |  Scanning     |
    | -72dBm  /       |            |  neighbors    |
    |        / -55dBm |            |               |
  
  Step 3: Client reassociates    Step 4: Traffic resumes
  with new AP                    on new AP
  
  [AP 1]         [AP 2]         [AP 1]         [AP 2]
    |              /  |            |              |  |
    |             /   |            |              |  |
    |            /    |            |              *  |
    |    *------/     |            |           Client|
    | Reassoc  /      |            |            Data |
    | Request         |            |           flows |
```

### Fast Roaming Protocols

Three IEEE amendments work together to enable fast, seamless roaming:

**802.11r (Fast BSS Transition — FT)**:
- **Pre-authenticates** with target AP while still connected to current AP
- Derives PMK-R1 keys for target AP in advance
- Reduces authentication during roaming from ~100-500 ms to **< 50 ms**
- **Critical for VoIP and real-time applications**
- Two modes: Over-the-Air (direct to target AP) and Over-the-DS (via controller)

```
802.11r Fast BSS Transition:

  Without 802.11r:                  With 802.11r:
  
  Client -> AP2: Auth Request       Client -> AP1: FT Action (to AP2)
  AP2 -> RADIUS: Verify             AP1 -> AP2: Pre-auth via controller
  RADIUS -> AP2: Accept             AP2 -> AP1: PMK-R1 ready
  AP2 -> Client: Auth Response      Client -> AP2: Reassociate (fast)
  Client -> AP2: Reassociate        AP2 -> Client: Reassociate Response
  
  Total: 200-500 ms                 Total: 20-50 ms
```

**802.11k (Radio Resource Measurement)**:
- AP provides **neighbor reports** listing nearby APs with their channels and signal info
- Client uses this list to scan **only relevant channels** instead of all channels
- Reduces scanning time from seconds to milliseconds
- Enables faster roaming decisions

**802.11v (BSS Transition Management)**:
- AP can **suggest** a better AP to the client (BSS Transition Request)
- Enables AP-assisted load balancing (steer clients away from overloaded APs)
- Client can accept or decline the suggestion
- AP can also indicate its own planned downtime (maintenance)

**Best Practice**: Enable 802.11r, 802.11k, and 802.11v together for optimal roaming in enterprise deployments.

---

## Capacity Planning

### Determining AP Quantity

Capacity planning ensures each AP can serve its associated clients with adequate bandwidth. The formula considers both coverage and capacity.

**Key Factors**:

| Factor | Considerations |
|--------|---------------|
| Client density | Number of concurrent devices per area |
| Bandwidth per client | Application requirements (1-50+ Mbps each) |
| AP throughput | Real-world capacity of selected AP model |
| Contention overhead | Wi-Fi uses shared medium; typical efficiency is 50-60% |
| Band distribution | How many clients on 2.4 vs. 5 vs. 6 GHz |

**Clients per AP — General Guidelines**:

| Environment | Clients per AP | Rationale |
|-------------|---------------|-----------|
| General office | 25-35 | Mixed use: email, web, VoIP |
| Classroom / training room | 30-45 | Moderate use, many simultaneous |
| Conference room (high-density) | 15-25 | Heavy use, video conferencing |
| Lecture hall / auditorium | 50-100 (high-density AP) | Many clients, custom antenna design |
| Warehouse / retail | 15-30 | IoT + mobile scanners |
| Hospital | 20-30 | Mission-critical, medical devices |

### Capacity Calculation Example

```
Capacity Planning Calculation:

  Scenario: Open office, 200 employees
  
  Requirements:
  - Average 5 Mbps per user (web, email, video calls)
  - 802.11ax APs with ~1,200 Mbps real-world throughput (5 GHz)
  - 50% airtime efficiency
  - Maximum 30 clients per AP
  
  Step 1: Total bandwidth needed
    200 users x 5 Mbps = 1,000 Mbps total
  
  Step 2: Effective AP capacity
    1,200 Mbps x 0.50 (efficiency) = 600 Mbps per AP
  
  Step 3: APs needed (bandwidth-based)
    1,000 / 600 = 1.67 --> 2 APs minimum
  
  Step 4: APs needed (client-count-based)
    200 / 30 = 6.67 --> 7 APs minimum
  
  Step 5: Final answer
    MAX(bandwidth APs, client APs) = MAX(2, 7) = 7 APs
    Add 10-20% for redundancy = 8-9 APs
  
  The CLIENT DENSITY constraint (7 APs) drives the design,
  not the bandwidth constraint (2 APs).
```

### Coverage vs. Capacity — Which Drives the Design?

```
Design Driver Decision:

  +-- Calculate APs for COVERAGE (area / signal strength) --+
  |                                                          |
  |  Result: X APs                                           |
  +----------------------------------------------------------+
                              |
                              v
  +-- Calculate APs for CAPACITY (clients / bandwidth) -----+
  |                                                          |
  |  Result: Y APs                                           |
  +----------------------------------------------------------+
                              |
                              v
  +-- Final AP count = MAX(X, Y) + redundancy (10-20%) -----+
  |                                                          |
  |  If Y >> X: Capacity-driven design (high density)        |
  |  If X >> Y: Coverage-driven design (large area, few users)|
  +----------------------------------------------------------+
```

---

## Coverage Requirements by Application

| Application | Min RSSI | Min SNR | Max Latency | Max Jitter | Notes |
|------------|----------|---------|-------------|-----------|-------|
| Email / Web | -72 dBm | 18 dB | 200 ms | N/A | Very tolerant |
| File Transfer | -67 dBm | 25 dB | 200 ms | N/A | Needs throughput |
| Video Streaming | -65 dBm | 25 dB | 150 ms | 50 ms | Buffered, moderate |
| VoIP | -65 dBm | 25 dB | 100 ms | 30 ms | Real-time, loss-sensitive |
| Video Conferencing | -62 dBm | 28 dB | 100 ms | 30 ms | Bidirectional real-time |
| Wi-Fi Calling | -65 dBm | 25 dB | 80 ms | 30 ms | Seamless roaming critical |
| Location Services | -67 dBm (3+ APs) | 20 dB | N/A | N/A | Triangulation |
| AR/VR | -60 dBm | 30 dB | 20 ms | 10 ms | Ultra-low latency |

---

## Deployment Checklist

A complete wireless deployment follows this structured checklist:

**Pre-Deployment**:
- [ ] Gather requirements (users, devices, applications, coverage area)
- [ ] Conduct physical site inspection
- [ ] Perform predictive survey (software model)
- [ ] Validate critical areas with passive RF survey
- [ ] Document interference sources and building materials
- [ ] Select AP model, antenna type, and controller architecture
- [ ] Calculate AP quantity (coverage AND capacity)
- [ ] Create channel plan (1/6/11 for 2.4; non-DFS preferred for 5 GHz)
- [ ] Design power settings (match AP power to client power)
- [ ] Plan infrastructure (Ethernet runs, PoE switches, mounting hardware)

**Installation**:
- [ ] Mount APs at planned locations (ceiling, 2.5-3.5m height)
- [ ] Connect Ethernet and verify PoE power
- [ ] Configure controller / cloud dashboard (SSIDs, security, VLANs)
- [ ] Set channel assignments and transmit power per AP
- [ ] Enable fast roaming (802.11r/k/v)
- [ ] Configure band steering (push clients to 5 GHz)
- [ ] Set up guest network with VLAN isolation

**Post-Deployment Validation**:
- [ ] Conduct active survey to verify coverage meets requirements
- [ ] Generate heat maps (RSSI, SNR, throughput)
- [ ] Test roaming between all adjacent AP pairs
- [ ] Verify VoIP/video quality during roaming
- [ ] Test client authentication and DHCP
- [ ] Measure actual throughput at cell edges
- [ ] Document final configuration and heat maps

**Ongoing Operations**:
- [ ] Monitor client health and RF quality via controller/cloud dashboard
- [ ] Schedule periodic re-surveys (quarterly or after building changes)
- [ ] Maintain firmware update schedule
- [ ] Review capacity metrics and plan expansion as client count grows
- [ ] Monitor for rogue APs and unauthorized devices

---

## Summary

1. **Site surveys** come in three types: **passive** (listen-only to measure RF environment), **active** (associate and test real performance), and **predictive** (software modeling before installation). All three serve different purposes in the deployment lifecycle.

2. **2.4 GHz has only 3 non-overlapping channels** (1, 6, 11). Use a honeycomb pattern to assign channels so adjacent APs never share the same channel. Reserve 2.4 GHz primarily for legacy and IoT devices.

3. **5 GHz provides up to 25 non-overlapping 20 MHz channels** across UNII-1 through UNII-3. Prefer non-DFS channels (36-48, 149-165) for latency-sensitive applications.

4. **DFS channels** (52-144) share spectrum with radar. APs must perform a 60-second Channel Availability Check before transmitting and must immediately vacate upon radar detection, causing client disruption.

5. **Coverage design** (fewer APs, higher power) maximizes area covered; **capacity design** (more APs, lower power) maximizes client density. The final AP count is the greater of coverage and capacity requirements.

6. **Cell overlap of 15-20%** between adjacent APs ensures seamless roaming without coverage gaps. Too little overlap causes drops; too much wastes resources and increases interference.

7. **Indoor AP placement**: ceiling-mount centrally at 2.5-3.5m, avoid corners and metal obstacles, account for wall attenuation, and verify Ethernet/PoE infrastructure.

8. **Heat maps** visualize signal strength, SNR, and throughput across a floor plan. Generate separate maps for 2.4 GHz and 5 GHz, and resurvey after building changes.

9. **Wireless controller architectures**: autonomous APs (standalone, small scale), controller-based (WLC + lightweight APs via CAPWAP, enterprise scale), and cloud-managed (vendor dashboard, distributed enterprise).

10. **CAPWAP** (RFC 5415) tunnels control traffic on UDP 5246 and data on UDP 5247 between lightweight APs and the WLC, enabling centralized management.

11. **Fast roaming** uses 802.11r (pre-authentication), 802.11k (neighbor reports for faster scanning), and 802.11v (AP-assisted client steering) to achieve sub-50ms handoffs required for VoIP and real-time applications.

12. **Capacity planning** considers both client density (25-50 per AP) and bandwidth requirements, using the higher AP count plus 10-20% redundancy as the final design.

## Practice Questions

**Q1.** What are the three types of wireless site surveys?

A) Active, passive, and predictive
B) Manual, automatic, and hybrid
C) Indoor, outdoor, and mixed
D) Primary, secondary, and tertiary

<details>
<summary>Answer</summary>

**A)** The three types are: passive (listen-only, measuring RF environment without associating), active (associating with APs and testing real throughput and roaming), and predictive (software-based modeling before installation using building plans and material properties).
</details>

**Q2.** What is the recommended cell overlap percentage between adjacent access points to ensure seamless roaming?

A) 5-10%
B) 15-20%
C) 30-40%
D) 50-60%

<details>
<summary>Answer</summary>

**B)** 15-20% overlap between adjacent AP cells ensures clients can roam without dropping connections. Too little overlap causes coverage gaps and dropped connections; too much overlap wastes resources and increases co-channel interference.
</details>

**Q3.** What protocol does a wireless LAN controller (WLC) use to manage lightweight access points?

A) SNMP
B) CAPWAP (Control and Provisioning of Wireless Access Points)
C) HTTPS
D) SSH

<details>
<summary>Answer</summary>

**B)** CAPWAP (RFC 5415) creates tunnels between lightweight APs and the WLC — control traffic on UDP 5246 and data traffic on UDP 5247. This enables centralized management of AP configuration, firmware, channel assignment, and security policies.
</details>

**Q4.** A wireless administrator is planning channel assignments for a multi-floor building using 2.4 GHz. Which approach minimizes co-channel interference?

A) Use channel 6 for all APs on all floors
B) Stagger channels 1, 6, and 11 both horizontally and vertically across floors
C) Use channel 1 for all APs and increase transmit power
D) Assign channels randomly to each AP

<details>
<summary>Answer</summary>

**B)** A honeycomb pattern using channels 1, 6, and 11 ensures adjacent APs (both on the same floor and between floors) never share the same channel. This must be planned both horizontally and vertically since RF signals penetrate floors.
</details>

**Q5.** What is the primary difference between coverage-based and capacity-based wireless design?

A) Coverage design uses 5 GHz only; capacity design uses 2.4 GHz only
B) Coverage design uses fewer APs at higher power; capacity design uses more APs at lower power
C) Coverage design supports more clients; capacity design covers more area
D) There is no difference; they produce the same result

<details>
<summary>Answer</summary>

**B)** Coverage design focuses on maximizing area covered (fewer APs, higher power), while capacity design focuses on supporting more simultaneous clients (more APs, lower power, smaller cells). The final AP count should be the greater of coverage and capacity requirements.
</details>

**Q6.** What are DFS (Dynamic Frequency Selection) channels, and what operational concern do they introduce?

A) Reserved channels that require premium licensing
B) Channels shared with radar systems that require a 60-second availability check and mandatory vacating upon radar detection
C) Extra-wide channels used only by Wi-Fi 6E
D) Channels reserved for emergency services communication

<details>
<summary>Answer</summary>

**B)** DFS channels (52-144 in 5 GHz) share spectrum with radar systems. APs must perform a 60-second Channel Availability Check before transmitting and must immediately vacate the channel upon detecting radar, causing client disruption. Non-DFS channels (36-48, 149-165) are preferred for latency-sensitive applications.
</details>

**Q7.** Which three 802.11 amendments work together to enable fast roaming on enterprise wireless networks?

A) 802.11a, 802.11b, 802.11g
B) 802.11r, 802.11k, 802.11v
C) 802.11n, 802.11ac, 802.11ax
D) 802.11i, 802.11w, 802.11x

<details>
<summary>Answer</summary>

**B)** 802.11r (Fast BSS Transition / pre-authentication), 802.11k (neighbor reports for faster scanning), and 802.11v (AP-assisted client steering / BSS Transition Management) work together to achieve sub-50ms handoffs required for VoIP and real-time applications.
</details>

**Q8.** What does a heat map display in the context of wireless deployment?

A) The temperature of access points
B) A visual representation of signal strength, SNR, or throughput overlaid on a floor plan
C) The number of clients connected to each AP
D) The physical locations of Ethernet switches

<details>
<summary>Answer</summary>

**B)** Heat maps visualize RF characteristics (signal strength, SNR, channel utilization, throughput) across a floor plan using color gradients. They help identify coverage gaps, areas of excessive overlap, and interference zones. Separate maps should be generated for 2.4 GHz and 5 GHz.
</details>

**Q9.** At what height should indoor APs typically be ceiling-mounted for optimal coverage?

A) 1.0-1.5 meters
B) 2.5-3.5 meters
C) 4.0-5.0 meters
D) As high as possible regardless of ceiling height

<details>
<summary>Answer</summary>

**B)** Indoor APs should be ceiling-mounted centrally at 2.5-3.5 meters to provide optimal radiation pattern coverage below. Mounting too high reduces signal quality at desk level; mounting too low reduces coverage radius. APs should avoid corners and proximity to metal obstacles.
</details>

**Q10.** When designing for a high-density environment like a conference hall with 500 attendees, approximately how many APs are needed using a capacity planning approach?

A) 1-2 APs with maximum power
B) 5-10 APs (50-100 clients per AP)
C) 10-20 APs (25-50 clients per AP)
D) 100 APs (5 clients per AP)

<details>
<summary>Answer</summary>

**C)** Capacity planning targets 25-50 clients per AP. For 500 clients: 500 ÷ 25-50 = 10-20 APs. Add 10-20% redundancy for a final count of approximately 12-24 APs at lower power settings to create smaller cells with sufficient client capacity.
</details>

## References

- CompTIA Network+ N10-009 Exam Objectives: Domain 2.4 – Given a scenario, install and configure the appropriate wireless standards and technologies
- RFC 5415: Control And Provisioning of Wireless Access Points (CAPWAP) Protocol Specification
- IEEE 802.11r-2008: Fast BSS Transition (FT)
- IEEE 802.11k-2008: Radio Resource Measurement
- IEEE 802.11v-2011: Wireless Network Management (BSS Transition Management)
- Lammle, T. (2021). *CompTIA Network+ Study Guide (Exam N10-009)*. Sybex – Wireless Deployment and Site Surveys
- Ekahau: Wi-Fi Design and Site Survey Best Practices
- CWDP Certified Wireless Design Professional Study Guide – Capacity planning and RF design methodology
