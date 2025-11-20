---
id: 60-scope-best-practices
title: Scope Best Practices
chapterId: ch7-scope
order: 7
duration: 25
objectives:
  - Learn scope best practices
  - Avoid common scope pitfalls
  - Write maintainable scope code
  - Use global and nonlocal appropriately
  - Prevent scope-related bugs
---

# Scope Best Practices

## Introduction

Proper scope management leads to cleaner, more maintainable code. This lesson covers best practices and common pitfalls.

## Best Practice 1: Minimize Global Variables

```python
# ❌ BAD: Global variables everywhere
counter = 0
total = 0

def add_score(points):
    global counter, total
    counter += 1
    total += points

# ✅ GOOD: Encapsulate in class or closure
def create_score_tracker():
    counter = 0
    total = 0
    
    def add(points):
        nonlocal counter, total
        counter += 1
        total += points
        return total
    
    def get_average():
        return total / counter if counter > 0 else 0
    
    return add, get_average

add, avg = create_score_tracker()
add(10)
add(20)
print(avg())  # 15.0
```

## Best Practice 2: Use Function Parameters

```python
# ❌ BAD: Reading from outer scope
base_url = "https://api.example.com"

def make_request(endpoint):
    url = f"{base_url}/{endpoint}"  # Depends on global
    return url

# ✅ GOOD: Pass as parameter
def make_request(base_url, endpoint):
    url = f"{base_url}/{endpoint}"
    return url

# Or use default parameter
def make_request(endpoint, base_url="https://api.example.com"):
    url = f"{base_url}/{endpoint}"
    return url
```

## Best Practice 3: Avoid Modifying Globals

```python
# ❌ BAD: Modifying global list
todos = []

def add_todo(task):
    global todos
    todos.append(task)

# ✅ GOOD: Return new value
def add_todo(todos, task):
    return todos + [task]

# Or use a class
class TodoList:
    def __init__(self):
        self.todos = []
    
    def add(self, task):
        self.todos.append(task)
```

## Best Practice 4: Constants Are OK as Globals

```python
# ✅ GOOD: Configuration constants
MAX_RETRIES = 3
TIMEOUT_SECONDS = 30
API_VERSION = "v2"
DEFAULT_ENCODING = "utf-8"

def make_request(endpoint):
    # Reading constants is fine
    for attempt in range(MAX_RETRIES):
        # ... use TIMEOUT_SECONDS, API_VERSION
        pass
```

## Best Practice 5: Be Explicit with nonlocal/global

```python
# ❌ BAD: Unclear intent
x = 10

def modify():
    global x  # Hidden at top of function
    # ... many lines of code ...
    x = 20  # Easy to miss global modification

# ✅ GOOD: Clear and minimal scope
def create_counter():
    count = 0
    
    def increment():
        nonlocal count  # Clear intent, limited scope
        count += 1
        return count
    
    return increment
```

## Best Practice 6: Avoid Shadowing Built-ins

```python
# ❌ BAD: Shadowing built-in functions
def process_data():
    list = []  # Shadows built-in list()
    dict = {}  # Shadows built-in dict()
    max = 10   # Shadows built-in max()
    
    # Now can't use list(), dict(), max() as functions!

# ✅ GOOD: Use descriptive names
def process_data():
    items = []
    mapping = {}
    max_value = 10
    
    # Can still use list(), dict(), max()
```

## Best Practice 7: Single Responsibility

```python
# ❌ BAD: Function doing too much with complex scope
def process_user_data():
    global user_count, error_count, total_processed
    
    # Reading from globals
    # Modifying multiple globals
    # Too many responsibilities
    
# ✅ GOOD: Separate concerns
def validate_user(user):
    return user.get("email") is not None

def save_user(user):
    # Save logic here
    return True

def process_user_data(users):
    results = {"success": 0, "errors": 0}
    
    for user in users:
        if validate_user(user):
            if save_user(user):
                results["success"] += 1
        else:
            results["errors"] += 1
    
    return results
```

## Common Pitfall 1: Late Binding in Loops

