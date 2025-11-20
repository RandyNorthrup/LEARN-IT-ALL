---
id: "72-hexadecimal-system"
title: "Hexadecimal Number System"
chapterId: ch3-computing
order: 3
duration: 25
objectives:
  - Understand the hexadecimal (base-16) number system
  - Convert between hex, decimal, and binary
  - Recognize common hex patterns in computing
  - Use hex for colors, memory addresses, and encoding
  - Apply hex in practical programming scenarios
---

# Hexadecimal Number System

Hexadecimal (hex) is a base-16 number system commonly used in computing because it provides a compact way to represent binary data. Four binary bits equal one hex digit, making conversions easy.

## What is Hexadecimal?

Hexadecimal uses 16 digits: 0-9 and A-F (where A=10, B=11, C=12, D=13, E=14, F=15).

```python
# Hexadecimal literals in Python use 0x prefix
hex_number = 0xFF
print(f"Hex 0xFF = Decimal {hex_number}")  # Hex 0xFF = Decimal 255

# Common hex values
print(f"0x00 = {0x00}")  # 0
print(f"0x0A = {0x0A}")  # 10 (A = 10)
print(f"0x10 = {0x10}")  # 16
print(f"0xFF = {0xFF}")  # 255
print(f"0x100 = {0x100}")  # 256

# Hex digits explained
hex_digits = {
    '0': 0, '1': 1, '2': 2, '3': 3,
    '4': 4, '5': 5, '6': 6, '7': 7,
    '8': 8, '9': 9, 'A': 10, 'B': 11,
    'C': 12, 'D': 13, 'E': 14, 'F': 15
}

print("\nHex digit values:")
for hex_char, value in hex_digits.items():
    print(f"  {hex_char} = {value}")
```

## Why Hexadecimal?

Hex is popular because it's compact and aligns perfectly with binary:

```python
# One hex digit = 4 binary bits (nibble)
conversions = [
    ("0000", "0"),
    ("0001", "1"),
    ("0010", "2"),
    ("0011", "3"),
    ("0100", "4"),
    ("0101", "5"),
    ("0110", "6"),
    ("0111", "7"),
    ("1000", "8"),
    ("1001", "9"),
    ("1010", "A"),
    ("1011", "B"),
    ("1100", "C"),
    ("1101", "D"),
    ("1110", "E"),
    ("1111", "F"),
]

print("Binary → Hex Conversion Table:")
print("Binary | Hex | Decimal")
print("-" * 25)
for binary, hex_digit in conversions:
    decimal = int(binary, 2)
    print(f"{binary} | {hex_digit:^3} | {decimal:^7}")

# Two hex digits = one byte (8 bits)
byte_value = 0xFF  # 11111111 in binary
print(f"\n0xFF = {bin(byte_value)} in binary")  # 0xFF = 0b11111111 in binary
print(f"One byte: 0x00 to 0xFF = 0 to 255 decimal")
```

## Converting Decimal to Hexadecimal

Use `hex()` to convert decimal to hexadecimal:

```python
# Using hex() function
decimal = 255
hex_string = hex(decimal)
print(f"{decimal} in hex: {hex_string}")  # 255 in hex: 0xff

# Remove '0x' prefix
hex_clean = hex(decimal)[2:]
print(f"Without prefix: {hex_clean}")  # Without prefix: ff

# Uppercase hex
hex_upper = hex(decimal)[2:].upper()
print(f"Uppercase: {hex_upper}")  # Uppercase: FF

# Manual conversion: Divide by 16, track remainders
def decimal_to_hex_manual(n):
    """Convert decimal to hexadecimal manually."""
    if n == 0:
        return "0"
    
    hex_digits = "0123456789ABCDEF"
    hex_chars = []
    
    while n > 0:
        remainder = n % 16
        hex_chars.append(hex_digits[remainder])
        n = n // 16
    
    return ''.join(reversed(hex_chars))

print(f"255 = {decimal_to_hex_manual(255)}")   # 255 = FF
print(f"4095 = {decimal_to_hex_manual(4095)}") # 4095 = FFF
print(f"256 = {decimal_to_hex_manual(256)}")   # 256 = 100

# Show conversion steps
def show_hex_conversion_steps(n):
    """Show step-by-step hex conversion."""
    print(f"Converting {n} to hexadecimal:")
    hex_digits = "0123456789ABCDEF"
    original = n
    steps = []
    
    while n > 0:
        remainder = n % 16
        quotient = n // 16
        hex_char = hex_digits[remainder]
        steps.append(f"{n} ÷ 16 = {quotient} remainder {remainder} ({hex_char})")
        n = quotient
    
    for step in steps:
        print(f"  {step}")
    
    result = decimal_to_hex_manual(original)
    print(f"Read remainders bottom-up: 0x{result}")

show_hex_conversion_steps(255)
# Converting 255 to hexadecimal:
#   255 ÷ 16 = 15 remainder 15 (F)
#   15 ÷ 16 = 0 remainder 15 (F)
# Read remainders bottom-up: 0xFF
```

