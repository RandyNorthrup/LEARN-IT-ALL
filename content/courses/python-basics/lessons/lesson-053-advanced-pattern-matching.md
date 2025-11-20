---
id: "91-advanced-pattern-matching"
title: "Advanced Pattern Matching Applications"
chapterId: ch4-comparisons
order: 13
duration: 30
objectives:
  - Master complex pattern matching scenarios
  - Combine patterns with guards effectively
  - Build practical pattern matching systems
  - Understand pattern matching best practices
---

# Advanced Pattern Matching Applications

Python 3.10+ introduced structural pattern matching. Beyond basic match-case, learn advanced techniques for building robust, maintainable pattern matching systems.

## Structural Pattern Matching Review

```python
# Basic match-case
def basic_match(value):
    match value:
        case 0:
            return "Zero"
        case 1:
            return "One"
        case _:
            return "Other"

print(basic_match(0))  # Zero
print(basic_match(5))  # Other
```

## Sequence Patterns

### List Pattern Matching

```python
def analyze_list(items):
    """Match different list structures."""
    match items:
        case []:
            return "Empty list"
        
        case [single]:
            return f"Single item: {single}"
        
        case [first, second]:
            return f"Pair: {first}, {second}"
        
        case [first, *middle, last]:
            return f"First: {first}, Middle: {len(middle)}, Last: {last}"
        
        case _:
            return "Not a list"

print(analyze_list([]))                    # Empty list
print(analyze_list([42]))                  # Single item: 42
print(analyze_list([1, 2]))               # Pair: 1, 2
print(analyze_list([1, 2, 3, 4, 5]))      # First: 1, Middle: 3, Last: 5
```

### Tuple Unpacking with Patterns

```python
def process_point(point):
    """Process different point formats."""
    match point:
        case (0, 0):
            return "Origin"
        
        case (0, y):
            return f"Y-axis at {y}"
        
        case (x, 0):
            return f"X-axis at {x}"
        
        case (x, y) if x == y:
            return f"Diagonal at {x}"
        
        case (x, y):
            return f"Point at ({x}, {y})"

print(process_point((0, 0)))     # Origin
print(process_point((0, 5)))     # Y-axis at 5
print(process_point((3, 0)))     # X-axis at 3
print(process_point((4, 4)))     # Diagonal at 4
print(process_point((2, 3)))     # Point at (2, 3)

# 3D points
def process_3d_point(point):
    """Handle 3D coordinates."""
    match point:
        case (0, 0, 0):
            return "Origin"
        
        case (x, y, z) if x == y == z:
            return f"Cube corner at {x}"
        
        case (x, 0, 0):
            return f"On X-axis at {x}"
        
        case (0, y, 0):
            return f"On Y-axis at {y}"
        
        case (0, 0, z):
            return f"On Z-axis at {z}"
        
        case (x, y, z):
            return f"Point at ({x}, {y}, {z})"

print(process_3d_point((0, 0, 0)))    # Origin
print(process_3d_point((5, 5, 5)))    # Cube corner at 5
print(process_3d_point((1, 2, 3)))    # Point at (1, 2, 3)
```

## Dictionary Patterns

### Matching Dictionary Structure

```python
def process_user(user):
    """Process different user data structures."""
    match user:
        case {"type": "admin", "id": user_id}:
            return f"Admin user #{user_id}"
        
        case {"type": "user", "id": user_id, "email": email}:
            return f"Regular user #{user_id}: {email}"
        
        case {"type": "guest"}:
            return "Guest user (no ID)"
        
        case {"id": user_id}:  # Fallback for any dict with id
            return f"Unknown type user #{user_id}"
        
        case _:
            return "Invalid user data"

print(process_user({"type": "admin", "id": 1}))
# Admin user #1

print(process_user({"type": "user", "id": 2, "email": "user@test.com"}))
# Regular user #2: user@test.com

print(process_user({"type": "guest"}))
# Guest user (no ID)
```

### Partial Dictionary Matching

