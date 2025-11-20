---
id: "131-dict-real-world-applications"
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

# LRU Cache implementation
class LRUCache:
    """Least Recently Used cache"""
    
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity
    
    def get(self, key):
        """Get value, mark as recently used"""
        if key not in self.cache:
            return None
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key, value):
        """Put value, evict if needed"""
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
    
    def __repr__(self):
        return f"LRUCache({dict(self.cache)})"

cache = LRUCache(3)
cache.put("a", 1)
cache.put("b", 2)
cache.put("c", 3)
cache.get("a")  # Mark 'a' as used
cache.put("d", 4)  # Evicts 'b'
print(cache)  # LRUCache({'c': 3, 'a': 1, 'd': 4})

# TTL Cache (Time To Live)
class TTLCache:
    """Cache with expiration time"""
    
    def __init__(self, ttl_seconds=60):
        self.cache = {}
        self.ttl = ttl_seconds
    
    def put(self, key, value):
        """Store with timestamp"""
        self.cache[key] = {
            "value": value,
            "timestamp": time.time()
        }
    
    def get(self, key):
        """Get if not expired"""
        if key not in self.cache:
            return None
        
        entry = self.cache[key]
        age = time.time() - entry["timestamp"]
        
        if age > self.ttl:
            del self.cache[key]
            return None
        
        return entry["value"]
    
    def cleanup(self):
        """Remove expired entries"""
        now = time.time()
        expired = [
            k for k, v in self.cache.items()
            if now - v["timestamp"] > self.ttl
        ]
        for key in expired:
            del self.cache[key]

ttl_cache = TTLCache(ttl_seconds=5)
ttl_cache.put("data", "value")
print(ttl_cache.get("data"))  # "value"
time.sleep(6)
print(ttl_cache.get("data"))  # None (expired)
```

## Data Indexing and Search

```python
from collections import defaultdict

class InMemoryDatabase:
    """Simple in-memory database with indexing"""
    
    def __init__(self):
        self.data = {}  # id -> record
        self.indexes = defaultdict(lambda: defaultdict(list))
        self.next_id = 1
    
    def insert(self, record):
        """Insert record and update indexes"""
        record_id = self.next_id
        self.next_id += 1
        
        record = {**record, "id": record_id}
        self.data[record_id] = record
        
        # Update indexes
        for field, value in record.items():
            if field != "id":
                self.indexes[field][value].append(record_id)
        
        return record_id
    
    def find_by(self, field, value):
        """Find records by field value"""
        ids = self.indexes[field].get(value, [])
        return [self.data[id] for id in ids]
    
    def find_by_id(self, record_id):
        """Find by primary key"""
        return self.data.get(record_id)
    
    def update(self, record_id, updates):
        """Update record and reindex"""
        if record_id not in self.data:
            raise ValueError(f"Record {record_id} not found")
        
        old_record = self.data[record_id]
        
        # Remove from old indexes
        for field, value in old_record.items():
            if field != "id" and field in updates:
                self.indexes[field][value].remove(record_id)
        
        # Update record
        self.data[record_id].update(updates)
        
        # Add to new indexes
        for field, value in updates.items():
            self.indexes[field][value].append(record_id)

# Usage
db = InMemoryDatabase()

# Insert records
db.insert({"name": "Alice", "age": 30, "city": "NYC"})
db.insert({"name": "Bob", "age": 25, "city": "LA"})
db.insert({"name": "Charlie", "age": 30, "city": "NYC"})

# Query by index
users_30 = db.find_by("age", 30)
print(f"Users aged 30: {[u['name'] for u in users_30]}")
# Users aged 30: ['Alice', 'Charlie']

nyc_users = db.find_by("city", "NYC")
print(f"NYC users: {[u['name'] for u in nyc_users]}")
# NYC users: ['Alice', 'Charlie']
```

## Graph Representation

```python
from collections import defaultdict, deque

class Graph:
    """Graph using adjacency list (dict of lists)"""
    
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v, weight=1):
        """Add edge from u to v"""
        self.graph[u].append((v, weight))
    
    def bfs(self, start):
        """Breadth-first search"""
        visited = {start}
        queue = deque([start])
        result = []
        
        while queue:
            node = queue.popleft()
            result.append(node)
            
            for neighbor, _ in self.graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return result
    
    def dfs(self, start, visited=None):
        """Depth-first search"""
        if visited is None:
            visited = set()
        
        visited.add(start)
        result = [start]
        
        for neighbor, _ in self.graph[start]:
            if neighbor not in visited:
                result.extend(self.dfs(neighbor, visited))
        
        return result
    
    def shortest_path(self, start, end):
        """Find shortest path using BFS"""
        if start == end:
            return [start]
        
        visited = {start}
        queue = deque([(start, [start])])
        
        while queue:
            node, path = queue.popleft()
            
            for neighbor, _ in self.graph[node]:
                if neighbor == end:
                    return path + [neighbor]
                
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, path + [neighbor]))
        
        return None  # No path found

# Build social network
social = Graph()
social.add_edge("Alice", "Bob")
social.add_edge("Alice", "Charlie")
social.add_edge("Bob", "David")
social.add_edge("Charlie", "David")
social.add_edge("David", "Eve")

# Find connections
print("BFS from Alice:", social.bfs("Alice"))
# BFS from Alice: ['Alice', 'Bob', 'Charlie', 'David', 'Eve']

