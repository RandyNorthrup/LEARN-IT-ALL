---
id: lesson-052-dns
title: "Domain Name System (DNS)"
sidebar_label: "Lesson 52: DNS"
description: "Master DNS hierarchy, record types, resolution process, and DNS security including DNSSEC"
duration: 90
objectives:
  - Understand DNS hierarchy and namespace structure
  - Configure and interpret DNS record types (A, AAAA, MX, CNAME, PTR, etc.)
  - Explain iterative and recursive DNS resolution processes
  - Implement DNS zones (forward and reverse)
  - Troubleshoot DNS resolution issues
  - Understand DNS security concepts including DNSSEC
---

# Lesson 52: Domain Name System (DNS)

## Introduction

The Domain Name System (DNS) translates human-readable domain names (like www.example.com) into IP addresses (like 192.0.2.1) that computers use to communicate. Without DNS, we would need to memorize IP addresses for every website.

DNS is one of the most critical services on the Internet. Understanding its hierarchy, record types, and resolution process is essential for network administration and troubleshooting.

**Key Principle:** DNS is a distributed, hierarchical database that provides name-to-IP address resolution.

## DNS Fundamentals

### Why DNS?

**The Problem DNS Solves:**
```
Without DNS:
  User wants to visit website
  Must know: 203.0.113.25
  
  Problems:
    - Impossible to remember thousands of IPs
    - IP addresses change (server migrations, load balancing)
    - No meaningful organization
    - IPv6 makes it worse (2001:db8:1234:5678::1)

With DNS:
  User types: www.example.com
  DNS translates to IP: 203.0.113.25
  
  Benefits:
    - Human-friendly names
    - Abstract from underlying IPs
    - Centralized management
    - Load balancing possible
    - Easier service migration
```

**Historical Context:**
```
Early Internet (ARPANET):
  - HOSTS.TXT file on each computer
  - Manually updated from central location
  - Downloaded via FTP
  - Didn't scale beyond a few hundred hosts

1983: DNS Invented (RFC 882, 883)
  - Paul Mockapetris (USC)
  - Distributed database
  - Hierarchical structure
  - Scalable to billions of names

1987: BIND Released
  - Berkeley Internet Name Domain
  - First major DNS implementation
  - Still widely used today
```

### DNS Hierarchy

**Top-Down Structure:**
```
                        . (Root)
                       / | \
                      /  |  \
                   .com .org .net .edu ... (TLD)
                    /     |
                   /      |
              example  wikipedia
                 /          |
                /           |
            www  mail   en  www
              |    |     |    |
           [IP] [IP]  [IP] [IP]

Fully Qualified Domain Name (FQDN):
  www.example.com.  (note the trailing dot)
  
Parts (read right to left):
  . (root)
  com (Top-Level Domain - TLD)
  example (Second-Level Domain - SLD)
  www (Subdomain/Host)
```

**Domain Levels:**
```
Root Domain: .
  - Top of DNS hierarchy
  - 13 root server addresses (A-M)
  - Actually hundreds of servers (anycast)
  - Managed by IANA

Top-Level Domains (TLD):
  Generic TLDs:
    .com (commercial)
    .org (organization)
    .net (network)
    .edu (education)
    .gov (US government)
    .mil (US military)
    .info, .biz, .name, .xyz, etc.
  
  Country Code TLDs (ccTLD):
    .us (United States)
    .uk (United Kingdom)
    .ca (Canada)
    .jp (Japan)
    .de (Germany)
    ... (one per country)
  
  New gTLDs (2013+):
    .app, .dev, .blog, .shop, .tech, etc.
    Hundreds added

Second-Level Domain:
  example.com
  google.com
  wikipedia.org
  You register these from registrar

Subdomains:
  www.example.com
  mail.example.com
  ftp.example.com
  blog.example.com
  You create these (no registration needed)
```

**DNS Zones:**
```
Zone = Administrative space within DNS

Example organization: example.com

Zone: example.com
  Contains:
    example.com
    www.example.com
    mail.example.com
    ftp.example.com

Delegated subzone: europe.example.com
  Managed separately
  Different DNS servers
  Contains:
    europe.example.com
    www.europe.example.com
    paris.europe.example.com

Zone file = Text file containing DNS records for zone
```

### DNS Components

**Name Server:**
```
Server that responds to DNS queries

Types:

1. Authoritative Name Server
   - Contains actual DNS records for domain
   - Source of truth
   - Example: example.com's name servers
   
2. Recursive Resolver (Recursive Server)
   - Queries on behalf of clients
   - Caches responses
   - Does the "work" of resolution
   - Example: ISP's DNS server, Google Public DNS

3. Forwarding Server
   - Forwards queries to another server
   - Minimal caching
   - Used in corporate environments

4. Caching Server
   - Only caches, no authoritative data
   - Improves performance
```

**Root Servers:**
```
13 Root Server Addresses (A-M):
  a.root-servers.net (198.41.0.4)
  b.root-servers.net (199.9.14.201)
  c.root-servers.net (192.33.4.12)
  ... through ...
  m.root-servers.net (202.12.27.33)

Note: 13 IP addresses, but hundreds of physical servers
      Uses anycast for load distribution
      Managed by different organizations
      
Purpose:
  - Direct queries to TLD servers
  - Critical infrastructure
  - Highly redundant
```

