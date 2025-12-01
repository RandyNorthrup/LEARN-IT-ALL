---
id: lesson-056-wireless-security-protocols
title: "Wireless Security Protocols"
chapterId: "chapter-006-wireless-networking"
order: 56
duration: 18
objectives:
  - Compare WEP, WPA, WPA2, and WPA3 security protocols
  - Understand encryption methods (TKIP, CCMP, AES)
  - Explain authentication modes (Open, PSK, Enterprise)
  - Identify wireless security best practices
  - Understand common wireless attacks and mitigations
---

# Wireless Security Protocols

Wireless network security is critical because radio signals can be intercepted by anyone within range. Understanding wireless security protocols and encryption methods is essential for protecting wireless networks from unauthorized access and attacks.

---

## Wireless Security Evolution

### Security Protocol Timeline

| Protocol | Year | Encryption | Status | Key Length | Security Level |
|----------|------|------------|--------|------------|----------------|
| **WEP** | 1999 | RC4 | Deprecated | 64/128-bit | Broken |
| **WPA** | 2003 | TKIP/RC4 | Legacy | 128-bit | Weak |
| **WPA2** | 2004 | CCMP/AES | Current | 128-bit | Strong |
| **WPA3** | 2018 | GCMP/AES | Modern | 128/192-bit | Strongest |

---

## WEP (Wired Equivalent Privacy)

### Overview

**First Wi-Fi security standard** (IEEE 802.11 original, 1999):
- Goal: Provide security equivalent to wired networks
- **Status**: Completely broken, never use
- **Deprecated** since 2004

### Technical Details

**Encryption**:
- **RC4 stream cipher**
- 40-bit (WEP-64) or 104-bit (WEP-128) key
- 24-bit Initialization Vector (IV)
- **Total key**: 64 or 128 bits (including IV)

**Authentication**:
- **Open System**: No authentication (encryption only)
- **Shared Key**: Uses WEP key for authentication (even weaker)

### Vulnerabilities

**1. Weak IV**:
- 24-bit IV repeats after ~5,000 packets
- IV reuse allows key recovery

**2. Key Recovery**:
- Tools (Aircrack-ng) crack WEP in **minutes**
- Requires only 20,000-40,000 captured packets
- Passive attack (no interaction needed)

**3. No Integrity Protection**:
- CRC-32 checksum is weak
- Packets can be modified and re-injected

**Why WEP Failed**:
- Flawed implementation of RC4
- Short IV causes key collisions
- Static keys never change
- No key management

**Verdict**: **Never use WEP. Completely insecure.**

---

## WPA (Wi-Fi Protected Access)

### Overview

**Interim standard** released in 2003 while WPA2 was being developed:
- **Stop-gap solution** to replace WEP quickly
- Based on IEEE 802.11i draft
- Used existing hardware with firmware updates
- **Status**: Legacy, avoid if possible

### Technical Details

**Encryption**:
- **TKIP** (Temporal Key Integrity Protocol)
- Still uses RC4, but with improvements
- **Per-packet key mixing**: Unique key per packet
- 128-bit keys

**Authentication**:
- **WPA-Personal** (WPA-PSK): Pre-shared key
- **WPA-Enterprise** (WPA-802.1X): RADIUS authentication

**Improvements Over WEP**:
1. **48-bit IV**: Much longer than WEP's 24-bit
2. **Key Mixing**: Unique per-packet keys
3. **MIC** (Message Integrity Check): Detects tampering (Michael algorithm)
4. **Key Rotation**: Automatic key updates

### Vulnerabilities

**1. TKIP Attacks**:
- TKIP still based on RC4
- Vulnerable to certain attacks
- MIC can be bypassed

**2. Brute Force**:
- Weak PSK passwords can be cracked
- Dictionary attacks on 4-way handshake

**Verdict**: **Better than WEP, but use WPA2/WPA3 instead.**

---

## WPA2 (Wi-Fi Protected Access 2)

### Overview

**Current standard** (IEEE 802.11i, 2004):
- Mandatory since 2006 for Wi-Fi certification
- Strong encryption (AES)
- Most widely deployed security protocol
- **Status**: Secure when properly configured

### Technical Details

