---
id: "lesson-085"
title: "Network Documentation and Troubleshooting Best Practices"
chapterId: "chapter-09"
order: 85
duration: 24
objectives:
  - "Understand the importance of network documentation for troubleshooting"
  - "Create and maintain network baselines for performance comparison"
  - "Implement effective ticketing and change management processes"
  - "Utilize log files and monitoring for proactive troubleshooting"
  - "Apply systematic documentation practices to improve problem resolution"
---

# Network Documentation and Troubleshooting Best Practices

## Introduction

Effective troubleshooting doesn't begin when a problem occurs—it begins with proper preparation. Network documentation, baseline measurements, structured ticketing systems, and comprehensive logging create the foundation for rapid problem diagnosis and resolution. Without documentation, every troubleshooting session starts from zero, wasting time rediscovering network topology, configurations, and normal behavior.

In this lesson, we'll explore:
- **Network documentation** types and best practices
- **Baseline measurements** for performance comparison
- **Ticketing systems** for problem tracking and resolution
- **Change management** to prevent problems
- **Log analysis** for troubleshooting and security
- **Monitoring and alerting** for proactive issue detection

Implementing these practices transforms troubleshooting from reactive firefighting to proactive network management, reducing downtime and improving overall network reliability.

---

## Network Documentation

### Why Documentation Matters

**Benefits of Proper Documentation**:
- **Faster troubleshooting**: Quickly reference topology, configurations, IP addressing
- **Reduced errors**: Prevent duplicate IP assignments, incorrect configurations
- **Knowledge transfer**: New staff can quickly understand network
- **Change management**: Document changes, track configurations over time
- **Capacity planning**: Understand current utilization to plan upgrades
- **Disaster recovery**: Rebuild network quickly after failure
- **Compliance**: Meet regulatory requirements for documentation

**Cost of Poor Documentation**:
- Extended downtime (searching for information during outage)
- Configuration errors (lack of standardization)
- Repeated mistakes (no record of previous issues)
- Knowledge loss when staff leave
- Difficulty troubleshooting complex issues

### Types of Network Documentation

**1. Network Topology Diagrams**

**Physical Topology**:
- Shows physical layout of devices
- Includes rack locations, cable paths
- Documents connection types (fiber, copper, wireless)
- Identifies data centers, wiring closets, network rooms

**Example Elements**:
```
Data Center:
- Core switches (2× Catalyst 9500)
- Firewalls (2× ASA 5525-X in HA)
- Routers (2× ISR 4451 for WAN)
- UPS and power distribution

Floor Wiring Closet 3:
- Access switch (Catalyst 9300 48-port)
- Patch panels (4× 48-port Cat6)
- Fiber uplink to core (2× 10 Gbps)
- Rack: 42U, Location: Room 305
```

**Logical Topology**:
- Shows logical relationships between devices
- Includes IP addressing, VLANs, routing
- Documents subnets, default gateways
- Shows traffic flow and routing paths

**Example Elements**:
```
VLAN 10 (Sales): 192.168.10.0/24
  - Gateway: 192.168.10.1 (Core Switch)
  - DHCP: 192.168.10.100-.200
  - Static: 192.168.10.10-.50 (printers, devices)

VLAN 20 (IT): 192.168.20.0/24
  - Gateway: 192.168.20.1 (Core Switch)
  - Server subnet: 192.168.20.0/25 (0-127)
  - Workstation subnet: 192.168.20.128/25 (128-254)
```

**Tools for Creating Diagrams**:
- **Microsoft Visio**: Professional diagramming tool
- **Lucidchart**: Web-based diagramming (collaborative)
- **Draw.io (diagrams.net)**: Free, open-source
- **Gliffy**: Web-based, integrates with Confluence
- **Network discovery tools**: Automatically generate topology (SolarWinds, NetBrain)

**Best Practices**:
- Update diagrams immediately after changes
- Use consistent symbols and colors
- Include legends explaining symbols
- Version control (date diagrams, track revisions)
- Store in accessible location (wiki, SharePoint, network share)
- Create multiple views (physical, logical, Layer 2, Layer 3)

**2. IP Address Management (IPAM)**

**Purpose**: Track IP address assignments to prevent conflicts and waste.

**Information to Document**:
- IP address
- Subnet mask
- Hostname/device name
- MAC address
- Device type (server, workstation, printer, camera, etc.)
- Location (building, floor, room)
- Purpose/description
- Owner/department
- Static vs. DHCP reservation
- Date assigned
- Status (active, reserved, available, deprecated)

**Example Spreadsheet Format**:
```
IP Address     | Hostname      | MAC Address       | Type    | Location | Status | Notes
────────────────────────────────────────────────────────────────────────────────────────
192.168.10.1   | core-sw-01    | 00:1a:2b:3c:4d:5e | Switch  | DC-1     | Active | VLAN 10 gateway
192.168.10.10  | printer-sales | 00:11:22:33:44:55 | Printer | Floor 2  | Active | Sales dept printer
192.168.10.50  | camera-lobby  | 00:aa:bb:cc:dd:ee | Camera  | Lobby    | Active | Security camera
192.168.10.100 | -             | (DHCP Pool Start) | DHCP    | -        | Pool   | DHCP range .100-.200
```

