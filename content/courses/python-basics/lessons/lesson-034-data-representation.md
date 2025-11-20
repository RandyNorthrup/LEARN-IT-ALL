---
id: "76-data-representation"
title: "Data Representation and Encoding"
chapterId: ch3-computing
order: 7
duration: 30
objectives:
  - Understand how text, numbers, and media are encoded
  - Learn about ASCII, Unicode, and UTF-8
  - Recognize different data encoding formats
  - Work with character encoding in Python
  - Understand image, audio, and video encoding basics
---

# Data Representation and Encoding

Everything stored in a computer is ultimately binary (0s and 1s). Understanding how different types of data are encoded helps you work with text, files, and APIs effectively.

## Text Encoding

Computers represent text by assigning numbers to characters:

```python
# ASCII: 7-bit encoding for English characters (0-127)
char = 'A'
ascii_value = ord(char)  # Get ASCII value
print(f"'{char}' = ASCII {ascii_value} = Binary {bin(ascii_value)} = Hex {hex(ascii_value)}")
# 'A' = ASCII 65 = Binary 0b1000001 = Hex 0x41

# Common ASCII values
print("\nCommon ASCII Values:")
print(f"'0' = {ord('0')}")  # 48
print(f"'A' = {ord('A')}")  # 65
print(f"'a' = {ord('a')}")  # 97
print(f"Space = {ord(' ')}")  # 32
print(f"Newline = {ord(chr(10))}")  # 10

# Convert ASCII value back to character
ascii_code = 65
character = chr(ascii_code)
print(f"\nASCII {ascii_code} = '{character}'")  # ASCII 65 = 'A'

# ASCII table sample
def show_ascii_table(start, end):
    """Display ASCII table range."""
    print(f"\nASCII Table ({start}-{end}):")
    print(f"{'Dec':<5} {'Hex':<5} {'Bin':<12} {'Char'}")
    print("-" * 30)
    
    for code in range(start, end + 1):
        char = chr(code)
        # Show printable characters only
        if 32 <= code <= 126:
            print(f"{code:<5} {hex(code):<5} {bin(code):<12} '{char}'")
        else:
            print(f"{code:<5} {hex(code):<5} {bin(code):<12} (control)")

show_ascii_table(65, 75)  # Show A-K
# ASCII Table (65-75):
# Dec   Hex   Bin          Char
# ------------------------------
# 65    0x41  0b1000001    'A'
# 66    0x42  0b1000010    'B'
# 67    0x43  0b1000011    'C'
# ...
```

## Unicode and UTF-8

Unicode supports all writing systems worldwide:

```python
# Unicode: Universal character set (supports 143,000+ characters)
# UTF-8: Variable-length encoding (1-4 bytes per character)

# English: 1 byte
english = "Hello"
print(f"English: '{english}'")
print(f"  Bytes: {english.encode('utf-8')}")
print(f"  Length: {len(english.encode('utf-8'))} bytes")
# English: 'Hello'
#   Bytes: b'Hello'
#   Length: 5 bytes

# Emoji: Multiple bytes
emoji = "😀"
print(f"\nEmoji: '{emoji}'")
print(f"  Unicode code point: U+{ord(emoji):04X}")
print(f"  Bytes: {emoji.encode('utf-8')}")
print(f"  Length: {len(emoji.encode('utf-8'))} bytes")
# Emoji: '😀'
#   Unicode code point: U+1F600
#   Bytes: b'\xf0\x9f\x98\x80'
#   Length: 4 bytes

# Chinese: Multiple bytes
chinese = "你好"
print(f"\nChinese: '{chinese}'")
print(f"  Bytes: {chinese.encode('utf-8')}")
print(f"  Length: {len(chinese.encode('utf-8'))} bytes")
# Chinese: '你好'
#   Bytes: b'\xe4\xbd\xa0\xe5\xa5\xbd'
#   Length: 6 bytes (3 bytes per character)

# Unicode categories
def show_unicode_examples():
    """Show various Unicode characters."""
    examples = [
        ("Latin", "A", "Basic Latin alphabet"),
        ("Greek", "Α", "Greek alphabet"),
        ("Cyrillic", "А", "Cyrillic alphabet"),
        ("Arabic", "أ", "Arabic script"),
        ("Hebrew", "א", "Hebrew alphabet"),
        ("Chinese", "中", "Chinese character"),
        ("Japanese", "あ", "Japanese Hiragana"),
        ("Korean", "한", "Korean Hangul"),
        ("Emoji", "🎉", "Emoji/symbols"),
        ("Math", "∑", "Mathematical symbols"),
    ]
    
    print("\nUnicode Character Examples:")
    print(f"{'Category':<12} {'Char':<5} {'Code Point':<12} {'UTF-8 Bytes':<15} {'Description'}")
    print("-" * 70)
    
    for category, char, description in examples:
        code_point = f"U+{ord(char):04X}"
        utf8_bytes = len(char.encode('utf-8'))
        print(f"{category:<12} {char:<5} {code_point:<12} {utf8_bytes} bytes{' ':<8} {description}")

show_unicode_examples()
```

