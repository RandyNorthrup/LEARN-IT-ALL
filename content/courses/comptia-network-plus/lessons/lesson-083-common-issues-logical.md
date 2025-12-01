---
id: "lesson-083"
title: "Common Logical Layer Issues: IP Conflicts, Routing Loops, and DNS Problems"
chapterId: "chapter-09"
order: 83
duration: 28
objectives:
  - "Diagnose and resolve IP address conflicts and DHCP issues"
  - "Identify and fix routing loops and incorrect routing configurations"
  - "Troubleshoot DNS resolution failures and misconfigurations"
  - "Apply systematic troubleshooting to logical network problems"
---

# Common Logical Layer Issues: IP Conflicts, Routing Loops, and DNS Problems

## Introduction

While physical layer issues (cables, connectors, interference) are common causes of network problems, logical layer issues—those involving IP addressing, routing, and name resolution—can be equally disruptive and often more difficult to diagnose. Logical issues don't involve faulty hardware or damaged cables, but rather misconfigurations, addressing conflicts, or service failures.

In this lesson, we'll explore common logical network issues including:
- **IP address conflicts and DHCP problems**
- **Incorrect IP configurations** (subnet masks, default gateways)
- **Routing loops and routing misconfigurations**
- **DNS resolution failures**
- **VLAN and network segmentation issues**

Understanding these logical issues enables you to quickly diagnose and resolve connectivity problems that appear mysterious because physical connectivity is fine.

---

## IP Address Conflicts

### What is an IP Address Conflict?

An **IP address conflict** occurs when two or more devices on the same network are assigned the same IP address. Since IP addresses must be unique within a broadcast domain, conflicts prevent proper network communication.

**How Conflicts Occur**:
- Two devices manually configured with same IP
- DHCP server assigns IP already in use by static device
- Rogue DHCP server assigning addresses
- Device keeps old IP after DHCP scope changes
- Network administrator error during manual configuration

### Symptoms of IP Conflicts

**Windows**:
```
IP Address Conflict Detected
"There is an IP address conflict with another system on the network"
```
- Pop-up notification appears
- May show in Event Viewer (Event ID 4198, 4199)
- Network connectivity lost or intermittent

**Linux/macOS**:
- Message in system logs: "duplicate address detected"
- `dmesg` output: "IPv4 address conflict"
- Network manager may display warning

**Network-Level Symptoms**:
- **Intermittent connectivity**: Works sometimes, fails other times (depends on ARP cache)
- **Both devices affected**: Neither can reliably communicate
- **ARP behavior**: Duplicate ARP replies for same IP
- **Random device responds**: Traffic may reach either device unpredictably

**Application-Level Symptoms**:
- Cannot access network resources
- Web browsing fails intermittently
- File shares disconnect
- Email client cannot connect

### Diagnosing IP Conflicts

**Step 1: Identify Conflicting IP**:

**Windows**:
```powershell
# Check current IP configuration
ipconfig /all

Ethernet adapter Local Area Connection:
   IPv4 Address. . . . . . . . : 192.168.1.100(Duplicate)
   Subnet Mask . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . : 192.168.1.1

# Event Viewer
eventvwr.msc
→ Windows Logs → System
→ Filter for Event ID 4198 or 4199
```

**Linux**:
```bash
# Check IP address
ip addr show

# Check system logs for conflicts
journalctl -xe | grep -i "duplicate"
dmesg | grep -i "conflict"

# Example output:
[12345.678] IPv4: duplicate address detected for 192.168.1.100
```

**macOS**:
```bash
# Check Network preferences
# System notification appears if conflict detected

# Check logs
log show --predicate 'eventMessage contains "duplicate"' --info
```

**Step 2: Identify Conflicting Device**:

**Use ARP to Find MAC Address**:
```bash
# Flush ARP cache and ping the conflicting IP
arp -d 192.168.1.100     # Delete entry
ping 192.168.1.100       # Trigger ARP request
arp -a | grep 192.168.1.100

# Output shows MAC address:
192.168.1.100    00-1A-2B-3C-4D-5E    dynamic
```

