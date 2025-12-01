---
id: "lesson-084"
title: "Network Performance Issues: Bottlenecks, QoS, and Traffic Management"
chapterId: "chapter-09"
order: 84
duration: 27
objectives:
  - "Identify and diagnose network performance bottlenecks"
  - "Analyze bandwidth utilization and congestion issues"
  - "Understand Quality of Service (QoS) and traffic prioritization"
  - "Troubleshoot latency, jitter, and packet loss problems"
  - "Apply traffic shaping and bandwidth management techniques"
---

# Network Performance Issues: Bottlenecks, QoS, and Traffic Management

## Introduction

Network connectivity problems—complete outages, IP conflicts, routing failures—are often easier to diagnose than performance issues. A network can be "working" in that all devices connect and communicate, yet perform poorly with slow throughput, high latency, or intermittent quality degradation. Performance problems are frustrating for users and challenging for network administrators because they're often intermittent, hard to reproduce, and require careful analysis to diagnose.

In this lesson, we'll explore network performance issues including:
- **Bandwidth bottlenecks** and congestion
- **Latency and jitter** problems
- **Packet loss** causes and effects
- **Quality of Service (QoS)** concepts and configuration
- **Traffic shaping and policing**
- **Broadcast storms** and excessive traffic

Understanding these concepts enables you to diagnose performance degradation, optimize network throughput, and ensure critical applications receive appropriate network resources.

---

## Bandwidth Bottlenecks

### What is a Bottleneck?

A **network bottleneck** is a point in the network where capacity is insufficient to handle traffic demand, causing congestion and performance degradation. Like a literal bottleneck, traffic flows freely until reaching the narrow point, where it backs up and slows.

**Common Bottleneck Locations**:
- **Uplink ports**: 1 Gbps uplink from access switch to distribution switch
- **Internet connection**: Limited ISP bandwidth (50 Mbps serving 200 users)
- **WAN links**: Slow connections between sites (T1 at 1.544 Mbps)
- **Server NIC**: 1 Gbps NIC serving many clients
- **Firewall throughput**: Processing capacity limit
- **Storage network**: SAN congestion

### Identifying Bandwidth Bottlenecks

**Symptoms**:
- **Slow file transfers**: Large file copies take excessive time
- **Poor application performance**: Web pages load slowly, applications lag
- **High utilization**: Interfaces consistently near 100%
- **Time-based patterns**: Slowdowns during specific times (business hours)
- **VoIP quality degradation**: Choppy audio, dropped calls

**Diagnosis Methods**:

**Method 1: Interface Statistics**:

```cisco
# Cisco switch/router
show interface GigabitEthernet0/1

GigabitEthernet0/1 is up, line protocol is up
  5 minute input rate 950000000 bits/sec, 158333 packets/sec
  5 minute output rate 980000000 bits/sec, 163333 packets/sec
  
  Interface utilization:
  Input:  95% ← Near capacity!
  Output: 98% ← Saturated!
  
  Output queue: 100/1000 (drops: 45234) ← Queue overflows, drops packets
```

**Analysis**:
- Input/Output rates near link capacity (1 Gbps)
- High utilization (>80%) indicates congestion
- Output drops indicate buffer overflow

**Method 2: SNMP Monitoring**:

Use network monitoring tool (PRTG, Nagios, SolarWinds, LibreNMS):
```
Interface: gi0/1
Bandwidth: 1 Gbps
Current Utilization: 892 Mbps (89.2%)
Peak (today): 987 Mbps (98.7%) at 2:15 PM
Average (24h): 654 Mbps (65.4%)

Status: WARNING - Sustained high utilization
```

**Visualize Traffic Patterns**:
- Graph utilization over time
- Identify peak usage periods
- Correlate with business activities

**Method 3: NetFlow / sFlow Analysis**:

Analyze traffic flows to identify top talkers:
```
NetFlow Top Talkers (5 minutes):

Source             Dest              Protocol  Bandwidth    % Total
──────────────────────────────────────────────────────────────────
192.168.1.50  →   Internet         HTTP/S    450 Mbps     46%
192.168.1.100 →   192.168.1.200    SMB       280 Mbps     29%
192.168.1.75  →   Internet         Streaming 150 Mbps     15%
Various       →   Various          Other      98 Mbps      10%

Total: 978 Mbps (98% of 1 Gbps link)
```

