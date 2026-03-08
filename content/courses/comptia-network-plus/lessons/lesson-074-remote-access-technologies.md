---
id: lesson-074-remote-access-technologies
title: "Remote Access Technologies (VPN, RDP, SSH)"
chapterId: ch8-wan-technologies
order: 74
duration: 24
objectives:
  - Understand remote access methods and protocols
  - Explain VPN types and operation
  - Describe RDP for remote desktop access
  - Configure and use SSH for secure remote access
  - Compare remote access security considerations
---

# Remote Access Technologies (VPN, RDP, SSH)

## Introduction

**Remote access** enables users to connect to networks and systems from remote locations. Key technologies include **VPN (Virtual Private Network)**, **RDP (Remote Desktop Protocol)**, and **SSH (Secure Shell)**.

This lesson covers remote access fundamentals—essential for the CompTIA Network+ N10-009 exam.

---

## Learning Objectives

After completing this lesson, you will be able to:

- Understand remote access methods and protocols
- Explain VPN types and operation
- Describe RDP for remote desktop access
- Configure and use SSH for secure remote access
- Compare remote access security considerations

---

## Remote Access Overview

### What is Remote Access?

**Remote access:**
- Connect to network/system from outside location
- Access resources as if physically present

**Common scenarios:**
- Work from home (access corporate network)
- IT support (troubleshoot remote servers)
- Manage network devices (routers, switches)

### Remote Access Methods

| Technology | Purpose | Port | Encryption |
|------------|---------|------|------------|
| **VPN** | Secure tunnel to network | 1194, 443, 500/4500 | Yes |
| **RDP** | Remote desktop (Windows) | 3389 | Yes (NLA) |
| **SSH** | Secure shell (command-line) | 22 | Yes |
| **Telnet** | Insecure shell (legacy) | 23 | No |
| **VNC** | Remote desktop (multi-platform) | 5900 | Optional |

---

## VPN (Virtual Private Network)

### What is VPN?

**VPN** creates an encrypted tunnel over public network (Internet), enabling secure remote access.

**Key concept:**
- Logical connection appears as if on local network
- Traffic encrypted (confidentiality, integrity)

### VPN Architecture

```
Remote User                Internet            Corporate Network
┌──────────┐              ┌────┐              ┌──────────┐
│  Laptop  │              │    │              │   VPN    │
│ (VPN     │◀───Encrypted─┤    │──Encrypted──▶│  Server  │
│ Client)  │    Tunnel    │    │    Tunnel    │          │
└──────────┘              └────┘              └────┬─────┘
                                                   │
                                              Internal Network
                                              (10.0.0.0/8)
```

**How it works:**
1. VPN client initiates connection to VPN server
2. Authentication (username/password, certificate)
3. Encrypted tunnel established
4. Client receives IP address from corporate network
5. Traffic routed through tunnel

### VPN Types

#### Site-to-Site VPN

**Connects two networks:**
- Branch office ↔ Headquarters
- Always-on tunnel

```
Branch Office                    Headquarters
┌────────────┐                  ┌────────────┐
│   Router   │                  │   Router   │
│ (VPN peer) │◀─────Tunnel─────▶│ (VPN peer) │
└──────┬─────┘                  └──────┬─────┘
       │                               │
  LAN (10.1.0.0/24)              LAN (10.2.0.0/24)
```

**Use case:**
- Connect multiple office locations
- Replace expensive leased lines

#### Remote Access VPN (Client-to-Site)

**Individual users connect to network:**
- Laptop/phone → Corporate network
- On-demand connection

**Use case:**
- Work from home
- Traveling employees

#### Client-to-Client VPN

**Peer-to-peer connection:**
- One user directly to another user
- Not commonly used

### VPN Protocols

Several protocols can establish VPN tunnels. The table below summarizes the key options from a deployment and WAN connectivity perspective. For in-depth security analysis of these protocols (IPsec phases, IKE negotiation, ESP/AH internals, SSL/TLS handshake details), see [Lesson 35: VPN Technologies](lesson-035-vpn-technologies).

