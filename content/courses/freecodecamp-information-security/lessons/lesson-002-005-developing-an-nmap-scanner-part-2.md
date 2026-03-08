---
id: lesson-002-005
title: Developing an Nmap Scanner part 2
chapterId: chapter-02
order: 5
duration: 20
objectives:
  - Implement banner grabbing to identify services running on open ports
  - Read and parse service response headers to determine software versions
  - Explain OS fingerprinting concepts and how scanners detect operating systems
  - Add timeout handling for unresponsive services during banner grabs
  - Output scan results to a structured file for reporting
  - Compare custom scanner capabilities to real Nmap features
---

# Developing an Nmap Scanner Part 2

## Beyond Open/Closed: Service Identification

Knowing that a port is open is useful, but knowing *what* is running on that port is far more valuable. A penetration tester needs to identify the specific software and version to search for known vulnerabilities. This is where **banner grabbing** comes in.

> **⚠️ LEGAL WARNING:** Banner grabbing involves connecting to and reading data from network services. Only perform these techniques on systems you own or have explicit written authorization to test. All examples in this lesson target `localhost` only.

## What Is Banner Grabbing?

When you connect to many network services, they immediately send back a **banner** — a text response that identifies the software name, version, and sometimes the operating system. For example:

- An SSH server might respond with: `SSH-2.0-OpenSSH_8.9p1 Ubuntu-3`
- An HTTP server's headers might include: `Server: Apache/2.4.52`
- An SMTP server might greet with: `220 mail.example.com ESMTP Postfix`

This information is gold for pen testers — if you know the exact version of a service, you can check databases like **CVE** (Common Vulnerabilities and Exposures) for known exploits.

## Implementing a Banner Grabber

Let's enhance our port scanner with banner grabbing capabilities:

```python
import socket

def grab_banner(host, port, timeout=3):
    """
    Connect to a port and attempt to read the service banner.
    Returns the banner string or None if no banner is received.
    """
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    
    try:
        sock.connect((host, port))
        
        # Some services send a banner immediately upon connection
        # Others require us to send data first (like HTTP)
        try:
            banner = sock.recv(1024).decode('utf-8', errors='replace').strip()
            if banner:
                return banner
        except socket.timeout:
            pass
        
        # If no automatic banner, try sending an HTTP request
        try:
            sock.sendall(b'HEAD / HTTP/1.1\r\nHost: localhost\r\n\r\n')
            response = sock.recv(4096).decode('utf-8', errors='replace')
            return response.strip()
        except socket.timeout:
            return None
            
    except (ConnectionRefusedError, OSError):
        return None
    finally:
        sock.close()

def parse_http_server(response):
    """Extract the Server header from an HTTP response."""
    for line in response.split('\r\n'):
        if line.lower().startswith('server:'):
            return line.split(':', 1)[1].strip()
    return "Unknown HTTP Server"

# Example: Grab banners on localhost
if __name__ == '__main__':
    host = '127.0.0.1'
    test_ports = [22, 80, 443, 3306, 8080]
    
    for port in test_ports:
        banner = grab_banner(host, port)
        if banner:
            print(f"Port {port}: {banner[:80]}")
        else:
            print(f"Port {port}: No banner (closed or filtered)")
```

## Service Version Detection

Beyond raw banners, we can parse the responses to extract structured version information:

