---
id: physical-security
title: Physical Security
chapterId: ch4-network-security
order: 32
duration: 100
objectives:
  - Understand physical security controls and zones
  - Implement access control systems
  - Secure data centers and equipment
  - Prevent physical attacks and theft
  - Implement environmental controls
---

# Lesson 32: Physical Security

## Introduction

Physical security is often overlooked in network security discussions, yet it's the foundation upon which all other security controls rest. No amount of firewalls, encryption, or authentication can protect your network if an attacker can walk into your server room and steal equipment or plug in a malicious device.

In this lesson, we'll explore physical security measures for protecting network infrastructure, including access controls, environmental controls, surveillance systems, and physical barriers that protect your network hardware from unauthorized access, theft, and environmental damage.

**Key Principle:** If an attacker has physical access to your equipment, assume they have complete access to your data.

## Physical Access Controls

### Facility Access Control

**Defense Perimeter Layers:**

**1. Property Perimeter:**
- Fencing (6-8 feet minimum, topped with barbed wire for high-security)
- Gates with vehicle barriers (bollards)
- Security lighting
- Clear lines of sight (trim vegetation)
- Security patrol areas

**2. Building Perimeter:**
- Locked doors (all entry points controlled)
- Reception desk (manned during business hours)
- Visitor management system
- Loading dock security
- Window security (reinforced glass, bars on ground floor)

**3. Interior Zones:**
- Locked office doors
- Card access to sensitive areas
- Turnstiles or mantraps
- Security escorts for visitors

**4. Server Room / Data Center:**
- Highest security level
- Multiple authentication factors required
- Video surveillance
- Strict access logging
- No unauthorized entry under any circumstances

### Authentication Methods

**Something You Have - Badge Systems:**

**Proximity Cards (RFID):**
```
Advantages:
- No contact required
- Fast entry
- Difficult to duplicate
- Can be remotely disabled

Disadvantages:
- Can be lost or stolen
- No verification of authorized user
- Susceptible to cloning attacks

Best Practice:
- Combined with PIN or biometric
- Time-based access restrictions
- Alert on unusual access patterns
```

**Smart Cards:**
```
Features:
- Embedded chip stores credentials
- Can perform cryptographic operations
- Higher security than proximity cards
- Can store multiple credentials

Example: CAC (Common Access Card) used by US military
- Photo ID
- Digital certificates
- PIN required for use
- Multi-factor authentication
```

**Something You Are - Biometric Systems:**

**Fingerprint Scanners:**
```
Advantages:
- Cannot be lost or forgotten
- Fast authentication
- Widely accepted

Disadvantages:
- False acceptance rate (FAR): ~1 in 50,000
- False rejection rate (FRR): ~1 in 1,000
- Can be spoofed with high-quality copies
- Injuries or dirt affect accuracy

Best Practice:
- Use as part of multi-factor authentication
- Require card + fingerprint for high-security areas
```

**Iris/Retina Scanners:**
```
Advantages:
- Extremely accurate (FAR: 1 in 1.2 million)
- Difficult to spoof
- No physical contact required

Disadvantages:
- Expensive
- Slower than fingerprint
- Some users uncomfortable with eye scanning
- Glasses/contacts can interfere
```

**Facial Recognition:**
```
Advantages:
- No contact required
- Passive authentication
- Can identify at distance

Disadvantages:
- Affected by lighting conditions
- Facial changes (aging, makeup, facial hair)
- Privacy concerns
- Can be fooled by photos (without liveness detection)

Best Practice:
- Use 3D facial recognition with liveness detection
- Secondary authentication for critical areas
```

**Something You Know - PINs and Passwords:**

**PIN Pads:**
```
Configuration Best Practices:
- 6+ digit PINs for high-security areas
- Account lockout after 3-5 failed attempts
- Anti-tailgating (require re-authentication for each person)
- Scramble keypad layout to prevent wear pattern analysis
- Shield from camera view

Security Considerations:
- Shoulder surfing risk
- Keypad wear patterns reveal common digits
- Can be observed by cameras
```

### Mantraps and Turnstiles

**Mantrap (Access Control Vestibule):**

**Design:**
```
[Door 1] --> [Small Room] --> [Door 2]
- Only one door can be open at a time
- Person authenticated at Door 1
- Enters mantrap (Door 1 closes)
- Re-authenticated at Door 2
- Prevents tailgating
- Can include weight sensors, camera verification
```

