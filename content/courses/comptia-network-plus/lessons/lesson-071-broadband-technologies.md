---
id: lesson-071-broadband-technologies
title: "Broadband Technologies (Cable, DSL, Fiber/FTTP)"
chapterId: "chapter-008-wan-technologies"
order: 71
duration: 23
objectives:
  - Understand broadband technology characteristics
  - Explain DSL variants and operation
  - Describe cable modem technology (DOCSIS)
  - Compare fiber-to-the-premises technologies
  - Identify broadband use cases and limitations
---

# Broadband Technologies (Cable, DSL, Fiber/FTTP)

**Broadband** refers to high-speed internet access technologies providing "always-on" connectivity. Primary broadband technologies include **DSL (Digital Subscriber Line)**, **cable modem**, and **fiber optic** (FTTP/FTTH).

This lesson covers broadband fundamentals—important for the CompTIA Network+ N10-008 exam.

---

## What is Broadband?

### Broadband Definition

**Broadband:**
- High-speed internet access
- Always-on connection (no dial-up)
- Asymmetric bandwidth (faster download than upload)
- Shared infrastructure

**FCC definition (USA):**
- Minimum 25 Mbps download / 3 Mbps upload (as of 2015)

### Broadband vs Dial-Up

| Aspect | Dial-Up | Broadband |
|--------|---------|-----------|
| **Speed** | 56 Kbps max | 25 Mbps+ |
| **Connection** | Dial each time | Always-on |
| **Phone line** | Ties up phone | Doesn't block phone |
| **Latency** | High | Lower |
| **Cost** | Pay per minute | Flat monthly rate |

### Broadband Characteristics

**Asymmetric:**
- Download speed > Upload speed
- Example: 100 Mbps down / 10 Mbps up

**Shared medium:**
- Multiple users share bandwidth
- Performance varies with usage

**Last mile:**
- Connection from provider to customer premises
- Often the bottleneck

---

## DSL (Digital Subscriber Line)

### What is DSL?

**DSL** uses existing telephone copper lines for high-speed internet, transmitting data at higher frequencies than voice calls.

**Key concept:**
- Voice: 0-4 kHz
- DSL: 25 kHz - 1 MHz+
- Both can coexist on same line (use different frequencies)

### DSL Architecture

```
Customer Premises              Central Office (CO)
┌────────────┐               ┌─────────────┐
│  Computer  │               │    DSLAM    │
└──────┬─────┘               │(aggregates  │
       │                     │ DSL lines)  │
┌──────▼─────┐   Copper      └──────┬──────┘
│ DSL Modem  │   Phone Line         │
│            │◀─────────────────────┤
│            │  (up to 18,000 ft)   │
└────────────┘                      │
       │                            ▼
┌──────▼─────┐               Internet/ISP
│ DSL Filter │
│ (Splitter) │
└──────┬─────┘
       │
┌──────▼─────┐
│   Phone    │
└────────────┘
```

**Components:**

**DSL Modem:**
- Modulates/demodulates DSL signals
- Connects via Ethernet to computer/router

**DSL Filter (Microfilter):**
- Separates voice (low freq) from data (high freq)
- Plug filter into phone jacks for phones
- Modem connects without filter

**DSLAM (DSL Access Multiplexer):**
- At telephone company Central Office
- Aggregates multiple DSL connections
- Connects to internet backbone

### DSL Distance Limitation

**Maximum distance: ~18,000 feet (5.5 km)**
- Signal attenuates over distance
- Farther from CO = slower speeds
- Beyond 18,000 ft: DSL unavailable

**Example:**
- 1,000 ft from CO: 100 Mbps
- 10,000 ft from CO: 25 Mbps
- 18,000 ft from CO: 6 Mbps
- 20,000 ft from CO: No service

### DSL Types

#### ADSL (Asymmetric DSL)

**Most common DSL variant**

**Speeds:**
- Download: 1.5 - 100 Mbps
- Upload: 64 Kbps - 10 Mbps
- Asymmetric (download > upload)

**Versions:**
- **ADSL**: 8 Mbps down / 1 Mbps up
- **ADSL2**: 12 Mbps down / 1.5 Mbps up
- **ADSL2+**: 24 Mbps down / 3.5 Mbps up

