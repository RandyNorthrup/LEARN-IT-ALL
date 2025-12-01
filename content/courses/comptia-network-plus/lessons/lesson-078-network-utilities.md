---
id: "lesson-078"
title: "Network Utilities: nslookup, dig, netstat, and arp"
chapterId: "chapter-09"
order: 78
duration: 26
objectives:
  - "Use nslookup and dig to troubleshoot DNS resolution issues"
  - "Analyze netstat output to identify network connections and listening ports"
  - "Use arp to view and manage the ARP cache"
  - "Apply network utilities to diagnose common network problems"
---

# Network Utilities: nslookup, dig, netstat, and arp

## Introduction

Building on the foundation of command-line troubleshooting tools (ping, traceroute, ipconfig), this lesson explores advanced network utilities that provide deeper insights into network operations. These tools help diagnose DNS problems, analyze active connections, inspect routing tables, and troubleshoot Layer 2 address resolution issues.

We'll cover four critical utilities: **nslookup** and **dig** for DNS troubleshooting, **netstat** for connection analysis, and **arp** for address resolution diagnostics. Mastering these tools enables you to quickly identify and resolve complex network issues that basic connectivity tests cannot detect.

---

## DNS Troubleshooting with nslookup

### What is nslookup?

**nslookup** (Name Server Lookup) is a network utility for querying DNS servers to obtain domain name or IP address mapping information. It's available on Windows, Linux, and macOS, making it a universal DNS troubleshooting tool.

**Primary Functions**:
- Resolve hostnames to IP addresses (forward lookup)
- Resolve IP addresses to hostnames (reverse lookup)
- Query specific DNS record types (A, AAAA, MX, NS, TXT, etc.)
- Test specific DNS servers
- Diagnose DNS resolution problems

### nslookup Command Syntax

**Basic Usage**:
```bash
nslookup [hostname] [dns-server]

Examples:
nslookup google.com
nslookup 8.8.8.8
nslookup google.com 1.1.1.1
```

**Interactive Mode**:
```bash
nslookup
> set type=MX
> gmail.com
> exit
```

### Forward DNS Lookup

**Query Hostname to Get IP Address**:
```
C:\> nslookup google.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
Name:    google.com
Addresses:  2607:f8b0:4004:c07::71
          2607:f8b0:4004:c07::8a
          2607:f8b0:4004:c07::8b
          2607:f8b0:4004:c07::64
          142.250.72.142
```

**Analysis**:
- **Server: dns.google (8.8.8.8)**: DNS server that responded to the query
- **Non-authoritative answer**: Response came from DNS cache, not authoritative server
- **IPv6 addresses** (2607:f8b0:...): AAAA records
- **IPv4 address** (142.250.72.142): A record
- **Multiple addresses**: Load balancing across multiple servers

**Authoritative Answer**:
```
C:\> nslookup
> set type=NS
> google.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
google.com      nameserver = ns1.google.com
google.com      nameserver = ns2.google.com
google.com      nameserver = ns3.google.com
google.com      nameserver = ns4.google.com

> server ns1.google.com
Default Server:  ns1.google.com
Address:  216.239.32.10

> set type=A
> google.com
Server:  ns1.google.com
Address:  216.239.32.10

Name:    google.com
Address:  142.250.72.142
```

**Analysis**:
- Queried authoritative name server (ns1.google.com) directly
- Result is authoritative (no "non-authoritative answer" message)
- Confirms DNS record is correct at source

### Reverse DNS Lookup

**Query IP Address to Get Hostname**:
```
C:\> nslookup 8.8.8.8
Server:  dns.google
Address:  8.8.8.8

Name:    dns.google
Address:  8.8.8.8
```

**Analysis**:
- IP address 8.8.8.8 resolves to **dns.google**
- Uses PTR (Pointer) record in reverse DNS zone (8.8.8.8.in-addr.arpa)

**Reverse Lookup Failure**:
```
C:\> nslookup 192.168.1.100
Server:  dns.google
Address:  8.8.8.8

*** dns.google can't find 192.168.1.100: Non-existent domain
```

**Analysis**:
- Private IP addresses (RFC 1918) typically don't have public reverse DNS records
- Expected behavior for internal networks

### Querying Specific DNS Record Types

**A Record (IPv4 Address)**:
```
C:\> nslookup -type=A www.example.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
Name:    www.example.com
Address:  93.184.216.34
```

**AAAA Record (IPv6 Address)**:
```
C:\> nslookup -type=AAAA www.example.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
Name:    www.example.com
Address:  2606:2800:220:1:248:1893:25c8:1946
```

**MX Record (Mail Exchange)**:
```
C:\> nslookup -type=MX gmail.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
gmail.com       MX preference = 5, mail exchanger = gmail-smtp-in.l.google.com
gmail.com       MX preference = 10, mail exchanger = alt1.gmail-smtp-in.l.google.com
gmail.com       MX preference = 20, mail exchanger = alt2.gmail-smtp-in.l.google.com
gmail.com       MX preference = 30, mail exchanger = alt3.gmail-smtp-in.l.google.com
gmail.com       MX preference = 40, mail exchanger = alt4.gmail-smtp-in.l.google.com
```

