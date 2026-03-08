---
id: lesson-090-variable-lifetime
title: "Variable Lifetime and Garbage Collection"
chapterId: ch7-scope
order: 10
duration: 25
objectives:
  - Understand variable lifetime in Python
  - Learn how garbage collection works
  - Master reference counting
  - Understand memory management
---

# Variable Lifetime and Garbage Collection

Understanding when variables are created and destroyed is crucial for writing efficient Python code and avoiding memory leaks.

## Variable Lifetime Basics

```python
# Variable created when assigned
x = 10  # Variable 'x' created

# Variable exists until end of scope
def example():
    y = 20  # 'y' created
    print(y)  # 'y' exists
# 'y' destroyed when function ends

example()
# print(y)  # Error: 'y' doesn't exist

# Global variables live until program ends
global_var = "I exist everywhere"

def show_global():
    print(global_var)  # Can access

show_global()
print(global_var)  # Still exists
```

## Scope and Lifetime

```python
# Lifetime matches scope
def outer():
    x = 10  # x created
    
    def inner():
        y = 20  # y created
        print(x, y)  # Both exist
    # y destroyed here
    
    inner()
    print(x)  # x still exists
    # print(y)  # Error: y destroyed
# x destroyed here

outer()

# Nested function example
def create_counter():
    count = 0  # Lives as long as closure exists
    
    def increment():
        nonlocal count
        count += 1
        return count
    
    return increment

# count variable lives in closure
counter = create_counter()
print(counter())  # 1 - count still exists
print(counter())  # 2 - count persists
print(counter())  # 3 - count persists

# count destroyed when counter is garbage collected
del counter  # Now count can be garbage collected
```

## Reference Counting

```python
# Python uses reference counting for memory management
import sys

# Create object
numbers = [1, 2, 3, 4, 5]
print(f"References: {sys.getrefcount(numbers) - 1}")  # 1
# Note: -1 because getrefcount creates temporary reference

# Create another reference
also_numbers = numbers
print(f"References: {sys.getrefcount(numbers) - 1}")  # 2

# Add to list
number_list = [numbers]
print(f"References: {sys.getrefcount(numbers) - 1}")  # 3

# Remove references
also_numbers = None
print(f"References: {sys.getrefcount(numbers) - 1}")  # 2

number_list.clear()
print(f"References: {sys.getrefcount(numbers) - 1}")  # 1

# When reference count hits 0, memory is freed
del numbers  # Last reference removed, memory freed
```

## Object Lifecycle

```python
# Objects are created and destroyed automatically
import sys

# Reference counting controls when objects are freed
print("=== Object Lifecycle ===")

# Create objects
obj1 = {"name": "Object 1", "data": [1, 2, 3]}
print(f"Created: {obj1['name']}")

obj2 = {"name": "Object 2", "data": [4, 5, 6]}
print(f"Created: {obj2['name']}")

# Objects alive
print("Objects exist")

# Delete references
del obj1  # No more references, memory can be freed
print("obj1 deleted")

# obj2 still exists
print(f"obj2 still exists: {obj2['name']}")

del obj2  # Freed when last reference removed
print("obj2 deleted")

# Example with multiple references
print("\nMultiple references:")
obj3 = {"name": "Object 3", "data": [7, 8, 9]}
ref1 = obj3
ref2 = obj3

print(f"References: {sys.getrefcount(obj3) - 1}")  # 3

del obj3  # Object still alive (ref1, ref2 exist)
print("obj3 deleted, but object still alive")

del ref1  # Object still alive (ref2 exists)
print("ref1 deleted, but object still alive")

del ref2  # Now no references remain
print("ref2 deleted, object can be freed")
```

## Garbage Collection

```python
import gc

# Python's garbage collector handles circular references

# Circular reference example using dictionaries
node1 = {"value": 1, "next": None}
node2 = {"value": 2, "next": None}
node1["next"] = node2
node2["next"] = node1  # Circular!

# Remove direct references
del node1
del node2
# Dicts not freed yet due to circular reference

# Force garbage collection
print("Before GC:")
collected = gc.collect()
print(f"After GC: Collected {collected} objects")

# Check garbage collector status
print(f"GC enabled: {gc.isenabled()}")
print(f"GC stats: {gc.get_stats()}")
print(f"GC count: {gc.get_count()}")
```

