---
id: "135-set-operations-mathematical"
title: "Set Operations: Mathematical Foundations"
chapterId: ch10-sets
order: 2
duration: 30
objectives:
  - Master union, intersection, difference operations
  - Understand symmetric difference
  - Learn subset and superset relationships
  - Apply mathematical set theory in Python
---

# Set Operations: Mathematical Foundations

Mastering mathematical set operations for powerful data manipulation.

## Union: Combining Sets (|)

```python
# Union: all unique elements from all sets
set_a = {1, 2, 3}
set_b = {3, 4, 5}

# Operator |
union = set_a | set_b
print(union)  # {1, 2, 3, 4, 5}

# Method .union()
union = set_a.union(set_b)
print(union)  # {1, 2, 3, 4, 5}

# Multiple sets
set_c = {5, 6, 7}
set_d = {7, 8, 9}

# With operator
union_all = set_a | set_b | set_c | set_d
print(union_all)  # {1, 2, 3, 4, 5, 6, 7, 8, 9}

# With method
union_all = set_a.union(set_b, set_c, set_d)
print(union_all)  # {1, 2, 3, 4, 5, 6, 7, 8, 9}

# Union with empty set
empty = set()
result = set_a | empty
print(result)  # {1, 2, 3}

# Union is commutative: A | B == B | A
print(set_a | set_b == set_b | set_a)  # True

# Union with itself
print(set_a | set_a == set_a)  # True (idempotent)
```

## Union with Different Iterables

```python
numbers = {1, 2, 3}

# Union with list
result = numbers.union([3, 4, 5])
print(result)  # {1, 2, 3, 4, 5}

# Union with tuple
result = numbers.union((4, 5, 6))
print(result)  # {1, 2, 3, 4, 5, 6}

# Union with string (each character)
result = numbers.union("abc")
print(result)  # {1, 2, 3, 'a', 'b', 'c'}

# Multiple different iterables
result = numbers.union([4, 5], (6, 7), "89")
print(result)  # {1, 2, 3, 4, 5, 6, 7, '8', '9'}

# Note: | operator ONLY works with sets
# numbers | [4, 5]  # TypeError
```

## Intersection: Common Elements (&)

```python
# Intersection: elements in ALL sets
set_a = {1, 2, 3, 4, 5}
set_b = {3, 4, 5, 6, 7}

# Operator &
intersection = set_a & set_b
print(intersection)  # {3, 4, 5}

# Method .intersection()
intersection = set_a.intersection(set_b)
print(intersection)  # {3, 4, 5}

# Multiple sets
set_c = {4, 5, 6, 8}
set_d = {5, 6, 7, 9}

# Only elements in ALL sets
common_all = set_a & set_b & set_c & set_d
print(common_all)  # {5}

# With method
common_all = set_a.intersection(set_b, set_c, set_d)
print(common_all)  # {5}

# No common elements
set_x = {1, 2, 3}
set_y = {4, 5, 6}
print(set_x & set_y)  # set() (empty)

# Intersection with empty set
empty = set()
result = set_a & empty
print(result)  # set() (empty)

# Intersection is commutative: A & B == B & A
print(set_a & set_b == set_b & set_a)  # True
```

## Difference: Elements Not in Other Set (-)

```python
# Difference: in A but not in B
set_a = {1, 2, 3, 4, 5}
set_b = {3, 4, 5, 6, 7}

# Operator -
diff = set_a - set_b
print(diff)  # {1, 2}

# Method .difference()
diff = set_a.difference(set_b)
print(diff)  # {1, 2}

# ORDER MATTERS! (not commutative)
diff_reversed = set_b - set_a
print(diff_reversed)  # {6, 7}

print(set_a - set_b == set_b - set_a)  # False

# Multiple sets: remove elements in any of the others
set_c = {1, 6}
result = set_a - set_b - set_c
print(result)  # {2}

# With method
result = set_a.difference(set_b, set_c)
print(result)  # {2}

# Difference with empty set
empty = set()
result = set_a - empty
print(result)  # {1, 2, 3, 4, 5} (unchanged)

# Difference with itself
result = set_a - set_a
print(result)  # set() (empty)
```

## Symmetric Difference: Elements in Either But Not Both (^)

```python
# Symmetric difference: in A or B but not both
set_a = {1, 2, 3, 4, 5}
set_b = {3, 4, 5, 6, 7}

# Operator ^
sym_diff = set_a ^ set_b
print(sym_diff)  # {1, 2, 6, 7}

# Method .symmetric_difference()
sym_diff = set_a.symmetric_difference(set_b)
print(sym_diff)  # {1, 2, 6, 7}

# Equivalent to: (A - B) | (B - A)
equivalent = (set_a - set_b) | (set_b - set_a)
print(equivalent)  # {1, 2, 6, 7}
print(sym_diff == equivalent)  # True

# Symmetric difference is commutative: A ^ B == B ^ A
print(set_a ^ set_b == set_b ^ set_a)  # True

# With multiple sets (XOR chain)
set_c = {1, 5, 8}
result = set_a ^ set_b ^ set_c
print(result)  # Elements in odd number of sets

# Symmetric difference with empty set
empty = set()
result = set_a ^ empty
print(result)  # {1, 2, 3, 4, 5} (unchanged)

# Symmetric difference with itself
result = set_a ^ set_a
print(result)  # set() (empty)
```

