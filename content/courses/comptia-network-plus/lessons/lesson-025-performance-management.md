---
id: performance-management
title: Performance Management and Optimization
chapterId: ch3-network-operations
order: 25
duration: 80
objectives:
  - Establish network performance baselines
  - Implement capacity planning strategies
  - Configure bandwidth management and traffic shaping
  - Optimize network performance
  - Use performance monitoring tools
---

# Lesson 25: Performance Management and Optimization

## Introduction

Network performance management involves continuously measuring, monitoring, analyzing, and optimizing network performance to ensure optimal user experience and efficient resource utilization. This lesson covers performance baselines, capacity planning, bandwidth management, traffic shaping, and optimization techniques for modern networks.

## Performance Baselines

### What is a Baseline?

A performance baseline is a snapshot of normal network behavior that serves as a reference point for comparison. Baselines help detect anomalies, plan capacity, and measure the impact of changes.

**Key Baseline Metrics:**
- Bandwidth utilization (average and peak)
- Latency (round-trip time)
- Jitter (latency variation)
- Packet loss percentage
- Error rates
- CPU and memory utilization on network devices
- Application response times

### Creating Effective Baselines

#### 1. Collection Period
**Minimum:** 2 weeks of continuous monitoring
**Recommended:** 4-6 weeks to capture variations
**Ideal:** Full year to understand seasonal patterns

**Why longer is better:**
- Captures weekly patterns (Monday vs. Friday)
- Identifies monthly cycles (end-of-month processing)
- Reveals seasonal trends (retail holiday season, academic semester)
- Accounts for special events (company all-hands meetings)

#### 2. Metrics to Baseline

**Interface-Level Metrics:**
```
Metric                 | Measurement Method           | Typical Polling Interval
-----------------------|------------------------------|-------------------------
Bandwidth utilization  | SNMP ifInOctets/ifOutOctets  | 5 minutes
Errors                 | SNMP ifInErrors/ifOutErrors  | 5 minutes
Discards               | SNMP ifInDiscards            | 5 minutes
Unicast packets        | SNMP ifInUcastPkts           | 5 minutes
Broadcast packets      | SNMP ifInBroadcastPkts       | 5 minutes
Interface status       | SNMP ifOperStatus            | 1 minute
```

**Device-Level Metrics:**
```
Metric             | SNMP OID (Cisco Example)        | Alert Threshold
-------------------|----------------------------------|------------------
CPU utilization    | .1.3.6.1.4.1.9.9.109.1.1.1.1.7  | >80% for 15 min
Memory utilization | .1.3.6.1.4.1.9.9.48.1.1.1.5     | >90%
Temperature        | .1.3.6.1.4.1.9.9.13.1.3.1.3     | >70°C
```

**Application-Level Metrics:**
```
Metric                    | Tool/Method              | Acceptable Range
--------------------------|--------------------------|-------------------
HTTP response time        | Synthetic monitoring     | <2 seconds
DNS query time            | Ping/dig                 | <100 ms
Database query latency    | APM tool                 | <50 ms
VoIP MOS score           | Voice quality monitoring | >4.0 (scale 1-5)
```

#### 3. Statistical Analysis

**Calculate Key Statistics:**

**Mean (Average):**
```
Mean = Sum of all values / Number of values

Example: Daily peak bandwidth over 30 days
(450 + 480 + 520 + ... + 510) Mbps / 30 = 495 Mbps average
```

**Median (Middle Value):**
```
Sort values, find middle value
Useful when outliers skew the mean

Example: 400, 450, 480, 500, 520, 550, 900 Mbps
Median = 500 Mbps (middle value)
Mean = 543 Mbps (skewed by 900 Mbps outlier)
```

**95th Percentile (Peak):**
```
Sort all values, discard top 5%
Industry standard for capacity planning

Why 95th? Ignores brief spikes, focuses on sustained peaks
Example: 95th percentile = 680 Mbps means 95% of time traffic below this
```

**Standard Deviation (Variability):**
```
Measures spread of data around mean
Low SD = consistent performance
High SD = highly variable performance

Alert thresholds often set at Mean + 2*SD (warning) or Mean + 3*SD (critical)
```

#### 4. Identify Patterns

