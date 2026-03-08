---
id: lesson-072-cellular-technologies
title: "Cellular Technologies (4G LTE, 5G, CDMA, GSM)"
chapterId: ch8-wan-technologies
order: 72
duration: 22
objectives:
  - Understand cellular network architecture and generations
  - Explain GSM and CDMA technologies
  - Describe 4G LTE characteristics and operation
  - Compare 5G capabilities and use cases
  - Identify cellular network components and terminology
---

# Cellular Technologies (4G LTE, 5G, CDMA, GSM)

## Introduction

**Cellular networks** provide wireless voice and data services through a network of **cell towers** (base stations). Technologies have evolved from 1G (analog voice) to 5G (ultra-high-speed data, IoT).

This lesson covers cellular fundamentals—important for the CompTIA Network+ N10-009 exam.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand cellular network architecture and generations
- Explain GSM and CDMA technologies
- Describe 4G LTE characteristics and operation
- Compare 5G capabilities and use cases
- Identify cellular network components and terminology

---

## Cellular Network Overview

### What is a Cellular Network?

**Cellular network:**
- Wireless network divided into **cells** (coverage areas)
- Each cell served by **cell tower** (base station)
- Mobile devices connect to nearest tower

### Cell Architecture

```
        Cell 1        Cell 2        Cell 3
      ┌────────┐    ┌────────┐    ┌────────┐
      │   🗼   │    │   🗼   │    │   🗼   │
      │  Base  │    │  Base  │    │  Base  │
      │ Station│    │ Station│    │ Station│
      └────────┘    └────────┘    └────────┘
         📱            📱            📱
       Phones        Phones        Phones
```