```python
def analyze_config(config):
    """Match configuration dictionaries."""
    match config:
        case {"debug": True, "level": level}:
            return f"Debug mode, level {level}"
        
        case {"debug": False}:
            return "Production mode"
        
        case {"cache": {"enabled": True, "ttl": ttl}}:
            return f"Cache enabled with TTL {ttl}s"
        
        case {"cache": {"enabled": False}}:
            return "Cache disabled"
        
        case {}:
            return "Empty config"
        
        case _:
            return "Invalid config"

print(analyze_config({"debug": True, "level": "verbose"}))
# Debug mode, level verbose

print(analyze_config({"cache": {"enabled": True, "ttl": 300}}))
# Cache enabled with TTL 300s

# Extra keys are ignored in patterns
print(analyze_config({"debug": False, "extra": "ignored"}))
# Production mode
```

## Class Pattern Matching

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

@dataclass
class Circle:
    center: Point
    radius: float

@dataclass
class Rectangle:
    top_left: Point
    width: float
    height: float

def describe_shape(shape):
    """Describe geometric shapes."""
    match shape:
        case Circle(center=Point(x=0, y=0), radius=r):
            return f"Circle at origin with radius {r}"
        
        case Circle(center=Point(x=x, y=y), radius=r):
            return f"Circle at ({x}, {y}) with radius {r}"
        
        case Rectangle(top_left=Point(x=0, y=0), width=w, height=h) if w == h:
            return f"Square at origin with side {w}"
        
        case Rectangle(top_left=Point(x=x, y=y), width=w, height=h):
            return f"Rectangle at ({x}, {y}) size {w}x{h}"
        
        case _:
            return "Unknown shape"

# Test shapes
circle1 = Circle(Point(0, 0), 5)
print(describe_shape(circle1))
# Circle at origin with radius 5

circle2 = Circle(Point(3, 4), 2)
print(describe_shape(circle2))
# Circle at (3, 4) with radius 2

square = Rectangle(Point(0, 0), 10, 10)
print(describe_shape(square))
# Square at origin with side 10

rect = Rectangle(Point(1, 2), 5, 3)
print(describe_shape(rect))
# Rectangle at (1, 2) size 5x3
```

## Guards with Complex Conditions

```python
def categorize_transaction(amount, category, date):
    """Categorize financial transactions."""
    match (amount, category, date):
        case (amt, _, _) if amt < 0:
            return "Invalid: negative amount"
        
        case (amt, "food", _) if amt > 100:
            return "Large food purchase"
        
        case (amt, "food", _) if amt > 50:
            return "Medium food purchase"
        
        case (_, "food", _):
            return "Small food purchase"
        
        case (amt, "travel", date) if amt > 1000 and date.startswith("2024"):
            return "Major travel expense this year"
        
        case (amt, "travel", _) if amt > 500:
            return "Significant travel expense"
        
        case (_, "travel", _):
            return "Minor travel expense"
        
        case (amt, category, _) if amt > 1000:
            return f"Large {category} purchase"
        
        case _:
            return "Regular transaction"

print(categorize_transaction(150, "food", "2024-01-15"))
# Large food purchase

print(categorize_transaction(75, "food", "2024-01-15"))
# Medium food purchase

print(categorize_transaction(1500, "travel", "2024-06-20"))
# Major travel expense this year

print(categorize_transaction(600, "travel", "2023-12-10"))
# Significant travel expense
```

## OR Patterns

```python
def categorize_status_code(code):
    """Categorize HTTP status codes."""
    match code:
        case 200 | 201 | 202 | 204:
            return "Success"
        
        case 301 | 302 | 303 | 307 | 308:
            return "Redirect"
        
        case 400 | 401 | 403 | 404:
            return "Client error"
        
        case 500 | 502 | 503 | 504:
            return "Server error"
        
        case code if 200 <= code < 300:
            return "Other success"
        
        case code if 400 <= code < 500:
            return "Other client error"
        
        case code if 500 <= code < 600:
            return "Other server error"
        
        case _:
            return "Unknown status code"

print(categorize_status_code(200))  # Success
print(categorize_status_code(404))  # Client error
print(categorize_status_code(503))  # Server error
print(categorize_status_code(206))  # Other success

# With strings
def categorize_file_type(extension):
    """Categorize file by extension."""
    match extension.lower():
        case "jpg" | "jpeg" | "png" | "gif" | "bmp":
            return "Image"
        
        case "mp4" | "avi" | "mov" | "mkv":
            return "Video"
        
        case "mp3" | "wav" | "flac" | "aac":
            return "Audio"
        
        case "txt" | "md" | "doc" | "docx" | "pdf":
            return "Document"
        
        case "py" | "js" | "java" | "cpp" | "c":
            return "Code"
        
        case _:
            return "Unknown"

