---
id: lesson-003-013
title: Iterations: Loop Idioms
chapterId: chapter-03
order: 13
duration: 15
objectives:
  - Implement the search pattern to find items in data
  - Use the accumulator pattern to build results
  - Apply the filter pattern to select specific items
  - Use flag variables to track loop state
---

# Iterations: Loop Idioms

## What Are Loop Idioms?

A **loop idiom** is a common pattern for solving a particular kind of problem with loops. Once you recognize these patterns, you can apply them to solve many different problems. The key patterns are: **search**, **accumulator**, **filter**, and **map**.

## The Search Pattern

The search pattern scans through data looking for a specific item. When found, it stops or records the result:

```python
# Search: Is a specific value present?
numbers = [4, 7, 2, 9, 1, 5]
target = 9
found = False

for num in numbers:
    if num == target:
        found = True
        break

if found:
    print(f"Found {target}!")
else:
    print(f"{target} not found.")
```

Python also has the `in` operator, which does this in one step:

```python
if 9 in numbers:
    print("Found 9!")
```

But understanding the manual pattern helps when your search criteria are more complex.

## The Accumulator Pattern

The accumulator pattern **builds up a result** by processing each item. You start with an initial value and update it on each iteration:

```python
# Accumulator: sum of all numbers
numbers = [4, 7, 2, 9, 1, 5]
total = 0             # Initialize accumulator

for num in numbers:
    total += num      # Update accumulator

print(f"Sum: {total}")   # 28
```

The accumulator can build different types of results:

```python
# Accumulator: build a string
words = ["Python", "is", "awesome"]
sentence = ""           # Initialize with empty string

for word in words:
    if sentence:
        sentence += " "  # Add space between words
    sentence += word

print(sentence)          # Python is awesome
```

```python
# Accumulator: build a list of results
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = []             # Initialize with empty list

for num in numbers:
    squares.append(num ** 2)

print(squares)   # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

## The Filter Pattern

The filter pattern **selects items** that meet a certain condition:

```python
# Filter: keep only even numbers
numbers = [15, 8, 42, 3, 67, 24, 11]
evens = []

for num in numbers:
    if num % 2 == 0:
        evens.append(num)

print(f"Even numbers: {evens}")   # [8, 42, 24]
```

```python
# Filter: keep words longer than 4 characters
words = ["cat", "elephant", "dog", "butterfly", "ant"]
long_words = []

for word in words:
    if len(word) > 4:
        long_words.append(word)

print(long_words)   # ['elephant', 'butterfly']
```

## The Map Pattern

The map pattern **transforms each item** in a collection:

```python
# Map: convert all names to uppercase
names = ["alice", "bob", "charlie"]
upper_names = []

for name in names:
    upper_names.append(name.upper())

print(upper_names)   # ['ALICE', 'BOB', 'CHARLIE']
```

```python
# Map: convert Fahrenheit temperatures to Celsius
fahrenheit_temps = [32, 68, 100, 212]
celsius_temps = []

for f in fahrenheit_temps:
    c = round((f - 32) * 5 / 9, 1)
    celsius_temps.append(c)

print(celsius_temps)   # [0.0, 20.0, 37.8, 100.0]
```

## Using Flag Variables

A **flag variable** is a boolean that tracks whether something has happened during the loop:

```python
# Check if a list contains any negative numbers
numbers = [5, 3, -2, 8, 1]
has_negative = False

for num in numbers:
    if num < 0:
        has_negative = True
        break

if has_negative:
    print("Warning: list contains negative numbers!")
else:
    print("All numbers are non-negative.")
```

Flag variables are especially useful when you need to know after the loop is done whether a certain condition was ever true.

## Combining Patterns

```python
# Count passing grades and calculate their average
grades = [85, 42, 93, 58, 74, 91, 67, 89]
passing = []      # Filter pattern
total = 0         # Accumulator pattern

for grade in grades:
    if grade >= 70:              # Filter
        passing.append(grade)
        total += grade           # Accumulate

avg = total / len(passing) if passing else 0
print(f"Passing grades: {passing}")
print(f"Average of passing: {avg:.1f}")
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
