---
id: function-scope
title: Function Scope and Variable Visibility
chapterId: ch6-functions
order: 4
duration: 30
objectives:
  - Understand local vs global scope
  - Master the global and nonlocal keywords
  - Learn about scope resolution (LEGB rule)
  - Avoid common scope pitfalls
---

# Function Scope and Variable Visibility

Scope determines where variables can be accessed. Understanding scope prevents bugs and makes code clearer.

## Local Scope

Variables created inside a function are **local** - they only exist inside that function:

```python
def greet():
    message = "Hello"  # Local variable
    print(message)

greet()  # Hello

# ❌ Error - message doesn't exist outside function
# print(message)  # NameError: name 'message' is not defined
```

## Global Scope

Variables created outside functions are **global** - accessible everywhere:

```python
greeting = "Hello"  # Global variable

def greet():
    print(greeting)  # Can read global variable

greet()  # Hello
print(greeting)  # Hello
```

## Reading Global Variables

Functions can read global variables:

```python
PI = 3.14159  # Global constant

def circle_area(radius):
    return PI * radius ** 2  # Reading global PI

print(circle_area(5))  # 78.53975
```

## Modifying Global Variables

To modify global variables, use the `global` keyword:

```python
counter = 0  # Global variable

def increment():
    global counter  # Declare we're using global counter
    counter += 1

print(counter)  # 0
increment()
print(counter)  # 1
increment()
print(counter)  # 2
```

Without `global`, Python creates a local variable:

```python
count = 0

def increment_wrong():
    # ❌ Error - trying to read before local assignment
    # count += 1  # UnboundLocalError

def increment_creates_local():
    count = 0  # Creates NEW local variable
    count += 1
    print(f"Local count: {count}")

increment_creates_local()  # Local count: 1
print(f"Global count: {count}")  # Global count: 0 (unchanged!)
```

## Function Parameters Are Local

```python
def add(a, b):  # a and b are local to this function
    result = a + b  # result is also local
    return result

sum_value = add(5, 3)
print(sum_value)  # 8

# ❌ These don't exist outside the function
# print(a)  # NameError
# print(b)  # NameError
# print(result)  # NameError
```

## Shadowing Global Variables

Local variables can "shadow" (hide) global variables:

```python
name = "Global"  # Global variable

def print_name():
    name = "Local"  # Local variable shadows global
    print(name)

print_name()  # Local
print(name)   # Global (unchanged)
```

## The LEGB Rule

Python searches for variables in this order:

1. **L**ocal - Inside current function
2. **E**nclosing - Inside enclosing functions (nested functions)
3. **G**lobal - At module level
4. **B**uilt-in - Python's built-in names

```python
x = "global"

def outer():
    x = "enclosing"
    
    def inner():
        x = "local"
        print(x)
    
    inner()
    print(x)

outer()
# local
# enclosing

print(x)
# global
```

## Nested Functions (Enclosing Scope)

```python
def outer():
    message = "from outer"  # Enclosing scope
    
    def inner():
        print(message)  # Can read enclosing variable
    
    inner()

outer()  # from outer
```

## The nonlocal Keyword

Modify variables in enclosing scope:

```python
def counter():
    count = 0  # Enclosing variable
    
    def increment():
        nonlocal count  # Access enclosing count
        count += 1
        return count
    
    return increment

# Create counter
my_counter = counter()
print(my_counter())  # 1
print(my_counter())  # 2
print(my_counter())  # 3
```

## Practical Examples

### Example 1: Configuration Manager

```python
# Global configuration
DEBUG_MODE = False
MAX_RETRIES = 3

def enable_debug():
    global DEBUG_MODE
    DEBUG_MODE = True

def disable_debug():
    global DEBUG_MODE
    DEBUG_MODE = False

def log(message):
    if DEBUG_MODE:
        print(f"[DEBUG] {message}")
    else:
        print(f"[INFO] {message}")

log("Starting")  # [INFO] Starting
enable_debug()
log("Debug enabled")  # [DEBUG] Debug enabled
```

