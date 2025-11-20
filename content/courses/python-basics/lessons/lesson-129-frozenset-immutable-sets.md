---
id: "138-frozenset-immutable-sets"
title: "frozenset: Immutable Sets"
chapterId: ch10-sets
order: 5
duration: 25
objectives:
  - Understand frozenset and immutability
  - Learn when to use frozenset vs set
  - Use frozensets as dict keys and set elements
  - Master frozenset operations
---

# frozenset: Immutable Sets

Immutable sets for hashable collection needs and advanced data structures.

## What is frozenset?

```python
# frozenset: immutable version of set
frozen = frozenset([1, 2, 3, 4, 5])
print(frozen)  # frozenset({1, 2, 3, 4, 5})
print(type(frozen))  # <class 'frozenset'>

# Regular set: mutable
regular = {1, 2, 3, 4, 5}
regular.add(6)  # OK
print(regular)  # {1, 2, 3, 4, 5, 6}

# frozenset: immutable
frozen = frozenset([1, 2, 3, 4, 5])
try:
    frozen.add(6)
except AttributeError as e:
    print(f"Error: {e}")  # 'frozenset' object has no attribute 'add'

# Cannot modify frozenset
try:
    frozen.remove(1)
except AttributeError:
    print("Cannot remove from frozenset")

try:
    frozen.update([6, 7])
except AttributeError:
    print("Cannot update frozenset")

try:
    frozen.clear()
except AttributeError:
    print("Cannot clear frozenset")
```

## Creating frozensets

```python
# From list
fs1 = frozenset([1, 2, 3, 4, 5])
print(fs1)  # frozenset({1, 2, 3, 4, 5})

# From tuple
fs2 = frozenset((1, 2, 3))
print(fs2)  # frozenset({1, 2, 3})

# From string (unique characters)
fs3 = frozenset("hello")
print(fs3)  # frozenset({'h', 'e', 'l', 'o'})

# From range
fs4 = frozenset(range(5))
print(fs4)  # frozenset({0, 1, 2, 3, 4})

# From another set
regular = {1, 2, 3}
frozen = frozenset(regular)
print(frozen)  # frozenset({1, 2, 3})

# From another frozenset (returns same object)
fs5 = frozenset(fs1)
print(fs5 is fs1)  # True (optimization)

# Empty frozenset
empty = frozenset()
print(empty)  # frozenset()
print(len(empty))  # 0

# Automatic duplicate removal
fs6 = frozenset([1, 1, 2, 2, 3, 3])
print(fs6)  # frozenset({1, 2, 3})
```

## Why Use frozenset?

```python
# Reason 1: As dictionary keys (hashable)
# Regular set cannot be dict key
try:
    d = {{1, 2}: "value"}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'set'

# frozenset CAN be dict key
d = {frozenset([1, 2]): "value"}
print(d)  # {frozenset({1, 2}): 'value'}
print(d[frozenset([1, 2])])  # "value"

# Example: Group memberships as keys
memberships = {
    frozenset(["alice", "bob"]): "team_a",
    frozenset(["charlie", "david"]): "team_b",
    frozenset(["eve", "frank"]): "team_c"
}
print(memberships[frozenset(["alice", "bob"])])  # "team_a"

# Reason 2: As set elements (hashable)
# Regular set cannot contain sets
try:
    s = {{1, 2}, {3, 4}}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'set'

# frozenset CAN be in sets
s = {frozenset([1, 2]), frozenset([3, 4])}
print(s)  # {frozenset({1, 2}), frozenset({3, 4})}

# Example: Set of teams
teams = {
    frozenset(["alice", "bob", "charlie"]),
    frozenset(["david", "eve"]),
    frozenset(["frank", "grace", "henry"])
}
print(f"{len(teams)} teams")

# Reason 3: Ensure data integrity
def process_ids(id_set):
    """Function that shouldn't modify IDs"""
    # Use frozenset to guarantee no modifications
    frozen_ids = frozenset(id_set)
    # Process without fear of accidental changes
    return frozen_ids

# Reason 4: Constants
ADMIN_IDS = frozenset([1, 2, 3])  # Cannot be modified
VALID_STATUSES = frozenset(["pending", "approved", "rejected"])
```

## frozenset Operations

