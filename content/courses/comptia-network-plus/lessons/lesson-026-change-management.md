---
id: change-management
title: Change Management and Configuration Control
chapterId: ch3-network-operations
order: 26
duration: 90
objectives:
  - Understand change management processes
  - Implement change control procedures
  - Document change requests and approvals
  - Plan and execute network changes safely
  - Perform rollback procedures when necessary
---

---
id: change-management
title: Change Management and Configuration Control
chapterId: ch3-network-operations
order: 26
duration: 90
objectives:
  - Understand change management processes
  - Implement change control procedures
  - Document change requests and approvals
  - Plan and execute network changes safely
  - Perform rollback procedures when necessary
---

# Lesson 26: Change Management and Configuration Control

## Introduction

Change management is the systematic approach to controlling modifications to network infrastructure, ensuring changes are carefully planned, tested, documented, and approved before implementation. Effective change management reduces outages, maintains network stability, enables rapid rollback when issues occur, and ensures compliance with regulatory requirements.

## Why Change Management Matters

### Consequences of Uncontrolled Changes

**Real-World Examples:**

**Knight Capital Group (2012):**
- Unauthorized software deployment without change control
- Trading algorithm malfunction
- $440 million loss in 45 minutes
- Company nearly bankrupt

**British Airways (2017):**
- Power supply change without proper testing
- Data center outage
- 75,000 passengers stranded
- $102 million cost

**GitLab (2017):**
- Database maintenance without verified backup
- Accidental deletion of production database
- 6,000 projects affected
- 18 hours to restore

### Benefits of Formal Change Management

**Reduced Downtime:**
- Planned changes during maintenance windows
- Rollback procedures ready if needed
- Testing catches issues before production

**Improved Communication:**
- Stakeholders informed of upcoming changes
- Users prepared for potential disruptions
- Business can plan around maintenance

**Compliance:**
- SOX, HIPAA, PCI-DSS require change control
- Audit trails for regulatory review
- Demonstrates due diligence

**Knowledge Management:**
- Changes documented for future reference
- Reduces dependency on individuals
- Facilitates training and troubleshooting

## Change Management Process

### ITIL Change Management Framework

Information Technology Infrastructure Library (ITIL) defines industry-standard change management process:

```
1. Request for Change (RFC)
2. Change Evaluation
3. Change Approval/Rejection
4. Change Planning
5. Change Implementation
6. Change Review
```

### 1. Request for Change (RFC)

#### Change Request Components

