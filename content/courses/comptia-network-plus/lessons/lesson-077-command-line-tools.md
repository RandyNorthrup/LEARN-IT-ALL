---
id: "lesson-077"
title: "Command-Line Troubleshooting Tools"
chapterId: "chapter-09"
order: 77
duration: 25
objectives:
  - "Use ping to test network connectivity and measure latency"
  - "Analyze traceroute/tracert output to identify routing issues"
  - "Interpret ipconfig/ifconfig output for IP configuration troubleshooting"
  - "Apply command-line tools to diagnose common network problems"
---

# Command-Line Troubleshooting Tools

## Introduction

Command-line tools are the foundation of network troubleshooting. These utilities provide direct access to network functions and generate detailed diagnostic information that helps identify connectivity issues, routing problems, and configuration errors. Network administrators rely on these tools daily for quick diagnostics and problem resolution.

In this lesson, we'll explore the essential command-line tools that every network professional must master: **ping**, **traceroute/tracert**, **ipconfig/ifconfig**, and **pathping/mtr**. These tools work on various operating systems and provide critical insights into network behavior.

---

## Understanding ping

### What is ping?

**ping** (Packet Internet Groper) is the most fundamental network troubleshooting tool. It uses **ICMP Echo Request** and **ICMP Echo Reply** messages to test connectivity between two devices and measure round-trip time (RTT).

**Primary Functions**:
- Verify network connectivity to a destination
- Measure latency (round-trip time)
- Detect packet loss
- Identify intermittent connection issues

### How ping Works

1. **Echo Request**: Source sends ICMP Echo Request packet to destination
2. **Echo Reply**: Destination responds with ICMP Echo Reply
3. **RTT Calculation**: Time difference between request and reply
4. **Statistics**: After completion, ping displays summary statistics

**ICMP Header Fields**:
- **Type**: 8 for Echo Request, 0 for Echo Reply
- **Code**: Always 0 for ping
- **Checksum**: Error detection
- **Identifier**: Matches requests with replies
- **Sequence Number**: Tracks individual ping packets
- **Data**: Optional payload (default 32 bytes on Windows, 56 on Linux)

### ping Command Syntax

**Windows**:
```cmd
ping [options] destination

Common Options:
-t           Ping continuously until stopped (Ctrl+C)
-n count     Number of echo requests to send (default: 4)
-l size      Send buffer size in bytes (default: 32)
-i TTL       Time to Live (default: 128)
-w timeout   Timeout in milliseconds (default: 4000)
-4           Force IPv4
-6           Force IPv6

Examples:
ping google.com
ping -t 8.8.8.8
ping -n 100 192.168.1.1
ping -l 1500 10.0.0.1
```

**Linux/macOS**:
```bash
ping [options] destination

Common Options:
-c count     Number of echo requests to send (default: continuous)
-i interval  Wait interval seconds between packets (default: 1)
-s size      Packet size in bytes (default: 56 data + 8 ICMP header)
-t ttl       Set Time to Live
-W timeout   Timeout in seconds
-4           Force IPv4
-6           Force IPv6
-q           Quiet output (summary only)

Examples:
ping -c 10 google.com
ping -i 0.2 192.168.1.1
ping -s 1400 10.0.0.1
ping -c 5 -W 2 8.8.8.8
```

### Interpreting ping Output

**Successful ping (Windows)**:
```
C:\> ping 8.8.8.8

Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=15ms TTL=117
Reply from 8.8.8.8: bytes=32 time=14ms TTL=117
Reply from 8.8.8.8: bytes=32 time=16ms TTL=117
Reply from 8.8.8.8: bytes=32 time=15ms TTL=117

Ping statistics for 8.8.8.8:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 14ms, Maximum = 16ms, Average = 15ms
```

**Analysis**:
- **All packets received**: No packet loss (100% success)
- **Consistent latency**: 14-16ms indicates stable connection
- **TTL=117**: Packet passed through ~11 routers (128 start - 117 = 11)
- **Low latency**: 15ms average is excellent for Internet connection

**Successful ping (Linux)**:
```
$ ping -c 4 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=15.1 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=14.8 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=117 time=15.3 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 14.210/14.850/15.343/0.445 ms
```

**Analysis**:
- **56(84) bytes**: 56 bytes data + 28 bytes headers = 84 total
- **icmp_seq**: Sequence number for each packet
- **mdev**: Mean deviation (jitter measure) of 0.445ms is very low

### Common ping Error Messages

