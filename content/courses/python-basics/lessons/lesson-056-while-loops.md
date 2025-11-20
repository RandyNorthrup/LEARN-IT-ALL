---
id: while-loops
title: While Loops and Loop Control
chapterId: ch5-loops
order: 2
duration: 25
objectives:
  - Master while loop syntax
  - Understand loop conditions
  - Learn break and continue statements
  - Avoid infinite loops
---

# While Loops and Loop Control

While loops repeat code as long as a condition is true. They're perfect when you don't know how many iterations you need in advance.

## Basic While Loop

Execute code while condition is true:

```python
count = 0
while count < 5:
    print(count)
    count += 1

# Output: 0, 1, 2, 3, 4
```

**Syntax**:
- `while` keyword
- Condition (must evaluate to True/False)
- Colon `:`
- Indented code block
- **Must update** condition variable

## While vs For Loops

### Use For When:
- Iterating over a sequence
- Know number of iterations
- Working with collections

```python
# ✅ Good use of for
for i in range(10):
    print(i)

fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

### Use While When:
- Condition-based repetition
- Don't know iterations in advance
- Waiting for event/input

```python
# ✅ Good use of while
password = ""
while password != "secret":
    password = input("Enter password: ")

count = 100
while count > 0:
    print(count)
    count //= 2  # Keep dividing by 2
```

## Infinite Loops

Loops that never end (usually a bug):

```python
# ❌ Infinite loop - condition never becomes False
count = 0
while count < 5:
    print(count)
    # Forgot to increment count!

# ❌ Another infinite loop
while True:
    print("Forever!")
    # No break statement
```

**How to stop**: Press `Ctrl+C` in terminal

### Intentional Infinite Loops

Sometimes you want an infinite loop:

```python
# Game loop pattern
while True:
    user_input = input("Enter command (or 'quit'): ")
    
    if user_input == "quit":
        break  # Exit loop
    
    process_command(user_input)
```

## The break Statement

Exit loop immediately:

```python
# Find first even number
numbers = [1, 3, 5, 8, 9, 11]

for num in numbers:
    if num % 2 == 0:
        print(f"Found even number: {num}")
        break  # Stop searching
# Output: Found even number: 8

# Without break, would check all numbers
```

### Break in While Loops

```python
count = 0
while True:
    print(count)
    count += 1
    
    if count >= 5:
        break  # Exit when count reaches 5

# Output: 0, 1, 2, 3, 4
```

## The continue Statement

Skip to next iteration:

```python
# Print only odd numbers
for i in range(10):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i)

# Output: 1, 3, 5, 7, 9
```

### Continue in While Loops

```python
count = 0
while count < 10:
    count += 1
    
    if count % 2 == 0:
        continue  # Skip even numbers
    
    print(count)

# Output: 1, 3, 5, 7, 9
```

## The pass Statement

Does nothing (placeholder):

```python
# Placeholder for future code
for i in range(10):
    if i < 5:
        pass  # TODO: implement later
    else:
        print(i)

# Empty loop body
while False:
    pass  # Valid but does nothing
```

## Loop with else Clause

Execute code when loop completes normally (not via break):

```python
# Search for item
items = [1, 2, 3, 4, 5]
target = 10

for item in items:
    if item == target:
        print("Found!")
        break
else:
    print("Not found")  # Runs if no break

# Output: Not found
```

With while:

```python
count = 0
while count < 5:
    print(count)
    count += 1
else:
    print("Loop completed")  # Runs after condition becomes False

# Output: 0, 1, 2, 3, 4, Loop completed
```

## Practical Examples

### Example 1: Input Validation

```python
def get_positive_number():
    """Keep asking until valid input"""
    while True:
        try:
            num = int(input("Enter positive number: "))
            if num > 0:
                return num
            print("Must be positive!")
        except ValueError:
            print("Must be a number!")

# number = get_positive_number()
```

### Example 2: Guess the Number Game

```python
import random

def guess_the_number():
    """Simple guessing game"""
    secret = random.randint(1, 100)
    attempts = 0
    
    while True:
        guess = int(input("Guess (1-100): "))
        attempts += 1
        
        if guess == secret:
            print(f"Correct! Took {attempts} attempts")
            break
        elif guess < secret:
            print("Too low!")
        else:
            print("Too high!")