**Encryption**:
- **CCMP** (Counter Mode with CBC-MAC Protocol)
- **AES** (Advanced Encryption Standard)
- 128-bit keys
- Block cipher (not stream cipher like RC4)

**Authentication Modes**:

**1. WPA2-Personal (WPA2-PSK)**:
- **Pre-shared key** (password)
- Same password on all devices
- 8-63 character passphrase
- Suitable for home/small office

**2. WPA2-Enterprise (WPA2-802.1X)**:
- **RADIUS server** authentication
- **Unique credentials** per user
- **EAP** (Extensible Authentication Protocol) methods
- Suitable for business/enterprise

### 4-Way Handshake

**Process to establish encryption keys**:

1. **AP → Client**: ANonce (AP nonce/random number)
2. **Client → AP**: SNonce + MIC (Client nonce + integrity check)
3. **AP → Client**: GTK (Group Temporal Key) + MIC
4. **Client → AP**: ACK (Acknowledgment)

**Result**: PTK (Pairwise Transient Key) derived for encrypted communication

```
Client          Access Point
  |                 |
  |  1. ANonce      |
  |<----------------|
  |  2. SNonce+MIC  |
  |---------------->|
  |  3. GTK+MIC     |
  |<----------------|
  |  4. ACK         |
  |---------------->|
  
  Both derive PTK for encryption
```

### WPA2 Vulnerabilities

**1. KRACK** (Key Reinstallation Attack, 2017):
- Exploits 4-way handshake
- Forces key reuse
- **Mitigation**: Patch devices (most patched by now)

**2. Weak PSK**:
- Short/common passwords vulnerable to brute force
- Rainbow tables for common SSIDs
- **Mitigation**: Use long (20+), random passphrases

**3. No Forward Secrecy**:
- Compromised PSK allows decryption of all past traffic
- **Mitigation**: Use WPA3

**Best Practices**:
- **Strong passphrase**: 20+ random characters
- **Disable WPS**: PIN brute-force vulnerability
- **Use Enterprise** mode for business environments
- **Segment guest networks**: Separate VLANs

**Verdict**: **Secure with strong passwords. Still recommended.**

---

## WPA3 (Wi-Fi Protected Access 3)

### Overview

**Latest standard** (announced 2018, certified 2019):
- Successor to WPA2
- Addresses WPA2 weaknesses
- Backward compatible with WPA2
- **Status**: Modern standard, use when available

### Key Improvements

**1. SAE** (Simultaneous Authentication of Equals):
- Replaces PSK 4-way handshake
- **Dragonfly** key exchange
- **Forward secrecy**: Past sessions secure even if password compromised
- Resistant to offline dictionary attacks

**2. Individualized Data Encryption**:
- Unique encryption per device (even on open networks)
- Protects against packet sniffing on public Wi-Fi

**3. 192-bit Security Suite** (Enterprise):
- 192-bit encryption for high-security environments
- Suite B cryptographic algorithms
- Government/military grade

**4. Protected Management Frames** (PMF):
- **Mandatory** (optional in WPA2)
- Protects deauth/disassoc attacks
- Prevents forced disconnections

### WPA3 Modes

**WPA3-Personal**:
- SAE (Dragonfly) instead of PSK
- Forward secrecy
- Protection against brute-force

**WPA3-Enterprise**:
- 192-bit mode optional
- Enhanced authentication
- Improved key derivation

**WPA3-Easy Connect**:
- Simplified IoT device onboarding
- QR code provisioning

**WPA3-Enhanced Open** (OWE):
- Encryption on **open networks** (no password)
- Opportunistic Wireless Encryption
- Protects against passive eavesdropping

### WPA3 Transition Mode

**Mixed WPA2/WPA3**:
- Supports both WPA2 and WPA3 clients
- Enables gradual migration
- Maintains backward compatibility

**Best Practices**:
- Deploy WPA3 for new networks
- Use transition mode during migration
- Disable WPA2-only after all clients upgraded

**Verdict**: **Most secure. Use whenever possible.**

---

## Authentication Methods

### Open Authentication

**No password required**:
- Anyone can connect
- **No encryption** by default (unless using WPA3 Enhanced Open)
- Suitable only for public guest networks with captive portal
- **Security**: None (avoid unless necessary)

### Pre-Shared Key (PSK)

