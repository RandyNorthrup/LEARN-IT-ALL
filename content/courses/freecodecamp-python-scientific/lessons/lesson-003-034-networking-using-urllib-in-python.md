---
id: lesson-003-034
title: Networking: Using urllib in Python
chapterId: chapter-03
order: 34
duration: 5
objectives:
  - Use urllib.request to open and read web pages
  - Handle HTTP errors when making requests
  - Add custom headers to requests
  - Compare urllib to raw socket programming
  - Download files from the web
  - Manipulate URLs with urllib.parse
---

# Networking: Using urllib in Python

While building an HTTP client with raw sockets teaches you how the web works, it's impractical for real projects. Python's built-in `urllib` library handles all the low-level details — connecting, sending requests, reading responses, following redirects — so you can focus on processing the data.

## Opening a Web Page with urllib.request

The simplest way to fetch a web page:

```python
import urllib.request

fhand = urllib.request.urlopen('http://data.pr4e.org/romeo.txt')
for line in fhand:
    print(line.decode().strip())
```

`urlopen()` returns a file-like object. You can iterate over it line by line, just like a local file. Each line is returned as **bytes**, so you need `.decode()` to convert it to a string.

## Reading the Entire Response

Use `.read()` to get the complete content at once:

```python
import urllib.request

fhand = urllib.request.urlopen('http://data.pr4e.org/romeo.txt')
data = fhand.read()

print(type(data))       # <class 'bytes'>
print(len(data))        # number of bytes
print(data.decode())    # the text content
```

## urllib vs Raw Sockets

Compare the socket approach to urllib:

```python
# Raw socket — 10+ lines of code
import socket
mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
mysock.connect(('data.pr4e.org', 80))
mysock.send(b'GET /romeo.txt HTTP/1.0\r\nHost: data.pr4e.org\r\n\r\n')
data = b''
while True:
    chunk = mysock.recv(512)
    if len(chunk) < 1:
        break
    data += chunk
mysock.close()

# urllib — 3 lines of code
import urllib.request
fhand = urllib.request.urlopen('http://data.pr4e.org/romeo.txt')
data = fhand.read()
```

`urllib` handles:
- DNS resolution
- Socket creation and connection
- HTTP request formatting
- Header parsing
- Redirects (301, 302)
- HTTPS/TLS encryption

## Counting Words from a Web Page

Combine `urllib` with text processing techniques:

```python
import urllib.request

url = 'http://data.pr4e.org/romeo.txt'
fhand = urllib.request.urlopen(url)

counts = {}
for line in fhand:
    words = line.decode().strip().split()
    for word in words:
        counts[word] = counts.get(word, 0) + 1

for word, count in sorted(counts.items()):
    print(f'{word}: {count}')
```

## Handling Errors

Web requests can fail for many reasons. Use try/except to handle errors gracefully:

```python
import urllib.request
import urllib.error

url = 'http://data.pr4e.org/nonexistent.txt'

try:
    fhand = urllib.request.urlopen(url)
    data = fhand.read().decode()
    print(data)
except urllib.error.HTTPError as e:
    print(f'HTTP Error: {e.code} {e.reason}')
    # HTTP Error: 404 Not Found
except urllib.error.URLError as e:
    print(f'URL Error: {e.reason}')
    # Network unreachable, DNS failure, etc.
```

`HTTPError` is for server responses with error status codes (404, 500). `URLError` is for lower-level issues (no internet connection, DNS failure).

## Adding Custom Headers

Some servers require specific headers (like a User-Agent). Use a `Request` object:

```python
import urllib.request

url = 'http://data.pr4e.org/intro-short.txt'
req = urllib.request.Request(url)
req.add_header('User-Agent', 'Mozilla/5.0 (Python Learning)')
req.add_header('Accept', 'text/plain')

fhand = urllib.request.urlopen(req)
data = fhand.read().decode()
print(data)
```

## Checking Response Metadata

The response object provides access to headers and status information:

```python
import urllib.request

fhand = urllib.request.urlopen('http://data.pr4e.org/romeo.txt')

print(fhand.getcode())                 # 200
print(fhand.headers['Content-Type'])   # text/plain
print(fhand.geturl())                  # final URL after redirects
```

## Downloading Files

Save web content to a local file:

```python
import urllib.request

url = 'http://data.pr4e.org/romeo.txt'
local_file = 'romeo.txt'

# Method 1: Manual download
fhand = urllib.request.urlopen(url)
with open(local_file, 'wb') as out:
    out.write(fhand.read())

# Method 2: Using urlretrieve (simpler)
urllib.request.urlretrieve(url, local_file)
print(f'Downloaded to {local_file}')
```

## URL Manipulation with urllib.parse

`urllib.parse` provides tools for constructing and deconstructing URLs:

```python
from urllib.parse import urlencode, urlparse, urljoin

# Build query strings
params = {'q': 'python tutorial', 'page': '2'}
query = urlencode(params)
print(query)  # q=python+tutorial&page=2

url = 'https://example.com/search?' + query
print(url)    # https://example.com/search?q=python+tutorial&page=2

# Parse a URL into components
parsed = urlparse('https://www.example.com:8080/path?key=value')
print(parsed.scheme)    # https
print(parsed.hostname)  # www.example.com
print(parsed.port)      # 8080
print(parsed.path)      # /path
print(parsed.query)     # key=value

# Join a base URL with a relative path
full = urljoin('https://www.example.com/pages/', '../images/logo.png')
print(full)  # https://www.example.com/images/logo.png
```

## Key Takeaways

- `urllib.request.urlopen()` fetches web pages with minimal code
- It handles sockets, HTTP formatting, redirects, and HTTPS automatically
- Use `try/except` with `HTTPError` and `URLError` for robust error handling
- Add custom headers with `Request` objects for server compatibility
- `urllib.parse` provides `urlencode`, `urlparse`, and `urljoin` for URL manipulation
- `urllib` is the foundation — libraries like `requests` build on these same concepts

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