| Protocol | Port(s) | Best For | Key Advantage | Key Limitation |
|----------|---------|----------|---------------|----------------|
| **IPsec** | UDP 500, 4500; IP 50/51 | Site-to-site, remote access | Industry standard, OS-built-in | Complex config, NAT traversal issues |
| **SSL/TLS VPN** | TCP 443 | Remote access | Firewall-friendly, browser option | May need client for full tunnel |
| **OpenVPN** | UDP 1194 / TCP 443 | Cross-platform remote access | Open source, highly configurable | Requires client software |
| **WireGuard** | UDP (custom) | High-performance tunnels | Very fast, minimal codebase | Newer, less enterprise tooling |

**Protocol Selection for WAN Planning:**
- **Site-to-site (branch office connectivity):** IPsec or WireGuard for always-on tunnels
- **Remote access (traveling employees):** SSL/TLS VPN (firewall-friendly) or OpenVPN
- **High-throughput requirements:** WireGuard (lowest overhead)
- **Firewall-restricted environments:** SSL/TLS VPN on port 443

### Split Tunnel vs Full Tunnel

#### Full Tunnel

**All traffic goes through VPN:**
- Internet traffic routes through corporate network
- Corporate network sees/controls all traffic

**Advantages:**
✅ Full security (all traffic monitored)
✅ Enforce policies (DLP, content filtering)

**Disadvantages:**
❌ High bandwidth usage (corporate internet)
❌ Slower internet (extra hop)

#### Split Tunnel

**Only corporate traffic goes through VPN:**
- Internet traffic goes directly to internet
- Corporate resources through VPN

**Advantages:**
✅ Lower bandwidth on corporate internet
✅ Faster internet for user