**Perform ARP Scan**:
```bash
# Use arp-scan (Linux)
sudo arp-scan --interface=eth0 192.168.1.0/24

# Look for duplicate IPs:
192.168.1.100   00-1a-2b-3c-4d-5e   Device1
192.168.1.100   00-11-22-33-44-55   Device2  ← Conflict!
```

**Check DHCP Server Logs**:
```
# Look for duplicate IP assignments
# Check if IP was issued twice
# Verify static reservations vs. dynamic pool

Example log entry:
DHCPACK to 192.168.1.100 (00:1a:2b:3c:4d:5e) on eth0
DHCPDECLINE of 192.168.1.100 from 00:11:22:33:44:55
  (already in use by 00:1a:2b:3c:4d:5e)
```

**Step 3: Identify MAC Address Vendor**:
```bash
# Look up MAC vendor using OUI (first 6 hex digits)
# Visit https://macvendors.com or use lookup tool

00:1a:2b = Dell Inc.
00:11:22 = Cisco Systems
```

**Use Network Scanner**:
- Angry IP Scanner
- Advanced IP Scanner (Windows)
- Nmap: `nmap -sn 192.168.1.0/24`

### Resolving IP Conflicts

**Method 1: Release and Renew DHCP**:

**Windows**:
```powershell
ipconfig /release
ipconfig /renew
```

**Linux**:
```bash
# dhclient
sudo dhclient -r eth0    # Release
sudo dhclient eth0       # Renew

# NetworkManager
sudo nmcli connection down "Wired connection 1"
sudo nmcli connection up "Wired connection 1"
```

**macOS**:
```bash
# Renew DHCP lease
sudo ipconfig set en0 DHCP
```

**Method 2: Change Static IP**:
- If device has static IP, change to different unused IP
- Update device configuration
- Verify new IP not in DHCP pool

**Method 3: Fix DHCP Server Configuration**:
- **Exclude static IPs from DHCP pool**:
  ```
  # Example: Reserve 192.168.1.1-192.168.1.50 for static
  # DHCP pool: 192.168.1.51-192.168.1.254
  ```
- **Create DHCP reservations** for devices needing consistent IPs:
  ```
  # Bind MAC address to specific IP
  MAC: 00:1a:2b:3c:4d:5e → IP: 192.168.1.100
  ```

**Method 4: Remove Rogue DHCP Server**:
- Scan network for unauthorized DHCP servers
- Use DHCP snooping on switches to block rogue servers
- Document and disable unauthorized DHCP services

**Method 5: Clear ARP Cache** (on affected devices):
```bash
# Windows
arp -d *

# Linux
sudo ip -s -s neigh flush all

# macOS
sudo arp -a -d
```

### Preventing IP Conflicts

**Best Practices**:

1. **Use DHCP for most devices**:
   - Reduces manual configuration errors
   - Centralized management

2. **Reserve range for static IPs**:
   - Example: .1-.50 for static, .51-.254 for DHCP
   - Document all static assignments

3. **Use DHCP reservations**:
   - Combine DHCP automation with consistent addressing
   - Servers, printers, APs get same IP always

4. **Document IP assignments**:
   - Maintain IP address spreadsheet
   - Include hostname, MAC, IP, purpose, location

5. **Monitor DHCP logs**:
   - Watch for DHCPDECLINE messages
   - Investigate duplicate assignments

6. **Disable rogue DHCP servers**:
   - Only authorized DHCP servers should run
   - Use DHCP snooping to prevent unauthorized servers

---

## DHCP Problems

### DHCP Failure - No IP Address

**Symptoms**:
```
Windows:
IPv4 Address. . . . . . . . : 169.254.x.x (APIPA)
Subnet Mask . . . . . . . . : 255.255.0.0
Default Gateway . . . . . . : (empty)

Linux:
inet 169.254.45.123/16 scope link (APIPA address assigned)
```

