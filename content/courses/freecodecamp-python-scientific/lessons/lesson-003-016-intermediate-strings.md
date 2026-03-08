---
id: lesson-003-016
title: Intermediate Strings
chapterId: chapter-03
order: 16
duration: 15
objectives:
  - Apply common string methods for searching and transforming text
  - Split strings into lists and join lists into strings
  - Use the 'in' operator to check for substrings
  - Format strings with f-strings and the .format() method
---

# Intermediate Strings

## String Methods

Strings come with dozens of built-in **methods** — functions that are called on the string itself using dot notation. Since strings are immutable, every method returns a **new** string without modifying the original.

### Case Methods

```python
message = "Hello, World!"

print(message.upper())    # HELLO, WORLD!
print(message.lower())    # hello, world!
print(message.title())    # Hello, World!
print(message.swapcase()) # hELLO, wORLD!

# The original is unchanged
print(message)            # Hello, World!
```

### Whitespace Methods

```python
raw = "   Hello, World!   "

print(raw.strip())       # "Hello, World!"  (removes both sides)
print(raw.lstrip())      # "Hello, World!   " (left only)
print(raw.rstrip())      # "   Hello, World!" (right only)
```

`strip()` is essential when processing user input or file data, which often has trailing whitespace or newlines.

### Searching Methods

```python
text = "Python programming is fun"

# find() returns the index of the first occurrence, or -1 if not found
print(text.find("program"))      # 7
print(text.find("Java"))         # -1

# startswith() and endswith() return boolean
print(text.startswith("Python"))  # True
print(text.endswith("fun"))       # True
print(text.endswith("boring"))    # False

# count() counts non-overlapping occurrences
word = "banana"
print(word.count("an"))           # 2
print(word.count("a"))            # 3
```

### Replacing Text

```python
original = "I like cats. Cats are great."
new_text = original.replace("cats", "dogs")
print(new_text)   # I like dogs. Cats are great.

# replace() is case-sensitive
# To replace all, you may need .lower() first or use multiple replacements
new_text = original.replace("Cats", "Dogs").replace("cats", "dogs")
print(new_text)   # I like dogs. Dogs are great.
```

## Splitting and Joining

### `split()` — String to List

`split()` breaks a string into a list of substrings. By default, it splits on whitespace:

```python
sentence = "Python is an amazing language"
words = sentence.split()
print(words)   # ['Python', 'is', 'an', 'amazing', 'language']
print(len(words))   # 5
```

You can split on any delimiter:

```python
csv_line = "Alice,30,Engineer"
fields = csv_line.split(",")
print(fields)   # ['Alice', '30', 'Engineer']

name = fields[0]
age = int(fields[1])
job = fields[2]
print(f"{name} is a {age}-year-old {job}.")
```

### `join()` — List to String

`join()` is the opposite of `split()`. It combines a list of strings with a separator:

```python
words = ["Python", "is", "great"]
sentence = " ".join(words)
print(sentence)   # Python is great

path_parts = ["home", "user", "documents"]
path = "/".join(path_parts)
print(path)   # home/user/documents

# Join with no separator
letters = ["P", "y", "t", "h", "o", "n"]
print("".join(letters))   # Python
```

## The `in` Operator

The `in` operator checks whether a substring exists within a string:

```python
email = "alice@example.com"

print("@" in email)          # True
print("example" in email)    # True
print("gmail" in email)      # False

# Use 'not in' for the opposite
if ".edu" not in email:
    print("Not a .edu email address.")
```

## String Formatting

### F-Strings (Recommended)

F-strings are the most modern and readable approach:

```python
name = "Alice"
age = 30
balance = 1234.5

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Balance: ${balance:,.2f}")   # Balance: $1,234.50
print(f"In 5 years: {age + 5}")      # Expressions work inside {}
```

Common format specifiers:

```python
pi = 3.14159265
print(f"{pi:.2f}")       # 3.14  (2 decimal places)
print(f"{pi:.4f}")       # 3.1416 (4 decimal places)
print(f"{42:05d}")       # 00042 (zero-padded to 5 digits)
print(f"{'hello':>15}")  #           hello (right-aligned, 15 chars wide)
print(f"{'hello':<15}")  # hello           (left-aligned)
print(f"{'hello':^15}")  #      hello      (centered)
```

### The `.format()` Method

An older but still common approach:

```python
print("Hello, {}. You are {} years old.".format("Bob", 25))
print("Hello, {name}. You are {age}.".format(name="Bob", age=25))
```

## Practical Example

```python
# Parse and validate an email address
email = input("Enter your email: ").strip().lower()

if "@" in email and "." in email:
    parts = email.split("@")
    username = parts[0]
    domain = parts[1]
    print(f"Username: {username}")
    print(f"Domain: {domain}")
else:
    print("Invalid email address.")
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
