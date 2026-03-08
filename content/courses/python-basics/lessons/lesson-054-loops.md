---
id: lesson-054-loops
title: For and While Loops
chapterId: ch5-loops
order: 1
duration: 30
objectives:
  - Understand what iteration is and why it matters in programming
  - Master for loops with range() and iterable objects
  - Understand while loops and when to use them
  - Learn loop control with break, continue, and else
  - Recognize and avoid infinite loops
  - Apply common loop patterns like counting, accumulating, and searching
---

# For and While Loops

## What Is Iteration?

**Iteration** means repeating a block of code multiple times. It is one of the three fundamental building blocks of programming, alongside **sequence** (executing statements in order) and **selection** (choosing a path with `if`/`else`).

Without loops, you would have to write every repetitive action by hand:

```python
# Without loops — tedious and error-prone
print("Hello, student 1")
print("Hello, student 2")
print("Hello, student 3")
# ... imagine 1,000 students
```

With a loop, that collapses to two lines:

```python
for i in range(1, 1001):
    print(f"Hello, student {i}")
```

### Real-World Analogies

Loops mirror everyday activities that involve repetition:

- **Washing dishes** — pick up a dish, scrub it, rinse it, put it on the rack. Repeat until the sink is empty. That is a **while** loop: you keep going *while* there are dirty dishes.
- **Checking your mailbox** — every morning you walk to the mailbox and look inside. That is a **for** loop over the days of the week: *for each day*, check the mail.
- **Counting money** — you pick up each bill, add its value to a running total, and move to the next. That is a **for** loop with an accumulator pattern.

These analogies map directly to the two loop types Python offers: **for** and **while**.

---

## The `for` Loop

A `for` loop iterates over a **sequence** (list, string, range, tuple, etc.) and executes the loop body once for each element.

### Basic Syntax

```python
for variable in iterable:
    # code to execute on each iteration
```

### Iterating Over a List

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I like {fruit}!")

# Output:
# I like apple!
# I like banana!
# I like cherry!
```

### Iterating Over a String

Strings are sequences of characters, so you can loop through them directly:

```python
for char in "Python":
    print(char, end=" ")

# Output: P y t h o n
```

---

## The `range()` Function

`range()` generates a sequence of integers and is the most common companion to `for` loops when you need to repeat something a specific number of times.

### `range(stop)` — Count From 0

```python
for i in range(5):
    print(i)

# Output: 0  1  2  3  4
```

`range(5)` produces `0, 1, 2, 3, 4` — five values starting at 0 and stopping *before* 5.

### `range(start, stop)` — Custom Start

```python
for i in range(2, 7):
    print(i)

# Output: 2  3  4  5  6
```

### `range(start, stop, step)` — Custom Step

```python
# Count by twos
for i in range(0, 10, 2):
    print(i)

# Output: 0  2  4  6  8
```

### Counting Backwards

Use a negative step to count down:

```python
for i in range(10, 0, -1):
    print(i, end=" ")
print("Blast off!")

# Output: 10 9 8 7 6 5 4 3 2 1 Blast off!
```

> **Memory note:** `range()` does not create a list in memory. It generates values one at a time, making it extremely memory-efficient even for huge ranges like `range(1_000_000_000)`.

---

## The `while` Loop

A `while` loop repeats **as long as a condition is `True`**. Use it when you do not know in advance how many iterations you need.

### Basic Syntax

```python
while condition:
    # code to execute while condition is True
```

### Simple Counter

```python
count = 0

while count < 5:
    print(count)
    count += 1

# Output: 0  1  2  3  4
```

### User Input Validation

A classic use case — keep asking until the user provides valid input:

```python
while True:
    age_str = input("Enter your age: ")
    if age_str.isdigit() and int(age_str) > 0:
        age = int(age_str)
        break
    print("Invalid input. Please enter a positive number.")

