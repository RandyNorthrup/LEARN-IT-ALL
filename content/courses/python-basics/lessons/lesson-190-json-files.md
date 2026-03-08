---
id: lesson-190-json-files
title: "Working with JSON Data"
chapterId: ch16-file-io
order: 5
duration: 25
objectives:
  - Read and write JSON data using Python's built-in json module
  - Convert between Python objects and JSON strings with loads/dumps
  - Understand the mapping between Python types and JSON types
  - Handle custom object serialization with default functions and JSONEncoder subclasses
  - Work with JSON data from APIs and configuration files
  - Debug common JSON errors including serialization failures
---

# Working with JSON Data

JSON (JavaScript Object Notation) has become the universal language of data exchange. APIs send and receive JSON. Configuration files use JSON. Databases store JSON. Python's built-in `json` module makes working with JSON straightforward because JSON maps almost directly to Python's native data types.

## What Is JSON?

JSON is a lightweight text format for structured data supporting six types:

```json
{
    "name": "Alice",
    "age": 30,
    "is_student": false,
    "scores": [95, 87, 92],
    "address": { "city": "New York", "zip": "10001" },
    "middle_name": null
}
```

| JSON Type | Example | Python Equivalent |
|-----------|---------|-------------------|
| object | `{"key": "value"}` | `dict` |
| array | `[1, 2, 3]` | `list` |
| string | `"hello"` | `str` |
| number (int) | `42` | `int` |
| number (float) | `3.14` | `float` |
| boolean | `true` / `false` | `True` / `False` |
| null | `null` | `None` |

## The Four Core Functions

| Function | Input → Output | Use Case |
|----------|---------------|----------|
| `json.load()` | **File** → Python | Read JSON from a file |
| `json.dump()` | Python → **File** | Write JSON to a file |
| `json.loads()` | **String** → Python | Parse a JSON string |
| `json.dumps()` | Python → **String** | Create a JSON string |

The `s` stands for **string** — functions with `s` work with strings, without `s` work with files.

## Reading JSON from Files

```python
import json

with open("config.json", "r", encoding="utf-8") as file:
    config = json.load(file)

print(f"Database: {config['database']['host']}")
print(f"Debug mode: {config['debug']}")
```

### Handling Missing or Invalid Files

```python
import json

def load_config(path, defaults=None):
    if defaults is None:
        defaults = {}
    try:
        with open(path, "r", encoding="utf-8") as file:
            return {**defaults, **json.load(file)}
    except FileNotFoundError:
        print(f"Config not found: {path}. Using defaults.")
        return defaults
    except json.JSONDecodeError as e:
        print(f"Invalid JSON in {path}: {e}")
        return defaults

config = load_config("app.json", {"debug": False, "port": 8080})
```

## Writing JSON to Files

```python
import json

data = {
    "users": [
        {"name": "Alice", "email": "alice@example.com", "active": True},
        {"name": "Bob", "email": "bob@example.com", "active": False},
    ],
    "total": 2,
}

# Compact (one line)
with open("users.json", "w", encoding="utf-8") as file:
    json.dump(data, file)

# Human-readable with indentation
with open("users_pretty.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=2)
```

### Pretty Printing Options

```python
import json

data = {"name": "Alice", "scores": [95, 87, 92], "active": True}

# Compact — good for data transfer
print(json.dumps(data))
# {"name": "Alice", "scores": [95, 87, 92], "active": true}

# Pretty — good for config files
print(json.dumps(data, indent=4))

# Sort keys — good for consistent diffs
print(json.dumps(data, indent=2, sort_keys=True))

# Extra-compact — minimal separators
print(json.dumps(data, separators=(",", ":")))
# {"name":"Alice","scores":[95,87,92],"active":true}
```

## Parsing JSON Strings

When JSON comes as a string (from an API, message queue, or user input):

```python
import json

json_string = '{"temperature": 72.5, "unit": "F", "location": "office"}'
data = json.loads(json_string)
print(f"Temperature: {data['temperature']}°{data['unit']}")
```

### Handling Invalid JSON

```python
import json

def safe_parse(json_string):
    try:
        return json.loads(json_string)
    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e}")
        print(f"  Line {e.lineno}, column {e.colno}")
        return None

safe_parse('{"name": "Alice"}')     # Works
safe_parse("{'name': 'Alice'}")     # Fails — single quotes
safe_parse('{"name": "Alice",}')    # Fails — trailing comma
```

## Creating JSON Strings

```python
import json

user = {"name": "Alice", "age": 30, "active": True, "bio": None}
json_str = json.dumps(user)
print(json_str)
# {"name": "Alice", "age": 30, "active": true, "bio": null}
# Note: True→true, False→false, None→null
```

### Non-ASCII Characters

```python
import json

data = {"city": "München", "greeting": "こんにちは"}

print(json.dumps(data))
# {"city": "M\u00fcnchen", "greeting": "\u3053\u3093..."}

print(json.dumps(data, ensure_ascii=False))
# {"city": "München", "greeting": "こんにちは"}
```

## Handling Custom Objects

Not all Python types serialize to JSON automatically. `set`, `datetime`, `bytes`, and custom classes need conversion.

### Using the `default` Parameter