**RFC Template:**
```markdown
# Change Request Form

**Change ID:** CHG0012345
**Date Submitted:** 2025-01-15
**Submitted By:** John Smith (Network Engineer)

## Change Details
**Summary:** Upgrade Core Switch Firmware
**Type:** Standard Change (pre-approved procedure)
**Priority:** Medium
**Risk Level:** Medium

## Business Justification
**Reason for Change:**
- Security vulnerability CVE-2025-1234 in current firmware
- Bug fixes for spanning-tree issues
- Performance improvements for 10G interfaces

**Impact if NOT Implemented:**
- Potential security breach
- Continued spanning-tree instability
- Suboptimal 10G performance

## Technical Details
**Devices Affected:**
- Core-SW-01 (Primary Core Switch)
- Core-SW-02 (Secondary Core Switch)

**Current Configuration:**
- Model: Cisco Catalyst 9500-48Y4C
- Current IOS-XE Version: 17.6.3
- Target IOS-XE Version: 17.9.4a

**Dependencies:**
- Both core switches in stack configuration
- HSRP redundancy between switches
- All VLANs (1-100) traverse these switches

## Implementation Plan
**Maintenance Window:**
- Date: Saturday, January 25, 2025
- Time: 2:00 AM - 4:00 AM PST
- Duration: 2 hours (actual ~30 min per switch)
- Reason for timing: Minimal user impact

**Implementation Steps:**
1. Verify backups current (within 24 hours)
2. Download and verify firmware image (MD5 checksum)
3. Upload firmware to both switches
4. Upgrade secondary switch first (Core-SW-02)
   - Reload switch
   - Verify operation (15 minutes)
5. Upgrade primary switch (Core-SW-01)
   - Reload switch
   - Verify operation (15 minutes)
6. Test key services (HSRP, VLAN routing, trunking)
7. Monitor for 30 minutes post-change

**Verification Tests:**
- [ ] Both switches online and operational
- [ ] HSRP states correct (Active/Standby)
- [ ] All VLANs active
- [ ] Trunk links operational
- [ ] No spanning-tree topology changes
- [ ] Ping test from each VLAN to internet
- [ ] Check CPU and memory within normal range

## Rollback Plan
**Rollback Procedure:**
If issues occur after upgrade:
1. Boot from previous firmware image
   ```
   boot system flash:cat9k-universalk9.17.06.03.SPA.bin
   reload
   ```
2. Estimated rollback time: 15 minutes per switch
3. Rollback decision point: 30 minutes after each switch upgrade

**Rollback Triggers:**
- Switch fails to boot with new firmware
- HSRP not functioning correctly
- VLANs not routing properly
- Spanning-tree instability
- CPU >80% sustained
- Any critical functionality broken

## Risk Assessment
**Risk Level:** Medium

**Identified Risks:**
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Firmware boot failure | Low | High | Test on secondary switch first, rollback available |
| Configuration loss | Low | High | Backup configs verified, stored off-device |
| Extended downtime | Medium | High | Rollback plan prepared, experienced engineer on-site |
| Spanning-tree reconvergence | Low | Medium | RSTP converges <2 seconds, tested in lab |

**Service Impact:**
- Expected: 5-10 seconds per switch during reload (HSRP failover)
- Worst case: 30 minutes if rollback required

## Testing Plan
**Pre-Production Testing:**
- [X] Tested in lab environment on identical hardware
- [X] Reviewed vendor release notes for known issues
- [X] Verified compatibility with all modules/line cards
- [X] Confirmed licensing compatible with new version

## Communication Plan
**Stakeholders to Notify:**
- [ ] IT Management (Director of IT)
- [ ] NOC Team (on-call during maintenance)
- [ ] Help Desk (Saturday morning shift)
- [ ] Security Team (SIEM monitoring changes)

**Notification Timeline:**
- T-7 days: Initial notification (email to all stakeholders)
- T-3 days: Reminder notification
- T-1 day: Final notification with NOC phone number
- T-0 (start): Begin maintenance notification
- T-end: Completion notification (success or rollback)

## Approvals Required
**Change Advisory Board (CAB):**
- [ ] Network Manager: _______________ Date: ___________
- [ ] IT Director: _______________ Date: ___________
- [ ] CISO (for security changes): _______________ Date: ___________

**Implementation Authorization:**
- [ ] Change Manager: _______________ Date: ___________
```

### 2. Change Evaluation

#### Change Types

**Standard Change (Pre-Approved):**
- Low risk, routine procedure
- Pre-approved by CAB
- Follows documented procedure
- Examples: Password changes, adding users, routine patching

**Normal Change:**
- Requires full CAB review and approval
- Moderate to high risk
- Examples: Firmware upgrades, topology changes, new VLANs

**Emergency Change:**
- Urgent response to incident
- Abbreviated approval process
- Post-implementation review required
- Examples: Fixing critical security vulnerability, restoring service outage

**Change Priority Matrix:**
```
Priority | Impact | Urgency | Example
---------|--------|---------|------------------------------------------
P1       | High   | High    | Emergency fix for outage affecting 100+ users
P2       | High   | Medium  | Security patch for critical vulnerability
P3       | Medium | Medium  | Planned capacity upgrade
P4       | Low    | Low     | Documentation update, cosmetic changes
```

#### Risk Assessment

**Risk Factors:**
- **Complexity**: Number of steps, dependencies
- **Scope**: Number of devices/users affected
- **Timing**: Business hours vs. maintenance window
- **Recoverability**: How quickly can we rollback?
- **Testing**: Was change tested in non-production environment?

**Risk Calculation:**
```
Risk Score = Impact Score × Likelihood Score

Impact Score (1-5):
1 = Minimal (affects single user)
2 = Minor (affects small team)
3 = Moderate (affects department)
4 = Significant (affects entire office)
5 = Severe (affects entire organization, customers)

Likelihood Score (1-5):
1 = Very unlikely (<10% chance of issue)
2 = Unlikely (10-25% chance)
3 = Possible (25-50% chance)
4 = Likely (50-75% chance)
5 = Very likely (>75% chance)

Risk Level:
1-5: Low risk (proceed with standard approval)
6-12: Medium risk (require thorough review and approval)
13-25: High risk (require executive approval, extensive planning)
```