**Request Timed Out**:
```
C:\> ping 192.168.1.50

Pinging 192.168.1.50 with 32 bytes of data:
Request timed out.
Request timed out.
Request timed out.
Request timed out.
```

**Possible Causes**:
- Destination host is down or unreachable
- Firewall blocking ICMP traffic
- Incorrect IP address
- Network congestion causing packet loss
- Routing problem preventing packets from reaching destination

**Destination Host Unreachable**:
```
C:\> ping 192.168.5.100

Pinging 192.168.5.100 with 32 bytes of data:
Reply from 192.168.1.1: Destination host unreachable.
Reply from 192.168.1.1: Destination host unreachable.
```

**Analysis**:
- Reply from **192.168.1.1** (default gateway) indicates router cannot reach destination
- No route exists to destination network 192.168.5.0/24
- Check routing table or add static route

**Destination Net Unreachable**:
```
Reply from 192.168.1.1: Destination net unreachable.
```

**Indicates**:
- Routing table on local router has no route to destination network
- Possible routing protocol misconfiguration
- Network isolation or firewall blocking

**TTL Expired in Transit**:
```
Reply from 10.0.5.1: TTL expired in transit.
```

**Indicates**:
- Packet exceeded TTL limit before reaching destination
- Routing loop causing packets to circle indefinitely
- Increase TTL with `-i` (Windows) or `-t` (Linux) option to test

**General Failure**:
```
PING: transmit failed. General failure.
```

**Indicates**:
- Network adapter disabled or disconnected
- IP configuration problem (no IP address assigned)
- Driver issue
- Check `ipconfig` output

### ping Troubleshooting Workflow

**Step-by-Step Diagnostics**:

1. **Ping localhost** (`127.0.0.1` or `::1`):
   ```
   ping 127.0.0.1
   ```
   - Tests TCP/IP stack is functioning
   - If this fails, reinstall network drivers or TCP/IP stack

2. **Ping local IP address**:
   ```
   ping 192.168.1.100  (your own IP)
   ```
   - Tests network adapter is working
   - If fails, check physical connection or adapter settings

3. **Ping default gateway**:
   ```
   ping 192.168.1.1
   ```
   - Tests local network connectivity
   - If fails, check Layer 1/2 (cable, switch, VLAN)

4. **Ping external IP address**:
   ```
   ping 8.8.8.8
   ```
   - Tests Internet connectivity
   - If fails but gateway succeeds, check routing/NAT/firewall

5. **Ping external hostname**:
   ```
   ping google.com
   ```
   - Tests DNS resolution
   - If fails but IP address succeeds, check DNS configuration

### Advanced ping Techniques

**Large Packet Testing** (MTU discovery):
```cmd
# Windows - Test with 1500 byte packet (1472 data + 28 headers)
ping -l 1472 -f 8.8.8.8

# Linux - Test with 1472 byte data packet
ping -M do -s 1472 8.8.8.8
```
- `-f` (Windows) / `-M do` (Linux): Don't Fragment flag set
- If "Packet needs to be fragmented but DF set" error appears, MTU is too large
- Reduce size incrementally to find maximum MTU

**Continuous Monitoring**:
```cmd
# Windows - ping continuously
ping -t 192.168.1.1

# Linux - ping with timestamp
ping -D 192.168.1.1
```
- Monitor for intermittent connectivity issues
- Identify packet loss patterns
- Timestamp helps correlate with network events

**Flood ping** (Linux - requires root):
```bash
sudo ping -f 192.168.1.1
```
- Sends packets as fast as possible
- Useful for stress testing
- **WARNING**: Can cause network congestion; use cautiously

---

## traceroute/tracert

### What is traceroute?

**traceroute** (Linux/macOS) or **tracert** (Windows) maps the path packets take to reach a destination by identifying each router (hop) along the way. This tool helps pinpoint exactly where connectivity problems occur in a network path.

**Primary Functions**:
- Discover the path packets take to destination
- Identify slow or failing routers
- Measure latency at each hop
- Diagnose routing problems

### How traceroute Works

**Mechanism**:
1. Sends packets with incrementing **TTL** (Time to Live) values
2. Each router decrements TTL by 1
3. When TTL reaches 0, router sends **ICMP Time Exceeded** message back to source
4. Source records router's IP address and response time
5. Process repeats with increasing TTL until destination is reached