**Implementation Example:**
```
Data Center Mantrap Configuration:
1. Employee badges in at Door 1 (RFID + PIN)
2. Door 1 closes and locks
3. Cameras verify single occupant
4. Weight sensors confirm one person
5. Employee scans fingerprint at Door 2
6. Door 2 opens to data center
7. Both doors cannot be open simultaneously

Cost: $50,000 - $200,000 installed
Effectiveness: 99.9% prevention of tailgating
```

**Turnstiles:**
```
Types:
- Waist-high: Controls pedestrian traffic
- Full-height: Prevents climbing over (7-8 feet)
- Optical: Uses sensors, no physical barrier

Advantages:
- Lower cost than mantraps ($5,000 - $20,000)
- Faster throughput
- Clear visual deterrent

Disadvantages:
- Can be jumped (waist-high)
- May not prevent tailgating
- Not suitable for highest security requirements
```

### Access Logging and Monitoring

**Door Access Logs:**
```
Required Information:
- Badge/credential ID
- Name of person
- Date and time
- Door/location accessed
- Success or failure
- Exit time (for tracking occupancy)

Log Retention:
- Industry standard: 90 days minimum
- Compliance requirements may require longer
- PCI-DSS: 3 months minimum
- HIPAA: 6 years for audit trail

Alert Conditions:
- Access outside authorized hours
- Multiple failed access attempts
- Piggybacking detected (weight sensor)
- Door held open beyond time limit (30 seconds)
- Access to unusual location for user
```

**Example Access Policy:**
```
User: John Smith (Network Engineer)
Authorized Areas:
- Building entrance: 6:00 AM - 8:00 PM, Mon-Fri
- IT Office: 6:00 AM - 8:00 PM, Mon-Fri
- Server Room: 8:00 AM - 6:00 PM, Mon-Fri (requires approval)
- Data Center: Never (must be escorted by authorized personnel)

Alert Triggers:
- Access attempt outside hours
- 3+ failed badge scans
- Access to unauthorized area
- Access to server room sends alert to manager
```

## Environmental Controls

### Temperature and Humidity Control

**Server Room Temperature Requirements:**

**ASHRAE Standards (American Society of Heating, Refrigerating and Air-Conditioning Engineers):**
```
Recommended Operating Range:
- Temperature: 64.4°F - 80.6°F (18°C - 27°C)
- Humidity: 40% - 60% relative humidity
- Dew point: 41.9°F - 59°F (5.5°C - 15°C)

Allowable Range (short-term):
- Temperature: 59°F - 89.6°F (15°C - 32°C)
- Humidity: 20% - 80% relative humidity

Why It Matters:
- Too hot: Equipment overheating, shortened lifespan
- Too cold: Condensation risk
- Too humid: Corrosion, condensation
- Too dry: Static electricity, ESD damage
```

**Cooling Systems:**

**Precision Air Conditioning (PAC):**
```
Design:
- 24/7 operation
- Higher airflow than comfort cooling
- Better humidity control
- Redundant systems (N+1 or N+2)

Capacity Calculation:
- Server heat: ~3.4 BTU per watt
- Example: 50 kW server load
- Cooling needed: 50,000W × 3.4 = 170,000 BTU/hour
- Plus: Lighting, people, external heat gain

Cost: $5,000 - $20,000 per ton
Efficiency: 1.2 - 1.5 watts cooling per watt IT load
```

**Hot Aisle / Cold Aisle Containment:**
```
Configuration:
[Cold Aisle] - Racks face cold aisle (air intake)
[Hot Aisle]  - Racks exhaust to hot aisle

Benefits:
- 20-30% improved cooling efficiency
- Better air circulation
- Prevents hot/cold air mixing
- Allows higher density deployments

Implementation:
- Cold aisle: 68-72°F
- Hot aisle: 90-110°F (much hotter, separated)
- Plastic curtains or doors contain aisles
- Blank panels fill empty rack spaces
```

**Temperature Monitoring:**
```bash
# Example temperature monitoring configuration
# SNMP temperature sensors placed throughout data center

Sensor Placement:
- Top, middle, bottom of each rack
- Cold aisle floor level
- Hot aisle ceiling level
- Near CRAC units

Alert Thresholds:
- Warning: 77°F (25°C)
- Critical: 82°F (28°C)
- Emergency shutdown: 95°F (35°C)

SNMP Configuration (Cisco):
snmp-server host 10.1.1.200 traps
snmp-server enable traps envmon temperature
```

### Fire Suppression Systems

**Fire Detection:**

