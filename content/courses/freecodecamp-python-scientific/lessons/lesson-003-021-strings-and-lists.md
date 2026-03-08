---
id: lesson-003-021
title: Strings and Lists
chapterId: chapter-03
order: 21
duration: 5
objectives:
  - Convert strings to lists using split()
  - Join list elements into strings using join()
  - Parse text data by splitting on delimiters
  - Process CSV-like data with split()
  - Build strings from lists efficiently
---

# Strings and Lists

Strings and lists are closely related in Python. You frequently need to convert between the two — splitting a string into a list of words, or joining a list back into a string. Python provides elegant methods for both directions.

## Splitting Strings with split()

The `split()` method breaks a string into a list of substrings. By default, it splits on any whitespace (spaces, tabs, newlines):

```python
sentence = 'The quick brown fox'
words = sentence.split()
print(words)   # ['The', 'quick', 'brown', 'fox']
print(len(words))  # 4
```

You can specify a delimiter to split on:

```python
date = '2025-03-15'
parts = date.split('-')
print(parts)   # ['2025', '03', '15']

csv_line = 'Alice,25,Engineer'
fields = csv_line.split(',')
print(fields)  # ['Alice', '25', 'Engineer']
```

## Joining Lists with join()

The `join()` method is the inverse of `split()`. It's called on the **separator string** and takes a list as its argument:

```python
words = ['The', 'quick', 'brown', 'fox']
sentence = ' '.join(words)
print(sentence)  # 'The quick brown fox'

parts = ['2025', '03', '15']
date = '-'.join(parts)
print(date)      # '2025-03-15'
```

You can join with any separator, including an empty string:

```python
letters = ['H', 'e', 'l', 'l', 'o']
word = ''.join(letters)
print(word)  # 'Hello'
```

## Parsing Text Data

Splitting is invaluable for parsing structured text. Consider processing email headers from a file:

```python
line = 'From stephen.marquard@uct.ac.za Sat Jan  5 09:14:16 2008'
words = line.split()
email = words[1]
print(email)  # stephen.marquard@uct.ac.za

# Extract the domain
domain = email.split('@')[1]
print(domain)  # uct.ac.za
```

This technique of **double splitting** — splitting a line first, then splitting a piece of the result — is a powerful parsing pattern.

## CSV-Like Processing

Many data files use comma-separated or tab-separated values. You can process them by splitting on the appropriate delimiter:

```python
data = """name,age,city
Alice,30,New York
Bob,25,London
Charlie,35,Tokyo"""

lines = data.strip().split('\n')
headers = lines[0].split(',')

for line in lines[1:]:
    fields = line.split(',')
    record = dict(zip(headers, fields))
    print(record)
# {'name': 'Alice', 'age': '30', 'city': 'New York'}
# {'name': 'Bob', 'age': '25', 'city': 'London'}
# ...
```

## List of Characters from a String

The `list()` function converts a string into a list of individual characters:

```python
word = 'Python'
chars = list(word)
print(chars)  # ['P', 'y', 't', 'h', 'o', 'n']
```

This is useful when you need to modify individual characters, since strings are immutable but lists are not:

```python
chars = list('hello')
chars[0] = 'H'
result = ''.join(chars)
print(result)  # 'Hello'
```

## Building Strings from Lists

When you need to construct a string piece by piece, it's more efficient to build a list and join it at the end rather than concatenating strings repeatedly:

```python
# Efficient approach
parts = []
for i in range(5):
    parts.append(str(i * 10))
result = ', '.join(parts)
print(result)  # '0, 10, 20, 30, 40'
```

This is faster because string concatenation creates a new string each time, while `append()` modifies the list in place.

## Key Takeaways

- `split()` converts a string into a list; `join()` converts a list into a string
- Default `split()` splits on whitespace; pass a delimiter for other separators
- **Double splitting** is a powerful technique for parsing structured text
- Use `list()` to get individual characters; use `''.join()` to reassemble
- Build strings from lists with `join()` rather than repeated concatenation

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
