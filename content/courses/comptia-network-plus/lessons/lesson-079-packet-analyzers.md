---
id: "lesson-079"
title: "Packet Analyzers: Wireshark and tcpdump"
chapterId: "chapter-09"
order: 79
duration: 28
objectives:
  - "Use Wireshark to capture and analyze network traffic"
  - "Apply capture and display filters to isolate specific traffic"
  - "Use tcpdump for command-line packet capture on Linux/Unix systems"
  - "Interpret packet details to troubleshoot network issues"
---

# Packet Analyzers: Wireshark and tcpdump

## Introduction

Packet analyzers (also called protocol analyzers or packet sniffers) are essential tools for deep network troubleshooting, security analysis, and performance optimization. These tools capture network traffic at the packet level, allowing you to inspect every detail of network communication including headers, payloads, and protocol interactions.

In this lesson, we'll explore the two most widely used packet analyzers: **Wireshark** (GUI-based, available on Windows, Linux, and macOS) and **tcpdump** (command-line tool for Linux/Unix). You'll learn how to capture traffic, apply filters to isolate specific packets, and interpret packet details to diagnose network problems.

**WARNING**: Packet capture tools can capture sensitive information including passwords, private data, and confidential communications. Always obtain proper authorization before capturing network traffic, and handle captured data securely according to your organization's security policies.

---

## Introduction to Wireshark

### What is Wireshark?

**Wireshark** is a free, open-source packet analyzer with a graphical user interface. It's the industry-standard tool for network protocol analysis, used by network administrators, security professionals, developers, and educators worldwide.

**Key Features**:
- Capture live network traffic from any network interface
- Read and analyze capture files from various formats (pcap, pcapng, etc.)
- Deep inspection of hundreds of protocols
- Powerful display and capture filters
- Color-coding for easy identification of traffic types
- Follow TCP streams to see complete conversations
- Export data in multiple formats
- Cross-platform (Windows, Linux, macOS)

**Installation**:
- **Windows/macOS**: Download from https://www.wireshark.org/
- **Ubuntu/Debian**: `sudo apt install wireshark`
- **Red Hat/CentOS**: `sudo yum install wireshark`

**Running Wireshark**:
- **Windows**: Start → Wireshark (Run as Administrator for full access)
- **Linux**: `sudo wireshark` or configure permissions for non-root capture
- **macOS**: Open Wireshark application

### Wireshark Interface Overview

**Main Window Components**:

1. **Menu Bar**: File, Edit, View, Go, Capture, Analyze, Statistics, etc.
2. **Main Toolbar**: Quick access to common actions (Start/Stop capture, Open file, Save, etc.)
3. **Filter Toolbar**: Display filter input box
4. **Packet List Pane**: Summary of captured packets (one line per packet)
5. **Packet Details Pane**: Hierarchical protocol breakdown of selected packet
6. **Packet Bytes Pane**: Hexadecimal and ASCII representation of packet data
7. **Status Bar**: Capture statistics, filter status, profile information

**Color Coding (Default)**:
- **Light Purple**: TCP traffic
- **Light Blue**: UDP traffic
- **Black**: Packets with errors
- **Light Green**: HTTP traffic
- **Light Yellow**: Windows-specific traffic
- **Dark Gray**: TCP retransmissions

---

## Capturing Traffic with Wireshark

### Starting a Capture

**Step 1: Select Network Interface**

1. Launch Wireshark
2. **Capture → Options** or double-click interface on welcome screen
3. Select interface to capture from:
   - **Ethernet adapter**: Wired network capture
   - **Wi-Fi adapter**: Wireless network capture (may not capture all traffic in managed mode)
   - **Loopback** (lo): Local traffic only (127.0.0.1)
   - **Any**: Capture from all interfaces (Linux only)

**Step 2: Configure Capture Options** (Optional)

- **Promiscuous mode**: Capture all packets on network segment (not just packets destined for your computer)
  - Enable for network-wide analysis
  - Requires proper network tap or hub (switches limit visibility)
  - May not work on all adapters/networks

