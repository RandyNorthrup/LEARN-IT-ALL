---
id: "83-match-case-statements"
title: "Match-Case Statements (Pattern Matching)"
chapterId: ch4-comparisons
order: 5
duration: 25
objectives:
  - Understand Python's match-case syntax (Python 3.10+)
  - Learn pattern matching for complex conditions
  - Compare match-case to if-elif chains
  - Use structural pattern matching effectively
---

# Match-Case Statements (Pattern Matching)

Python 3.10 introduced `match-case` statements, providing powerful pattern matching similar to switch statements in other languages but much more capable.

## Basic Match-Case Syntax

```python
def describe_http_status(status):
    """Describe HTTP status code using match-case."""
    match status:
        case 200:
            return "OK - Success"
        case 201:
            return "Created"
        case 400:
            return "Bad Request"
        case 404:
            return "Not Found"
        case 500:
            return "Internal Server Error"
        case _:
            return "Unknown status code"

print(describe_http_status(200))  # OK - Success
print(describe_http_status(404))  # Not Found
print(describe_http_status(999))  # Unknown status code
```

**The `_` wildcard** catches all other cases (like `else`).

## Match-Case vs If-Elif

Compare the same logic:

```python
# Using if-elif
def grade_if_elif(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

# Using match-case (less ideal for ranges)
def grade_match(score):
    match score:
        case s if s >= 90:
            return "A"
        case s if s >= 80:
            return "B"
        case s if s >= 70:
            return "C"
        case s if s >= 60:
            return "D"
        case _:
            return "F"

print(grade_if_elif(85))  # B
print(grade_match(85))    # B
```

**Note**: For range checking, `if-elif` is clearer. Match-case shines with exact values and patterns.

## Matching Multiple Values (OR Pattern)

```python
def is_weekend(day):
    """Check if day is weekend."""
    match day:
        case "Saturday" | "Sunday":
            return True
        case _:
            return False

print(is_weekend("Saturday"))  # True
print(is_weekend("Monday"))    # False

# More examples
def get_season(month):
    """Get season from month."""
    match month:
        case "December" | "January" | "February":
            return "Winter"
        case "March" | "April" | "May":
            return "Spring"
        case "June" | "July" | "August":
            return "Summer"
        case "September" | "October" | "November":
            return "Fall"
        case _:
            return "Invalid month"

print(get_season("July"))      # Summer
print(get_season("December"))  # Winter
```

## Structural Pattern Matching

Match against data structures:

```python
# Matching tuples
def describe_point(point):
    """Describe a 2D point."""
    match point:
        case (0, 0):
            return "Origin"
        case (0, y):
            return f"On Y-axis at {y}"
        case (x, 0):
            return f"On X-axis at {x}"
        case (x, y):
            return f"Point at ({x}, {y})"

print(describe_point((0, 0)))   # Origin
print(describe_point((0, 5)))   # On Y-axis at 5
print(describe_point((3, 0)))   # On X-axis at 3
print(describe_point((3, 4)))   # Point at (3, 4)

# Matching lists
def process_command(command):
    """Process command list."""
    match command:
        case ["quit"]:
            return "Exiting..."
        case ["load", filename]:
            return f"Loading {filename}"
        case ["save", filename]:
            return f"Saving to {filename}"
        case ["move", x, y]:
            return f"Moving to ({x}, {y})"
        case _:
            return "Unknown command"

print(process_command(["quit"]))           # Exiting...
print(process_command(["load", "data.txt"]))  # Loading data.txt
print(process_command(["move", 10, 20]))   # Moving to (10, 20)
```

## Matching Dictionaries

```python
def handle_event(event):
    """Handle different event types."""
    match event:
        case {"type": "click", "x": x, "y": y}:
            return f"Click at ({x}, {y})"
        case {"type": "keypress", "key": key}:
            return f"Key pressed: {key}"
        case {"type": "scroll", "amount": amount}:
            return f"Scrolled {amount} pixels"
        case _:
            return "Unknown event"

print(handle_event({"type": "click", "x": 100, "y": 200}))
# Click at (100, 200)

print(handle_event({"type": "keypress", "key": "Enter"}))
# Key pressed: Enter

print(handle_event({"type": "scroll", "amount": 50}))
# Scrolled 50 pixels
```

## Guards in Patterns

Add conditions to patterns with `if`:

