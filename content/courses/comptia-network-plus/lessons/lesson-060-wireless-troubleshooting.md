---
id: lesson-060-wireless-troubleshooting
title: "Wireless Troubleshooting"
chapterId: ch6-wireless-networking
order: 60
duration: 65
objectives:
  - Identify common wireless connectivity issues and classify by scope
  - Analyze RF metrics including RSSI, SNR, retry rate, and channel utilization
  - Diagnose interference using Wi-Fi analyzers and spectrum analyzers
  - Perform link budget calculations for coverage planning
  - Troubleshoot 802.1X enterprise authentication failures
  - Configure fast roaming with 802.11r/k/v
  - Detect and mitigate rogue APs and evil twin attacks
  - Apply the CompTIA 7-step troubleshooting methodology to wireless scenarios
---

# Wireless Troubleshooting

## Introduction

Wireless networks present unique troubleshooting challenges due to RF propagation, interference, and environmental factors. Unlike wired networks where connectivity is deterministic, wireless performance varies with distance, obstacles, atmospheric conditions, and electromagnetic environment. This lesson provides structured diagnostic approaches, real-world scenarios, and hands-on tool usage to systematically identify and resolve wireless network issues—skills essential for both the CompTIA Network+ exam and professional practice.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Identify common wireless connectivity issues and classify by scope
- Analyze RF metrics including RSSI, SNR, retry rate, and channel utilization
- Diagnose interference using Wi-Fi analyzers and spectrum analyzers
- Perform link budget calculations for coverage planning
- Troubleshoot 802.1X enterprise authentication failures
- Configure fast roaming with 802.11r/k/v
- Detect and mitigate rogue APs and evil twin attacks
- Apply the CompTIA 7-step troubleshooting methodology to wireless scenarios

---

## Understanding Wireless Performance Metrics

Before troubleshooting, you must understand the metrics that define wireless health:

### RSSI (Received Signal Strength Indicator)

RSSI measures signal power arriving at the receiver, expressed in dBm (negative values closer to zero = stronger).

```
RSSI Classification:
─────────────────────────────────────────────────
Signal Level       RSSI Range       Quality
─────────────────────────────────────────────────
Excellent          -30 to -50 dBm   Full speed, no issues
Good               -50 to -60 dBm   Reliable, high throughput
Fair               -60 to -70 dBm   Usable, moderate throughput
Poor               -70 to -80 dBm   Unreliable, low data rates
Unusable           Below -80 dBm    Drops, timeouts, no connection
─────────────────────────────────────────────────
```

**Application-Specific Minimums:**

| Application | Minimum RSSI | Minimum SNR | Reason |
|-------------|-------------|-------------|--------|
| VoIP/Video  | -65 dBm     | 25 dB       | Real-time = zero tolerance |
| Enterprise data | -70 dBm | 20 dB       | Standard reliability |
| Email/web browsing | -75 dBm | 15 dB    | Tolerates retransmissions |
| Basic connectivity | -80 dBm | 10 dB    | Absolute minimum |

### SNR (Signal-to-Noise Ratio)

SNR = Signal Strength (dBm) - Noise Floor (dBm)

```
Example Calculation:
  Signal:  -60 dBm
  Noise:   -90 dBm
  SNR:     -60 - (-90) = 30 dB (Excellent)

SNR Quality Guide:
  > 40 dB    Exceptional (rarely achieved outside near-field)
  25-40 dB   Excellent performance
  15-25 dB   Good, acceptable for most uses
  10-15 dB   Poor, connection marginal
  < 10 dB    Very poor, frequent drops and errors
```

**Critical insight**: A strong RSSI with poor SNR indicates heavy interference. You can have -55 dBm signal strength but if the noise floor is -65 dBm, your SNR is only 10 dB—barely usable despite seemingly good signal.

### Retry Rate and Error Counters

Retry rate indicates how often frames must be retransmitted:

```
Retry Rate Assessment:
  0-5%     Normal operation
  5-10%    Minor interference or marginal signal
  10-20%   Significant issue requiring investigation
  > 20%    Critical—major interference or hardware problem
```

### Channel Utilization

Measures how busy the RF channel is (percentage of airtime in use):

```
Channel Utilization:
  0-30%    Light usage, no concern
  30-50%   Moderate, monitor for growth
  50-70%   Heavy, consider load balancing or adding APs
  > 70%    Congested, performance degradation inevitable
```

---

## Common Wireless Issues: Diagnosis and Resolution

### 1. No Connectivity

**Symptoms:**
- Unable to see SSID in available networks
- Can see SSID but connection attempts fail
- Connected to SSID but no internet access

**Systematic Diagnostic Process:**

```
Step 1: Layer 1 Verification
─────────────────────────────
□ AP powered on? (Check LED indicators)
□ Ethernet uplink connected and active?
□ PoE switch port providing power?
□ AP LED status codes (manufacturer-specific):
  - Cisco: Solid green = normal, blinking amber = booting
  - Aruba: Solid green = normal, solid red = error
  - Ubiquiti: Solid white = normal, off = no power

Step 2: Client-Side Checks
─────────────────────────────
□ Wi-Fi adapter enabled? (Airplane mode off?)
□ In range of AP? (Within RSSI > -80 dBm)
□ Correct SSID and password?
□ Client device has known-good driver?

Step 3: Network Configuration
─────────────────────────────
□ DHCP server operational and has available leases?
□ DNS resolution working?
□ Default gateway reachable?
□ Internet connectivity from gateway?
```

