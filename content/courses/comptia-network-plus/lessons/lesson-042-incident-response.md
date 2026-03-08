---
id: lesson-042-incident-response
title: Incident Response
chapterId: ch5-network-security
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

## Learning Objectives

After completing this lesson, you will be able to:

- Understand incident response lifecycle
- Develop incident response plans
- Detect and analyze security incidents
- Contain and eradicate threats
- Conduct post-incident reviews

---

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

## Summary

In this lesson, we explored the incident response lifecycle for managing security events. The NIST SP 800-61 framework defines four phases: (1) Preparation — building the IR team, acquiring forensic tools (write blockers, FTK Imager, Wireshark, Volatility), and establishing procedures; (2) Detection and Analysis — identifying incidents through IDS/IPS alerts, SIEM correlations, and log anomalies, then classifying severity; (3) Containment, Eradication, and Recovery — isolating affected systems, removing the threat, restoring from clean backups, and verifying functionality; (4) Post-Incident Activity — conducting lessons-learned reviews and updating defenses. Evidence must be collected following the order of volatility (RAM first, then disk), with chain of custody documentation for legal admissibility. The IR team includes an incident manager, technical lead, system/network administrators, legal counsel, communications, and HR. Tabletop exercises and simulation scenarios validate the IR plan before a real incident occurs.

## Practice Questions


**Q1.** What are the four phases of the NIST incident response lifecycle, in order?

A) Detection, Containment, Recovery, Documentation
B) Preparation, Detection and Analysis, Containment/Eradication/Recovery, Post-Incident Activity
C) Identification, Escalation, Remediation, Closure
D) Planning, Monitoring, Response, Archiving

<details>
<summary>Answer</summary>

**B)** The NIST SP 800-61 incident response lifecycle consists of four phases: (1) Preparation, (2) Detection and Analysis, (3) Containment, Eradication, and Recovery, and (4) Post-Incident Activity. This is a continuous cycle where lessons learned from each incident feed back into the preparation phase.
</details>


**Q2.** When collecting digital evidence, which should be captured first according to the order of volatility?

A) Hard drive contents
B) System memory (RAM)
C) Backup tapes
D) Network logs stored on a SIEM

<details>
<summary>Answer</summary>

**B)** The order of volatility dictates that the most volatile evidence be collected first. System memory (RAM) is the most volatile because its contents are lost when the system is powered off or rebooted. Hard drive contents persist across reboots, and backup tapes and SIEM logs are the least volatile. Capturing RAM first preserves running processes, network connections, and encryption keys.
</details>


**Q3.** During an active ransomware incident, the IR team isolates affected systems from the network while keeping them powered on. Which containment strategy is being applied?

A) Long-term containment
B) Eradication
C) Short-term containment
D) Recovery

<details>
<summary>Answer</summary>

**C)** Short-term containment focuses on immediately stopping the spread of an incident with minimal disruption, such as isolating affected systems from the network. The systems are kept powered on to preserve volatile evidence. Long-term containment involves more permanent measures while preparing for eradication. Eradication removes the threat, and recovery restores normal operations.
</details>


**Q4.** A forensic investigator transfers a hard drive from the evidence locker to the analysis lab. She logs the date, time, her name, the recipient, and the reason for the transfer. What process is she following?

A) Change management
B) Chain of custody
C) Risk assessment
D) Access control review

<details>
<summary>Answer</summary>

**B)** Chain of custody is the documentation process that tracks evidence handling from collection through final disposition, recording who handled the evidence, when, where, and why. This maintains the integrity and legal admissibility of digital evidence. Change management governs infrastructure changes. Risk assessment evaluates threats. Access control review audits permissions.
</details>


**Q5.** After resolving a security incident, the IR team conducts a lessons-learned meeting. What is the primary purpose of this post-incident activity?

A) To assign blame to the employee who caused the incident
B) To identify what worked, what failed, and how to improve the IR process and defenses for future incidents
C) To permanently archive all evidence so it cannot be reviewed again
D) To reset all user passwords organization-wide

<details>
<summary>Answer</summary>

**B)** The lessons-learned (post-incident) meeting is a blameless review focused on identifying what went well, what could be improved, and what changes should be made to policies, procedures, tools, and training. The goal is continuous improvement of the incident response process and organizational defenses. Assigning blame discourages reporting. Evidence should be retained per policy, not permanently archived in an inaccessible way.
</details>


## References

- CompTIA Network+ N10-009 Exam Objectives: Objective 4.5 — Given a scenario, describe the use of policies, plans, and procedures (incident response)
- NIST SP 800-61 Rev. 2: Computer Security Incident Handling Guide
- NIST SP 800-86: Guide to Integrating Forensic Techniques into Incident Response
- SANS Institute: Incident Handler's Handbook
- ISO/IEC 27035:2023: Information Security Incident Management
- Stallings, W. (2021). *Network Security Essentials: Applications and Standards* (7th ed.). Pearson — Incident Response and Forensics
