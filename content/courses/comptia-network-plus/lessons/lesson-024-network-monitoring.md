---
id: network-monitoring
title: Network Monitoring and Management
chapterId: ch3-network-operations
order: 24
duration: 75
objectives:
  - Understand network monitoring protocols (SNMP, NetFlow, syslog)
  - Implement network monitoring solutions
  - Configure alerting and thresholds
  - Analyze network performance metrics
  - Use monitoring tools effectively
---

---
id: network-monitoring
title: Network Monitoring and Management
chapterId: ch3-network-operations
order: 24
duration: 75
objectives:
  - Understand network monitoring protocols (SNMP, NetFlow, syslog)
  - Implement network monitoring solutions
  - Configure alerting and thresholds
  - Analyze network performance metrics
  - Use monitoring tools effectively
---

# Lesson 24: Network Monitoring and Management

## Introduction

Network monitoring is the continuous observation of network infrastructure to ensure availability, performance, and security. Effective monitoring enables proactive problem detection, capacity planning, security threat identification, and performance optimization. This lesson covers monitoring protocols (SNMP, NetFlow, syslog), monitoring tools, alerting mechanisms, and best practices for comprehensive network management.

## Why Network Monitoring is Critical

### Business Impact
- **Uptime assurance**: Detect issues before users report problems
- **Performance optimization**: Identify bottlenecks and capacity constraints
- **Security**: Detect anomalous traffic patterns and potential breaches
- **Capacity planning**: Data-driven decisions about infrastructure upgrades
- **Compliance**: Many regulations require logging and monitoring

### Cost of Downtime
Industry statistics show:
- Average cost of network downtime: $5,600 per minute
- E-commerce sites: Can lose $100,000+ per hour
- Manufacturing: Production line stoppage costs
- Healthcare: Patient care impacts and regulatory violations
- Financial services: Trading losses and regulatory penalties

## Simple Network Management Protocol (SNMP)

### SNMP Overview
SNMP is an application layer protocol (UDP ports 161/162) for collecting and organizing information about managed devices:
- **Manager**: Monitoring system that queries devices
- **Agent**: Software on managed devices that responds to queries
- **MIB (Management Information Base)**: Database of objects that can be monitored
- **OID (Object Identifier)**: Unique identifier for each MIB object

### SNMP Versions

#### SNMPv1 (1988)
- **Authentication**: Community strings (plaintext passwords)
- **Encryption**: None
- **Security**: Very weak, vulnerable to eavesdropping
- **Status**: Legacy, should not be used

**SNMPv1 Messages:**
- **GET**: Request single MIB object value
- **GET-NEXT**: Request next MIB object in tree
- **SET**: Modify MIB object value
- **TRAP**: Unsolicited alert from agent to manager

#### SNMPv2c (1996)
- **Improvements**: Bulk transfers (GETBULK), improved error handling
- **Authentication**: Community strings (still plaintext)
- **Encryption**: None
- **Security**: Weak, but still widely deployed
- **Use case**: Internal monitoring where security less critical

**SNMPv2c Enhancements:**
- **GETBULK**: Efficiently retrieve large amounts of data
- **INFORM**: Acknowledged trap (manager confirms receipt)
- **64-bit counters**: Support for high-speed interfaces (>4 Gbps)

#### SNMPv3 (2004) - RECOMMENDED
- **Authentication**: Username/password with MD5 or SHA hashing
- **Encryption**: DES, 3DES, or AES encryption
- **Security**: Strong, suitable for internet-facing monitoring
- **Complexity**: More difficult to configure than v1/v2c

**SNMPv3 Security Levels:**
```
noAuthNoPriv: No authentication, no encryption (like v1/v2c)
authNoPriv: Authentication only (MD5/SHA)
authPriv: Authentication + encryption (DES/3DES/AES) ← RECOMMENDED
```

### SNMP Configuration Example

**Cisco Router SNMPv3 Configuration:**
```cisco
! Create SNMPv3 user with authentication and encryption
snmp-server group MONITORING v3 priv
snmp-server user admin MONITORING v3 auth sha AuthPass123 priv aes 128 PrivPass123

! Define what the group can access (read-only)
snmp-server view READONLY iso included

! Allow SNMP manager at 10.1.1.100 to access
access-list 10 permit 10.1.1.100
snmp-server access MONITORING "" v3 priv exact READONLY 10

! Contact and location information
snmp-server location "HQ Datacenter Rack 5"
snmp-server contact "netadmin@company.com"

! Enable traps for critical events
snmp-server enable traps snmp linkdown linkup
snmp-server enable traps config
snmp-server enable traps cpu threshold
snmp-server host 10.1.1.100 version 3 priv admin cpu config snmp
```