**Resolver:**
```
Client-side DNS component

Stub Resolver:
  - Built into operating system
  - Sends queries to recursive server
  - Does NOT do recursion itself
  - Example: Computer's DNS client

Recursive Resolver:
  - Full-featured DNS server
  - Performs recursive queries
  - Caches results
  - Examples: BIND, Unbound, Windows DNS

Configuration:
  - Manually configured (static)
  - From DHCP (most common)
  - Router's IP (home networks)
  - Public DNS (8.8.8.8, 1.1.1.1)
```

## DNS Record Types

### A Record (Address)

**IPv4 Address Mapping:**
```
Format:
  hostname  TTL  class  type  address
  www       3600  IN    A     192.0.2.1

Examples:
  www.example.com.      3600  IN  A  192.0.2.1
  mail.example.com.     3600  IN  A  192.0.2.10
  ftp.example.com.      7200  IN  A  192.0.2.20

Purpose:
  - Map hostname to IPv4 address
  - Most common record type
  - Essential for web, email, everything

Multiple A records (load balancing):
  www.example.com.  IN  A  192.0.2.1
  www.example.com.  IN  A  192.0.2.2
  www.example.com.  IN  A  192.0.2.3
  
  DNS returns all three (round-robin)
  Client chooses one
```

**Syntax:**
```
Zone file format:
  host  [TTL]  IN  A  IPv4_address

With domain:
  www.example.com.  IN  A  192.0.2.1

Relative (zone is example.com):
  www  IN  A  192.0.2.1

@ symbol = zone apex (example.com itself):
  @  IN  A  192.0.2.1
  (Creates A record for example.com)
```

### AAAA Record (IPv6 Address)

**IPv6 Address Mapping:**
```
Format:
  hostname  TTL  class  type  IPv6_address
  www       3600  IN    AAAA  2001:db8::1

Examples:
  www.example.com.   IN  AAAA  2001:db8:1234:5678::1
  mail.example.com.  IN  AAAA  2001:db8:1234:5678::10
  ftp.example.com.   IN  AAAA  2001:db8:1234:5678::20

Dual-stack (both IPv4 and IPv6):
  www.example.com.  IN  A     192.0.2.1
  www.example.com.  IN  AAAA  2001:db8::1
  
  Modern clients prefer IPv6 if available
  Fallback to IPv4 if IPv6 fails
```

### CNAME Record (Canonical Name)

**Alias to Another Name:**
```
Format:
  alias  IN  CNAME  canonical_name

Examples:
  www.example.com.   IN  A      192.0.2.1
  blog.example.com.  IN  CNAME  www.example.com.
  shop.example.com.  IN  CNAME  www.example.com.

Query resolution:
  User queries: blog.example.com
  DNS returns: CNAME → www.example.com
  DNS then returns: A → 192.0.2.1

Benefits:
  - Single point of change
  - Update www.example.com, all CNAMEs follow
  - Easier management

Limitations:
  - Cannot use at zone apex (@)
  - Cannot coexist with other records for same name
  - Additional query overhead
```

**CNAME vs A Record:**
```
Option 1: Multiple A records
  www.example.com.   IN  A  192.0.2.1
  blog.example.com.  IN  A  192.0.2.1
  shop.example.com.  IN  A  192.0.2.1
  
  Change IP: Must update three records

Option 2: CNAME
  www.example.com.   IN  A      192.0.2.1
  blog.example.com.  IN  CNAME  www.example.com.
  shop.example.com.  IN  CNAME  www.example.com.
  
  Change IP: Update only www record

Use CNAME when:
  - Multiple names point to same destination
  - Destination may change
  - Easier maintenance desired

Use A record when:
  - At zone apex (example.com)
  - Need lowest latency (no extra lookup)
  - CDN requires it
```

### MX Record (Mail Exchange)

**Email Server Specification:**
```
Format:
  domain  IN  MX  priority  mail_server

Examples:
  example.com.  IN  MX  10  mail1.example.com.
  example.com.  IN  MX  20  mail2.example.com.
  example.com.  IN  MX  30  mail3.example.com.

Priority:
  - Lower number = higher priority
  - Sending server tries lowest number first
  - Failover to higher numbers if unavailable

Mail servers need A records:
  mail1.example.com.  IN  A  192.0.2.10
  mail2.example.com.  IN  A  192.0.2.11
  mail3.example.com.  IN  A  192.0.2.12

Email flow:
  1. Send email to user@example.com
  2. Look up MX records for example.com
  3. Try mail1.example.com (priority 10)
  4. If fails, try mail2.example.com (priority 20)
  5. Deliver email to selected server
```

**MX Configuration Examples:**
```
Single server:
  example.com.  IN  MX  10  mail.example.com.

Load balancing (same priority):
  example.com.  IN  MX  10  mail1.example.com.
  example.com.  IN  MX  10  mail2.example.com.
  (Random selection between equal priorities)

Primary and backup:
  example.com.  IN  MX  10  primary.example.com.
  example.com.  IN  MX  20  backup.example.com.

Cloud email (Microsoft 365):
  example.com.  IN  MX  0  example-com.mail.protection.outlook.com.

Cloud email (Google Workspace):
  example.com.  IN  MX  1   aspmx.l.google.com.
  example.com.  IN  MX  5   alt1.aspmx.l.google.com.
  example.com.  IN  MX  5   alt2.aspmx.l.google.com.
  example.com.  IN  MX  10  alt3.aspmx.l.google.com.
  example.com.  IN  MX  10  alt4.aspmx.l.google.com.
```