- **Capture filter**: Filter traffic during capture (reduces file size)
  - Uses BPF (Berkeley Packet Filter) syntax
  - Example: `tcp port 80` (capture only HTTP traffic)
  - **WARNING**: Capture filters cannot be changed during capture; use display filters for flexibility

- **File options**: Save captured packets to file automatically
  - Create multiple files based on size or time intervals
  - Useful for long-term monitoring

**Step 3: Start Capture**

- Click **Start** button (shark fin icon) or press **Ctrl+E**
- Packets appear in real-time in Packet List pane
- Capture runs until you stop it manually

**Step 4: Stop Capture**

- Click **Stop** button (red square) or press **Ctrl+E**
- All captured packets remain in memory for analysis

### Basic Capture Workflow Example

**Scenario**: Capture web browsing traffic to google.com

1. **Start Wireshark** with appropriate permissions
2. **Select interface** (e.g., Ethernet or Wi-Fi)
3. **Apply capture filter** (optional): `host google.com`
4. Click **Start**
5. **Open web browser** and navigate to google.com
6. **Stop capture** after page loads
7. **Analyze captured packets**

### Saving and Opening Capture Files

**Save Capture**:
- **File → Save As** or **Ctrl+Shift+S**
- **Format options**:
  - **pcapng** (default): Wireshark native format, supports multiple interfaces and metadata
  - **pcap**: Legacy format, widely compatible with other tools
  - **Other formats**: NetMon, snoop, etc.

**Open Capture**:
- **File → Open** or **Ctrl+O**
- Wireshark can open captures from tcpdump, tshark, and many other packet capture tools

**Merge Captures**:
- **File → Merge**: Combine multiple capture files chronologically or by file order

---

## Wireshark Display Filters

### What are Display Filters?

**Display filters** determine which packets are visible in the Packet List pane. Unlike capture filters, display filters:
- Can be changed at any time without restarting capture
- Applied to already-captured packets (no data lost)
- Use Wireshark-specific syntax (different from capture filter BPF syntax)
- More flexible and user-friendly than capture filters

**Recommendation**: Use display filters instead of capture filters unless you need to reduce capture file size for very high-traffic environments.

### Basic Display Filter Syntax

**Filter by Protocol**:
```
http          Show only HTTP traffic
tcp           Show only TCP traffic
udp           Show only UDP traffic
dns           Show only DNS traffic
icmp          Show only ICMP traffic
arp           Show only ARP traffic
ssh           Show only SSH traffic
```

**Filter by IP Address**:
```
ip.addr == 192.168.1.100           Traffic to/from this IP
ip.src == 192.168.1.100            Traffic from this IP (source)
ip.dst == 192.168.1.100            Traffic to this IP (destination)
ip.addr == 192.168.1.0/24          Traffic to/from this subnet
```

**Filter by Port**:
```
tcp.port == 80                     TCP traffic on port 80
tcp.srcport == 80                  TCP traffic from port 80
tcp.dstport == 80                  TCP traffic to port 80
udp.port == 53                     UDP traffic on port 53 (DNS)
```

**Filter by MAC Address**:
```
eth.addr == 00:11:22:33:44:55      Traffic to/from this MAC
eth.src == 00:11:22:33:44:55       Traffic from this MAC
eth.dst == 00:11:22:33:44:55       Traffic to this MAC
```

### Logical Operators

**AND** (&&):
```
ip.addr == 192.168.1.100 && tcp.port == 443
```
- Shows traffic to/from 192.168.1.100 on TCP port 443 only

**OR** (||):
```
tcp.port == 80 || tcp.port == 443
```
- Shows traffic on port 80 OR port 443

**NOT** (!):
```
!arp
```
- Shows all traffic EXCEPT ARP

**Parentheses** for grouping:
```
(ip.addr == 192.168.1.100 || ip.addr == 192.168.1.101) && tcp.port == 22
```
- Shows SSH traffic to/from either 192.168.1.100 or 192.168.1.101

### Advanced Display Filters

