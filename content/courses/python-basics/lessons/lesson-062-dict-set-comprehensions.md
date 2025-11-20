---
id: "97-dict-set-comprehensions"
title: "Dictionary and Set Comprehensions"
chapterId: ch5-loops
order: 8
duration: 20
objectives:
  - Master dictionary comprehension syntax
  - Create sets with comprehensions
  - Transform dictionaries efficiently
  - Combine comprehensions with filtering
---

# Dictionary and Set Comprehensions

Beyond list comprehensions, Python offers dictionary and set comprehensions for creating dictionaries and sets concisely and efficiently.

## Dictionary Comprehension Basics

```python
# Syntax: {key_expr: value_expr for item in iterable}

# Create dictionary from lists
keys = ["a", "b", "c"]
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}
print(d)
# {'a': 1, 'b': 2, 'c': 3}

# Create squares dictionary
squares = {x: x**2 for x in range(6)}
print(squares)
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Map names to lengths
words = ["apple", "banana", "cherry"]
lengths = {word: len(word) for word in words}
print(lengths)
# {'apple': 5, 'banana': 6, 'cherry': 6}

# Create index mapping
fruits = ["apple", "banana", "cherry"]
indices = {fruit: i for i, fruit in enumerate(fruits)}
print(indices)
# {'apple': 0, 'banana': 1, 'cherry': 2}
```

## Transforming Dictionaries

```python
# Original dictionary
prices = {"apple": 1.0, "banana": 0.5, "cherry": 2.0}

# Apply 10% increase
increased = {item: price * 1.1 for item, price in prices.items()}
print(increased)
# {'apple': 1.1, 'banana': 0.55, 'cherry': 2.2}

# Swap keys and values
swapped = {v: k for k, v in prices.items()}
print(swapped)
# {1.0: 'apple', 0.5: 'banana', 2.0: 'cherry'}

# Convert keys to uppercase
upper_keys = {k.upper(): v for k, v in prices.items()}
print(upper_keys)
# {'APPLE': 1.0, 'BANANA': 0.5, 'CHERRY': 2.0}

# Round values
rounded = {k: round(v, 2) for k, v in increased.items()}
print(rounded)
# {'apple': 1.1, 'banana': 0.55, 'cherry': 2.2}
```

## Filtering Dictionaries

```python
# Syntax: {k: v for k, v in dict.items() if condition}

scores = {"Alice": 95, "Bob": 67, "Charlie": 88, "Diana": 72}

# Get passing scores (>= 70)
passing = {name: score for name, score in scores.items() if score >= 70}
print(passing)
# {'Alice': 95, 'Charlie': 88, 'Diana': 72}

# Get high achievers (>= 90)
high_achievers = {name: score for name, score in scores.items() if score >= 90}
print(high_achievers)
# {'Alice': 95}

# Filter by key
a_names = {name: score for name, score in scores.items() if name.startswith('A')}
print(a_names)
# {'Alice': 95}

# Filter by both key and value
criteria = {name: score for name, score in scores.items() 
            if len(name) <= 5 and score >= 80}
print(criteria)
# {'Alice': 95, 'Diana': 72}
```

## Conditional Values in Dictionary Comprehension

```python
# Apply different transformations based on condition
numbers = [1, 2, 3, 4, 5]
classified = {n: "even" if n % 2 == 0 else "odd" for n in numbers}
print(classified)
# {1: 'odd', 2: 'even', 3: 'odd', 4: 'even', 5: 'odd'}

# Grade assignment
scores = {"Alice": 95, "Bob": 67, "Charlie": 88}
grades = {name: "A" if score >= 90 else "B" if score >= 80 else "C" 
          for name, score in scores.items()}
print(grades)
# {'Alice': 'A', 'Bob': 'C', 'Charlie': 'B'}

# Price categories
prices = {"item1": 5, "item2": 15, "item3": 25}
categories = {item: "cheap" if price < 10 else "moderate" if price < 20 else "expensive"
              for item, price in prices.items()}
print(categories)
# {'item1': 'cheap', 'item2': 'moderate', 'item3': 'expensive'}
```

## Creating Dictionaries from Lists

```python
# Create frequency count
letters = ['a', 'b', 'a', 'c', 'b', 'a']
freq = {letter: letters.count(letter) for letter in set(letters)}
print(freq)
# {'a': 3, 'b': 2, 'c': 1}

# Better with Counter (more efficient)
from collections import Counter
freq_counter = Counter(letters)
print(dict(freq_counter))
# {'a': 3, 'b': 2, 'c': 1}

# Group by property
words = ["apple", "bat", "cherry", "avocado", "banana"]
by_first_letter = {word[0]: [w for w in words if w[0] == word[0]] 
                   for word in words}
print(by_first_letter)
# {'a': ['apple', 'avocado'], 'b': ['bat', 'banana'], 'c': ['cherry']}

# Create mapping from list of tuples
pairs = [('a', 1), ('b', 2), ('c', 3)]
mapping = {k: v for k, v in pairs}
print(mapping)
# {'a': 1, 'b': 2, 'c': 3}
```