## Encoding and Decoding

```python
# Encoding: String → Bytes
text = "Hello, World!"
encoded = text.encode('utf-8')  # Encode to bytes
print(f"Original: {text}")
print(f"Encoded: {encoded}")
print(f"Type: {type(encoded)}")
# Original: Hello, World!
# Encoded: b'Hello, World!'
# Type: <class 'bytes'>

# Decoding: Bytes → String
decoded = encoded.decode('utf-8')  # Decode from bytes
print(f"Decoded: {decoded}")
# Decoded: Hello, World!

# Different encodings
text = "Café"
encodings = ['utf-8', 'latin-1', 'ascii']

print("\nSame text in different encodings:")
for encoding in encodings:
    try:
        encoded = text.encode(encoding)
        print(f"{encoding:10} {encoded}")
    except UnicodeEncodeError as e:
        print(f"{encoding:10} ERROR: Cannot encode 'é'")

# utf-8      b'Caf\xc3\xa9'
# latin-1    b'Caf\xe9'
# ascii      ERROR: Cannot encode 'é'

# Common encoding issues
def demonstrate_encoding_errors():
    """Show common encoding problems."""
    print("\nCommon Encoding Errors:")
    
    # Error 1: Wrong encoding assumption
    text = "Café"
    bytes_utf8 = text.encode('utf-8')
    
    try:
        # Trying to decode UTF-8 as latin-1
        wrong = bytes_utf8.decode('latin-1')
        print(f"Wrong decoding: '{wrong}' (garbled)")
    except Exception as e:
        print(f"Error: {e}")
    
    # Error 2: Cannot encode character
    text_with_emoji = "Hello 😀"
    try:
        text_with_emoji.encode('ascii')
    except UnicodeEncodeError:
        print("Cannot encode emoji with ASCII (only supports 0-127)")
    
    # Error 3: Cannot decode bytes
    invalid_bytes = b'\xff\xfe'
    try:
        invalid_bytes.decode('utf-8')
    except UnicodeDecodeError:
        print("Invalid UTF-8 byte sequence")

demonstrate_encoding_errors()
```

## Numbers Encoding

```python
# Integer representation
def show_integer_encoding():
    """Show how integers are stored."""
    numbers = [0, 1, 42, 255, 256, -1, -128]
    
    print("Integer Encoding:")
    print(f"{'Number':<10} {'Binary (8-bit)':<15} {'Hex':<8} {'Bytes (32-bit)'}")
    print("-" * 60)
    
    for num in numbers:
        # 8-bit representation (for display)
        if -128 <= num <= 127:
            binary = bin(num & 0xFF)[2:].zfill(8)
        else:
            binary = "overflow"
        
        hex_str = hex(num)
        
        # 32-bit representation
        bytes_repr = num.to_bytes(4, byteorder='big', signed=True).hex()
        
        print(f"{num:<10} {binary:<15} {hex_str:<8} {bytes_repr}")

show_integer_encoding()
# Integer Encoding:
# Number     Binary (8-bit)   Hex      Bytes (32-bit)
# ------------------------------------------------------------
# 0          00000000         0x0      00000000
# 1          00000001         0x1      00000001
# 42         00101010         0x2a     0000002a
# 255        11111111         0xff     000000ff
# 256        overflow         0x100    00000100
# -1         11111111         -0x1     ffffffff
# -128       10000000         -0x80    ffffff80

# Floating-point representation (simplified)
import struct

def show_float_encoding():
    """Show how floats are stored (IEEE 754)."""
    numbers = [0.0, 1.0, 3.14, -2.5, 0.1]
    
    print("\nFloating-Point Encoding (IEEE 754):")
    print(f"{'Number':<10} {'Bytes (hex)':<20} {'Binary (simplified)'}")
    print("-" * 60)
    
    for num in numbers:
        # Pack as 32-bit float
        bytes_repr = struct.pack('f', num)
        hex_repr = bytes_repr.hex()
        
        # Convert to binary for display
        binary = bin(int(hex_repr, 16))[2:].zfill(32)
        binary_formatted = f"{binary[:1]} {binary[1:9]} {binary[9:]}"
        
        print(f"{num:<10} {hex_repr:<20} {binary_formatted}")

show_float_encoding()
# Floating-Point Encoding (IEEE 754):
# Number     Bytes (hex)          Binary (simplified)
# ------------------------------------------------------------
# 0.0        00000000             0 00000000 00000000000000000000000
# 1.0        3f800000             0 01111111 00000000000000000000000
# 3.14       4048f5c3             0 10000000 10010001111010111000011
```