**Command-Line Diagnostics:**

```cmd
# Windows: Check Wi-Fi adapter status
netsh wlan show interfaces
# Look for: State, SSID, Signal, Receive rate, Channel

# Windows: Check IP configuration
ipconfig /all
# Verify: IPv4 address assigned (not 169.254.x.x APIPA)
# Check: Default gateway, DNS servers configured

# Windows: Test connectivity
ping 10.0.0.1          (gateway)
ping 8.8.8.8           (internet - IP)
nslookup google.com    (DNS resolution)
```

```bash
# Linux: Check wireless interface
iwconfig wlan0
# Look for: ESSID, Frequency, Signal level, Bit Rate

# Linux: Check IP configuration
ip addr show wlan0
# Verify: Valid IP address in expected subnet

# Linux: Scan for available networks
sudo iwlist wlan0 scan | grep -E "ESSID|Signal|Channel"
```

**Common "No Connectivity" Scenarios:**

| Scenario | Diagnosis | Resolution |
|----------|-----------|------------|
| No SSIDs visible | Wi-Fi adapter off or driver issue | Enable adapter, reinstall driver |
| See SSIDs but not ours | Out of range or SSID hidden | Move closer; configure hidden SSID manually |
| "Can't connect" on click | Wrong password or security mismatch | Verify PSK, check WPA2 vs WPA3 |
| Connected, no internet | DHCP failure or DNS issue | Release/renew IP, check DNS settings |
| 169.254.x.x address | DHCP server unreachable | Check AP VLAN, DHCP relay, server status |

---

### 2. Weak Signal and Poor Coverage

**Root Cause Analysis:**

**Distance and Free Space Path Loss (FSPL):**
Signal degrades with distance according to the inverse-square law. The FSPL formula:

```
FSPL (dB) = 20 × log₁₀(d) + 20 × log₁₀(f) - 147.55
  where d = distance in meters, f = frequency in Hz

Example: 30 meters at 5 GHz
  FSPL = 20 × log₁₀(30) + 20 × log₁₀(5×10⁹) - 147.55
  FSPL = 29.5 + 194.0 - 147.55
  FSPL = 75.95 dB

Compare: 30 meters at 2.4 GHz
  FSPL = 29.5 + 187.6 - 147.55
  FSPL = 69.55 dB

Difference: 5 GHz loses ~6.4 dB more than 2.4 GHz at the same distance
```

**Material Attenuation Reference Table:**

```
Material Attenuation (approximate dB loss per barrier):
────────────────────────────────────────────────
Material                2.4 GHz    5 GHz
────────────────────────────────────────────────
Drywall (standard)      2-3 dB     3-4 dB
Plasterboard            3-4 dB     4-5 dB
Office window (glass)   2-4 dB     3-5 dB
Tinted/low-e glass      6-8 dB     8-12 dB
Hollow wooden door      2-3 dB     3-4 dB
Solid wooden door       3-5 dB     4-6 dB
Concrete (6 inch)       6-12 dB    10-18 dB
Concrete with rebar     10-18 dB   15-25 dB
Cinder block            4-6 dB     5-8 dB
Brick (single layer)    4-8 dB     5-10 dB
Metal door/elevator     15-20 dB   20-30 dB
Metal filing cabinet    6-10 dB    8-15 dB
Floor (concrete/steel)  15-20 dB   20-30 dB
Bulletproof glass       10-18 dB   12-20 dB
Water (aquarium, body)  6-14 dB    8-18 dB
────────────────────────────────────────────────
```

**Link Budget Calculation Walkthrough:**

```
Link Budget Scenario:
  AP transmit power:        20 dBm
  AP antenna gain:          +4 dBi
  Cable/connector loss:     -1 dB
  EIRP:                     23 dBm
  
  FSPL (25m, 5 GHz):       -74 dB
  2 drywall partitions:     -8 dB
  1 glass window:           -4 dB
  
  Client antenna gain:      +2 dBi
  
  Received signal:          23 - 74 - 8 - 4 + 2 = -61 dBm
  Noise floor:              -90 dBm
  SNR:                      29 dB ✓ Good
  
  Client minimum sensitivity: -80 dBm
  Link margin:              -61 - (-80) = 19 dB ✓ Adequate
```

**Resolution Strategies:**

1. **Reposition APs**: Mount centrally, elevated (ceiling preferred), away from metal
2. **Increase transmit power**: Carefully—too high causes interference to neighbors
3. **Add APs**: For large areas, add APs with 15-20% coverage overlap
4. **Upgrade antennas**: Higher gain, directional where appropriate
5. **Switch bands**: 2.4 GHz penetrates better through obstacles
6. **External antennas**: For warehouse/industrial environments with metal obstructions

---

### 3. Interference Analysis and Mitigation

#### Types of Interference