**APIPA (Automatic Private IP Addressing)**:
- Windows/Linux fall back to self-assigned IP in 169.254.0.0/16
- Indicates DHCP server not reachable
- Can communicate with other APIPA devices on same segment
- Cannot reach outside local subnet (no default gateway)

**Causes**:

1. **DHCP server down or unreachable**:
   - Server powered off
   - Server service stopped
   - Network path to server broken

2. **DHCP scope exhausted**:
   - All IPs in pool assigned
   - No available addresses

3. **DHCP relay not configured**:
   - Client on different subnet from DHCP server
   - Router not forwarding DHCP broadcasts

4. **Network connectivity issue**:
   - Physical layer problem prevents DHCP communication
   - VLAN misconfiguration

5. **Firewall blocking DHCP**:
   - UDP ports 67/68 blocked
   - Client or server firewall misconfigured

**Diagnosis**:

**Test 1: Verify DHCP Service Running**:
```bash
# Windows (on DHCP server)
sc query DHCPServer

# Linux (ISC DHCP Server)
sudo systemctl status isc-dhcp-server
sudo systemctl status dhcpd

# Check if service is "running"
```

**Test 2: Check DHCP Scope**:
```
# On DHCP server, verify:
- Scope has available addresses
- Scope is activated
- Lease duration not too long (preventing recycling)

# Example: If scope is 192.168.1.100-.150 (51 addresses)
# And 51 devices have leases
# New device cannot get IP
```

**Test 3: Packet Capture**:
```bash
# Capture DHCP traffic (UDP 67/68)
sudo tcpdump -i eth0 -n port 67 or port 68

# Expected DHCP process:
1. DHCPDISCOVER (client → broadcast)
2. DHCPOFFER (server → client)
3. DHCPREQUEST (client → broadcast)
4. DHCPACK (server → client)

# If only DHCPDISCOVER visible:
# → Server not responding
```

**Test 4: Try Manual IP**:
```bash
# Temporarily assign static IP on same subnet
# If manual IP works:
# → Physical connectivity OK, DHCP issue confirmed
# If manual IP doesn't work:
# → Physical/logical connectivity issue
```

**Resolution**:

1. **Restart DHCP server**:
   ```bash
   # Windows
   net stop DHCPServer
   net start DHCPServer
   
   # Linux
   sudo systemctl restart isc-dhcp-server
   ```

2. **Expand DHCP scope**:
   - Increase address pool size
   - Reduce lease duration to recycle IPs faster

3. **Configure DHCP relay** (ip helper):
   ```cisco
   # Cisco router
   interface GigabitEthernet0/1
     ip helper-address 192.168.10.5
   ```

4. **Clear stale leases**:
   - Remove expired or old leases manually
   - Free up addresses

5. **Check firewall rules**:
   - Allow UDP 67/68
   - Verify no ACLs blocking DHCP

### Incorrect DHCP Configuration

**Wrong Subnet Mask**:
```
Correct:   192.168.1.100/24 (255.255.255.0)
Incorrect: 192.168.1.100/16 (255.255.0.0)

Impact:
- Device thinks entire 192.168.0.0/16 is local
- Won't route traffic properly
- Can reach devices in 192.168.x.x without gateway
- But routing is wrong
```

**Symptoms**:
- Can communicate with more devices than expected
- Or cannot reach expected devices
- Routing behavior unpredictable

**Wrong Default Gateway**:
```
Network:  192.168.1.0/24
Correct Gateway:   192.168.1.1
Incorrect Gateway: 192.168.1.254 (doesn't exist)

Impact:
- Cannot reach devices outside local subnet
- Internet access fails
- Local subnet works fine
```

**Symptoms**:
- Can ping local devices
- Cannot ping external IPs or hostnames
- Traceroute shows no gateway response

**Wrong DNS Server**:
```
Correct DNS:   192.168.1.1 or 8.8.8.8
Incorrect DNS: 192.168.1.254 (doesn't exist)

Impact:
- Cannot resolve hostnames
- Ping by IP works
- Ping by name fails
```