## Image Encoding

```python
# Images are grids of pixels, each pixel has color values
def explain_image_encoding():
    """Explain how images are encoded."""
    print("Image Encoding:")
    
    print("\n1. Grayscale Image:")
    print("   - Each pixel: 1 byte (0-255)")
    print("   - 0 = black, 255 = white, between = gray")
    print("   - Example: 100x100 grayscale = 10,000 bytes")
    
    print("\n2. RGB Color Image:")
    print("   - Each pixel: 3 bytes (Red, Green, Blue)")
    print("   - Each component: 0-255")
    print("   - Example: 100x100 RGB = 30,000 bytes")
    
    print("\n3. RGBA (with transparency):")
    print("   - Each pixel: 4 bytes (Red, Green, Blue, Alpha)")
    print("   - Alpha: 0 = transparent, 255 = opaque")
    print("   - Example: 100x100 RGBA = 40,000 bytes")
    
    print("\n4. Common Formats:")
    formats = [
        ("PNG", "Lossless compression, supports transparency"),
        ("JPEG", "Lossy compression, smaller files, photos"),
        ("GIF", "Limited colors (256), supports animation"),
        ("BMP", "Uncompressed, large files"),
        ("WebP", "Modern format, better compression"),
    ]
    
    for fmt, description in formats:
        print(f"   {fmt:<8} {description}")

explain_image_encoding()

# Simulate simple image
class SimpleImage:
    """Simplified image representation."""
    
    def __init__(self, width, height):
        self.width = width
        self.height = height
        # Each pixel is (R, G, B) tuple
        self.pixels = [[(0, 0, 0) for _ in range(width)] for _ in range(height)]
    
    def set_pixel(self, x, y, rgb):
        """Set pixel color."""
        if 0 <= x < self.width and 0 <= y < self.height:
            self.pixels[y][x] = rgb
    
    def get_pixel(self, x, y):
        """Get pixel color."""
        if 0 <= x < self.width and 0 <= y < self.height:
            return self.pixels[y][x]
        return None
    
    def size_bytes(self):
        """Calculate size in bytes."""
        return self.width * self.height * 3  # 3 bytes per pixel (RGB)
    
    def draw_rectangle(self, x1, y1, x2, y2, rgb):
        """Draw filled rectangle."""
        for y in range(y1, y2 + 1):
            for x in range(x1, x2 + 1):
                self.set_pixel(x, y, rgb)
    
    def print_ascii(self):
        """Print ASCII representation."""
        print(f"\n{self.width}x{self.height} Image (ASCII representation):")
        for row in self.pixels:
            line = ""
            for r, g, b in row:
                # Convert to grayscale and ASCII
                gray = (r + g + b) // 3
                if gray > 200:
                    line += "  "
                elif gray > 150:
                    line += "░░"
                elif gray > 100:
                    line += "▒▒"
                elif gray > 50:
                    line += "▓▓"
                else:
                    line += "██"
            print(line)

# Create simple image
img = SimpleImage(10, 10)

# Draw some shapes
img.draw_rectangle(0, 0, 9, 9, (50, 50, 50))    # Dark background
img.draw_rectangle(2, 2, 7, 7, (200, 200, 200))  # Light square
img.draw_rectangle(4, 4, 5, 5, (255, 0, 0))      # Red center

img.print_ascii()
print(f"Image size: {img.size_bytes()} bytes")
```

## Audio and Video Encoding

