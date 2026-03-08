---
id: lesson-003-023
title: Dictionaries: Common Applications
chapterId: chapter-03
order: 23
duration: 5
objectives:
  - Implement the word counting (histogram) pattern
  - Use the .get() method for safe counting
  - Perform frequency analysis on text
  - Build lookup tables with dictionaries
  - Understand the concept of caching and memoization
---

# Dictionaries: Common Applications

Dictionaries shine in real-world programming scenarios. Their ability to map keys to values makes them perfect for counting, categorizing, and caching data. This lesson covers the most common dictionary usage patterns you'll encounter.

## The Histogram Pattern (Word Counting)

One of the most classic uses of a dictionary is counting how often each item appears. This is sometimes called a **histogram** or **frequency map**:

```python
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counts = {}

for word in words:
    if word not in counts:
        counts[word] = 1
    else:
        counts[word] += 1

print(counts)
# {'apple': 3, 'banana': 2, 'cherry': 1}
```

The pattern is: check if the key exists, create it if not, then increment.

## Counting with .get()

The `.get()` method provides a cleaner way to write the same counting logic. Instead of the `if/else` check, use `.get(key, 0)` to return 0 for missing keys:

```python
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counts = {}

for word in words:
    counts[word] = counts.get(word, 0) + 1

print(counts)
# {'apple': 3, 'banana': 2, 'cherry': 1}
```

This one-line approach is idiomatic Python and is the preferred way to count items with a dictionary.

## Counting Words in Text

Combine `split()` with the histogram pattern to count words in any text:

```python
text = 'the quick brown fox jumps over the lazy dog the fox'
words = text.lower().split()
counts = {}

for word in words:
    counts[word] = counts.get(word, 0) + 1

print(counts)
# {'the': 3, 'quick': 1, 'brown': 1, 'fox': 2, ...}
```

## Counting Words in a File

Apply this pattern to count every word in a file:

```python
fhand = open('romeo.txt')
counts = {}

for line in fhand:
    words = line.split()
    for word in words:
        counts[word] = counts.get(word, 0) + 1

# Find the most common word
max_word = None
max_count = 0
for word, count in counts.items():
    if count > max_count:
        max_count = count
        max_word = word

print(f'Most common: "{max_word}" ({max_count} times)')
```

## Frequency Analysis

You can analyze the distribution of characters in a string using the same pattern:

```python
text = 'Mississippi'
freq = {}
for char in text.lower():
    freq[char] = freq.get(char, 0) + 1

print(freq)
# {'m': 1, 'i': 4, 's': 4, 'p': 2}
```

This technique is used in cryptography, linguistics, and data analysis.

## Building Lookup Tables

Dictionaries are ideal for creating lookup tables that map one value to another:

```python
# State abbreviation lookup
states = {
    'CA': 'California',
    'NY': 'New York',
    'TX': 'Texas',
    'FL': 'Florida'
}

abbrev = 'CA'
print(states.get(abbrev, 'Unknown'))  # California

# Grade point lookup
grade_points = {'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0}
gpa = grade_points['B']
print(gpa)  # 3.0
```

## Caching and Memoization

**Memoization** is a technique where you store the results of expensive function calls and return the cached result when the same input occurs again:

```python
cache = {}

def fibonacci(n):
    if n in cache:
        return cache[n]
    if n <= 1:
        result = n
    else:
        result = fibonacci(n - 1) + fibonacci(n - 2)
    cache[n] = result
    return result

print(fibonacci(30))  # 832040 (computed efficiently)
```

Without caching, `fibonacci(30)` would make millions of redundant recursive calls. With a dictionary cache, each value is computed only once.

## Key Takeaways

- The **histogram pattern** counts occurrences with `counts[key] = counts.get(key, 0) + 1`
- `.get(key, default)` eliminates the need for `if/else` key existence checks
- Combine `split()` with counting to analyze word frequencies in text or files
- Dictionaries make excellent **lookup tables** for mapping values
- **Memoization** uses a dictionary to cache expensive computations

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
