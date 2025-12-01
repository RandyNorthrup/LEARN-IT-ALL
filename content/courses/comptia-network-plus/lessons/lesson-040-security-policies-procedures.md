---
id: security-policies-procedures
title: Security Policies and Procedures
chapterId: ch4-network-security
order: 40
duration: 75
objectives:
  - Develop security policies and standards
  - Implement acceptable use policies
  - Create incident response procedures
  - Enforce security awareness training
  - Maintain compliance and documentation
---

# Lesson 40: Security Policies and Procedures

## Introduction

Security policies and procedures form the foundation of an organization's security program. While technical controls (firewalls, encryption, IDS) protect systems, policies define the rules, procedures provide the implementation steps, and guidelines offer recommendations. Together, they establish a security framework that governs how the organization protects its information assets.

In this lesson, we'll explore policy development, acceptable use policies, change management, incident response procedures, business continuity planning, and security awareness training.

**Key Principle:** People, process, and technology - security requires all three elements working together.

## Security Policy Framework

### Policy Hierarchy

**Policy:**
```
Definition: High-level statement of management intent
Mandatory: Yes
Audience: Entire organization
Example: "All users must use strong passwords"

Characteristics:
- Broad scope
- Strategic
- Rarely changes
- Approved by executive management
- Enforceable

Example:
"Information Security Policy
All employees must protect company information assets.
Access to systems requires authentication.
Unauthorized access is prohibited."
```

**Standard:**
```
Definition: Specific mandatory requirements
Mandatory: Yes
Audience: Specific groups
Example: "Passwords must be 14+ characters with complexity"

Characteristics:
- Detailed
- Tactical
- Technology-specific
- Updates more frequent
- Enforceable

Example:
"Password Standard
- Minimum 14 characters
- Complexity: uppercase, lowercase, number, symbol
- History: 24 passwords
- Age: 90 days maximum
- Lockout: 5 attempts, 30 minutes"
```

**Procedure:**
```
Definition: Step-by-step instructions
Mandatory: Yes
Audience: Specific roles
Example: "Password reset procedure"

Characteristics:
- Very detailed
- Operational
- Role-specific
- Updates frequent
- Must be followed

Example:
"Password Reset Procedure
1. Verify user identity (employee ID, two personal questions)
2. Log into AD Users and Computers
3. Navigate to user account
4. Click 'Reset Password'
5. Generate temporary password (system generates)
6. Check 'User must change password at next logon'
7. Communicate password securely (phone, in person)
8. Log incident in ticketing system
9. Confirm user can log in"
```

**Guideline:**
```
Definition: Recommended practices
Mandatory: No (best practice)
Audience: Relevant personnel
Example: "Consider using password manager"

Characteristics:
- Flexible
- Advisory
- Best practices
- Not enforced
- Recommendations

Example:
"Password Guidelines
- Consider using a password manager (LastPass, 1Password)
- Use unique passwords for each account
- Avoid writing passwords down
- Consider passphrases (easier to remember)
- Enable MFA where available"
```

### Policy Types

**Acceptable Use Policy (AUP):**
```
Purpose: Define appropriate use of company resources
Scope: All users, systems, and devices

Covers:
- Permitted uses of systems
- Prohibited activities
- Internet usage
- Email usage
- Social media
- Personal use
- Monitoring and privacy
- Consequences of violation

Example Clauses:
"Prohibited Activities:
- Accessing inappropriate content
- Installing unauthorized software
- Sharing credentials
- Circumventing security controls
- Using resources for personal business
- Illegal activities

Permitted Activities:
- Business-related research
- Reasonable personal use (lunch, breaks)
- Professional development

Monitoring:
- Company reserves right to monitor all activity
- No expectation of privacy on company systems
- Monitoring includes email, Internet, files"
```

**Information Classification Policy:**
```
Purpose: Define data sensitivity levels and handling
Scope: All information assets

Classification Levels:
1. Public:
   - No harm if disclosed
   - Marketing materials
   - Public website content

2. Internal Use:
   - Minimal harm if disclosed
   - Internal memos
   - Employee directory

3. Confidential:
   - Serious harm if disclosed
   - Financial data
   - Customer information
   - Strategic plans

4. Restricted:
   - Severe harm if disclosed
   - Trade secrets
   - Legal documents
   - Executive communications

Handling Requirements by Level:
Public: No special handling
Internal: Share on need-to-know basis
Confidential: Encryption required, access logging
Restricted: Encryption, DLP, executive approval for access
```