**Analysis**:
- **MX preference**: Priority (lower = higher priority)
- **Mail exchanger**: Hostname of mail server
- Primary mail server: gmail-smtp-in.l.google.com (preference 5)
- Backup servers: alt1, alt2, alt3, alt4 (preferences 10-40)

**NS Record (Name Server)**:
```
C:\> nslookup -type=NS example.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
example.com     nameserver = a.iana-servers.net
example.com     nameserver = b.iana-servers.net
```

**CNAME Record (Canonical Name - Alias)**:
```
C:\> nslookup -type=CNAME www.microsoft.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
www.microsoft.com       canonical name = www.microsoft.com-c-3.edgekey.net
www.microsoft.com-c-3.edgekey.net       canonical name = www.microsoft.com-c-3.edgekey.net.globalredir.akadns.net
www.microsoft.com-c-3.edgekey.net.globalredir.akadns.net       canonical name = e13678.dscb.akamaiedge.net

Name:    e13678.dscb.akamaiedge.net
Addresses:  2600:1408:c400:589::356e
          2600:1408:c400:59a::356e
          23.40.248.47
```

**Analysis**:
- **CNAME chain**: www.microsoft.com → edgekey.net → akadns.net → akamaiedge.net
- CDN (Content Delivery Network) structure for performance optimization
- Final resolution to Akamai CDN IP addresses

**TXT Record (Text)**:
```
C:\> nslookup -type=TXT google.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
google.com      text = "v=spf1 include:_spf.google.com ~all"
google.com      text = "facebook-domain-verification=22rm551cu4k0ab0bxsw536tlds4h95"
google.com      text = "docusign=05958488-4752-4ef2-95eb-aa7ba8a3bd0e"
google.com      text = "globalsign-smime-dv=CDYX+XFHUw2wml6/Gb8+59BsH31KzUr6c1l2BPvqKX8="
```

**Analysis**:
- **SPF record** (Sender Policy Framework): Email authentication
- **Domain verification**: Ownership verification for various services

**SOA Record (Start of Authority)**:
```
C:\> nslookup -type=SOA example.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
example.com
        primary name server = a.iana-servers.net
        responsible mail addr = noc.dns.icann.org
        serial  = 2024011500
        refresh = 7200 (2 hours)
        retry   = 3600 (1 hour)
        expire  = 1209600 (14 days)
        default TTL = 86400 (1 day)
```

**Analysis**:
- **Primary name server**: Authoritative DNS server
- **Serial number**: Version of zone file (format: YYYYMMDDnn)
- **Refresh**: How often secondary servers check for updates
- **Retry**: Retry interval if refresh fails
- **Expire**: When secondary stops serving zone if primary unreachable
- **TTL**: Default time-to-live for records

### Using Specific DNS Server

**Query Using Custom DNS Server**:
```
C:\> nslookup google.com 1.1.1.1
Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    google.com
Addresses:  2607:f8b0:4004:c07::8b
          2607:f8b0:4004:c07::71
          2607:f8b0:4004:c07::64
          2607:f8b0:4004:c07::66
          142.250.72.142
```

**Analysis**:
- Query sent to **1.1.1.1** (Cloudflare DNS) instead of default DNS server
- Useful for testing if DNS server is cause of resolution issues

**Compare Multiple DNS Servers**:
```cmd
nslookup example.com 8.8.8.8
nslookup example.com 1.1.1.1
nslookup example.com 208.67.222.222
```

**Purpose**:
- Verify consistency across different DNS servers
- Identify DNS propagation delays
- Test if specific DNS server has stale cache

### nslookup Interactive Mode

**Enter Interactive Mode**:
```
C:\> nslookup
Default Server:  dns.google
Address:  8.8.8.8

> 
```

**Common Interactive Commands**:
```
> set type=A           Set query type to A records
> set type=MX          Set query type to MX records
> set type=ANY         Query all record types
> server 1.1.1.1       Change DNS server
> set debug            Enable debug mode
> set nodebug          Disable debug mode
> google.com           Query domain
> exit                 Exit interactive mode
```

**Interactive Mode Example**:
```
C:\> nslookup
> set type=MX
> gmail.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
gmail.com       MX preference = 5, mail exchanger = gmail-smtp-in.l.google.com
gmail.com       MX preference = 10, mail exchanger = alt1.gmail-smtp-in.l.google.com

> set type=A
> gmail-smtp-in.l.google.com
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
Name:    gmail-smtp-in.l.google.com
Addresses:  2607:f8b0:4023:c0b::1a
          142.250.115.26

> exit
```

### nslookup Troubleshooting Scenarios

**Scenario 1: DNS Resolution Failure**

```
C:\> nslookup internal.company.local
Server:  dns.google
Address:  8.8.8.8

*** dns.google can't find internal.company.local: Non-existent domain
```

