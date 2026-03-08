---
id: lesson-021-power-over-ethernet
title: Power over Ethernet (PoE, PoE+, PoE++ Standards)
chapterId: ch3-network-implementations
order: 21
duration: 55
objectives:
  - Understand Power over Ethernet technology and benefits
  - Differentiate between PoE, PoE+, and PoE++ standards
  - Calculate PoE power budgets for switch deployments
  - Identify PoE-powered devices and applications
  - Troubleshoot PoE issues
  - Understand PoE modes (endspan vs midspan)
---

# Lesson 21: Power over Ethernet (PoE, PoE+, PoE++ Standards)

## Learning Objectives
- Understand Power over Ethernet technology and benefits
- Differentiate between PoE, PoE+, and PoE++ standards
- Calculate PoE power budgets for switch deployments
- Identify PoE-powered devices and applications
- Troubleshoot PoE issues
- Understand PoE modes (endspan vs midspan)

## Introduction

**Power over Ethernet (PoE)** is a technology that allows network cables to carry electrical power alongside data, eliminating the need for separate power supplies for network devices. PoE is standardized by IEEE and enables deployment of devices in locations where power outlets are unavailable or costly to install.

This lesson covers PoE standards, power budgets, applications, and troubleshooting—important knowledge for the CompTIA Network+ N10-009 exam.

---

## What is Power over Ethernet?

### Definition

**Power over Ethernet (PoE)** delivers electrical power and data over standard Ethernet cabling (Cat5e or better) to powered devices (PDs) from power sourcing equipment (PSE).

**Key Benefits:**
- ✅ Single cable for power + data
- ✅ Centralized power management
- ✅ Reduced installation costs (no electrical work)
- ✅ Flexible device placement
- ✅ UPS backup for powered devices
- ✅ Remote power management (on/off)

**Use Cases:**
- VoIP phones
- Wireless access points
- IP cameras
- Building access control systems
- IoT sensors
- Digital signage

---

## PoE Components

### Power Sourcing Equipment (PSE)

**PSE** provides power to powered devices.

**Types of PSE:**

**1. Endspan (Built-in PoE Switch)**
- PoE capability built into network switch
- Most common deployment
- Each port can provide PoE
- Example: Cisco Catalyst PoE switches

**2. Midspan (PoE Injector)**
- External device between switch and powered device
- Injects power into Ethernet cable
- Used when switch doesn't support PoE
- Example: PoE injector for single AP

```
[Non-PoE Switch] --- [PoE Injector] --- [IP Camera]
                         (Midspan)
```

### Powered Devices (PD)

**PD** receives power from PSE over Ethernet cable.

**Common Powered Devices:**
- VoIP phones (Cisco, Polycom, Yealink)
- Wireless access points (Ubiquiti, Cisco, Aruba)
- IP cameras (Axis, Hikvision, Dahua)
- Access control card readers
- IoT sensors and controllers
- LED lighting systems
- Thin clients

---

## PoE Standards (IEEE 802.3)

### Overview Table

| Standard | Year | Name | Power (PSE) | Power (PD) | Voltage | Pairs Used |
|----------|------|------|-------------|------------|---------|------------|
| **802.3af** | 2003 | PoE (Type 1) | 15.4W | 12.95W | 48V DC | 2 pairs |
| **802.3at** | 2009 | PoE+ (Type 2) | 30W | 25.5W | 48V DC | 2 pairs |
| **802.3bt** | 2018 | PoE++ (Type 3) | 60W | 51W | 48V DC | 4 pairs |
| **802.3bt** | 2018 | PoE++ (Type 4) | 100W | 71W | 48V DC | 4 pairs |

**Note:** Power loss occurs over cable (resistance), so PD receives less than PSE provides.

---

### 802.3af (PoE / Type 1)

**Specifications:**
- **Year:** 2003
- **Power at PSE:** 15.4W per port
- **Power at PD:** 12.95W (after cable loss)
- **Voltage:** 48V DC
- **Pairs:** 2 pairs (Alternative A or Alternative B)
- **Max Cable Length:** 100 meters

**Power Classes (802.3af):**

| Class | Power at PSE | Power at PD | Usage |
|-------|--------------|-------------|-------|
| 0 | 15.4W | 0.44-12.95W | Default |
| 1 | 4.0W | 0.44-3.84W | Optional |
| 2 | 7.0W | 3.84-6.49W | Optional |
| 3 | 15.4W | 6.49-12.95W | Optional |

