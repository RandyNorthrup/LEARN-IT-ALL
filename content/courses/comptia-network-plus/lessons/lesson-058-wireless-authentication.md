---
id: lesson-058-wireless-authentication
title: "Wireless Authentication Methods"
chapterId: "chapter-006-wireless-networking"
order: 58
duration: 17
objectives:
  - Compare PSK and Enterprise authentication modes
  - Understand 802.1X and RADIUS authentication
  - Explain EAP methods (PEAP, EAP-TLS, EAP-TTLS)
  - Configure captive portals for guest access
  - Understand certificate-based authentication
---

# Wireless Authentication Methods

Wireless authentication verifies the identity of users and devices before granting network access. Understanding different authentication methods enables you to select the appropriate approach for various environments and security requirements.

---

## Authentication vs Encryption

**Authentication**: Who can access the network?
**Encryption**: Protecting data in transit

**Both are required** for secure wireless networks:
- Authentication prevents unauthorized access
- Encryption protects data from eavesdropping

---

## Pre-Shared Key (PSK) Authentication

### Overview

**PSK** uses a **shared password** known by all users:
- Also called **Personal mode**
- WPA2-Personal, WPA3-Personal
- Same passphrase on all devices
- Simple to deploy and manage

### How PSK Works

**WPA2-PSK Process**:
1. Client provides passphrase
2. Passphrase hashed to create **Pairwise Master Key (PMK)**
3. **4-way handshake** derives encryption keys
4. Unique per-session keys established

```
Client Passphrase
      ↓
   Hash (PBKDF2)
      ↓
     PMK
      ↓
  4-Way Handshake
      ↓
  PTK (Session Key)
```

**WPA3-PSK** uses **SAE** (Simultaneous Authentication of Equals) instead of 4-way handshake.

### PSK Best Practices

**Password Requirements**:
- **Minimum 8 characters** (standard requirement)
- **Recommended 20+ characters** for security
- Use random, complex passphrase
- Avoid common words and patterns

**Example Strong Passphrase**:
```
Bad:  Password123
      MyCompany2025
      Welcome!

Good: Correct-Horse-Battery-Staple-42
      8kJ#mP9$vL2qR6nT4wF1zX
      BlueElephantsDance@Midnight!2025
```

### PSK Limitations

**Security Concerns**:
1. **Shared secret**: Everyone knows the password
2. **No individual accountability**: Can't identify who accessed
3. **Difficult to revoke access**: Must change password everywhere
4. **Password sharing**: Spreads password to unauthorized users
5. **No forward secrecy** (WPA2): Compromised password decrypts past traffic

**Use Cases**:
- Home networks
- Small offices (< 10 users)
- Guest networks with isolation
- IoT devices

---

## Enterprise Authentication (802.1X)

### Overview

**Enterprise mode** provides **individual authentication** using a RADIUS server:
- Also called **802.1X authentication**
- Unique credentials per user
- Centralized authentication
- WPA2-Enterprise, WPA3-Enterprise

### 802.1X Components

**Three entities** in 802.1X:

**1. Supplicant** (Client):
- Device/user requesting access
- Has 802.1X client software
- Provides credentials

**2. Authenticator** (Access Point):
- Enforces network access control
- Relays authentication between client and server
- Blocks traffic until authentication succeeds

**3. Authentication Server** (RADIUS):
- Verifies credentials
- Grants or denies access
- Centralized policy enforcement

```
Supplicant       Authenticator      RADIUS Server
 (Client)          (AP)               (Auth)
    |                |                   |
    |  EAP Request   |                   |
    |<---------------|                   |
    |  EAP Response  |   RADIUS Request  |
    |--------------->|------------------>|
    |                |   RADIUS Accept   |
    |  EAP Success   |<------------------|
    |<---------------|                   |
    |                                    |
    └─────── Network Access Granted ────┘
```

### EAP (Extensible Authentication Protocol)

**EAP** is a framework for authentication methods:
- Transported over 802.1X
- Multiple authentication types (methods)
- Flexible and extensible

**Common EAP Methods**:

#### 1. PEAP (Protected EAP)

**Most common** for wireless enterprise authentication:

**Characteristics**:
- **TLS tunnel** protects authentication
- **Server certificate** required (AP/controller)
- **Client** uses username/password
- **No client certificate** needed