## Memory Leaks Prevention

```python
# ❌ BAD - Circular references can cause leaks
def create_parent():
    return {"name": "parent", "children": []}

def create_child():
    return {"name": "child", "parent": None}

def add_child(parent, child):
    parent["children"].append(child)
    child["parent"] = parent  # Circular reference!

# Create circular reference
parent = create_parent()
child = create_child()
add_child(parent, child)

# Even if we delete, circular reference remains
del parent, child
# May not be immediately freed without GC

# ✅ GOOD - Avoid circular references
def create_parent_safe():
    return {"name": "parent", "children": []}

def create_child_safe(parent_name):
    # Store parent name/ID instead of direct reference
    return {"name": "child", "parent_name": parent_name}

def add_child_safe(parent, child):
    parent["children"].append(child)
    # No circular reference - child stores parent name, not parent dict

parent = create_parent_safe()
child = create_child_safe(parent["name"])
add_child_safe(parent, child)

print(child["parent_name"])  # "parent"
del parent, child  # Freed immediately - no circular reference

# ✅ ALSO GOOD - Use weak references (for supported types)
import weakref

# Weak references don't prevent garbage collection
# They work with functions and many custom objects
def create_resource():
    """A function that can be weakly referenced."""
    print("Resource active")

strong_ref = create_resource
weak_ref = weakref.ref(create_resource)

print(weak_ref())  # <function create_resource ...>

del create_resource  # Remove one strong reference
print(weak_ref())    # Still alive (strong_ref holds it)

del strong_ref       # No more strong references
print(weak_ref())    # None - resource was collected
```

## Context Managers for Resource Cleanup

```python
# Files are closed automatically with context managers
def read_file_bad():
    """File may not be closed if error occurs."""
    f = open('data.txt', 'r')
    data = f.read()
    f.close()  # What if error before this?
    return data

# ✅ GOOD - Use context manager
def read_file_good():
    """File always closed, even on error."""
    with open('data.txt', 'r') as f:
        data = f.read()
    # File closed automatically here
    return data

# Custom context manager using contextlib
from contextlib import contextmanager

@contextmanager
def database_connection(db_name):
    """Context manager for database connections."""
    print(f"Opening connection to {db_name}")
    connection = f"Connection to {db_name}"
    try:
        yield connection  # Provide connection to 'with' block
    finally:
        print(f"Closing connection to {db_name}")
        # Cleanup happens here automatically

# Use context manager
with database_connection('mydb') as conn:
    print(f"Using {conn}")
    # Do work with connection
# Connection closed automatically

# Context manager ensures cleanup
```

## Memory Profiling

```python
import sys

# Check object size
numbers = [1, 2, 3, 4, 5]
print(f"List size: {sys.getsizeof(numbers)} bytes")

string = "Hello World"
print(f"String size: {sys.getsizeof(string)} bytes")

# Large objects consume more memory
big_list = list(range(1000000))
print(f"Big list size: {sys.getsizeof(big_list):,} bytes")

# Generators save memory
big_gen = (x for x in range(1000000))
print(f"Generator size: {sys.getsizeof(big_gen)} bytes")

# Clean up
del big_list
del big_gen

# Track memory usage in function
def memory_heavy_function():
    """Function that uses lots of memory."""
    # Create large list
    data = [i * i for i in range(1000000)]
    
    # Process data
    result = sum(data)
    
    # data destroyed when function ends
    return result

result = memory_heavy_function()
# Large list 'data' now freed
print(f"Result: {result}")
```

## Generator for Memory Efficiency

```python
# ❌ BAD - Loads everything into memory
def read_large_file_bad(filename):
    """Loads entire file into memory."""
    with open(filename, 'r') as f:
        lines = f.readlines()  # All lines in memory!
    return lines

# ✅ GOOD - Generator yields one line at a time
def read_large_file_good(filename):
    """Yields lines one at a time."""
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()
    # File closed, minimal memory used

# Process large file efficiently
def process_large_file(filename):
    """Process without loading all into memory."""
    total_lines = 0
    for line in read_large_file_good(filename):
        # Process one line at a time
        total_lines += 1
        # Previous lines already freed
    return total_lines

# Memory efficient processing
# total = process_large_file('huge_file.txt')
```

## Variable Lifetime in Loops

