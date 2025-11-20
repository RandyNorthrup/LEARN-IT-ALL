---
id: "78-networking-basics"
title: "Networking Basics"
chapterId: ch3-computing
order: 9
duration: 30
objectives:
  - Understand how computer networks work
  - Learn about IP addresses, ports, and protocols
  - Recognize network layers and the OSI model
  - Work with Python's networking capabilities
  - Understand client-server architecture
---

# Networking Basics

Computer networking allows devices to communicate and share data. Understanding networking fundamentals is essential for web development, APIs, and distributed systems.

## Network Fundamentals

```python
def explain_network_basics():
    """Explain basic networking concepts."""
    print("Network Basics:")
    
    print("\n1. What is a Network?")
    print("   - Collection of connected computers/devices")
    print("   - Share data and resources")
    print("   - Types: LAN (local), WAN (wide area), Internet (global)")
    
    print("\n2. Network Types:")
    types = [
        ("LAN", "Local Area Network", "Home/office (0-1 km)"),
        ("WAN", "Wide Area Network", "Cities/countries (>1 km)"),
        ("MAN", "Metropolitan Area Network", "City-wide (10-50 km)"),
        ("PAN", "Personal Area Network", "Personal devices (<10 m)"),
        ("Internet", "Global Network", "Worldwide network of networks"),
    ]
    
    for name, full_name, description in types:
        print(f"   {name:10} {full_name:30} {description}")
    
    print("\n3. Network Topology:")
    print("   - Star: All devices connect to central hub")
    print("   - Mesh: Every device connects to every other")
    print("   - Bus: Single cable, all devices attached")
    print("   - Ring: Devices form a circle")

explain_network_basics()
```

## IP Addresses

```python
def explain_ip_addresses():
    """Explain IP addressing."""
    print("\nIP Addresses:")
    
    print("\n1. IPv4 (32-bit):")
    print("   - Format: Four numbers 0-255 separated by dots")
    print("   - Example: 192.168.1.100")
    print("   - Total addresses: 4.3 billion (2^32)")
    print("   - Problem: Running out of addresses")
    
    print("\n2. IPv6 (128-bit):")
    print("   - Format: Eight groups of hex separated by colons")
    print("   - Example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334")
    print("   - Total addresses: 340 undecillion (2^128)")
    print("   - Solution to IPv4 shortage")
    
    print("\n3. Special IP Ranges:")
    ranges = [
        ("127.0.0.1", "Localhost (your own computer)"),
        ("192.168.x.x", "Private network (not internet-routable)"),
        ("10.x.x.x", "Private network (large organizations)"),
        ("0.0.0.0", "All interfaces / any address"),
        ("255.255.255.255", "Broadcast address"),
    ]
    
    for ip, description in ranges:
        print(f"   {ip:20} {description}")

explain_ip_addresses()

class IPv4Address:
    """Represent and manipulate IPv4 addresses."""
    
    def __init__(self, address):
        """Initialize from string like '192.168.1.100'."""
        self.octets = [int(x) for x in address.split('.')]
        
        if len(self.octets) != 4:
            raise ValueError("IPv4 must have 4 octets")
        
        for octet in self.octets:
            if not 0 <= octet <= 255:
                raise ValueError("Each octet must be 0-255")
    
    def to_string(self):
        """Convert to string format."""
        return '.'.join(str(x) for x in self.octets)
    
    def to_int(self):
        """Convert to 32-bit integer."""
        return (self.octets[0] << 24) + (self.octets[1] << 16) + \
               (self.octets[2] << 8) + self.octets[3]
    
    def to_binary(self):
        """Convert to binary representation."""
        return '.'.join(f"{x:08b}" for x in self.octets)
    
    def is_private(self):
        """Check if private IP address."""
        # 10.x.x.x, 172.16-31.x.x, 192.168.x.x
        if self.octets[0] == 10:
            return True
        if self.octets[0] == 172 and 16 <= self.octets[1] <= 31:
            return True
        if self.octets[0] == 192 and self.octets[1] == 168:
            return True
        return False
    
    def is_localhost(self):
        """Check if localhost."""
        return self.octets[0] == 127

# Test IPv4 class
print("\nIPv4 Address Examples:")
addresses = ["192.168.1.100", "10.0.0.1", "127.0.0.1", "8.8.8.8"]

for addr_str in addresses:
    addr = IPv4Address(addr_str)
    print(f"\n{addr_str}:")
    print(f"  Binary: {addr.to_binary()}")
    print(f"  Integer: {addr.to_int()}")
    print(f"  Private: {addr.is_private()}")
    print(f"  Localhost: {addr.is_localhost()}")
```

## Ports

