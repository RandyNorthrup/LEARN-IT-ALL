---
id: "74-memory-ram"
title: "Memory and RAM"
chapterId: ch3-computing
order: 5
duration: 25
objectives:
  - Understand what RAM is and how it works
  - Learn the difference between volatile and persistent storage
  - Recognize memory addressing and organization
  - Understand memory hierarchy and access speeds
  - Relate memory concepts to Python program execution
---

# Memory and RAM

Random Access Memory (RAM) is the computer's short-term memory where active programs and data are stored. Understanding RAM helps you write programs that use memory efficiently.

## What is RAM?

RAM is temporary storage that the CPU can quickly read from and write to:

```python
# When you create a variable, it's stored in RAM
name = "Alice"
age = 30
numbers = [1, 2, 3, 4, 5]

# All these values exist in RAM right now
# When the program ends, RAM is cleared (volatile memory)

print(f"Variable 'name' is stored at memory address: {hex(id(name))}")
print(f"Variable 'age' is stored at memory address: {hex(id(age))}")
print(f"List 'numbers' is stored at memory address: {hex(id(numbers))}")

# Variable 'name' is stored at memory address: 0x102a4f8b0
# Variable 'age' is stored at memory address: 0x102a3c790
# List 'numbers' is stored at memory address: 0x102b5d880
```

## Volatile vs Persistent Storage

```python
def explain_storage_types():
    """Explain volatile vs persistent storage."""
    storage_types = {
        "RAM (Volatile)": {
            "Speed": "Very fast (nanoseconds)",
            "Size": "8-64 GB typical",
            "Persistence": "Lost when power off",
            "Use": "Running programs and active data",
            "Cost": "Expensive per GB"
        },
        "SSD/HDD (Persistent)": {
            "Speed": "Slower (microseconds to milliseconds)",
            "Size": "256 GB - 4 TB typical",
            "Persistence": "Keeps data when power off",
            "Use": "Files, programs, operating system",
            "Cost": "Cheaper per GB"
        }
    }
    
    for storage_type, properties in storage_types.items():
        print(f"\n{storage_type}:")
        for prop, value in properties.items():
            print(f"  {prop}: {value}")

explain_storage_types()
# RAM (Volatile):
#   Speed: Very fast (nanoseconds)
#   Size: 8-64 GB typical
#   Persistence: Lost when power off
#   Use: Running programs and active data
#   Cost: Expensive per GB
#
# SSD/HDD (Persistent):
#   Speed: Slower (microseconds to milliseconds)
#   Size: 256 GB - 4 TB typical
#   Persistence: Keeps data when power off
#   Use: Files, programs, operating system
#   Cost: Cheaper per GB

# Demonstration: RAM is cleared when program ends
temp_data = [0] * 1_000_000  # 1 million zeros in RAM
print(f"\nCreated list with {len(temp_data):,} items in RAM")
print("This data will disappear when the program ends")
del temp_data  # Explicitly free the memory
print("Memory freed - data is gone")
```

## Memory Addresses

Every byte in RAM has a unique address:

```python
# Memory addressing
class MemorySimulator:
    """Simplified memory simulator."""
    
    def __init__(self, size):
        self.memory = [0] * size  # Initialize memory to zeros
        self.size = size
    
    def write(self, address, value):
        """Write value to memory address."""
        if 0 <= address < self.size:
            self.memory[address] = value
            print(f"WRITE: Address {hex(address)} = {value}")
        else:
            print(f"ERROR: Address {hex(address)} out of bounds")
    
    def read(self, address):
        """Read value from memory address."""
        if 0 <= address < self.size:
            value = self.memory[address]
            print(f"READ: Address {hex(address)} = {value}")
            return value
        else:
            print(f"ERROR: Address {hex(address)} out of bounds")
            return None
    
    def dump(self, start, end):
        """Display memory contents."""
        print(f"\nMemory Dump (addresses {hex(start)} to {hex(end)}):")
        for addr in range(start, min(end + 1, self.size)):
            print(f"  {hex(addr)}: {self.memory[addr]}")

# Simulate memory operations
memory = MemorySimulator(256)  # 256 bytes of memory

# Write to memory
memory.write(0x00, 42)
memory.write(0x01, 100)
memory.write(0x02, 255)

# Read from memory
value = memory.read(0x01)

# Show memory contents
memory.dump(0x00, 0x05)
# WRITE: Address 0x0 = 42
# WRITE: Address 0x1 = 100
# WRITE: Address 0x2 = 255
# READ: Address 0x1 = 100
#
# Memory Dump (addresses 0x0 to 0x5):
#   0x0: 42
#   0x1: 100
#   0x2: 255
#   0x3: 0
#   0x4: 0
#   0x5: 0
```

