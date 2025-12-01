---
id: ids-ips-monitoring
title: IDS/IPS and Network Security Monitoring
chapterId: ch4-network-security
order: 37
duration: 90
objectives:
  - Understand IDS vs IPS technologies
  - Configure signature and anomaly-based detection
  - Implement security monitoring solutions
  - Analyze security alerts and logs
  - Deploy SIEM systems
---

# Lesson 37: IDS/IPS and Network Security Monitoring

## Introduction

Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS) are critical security technologies that monitor network traffic for malicious activity, policy violations, and security threats. While firewalls control access based on rules, IDS/IPS provide deeper inspection to detect and prevent sophisticated attacks that bypass traditional security controls.

In this lesson, we'll explore detection methods, IDS/IPS architectures, signature-based and anomaly-based detection, security monitoring strategies, and Security Information and Event Management (SIEM) systems.

**Key Principle:** Defense in depth - IDS/IPS provide additional security layer beyond firewalls.

## IDS vs IPS

### Core Differences

**Intrusion Detection System (IDS):**
```
Function: Passive monitoring and alerting
Action: Detects attacks, generates alerts
Placement: Out-of-band (span port, tap)
Impact: No traffic delay
Risk: Cannot block attacks

Analogy: Security camera
- Records what happens
- Alerts security team
- Cannot prevent break-in

Use Cases:
- Compliance monitoring
- Forensic investigation
- Performance-sensitive environments
- Learning/tuning phase before IPS
```

**Intrusion Prevention System (IPS):**
```
Function: Active blocking and prevention
Action: Detects attacks, blocks malicious traffic
Placement: Inline (in traffic path)
Impact: Minimal latency (microseconds)
Risk: False positives can block legitimate traffic

Analogy: Security guard
- Monitors entry
- Blocks unauthorized access
- Actively prevents break-in

Use Cases:
- Active threat prevention
- Zero-day protection
- Automated response
- High-security environments
```

**Comparison:**
```
Feature          IDS              IPS
Mode             Passive          Active
Placement        Out-of-band      Inline
Action           Alert only       Block + Alert
Traffic impact   None             Minimal latency
False positive   Alert only       Can block traffic
Response time    After attack     Real-time
Management       Lower risk       Higher risk
```

### Deployment Models

**Network IDS/IPS (NIDS/NIPS):**
```
Placement: Network segments, perimeter
Monitors: All network traffic
Scope: Multiple hosts

Advantages:
- Protects entire network segment
- Single device protects many hosts
- Detects network-based attacks (scans, DoS)

Disadvantages:
- Cannot inspect encrypted traffic
- Cannot see intra-host attacks
- Performance limitations at high speed

Products: Snort, Suricata, Cisco Firepower
```

**Host IDS/IPS (HIDS/HIPS):**
```
Placement: Individual host (software agent)
Monitors: System calls, file changes, logs
Scope: Single host

Advantages:
- Sees encrypted traffic (before encryption)
- Detects local attacks (privilege escalation)
- Application-specific protection

Disadvantages:
- Must install on each host
- Consumes host resources
- Management overhead (many agents)

Products: OSSEC, Tripwire, Carbon Black
```

**Wireless IDS/IPS (WIDS/WIPS):**
```
Placement: Wireless network
Monitors: 802.11 frames, RF spectrum
Scope: Wireless infrastructure

Detections:
- Rogue access points
- Evil twin attacks
- Deauthentication attacks
- Weak encryption (WEP, WPA)

Products: AirMagnet, Cisco MSE, Aruba RFProtect
```

## Detection Methods

### Signature-Based Detection

**How It Works:**
```
Method: Compare traffic against known attack patterns
Signatures: Database of attack patterns

Process:
1. Traffic passes through IDS/IPS
2. Pattern matching against signature database
3. If match: Alert or block
4. If no match: Allow

Analogy: Antivirus signature detection
```

**Signature Components:**
```
Signature ID: 12345
Name: MS17-010 EternalBlue SMB Exploit
Protocol: TCP
Port: 445
Pattern: \x00\x00\x00\x31\xff\x53\x4d\x42... (hex pattern)
Action: Drop and alert
Severity: Critical
CVE: CVE-2017-0144

Example Signature (Snort):
alert tcp any any -> any 445 (
  msg:"MS17-010 EternalBlue SMB Exploit Attempt";
  content:"|ff 53 4d 42|";
  content:"|00 00 00 31|";
  reference:cve,2017-0144;
  classtype:attempted-admin;
  sid:12345;
  rev:1;
)
```

