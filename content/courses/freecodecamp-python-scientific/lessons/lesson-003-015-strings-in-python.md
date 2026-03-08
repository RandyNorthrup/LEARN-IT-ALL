---
id: lesson-003-015
title: Strings in Python
chapterId: chapter-03
order: 15
duration: 15
objectives:
  - Access characters in strings using positive and negative indexing
  - Extract substrings with slicing syntax
  - Understand string immutability
  - Use escape characters and multi-line strings
---

# Strings in Python

## Strings Are Sequences

A string in Python is a **sequence of characters**. Each character has a position (index) starting from **0**:

```python
word = "Python"
# Index: 0  1  2  3  4  5
#        P  y  t  h  o  n

print(word[0])    # P
print(word[1])    # y
print(word[5])    # n
```

Trying to access an index beyond the string's length raises an `IndexError`:

```python
# word[6]   # IndexError: string index out of range
```

## Negative Indexing

Negative indices count backwards from the end of the string. `-1` is the last character:

```python
word = "Python"
# Index: -6 -5 -4 -3 -2 -1
#         P   y  t  h  o  n

print(word[-1])    # n (last character)
print(word[-2])    # o
print(word[-6])    # P (first character)
```

Negative indexing is especially useful when you want the last few characters without knowing the string's length.

## Slicing

Slicing extracts a **substring** using the syntax `string[start:stop:step]`:

- `start`: the beginning index (included)
- `stop`: the ending index (**excluded**)
- `step`: how many characters to skip (optional, default is 1)

```python
text = "Hello, World!"

print(text[0:5])     # Hello
print(text[7:12])    # World
print(text[:5])      # Hello   (start defaults to 0)
print(text[7:])      # World!  (stop defaults to end)
print(text[:])       # Hello, World!  (full copy)
```

### Step Parameter

```python
text = "abcdefghij"

print(text[::2])     # acegi    (every other character)
print(text[1::2])    # bdfhj    (every other, starting from index 1)
print(text[::-1])    # jihgfedcba  (reverse the string)
```

Reversing a string with `[::-1]` is a very common Python idiom.

## The `len()` Function

`len()` returns the number of characters in a string:

```python
message = "Hello, World!"
print(len(message))    # 13 (spaces and punctuation count)

empty = ""
print(len(empty))      # 0
```

You can combine `len()` with indexing to get the last character:

```python
last = message[len(message) - 1]   # '!'
# But negative indexing is easier:
last = message[-1]                  # '!'
```

## String Immutability

Strings in Python are **immutable** — once created, they cannot be changed. You cannot modify a character in place:

```python
word = "Hello"
# word[0] = "J"    # TypeError: 'str' object does not support item assignment

# Instead, create a new string:
new_word = "J" + word[1:]
print(new_word)    # Jello
```

All string operations that seem to "modify" a string actually create and return a **new** string.

## Escape Characters

Escape characters let you include special characters in strings:

| Escape | Meaning |
|--------|----------|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Backslash |
| `\'` | Single quote |
| `\"` | Double quote |

```python
print("Line 1\nLine 2")
# Line 1
# Line 2

print("Name:\tAlice")
# Name:   Alice

print("She said \"hello\"")
# She said "hello"
```

## Multi-Line Strings

Triple quotes (`"""` or `'''`) create strings that span multiple lines:

```python
poem = """Roses are red,
Violets are blue,
Python is great,
And so are you."""

print(poem)
```

Multi-line strings are also used as docstrings for functions and modules.

```python
# Looping through characters in a string
word = "banana"
for char in word:
    print(char, end="-")
# Output: b-a-n-a-n-a-
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