**Typical Devices:**
- Basic VoIP phones
- Simple IP cameras (non-PTZ)
- Low-power wireless APs
- Building sensors

**Cable Requirements:**
- Cat3 or better (Cat5e recommended)

---

### 802.3at (PoE+ / Type 2)

**Specifications:**
- **Year:** 2009
- **Power at PSE:** 30W per port
- **Power at PD:** 25.5W (after cable loss)
- **Voltage:** 48V DC
- **Pairs:** 2 pairs
- **Backward compatible:** Can power 802.3af devices
- **Max Cable Length:** 100 meters

**Power Class (802.3at):**

| Class | Power at PSE | Power at PD |
|-------|--------------|-------------|
| 4 | 30W | 25.5W |

**Typical Devices:**
- Video conferencing phones
- Pan-Tilt-Zoom (PTZ) IP cameras
- High-performance wireless APs (802.11ac/ax)
- Video door intercoms
- Thin clients

**Cable Requirements:**
- Cat5e or better

---

### 802.3bt (PoE++ / Type 3 and Type 4)

**Specifications (Type 3):**
- **Year:** 2018
- **Power at PSE:** 60W per port
- **Power at PD:** 51W (after cable loss)
- **Voltage:** 48V DC
- **Pairs:** All 4 pairs used
- **Max Cable Length:** 100 meters

**Specifications (Type 4):**
- **Power at PSE:** 100W per port
- **Power at PD:** 71W (after cable loss)
- **Voltage:** 48V DC
- **Pairs:** All 4 pairs used

**Power Classes (802.3bt):**

| Class | Power at PSE | Power at PD | Type |
|-------|--------------|-------------|------|
| 5 | 45W | 40W | Type 3 |
| 6 | 60W | 51W | Type 3 |
| 7 | 75W | 62W | Type 4 |
| 8 | 100W | 71W | Type 4 |

**Typical Devices:**
- High-end PTZ cameras
- Video conferencing systems (multiple screens)
- Digital signage displays
- LED lighting systems
- Laptops (via USB-C)
- Building automation controllers
- High-density wireless APs (WiFi 6E)

**Cable Requirements:**
- Cat5e minimum (Cat6/Cat6A recommended for reliability)
- All 4 pairs must be intact

---

## PoE Detection and Negotiation

### How PoE Works

**Step 1: Detection**
- PSE applies low voltage (2.8-10V) to detect PD
- Measures resistance (23.75-26.25 kΩ indicates PoE device)
- Non-PoE devices have different resistance (ignored)

**Step 2: Classification**
- PSE determines power class of PD
- PD draws specific current during classification pulse
- PSE knows how much power to provide

**Step 3: Power On**
- PSE ramps up voltage to 48V DC
- PD powers on and begins operation
- Data communication starts

**Step 4: Monitoring**
- PSE continuously monitors power draw
- If PD disconnects, PSE detects and shuts off power
- Prevents power waste

**Safety:**
- PoE won't damage non-PoE devices
- Detection phase ensures only PoE devices receive power
- Voltage remains low until PD detected

---

## PoE Power Delivery Methods

### Alternative A (Data Pairs)

**Pins Used:** 1-2 (TX+), 3-6 (TX-)
- Power delivered on same pairs as data
- **10/100 Ethernet:** Pairs 1-2 and 3-6
- **1000 Ethernet:** All 4 pairs for data, power on 2 pairs

### Alternative B (Spare Pairs)

**Pins Used:** 4-5, 7-8 (spare pairs)
- Power delivered on pairs NOT used for 10/100 data
- **10/100 Ethernet:** Power on pairs 4-5 and 7-8
- **1000 Ethernet:** Cannot use (all pairs used for data)

### 4-Pair PoE (802.3bt)

**Pins Used:** All 8 pins
- Power delivered on all 4 pairs simultaneously
- Required for Type 3 (60W) and Type 4 (100W)
- Doubles power capacity

---

## PoE Power Budget

### What is a Power Budget?

A **power budget** is the total PoE power available from a switch for all ports.

**Example:**
- Switch: 48 ports, 740W PoE budget
- Each port capable of 30W (PoE+)
- BUT: Total budget = 740W

**Calculation:**
- 48 ports × 30W = 1,440W (theoretical max)
- Available: 740W (actual budget)
- **Cannot power all ports at maximum simultaneously**

