---
id: binary-hex
title: Binary and Hexadecimal Number Systems
chapterId: ch3-computing
order: 1
duration: 25
objectives:
  - Understand binary and hexadecimal
  - Convert between number systems
  - Use Python's bin(), hex(), oct()
  - Perform bitwise operations
  - Apply number systems in programming
---

# Binary and Hexadecimal

## Introduction

Computers use binary (base-2) internally. Understanding binary and hexadecimal (base-16) helps you work with low-level operations.

## Decimal, Binary, Hexadecimal

```python
# Decimal (base-10): 0-9
number = 42

# Binary (base-2): 0-1
binary = 0b101010  # 42 in binary
print(binary)  # 42

# Hexadecimal (base-16): 0-9, A-F
hex_num = 0x2A  # 42 in hex
print(hex_num)  # 42

# Octal (base-8): 0-7
octal = 0o52  # 42 in octal
print(octal)  # 42
```

## Converting Number Systems

```python
# Convert to binary (string)
print(bin(42))  # '0b101010'
print(bin(255))  # '0b11111111'

# Convert to hex (string)
print(hex(42))  # '0x2a'
print(hex(255))  # '0xff'

# Convert to octal (string)
print(oct(42))  # '0o52'
print(oct(255))  # '0o377'

# Convert from string to int
print(int('101010', 2))  # 42 (binary to decimal)
print(int('2a', 16))     # 42 (hex to decimal)
print(int('52', 8))      # 42 (octal to decimal)
```

## Bitwise Operations

```python
a = 0b1100  # 12
b = 0b1010  # 10

# AND: Both bits must be 1
print(bin(a & b))  # 0b1000 (8)

# OR: At least one bit must be 1
print(bin(a | b))  # 0b1110 (14)

# XOR: Bits must be different
print(bin(a ^ b))  # 0b0110 (6)

# NOT: Flip all bits
print(bin(~a))  # -0b1101 (negative due to two's complement)

# Left shift: Multiply by 2
print(bin(a << 1))  # 0b11000 (24)

# Right shift: Divide by 2
print(bin(a >> 1))  # 0b110 (6)
```

## Practical Applications

```python
# Check if number is power of 2
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

print(is_power_of_two(16))  # True
print(is_power_of_two(18))  # False

# Set bit at position
def set_bit(num, position):
    return num | (1 << position)

print(bin(set_bit(0b1000, 0)))  # 0b1001

# Clear bit at position
def clear_bit(num, position):
    return num & ~(1 << position)

print(bin(clear_bit(0b1010, 1)))  # 0b1000

# Toggle bit
def toggle_bit(num, position):
    return num ^ (1 << position)

print(bin(toggle_bit(0b1010, 2)))  # 0b1110
```

## RGB Colors in Hex

```python
# RGB colors often use hex
red = 0xFF0000    # (255, 0, 0)
green = 0x00FF00  # (0, 255, 0)
blue = 0x0000FF   # (0, 0, 255)

# Extract RGB components
def extract_rgb(color):
    r = (color >> 16) & 0xFF  # Shift right 16, get low byte
    g = (color >> 8) & 0xFF   # Shift right 8, get low byte
    b = color & 0xFF          # Get low byte
    return r, g, b

print(extract_rgb(0xFF5733))  # (255, 87, 51)

# Combine RGB to hex
def rgb_to_hex(r, g, b):
    return (r << 16) | (g << 8) | b

print(hex(rgb_to_hex(255, 87, 51)))  # 0xff5733
```

## Summary

**Number Systems:**
- Binary (base-2): 0b prefix
- Octal (base-8): 0o prefix
- Hexadecimal (base-16): 0x prefix
- Decimal (base-10): No prefix

**Conversions:**
- `bin()`, `hex()`, `oct()`: Convert to string
- `int(str, base)`: Convert from string

**Bitwise Operators:**
- `&`: AND
- `|`: OR
- `^`: XOR
- `~`: NOT
- `<<`: Left shift
- `>>`: Right shift

## Next Steps

Next, you'll learn how computer memory works.