**Time-of-Day Patterns:**
```
Hour  | Avg Utilization | Pattern
------|-----------------|----------------------------------
00:00 | 15%             | Nightly backups
06:00 | 10%             | Minimal activity
08:00 | 45%             | Morning login surge
09:00 | 60%             | Peak work hours begin
12:00 | 75%             | Lunch time streaming/browsing
14:00 | 70%             | Afternoon work
17:00 | 50%             | Users logging off
19:00 | 25%             | Evening activity
```

**Day-of-Week Patterns:**
```
Day       | Peak Utilization | Notes
----------|------------------|----------------------------------
Monday    | 82%              | Highest - weekend catchup
Tuesday   | 78%              | High
Wednesday | 75%              | Mid-week steady state
Thursday  | 76%              | High
Friday    | 65%              | Lower - half-day, vacations
Saturday  | 20%              | Weekend minimal staff
Sunday    | 18%              | Weekend minimal staff
```

**Monthly/Seasonal Patterns:**
```
Period                  | Variation from Baseline
------------------------|---------------------------------
Month-end (last 3 days) | +25% (financial close, reporting)
Quarter-end            | +40% (intensive reporting)
Holiday season         | -30% (retail: +60%, others: -30%)
Academic calendar      | +50% start of semester, -80% summer
```

### Documenting Baselines

**Baseline Report Template:**
```markdown
# Network Performance Baseline Report
**Period:** January 1 - January 31, 2025
**Network Segment:** Corporate LAN (10.0.0.0/8)

## Executive Summary
- Average bandwidth utilization: 42%
- Peak utilization (95th percentile): 78%
- No capacity constraints identified
- Recommend re-baseline in 6 months

## Detailed Metrics

### Core Router (Core-R1)
**Interface GigabitEthernet0/1 (Uplink to Internet)**
| Metric                | Average | Peak (95th) | Min   | Std Dev |
|-----------------------|---------|-------------|-------|---------|
| Inbound utilization   | 380 Mbps| 780 Mbps    | 50 Mbps| 120 Mbps|
| Outbound utilization  | 420 Mbps| 850 Mbps    | 60 Mbps| 140 Mbps|
| Error rate            | 0.001%  | 0.003%      | 0%    | 0.001%  |
| CPU utilization       | 35%     | 52%         | 20%   | 8%      |
| Memory utilization    | 48%     | 48%         | 47%   | 0.5%    |

**Analysis:**
- Current 1 Gbps link sufficient, 85% peak utilization acceptable
- Plan upgrade to 10 Gbps when sustained peak >800 Mbps for 3 months
- Error rate within acceptable range (<0.1%)

### Distribution Switch (Dist-SW1)
| Metric                | Average | Peak (95th) | Alert Threshold |
|-----------------------|---------|-------------|-----------------|
| Bandwidth utilization | 520 Mbps| 1.2 Gbps    | >1.5 Gbps       |
| CPU utilization       | 28%     | 41%         | >70%            |
| Memory utilization    | 62%     | 63%         | >85%            |

## Observations
- Monday 8-9 AM highest utilization (login storm)
- Month-end last 3 days +20% average increase
- Streaming video traffic increased 15% compared to previous quarter

## Recommendations
1. Monitor internet link; plan upgrade if growth continues
2. Implement QoS for VoIP (currently best-effort)
3. Re-baseline in Q3 2025 or after major changes
```

## Capacity Planning

### Why Capacity Planning Matters

**Business Drivers:**
- **User growth**: New hires require network capacity
- **Application changes**: Cloud migration, video conferencing adoption
- **Technology upgrades**: 1 Gbps → 10 Gbps transition
- **Mergers/acquisitions**: Network consolidation

**Cost Implications:**
- Circuit upgrades require lead time (30-180 days for high-bandwidth circuits)
- Proactive cheaper than reactive (rush charges, downtime costs)
- Right-sizing prevents overprovisioning waste

### Capacity Planning Process

#### 1. Trend Analysis

**Linear Extrapolation:**
```
Future Utilization = Current Utilization + (Growth Rate * Time Period)

Example:
Current average: 420 Mbps
Monthly growth rate: 15 Mbps/month (from baseline data)
Projected in 12 months: 420 + (15 * 12) = 600 Mbps

If link capacity is 1 Gbps, still adequate (60% utilization)
```

