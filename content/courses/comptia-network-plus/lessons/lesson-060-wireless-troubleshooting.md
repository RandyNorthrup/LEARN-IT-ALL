---
id: lesson-060-wireless-troubleshooting
title: "Wireless Troubleshooting"
chapterId: "chapter-006-wireless-networking"
order: 60
duration: 16
objectives:
  - Identify common wireless connectivity issues
  - Understand interference sources and mitigation
  - Troubleshoot signal strength and coverage problems
  - Use wireless diagnostic tools effectively
  - Resolve authentication and security issues
---

# Wireless Troubleshooting

Wireless networks present unique troubleshooting challenges due to RF propagation, interference, and environmental factors. Understanding common issues and diagnostic approaches enables efficient problem resolution.

---

## Common Wireless Issues

### 1. No Connectivity

**Symptoms**:
- Unable to see SSID
- Can't connect to network
- Connected but no internet access

**Causes**:
- **AP powered off** or network down
- **Out of range** - too far from AP
- **Wrong password** (PSK)
- **Authentication failure** (Enterprise)
- **DHCP failure** - no IP address
- **Hidden SSID** - client not configured
- **MAC filtering** blocking device

**Troubleshooting Steps**:
1. Verify AP is powered and operational
2. Check if SSID is visible (scan for networks)
3. Move closer to AP (test signal strength)
4. Verify correct password
5. Check IP address (`ipconfig` / `ifconfig`)
6. Test with another device (isolate client vs AP issue)
7. Review AP logs for authentication errors

---

### 2. Weak Signal / Poor Coverage

**Symptoms**:
- Low RSSI (below -70 dBm)
- Frequent disconnections
- Slow speeds
- Intermittent connectivity

**Causes**:
- **Distance** from AP
- **Obstacles** (walls, metal, concrete)
- **AP transmit power** too low
- **Insufficient APs** for coverage area
- **Antenna orientation** incorrect
- **Building materials** attenuating signal

**Troubleshooting**:
1. Measure RSSI at problem location
   - **Good**: -30 to -60 dBm
   - **Fair**: -60 to -70 dBm
   - **Poor**: Below -70 dBm
2. Identify obstacles between client and AP
3. Reposition AP (central, elevated location)
4. Increase transmit power (if too low)
5. Add additional APs for coverage
6. Use higher-gain or directional antennas
7. Change client antenna orientation

**RSSI Targets**:
```
Application        Minimum RSSI
------------------------------
VoIP, Video        -65 dBm
Normal use         -70 dBm
Basic connectivity -75 dBm
```

---

### 3. Interference

**RF interference** degrades wireless performance:

#### Sources of Interference

**Co-Channel Interference**:
- Multiple APs on same channel
- Neighboring networks overlapping
- **Solution**: Change channels (use 1, 6, 11 in 2.4 GHz)

**Adjacent Channel Interference**:
- Overlapping channels (e.g., 1 and 2)
- **Solution**: Use only non-overlapping channels

**Non-Wi-Fi Interference** (2.4 GHz):
- **Microwave ovens**: 2.4 GHz, very strong interference
- **Bluetooth**: 2.4 GHz, frequency hopping
- **Cordless phones**: 2.4 GHz or 5 GHz
- **Baby monitors**: 2.4 GHz
- **Wireless video cameras**: 2.4 GHz
- **Zigbee/Z-Wave**: 2.4 GHz or sub-GHz

**Environmental Interference**:
- **Weather radar** (DFS channels in 5 GHz)
- **Microwave relay links**
- **Outdoor wireless equipment**

#### Symptoms of Interference

- High retry rates
- Increased latency
- Packet loss
- Slow throughput despite good RSSI
- Intermittent connectivity

#### Troubleshooting Interference

**Tools**:
1. **Wi-Fi Analyzer** (see SSIDs, channels, signal strength)
2. **Spectrum Analyzer** (see non-Wi-Fi RF energy)
3. **AP statistics** (retry rate, errors)

**Steps**:
1. Identify interfering devices/networks
2. Check channel utilization
3. Measure noise floor (background RF)
4. Calculate SNR (Signal-to-Noise Ratio)
   - **Good SNR**: 20+ dB
   - **Poor SNR**: <10 dB
5. Change to cleaner channel
6. Move to 5 GHz (less congestion)
7. Remove/relocate interfering devices
8. Use 20 MHz channels (reduces overlap)

```
Channel Overlap Example (2.4 GHz):
Bad:  [AP1-Ch1] [AP2-Ch2] [AP3-Ch3]
       └─overlap──┘└─overlap──┘

Good: [AP1-Ch1]    [AP2-Ch6]    [AP3-Ch11]
       (no overlap between APs)
```

---

### 4. Slow Performance

