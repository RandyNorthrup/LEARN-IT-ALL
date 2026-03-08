---
id: lesson-008-common-protocols
title: Common Network Protocols and Services
chapterId: ch1-networking-fundamentals
order: 8
duration: 70
objectives:
  - Identify and explain common network protocols and their functions
  - Understand port numbers and protocol associations
  - Recognize protocols by their typical use cases
  - Differentiate between encrypted and unencrypted protocol versions
  - Understand protocol selection for specific networking scenarios
---

# Lesson 8: Common Network Protocols and Services

## Learning Objectives
- Identify and explain common network protocols and their functions
- Understand port numbers and protocol associations
- Recognize protocols by their typical use cases
- Differentiate between encrypted and unencrypted protocol versions
- Understand protocol selection for specific networking scenarios

## Introduction

Network protocols are the rules and standards that enable devices to communicate. Understanding common protocols, their purposes, and port numbers is essential for network administration, troubleshooting, and security.

This lesson covers the most important protocols you'll encounter in the CompTIA Network+ exam and real-world networking.

---

## Protocol Categories

Protocols can be categorized by their primary function:

**1. Application Services:** HTTP, HTTPS, FTP, SFTP, TFTP  
**2. Email:** SMTP, POP3, IMAP  
**3. Network Services:** DNS, DHCP, NTP  
**4. Remote Access:** SSH, Telnet, RDP, VNC  
**5. Directory Services:** LDAP, Kerberos  
**6. Network Management:** SNMP, Syslog  
**7. File Sharing:** SMB, NFS  
**8. Voice/Video:** SIP, RTP, H.323  

---

## Web and File Transfer Protocols

### HTTP (HyperText Transfer Protocol)
**Port:** 80 (TCP)  
**Purpose:** Web page transfer  
**Security:** None (plain text)  

**Characteristics:**
- Request-response protocol
- Stateless (cookies add state)
- Methods: GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH
- Status codes: 200 (OK), 404 (Not Found), 500 (Server Error)

**Example Request:**
```http
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
```

**When to use:** Internal applications, development environments (never for sensitive data)

### HTTPS (HTTP Secure)
**Port:** 443 (TCP)  
**Purpose:** Secure web page transfer  
**Security:** TLS/SSL encryption  

**Characteristics:**
- Encrypts all HTTP traffic
- Server authentication via certificates
- Protects against eavesdropping and tampering
- SEO benefit (Google ranks HTTPS higher)
- Required for sensitive data (passwords, credit cards)

**Certificate Components:**
- Public key
- Issued to (domain name)
- Issued by (Certificate Authority)
- Validity period

**When to use:** All modern websites, especially those handling sensitive information

### FTP (File Transfer Protocol)
**Ports:** 20 (TCP data), 21 (TCP control)  
**Purpose:** File transfer between systems  
**Security:** None (credentials and data in clear text)  

**Characteristics:**
- Separate control and data connections
- Active mode: Server connects back to client
- Passive mode: Client initiates both connections
- Supports authentication (username/password)
- Directory navigation (list, change directory)

**Active vs Passive FTP:**

**Active FTP:**
```
Client → Server (Port 21): Control connection
Server → Client: Data connection (Port 20 to client port)
```
- Problem: Client firewall may block incoming server connection

**Passive FTP:**
```
Client → Server (Port 21): Control connection
Client → Server (High port): Data connection initiated by client
```
- Solution: Client initiates both connections, firewall-friendly

**When to use:** Legacy systems, internal networks (not secure for Internet)

### FTPS (FTP Secure)
**Ports:** 989 (data), 990 (control) for Implicit, or 21 for Explicit  
**Purpose:** Secure file transfer  
**Security:** TLS/SSL encryption  

**Two modes:**
- **Implicit FTPS:** TLS from start, ports 989/990
- **Explicit FTPS:** Start plain, upgrade to TLS (FTPS), port 21

**When to use:** Secure file transfers when SFTP not available