**Diagnosis**:
- Using public DNS server (8.8.8.8) to query internal hostname
- Public DNS has no knowledge of private domain

**Resolution**:
- Configure correct internal DNS server in network settings
- Check DNS suffix search list includes "company.local"

**Scenario 2: DNS Server Not Responding**

```
C:\> nslookup google.com
DNS request timed out.
    timeout was 2 seconds.
*** Request to UnKnown timed-out
```

**Diagnosis**:
- Configured DNS server is unreachable or not responding
- Network connectivity issue or DNS server down

**Resolution**:
- Test connectivity to DNS server: `ping 8.8.8.8`
- Try alternate DNS server: `nslookup google.com 1.1.1.1`
- Check firewall rules (DNS uses UDP port 53)

**Scenario 3: Split-Horizon DNS**

```
# Internal query
C:\> nslookup internal.company.com
Server:  dc1.company.local
Address:  10.0.1.10

Name:    internal.company.com
Address:  10.0.5.100

# External query
C:\> nslookup internal.company.com 8.8.8.8
Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
Name:    internal.company.com
Address:  203.0.113.50
```

**Analysis**:
- **Internal DNS** returns private IP (10.0.5.100)
- **External DNS** returns public IP (203.0.113.50)
- **Split-horizon DNS**: Different answers based on query source
- Used for internal vs. external access to same hostname

---

## Advanced DNS Troubleshooting with dig

### What is dig?

**dig** (Domain Information Groper) is a powerful DNS lookup utility primarily used on Linux/Unix systems, though also available for Windows. It provides more detailed output than nslookup and is preferred by many network administrators for DNS troubleshooting.

**Advantages over nslookup**:
- More detailed output with DNS response sections
- Better for scripting (consistent output format)
- Shows query time and server statistics
- Supports advanced query options (DNSSEC, EDNS)

**Installation**:
```bash
# Ubuntu/Debian
sudo apt install dnsutils

# Red Hat/CentOS
sudo yum install bind-utils

# macOS (pre-installed)
dig

# Windows (with BIND tools)
Download from ISC BIND website
```

### dig Command Syntax

**Basic Usage**:
```bash
dig [options] [hostname] [record-type] [@dns-server]

Examples:
dig google.com
dig google.com A
dig google.com MX @8.8.8.8
dig +short google.com
```

### Basic dig Query

**Query A Record**:
```
$ dig google.com

; <<>> DiG 9.18.12-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             300     IN      A       142.250.72.142

;; Query time: 15 msec
;; SERVER: 8.8.8.8#53(8.8.8.8) (UDP)
;; WHEN: Mon Jan 15 10:30:00 PST 2024
;; MSG SIZE  rcvd: 55
```

**Output Sections Explained**:

1. **Header**:
   - **opcode: QUERY**: Standard query
   - **status: NOERROR**: Query successful
   - **id: 12345**: Query identifier
   - **flags**:
     - **qr** (Query Response): This is a response
     - **rd** (Recursion Desired): Client requested recursion
     - **ra** (Recursion Available): Server supports recursion

2. **QUESTION SECTION**:
   - **google.com. IN A**: Query for A record of google.com

3. **ANSWER SECTION**:
   - **google.com.**: Fully qualified domain name (trailing dot)
   - **300**: TTL (Time To Live) in seconds
   - **IN**: Internet class
   - **A**: Record type (IPv4 address)
   - **142.250.72.142**: IP address

4. **Statistics**:
   - **Query time: 15 msec**: Response time from DNS server
   - **SERVER: 8.8.8.8#53**: DNS server and port used
   - **MSG SIZE rcvd: 55**: Response packet size in bytes

### Short Output Format

**+short Option**:
```bash
$ dig +short google.com
142.250.72.142

$ dig +short google.com AAAA
2607:f8b0:4004:c07::71
2607:f8b0:4004:c07::64
2607:f8b0:4004:c07::8b
2607:f8b0:4004:c07::8a
```

**Use Cases**:
- Quick lookups
- Scripting (extract IP addresses)
- Automated monitoring

### Querying Specific DNS Record Types

**MX Records**:
```bash
$ dig gmail.com MX

;; ANSWER SECTION:
gmail.com.              3600    IN      MX      5 gmail-smtp-in.l.google.com.
gmail.com.              3600    IN      MX      10 alt1.gmail-smtp-in.l.google.com.
gmail.com.              3600    IN      MX      20 alt2.gmail-smtp-in.l.google.com.
gmail.com.              3600    IN      MX      30 alt3.gmail-smtp-in.l.google.com.
gmail.com.              3600    IN      MX      40 alt4.gmail-smtp-in.l.google.com.
```

**NS Records**:
```bash
$ dig example.com NS

;; ANSWER SECTION:
example.com.            86400   IN      NS      a.iana-servers.net.
example.com.            86400   IN      NS      b.iana-servers.net.
```