**Use case:**
- Residential internet
- Small businesses

#### SDSL (Symmetric DSL)

**Equal upload and download speeds**

**Speeds:**
- 192 Kbps - 2.3 Mbps (both directions)

**Characteristics:**
- Symmetric
- Business service
- More expensive than ADSL
- Shorter distance than ADSL

**Use case:**
- Businesses needing upload capacity (hosting servers)

#### VDSL (Very-high-bit-rate DSL)

**Fastest DSL variant**

**Speeds:**
- Download: 52 - 100 Mbps
- Upload: 16 - 100 Mbps
- More symmetric than ADSL

**Versions:**
- **VDSL**: 52 Mbps down / 16 Mbps up
- **VDSL2**: 100 Mbps down / 100 Mbps up (short distances)

**Distance limitation:**
- Very short range (1,000 - 4,000 ft)
- Speed degrades rapidly with distance

**Use case:**
- FTTC (Fiber to the Curb) + VDSL last mile
- IPTV (Internet Protocol Television)

### DSL Comparison

| Type | Download | Upload | Distance | Use Case |
|------|----------|--------|----------|----------|
| **ADSL** | 1.5-24 Mbps | 64 Kbps-3.5 Mbps | 18,000 ft | Residential |
| **SDSL** | 192 Kbps-2.3 Mbps | Same as down | 10,000 ft | Business |
| **VDSL** | 52-100 Mbps | 16-100 Mbps | 1,000-4,000 ft | FTTC, IPTV |

### Advantages of DSL

✅ **Uses existing copper**: No new wiring needed
✅ **Dedicated connection**: Not shared with neighbors
✅ **Always-on**: No dial-up
✅ **Simultaneous voice/data**: Can use phone while online

### Disadvantages of DSL

❌ **Distance-dependent**: Speed decreases with distance from CO
❌ **Not universally available**: Must be within 18,000 ft of CO
❌ **Asymmetric**: ADSL upload much slower than download
❌ **Slower than cable/fiber**: Maximum ~100 Mbps (VDSL2)

---

## Cable Modem

### What is Cable Modem?

**Cable modem** provides internet over cable TV coaxial infrastructure using **DOCSIS** standard.

### Cable Architecture

```
Customer Premises           Cable Provider Headend
┌────────────┐             ┌──────────────┐
│  Computer  │             │     CMTS     │
└──────┬─────┘             │(Cable Modem  │
       │                   │ Termination  │
┌──────▼─────┐  Coax Cable │   System)    │
│Cable Modem │◀────────────┤              │
└────────────┘             └──────┬───────┘
       │                          │
┌──────▼─────┐             Internet/ISP
│ Splitter   │
└──────┬─────┘
       │
┌──────▼─────┐
│ Cable TV   │
└────────────┘
```

**Components:**

**Cable Modem:**
- Connects to coaxial cable
- Ethernet port to computer/router
- Uses DOCSIS protocol

**Splitter:**
- Divides signal between TV and modem

**CMTS (Cable Modem Termination System):**
- At cable provider headend
- Aggregates cable modems
- Connects to internet

### DOCSIS (Data Over Cable Service Interface Specification)

**DOCSIS versions:**

| Version | Download | Upload | Year |
|---------|----------|--------|------|
| DOCSIS 1.0 | 40 Mbps | 10 Mbps | 1997 |
| DOCSIS 2.0 | 40 Mbps | 30 Mbps | 2001 |
| DOCSIS 3.0 | 1 Gbps | 200 Mbps | 2006 |
| DOCSIS 3.1 | 10 Gbps | 1-2 Gbps | 2013 |
| DOCSIS 4.0 | 10 Gbps | 6 Gbps | 2017 |

**Channel bonding (DOCSIS 3.0+):**
- Combines multiple channels for higher speeds
- Example: 8 downstream channels × 38 Mbps = 304 Mbps

### Cable Modem Characteristics

**Shared medium:**
- Entire neighborhood shares bandwidth
- Performance degrades during peak hours (evening)
- **Contention ratio**: 100:1 or higher

**Asymmetric:**
- Download > Upload
- Typical: 200 Mbps down / 10 Mbps up