**Handoff:**
- Mobile device moves between cells
- Connection transfers from one tower to another
- Seamless (user doesn't notice)

### Frequency Reuse

**Problem:**
- Limited radio spectrum
- Many users

**Solution:**
- Reuse same frequencies in non-adjacent cells
- Cells far apart use same frequencies (no interference)

**Example:**
```
Cell pattern (7-cell reuse):
   F1  F2  F3
F4  F5  F6  F7
   F1  F2  F3
```

Frequency F1 reused in non-adjacent cells.

---

## Cellular Generations

### Evolution of Cellular Technology

| Generation | Years | Technology | Speed | Primary Use |
|------------|-------|------------|-------|-------------|
| **1G** | 1980s | Analog (AMPS) | N/A | Voice only |
| **2G** | 1990s | Digital (GSM, CDMA) | 64 Kbps | Voice, SMS |
| **3G** | 2000s | UMTS, CDMA2000 | 2-42 Mbps | Voice, data |
| **4G** | 2010s | LTE, WiMAX | 100-1000 Mbps | High-speed data |
| **5G** | 2020s | NR (New Radio) | 1-20 Gbps | Ultra-high-speed, IoT |

### 1G (First Generation)

**Analog voice only:**
- AMPS (Advanced Mobile Phone System)
- No data services
- Insecure (easily cloned)

**Obsolete** (networks shut down by 2008).

### 2G (Second Generation)

**Digital voice and data:**
- GSM (Europe, most of world)
- CDMA (North America, parts of Asia)
- SMS (text messaging)
- Data: 9.6-64 Kbps

**Mostly decommissioned** (some 2G GSM still operational).

### 3G (Third Generation)

**Mobile broadband:**
- UMTS/HSPA (GSM evolution)
- CDMA2000/EV-DO (CDMA evolution)
- Video calls, mobile internet
- Data: 2-42 Mbps

**Being phased out** (3G shutdown began 2022).

### 4G (Fourth Generation)

**High-speed mobile internet:**
- **LTE (Long Term Evolution)**: Dominant 4G technology
- All-IP network (voice and data over IP)
- Data: 100-300 Mbps (typical), up to 1 Gbps (LTE-Advanced)

**Current dominant technology** (as of 2025).

### 5G (Fifth Generation)

**Next-generation wireless:**
- Ultra-high speeds (1-20 Gbps)
- Ultra-low latency (<1 ms)
- Massive IoT support (1 million devices/km²)
- Network slicing (dedicated virtual networks)

**Rapid deployment** (2020-present).

---

## GSM (Global System for Mobile Communications)

### What is GSM?

**GSM** is a 2G digital cellular standard used by ~80% of world's mobile networks.

**Characteristics:**
- **TDMA (Time Division Multiple Access)**: Divides channel into time slots
- **SIM card**: Subscriber Identity Module (stores subscriber info)
- **Global standard**: Works worldwide (roaming)

### GSM Architecture

```
Mobile Device (Phone)
       │
    ┌──▼───┐
    │  BTS │  Base Transceiver Station (Cell Tower)
    └──┬───┘
       │
    ┌──▼───┐
    │  BSC │  Base Station Controller
    └──┬───┘
       │
    ┌──▼───┐
    │  MSC │  Mobile Switching Center
    └──┬───┘
       │
   ┌───▼────┐
   │ Core   │  (HLR, VLR, AUC)
   │ Network│
   └────────┘
```

**Components:**

**BTS (Base Transceiver Station):**
- Cell tower with antennas
- Radio communication with phones

**BSC (Base Station Controller):**
- Manages multiple BTSs
- Handles handoffs

**MSC (Mobile Switching Center):**
- Routes calls
- Connects to PSTN (Public Switched Telephone Network)

### SIM Card

**SIM (Subscriber Identity Module):**
- Removable smart card
- Stores subscriber info (phone number, contacts)
- **IMSI (International Mobile Subscriber Identity)**: Unique ID

**Advantages:**
- Switch phones easily (move SIM)
- Roaming (use SIM in different countries)

---

## CDMA (Code Division Multiple Access)

### What is CDMA?

**CDMA** is a 2G/3G technology using **spread spectrum** to allow multiple users on same frequency simultaneously.

**Characteristics:**
- **Spread spectrum**: Each call uses unique code
- **No SIM card** (traditionally): Phone tied to network
- Used in USA (Verizon, Sprint) and parts of Asia

### CDMA vs GSM

| Aspect | GSM | CDMA |
|--------|-----|------|
| **Multiple Access** | TDMA (time slots) | CDMA (codes) |
| **SIM Card** | Yes | No (traditionally) |
| **Global Use** | 80% of world | 20% of world |
| **Roaming** | Easy (SIM swap) | Difficult |
| **Network** | AT&T, T-Mobile | Verizon, Sprint |

### CDMA Evolution

**CDMA2000:**
- 3G evolution of CDMA
- EV-DO (Evolution-Data Optimized): 3G data

**Phase-out:**
- Verizon and Sprint transitioning to LTE/5G
- CDMA networks being shut down (2020s)

---

## 4G LTE (Long Term Evolution)

### What is LTE?

**LTE** is the dominant 4G technology providing high-speed mobile broadband.

**Key features:**
- **All-IP network**: Voice and data over IP (no circuit-switched)
- **High speeds**: 100-300 Mbps download (typical)
- **Low latency**: 10-30 ms
- **OFDMA**: Orthogonal Frequency Division Multiple Access

### LTE Architecture

```
Mobile Device (UE)
       │
    ┌──▼────┐
    │ eNodeB│  (Evolved Node B - LTE cell tower)
    └──┬────┘
       │
    ┌──▼────┐
    │  EPC  │  Evolved Packet Core
    │       │  (MME, S-GW, P-GW, HSS)
    └──┬────┘
       │
    Internet/IMS
```

**Components:**

**UE (User Equipment):**
- Mobile device (phone, tablet, hotspot)

**eNodeB (Evolved Node B):**
- LTE base station (cell tower)
- Handles radio communication, encryption

**EPC (Evolved Packet Core):**
- Core network
- **MME (Mobility Management Entity)**: Manages connections
- **S-GW/P-GW (Serving/PDN Gateway)**: Routes data
- **HSS (Home Subscriber Server)**: Subscriber database

### LTE Frequency Bands

**LTE operates on multiple frequency bands:**

**Low-band (600-900 MHz):**
- Wide coverage
- Good penetration (buildings)
- Lower speeds

**Mid-band (1.7-2.6 GHz):**
- Balance of coverage and speed
- Most common

**High-band (3.5+ GHz):**
- High speeds
- Limited coverage
- Poor penetration

### LTE Speeds

**LTE categories:**

| Category | Max Download | Max Upload | Typical Devices |
|----------|--------------|------------|-----------------|
| Cat 3 | 100 Mbps | 50 Mbps | Basic phones |
| Cat 4 | 150 Mbps | 50 Mbps | Smartphones |
| Cat 6 | 300 Mbps | 50 Mbps | High-end phones |
| Cat 9 | 450 Mbps | 50 Mbps | Flagship phones |
| Cat 16 | 1 Gbps | 150 Mbps | LTE-Advanced |

**LTE-Advanced (LTE-A):**
- Enhanced LTE (also called 4G+)
- Carrier aggregation (combine multiple bands)
- Up to 1 Gbps speeds

### VoLTE (Voice over LTE)

**Problem:**
- LTE is data-only (IP network)
- Early LTE phones dropped to 3G for voice calls

**VoLTE solution:**
- Voice calls over LTE (IP-based)
- Better voice quality (HD Voice)
- Faster call setup

---

## 5G (Fifth Generation)

### What is 5G?

**5G NR (New Radio)** is the latest cellular technology offering:
- **eMBB (Enhanced Mobile Broadband)**: Ultra-high speeds (1-20 Gbps)
- **URLLC (Ultra-Reliable Low Latency)**: <1 ms latency (autonomous vehicles, surgery)
- **mMTC (Massive Machine-Type Communications)**: IoT (1 million devices/km²)

### 5G Frequency Ranges

#### Low-Band 5G (Sub-1 GHz)

**Characteristics:**
- 600-900 MHz
- Wide coverage (similar to 4G)
- Speeds: 50-250 Mbps

**Use case:**
- Rural coverage
- Initial 5G rollout

#### Mid-Band 5G (1-6 GHz)

**Characteristics:**
- 2.5-3.7 GHz (C-band in USA)
- Balance of coverage and speed
- Speeds: 100-900 Mbps

**Use case:**
- Urban/suburban coverage
- Primary 5G experience

#### High-Band 5G / mmWave (24-100 GHz)

**Characteristics:**
- 24-39 GHz (most common), up to 100 GHz
- Very high speeds: 1-20 Gbps
- **Very limited coverage**: 500-1000 ft from tower
- **Poor penetration**: Blocked by buildings, trees, rain

**Use case:**
- Dense urban areas (stadiums, airports)
- Fixed wireless (home internet)

### 5G vs 4G Comparison

| Aspect | 4G LTE | 5G |
|--------|--------|-----|
| **Peak Speed** | 1 Gbps | 20 Gbps |
| **Latency** | 10-30 ms | <1 ms |
| **Devices/km²** | 100,000 | 1,000,000 |
| **Mobility** | 350 km/h | 500 km/h |
| **Energy Efficiency** | Baseline | 90% reduction |

### 5G Use Cases

**Enhanced Mobile Broadband:**
- 4K/8K video streaming
- VR/AR applications
- Cloud gaming

**Mission-Critical Services:**
- Autonomous vehicles (low latency required)
- Remote surgery
- Industrial automation

**Massive IoT:**
- Smart cities (millions of sensors)
- Agriculture (soil sensors)
- Wearables

### 5G Network Slicing

**Network slicing** creates dedicated virtual networks for different use cases:

**Example slices:**
- **Slice 1**: eMBB (high bandwidth, normal latency)
- **Slice 2**: URLLC (low latency, moderate bandwidth)
- **Slice 3**: mMTC (low bandwidth, many devices)

**Benefits:**
- Customized performance per use case
- Isolation (slices don't affect each other)

---

## Cellular Data Standards

### HSPA (High-Speed Packet Access)

**3G enhancement:**
- HSPA: 7.2 Mbps down
- HSPA+: 42 Mbps down
- Bridge between 3G and 4G

**Marketing:**
- AT&T called HSPA+ "4G" (not true 4G)

### WiMAX

**Alternative 4G technology:**
- IEEE 802.16
- Speeds: 40 Mbps
- Limited deployment (Sprint tried, failed)

**Lost to LTE:**
- LTE became dominant 4G standard

---

## Cellular for Internet Connectivity

### Mobile Hotspot

**Share phone's cellular connection:**
- Creates Wi-Fi network
- Other devices connect via Wi-Fi
- Uses phone's data plan

**Limitations:**
- Battery drain
- Carrier may throttle hotspot speeds
- Data cap concerns

### Cellular Modem / Router

**Dedicated cellular router:**
- LTE or 5G modem
- Provides Wi-Fi for multiple devices
- Alternative to DSL/cable (especially rural areas)

**Example devices:**
- Netgear Nighthawk (LTE router)
- Peplink MAX (multi-WAN with LTE)

**Use cases:**
- Backup WAN connection (failover)
- Primary internet (remote locations)
- Mobile offices (RVs, trucks)

### Fixed Wireless 5G

**5G home internet:**
- Customer receives 5G modem
- Modem connects to nearby 5G tower
- Provides home broadband (alternative to cable/fiber)

**Providers:**
- T-Mobile Home Internet
- Verizon 5G Home

**Speeds:**
- 50-300 Mbps (typical)
- Up to 1 Gbps (mmWave)

---

## Cellular Network Components (Summary)

### Cell Tower Equipment

**Antenna:**
- Transmit/receive radio signals
- Directional (sectors) or omnidirectional

**Baseband Unit:**
- Signal processing
- Connected to backhaul

**Backhaul:**
- Connection from tower to core network
- Fiber optic (ideal), microwave, or leased line

### Core Network

**Authentication:**
- Verify subscriber identity
- HSS (Home Subscriber Server)

**Routing:**
- Route data to/from internet
- Gateway nodes

**Mobility Management:**
- Track user location
- Manage handoffs

---

## Cellular Terminology

**IMSI (International Mobile Subscriber Identity):**
- Unique identifier for SIM card
- Used for authentication

**IMEI (International Mobile Equipment Identity):**
- Unique identifier for phone hardware
- Used for device identification/blacklisting

**Handoff (Handover):**
- Transferring connection from one cell to another
- Seamless (no dropped call)

**Roaming:**
- Using network outside home network
- International roaming (different country)
- Often extra charges

**APN (Access Point Name):**
- Gateway between cellular network and internet
- Configured on phone/modem

---

## Summary

1. **Cellular networks** divide coverage into cells, each served by base station (tower)
2. **GSM** uses TDMA and SIM cards (80% of world); **CDMA** uses spread spectrum with no SIM (20%)
3. **4G LTE** provides 100-300 Mbps typical speeds with 10-30 ms latency (all-IP network)
4. **5G** offers three key capabilities: eMBB (high speed), URLLC (low latency), mMTC (massive IoT)
5. **5G frequency ranges**: Low-band (wide coverage), mid-band (balanced), mmWave (ultra-fast but limited range)
6. **LTE categories** define max speeds (Cat 4: 150 Mbps, Cat 16: 1 Gbps)
7. **VoLTE** enables voice calls over LTE network (HD quality, faster call setup)
8. **Network slicing** in 5G creates dedicated virtual networks for different use cases
9. **Cellular can provide internet** via mobile hotspot, cellular router, or fixed wireless
10. **3G networks being shut down**; 4G LTE dominant; 5G rapidly expanding

---

## Practice Questions

**Q1.** Which cellular technology uses TDMA (Time Division Multiple Access) and SIM cards, and is used by approximately 80% of the world's mobile networks?

A) CDMA
B) GSM
C) LTE
D) WiMAX

