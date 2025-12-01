---
id: high-availability
title: High Availability and Fault Tolerance
chapterId: ch3-network-operations
order: 28
duration: 70
objectives:
  - Understand high availability concepts
  - Implement fault tolerance mechanisms
  - Configure redundancy strategies
  - Design for minimal downtime
  - Test failover procedures
---

# Lesson 28: High Availability and Fault Tolerance

## Introduction

High availability (HA) and fault tolerance are architectural approaches to minimize downtime and ensure continuous service delivery. While related, they represent different levels of resilience: high availability aims to maximize uptime through redundancy and rapid failover, while fault tolerance ensures uninterrupted operation even during component failures. This lesson covers HA design principles, fault tolerance mechanisms, redundancy strategies, and implementation techniques.

## High Availability vs. Fault Tolerance

### High Availability (HA)

**Definition:** System design that aims to ensure agreed level of operational performance (uptime) for higher-than-normal period

**Characteristics:**
- Brief service interruption acceptable during failover
- Failover time: Seconds to minutes
- Lower cost than full fault tolerance
- Most common approach for business systems

**Example:**
```
Primary server fails → Secondary server activates (30 seconds downtime)
Users experience brief disconnection, then service resumes
Acceptability: Most business applications can tolerate brief interruption
```

### Fault Tolerance (FT)

**Definition:** System continues operating properly even when component fails, with no interruption to service

**Characteristics:**
- Zero service interruption (no failover time)
- Requires synchronous redundancy
- Higher cost (duplicate everything)
- Required for mission-critical systems

**Example:**
```
Primary component fails → Redundant component already processing same data
Users experience zero interruption
Requirement: Financial trading, emergency services, air traffic control
```

### Comparison Table

```
Aspect                | High Availability      | Fault Tolerance
----------------------|------------------------|------------------------
Downtime              | Seconds to minutes     | Zero (none)
Failover              | Automatic or manual    | Instantaneous
Cost                  | Moderate to high       | Very high
Complexity            | Moderate               | High
Typical Availability  | 99.9% to 99.99%        | 99.999% to 99.9999%
Use Case              | Most business apps     | Mission-critical only
```

## Availability Calculations

### Calculating Uptime

**Formula:**
```
Availability % = (Total Time - Downtime) / Total Time × 100%

Example:
Total time: 8,760 hours (1 year = 365 days × 24 hours)
Downtime: 8.76 hours
Availability = (8,760 - 8.76) / 8,760 × 100% = 99.9%
```

### The Nines

**Standard Availability Levels:**
```
Availability | Downtime/Year | Downtime/Month | Downtime/Week | Common Name
-------------|---------------|----------------|---------------|-------------
90%          | 36.5 days     | 3 days         | 16.8 hours    | "One nine" (inadequate)
99%          | 3.65 days     | 7.2 hours      | 1.68 hours    | "Two nines"
99.9%        | 8.76 hours    | 43.2 minutes   | 10.1 minutes  | "Three nines"
99.99%       | 52.6 minutes  | 4.32 minutes   | 1.01 minutes  | "Four nines"
99.999%      | 5.26 minutes  | 25.9 seconds   | 6.05 seconds  | "Five nines"
99.9999%     | 31.5 seconds  | 2.59 seconds   | 0.605 seconds | "Six nines"
```

**Business Impact:**
```
For $1M/year revenue company ($114/hour):
- 99% uptime = 3.65 days down = $9,993 lost revenue
- 99.9% uptime = 8.76 hours down = $999 lost revenue
- 99.99% uptime = 52.6 minutes down = $100 lost revenue
```

### Serial Components (Weakest Link)

**Rule:** Overall availability is product of individual component availabilities

**Formula:**
```
System Availability = Component₁ × Component₂ × Component₃ × ... × Componentₙ

Example:
Web server (99.9%) → App server (99.9%) → Database (99.9%)
System availability = 0.999 × 0.999 × 0.999 = 0.997 = 99.7%

Result: Chain of 3 components at 99.9% each = overall 99.7% (lower!)
```

**Lesson:** Each component in series reduces overall availability

### Parallel Components (Redundancy)

**Rule:** Redundant components increase overall availability