**Disadvantages:**
❌ Less control (can't monitor internet traffic)
❌ Potential security risk (malware on user device)

---

## RDP (Remote Desktop Protocol)

### What is RDP?

**RDP** provides graphical remote desktop access to Windows systems.

**Port:** TCP 3389

### RDP Architecture

```
Client Computer             Server Computer
┌──────────────┐            ┌──────────────┐
│  RDP Client  │            │  Windows     │
│ (mstsc.exe)  │◀────────▶  │  Server      │
│              │   Port 3389 │              │
└──────────────┘            └──────────────┘
     Displays                 Runs apps,
     desktop                  sends screen
```

**How it works:**
1. Client connects to server (TCP 3389)
2. Authentication (username/password)
3. Server sends desktop display to client
4. Client sends keyboard/mouse input to server
5. Server renders display, sends back to client

### RDP Clients

**Windows:**
- **mstsc.exe** (Remote Desktop Connection)
- Built into Windows

**macOS:**
- Microsoft Remote Desktop (from App Store)

**Linux:**
- Remmina, rdesktop

**Mobile:**
- Microsoft Remote Desktop (iOS, Android)

### RDP Connection

**Connecting via mstsc.exe:**
```
1. Start → Run → mstsc
2. Enter computer name or IP: server01.company.com
3. Click Connect
4. Enter credentials
5. Desktop appears
```

### RDP Security

#### Network Level Authentication (NLA)

**Requires authentication before session:**
- User authenticates before RDP session established
- Prevents anonymous connections
- Mitigates DoS attacks

**Recommended:** Always enable NLA

#### RDP over VPN

**Best practice:**
- Don't expose RDP directly to internet (port 3389)
- Use VPN, then RDP to internal servers

**Why:**
- RDP brute-force attacks common
- Ransomware exploits (BlueKeep, others)

#### RDP Gateway

**RDP via HTTPS:**
- RDP Gateway server (port 443)
- Clients connect via HTTPS
- Gateway forwards to internal RDP servers

**Advantages:**
✅ No VPN needed
✅ Port 443 (firewall-friendly)
✅ Centralized access control

### RDP Features

**RemoteFX:**
- GPU acceleration for rich media
- USB redirection

**Multi-monitor support:**
- Use multiple monitors remotely

**Clipboard sharing:**
- Copy/paste between local and remote

**Drive redirection:**
- Access local drives from remote session

**Printer redirection:**
- Print to local printer from remote session

---

## SSH (Secure Shell)

### What is SSH?

**SSH** provides secure command-line access to remote systems (primarily Linux/Unix).

**Port:** TCP 22

**Replaces insecure Telnet (port 23)**

### SSH Architecture

```
Client Computer             Server Computer
┌──────────────┐            ┌──────────────┐
│  SSH Client  │            │  SSH Server  │
│  (ssh)       │◀────────▶  │  (sshd)      │
│              │   Port 22   │              │
└──────────────┘            └──────────────┘
   Encrypted                 Command-line
   commands                  access
```

### SSH Authentication Methods

#### Password Authentication

**Username and password:**
```bash
ssh user@192.168.1.100
Password: ********
```

**Disadvantages:**
- Vulnerable to brute-force
- Password transmitted (encrypted, but still...)

#### Key-Based Authentication

**Public/private key pair:**
- Client has private key
- Server has public key (in `~/.ssh/authorized_keys`)
- Much more secure than password

**Generate key pair:**
```bash
ssh-keygen -t rsa -b 4096
# Creates:
# ~/.ssh/id_rsa (private key - NEVER share)
# ~/.ssh/id_rsa.pub (public key)
```

**Copy public key to server:**
```bash
ssh-copy-id user@192.168.1.100
# Or manually:
cat ~/.ssh/id_rsa.pub | ssh user@server 'cat >> ~/.ssh/authorized_keys'
```

**Connect (no password needed):**
```bash
ssh user@192.168.1.100
# Automatically uses private key
```

### SSH Configuration

**Client config** (`~/.ssh/config`):
```
Host myserver
    HostName 192.168.1.100
    User admin
    Port 22
    IdentityFile ~/.ssh/id_rsa

# Usage:
# ssh myserver (instead of ssh admin@192.168.1.100)
```

**Server config** (`/etc/ssh/sshd_config`):
```
Port 22
PermitRootLogin no           # Disable root login
PasswordAuthentication no    # Require key-based auth
PubkeyAuthentication yes
AllowUsers admin deploy      # Only allow specific users
```

### SSH Features

#### Port Forwarding (SSH Tunneling)

**Local port forwarding:**
```bash
ssh -L 8080:localhost:80 user@server
# Access server's port 80 via localhost:8080
```

**Use case:**
- Access web server behind firewall

**Remote port forwarding:**
```bash
ssh -R 8080:localhost:80 user@server
# Server's port 8080 forwards to client's port 80
```

**Use case:**
- Expose local service to remote server

**Dynamic port forwarding (SOCKS proxy):**
```bash
ssh -D 1080 user@server
# Creates SOCKS proxy on localhost:1080
# Route browser traffic through server
```

#### SCP (Secure Copy)

**Copy files over SSH:**
```bash
# Upload file to server
scp file.txt user@server:/home/user/

# Download file from server
scp user@server:/home/user/file.txt .

# Copy directory
scp -r mydir/ user@server:/home/user/
```

#### SFTP (SSH File Transfer Protocol)

**Interactive file transfer:**
```bash
sftp user@server
sftp> ls
sftp> get file.txt
sftp> put local.txt
sftp> quit
```

**Not to be confused with FTPS (FTP over SSL/TLS)**

### SSH Security Best Practices

✅ **Use key-based authentication** (disable password auth)
✅ **Change default port** (e.g., port 2222 instead of 22) - security by obscurity
✅ **Disable root login** (`PermitRootLogin no`)
✅ **Limit user access** (`AllowUsers` directive)
✅ **Use fail2ban** (block brute-force attempts)
✅ **Keep SSH updated** (patch vulnerabilities)

---

## Telnet (Insecure - Legacy)

### What is Telnet?

**Telnet** provides command-line access to remote systems (like SSH but **unencrypted**).

**Port:** TCP 23

### Why Telnet is Insecure

❌ **No encryption**: All traffic in plaintext (passwords visible)
❌ **No authentication**: Weak security

**Example attack:**
- Attacker sniffs network
- Sees Telnet login (username: admin, password: P@ssw0rd)
- Gains access to system

### When Telnet is Still Used

**Console access to network devices:**
- Configure switch/router via console port
- Often uses Telnet protocol (but local connection)

**Legacy systems:**
- Old equipment without SSH support

**Testing:**
- Test port connectivity: `telnet 192.168.1.1 80`

**⚠️ Never use Telnet over network (use SSH instead)**

---

## VNC (Virtual Network Computing)

### What is VNC?

**VNC** provides graphical remote desktop access (cross-platform).

**Port:** TCP 5900 (VNC), 5800 (HTTP)

### VNC Characteristics

**Platform-independent:**
- Works on Windows, Linux, macOS

**Examples:**
- RealVNC
- TightVNC
- UltraVNC

**Security:**
- Basic VNC: weak encryption (or none)
- Use VNC over SSH tunnel (secure)

**VNC over SSH:**
```bash
ssh -L 5900:localhost:5900 user@server
# Then connect VNC client to localhost:5900
```

---

## Remote Access Security

### Best Practices

✅ **Use VPN for remote access** (encrypted tunnel)
✅ **Multi-factor authentication (MFA)** (password + code)
✅ **Restrict access by IP** (whitelist trusted IPs)
✅ **Monitor access logs** (detect suspicious activity)
✅ **Use strong passwords/keys** (complex, unique)
✅ **Keep software updated** (patch vulnerabilities)
✅ **Disable unnecessary services** (minimize attack surface)

### Common Threats

**Brute-force attacks:**
- Attacker tries many passwords
- Mitigation: MFA, account lockout, fail2ban

**Man-in-the-middle:**
- Attacker intercepts traffic
- Mitigation: Encryption (VPN, SSH, RDP with NLA)

**Exposed services:**
- RDP/SSH directly on internet
- Mitigation: VPN, VPN Gateway, IP whitelist

---

## Zero Trust Network Access (ZTNA)

### What is ZTNA?

**Zero Trust Network Access (ZTNA)** is a security model that replaces traditional VPN-based remote access with a "never trust, always verify" approach. Unlike VPNs—which grant broad network access once authenticated—ZTNA provides access only to specific applications on a per-session, per-user basis.

**Core Principles:**
- **No implicit trust:** Being on the network does not grant access to resources
- **Least-privilege access:** Users access only the specific applications they need
- **Continuous verification:** Identity, device posture, and context are checked throughout the session
- **Micro-perimeter:** Each application is its own security boundary

### ZTNA vs Traditional VPN

```
Traditional VPN:
  User authenticates → Full network access (10.0.0.0/8)
  User can reach: Servers, printers, other workstations, everything
  Risk: Lateral movement if credentials are compromised

ZTNA:
  User authenticates → Access to CRM app ONLY (app.company.com)
  User cannot reach: Other servers, network devices, or subnets
  Risk: Compromised credentials expose only one application
```

**ZTNA Advantages:**
- ✅ Reduced attack surface (applications invisible to unauthorized users)
- ✅ Better user experience (no full VPN tunnel needed)
- ✅ Granular access policies (by user, device, location, time)
- ✅ Cloud-native (works for SaaS, IaaS, and on-premises apps)

**ZTNA Solutions:** Zscaler Private Access, Cloudflare Access, Palo Alto Prisma Access, Cisco Duo

---

## Jump Servers and Bastion Hosts

### What is a Jump Server?

A **jump server** (or **bastion host**) is a hardened, intermediary server that administrators must connect to before accessing internal systems. It acts as a single, audited entry point into a secure network zone.

```
Administrator                     Internal Network
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│  Laptop  │────▶│  Jump Server │────▶│  Production  │
│          │ SSH │ (Bastion)    │ SSH │  Servers     │
└──────────┘     └──────────────┘     └──────────────┘
  Internet        DMZ / Secure Zone     Private Network
                  (heavily logged)
```

**Key Characteristics:**
- Runs minimal services (SSH/RDP only)
- All access is logged and audited (who connected, when, what commands ran)
- Multi-factor authentication required
- No direct internet-to-production access permitted
- Regular patching and hardening

**Best Practices:**
- Place the jump server in a DMZ or dedicated management VLAN
- Restrict source IPs that can connect to the jump server
- Use session recording for compliance and forensic analysis
- Rotate credentials and enforce SSH key-based authentication

---

## Privileged Access Management (PAM)

### What is PAM?

**Privileged Access Management (PAM)** is a security framework that controls, monitors, and audits access to accounts with elevated privileges (administrator, root, service accounts). PAM solutions sit between administrators and the systems they manage.

**Key PAM Capabilities:**

| Feature | Description |
|---------|-------------|
| **Password vaulting** | Privileged credentials stored in encrypted vault; admins check out credentials for temporary use |
| **Session recording** | All privileged sessions (SSH, RDP) recorded for audit and replay |
| **Just-in-time access** | Admin privileges granted only when needed, automatically revoked after a time window |
| **Credential rotation** | Passwords automatically rotated after each use or on a schedule |
| **Approval workflows** | Access requests require manager or security team approval |

**PAM in Remote Access:**
- Administrators connect to the PAM portal, request access, and receive temporary credentials
- The PAM system proxies the connection, recording the entire session
- After the maintenance window, credentials are rotated and access is revoked

**PAM Solutions:** CyberArk, BeyondTrust, Thycotic (Delinea), HashiCorp Vault

---

## Remote Desktop Gateway Architecture

### How RD Gateway Works

An **RD Gateway (Remote Desktop Gateway)** allows external users to access internal RDP hosts over HTTPS (port 443), without exposing RDP port 3389 to the internet.

```
Remote User                    Corporate Network
┌──────────┐    HTTPS/443    ┌──────────────┐    RDP/3389    ┌──────────┐
│  Laptop  │───────────────▶│  RD Gateway  │──────────────▶│ Internal │
│ (RDP     │                │  Server      │               │ Servers  │
│ Client)  │                │ (DMZ/edge)   │               │          │
└──────────┘                └──────────────┘               └──────────┘
                              Terminates HTTPS               Private network
                              Authenticates user             (not internet-facing)
                              Authorizes by policy
```

**RD Gateway Benefits:**
- Only port 443 exposed externally (firewall-friendly, blends with HTTPS traffic)
- Centralized authentication and authorization policies
- Connection Authorization Policies (CAPs) control who can connect
- Resource Authorization Policies (RAPs) control which internal servers users can reach
- No VPN required for remote desktop access
- Supports NLA for additional security

**When to use RD Gateway vs VPN:**
- RD Gateway: Users only need RDP access to specific Windows servers
- VPN: Users need broad network access (file shares, internal apps, printing)

---

## Always-On VPN vs On-Demand VPN

### Always-On VPN

**Always-on VPN** automatically establishes a VPN connection whenever the device has internet connectivity—before the user even logs in.

**Characteristics:**
- VPN tunnel established at device boot (machine tunnel)
- User authentication adds a second tunnel (user tunnel)
- No user intervention required
- Device is always protected by corporate security policies

**Use Cases:**
- Corporate-managed laptops that must always route through security controls
- Compliance requirements mandating encrypted connections at all times
- Endpoint management (patches, GPO, inventory) requires persistent connectivity

**Examples:** Windows Always On VPN, Cisco AnyConnect (always-on mode), GlobalProtect

### On-Demand VPN

**On-demand VPN** connects only when the user manually initiates the connection or when specific applications or domains are accessed.

**Characteristics:**
- User controls when VPN is active
- Reduces bandwidth usage on corporate infrastructure
- More flexible for BYOD (Bring Your Own Device) scenarios

**Comparison:**

| Feature | Always-On VPN | On-Demand VPN |
|---------|--------------|---------------|
| Connection | Automatic at boot | Manual or app-triggered |
| Security | Higher (always protected) | Lower (gaps when disconnected) |
| Bandwidth | Higher (all traffic tunneled) | Lower (connected only when needed) |
| User experience | Seamless, no interaction | Requires user action |
| Best for | Managed corporate devices | BYOD, contractor access |

---

## Split Tunneling: Security Considerations

### Security Risks of Split Tunneling

While split tunneling improves performance, it introduces specific security concerns that network administrators must evaluate:

**Risk 1: Unmonitored Internet Traffic**
- User's internet browsing bypasses corporate security controls (proxy, DLP, IDS)
- Malware downloaded from the internet reaches the endpoint without inspection
- Corporate data could be exfiltrated through the direct internet path

**Risk 2: Dual-Homed Attack Vector**
- The user's device is simultaneously connected to the corporate network (via VPN) and the public internet
- An attacker who compromises the device through the internet connection can pivot into the corporate network through the VPN tunnel

**Risk 3: DNS Leak**
- DNS queries for corporate resources may accidentally go to public DNS servers
- Reveals internal hostnames and network topology to external parties

### Mitigating Split Tunneling Risks

- **Endpoint security:** Require up-to-date antivirus, host firewall, and EDR on all VPN clients
- **DNS policies:** Force all DNS queries through the corporate VPN tunnel even in split-tunnel mode
- **Posture assessment:** Check device compliance (OS patches, disk encryption) before granting VPN access
- **Application-based split tunneling:** Route only specific application traffic (e.g., Microsoft 365) outside the tunnel while keeping everything else inside

---

## Remote Access Policy Best Practices

### Building a Remote Access Policy

A comprehensive remote access policy should address:

**1. Authentication Requirements:**
- Multi-factor authentication (MFA) mandatory for all remote access
- Certificate-based authentication for machine identity
- Password complexity and rotation policies

**2. Device Requirements:**
- Corporate-managed devices preferred; BYOD allowed with endpoint compliance checks
- Full disk encryption required
- Current OS patches and antivirus signatures
- Mobile Device Management (MDM) enrollment for smartphones/tablets

**3. Access Scope:**
- Principle of least privilege: grant access only to required resources
- Time-limited access for contractors and third-party vendors
- Separate VPN profiles for different user roles (employee, contractor, IT admin)

**4. Monitoring and Logging:**
- Log all remote access sessions (connection time, duration, source IP)
- Alert on anomalous access patterns (unusual hours, geographic impossibility)
- Retain logs for compliance period (typically 90 days to 1 year)

**5. Incident Response:**
- Ability to remotely revoke VPN access immediately
- Remote wipe capability for lost or stolen devices
- Defined escalation procedures for suspected compromised remote sessions

---

## Summary

1. **VPN** creates encrypted tunnel over internet for secure remote access (site-to-site or remote access). For VPN security protocols (IPsec, SSL/TLS, IKE), see [Lesson 35: VPN Technologies](lesson-035-vpn-technologies)
2. **IPsec** (UDP 500/4500), **SSL VPN** (port 443), **OpenVPN**, and **WireGuard** are common VPN protocols with different deployment trade-offs
3. **Split tunnel** routes only corporate traffic through VPN; **full tunnel** routes all traffic
4. **RDP** provides remote desktop access to Windows systems (port 3389, use NLA for security)
5. **SSH** provides secure command-line access (port 22, replaces insecure Telnet)
6. **SSH key-based authentication** is more secure than password (public/private key pair)
7. **Never expose RDP/SSH directly to internet** (use VPN or RDP Gateway)
8. **SSH features**: Port forwarding, SCP for file copy, SFTP for file transfer
9. **Telnet** is insecure (no encryption, port 23) - replaced by SSH
10. **VNC** provides cross-platform remote desktop (port 5900, use over SSH tunnel for security)

---

## Practice Questions

**Q1.** Which VPN protocol uses UDP ports 500 and 4500 and is considered the industry standard for site-to-site VPN connections?

A) SSL VPN
B) IPsec
C) PPTP
D) L2TP