**TXT Records**:
```bash
$ dig google.com TXT

;; ANSWER SECTION:
google.com.             3600    IN      TXT     "v=spf1 include:_spf.google.com ~all"
google.com.             3600    IN      TXT     "facebook-domain-verification=22rm551cu4k0ab0bxsw536tlds4h95"
```

**SOA Record**:
```bash
$ dig example.com SOA

;; ANSWER SECTION:
example.com.            86400   IN      SOA     a.iana-servers.net. noc.dns.icann.org. 2024011500 7200 3600 1209600 86400
```

**ANY Records (All Types)**:
```bash
$ dig example.com ANY

;; ANSWER SECTION:
example.com.            86400   IN      A       93.184.216.34
example.com.            86400   IN      AAAA    2606:2800:220:1:248:1893:25c8:1946
example.com.            86400   IN      MX      0 .
example.com.            86400   IN      NS      a.iana-servers.net.
example.com.            86400   IN      NS      b.iana-servers.net.
example.com.            86400   IN      SOA     a.iana-servers.net. noc.dns.icann.org. 2024011500 7200 3600 1209600 86400
example.com.            86400   IN      TXT     "v=spf1 -all"
```

### Reverse DNS Lookup

**PTR Query**:
```bash
$ dig -x 8.8.8.8

;; QUESTION SECTION:
;8.8.8.8.in-addr.arpa.          IN      PTR

;; ANSWER SECTION:
8.8.8.8.in-addr.arpa.   86400   IN      PTR     dns.google.
```

**Analysis**:
- **-x option**: Automatically constructs reverse lookup query
- **in-addr.arpa zone**: Reverse DNS zone for IPv4
- **PTR record**: Maps IP to hostname

### Using Specific DNS Server

**Query Specific Server**:
```bash
$ dig @1.1.1.1 google.com

;; Query time: 12 msec
;; SERVER: 1.1.1.1#53(1.1.1.1) (UDP)
```

**Compare Multiple DNS Servers**:
```bash
dig @8.8.8.8 example.com
dig @1.1.1.1 example.com
dig @208.67.222.222 example.com
```

### Tracing DNS Resolution Path

**+trace Option**:
```bash
$ dig +trace google.com

; <<>> DiG 9.18.12-Ubuntu <<>> +trace google.com
;; global options: +cmd
.                       518400  IN      NS      a.root-servers.net.
.                       518400  IN      NS      b.root-servers.net.
[... more root servers ...]
;; Received 262 bytes from 8.8.8.8#53(8.8.8.8) in 15 ms

com.                    172800  IN      NS      a.gtld-servers.net.
com.                    172800  IN      NS      b.gtld-servers.net.
[... more TLD servers ...]
;; Received 839 bytes from 198.41.0.4#53(a.root-servers.net) in 45 ms

google.com.             172800  IN      NS      ns1.google.com.
google.com.             172800  IN      NS      ns2.google.com.
google.com.             172800  IN      NS      ns3.google.com.
google.com.             172800  IN      NS      ns4.google.com.
;; Received 760 bytes from 192.5.6.30#53(a.gtld-servers.net) in 28 ms

google.com.             300     IN      A       142.250.72.142
;; Received 55 bytes from 216.239.32.10#53(ns1.google.com) in 18 ms
```

**Analysis**:
1. **Root servers** (.) queried first
2. **TLD servers** (.com) queried second
3. **Authoritative servers** (ns1.google.com) queried last
4. Shows complete DNS resolution hierarchy

**Use Cases**:
- Verify DNS delegation is correct
- Diagnose DNS propagation issues
- Understand DNS resolution process

### Advanced dig Options

**Query with No Recursion** (+norecurs):
```bash
$ dig +norecurs google.com @8.8.8.8
```
- Server returns referral to authoritative servers instead of resolving

**Show Only Answer** (+noall +answer):
```bash
$ dig +noall +answer google.com
google.com.             300     IN      A       142.250.72.142
```

**Query with TCP** (+tcp):
```bash
$ dig +tcp google.com
```
- Force TCP instead of UDP (useful for large responses or testing)

**Set Query Timeout** (+time=5):
```bash
$ dig +time=5 google.com
```
- Set timeout to 5 seconds (default is 5)

### dig Troubleshooting Scenarios

**Scenario 1: DNS Propagation Check**

```bash
# Query authoritative server directly
$ dig @ns1.example.com example.com

# Query public DNS servers
$ dig @8.8.8.8 example.com
$ dig @1.1.1.1 example.com

# Compare TTL values
# If TTL is low and results match, propagation is complete
# If TTL is high and results differ, propagation still ongoing
```

**Scenario 2: DNSSEC Validation**

```bash
$ dig +dnssec example.com

;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1
```
- **ad flag** (Authenticated Data): DNSSEC validation successful

**Scenario 3: DNS Cache Poisoning Detection**

```bash
# Query multiple public DNS servers
$ dig @8.8.8.8 suspicious-domain.com
$ dig @1.1.1.1 suspicious-domain.com
$ dig @208.67.222.222 suspicious-domain.com

# Compare results
# If different IP addresses returned, possible cache poisoning
```

