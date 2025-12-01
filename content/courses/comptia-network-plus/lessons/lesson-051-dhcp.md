---
id: lesson-051-dhcp
title: "Dynamic Host Configuration Protocol (DHCP)"
sidebar_label: "Lesson 51: DHCP"
description: "Master DHCP operations, DORA process, server configuration, relay agents, and DHCPv6"
duration: 90
objectives:
  - Understand DHCP operations and the DORA process
  - Configure DHCP servers with scopes, reservations, and options
  - Implement DHCP relay agents for multi-subnet environments
  - Troubleshoot common DHCP issues
  - Distinguish between DHCPv4 and DHCPv6 implementations
  - Configure stateful and stateless DHCPv6
---

# Lesson 51: Dynamic Host Configuration Protocol (DHCP)

## Introduction

Dynamic Host Configuration Protocol (DHCP) automatically assigns IP addresses and network configuration to devices. Without DHCP, administrators would need to manually configure every device—an impractical approach in modern networks.

DHCP operates on a client-server model where DHCP servers lease IP addresses to clients for a specified duration. Understanding DHCP is essential for network administration and appears frequently on the Network+ exam.

**Key Principle:** DHCP provides centralized, automatic IP address management, reducing errors and administrative overhead.

## DHCP Fundamentals

### Why DHCP?

**Manual Configuration Challenges:**
```
Problems with Static IP Assignment:
  - Time-consuming (configure each device individually)
  - Error-prone (typos, duplicate IPs, wrong subnet masks)
  - Difficult to manage (tracking spreadsheets)
  - No flexibility (moving devices requires reconfiguration)
  - Doesn't scale (100s or 1000s of devices)

Example Manual Configuration:
  Device 1: 192.168.1.10/24, GW 192.168.1.1, DNS 8.8.8.8
  Device 2: 192.168.1.11/24, GW 192.168.1.1, DNS 8.8.8.8
  Device 3: 192.168.1.12/24, GW 192.168.1.1, DNS 8.8.8.8
  ...
  Device 100: 192.168.1.109/24, GW 192.168.1.1, DNS 8.8.8.8

Maintenance nightmare!
```

**DHCP Benefits:**
```
Advantages:
  1. Automatic Configuration
     - Plug in device, immediately get network access
     - No user intervention required
  
  2. Centralized Management
     - Change DNS server once, affects all clients
     - Update gateway address in one place
  
  3. Efficient IP Utilization
     - Addresses leased temporarily
     - Unused addresses returned to pool
     - Support more devices than available IPs
  
  4. Reduced Errors
     - No manual typos
     - Prevents duplicate IP addresses
     - Consistent configuration
  
  5. Mobility Support
     - Move between networks seamlessly
     - Automatic reconfiguration
     - Perfect for laptops, mobile devices
  
  6. Scalability
     - Manage thousands of devices easily
     - Multiple DHCP servers for redundancy
```

### DHCP Components

**Server:**
```
Responsibilities:
  - Maintain pool of available IP addresses
  - Assign addresses to requesting clients
  - Track lease durations
  - Provide additional configuration (gateway, DNS, etc.)
  - Handle lease renewals and releases

Location:
  - Dedicated DHCP server (Windows Server, ISC DHCP)
  - Router/switch with DHCP service
  - Cloud-based DHCP (managed service)

Requirements:
  - Static IP address (must not change)
  - Sufficient resources (memory, storage)
  - Network reachability to clients
```

**Client:**
```
Any device requesting automatic configuration:
  - Desktop computers
  - Laptops
  - Smartphones/tablets
  - Printers
  - IoT devices
  - Network equipment (some)

Client software:
  - dhclient (Linux)
  - DHCP Client service (Windows)
  - Built into OS networking stack

Client states:
  - INIT (initializing)
  - SELECTING (choosing server)
  - REQUESTING (requesting address)
  - BOUND (address assigned)
  - RENEWING (renewing lease)
  - REBINDING (lease expiring, finding new server)
```

**Relay Agent (IP Helper):**
```
Purpose:
  - Forward DHCP messages between subnets
  - Required because DHCP uses broadcasts
  - Enables one DHCP server for multiple networks

Why needed:
  DHCP Discover = broadcast (255.255.255.255)
  Routers don't forward broadcasts by default
  Without relay: Need DHCP server on every subnet
  With relay: One DHCP server serves many subnets

Configuration:
  Cisco: ip helper-address 192.168.10.5
  Linux: dhcp-relay agent
  Windows: DHCP Relay Agent role
```

### DHCP Ports

**UDP Ports:**
```
Server listens: UDP 67
Client listens: UDP 68

Why UDP?
  - Lightweight (no connection overhead)
  - Broadcast support
  - Faster than TCP for simple requests

Communication:
  Client → Server: Source port 68, Destination port 67
  Server → Client: Source port 67, Destination port 68
```

**Firewall Configuration:**
```
Must allow:
  UDP 67 (inbound to server)
  UDP 68 (outbound from server)

Example iptables:
  -A INPUT -p udp --dport 67 -j ACCEPT
  -A OUTPUT -p udp --sport 67 -j ACCEPT

Example Windows Firewall:
  New-NetFirewallRule -DisplayName "DHCP Server" `
    -Direction Inbound -Protocol UDP -LocalPort 67 -Action Allow