```python
def categorize_number(num):
    """Categorize a number."""
    match num:
        case n if n < 0:
            return "Negative"
        case 0:
            return "Zero"
        case n if n < 10:
            return "Single digit positive"
        case n if n < 100:
            return "Two digit positive"
        case _:
            return "Large positive"

print(categorize_number(-5))   # Negative
print(categorize_number(0))    # Zero
print(categorize_number(7))    # Single digit positive
print(categorize_number(42))   # Two digit positive
print(categorize_number(150))  # Large positive

# With more complex guards
def process_user(user):
    """Process user based on attributes."""
    match user:
        case {"name": name, "age": age} if age < 18:
            return f"{name} is a minor"
        case {"name": name, "age": age} if age >= 65:
            return f"{name} is a senior"
        case {"name": name, "age": age}:
            return f"{name} is an adult"
        case _:
            return "Invalid user data"

print(process_user({"name": "Alice", "age": 15}))
# Alice is a minor

print(process_user({"name": "Bob", "age": 30}))
# Bob is an adult

print(process_user({"name": "Carol", "age": 70}))
# Carol is a senior
```

## Capturing Sub-Patterns

```python
def describe_shape(shape):
    """Describe geometric shape."""
    match shape:
        case {"type": "circle", "radius": r}:
            area = 3.14159 * r * r
            return f"Circle with radius {r}, area ≈ {area:.2f}"
        
        case {"type": "rectangle", "width": w, "height": h}:
            area = w * h
            return f"Rectangle {w}×{h}, area = {area}"
        
        case {"type": "triangle", "base": b, "height": h}:
            area = 0.5 * b * h
            return f"Triangle base {b}, height {h}, area = {area}"
        
        case _:
            return "Unknown shape"

print(describe_shape({"type": "circle", "radius": 5}))
# Circle with radius 5, area ≈ 78.54

print(describe_shape({"type": "rectangle", "width": 4, "height": 6}))
# Rectangle 4×6, area = 24

print(describe_shape({"type": "triangle", "base": 10, "height": 8}))
# Triangle base 10, height 8, area = 40.0
```

## Matching Classes

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Circle:
    def __init__(self, center, radius):
        self.center = center
        self.radius = radius

def describe_shape_object(shape):
    """Describe shape object using match-case."""
    match shape:
        case Point(x=0, y=0):
            return "Origin point"
        case Point(x=x, y=y):
            return f"Point at ({x}, {y})"
        case Circle(center=Point(x=x, y=y), radius=r):
            return f"Circle at ({x}, {y}) with radius {r}"
        case _:
            return "Unknown shape"

p1 = Point(0, 0)
p2 = Point(3, 4)
c1 = Circle(Point(5, 5), 10)

print(describe_shape_object(p1))  # Origin point
print(describe_shape_object(p2))  # Point at (3, 4)
print(describe_shape_object(c1))  # Circle at (5, 5) with radius 10
```

## When to Use Match-Case

**Use match-case when:**
- Matching exact values (like HTTP codes, commands)
- Structural pattern matching (tuples, lists, dicts)
- Complex data structures with multiple patterns
- Code reads more clearly than if-elif

**Use if-elif when:**
- Range checking (score >= 90)
- Complex boolean logic
- Older Python version (< 3.10)
- Simpler comparisons

## Practical Example: Command Parser

```python
def parse_command(cmd_string):
    """Parse and execute command string."""
    parts = cmd_string.split()
    
    match parts:
        case ["help"]:
            return "Available commands: help, exit, add, subtract, multiply"
        
        case ["exit"]:
            return "Goodbye!"
        
        case ["add", a, b]:
            return f"{a} + {b} = {int(a) + int(b)}"
        
        case ["subtract", a, b]:
            return f"{a} - {b} = {int(a) - int(b)}"
        
        case ["multiply", a, b]:
            return f"{a} × {b} = {int(a) * int(b)}"
        
        case ["divide", a, b] if int(b) != 0:
            return f"{a} ÷ {b} = {int(a) / int(b)}"
        
        case ["divide", _, "0"]:
            return "Error: Cannot divide by zero"
        
        case _:
            return "Unknown command. Type 'help' for available commands."

# Test commands
print(parse_command("help"))
# Available commands: help, exit, add, subtract, multiply

print(parse_command("add 5 3"))
# 5 + 3 = 8

print(parse_command("multiply 4 7"))
# 4 × 7 = 28

print(parse_command("divide 10 0"))
# Error: Cannot divide by zero

print(parse_command("unknown command"))
# Unknown command. Type 'help' for available commands.
```

## Summary

**Match-Case Statements:**
- **Syntax**: `match value:` then `case pattern:`
- **Wildcard**: `_` matches anything (like else)
- **OR pattern**: `case "a" | "b" | "c":`
- **Structural**: Match tuples, lists, dicts
- **Guards**: `case n if n > 0:`
- **Python 3.10+**: Requires recent Python version

**Key Benefits:**
- Cleaner than long if-elif chains for exact matches
- Powerful structural pattern matching
- More readable for complex patterns
- Catches all cases with wildcard

**When to Use:**
- Exact value matching (enums, commands, status codes)
- Data structure decomposition
- Clear pattern-based logic
- Python 3.10+ projects

Match-case statements provide elegant, readable solutions for pattern-based decision making, making complex conditional logic much clearer.