**Analysis**:
- Identify bandwidth-heavy applications
- Determine if usage is legitimate or problematic
- Decide whether to upgrade capacity or limit usage

**Method 4: Packet Capture and Analysis**:

Use Wireshark to analyze traffic characteristics:
```
Statistics → I/O Graph
- View packets/second over time
- Identify traffic spikes

Statistics → Conversations
- Show traffic between hosts
- Sort by bytes to find top conversations

Statistics → Protocol Hierarchy
- Break down traffic by protocol
- Identify unexpected protocols consuming bandwidth
```

### Resolving Bandwidth Bottlenecks

**Solution 1: Upgrade Link Capacity**:
```
Bottleneck: 1 Gbps uplink saturated
Solution:   Upgrade to 10 Gbps uplink

Cost: Hardware upgrade (SFP+ modules, cabling)
Benefit: 10× capacity increase
```

**Solution 2: Load Balancing**:
```
Bottleneck: Single 1 Gbps link to server
Solution:   Implement link aggregation (LACP)
            Combine 2× or 4× 1 Gbps links

Configuration (Cisco):
interface Port-channel1
 description Link Aggregation to Server
 
interface GigabitEthernet0/1
 channel-group 1 mode active
 
interface GigabitEthernet0/2
 channel-group 1 mode active

Result: 2 Gbps aggregate bandwidth
```

**Solution 3: QoS Traffic Prioritization**:
```
Bottleneck: 100 Mbps WAN link congested
Solution:   Implement QoS to prioritize critical traffic

- Voice: Highest priority (guaranteed bandwidth)
- Business applications: Medium priority
- Internet browsing: Lower priority
- Streaming video: Lowest priority

(Detailed QoS configuration covered later in lesson)
```

**Solution 4: Traffic Shaping/Rate Limiting**:
```
Problem: Few users consuming excessive bandwidth
Solution: Limit bandwidth per user or application

Example: Limit streaming video to 10 Mbps per user
         Prevent single user from saturating link
```

**Solution 5: Offload Traffic**:
```
Problem: Internet traffic saturating WAN link
Solution: Implement direct internet access at branch sites
          Route internet-bound traffic locally, not through HQ

Benefit: WAN link used only for inter-site business traffic
```

**Solution 6: Caching and Optimization**:
```
Problem: Repetitive downloads consuming bandwidth
Solution: Implement caching proxy or WAN optimization

- Web proxy caches frequently accessed content
- WAN optimization appliance deduplicates data
- Reduces bandwidth usage for repetitive transfers
```

---

## Latency Issues

### Understanding Latency

**Latency** (or **delay**) is the time it takes for data to travel from source to destination. Measured in milliseconds (ms), latency affects application responsiveness and user experience.

**Latency vs. Bandwidth**:
- **Bandwidth**: How much data can be transmitted (capacity)
- **Latency**: How quickly data arrives (speed)

**Analogy**:
- **Bandwidth** = width of highway (lanes)
- **Latency** = distance and speed limit (travel time)

**Types of Latency**:

**Propagation Delay**:
- Time for signal to travel physical distance
- Speed of light in fiber: ~200,000 km/s
- Example: 2,000 km fiber = 10 ms minimum
- Cannot be eliminated (physics)

**Transmission Delay**:
- Time to push bits onto wire
- Depends on link speed
- Example: 1500-byte packet on 1 Gbps = 0.012 ms
- Faster links reduce transmission delay

**Processing Delay**:
- Time router/switch takes to process packet
- Routing table lookup, access control lists
- Typical: <1 ms for modern equipment
- Can increase with high CPU load or complex processing

**Queuing Delay**:
- Time packet waits in queue before transmission
- Depends on congestion level
- Variable: Can be 0 ms (no queue) to hundreds of ms (congested)
- Most problematic for real-time applications

**Total Latency** = Propagation + Transmission + Processing + Queuing

### Latency Requirements by Application

