---
id: lesson-028-binary-hex
title: Binary and Hexadecimal Number Systems
chapterId: ch3-computing
order: 2
duration: 35
objectives:
  - Understand why binary matters for programming
  - Convert between decimal, binary, hexadecimal, and octal systems
  - Use Python's bin(), hex(), oct(), and int() with base parameters
  - Perform bitwise operations and understand their applications
  - Recognize number systems in real-world contexts like colors and networking
  - Understand the connection between number systems and character encoding
---

# Binary and Hexadecimal Number Systems

Understanding how computers represent numbers is a foundational skill for any programmer. While we humans think in decimal (base-10), computers operate entirely in binary (base-2). Hexadecimal (base-16) and octal (base-8) serve as convenient shorthand for working with binary data. In this lesson, we'll master all of these systems and see how they're used in real-world programming.

## Why Binary Matters

At the hardware level, a computer is made up of billions of tiny switches called **transistors**. Each transistor can be in one of two states: **on** or **off**. This maps perfectly to binary — a number system with only two digits: **0** and **1**.

Every piece of data in your computer — every number, character, image, video, and line of Python code — is ultimately stored as a sequence of 0s and 1s. Understanding binary helps you:

- Work with **low-level data** like file formats, network protocols, and hardware registers
- Use **bitwise operations** for efficient algorithms and flag management
- Understand **memory** and how data is stored and transmitted
- Read and write **color codes**, **IP addresses**, and **file permissions**
- Debug issues involving **encoding**, **overflow**, and **precision**

## Understanding Place Values

### Decimal (Base-10)

The system you've used your whole life. Each position is a power of 10:

```
Number: 4  2  7
        ↓  ↓  ↓
       4×10² + 2×10¹ + 7×10⁰
       4×100 + 2×10  + 7×1
       400   + 20    + 7     = 427
```

### Binary (Base-2)

Only two digits: 0 and 1. Each position is a power of 2:

```
Binary: 1  1  0  1  0  1  1  0
        ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓
       2⁷ 2⁶ 2⁵ 2⁴ 2³ 2² 2¹ 2⁰
       128 64 32 16  8  4  2  1

1×128 + 1×64 + 0×32 + 1×16 + 0×8 + 1×4 + 1×2 + 0×1
128   + 64   + 0    + 16   + 0   + 4   + 2   + 0   = 214
```

A single binary digit is called a **bit**. Eight bits make a **byte**, which can represent values from 0 to 255 (2⁸ - 1 = 255).

### Hexadecimal (Base-16)

Uses digits 0-9 and letters A-F (where A=10, B=11, C=12, D=13, E=14, F=15). Each position is a power of 16:

```
Hex:   2  A  3
       ↓  ↓  ↓
      2×16² + A×16¹ + 3×16⁰
      2×256 + 10×16 + 3×1
      512   + 160   + 3     = 675
```

Hexadecimal is popular because each hex digit represents **exactly 4 bits**, making it a compact way to display binary data:

```
Binary:  1010 1100 0011 1111
Hex:       A    C    3    F
```

### Octal (Base-8)

Uses digits 0-7. Each position is a power of 8. Octal is less common today but still important for **Unix file permissions**:

```
Octal: 7 5 5
       ↓ ↓ ↓
      7×8² + 5×8¹ + 5×8⁰
      7×64 + 5×8  + 5×1
      448  + 40   + 5     = 493
```

In Unix: `chmod 755` means owner=rwx (7), group=r-x (5), others=r-x (5).

## Step-by-Step Conversions

### Decimal to Binary (Division Method)

Repeatedly divide by 2 and collect remainders (read bottom to top):

```
Convert 42 to binary:
42 ÷ 2 = 21 remainder 0
21 ÷ 2 = 10 remainder 1
10 ÷ 2 =  5 remainder 0
 5 ÷ 2 =  2 remainder 1
 2 ÷ 2 =  1 remainder 0
 1 ÷ 2 =  0 remainder 1
                        ↑ Read upward: 101010
```

So 42 in decimal = `101010` in binary.

### Binary to Decimal (Positional Method)

Multiply each bit by its place value and sum:

```
101010 in binary:
1×32 + 0×16 + 1×8 + 0×4 + 1×2 + 0×1
32   + 0    + 8   + 0   + 2   + 0   = 42
```

### Decimal to Hexadecimal

Repeatedly divide by 16:

```
Convert 255 to hexadecimal:
255 ÷ 16 = 15 remainder 15 (F)
 15 ÷ 16 =  0 remainder 15 (F)
                             ↑ Read upward: FF
```

So 255 in decimal = `FF` in hexadecimal.

### Hexadecimal to Binary (Quick Method)

Convert each hex digit to 4 binary digits:

```
Hex: 2A → 0010 1010 → Binary: 00101010
     2=0010  A=1010

Hex: FF → 1111 1111 → Binary: 11111111
     F=1111  F=1111
```

## Python Number Literals and Conversions

Python makes it easy to work with all these number systems:

```python
# Writing number literals in different bases
decimal = 42          # Base-10 (no prefix)
binary = 0b101010     # Base-2 (prefix: 0b)
hexadecimal = 0x2A    # Base-16 (prefix: 0x)
octal = 0o52          # Base-8 (prefix: 0o)

# They're all the same value — Python stores them as integers
print(decimal)        # 42
print(binary)         # 42
print(hexadecimal)    # 42
print(octal)          # 42
print(decimal == binary == hexadecimal == octal)  # True
```

### Converting with Built-in Functions

```python
# int to string representation
print(bin(42))        # '0b101010'
print(hex(42))        # '0x2a'
print(oct(42))        # '0o52'

# More examples
print(bin(255))       # '0b11111111'
print(hex(255))       # '0xff'
print(oct(255))       # '0o377'

# String to int using int() with base parameter
print(int('101010', 2))   # 42 (binary string to decimal)
print(int('2a', 16))      # 42 (hex string to decimal)
print(int('52', 8))       # 42 (octal string to decimal)
print(int('42', 10))      # 42 (explicit decimal)

# You can also convert from prefixed strings
print(int('0b101010', 2))  # 42
print(int('0x2a', 16))     # 42

# Format without prefix
print(format(42, 'b'))     # '101010' (no 0b prefix)
print(format(42, 'x'))     # '2a' (no 0x prefix)
print(format(42, 'o'))     # '52' (no 0o prefix)
print(format(42, '08b'))   # '00101010' (zero-padded to 8 digits)
```

## Bitwise Operators

Bitwise operators work on the **individual bits** of integers. They are extremely fast and used in systems programming, graphics, networking, and algorithm optimization.

### The Six Bitwise Operators

```python
a = 0b1100  # 12 in decimal
b = 0b1010  # 10 in decimal

# AND (&): Both bits must be 1
print(bin(a & b))   # 0b1000 (8)
#   1100
# & 1010
# ------
#   1000

# OR (|): At least one bit must be 1
print(bin(a | b))   # 0b1110 (14)
#   1100
# | 1010
# ------
#   1110

# XOR (^): Bits must be different
print(bin(a ^ b))   # 0b110 (6)
#   1100
# ^ 1010
# ------
#   0110

# NOT (~): Flip all bits (two's complement)
print(bin(~a))      # -0b1101 (-13)
# ~12 = -13 (because ~n = -(n+1) in two's complement)

# Left Shift (<<): Shift bits left, fill with zeros
print(bin(a << 1))  # 0b11000 (24) — equivalent to multiplying by 2
print(bin(a << 2))  # 0b110000 (48) — equivalent to multiplying by 4

# Right Shift (>>): Shift bits right, discard rightmost bits
print(bin(a >> 1))  # 0b110 (6) — equivalent to integer division by 2
print(bin(a >> 2))  # 0b11 (3) — equivalent to integer division by 4
```

### Why Bit Shifting Matters

Bit shifts are among the fastest operations a CPU can perform:

```python
# These are mathematically equivalent, but bit shifts are faster:
x = 100

print(x * 2)     # 200
print(x << 1)    # 200 (shift left = multiply by 2)

print(x * 8)     # 800
print(x << 3)    # 800 (shift left 3 = multiply by 2³ = multiply by 8)

print(x // 4)    # 25
print(x >> 2)    # 25 (shift right 2 = divide by 2² = divide by 4)
```

## Practical Bit Manipulation Patterns

### Checking if a Number Is a Power of 2

A power of 2 in binary has exactly one bit set (e.g., 1, 10, 100, 1000):

```python
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

print(is_power_of_two(16))   # True  (10000 & 01111 = 0)
print(is_power_of_two(18))   # False (10010 & 10001 ≠ 0)
print(is_power_of_two(1024)) # True
```

### Setting, Clearing, and Toggling Individual Bits

```python
# Set a bit at position (turn it ON)
def set_bit(num, position):
    return num | (1 << position)

# Clear a bit at position (turn it OFF)
def clear_bit(num, position):
    return num & ~(1 << position)

# Toggle a bit at position (flip it)
def toggle_bit(num, position):
    return num ^ (1 << position)

# Check if a bit is set
def is_bit_set(num, position):
    return bool(num & (1 << position))

value = 0b1010  # 10
print(format(set_bit(value, 0), '04b'))     # 1011 (set bit 0)
print(format(clear_bit(value, 1), '04b'))   # 1000 (clear bit 1)
print(format(toggle_bit(value, 2), '04b'))  # 1110 (toggle bit 2)
print(is_bit_set(value, 3))                 # True (bit 3 is 1)
```

### Using Flags with Bitmasks

Bitmasks allow you to store multiple boolean options in a single integer — very memory efficient:

```python
# Permission flags (like Unix file permissions)
READ    = 0b100  # 4
WRITE   = 0b010  # 2
EXECUTE = 0b001  # 1

# Combine permissions using OR
admin_perms = READ | WRITE | EXECUTE  # 0b111 = 7
user_perms = READ | EXECUTE           # 0b101 = 5

# Check permissions using AND
def has_permission(perms, flag):
    return bool(perms & flag)

print(has_permission(user_perms, READ))     # True
print(has_permission(user_perms, WRITE))    # False
print(has_permission(admin_perms, WRITE))   # True
```