**TCP Flags**:
```
tcp.flags.syn == 1                 TCP SYN packets (connection initiation)
tcp.flags.ack == 1                 TCP ACK packets
tcp.flags.rst == 1                 TCP RST packets (connection reset)
tcp.flags.fin == 1                 TCP FIN packets (connection termination)
tcp.flags.syn == 1 && tcp.flags.ack == 0   TCP SYN only (initial SYN, not SYN-ACK)
tcp.flags.syn == 1 && tcp.flags.ack == 1   TCP SYN-ACK
```

**HTTP Filters**:
```
http.request                       HTTP requests only
http.response                      HTTP responses only
http.request.method == "GET"       HTTP GET requests
http.request.method == "POST"      HTTP POST requests
http.response.code == 200          HTTP 200 OK responses
http.response.code >= 400          HTTP errors (4xx and 5xx)
http.host == "www.example.com"     Requests to specific host
http.request.uri contains "login"  URIs containing "login"
```

**DNS Filters**:
```
dns.qry.name == "google.com"       DNS queries for google.com
dns.flags.response == 1            DNS responses only
dns.qry.type == 1                  DNS A record queries
dns.qry.type == 28                 DNS AAAA record queries (IPv6)
```

**Filter by Packet Length**:
```
frame.len > 1000                   Packets larger than 1000 bytes
frame.len < 64                     Small packets (runt frames)
```

**Filter by Time** (relative to capture start):
```
frame.time_relative > 10           Packets captured after 10 seconds
```

**TCP Stream**:
```
tcp.stream eq 5                    All packets in TCP stream #5
```

**Error Conditions**:
```
tcp.analysis.retransmission        TCP retransmissions
tcp.analysis.duplicate_ack         Duplicate ACKs (possible packet loss)
tcp.analysis.zero_window           Zero window (receiver buffer full)
tcp.analysis.lost_segment          Lost TCP segments
icmp.type == 3                     ICMP Destination Unreachable
```

### Filter Expressions

**Contains**:
```
http.request.uri contains "password"   URI contains "password"
frame contains "confidential"          Packet contains string "confidential"
```

**Matches** (regular expression):
```
http.host matches ".*\.google\.com"    Host ends with .google.com
```

**In Range**:
```
ip.addr == 192.168.1.0/24              IP in subnet range
tcp.port >= 1024 && tcp.port <= 65535  Ports in range
```

### Using Display Filter Toolbar

**Apply Filter**:
1. Type filter expression in filter toolbar
2. Press **Enter** or click **Apply** arrow
3. Green background: Valid syntax
4. Red background: Invalid syntax
5. Yellow background: Warning or deprecated syntax

**Filter Autocomplete**:
- Start typing filter name
- Wireshark suggests matching fields
- Press **Tab** to autocomplete

**Filter History**:
- Drop-down arrow shows recently used filters
- Bookmark frequently used filters: **+** button

**Clear Filter**:
- Click **X** button to remove filter and show all packets

### Filter Bookmarks

**Save Filter**:
1. Enter filter expression
2. Click **+** (bookmark) button
3. Name the filter (e.g., "HTTP Errors")
4. Click **OK**

**Access Saved Filters**:
- Click bookmark button drop-down
- Select saved filter from list
- **Manage Display Filters**: Edit, organize, and delete saved filters

---

## Analyzing Packets in Wireshark

### Packet List Pane

**Columns** (default):
- **No.**: Packet number (relative to capture start)
- **Time**: Timestamp (various formats available)
- **Source**: Source IP address
- **Destination**: Destination IP address
- **Protocol**: Highest-level protocol detected
- **Length**: Total packet length in bytes
- **Info**: Summary information about packet

**Customizing Columns**:
- **Right-click column header** → Column Preferences
- Add/remove/reorder columns
- Change time display format: **View → Time Display Format**
  - Seconds since capture start (default)
  - Absolute time (date and time)
  - Seconds since previous packet

**Sorting Packets**:
- Click column header to sort by that column
- Click again to reverse sort order

**Color Coding**:
- **View → Coloring Rules**: Customize color assignments
- Create custom rules based on display filters
- Higher priority rules override lower priority

### Packet Details Pane