**Packet Flow Example**:
```
Packet 1: TTL=1  → Router 1 → ICMP Time Exceeded → Source (records Router 1)
Packet 2: TTL=2  → Router 1 → Router 2 → ICMP Time Exceeded → Source (records Router 2)
Packet 3: TTL=3  → Router 1 → Router 2 → Router 3 → ICMP Time Exceeded → Source (records Router 3)
Packet 4: TTL=4  → Router 1 → Router 2 → Router 3 → Destination → ICMP Echo Reply → Source
```

**Protocol Differences**:
- **Windows (tracert)**: Uses ICMP Echo Request packets (like ping)
- **Linux/macOS (traceroute)**: Uses UDP packets to high port numbers (33434+)
- **Alternative**: `traceroute -I` (Linux) uses ICMP like Windows

### traceroute/tracert Command Syntax

**Windows (tracert)**:
```cmd
tracert [options] destination

Common Options:
-d           Do not resolve IP addresses to hostnames (faster)
-h maximum   Maximum number of hops to search (default: 30)
-w timeout   Timeout in milliseconds for each reply (default: 4000)
-4           Force IPv4
-6           Force IPv6

Examples:
tracert google.com
tracert -d 8.8.8.8
tracert -h 15 192.168.1.1
```

**Linux/macOS (traceroute)**:
```bash
traceroute [options] destination

Common Options:
-n           Do not resolve IP addresses to hostnames
-m max_ttl   Maximum TTL (default: 30)
-w timeout   Timeout in seconds (default: 5)
-q nqueries  Number of probe packets per hop (default: 3)
-I           Use ICMP Echo Request instead of UDP
-T           Use TCP SYN packets
-p port      Base destination port (default: 33434)
-4           Force IPv4
-6           Force IPv6

Examples:
traceroute google.com
traceroute -n 8.8.8.8
traceroute -I -m 20 192.168.1.1
traceroute -T -p 80 example.com
```

### Interpreting traceroute Output

**Successful traceroute (Windows)**:
```
C:\> tracert 8.8.8.8

Tracing route to dns.google [8.8.8.8]
over a maximum of 30 hops:

  1    <1 ms    <1 ms    <1 ms  192.168.1.1
  2     8 ms     7 ms     9 ms  10.50.1.1
  3    12 ms    11 ms    13 ms  72.14.215.85
  4    15 ms    14 ms    16 ms  108.170.252.1
  5    14 ms    15 ms    14 ms  216.239.49.113
  6    15 ms    14 ms    16 ms  dns.google [8.8.8.8]

Trace complete.
```

**Analysis**:
- **Hop 1** (192.168.1.1): Local gateway, <1ms latency (excellent)
- **Hop 2** (10.50.1.1): ISP router, 7-9ms latency (good)
- **Hops 3-5**: Internet backbone routers, 11-16ms (normal)
- **Hop 6**: Destination reached in 14-16ms
- **Three columns**: Three probe packets sent per hop
- **Total hops**: 6 (typical for Internet destination)

**Successful traceroute (Linux)**:
```
$ traceroute -n 8.8.8.8
traceroute to 8.8.8.8 (8.8.8.8), 30 hops max, 60 byte packets
 1  192.168.1.1  0.482 ms  0.651 ms  0.823 ms
 2  10.50.1.1  7.123 ms  8.456 ms  9.234 ms
 3  72.14.215.85  11.567 ms  12.345 ms  13.012 ms
 4  108.170.252.1  14.234 ms  15.678 ms  16.123 ms
 5  216.239.49.113  14.890 ms  15.234 ms  14.567 ms
 6  8.8.8.8  14.123 ms  15.890 ms  16.234 ms
```

**Analysis**:
- Similar output to Windows version
- `-n` option prevents DNS lookups (faster execution)
- **60 byte packets**: 40 bytes headers + 20 bytes data

### Common traceroute Issues

**Timeout Indicators**:
```
C:\> tracert 203.0.113.50

Tracing route to 203.0.113.50 over a maximum of 30 hops

  1    <1 ms    <1 ms    <1 ms  192.168.1.1
  2     8 ms     7 ms     9 ms  10.50.1.1
  3     *        *        *     Request timed out.
  4    25 ms    26 ms    24 ms  198.51.100.1
  5     *        *        *     Request timed out.
  6    45 ms    44 ms    46 ms  203.0.113.50

Trace complete.
```

**Analysis**:
- **Asterisks (*)**: Indicate timeout for that hop
- **Not necessarily a problem**: Some routers don't respond to traceroute probes
- **Destination reached**: Final hop responded, so path is working
- **Security policy**: Many routers configured not to respond to ICMP Time Exceeded