## Real-World Applications

### Colors as Hexadecimal

Web colors and graphics use hex codes where each pair of hex digits represents Red, Green, or Blue (0-255):

```python
# CSS-style color: #RRGGBB
# Each component is 1 byte (00 to FF = 0 to 255)

# Extract RGB components from a hex color
def hex_to_rgb(color):
    r = (color >> 16) & 0xFF
    g = (color >> 8) & 0xFF
    b = color & 0xFF
    return r, g, b

print(hex_to_rgb(0xFF5500))   # (255, 85, 0) — orange
print(hex_to_rgb(0x3498DB))   # (52, 152, 219) — blue
print(hex_to_rgb(0x000000))   # (0, 0, 0) — black
print(hex_to_rgb(0xFFFFFF))   # (255, 255, 255) — white

# Create a color from RGB values
def rgb_to_hex(r, g, b):
    return (r << 16) | (g << 8) | b

color = rgb_to_hex(255, 85, 0)
print(f"#{color:06X}")  # #FF5500
```

### IP Addresses

IPv4 addresses are 32-bit numbers often displayed as 4 decimal octets:

```python
# IP address 192.168.1.100 as a 32-bit integer
def ip_to_int(ip_string):
    parts = [int(p) for p in ip_string.split('.')]
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]

def int_to_ip(num):
    return f"{(num >> 24) & 0xFF}.{(num >> 16) & 0xFF}.{(num >> 8) & 0xFF}.{num & 0xFF}"

ip_int = ip_to_int("192.168.1.100")
print(ip_int)                    # 3232235876
print(hex(ip_int))               # 0xc0a80164
print(int_to_ip(ip_int))         # 192.168.1.100
```

### Memory Addresses

When you use `id()` in Python or debug programs, memory addresses are shown in hexadecimal:

```python
my_list = [1, 2, 3]
address = id(my_list)
print(f"Decimal: {address}")
print(f"Hex: {hex(address)}")    # e.g., 0x7f8b3c5a2100
```

## ASCII and Unicode Connection

Characters are stored as numbers, and those numbers are stored in binary:

```python
# ASCII: each character is 1 byte (0-127)
print(ord('A'))          # 65
print(bin(ord('A')))     # 0b1000001
print(hex(ord('A')))     # 0x41

print(ord('a'))          # 97
print(bin(ord('a')))     # 0b1100001

# Convert back from number to character
print(chr(65))           # 'A'
print(chr(0x41))         # 'A'

# Unicode extends this to all world scripts
print(ord('€'))          # 8364
print(hex(ord('€')))     # 0x20ac
print(chr(0x1F600))      # 😀 (emoji!)
```

The difference between uppercase and lowercase ASCII letters is exactly 1 bit:

```python
print(bin(ord('A')))     # 0b1000001 (65)
print(bin(ord('a')))     # 0b1100001 (97)
# Difference is bit 5:   # 0b0100000 (32)
```

## Try It Yourself

1. **Manual conversion**: Convert 173 to binary by hand using the division method. Then verify with `bin(173)`.
2. **Hex colors**: Pick your favorite color, look up its hex code, and use the `hex_to_rgb()` function to extract its components.
3. **Bitwise challenge**: Write a function that counts the number of 1-bits in an integer:
   ```python
   def count_ones(n):
       count = 0
       while n:
           count += n & 1
           n >>= 1
       return count
   
   print(count_ones(42))  # Should be 3 (101010 has three 1s)
   ```
4. **Permission system**: Create a permission checker using bitmasks for a file system with READ, WRITE, EXECUTE, and DELETE permissions.
5. **Format practice**: Print the numbers 0 through 15 in a table showing decimal, binary (4-digit), hex, and octal representations.

## Key Takeaways

- Computers store everything in **binary (base-2)** — sequences of 0s and 1s
- **Hexadecimal (base-16)** is a compact way to represent binary data — each hex digit = 4 bits
- **Octal (base-8)** is used primarily for Unix file permissions
- Python provides `bin()`, `hex()`, `oct()` to convert, and `int(str, base)` to parse
- Use `0b`, `0x`, `0o` prefixes for binary, hex, and octal literals in Python
- **Bitwise operators** (`&`, `|`, `^`, `~`, `<<`, `>>`) manipulate individual bits for efficient computation
- **Bit shifting** left/right is equivalent to multiplying/dividing by powers of 2
- Number systems appear everywhere: **hex colors** (`#FF5500`), **IP addresses**, **file permissions** (`chmod 755`), **memory addresses**, and **character encoding**
- Understanding binary and hex makes you a more effective programmer when working with low-level systems

## What's Next?

Now that you understand how computers represent numbers internally, we'll build on this knowledge as we explore more advanced computing concepts!
