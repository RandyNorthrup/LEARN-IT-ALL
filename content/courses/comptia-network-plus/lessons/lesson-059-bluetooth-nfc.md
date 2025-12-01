---
id: lesson-059-bluetooth-nfc
title: "Bluetooth and NFC"
chapterId: "chapter-006-wireless-networking"
order: 59
duration: 12
objectives:
  - Understand Bluetooth technology and versions
  - Compare Bluetooth Classic and Bluetooth LE
  - Explain NFC (Near Field Communication) use cases
  - Understand RFID technology
  - Identify IoT wireless technologies
---

# Bluetooth and NFC

Beyond Wi-Fi, several short-range wireless technologies enable personal area networks (PANs), device connectivity, and contactless communications. Understanding these technologies is important for modern networking environments.

---

## Bluetooth

### Overview

**Bluetooth** is a **short-range wireless** technology for device-to-device communication:
- **IEEE 802.15.1** standard
- **Personal Area Network (PAN)** technology
- **2.4 GHz ISM** band (same as Wi-Fi)
- **Typical range**: 10 meters (33 feet)
- **Low power consumption**

**Common Uses**:
- Wireless headphones/speakers
- Keyboards and mice
- Mobile phone peripherals
- File transfers (phone to phone)
- Car hands-free systems
- Fitness trackers and smartwatches
- IoT sensors

---

## Bluetooth Versions

### Bluetooth Classic (BR/EDR)

**Basic Rate/Enhanced Data Rate** - Original Bluetooth:

**Characteristics**:
- **Data rates**: 1-3 Mbps
- **Range**: 10 meters (Class 2), up to 100 meters (Class 1)
- **Continuous connection**: Streaming audio, file transfers
- **Higher power consumption**

**Use Cases**:
- Audio streaming (headphones, speakers)
- Wireless keyboards/mice
- File transfers
- Hands-free calling

### Bluetooth Low Energy (BLE)

**Bluetooth 4.0+** introduced BLE (2010):

**Characteristics**:
- **Data rates**: 1-2 Mbps
- **Range**: 10-50 meters
- **Intermittent connection**: Periodic data bursts
- **Very low power**: Coin cell battery lasts months/years
- **Fast connection**: <6ms

**Use Cases**:
- Fitness trackers and smartwatches
- Beacons (proximity marketing)
- Smart home sensors (temperature, door)
- Medical devices (heart rate monitors, glucose meters)
- Asset tracking tags
- Wireless payment (contactless cards)

### Bluetooth Version History

| Version | Year | Key Features | Speed | Range |
|---------|------|--------------|-------|-------|
| **1.0** | 1999 | Original | 1 Mbps | 10m |
| **2.0 + EDR** | 2004 | Enhanced Data Rate | 3 Mbps | 10m |
| **3.0 + HS** | 2009 | High Speed (Wi-Fi) | 24 Mbps | 10m |
| **4.0** | 2010 | **Bluetooth LE** | 1 Mbps | 10-50m |
| **4.2** | 2014 | IoT optimizations | 1 Mbps | 10-50m |
| **5.0** | 2016 | 2x speed, 4x range | 2 Mbps | 200m |
| **5.1** | 2019 | Direction finding | 2 Mbps | 200m |
| **5.2** | 2020 | LE Audio | 2 Mbps | 200m |
| **5.3** | 2021 | Improved efficiency | 2 Mbps | 200m |

**Bluetooth 5.0+** Improvements:
- **2x faster**: 2 Mbps (vs 1 Mbps in BLE 4.x)
- **4x range**: Up to 200 meters line-of-sight
- **8x broadcast capacity**: More beacon data
- Better coexistence with Wi-Fi

---

## Bluetooth Pairing and Security

### Pairing Process

**Pairing** establishes trust between two devices:

**1. Discovery**:
- Device enters **discoverable mode** (visible to others)
- Other devices scan for available devices

**2. Pairing Request**:
- User initiates pairing on one device
- Devices exchange capabilities

**3. Authentication**:
- **PIN entry**: User enters same PIN on both devices
- **Just Works**: No PIN (BLE devices, less secure)
- **Numeric Comparison**: Compare 6-digit code on both devices
- **Passkey Entry**: Enter code shown on one device into the other

**4. Key Exchange**:
- Devices generate and exchange encryption keys
- **Link key** stored for future connections

**5. Connection**:
- Devices remember each other
- Automatic reconnection when in range

```
Device A          Device B
   |                 |
   | Discovery       |
   |<--------------->|
   | Pairing Request |
   |---------------->|
   | Authentication  |
   |<--------------->|
   | Key Exchange    |
   |<--------------->|
   |   Connected     |
```