---

## Connection Analysis with netstat

### What is netstat?

**netstat** (Network Statistics) displays active network connections, listening ports, routing tables, and network interface statistics. It's available on Windows, Linux, and macOS, though Linux now recommends `ss` (socket statistics) as a faster replacement.

**Primary Functions**:
- Display active TCP and UDP connections
- Show listening ports
- Display routing table
- Show network interface statistics
- Identify processes using network connections

### netstat Command Syntax

**Windows**:
```cmd
netstat [options]

Common Options:
-a           Display all connections and listening ports
-n           Display addresses and port numbers numerically
-o           Display owning process ID (PID)
-b           Display executable involved (requires admin)
-p protocol  Show connections for specified protocol (TCP, UDP, TCPv6, UDPv6)
-r           Display routing table
-s           Display statistics by protocol
-e           Display Ethernet statistics

Examples:
netstat -an
netstat -ano
netstat -b
netstat -r
```

**Linux/macOS**:
```bash
netstat [options]

Common Options:
-a           Display all sockets (listening and non-listening)
-n           Show numerical addresses
-t           Display TCP connections
-u           Display UDP connections
-l           Show only listening sockets
-p           Show process ID and program name
-r           Display routing table
-s           Display statistics by protocol
-i           Display network interfaces

Examples:
netstat -an
netstat -tulnp
netstat -r
netstat -i
```

### Display All Connections

**Windows**:
```
C:\> netstat -an

Active Connections

  Proto  Local Address          Foreign Address        State
  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING
  TCP    0.0.0.0:443            0.0.0.0:0              LISTENING
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING
  TCP    0.0.0.0:3389           0.0.0.0:0              LISTENING
  TCP    192.168.1.100:49876    142.250.72.142:443     ESTABLISHED
  TCP    192.168.1.100:49877    151.101.1.69:443       ESTABLISHED
  TCP    192.168.1.100:49878    20.189.173.10:443      ESTABLISHED
  UDP    0.0.0.0:53             *:*                    
  UDP    0.0.0.0:67             *:*                    
  UDP    0.0.0.0:123            *:*                    
  UDP    192.168.1.100:137      *:*                    
  UDP    192.168.1.100:138      *:*                    
```

**Analysis**:
- **Proto**: Protocol (TCP or UDP)
- **Local Address**: Local IP and port (0.0.0.0 = all interfaces)
- **Foreign Address**: Remote IP and port (0.0.0.0:0 = not connected)
- **State**: Connection state (LISTENING, ESTABLISHED, CLOSE_WAIT, TIME_WAIT, etc.)

**Connection States**:
- **LISTENING**: Server waiting for connections
- **ESTABLISHED**: Active connection
- **TIME_WAIT**: Connection closed, waiting for delayed packets
- **CLOSE_WAIT**: Remote end closed connection
- **SYN_SENT**: Attempting to establish connection
- **SYN_RECEIVED**: Received connection request
- **FIN_WAIT**: Connection closing

**Linux**:
```bash
$ netstat -tulnp

Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1234/sshd: /usr/sbin
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      5678/nginx: master  
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      5678/nginx: master  
tcp6       0      0 :::22                   :::*                    LISTEN      1234/sshd: /usr/sbin
tcp6       0      0 :::80                   :::*                    LISTEN      5678/nginx: master  
tcp6       0      0 :::443                  :::*                    LISTEN      5678/nginx: master  
udp        0      0 0.0.0.0:53              0.0.0.0:*                           9012/systemd-resolv
udp        0      0 0.0.0.0:123             0.0.0.0:*                           3456/chronyd        
```

**Options Explained**:
- **-t**: TCP connections
- **-u**: UDP connections
- **-l**: Listening sockets only
- **-n**: Numeric addresses (no DNS resolution)
- **-p**: Show process ID and name

### Display Connections with Process Information

**Windows (Administrator Required)**:
```
C:\> netstat -ano

Active Connections

  Proto  Local Address          Foreign Address        State           PID
  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       868
  TCP    0.0.0.0:443            0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
  TCP    0.0.0.0:3389           0.0.0.0:0              LISTENING       1084
  TCP    192.168.1.100:49876    142.250.72.142:443     ESTABLISHED     12345
  TCP    192.168.1.100:49877    151.101.1.69:443       ESTABLISHED     12345
```

**Identify Process**:
```cmd
C:\> tasklist /FI "PID eq 12345"

Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
chrome.exe                   12345 Console                    1    256,789 K
```

**Windows: Display Executable** (-b option, requires admin):
```
C:\> netstat -b

Active Connections

  Proto  Local Address          Foreign Address        State
  TCP    192.168.1.100:49876    142.250.72.142:443     ESTABLISHED
 [chrome.exe]
  TCP    192.168.1.100:49877    151.101.1.69:443       ESTABLISHED
 [chrome.exe]
```

### Display Routing Table

