---
id: lesson-123-dict-json-serialization
title: "Dictionary JSON and Serialization"
chapterId: ch9-dictionaries
order: 14
duration: 25
objectives:
  - Master JSON serialization/deserialization
  - Handle custom objects with dicts
  - Learn data validation techniques
  - Understand serialization best practices
---

# Dictionary JSON and Serialization

Working with dictionaries for data exchange, storage, and serialization.

## Basic JSON Operations

```python
import json

# Dictionary to JSON string
data = {
    "name": "Alice",
    "age": 30,
    "active": True,
    "scores": [95, 87, 91]
}

# Serialize to JSON string
json_string = json.dumps(data)
print(json_string)
# {"name": "Alice", "age": 30, "active": true, "scores": [95, 87, 91]}

# Pretty print JSON
pretty_json = json.dumps(data, indent=2)
print(pretty_json)
# {
#   "name": "Alice",
#   "age": 30,
#   "active": true,
#   "scores": [95, 87, 91]
# }

# JSON string to dictionary
json_text = '{"name": "Bob", "age": 25}'
parsed = json.loads(json_text)
print(type(parsed))  # <class 'dict'>
print(parsed["name"])  # Bob

# Write to file
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Read from file
with open("data.json", "r") as f:
    loaded = json.load(f)
print(loaded == data)  # True
```

## JSON Data Types Mapping

```python
import json

# Python to JSON mapping
python_data = {
    "string": "hello",
    "integer": 42,
    "float": 3.14,
    "boolean": True,
    "none": None,
    "list": [1, 2, 3],
    "dict": {"nested": "value"}
}

json_string = json.dumps(python_data)
print(json_string)
# Python True → JSON true
# Python False → JSON false
# Python None → JSON null

# JSON to Python mapping
json_text = '{"active": true, "count": null, "value": 3.14}'
parsed = json.loads(json_text)
print(parsed["active"])  # True (Python bool)
print(parsed["count"])   # None (Python None)
print(type(parsed["value"]))  # <class 'float'>

# ⚠️ JSON has no set or tuple
data = {
    "tuple": (1, 2, 3),
    "set": {1, 2, 3}
}

try:
    json.dumps(data)
except TypeError as e:
    print(f"Error: {e}")  # Object of type set is not JSON serializable

# Convert to list first
data = {
    "tuple": list((1, 2, 3)),
    "set": list({1, 2, 3})
}
print(json.dumps(data))  # {"tuple": [1, 2, 3], "set": [1, 2, 3]}
```

## Handling Complex Objects

```python
import json
from datetime import datetime, date
from decimal import Decimal

# Custom JSON encoding using a default function
def custom_json_default(obj):
    """Convert non-serializable objects for JSON encoding"""
    if isinstance(obj, datetime):
        return obj.isoformat()
    if isinstance(obj, date):
        return obj.isoformat()
    if isinstance(obj, Decimal):
        return float(obj)
    if isinstance(obj, set):
        return list(obj)
    raise TypeError(f"Object of type {type(obj).__name__} is not JSON serializable")

# Data with complex types
data = {
    "timestamp": datetime(2024, 1, 15, 10, 30),
    "date": date(2024, 1, 15),
    "price": Decimal("19.99"),
    "tags": {"python", "tutorial"}
}

# Serialize with custom default function
json_string = json.dumps(data, default=custom_json_default, indent=2)
print(json_string)
# {
#   "timestamp": "2024-01-15T10:30:00",
#   "date": "2024-01-15",
#   "price": 19.99,
#   "tags": ["python", "tutorial"]
# }

# Custom decoder
def custom_decoder(dct):
    """Convert strings back to objects"""
    result = {}
    for key, value in dct.items():
        if key == "timestamp" and isinstance(value, str):
            result[key] = datetime.fromisoformat(value)
        elif key == "date" and isinstance(value, str):
            try:
                result[key] = date.fromisoformat(value)
            except ValueError:
                result[key] = value
        else:
            result[key] = value
    return result

# Deserialize with custom decoder
parsed = json.loads(json_string, object_hook=custom_decoder)
print(type(parsed["timestamp"]))  # <class 'datetime.datetime'>
```

## Dict to/from JSON Conversion

