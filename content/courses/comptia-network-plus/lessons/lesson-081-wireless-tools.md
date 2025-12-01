---
id: "lesson-081"
title: "Wireless Troubleshooting Tools: WiFi and Spectrum Analyzers"
chapterId: "chapter-09"
order: 81
duration: 25
objectives:
  - "Use WiFi analyzers to assess wireless network performance and identify issues"
  - "Interpret spectrum analyzer data to detect interference sources"
  - "Optimize wireless network placement and channel selection using analyzer tools"
  - "Troubleshoot common wireless connectivity and performance problems"
---

# Wireless Troubleshooting Tools: WiFi and Spectrum Analyzers

## Introduction

Wireless networks present unique troubleshooting challenges compared to wired networks. Signal interference, channel congestion, RF (Radio Frequency) obstacles, and competing access points can all degrade performance or cause connectivity failures. Unlike wired connections where issues are often localized to a specific cable or port, wireless problems require specialized tools to visualize the invisible RF environment.

In this lesson, we'll explore **WiFi analyzers** (also called WLAN scanners) and **spectrum analyzers**, two essential tool categories for wireless network troubleshooting. WiFi analyzers operate at Layer 2/3, showing available networks, signal strength, and channel usage. Spectrum analyzers operate at Layer 1 (Physical), detecting all RF energy including non-WiFi sources of interference. Together, these tools provide comprehensive wireless diagnostics capabilities.

---

## WiFi Analyzers (WLAN Scanners)

### What is a WiFi Analyzer?

A **WiFi analyzer** (Wireless LAN analyzer or WLAN scanner) is software or hardware that detects and displays information about nearby wireless networks. It shows details about access points, signal strength, channels, security settings, and interference from other WiFi networks.

**Primary Functions**:
- Discover all WiFi networks in range
- Measure signal strength (RSSI) for each network
- Identify channel usage and overlap
- Detect rogue access points
- Optimize AP placement
- Troubleshoot connectivity issues
- Perform site surveys for new deployments

**Types of WiFi Analyzers**:
- **Software-based**: Applications for Windows, macOS, Linux, iOS, Android
- **Hardware-based**: Dedicated devices with specialized antennas
- **Built-in**: Many operating systems include basic WiFi scanning capabilities

**Cost Range**:
- **Free apps**: Basic WiFi scanning (iOS, Android, Windows)
- **Professional software**: $50-$500 (advanced features, reporting)
- **Enterprise hardware**: $500-$5,000+ (multiple radios, spectrum analysis)

### Popular WiFi Analyzer Tools

**Windows**:
- **inSSIDer** (MetaGeek): Popular commercial WiFi analyzer
- **NetSpot**: Site survey and WiFi analysis
- **Acrylic WiFi**: Free and professional versions
- **Windows 10/11**: Built-in `netsh wlan show networks mode=bssid`

**macOS**:
- **WiFi Explorer**: Professional WiFi scanner
- **NetSpot**: Cross-platform site survey tool
- **macOS Built-in**: Hold Option key, click WiFi icon (limited info)

**Linux**:
- **LinSSID**: GUI WiFi scanner
- **Kismet**: Advanced wireless detector
- **wavemon**: Terminal-based WiFi monitor
- **iwlist**: Command-line scanning (`iwlist wlan0 scan`)

**iOS**:
- **Airport Utility**: Apple's free WiFi scanner (enable in Settings)
- **WiFi SweetSpots**: Signal strength meter
- **WiFi Analyzer** (various apps): Basic scanning capabilities

**Android**:
- **WiFi Analyzer** (by farproc): Popular free app
- **NetSpot**: Professional site survey
- **Ubiquiti WiFiman**: Free, comprehensive WiFi analysis

**Enterprise/Professional**:
- **Ekahau Site Survey**: Industry-standard site survey tool
- **AirMagnet**: Comprehensive WLAN analysis
- **NetAlly (AirCheck)**: Handheld WiFi tester

### Key WiFi Analyzer Metrics

**SSID (Service Set Identifier)**:
- Network name broadcast by access point
- Multiple APs can share same SSID (ESS - Extended Service Set)
- Hidden SSIDs don't broadcast name (but still detectable)