**Co-Channel Interference (CCI):**
Multiple APs or neighboring networks on the same channel compete for airtime.

```
Co-Channel Interference Scenario:
                    ┌──────────┐
     Your AP ──────►│ Channel 6│
                    └──────────┘
                    ┌──────────┐
  Neighbor AP ─────►│ Channel 6│  ← Same channel: devices defer to each other
                    └──────────┘

Result: Both APs share airtime → 50% throughput reduction
Fix: Change one AP to Channel 1 or 11
```

**Adjacent Channel Interference (ACI):**
APs on overlapping channels corrupt each other's signals (worse than CCI because devices can't defer—they just see noise).

```
Adjacent Channel Interference:
  Channel 1: ████████████████
  Channel 3:     ████████████████       ← OVERLAPS with Ch 1!
  Channel 6:              ████████████████   ← OK, no overlap

  CRITICAL RULE: In 2.4 GHz, ONLY use channels 1, 6, 11.
  Using channels 2-5 or 7-10 CREATES interference (worse than CCI).
```

**Non-Wi-Fi Interference Sources:**

| Source | Frequency | Severity | Detection | Mitigation |
|--------|-----------|----------|-----------|------------|
| Microwave oven | 2.4 GHz (Ch 4-9) | Severe (during use) | Spectrum analyzer: burst pattern | Move AP, use 5 GHz, Channel 1 or 11 |
| Bluetooth | 2.4 GHz (FHSS) | Low-moderate | Spectrum: wideband noise | Minimal impact on modern Wi-Fi |
| Baby monitor | 2.4 GHz | Moderate-high | Spectrum: constant signal | Switch to 5 GHz |
| Cordless phones | 2.4 or 5.8 GHz | Moderate | Spectrum: intermittent | Replace with DECT (1.9 GHz) |
| Radar (DFS) | 5 GHz UNII-2/2C | Variable | AP DFS event logs | Leave DFS enabled, add non-DFS channels |
| Fluorescent lights | Broadband noise | Low | Spectrum: impulse noise | Move AP away from fixtures |
| Jammer (illegal) | Any Wi-Fi band | Critical | Spectrum: blanket signal | Locate with directional antenna, contact authorities |

**Interference Troubleshooting with Spectrum Analysis:**

```
Healthy Spectrum (2.4 GHz):
  Noise Floor:  ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁  (-90 dBm baseline)
  Our Signal:   ▁▁▁▁▁█████▁▁▁▁▁▁▁▁  (Ch 6, -50 dBm peak)
                Ch1    Ch6    Ch11

Interference from Microwave (2.4 GHz):
  Noise Floor:  ▁▁▁▁▃▆█████▆▃▁▁▁▁▁  (-65 dBm noise!)
  Our Signal:   ▁▁▁▁▁█████▁▁▁▁▁▁▁▁  (Ch 6, -50 dBm peak)
                Ch1    Ch6    Ch11
  SNR dropped: From 40 dB → 15 dB (microwave on during lunch)
  
  ACTION: Move to Channel 1 or 11, or switch to 5 GHz
```

---

### 4. Slow Performance and Throughput Issues

**Diagnostic Decision Tree:**

```
Slow Wireless Performance?
    │
    ├── Check RSSI → Below -70 dBm?
    │       └── YES → Signal problem (see Section 2)
    │
    ├── Check SNR → Below 20 dB?
    │       └── YES → Interference problem (see Section 3)
    │
    ├── Check Channel Utilization → Above 60%?
    │       └── YES → Congestion → Add APs or load balance
    │
    ├── Check Client Count per AP → Above capacity?
    │       └── YES → Oversubscribed → Add APs, band steering
    │
    ├── Test wired speed → Also slow?
    │       └── YES → Backhaul/internet issue, not wireless
    │
    ├── Check client Wi-Fi standard → 802.11n or older?
    │       └── YES → Legacy client dragging performance
    │
    └── Check AP CPU/memory → High utilization?
            └── YES → AP overloaded → Upgrade or distribute load
```

**The Hidden Node Problem:**

```
Hidden Node Scenario:
  Client A ←──── AP ────► Client B
  (Signal)              (Signal)
  
  Client A cannot hear Client B (obstructed)
  Both transmit simultaneously → COLLISION at AP
  
  Solution: Enable RTS/CTS or CTS-to-Self
  
  With RTS/CTS:
  1. Client A sends RTS (Request to Send) to AP
  2. AP responds with CTS (Clear to Send) — heard by ALL clients
  3. Client B hears CTS, defers transmission
  4. Client A transmits without collision
  
  Trade-off: RTS/CTS adds overhead (20-30% throughput reduction)
  Only enable when hidden node problem confirmed
```

**The Near-Far Problem:**

```
Near-Far Scenario:
  Client A (5 meters from AP): RSSI -35 dBm
  Client B (50 meters from AP): RSSI -78 dBm
  
  Problem: AP always "hears" Client A better
  Client B's signals may be below AP's receive threshold
  Client B constantly loses contention for channel access
  
  Solution:
  1. Reduce AP transmit power (clients must match)
  2. Add APs to reduce cell size
  3. Client minimum RSSI configuration on AP (kick weak clients)
  4. Band steering (force near clients to 5 GHz, leave 2.4 for far)
```