```python
def explain_ports():
    """Explain network ports."""
    print("\nNetwork Ports:")
    
    print("\n1. What is a Port?")
    print("   - Logical endpoint for communication")
    print("   - Range: 0-65535 (16-bit number)")
    print("   - Allows multiple services on one IP")
    print("   - Format: IP:Port (e.g., 192.168.1.1:80)")
    
    print("\n2. Port Categories:")
    print("   - Well-known ports: 0-1023 (system services)")
    print("   - Registered ports: 1024-49151 (user services)")
    print("   - Dynamic ports: 49152-65535 (temporary)")
    
    print("\n3. Common Ports:")
    common_ports = [
        (20, "FTP Data", "File transfer data"),
        (21, "FTP Control", "File transfer control"),
        (22, "SSH", "Secure shell (remote access)"),
        (23, "Telnet", "Unencrypted remote access"),
        (25, "SMTP", "Email sending"),
        (53, "DNS", "Domain name resolution"),
        (80, "HTTP", "Web traffic"),
        (443, "HTTPS", "Secure web traffic"),
        (3306, "MySQL", "MySQL database"),
        (5432, "PostgreSQL", "PostgreSQL database"),
        (6379, "Redis", "Redis cache"),
        (27017, "MongoDB", "MongoDB database"),
    ]
    
    print(f"\n   {'Port':<8} {'Service':<15} {'Description'}")
    print("   " + "-" * 60)
    for port, service, description in common_ports:
        print(f"   {port:<8} {service:<15} {description}")

explain_ports()

class NetworkEndpoint:
    """Represent IP:Port combination."""
    
    def __init__(self, ip, port):
        self.ip = ip
        self.port = port
        
        if not 0 <= port <= 65535:
            raise ValueError("Port must be 0-65535")
    
    def __str__(self):
        return f"{self.ip}:{self.port}"
    
    def is_well_known_port(self):
        """Check if well-known port."""
        return 0 <= self.port <= 1023
    
    def is_registered_port(self):
        """Check if registered port."""
        return 1024 <= self.port <= 49151
    
    def is_dynamic_port(self):
        """Check if dynamic/ephemeral port."""
        return 49152 <= self.port <= 65535

# Test endpoints
endpoints = [
    NetworkEndpoint("192.168.1.100", 80),
    NetworkEndpoint("10.0.0.1", 443),
    NetworkEndpoint("127.0.0.1", 5000),
]

print("\nNetwork Endpoints:")
for endpoint in endpoints:
    print(f"{endpoint}")
    print(f"  Well-known: {endpoint.is_well_known_port()}")
    print(f"  Registered: {endpoint.is_registered_port()}")
    print(f"  Dynamic: {endpoint.is_dynamic_port()}")
```

## Protocols

```python
def explain_protocols():
    """Explain network protocols."""
    print("\nNetwork Protocols:")
    
    print("\n1. What is a Protocol?")
    print("   - Set of rules for communication")
    print("   - Defines data format and behavior")
    print("   - Both sides must use same protocol")
    
    print("\n2. Protocol Layers (OSI Model):")
    layers = [
        (7, "Application", "HTTP, FTP, SMTP", "User applications"),
        (6, "Presentation", "SSL, TLS", "Data formatting"),
        (5, "Session", "NetBIOS", "Session management"),
        (4, "Transport", "TCP, UDP", "End-to-end delivery"),
        (3, "Network", "IP, ICMP", "Routing and addressing"),
        (2, "Data Link", "Ethernet, Wi-Fi", "Local delivery"),
        (1, "Physical", "Cables, signals", "Physical transmission"),
    ]
    
    print(f"\n   {'Layer':<8} {'Name':<15} {'Protocols':<20} {'Purpose'}")
    print("   " + "-" * 75)
    for layer, name, protocols, purpose in layers:
        print(f"   {layer:<8} {name:<15} {protocols:<20} {purpose}")
    
    print("\n3. Common Protocols:")
    
    print("\n   TCP (Transmission Control Protocol):")
    print("   - Reliable: Guarantees delivery")
    print("   - Connection-oriented: Establishes connection first")
    print("   - Ordered: Data arrives in order")
    print("   - Error-checked: Detects and resends lost packets")
    print("   - Use: Web, email, file transfer")
    
    print("\n   UDP (User Datagram Protocol):")
    print("   - Unreliable: No delivery guarantee")
    print("   - Connectionless: No connection setup")
    print("   - Fast: Lower overhead")
    print("   - Use: Video streaming, gaming, DNS")
    
    print("\n   HTTP (HyperText Transfer Protocol):")
    print("   - Request-response protocol")
    print("   - Methods: GET, POST, PUT, DELETE")
    print("   - Stateless: Each request independent")
    print("   - Use: Web browsers and APIs")
    
    print("\n   HTTPS (HTTP Secure):")
    print("   - HTTP + encryption (TLS/SSL)")
    print("   - Protects data in transit")
    print("   - Verifies server identity")
    print("   - Use: Secure websites")

explain_protocols()
```

