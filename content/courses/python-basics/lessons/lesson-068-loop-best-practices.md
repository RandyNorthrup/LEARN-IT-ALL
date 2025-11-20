---
id: "103-loop-best-practices"
title: "Loop Best Practices and Anti-Patterns"
chapterId: ch5-loops
order: 14
duration: 25
objectives:
  - Learn loop best practices
  - Recognize and avoid anti-patterns
  - Write more maintainable loops
  - Understand when to refactor loops
---

# Loop Best Practices and Anti-Patterns

Writing good loops is about more than just syntax. This lesson covers best practices for readable, maintainable, and efficient loop code.

## Use Descriptive Variable Names

```python
# ❌ BAD - Unclear variable names
for i in data:
    for j in i:
        if j > 10:
            print(j)

# ✅ GOOD - Clear, descriptive names
for row in data:
    for value in row:
        if value > 10:
            print(value)

# ❌ BAD - Single letter for important data
for x in users:
    if x['age'] > 18:
        print(x['name'])

# ✅ GOOD - Meaningful names
for user in users:
    if user['age'] > 18:
        print(user['name'])

# Single letters OK for simple counters
for i in range(10):
    print(i)  # OK - i is conventional for counter

# But descriptive is better for clarity
for index in range(10):
    print(index)  # Better - clearer intent

for customer_id in range(100, 200):
    print(customer_id)  # Best - shows what it represents
```

## Keep Loops Simple and Focused

```python
# ❌ BAD - Loop doing too many things
def process_orders(orders):
    total = 0
    valid_orders = []
    customers = set()
    high_value = []
    errors = []
    
    for order in orders:
        try:
            # Validate
            if order['amount'] < 0:
                errors.append(f"Invalid amount: {order['id']}")
                continue
            
            # Calculate total
            total += order['amount']
            
            # Track customer
            customers.add(order['customer'])
            
            # Find high value
            if order['amount'] > 1000:
                high_value.append(order)
            
            # Build valid list
            valid_orders.append(order)
            
        except KeyError as e:
            errors.append(f"Missing field: {e}")
    
    return total, valid_orders, customers, high_value, errors

# ✅ GOOD - Separate concerns
def validate_orders(orders):
    """Validate orders and return valid ones."""
    valid = []
    errors = []
    for order in orders:
        try:
            if order['amount'] < 0:
                errors.append(f"Invalid amount: {order['id']}")
            else:
                valid.append(order)
        except KeyError as e:
            errors.append(f"Missing field: {e}")
    return valid, errors

def calculate_total(orders):
    """Calculate total amount."""
    return sum(order['amount'] for order in orders)

def get_customers(orders):
    """Extract unique customers."""
    return {order['customer'] for order in orders}

def filter_high_value(orders, threshold=1000):
    """Find high-value orders."""
    return [order for order in orders if order['amount'] > threshold]

# Use separately
valid_orders, errors = validate_orders(orders)
total = calculate_total(valid_orders)
customers = get_customers(valid_orders)
high_value = filter_high_value(valid_orders)
```

## Avoid Modifying List While Iterating

```python
# ❌ BAD - Modifying list during iteration
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # Dangerous! Skips elements

print(numbers)  # [1, 3, 5, 6] - Not what you expected!

# ✅ GOOD - Create new list
numbers = [1, 2, 3, 4, 5, 6]
numbers = [num for num in numbers if num % 2 != 0]
print(numbers)  # [1, 3, 5]

# ✅ GOOD - Iterate over copy
numbers = [1, 2, 3, 4, 5, 6]
for num in numbers[:]:  # Iterate over copy
    if num % 2 == 0:
        numbers.remove(num)
print(numbers)  # [1, 3, 5]

# ✅ GOOD - Iterate backwards by index
numbers = [1, 2, 3, 4, 5, 6]
for i in range(len(numbers) - 1, -1, -1):
    if numbers[i] % 2 == 0:
        del numbers[i]
print(numbers)  # [1, 3, 5]

# ✅ BEST - Use filter or comprehension
numbers = [1, 2, 3, 4, 5, 6]
numbers = [n for n in numbers if n % 2 != 0]
# Or: numbers = list(filter(lambda n: n % 2 != 0, numbers))
```