### SFTP (SSH File Transfer Protocol)
**Port:** 22 (TCP)  
**Purpose:** Secure file transfer over SSH  
**Security:** SSH encryption  

**Characteristics:**
- Not the same as FTPS (different protocols)
- Runs over SSH (single connection)
- Encrypted authentication and data
- Supports key-based authentication
- Directory operations, file permissions
- Modern preferred method for secure file transfer

**When to use:** Secure file transfers, automated backups, remote management

### TFTP (Trivial File Transfer Protocol)
**Port:** 69 (UDP)  
**Purpose:** Simple, lightweight file transfer  
**Security:** None  

**Characteristics:**
- Uses UDP (fast, no reliability)
- No authentication
- No directory listing
- Minimal overhead
- Often used for:
  - Router/switch configuration backups
  - PXE network booting
  - Firmware updates on embedded devices

**When to use:** Network device configs, PXE boot, firmware updates (internal networks only)

---

## Email Protocols

### SMTP (Simple Mail Transfer Protocol)
**Ports:** 25 (server-to-server), 587 (client submission with TLS)  
**Purpose:** Sending email  
**Security:** Optional (STARTTLS on port 587)  

**Characteristics:**
- Text-based protocol
- Push protocol (sends email)
- Server-to-server relay (port 25)
- Client submission (port 587, requires auth)
- Commands: HELO, MAIL FROM, RCPT TO, DATA, QUIT

**SMTP Process:**
```
Client → Mail Server (Port 587): Submit email
Mail Server → Recipient Server (Port 25): Relay email
```

**When to use:** Always required for sending email

### POP3 (Post Office Protocol version 3)
**Ports:** 110 (plain), 995 (SSL/TLS - POP3S)  
**Purpose:** Download email from server  
**Security:** Optional SSL/TLS  

**Characteristics:**
- Download-and-delete model (typically)
- Email removed from server after download
- Single-device access pattern
- Simple protocol
- Limited folder support

**POP3 Commands:**
```
USER username
PASS password
LIST (list messages)
RETR # (retrieve message)
DELE # (delete message)
QUIT
```

**When to use:** Single-device email access, offline email storage

### IMAP (Internet Message Access Protocol)
**Ports:** 143 (plain), 993 (SSL/TLS - IMAPS)  
**Purpose:** Access email on server  
**Security:** Optional SSL/TLS  

**Characteristics:**
- Email stays on server
- Multi-device synchronization
- Folder management
- Partial message downloads
- Search capabilities
- More complex than POP3
- Modern preferred method

**IMAP vs POP3:**
| Feature | IMAP | POP3 |
|---------|------|------|
| **Email location** | Server | Client |
| **Multi-device** | Yes | No |
| **Folders** | Full support | Limited |
| **Offline access** | With caching | Native |
| **Storage** | Server storage used | Client storage used |

**When to use:** Modern email access, multiple devices, cloud-based email

---

## Network Services

### DNS (Domain Name System)
**Port:** 53 (UDP for queries, TCP for zone transfers)  
**Purpose:** Resolve domain names to IP addresses  
**Security:** DNSSEC available  

**Characteristics:**
- Hierarchical distributed database
- Converts names (example.com) to IPs (93.184.216.34)
- Uses caching to improve performance
- Multiple record types

**DNS Record Types:**
| Type | Purpose | Example |
|------|---------|---------|
| **A** | IPv4 address | example.com → 192.0.2.1 |
| **AAAA** | IPv6 address | example.com → 2001:db8::1 |
| **CNAME** | Canonical name (alias) | www → example.com |
| **MX** | Mail exchange | mail.example.com (priority 10) |
| **PTR** | Reverse lookup (IP to name) | 1.2.0.192.in-addr.arpa → example.com |
| **NS** | Name server | ns1.example.com |
| **SOA** | Start of authority | Zone metadata |
| **TXT** | Text records | SPF, DKIM, domain verification |
| **SRV** | Service records | _ldap._tcp.example.com |

