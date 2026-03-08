---
id: lesson-003-024
title: Dictionaries and Loops
chapterId: chapter-03
order: 24
duration: 5
objectives:
  - Iterate over dictionary keys, values, and items
  - Sort dictionary output for consistent display
  - Find the key with the maximum value
  - Invert a dictionary (swap keys and values)
  - Work with nested dictionaries
  - Use dictionary comprehensions
---

# Dictionaries and Loops

Dictionaries become truly powerful when combined with loops. Python provides several ways to iterate over a dictionary's contents — by keys, values, or both.

## Iterating Over Keys

By default, looping over a dictionary iterates through its **keys**:

```python
student = {'name': 'Alice', 'age': 25, 'grade': 'A'}

for key in student:
    print(key, ':', student[key])

# name : Alice
# age : 25
# grade : A
```

You can also be explicit with `.keys()`:

```python
for key in student.keys():
    print(key)
```

## Iterating Over Values

Use `.values()` when you only need the values:

```python
scores = {'math': 92, 'science': 88, 'english': 95}

total = 0
for score in scores.values():
    total += score

average = total / len(scores)
print(f'Average: {average:.1f}')  # Average: 91.7
```

## Iterating Over Key-Value Pairs

Use `.items()` to get both the key and value in each iteration:

```python
scores = {'math': 92, 'science': 88, 'english': 95}

for subject, score in scores.items():
    print(f'{subject}: {score}')

# math: 92
# science: 88
# english: 95
```

This is the most common and readable pattern for dictionary iteration.

## Sorted Iteration

Dictionaries maintain insertion order (Python 3.7+), but you can iterate in sorted order:

```python
counts = {'banana': 3, 'apple': 5, 'cherry': 1}

# Sort by key
for key in sorted(counts):
    print(key, counts[key])
# apple 5
# banana 3
# cherry 1

# Sort by value
for key in sorted(counts, key=counts.get):
    print(key, counts[key])
# cherry 1
# banana 3
# apple 5
```

## Finding the Key with Maximum Value

A practical pattern is finding which key has the highest (or lowest) value:

```python
counts = {'the': 12, 'and': 8, 'of': 10, 'to': 7}

max_key = None
max_value = 0
for key, value in counts.items():
    if max_key is None or value > max_value:
        max_key = key
        max_value = value

print(f'Most common: "{max_key}" ({max_value} times)')
# Most common: "the" (12 times)
```

You can also use the `max()` function with a key parameter:

```python
max_key = max(counts, key=counts.get)
print(max_key)  # the
```

## Inverting a Dictionary

Sometimes you need to swap keys and values. Be aware that values must be unique for this to work correctly:

```python
english_to_spanish = {'one': 'uno', 'two': 'dos', 'three': 'tres'}
spanish_to_english = {}

for eng, spa in english_to_spanish.items():
    spanish_to_english[spa] = eng

print(spanish_to_english)
# {'uno': 'one', 'dos': 'two', 'tres': 'three'}
```

## Nested Dictionaries

Dictionaries can contain other dictionaries, creating hierarchical data structures:

```python
students = {
    'alice': {'age': 25, 'grades': [90, 85, 92]},
    'bob': {'age': 22, 'grades': [78, 82, 88]},
}

for name, info in students.items():
    avg = sum(info['grades']) / len(info['grades'])
    print(f"{name}: age {info['age']}, avg grade {avg:.1f}")

# alice: age 25, avg grade 89.0
# bob: age 22, avg grade 82.7
```

## Dictionary Comprehensions

Just like list comprehensions, you can create dictionaries in a single expression:

```python
# Squares of numbers
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Filter a dictionary
scores = {'math': 92, 'science': 88, 'english': 95, 'art': 72}
high_scores = {k: v for k, v in scores.items() if v >= 90}
print(high_scores)  # {'math': 92, 'english': 95}

# Invert with a comprehension
inverted = {v: k for k, v in english_to_spanish.items()}
```

## Key Takeaways

- Loop over `.keys()` for keys, `.values()` for values, `.items()` for both
- Use `sorted()` with a dictionary to iterate in alphabetical or value-based order
- `max(d, key=d.get)` finds the key with the highest value
- Nested dictionaries model complex, hierarchical data
- Dictionary comprehensions provide concise syntax for creating and filtering dicts

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