**Shared password** for all users:
- **WPA2-PSK** or **WPA3-PSK**
- Same passphrase on all devices
- Simple to deploy
- **Use case**: Home, small office

**Drawbacks**:
- Password sharing = security risk
- Can't revoke individual access
- Difficult to change (all devices must update)

### Enterprise (802.1X)

**RADIUS-based authentication**:
- **Unique credentials** per user
- Centralized authentication server
- **EAP methods**: PEAP, EAP-TLS, EAP-TTLS
- **Use case**: Business, education, enterprise

**Benefits**:
- Individual accountability
- Centralized management
- Easy user revocation
- Certificate-based options

```
 Client         AP        RADIUS Server
   |            |              |
   |  EAP Req   |              |
   |<-----------|              |
   |  Identity  |  RADIUS Req  |
   |----------->|------------->|
   |            |  RADIUS Acc  |
   |  Success   |<-------------|
   |<-----------|              |
   |  Encrypted Communication  |
```

---

## Wireless Security Best Practices

### Network Configuration

1. **Use WPA3** (or WPA2 minimum)
2. **Strong passphrase**: 20+ random characters
3. **Disable WPS**: PIN vulnerability
4. **Change default SSID**: Don't reveal AP model
5. **Disable SSID broadcast**: Minimal security, but reduces visibility
6. **Enable MAC filtering**: Defense in depth (easily spoofed)
7. **Separate guest network**: VLAN isolation
8. **Regular firmware updates**: Patch vulnerabilities

### Enterprise Deployment

1. **802.1X authentication**: Individual credentials
2. **RADIUS server**: Centralized auth
3. **Certificate-based auth** (EAP-TLS): Strongest
4. **VLAN assignment** per user/role: Segmentation
5. **IDS/IPS**: Monitor for attacks
6. **Wireless IPS**: Detect rogue APs

### Physical Security

1. **Secure AP placement**: Prevent tampering
2. **Reduce RF leakage**: Shield/attenuate outside walls
3. **Disable unused interfaces**: Reduce attack surface
4. **Monitor for rogue APs**: Wireless surveys

---

## Common Wireless Attacks

### Passive Attacks

**1. Eavesdropping/Sniffing**:
- Capturing wireless traffic
- **Mitigation**: Strong encryption (WPA2/WPA3)

**2. Traffic Analysis**:
- Analyzing patterns even when encrypted
- **Mitigation**: VPN, minimize sensitive data

### Active Attacks

**3. Evil Twin**:
- Fake AP with same SSID
- Users connect, attacker intercepts
- **Mitigation**: 802.1X, user awareness

**4. Deauthentication Attack**:
- Forged deauth frames disconnect users
- Capture handshake for cracking
- **Mitigation**: WPA3 (PMF mandatory), WPA2 with PMF

**5. Rogue AP**:
- Unauthorized AP on network
- **Mitigation**: Wireless IPS, monitoring, NAC

**6. WPS PIN Brute Force**:
- 8-digit PIN can be cracked in hours
- **Mitigation**: Disable WPS

**7. KRACK Attack** (WPA2):
- Key reinstallation attack
- **Mitigation**: Patch devices, upgrade to WPA3

---

## Summary

**Key Takeaways**:

1. **WEP**: Completely broken, never use
2. **WPA**: Legacy, avoid if possible
3. **WPA2**: Secure with strong passwords, current standard
4. **WPA3**: Most secure, forward secrecy, use when available
5. **PSK**: Shared password (home/small office)
6. **Enterprise (802.1X)**: Individual auth (business)
7. **Strong Passphrase**: 20+ characters, random
8. **Disable WPS**: Vulnerable to brute force
9. **PMF**: Protects management frames (mandatory in WPA3)
10. **Segmentation**: Guest networks on separate VLANs

**Quick Reference**:
- **Home**: WPA3-Personal or WPA2-Personal (strong password)
- **Business**: WPA3-Enterprise or WPA2-Enterprise (802.1X)
- **Public**: WPA3 Enhanced Open or captive portal with isolation
- **IoT**: WPA3 (TWT for battery), separate VLAN

Proper wireless security configuration is critical for protecting networks from unauthorized access and attacks. Always use the strongest security protocol supported by all devices.