**DNS Query Process:**
1. Client checks local cache
2. Queries configured DNS server (recursive resolver)
3. Recursive resolver queries root servers → TLD servers → authoritative servers
4. Result cached and returned to client

**When to use:** Always required for user-friendly naming

### DHCP (Dynamic Host Configuration Protocol)
**Ports:** 67 (server), 68 (client) UDP  
**Purpose:** Automatic IP address assignment  
**Security:** None (can be secured with DHCP snooping)  

**Characteristics:**
- Automatically configures network settings
- Provides IP address, subnet mask, default gateway, DNS servers
- Lease-based (temporary assignment)
- DORA process

**DORA Process:**
1. **D**iscover: Client broadcasts "I need an IP" (broadcast)
2. **O**ffer: Server offers IP address (unicast or broadcast)
3. **R**equest: Client requests offered IP (broadcast)
4. **A**cknowledge: Server confirms assignment (unicast or broadcast)

**DHCP Lease:**
- Default lease time: Often 24 hours to 7 days
- Renewal: Client renews at 50% of lease time (T1)
- Rebinding: If renewal fails, tries at 87.5% (T2)
- Release: Client can voluntarily release IP

**DHCP Options:**
- Option 1: Subnet mask
- Option 3: Default gateway (router)
- Option 6: DNS servers
- Option 15: Domain name
- Option 51: Lease time
- Option 66: TFTP server (for PXE boot)

**When to use:** Workstations, mobile devices, BYOD networks

### NTP (Network Time Protocol)
**Port:** 123 (UDP)  
**Purpose:** Clock synchronization across network devices  
**Security:** NTPsec, authenticated NTP  

#### Why Time Synchronization Matters

Accurate, consistent time across every device on a network is not optional — it is a foundational requirement. NTP ensures all devices agree on what time it is, which is critical for:

- **Log correlation and forensics:** Security analysts must correlate events across firewalls, servers, and endpoints. If clocks differ by even seconds, reconstructing an attack timeline becomes unreliable.
- **Kerberos authentication:** Kerberos tickets include timestamps and enforce a maximum clock skew of **±5 minutes** by default. If a workstation's clock drifts beyond that window, authentication fails.
- **Certificate validation:** TLS/SSL certificates have validity periods (Not Before / Not After). Incorrect system time can cause valid certificates to appear expired or not-yet-valid.
- **Scheduled tasks and backups:** Cron jobs, scheduled scripts, and backup windows depend on accurate clocks.
- **Regulatory compliance:** Standards like PCI-DSS and HIPAA require accurate timestamps on audit logs.

#### NTP Stratum Hierarchy

NTP uses a hierarchical **stratum** model to distribute time from highly accurate sources down to end devices:

| Stratum | Description | Example |
|---------|-------------|---------|
| **0** | Reference clocks — the most accurate time sources | Atomic clocks, GPS receivers, radio clocks (WWVB) |
| **1** | Servers directly connected to a Stratum 0 source | time.nist.gov, GPS-disciplined NTP servers |
| **2** | Servers that synchronize from Stratum 1 | pool.ntp.org members, corporate NTP servers |
| **3-15** | Each stratum syncs from the one above it; accuracy decreases with each hop | Department servers, workstations |
| **16** | Unsynchronized — device has not successfully synced with any source | Indicates an NTP configuration problem |

The lower the stratum number, the closer the device is to an authoritative time source and the more accurate its clock.

#### NTP Operation

- **Transport:** UDP port **123**
- **Modes:**
  - **Client-server:** Client polls a server for time (most common)
  - **Peer (symmetric):** Two servers synchronize with each other for redundancy
  - **Broadcast/multicast:** Server pushes time to many clients (less accurate)
- **Polling interval:** Clients query servers periodically (default: 64–1024 seconds, adjusts dynamically)
- **Clock offset calculation:** NTP measures the round-trip delay between client and server and compensates for network latency to calculate the true time offset. The algorithm uses multiple samples to filter out jitter and select the best time source.

