---
id: user-input
title: Getting User Input
chapterId: ch1-intro
order: 6
duration: 20
objectives:
  - Learn how to get user input with input()
  - Understand input type conversion
  - Create interactive programs
---

# Getting User Input

Interactive programs are more engaging! Let's learn how to get input from users and create dynamic Python programs.

## The input() Function

The `input()` function reads text from the user:

```python
name = input("What is your name? ")
print(f"Hello, {name}!")
```

When you run this program:
1. Python displays the prompt: "What is your name? "
2. The program waits for the user to type something and press Enter
3. The typed text is stored in the `name` variable
4. The program continues executing

## Important: input() Returns a String

**The `input()` function always returns a string**, even if the user types a number:

```python
age = input("How old are you? ")
print(type(age))  # <class 'str'>

# This won't work as expected:
next_year = age + 1  # TypeError: can only concatenate str (not "int") to str
```

## Converting Input to Numbers

To perform calculations with user input, convert strings to numbers:

### Converting to Integer

```python
age = input("How old are you? ")
age = int(age)  # Convert string to integer

next_year = age + 1
print(f"Next year you'll be {next_year}")
```

### Converting to Float

```python
price = input("Enter the price: ")
price = float(price)  # Convert string to float

with_tax = price * 1.08
print(f"Price with tax: ${with_tax:.2f}")
```

### Combined on One Line

```python
# Convert immediately
age = int(input("How old are you? "))
price = float(input("Enter the price: "))
```

## Handling Multiple Inputs

### Method 1: Multiple input() Calls

```python
first_name = input("Enter your first name: ")
last_name = input("Enter your last name: ")
full_name = first_name + " " + last_name
print(f"Hello, {full_name}!")
```

### Method 2: Split a Single Input

```python
# User types: "John Doe"
full_name = input("Enter your full name: ")
first_name, last_name = full_name.split()
print(f"First: {first_name}, Last: {last_name}")
```

### Method 3: Multiple Values at Once

```python
# User types: "25 30 35"
numbers = input("Enter three numbers separated by spaces: ")
a, b, c = numbers.split()
a, b, c = int(a), int(b), int(c)

total = a + b + c
print(f"Sum: {total}")
```

## Practical Examples

### Example 1: Simple Calculator

```python
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

sum_result = num1 + num2
diff_result = num1 - num2
product_result = num1 * num2
quotient_result = num1 / num2

print(f"Sum: {sum_result}")
print(f"Difference: {diff_result}")
print(f"Product: {product_result}")
print(f"Quotient: {quotient_result:.2f}")
```

### Example 2: Age in Days

```python
name = input("What is your name? ")
age = int(input("How old are you? "))

days = age * 365
print(f"Hi {name}! You are approximately {days:,} days old!")
```

### Example 3: Restaurant Bill Calculator

```python
meal_cost = float(input("Enter meal cost: $"))
tip_percent = float(input("Enter tip percentage (e.g., 20 for 20%): "))

tip_amount = meal_cost * (tip_percent / 100)
total = meal_cost + tip_amount

print(f"\nMeal cost: ${meal_cost:.2f}")
print(f"Tip ({tip_percent}%): ${tip_amount:.2f}")
print(f"Total: ${total:.2f}")
```

### Example 4: Temperature Converter

```python
celsius = float(input("Enter temperature in Celsius: "))
fahrenheit = (celsius * 9/5) + 32

print(f"{celsius}°C = {fahrenheit:.1f}°F")
```

### Example 5: Personalized Greeting

```python
name = input("What's your name? ")
favorite_color = input("What's your favorite color? ")
age = int(input("How old are you? "))

print(f"\nHello, {name}!")
print(f"I love the color {favorite_color} too!")

if age >= 18:
    print("You're an adult!")
else:
    print(f"In {18 - age} years, you'll be an adult!")
```

## Error Handling with Input

Users might enter invalid data. Here's how to handle it:

### Basic Error Checking

```python
age_str = input("Enter your age: ")

if age_str.isdigit():
    age = int(age_str)
    print(f"You are {age} years old")
else:
    print("That's not a valid age!")
```

### Try-Except (Advanced)

```python
try:
    age = int(input("Enter your age: "))
    print(f"You are {age} years old")
except ValueError:
    print("Please enter a valid number!")
```

## Input Formatting Tips

### Strip Whitespace

Users might accidentally add spaces:

```python
name = input("Enter your name: ").strip()
# "  Alice  " becomes "Alice"
```

### Convert to Lowercase/Uppercase

For consistent comparisons:

```python
answer = input("Do you want to continue? (yes/no): ").lower()

if answer == "yes":
    print("Let's continue!")
elif answer == "no":
    print("Goodbye!")
else:
    print("Please answer yes or no")
```

### Combining Formatting

```python
name = input("Enter your name: ").strip().title()
# "  john doe  " becomes "John Doe"
```

## Common Input Mistakes

### Mistake 1: Forgetting to Convert

```python
# Wrong
age = input("Enter your age: ")
next_year = age + 1  # TypeError!

# Right
age = int(input("Enter your age: "))
next_year = age + 1
```

### Mistake 2: Using Quotes in Conversion

```python
# Wrong
age = int("input('Enter your age: ')")  # Syntax error!

# Right
age = int(input("Enter your age: "))
```

### Mistake 3: Not Handling Invalid Input

```python
# Risky - crashes if user enters non-number
age = int(input("Enter your age: "))

# Better - check first
age_str = input("Enter your age: ")
if age_str.isdigit():
    age = int(age_str)
else:
    print("Invalid input!")
    age = 0
```

## Input Best Practices

1. **Clear prompts**: Tell users exactly what to enter
   ```python
   # Good
   age = int(input("Enter your age (e.g., 25): "))
   
   # Bad
   age = int(input())
   ```

2. **Include format examples**: Show the expected format
   ```python
   date = input("Enter date (MM/DD/YYYY): ")
   ```

3. **Validate input**: Check if input is valid before using it
   ```python
   age_str = input("Enter your age: ")
   if age_str.isdigit() and int(age_str) > 0:
       age = int(age_str)
   else:
       print("Invalid age!")
   ```

4. **Strip whitespace**: Always strip extra spaces
   ```python
   name = input("Enter your name: ").strip()
   ```

5. **Provide feedback**: Confirm what the user entered
   ```python
   name = input("Enter your name: ")
   print(f"Welcome, {name}!")
   ```

## Multi-Step Input Programs

```python
# Survey program
print("=== User Survey ===\n")

name = input("Name: ").strip().title()
age = int(input("Age: "))
city = input("City: ").strip().title()
favorite_language = input("Favorite programming language: ").strip().title()

print("\n=== Summary ===")
print(f"Name: {name}")
print(f"Age: {age}")
print(f"City: {city}")
print(f"Favorite Language: {favorite_language}")
print("\nThank you for participating!")
```

## Key Takeaways

- **`input()` always returns a string** - even if the user types a number
- Use **`int()`** to convert string to integer
- Use **`float()`** to convert string to decimal number
- Always include a **clear prompt** message
- **Strip whitespace** with `.strip()` for cleaner input
- **Validate input** to prevent errors
- Use **`.lower()` or `.upper()`** for case-insensitive comparisons
- Use **`.split()`** to handle multiple values in one input
- **Handle errors** gracefully when conversion fails

## What's Next?

Now that you can create interactive programs, let's learn about **writing comments** to document your code!
