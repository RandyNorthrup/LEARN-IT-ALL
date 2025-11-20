---
id: "73-cpu-basics"
title: "CPU Basics and Processing"
chapterId: ch3-computing
order: 4
duration: 30
objectives:
  - Understand what a CPU is and how it works
  - Learn about CPU components and architecture
  - Recognize CPU operations and instruction execution
  - Understand clock speed and processing power
  - Relate CPU concepts to Python program execution
---

# CPU Basics and Processing

The Central Processing Unit (CPU) is the "brain" of the computer that executes instructions and performs calculations. Understanding how CPUs work helps you write more efficient code and understand program performance.

## What is a CPU?

The CPU executes instructions from programs stored in memory:

```python
# When you run Python code, the CPU executes machine instructions
x = 10
y = 20
result = x + y
print(result)  # 30

# Behind the scenes:
# 1. CPU loads value 10 from memory
# 2. CPU loads value 20 from memory
# 3. CPU adds the two values
# 4. CPU stores result 30 back to memory
# 5. CPU calls print function with result
```

## CPU Components

```python
# CPU main components (simplified explanation)

def explain_cpu_components():
    """Explain main CPU components."""
    components = {
        "ALU (Arithmetic Logic Unit)": "Performs math and logic operations (add, subtract, compare)",
        "Control Unit": "Fetches and decodes instructions, controls data flow",
        "Registers": "Ultra-fast temporary storage inside CPU (faster than RAM)",
        "Cache": "Fast memory close to CPU cores (L1, L2, L3 cache levels)",
        "Clock": "Synchronizes operations, measured in GHz (billions of cycles/sec)",
    }
    
    print("CPU Components:")
    for component, description in components.items():
        print(f"\n{component}:")
        print(f"  {description}")

explain_cpu_components()
# CPU Components:
#
# ALU (Arithmetic Logic Unit):
#   Performs math and logic operations (add, subtract, compare)
#
# Control Unit:
#   Fetches and decodes instructions, controls data flow
#
# Registers:
#   Ultra-fast temporary storage inside CPU (faster than RAM)
#
# Cache:
#   Fast memory close to CPU cores (L1, L2, L3 cache levels)
#
# Clock:
#   Synchronizes operations, measured in GHz (billions of cycles/sec)
```

## The Fetch-Decode-Execute Cycle

Every CPU instruction goes through this cycle:

```python
# Simulating the fetch-decode-execute cycle
class SimpleCPU:
    """Simplified CPU simulation."""
    
    def __init__(self):
        self.registers = {'A': 0, 'B': 0, 'RESULT': 0}
        self.instruction_pointer = 0
        self.instructions = []
    
    def load_program(self, instructions):
        """Load instructions into memory."""
        self.instructions = instructions
        self.instruction_pointer = 0
    
    def fetch(self):
        """Fetch next instruction."""
        if self.instruction_pointer >= len(self.instructions):
            return None
        instruction = self.instructions[self.instruction_pointer]
        self.instruction_pointer += 1
        print(f"FETCH: {instruction}")
        return instruction
    
    def decode(self, instruction):
        """Decode instruction into operation and operands."""
        parts = instruction.split()
        operation = parts[0]
        operands = parts[1:] if len(parts) > 1 else []
        print(f"DECODE: Operation={operation}, Operands={operands}")
        return operation, operands
    
    def execute(self, operation, operands):
        """Execute the instruction."""
        if operation == "LOAD":
            register, value = operands[0], int(operands[1])
            self.registers[register] = value
            print(f"EXECUTE: Set {register} = {value}")
        
        elif operation == "ADD":
            reg_a, reg_b, reg_result = operands[0], operands[1], operands[2]
            self.registers[reg_result] = self.registers[reg_a] + self.registers[reg_b]
            print(f"EXECUTE: {reg_result} = {reg_a} + {reg_b} = {self.registers[reg_result]}")
        
        elif operation == "PRINT":
            register = operands[0]
            print(f"EXECUTE: Print {register} = {self.registers[register]}")
    
    def run(self):
        """Run the program."""
        print("=== Starting CPU Execution ===\n")
        while True:
            instruction = self.fetch()
            if instruction is None:
                break
            
            operation, operands = self.decode(instruction)
            self.execute(operation, operands)
            print(f"Registers: {self.registers}\n")
        
        print("=== Execution Complete ===")

# Simulate a simple program: add two numbers
cpu = SimpleCPU()
program = [
    "LOAD A 10",
    "LOAD B 20",
    "ADD A B RESULT",
    "PRINT RESULT"
]

cpu.load_program(program)
cpu.run()
# === Starting CPU Execution ===
#
# FETCH: LOAD A 10
# DECODE: Operation=LOAD, Operands=['A', '10']
# EXECUTE: Set A = 10
# Registers: {'A': 10, 'B': 0, 'RESULT': 0}
#
# FETCH: LOAD B 20
# DECODE: Operation=LOAD, Operands=['B', '20']
# EXECUTE: Set B = 20
# Registers: {'A': 10, 'B': 20, 'RESULT': 0}
#
# FETCH: ADD A B RESULT
# DECODE: Operation=ADD, Operands=['A', 'B', 'RESULT']
# EXECUTE: RESULT = A + B = 30
# Registers: {'A': 10, 'B': 20, 'RESULT': 30}
#
# FETCH: PRINT RESULT
# DECODE: Operation=PRINT, Operands=['RESULT']
# EXECUTE: Print RESULT = 30
# Registers: {'A': 10, 'B': 20, 'RESULT': 30}
#
# === Execution Complete ===
```