### PTR Record (Pointer - Reverse DNS)

**IP Address to Name Mapping:**
```
Forward DNS: www.example.com → 192.0.2.1
Reverse DNS: 192.0.2.1 → www.example.com

Special domain: in-addr.arpa (IPv4)

Example:
  IP address: 192.0.2.1
  Reverse: 1.2.0.192.in-addr.arpa.  IN  PTR  www.example.com.
  
  (IP address reversed, appended with in-addr.arpa)

IPv6 reverse domain: ip6.arpa

Example:
  IP: 2001:db8::1
  Expanded: 2001:0db8:0000:0000:0000:0000:0000:0001
  Reverse: 1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa.
  PTR: www.example.com.
```

**Purpose of Reverse DNS:**
```
Uses:
  1. Email servers (anti-spam)
     - Verify sending server matches domain
     - No PTR = suspicious
     - PTR mismatch = reject
  
  2. Logging and troubleshooting
     - Convert IPs in logs to names
     - Easier to read
  
  3. Network security
     - Identify unknown devices
     - Verify server identity
  
  4. Remote access
     - SSH, RDP connection logs
     - Show hostnames instead of IPs

Example email verification:
  Email from mail.example.com (IP 192.0.2.10)
  Receiving server:
    1. Look up PTR for 192.0.2.10
    2. Should return mail.example.com
    3. Look up A record for mail.example.com
    4. Should return 192.0.2.10
    5. Match = legitimate, No match = suspicious
```

**Configuration:**
```
Zone file for 2.0.192.in-addr.arpa:
  1    IN  PTR  www.example.com.
  10   IN  PTR  mail.example.com.
  20   IN  PTR  ftp.example.com.

Full reverse zone:
  $ORIGIN 2.0.192.in-addr.arpa.
  1    IN  PTR  www.example.com.
  10   IN  PTR  mail.example.com.
  20   IN  PTR  ftp.example.com.

Note: Reverse DNS zones managed by IP address owner
      Usually ISP or organization that owns IP block
```

### NS Record (Name Server)

**Authoritative Server Specification:**
```
Format:
  domain  IN  NS  nameserver

Examples:
  example.com.  IN  NS  ns1.example.com.
  example.com.  IN  NS  ns2.example.com.

Purpose:
  - Specify authoritative name servers for domain
  - Required for domain delegation
  - Minimum two for redundancy

Name servers need glue records (A records):
  ns1.example.com.  IN  A  192.0.2.5
  ns2.example.com.  IN  A  192.0.2.6
  
  (Otherwise circular dependency)
```

**Delegation Example:**
```
Parent zone (com):
  example.com.  IN  NS  ns1.example.com.
  example.com.  IN  NS  ns2.example.com.
  ns1.example.com.  IN  A  192.0.2.5  (glue record)
  ns2.example.com.  IN  A  192.0.2.6  (glue record)

Child zone (example.com):
  example.com.      IN  NS  ns1.example.com.
  example.com.      IN  NS  ns2.example.com.
  ns1.example.com.  IN  A   192.0.2.5
  ns2.example.com.  IN  A   192.0.2.6
  www.example.com.  IN  A   192.0.2.1

Subdomain delegation:
  europe.example.com.  IN  NS  ns1.europe.example.com.
  europe.example.com.  IN  NS  ns2.europe.example.com.
  ns1.europe.example.com.  IN  A  192.0.2.50
  ns2.europe.example.com.  IN  A  192.0.2.51
```

### SOA Record (Start of Authority)

**Zone Metadata:**
```
Format:
  zone  IN  SOA  primary_ns  admin_email  (
                 serial
                 refresh
                 retry
                 expire
                 minimum )

Example:
  example.com.  IN  SOA  ns1.example.com. admin.example.com. (
                         2024112201  ; Serial (YYYYMMDDnn)
                         3600        ; Refresh (1 hour)
                         1800        ; Retry (30 minutes)
                         604800      ; Expire (1 week)
                         86400 )     ; Minimum TTL (1 day)

Fields:
  Primary name server: ns1.example.com
  Admin email: admin.example.com (admin@example.com)
                Note: @ replaced with .
  
  Serial: Zone version number
    - Increment on every change
    - Secondary servers check serial
    - Higher serial = newer version
    - Format: YYYYMMDDnn common
  
  Refresh: How often secondary checks for updates (seconds)
  Retry: How long secondary waits if refresh fails
  Expire: Secondary stops answering if can't contact primary
  Minimum TTL: Default TTL for negative caching
```

**SOA Importance:**
```
Required:
  - Every zone must have exactly one SOA
  - First record in zone file
  - Defines zone characteristics

Serial number workflow:
  1. Admin edits zone on primary server
  2. Admin increments serial number
  3. Secondary servers notice new serial
  4. Secondary servers transfer updated zone
  5. Secondary servers now have latest data
```

### TXT Record (Text)

**Arbitrary Text Data:**
```
Format:
  name  IN  TXT  "text string"

Examples:
  example.com.  IN  TXT  "v=spf1 include:_spf.google.com ~all"
  example.com.  IN  TXT  "google-site-verification=abc123xyz"

Uses:
  1. SPF (Sender Policy Framework)
     - Email authentication
     - Specify authorized mail servers
     
  2. DKIM (DomainKeys Identified Mail)
     - Email signing
     - Public key for verification
     
  3. DMARC (Domain-based Message Authentication)
     - Email policy
     - Reporting instructions
     
  4. Domain verification
     - Prove ownership to services
     - Google, Microsoft, etc.
     
  5. General information
     - Contact info
     - Arbitrary data
```