**Throughput Benchmarking:**

```
Expected Real-World Throughput vs Standard:
──────────────────────────────────────────────
Standard      Max Theory   Typical Real-World
──────────────────────────────────────────────
802.11b       11 Mbps      5-6 Mbps
802.11g       54 Mbps      22-25 Mbps
802.11n       600 Mbps     100-200 Mbps
802.11ac W1   1.3 Gbps     300-500 Mbps
802.11ac W2   3.5 Gbps     500-800 Mbps
802.11ax      9.6 Gbps     800-2000 Mbps
──────────────────────────────────────────────
Rule of thumb: Expect 30-50% of theoretical maximum
```

---

### 5. Authentication Failures

**PSK Authentication Troubleshooting Flowchart:**

```
PSK Auth Failure
    │
    ├── "Incorrect password" → Verify PSK (case-sensitive, no trailing spaces)
    │                          Forget network → Re-enter credentials
    │
    ├── "Security mismatch" → Verify both sides: WPA2-PSK or WPA3-SAE?
    │                         Client must support AP's security level
    │
    └── Connects then drops → Possible PMK mismatch after AP config change
                              Clear saved profiles, reconnect
```

**802.1X Enterprise Authentication Troubleshooting:**

```
802.1X Auth Failure
    │
    ├── RADIUS Server Reachable?
    │   └── Test: ping <RADIUS-IP>
    │       Test: telnet <RADIUS-IP> 1812
    │       If NO → Check network path, firewall rules, RADIUS service
    │
    ├── Shared Secret Match?
    │   └── AP config shared secret MUST match RADIUS config
    │       (Most common enterprise auth failure cause!)
    │       Check: RADIUS log for "shared secret mismatch"
    │
    ├── Certificate Valid?
    │   └── Server cert: Check expiration date, CA chain
    │       Client cert (EAP-TLS): Check expiration, enrollment
    │       Root CA: Must be trusted on client device
    │       Check: openssl x509 -in cert.pem -noout -dates
    │
    ├── EAP Method Match?
    │   └── Client and RADIUS must use same EAP method
    │       Common: PEAP-MSCHAPv2, EAP-TLS, EAP-TTLS
    │       Verify: Client supplicant configuration
    │
    └── Time Sync Issue?
        └── Kerberos requires <5 minute clock skew
            RADIUS timeout: Check server clock (NTP configured?)
            Certificate validation: Clock must be within cert validity period
```

**RADIUS Log Analysis (FreeRADIUS example):**

```
# Successful authentication:
(0) Login OK: [jsmith] (from client AP-LOBBY port 1 cli AA:BB:CC:DD:EE:FF)

# Failed - wrong password:
(0) eap_mschapv2: FAILED: MS-CHAP2-Response is incorrect

# Failed - shared secret mismatch:
(0) Dropping packet without response: shared secret is incorrect

# Failed - expired certificate:
(0) tls: ERROR: TLS Alert: certificate has expired

# Failed - unknown user:
(0) [ldap] User not found
(0) Invalid user: [unknown.user]
```

---

### 6. Roaming Issues

**Understanding 802.11r/k/v:**

```
802.11r (Fast BSS Transition - FT):
  Problem: Standard roam = full re-authentication (500-2000 ms)
  Solution: Pre-negotiates encryption keys before roaming
  Result: Roaming < 50 ms (VoIP quality maintained)
  
  Without 802.11r:
  [AP1] ──── Full auth (800ms) ────► [AP2]
        VoIP call drops during transition
  
  With 802.11r:
  [AP1] ──── Fast transition (30ms) ──► [AP2]
        VoIP call continues seamlessly

802.11k (Neighbor Reports):
  Problem: Client scans all channels looking for next AP (slow)
  Solution: AP sends neighbor AP list with channels/signal strength
  Result: Client knows exactly where to roam → faster discovery

802.11v (BSS Transition Management):
  Problem: "Sticky client" stays connected to far AP, ignoring closer AP
  Solution: AP recommends client roam to better AP
  Result: Better load distribution, improved client experience
```

**Roaming Troubleshooting Checklist:**

| Issue | Check | Resolution |
|-------|-------|------------|
| VoIP drops while walking | 802.11r enabled? | Enable Fast BSS Transition |
| Slow roam (>500 ms) | PMK caching? | Enable OKC or 802.11r |
| Client sticks to far AP | 802.11v supported? | Enable BSS Transition Mgmt |
| Roams to wrong AP | Min RSSI threshold? | Configure min RSSI on AP |
| Roams back and forth | Coverage overlap? | Ensure 15-20% overlap, adjust power |
| Fails after roam (802.1X) | Pre-auth configured? | Enable PMK caching or 802.11r |

---

### 7. Rogue APs and Evil Twins

**Detection Methods:**

