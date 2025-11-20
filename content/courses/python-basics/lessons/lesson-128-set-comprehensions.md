---
id: "137-set-comprehensions"
title: "Set Comprehensions and Generation"
chapterId: ch10-sets
order: 4
duration: 25
objectives:
  - Master set comprehension syntax
  - Learn filtering and transformation patterns
  - Generate sets efficiently
  - Understand comprehension vs loops
---

# Set Comprehensions and Generation

Powerful set creation using comprehensions for concise and efficient code.

## Basic Set Comprehensions

```python
# Syntax: {expression for item in iterable}
squares = {x**2 for x in range(10)}
print(squares)  # {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

# From list
numbers = [1, 2, 3, 4, 5]
doubled = {x * 2 for x in numbers}
print(doubled)  # {2, 4, 6, 8, 10}

# From string
text = "hello"
upper_chars = {char.upper() for char in text}
print(upper_chars)  # {'H', 'E', 'L', 'O'} (one 'L' due to uniqueness)

# From range
evens = {x for x in range(20) if x % 2 == 0}
print(evens)  # {0, 2, 4, 6, 8, 10, 12, 14, 16, 18}

# Automatic duplicate removal
numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5]
unique = {x for x in numbers}
print(unique)  # {1, 2, 3, 4, 5}
```

## Conditional Set Comprehensions

```python
# Filter with if clause
numbers = range(20)
evens = {x for x in numbers if x % 2 == 0}
print(evens)  # {0, 2, 4, 6, 8, 10, 12, 14, 16, 18}

# Multiple conditions
multiples_of_3_and_5 = {x for x in range(100) if x % 3 == 0 if x % 5 == 0}
print(multiples_of_3_and_5)  # {0, 15, 30, 45, 60, 75, 90}

# Or use and
multiples = {x for x in range(100) if x % 3 == 0 and x % 5 == 0}
print(multiples)  # Same result

# Filter strings
words = ["apple", "banana", "cherry", "date", "elderberry"]
long_words = {word for word in words if len(word) > 5}
print(long_words)  # {"banana", "cherry", "elderberry"}

# Filter with function
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

primes = {x for x in range(50) if is_prime(x)}
print(primes)  # {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47}
```

## Conditional Expressions in Comprehensions

```python
# Syntax: {expr_if_true if condition else expr_if_false for item in iterable}

# Absolute values
numbers = [-2, -1, 0, 1, 2]
absolutes = {x if x >= 0 else -x for x in numbers}
print(absolutes)  # {0, 1, 2}

# Categorize numbers
numbers = range(-5, 6)
categories = {("positive" if x > 0 else "negative" if x < 0 else "zero") for x in numbers}
print(categories)  # {"positive", "negative", "zero"}

# Transform strings
words = ["apple", "BANANA", "Cherry"]
normalized = {word.lower() if word.isupper() else word.upper() for word in words}
print(normalized)  # {"APPLE", "banana", "CHERRY"}

# Note: Different from filtering - this transforms ALL elements
```

## Nested Comprehensions

```python
# Flatten nested structure
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = {num for row in matrix for num in row}
print(flattened)  # {1, 2, 3, 4, 5, 6, 7, 8, 9}

# Cartesian product (unique pairs)
colors = ["red", "green"]
sizes = ["S", "M", "L"]
products = {f"{color}-{size}" for color in colors for size in sizes}
print(products)
# {"red-S", "red-M", "red-L", "green-S", "green-M", "green-L"}

# All pairs of numbers
numbers = [1, 2, 3]
pairs = {(x, y) for x in numbers for y in numbers if x != y}
print(pairs)
# {(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)}

# Unique pairs (unordered)
unique_pairs = {(min(x, y), max(x, y)) for x in numbers for y in numbers if x < y}
print(unique_pairs)  # {(1, 2), (1, 3), (2, 3)}

# Extract all words from multiple sentences
sentences = [
    "Python is great",
    "I love Python",
    "Python programming"
]
all_words = {word.lower() for sentence in sentences for word in sentence.split()}
print(all_words)  # {"python", "is", "great", "i", "love", "programming"}
```

## Working with Strings