**Access Control Policy:**
```
Purpose: Define how access is granted and managed
Scope: All systems and data

Principles:
- Least privilege
- Need-to-know
- Separation of duties
- Mandatory access control (high security)
- Role-based access control

Requirements:
- Access request and approval process
- Regular access reviews (quarterly)
- Prompt revocation on termination
- Multi-factor authentication for remote access
- Privileged account management

Example:
"Access Request Process:
1. Employee submits request (ticketing system)
2. Manager approves business need
3. Data owner approves access level
4. IT provisions access
5. Employee acknowledges AUP
6. Access logged and reviewed quarterly"
```

**Remote Access Policy:**
```
Purpose: Secure remote connections
Scope: All remote workers, contractors, vendors

Requirements:
- VPN required for corporate access
- Multi-factor authentication
- Company-approved devices only
- Antivirus and patch requirements
- Full disk encryption
- No public WiFi without VPN
- Screen lock (15 minutes)

Example:
"Remote Access Requirements:
1. Company VPN must be used
2. MFA required (Duo, RSA)
3. Device must be:
   - Domain-joined or MDM-enrolled
   - Antivirus current (within 7 days)
   - OS patches current (within 30 days)
   - Full disk encryption enabled
4. Public WiFi: Use VPN only
5. Screen lock: 15 minutes or less
6. Report lost/stolen devices immediately"
```

**Password Policy:**
```
Purpose: Ensure strong authentication
Scope: All users and systems

Requirements:
- Complexity: 14+ characters, mixed case, numbers, symbols
- History: Remember 24 passwords
- Age: Maximum 90 days, minimum 1 day
- Lockout: 5 attempts, 30-minute lockout
- No sharing, writing down, or reusing passwords
- Multi-factor authentication for privileged accounts

Modern NIST Guidance (2023):
- Minimum 8 characters (12+ recommended)
- No complexity requirements (increases usability)
- No mandatory rotation (change on compromise)
- Check against breached password lists
- Support password managers
- No security questions (vulnerable to social engineering)
```

**Social Media Policy:**
```
Purpose: Guide appropriate social media use
Scope: All employees

Covers:
- Official vs personal accounts
- Representing company online
- Confidentiality on social media
- Acceptable content
- Responding to negativity
- Security considerations

Example:
"Social Media Guidelines:
1. Personal Accounts:
   - Clearly state views are your own
   - Do not disclose confidential information
   - Be respectful and professional
   - Do not speak on behalf of company

2. Security:
   - Beware of phishing on social media
   - Limit personal information shared
   - Use privacy settings
   - Do not accept unknown connections
   - Do not discuss work projects publicly"
```

**BYOD (Bring Your Own Device) Policy:**
```
Purpose: Allow personal devices securely
Scope: Employees using personal devices

Requirements:
- Enrollment in MDM (Mobile Device Management)
- Containerization (separate work/personal)
- Minimum security requirements
- Company right to wipe corporate data
- Acceptable devices (approved OS versions)

Example:
"BYOD Requirements:
1. Device Enrollment:
   - Install MDM client (Company Portal, Workspace ONE)
   - Accept terms and conditions
   - Company may wipe corporate data

2. Security Requirements:
   - Passcode/biometric required
   - Encryption enabled
   - Auto-lock: 5 minutes
   - OS patches current
   - No jailbreak/root

3. Access:
   - Email and calendar
   - Corporate apps (containerized)
   - VPN for file shares
   - No access to highly sensitive data"
```

## Change Management

### Change Control Process

**Purpose:**
```
Goals:
- Minimize disruption from changes
- Ensure changes are planned and tested
- Provide rollback capability
- Maintain documentation
- Coordinate with stakeholders
```

**Change Types:**
```
1. Standard Change:
   - Pre-approved, low risk
   - Well-documented procedure
   - Example: Password reset, add user to group

2. Normal Change:
   - Requires approval
   - Assessed for risk and impact
   - Example: Firmware upgrade, firewall rule change

3. Emergency Change:
   - Urgent, cannot wait for normal process
   - Post-implementation review required
   - Example: Security vulnerability patch, system outage fix
```