## Subset: Is A Contained in B? (<=)

```python
# Subset: all elements of A are in B
set_a = {1, 2, 3}
set_b = {1, 2, 3, 4, 5}
set_c = {1, 2, 3}
set_d = {4, 5, 6}

# Operator <=
print(set_a <= set_b)  # True (A is subset of B)
print(set_b <= set_a)  # False (B is not subset of A)
print(set_a <= set_c)  # True (equal sets are subsets)

# Method .issubset()
print(set_a.issubset(set_b))  # True
print(set_a.issubset(set_d))  # False (no overlap)

# Proper subset: subset but not equal (<)
print(set_a < set_b)   # True (proper subset)
print(set_a < set_c)   # False (equal)

# Empty set is subset of all sets
empty = set()
print(empty <= set_a)  # True
print(empty < set_a)   # True (proper)

# Every set is subset of itself
print(set_a <= set_a)  # True
print(set_a < set_a)   # False (not proper)
```

## Superset: Does A Contain B? (>=)

```python
# Superset: all elements of B are in A
set_a = {1, 2, 3, 4, 5}
set_b = {1, 2, 3}
set_c = {1, 2, 3, 4, 5}

# Operator >=
print(set_a >= set_b)  # True (A is superset of B)
print(set_b >= set_a)  # False (B is not superset of A)
print(set_a >= set_c)  # True (equal sets are supersets)

# Method .issuperset()
print(set_a.issuperset(set_b))  # True
print(set_b.issuperset(set_a))  # False

# Proper superset: superset but not equal (>)
print(set_a > set_b)   # True (proper superset)
print(set_a > set_c)   # False (equal)

# Every set is superset of empty set
empty = set()
print(set_a >= empty)  # True
print(set_a > empty)   # True (proper)

# Every set is superset of itself
print(set_a >= set_a)  # True
print(set_a > set_a)   # False (not proper)

# Relationship: A <= B is equivalent to B >= A
print((set_b <= set_a) == (set_a >= set_b))  # True
```

## Disjoint: No Common Elements

```python
# Disjoint: sets have no elements in common
set_a = {1, 2, 3}
set_b = {4, 5, 6}
set_c = {3, 4, 5}

# Method .isdisjoint()
print(set_a.isdisjoint(set_b))  # True (no overlap)
print(set_a.isdisjoint(set_c))  # False (3 is common)

# Equivalent to checking empty intersection
print((set_a & set_b) == set())  # True
print(set_a.isdisjoint(set_b) == (len(set_a & set_b) == 0))  # True

# Empty set is disjoint with all sets
empty = set()
print(empty.isdisjoint(set_a))  # True

# Set is disjoint with empty set
print(set_a.isdisjoint(empty))  # True
```

## In-Place Operations

```python
# Regular operations create new sets
set_a = {1, 2, 3}
set_b = {3, 4, 5}
result = set_a | set_b  # New set
print(id(result) != id(set_a))  # True (different object)

# In-place operations modify original set

# |= (update) - add elements from other sets
set_a = {1, 2, 3}
set_a |= {3, 4, 5}
print(set_a)  # {1, 2, 3, 4, 5}

# Or use .update()
set_a = {1, 2, 3}
set_a.update({3, 4, 5})
print(set_a)  # {1, 2, 3, 4, 5}

# &= (intersection_update) - keep only common elements
set_a = {1, 2, 3, 4, 5}
set_a &= {3, 4, 5, 6, 7}
print(set_a)  # {3, 4, 5}

# Or use .intersection_update()
set_a = {1, 2, 3, 4, 5}
set_a.intersection_update({3, 4, 5, 6, 7})
print(set_a)  # {3, 4, 5}

# -= (difference_update) - remove elements
set_a = {1, 2, 3, 4, 5}
set_a -= {3, 4, 5}
print(set_a)  # {1, 2}

# Or use .difference_update()
set_a = {1, 2, 3, 4, 5}
set_a.difference_update({3, 4, 5})
print(set_a)  # {1, 2}

# ^= (symmetric_difference_update)
set_a = {1, 2, 3, 4, 5}
set_a ^= {3, 4, 5, 6, 7}
print(set_a)  # {1, 2, 6, 7}

# Or use .symmetric_difference_update()
set_a = {1, 2, 3, 4, 5}
set_a.symmetric_difference_update({3, 4, 5, 6, 7})
print(set_a)  # {1, 2, 6, 7}
```

## Practical Examples

