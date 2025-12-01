---
id: lesson-053-wireless-fundamentals
title: "Wireless Fundamentals"
chapterId: "chapter-006-wireless-networking"
order: 53
duration: 20
objectives:
  - Understand wireless radio frequency fundamentals
  - Compare 2.4 GHz and 5 GHz frequency bands
  - Explain channel usage and interference
  - Identify factors affecting wireless signal strength
  - Understand SSID and BSS concepts
---

# Wireless Fundamentals

Wireless networking uses **radio frequency (RF) electromagnetic waves** to transmit data through the air, eliminating the need for physical cables. Understanding RF fundamentals is essential for designing, implementing, and troubleshooting wireless networks.

---

## Radio Frequency Basics

### Electromagnetic Spectrum

**Radio waves** are part of the electromagnetic spectrum, characterized by:

- **Frequency**: Number of wave cycles per second, measured in **Hertz (Hz)**
  - 1 MHz (megahertz) = 1,000,000 Hz
  - 1 GHz (gigahertz) = 1,000,000,000 Hz
- **Wavelength**: Physical distance between wave peaks
  - **Inverse relationship**: Higher frequency = shorter wavelength
  - Formula: Wavelength = Speed of Light / Frequency
- **Amplitude**: Wave height, related to signal strength

**Wi-Fi operates in two unlicensed ISM bands**:
- **2.4 GHz** (2.400 - 2.4835 GHz)
- **5 GHz** (5.150 - 5.825 GHz)
- **6 GHz** (Wi-Fi 6E: 5.925 - 7.125 GHz)

---

## 2.4 GHz vs 5 GHz Frequency Bands

### 2.4 GHz Band

**Advantages**:
- **Longer range**: Lower frequency penetrates walls and obstacles better
- **Better penetration**: Works well through building materials
- **Wider device support**: Older devices only support 2.4 GHz
- **Fewer access points needed**: Larger coverage area per AP

**Disadvantages**:
- **More congested**: Only 3 non-overlapping channels (1, 6, 11 in North America)
- **Interference**: Bluetooth, microwaves, cordless phones, baby monitors
- **Lower maximum speeds**: Less bandwidth available
- **More devices competing**: Popular band for IoT devices

**Channels**: 
- 14 channels total (1-14), but channel availability varies by region
- North America: Channels 1-11
- Each channel is 20 MHz wide, but they overlap
- **Non-overlapping channels**: 1, 6, and 11 (25 MHz separation)

```
Channel Layout (2.4 GHz):
[1]---[2]---[3]---[4]---[5]---[6]---[7]---[8]---[9]---[10]--[11]
 └───overlaps────┘       └───overlaps────┘       └───overlaps───┘
   Use Channel 1           Use Channel 6         Use Channel 11
```

### 5 GHz Band

**Advantages**:
- **Less congestion**: More non-overlapping channels (up to 24)
- **Higher speeds**: More bandwidth available (up to 160 MHz channel widths)
- **Less interference**: Fewer devices operate in 5 GHz
- **More channels**: Better for high-density environments

**Disadvantages**:
- **Shorter range**: Higher frequency attenuates faster
- **Less penetration**: Walls and obstacles block signal more
- **Older device incompatibility**: Not all devices support 5 GHz
- **More APs needed**: Smaller coverage area per AP

**Channel Groups** (UNII bands):
- **UNII-1** (5.150-5.250 GHz): Channels 36, 40, 44, 48 - Indoor only
- **UNII-2A** (5.250-5.350 GHz): Channels 52, 56, 60, 64 - DFS required
- **UNII-2C** (5.470-5.725 GHz): Channels 100-144 - DFS required
- **UNII-3** (5.725-5.825 GHz): Channels 149, 153, 157, 161, 165 - Indoor/outdoor

**DFS** (Dynamic Frequency Selection): Required in some channels to avoid radar interference. APs must monitor for radar and change channels if detected.

---