**Routing Loop**:
```
C:\> tracert 10.5.8.100

  1    <1 ms    <1 ms    <1 ms  192.168.1.1
  2     2 ms     1 ms     2 ms  10.0.1.1
  3     3 ms     3 ms     4 ms  10.0.2.1
  4     4 ms     5 ms     4 ms  10.0.1.1
  5     5 ms     6 ms     5 ms  10.0.2.1
  6     6 ms     7 ms     6 ms  10.0.1.1
  7     7 ms     8 ms     7 ms  10.0.2.1
```

**Indicators**:
- Same routers appearing multiple times in sequence
- **10.0.1.1** and **10.0.2.1** alternating repeatedly
- TTL eventually expires (hop 30) without reaching destination
- **Resolution**: Check routing tables on both routers for conflicting routes

**High Latency Hop**:
```
  1    <1 ms    <1 ms    <1 ms  192.168.1.1
  2   150 ms   148 ms   152 ms  10.50.1.1
  3    15 ms    14 ms    16 ms  72.14.215.85
  4    16 ms    15 ms    17 ms  8.8.8.8
```

**Analysis**:
- **Hop 2**: Extremely high latency (150ms)
- **Hop 3**: Latency drops back to normal (15ms)
- **Not cumulative**: Each hop shows absolute time from source, not incremental
- **Interpretation**: Hop 2 router is slow or deprioritizes ICMP
- **Real problem**: If subsequent hops also show high latency

**Asymmetric Routing**:
```
Forward path:  A → B → C → D → Destination
Return path:   Destination → X → Y → Z → A
```
- traceroute only shows forward path
- Return packets may take different route
- Can cause confusion in troubleshooting

---

## ipconfig and ifconfig

### What is ipconfig/ifconfig?

**ipconfig** (Windows) and **ifconfig** (Linux/macOS - deprecated, replaced by `ip`) display and manage IP configuration information for network interfaces. These tools are essential for verifying IP addresses, subnet masks, default gateways, and DNS servers.

**Primary Functions**:
- Display IP address, subnet mask, and gateway
- Release and renew DHCP leases
- Flush DNS cache
- Display MAC addresses
- Show DHCP server information

### ipconfig (Windows)

**Command Syntax**:
```cmd
ipconfig [options]

Common Options:
/all         Display full configuration information
/release     Release DHCP lease
/renew       Renew DHCP lease
/flushdns    Flush DNS resolver cache
/registerdns Register DNS names
/displaydns  Display DNS cache contents

Examples:
ipconfig
ipconfig /all
ipconfig /release
ipconfig /renew
ipconfig /flushdns
```

**Basic ipconfig Output**:
```
C:\> ipconfig

Windows IP Configuration

Ethernet adapter Local Area Connection:

   Connection-specific DNS Suffix  . : example.com
   Link-local IPv6 Address . . . . . : fe80::a1b2:c3d4:e5f6:7890%11
   IPv4 Address. . . . . . . . . . . : 192.168.1.100
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
```

**Analysis**:
- **DNS Suffix**: Domain name appended to unqualified hostnames
- **Link-local IPv6**: Auto-configured local IPv6 address (fe80::/10)
- **IPv4 Address**: 192.168.1.100 (RFC 1918 private address)
- **Subnet Mask**: 255.255.255.0 (/24 network)
- **Default Gateway**: Router for non-local traffic

**ipconfig /all Output**:
```
C:\> ipconfig /all

Windows IP Configuration

   Host Name . . . . . . . . . . . . : DESKTOP-PC01
   Primary Dns Suffix  . . . . . . . : 
   Node Type . . . . . . . . . . . . : Hybrid
   IP Routing Enabled. . . . . . . . : No
   WINS Proxy Enabled. . . . . . . . : No
   DNS Suffix Search List. . . . . . : example.com

Ethernet adapter Ethernet0:

   Connection-specific DNS Suffix  . : example.com
   Description . . . . . . . . . . . : Intel(R) Ethernet Connection
   Physical Address. . . . . . . . . : 00-15-5D-AB-CD-EF
   DHCP Enabled. . . . . . . . . . . : Yes
   Autoconfiguration Enabled . . . . : Yes
   Link-local IPv6 Address . . . . . : fe80::a1b2:c3d4:e5f6:7890%11(Preferred) 
   IPv4 Address. . . . . . . . . . . : 192.168.1.100(Preferred) 
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Lease Obtained. . . . . . . . . . : Monday, January 15, 2024 9:30:00 AM
   Lease Expires . . . . . . . . . . : Tuesday, January 16, 2024 9:30:00 AM
   Default Gateway . . . . . . . . . : 192.168.1.1
   DHCP Server . . . . . . . . . . . : 192.168.1.1
   DHCPv6 IAID . . . . . . . . . . . : 184549821
   DHCPv6 Client DUID. . . . . . . . : 00-01-00-01-2B-3C-4D-5E-00-15-5D-AB-CD-EF
   DNS Servers . . . . . . . . . . . : 8.8.8.8
                                       8.8.4.4
   NetBIOS over Tcpip. . . . . . . . : Enabled
```