```python
# All read-only operations work
fs1 = frozenset([1, 2, 3, 4, 5])
fs2 = frozenset([3, 4, 5, 6, 7])

# Union
print(fs1 | fs2)  # frozenset({1, 2, 3, 4, 5, 6, 7})
print(fs1.union(fs2))  # Same

# Intersection
print(fs1 & fs2)  # frozenset({3, 4, 5})
print(fs1.intersection(fs2))  # Same

# Difference
print(fs1 - fs2)  # frozenset({1, 2})
print(fs1.difference(fs2))  # Same

# Symmetric difference
print(fs1 ^ fs2)  # frozenset({1, 2, 6, 7})
print(fs1.symmetric_difference(fs2))  # Same

# Membership
print(3 in fs1)  # True
print(10 in fs1)  # False

# Length
print(len(fs1))  # 5

# Subset/Superset
fs3 = frozenset([1, 2, 3])
print(fs3 <= fs1)  # True (subset)
print(fs1 >= fs3)  # True (superset)

# Disjoint
fs4 = frozenset([8, 9, 10])
print(fs1.isdisjoint(fs4))  # True

# Iteration
for item in fs1:
    print(item, end=" ")  # 1 2 3 4 5
print()
```

## frozenset vs set Operations

```python
# Operations with mixed types
regular_set = {1, 2, 3, 4, 5}
frozen_set = frozenset([3, 4, 5, 6, 7])

# Operations return frozenset if any operand is frozenset
result1 = frozen_set | regular_set
print(type(result1))  # <class 'frozenset'>

result2 = regular_set | frozen_set
print(type(result2))  # <class 'frozenset'>

# Methods return the type of the caller
result3 = frozen_set.union(regular_set)
print(type(result3))  # <class 'frozenset'>

result4 = regular_set.union(frozen_set)
print(type(result4))  # <class 'set'>

# Converting between types
frozen = frozenset([1, 2, 3])
regular = set(frozen)  # frozenset → set
print(type(regular))  # <class 'set'>

frozen_again = frozenset(regular)  # set → frozenset
print(type(frozen_again))  # <class 'frozenset'>
```

## Available Methods Comparison

```python
# Methods available on BOTH set and frozenset:
# union(), intersection(), difference(), symmetric_difference()
# issubset(), issuperset(), isdisjoint()
# copy(), __len__(), __contains__()

# Methods ONLY on set (modifying operations):
# add(), remove(), discard(), pop(), clear()
# update(), intersection_update(), difference_update()
# symmetric_difference_update()

# frozenset methods
fs = frozenset([1, 2, 3])
print(dir(fs))  # No add, remove, etc.

# Check for modifying methods
print(hasattr(fs, 'add'))     # False
print(hasattr(fs, 'remove'))  # False
print(hasattr(fs, 'union'))   # True
print(hasattr(fs, 'issubset'))  # True
```

## Practical Examples

```python
# Example 1: Graph representation with frozenset edges
class Graph:
    """Undirected graph with frozenset edges"""
    def __init__(self):
        self.edges = set()
    
    def add_edge(self, node1, node2):
        """Add edge (undirected)"""
        self.edges.add(frozenset([node1, node2]))
    
    def has_edge(self, node1, node2):
        """Check if edge exists"""
        return frozenset([node1, node2]) in self.edges
    
    def get_neighbors(self, node):
        """Get all neighbors of a node"""
        neighbors = set()
        for edge in self.edges:
            if node in edge:
                neighbors.update(edge - {node})
        return neighbors

graph = Graph()
graph.add_edge("A", "B")
graph.add_edge("B", "C")
graph.add_edge("A", "C")

print(graph.has_edge("A", "B"))  # True
print(graph.has_edge("B", "A"))  # True (same edge)
print(graph.get_neighbors("B"))  # {"A", "C"}

# Example 2: Caching with set keys
class PermissionCache:
    """Cache permission checks for user groups"""
    def __init__(self):
        self.cache = {}
    
    def check_permissions(self, user_groups, required_perms):
        """Check if any user group has required permissions"""
        # Use frozensets as cache keys
        key = (frozenset(user_groups), frozenset(required_perms))
        
        if key not in self.cache:
            # Simulate expensive permission check
            result = bool(frozenset(user_groups) & frozenset(required_perms))
            self.cache[key] = result
        
        return self.cache[key]

cache = PermissionCache()
groups1 = ["admin", "editor"]
perms1 = ["read", "write"]

result = cache.check_permissions(groups1, perms1)
print(f"Has permission: {result}")

# Example 3: Configuration combinations
def get_valid_configs():
    """Return valid configuration combinations"""
    return {
        frozenset(["feature_a", "feature_b"]),
        frozenset(["feature_a", "feature_c"]),
        frozenset(["feature_b", "feature_c"])
    }

def is_valid_config(features):
    """Check if feature combination is valid"""
    return frozenset(features) in get_valid_configs()

print(is_valid_config(["feature_a", "feature_b"]))  # True
print(is_valid_config(["feature_a", "feature_d"]))  # False

# Example 4: Set of sets for grouping
def group_anagrams(words):
    """Group words that are anagrams"""
    groups = {}
    for word in words:
        # Sort letters to create signature
        signature = frozenset(word.lower())
        if signature not in groups:
            groups[signature] = []
        groups[signature].append(word)
    return list(groups.values())

words = ["listen", "silent", "hello", "world", "enlist"]
# Note: This is simplified - real anagram checking needs letter counts
# groups = group_anagrams(words)

# Example 5: Membership tracking
class Tournament:
    """Track teams and their matchups"""
    def __init__(self):
        self.teams = set()
        self.matchups = set()  # Set of frozensets
    
    def add_team(self, team_members):
        """Add team as frozenset"""
        team = frozenset(team_members)
        self.teams.add(team)
    
    def schedule_match(self, team1_members, team2_members):
        """Schedule match between two teams"""
        team1 = frozenset(team1_members)
        team2 = frozenset(team2_members)
        matchup = frozenset([team1, team2])
        self.matchups.add(matchup)
    
    def has_played(self, team1_members, team2_members):
        """Check if two teams have played"""
        team1 = frozenset(team1_members)
        team2 = frozenset(team2_members)
        matchup = frozenset([team1, team2])
        return matchup in self.matchups

tournament = Tournament()
tournament.add_team(["alice", "bob"])
tournament.add_team(["charlie", "david"])
tournament.schedule_match(["alice", "bob"], ["charlie", "david"])

print(tournament.has_played(["alice", "bob"], ["charlie", "david"]))  # True
print(tournament.has_played(["bob", "alice"], ["david", "charlie"]))  # True (order doesn't matter)
```