**BSSID (Basic Service Set Identifier)**:
- MAC address of specific access point radio
- Unique identifier for each AP
- Format: XX:XX:XX:XX:XX:XX
- Used to distinguish multiple APs with same SSID

**Signal Strength (RSSI)**:
- **RSSI** (Received Signal Strength Indicator)
- Measured in **dBm** (decibels relative to 1 milliwatt)
- Negative scale: closer to 0 = stronger signal
- **Typical ranges**:
  - **-30 to -50 dBm**: Excellent (very close to AP)
  - **-50 to -60 dBm**: Good (normal working distance)
  - **-60 to -70 dBm**: Fair (acceptable for most uses)
  - **-70 to -80 dBm**: Weak (may have issues)
  - **-80 to -90 dBm**: Very weak (unreliable)
  - **Below -90 dBm**: Unusable

**Channel**:
- Radio frequency channel AP is using
- **2.4 GHz**: Channels 1-11 (US), 1-13 (Europe), 1-14 (Japan)
- **5 GHz**: Channels 36, 40, 44, 48 (UNII-1), 52-64 (UNII-2), 100-144 (UNII-2 Extended), 149-165 (UNII-3)
- **6 GHz**: Channels 1-233 (WiFi 6E)

**Security**:
- **Open**: No encryption (insecure)
- **WEP**: Deprecated, easily cracked (insecure)
- **WPA**: Better than WEP but vulnerable
- **WPA2**: Current standard (AES encryption)
- **WPA3**: Latest standard (enhanced security)
- **Enterprise**: 802.1X authentication (RADIUS)

**Data Rate (Link Speed)**:
- Maximum theoretical speed supported by AP
- Examples: 54 Mbps (802.11g), 300 Mbps (802.11n), 866 Mbps (802.11ac)
- Actual throughput significantly lower (40-60% typical)

**Frequency Band**:
- **2.4 GHz**: Longer range, more interference, slower speeds
- **5 GHz**: Shorter range, less interference, faster speeds
- **6 GHz**: Shortest range, minimal interference, fastest speeds (WiFi 6E)

**802.11 Standard**:
- **802.11b**: 2.4 GHz, up to 11 Mbps (legacy)
- **802.11g**: 2.4 GHz, up to 54 Mbps (legacy)
- **802.11n** (WiFi 4): 2.4/5 GHz, up to 600 Mbps
- **802.11ac** (WiFi 5): 5 GHz, up to 6.9 Gbps
- **802.11ax** (WiFi 6/6E): 2.4/5/6 GHz, up to 9.6 Gbps

### Using a WiFi Analyzer (Practical Example)

**Scenario**: Office users complaining about slow WiFi on 2.4 GHz network.

**Step 1: Launch WiFi Analyzer**

Using **WiFi Analyzer** on Android:

1. Open WiFi Analyzer app
2. Grant location permissions (required for WiFi scanning)
3. View detected networks

**Step 2: View Channel Graph**

```
Channel Graph (2.4 GHz):

Signal
Strength
  -30 dBm  ╔════╗
           ║    ║
  -40 dBm  ║    ║    ╔═══╗
           ║    ║    ║   ║╔══╗
  -50 dBm  ║    ║╔═══║   ║║  ║
           ║    ║║   ║   ║║  ║╔═╗
  -60 dBm  ║    ║║   ║   ║║  ║║ ║
           ║    ║║   ║   ║║  ║║ ║
  -70 dBm  ║    ║║   ║   ║║  ║║ ║
           ╚════╝╝   ╚═══╝╚══╝╚═╝
           1    6    6    11  11 11   Channels

Networks:
- Office_WiFi (Ch 6, -45 dBm) [YOUR NETWORK]
- Neighbor_WiFi (Ch 6, -55 dBm)
- Guest_Net (Ch 11, -60 dBm)
- Home_Network (Ch 11, -65 dBm)
- Default_AP (Ch 1, -70 dBm)
```

**Analysis**:
- **Office_WiFi on Channel 6**: Overlaps with Neighbor_WiFi (also Ch 6)
- **Co-channel interference**: Two strong networks on same channel
- **Solution**: Move Office_WiFi to Channel 1 (less congested)

**Step 3: Measure Signal Strength at Different Locations**

Walk around office with WiFi analyzer:

```
Location                 RSSI        Status
─────────────────────────────────────────────
Near AP (5 feet)        -35 dBm     Excellent
Desk #1 (20 feet)       -52 dBm     Good
Desk #2 (30 feet)       -58 dBm     Good
Conference Room         -68 dBm     Fair
Break Room              -75 dBm     Weak
Far Corner              -82 dBm     Very Weak (unusable)
```

**Analysis**:
- **Far corner**: Signal too weak (-82 dBm)
- **Break room**: Marginal signal (-75 dBm)
- **Solution**: Add second AP to cover weak areas

**Step 4: Check for Rogue APs**

Review detected networks:

```
SSID               BSSID              Signal    Security
───────────────────────────────────────────────────────────
Office_WiFi        00:11:22:33:44:55  -45 dBm   WPA2
Office_WiFi        AA:BB:CC:DD:EE:FF  -50 dBm   WPA2  [Authorized]
Guest_Network      00:11:22:33:44:56  -48 dBm   WPA2  [Authorized]
Free_WiFi          12:34:56:78:90:AB  -55 dBm   Open  [ROGUE!]
Neighbor_WiFi      98:76:54:32:10:FE  -55 dBm   WPA2
```

**Analysis**:
- **Free_WiFi**: Unknown network with strong signal
- **Open security**: No encryption (suspicious)
- **Action**: Investigate - could be rogue AP or evil twin attack

### 2.4 GHz Channel Planning

**Channel Overlap Problem**:

2.4 GHz WiFi channels are **22 MHz wide**, but only **5 MHz apart**. This causes significant overlap:

```
Channel Layout (2.4 GHz, US):

Frequency (MHz)
2400        2410        2420        2430        2440        2450        2460        2470        2480
  │           │           │           │           │           │           │           │           │
  ├───Ch1─────┤
        ├───Ch2─────┤
              ├───Ch3─────┤
                    ├───Ch4─────┤
                          ├───Ch5─────┤
                                ├───Ch6─────┤
                                      ├───Ch7─────┤
                                            ├───Ch8─────┤
                                                  ├───Ch9─────┤
                                                        ├───Ch10────┤
                                                              ├───Ch11────┤
```

**Non-Overlapping Channels**:
- Only **3 non-overlapping channels**: 1, 6, and 11
- **Best practice**: Use only channels 1, 6, and 11 in 2.4 GHz
- Avoid channels 2-5, 7-10 (will interfere with 1, 6, or 11)

**Multi-AP Channel Plan** (2.4 GHz):

```
Floor Plan:

   AP1 (Ch 1)         AP2 (Ch 6)         AP3 (Ch 11)
      ◉                  ◉                   ◉
     ╱│╲                ╱│╲                 ╱│╲
    ╱ │ ╲              ╱ │ ╲               ╱ │ ╲
   ────────────────────────────────────────────────
   AP4 (Ch 6)         AP5 (Ch 11)        AP6 (Ch 1)
      ◉                  ◉                   ◉
```

**Principles**:
- Adjacent APs use different channels
- Maintain 20-30 feet separation for channel reuse
- Minimize overlap between same-channel APs

### 5 GHz Channel Planning

**5 GHz Advantages**:
- **More channels available**: 24+ non-overlapping channels (region-dependent)
- **Less interference**: Fewer devices use 5 GHz
- **Higher speeds**: Wider channels (40, 80, 160 MHz) available
- **Less crowded**: Not as many neighboring networks

**5 GHz Channel Bands** (US):

```
UNII-1 (Indoor):
Channels 36, 40, 44, 48
No DFS required
Lower power (typically 100-200mW)

UNII-2 (Indoor/Outdoor):
Channels 52, 56, 60, 64
DFS required (radar detection)
Higher power allowed

UNII-2 Extended:
Channels 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144
DFS required
Weather radar detection

UNII-3 (Indoor/Outdoor):
Channels 149, 153, 157, 161, 165
No DFS required
Higher power allowed (up to 1W)
```

**Channel Width Selection**:

**20 MHz** (Narrow):
- Maximum number of non-overlapping channels
- Best for high-density deployments
- Lower throughput but more reliable

**40 MHz** (Medium):
- Doubles throughput vs. 20 MHz
- Reduces available channels (12 non-overlapping)
- Good balance for most environments