**Hierarchical Protocol View**:

```
Frame 1: 74 bytes on wire (592 bits), 74 bytes captured (592 bits)
Ethernet II, Src: 00:11:22:33:44:55, Dst: aa:bb:cc:dd:ee:ff
Internet Protocol Version 4, Src: 192.168.1.100, Dst: 142.250.72.142
Transmission Control Protocol, Src Port: 49876, Dst Port: 443, Seq: 1, Ack: 1, Len: 0
```

**Expanding Layers**:
- Click **▶** to expand protocol layer
- View all header fields and values
- Right-click field → **Apply as Filter** to create display filter
- Right-click field → **Copy → Value** to copy field value

**Frame Layer**:
- Physical frame information
- Capture time, frame length, protocols encapsulated

**Ethernet Layer** (Layer 2):
- Source and destination MAC addresses
- EtherType (0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP)

**IP Layer** (Layer 3):
- Source and destination IP addresses
- TTL (Time to Live)
- Protocol (6 = TCP, 17 = UDP, 1 = ICMP)
- Header checksum
- Flags and fragmentation information

**TCP Layer** (Layer 4):
- Source and destination ports
- Sequence and acknowledgment numbers
- Flags (SYN, ACK, PSH, FIN, RST, URG)
- Window size
- Checksum
- Options (MSS, Window Scale, Timestamps, etc.)

**Application Layer**:
- HTTP, DNS, SSH, etc.
- Protocol-specific fields and data

### Packet Bytes Pane

**Hexadecimal and ASCII View**:
```
0000   aa bb cc dd ee ff 00 11 22 33 44 55 08 00 45 00   .........."3DU..E.
0010   00 3c 12 34 40 00 40 06 ab cd c0 a8 01 64 8e fa   .<.4@.@......d..
0020   48 8e c2 d4 01 bb 12 34 56 78 9a bc de f0 50 18   H......4Vx....P.
0030   00 fa 12 34 00 00 47 45 54 20 2f 20 48 54 54 50   ...4..GET / HTTP
```

**Understanding Bytes**:
- **Left column**: Byte offset in hexadecimal
- **Middle columns**: Hexadecimal representation (2 hex digits = 1 byte)
- **Right column**: ASCII representation (. = non-printable character)
- **Highlighted bytes**: Correspond to selected field in Packet Details pane

**Use Cases**:
- Inspect raw packet data
- Identify payload contents
- Debug protocol implementations
- Examine malformed packets

### Following TCP Streams

**Follow TCP Stream**:
1. Right-click any TCP packet
2. Select **Follow → TCP Stream**
3. New window opens showing entire conversation

**TCP Stream Window**:
- **Red text**: Data sent from client to server
- **Blue text**: Data sent from server to client
- Complete bidirectional conversation reconstructed
- Useful for viewing:
  - HTTP requests and responses
  - FTP commands
  - SMTP email transmission
  - Telnet sessions
  - Any TCP-based protocol

**Stream Selection**:
- Drop-down: Select different TCP streams
- **Find**: Search for text within stream
- **Save As**: Export stream data to file

**Example: HTTP Request/Response**:
```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html

HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<!DOCTYPE html>
<html>
<head><title>Example</title></head>
<body><h1>Hello World</h1></body>
</html>
```

---

## Capture Filters in Wireshark

### When to Use Capture Filters

**Use Capture Filters When**:
- High-traffic environment (need to reduce capture file size)
- Limited disk space or memory
- Interested only in specific traffic (e.g., monitoring single host)
- Long-term monitoring with minimal storage

**Avoid Capture Filters When**:
- Unsure exactly what traffic you need to analyze
- Want flexibility to analyze different aspects of captured data
- Troubleshooting complex issues (might filter out relevant packets)

### Capture Filter Syntax (BPF)

**Berkeley Packet Filter (BPF)** syntax is different from Wireshark display filters.

**Filter by Host**:
```
host 192.168.1.100                 Traffic to/from 192.168.1.100
src host 192.168.1.100             Traffic from 192.168.1.100
dst host 192.168.1.100             Traffic to 192.168.1.100
```

