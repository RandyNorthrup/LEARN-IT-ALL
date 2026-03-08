---
id: lesson-003-025
title: The Tuples Collection
chapterId: chapter-03
order: 25
duration: 5
objectives:
  - Create tuples and access elements by index
  - Understand tuple immutability
  - Create single-element tuples correctly
  - Use tuple packing and unpacking
  - Apply multiple assignment with tuples
  - Use tuples as dictionary keys
  - Choose between tuples and lists
---

# The Tuples Collection

A **tuple** is an ordered, **immutable** sequence. Tuples look like lists but use parentheses instead of square brackets, and their contents cannot be changed after creation. This immutability makes tuples useful in situations where you need a fixed collection of values.

## Creating Tuples

Tuples are created with parentheses (or even just commas):

```python
point = (3, 5)
colors = ('red', 'green', 'blue')
mixed = (42, 'hello', 3.14)
```

You can also create tuples without parentheses — the commas define the tuple:

```python
t = 1, 2, 3
print(type(t))  # <class 'tuple'>
```

## Indexing and Slicing

Access tuple elements the same way as lists:

```python
colors = ('red', 'green', 'blue', 'yellow')
print(colors[0])     # red
print(colors[-1])    # yellow
print(colors[1:3])   # ('green', 'blue')
print(len(colors))   # 4
```

## Immutability

The defining feature of tuples is that they **cannot be modified** after creation:

```python
t = (1, 2, 3)
t[0] = 99  # TypeError: 'tuple' object does not support item assignment
```

You cannot append to, remove from, or sort a tuple in place. However, you can create a new tuple from existing ones:

```python
a = (1, 2, 3)
b = (4, 5, 6)
c = a + b
print(c)  # (1, 2, 3, 4, 5, 6)
```

## Single-Element Tuples

Creating a tuple with one element requires a trailing comma. Without it, Python treats the parentheses as grouping:

```python
not_a_tuple = (5)
print(type(not_a_tuple))  # <class 'int'>

is_a_tuple = (5,)
print(type(is_a_tuple))   # <class 'tuple'>
```

## Tuple Packing and Unpacking

**Packing** is when you assign multiple values to a single tuple variable:

```python
coordinates = 40.7128, -74.0060  # packing
```

**Unpacking** is when you assign a tuple's values to individual variables:

```python
lat, lon = coordinates  # unpacking
print(lat)   # 40.7128
print(lon)   # -74.006
```

The number of variables on the left must match the number of elements in the tuple.

## Multiple Assignment

Tuple unpacking enables elegant multiple assignment and variable swapping:

```python
# Multiple assignment
x, y, z = 10, 20, 30

# Swap two variables without a temp variable
a = 'hello'
b = 'world'
a, b = b, a
print(a)  # world
print(b)  # hello
```

## Tuples with .items()

When you iterate over a dictionary's `.items()`, each pair is actually a tuple:

```python
scores = {'math': 92, 'science': 88}
for item in scores.items():
    print(item)
    # ('math', 92)
    # ('science', 88)

# Unpacking in the loop
for subject, score in scores.items():
    print(f'{subject}: {score}')
```

## Tuples as Dictionary Keys

Because tuples are immutable, they can be used as dictionary keys (lists cannot):

```python
# Map (x, y) coordinates to location names
locations = {
    (40.7128, -74.0060): 'New York',
    (51.5074, -0.1278): 'London',
    (35.6762, 139.6503): 'Tokyo'
}

print(locations[(40.7128, -74.0060)])  # New York
```

## When to Use Tuples vs Lists

| Use Tuples When... | Use Lists When... |
|---------------------|---------------------|
| Data shouldn't change | Data needs modification |
| Used as dictionary keys | Order matters, items added/removed |
| Returning multiple values from a function | Storing a collection of similar items |
| Slightly better performance needed | You need sort(), append(), etc. |

## Key Takeaways

- Tuples are **ordered** and **immutable** sequences using `()` or commas
- Single-element tuples require a trailing comma: `(5,)`
- Tuple unpacking assigns elements to separate variables: `x, y = (1, 2)`
- Tuples can serve as **dictionary keys** because they are immutable
- Use tuples for fixed data; use lists when you need to modify the collection

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