| Application | Acceptable Latency | Preferred | Impact of High Latency |
|-------------|-------------------|-----------|------------------------|
| **VoIP** | <150 ms | <100 ms | Noticeable delay, talk-over |
| **Video conferencing** | <150 ms | <100 ms | Lip sync issues, awkward pauses |
| **Online gaming** | <100 ms | <50 ms | Lag, poor responsiveness |
| **Remote desktop** | <200 ms | <100 ms | Sluggish mouse/keyboard |
| **Web browsing** | <500 ms | <200 ms | Slow page loads |
| **Email** | <2 seconds | <500 ms | Delayed send/receive |
| **File transfer** | Variable | N/A | Minimal impact (throughput matters more) |

### Measuring Latency

**Ping Test**:
```bash
ping 8.8.8.8

64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=15.2 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=116 time=14.8 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=116 time=15.1 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=116 time=15.3 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss
round-trip min/avg/max/stddev = 14.8/15.1/15.3/0.2 ms
```

**Analysis**:
- **Average latency**: 15.1 ms (good for internet)
- **Jitter** (variability): 0.2 ms stddev (very low, excellent)
- **Packet loss**: 0% (perfect)

**Traceroute with Latency**:
```bash
traceroute 8.8.8.8

 1  192.168.1.1       0.8 ms    0.7 ms    0.7 ms   (local gateway)
 2  10.0.0.1          2.1 ms    2.0 ms    2.2 ms   (ISP edge)
 3  72.14.219.1       5.4 ms    5.2 ms    5.6 ms   (ISP core)
 4  209.85.243.115   12.1 ms   12.3 ms   12.0 ms   (backbone)
 5  8.8.8.8          15.2 ms   15.0 ms   15.3 ms   (destination)
```

**Analysis**:
- Identify latency contribution per hop
- Largest increase: Hop 3→4 (~7 ms added)
- Total accumulated latency: 15 ms

**Pathping (Windows) / MTR (Linux)**:
```bash
mtr --report --report-cycles 100 8.8.8.8

                     Loss%   Snt   Last   Avg  Best  Wrst StDev
  1. 192.168.1.1      0.0%   100    0.8   0.9   0.7   2.1   0.2
  2. 10.0.0.1         0.0%   100    2.1   2.2   1.9   3.5   0.3
  3. 72.14.219.1      0.5%   100    5.3   5.4   5.0   8.2   0.6
  4. 209.85.243.115   1.2%   100   12.2  12.5  11.8  18.3   1.2
  5. 8.8.8.8          0.8%   100   15.1  15.3  14.5  22.1   1.5
```

**Analysis**:
- Shows loss% per hop (useful!)
- Hop 4 has 1.2% loss and higher jitter (StDev)
- Indicates potential congestion or routing issue at that hop

### Causes of High Latency

**Network Congestion**:
- Queuing delay increases when links saturated
- Packets wait in buffer before transmission
- Solution: Increase capacity or implement QoS

**Long Physical Distance**:
- Propagation delay proportional to distance
- Fiber: ~5 ms per 1,000 km
- Satellite: ~500-700 ms round-trip (geostationary orbit)
- Solution: Cannot reduce (physics), use caching or local resources

**Routing Issues**:
- Suboptimal path (packets take longer route)
- Example: Traffic to nearby city routed through distant hub
- Solution: Optimize routing, use BGP policy

**WAN Links**:
- Slow links (T1, DSL) have higher transmission delay
- Low bandwidth increases queuing probability
- Solution: Upgrade to faster connection

**Overloaded Equipment**:
- Router/switch CPU at 100%
- Processing delay increases
- Solution: Upgrade equipment, reduce load, optimize config

**Firewall / IDS Deep Inspection**:
- Deep packet inspection adds processing time
- Can add 5-50 ms depending on traffic and rules
- Solution: Tune rules, upgrade appliance, bypass for trusted traffic

### Reducing Latency

**Optimize Routing**:
- Use most direct path
- Implement traffic engineering
- Consider SD-WAN for dynamic path selection

**Increase Bandwidth**:
- Reduces queuing delay during congestion
- Faster transmission (though minimal impact at high speeds)

**Implement QoS**:
- Prioritize latency-sensitive traffic (VoIP, video)
- Low-latency queue for real-time applications
- Prevents queuing delay for priority traffic

**Use Local Resources**:
- Content Delivery Networks (CDN) for web content
- Local DNS resolvers
- Branch office file servers instead of centralized

**Upgrade Equipment**:
- Faster routers/switches with lower processing delay
- Hardware-accelerated packet forwarding

---

## Jitter