**80 MHz** (Wide):
- 4x throughput vs. 20 MHz (802.11ac/ax)
- Only 6 non-overlapping channels
- Best for low-density, high-speed environments

**160 MHz** (Very Wide):
- Maximum throughput (802.11ac Wave 2/ax)
- Only 2 non-overlapping channels
- Limited availability, DFS required
- Best for dedicated point-to-point links

**WiFi Analyzer Recommendation**:
- Shows channel width of each AP
- Identifies overlapping wide channels
- Suggests optimal channel selection

---

## Spectrum Analyzers

### What is a Spectrum Analyzer?

A **spectrum analyzer** is a tool that displays RF (Radio Frequency) energy across a frequency range, showing both WiFi and non-WiFi sources of interference. Unlike WiFi analyzers that only detect 802.11 networks, spectrum analyzers show ALL RF energy, including:

- WiFi networks (802.11a/b/g/n/ac/ax)
- Bluetooth devices
- Microwave ovens
- Cordless phones
- Baby monitors
- Wireless security cameras
- Zigbee/Z-Wave devices
- Wireless video transmitters
- RF jammers
- Radar systems
- Any device emitting RF energy

**Primary Functions**:
- Detect non-WiFi interference sources
- Identify "hidden" RF devices
- Measure RF noise floor
- Troubleshoot intermittent connectivity issues
- Locate RF jammers or unauthorized transmitters
- Optimize AP placement to avoid interference

**Cost Range**:
- **USB spectrum analyzers**: $300-$1,000 (entry-level)
- **Handheld spectrum analyzers**: $1,500-$5,000 (professional)
- **Enterprise WLAN tools with spectrum analysis**: $3,000-$10,000+
- **Benchtop spectrum analyzers**: $10,000-$100,000+ (lab-grade)

### Spectrum Analyzer Display

**Typical Display**:

```
Amplitude
(dBm)
  -30 │                    ▄▄▄
      │                  ▄█████▄
  -40 │           ▄▄   ▄███████▄
      │         ▄████▄▄█████████
  -50 │     ▄▄▄███████████████████▄    ▄▄
      │   ▄█████████████████████████▄▄████
  -60 │ ▄████████████████████████████████
      │▄██████████████████████████████████
  -70 │████████████████████████████████████
      │████████████████████████████████████
  -80 │████████████████████████████████████
      └────────────────────────────────────
       2.400  2.420  2.440  2.460  2.480 GHz
           2.4 GHz Frequency Spectrum

Legend:
█ = WiFi signals (802.11)
▄ = Non-WiFi interference (microwave, Bluetooth, etc.)
Baseline = Noise floor
```

**Display Elements**:

**X-Axis (Frequency)**:
- Shows frequency range (e.g., 2.400-2.483 GHz for 2.4 GHz band)
- **Span**: Width of frequency range displayed
- **Center frequency**: Middle of displayed range

**Y-Axis (Amplitude)**:
- Signal strength in dBm
- Higher on graph = stronger signal
- **Noise floor**: Baseline RF energy level

**Traces**:
- **Real-time**: Current snapshot of RF environment
- **Max hold**: Maximum values seen over time (useful for intermittent interference)
- **Average**: Averaged values over time (smooths fluctuations)

**Markers**:
- Place markers on peaks to read exact frequency and amplitude
- Compare signal levels at different frequencies

### Common Interference Sources

**Microwave Ovens**:
- **Frequency**: 2.45 GHz (center of 2.4 GHz WiFi band)
- **Pattern**: Very strong, broadband interference when operating
- **Duration**: Intermittent (cycles on/off during heating)
- **Impact**: Severe performance degradation, packet loss, disconnections
- **Solution**: Keep APs away from microwave ovens, use 5 GHz band

**Spectrum Signature**:
```
Amplitude
(dBm)
  -20 │           ▀▀▀▀▀▀▀▀▀▀▀
      │         ▀▀           ▀▀
  -30 │       ▀▀               ▀▀
      │     ▀▀                   ▀▀
  -40 │   ▀▀                       ▀▀
      │ ▀▀                           ▀▀
  -50 │▀                               ▀
      └──────────────────────────────────
       2.400   2.437 2.450 2.463   2.483 GHz
              [Microwave @ 2.45 GHz]
```

