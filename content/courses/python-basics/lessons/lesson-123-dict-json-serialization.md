---
id: "132-dict-json-serialization"
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

# Custom JSON encoder
class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        """Convert non-serializable objects"""
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, date):
            return obj.isoformat()
        if isinstance(obj, Decimal):
            return float(obj)
        if isinstance(obj, set):
            return list(obj)
        return super().default(obj)

# Data with complex types
data = {
    "timestamp": datetime(2024, 1, 15, 10, 30),
    "date": date(2024, 1, 15),
    "price": Decimal("19.99"),
    "tags": {"python", "tutorial"}
}

# Serialize with custom encoder
json_string = json.dumps(data, cls=CustomEncoder, indent=2)
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

## Class to Dict Conversion

```python
from dataclasses import dataclass, asdict
import json

@dataclass
class User:
    name: str
    age: int
    email: str
    active: bool = True
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            "name": self.name,
            "age": self.age,
            "email": self.email,
            "active": self.active
        }
    
    @classmethod
    def from_dict(cls, data):
        """Create from dictionary"""
        return cls(
            name=data["name"],
            age=data["age"],
            email=data["email"],
            active=data.get("active", True)
        )
    
    def to_json(self):
        """Convert to JSON string"""
        return json.dumps(self.to_dict())
    
    @classmethod
    def from_json(cls, json_string):
        """Create from JSON string"""
        return cls.from_dict(json.loads(json_string))

# Usage
user = User("Alice", 30, "alice@example.com")

# To dict
user_dict = user.to_dict()
print(user_dict)  # {'name': 'Alice', 'age': 30, ...}

# Or use dataclass asdict
user_dict = asdict(user)

# To JSON
json_string = user.to_json()
print(json_string)

# From JSON
restored = User.from_json(json_string)
print(restored.name)  # Alice

# Nested objects
@dataclass
class Profile:
    user: User
    bio: str
    
    def to_dict(self):
        return {
            "user": self.user.to_dict(),
            "bio": self.bio
        }
    
    @classmethod
    def from_dict(cls, data):
        return cls(
            user=User.from_dict(data["user"]),
            bio=data["bio"]
        )

profile = Profile(user, "Software engineer")
profile_dict = profile.to_dict()
print(json.dumps(profile_dict, indent=2))
```

## Data Validation

```python
from typing import Any, Dict

class ValidationError(Exception):
    pass

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
        raise ValidationError(f"Validation errors: {', '.join(errors)}")
    
    return validated

# Valid data
try:
    user_data = {"name": "Alice", "email": "alice@example.com", "age": 30}
    validated = validate_user_data(user_data)
    print("Valid:", validated)
except ValidationError as e:
    print(e)

# Invalid data
try:
    bad_data = {"name": "Bob", "age": "thirty"}
    validate_user_data(bad_data)
except ValidationError as e:
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

class APIClient:
    """Simple API client with dict responses"""
    
    def __init__(self, base_url):
        self.base_url = base_url
    
    def get(self, endpoint) -> Dict[str, Any]:
        """GET request returning dict"""
        url = f"{self.base_url}/{endpoint}"
        try:
            with urllib.request.urlopen(url) as response:
                data = response.read()
                return json.loads(data)
        except Exception as e:
            return {"error": str(e)}
    
    def post(self, endpoint, data: Dict[str, Any]) -> Dict[str, Any]:
        """POST request with dict payload"""
        url = f"{self.base_url}/{endpoint}"
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
# client = APIClient("https://api.example.com")
# user = client.get("users/123")
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

class Config:
    """Configuration manager"""
    
    def __init__(self, config_file="config.json"):
        self.config_file = config_file
        self.data = self.load()
    
    def load(self) -> Dict[str, Any]:
        """Load configuration from file"""
        if os.path.exists(self.config_file):
            with open(self.config_file, 'r') as f:
                return json.load(f)
        return self.get_defaults()
    
    def save(self):
        """Save configuration to file"""
        with open(self.config_file, 'w') as f:
            json.dump(self.data, f, indent=2)
    
    def get(self, key, default=None):
        """Get configuration value"""
        keys = key.split('.')
        value = self.data
        for k in keys:
            if isinstance(value, dict):
                value = value.get(k)
                if value is None:
                    return default
            else:
                return default
        return value
    
    def set(self, key, value):
        """Set configuration value"""
        keys = key.split('.')
        current = self.data
        for k in keys[:-1]:
            if k not in current:
                current[k] = {}
            current = current[k]
        current[keys[-1]] = value
        self.save()
    
    @staticmethod
    def get_defaults() -> Dict[str, Any]:
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
config = Config()
print(config.get("server.port"))  # 8000
config.set("server.port", 9000)
print(config.get("server.port"))  # 9000
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
