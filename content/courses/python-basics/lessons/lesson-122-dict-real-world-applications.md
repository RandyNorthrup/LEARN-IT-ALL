---
id: lesson-122-dict-real-world-applications
title: "Dictionary Real-World Applications"
chapterId: ch9-dictionaries
order: 13
duration: 30
objectives:
  - Apply dictionaries to real problems
  - Master practical patterns
  - Build production-ready solutions
  - Understand industry use cases
---

# Dictionary Real-World Applications

Practical applications of dictionaries in real-world programming scenarios.

## Configuration Management

```python
import json
from collections import ChainMap

# Load configuration from multiple sources
def load_config():
    """Load configuration with proper precedence"""
    
    # Default configuration
    defaults = {
        "server": {
            "host": "0.0.0.0",
            "port": 8000,
            "workers": 4
        },
        "database": {
            "host": "localhost",
            "port": 5432,
            "name": "myapp"
        },
        "logging": {
            "level": "INFO",
            "format": "json"
        }
    }
    
    # Load from config file
    try:
        with open("config.json") as f:
            file_config = json.load(f)
    except FileNotFoundError:
        file_config = {}
    
    # Environment overrides
    import os
    env_config = {}
    if "APP_PORT" in os.environ:
        env_config.setdefault("server", {})["port"] = int(os.environ["APP_PORT"])
    
    # Merge with precedence: env > file > defaults
    config = ChainMap(env_config, file_config, defaults)
    return {k: dict(v) if isinstance(v, ChainMap) else v for k, v in config.items()}

config = load_config()
print(f"Server running on {config['server']['host']}:{config['server']['port']}")
```

## Caching and Memoization

```python
from functools import wraps
from collections import OrderedDict
import time

# Simple function cache
def memoize(func):
    """Cache function results"""
    cache = {}
    
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    
    return wrapper

@memoize
def fibonacci(n):
    """Calculate Fibonacci number"""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(100))  # Fast with memoization!

# LRU Cache implementation using functions
def create_lru_cache(capacity):
    """Create a Least Recently Used cache"""
    return {"_store": OrderedDict(), "_capacity": capacity}

def lru_get(cache, key):
    """Get value, mark as recently used"""
    if key not in cache["_store"]:
        return None
    cache["_store"].move_to_end(key)
    return cache["_store"][key]

def lru_put(cache, key, value):
    """Put value, evict if needed"""
    if key in cache["_store"]:
        cache["_store"].move_to_end(key)
    cache["_store"][key] = value
    if len(cache["_store"]) > cache["_capacity"]:
        cache["_store"].popitem(last=False)

def lru_repr(cache):
    """String representation of cache"""
    return f"LRUCache({dict(cache['_store'])})"

cache = create_lru_cache(3)
lru_put(cache, "a", 1)
lru_put(cache, "b", 2)
lru_put(cache, "c", 3)
lru_get(cache, "a")  # Mark 'a' as used
lru_put(cache, "d", 4)  # Evicts 'b'
print(lru_repr(cache))  # LRUCache({'c': 3, 'a': 1, 'd': 4})

# TTL Cache (Time To Live) using functions
def create_ttl_cache(ttl_seconds=60):
    """Create a cache with expiration time"""
    return {"_store": {}, "_ttl": ttl_seconds}

def ttl_put(cache, key, value):
    """Store with timestamp"""
    cache["_store"][key] = {
        "value": value,
        "timestamp": time.time()
    }

def ttl_get(cache, key):
    """Get if not expired"""
    if key not in cache["_store"]:
        return None
    
    entry = cache["_store"][key]
    age = time.time() - entry["timestamp"]
    
    if age > cache["_ttl"]:
        del cache["_store"][key]
        return None
    
    return entry["value"]

def ttl_cleanup(cache):
    """Remove expired entries"""
    now = time.time()
    expired = [
        k for k, v in cache["_store"].items()
        if now - v["timestamp"] > cache["_ttl"]
    ]
    for key in expired:
        del cache["_store"][key]

ttl_cache = create_ttl_cache(ttl_seconds=5)
ttl_put(ttl_cache, "data", "value")
print(ttl_get(ttl_cache, "data"))  # "value"
time.sleep(6)
print(ttl_get(ttl_cache, "data"))  # None (expired)
```