**NTP Adjustment:**
- **Slewing:** Gradually adjusting the clock speed to correct small offsets (preferred — avoids time jumps)
- **Stepping:** Immediately jumping the clock to the correct time for large offsets (>128 ms by default)

#### NTP Security

NTP itself has several security considerations:

- **NTP amplification attacks:** Attackers send small queries with spoofed source addresses to NTP servers. The servers reply with much larger responses directed at the victim, creating a **DDoS amplification attack**. The `monlist` command (now disabled by default) was particularly abused because it returned a large list of recent clients.
- **Time spoofing:** If an attacker can manipulate NTP responses, they can shift a target's clock to bypass certificate validation, Kerberos authentication, or log integrity.

**Mitigation and best practices:**
- **NTPsec:** A hardened fork of the NTP reference implementation with improved security defaults
- **Authenticated NTP:** Uses symmetric keys or autokey (public key) to verify that time responses come from trusted servers
- **Restrict directives:** Limit which hosts can query or configure the NTP daemon:
  ```
  restrict default kod nomodify notrap nopeer noquery
  restrict 192.168.1.0 mask 255.255.255.0 nomodify notrap
  ```
- Disable `monlist` and other information-leaking commands
- Use access control lists on firewalls to restrict NTP traffic

#### SNTP (Simple Network Time Protocol)

**SNTP** is a simplified subset of NTP designed for devices that do not need full NTP accuracy:

- **Lighter weight:** Fewer calculations, smaller code footprint — ideal for embedded devices, IP cameras, and IoT sensors
- **Less accurate:** Does not implement the full clock discipline algorithms of NTP; typically accurate to within tens of milliseconds rather than microseconds
- **Same port:** Also uses UDP port 123 and is interoperable with NTP servers
- **Use case:** Devices where approximate time is sufficient and processing resources are limited

**Public NTP Servers:**
- time.nist.gov
- pool.ntp.org
- time.google.com
- time.windows.com

**When to use:** All networked devices for accurate timekeeping. Use full NTP for servers and infrastructure; SNTP for lightweight or embedded devices.

---

## Remote Access Protocols

### SSH (Secure Shell)
**Port:** 22 (TCP)  
**Purpose:** Secure remote access and file transfer  
**Security:** Strong encryption  

**Characteristics:**
- Replaces Telnet securely
- Encrypted authentication and data
- Key-based authentication supported
- Port forwarding (tunneling)
- Includes SFTP and SCP
- Common implementations: OpenSSH, PuTTY

**SSH Authentication Methods:**
- **Password:** Username and password
- **Public key:** More secure, no password needed
- **Certificate:** PKI-based authentication

**SSH Uses:**
- Remote command-line access
- Secure file transfer (SFTP, SCP)
- Port forwarding/tunneling
- Remote command execution

**When to use:** Secure remote management of Linux/Unix systems, network devices

### Telnet
**Port:** 23 (TCP)  
**Purpose:** Remote terminal access  
**Security:** None (all data in clear text)  

**Characteristics:**
- Unencrypted remote access
- Credentials visible to packet sniffers
- Legacy protocol
- Still used for:
  - Testing port connectivity (`telnet host port`)
  - Legacy device management (old switches/routers)
  - Local trusted networks

**Security Risk Example:**
```
User: admin
Password: Passw0rd!  ← Visible in packet capture
```

**When to use:** Testing connectivity, legacy devices (internal networks only)

### RDP (Remote Desktop Protocol)
**Port:** 3389 (TCP)  
**Purpose:** Windows remote desktop access  
**Security:** Encryption available (TLS)  

**Characteristics:**
- Microsoft protocol
- Graphical remote control
- Built into Windows
- Sound, clipboard, printer redirection
- Multi-monitor support
- Network Level Authentication (NLA)