**Bluetooth Devices**:
- **Frequency**: 2.402-2.480 GHz (79 channels)
- **Pattern**: Fast frequency hopping (1600 hops/second)
- **Bandwidth**: 1 MHz per channel
- **Impact**: Moderate (frequency hopping minimizes impact)
- **Solution**: Generally coexists well with WiFi, use 5 GHz for critical applications

**Cordless Phones (2.4 GHz)**:
- **Frequency**: 2.4 GHz band (older models)
- **Pattern**: Continuous when in use, specific channel
- **Impact**: High on occupied channel
- **Solution**: Replace with 5.8 GHz or DECT 6.0 phones, use 5 GHz WiFi

**Baby Monitors / Wireless Cameras**:
- **Frequency**: 2.4 GHz (analog) or specific channels
- **Pattern**: Continuous transmission
- **Bandwidth**: Wide (20-30 MHz typical)
- **Impact**: High, constant interference
- **Solution**: Replace with WiFi-based IP cameras, relocate transmitters

**Wireless Video Transmitters**:
- **Frequency**: 2.4 GHz or 5.8 GHz
- **Pattern**: Continuous, high power
- **Bandwidth**: Very wide (40+ MHz)
- **Impact**: Severe, can overwhelm entire band
- **Solution**: Change WiFi channels, relocate equipment, use wired video

**Zigbee / Z-Wave (Home Automation)**:
- **Frequency**: 2.4 GHz (Zigbee), 908 MHz (Z-Wave US)
- **Pattern**: Sporadic low-power transmissions
- **Impact**: Low to moderate
- **Solution**: Usually coexists well, use WiFi channel 1 or 11 (Zigbee often uses channel 15+)

**Adjacent WiFi Networks**:
- **Frequency**: Same band and overlapping channels
- **Pattern**: Continuous, follows 802.11 protocol
- **Impact**: Moderate to high depending on signal strength
- **Solution**: Choose non-overlapping channels, adjust AP power

**RF Jammers** (Illegal):
- **Frequency**: Specific band or wideband
- **Pattern**: Continuous noise across frequency range
- **Impact**: Severe, intentional denial of service
- **Solution**: Locate and remove jammer, contact authorities

### Duty Cycle Analysis

**Duty Cycle** is the percentage of time a device is transmitting.

**Calculation**:
```
Duty Cycle = (Transmit Time / Total Time) × 100%
```

**Spectrum Analyzer Duty Cycle Display**:

```
Channel   Frequency    Duty Cycle   Interference Type
───────────────────────────────────────────────────────
Ch 1      2.412 GHz    45%          WiFi + Bluetooth
Ch 6      2.437 GHz    78%          WiFi + Microwave (intermittent)
Ch 11     2.462 GHz    35%          WiFi
```

**Interpretation**:
- **<50% duty cycle**: Light to moderate usage, acceptable
- **50-70% duty cycle**: Heavy usage, may see congestion
- **>70% duty cycle**: Severe congestion or interference
- **100% duty cycle**: Continuous transmitter (jammer or analog device)

**Microwave Oven Example**:
- **When idle**: 5% duty cycle (background noise only)
- **When heating**: 95% duty cycle (intense interference)
- **Pattern**: Spikes to 95% for 30 seconds, drops to 5%, repeats

### Troubleshooting with Spectrum Analyzer

**Scenario 1: Intermittent WiFi Disconnections**

**Symptoms**:
- Users report random disconnections on 2.4 GHz network
- Disconnections occur around noon daily
- No pattern in WiFi analyzer logs

**Spectrum Analyzer Investigation**:

1. **Set to 2.4 GHz band** (2.400-2.483 GHz)
2. **Enable max hold trace**
3. **Monitor during problem time** (around noon)

**Findings**:
```
Time: 12:00 PM
Spectrum shows massive spike at 2.45 GHz
Amplitude: -20 dBm (very strong)
Duration: 2-3 minute bursts
Pattern: Broadband interference centered at 2.45 GHz
```

**Diagnosis**: Microwave oven in break room
- Staff heating lunch at noon causes interference
- Microwave physically close to AP

**Solution**:
- Relocate AP away from break room
- Switch to 5 GHz network
- Schedule non-critical tasks during lunch hour

