---
id: lesson-003-028
title: Regular Expressions: Matching and Extracting Data
chapterId: chapter-03
order: 28
duration: 5
objectives:
  - Use character classes like [a-z], [0-9], and shorthand classes
  - Apply shorthand character classes \\d, \\w, \\s
  - Control repetition with quantifiers {n,m}
  - Extract data with groups using parentheses
  - Use re.findall() with groups to extract specific parts
  - Understand greedy vs non-greedy matching
---

# Regular Expressions: Matching and Extracting Data

Building on the basics, this lesson covers more precise pattern matching with character classes, quantifiers, and groups — the tools you need to **extract** specific data from text, not just find it.

## Character Classes

A **character class** matches any one character from a set. Define them with square brackets:

```python
import re

# Match any vowel
print(re.findall('[aeiou]', 'Hello World'))
# ['e', 'o', 'o']

# Match any digit
print(re.findall('[0-9]', 'Room 404, Floor 3'))
# ['4', '0', '4', '3']

# Match any lowercase letter
print(re.findall('[a-z]+', 'Hello World 123'))
# ['ello', 'orld']

# Match uppercase and lowercase
print(re.findall('[a-zA-Z]+', 'Hello World 123'))
# ['Hello', 'World']
```

Use `^` inside a character class to **negate** it (match anything NOT in the set):

```python
# Match any non-digit character
print(re.findall('[^0-9]+', 'Room 404'))
# ['Room ', '']
```

## Shorthand Character Classes

Python provides shortcuts for common character classes:

| Shorthand | Equivalent | Matches |
|-----------|-----------|---------|
| `\d` | `[0-9]` | Any digit |
| `\D` | `[^0-9]` | Any non-digit |
| `\w` | `[a-zA-Z0-9_]` | Any word character |
| `\W` | `[^a-zA-Z0-9_]` | Any non-word character |
| `\s` | `[ \t\n\r\f\v]` | Any whitespace |
| `\S` | `[^ \t\n\r\f\v]` | Any non-whitespace |

```python
import re

text = 'Order #1234 placed on 2025-03-15'
print(re.findall(r'\d+', text))   # ['1234', '2025', '03', '15']
print(re.findall(r'\w+', text))   # ['Order', '1234', 'placed', 'on', '2025', '03', '15']
print(re.findall(r'\S+', text))   # ['Order', '#1234', 'placed', 'on', '2025-03-15']
```

> **Tip**: Use raw strings (`r'...'`) for regex patterns to avoid issues with backslash escaping.

## Quantifiers: {n,m}

Control exactly how many times a pattern can repeat:

| Quantifier | Meaning |
|-----------|---------|
| `{3}` | Exactly 3 times |
| `{2,4}` | Between 2 and 4 times |
| `{2,}` | 2 or more times |
| `{,3}` | Up to 3 times |

```python
import re

# Match exactly 3 digits
print(re.findall(r'\d{3}', '12 345 6789'))
# ['345', '678']

# Match phone-like patterns: 3 digits, dash, 4 digits
print(re.findall(r'\d{3}-\d{4}', 'Call 555-1234 or 555-5678'))
# ['555-1234', '555-5678']
```

## Groups with Parentheses

Parentheses `()` define a **group** — a sub-pattern you want to extract:

```python
import re

text = 'From stephen.marquard@uct.ac.za Sat Jan  5'
match = re.search(r'(\S+)@(\S+)', text)

if match:
    print(match.group())   # stephen.marquard@uct.ac.za (full match)
    print(match.group(1))  # stephen.marquard (first group)
    print(match.group(2))  # uct.ac.za (second group)
```

## re.findall() with Groups

When your pattern contains groups, `re.findall()` returns only the group contents:

```python
import re

text = 'From alice@example.com and bob@domain.org'

# Without groups — returns full matches
print(re.findall(r'\S+@\S+', text))
# ['alice@example.com', 'bob@domain.org']

# With one group — returns only the grouped part
print(re.findall(r'\S+@(\S+)', text))
# ['example.com', 'domain.org']

# With multiple groups — returns list of tuples
print(re.findall(r'(\S+)@(\S+)', text))
# [('alice', 'example.com'), ('bob', 'domain.org')]
```

This is extremely useful for extracting specific pieces of data from matched patterns.

## Greedy vs Non-Greedy Matching

By default, `*` and `+` are **greedy** — they match as much text as possible:

```python
import re

html = '<b>bold</b> and <i>italic</i>'

# Greedy: matches from first < to LAST >
print(re.findall(r'<.+>', html))
# ['<b>bold</b> and <i>italic</i>']
```

Add `?` after the quantifier to make it **non-greedy** (match as little as possible):

```python
# Non-greedy: matches from each < to the nearest >
print(re.findall(r'<.+?>', html))
# ['<b>', '</b>', '<i>', '</i>']
```

## Practical Example: Extracting Numbers from Text

```python
import re

line = 'The temperature is 72.5 degrees (high was 98.1)'
temps = re.findall(r'[0-9]+\.?[0-9]*', line)
print(temps)  # ['72.5', '98.1']
```

## Key Takeaways

- Character classes `[abc]` match any single character in the set
- Shorthand classes `\d`, `\w`, `\s` match digits, word chars, and whitespace
- Quantifiers `{n,m}` control exact repetition counts
- Parentheses `()` create groups for extracting specific parts of a match
- `re.findall()` with groups returns only the grouped content
- Add `?` after `*` or `+` for non-greedy (minimal) matching

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