### 3. Change Approval

#### Change Advisory Board (CAB)

**Purpose:** Review and approve changes

**Membership:**
- Change Manager (chairperson)
- Network Manager
- Systems Manager
- Security Manager
- Application owners (as needed)
- Business representatives (for high-impact changes)

**CAB Meeting Frequency:**
- Weekly for normal changes
- Emergency meetings for urgent changes
- Quorum required for approval votes

**Approval Criteria:**
- Business justification clear
- Risk assessment acceptable
- Implementation plan detailed and realistic
- Rollback plan defined
- Testing completed
- Resources available
- Maintenance window appropriate

### 4. Change Planning

#### Implementation Planning

**Detailed Step-by-Step Procedure:**
```markdown
## Implementation Procedure: Core Switch Firmware Upgrade

**Prerequisites:**
- [X] Configuration backups completed (last 24 hours)
- [X] Firmware downloaded and MD5 verified
- [X] Lab testing completed successfully
- [X] Maintenance window approved
- [X] Rollback procedure documented and understood
- [X] Emergency contact list verified

**Required Personnel:**
- Primary Engineer: John Smith (on-site)
- Backup Engineer: Jane Doe (on-call)
- Change Manager: Bob Johnson (remote monitoring)

**Equipment Required:**
- Console cable
- Laptop with terminal software
- USB drive (firmware image backup)
- Out-of-band management access (IPMI)

**Step-by-Step Procedure:**

**Pre-Implementation (T-30 minutes):**
1. Join conference bridge (555-123-4567)
2. Verify all personnel present
3. Review go/no-go criteria
4. Confirm backup verification

**Implementation (T-0):**

Step 1: Verify Current State (10 minutes)
```cisco
Core-SW-01# show version
Core-SW-01# show redundancy states
Core-SW-01# show spanning-tree summary
Core-SW-01# show ip route summary
Core-SW-01# show running-config | redirect flash:backup-pre-change.cfg
```

Step 2: Upload Firmware to Secondary Switch (15 minutes)
```cisco
Core-SW-02# copy tftp://10.1.1.100/cat9k-universalk9.17.09.04a.SPA.bin flash:
! Verify MD5 checksum
Core-SW-02# verify /md5 flash:cat9k-universalk9.17.09.04a.SPA.bin
! Should match: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

Step 3: Set Boot Variable on Secondary Switch
```cisco
Core-SW-02# configure terminal
Core-SW-02(config)# boot system flash:cat9k-universalk9.17.09.04a.SPA.bin
Core-SW-02(config)# exit
Core-SW-02# write memory
Core-SW-02# show boot
! Verify: BOOT variable = flash:cat9k-universalk9.17.09.04a.SPA.bin
```

Step 4: Reload Secondary Switch (15 minutes)
```cisco
Core-SW-02# reload
! Confirm: Proceed with reload? [confirm] <ENTER>
! Monitor via console for boot process
! Expected boot time: 8-12 minutes
```

Step 5: Verify Secondary Switch Operation (10 minutes)
```cisco
! After switch online:
Core-SW-02# show version
! Verify: Version 17.9.4a

Core-SW-02# show redundancy states
! Verify: My state = STANDBY HOT

Core-SW-02# show processes cpu history
! Verify: CPU <50%

Core-SW-02# show memory statistics
! Verify: Memory utilization normal

Core-SW-02# show spanning-tree summary
! Verify: No topology changes

Core-SW-02# ping 8.8.8.8
! Verify: Connectivity OK
```

GO/NO-GO Decision Point:
- If all checks pass: Proceed to primary switch
- If ANY check fails: STOP, initiate rollback

Step 6: Repeat Steps 2-5 for Primary Switch
(Same procedure for Core-SW-01)

Step 7: Post-Implementation Verification (30 minutes)
```cisco
! Both switches:
show version
show redundancy states
show spanning-tree summary
show interface status | include connected
show ip route summary
show standby brief    (if using HSRP)

! Test connectivity from each VLAN:
! VLAN 10: ping 8.8.8.8 source vlan 10
! VLAN 20: ping 8.8.8.8 source vlan 20
! (Repeat for all critical VLANs)
```

**Success Criteria:**
- [ ] Both switches running version 17.9.4a
- [ ] HSRP states correct (Active/Standby)
- [ ] All VLANs operational
- [ ] Trunk links up
- [ ] No spanning-tree topology changes
- [ ] CPU <50%, memory normal
- [ ] Connectivity tests pass
- [ ] No user complaints