```
Rogue AP Detection Workflow:
    │
    ├── Wireless IPS (Automated)
    │   └── Dedicated WIPS sensors scan for unknown BSSIDs
    │       Compare against authorized AP inventory
    │       Alert on: New SSIDs, MAC spoofing, unauthorized channels
    │
    ├── Wired-Side Detection
    │   └── NAC (802.1X) on switch ports
    │       Monitor for unexpected DHCP servers
    │       Check for ARP anomalies (MITM indicators)
    │
    ├── Wi-Fi Scan Comparison
    │   └── Regular site surveys → compare against baseline
    │       Look for: Duplicate SSIDs with different BSSIDs
    │       Check: Signal strength anomalies
    │
    └── RF Triangulation
        └── Use multiple sensors to triangulate rogue location
            Handheld spectrum analyzer for physical location
```

**Evil Twin Attack Identification:**

```
Legitimate AP:
  SSID: "CorpWiFi"   BSSID: AA:BB:CC:11:22:33   Security: WPA2-Enterprise

Evil Twin:
  SSID: "CorpWiFi"   BSSID: DE:AD:BE:EF:00:01   Security: WPA2-PSK (or Open!)
  
  Red Flags:
  ✗ Different BSSID than known APs
  ✗ Weaker security (PSK instead of Enterprise, or Open)
  ✗ Unusually strong signal (attacker is close)
  ✗ Captive portal requesting corporate credentials
```

---

## Wireless Diagnostic Tools: Hands-On Usage

### Built-in OS Diagnostic Commands

**Windows Wireless Diagnostics:**

```cmd
:: View all available SSIDs with details (BSSID, channel, signal)
netsh wlan show networks mode=bssid

:: Sample output:
:: SSID 1 : CorpWiFi
::   Network type   : Infrastructure
::   BSSID 1        : AA:BB:CC:11:22:33
::     Signal        : 85%
::     Channel       : 36
::     Radio type    : 802.11ax

:: Current connection details
netsh wlan show interfaces

:: Key fields to check:
::   State:          connected
::   SSID:           CorpWiFi
::   Signal:         85%        (Convert: 85% ≈ -55 dBm)
::   Receive rate:   866.7 Mbps (negotiated PHY rate)
::   Channel:        36
::   Radio type:     802.11ax

:: Generate detailed wireless report (HTML)
netsh wlan show wlanreport
:: Opens report at: C:\ProgramData\Microsoft\Windows\WlanReport\wlan-report.html
:: Shows: Connection timeline, errors, driver info, session history

:: Check saved Wi-Fi profiles
netsh wlan show profiles
netsh wlan show profile name="CorpWiFi" key=clear
```

**Linux Wireless Diagnostics:**

```bash
# View interface details
iwconfig wlan0
# Key fields: ESSID, Frequency, Bit Rate, Signal level, Noise level

# Detailed scan with signal strength
sudo iwlist wlan0 scan | grep -E "ESSID|Signal|Channel|Encryption"

# Modern alternative: iw
sudo iw dev wlan0 scan | grep -E "SSID|signal|freq|capability"

# Connection statistics
iw dev wlan0 station dump
# Shows: signal, tx/rx bitrate, tx/rx packets, tx retries, tx failed

# Check for driver issues
dmesg | grep -i "wlan\|wifi\|wireless\|firmware"
lspci -k | grep -A3 "Network"  # PCI wireless adapter info
lsusb                           # USB wireless adapter info

# Monitor mode for packet capture
sudo ip link set wlan0 down
sudo iw dev wlan0 set type monitor
sudo ip link set wlan0 up
sudo tcpdump -i wlan0 -w capture.pcap
```

### Wireshark Wireless Capture and Analysis

**Essential Wireshark Display Filters for Wireless:**

```
# Filter by SSID
wlan.ssid == "CorpWiFi"

# Show only management frames (beacons, probes, auth, assoc)
wlan.fc.type == 0

# Show only control frames (ACK, RTS, CTS)
wlan.fc.type == 1

# Show only data frames
wlan.fc.type == 2

# Show authentication frames only
wlan.fc.type_subtype == 0x0b

# Show deauthentication frames (possible attack)
wlan.fc.type_subtype == 0x0c

# Show specific client traffic by MAC
wlan.addr == AA:BB:CC:DD:EE:FF

# Show retries (indicator of interference/poor signal)
wlan.fc.retry == 1

# Show all probe requests (clients searching for networks)
wlan.fc.type_subtype == 0x04

# Combine: Show retries from specific client
wlan.addr == AA:BB:CC:DD:EE:FF && wlan.fc.retry == 1

# EAPOL frames (802.1X authentication handshake)
eapol
```

**Interpreting Wireless Captures:**

```
Normal 802.11 Association Sequence:
1. Probe Request    (Client → Broadcast)
2. Probe Response   (AP → Client)
3. Authentication   (Client → AP, Open System)
4. Authentication   (AP → Client, Success)
5. Association Req  (Client → AP)
6. Association Resp (AP → Client, Success)
7. EAPOL frames     (if 802.1X: 4-way handshake)
8. Data frames      (Normal traffic begins)

Failure Indicators in Capture:
✗ No Probe Response     → AP not broadcasting or client out of range
✗ Auth frame Status ≠ 0 → Authentication rejected
✗ Assoc Status ≠ 0      → Association failed (capacity, policy)
✗ Deauth frame present  → Client kicked (or deauth attack!)
✗ High retry rate       → Interference or poor signal
✗ EAPOL timeout         → RADIUS unreachable
```