**Versions**:
- **PEAPv0/EAP-MSCHAPv2**: Microsoft, most common
- **PEAPv1/EAP-GTC**: Cisco

**Process**:
1. Server presents certificate
2. Client validates certificate
3. TLS tunnel established
4. Credentials sent encrypted inside tunnel
5. RADIUS verifies credentials

**Advantages**:
- Easy client setup (username/password)
- No client certificates needed
- Secure (encrypted credentials)

**Disadvantages**:
- Server certificate management
- Weaker than certificate-based auth

**Use Case**: Corporate Wi-Fi with Active Directory integration

#### 2. EAP-TLS (EAP-Transport Layer Security)

**Most secure** EAP method:

**Characteristics**:
- **Mutual certificate authentication**
- **Server certificate** required
- **Client certificate** required
- No passwords

**Process**:
1. Server presents certificate
2. Client validates server certificate
3. Client presents certificate
4. Server validates client certificate
5. TLS tunnel established
6. Authentication complete

**Advantages**:
- **Strongest security** (certificate-based)
- No password vulnerabilities
- Mutual authentication

**Disadvantages**:
- **Complex setup**: PKI infrastructure required
- Certificate management overhead
- Certificate deployment to all clients

**Use Case**: High-security environments, government, financial

#### 3. EAP-TTLS (EAP-Tunneled TLS)

**Similar to PEAP** but more flexible:

**Characteristics**:
- **TLS tunnel** like PEAP
- **Server certificate** required
- **Various inner methods**: PAP, CHAP, MSCHAPv2
- **No client certificate** needed

**Advantages**:
- Flexible inner authentication
- More secure than PEAP (in theory)

**Disadvantages**:
- Less common than PEAP
- Limited vendor support

**Use Case**: Mixed environments, legacy systems

#### 4. EAP-FAST (EAP-Flexible Authentication via Secure Tunneling)

**Cisco proprietary** (now open):

**Characteristics**:
- **No server certificate** required (optional)
- Uses **PAC** (Protected Access Credential)
- Fast deployment

**Advantages**:
- No PKI infrastructure needed
- Easy deployment

**Disadvantages**:
- Less common
- Vendor-specific features

**Use Case**: Cisco-centric environments

### EAP Method Comparison

| Method | Server Cert | Client Cert | Credentials | Security | Ease of Deploy |
|--------|-------------|-------------|-------------|----------|----------------|
| PEAP | Required | No | Username/Password | Good | Easy |
| EAP-TLS | Required | Required | Certificates | Excellent | Complex |
| EAP-TTLS | Required | No | Username/Password | Good | Moderate |
| EAP-FAST | Optional | No | Username/Password | Good | Easy |

---

## RADIUS (Remote Authentication Dial-In User Service)

### Overview

**RADIUS** is the centralized authentication server:
- Standard protocol (RFC 2865)
- Client/server model
- **UDP ports**: 1812 (auth), 1813 (accounting)

### RADIUS Components

**RADIUS Server**:
- Authenticates users
- Stores user credentials
- Enforces policies
- Logs authentication attempts

**Common RADIUS Servers**:
- **FreeRADIUS**: Open source, Linux
- **Microsoft NPS** (Network Policy Server): Windows
- **Cisco ISE** (Identity Services Engine): Commercial
- **ClearPass** (Aruba): Commercial

### RADIUS Process

1. **Client connects** to AP
2. **AP** forwards credentials to RADIUS server
3. **RADIUS** verifies credentials (Active Directory, LDAP, database)
4. **RADIUS** sends Accept or Reject
5. **AP** grants or denies access

**RADIUS Attributes**:
- **Access-Accept**: Authentication successful
- **Access-Reject**: Authentication failed
- **Access-Challenge**: More info needed (e.g., second factor)

**Additional Attributes**:
- **VLAN assignment**: Dynamic VLAN based on user/group
- **Bandwidth limits**: QoS policies per user
- **Session timeout**: Automatic disconnect
- **Filter-ID**: Firewall rules per user

### RADIUS vs TACACS+

| Feature | RADIUS | TACACS+ |
|---------|--------|---------|
| **Protocol** | UDP | TCP |
| **Encryption** | Password only | Full packet |
| **Vendor** | Standard | Cisco |
| **Primary Use** | Network access | Device admin |
| **Accounting** | Combined | Separate |