### Management Information Base (MIB)

MIBs organize monitored data in hierarchical tree structure:

**Common MIB-II (RFC 1213) Objects:**
```
System Group (1.3.6.1.2.1.1):
  sysDescr (1): Text description of entity
  sysUpTime (3): Time since last reboot
  sysContact (4): Contact person for device
  sysName (5): Administratively assigned name
  sysLocation (6): Physical location

Interfaces Group (1.3.6.1.2.1.2):
  ifNumber (1): Number of network interfaces
  ifTable (2): Interface information table
    ifIndex: Interface identifier
    ifDescr: Interface description
    ifSpeed: Interface speed in bits/second
    ifOperStatus: up(1), down(2), testing(3)
    ifInOctets: Bytes received
    ifOutOctets: Bytes transmitted
    ifInErrors: Inbound packets with errors
    ifOutErrors: Outbound packets with errors

IP Group (1.3.6.1.2.1.4):
  ipForwarding (1): Forwarding enabled (1) or disabled (2)
  ipInReceives (3): Total IP datagrams received
  ipInDelivers (9): Datagrams delivered to upper layer
  ipOutRequests (10): IP datagrams transmitted

TCP Group (1.3.6.1.2.1.6):
  tcpCurrEstab (9): Current established connections
  tcpInSegs (10): Segments received
  tcpOutSegs (11): Segments sent

UDP Group (1.3.6.1.2.1.7):
  udpInDatagrams (1): UDP datagrams received
  udpOutDatagrams (4): UDP datagrams sent
```

### SNMP Traps vs Polling

**Polling (Manager-initiated):**
- Manager regularly queries agent for data
- Predictable network load
- May miss short-duration events between polls
- Typical polling interval: 1-5 minutes

**Traps (Agent-initiated):**
- Agent sends alert when event occurs
- Immediate notification of critical events
- Less network overhead for infrequent events
- Can be lost if network problem exists

**Best Practice:** Use both:
- Regular polling for metrics (CPU, bandwidth, errors)
- Traps for critical events (link down, high CPU, authentication failure)

### SNMP Monitoring Metrics

**Interface Statistics:**
- **Bandwidth utilization**: (ifInOctets + ifOutOctets) * 8 / ifSpeed * 100%
- **Error rate**: (ifInErrors + ifOutErrors) / (ifInUcastPkts + ifOutUcastPkts) * 100%
- **Discard rate**: Packets dropped due to buffer overflow
- **Broadcast/multicast ratio**: Should typically be <10% of total traffic

**CPU Utilization:**
- Cisco OID: 1.3.6.1.4.1.9.9.109.1.1.1.1.7 (5-minute average)
- Alert threshold: >80% sustained
- Critical threshold: >90%

**Memory Utilization:**
- Cisco OID: 1.3.6.1.4.1.9.9.48.1.1.1.5 (used), 1.3.6.1.4.1.9.9.48.1.1.1.6 (free)
- Alert threshold: >90% used
- Modern devices handle high memory usage better than older equipment

## NetFlow and Traffic Analysis

### NetFlow Overview
NetFlow is a Cisco protocol (now IPFIX standard) for collecting IP traffic information:
- Developed by Cisco in 1996
- Samples and exports traffic flow records
- Provides visibility into network traffic patterns
- Basis for capacity planning and security analysis

### Flow Definition
A flow is defined by seven key fields:
1. **Source IP address**
2. **Destination IP address**
3. **Source port**
4. **Destination port**
5. **Layer 3 protocol** (TCP, UDP, ICMP)
6. **Type of Service (ToS)** byte
7. **Input logical interface**

### NetFlow Components

**Flow Exporter (Router/Switch):**
- Observes packets passing through
- Creates flow cache entries
- Exports flow records to collector
- Typical export: Every 1-15 minutes or when flow ends

**Flow Collector:**
- Receives and stores flow records
- Aggregates data from multiple exporters
- Provides database for analysis tools
- Examples: SolarWinds NTA, Scrutinizer, nfdump

