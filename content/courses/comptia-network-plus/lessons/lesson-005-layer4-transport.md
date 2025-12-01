---
id: layer4-transport
title: Layer 4 - The Transport Layer
chapterId: ch1-networking-fundamentals
order: 5
duration: 50
objectives:
  - Understand the functions of the Transport layer
  - Compare and contrast TCP and UDP protocols
  - Explain port numbers and their role in communication
  - Understand the TCP three-way handshake
  - Identify common port numbers and their services
  - Explain flow control and reliability mechanisms
---

# Lesson 5: Layer 4 - The Transport Layer

## Learning Objectives
- Understand the functions of the Transport layer
- Compare and contrast TCP and UDP protocols
- Explain port numbers and their role in communication
- Understand the TCP three-way handshake
- Identify common port numbers and their services
- Explain flow control and reliability mechanisms

## Introduction

The **Transport layer** (Layer 4) provides end-to-end communication services for applications. It's responsible for segmenting data, ensuring reliable delivery (if needed), and managing connections between applications.

### Key Responsibilities

1. **Segmentation** - Breaking data into smaller segments
2. **Connection establishment** - Setting up communication sessions (TCP)
3. **Reliability** - Ensuring data arrives intact and in order (TCP)
4. **Flow control** - Managing data transmission rate
5. **Error detection and recovery** - Detecting and retransmitting lost data
6. **Multiplexing** - Using port numbers to distinguish multiple connections

---

## Transport Layer Protocols

Two main protocols operate at Layer 4:

| Feature | TCP | UDP |
|---------|-----|-----|
| **Full Name** | Transmission Control Protocol | User Datagram Protocol |
| **Connection** | Connection-oriented | Connectionless |
| **Reliability** | Reliable | Unreliable |
| **Ordering** | Guarantees order | No ordering |
| **Speed** | Slower | Faster |
| **Overhead** | Higher | Lower |
| **Error Checking** | Yes | Minimal |
| **Flow Control** | Yes | No |
| **Use Cases** | Web, email, file transfer | Streaming, DNS, VoIP |

---

## TCP (Transmission Control Protocol)

**TCP** is a connection-oriented, reliable protocol that ensures data arrives intact and in order.

### TCP Characteristics

**Connection-Oriented:**
- Establishes connection before data transfer (three-way handshake)
- Maintains connection state
- Gracefully terminates connection (four-way teardown)

**Reliable Delivery:**
- Acknowledgments (ACKs) confirm receipt
- Retransmission of lost segments
- Sequence numbers ensure proper ordering
- Checksums detect corruption

**Flow Control:**
- Sliding window mechanism
- Prevents sender from overwhelming receiver
- Dynamic adjustment based on network conditions

**Congestion Control:**
- Detects network congestion
- Reduces transmission rate when congestion occurs
- Algorithms: Slow Start, Congestion Avoidance, Fast Retransmit

### TCP Segment Structure

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |       |C|E|U|A|P|R|S|F|                               |
| Offset| Rsrvd |W|C|R|C|S|S|Y|I|            Window             |
|       |       |R|E|G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### TCP Header Fields

**Source Port (16 bits):**
- Port number of sending application
- Range: 0-65535

**Destination Port (16 bits):**
- Port number of receiving application
- Identifies which service to deliver data to

**Sequence Number (32 bits):**
- Position of first byte of data in this segment
- Used for ordering and reassembly
- Initial value chosen randomly (for security)

**Acknowledgment Number (32 bits):**
- Next expected sequence number
- Confirms receipt of data
- Only valid when ACK flag is set

**Data Offset (4 bits):**
- TCP header length in 32-bit words
- Minimum: 5 (20 bytes), Maximum: 15 (60 bytes)

**Flags (9 bits):**
- **CWR:** Congestion Window Reduced
- **ECE:** ECN-Echo (Explicit Congestion Notification)
- **URG:** Urgent pointer field is valid
- **ACK:** Acknowledgment field is valid
- **PSH:** Push function (deliver immediately)
- **RST:** Reset connection (error occurred)
- **SYN:** Synchronize sequence numbers (connection setup)
- **FIN:** Finish (graceful connection close)

