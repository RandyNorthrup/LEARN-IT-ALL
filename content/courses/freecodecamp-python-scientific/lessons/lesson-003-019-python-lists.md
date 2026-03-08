---
id: lesson-003-019
title: Python Lists
chapterId: chapter-03
order: 19
duration: 5
objectives:
  - Create lists and access elements by index
  - Use slicing to extract sublists
  - Understand list mutability
  - Perform list operations with +, *, len(), and in
  - Work with nested lists
  - Compare lists and strings
---

# Python Lists

A **list** is an ordered, mutable collection of values. Lists are one of the most versatile data structures in Python, capable of holding items of any type — numbers, strings, or even other lists.

## Creating Lists

Lists are created with square brackets, with items separated by commas:

```python
numbers = [10, 20, 30, 40, 50]
fruits = ['apple', 'banana', 'cherry']
mixed = [42, 'hello', 3.14, True]
empty = []
```

## Indexing

Access individual elements using their **index** (starting from 0):

```python
fruits = ['apple', 'banana', 'cherry']
print(fruits[0])   # apple
print(fruits[2])   # cherry
print(fruits[-1])  # cherry (last element)
print(fruits[-2])  # banana (second to last)
```

Trying to access an index that doesn't exist raises an `IndexError`.

## Slicing

Extract a sublist using slice notation `[start:end]`. The start index is **included** and the end index is **excluded**:

```python
numbers = [10, 20, 30, 40, 50]
print(numbers[1:4])   # [20, 30, 40]
print(numbers[:3])    # [10, 20, 30]
print(numbers[2:])    # [30, 40, 50]
print(numbers[:])     # [10, 20, 30, 40, 50] (full copy)
```

## Mutability

Unlike strings, lists are **mutable** — you can change their elements after creation:

```python
fruits = ['apple', 'banana', 'cherry']
fruits[1] = 'blueberry'
print(fruits)  # ['apple', 'blueberry', 'cherry']
```

This is a key difference from strings, where trying to assign to an index raises a `TypeError`.

## The len() Function

Use `len()` to get the number of items in a list:

```python
colors = ['red', 'green', 'blue']
print(len(colors))  # 3
```

## List Operations

**Concatenation** with `+` joins two lists together:

```python
a = [1, 2, 3]
b = [4, 5, 6]
print(a + b)  # [1, 2, 3, 4, 5, 6]
```

**Repetition** with `*` repeats a list:

```python
print([0] * 4)      # [0, 0, 0, 0]
print(['hi'] * 3)   # ['hi', 'hi', 'hi']
```

## The in Operator

Check if a value exists in a list:

```python
fruits = ['apple', 'banana', 'cherry']
print('banana' in fruits)     # True
print('grape' in fruits)      # False
print('grape' not in fruits)  # True
```

## Nested Lists

A list can contain other lists, creating a multi-dimensional structure:

```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matrix[0])      # [1, 2, 3]
print(matrix[1][2])   # 6
```

## Lists vs Strings

Both lists and strings are sequences, but there are important differences:

| Feature | String | List |
|---------|--------|------|
| Mutable | No | Yes |
| Elements | Characters only | Any type |
| Syntax | `'hello'` | `['h', 'e', 'l', 'l', 'o']` |

You can convert between them: `list('hello')` gives `['h', 'e', 'l', 'l', 'o']`.

## Key Takeaways

- Lists are **ordered** and **mutable** sequences
- Indexing starts at 0; negative indices count from the end
- Slicing creates a new list from a range of elements
- Use `+` for concatenation, `*` for repetition, `in` for membership
- Lists can hold any type of value, including other lists

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