**Flow Analyzer:**
- Queries collector database
- Generates reports and visualizations
- Detects anomalies and security threats
- Provides bandwidth usage reports

### NetFlow Versions

#### NetFlow v5 (Most Common)
- Fixed format, 7 key fields
- No IPv6 support
- No MPLS support
- Low overhead, widely supported

#### NetFlow v9 (Template-based)
- Flexible, extensible format
- IPv6 support
- MPLS support
- More complex but more powerful

#### IPFIX (IP Flow Information Export)
- IETF standard based on NetFlow v9
- Vendor-neutral alternative
- Supported by most modern devices

### NetFlow Configuration Example

**Cisco Router NetFlow v5 Configuration:**
```cisco
! Define flow exporter
flow exporter NETFLOW-EXPORT
  destination 10.1.1.200
  transport udp 2055
  export-protocol netflow-v5

! Define flow monitor
flow monitor NETFLOW-MONITOR
  exporter NETFLOW-EXPORT
  record netflow-original

! Apply to interfaces
interface GigabitEthernet0/1
  ip flow monitor NETFLOW-MONITOR input
  ip flow monitor NETFLOW-MONITOR output

! Verify configuration
show flow monitor NETFLOW-MONITOR cache
```

### sFlow (Alternative to NetFlow)
- Developed by InMon Corporation
- Random packet sampling (1 in N packets)
- Lower CPU overhead than NetFlow
- Supported by many vendors (HP, Arista, Juniper)
- Less accurate but more scalable for high-speed networks

### NetFlow Use Cases

**1. Bandwidth Monitoring**
- Identify top talkers (hosts using most bandwidth)
- Determine top applications (web, video streaming, file transfers)
- Plan capacity upgrades based on trends

**2. Security Analysis**
- Detect DDoS attacks (sudden spike in traffic to single host)
- Identify port scanning (connections to many ports)
- Find data exfiltration (large outbound transfers)
- Detect botnet command and control traffic

**3. Application Performance**
- Monitor response times for critical applications
- Identify congestion points
- Validate QoS policies working as intended

**4. Compliance and Forensics**
- Historical traffic records for investigations
- Prove compliance with acceptable use policies
- Provide evidence for security incidents

### NetFlow Metrics to Monitor

**Traffic Volume:**
- Bytes per second, packets per second
- Top 10 source/destination IP addresses
- Top 10 protocols and applications

**Traffic Patterns:**
- Inbound vs outbound traffic ratio
- Internal vs external traffic
- Peak usage times and days

**Anomalies:**
- Sudden traffic spikes (>3x baseline)
- Unusual protocols on unexpected ports
- Traffic to known malicious IPs

## Syslog Logging

### Syslog Overview
Syslog is a standard protocol (RFC 5424) for sending event messages:
- **Protocol**: UDP port 514 (standard) or TCP port 514 (reliable)
- **Messages**: Generated by devices for events, errors, changes
- **Centralized**: Logs from all devices sent to central server
- **Analysis**: Correlation, alerting, compliance reporting

### Syslog Severity Levels

Standard severity levels (0-7, lower number = more severe):

```
Level | Keyword       | Description                          | Example
------|---------------|--------------------------------------|----------------------------------
0     | Emergency     | System unusable                      | Device completely failed
1     | Alert         | Immediate action required            | Power supply failure
2     | Critical      | Critical condition                   | Temperature critical threshold
3     | Error         | Error condition                      | Interface down
4     | Warning       | Warning condition                    | Configuration change
5     | Notice        | Normal but significant               | Interface up
6     | Informational | Informational message                | User login
7     | Debug         | Debug message (troubleshooting)      | Protocol state machine details
```

### Syslog Message Format

**Standard syslog message structure:**
```
<Priority>Timestamp Hostname Process[PID]: Message

Example:
<189>Nov 15 14:23:45 Router-01 %SYS-5-CONFIG_I: Configured from console by admin on vty0
```

**Priority Calculation:**
```
Priority = Facility * 8 + Severity

Facility 16 (Local0) + Severity 5 (Notice) = 133
```

### Syslog Configuration Example

**Cisco Router Syslog Configuration:**
```cisco
! Set logging buffer size on device
logging buffered 50000

! Enable logging to syslog server
logging host 10.1.1.200
logging trap informational    ! Send severity 0-6 (not debug)

! Include timestamps in messages
service timestamps log datetime msec localtime show-timezone

! Include sequence numbers
service sequence-numbers

! Logging source interface (for consistent source IP)
logging source-interface Loopback0

! Verify configuration
show logging
```