<details>
<summary>Answer</summary>

**B)** GSM (Global System for Mobile Communications) uses TDMA for channel access and SIM cards for subscriber identification. It is the dominant cellular standard worldwide, used by about 80% of networks.
</details>

**Q2.** Which 5G capability is designed specifically for applications requiring ultra-low latency, such as autonomous vehicles and remote surgery?

A) eMBB (Enhanced Mobile Broadband)
B) URLLC (Ultra-Reliable Low-Latency Communications)
C) mMTC (Massive Machine-Type Communications)
D) VoLTE

<details>
<summary>Answer</summary>

**B)** URLLC (Ultra-Reliable Low-Latency Communications) is the 5G capability designed for mission-critical applications requiring latency as low as 1 ms and extremely high reliability.
</details>

**Q3.** What is the typical latency range for 4G LTE networks?

A) 1-5 ms
B) 10-30 ms
C) 100-200 ms
D) 500-700 ms

<details>
<summary>Answer</summary>

**B)** 4G LTE typically provides latency of 10-30 ms, which is suitable for most applications including video streaming and VoIP, but not ideal for the ultra-low latency requirements of 5G URLLC applications.
</details>

**Q4.** Which 5G frequency range provides the fastest speeds but has the most limited coverage area?

A) Low-band (below 1 GHz)
B) Mid-band (1-6 GHz)
C) mmWave (millimeter wave, 24-100 GHz)
D) All 5G bands have equal range

