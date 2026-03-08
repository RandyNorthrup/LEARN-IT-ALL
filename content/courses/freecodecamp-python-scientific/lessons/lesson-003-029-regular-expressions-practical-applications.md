---
id: lesson-003-029
title: Regular Expressions: Practical Applications
chapterId: chapter-03
order: 29
duration: 5
objectives:
  - Validate email addresses with regex
  - Parse URLs using regular expressions
  - Analyze log files for pattern extraction
  - Clean data with re.sub() for find-and-replace
  - Compile patterns with re.compile() for performance
---

# Regular Expressions: Practical Applications

With the regex fundamentals covered, this lesson focuses on **real-world applications** — the kinds of text processing tasks you'll encounter in actual Python projects.

## Email Validation

A basic email pattern checks for a username, `@` symbol, and domain:

```python
import re

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.search(pattern, email) is not None

print(is_valid_email('user@example.com'))    # True
print(is_valid_email('bad@.com'))            # False
print(is_valid_email('no-at-sign.com'))      # False
print(is_valid_email('alice+tag@mail.org'))  # True
```

Breaking down the pattern:
- `^[a-zA-Z0-9._%+-]+` — username: one or more valid characters
- `@` — literal at sign
- `[a-zA-Z0-9.-]+` — domain name
- `\.[a-zA-Z]{2,}$` — dot followed by 2+ letter TLD

## URL Parsing

Extract components from URLs:

```python
import re

url = 'https://www.example.com:8080/path/page?query=value'
pattern = r'(https?)://([^/:]+):?(\d*)(/[^?]*)?(\?.*)?'
match = re.search(pattern, url)

if match:
    print(f'Protocol: {match.group(1)}')  # https
    print(f'Host: {match.group(2)}')      # www.example.com
    print(f'Port: {match.group(3)}')      # 8080
    print(f'Path: {match.group(4)}')      # /path/page
    print(f'Query: {match.group(5)}')     # ?query=value
```

## Log File Analysis

Server logs follow predictable formats. Regex can extract timestamps, IP addresses, and status codes:

```python
import re

log_lines = [
    '192.168.1.1 - - [15/Mar/2025:10:15:32] "GET /index.html" 200 1024',
    '10.0.0.5 - - [15/Mar/2025:10:15:33] "POST /api/data" 404 512',
    '192.168.1.1 - - [15/Mar/2025:10:15:34] "GET /style.css" 200 2048',
]

for line in log_lines:
    match = re.search(r'(\d+\.\d+\.\d+\.\d+).*?"(\w+)\s+(\S+)"\s+(\d+)', line)
    if match:
        ip, method, path, status = match.groups()
        print(f'{ip} {method} {path} -> {status}')

# 192.168.1.1 GET /index.html -> 200
# 10.0.0.5 POST /api/data -> 404
# 192.168.1.1 GET /style.css -> 200
```

Counting errors:

```python
errors = 0
for line in log_lines:
    status = re.findall(r'"\s+([45]\d{2})', line)
    if status:
        errors += 1
print(f'Error responses: {errors}')  # Error responses: 1
```

## Data Cleaning with re.sub()

`re.sub(pattern, replacement, string)` replaces all matches of a pattern:

```python
import re

# Remove extra whitespace
messy = 'Hello    World   from    Python'
clean = re.sub(r'\s+', ' ', messy)
print(clean)  # 'Hello World from Python'

# Remove non-alphanumeric characters
text = 'Price: $42.99 (sale!)'
cleaned = re.sub(r'[^a-zA-Z0-9\s.]', '', text)
print(cleaned)  # 'Price 42.99 sale'

# Redact phone numbers
message = 'Call me at 555-123-4567 or 555-987-6543'
redacted = re.sub(r'\d{3}-\d{3}-\d{4}', '[REDACTED]', message)
print(redacted)  # 'Call me at [REDACTED] or [REDACTED]'
```

## Using Backreferences in Substitutions

You can reference matched groups in the replacement string using `\1`, `\2`, etc.:

```python
import re

# Reformat dates from MM/DD/YYYY to YYYY-MM-DD
dates = '03/15/2025 and 12/25/2024'
reformatted = re.sub(r'(\d{2})/(\d{2})/(\d{4})', r'\3-\1-\2', dates)
print(reformatted)  # '2025-03-15 and 2024-12-25'
```

## Compiling Patterns with re.compile()

When you use the same pattern repeatedly, compile it first for better performance:

```python
import re

email_pattern = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')

texts = [
    'Contact us at info@example.com',
    'Send to alice@domain.org and bob@site.net',
    'No email here',
]

for text in texts:
    emails = email_pattern.findall(text)
    if emails:
        print(f'Found: {emails}')

# Found: ['info@example.com']
# Found: ['alice@domain.org', 'bob@site.net']
```

A compiled pattern object has the same methods: `.search()`, `.findall()`, `.sub()`, etc.

## Practical Example: Extracting Data from a File

Putting it all together — extract all email domains from a file and count them:

```python
import re

fhand = open('mbox-short.txt')
domains = {}
pattern = re.compile(r'From\s+\S+@(\S+)')

for line in fhand:
    matches = pattern.findall(line)
    for domain in matches:
        domains[domain] = domains.get(domain, 0) + 1

for domain, count in sorted(domains.items()):
    print(f'{domain}: {count}')
```

## Key Takeaways

- Email and URL validation are classic regex use cases
- `re.sub()` performs find-and-replace with pattern matching
- Backreferences (`\1`, `\2`) in substitutions reference matched groups
- `re.compile()` pre-compiles patterns for repeated use and better performance
- Combine regex with file reading and dictionaries for powerful text analysis

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
