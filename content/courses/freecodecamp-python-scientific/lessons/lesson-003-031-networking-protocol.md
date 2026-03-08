---
id: lesson-003-031
title: Networking Protocol
chapterId: chapter-03
order: 31
duration: 5
objectives:
  - Understand the HTTP request/response cycle
  - Identify HTTP methods (GET, POST) and their purposes
  - Read and interpret HTTP headers
  - Recognize common HTTP status codes
  - Describe the anatomy of an HTTP request and response
---

# Networking Protocol

**HTTP** (HyperText Transfer Protocol) is the protocol that powers the web. Every time you visit a website, your browser sends an HTTP request and receives an HTTP response. Understanding this protocol is fundamental to web programming.

## The Request/Response Cycle

HTTP follows a simple pattern:

1. The **client** sends a **request** to the server
2. The **server** processes the request
3. The **server** sends a **response** back to the client

```
Client                          Server
  |                               |
  |---- HTTP Request ------------>|
  |     GET /index.html           |
  |                               |  (processes request)
  |<--- HTTP Response ------------|
  |     200 OK                    |
  |     <html>...</html>          |
```

Each request-response pair is independent — the server doesn't remember previous requests (HTTP is **stateless**).

## HTTP Methods

The **method** tells the server what action to perform:

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve data | Loading a web page |
| `POST` | Send data to server | Submitting a form |
| `PUT` | Update existing data | Editing a profile |
| `DELETE` | Remove data | Deleting an account |

`GET` and `POST` are the most common. `GET` requests should never modify data on the server — they only retrieve it.

## Anatomy of an HTTP Request

An HTTP request has three parts:

```
GET /path/page.html HTTP/1.1
Host: www.example.com
User-Agent: Python/3.x
Accept: text/html
                              ← blank line separates headers from body
(optional body for POST)
```

- **Request line**: Method (`GET`), path (`/path/page.html`), and protocol version (`HTTP/1.1`)
- **Headers**: Key-value pairs providing metadata about the request
- **Body**: Optional data (used with `POST`, `PUT`)

### Common Request Headers

| Header | Purpose | Example |
|--------|---------|---------|
| `Host` | The domain name | `Host: www.example.com` |
| `User-Agent` | Identifies the client | `User-Agent: Mozilla/5.0` |
| `Accept` | What content types the client accepts | `Accept: text/html` |
| `Content-Type` | Format of the request body | `Content-Type: application/json` |

## Anatomy of an HTTP Response

The server's response also has three parts:

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234
Date: Sat, 15 Mar 2025 10:30:00 GMT
                              ← blank line
<html>
<head><title>Hello</title></head>
<body><h1>Hello, World!</h1></body>
</html>
```

- **Status line**: Protocol version, status code (`200`), and reason phrase (`OK`)
- **Headers**: Metadata about the response
- **Body**: The actual content (HTML, JSON, image data, etc.)

## HTTP Status Codes

Status codes tell the client whether the request succeeded or failed:

| Code | Meaning | Description |
|------|---------|-------------|
| **200** | OK | Request succeeded |
| **301** | Moved Permanently | Resource has a new URL |
| **302** | Found | Temporary redirect |
| **304** | Not Modified | Cached version is still valid |
| **400** | Bad Request | Server couldn't understand the request |
| **401** | Unauthorized | Authentication required |
| **403** | Forbidden | Access denied |
| **404** | Not Found | Resource doesn't exist |
| **500** | Internal Server Error | Server-side error |
| **503** | Service Unavailable | Server is overloaded or down |

The first digit indicates the category:
- **2xx**: Success
- **3xx**: Redirection
- **4xx**: Client error (your fault)
- **5xx**: Server error (their fault)

## Making a Request Conceptually

Here's the simplest possible HTTP request you could send to a server:

```
GET /page.html HTTP/1.1\r\n
Host: www.example.com\r\n
\r\n
```

The `\r\n` represents a carriage return and line feed — the standard line ending in HTTP. The blank line (`\r\n\r\n`) signals the end of the headers.

The server would respond with something like:

```
HTTP/1.1 200 OK\r\n
Content-Type: text/html\r\n
\r\n
<html><body>Hello!</body></html>
```

## Key Takeaways

- HTTP is a **request/response** protocol — the client asks, the server answers
- `GET` retrieves data; `POST` sends data to the server
- Requests and responses have a **status line**, **headers**, and an optional **body**
- Status codes indicate success (2xx), redirection (3xx), client errors (4xx), or server errors (5xx)
- HTTP lines end with `\r\n`; a blank line separates headers from the body

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
