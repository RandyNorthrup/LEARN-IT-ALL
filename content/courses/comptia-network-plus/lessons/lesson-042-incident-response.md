---
id: incident-response
title: Incident Response
chapterId: ch4-network-security
order: 42
duration: 90
objectives:
  - Understand incident response lifecycle
  - Develop incident response plans
  - Detect and analyze security incidents
  - Contain and eradicate threats
  - Conduct post-incident reviews
---

# Lesson 42: Incident Response

## Introduction

Incident response is the systematic approach to managing security incidents - from detection through recovery and lessons learned. A well-defined incident response process minimizes damage, reduces recovery time and costs, and helps organizations learn from security events to improve their defenses.

In this lesson, we'll explore incident response frameworks, incident handling procedures, forensics investigation, evidence handling, containment strategies, and post-incident activities.

**Key Principle:** Proper planning prevents poor performance - preparation is 90% of successful incident response.

## Incident Response Frameworks

### NIST Incident Response Lifecycle

**Four Phases:**
```
1. Preparation
   - Develop IR plan
   - Build IR team
   - Acquire tools
   - Train personnel
   - Establish procedures

2. Detection and Analysis
   - Monitor for incidents
   - Analyze alerts
   - Classify severity
   - Document findings

3. Containment, Eradication, and Recovery
   - Contain the incident
   - Remove threat
   - Restore operations
   - Verify functionality

4. Post-Incident Activity
   - Lessons learned
   - Update procedures
   - Improve defenses
   - Report findings
```

**Continuous Cycle:**
```
Preparation → Detection → Containment → Post-Incident → [Back to Preparation]

Key Point: Each incident improves preparation for the next
```

### SANS Incident Response Process

**Six Steps:**
```
1. Preparation
2. Identification
3. Containment
4. Eradication
5. Recovery
6. Lessons Learned

Similar to NIST but more detailed phases
```

## Phase 1: Preparation

### Incident Response Team

**Team Structure:**
```
Incident Manager:
- Coordinates response
- Makes decisions
- Manages communications
- Reports to management

Technical Lead (Security Analyst):
- Technical analysis
- Forensics investigation
- Containment actions
- Tool operation

System Administrator:
- System access
- Configuration changes
- Log collection
- Restoration

Network Administrator:
- Network isolation
- Traffic analysis
- Firewall changes
- Network forensics

Communications/PR:
- Internal communications
- External communications
- Media relations
- Customer notifications

Legal Counsel:
- Legal requirements
- Evidence handling
- Law enforcement liaison
- Regulatory reporting

HR Representative:
- Employee issues
- Insider threat cases
- Policy enforcement
- Termination procedures

Management Representative:
- Business decisions
- Resource allocation
- Executive communication
- Strategic decisions
```

**Team Roles Matrix:**
```
Role                 Skills Required              Availability
Incident Manager     Leadership, decision-making  24/7 on-call
Technical Lead       Forensics, malware analysis  24/7 on-call
Sys Admin           System expertise             24/7 on-call
Net Admin           Network expertise            24/7 on-call
Communications      PR, writing                  Business hours
Legal               Legal expertise              On-demand
HR                  HR procedures                On-demand
Management          Business acumen              On-demand
```

### Incident Response Plan

**Plan Components:**
```
1. Purpose and Scope
   - What incidents are covered
   - What systems are included
   - Plan objectives

2. Roles and Responsibilities
   - Team members
   - Contact information
   - Decision authority

3. Incident Classification
   - Severity levels
   - Incident types
   - Escalation criteria

4. Communication Procedures
   - Internal notifications
   - External notifications
   - Escalation paths
   - Templates

5. Incident Handling Procedures
   - Detection methods
   - Analysis procedures
   - Containment strategies
   - Eradication steps
   - Recovery procedures

6. Evidence Handling
   - Collection procedures
   - Chain of custody
   - Storage and retention

7. Tools and Resources
   - Hardware (forensic workstations)
   - Software (analysis tools)
   - Documentation templates
   - Contact lists

8. Training and Testing
   - Training schedule
   - Tabletop exercises
   - Simulation scenarios
```

### Tools and Resources