### AP/Controller Management Interface Checks

```
Key AP Statistics to Check:
────────────────────────────────────────────────────
Metric              Good            Investigate
────────────────────────────────────────────────────
Client count        < 25/radio      > 50/radio
Channel utilization < 50%           > 70%
Retry rate          < 5%            > 10%
CRC errors          < 1%            > 5%
Noise floor         < -90 dBm       > -80 dBm
Tx power            Appropriate     Max (may interfere)
CPU utilization     < 30%           > 60%
Memory usage        < 50%           > 80%
Uptime              Stable          Frequent reboots
────────────────────────────────────────────────────
```

---

## Troubleshooting Methodology for Wireless

### CompTIA 7-Step Process Applied to Wireless

**Step 1: Identify the Problem**
- Interview affected users: What changed? When did it start? How many affected?
- Gather metrics: RSSI, SNR, retry rate, channel utilization
- Classify: Single user, single AP, single area, or network-wide?

**Step 2: Establish a Theory of Probable Cause**

```
Wireless Issue Classification Matrix:
──────────────────────────────────────────────────────
Scope              Likely Cause
──────────────────────────────────────────────────────
One device         Client driver, configuration, hardware
All on one AP      AP failure, AP configuration, local interference
One area           Coverage gap, localized interference
All on one band    Band-specific interference, DFS event
Entire WLAN        Controller issue, RADIUS down, backhaul failure
Time-based         Environmental interference (microwave, radar)
──────────────────────────────────────────────────────
```

**Step 3: Test the Theory**
- Swap client device (isolate client vs network)
- Move to different location (isolate coverage vs interference)
- Test different band (isolate 2.4 vs 5 GHz issue)
- Test wired (isolate wireless vs network problem)

**Step 4: Establish a Plan of Action**
- Document proposed changes before implementing
- Schedule change window if production impacting
- Prepare rollback plan

**Step 5: Implement the Solution**
- Make ONE change at a time
- Verify after each change
- Allow time for propagation (clients reassociate)

**Step 6: Verify Full System Functionality**
- Test from the affected user's device and location
- Verify no unintended side effects
- Monitor for recurrence

**Step 7: Document Findings**
- Record: Symptom, root cause, resolution, time to resolve
- Update baseline documentation if configuration changed
- Add to knowledge base for future reference

---

## Real-World Troubleshooting Case Studies

### Case Study 1: "Lunch Hour Slowdown"

```
Report: "Wi-Fi is slow every day between 12-1 PM in the break room area"

Investigation:
  12:00 - SNR drops from 30 dB to 8 dB on Channel 6
  12:05 - Spectrum analyzer shows broadband 2.4 GHz noise (Ch 4-9)
  12:10 - Source identified: Microwave oven in break room
  
Diagnosis: Microwave oven (2.4 GHz magnetron) causes massive 
           interference on adjacent channels during lunch hour

Resolution:
  1. Changed break room AP from Channel 6 to Channel 1 (still affected)
  2. Moved AP away from break room (still some effect)
  3. Final fix: Configured AP for 5 GHz only near break room
     Result: Problem eliminated—microwave doesn't affect 5 GHz
```

### Case Study 2: "Conference Room Black Hole"

```
Report: "No Wi-Fi in the large conference room since renovation"

Investigation:
  RSSI at conference room entrance: -62 dBm (good)
  RSSI inside conference room: -88 dBm (no signal!)
  Renovation included: New energy-efficient glazing on windows,
    metallic wallpaper, and metal-backed whiteboard covering wall

Diagnosis: Energy-efficient glass (low-e coating) and metallic 
           wallpaper created a Faraday cage effect

Resolution:
  1. Installed ceiling-mounted AP inside conference room
  2. Connected via Ethernet cable through ceiling plenum
  3. Set to 5 GHz, low power (small room, don't need range)
  Result: Full coverage, -45 dBm throughout room
```

### Case Study 3: "Random Disconnections at the Warehouse"

```
Report: "Scanners disconnect randomly in warehouse, especially near dock"

Investigation:
  RSSI survey: -55 to -72 dBm (acceptable range)
  SNR: Variable, 12-28 dB (inconsistent)
  AP logs: DFS events on channels 52-64 every 2-3 hours
  Location: Near airport (5 miles from runway)

Diagnosis: Airport weather radar causes DFS channel evacuation
  APs detect radar → vacate channel for 30 minutes → clients disconnect

Resolution:
  1. Moved APs to non-DFS 5 GHz channels (36, 40, 44, 48)
  2. Supplemented with 2.4 GHz (Ch 1, 6, 11) for fallback
  3. Enabled 802.11r for fast roaming between frequencies
  Result: No more disconnections
```

---

## Summary

### Key Takeaways