**SPF Record Example:**
```
example.com.  IN  TXT  "v=spf1 ip4:192.0.2.0/24 include:_spf.google.com ~all"

Breakdown:
  v=spf1                   - SPF version 1
  ip4:192.0.2.0/24         - Allow this IPv4 range
  include:_spf.google.com  - Allow Google's mail servers
  ~all                     - Soft fail for others (suspicious)

Result:
  Email from 192.0.2.10: PASS
  Email from Google servers: PASS
  Email from elsewhere: SOFTFAIL (marked as suspicious)

Other qualifiers:
  +all  - Pass all (don't use)
  -all  - Fail all others (strict)
  ~all  - Softfail (recommended)
  ?all  - Neutral
```

**DMARC Record Example:**
```
_dmarc.example.com.  IN  TXT  "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"

Breakdown:
  v=DMARC1                     - DMARC version 1
  p=quarantine                 - Policy: quarantine suspicious emails
  rua=mailto:dmarc@example.com - Send aggregate reports here

Policies:
  p=none       - Monitor only (collect data)
  p=quarantine - Mark suspicious as spam
  p=reject     - Reject suspicious (strict)
```

### SRV Record (Service)

**Service Location:**
```
Format:
  _service._proto.name  TTL  IN  SRV  priority weight port target

Example:
  _sip._tcp.example.com.  IN  SRV  10  60  5060  sipserver.example.com.

Fields:
  _service: Service name (_sip, _ldap, _xmpp, etc.)
  _proto: Protocol (_tcp or _udp)
  priority: Like MX priority (lower = higher priority)
  weight: Load balancing within same priority
  port: Service port number
  target: Server hostname

Uses:
  - VoIP/SIP
  - XMPP/Jabber
  - Active Directory (LDAP, Kerberos)
  - Minecraft servers
  - Service discovery
```

**Active Directory Example:**
```
_ldap._tcp.dc._msdcs.example.com.  IN  SRV  0  100  389  dc1.example.com.
_kerberos._tcp.dc._msdcs.example.com.  IN  SRV  0  100  88  dc1.example.com.

Domain controllers advertise via SRV records
Clients find domain controllers via DNS
```

### Other Record Types

**CAA (Certification Authority Authorization):**
```
example.com.  IN  CAA  0  issue  "letsencrypt.org"
example.com.  IN  CAA  0  issuewild  "letsencrypt.org"
example.com.  IN  CAA  0  iodef  "mailto:security@example.com"

Purpose:
  - Specify which CAs can issue certificates
  - Prevents unauthorized certificate issuance
  - Security control

Fields:
  0 = flags (0 = non-critical)
  issue = can issue certificates
  issuewild = can issue wildcard certificates
  iodef = report violations
```

**NAPTR (Name Authority Pointer):**
```
Used in:
  - ENUM (E.164 telephone number mapping)
  - Dynamic Delegation Discovery System
  
Complex record type, rarely configured manually
```

**DNSSEC Records:**
```
RRSIG: Resource Record Signature
DNSKEY: DNS Public Key
DS: Delegation Signer
NSEC/NSEC3: Next Secure (authenticated denial)

Used for DNS Security Extensions
Discussed in DNSSEC section below
```

## DNS Resolution Process

### Recursive Resolution

**Full Resolution Process:**
```
Scenario: Client queries www.example.com

Step 1: Client queries local recursive resolver
  Client → Resolver: "What is www.example.com?"

Step 2: Resolver checks cache
  If cached: Return answer immediately
  If not cached: Begin recursive resolution

Step 3: Query root server
  Resolver → Root: "What is www.example.com?"
  Root → Resolver: "Ask .com TLD servers at [a-m].gtld-servers.net"

Step 4: Query TLD server
  Resolver → .com TLD: "What is www.example.com?"
  TLD → Resolver: "Ask example.com's servers: ns1.example.com (192.0.2.5)"

Step 5: Query authoritative server
  Resolver → ns1.example.com: "What is www.example.com?"
  ns1.example.com → Resolver: "A record: 192.0.2.1"

Step 6: Return to client
  Resolver → Client: "www.example.com is 192.0.2.1"

Step 7: Cache result
  Resolver caches answer for TTL duration
  Future queries answered from cache (fast)

Visual:
  Client
    ↓ ①
  Recursive Resolver (checks cache)
    ↓ ③
  Root Server (. )
    ↓ ④
  TLD Server (.com)
    ↓ ⑤
  Authoritative Server (example.com)
    ↓ ⑥
  Client receives answer
```

### Iterative Resolution

**Resolver Does the Work:**
```
Recursive query: Client to resolver
  "Find the answer for me"
  Resolver does all work
  Client gets final answer

Iterative query: Resolver to servers
  "Do you know the answer?"
  Server responds: Answer OR referral
  Resolver follows referrals

Example:
  Resolver → Root: "Do you know www.example.com?"
  Root → Resolver: "No, but try .com TLD at [servers]" (referral)
  
  Resolver → TLD: "Do you know www.example.com?"
  TLD → Resolver: "No, but try ns1.example.com" (referral)
  
  Resolver → ns1: "Do you know www.example.com?"
  ns1 → Resolver: "Yes, 192.0.2.1" (answer)

Key difference:
  Recursive: Server must provide final answer
  Iterative: Server can provide referral
```