## Performance Characteristics

```python
import time

# frozenset vs set performance
data = list(range(100_000))

# Creation time
start = time.time()
s = set(data)
set_time = time.time() - start

start = time.time()
fs = frozenset(data)
frozenset_time = time.time() - start

print(f"set creation: {set_time:.4f}s")
print(f"frozenset creation: {frozenset_time:.4f}s")
# Similar performance

# Lookup time (both O(1))
start = time.time()
for _ in range(10000):
    _ = 50000 in s
set_lookup = time.time() - start

start = time.time()
for _ in range(10000):
    _ = 50000 in fs
frozen_lookup = time.time() - start

print(f"set lookup: {set_lookup:.4f}s")
print(f"frozenset lookup: {frozen_lookup:.4f}s")
# Similar performance

# Memory usage (frozenset slightly more efficient)
import sys
s = set(range(1000))
fs = frozenset(range(1000))
print(f"set size: {sys.getsizeof(s)} bytes")
print(f"frozenset size: {sys.getsizeof(fs)} bytes")
# frozenset usually slightly smaller
```

## When to Use Each

```python
# ✅ USE SET when:
# - Need to add/remove elements
# - Building collection incrementally
# - Temporary working data
scores = set()
scores.add(95)
scores.add(87)

# ✅ USE FROZENSET when:
# - Need as dict key
cache = {frozenset([1, 2]): "value"}

# - Need in another set
set_of_sets = {frozenset([1, 2]), frozenset([3, 4])}

# - Need immutability guarantee
CONSTANTS = frozenset([1, 2, 3])

# - Passing to untrusted code
def process(data):
    # Caller can't modify original
    frozen = frozenset(data)
    return frozen

# - Performance: slightly better for large constant sets
```

## Common Patterns

```python
# Pattern 1: Protect data while allowing operations
def get_admin_ids():
    """Return admin IDs that cannot be modified"""
    return frozenset([1, 2, 3, 4, 5])

# Users can check membership but not modify
ADMIN_IDS = get_admin_ids()
if user_id in ADMIN_IDS:
    print("Admin access")

# Pattern 2: Set arithmetic with guarantees
base_permissions = frozenset(["read"])
admin_permissions = base_permissions | frozenset(["write", "delete"])
# base_permissions unchanged

# Pattern 3: Dict with set keys
permission_matrix = {
    frozenset(["admin"]): ["read", "write", "delete"],
    frozenset(["editor"]): ["read", "write"],
    frozenset(["viewer"]): ["read"]
}

# Pattern 4: Convert for modification, then freeze
working_set = {1, 2, 3}
working_set.add(4)
working_set.remove(1)
final_set = frozenset(working_set)  # Lock it
```

## Summary

**frozenset Characteristics:**
- ✅ Immutable (cannot add/remove elements)
- ✅ Hashable (can be dict key or in sets)
- ✅ All read-only operations available
- ✅ Slightly more memory efficient
- ❌ Cannot be modified after creation

**Use frozenset When:**
- Need as dictionary key
- Need in another set
- Want immutability guarantee
- Defining constants
- Protecting data integrity

**Use set When:**
- Need to add/remove elements
- Building collection dynamically
- Temporary working data
- No need for hashability

**Key Difference:**
```python
# set: mutable, unhashable
s = {1, 2, 3}
s.add(4)  # OK

# frozenset: immutable, hashable
fs = frozenset([1, 2, 3])
# fs.add(4)  # Error!
d = {fs: "value"}  # OK - can be dict key
```