### Power Budget Planning

**Step 1: Determine device power requirements**

Example devices:
- 24× VoIP phones = 24 × 7W = 168W
- 20× Wireless APs = 20 × 25W = 500W
- 4× PTZ cameras = 4 × 60W = 240W
- **Total:** 908W

**Step 2: Select switch with adequate budget**

- Switch must have PoE budget ≥ 908W
- Add 10-20% overhead for safety
- Required: ~1,000W PoE budget

**Step 3: Distribute devices across switches if needed**

If single switch insufficient:
- Split devices across multiple switches
- Example: 2× switches with 500W each = 1,000W total

### Power Budget Insufficiency

**What happens when budget exceeded?**

**Option 1: Priority-based power allocation**
- Higher priority ports get power first
- Lower priority ports denied

**Option 2: First-come, first-served**
- Devices that connect first get power
- Later devices denied

**Option 3: Power shedding**
- Switch reduces power to some ports
- May cause devices to reboot or lose functionality

**Solution:**
- Upgrade switch with larger PoE budget
- Add second PoE switch
- Use PoE+ devices only where needed (others use 802.3af)

---

## PoE Cable Requirements

### Cable Category Requirements

| PoE Standard | Minimum Cable | Recommended |
|--------------|---------------|-------------|
| 802.3af (15W) | Cat3 | Cat5e |
| 802.3at (30W) | Cat5 | Cat5e |
| 802.3bt (60-100W) | Cat5e | Cat6/Cat6A |

**Why Higher Category for 802.3bt?**
- 4-pair power delivery
- Higher current = more heat
- Cat6/Cat6A handles heat better (thicker conductors)

### Cable Distance

**Maximum:** 100 meters (328 feet)
- Same as standard Ethernet limit
- Longer distances = more power loss
- Power budget calculations assume 100m max

**Power Loss Over Distance:**
- Resistance in cable causes voltage drop
- Longer cable = more loss
- Cat6 has less resistance than Cat5e (better for long runs)

---

## Troubleshooting PoE Issues

### Issue 1: Device Not Powering On

**Symptoms:**
- Powered device not turning on
- Link light may or may not be on

**Troubleshooting Steps:**

1. **Verify PSE port has PoE enabled:**
   ```cisco
   Switch# show power inline
   ```
   Check port status and power allocation

2. **Check power budget:**
   ```cisco
   Switch# show power inline
   Available power: 250W
   Used power: 245W
   ```
   If budget exhausted, device won't power on

3. **Verify cable:**
   - Test with known-good cable
   - Check all 4 pairs connected (for 802.3bt)
   - Max 100m length

4. **Check device power requirements:**
   - Device needs 25W but port only provides 15W (802.3af)
   - Solution: Enable PoE+ or connect to PoE+ port

5. **Test with PoE injector:**
   - Isolate issue: switch or device
   - If device works with injector, switch port issue

---

### Issue 2: Device Intermittently Losing Power

**Symptoms:**
- Device reboots randomly
- Power cycling

**Possible Causes:**

1. **Insufficient power:**
   - Device requires more power than provided
   - Check device specs vs PSE capability

2. **Poor cable quality:**
   - High resistance in cable
   - Damaged pairs
   - Solution: Replace cable with Cat6

3. **Power budget exhaustion:**
   - Other devices drawing power causes budget shortage
   - Solution: Increase budget or reduce load

4. **Overheating:**
   - Switch overheating reduces PoE capacity
   - Solution: Improve switch ventilation

---

### Issue 3: PoE Not Detected

**Symptoms:**
- PSE not detecting PD
- Device not receiving power

**Possible Causes:**

1. **Non-PoE device:**
   - Device doesn't support PoE
   - Requires external power supply

2. **Wrong PoE mode:**
   - Device requires passive PoE (non-standard)
   - PSE provides standard PoE
   - Solution: Use appropriate PoE injector

3. **Cable issue:**
   - Pairs 4-5 or 7-8 damaged (Alternative B)
   - Test with cable tester

---

## PoE Best Practices

### 1. Plan Power Budgets Carefully

- Calculate total power requirements before purchasing switch
- Include 20% overhead for future growth
- Document device power consumption

### 2. Use Quality Cabling

- Cat6 or Cat6A for 802.3bt deployments
- Avoid cheap cables (high resistance)
- Test cables after installation

### 3. Label PoE Ports

