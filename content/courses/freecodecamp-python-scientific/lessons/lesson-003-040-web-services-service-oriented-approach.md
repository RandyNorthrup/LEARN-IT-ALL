---
id: lesson-003-040
title: Web Services: Service Oriented Approach
chapterId: chapter-03
order: 40
duration: 5
objectives:
  - Understand service-oriented architecture and microservices
  - Explain API-first design and separation of data from presentation
  - Apply REST principles including resources and HTTP methods
  - Build a simple API consumer in Python
---

# Web Services: Service Oriented Approach

The **service-oriented approach** is a way of building software systems where functionality is broken into independent services that communicate over a network. Instead of building one massive application, you build small, focused services that work together.

## From Monoliths to Services

Traditionally, applications were built as **monoliths** — a single program handled everything: the user interface, business logic, and data storage. This works for small projects but creates problems at scale:

- A bug in one feature can crash the entire application
- Every developer must understand the whole codebase
- You cannot scale one feature independently of others
- Technology choices are locked in for the entire system

The **service-oriented approach** breaks the monolith into independent services:

```
Monolith:              Service-Oriented:
┌───────────────┐      ┌──────┐  ┌──────┐  ┌──────┐
│  UI + Logic   │      │ User │  │ Order│  │Search│
│  + Database   │      │ Svc  │  │ Svc  │  │ Svc  │
│  + Search     │      └──────┘  └──────┘  └──────┘
│  + Everything │          │        │        │
└───────────────┘      └────────┬───────┘
                              API Gateway
```

## Separating Data from Presentation

A key principle of the service-oriented approach is **separating data from presentation**. The service provides raw data; the client decides how to display it.

Consider a weather service. The same data endpoint can serve:
- A **web app** that shows a colorful dashboard
- A **mobile app** with a simplified view
- A **command-line tool** that prints text
- An **IoT device** that displays a temperature number

```python
# The service returns pure data
{"city": "Portland", "temp_f": 68, "condition": "Cloudy"}

# Each client presents it differently
# Web: renders an HTML card with icons
# CLI: prints "Portland: 68°F, Cloudy"
# IoT: displays "68" on an LED
```

This separation means you can change the presentation without touching the data service, and vice versa.

## REST Principles

**REST (Representational State Transfer)** is the most common architectural style for web services. It is built on these principles:

### 1. Everything Is a Resource

Each piece of data is a **resource** identified by a URL:
```
https://api.example.com/users          → Collection of users
https://api.example.com/users/42       → Specific user
https://api.example.com/users/42/posts → That user's posts
```

### 2. Standard HTTP Methods

Operations on resources map to HTTP methods:

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Read data | Fetch user profile |
| POST | Create new data | Register a new user |
| PUT | Update (replace) | Update entire profile |
| PATCH | Partial update | Change just the email |
| DELETE | Remove data | Delete an account |

### 3. Stateless Communication

Each request must contain all the information the server needs. The server does not remember previous requests. This makes services scalable — any server instance can handle any request.

### 4. Standard Response Codes

```
200 OK           → Success
201 Created      → New resource created
400 Bad Request  → Client sent invalid data
401 Unauthorized → Authentication required
404 Not Found    → Resource does not exist
500 Server Error → Something broke on the server
```

## Building an API Consumer

Let's build a practical API consumer that fetches and processes data:

```python
import urllib.request
import json

def fetch_users():
    """Fetch user data from a public API."""
    url = 'https://jsonplaceholder.typicode.com/users'
    
    response = urllib.request.urlopen(url)
    data = response.read().decode()
    users = json.loads(data)
    
    return users

def display_user_summary(users):
    """Display a summary of user data."""
    print(f"Total users: {len(users)}\n")
    
    for user in users:
        name = user['name']
        email = user['email']
        city = user['address']['city']
        company = user['company']['name']
        print(f"{name}")
        print(f"  Email: {email}")
        print(f"  City: {city}")
        print(f"  Company: {company}")
        print()

def find_users_by_city(users, city):
    """Filter users by city (case-insensitive)."""
    return [
        user for user in users 
        if user['address']['city'].lower() == city.lower()
    ]

# Use the API consumer
users = fetch_users()
display_user_summary(users)
```

## API-First Design

In modern software development, teams often design the **API first** before building any user interface. This approach ensures:

1. **Clear contracts** — Frontend and backend teams agree on data shapes upfront
2. **Parallel development** — Teams can work simultaneously against the agreed API
3. **Flexibility** — Multiple clients (web, mobile, CLI) can be built independently
4. **Testability** — APIs can be tested with automated tools without a UI

The service-oriented approach transforms how we build software. Instead of tightly coupled components, we create independent services that communicate through well-defined APIs, leading to systems that are more flexible, scalable, and maintainable.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