**Symptoms**:
- `ping 8.8.8.8` works
- `ping google.com` fails
- Web browsing by IP works, by name fails

**Diagnosis**:
```bash
# Check DHCP-assigned configuration
# Windows
ipconfig /all

# Linux
ip addr show
cat /etc/resolv.conf   # DNS servers

# Verify:
- IP address in correct subnet
- Subnet mask matches network design
- Default gateway reachable (ping gateway)
- DNS servers reachable (ping DNS server)
- DNS resolution works (nslookup google.com)
```

**Resolution**:
- **Fix DHCP server configuration**:
  - Correct subnet mask in scope options
  - Set correct default gateway (Router option)
  - Set correct DNS servers (DNS Servers option)
- **Release and renew** DHCP lease on client:
  ```bash
  ipconfig /release && ipconfig /renew
  ```

---

## Routing Problems

### Routing Loops

**What is a Routing Loop?**

A **routing loop** occurs when packets circulate endlessly between routers because routing tables are misconfigured, causing each router to forward the packet back to another router in a cycle.

**How Routing Loops Form**:
```
Network: 10.1.1.0/24

Router A thinks: To reach 10.1.1.0/24, send to Router B
Router B thinks: To reach 10.1.1.0/24, send to Router C
Router C thinks: To reach 10.1.1.0/24, send to Router A

Result: Packet loops A → B → C → A → B → C ...
```

**Causes**:
- Manual static route misconfiguration
- Routing protocol convergence issues (temporary during updates)
- Redistribution errors between routing protocols
- Missing or incorrect route filtering

**Symptoms**:

**High CPU on Routers**:
- Routers processing same packets repeatedly
- CPU utilization spikes
- Router performance degrades

**Network Congestion**:
- Bandwidth consumed by looping packets
- Other traffic affected
- Links saturate

**TTL Expiration**:
```
Ping output:
Reply from 10.1.1.1: TTL expired in transit
Reply from 10.1.1.2: TTL expired in transit

Traceroute output:
 1  192.168.1.1  1 ms
 2  10.0.0.1     2 ms
 3  10.0.0.2     3 ms
 4  10.0.0.1     4 ms  ← Loop detected!
 5  10.0.0.2     5 ms
 6  10.0.0.1     6 ms
 7  10.0.0.2     7 ms
```

**Unreachable Destinations**:
- Packets never reach destination
- Services timeout
- Applications fail

**Diagnosis**:

**Use Traceroute**:
```bash
# Traceroute shows repeating hops
traceroute 10.1.1.100

 1  192.168.1.1    1 ms
 2  10.0.0.5       2 ms
 3  10.0.0.10      3 ms
 4  10.0.0.5       4 ms  ← Repeat!
 5  10.0.0.10      5 ms  ← Repeat!
 6  10.0.0.5       6 ms
 7  10.0.0.10      7 ms
```

**Check Routing Tables**:
```bash
# On Router A
show ip route

# Look for incorrect next-hop
# Example:
10.1.1.0/24 via 10.0.0.2  ← Should be different

# On Router B
show ip route
10.1.1.0/24 via 10.0.0.1  ← Points back to Router A! (LOOP)
```

**Monitor Router CPU**:
```cisco
show processes cpu

CPU utilization: 95%  ← Abnormally high
Process         CPU%
IP Input        85%   ← Processing looping packets
```

**Packet Capture**:
- Capture traffic on router interface
- Look for same packets with decreasing TTL
- Identify source and destination involved in loop

**Resolution**:

**Method 1: Fix Static Routes**:
```cisco
# Remove incorrect route
no ip route 10.1.1.0 255.255.255.0 10.0.0.2

# Add correct route
ip route 10.1.1.0 255.255.255.0 10.0.0.10
```

**Method 2: Verify Dynamic Routing**:
```bash
# Check routing protocol status
show ip ospf neighbor
show ip eigrp neighbors
show ip bgp summary

# Verify neighbors are up
# Check if routes being learned correctly
```