```python
import re

def identify_service(port, banner):
    """Identify the service and version from a banner."""
    if banner is None:
        return {"service": "unknown", "version": "unknown"}
    
    result = {"service": "unknown", "version": "unknown", "raw": banner}
    
    # SSH detection
    ssh_match = re.match(r'SSH-[\d.]+-(\S+)', banner)
    if ssh_match:
        result["service"] = "SSH"
        result["version"] = ssh_match.group(1)
        return result
    
    # HTTP detection
    if 'HTTP/' in banner:
        result["service"] = "HTTP"
        server = parse_http_server(banner)
        result["version"] = server
        return result
    
    # FTP detection
    if banner.startswith('220') and 'FTP' in banner.upper():
        result["service"] = "FTP"
        result["version"] = banner[4:].strip()
        return result
    
    # SMTP detection
    if banner.startswith('220') and 'SMTP' in banner.upper():
        result["service"] = "SMTP"
        result["version"] = banner[4:].strip()
        return result
    
    # MySQL detection
    if 'mysql' in banner.lower() or 'mariadb' in banner.lower():
        result["service"] = "MySQL/MariaDB"
        ver_match = re.search(r'([\d.]+)', banner)
        if ver_match:
            result["version"] = ver_match.group(1)
        return result
    
    # Fallback: use port-based guess
    port_services = {22: "SSH", 80: "HTTP", 443: "HTTPS",
                     21: "FTP", 25: "SMTP", 3306: "MySQL"}
    result["service"] = port_services.get(port, "unknown")
    return result
```

## OS Fingerprinting Concepts

Real Nmap can often determine the operating system of a target machine. This works because different operating systems implement the TCP/IP stack with subtle differences:

- **TTL (Time to Live)** values differ: Linux defaults to 64, Windows to 128
- **TCP window sizes** vary between OS implementations
- **TCP options ordering** is OS-specific
- **Response to malformed packets** differs by implementation

While full OS fingerprinting requires raw socket access and packet crafting (covered in Part 3), we can make a basic guess from the TTL value in received packets.

## Saving Results to a File

Professional pen tests require documentation. Let's add file output to our scanner:

```python
import json
from datetime import datetime

def save_scan_results(host, results, filename=None):
    """Save scan results to a JSON file."""
    if filename is None:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"scan_{host}_{timestamp}.json"
    
    report = {
        "target": host,
        "scan_date": datetime.now().isoformat(),
        "total_ports_scanned": len(results),
        "open_ports": len([r for r in results if r["state"] == "open"]),
        "results": results
    }
    
    with open(filename, 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"[*] Results saved to {filename}")
    return filename

def scan_with_banners(host='127.0.0.1', ports=None):
    """Scan ports and grab banners, returning structured results."""
    if ports is None:
        ports = [22, 80, 443, 3306, 5432, 8080]
    
    results = []
    
    for port in ports:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(2)
        
        result_code = sock.connect_ex((host, port))
        sock.close()
        
        entry = {"port": port, "state": "closed", "service": {}}
        
        if result_code == 0:
            entry["state"] = "open"
            banner = grab_banner(host, port)
            entry["service"] = identify_service(port, banner)
        
        results.append(entry)
    
    return results

if __name__ == '__main__':
    # Only scan localhost
    results = scan_with_banners('127.0.0.1')
    save_scan_results('127.0.0.1', results)
```

## Comparison with Real Nmap

| Feature | Our Scanner | Nmap |
|---------|-------------|------|
| TCP Connect Scan | ✅ | ✅ |
| Banner Grabbing | ✅ (basic) | ✅ (comprehensive) |
| SYN Scan | ❌ (next lesson) | ✅ |
| OS Detection | ❌ (basic TTL only) | ✅ (advanced fingerprinting) |
| Script Engine | ❌ | ✅ (NSE scripts) |
| UDP Scanning | ❌ | ✅ |
| Output Formats | JSON | XML, JSON, grepable |

Our scanner is a learning tool — real-world engagements should use battle-tested tools like Nmap while understanding the underlying concepts.

## Key Takeaways

- Banner grabbing reveals service names and versions, enabling vulnerability research
- Different services use different banner formats — HTTP uses headers, SSH announces on connect
- Structured output (JSON) enables automated analysis and professional reporting
- OS fingerprinting relies on subtle TCP/IP implementation differences between operating systems
- Always compare your findings against authoritative tools and vulnerability databases

---

*Based on the [freeCodeCamp Information Security Certification](https://www.freecodecamp.org/learn/information-security/)*
