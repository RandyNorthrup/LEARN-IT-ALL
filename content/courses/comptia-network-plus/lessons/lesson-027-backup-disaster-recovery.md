---
id: backup-disaster-recovery
title: Backup and Disaster Recovery
chapterId: ch3-network-operations
order: 27
duration: 80
objectives:
  - Understand backup strategies and types
  - Define RPO and RTO objectives
  - Implement disaster recovery plans
  - Configure backup solutions
  - Test and maintain recovery procedures
---

# Lesson 27: Backup and Disaster Recovery

## Introduction

Business continuity depends on the ability to restore network services after failures, disasters, or cyberattacks. Effective backup and disaster recovery (DR) planning ensures minimal data loss, rapid service restoration, and organizational resilience. This lesson covers backup strategies, recovery objectives, redundancy mechanisms, and disaster recovery planning for network infrastructure.

## Why Backup and Disaster Recovery Matter

### Business Impact of Data Loss

**Statistics:**
- 60% of companies that lose data shut down within 6 months
- 93% of companies without disaster recovery that experience major data loss are out of business within 1 year
- Average cost of IT downtime: $5,600 per minute
- Ransomware attacks increasing 300% year-over-year

### Real-World Disaster Examples

**Hurricane Katrina (2005):**
- Thousands of businesses destroyed
- Companies with off-site backups recovered
- Companies without off-site backups: 40% never reopened

**Fire at OVHcloud Data Center (2021):**
- Major European hosting provider
- Entire data center destroyed
- Customers without external backups lost all data
- Class-action lawsuits filed

**Ransomware Attack - Colonial Pipeline (2021):**
- Largest U.S. fuel pipeline shut down
- 6-day service disruption
- $4.4 million ransom paid
- Recovery took weeks despite payment

## Backup Fundamentals

### Backup Types

#### 1. Full Backup
**Definition:** Complete copy of all data

**Characteristics:**
- Backs up everything, regardless of changes
- Self-contained (no dependencies on other backups)
- Longest backup time
- Fastest restore time (single backup set)

**Pros:**
- Simple to manage
- Fast restore
- Single backup set for complete recovery

**Cons:**
- Longest backup window
- Most storage space required
- Most bandwidth consumed

**Use Case:** Weekly full backups combined with daily incremental/differential

**Example:**
```
Sunday: Full backup (100 GB)
  - All files backed up
  - Backup time: 4 hours
  - Storage required: 100 GB
```

#### 2. Incremental Backup
**Definition:** Backs up only data changed since last backup (any type)

**Characteristics:**
- Backs up changes since last backup
- Depends on previous backups
- Fastest backup time
- Slowest restore time (requires full + all incrementals)

**Pros:**
- Fast backup
- Minimal storage space
- Low bandwidth usage

**Cons:**
- Complex restore (need full + all incrementals)
- If any backup in chain corrupted, restore fails
- Slower restore time

**Use Case:** Daily incremental backups after weekend full backup

**Example:**
```
Sunday: Full backup (100 GB)
Monday: Incremental (5 GB changed since Sunday)
Tuesday: Incremental (3 GB changed since Monday)
Wednesday: Incremental (4 GB changed since Tuesday)

To restore Wednesday data:
  Need: Sunday full + Monday incremental + Tuesday incremental + Wednesday incremental
  Total restore time: Longest (4 separate restore operations)
```

#### 3. Differential Backup
**Definition:** Backs up data changed since last full backup

**Characteristics:**
- Backs up changes since last full backup only
- Grows larger each day until next full backup
- Moderate backup time (increases daily)
- Moderate restore time (full + latest differential)

**Pros:**
- Faster restore than incremental (only 2 sets needed)
- More reliable than incremental (fewer dependencies)

**Cons:**
- Slower backup than incremental (backs up cumulative changes)
- More storage than incremental

**Use Case:** Organizations preferring faster restores over faster backups