### What is Jitter?

**Jitter** is the variation in latency over time. While latency is the average delay, jitter measures how consistent that delay is.

**Example**:

**Low Jitter** (Good):
```
Packet 1: 15 ms
Packet 2: 16 ms
Packet 3: 15 ms
Packet 4: 16 ms
Average: 15.5 ms, Jitter: ±0.5 ms (very consistent)
```

**High Jitter** (Bad):
```
Packet 1: 10 ms
Packet 2: 35 ms
Packet 3: 12 ms
Packet 4: 40 ms
Average: 24.25 ms, Jitter: ±15 ms (highly variable)
```

### Impact of Jitter

**Real-Time Applications**:
- **VoIP**: Choppy audio, syllables dropped, robotic voice
- **Video**: Pixelation, freezing, buffering
- **Gaming**: Unpredictable lag spikes

**Why Jitter is Problematic**:
- Real-time applications expect consistent packet arrival
- Jitter buffer compensates for variation (adds delay)
- Excessive jitter exceeds buffer capacity → packets discarded

**Jitter Requirements**:
- **VoIP**: <30 ms jitter
- **Video conferencing**: <30 ms jitter
- **Gaming**: <20 ms jitter

### Measuring Jitter

**Ping with Statistics**:
```bash
ping -c 100 8.8.8.8

--- 8.8.8.8 ping statistics ---
100 packets transmitted, 100 received, 0% packet loss
round-trip min/avg/max/stddev = 12.3/25.6/58.2/12.8 ms
                                                  ↑
                                            High standard deviation
                                            indicates jitter
```

**Interpretation**:
- Min: 12.3 ms
- Max: 58.2 ms
- Range: 45.9 ms (high variation)
- Stddev: 12.8 ms (indicates significant jitter)

**VoIP-Specific Tools**:
- **Cisco IP SLA**: Measures jitter for VoIP simulation
- **Iperf**: Can measure jitter for UDP streams
- **VoIP monitoring tools**: Extract MOS (Mean Opinion Score)

**Iperf Jitter Test**:
```bash
# Server
iperf3 -s

# Client (UDP test)
iperf3 -c server-ip -u -b 100M -t 30

# Output:
[  ID] Interval           Transfer     Bandwidth       Jitter
[   5]  0.00-30.00  sec   357 MBytes   100 Mbits/sec  2.156 ms  (low jitter)
```

### Causes of Jitter

**Network Congestion**:
- Variable queuing delay
- Packets experience different wait times
- Solution: Increase bandwidth, implement QoS

**Routing Changes**:
- Route flapping (path changes frequently)
- Packets take different paths with different latencies
- Solution: Stabilize routing, increase metrics dampening

**Wireless Networks**:
- Interference causes retransmissions
- Variable signal quality affects transmission time
- Solution: Optimize wireless, use 5 GHz, reduce interference

**Shared/Oversubscribed Links**:
- Bursty traffic from other users
- Unpredictable delay patterns
- Solution: Dedicated bandwidth, QoS prioritization

### Reducing Jitter

**Priority Queuing (QoS)**:
- Real-time traffic bypasses standard queue
- Consistent low-latency path
- Most effective solution

**Traffic Shaping**:
- Smooth bursty traffic
- More consistent egress rate
- Reduces buffer oscillation

**Increase Bandwidth**:
- Reduces congestion probability
- More headroom for burst traffic

**Dedicated Circuits**:
- MPLS circuits with guaranteed QoS
- No contention with other traffic
- Higher cost but predictable performance

---

## Packet Loss

### Understanding Packet Loss

**Packet loss** occurs when packets fail to reach their destination. Loss can happen anywhere along the path and severely impacts application performance.

**Measured as Percentage**:
- 0% loss: Perfect (ideal)
- 0.1-0.5% loss: Acceptable for most applications
- 1-2% loss: Noticeable degradation (VoIP quality suffers)
- >5% loss: Severe impact, unusable for real-time apps

### Impact by Application

**TCP Applications**:
- Triggers retransmission
- Reduces throughput (waiting for retransmits)
- TCP window size reduced (congestion avoidance)
- Example: File transfer at 50% speed due to retransmissions