- Identify which ports are PoE-capable
- Document power budgets per switch
- Helps troubleshooting

### 4. Monitor Power Usage

- Use network management tools
- Track power consumption per port
- Alert when budget nearing capacity

### 5. Use PoE+ When Possible

- Provides headroom for device power spikes
- Future-proofs deployment
- Minimal cost difference

---

## PoE Splitters and Extenders

### PoE Splitters

A **PoE splitter** separates data and power at the receiving end, allowing a non-PoE device to receive power from a PoE switch. The splitter outputs separate Ethernet (data only) and DC power connections.

```
[PoE Switch] ---PoE Cable--- [PoE Splitter] --- Ethernet → Non-PoE Device
                                             --- DC Power → Device Power Jack
```

**Use Cases:**
- Powering legacy devices that lack built-in PoE support
- Connecting older IP cameras or access control panels with DC power inputs
- Providing PoE power to Raspberry Pi or small IoT devices

**Key Considerations:**
- Splitter output voltage must match device requirements (5V, 12V, or 24V DC)
- Maximum power output is limited by PoE standard used
- Adds a point of failure (one more device in the chain)

### PoE Extenders

A **PoE extender** (also called a PoE repeater) regenerates both data and PoE power, extending the reach beyond the standard 100-meter Ethernet limit. The extender is itself powered by PoE from the upstream switch.

```
[PoE Switch] --100m-- [PoE Extender] --100m-- [PoE Extender] --100m-- [IP Camera]
                         (powered by PoE)        (powered by PoE)
```

**Specifications:**
- Each extender adds up to 100 meters of reach
- Multiple extenders can be daisy-chained (typically up to 4)
- Some power is consumed by each extender, reducing power available at the PD
- Maximum theoretical reach: ~500 meters (with 4 extenders)

**Power Loss per Extender:**
- Each extender consumes approximately 2–4W
- A 30W PoE+ signal passing through 2 extenders may only deliver ~22–25W to the PD
- Plan power budgets carefully when using extenders

---

## Powered Device Classes: Detailed Breakdown

PoE devices negotiate their power class during the detection and classification phase. Understanding device classes helps administrators plan power budgets precisely.

### Class Negotiation Process

1. PSE applies a classification voltage (15.5–20.5V) to the PD
2. PD draws a specific current signature identifying its class
3. PSE allocates power based on the detected class
4. If classification fails, PSE defaults to Class 0 (maximum allocation)

### Complete PoE Class Reference

| Class | Standard | Max Power (PSE) | Max Power (PD) | Typical Devices |
|-------|----------|-----------------|----------------|-----------------|
| 0 | 802.3af | 15.4W | 12.95W | Default / unclassified devices |
| 1 | 802.3af | 4.0W | 3.84W | Basic VoIP phones, sensors |
| 2 | 802.3af | 7.0W | 6.49W | Single-radio APs, IP phones with displays |
| 3 | 802.3af | 15.4W | 12.95W | Dual-radio APs, PTZ-lite cameras |
| 4 | 802.3at | 30W | 25.5W | High-perf APs, PTZ cameras, video phones |
| 5 | 802.3bt | 45W | 40W | Multi-radio APs (WiFi 6) |
| 6 | 802.3bt | 60W | 51W | PTZ cameras with heaters, thin clients |
| 7 | 802.3bt | 75W | 62W | Laptops, video conferencing endpoints |
| 8 | 802.3bt | 100W | 71W | Digital signage, LED lighting panels |

**Power Allocation Efficiency:**
- Switches that allocate power by class (rather than max per standard) can serve more devices
- A switch with a 370W budget can support 92 Class 1 devices (4W each) but only 12 Class 4 devices (30W each)
- Configuration tip: Set per-port power limits on managed switches to prevent one device from consuming excessive power

---

## Advanced PoE Budget Calculations

### Detailed Budget Worksheet Example

**Scenario: Small Office Deployment**

| Device | Qty | PoE Class | Per-Device (W) | Subtotal (W) |
|--------|-----|-----------|----------------|---------------|
| VoIP phones (Cisco 8845) | 20 | Class 2 | 7W | 140W |
| WiFi 6 APs (Aruba 535) | 6 | Class 4 | 25.5W | 153W |
| PTZ cameras (Axis Q6135) | 4 | Class 6 | 51W | 204W |
| Door access readers | 8 | Class 1 | 3.84W | 30.7W |
| **Subtotal** | | | | **527.7W** |
| **20% safety margin** | | | | **105.5W** |
| **Total required** | | | | **633.2W** |