**Method 3: Wait for Convergence**:
- If routing protocol is converging, wait
- Convergence time varies:
  - **RIP**: Up to 180 seconds
  - **OSPF**: Typically 5-10 seconds
  - **EIGRP**: Typically 5-15 seconds
- Monitor routing table for stability

**Method 4: Implement Route Filtering**:
```cisco
# Prevent route advertisements that could cause loops
# Use distribute-list or route-map

router ospf 1
  distribute-list 10 in GigabitEthernet0/1

access-list 10 deny 10.1.1.0 0.0.0.255
access-list 10 permit any
```

**Prevention**:
- Use routing protocol loop prevention mechanisms:
  - **Split horizon**: Don't advertise route back on interface learned from
  - **Route poisoning**: Advertise failed route with infinite metric
  - **Hold-down timers**: Wait before accepting new routes after failure
- Document routing design carefully
- Test routing changes in lab before production
- Use consistent routing metrics
- Implement route summarization to reduce complexity

### Missing or Incorrect Routes

**Symptoms**:
```
ping 10.2.2.100
Destination host unreachable

traceroute 10.2.2.100
 1  192.168.1.1     1 ms
 2  * * *
 3  * * *
```

**Causes**:
- **No route to destination**: Router doesn't know how to reach network
- **Incorrect next-hop**: Route points to wrong router
- **More specific route**: Longer prefix match overrides intended route
- **Asymmetric routing**: Forward path works, return path fails

**Diagnosis**:

**Check Routing Table**:
```bash
# On local router
show ip route 10.2.2.100

# Output:
% Network not in table  ← No route exists

# Or:
10.0.0.0/8 via 10.0.0.1  ← Only summary route, but specific network unreachable
```

**Trace Path Hop-by-Hop**:
```bash
# Start from client
traceroute 10.2.2.100

# Check each hop
# Identify where packets stop progressing
# Check routing table on that router
```

**Verify Routing Protocol**:
```cisco
# Check if route being advertised
show ip ospf database
show ip eigrp topology

# Look for destination network
# If not present, route not being learned
```

**Resolution**:

**Add Static Route**:
```cisco
# Add missing route
ip route 10.2.2.0 255.255.255.0 10.0.0.5
```

**Fix Routing Protocol**:
```cisco
# Ensure network advertised in routing protocol
router ospf 1
  network 10.2.2.0 0.0.0.255 area 0

# Or configure redistribution if needed
router ospf 1
  redistribute static subnets
```

**Check for Route Filtering**:
```bash
# Verify no ACLs or distribute-lists blocking route
show ip protocols

# Remove filters if appropriate
```

**Verify Return Path**:
```bash
# From destination, check route back to source
# Asymmetric routing can cause issues
# Ensure bidirectional connectivity
```

### Default Route Problems

**Missing Default Route**:
```
Routing table:
192.168.1.0/24 via local
10.0.0.0/24 via 10.0.0.1

(No default route)

Impact:
- Can reach 192.168.1.0/24 (local)
- Can reach 10.0.0.0/24 (static route)
- Cannot reach Internet or other networks (no default)
```

**Symptoms**:
- Can reach some networks, not others
- Internet access fails
- No route to remote destinations

**Resolution**:
```cisco
# Add default route pointing to ISP or upstream router
ip route 0.0.0.0 0.0.0.0 203.0.113.1

# Or configure via DHCP (for client devices)
# Or configure via routing protocol (default-information originate)
```

**Incorrect Default Route**:
```
Default route: 0.0.0.0/0 via 192.168.1.100 (non-existent or wrong)

Impact:
- All non-local traffic sent to incorrect gateway
- Internet/remote access fails
```

**Resolution**:
```cisco
# Remove incorrect default route
no ip route 0.0.0.0 0.0.0.0 192.168.1.100

# Add correct default route
ip route 0.0.0.0 0.0.0.0 192.168.1.1
```

---

## DNS Problems

### DNS Resolution Failure

