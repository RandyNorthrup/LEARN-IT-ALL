---
id: "142-set-vs-other-structures"
title: "Sets vs Other Data Structures"
chapterId: ch10-sets
order: 9
duration: 25
objectives:
  - Compare sets with lists, tuples, and dicts
  - Understand when to use each structure
  - Learn conversion strategies
  - Make informed data structure choices
---

# Sets vs Other Data Structures

Understanding when to use sets versus other Python data structures.

## Set vs List

```python
# List: ordered, allows duplicates, indexed
my_list = [1, 2, 2, 3, 3, 3]
print(my_list[0])  # Indexed access: 1
print(len(my_list))  # 6 (includes duplicates)

# Set: unordered, unique elements, not indexed
my_set = {1, 2, 2, 3, 3, 3}
# print(my_set[0])  # Error! No indexing
print(len(my_set))  # 3 (duplicates removed)

# Performance comparison
import time

data_list = list(range(100_000))
data_set = set(range(100_000))
search = 99_999

# List membership: O(n)
start = time.time()
_ = search in data_list
list_time = time.time() - start

# Set membership: O(1)
start = time.time()
_ = search in data_set
set_time = time.time() - start

print(f"List lookup: {list_time:.6f}s")
print(f"Set lookup:  {set_time:.6f}s")
print(f"Set is {list_time/set_time:.0f}x faster")
```

## When to Use List vs Set

```python
# ✅ USE LIST when:

# 1. Order matters
ordered_tasks = ["Task 1", "Task 2", "Task 3"]
print(f"First task: {ordered_tasks[0]}")

# 2. Need indexing/slicing
numbers = [1, 2, 3, 4, 5]
first_three = numbers[:3]

# 3. Need duplicates
votes = ["Alice", "Bob", "Alice", "Charlie", "Bob", "Alice"]
print(f"Alice got {votes.count('Alice')} votes")

# 4. Need to maintain insertion order (before Python 3.7)
history = []
history.append("page1")
history.append("page2")

# 5. Working with sequences
for i, item in enumerate(my_list):
    print(f"Index {i}: {item}")

# ✅ USE SET when:

# 1. Need unique elements only
unique_visitors = set()
unique_visitors.add("user1")
unique_visitors.add("user1")  # Duplicate ignored
print(len(unique_visitors))  # 1

# 2. Frequent membership testing
ADMIN_IDS = {1, 2, 3, 4, 5}
if user_id in ADMIN_IDS:  # O(1) lookup
    grant_admin_access()

# 3. Need set operations (union, intersection, etc.)
team_a = {"alice", "bob", "charlie"}
team_b = {"bob", "david", "eve"}
both_teams = team_a & team_b  # {"bob"}

# 4. Removing duplicates
duplicated_list = [1, 2, 2, 3, 3, 3]
unique_items = list(set(duplicated_list))

# 5. Mathematical set operations
all_skills = {"python", "java", "javascript"}
required_skills = {"python", "java"}
has_all = required_skills <= all_skills  # True
```

## Set vs Tuple

```python
# Tuple: ordered, immutable, allows duplicates, indexed
my_tuple = (1, 2, 2, 3)
print(my_tuple[0])  # 1
# my_tuple[0] = 5  # Error! Immutable

# Set: unordered, mutable, unique, not indexed
my_set = {1, 2, 2, 3}
# print(my_set[0])  # Error! No indexing
my_set.add(4)  # Can modify

# Tuple as set element (hashable)
set_of_tuples = {(1, 2), (3, 4), (5, 6)}
print(set_of_tuples)  # Valid

# Set cannot be tuple element (unhashable)
try:
    tuple_of_sets = ({1, 2}, {3, 4})  # Error!
except TypeError as e:
    print(f"Error: {e}")

# But frozenset can be in tuple
tuple_of_frozensets = (frozenset([1, 2]), frozenset([3, 4]))
print(tuple_of_frozensets)  # Valid
```

## When to Use Tuple vs Set