**Advantages:**
```
1. Low false positives (known attacks)
2. Fast (efficient pattern matching)
3. Detailed information (known exploit)
4. Easy to understand (specific attack)
```

**Disadvantages:**
```
1. Cannot detect unknown attacks (zero-days)
2. Signature database must be updated
3. Evasion techniques (obfuscation, encoding)
4. Requires constant updates
```

**Signature Management:**
```
Update Frequency:
- Critical: Immediately
- High: Daily
- Normal: Weekly

Auto-Update:
- Download signatures automatically
- Test in lab environment
- Deploy to production

Tuning:
- Disable irrelevant signatures (reduces false positives)
- Enable signatures for your environment
- Custom signatures for specific threats
```

### Anomaly-Based Detection

**How It Works:**
```
Method: Detect deviations from normal behavior
Baseline: Learn normal traffic patterns

Process:
1. Learning phase (1-4 weeks)
   - Observe normal traffic
   - Build baseline profile
   
2. Detection phase
   - Compare current traffic to baseline
   - Alert on significant deviations

Analogy: Credit card fraud detection
- Normal: $50 at grocery store
- Anomaly: $5,000 at electronics store in foreign country
```

**Baseline Metrics:**
```
Network-Level:
- Bandwidth utilization (Mbps)
- Packet rate (pps)
- Protocol distribution (TCP/UDP/ICMP ratio)
- Top talkers (source/destination IPs)

Application-Level:
- Request rate (requests/second)
- Response time (latency)
- Error rate (4xx, 5xx responses)
- User behavior patterns

Example Baseline:
Protocol Distribution:
- TCP: 75%
- UDP: 20%
- ICMP: 5%

Anomaly: TCP drops to 40%, UDP spikes to 55%
Possible Cause: UDP flood attack
```

**Advantages:**
```
1. Detects unknown attacks (zero-days)
2. No signature updates needed
3. Detects insider threats (abnormal behavior)
4. Adaptive (learns new normal)
```

**Disadvantages:**
```
1. High false positives (legitimate changes flagged)
2. Requires learning period
3. Difficult to interpret (what is anomaly?)
4. Business changes affect baseline
```

**Machine Learning:**
```
Modern Approach: AI/ML for anomaly detection

Techniques:
- Supervised learning: Train on labeled data (attack vs normal)
- Unsupervised learning: Cluster similar behavior
- Deep learning: Neural networks find complex patterns

Benefits:
- Better accuracy (reduces false positives)
- Faster adaptation to new attacks
- Behavioral analysis (user/entity behavior analytics)

Products: Darktrace, Vectra, Cisco Stealthwatch
```

### Behavior-Based Detection

**Protocol Anomalies:**
```
Detects: Violations of protocol specifications

Examples:
- Invalid TCP flags (SYN+FIN set simultaneously)
- Fragmented packets (evasion attempt)
- Malformed HTTP headers
- DNS tunneling (unusual query patterns)

Detection:
alert tcp any any -> any any (
  msg:"Invalid TCP flags - SYN+FIN";
  flags:SF;
  sid:20001;
)
```

**Statistical Anomalies:**
```
Detects: Statistical deviations

Examples:
- Port scan (connections to many ports)
- Network scan (connections to many hosts)
- DoS (unusually high connection rate)
- Data exfiltration (large outbound transfer)

Thresholds:
- Connections per second: >100 (normal: 10)
- Unique destinations: >50 hosts in 1 minute
- Outbound traffic: >1GB in 5 minutes
```

### Heuristic Detection

**How It Works:**
```
Method: Rules based on expert knowledge
Logic: "If X and Y, then likely attack Z"

Example Rules:
1. If (failed login attempts > 5 in 1 minute)
   Then: Brute force attack

2. If (outbound DNS requests to random domains)
   Then: DGA (Domain Generation Algorithm) malware

3. If (ICMP packet size > 1500 bytes)
   Then: Ping of death attack

Benefit: Catches attack patterns without specific signatures
```

## IDS/IPS Architectures

### Network Placement

**Perimeter IPS:**
```
Location: Between Internet and internal network

         Internet
            |
    [Firewall + IPS]
            |
      Internal Network

Purpose:
- First line of defense
- Block external threats
- Protect all internal hosts

Considerations:
- High traffic volume (requires performance)
- Must handle encrypted traffic (SSL inspection)
- Tuning critical (prevent false positive blocks)
```