### DNS Caching

**Performance Optimization:**
```
TTL (Time To Live):
  - Specified in seconds
  - Determines cache duration
  - Set per record

Example:
  www.example.com.  3600  IN  A  192.0.2.1
  
  TTL = 3600 seconds (1 hour)
  Resolvers cache for 1 hour
  After 1 hour, must re-query

Cache levels:
  1. Browser cache
  2. OS cache
  3. Recursive resolver cache
  4. ISP cache

Benefits:
  - Faster resolution (no external queries)
  - Reduced load on authoritative servers
  - Reduced Internet traffic
  - Better user experience

Tradeoff:
  Short TTL: Changes propagate fast, more queries
  Long TTL: Changes propagate slow, fewer queries
```

**TTL Selection:**
```
Common values:

5 minutes (300): Dynamic content, frequent changes
1 hour (3600): Normal web content
1 day (86400): Stable infrastructure
1 week (604800): Very stable (rare)

When to use short TTL:
  - Planned maintenance/migration
  - Load balancing with health checks
  - Testing environment
  - DDoS mitigation (rapid changes)

When to use long TTL:
  - Stable infrastructure
  - Reduce query load
  - Cost savings (cloud DNS pricing)
```

**Negative Caching:**
```
NXDOMAIN: Name does not exist

Query nonexistent.example.com:
  - Authoritative server returns NXDOMAIN
  - Resolver caches negative response
  - Duration: SOA record's minimum TTL
  - Future queries for same name: immediate NXDOMAIN

Benefits:
  - Prevents repeated queries for typos
  - Reduces load on authoritative servers
  - Faster error responses
```

## DNS Zones

### Forward Lookup Zone

**Name to IP Resolution:**
```
Zone: example.com

Contains records:
  example.com.       IN  A      192.0.2.1
  www.example.com.   IN  A      192.0.2.1
  mail.example.com.  IN  A      192.0.2.10
  ftp.example.com.   IN  A      192.0.2.20
  example.com.       IN  MX     10 mail.example.com.
  example.com.       IN  NS     ns1.example.com.
  example.com.       IN  NS     ns2.example.com.

Purpose:
  Map hostnames to IP addresses
  Standard DNS function
```

### Reverse Lookup Zone

**IP to Name Resolution:**
```
Zone: 2.0.192.in-addr.arpa

Contains PTR records:
  1.2.0.192.in-addr.arpa.   IN  PTR  www.example.com.
  10.2.0.192.in-addr.arpa.  IN  PTR  mail.example.com.
  20.2.0.192.in-addr.arpa.  IN  PTR  ftp.example.com.

IPv6 reverse zone: ip6.arpa
  Zone: 8.b.d.0.1.0.0.2.ip6.arpa
  (For 2001:db8::/32)

Purpose:
  Map IP addresses to hostnames
  Email verification, logging
```

### Primary vs Secondary Zones

**Zone Types:**
```
Primary (Master) Zone:
  - Authoritative source
  - Zone file stored locally
  - Administrator edits here
  - Accepts dynamic updates (if configured)
  - SOA serial incremented on changes

Secondary (Slave) Zone:
  - Read-only copy of primary
  - Zone transferred from primary (AXFR/IXFR)
  - Redundancy and load distribution
  - Checks primary's SOA serial for updates
  - Cannot be edited directly

Stub Zone:
  - Contains only NS records
  - Used for delegation
  - Improves resolution efficiency
```

**Zone Transfer:**
```
AXFR (Full zone transfer):
  - Complete zone copy
  - Used for initial sync
  - Large amount of data

IXFR (Incremental zone transfer):
  - Only changed records
  - Requires transaction logging
  - More efficient
  - Falls back to AXFR if needed

Process:
  1. Secondary checks primary's SOA serial
  2. If higher serial: Request transfer
  3. Primary sends zone data
  4. Secondary updates local copy
  5. Secondary answers queries with new data

Configuration:
  Primary must allow transfers from secondary
  Usually restricted by IP address (security)

Example BIND:
  zone "example.com" {
    type master;
    file "/etc/bind/db.example.com";
    allow-transfer { 192.0.2.6; };  // Secondary IP
  };
```

## DNS Security

### DNS Vulnerabilities

**Cache Poisoning:**
```
Attack:
  1. Attacker guesses query ID
  2. Sends fake response before real server
  3. Resolver caches fake response
  4. Clients receive wrong IP address

Result:
  Users redirected to malicious site
  Credentials stolen (phishing)

Mitigation:
  - Randomize source port (increases guessing difficulty)
  - DNSSEC (authenticated responses)
  - Limit recursion to trusted clients
  - Monitor for suspicious patterns
```

**DNS Amplification (DDoS):**
```
Attack:
  1. Attacker spoofs victim's IP address
  2. Sends small query to open DNS resolver
  3. Query requests large response (ANY record)
  4. DNS server sends large response to victim
  5. Amplification: 1 KB query → 100 KB response

Result:
  Victim overwhelmed with traffic
  Distributed Denial of Service

Mitigation:
  - Disable recursion for Internet clients
  - Rate limiting
  - Response rate limiting (RRL)
  - Block ANY queries (RFC 8482)
  - Use BCP 38 (prevent IP spoofing)
```