## Converting Hexadecimal to Decimal

Use `int()` with base 16 to convert hex to decimal:

```python
# Using int() with base 16
hex_string = "FF"
decimal = int(hex_string, 16)
print(f"Hex {hex_string} = Decimal {decimal}")  # Hex FF = Decimal 255

# Works with '0x' prefix too
hex_with_prefix = "0xFF"
decimal2 = int(hex_with_prefix, 16)
print(f"Hex {hex_with_prefix} = Decimal {decimal2}")  # Hex 0xFF = Decimal 255

# Case insensitive
print(f"0xff = {int('0xff', 16)}")  # 0xff = 255
print(f"0xFF = {int('0xFF', 16)}")  # 0xFF = 255

# Manual conversion
def hex_to_decimal_manual(hex_str):
    """Convert hex string to decimal manually."""
    hex_digits = "0123456789ABCDEF"
    hex_str = hex_str.upper().replace("0X", "")
    
    decimal = 0
    power = 0
    
    for digit in reversed(hex_str):
        value = hex_digits.index(digit)
        decimal += value * (16 ** power)
        power += 1
    
    return decimal

print(f"FF = {hex_to_decimal_manual('FF')}")     # FF = 255
print(f"1A2B = {hex_to_decimal_manual('1A2B')}") # 1A2B = 6699
print(f"CAFE = {hex_to_decimal_manual('CAFE')}") # CAFE = 51966

# Show calculation steps
def show_hex_to_decimal(hex_str):
    """Show step-by-step hex to decimal conversion."""
    hex_digits = "0123456789ABCDEF"
    hex_str = hex_str.upper().replace("0X", "")
    
    print(f"Converting hex {hex_str} to decimal:")
    total = 0
    
    for i, digit in enumerate(reversed(hex_str)):
        power = i
        value = hex_digits.index(digit)
        contribution = value * (16 ** power)
        total += contribution
        print(f"  Position {power}: {digit} × 16^{power} = {value} × {16**power} = {contribution}")
    
    print(f"Sum: {total}")
    return total

show_hex_to_decimal("2F")
# Converting hex 2F to decimal:
#   Position 0: F × 16^0 = 15 × 1 = 15
#   Position 1: 2 × 16^1 = 2 × 16 = 32
# Sum: 47
```

## Hexadecimal to Binary Conversion

Each hex digit converts directly to 4 binary bits:

```python
# Hex to binary conversion
def hex_to_binary(hex_str):
    """Convert hex to binary."""
    hex_str = hex_str.replace("0x", "").replace("0X", "")
    decimal = int(hex_str, 16)
    binary = bin(decimal)[2:]
    return binary

print(f"0xFF = {hex_to_binary('0xFF')}")    # 0xFF = 11111111
print(f"0x0A = {hex_to_binary('0x0A')}")    # 0x0A = 1010
print(f"0xDEAD = {hex_to_binary('0xDEAD')}") # 0xDEAD = 1101111010101101

# Binary to hex conversion
def binary_to_hex(binary_str):
    """Convert binary to hex."""
    binary_str = binary_str.replace("0b", "").replace("0B", "")
    decimal = int(binary_str, 2)
    hex_str = hex(decimal)[2:].upper()
    return hex_str

print(f"11111111 = 0x{binary_to_hex('11111111')}")  # 11111111 = 0xFF
print(f"10101010 = 0x{binary_to_hex('10101010')}")  # 10101010 = 0xAA

# Direct hex-binary mapping (each hex digit = 4 bits)
hex_binary_map = {
    '0': '0000', '1': '0001', '2': '0010', '3': '0011',
    '4': '0100', '5': '0101', '6': '0110', '7': '0111',
    '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
    'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
}

def hex_to_binary_direct(hex_str):
    """Convert hex to binary using direct mapping."""
    hex_str = hex_str.upper().replace("0X", "")
    binary = ''.join(hex_binary_map[digit] for digit in hex_str)
    return binary

print(f"0xCAFE = {hex_to_binary_direct('0xCAFE')}")
# 0xCAFE = 1100101011111110
# C=1100, A=1010, F=1111, E=1110
```

## Hex Colors (RGB)

Web colors use hex notation for RGB values:

```python
# Hex color format: #RRGGBB
# Each color component is one byte (00-FF)

def parse_hex_color(hex_color):
    """Parse hex color to RGB components."""
    hex_color = hex_color.replace("#", "")
    
    red = int(hex_color[0:2], 16)
    green = int(hex_color[2:4], 16)
    blue = int(hex_color[4:6], 16)
    
    return red, green, blue

# Common colors
colors = {
    "Red": "#FF0000",
    "Green": "#00FF00",
    "Blue": "#0000FF",
    "White": "#FFFFFF",
    "Black": "#000000",
    "Yellow": "#FFFF00",
    "Cyan": "#00FFFF",
    "Magenta": "#FF00FF",
    "Orange": "#FFA500",
    "Purple": "#800080",
}

print("Hex Color → RGB Values:")
for name, hex_code in colors.items():
    r, g, b = parse_hex_color(hex_code)
    print(f"{name:8} {hex_code} → RGB({r:3}, {g:3}, {b:3})")

# Red        #FF0000 → RGB(255,   0,   0)
# Green      #00FF00 → RGB(  0, 255,   0)
# Blue       #0000FF → RGB(  0,   0, 255)
# White      #FFFFFF → RGB(255, 255, 255)
# Black      #000000 → RGB(  0,   0,   0)

# Create hex color from RGB
def rgb_to_hex(red, green, blue):
    """Convert RGB to hex color."""
    return f"#{red:02X}{green:02X}{blue:02X}"

print(f"\nRGB(255, 128, 0) = {rgb_to_hex(255, 128, 0)}")  # #FF8000 (orange)
print(f"RGB(64, 224, 208) = {rgb_to_hex(64, 224, 208)}")  # #40E0D0 (turquoise)
```

## Memory Addresses

Memory addresses are typically shown in hexadecimal:

```python
# Python's id() returns memory address
number = 42
address = id(number)

print(f"Memory address (decimal): {address}")
print(f"Memory address (hex): {hex(address)}")

# Simulating memory addresses
def show_memory_addresses():
    """Show how memory addresses are displayed."""
    objects = [42, "hello", [1, 2, 3], {"key": "value"}]
    
    print("Object Memory Addresses:")
    print(f"{'Object':<20} {'Address (hex)':<20}")
    print("-" * 40)
    
    for obj in objects:
        addr = id(obj)
        hex_addr = hex(addr)
        print(f"{str(obj):<20} {hex_addr:<20}")

show_memory_addresses()
# Object Memory Addresses:
# Object               Address (hex)
# ----------------------------------------
# 42                   0x10a5c8f10
# hello                0x10b2e4ab0
# [1, 2, 3]            0x10b3d5880
# {'key': 'value'}     0x10b3d5900

# Hex addresses are easier to read than decimal
decimal_addr = 4505968400
hex_addr = hex(decimal_addr)
print(f"\nDecimal: {decimal_addr}")
print(f"Hex: {hex_addr}")  # Much more compact!
```

## Byte Sequences and Hex Encoding

```python
# Convert text to hex representation
text = "Hello"
hex_bytes = text.encode().hex()
print(f"'{text}' in hex: {hex_bytes}")  # 'Hello' in hex: 48656c6c6f

# Each character becomes 2 hex digits (1 byte)
for char in text:
    ascii_val = ord(char)
    hex_val = hex(ascii_val)[2:].upper()
    print(f"'{char}' = ASCII {ascii_val:3d} = 0x{hex_val}")
# 'H' = ASCII  72 = 0x48
# 'e' = ASCII 101 = 0x65
# 'l' = ASCII 108 = 0x6C
# 'l' = ASCII 108 = 0x6C
# 'o' = ASCII 111 = 0x6F

# Convert hex back to text
hex_string = "48656c6c6f"
text_decoded = bytes.fromhex(hex_string).decode()
print(f"Hex {hex_string} = '{text_decoded}'")  # Hex 48656c6c6f = 'Hello'

# Hex dump (common in debugging)
def hex_dump(data, bytes_per_line=16):
    """Display data in hex dump format."""
    data_bytes = data.encode() if isinstance(data, str) else data
    
    for i in range(0, len(data_bytes), bytes_per_line):
        chunk = data_bytes[i:i + bytes_per_line]
        
        # Hex representation
        hex_part = ' '.join(f'{b:02X}' for b in chunk)
        
        # ASCII representation
        ascii_part = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
        
        # Print line
        print(f"{i:08X}  {hex_part:<48}  {ascii_part}")

text = "Hello, World! How are you today?"
print("Hex dump:")
hex_dump(text)
# 00000000  48 65 6C 6C 6F 2C 20 57 6F 72 6C 64 21 20 48 6F  Hello, World! Ho
# 00000010  77 20 61 72 65 20 79 6F 75 20 74 6F 64 61 79 3F  w are you today?
```

## Hexadecimal Arithmetic