```python
import json
from datetime import datetime, date

def json_serializer(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    if isinstance(obj, set):
        return sorted(list(obj))
    if hasattr(obj, "__dict__"):
        return obj.__dict__
    raise TypeError(f"{type(obj).__name__} is not JSON serializable")

data = {
    "event": "Meeting",
    "date": datetime(2024, 3, 15, 14, 30),
    "attendees": {"Alice", "Bob", "Charlie"},
}

print(json.dumps(data, default=json_serializer, indent=2))
```

### Serializing Custom Data Structures

```python
import json
from datetime import datetime

def student_to_dict(student):
    """Convert a student dict with a datetime to a JSON-safe dict."""
    return {
        "name": student["name"],
        "grade": student["grade"],
        "enrolled": student["enrolled"].isoformat(),
        "_type": "Student",
    }

def student_from_dict(data):
    """Restore a student dict from JSON data."""
    return {
        "name": data["name"],
        "grade": data["grade"],
        "enrolled": datetime.fromisoformat(data["enrolled"]),
    }

# Serialize
student = {"name": "Alice", "grade": "A", "enrolled": datetime(2024, 9, 1)}
json_str = json.dumps(student_to_dict(student), indent=2)

# Deserialize
loaded = json.loads(json_str)
restored = student_from_dict(loaded)
print(f"{restored['name']}: Grade {restored['grade']}")
```

### Using a Custom `default` Function

```python
import json
from datetime import datetime

def custom_serializer(obj):
    """Handle non-standard types during JSON encoding."""
    if isinstance(obj, datetime):
        return {"_type": "datetime", "value": obj.isoformat()}
    if isinstance(obj, set):
        return {"_type": "set", "value": sorted(list(obj))}
    raise TypeError(f"{type(obj).__name__} is not JSON serializable")

data = {"timestamp": datetime.now(), "tags": {"python", "json"}}
encoded = json.dumps(data, default=custom_serializer, indent=2)
print(encoded)
```

## Working with API Data

```python
import json
from urllib.request import urlopen

def fetch_json(url):
    try:
        with urlopen(url) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as e:
        print(f"Error: {e}")
        return None

data = fetch_json("https://jsonplaceholder.typicode.com/users/1")
if data:
    print(f"Name: {data['name']}, City: {data['address']['city']}")
```

### Navigating Nested JSON Safely

```python
def safe_get(data, *keys, default=None):
    """Safely navigate nested dicts/lists."""
    current = data
    for key in keys:
        if isinstance(current, dict):
            current = current.get(key, default)
        elif isinstance(current, list) and isinstance(key, int):
            try:
                current = current[key]
            except IndexError:
                return default
        else:
            return default
    return current

response = {"data": {"users": [{"profile": {"name": "Alice"}}]}}
name = safe_get(response, "data", "users", 0, "profile", "name")
print(name)  # Alice
```

## Validating JSON Structure

```python
import json

def validate_user(data):
    errors = []
    if not isinstance(data, dict):
        return ["Data must be a JSON object"]

    for field in ["name", "email", "age"]:
        if field not in data:
            errors.append(f"Missing required field: '{field}'")

    if "age" in data and not isinstance(data["age"], (int, float)):
        errors.append(f"'age' must be a number")
    if "email" in data and "@" not in str(data["email"]):
        errors.append("'email' must contain '@'")
    return errors

errors = validate_user({"name": "Alice", "email": "bad", "age": "x"})
for e in errors:
    print(f"  - {e}")
```

## Common Errors and Solutions

### TypeError: Object is not JSON serializable

```python
import json
from datetime import datetime

# FAILS:
# json.dumps({"timestamp": datetime.now()})

# FIX: Convert to serializable type
json.dumps({"timestamp": datetime.now().isoformat()})
```

### json.JSONDecodeError

Common causes: single quotes, trailing commas, unquoted keys, empty strings. JSON is strict — only double quotes, no trailing commas, all keys must be quoted strings.

## Try It Yourself

1. **Settings Manager**: Load settings from JSON, let the user modify values, save back. Create defaults if the file doesn't exist.

2. **JSON Merger**: Deep-merge two JSON files — nested dicts merge recursively, other values are overwritten by the second file.

3. **CSV to JSON**: Read a CSV file and convert it to JSON (array of objects). Detect numeric types automatically.

4. **API Cache**: Cache API responses to JSON files. Return cached data if the file is less than an hour old.

## Key Takeaways

- **`json.load()`/`json.dump()`** work with files; **`json.loads()`/`json.dumps()`** work with strings.
- **Use `indent=2`** for human-readable output in config files. Omit it for data transfer.
- **Python dicts, lists, strings, ints, floats, bools, and None** map directly to JSON types. Other types need custom serialization.
- **Handle `json.JSONDecodeError`** when parsing JSON from external sources — never trust input is valid.
- **Use `ensure_ascii=False`** for readable non-English characters.
- **Custom serialization** uses `default` functions (simple), `to_dict()` methods (clean), or `JSONEncoder` subclasses (powerful).
- **`sort_keys=True`** produces consistent output for version control diffs.
- **JSON keys must be strings** — integer keys in Python dicts become strings in JSON.
