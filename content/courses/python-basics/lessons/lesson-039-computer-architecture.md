---
id: "81-computer-architecture"
title: "Computer Architecture"
chapterId: ch3-computing
order: 12
duration: 30
objectives:
  - Understand the Von Neumann architecture
  - Learn about computer system components and their interactions
  - Recognize different computer architectures
  - Understand instruction sets and machine code
  - Learn about parallelism and modern architectures
---

# Computer Architecture

Computer architecture describes how a computer is organized and how its components work together. Understanding architecture helps you write efficient code and appreciate hardware limitations.

## Von Neumann Architecture

```python
def explain_von_neumann():
    """Explain Von Neumann architecture."""
    print("Von Neumann Architecture:")
    
    print("\n1. Core Concept:")
    print("   - Proposed by John von Neumann (1945)")
    print("   - Stored program concept: Instructions and data in same memory")
    print("   - Most computers today follow this model")
    
    print("\n2. Five Main Components:")
    print("""
   ┌─────────────────────────────────────────────┐
   │              INPUT DEVICES                   │
   │        (Keyboard, Mouse, Network)            │
   └──────────────┬──────────────────────────────┘
                  │
   ┌──────────────▼──────────────────────────────┐
   │           CENTRAL PROCESSING UNIT            │
   │  ┌──────────────┐    ┌──────────────────┐   │
   │  │ Control Unit │◄──►│ Arithmetic Logic │   │
   │  │   (Decoder)  │    │   Unit (ALU)     │   │
   │  └──────────────┘    └──────────────────┘   │
   └──────────┬────────────────┬─────────────────┘
              │                │
   ┌──────────▼────────────────▼─────────────────┐
   │              MEMORY (RAM)                    │
   │      (Stores Programs and Data)              │
   └──────────┬──────────────────────────────────┘
              │
   ┌──────────▼──────────────────────────────────┐
   │             OUTPUT DEVICES                   │
   │        (Monitor, Printer, Network)           │
   └─────────────────────────────────────────────┘
   """)
    
    print("\n3. Key Characteristics:")
    print("   - Sequential execution (one instruction at a time)")
    print("   - Single memory for both instructions and data")
    print("   - Programs stored in memory (not hardwired)")
    print("   - Von Neumann bottleneck: CPU faster than memory access")

explain_von_neumann()
```

## System Bus

```python
def explain_system_bus():
    """Explain system bus architecture."""
    print("\nSystem Bus:")
    
    print("\n1. What is a Bus?")
    print("   - Set of wires connecting components")
    print("   - Carries data, addresses, and control signals")
    print("   - Shared communication pathway")
    
    print("\n2. Three Types of Buses:")
    print("""
   CPU ◄──────────────────────────────► Memory
        │                           │
        ├── Data Bus (64-bit)       │
        │   Carries actual data     │
        │                           │
        ├── Address Bus (48-bit)    │
        │   Specifies memory location│
        │                           │
        └── Control Bus             │
            Read/Write signals      │
    """)
    
    print("\n3. Bus Width:")
    print("   - Data bus: 8, 16, 32, 64 bits")
    print("   - Wider = More data per transfer")
    print("   - 64-bit CPU: 64-bit data bus (8 bytes at once)")
    
    print("\n4. Bus Speed:")
    print("   - Measured in MHz or GT/s (Gigatransfers/second)")
    print("   - Faster = Higher throughput")
    print("   - Modern: PCIe 4.0 = 64 GB/s")

explain_system_bus()

class SystemBus:
    """Simulate system bus."""
    
    def __init__(self, width_bits=64):
        self.width_bits = width_bits
        self.width_bytes = width_bits // 8
        self.transfers = 0
    
    def transfer_data(self, address, data, operation):
        """Simulate data transfer on bus."""
        self.transfers += 1
        
        data_size = len(data) if isinstance(data, (list, bytes)) else 1
        chunks = (data_size + self.width_bytes - 1) // self.width_bytes
        
        print(f"Bus Transfer #{self.transfers}:")
        print(f"  Operation: {operation}")
        print(f"  Address: 0x{address:08X}")
        print(f"  Data size: {data_size} bytes")
        print(f"  Bus width: {self.width_bytes} bytes")
        print(f"  Transfers needed: {chunks}")
        
        return chunks

# Simulate bus transfers
print("\nSystem Bus Simulation:")
bus = SystemBus(width_bits=64)  # 64-bit bus

# Transfer 4 bytes (fits in one transfer)
bus.transfer_data(0x1000, [0xFF, 0xAA, 0xBB, 0xCC], "WRITE")
print()

# Transfer 16 bytes (needs 2 transfers on 64-bit bus)
bus.transfer_data(0x2000, [0] * 16, "READ")
```