**Window Size (16 bits):**
- Number of bytes receiver can accept
- Flow control mechanism
- Can be scaled with TCP options

**Checksum (16 bits):**
- Error detection for header and data
- Calculated over pseudo-header, TCP header, and data

**Urgent Pointer (16 bits):**
- Offset to urgent data (rarely used)
- Valid only when URG flag is set

### TCP Three-Way Handshake

The **three-way handshake** establishes a TCP connection.

```
Client                          Server
  |                                |
  |  SYN (Seq=100)                 |
  |------------------------------->|  1. Client initiates
  |                                |
  |  SYN-ACK (Seq=300, Ack=101)    |
  |<-------------------------------|  2. Server acknowledges
  |                                |
  |  ACK (Seq=101, Ack=301)        |
  |------------------------------->|  3. Client acknowledges
  |                                |
  |  CONNECTION ESTABLISHED        |
```

**Step-by-Step:**

**1. SYN (Synchronize)**
- Client sends SYN packet
- Includes initial sequence number (ISN)
- Example: Seq=100

**2. SYN-ACK**
- Server responds with SYN-ACK
- Acknowledges client's sequence number: Ack=101 (client's seq + 1)
- Sends its own sequence number: Seq=300

**3. ACK (Acknowledge)**
- Client sends ACK
- Acknowledges server's sequence number: Ack=301 (server's seq + 1)
- Connection established, data can now flow

**Purpose:**
- Synchronize sequence numbers
- Establish connection parameters
- Agree on window sizes and options

### TCP Connection Termination (Four-Way Handshake)

```
Client                          Server
  |                                |
  |  FIN (Seq=500)                 |
  |------------------------------->|  1. Client initiates close
  |                                |
  |  ACK (Ack=501)                 |
  |<-------------------------------|  2. Server acknowledges
  |                                |
  |  FIN (Seq=800)                 |
  |<-------------------------------|  3. Server initiates close
  |                                |
  |  ACK (Ack=801)                 |
  |------------------------------->|  4. Client acknowledges
  |                                |
  |  CONNECTION CLOSED             |
```

**Why four steps?**
- TCP is full-duplex (data flows both directions)
- Each direction must be closed independently
- Allows one side to finish sending while still receiving

**RST (Reset):**
- Abrupt connection termination
- Used when errors occur or connection is rejected
- No graceful shutdown

---

## UDP (User Datagram Protocol)

**UDP** is a connectionless, unreliable protocol optimized for speed and low overhead.

### UDP Characteristics

**Connectionless:**
- No handshake before data transfer
- No connection state maintained
- Each datagram independent

**Unreliable:**
- No acknowledgments
- No retransmission
- No ordering guarantees
- Datagrams may arrive out of order or not at all