**Switch selection:** A 48-port PoE+ switch with a 740W budget meets this requirement with 106.8W remaining for future growth.

### Multi-Switch Budget Planning

In larger deployments, distribute devices strategically across switches:

```
Switch A (Floor 1) — 370W budget:
  10× VoIP phones @ 7W  = 70W
  3× WiFi APs @ 25.5W   = 76.5W
  2× PTZ cameras @ 51W  = 102W
  Total: 248.5W (67% utilized)

Switch B (Floor 2) — 370W budget:
  10× VoIP phones @ 7W  = 70W
  3× WiFi APs @ 25.5W   = 76.5W
  2× PTZ cameras @ 51W  = 102W
  8× door readers @ 3.8W = 30.4W
  Total: 278.9W (75% utilized)
```

**Rule of thumb:** Keep each switch at or below 80% PoE budget utilization to handle power spikes and future additions.

---

## PoE Troubleshooting: Voltage Drops and Advanced Diagnostics

### Voltage Drop Over Cable Length

PoE delivers power at 48V DC, but cable resistance causes voltage to drop over distance. The PD requires a minimum operating voltage to function properly.

**Voltage drop calculation:**
```
Voltage Drop = Current × Cable Resistance

Example:
  Cable: Cat5e, 100 meters
  Resistance: ~12.5 Ω per pair (for 100m Cat5e)
  Device current: 0.5A (at 25W load)

  Voltage drop = 0.5A × 12.5 Ω = 6.25V (per pair)
  
  With 2-pair PoE (802.3at):
  Starting voltage: 48V
  Voltage at PD: ~42–43V (within acceptable range)

  With long cables near 100m + poor connectors:
  Voltage at PD may drop below 37V → device fails to power on
```

**Mitigation strategies:**
- Use Cat6/Cat6A (lower resistance per meter)
- Keep cable runs well under 100 meters when possible
- Use higher-quality patch panels and connectors (lower insertion loss)
- Consider PoE extenders for runs approaching maximum distance

### Power Budget Exceeded: Symptoms and Solutions

When a switch's total PoE budget is exceeded, symptoms include:

- **New devices fail to power on** while existing devices continue working
- **Devices power-cycle intermittently** during peak power draw
- **Syslog messages** indicating PoE power denied or power budget exceeded

**Diagnostic commands (Cisco IOS):**
```cisco
Switch# show power inline
Interface   Admin  Oper    Power(W)  Device       Class
Gi1/0/1     auto   on      7.0       IP Phone     2
Gi1/0/2     auto   on      25.5      AIR-AP       4
Gi1/0/3     auto   off     0.0       n/a          n/a
                                       ↑ power denied

Available: 370.0W | Used: 362.5W | Remaining: 7.5W
```

**Resolution steps:**
1. Identify high-power devices and verify they're using the correct PoE class
2. Reassign low-priority devices to non-PoE ports with wall power adapters
3. Configure PoE priority levels so critical devices (phones, APs) get power first
4. Upgrade to a switch with a higher PoE budget or add a secondary switch

---

## PoE in Enterprise Deployments

### VoIP Phone Deployments

PoE is the standard method for powering enterprise VoIP phones. In a typical deployment:

```
[PoE Switch] --- Cat6 --- [VoIP Phone] --- Passthrough Port --- [PC]
```

- The VoIP phone receives both data and power over a single cable
- The phone's passthrough port provides data (but not PoE) to a connected PC
- LLDP-MED or CDP is used to negotiate PoE class and VLAN assignment automatically
- Typical power draw: 5–15W per phone (Class 1–3)

### Wireless Access Point Deployments

WiFi access points are the most common PoE-powered devices in enterprise networks:

- **WiFi 5 (802.11ac):** Typically requires 802.3at (PoE+) at 15–25W
- **WiFi 6 (802.11ax):** Often requires 802.3at (PoE+) at 20–30W
- **WiFi 6E (802.11ax on 6 GHz):** May require 802.3bt (PoE++) at 30–51W due to tri-band radios

**Placement considerations:**
- APs are often ceiling-mounted where wall outlets are unavailable
- PoE eliminates the need for electricians to install power at each AP location
- Centralized UPS on the switch provides battery backup for all APs during power outages

### IP Surveillance Camera Deployments