**IPAM Tools**:
- **Spreadsheets**: Excel, Google Sheets (simple but limited)
- **phpIPAM**: Free, open-source web-based IPAM
- **NetBox**: Infrastructure Resource Modeling (IPAM + more)
- **SolarWinds IPAM**: Commercial, comprehensive
- **Infoblox**: Enterprise IPAM with DHCP/DNS integration

**Best Practices**:
- Reserve ranges for static assignments (e.g., .1-.50)
- Reserve ranges for DHCP (e.g., .100-.200)
- Document DHCP reservations (consistent IPs for specific devices)
- Update immediately when assigning new IPs
- Regular audits to find unused or conflicting IPs
- Scan network periodically to validate documentation

**3. Configuration Documentation**

**Device Configurations**:
- Backup all device configurations regularly
- Store centrally (configuration management system)
- Version control (track changes over time)
- Include startup and running configurations

**Configuration Backup Methods**:

**Manual Backup** (Cisco):
```cisco
# Copy running config to TFTP server
copy running-config tftp://192.168.1.100/backups/router1-config-2025-11-22.txt

# Or to startup config (for persistence)
copy running-config startup-config
```

**Automated Backup Tools**:
- **RANCID** (Really Awesome New Cisco confIg Differ): Free, tracks changes
- **Oxidized**: Modern alternative to RANCID, supports many vendors
- **SolarWinds NCM**: Network Configuration Manager (commercial)
- **Ansible**: Automation tool can backup configs
- **Backup scripts**: Custom scripts via SSH/Telnet

**What to Document**:
- Device hostname and IP
- IOS/firmware version
- Interface configurations (IPs, VLANs, descriptions)
- Routing protocol configuration
- ACLs and firewall rules
- DHCP server configuration
- DNS server configuration
- QoS policies
- Spanning tree settings
- Passwords and SNMP community strings (encrypted/secured location)

**Best Practices**:
- **Automate backups**: Daily or after each change
- **Version control**: Use Git for configuration management
- **Test restores**: Periodically verify backups can be restored
- **Secure storage**: Encrypted, access-controlled location
- **Change documentation**: Note why configuration changed

**4. Cable Management Documentation**

**Purpose**: Track physical cable connections for troubleshooting and maintenance.

**Information to Document**:
- Cable ID/label
- Source device and port
- Destination device and port
- Cable type (Cat6, fiber SMF/MMF, coax)
- Cable length
- Installation date
- Path/conduit used
- Certification test results

**Example**:
```
Cable ID: C-101
Source:   Core-SW-01, Port Gi1/0/1
Dest:     Access-SW-Floor2, Port Gi1/0/48
Type:     Multimode fiber (OM3), LC-LC
Length:   45 meters
Path:     Conduit A, Data Center → Floor 2 IDF
Installed: 2024-05-15
Tested:   Pass (attenuation 2.1 dB, well within limit)
```

**Labeling Best Practices**:
- Label both ends of every cable
- Use consistent naming scheme
- Include source/destination in label
- Use color coding for cable types:
  - Blue: Horizontal cabling (to workstations)
  - Yellow: Backbone cabling (between IDFs/MDFs)
  - Red: Critical/emergency connections
  - Green: Network equipment connections

**5. Standard Operating Procedures (SOPs)**

**Purpose**: Document routine processes and troubleshooting procedures.

**Examples of SOPs**:
- New user setup (account creation, network access)
- Device provisioning (switch/router deployment)
- Network change process
- Troubleshooting workflow
- Backup and restore procedures
- Security incident response
- Disaster recovery steps

**Example SOP: Adding New Switch**

```
Title: Deploying New Access Switch
Version: 2.1
Last Updated: 2025-11-01

Prerequisites:
- Switch physically installed and powered on
- Console cable and laptop for initial config
- Network documentation updated with switch info

Procedure:
1. Console into switch
2. Configure hostname: 
   Switch(config)# hostname Access-SW-Floor3
3. Configure management IP:
   Switch(config)# interface vlan 1
   Switch(config-if)# ip address 192.168.100.23 255.255.255.0
   Switch(config-if)# no shutdown
4. Configure default gateway:
   Switch(config)# ip default-gateway 192.168.100.1
5. Configure VLANs (per VLAN standard)
6. Configure uplink ports (trunk to distribution)
7. Configure access ports (default VLAN 10)
8. Enable spanning tree (rapid-pvst)
9. Configure SNMP (community: public-readonly)
10. Save configuration: copy run start
11. Test connectivity (ping gateway, ping management server)
12. Add to monitoring system (SNMP trap destination)
13. Update network diagram and documentation
14. Label all cable connections

Verification:
- Ping management IP from management workstation
- Verify all VLANs active: show vlan brief
- Verify trunks operational: show interface trunk
- Verify spanning tree converged: show spanning-tree
- Verify monitoring system receiving SNMP data
```