**Symptoms**:
```bash
# Ping by IP works
ping 8.8.8.8
64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=15.3 ms ✓

# Ping by name fails
ping google.com
ping: cannot resolve google.com: Unknown host ✗
```

**Application Impact**:
- Web browsers display "DNS server not found"
- Email clients cannot connect
- Applications using hostnames fail

**Causes**:

1. **DNS server unreachable**
2. **Incorrect DNS server configured**
3. **DNS server not responding**
4. **Firewall blocking DNS (UDP/TCP port 53)**
5. **DNS cache corruption**

**Diagnosis**:

**Step 1: Check DNS Configuration**:
```bash
# Windows
ipconfig /all
   DNS Servers . . . . . . . . . : 192.168.1.1

# Linux
cat /etc/resolv.conf
nameserver 192.168.1.1
nameserver 8.8.8.8

# macOS
scutil --dns
```

**Step 2: Test DNS Server Reachability**:
```bash
# Ping DNS server
ping 192.168.1.1

# If fails, DNS server unreachable (network issue)
# If succeeds, DNS server reachable (DNS service issue)
```

**Step 3: Test DNS Resolution**:
```bash
# Use nslookup to test DNS
nslookup google.com

# Success:
Server:  192.168.1.1
Address: 192.168.1.1#53

Name:    google.com
Address: 142.250.185.46

# Failure:
Server:  192.168.1.1
Address: 192.168.1.1#53

** server can't find google.com: REFUSED ✗
```

**Step 4: Test Alternate DNS**:
```bash
# Test with public DNS (Google, Cloudflare)
nslookup google.com 8.8.8.8

# If works with 8.8.8.8 but not local DNS:
# → Local DNS server has problem
```

**Step 5: Check DNS Service**:
```bash
# On DNS server
# Windows
sc query DNS

# Linux (BIND)
sudo systemctl status named
sudo systemctl status bind9

# Check if service running
```

**Resolution**:

**Method 1: Flush DNS Cache** (client):
```bash
# Windows
ipconfig /flushdns

# Linux
sudo systemd-resolve --flush-caches
# or
sudo resolvectl flush-caches

# macOS
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

**Method 2: Restart DNS Service** (server):
```bash
# Windows
net stop DNS && net start DNS

# Linux
sudo systemctl restart named
sudo systemctl restart bind9
```

**Method 3: Change DNS Servers** (client):
```bash
# Temporarily use public DNS
# Windows: Network adapter properties
# Linux: Edit /etc/resolv.conf
nameserver 8.8.8.8
nameserver 1.1.1.1

# Or configure via DHCP
```

**Method 4: Check Firewall**:
```bash
# Ensure UDP/TCP port 53 allowed
# Windows Firewall
netsh advfirewall firewall add rule name="DNS" protocol=UDP dir=in localport=53 action=allow

# Linux iptables
sudo iptables -A INPUT -p udp --dport 53 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 53 -j ACCEPT
```

### DNS Forwarding Issues

**Scenario**:
- Local DNS server forwards to upstream DNS
- Upstream DNS unreachable or slow

**Symptoms**:
- DNS resolution slow or failing
- Timeouts on name lookups
- Intermittent resolution

**Diagnosis**:
```bash
# Check DNS server forwarders configuration
# Windows DNS Server
Get-DnsServerForwarder

# BIND (Linux) - check named.conf
forwarders {
    8.8.8.8;
    8.8.4.4;
};
```

**Test Forwarding**:
```bash
# From DNS server, test resolution
nslookup google.com

# If slow or fails, forwarder issue
# Try alternate forwarder manually
nslookup google.com 1.1.1.1
```

**Resolution**:
- Update forwarders to reliable DNS servers
- Use multiple forwarders for redundancy
- Consider root hints instead of forwarders
- Monitor forwarder performance

### Incorrect DNS Records

**Common Issues**:

**A Record Pointing to Wrong IP**:
```
Hostname: server1.example.com
Configured: 192.168.1.50
Actual IP:  192.168.1.100

