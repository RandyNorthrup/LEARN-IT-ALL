---
id: string-operations
title: String Operations and Methods
chapterId: ch1-intro
order: 4
duration: 30
objectives:
  - Master string concatenation and formatting
  - Learn essential string methods
  - Understand string indexing and slicing
---

# String Operations and Methods

Strings are one of the most commonly used data types in Python. Let's explore the powerful operations and methods available for working with text.

## String Concatenation

Combine strings using the `+` operator:

```python
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
print(full_name)  # John Doe
```

Repeat strings using the `*` operator:

```python
separator = "=" * 20
print(separator)  # ====================

laugh = "ha" * 3
print(laugh)  # hahaha
```

## String Formatting

### F-Strings (Recommended)

The modern and most readable way to format strings:

```python
name = "Alice"
age = 25
city = "New York"

message = f"My name is {name}, I'm {age} years old, and I live in {city}."
print(message)

# With expressions
price = 19.99
quantity = 3
print(f"Total: ${price * quantity}")  # Total: $59.97

# With formatting
pi = 3.14159
print(f"Pi: {pi:.2f}")  # Pi: 3.14 (2 decimal places)
```

### .format() Method

An older but still valid approach:

```python
message = "Hello, {}! You are {} years old.".format("Bob", 30)
print(message)  # Hello, Bob! You are 30 years old.

# Named placeholders
message = "Hello, {name}! You are {age} years old.".format(name="Bob", age=30)
```

### % Formatting (Legacy)

Old-style formatting (avoid in new code):

```python
message = "Hello, %s! You are %d years old." % ("Charlie", 35)
```

## String Indexing

Access individual characters using square brackets:

```python
word = "Python"

# Positive indexing (starts at 0)
print(word[0])   # P
print(word[1])   # y
print(word[5])   # n

# Negative indexing (starts from end)
print(word[-1])  # n
print(word[-2])  # o
print(word[-6])  # P
```

**Remember**: Strings are immutable, you can't change individual characters:

```python
word = "Python"
word[0] = "J"  # TypeError: 'str' object does not support item assignment
```

## String Slicing

Extract substrings using slicing syntax: `[start:end:step]`

```python
text = "Python Programming"

# Basic slicing
print(text[0:6])    # Python
print(text[7:18])   # Programming

# Omitting start/end
print(text[:6])     # Python (from beginning)
print(text[7:])     # Programming (to end)
print(text[:])      # Python Programming (entire string)

# Negative indices
print(text[-11:])   # Programming
print(text[:-12])   # Python

# Step parameter
print(text[::2])    # Pto rgamn (every 2nd character)
print(text[::-1])   # gnimmargorP nohtyP (reversed!)
```

## Essential String Methods

Python strings have many built-in methods. Here are the most important ones:

### Case Conversion

```python
text = "Python Programming"

print(text.upper())       # PYTHON PROGRAMMING
print(text.lower())       # python programming
print(text.title())       # Python Programming
print(text.capitalize())  # Python programming
print(text.swapcase())    # pYTHON pROGRAMMING
```

### Whitespace Methods

```python
text = "  Hello World  "

print(text.strip())   # "Hello World" (removes leading/trailing whitespace)
print(text.lstrip())  # "Hello World  " (left strip)
print(text.rstrip())  # "  Hello World" (right strip)

# Remove specific characters
text = "###Hello###"
print(text.strip("#"))  # Hello
```

### Search Methods

```python
text = "Python is awesome"

# Check if substring exists
print("Python" in text)       # True
print("Java" in text)         # False

# Find position
print(text.find("is"))        # 7 (index where found)
print(text.find("Java"))      # -1 (not found)

# Count occurrences
text = "banana"
print(text.count("a"))        # 3

# Check start/end
print(text.startswith("Py"))  # True
print(text.endswith("me"))    # True
```

### Split and Join

```python
# Split string into list
sentence = "Python is easy to learn"
words = sentence.split()
print(words)  # ['Python', 'is', 'easy', 'to', 'learn']

# Split with custom delimiter
data = "apple,banana,orange"
fruits = data.split(",")
print(fruits)  # ['apple', 'banana', 'orange']

# Join list into string
words = ['Python', 'is', 'awesome']
sentence = " ".join(words)
print(sentence)  # Python is awesome

# Join with custom separator
fruits = ['apple', 'banana', 'orange']
result = ", ".join(fruits)
print(result)  # apple, banana, orange
```