**Filter by Network**:
```
net 192.168.1.0/24                 Traffic to/from subnet
net 192.168.1.0 mask 255.255.255.0 Alternative subnet syntax
```

**Filter by Protocol**:
```
tcp                                TCP traffic only
udp                                UDP traffic only
icmp                               ICMP traffic only
arp                                ARP traffic only
ip                                 IPv4 traffic only
ip6                                IPv6 traffic only
```

**Filter by Port**:
```
port 80                            Traffic on port 80 (TCP or UDP)
tcp port 80                        TCP traffic on port 80
udp port 53                        UDP traffic on port 53 (DNS)
src port 80                        Traffic from port 80
dst port 443                       Traffic to port 443
portrange 1024-65535               Ports in range
```

**Filter by MAC Address**:
```
ether host 00:11:22:33:44:55       Traffic to/from MAC address
ether src 00:11:22:33:44:55        Traffic from MAC address
ether dst 00:11:22:33:44:55        Traffic to MAC address
```

**Logical Operators**:
```
host 192.168.1.100 and port 80     Host 192.168.1.100 AND port 80
host 192.168.1.100 or host 192.168.1.101   Either host
not port 22                        Exclude SSH traffic
tcp and not port 22                TCP traffic except SSH
```

**Parentheses for Grouping**:
```
(host 192.168.1.100 or host 192.168.1.101) and tcp port 80
```

### Common Capture Filter Examples

**Capture HTTP and HTTPS**:
```
tcp port 80 or tcp port 443
```

**Capture DNS**:
```
udp port 53
```

**Capture all traffic except SSH**:
```
not tcp port 22
```

**Capture traffic to/from specific host**:
```
host 192.168.1.100
```

**Capture broadcast and multicast**:
```
broadcast or multicast
```

**Capture only IPv4**:
```
ip
```

**Capture VLAN traffic**:
```
vlan
```

**Capture packets larger than 1000 bytes**:
```
greater 1000
```

**Capture TCP SYN packets** (connection attempts):
```
tcp[tcpflags] & tcp-syn != 0 and tcp[tcpflags] & tcp-ack == 0
```

---

## Introduction to tcpdump

### What is tcpdump?

**tcpdump** is a powerful command-line packet capture tool for Linux/Unix systems. It's lightweight, fast, and ideal for:
- Remote systems without GUI (servers accessed via SSH)
- Automated packet capture scripts
- Low-overhead capture on resource-constrained systems
- Quick diagnostics without launching GUI tool

**Installation**:
```bash
# Ubuntu/Debian
sudo apt install tcpdump

# Red Hat/CentOS
sudo yum install tcpdump

# macOS (pre-installed)
tcpdump
```

**Running tcpdump** (requires root/sudo):
```bash
sudo tcpdump
```

### Basic tcpdump Usage

**Capture on Default Interface**:
```bash
$ sudo tcpdump
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes
10:30:15.123456 IP 192.168.1.100.49876 > 142.250.72.142.443: Flags [S], seq 123456789, win 64240, options [mss 1460], length 0
10:30:15.145678 IP 142.250.72.142.443 > 192.168.1.100.49876: Flags [S.], seq 987654321, ack 123456790, win 65535, options [mss 1460], length 0
```

**Output Explanation**:
- **10:30:15.123456**: Timestamp
- **IP**: Protocol (IP, ARP, IP6, etc.)
- **192.168.1.100.49876**: Source IP and port
- **>**: Direction arrow
- **142.250.72.142.443**: Destination IP and port
- **Flags [S]**: TCP flags (S=SYN, S.=SYN-ACK, .=ACK, P=PSH, F=FIN, R=RST)
- **seq, ack, win**: TCP sequence number, acknowledgment, window size
- **length 0**: Payload length

### tcpdump Command Options

