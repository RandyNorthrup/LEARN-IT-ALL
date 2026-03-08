---
id: lesson-002-007
title: Developing a Port Scanner
chapterId: chapter-02
order: 7
duration: 25
objectives:
  - Combine TCP connect scanning, banner grabbing, and SYN scanning into a unified tool
  - Implement command-line argument parsing with argparse for flexible scanner configuration
  - Use concurrent.futures for efficient multithreaded scanning
  - Generate formatted scan reports in multiple output formats
  - Apply best practices for responsible and ethical network scanning
  - Build a complete, professional-quality port scanner project in Python
---

# Developing an Nmap Scanner Part 4 — Complete Scanner Project

## Bringing It All Together

Over the past three lessons, we built individual scanning components: TCP connect scanning, banner grabbing, service identification, and SYN scanning. Now we'll combine everything into a **complete, professional-quality port scanner** with a command-line interface, multithreading, and formatted output.

> **⚠️ CRITICAL LEGAL WARNING:** This scanner is an educational tool. **Never run it against any target without explicit written permission.** Unauthorized network scanning is a criminal offense. Always use `localhost` or your own lab environment. When in doubt, **do not scan.**

## Project Architecture

Our scanner will have these components:

```
port_scanner/
├── scanner.py          # Main entry point with argparse
├── tcp_scanner.py      # TCP connect scan logic
├── banner_grabber.py   # Banner grabbing and service ID
└── report.py           # Output formatting and file export
```

For this lesson, we'll combine everything into a single file for simplicity.

## Complete Scanner Implementation

```python
#!/usr/bin/env python3
"""
PenTest Port Scanner — Educational Tool
ONLY use on systems you own or have written authorization to test.
Unauthorized scanning is illegal.
"""

import socket
import argparse
import json
import csv
import sys
import time
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

# ─── Configuration ────────────────────────────────────────────

COMMON_PORTS = {
    21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP',
    53: 'DNS', 80: 'HTTP', 110: 'POP3', 143: 'IMAP',
    443: 'HTTPS', 993: 'IMAPS', 995: 'POP3S',
    3306: 'MySQL', 3389: 'RDP', 5432: 'PostgreSQL',
    6379: 'Redis', 8080: 'HTTP-Alt', 8443: 'HTTPS-Alt',
    27017: 'MongoDB'
}

# ─── Scanning Functions ──────────────────────────────────────

def scan_port(host, port, timeout=2, grab_banner=False):
    """Scan a single port and optionally grab the banner."""
    result = {
        'port': port,
        'state': 'closed',
        'service': COMMON_PORTS.get(port, 'unknown'),
        'banner': ''
    }
    
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    
    try:
        conn_result = sock.connect_ex((host, port))
        
        if conn_result == 0:
            result['state'] = 'open'
            
            if grab_banner:
                try:
                    # Try to receive a banner
                    banner = sock.recv(1024).decode(
                        'utf-8', errors='replace'
                    ).strip()
                    if banner:
                        result['banner'] = banner[:200]
                except socket.timeout:
                    # Some services need a prompt
                    try:
                        sock.sendall(
                            b'HEAD / HTTP/1.1\r\n'
                            b'Host: localhost\r\n\r\n'
                        )
                        resp = sock.recv(1024).decode(
                            'utf-8', errors='replace'
                        )
                        for line in resp.split('\r\n'):
                            if line.lower().startswith('server:'):
                                result['banner'] = line
                                break
                    except socket.timeout:
                        pass
    except (OSError, ConnectionError):
        result['state'] = 'error'
    finally:
        sock.close()
    
    return result


def run_scan(host, ports, timeout, threads, grab_banner, verbose):
    """Execute the scan using a thread pool."""
    results = []
    open_count = 0
    start_time = time.time()
    
    print(f"\n{'=' * 55}")
    print(f"  Port Scanner — Target: {host}")
    print(f"  Ports: {ports[0]}-{ports[-1]} "
          f"({len(ports)} ports)")
    print(f"  Threads: {threads} | Timeout: {timeout}s "
          f"| Banners: {'Yes' if grab_banner else 'No'}")
    print(f"  Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'=' * 55}\n")
    
    with ThreadPoolExecutor(max_workers=threads) as executor:
        futures = {
            executor.submit(
                scan_port, host, port, timeout, grab_banner
            ): port
            for port in ports
        }
        
        for future in as_completed(futures):
            result = future.result()
            results.append(result)
            
            if result['state'] == 'open':
                open_count += 1
                banner_info = ''
                if result['banner']:
                    banner_info = f"  [{result['banner'][:60]}]"
                print(
                    f"  [+] {result['port']:>5}/tcp  "
                    f"OPEN    {result['service']:<15}"
                    f"{banner_info}"
                )
            elif verbose and result['state'] == 'closed':
                print(
                    f"  [-] {result['port']:>5}/tcp  CLOSED  "
                    f"{result['service']}"
                )
    
    elapsed = time.time() - start_time
    results.sort(key=lambda r: r['port'])
    
    print(f"\n{'─' * 55}")
    print(f"  Scan complete: {len(ports)} ports scanned "
          f"in {elapsed:.2f}s")
    print(f"  Open: {open_count} | "
          f"Closed: {len(ports) - open_count}")
    print(f"{'─' * 55}\n")
    
    return results, elapsed


# ─── Report Generation ───────────────────────────────────────

def generate_report(host, results, elapsed, fmt, outfile):
    """Generate a scan report in the specified format."""
    open_results = [r for r in results if r['state'] == 'open']
    
    if fmt == 'json':
        report = {
            'scan_info': {
                'target': host,
                'date': datetime.now().isoformat(),
                'elapsed_seconds': round(elapsed, 2),
                'total_ports': len(results),
                'open_ports': len(open_results),
                'disclaimer': (
                    'This scan was performed with '
                    'explicit authorization. Unauthorized '
                    'scanning is illegal.'
                )
            },
            'results': open_results
        }
        output = json.dumps(report, indent=2)
        
    elif fmt == 'csv':
        import io
        buf = io.StringIO()
        writer = csv.DictWriter(
            buf,
            fieldnames=['port', 'state', 'service', 'banner']
        )
        writer.writeheader()
        writer.writerows(open_results)
        output = buf.getvalue()
        
    else:  # text
        lines = [
            f"Scan Report — {host}",
            f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            f"Duration: {elapsed:.2f}s",
            "",
            f"{'Port':<8} {'State':<10} {'Service':<16} Banner",
            "─" * 60
        ]
        for r in open_results:
            lines.append(
                f"{r['port']:<8} {r['state']:<10} "
                f"{r['service']:<16} {r['banner'][:40]}"
            )
        lines.append(f"\n{len(open_results)} open port(s) found.")
        output = '\n'.join(lines)
    
    if outfile:
        with open(outfile, 'w') as f:
            f.write(output)
        print(f"[*] Report saved to {outfile}")
    else:
        print(output)


# ─── CLI Entry Point ─────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description='Python Port Scanner — Educational Tool',
        epilog='LEGAL: Only scan systems you own or '
               'have written authorization to test.'
    )
    parser.add_argument(
        'target', nargs='?', default='127.0.0.1',
        help='Target IP address (default: 127.0.0.1)'
    )
    parser.add_argument(
        '-p', '--ports', default='1-1024',
        help='Port range, e.g., 1-1024 or 22,80,443 '
             '(default: 1-1024)'
    )
    parser.add_argument(
        '-t', '--threads', type=int, default=50,
        help='Number of threads (default: 50)'
    )
    parser.add_argument(
        '--timeout', type=float, default=1.5,
        help='Connection timeout in seconds (default: 1.5)'
    )
    parser.add_argument(
        '-b', '--banner', action='store_true',
        help='Enable banner grabbing'
    )
    parser.add_argument(
        '-o', '--output', help='Output file path'
    )
    parser.add_argument(
        '-f', '--format', choices=['text', 'json', 'csv'],
        default='text', help='Output format (default: text)'
    )
    parser.add_argument(
        '-v', '--verbose', action='store_true',
        help='Show closed ports too'
    )
    
    args = parser.parse_args()
    
    # Parse port specification
    if ',' in args.ports:
        ports = [int(p.strip()) for p in args.ports.split(',')]
    elif '-' in args.ports:
        start, end = args.ports.split('-')
        ports = list(range(int(start), int(end) + 1))
    else:
        ports = [int(args.ports)]
    
    # Safety check
    if args.target not in ('127.0.0.1', 'localhost', '::1'):
        print("[!] WARNING: You are targeting a non-localhost "
              "address.")
        print("[!] Ensure you have WRITTEN AUTHORIZATION.")
        confirm = input("[?] Continue? (yes/no): ")
        if confirm.lower() != 'yes':
            print("[*] Scan aborted.")
            sys.exit(0)
    
    # Run the scan
    results, elapsed = run_scan(
        args.target, ports, args.timeout,
        args.threads, args.banner, args.verbose
    )
    
    # Generate report if output requested
    if args.output:
        generate_report(
            args.target, results, elapsed,
            args.format, args.output
        )

if __name__ == '__main__':
    main()
```