<details>
<summary>Answer</summary>

**C)** mmWave (millimeter wave) operates at 24-100 GHz and provides ultra-fast speeds (up to multi-Gbps) but has very limited range and poor penetration through walls and obstacles.
</details>

**Q5.** What does VoLTE enable?

A) Video over LTE networks
B) Voice calls carried over the LTE data network with HD quality
C) VPN over LTE
D) Virtual machines over LTE

<details>
<summary>Answer</summary>

**B)** VoLTE (Voice over LTE) enables voice calls to be carried as data packets over the 4G LTE network. It provides HD voice quality and faster call setup compared to traditional circuit-switched voice.
</details>

**Q6.** Which 5G feature creates dedicated virtual networks on shared physical infrastructure for different use cases?

A) Carrier aggregation
B) MIMO
C) Network slicing
D) Beamforming

<details>
<summary>Answer</summary>

**C)** Network slicing in 5G creates isolated virtual networks on shared infrastructure, each optimized for specific requirements (e.g., one slice for IoT with massive connections, another for video with high bandwidth).
</details>

**Q7.** An organization needs to provide internet access at a remote construction site with no wired infrastructure. Which solution is MOST appropriate?

A) DSL
B) Fiber to the premises
C) Cellular router or mobile hotspot
D) Cable modem

