---
id: 55-function-annotations
title: Function Annotations and Type Hints
chapterId: ch6-functions
order: 11
duration: 25
objectives:
  - Understand function annotations
  - Use type hints for parameters and return values
  - Work with typing module
  - Benefit from static type checking
  - Document types effectively
---

# Function Annotations and Type Hints

## Introduction

**Type hints** (PEP 484) let you specify the expected types of function parameters and return values. They improve code documentation and enable static type checkers.

## Basic Type Hints

```python
def greet(name: str) -> str:
    """Greet a person by name"""
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    """Add two integers"""
    return a + b

def calculate_area(width: float, height: float) -> float:
    """Calculate rectangle area"""
    return width * height
```

## Type Hints Don't Enforce Types

```python
def add(a: int, b: int) -> int:
    return a + b

# Python allows this (no runtime checking)
result = add("hello", "world")
print(result)  # "helloworld" (concatenation, not error!)

# Type hints are documentation, not enforcement
```

## Common Type Hints

```python
# Basic types
def process_int(x: int) -> int:
    return x * 2

def process_float(x: float) -> float:
    return x * 2.0

def process_string(x: str) -> str:
    return x.upper()

def process_bool(x: bool) -> bool:
    return not x

# None return type
def print_message(msg: str) -> None:
    print(msg)
    # No return statement
```

## Collection Type Hints

```python
from typing import List, Dict, Tuple, Set

def process_list(items: List[int]) -> List[int]:
    """Process a list of integers"""
    return [x * 2 for x in items]

def get_user(user_id: int) -> Dict[str, str]:
    """Return user data as dictionary"""
    return {"name": "Alice", "email": "alice@example.com"}

def get_coordinates() -> Tuple[float, float]:
    """Return x, y coordinates"""
    return (10.5, 20.3)

def get_unique_items(items: List[int]) -> Set[int]:
    """Return unique items"""
    return set(items)
```

## Optional Types

```python
from typing import Optional

def find_user(user_id: int) -> Optional[Dict]:
    """Return user or None if not found"""
    if user_id == 1:
        return {"name": "Alice"}
    return None

# Optional[T] is equivalent to Union[T, None]
from typing import Union

def process(value: Union[int, None]) -> str:
    if value is None:
        return "No value"
    return str(value)
```

## Union Types

```python
from typing import Union

def process_number(x: Union[int, float]) -> float:
    """Accept int or float, return float"""
    return float(x) * 2

def format_value(value: Union[int, str]) -> str:
    """Format int or str as string"""
    return str(value)

# Python 3.10+ can use | operator
def process_data(data: int | str) -> str:
    return str(data)
```

## Callable Types

```python
from typing import Callable

def apply_operation(x: int, y: int, op: Callable[[int, int], int]) -> int:
    """Apply a function to two integers"""
    return op(x, y)

def add(a: int, b: int) -> int:
    return a + b

result = apply_operation(5, 3, add)  # 8
```

## Generic Types

```python
from typing import TypeVar, List

T = TypeVar('T')

def first_element(items: List[T]) -> T:
    """Return first element of list"""
    return items[0]

# Works with any type
print(first_element([1, 2, 3]))           # 1 (int)
print(first_element(["a", "b", "c"]))    # "a" (str)
```

## Practical Examples

### Example 1: Complete Function with Types

```python
from typing import List, Dict, Optional

def calculate_average(scores: List[float]) -> Optional[float]:
    """
    Calculate average of scores.
    
    Args:
        scores: List of numeric scores
    
    Returns:
        Average score, or None if list is empty
    """
    if not scores:
        return None
    return sum(scores) / len(scores)

# Usage
grades = [85.5, 90.0, 78.5, 92.0]
avg = calculate_average(grades)
print(f"Average: {avg:.1f}")  # Average: 86.5
```

### Example 2: User Data Processing

```python
from typing import List, Dict, Any

User = Dict[str, Any]  # Type alias

def filter_active_users(users: List[User]) -> List[User]:
    """Filter for active users only"""
    return [u for u in users if u.get("active", False)]

def get_user_names(users: List[User]) -> List[str]:
    """Extract all user names"""
    return [u["name"] for u in users]

# Usage
users = [
    {"name": "Alice", "active": True},
    {"name": "Bob", "active": False},
    {"name": "Charlie", "active": True}
]

active = filter_active_users(users)
names = get_user_names(active)
print(names)  # ['Alice', 'Charlie']
```

### Example 3: API Response Handler

```python
from typing import Union, Dict, List

ResponseData = Union[Dict, List, str, int, None]

def handle_response(data: ResponseData) -> str:
    """Handle different types of API responses"""
    if isinstance(data, dict):
        return f"Dict with {len(data)} keys"
    elif isinstance(data, list):
        return f"List with {len(data)} items"
    elif isinstance(data, str):
        return f"String: {data}"
    elif isinstance(data, int):
        return f"Number: {data}"
    else:
        return "No data"

print(handle_response({"key": "value"}))  # Dict with 1 keys
print(handle_response([1, 2, 3]))         # List with 3 items
```

## Type Aliases

```python
from typing import List, Dict

# Create type aliases for complex types
UserId = int
UserName = str
UserData = Dict[str, Union[str, int]]
UserList = List[UserData]

def get_user(user_id: UserId) -> UserData:
    return {"name": "Alice", "age": 25}

def get_all_users() -> UserList:
    return [
        {"name": "Alice", "age": 25},
        {"name": "Bob", "age": 30}
    ]
```

## Literal Types

```python
from typing import Literal

def set_log_level(level: Literal["DEBUG", "INFO", "WARNING", "ERROR"]) -> None:
    """Set logging level (only specific values allowed)"""
    print(f"Log level set to: {level}")

set_log_level("DEBUG")   # OK
# set_log_level("TRACE")  # Type checker error
```

## Any Type

```python
from typing import Any

def process_anything(data: Any) -> Any:
    """Process any type of data"""
    return data

# Accepts anything, returns anything
print(process_anything(42))
print(process_anything("hello"))
print(process_anything([1, 2, 3]))
```

## Static Type Checking with mypy

```python
# Install: pip install mypy
# Run: mypy yourfile.py

def add(a: int, b: int) -> int:
    return a + b

# mypy will catch this error:
result = add("5", "10")  # error: Argument 1 has incompatible type "str"
```

## Best Practices

```python
# 1. Type hint public APIs
def public_function(x: int) -> str:
    return str(x)

# 2. Internal functions can skip types
def _internal_helper(x):
    return x * 2

# 3. Use type aliases for complex types
UserDict = Dict[str, Union[str, int, List[str]]]

# 4. Optional over Union with None
def find_item(id: int) -> Optional[str]:  # Good
    pass

def find_item(id: int) -> Union[str, None]:  # Also OK
    pass

# 5. Document with docstrings + types
def calculate(x: float) -> float:
    """
    Calculate result.
    
    Args:
        x: Input value in meters
    
    Returns:
        Result in meters squared
    """
    return x ** 2
```

## Summary

- **Type hints**: Optional type annotations
- **Syntax**: `param: type` and `-> return_type`
- **Not enforced**: Python doesn't check types at runtime
- **Benefits**: Better IDE support, documentation, static analysis
- **typing module**: List, Dict, Optional, Union, Callable, etc.
- **Type checkers**: mypy, pyright, pyre
- **Python 3.10+**: Use `|` for Union types
- **Best practice**: Type hint public APIs

## Next Steps

Next, you'll learn about nested functions and closures in detail.
