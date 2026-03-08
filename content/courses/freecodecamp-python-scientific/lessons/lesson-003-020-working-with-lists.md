---
id: lesson-003-020
title: Working with Lists
chapterId: chapter-03
order: 20
duration: 5
objectives:
  - Use list methods: append(), insert(), pop(), remove(), sort(), reverse()
  - Find elements with index() and count()
  - Modify lists with slicing and the del statement
  - Understand aliasing vs copying
---

# Working with Lists

Python lists come with a rich set of built-in methods that let you add, remove, reorder, and search for elements. Understanding these methods is essential for effective Python programming.

## Adding Elements

**`append()`** adds a single element to the end of a list:

```python
fruits = ['apple', 'banana']
fruits.append('cherry')
print(fruits)  # ['apple', 'banana', 'cherry']
```

**`insert()`** adds an element at a specific index, shifting everything after it:

```python
fruits = ['apple', 'cherry']
fruits.insert(1, 'banana')
print(fruits)  # ['apple', 'banana', 'cherry']
```

## Removing Elements

**`pop()`** removes and returns the element at a given index (default: last element):

```python
fruits = ['apple', 'banana', 'cherry']
last = fruits.pop()
print(last)    # cherry
print(fruits)  # ['apple', 'banana']

first = fruits.pop(0)
print(first)   # apple
```

**`remove()`** removes the first occurrence of a specific value:

```python
colors = ['red', 'green', 'blue', 'green']
colors.remove('green')
print(colors)  # ['red', 'blue', 'green']
```

If the value is not found, `remove()` raises a `ValueError`.

## The del Statement

Use `del` to delete an element by index or a slice of elements:

```python
numbers = [10, 20, 30, 40, 50]
del numbers[1]
print(numbers)  # [10, 30, 40, 50]

del numbers[1:3]
print(numbers)  # [10, 50]
```

## Sorting and Reversing

**`sort()`** sorts the list in place (modifies the original list):

```python
numbers = [64, 25, 12, 22, 11]
numbers.sort()
print(numbers)  # [11, 12, 22, 25, 64]

words = ['banana', 'apple', 'cherry']
words.sort()
print(words)    # ['apple', 'banana', 'cherry']
```

**`reverse()`** reverses the list in place:

```python
numbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)  # [5, 4, 3, 2, 1]
```

You can sort in descending order by combining both, or using the `reverse` parameter:

```python
numbers = [64, 25, 12, 22, 11]
numbers.sort(reverse=True)
print(numbers)  # [64, 25, 22, 12, 11]
```

## Searching in Lists

**`index()`** returns the index of the first occurrence of a value:

```python
fruits = ['apple', 'banana', 'cherry', 'banana']
print(fruits.index('banana'))  # 1
```

**`count()`** returns how many times a value appears:

```python
nums = [1, 2, 2, 3, 2, 4]
print(nums.count(2))  # 3
```

## Modifying with Slicing

You can replace a range of elements using slice assignment:

```python
letters = ['a', 'b', 'c', 'd', 'e']
letters[1:3] = ['x', 'y', 'z']
print(letters)  # ['a', 'x', 'y', 'z', 'd', 'e']
```

## Aliasing vs Copying

When you assign a list to a new variable, both variables point to the **same** list in memory. This is called **aliasing**:

```python
a = [1, 2, 3]
b = a          # b is an alias for a
b[0] = 99
print(a)       # [99, 2, 3] — a is also changed!
```

To create an independent copy, use slicing or the `.copy()` method:

```python
a = [1, 2, 3]
b = a[:]       # b is a copy
c = a.copy()   # also a copy

b[0] = 99
print(a)       # [1, 2, 3] — a is unchanged
```

## Key Takeaways

- `append()` and `insert()` add elements; `pop()`, `remove()`, and `del` remove them
- `sort()` and `reverse()` modify the list in place
- `index()` finds an element's position; `count()` tallies occurrences
- Assigning a list to a new variable creates an **alias**, not a copy
- Use `[:]` or `.copy()` to make an independent copy

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