## Nested Dictionary Comprehension

```python
# Create 2D dictionary (grid)
grid = {(x, y): x * y for x in range(1, 4) for y in range(1, 4)}
print(grid)
# {(1, 1): 1, (1, 2): 2, (1, 3): 3, (2, 1): 2, (2, 2): 4, (2, 3): 6, (3, 1): 3, (3, 2): 6, (3, 3): 9}

# Nested dictionaries
students = ["Alice", "Bob"]
subjects = ["Math", "Science"]
grades = {student: {subject: 0 for subject in subjects} for student in students}
print(grades)
# {'Alice': {'Math': 0, 'Science': 0}, 'Bob': {'Math': 0, 'Science': 0}}

# Multiplication table as nested dict
table = {i: {j: i*j for j in range(1, 6)} for i in range(1, 6)}
print(table[3])
# {1: 3, 2: 6, 3: 9, 4: 12, 5: 15}
```

## Set Comprehension Basics

```python
# Syntax: {expression for item in iterable}

# Create set of squares
squares = {x**2 for x in range(6)}
print(squares)
# {0, 1, 4, 9, 16, 25}

# Extract unique characters
text = "hello world"
unique_chars = {char for char in text if char != ' '}
print(unique_chars)
# {'h', 'e', 'l', 'o', 'w', 'r', 'd'}

# Get unique lengths
words = ["a", "ab", "abc", "bc", "c"]
lengths = {len(word) for word in words}
print(lengths)
# {1, 2, 3}

# Extract unique first letters
names = ["Alice", "Bob", "Anna", "Charlie", "Alex"]
first_letters = {name[0] for name in names}
print(first_letters)
# {'A', 'B', 'C'}
```

## Filtering Sets

```python
# Get even squares
evens = {x**2 for x in range(10) if x % 2 == 0}
print(evens)
# {0, 4, 16, 36, 64}

# Extract vowels
text = "The quick brown fox"
vowels = {char.lower() for char in text if char.lower() in 'aeiou'}
print(vowels)
# {'e', 'i', 'o', 'u'}

# Get unique positive numbers
numbers = [-5, 3, -2, 8, -1, 10, 3, 8]
positive_unique = {n for n in numbers if n > 0}
print(positive_unique)
# {3, 8, 10}

# Filter by multiple conditions
numbers = range(1, 21)
special = {n for n in numbers if n % 2 == 0 and n % 3 == 0}
print(special)
# {6, 12, 18}
```

## Set Operations with Comprehensions

```python
# Find common elements (intersection alternative)
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]

common = {x for x in list1 if x in list2}
print(common)
# {4, 5}

# Find unique to first list (difference alternative)
unique_to_first = {x for x in list1 if x not in list2}
print(unique_to_first)
# {1, 2, 3}

# Union of processed elements
set1 = {1, 2, 3}
set2 = {3, 4, 5}
doubled = {x * 2 for x in set1 | set2}
print(doubled)
# {2, 4, 6, 8, 10}
```

## Practical Examples

### Word Processing

```python
# Extract unique words (case-insensitive)
text = "The quick brown Fox jumps over the lazy Dog"
unique_words = {word.lower() for word in text.split()}
print(unique_words)
# {'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog'}

# Get words longer than 3 characters
long_words = {word.lower() for word in text.split() if len(word) > 3}
print(long_words)
# {'quick', 'brown', 'jumps', 'over', 'lazy'}

# Create word to length mapping
word_lengths = {word.lower(): len(word) for word in text.split()}
print(word_lengths)
# {'the': 3, 'quick': 5, 'brown': 5, 'fox': 3, 'jumps': 5, 'over': 4, 'lazy': 4, 'dog': 3}
```

### Data Transformation

```python
# Convert list of dicts to id-indexed dict
users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Charlie"}
]

by_id = {user["id"]: user for user in users}
print(by_id)
# {1: {'id': 1, 'name': 'Alice'}, 2: {'id': 2, 'name': 'Bob'}, 3: {'id': 3, 'name': 'Charlie'}}

# Extract specific fields
names_by_id = {user["id"]: user["name"] for user in users}
print(names_by_id)
# {1: 'Alice', 2: 'Bob', 3: 'Charlie'}

# Filter and transform
high_ids = {user["name"].upper(): user["id"] for user in users if user["id"] >= 2}
print(high_ids)
# {'BOB': 2, 'CHARLIE': 3}
```

### Configuration Processing