**RDP Security:**
- Use Network Level Authentication
- Enable TLS encryption
- Use strong passwords or certificates
- Implement account lockout policies
- Consider VPN for Internet access
- Change default port (security through obscurity)

**When to use:** Remote Windows administration, remote work, helpdesk support

### VNC (Virtual Network Computing)
**Port:** 5900+ (TCP, 5900 + display number)  
**Purpose:** Platform-independent remote desktop  
**Security:** Usually weak (encryption varies)  

**Characteristics:**
- Cross-platform (Windows, Linux, macOS)
- Multiple implementations (RealVNC, TightVNC, UltraVNC, TigerVNC)
- Generally less secure than RDP
- Performance varies by implementation
- Can tunnel over SSH for security

**VNC Display Numbers:**
- Display :0 → Port 5900
- Display :1 → Port 5901
- Display :2 → Port 5902

**When to use:** Remote access to non-Windows systems, cross-platform support

---

## Directory and Authentication Services

### LDAP (Lightweight Directory Access Protocol)
**Ports:** 389 (TCP), 636 (LDAPS with SSL/TLS)  
**Purpose:** Access and maintain directory services  
**Security:** Optional TLS (LDAPS)  

**Characteristics:**
- Hierarchical directory structure
- Used by Active Directory
- Store user accounts, groups, computers
- Authentication and authorization
- LDAP queries (filters)

**LDAP Structure:**
```
dc=example,dc=com (domain)
  └── ou=Users (organizational unit)
       └── cn=John Doe (common name)
            ├── mail: john@example.com
            ├── telephoneNumber: 555-1234
            └── title: Network Administrator
```

**Common LDAP Operations:**
- Bind (authenticate)
- Search (query)
- Add (create entry)
- Modify (update entry)
- Delete (remove entry)

**When to use:** Enterprise authentication, centralized user management

### Kerberos
**Port:** 88 (TCP/UDP)  
**Purpose:** Network authentication protocol  
**Security:** Strong authentication  

**Characteristics:**
- Ticket-based authentication
- Single Sign-On (SSO)
- Used by Active Directory
- Mutual authentication
- Time-sensitive (requires synchronized clocks, ±5 min)

**Kerberos Process:**
1. Client → KDC: Request Ticket Granting Ticket (TGT)
2. KDC → Client: TGT (encrypted with user password)
3. Client → KDC: Request service ticket using TGT
4. KDC → Client: Service ticket
5. Client → Server: Present service ticket
6. Server → Client: Grant access

**Components:**
- **KDC:** Key Distribution Center (Domain Controller)
- **TGT:** Ticket Granting Ticket
- **Realm:** Kerberos domain (EXAMPLE.COM)

**When to use:** Windows Active Directory environments, enterprise SSO

### RADIUS (Remote Authentication Dial-In User Service)
**Ports:** 1812 (auth), 1813 (accounting) UDP  
**Purpose:** Centralized AAA (Authentication, Authorization, Accounting)  
**Security:** Shared secret, MD5  

**Characteristics:**
- Client-server model
- Used for network access control
- 802.1X wireless authentication
- VPN authentication
- Encrypts password only (not entire packet)

**RADIUS Flow:**
```
User → Network Device (NAS) → RADIUS Server
                                 ↓
                        Verify credentials
                                 ↓
                        Accept/Reject → NAS → User
```

**When to use:** Wireless authentication (802.1X), VPN access, network device management

### TACACS+ (Terminal Access Controller Access-Control System Plus)
**Port:** 49 (TCP)  
**Purpose:** Cisco AAA protocol  
**Security:** Encrypts entire packet  

**Characteristics:**
- Cisco proprietary
- Separates authentication, authorization, accounting
- Encrypts entire packet (vs RADIUS password only)
- Uses TCP (more reliable than RADIUS UDP)
- More granular control than RADIUS