```python
# Example 1: Find users in multiple groups
admins = {"alice", "bob", "charlie"}
moderators = {"bob", "david", "eve"}
users = {"alice", "bob", "frank", "grace"}

# All privileged users (union)
privileged = admins | moderators
print(f"Privileged: {privileged}")

# Users who are both admin and moderator (intersection)
super_users = admins & moderators
print(f"Super users: {super_users}")  # {"bob"}

# Admins who are not moderators (difference)
admin_only = admins - moderators
print(f"Admin only: {admin_only}")  # {"alice", "charlie"}

# Regular users (not privileged)
regular_users = users - privileged
print(f"Regular: {regular_users}")  # {"frank", "grace"}

# Example 2: Tag filtering
post1_tags = {"python", "programming", "tutorial"}
post2_tags = {"python", "web", "flask"}
post3_tags = {"javascript", "web", "tutorial"}

# All tags used
all_tags = post1_tags | post2_tags | post3_tags
print(f"All tags: {all_tags}")

# Tags in all posts
common_tags = post1_tags & post2_tags & post3_tags
print(f"Common tags: {common_tags}")  # set() (empty)

# Tags unique to post1
unique_to_post1 = post1_tags - post2_tags - post3_tags
print(f"Unique to post1: {unique_to_post1}")  # {"programming"}

# Example 3: Permission checking
required_permissions = {"read", "write"}
user_permissions = {"read", "write", "execute"}
admin_permissions = {"read", "write", "execute", "delete", "admin"}

# Check if user has all required permissions
has_required = required_permissions <= user_permissions
print(f"Has required: {has_required}")  # True

# Check if user has admin permissions
is_admin = admin_permissions <= user_permissions
print(f"Is admin: {is_admin}")  # False

# Missing permissions
missing = required_permissions - user_permissions
print(f"Missing: {missing}")  # set() (none)

# Example 4: Course prerequisites
course_a_prereqs = {"math101", "cs101"}
course_b_prereqs = {"math101", "phys101"}
student_completed = {"math101", "cs101", "eng101"}

# Can take course A?
can_take_a = course_a_prereqs <= student_completed
print(f"Can take course A: {can_take_a}")  # True

# Can take course B?
can_take_b = course_b_prereqs <= student_completed
print(f"Can take course B: {can_take_b}")  # False

# Courses student can take
available_courses = []
for course, prereqs in [("A", course_a_prereqs), ("B", course_b_prereqs)]:
    if prereqs <= student_completed:
        available_courses.append(course)
print(f"Available: {available_courses}")  # ["A"]

# Example 5: Data validation
valid_statuses = {"pending", "approved", "rejected"}
current_statuses = {"pending", "approved", "processing"}

# Check for invalid statuses
invalid = current_statuses - valid_statuses
if invalid:
    print(f"Invalid statuses: {invalid}")  # {"processing"}

# Check if all statuses are valid
all_valid = current_statuses <= valid_statuses
print(f"All valid: {all_valid}")  # False
```

## Set Algebra Properties

```python
# Commutativity
set_a = {1, 2, 3}
set_b = {3, 4, 5}

print(set_a | set_b == set_b | set_a)  # True (union)
print(set_a & set_b == set_b & set_a)  # True (intersection)
print(set_a ^ set_b == set_b ^ set_a)  # True (symmetric diff)
print(set_a - set_b == set_b - set_a)  # False (difference)

# Associativity
set_c = {5, 6, 7}

print((set_a | set_b) | set_c == set_a | (set_b | set_c))  # True (union)
print((set_a & set_b) & set_c == set_a & (set_b & set_c))  # True (intersection)

# Identity
empty = set()
print(set_a | empty == set_a)  # True (union identity)
print(set_a & set_a == set_a)  # True (intersection identity)

# De Morgan's Laws
universe = set(range(10))
complement_a = universe - set_a
complement_b = universe - set_b

# ¬(A ∪ B) = ¬A ∩ ¬B
demorgan1 = (universe - (set_a | set_b)) == (complement_a & complement_b)
print(f"De Morgan's 1: {demorgan1}")  # True

# ¬(A ∩ B) = ¬A ∪ ¬B
demorgan2 = (universe - (set_a & set_b)) == (complement_a | complement_b)
print(f"De Morgan's 2: {demorgan2}")  # True
```

## Summary

**Set Operations:**

| Operation | Operator | Method | Description |
|-----------|----------|--------|-------------|
| Union | `\|` | `.union()` | All elements from all sets |
| Intersection | `&` | `.intersection()` | Elements in all sets |
| Difference | `-` | `.difference()` | In first but not others |
| Symmetric Diff | `^` | `.symmetric_difference()` | In either but not both |
| Subset | `<=` | `.issubset()` | All of A in B |
| Proper Subset | `<` | - | A ⊂ B but A ≠ B |
| Superset | `>=` | `.issuperset()` | All of B in A |
| Proper Superset | `>` | - | A ⊃ B but A ≠ B |
| Disjoint | - | `.isdisjoint()` | No common elements |

**In-Place Operations:**
- `|=` or `.update()` - union
- `&=` or `.intersection_update()` - intersection
- `-=` or `.difference_update()` - difference
- `^=` or `.symmetric_difference_update()` - symmetric difference

**Properties:**
- Union and intersection are commutative and associative
- Difference is NOT commutative
- Empty set is subset of all sets
- Every set is subset/superset of itself