**Common Options**:
```bash
tcpdump [options] [filter]

-i interface     Capture on specific interface (eth0, wlan0, any)
-n               Don't resolve hostnames (faster)
-nn              Don't resolve hostnames or port names
-v, -vv, -vvv    Verbose output (more v = more detail)
-c count         Capture only count packets, then exit
-s snaplen       Capture snaplen bytes per packet (0 = unlimited)
-w file          Write raw packets to file
-r file          Read packets from file
-A               Print packet payload in ASCII
-X               Print packet payload in hex and ASCII
-q               Quiet/quick output (less detail)
-t               Don't print timestamp
-e               Print link-level (Ethernet) headers

Examples:
sudo tcpdump -i eth0 -n
sudo tcpdump -i any -nn -c 100
sudo tcpdump -i wlan0 -vv
sudo tcpdump -w capture.pcap
sudo tcpdump -r capture.pcap
```

### tcpdump Capture Filters

**Filter Syntax** (same BPF syntax as Wireshark capture filters):

**Filter by Host**:
```bash
sudo tcpdump host 192.168.1.100
sudo tcpdump src host 192.168.1.100
sudo tcpdump dst host 192.168.1.100
```

**Filter by Network**:
```bash
sudo tcpdump net 192.168.1.0/24
```

**Filter by Protocol**:
```bash
sudo tcpdump tcp
sudo tcpdump udp
sudo tcpdump icmp
sudo tcpdump arp
```

**Filter by Port**:
```bash
sudo tcpdump port 80
sudo tcpdump tcp port 443
sudo tcpdump udp port 53
sudo tcpdump src port 80
sudo tcpdump dst port 22
sudo tcpdump portrange 1024-65535
```

**Logical Operators**:
```bash
sudo tcpdump host 192.168.1.100 and port 80
sudo tcpdump host 192.168.1.100 or host 192.168.1.101
sudo tcpdump not port 22
sudo tcpdump tcp and not port 22
```

### Practical tcpdump Examples

**Capture HTTP Traffic**:
```bash
sudo tcpdump -i eth0 -nn 'tcp port 80'
```

**Capture HTTPS Traffic with Payload**:
```bash
sudo tcpdump -i eth0 -nn -A 'tcp port 443'
```
- Note: HTTPS payload is encrypted, so `-A` won't show readable content

**Capture DNS Queries**:
```bash
sudo tcpdump -i any -nn 'udp port 53'
```

**Capture ICMP (Ping)**:
```bash
sudo tcpdump -i eth0 -nn icmp
```

**Capture Traffic to/from Specific Host**:
```bash
sudo tcpdump -i eth0 -nn host 8.8.8.8
```

**Capture First 100 Packets**:
```bash
sudo tcpdump -i eth0 -nn -c 100
```

**Capture and Save to File**:
```bash
sudo tcpdump -i eth0 -nn -w capture.pcap
```
- **Ctrl+C** to stop capture
- File can be opened in Wireshark for GUI analysis

**Read from Capture File**:
```bash
sudo tcpdump -nn -r capture.pcap
```

**Capture with Verbose Output**:
```bash
sudo tcpdump -i eth0 -nn -vv
```

**Capture TCP SYN Packets Only**:
```bash
sudo tcpdump -i eth0 -nn 'tcp[tcpflags] & tcp-syn != 0 and tcp[tcpflags] & tcp-ack == 0'
```

**Capture All Traffic Except SSH**:
```bash
sudo tcpdump -i eth0 -nn 'not port 22'
```

**Capture Packets Larger than 1000 Bytes**:
```bash
sudo tcpdump -i eth0 -nn 'greater 1000'
```

### Saving and Rotating Capture Files

**Capture with File Size Limit**:
```bash
sudo tcpdump -i eth0 -nn -w capture.pcap -C 100
```
- `-C 100`: Create new file every 100 MB
- Files named: capture.pcap0, capture.pcap1, etc.

**Capture with Time Limit**:
```bash
sudo tcpdump -i eth0 -nn -w capture.pcap -G 3600 -W 24
```
- `-G 3600`: Rotate file every 3600 seconds (1 hour)
- `-W 24`: Keep only 24 files (24 hours of hourly captures)
- Files named with timestamp: capture.pcap.1234567890