**Internal IPS:**
```
Location: Between network segments

    [Core Network]
          |
    [Internal IPS]
          |
    [Server VLAN]

Purpose:
- East-west traffic protection
- Segment isolation
- Insider threat detection
- Lateral movement prevention

Benefit: Catches attacks that bypassed perimeter
```

**Distributed IPS:**
```
Location: Multiple locations

    [Perimeter IPS]
          |
    [Core Switch]
      /       \
[IPS]         [IPS]
  |             |
[Servers]   [Workstations]

Purpose:
- Granular protection
- Segment-specific tuning
- Reduced traffic per sensor

Benefit: Better performance, targeted policies
```

### Inline vs Tap Deployment

**Inline Mode (IPS):**
```
Configuration:

[Router] → [IPS] → [Switch] → [Hosts]
          ↑
    All traffic passes through

Advantages:
- Can block attacks
- Real-time prevention
- Complete traffic visibility

Disadvantages:
- Single point of failure (needs bypass)
- Latency introduced
- False positives block traffic

Bypass Mechanisms:
- Hardware bypass (optical fiber tap)
- Automatic bypass on failure
- Heartbeat monitoring
```

**Span/Tap Mode (IDS):**
```
Configuration:

[Switch] → [Hosts]
   ↓ (mirror)
  [IDS]

Traffic copied to IDS:
- SPAN (Switch Port Analyzer): Software copy
- TAP (Test Access Point): Hardware copy

Advantages:
- No traffic impact
- No single point of failure
- Safe for learning

Disadvantages:
- Cannot block attacks
- May miss packets (SPAN overload)
- Alerts after attack succeeds
```

### High Availability

**Active/Standby:**
```
Design:
[Primary IPS] ←→ [Secondary IPS]
      |               |
  (Inline)        (Standby)

Function:
- Primary handles traffic
- Secondary monitors primary
- Failover on failure (seconds)

Configuration:
- Synchronized policies
- Stateful failover
- Shared configuration
```

**Active/Active:**
```
Design:
        [Load Balancer]
          /         \
  [IPS-1]           [IPS-2]
          \         /
        [Core Switch]

Function:
- Both IPS active
- Load distribution
- Higher throughput

Benefit: Better performance, redundancy
```

## IDS/IPS Configuration

### Snort Configuration

**Snort Overview:**
```
Type: Open-source NIDS/NIPS
Creator: Martin Roesch (1998)
Current: Snort 3.x
Use: Packet capture, logging, analysis

Components:
- Packet decoder
- Preprocessors (normalize traffic)
- Detection engine (signatures)
- Logging and alerting
- Output plugins
```

**Basic Snort Configuration:**
```bash
# snort.conf - Main configuration file

# Network variables
var HOME_NET 10.1.0.0/16
var EXTERNAL_NET !$HOME_NET
var HTTP_SERVERS $HOME_NET
var SMTP_SERVERS 10.1.1.10
var DNS_SERVERS 10.1.1.11

# Paths
var RULE_PATH /etc/snort/rules
var SO_RULE_PATH /etc/snort/so_rules
var PREPROC_RULE_PATH /etc/snort/preproc_rules

# Preprocessors
preprocessor frag3_global: max_frags 65536
preprocessor frag3_engine: policy linux
preprocessor stream5_global: track_tcp yes, track_udp yes
preprocessor stream5_tcp: policy linux
preprocessor http_inspect: global iis_unicode_map unicode.map 1252
preprocessor http_inspect_server: server default \
    ports { 80 443 8080 } \
    server_flow_depth 0 \
    client_flow_depth 0

# Output plugins
output alert_syslog: LOG_AUTH LOG_ALERT
output log_tcpdump: tcpdump.log

# Rule files
include $RULE_PATH/local.rules
include $RULE_PATH/emerging-threats.rules
include $RULE_PATH/community.rules
```