## Use Comprehensions for Simple Transformations

```python
# ❌ VERBOSE - Traditional loop for simple task
squares = []
for i in range(10):
    squares.append(i * i)

# ✅ BETTER - List comprehension
squares = [i * i for i in range(10)]

# ❌ VERBOSE - Loop with condition
evens = []
for num in range(20):
    if num % 2 == 0:
        evens.append(num)

# ✅ BETTER - Comprehension with filter
evens = [num for num in range(20) if num % 2 == 0]

# ❌ BAD - Comprehension too complex
result = [
    process_complex_logic(
        item,
        calculate_something(item['field1']),
        transform_data(item['field2'])
    )
    for item in data
    if validate_complex_condition(item)
    and check_another_thing(item)
    and yet_another_check(item)
]

# ✅ GOOD - Complex logic in regular loop
result = []
for item in data:
    if not (validate_complex_condition(item) and
            check_another_thing(item) and
            yet_another_check(item)):
        continue
    
    value = process_complex_logic(
        item,
        calculate_something(item['field1']),
        transform_data(item['field2'])
    )
    result.append(value)
```

## Avoid Deep Nesting

```python
# ❌ BAD - Deep nesting (hard to read)
def process_data(data):
    results = []
    for item in data:
        if item['active']:
            if item['score'] > 50:
                if item['category'] == 'A':
                    if item['age'] >= 18:
                        results.append(item)
    return results

# ✅ GOOD - Early returns/continues
def process_data_better(data):
    results = []
    for item in data:
        if not item['active']:
            continue
        if item['score'] <= 50:
            continue
        if item['category'] != 'A':
            continue
        if item['age'] < 18:
            continue
        
        results.append(item)
    return results

# ✅ BEST - Combined conditions
def process_data_best(data):
    return [
        item for item in data
        if item['active']
        and item['score'] > 50
        and item['category'] == 'A'
        and item['age'] >= 18
    ]

# ❌ BAD - Nested loops with deep conditions
for i in range(10):
    for j in range(10):
        if i != j:
            if i + j > 10:
                if i * j < 50:
                    print(i, j)

# ✅ GOOD - Extract to function
def should_print(i, j):
    """Check if pair should be printed."""
    return i != j and i + j > 10 and i * j < 50

for i in range(10):
    for j in range(10):
        if should_print(i, j):
            print(i, j)

# ✅ BETTER - Comprehension with guard
pairs = [
    (i, j) for i in range(10) for j in range(10)
    if i != j and i + j > 10 and i * j < 50
]
for i, j in pairs:
    print(i, j)
```

## Use Built-in Functions

```python
# ❌ BAD - Reimplementing built-ins
def my_sum(numbers):
    """Don't reimplement sum()."""
    total = 0
    for num in numbers:
        total += num
    return total

# ✅ GOOD - Use built-in
total = sum(numbers)

# ❌ BAD - Manual min/max
def find_max(numbers):
    """Don't reimplement max()."""
    maximum = numbers[0]
    for num in numbers:
        if num > maximum:
            maximum = num
    return maximum

# ✅ GOOD - Use built-in
maximum = max(numbers)

# ❌ BAD - Manual any/all
def has_even(numbers):
    """Don't reimplement any()."""
    for num in numbers:
        if num % 2 == 0:
            return True
    return False

# ✅ GOOD - Use built-in
has_even = any(num % 2 == 0 for num in numbers)

# ❌ BAD - Manual filtering
def get_positives(numbers):
    result = []
    for num in numbers:
        if num > 0:
            result.append(num)
    return result

# ✅ GOOD - Use filter or comprehension
positives = [num for num in numbers if num > 0]
# Or: positives = list(filter(lambda n: n > 0, numbers))
```