## Client-Server Model

```python
class SimpleServer:
    """Simplified server simulation."""
    
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.running = False
        self.clients = []
    
    def start(self):
        """Start server."""
        self.running = True
        print(f"Server started on {self.host}:{self.port}")
        print(f"Listening for connections...")
    
    def accept_connection(self, client_addr):
        """Accept client connection."""
        self.clients.append(client_addr)
        print(f"Client connected from {client_addr}")
    
    def receive_data(self, client_addr, data):
        """Receive data from client."""
        print(f"Received from {client_addr}: {data}")
        return self.process_request(data)
    
    def process_request(self, data):
        """Process client request."""
        # Echo back (simple example)
        response = f"Server received: {data}"
        return response
    
    def send_data(self, client_addr, data):
        """Send data to client."""
        print(f"Sending to {client_addr}: {data}")
    
    def stop(self):
        """Stop server."""
        self.running = False
        print(f"Server stopped")

class SimpleClient:
    """Simplified client simulation."""
    
    def __init__(self, client_id):
        self.client_id = client_id
        self.connected = False
        self.server_addr = None
    
    def connect(self, host, port):
        """Connect to server."""
        self.server_addr = f"{host}:{port}"
        self.connected = True
        print(f"Client {self.client_id} connecting to {self.server_addr}")
    
    def send_request(self, data):
        """Send request to server."""
        if not self.connected:
            print("Not connected to server")
            return None
        
        print(f"Client {self.client_id} sending: {data}")
        return data
    
    def receive_response(self, data):
        """Receive response from server."""
        print(f"Client {self.client_id} received: {data}")
    
    def disconnect(self):
        """Disconnect from server."""
        self.connected = False
        print(f"Client {self.client_id} disconnected")

# Simulate client-server interaction
print("\nClient-Server Example:")
print("=" * 50)

# Start server
server = SimpleServer("127.0.0.1", 8000)
server.start()

print()

# Client connects
client = SimpleClient("Client-1")
client.connect("127.0.0.1", 8000)
server.accept_connection("192.168.1.100:54321")

print()

# Client sends request
request = client.send_request("Hello, Server!")
response = server.receive_data("192.168.1.100:54321", request)
server.send_data("192.168.1.100:54321", response)
client.receive_response(response)

print()

# Client disconnects
client.disconnect()
server.stop()
```

## HTTP Requests

```python
def explain_http():
    """Explain HTTP protocol."""
    print("\nHTTP Protocol:")
    
    print("\n1. HTTP Request Structure:")
    print("""
   GET /api/users HTTP/1.1
   Host: example.com
   User-Agent: Mozilla/5.0
   Accept: application/json
   
   [Optional body data]
   """)
    
    print("\n2. HTTP Methods:")
    methods = [
        ("GET", "Retrieve data", "Get user list"),
        ("POST", "Create data", "Create new user"),
        ("PUT", "Update data (full)", "Replace user info"),
        ("PATCH", "Update data (partial)", "Update user email"),
        ("DELETE", "Remove data", "Delete user"),
        ("HEAD", "Get headers only", "Check if resource exists"),
        ("OPTIONS", "Get allowed methods", "CORS preflight"),
    ]
    
    print(f"   {'Method':<10} {'Purpose':<25} {'Example'}")
    print("   " + "-" * 65)
    for method, purpose, example in methods:
        print(f"   {method:<10} {purpose:<25} {example}")
    
    print("\n3. HTTP Status Codes:")
    codes = [
        ("200", "OK", "Success"),
        ("201", "Created", "Resource created"),
        ("204", "No Content", "Success, no data"),
        ("301", "Moved Permanently", "Resource moved"),
        ("400", "Bad Request", "Invalid request"),
        ("401", "Unauthorized", "Authentication required"),
        ("403", "Forbidden", "No permission"),
        ("404", "Not Found", "Resource not found"),
        ("500", "Internal Server Error", "Server error"),
        ("502", "Bad Gateway", "Invalid upstream response"),
        ("503", "Service Unavailable", "Server overloaded"),
    ]
    
    print(f"\n   {'Code':<8} {'Name':<25} {'Meaning'}")
    print("   " + "-" * 65)
    for code, name, meaning in codes:
        print(f"   {code:<8} {name:<25} {meaning}")

explain_http()

class HTTPRequest:
    """Simplified HTTP request."""
    
    def __init__(self, method, path, headers=None, body=None):
        self.method = method
        self.path = path
        self.headers = headers or {}
        self.body = body
    
    def to_string(self):
        """Convert to HTTP request string."""
        lines = [f"{self.method} {self.path} HTTP/1.1"]
        
        for key, value in self.headers.items():
            lines.append(f"{key}: {value}")
        
        lines.append("")  # Empty line
        
        if self.body:
            lines.append(str(self.body))
        
        return "\n".join(lines)

class HTTPResponse:
    """Simplified HTTP response."""
    
    def __init__(self, status_code, status_text, headers=None, body=None):
        self.status_code = status_code
        self.status_text = status_text
        self.headers = headers or {}
        self.body = body
    
    def to_string(self):
        """Convert to HTTP response string."""
        lines = [f"HTTP/1.1 {self.status_code} {self.status_text}"]
        
        for key, value in self.headers.items():
            lines.append(f"{key}: {value}")
        
        lines.append("")  # Empty line
        
        if self.body:
            lines.append(str(self.body))
        
        return "\n".join(lines)

# Example HTTP exchange
print("\nHTTP Request Example:")
request = HTTPRequest(
    "GET",
    "/api/users/123",
    headers={
        "Host": "api.example.com",
        "User-Agent": "Python/3.11",
        "Accept": "application/json"
    }
)
print(request.to_string())

print("\nHTTP Response Example:")
response = HTTPResponse(
    200,
    "OK",
    headers={
        "Content-Type": "application/json",
        "Content-Length": "45"
    },
    body='{"id": 123, "name": "Alice", "email": "alice@example.com"}'
)
print(response.to_string())
```

