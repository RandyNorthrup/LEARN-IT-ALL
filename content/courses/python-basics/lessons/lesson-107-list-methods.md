---
id: list-methods
title: List Methods
chapterId: ch8-lists
order: 34
duration: 30
objectives:
  - Add elements with append(), insert(), and extend()
  - Remove elements with remove(), pop(), and clear()
  - Find elements with index() and count()
  - Sort and reverse lists
  - Work with list methods effectively
---

# List Methods

Python lists have powerful built-in methods that let you add, remove, find, sort, and manipulate list data. Mastering these methods is essential for effective list manipulation.

## Adding Elements

### append() - Add to End

The `append()` method adds a single element to the **end** of the list.

```python
fruits = ["apple", "banana"]

# Add to end
fruits.append("cherry")
print(fruits)  # ["apple", "banana", "cherry"]

fruits.append("date")
print(fruits)  # ["apple", "banana", "cherry", "date"]

# Append modifies the original list
numbers = [1, 2, 3]
numbers.append(4)
print(numbers)  # [1, 2, 3, 4]
```

### insert() - Add at Specific Position

The `insert()` method adds an element at a **specific index**.

```python
fruits = ["apple", "cherry"]

# Insert at index 1
fruits.insert(1, "banana")
print(fruits)  # ["apple", "banana", "cherry"]

# Insert at beginning
numbers = [2, 3, 4]
numbers.insert(0, 1)
print(numbers)  # [1, 2, 3, 4]

# Insert at end (like append)
fruits.insert(len(fruits), "date")
print(fruits)  # ["apple", "banana", "cherry", "date"]
```

### extend() - Add Multiple Elements

The `extend()` method adds **all elements from another list**.

```python
fruits = ["apple", "banana"]
more_fruits = ["cherry", "date"]

# Extend with another list
fruits.extend(more_fruits)
print(fruits)  # ["apple", "banana", "cherry", "date"]

# Extend vs append
list1 = [1, 2]
list2 = [3, 4]

# extend adds each element
list1.extend(list2)
print(list1)  # [1, 2, 3, 4]

# append adds the entire list as single element
list3 = [1, 2]
list3.append([3, 4])
print(list3)  # [1, 2, [3, 4]]
```

## Removing Elements

### remove() - Remove by Value

The `remove()` method removes the **first occurrence** of a value.

```python
fruits = ["apple", "banana", "cherry", "banana"]

# Remove first "banana"
fruits.remove("banana")
print(fruits)  # ["apple", "cherry", "banana"]

# Remove value that exists
numbers = [1, 2, 3, 4, 5]
numbers.remove(3)
print(numbers)  # [1, 2, 4, 5]

# Error if value doesn't exist
# fruits.remove("grape")  # ValueError: list.remove(x): x not in list

# Safe removal
item = "grape"
if item in fruits:
    fruits.remove(item)
```

### pop() - Remove by Index

The `pop()` method removes and **returns** an element at a specific index. Default is the last element.

```python
fruits = ["apple", "banana", "cherry"]

# Pop last element
last = fruits.pop()
print(last)    # "cherry"
print(fruits)  # ["apple", "banana"]

# Pop specific index
first = fruits.pop(0)
print(first)   # "apple"
print(fruits)  # ["banana"]

# Pop and use value
numbers = [10, 20, 30, 40]
value = numbers.pop(1)  # Remove index 1
print(f"Removed: {value}")  # Removed: 20
print(numbers)  # [10, 30, 40]
```

### clear() - Remove All Elements

The `clear()` method removes **all elements** from the list.

```python
fruits = ["apple", "banana", "cherry"]

# Clear all elements
fruits.clear()
print(fruits)  # []
print(len(fruits))  # 0

# Equivalent to fruits = [] but modifies in place
```

## Finding Elements

### index() - Find Position

The `index()` method returns the **index of the first occurrence** of a value.

```python
fruits = ["apple", "banana", "cherry", "banana"]

# Find index
position = fruits.index("banana")
print(position)  # 1 (first occurrence)

# Find from specific start position
position = fruits.index("banana", 2)  # Start searching from index 2
print(position)  # 3

# Error if not found
# fruits.index("grape")  # ValueError: 'grape' is not in list

# Safe search
item = "grape"
if item in fruits:
    position = fruits.index(item)
else:
    position = -1  # Not found
```

### count() - Count Occurrences

The `count()` method returns how many times a value appears.

```python
numbers = [1, 2, 3, 2, 4, 2, 5]

# Count occurrences
count = numbers.count(2)
print(count)  # 3

# Count returns 0 if not found
count = numbers.count(10)
print(count)  # 0

# Check for duplicates
fruits = ["apple", "banana", "apple", "cherry"]
if fruits.count("apple") > 1:
    print("Duplicate apples found!")
```

## Sorting and Reversing

### sort() - Sort in Place

The `sort()` method sorts the list **in place** (modifies original).

```python
numbers = [3, 1, 4, 1, 5, 9, 2]

# Sort ascending (default)
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 9]

# Sort descending
numbers.sort(reverse=True)
print(numbers)  # [9, 5, 4, 3, 2, 1, 1]

# Sort strings alphabetically
fruits = ["cherry", "apple", "banana"]
fruits.sort()
print(fruits)  # ["apple", "banana", "cherry"]
```

### sorted() - Return Sorted Copy

The `sorted()` function returns a **new sorted list** (original unchanged).

