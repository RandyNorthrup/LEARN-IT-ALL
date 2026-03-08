---
id: lesson-003-039
title: Web Services: JSON
chapterId: chapter-03
order: 39
duration: 5
objectives:
  - Understand JSON format and data types
  - Use Python's json module to parse and generate JSON
  - Convert between Python dictionaries and JSON strings
  - Pretty print JSON output for readability
---

# Web Services: JSON

**JSON (JavaScript Object Notation)** has become the dominant data interchange format for web services. It is lightweight, easy to read, and maps naturally to data structures in Python and most other programming languages.

## JSON Format

JSON supports six data types:

| JSON Type | Example | Python Equivalent |
|-----------|---------|-------------------|
| Object | `{"name": "Alice"}` | `dict` |
| Array | `[1, 2, 3]` | `list` |
| String | `"hello"` | `str` |
| Number | `42`, `3.14` | `int`, `float` |
| Boolean | `true`, `false` | `True`, `False` |
| Null | `null` | `None` |

A typical JSON document combines these types:

```json
{
  "name": "Alice Johnson",
  "age": 30,
  "is_student": false,
  "courses": ["Python", "Data Science", "Machine Learning"],
  "address": {
    "city": "Portland",
    "state": "OR"
  },
  "gpa": 3.85,
  "advisor": null
}
```

Key rules: strings must use **double quotes** (not single quotes), no trailing commas, and no comments.

## Python's json Module

Python's built-in `json` module handles all JSON operations. There are four main functions organized into two pairs:

### Strings: `json.loads()` and `json.dumps()`

**`json.loads()`** — Parse a JSON **string** into Python objects:

```python
import json

json_string = '{"name": "Alice", "age": 30, "courses": ["Python", "SQL"]}'
data = json.loads(json_string)

print(data['name'])        # Alice
print(data['age'])         # 30
print(data['courses'][0])  # Python
print(type(data))          # <class 'dict'>
```

**`json.dumps()`** — Convert Python objects to a JSON **string**:

```python
import json

person = {
    'name': 'Bob',
    'age': 25,
    'hobbies': ['reading', 'coding'],
    'employed': True,
    'middle_name': None
}

json_string = json.dumps(person)
print(json_string)
# {"name": "Bob", "age": 25, "hobbies": ["reading", "coding"], "employed": true, "middle_name": null}
```

Notice how Python `True` becomes JSON `true`, `None` becomes `null`, and single quotes become double quotes.

### Files: `json.load()` and `json.dump()`

**`json.load()`** — Read JSON from a **file**:

```python
import json

with open('data.json', 'r') as f:
    data = json.load(f)

print(data)
```

**`json.dump()`** — Write Python objects to a **file** as JSON:

```python
import json

data = {'users': ['Alice', 'Bob', 'Charlie'], 'count': 3}

with open('output.json', 'w') as f:
    json.dump(data, f)
```

Remember: the functions with **"s"** work with **s**trings, the ones without work with files.

## Pretty Printing

By default, `json.dumps()` produces compact output. Use `indent` for readable formatting:

```python
import json

data = {
    'students': [
        {'name': 'Alice', 'grade': 'A'},
        {'name': 'Bob', 'grade': 'B+'},
    ]
}

# Compact (default)
print(json.dumps(data))
# {"students": [{"name": "Alice", "grade": "A"}, ...]}

# Pretty printed
print(json.dumps(data, indent=2))
# {
#   "students": [
#     {
#       "name": "Alice",
#       "grade": "A"
#     },
#     ...
```

Additional useful parameters:

```python
# Sort keys alphabetically
print(json.dumps(data, indent=2, sort_keys=True))

# Ensure non-ASCII characters are preserved
print(json.dumps({'city': 'Zürich'}, ensure_ascii=False))
```

## Working with API Responses

JSON parsing is central to consuming web APIs:

```python
import urllib.request
import json

url = 'https://api.github.com/repos/python/cpython'
response = urllib.request.urlopen(url)
raw_data = response.read().decode()

repo = json.loads(raw_data)
print(f"Repository: {repo['full_name']}")
print(f"Stars: {repo['stargazers_count']}")
print(f"Language: {repo['language']}")
```

## Handling Nested JSON

Real-world JSON is often deeply nested. Navigate it step by step:

```python
import json

api_response = '''
{
  "results": [
    {
      "user": {"name": "Alice", "id": 1},
      "scores": [95, 87, 92]
    },
    {
      "user": {"name": "Bob", "id": 2},
      "scores": [78, 85, 90]
    }
  ],
  "total": 2
}
'''

data = json.loads(api_response)

for result in data['results']:
    name = result['user']['name']
    avg_score = sum(result['scores']) / len(result['scores'])
    print(f"{name}: average score {avg_score:.1f}")
```

Output:
```
Alice: average score 91.3
Bob: average score 84.3
```

JSON's simplicity and its natural mapping to Python dictionaries and lists make it the ideal format for modern web service communication.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