1. **RSSI thresholds**: Minimum -65 dBm for VoIP, -70 dBm for enterprise data, -75 dBm for basic browsing
2. **SNR interpretation**: 25+ dB excellent, 15-25 dB acceptable, below 10 dB unusable—high RSSI with low SNR means interference
3. **Interference types**: Co-channel (same channel, manageable), adjacent channel (overlapping channels, avoid), non-Wi-Fi (microwave, Bluetooth)
4. **2.4 GHz golden rule**: Only use channels 1, 6, 11—using any other channel causes adjacent channel interference
5. **Troubleshooting isolation**: Swap device (client vs network), change location (coverage vs interference), test wired (wireless vs backhaul)
6. **802.1X failures**: Check RADIUS reachability, shared secret, certificates, EAP method match, and time synchronization
7. **Roaming**: Enable 802.11r for fast handoff (<50ms for VoIP), maintain 15-20% AP coverage overlap
8. **Link budget**: Calculate total signal path: TX power + antenna gain - cable loss - FSPL - material attenuation + client antenna gain
9. **Diagnostic commands**: `netsh wlan show interfaces` (Windows), `iwconfig`/`iw` (Linux), Wireshark with `wlan.fc.retry == 1` for retries
10. **Document everything**: Record symptoms, metrics, root cause, resolution, and update baselines after changes

### References

- CompTIA Network+ N10-009 Objectives: 5.4 — Given a scenario, troubleshoot common wireless connectivity issues
- CompTIA Network+ N10-009 Objectives: 5.3 — Given a scenario, use the appropriate network software tools and commands
- IEEE 802.11-2020 Standard
- CWNA Study Guide, 5th Edition (Sybex)

---

## Practice Questions

**Q1.** A user reports that their laptop connects to the corporate Wi-Fi but receives a 169.254.x.x IP address. What is the most likely cause?

A) The wireless password is incorrect
B) The DHCP server is unreachable or has no available leases
C) The wireless adapter driver is outdated
D) The AP is broadcasting on the wrong channel

<details>
<summary>Answer</summary>

**B)** A 169.254.x.x address is an APIPA (Automatic Private IP Addressing) address, which Windows assigns when it cannot reach a DHCP server. The client has successfully authenticated and associated with the AP (it's connected), but cannot obtain an IP lease — indicating the DHCP server is down, unreachable, or has exhausted its address pool.
</details>

**Q2.** A wireless network shows -55 dBm RSSI but users report extremely slow performance. A spectrum analyzer reveals a noise floor of -60 dBm. What is the SNR, and what does it indicate?

A) 55 dB — excellent performance expected
B) 5 dB — severe interference degrading performance
C) 115 dB — signal is too strong
D) -5 dB — signal is below the noise floor

<details>
<summary>Answer</summary>

**B)** SNR = Signal - Noise = -55 - (-60) = 5 dB. An SNR of 5 dB is extremely poor (below the 10 dB minimum for usable connectivity). Despite the seemingly good RSSI of -55 dBm, the high noise floor (-60 dBm) from interference sources makes the channel nearly unusable. The solution is to identify and eliminate the interference source or move to a cleaner channel/band.
</details>

**Q3.** An office experiences Wi-Fi slowdowns every weekday between 12:00 and 1:00 PM, primarily on channels 4 through 9 in the 2.4 GHz band. What is the most likely cause?

A) Too many users connecting during lunch
B) A microwave oven operating in the break room
C) Adjacent channel interference from a neighboring office
D) DFS radar detection on 5 GHz channels

<details>
<summary>Answer</summary>

**B)** Microwave ovens operate at 2.4 GHz and cause broadband interference primarily on channels 4-9. The time-based pattern (lunch hour) and frequency-specific impact (2.4 GHz mid-band) are classic indicators of microwave interference. Solutions include moving APs to channels 1 or 11, switching to 5 GHz, or relocating the AP away from the break room.
</details>

**Q4.** After a building renovation that installed energy-efficient windows, users in a conference room lose all Wi-Fi connectivity. The AP is in the hallway outside. What most likely occurred?

A) The AP firmware needs updating after power cycling
B) Low-emissivity (low-e) glass and metallic materials created a Faraday cage effect
C) The renovation caused a change in DHCP scopes
D) The AP's channel was automatically changed by DFS

<details>
<summary>Answer</summary>

**B)** Energy-efficient (low-e) windows have metallic coatings that attenuate RF signals by 8-12 dB or more per pane. Combined with metallic wallpaper or metal-backed whiteboards, the room can become a virtual Faraday cage, blocking wireless signals almost entirely. The solution is to install a dedicated AP inside the conference room connected via Ethernet.
</details>

**Q5.** A warehouse near an airport experiences random wireless disconnections every 2-3 hours on 5 GHz channels 52-64. What feature is causing this, and what is the solution?

A) Band steering is forcing clients to 2.4 GHz; disable band steering
B) DFS (Dynamic Frequency Selection) is detecting airport radar; use non-DFS channels 36-48
C) 802.11r fast roaming is failing; disable fast BSS transition
D) The AP is overloaded; add more access points

<details>
<summary>Answer</summary>

**B)** Channels 52-144 in the 5 GHz UNII-2 and UNII-2C bands require DFS (Dynamic Frequency Selection). When APs detect radar signals (common near airports), they must vacate the channel for 30 minutes, causing all connected clients to disconnect. The solution is to configure APs to use only non-DFS channels (36, 40, 44, 48) in the UNII-1 band, supplemented by 2.4 GHz for fallback.
</details>

