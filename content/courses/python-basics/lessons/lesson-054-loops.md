---
id: loops
title: For and While Loops
chapterId: ch5-loops
order: 1
duration: 35
objectives:
  - Master for loops with range()
  - Understand while loops
  - Learn loop control with break and continue
---

# For and While Loops

Loops let you repeat code automatically. They're essential for processing lists, repeating tasks, and iterating through data.

## The for Loop

Repeat code a specific number of times:

```python
for i in range(5):
    print(i)

# Output:
# 0
# 1
# 2
# 3
# 4
```

## The range() Function

### range(stop)
```python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
```

### range(start, stop)
```python
for i in range(2, 6):
    print(i)  # 2, 3, 4, 5
```

### range(start, stop, step)
```python
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8
```

## Looping Through Lists

```python
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(fruit)

# Output:
# apple
# banana
# orange
```

## The while Loop

Repeat while condition is true:

```python
count = 0

while count < 5:
    print(count)
    count += 1

# Output: 0, 1, 2, 3, 4
```

## Loop Control

### break - Exit Loop Early

```python
for i in range(10):
    if i == 5:
        break
    print(i)

# Output: 0, 1, 2, 3, 4
```

### continue - Skip Current Iteration

```python
for i in range(5):
    if i == 2:
        continue
    print(i)

# Output: 0, 1, 3, 4
```

## Practical Examples

### Example 1: Sum Numbers

```python
total = 0
for i in range(1, 11):
    total += i
print(f"Sum: {total}")  # Sum: 55
```

### Example 2: Count Down

```python
for i in range(10, 0, -1):
    print(i)
print("Blast off!")
```

### Example 3: Find Even Numbers

```python
for i in range(1, 11):
    if i % 2 == 0:
        print(f"{i} is even")
```

### Example 4: User Input Loop

```python
while True:
    answer = input("Continue? (yes/no): ").lower()
    if answer == "no":
        break
    print("Continuing...")
```

## Key Takeaways

- **for loops** iterate a fixed number of times
- **range()** generates number sequences
- **while loops** repeat while condition is True
- **break** exits the loop
- **continue** skips to next iteration
- Always ensure while loops can eventually end

## What's Next?

You've mastered loops! Next, we'll learn about **lists** - Python's most versatile data structure.