## Don't Use Loops for Side Effects Only

```python
# ❌ BAD - Loop just for side effects
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num)

# ✅ ACCEPTABLE - This is actually fine for printing
# But consider batch operations:

# ❌ BAD - Opening file in every iteration
for item in items:
    with open('log.txt', 'a') as f:
        f.write(f"{item}\n")

# ✅ GOOD - Open file once
with open('log.txt', 'a') as f:
    for item in items:
        f.write(f"{item}\n")

# ❌ BAD - Making API call for each item
for user_id in user_ids:
    response = api.get_user(user_id)
    process(response)

# ✅ GOOD - Batch API call
responses = api.get_users_batch(user_ids)
for response in responses:
    process(response)
```

## Use enumerate() Instead of range(len())

```python
# ❌ BAD - Using range(len())
fruits = ['apple', 'banana', 'cherry']
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# ✅ GOOD - Use enumerate()
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# ❌ BAD - Manual index tracking
fruits = ['apple', 'banana', 'cherry']
index = 0
for fruit in fruits:
    print(f"{index}: {fruit}")
    index += 1

# ✅ GOOD - enumerate()
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Custom start index
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry
```

## Use zip() for Parallel Iteration

```python
# ❌ BAD - Indexing multiple lists
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]

for i in range(len(names)):
    print(f"{names[i]} is {ages[i]} years old")

# ✅ GOOD - Use zip()
for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# ❌ BAD - Manual parallel iteration
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
cities = ['NYC', 'LA', 'Chicago']

for i in range(min(len(names), len(ages), len(cities))):
    print(f"{names[i]}, {ages[i]}, {cities[i]}")

# ✅ GOOD - zip() handles it
for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age}, {city}")
```

## Break and Continue Wisely

```python
# ❌ BAD - Unnecessary flag variable
found = False
for item in items:
    if item == target:
        found = True
        break

if found:
    print("Found!")

# ✅ GOOD - Use else clause
for item in items:
    if item == target:
        print("Found!")
        break
else:
    print("Not found")

# ❌ BAD - Continue with empty if
for item in items:
    if item != target:
        continue
    process(item)

# ✅ BETTER - Positive condition
for item in items:
    if item == target:
        process(item)

# ✅ BEST - Filter first
matching_items = [item for item in items if item == target]
for item in matching_items:
    process(item)

# Good use of continue - skip invalid items
for item in items:
    if not is_valid(item):
        continue
    
    # Process valid items
    result = process(item)
    save(result)
```

## Avoid Empty Except Blocks

```python
# ❌ BAD - Silently swallowing errors
for item in items:
    try:
        process(item)
    except:
        pass  # What went wrong? Can't tell!

# ✅ GOOD - Handle specific exceptions
for item in items:
    try:
        process(item)
    except ValueError as e:
        print(f"Invalid value in {item}: {e}")
    except KeyError as e:
        print(f"Missing key in {item}: {e}")

# ✅ BETTER - Log errors
import logging

for item in items:
    try:
        process(item)
    except Exception as e:
        logging.error(f"Error processing {item}: {e}")
        # Optionally continue or break

# ✅ GOOD - Collect errors
errors = []
for item in items:
    try:
        process(item)
    except Exception as e:
        errors.append((item, str(e)))

if errors:
    print(f"Encountered {len(errors)} errors:")
    for item, error in errors:
        print(f"  {item}: {error}")
```

## Don't Use Loop Counter for Range Iteration