**Symptoms**:
- Low throughput
- High latency
- Slow file transfers
- Buffering during streaming

**Causes**:
- **Weak signal** (low RSSI)
- **Interference** (low SNR)
- **Channel congestion** (too many clients)
- **AP oversubscription** (bandwidth exceeded)
- **Backhaul bottleneck** (wired network slow)
- **Client limitations** (old Wi-Fi adapter)
- **Multipath** (signal reflections)

**Troubleshooting**:
1. Test RSSI and SNR
2. Check channel utilization
3. Count clients per AP (capacity issue?)
4. Test wired speed (isolate wireless vs network)
5. Check AP CPU/memory usage
6. Verify client supports current Wi-Fi standard
7. Test with different channel width
8. Enable QoS for critical traffic

---

### 5. Authentication Failures

**Symptoms**:
- "Unable to connect"
- "Authentication failed"
- "Incorrect password"
- Repeated disconnections

**Causes**:

**PSK Issues**:
- **Wrong password**
- **Incorrect security mode** (WPA vs WPA2)
- **Key mismatch** after password change

**Enterprise (802.1X) Issues**:
- **RADIUS server unreachable**
- **Certificate expired** or untrusted
- **Wrong EAP method** configured
- **Incorrect credentials**
- **Time sync issue** (Kerberos)
- **RADIUS shared secret** mismatch

**Troubleshooting**:

**PSK**:
1. Verify correct password (case-sensitive)
2. Check security mode matches (WPA2-PSK)
3. Forget network and re-add
4. Verify AP configuration

**Enterprise**:
1. Check RADIUS server reachability (ping, telnet)
2. Verify RADIUS shared secret matches
3. Check certificate validity (not expired)
4. Verify CA certificate trusted on client
5. Confirm correct EAP method (PEAP, EAP-TLS)
6. Check RADIUS logs for errors
7. Test with known-good credentials
8. Verify time sync (NTP) - critical for certificates

---

### 6. Roaming Issues

**Symptoms**:
- Disconnects when moving between APs
- Slow handoff (VoIP drops during roaming)
- Client "sticks" to far AP instead of closer one

**Causes**:
- **No 802.11r/k/v** enabled (slow roaming)
- **Client roaming algorithm** aggressive or sticky
- **Different SSIDs** per AP (not ESS)
- **Inconsistent configuration** across APs
- **Poor overlap** between AP coverage

**Troubleshooting**:
1. Enable **802.11r** (Fast BSS Transition)
2. Enable **802.11k** (Neighbor Reports)
3. Enable **802.11v** (BSS Transition Management)
4. Verify same SSID across all APs
5. Check AP coverage overlap (15-20%)
6. Adjust transmit power (prevent sticky clients)
7. Enable load balancing on controller
8. Update client Wi-Fi drivers

**Fast Roaming Requirements**:
- **<50 ms handoff** for VoIP
- 15-20% coverage overlap between APs
- 802.11r/k/v enabled
- Wireless controller managing roaming

---

### 7. Rogue APs and Evil Twins

**Rogue AP**:
- Unauthorized AP on network
- Security risk (bypasses controls)

**Evil Twin**:
- Fake AP impersonating legitimate network
- Man-in-the-middle attack

**Detection**:
1. **Wireless IPS** - automatic rogue detection
2. **Regular scans** - site surveys
3. **Wired side detection** - discover unauthorized devices
4. **MAC address monitoring** - track connected devices

**Mitigation**:
1. **802.1X NAC** - prevent unauthorized AP connection
2. **WIPS containment** - send deauth to rogue clients
3. **Physical security** - control Ethernet jacks
4. **User awareness** - train users to recognize fake networks

---

## Wireless Diagnostic Tools

### 1. Built-in OS Tools

**Windows**:
```cmd
# View available networks
netsh wlan show networks mode=bssid

# View current connection info
netsh wlan show interfaces

# View Wi-Fi adapter properties
netsh wlan show drivers

# View wireless profiles (saved networks)
netsh wlan show profiles
```

**macOS/Linux**:
```bash
# View current connection (macOS)
/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I

# Scan for networks (Linux)
sudo iwlist wlan0 scan

# View connection info (Linux)
iwconfig wlan0
```

### 2. Wi-Fi Analyzer Apps

**Purpose**: Visualize Wi-Fi networks, channels, signal strength

**Features**:
- SSID list with RSSI
- Channel graph (overlapping networks)
- Signal strength meter
- Best channel recommendation

**Popular Tools**:
- **Wi-Fi Analyzer** (Android)
- **NetSpot** (Windows, macOS)
- **inSSIDer** (Windows)
- **WiFi Explorer** (macOS)

**Use Cases**:
- Find clearest channel
- Measure signal strength
- Identify interference sources
- Verify AP coverage