```

## The DORA Process

### Four-Step Discovery Process

**Overview:**
```
D - Discover   (Client broadcasts: "I need an IP address")
O - Offer      (Server responds: "Here's an available address")
R - Request    (Client broadcasts: "I accept that address")
A - Acknowledge (Server confirms: "Address is yours")

Timeline:
  Client           Network            Server
    |                                   |
    |--- DHCP Discover (broadcast) ---->|
    |                                   | (Check available IPs)
    |<--- DHCP Offer -------------------|
    |                                   |
    |--- DHCP Request (broadcast) ----->|
    |                                   | (Mark IP as leased)
    |<--- DHCP Acknowledge -------------|
    |                                   |
  [Now configured and operational]
```

### Step 1: DHCP Discover

**Client Broadcasts Request:**
```
Packet Details:
  Source IP: 0.0.0.0 (client has no IP yet)
  Destination IP: 255.255.255.255 (broadcast)
  Source MAC: Client's MAC address
  Destination MAC: ff:ff:ff:ff:ff:ff (broadcast)
  
Message Type: DHCP Discover

Contents:
  - Client MAC address (hardware address)
  - Transaction ID (random number for tracking)
  - Requested options (subnet mask, router, DNS, etc.)
  - Previous IP address (if renewing)
  - Hostname (optional)

Example (simplified):
  DHCP Discover from MAC 00:1A:2B:3C:4D:5E
  Transaction ID: 0x12345678
  Client needs: IP address, subnet mask, default gateway, DNS
  Previous address: 192.168.1.50 (if applicable)
```

**Broadcast Behavior:**
```
Broadcast reaches:
  - All devices on local subnet
  - All DHCP servers on subnet
  - DHCP relay agents (which forward to remote servers)

Broadcast does NOT cross routers (without relay)

Multiple Servers:
  If multiple DHCP servers receive Discover:
  - All may respond with Offers
  - Client typically chooses first Offer received
  - Provides redundancy
```

### Step 2: DHCP Offer

**Server Responds:**
```
Packet Details:
  Source IP: DHCP server's IP (e.g., 192.168.1.1)
  Destination IP: 255.255.255.255 (broadcast) OR
                  Offered IP (unicast, if client supports)
  Source MAC: Server's MAC
  Destination MAC: Client's MAC
  
Message Type: DHCP Offer