```python
# Loop variable persists after loop
for i in range(5):
    pass

print(i)  # 4 - i still exists!

# List comprehension variable doesn't leak (Python 3+)
squares = [x**2 for x in range(5)]
# print(x)  # Error: x doesn't exist outside

# But generator expression variable also doesn't leak
gen = (x**2 for x in range(5))
# print(x)  # Error: x doesn't exist

# Function parameters destroyed after call
def func(param):
    local_var = param * 2
    return local_var

result = func(10)
# print(param)  # Error: doesn't exist
# print(local_var)  # Error: doesn't exist
print(result)  # 20 - return value saved
```

## Closure Variable Lifetime

```python
# Closure extends variable lifetime
def make_multiplier(factor):
    """Create multiplier function with captured variable."""
    # 'factor' would normally be destroyed after function ends
    
    def multiply(x):
        return x * factor  # 'factor' from outer scope
    
    return multiply
    # 'factor' kept alive in closure!

# factor lives as long as multiply exists
times_3 = make_multiplier(3)
times_5 = make_multiplier(5)

print(times_3(10))  # 30 - factor=3 still alive
print(times_5(10))  # 50 - factor=5 still alive

# Closures keep separate copies
print(times_3(4))   # 12 - uses factor=3
print(times_5(4))   # 20 - uses factor=5

# When function deleted, captured variables freed
del times_3  # factor=3 can now be freed
del times_5  # factor=5 can now be freed
```

## Global Variable Lifetime

```python
# Global variables live entire program lifetime

# Module-level variable
MODULE_CONSTANT = 100

def use_global():
    """Access global variable."""
    print(MODULE_CONSTANT)  # Always available

use_global()
print(MODULE_CONSTANT)  # Always available

# Only freed when program exits or explicitly deleted
del MODULE_CONSTANT
# print(MODULE_CONSTANT)  # Error: deleted

# Avoid globals when possible - use parameters instead
def calculate(value, constant=100):
    """Better: pass values as parameters."""
    return value * constant

result = calculate(5)  # Uses default
result = calculate(5, 200)  # Custom constant
```

## Best Practices

```python
# ✅ GOOD - Let Python handle memory
def process_data(data):
    """Python automatically frees temporary variables."""
    # Temporary variables
    filtered = [x for x in data if x > 0]
    transformed = [x * 2 for x in filtered]
    result = sum(transformed)
    # filtered, transformed freed when function ends
    return result

# ✅ GOOD - Use context managers for resources
def safe_file_processing():
    """Always clean up resources."""
    with open('input.txt', 'r') as infile:
        with open('output.txt', 'w') as outfile:
            for line in infile:
                outfile.write(line.upper())
    # Both files closed automatically

# ✅ GOOD - Delete large objects when done
def process_huge_data():
    """Free memory explicitly when needed."""
    huge_data = load_huge_dataset()
    
    # Process data
    result = analyze(huge_data)
    
    # Free memory explicitly
    del huge_data
    
    return result

# ✅ GOOD - Use generators for large sequences
def large_sequence():
    """Generate values on-demand."""
    for i in range(1000000):
        yield i * i
    # No huge list in memory

# Process without storing all
total = sum(x for x in large_sequence() if x % 2 == 0)
```

## Summary

**Variable Lifetime:**
- **Local variables**: Destroyed when function ends
- **Global variables**: Live entire program
- **Closure variables**: Live as long as closure exists
- **Loop variables**: Persist after loop (except comprehensions)

**Memory Management:**
- **Reference counting**: Object freed when count hits 0
- **Garbage collection**: Handles circular references
- **Weak references**: Don't prevent garbage collection

**Best Practices:**
- ✅ Use context managers for resources
- ✅ Let Python manage memory automatically
- ✅ Use generators for large sequences
- ✅ Delete large objects explicitly if needed
- ✅ Avoid circular references
- ✅ Minimize global variable usage

**Key Points:**
```python
# Variable lives as long as it's referenced
x = [1, 2, 3]  # Created
y = x          # Second reference
del x          # Still alive (y references it)
del y          # Now freed

# Closure extends lifetime
def outer():
    x = 10
    def inner():
        return x  # Keeps x alive
    return inner

# Context manager ensures cleanup
with open('file.txt') as f:
    data = f.read()
# File closed automatically
```

Understanding variable lifetime helps write efficient, leak-free Python code!