```python
# ✅ USE TUPLE when:

# 1. Data should not change
COORDINATES = (40.7128, -74.0060)  # NYC coordinates

# 2. Need as dict key
location_data = {
    (40.7128, -74.0060): "New York",
    (51.5074, -0.1278): "London"
}

# 3. Returning multiple values
def get_user_info():
    return ("Alice", 30, "alice@example.com")

# 4. Need guaranteed order
RGB = (255, 0, 0)  # Red - order matters

# 5. Memory efficiency for small fixed data
DIRECTIONS = ("north", "south", "east", "west")

# ✅ USE SET when:

# 1. Need mutability
tags = {"python", "programming"}
tags.add("tutorial")  # Can modify

# 2. Need uniqueness
unique_ids = {1, 2, 3}
unique_ids.add(2)  # Ignored

# 3. Need set operations
set1 = {1, 2, 3}
set2 = {2, 3, 4}
common = set1 & set2

# 4. Don't need ordering
visited_pages = {"home", "about", "contact"}

# 5. Need fast membership testing
BLOCKED_IPS = {"192.168.1.1", "10.0.0.1"}
if ip in BLOCKED_IPS:  # O(1)
    block_request()
```

## Set vs Dictionary

```python
# Dictionary: key-value pairs, unique keys
my_dict = {"a": 1, "b": 2, "c": 3}
print(my_dict["a"])  # Value access: 1

# Set: just keys, no values
my_set = {"a", "b", "c"}
print("a" in my_set)  # Membership only: True

# Sets and dict keys are similar
dict_keys = set(my_dict.keys())
print(dict_keys == my_set)  # True

# Performance comparison - both O(1) for membership
import time

dict_data = {i: i for i in range(100_000)}
set_data = set(range(100_000))
search = 99_999

start = time.time()
_ = search in dict_data
dict_time = time.time() - start

start = time.time()
_ = search in set_data
set_time = time.time() - start

print(f"Dict lookup: {dict_time:.6f}s")
print(f"Set lookup:  {set_time:.6f}s")
# Similar performance
```

## When to Use Dict vs Set

```python
# ✅ USE DICT when:

# 1. Need key-value associations
user_ages = {"Alice": 30, "Bob": 25, "Charlie": 35}
print(user_ages["Alice"])  # 30

# 2. Need to store metadata
user_data = {
    "user123": {"name": "Alice", "email": "alice@example.com"},
    "user456": {"name": "Bob", "email": "bob@example.com"}
}

# 3. Need to count occurrences
from collections import Counter
votes = Counter(["Alice", "Bob", "Alice", "Charlie"])
print(votes["Alice"])  # 2

# 4. Need default values
from collections import defaultdict
groups = defaultdict(list)
groups["team_a"].append("Alice")

# 5. Need to map between values
state_capitals = {
    "California": "Sacramento",
    "Texas": "Austin",
    "New York": "Albany"
}

# ✅ USE SET when:

# 1. Only need to track presence (no associated data)
visited_urls = {"https://example.com", "https://test.com"}

# 2. Need set operations
admins = {"alice", "bob"}
editors = {"bob", "charlie"}
all_privileged = admins | editors

# 3. Need unique collection only
unique_tags = {"python", "tutorial", "programming"}

# 4. Don't need values
VALID_COMMANDS = {"start", "stop", "restart"}

# 5. Memory efficiency (no values stored)
import sys
dict_100 = {i: None for i in range(100)}
set_100 = set(range(100))
print(f"Dict: {sys.getsizeof(dict_100)} bytes")
print(f"Set:  {sys.getsizeof(set_100)} bytes")
# Set is smaller
```

## Conversion Between Structures

```python
# List ↔ Set
my_list = [1, 2, 2, 3, 3, 3]
my_set = set(my_list)  # List → Set (removes duplicates)
back_to_list = list(my_set)  # Set → List (loses order)

# Tuple ↔ Set
my_tuple = (1, 2, 2, 3)
my_set = set(my_tuple)  # Tuple → Set
back_to_tuple = tuple(my_set)  # Set → Tuple

# Dict ↔ Set
my_dict = {"a": 1, "b": 2, "c": 3}
keys_set = set(my_dict.keys())  # Dict keys → Set
values_set = set(my_dict.values())  # Dict values → Set
items_set = set(my_dict.items())  # Dict items → Set of tuples

# Set → Dict (need to provide values)
my_set = {1, 2, 3}
my_dict = {k: None for k in my_set}  # Set → Dict with None values
my_dict = {k: k*2 for k in my_set}  # Set → Dict with computed values

# Preserve order when converting
from collections import OrderedDict
my_list = [3, 1, 4, 1, 5, 9, 2, 6, 5]
# Use dict.fromkeys() to remove duplicates while preserving order
unique_ordered = list(dict.fromkeys(my_list))
print(unique_ordered)  # [3, 1, 4, 5, 9, 2, 6]
```

