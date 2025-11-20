---
id: "71-binary-number-system"
title: "Binary Number System"
chapterId: ch3-computing
order: 2
duration: 25
objectives:
  - Understand the binary (base-2) number system
  - Convert between binary and decimal numbers
  - Perform basic binary arithmetic operations
  - Recognize binary patterns in computing
  - Use Python to work with binary representations
---

# Binary Number System

Computers use binary (base-2) because digital circuits have two states: on (1) and off (0). Understanding binary is fundamental to understanding how computers store and process data.

## What is Binary?

Binary is a base-2 number system that uses only two digits: 0 and 1.

```python
# Decimal (base-10) uses digits 0-9
decimal_number = 42

# Binary (base-2) uses digits 0-1
binary_number = 0b101010  # 0b prefix indicates binary in Python
print(f"Binary 0b101010 = Decimal {binary_number}")  # Binary 0b101010 = Decimal 42

# Python automatically converts to decimal
result = 0b1010 + 0b0101
print(f"0b1010 + 0b0101 = {result}")  # 0b1010 + 0b0101 = 15
print(f"In binary: {bin(result)}")    # In binary: 0b1111
```

## Place Values in Binary

Each binary digit (bit) represents a power of 2:

```python
# Binary place values (right to left)
# Position: 7    6    5    4    3    2    1    0
# Value:    128  64   32   16   8    4    2    1
# Binary:   1    0    1    0    1    0    1    0

binary = 0b10101010

# Breaking down the value
place_values = [128, 64, 32, 16, 8, 4, 2, 1]
binary_string = "10101010"

print("Binary: 10101010")
print("Position | Bit | Value | Contribution")
print("-" * 40)

total = 0
for i, (bit, value) in enumerate(zip(binary_string, place_values)):
    contribution = int(bit) * value
    total += contribution
    print(f"{i:^8} | {bit:^3} | {value:^5} | {contribution:^12}")

print(f"\nTotal: {total}")
# Binary: 10101010
# Position | Bit | Value | Contribution
# ----------------------------------------
#    0     |  1  |  128  |     128
#    1     |  0  |  64   |      0
#    2     |  1  |  32   |      32
#    3     |  0  |  16   |      0
#    4     |  1  |  8    |      8
#    5     |  0  |  4    |      0
#    6     |  1  |  2    |      2
#    7     |  0  |  1    |      0
# Total: 170
```

## Converting Decimal to Binary

Python provides `bin()` to convert decimal to binary:

```python
# Using bin() function
decimal = 42
binary_string = bin(decimal)
print(f"{decimal} in binary: {binary_string}")  # 42 in binary: 0b101010

# Remove '0b' prefix
binary_clean = bin(decimal)[2:]
print(f"Without prefix: {binary_clean}")  # Without prefix: 101010

# Manual conversion: Divide by 2, track remainders
def decimal_to_binary_manual(n):
    """Convert decimal to binary manually."""
    if n == 0:
        return "0"
    
    binary_digits = []
    while n > 0:
        remainder = n % 2
        binary_digits.append(str(remainder))
        n = n // 2
    
    # Reverse because we built it backwards
    return ''.join(reversed(binary_digits))

print(f"42 = {decimal_to_binary_manual(42)}")   # 42 = 101010
print(f"255 = {decimal_to_binary_manual(255)}") # 255 = 11111111
print(f"128 = {decimal_to_binary_manual(128)}") # 128 = 10000000

# Demonstrate the division process
def show_conversion_steps(n):
    """Show step-by-step conversion."""
    print(f"Converting {n} to binary:")
    original = n
    steps = []
    
    while n > 0:
        remainder = n % 2
        quotient = n // 2
        steps.append(f"{n} ÷ 2 = {quotient} remainder {remainder}")
        n = quotient
    
    for step in steps:
        print(f"  {step}")
    
    remainders = [int(step.split()[-1]) for step in steps]
    binary = ''.join(str(r) for r in reversed(remainders))
    print(f"Read remainders bottom-up: {binary}")
    print(f"Verification: {int(binary, 2)} = {original}")

show_conversion_steps(42)
# Converting 42 to binary:
#   42 ÷ 2 = 21 remainder 0
#   21 ÷ 2 = 10 remainder 1
#   10 ÷ 2 = 5 remainder 0
#   5 ÷ 2 = 2 remainder 1
#   2 ÷ 2 = 1 remainder 0
#   1 ÷ 2 = 0 remainder 1
# Read remainders bottom-up: 101010
# Verification: 42 = 42
```

## Converting Binary to Decimal

Use `int()` with base 2 to convert binary to decimal:

```python
# Using int() with base 2
binary_string = "101010"
decimal = int(binary_string, 2)
print(f"Binary {binary_string} = Decimal {decimal}")  # Binary 101010 = Decimal 42

# Works with '0b' prefix too
binary_with_prefix = "0b101010"
decimal2 = int(binary_with_prefix, 2)
print(f"Binary {binary_with_prefix} = Decimal {decimal2}")  # Binary 0b101010 = Decimal 42

# Manual conversion: Multiply each bit by its place value
def binary_to_decimal_manual(binary_str):
    """Convert binary string to decimal manually."""
    decimal = 0
    power = 0
    
    # Process from right to left
    for bit in reversed(binary_str):
        if bit == '1':
            decimal += 2 ** power
        power += 1
    
    return decimal

print(f"101010 = {binary_to_decimal_manual('101010')}")   # 101010 = 42
print(f"11111111 = {binary_to_decimal_manual('11111111')}")  # 11111111 = 255

# Show calculation steps
def show_binary_to_decimal(binary_str):
    """Show step-by-step binary to decimal conversion."""
    print(f"Converting binary {binary_str} to decimal:")
    total = 0
    
    for i, bit in enumerate(reversed(binary_str)):
        power = i
        value = 2 ** power
        contribution = int(bit) * value
        total += contribution
        print(f"  Position {power}: {bit} × 2^{power} = {bit} × {value} = {contribution}")
    
    print(f"Sum: {total}")
    return total

show_binary_to_decimal("1011")
# Converting binary 1011 to decimal:
#   Position 0: 1 × 2^0 = 1 × 1 = 1
#   Position 1: 1 × 2^1 = 1 × 2 = 2
#   Position 2: 0 × 2^2 = 0 × 4 = 0
#   Position 3: 1 × 2^3 = 1 × 8 = 8
# Sum: 11
```

## Binary Arithmetic

Perform basic arithmetic operations in binary:

```python
# Addition in binary
a = 0b1010  # 10 in decimal
b = 0b0101  # 5 in decimal
result = a + b
print(f"0b1010 + 0b0101 = {result} (binary: {bin(result)})")
# 0b1010 + 0b0101 = 15 (binary: 0b1111)

# Subtraction in binary
result = a - b
print(f"0b1010 - 0b0101 = {result} (binary: {bin(result)})")
# 0b1010 - 0b0101 = 5 (binary: 0b101)

# Multiplication in binary
result = a * b
print(f"0b1010 × 0b0101 = {result} (binary: {bin(result)})")
# 0b1010 × 0b0101 = 50 (binary: 0b110010)

# Division in binary
result = a // b
print(f"0b1010 ÷ 0b0101 = {result} (binary: {bin(result)})")
# 0b1010 ÷ 0b0101 = 2 (binary: 0b10)

# Binary addition with carry demonstration
def add_binary_with_steps(bin1, bin2):
    """Demonstrate binary addition with carry."""
    # Convert to integers, add, convert back
    num1 = int(bin1, 2)
    num2 = int(bin2, 2)
    result = num1 + num2
    
    print(f"  {bin1:>8}")
    print(f"+ {bin2:>8}")
    print("-" * 10)
    print(f"  {bin(result)[2:]:>8}")
    print(f"Decimal: {num1} + {num2} = {result}")

add_binary_with_steps("1011", "0110")
#      1011
# +    0110
# ----------
#     10001
# Decimal: 11 + 6 = 17
```

## Common Binary Patterns

```python
# Powers of 2 in binary (single bit set)
print("Powers of 2 in binary:")
for i in range(8):
    value = 2 ** i
    print(f"2^{i} = {value:3d} = {bin(value):>10}")
# Powers of 2 in binary:
# 2^0 =   1 =       0b1
# 2^1 =   2 =      0b10
# 2^2 =   4 =     0b100
# 2^3 =   8 =    0b1000
# 2^4 =  16 =   0b10000
# 2^5 =  32 =  0b100000
# 2^6 =  64 = 0b1000000
# 2^7 = 128 = 0b10000000

# All bits set (2^n - 1)
print("\nAll bits set patterns:")
for n in range(1, 9):
    value = (2 ** n) - 1
    print(f"{n} bits: {value:3d} = {bin(value):>10}")
# All bits set patterns:
# 1 bits:   1 =       0b1
# 2 bits:   3 =      0b11
# 3 bits:   7 =     0b111
# 4 bits:  15 =    0b1111
# 5 bits:  31 =   0b11111
# 6 bits:  63 =  0b111111
# 7 bits: 127 = 0b1111111
# 8 bits: 255 = 0b11111111

# Alternating patterns
print("\nAlternating patterns:")
print(f"0b10101010 = {0b10101010}")  # 170
print(f"0b01010101 = {0b01010101}")  # 85
```

## Bits, Bytes, and Storage