```python
def explain_audio_encoding():
    """Explain audio encoding basics."""
    print("Audio Encoding:")
    
    print("\n1. Sound Wave → Digital:")
    print("   - Sample Rate: How many measurements per second (44.1 kHz typical)")
    print("   - Bit Depth: Precision of each sample (16-bit typical)")
    print("   - Channels: Mono (1) or Stereo (2)")
    
    print("\n2. Calculate Audio Size:")
    sample_rate = 44100  # samples per second
    bit_depth = 16  # bits per sample
    channels = 2  # stereo
    duration = 60  # seconds
    
    bits_per_second = sample_rate * bit_depth * channels
    bytes_per_second = bits_per_second // 8
    total_bytes = bytes_per_second * duration
    
    print(f"   1 minute of CD-quality audio:")
    print(f"   {sample_rate} Hz × {bit_depth} bit × {channels} channels × {duration} seconds")
    print(f"   = {total_bytes:,} bytes = {total_bytes / (1024 * 1024):.1f} MB")
    
    print("\n3. Audio Formats:")
    formats = [
        ("WAV", "Uncompressed, large files"),
        ("MP3", "Lossy compression (1/10 size)"),
        ("FLAC", "Lossless compression"),
        ("AAC", "Better than MP3, used by Apple"),
        ("OGG", "Open-source alternative"),
    ]
    
    for fmt, description in formats:
        print(f"   {fmt:<6} {description}")

explain_audio_encoding()

def explain_video_encoding():
    """Explain video encoding basics."""
    print("\nVideo Encoding:")
    
    print("\n1. Video = Images + Audio:")
    print("   - Frame Rate: Images per second (24-60 fps typical)")
    print("   - Resolution: Width × Height (1920×1080 = Full HD)")
    print("   - Each frame: Like an image (millions of bytes)")
    
    print("\n2. Calculate Video Size (uncompressed):")
    width = 1920
    height = 1080
    fps = 30
    duration = 60  # seconds
    bytes_per_pixel = 3  # RGB
    
    frame_size = width * height * bytes_per_pixel
    total_frames = fps * duration
    total_bytes = frame_size * total_frames
    
    print(f"   1 minute of 1080p 30fps:")
    print(f"   {width}×{height} × {bytes_per_pixel} bytes × {fps} fps × {duration} seconds")
    print(f"   = {total_bytes:,} bytes = {total_bytes / (1024**3):.1f} GB (uncompressed!)")
    
    print("\n3. Compression is Essential:")
    print("   - H.264: Common codec (50-100x compression)")
    print("   - H.265: Better compression than H.264")
    print("   - VP9: Open-source, used by YouTube")
    print("   - AV1: Newest, best compression")
    print(f"   - With compression: 1 min ≈ {total_bytes / (1024**2) / 75:.0f} MB")

explain_video_encoding()
```

## Data Serialization

```python
import json

def explain_serialization():
    """Explain data serialization formats."""
    print("Data Serialization Formats:")
    
    # Sample data
    data = {
        "name": "Alice",
        "age": 30,
        "email": "alice@example.com",
        "hobbies": ["reading", "coding", "hiking"],
        "address": {
            "city": "NYC",
            "zip": "10001"
        }
    }
    
    print("\n1. JSON (JavaScript Object Notation):")
    json_str = json.dumps(data, indent=2)
    print(json_str)
    print(f"   Size: {len(json_str)} bytes")
    print("   - Human-readable text format")
    print("   - Widely used for web APIs")
    
    print("\n2. Binary Formats (more efficient):")
    print("   - Pickle: Python-specific binary format")
    print("   - MessagePack: Like JSON but binary")
    print("   - Protocol Buffers: Google's format")
    print("   - Avro: Apache's format")
    
    print("\n3. Why Serialization?")
    print("   - Save data to files")
    print("   - Send data over network")
    print("   - Store in databases")
    print("   - Share between programs/languages")

explain_serialization()

# JSON example
data = {"name": "Bob", "score": 95}
json_string = json.dumps(data)
print(f"\nPython dict: {data}")
print(f"JSON string: {json_string}")
print(f"Type: {type(json_string)}")

# Parse JSON back
parsed = json.loads(json_string)
print(f"Parsed back: {parsed}")
```

## Base64 Encoding

```python
import base64

def explain_base64():
    """Explain Base64 encoding."""
    print("Base64 Encoding:")
    print("  - Converts binary data to ASCII text")
    print("  - Uses 64 characters: A-Z, a-z, 0-9, +, /")
    print("  - Used for embedding binary in text (email, URLs)")
    print("  - Increases size by ~33%")
    
    # Encode
    text = "Hello, World!"
    text_bytes = text.encode('utf-8')
    encoded = base64.b64encode(text_bytes)
    
    print(f"\nOriginal: '{text}'")
    print(f"Bytes: {text_bytes}")
    print(f"Base64: {encoded.decode('ascii')}")
    print(f"Size: {len(text)} → {len(encoded)} bytes ({len(encoded)/len(text):.1f}x)")
    
    # Decode
    decoded = base64.b64decode(encoded)
    decoded_text = decoded.decode('utf-8')
    print(f"Decoded: '{decoded_text}'")
    
    # Use case: Embed image in HTML
    print("\nUse case: Data URLs in HTML")
    print("  <img src='data:image/png;base64,iVBORw0KGgo...' />")

explain_base64()
```

## Summary

- **Text encoding**: ASCII (English only), UTF-8 (universal, variable-length)
- **Numbers**: Integers use binary, floats use IEEE 754 format
- **Images**: Grid of pixels, each pixel has RGB values (3 bytes)
- **Audio**: Digital samples of sound wave (44.1 kHz, 16-bit typical)
- **Video**: Sequence of images + audio (requires heavy compression)
- **Serialization**: Convert data structures to storable/transmittable format (JSON, binary)
- **Base64**: Encode binary data as ASCII text for embedding
- **Compression**: Reduces file size (lossless or lossy)

Understanding data encoding helps you work with files, APIs, and multimedia in Python effectively.