## Combined Usage Patterns

```python
# Pattern 1: Use set for fast filtering, convert to list for output
def filter_valid_records(records, valid_ids):
    """Filter records efficiently"""
    valid_id_set = set(valid_ids)  # O(n) once
    filtered = [r for r in records if r.id in valid_id_set]  # O(1) per check
    return filtered  # Return list (preserves order if needed)

# Pattern 2: Use dict for counting, set for uniqueness
from collections import Counter

def analyze_data(items):
    """Analyze with both dict and set"""
    counts = Counter(items)  # Dict for counting
    unique = set(items)  # Set for uniqueness
    return {
        "unique_count": len(unique),
        "total_count": len(items),
        "most_common": counts.most_common(3)
    }

# Pattern 3: Dict with set values
def group_by_category(items):
    """Group items, use sets for unique values"""
    groups = {}
    for item in items:
        category = item.category
        if category not in groups:
            groups[category] = set()
        groups[category].add(item.id)
    return groups

# Pattern 4: Set for deduplication, list for final output
def get_unique_sorted(items):
    """Remove duplicates and sort"""
    unique = set(items)  # Remove duplicates
    return sorted(unique)  # Return sorted list

# Pattern 5: Multiple structure combination
class DataProcessor:
    def __init__(self):
        self.data = []  # List for ordered data
        self.index = {}  # Dict for fast key lookup
        self.seen_ids = set()  # Set for duplicate detection
    
    def add(self, item):
        if item.id not in self.seen_ids:
            self.data.append(item)  # Preserve order
            self.index[item.id] = item  # Fast lookup
            self.seen_ids.add(item.id)  # Track seen
```

## Decision Matrix

```python
def choose_structure(requirements):
    """
    Helper to choose the right structure based on requirements
    """
    needs_order = requirements.get("order", False)
    needs_duplicates = requirements.get("duplicates", False)
    needs_indexing = requirements.get("indexing", False)
    needs_key_value = requirements.get("key_value", False)
    needs_mutability = requirements.get("mutable", True)
    needs_fast_lookup = requirements.get("fast_lookup", False)
    
    if needs_key_value:
        return "dict"
    elif needs_order and needs_indexing:
        if needs_mutability:
            return "list"
        else:
            return "tuple"
    elif not needs_duplicates and needs_fast_lookup:
        if needs_mutability:
            return "set"
        else:
            return "frozenset"
    elif needs_order:
        if needs_mutability:
            return "list"
        else:
            return "tuple"
    else:
        return "list"  # Default safe choice

# Examples
print(choose_structure({
    "order": False,
    "duplicates": False,
    "fast_lookup": True
}))  # "set"

print(choose_structure({
    "order": True,
    "indexing": True,
    "mutable": True
}))  # "list"

print(choose_structure({
    "key_value": True
}))  # "dict"
```

## Summary

**Quick Reference:**

| Feature | List | Tuple | Set | Dict |
|---------|------|-------|-----|------|
| Ordered | ✅ | ✅ | ❌ | ✅* |
| Mutable | ✅ | ❌ | ✅ | ✅ |
| Duplicates | ✅ | ✅ | ❌ | ❌** |
| Indexed | ✅ | ✅ | ❌ | ❌*** |
| Hashable | ❌ | ✅ | ❌ | ❌ |
| Key-Value | ❌ | ❌ | ❌ | ✅ |
| Lookup Speed | O(n) | O(n) | O(1) | O(1) |

*Python 3.7+  
**Keys only  
***Key access, not numeric indexing

**Use:**
- **List**: Need order, indexing, or duplicates
- **Tuple**: Immutable list, dict key, multiple returns
- **Set**: Unique elements, fast lookup, set operations
- **Dict**: Key-value pairs, fast lookup by key
- **frozenset**: Immutable set, dict key, set element

**General Rule:**
1. Need values for keys? → Dict
2. Need uniqueness + fast lookup? → Set
3. Need order + indexing? → List or Tuple
4. Need immutability? → Tuple or frozenset
5. Default? → List (most flexible)