### Example 2: Bank Account (Closures)

```python
def create_account(initial_balance):
    balance = initial_balance  # Enclosing scope
    
    def deposit(amount):
        nonlocal balance
        balance += amount
        return balance
    
    def withdraw(amount):
        nonlocal balance
        if amount > balance:
            return "Insufficient funds"
        balance -= amount
        return balance
    
    def get_balance():
        return balance
    
    return deposit, withdraw, get_balance

# Create account
deposit, withdraw, get_balance = create_account(1000)

print(get_balance())  # 1000
print(deposit(500))   # 1500
print(withdraw(200))  # 1300
print(get_balance())  # 1300
```

### Example 3: Counter Factory

```python
def make_counter(start=0, step=1):
    """Create a counter function"""
    count = start
    
    def counter():
        nonlocal count
        current = count
        count += step
        return current
    
    return counter

# Create different counters
count_by_one = make_counter()
count_by_five = make_counter(0, 5)

print(count_by_one())   # 0
print(count_by_one())   # 1
print(count_by_one())   # 2

print(count_by_five())  # 0
print(count_by_five())  # 5
print(count_by_five())  # 10
```

### Example 4: Game Score Tracker

```python
# Global game state
high_score = 0
current_score = 0

def reset_score():
    global current_score
    current_score = 0

def add_points(points):
    global current_score, high_score
    current_score += points
    if current_score > high_score:
        high_score = current_score

def game_over():
    global current_score
    print(f"Game Over! Score: {current_score}")
    print(f"High Score: {high_score}")
    current_score = 0

# Play game
reset_score()
add_points(100)
add_points(50)
game_over()
# Game Over! Score: 150
# High Score: 150

reset_score()
add_points(75)
game_over()
# Game Over! Score: 75
# High Score: 150
```

## Common Mistakes

### Mistake 1: Forgetting global Keyword

```python
total = 0

def add_to_total(amount):
    # ❌ Error - reading before assignment
    # total += amount  # UnboundLocalError
    pass

# ✅ Correct
def add_to_total_correct(amount):
    global total
    total += amount
```

### Mistake 2: Shadowing Built-ins

```python
# ❌ Bad - shadows built-in function
def print_sum(a, b):
    sum = a + b  # Shadows built-in sum()
    print(sum)

# ✅ Better - use different name
def print_sum_correct(a, b):
    total = a + b
    print(total)
```

### Mistake 3: Mutable Default Arguments

```python
def add_item(item, items=[]):
    items.append(item)
    return items

# ❌ List is shared between calls!
print(add_item("a"))  # ['a']
print(add_item("b"))  # ['a', 'b'] - Unexpected!

# ✅ Use None as default
def add_item_correct(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

## Best Practices

### 1. Minimize Global Variables

```python
# ❌ Too many globals
user_name = ""
user_age = 0
user_email = ""

# ✅ Better - use data structures
user = {
    "name": "",
    "age": 0,
    "email": ""
}

# ✅ Even better - use functions
def create_user(name, age, email):
    return {"name": name, "age": age, "email": email}
```

### 2. Use UPPERCASE for Global Constants

```python
# Constants that never change
MAX_CONNECTIONS = 100
DEFAULT_TIMEOUT = 30
API_BASE_URL = "https://api.example.com"

def connect():
    print(f"Connecting with max {MAX_CONNECTIONS} connections")
```

### 3. Return Instead of Modifying Globals

```python
# ❌ Modifying global state
total = 0

def add(amount):
    global total
    total += amount

# ✅ Better - return new value
def add(current, amount):
    return current + amount

total = 0
total = add(total, 10)
total = add(total, 5)
```

## Key Takeaways

- **Local** variables exist only inside functions
- **Global** variables exist everywhere
- Use `global` keyword to modify global variables
- Use `nonlocal` for enclosing scope in nested functions
- LEGB rule: Local → Enclosing → Global → Built-in
- Minimize global variable usage
- Use UPPERCASE for constants

## What's Next?

You've mastered function scope! Next, we'll learn about **lambda functions** and functional programming basics.