**TACACS+ vs RADIUS:**
| Feature | TACACS+ | RADIUS |
|---------|---------|--------|
| **Encryption** | Full packet | Password only |
| **Protocol** | TCP (port 49) | UDP (1812, 1813) |
| **AAA** | Separate | Combined |
| **Vendor** | Cisco | Open standard |
| **Use case** | Device administration | Network access |

**When to use:** Cisco network device administration

---

## Network Management

### SNMP (Simple Network Management Protocol)
**Ports:** 161 (queries), 162 (traps) UDP  
**Purpose:** Network device monitoring and management  
**Security:** SNMPv3 has encryption  

**Characteristics:**
- Manager-agent model
- Collect statistics (bandwidth, CPU, memory)
- Configure devices remotely
- Trap messages (alerts)

**SNMP Versions:**
- **SNMPv1:** Original, community strings (plain text)
- **SNMPv2c:** Improved performance, still community strings
- **SNMPv3:** Authentication and encryption (use this!)

**SNMP Operations:**
- **GET:** Retrieve single value
- **GET-NEXT:** Retrieve next value
- **GET-BULK:** Retrieve multiple values
- **SET:** Modify configuration
- **TRAP:** Unsolicited alert from agent

**MIB (Management Information Base):**
- Database of manageable objects
- OID (Object Identifier): Unique identifier
- Example: 1.3.6.1.2.1.1.1.0 (system description)

**When to use:** Network monitoring, performance management, device configuration

### Syslog
**Port:** 514 (UDP)  
**Purpose:** Centralized logging  
**Security:** None (can use TLS)  

**Characteristics:**
- Collect logs from multiple devices
- Centralized log storage
- Correlation and analysis
- Severity levels 0-7

**Syslog Severity Levels:**
| Level | Name | Description |
|-------|------|-------------|
| **0** | Emergency | System unusable |
| **1** | Alert | Immediate action required |
| **2** | Critical | Critical condition |
| **3** | Error | Error condition |
| **4** | Warning | Warning condition |
| **5** | Notice | Normal but significant |
| **6** | Informational | Informational message |
| **7** | Debug | Debug-level message |

**Syslog Message Format:**
```
<Priority>Timestamp Hostname Process[PID]: Message
```

**When to use:** Log aggregation, security monitoring, troubleshooting

---

## File Sharing Protocols

### SMB (Server Message Block)
**Port:** 445 (TCP), legacy: 137-139  
**Purpose:** Windows file and printer sharing  
**Security:** SMB3+ encrypted  

**Characteristics:**
- Microsoft protocol
- Also called CIFS (older versions)
- Network drive mapping (Z:)
- Printer sharing
- Modern versions support encryption

**SMB Versions:**
- **SMB1:** Obsolete, major security issues (WannaCry), disable it!
- **SMB2:** Windows Vista+, significant improvements
- **SMB3:** Windows 8+, encryption, better performance

**When to use:** Windows file sharing, network drives

### NFS (Network File System)
**Port:** 2049 (TCP/UDP)  
**Purpose:** Unix/Linux file sharing  
**Security:** NFSv4 has Kerberos support  

**Characteristics:**
- Unix/Linux file sharing
- Mount remote directories locally
- Transparent file access
- Versions: NFSv3 (common), NFSv4 (modern)

**NFS vs SMB:**
- **NFS:** Unix/Linux native
- **SMB:** Windows native
- Both can work cross-platform with proper configuration

**When to use:** Linux file sharing, Unix environments

---

## Voice and Video Protocols

### SIP (Session Initiation Protocol)
**Ports:** 5060 (UDP/TCP), 5061 (TLS)  
**Purpose:** VoIP call setup and management  
**Security:** TLS available  

**Characteristics:**
- Signaling protocol (not voice transport)
- Call setup, modification, teardown
- Video conferencing
- Instant messaging
- Works with RTP for actual media

**SIP Messages:**
- **INVITE:** Initiate call
- **ACK:** Confirm invitation
- **BYE:** End call
- **CANCEL:** Cancel pending invitation
- **REGISTER:** Register with SIP server