**Example:**
```
Sunday: Full backup (100 GB)
Monday: Differential (5 GB changed since Sunday)
Tuesday: Differential (8 GB changed since Sunday - includes Monday's changes)
Wednesday: Differential (12 GB changed since Sunday - includes Monday & Tuesday changes)

To restore Wednesday data:
  Need: Sunday full + Wednesday differential
  Total restore time: Faster than incremental (only 2 sets)
```

#### Comparison Table

```
Backup Type    | Backup Time | Storage Space | Restore Time | Complexity
---------------|-------------|---------------|--------------|------------
Full           | Longest     | Most          | Fastest      | Simple
Incremental    | Fastest     | Least         | Slowest      | Complex
Differential   | Moderate    | Moderate      | Moderate     | Moderate
```

### Backup Strategies

#### 3-2-1 Backup Rule
Industry best practice for data protection:

```
3: Three copies of data
  - 1 primary (production)
  - 2 backups

2: Two different media types
  - Disk (fast restore)
  - Tape (long-term, offline)
  - Or: Local disk + cloud

1: One copy off-site
  - Protects against site disasters (fire, flood, theft)
  - Geographically separate location
```

**Example Implementation:**
```
Primary: Production file server (on-site)
Backup 1: Local NAS backup (on-site, disk) - Fast restore
Backup 2: Cloud backup (off-site, cloud storage) - Disaster recovery
```

#### Grandfather-Father-Son (GFS) Rotation
Traditional backup rotation scheme:

```
Daily backups (Son): Monday-Thursday
Weekly backups (Father): Friday
Monthly backups (Grandfather): Last day of month

Retention:
- Daily: 4 weeks (overwrite after 4 weeks)
- Weekly: 4-5 weeks
- Monthly: 12 months

Example for January:
Week 1: Mon Tue Wed Thu Fri(Weekly)
Week 2: Mon Tue Wed Thu Fri(Weekly)
Week 3: Mon Tue Wed Thu Fri(Weekly)
Week 4: Mon Tue Wed Thu Fri(Monthly - kept 12 months)
```

**Storage Calculation:**
```
Daily tapes: 4 (Monday-Thursday, rotating weekly)
Weekly tapes: 4 (one per week, kept 4 weeks)
Monthly tapes: 12 (one per month, kept 1 year)

Total tapes needed: 20 tapes minimum
```

#### Tower of Hanoi Rotation
More complex, optimizes tape wear:

```
Levels A, B, C, D, E
A: Used every other day
B: Used every 4th day
C: Used every 8th day
D: Used every 16th day
E: Used every 32nd day

Day 1: A
Day 2: B
Day 3: A
Day 4: C
Day 5: A
Day 6: B
Day 7: A
Day 8: D
...and so on
```

**Benefits:**
- Distributes wear across tapes
- Provides multiple recovery points
- More complex to manage

### Network Configuration Backups

#### Network Device Backup Strategy

**Critical Configurations to Backup:**
- Router configurations
- Switch configurations
- Firewall rules and policies
- Load balancer configurations
- Wireless controller settings
- DHCP server settings
- DNS zone files

**Backup Frequency:**
```
Device Type              | Backup Frequency | Retention
-------------------------|------------------|------------------
Core routers/switches    | Daily            | 90 days
Distribution switches    | Daily            | 60 days
Access switches          | Weekly           | 30 days
Firewalls                | Daily            | 180 days (compliance)
Wireless controllers     | Daily            | 60 days
```

**Automated Backup Script (Bash + Expect):**
```bash
#!/bin/bash
# Network device backup script

# Configuration
BACKUP_DIR="/backups/network"
TFTP_SERVER="10.1.1.100"
DATE=$(date +%Y%m%d-%H%M%S)
DEVICES="routers.txt"  # One IP per line

mkdir -p $BACKUP_DIR

# Loop through devices
while IFS= read -r IP; do
    HOSTNAME=$(ssh -o StrictHostKeyChecking=no admin@$IP "show run | include hostname" | awk '{print $2}')
    echo "Backing up $HOSTNAME ($IP)..."
    
    # Backup via SCP
    sshpass -p 'password' ssh admin@$IP "copy running-config scp://backup@${TFTP_SERVER}/${BACKUP_DIR}/${HOSTNAME}_${DATE}.cfg" &
    
    # Or backup via TFTP
    # sshpass -p 'password' ssh admin@$IP "copy running-config tftp://${TFTP_SERVER}/${HOSTNAME}_${DATE}.cfg"
    
done < "$DEVICES"

wait  # Wait for all background jobs to complete

echo "Backup completed: $(date)"

# Cleanup old backups (keep 90 days)
find $BACKUP_DIR -name "*.cfg" -mtime +90 -delete
```