## Data Indexing and Search

```python
from collections import defaultdict

# Simple in-memory database with indexing using functions
def create_database():
    """Create a simple in-memory database"""
    return {
        "_data": {},           # id -> record
        "_indexes": defaultdict(lambda: defaultdict(list)),
        "_next_id": 1
    }

def db_insert(db, record):
    """Insert record and update indexes"""
    record_id = db["_next_id"]
    db["_next_id"] += 1
    
    record = {**record, "id": record_id}
    db["_data"][record_id] = record
    
    # Update indexes
    for field, value in record.items():
        if field != "id":
            db["_indexes"][field][value].append(record_id)
    
    return record_id

def db_find_by(db, field, value):
    """Find records by field value"""
    ids = db["_indexes"][field].get(value, [])
    return [db["_data"][id] for id in ids]

def db_find_by_id(db, record_id):
    """Find by primary key"""
    return db["_data"].get(record_id)

def db_update(db, record_id, updates):
    """Update record and reindex"""
    if record_id not in db["_data"]:
        raise ValueError(f"Record {record_id} not found")
    
    old_record = db["_data"][record_id]
    
    # Remove from old indexes
    for field, value in old_record.items():
        if field != "id" and field in updates:
            db["_indexes"][field][value].remove(record_id)
    
    # Update record
    db["_data"][record_id].update(updates)
    
    # Add to new indexes
    for field, value in updates.items():
        db["_indexes"][field][value].append(record_id)

# Usage
db = create_database()

# Insert records
db_insert(db, {"name": "Alice", "age": 30, "city": "NYC"})
db_insert(db, {"name": "Bob", "age": 25, "city": "LA"})
db_insert(db, {"name": "Charlie", "age": 30, "city": "NYC"})

# Query by index
users_30 = db_find_by(db, "age", 30)
print(f"Users aged 30: {[u['name'] for u in users_30]}")
# Users aged 30: ['Alice', 'Charlie']

nyc_users = db_find_by(db, "city", "NYC")
print(f"NYC users: {[u['name'] for u in nyc_users]}")
# NYC users: ['Alice', 'Charlie']
```

## Graph Representation

```python
from collections import defaultdict, deque

# Graph using adjacency list (dict of lists) with functions
def create_graph():
    """Create a graph using adjacency list"""
    return defaultdict(list)

def add_edge(graph, u, v, weight=1):
    """Add edge from u to v"""
    graph[u].append((v, weight))

def graph_bfs(graph, start):
    """Breadth-first search"""
    visited = {start}
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor, _ in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

def graph_dfs(graph, start, visited=None):
    """Depth-first search"""
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    for neighbor, _ in graph[start]:
        if neighbor not in visited:
            result.extend(graph_dfs(graph, neighbor, visited))
    
    return result

def shortest_path(graph, start, end):
    """Find shortest path using BFS"""
    if start == end:
        return [start]
    
    visited = {start}
    queue = deque([(start, [start])])
    
    while queue:
        node, path = queue.popleft()
        
        for neighbor, _ in graph[node]:
            if neighbor == end:
                return path + [neighbor]
            
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None  # No path found

# Build social network
social = create_graph()
add_edge(social, "Alice", "Bob")
add_edge(social, "Alice", "Charlie")
add_edge(social, "Bob", "David")
add_edge(social, "Charlie", "David")
add_edge(social, "David", "Eve")

# Find connections
print("BFS from Alice:", graph_bfs(social, "Alice"))
# BFS from Alice: ['Alice', 'Bob', 'Charlie', 'David', 'Eve']

path = shortest_path(social, "Alice", "Eve")
print(f"Path from Alice to Eve: {' -> '.join(path)}")
# Path from Alice to Eve: Alice -> Bob -> David -> Eve
```

## State Machine