## DNS (Domain Name System)

```python
class SimpleDNS:
    """Simplified DNS resolver."""
    
    def __init__(self):
        # Simulated DNS records
        self.records = {
            "localhost": "127.0.0.1",
            "google.com": "142.250.185.46",
            "github.com": "140.82.114.4",
            "example.com": "93.184.216.34",
        }
    
    def resolve(self, domain):
        """Resolve domain name to IP address."""
        print(f"Resolving '{domain}'...")
        
        if domain in self.records:
            ip = self.records[domain]
            print(f"  ✓ {domain} → {ip}")
            return ip
        else:
            print(f"  ✗ Domain not found")
            return None
    
    def reverse_lookup(self, ip):
        """Reverse lookup: IP to domain."""
        print(f"Reverse lookup '{ip}'...")
        
        for domain, addr in self.records.items():
            if addr == ip:
                print(f"  ✓ {ip} → {domain}")
                return domain
        
        print(f"  ✗ No domain found for IP")
        return None

# Test DNS
dns = SimpleDNS()

print("\nDNS Resolution Examples:")
dns.resolve("google.com")
dns.resolve("github.com")
dns.resolve("unknown.com")

print()
dns.reverse_lookup("127.0.0.1")
dns.reverse_lookup("192.168.1.1")
```

## Python Networking

```python
def python_networking_examples():
    """Show Python networking capabilities."""
    print("\nPython Networking:")
    
    print("\n1. HTTP Requests (requests library):")
    print("""
   import requests
   
   # GET request
   response = requests.get('https://api.example.com/users')
   data = response.json()
   
   # POST request
   response = requests.post('https://api.example.com/users', 
                            json={'name': 'Alice'})
   """)
    
    print("\n2. Socket Programming (low-level):")
    print("""
   import socket
   
   # Create socket
   sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
   
   # Connect to server
   sock.connect(('example.com', 80))
   
   # Send data
   sock.send(b'GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n')
   
   # Receive data
   data = sock.recv(1024)
   
   # Close
   sock.close()
   """)
    
    print("\n3. Web Frameworks:")
    print("   - Flask: Lightweight web framework")
    print("   - FastAPI: Modern API framework")
    print("   - Django: Full-featured web framework")

python_networking_examples()
```

## Summary

**Networking Fundamentals:**
- **Network**: Connected computers sharing data
- **LAN**: Local network (home/office)
- **WAN**: Wide area network (internet)

**Addressing:**
- **IP Address**: Unique identifier for devices (IPv4: 32-bit, IPv6: 128-bit)
- **Port**: Logical endpoint (0-65535) for services
- **DNS**: Converts domain names to IP addresses

**Protocols:**
- **TCP**: Reliable, ordered, connection-oriented
- **UDP**: Fast, unreliable, connectionless
- **HTTP**: Web protocol (request-response)
- **HTTPS**: Secure HTTP with encryption

**Architecture:**
- **Client-Server**: Clients request, servers respond
- **Request-Response**: Common communication pattern
- **API**: Application Programming Interface for services

Understanding networking enables you to build web applications, APIs, and distributed systems in Python.