**Forensic Workstation:**
```
Hardware:
- Write blockers (prevent evidence modification)
- Forensic duplicators (clone drives)
- Large storage (evidence copies)
- Multiple drive interfaces (SATA, IDE, USB)

Software:
- FTK Imager (disk imaging)
- Autopsy (forensic analysis)
- Wireshark (network analysis)
- Volatility (memory analysis)
- Sysinternals Suite (Windows tools)

Portable Kit:
- Laptop with forensic tools
- USB write blockers
- External drives
- Live CDs (SANS SIFT, Kali Linux)
- Cables and adapters
- Camera (for physical evidence)
- Evidence bags and labels
```

**Network Tools:**
```
Packet Capture:
- Wireshark (GUI)
- tcpdump (command-line)
- Network TAPs (hardware)

Log Analysis:
- SIEM (Splunk, ELK)
- Log aggregation
- Timeline analysis

Traffic Analysis:
- NetFlow analyzers
- Bandwidth monitors
- Protocol analyzers
```

**Incident Documentation:**
```
Templates:
- Incident report form
- Timeline template
- Chain of custody form
- Communication templates
- Evidence log

Information to Document:
- Date and time (use UTC)
- Who reported incident
- What was observed
- Actions taken
- People notified
- Evidence collected
- Systems affected
```

## Phase 2: Detection and Analysis

### Detection Sources

**Alerts and Indicators:**
```
IDS/IPS Alerts:
- Signature matches
- Anomaly detection
- Policy violations

SIEM Correlations:
- Multiple failed logins
- Unusual outbound traffic
- Off-hours access
- Geographic anomalies

Antivirus Alerts:
- Malware detected
- Suspicious behavior
- Quarantined files

Log Anomalies:
- Failed authentication
- Privilege escalation
- Unusual commands
- File access violations

Network Anomalies:
- Bandwidth spikes
- Unusual protocols
- External connections
- DNS anomalies
```

**User Reports:**
```
Common Reports:
- "My computer is slow"
- "I can't access files"
- "I received a suspicious email"
- "Strange pop-ups appearing"
- "My account was used when I was away"

Initial Questions:
- When did you first notice?
- What were you doing?
- What changed recently?
- Is anyone else affected?
- Did you click any links or open attachments?
```

### Initial Analysis

**Incident Verification:**
```
Goals:
- Confirm incident is real (not false positive)
- Determine scope
- Assess severity
- Gather initial evidence

Steps:
1. Review alert/report details
2. Check source system directly
3. Review recent logs
4. Identify affected systems
5. Determine incident type

Example:
Alert: "Possible malware on WKSTN-042"
Verification:
- Remote to workstation
- Check running processes (unusual: "svch0st.exe")
- Check network connections (external IP: 192.0.2.100:443)
- Check AV logs (quarantined file: invoice.exe)
- Conclusion: Confirmed malware infection
```

**Incident Classification:**
```
By Type:
- Malware infection
- Phishing / social engineering
- Unauthorized access
- Data breach
- Denial of service
- Insider threat
- Physical security breach
- Lost/stolen device

By Severity:
Critical:
- Data breach (sensitive data)
- Widespread ransomware
- Complete service outage
- Active APT with data exfiltration
Response: Immediate, full team activation

High:
- Limited malware outbreak
- Compromised privileged account
- Defaced website
- DDoS attack
Response: Within 1 hour, on-call team

Medium:
- Isolated malware infection
- Phishing attempt (caught)
- Suspicious activity
- Policy violation
Response: Within 4 hours, business hours

Low:
- False positive
- Minor policy violation
- Low-risk vulnerability
Response: Next business day

Example:
Incident: Ransomware on 15 workstations
Type: Malware infection (ransomware)
Severity: High (multiple systems, data encrypted)
Response: Immediate, activate IR team
```

### Scoping the Incident

**Questions to Answer:**
```
What happened?
- What type of incident?
- What vulnerability was exploited?
- What malware/technique was used?

When did it happen?
- Initial compromise time
- Discovery time
- Duration of activity

Who is affected?
- Which users?
- Which systems?
- Which departments?

Where did it originate?
- External source (IP address, email)
- Internal source (compromised account)
- Entry point (web server, email, VPN)

How did it happen?
- Attack vector
- Exploitation method
- Propagation mechanism

How far has it spread?
- Number of systems
- Network segments affected
- Data accessed

What data is at risk?
- Sensitive information accessed
- Data exfiltrated
- Data encrypted
```