**Smoke Detectors:**
```
Types:
1. Ionization: Detects fast-burning fires
2. Photoelectric: Detects smoldering fires
3. Aspirating: Very early detection (before visible smoke)

Data Center Recommendation:
- VESDA (Very Early Smoke Detection Apparatus)
- Detects smoke at 0.005% obscuration per meter
- Provides up to 30 minutes warning
- Cost: $10,000 - $30,000 per zone
```

**Heat Detectors:**
```
Types:
- Fixed temperature: Activates at set temperature (135°F)
- Rate-of-rise: Activates on rapid temperature increase

Use Cases:
- Backup to smoke detection
- Areas where smoke expected (kitchens)
- Lower maintenance than smoke detectors
```

**Fire Suppression Methods:**

**Clean Agent Systems (Preferred for Data Centers):**

**FM-200 (HFC-227ea):**
```
Advantages:
- Non-conductive
- No residue
- Safe for equipment
- Rapid fire suppression (10 seconds)
- Safe for occupied spaces

Disadvantages:
- Expensive ($20-$40 per square foot)
- Requires sealed room
- Limited oxygen after discharge (evacuate)

Concentration: 7-9% by volume
Cost: $50,000 - $200,000 for typical server room
```

**Inergen (IG-541):**
```
Composition: 52% nitrogen, 40% argon, 8% CO2
Advantages:
- Natural gases (environmentally friendly)
- No residue
- Safe for occupied spaces (breathable)
- No ozone depletion potential

Disadvantages:
- Requires larger storage tanks (higher pressure)
- More expensive than FM-200

Best for: Large data centers, 24/7 occupied spaces
```

**Water-Based Systems (Less Common in Data Centers):**

**Pre-Action System:**
```
How It Works:
1. Smoke/heat detected
2. Air pressure released from pipes (but no water yet)
3. Second detection required for water release
4. Provides time to investigate false alarms

Advantages:
- Double-interlock prevents accidental discharge
- Suitable for areas with equipment
- Less risk than wet-pipe system

Disadvantages:
- Water damage still possible
- Complex system
- Higher cost
```

**Emergency Procedures:**
```
Fire Alarm Activation:
1. Evacuate personnel immediately
2. Do NOT attempt to fight electrical fires with water
3. Use only Class C fire extinguishers (electrical)
4. Activate manual fire suppression (if trained)
5. Call emergency services
6. Do not re-enter until cleared by fire department

Post-Fire Recovery:
1. Document all damage (photos, inventory)
2. Assess equipment damage
3. Dry out equipment (professional service)
4. Test equipment before powering on
5. Review incident and update procedures
```

### Power Protection

**Uninterruptible Power Supply (UPS):**

**UPS Types:**

**1. Standby (Offline) UPS:**
```
Normal: Power passes through directly
Outage: Switches to battery (5-10ms switchover)

Advantages:
- Inexpensive ($100 - $500)
- 95%+ efficiency

Disadvantages:
- No conditioning of power
- Brief switchover time
- Not suitable for critical equipment

Best for: Workstations, small office equipment
```

**2. Line-Interactive UPS:**
```
Features:
- Automatic voltage regulation (AVR)
- Filters power fluctuations
- Faster switchover (<4ms)

Advantages:
- Better power conditioning
- Handles brownouts without battery
- Mid-range cost ($200 - $2,000)

Disadvantages:
- Still has brief switchover time
- Limited power conditioning

Best for: Network equipment, small servers
```

**3. Online (Double-Conversion) UPS:**
```
Operation:
- AC → DC (rectifier) → Battery → DC → AC (inverter)
- Equipment always runs on inverter
- Zero switchover time
- Complete isolation from utility power

Advantages:
- Perfect power (clean sine wave)
- No switchover time
- Best protection against all power issues
- Suitable for critical equipment

Disadvantages:
- Expensive ($2,000 - $50,000+)
- Lower efficiency (85-90%)
- Generates heat

Best for: Data centers, critical servers

Runtime Calculation:
UPS Rating (VA) = Load (Watts) / Power Factor
Example: 5kW load, 0.8 PF = 6,250 VA UPS needed
Runtime: Depends on battery capacity (typically 5-30 minutes)
```