## Instruction Set Architecture (ISA)

```python
def explain_isa():
    """Explain Instruction Set Architecture."""
    print("\nInstruction Set Architecture (ISA):")
    
    print("\n1. What is ISA?")
    print("   - Interface between hardware and software")
    print("   - Defines available instructions")
    print("   - Machine code that CPU understands")
    print("   - Examples: x86-64, ARM, RISC-V, MIPS")
    
    print("\n2. Common ISA Families:")
    isa_families = [
        ("x86-64", "Intel/AMD", "Desktop/Server", "CISC - Complex instructions"),
        ("ARM", "ARM Holdings", "Mobile/Embedded", "RISC - Simple instructions"),
        ("RISC-V", "Open Source", "Embedded/Research", "RISC - Modern, open"),
        ("MIPS", "MIPS Tech", "Embedded", "RISC - Educational"),
        ("PowerPC", "IBM/Motorola", "Legacy", "RISC - Older systems"),
    ]
    
    print(f"\n   {'ISA':<12} {'Company':<15} {'Use':<20} {'Type'}")
    print("   " + "-" * 75)
    for isa, company, use, isa_type in isa_families:
        print(f"   {isa:<12} {company:<15} {use:<20} {isa_type}")
    
    print("\n3. CISC vs RISC:")
    print("\n   CISC (Complex Instruction Set):")
    print("   - Many instructions (100s)")
    print("   - Complex operations (one instruction does a lot)")
    print("   - Variable instruction length")
    print("   - Example: x86-64")
    
    print("\n   RISC (Reduced Instruction Set):")
    print("   - Fewer instructions (50-100)")
    print("   - Simple operations (do one thing)")
    print("   - Fixed instruction length")
    print("   - Example: ARM, RISC-V")

explain_isa()

class SimpleCPU:
    """Simulate simple CPU with instruction execution."""
    
    def __init__(self):
        self.registers = {'R0': 0, 'R1': 0, 'R2': 0, 'R3': 0}
        self.memory = [0] * 256
        self.pc = 0  # Program counter
        self.instructions_executed = 0
    
    def load_register(self, reg, value):
        """LOAD: Load value into register."""
        self.registers[reg] = value
        self.instructions_executed += 1
        print(f"LOAD {reg}, {value}  →  {reg} = {value}")
    
    def add(self, dest, src1, src2):
        """ADD: Add two registers."""
        result = self.registers[src1] + self.registers[src2]
        self.registers[dest] = result
        self.instructions_executed += 1
        print(f"ADD {dest}, {src1}, {src2}  →  {dest} = {result}")
    
    def store(self, reg, address):
        """STORE: Store register to memory."""
        self.memory[address] = self.registers[reg]
        self.instructions_executed += 1
        print(f"STORE {reg}, [0x{address:02X}]  →  MEM[0x{address:02X}] = {self.registers[reg]}")
    
    def load_from_memory(self, reg, address):
        """LOAD: Load from memory to register."""
        self.registers[reg] = self.memory[address]
        self.instructions_executed += 1
        print(f"LOAD {reg}, [0x{address:02X}]  →  {reg} = {self.memory[address]}")
    
    def print_state(self):
        """Print CPU state."""
        print("\nCPU State:")
        print(f"  Registers: {self.registers}")
        print(f"  PC: {self.pc}")
        print(f"  Instructions executed: {self.instructions_executed}")

# Simulate assembly program
print("\nSimple CPU Simulation:")
print("Program: Add 5 + 3 and store result")
print("-" * 50)

cpu = SimpleCPU()

# Assembly program
cpu.load_register('R1', 5)        # R1 = 5
cpu.load_register('R2', 3)        # R2 = 3
cpu.add('R3', 'R1', 'R2')         # R3 = R1 + R2
cpu.store('R3', 0x10)             # Memory[0x10] = R3

cpu.print_state()
```