**Custom Snort Rules:**
```bash
# /etc/snort/rules/local.rules

# Alert on SQL injection attempt
alert tcp any any -> $HTTP_SERVERS 80 (
    msg:"SQL Injection Attempt";
    flow:to_server,established;
    content:"union"; nocase;
    content:"select"; nocase;
    pcre:"/(\%27)|(\')|(\-\-)|(\%23)|(#)/i";
    classtype:web-application-attack;
    sid:1000001;
    rev:1;
)

# Alert on SSH brute force
alert tcp any any -> $HOME_NET 22 (
    msg:"SSH Brute Force Attempt";
    flow:to_server,established;
    detection_filter:track by_src, count 5, seconds 60;
    classtype:attempted-admin;
    sid:1000002;
    rev:1;
)

# Detect port scan
alert tcp any any -> $HOME_NET any (
    msg:"Port Scan Detected";
    flags:S;
    detection_filter:track by_src, count 20, seconds 10;
    classtype:attempted-recon;
    sid:1000003;
    rev:1;
)

# Detect DNS tunneling
alert udp any any -> any 53 (
    msg:"Possible DNS Tunneling - Unusual Query Length";
    content:"|01 00 00 01|"; offset:2; depth:4;
    byte_test:2,>,100,0,relative;
    classtype:bad-unknown;
    sid:1000004;
    rev:1;
)

# Detect ransomware file extension
alert tcp $HOME_NET any -> any 445 (
    msg:"Possible Ransomware - Encrypted File Extension";
    flow:to_server,established;
    content:".encrypted"; nocase;
    content:".locked"; nocase;
    classtype:trojan-activity;
    sid:1000005;
    rev:1;
)
```

**Running Snort:**
```bash
# Test configuration
snort -T -c /etc/snort/snort.conf

# Run in IDS mode (console output)
snort -A console -c /etc/snort/snort.conf -i eth0

# Run in IDS mode (log to file)
snort -c /etc/snort/snort.conf -i eth0 -l /var/log/snort

# Run in IPS mode (inline)
snort -Q --daq afpacket -i eth0:eth1 -c /etc/snort/snort.conf

# Read PCAP file (forensics)
snort -c /etc/snort/snort.conf -r capture.pcap
```

### Suricata Configuration

**Suricata Overview:**
```
Type: Open-source IDS/IPS (Snort alternative)
Advantage: Multi-threaded (better performance)
Features: IDS, IPS, NSM (Network Security Monitoring)

Key Features:
- Multi-threading (scales with CPU cores)
- Lua scripting (custom logic)
- File extraction
- TLS certificate logging
- HTTP logging
```

**Suricata Configuration:**
```yaml
# /etc/suricata/suricata.yaml

vars:
  address-groups:
    HOME_NET: "[10.1.0.0/16]"
    EXTERNAL_NET: "!$HOME_NET"
    HTTP_SERVERS: "$HOME_NET"
    SMTP_SERVERS: "[10.1.1.10]"
    DNS_SERVERS: "[10.1.1.11]"

  port-groups:
    HTTP_PORTS: "80"
    HTTPS_PORTS: "443"
    SSH_PORTS: "22"

# Threading
threading:
  set-cpu-affinity: yes
  cpu-affinity:
    - management-cpu-set:
        cpu: [ 0 ]
    - receive-cpu-set:
        cpu: [ 1-4 ]
    - worker-cpu-set:
        cpu: [ 5-8 ]

# Logging
outputs:
  - fast:
      enabled: yes
      filename: fast.log
  - eve-log:
      enabled: yes
      filetype: regular
      filename: eve.json
      types:
        - alert
        - http
        - dns
        - tls
        - files
        - ssh

# Rule files
rule-files:
  - suricata.rules
  - local.rules
  - emerging-threats.rules
```

**Running Suricata:**
```bash
# Test configuration
suricata -T -c /etc/suricata/suricata.yaml

# Run in IDS mode
suricata -c /etc/suricata/suricata.yaml -i eth0

# Run in IPS mode (nfqueue)
iptables -I FORWARD -j NFQUEUE --queue-num 0
suricata -c /etc/suricata/suricata.yaml -q 0

# Run in IPS mode (AF_PACKET)
suricata -c /etc/suricata/suricata.yaml --af-packet=eth0
```

## Security Information and Event Management (SIEM)

### SIEM Overview

**What is SIEM?**
```
Definition: Centralized platform for security event collection and analysis
Function: Aggregate, correlate, analyze, alert

Components:
1. Log Collection: Gather logs from all sources
2. Normalization: Convert to common format
3. Correlation: Connect related events
4. Alerting: Notify on security incidents
5. Reporting: Compliance and forensics
6. Dashboards: Real-time visualization
```

**Log Sources:**
```
Network:
- Firewalls
- IDS/IPS
- Switches/routers
- VPN concentrators
- Web proxies

Hosts:
- Windows Event Logs
- Linux syslogs
- Application logs
- Database logs

Security:
- Antivirus
- DLP (Data Loss Prevention)
- Authentication servers (AD, RADIUS)
- Vulnerability scanners

Cloud:
- AWS CloudTrail
- Azure Monitor
- Google Cloud Logging
```

