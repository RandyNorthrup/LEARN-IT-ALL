---
id: lesson-003-030
title: Networking with Python
chapterId: chapter-03
order: 30
duration: 5
objectives:
  - Understand the client-server model
  - Identify IP addresses, ports, and protocols
  - Distinguish between HTTP and HTTPS
  - Explain how DNS resolves domain names
  - Describe how web requests work end to end
  - Introduce Python's socket module
---

# Networking with Python

Understanding networking fundamentals is essential for any programmer. Most modern applications communicate over networks — fetching web pages, calling APIs, or exchanging data between services. This lesson introduces the core concepts before diving into Python code.

## The Client-Server Model

Network communication typically follows the **client-server** model:

- **Client**: The program that initiates a connection and makes requests (your browser, a Python script)
- **Server**: The program that waits for connections and responds to requests (a web server like Apache or Nginx)

```
Client (your code)  ──request──>  Server (web server)
                    <──response──
```

A single server can handle many clients simultaneously. When you visit a website, your browser is the client and the website's server responds with HTML, CSS, and JavaScript.

## IP Addresses

Every device on a network has an **IP address** — a unique numerical label that identifies it:

- **IPv4**: `192.168.1.100` (four numbers 0-255 separated by dots)
- **IPv6**: `2001:0db8:85a3::8a2e:0370:7334` (longer format for more addresses)
- **Localhost**: `127.0.0.1` — always refers to your own machine

When you type `www.example.com`, that domain name gets translated to an IP address behind the scenes.

## Ports

A single server can run multiple services. **Ports** distinguish between them — they are numbers from 0 to 65535:

| Port | Service |
|------|---------|
| 80 | HTTP (web) |
| 443 | HTTPS (secure web) |
| 22 | SSH (secure shell) |
| 25 | SMTP (email) |
| 3306 | MySQL (database) |

A full network address combines the IP and port: `192.168.1.100:80` means "port 80 on machine 192.168.1.100."

## Protocols

A **protocol** is a set of rules that defines how data is formatted and transmitted. Common protocols include:

- **HTTP** (HyperText Transfer Protocol): The foundation of web communication. Sends data in plain text.
- **HTTPS**: HTTP with encryption (TLS/SSL). The standard for secure web communication.
- **TCP** (Transmission Control Protocol): Ensures reliable, ordered delivery of data. HTTP runs on top of TCP.
- **UDP** (User Datagram Protocol): Faster but unreliable. Used for video streaming, gaming.

## DNS — Domain Name System

**DNS** translates human-readable domain names into IP addresses:

```
www.google.com  →  DNS Lookup  →  142.250.80.100
```

The process:
1. You type `www.example.com` in your browser
2. Your computer asks a DNS server "What IP is www.example.com?"
3. The DNS server responds with the IP address
4. Your browser connects to that IP address

## How a Web Request Works

When you visit a web page, here's what happens step by step:

1. **DNS resolution**: Domain name → IP address
2. **TCP connection**: Client opens a connection to the server's IP on port 80 (or 443)
3. **HTTP request**: Client sends a request like `GET /index.html HTTP/1.1`
4. **Server processing**: Server finds the requested resource
5. **HTTP response**: Server sends back the content with a status code
6. **Rendering**: Browser displays the HTML content
7. **Connection close**: The TCP connection is closed (or kept alive for reuse)

## Python's Socket Module

Python's `socket` module provides low-level networking access. A **socket** is an endpoint for communication — like a phone that can make and receive calls:

```python
import socket

# Create a TCP socket
mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect to a server
mysock.connect(('data.pr4e.org', 80))

print('Connected!')
mysock.close()
```

- `socket.AF_INET` — use IPv4 addressing
- `socket.SOCK_STREAM` — use TCP (reliable, ordered)

In the next lessons, you'll use sockets to send HTTP requests and receive responses — essentially building a simple web browser from scratch.

## Key Takeaways

- The **client-server model** defines how programs communicate over a network
- **IP addresses** identify machines; **ports** identify services on a machine
- **HTTP/HTTPS** is the protocol for web communication
- **DNS** translates domain names (like google.com) into IP addresses
- Python's `socket` module provides low-level network communication
- Understanding these fundamentals is essential before working with web APIs

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