**Indicators of Compromise (IoCs):**
```
Network IoCs:
- Malicious IP addresses
- Suspicious domains
- C2 (command and control) traffic patterns
- Unusual ports

Host IoCs:
- File hashes (MD5, SHA-256)
- Registry keys
- File paths
- Process names
- Scheduled tasks
- Service names

Example (Malware IoCs):
File: invoice_2024.exe
MD5: 098f6bcd4621d373cade4e832627b4f6
Path: C:\Users\jdoe\Downloads\
C2: malicious-domain.com:443
Registry: HKLM\Software\Microsoft\Windows\CurrentVersion\Run\UpdateService

Use: Search other systems for these IoCs
```

## Phase 3: Containment

### Containment Strategies

**Short-Term Containment:**
```
Goal: Stop incident from spreading
Speed: Immediate
Duration: Temporary

Actions:
- Network isolation (disconnect from network)
- Account disabling (disable compromised accounts)
- Firewall blocks (block malicious IPs)
- System shutdown (if necessary)
- Port blocking (disable vulnerable services)

Example (Ransomware):
1. Disconnect infected systems from network
   - Physical: Unplug Ethernet
   - Logical: Disable switch port
   
2. Block ransomware C2 at firewall
   - IP: 198.51.100.50
   - Domain: ransomware-payment.onion
   
3. Disable user accounts (potential patient zero)
   - Domain account: jsmith
   - Local admin accounts
   
4. Isolate network segment
   - Shutdown inter-VLAN routing temporarily
   - Isolate affected VLAN
```

**Long-Term Containment:**
```
Goal: Maintain operations while preparing for eradication
Speed: Within hours/days
Duration: Until full recovery

Actions:
- Patch systems (close vulnerability)
- Rebuild systems (clean known compromised)
- Enhanced monitoring (watch for persistence)
- Temporary workarounds (maintain business operations)

Example (Ransomware):
1. Patch vulnerability used for initial access
   - Apply MS17-010 patch to all systems
   
2. Rebuild critical systems from clean backups
   - Restore from pre-infection backup
   - Verify no infection on restored systems
   
3. Deploy additional monitoring
   - Enhanced EDR (endpoint detection and response)
   - Network traffic monitoring
   - Process monitoring
   
4. Implement temporary restrictions
   - Block email attachments (.exe, .zip)
   - Require admin approval for software installs
   - Enhanced authentication (MFA)
```

**Evidence Preservation:**
```
Critical During Containment:
- DO NOT simply turn off systems (lose memory evidence)
- Capture volatile data first (memory, network connections)
- Image disks before reimaging
- Preserve logs
- Document all actions

Memory Capture (Windows):
tools\winpmem.exe -o memory.raw

Disk Image:
FTK Imager (GUI) or:
dd if=/dev/sda of=/mnt/evidence/disk.img bs=4M

Network Connections:
netstat -ano > network_connections.txt

Running Processes:
tasklist /v > processes.txt
wmic process list full > processes_detailed.txt

Preserve Logs:
Copy-Item C:\Windows\System32\winevt\Logs\* -Destination E:\Evidence\Logs\
```

### Containment Decisions

**Decision Matrix:**
```
Factor: Business Impact
Option 1: Immediate shutdown (zero business impact tolerance)
Option 2: Isolate and monitor (balance security and operations)
Option 3: Monitor only (business continuity critical)

Example Scenarios:

Scenario 1: Ransomware on file server
Decision: Immediate shutdown
Reason: Prevent further encryption, data loss

Scenario 2: Suspicious process on web server
Decision: Isolate and monitor
Reason: Allow investigation while preventing lateral movement

Scenario 3: Potential APT on database server (production)
Decision: Enhanced monitoring, gradual containment
Reason: Cannot disrupt critical business operations, need careful evidence collection

Factors to Consider:
- Business criticality
- Data sensitivity
- Evidence preservation needs
- Risk of further damage
- Availability requirements
- Recovery time
```

## Phase 4: Eradication

### Removing the Threat

**Eradication Actions:**
```
Malware Removal:
- Delete malicious files
- Remove registry keys
- Delete scheduled tasks
- Remove services
- Kill processes

Account Cleanup:
- Reset passwords (all compromised accounts)
- Revoke API keys/tokens
- Expire sessions
- Review and remove backdoor accounts

System Hardening:
- Apply patches
- Close vulnerabilities
- Remove unnecessary services
- Implement security controls

Network Cleanup:
- Update firewall rules
- Remove unauthorized devices
- Update IPS signatures
```

