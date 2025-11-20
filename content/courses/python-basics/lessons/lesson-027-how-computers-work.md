---
id: how-computers-work
title: How Computers Work
chapterId: ch3-computing
order: 1
duration: 25
objectives:
  - Understand basic computer architecture
  - Learn how CPUs execute instructions
  - Understand memory and storage
  - Learn about binary and data representation
---

# How Computers Work

Understanding how computers work helps you write better, more efficient code.

## Basic Computer Architecture

A computer has four main components:

### 1. CPU (Central Processing Unit)

The "brain" that executes instructions:

```
CPU Components:
- Control Unit: Directs operations
- ALU (Arithmetic Logic Unit): Does math/logic
- Registers: Ultra-fast temporary storage
- Cache: Fast memory close to CPU
```

### 2. Memory (RAM)

Temporary storage while programs run:

```
RAM Characteristics:
- Fast access (nanoseconds)
- Volatile (data lost when power off)
- Limited size (4GB, 8GB, 16GB, etc.)
- Stores running programs and data
```

### 3. Storage (Hard Drive/SSD)

Permanent data storage:

```
Storage Characteristics:
- Slower than RAM (milliseconds)
- Non-volatile (keeps data when off)
- Large capacity (500GB, 1TB, etc.)
- Stores files, programs, OS
```

### 4. Input/Output Devices

Keyboard, mouse, screen, network, etc.

## How a Program Runs

### Step 1: Load Program

```
Storage (Hard Drive) → Memory (RAM) → CPU
```

When you run a Python script:
1. Python interpreter loaded from storage to RAM
2. Your script loaded from storage to RAM
3. CPU fetches instructions from RAM

### Step 2: Fetch-Decode-Execute Cycle

The CPU continuously:

```
1. FETCH: Get next instruction from memory
2. DECODE: Figure out what instruction means
3. EXECUTE: Perform the operation
4. REPEAT
```

Example - Python code `x = 5 + 3`:

```
1. FETCH: Get instruction "add 5 and 3"
2. DECODE: Identify this is addition
3. EXECUTE: ALU adds 5 + 3 = 8
4. STORE: Put result (8) in memory location for 'x'
```

### Step 3: Memory Management

Python manages memory for you:

```python
x = 10  # Python allocates memory, stores 10
y = 20  # Allocates more memory, stores 20
z = x + y  # Allocates memory for result (30)
```

Behind the scenes:
```
Memory Address | Value | Variable
0x1000        | 10    | x
0x1004        | 20    | y
0x1008        | 30    | z
```

## Binary and Data Representation

### Binary Basics

Computers store everything as 0s and 1s:

```
Decimal → Binary
0       → 0000
1       → 0001
2       → 0010
3       → 0011
4       → 0100
5       → 0101
10      → 1010
255     → 11111111
```

### Bits and Bytes

```
1 bit  = 0 or 1
1 byte = 8 bits
1 KB   = 1,024 bytes
1 MB   = 1,024 KB
1 GB   = 1,024 MB
1 TB   = 1,024 GB
```

### How Python Integers Work

```python
# Python stores integers in binary
x = 42

# In binary: 101010
# In memory: stored as bytes
```

Python can handle arbitrarily large integers:

```python
big = 123456789012345678901234567890
# Python automatically allocates enough memory
```

### How Strings Work

Characters are stored as numbers (ASCII/Unicode):

```python
# ASCII values
'A' → 65
'a' → 97
'0' → 48
' ' → 32

text = "Hi"
# 'H' → 72, 'i' → 105
# Stored as: [72, 105] in memory
```

## CPU Speed and Performance

### Clock Speed

CPUs run at billions of cycles per second:

```
1 Hz    = 1 cycle per second
1 MHz   = 1 million cycles per second
1 GHz   = 1 billion cycles per second

Modern CPUs: 2-4 GHz
= 2-4 billion operations per second!
```

### Why Some Code is Faster

```python
# Slow - checks every element
def find_in_list(items, target):
    for item in items:
        if item == target:
            return True
    return False

# Fast - direct lookup
def find_in_set(items, target):
    return target in items  # Set uses hash table
```

The difference:
- List: O(n) - might check all n items
- Set: O(1) - direct memory lookup

## Memory Management

### Variables and Memory

```python
x = 10          # Allocate memory for integer
name = "Alice"  # Allocate memory for string
items = [1, 2]  # Allocate memory for list
```

Memory layout:
```
Variable | Memory Address | Value
x        | 0x1000        | 10
name     | 0x1004        | pointer → "Alice" at 0x2000
items    | 0x1008        | pointer → [1,2] at 0x3000
```