**Compound Growth:**
```
Future Utilization = Current Utilization * (1 + Growth Rate)^Time Period

Example:
Current: 420 Mbps
Monthly growth rate: 3% per month
Projected in 12 months: 420 * (1.03)^12 = 598 Mbps
```

**Growth Rate Calculation:**
```
Growth Rate = (Current Period - Previous Period) / Previous Period * 100%

Example:
January average: 400 Mbps
February average: 420 Mbps
Growth rate = (420 - 400) / 400 * 100% = 5% per month
```

#### 2. Forecasting Demand

**User-Based Forecasting:**
```
Total Bandwidth Requirement = Users * Per-User Bandwidth * Concurrency Factor

Example:
500 users
5 Mbps per user (typical web/email/video conferencing)
Concurrency factor: 0.4 (40% active simultaneously)

Total: 500 * 5 * 0.4 = 1,000 Mbps (1 Gbps)

Recommendation: Provision 1.5-2x for growth headroom = 1.5-2 Gbps
```

**Application-Based Forecasting:**
```
Application    | Users | Bandwidth/User | Concurrent % | Total Required
---------------|-------|----------------|--------------|----------------
Email/Web      | 500   | 2 Mbps         | 80%          | 800 Mbps
Video Conf     | 500   | 3 Mbps         | 15%          | 225 Mbps
Cloud Apps     | 500   | 4 Mbps         | 60%          | 1,200 Mbps
File Transfers | 500   | 10 Mbps        | 5%           | 250 Mbps
                                                Total:    2,475 Mbps

Recommendation: 3 Gbps circuit (allows 20% headroom)
```

#### 3. Capacity Thresholds

**Industry Best Practices:**
```
Utilization Level | Status               | Action Required
------------------|----------------------|-------------------------------------
0-50%             | Underutilized        | Consider cost optimization
50-70%            | Optimal              | Normal operation, monitor trends
70-85%            | Nearing capacity     | Plan upgrade, 6-12 month timeline
85-95%            | At capacity          | Urgent upgrade needed, 3-6 months
>95%              | Over capacity        | Immediate action, performance impact
```

**Planning Triggers:**
```
Trigger                                      | Action
---------------------------------------------|---------------------------------------
Sustained average >70% for 3 months          | Initiate upgrade planning
95th percentile >85% for 1 month             | Accelerate upgrade timeline
Any period >95% exceeding 5 minutes          | Immediate investigation, temp mitigation
Error rate >0.1% sustained                   | Check for capacity-related drops
User complaints + high utilization           | Prioritize upgrade
```

#### 4. Cost-Benefit Analysis

**Upgrade Decision Factors:**

**Costs:**
- Circuit cost (MRC - Monthly Recurring Cost)
- Equipment cost (routers, switches, optics)
- Installation/NRC (Non-Recurring Cost)
- Downtime during upgrade

**Benefits:**
- Improved user experience
- Support business growth
- Avoid productivity loss from congestion
- Competitive advantage

**Example Analysis:**
```
Current: 1 Gbps circuit @ $1,500/month
Proposed: 10 Gbps circuit @ $5,000/month
Additional cost: $3,500/month ($42,000/year)

Estimated productivity gain:
- 500 users
- 1 hour/day saved due to faster app response
- Average hourly rate: $40
- Annual productivity gain: 500 * 1 * 250 days * $40 = $5,000,000

ROI: ($5,000,000 - $42,000) / $42,000 = 11,719% 😊

Note: Actual productivity gains vary, use conservative estimates
```

### Rightsizing Network Capacity

**Overprovisioning Risks:**
- Wasted budget on unused capacity
- Opportunity cost (funds could improve other areas)

**Underprovisioning Risks:**
- Performance degradation
- User complaints and decreased productivity
- Bottlenecks limit application adoption
- Emergency upgrades costly

**Optimal Approach:**
- Provision for 18-24 months growth
- Use QoS to prioritize critical traffic
- Implement traffic shaping to control non-critical usage
- Regular review (quarterly or semi-annual)

## Bandwidth Management Techniques

### Traffic Shaping vs. Traffic Policing