## CPU Clock Speed

Clock speed determines how many operations per second:

```python
import time

# CPU clock speed measured in Hertz (cycles per second)
clock_speeds = {
    "1 Hz": 1,                      # 1 cycle/second
    "1 MHz": 1_000_000,             # 1 million cycles/second
    "1 GHz": 1_000_000_000,         # 1 billion cycles/second
    "3.5 GHz": 3_500_000_000,       # 3.5 billion cycles/second (modern CPU)
}

print("CPU Clock Speeds:")
for speed_name, cycles_per_second in clock_speeds.items():
    print(f"{speed_name:8} = {cycles_per_second:,} cycles/second")

# CPU Clock Speeds:
# 1 Hz     = 1 cycles/second
# 1 MHz    = 1,000,000 cycles/second
# 1 GHz    = 1,000,000,000 cycles/second
# 3.5 GHz  = 3,500,000,000 cycles/second

# Demonstrate instruction timing
def measure_operations():
    """Measure how fast Python can execute operations."""
    iterations = 1_000_000
    
    # Simple addition
    start = time.perf_counter()
    for i in range(iterations):
        result = 10 + 20
    end = time.perf_counter()
    
    duration = end - start
    ops_per_second = iterations / duration
    
    print(f"\nExecuted {iterations:,} additions in {duration:.3f} seconds")
    print(f"Rate: {ops_per_second:,.0f} operations/second")

measure_operations()
# Executed 1,000,000 additions in 0.045 seconds
# Rate: 22,222,222 operations/second
```

## CPU Registers

Registers are the fastest storage locations:

```python
# Simulating CPU registers
class CPURegisters:
    """Simulate CPU registers."""
    
    def __init__(self):
        # General purpose registers
        self.registers = {
            'R0': 0,  # Register 0
            'R1': 0,  # Register 1
            'R2': 0,  # Register 2
            'R3': 0,  # Register 3
        }
        
        # Special purpose registers
        self.pc = 0    # Program Counter (next instruction address)
        self.sp = 100  # Stack Pointer
        self.flags = 0 # Status flags (zero, carry, overflow, etc.)
    
    def set_register(self, reg_name, value):
        """Set register value."""
        if reg_name in self.registers:
            self.registers[reg_name] = value
            print(f"Set {reg_name} = {value}")
        else:
            print(f"Invalid register: {reg_name}")
    
    def get_register(self, reg_name):
        """Get register value."""
        return self.registers.get(reg_name, 0)
    
    def show_registers(self):
        """Display all register values."""
        print("Registers:")
        for reg, value in self.registers.items():
            print(f"  {reg}: {value}")
        print(f"  PC: {self.pc} (Program Counter)")
        print(f"  SP: {self.sp} (Stack Pointer)")

# Example usage
cpu_regs = CPURegisters()
cpu_regs.set_register('R0', 42)
cpu_regs.set_register('R1', 100)
cpu_regs.show_registers()
# Set R0 = 42
# Set R1 = 100
# Registers:
#   R0: 42
#   R1: 100
#   R2: 0
#   R3: 0
#   PC: 0 (Program Counter)
#   SP: 100 (Stack Pointer)

# Why registers are fast
print("\nMemory Access Speed (approximate):")
print("  Registers:     < 1 nanosecond")
print("  L1 Cache:      ~1 nanosecond")
print("  L2 Cache:      ~3 nanoseconds")
print("  L3 Cache:      ~10 nanoseconds")
print("  RAM:           ~100 nanoseconds")
print("  SSD:           ~100,000 nanoseconds")
print("  Hard Drive:    ~10,000,000 nanoseconds")
```