**Complete Eradication Examples:**

**Example 1: Malware Removal**
```powershell
# Stop malicious process
Stop-Process -Name svch0st -Force

# Delete malware files
Remove-Item -Path C:\Users\*\AppData\Roaming\svch0st.exe -Force
Remove-Item -Path C:\ProgramData\UpdateService\* -Recurse -Force

# Remove persistence
Remove-ItemProperty -Path HKLM:\Software\Microsoft\Windows\CurrentVersion\Run -Name UpdateService

# Remove scheduled task
Unregister-ScheduledTask -TaskName "System Update Service" -Confirm:$false

# Scan with updated antivirus
Update-MpSignature
Start-MpScan -ScanType FullScan
```

**Example 2: Compromised Account**
```powershell
# Disable account immediately
Disable-ADAccount -Identity jsmith

# Force password reset on all domain users (breach response)
Get-ADUser -Filter * | Set-ADUser -ChangePasswordAtLogon $true

# Revoke all active sessions
Get-ADUser jsmith | Revoke-ADUserTokens

# Review account for unauthorized changes
Get-ADUser jsmith -Properties *
Get-ADPrincipalGroupMembership jsmith

# Check for backdoor accounts
Get-ADUser -Filter {Created -gt (Get-Date).AddDays(-7)}
```

### Validation

**Verify Eradication:**
```
Rescanning:
- Full antivirus scan
- Vulnerability scan
- IoC search across environment
- Log review for indicators

Monitoring:
- Enhanced monitoring for 7-14 days
- Watch for reinfection
- Alert on IoCs
- Network traffic analysis

Example Validation:
1. Scan all systems for malware hash:
   md5: 098f6bcd4621d373cade4e832627b4f6
   
2. Search logs for C2 domain:
   grep -r "malicious-domain.com" /var/log/*
   
3. Monitor firewall for C2 connections:
   192.0.2.100, 198.51.100.50
   
4. Verify no new persistence mechanisms:
   - Registry Run keys
   - Scheduled tasks
   - Services
```

## Phase 5: Recovery

### Restore Operations

**Recovery Steps:**
```
1. Restore from Backups:
   - Verify backup integrity
   - Confirm backup predates infection
   - Test restore on isolated system first
   - Full restore to production

2. Rebuild Compromised Systems:
   - Reimage from known-good media
   - Apply all patches
   - Reconfigure securely
   - Restore data from clean backup

3. Restore Services:
   - Bring services online gradually
   - Test functionality
   - Monitor for issues
   - Verify performance

4. Return to Normal Operations:
   - Remove temporary restrictions
   - Resume normal monitoring
   - Communicate restoration to users
```

**Recovery Example (Ransomware):**
```
Day 1: Containment Complete
- 15 infected systems isolated
- Ransomware spread stopped
- Evidence collected

Day 2: Eradication and Recovery Preparation
- Vulnerability patched (MS17-010)
- Verified backups clean (3 days before infection)
- Staged clean system images

Day 3-4: Recovery - Critical Systems
- File server: Restore from backup (2 days old)
- Application server: Rebuild and restore data
- Test functionality in isolated environment
- Deploy to production

Day 5-6: Recovery - User Workstations
- Reimage all 15 workstations
- Users restore personal files from network backup
- Reinstall applications
- Test and return to users

Day 7: Validation and Monitoring
- Full environment scan (no malware detected)
- Enhanced monitoring active
- Users returned to normal operations
- Incident documented
```

### Enhanced Monitoring

**Post-Recovery Monitoring:**
```
Duration: 7-30 days (depending on incident severity)

Monitor For:
- Reinfection indicators
- Unusual activity
- IoC reappearance
- User behavior anomalies

Enhanced Logging:
- Full packet capture (critical systems)
- Process monitoring (EDR)
- Enhanced SIEM rules
- User activity logging

Reporting:
- Daily status reports
- Weekly metrics
- Incident closure report
```

## Phase 6: Post-Incident Activity

### Lessons Learned Meeting

**Timing:**
```
Schedule: Within 2 weeks of incident resolution
Duration: 1-2 hours
Attendees: All IR team members
```