Impact: Clients connect to wrong host or no host
```

**Missing Record**:
```
Query: newserver.example.com
Result: NXDOMAIN (Non-Existent Domain)

Impact: Cannot resolve hostname
```

**Stale Record** (DNS Caching):
```
Record: server1.example.com → 192.168.1.50
Server IP changed to: 192.168.1.100
TTL: 86400 seconds (24 hours)

Impact: Clients use old IP for up to 24 hours
```

**Diagnosis**:
```bash
# Query specific DNS server
nslookup server1.example.com dns-server-ip

# Check authoritative answer
dig server1.example.com

# Look for:
;; ANSWER SECTION:
server1.example.com.  3600  IN  A  192.168.1.50

# Verify IP matches actual server IP
```

**Resolution**:

**Update DNS Record**:
```bash
# On Windows DNS Server
# Use DNS Manager GUI to update record
# Or PowerShell:
Set-DnsServerResourceRecord -Name "server1" -ZoneName "example.com" -IPv4Address "192.168.1.100"

# On BIND (Linux)
# Edit zone file
sudo nano /etc/bind/zones/db.example.com

# Change:
server1  IN  A  192.168.1.50
# To:
server1  IN  A  192.168.1.100

# Increment serial number
# Reload zone
sudo rndc reload example.com
```

**Flush Client Caches**:
```bash
# Clients may have cached old record
# Flush on affected clients (see Method 1 above)
```

**Reduce TTL** (before changes):
```
# Lower TTL before making changes
server1  IN  A  192.168.1.50  ; TTL 3600
# Change to:
server1  300  IN  A  192.168.1.50  ; TTL 300 (5 minutes)

# Wait for old TTL to expire
# Make IP change
# Clients will pick up new IP quickly
```

### DNS Split-Horizon Issues

**Split-Horizon DNS**:
- Internal DNS server returns internal IPs
- External DNS server returns external IPs
- Same hostname, different IPs

**Problem**:
- Configuration mismatch between internal and external
- VPN clients get wrong DNS view
- Public users get internal IPs (or vice versa)

**Example**:
```
Hostname: mail.example.com

Internal DNS: 192.168.1.50 (private IP)
External DNS: 203.0.113.50 (public IP)

Issue: VPN client queries external DNS, gets public IP
       Tries to connect externally instead of via VPN tunnel
```

**Resolution**:
- Ensure VPN clients use internal DNS
- Configure split DNS properly
- Test from both internal and external networks
- Document split-horizon configuration

---

## VLAN and Network Segmentation Issues

### VLAN Misconfiguration

**Wrong VLAN Assignment**:
```
Port Configuration:
Switch Port Fa0/5: VLAN 10
Device Expected:   VLAN 20

Impact: Device cannot communicate with VLAN 20 resources
```

**Symptoms**:
- Device has IP address but cannot reach resources
- Can ping devices in same VLAN only
- Cannot reach default gateway (if in different VLAN)

**Diagnosis**:
```cisco
# Check port VLAN assignment
show vlan brief
show interface FastEthernet0/5 switchport

# Verify:
VLAN 10   Name: Sales    Ports: Fa0/5, Fa0/6
VLAN 20   Name: IT       Ports: Fa0/7, Fa0/8

# Device on Fa0/5 is in VLAN 10
# If should be in VLAN 20, misconfigured
```

**Resolution**:
```cisco
# Change port VLAN assignment
configure terminal
interface FastEthernet0/5
switchport access vlan 20
end
```

### Native VLAN Mismatch

**Problem**:
- Trunk ports on both sides must have same native VLAN
- Mismatch causes spanning tree issues

**Symptoms**:
```
%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered
on FastEthernet0/1 (10), with Switch2 FastEthernet0/1 (1).
```

**Diagnosis**:
```cisco
# Check native VLAN on trunk
show interface trunk

Port      Native VLAN
Fa0/1     10          ← Switch1

