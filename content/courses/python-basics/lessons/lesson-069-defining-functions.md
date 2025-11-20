---
id: defining-functions
title: Defining and Calling Functions
chapterId: ch6-functions
order: 1
duration: 30
objectives:
  - Understand what functions are and why they're useful
  - Learn how to define functions with def
  - Master function calling and basic parameters
---

# Defining and Calling Functions

Functions are reusable blocks of code that perform specific tasks. They're one of the most important concepts in programming!

## What is a Function?

A **function** is a named block of code that you can call (execute) multiple times. Think of it as a recipe - you write it once, then use it whenever needed.

### Benefits of Functions

1. **Reusability**: Write once, use many times
2. **Organization**: Break complex problems into smaller pieces
3. **Maintainability**: Fix bugs in one place
4. **Readability**: Named functions make code self-documenting

## Built-in Functions Review

You've already used Python's built-in functions:

```python
print("Hello")      # Output to console
len("Python")       # Get length
type(42)           # Check type
int("10")          # Convert to integer
input("Name: ")    # Get user input
```

Now let's create our own!

## Defining a Function

Use the `def` keyword to define a function:

```python
def greet():
    print("Hello, World!")
```

**Syntax breakdown**:
- `def` - keyword to define a function
- `greet` - function name (follows variable naming rules)
- `()` - parentheses (hold parameters, empty for now)
- `:` - colon to start the function body
- Indented code block - the function body

## Calling a Function

After defining a function, call it by using its name with parentheses:

```python
def greet():
    print("Hello, World!")

# Call the function
greet()  # Output: Hello, World!

# Call it again
greet()  # Output: Hello, World!
```

## Functions with Parameters

Parameters let you pass data into functions:

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")    # Output: Hello, Alice!
greet("Bob")      # Output: Hello, Bob!
greet("Charlie")  # Output: Hello, Charlie!
```

## Multiple Parameters

Functions can accept multiple parameters:

```python
def add_numbers(a, b):
    result = a + b
    print(f"{a} + {b} = {result}")

add_numbers(5, 3)   # Output: 5 + 3 = 8
add_numbers(10, 20) # Output: 10 + 20 = 30
```

### Parameter Order Matters

```python
def introduce(name, age):
    print(f"My name is {name} and I'm {age} years old")

introduce("Alice", 25)  # Correct order
introduce(25, "Alice")  # Wrong order - logical error!
```

## Return Values

Functions can send data back using `return`:

```python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # Output: 8

# Use directly in expressions
total = add(10, 20) + add(5, 15)
print(total)  # Output: 50
```

### Functions Without Return

Functions without `return` implicitly return `None`:

```python
def greet(name):
    print(f"Hello, {name}!")

result = greet("Alice")
print(result)  # Output: None
```

## Practical Examples

### Example 1: Calculate Circle Area

```python
def calculate_circle_area(radius):
    pi = 3.14159
    area = pi * radius ** 2
    return area

area1 = calculate_circle_area(5)
print(f"Area: {area1:.2f}")  # Area: 78.54

area2 = calculate_circle_area(10)
print(f"Area: {area2:.2f}")  # Area: 314.16
```

### Example 2: Temperature Converter

```python
def celsius_to_fahrenheit(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

temp_f = celsius_to_fahrenheit(25)
print(f"25°C = {temp_f}°F")  # 25°C = 77.0°F

temp_f = celsius_to_fahrenheit(0)
print(f"0°C = {temp_f}°F")   # 0°C = 32.0°F
```

### Example 3: Check Even or Odd

```python
def is_even(number):
    if number % 2 == 0:
        return True
    else:
        return False

print(is_even(4))   # True
print(is_even(7))   # False
print(is_even(100)) # True
```

### Example 4: Find Maximum of Three Numbers

```python
def find_max(a, b, c):
    if a >= b and a >= c:
        return a
    elif b >= a and b >= c:
        return b
    else:
        return c

print(find_max(10, 25, 15))  # 25
print(find_max(100, 50, 75)) # 100
```

### Example 5: Calculate Discount Price

```python
def calculate_discount(price, discount_percent):
    discount_amount = price * (discount_percent / 100)
    final_price = price - discount_amount
    return final_price

original = 100
discounted = calculate_discount(100, 20)
print(f"Original: ${original}")      # Original: $100
print(f"After 20% off: ${discounted}") # After 20% off: $80.0
```

## Function Naming Conventions

Follow these best practices:

```python
# Good: Descriptive, snake_case
def calculate_total_price(price, quantity):
    return price * quantity

def convert_to_uppercase(text):
    return text.upper()

def is_valid_email(email):
    return "@" in email and "." in email

# Bad: Unclear, poor naming
def calc(p, q):
    return p * q

def process(x):
    return x.upper()
```

## Function Documentation

Add docstrings to explain what functions do:

```python
def calculate_bmi(weight, height):
    """
    Calculate Body Mass Index.
    
    Args:
        weight: Weight in kilograms
        height: Height in meters
    
    Returns:
        BMI value as a float
    """
    return weight / (height ** 2)
```

## Common Function Mistakes

### Mistake 1: Forgetting Parentheses

```python
def greet():
    print("Hello!")

greet   # Wrong: Doesn't call the function
greet() # Correct: Calls the function
```

### Mistake 2: Wrong Indentation

```python
def add(a, b):
result = a + b  # Wrong: Not indented
return result   # Wrong: Not indented

def add(a, b):
    result = a + b  # Correct
    return result   # Correct
```

### Mistake 3: Using Variables Before Definition

```python
print(result)  # NameError: result doesn't exist yet

def add(a, b):
    return a + b

result = add(5, 3)  # Now result exists
print(result)       # Works!
```

### Mistake 4: Missing Return

```python
def add(a, b):
    result = a + b
    # Missing return!

value = add(5, 3)
print(value)  # None (not 8!)

# Fixed:
def add(a, b):
    result = a + b
    return result
```

## Key Takeaways

- **Define functions** with `def function_name():`
- **Call functions** with `function_name()`
- **Parameters** pass data into functions
- **Return values** send data back from functions
- Functions **without return** implicitly return `None`
- Use **descriptive names** for functions (verbs are good)
- **Docstrings** document what functions do
- Proper **indentation** is required

## What's Next?

You've learned the basics of functions! Next, we'll explore **function parameters** in more depth, including default values and keyword arguments.