```python
# Unique characters
text = "hello world"
unique_chars = {char for char in text if char != ' '}
print(unique_chars)  # {'h', 'e', 'l', 'o', 'w', 'r', 'd'}

# Unique letters (alpha only)
text = "Hello, World! 123"
letters = {char.lower() for char in text if char.isalpha()}
print(letters)  # {'h', 'e', 'l', 'o', 'w', 'r', 'd'}

# Unique digits
text = "abc123def456"
digits = {char for char in text if char.isdigit()}
print(digits)  # {'1', '2', '3', '4', '5', '6'}

# Unique words from text
text = "the quick brown fox jumps over the lazy dog"
words = {word for word in text.split()}
print(words)  # All unique words

# Vowels in text
text = "hello world"
vowels = {char for char in text.lower() if char in 'aeiou'}
print(vowels)  # {'e', 'o'}
```

## Working with Dictionaries

```python
# Extract unique keys
data = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 30}
]
ages = {person["age"] for person in data}
print(ages)  # {30, 25}

# Extract and transform
names_upper = {person["name"].upper() for person in data}
print(names_upper)  # {"ALICE", "BOB", "CHARLIE"}

# Filter and extract
adults = {person["name"] for person in data if person["age"] >= 30}
print(adults)  # {"Alice", "Charlie"}

# From dict keys/values
scores = {"Alice": 95, "Bob": 87, "Charlie": 95, "David": 92}
unique_scores = {score for score in scores.values()}
print(unique_scores)  # {95, 87, 92}

# Students with high scores
high_scorers = {name for name, score in scores.items() if score >= 90}
print(high_scorers)  # {"Alice", "Charlie", "David"}
```

## Mathematical Set Generation

```python
# Pythagorean triples (a² + b² = c²)
triples = {
    (a, b, c)
    for a in range(1, 20)
    for b in range(a, 20)
    for c in range(b, 20)
    if a**2 + b**2 == c**2
}
print(triples)  # {(3, 4, 5), (5, 12, 13), (6, 8, 10), ...}

# Perfect squares under 100
perfect_squares = {x**2 for x in range(1, 11)}
print(perfect_squares)  # {1, 4, 9, 16, 25, 36, 49, 64, 81, 100}

# Prime factors of a number
def prime_factors(n):
    return {
        i
        for i in range(2, n + 1)
        if n % i == 0 and all(i % j != 0 for j in range(2, i))
    }

print(prime_factors(60))  # {2, 3, 5}

# Divisors of a number
def divisors(n):
    return {i for i in range(1, n + 1) if n % i == 0}

print(divisors(28))  # {1, 2, 4, 7, 14, 28}

# Common divisors of two numbers
def common_divisors(a, b):
    return divisors(a) & divisors(b)

print(common_divisors(12, 18))  # {1, 2, 3, 6}
```

## Comprehension vs Loop Performance

```python
import time

# Generate large set
n = 100_000

# Using comprehension
start = time.time()
comp_set = {x**2 for x in range(n)}
comp_time = time.time() - start

# Using loop
start = time.time()
loop_set = set()
for x in range(n):
    loop_set.add(x**2)
loop_time = time.time() - start

print(f"Comprehension: {comp_time:.4f}s")
print(f"Loop: {loop_time:.4f}s")
print(f"Comprehension is {loop_time/comp_time:.2f}x faster")
# Comprehensions are typically faster

# Both produce same result
print(comp_set == loop_set)  # True
```

## Complex Transformations

```python
# Email domain extraction
emails = [
    "alice@gmail.com",
    "bob@yahoo.com",
    "charlie@gmail.com",
    "david@outlook.com"
]
domains = {email.split('@')[1] for email in emails}
print(domains)  # {"gmail.com", "yahoo.com", "outlook.com"}

# File extensions
files = ["doc.txt", "image.jpg", "script.py", "data.txt", "photo.jpg"]
extensions = {file.split('.')[-1] for file in files}
print(extensions)  # {"txt", "jpg", "py"}

# Parse URLs
urls = [
    "https://example.com/page1",
    "https://test.com/page2",
    "https://example.com/page3"
]
domains = {url.split('/')[2] for url in urls}
print(domains)  # {"example.com", "test.com"}

# Extract hashtags
posts = [
    "I love #Python programming",
    "Check out #Python and #JavaScript",
    "#Python is amazing"
]
hashtags = {
    word for post in posts
    for word in post.split()
    if word.startswith('#')
}
print(hashtags)  # {"#Python", "#JavaScript"}

# Clean hashtags (remove #)
clean_tags = {
    word[1:].lower() for post in posts
    for word in post.split()
    if word.startswith('#')
}
print(clean_tags)  # {"python", "javascript"}
```