#### Traffic Shaping (Smoothing Traffic)
**How it works:**
- Buffers excess packets in queue
- Releases packets at configured rate
- Smooths bursts to avoid drops

**Characteristics:**
- Does NOT drop packets (buffers them)
- Adds latency (queuing delay)
- Prevents TCP retransmissions
- Configured with token bucket algorithm

**Use case:** Outbound traffic to ISP (match ISP contract rate)

**Configuration Example (Cisco):**
```cisco
! Define traffic class
class-map match-all INTERNET-TRAFFIC
  match any

! Define traffic shaping policy
policy-map SHAPE-TO-100M
  class INTERNET-TRAFFIC
    shape average 100000000    ! 100 Mbps

! Apply to interface
interface GigabitEthernet0/1
  service-policy output SHAPE-TO-100M
```

#### Traffic Policing (Enforcing Rate Limits)
**How it works:**
- Drops or marks packets exceeding rate
- No buffering
- Immediate enforcement

**Characteristics:**
- CAN drop packets
- No added latency
- May cause TCP retransmissions
- Configured with token bucket algorithm

**Use case:** Enforce rate limits per customer, control DoS

**Configuration Example (Cisco):**
```cisco
! Define traffic class
class-map match-all GUEST-WIFI
  match access-group name GUEST-ACL

! Define policing policy
policy-map POLICE-GUEST-50M
  class GUEST-WIFI
    police rate 50000000 burst 10000000  ! 50 Mbps rate, 10 MB burst
      exceed-action drop

! Apply to interface
interface GigabitEthernet0/2
  service-policy input POLICE-GUEST-50M
```

**Key Difference:**
```
Shaping: Buffers excess → No drops, adds latency
Policing: Drops excess → Drops possible, no latency
```

### Quality of Service (QoS)

QoS prioritizes important traffic during congestion. *(See Lesson 21 for detailed QoS coverage.)*

**Quick QoS Refresher:**
- **Classification**: Identify traffic (by port, IP, DSCP)
- **Marking**: Tag packets with priority (DSCP, CoS)
- **Queuing**: Place packets in priority queues
- **Scheduling**: Decide which queue to service first

**Priority Hierarchy (typical):**
```
1. Voice (VoIP)         - DSCP EF (46)   - Priority queue
2. Video                - DSCP AF41 (34) - Bandwidth guarantee
3. Business-critical    - DSCP AF31 (26) - Bandwidth guarantee
4. Best-effort (default)- DSCP 0         - Remaining bandwidth
5. Scavenger (bulk)     - DSCP CS1 (8)   - Lowest priority
```

### Bandwidth Optimization Techniques

#### 1. Compression
**Reduces data size before transmission**

**WAN Compression:**
- Lempel-Ziv (LZ) algorithms
- Typical compression ratio: 2:1 to 4:1 for text/office documents
- Less effective on already-compressed data (images, video)

**Configuration Example (Cisco):**
```cisco
interface Serial0/0
  compression predictor    ! Hardware compression (faster)
  ! or
  compression stac         ! Software compression (better ratio)
```

#### 2. Caching
**Stores frequently accessed content locally**

**Web Proxy/Cache:**
- Squid, NGINX, commercial appliances
- Cache HTTP content (web pages, images, downloads)
- Reduces WAN bandwidth for repeated requests

**Benefits:**
- 20-50% bandwidth reduction (typical for web traffic)
- Faster response times for cached content

#### 3. Deduplication
**Eliminates redundant data transmission**

**WAN Optimization Appliances:**
- Riverbed SteelHead, Cisco WAAS
- Identify duplicate data chunks
- Transmit only unique data + references

**Use case:**
- Multiple users accessing same files
- Database replication
- Backup traffic

**Typical results:**
- 50:1 reduction for highly redundant data
- 5:1 to 10:1 average reduction

#### 4. Protocol Optimization
**Reduces protocol overhead**

**TCP Optimization:**
- Larger TCP window sizes (increase throughput on high-latency links)
- Selective Acknowledgment (SACK) - acknowledge non-contiguous packets
- TCP window scaling (support window sizes >64 KB)