**Capture with Packet Count Limit**:
```bash
sudo tcpdump -i eth0 -nn -w capture.pcap -W 5 -C 50
```
- Create max 5 files, each up to 50 MB
- Oldest file deleted when creating 6th file

---

## Troubleshooting with Packet Analyzers

### Scenario 1: Web Server Not Responding

**Problem**: Users report website not loading.

**Wireshark Analysis**:

1. **Start capture** on client machine
2. **Attempt to access** website in browser
3. **Stop capture** after timeout
4. **Apply filter**: `http or dns`
5. **Analyze results**:

**Possible Findings**:

**DNS Resolution Failure**:
```
DNS query: www.example.com
DNS response: Server failure (or no response)
```
- **Diagnosis**: DNS server problem
- **Resolution**: Check DNS server, try alternate DNS

**TCP Connection Failure**:
```
Client → Server: [SYN] seq=X
(no SYN-ACK response)
Client → Server: [SYN] seq=X (retransmission)
```
- **Diagnosis**: Server not responding or firewall blocking
- **Resolution**: Check server status, firewall rules, routing

**TCP Connection Reset**:
```
Client → Server: [SYN] seq=X
Server → Client: [RST, ACK]
```
- **Diagnosis**: Server actively refusing connection (service not running or firewall rejecting)
- **Resolution**: Start web server service, check firewall

**HTTP 4xx/5xx Errors**:
```
HTTP/1.1 404 Not Found
HTTP/1.1 500 Internal Server Error
```
- **Diagnosis**: Web server responding but application error
- **Resolution**: Check web server logs, fix application issue

### Scenario 2: Slow Network Performance

**Problem**: File transfers are very slow.

**Wireshark Analysis**:

1. **Start capture**
2. **Initiate file transfer**
3. **Capture for 30-60 seconds**
4. **Apply filter**: `tcp.analysis.retransmission or tcp.analysis.duplicate_ack`
5. **Analyze**:

**High Retransmission Rate**:
- **Indicates**: Packet loss
- **Causes**: Network congestion, faulty cable, failing hardware
- **Resolution**: Check physical layer, reduce network load

**TCP Window Full** (Zero Window):
- **Filter**: `tcp.analysis.zero_window`
- **Indicates**: Receiver cannot process data fast enough
- **Causes**: Slow application, insufficient CPU/memory
- **Resolution**: Optimize application, upgrade hardware

**Large Round-Trip Time (RTT)**:
- **View**: Statistics → TCP Stream Graphs → Round Trip Time
- **High RTT**: Indicates latency problem
- **Causes**: Distance, routing issues, congestion
- **Resolution**: Optimize routing, upgrade bandwidth

### Scenario 3: DNS Issues

**Problem**: Inconsistent name resolution.

**tcpdump Analysis**:

```bash
sudo tcpdump -i eth0 -nn udp port 53 -vv
```

**Capture DNS Queries**:

**Normal DNS Resolution**:
```
DNS query: www.example.com A?
DNS response: www.example.com A 93.184.216.34 (TTL 300)
```

**DNS Server Not Responding**:
```
DNS query: www.example.com A?
(no response, retries...)
DNS query: www.example.com A? (retry)
```
- **Diagnosis**: DNS server unreachable or overloaded
- **Resolution**: Check DNS server, use alternate DNS