```python
# Simple state machine using dicts and functions
def create_state_machine(initial_state):
    """Create a simple state machine"""
    return {
        "state": initial_state,
        "transitions": {},
        "handlers": {}
    }

def sm_add_transition(sm, from_state, event, to_state):
    """Define state transition"""
    if from_state not in sm["transitions"]:
        sm["transitions"][from_state] = {}
    sm["transitions"][from_state][event] = to_state

def sm_add_handler(sm, state, handler):
    """Add handler for state entry"""
    sm["handlers"][state] = handler

def sm_handle_event(sm, event):
    """Process event"""
    if sm["state"] not in sm["transitions"]:
        raise ValueError(f"No transitions from state: {sm['state']}")
    
    if event not in sm["transitions"][sm["state"]]:
        raise ValueError(f"Invalid event '{event}' for state '{sm['state']}'")
    
    new_state = sm["transitions"][sm["state"]][event]
    print(f"Transition: {sm['state']} --[{event}]--> {new_state}")
    
    sm["state"] = new_state
    
    # Execute handler
    if new_state in sm["handlers"]:
        sm["handlers"][new_state]()

# Order processing state machine
order_sm = create_state_machine("pending")

# Define transitions
sm_add_transition(order_sm, "pending", "pay", "paid")
sm_add_transition(order_sm, "paid", "ship", "shipped")
sm_add_transition(order_sm, "shipped", "deliver", "delivered")
sm_add_transition(order_sm, "pending", "cancel", "cancelled")
sm_add_transition(order_sm, "paid", "cancel", "refunded")

# Add handlers
sm_add_handler(order_sm, "paid", lambda: print("Payment confirmed!"))
sm_add_handler(order_sm, "shipped", lambda: print("Order shipped!"))
sm_add_handler(order_sm, "delivered", lambda: print("Order delivered!"))

# Process order
sm_handle_event(order_sm, "pay")      # pending -> paid
sm_handle_event(order_sm, "ship")     # paid -> shipped
sm_handle_event(order_sm, "deliver")  # shipped -> delivered
```

## Routing and Dispatch

```python
from typing import Callable, Dict
import re

# URL router using dicts and functions
def create_router():
    """Create a URL router"""
    return {"routes": {}, "patterns": []}

def add_route(router, path, handler, method="GET"):
    """Register a route"""
    if "{" in path:
        # Pattern route
        pattern = re.sub(r"\{(\w+)\}", r"(?P<\1>[^/]+)", path)
        router["patterns"].append((re.compile(f"^{pattern}$"), method, handler))
    else:
        # Exact route
        key = (path, method)
        router["routes"][key] = handler

def dispatch(router, path, method="GET"):
    """Dispatch request to handler"""
    # Try exact match first
    key = (path, method)
    if key in router["routes"]:
        return router["routes"][key]()
    
    # Try pattern match
    for pattern, route_method, handler in router["patterns"]:
        if route_method == method:
            match = pattern.match(path)
            if match:
                return handler(**match.groupdict())
    
    return {"error": "Not found"}, 404

# Create router and define routes
app = create_router()

def home():
    return {"message": "Welcome"}

def list_users():
    return {"users": ["Alice", "Bob"]}

def get_user(user_id):
    return {"user_id": user_id, "name": f"User {user_id}"}

def get_comment(post_id, comment_id):
    return {"post": post_id, "comment": comment_id}

add_route(app, "/", home)
add_route(app, "/users", list_users)
add_route(app, "/users/{user_id}", get_user)
add_route(app, "/posts/{post_id}/comments/{comment_id}", get_comment)

# Dispatch requests
print(dispatch(app, "/"))
# {'message': 'Welcome'}

print(dispatch(app, "/users"))
# {'users': ['Alice', 'Bob']}

print(dispatch(app, "/users/123"))
# {'user_id': '123', 'name': 'User 123'}

print(dispatch(app, "/posts/5/comments/10"))
# {'post': '5', 'comment': '10'}
```

## Frequency Analysis