**Chatty Protocol Optimization:**
- Application protocols with many round-trips (CIFS/SMB)
- WAN optimization appliances intercept and optimize
- Reduce round-trips from 100+ to <10

#### 5. Application-Layer Optimization
**Improve specific application performance**

**Examples:**
- **HTTP/2 and HTTP/3**: Multiplexing, header compression
- **VoIP codec selection**: G.711 (64 kbps) vs. G.729 (8 kbps)
- **Video codec**: H.264 vs. H.265 (50% more efficient)
- **Email**: Disable inline images, use links instead

## Network Performance Troubleshooting

### Common Performance Issues

#### 1. High Latency

**Symptoms:**
- Slow application response
- VoIP call quality issues
- Video buffering

**Causes:**
- Congested link (high utilization)
- Routing loop or suboptimal path
- Overloaded device CPU
- Propagation delay (long distance)

**Troubleshooting Steps:**
```
1. Traceroute to identify where latency introduced
   traceroute -n 8.8.8.8

2. Check interface utilization at each hop
   show interface gi0/1

3. Check device CPU/memory
   show processes cpu sorted
   show memory statistics

4. Check for errors/drops
   show interface gi0/1 | include error|drop

5. Verify routing path optimal
   show ip route 8.8.8.8
```

#### 2. Packet Loss

**Symptoms:**
- TCP retransmissions
- VoIP choppy audio
- Application timeouts

**Causes:**
- Interface buffer overflow (congestion)
- Physical layer issues (bad cable, SFP)
- Faulty hardware (memory errors)
- Incorrect duplex mismatch

**Troubleshooting Steps:**
```
1. Check interface errors and drops
   show interface gi0/1 | include drops|errors|CRC

2. Verify duplex settings
   show interface gi0/1 | include duplex
   ! Should be auto-auto or match on both sides

3. Test cable
   ! Use cable tester (TDR - Time Domain Reflectometer)

4. Check for congestion
   show interface gi0/1
   ! Look for output drops, output queue depth

5. Implement QoS if congestion-related
   ! See Lesson 21 QoS configurations
```

#### 3. Duplex Mismatch

**What is it:**
- One side auto, other side hard-coded
- One side full-duplex, other side half-duplex
- Causes collisions, late collisions, high error rate

**Symptoms:**
- High error rate (CRC errors, frame errors)
- Poor performance despite low utilization
- Intermittent connectivity

**Detection:**
```cisco
show interface gi0/1
! Look for:
! - Late collisions (duplex mismatch indicator)
! - CRC errors
! - Runts, Giants

show interface gi0/1 status
! Verify: a-full/a-full (auto-negotiated full duplex both sides)
```

**Fix:**
```cisco
interface GigabitEthernet0/1
  duplex auto       ! Preferred - let both sides negotiate
  speed auto
  
! Or hard-code BOTH sides (not recommended):
interface GigabitEthernet0/1
  duplex full
  speed 1000
```

#### 4. Broadcast Storms

**What is it:**
- Excessive broadcast traffic flooding network
- Often caused by Layer 2 loop (STP failure)

**Symptoms:**
- Network extremely slow or unresponsive
- Switch CPU at 100%
- All interfaces saturated

**Detection:**
```cisco
show interface gi0/1
! Look for: High input rate, many broadcasts

show processes cpu sorted
! Look for: High CPU from "Spanning-Tree" or "ARP Input"

show spanning-tree
! Look for: Topology changes, root bridge changes
```

**Mitigation:**
```cisco
! Enable storm control on access ports
interface range gi0/2 - 48
  storm-control broadcast level 10.00   ! Limit broadcasts to 10%
  storm-control action shutdown         ! Shutdown port if exceeded

! Ensure STP enabled and working
spanning-tree mode rapid-pvst
spanning-tree portfast bpduguard default
```

#### 5. Asymmetric Routing

**What is it:**
- Forward path different from return path
- Can cause issues with stateful firewalls, load balancers

**Symptoms:**
- Connections dropped by firewall (no matching session)
- Inconsistent performance

**Detection:**
```bash
# From source
traceroute -n destination_ip

# From destination
traceroute -n source_ip

# If paths different = asymmetric routing
```

**Solutions:**
- Policy-based routing to force symmetric paths
- Configure firewall for asymmetric routing support
- Use dynamic routing with consistent metrics

