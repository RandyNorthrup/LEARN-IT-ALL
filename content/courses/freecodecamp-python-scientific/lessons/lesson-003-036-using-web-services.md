---
id: lesson-003-036
title: Using Web Services
chapterId: chapter-03
order: 36
duration: 5
objectives:
  - Understand the difference between APIs and web pages
  - Compare data interchange formats (XML vs JSON)
  - Explain the concept of REST and why web services exist
  - Make basic API requests with Python
---

# Using Web Services

The web is far more than just pages you view in a browser. Behind the scenes, programs talk to each other constantly — retrieving weather data, processing payments, fetching social media posts — all through **web services**. Understanding web services is a critical skill for any Python developer.

## Web Pages vs. Web Services

When you visit a website, your browser requests an HTML page designed for human eyes. A **web service** works differently: it provides data in a structured format designed for programs to consume.

| Feature | Web Page | Web Service |
|---------|----------|-------------|
| Audience | Humans | Programs |
| Format | HTML (presentation) | XML or JSON (data) |
| Interaction | Click links, fill forms | Send structured requests |
| Response | Visual layout | Raw data |

Think of it this way: a restaurant menu (web page) is for customers, while the kitchen order ticket (web service) is for the cooks. Both communicate information, but in formats suited to their audience.

## Data Interchange Formats

For two programs to exchange data, they need an agreed-upon format. The two dominant formats are:

**XML (eXtensible Markup Language):**
```xml
<person>
  <name>Alice</name>
  <email>alice@example.com</email>
</person>
```

**JSON (JavaScript Object Notation):**
```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

JSON has become the preferred format for most modern APIs because it is lighter-weight and maps naturally to data structures in most programming languages. XML remains important in enterprise systems and document-oriented applications.

## The REST Concept

**REST** (Representational State Transfer) is an architectural style for designing web services. REST treats everything as a **resource** identified by a URL:

- `GET /api/users` — Retrieve a list of users
- `GET /api/users/42` — Retrieve user with ID 42
- `POST /api/users` — Create a new user
- `PUT /api/users/42` — Update user 42
- `DELETE /api/users/42` — Delete user 42

REST services are **stateless** — each request contains all the information needed to process it. The server does not remember previous requests.

## Why Web Services Exist

Web services solve several fundamental problems:

1. **Data Sharing** — Organizations can expose their data without giving direct database access
2. **Platform Independence** — A Python program can talk to a Java service or a Go service; the data format is the common language
3. **Separation of Concerns** — The data provider and the data consumer can evolve independently
4. **Reusability** — One API can serve a website, a mobile app, and third-party integrations simultaneously

## Making API Requests with Python

Python's built-in `urllib` module can make web requests:

```python
import urllib.request
import json

url = 'https://api.github.com/users/octocat'
response = urllib.request.urlopen(url)
data = response.read().decode()

user = json.loads(data)
print(f"Name: {user['name']}")
print(f"Public repos: {user['public_repos']}")
```

The `requests` library (third-party) makes this even simpler:

```python
import requests

response = requests.get('https://api.github.com/users/octocat')
user = response.json()
print(f"Name: {user['name']}")
```

## The Request-Response Cycle

Every web service interaction follows this pattern:

1. **Client** constructs a request (URL + method + optional data)
2. **Request** travels over HTTP/HTTPS to the server
3. **Server** processes the request and prepares a response
4. **Response** returns with a status code (200 OK, 404 Not Found, etc.) and data
5. **Client** parses the response data

```python
import requests

response = requests.get('https://api.example.com/data')

if response.status_code == 200:
    data = response.json()
    print("Success:", data)
else:
    print(f"Error: {response.status_code}")
```

Understanding this cycle is the foundation for everything that follows in web services — whether you are parsing XML, consuming JSON APIs, or building your own services.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