**UPS Sizing Example:**
```
Equipment Load:
- 2× Core switches: 300W each = 600W
- 1× Firewall: 200W
- 2× Servers: 500W each = 1,000W
- Total: 1,800W

UPS Sizing:
- Add 20% headroom: 1,800W × 1.2 = 2,160W
- Convert to VA: 2,160W / 0.8 PF = 2,700 VA
- Select: 3,000 VA UPS (common size)

Runtime:
- 3,000 VA UPS with 1,800W load
- Typical runtime: 10-15 minutes
- Sufficient for generator start (5 minutes)
```

**Generator Backup:**
```
Purpose: Long-term power during extended outages

Sizing:
- Calculate total load (IT + HVAC + lighting)
- Example: 50 kW IT load, 100 kW total
- Generator size: 150 kW (50% overhead)

Fuel:
- Natural gas: Unlimited runtime (if utility gas available)
- Diesel: 48-72 hours typical (500-1000 gallon tank)
- Propane: 24-48 hours typical

Automatic Transfer Switch (ATS):
- Monitors utility power
- Starts generator on failure (30-60 seconds)
- Transfers load to generator
- Monitors generator
- Returns to utility when restored

Cost: $30,000 - $200,000+ installed
Maintenance: Monthly testing, annual servicing
```

**Power Distribution:**

**Power Distribution Unit (PDU):**
```
Types:
1. Basic PDU: Power strip (no monitoring)
2. Metered PDU: Displays power usage
3. Monitored PDU: SNMP monitoring
4. Switched PDU: Remote on/off control per outlet
5. Intelligent PDU: Environmental sensors, user management

Best Practice:
- Dual power supplies on critical equipment
- PDU-A on UPS-A, PDU-B on UPS-B
- Equipment connects to both PDUs
- Automatic failover if one PDU fails

Example Monitored PDU Configuration:
snmp-server community PDU-Monitor RO
snmp-server host 10.1.1.200 traps version 2c PDU-Monitor
snmp-server enable traps pdu outlet load temperature
```

## Physical Security Measures

### Surveillance Systems

**CCTV (Closed-Circuit Television):**

**Camera Types:**

**1. Fixed Cameras:**
```
Use: Monitor specific location (entry door, server rack)
Resolution: 1080p minimum, 4K preferred
Features: 
- Night vision (IR LEDs)
- Wide dynamic range (WDR) for varied lighting
- H.265 compression (better than H.264)

Placement:
- All entry/exit points
- Server room racks
- Equipment cages
- Parking areas
```

**2. PTZ (Pan-Tilt-Zoom) Cameras:**
```
Use: Cover large areas, operator-controlled
Features:
- 360° pan, ±90° tilt
- 20×-40× optical zoom
- Preset positions
- Auto-tracking (motion detection)

Limitations:
- Can only view one direction at a time
- More expensive ($500 - $5,000 each)
- Requires operator or automation

Best Use: Large open areas, parking lots
```

**Video Retention:**
```
Industry Standards:
- Low security: 30 days
- Medium security: 60 days
- High security: 90+ days

Compliance Requirements:
- PCI-DSS: 90 days minimum
- Many regulations: 30-90 days

Storage Calculation:
- 1080p @ 30fps, H.265: ~1-2 GB per hour per camera
- 10 cameras, 90 days: 10 × 24 × 90 × 1.5GB = 32.4 TB
- RAID 6 recommended (requires ~40TB raw storage)
```

**Video Analytics:**
```
Capabilities:
- Motion detection (reduce storage)
- Facial recognition
- License plate recognition (LPR)
- Loitering detection
- Perimeter violation
- Object removal detection

Example Alert:
"Person detected in server room outside authorized hours"
"Rack door opened without access badge scan"
"Equipment removed from cage"
```

### Equipment Protection

**Server Rack Security:**

**Locking Mechanisms:**
```
1. Basic Lock: Key lock (least secure)
2. Combination Lock: 4-digit code
3. Electronic Lock: RFID/PIN (best)
   - Audit trail
   - Remote unlocking
   - Time-based access
   - Integration with access control system

Best Practice:
- Individual locks per rack for high-security
- Electronic locks with logging
- Alert on unauthorized opening
- Cameras covering rack fronts
```

**Equipment Cages:**
```
Purpose: Separate equipment in co-location facilities

Construction:
- Floor to ceiling wire mesh (2"×2" or smaller)
- Locking gate (same standard as rack)
- Separate power/cooling
- Dedicated network connections

Cost: $2,000 - $10,000 per cage
Use: Co-location, multi-tenant data centers
```