```python
numbers = [3, 1, 4, 1, 5]

# Get sorted copy
sorted_numbers = sorted(numbers)
print(sorted_numbers)  # [1, 1, 3, 4, 5]
print(numbers)         # [3, 1, 4, 1, 5] - unchanged

# Sort descending
sorted_desc = sorted(numbers, reverse=True)
print(sorted_desc)  # [5, 4, 3, 1, 1]
```

### reverse() - Reverse in Place

The `reverse()` method reverses the list **in place**.

```python
numbers = [1, 2, 3, 4, 5]

# Reverse the list
numbers.reverse()
print(numbers)  # [5, 4, 3, 2, 1]

# Reverse strings
fruits = ["apple", "banana", "cherry"]
fruits.reverse()
print(fruits)  # ["cherry", "banana", "apple"]
```

## Practical Examples

### Example 1: Task Manager
```python
tasks = []

# Add tasks
tasks.append("Buy groceries")
tasks.append("Call dentist")
tasks.insert(0, "Pay bills")  # Urgent - add to front

print(f"Tasks: {tasks}")

# Complete a task
if "Buy groceries" in tasks:
    tasks.remove("Buy groceries")
    print("Task completed!")

# Remove last task
if len(tasks) > 0:
    completed = tasks.pop()
    print(f"Completed: {completed}")
```

### Example 2: High Scores
```python
scores = [250, 180, 320, 290, 100]

# Sort to find top scores
scores.sort(reverse=True)
print(f"Top 3 scores: {scores[:3]}")

# Add new score
new_score = 275
scores.append(new_score)
scores.sort(reverse=True)

# Find ranking
position = scores.index(new_score)
print(f"Your score ranks #{position + 1}")
```

### Example 3: Inventory Management
```python
inventory = ["apple", "banana", "cherry"]

# Add new items
inventory.extend(["date", "elderberry"])

# Check stock
item = "banana"
count = inventory.count(item)
print(f"We have {count} {item}(s) in stock")

# Remove sold items
if "apple" in inventory:
    inventory.remove("apple")
    print("Sold 1 apple")

# Sort for display
inventory.sort()
print(f"Current inventory: {inventory}")
```

### Example 4: Remove Duplicates
```python
numbers = [1, 2, 3, 2, 4, 3, 5, 1]

# Remove duplicates (keep first occurrence)
unique = []
for num in numbers:
    if num not in unique:
        unique.append(num)

print(unique)  # [1, 2, 3, 4, 5]

# Alternative using set (loses order)
unique_set = list(set(numbers))
```

### Example 5: Stack Implementation
```python
# Stack (Last In, First Out)
stack = []

# Push items onto stack
stack.append(1)
stack.append(2)
stack.append(3)
print(f"Stack: {stack}")  # [1, 2, 3]

# Pop items from stack
while len(stack) > 0:
    item = stack.pop()
    print(f"Popped: {item}")
```

### Example 6: Queue Implementation
```python
# Queue (First In, First Out)
queue = []

# Enqueue items
queue.append("Alice")
queue.append("Bob")
queue.append("Charlie")

# Dequeue items
while len(queue) > 0:
    person = queue.pop(0)  # Remove from front
    print(f"Serving: {person}")
```

## Method Summary

| Method | Description | Modifies List? | Returns |
|--------|-------------|----------------|---------|
| `append(x)` | Add x to end | Yes | None |
| `insert(i, x)` | Add x at index i | Yes | None |
| `extend(iterable)` | Add all items | Yes | None |
| `remove(x)` | Remove first x | Yes | None |
| `pop(i)` | Remove item at i | Yes | The item |
| `clear()` | Remove all items | Yes | None |
| `index(x)` | Find position of x | No | Index |
| `count(x)` | Count occurrences | No | Count |
| `sort()` | Sort in place | Yes | None |
| `reverse()` | Reverse in place | Yes | None |

## Common Mistakes

### Mistake 1: Using append() for multiple items
```python
# ❌ Wrong - appends entire list as single element
numbers = [1, 2]
numbers.append([3, 4])  # [1, 2, [3, 4]]

# ✅ Correct - use extend()
numbers = [1, 2]
numbers.extend([3, 4])  # [1, 2, 3, 4]
```

### Mistake 2: Not checking before remove()
```python
# ❌ Wrong - might raise ValueError
# fruits.remove("grape")

# ✅ Correct - check first
if "grape" in fruits:
    fruits.remove("grape")
```

### Mistake 3: Using sort() return value
```python
# ❌ Wrong - sort() returns None
numbers = [3, 1, 2]
sorted_nums = numbers.sort()  # sorted_nums is None!

# ✅ Correct - sort modifies in place
numbers.sort()
print(numbers)  # [1, 2, 3]

# Or use sorted() to get new list
sorted_nums = sorted(numbers)
```

## Key Takeaways

- **append()** adds single element to end
- **insert()** adds element at specific position
- **extend()** adds multiple elements from another list
- **remove()** removes first occurrence of value
- **pop()** removes and returns element (default: last)
- **clear()** removes all elements
- **index()** finds position of value
- **count()** counts occurrences of value
- **sort()** sorts in place (modifies original)
- **reverse()** reverses in place (modifies original)

All methods except `pop()`, `index()`, and `count()` return `None` - they modify the list in place!

## Practice

Try these exercises:
1. Create a shopping list and add/remove items using different methods
2. Build a to-do list that allows inserting urgent tasks at the beginning
3. Implement a simple high score system with sorting
4. Remove all duplicates from a list while maintaining order