```python
# ❌ BAD - Manual counter with while loop
i = 0
while i < 10:
    print(i)
    i += 1

# ✅ GOOD - Use for loop with range
for i in range(10):
    print(i)

# ❌ BAD - List iteration with counter
items = ['a', 'b', 'c', 'd']
i = 0
while i < len(items):
    print(items[i])
    i += 1

# ✅ GOOD - Direct iteration
for item in items:
    print(item)

# When you need index, use enumerate
for i, item in enumerate(items):
    print(f"{i}: {item}")
```

## Avoid Premature Optimization

```python
# ❌ BAD - Premature micro-optimization
# Caching len() when not needed
def process_items(items):
    length = len(items)  # Unnecessary
    for i in range(length):
        process(items[i])

# ✅ GOOD - Clear and simple
def process_items(items):
    for item in items:
        process(item)

# Optimize only when profiling shows bottleneck:
# ❌ BAD - Over-optimizing simple code
def sum_squares(numbers):
    # Trying to be too clever
    result = 0
    length = len(numbers)
    i = 0
    while i < length:
        num = numbers[i]
        square = num * num
        result = result + square
        i = i + 1
    return result

# ✅ GOOD - Readable is better
def sum_squares(numbers):
    return sum(num * num for num in numbers)

# Optimize when proven necessary
import time

def sum_squares_optimized(numbers):
    """Use when profiling shows this is bottleneck."""
    total = 0
    for num in numbers:
        total += num * num
    return total
```

## Document Complex Loops

```python
# ❌ BAD - No documentation for complex logic
for i in range(len(matrix)):
    for j in range(i + 1, len(matrix[0])):
        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

# ✅ GOOD - Clear documentation
def transpose_matrix_inplace(matrix):
    """Transpose square matrix in-place by swapping elements.
    
    For each element above the diagonal, swap it with the
    corresponding element below the diagonal.
    """
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

# ❌ BAD - Unclear algorithm
result = []
for i in range(len(data)):
    if i == 0 or data[i] != data[i-1]:
        result.append(data[i])

# ✅ GOOD - Document intent
def remove_consecutive_duplicates(data):
    """Remove consecutive duplicate elements.
    
    Keeps first occurrence of each consecutive group.
    Example: [1, 1, 2, 2, 3, 1] -> [1, 2, 3, 1]
    """
    if not data:
        return []
    
    result = [data[0]]
    for item in data[1:]:
        if item != result[-1]:
            result.append(item)
    return result
```

## Summary

**Best Practices:**

1. **Use descriptive variable names**
   - `for user in users:` not `for x in data:`

2. **Keep loops simple and focused**
   - One clear purpose per loop
   - Extract complex logic to functions

3. **Use the right tool**
   - Comprehensions for simple transformations
   - Regular loops for complex logic
   - Built-in functions when available

4. **Avoid deep nesting**
   - Use early returns/continues
   - Extract to functions
   - Combine conditions

5. **Don't modify while iterating**
   - Create new list
   - Iterate over copy
   - Use comprehension

6. **Use built-in functions**
   - `sum()`, `min()`, `max()`, `any()`, `all()`
   - `enumerate()` over `range(len())`
   - `zip()` for parallel iteration

7. **Handle errors properly**
   - Catch specific exceptions
   - Log or collect errors
   - Don't silently ignore

8. **Document complex logic**
   - Explain non-obvious algorithms
   - Add docstrings to functions
   - Comment tricky parts

**Anti-Patterns to Avoid:**

- ❌ Single letter variable names for meaningful data
- ❌ Loops doing too many things
- ❌ Modifying list while iterating
- ❌ Deep nesting (> 3 levels)
- ❌ Reimplementing built-in functions
- ❌ Using `range(len())` when `enumerate()` works
- ❌ Empty except blocks
- ❌ Premature optimization
- ❌ Unclear complex logic

**Golden Rules:**

1. **Readability counts** - Clear code > clever code
2. **Simple is better than complex** - Don't over-engineer
3. **Profile before optimizing** - Measure first
4. **Use Pythonic idioms** - Leverage the language

Good loop code is readable, maintainable, and efficient - in that order!