**Linux Rsyslog Configuration (`/etc/rsyslog.conf`):**
```bash
# Receive syslog messages on UDP 514
module(load="imudp")
input(type="imudp" port="514")

# Forward messages from network devices to separate file
if $fromhost-ip startswith '10.1.1.' then /var/log/network-devices.log
& stop
```

### Syslog vs SNMP Traps

| Feature | Syslog | SNMP Traps |
|---------|--------|------------|
| Protocol | UDP 514 or TCP 514 | UDP 162 |
| Format | Text messages | Binary (ASN.1 encoding) |
| Human readable | Yes | No (requires MIB) |
| Detailed info | Very detailed | Brief |
| Standardization | Standard format | Vendor-specific MIBs |
| Use case | Detailed logging | Critical alerts |

**Best Practice:** Use both:
- Syslog for detailed event logging and forensics
- SNMP traps for immediate alerting of critical events

### Log Management Best Practices

**1. Centralized Logging:**
- All network devices send logs to central server
- Prevents loss of logs if device reboots
- Enables correlation across multiple devices

**2. Log Retention:**
- **Short-term (hot storage):** 30-90 days on fast disks
- **Long-term (cold storage):** 1-7 years on archive storage
- **Compliance requirements:** HIPAA 6 years, PCI-DSS 1 year

**3. Log Rotation:**
```bash
# Linux logrotate configuration
/var/log/network-devices.log {
    daily
    rotate 90
    compress
    delaycompress
    missingok
    notifempty
}
```

**4. Log Analysis:**
- Use SIEM (Security Information and Event Management) tools
- Set up automated alerting for critical patterns
- Regular review of warning and error messages

**5. Time Synchronization:**
- **Crucial**: All devices must have accurate time for log correlation
- Use NTP (Network Time Protocol) with internal authoritative server
- NTP Stratum hierarchy: Stratum 1 (atomic clock), Stratum 2 (sync to Stratum 1)

## Network Monitoring Tools

### Open Source Monitoring Tools

#### Nagios
- **Purpose**: Infrastructure monitoring and alerting
- **Strengths**: Highly customizable, large plugin ecosystem
- **Monitoring**: Device availability, service status, metrics
- **Alerting**: Email, SMS, pager integration
- **Web interface**: Status dashboards

**Nagios Check Example:**
```bash
# Check PING to host
./check_ping -H 192.168.1.1 -w 100.0,20% -c 500.0,60%

# Check SNMP interface
./check_snmp -H 192.168.1.1 -C public -o 1.3.6.1.2.1.2.2.1.8.1 -r 1
```

#### Zabbix
- **Purpose**: Enterprise network and application monitoring
- **Strengths**: Auto-discovery, template-based monitoring
- **Database**: Stores historical data for trending
- **Visualization**: Graphs, maps, dashboards
- **Agent-based or agentless**: SNMP, IPMI, JMX

#### Prometheus + Grafana
- **Prometheus**: Time-series database for metrics
- **Grafana**: Visualization and dashboard platform
- **Pull model**: Prometheus scrapes metrics from exporters
- **Alertmanager**: Handles alerts from Prometheus
- **Modern**: Popular for cloud-native and containerized environments

#### Cacti
- **Purpose**: Network graphing solution
- **Strengths**: RRDtool-based graphing, SNMP polling
- **Use case**: Bandwidth utilization graphs
- **Templates**: Pre-built for many device types

#### LibreNMS
- **Purpose**: Auto-discovering network monitoring
- **Strengths**: PHP/MySQL based, simple setup
- **Discovery**: Automatically finds and monitors devices
- **Alerts**: Flexible alerting rules
- **Billing**: Built-in bandwidth billing module

### Commercial Monitoring Tools

#### SolarWinds Network Performance Monitor (NPM)
- **Comprehensive**: SNMP, NetFlow, syslog, WMI
- **Strengths**: Easy setup, attractive dashboards
- **PerfStack**: Drag-and-drop performance analysis
- **Cost**: $2,995+ (500 elements)

#### PRTG Network Monitor (Paessler)
- **All-in-one**: Network, server, application monitoring
- **Sensors**: Pre-configured for common devices
- **Licensing**: Priced by number of sensors
- **Strengths**: Quick deployment, Windows-based