```python
# Bit: Single binary digit (0 or 1)
bit = 1

# Nibble: 4 bits (can represent 0-15)
nibble = 0b1111  # Maximum nibble value = 15
print(f"Max nibble: {nibble}")  # Max nibble: 15

# Byte: 8 bits (can represent 0-255)
byte = 0b11111111  # Maximum byte value = 255
print(f"Max byte: {byte}")  # Max byte: 255

# Common byte values
print("\nCommon byte boundaries:")
print(f"Minimum byte: {0b00000000} = 0")
print(f"Maximum byte: {0b11111111} = 255")
print(f"Half byte: {0b10000000} = 128")

# Storage size demonstration
def show_storage_sizes():
    """Show common storage sizes in binary."""
    units = [
        ("1 bit", 1),
        ("1 nibble (4 bits)", 4),
        ("1 byte (8 bits)", 8),
        ("1 kilobyte (1024 bytes)", 1024 * 8),
        ("1 megabyte (1024 KB)", 1024 * 1024 * 8),
    ]
    
    print("Storage units:")
    for name, bits in units[:3]:  # Show first 3
        max_value = (2 ** bits) - 1
        print(f"{name:25} can represent 0 to {max_value}")

show_storage_sizes()
# Storage units:
# 1 bit                     can represent 0 to 1
# 1 nibble (4 bits)        can represent 0 to 15
# 1 byte (8 bits)          can represent 0 to 255
```

## Negative Numbers in Binary (Two's Complement)

```python
# Python uses two's complement for negative numbers
positive = 5
negative = -5

print(f"Positive {positive}: {bin(positive)}")  # 0b101
print(f"Negative {negative}: {bin(negative)}")  # -0b101

# Two's complement: Invert bits and add 1
def twos_complement(n, bits=8):
    """Calculate two's complement representation."""
    if n >= 0:
        return bin(n)
    
    # For negative: invert bits and add 1
    # Example: -5 in 8 bits
    # 1. Start with positive: 00000101
    # 2. Invert bits: 11111010
    # 3. Add 1: 11111011
    positive = abs(n)
    inverted = (1 << bits) - 1 - positive  # Invert bits
    result = inverted + 1  # Add 1
    
    return bin(result)

print(f"-5 in 8-bit two's complement: {twos_complement(-5, 8)}")
# -5 in 8-bit two's complement: 0b11111011

# Verify by converting back
byte_value = 0b11111011
# If MSB is 1, it's negative in two's complement
if byte_value & 0b10000000:  # Check sign bit
    # Convert back: subtract 1, invert, negate
    print("Negative number detected")
```

## Practical Binary Applications

```python
# File sizes are measured in bytes
file_size_bytes = 1024
file_size_bits = file_size_bytes * 8
print(f"File size: {file_size_bytes} bytes = {file_size_bits} bits")
# File size: 1024 bytes = 8192 bits

# IP addresses are 32 bits (4 bytes)
ip_address = "192.168.1.1"
ip_parts = ip_address.split(".")
ip_binary = [bin(int(part))[2:].zfill(8) for part in ip_parts]
print(f"IP {ip_address} in binary: {'.'.join(ip_binary)}")
# IP 192.168.1.1 in binary: 11000000.10101000.00000001.00000001

# Colors in RGB (each component is 1 byte)
red = 255
green = 128
blue = 64
print(f"RGB({red}, {green}, {blue}) in binary:")
print(f"  Red:   {bin(red)[2:].zfill(8)}")
print(f"  Green: {bin(green)[2:].zfill(8)}")
print(f"  Blue:  {bin(blue)[2:].zfill(8)}")
# RGB(255, 128, 64) in binary:
#   Red:   11111111
#   Green: 10000000
#   Blue:  01000000

# Character encoding (ASCII uses 7 bits)
char = 'A'
ascii_value = ord(char)
print(f"Character '{char}' = ASCII {ascii_value} = Binary {bin(ascii_value)}")
# Character 'A' = ASCII 65 = Binary 0b1000001
```

## Binary Utilities

```python
def format_binary(n, bits=8):
    """Format binary number with leading zeros."""
    binary = bin(n)[2:]  # Remove '0b'
    return binary.zfill(bits)

def binary_table(start, end):
    """Print decimal to binary conversion table."""
    print(f"{'Decimal':>8} | {'Binary':>8}")
    print("-" * 20)
    for n in range(start, end + 1):
        print(f"{n:>8} | {format_binary(n, 8)}")

# Show table for 0-15
binary_table(0, 15)
# Decimal |   Binary
# --------------------
#        0 | 00000000
#        1 | 00000001
#        2 | 00000010
#        3 | 00000011
#        4 | 00000100
#        5 | 00000101
#        6 | 00000110
#        7 | 00000111
#        8 | 00001000
#        9 | 00001001
#       10 | 00001010
#       11 | 00001011
#       12 | 00001100
#       13 | 00001101
#       14 | 00001110
#       15 | 00001111
```

## Summary

- **Binary** uses only 0 and 1, perfect for digital circuits
- **Place values** in binary are powers of 2 (1, 2, 4, 8, 16, ...)
- **Conversion**: Use `bin()` to convert to binary, `int(binary_str, 2)` to convert from binary
- **Byte** is 8 bits, can represent 0-255
- **Powers of 2** appear everywhere in computing (256, 512, 1024, etc.)
- **Applications**: File sizes, IP addresses, colors, character encoding

Understanding binary is essential for working with low-level operations, networking, graphics, and understanding how computers truly work.