**RADIUS**: Wireless, VPN, network access
**TACACS+**: Router/switch management, privileged access

---

## Captive Portals

### Overview

**Captive portal** intercepts web traffic and presents a login page:
- Used for **guest Wi-Fi**
- No WPA2/WPA3 passphrase
- Web-based authentication
- Terms of service acceptance

### How Captive Portals Work

1. **Client connects** to open SSID (no password)
2. **Client obtains IP** via DHCP
3. **All traffic redirected** to captive portal page
4. **User enters credentials** or accepts terms
5. **Portal authenticates** user (local or RADIUS)
6. **Firewall rule** allows internet access
7. **Session tracked** by MAC or IP

```
Client connects to "Guest-WiFi" (Open)
       ↓
Gets IP via DHCP
       ↓
Opens browser → HTTP request
       ↓
Redirected to captive portal: https://portal.company.com
       ↓
User logs in or accepts terms
       ↓
Internet access granted (firewall rule added)
```

### Captive Portal Features

**Authentication Options**:
- **Self-registration**: Email, phone number
- **Voucher codes**: Pre-generated codes
- **Social login**: Facebook, Google
- **RADIUS**: Corporate credentials
- **SMS verification**: Phone number

**Common Features**:
- **Terms of Service**: Legal acceptance
- **Bandwidth limiting**: Fair use policy
- **Time limits**: Auto-disconnect after X hours
- **Splash page**: Branding, advertising
- **Guest isolation**: Client-to-client blocking

**Best Practices**:
- **HTTPS** for portal (encrypt credentials)
- **VLAN isolation**: Separate guest network
- **Firewall rules**: Block internal network access
- **Session timeout**: Automatic logout
- **Logging**: Track guest usage

---

## Certificate-Based Authentication

### Public Key Infrastructure (PKI)

**PKI** provides certificate management:
- **Certificate Authority (CA)**: Issues certificates
- **Digital certificates**: Bind public key to identity
- **Certificate chain**: Root CA → Intermediate CA → End-entity

### Certificate Components

**X.509 Certificate** includes:
- **Subject**: Entity name (user, device)
- **Issuer**: CA that signed certificate
- **Public Key**: Used for encryption/verification
- **Validity**: Start and end dates
- **Signature**: CA's digital signature

### EAP-TLS Certificate Deployment

**Server Certificate**:
- Installed on RADIUS server
- Validates server identity to clients
- Must be trusted by clients (CA in trust store)

**Client Certificate**:
- Installed on each device
- Unique per user/device
- Used for authentication

**Deployment Methods**:
- **Manual**: Export/import .pfx or .p12 files
- **GPO** (Group Policy): Windows domain
- **MDM** (Mobile Device Management): iOS, Android
- **SCEP** (Simple Certificate Enrollment Protocol): Automated

---

## Summary

**Key Takeaways**:

1. **PSK**: Shared password, simple, suitable for home/small office
2. **Enterprise (802.1X)**: Individual auth, RADIUS, suitable for business
3. **802.1X Components**: Supplicant (client), Authenticator (AP), RADIUS (server)
4. **PEAP**: Most common, server cert + username/password
5. **EAP-TLS**: Most secure, mutual certificate authentication
6. **EAP-TTLS**: Similar to PEAP, more flexible inner methods
7. **RADIUS**: Centralized authentication, UDP 1812/1813
8. **Captive Portal**: Web-based auth for guest networks
9. **Certificates**: PKI infrastructure for EAP-TLS
10. **VLAN Assignment**: Dynamic VLAN based on user/group via RADIUS

**Quick Reference**:
- **Home**: WPA2/WPA3-Personal (PSK)
- **Small Business**: WPA2/WPA3-Personal or simple RADIUS
- **Enterprise**: WPA2/WPA3-Enterprise with PEAP
- **High Security**: WPA2/WPA3-Enterprise with EAP-TLS
- **Guest**: Open SSID with captive portal, VLAN isolation

**Authentication Selection**:
- **Ease of use**: PSK or PEAP (username/password)
- **Security**: EAP-TLS (certificates)
- **Manageability**: 802.1X with RADIUS (centralized)
- **Guest access**: Captive portal (web-based)

Proper authentication ensures only authorized users and devices can access the wireless network while maintaining usability and security requirements.