print(categorize_file_type("jpg"))   # Image
print(categorize_file_type("MP4"))   # Video
print(categorize_file_type("py"))    # Code
```

## Nested Patterns

```python
def analyze_json_response(data):
    """Analyze API response structure."""
    match data:
        case {"status": "success", "data": {"user": {"name": name, "age": age}}}:
            return f"User {name}, age {age}"
        
        case {"status": "success", "data": {"users": users}} if len(users) > 0:
            return f"Retrieved {len(users)} users"
        
        case {"status": "success", "data": []}:
            return "Success but no data"
        
        case {"status": "error", "message": msg, "code": code}:
            return f"Error {code}: {msg}"
        
        case {"status": "error", "message": msg}:
            return f"Error: {msg}"
        
        case _:
            return "Invalid response format"

# Test different response structures
print(analyze_json_response({
    "status": "success",
    "data": {"user": {"name": "Alice", "age": 30}}
}))
# User Alice, age 30

print(analyze_json_response({
    "status": "success",
    "data": {"users": [{"name": "Bob"}, {"name": "Charlie"}]}
}))
# Retrieved 2 users

print(analyze_json_response({
    "status": "error",
    "message": "Not found",
    "code": 404
}))
# Error 404: Not found
```

## Command Parser

```python
def parse_command(command):
    """Parse and execute commands."""
    match command.split():
        case ["quit"] | ["exit"]:
            return "Exiting program"
        
        case ["help"]:
            return "Available commands: quit, help, add, list, delete"
        
        case ["add", *items] if items:
            return f"Adding items: {', '.join(items)}"
        
        case ["add"]:
            return "Error: add requires items"
        
        case ["delete", item_id] if item_id.isdigit():
            return f"Deleting item #{item_id}"
        
        case ["delete", item_id]:
            return f"Error: '{item_id}' is not a valid ID"
        
        case ["list"]:
            return "Listing all items"
        
        case ["list", "recent", count] if count.isdigit():
            return f"Listing {count} recent items"
        
        case ["set", key, value]:
            return f"Setting {key} = {value}"
        
        case []:
            return "No command entered"
        
        case [cmd, *_]:
            return f"Unknown command: {cmd}"

# Test various commands
print(parse_command("quit"))
# Exiting program

print(parse_command("add apple banana cherry"))
# Adding items: apple, banana, cherry

print(parse_command("delete 42"))
# Deleting item #42

print(parse_command("delete abc"))
# Error: 'abc' is not a valid ID

print(parse_command("list recent 10"))
# Listing 10 recent items

print(parse_command("set theme dark"))
# Setting theme = dark
```

## State Machine with Pattern Matching

```python
@dataclass
class State:
    """Base state class."""
    name: str

@dataclass
class Idle(State):
    pass

@dataclass
class Running(State):
    process_id: int

@dataclass
class Paused(State):
    process_id: int
    reason: str

@dataclass
class Error(State):
    error_message: str

def handle_state_transition(current_state, action):
    """Handle state transitions."""
    match (current_state, action):
        case (Idle(), "start"):
            return Running("running", 12345)
        
        case (Running(pid=pid), "pause"):
            return Paused("paused", pid, "User requested")
        
        case (Running(), "stop"):
            return Idle("idle")
        
        case (Paused(pid=pid), "resume"):
            return Running("running", pid)
        
        case (Paused(), "stop"):
            return Idle("idle")
        
        case (_, "error"):
            return Error("error", "An error occurred")
        
        case (Error(), "reset"):
            return Idle("idle")
        
        case (state, action):
            return Error("error", f"Invalid action '{action}' in state '{state.name}'")

# Simulate state machine
state = Idle("idle")
print(f"State: {state}")

state = handle_state_transition(state, "start")
print(f"After start: {state}")

state = handle_state_transition(state, "pause")
print(f"After pause: {state}")

state = handle_state_transition(state, "resume")
print(f"After resume: {state}")