**Best Practices for SOPs**:
- Keep procedures clear and concise
- Include screenshots or diagrams where helpful
- Version control (track updates)
- Review and update regularly (annually or after major changes)
- Store in accessible location (wiki, intranet, knowledge base)
- Train staff on SOPs

---

## Network Baselines

### What is a Baseline?

A **baseline** is a snapshot of network performance and behavior under normal operating conditions. Baselines provide a reference point for identifying abnormal behavior during troubleshooting.

**Analogy**: Like a medical checkup—doctor records your normal vital signs (blood pressure, heart rate). If you come in sick, doctor compares current readings to baseline to identify problems.

### Why Baselines are Important

**Without Baseline**:
```
Troubleshooting scenario:
User: "The network is slow!"
Admin: "How slow? Compared to what?"
       "Is CPU at 70% normal or high for this router?"
       "Is 400 Mbps traffic on this link typical?"
       [No reference point → guessing]
```

**With Baseline**:
```
Admin checks baseline:
- Normal CPU: 20-30%
- Current CPU: 75% ← Abnormally high!
- Normal traffic: 150-200 Mbps
- Current traffic: 620 Mbps ← 3× normal!
[Clear identification of problem → investigate high traffic]
```

### What to Baseline

**1. Interface Utilization**:
- Bandwidth usage (input/output) in bps or %
- Packets per second
- Peak, average, and minimum values
- Time-of-day patterns

**Example**:
```
Interface: Gi0/1 (Core Uplink)
Capacity: 1 Gbps

Normal Baseline (Business Hours 8 AM - 6 PM):
- Average: 320 Mbps (32% utilization)
- Peak: 580 Mbps (58% utilization) at 10:30 AM and 2 PM
- Minimum: 80 Mbps (8% utilization) at 12 PM (lunch)

Normal Baseline (Evening 6 PM - 8 AM):
- Average: 45 Mbps (4.5% utilization)
- Peak: 120 Mbps (12% utilization) at 7 PM (backup window)
```

**2. CPU and Memory Utilization**:
- Device CPU percentage
- Memory usage (free/used)
- Process-specific CPU usage

**Example**:
```
Device: Core-SW-01 (Cisco Catalyst 9500)

CPU Baseline:
- Normal: 15-25%
- Peak: 35% during backup windows
- Threshold for alert: >50% for 5 minutes

Memory Baseline:
- Total: 8 GB
- Normal usage: 4.2 GB (52%)
- Threshold for alert: >90% (7.2 GB)
```

**3. Error Rates**:
- CRC errors
- Frame errors
- Collisions
- Input/output drops

**Normal Baseline**: Near-zero errors
```
Interface Gi0/1:
- CRC errors: 0-2 per day (acceptable)
- Output drops: 0-10 per day (occasional micro-bursts)
- Collisions: 0 (full-duplex, should always be 0)
```

**4. Latency and Packet Loss**:
- Round-trip time (RTT) to key destinations
- Packet loss percentage
- Jitter measurements

**Example**:
```
Ping to Internet Gateway (8.8.8.8):
- Normal latency: 12-18 ms
- Normal packet loss: 0-0.5%
- Jitter: <2 ms

Ping to Remote Site (10.2.1.1 via WAN):
- Normal latency: 45-55 ms
- Normal packet loss: 0-1%
- Jitter: <5 ms
```

**5. Application Performance**:
- Response times for key applications
- Transaction completion times
- Database query performance

**Example**:
```
Web Application Login:
- Normal: 0.8-1.2 seconds
- Threshold: Alert if >3 seconds

File Server Access:
- Normal: File open in 0.5-1.0 seconds
- Threshold: Alert if >2 seconds
```

**6. Traffic Patterns**:
- Top talkers (devices using most bandwidth)
- Protocol distribution (HTTP, SMTP, database, etc.)
- Traffic flow patterns (client-server, inter-VLAN, etc.)

**Example (NetFlow Data)**:
```
Normal Traffic Distribution:
- Web (HTTP/HTTPS): 45%
- Email (SMTP/IMAP): 10%
- File sharing (SMB): 20%
- Database: 15%
- Other: 10%

Top Talkers (Normal):
1. File Server (192.168.20.10): 180 Mbps
2. Email Server (192.168.20.15): 95 Mbps
3. Web Server (192.168.20.20): 70 Mbps
```

### Creating Baselines

**Step 1: Choose Baseline Period**:
- **Typical**: 1-2 weeks of normal operation
- **Seasonal businesses**: 1 month to capture variations
- **Avoid**: Holidays, outages, atypical events

**Step 2: Collect Data**:

**Manual Collection**:
```cisco
# Cisco devices
show interface Gi0/1
show processes cpu
show memory
show ip traffic
```