**DNS Tunneling:**
```
Technique:
  Encode data in DNS queries/responses
  Bypass firewall restrictions
  Exfiltrate data

Example:
  data-chunk-1.attacker.com
  data-chunk-2.attacker.com
  data-chunk-3.attacker.com
  
  Attacker's server receives queries with data

Mitigation:
  - Monitor DNS query patterns
  - Baseline normal behavior
  - Detect unusual query lengths
  - Block suspicious domains
  - Deep packet inspection (DPI)
```

**DNS Hijacking:**
```
Techniques:
  - Compromise router (change DNS settings)
  - Malware on computer (modify resolver config)
  - MITM attack (intercept DNS traffic)
  - Registrar account compromise (change name servers)

Result:
  All DNS queries redirected
  Complete traffic control

Mitigation:
  - Secure router configuration
  - Strong registrar passwords, 2FA
  - Endpoint security (anti-malware)
  - DNS over HTTPS/TLS (encrypted)
  - Registry lock (for critical domains)
```

### DNSSEC (DNS Security Extensions)

**Purpose:**
```
Problems DNSSEC solves:
  - Authenticates DNS responses
  - Ensures data integrity
  - Prevents cache poisoning
  - Verifies authoritative source

Problems DNSSEC does NOT solve:
  - Does NOT encrypt DNS queries/responses
  - Does NOT provide privacy
  - Does NOT prevent DDoS
  - Does NOT authenticate user/client
```

**How DNSSEC Works:**
```
Cryptographic signatures:

1. Zone owner creates public/private key pair
2. Zone owner signs DNS records with private key
3. Public key published in DNS (DNSKEY record)
4. Signature published with each record (RRSIG)
5. Client verifies signature using public key

Trust chain:
  Root (.) signs TLD (.com)
  TLD (.com) signs domain (example.com)
  Domain signs subdomains
  
Chain of trust from root to specific record
```

**DNSSEC Record Types:**
```
DNSKEY: Public key
  - Used to verify signatures
  - Two types: ZSK (Zone Signing Key) and KSK (Key Signing Key)

RRSIG: Resource Record Signature
  - Signature for each DNS record
  - Signed with ZSK

DS: Delegation Signer
  - Hash of child zone's DNSKEY
  - Published in parent zone
  - Links zones in trust chain

NSEC/NSEC3: Next Secure
  - Authenticated denial of existence
  - Proves record doesn't exist
  - NSEC3 provides hashing (privacy)
```

**DNSSEC Validation:**
```
Query with DNSSEC:
  1. Client queries www.example.com
  2. Resolver receives A record + RRSIG
  3. Resolver fetches DNSKEY from example.com
  4. Resolver verifies RRSIG with DNSKEY
  5. If valid: Return result to client
  6. If invalid: Return SERVFAIL

Validation states:
  - Secure: Valid signature, authenticated
  - Insecure: Zone not DNSSEC-signed (normal)
  - Bogus: Invalid signature, SERVFAIL
```

**DNSSEC Deployment Challenges:**
```
Complexity:
  - Key management
  - Key rotation (ZSK every 30 days typical)
  - Parent-child coordination (DS records)
  - Larger responses (UDP fragmentation)

Performance:
  - Cryptographic operations (CPU)
  - Larger zone files
  - More network traffic

Operational:
  - Clock synchronization critical (signature expiration)
  - Failure mode (SERVFAIL, site unreachable)
  - Debugging more difficult

Result: Adoption slower than desired (~30% of .com domains)
```

### DNS Privacy

**DNS over HTTPS (DoH):**
```
RFC 8484

Concept:
  - DNS queries over HTTPS (port 443)
  - Encrypted like web traffic
  - Indistinguishable from normal HTTPS

Benefits:
  - Privacy from ISP/network operator
  - Prevents DNS manipulation
  - Bypasses censorship

Concerns:
  - Centralization (few large providers)
  - Bypasses enterprise filtering
  - Loss of visibility for security monitoring

Configuration:
  Browser: Built-in DoH support (Firefox, Chrome)
  System: cloudflared, dnscrypt-proxy
  
Example:
  Cloudflare: https://1.1.1.1/dns-query
  Google: https://dns.google/dns-query
```

**DNS over TLS (DoT):**
```
RFC 7858

Concept:
  - DNS queries over TLS (port 853)
  - Dedicated port for DNS-over-TLS
  - Similar encryption to DoH

Differences from DoH:
  - Uses port 853 (visible as DNS traffic)
  - Easier to block/allow in firewall
  - Better for enterprise environments

Configuration:
  Android 9+: Private DNS setting
  systemd-resolved: DNSOverTLS=yes
  Unbound, Stubby: DoT support

Example:
  Cloudflare: 1.1.1.1:853
  Google: 8.8.8.8:853
  Quad9: 9.9.9.9:853
```

## DNS Troubleshooting

### Common Issues

