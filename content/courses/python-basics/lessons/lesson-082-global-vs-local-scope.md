---
id: global-vs-local-scope
title: Global vs Local Scope
chapterId: ch7-scope
order: 1
duration: 25
objectives:
  - Master the differences between global and local scope
  - Understand variable lifetime and visibility
  - Learn scope best practices
  - Avoid common scope errors
---

# Global vs Local Scope

Scope determines where variables can be accessed and how long they exist. Understanding scope is crucial for writing bug-free code.

## Local Scope Recap

Variables created inside functions are **local**:

```python
def calculate():
    result = 10 + 20  # Local variable
    return result

print(calculate())  # 30

# ❌ Error - result doesn't exist here
# print(result)  # NameError
```

Local variables:
- Only exist inside the function
- Created when function is called
- Destroyed when function returns
- Can't be accessed outside the function

## Global Scope

Variables created outside functions are **global**:

```python
total = 0  # Global variable

def add_to_total(amount):
    global total
    total += amount

print(total)  # 0
add_to_total(10)
print(total)  # 10
add_to_total(5)
print(total)  # 15
```

Global variables:
- Exist throughout the program
- Created when defined
- Accessible everywhere
- Persist until program ends

## Reading vs Writing Global Variables

You can **read** globals without `global` keyword:

```python
MAX_USERS = 100  # Global constant

def check_user_limit(current_users):
    if current_users >= MAX_USERS:  # Reading global
        return "Limit reached"
    return "OK"

print(check_user_limit(50))   # OK
print(check_user_limit(100))  # Limit reached
```

You must use `global` to **write** to globals:

```python
counter = 0

# ✅ Correct - using global keyword
def increment():
    global counter
    counter += 1

increment()
print(counter)  # 1

# ❌ Wrong - creates local variable
def increment_wrong():
    counter = 0  # New local variable!
    counter += 1

increment_wrong()
print(counter)  # Still 1 (global unchanged)
```

## Variable Shadowing

Local variables can have the same name as global variables:

```python
name = "Global Alice"  # Global

def greet():
    name = "Local Bob"  # Local (shadows global)
    print(f"Inside function: {name}")

greet()  # Inside function: Local Bob
print(f"Outside function: {name}")  # Outside function: Global Alice
```

The local variable "shadows" the global - the global is hidden inside the function.

## Multiple Functions, Same Global

```python
score = 0  # Global

def add_points(points):
    global score
    score += points
    print(f"Added {points}, total: {score}")

def reset_score():
    global score
    score = 0
    print("Score reset")

def get_score():
    return score  # Just reading, no global needed

add_points(10)   # Added 10, total: 10
add_points(5)    # Added 5, total: 15
print(get_score())  # 15
reset_score()    # Score reset
print(get_score())  # 0
```

## When to Use Global Variables

### ✅ Good Uses

```python
# Configuration constants
DEBUG_MODE = False
MAX_RETRIES = 3
API_URL = "https://api.example.com"

# Application state (use sparingly)
is_running = True
current_user = None

# Counters and accumulators
request_count = 0
```

### ❌ Bad Uses

```python
# ❌ Avoid - too many globals
user_name = ""
user_age = 0
user_email = ""
user_city = ""
# ... this gets messy fast

# ✅ Better - use data structures
user = {
    "name": "",
    "age": 0,
    "email": "",
    "city": ""
}

# ✅ Even better - pass as parameters
def process_user(user_data):
    # Function receives data, doesn't use globals
    pass
```

## Practical Examples

### Example 1: Game State Manager

```python
# Global game state
level = 1
lives = 3
score = 0

def start_game():
    global level, lives, score
    level = 1
    lives = 3
    score = 0
    print("Game started!")

def complete_level():
    global level, score
    level += 1
    score += 100
    print(f"Level {level} unlocked! Score: {score}")

def lose_life():
    global lives
    lives -= 1
    print(f"Lives remaining: {lives}")
    if lives == 0:
        print("Game Over!")

# Play game
start_game()
complete_level()  # Level 2 unlocked! Score: 100
lose_life()       # Lives remaining: 2
print(f"Current: Level {level}, Score {score}, Lives {lives}")
# Current: Level 2, Score 100, Lives 2
```

### Example 2: Configuration Manager