# guess_the_number()
```

### Example 3: Menu System

```python
def show_menu():
    """Display interactive menu"""
    while True:
        print("\n=== Menu ===")
        print("1. Option A")
        print("2. Option B")
        print("3. Quit")
        
        choice = input("Choose: ")
        
        if choice == "1":
            print("You chose A")
        elif choice == "2":
            print("You chose B")
        elif choice == "3":
            print("Goodbye!")
            break
        else:
            print("Invalid choice!")

# show_menu()
```

### Example 4: Sum Until Zero

```python
def sum_until_zero():
    """Add numbers until 0 entered"""
    total = 0
    
    while True:
        num = int(input("Enter number (0 to stop): "))
        
        if num == 0:
            break
        
        total += num
        print(f"Current total: {total}")
    
    return total

# result = sum_until_zero()
```

### Example 5: Countdown Timer

```python
import time

def countdown(seconds):
    """Count down from seconds to 0"""
    while seconds > 0:
        print(seconds)
        time.sleep(1)  # Wait 1 second
        seconds -= 1
    
    print("Time's up!")

# countdown(5)
```

### Example 6: Find Prime Numbers

```python
def find_primes_up_to(n):
    """Find all prime numbers up to n"""
    primes = []
    
    for num in range(2, n + 1):
        is_prime = True
        
        # Check if num is divisible by any number from 2 to sqrt(num)
        i = 2
        while i * i <= num:
            if num % i == 0:
                is_prime = False
                break
            i += 1
        
        if is_prime:
            primes.append(num)
    
    return primes

print(find_primes_up_to(20))
# [2, 3, 5, 7, 11, 13, 17, 19]
```

### Example 7: Process Until Condition

```python
def process_transactions(balance):
    """Process transactions until balance is 0 or quit"""
    while balance > 0:
        print(f"\nCurrent balance: ${balance}")
        action = input("(w)ithdraw, (d)eposit, or (q)uit: ")
        
        if action == "q":
            break
        elif action == "w":
            amount = float(input("Withdraw amount: "))
            if amount <= balance:
                balance -= amount
            else:
                print("Insufficient funds!")
        elif action == "d":
            amount = float(input("Deposit amount: "))
            balance += amount
        else:
            print("Invalid action!")
    
    print(f"Final balance: ${balance}")
    return balance

# process_transactions(100)
```

### Example 8: Binary Search

```python
def binary_search(arr, target):
    """Binary search using while loop"""
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Not found

numbers = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(numbers, 7))   # 3
print(binary_search(numbers, 10))  # -1
```

## Loop Control Best Practices

### 1. Always Update Loop Variable

```python
# ❌ Infinite loop
count = 0
while count < 10:
    print(count)
    # Forgot to increment!

# ✅ Correct
count = 0
while count < 10:
    print(count)
    count += 1
```

### 2. Use break for Early Exit

```python
# ❌ Unnecessary flag variable
found = False
for item in items:
    if item == target:
        found = True
if found:
    print("Found")

# ✅ Use break
for item in items:
    if item == target:
        print("Found")
        break
```

### 3. Prefer For Over While When Possible

```python
# ❌ While for known iterations
i = 0
while i < 10:
    print(i)
    i += 1

# ✅ For is clearer
for i in range(10):
    print(i)
```

## Common Mistakes

### Mistake 1: Forgetting to Update Condition

```python
# ❌ Infinite loop
count = 0
while count < 5:
    print("Hello")
    # Forgot count += 1

# ✅ Fixed
count = 0
while count < 5:
    print("Hello")
    count += 1
```

### Mistake 2: Wrong Condition

```python
# ❌ Never executes
count = 10
while count < 5:  # Already false!
    print(count)
    count += 1

# ✅ Correct condition
count = 10
while count > 5:
    print(count)
    count -= 1
```

### Mistake 3: Using break/continue Incorrectly

```python
# ❌ Unreachable code after break
for i in range(10):
    break
    print(i)  # Never runs

# ✅ Conditional break
for i in range(10):
    if i == 5:
        break
    print(i)
```

## Key Takeaways

- **While loops** repeat while condition is true
- **Always update** the condition variable
- **break** exits loop immediately
- **continue** skips to next iteration
- **pass** is a placeholder (does nothing)
- **else clause** runs when loop completes normally
- Prefer **for loops** for known iterations
- Use **while loops** for condition-based repetition
- Watch out for **infinite loops**

## What's Next?

You've mastered loops! Next chapter, we'll explore **lists** - Python's most versatile data structure.