<details>
<summary>Answer</summary>

**B)** IPsec is the industry-standard VPN protocol that uses UDP port 500 for IKE (Internet Key Exchange) and UDP port 4500 for NAT traversal. It is widely used for site-to-site and remote access VPNs.
</details>

**Q2.** A remote worker needs to access only corporate applications while still being able to browse the internet directly. Which VPN configuration should be used?

A) Full tunnel
B) Split tunnel
C) SSL VPN
D) Always-on VPN

<details>
<summary>Answer</summary>

**B)** Split tunnel routes only corporate-destined traffic through the VPN tunnel while allowing internet traffic to go directly to the internet. This reduces VPN bandwidth usage and improves internet performance for the user.
</details>

**Q3.** Which remote access protocol provides secure command-line access and operates on port 22?

A) RDP
B) Telnet
C) SSH
D) VNC

<details>
<summary>Answer</summary>

**C)** SSH (Secure Shell) provides encrypted command-line access on port 22. It replaced the insecure Telnet protocol and also supports file transfer (SCP, SFTP) and port forwarding.
</details>

**Q4.** Why should RDP (Remote Desktop Protocol) NEVER be exposed directly to the internet?

A) RDP does not support encryption
B) RDP is too slow over the internet
C) RDP is a frequent target for brute-force attacks and exploits
D) RDP only works on local networks

