---
id: "95-loop-else-clause"
title: "Loop else Clause"
chapterId: ch5-loops
order: 6
duration: 20
objectives:
  - Understand the loop else clause
  - Learn when else executes vs doesn't
  - Master practical else clause patterns
  - Avoid common else clause mistakes
---

# Loop else Clause

Python's loop `else` clause is unique among programming languages. It executes when a loop completes normally, but NOT if the loop is terminated by `break`.

## Basic for-else Structure

```python
# else executes after loop completes
for i in range(5):
    print(i, end=" ")
else:
    print("\nLoop completed!")

# Output:
# 0 1 2 3 4
# Loop completed!

# else does NOT execute if loop breaks
for i in range(5):
    print(i, end=" ")
    if i == 2:
        break
else:
    print("\nThis won't print!")

print("After loop")

# Output:
# 0 1 2 After loop
```

## When else Executes

```python
# ✅ else RUNS when:
# 1. Loop completes all iterations
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num, end=" ")
else:
    print("- All numbers processed")

# 1 2 3 4 5 - All numbers processed

# 2. Loop iterates over empty sequence
for num in []:
    print(num)
else:
    print("Empty list - else still runs!")

# Empty list - else still runs!

# 3. While condition becomes False naturally
count = 0
while count < 3:
    print(count, end=" ")
    count += 1
else:
    print("- Count reached limit")

# 0 1 2 - Count reached limit
```

## When else Does NOT Execute

```python
# ❌ else DOESN'T RUN when:
# 1. Loop terminated with break
for i in range(5):
    if i == 3:
        break
else:
    print("This won't print")

print("Loop was broken")
# Loop was broken

# 2. Exception raised in loop
try:
    for i in range(5):
        if i == 3:
            raise ValueError("Error!")
    else:
        print("This won't print")
except ValueError:
    print("Exception caught")

# Exception caught

# 3. Return from function
def search_early_return(items, target):
    """Search with early return."""
    for item in items:
        if item == target:
            return f"Found: {item}"
    else:
        return "Not found"

print(search_early_return([1, 2, 3, 4], 3))  # Found: 3
print(search_early_return([1, 2, 3, 4], 9))  # Not found
```

## Practical Use Case: Search Patterns

```python
# Classic search pattern
def find_user(users, username):
    """Find user in list."""
    for user in users:
        if user['username'] == username:
            print(f"Found user: {user['name']}")
            break
    else:
        print(f"User '{username}' not found")

users = [
    {'username': 'alice', 'name': 'Alice Smith'},
    {'username': 'bob', 'name': 'Bob Jones'},
    {'username': 'charlie', 'name': 'Charlie Brown'}
]

find_user(users, 'bob')
# Found user: Bob Jones

find_user(users, 'diana')
# User 'diana' not found

# Validation pattern
def validate_data(data):
    """Validate all items meet criteria."""
    for item in data:
        if item < 0:
            print(f"Invalid value: {item}")
            break
    else:
        print("All values are valid!")

validate_data([1, 2, 3, 4, 5])
# All values are valid!

validate_data([1, 2, -3, 4, 5])
# Invalid value: -3
```

## Prime Number Checker

```python
def is_prime(n):
    """Check if number is prime using loop-else."""
    if n < 2:
        return False
    
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            print(f"{n} is divisible by {i}")
            break
    else:
        # Only runs if no divisor found
        print(f"{n} is prime!")
        return True
    
    return False

is_prime(17)  # 17 is prime! True
is_prime(18)  # 18 is divisible by 2

# More concise version
def is_prime_simple(n):
    """Check if prime."""
    if n < 2:
        return False
    
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    else:
        return True

print(is_prime_simple(29))  # True
print(is_prime_simple(30))  # False
```

## While-else Pattern

```python
# Password validation with retry limit
def login(username, password, max_attempts=3):
    """Login with retry limit."""
    attempts = 0
    
    while attempts < max_attempts:
        print(f"Attempt {attempts + 1}:")
        if check_password(username, password):
            print("Login successful!")
            break
        attempts += 1
    else:
        print("Max attempts reached. Account locked!")

def check_password(username, password):
    """Mock password check."""
    return password == "secret123"

# Successful login
login("alice", "secret123")
# Attempt 1:
# Login successful!

# Failed login
login("alice", "wrong_pass")
# Attempt 1:
# Attempt 2:
# Attempt 3:
# Max attempts reached. Account locked!
```

## Finding First vs Any

```python
# Find FIRST occurrence
def find_first_even(numbers):
    """Find first even number."""
    for num in numbers:
        if num % 2 == 0:
            print(f"First even number: {num}")
            break
    else:
        print("No even numbers found")

find_first_even([1, 3, 5, 6, 8, 10])
# First even number: 6

find_first_even([1, 3, 5, 7])
# No even numbers found

# Check if ANY condition is true
def has_negative(numbers):
    """Check if list contains negative."""
    for num in numbers:
        if num < 0:
            print(f"Found negative: {num}")
            return True
    else:
        print("All numbers are positive")
        return False

has_negative([1, 2, -3, 4])  # True
# Found negative: -3

has_negative([1, 2, 3, 4])   # False
# All numbers are positive
```

## File Processing Example