path = social.shortest_path("Alice", "Eve")
print(f"Path from Alice to Eve: {' -> '.join(path)}")
# Path from Alice to Eve: Alice -> Bob -> David -> Eve
```

## State Machine

```python
class StateMachine:
    """Simple state machine using dict"""
    
    def __init__(self, initial_state):
        self.state = initial_state
        self.transitions = {}
        self.handlers = {}
    
    def add_transition(self, from_state, event, to_state):
        """Define state transition"""
        if from_state not in self.transitions:
            self.transitions[from_state] = {}
        self.transitions[from_state][event] = to_state
    
    def add_handler(self, state, handler):
        """Add handler for state entry"""
        self.handlers[state] = handler
    
    def handle_event(self, event):
        """Process event"""
        if self.state not in self.transitions:
            raise ValueError(f"No transitions from state: {self.state}")
        
        if event not in self.transitions[self.state]:
            raise ValueError(f"Invalid event '{event}' for state '{self.state}'")
        
        new_state = self.transitions[self.state][event]
        print(f"Transition: {self.state} --[{event}]--> {new_state}")
        
        self.state = new_state
        
        # Execute handler
        if new_state in self.handlers:
            self.handlers[new_state]()

# Order processing state machine
order_sm = StateMachine("pending")

# Define transitions
order_sm.add_transition("pending", "pay", "paid")
order_sm.add_transition("paid", "ship", "shipped")
order_sm.add_transition("shipped", "deliver", "delivered")
order_sm.add_transition("pending", "cancel", "cancelled")
order_sm.add_transition("paid", "cancel", "refunded")

# Add handlers
order_sm.add_handler("paid", lambda: print("Payment confirmed!"))
order_sm.add_handler("shipped", lambda: print("Order shipped!"))
order_sm.add_handler("delivered", lambda: print("Order delivered!"))

# Process order
order_sm.handle_event("pay")      # pending -> paid
order_sm.handle_event("ship")     # paid -> shipped
order_sm.handle_event("deliver")  # shipped -> delivered
```

## Routing and Dispatch

```python
from typing import Callable, Dict
import re

class Router:
    """URL router using dict"""
    
    def __init__(self):
        self.routes = {}
        self.patterns = []
    
    def route(self, path, method="GET"):
        """Decorator to register route"""
        def decorator(handler):
            if "{" in path:
                # Pattern route
                pattern = re.sub(r"\{(\w+)\}", r"(?P<\1>[^/]+)", path)
                self.patterns.append((re.compile(f"^{pattern}$"), method, handler))
            else:
                # Exact route
                key = (path, method)
                self.routes[key] = handler
            return handler
        return decorator
    
    def dispatch(self, path, method="GET"):
        """Dispatch request to handler"""
        # Try exact match first
        key = (path, method)
        if key in self.routes:
            return self.routes[key]()
        
        # Try pattern match
        for pattern, route_method, handler in self.patterns:
            if route_method == method:
                match = pattern.match(path)
                if match:
                    return handler(**match.groupdict())
        
        return {"error": "Not found"}, 404

# Create router
app = Router()

@app.route("/")
def home():
    return {"message": "Welcome"}

@app.route("/users")
def list_users():
    return {"users": ["Alice", "Bob"]}

@app.route("/users/{user_id}")
def get_user(user_id):
    return {"user_id": user_id, "name": f"User {user_id}"}

@app.route("/posts/{post_id}/comments/{comment_id}")
def get_comment(post_id, comment_id):
    return {"post": post_id, "comment": comment_id}

# Dispatch requests
print(app.dispatch("/"))
# {'message': 'Welcome'}

print(app.dispatch("/users"))
# {'users': ['Alice', 'Bob']}

print(app.dispatch("/users/123"))
# {'user_id': '123', 'name': 'User 123'}

print(app.dispatch("/posts/5/comments/10"))
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
# Unique words: 13
# Most common: [('python', 4), ('is', 3), ('a', 1)]
```

## JSON/API Response Handling

```python
import json

class APIResponse:
    """Handle API responses with dict"""
    
    def __init__(self, data):
        self.data = data
    
    def get_nested(self, *keys, default=None):
        """Safely get nested value"""
        value = self.data
        for key in keys:
            if isinstance(value, dict):
                value = value.get(key)
                if value is None:
                    return default
            else:
                return default
        return value
    
    def extract_fields(self, *fields):
        """Extract specific fields"""
        result = {}
        for field in fields:
            if "." in field:
                keys = field.split(".")
                result[field] = self.get_nested(*keys)
            else:
                result[field] = self.data.get(field)
        return result
    
    def transform(self, mapping):
        """Transform field names"""
        result = {}
        for new_key, old_key in mapping.items():
            if "." in old_key:
                keys = old_key.split(".")
                result[new_key] = self.get_nested(*keys)
            else:
                result[new_key] = self.data.get(old_key)
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

response = APIResponse(api_data)

# Safe nested access
name = response.get_nested("user", "profile", "name")
print(f"Name: {name}")  # Name: Alice

# Extract fields
fields = response.extract_fields("timestamp", "user.profile.email")
print(fields)
# {'timestamp': '2024-01-15T10:30:00Z', 'user.profile.email': 'alice@example.com'}

# Transform field names
transformed = response.transform({
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