**Change Request Process:**
```
1. Submit Request (RFC - Request for Change):
   - Description of change
   - Business justification
   - Systems affected
   - Implementation plan
   - Rollback plan
   - Testing plan
   - Risk assessment

2. Review and Approval:
   - Technical review (architect, engineer)
   - CAB (Change Advisory Board) for major changes
   - Management approval for high-risk

3. Implementation:
   - Scheduled maintenance window
   - Execute change per plan
   - Document actual steps taken

4. Verification:
   - Test functionality
   - Monitor for issues
   - Confirm success criteria met

5. Documentation:
   - Update configuration management database (CMDB)
   - Update diagrams
   - Update runbooks
   - Close change ticket

6. Post-Implementation Review:
   - What went well?
   - What went wrong?
   - Lessons learned
   - Update procedures
```

**Change Advisory Board (CAB):**
```
Purpose: Oversee significant changes
Membership:
- IT Director (chair)
- Network architect
- Security team rep
- Application owner
- Business unit rep

Meets: Weekly (or as needed)

Reviews:
- High-risk changes
- Changes affecting multiple systems
- Changes during peak business hours

Decisions:
- Approve
- Defer (needs more info)
- Reject
```

**Change Example:**
```
RFC #2024-0421: Upgrade Core Switch IOS

Description:
Upgrade core switch IOS from 16.12.5 to 16.12.8

Business Justification:
Security vulnerabilities patched in 16.12.8

Systems Affected:
- CORE-SW-01 (primary)
- CORE-SW-02 (secondary)
- All VLANs
- Approximately 500 users

Implementation Plan:
1. Backup configuration (both switches)
2. Upload new IOS image to flash
3. Verify MD5 hash
4. Schedule reload for Sunday 2:00 AM
5. CORE-SW-02 first (secondary)
6. Monitor for 30 minutes
7. CORE-SW-01 (primary)
8. Monitor until 8:00 AM

Rollback Plan:
1. Console into switch
2. Set boot system to old IOS
3. Reload
4. Verify operation

Testing:
- Verify routing protocols converge
- Test inter-VLAN routing
- Verify trunk links operational
- Test SPAN monitoring

Risk Assessment:
- Probability: Low (tested in lab)
- Impact: High (affects all users)
- Mitigation: Rollback plan, off-hours implementation

Approval: CAB approved 2024-11-15
Scheduled: 2024-11-20 02:00 AM
Implemented: 2024-11-20 02:45 AM
Status: Successful
```

## Incident Response

### Incident Response Process

**Preparation:**
```
Activities:
- Develop IR plan
- Assemble IR team
- Train team members
- Establish communication procedures
- Prepare tools (forensic software, backups)
- Define escalation procedures

IR Team Roles:
- Incident Manager: Coordinates response
- Technical Lead: Technical analysis
- Communications: Internal/external communications
- Legal: Legal considerations
- HR: Employee issues
- Management: Executive decisions
```

**Detection and Analysis:**
```
Detection Sources:
- IDS/IPS alerts
- SIEM correlations
- Antivirus alerts
- User reports
- Log analysis
- Network anomalies

Initial Analysis:
- Verify incident (rule out false positive)
- Classify severity (critical, high, medium, low)
- Scope the incident (systems affected)
- Document initial findings

Example:
Incident: Ransomware infection
Detected: Antivirus alert + user report
Scope: 5 workstations, file share
Severity: High (data encrypted, business impact)
```

**Containment:**
```
Short-Term Containment:
- Isolate affected systems (disconnect network)
- Block malicious IPs at firewall
- Disable compromised accounts
- Preserve evidence (disk images, memory dumps)

Long-Term Containment:
- Apply temporary fixes
- Implement workarounds
- Monitor for spread

Example:
Ransomware Response:
1. Disconnect infected systems from network
2. Block ransomware C2 IPs at firewall
3. Disable user accounts (potential compromised credentials)
4. Image infected systems (forensics)
5. Monitor other systems for indicators
```

**Eradication:**
```
Activities:
- Remove malware
- Close vulnerabilities
- Strengthen security controls
- Apply patches

Example:
Ransomware Eradication:
1. Reimage infected systems
2. Restore from clean backups
3. Patch vulnerability used for initial access
4. Implement email filtering to block similar attacks
5. Update antivirus signatures
```

