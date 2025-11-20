---
id: "121-dict-access-modification"
title: "Dictionary Access and Modification"
chapterId: ch9-dictionaries
order: 3
duration: 25
objectives:
  - Master dictionary key access patterns
  - Learn safe access methods
  - Understand modification operations
  - Handle missing keys properly
---

# Dictionary Access and Modification

Dictionaries provide fast key-based access. Understanding access patterns and modification is essential.

## Basic Key Access

```python
# Dictionary literal
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Access with square brackets
print(person["name"])  # Alice
print(person["age"])   # 30

# KeyError on missing key
try:
    print(person["email"])
except KeyError as e:
    print(f"Key not found: {e}")  # Key not found: 'email'

# Check before accessing
if "email" in person:
    print(person["email"])
else:
    print("Email not found")
```

## get() Method - Safe Access

```python
person = {"name": "Alice", "age": 30}

# get() returns None for missing key
email = person.get("email")
print(email)  # None

# Specify default value
email = person.get("email", "no-email@example.com")
print(email)  # no-email@example.com

# Works for existing keys too
name = person.get("name")
print(name)  # Alice

# Use in conditions
if person.get("is_admin"):
    print("Admin user")
else:
    print("Regular user")

# Pattern: get with default
def display_user(user):
    name = user.get("name", "Unknown")
    age = user.get("age", 0)
    city = user.get("city", "Unknown")
    print(f"{name}, {age}, from {city}")

display_user({"name": "Bob", "age": 25})
# Bob, 25, from Unknown

display_user({})
# Unknown, 0, from Unknown
```

## setdefault() - Get and Set

```python
# setdefault() returns value if exists, sets and returns if not
person = {"name": "Alice"}

# Get existing key
name = person.setdefault("name", "Unknown")
print(name)    # Alice
print(person)  # {'name': 'Alice'}

# Get missing key - sets default
age = person.setdefault("age", 0)
print(age)     # 0
print(person)  # {'name': 'Alice', 'age': 0}

# Useful for building nested structures
data = {}
data.setdefault("users", []).append("alice")
data.setdefault("users", []).append("bob")
print(data)  # {'users': ['alice', 'bob']}

# Count occurrences pattern
words = ["apple", "banana", "apple", "cherry"]
counts = {}
for word in words:
    counts[word] = counts.setdefault(word, 0) + 1
print(counts)  # {'apple': 2, 'banana': 1, 'cherry': 1}
```

## Adding and Updating Values

```python
# Add new key-value pair
person = {"name": "Alice"}
person["age"] = 30
print(person)  # {'name': 'Alice', 'age': 30}

# Update existing value
person["age"] = 31
print(person)  # {'name': 'Alice', 'age': 31}

# Multiple assignments
person["city"] = "NYC"
person["country"] = "USA"
print(person)
# {'name': 'Alice', 'age': 31, 'city': 'NYC', 'country': 'USA'}

# Update based on current value
scores = {"alice": 100, "bob": 85}
scores["alice"] = scores["alice"] + 10
print(scores)  # {'alice': 110, 'bob': 85}

# Shorthand operators
scores["alice"] += 5
scores["bob"] *= 2
print(scores)  # {'alice': 115, 'bob': 170}
```

## update() Method

```python
# Update from another dictionary
person = {"name": "Alice", "age": 30}
updates = {"age": 31, "city": "NYC"}
person.update(updates)
print(person)  # {'name': 'Alice', 'age': 31, 'city': 'NYC'}

# Update from keyword arguments
person.update(country="USA", job="Engineer")
print(person)
# {'name': 'Alice', 'age': 31, 'city': 'NYC', 'country': 'USA', 'job': 'Engineer'}

# Update from list of tuples
person.update([("email", "alice@example.com"), ("phone", "123-456")])
print(person)

# Later values override
person = {"a": 1, "b": 2}
person.update({"b": 20, "c": 3})
print(person)  # {'a': 1, 'b': 20, 'c': 3}

# Chaining updates
config = {}
config.update({"debug": True})
config.update({"port": 8000})
config.update({"host": "localhost"})
print(config)  # {'debug': True, 'port': 8000, 'host': 'localhost'}
```

