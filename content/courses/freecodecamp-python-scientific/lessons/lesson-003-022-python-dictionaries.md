---
id: lesson-003-022
title: Python Dictionaries
chapterId: chapter-03
order: 22
duration: 5
objectives:
  - Understand dictionaries as key-value pair collections
  - Create dictionaries and access values by key
  - Add, update, and delete dictionary entries
  - Use common dict methods: keys(), values(), items()
  - Compare dictionaries and lists
---

# Python Dictionaries

A **dictionary** is an unordered collection of **key-value pairs**. While lists use integer indices to access elements, dictionaries use **keys** — which can be strings, numbers, or any immutable type. Dictionaries are one of Python's most powerful and commonly used data structures.

## Creating Dictionaries

Create a dictionary with curly braces `{}`, using colons to separate keys from values:

```python
student = {'name': 'Alice', 'age': 25, 'grade': 'A'}
print(student)
# {'name': 'Alice', 'age': 25, 'grade': 'A'}

# Empty dictionary
empty = {}
also_empty = dict()
```

## Accessing Values

Use square brackets with the key to access a value:

```python
student = {'name': 'Alice', 'age': 25, 'grade': 'A'}
print(student['name'])   # Alice
print(student['age'])    # 25
```

If the key doesn't exist, Python raises a `KeyError`. To avoid this, use the `.get()` method, which returns `None` (or a default value) if the key is missing:

```python
print(student.get('name'))        # Alice
print(student.get('email'))       # None
print(student.get('email', 'N/A'))  # N/A
```

## Adding and Updating Entries

Assign a value to a new key to add it, or to an existing key to update it:

```python
student = {'name': 'Alice', 'age': 25}

# Add a new key
student['email'] = 'alice@example.com'

# Update an existing key
student['age'] = 26

print(student)
# {'name': 'Alice', 'age': 26, 'email': 'alice@example.com'}
```

## Deleting Entries

Use the `del` statement or the `.pop()` method:

```python
student = {'name': 'Alice', 'age': 25, 'grade': 'A'}

del student['grade']
print(student)  # {'name': 'Alice', 'age': 25}

age = student.pop('age')
print(age)      # 25
print(student)  # {'name': 'Alice'}
```

## Checking for Keys

Use the `in` operator to check if a key exists:

```python
student = {'name': 'Alice', 'age': 25}
print('name' in student)    # True
print('email' in student)   # False
```

Note that `in` checks **keys**, not values.

## Common Dictionary Methods

**`.keys()`** returns all keys:

```python
student = {'name': 'Alice', 'age': 25, 'grade': 'A'}
print(list(student.keys()))    # ['name', 'age', 'grade']
```

**`.values()`** returns all values:

```python
print(list(student.values()))  # ['Alice', 25, 'A']
```

**`.items()`** returns all key-value pairs as tuples:

```python
print(list(student.items()))
# [('name', 'Alice'), ('age', 25), ('grade', 'A')]
```

## The len() Function

`len()` returns the number of key-value pairs:

```python
student = {'name': 'Alice', 'age': 25, 'grade': 'A'}
print(len(student))  # 3
```

## Dictionaries vs Lists

| Feature | List | Dictionary |
|---------|------|------------|
| Access by | Integer index | Key (any immutable type) |
| Ordered | Yes (insertion order) | Yes (Python 3.7+) |
| Mutable | Yes | Yes |
| Syntax | `[1, 2, 3]` | `{'a': 1, 'b': 2}` |
| Best for | Ordered sequences | Labeled data / lookups |

Lists are ideal when you have an ordered sequence of similar items. Dictionaries are ideal when you want to look up values by a meaningful label.

## Key Takeaways

- Dictionaries store **key-value pairs** enclosed in `{}`
- Access values with `d[key]` or safely with `d.get(key, default)`
- Add/update by assigning to a key; delete with `del` or `.pop()`
- Use `in` to check for key existence
- `.keys()`, `.values()`, and `.items()` give you views of the dictionary contents

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