### References vs Copies

```python
# Both variables point to same object
a = [1, 2, 3]
b = a  # b points to same list as a

b.append(4)
print(a)  # [1, 2, 3, 4] - a changed too!

# Create copy
c = a.copy()
c.append(5)
print(a)  # [1, 2, 3, 4] - a unchanged
```

## Practical Implications

### Implication 1: Memory Limits

```python
# ❌ Can crash if runs out of memory
huge_list = [0] * 10_000_000_000  # 10 billion zeros

# ✅ Better - use generator (memory efficient)
def generate_zeros():
    for i in range(10_000_000_000):
        yield 0
```

### Implication 2: CPU Optimization

```python
# ❌ Slow - repeated calculation
def calculate_area(shapes):
    areas = []
    for shape in shapes:
        areas.append(shape.width * shape.height)
    return areas

# ✅ Faster - list comprehension (optimized)
def calculate_area_fast(shapes):
    return [s.width * s.height for s in shapes]
```

### Implication 3: Cache Locality

```python
# ❌ Slower - jumps around in memory
def sum_columns(matrix):
    total = 0
    for col in range(len(matrix[0])):
        for row in range(len(matrix)):
            total += matrix[row][col]
    return total

# ✅ Faster - sequential memory access
def sum_rows(matrix):
    total = 0
    for row in matrix:
        for val in row:
            total += val
    return total
```

## How Python Runs Your Code

### Step 1: Parse

Python reads your code:

```python
x = 5 + 3
```

Parsed into abstract syntax tree (AST):
```
Assignment
  ├─ Variable: x
  └─ BinaryOp: +
      ├─ Constant: 5
      └─ Constant: 3
```

### Step 2: Compile to Bytecode

Python converts to bytecode:

```python
import dis

def add_numbers():
    x = 5 + 3
    return x

dis.dis(add_numbers)
```

Output (simplified):
```
LOAD_CONST    5
LOAD_CONST    3
BINARY_ADD
STORE_NAME    x
LOAD_NAME     x
RETURN_VALUE
```

### Step 3: Execute

Python interpreter runs bytecode on CPU.

## Why Python is "Slow"

Python trades speed for convenience:

```
C/C++:
- Compiled directly to machine code
- No runtime overhead
- ~100x faster than Python

Python:
- Interpreted (bytecode + interpreter)
- Dynamic typing checks
- Automatic memory management
- ~100x slower BUT easier to write
```

When speed matters, use optimized libraries:

```python
import numpy as np  # Written in C, fast

# Slow pure Python
def sum_list(items):
    total = 0
    for item in items:
        total += item
    return total

# Fast NumPy (C under the hood)
items = np.array([1, 2, 3, 4, 5])
total = np.sum(items)
```

## Practical Examples

### Example 1: Memory Profiling

```python
import sys

# Check memory size of objects
x = 10
print(f"int: {sys.getsizeof(x)} bytes")

text = "Hello"
print(f"string: {sys.getsizeof(text)} bytes")

items = [1, 2, 3, 4, 5]
print(f"list: {sys.getsizeof(items)} bytes")
```

### Example 2: Timing Code

```python
import time

def slow_concatenation(n):
    result = ""
    for i in range(n):
        result += str(i)  # Creates new string each time
    return result

def fast_concatenation(n):
    parts = []
    for i in range(n):
        parts.append(str(i))  # Append to list
    return "".join(parts)  # Join once

# Time them
start = time.time()
slow_concatenation(10000)
print(f"Slow: {time.time() - start:.3f}s")

start = time.time()
fast_concatenation(10000)
print(f"Fast: {time.time() - start:.3f}s")
```

### Example 3: Understanding References

```python
# Numbers are immutable - no surprises
a = 10
b = a
b = 20
print(a)  # 10 (unchanged)

# Lists are mutable - can cause bugs!
list1 = [1, 2, 3]
list2 = list1  # Same object!
list2.append(4)
print(list1)  # [1, 2, 3, 4] - changed!

# Use copy to avoid
list3 = list1.copy()
list3.append(5)
print(list1)  # [1, 2, 3, 4] - unchanged
```

## Key Takeaways

- Computers have **CPU**, **RAM**, **Storage**, and **I/O**
- CPU uses **fetch-decode-execute** cycle
- Everything stored as **binary** (0s and 1s)
- **Memory** is fast but temporary, **storage** is permanent but slower
- Python trades **speed** for **ease of use**
- Understanding computer architecture helps write **efficient code**
- **Memory references** can cause unexpected behavior with mutable objects

## What's Next?

You've learned how computers work! Next chapter, we'll dive into **comparisons and conditional logic**.