```python
# Merge settings with defaults
defaults = {"timeout": 30, "retries": 3, "debug": False}
user_settings = {"timeout": 60, "debug": True}

# Override defaults with user settings
config = {**defaults, **user_settings}
print(config)
# {'timeout': 60, 'retries': 3, 'debug': True}

# Using comprehension to filter None values
settings = {"host": "localhost", "port": 8080, "path": None, "debug": None}
active_settings = {k: v for k, v in settings.items() if v is not None}
print(active_settings)
# {'host': 'localhost', 'port': 8080}

# Convert string values to appropriate types
str_config = {"timeout": "30", "retries": "3", "debug": "True"}
typed_config = {
    k: int(v) if v.isdigit() else v == "True" if v in ["True", "False"] else v
    for k, v in str_config.items()
}
print(typed_config)
# {'timeout': 30, 'retries': 3, 'debug': True}
```

### Data Validation

```python
# Validate and collect errors
data = {"name": "", "age": -5, "email": "invalid"}

validators = {
    "name": lambda x: len(x) > 0,
    "age": lambda x: x > 0,
    "email": lambda x: "@" in x
}

errors = {field: f"{field} is invalid" 
          for field, validator in validators.items()
          if field in data and not validator(data[field])}

print(errors)
# {'name': 'name is invalid', 'age': 'age is invalid', 'email': 'email is invalid'}

# Collect valid fields only
valid_data = {k: v for k, v in data.items() 
              if k in validators and validators[k](v)}
print(valid_data)
# {}
```

## Performance Considerations

```python
import time

# Dictionary comprehension vs loop
n = 100000

# Using loop
start = time.time()
d1 = {}
for i in range(n):
    d1[i] = i ** 2
loop_time = time.time() - start

# Using comprehension
start = time.time()
d2 = {i: i ** 2 for i in range(n)}
comp_time = time.time() - start

print(f"Loop: {loop_time:.4f}s")
print(f"Comprehension: {comp_time:.4f}s")
print(f"Speedup: {loop_time/comp_time:.2f}x")

# Set comprehension vs loop
start = time.time()
s1 = set()
for i in range(n):
    s1.add(i ** 2)
loop_time = time.time() - start

start = time.time()
s2 = {i ** 2 for i in range(n)}
comp_time = time.time() - start

print(f"\nSet loop: {loop_time:.4f}s")
print(f"Set comprehension: {comp_time:.4f}s")
print(f"Speedup: {loop_time/comp_time:.2f}x")
```

## Common Pitfalls

```python
# Pitfall 1: Duplicate keys (last one wins)
numbers = [1, 2, 2, 3, 3, 3]
d = {n: n ** 2 for n in numbers}
print(d)
# {1: 1, 2: 4, 3: 9}  # Duplicates overwritten

# Pitfall 2: Can't have duplicate elements in set
squares = {x ** 2 for x in [-2, -1, 0, 1, 2]}
print(squares)
# {0, 1, 4}  # -2 and 2 both give 4

# Pitfall 3: Order not guaranteed (until Python 3.7+)
d = {i: i**2 for i in range(5)}
print(d)
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}  # Insertion order preserved in 3.7+

# Pitfall 4: Mutable default values
# Don't do this
# d = {k: [] for k in range(3)}  # Creates separate lists (OK)
# But be careful with modifications
```

## Best Practices

```python
# ✅ GOOD: Simple and clear
squares = {x: x**2 for x in range(10)}

# ✅ GOOD: Descriptive variable names
user_ages = {user["name"]: user["age"] for user in users}

# ✅ GOOD: Filter with meaningful condition
passing = {name: score for name, score in scores.items() if score >= 60}

# ❌ BAD: Too complex
result = {k: v * 2 if v > 10 else v * 3 if v > 5 else v
          for k, v in data.items()
          if k not in exclude and v is not None}

# ✅ BETTER: Use regular code for complex logic
result = {}
for k, v in data.items():
    if k in exclude or v is None:
        continue
    
    if v > 10:
        result[k] = v * 2
    elif v > 5:
        result[k] = v * 3
    else:
        result[k] = v
```

## Summary

**Dictionary Comprehension:**
```python
# Basic: {key: value for item in iterable}
# Filter: {k: v for k, v in dict.items() if condition}
# Transform: {k.upper(): v * 2 for k, v in dict.items()}
```

**Set Comprehension:**
```python
# Basic: {expression for item in iterable}
# Filter: {x for x in iterable if condition}
# Unique: {x**2 for x in numbers}  # Auto-deduplication
```

**Use Cases:**
- **Dictionary**: Transforming, filtering, creating mappings
- **Set**: Unique values, fast membership testing, math operations

**Advantages:**
- Concise and readable
- Generally faster than loops
- More Pythonic
- Built-in deduplication (sets)

**Best Practices:**
- Keep comprehensions simple
- Use descriptive variable names
- Prefer regular loops for complex logic
- Remember: dict keys and set elements must be unique

Master comprehensions for clean, efficient data transformations!