## Removing Items

```python
# del statement
person = {"name": "Alice", "age": 30, "city": "NYC"}
del person["age"]
print(person)  # {'name': 'Alice', 'city': 'NYC'}

# KeyError if key doesn't exist
try:
    del person["email"]
except KeyError:
    print("Key doesn't exist")

# pop() - remove and return value
person = {"name": "Alice", "age": 30, "city": "NYC"}
age = person.pop("age")
print(age)     # 30
print(person)  # {'name': 'Alice', 'city': 'NYC'}

# pop() with default (no error if missing)
email = person.pop("email", "no-email")
print(email)  # no-email

# popitem() - remove and return last item (Python 3.7+)
person = {"name": "Alice", "age": 30, "city": "NYC"}
item = person.popitem()
print(item)    # ('city', 'NYC')
print(person)  # {'name': 'Alice', 'age': 30}

# clear() - remove all items
person.clear()
print(person)  # {}
```

## Nested Dictionary Access

```python
# Nested structure
data = {
    "user": {
        "name": "Alice",
        "contact": {
            "email": "alice@example.com",
            "phone": "123-456"
        }
    }
}

# Access nested values
print(data["user"]["name"])  # Alice
print(data["user"]["contact"]["email"])  # alice@example.com

# KeyError at any level
try:
    print(data["user"]["address"]["street"])
except KeyError as e:
    print(f"Missing key: {e}")

# Safe nested access with get()
email = data.get("user", {}).get("contact", {}).get("email")
print(email)  # alice@example.com

street = data.get("user", {}).get("address", {}).get("street", "Unknown")
print(street)  # Unknown

# Modify nested values
data["user"]["name"] = "Alice Smith"
data["user"]["contact"]["phone"] = "999-999"
print(data["user"]["contact"]["phone"])  # 999-999

# Add nested key
if "user" not in data:
    data["user"] = {}
if "address" not in data["user"]:
    data["user"]["address"] = {}
data["user"]["address"]["city"] = "NYC"

# Or use setdefault
data.setdefault("user", {}).setdefault("address", {})["city"] = "NYC"
```

## Conditional Updates

```python
# Update only if key doesn't exist
scores = {"alice": 100, "bob": 85}

# Method 1: Check before setting
if "charlie" not in scores:
    scores["charlie"] = 90
print(scores)  # {'alice': 100, 'bob': 85, 'charlie': 90}

# Method 2: setdefault()
scores.setdefault("david", 95)
print(scores)  # {..., 'david': 95}

# Update only if key exists
if "alice" in scores:
    scores["alice"] += 10
print(scores)  # {'alice': 110, ...}

# Update if value meets condition
for key in scores:
    if scores[key] < 90:
        scores[key] = 90
print(scores)  # All scores >= 90

# Conditional update with get()
scores["alice"] = max(scores.get("alice", 0), 100)
```

## Bulk Operations

```python
# Update multiple values at once
prices = {"apple": 1.0, "banana": 0.5, "cherry": 2.0}

# Increase all prices by 10%
for key in prices:
    prices[key] *= 1.1
print(prices)  # {'apple': 1.1, 'banana': 0.55, 'cherry': 2.2}

# Or with comprehension (creates new dict)
increased = {k: v * 1.1 for k, v in prices.items()}

# Apply function to all values
def round_price(price):
    return round(price, 2)

prices = {k: round_price(v) for k, v in prices.items()}
print(prices)  # {'apple': 1.1, 'banana': 0.55, 'cherry': 2.2}

# Filter and update
data = {"a": 1, "b": 2, "c": 3, "d": 4}
# Keep only even values
data = {k: v for k, v in data.items() if v % 2 == 0}
print(data)  # {'b': 2, 'd': 4}

# Update keys based on condition
scores = {"alice": 100, "bob": 85, "charlie": 90}
# Add bonus to scores > 90
for key, value in list(scores.items()):  # list() to avoid RuntimeError
    if value > 90:
        scores[key] = value + 10
print(scores)  # {'alice': 110, 'bob': 85, 'charlie': 90}
```

## Swapping Keys and Values