### Correlation Rules

**Simple Correlation:**
```
Rule: Failed Login Threshold
Logic: If failed_logins > 5 in 5 minutes
Action: Alert "Brute Force Attempt"

Example Events:
10:00:01 - Failed login for user 'admin' from 203.0.113.45
10:00:15 - Failed login for user 'admin' from 203.0.113.45
10:00:30 - Failed login for user 'admin' from 203.0.113.45
10:00:45 - Failed login for user 'admin' from 203.0.113.45
10:01:00 - Failed login for user 'admin' from 203.0.113.45
10:01:15 - Failed login for user 'admin' from 203.0.113.45

Alert: "Brute force attack detected from 203.0.113.45"
```

**Advanced Correlation:**
```
Rule: Potential Compromise Sequence
Logic: 
  1. Multiple failed logins (brute force)
  2. Followed by successful login
  3. Followed by privilege escalation
  4. Followed by data access
  Within 30 minutes from same source

Timeline:
10:00 - Event 1: 10 failed SSH logins from 203.0.113.45
10:15 - Event 2: Successful SSH login from 203.0.113.45
10:20 - Event 3: User ran 'sudo su' (privilege escalation)
10:25 - Event 4: Large file transfer to external IP

Alert: "Critical: Potential account compromise and data exfiltration"
Priority: Critical
Response: Block source IP, disable account, investigate
```

**Use Case Examples:**
```
1. Impossible Travel:
   - User logs in from New York at 09:00
   - Same user logs in from London at 09:30
   - Alert: "Impossible travel detected"

2. After-Hours Access:
   - User accesses sensitive files at 3:00 AM
   - User not on-call, no change ticket
   - Alert: "Suspicious after-hours access"

3. Malware Infection Chain:
   - Email with malicious attachment received
   - User opened attachment
   - Outbound connection to known C2 IP
   - Alert: "Malware infection detected"

4. Insider Threat:
   - Employee resignation submitted
   - Large file downloads to USB
   - Access to HR/financial systems
   - Alert: "Potential data theft by departing employee"
```

### SIEM Products

**Commercial:**
```
Splunk:
- Leader in SIEM market
- Powerful search and analytics
- Extensive integrations
- High cost (per GB ingested)

IBM QRadar:
- Strong correlation engine
- Network flow analysis
- Built-in threat intelligence
- Complex deployment

ArcSight (Micro Focus):
- Enterprise-scale
- Advanced correlation
- Compliance reporting
- Steep learning curve

LogRhythm:
- Machine learning analytics
- SOAR integration
- Good for mid-market
```

**Open Source:**
```
Elastic Stack (ELK):
- Elasticsearch, Logstash, Kibana
- Scalable, flexible
- Large community
- Requires custom correlation rules

Wazuh:
- Host-based IDS
- Log analysis
- Compliance monitoring (PCI-DSS, HIPAA)
- Free and open source

OSSIM (AlienVault):
- All-in-one security platform
- Asset discovery, vulnerability scanning
- IDS integration
- Community and commercial versions
```

## Network Security Monitoring

### NSM Methodology

**Approach:**
```
Philosophy: Assume breach, hunt for threats
Focus: Detection and response (not just prevention)

Three Pillars:
1. Full packet capture (evidence)
2. Session data (NetFlow, metadata)
3. Statistical analysis (anomalies)

NSM Cycle:
1. Collect: Gather all security data
2. Detect: Identify potential threats
3. Analyze: Investigate alerts
4. Respond: Contain and remediate
5. Learn: Improve detection
```

**Data Types:**
```
1. Full Packet Capture:
   - Complete network traffic
   - Evidence for forensics
   - High storage requirements
   - Tools: tcpdump, Wireshark

2. Session Data (Flow):
   - Metadata (src, dst, ports, bytes, time)
   - Lower storage
   - Long-term trending
   - Tools: NetFlow, IPFIX, sFlow

3. Statistical Data:
   - Aggregated metrics
   - Bandwidth, connections, protocols
   - Baseline deviations
   - Tools: MRTG, Cacti, Grafana

4. Alert Data:
   - IDS/IPS alerts
   - Firewall denies
   - Authentication failures
   - Tools: Snort, Suricata, Syslog
```

### Security Onion