**Formula:**
```
System Availability = 1 - (1 - Component₁) × (1 - Component₂)

Example:
Two redundant servers, each 99.9% available
System availability = 1 - (1 - 0.999) × (1 - 0.999)
                    = 1 - (0.001 × 0.001)
                    = 1 - 0.000001
                    = 0.999999 = 99.9999% (six nines!)

Result: Two 99.9% components in parallel = 99.9999% overall
```

**Lesson:** Redundancy dramatically improves availability

### Combined Example

**Scenario:** Web application with redundancy

```
Component Layer          | Availability | Configuration
-------------------------|--------------|------------------
Load Balancer            | 99.99%       | 2 in HA pair
Web Servers              | 99.9% each   | 3 in cluster
Application Servers      | 99.9% each   | 2 in cluster
Database                 | 99.99%       | Primary + replica

Calculations:
Load Balancer (2 redundant):
  1 - (1 - 0.9999)² = 0.99999999 = 99.9999% (eight nines!)

Web Server Cluster (3 redundant):
  1 - (1 - 0.999)³ = 0.999999 = 99.9999%

App Server Cluster (2 redundant):
  1 - (1 - 0.999)² = 0.999999 = 99.9999%

Database (primary + replica):
  1 - (1 - 0.9999)² = 0.99999999 = 99.9999%

Overall System (serial):
  0.99999999 × 0.999999 × 0.999999 × 0.99999999 = 99.9996% (four nines)

Result: Well-designed redundant architecture achieves 99.9996% availability
        = 21 minutes downtime per year
```

## Eliminating Single Points of Failure (SPOF)

### Identifying SPOFs

**Definition:** Any component whose failure causes entire system failure

**Common Network SPOFs:**
- Single uplink to internet
- Single core switch
- Single power supply
- Single DHCP server
- Single DNS server
- Single firewall
- Single fiber path between buildings

### SPOF Analysis Method

**Process:**
1. Create network diagram
2. Identify each component
3. Ask: "If this fails, what breaks?"
4. If answer is "entire system/network," it's a SPOF
5. Design redundancy for each SPOF

**Example Analysis:**
```
Component: Core Router
Question: If core router fails, what breaks?
Answer: Entire network loses internet connectivity
Conclusion: SPOF - needs redundancy
Solution: Deploy second core router in HA pair

Component: Access Switch in Wiring Closet
Question: If access switch fails, what breaks?
Answer: Users in that wiring closet lose connectivity
Conclusion: Limited SPOF - evaluate criticality and cost
Solution: If critical users, deploy stacked switches; if not, accept risk with fast replacement
```

## Redundancy Strategies

### Network Redundancy

#### Dual ISP Connections (Redundant Internet)

**Configuration Options:**

**Option 1: Active-Passive (Backup ISP)**
```
Primary ISP: 1 Gbps fiber (handles all traffic)
Backup ISP: 100 Mbps cable (idle, activates on primary failure)

Failover: Automatic via routing protocols or manual
Cost: Moderate (paying for backup circuit)
Downtime: 1-3 minutes (routing convergence)
```

**Option 2: Active-Active (Load Balanced)**
```
ISP 1: 500 Mbps (handles 50% traffic)
ISP 2: 500 Mbps (handles 50% traffic)

Failover: Automatic (already active)
Cost: Higher (two full circuits)
Downtime: Seconds (only affected sessions need to re-establish)
```

**BGP Multihoming Configuration:**
```cisco
! Router 1 (ISP A connection)
router bgp 65001
  neighbor 203.0.113.1 remote-as 65100  ! ISP A
  neighbor 203.0.113.1 description ISP-A
  network 198.51.100.0 mask 255.255.255.0
  neighbor 203.0.113.1 route-map PREPEND-OUT out

route-map PREPEND-OUT permit 10
  set as-path prepend 65001 65001  ! Make path less preferred (backup)

! Router 2 (ISP B connection)
router bgp 65001
  neighbor 198.51.100.1 remote-as 65200  ! ISP B
  neighbor 198.51.100.1 description ISP-B
  network 198.51.100.0 mask 255.255.255.0
  ! No prepending - preferred path
```

#### Redundant Core Switches (Switch Stacking)

**Option 1: Traditional Stacking**
```
Physical: Two switches with stack cables
Logical: Appear as single switch
Failover: Sub-second (automatically handled by stack)
Management: Single IP address

Cisco StackWise Configuration:
switch 1 priority 15  ! Master
switch 2 priority 14  ! Backup master
```