**Windows**:
```
C:\> netstat -r

IPv4 Route Table
===========================================================================
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
          0.0.0.0          0.0.0.0      192.168.1.1   192.168.1.100     50
        127.0.0.0        255.0.0.0         On-link         127.0.0.1    331
        127.0.0.1  255.255.255.255         On-link         127.0.0.1    331
  127.255.255.255  255.255.255.255         On-link         127.0.0.1    331
      192.168.1.0    255.255.255.0         On-link    192.168.1.100    306
    192.168.1.100  255.255.255.255         On-link    192.168.1.100    306
    192.168.1.255  255.255.255.255         On-link    192.168.1.100    306
        224.0.0.0        240.0.0.0         On-link         127.0.0.1    331
        224.0.0.0        240.0.0.0         On-link    192.168.1.100    306
  255.255.255.255  255.255.255.255         On-link         127.0.0.1    331
  255.255.255.255  255.255.255.255         On-link    192.168.1.100    306
===========================================================================
```

**Analysis**:
- **0.0.0.0/0**: Default route (all traffic goes to 192.168.1.1 gateway)
- **127.0.0.0/8**: Loopback network
- **192.168.1.0/24**: Directly connected local network
- **224.0.0.0/4**: Multicast addresses
- **Metric**: Route cost (lower is preferred)

**Linux**:
```bash
$ netstat -r

Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
default         192.168.1.1     0.0.0.0         UG        0 0          0 eth0
192.168.1.0     0.0.0.0         255.255.255.0   U         0 0          0 eth0
```

**Flags**:
- **U**: Route is up
- **G**: Use gateway
- **H**: Target is a host
- **D**: Dynamically installed by daemon or redirect
- **M**: Modified by routing daemon or redirect

### Display Network Statistics

**Windows**:
```
C:\> netstat -s

IPv4 Statistics

  Packets Received                   = 1234567
  Received Header Errors             = 0
  Received Address Errors            = 8
  Datagrams Forwarded                = 0
  Unknown Protocols Received         = 0
  Received Packets Discarded         = 15
  Received Packets Delivered         = 1234544
  Output Requests                    = 987654
  Routing Discards                   = 0
  Discarded Output Packets           = 0
  Output Packet No Route             = 0
  Reassembly Required                = 0
  Reassembly Successful              = 0
  Reassembly Failures                = 0
  Datagrams Successfully Fragmented  = 0
  Datagrams Failing Fragmentation    = 0
  Fragments Created                  = 0

TCP Statistics for IPv4

  Active Opens                        = 5678
  Passive Opens                       = 890
  Failed Connection Attempts          = 12
  Reset Connections                   = 34
  Current Connections                 = 15
  Segments Received                   = 456789
  Segments Sent                       = 567890
  Segments Retransmitted              = 123

UDP Statistics for IPv4

  Datagrams Received    = 12345
  No Ports              = 67
  Receive Errors        = 0
  Datagrams Sent        = 23456
```

**Key Metrics**:
- **Segments Retransmitted**: High value indicates network congestion or packet loss
- **Failed Connection Attempts**: High value may indicate firewall blocking or unreachable servers
- **Current Connections**: Number of active TCP connections

### Display Ethernet Statistics

**Windows**:
```
C:\> netstat -e

Interface Statistics

                           Received            Sent

Bytes                   12345678901     9876543210
Unicast packets            23456789       18765432
Non-unicast packets          123456          98765
Discards                          0              0
Errors                            0              0
Unknown protocols                 0
```

**Linux**:
```bash
$ netstat -i

Kernel Interface table
Iface      MTU    RX-OK RX-ERR RX-DRP RX-OVR    TX-OK TX-ERR TX-DRP TX-OVR Flg
eth0      1500  1234567      0      0 0        987654      0      0      0 BMRU
lo       65536   567890      0      0 0        567890      0      0      0 LRU
```

**Columns**:
- **RX-OK/TX-OK**: Successfully received/transmitted packets
- **RX-ERR/TX-ERR**: Receive/transmit errors
- **RX-DRP/TX-DRP**: Dropped packets
- **Flg**: Interface flags (B=broadcast, M=multicast, R=running, U=up, L=loopback)

### netstat Troubleshooting Scenarios

**Scenario 1: Identify Process Listening on Specific Port**

```cmd
# Windows - Find what's using port 80
C:\> netstat -ano | findstr :80
TCP    0.0.0.0:80             0.0.0.0:0              LISTENING       4

C:\> tasklist /FI "PID eq 4"
Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
System                           4 Services                   0      1,234 K
```

```bash
# Linux - Find what's using port 80
$ sudo netstat -tulnp | grep :80
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      5678/nginx: master  
```

**Scenario 2: Detect Suspicious Connections**

```cmd
# Look for unexpected outbound connections
C:\> netstat -ano | findstr ESTABLISHED

TCP    192.168.1.100:49999    185.220.101.50:443     ESTABLISHED     9876
```
- Investigate process ID 9876
- Check if remote IP is legitimate
- May indicate malware or unauthorized access

**Scenario 3: Check for Port Conflicts**