**Coaxial cable:**
- RG-6 coax
- Lower attenuation than RG-59

### Advantages of Cable

✅ **High speeds**: 100 Mbps - 1 Gbps
✅ **Widely available**: Cable TV infrastructure
✅ **No distance limitation**: Unlike DSL
✅ **Always-on**: No dial-up

### Disadvantages of Cable

❌ **Shared bandwidth**: Neighbors affect your speed
❌ **Variable performance**: Slow during peak hours
❌ **Asymmetric**: Upload much slower than download
❌ **Security**: Shared medium (traffic isolation via DOCSIS)

---

## Fiber to the Premises (FTTP)

### Fiber Optic Internet Overview

**Fiber optic** internet uses glass/plastic fiber to transmit data as light pulses.

**Advantages over copper:**
- **Much higher bandwidth**: Gbps to Tbps
- **Long distances**: 40+ km without repeaters
- **Immune to EMI**: No electromagnetic interference
- **Secure**: Difficult to tap

### Fiber Deployment Types

#### FTTH (Fiber to the Home)

**Fiber runs directly to home**

**Characteristics:**
- Fiber terminates at ONT inside home
- Highest speeds (1-10 Gbps)
- Most expensive to deploy

#### FTTP (Fiber to the Premises)

**Generic term for fiber to home/business**

**Same as FTTH** but includes businesses.

#### FTTC (Fiber to the Curb)

**Fiber to neighborhood cabinet**

**Last mile:**
- Fiber to street cabinet
- Copper (VDSL) from cabinet to home (200-1000 ft)

**Speeds:**
- 25-100 Mbps (limited by VDSL)

#### FTTN (Fiber to the Node)

**Fiber to neighborhood node**

**Last mile:**
- Fiber to central node
- Copper (DSL) from node to home (up to 18,000 ft)

**Speeds:**
- 10-50 Mbps (limited by DSL distance)

### Fiber Deployment Comparison

```
FTTH/FTTP: [Fiber]────────────────▶ Home ✓ (Best)

FTTC:      [Fiber]────▶ Cabinet ─[VDSL]─▶ Home

FTTN:      [Fiber]────▶ Node ──[DSL]────▶ Home

Traditional DSL: [Copper]─────────────────▶ Home
```

| Type | Fiber Distance | Last Mile | Speed |
|------|----------------|-----------|-------|
| **FTTH/FTTP** | To home | None | 1-10 Gbps |
| **FTTC** | To curb | VDSL (200-1000 ft) | 25-100 Mbps |
| **FTTN** | To node | DSL (up to 18,000 ft) | 10-50 Mbps |

### Fiber Internet Technologies

#### PON (Passive Optical Network)

**Most common FTTP architecture**

**Types:**
- **GPON (Gigabit PON)**: 2.5 Gbps down / 1.25 Gbps up
- **EPON (Ethernet PON)**: 1 Gbps symmetric
- **XG-PON**: 10 Gbps down / 2.5 Gbps up

**Architecture:**
```
      OLT (Optical Line Terminal)
       │  at Provider CO
       │
    [Fiber]
       │
    Splitter (1:32 or 1:64)
    ╱  |  ╲
   ╱   |   ╲
[Fiber][Fiber][Fiber]
  │     │     │
 ONT   ONT   ONT  (Optical Network Terminal)
 Home1 Home2 Home3
```

**OLT (Optical Line Terminal):**
- At provider central office
- Manages multiple ONTs

**Splitter:**
- Passive device (no power)
- Splits one fiber to 32 or 64 homes

**ONT (Optical Network Terminal):**
- At customer premises
- Converts fiber to Ethernet

#### Active Ethernet

**Point-to-point fiber to each home**

**Characteristics:**
- Dedicated fiber per customer
- Active switches in network
- More expensive than PON

**Speeds:**
- 1-10 Gbps symmetric

### Advantages of Fiber

✅ **Extremely high speeds**: 1-10 Gbps (residential), 100+ Gbps (enterprise)
✅ **Symmetric**: Equal upload/download
✅ **Low latency**: ~1-5 ms
✅ **Future-proof**: Bandwidth can increase without new fiber
✅ **Reliable**: No interference, weather-resistant
✅ **Long distances**: 40+ km without repeaters