**Cable Management:**
```
Security Considerations:
- Organized cables reduce tripping hazard
- Color-coded cables (red = critical, blue = normal)
- Cable labels (both ends)
- Physical security: Prevents accidental disconnection
- Reduces troubleshooting time

Patch Panel Security:
- Lock patch panel doors
- Log all patching changes
- Before/after photos of changes
- Cable seals on critical connections
```

### Asset Tracking

**Asset Tagging:**
```
Methods:
1. Barcode labels
   - Low cost ($0.10 - $0.50 per label)
   - Requires line of sight to scan
   - Can be damaged or removed

2. RFID tags
   - Passive: $0.50 - $5 per tag, read range 1-20 feet
   - Active: $20-50 per tag, read range 100+ feet
   - No line of sight required
   - More durable

Asset Information:
- Asset tag number (unique ID)
- Description (Cisco Catalyst 9500)
- Serial number
- Purchase date and cost
- Location (Rack A1, U10-U12)
- Owner/responsible person
```

**Inventory Management:**
```
Tracking System:
- Database of all assets
- Location tracking
- Maintenance history
- Warranty status
- End of life planning

Physical Inventory:
- Quarterly inventory checks
- Compare physical to database
- Investigate discrepancies
- Update locations

Decommissioning Process:
1. Remove from production
2. Backup/migrate data
3. Secure erase (DoD 5220.22-M: 7-pass wipe)
4. Remove asset tag
5. Update database (decommissioned)
6. Physical destruction (if containing sensitive data)
7. Certificate of destruction
```

## Facility Security Best Practices

### Visitor Management

**Visitor Policy:**
```
Procedure:
1. Visitor pre-approval (24 hours advance)
2. Check-in at reception
   - Photo ID required
   - Sign visitor log
   - Visitor badge issued (photo, date, escort)
3. Escort at all times (no exceptions)
4. Restricted areas clearly marked
5. Check-out and badge return

Visitor Log Information:
- Name
- Company
- ID type and number
- Time in/out
- Purpose of visit
- Person visiting
- Escort name
- Badge number issued

Retention: 1 year minimum
```

**Escort Requirements:**
```
Escort Responsibilities:
- Remain with visitor at all times
- Ensure visitor doesn't access unauthorized areas
- Prevent photography without permission
- Ensure visitor doesn't connect devices to network
- Report any suspicious behavior

High-Security Areas:
- Two escorts required
- Visitor must be on pre-approved list
- Manager approval
- All activity logged
```

### Secure Disposal

**Media Sanitization:**

**Data Destruction Standards:**

**NIST SP 800-88 Guidelines:**
```
Clear:
- Protects against simple non-invasive recovery
- Overwrite with zeros
- Use: Internal redeployment

Purge:
- Protects against laboratory attack
- Cryptographic erase (if encrypted)
- Multiple overwrites
- Use: Releasing equipment externally

Destroy:
- Complete destruction
- Physical destruction
- Use: End of life, regulatory requirement
```

**Methods by Media Type:**

**Hard Drives:**
```
1. Software Wipe:
   - DoD 5220.22-M: 7-pass overwrite
   - Tools: DBAN, Blancco, Secure Erase
   - Time: Hours to days depending on size
   - Verification: Read back and verify

2. Degaussing:
   - Strong magnetic field destroys data
   - Renders drive unusable
   - Fast (seconds)
   - Cost: $2,000 - $10,000 for degausser

3. Physical Destruction:
   - Shredding (particles < 2mm)
   - Drilling (multiple holes through platters)
   - Crushing/bending
   - Incineration

Certificate of Destruction:
- Document serial numbers
- Method used
- Date
- Witness signatures
- Keep for compliance (7 years)
```

**Solid State Drives (SSDs):**
```
Challenge: Wear-leveling makes overwriting ineffective

Secure Methods:
1. Cryptographic Erase (if encrypted)
   - Erase encryption key
   - Data immediately unrecoverable
   - Fast (seconds)

2. Manufacturer Secure Erase
   - ATA Secure Erase command
   - Resets all cells
   - Time: Minutes

3. Physical Destruction (most certain)
   - Shredding
   - Disintegration
   - Required for highest security

Best Practice: Encrypt all SSDs from deployment
```

**Network Equipment:**
```
Router/Switch Disposal:
1. Backup configuration (for records)
2. Erase configuration:
   write erase
   erase startup-config
   erase flash:
   reload
   
3. Remove from management system
4. Physical destruction of flash memory (if high security)
5. Document disposal (asset management)

NAND Flash Security:
- Cannot be reliably erased by overwriting
- Must use manufacturer erase or destroy
```