**Discussion Questions:**
```
What Happened?
- Incident timeline
- Root cause
- How was it detected?

What Went Well?
- Effective procedures
- Good teamwork
- Successful containment

What Could Be Improved?
- Gaps in detection
- Procedural issues
- Tool limitations
- Communication problems

How Can We Prevent This?
- Technical controls
- Policy changes
- Training needs
- Architecture changes

Action Items:
- Specific, assigned, with deadlines
- Track to completion
```

**Example Lessons Learned:**

**Incident:** Ransomware infection via phishing email
```
What Happened:
- Employee clicked link in phishing email
- Macro-enabled Word document downloaded
- Ransomware encrypted 15 workstations and file server
- Detected by user report after 2 hours

What Went Well:
✓ IR team assembled quickly (within 30 minutes)
✓ Effective network isolation prevented wider spread
✓ Clean backups available (daily backup policy)
✓ Recovery completed within 7 days

What Could Be Improved:
✗ Email filtering missed phishing email
✗ Users not trained on macros
✗ Detection took 2 hours (user report, not automated)
✗ File server backups were 2 days old (data loss)

Action Items:
1. Update email filter rules to block macro documents
   Owner: Email Admin
   Deadline: 2 weeks

2. Deploy EDR for faster detection
   Owner: Security Team
   Deadline: 30 days

3. Increase file server backup frequency to every 4 hours
   Owner: Backup Admin
   Deadline: 1 week

4. Conduct phishing awareness training
   Owner: Security Awareness
   Deadline: 30 days

5. Test backup restoration monthly
   Owner: IT Manager
   Deadline: Ongoing (monthly)
```

### Documentation

**Incident Report:**
```
Executive Summary:
- What happened (high-level)
- Business impact
- Resolution
- Cost
- Recommendations

Incident Details:
- Classification
- Severity
- Detection method
- Initial analysis

Timeline:
Date/Time | Event | Action Taken | By Whom
------------------------------------------------------
2024-11-01 09:15 | User reported slow computer | Remote checked system | IT Help Desk
2024-11-01 09:30 | Malware confirmed | IR team activated | Security Team
2024-11-01 09:45 | 5 systems infected | Isolated affected segment | Network Admin
... (complete timeline)

Technical Analysis:
- Attack vector
- Indicators of compromise
- Affected systems
- Data impact

Response Actions:
- Containment steps
- Eradication procedures
- Recovery actions
- Evidence collected

Metrics:
- Time to detect: 2 hours
- Time to contain: 45 minutes (from detection)
- Time to eradicate: 2 days
- Time to recover: 7 days
- Systems affected: 15 workstations, 1 file server
- Cost: $50,000 (downtime + response + recovery)

Recommendations:
1. Implement EDR for faster detection
2. Increase backup frequency
3. Enhanced email filtering
4. User security training
```

### Process Improvement

**Update Procedures:**
```
Based on Lessons Learned:
- Revise IR plan
- Update runbooks
- Create new playbooks
- Update contact lists
- Refresh training materials

Example Updates:
- Added "Ransomware Response Playbook"
- Updated detection procedures (include EDR checks)
- Added communication template for ransomware
- Updated tool inventory (added memory capture tools)
```

**Training Updates:**
```
IR Team Training:
- New tools (EDR, memory forensics)
- Updated procedures
- Scenario-based exercises

User Awareness Training:
- Phishing identification
- Incident reporting
- Safe computing practices

Tabletop Exercises:
- Quarterly simulations
- Different scenarios (ransomware, data breach, DDoS)
- Test communication procedures
- Identify gaps
```

## Digital Forensics Basics

### Evidence Collection

**Order of Volatility:**
```
Most Volatile (collect first):
1. CPU registers, cache
2. Routing tables, ARP cache, process table, kernel statistics
3. Memory (RAM)
4. Temporary file systems
5. Disk
6. Remote logging and monitoring data
7. Physical configuration, network topology
8. Archival media (backups)

Least Volatile (collect last)

Principle: Collect most volatile evidence first (disappears when power off)
```

**Collection Procedures:**
```
Live System (Volatile Data):
# Network connections
netstat -ano > network_connections.txt

# Running processes
tasklist /v > processes.txt
wmic process list full > process_details.txt

# Logged-in users
query user > logged_in_users.txt

# Open files
handle -a > open_files.txt

# Memory dump
winpmem.exe -o memory.raw

Dead System (Non-Volatile):
# Disk imaging
dd if=/dev/sda of=/mnt/evidence/disk.img bs=4M conv=noerror,sync
# Or use FTK Imager, EnCase, dd_rescue

# Verify integrity
md5sum disk.img > disk.img.md5
sha256sum disk.img > disk.img.sha256
```