## Wi-Fi Channel Width

**Channel width** affects speed and interference:

### 20 MHz Channels (Default)
- **Best compatibility**: All devices support 20 MHz
- **Less interference**: Narrow channel = less overlap
- **Lower speeds**: ~72 Mbps (802.11n), ~433 Mbps (802.11ac)
- **Best for**: High-density environments

### 40 MHz Channels (2.4 GHz and 5 GHz)
- **Doubled bandwidth**: Two 20 MHz channels bonded
- **Higher speeds**: ~150 Mbps (802.11n), ~867 Mbps (802.11ac)
- **More interference**: Takes up two channels
- **Avoid in 2.4 GHz**: Only use in 5 GHz

### 80 MHz and 160 MHz Channels (5 GHz only)
- **Maximum speeds**: 160 MHz provides highest throughput
- **802.11ac Wave 2**: 80 MHz standard, 160 MHz optional
- **802.11ax (Wi-Fi 6)**: 80/160 MHz common
- **Limited availability**: Fewer non-overlapping channels
- **Best for**: Low-density, high-performance environments

**Channel Width Selection**:
```
Environment          | 2.4 GHz  | 5 GHz
---------------------|----------|----------
High Density         | 20 MHz   | 20-40 MHz
Medium Density       | 20 MHz   | 40-80 MHz
Low Density          | 20 MHz   | 80-160 MHz
Home/Small Office    | 20 MHz   | 40-80 MHz
```

---

## Wireless Signal Propagation

### Factors Affecting Signal Strength

**1. Distance** (Free Space Path Loss):
- Signal strength decreases with distance
- **Inverse square law**: Doubling distance reduces signal by 75% (6 dB)
- 2.4 GHz travels farther than 5 GHz

**2. Obstacles and Materials**:
Different materials attenuate (weaken) signals differently:

| Material | Signal Loss |
|----------|-------------|
| Air (line of sight) | Minimal |
| Wood, drywall | Low (3-5 dB) |
| Glass | Low-Medium (3-6 dB) |
| Brick, concrete | Medium (6-8 dB) |
| Metal, water | High (10-20+ dB) |
| Reinforced concrete | Very High (20+ dB) |

**3. Interference**:
- **Co-channel interference**: Multiple APs on same channel
- **Adjacent channel interference**: APs on overlapping channels
- **Non-Wi-Fi interference**: Microwaves, Bluetooth, cordless phones

**4. Multipath**:
- Signals reflect off surfaces and arrive at different times
- Can cause **constructive interference** (stronger signal) or **destructive interference** (weaker signal)
- Creates **dead spots** and **hot spots**

**5. Antenna Characteristics**:
- Antenna type, gain, and orientation affect coverage
- Higher gain = narrower beam but longer range

---

## SSID and BSS Concepts

### SSID (Service Set Identifier)

**SSID** is the **network name** broadcast by wireless access points:
- Maximum 32 characters
- **Case-sensitive**
- Can be **hidden** (not broadcast), but still detectable
- Multiple APs can share the same SSID (ESS)

**SSID Broadcasting**:
- **Visible**: SSID appears in available networks list
- **Hidden**: SSID not broadcast in beacon frames
  - Provides minimal security (easily discovered)
  - Requires manual SSID entry on clients

### Basic Service Set (BSS)

**BSS** is the **basic building block** of 802.11 networks:

**1. Infrastructure BSS**:
- One **access point (AP)** and associated **client stations**
- AP provides connection to wired network (distribution system)
- **BSSID**: MAC address of the AP's radio
- Most common Wi-Fi deployment

```
     [Internet]
         |
    [Router/Firewall]
         |
    [Switch]
         |
    [Access Point] <--- BSSID: AA:BB:CC:DD:EE:FF
      /    |    \
  [Laptop] [Phone] [Tablet]
  
  SSID: "CorpWiFi"
```

