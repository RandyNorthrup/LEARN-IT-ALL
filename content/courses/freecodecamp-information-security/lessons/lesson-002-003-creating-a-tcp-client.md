---
id: lesson-002-003
title: Creating a TCP Client
chapterId: chapter-02
order: 3
duration: 18
objectives:
  - Build a TCP client using Python's socket module
  - Use connect(), send(), and recv() to communicate with a server
  - Handle connection timeouts and errors gracefully
  - Implement a complete client-server interaction example
  - Build a basic port connector to test service availability
---

# Creating a TCP Client

## From Server to Client

In the previous lesson, we built a TCP echo server. Now we'll build the other side of the conversation — a **TCP client** that connects to a server, sends data, and receives responses.

> **⚠️ LEGAL REMINDER:** Only connect to servers running on your own machine (`localhost` / `127.0.0.1`) or systems where you have explicit written authorization. Connecting to unauthorized systems is illegal.

## The Client Socket Lifecycle

A TCP client follows a simpler lifecycle than a server:

1. **Create** the socket with `socket()`
2. **Connect** to a remote server with `connect()`
3. **Send** data with `send()` or `sendall()`
4. **Receive** the response with `recv()`
5. **Close** the connection with `close()`

Notice that clients do **not** need to `bind()` or `listen()` — the OS automatically assigns an ephemeral port for the outbound connection.

## Building a Basic TCP Client

Here's a client that connects to the echo server we built in the previous lesson:

```python
import socket

def echo_client(message, host='127.0.0.1', port=65432):
    """Connect to the echo server and send a message."""
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    try:
        # Connect to the server
        client_socket.connect((host, port))
        print(f"[+] Connected to {host}:{port}")
        
        # Send the message (must be bytes, not string)
        client_socket.sendall(message.encode('utf-8'))
        print(f"[*] Sent: {message}")
        
        # Receive the echoed response
        response = client_socket.recv(1024)
        print(f"[*] Received: {response.decode('utf-8')}")
        
        return response.decode('utf-8')
        
    except ConnectionRefusedError:
        print(f"[!] Connection refused — is the server running on {host}:{port}?")
    except socket.timeout:
        print(f"[!] Connection timed out")
    finally:
        client_socket.close()
        print("[*] Connection closed")

if __name__ == '__main__':
    echo_client("Hello, server!")
```

### Key Points

- **`sendall()` vs `send()`** — `sendall()` guarantees that all data is sent, retrying internally if needed. `send()` may send only a portion of the data and returns the number of bytes actually sent. For reliability, prefer `sendall()`.
- **Encoding** — Sockets transmit raw bytes, not strings. Always `.encode()` before sending and `.decode()` after receiving.

## Handling Timeouts

Real-world networks are unreliable. Setting a **timeout** prevents your client from hanging indefinitely if a server is unresponsive:

```python
import socket

def connect_with_timeout(host='127.0.0.1', port=65432, timeout=5):
    """Attempt a connection with a timeout."""
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    # Set a timeout (in seconds) for all socket operations
    client_socket.settimeout(timeout)
    
    try:
        client_socket.connect((host, port))
        print(f"[+] Connected to {host}:{port}")
        
        client_socket.sendall(b"ping")
        response = client_socket.recv(1024)
        print(f"[*] Response: {response.decode('utf-8')}")
        
    except socket.timeout:
        print(f"[!] Connection timed out after {timeout} seconds")
    except ConnectionRefusedError:
        print(f"[!] Port {port} is closed or no service is listening")
    except OSError as e:
        print(f"[!] Network error: {e}")
    finally:
        client_socket.close()

if __name__ == '__main__':
    connect_with_timeout()
```

## Building a Port Connector

A **port connector** checks whether specific ports on a target are accepting connections. This is the foundational concept behind port scanning — a technique we'll develop fully in upcoming lessons.

```python
import socket

def check_port(host, port, timeout=2):
    """Check if a specific port is open on the target host."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    
    try:
        result = sock.connect_ex((host, port))
        if result == 0:
            return True   # Port is open
        else:
            return False  # Port is closed or filtered
    except socket.error:
        return False
    finally:
        sock.close()

def scan_common_ports(host='127.0.0.1'):
    """Check a few common ports on localhost."""
    common_ports = {
        22: 'SSH',
        80: 'HTTP',
        443: 'HTTPS',
        3306: 'MySQL',
        5432: 'PostgreSQL',
        8080: 'HTTP-Alt',
        65432: 'Echo Server'
    }
    
    print(f"[*] Checking common ports on {host}...")
    print("-" * 40)
    
    for port, service in common_ports.items():
        status = "OPEN" if check_port(host, port) else "CLOSED"
        print(f"  Port {port:>5} ({service:>12}): {status}")

if __name__ == '__main__':
    # Only scan localhost — never scan unauthorized targets
    scan_common_ports('127.0.0.1')
```

## Complete Client-Server Interaction

To see everything working together, run the echo server from the previous lesson in one terminal, then run this interactive client in another:

```python
import socket

def interactive_client(host='127.0.0.1', port=65432):
    """Interactive client that sends user input to the echo server."""
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.settimeout(10)
    
    try:
        client_socket.connect((host, port))
        print(f"[+] Connected to {host}:{port}")
        print("[*] Type messages to send (type 'quit' to exit)\n")
        
        while True:
            message = input("You: ")
            if message.lower() == 'quit':
                break
            
            client_socket.sendall(message.encode('utf-8'))
            response = client_socket.recv(1024)
            print(f"Server: {response.decode('utf-8')}")
            
    except (ConnectionRefusedError, socket.timeout, OSError) as e:
        print(f"[!] Error: {e}")
    finally:
        client_socket.close()
        print("[*] Disconnected")

if __name__ == '__main__':
    interactive_client()
```

## Key Takeaways

- TCP clients use `connect()` to initiate a connection — no `bind()` or `listen()` needed
- Always use `sendall()` for reliable data transmission
- Set timeouts to prevent indefinite blocking on unresponsive targets
- `connect_ex()` returns an error code instead of raising an exception — useful for port checking
- Handle `ConnectionRefusedError`, `socket.timeout`, and `OSError` for robust error handling

---

*Based on the [freeCodeCamp Information Security Certification](https://www.freecodecamp.org/learn/information-security/)*
