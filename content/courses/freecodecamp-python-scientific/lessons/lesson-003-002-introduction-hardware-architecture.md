---
id: lesson-003-002
title: Introduction: Hardware Architecture
chapterId: chapter-03
order: 2
duration: 15
objectives:
  - Identify the main components of computer hardware
  - Explain how the CPU executes instructions
  - Describe the fetch-decode-execute cycle
  - Understand the difference between RAM and persistent storage
---

# Introduction: Hardware Architecture

## Why Hardware Matters to Programmers

When you write a Python program, you are ultimately telling physical hardware what to do. Understanding the basic architecture of a computer helps you write better programs and understand why things work the way they do.

## The Main Components

Every computer, from a smartphone to a supercomputer, has these core components:

### Central Processing Unit (CPU)

The CPU is the "brain" of the computer. It executes instructions one at a time, incredibly fast — modern CPUs can execute **billions of instructions per second**. The CPU can do simple things like add two numbers, compare values, or move data around. Complex behavior emerges from combining millions of these simple operations.

### Main Memory (RAM)

RAM (Random Access Memory) is **fast but temporary** storage. When you run a Python program, your code and its data are loaded into RAM. The CPU can read from and write to RAM extremely quickly. However, when you turn off the computer, everything in RAM disappears.

```python
# When you create a variable, it is stored in RAM
message = "Hello"   # This string lives in RAM while the program runs
count = 42          # This integer lives in RAM too
```

### Secondary Storage (Disk)

Secondary storage — hard drives, SSDs, USB drives — is **slower but permanent**. Your Python files (.py) are stored on disk. When you save a file, you move data from RAM to disk so it persists after the program ends.

### Input and Output Devices

- **Input**: keyboard, mouse, microphone, network connection — ways data enters the computer.
- **Output**: screen, speakers, printer, network connection — ways the computer communicates results.

When you call `print()`, you are sending data to an output device (your screen). When you call `input()`, you are reading from an input device (your keyboard).

```python
# Input from keyboard, output to screen
user_name = input("What is your name? ")   # Input device
print("Hello,", user_name)                 # Output device
```

## The Fetch-Decode-Execute Cycle

The CPU runs in a continuous loop:

1. **Fetch**: Retrieve the next instruction from memory (RAM).
2. **Decode**: Figure out what the instruction means.
3. **Execute**: Perform the operation (add, compare, store, etc.).

This cycle repeats billions of times per second. Your Python program is translated into these low-level instructions, and the CPU processes them through this cycle.

## How a Python Program Runs

When you type `python my_program.py`:

1. The Python **interpreter** is loaded from disk into RAM.
2. Your source code file (`my_program.py`) is read from disk into RAM.
3. The interpreter reads your Python code line by line, converts it to instructions the CPU can execute, and runs them.
4. Results are sent to output devices (your screen).

```python
# This simple program goes through the entire hardware stack:
# 1. Code loaded from disk to RAM
# 2. CPU executes the math
# 3. Result sent to screen (output device)

radius = 5
area = 3.14159 * radius ** 2
print(f"The area of a circle with radius {radius} is {area}")
```

**Output:**
```
The area of a circle with radius 5 is 78.53975
```

## Key Takeaways

| Component | Speed | Persistence | Purpose |
|-----------|-------|-------------|----------|
| CPU | Fastest | None | Execute instructions |
| RAM | Fast | Temporary | Hold running programs and data |
| Disk | Slow | Permanent | Store files long-term |
| I/O | Varies | N/A | Communicate with the outside world |

Understanding these components helps explain concepts you will encounter later, like why variables disappear when a program ends (they lived in RAM) and why you need to explicitly save data to files (moving it to disk).

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