print(f"Your age is {age}.")
```

### Sentinel Value Pattern

Loop until a special "sentinel" value signals the end:

```python
total = 0
print("Enter numbers to sum (type 'done' to finish):")

while True:
    entry = input("> ")
    if entry.lower() == "done":
        break
    total += float(entry)

print(f"Total: {total}")
```

---

## `for` vs `while` — When to Use Each

| Situation | Recommended Loop | Why |
|-----------|-----------------|-----|
| Iterate over a collection | `for` | Cleaner syntax, no manual index |
| Repeat a known number of times | `for` with `range()` | Clear intent, less error-prone |
| Repeat until a condition changes | `while` | Number of iterations unknown |
| Wait for user input / event | `while` | Condition-driven |
| Read lines from a file | `for` | Files are iterable |

**Rule of thumb:** If you can express the task as "do this *for each* item," use `for`. If you can express it as "keep doing this *while* something is true," use `while`.

---

## Loop Control: `break`, `continue`, and `else`

### `break` — Exit the Loop Immediately

`break` terminates the nearest enclosing loop and skips any remaining iterations:

```python
# Find the first negative number
numbers = [4, 7, -2, 9, 1]

for num in numbers:
    if num < 0:
        print(f"Found negative: {num}")
        break
    print(f"Checked: {num}")

# Output:
# Checked: 4
# Checked: 7
# Found negative: -2
```

### `continue` — Skip to the Next Iteration

`continue` skips the rest of the current iteration and jumps to the next one:

```python
# Print only odd numbers
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)

# Output: 1  3  5  7  9
```

### The `else` Clause on Loops

Python loops can have an `else` block that executes **only if the loop completed without hitting a `break`**:

```python
# Search for a target value
numbers = [2, 4, 6, 8, 10]
target = 5

for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} was not found in the list.")

# Output: 5 was not found in the list.
```

This is particularly useful for search patterns where you need to know whether the loop found what it was looking for.

---

## Infinite Loops and How to Avoid Them

An **infinite loop** runs forever because its condition never becomes `False`:

```python
# DANGER: infinite loop!
count = 0
while count < 5:
    print(count)
    # Oops — forgot to increment count!
```

### Common Causes of Infinite Loops

1. **Forgetting to update the loop variable** (as above).
2. **Condition that can never be False:**
   ```python
   x = 10
   while x > 0:
       print(x)
       x += 1  # x grows, never reaches 0
   ```
3. **Off-by-one logic errors** where the variable skips the exit value.

### How to Stop an Infinite Loop

- Press **Ctrl+C** in the terminal to send a `KeyboardInterrupt`.
- In a Jupyter notebook, click the stop button or restart the kernel.

### Intentional Infinite Loops

Sometimes `while True` is deliberate — for servers, game loops, or menu systems — with a `break` inside to exit:

```python
while True:
    choice = input("Menu: (1) Play  (2) Quit: ")
    if choice == "2":
        print("Goodbye!")
        break
    elif choice == "1":
        print("Playing...")
```

---

## Loop Variables and Scope

In Python, loop variables **persist** after the loop ends. This is different from many other languages:

```python
for i in range(5):
    pass

print(i)  # 4 — still accessible!
```

This can be useful (e.g., knowing the last value processed) but can also cause subtle bugs if you reuse the same variable name unintentionally. A good practice is to use descriptive loop variable names:

```python
for student in students:
    process(student)

# 'student' still holds the last element here
```

---

## Common Loop Patterns

### 1. Counting Pattern

Count how many items match a condition:

```python
words = ["apple", "avocado", "banana", "apricot", "cherry"]
count = 0

for word in words:
    if word.startswith("a"):
        count += 1

print(f"Words starting with 'a': {count}")  # 3
```

### 2. Accumulator Pattern

Build up a result (sum, product, string) across iterations:

```python
numbers = [10, 20, 30, 40, 50]
total = 0

for num in numbers:
    total += num