Contents:
  - Offered IP address (e.g., 192.168.1.100)
  - Subnet mask (e.g., 255.255.255.0)
  - Lease duration (e.g., 86400 seconds = 24 hours)
  - DHCP server identifier (server's IP)
  - Default gateway (router)
  - DNS servers
  - Other options (domain name, TFTP server, etc.)

Example:
  DHCP Offer to MAC 00:1A:2B:3C:4D:5E
  Transaction ID: 0x12345678 (matches Discover)
  Offered IP: 192.168.1.100
  Subnet Mask: 255.255.255.0
  Lease: 86400 seconds (24 hours)
  Gateway: 192.168.1.1
  DNS: 8.8.8.8, 8.8.4.4
  Domain: example.com
```

**Unicast vs Broadcast Offer:**
```
Most servers broadcast Offer:
  - Client doesn't have IP yet
  - May not accept unicast packets
  - Broadcast ensures delivery

Some clients support unicast flag:
  - Client sets broadcast flag in Discover
  - Server can unicast if flag not set
  - Reduces broadcast traffic
```

### Step 3: DHCP Request

**Client Accepts Offer:**
```
Packet Details:
  Source IP: 0.0.0.0 (still no IP configured)
  Destination IP: 255.255.255.255 (broadcast)
  Source MAC: Client's MAC
  Destination MAC: ff:ff:ff:ff:ff:ff (broadcast)
  
Message Type: DHCP Request

Contents:
  - Requested IP address (from Offer)
  - DHCP server identifier (which server)
  - Transaction ID (same as before)
  - Client identifier (MAC address)

Example:
  DHCP Request from MAC 00:1A:2B:3C:4D:5E
  Transaction ID: 0x12345678
  Requesting: 192.168.1.100
  Server: 192.168.1.1

Why broadcast?
  - Informs all servers of choice
  - Rejected servers know to return offered IP to pool
  - Other servers see IP is taken
```

**Multiple Offers Scenario:**
```
If client received multiple Offers:

Server A offered: 192.168.1.100
Server B offered: 192.168.1.200

Client Request specifies:
  "I choose 192.168.1.100 from Server A"

Result:
  - Server A sees Request, prepares Acknowledge
  - Server B sees Request (not for its offer), returns 192.168.1.200 to pool
  - Prevents both servers from assigning same IP to different clients
```

### Step 4: DHCP Acknowledge

**Server Confirms Lease:**
```
Packet Details:
  Source IP: DHCP server's IP
  Destination IP: 255.255.255.255 OR offered IP
  Source MAC: Server's MAC
  Destination MAC: Client's MAC
  
Message Type: DHCP Acknowledge (ACK)

Contents:
  - Assigned IP address (now official)
  - Lease duration (starts now)
  - All configuration parameters
  - Renewal time (T1 = 50% of lease)
  - Rebinding time (T2 = 87.5% of lease)

Example:
  DHCP Acknowledge to MAC 00:1A:2B:3C:4D:5E
  Transaction ID: 0x12345678
  Assigned IP: 192.168.1.100/24
  Lease: 86400 seconds (24 hours)
  Renewal (T1): 43200 seconds (12 hours)
  Rebinding (T2): 75600 seconds (21 hours)
  Gateway: 192.168.1.1
  DNS: 8.8.8.8, 8.8.4.4
```

**Client Configuration:**
```
Upon receiving ACK:
  1. Configure network interface with assigned IP
  2. Apply subnet mask
  3. Set default gateway
  4. Configure DNS servers
  5. Start lease timer
  6. Begin normal network operations

Verification:
  - Send gratuitous ARP (detect IP conflicts)
  - Test connectivity to gateway
  - Test DNS resolution

Now client is fully operational on network
```

**DHCP NAK (Negative Acknowledgment):**
```
Server may send DHCP NAK instead of ACK if:
  - Requested IP no longer available
  - IP address invalid for subnet
  - Lease expired
  - Configuration error

Client Response to NAK:
  - Return to INIT state
  - Start DORA process over
  - Send new Discover

Example NAK scenario:
  Client requests 192.168.1.100
  Address now assigned to another device
  Server sends NAK
  Client starts discovery again
```

## DHCP Leases

### Lease Duration

**Lease Time Concept:**
```
Lease = Temporary IP address assignment

Why temporary?
  - Recover unused addresses (device leaves network)
  - Update configuration (change DNS servers)
  - Rebalance address usage
  - Prevent permanent depletion

Common lease durations:
  Home networks: 24 hours
  Enterprise: 7-30 days
  Guest networks: 1-4 hours
  Conference/event: 30 minutes - 2 hours
```

**Lease Time Selection:**
```
Short leases (1-4 hours):
  Advantages:
    - Rapid address recovery
    - Quick configuration updates
    - Efficient IP usage
  Disadvantages:
    - More DHCP traffic (frequent renewals)
    - Increased server load
    - Brief outage if renewal fails
  Best for:
    - Guest networks
    - High-turnover environments
    - Limited IP space

Long leases (7-30 days):
  Advantages:
    - Reduced DHCP traffic
    - Lower server load
    - More stable addressing
  Disadvantages:
    - Slower address recovery
    - Configuration changes take longer
    - Less efficient IP usage
  Best for:
    - Stable networks
    - Abundant IP space
    - Server farms

Infinite leases:
  - Never expire (not recommended)
  - Use reservations instead
```

### Lease Renewal Process

**Timeline:**
```
Lease granted: 86400 seconds (24 hours)

T1 (50%): 43200 seconds (12 hours)
  - Client contacts original DHCP server
  - Unicast DHCP Request
  - If successful, lease extended

T2 (87.5%): 75600 seconds (21 hours)
  - If T1 renewal failed
  - Client broadcasts to any DHCP server
  - Rebinding attempt

Expiration (100%): 86400 seconds (24 hours)
  - If no renewal by expiration
  - Client must stop using IP address
  - Return to INIT state
  - Start DORA process

Visual Timeline:
  0%        50% (T1)      87.5% (T2)    100%
  |----------|-------------|-------------|
  Lease    Renewal     Rebinding    Expiration
  Begins   Unicast     Broadcast    Release IP
```

**Renewal (T1) Process:**
```
At 50% of lease duration:

Client sends DHCP Request:
  - Unicast to original server (not broadcast)
  - Requests same IP address
  - Includes current configuration

Server responds:
  Success: DHCP ACK
    - Lease extended (new duration starts)
    - Client continues using same IP
    - New T1/T2 timers set
  
  Failure: No response
    - Server unavailable
    - Network issues
    - Client waits, tries again
    - Continues using IP until T2

Example:
  Original lease: 192.168.1.100, 24 hours
  At 12 hours: Client renews
  Server ACK: Lease extended 24 hours from now
  Client now has 36 hours total (12 elapsed + 24 new)
```

**Rebinding (T2) Process:**
```
At 87.5% of lease duration:
(Only if T1 renewal failed)

Client sends DHCP Request:
  - Broadcast (255.255.255.255)
  - Any DHCP server can respond
  - Requests same IP address

Server responds:
  Success: DHCP ACK from any server
    - Lease extended
    - May be different server than original
  
  Failure: No response
    - Client continues using IP
    - Waits for expiration
    - Prepares to release IP

Example:
  T1 renewal failed (server down)
  At 21 hours: Client rebinds
  Backup server responds with ACK
  Lease extended from backup server
```

**Lease Expiration:**
```
If lease expires without renewal:

Client actions:
  1. Immediately stop using IP address
  2. Disable network interface OR
  3. Reconfigure to 0.0.0.0
  4. Return to INIT state
  5. Send new DHCP Discover
  6. Complete DORA process
  7. Receive new IP (may be same or different)

Network interruption:
  - Brief connectivity loss
  - Ongoing connections dropped
  - New DORA typically completes in seconds

Prevention:
  - Redundant DHCP servers
  - Adequate lease durations
  - Monitored DHCP infrastructure
```

### Lease Release

**Explicit Release:**
```
Client voluntarily releases IP:

Scenarios:
  - User runs ipconfig /release (Windows)
  - User runs dhclient -r (Linux)
  - Computer shutting down gracefully
  - Network interface disabled

DHCP Release message:
  - Unicast to DHCP server
  - "I'm done with this IP"
  - Server marks IP as available immediately

Benefits:
  - Immediate address recovery
  - More efficient IP usage
  - Clean termination

Note: Many devices don't release on shutdown
      Graceful shutdown required
```

**Commands:**
```
Windows:
  ipconfig /release      (release DHCP lease)
  ipconfig /renew        (request new lease)
  ipconfig /all          (show DHCP details)

Linux:
  sudo dhclient -r       (release lease)
  sudo dhclient eth0     (renew lease)
  sudo dhclient -r eth0 && sudo dhclient eth0 (release and renew)

macOS:
  sudo ipconfig set en0 DHCP           (renew lease)
  sudo ipconfig set en0 BOOTP          (release)

Verify lease information:
  Windows: ipconfig /all
  Linux: cat /var/lib/dhcp/dhclient.leases
  macOS: ipconfig getpacket en0
```

## DHCP Server Configuration

### Scope Definition

**Scope Concept:**
```
Scope = Range of IP addresses available for DHCP assignment

Components:
  - Subnet (network address)
  - Address range (start-end)
  - Exclusions (reserved addresses)
  - Lease duration
  - Options (gateway, DNS, etc.)

Example Scope:
  Network: 192.168.1.0/24
  Range: 192.168.1.100 - 192.168.1.200 (101 addresses)
  Exclusions: 192.168.1.150 - 192.168.1.155 (reserved for servers)
  Lease: 24 hours
  Gateway: 192.168.1.1
  DNS: 8.8.8.8, 8.8.4.4
```

**Multiple Scopes:**
```
One DHCP server can manage multiple scopes:

Scope 1: VLAN 10 (Sales)
  Network: 192.168.10.0/24
  Range: 192.168.10.100 - 192.168.10.200
  
Scope 2: VLAN 20 (Engineering)
  Network: 192.168.20.0/24
  Range: 192.168.20.100 - 192.168.20.200

Scope 3: VLAN 30 (Guest)
  Network: 192.168.30.0/24
  Range: 192.168.30.50 - 192.168.30.250

DHCP server determines which scope by:
  - Receiving subnet (relay agent includes)
  - Client's subnet (if on same network)
```

### Address Pool Design

**Planning Considerations:**
```
Questions to answer:
  1. How many devices need DHCP?
  2. How many concurrent devices?
  3. How many static IPs needed?
  4. Growth projections?
  5. Lease duration?

Example calculation:
  Subnet: 192.168.1.0/24 (254 usable hosts)
  
  Allocations:
    Network: 192.168.1.0 (unusable)
    Gateway: 192.168.1.1 (static)
    Servers: 192.168.1.2 - 192.168.1.50 (static, 49 addresses)
    Network devices: 192.168.1.51 - 192.168.1.70 (static, 20 addresses)
    Printers: 192.168.1.71 - 192.168.1.90 (static, 20 addresses)
    DHCP pool: 192.168.1.91 - 192.168.1.254 (164 addresses)
    Broadcast: 192.168.1.255 (unusable)
  
  Result: 164 DHCP addresses for dynamic assignment
```

**Reservation Strategy:**
```
Static vs Reservation:

Static IP:
  - Configured on device
  - Device never uses DHCP
  - Manual management
  - Used for: Routers, switches, critical servers

DHCP Reservation:
  - Configured on DHCP server
  - Device uses DHCP (gets same IP every time)
  - Centralized management
  - Used for: Printers, servers, cameras, APs

Best Practice:
  - Use static for network infrastructure (routers, firewalls)
  - Use reservations for services (printers, servers, APs)
  - Use dynamic DHCP for end-user devices (PCs, phones)
  - Reserve lower addresses for static/reservations
  - Use upper addresses for DHCP pool
```

### DHCP Reservations

**Configuration:**
```
Reservation based on MAC address:

Example:
  MAC: 00:1A:2B:3C:4D:5E
  Reserved IP: 192.168.1.50
  
Process:
  1. Client with MAC 00:1A:2B:3C:4D:5E sends Discover
  2. Server checks reservation table
  3. Finds match for this MAC
  4. Offers reserved IP 192.168.1.50
  5. Client always gets same IP

Advantages:
  - Consistent IP address
  - Centralized management
  - Device still uses DHCP (easier troubleshooting)
  - Can push updated configuration
  - Easier to update DNS

Use cases:
  - Network printers
  - File servers
  - IP cameras
  - Access points
  - VoIP phones
```

**Windows Server Reservation:**
```
PowerShell:
  Add-DhcpServerv4Reservation -ScopeId 192.168.1.0 `
    -IPAddress 192.168.1.50 `
    -ClientId "00-1A-2B-3C-4D-5E" `
    -Description "Color Printer - 3rd Floor"

GUI:
  1. Open DHCP console
  2. Expand server → IPv4 → Scope
  3. Right-click "Reservations"
  4. Select "New Reservation"
  5. Enter name, IP, MAC, description
```

**Linux ISC DHCP Reservation:**
```
/etc/dhcp/dhcpd.conf:

host colorprinter {
  hardware ethernet 00:1a:2b:3c:4d:5e;
  fixed-address 192.168.1.50;
  option host-name "printer-floor3";
}

host fileserver {
  hardware ethernet aa:bb:cc:dd:ee:ff;
  fixed-address 192.168.1.10;
  option host-name "fileserver1";
}

After editing:
  sudo systemctl restart isc-dhcp-server
```

### DHCP Options

**Common Options:**
```
Option 1: Subnet Mask
  Value: 255.255.255.0
  Purpose: Defines network boundary

Option 3: Default Gateway (Router)
  Value: 192.168.1.1
  Purpose: IP address of default gateway

Option 6: DNS Servers
  Value: 8.8.8.8, 8.8.4.4
  Purpose: Name resolution servers

Option 15: DNS Domain Name
  Value: example.com
  Purpose: Default domain suffix

Option 42: NTP Servers
  Value: 192.168.1.5
  Purpose: Time synchronization

Option 51: Lease Time
  Value: 86400 (seconds)
  Purpose: Lease duration

Option 66: TFTP Server
  Value: 192.168.1.20
  Purpose: PXE boot, phone provisioning

Option 67: Boot Filename
  Value: pxelinux.0
  Purpose: Network boot file

Option 150: TFTP Server (Cisco proprietary)
  Value: 192.168.1.20
  Purpose: Cisco phone provisioning

Option 119: Domain Search List
  Value: example.com, corp.example.com
  Purpose: Multiple domain searches
```

**Scope-Level vs Server-Level Options:**
```
Server-Level Options:
  - Apply to all scopes
  - Default values
  - Example: DNS servers, domain name

Scope-Level Options:
  - Apply to specific scope only
  - Override server-level
  - Example: Different gateways per subnet

Reservation-Level Options:
  - Apply to specific reservation
  - Override scope and server level
  - Example: Different TFTP server for specific phone

Precedence:
  Reservation > Scope > Server

Example:
  Server option 6: 8.8.8.8 (applies to all)
  Scope VLAN 20 option 6: 192.168.20.5 (overrides for VLAN 20)
  Reservation for printer option 6: 192.168.1.5 (overrides for this device)
```

**Configuration Examples:**
```
Windows Server (PowerShell):
  # Server-level option (DNS)
  Set-DhcpServerv4OptionValue -DnsServer 8.8.8.8, 8.8.4.4
  
  # Scope-level option (Gateway)
  Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 `
    -Router 192.168.1.1
  
  # Custom option (TFTP)
  Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 `
    -OptionId 66 -Value "192.168.1.20"

Linux ISC DHCP:
  /etc/dhcp/dhcpd.conf:
  
  # Global options
  option domain-name "example.com";
  option domain-name-servers 8.8.8.8, 8.8.4.4;
  
  # Subnet-specific
  subnet 192.168.1.0 netmask 255.255.255.0 {
    option routers 192.168.1.1;
    option ntp-servers 192.168.1.5;
    range 192.168.1.100 192.168.1.200;
  }
```

## DHCP Relay Agents

### Why Relay Agents?

**Broadcast Limitation:**
```
Problem:
  DHCP Discover = Layer 2 broadcast (ff:ff:ff:ff:ff:ff)
  Layer 3 broadcast (255.255.255.255)
  Routers don't forward broadcasts between subnets

Without relay:
  Each subnet needs own DHCP server
  50 subnets = 50 DHCP servers (expensive, complex)

With relay:
  One DHCP server
  Routers act as relay agents
  Forward DHCP messages between subnets
```

**How Relay Works:**
```
Client on VLAN 20:
  1. Client broadcasts DHCP Discover (255.255.255.255)
  
Router (Relay Agent):
  2. Receives broadcast on VLAN 20 interface
  3. Adds "giaddr" field (gateway interface address)
     giaddr = 192.168.20.1 (router's interface IP)
  4. Unicasts packet to DHCP server (192.168.10.5)
  
DHCP Server:
  5. Receives packet, examines giaddr
  6. Determines client is on 192.168.20.0/24
  7. Selects appropriate scope (VLAN 20 scope)
  8. Sends Offer back to relay (192.168.20.1)
  
Router (Relay Agent):
  9. Receives Offer from server
  10. Forwards to client on VLAN 20
  
Client:
  11. Receives Offer, continues with Request/ACK

Key: giaddr tells server which subnet client is on
```

### Relay Agent Configuration

**Cisco IOS:**
```
interface Vlan20
 ip address 192.168.20.1 255.255.255.0
 ip helper-address 192.168.10.5
 
Explanation:
  - Configure on interface facing clients
  - ip helper-address = DHCP server IP
  - Can specify multiple servers:
    ip helper-address 192.168.10.5
    ip helper-address 192.168.10.6
  - Forwards UDP broadcasts to specified servers

Protocols forwarded by ip helper-address:
  - DHCP (UDP 67, 68)
  - DNS (UDP 53)
  - TFTP (UDP 69)
  - NetBIOS (UDP 137, 138)
  - TACACS (UDP 49)
  - Time (UDP 37)
```

**Linux DHCP Relay:**
```
Install:
  Ubuntu/Debian: sudo apt install isc-dhcp-relay
  RHEL/CentOS: sudo yum install dhcp

Configure:
  /etc/default/isc-dhcp-relay:
  
  SERVERS="192.168.10.5"
  INTERFACES="eth0 eth1"
  OPTIONS=""

Start:
  sudo systemctl enable isc-dhcp-relay
  sudo systemctl start isc-dhcp-relay

Verify:
  sudo systemctl status isc-dhcp-relay
  sudo journalctl -u isc-dhcp-relay -f
```

**Windows Server:**
```
Install DHCP Relay:
  1. Add "Remote Access" role
  2. Select "Routing" role service
  3. Install LAN Routing
  4. Configure relay agent

Configuration:
  1. Open "Routing and Remote Access"
  2. Expand IPv4 → General
  3. Right-click → New Routing Protocol → DHCP Relay Agent
  4. Add interfaces
  5. Configure DHCP server IP addresses
```

**Multiple DHCP Servers:**
```
Redundancy configuration:

interface Vlan20
 ip helper-address 192.168.10.5
 ip helper-address 192.168.10.6

Result:
  - Client Discover relayed to both servers
  - Both servers send Offers
  - Client chooses first Offer received
  - Provides automatic failover
  
Best practice:
  - Split scope (50/50 address split between servers)
  - Or use DHCP failover (built-in replication)
```

## DHCPv6

### DHCPv6 vs DHCPv4

**Key Differences:**
```
DHCPv4:
  - Broadcasts (255.255.255.255)
  - Ports UDP 67/68
  - Provides IP, mask, gateway, DNS
  - DORA process

DHCPv6:
  - Multicasts (ff02::1:2)
  - Ports UDP 546/547
  - Provides IP, DNS (no gateway!)
  - SARR process (Solicit, Advertise, Request, Reply)
  - Gateway from Router Advertisement (RA), not DHCP
```

**Why DHCPv6 Different?**
```
IPv6 design philosophy:
  - No broadcast (multicast instead)
  - Router discovery via RA messages
  - Address configuration can be automatic (SLAAC)
  - DHCPv6 supplements, doesn't replace RA

Result:
  IPv6 hosts need BOTH:
    - RA messages (for gateway)
    - DHCPv6 (for DNS, domain, etc.)
```

### SLAAC vs DHCPv6

**Three Configuration Methods:**
```
1. SLAAC (Stateless Address Autoconfiguration)
   Router Advertisement flags: M=0, O=0
   
   Process:
     - Router sends RA with prefix (e.g., 2001:db8:1::/64)
     - Client generates address from prefix + EUI-64 or random
     - Client uses link-local of router as gateway
     - Client uses DNS from RA (if provided)
   
   Characteristics:
     - No DHCP server needed
     - Server doesn't track addresses (stateless)
     - Privacy extensions available
     - Limited configuration options

2. Stateless DHCPv6 (SLAAC + DHCPv6)
   Router Advertisement flags: M=0, O=1
   
   Process:
     - Client uses SLAAC for address (from RA)
     - Client contacts DHCPv6 for additional options
     - DHCPv6 provides DNS, domain name, NTP, etc.
     - No address tracking on DHCPv6 server
   
   Characteristics:
     - Best of both worlds
     - Automatic addressing with centralized configuration
     - Most common deployment

3. Stateful DHCPv6
   Router Advertisement flags: M=1, O=1 (or O=0)
   
   Process:
     - Client uses DHCPv6 for address
     - DHCPv6 server assigns and tracks addresses
     - Similar to DHCPv4 behavior
     - Client still needs RA for default gateway
   
   Characteristics:
     - Full address tracking
     - Centralized management
     - Required for PXE boot in IPv6
```

**RA Flags:**
```
Router Advertisement contains flags:

M flag (Managed Address Configuration):
  0 = Use SLAAC for address
  1 = Use DHCPv6 for address (stateful)

O flag (Other Configuration):
  0 = Don't use DHCPv6 for options
  1 = Use DHCPv6 for options (stateless)

Combinations:
  M=0, O=0: SLAAC only
  M=0, O=1: SLAAC + Stateless DHCPv6
  M=1, O=0: Stateful DHCPv6 (rare)
  M=1, O=1: Stateful DHCPv6
```

### DHCPv6 Messages

**SARR Process:**
```
S - Solicit     (Client: "Need IPv6 configuration")
A - Advertise   (Server: "I can help, here's what I offer")
R - Request     (Client: "I want your offer")
R - Reply       (Server: "Here's your configuration")

Similar to DORA but different names
```

**DHCPv6 Multicasts:**
```
All-DHCP-Relay-Agents-and-Servers: ff02::1:2
All-DHCP-Servers: ff05::1:3

Client sends to ff02::1:2 (link-local multicast)
Server responds to client's unicast or multicast address

Ports:
  Client: UDP 546
  Server: UDP 547
```

### DHCPv6 Configuration

**Stateless DHCPv6 (Most Common):**
```
Linux ISC DHCPv6:
  /etc/dhcp/dhcpd6.conf:
  
  option dhcp6.name-servers 2001:4860:4860::8888, 2001:4860:4860::8844;
  option dhcp6.domain-search "example.com";
  
  subnet6 2001:db8:1::/64 {
    # No range specified (stateless)
    # Only providing options, not addresses
  }

Windows Server:
  PowerShell:
  Set-DhcpServerv6OptionValue -DnsServer 2001:4860:4860::8888 `
    -DomainSearchList example.com
```

**Stateful DHCPv6:**
```
Linux ISC DHCPv6:
  /etc/dhcp/dhcpd6.conf:
  
  option dhcp6.name-servers 2001:4860:4860::8888;
  option dhcp6.domain-search "example.com";
  
  subnet6 2001:db8:1::/64 {
    range6 2001:db8:1::100 2001:db8:1::200;
    range6 2001:db8:1::/64 temporary;  # Privacy addresses
  }
  
  # Reservation (based on DUID, not MAC)
  host server1 {
    host-identifier option dhcp6.client-id 00:01:00:01:1a:2b:3c:4d:00:1a:2b:3c:4d:5e;
    fixed-address6 2001:db8:1::50;
  }

Windows Server:
  Add-DhcpServerv6Scope -Prefix 2001:db8:1:: -Name "VLAN 10"
  Add-DhcpServerv6Range -Prefix 2001:db8:1:: `
    -StartRange 2001:db8:1::100 -EndRange 2001:db8:1::200
```

**Router Configuration (Cisco):**
```
For stateless DHCPv6:
  interface GigabitEthernet0/1
   ipv6 address 2001:db8:1::1/64
   ipv6 nd other-config-flag
   ipv6 dhcp relay destination 2001:db8:10::5

For stateful DHCPv6:
  interface GigabitEthernet0/1
   ipv6 address 2001:db8:1::1/64
   ipv6 nd managed-config-flag
   ipv6 dhcp relay destination 2001:db8:10::5

Flags:
  ipv6 nd managed-config-flag    (sets M=1)
  ipv6 nd other-config-flag      (sets O=1)
```

## Troubleshooting DHCP

### Common Issues

**Client Can't Get IP Address:**
```
Symptoms:
  - APIPA address (169.254.x.x) on Windows
  - Link-local only (fe80::) on IPv6
  - "No DHCP offers received"
  - Network unreachable

Troubleshooting steps:

1. Verify client DHCP enabled:
   Windows: ipconfig /all (look for "DHCP Enabled: Yes")
   Linux: cat /etc/network/interfaces or nmcli

2. Check cable/wireless connection:
   Physical connectivity required
   Verify link status

3. Verify DHCP server reachable:
   If same subnet: Ping DHCP server
   If different subnet: Check relay agent

4. Verify DHCP service running:
   Server: Check DHCP service status
   Windows: Services → DHCP Server
   Linux: sudo systemctl status isc-dhcp-server

5. Check DHCP scope:
   Scope enabled?
   Addresses available in pool?
   Lease exhaustion?

6. Check firewall:
   UDP 67/68 allowed?
   Client and server firewalls

7. Verify relay agent (if needed):
   ip helper-address configured?
   Relay service running?

8. Capture packets:
   Wireshark filter: bootp or dhcp
   Look for Discover, Offer, Request, Acknowledge
   Identify where process fails
```

**Wrong IP Configuration:**
```
Symptoms:
  - IP address not in expected range
  - Wrong gateway
  - Wrong DNS servers

Troubleshooting:

1. Verify DHCP server scope:
   Check scope configuration
   Verify options configured

2. Check for rogue DHCP server:
   Another device offering DHCP
   Wireshark: See which server responding
   DHCP snooping can prevent

3. Verify relay agent:
   Check giaddr in DHCP packets
   Verify correct scope selected

4. Check reservation:
   Verify MAC address correct
   Reservation in right scope

5. Clear and renew lease:
   Windows: ipconfig /release, ipconfig /renew
   Linux: sudo dhclient -r eth0 && sudo dhclient eth0
```

**Lease Exhaustion:**
```
Symptoms:
  - DHCP server out of addresses
  - New clients can't get IP
  - Existing clients renew successfully

Solutions:

1. Expand address pool:
   Add more IPs to scope range
   
2. Reduce lease duration:
   Faster address recovery
   More frequent renewals

3. Check for address hoarding:
   Devices taking multiple IPs
   Virtual machines
   Identify and remediate

4. Clear old leases:
   Remove leases for offline devices
   Caution: May cause conflicts

5. Add additional subnet:
   If growth exceeds capacity
   Require network redesign
```

### Diagnostic Commands

**Windows:**
```
ipconfig /all
  - Show all IP configuration
  - DHCP server address
  - Lease obtained/expires time
  - DHCP enabled status

ipconfig /release
  - Release current DHCP lease

ipconfig /renew
  - Request new DHCP lease

ipconfig /displaydns
  - Show DNS resolver cache

netstat -an | findstr :67
  - Check if DHCP server listening

Get-DhcpServerv4Scope
  - Show all DHCP scopes (PowerShell)

Get-DhcpServerv4Lease -ScopeId 192.168.1.0
  - Show active leases (PowerShell)

Get-DhcpServerv4ScopeStatistics
  - Show scope utilization (PowerShell)
```

**Linux:**
```
ip addr show
  - Show IP configuration
  - Interface status

sudo dhclient -r eth0
  - Release DHCP lease

sudo dhclient eth0
  - Request new lease

sudo dhclient -v eth0
  - Verbose DHCP process

cat /var/lib/dhcp/dhclient.leases
  - Show lease file

sudo systemctl status isc-dhcp-server
  - Check DHCP server status

sudo journalctl -u isc-dhcp-server -f
  - Monitor DHCP server logs

dhcp-lease-list
  - List active leases (install from package)
```

**Packet Capture:**
```
Wireshark/tcpdump filters:

bootp
  - Capture all DHCP traffic

udp port 67 or udp port 68
  - DHCP ports

dhcp.option.dhcp == 1
  - DHCP Discover messages

dhcp.option.dhcp == 2
  - DHCP Offer messages

dhcp.option.dhcp == 3
  - DHCP Request messages

dhcp.option.dhcp == 5
  - DHCP Acknowledge messages

Example tcpdump:
  sudo tcpdump -i eth0 -n port 67 or port 68
```

## Summary

DHCP provides automatic IP address configuration, eliminating manual setup and reducing errors:

**Key Concepts:**
- **DORA Process**: Discover, Offer, Request, Acknowledge
- **Leases**: Temporary assignments with T1 (50%) renewal and T2 (87.5%) rebinding
- **Scopes**: Define address ranges, options, and lease durations
- **Reservations**: Assign specific IPs to specific MAC addresses
- **Options**: Provide additional configuration (gateway, DNS, domain, etc.)
- **Relay Agents**: Forward DHCP between subnets (ip helper-address)

**DHCPv6 Differences:**
- Uses multicast instead of broadcast
- SARR process instead of DORA
- Doesn't provide default gateway (from RA instead)
- Three modes: SLAAC only, Stateless DHCPv6, Stateful DHCPv6
- Ports UDP 546/547

**Best Practices:**
- Use reservations for servers, printers, and network devices
- Configure redundant DHCP servers
- Set appropriate lease durations for environment
- Document scope and reservation assignments
- Monitor scope utilization
- Implement DHCP snooping to prevent rogue servers
- Use relay agents for multi-subnet environments

**Troubleshooting Steps:**
1. Verify DHCP enabled on client
2. Check physical connectivity
3. Verify DHCP server running and reachable
4. Check scope configuration and availability
5. Verify relay agent configuration
6. Check firewall rules (UDP 67/68)
7. Use packet capture to identify failure point

## Additional Resources

- **RFC 2131**: Dynamic Host Configuration Protocol (DHCPv4)
- **RFC 8415**: Dynamic Host Configuration Protocol for IPv6 (DHCPv6)
- **RFC 4861**: Neighbor Discovery for IPv6 (includes RA)
- **CompTIA Network+ N10-008**: Domain 1.6 - DHCP concepts
- **ISC DHCP**: dhcp.isc.org
- **Microsoft DHCP**: docs.microsoft.com/windows-server/networking/technologies/dhcp

## Practice Exercises

1. Configure DHCP scope for 192.168.50.0/24, range .100-.200, 48-hour lease

2. What happens at each stage if T1 renewal fails but T2 succeeds?

3. Create DHCP reservation for printer MAC 00:11:22:33:44:55 → IP 192.168.1.75

4. Configure ip helper-address on Cisco router for remote DHCP server

5. Client gets 169.254.x.x address. List five possible causes.

6. Calculate scope utilization: 200 addresses, 180 leased. What percentage?

7. Configure stateless DHCPv6 to provide DNS 2001:4860:4860::8888

**Answers:**
1. Range 192.168.50.100-200, lease 172800 seconds, gateway .1, subnet mask /24
2. T1 fails → client continues using IP → T2 broadcast → any server responds → lease renewed
3. Add reservation with MAC, assign 192.168.1.75, configure on DHCP server
4. `interface vlan X` then `ip helper-address <DHCP_server_IP>`
5. DHCP server down, no relay agent, firewall blocking, scope exhausted, cable unplugged
6. 180/200 = 90% utilization (consider expanding scope)
7. Set M=0, O=1 on router RA; configure DHCPv6 server with DNS option only (no address range)
