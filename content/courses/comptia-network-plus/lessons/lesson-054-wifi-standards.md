---
id: lesson-054-wifi-standards
title: "Wi-Fi Standards (802.11)"
chapterId: "chapter-006-wireless-networking"
order: 54
duration: 18
objectives:
  - Compare 802.11 Wi-Fi standards (a/b/g/n/ac/ax)
  - Understand Wi-Fi generations and naming (Wi-Fi 4/5/6/6E/7)
  - Explain MIMO and MU-MIMO technologies
  - Identify maximum speeds and frequencies for each standard
  - Understand backward compatibility
---

# Wi-Fi Standards (802.11)

The **IEEE 802.11** family of standards defines wireless LAN (WLAN) technologies. Each generation brings improvements in speed, range, efficiency, and features. Understanding these standards is essential for selecting and deploying appropriate Wi-Fi solutions.

---

## Wi-Fi Standard Evolution

### Timeline and Naming

**Wi-Fi Alliance** introduced simplified naming in 2018:

| IEEE Standard | Wi-Fi Name | Year | Frequency | Max Speed* | Key Features |
|---------------|------------|------|-----------|-----------|--------------|
| 802.11b | Wi-Fi 1 | 1999 | 2.4 GHz | 11 Mbps | First widespread |
| 802.11a | Wi-Fi 2 | 1999 | 5 GHz | 54 Mbps | Less interference |
| 802.11g | Wi-Fi 3 | 2003 | 2.4 GHz | 54 Mbps | Backward compatible |
| 802.11n | Wi-Fi 4 | 2009 | 2.4/5 GHz | 600 Mbps | MIMO |
| 802.11ac | Wi-Fi 5 | 2014 | 5 GHz | 6.9 Gbps | MU-MIMO |
| 802.11ax | Wi-Fi 6/6E | 2019/2020 | 2.4/5/6 GHz | 9.6 Gbps | OFDMA, TWT |
| 802.11be | Wi-Fi 7 | 2024 | 2.4/5/6 GHz | 46 Gbps | 320 MHz, MLO |

*Max speeds are theoretical maximums with all features enabled

---

## Legacy Wi-Fi Standards

### 802.11b (Wi-Fi 1) - 1999

**Specifications**:
- **Frequency**: 2.4 GHz only
- **Max Speed**: 11 Mbps
- **Range**: ~35 meters indoors, ~100 meters outdoors
- **Modulation**: DSSS (Direct Sequence Spread Spectrum)
- **Channels**: 3 non-overlapping (1, 6, 11)

**Legacy Technology**:
- First widespread consumer Wi-Fi
- **Obsolete**: No longer used
- Slows down entire network if present (legacy rate support)

---

### 802.11a (Wi-Fi 2) - 1999

**Specifications**:
- **Frequency**: 5 GHz only
- **Max Speed**: 54 Mbps
- **Range**: ~30 meters indoors, ~75 meters outdoors (shorter than 2.4 GHz)
- **Modulation**: OFDM (Orthogonal Frequency Division Multiplexing)
- **Channels**: Up to 24 non-overlapping

**Advantages**:
- Less interference than 2.4 GHz
- More channels available
- Higher speeds than 802.11b

**Limitations**:
- Not compatible with 802.11b
- Shorter range
- Less adoption than 802.11b

---

### 802.11g (Wi-Fi 3) - 2003

**Specifications**:
- **Frequency**: 2.4 GHz only
- **Max Speed**: 54 Mbps
- **Range**: ~35 meters indoors, ~100 meters outdoors
- **Modulation**: OFDM (like 802.11a)
- **Backward Compatible**: With 802.11b

**Improvements**:
- Combines speed of 802.11a with range of 802.11b
- Backward compatible with 802.11b devices
- Most popular standard until 802.11n

**Limitations**:
- 802.11b devices slow down network
- Only 3 non-overlapping channels (2.4 GHz)
- Interference from 2.4 GHz devices

---

## Modern Wi-Fi Standards

### 802.11n (Wi-Fi 4) - 2009

**Major breakthrough** that significantly improved Wi-Fi performance.

**Specifications**:
- **Frequency**: 2.4 GHz and/or 5 GHz (dual-band)
- **Max Speed**: 600 Mbps (theoretical, 4 spatial streams)
- **Range**: ~70 meters indoors, ~250 meters outdoors
- **Channel Width**: 20 MHz or 40 MHz
- **MIMO**: Up to 4x4 (4 transmit, 4 receive antennas)

**Key Technologies**:

**1. MIMO (Multiple Input Multiple Output)**:
- Multiple antennas transmit and receive simultaneously
- **Spatial streams**: Independent data streams
- Configurations: 1x1, 2x2, 3x3, 4x4
- Example: 2x2 MIMO = 2 transmit, 2 receive antennas