```bash
# Before starting web server
$ sudo netstat -tulnp | grep :80

# If output shows existing process on port 80, conflict exists
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1234/apache2
```

**Resolution**: Stop conflicting service or configure new service on different port

**Scenario 4: Monitor Connection Counts**

```bash
# Count established connections
$ netstat -an | grep ESTABLISHED | wc -l
45

# Count connections by state
$ netstat -an | awk '/^tcp/ {print $6}' | sort | uniq -c | sort -rn
     45 ESTABLISHED
     12 TIME_WAIT
      5 CLOSE_WAIT
      3 LISTENING
```

---

## Address Resolution with arp

### What is arp?

**arp** (Address Resolution Protocol) displays and manages the ARP cache, which maps IP addresses to MAC addresses on the local network. ARP operates at Layer 2/3 boundary and is essential for local network communication.

**Primary Functions**:
- Display ARP cache entries
- Add static ARP entries
- Delete ARP cache entries
- Troubleshoot Layer 2 connectivity issues

### How ARP Works

1. **Host A** wants to communicate with **Host B** (192.168.1.50)
2. **Host A** checks ARP cache for 192.168.1.50
3. If **not in cache**, Host A broadcasts **ARP Request**: "Who has 192.168.1.50?"
4. **Host B** responds with **ARP Reply**: "192.168.1.50 is at MAC AA:BB:CC:DD:EE:FF"
5. **Host A** adds entry to ARP cache
6. **Host A** sends frame to MAC address AA:BB:CC:DD:EE:FF

### arp Command Syntax

**Windows**:
```cmd
arp [options]

Common Options:
-a           Display all ARP cache entries
-a [ip]      Display ARP entry for specific IP
-d [ip]      Delete ARP entry
-s [ip] [mac]  Add static ARP entry

Examples:
arp -a
arp -a 192.168.1.1
arp -d 192.168.1.50
arp -s 192.168.1.100 00-11-22-33-44-55
```

**Linux**:
```bash
arp [options]

Common Options:
-a           Display all ARP cache entries
-n           Show numerical addresses (no DNS resolution)
-d [ip]      Delete ARP entry
-s [ip] [mac]  Add static ARP entry
-i [interface] Specify network interface

Examples:
arp -a
arp -n
sudo arp -d 192.168.1.50
sudo arp -s 192.168.1.100 00:11:22:33:44:55
```

### Display ARP Cache

**Windows**:
```
C:\> arp -a

Interface: 192.168.1.100 --- 0xb
  Internet Address      Physical Address      Type
  192.168.1.1           00-15-5d-01-23-45     dynamic
  192.168.1.50          00-15-5d-ab-cd-ef     dynamic
  192.168.1.100         00-15-5d-99-88-77     dynamic (this computer)
  192.168.1.255         ff-ff-ff-ff-ff-ff     static (broadcast)
  224.0.0.22            01-00-5e-00-00-16     static (multicast)
  224.0.0.251           01-00-5e-00-00-fb     static (multicast)
  224.0.0.252           01-00-5e-00-00-fc     static (multicast)
  239.255.255.250       01-00-5e-7f-ff-fa     static (multicast)
  255.255.255.255       ff-ff-ff-ff-ff-ff     static (broadcast)
```

**Analysis**:
- **Interface: 192.168.1.100 --- 0xb**: Local interface and index
- **Internet Address**: IP address
- **Physical Address**: MAC address
- **Type**: 
  - **dynamic**: Learned through ARP (timeout after ~2 minutes)
  - **static**: Manually configured or system default

**Linux**:
```bash
$ arp -a
router.local (192.168.1.1) at 00:15:5d:01:23:45 [ether] on eth0
host1.local (192.168.1.50) at 00:15:5d:ab:cd:ef [ether] on eth0
? (192.168.1.75) at 00:15:5d:11:22:33 [ether] on eth0
```

**Modern Alternative: ip neigh (Linux)**:
```bash
$ ip neigh show
192.168.1.1 dev eth0 lladdr 00:15:5d:01:23:45 REACHABLE
192.168.1.50 dev eth0 lladdr 00:15:5d:ab:cd:ef STALE
192.168.1.75 dev eth0 lladdr 00:15:5d:11:22:33 DELAY
```

**States**:
- **REACHABLE**: Entry is valid and recently confirmed
- **STALE**: Entry may be invalid, needs verification
- **DELAY**: Verification in progress
- **PERMANENT**: Static entry
- **FAILED**: Resolution failed

### Add Static ARP Entry

**Windows**:
```cmd
C:\> arp -s 192.168.1.200 00-aa-bb-cc-dd-ee

C:\> arp -a | findstr 192.168.1.200
  192.168.1.200         00-aa-bb-cc-dd-ee     static
```

**Linux**:
```bash
$ sudo arp -s 192.168.1.200 00:aa:bb:cc:dd:ee

$ arp -a | grep 192.168.1.200
? (192.168.1.200) at 00:aa:bb:cc:dd:ee [ether] PERM on eth0
```