## Machine Code

```python
def explain_machine_code():
    """Explain machine code and compilation."""
    print("\nMachine Code:")
    
    print("\n1. Levels of Code:")
    print("""
   High-Level (Python):
       result = 5 + 3
       ↓
   
   Bytecode (Python VM):
       LOAD_CONST 5
       LOAD_CONST 3
       BINARY_ADD
       STORE_FAST result
       ↓
   
   Assembly (x86-64):
       mov rax, 5      ; Load 5 into register
       add rax, 3      ; Add 3 to register
       mov [result], rax  ; Store to memory
       ↓
   
   Machine Code (Binary):
       48 C7 C0 05 00 00 00   ; mov rax, 5
       48 83 C0 03            ; add rax, 3
       48 89 05 ...           ; mov [result], rax
   """)
    
    print("\n2. Compilation Process:")
    print("   Source Code (.py, .c, .java)")
    print("        ↓  Compiler/Interpreter")
    print("   Intermediate Code (optional)")
    print("        ↓  Assembler")
    print("   Machine Code (CPU instructions)")
    print("        ↓  CPU Execution")
    print("   Result")

explain_machine_code()

# Python bytecode inspection
import dis

def add_numbers(a, b):
    """Simple function to inspect bytecode."""
    return a + b

print("\nPython Bytecode Example:")
print("Function: add_numbers(a, b) = a + b")
print("-" * 50)
dis.dis(add_numbers)
```

## Memory Hierarchy

```python
def explain_memory_hierarchy():
    """Explain memory hierarchy."""
    print("\nMemory Hierarchy:")
    
    print("\n1. Storage Levels (Fastest to Slowest):")
    levels = [
        ("CPU Registers", "1 cycle", "~1 KB", "Fastest", "Built into CPU"),
        ("L1 Cache", "~4 cycles", "32-64 KB", "Very Fast", "Per core"),
        ("L2 Cache", "~12 cycles", "256-512 KB", "Fast", "Per core"),
        ("L3 Cache", "~40 cycles", "8-64 MB", "Shared", "Shared by cores"),
        ("RAM", "~200 cycles", "8-64 GB", "Main memory", "Volatile"),
        ("SSD", "~100,000 cycles", "256GB-4TB", "Persistent", "Fast storage"),
        ("HDD", "~10M cycles", "1-20 TB", "Persistent", "Slow, large"),
    ]
    
    print(f"\n   {'Level':<15} {'Speed':<15} {'Size':<15} {'Type':<15} {'Notes'}")
    print("   " + "-" * 85)
    for level, speed, size, storage_type, notes in levels:
        print(f"   {level:<15} {speed:<15} {size:<15} {storage_type:<15} {notes}")
    
    print("\n2. Cache Performance:")
    print("   - Cache Hit: Data found in cache (fast)")
    print("   - Cache Miss: Data not in cache (fetch from RAM, slow)")
    print("   - Hit Rate: % of accesses that hit cache")
    print("   - 95% hit rate: 20x faster average access")
    
    print("\n3. Locality Principles:")
    print("   - Temporal Locality: Recently accessed data likely accessed again")
    print("   - Spatial Locality: Nearby data likely accessed together")
    print("   - Caches exploit these patterns")

explain_memory_hierarchy()

class CacheSimulator:
    """Simulate cache behavior."""
    
    def __init__(self, cache_size=8):
        self.cache = {}
        self.cache_size = cache_size
        self.hits = 0
        self.misses = 0
        self.access_order = []
    
    def access(self, address):
        """Access memory address."""
        if address in self.cache:
            # Cache hit
            self.hits += 1
            print(f"Access 0x{address:04X}: HIT   (Total: {self.hits} hits, {self.misses} misses)")
            # Move to end (most recently used)
            self.access_order.remove(address)
            self.access_order.append(address)
        else:
            # Cache miss
            self.misses += 1
            print(f"Access 0x{address:04X}: MISS  (Total: {self.hits} hits, {self.misses} misses)")
            
            # Add to cache
            if len(self.cache) >= self.cache_size:
                # Evict least recently used
                evicted = self.access_order.pop(0)
                del self.cache[evicted]
                print(f"  └─ Evicted 0x{evicted:04X} (LRU)")
            
            self.cache[address] = f"Data@0x{address:04X}"
            self.access_order.append(address)
            print(f"  └─ Loaded 0x{address:04X} into cache")
    
    def get_stats(self):
        """Get cache statistics."""
        total = self.hits + self.misses
        hit_rate = (self.hits / total * 100) if total > 0 else 0
        return {
            'hits': self.hits,
            'misses': self.misses,
            'total': total,
            'hit_rate': hit_rate,
        }

# Simulate cache
print("\nCache Simulation:")
cache = CacheSimulator(cache_size=4)

# Access pattern showing locality
print("\n1. Sequential Access (Spatial Locality):")
for addr in [0x1000, 0x1001, 0x1002, 0x1003]:
    cache.access(addr)

print("\n2. Repeated Access (Temporal Locality):")
for addr in [0x1000, 0x1001, 0x1000, 0x1001]:
    cache.access(addr)

print("\n3. Cache Overflow:")
for addr in [0x2000, 0x2001, 0x2002, 0x2003, 0x2004]:  # 5th access causes eviction
    cache.access(addr)

stats = cache.get_stats()
print(f"\nCache Statistics:")
print(f"  Hits: {stats['hits']}")
print(f"  Misses: {stats['misses']}")
print(f"  Total Accesses: {stats['total']}")
print(f"  Hit Rate: {stats['hit_rate']:.1f}%")
```

