---
id: lesson-003-027
title: Regular Expressions
chapterId: chapter-03
order: 27
duration: 5
objectives:
  - Understand what regular expressions are and why they are used
  - Import and use the re module
  - Search for patterns with re.search()
  - Find all matches with re.findall()
  - Use basic patterns including dot, star, plus, question mark, and anchors
---

# Regular Expressions

**Regular expressions** (regex) are a powerful language for matching patterns in text. Instead of searching for an exact string, you describe a *pattern* — like "any line that starts with 'From:'" or "a sequence of digits" — and Python finds all matches.

## The re Module

Python's regex functionality lives in the `re` module:

```python
import re
```

The two most commonly used functions are `re.search()` and `re.findall()`.

## re.search() — Finding a Match

`re.search()` scans a string for the first location where the regex pattern matches. It returns a **match object** if found, or `None` if not:

```python
import re

line = 'From: stephen.marquard@uct.ac.za'

if re.search('From:', line):
    print('Found it!')  # Found it!

if re.search('Xyzzy', line):
    print('Found it!')
# (nothing printed — no match)
```

This is similar to using `line.find()` or `'From:' in line`, but regex can match **patterns**, not just literal text.

## re.findall() — Finding All Matches

`re.findall()` returns a **list** of all non-overlapping matches in the string:

```python
import re

text = 'My phone is 555-1234 and backup is 555-5678'
numbers = re.findall('[0-9]+', text)
print(numbers)  # ['555', '1234', '555', '5678']
```

If there are no matches, it returns an empty list `[]`.

## Basic Pattern Characters

### The Dot (`.`) — Any Character

The dot matches **any single character** except a newline:

```python
import re
print(re.findall('F..m', 'From and Form'))  # ['From', 'Form']
```

### Star (`*`) — Zero or More

The `*` means "zero or more of the preceding character":

```python
import re
# Match 'a' followed by zero or more 'b's
print(re.findall('ab*', 'a ab abb abbb'))  # ['a', 'ab', 'abb', 'abbb']
```

### Plus (`+`) — One or More

The `+` means "one or more of the preceding character":

```python
import re
# Match one or more digits
print(re.findall('[0-9]+', 'Score: 42 to 17'))  # ['42', '17']
```

### Question Mark (`?`) — Zero or One (Optional)

The `?` makes the preceding character optional:

```python
import re
# Match 'colour' or 'color'
print(re.findall('colou?r', 'color and colour'))  # ['color', 'colour']
```

## Combining Wildcards

Use `.+` to match "one or more of any character" and `.*` for "zero or more of any character":

```python
import re
line = 'From: stephen.marquard@uct.ac.za Sat Jan  5 09:14:16 2008'

# Match 'From:' followed by any characters
match = re.search('From:.+', line)
if match:
    print(match.group())
    # From: stephen.marquard@uct.ac.za Sat Jan  5 09:14:16 2008
```

## Anchors: `^` and `$`

**`^`** matches the **start** of a string:

```python
import re
lines = ['From: alice', 'To: bob', 'From: charlie']
for line in lines:
    if re.search('^From:', line):
        print(line)
# From: alice
# From: charlie
```

**`$`** matches the **end** of a string:

```python
import re
print(re.search('python$', 'I love python'))   # Match found
print(re.search('python$', 'python is great'))  # None
```

## re.search() vs String Methods

| Task | String Method | Regex |
|------|---------------|-------|
| Exact substring | `'From' in line` | `re.search('From', line)` |
| Starts with | `line.startswith('From:')` | `re.search('^From:', line)` |
| Pattern matching | Not possible | `re.search('[0-9]+', line)` |

String methods are simpler for exact matches. Regex is essential when you need **pattern matching**.

## Key Takeaways

- Regular expressions describe **patterns** rather than exact strings
- `re.search()` finds the first match; `re.findall()` finds all matches
- `.` matches any character; `*` means zero or more; `+` means one or more
- `?` makes the preceding character optional
- `^` anchors to the start; `$` anchors to the end of a string

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