## CPU Operations

Basic operations the CPU can perform:

```python
# CPU arithmetic and logic operations
class ALU:
    """Arithmetic Logic Unit simulation."""
    
    @staticmethod
    def add(a, b):
        """Addition."""
        return a + b
    
    @staticmethod
    def subtract(a, b):
        """Subtraction."""
        return a - b
    
    @staticmethod
    def multiply(a, b):
        """Multiplication."""
        return a * b
    
    @staticmethod
    def divide(a, b):
        """Division."""
        return a // b if b != 0 else 0
    
    @staticmethod
    def bitwise_and(a, b):
        """Bitwise AND."""
        return a & b
    
    @staticmethod
    def bitwise_or(a, b):
        """Bitwise OR."""
        return a | b
    
    @staticmethod
    def bitwise_xor(a, b):
        """Bitwise XOR."""
        return a ^ b
    
    @staticmethod
    def bitwise_not(a):
        """Bitwise NOT (8-bit)."""
        return ~a & 0xFF
    
    @staticmethod
    def shift_left(a, bits):
        """Left shift."""
        return a << bits
    
    @staticmethod
    def shift_right(a, bits):
        """Right shift."""
        return a >> bits
    
    @staticmethod
    def compare(a, b):
        """Compare two values."""
        if a > b:
            return 1   # Greater
        elif a < b:
            return -1  # Less
        else:
            return 0   # Equal

# Demonstrate ALU operations
alu = ALU()
a, b = 10, 5

print("ALU Operations:")
print(f"ADD {a} + {b} = {alu.add(a, b)}")
print(f"SUB {a} - {b} = {alu.subtract(a, b)}")
print(f"MUL {a} × {b} = {alu.multiply(a, b)}")
print(f"DIV {a} ÷ {b} = {alu.divide(a, b)}")

print(f"\nBitwise Operations (binary):")
print(f"{a} = {bin(a)}, {b} = {bin(b)}")
print(f"AND: {alu.bitwise_and(a, b)} = {bin(alu.bitwise_and(a, b))}")
print(f"OR:  {alu.bitwise_or(a, b)} = {bin(alu.bitwise_or(a, b))}")
print(f"XOR: {alu.bitwise_xor(a, b)} = {bin(alu.bitwise_xor(a, b))}")

print(f"\nShift Operations:")
print(f"{a} << 1 = {alu.shift_left(a, 1)} (multiply by 2)")
print(f"{a} >> 1 = {alu.shift_right(a, 1)} (divide by 2)")

print(f"\nCompare:")
print(f"CMP {a} vs {b} = {alu.compare(a, b)} (1=greater, 0=equal, -1=less)")
```

## Multi-Core CPUs

Modern CPUs have multiple cores for parallel processing:

```python
import os
import multiprocessing
import time

# Check number of CPU cores
num_cores = os.cpu_count()
print(f"This computer has {num_cores} CPU cores")

# Demonstrate parallel processing benefit
def calculate_sum(numbers):
    """Calculate sum of numbers (simulated work)."""
    return sum(numbers)

def single_core_processing():
    """Process data on single core."""
    data = [list(range(1000000)) for _ in range(4)]
    
    start = time.perf_counter()
    results = [calculate_sum(chunk) for chunk in data]
    end = time.perf_counter()
    
    return end - start, results

def multi_core_processing():
    """Process data on multiple cores."""
    data = [list(range(1000000)) for _ in range(4)]
    
    start = time.perf_counter()
    with multiprocessing.Pool(processes=4) as pool:
        results = pool.map(calculate_sum, data)
    end = time.perf_counter()
    
    return end - start, results

# Compare performance (commented out to avoid execution time)
# single_time, _ = single_core_processing()
# multi_time, _ = multi_core_processing()
# print(f"Single core: {single_time:.3f} seconds")
# print(f"Multi core:  {multi_time:.3f} seconds")
# print(f"Speedup: {single_time / multi_time:.2f}x faster")

print("\nCore vs Thread:")
print("  Core: Physical processing unit (can execute independently)")
print("  Thread: Virtual processor (multiple threads share one core)")
print(f"  This system: {num_cores} cores")
```

## CPU Cache

Cache stores frequently accessed data for faster retrieval:

```python
# Simulating CPU cache behavior
class CPUCache:
    """Simplified CPU cache simulation."""
    
    def __init__(self, size):
        self.size = size
        self.cache = {}
        self.hits = 0
        self.misses = 0
    
    def read(self, address):
        """Read from cache (or miss if not present)."""
        if address in self.cache:
            self.hits += 1
            print(f"CACHE HIT: Address {address} found in cache")
            return self.cache[address]
        else:
            self.misses += 1
            print(f"CACHE MISS: Address {address} not in cache, loading from RAM...")
            # Simulate loading from RAM
            value = f"Data_{address}"
            self.write(address, value)
            return value
    
    def write(self, address, value):
        """Write to cache."""
        if len(self.cache) >= self.size:
            # Evict oldest entry (simplified LRU)
            oldest = next(iter(self.cache))
            del self.cache[oldest]
            print(f"CACHE EVICT: Removed address {oldest}")
        
        self.cache[address] = value
        print(f"CACHE WRITE: Stored address {address}")
    
    def stats(self):
        """Show cache statistics."""
        total = self.hits + self.misses
        hit_rate = (self.hits / total * 100) if total > 0 else 0
        print(f"\nCache Statistics:")
        print(f"  Hits: {self.hits}")
        print(f"  Misses: {self.misses}")
        print(f"  Hit Rate: {hit_rate:.1f}%")

# Demonstrate cache behavior
cache = CPUCache(size=3)

# Access memory addresses
addresses = [100, 200, 300, 100, 200, 400, 100]

print("Memory Access Pattern:")
for addr in addresses:
    cache.read(addr)

cache.stats()
# CACHE MISS: Address 100 not in cache, loading from RAM...
# CACHE WRITE: Stored address 100
# CACHE MISS: Address 200 not in cache, loading from RAM...
# CACHE WRITE: Stored address 200
# CACHE MISS: Address 300 not in cache, loading from RAM...
# CACHE WRITE: Stored address 300
# CACHE HIT: Address 100 found in cache
# CACHE HIT: Address 200 found in cache
# CACHE MISS: Address 400 not in cache, loading from RAM...
# CACHE EVICT: Removed address 300
# CACHE WRITE: Stored address 400
# CACHE HIT: Address 100 found in cache
#
# Cache Statistics:
#   Hits: 3
#   Misses: 4
#   Hit Rate: 42.9%
```

## CPU Performance Factors

```python
def explain_cpu_performance():
    """Explain factors affecting CPU performance."""
    factors = {
        "Clock Speed": "Higher GHz = more cycles/second (3.5 GHz typical)",
        "Core Count": "More cores = more parallel work (4-16 cores typical)",
        "Cache Size": "Larger cache = fewer RAM accesses (L1: 32KB, L2: 256KB, L3: 8MB typical)",
        "Architecture": "Newer designs execute more per cycle (x86-64, ARM)",
        "Instruction Set": "More instructions = more capabilities (SSE, AVX for parallel math)",
        "Thermal Design": "Better cooling = sustained high performance",
    }
    
    print("CPU Performance Factors:")
    for factor, description in factors.items():
        print(f"\n{factor}:")
        print(f"  {description}")

explain_cpu_performance()
```

## How Python Code Runs on CPU

```python
# Python code
def add_numbers(a, b):
    return a + b

result = add_numbers(10, 20)
print(result)

# What actually happens (simplified):
# 1. Python interpreter reads your code
# 2. Compiler converts to bytecode (intermediate representation)
# 3. Python VM executes bytecode
# 4. Bytecode instructions trigger machine code
# 5. Machine code runs directly on CPU
# 6. CPU performs actual computation

# You can see Python bytecode
import dis

print("\nPython Bytecode for add_numbers:")
dis.dis(add_numbers)
# Python Bytecode for add_numbers:
#   2           0 LOAD_FAST                0 (a)
#               2 LOAD_FAST                1 (b)
#               4 BINARY_ADD
#               6 RETURN_VALUE

print("\nEach bytecode instruction becomes multiple CPU machine instructions")
```

## Summary

- **CPU** is the central processor that executes instructions
- **Components**: ALU (math/logic), Control Unit (orchestration), Registers (fast storage), Cache (nearby memory)
- **Fetch-Decode-Execute**: The cycle every instruction goes through
- **Clock Speed**: Measured in GHz (billions of cycles per second)
- **Cores**: Modern CPUs have multiple cores for parallel processing
- **Cache**: Fast memory close to CPU (L1, L2, L3 levels)
- **Operations**: Arithmetic, logic, comparison, data movement
- **Python**: Converts your code to bytecode, then machine code, then CPU instructions

Understanding CPUs helps you write code that executes efficiently and appreciate why certain operations are faster than others.