## Memory Hierarchy

Different types of memory with different speeds:

```python
import sys

def show_memory_hierarchy():
    """Explain the memory hierarchy."""
    hierarchy = [
        ("CPU Registers", "< 1 ns", "Bytes", "Fastest - inside CPU"),
        ("L1 Cache", "~1 ns", "32-64 KB per core", "Very fast - on CPU"),
        ("L2 Cache", "~3 ns", "256-512 KB per core", "Fast - on CPU"),
        ("L3 Cache", "~10 ns", "8-32 MB shared", "Fast - shared by cores"),
        ("RAM", "~100 ns", "8-64 GB", "Main memory"),
        ("SSD", "~100 µs", "256 GB - 2 TB", "Persistent storage"),
        ("HDD", "~10 ms", "1-8 TB", "Slow persistent storage"),
    ]
    
    print("Memory Hierarchy (Fastest to Slowest):")
    print(f"{'Type':<15} {'Speed':<12} {'Size':<20} {'Description'}")
    print("-" * 70)
    
    for mem_type, speed, size, description in hierarchy:
        print(f"{mem_type:<15} {speed:<12} {size:<20} {description}")

show_memory_hierarchy()
# Memory Hierarchy (Fastest to Slowest):
# Type            Speed        Size                 Description
# ----------------------------------------------------------------------
# CPU Registers   < 1 ns       Bytes                Fastest - inside CPU
# L1 Cache        ~1 ns        32-64 KB per core    Very fast - on CPU
# L2 Cache        ~3 ns        256-512 KB per core  Fast - on CPU
# L3 Cache        ~10 ns       8-32 MB shared       Fast - shared by cores
# RAM             ~100 ns      8-64 GB              Main memory
# SSD             ~100 µs      256 GB - 2 TB        Persistent storage
# HDD             ~10 ms       1-8 TB               Slow persistent storage

# Speed comparison
print("\nAccess Time Comparison:")
print("If CPU register access = 1 second:")
print("  L1 Cache   = 1 second")
print("  L2 Cache   = 3 seconds")
print("  L3 Cache   = 10 seconds")
print("  RAM        = 2 minutes")
print("  SSD        = 1 day")
print("  HDD        = 4 months")
```

## How Python Uses RAM

```python
import sys

# Check memory usage of Python objects
def show_object_memory():
    """Show how much RAM different objects use."""
    objects = [
        ("int", 42),
        ("float", 3.14),
        ("str (short)", "hi"),
        ("str (long)", "hello" * 100),
        ("list (empty)", []),
        ("list (small)", [1, 2, 3]),
        ("list (large)", list(range(1000))),
        ("dict (empty)", {}),
        ("dict (small)", {"a": 1, "b": 2}),
    ]
    
    print("Python Object Memory Usage:")
    print(f"{'Object Type':<20} {'Size (bytes)':<15} {'Value'}")
    print("-" * 60)
    
    for obj_type, obj in objects:
        size = sys.getsizeof(obj)
        value_str = str(obj) if len(str(obj)) < 30 else str(obj)[:27] + "..."
        print(f"{obj_type:<20} {size:<15} {value_str}")

show_object_memory()
# Python Object Memory Usage:
# Object Type          Size (bytes)    Value
# ------------------------------------------------------------
# int                  28              42
# float                24              3.14
# str (short)          51              hi
# str (long)           549             hellohellohellohellohell...
# list (empty)         56              []
# list (small)         80              [1, 2, 3]
# list (large)         8056            [0, 1, 2, 3, 4, 5, 6, 7, 8...
# dict (empty)         64              {}
# dict (small)         184             {'a': 1, 'b': 2}

# Python memory management
print("\nPython Memory Management:")
print("  1. Automatic allocation - Python allocates memory for objects")
print("  2. Reference counting - Tracks how many references to each object")
print("  3. Garbage collection - Automatically frees unused memory")
print("  4. Memory pools - Reuses memory for small objects")

# Reference counting example
import sys

my_list = [1, 2, 3]
print(f"\nReference count for my_list: {sys.getrefcount(my_list) - 1}")  # -1 for getrefcount's own reference

another_reference = my_list
print(f"After creating another_reference: {sys.getrefcount(my_list) - 1}")

del another_reference
print(f"After deleting another_reference: {sys.getrefcount(my_list) - 1}")
```