**Scenario 2: Low Throughput in Specific Area**

**Symptoms**:
- Conference room WiFi very slow
- Good signal strength (-55 dBm)
- WiFi analyzer shows no competing APs

**Spectrum Analyzer Investigation**:

1. **Scan 2.4 GHz band in conference room**
2. **Review spectrum display**

**Findings**:
```
Continuous transmission at 2.425 GHz
Bandwidth: 30 MHz
Amplitude: -45 dBm
Pattern: Constant (100% duty cycle)
```

**Physical Investigation**:
- Wireless presentation system found in conference room
- Transmits continuously even when not in use

**Solution**:
- Replace with wired presentation system
- Switch to 5 GHz WiFi in conference room
- Power off wireless transmitter when not needed

---

## Site Surveys

### What is a WiFi Site Survey?

A **WiFi site survey** is a comprehensive assessment of a location to determine optimal placement and configuration of wireless access points. Site surveys use WiFi analyzers and spectrum analyzers to:

- Map existing RF environment
- Identify interference sources
- Determine AP quantity and placement
- Validate coverage and performance
- Document baseline for future troubleshooting

**Types of Site Surveys**:

**Passive Survey**:
- Walk around with WiFi analyzer
- Measure signal strength of existing networks
- No configuration changes
- Used for: Existing network assessment, troubleshooting

**Active Survey**:
- Connect to WiFi network while walking
- Measure actual throughput and performance
- Tests client experience
- Used for: Performance validation, user experience testing

**Predictive Survey**:
- Software simulation based on floor plan
- Predicts coverage before installation
- No physical visit required
- Used for: Planning new installations, budgeting

### Conducting a Basic Site Survey

**Equipment Needed**:
- WiFi analyzer software (e.g., Ekahau, NetSpot, inSSIDer)
- Laptop or tablet with WiFi adapter
- Floor plan or building map
- Measuring tape or laser distance meter
- Spectrum analyzer (optional but recommended)
- Camera for documentation

**Procedure**:

**Step 1: Pre-Survey Planning**
- Obtain building floor plans (CAD or PDF)
- Identify areas requiring coverage
- Note construction materials (drywall, concrete, metal)
- Identify potential interference sources
- Define coverage requirements (minimum RSSI, throughput)

**Step 2: RF Environment Scan**
- Use spectrum analyzer to identify interference
- Document existing WiFi networks
- Note RF noise floor levels
- Identify dead zones or high-interference areas

**Step 3: Coverage Mapping**
- Walk predefined path or grid pattern
- Record signal strength at regular intervals (every 10-15 feet)
- Mark measurements on floor plan
- Test from user height (not ceiling where AP is mounted)

**Step 4: Performance Testing**
- Conduct active survey (connected throughput tests)
- Test at various distances from APs
- Verify roaming between APs
- Test throughput in critical areas

**Step 5: Analysis and Recommendations**
- Generate heatmap of coverage
- Identify gaps or weak areas
- Recommend AP placement
- Specify channel plan
- Document interference mitigation strategies

**Sample Coverage Requirements**:
- **Offices**: -65 dBm minimum, -55 dBm target
- **Conference rooms**: -60 dBm minimum (high density)
- **Warehouses**: -70 dBm minimum (IoT devices)
- **Outdoor**: -75 dBm minimum (extended range)

### Heatmap Interpretation

**Signal Strength Heatmap**:

```
Color Legend:
[  ] -30 to -50 dBm  Excellent (dark green)
[  ] -50 to -60 dBm  Good (light green)
[  ] -60 to -70 dBm  Fair (yellow)
[  ] -70 to -80 dBm  Weak (orange)
[  ] -80 to -90 dBm  Very Weak (red)

Floor Plan:

    ┌──────────────────────────────────────┐
    │ [██]                           [░░]  │ Offices
    │  AP1                            AP2  │
    │ [██][▓▓]                  [░░][▒▒]  │
    │ [▓▓][▓▓][▒▒]         [▒▒][▒▒][▒▒]  │
    │ [▒▒][▒▒][▒▒][░░] [░░][▒▒][▒▒][▓▓]  │
    │                                      │
    │ [░░][░░][░░][  ][  ][▒▒][░░][░░]  │ Conference
    │                 |  |                │ Rooms
    │ [░░][▒▒][▒▒][▒▒][▒▒][▓▓][██]       │
    │                           AP3        │
    └──────────────────────────────────────┘
```