#### Cisco Prime Infrastructure
- **Cisco-focused**: Deep integration with Cisco equipment
- **Features**: Configuration management, compliance, assurance
- **Wireless**: Excellent for Cisco wireless controller management
- **Cost**: Enterprise pricing

#### ManageEngine OpManager
- **Budget-friendly**: Lower cost than SolarWinds
- **Features**: Multi-vendor support, workflow automation
- **Modules**: Network, server, firewall, bandwidth monitoring

### SIEM (Security Information and Event Management)

#### Splunk
- **Purpose**: Log aggregation and analysis platform
- **Strengths**: Powerful search language, scalability
- **Use cases**: Security analysis, troubleshooting, compliance
- **Licensing**: By data volume ingested per day
- **Cost**: Expensive at scale

#### ELK Stack (Elasticsearch, Logstash, Kibana)
- **Elasticsearch**: Search and analytics engine
- **Logstash**: Log ingestion and parsing
- **Kibana**: Visualization and dashboards
- **Open source**: Free, but requires expertise to operate

#### Graylog
- **Purpose**: Open-source log management
- **Strengths**: Simpler than ELK, good performance
- **Search**: Elasticsearch-based
- **Alerting**: Built-in alert conditions

## Network Performance Metrics

### Key Performance Indicators (KPIs)

**1. Availability (Uptime)**
```
Availability = (Total Time - Downtime) / Total Time * 100%

Examples:
99.9% (three nines) = 8.76 hours downtime/year
99.99% (four nines) = 52.56 minutes downtime/year
99.999% (five nines) = 5.26 minutes downtime/year
```

**2. Bandwidth Utilization**
```
Utilization = (Current Throughput / Interface Capacity) * 100%

Alert thresholds:
Warning: >70% sustained for 15 minutes
Critical: >90% sustained for 5 minutes
```

**3. Latency (Round-Trip Time)**
```
Acceptable latency by application:
- Voice (VoIP): <150 ms
- Video conferencing: <150 ms
- Real-time gaming: <50 ms
- General web browsing: <200 ms
- File transfers: <500 ms
```

**4. Jitter (Latency Variation)**
```
Jitter = Variation in packet delay

Acceptable jitter:
- Voice: <30 ms
- Video: <30 ms
- Data: <100 ms
```

**5. Packet Loss**
```
Packet Loss = (Packets Lost / Packets Sent) * 100%

Acceptable packet loss:
- Voice: <1%
- Video: <2%
- Data: <3%
```

**6. Error Rate**
```
Error Rate = (Errors / Total Packets) * 100%

Investigation threshold: >0.1%
Critical threshold: >1%
```

### Baseline Establishment

**Purpose:** Know "normal" to detect "abnormal"

**Steps to Create Baseline:**
1. **Data collection period**: Minimum 2 weeks, ideally 1 month
2. **Capture metrics**: CPU, memory, bandwidth, errors, latency
3. **Identify patterns**:
   - Daily peaks (9 AM logins, noon streaming)
   - Weekly patterns (Monday heaviest, Friday lightest)
   - Seasonal variations (end of quarter, holidays)
4. **Calculate statistics**:
   - Average (mean)
   - Peak (95th percentile)
   - Minimum
   - Standard deviation
5. **Set thresholds**:
   - Warning: Mean + 2 standard deviations
   - Critical: Mean + 3 standard deviations

**Example Baseline:**
```
Interface GigabitEthernet0/1 Utilization Baseline (30 days):
  Average: 35%
  Peak (95th percentile): 68%
  Minimum: 5% (after hours)
  Standard deviation: 12%

Alert thresholds:
  Warning: 59% (35 + 2*12)
  Critical: 71% (35 + 3*12)
```

## Alerting and Notification

### Alert Severity Levels

**Critical:**
- Service outage affecting users
- Security breach detected
- Hardware failure
- Action: Immediate response (24/7 on-call)

**Warning:**
- Service degradation
- Approaching capacity threshold
- Configuration change detected
- Action: Response during business hours

**Informational:**
- Scheduled maintenance completed
- Device rebooted
- Backup successful
- Action: No immediate action, log for reference

### Alert Delivery Methods

**Email:**
- Most common
- Include: Device, timestamp, severity, metric, current value, threshold
- Subject line should enable filtering: `[CRITICAL] Router-Core-01 - Interface Down`