**Option 2: Virtual Switching (VSS/VPC)**
```
Cisco Virtual Switching System (VSS):
- Two physical switches
- Act as single logical switch
- Dual-active detection to prevent split-brain

Cisco Virtual PortChannel (vPC):
- Nexus switches
- Allows dual-homed servers without STP blocking
- Active-active link utilization
```

**Configuration Example (Cisco vPC):**
```cisco
! vPC Peer Switch 1
feature vpc
vpc domain 1
  peer-keepalive destination 10.1.1.2 source 10.1.1.1

interface port-channel 10
  vpc peer-link
  
interface Ethernet1/1
  channel-group 10 mode active

! vPC Peer Switch 2
feature vpc
vpc domain 1
  peer-keepalive destination 10.1.1.1 source 10.1.1.2

interface port-channel 10
  vpc peer-link
  
interface Ethernet1/1
  channel-group 10 mode active

! Downstream server connection (dual-homed)
interface port-channel 100
  vpc 100
```

#### Redundant Links (Link Aggregation)

**EtherChannel/Link Aggregation:**
- Combines multiple physical links into single logical link
- Increases bandwidth
- Provides redundancy (if one link fails, others continue)
- Load balancing across links

**Configuration:**
```cisco
! Switch A
interface range GigabitEthernet1/1-2
  channel-group 1 mode active  ! LACP (dynamic)
  
interface Port-channel1
  switchport mode trunk
  switchport trunk allowed vlan 10,20,30

! Switch B
interface range GigabitEthernet1/1-2
  channel-group 1 mode active
  
interface Port-channel1
  switchport mode trunk
  switchport trunk allowed vlan 10,20,30
```

### Server Redundancy

#### Clustering

**Windows Server Failover Clustering:**
```powershell
# Install Failover Clustering feature
Install-WindowsFeature -Name Failover-Clustering -IncludeManagementTools

# Test cluster configuration
Test-Cluster -Node Server1, Server2

# Create cluster
New-Cluster -Name ProdCluster -Node Server1, Server2 -StaticAddress 192.168.1.100

# Add clustered role (e.g., File Server)
Add-ClusterFileServerRole -Name FileServer01 -StaticAddress 192.168.1.101 -Storage "Cluster Disk 1"
```

**Linux Clustering (Pacemaker):**
```bash
# Install Pacemaker and Corosync
yum install -y pacemaker corosync pcs

# Configure cluster
pcs cluster auth node1 node2 -u hacluster -p password
pcs cluster setup --name mycluster node1 node2
pcs cluster start --all
pcs cluster enable --all

# Create virtual IP resource
pcs resource create ClusterIP ocf:heartbeat:IPaddr2 ip=192.168.1.100 cidr_netmask=24 op monitor interval=30s

# Create Apache resource
pcs resource create WebServer ocf:heartbeat:apache configfile=/etc/httpd/conf/httpd.conf op monitor interval=1min

# Ensure IP and Apache run on same node
pcs constraint colocation add WebServer ClusterIP INFINITY
pcs constraint order ClusterIP then WebServer
```

#### Database Replication

**MySQL Master-Master Replication:**
```sql
-- Server 1 (my.cnf)
[mysqld]
server-id = 1
log_bin = mysql-bin
binlog_do_db = production
auto_increment_increment = 2
auto_increment_offset = 1

-- Server 2 (my.cnf)
[mysqld]
server-id = 2
log_bin = mysql-bin
binlog_do_db = production
auto_increment_increment = 2
auto_increment_offset = 2

-- Setup replication (both servers)
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;

-- On Server 1, setup Server 2 as master
CHANGE MASTER TO MASTER_HOST='server2_ip', MASTER_USER='repl', MASTER_PASSWORD='password', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=107;
START SLAVE;

-- On Server 2, setup Server 1 as master
CHANGE MASTER TO MASTER_HOST='server1_ip', MASTER_USER='repl', MASTER_PASSWORD='password', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=107;
START SLAVE;
```