### Security

**Bluetooth Security Features**:
- **Encryption**: AES-128 (BLE), E0 stream cipher (Classic)
- **Authentication**: Prevents unauthorized access
- **Authorization**: Control what services can be accessed

**Security Modes** (Classic):
- **Mode 1**: No security
- **Mode 2**: Service-level security
- **Mode 3**: Link-level security
- **Mode 4**: Secure Simple Pairing (SSP)

**Vulnerabilities**:
- **Bluejacking**: Sending unsolicited messages
- **Bluesnarfing**: Stealing data from device
- **Bluebugging**: Remote control of device
- **MITM**: Man-in-the-middle during pairing

**Best Practices**:
- **Disable** when not in use
- Use **non-discoverable mode** after pairing
- Update device firmware regularly
- Use strong authentication (Numeric Comparison, Passkey)

---

## Bluetooth Profiles

**Profiles** define specific use cases and capabilities:

| Profile | Name | Use Case |
|---------|------|----------|
| **A2DP** | Advanced Audio Distribution | Stereo audio streaming |
| **HFP** | Hands-Free Profile | Car/headset calling |
| **HSP** | Headset Profile | Basic mono headset |
| **HID** | Human Interface Device | Keyboards, mice |
| **SPP** | Serial Port Profile | Wireless serial cable |
| **GATT** | Generic Attribute Profile | BLE data exchange |
| **PAN** | Personal Area Network | Network access |
| **FTP** | File Transfer Profile | File sharing |

---

## NFC (Near Field Communication)

### Overview

**NFC** is an **extremely short-range** wireless technology:
- **Maximum range**: 4 cm (1.6 inches)
- **Frequency**: 13.56 MHz
- **Data rate**: 106-424 Kbps
- **Based on RFID** technology

**Key Characteristic**: **Proximity** - devices must be very close (touch or near-touch)

### NFC Modes

**1. Reader/Writer Mode**:
- NFC device reads data from passive NFC tag
- Example: Reading product information from tag

**2. Peer-to-Peer Mode**:
- Two active NFC devices exchange data
- Example: Android Beam (file sharing)

**3. Card Emulation Mode**:
- NFC device acts as contactless smart card
- Example: Mobile payment (Apple Pay, Google Pay)

### NFC Use Cases

**1. Mobile Payments**:
- **Apple Pay**, **Google Pay**, **Samsung Pay**
- Tap phone to payment terminal
- Secure Element (SE) stores payment credentials
- Tokenization protects card numbers

**2. Access Control**:
- NFC key cards for building entry
- Hotel room keys
- Transit cards (subway, bus)

**3. Information Sharing**:
- **Business cards**: Tap phones to exchange contact info
- **Wi-Fi credentials**: Tap to connect to network
- **Bluetooth pairing**: NFC simplifies Bluetooth pairing

**4. Smart Posters/Tags**:
- Product information
- Museum exhibits
- Advertising (tap for coupon/website)

**5. Device Pairing**:
- Tap NFC speaker to connect via Bluetooth
- Simplified IoT device onboarding

### NFC vs Bluetooth

| Feature | NFC | Bluetooth |
|---------|-----|-----------|
| **Range** | <4 cm | 10-200 m |
| **Speed** | 424 Kbps | 1-2 Mbps |
| **Setup Time** | <0.1 sec | 6 sec |
| **Power** | Very low | Low-Medium |
| **Use Case** | Quick transactions | Continuous data |
| **Security** | Proximity (physical) | Encryption |

**Complementary Technologies**:
- NFC for **pairing initiation** (tap to pair)
- Bluetooth for **data transfer** (audio, files)

---

## RFID (Radio Frequency Identification)

### Overview

**RFID** uses radio waves to identify and track objects:
- **Tags** store data (ID, product info)
- **Readers** interrogate tags
- **No line-of-sight required** (unlike barcodes)
- Passive or active tags

### RFID Types

**1. Passive RFID**:
- **No battery** - powered by reader's RF field
- **Range**: Centimeters to ~10 meters
- **Low cost**: 5-50 cents per tag
- **Use cases**: Inventory tracking, access cards, library books

**2. Active RFID**:
- **Battery-powered** tag
- **Range**: Up to 100 meters
- **Higher cost**: $10-100 per tag
- **Use cases**: Container tracking, toll collection, vehicle tracking

**3. Semi-Passive RFID**:
- Battery powers chip, RF harvested for communication
- Medium range and cost