<details>
<summary>Answer</summary>

**C)** Exposing RDP (port 3389) directly to the internet makes it a prime target for brute-force password attacks, credential stuffing, and vulnerability exploits. It should be accessed through a VPN or RDP Gateway.
</details>

**Q5.** Which authentication method for SSH is MORE secure than using passwords?

A) CHAP
B) SSH key-based authentication (public/private key pair)
C) RADIUS
D) LDAP

<details>
<summary>Answer</summary>

**B)** SSH key-based authentication uses a public/private key pair and is more secure than passwords because keys are much harder to brute-force and are not vulnerable to password-guessing attacks.
</details>

**Q6.** Which legacy remote access protocol transmits all data including credentials in plaintext and should never be used?

A) SSH
B) RDP
C) Telnet
D) VNC

<details>
<summary>Answer</summary>

**C)** Telnet (port 23) transmits all data, including usernames and passwords, in plaintext. It has been replaced by SSH for secure remote command-line access.
</details>

**Q7.** An SSL VPN has an advantage over IPsec VPN for remote access because:

A) SSL VPN provides faster throughput
B) SSL VPN uses HTTPS (port 443), which works through most firewalls without special configuration
C) SSL VPN provides stronger encryption
D) SSL VPN does not require authentication

<details>
<summary>Answer</summary>