```
Speeds by Configuration (40 MHz channel):
1x1: 150 Mbps
2x2: 300 Mbps
3x3: 450 Mbps
4x4: 600 Mbps
```

**2. Channel Bonding**:
- Combine two 20 MHz channels into one 40 MHz channel
- Doubles bandwidth (speed)
- **Only use 40 MHz in 5 GHz** (too crowded in 2.4 GHz)

**3. Frame Aggregation**:
- Combines multiple frames to reduce overhead
- Improves efficiency

**Backward Compatibility**:
- Works with 802.11a/b/g devices
- Dual-band APs support both 2.4 GHz and 5 GHz

**Common Real-World Speeds**:
- 2x2 MIMO, 40 MHz: ~150-200 Mbps
- 3x3 MIMO, 40 MHz: ~300-400 Mbps

---

### 802.11ac (Wi-Fi 5) - 2014

**5 GHz only** standard focused on **gigabit speeds**.

**Specifications**:
- **Frequency**: 5 GHz only (no 2.4 GHz)
- **Max Speed**: 6.9 Gbps (theoretical, 8 spatial streams)
- **Range**: Similar to 802.11n (5 GHz)
- **Channel Width**: 20, 40, 80, 160 MHz
- **MIMO**: Up to 8x8 (Wave 2)

**Two Waves**:

**Wave 1 (2013)**:
- Up to 80 MHz channels
- 3x3 MIMO
- ~1.3 Gbps maximum
- Single-user MIMO

**Wave 2 (2015)**:
- 160 MHz channels (optional)
- 4x4 MIMO (common), up to 8x8
- **MU-MIMO** (Multi-User MIMO)
- ~3.5 Gbps typical maximum

**Key Technologies**:

**1. MU-MIMO (Multi-User MIMO)**:
- **Simultaneous transmission** to multiple clients
- Wave 2 feature
- **Downlink only** (AP to clients)
- Up to 4 clients simultaneously
- Requires compatible clients

```
Without MU-MIMO:
AP → [Client 1] (wait) → [Client 2] (wait) → [Client 3]

With MU-MIMO:
AP → [Client 1] + [Client 2] + [Client 3] (simultaneously)
```

**2. Beamforming**:
- Focuses signal toward specific client
- Improves range and throughput
- Standard feature in 802.11ac

**3. Wider Channels**:
- 80 MHz standard
- 160 MHz optional (Wave 2)
- More bandwidth = higher speeds

**4. Higher Modulation**:
- 256-QAM (vs 64-QAM in 802.11n)
- More bits per symbol = higher speeds
- Requires strong signal

**Common Real-World Speeds**:
- 2x2 MIMO, 80 MHz: ~400-600 Mbps
- 3x3 MIMO, 80 MHz: ~900-1200 Mbps
- 4x4 MIMO, 160 MHz: ~1500-2000 Mbps

---

### 802.11ax (Wi-Fi 6 and Wi-Fi 6E) - 2019/2020

**Revolutionary standard** focused on **efficiency** and **high-density environments**.

**Specifications**:
- **Frequency**: 
  - **Wi-Fi 6**: 2.4 GHz and 5 GHz
  - **Wi-Fi 6E**: 2.4 GHz, 5 GHz, and **6 GHz**
- **Max Speed**: 9.6 Gbps (theoretical)
- **Channel Width**: 20, 40, 80, 160 MHz
- **MIMO**: Up to 8x8

**Key Technologies**:

**1. OFDMA (Orthogonal Frequency Division Multiple Access)**:
- **Game changer** for efficiency
- Divides channel into smaller sub-channels (**Resource Units**)
- Multiple clients transmit **simultaneously** within same channel
- Reduces latency, improves efficiency in crowded networks

```
Without OFDMA (802.11ac):
[Client A uses full 80 MHz] → [Client B uses full 80 MHz]

With OFDMA (802.11ax):
[Client A: 20 MHz | Client B: 20 MHz | Client C: 20 MHz | Client D: 20 MHz]
All transmit simultaneously within 80 MHz channel
```

**2. MU-MIMO Enhancement**:
- **Uplink and downlink** (802.11ac was downlink only)
- Up to 8 clients simultaneously
- Works with OFDMA

**3. Target Wake Time (TWT)**:
- Schedules when clients wake up to transmit/receive
- **Massive battery savings** for IoT devices
- Reduces contention

**4. 1024-QAM**:
- Even higher modulation than 256-QAM
- 25% speed increase over 802.11ac
- Requires excellent signal quality

**5. BSS Coloring**:
- Identifies neighboring networks
- Reduces co-channel interference
- Allows spatial reuse