**Key Information**:
- **Host Name**: Computer name on network
- **Physical Address**: MAC address (00-15-5D-AB-CD-EF)
- **DHCP Enabled**: Yes (dynamic IP assignment)
- **Lease Obtained/Expires**: DHCP lease lifetime
- **DHCP Server**: 192.168.1.1 (assigned this IP)
- **DNS Servers**: Google Public DNS (8.8.8.8, 8.8.4.4)

### DHCP Lease Management

**Releasing DHCP Lease**:
```cmd
C:\> ipconfig /release

Windows IP Configuration

Ethernet adapter Local Area Connection:

   Connection-specific DNS Suffix  . : 
   Link-local IPv6 Address . . . . . : fe80::a1b2:c3d4:e5f6:7890%11
   Default Gateway . . . . . . . . . : 
```

**Result**:
- IPv4 address removed
- Only link-local IPv6 address remains
- Network connectivity lost (except IPv6 link-local)

**Renewing DHCP Lease**:
```cmd
C:\> ipconfig /renew

Windows IP Configuration

Ethernet adapter Local Area Connection:

   Connection-specific DNS Suffix  . : example.com
   Link-local IPv6 Address . . . . . : fe80::a1b2:c3d4:e5f6:7890%11
   IPv4 Address. . . . . . . . . . . : 192.168.1.100
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
```

**Result**:
- New DHCP DISCOVER/OFFER/REQUEST/ACK exchange
- New or same IP address assigned
- Useful for troubleshooting DHCP issues

**Flushing DNS Cache**:
```cmd
C:\> ipconfig /flushdns

Windows IP Configuration

Successfully flushed the DNS Resolver Cache.
```

**When to Use**:
- DNS records have changed but cached entries persist
- Website not resolving correctly
- After VPN connection/disconnection
- DNS poisoning suspected

### ifconfig (Linux/macOS - Legacy)

**NOTE**: `ifconfig` is deprecated on modern Linux systems. Use `ip addr show` or `ip link show` instead. However, `ifconfig` is still available on macOS and older Linux systems.

**Command Syntax**:
```bash
ifconfig [interface] [options]

Common Options:
ifconfig             Display all interfaces
ifconfig eth0        Display specific interface
ifconfig eth0 up     Enable interface
ifconfig eth0 down   Disable interface

Examples:
ifconfig
ifconfig eth0
sudo ifconfig eth0 192.168.1.50 netmask 255.255.255.0
```

**ifconfig Output (Linux)**:
```
$ ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a1b2:c3d4:e5f6:7890  prefixlen 64  scopeid 0x20<link>
        ether 00:15:5d:ab:cd:ef  txqueuelen 1000  (Ethernet)
        RX packets 123456  bytes 89123456 (85.0 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 98765  bytes 67890123 (64.7 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 5678  bytes 1234567 (1.1 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 5678  bytes 1234567 (1.1 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

**Analysis**:
- **eth0**: Physical Ethernet interface
  - **flags**: UP (interface enabled), BROADCAST, RUNNING, MULTICAST
  - **mtu 1500**: Maximum Transmission Unit
  - **inet 192.168.1.100**: IPv4 address
  - **inet6 fe80::...**: Link-local IPv6 address
  - **ether 00:15:5d:ab:cd:ef**: MAC address
  - **RX/TX packets**: Receive/transmit statistics

- **lo**: Loopback interface
  - **inet 127.0.0.1**: IPv4 loopback
  - **inet6 ::1**: IPv6 loopback

### Modern Alternative: ip Command (Linux)

**Display IP Addresses**:
```bash
$ ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 00:15:5d:ab:cd:ef brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0
       valid_lft 86385sec preferred_lft 86385sec
    inet6 fe80::a1b2:c3d4:e5f6:7890/64 scope link 
       valid_lft forever preferred_lft forever