## Memory Allocation

```python
# Demonstrating memory allocation
class MemoryAllocator:
    """Simplified memory allocator."""
    
    def __init__(self, total_memory):
        self.total_memory = total_memory
        self.allocated = {}
        self.free_memory = total_memory
    
    def allocate(self, size, name):
        """Allocate memory block."""
        if size > self.free_memory:
            print(f"ERROR: Not enough memory. Requested: {size} bytes, Available: {self.free_memory} bytes")
            return None
        
        # Simplified: just track size and name
        address = len(self.allocated)
        self.allocated[name] = {"address": address, "size": size}
        self.free_memory -= size
        
        print(f"ALLOCATED: {name} at address {hex(address)}, size {size} bytes")
        print(f"  Free memory: {self.free_memory} / {self.total_memory} bytes")
        return address
    
    def free(self, name):
        """Free allocated memory."""
        if name not in self.allocated:
            print(f"ERROR: {name} not found in allocated memory")
            return
        
        size = self.allocated[name]["size"]
        del self.allocated[name]
        self.free_memory += size
        
        print(f"FREED: {name}, released {size} bytes")
        print(f"  Free memory: {self.free_memory} / {self.total_memory} bytes")
    
    def show_allocation(self):
        """Show current memory allocation."""
        print(f"\nCurrent Memory Allocation:")
        print(f"  Total: {self.total_memory} bytes")
        print(f"  Used: {self.total_memory - self.free_memory} bytes")
        print(f"  Free: {self.free_memory} bytes")
        
        if self.allocated:
            print(f"\n  Allocated blocks:")
            for name, info in self.allocated.items():
                print(f"    {name}: {info['size']} bytes at {hex(info['address'])}")

# Simulate memory allocation
allocator = MemoryAllocator(1024)  # 1 KB of memory

# Allocate memory for variables
allocator.allocate(100, "array_a")
allocator.allocate(200, "array_b")
allocator.allocate(50, "string_x")

allocator.show_allocation()

# Free memory
allocator.free("array_b")

allocator.show_allocation()
```

## Stack vs Heap Memory

```python
def explain_stack_heap():
    """Explain stack and heap memory."""
    print("Stack Memory:")
    print("  - Used for: Function calls, local variables, parameters")
    print("  - Size: Limited (typically 1-8 MB)")
    print("  - Speed: Very fast")
    print("  - Management: Automatic (LIFO - Last In, First Out)")
    print("  - Lifetime: Exists during function execution")
    
    print("\nHeap Memory:")
    print("  - Used for: Dynamic objects, large data structures")
    print("  - Size: Large (limited by available RAM)")
    print("  - Speed: Slower than stack")
    print("  - Management: Manual or garbage collected")
    print("  - Lifetime: Until explicitly freed or garbage collected")

explain_stack_heap()

# Stack memory example
def function_a():
    """Function with local variables on stack."""
    x = 10  # Allocated on stack
    y = 20  # Allocated on stack
    result = x + y  # Allocated on stack
    return result
    # When function returns, x, y, result are automatically removed from stack

value = function_a()  # value stored on stack in caller's frame

# Heap memory example
def create_large_list():
    """Creates list on heap."""
    large_list = [0] * 1_000_000  # Allocated on heap
    return large_list
    # List stays on heap even after function returns
    # Only removed when no references remain (garbage collection)

my_list = create_large_list()  # List is on heap
print(f"List created on heap, size: {len(my_list):,} items")

# Stack overflow example (recursion too deep)
def recursive_function(n):
    """Recursive function that uses stack."""
    if n <= 0:
        return 0
    return n + recursive_function(n - 1)

# Be careful: too much recursion causes stack overflow
# recursive_function(100000)  # This would cause RecursionError (stack overflow)
```

## Memory Fragmentation