**Cannot Resolve Names:**
```
Symptoms:
  - "Server not found"
  - "DNS lookup failed"
  - Can ping IP but not hostname

Troubleshooting:

1. Verify DNS server configured:
   Windows: ipconfig /all
   Linux: cat /etc/resolv.conf
   
2. Test DNS connectivity:
   ping 8.8.8.8 (test if DNS server reachable)
   
3. Test DNS resolution:
   nslookup www.google.com
   nslookup www.google.com 8.8.8.8 (use specific server)
   
4. Check for DNS server issue:
   Try alternate DNS (8.8.8.8, 1.1.1.1)
   
5. Check firewall:
   UDP/TCP port 53 allowed?
   
6. Clear DNS cache:
   Windows: ipconfig /flushdns
   Linux: sudo systemd-resolve --flush-caches
           sudo resolvectl flush-caches
   macOS: sudo dscacheutil -flushcache

7. Check hosts file:
   Windows: C:\Windows\System32\drivers\etc\hosts
   Linux/Mac: /etc/hosts
   Entries here override DNS
```

**Slow DNS Resolution:**
```
Symptoms:
  - Websites load slowly initially
  - Long delay before page starts loading
  - Subsequent loads fast (caching)

Causes:
  - DNS server overloaded/slow
  - Network latency to DNS server
  - DNS server issues

Solutions:
  1. Test query times:
     dig www.example.com
     Look at "Query time: XX msec"
  
  2. Try different DNS servers:
     8.8.8.8 (Google)
     1.1.1.1 (Cloudflare)
     9.9.9.9 (Quad9)
  
  3. Use local caching resolver:
     Install Unbound, dnsmasq
     Cache responses locally
  
  4. Check network path:
     traceroute to DNS server
     High latency hops?
```

**Wrong IP Returned:**
```
Symptoms:
  - Redirected to wrong website
  - "This site can't be reached" for valid site
  - IP address doesn't match expected

Causes:
  - Stale cache
  - DNS hijacking
  - Wrong DNS server

Solutions:
  1. Clear local cache:
     ipconfig /flushdns
  
  2. Query authoritative server directly:
     nslookup www.example.com ns1.example.com
  
  3. Check DNS server settings:
     Verify using correct/trusted DNS
  
  4. Scan for malware:
     DNS hijacking malware common
  
  5. Verify with multiple tools:
     nslookup, dig, online DNS checkers
```

### Diagnostic Tools

**nslookup:**
```
Basic query:
  nslookup www.example.com
  
Specify DNS server:
  nslookup www.example.com 8.8.8.8
  
Interactive mode:
  nslookup
  > set type=MX
  > example.com
  > set type=NS
  > example.com
  > exit

Query specific record:
  nslookup -type=MX example.com
  nslookup -type=TXT example.com
  nslookup -type=PTR 1.2.0.192.in-addr.arpa

Reverse lookup:
  nslookup 192.0.2.1
```

**dig (Domain Information Groper):**
```
Basic query:
  dig www.example.com
  
Short answer only:
  dig www.example.com +short
  
Specify record type:
  dig example.com MX
  dig example.com NS
  dig example.com TXT
  dig example.com ANY
  
Specify DNS server:
  dig @8.8.8.8 www.example.com
  
Trace full resolution:
  dig +trace www.example.com
  (Shows queries to root, TLD, authoritative)
  
Reverse lookup:
  dig -x 192.0.2.1
  
No recursion (ask specific server):
  dig @ns1.example.com www.example.com +norecurse

Output sections:
  ;; QUESTION SECTION: What was asked
  ;; ANSWER SECTION: The answer
  ;; AUTHORITY SECTION: Name servers
  ;; ADDITIONAL SECTION: Additional records
  ;; Query time: How long it took
  ;; SERVER: Which server answered
```

**host:**
```
Simple lookup:
  host www.example.com
  
Specify server:
  host www.example.com 8.8.8.8
  
Reverse lookup:
  host 192.0.2.1
  
Verbose output:
  host -v www.example.com
  
Query type:
  host -t MX example.com
  host -t NS example.com
```

**Windows:**
```
ipconfig /all
  - Show DNS servers configured
  
ipconfig /flushdns
  - Clear DNS cache
  
ipconfig /displaydns
  - Show cached DNS entries

Clear-DnsClientCache
  - PowerShell: Clear cache

Resolve-DnsName www.example.com
  - PowerShell: DNS query

Get-DnsClientCache
  - PowerShell: View cache
```

**Linux:**
```
cat /etc/resolv.conf
  - Show configured DNS servers
  
systemd-resolve --status
  - Show DNS configuration (systemd)
  
resolvectl query www.example.com
  - Query using system resolver
  
sudo resolvectl flush-caches
  - Clear DNS cache (systemd)

getent hosts www.example.com
  - Resolve using system libraries
  - Respects /etc/hosts

host, dig, nslookup
  - External tools (install dnsutils/bind-utils)
```

## DNS Configuration Examples

### BIND Configuration

**named.conf:**
```
options {
    directory "/var/cache/bind";
    
    // Listen on these interfaces
    listen-on { 127.0.0.1; 192.0.2.5; };
    listen-on-v6 { ::1; 2001:db8::5; };
    
    // Allow queries from these networks
    allow-query { localhost; 192.0.2.0/24; };
    
    // Recursion only for local network
    recursion yes;
    allow-recursion { localhost; 192.0.2.0/24; };
    
    // Forwarders (upstream DNS)
    forwarders {
        8.8.8.8;
        8.8.4.4;
    };
    
    // DNSSEC validation
    dnssec-validation auto;
};

// Root hints
zone "." {
    type hint;
    file "/etc/bind/db.root";
};

// Forward zone
zone "example.com" {
    type master;
    file "/etc/bind/db.example.com";
    allow-transfer { 192.0.2.6; };  // Secondary server
};

// Reverse zone
zone "2.0.192.in-addr.arpa" {
    type master;
    file "/etc/bind/db.192.0.2";
    allow-transfer { 192.0.2.6; };
};
```