**Verify Backup Integrity:**
```bash
#!/bin/bash
# Verify configuration backup can be parsed

CONFIG_FILE="$1"

# Check file size (should not be 0 bytes)
SIZE=$(stat -f%z "$CONFIG_FILE" 2>/dev/null || stat -c%s "$CONFIG_FILE" 2>/dev/null)
if [ "$SIZE" -eq 0 ]; then
    echo "ERROR: $CONFIG_FILE is empty"
    exit 1
fi

# Check for common required strings
if ! grep -q "hostname" "$CONFIG_FILE"; then
    echo "WARNING: No hostname found in $CONFIG_FILE"
fi

if ! grep -q "interface" "$CONFIG_FILE"; then
    echo "WARNING: No interfaces found in $CONFIG_FILE"
fi

if ! grep -q "ip route" "$CONFIG_FILE"; then
    echo "WARNING: No routes found in $CONFIG_FILE"
fi

echo "OK: $CONFIG_FILE passed validation"
```

## Recovery Objectives

### RPO (Recovery Point Objective)

**Definition:** Maximum acceptable amount of data loss measured in time

**Question RPO Answers:** "If we restore from backup, how much data are we willing to lose?"

**Examples:**
```
RPO = 24 hours:
  - Daily backups at midnight
  - If disaster at 11 PM, lose up to 23 hours of data
  - Acceptable for non-critical data

RPO = 1 hour:
  - Backups every hour
  - If disaster occurs, lose up to 59 minutes of data
  - Suitable for important business data

RPO = 15 minutes:
  - Continuous replication or frequent snapshots
  - Lose up to 15 minutes of data
  - Required for critical systems (financial, healthcare)

RPO = 0 (near-zero):
  - Synchronous replication
  - Real-time data mirroring
  - Mission-critical systems (stock trading, emergency services)
```

**Business Impact:**
- Lower RPO = more expensive (more frequent backups/replication)
- Must balance cost vs. risk
- Different RPOs for different data tiers

### RTO (Recovery Time Objective)

**Definition:** Maximum acceptable downtime for service restoration

**Question RTO Answers:** "How quickly must we restore service?"

**Examples:**
```
RTO = 72 hours:
  - Manual restore from tape backups
  - Acceptable for non-critical systems
  - Low cost recovery solution

RTO = 8 hours:
  - Restore from disk backups during business hours
  - Next business day restoration
  - Moderate cost

RTO = 1 hour:
  - Automated restore from disk
  - High-availability systems standby
  - Higher cost (requires fast hardware, automation)

RTO = 15 minutes:
  - Failover to hot standby system
  - Requires load balancers, clustering
  - Expensive (duplicate infrastructure)

RTO = 0 (near-zero):
  - Active-active redundancy
  - No downtime during component failure
  - Very expensive (fully redundant infrastructure)
```

**Technical Requirements by RTO:**
```
RTO            | Technical Solution                 | Relative Cost
---------------|------------------------------------|--------------
24-72 hours    | Tape backup, manual restore        | $
4-8 hours      | Disk backup, automated restore     | $$
1-4 hours      | Warm standby, fast failover        | $$$
<1 hour        | Hot standby, automated failover    | $$$$
Near-zero      | Active-active, load balanced       | $$$$$
```

### MTTR (Mean Time To Repair)

**Definition:** Average time to repair a failed component

**Formula:**
```
MTTR = Total Repair Time / Number of Repairs

Example:
5 repairs over 6 months
Repair times: 2 hours, 4 hours, 3 hours, 1 hour, 5 hours
MTTR = (2 + 4 + 3 + 1 + 5) / 5 = 3 hours average
```

