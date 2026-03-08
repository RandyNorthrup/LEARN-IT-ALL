---
id: lesson-003-032
title: Networking: Write a Web Browser
chapterId: chapter-03
order: 32
duration: 5
objectives:
  - Create a TCP socket and connect to a web server
  - Send an HTTP GET request using raw sockets
  - Receive and decode the HTTP response
  - Parse response headers and body
  - Build a complete working HTTP client
---

# Networking: Write a Web Browser

The best way to understand HTTP is to build a simple web browser from scratch using Python sockets. In this lesson, you'll write code that connects to a web server, sends an HTTP request, and reads the response — exactly what a browser does behind the scenes.

## Step 1: Create a Socket and Connect

First, create a TCP socket and connect to a web server on port 80:

```python
import socket

mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
mysock.connect(('data.pr4e.org', 80))
```

- `AF_INET` — IPv4 addressing
- `SOCK_STREAM` — TCP (reliable, ordered connection)
- Port `80` — standard HTTP port

## Step 2: Send an HTTP Request

HTTP requests must be sent as **bytes**, not strings. Use `.encode()` to convert:

```python
cmd = 'GET /romeo.txt HTTP/1.0\r\nHost: data.pr4e.org\r\n\r\n'
mysock.send(cmd.encode())
```

Let's break down the request:
- `GET /romeo.txt HTTP/1.0` — request the file `/romeo.txt` using HTTP 1.0
- `Host: data.pr4e.org` — required header identifying the server
- `\r\n\r\n` — blank line signaling the end of headers

We use HTTP/1.0 (instead of 1.1) because it closes the connection after the response, making our code simpler.

## Step 3: Receive the Response

The server sends the response in chunks. Read them in a loop until no more data arrives:

```python
data = b''
while True:
    chunk = mysock.recv(512)
    if len(chunk) < 1:
        break
    data += chunk

mysock.close()
```

`recv(512)` reads up to 512 bytes at a time. When the server closes the connection, `recv()` returns an empty bytes object.

## Step 4: Decode and Display

Convert the bytes to a string and print:

```python
print(data.decode())
```

The output includes both **headers** and **body**:

```
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 167

But soft what light through yonder window breaks
It is the east and Juliet is the sun
Arise fair sun and kill the envious moon
...
```

## Complete Working Example

Here's the full program assembled:

```python
import socket

# Create and connect
mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
mysock.connect(('data.pr4e.org', 80))

# Send HTTP GET request
cmd = 'GET /romeo.txt HTTP/1.0\r\nHost: data.pr4e.org\r\n\r\n'
mysock.send(cmd.encode())

# Receive response
data = b''
while True:
    chunk = mysock.recv(512)
    if len(chunk) < 1:
        break
    data += chunk

mysock.close()

# Display
print(data.decode())
```

## Separating Headers and Body

The headers and body are separated by a blank line (`\r\n\r\n`). You can split them:

```python
response = data.decode()
header_end = response.find('\r\n\r\n')
headers = response[:header_end]
body = response[header_end + 4:]

print('=== HEADERS ===')
print(headers)
print()
print('=== BODY ===')
print(body)
```

## Parsing Individual Headers

Extract specific header values:

```python
header_lines = headers.split('\r\n')
status_line = header_lines[0]  # 'HTTP/1.1 200 OK'

# Parse status code
status_code = int(status_line.split()[1])
print(f'Status: {status_code}')  # Status: 200

# Extract a specific header
for line in header_lines[1:]:
    key, value = line.split(': ', 1)
    if key == 'Content-Type':
        print(f'Type: {value}')  # Type: text/plain
```

## Error Handling

Add error handling for real-world robustness:

```python
import socket

try:
    mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    mysock.settimeout(5)  # 5-second timeout
    mysock.connect(('data.pr4e.org', 80))

    cmd = 'GET /romeo.txt HTTP/1.0\r\nHost: data.pr4e.org\r\n\r\n'
    mysock.send(cmd.encode())

    data = b''
    while True:
        chunk = mysock.recv(512)
        if len(chunk) < 1:
            break
        data += chunk
    mysock.close()
    print(data.decode())

except socket.timeout:
    print('Connection timed out')
except socket.error as e:
    print(f'Socket error: {e}')
```

## Key Takeaways

- A web browser at its core is a program that sends HTTP requests and displays responses
- Use `socket.connect((host, port))` to establish a TCP connection
- Send HTTP requests as encoded bytes with `.send(cmd.encode())`
- Read responses in a loop with `.recv(512)` until the connection closes
- Headers and body are separated by `\r\n\r\n`
- This is exactly what libraries like `urllib` do behind the scenes

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