**Recovery:**
```
Activities:
- Restore systems to operation
- Verify functionality
- Monitor for reinfection
- Return to normal operations

Example:
Ransomware Recovery:
1. Restore files from backup (verify clean)
2. Rebuild infected systems
3. Test business applications
4. Monitor systems 24/7 for 7 days
5. Gradual return to production
```

**Post-Incident Activity:**
```
Lessons Learned Meeting:
- What happened?
- What was done well?
- What could be improved?
- How to prevent recurrence?

Documentation:
- Incident timeline
- Actions taken
- Costs (downtime, response, recovery)
- Recommendations

Follow-Up Actions:
- Implement lessons learned
- Update IR plan
- Update policies/procedures
- Conduct additional training
```

### Incident Classification

**Severity Levels:**
```
Critical:
- Widespread system compromise
- Data breach (sensitive data)
- Complete service outage
- Active data exfiltration
Response: Immediate, 24/7 response team

High:
- Limited system compromise
- Failed intrusion attempt
- Degraded service performance
- Malware infection (contained)
Response: Within 1 hour, business hours

Medium:
- Suspicious activity
- Policy violation
- Minor vulnerability
Response: Within 4 hours, business hours

Low:
- Isolated false positive
- Informational alert
Response: Next business day
```

**Incident Examples:**
```
Critical:
- Ransomware encrypting file servers
- Customer credit card data stolen
- DDoS taking down website
- APT with data exfiltration

High:
- Malware on 10 workstations
- Phishing compromised accounts
- Unauthorized database access attempt

Medium:
- Failed login attempts (brute force)
- Suspicious network traffic
- Unpatched vulnerability discovered

Low:
- User clicked phishing link (caught by security)
- IDS false positive
- Policy violation (USB drive use)
```

## Business Continuity and Disaster Recovery

### Business Continuity Planning

**BCP Components:**
```
1. Business Impact Analysis (BIA):
   - Identify critical business functions
   - Determine maximum acceptable downtime
   - Estimate financial impact
   - Prioritize recovery

2. Risk Assessment:
   - Identify threats (natural disaster, cyber attack)
   - Assess likelihood and impact
   - Implement preventive controls

3. Continuity Strategies:
   - Redundancy (HA, clustering)
   - Geographic diversity
   - Alternative work locations
   - Manual workarounds

4. Plan Development:
   - Recovery procedures
   - Communication plans
   - Vendor contacts
   - Employee responsibilities
```

**Recovery Objectives:**
```
RTO (Recovery Time Objective):
- Maximum acceptable downtime
- How long can we be down?

Example:
- Email: 4 hours RTO
- Website: 1 hour RTO
- ERP system: 8 hours RTO

RPO (Recovery Point Objective):
- Maximum acceptable data loss
- How much data can we lose?

Example:
- Financial data: 15 minutes RPO (near real-time backup)
- Email: 1 hour RPO (hourly backups)
- File shares: 24 hours RPO (daily backups)

Backup Frequency = RPO
Recovery Time = RTO
```

### Disaster Recovery

**DR Plan:**
```
Purpose: Recover IT systems after disaster
Scope: All critical systems

Components:
1. Disaster declaration criteria
2. DR team roles and responsibilities
3. System recovery procedures
4. Vendor contacts
5. Testing schedule

Disaster Scenarios:
- Data center fire
- Flood
- Earthquake
- Cyberattack (ransomware)
- Power outage (extended)
- Pandemic
```

**DR Sites:**
```
Hot Site:
- Fully operational
- Real-time data replication
- Immediate failover
- Cost: Very high
- RTO: Minutes to hours
- Use: Mission-critical (financial trading, emergency services)

Warm Site:
- Infrastructure ready, no data
- Daily data backups restored
- Cost: Medium
- RTO: Hours to days
- Use: Important but not mission-critical

Cold Site:
- Empty data center space
- Power, cooling, network available
- No equipment or data
- Cost: Low
- RTO: Days to weeks
- Use: Long-term recovery

Cloud DR:
- Infrastructure-as-a-Service
- Pay-as-you-go
- Scalable
- Cost: Low (until activated)
- RTO: Hours
- Use: Modern approach, growing popularity
```