**Wi-Fi 6E** (2020):
- Adds **6 GHz band** (5.925 - 7.125 GHz)
- **1200 MHz** of new spectrum
- Up to 7 non-overlapping 160 MHz channels (or 14 at 80 MHz)
- Less congestion, no legacy devices
- Requires new hardware

**Benefits**:
- **4x capacity improvement** in dense environments
- 37% faster speeds (real-world)
- Better battery life (TWT)
- Lower latency
- Designed for IoT and smart homes

**Common Real-World Speeds**:
- 2x2 MIMO, 80 MHz: ~600-900 Mbps
- 4x4 MIMO, 160 MHz: ~2000-3000 Mbps

---

### 802.11be (Wi-Fi 7) - 2024

**Latest standard** (still emerging) with **extreme performance**.

**Specifications**:
- **Frequency**: 2.4 GHz, 5 GHz, 6 GHz
- **Max Speed**: 46 Gbps (theoretical)
- **Channel Width**: 20, 40, 80, 160, **320 MHz**
- **MIMO**: Up to 16x16

**Key Technologies**:

**1. 320 MHz Channels** (6 GHz only):
- Doubles bandwidth compared to 160 MHz
- Extremely high throughput

**2. 4096-QAM**:
- 20% speed improvement over 1024-QAM
- Requires exceptional signal quality

**3. Multi-Link Operation (MLO)**:
- Simultaneous transmission on multiple bands
- Aggregate 2.4 + 5 + 6 GHz
- Improves reliability and speed
- Reduces latency

**4. Multi-RU (Resource Unit)**:
- Single client can use multiple RUs
- Better efficiency

**Use Cases**:
- 8K video streaming
- Virtual reality
- Cloud gaming
- Enterprise high-density

---

## Comparing Wi-Fi Standards

### Speed Comparison (Typical 2x2 MIMO)

| Standard | 20 MHz | 40 MHz | 80 MHz | 160 MHz |
|----------|--------|--------|--------|---------|
| 802.11n | 72 Mbps | 150 Mbps | - | - |
| 802.11ac | 87 Mbps | 200 Mbps | 433 Mbps | 867 Mbps |
| 802.11ax | 143 Mbps | 287 Mbps | 600 Mbps | 1200 Mbps |

### Feature Comparison

| Feature | 802.11n | 802.11ac | 802.11ax |
|---------|---------|----------|----------|
| Frequency | 2.4/5 GHz | 5 GHz | 2.4/5/6 GHz |
| Max Spatial Streams | 4 | 8 | 8 |
| Max Channel Width | 40 MHz | 160 MHz | 160 MHz |
| Modulation | 64-QAM | 256-QAM | 1024-QAM |
| MU-MIMO | No | Downlink | Up/Down |
| OFDMA | No | No | Yes |
| Best For | Basic use | High speed | Capacity |

---

## Backward Compatibility

**All 802.11 standards are backward compatible** within the same frequency:

- **802.11ac** AP supports 802.11n/a devices (5 GHz)
- **802.11n** AP supports 802.11g/b devices (2.4 GHz) and 802.11a devices (5 GHz)
- **802.11ax** AP supports all previous standards

**Mixed Environment Impact**:
- Legacy devices (802.11b/g) slow down entire network
- **Disable legacy rates** (1, 2, 5.5, 11 Mbps) for better performance
- Use minimum data rate of 12 or 24 Mbps

---

## Summary

**Key Takeaways**:

1. **802.11n (Wi-Fi 4)**: First MIMO, dual-band, up to 600 Mbps
2. **802.11ac (Wi-Fi 5)**: 5 GHz only, MU-MIMO, gigabit speeds, up to 6.9 Gbps
3. **802.11ax (Wi-Fi 6/6E)**: OFDMA, better efficiency, 6 GHz (6E), up to 9.6 Gbps
4. **802.11be (Wi-Fi 7)**: 320 MHz channels, MLO, up to 46 Gbps
5. **MIMO**: Multiple antennas for simultaneous transmission (802.11n+)
6. **MU-MIMO**: Multiple users simultaneously (802.11ac Wave 2+)
7. **OFDMA**: Multiple users within same channel (802.11ax+)
8. **Channel Width**: 20/40 MHz (n), 80/160 MHz (ac/ax), 320 MHz (be)
9. **Backward Compatibility**: All standards support previous generations
10. **Wi-Fi 6**: Best for high-density environments (offices, stadiums, apartments)

**Choosing a Standard**:
- **New deployments**: Wi-Fi 6/6E (802.11ax)
- **High performance**: Wi-Fi 5 (802.11ac) minimum
- **IoT/Smart home**: Wi-Fi 6 (TWT for battery life)
- **Future-proofing**: Wi-Fi 6E or Wi-Fi 7

Understanding Wi-Fi standards enables you to select appropriate equipment and design networks that meet performance, capacity, and compatibility requirements.