```python
from collections import namedtuple
import json

# Define User as a namedtuple with a default for 'active'
User = namedtuple('User', ['name', 'age', 'email', 'active'])
User.__new__.__defaults__ = (True,)  # default for 'active'

def user_to_dict(user):
    """Convert User namedtuple to dictionary"""
    return {
        "name": user.name,
        "age": user.age,
        "email": user.email,
        "active": user.active
    }

def user_from_dict(data):
    """Create User namedtuple from dictionary"""
    return User(
        name=data["name"],
        age=data["age"],
        email=data["email"],
        active=data.get("active", True)
    )

def user_to_json(user):
    """Convert User to JSON string"""
    return json.dumps(user_to_dict(user))

def user_from_json(json_string):
    """Create User from JSON string"""
    return user_from_dict(json.loads(json_string))

# Usage
user = User("Alice", 30, "alice@example.com")

# To dict
user_dict = user_to_dict(user)
print(user_dict)  # {'name': 'Alice', 'age': 30, ...}

# Or use _asdict() (built into namedtuple)
user_dict = user._asdict()

# To JSON
json_string = user_to_json(user)
print(json_string)

# From JSON
restored = user_from_json(json_string)
print(restored.name)  # Alice

# Nested objects using dicts
def create_profile(user, bio):
    """Create a profile containing a User"""
    return {"user": user, "bio": bio}

def profile_to_dict(profile):
    """Convert profile to dict for serialization"""
    return {
        "user": user_to_dict(profile["user"]),
        "bio": profile["bio"]
    }

def profile_from_dict(data):
    """Create profile from dict"""
    return {
        "user": user_from_dict(data["user"]),
        "bio": data["bio"]
    }

profile = create_profile(user, "Software engineer")
profile_dict = profile_to_dict(profile)
print(json.dumps(profile_dict, indent=2))
```

## Data Validation

```python
from typing import Any, Dict

def validate_user_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Validate user data structure"""
    errors = []
    
    # Required fields
    required = ["name", "email", "age"]
    for field in required:
        if field not in data:
            errors.append(f"Missing required field: {field}")
    
    # Type validation
    if "name" in data and not isinstance(data["name"], str):
        errors.append("name must be string")
    
    if "age" in data:
        if not isinstance(data["age"], int):
            errors.append("age must be integer")
        elif data["age"] < 0 or data["age"] > 150:
            errors.append("age must be between 0 and 150")
    
    if "email" in data:
        if not isinstance(data["email"], str):
            errors.append("email must be string")
        elif "@" not in data["email"]:
            errors.append("email must contain @")
    
    # Optional fields with defaults
    validated = {
        "name": data.get("name", ""),
        "email": data.get("email", ""),
        "age": data.get("age", 0),
        "active": data.get("active", True)
    }
    
    if errors:
        raise ValueError(f"Validation errors: {', '.join(errors)}")
    
    return validated

# Valid data
try:
    user_data = {"name": "Alice", "email": "alice@example.com", "age": 30}
    validated = validate_user_data(user_data)
    print("Valid:", validated)
except ValueError as e:
    print(e)

# Invalid data
try:
    bad_data = {"name": "Bob", "age": "thirty"}
    validate_user_data(bad_data)
except ValueError as e:
    print(e)  # Validation errors: Missing required field: email, age must be integer

# Schema validation with jsonschema
try:
    import jsonschema
    
    schema = {
        "type": "object",
        "properties": {
            "name": {"type": "string", "minLength": 1},
            "age": {"type": "integer", "minimum": 0, "maximum": 150},
            "email": {"type": "string", "pattern": r"^[\w\.-]+@[\w\.-]+\.\w+$"}
        },
        "required": ["name", "email", "age"]
    }
    
    # Valid
    jsonschema.validate(
        {"name": "Alice", "age": 30, "email": "alice@example.com"},
        schema
    )
    print("Schema validation passed")
    
    # Invalid
    try:
        jsonschema.validate(
            {"name": "", "age": -1, "email": "invalid"},
            schema
        )
    except jsonschema.ValidationError as e:
        print(f"Schema error: {e.message}")

except ImportError:
    print("jsonschema not installed")
```

## Nested Data Flattening

```python
def flatten_dict(d, parent_key='', sep='_'):
    """Flatten nested dictionary"""
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        elif isinstance(v, list):
            for i, item in enumerate(v):
                if isinstance(item, dict):
                    items.extend(flatten_dict(item, f"{new_key}_{i}", sep=sep).items())
                else:
                    items.append((f"{new_key}_{i}", item))
        else:
            items.append((new_key, v))
    return dict(items)

# Nested structure
nested = {
    "user": {
        "name": "Alice",
        "profile": {
            "age": 30,
            "city": "NYC"
        }
    },
    "scores": [95, 87, 91]
}

flat = flatten_dict(nested)
print(flat)
# {
#   'user_name': 'Alice',
#   'user_profile_age': 30,
#   'user_profile_city': 'NYC',
#   'scores_0': 95,
#   'scores_1': 87,
#   'scores_2': 91
# }

# Unflatten
def unflatten_dict(d, sep='_'):
    """Unflatten dictionary"""
    result = {}
    for key, value in d.items():
        parts = key.split(sep)
        current = result
        for part in parts[:-1]:
            if part not in current:
                current[part] = {}
            current = current[part]
        current[parts[-1]] = value
    return result

unflat = unflatten_dict(flat)
print(unflat)
# Similar to original nested structure
```

## Working with APIs