**Backup Strategy:**
```
3-2-1 Rule:
- 3 copies of data (production + 2 backups)
- 2 different media types (disk + tape, or disk + cloud)
- 1 offsite copy (protect against site disaster)

Backup Types:
- Full: Complete backup (baseline)
- Incremental: Changes since last backup (any type)
- Differential: Changes since last full backup

Backup Schedule Example:
- Sunday: Full backup
- Monday-Saturday: Incremental
- Offsite: Ship tapes weekly, replicate to cloud daily

Retention:
- Daily backups: 7 days
- Weekly backups: 4 weeks
- Monthly backups: 12 months
- Annual backups: 7 years (compliance)
```

## Security Awareness Training

### Training Program

**New Employee Onboarding:**
```
Topics:
- Security policies overview
- Password requirements
- Phishing awareness
- Physical security
- Acceptable use policy
- Incident reporting

Format: In-person or online module
Duration: 1-2 hours
Requirement: Complete before system access
```

**Annual Refresher Training:**
```
Topics:
- Policy updates
- Recent threats (case studies)
- Phishing simulations
- Social engineering awareness
- Data handling
- Mobile device security

Format: Online module
Duration: 30-60 minutes
Requirement: 100% completion by Q1
```

**Role-Based Training:**
```
Developers:
- Secure coding practices
- Input validation
- Authentication/authorization
- Cryptography
- OWASP Top 10

Administrators:
- Least privilege
- Patch management
- Secure configuration
- Logging and monitoring

Executives:
- Business email compromise
- Targeted attacks (spear phishing)
- Travel security
- Mobile device security
```

**Phishing Simulations:**
```
Purpose: Test and train users
Frequency: Monthly or quarterly

Process:
1. Send simulated phishing emails
2. Track who clicks/enters credentials
3. Immediate training for clickers
4. Report metrics to management
5. Adjust training based on results

Metrics:
- Click rate (goal: <5%)
- Credential entry rate (goal: <1%)
- Reporting rate (goal: >50%)
- Improvement over time

Example Email:
Subject: "Your password will expire today"
From: IT-Support@comp4ny.com (note the "4")
Body: "Click here to reset your password"
Link: http://password-reset-compa ny.com (fake domain)
```

**Security Awareness Posters:**
```
Topics:
- "Don't click suspicious links"
- "Lock your screen (Win+L)"
- "Report security incidents"
- "Use strong passwords"
- "Beware of social engineering"

Locations:
- Elevators
- Break rooms
- Bathrooms
- Conference rooms
- Workstation stickers
```

## Review Questions

1. **What is the difference between a policy and a procedure?**
   - Policy is high-level management intent, procedure is step-by-step implementation instructions

2. **What are the main phases of incident response?**
   - Preparation, Detection/Analysis, Containment, Eradication, Recovery, Post-Incident

3. **What is RTO?**
   - Recovery Time Objective - maximum acceptable downtime

4. **What is RPO?**
   - Recovery Point Objective - maximum acceptable data loss

5. **What is the 3-2-1 backup rule?**
   - 3 copies, 2 different media types, 1 offsite

6. **What is the purpose of CAB?**
   - Change Advisory Board reviews and approves high-risk changes

7. **What are the incident severity levels?**
   - Critical, High, Medium, Low (prioritization and response time)

8. **What is the difference between hot, warm, and cold DR sites?**
   - Hot (immediate, expensive), Warm (hours-days, moderate), Cold (days-weeks, cheap)

9. **What should be included in acceptable use policy?**
   - Permitted/prohibited activities, monitoring, consequences, personal use guidelines

10. **What is the purpose of phishing simulations?**
    - Test user awareness, provide immediate training, measure improvement

## Key Takeaways

- **Policies define rules, procedures provide steps** - both essential for security
- **Change management prevents problems** - plan, test, document, rollback capability
- **Incident response is a process** - preparation is key, documentation critical
- **RTO and RPO drive backup strategy** - business requirements determine technical implementation
- **3-2-1 backup rule** - protection against all disaster scenarios
- **Security awareness training is critical** - users are often the weakest link
- **Regular testing essential** - test backups, DR plans, and incident response
- **Documentation is mandatory** - policies, procedures, incidents, changes
- **Continuous improvement** - learn from incidents, update policies, refine procedures
- **Management support required** - policies must be enforced from top down

## Next Steps

In the next lesson, we'll explore **Vulnerability Assessment**, including vulnerability scanning, penetration testing, and security assessments.

---

**Lesson Complete!** You now understand security policies and procedures that govern how organizations protect information assets.