**Overview:**
```
Platform: Linux distribution for NSM
Components: Integrated security tools
Use: Turnkey NSM solution

Included Tools:
- Suricata (IDS/IPS)
- Zeek (network analysis)
- Elasticsearch (storage)
- Kibana (visualization)
- Stenographer (full packet capture)
- TheHive (case management)
```

**Deployment:**
```
Modes:
1. Standalone: All-in-one (small networks)
2. Distributed: Sensors + master server (large networks)

Sensor:
- Monitors network traffic
- Runs Suricata, Zeek
- Captures packets
- Sends data to master

Master:
- Aggregates sensor data
- Elasticsearch cluster
- Kibana dashboards
- Alert management
```

## Best Practices

### Tuning IDS/IPS

**Reduce False Positives:**
```
1. Baseline Period:
   - Run in IDS mode first (observe)
   - Document normal traffic
   - Identify false positives

2. Disable Irrelevant Rules:
   - Rules for services you don't have
   - Example: Disable Oracle rules if no Oracle DB

3. Threshold Tuning:
   - Adjust detection thresholds
   - Example: Port scan = 50 ports (not 5)

4. Whitelist Known Good:
   - Vulnerability scanners
   - Security tools
   - Monitoring systems

5. Custom Rules:
   - Write rules for your environment
   - More specific = fewer false positives
```

**Prevent False Negatives:**
```
1. Enable Relevant Rules:
   - Services you run
   - Known vulnerabilities in your stack

2. Update Signatures:
   - Daily for critical
   - Weekly for normal

3. Test Coverage:
   - Run attack simulations
   - Verify detection

4. Multi-Layer Defense:
   - Don't rely solely on IPS
   - Combine with firewall, endpoint protection
```

### Performance Optimization

**Sizing:**
```
Factors:
- Bandwidth (Gbps)
- Packet rate (pps)
- Number of rules
- Deep packet inspection depth

Example Requirements:
1 Gbps = Minimum 4-core CPU, 16GB RAM
10 Gbps = Minimum 16-core CPU, 64GB RAM

Load Balancing:
- Multiple sensors
- Split traffic by VLAN
- Separate internal/external
```

**Tuning:**
```
1. Rule Optimization:
   - Disable unused rules
   - Order rules by frequency
   - Use fast patterns

2. Preprocessor Tuning:
   - Limit inspection depth
   - Adjust stream5 settings
   - Tune fragment reassembly

3. Hardware Acceleration:
   - Network cards with offload (RSS, TSO)
   - FPGA-based pattern matching
   - GPU acceleration
```

## Review Questions

1. **What is the difference between IDS and IPS?**
   - IDS detects and alerts (passive), IPS detects and blocks (active, inline)

2. **What are the two main detection methods?**
   - Signature-based (known attacks), anomaly-based (deviations from normal)

3. **What is a false positive?**
   - Legitimate traffic incorrectly flagged as malicious

4. **What is a false negative?**
   - Malicious traffic that goes undetected

5. **Where should perimeter IPS be placed?**
   - Between firewall and internal network (or integrated with firewall)

6. **What is SIEM?**
   - Security Information and Event Management - centralized log collection, correlation, and analysis

7. **What is the advantage of Suricata over Snort?**
   - Multi-threaded (better performance on multi-core systems)

8. **What is full packet capture used for?**
   - Forensic analysis, evidence, detailed investigation of incidents

9. **What is correlation in SIEM?**
   - Connecting related events from multiple sources to detect complex attacks

10. **What is the NSM philosophy?**
    - Assume breach, focus on detection and response, not just prevention

## Key Takeaways

- **IDS detects, IPS prevents** - choose based on risk tolerance
- **Signature-based** detects known attacks, **anomaly-based** detects unknown attacks
- **Tuning is critical** - reduce false positives, prevent false negatives
- **Defense in depth** - IDS/IPS supplement firewalls, don't replace them
- **SIEM provides visibility** - centralized monitoring and correlation
- **NSM assumes breach** - focus on detection and response
- **Performance matters** - size appropriately for bandwidth
- **Regular updates** - keep signatures current for latest threats
- **Multi-layered approach** - combine network and host-based detection
- **Alert fatigue** - too many alerts = ignored alerts (tune aggressively)

## Next Steps

In the next lesson, we'll explore **Wireless Security**, including WPA3, 802.1X, wireless attacks, and secure wireless deployment.

---

**Lesson Complete!** You now understand intrusion detection and prevention systems that provide deep traffic inspection and threat detection.