```python
def process_until_marker(lines, marker="END"):
    """Process lines until marker found."""
    for line in lines:
        if line.strip() == marker:
            print(f"Marker '{marker}' found. Stopping.")
            break
        print(f"Processing: {line}")
    else:
        print("Processed all lines (no marker found)")

# With marker
lines1 = ["Line 1", "Line 2", "END", "Line 3"]
process_until_marker(lines1)
# Processing: Line 1
# Processing: Line 2
# Marker 'END' found. Stopping.

# Without marker
lines2 = ["Line 1", "Line 2", "Line 3"]
process_until_marker(lines2)
# Processing: Line 1
# Processing: Line 2
# Processing: Line 3
# Processed all lines (no marker found)
```

## Input Validation Loop

```python
def get_valid_age():
    """Get valid age input from user."""
    max_tries = 3
    tries = 0
    
    while tries < max_tries:
        age_str = input(f"Enter your age (attempt {tries + 1}/{max_tries}): ")
        
        if age_str.isdigit():
            age = int(age_str)
            if 0 < age < 150:
                print(f"Valid age: {age}")
                return age
        
        print("Invalid input!")
        tries += 1
    else:
        print("Too many invalid attempts!")
        return None

# Would work interactively:
# age = get_valid_age()
```

## Nested Loops with else

```python
# Find in 2D array
def find_in_matrix(matrix, target):
    """Find target in 2D matrix."""
    for i, row in enumerate(matrix):
        for j, value in enumerate(row):
            if value == target:
                print(f"Found {target} at ({i}, {j})")
                break
        else:
            # Inner loop completed without break
            continue
        # Inner loop was broken
        break
    else:
        # Outer loop completed without break
        print(f"{target} not found in matrix")

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

find_in_matrix(matrix, 5)
# Found 5 at (1, 1)

find_in_matrix(matrix, 10)
# 10 not found in matrix
```

## Common Patterns Summary

```python
# Pattern 1: Search and report
def search_pattern(items, target):
    """Search with else clause."""
    for item in items:
        if item == target:
            print(f"Found: {item}")
            break
    else:
        print("Not found")

# Pattern 2: Validation
def validate_pattern(items):
    """Validate all items."""
    for item in items:
        if not is_valid(item):
            print(f"Invalid: {item}")
            break
    else:
        print("All valid!")

def is_valid(item):
    """Check if item is valid."""
    return item > 0

# Pattern 3: Retry with limit
def retry_pattern():
    """Retry with limit."""
    attempts = 0
    max_attempts = 3
    
    while attempts < max_attempts:
        if try_operation():
            print("Success!")
            break
        attempts += 1
    else:
        print("Failed after max attempts")

def try_operation():
    """Mock operation."""
    return False

# Pattern 4: Process until sentinel
def sentinel_pattern(data):
    """Process until sentinel value."""
    for item in data:
        if item == "STOP":
            print("Sentinel found")
            break
        process(item)
    else:
        print("No sentinel, processed all")

def process(item):
    """Process item."""
    print(f"Processing {item}")
```

## When NOT to Use else

```python
# ❌ Don't use else when it doesn't add clarity
# Bad: else doesn't add value
for i in range(10):
    print(i)
else:
    print("Done")  # This always runs, so why use else?

# ✅ Better: just put it after the loop
for i in range(10):
    print(i)
print("Done")

# ❌ Don't use when a flag is clearer
# Confusing
for item in items:
    if condition(item):
        break
else:
    do_something()

# ✅ Better: use a flag variable
found = False
for item in items:
    if condition(item):
        found = True
        break

if not found:
    do_something()

def condition(item):
    """Mock condition."""
    return False

def do_something():
    """Mock action."""
    pass
```

## Best Practices

```python
# ✅ GOOD: Clear use case
def find_with_else(items, target):
    """Search pattern is clear."""
    for item in items:
        if item == target:
            return f"Found: {item}"
    else:
        return "Not found"

# ✅ GOOD: Validation pattern
def all_positive(numbers):
    """Check all numbers are positive."""
    for num in numbers:
        if num <= 0:
            return False
    else:
        return True

print(all_positive([1, 2, 3, 4]))  # True
print(all_positive([1, -2, 3]))    # False

# ✅ GOOD: Document the behavior
def search_user(users, user_id):
    """
    Search for user by ID.
    Uses else clause to handle not-found case.
    """
    for user in users:
        if user['id'] == user_id:
            return user
    else:
        return None

# ❌ AVOID: Complex nested loop-else
# Hard to understand
for i in range(10):
    for j in range(10):
        if condition():
            break
    else:
        continue
    break
else:
    pass  # What does this even mean?

def condition():
    """Mock condition."""
    return False
```

## Summary

**Loop else Clause:**
- Executes when loop completes normally
- Does NOT execute if loop breaks
- Does NOT execute if exception raised
- Does execute for empty sequences

**Common Use Cases:**
1. **Search patterns** - Report when not found
2. **Validation** - Report when all items pass
3. **Retry loops** - Handle max attempts reached
4. **Sentinel processing** - Handle when no sentinel found

**Execution Rules:**
```python
# ✅ Runs else:
for item in items:
    process(item)
else:
    # Loop completed

# ❌ Doesn't run else:
for item in items:
    if condition:
        break
else:
    # Never reached

# ✅ Runs else (empty loop):
for item in []:
    pass
else:
    # This runs!
```

**Best Practices:**
- Use for search/validation patterns
- Document why you're using else
- Avoid when it doesn't add clarity
- Consider using flags if else is confusing
- Don't nest multiple loop-else clauses

The loop else clause is powerful but can be confusing. Use it when it makes the code clearer, not just because you can!
