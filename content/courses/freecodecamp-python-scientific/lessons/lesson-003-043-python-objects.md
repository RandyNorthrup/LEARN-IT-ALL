---
id: lesson-003-043
title: Python Objects
chapterId: chapter-03
order: 43
duration: 5
objectives:
  - Understand that everything in Python is an object
  - Use dir() and type() to inspect objects
  - Explore built-in object methods and attributes
  - Explain why object-oriented programming matters
---

# Python Objects

Object-oriented programming (OOP) is one of the most important concepts in Python. Before we create our own classes, we need to understand what objects are and realize that we have been using them all along.

## Everything in Python Is an Object

In Python, **everything is an object** — integers, strings, lists, functions, even modules. Every value you create has a type, an identity, and associated methods.

```python
x = 42
print(type(x))      # <class 'int'>

s = "hello"
print(type(s))      # <class 'str'>

nums = [1, 2, 3]
print(type(nums))   # <class 'list'>

def greet():
    pass
print(type(greet))  # <class 'function'>
```

When you call `"hello".upper()`, you are calling the `upper()` **method** on a string **object**. The dot notation (`object.method()`) is how you interact with objects.

## What Is an Object?

An object bundles two things together:

1. **Data** (attributes) — The information the object holds
2. **Behavior** (methods) — The actions the object can perform

Think of a string object. Its **data** is the sequence of characters (`"hello"`). Its **behavior** includes methods like `.upper()`, `.split()`, `.replace()`, and `.count()`.

```python
message = "Hello, World!"

# Data: the characters
print(len(message))         # 13

# Behavior: methods that operate on the data
print(message.upper())       # HELLO, WORLD!
print(message.lower())       # hello, world!
print(message.split(','))    # ['Hello', ' World!']
print(message.count('l'))    # 3
```

## Inspecting Objects with `type()` and `dir()`

### `type()` — What Kind of Object Is This?

```python
print(type(42))          # <class 'int'>
print(type(3.14))        # <class 'float'>
print(type(True))        # <class 'bool'>
print(type([1, 2]))      # <class 'list'>
print(type({'a': 1}))    # <class 'dict'>
```

The `type()` function tells you which **class** was used to create the object. Every type in Python is a class.

### `dir()` — What Can This Object Do?

```python
x = "hello"
print(dir(x))
```

This outputs all the attributes and methods available on the string object. You will see methods like `capitalize`, `count`, `find`, `join`, `replace`, `split`, `strip`, `upper`, and many more.

Methods starting with `__` (double underscores) are **special methods** (also called "dunder" methods). They power Python's built-in behavior:

```python
print(dir(42))
# Includes __add__, __mul__, __str__, __eq__, etc.

# When you write 3 + 5, Python actually calls:
print((3).__add__(5))  # 8

# When you write str(42), Python calls:
print((42).__str__())  # '42'
```

## Understanding `self`

When you call a method on an object, Python automatically passes the object itself as the first argument. This is the concept of **self**:

```python
# When you write:
"hello".upper()

# Python internally does something like:
str.upper("hello")
```

The string `"hello"` is passed as `self` to the `upper()` method. This is why, when we define our own classes, every method takes `self` as its first parameter — it refers to the specific object the method is being called on.

## Built-in Object Methods

Let's explore some common methods across different object types:

```python
# List methods
nums = [3, 1, 4, 1, 5]
nums.append(9)       # Add to end
nums.sort()          # Sort in place
nums.reverse()       # Reverse in place
print(nums.count(1)) # Count occurrences: 2

# Dictionary methods
person = {'name': 'Alice', 'age': 30}
print(person.keys())    # dict_keys(['name', 'age'])
print(person.values())  # dict_values(['Alice', 30])
print(person.items())   # dict_items([('name', 'Alice'), ...])
person.get('email', 'N/A')  # Safe access with default

# String methods
text = "  Hello, World!  "
print(text.strip())       # Remove whitespace
print(text.startswith('H'))  # False (leading spaces)
print(text.strip().startswith('H'))  # True
```

## The `id()` Function

Every object has a unique identity that you can view with `id()`:

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(id(a))  # e.g., 140234866534400
print(id(b))  # Different number (different object)
print(id(c))  # Same as id(a) (same object)

print(a is c)  # True  - same object
print(a is b)  # False - different objects with same value
print(a == b)  # True  - equal values
```

## Why OOP Matters

Object-oriented programming helps you:

1. **Organize code** — Group related data and functions together
2. **Model real things** — Objects naturally represent entities (users, products, connections)
3. **Reuse code** — Build on existing classes through inheritance
4. **Manage complexity** — Hide internal details behind simple interfaces

You have been using objects since your first line of Python. Now it is time to learn how to create your own.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