# On other switch:
Fa0/1     1           ← Switch2 (MISMATCH!)
```

**Resolution**:
```cisco
# Make native VLANs match
# On Switch2:
configure terminal
interface FastEthernet0/1
switchport trunk native vlan 10
end
```

### Inter-VLAN Routing Not Working

**Scenario**:
- Devices in different VLANs cannot communicate
- Router or Layer 3 switch should route between VLANs

**Causes**:
- Inter-VLAN routing not configured
- Trunk not configured between switch and router
- Subinterfaces missing or misconfigured
- ACLs blocking traffic

**Diagnosis**:
```bash
# From VLAN 10 device
ping 192.168.20.100  # Device in VLAN 20

# Fails → Inter-VLAN routing issue
```

**Check Router/L3 Switch**:
```cisco
# Verify subinterfaces configured (router-on-a-stick)
show ip interface brief

Interface         IP-Address      Status   Protocol
Gi0/1.10          192.168.10.1    up       up
Gi0/1.20          192.168.20.1    up       up

# Or SVI configured (Layer 3 switch)
Interface Vlan10  192.168.10.1    up       up
Interface Vlan20  192.168.20.1    up       up
```

**Check Trunk**:
```cisco
show interface trunk

# Verify trunk allows VLANs 10 and 20
```

**Resolution**:
```cisco
# Configure inter-VLAN routing

# Method 1: Router-on-a-stick
interface GigabitEthernet0/1.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0

interface GigabitEthernet0/1.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0

# Method 2: Layer 3 switch SVI
interface Vlan10
 ip address 192.168.10.1 255.255.255.0
 no shutdown

interface Vlan20
 ip address 192.168.20.1 255.255.255.0
 no shutdown

ip routing  # Enable routing on switch
```

---

## Summary

In this lesson, we explored common logical network issues:

**IP Address Conflicts**:
- Two devices with same IP on same network
- Symptoms: Intermittent connectivity, conflict warnings
- Diagnosis: Check IP config, use ARP to find MAC address
- Resolution: Release/renew DHCP, change static IP, fix DHCP server

**DHCP Problems**:
- No IP address (APIPA 169.254.x.x)
- Causes: DHCP server down, scope exhausted, relay not configured
- Diagnosis: Check DHCP service, scope availability, packet capture
- Resolution: Restart DHCP, expand scope, configure relay

**Routing Problems**:
- **Routing loops**: Packets circle between routers (TTL expires)
- **Missing routes**: Network unreachable
- **Incorrect routes**: Wrong next-hop or default gateway
- Diagnosis: Traceroute shows loops/stops, check routing tables
- Resolution: Fix static routes, verify routing protocol, wait for convergence

**DNS Problems**:
- Resolution failures: Cannot resolve hostnames
- Causes: DNS server down, misconfigured, unreachable, firewall blocking
- Diagnosis: nslookup, test alternate DNS, check DNS service
- Resolution: Flush cache, restart DNS, change DNS servers, fix firewall

**VLAN Issues**:
- Wrong VLAN assignment: Device in wrong VLAN
- Native VLAN mismatch: Trunk misconfiguration
- Inter-VLAN routing not working: Missing configuration
- Resolution: Correct VLAN assignment, match native VLANs, configure routing

**Systematic Troubleshooting**:
1. Identify symptoms (no connectivity vs. slow performance)
2. Check physical layer first (link lights, cables)
3. Verify IP configuration (IP, mask, gateway, DNS)
4. Test connectivity progressively (local → gateway → remote)
5. Check routing and DNS
6. Use appropriate tools (ping, traceroute, nslookup, packet capture)

Understanding logical layer issues enables quick resolution of connectivity problems even when physical layer is functioning correctly.

---

## Additional References

- **RFC 791**: Internet Protocol (IP)
- **RFC 2131**: Dynamic Host Configuration Protocol (DHCP)
- **RFC 1034/1035**: Domain Name System (DNS)
- **RFC 2328**: OSPF Routing Protocol
- **IEEE 802.1Q**: VLAN Tagging Standard
- **CompTIA Network+ N10-008 Exam Objectives**: Domain 5.3 - Given a scenario, troubleshoot common network service issues