```python
# Simple inversion
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}

# ⚠️ Warning: Duplicate values become single key
original = {"a": 1, "b": 2, "c": 1}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'c', 2: 'b'} - 'a' is lost!

# Handle duplicates with lists
from collections import defaultdict
original = {"a": 1, "b": 2, "c": 1}
inverted = defaultdict(list)
for k, v in original.items():
    inverted[v].append(k)
print(dict(inverted))  # {1: ['a', 'c'], 2: ['b']}
```

## Dictionary as Switch/Case

```python
# Traditional approach (Python 3.9 and earlier)
def get_day_name(day_num):
    days = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
    }
    return days.get(day_num, "Invalid day")

print(get_day_name(1))  # Monday
print(get_day_name(8))  # Invalid day

# Function dispatch pattern
def handle_get():
    return "GET request"

def handle_post():
    return "POST request"

def handle_put():
    return "PUT request"

handlers = {
    "GET": handle_get,
    "POST": handle_post,
    "PUT": handle_put
}

# Execute function based on key
method = "POST"
handler = handlers.get(method)
if handler:
    result = handler()
    print(result)  # POST request

# Python 3.10+ match statement (structural pattern matching)
def handle_request(method):
    match method:
        case "GET":
            return "GET request"
        case "POST":
            return "POST request"
        case "PUT":
            return "PUT request"
        case _:
            return "Unknown method"
```

## Dictionary Views

```python
# keys(), values(), items() return views
person = {"name": "Alice", "age": 30, "city": "NYC"}

# keys view
keys = person.keys()
print(keys)  # dict_keys(['name', 'age', 'city'])

# values view
values = person.values()
print(values)  # dict_values(['Alice', 30, 'NYC'])

# items view
items = person.items()
print(items)  # dict_items([('name', 'Alice'), ('age', 30), ('city', 'NYC')])

# Views reflect changes
person["country"] = "USA"
print(keys)  # dict_keys(['name', 'age', 'city', 'country'])

# Convert to list
keys_list = list(person.keys())
values_list = list(person.values())
items_list = list(person.items())

# Membership testing on views
print("name" in person.keys())  # True
print("Alice" in person.values())  # True
print(("age", 30) in person.items())  # True
```

## Common Patterns

```python
# Get with default and update
config = {}
port = config.get("port", 8000)
config["port"] = port
print(config)  # {'port': 8000}

# Increment counter
counts = {}
word = "apple"
counts[word] = counts.get(word, 0) + 1

# Toggle boolean
settings = {"debug": False}
settings["debug"] = not settings.get("debug", False)
print(settings)  # {'debug': True}

# Accumulate in list
groups = {}
item = ("fruit", "apple")
key, value = item
groups.setdefault(key, []).append(value)

# Merge with preference
defaults = {"a": 1, "b": 2, "c": 3}
custom = {"b": 20}
config = {**defaults, **custom}
print(config)  # {'a': 1, 'b': 20, 'c': 3}
```

## Summary

**Access Methods:**

| Method | Returns | On Missing Key |
|--------|---------|----------------|
| `d[key]` | Value | KeyError |
| `d.get(key)` | Value or None | None |
| `d.get(key, default)` | Value or default | default |
| `d.setdefault(key, default)` | Value or default | Sets default |

**Modification:**

| Method | Effect | Returns |
|--------|--------|---------|
| `d[key] = value` | Set value | None |
| `d.update(other)` | Merge dicts | None |
| `del d[key]` | Remove | None |
| `d.pop(key)` | Remove | Value |
| `d.popitem()` | Remove last | (key, value) |
| `d.clear()` | Remove all | None |

**Best Practices:**

- ✅ Use `get()` for safe access with defaults
- ✅ Use `setdefault()` for get-and-set operations
- ✅ Use `in` to check key existence before accessing
- ✅ Use `update()` for bulk modifications
- ✅ Use `pop()` with default for safe removal
- ❌ Don't catch KeyError unnecessarily - use `get()`
- ❌ Don't modify dict while iterating keys directly
- ❌ Don't forget dict assignment is by reference

**Remember:** Dictionaries are fast - O(1) average case for access, insert, and delete!