### RFID Frequencies

| Frequency | Range | Use Case |
|-----------|-------|----------|
| **LF** (125-134 kHz) | <0.5 m | Animal tracking, access control |
| **HF** (13.56 MHz) | <1 m | NFC, library books, access cards |
| **UHF** (860-960 MHz) | 3-10 m | Supply chain, retail inventory |
| **Microwave** (2.45 GHz) | <30 m | Toll collection, vehicle tracking |

**Note**: NFC operates at 13.56 MHz (HF RFID)

### RFID Use Cases

**1. Inventory Management**:
- Warehouse tracking
- Retail anti-theft tags
- Supply chain visibility

**2. Access Control**:
- Key cards (HID cards)
- Building access
- Parking gates

**3. Asset Tracking**:
- Equipment location
- Library book tracking
- Hospital equipment

**4. Animal Identification**:
- Pet microchips
- Livestock tracking

**5. Toll Collection**:
- E-ZPass, FasTrak
- Automatic highway tolls

### RFID Security Concerns

**Threats**:
- **Eavesdropping**: Intercepting RFID communication
- **Cloning**: Copying RFID tag data
- **Tracking**: Following individuals via RFID tags

**Mitigations**:
- **Encryption**: Secure communication
- **Shielding**: RFID-blocking wallets
- **Kill command**: Permanently disable tag
- **Distance limitation**: Short range reduces risk

---

## IoT Wireless Technologies

### Zigbee

**Low-power mesh networking** for IoT:
- **IEEE 802.15.4** standard
- **2.4 GHz** and sub-GHz bands
- **Range**: 10-100 meters
- **Mesh network**: Self-healing, extends range
- **Use case**: Smart home (lights, sensors, locks)

### Z-Wave

**Proprietary mesh networking**:
- **Sub-1 GHz** (908 MHz US, 868 MHz EU)
- **Range**: 30 meters indoors
- **Mesh network**: Up to 232 devices
- **Use case**: Smart home automation

### LoRaWAN

**Long-range, low-power** wide-area network:
- **Range**: 2-15 km (urban), up to 50 km (rural)
- **Very low power**: Battery lasts years
- **Low data rate**: 0.3-50 Kbps
- **Use case**: IoT sensors (agriculture, smart cities)

### Comparison

| Technology | Range | Speed | Power | Mesh | Use Case |
|------------|-------|-------|-------|------|----------|
| **Bluetooth LE** | 10-200m | 1-2 Mbps | Low | No* | Wearables, sensors |
| **Zigbee** | 10-100m | 250 Kbps | Very Low | Yes | Smart home |
| **Z-Wave** | 30m | 100 Kbps | Low | Yes | Smart home |
| **NFC** | <4cm | 424 Kbps | Very Low | No | Payments, tags |
| **LoRaWAN** | 2-15km | 0.3-50 Kbps | Very Low | No | Long-range IoT |

*Bluetooth Mesh added in 5.0

---

## Summary

**Key Takeaways**:

1. **Bluetooth**: Short-range PAN, 2.4 GHz, 10-200m range
2. **Bluetooth Classic**: 1-3 Mbps, audio streaming, file transfers
3. **Bluetooth LE** (BLE): Low power, IoT sensors, wearables
4. **Bluetooth 5.0**: 2x speed, 4x range, 8x broadcast capacity
5. **Pairing**: Discovery → Authentication → Key Exchange → Connected
6. **NFC**: Extremely short range (<4cm), 13.56 MHz, 424 Kbps
7. **NFC Use Cases**: Mobile payments, access control, device pairing
8. **RFID**: Tag tracking, passive (no battery) or active (battery)
9. **Zigbee/Z-Wave**: Smart home mesh networks
10. **LoRaWAN**: Long-range IoT (km), very low power

**Quick Reference**:
- **Wireless audio**: Bluetooth Classic (A2DP)
- **Fitness tracker**: Bluetooth LE
- **Mobile payment**: NFC (Card Emulation)
- **Access card**: RFID (HF, passive)
- **Smart home**: Zigbee or Z-Wave
- **Long-range sensors**: LoRaWAN

**Technology Selection**:
- **Range < 4 cm**: NFC
- **Range 10-200 m, low power**: Bluetooth LE
- **Range 10-200 m, audio**: Bluetooth Classic
- **Smart home mesh**: Zigbee, Z-Wave
- **Long-range IoT**: LoRaWAN

Understanding these short-range and IoT wireless technologies enables proper deployment of PANs, IoT solutions, and contactless systems in modern network environments.