## Parallelism and Modern Architectures

```python
def explain_parallelism():
    """Explain parallel computing."""
    print("\nParallelism and Modern Architectures:")
    
    print("\n1. Types of Parallelism:")
    print("""
   Instruction-Level Parallelism (ILP):
   - CPU executes multiple instructions simultaneously
   - Pipelining: Overlap instruction stages
   - Superscalar: Multiple execution units
   
   Thread-Level Parallelism (TLP):
   - Multiple threads on multiple cores
   - True parallel execution
   - Multi-core CPUs (4, 8, 16+ cores)
   
   Data-Level Parallelism (DLP):
   - Same operation on multiple data (SIMD)
   - Vector instructions (AVX, SSE)
   - GPU computing (thousands of cores)
   """)
    
    print("\n2. Multi-Core Processors:")
    processors = [
        ("Dual-Core", 2, "Basic laptops"),
        ("Quad-Core", 4, "Standard desktop/laptop"),
        ("Hexa-Core", 6, "Performance laptop"),
        ("Octa-Core", 8, "High-end desktop"),
        ("16-Core", 16, "Workstation/Server"),
        ("64-Core", 64, "High-end server (AMD EPYC)"),
        ("128-Core", 128, "Data center (ARM Ampere)"),
    ]
    
    print(f"\n   {'Type':<15} {'Cores':<8} {'Typical Use'}")
    print("   " + "-" * 50)
    for proc_type, cores, use in processors:
        print(f"   {proc_type:<15} {cores:<8} {use}")
    
    print("\n3. Heterogeneous Computing:")
    print("   - CPU: General-purpose, complex logic")
    print("   - GPU: Parallel computation (graphics, AI)")
    print("   - TPU: Tensor operations (machine learning)")
    print("   - FPGA: Reconfigurable hardware")
    print("   - Use right processor for the task")
    
    print("\n4. Amdahl's Law:")
    print("   - Speedup limited by sequential portion")
    print("   - If 50% parallelizable, max speedup = 2x")
    print("   - If 90% parallelizable, max speedup = 10x")
    print("   - Some tasks can't be parallelized")

explain_parallelism()

def calculate_speedup(parallelizable_percent, num_cores):
    """Calculate theoretical speedup (Amdahl's Law)."""
    p = parallelizable_percent / 100
    s = 1 - p  # Sequential portion
    
    speedup = 1 / (s + (p / num_cores))
    return speedup

print("\nAmdahl's Law - Speedup Calculation:")
print("Speedup = 1 / (Sequential + Parallel/Cores)")
print("\n" + f"{'% Parallel':<12} {'2 Cores':<10} {'4 Cores':<10} {'8 Cores':<10} {'16 Cores':<10}")
print("-" * 60)

for percent in [50, 75, 90, 95, 99]:
    speedups = [calculate_speedup(percent, cores) for cores in [2, 4, 8, 16]]
    print(f"{percent}%{' ':<9} {speedups[0]:.2f}x{' ':<5} {speedups[1]:.2f}x{' ':<5} "
          f"{speedups[2]:.2f}x{' ':<5} {speedups[3]:.2f}x")

print("\nConclusion: More parallelization = Better scaling with cores")
```

