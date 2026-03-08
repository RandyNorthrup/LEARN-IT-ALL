---
id: lesson-002-006
title: Developing a Banner Grabber
chapterId: chapter-02
order: 6
duration: 22
objectives:
  - Explain the concept of SYN scanning and why it is called half-open scanning
  - Use the scapy library for crafting and sending custom network packets
  - Build a SYN scanner that detects open ports without completing the TCP handshake
  - Compare SYN scanning advantages and disadvantages to full TCP connect scanning
  - Implement rate limiting and scan timing controls
  - Distinguish between filtered, closed, and open ports based on packet responses
---

# Developing an Nmap Scanner Part 3 — SYN Scanning and Packet Crafting

## Beyond TCP Connect: SYN Scanning

In Parts 1 and 2, our scanner used **TCP connect scanning** — completing the full three-way handshake for every port. While effective, this approach has drawbacks:

- **It's noisy** — Every completed connection is logged by the target's operating system
- **It's detectable** — Intrusion detection systems (IDS) easily spot rapid full connections
- **It's slow** — Completing the full handshake and then tearing it down adds overhead

**SYN scanning** (also called **half-open scanning**) solves these problems by never completing the handshake.

> **⚠️ CRITICAL LEGAL WARNING:** SYN scanning requires raw socket access and sends crafted packets to network services. This technique is **illegal without explicit written authorization**. SYN scanning can also disrupt services if done carelessly. Only practice on your own systems. All examples here target `localhost` only. Running these scripts requires root/administrator privileges.

## How SYN Scanning Works

Instead of completing the three-way handshake, a SYN scanner:

1. **Sends a SYN packet** to the target port
2. **Analyzes the response:**
   - **SYN-ACK received** → Port is **open** (a service is listening)
   - **RST received** → Port is **closed** (no service)
   - **No response / ICMP unreachable** → Port is **filtered** (firewall blocking)
3. **Sends RST** to tear down the half-open connection (instead of completing with ACK)

```
SYN Scan (Port Open):           SYN Scan (Port Closed):
Client        Server             Client        Server
  |  --SYN-->   |                  |  --SYN-->   |
  |  <-SYN/ACK- |                  |  <--RST---  |
  |  --RST-->   |                  |             |
  (Never fully connects)          (Immediate reset)
```

Because the connection is never fully established, many systems **do not log** SYN scans, making them stealthier than connect scans.

## Introduction to Scapy

**Scapy** is a powerful Python library for packet manipulation. It lets you craft, send, receive, and analyze network packets at a very low level.

```bash
# Install scapy (requires root for raw sockets)
pip install scapy
```

Basic scapy concepts:

```python
from scapy.all import IP, TCP, sr1, conf

# Suppress verbose output
conf.verb = 0

# Craft an IP packet destined for localhost
ip_layer = IP(dst="127.0.0.1")

# Craft a TCP SYN packet (flags="S") targeting port 80
tcp_layer = TCP(dport=80, flags="S")

# Combine layers — scapy uses the / operator to stack protocols
packet = ip_layer / tcp_layer

# Send the packet and receive one response
# sr1 = send and receive 1 packet
response = sr1(packet, timeout=2)

if response:
    print(f"Response flags: {response[TCP].flags}")
```

### TCP Flag Reference

| Flag | Meaning | Numeric Value |
|------|---------|---------------|
| S | SYN (synchronize) | 0x02 |
| A | ACK (acknowledge) | 0x10 |
| SA | SYN-ACK | 0x12 |
| R | RST (reset) | 0x04 |
| RA | RST-ACK | 0x14 |
| F | FIN (finish) | 0x01 |

## Building a SYN Scanner

Here's a complete SYN scanner using scapy:

```python
from scapy.all import IP, TCP, sr1, conf
import time

# Suppress scapy output
conf.verb = 0

def syn_scan_port(host, port, timeout=2):
    """
    Perform a SYN scan on a single port.
    Returns: 'open', 'closed', or 'filtered'
    """
    # Craft SYN packet
    packet = IP(dst=host) / TCP(dport=port, flags="S")
    
    # Send and wait for response
    response = sr1(packet, timeout=timeout)
    
    if response is None:
        return "filtered"  # No response — likely firewalled
    
    tcp_flags = response[TCP].flags
    
    if tcp_flags == 0x12:  # SYN-ACK
        # Port is open — send RST to close the half-open connection
        rst_packet = IP(dst=host) / TCP(dport=port, flags="R")
        sr1(rst_packet, timeout=1)
        return "open"
    
    elif tcp_flags & 0x04:  # RST flag set
        return "closed"
    
    return "filtered"

def syn_scan(host='127.0.0.1', ports=None, rate_limit=0.1):
    """
    SYN scan multiple ports with rate limiting.
    Requires root privileges.
    """
    if ports is None:
        ports = [22, 80, 443, 8080, 3306, 5432]
    
    print(f"[*] SYN Scan on {host}")
    print(f"[*] Scanning {len(ports)} ports")
    print("-" * 50)
    
    results = {"open": [], "closed": [], "filtered": []}
    
    for port in ports:
        state = syn_scan_port(host, port)
        results[state].append(port)
        
        if state == "open":
            print(f"  [+] Port {port:>5}: OPEN")
        elif state == "filtered":
            print(f"  [?] Port {port:>5}: FILTERED")
        
        # Rate limiting to avoid overwhelming the target
        time.sleep(rate_limit)
    
    print("-" * 50)
    print(f"[*] Open: {results['open']}")
    print(f"[*] Filtered: {results['filtered']}")
    print(f"[*] Closed: {len(results['closed'])} ports")
    
    return results

if __name__ == '__main__':
    # Must run as root: sudo python3 syn_scanner.py
    # ONLY scan localhost
    syn_scan('127.0.0.1', range(1, 1025), rate_limit=0.05)
```

## Rate Limiting and Scan Timing

Responsible scanning includes controlling how fast you send packets:

- **Too fast** → Overwhelms the target, causes denial of service, or triggers IDS alerts
- **Too slow** → Takes forever to complete the scan
- **Just right** → Balances speed with stealth and courtesy

```python
import time

# Scan timing profiles (similar to Nmap -T flags)
TIMING_PROFILES = {
    'paranoid':  2.0,    # Very slow, very stealthy
    'sneaky':    0.5,    # Slow, avoids most IDS
    'polite':    0.1,    # Reasonable default
    'normal':    0.05,   # Standard speed
    'aggressive': 0.01,  # Fast, may trigger alerts
}

def timed_scan(host, ports, profile='polite'):
    """Scan with a predefined timing profile."""
    delay = TIMING_PROFILES.get(profile, 0.1)
    print(f"[*] Using '{profile}' timing ({delay}s delay)")
    
    for port in ports:
        state = syn_scan_port(host, port)
        if state == 'open':
            print(f"  [+] {port}: {state}")
        time.sleep(delay)
```

## SYN Scan vs. Connect Scan

| Aspect | SYN Scan | Connect Scan |
|--------|----------|--------------|
| **Stealth** | Higher — connections aren't logged | Lower — full connections are logged |
| **Speed** | Faster — no full handshake | Slower — completes handshake |
| **Privileges** | Requires root/admin | No special privileges needed |
| **Reliability** | May be blocked by firewalls | Works through most firewalls |
| **Complexity** | Requires raw socket libraries | Uses standard socket API |

## Key Takeaways

- SYN scanning sends SYN packets without completing the handshake, making it stealthier
- Scapy enables crafting custom packets for advanced scanning techniques
- Response analysis: SYN-ACK = open, RST = closed, no response = filtered
- Rate limiting is essential for responsible scanning and avoiding detection
- SYN scanning requires root privileges because it uses raw sockets
- Always send RST after detecting an open port to clean up half-open connections

---

*Based on the [freeCodeCamp Information Security Certification](https://www.freecodecamp.org/learn/information-security/)*