**Analysis**:
- **Excellent coverage** (dark green) near each AP
- **Weak coverage** (orange/red) in center area between AP1 and AP2
- **Solution**: Add AP between AP1 and AP2, or increase AP power

---

## Best Practices for Wireless Troubleshooting

### 1. Start with WiFi Analyzer
- Check for competing networks on same channel
- Verify signal strength is adequate (-60 dBm or better)
- Look for rogue or unauthorized APs
- Identify channel congestion

### 2. Use Spectrum Analyzer for Unexplained Issues
- Intermittent problems not explained by WiFi analysis
- Good WiFi signal but poor performance
- Disconnections at specific times
- Entire band affected

### 3. Optimize Channel Selection
- **2.4 GHz**: Use only channels 1, 6, 11
- **5 GHz**: Use non-DFS channels when possible (36-48, 149-165)
- Avoid overlapping channels with neighboring APs
- Consider 20 MHz channel width in high-density environments

### 4. Maintain Adequate Signal Strength
- **Minimum**: -70 dBm for basic connectivity
- **Target**: -60 dBm or better for good performance
- **Excellent**: -50 dBm or better
- Plan for 15-20% coverage overlap between APs

### 5. Document Baseline Performance
- Conduct site survey before issues arise
- Save WiFi analyzer and spectrum analyzer captures
- Note RF noise floor levels
- Track changes over time

### 6. Address Physical Layer Issues
- Identify and relocate interference sources
- Replace 2.4 GHz devices with 5 GHz or wired alternatives
- Use directional antennas to focus coverage
- Adjust AP transmit power (not always "maximum is best")

### 7. Regular Monitoring
- Periodic site surveys (annually or after changes)
- Monitor for new interference sources
- Check for rogue APs monthly
- Update channel plans as RF environment changes

---

## Summary

In this lesson, we explored wireless troubleshooting tools:

**WiFi Analyzers (WLAN Scanners)**:
- Display information about WiFi networks in range
- Key metrics: SSID, BSSID, RSSI (signal strength), channel, security
- **Signal strength interpretation**:
  - -30 to -50 dBm: Excellent
  - -50 to -60 dBm: Good
  - -60 to -70 dBm: Fair
  - Below -70 dBm: Weak
- **2.4 GHz**: Use only channels 1, 6, 11 (non-overlapping)
- **5 GHz**: Many non-overlapping channels available
- Tools: inSSIDer, NetSpot, WiFi Explorer, Android/iOS apps

**Spectrum Analyzers**:
- Display ALL RF energy, not just WiFi
- Detect non-WiFi interference sources
- Common interference: Microwave ovens, Bluetooth, cordless phones, baby monitors, wireless cameras
- **Duty cycle analysis**: Measure RF channel utilization
- Critical for troubleshooting unexplained wireless issues

**Site Surveys**:
- **Passive survey**: Measure signal strength without connecting
- **Active survey**: Test actual throughput while connected
- **Predictive survey**: Software simulation for planning
- Generate heatmaps showing coverage areas
- Define coverage requirements (-60 dBm typical target)

**Troubleshooting Workflow**:
1. Use WiFi analyzer to check channel usage and signal strength
2. If issues persist with good WiFi signal, use spectrum analyzer
3. Identify and eliminate interference sources
4. Optimize channel selection and AP placement
5. Document baseline and conduct regular surveys

Wireless troubleshooting requires visibility into the invisible RF environment. WiFi analyzers and spectrum analyzers provide this visibility, enabling you to quickly diagnose and resolve wireless connectivity and performance issues.

---

## Additional References

- **IEEE 802.11**: Wireless LAN Standards - https://standards.ieee.org/standard/802_11-2020.html
- **FCC Frequency Allocation Chart**: https://www.fcc.gov/engineering-technology/policy-and-rules-division/general/radio-spectrum-allocation
- **WiFi Alliance**: https://www.wi-fi.org/
- **CompTIA Network+ N10-008 Exam Objectives**: Domain 5.3 - Use the appropriate tool