### Replace

```python
text = "Hello World"
new_text = text.replace("World", "Python")
print(new_text)  # Hello Python

# Replace multiple occurrences
text = "one one one"
new_text = text.replace("one", "two")
print(new_text)  # two two two

# Limit replacements
text = "one one one"
new_text = text.replace("one", "two", 2)
print(new_text)  # two two one
```

### Check Content

```python
# Check if alphanumeric
print("Hello123".isalnum())   # True
print("Hello 123".isalnum())  # False (space)

# Check if alphabetic
print("Hello".isalpha())      # True
print("Hello123".isalpha())   # False

# Check if digits
print("12345".isdigit())      # True
print("123.45".isdigit())     # False

# Check if lowercase/uppercase
print("hello".islower())      # True
print("HELLO".isupper())      # True

# Check if whitespace
print("   ".isspace())        # True
```

## Escape Characters

Special characters in strings:

```python
# Newline
print("Hello\nWorld")
# Hello
# World

# Tab
print("Name:\tAlice")  # Name:    Alice

# Backslash
print("C:\\Users\\Documents")  # C:\Users\Documents

# Quotes
print("He said, \"Hello!\"")  # He said, "Hello!"

# Raw strings (ignore escape characters)
path = r"C:\Users\Documents"
print(path)  # C:\Users\Documents
```

## Multi-line Strings

```python
# Triple quotes for multi-line strings
message = """This is a
multi-line
string"""
print(message)

# Also works with single quotes
poem = '''Roses are red,
Violets are blue,
Python is awesome,
And so are you!'''
print(poem)
```

## String Length

```python
text = "Python"
length = len(text)
print(length)  # 6

# Empty string
empty = ""
print(len(empty))  # 0
```

## Practical Examples

### Example 1: Email Validator (Basic)

```python
email = input("Enter your email: ")

if "@" in email and "." in email:
    username = email.split("@")[0]
    domain = email.split("@")[1]
    print(f"Username: {username}")
    print(f"Domain: {domain}")
else:
    print("Invalid email format")
```

### Example 2: Title Case Converter

```python
sentence = "hello world, welcome to PYTHON"
title_case = sentence.title()
print(title_case)  # Hello World, Welcome To Python
```

### Example 3: Remove Extra Spaces

```python
text = "  Python    is    awesome  "
cleaned = " ".join(text.split())
print(cleaned)  # Python is awesome
```

### Example 4: Password Checker

```python
password = "MyP@ssw0rd"

has_upper = any(c.isupper() for c in password)
has_lower = any(c.islower() for c in password)
has_digit = any(c.isdigit() for c in password)
is_long_enough = len(password) >= 8

if has_upper and has_lower and has_digit and is_long_enough:
    print("Strong password!")
else:
    print("Password needs improvement")
```

## Common String Mistakes

### Mistake 1: Modifying Strings

```python
# Wrong: Strings are immutable
word = "Python"
word[0] = "J"  # TypeError!

# Right: Create a new string
word = "J" + word[1:]
print(word)  # Jython
```

### Mistake 2: Forgetting to Assign

```python
text = "hello"
text.upper()  # Doesn't change text!
print(text)   # hello

# Right: Assign the result
text = text.upper()
print(text)  # HELLO
```

### Mistake 3: Index Out of Range

```python
word = "Hi"
print(word[5])  # IndexError: string index out of range

# Better: Check length first
if len(word) > 5:
    print(word[5])
```

## Key Takeaways

- Strings are **immutable** - methods return new strings
- Use **f-strings** for modern, readable formatting
- **Indexing** starts at 0, negative indices count from the end
- **Slicing** syntax: `[start:end:step]`
- Many useful methods: `.upper()`, `.lower()`, `.strip()`, `.split()`, `.join()`, `.replace()`
- Use **in** operator to check if substring exists
- Triple quotes for multi-line strings
- Escape characters like `\n` (newline) and `\t` (tab)

## What's Next?

Now that you've mastered strings, we'll explore **numbers and mathematical operations** in Python!