**Factors Affecting MTTR:**
- **Spares availability**: On-site spare parts reduce repair time
- **Documentation quality**: Good documentation speeds diagnosis
- **Staff expertise**: Trained staff repair faster
- **Vendor support**: Fast vendor response reduces downtime
- **Monitoring**: Early detection enables faster response

**Reducing MTTR:**
- Maintain spare parts inventory (hot spares)
- Comprehensive documentation and runbooks
- Regular training and drills
- Proactive monitoring and alerting
- Vendor support contracts (4-hour response SLA)

### MTBF (Mean Time Between Failures)

**Definition:** Average time between failures of a component

**Formula:**
```
MTBF = Total Operational Time / Number of Failures

Example:
Router operational: 8,760 hours/year (1 year)
Failures in year: 2
MTBF = 8,760 / 2 = 4,380 hours (approximately 6 months)
```

**Use in Planning:**
- Higher MTBF = more reliable equipment
- Used to calculate spare parts inventory
- Helps justify redundancy investments

**Industry Examples:**
```
Component              | Typical MTBF
-----------------------|------------------
Enterprise SSD         | 2,000,000 hours
Enterprise HDD         | 1,200,000 hours
Power supply (server)  | 100,000 hours
Network switch (Cisco) | 200,000 hours
UPS (APC)              | 500,000 hours
```

## Redundancy and High Availability

### High Availability Concepts

**Availability Calculation:**
```
Availability = (Total Time - Downtime) / Total Time × 100%

Availability Levels (per year):
99%       (two nines)   = 87.6 hours downtime   = 3.65 days
99.9%     (three nines) = 8.76 hours downtime   = 0.365 days
99.99%    (four nines)  = 52.6 minutes downtime
99.999%   (five nines)  = 5.26 minutes downtime
99.9999%  (six nines)   = 31.5 seconds downtime
```

**High Availability Requirements:**
- Eliminate single points of failure
- Automatic failover mechanisms
- Redundant components
- Regular testing of failover
- Monitoring and alerting

### Redundancy Levels

#### Active-Passive (Hot Standby)
**Description:** Primary system handles traffic, secondary standby

**Characteristics:**
- Secondary system powered on, ready
- Automatic or manual failover
- Failover time: Seconds to minutes
- Cost: Moderate (duplicate hardware underutilized)

**Example:**
```
Primary: Core-Router-01 (active, handling traffic)
Secondary: Core-Router-02 (standby, ready for failover)

Failover triggered by:
- Primary failure detection (dead peer detection)
- Manual intervention (maintenance)

Protocols used:
- HSRP (Hot Standby Router Protocol)
- VRRP (Virtual Router Redundancy Protocol)
- GLBP (Gateway Load Balancing Protocol)
```

#### Active-Active (Load Balanced)
**Description:** Both systems handle traffic simultaneously

**Characteristics:**
- Both systems active, sharing load
- No failover time (already active)
- Better resource utilization
- Cost: Moderate to high

**Example:**
```
System 1: Handling 50% of traffic
System 2: Handling 50% of traffic

If System 1 fails:
  System 2 automatically takes 100% load

Load balancing methods:
- Round-robin DNS
- Load balancer (F5, HAProxy, NGINX)
- BGP multipath
- GLBP (Cisco)
```

#### N+1 Redundancy
**Description:** N components required, 1 additional for redundancy

**Example:**
```
3 servers required to handle load (N=3)
Deploy 4 servers (N+1=4)

If 1 server fails:
  Remaining 3 servers handle load (100% capacity)
```

#### N+N Redundancy
**Description:** Fully duplicate infrastructure

**Example:**
```
3 servers in Datacenter A
3 servers in Datacenter B (duplicate)

Each datacenter can handle 100% load independently

Benefits:
- Site-level redundancy
- Maintenance without downtime
- Disaster recovery built-in

Cost: Highest (double infrastructure)
```

### Clustering and Failover