**Q6.** Which Wireshark display filter would you use to identify excessive wireless frame retransmissions from a specific client with MAC address AA:BB:CC:DD:EE:FF?

A) `ip.addr == AA:BB:CC:DD:EE:FF && tcp.retransmission`
B) `wlan.addr == AA:BB:CC:DD:EE:FF && wlan.fc.retry == 1`
C) `eth.addr == AA:BB:CC:DD:EE:FF && frame.retry`
D) `wlan.sa == AA:BB:CC:DD:EE:FF && wlan.flags.retry`

<details>
<summary>Answer</summary>

**B)** `wlan.addr` filters by 802.11 MAC address (matches source, destination, or BSSID), and `wlan.fc.retry == 1` filters for frames with the retry bit set in the frame control field. High retry rates (>10%) indicate interference, poor signal quality, or hidden node problems. The `ip.addr` and `eth.addr` filters are for wired Ethernet analysis, not 802.11 wireless frames.
</details>

**Q7.** A VoIP user experiences call drops while walking between floors. The SSID is the same on all APs, and signal coverage overlap is adequate at 20%. What should be enabled to fix this?

A) MAC address filtering on all APs
B) 802.11r (Fast BSS Transition)
C) WPA3-SAE authentication
D) Channel bonding to 80 MHz

<details>
<summary>Answer</summary>

**B)** 802.11r (Fast BSS Transition) pre-negotiates encryption keys with the target AP before roaming, reducing handoff time from 500-2000 ms to under 50 ms. VoIP requires seamless roaming (<50 ms) to avoid call drops. The infrastructure is otherwise correct (same SSID, adequate overlap), but without 802.11r, the full re-authentication during roaming takes too long for real-time voice traffic.
</details>

**Q8.** An enterprise WLAN using 802.1X authentication suddenly stops authenticating all users. The AP logs show "shared secret mismatch." What is the most likely cause?

A) All user passwords have expired simultaneously
B) The RADIUS shared secret was changed on either the AP or RADIUS server without updating the other
C) The AP's SSL certificate has expired
D) The DHCP server is assigning incorrect DNS servers

<details>
<summary>Answer</summary>

**B)** The RADIUS shared secret is a pre-shared key configured on both the AP (RADIUS client) and the RADIUS server. If either side's shared secret is changed without updating the other, all authentication requests will fail with a "shared secret mismatch" error. This is the single most common cause of enterprise wireless authentication failures. The fix is to ensure the shared secret matches exactly on both the AP and RADIUS server configurations.
</details>

**Q9.** In the 2.4 GHz band, an administrator configures three APs on channels 1, 4, and 8. Users report intermittent connectivity issues. What is the problem?

A) The APs need firmware updates
B) Channels 4 and 8 overlap with channels 1 and 11, causing adjacent channel interference
C) Three APs are insufficient for any deployment
D) The 2.4 GHz band does not support three simultaneous APs

<details>
<summary>Answer</summary>

**B)** In the 2.4 GHz band, only channels 1, 6, and 11 are non-overlapping (each channel is 22 MHz wide with 5 MHz spacing). Channels 4 and 8 overlap with both their neighbors, causing adjacent channel interference — which is worse than co-channel interference because devices cannot coordinate via CSMA/CA. The APs should be reconfigured to channels 1, 6, and 11.
</details>

**Q10.** A technician measures -72 dBm RSSI at a client location. The AP transmit power is 20 dBm with 3 dBi antenna gain, and there are two drywall partitions (3 dB loss each) between the client and AP. What is the approximate free space path loss?

A) 83 dB
B) 89 dB
C) 95 dB
D) 72 dB

<details>
<summary>Answer</summary>

**B)** Using the link budget equation: Received Signal = TX Power + Antenna Gain - FSPL - Material Losses. Plugging in: -72 = 20 + 3 - FSPL - (2 × 3). Solving: -72 = 23 - FSPL - 6, so -72 = 17 - FSPL, giving FSPL = 17 + 72 = 89 dB. The free space path loss accounts for the signal attenuation due to distance alone, separate from the material losses through the drywall.
</details>

## References

- CompTIA Network+ N10-009 Objectives: 5.4 — Given a scenario, troubleshoot common wireless connectivity issues
- CompTIA Network+ N10-009 Objectives: 2.4 — Given a scenario, install and configure the appropriate wireless standards and technologies
- IEEE 802.11-2020 — Wireless LAN Medium Access Control and Physical Layer Specifications
- Cisco Wireless LAN Controller Configuration Guide — [cisco.com](https://www.cisco.com/c/en/us/support/wireless/wireless-lan-controller-software/products-installation-and-configuration-guides-list.html)
- Ekahau Wi-Fi Design Documentation — [ekahau.com](https://www.ekahau.com/)
- MetaGeek inSSIDer and Wi-Spy Documentation — [metageek.com](https://www.metageek.com/)
- CWNA: Certified Wireless Network Administrator Study Guide (Sybex)
- RFC 8110 — Opportunistic Wireless Encryption
