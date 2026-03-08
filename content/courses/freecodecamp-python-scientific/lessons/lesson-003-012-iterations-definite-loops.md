---
id: lesson-003-012
title: Iterations: Definite Loops
chapterId: chapter-03
order: 12
duration: 15
objectives:
  - Use for loops to iterate over sequences
  - Generate number ranges with range()
  - Track indices with enumerate()
  - Compare when to use for vs while loops
---

# Iterations: Definite Loops

## The `for` Loop

A `for` loop iterates over each item in a **sequence** (like a list, string, or range). Unlike a `while` loop, you know in advance how many times it will run — that's why it's called a "definite" loop.

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I like {fruit}")
```

**Output:**
```
I like apple
I like banana
I like cherry
```

The variable `fruit` takes on each value in the list, one at a time.

## Iterating Over Strings

Strings are sequences of characters, so you can loop through them:

```python
word = "Python"

for char in word:
    print(char, end=" ")
# Output: P y t h o n
```

## The `range()` Function

`range()` generates a sequence of numbers. It is the most common way to create a `for` loop that runs a specific number of times:

```python
# range(stop) — from 0 up to (but not including) stop
for i in range(5):
    print(i, end=" ")   # 0 1 2 3 4
```

```python
# range(start, stop) — from start up to (but not including) stop
for i in range(2, 7):
    print(i, end=" ")   # 2 3 4 5 6
```

```python
# range(start, stop, step) — count by step
for i in range(0, 20, 5):
    print(i, end=" ")   # 0 5 10 15
```

```python
# Counting backwards
for i in range(10, 0, -1):
    print(i, end=" ")   # 10 9 8 7 6 5 4 3 2 1
```

## The `enumerate()` Function

When you need both the **index** and the **value** during iteration, use `enumerate()`:

```python
colors = ["red", "green", "blue"]

for index, color in enumerate(colors):
    print(f"{index}: {color}")
```

**Output:**
```
0: red
1: green
2: blue
```

You can set a custom starting index:

```python
for i, color in enumerate(colors, start=1):
    print(f"{i}. {color}")
# 1. red
# 2. green
# 3. blue
```

## `while` vs `for` — When to Use Which

| Use `for` when... | Use `while` when... |
|---|---|
| You know the number of iterations | You don't know how many iterations |
| You're iterating over a sequence | You're waiting for a condition to change |
| Examples: processing a list, repeating N times | Examples: user input loops, game loops |

```python
# for: process each item in a known collection
scores = [85, 92, 78, 96, 88]
for score in scores:
    print(f"Score: {score}")

# while: keep going until user says stop
while input("Continue? (y/n): ") == "y":
    print("Looping...")
```

## Nested Loops

You can place a loop inside another loop. The inner loop runs completely for each iteration of the outer loop:

```python
# Multiplication table (1-5)
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i * j:4}", end="")
    print()   # New line after each row
```

**Output:**
```
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