#### Server Clustering
**Windows Failover Clustering:**
- Shared storage (SAN)
- Heartbeat network for health checks
- Automatic failover of services

**Linux Clustering (Pacemaker + Corosync):**
- Resource management
- Fencing (STONITH - Shoot The Other Node In The Head)
- Supports active-passive and active-active

#### Database Replication
**MySQL Replication:**
```sql
-- Master server
GRANT REPLICATION SLAVE ON *.* TO 'replica'@'replica_host' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
SHOW MASTER STATUS;

-- Slave server
CHANGE MASTER TO
  MASTER_HOST='master_host',
  MASTER_USER='replica',
  MASTER_PASSWORD='password',
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=107;
START SLAVE;
```

**PostgreSQL Streaming Replication:**
```bash
# Primary server (postgresql.conf)
wal_level = replica
max_wal_senders = 3
wal_keep_size = 64

# Standby server (recovery.conf)
standby_mode = 'on'
primary_conninfo = 'host=primary_host port=5432 user=replicator password=secret'
trigger_file = '/tmp/postgresql.trigger'
```

## Disaster Recovery Planning

### Disaster Recovery Sites

#### Cold Site
**Description:** Empty facility with power, cooling, network

**Characteristics:**
- No equipment pre-installed
- Equipment shipped after disaster declared
- Recovery time: Days to weeks
- Cost: Lowest

**Use Case:** Non-critical systems, small organizations

#### Warm Site
**Description:** Facility with some equipment, needs configuration

**Characteristics:**
- Basic infrastructure present (servers, network)
- Data needs restoration from backups
- Recovery time: Hours to days
- Cost: Moderate

**Use Case:** Most common DR solution, balances cost and recovery time

#### Hot Site
**Description:** Fully operational duplicate facility

**Characteristics:**
- All equipment installed and configured
- Data replicated in real-time
- Recovery time: Minutes to hours
- Cost: Highest

**Use Case:** Mission-critical systems, large enterprises

#### Cloud-Based DR
**Description:** DR infrastructure in cloud (AWS, Azure, GCP)

**Characteristics:**
- Pay-as-you-go (no idle hardware costs)
- Scalable (spin up resources as needed)
- Geographically distributed
- Recovery time: Configurable

**Use Case:** Modern DR solution, cost-effective for many organizations

### DR Plan Components

**DR Plan Template:**
```markdown
# Disaster Recovery Plan

## 1. Plan Overview
- Version: 2.1
- Last updated: January 2025
- Next review: July 2025
- Owner: IT Director

## 2. Disaster Declaration Criteria
A disaster is declared when:
- [ ] Complete site loss (fire, flood, earthquake)
- [ ] Extended power outage (>4 hours, generators failed)
- [ ] Critical system failure (core network down >2 hours)
- [ ] Cyberattack (ransomware, data breach)

## 3. Emergency Contacts
| Role | Name | Primary Phone | Secondary Phone | Email |
|------|------|---------------|-----------------|-------|
| IT Director | John Smith | 555-1234 | 555-5678 | john.smith@company.com |
| Network Manager | Jane Doe | 555-2345 | 555-6789 | jane.doe@company.com |
| CIO | Bob Johnson | 555-3456 | 555-7890 | bob.johnson@company.com |

## 4. Recovery Priorities
| Priority | System | RPO | RTO | Dependencies |
|----------|--------|-----|-----|--------------|
| P1 | Email | 1 hour | 2 hours | Internet, DNS, AD |
| P1 | Internet connectivity | 0 | 1 hour | ISP circuits |
| P2 | File servers | 4 hours | 4 hours | Network, storage |
| P2 | ERP system | 1 hour | 4 hours | Database, app servers |
| P3 | Internal websites | 24 hours | 8 hours | Web servers |

## 5. Recovery Procedures

### Scenario 1: Primary Data Center Fire

**Step 1: Assess Damage (T+0 to T+1 hour)**
1. Confirm facility inaccessible
2. Declare disaster
3. Activate DR team
4. Notify stakeholders

**Step 2: Activate DR Site (T+1 to T+2 hours)**
1. Contact DR facility (Warm Site at 123 Recovery Lane)
2. Deploy DR team to warm site
3. Power on pre-staged equipment
4. Verify network connectivity to warm site

**Step 3: Restore Network (T+2 to T+4 hours)**
1. Activate backup ISP circuit at warm site
2. Restore core routers from backup configs
3. Establish VPN to cloud resources
4. Update DNS to point to warm site IPs
5. Test connectivity from key locations

**Step 4: Restore Priority 1 Systems (T+4 to T+8 hours)**
1. Restore Active Directory domain controllers
2. Restore email servers from replicated data
3. Restore internet proxy/filtering
4. Verify user authentication working

**Step 5: Restore Priority 2 Systems (T+8 to T+16 hours)**
1. Restore file servers from backups
2. Restore database servers
3. Restore ERP application servers
4. Test critical business processes

**Step 6: Communications (Ongoing)**
- Hourly updates to executive team
- Status page for employees
- Customer notification if external services affected

## 6. Data Recovery
- Network configs: Restore from daily backups (Oxidized Git repo)
- File servers: Restore from cloud backup (Veeam)
- Databases: Restore from replicated DR database
- User data: Restore from cloud sync (OneDrive/Google Drive)

## 7. Testing Schedule
- Tabletop exercise: Quarterly
- Partial failover test: Semi-annually
- Full DR test: Annually

## 8. Plan Maintenance
- Review after every test
- Update after major infrastructure changes
- Annual comprehensive review
```