**PostgreSQL Synchronous Replication:**
```bash
# Primary server (postgresql.conf)
wal_level = replica
max_wal_senders = 5
wal_keep_size = 128
synchronous_standby_names = 'standby1'  # Wait for this standby

# Primary server (pg_hba.conf)
host replication replicator standby_ip/32 md5

# Standby server (recovery.conf / postgresql.auto.conf)
standby_mode = 'on'
primary_conninfo = 'host=primary_ip port=5432 user=replicator password=secret application_name=standby1'
restore_command = 'cp /var/lib/postgresql/archive/%f %p'
```

### Storage Redundancy

#### RAID Levels

**RAID 0 (Striping):**
- Data striped across multiple disks
- No redundancy (failure of any disk = data loss)
- Performance: Excellent read/write
- Use case: Temporary data, performance-critical non-critical data
- Capacity: 100% (all drives)

**RAID 1 (Mirroring):**
- Data mirrored across 2 disks
- Redundancy: Survives 1 disk failure
- Performance: Good read, normal write
- Use case: Operating systems, critical data
- Capacity: 50% (half of total)

**RAID 5 (Striping with Parity):**
- Data striped, parity distributed across disks
- Redundancy: Survives 1 disk failure
- Performance: Good read, moderate write (parity overhead)
- Use case: General purpose file servers
- Capacity: (N-1)/N (e.g., 4 disks = 75%)
- Minimum: 3 disks

**RAID 6 (Striping with Double Parity):**
- Data striped, two parity blocks
- Redundancy: Survives 2 disk failures
- Performance: Good read, slower write (double parity)
- Use case: Large arrays where rebuild time is long
- Capacity: (N-2)/N (e.g., 6 disks = 67%)
- Minimum: 4 disks

**RAID 10 (1+0, Mirrored Stripe):**
- Combination of RAID 1 and RAID 0
- Data mirrored, then striped
- Redundancy: Survives multiple disk failures (one per mirror pair)
- Performance: Excellent read/write
- Use case: Database servers, high-performance applications
- Capacity: 50%
- Minimum: 4 disks

**RAID Comparison:**
```
RAID Level | Redundancy | Performance | Capacity | Use Case
-----------|------------|-------------|----------|------------------
0          | None       | Excellent   | 100%     | Temp data only
1          | 1 disk     | Good        | 50%      | OS, boot drives
5          | 1 disk     | Moderate    | 67-90%   | File servers
6          | 2 disks    | Moderate    | 50-88%   | Large arrays
10         | 1 per pair | Excellent   | 50%      | Databases, VMs
```

#### SAN Redundancy

**Dual-Fabric SAN:**
```
Fabric A:
  Server HBA Port 1 → Switch A1 → Switch A2 → Storage Controller A

Fabric B:
  Server HBA Port 2 → Switch B1 → Switch B2 → Storage Controller B

Benefits:
- No single point of failure
- Maintenance without downtime
- Automatic multipathing failover
```

**Multipath I/O (MPIO):**
```powershell
# Windows: Install MPIO
Install-WindowsFeature -Name Multipath-IO
Restart-Computer

# Configure MPIO
New-MSDSMSupportedHW -VendorId "VENDOR" -ProductId "PRODUCT"
Set-MSDSMGlobalDefaultLoadBalancePolicy -Policy RR  # Round Robin

# Linux: Configure multipath.conf
cat <<EOF > /etc/multipath.conf
defaults {
    user_friendly_names yes
    path_grouping_policy multibus
    failback immediate
    no_path_retry 5
}
EOF

systemctl restart multipathd
multipath -ll  # List multipath devices
```

### Power Redundancy

#### Dual Power Supplies
```
Server with redundant PSUs:
  PSU 1 → PDU A → UPS A → Utility Power A
  PSU 2 → PDU B → UPS B → Utility Power B

Benefits:
- PSU failure: Server continues on remaining PSU
- PDU maintenance: Switch PDUs without downtime
- UPS failure: Server continues on other circuit
```

#### UPS (Uninterruptible Power Supply)

**Types:**
```
Standby UPS (Offline):
- Battery backup on power loss
- Switch time: 5-10ms
- Cost: Low
- Use: Workstations, small equipment

Line-Interactive UPS:
- Voltage regulation without battery
- Switch time: 2-5ms
- Cost: Moderate
- Use: Servers, network equipment

Online UPS (Double-Conversion):
- Always running on battery (utility charges battery)
- Switch time: 0ms (no switch needed)
- Cost: High
- Use: Critical infrastructure
```