**Automated Collection**:
- **SNMP monitoring**: PRTG, Nagios, Zabbix, LibreNMS
- **NetFlow collection**: nfdump, SolarWinds NetFlow Analyzer
- **Syslog aggregation**: Splunk, ELK stack (Elasticsearch/Logstash/Kibana)
- **Packet capture**: Wireshark, tcpdump (for deep analysis)

**Step 3: Analyze Data**:
- Calculate average, minimum, maximum values
- Identify time-of-day patterns (morning rush, lunch dip, evening)
- Identify day-of-week patterns (Monday busy, Friday light, weekend minimal)
- Remove outliers (don't include outages or anomalies in baseline)

**Step 4: Document Baseline**:
```
Network Baseline Report
Generated: November 22, 2025
Period: November 8-21, 2025 (2 weeks, normal operation)

Core Uplink (Gi0/1):
- Capacity: 1 Gbps
- Average utilization: 32% (320 Mbps)
- Peak utilization: 58% (580 Mbps) at 10:30 AM daily
- Minimum utilization: 8% (80 Mbps) at 12:00 PM daily

Internet Gateway Latency (8.8.8.8):
- Average RTT: 15 ms
- Minimum RTT: 12 ms
- Maximum RTT: 22 ms
- Packet loss: 0.2%

Core Switch CPU:
- Average: 18%
- Peak: 28%
- Minimum: 12%
```

**Step 5: Set Thresholds and Alerts**:
```
Alert Thresholds (based on baseline):

Utilization:
- Warning: 70% (2× normal average)
- Critical: 85%

Latency:
- Warning: 30 ms (2× normal average)
- Critical: 50 ms

CPU:
- Warning: 50% (2× normal peak)
- Critical: 80%

Packet Loss:
- Warning: 1%
- Critical: 3%
```

### Using Baselines for Troubleshooting

**Scenario**: User reports "network is slow"

**Without Baseline**:
- Check current utilization: 420 Mbps
- "Is that normal? I don't know..."
- Random troubleshooting, waste time

**With Baseline**:
```
Check current vs. baseline:

Current: 420 Mbps (42% utilization)
Baseline: 320 Mbps (32% utilization)
Analysis: 30% increase, but still within normal range

Check latency:
Current: 18 ms
Baseline: 15 ms
Analysis: Slightly elevated but within normal

Check CPU:
Current: 65%
Baseline: 18% normal, 28% peak
Analysis: ABNORMALLY HIGH! <-- Problem identified

Next step: Investigate high CPU
- show processes cpu sorted
- Identify process consuming CPU
- Address specific process issue
```

### Maintaining Baselines

**Update Baselines Regularly**:
- Networks change over time
- New applications deployed
- User count increases/decreases
- Infrastructure upgrades

**When to Update Baseline**:
- **After major changes**: New applications, infrastructure upgrades
- **Periodically**: Quarterly or semi-annually
- **After extended holiday**: Business patterns may have changed
- **After growth**: Significant user or device increase

**Version Control**:
```
Baseline v1.0: January 2025 (initial baseline, 150 users)
Baseline v2.0: April 2025 (after VoIP deployment)
Baseline v3.0: August 2025 (after adding branch office, 200 users)
Baseline v4.0: November 2025 (current, 225 users)
```

---

## Ticketing Systems

### Purpose of Ticketing Systems

A **ticketing system** (also called **help desk system** or **issue tracking system**) provides structured method for reporting, tracking, and resolving network issues and service requests.

**Benefits**:
- **Accountability**: Every issue tracked, no lost requests
- **Prioritization**: High-priority issues escalated appropriately
- **History**: Track recurring issues, identify trends
- **Knowledge base**: Solutions documented for future reference
- **Metrics**: Measure response times, resolution rates
- **Communication**: Centralized communication between users and IT staff

### Key Ticketing System Components

**1. Ticket Creation**:
- **User-submitted**: Self-service portal, email, phone
- **Auto-generated**: Monitoring system creates ticket when alert triggers
- **Manually created**: Technician creates ticket for known issue

**Ticket Information**:
```
Ticket #: 12345
Date/Time: 2025-11-22 09:45 AM
User: John Smith (jsmith@company.com)
Department: Sales
Location: Building A, Floor 2, Desk 215

Issue Type: Network Connectivity
Priority: Medium
Subject: Cannot access network drives

Description:
User reports inability to access network file shares since 9:30 AM today.
Can access internet and email. Issue affects only network drives (\\fileserver).
Error message: "Network path not found"
```

**2. Ticket Prioritization**:

**Priority Levels**:
```
P1 - Critical:
- Complete network outage affecting all users
- Security breach
- Server down affecting business operations
- SLA: Response within 15 minutes, resolution within 4 hours

P2 - High:
- Partial outage affecting multiple users or department
- Performance severely degraded
- VoIP system issues
- SLA: Response within 1 hour, resolution within 8 hours

P3 - Medium:
- Single user connectivity issue
- Non-critical service degraded
- Equipment failure with redundancy available
- SLA: Response within 4 hours, resolution within 24 hours

P4 - Low:
- Informational, questions, requests
- Cosmetic issues
- Non-urgent feature requests
- SLA: Response within 24 hours, resolution when time permits
```

**Prioritization Matrix**:
```
         High Impact (affects many users/critical service)
              ↑
      P1      |      P1
────────────────────────────→ High Urgency (time-sensitive)
      P3      |      P2
              ↓
         Low Impact (affects few users/non-critical)
```

**3. Ticket Assignment**:
- **Tier 1**: Help desk (basic troubleshooting, password resets)
- **Tier 2**: Network technicians (advanced troubleshooting, configuration)
- **Tier 3**: Network engineers (complex issues, design, vendor escalation)

**Example Workflow**:
```
1. User submits ticket → Tier 1 receives
2. Tier 1 attempts basic troubleshooting (reboot, check cables)
3. If unresolved → Escalate to Tier 2
4. Tier 2 investigates (check switch port, VLAN, IP config)
5. If vendor hardware issue → Escalate to Tier 3 (open vendor support case)
6. Tier 3 resolves and documents solution
7. Close ticket
```

**4. Ticket Updates and Communication**:
- **Status updates**: "In Progress", "Waiting on Vendor", "Testing Solution"
- **Notes**: Document troubleshooting steps taken
- **User communication**: Keep user informed of progress

**Example Update**:
```
Ticket #12345 Update - 2025-11-22 10:15 AM
Technician: Jane Doe

Status: In Progress

Actions Taken:
- Pinged user's workstation from network: successful
- Checked switch port: operational, no errors
- Verified VLAN assignment: correct (VLAN 10)
- Checked firewall rules: allow SMB traffic from user's subnet
- Attempted to connect to \\fileserver from nearby workstation: successful

Analysis:
- Network connectivity is functional
- Issue appears to be isolated to user's workstation
- Possible causes: Mapped drive credentials, local firewall, workstation DNS

Next Steps:
- Remote into user's workstation
- Check mapped drive configuration
- Verify DNS resolves "fileserver" correctly
- Test manual connection with IP address

Estimated resolution: 30 minutes
User notified of progress.
```

**5. Ticket Resolution and Closure**:
- Document solution
- Verify user confirms resolution
- Close ticket with resolution summary

**Example Closure**:
```
Ticket #12345 - RESOLVED
Resolution Time: 45 minutes
Resolution Date: 2025-11-22 10:30 AM

Resolution Summary:
User's mapped network drive had cached credentials that expired.
Cleared cached credentials in Credential Manager.
Re-mapped drive with current credentials.
User confirmed successful access to file shares.

Root Cause: Password change last week invalidated saved credentials.

Prevention: Advised user not to save credentials for network drives.
```

### Ticketing Best Practices

**For Users**:
- Provide detailed problem description
- Include error messages (exact text or screenshot)
- Note when problem started
- Describe steps to reproduce
- List what you've already tried

**For Technicians**:
- Document all troubleshooting steps (even unsuccessful attempts)
- Update ticket status regularly
- Communicate with user (set expectations)
- Search knowledge base for similar past issues
- Add solution to knowledge base when resolved

**For Management**:
- Review ticket metrics (average resolution time, recurring issues)
- Identify trends (e.g., frequent issues with specific switch)
- Allocate resources based on ticket volume and priority
- Use tickets for change management justification

**Popular Ticketing Systems**:
- **Jira Service Management**: Atlassian, integrates with Jira
- **ServiceNow**: Enterprise ITSM platform
- **Zendesk**: Cloud-based, popular for customer support
- **Freshservice**: Modern, easy to use
- **osTicket**: Free, open-source
- **Spiceworks**: Free, includes network monitoring

---

## Change Management

### Why Change Management is Critical

**Without Change Management**:
```
Scenario:
- Network engineer makes "quick" routing change at 2 PM
- Doesn't test thoroughly
- Doesn't notify anyone
- Routing loop created → network outage
- Other engineers unaware of change, waste time troubleshooting
- Takes 3 hours to identify and revert change
- Business impact: $50,000 lost productivity
```

**With Change Management**:
```
Scenario:
- Engineer submits change request
- Change reviewed and approved
- Change scheduled for maintenance window (Saturday 2 AM)
- Backups of configurations taken
- Testing plan documented
- Rollback plan prepared
- Change implemented and tested
- Success → documented
- If failure → rollback executed per plan
- Business impact: $0 (no disruption)
```

### Change Management Process

**Step 1: Change Request**:
```
Change Request Form

Change ID: CR-2025-1122-001
Submitted By: Jane Doe, Network Engineer
Date: November 22, 2025

Change Description:
Upgrade firmware on Core-SW-01 from 16.12.3 to 17.6.1

Reason for Change:
Security vulnerability patched in 17.6.1 (CVE-2025-12345)
Performance improvements in latest release

Risk Assessment: Medium
- Core switch is critical infrastructure
- Firmware upgrade requires reboot (brief downtime)
- Redundant core switch (Core-SW-02) will maintain connectivity

Affected Systems:
- Core-SW-01 (primary core switch)
- All VLANs (temporary failover to Core-SW-02 during reboot)

Scheduled Date/Time: Saturday, November 25, 2025 at 2:00 AM
Estimated Duration: 30 minutes
Maintenance Window: 2:00 AM - 4:00 AM

Implementation Plan:
1. Verify backup of current configuration (taken)
2. Upload new firmware to switch flash memory
3. Set boot variable to new firmware
4. Reload switch (traffic fails over to Core-SW-02)
5. Verify switch boots with new firmware
6. Verify all interfaces operational
7. Verify routing protocols converged
8. Test connectivity from sample workstations/servers
9. Monitor for 1 hour

Backout Plan:
If issues arise:
1. Set boot variable to old firmware version
2. Reload switch
3. Verify operation on previous firmware
4. Restore configuration backup if needed

Testing Plan:
- Ping all VLANs from Core-SW-01
- Verify OSPF neighbors up
- Verify trunks operational
- Test workstation connectivity
- Test server connectivity
- Check switch CPU and memory usage

Approval Required: Change Advisory Board (CAB)
```

**Step 2: Change Review and Approval**:

**Change Advisory Board (CAB)**:
- Network manager
- Senior engineers
- Server team representative
- Security team representative
- Business stakeholder

**Review Criteria**:
- Is change necessary?
- Is risk acceptable?
- Is implementation plan sound?
- Is backout plan adequate?
- Is timing appropriate?
- Are resources available?

**Approval Outcome**:
```
Change CR-2025-1122-001: APPROVED
Approved by: John Manager, Network Manager
Date: November 22, 2025
Conditions: None
Proceed with implementation as scheduled.
```

**Step 3: Change Implementation**:
- Execute change per plan
- Document actual steps taken (may differ slightly from plan)
- Document any issues encountered
- Test thoroughly before declaring success

**Step 4: Post-Implementation Review**:
```
Change CR-2025-1122-001: Post-Implementation Review

Implementation Date: November 25, 2025
Actual Start: 2:05 AM
Actual End: 2:38 AM
Actual Duration: 33 minutes

Outcome: SUCCESSFUL

Summary:
- Firmware upload completed without issues (12 minutes)
- Switch rebooted successfully (8 minutes)
- All interfaces came up operational
- OSPF neighbors converged within 10 seconds
- All VLANs reachable
- No errors or alerts generated

Deviations from Plan:
- Switch took 8 minutes to reboot (planned 5 minutes)
- Otherwise proceeded exactly as planned

Issues Encountered: None

Business Impact: None (no user complaints, no service interruptions)

Lessons Learned:
- Firmware upgrade process is stable and reliable
- Future upgrades of this model can follow same procedure
- Consider upgrading Core-SW-02 during next maintenance window

Status: CLOSED
```

### Emergency Changes

**Emergency change**: Urgent change required to resolve critical outage or security vulnerability.

**Abbreviated Process**:
- **Verbal approval** from change manager (document after)
- **Implement immediately** to restore service
- **Document thoroughly** during and after
- **Formal review** after emergency resolved

**Example**:
```
Emergency Change: Network Outage Recovery

Situation: Core switch failure at 10:15 AM
Impact: 200 users unable to access network
Urgency: Critical (business operations stopped)

Emergency Action:
- Replaced failed switch with spare
- Restored configuration from backup
- Verified connectivity

Verbal Approval: John Manager (10:20 AM)
Implementation: 10:20 AM - 11:05 AM (45 minutes downtime)
Users restored: 11:05 AM

Formal Documentation: Submitted within 24 hours
Post-Incident Review: Scheduled for November 29, 2025
```

---

## Log Analysis

### Types of Logs

**1. Syslog (Network Device Logs)**:

**Purpose**: Record device events, errors, configuration changes.

**Syslog Severity Levels**:
```
Level  Keyword      Description                    Example
────────────────────────────────────────────────────────────────
0      Emergency    System is unusable             Device reboot due to crash
1      Alert        Immediate action required      Power supply failure
2      Critical     Critical conditions            Temperature critical
3      Error        Error conditions               Interface down
4      Warning      Warning conditions             High CPU usage
5      Notice       Normal but significant         Configuration saved
6      Informational Informational messages        User login
7      Debug        Debug-level messages           Packet processing details
```

**Example Syslog Messages**:
```
Nov 22 10:15:32 core-sw-01 %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet1/0/5, changed state to down

Nov 22 10:16:45 core-sw-01 %SYS-5-CONFIG_I: Configured from console by admin on vty0 (192.168.100.50)

Nov 22 10:20:12 core-sw-01 %LINK-3-UPDOWN: Interface GigabitEthernet1/0/5, changed state to up

Nov 22 11:05:33 core-sw-01 %SEC-6-IPACCESSLOGP: list 101 denied tcp 192.168.50.100(12345) -> 192.168.20.10(22), 1 packet
```

**Analyzing Syslog**:
- **Identify patterns**: Repeated errors, specific times
- **Correlate events**: Multiple devices logging similar issues simultaneously
- **Security**: Failed login attempts, ACL denials
- **Performance**: High CPU warnings, interface flaps

**2. SNMP Traps**:

**Purpose**: Network devices send alerts to monitoring system when events occur.

**Example Traps**:
```
Trap: linkDown
Device: Access-SW-Floor2
OID: 1.3.6.1.6.3.1.1.5.3
Interface: GigabitEthernet0/5
Timestamp: 2025-11-22 10:15:32
Severity: Warning

Trap: authenticationFailure
Device: Core-SW-01
OID: 1.3.6.1.6.3.1.1.5.5
Source: 192.168.100.200
Timestamp: 2025-11-22 14:20:11
Severity: Error
Description: Invalid SNMP community string attempted
```

**3. Application Logs**:
- **Web server logs**: Apache, IIS, Nginx (access and error logs)
- **Database logs**: MySQL, PostgreSQL, SQL Server
- **Email server logs**: Exchange, Postfix, Sendmail
- **DHCP server logs**: Lease assignments, declines
- **DNS server logs**: Queries, zone transfers, errors

**Example DHCP Log**:
```
Nov 22 09:15:42 dhcp-server dhcpd: DHCPDISCOVER from 00:1a:2b:3c:4d:5e via eth0
Nov 22 09:15:42 dhcp-server dhcpd: DHCPOFFER on 192.168.10.150 to 00:1a:2b:3c:4d:5e via eth0
Nov 22 09:15:43 dhcp-server dhcpd: DHCPREQUEST for 192.168.10.150 from 00:1a:2b:3c:4d:5e via eth0
Nov 22 09:15:43 dhcp-server dhcpd: DHCPACK on 192.168.10.150 to 00:1a:2b:3c:4d:5e via eth0
```

**4. Security Logs**:
- **Firewall logs**: Blocked connections, intrusion attempts
- **IDS/IPS logs**: Detected attacks, suspicious patterns
- **Authentication logs**: Successful/failed logins, privilege escalation
- **Antivirus logs**: Malware detections, quarantines

### Centralized Logging

**Why Centralize Logs?**
- **Single location**: Search all logs from one interface
- **Correlation**: Identify related events across devices
- **Retention**: Long-term storage for compliance and analysis
- **Performance**: Offload log storage from network devices
- **Security**: Logs preserved even if device compromised

**Syslog Server Setup**:

**Linux Syslog Server**:
```bash
# Install rsyslog (usually pre-installed)
sudo apt install rsyslog

# Configure to receive remote syslog
sudo nano /etc/rsyslog.conf

# Uncomment these lines:
module(load="imudp")
input(type="imudp" port="514")

# Restart rsyslog
sudo systemctl restart rsyslog

# Configure network devices to send syslog here
```

**Cisco Device Configuration**:
```cisco
# Configure syslog server
logging host 192.168.100.200

# Set logging level (informational and above)
logging trap informational

# Include timestamp and sequence numbers
service timestamps log datetime msec
service sequence-numbers
```

**Popular Log Management Tools**:
- **ELK Stack** (Elasticsearch, Logstash, Kibana): Open-source, powerful
- **Splunk**: Commercial, comprehensive log analysis
- **Graylog**: Open-source, scalable
- **SolarWinds Log Analyzer**: Commercial, easy to use
- **rsyslog**: Simple syslog collection (built into Linux)

### Using Logs for Troubleshooting

**Scenario**: User reports intermittent connectivity at 2 PM daily

**Without Logs**:
- Cannot identify pattern
- Cannot determine cause
- Random troubleshooting

**With Centralized Logs**:
```
Search logs for user's switch port (Gi0/15) around 2 PM for past week:

Nov 15 14:02:15 %LINK-3-UPDOWN: Interface Gi0/15, changed state to down
Nov 15 14:02:45 %LINK-3-UPDOWN: Interface Gi0/15, changed state to up

Nov 16 14:01:50 %LINK-3-UPDOWN: Interface Gi0/15, changed state to down
Nov 16 14:02:30 %LINK-3-UPDOWN: Interface Gi0/15, changed state to up

Nov 17 14:03:10 %LINK-3-UPDOWN: Interface Gi0/15, changed state to down
Nov 17 14:03:55 %LINK-3-UPDOWN: Interface Gi0/15, changed state to up

Pattern identified: Interface flapping daily at 2 PM

Investigation: Physical issue?
- Visit user's desk at 2 PM
- Observe cleaning staff vacuuming
- Vacuum bumps desk, cable disconnects momentarily

Solution: Secure cable properly, educate cleaning staff
```

---

## Monitoring and Proactive Troubleshooting

### Network Monitoring

**Purpose**: Continuously observe network performance, detect issues before users report them.

**Monitoring Methods**:

**1. SNMP Monitoring**:
- Poll devices for statistics (CPU, memory, interface utilization)
- Receive traps (alerts) when events occur
- Graph trends over time

**2. Flow Monitoring (NetFlow/sFlow/IPFIX)**:
- Analyze traffic patterns
- Identify bandwidth usage by application/user
- Detect anomalies (DDoS, data exfiltration)

**3. Synthetic Monitoring**:
- Actively test network services (ping, HTTP requests, DNS queries)
- Measure response times
- Detect service outages immediately

**4. Packet Capture**:
- Deep inspection of traffic
- Troubleshoot complex application issues
- Security forensics

### Setting Up Monitoring

**Example: PRTG Network Monitor Setup**

**Step 1: Install PRTG**:
- Download from www.paessler.com
- Install on Windows server
- Access web interface

**Step 2: Add Devices**:
- Add switches, routers, servers
- Configure SNMP credentials
- Auto-discover network devices

**Step 3: Create Sensors**:
- **Ping sensor**: Monitor device availability
- **SNMP Traffic sensor**: Monitor interface bandwidth
- **SNMP CPU Load sensor**: Monitor CPU usage
- **SNMP Memory sensor**: Monitor memory usage

**Step 4: Set Thresholds**:
```
Sensor: Interface Traffic (Core Uplink)
Warning: Utilization > 70%
Alert: Utilization > 85%
Action: Send email to admin@company.com

Sensor: CPU Load (Core-SW-01)
Warning: CPU > 50%
Alert: CPU > 80%
Action: Send email + SMS to on-call engineer

Sensor: Ping (Internet Gateway)
Alert: Packet loss > 5% or latency > 100 ms
Action: Send email + create ticket
```

**Step 5: Create Dashboards**:
- **Overview dashboard**: All critical devices (green/yellow/red status)
- **Bandwidth dashboard**: Real-time graphs of key links
- **Server dashboard**: Server-specific metrics

**Step 6: Configure Reports**:
- Daily summary (emailed to team)
- Weekly detailed report (for management)
- Monthly capacity planning report

### Proactive Troubleshooting

**Identify Issues Before Users Notice**:

**Example 1: Increasing Utilization Trend**:
```
Monitoring graph shows:
- January: 30% average utilization
- February: 35%
- March: 42%
- April: 50%
- May: 58%

Trend: Increasing 8% per month

Prediction: Link will reach 80% (congestion threshold) by August

Proactive action:
- Schedule link upgrade for July
- Prevents congestion before users affected
```

**Example 2: Recurring Error Pattern**:
```
Logs show CRC errors on Gi0/10:
- November 1: 5 errors
- November 8: 12 errors
- November 15: 18 errors
- November 22: 25 errors

Trend: Errors increasing weekly

Proactive action:
- Test cable with certifier
- Find marginal cable (passes basic test but degrades over time)
- Replace cable before complete failure
```

**Example 3: Predictive Failure Detection**:
```
Server disk monitoring:
- SMART alerts indicating disk will fail soon
- Not yet failed, still operational

Proactive action:
- Schedule maintenance to replace disk
- Prevents unexpected downtime and data loss
```

---

## Summary

In this lesson, we explored documentation and troubleshooting best practices:

**Network Documentation**:
- **Topology diagrams**: Physical and logical layouts
- **IP Address Management (IPAM)**: Track all IP assignments
- **Configuration backups**: Version-controlled device configs
- **Cable documentation**: Track physical connections
- **SOPs**: Standard procedures for routine tasks

**Network Baselines**:
- Snapshot of normal network behavior
- Includes utilization, CPU, latency, traffic patterns
- Enables comparison during troubleshooting
- Updated regularly as network changes

**Ticketing Systems**:
- Structured problem tracking and resolution
- Prioritization based on impact and urgency
- Documentation of troubleshooting steps and solutions
- Metrics for performance measurement

**Change Management**:
- Formal process for implementing changes
- Change request, review/approval, implementation, post-review
- Reduces risk of outages due to unplanned changes
- Emergency procedures for critical situations

**Log Analysis**:
- Syslog, SNMP traps, application logs, security logs
- Centralized logging for correlation and long-term retention
- Pattern recognition for identifying recurring issues
- Security monitoring and compliance

**Monitoring and Proactive Troubleshooting**:
- Continuous observation of network performance
- SNMP, flow analysis, synthetic monitoring
- Threshold-based alerting
- Trend analysis for predictive maintenance
- Identify and resolve issues before user impact

**Key Takeaways**:
- Good documentation = faster troubleshooting
- Baselines provide reference point for identifying abnormalities
- Structured processes (ticketing, change management) reduce errors
- Proactive monitoring prevents problems before they cause outages

Implementing these practices transforms network management from reactive firefighting to proactive optimization, improving reliability and reducing downtime.

---

## Additional References

- **ITIL (Information Technology Infrastructure Library)**: IT service management framework
- **ISO/IEC 20000**: IT service management standards
- **COBIT**: Framework for IT governance and management
- **RFC 5424**: The Syslog Protocol
- **RFC 3164**: The BSD syslog Protocol
- **CompTIA Network+ N10-008 Exam Objectives**: Domain 3.2 - Explain the purpose of organizational documents and policies

