---
id: lesson-003-018
title: Files as a Sequence
chapterId: chapter-03
order: 18
duration: 5
objectives:
  - Iterate over file lines using a for loop
  - Strip newline characters from file input
  - Count lines and words in a file
  - Search for patterns within files
  - Combine file reading with string methods
---

# Files as a Sequence

One of Python's most elegant features is that an open file handle acts as a **sequence** — you can iterate over its lines directly using a `for` loop, just like you would with a list.

## Iterating Over File Lines

When you open a file and use it in a `for` loop, Python reads one line at a time. This is memory-efficient because the entire file is never loaded into memory at once:

```python
fhand = open('mbox-short.txt')
for line in fhand:
    print(line)
```

Each `line` includes the **newline character** (`\n`) at the end. Since `print()` also adds a newline, you'll see blank lines between each line of output.

## Stripping Newlines

Use the `.rstrip()` method to remove trailing whitespace (including `\n`):

```python
fhand = open('mbox-short.txt')
for line in fhand:
    line = line.rstrip()
    print(line)
```

You can also use `.strip()` to remove whitespace from both ends of the line.

## Counting Lines in a File

Since each iteration gives you one line, counting lines is straightforward:

```python
fhand = open('mbox-short.txt')
count = 0
for line in fhand:
    count += 1
print('Line count:', count)
```

## Counting Words in a File

Combine line iteration with `.split()` to count all words:

```python
fhand = open('mbox-short.txt')
word_count = 0
for line in fhand:
    words = line.split()
    word_count += len(words)
print('Word count:', word_count)
```

## Searching for Patterns

A common pattern is reading a file and only processing lines that match a condition. Use `.startswith()`, `in`, or other string methods to filter lines:

```python
fhand = open('mbox-short.txt')
for line in fhand:
    line = line.rstrip()
    if line.startswith('From:'):
        print(line)
```

You can also skip lines that don't match using `continue`:

```python
fhand = open('mbox-short.txt')
for line in fhand:
    line = line.rstrip()
    if not line.startswith('From:'):
        continue
    print(line)
```

## Combining File Reading with String Methods

You can chain multiple string operations to extract specific data from each line:

```python
fhand = open('mbox-short.txt')
for line in fhand:
    line = line.rstrip()
    if not line.startswith('From '):
        continue
    words = line.split()
    email = words[1]
    print(email)
```

This pattern — open a file, loop through lines, filter with conditions, extract data with string methods — is one of the most common workflows in Python programming.

## Reading the Entire File

If the file is small enough, you can read the entire contents as a single string:

```python
fhand = open('mbox-short.txt')
content = fhand.read()
print(len(content))   # number of characters
print(content[:50])   # first 50 characters
```

The `.read()` method returns one large string including all newlines, while iterating in a `for` loop gives you one line at a time.

## Key Takeaways

- A file handle is a **sequence** — you can iterate over it with `for`
- Each line includes a trailing `\n`; use `.rstrip()` to remove it
- Combine `for` loops with string methods to search and extract data
- Use `.read()` only for small files; line-by-line iteration is memory-efficient
- The pattern of **open → iterate → filter → extract** is foundational in Python

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