## Usage Examples

```bash
# Basic scan of the top 1024 ports on localhost
python scanner.py

# Scan specific ports with banner grabbing
python scanner.py 127.0.0.1 -p 22,80,443,8080 -b

# Full scan with JSON report output
python scanner.py 127.0.0.1 -p 1-65535 -t 200 -b -o report.json -f json

# Verbose scan showing closed ports too
python scanner.py -p 80,443,3306 -b -v
```

## Best Practices for Responsible Scanning

1. **Authorization first** — Always have written permission before scanning any target
2. **Scope your scan** — Only scan ports and hosts within the agreed-upon scope
3. **Rate limit** — Don't overwhelm targets; use reasonable thread counts and timeouts
4. **Document everything** — Save scan results with timestamps for your report
5. **Report findings** — Communicate vulnerabilities through proper channels
6. **Minimize impact** — Don't exploit or further probe discovered services without authorization
7. **Secure your results** — Scan reports contain sensitive information; protect them accordingly

## Key Takeaways

- A professional scanner combines connect scanning, banner grabbing, and structured reporting
- `argparse` makes tools flexible and user-friendly from the command line
- `concurrent.futures.ThreadPoolExecutor` provides clean, efficient multithreading
- Safety checks (non-localhost warnings) help prevent accidental unauthorized scanning
- Output in multiple formats (text, JSON, CSV) supports different reporting workflows
- Responsible scanning is about methodology, authorization, and documentation — not just code

---

*Based on the [freeCodeCamp Information Security Certification](https://www.freecodecamp.org/learn/information-security/)*