**UDP Applications**:
- No retransmission (UDP doesn't retransmit)
- Lost packets = lost data
- **VoIP**: Missing audio, choppy conversation
- **Video**: Pixelation, freezing, artifacts
- **Gaming**: Teleporting, missed actions

### Measuring Packet Loss

**Ping Test**:
```bash
ping -c 1000 8.8.8.8

--- 8.8.8.8 ping statistics ---
1000 packets transmitted, 985 received, 1.5% packet loss
                                         ↑
                                   15 packets lost
```

**MTR/Pathping**:
```bash
mtr --report --report-cycles 1000 8.8.8.8

                     Loss%   Snt   Last   Avg  Best  Wrst StDev
  1. 192.168.1.1      0.0%  1000    0.8   0.9   0.7   2.1   0.2
  2. 10.0.0.1         0.0%  1000    2.1   2.2   1.9   3.5   0.3
  3. 72.14.219.1      2.5%  1000    5.3   5.4   5.0   8.2   0.6 ← Loss here!
  4. 209.85.243.115   3.1%  1000   12.2  12.5  11.8  18.3   1.2
  5. 8.8.8.8          2.8%  1000   15.1  15.3  14.5  22.1   1.5
```

**Analysis**:
- Hop 3 shows 2.5% loss
- Subsequent hops show similar or higher loss
- Loss began at hop 3 (ISP core router)

**Interface Statistics**:
```cisco
show interface GigabitEthernet0/1

  Input queue: 0/75/2134/0 (size/max/drops/flushes)
  Output queue: 0/40/8765/0 (size/max/drops/flushes)
                                    ↑
                              8,765 packets dropped

  5 minute input rate 890000000 bits/sec
  5 minute output rate 980000000 bits/sec (near capacity)
```

**Interpretation**:
- Output drops indicate congestion
- Output rate near interface capacity
- Solution: Increase bandwidth or implement QoS

### Causes of Packet Loss

**1. Network Congestion**:
- Most common cause
- Buffer overflow when traffic exceeds capacity
- Tail drop: Packets dropped when queue full

**2. Faulty Hardware**:
- Bad NIC, switch, router
- CRC errors, alignment errors
- Physical layer issues (bad cable, bad port)

**3. Wireless Interference**:
- RF interference causes corruption
- Corrupted packets discarded
- Retransmission at Layer 2 (if enabled)

**4. Routing Loops**:
- Packets loop until TTL expires
- Appear as lost from perspective of source/destination

**5. Firewall / ACL Drops**:
- Security policy blocks traffic
- Appears as loss to application
- Not actually "lost", intentionally blocked

**6. Duplex Mismatch**:
- One side full-duplex, other half-duplex
- Late collisions, FCS errors
- Severe packet loss (20-50%)

### Troubleshooting Packet Loss

**Step 1: Quantify Loss**:
```bash
# Run extended ping test
ping -c 10000 destination

# Calculate loss percentage
# Note if loss is consistent or intermittent
```

**Step 2: Identify Location of Loss**:
```bash
# Use traceroute/mtr to find where loss begins
mtr --report --report-cycles 500 destination

# Loss at hop X indicates problem at or near that device
```

**Step 3: Check Interface Errors**:
```cisco
show interface gi0/1

  0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored
  0 output errors, 0 collisions, 0 interface resets
  5234 output drops  ← Congestion-related drops
```

**Interpret Error Counters**:
- **CRC errors**: Physical layer issue (bad cable, EMI)
- **Collisions**: Duplex mismatch or half-duplex overload
- **Output drops**: Congestion (queue overflow)
- **Ignored**: Buffer shortage or hardware issue

**Step 4: Check Link Utilization**:
```bash
# If utilization >80%, congestion likely cause
# Monitor during problem period
```

**Step 5: Test Physical Layer**:
```bash
# If CRC errors or unexplained loss:
# - Test cables with cable certifier
# - Check for interference (EMI)
# - Verify duplex/speed settings match
```

### Resolving Packet Loss

**Solution 1: Increase Bandwidth**:
- Upgrade link capacity
- Reduces congestion-related drops

**Solution 2: Implement QoS**:
- Prioritize critical traffic
- Less important traffic dropped first
- Protected priority queue for real-time apps

**Solution 3: Fix Physical Layer**:
- Replace faulty cables
- Correct duplex mismatches
- Repair or replace faulty hardware

**Solution 4: Optimize Routing**:
- Avoid congested paths
- Load balance across multiple links
- Use ECMP (Equal-Cost Multi-Path)

**Solution 5: Increase Buffer Size**:
- Larger queues accommodate bursts
- May increase latency (trade-off)
- Not solution if sustained congestion

---

## Quality of Service (QoS)

### What is QoS?

**Quality of Service (QoS)** is a set of techniques for managing network resources, ensuring that critical applications receive necessary bandwidth, low latency, and low packet loss, even during congestion.

**Why QoS is Needed**:
- Network bandwidth is finite resource
- Not all traffic has same requirements
- VoIP needs low latency; file transfer can tolerate delay
- Without QoS, all traffic treated equally (best effort)
- During congestion, all traffic suffers equally

**QoS Goals**:
- **Prioritize** critical traffic (voice, video, mission-critical apps)
- **Guarantee** minimum bandwidth for important applications
- **Limit** bandwidth for less important traffic
- **Reduce** latency and jitter for real-time applications
- **Minimize** packet loss for critical services

### QoS Mechanisms

**1. Classification and Marking**:

**Purpose**: Identify traffic types and mark packets for special handling.

**Classification Methods**:
- **Layer 2**: 802.1p CoS (Class of Service) field in VLAN tag (3 bits, 0-7)
- **Layer 3**: DSCP (Differentiated Services Code Point) in IP header (6 bits, 0-63)
- **Layer 4**: Port numbers (TCP/UDP ports)
- **Layer 7**: Deep Packet Inspection (application recognition)

**DSCP Values** (Common):
```
DSCP Value    Binary    Decimal   Description
─────────────────────────────────────────────────
EF            101110    46        Expedited Forwarding (VoIP)
AF41          100010    34        Assured Forwarding (Video)
AF31          011010    26        Assured Forwarding (Call signaling)
AF21          010010    18        Assured Forwarding (Business apps)
CS0           000000    0         Best Effort (default)
```

**Configuration Example** (Cisco):
```cisco
# Classify and mark VoIP traffic
class-map match-all VOIP
  match protocol rtp audio

policy-map MARK-TRAFFIC
  class VOIP
    set dscp ef

interface GigabitEthernet0/1
  service-policy input MARK-TRAFFIC
```

**2. Queuing**:

**Purpose**: Determine order in which packets are transmitted.

**Queuing Algorithms**:

**FIFO (First In, First Out)**:
- Default behavior (no QoS)
- All packets treated equally
- Simple but unfair during congestion

**Priority Queuing (PQ)**:
- Multiple queues with strict priority
- High-priority queue always serviced first
- Risk: Low-priority traffic can starve

**Weighted Fair Queuing (WFQ)**:
- Allocates bandwidth proportionally based on weight
- Prevents starvation
- Fair to all flows

**Class-Based Weighted Fair Queuing (CBWFQ)**:
- Combines classification with WFQ
- Assign bandwidth percentages to classes
- Guarantees minimum bandwidth

**Low Latency Queuing (LLQ)**:
- Priority queue for real-time traffic (voice)
- CBWFQ for other classes
- Best for converged networks (voice + data)

**Configuration Example** (LLQ):
```cisco
class-map match-all VOIP
  match dscp ef

class-map match-all VIDEO
  match dscp af41

class-map match-all BUSINESS
  match dscp af21

policy-map WAN-QOS
  class VOIP
    priority percent 20          # 20% guaranteed, priority queue
  class VIDEO
    bandwidth percent 30         # 30% guaranteed
  class BUSINESS
    bandwidth percent 30         # 30% guaranteed
  class class-default
    bandwidth percent 20         # 20% for everything else
    fair-queue

interface Serial0/0/0
  bandwidth 10000                # 10 Mbps link
  service-policy output WAN-QOS
```

**3. Congestion Avoidance**:

**Purpose**: Prevent tail drop by proactively dropping packets before queue full.

**Tail Drop** (Default Behavior):
- Queue fills up
- All new packets dropped
- TCP flows all reduce window simultaneously (global synchronization)
- Link alternates between full utilization and idle (inefficient)

**Weighted Random Early Detection (WRED)**:
- Drops packets randomly before queue full
- Probability increases as queue fills
- Low-priority packets dropped first (based on DSCP)
- TCP flows reduce window at different times (avoids synchronization)
- Higher average throughput

**Configuration Example**:
```cisco
policy-map WAN-QOS
  class BUSINESS
    bandwidth percent 30
    random-detect dscp-based     # Enable WRED
```

**4. Traffic Shaping**:

**Purpose**: Smooth bursty traffic to match available bandwidth.

**How Shaping Works**:
- Buffers excess traffic
- Releases at configured rate
- Adds latency but prevents drops at downstream device
- Useful when provider drops traffic exceeding CIR (Committed Information Rate)

**Configuration Example**:
```cisco
policy-map SHAPE-WAN
  class class-default
    shape average 50000000       # Shape to 50 Mbps

interface GigabitEthernet0/1
  service-policy output SHAPE-WAN
```

**5. Traffic Policing**:

**Purpose**: Enforce bandwidth limit by dropping or remarking excess traffic.

**Difference from Shaping**:
- **Shaping**: Buffers and delays excess traffic (adds latency)
- **Policing**: Drops or remarks excess traffic immediately (no added latency)

**Use Cases**:
- Enforce SLA (Service Level Agreement) bandwidth limits
- Limit less important traffic (e.g., streaming video to 10 Mbps per user)

**Configuration Example**:
```cisco
# Limit guest network to 20 Mbps
policy-map LIMIT-GUEST
  class class-default
    police 20000000 conform-action transmit exceed-action drop

interface GigabitEthernet0/5
  description Guest Network
  service-policy input LIMIT-GUEST
```

### Implementing QoS

**Step 1: Identify Requirements**:
- Which applications are critical?
- What are latency/jitter/loss requirements?
- What percentage of bandwidth should each class receive?

**Example**:
```
Voice:     20% bandwidth, <150 ms latency, <30 ms jitter, <1% loss
Video:     30% bandwidth, <200 ms latency
Business:  30% bandwidth
Default:   20% bandwidth (best effort)
```

**Step 2: Classify Traffic**:
- Define traffic classes
- Identify traffic by:
  - Protocol (RTP for voice)
  - DSCP markings
  - IP address/subnet
  - Port numbers

**Step 3: Mark Traffic** (if not already marked):
- Apply DSCP markings close to source
- Trust markings from known devices (IP phones)
- Re-mark untrusted traffic

**Step 4: Configure Queuing**:
- Implement LLQ for voice
- CBWFQ for other classes
- Assign bandwidth percentages

**Step 5: Enable Congestion Avoidance**:
- Implement WRED to prevent tail drop
- Configure drop preferences by class

**Step 6: Implement Shaping/Policing** (if needed):
- Shape to match WAN bandwidth
- Police to enforce limits

**Step 7: Test and Monitor**:
- Verify markings with packet capture
- Monitor queue statistics
- Test application performance
- Adjust as needed

---

## Broadcast Storms

### What is a Broadcast Storm?

A **broadcast storm** occurs when broadcast traffic overwhelms the network, consuming all available bandwidth and causing network failure or severe performance degradation.

**How Broadcast Storms Occur**:
- **Switching loop**: Two switches connected with redundant links without STP
- **Faulty NIC**: Continuously sends broadcasts
- **Malware**: Worm or virus generating excessive traffic
- **Misconfiguration**: Routing protocol flooding, DHCP exhaustion attacks

**Impact**:
- Network becomes unusable
- Switches overwhelmed (CPU at 100%)
- Link lights flash rapidly
- All devices affected (broadcast domain-wide)
- Services time out, connectivity lost

### Diagnosing Broadcast Storms

**Symptoms**:
- Sudden network slowdown or failure
- Switch CPU at 100%
- Link utilization near 100%
- Broadcast/multicast counters increasing rapidly

**Check Interface Statistics**:
```cisco
show interface GigabitEthernet0/1

  5 minute input rate 950000000 bits/sec
  985432 packets/sec                      ← Very high packet rate
  
  Input statistics:
    Broadcast: 983211                     ← Majority are broadcasts!
    Multicast: 1034
    Unicast: 1187
```

**Check MAC Address Table**:
```cisco
show mac address-table

# Rapidly changing MAC addresses indicate loop
# Same MACs appearing on multiple ports
# MAC table may fill and overflow
```

**Packet Capture**:
```bash
# Capture traffic on affected interface
sudo tcpdump -i eth0 -n

# Observe:
- Same broadcast packets repeating
- ARP requests/replies looping
- Timestamps show extremely high packet rate
```

### Resolving Broadcast Storms

**Immediate Action**:

**Disable Ports**:
```cisco
# Identify problematic port
# Shut down port immediately

interface GigabitEthernet0/5
  shutdown
```

**Check Spanning Tree**:
```cisco
show spanning-tree

# Verify STP is enabled
# Check for blocked ports (normal in redundant topology)
# Ensure no ports in error state

# If STP disabled or misconfigured:
spanning-tree mode rapid-pvst
```

**Long-Term Prevention**:

**1. Enable Spanning Tree Protocol**:
```cisco
# Ensure STP enabled on all switches
spanning-tree mode rapid-pvst

# Verify per-VLAN
show spanning-tree
```

**2. Implement Storm Control**:
```cisco
# Limit broadcast/multicast traffic per port
interface range GigabitEthernet0/1-24
  storm-control broadcast level 10.00     # 10% of bandwidth
  storm-control multicast level 10.00
  storm-control action shutdown           # Shutdown port if exceeded
```

**3. Enable BPDU Guard**:
```cisco
# Prevent switches from connecting to access ports
interface GigabitEthernet0/5
  spanning-tree portfast                  # Enable portfast (access port)
  spanning-tree bpduguard enable          # Shutdown if BPDU received
```

**4. Implement Port Security**:
```cisco
# Limit MAC addresses per port
interface GigabitEthernet0/5
  switchport port-security
  switchport port-security maximum 3
  switchport port-security violation shutdown
```

**5. Monitor and Alert**:
- Configure SNMP traps for high broadcast rates
- Monitor switch CPU and link utilization
- Alert on STP topology changes

---

## Summary

In this lesson, we explored network performance issues:

**Bandwidth Bottlenecks**:
- Insufficient capacity causes congestion
- Diagnose with interface statistics, SNMP monitoring, NetFlow
- Resolve by upgrading links, load balancing, or implementing QoS

**Latency**:
- Delay in packet transmission (measured in ms)
- Types: Propagation, transmission, processing, queuing
- Requirements vary by application (VoIP <150 ms, web <500 ms)
- Reduce with optimized routing, increased bandwidth, QoS, local resources

**Jitter**:
- Variation in latency (inconsistent delay)
- Severely impacts real-time applications (VoIP, video)
- Caused by congestion, routing changes, wireless interference
- Reduce with QoS priority queuing, traffic shaping, increased bandwidth

**Packet Loss**:
- Packets fail to reach destination
- Major impact on TCP (retransmissions) and UDP (lost data)
- Caused by congestion, faulty hardware, interference, misconfigurations
- Resolve by increasing bandwidth, implementing QoS, fixing physical issues

**Quality of Service (QoS)**:
- **Classification and Marking**: Identify traffic types (DSCP, CoS)
- **Queuing**: Priority Queuing, LLQ, CBWFQ
- **Congestion Avoidance**: WRED prevents tail drop
- **Shaping**: Smooths bursty traffic (adds latency)
- **Policing**: Enforces limits (drops excess)
- Enables critical applications to perform well during congestion

**Broadcast Storms**:
- Excessive broadcast traffic overwhelms network
- Caused by switching loops, faulty NICs, misconfigurations
- Prevent with Spanning Tree, storm control, BPDU Guard

**Troubleshooting Performance**:
1. Quantify the problem (measure latency, loss, throughput)
2. Identify bottleneck location (traceroute, interface stats)
3. Analyze traffic (NetFlow, packet capture)
4. Implement solution (upgrade, optimize, QoS)
5. Test and monitor results

Understanding performance issues enables you to optimize network throughput, ensure application responsiveness, and deliver reliable service to users.

---

## Additional References

- **RFC 2474**: Definition of Differentiated Services Field (DSCP)
- **RFC 3260**: New Terminology for DiffServ
- **RFC 2475**: Architecture for Differentiated Services
- **IEEE 802.1Q**: VLAN Tagging (includes 802.1p CoS field)
- **IEEE 802.1D**: Spanning Tree Protocol
- **CompTIA Network+ N10-008 Exam Objectives**: Domain 5.5 - Given a scenario, troubleshoot general networking issues