```python
# Global configuration
config = {
    "debug": False,
    "timeout": 30,
    "retries": 3
}

def get_config(key):
    """Read config value"""
    return config.get(key)

def set_config(key, value):
    """Update config value"""
    global config
    config[key] = value
    print(f"Config updated: {key} = {value}")

def reset_config():
    """Reset to defaults"""
    global config
    config = {
        "debug": False,
        "timeout": 30,
        "retries": 3
    }

# Use config
print(get_config("timeout"))  # 30
set_config("timeout", 60)     # Config updated: timeout = 60
print(get_config("timeout"))  # 60
```

### Example 3: Request Counter

```python
request_count = 0
error_count = 0

def make_request(url):
    global request_count, error_count
    request_count += 1
    
    # Simulate request
    if "error" in url:
        error_count += 1
        return "Error"
    return "Success"

def get_stats():
    return {
        "total": request_count,
        "errors": error_count,
        "success": request_count - error_count
    }

# Make requests
make_request("https://api.com/data")
make_request("https://api.com/error")
make_request("https://api.com/users")

stats = get_stats()
print(f"Total: {stats['total']}, Errors: {stats['errors']}, Success: {stats['success']}")
# Total: 3, Errors: 1, Success: 2
```

## Local Variable Lifetime

Local variables are created and destroyed with each function call:

```python
def create_local():
    x = 10  # Created
    print(f"x = {x}")
    # x destroyed when function returns

create_local()  # x = 10
create_local()  # x = 10 (new x created)
create_local()  # x = 10 (new x created again)
```

Each call creates a fresh set of local variables.

## Global Variable Lifetime

Global variables persist across function calls:

```python
total = 0  # Created once

def add_to_total(n):
    global total
    total += n

add_to_total(10)
print(total)  # 10
add_to_total(5)
print(total)  # 15 (persisted from previous call)
```

## Avoiding Global Variables

Often you can avoid globals by passing data as parameters and returning values:

### ❌ Using Globals

```python
total = 0

def add(a, b):
    global total
    total = a + b
    return total

result = add(5, 3)
```

### ✅ Using Parameters and Returns

```python
def add(a, b):
    return a + b

total = add(5, 3)  # No globals needed
```

### ❌ Global State

```python
user_name = ""
user_age = 0

def set_user(name, age):
    global user_name, user_age
    user_name = name
    user_age = age

def get_user():
    return user_name, user_age
```

### ✅ Return Data Structures

```python
def create_user(name, age):
    return {"name": name, "age": age}

def get_user_name(user):
    return user["name"]

user = create_user("Alice", 25)
print(get_user_name(user))
```

## Common Mistakes

### Mistake 1: Forgetting `global` Keyword

```python
count = 0

def increment():
    # ❌ Error - trying to modify without global
    # count += 1  # UnboundLocalError
    pass

# ✅ Fix - use global keyword
def increment_correct():
    global count
    count += 1
```

### Mistake 2: Creating Unintended Local

```python
message = "Hello"

def change_message():
    message = "Hi"  # Creates local, doesn't change global

change_message()
print(message)  # Still "Hello"

# ✅ Fix - use global keyword
def change_message_correct():
    global message
    message = "Hi"
```

### Mistake 3: Over-using Globals

```python
# ❌ Bad - too many globals
total = 0
count = 0
average = 0

def calculate(numbers):
    global total, count, average
    total = sum(numbers)
    count = len(numbers)
    average = total / count

# ✅ Better - return values
def calculate_better(numbers):
    total = sum(numbers)
    count = len(numbers)
    average = total / count
    return total, count, average

total, count, average = calculate_better([1, 2, 3, 4, 5])
```

## Scope Best Practices

1. **Minimize global variables** - use parameters and returns instead
2. **Use UPPERCASE for constants** - signals "don't modify"
3. **Pass data as parameters** - makes functions testable
4. **Return computed values** - avoid side effects
5. **Document global usage** - add comments when using `global`
6. **Prefer local scope** - easier to understand and debug

## Key Takeaways

- **Local variables** exist only inside functions
- **Global variables** exist throughout the program
- Use `global` keyword to modify globals
- Reading globals doesn't require `global`
- Local variables shadow globals with same name
- Minimize global variable usage
- Pass parameters and return values instead

## What's Next?

You've mastered global vs local scope! Next, we'll explore **nested scope** and closures.