## Architecture Evolution

```python
def explain_architecture_evolution():
    """Explain computer architecture evolution."""
    print("\nArchitecture Evolution:")
    
    print("\n1. Historical Timeline:")
    timeline = [
        ("1940s", "Vacuum Tubes", "ENIAC, first electronic computer"),
        ("1950s", "Transistors", "Smaller, more reliable"),
        ("1960s", "Integrated Circuits", "Multiple transistors on chip"),
        ("1970s", "Microprocessors", "CPU on single chip (Intel 4004)"),
        ("1980s", "Personal Computers", "IBM PC, Apple Macintosh"),
        ("1990s", "Superscalar CPUs", "Pentium, multiple instructions/cycle"),
        ("2000s", "Multi-Core Era", "Dual-core, quad-core CPUs"),
        ("2010s", "Mobile/Cloud", "ARM dominance, cloud computing"),
        ("2020s", "AI Acceleration", "Specialized AI chips, quantum research"),
    ]
    
    print(f"\n   {'Era':<10} {'Technology':<20} {'Milestone'}")
    print("   " + "-" * 70)
    for era, tech, milestone in timeline:
        print(f"   {era:<10} {tech:<20} {milestone}")
    
    print("\n2. Moore's Law:")
    print("   - Transistor count doubles every ~2 years")
    print("   - Held true for decades (1970s-2010s)")
    print("   - Slowing down (physics limits)")
    print("   - Modern CPUs: Billions of transistors")
    
    print("\n3. Modern Trends:")
    print("   - More cores instead of higher clock speed")
    print("   - Specialized accelerators (GPU, TPU)")
    print("   - Energy efficiency (mobile, data centers)")
    print("   - Heterogeneous computing")
    print("   - Quantum computing (experimental)")

explain_architecture_evolution()
```

## Summary

**Von Neumann Architecture:**
- **Five components**: CPU (Control Unit + ALU), Memory, Input, Output
- **Stored program**: Instructions and data in same memory
- **Sequential execution**: One instruction at a time
- **Bottleneck**: CPU faster than memory access

**System Components:**
- **Bus**: Data bus, address bus, control bus
- **ISA**: Instruction set (x86-64, ARM, RISC-V)
- **CISC vs RISC**: Complex vs reduced instruction sets
- **Machine code**: Binary instructions CPU executes

**Memory Hierarchy:**
- **Registers** → **L1/L2/L3 Cache** → **RAM** → **SSD/HDD**
- **Cache**: Exploits temporal and spatial locality
- **Faster = Smaller, Slower = Larger**

**Modern Architectures:**
- **Multi-core**: 2-128+ cores for parallelism
- **SIMD**: Process multiple data simultaneously
- **Heterogeneous**: CPU + GPU + specialized accelerators
- **Amdahl's Law**: Speedup limited by sequential portion

**Evolution:**
- **Moore's Law**: Transistor doubling (slowing now)
- **Current trends**: More cores, specialized hardware, energy efficiency

Understanding computer architecture helps you write code that leverages hardware efficiently, avoid bottlenecks, and appreciate performance trade-offs.