**Sizing UPS:**
```
Calculation:
1. Total load in Watts (add all devices)
2. Convert to VA: VA = Watts / Power Factor (typically 0.8)
3. Add 20-30% headroom for future growth
4. Determine required runtime

Example:
Devices: 1,200W total load
VA = 1,200W / 0.8 = 1,500 VA
With headroom: 1,500 × 1.25 = 1,875 VA
Select: 2,000 VA UPS

Runtime:
- 2,000 VA UPS with 1,500W load ≈ 10-15 minutes
- For longer runtime, add external battery packs or use generator
```

## Testing High Availability

### Planned Failover Testing

**Quarterly HA Test Procedure:**
```markdown
# High Availability Failover Test

**Date:** Q1 2025
**Systems:** Core Routers (HA Pair)

**Pre-Test:**
1. [ ] Notify stakeholders 1 week in advance
2. [ ] Schedule during low-usage window
3. [ ] Verify monitoring systems operational
4. [ ] Backup configurations

**Test Procedure:**
1. Verify current state
   - Primary: Core-R1 (Active)
   - Secondary: Core-R2 (Standby)
   - HSRP: Core-R1 is active router

2. Initiate failover (simulate primary failure)
   ```
   Core-R1# conf t
   Core-R1(config)# interface gi0/1
   Core-R1(config-if)# shutdown
   ```

3. Monitor failover
   - Start timer
   - Watch HSRP state change
   - Verify Core-R2 becomes active
   - Stop timer when traffic resumes

4. Test connectivity
   - Ping from multiple VLANs
   - Test internet connectivity
   - Verify all services operational

5. Restore primary
   ```
   Core-R1(config-if)# no shutdown
   ```

6. Verify failback (if configured)
   - Core-R1 should resume active role
   - Monitor for stability

**Results:**
- Failover time: _____ seconds
- Services affected: _____
- Issues encountered: _____
- Follow-up actions: _____
```

### Chaos Engineering

**Principle:** Intentionally cause failures to test resilience

**Netflix Chaos Monkey:**
- Randomly terminates instances in production
- Forces teams to build resilient systems
- Discovers weaknesses before real failures

**Network Chaos Engineering Examples:**
```
Test                          | Expected Result
------------------------------|----------------------------------
Disconnect primary ISP        | Failover to backup ISP <3 min
Power off core switch         | Stack member takes over <30 sec
Saturate network link         | QoS prioritizes critical traffic
Introduce packet loss         | Application retries successfully
Fail database primary         | Replica promoted automatically
```

## Summary

High availability and fault tolerance are achieved through:

**1. Understanding Availability Requirements:**
- Calculate availability needs (two to six nines)
- Determine acceptable downtime (RTO)
- Balance cost vs. criticality

**2. Eliminating Single Points of Failure:**
- Identify every SPOF in architecture
- Design redundancy for critical components
- Accept risk for non-critical components

**3. Implementing Redundancy:**
- Network: Dual ISPs, redundant switches, link aggregation
- Servers: Clustering, load balancing
- Storage: RAID, SAN multipathing
- Power: Dual PSUs, UPS, generators

**4. Calculating Availability:**
- Serial components: Multiply availabilities (weakest link)
- Parallel components: Dramatically improve availability
- Design for target availability level

**5. Testing and Validation:**
- Regular planned failover tests
- Chaos engineering to discover weaknesses
- Document results and improve

High availability is not just technology - it's a mindset of designing for failure, testing regularly, and continuously improving resilience.

## Review Questions

1. What is the difference between high availability and fault tolerance?
2. How much downtime per year is allowed for "five nines" (99.999%) availability?
3. What happens to overall availability when components are arranged in series vs. parallel?
4. What is a single point of failure (SPOF) and how do you identify them?
5. What are the benefits and drawbacks of RAID 5 vs. RAID 10?
6. How does switch stacking improve availability?
7. What is the purpose of UPS systems in high availability design?
8. Why should high availability systems be tested regularly?
9. What is MPIO and why is it important for SAN redundancy?
10. Calculate: If you have two redundant servers, each with 99.9% availability, what is the overall system availability?