**Zone File (db.example.com):**
```
$TTL 86400
@       IN      SOA     ns1.example.com. admin.example.com. (
                        2024112201      ; Serial
                        3600            ; Refresh
                        1800            ; Retry
                        604800          ; Expire
                        86400 )         ; Minimum TTL

; Name servers
@       IN      NS      ns1.example.com.
@       IN      NS      ns2.example.com.

; Mail servers
@       IN      MX      10      mail.example.com.
@       IN      MX      20      mail2.example.com.

; A records
@               IN      A       192.0.2.1
www             IN      A       192.0.2.1
mail            IN      A       192.0.2.10
mail2           IN      A       192.0.2.11
ftp             IN      A       192.0.2.20
ns1             IN      A       192.0.2.5
ns2             IN      A       192.0.2.6

; AAAA records (IPv6)
www             IN      AAAA    2001:db8::1
mail            IN      AAAA    2001:db8::10

; CNAME records
blog            IN      CNAME   www.example.com.
shop            IN      CNAME   www.example.com.

; TXT records
@               IN      TXT     "v=spf1 mx -all"
_dmarc          IN      TXT     "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"
```

**Reverse Zone File (db.192.0.2):**
```
$TTL 86400
@       IN      SOA     ns1.example.com. admin.example.com. (
                        2024112201      ; Serial
                        3600            ; Refresh
                        1800            ; Retry
                        604800          ; Expire
                        86400 )         ; Minimum TTL

; Name servers
@       IN      NS      ns1.example.com.
@       IN      NS      ns2.example.com.

; PTR records
1       IN      PTR     www.example.com.
5       IN      PTR     ns1.example.com.
6       IN      PTR     ns2.example.com.
10      IN      PTR     mail.example.com.
11      IN      PTR     mail2.example.com.
20      IN      PTR     ftp.example.com.
```

## Summary

DNS is the Internet's phone book, translating domain names to IP addresses:

**Key Concepts:**
- **Hierarchy**: Root (.) → TLD (.com) → Domain (example.com) → Host (www)
- **Record Types**:
  - A/AAAA: IPv4/IPv6 addresses
  - CNAME: Aliases
  - MX: Mail servers (with priority)
  - PTR: Reverse DNS
  - NS: Name servers
  - SOA: Zone metadata
  - TXT: Text data (SPF, DKIM, DMARC)
  - SRV: Service location
- **Resolution**: Recursive (resolver does work) vs Iterative (client follows referrals)
- **Caching**: TTL determines cache duration, improves performance
- **Zones**: Forward (name→IP) and Reverse (IP→name)

**DNS Security:**
- **Cache Poisoning**: Fake responses, use DNSSEC
- **DNS Amplification**: DDoS attacks, disable open recursion
- **DNSSEC**: Cryptographic signatures, chain of trust
- **DoH/DoT**: Encrypted DNS for privacy

**Troubleshooting:**
- Verify DNS server configuration
- Test with nslookup, dig, host
- Check connectivity to DNS server
- Clear DNS cache
- Try alternate DNS servers (8.8.8.8, 1.1.1.1)
- Use +trace to see full resolution path

**Best Practices:**
- Configure redundant name servers (minimum 2)
- Set appropriate TTLs (balance speed vs flexibility)
- Implement reverse DNS (especially for mail servers)
- Use DNSSEC for critical domains
- Monitor DNS query patterns
- Secure DNS infrastructure (restrict zone transfers, recursion)
- Regular SOA serial updates
- Document zone changes

## Additional Resources

- **RFC 1034**: Domain Names - Concepts and Facilities
- **RFC 1035**: Domain Names - Implementation and Specification
- **RFC 4033-4035**: DNSSEC specifications
- **RFC 7858**: DNS over TLS
- **RFC 8484**: DNS over HTTPS
- **CompTIA Network+ N10-008**: Domain 1.6 - DNS concepts
- **BIND**: www.isc.org/bind
- **DNS Root Servers**: www.root-servers.org

## Practice Exercises

1. Trace resolution for www.example.com from root to answer using dig +trace

2. What's the difference between CNAME and A record? When would you use each?

3. Configure forward and reverse zones for network 192.168.100.0/24

4. Why do MX records need A records for mail servers?

5. Explain DNS cache poisoning and how DNSSEC prevents it

6. Client can ping 8.8.8.8 but nslookup fails. What could be wrong?

7. Design DNS infrastructure with primary, secondary, and caching servers

**Answers:**
1. dig +trace shows: root → .com TLD → example.com NS → www.example.com A record
2. CNAME is alias to another name; A maps to IP. Use CNAME for aliases that follow primary record changes
3. Forward zone: 192-168-100.0/24 hosts; Reverse: 100.168.192.in-addr.arpa with PTR records
4. MX record points to hostname; email server needs IP, so hostname needs A/AAAA record
5. Cache poisoning sends fake responses; DNSSEC signs responses cryptographically, verifying authenticity
6. DNS server unreachable or port 53 blocked; can reach Google's server but not DNS service
7. Primary (master zone), Secondary (zone transfer from primary), Caching (recursion for clients, no authoritative data)