```python
from collections import Counter
import string

def analyze_text(text):
    """Comprehensive text analysis"""
    # Clean text
    text_lower = text.lower()
    words = text_lower.split()
    
    # Word frequency
    word_freq = Counter(words)
    
    # Character frequency (letters only)
    letters = [c for c in text_lower if c in string.ascii_lowercase]
    char_freq = Counter(letters)
    
    # Word length distribution
    length_dist = Counter(len(word) for word in words)
    
    # First letter frequency
    first_letter = Counter(word[0] for word in words if word)
    
    return {
        "total_words": len(words),
        "unique_words": len(word_freq),
        "most_common_words": word_freq.most_common(10),
        "most_common_letters": char_freq.most_common(5),
        "word_length_distribution": dict(length_dist),
        "first_letter_distribution": dict(first_letter)
    }

text = """
Python is a great programming language. Python is easy to learn
and Python is powerful. Many developers love Python.
"""

analysis = analyze_text(text)
print(f"Total words: {analysis['total_words']}")
print(f"Unique words: {analysis['unique_words']}")
print(f"Most common: {analysis['most_common_words'][:3]}")
# Total words: 19
# Unique words: 15
# Most common: [('python', 3), ('is', 3), ('a', 1)]
```

## JSON/API Response Handling

```python
import json

# Handle API responses with dict helper functions
def get_nested(data, *keys, default=None):
    """Safely get nested value from dict"""
    value = data
    for key in keys:
        if isinstance(value, dict):
            value = value.get(key)
            if value is None:
                return default
        else:
            return default
    return value

def extract_fields(data, *fields):
    """Extract specific fields from nested dict"""
    result = {}
    for field in fields:
        if "." in field:
            keys = field.split(".")
            result[field] = get_nested(data, *keys)
        else:
            result[field] = data.get(field)
    return result

def transform_fields(data, mapping):
    """Transform field names in a dict"""
    result = {}
    for new_key, old_key in mapping.items():
        if "." in old_key:
            keys = old_key.split(".")
            result[new_key] = get_nested(data, *keys)
        else:
            result[new_key] = data.get(old_key)
    return result

# Example API response
api_data = {
    "user": {
        "id": 123,
        "profile": {
            "name": "Alice",
            "email": "alice@example.com"
        },
        "settings": {
            "theme": "dark",
            "notifications": True
        }
    },
    "timestamp": "2024-01-15T10:30:00Z"
}

# Safe nested access
name = get_nested(api_data, "user", "profile", "name")
print(f"Name: {name}")  # Name: Alice

# Extract fields
fields = extract_fields(api_data, "timestamp", "user.profile.email")
print(fields)
# {'timestamp': '2024-01-15T10:30:00Z', 'user.profile.email': 'alice@example.com'}

# Transform field names
transformed = transform_fields(api_data, {
    "user_id": "user.id",
    "user_name": "user.profile.name",
    "theme": "user.settings.theme"
})
print(transformed)
# {'user_id': 123, 'user_name': 'Alice', 'theme': 'dark'}
```

## Summary

**Real-World Use Cases:**

| Application | Dict Usage | Key Benefit |
|-------------|------------|-------------|
| Configuration | ChainMap, nested dicts | Layered settings |
| Caching | OrderedDict, TTL dicts | Fast lookups |
| Indexing | defaultdict(list) | O(1) search |
| Graphs | defaultdict(list) | Adjacency lists |
| State Machine | Dict transitions | Clear logic |
| Routing | Pattern matching | URL dispatch |
| Analysis | Counter | Frequency counting |
| API Handling | Nested access | Data transformation |

**Best Practices:**

- ✅ Use appropriate dict type for the problem
- ✅ Implement proper error handling
- ✅ Document data structures clearly
- ✅ Consider performance implications
- ✅ Use type hints for complex structures
- ❌ Don't over-engineer simple solutions
- ❌ Don't forget edge cases
- ❌ Don't ignore memory usage for large datasets

**Remember:** Dictionaries are Python's Swiss Army knife - master them for real-world success!
