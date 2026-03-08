---
id: lesson-003-011
title: Loops and Iterations
chapterId: chapter-03
order: 11
duration: 15
objectives:
  - Write while loops with proper termination conditions
  - Use break and continue to control loop flow
  - Implement counting, summing, and max/min loop patterns
  - Avoid infinite loops and common loop mistakes
---

# Loops and Iterations

## Why Loops?

Loops let you execute a block of code **repeatedly**. Without loops, doing the same task 1,000 times would require writing the same code 1,000 times. With loops, you write it once and let the computer repeat it.

## The `while` Loop

A `while` loop repeats its body **as long as the condition is `True`**:

```python
count = 1

while count <= 5:
    print(f"Count: {count}")
    count += 1

print("Done!")
```

**Output:**
```
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
Done!
```

The variable `count` is updated inside the loop. If you forget to update it, the condition stays `True` forever, creating an **infinite loop**.

## Infinite Loops and `break`

Sometimes you want a loop that runs until a specific event happens. You can use `while True` combined with `break`:

```python
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == "quit":
        break
    print(f"You typed: {user_input}")

print("Goodbye!")
```

The `break` statement **immediately exits** the loop. This pattern is useful when you don't know in advance how many times the loop should run.

## The `continue` Statement

`continue` **skips the rest of the current iteration** and jumps to the next one:

```python
for i in range(10):
    if i % 2 == 0:
        continue        # Skip even numbers
    print(i)
```

**Output:** `1 3 5 7 9`

## Counting Pattern

Counting how many times something occurs:

```python
word = "banana"
count = 0

for letter in word:
    if letter == "a":
        count += 1

print(f"The letter 'a' appears {count} times.")   # 3
```

## Summing Pattern

Adding up a series of values:

```python
total = 0
numbers = [4, 7, 2, 9, 1]

for num in numbers:
    total += num

print(f"Sum: {total}")       # 23
print(f"Average: {total / len(numbers)}")   # 4.6
```

## Finding Maximum and Minimum

```python
values = [17, 3, 42, 8, 25]

largest = values[0]
smallest = values[0]

for value in values:
    if value > largest:
        largest = value
    if value < smallest:
        smallest = value

print(f"Max: {largest}")     # 42
print(f"Min: {smallest}")    # 3
```

## Sentinel Values

A **sentinel value** is a special value that signals the end of input:

```python
total = 0
count = 0

while True:
    line = input("Enter a number (or 'done'): ")
    if line == "done":
        break
    try:
        total += float(line)
        count += 1
    except ValueError:
        print("Invalid input, try again.")

if count > 0:
    print(f"Total: {total}, Average: {total / count}")
```

## Common Loop Mistakes

```python
# Mistake 1: Forgetting to update the loop variable
# n = 5
# while n > 0:
#     print(n)       # Infinite loop! n never changes

# Fix:
n = 5
while n > 0:
    print(n)
    n -= 1

# Mistake 2: Off-by-one error
# while count < 10 vs while count <= 10
# Know whether you want 10 iterations or 11!
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