```python
# Arithmetic with hex values
a = 0x10  # 16 in decimal
b = 0x0F  # 15 in decimal

print(f"0x10 + 0x0F = {a + b} = {hex(a + b)}")  # 31 = 0x1f
print(f"0x10 - 0x0F = {a - b} = {hex(a - b)}")  # 1 = 0x1
print(f"0x10 × 0x0F = {a * b} = {hex(a * b)}")  # 240 = 0xf0
print(f"0x10 ÷ 0x0F = {a // b} = {hex(a // b)}")  # 1 = 0x1

# Hex addition table (like learning addition)
def hex_addition_table():
    """Show hex addition for single digits."""
    print("Hex Addition Table (0-F + 0-F):")
    print("  + ", end="")
    for i in range(16):
        print(f"{i:X} ", end="")
    print()
    print("-" * 50)
    
    for i in range(16):
        print(f"{i:X} | ", end="")
        for j in range(16):
            result = i + j
            if result < 16:
                print(f"{result:X} ", end="")
            else:
                print(f"{hex(result)[2:].upper()} ", end="")
        print()

# Show first few rows
print("\nSample hex addition:")
for i in range(4):
    for j in range(4):
        result = i + j
        print(f"0x{i:X} + 0x{j:X} = 0x{result:X}")
```

## Common Hex Values to Remember

```python
# Important hex values
print("Important hex values:")
print(f"0x00 = {0x00:3d} (minimum byte)")
print(f"0xFF = {0xFF:3d} (maximum byte)")
print(f"0x80 = {0x80:3d} (half byte, sign bit)")
print(f"0x100 = {0x100:3d} (256, one byte overflow)")
print(f"0x400 = {0x400:3d} (1024, 1 KB)")
print(f"0x1000 = {0x1000:3d} (4096, 4 KB)")

# Powers of 16
print("\nPowers of 16:")
for i in range(5):
    value = 16 ** i
    print(f"16^{i} = {value:6d} = 0x{value:X}")
# 16^0 =      1 = 0x1
# 16^1 =     16 = 0x10
# 16^2 =    256 = 0x100
# 16^3 =   4096 = 0x1000
# 16^4 =  65536 = 0x10000

# Hex patterns
print("\nCommon hex patterns:")
print(f"0xAAAA = {0xAAAA} (alternating 1010 bits)")
print(f"0x5555 = {0x5555} (alternating 0101 bits)")
print(f"0xDEAD = {0xDEAD} (common magic number)")
print(f"0xBEEF = {0xBEEF} (common magic number)")
print(f"0xCAFE = {0xCAFE} (common magic number)")
```

## Practical Hex Tools

```python
def format_hex(value, width=2):
    """Format value as hex with specified width."""
    return f"0x{value:0{width}X}"

def parse_hex_string(hex_str):
    """Parse various hex string formats."""
    # Remove common prefixes and separators
    cleaned = hex_str.replace("0x", "").replace("0X", "")
    cleaned = cleaned.replace(":", "").replace("-", "").replace(" ", "")
    
    try:
        return int(cleaned, 16)
    except ValueError:
        return None

# Test parsing
test_strings = [
    "FF",
    "0xFF",
    "0XFF",
    "FF:00:AA",
    "FF-00-AA",
    "FF 00 AA"
]

print("Parsing hex strings:")
for test in test_strings:
    result = parse_hex_string(test)
    print(f"'{test}' → {result} (0x{result:X})")

# Hex validation
def is_valid_hex(hex_str):
    """Check if string is valid hexadecimal."""
    hex_str = hex_str.replace("0x", "").replace("0X", "")
    return all(c in "0123456789ABCDEFabcdef" for c in hex_str)

print(f"\n'FF' is valid hex: {is_valid_hex('FF')}")    # True
print(f"'GG' is valid hex: {is_valid_hex('GG')}")      # False
print(f"'0x1A' is valid hex: {is_valid_hex('0x1A')}")  # True
```

## Summary

- **Hexadecimal** uses base-16 with digits 0-9 and A-F
- **Compact**: One hex digit = 4 binary bits (nibble)
- **Two hex digits** = one byte (8 bits) = 0x00 to 0xFF = 0 to 255
- **Conversions**: Use `hex()` to convert to hex, `int(hex_str, 16)` to convert from hex
- **Colors**: Web colors use #RRGGBB format (e.g., #FF0000 = red)
- **Memory addresses**: Displayed in hex for readability
- **Byte data**: Text and binary data often shown in hex
- **Common values**: 0x00, 0xFF, 0x80, 0x100, 0x1000

Hexadecimal is essential for low-level programming, debugging, web development (colors), and understanding memory addresses. Its compact notation makes binary data much more readable.