```python
import json
import urllib.request
from typing import Dict, List, Any

# Simple API client using functions
def api_get(base_url, endpoint) -> Dict[str, Any]:
    """GET request returning dict"""
    url = f"{base_url}/{endpoint}"
    try:
        with urllib.request.urlopen(url) as response:
            data = response.read()
            return json.loads(data)
    except Exception as e:
        return {"error": str(e)}

def api_post(base_url, endpoint, data: Dict[str, Any]) -> Dict[str, Any]:
    """POST request with dict payload"""
    url = f"{base_url}/{endpoint}"
    json_data = json.dumps(data).encode('utf-8')
    
    req = urllib.request.Request(
        url,
        data=json_data,
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            result = response.read()
            return json.loads(result)
    except Exception as e:
        return {"error": str(e)}

# Example usage (would work with real API)
# base = "https://api.example.com"
# user = api_get(base, "users/123")
# print(user["name"])

# Response transformation
def transform_api_response(response: Dict[str, Any]) -> Dict[str, Any]:
    """Transform API response to app format"""
    return {
        "id": response.get("user_id"),
        "name": response.get("full_name", ""),
        "email": response.get("email_address", ""),
        "created": response.get("created_at", ""),
        "active": response.get("is_active", False)
    }

# Mock API response
api_response = {
    "user_id": 123,
    "full_name": "Alice Smith",
    "email_address": "alice@example.com",
    "created_at": "2024-01-15",
    "is_active": True,
    "metadata": {"last_login": "2024-01-20"}
}

app_format = transform_api_response(api_response)
print(app_format)
```

## Configuration Files

```python
import json
import os
from typing import Dict, Any

# Configuration manager using functions
def config_load(config_file="config.json") -> Dict[str, Any]:
    """Load configuration from file"""
    if os.path.exists(config_file):
        with open(config_file, 'r') as f:
            return json.load(f)
    return config_defaults()

def config_save(data, config_file="config.json"):
    """Save configuration to file"""
    with open(config_file, 'w') as f:
        json.dump(data, f, indent=2)

def config_get(data, key, default=None):
    """Get configuration value using dot-notation keys"""
    keys = key.split('.')
    value = data
    for k in keys:
        if isinstance(value, dict):
            value = value.get(k)
            if value is None:
                return default
        else:
            return default
    return value

def config_set(data, key, value, config_file="config.json"):
    """Set configuration value using dot-notation keys"""
    keys = key.split('.')
    current = data
    for k in keys[:-1]:
        if k not in current:
            current[k] = {}
        current = current[k]
    current[keys[-1]] = value
    config_save(data, config_file)

def config_defaults() -> Dict[str, Any]:
    """Default configuration"""
    return {
        "app": {
            "name": "MyApp",
            "version": "1.0.0"
        },
        "server": {
            "host": "localhost",
            "port": 8000
        },
        "database": {
            "host": "localhost",
            "port": 5432,
            "name": "myapp_db"
        }
    }

# Usage
config = config_load()
print(config_get(config, "server.port"))  # 8000
config_set(config, "server.port", 9000)
print(config_get(config, "server.port"))  # 9000
```

## Serialization Formats

```python
import json
import pickle

# JSON serialization (human-readable, cross-language)
data = {"name": "Alice", "scores": [95, 87, 91]}
json_string = json.dumps(data)
print(f"JSON size: {len(json_string)} bytes")
# Advantage: Human-readable, cross-language
# Disadvantage: Limited types, larger size

# Pickle serialization (Python-specific, binary)
pickle_bytes = pickle.dumps(data)
print(f"Pickle size: {len(pickle_bytes)} bytes")
# Advantage: Supports more Python types, smaller
# Disadvantage: Not human-readable, Python-only, security risk

# When to use JSON:
# - API communication
# - Configuration files
# - Cross-language compatibility
# - Human readability needed

# When to use Pickle:
# - Python-to-Python only
# - Complex Python objects
# - Performance critical
# - Trust source (security!)

# YAML (requires PyYAML)
try:
    import yaml
    
    yaml_string = yaml.dump(data)
    print(f"YAML:\n{yaml_string}")
    # Advantage: Very human-readable, supports comments
    # Disadvantage: Slower, requires library
    
    parsed = yaml.safe_load(yaml_string)
except ImportError:
    print("PyYAML not installed")
```

## Summary

**Serialization Methods:**

| Format | Pros | Cons | Use Case |
|--------|------|------|----------|
| JSON | Cross-language, readable | Limited types | APIs, config |
| Pickle | All Python types | Python-only, unsafe | Caching |
| YAML | Very readable, comments | Slower | Config files |

**JSON Best Practices:**

- ✅ Use `json.dumps(indent=2)` for readability
- ✅ Implement custom encoders for complex types
- ✅ Validate data structure before serialization
- ✅ Handle missing/None values explicitly
- ✅ Use `json.load()`/`json.dump()` for files
- ❌ Don't trust untrusted pickle data (security!)
- ❌ Don't forget JSON has no set/tuple types
- ❌ Don't serialize sensitive data without encryption

**Validation:**

- ✅ Validate required fields
- ✅ Check data types
- ✅ Validate ranges and formats
- ✅ Use schema validation libraries
- ✅ Provide clear error messages

**Remember:** JSON is the standard for data exchange - master it!