**SMS/Text:**
- For critical alerts only (avoid alert fatigue)
- Short format: "CRIT: Core-SW-01 CPU 95% at 14:23"

**Instant Messaging:**
- Slack, Microsoft Teams, Discord
- Can include graphs and runbook links
- Supports alert acknowledgement

**Pager/Phone Call:**
- For urgent critical alerts
- PagerDuty, VictorOps, OpsGenie
- Escalation policies (if not acknowledged in 5 min, call next person)

**ITSM Integration:**
- Automatically create tickets in ServiceNow, Jira
- Track acknowledgement and resolution

### Alert Best Practices

**1. Avoid Alert Fatigue:**
- Don't alert on everything
- Tune thresholds to reduce false positives
- Use alert suppression during maintenance windows
- Implement alert dependencies (don't alert on downstream if upstream failed)

**2. Actionable Alerts:**
- Alert must require action
- Include context and next steps
- Link to runbooks or documentation

**3. Alert Escalation:**
```
Severity: Critical
├─ Immediate: SMS to on-call engineer
├─ +5 minutes: If not acknowledged, call on-call
├─ +15 minutes: Escalate to senior engineer
└─ +30 minutes: Escalate to manager

Severity: Warning
├─ Immediate: Email to team
└─ +1 hour: If not acknowledged, email manager
```

**4. Alert Correlation:**
- If core router down, suppress alerts from downstream devices
- Reduce noise by grouping related alerts

**5. Alert Testing:**
- Regularly test alert delivery mechanisms
- Verify on-call rotation up to date
- Practice runbooks

## Real-World Monitoring Scenario

**Scenario: E-commerce Website Performance Issue**

**Symptoms Reported:**
- Users complaining about slow website
- Intermittent timeouts during checkout

**Monitoring Investigation:**

1. **Check Application Servers** (SNMP):
   - CPU: 45% (normal)
   - Memory: 60% (normal)
   - Disk I/O: Normal

2. **Check Database Servers** (SNMP):
   - CPU: 85% (elevated but not critical)
   - Query latency: 200ms average (baseline: 50ms) ⚠️

3. **Check Network Links** (SNMP interface stats):
   - Web tier to app tier: 40% utilization (normal)
   - App tier to DB tier: 95% utilization (SATURATED) ⚠️
   - Packet loss: 2.5% ⚠️

4. **NetFlow Analysis:**
   - Unexpected large backup job running to database tier
   - Backup consuming 800 Mbps on 1 Gbps link
   - Database replication traffic also competing for bandwidth

**Root Cause:** Backup job scheduled during business hours, saturating database network link

**Resolution:**
- Reschedule backup job to off-hours
- Implement QoS to prioritize database queries over backup traffic
- Upgrade database tier link to 10 Gbps

**Monitoring Improvements:**
- Add alert for sustained bandwidth >80% on critical links
- Dashboard showing database query latency
- Correlation alert: High DB latency + high network utilization

## Summary

Effective network monitoring requires:

**1. Multiple Data Sources:**
- SNMP for device health and interface statistics
- NetFlow for traffic analysis and security
- Syslog for detailed event logging

**2. Right Tools:**
- Open source (Nagios, Zabbix) or commercial (SolarWinds, PRTG)
- SIEM for log correlation (Splunk, ELK)
- Visualization (Grafana, custom dashboards)

**3. Baselines and Thresholds:**
- Establish normal behavior
- Set meaningful alert thresholds
- Avoid alert fatigue

**4. Actionable Alerts:**
- Appropriate severity levels
- Multiple delivery methods
- Escalation policies

**5. Continuous Improvement:**
- Regular review of alerts and thresholds
- Update baselines as network changes
- Incorporate lessons learned from incidents

Network monitoring is not "set and forget" - it requires ongoing tuning, analysis, and adjustment to provide maximum value while minimizing noise.

## Review Questions

1. What are the three versions of SNMP and which should be used for secure monitoring?
2. What is the difference between SNMP polling and SNMP traps?
3. Explain what a NetFlow "flow" is and what seven fields define it.
4. What are the eight syslog severity levels, from most to least severe?
5. Why is time synchronization (NTP) critical for network logging?
6. What is a network performance baseline and why is it important?
7. What is the "five nines" availability percentage and how much downtime does it allow per year?
8. Name three open-source network monitoring tools and one strength of each.
9. What is the difference between NetFlow and sFlow?
10. What are best practices to avoid "alert fatigue" in network monitoring?