**Paper Documents:**
```
Shredding Requirements:
- Cross-cut shredder (minimum)
- Particles < 1/32" × 1/2" (NSA requirements)
- Locked shred bins
- Shredding service for bulk

Retention Before Shredding:
- Financial: 7 years
- Network diagrams: Until superseded + 1 year
- Configuration backups: 90 days minimum
```

## Security Awareness and Training

### Social Engineering Prevention

**Tailgating/Piggybacking:**
```
Definition:
- Tailgating: Unauthorized person follows authorized person
- Piggybacking: Authorized person allows unauthorized person

Prevention:
- One person per authentication
- "Challenge culture" - question unknown people
- Mantraps/turnstiles
- Badge must be visible at all times
- Security awareness training

Training Exercise:
- Hire penetration tester to attempt tailgating
- Measure success rate
- Recognize employees who challenge
- Address those who allow access
```

**Shoulder Surfing:**
```
Definition: Observing passwords, PINs, sensitive data being entered

Prevention:
- Privacy screens on monitors
- Position screens away from view
- Shield PIN pads when entering codes
- Lock screen when leaving desk
- Clean desk policy

High-Security Areas:
- No phones/cameras in data center
- Visitor observation restricted
- Covered keyboards at secure consoles
```

**Dumpster Diving:**
```
Definition: Searching trash for sensitive information

Prevention:
- Shred all documents
- Locked trash/shred bins
- Secure area for dumpsters
- Clear desk policy (no documents left out)
- Erase whiteboards
- Destroy labels/asset tags before disposal

What Attackers Find:
- Network diagrams
- Passwords written down
- Configuration printouts
- Orgchart/directory
- Equipment serial numbers
```

### Physical Security Training

**Employee Training Topics:**
```
Annual Training (All Employees):
- Badge requirements
- Challenging unknown persons
- Tailgating prevention
- Reporting security incidents
- Clean desk policy
- Secure disposal

Specialized Training:
- Data center access (authorized personnel)
- Visitor escort procedures
- Incident response
- Emergency procedures

Metrics:
- Training completion rate: 100% within 30 days of hire
- Annual refresher: 100% by Q1
- Test scores: 80%+ passing
- Phishing test: <5% click rate
```

## Review Questions

1. **What is a mantrap and how does it prevent tailgating?**
   - A mantrap is a small room with two interlocking doors. Only one door can open at a time, and authentication is required at each door, preventing tailgating.

2. **What is the recommended temperature range for data centers according to ASHRAE?**
   - 64.4°F - 80.6°F (18°C - 27°C) recommended operating range

3. **What are the three types of UPS systems?**
   - Standby (offline), Line-interactive, Online (double-conversion)

4. **What is the difference between FM-200 and water-based fire suppression?**
   - FM-200 is a clean agent (no residue, safe for equipment), while water causes equipment damage

5. **What is the DoD 5220.22-M standard?**
   - 7-pass overwrite method for secure hard drive erasure

6. **What is the difference between tailgating and piggybacking?**
   - Tailgating is unauthorized access by following someone; piggybacking is when authorized person allows it

7. **What is hot aisle/cold aisle containment?**
   - Data center layout where server intake (cold) and exhaust (hot) aisles are separated for efficient cooling

8. **What information should be logged for door access?**
   - Badge ID, name, date/time, location, success/failure, exit time

9. **What is the purpose of a pre-action fire suppression system?**
   - Requires two separate triggers (double-interlock) before releasing water, preventing accidental discharge

10. **What is dumpster diving and how can it be prevented?**
    - Searching trash for sensitive info; prevented by shredding documents, locked trash bins, secure disposal

## Key Takeaways

- **Physical security is foundational** - all other controls fail if attacker has physical access
- **Defense in depth** applies to physical security: multiple layers from property perimeter to equipment
- **Environmental controls** (temperature, humidity, fire suppression) protect equipment from damage
- **Power protection** (UPS, generators) ensures availability during outages
- **Access controls** must be multi-factor for high-security areas
- **Surveillance and logging** provide detective controls and forensic evidence
- **Secure disposal** is critical - data must be unrecoverable from decommissioned equipment
- **Security awareness** training prevents social engineering attacks

## Next Steps

In the next lesson, we'll explore **Authentication and Authorization** mechanisms, including protocols like RADIUS, TACACS+, 802.1X, and access control models.

---

**Lesson Complete!** You now understand physical security measures that protect network infrastructure from unauthorized access and environmental threats.