**Completion (T+2 hours):**
8. Update change ticket with completion status
9. Notify stakeholders of successful completion
10. Schedule post-implementation review (PIR)
11. Disconnect from conference bridge
```

#### Resource Allocation

**Personnel:**
- Primary implementer (hands-on)
- Backup implementer (available for escalation)
- Change manager (monitoring, communication)
- Application owners (testing, validation)

**Time:**
- Preparation time
- Implementation time
- Testing/verification time
- Rollback time (if needed)
- Buffer time (unexpected issues)

**Tools and Access:**
- Administrative credentials
- Console access
- Remote access (VPN, out-of-band)
- Monitoring tools
- Communication channels (conference bridge, chat)

### 5. Change Implementation

#### Pre-Implementation Checklist

```markdown
**Pre-Implementation Verification:**
- [ ] Configuration backups completed and verified
- [ ] Maintenance window confirmed with stakeholders
- [ ] All required personnel available
- [ ] Tools and equipment ready
- [ ] Communication channels tested (conference bridge)
- [ ] Rollback procedure reviewed
- [ ] Monitoring systems operational
- [ ] Emergency contacts verified
```

#### During Implementation

**Communication:**
- Maintain open communication channel (conference bridge)
- Regular status updates (every 15-30 minutes)
- Immediate escalation if issues arise

**Documentation:**
- Real-time notes in change ticket
- Screenshot/log critical outputs
- Document any deviations from plan
- Record exact timing of each step

**Go/No-Go Decision Points:**
- Defined in implementation plan
- Clear criteria for proceeding vs. rolling back
- Authorization required to continue if criteria not met

#### Post-Implementation Validation

**Immediate Validation (Within 30 minutes):**
- Verify change objectives achieved
- Test critical functionality
- Check monitoring systems (no alerts)
- Confirm no user complaints

**Extended Monitoring (24-48 hours):**
- Monitor performance metrics
- Review logs for errors or warnings
- Track user feedback
- Compare baseline metrics

### 6. Post-Implementation Review (PIR)

#### PIR Components

**Timing:** Within 1 week of change

**Attendees:**
- Implementation team
- Change manager
- Stakeholders affected by change

**Agenda:**
```markdown
## Post-Implementation Review: CHG0012345

**Date:** January 27, 2025
**Change:** Core Switch Firmware Upgrade

### 1. Change Summary
- Objective: Upgrade firmware from 17.6.3 to 17.9.4a
- Implementation date: January 25, 2025, 2:00-3:45 AM
- Status: Successful

### 2. What Went Well
- Change completed under scheduled window (1h 45m vs 2h)
- No unplanned outages
- Rollback not required
- HSRP failover worked perfectly (3 seconds downtime)
- All post-implementation tests passed

### 3. What Could Be Improved
- Secondary switch boot took longer than expected (13 minutes vs 10 minutes)
- Pre-change communication could include example downtime expectation
- Consider scripting verification steps for faster validation

### 4. Lessons Learned
- Upgrading secondary switch first was correct decision
- Console access via out-of-band management worked well
- Real-time notes in ticket system very helpful for audit trail

### 5. Action Items
- [ ] Update standard firmware upgrade procedure with new timing estimates
- [ ] Create verification script for post-upgrade checks
- [ ] Add boot time expectations to communication templates
- [ ] Owner: John Smith
- [ ] Due: February 5, 2025

### 6. Metrics
- Planned downtime: 2 hours (maintenance window)
- Actual downtime: ~6 seconds total (HSRP failover during reloads)
- Implementation time: 1 hour 45 minutes
- Rollback: Not required
```

## Configuration Management

### Version Control for Network Configurations

#### Why Version Control?

**Benefits:**
- Track changes over time
- Identify who made changes and when
- Revert to previous configuration if needed
- Compare configurations across devices
- Audit trail for compliance

#### Configuration Backup Strategies

**Automated Backups:**
- **Daily**: Core routers and switches
- **Weekly**: Distribution and access switches
- **On-change**: Triggered by syslog messages or SNMP traps

**Backup Methods:**
```bash
# TFTP (Simple, no authentication)
copy running-config tftp://10.1.1.100/Router-01-config.txt

# FTP (Username/password authentication)
copy running-config ftp://user:pass@10.1.1.100/Router-01-config.txt