PoE simplifies camera installation, especially in outdoor or difficult-to-reach locations:

- **Fixed cameras:** 802.3af (PoE) sufficient at 8–13W
- **PTZ cameras:** 802.3at (PoE+) or 802.3bt (PoE++) required at 25–60W
- **Cameras with heaters/fans (outdoor):** 802.3bt Type 3/4 required at 40–70W

**Best practices for camera PoE:**
- Use outdoor-rated Cat6 cable with UV-resistant jacket
- Install weatherproof Ethernet connectors at camera locations
- Account for peak power draw (PTZ motor + heater + IR illuminator active simultaneously)
- Use managed switches with per-port PoE scheduling to restart cameras remotely if they freeze

---

## Real-World Applications

**Scenario 1: Wireless AP Deployment**

**Requirements:**
- 50× WiFi 6 access points
- Each AP requires 25.5W (802.3at)
- Distributed across 3 floors

**Solution:**
- 3× PoE+ switches (one per floor)
- Each switch: 24 ports, 740W PoE budget
- Power per switch: 16× APs × 25.5W = 408W
- Budget sufficient with room for growth

---

**Scenario 2: IP Camera System**

**Requirements:**
- 32× PTZ cameras (60W each)
- Outdoor installation
- Central monitoring room

**Solution:**
- 2× PoE++ (802.3bt Type 3) switches
- Each switch: 24 ports, 1440W budget
- Power per switch: 16× cameras × 60W = 960W
- Use Cat6A cabling for reliability

---

## Summary

1. **PoE delivers power + data** over single Ethernet cable
2. **Three main standards:** 802.3af (15W), 802.3at (30W), 802.3bt (60-100W)
3. **PSE (Power Sourcing Equipment)** provides power to PD (Powered Device)
4. **Power budget** limits total PoE power available from switch
5. **Cable quality matters:** Cat6/Cat6A recommended for high-power PoE
6. **Detection process** ensures non-PoE devices not damaged
7. **100-meter distance limit** same as regular Ethernet

---

## Practice Questions


**Q1.** What is the maximum power a device can receive with 802.3at (PoE+)?

A) 12.95W
B) 15.4W
C) 25.5W
D) 51W

<details>
<summary>Answer</summary>

**C)** ** C - 802.3at provides 30W at the PSE, but after cable loss, the PD receives 25.5W.
</details>

**Q2.** Which PoE standard is required for a device needing 60W?

A) 802.3af
B) 802.3at
C) 802.3bt Type 3
D) 802.3bt Type 4

<details>
<summary>Answer</summary>

**C)** ** C - 802.3bt Type 3 provides up to 60W at the PSE (51W at PD). Type 4 provides 100W.
</details>

**Q3.** What is the primary difference between endspan and midspan PoE?

A) Power delivery method
B) Endspan is built into switch, midspan is external injector
C) Voltage used
D) Cable pairs used

<details>
<summary>Answer</summary>

**B)** ** B - Endspan PSE is built into the network switch, while midspan PSE is an external PoE injector placed between the switch and powered device.
</details>

**Q4.** How many wire pairs are used for 802.3bt Type 4 PoE?

A) 1 pair
B) 2 pairs
C) 3 pairs
D) 4 pairs

<details>
<summary>Answer</summary>

**D)** ** D - 802.3bt (PoE++) uses all 4 pairs to deliver up to 100W of power.
</details>

**Q5.** A switch has 48 ports and a 740W PoE budget. If 30 ports each require 25W, what happens?

A) All ports receive power (750W < 740W)
B) Some ports won't receive power (30 × 25W = 750W > 740W)
C) Switch will automatically upgrade power budget
D) All ports receive reduced power

<details>
<summary>Answer</summary>

**B)** ** B - The total power requirement (750W) exceeds the switch's PoE budget (740W). Some ports will be denied power based on the switch's priority configuration or first-come, first-served basis.
</details>


## References

- **CompTIA Network+ N10-009 Objective 2.3:** Given a scenario, configure and deploy common Ethernet switching features
- **IEEE 802.3af:** Power over Ethernet (PoE)
- **IEEE 802.3at:** Power over Ethernet Plus (PoE+)
- **IEEE 802.3bt:** Power over Ethernet Plus Plus (PoE++)
- Cisco: Power over Ethernet Design Guide

---

**Next Lesson:** Lesson 22 - Network Devices (Hubs, Switches, Routers, Firewalls, Load Balancers)