## Filtering Patterns

```python
# Remove None values
data = [1, None, 2, None, 3, None, 4]
clean = {x for x in data if x is not None}
print(clean)  # {1, 2, 3, 4}

# Remove empty strings
strings = ["hello", "", "world", "", "python"]
non_empty = {s for s in strings if s}
print(non_empty)  # {"hello", "world", "python"}

# Filter by type
mixed = [1, "two", 3, "four", 5, 6.7, "eight"]
numbers_only = {x for x in mixed if isinstance(x, (int, float))}
print(numbers_only)  # {1, 3, 5, 6.7}

strings_only = {x for x in mixed if isinstance(x, str)}
print(strings_only)  # {"two", "four", "eight"}

# Filter by length
words = ["a", "ab", "abc", "abcd", "abcde"]
long_words = {word for word in words if len(word) >= 3}
print(long_words)  # {"abc", "abcd", "abcde"}

# Filter by multiple attributes
users = [
    {"name": "Alice", "age": 30, "active": True},
    {"name": "Bob", "age": 25, "active": False},
    {"name": "Charlie", "age": 35, "active": True},
    {"name": "David", "age": 28, "active": True}
]
active_adults = {
    user["name"] for user in users
    if user["active"] and user["age"] >= 30
}
print(active_adults)  # {"Alice", "Charlie"}
```

## When to Use Set Comprehensions

```python
# ✅ GOOD: Need unique results
numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5]
unique = {x * 2 for x in numbers}  # Set automatically removes duplicates

# ✅ GOOD: Membership testing
valid_ids = {x for x in range(1000, 2000)}
print(1500 in valid_ids)  # Fast O(1) lookup

# ✅ GOOD: Set operations later
even_nums = {x for x in range(20) if x % 2 == 0}
mult_of_3 = {x for x in range(20) if x % 3 == 0}
both = even_nums & mult_of_3

# ❌ AVOID: Need to preserve order
# Use list comprehension instead
ordered = [x for x in range(10)]  # Not {x for x in range(10)}

# ❌ AVOID: Need to preserve duplicates
# Use list comprehension
with_dupes = [x for x in [1, 1, 2, 2, 3]]  # Keeps duplicates

# ❌ AVOID: Need to index elements
# Use list comprehension
indexed = [x for x in range(10)]  # Can do indexed[5]
```

## Readability Guidelines

```python
# ✅ GOOD: Simple and clear
evens = {x for x in range(20) if x % 2 == 0}

# ✅ GOOD: One transformation
squares = {x**2 for x in range(10)}

# ⚠️ ACCEPTABLE: Two levels of nesting
matrix = [[1, 2], [3, 4], [5, 6]]
flat = {num for row in matrix for num in row}

# ❌ AVOID: Too complex
# This is hard to read - use regular loop instead
complex = {
    (x, y, z) for x in range(10) for y in range(10) for z in range(10)
    if x < y < z and x**2 + y**2 == z**2 and x % 2 == 0
}

# ✅ BETTER: Break into steps
def is_pythagorean_triple(x, y, z):
    return x < y < z and x**2 + y**2 == z**2 and x % 2 == 0

better = {
    (x, y, z)
    for x in range(10)
    for y in range(10)
    for z in range(10)
    if is_pythagorean_triple(x, y, z)
}
```

## Summary

**Basic Syntax:**
```python
{expression for item in iterable}
{expression for item in iterable if condition}
{expr_true if cond else expr_false for item in iterable}
```

**Benefits:**
- ✅ Concise and readable
- ✅ Automatic duplicate removal
- ✅ Faster than loops (typically)
- ✅ Pythonic style

**Use Cases:**
- Generate sets from ranges
- Filter and transform collections
- Extract unique values
- Create sets for membership testing

**Avoid When:**
- Order matters (use list)
- Need duplicates (use list)
- Need indexing (use list)
- Logic too complex (use loop)

**Best Practices:**
- Keep comprehensions simple
- Use descriptive variable names
- Break complex logic into functions
- Prefer readability over cleverness
- Use for unique collections only