### 3. Spectrum Analyzer

**Purpose**: Detect non-Wi-Fi RF interference

**Features**:
- View all RF energy (not just Wi-Fi)
- Identify microwave ovens, Bluetooth, etc.
- Measure noise floor
- Real-time RF spectrum display

**Tools**:
- **Chanalyzer** + Wi-Spy adapter
- **AirMagnet Spectrum XT**
- **Aruba AirWave**

**Use Cases**:
- Troubleshoot unexplained interference
- Detect hidden RF sources
- Plan deployments in noisy environments

### 4. Enterprise Wi-Fi Tools

**Packet Capture**:
- **Wireshark** with monitor mode
- Capture 802.11 frames
- Analyze handshakes, retries, errors

**Site Survey Tools**:
- **Ekahau** Site Survey Pro
- **AirMagnet Survey**
- Create heat maps
- Validate coverage

**Wireless IPS**:
- **Cisco CleanAir**
- **Aruba RFProtect**
- Automatic rogue detection
- Spectrum analysis

---

## Troubleshooting Methodology

### CompTIA 7-Step Process

1. **Identify the problem**
   - Gather information
   - Question users
   - Identify symptoms
   - Determine recent changes

2. **Establish a theory** of probable cause
   - Question the obvious
   - Consider multiple approaches

3. **Test the theory** to determine cause
   - If confirmed: plan action
   - If not confirmed: establish new theory

4. **Establish a plan of action** to resolve
   - Identify effects of solution

5. **Implement the solution** or escalate
   - Make one change at a time

6. **Verify full system functionality**
   - Test with user
   - Implement preventive measures

7. **Document findings**, actions, and outcomes

### Wireless-Specific Approach

**Quick Checks** (First 5 minutes):
1. Is the AP powered on?
2. Can other devices connect?
3. What's the RSSI at problem location?
4. Has anything changed recently?
5. Is the correct SSID/password used?

**Isolation**:
- **Client-side issue**: Only one device affected
- **AP issue**: All clients on one AP affected
- **Network issue**: All APs affected
- **Interference**: Specific location/time affected

**Testing**:
- **Test with known-good device**
- **Test in different location**
- **Test on different band** (2.4 vs 5 GHz)
- **Test with ethernet** (isolate wireless vs network)

---

## Common Scenarios and Solutions

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| Can't see SSID | Out of range, SSID hidden | Move closer, unhide SSID |
| Low speed, good signal | Interference, congestion | Change channel, use 5 GHz |
| Good at desk, poor in corner | Weak coverage | Add AP, reposition existing |
| Drops every few minutes | Interference, channel | Change channel, spectrum analyze |
| VoIP drops during walking | Slow roaming | Enable 802.11r/k/v |
| Auth fails enterprise | RADIUS issue, cert expired | Check RADIUS logs, renew cert |
| Works early, fails afternoon | Interference (microwave lunch) | Move AP, use 5 GHz |
| Good RSSI, high latency | High retry rate, interference | Change channel, reduce power |

---

## Summary

**Key Takeaways**:

1. **RSSI**: Minimum -70 dBm for normal use, -65 dBm for VoIP
2. **SNR**: 20+ dB for good performance
3. **Interference**: Co-channel (same channel), adjacent (overlapping), non-Wi-Fi (microwave)
4. **2.4 GHz Channels**: Use only 1, 6, 11 (non-overlapping)
5. **5 GHz**: Less congestion, more channels, shorter range
6. **Authentication**: Verify RADIUS reachability, certificate validity, credentials
7. **Roaming**: Enable 802.11r/k/v for fast handoff (<50ms)
8. **Tools**: Wi-Fi Analyzer (networks), Spectrum Analyzer (RF), Packet Capture (details)
9. **Isolation**: Test one device, one location, one change at a time
10. **Documentation**: Log issues, solutions, and changes

**Troubleshooting Checklist**:
- [ ] Verify AP powered and operational
- [ ] Check RSSI (target -30 to -70 dBm)
- [ ] Measure SNR (target 20+ dB)
- [ ] Scan for channel congestion
- [ ] Check for interference sources
- [ ] Verify correct channel usage (1, 6, 11)
- [ ] Test authentication (PSK or RADIUS)
- [ ] Confirm DHCP assignment
- [ ] Test with known-good device
- [ ] Review AP/controller logs

**Quick Fixes**:
- **Slow speed**: Change to 5 GHz, change channel
- **Drops**: Reduce transmit power, enable load balancing
- **Can't connect**: Verify password, check MAC filtering
- **Roaming issues**: Enable 802.11r, adjust power levels

Effective wireless troubleshooting requires understanding RF propagation, interference sources, and systematic diagnostic approaches to quickly identify and resolve issues.