### Disadvantages of Fiber

❌ **Limited availability**: Not everywhere (expensive to deploy)
❌ **High installation cost**: Trenching, fiber runs
❌ **Fragile**: Fiber can break if bent too much

---

## Broadband Comparison

| Technology | Download | Upload | Latency | Distance Limit | Shared? |
|------------|----------|--------|---------|----------------|---------|
| **DSL (ADSL)** | 1.5-24 Mbps | 64 Kbps-3.5 Mbps | 10-50 ms | 18,000 ft | No |
| **Cable** | 100-1000 Mbps | 10-35 Mbps | 5-30 ms | None | Yes |
| **Fiber (FTTP)** | 100-10,000 Mbps | 100-10,000 Mbps | 1-5 ms | 40+ km | Sometimes |

### Choosing Broadband Technology

**DSL:**
- Available in most areas (existing phone lines)
- Dedicated connection (not shared)
- Lower speeds, distance-dependent

**Cable:**
- High speeds
- Shared with neighbors (variable performance)
- Widely available in urban/suburban areas

**Fiber:**
- Highest speeds and lowest latency
- Symmetric (great for upload)
- Limited availability (growing)

---

## Broadband Use Cases

### Residential

**Home users:**
- Streaming video (Netflix, YouTube)
- Online gaming
- Remote work (video calls)
- File downloads

**Recommendation:**
- Cable or Fiber (if available)
- 100-500 Mbps sufficient for most homes

### Small Business

**Requirements:**
- File uploads (cloud backups)
- Video conferencing
- VoIP phones
- Hosting small web server

**Recommendation:**
- Fiber (symmetric) preferred
- Cable acceptable (may need higher upload tier)
- 100-1000 Mbps

### Remote/Rural

**Limited options:**
- DSL (if within 18,000 ft of CO)
- Satellite (high latency)
- Cellular (4G/5G)

**Recommendation:**
- DSL if available
- Fixed wireless or satellite if no DSL/cable/fiber

---

## Broadband Limitations

### Oversubscription

**Providers oversell bandwidth:**
- Cable: 100:1 contention ratio
- Not all customers use maximum simultaneously

**Impact:**
- Slower speeds during peak hours (evenings, weekends)

### Asymmetric Speeds

**Download > Upload:**
- Problem for: Video uploads, cloud backups, hosting servers

**Solution:**
- Fiber (symmetric)
- Business cable tier (better upload)

### Data Caps

**Some ISPs impose monthly data limits:**
- Example: 1 TB/month
- Overage fees if exceeded

**Unlimited plans:**
- Available (often higher cost)

---

## Key Takeaways

1. **Broadband** provides high-speed, always-on internet (DSL, cable, fiber)
2. **DSL** uses existing phone lines with speeds up to 100 Mbps (VDSL2), limited by distance from CO (max 18,000 ft)
3. **ADSL** is asymmetric (faster download); **SDSL** is symmetric; **VDSL** is fastest DSL but short range
4. **Cable modem** uses coaxial TV cable with **DOCSIS** standard (up to 10 Gbps with DOCSIS 3.1)
5. **Cable is shared medium** with neighbors (performance varies during peak hours)
6. **FTTP/FTTH** provides fiber directly to home (highest speeds: 1-10 Gbps, symmetric)
7. **FTTC** is fiber to curb with VDSL last mile; **FTTN** is fiber to node with DSL last mile
8. **PON (Passive Optical Network)** is common FTTP architecture with OLT, splitter, and ONT
9. **Fiber advantages**: Very high speeds, symmetric, low latency, future-proof
10. **DSL dedicated**, **cable shared**, **fiber may be shared** (PON) or dedicated (Active Ethernet)

---

## References

- **CompTIA Network+ N10-008 Objective 2.1:** Compare and contrast WAN technologies (DSL, cable, fiber)
- ITU-T G.992: ADSL Standards
- CableLabs: DOCSIS Specifications
- ITU-T G.984: GPON Standard
- Professor Messer: Network+ N10-008 - Broadband Technologies

---

**Next Lesson:** Lesson 72 - Cellular Technologies (4G LTE, 5G, CDMA, GSM)
