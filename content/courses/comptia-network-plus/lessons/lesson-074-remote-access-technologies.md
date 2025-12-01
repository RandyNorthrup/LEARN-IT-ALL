---
id: lesson-074-remote-access-technologies
title: "Remote Access Technologies (VPN, RDP, SSH)"
chapterId: "chapter-008-wan-technologies"
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

**Remote access** enables users to connect to networks and systems from remote locations. Key technologies include **VPN (Virtual Private Network)**, **RDP (Remote Desktop Protocol)**, and **SSH (Secure Shell)**.

This lesson covers remote access fundamentals—essential for the CompTIA Network+ N10-008 exam.

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

#### IPsec (IP Security)

**Industry standard VPN protocol**

**Two modes:**
- **Transport mode**: Encrypts payload only (host-to-host)
- **Tunnel mode**: Encrypts entire IP packet (gateway-to-gateway)

**Components:**
- **AH (Authentication Header)**: Authentication, integrity
- **ESP (Encapsulating Security Payload)**: Encryption, authentication
- **IKE (Internet Key Exchange)**: Negotiate keys, establish SA

**Ports:**
- UDP 500 (IKE)
- UDP 4500 (NAT-T, NAT traversal)
- IP Protocol 50 (ESP)
- IP Protocol 51 (AH)

**Advantages:**
✅ Industry standard
✅ Strong security
✅ Built into OS (no additional software)

**Disadvantages:**
❌ Complex configuration
❌ NAT traversal issues (requires NAT-T)

#### SSL/TLS VPN

**VPN over HTTPS (port 443)**

**Types:**
- **Clientless**: Browser-based (web portal)
- **Client-based**: VPN client software

**Advantages:**
✅ Uses port 443 (bypasses most firewalls)
✅ Easy to use (browser-based option)
✅ No NAT traversal issues

**Disadvantages:**
❌ May require client software (full tunnel)

**Examples:**
- Cisco AnyConnect
- OpenVPN
- Pulse Secure

#### OpenVPN

**Open-source SSL VPN**

**Characteristics:**
- Uses OpenSSL library
- Highly configurable
- UDP 1194 (default) or TCP 443

**Advantages:**
✅ Open source (free)
✅ Cross-platform (Windows, Linux, macOS, mobile)
✅ Very secure (TLS 1.3, strong ciphers)

**Configuration example:**
```
# Client config
client
remote vpn.company.com 1194
proto udp
dev tun
ca ca.crt
cert client.crt
key client.key
```

#### WireGuard

**Modern, fast VPN protocol**

**Characteristics:**
- Minimal codebase (~4,000 lines)
- Uses modern cryptography (Curve25519, ChaCha20)
- UDP-based (custom port)

**Advantages:**
✅ Very fast (faster than IPsec/OpenVPN)
✅ Simple configuration
✅ Low overhead

**Use case:**
- Site-to-site VPN
- Personal VPN server

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

## Key Takeaways

1. **VPN** creates encrypted tunnel over internet for secure remote access (site-to-site or remote access)
2. **IPsec** is industry-standard VPN protocol (UDP 500/4500); **SSL VPN** uses HTTPS port 443
3. **Split tunnel** routes only corporate traffic through VPN; **full tunnel** routes all traffic
4. **RDP** provides remote desktop access to Windows systems (port 3389, use NLA for security)
5. **SSH** provides secure command-line access (port 22, replaces insecure Telnet)
6. **SSH key-based authentication** is more secure than password (public/private key pair)
7. **Never expose RDP/SSH directly to internet** (use VPN or RDP Gateway)
8. **SSH features**: Port forwarding, SCP for file copy, SFTP for file transfer
9. **Telnet** is insecure (no encryption, port 23) - replaced by SSH
10. **VNC** provides cross-platform remote desktop (port 5900, use over SSH tunnel for security)

---

## References

- **CompTIA Network+ N10-008 Objective 1.5:** Remote access methods (VPN, RDP, SSH)
- **CompTIA Network+ N10-008 Objective 4.4:** Remote access VPN security
- RFC 4251: SSH Protocol Architecture
- Microsoft: Remote Desktop Services Documentation
- OpenVPN Documentation
- Professor Messer: Network+ N10-008 - Remote Access Technologies

---

**Next Lesson:** Lesson 75 - SD-WAN (Software-Defined WAN)