**NXDOMAIN (Domain Doesn't Exist)**:
```
DNS query: invalid-domain.example.com A?
DNS response: NXDOMAIN (name error)
```
- **Diagnosis**: Domain name doesn't exist or typo
- **Resolution**: Correct domain name

**Wrong IP Returned**:
```
DNS query: internal.company.com A?
DNS response: internal.company.com A 203.0.113.50
```
- Expected internal IP (10.x.x.x), got public IP
- **Diagnosis**: Using external DNS for internal domain
- **Resolution**: Configure correct internal DNS server

### Scenario 4: Security Incident Investigation

**Problem**: Suspicious network activity detected.

**Wireshark Analysis**:

**Port Scanning Detection**:
- **Filter**: `tcp.flags.syn == 1 and tcp.flags.ack == 0`
- **Look for**: Many SYN packets from single source to multiple destination ports
- **Indicates**: Port scan in progress

**ARP Spoofing Detection**:
- **Filter**: `arp`
- **Look for**: Multiple ARP replies claiming same IP with different MACs
- **Indicates**: ARP spoofing/poisoning attack

**Malware Command & Control (C2) Communication**:
- **Filter**: `http or dns`
- **Look for**:
  - Unusual DNS queries (random-looking domains)
  - HTTP traffic to suspicious IPs
  - Beaconing (periodic connections at regular intervals)

**Data Exfiltration**:
- **Statistics → Conversations → TCP**
- **Look for**: Large outbound data transfers to external IPs
- **Indicates**: Potential data theft

---

## Best Practices for Packet Analysis

### 1. Obtain Authorization
- Always get written permission before capturing traffic
- Respect privacy and confidentiality
- Follow company security policies

### 2. Use Appropriate Capture Scope
- Capture only what you need
- Use filters to limit capture size
- Consider privacy implications

### 3. Secure Captured Data
- Encrypt capture files when stored
- Delete captures after analysis
- Limit access to authorized personnel
- Never share captures containing sensitive data

### 4. Use Display Filters Effectively
- Start broad, narrow down with filters
- Save commonly used filters as bookmarks
- Combine filters with logical operators

### 5. Understand Protocol Behavior
- Know normal traffic patterns
- Recognize common anomalies
- Study protocol specifications (RFCs)

### 6. Correlate with Other Data
- Compare with logs (firewall, server, application)
- Check network monitoring tools
- Consider timeline of events

### 7. Document Findings
- Take screenshots of relevant packets
- Export specific packets/streams
- Write detailed analysis notes
- Include timestamps and packet numbers

---

## Summary

In this lesson, we explored packet analyzers for deep network troubleshooting:

**Wireshark** (GUI-based packet analyzer):
- Industry-standard tool for protocol analysis
- Capture live traffic or analyze saved captures
- **Display filters**: Flexible, can change during analysis
  - Protocol filters: `http`, `tcp`, `dns`
  - IP filters: `ip.addr == x.x.x.x`
  - Port filters: `tcp.port == 80`
  - Logical operators: `&&`, `||`, `!`
- **Capture filters** (BPF syntax): Reduce capture size
- **Packet Details Pane**: Hierarchical protocol breakdown
- **Follow TCP Stream**: View complete conversations
- **Color coding**: Quick identification of traffic types

**tcpdump** (Command-line packet capture):
- Lightweight tool for Linux/Unix systems
- Ideal for remote servers and automation
- Same BPF filter syntax as Wireshark capture filters
- Save to pcap format for Wireshark analysis
- Examples:
  - `sudo tcpdump -i eth0 -nn port 80`
  - `sudo tcpdump -w capture.pcap`
  - `sudo tcpdump -r capture.pcap`

**Common Troubleshooting Scenarios**:
- Web server connectivity: DNS, TCP connection, HTTP errors
- Performance issues: Retransmissions, zero window, high RTT
- DNS problems: No response, wrong IP, NXDOMAIN
- Security incidents: Port scans, ARP spoofing, C2 traffic

**Best Practices**:
- Obtain authorization before capturing
- Use display filters for flexibility
- Secure captured data
- Document findings thoroughly

Packet analyzers are powerful diagnostic tools. Combined with other network utilities, they enable you to troubleshoot even the most complex network issues. Practice with these tools in lab environments to build proficiency before using them in production networks.

---

## Additional References

- **Wireshark Official Website**: https://www.wireshark.org/
- **Wireshark User Guide**: https://www.wireshark.org/docs/wsug_html_chunked/
- **tcpdump Manual**: https://www.tcpdump.org/manpages/tcpdump.1.html
- **BPF Filter Syntax**: https://biot.com/capstats/bpf.html
- **RFC 826**: Ethernet Address Resolution Protocol (ARP) - https://tools.ietf.org/html/rfc826
- **CompTIA Network+ N10-008 Exam Objectives**: Domain 5.3 - Use the appropriate tool