### Performance Testing Tools

#### 1. iPerf/iPerf3
**Purpose:** Measure maximum throughput between two points

**Usage:**
```bash
# On server
iperf3 -s

# On client
iperf3 -c server_ip -t 60 -i 10
# Test for 60 seconds, report every 10 seconds

# TCP test (default)
iperf3 -c server_ip -P 4
# 4 parallel streams

# UDP test (specify bandwidth)
iperf3 -c server_ip -u -b 100M
# UDP at 100 Mbps
```

#### 2. Ping
**Purpose:** Test reachability and measure RTT

**Usage:**
```bash
# Basic ping
ping 8.8.8.8

# Continuous ping with statistics
ping -c 100 8.8.8.8
# Send 100 packets, show statistics

# Large packet size (test MTU)
ping -s 1472 8.8.8.8
# 1472 bytes payload + 28 bytes header = 1500 bytes (standard MTU)

# Disable fragmentation (test path MTU)
ping -M do -s 1472 8.8.8.8
```

#### 3. Traceroute
**Purpose:** Identify network path and latency per hop

**Usage:**
```bash
# Standard traceroute
traceroute 8.8.8.8

# No DNS resolution (faster)
traceroute -n 8.8.8.8

# TCP traceroute (bypass ICMP filtering)
traceroute -T -p 443 8.8.8.8

# MTR (My TraceRoute) - continuous traceroute
mtr -n 8.8.8.8
```

#### 4. Pathping (Windows)
**Purpose:** Combines ping and traceroute with packet loss per hop

**Usage:**
```cmd
pathping 8.8.8.8
```

**Output shows:**
- Latency per hop
- Packet loss per hop (very useful!)

#### 5. Netcat (nc)
**Purpose:** TCP/UDP connectivity testing

**Usage:**
```bash
# Listen on port 8080
nc -l 8080

# Connect to port 8080
nc server_ip 8080

# Test UDP
nc -u server_ip 5000

# Port scanning
nc -zv server_ip 80 443 22
```

#### 6. Wireshark/tcpdump
**Purpose:** Packet capture and analysis

**Usage:**
```bash
# Capture on interface
tcpdump -i eth0 -w capture.pcap

# Capture specific traffic
tcpdump -i eth0 host 192.168.1.100 and port 80

# Read capture file
tcpdump -r capture.pcap
```

## Summary

Performance management is an ongoing process:

**1. Establish Baselines:**
- Collect metrics for minimum 2-4 weeks
- Calculate mean, median, 95th percentile, standard deviation
- Identify time-of-day, day-of-week, and seasonal patterns
- Document findings for future reference

**2. Capacity Planning:**
- Trend analysis (linear or compound growth)
- Forecast based on user growth and application changes
- Plan upgrades when utilization sustains >70%
- Budget for 18-24 months growth

**3. Bandwidth Management:**
- Traffic shaping (buffer excess packets)
- Traffic policing (drop excess packets)
- QoS (prioritize critical traffic)
- Compression, caching, deduplication

**4. Optimization:**
- Protocol optimization (TCP, application-layer)
- WAN optimization appliances
- Codec selection (VoIP, video)
- Eliminate unnecessary traffic

**5. Troubleshooting:**
- Use baselines to identify abnormal behavior
- Systematic approach (ping, traceroute, interface stats)
- Common issues: high latency, packet loss, duplex mismatch, broadcast storms
- Testing tools: iPerf, ping, traceroute, Wireshark

Effective performance management prevents issues before they impact users, supports business growth, and optimizes IT spending.

## Review Questions

1. What is a network performance baseline and why is it important?
2. What is the difference between mean and 95th percentile for capacity planning?
3. At what sustained utilization level should you plan a capacity upgrade?
4. What is the difference between traffic shaping and traffic policing?
5. What are the symptoms of a duplex mismatch?
6. Explain how WAN optimization deduplication reduces bandwidth usage.
7. What tool would you use to measure maximum TCP throughput between two points?
8. What does asymmetric routing mean and why can it cause problems?
9. How do you calculate bandwidth requirements using a user-based model?
10. What are three bandwidth optimization techniques and their use cases?