**When to use:** VoIP phone systems, video conferencing

### RTP (Real-time Transport Protocol)
**Ports:** Dynamic (typically 16384-32767) UDP  
**Purpose:** Audio/video delivery  
**Security:** SRTP (Secure RTP)  

**Characteristics:**
- Delivers audio and video streams
- Works with SIP (signaling)
- Low latency
- Sequence numbers for ordering
- Timestamp for synchronization
- Does not guarantee delivery (UDP)

**When to use:** VoIP, video conferencing (always paired with signaling protocol)

---

## Protocol Security Comparison

| Insecure | Secure Alternative | Port Change |
|----------|-------------------|-------------|
| **HTTP (80)** | HTTPS (443) | 80 → 443 |
| **FTP (21)** | FTPS (990) or SFTP (22) | 21 → 990 or 22 |
| **Telnet (23)** | SSH (22) | 23 → 22 |
| **SMTP (25)** | SMTP+TLS (587) | 25 → 587 |
| **POP3 (110)** | POP3S (995) | 110 → 995 |
| **IMAP (143)** | IMAPS (993) | 143 → 993 |
| **LDAP (389)** | LDAPS (636) | 389 → 636 |
| **SNMP v1/v2 (161)** | SNMPv3 (161) | Same port, different version |

---

## Summary

Understanding common protocols is essential for network administration and troubleshooting:

**Key Protocol Categories:**
- **Web:** HTTP (80), HTTPS (443)
- **File Transfer:** FTP (20/21), SFTP (22), TFTP (69)
- **Email:** SMTP (25/587), POP3 (110/995), IMAP (143/993)
- **Network Services:** DNS (53), DHCP (67/68), NTP (123)
- **Remote Access:** SSH (22), Telnet (23), RDP (3389)
- **Directory:** LDAP (389/636), Kerberos (88)
- **Management:** SNMP (161/162), Syslog (514)
- **File Sharing:** SMB (445), NFS (2049)

**Security Best Practices:**
- Always use encrypted versions when available
- Disable insecure protocols (Telnet, FTP, SNMPv1/v2)
- Use strong authentication
- Keep protocols updated
- Monitor protocol usage for anomalies

---

## Practice Questions

**Q1.** A network administrator needs to allow secure remote command-line access to a Linux server. Which protocol should be used?

A) Telnet (port 23)
B) SSH (port 22)
C) RDP (port 3389)
D) FTP (port 21)

<details>
<summary>Answer</summary>

**B)** SSH (Secure Shell) on port 22 provides encrypted remote command-line access. Telnet (port 23) provides the same functionality but transmits everything in clear text, including passwords, making it insecure. RDP is for remote desktop (graphical) access to Windows systems, and FTP is for file transfer, not remote access.
</details>

**Q2.** Which protocol and port combination is used for secure web browsing?

A) HTTP on port 80
B) HTTPS on port 443
C) FTP on port 21
D) SSH on port 22

<details>
<summary>Answer</summary>

**B)** HTTPS (HTTP Secure) operates on TCP port 443 and uses TLS/SSL encryption to secure web traffic. HTTP on port 80 transmits data in plain text without encryption. HTTPS protects against eavesdropping and tampering and is required for handling sensitive data like passwords and credit card information.
</details>

**Q3.** An email client is configured to retrieve mail using a protocol that keeps messages on the server and synchronizes across multiple devices. Which protocol is being used?

A) SMTP on port 25
B) POP3 on port 110
C) IMAP on port 143
D) SNMP on port 161

<details>
<summary>Answer</summary>

**C)** IMAP (Internet Message Access Protocol) on port 143 keeps messages stored on the server and allows synchronization across multiple devices. POP3 typically downloads and deletes messages from the server. SMTP is for sending email, not retrieving it. SNMP is for network management, not email.
</details>