```python
# ❌ BAD: All functions reference same 'i'
functions = []
for i in range(3):
    def func():
        return i
    functions.append(func)

print([f() for f in functions])  # [2, 2, 2] - all return 2!

# ✅ GOOD: Capture value immediately
functions = []
for i in range(3):
    def func(x=i):  # Default argument captures current value
        return x
    functions.append(func)

print([f() for f in functions])  # [0, 1, 2] - correct!

# ✅ ALSO GOOD: Use closure with parameter
functions = []
for i in range(3):
    def make_func(x):
        def func():
            return x
        return func
    functions.append(make_func(i))

print([f() for f in functions])  # [0, 1, 2] - correct!
```

## Common Pitfall 2: Mutable Default Arguments

```python
# ❌ BAD: Mutable default argument shared across calls
def add_item(item, items=[]):  # DON'T DO THIS!
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2] - unexpected!
print(add_item(3))  # [1, 2, 3] - same list!

# ✅ GOOD: Use None and create new list
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [2] - new list each time
```

## Common Pitfall 3: Forgetting nonlocal

```python
# ❌ BAD: Creates local variable instead of modifying enclosing
def outer():
    count = 0
    
    def increment():
        count = count + 1  # UnboundLocalError!
        return count
    
    # increment()  # Error!

# ✅ GOOD: Use nonlocal
def outer():
    count = 0
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    return increment

inc = outer()
print(inc())  # 1
print(inc())  # 2
```

## Common Pitfall 4: Accessing Before Assignment

```python
# ❌ BAD: Using variable before assignment
x = 10

def func():
    print(x)  # Intend to use global
    x = 20    # But assignment makes x local!

# func()  # UnboundLocalError!

# ✅ GOOD: Declare intent clearly
x = 10

def func():
    global x  # Make intent clear
    print(x)
    x = 20
```

## Practical Example: Clean Scope Design

```python
# Configuration (global constants - OK)
MAX_ATTEMPTS = 3
RATE_LIMIT = 5

# ✅ Well-designed function with clear scope
def create_api_client(base_url):
    """Create API client with encapsulated state."""
    
    # Private state in closure
    request_count = 0
    last_request_time = 0
    
    def make_request(endpoint, method="GET"):
        """Make API request with rate limiting."""
        nonlocal request_count, last_request_time
        
        # Check rate limit (using global constant)
        import time
        current_time = time.time()
        
        if current_time - last_request_time < 1 / RATE_LIMIT:
            return {"error": "Rate limit exceeded"}
        
        # Make request
        url = f"{base_url}/{endpoint}"
        request_count += 1
        last_request_time = current_time
        
        return {
            "url": url,
            "method": method,
            "request_number": request_count
        }
    
    def get_stats():
        """Get request statistics."""
        return {
            "total_requests": request_count,
            "rate_limit": RATE_LIMIT
        }
    
    return make_request, get_stats

# Usage
request, stats = create_api_client("https://api.example.com")
print(request("/users"))
print(stats())
```

## Debugging Scope Issues

```python
def debug_scope():
    x = "local"
    
    # Use locals() to see local variables
    print("Local variables:", locals())
    
    # Use globals() to see global variables
    print("Global 'MAX_ATTEMPTS':", globals().get("MAX_ATTEMPTS"))
    
    def inner():
        y = "inner_local"
        print("Inner locals:", locals())
    
    inner()

debug_scope()
```

## Code Review Checklist

**When reviewing scope usage:**
- [ ] Are global variables minimized?
- [ ] Are constants uppercase and truly constant?
- [ ] Is `nonlocal`/`global` necessary or can parameters be used?
- [ ] Are built-in names not shadowed?
- [ ] Are mutable default arguments avoided?
- [ ] Is variable lifetime clear and appropriate?
- [ ] Are closures capturing values correctly?
- [ ] Is scope complexity minimized?

## Summary

**Best Practices:**
- Minimize global variables
- Use parameters instead of reading outer scope
- Make constants explicit (UPPERCASE)
- Be explicit with `nonlocal`/`global`
- Avoid shadowing built-ins
- Single responsibility per function

**Common Pitfalls:**
- Late binding in loops
- Mutable default arguments
- Forgetting `nonlocal`
- Accessing before local assignment

**Remember:** Simpler scope = easier debugging!

## Next Steps

Next, you'll learn global keyword usage and when to avoid it.