### DR Testing

#### Tabletop Exercise
**Description:** Discussion-based walkthrough of DR procedures

**Frequency:** Quarterly
**Duration:** 2-4 hours
**Participants:** DR team, management

**Process:**
1. Present disaster scenario
2. Team discusses response steps
3. Identify gaps in procedures
4. Update DR plan based on findings

#### Partial Failover Test
**Description:** Test specific components without full cutover

**Frequency:** Semi-annually
**Examples:**
- Restore single server from backup
- Failover single application to DR site
- Test network failover to backup circuit

#### Full DR Test
**Description:** Complete failover to DR site

**Frequency:** Annually
**Process:**
1. Schedule maintenance window
2. Declare simulated disaster
3. Failover all systems to DR site
4. Operate from DR site for defined period (4-8 hours)
5. Failback to primary site
6. Document issues and lessons learned

**Success Criteria:**
- All P1 systems restored within RTO
- Data loss within RPO
- Business operations continue
- No surprises or undocumented dependencies

## Summary

Effective backup and disaster recovery requires:

**1. Comprehensive Backup Strategy:**
- Multiple backup types (full, incremental, differential)
- 3-2-1 rule (3 copies, 2 media, 1 off-site)
- Automated configuration backups
- Regular backup testing

**2. Clear Recovery Objectives:**
- RPO (acceptable data loss)
- RTO (acceptable downtime)
- Different tiers for different systems
- Balance cost vs. criticality

**3. Redundancy and High Availability:**
- Eliminate single points of failure
- Active-passive or active-active configurations
- Clustering and replication
- Regular failover testing

**4. Disaster Recovery Planning:**
- Documented DR procedures
- Cold/warm/hot site options
- Regular DR testing (tabletop, partial, full)
- Continuous plan maintenance

**5. Testing and Validation:**
- Test backups regularly (monthly)
- Verify restore procedures work
- Practice failover scenarios
- Update documentation after every test

Don't wait for disaster to discover your backups don't work or your DR plan is outdated. Regular testing and maintenance are essential to ensure business continuity when disaster strikes.

## Review Questions

1. What are the three types of backups and how do they differ?
2. Explain the 3-2-1 backup rule and why it's important.
3. What is the difference between RPO and RTO?
4. How many nines of availability equals 5.26 minutes of downtime per year?
5. What is the difference between active-passive and active-active redundancy?
6. What are the three types of disaster recovery sites (cold, warm, hot)?
7. What is N+1 redundancy and when would you use it?
8. How often should disaster recovery plans be tested?
9. What is MTTR and why does it matter?
10. What should be included in network device configuration backups?