**Use Cases**:
- Prevent ARP spoofing/poisoning
- Override incorrect dynamic ARP entries
- Ensure critical servers have permanent ARP entries

### Delete ARP Entry

**Windows**:
```cmd
C:\> arp -d 192.168.1.50

C:\> arp -a | findstr 192.168.1.50
(no output - entry deleted)
```

**Linux**:
```bash
$ sudo arp -d 192.168.1.50

$ arp -a | grep 192.168.1.50
(no output - entry deleted)
```

**When to Delete**:
- Incorrect MAC address cached
- After replacing network hardware
- Troubleshooting connectivity issues

### arp Troubleshooting Scenarios

**Scenario 1: Duplicate IP Address**

```
C:\> arp -a | findstr 192.168.1.50
  192.168.1.50          00-15-5d-ab-cd-ef     dynamic

# Later...
C:\> arp -a | findstr 192.168.1.50
  192.168.1.50          00-15-5d-11-22-33     dynamic
```

**Analysis**:
- MAC address for 192.168.1.50 changed
- Indicates **duplicate IP address** on network
- Two devices using same IP

**Resolution**:
- Identify which device should have IP
- Reconfigure other device with different IP
- Use DHCP to prevent manual IP conflicts

**Scenario 2: Can't Reach Device on Local Network**

```
C:\> ping 192.168.1.50
Request timed out.

C:\> arp -a | findstr 192.168.1.50
(no entry)
```

**Diagnosis**:
- No ARP entry means device didn't respond to ARP request
- Device is down, disconnected, or on different VLAN

**Troubleshooting Steps**:
1. Check physical connectivity (cables, switch port)
2. Verify device is powered on
3. Check VLAN configuration
4. Verify IP address is correct
5. Try from another host on same network

**Scenario 3: ARP Cache Poisoning Detection**

```
C:\> arp -a
  192.168.1.1           00-15-5d-01-23-45     dynamic
  192.168.1.50          00-15-5d-ab-cd-ef     dynamic
  192.168.1.100         00-15-5d-ab-cd-ef     dynamic  # Same MAC!
```

**Analysis**:
- **192.168.1.50** and **192.168.1.100** have same MAC address
- Indicates **ARP spoofing/poisoning** attack
- Attacker redirecting traffic for one or both IPs

**Resolution**:
- Identify malicious device by MAC address
- Isolate and remove attacker from network
- Implement **Dynamic ARP Inspection (DAI)** on switches
- Use static ARP entries for critical devices

**Scenario 4: Wrong Gateway MAC Address**

```
C:\> arp -a | findstr 192.168.1.1
  192.168.1.1           00-11-22-33-44-55     dynamic

# Actual gateway MAC is 00-15-5d-01-23-45
```

**Diagnosis**:
- ARP cache has incorrect MAC for default gateway
- Traffic being sent to wrong device
- Man-in-the-middle attack or misconfiguration

**Resolution**:
```cmd
# Delete incorrect entry
C:\> arp -d 192.168.1.1

# Force new ARP request
C:\> ping 192.168.1.1

# Verify correct MAC
C:\> arp -a | findstr 192.168.1.1
```

---

## Summary

This lesson covered advanced network utilities for deep diagnostics:

**DNS Troubleshooting Tools**:
- **nslookup**: Universal DNS query tool
  - Forward and reverse lookups
  - Query specific record types (A, AAAA, MX, NS, TXT, SOA)
  - Test different DNS servers
  - Interactive mode for complex queries

- **dig**: Advanced DNS troubleshooting (Linux/Unix preferred)
  - Detailed output with DNS response sections
  - +trace option for complete resolution path
  - +short for quick answers
  - Better for scripting and automation

**Connection and Port Analysis**:
- **netstat**: Display active connections, listening ports, routing table
  - Identify processes using network connections
  - Monitor connection states
  - Display network statistics
  - Troubleshoot port conflicts
  - Modern Linux alternative: `ss` (socket statistics)

**Layer 2 Address Resolution**:
- **arp**: Manage ARP cache (IP to MAC address mapping)
  - Display ARP entries
  - Add static entries to prevent spoofing
  - Delete stale entries
  - Detect duplicate IPs and ARP poisoning
  - Modern Linux alternative: `ip neigh`

**Key Troubleshooting Workflows**:
1. **DNS Issues**: nslookup/dig → test multiple DNS servers → flush cache
2. **Connection Problems**: netstat → identify listening ports → check firewall
3. **Layer 2 Issues**: arp → verify MAC addresses → clear cache if needed

Combined with basic tools (ping, traceroute, ipconfig), these utilities provide comprehensive network diagnostic capabilities. Master them to efficiently resolve complex network problems.

---

## Additional References

- **RFC 1035**: Domain Names - Implementation and Specification - https://tools.ietf.org/html/rfc1035
- **RFC 826**: Ethernet Address Resolution Protocol (ARP) - https://tools.ietf.org/html/rfc826
- **CompTIA Network+ N10-008 Exam Objectives**: Domain 5.3 - Use the appropriate tool