<details>
<summary>Answer</summary>

**C)** A cellular router or mobile hotspot uses the cellular network (4G LTE or 5G) to provide internet access, making it ideal for remote or temporary locations without wired infrastructure.
</details>

**Q8.** Which 5G capability is designed to support billions of IoT devices with low power consumption?

A) eMBB
B) URLLC
C) mMTC
D) VoNR

<details>
<summary>Answer</summary>

**C)** mMTC (Massive Machine-Type Communications) is designed to support up to 1 million devices per square kilometer, targeting IoT sensors and devices that require low power and small data transfers.
</details>

**Q9.** What is the PRIMARY reason 3G cellular networks are being shut down?

A) 3G is not secure
B) To reallocate spectrum for more efficient 4G LTE and 5G networks
C) 3G does not support voice calls
D) 3G equipment is too expensive

<details>
<summary>Answer</summary>

**B)** Carriers are shutting down 3G networks to reallocate the radio spectrum for 4G LTE and 5G, which use the spectrum much more efficiently and provide significantly better performance.
</details>

**Q10.** What is carrier aggregation in LTE-Advanced, and what benefit does it provide?

A) Combining multiple cell towers into a single base station to reduce costs
B) Bonding multiple frequency bands simultaneously to increase available bandwidth for a device
C) Encrypting voice calls using multiple carrier frequencies
D) Aggregating multiple SIM cards into a single device

<details>
<summary>Answer</summary>

**B)** Carrier aggregation in LTE-Advanced allows a device to simultaneously use multiple frequency bands (component carriers), effectively bonding them together for higher aggregate bandwidth. For example, combining two 20 MHz channels can double the available throughput, enabling speeds up to 1 Gbps on LTE-A.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 1.2:** Explain network types (Cellular)
- **CompTIA Network+ N10-009 Objective 2.1:** Compare WAN technologies (Cellular, LTE, 5G)
- 3GPP: LTE and 5G Specifications
- GSM Association (GSMA)
- Professor Messer: Network+ N10-009 - Cellular Technologies

---

**Next Lesson:** Lesson 73 - Satellite Communications (VSAT, Latency Considerations)