### Chain of Custody

**Purpose:**
```
Prove evidence integrity
Track evidence handling
Maintain legal admissibility
Document who, what, when, where
```

**Chain of Custody Form:**
```
Evidence ID: CASE-2024-001-HDD-001
Description: 500GB Western Digital HDD from WKSTN-042
Serial Number: WD-WCAV12345678
Collected By: John Smith, Security Analyst
Date/Time: 2024-11-01 10:30 UTC
Location: Building A, Cube 242

Transfer Log:
From          To            Date/Time          Purpose
John Smith    Evidence Room 2024-11-01 11:00   Storage
Evidence Room Jane Doe      2024-11-02 09:00   Analysis
Jane Doe      Evidence Room 2024-11-05 17:00   Storage

Storage Location: Evidence locker #5, Building B
Access: Badge-controlled, video surveillance, access log

Disposal: [To be completed after retention period]
```

**Evidence Handling Best Practices:**
```
1. Document Everything:
   - Photos of evidence in place
   - Notes on collection procedure
   - Environmental conditions

2. Maintain Integrity:
   - Use write blockers
   - Hash everything
   - Store in sealed bags
   - No unauthorized access

3. Legal Considerations:
   - Proper authorization
   - Privacy laws
   - Consult legal counsel
   - Potential law enforcement involvement

4. Storage:
   - Secure facility
   - Climate controlled
   - Access logging
   - Retention policy (7 years typical)
```

## Review Questions

1. **What are the four phases of the NIST incident response lifecycle?**
   - Preparation, Detection and Analysis, Containment/Eradication/Recovery, Post-Incident Activity

2. **What is the difference between short-term and long-term containment?**
   - Short-term stops spread immediately (temporary), long-term maintains operations while preparing for eradication

3. **What is the order of volatility principle?**
   - Collect most volatile evidence first (memory before disk, as memory is lost when powered off)

4. **What is chain of custody?**
   - Documentation tracking evidence handling to prove integrity and maintain legal admissibility

5. **What should be included in an incident response plan?**
   - Roles/responsibilities, classification, procedures, communication, tools, training

6. **What is an IoC?**
   - Indicator of Compromise - artifacts that indicate security incident (IPs, file hashes, domains)

7. **What are the key questions in scoping an incident?**
   - What, when, who, where, how, how far, what data at risk

8. **What is the purpose of a lessons learned meeting?**
   - Identify what went well and what could improve, prevent future incidents

9. **Why should you not immediately shut down a compromised system?**
   - Lose volatile evidence (memory, network connections), need to capture first

10. **What metrics should be tracked for incident response?**
    - Time to detect, time to contain, time to recover, systems affected, cost, MTTR

## Key Takeaways

- **Preparation is critical** - 90% of incident response success comes from preparation
- **Documentation is mandatory** - document everything, maintain timeline, preserve evidence
- **Containment has two phases** - short-term (stop spread) and long-term (prepare for eradication)
- **Preserve evidence during containment** - capture volatile data before taking disruptive actions
- **Eradication must be complete** - verify removal, watch for reinfection
- **Recovery is gradual** - test thoroughly, monitor closely, restore gradually
- **Chain of custody is essential** - document all evidence handling for legal admissibility
- **Lessons learned drive improvement** - every incident is opportunity to improve
- **Communication is key** - internal and external stakeholders need timely, accurate updates
- **Practice makes perfect** - regular tabletop exercises, simulations, and training

## Chapter 4 Complete!

**Congratulations!** You've completed Chapter 4: Network Security. You now understand:
- Security concepts and principles
- Physical security measures
- Authentication and authorization systems
- Cryptography fundamentals
- VPNs and remote access
- Firewalls and access control lists
- IDS/IPS and network monitoring
- Wireless security
- Network access control (NAC)
- Security policies and procedures
- Vulnerability assessment
- Incident response

## Next Steps

Next, we'll begin **Chapter 5: IP Addressing and Subnetting**, where we'll explore IPv4/IPv6 addressing, subnetting, VLSM, and address planning.

---

**Lesson Complete!** You now understand incident response processes that minimize damage and facilitate recovery from security incidents.
