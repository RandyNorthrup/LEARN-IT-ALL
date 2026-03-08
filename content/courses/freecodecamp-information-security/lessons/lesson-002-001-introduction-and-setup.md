---
id: lesson-002-001
title: Introduction and Setup
chapterId: chapter-02
order: 1
duration: 15
objectives:
  - Define penetration testing and explain its purpose in cybersecurity
  - Identify the legal and ethical requirements before conducting any security testing
  - Distinguish between black box, white box, and gray box testing
  - Describe the penetration testing methodology phases
  - Set up a Python environment for penetration testing tools
  - Explain the principles of responsible disclosure
---

# Introduction and Setup

## What Is Penetration Testing?

**Penetration testing** (pen testing) is the authorized practice of probing computer systems, networks, and applications for security vulnerabilities. The goal is to find weaknesses *before* malicious attackers do, allowing organizations to fix them proactively.

Pen testers simulate real-world attacks using the same techniques that adversaries employ, but they do so **with explicit written permission** from the system owner and within a clearly defined scope.

> **⚠️ CRITICAL LEGAL WARNING:** Unauthorized access to computer systems is a serious crime under laws such as the Computer Fraud and Abuse Act (CFAA) in the United States, the Computer Misuse Act in the UK, and similar legislation worldwide. **ALWAYS obtain written authorization before testing any system you do not own.** All examples in this course should be run only against `localhost` (127.0.0.1) or systems you have explicit permission to test.

## Types of Penetration Testing

There are three main approaches, classified by the tester's level of knowledge about the target:

| Type | Knowledge Level | Description |
|------|----------------|-------------|
| **Black Box** | None | Tester has no prior knowledge of the system. Simulates an external attacker. |
| **White Box** | Full | Tester has complete access to source code, architecture docs, and credentials. Allows the most thorough review. |
| **Gray Box** | Partial | Tester has some knowledge, such as user-level credentials or network diagrams. Simulates an insider threat or a compromised account. |

## The Penetration Testing Methodology

Professional pen tests follow a structured methodology. The most widely recognized phases are:

1. **Reconnaissance (Information Gathering)** — Collect publicly available data about the target: domain names, IP ranges, employee names, technology stack, and open ports. This can be *passive* (no direct contact with the target) or *active* (directly probing the target).

2. **Scanning and Enumeration** — Use tools to identify live hosts, open ports, running services, and their versions. This is where port scanners and vulnerability scanners come in.

3. **Exploitation** — Attempt to leverage discovered vulnerabilities to gain unauthorized access. This might involve exploiting a misconfigured service, a known CVE, or a weak password.

4. **Post-Exploitation** — After gaining access, assess the impact: Can you escalate privileges? Access sensitive data? Move laterally to other systems?

5. **Reporting** — Document all findings with evidence, severity ratings, and remediation recommendations. The report is the primary deliverable of a pen test.

## Setting Up Your Python Environment

Python is the language of choice for many security professionals because of its extensive library ecosystem and rapid prototyping capabilities. Let's set up a dedicated environment:

```bash
# Create a virtual environment for pen testing tools
python3 -m venv pentest-env
source pentest-env/bin/activate

# Install essential libraries
pip install scapy        # Packet crafting and network scanning
pip install requests     # HTTP requests for web testing
pip install python-nmap  # Python bindings for Nmap
pip install paramiko     # SSH protocol library
pip install cryptography # Encryption and hashing utilities
```

> **Note:** Some libraries like `scapy` require root/administrator privileges for raw socket access. On Linux, you may need to run scripts with `sudo`.

Verify your setup by opening a Python shell:

```python
import socket
import sys

print(f"Python version: {sys.version}")
print(f"Socket module loaded successfully")
print(f"Hostname: {socket.gethostname()}")
print(f"Localhost IP: {socket.gethostbyname('localhost')}")
```

## Responsible Disclosure

When you discover a vulnerability — whether during authorized testing or by accident — follow **responsible disclosure** practices:

- **Report privately** to the affected organization before publishing anything.
- **Provide sufficient detail** so the organization can reproduce and fix the issue.
- **Allow reasonable time** (typically 90 days) for the organization to patch before any public disclosure.
- **Never exploit** a vulnerability beyond what is necessary to demonstrate its existence.
- **Document everything** to protect yourself legally.

Many organizations have **bug bounty programs** that reward researchers for responsibly reporting vulnerabilities. Platforms like HackerOne and Bugcrowd connect researchers with organizations.

## Key Takeaways

- Penetration testing is **authorized** security assessment — never test without written permission
- The methodology follows a structured cycle: recon → scanning → exploitation → post-exploitation → reporting
- Python provides powerful libraries for building custom security tools
- Responsible disclosure protects both the researcher and the public

---

*Based on the [freeCodeCamp Information Security Certification](https://www.freecodecamp.org/learn/information-security/)*