**2. Independent BSS (IBSS)** (Ad-Hoc):
- **Peer-to-peer** network without AP
- Clients communicate directly
- No connection to infrastructure
- Limited range and functionality
- Rarely used in modern networks

**3. Extended Service Set (ESS)**:
- **Multiple APs** with the **same SSID**
- APs connected via **distribution system** (wired network)
- Clients roam between APs seamlessly
- Each AP has unique BSSID, shared SSID
- **Enterprise Wi-Fi** deployment model

```
            [Wired Network]
                 |
    ┌────────────┼────────────┐
    |            |            |
   [AP1]       [AP2]        [AP3]
  BSSID:      BSSID:       BSSID:
  AA:BB:...   CC:DD:...    EE:FF:...
  
  All broadcast SSID: "CorpWiFi"
  Clients roam between APs automatically
```

**4. Mesh BSS (MBSS)**:
- APs wirelessly interconnect (mesh backhaul)
- No wired connection required for all APs
- Self-healing and self-configuring
- Used in outdoor and difficult-to-wire locations

---

## Wireless Frames and Management

### Frame Types

**1. Management Frames**:
- **Beacon**: AP broadcasts SSID, capabilities, channel (typically every 100ms)
- **Probe Request/Response**: Client discovers APs
- **Authentication**: Client authenticates to AP
- **Association Request/Response**: Client joins network
- **Deauthentication**: Client or AP terminates connection

**2. Control Frames**:
- **RTS/CTS** (Request to Send/Clear to Send): Collision avoidance
- **ACK** (Acknowledgment): Confirms frame receipt

**3. Data Frames**:
- Actual data transmission
- Can be encrypted

---

## Wireless Performance Factors

### Signal Strength Measurement

**RSSI** (Received Signal Strength Indicator):
- Measured in **dBm** (decibels relative to milliwatt)
- Typical range: -30 dBm (excellent) to -90 dBm (unusable)

| RSSI (dBm) | Quality | Use Case |
|------------|---------|----------|
| -30 to -50 | Excellent | VoIP, video, high throughput |
| -50 to -60 | Good | Normal use, streaming |
| -60 to -70 | Fair | Web browsing, email |
| -70 to -80 | Weak | Minimal connectivity |
| Below -80 | Very Poor | Unusable |

**SNR** (Signal-to-Noise Ratio):
- Difference between signal and background noise
- **Higher is better** (20-25 dB minimum for good performance)
- Formula: SNR = Signal (dBm) - Noise (dBm)

### Data Rates

**Modulation and Coding Schemes (MCS)**:
- Higher MCS = higher speeds but requires stronger signal
- **Adaptive rate control**: AP adjusts speed based on signal quality
- Clients near AP get high speeds, distant clients get lower speeds

**Example (802.11n)**:
- 20 MHz channel, single spatial stream
- MCS 0 (BPSK 1/2): 6.5 Mbps (robust, long range)
- MCS 7 (64-QAM 5/6): 72.2 Mbps (fast, short range)

---

## Summary

**Key Takeaways**:

1. **2.4 GHz**: Longer range, more interference, 3 non-overlapping channels (1, 6, 11)
2. **5 GHz**: Shorter range, less interference, 24+ non-overlapping channels
3. **Channel Width**: 20 MHz (compatibility) vs 40/80/160 MHz (speed)
4. **Signal Propagation**: Distance, obstacles, interference, and multipath affect performance
5. **SSID**: Network name (up to 32 characters)
6. **BSS**: Single AP with clients (Infrastructure BSS)
7. **ESS**: Multiple APs with same SSID (enterprise deployment)
8. **RSSI**: Signal strength (-30 dBm excellent, -70 dBm minimum)
9. **Beacons**: APs broadcast SSID and capabilities every ~100ms
10. **Channel Planning**: Use non-overlapping channels to minimize interference

Understanding wireless fundamentals is critical for designing efficient, high-performance Wi-Fi networks that meet coverage and capacity requirements while minimizing interference.
