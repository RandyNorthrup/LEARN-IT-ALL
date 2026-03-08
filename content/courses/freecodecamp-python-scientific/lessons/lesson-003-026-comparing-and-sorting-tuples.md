---
id: lesson-003-026
title: Comparing and Sorting Tuples
chapterId: chapter-03
order: 26
duration: 5
objectives:
  - Compare tuples element by element
  - Sort lists of tuples
  - Use sorted() with the key parameter
  - Write lambda functions for custom sorting
  - Apply the DSU (Decorate-Sort-Undecorate) pattern
---

# Comparing and Sorting Tuples

Tuples support comparison operators, which makes them incredibly useful for sorting complex data. Python compares tuples **element by element**, and this behavior unlocks powerful sorting patterns.

## Tuple Comparison

Python compares tuples by examining elements left to right. It compares the first elements; if they are equal, it moves to the second, and so on:

```python
print((0, 1, 2) < (0, 3, 4))       # True  (compare second: 1 < 3)
print((0, 1, 200) < (0, 3, 4))     # True  (1 < 3, third element ignored)
print(('Jones', 'Sally') < ('Jones', 'Sam'))  # True ('Sally' < 'Sam')
print(('Jones', 'Sally') > ('Adams', 'Sam'))  # True ('J' > 'A')
```

This element-by-element comparison is called **lexicographic ordering** — the same way words are ordered in a dictionary.

## Sorting Lists of Tuples

When you sort a list of tuples, Python uses this lexicographic comparison:

```python
students = [('Charlie', 85), ('Alice', 92), ('Bob', 78)]
students.sort()
print(students)
# [('Alice', 92), ('Bob', 78), ('Charlie', 85)]
```

The list is sorted by the first element (name) by default. If first elements are equal, Python compares the second element, and so on.

## Sorting with the key Parameter

The `sorted()` function (and `.sort()` method) accept a `key` parameter — a function that extracts the comparison value from each element:

```python
students = [('Charlie', 85), ('Alice', 92), ('Bob', 78)]

# Sort by grade (second element)
by_grade = sorted(students, key=lambda s: s[1])
print(by_grade)
# [('Bob', 78), ('Charlie', 85), ('Alice', 92)]

# Sort by grade descending
by_grade_desc = sorted(students, key=lambda s: s[1], reverse=True)
print(by_grade_desc)
# [('Alice', 92), ('Charlie', 85), ('Bob', 78)]
```

## Lambda Functions

A **lambda** is a small anonymous function defined in a single expression. It's commonly used with `sorted()`:

```python
# Named function equivalent
def get_grade(student):
    return student[1]

# Lambda equivalent
get_grade = lambda student: student[1]
```

Lambdas are ideal when you need a simple function for a single use:

```python
words = ['banana', 'pie', 'Washington', 'book']
by_length = sorted(words, key=lambda w: len(w))
print(by_length)  # ['pie', 'book', 'banana', 'Washington']
```

## The DSU Pattern (Decorate-Sort-Undecorate)

The **DSU pattern** is a classic technique for sorting data by a computed value. It has three steps:

1. **Decorate**: Create a list of tuples with the sort key first, followed by the original data
2. **Sort**: Sort the list of tuples (Python sorts by the first element)
3. **Undecorate**: Extract the original data in the new order

```python
# Sort words by frequency
text = 'the quick brown fox jumps over the lazy dog the fox'
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1

# Step 1: Decorate — create (count, word) tuples
decorated = []
for word, count in counts.items():
    decorated.append((count, word))

# Step 2: Sort — sorts by count first, then word
decorated.sort(reverse=True)

# Step 3: Undecorate — extract the results
for count, word in decorated:
    print(f'{word}: {count}')
# the: 3
# fox: 2
# quick: 1
# ...
```

## Compact DSU with List Comprehension

You can write the DSU pattern more concisely:

```python
counts = {'the': 3, 'fox': 2, 'quick': 1, 'brown': 1}

# All three steps in two lines
sorted_pairs = sorted([(v, k) for k, v in counts.items()], reverse=True)
for count, word in sorted_pairs:
    print(f'{word}: {count}')
```

## Sorting Dictionary by Value

The DSU pattern is the standard way to sort a dictionary by its values:

```python
scores = {'alice': 92, 'bob': 78, 'charlie': 85}

# Top-down leaderboard
for score, name in sorted([(v, k) for k, v in scores.items()], reverse=True):
    print(f'{name}: {score}')
# alice: 92
# charlie: 85
# bob: 78
```

## Key Takeaways

- Tuples are compared **element by element** (lexicographic order)
- `sorted()` with `key=` lets you sort by any computed property
- **Lambda functions** are concise anonymous functions perfect for sort keys
- The **DSU pattern** (Decorate-Sort-Undecorate) sorts data by a derived value
- DSU is the standard technique for sorting dictionaries by value

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