**B)** SSL VPN uses HTTPS on port 443, which is typically allowed through corporate firewalls and proxies without special configuration. IPsec requires UDP 500/4500 which may be blocked.
</details>

**Q8.** Which remote desktop protocol provides cross-platform support (Windows, macOS, Linux) and operates on port 5900?

A) RDP
B) SSH
C) VNC
D) Telnet

<details>
<summary>Answer</summary>

**C)** VNC (Virtual Network Computing) uses port 5900 and provides cross-platform remote desktop access. However, VNC does not encrypt traffic by default and should be tunneled over SSH or VPN for security.
</details>

**Q9.** What is the difference between full tunnel and split tunnel VPN?

A) Full tunnel encrypts data; split tunnel does not
B) Full tunnel routes ALL traffic through the VPN; split tunnel routes only corporate traffic through the VPN
C) Split tunnel is faster than full tunnel in all cases
D) Full tunnel requires two VPN connections; split tunnel requires one

<details>
<summary>Answer</summary>

**B)** Full tunnel routes all traffic (including internet browsing) through the VPN, providing maximum security. Split tunnel routes only corporate traffic through the VPN while internet traffic goes directly out, improving performance.
</details>

**Q10.** On which port does RDP (Remote Desktop Protocol) operate by default?

A) 22
B) 443
C) 3389
D) 5900

<details>
<summary>Answer</summary>

**C)** RDP operates on TCP port 3389 by default. For security, Network Level Authentication (NLA) should be enabled, and RDP should be accessed through a VPN or RDP Gateway rather than directly over the internet.
</details>

---

## References

- **CompTIA Network+ N10-009 Objective 1.5:** Remote access methods (VPN, RDP, SSH)
- **CompTIA Network+ N10-009 Objective 4.4:** Remote access VPN security
- RFC 4251: SSH Protocol Architecture
- Microsoft: Remote Desktop Services Documentation
- OpenVPN Documentation
- Professor Messer: Network+ N10-009 - Remote Access Technologies

---

**Next Lesson:** Lesson 75 - SD-WAN (Software-Defined WAN)