print(f"Sum: {total}")  # Sum: 150
```

### 3. Search Pattern

Find a specific item and stop early:

```python
data = [15, 22, 8, 41, 3, 19]

for value in data:
    if value > 30:
        print(f"First value over 30: {value}")
        break
else:
    print("No value over 30 found.")

# Output: First value over 30: 41
```

### 4. Finding Maximum / Minimum

```python
temperatures = [72, 68, 75, 80, 65, 77]

max_temp = temperatures[0]
for temp in temperatures[1:]:
    if temp > max_temp:
        max_temp = temp

print(f"Highest temperature: {max_temp}")  # 80
```

> **Tip:** Python has built-in `max()` and `min()` functions, but understanding the loop-based approach teaches fundamental algorithmic thinking.

### 5. Building a New Collection

Filter or transform items into a new list:

```python
scores = [55, 72, 88, 41, 95, 63]
passing = []

for score in scores:
    if score >= 60:
        passing.append(score)

print(f"Passing scores: {passing}")  # [72, 88, 95, 63]
```

---

## Nested Loops

Loops inside other loops let you work with multi-dimensional data:

```python
# Multiplication table (1-5)
for row in range(1, 6):
    for col in range(1, 6):
        print(f"{row * col:4}", end="")
    print()  # New line after each row

# Output:
#    1   2   3   4   5
#    2   4   6   8  10
#    3   6   9  12  15
#    4   8  12  16  20
#    5  10  15  20  25
```

> **Performance note:** Nested loops multiply — a loop of 1,000 inside another loop of 1,000 means 1,000,000 iterations. Be mindful of nesting depth with large data.

---

## Practical Examples

### Fibonacci Sequence

```python
n = 10
a, b = 0, 1

print("Fibonacci sequence:")
for _ in range(n):
    print(a, end=" ")
    a, b = b, a + b

# Output: 0 1 1 2 3 5 8 13 21 34
```

### Counting Character Occurrences

```python
text = "mississippi"
target = "s"
count = 0

for char in text:
    if char == target:
        count += 1

print(f"'{target}' appears {count} times")  # 's' appears 4 times
```

### Password Strength Checker

```python
password = "MyP@ss1"
has_upper = has_lower = has_digit = has_special = False

for ch in password:
    if ch.isupper():
        has_upper = True
    elif ch.islower():
        has_lower = True
    elif ch.isdigit():
        has_digit = True
    else:
        has_special = True

if all([has_upper, has_lower, has_digit, has_special]):
    print("Strong password!")
else:
    print("Weak password — use upper, lower, digit, and special chars.")
```

---

## Try It Yourself

1. **Sum of evens:** Write a `for` loop that calculates the sum of all even numbers from 1 to 100.
2. **Guessing game:** Use a `while` loop to let the user guess a secret number (1–20). Give "too high" / "too low" hints and count the guesses.
3. **Reverse a string:** Use a `for` loop to build a reversed version of any string without using slicing or `reversed()`.
4. **Prime checker:** Write a loop that checks whether a given number is prime. Use `break` to exit early if you find a divisor.
5. **Pattern printer:** Use nested loops to print this triangle:
   ```
   *
   **
   ***
   ****
   *****
   ```

---

## Key Takeaways

- **Iteration** is repeatedly executing code — it is fundamental to almost every program.
- **`for` loops** iterate over a sequence or range; use them when the number of iterations is known or you are processing a collection.
- **`while` loops** repeat while a condition holds; use them when the number of iterations is unknown.
- **`range()`** efficiently generates integer sequences without creating a list in memory.
- **`break`** exits a loop early; **`continue`** skips to the next iteration; **`else`** on a loop runs only if no `break` occurred.
- **Infinite loops** happen when the exit condition is never met — always ensure your loop variable changes toward the exit condition.
- **Loop variables persist** after the loop ends in Python.
- **Common patterns** — counting, accumulating, searching, finding min/max — appear in almost every real program. Recognizing them makes you a faster, more confident coder.