**Low Overhead:**
- Minimal header (8 bytes vs TCP's 20+ bytes)
- No flow control or congestion control
- Faster than TCP

**Use Cases:**
- Real-time applications (VoIP, video streaming)
- DNS queries (small, quick requests)
- DHCP
- Online gaming
- IoT devices
- Broadcast and multicast

### UDP Datagram Structure

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                          Data (variable)                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### UDP Header Fields

**Source Port (16 bits):**
- Port number of sender (optional, can be 0)

**Destination Port (16 bits):**
- Port number of receiver

**Length (16 bits):**
- Total length of UDP header + data
- Minimum: 8 bytes (header only)

**Checksum (16 bits):**
- Error detection (optional in IPv4, mandatory in IPv6)
- Covers pseudo-header, UDP header, and data

---

## Port Numbers

**Port numbers** identify specific processes or services on a device, enabling multiplexing.

### Port Ranges

| Range | Name | Description |
|-------|------|-------------|
| **0-1023** | Well-Known Ports | Standard services (HTTP, FTP, SSH) |
| **1024-49151** | Registered Ports | Vendor-specific applications |
| **49152-65535** | Dynamic/Private Ports | Ephemeral ports (temporary client ports) |

### Common Well-Known Ports

| Port | Protocol | Service | Description |
|------|----------|---------|-------------|
| **20** | TCP | FTP Data | File transfer data channel |
| **21** | TCP | FTP Control | File transfer control channel |
| **22** | TCP | SSH | Secure Shell (encrypted remote access) |
| **23** | TCP | Telnet | Unencrypted remote access (insecure) |
| **25** | TCP | SMTP | Simple Mail Transfer Protocol (email sending) |
| **53** | TCP/UDP | DNS | Domain Name System |
| **67-68** | UDP | DHCP | Dynamic Host Configuration Protocol |
| **69** | UDP | TFTP | Trivial File Transfer Protocol |
| **80** | TCP | HTTP | Web traffic (unencrypted) |
| **110** | TCP | POP3 | Post Office Protocol v3 (email retrieval) |
| **123** | UDP | NTP | Network Time Protocol |
| **143** | TCP | IMAP | Internet Message Access Protocol (email) |
| **161-162** | UDP | SNMP | Simple Network Management Protocol |
| **389** | TCP | LDAP | Lightweight Directory Access Protocol |
| **443** | TCP | HTTPS | HTTP Secure (encrypted web traffic) |
| **445** | TCP | SMB | Server Message Block (file/printer sharing) |
| **465** | TCP | SMTPS | SMTP Secure |
| **514** | UDP | Syslog | System logging |
| **587** | TCP | SMTP (submission) | Email submission (authenticated) |
| **636** | TCP | LDAPS | LDAP Secure |
| **993** | TCP | IMAPS | IMAP Secure |
| **995** | TCP | POP3S | POP3 Secure |
| **1433** | TCP | MS SQL | Microsoft SQL Server |
| **1521** | TCP | Oracle | Oracle Database |
| **3306** | TCP | MySQL | MySQL Database |
| **3389** | TCP | RDP | Remote Desktop Protocol |
| **5060-5061** | TCP/UDP | SIP | Session Initiation Protocol (VoIP) |
| **5432** | TCP | PostgreSQL | PostgreSQL Database |

### Socket

A **socket** is the combination of IP address + port number + protocol.

**Examples:**
- `192.168.1.100:80 (TCP)` - Web server
- `10.0.0.50:53 (UDP)` - DNS server
- `172.16.0.5:22 (TCP)` - SSH server

**Connection identification:**
- Source: `192.168.1.100:5000 (TCP)`
- Destination: `93.184.216.34:443 (TCP)`
- Uniquely identifies this specific connection

---

## TCP vs UDP Decision

### Use TCP When:
- **Reliability required** - File transfers, web pages, email
- **Order matters** - Database transactions, configuration files
- **Error detection needed** - Financial transactions
- **Connection-oriented** - Long-lived sessions

### Use UDP When:
- **Speed critical** - Real-time audio/video, gaming
- **Small overhead preferred** - DNS queries, DHCP
- **Broadcast/multicast needed** - Network discovery, streaming
- **Application handles reliability** - Custom protocols with own error handling

### Examples

**TCP Applications:**
- Web browsing (HTTP/HTTPS)
- Email (SMTP, POP3, IMAP)
- File transfer (FTP, SFTP)
- Secure shell (SSH)
- Database connections

**UDP Applications:**
- DNS queries
- DHCP
- VoIP (voice calls)
- Video streaming (some services)
- Online gaming
- SNMP
- TFTP

---

## Flow Control

**Flow control** prevents a fast sender from overwhelming a slow receiver.

### TCP Sliding Window

The **window size** field tells the sender how much data the receiver can accept.

**Example:**
```
Receiver advertises window size = 8192 bytes

Sender can send 8192 bytes before waiting for ACK

As receiver processes data, it sends ACKs with updated window size

If buffer fills up, receiver sends window size = 0 (stop sending)
```

**Benefits:**
- Prevents buffer overflow
- Adapts to receiver's processing speed
- Improves efficiency (send multiple segments before ACK needed)

---

## Reliability Mechanisms

### Acknowledgments (ACKs)

**Positive acknowledgment:**
- Receiver sends ACK for successfully received data
- ACK number = next expected sequence number

**Cumulative ACK:**
- One ACK can acknowledge multiple segments
- Example: ACK 5000 means "I've received everything up to byte 4999"

### Retransmission

**Timeout-based:**
- Sender starts timer when sending segment
- If no ACK received before timeout, retransmit
- Timeout value dynamically calculated (RTT - Round Trip Time)

**Fast retransmit:**
- Receiver sends duplicate ACKs for out-of-order segments
- Sender receives 3 duplicate ACKs → immediately retransmit without waiting for timeout

### Sequence Numbers

**Purpose:**
- Order segments correctly
- Detect duplicates
- Identify missing segments

**How it works:**
- Each byte of data has a sequence number
- Sequence number in header = first byte's sequence number
- Receiver uses sequence numbers to reassemble data in correct order

---

## Multiplexing and Demultiplexing

**Multiplexing** (sender side):
- Multiple applications send data
- Transport layer adds port numbers
- Data from different apps sent over network

**Demultiplexing** (receiver side):
- Transport layer receives segments
- Reads destination port number
- Delivers data to correct application

**Example:**
```
Browser (port 50000) ----\
Email (port 50001)   ------> [Transport Layer] ---> Network
Chat (port 50002)    ----/
```

---

## Common Layer 4 Issues

### 1. Port Already in Use
**Symptom:** Application can't start, "port already in use" error  
**Cause:** Another process already listening on that port  
**Solution:** Stop conflicting process, use different port, or configure application

### 2. Firewall Blocking Ports
**Symptom:** Connection timeouts, service unreachable  
**Cause:** Firewall rules blocking specific ports  
**Solution:** Open required ports in firewall, check security groups (cloud)

### 3. Packet Loss
**Symptom:** Slow performance, retransmissions  
**Cause:** Network congestion, faulty hardware  
**Solution:** Check network quality, identify bottlenecks, upgrade hardware

### 4. Connection Timeout
**Symptom:** "Connection timeout" errors  
**Cause:** Service not listening, firewall blocking, routing issues  
**Solution:** Verify service running, check connectivity, review firewall rules

---

## Troubleshooting Layer 4

### Common Commands

**View listening ports:**
- Windows: `netstat -an | findstr LISTEN`
- Linux: `netstat -tuln` or `ss -tuln`
- Mac: `lsof -iTCP -sTCP:LISTEN -n -P`

**View active connections:**
- Windows: `netstat -ano`
- Linux: `netstat -tuna` or `ss -tuna`

**Test port connectivity:**
- `telnet <host> <port>` (simple test)
- `nc -zv <host> <port>` (netcat)
- PowerShell: `Test-NetConnection -ComputerName <host> -Port <port>`

**Find process using port:**
- Windows: `netstat -ano | findstr :<port>` then `tasklist /fi "pid eq <PID>"`
- Linux: `lsof -i :<port>` or `ss -tulpn | grep :<port>`

---

## Summary

The Transport layer (Layer 4) provides critical end-to-end communication services:

**Key Protocols:**
- **TCP**: Connection-oriented, reliable, ordered delivery
- **UDP**: Connectionless, fast, low overhead

**Key Concepts:**
- **Port numbers** enable multiplexing of multiple applications
- **Three-way handshake** establishes TCP connections
- **Flow control** prevents receiver overload
- **Reliability mechanisms** ensure data arrives intact (TCP)

**Key Functions:**
- **Segmentation** breaks data into manageable pieces
- **Error detection** identifies corrupted data
- **Retransmission** recovers lost segments
- **Ordering** ensures data reassembled correctly

**Remember:** The Transport layer is the first layer that provides end-to-end communication. Layers 1-3 focus on getting data from one network to another, while Layer 4 ensures data gets from one application to another, reliably (TCP) or quickly (UDP).

---

## References

- **CompTIA Network+ N10-008 Objective 1.1**: OSI Model - Transport Layer
- **CompTIA Network+ N10-008 Objective 1.5**: TCP and UDP Ports
- **RFC 793**: Transmission Control Protocol (TCP)
- **RFC 768**: User Datagram Protocol (UDP)
- **Professor Messer**: N10-008 Network+ Course