**Q4.** A network technician needs to transfer firmware to a switch using a lightweight protocol with no authentication. Which protocol is most appropriate?

A) FTP
B) SFTP
C) TFTP
D) SCP

<details>
<summary>Answer</summary>

**C)** TFTP (Trivial File Transfer Protocol) on UDP port 69 is a lightweight, simple file transfer protocol with no authentication, commonly used for firmware updates, PXE network booting, and router/switch configuration transfers. FTP has authentication, and SFTP/SCP use SSH encryption — all have more overhead than needed for this scenario on an internal network.
</details>

**Q5.** Which two ports does FTP use, and what are their respective functions?

A) Port 20 for control, Port 21 for data
B) Port 21 for control, Port 20 for data
C) Port 22 for control, Port 23 for data
D) Port 80 for control, Port 443 for data

<details>
<summary>Answer</summary>

**B)** FTP uses port 21 for the control connection (sending commands like login, directory listing, file requests) and port 20 for the data connection (actual file transfer) in active mode. This dual-port architecture separates command signaling from data transfer.
</details>

**Q6.** A company's network time on all devices is drifting from the correct time, causing authentication failures. Which protocol should be configured to synchronize time across the network?

A) DNS (port 53)
B) DHCP (port 67/68)
C) NTP (port 123)
D) SNMP (port 161)

<details>
<summary>Answer</summary>

**C)** NTP (Network Time Protocol) on UDP port 123 synchronizes clocks across network devices. Accurate time is critical for authentication (Kerberos), logging, certificates, and troubleshooting. DNS resolves names to IP addresses, DHCP assigns IP configurations, and SNMP monitors and manages network devices.
</details>

**Q7.** Which protocol pair is used for DHCP communication, and which ports do they use?

A) TCP ports 67 and 68
B) UDP port 67 (server) and UDP port 68 (client)
C) TCP port 53 and UDP port 53
D) UDP ports 161 and 162

<details>
<summary>Answer</summary>

**B)** DHCP uses UDP port 67 for the server and UDP port 68 for the client. DHCP uses UDP because clients don't yet have an IP address when requesting one, so they can't establish a TCP connection. The DORA process (Discover, Offer, Request, Acknowledge) uses broadcast/unicast UDP messages.
</details>

**Q8.** A security auditor recommends replacing an insecure protocol used for network device management that transmits community strings in clear text. Which protocol versions address this concern?

A) Replace SNMPv1/v2c with SNMPv3
B) Replace HTTP with FTP
C) Replace SSH with Telnet
D) Replace HTTPS with HTTP

<details>
<summary>Answer</summary>

**A)** SNMPv1 and SNMPv2c transmit community strings (effectively passwords) in clear text. SNMPv3 adds authentication, encryption, and message integrity, making it the secure option for network management. The other options would actually decrease security, not improve it.
</details>

**Q9.** Which protocol is used for secure directory services and operates on port 636?

A) LDAP
B) LDAPS
C) Kerberos
D) RADIUS

<details>
<summary>Answer</summary>

**B)** LDAPS (LDAP over SSL/TLS) operates on port 636 and provides encrypted directory service communication. Standard LDAP uses port 389 without encryption. Kerberos uses port 88 for authentication, and RADIUS uses ports 1812/1813 for authentication and accounting.
</details>

**Q10.** A web server receives a request and returns a status code of 404. What does this indicate?

A) The request was successful
B) The server encountered an internal error
C) The requested resource was not found
D) The client needs to authenticate

<details>
<summary>Answer</summary>

**C)** HTTP status code 404 means "Not Found" — the requested resource (page, file, etc.) does not exist on the server. Status code 200 indicates success, 500 indicates a server internal error, and 401 indicates authentication is required. Status codes in the 4xx range indicate client-side errors.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 1.5**: Common Ports and Protocols
- **CompTIA Network+ N10-009 Objective 1.6**: Network Services
- **IANA Port Number Registry**
- **Professor Messer**: N10-009 Network+ Course