```python
class FragmentedMemory:
    """Demonstrate memory fragmentation."""
    
    def __init__(self, size):
        self.memory = [None] * size
        self.size = size
    
    def allocate(self, size, name):
        """Allocate contiguous memory block."""
        # Find first fit
        for start in range(len(self.memory) - size + 1):
            if all(self.memory[i] is None for i in range(start, start + size)):
                # Found space
                for i in range(start, start + size):
                    self.memory[i] = name
                print(f"ALLOCATED: {name} at positions {start}-{start+size-1}")
                return start
        
        print(f"ERROR: Cannot allocate {size} contiguous bytes for {name}")
        return None
    
    def free(self, name):
        """Free all memory for given name."""
        count = 0
        for i in range(len(self.memory)):
            if self.memory[i] == name:
                self.memory[i] = None
                count += 1
        print(f"FREED: {name} ({count} bytes)")
    
    def show_memory(self):
        """Visualize memory."""
        print("\nMemory Layout (. = free, letter = allocated):")
        print("".join(
            "." if block is None else block[0]
            for block in self.memory
        ))
        
        # Calculate fragmentation
        free_blocks = []
        in_free_block = False
        block_size = 0
        
        for block in self.memory:
            if block is None:
                if not in_free_block:
                    in_free_block = True
                    block_size = 1
                else:
                    block_size += 1
            else:
                if in_free_block:
                    free_blocks.append(block_size)
                    in_free_block = False
                    block_size = 0
        
        if in_free_block:
            free_blocks.append(block_size)
        
        total_free = sum(free_blocks)
        print(f"Free space: {total_free} bytes in {len(free_blocks)} fragments")
        if free_blocks:
            print(f"Largest free block: {max(free_blocks)} bytes")

# Demonstrate fragmentation
memory = FragmentedMemory(40)

memory.allocate(10, "A")
memory.allocate(10, "B")
memory.allocate(10, "C")
memory.allocate(10, "D")

memory.show_memory()

# Free some blocks, creating fragmentation
memory.free("B")
memory.free("D")

memory.show_memory()

# Try to allocate 15 bytes - will fail due to fragmentation
memory.allocate(15, "E")
# ALLOCATED: A at positions 0-9
# ALLOCATED: B at positions 10-19
# ALLOCATED: C at positions 20-29
# ALLOCATED: D at positions 30-39
#
# Memory Layout (. = free, letter = allocated):
# AAAAAAAAAABBBBBBBBBBCCCCCCCCCCDDDDDDDDDD
# Free space: 0 bytes in 0 fragments
# FREED: B (10 bytes)
# FREED: D (10 bytes)
#
# Memory Layout (. = free, letter = allocated):
# AAAAAAAAAA..........CCCCCCCCCC..........
# Free space: 20 bytes in 2 fragments
# Largest free block: 10 bytes
# ERROR: Cannot allocate 15 contiguous bytes for E
```

## Checking Available RAM

```python
import os
import sys

def show_system_memory():
    """Show system memory information (platform-specific)."""
    print("Python Process Memory Info:")
    
    # Python's memory usage
    import tracemalloc
    tracemalloc.start()
    
    # Create some objects
    data = [0] * 100_000
    
    current, peak = tracemalloc.get_traced_memory()
    print(f"  Current memory usage: {current / 1024 / 1024:.2f} MB")
    print(f"  Peak memory usage: {peak / 1024 / 1024:.2f} MB")
    
    tracemalloc.stop()
    
    # System info (Linux/Mac only)
    try:
        import psutil
        mem = psutil.virtual_memory()
        print(f"\nSystem RAM:")
        print(f"  Total: {mem.total / (1024**3):.2f} GB")
        print(f"  Available: {mem.available / (1024**3):.2f} GB")
        print(f"  Used: {mem.used / (1024**3):.2f} GB ({mem.percent}%)")
    except ImportError:
        print("\n(Install psutil for system memory info: pip install psutil)")

show_system_memory()
```

## Summary

- **RAM** is volatile memory for active programs and data
- **Volatile** means data is lost when power is off (unlike SSD/HDD)
- **Memory addresses** uniquely identify each byte in RAM
- **Memory hierarchy** from fastest to slowest: Registers → Cache → RAM → SSD → HDD
- **Python uses RAM** for all objects (variables, lists, etc.)
- **Stack** for function calls and local variables (automatic)
- **Heap** for dynamic objects and large data (garbage collected)
- **Fragmentation** occurs when free memory is scattered
- **More RAM** allows running more programs simultaneously

Understanding memory helps you write efficient programs that don't waste RAM and avoid performance issues.