# SCP (Encrypted, SSH-based)
copy running-config scp://user@10.1.1.100/Router-01-config.txt

# Via script (Linux):
#!/bin/bash
DEVICE="192.168.1.1"
DATE=$(date +%Y%m%d-%H%M%S)
sshpass -p 'password' ssh admin@$DEVICE "show run" > /backups/${DEVICE}_${DATE}.cfg
```

#### Configuration Management Tools

**RANCID (Really Awesome New Cisco confIg Differ):**
- Open-source configuration management
- Automated backups via cron
- Email diffs when changes detected
- CVS/Subversion version control integration

**Oxidized:**
- Modern alternative to RANCID
- Web interface
- Git version control
- Supports 100+ device types (Cisco, Juniper, Arista, HP, etc.)

**Ansible:**
- Configuration management and automation
- Playbooks for consistent configuration deployment
- Idempotent (safe to run multiple times)
- Agentless (SSH-based)

**Example Oxidized Configuration:**
```yaml
# /etc/oxidized/config
---
username: admin
password: password123
model: ios
interval: 3600  # Backup every hour
use_syslog: false
debug: false
threads: 30
timeout: 20
retries: 3
prompt: !ruby/regexp /^([\w.@-]+[#>]\s?)$/
rest: 0.0.0.0:8888
input:
  default: ssh
  debug: false
  ssh:
    secure: false
output:
  default: git
  git:
    user: Oxidized
    email: oxidized@example.com
    repo: "/var/lib/oxidized/configs.git"
source:
  default: csv
  csv:
    file: "/var/lib/oxidized/router.db"
    delimiter: !ruby/regexp /:/
    map:
      name: 0
      model: 1
      username: 2
      password: 3
    vars_map:
      enable: 4

# Router database file: /var/lib/oxidized/router.db
Core-Router-01:ios:admin:password:enablepass
Core-Router-02:ios:admin:password:enablepass
Dist-Switch-01:ios:admin:password:enablepass
```

**Git for Network Configurations:**
```bash
# Initialize Git repository for configs
cd /var/backups/network-configs
git init
git config user.name "Network Team"
git config user.email "network@company.com"

# Add initial configurations
git add *.cfg
git commit -m "Initial commit - baseline configs"

# After change, view differences
git diff Core-Router-01.cfg

# View history
git log --oneline Core-Router-01.cfg

# Revert to previous version
git checkout HEAD~1 Core-Router-01.cfg
```

### Configuration Compliance

#### Configuration Standards

**Baseline Configuration Template:**
```cisco
! Standard Router Configuration Template
! Version 2.1 - Last Updated: 2025-01-01

! === HOSTNAME ===
hostname <DEVICE-NAME>

! === MANAGEMENT ===
enable secret <STRONG-PASSWORD>
service password-encryption
no service pad
no ip source-route
no ip finger

! === AAA ===
aaa new-model
aaa authentication login default local
aaa authorization exec default local

! === USERS ===
username admin privilege 15 secret <ADMIN-PASSWORD>
username readonly privilege 1 secret <RO-PASSWORD>

! === CONSOLE ===
line con 0
  logging synchronous
  exec-timeout 5 0
  login local

! === VTY ===
line vty 0 4
  transport input ssh
  exec-timeout 10 0
  login local
  access-class VTY-ACL in

! === SSH ===
ip domain-name company.local
crypto key generate rsa modulus 2048
ip ssh version 2
ip ssh time-out 60
ip ssh authentication-retries 3

! === LOGGING ===
logging buffered 51200
logging host 10.1.1.200
logging trap informational
service timestamps log datetime msec localtime show-timezone
service sequence-numbers

! === SNMP ===
snmp-server community <RO-STRING> RO VTY-ACL
snmp-server location <LOCATION>
snmp-server contact <CONTACT>
snmp-server enable traps snmp linkdown linkup
snmp-server host 10.1.1.200 version 2c <TRAP-STRING>

! === NTP ===
ntp server 10.1.1.50 prefer
ntp server 10.1.1.51
clock timezone PST -8
clock summer-time PDT recurring

! === BANNER ===
banner motd ^
***********************************************
WARNING: Unauthorized access prohibited.
All activity is logged and monitored.
***********************************************
^
```

#### Compliance Checking

**Automated Compliance Auditing:**
```python
# Example Python script for compliance checking
import re
import sys

def check_compliance(config_file):
    with open(config_file, 'r') as f:
        config = f.read()
    
    issues = []
    
    # Check for required settings
    if 'service password-encryption' not in config:
        issues.append("FAIL: Password encryption not enabled")
    
    if 'ip ssh version 2' not in config:
        issues.append("FAIL: SSH version 2 not enforced")
    
    if 'logging host' not in config:
        issues.append("FAIL: Syslog server not configured")
    
    if 'ntp server' not in config:
        issues.append("FAIL: NTP server not configured")
    
    # Check for prohibited settings
    if 'no service password-encryption' in config:
        issues.append("FAIL: Password encryption explicitly disabled")
    
    if re.search(r'transport input telnet', config):
        issues.append("FAIL: Telnet enabled (should be SSH only)")
    
    if re.search(r'enable password', config):
        issues.append("FAIL: Plaintext enable password (should be secret)")
    
    # Print results
    if issues:
        print(f"Compliance check FAILED for {config_file}:")
        for issue in issues:
            print(f"  - {issue}")
        return False
    else:
        print(f"Compliance check PASSED for {config_file}")
        return True

# Check all device configs
configs = ['Core-Router-01.cfg', 'Core-Router-02.cfg']
results = [check_compliance(cfg) for cfg in configs]

if not all(results):
    sys.exit(1)  # Exit with error code
```

## Emergency Changes

### When to Use Emergency Change Process

**Criteria:**
- Critical service outage
- Security breach or vulnerability
- Data loss imminent
- Safety risk

**Examples:**
- Fix critical bug causing network outage
- Apply emergency security patch for active exploit
- Restore failed hardware
- Block attack traffic

### Emergency Change Procedure

**Abbreviated Process:**
```markdown
1. Verbal approval from IT Director or delegate
2. Implement change (restore service)
3. Document change in ticket system
4. Post-implementation review within 24 hours
5. Submit RFC retroactively for audit trail
```

**Key Differences from Normal Change:**
- Approval can be verbal (document later)
- Testing may be minimal or skipped
- Documentation completed after implementation
- Faster rollback decision (immediate if issues)

## Change Management Metrics

### Key Performance Indicators (KPIs)

**Change Success Rate:**
```
Success Rate = Successful Changes / Total Changes × 100%

Target: >95% for normal changes
```

**Change-Related Incidents:**
```
Incident Rate = Incidents Caused by Changes / Total Changes × 100%

Target: <5%
```

**Emergency Change Percentage:**
```
Emergency % = Emergency Changes / Total Changes × 100%

Target: <10% (high percentage indicates poor planning)
```

**Unauthorized Change Rate:**
```
Unauthorized % = Changes Not Following Process / Total Changes × 100%

Target: 0% (any unauthorized change is serious issue)
```

**Average Implementation Time:**
```
Avg Time = Total Implementation Time / Number of Changes

Track: By change type (standard vs. normal)
Use: Improve time estimates for future changes
```

## Summary

Effective change management requires:

**1. Formal Process:**
- RFC submission and review
- Risk assessment
- CAB approval
- Detailed implementation plan
- Rollback procedures
- Post-implementation review

**2. Clear Communication:**
- Stakeholder notifications
- Status updates during implementation
- Completion notifications
- Documentation in ticket system

**3. Configuration Control:**
- Automated backups
- Version control (Git)
- Compliance checking
- Change tracking

**4. Continuous Improvement:**
- Learn from every change (PIR)
- Update procedures based on lessons learned
- Track metrics to identify trends
- Refine processes to reduce risk

**5. Emergency Preparedness:**
- Abbreviated process for critical situations
- Pre-authorized emergency changes
- Retroactive documentation
- Quick post-review

Change management is not bureaucracy - it's risk management. Well-executed change management prevents outages, reduces stress, and enables confident infrastructure evolution.

## Review Questions

1. What are the six steps in the ITIL change management process?
2. What is the difference between a standard change and a normal change?
3. What information should be included in a Request for Change (RFC)?
4. What is a rollback plan and when should it be executed?
5. What is the purpose of a Change Advisory Board (CAB)?
6. Why is configuration version control important?
7. What are three key performance indicators (KPIs) for change management?
8. When is it appropriate to use the emergency change process?
9. What is a Post-Implementation Review (PIR) and what should it include?
10. What tools can be used for automated configuration backup and management?