state = handle_state_transition(state, "stop")
print(f"After stop: {state}")
```

## Validation with Pattern Matching

```python
def validate_api_request(request):
    """Validate API request structure."""
    match request:
        case {
            "method": "GET" | "POST" | "PUT" | "DELETE" as method,
            "path": str(path),
            "headers": dict(headers)
        } if path.startswith("/api/"):
            # Valid request structure
            match method:
                case "GET":
                    return {"valid": True, "requires_body": False}
                case "POST" | "PUT":
                    if "body" in request:
                        return {"valid": True, "requires_body": True}
                    else:
                        return {"valid": False, "error": "Body required"}
                case "DELETE":
                    return {"valid": True, "requires_body": False}
        
        case {"method": str(method)} if method not in ["GET", "POST", "PUT", "DELETE"]:
            return {"valid": False, "error": f"Unsupported method: {method}"}
        
        case {"path": str(path)} if not path.startswith("/api/"):
            return {"valid": False, "error": "Path must start with /api/"}
        
        case _:
            return {"valid": False, "error": "Invalid request format"}

# Test requests
request1 = {
    "method": "GET",
    "path": "/api/users",
    "headers": {"Authorization": "Bearer token"}
}
print(validate_api_request(request1))
# {'valid': True, 'requires_body': False}

request2 = {
    "method": "POST",
    "path": "/api/users",
    "headers": {},
    "body": {"name": "Alice"}
}
print(validate_api_request(request2))
# {'valid': True, 'requires_body': True}

request3 = {
    "method": "POST",
    "path": "/api/users",
    "headers": {}
}
print(validate_api_request(request3))
# {'valid': False, 'error': 'Body required'}
```

## Pattern Matching Best Practices

```python
# ✅ GOOD: Specific patterns first, general patterns last
def process_value_good(value):
    match value:
        case 0:                    # Most specific
            return "Zero"
        case int(n) if n < 0:     # Specific with guard
            return "Negative"
        case int(n):              # General int
            return "Positive"
        case _:                    # Catch-all last
            return "Not an integer"

# ❌ BAD: General pattern too early
def process_value_bad(value):
    match value:
        case int(n):              # Too general - catches everything
            return "Integer"
        case 0:                    # Never reached!
            return "Zero"
        case _:
            return "Not an integer"

print(process_value_good(0))    # Zero
print(process_value_good(-5))   # Negative
print(process_value_good(10))   # Positive

# ✅ GOOD: Use guards for complex conditions
def categorize_good(item):
    match item:
        case {"type": "book", "pages": pages} if pages > 500:
            return "Long book"
        case {"type": "book", "pages": pages}:
            return "Regular book"
        case {"type": str(t)}:
            return f"Unknown type: {t}"
        case _:
            return "Invalid item"

# ✅ GOOD: Extract complex logic to functions
def is_valid_user(user_dict):
    """Check if user dict is valid."""
    return "email" in user_dict and "@" in user_dict["email"]

def process_user_clean(data):
    match data:
        case {"user": user} if is_valid_user(user):
            return f"Valid user: {user['email']}"
        case {"user": user}:
            return "Invalid user data"
        case _:
            return "No user data"
```

## Summary

**Advanced Pattern Features:**
- **Sequence patterns**: Match lists/tuples with `[first, *middle, last]`
- **Dictionary patterns**: Match dict structure with partial matching
- **Class patterns**: Match dataclass/class instances
- **Guards**: Add `if` conditions to patterns
- **OR patterns**: Use `|` for multiple matches
- **Nested patterns**: Match complex nested structures

**Best Practices:**
1. **Order matters**: Most specific patterns first
2. **Use guards**: Add conditions with `if`
3. **Extract logic**: Complex guards → separate functions
4. **Be explicit**: Clear patterns over clever tricks
5. **Fallback**: Always include `case _:` catch-all

**When to Use Pattern Matching:**
- ✅ Parsing structured data (JSON, commands)
- ✅ State machines and workflows
- ✅ Multiple shape/type handling
- ✅ Complex validation logic
- ✅ Dispatcher/router patterns

**When NOT to Use:**
- ❌ Simple if-else (overkill)
- ❌ Just type checking (use isinstance)
- ❌ Boolean logic (use regular if)
- ❌ Python < 3.10 (not available)

Pattern matching is powerful for handling complex conditional logic in a structured, maintainable way!