```

**Key Information**:
- **192.168.1.100/24**: IP address with CIDR notation
- **brd 192.168.1.255**: Broadcast address
- **scope global**: Globally routable address
- **dynamic**: Assigned by DHCP
- **valid_lft 86385sec**: Lease expires in 86385 seconds (~24 hours)

**Display Routing Table**:
```bash
$ ip route show
default via 192.168.1.1 dev eth0 proto dhcp metric 100 
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100 metric 100
```

**Analysis**:
- **default via 192.168.1.1**: Default gateway
- **192.168.1.0/24**: Directly connected network

---

## pathping and mtr

### pathping (Windows)

**pathping** combines features of **ping** and **tracert**, providing comprehensive path analysis over an extended period.

**Command Syntax**:
```cmd
pathping [options] destination

Common Options:
-n           Do not resolve addresses to hostnames
-h maximum   Maximum hops (default: 30)
-p period    Wait period milliseconds between pings (default: 250)
-q queries   Number of queries per hop (default: 100)

Example:
pathping -n 8.8.8.8
```

**pathping Output**:
```
C:\> pathping 8.8.8.8

Tracing route to dns.google [8.8.8.8]
over a maximum of 30 hops:
  0  DESKTOP-PC01 [192.168.1.100]
  1  192.168.1.1 
  2  10.50.1.1 
  3  72.14.215.85 
  4  dns.google [8.8.8.8] 

Computing statistics for 100 seconds...
            Source to Here   This Node/Link
Hop  RTT    Lost/Sent = Pct  Lost/Sent = Pct  Address
  0                                           DESKTOP-PC01 [192.168.1.100]
                                0/ 100 =  0%   |
  1    0ms     0/ 100 =  0%     0/ 100 =  0%  192.168.1.1 
                                0/ 100 =  0%   |
  2    8ms     0/ 100 =  0%     0/ 100 =  0%  10.50.1.1 
                                0/ 100 =  0%   |
  3   12ms     0/ 100 =  0%     0/ 100 =  0%  72.14.215.85 
                                2/ 100 =  2%   |
  4   15ms     2/ 100 =  2%     2/ 100 =  2%  dns.google [8.8.8.8]

Trace complete.
```

**Analysis**:
- **Computing statistics for 100 seconds**: Pathping sends 100 queries per hop
- **Lost/Sent = Pct**: Packet loss percentage
- **Source to Here**: Cumulative loss to this hop
- **This Node/Link**: Loss at this specific hop
- **Hop 3-4 link**: 2% packet loss detected

**Use Cases**:
- Identify intermittent packet loss
- Measure long-term latency statistics
- Diagnose congested links
- Provide evidence for ISP support tickets

### mtr (Linux/macOS)

**mtr** (My Traceroute) is a powerful alternative that combines **ping** and **traceroute** in a real-time, continuously updating display.

**Installation**:
```bash
# Ubuntu/Debian
sudo apt install mtr

# Red Hat/CentOS
sudo yum install mtr

# macOS (Homebrew)
brew install mtr
```

**Command Syntax**:
```bash
mtr [options] destination

Common Options:
-r           Report mode (non-interactive, 10 cycles)
-c count     Number of pings (report mode)
-n           No DNS resolution
-b           Show both hostnames and IP addresses
-4           IPv4 only
-6           IPv6 only

Examples:
mtr google.com
mtr -r -c 100 8.8.8.8
mtr -n 192.168.1.1
```

**mtr Interactive Output**:
```
                             My traceroute  [v0.93]
DESKTOP-PC01 (192.168.1.100)                            2024-01-15T10:30:00+0000
Keys:  Help   Display mode   Restart statistics   Order of fields   quit
                                        Packets               Pings
 Host                                 Loss%   Snt   Last   Avg  Best  Wrst StDev
 1. 192.168.1.1                        0.0%   100    0.8   0.9   0.7   1.5   0.2
 2. 10.50.1.1                          0.0%   100    8.2   8.5   7.8  11.2   0.8
 3. 72.14.215.85                       0.0%   100   12.4  12.8  11.5  15.3   1.1
 4. 108.170.252.1                      0.0%   100   15.1  15.6  14.2  18.9   1.3
 5. dns.google                         0.0%   100   15.3  15.8  14.5  19.2   1.4
