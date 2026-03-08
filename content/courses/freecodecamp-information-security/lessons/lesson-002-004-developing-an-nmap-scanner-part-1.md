---
id: lesson-002-004
title: Developing an Nmap Scanner part 1
chapterId: chapter-02
order: 4
duration: 20
objectives:
  - Explain what ports are and how they map to network services
  - List well-known ports and their associated services
  - Describe the TCP three-way handshake process
  - Build a basic port scanner in Python using connect_ex()
  - Implement threading to speed up scanning
  - Understand the difference between open, closed, and filtered ports
---

# Developing an Nmap Scanner Part 1

## What Is Port Scanning?

**Port scanning** is the process of probing a target system to discover which network ports are open, closed, or filtered. Open ports indicate running services that accept connections — and each open service is a potential entry point for an attacker.

Port scanning is one of the most fundamental reconnaissance techniques in penetration testing. The industry-standard tool for this is **Nmap** (Network Mapper), but building our own scanner in Python teaches us exactly how it works under the hood.

> **⚠️ LEGAL WARNING:** Port scanning systems without authorization is illegal in many jurisdictions. **Always** obtain written permission before scanning any target. All examples in this lesson use `localhost` (127.0.0.1) only. Unauthorized scanning can result in criminal charges.

## Understanding Ports

A **port** is a 16-bit number (0–65535) that identifies a specific process or service on a machine. When a client connects to a server, it needs both the IP address (which machine) and the port number (which service on that machine).

### Well-Known Ports

| Port | Service | Description |
|------|---------|-------------|
| 21 | FTP | File Transfer Protocol |
| 22 | SSH | Secure Shell (remote login) |
| 25 | SMTP | Email sending |
| 53 | DNS | Domain Name System |
| 80 | HTTP | Web traffic (unencrypted) |
| 443 | HTTPS | Web traffic (encrypted) |
| 3306 | MySQL | MySQL database |
| 5432 | PostgreSQL | PostgreSQL database |
| 8080 | HTTP-Alt | Alternative HTTP port |
| 27017 | MongoDB | MongoDB database |

## The TCP Three-Way Handshake

Before data can flow over a TCP connection, both sides must complete a **three-way handshake**:

```
Client                    Server
  |                         |
  |  ---- SYN ---------->  |  Step 1: Client sends SYN (synchronize)
  |                         |
  |  <--- SYN-ACK ------  |  Step 2: Server responds with SYN-ACK
  |                         |
  |  ---- ACK ---------->  |  Step 3: Client confirms with ACK
  |                         |
  |  Connection established |
```

- **Port is OPEN**: The handshake completes — the service is accepting connections.
- **Port is CLOSED**: The server responds with RST (reset) — no service is listening.
- **Port is FILTERED**: No response at all — a firewall is likely blocking the probe.

Our basic scanner uses a **full TCP connect scan**, meaning it completes the entire three-way handshake for each port.

## Building a Basic Port Scanner

Let's build a simple scanner that checks a range of ports on localhost:

```python
import socket
import time

def scan_port(host, port, timeout=1):
    """
    Attempt to connect to a single port.
    Returns True if the port is open, False otherwise.
    """
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    
    # connect_ex returns 0 on success, an error code otherwise
    result = sock.connect_ex((host, port))
    sock.close()
    
    return result == 0

def basic_port_scan(host='127.0.0.1', start_port=1, end_port=1024):
    """Scan a range of ports on the target host."""
    print(f"[*] Starting port scan on {host}")
    print(f"[*] Scanning ports {start_port}-{end_port}")
    print("-" * 45)
    
    open_ports = []
    start_time = time.time()
    
    for port in range(start_port, end_port + 1):
        if scan_port(host, port):
            open_ports.append(port)
            print(f"  [+] Port {port:>5} is OPEN")
    
    elapsed = time.time() - start_time
    
    print("-" * 45)
    print(f"[*] Scan complete in {elapsed:.2f} seconds")
    print(f"[*] {len(open_ports)} open port(s) found")
    
    return open_ports

if __name__ == '__main__':
    # ONLY scan localhost — never scan unauthorized targets
    basic_port_scan('127.0.0.1', 1, 1024)
```

### Why `connect_ex()` Instead of `connect()`

The `connect_ex()` method is preferred for scanning because:
- `connect()` **raises an exception** when the connection fails, which is slow due to exception handling overhead
- `connect_ex()` **returns an error code** (0 = success, non-zero = failure), which is faster and cleaner for scanning purposes

## Adding Threading for Speed

The basic scanner above checks ports sequentially, which is extremely slow. If each closed port takes 1 second to timeout, scanning 1024 ports takes over 17 minutes! Threading lets us check multiple ports simultaneously:

```python
import socket
import threading
import time

# Thread-safe storage for results
open_ports = []
lock = threading.Lock()

def scan_port_threaded(host, port, timeout=1):
    """Scan a single port and store the result if open."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    
    result = sock.connect_ex((host, port))
    sock.close()
    
    if result == 0:
        with lock:
            open_ports.append(port)
            print(f"  [+] Port {port} is OPEN")

def threaded_port_scan(host='127.0.0.1', start_port=1, end_port=1024):
    """Scan ports using multiple threads for speed."""
    print(f"[*] Threaded scan on {host} (ports {start_port}-{end_port})")
    print("-" * 45)
    
    threads = []
    start_time = time.time()
    
    for port in range(start_port, end_port + 1):
        thread = threading.Thread(
            target=scan_port_threaded,
            args=(host, port)
        )
        threads.append(thread)
        thread.start()
        
        # Limit concurrent threads to avoid resource exhaustion
        if len(threads) >= 100:
            for t in threads:
                t.join()
            threads = []
    
    # Wait for remaining threads to complete
    for t in threads:
        t.join()
    
    elapsed = time.time() - start_time
    
    open_ports.sort()
    print("-" * 45)
    print(f"[*] Scan complete in {elapsed:.2f} seconds")
    print(f"[*] {len(open_ports)} open port(s) found: {open_ports}")

if __name__ == '__main__':
    threaded_port_scan('127.0.0.1', 1, 1024)
```

## Key Takeaways

- Port scanning reveals which services are running on a target system
- The TCP three-way handshake determines whether a port is open, closed, or filtered
- `connect_ex()` is more efficient than `connect()` for scanning — it returns error codes instead of raising exceptions
- Threading dramatically improves scan speed but requires thread-safe data structures (use `Lock`)
- Always limit concurrent threads to avoid overwhelming the system or the target

---

*Based on the [freeCodeCamp Information Security Certification](https://www.freecodecamp.org/learn/information-security/)*