```

**Analysis**:
- **Loss%**: Packet loss percentage (0.0% = perfect)
- **Snt**: Packets sent (100)
- **Last**: Most recent RTT
- **Avg**: Average RTT
- **Best/Wrst**: Minimum/maximum RTT
- **StDev**: Standard deviation (jitter measure)

**mtr Report Mode**:
```bash
$ mtr -r -c 50 8.8.8.8
Start: 2024-01-15T10:30:00+0000
HOST: DESKTOP-PC01              Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- 192.168.1.1              0.0%    50    0.8   0.9   0.7   1.3   0.1
  2.|-- 10.50.1.1                0.0%    50    8.1   8.4   7.9  10.8   0.7
  3.|-- 72.14.215.85             0.0%    50   12.3  12.7  11.6  14.9   0.9
  4.|-- 108.170.252.1            2.0%    50   15.2  15.5  14.3  18.6   1.2
  5.|-- dns.google               2.0%    50   15.4  15.7  14.6  18.9   1.3
```

**Use Cases**:
- Real-time network monitoring
- Identifying packet loss locations
- Measuring latency variations
- Detecting network congestion

---

## Troubleshooting with Command-Line Tools

### Scenario 1: No Internet Connectivity

**Problem**: User reports "no Internet access."

**Diagnostic Steps**:

1. **Test local network stack**:
   ```cmd
   ping 127.0.0.1
   ```
   - **Success**: TCP/IP stack is working
   - **Failure**: Reinstall network drivers

2. **Test local network interface**:
   ```cmd
   ping [your own IP address]
   ```
   - **Success**: Network adapter is functioning
   - **Failure**: Check physical connection

3. **Check IP configuration**:
   ```cmd
   ipconfig /all
   ```
   - Look for:
     - Valid IPv4 address (not 169.254.x.x)
     - Correct subnet mask
     - Default gateway present
     - DNS servers configured

4. **Test gateway connectivity**:
   ```cmd
   ping [default gateway IP]
   ```
   - **Success**: Local network OK
   - **Failure**: Check Layer 1/2 (cable, switch, VLAN, ARP)

5. **Test external connectivity**:
   ```cmd
   ping 8.8.8.8
   ```
   - **Success**: Internet connectivity works, DNS issue likely
   - **Failure**: Routing or firewall problem

6. **Test DNS resolution**:
   ```cmd
   ping google.com
   ```
   - **Success**: Everything is working
   - **Failure**: DNS problem (covered in next lesson)

**Resolution Actions**:
- **169.254.x.x address** (APIPA): Release/renew DHCP lease
  ```cmd
  ipconfig /release
  ipconfig /renew
  ```
- **No gateway**: Check DHCP server configuration
- **Can't reach gateway**: Check cable, switch port, VLAN
- **Gateway reachable but no Internet**: Check router configuration, ISP link

### Scenario 2: Intermittent Connectivity

**Problem**: Connection drops randomly.

**Diagnostic Steps**:

1. **Continuous ping to gateway**:
   ```cmd
   ping -t 192.168.1.1
   ```
   - Monitor for timeouts or high latency spikes
   - Press **Ctrl+C** to stop and view statistics

2. **Check for packet loss**:
   ```cmd
   ping -n 1000 192.168.1.1
   ```
   - Send 1000 packets
   - Acceptable: 0-1% packet loss
   - Problem: >1% packet loss

3. **Long-term monitoring with pathping**:
   ```cmd
   pathping 8.8.8.8
   ```
   - Identifies which hop has packet loss
   - Runs for ~5 minutes (100 queries per hop)

**Possible Causes**:
- **Physical layer**: Bad cable, loose connection, failing switch port
- **Wireless**: Interference, weak signal, channel congestion
- **Network congestion**: Bandwidth saturation
- **Hardware failure**: Failing network adapter or router

**Resolution Actions**:
- Replace cables
- Change wireless channel
- Upgrade bandwidth
- Replace failing hardware

### Scenario 3: Slow Network Performance

**Problem**: Network is extremely slow.

**Diagnostic Steps**:

1. **Measure latency to gateway**:
   ```cmd
   ping 192.168.1.1
   ```
   - **Normal**: <1ms on wired LAN, <10ms on WiFi
   - **Problem**: >10ms on wired, >50ms on WiFi

2. **Measure latency to Internet destination**:
   ```cmd
   ping 8.8.8.8
   ```
   - **Normal**: 10-50ms depending on distance
   - **Problem**: >100ms consistently

3. **Identify slow hop**:
   ```cmd
   tracert 8.8.8.8
   ```
   - Look for sudden latency jump at specific hop
   - Note: Some routers deprioritize ICMP; compare with subsequent hops

4. **Use mtr for detailed analysis** (Linux/macOS):
   ```bash
   mtr -r -c 100 8.8.8.8
   ```
   - Identifies specific hop with high latency or packet loss
   - StDev (standard deviation) indicates jitter

**Possible Causes**:
- **High latency at local gateway**: Local network congestion, overloaded router
- **High latency at ISP hop**: ISP network congestion, routing issue
- **High packet loss**: Network congestion, failing hardware
- **High jitter** (StDev): Inconsistent routing, wireless interference

**Resolution Actions**:
- Reduce local network traffic
- Contact ISP if problem is in their network
- Replace failing hardware
- Implement QoS (Quality of Service)

### Scenario 4: Can Reach IP but Not Hostname

**Problem**: `ping 8.8.8.8` works, but `ping google.com` fails.

**Diagnostic Steps**:

1. **Verify IP connectivity**:
   ```cmd
   ping 8.8.8.8
   ```
   - **Success**: Network layer is working

2. **Test DNS resolution**:
   ```cmd
   ping google.com
   ```
   - **Failure**: DNS resolution not working

3. **Check DNS configuration**:
   ```cmd
   ipconfig /all
   ```
   - Verify DNS servers are configured
   - Example: DNS Servers . . . . . . . : 8.8.8.8

4. **Flush DNS cache**:
   ```cmd
   ipconfig /flushdns
   ```
   - Clears stale DNS entries

5. **Test again**:
   ```cmd
   ping google.com
   ```

**Resolution**: DNS issue will be covered in detail in the next lesson (Network Utilities).

---

## Best Practices for Command-Line Troubleshooting

### 1. Use Systematic Approach
- Start at Layer 1 (physical) and work up
- Test localhost → local IP → gateway → external IP → hostname
- Document results at each step

### 2. Understand Tool Limitations
- Some routers block ICMP (ping/traceroute may fail even when connectivity works)
- Firewalls may filter specific protocols
- traceroute shows forward path only (return path may differ)

### 3. Consider Security Policies
- Many networks block ICMP Echo Request/Reply for security
- Alternative: Use TCP-based tools (e.g., `traceroute -T`)
- Some routers don't respond to ICMP Time Exceeded

### 4. Interpret Results Carefully
- Single timeout doesn't indicate problem (could be transient)
- High latency at one hop doesn't mean problem if subsequent hops are normal
- Packet loss at intermediate hop OK if destination has 0% loss

### 5. Use Appropriate Tools for Situation
- **Quick test**: ping
- **Path discovery**: traceroute/tracert
- **Long-term monitoring**: pathping/mtr
- **IP configuration**: ipconfig/ifconfig

### 6. Document Findings
- Save command output for reference
- Note timestamps
- Record baseline metrics for comparison
- Keep change log for troubleshooting steps taken

---

## Summary

In this lesson, we explored essential command-line troubleshooting tools:

- **ping**: Tests connectivity and measures latency using ICMP Echo Request/Reply
  - Verify network connectivity
  - Measure round-trip time (RTT)
  - Detect packet loss
  - Systematic approach: localhost → local IP → gateway → external IP → hostname

- **traceroute/tracert**: Maps the path packets take to reach a destination
  - Uses incrementing TTL values
  - Identifies each router hop
  - Measures latency at each hop
  - Useful for pinpointing routing problems and slow links

- **ipconfig/ifconfig**: Displays and manages IP configuration
  - View IP address, subnet mask, gateway, DNS servers
  - Release and renew DHCP leases
  - Flush DNS cache
  - Modern Linux alternative: `ip addr` and `ip route`

- **pathping/mtr**: Combines ping and traceroute for long-term analysis
  - Identifies intermittent packet loss
  - Measures latency statistics over time
  - Provides comprehensive path quality assessment

These tools form the foundation of network troubleshooting. Master them to quickly diagnose and resolve connectivity issues. In the next lesson, we'll explore additional network utilities like **nslookup**, **dig**, **netstat**, and **arp** for more advanced diagnostics.

---

## Additional References

- **RFC 792**: Internet Control Message Protocol (ICMP) - https://tools.ietf.org/html/rfc792
- **RFC 1122**: Requirements for Internet Hosts - Communication Layers - https://tools.ietf.org/html/rfc1122
- **RFC 2151**: A Primer On Internet and TCP/IP Tools and Utilities - https://tools.ietf.org/html/rfc2151
- **CompTIA Network+ N10-008 Exam Objectives**: Domain 5.3 - Use the appropriate tool
