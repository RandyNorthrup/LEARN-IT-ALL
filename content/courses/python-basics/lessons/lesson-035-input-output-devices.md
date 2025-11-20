---
id: "77-input-output-devices"
title: "Input and Output Devices"
chapterId: ch3-computing
order: 8
duration: 25
objectives:
  - Understand how input devices work and communicate with computers
  - Learn about output devices and display technologies
  - Recognize different device interfaces and protocols
  - Work with Python's input/output capabilities
  - Understand device drivers and communication layers
---

# Input and Output Devices

Input/output (I/O) devices allow humans to interact with computers. Understanding how these devices work helps you appreciate the full computing stack.

## Input Devices

### Keyboard

```python
# Keyboards send scan codes for each key press
def simulate_keyboard():
    """Simulate keyboard input processing."""
    # Scan codes (simplified)
    scan_codes = {
        'A': 0x1E, 'B': 0x30, 'C': 0x2E, 'D': 0x20, 'E': 0x12,
        'ENTER': 0x1C, 'SPACE': 0x39, 'SHIFT': 0x2A, 'CTRL': 0x1D,
    }
    
    class Keyboard:
        """Simplified keyboard simulation."""
        
        def __init__(self):
            self.keys_pressed = set()
            self.modifiers = {'shift': False, 'ctrl': False, 'alt': False}
        
        def key_down(self, key):
            """Simulate key press."""
            self.keys_pressed.add(key)
            
            # Handle modifiers
            if key.upper() == 'SHIFT':
                self.modifiers['shift'] = True
            elif key.upper() == 'CTRL':
                self.modifiers['ctrl'] = True
            
            print(f"Key down: {key} (scan code: {scan_codes.get(key.upper(), '0x00')})")
        
        def key_up(self, key):
            """Simulate key release."""
            self.keys_pressed.discard(key)
            
            # Handle modifiers
            if key.upper() == 'SHIFT':
                self.modifiers['shift'] = False
            elif key.upper() == 'CTRL':
                self.modifiers['ctrl'] = False
            
            print(f"Key up: {key}")
        
        def get_character(self, key):
            """Convert key to character considering modifiers."""
            if self.modifiers['shift']:
                return key.upper()
            return key.lower()
        
        def is_modifier_pressed(self, modifier):
            """Check if modifier key is pressed."""
            return self.modifiers.get(modifier, False)

    # Simulate typing "Hello"
    keyboard = Keyboard()
    
    print("Simulating typing 'Hello':")
    keys = ['SHIFT', 'H', 'SHIFT', 'e', 'l', 'l', 'o']
    
    for key in keys:
        keyboard.key_down(key)
        if key not in ['SHIFT', 'CTRL', 'ALT']:
            char = keyboard.get_character(key)
            print(f"  Character: '{char}'")
        keyboard.key_up(key)
        print()

simulate_keyboard()
```

### Mouse

```python
class Mouse:
    """Simulate mouse input."""
    
    def __init__(self, screen_width=1920, screen_height=1080):
        self.x = 0
        self.y = 0
        self.screen_width = screen_width
        self.screen_height = screen_height
        self.left_button = False
        self.right_button = False
        self.middle_button = False
    
    def move(self, dx, dy):
        """Move mouse by delta (relative movement)."""
        self.x += dx
        self.y += dy
        
        # Constrain to screen bounds
        self.x = max(0, min(self.x, self.screen_width - 1))
        self.y = max(0, min(self.y, self.screen_height - 1))
        
        print(f"Mouse moved to ({self.x}, {self.y})")
    
    def move_to(self, x, y):
        """Move mouse to absolute position."""
        self.x = max(0, min(x, self.screen_width - 1))
        self.y = max(0, min(y, self.screen_height - 1))
        
        print(f"Mouse at ({self.x}, {self.y})")
    
    def click(self, button='left'):
        """Simulate mouse click."""
        print(f"{button.capitalize()} click at ({self.x}, {self.y})")
        
        # Button down, then up
        self.button_down(button)
        self.button_up(button)
    
    def button_down(self, button='left'):
        """Simulate button press."""
        if button == 'left':
            self.left_button = True
        elif button == 'right':
            self.right_button = True
        elif button == 'middle':
            self.middle_button = True
        
        print(f"  {button} button down")
    
    def button_up(self, button='left'):
        """Simulate button release."""
        if button == 'left':
            self.left_button = False
        elif button == 'right':
            self.right_button = False
        elif button == 'middle':
            self.middle_button = False
        
        print(f"  {button} button up")
    
    def scroll(self, amount):
        """Simulate scroll wheel."""
        direction = "up" if amount > 0 else "down"
        print(f"Scroll {direction} by {abs(amount)}")
    
    def double_click(self):
        """Simulate double click."""
        print(f"Double click at ({self.x}, {self.y})")
        self.click('left')
        self.click('left')

# Simulate mouse operations
mouse = Mouse()

print("Mouse Operations:")
mouse.move_to(100, 200)
mouse.click('left')
mouse.move(50, 30)  # Relative movement
mouse.click('right')
mouse.scroll(3)
mouse.double_click()
```

### Touchscreen

```python
class Touchscreen:
    """Simulate touchscreen input."""
    
    def __init__(self, width=1920, height=1080):
        self.width = width
        self.height = height
        self.active_touches = {}
        self.next_touch_id = 0
    
    def touch_down(self, x, y):
        """Start a touch."""
        touch_id = self.next_touch_id
        self.next_touch_id += 1
        
        self.active_touches[touch_id] = {'x': x, 'y': y, 'start': (x, y)}
        print(f"Touch {touch_id} down at ({x}, {y})")
        
        return touch_id
    
    def touch_move(self, touch_id, x, y):
        """Move an active touch."""
        if touch_id in self.active_touches:
            old_x = self.active_touches[touch_id]['x']
            old_y = self.active_touches[touch_id]['y']
            
            self.active_touches[touch_id]['x'] = x
            self.active_touches[touch_id]['y'] = y
            
            dx = x - old_x
            dy = y - old_y
            
            print(f"Touch {touch_id} moved to ({x}, {y}) [Δ: ({dx}, {dy})]")
    
    def touch_up(self, touch_id):
        """End a touch."""
        if touch_id in self.active_touches:
            touch = self.active_touches[touch_id]
            start_x, start_y = touch['start']
            end_x, end_y = touch['x'], touch['y']
            
            # Calculate swipe distance
            distance = ((end_x - start_x)**2 + (end_y - start_y)**2)**0.5
            
            if distance > 50:
                print(f"Touch {touch_id} up - SWIPE detected (distance: {distance:.0f})")
            else:
                print(f"Touch {touch_id} up - TAP at ({end_x}, {end_y})")
            
            del self.active_touches[touch_id]
    
    def pinch(self, x1, y1, x2, y2):
        """Simulate pinch gesture (zoom)."""
        distance = ((x2 - x1)**2 + (y2 - y1)**2)**0.5
        center_x = (x1 + x2) // 2
        center_y = (y1 + y2) // 2
        
        print(f"Pinch gesture at ({center_x}, {center_y})")
        print(f"  Distance between fingers: {distance:.0f} pixels")

# Simulate touch operations
touch = Touchscreen()

print("\nTouch Operations:")
# Single tap
tid = touch.touch_down(500, 300)
touch.touch_up(tid)

print()
# Swipe
tid = touch.touch_down(100, 500)
touch.touch_move(tid, 200, 500)
touch.touch_move(tid, 400, 500)
touch.touch_up(tid)

print()
# Pinch zoom
touch.pinch(400, 500, 600, 700)
```

## Output Devices

### Display/Monitor

```python
def explain_display_technology():
    """Explain how displays work."""
    print("Display Technology:")
    
    print("\n1. Resolution:")
    resolutions = [
        ("HD", 1280, 720, "720p - Basic HD"),
        ("Full HD", 1920, 1080, "1080p - Standard HD"),
        ("2K", 2560, 1440, "1440p - Quad HD"),
        ("4K", 3840, 2160, "2160p - Ultra HD"),
        ("8K", 7680, 4320, "4320p - Highest consumer"),
    ]
    
    for name, width, height, description in resolutions:
        pixels = width * height
        megapixels = pixels / 1_000_000
        print(f"   {name:10} {width}×{height} = {megapixels:.1f}M pixels - {description}")
    
    print("\n2. Refresh Rate:")
    print("   - 60 Hz: Standard (60 frames per second)")
    print("   - 120 Hz: Smooth (gaming, high-end phones)")
    print("   - 144 Hz: Gaming monitors")
    print("   - 240+ Hz: Competitive gaming")
    
    print("\n3. Display Technologies:")
    technologies = [
        ("LCD", "Liquid Crystal Display - Backlight + liquid crystals"),
        ("LED", "LCD with LED backlight (more efficient)"),
        ("OLED", "Organic LED - Each pixel emits light (better blacks)"),
        ("AMOLED", "Active-Matrix OLED (used in phones)"),
        ("MicroLED", "Tiny LEDs, best quality (expensive)"),
    ]
    
    for tech, description in technologies:
        print(f"   {tech:10} {description}")
    
    print("\n4. Color Depth:")
    print("   - 8-bit: 256 colors per channel = 16.7M colors")
    print("   - 10-bit: 1024 colors per channel = 1.07B colors")
    print("   - HDR: High Dynamic Range (brighter highlights, darker blacks)")

explain_display_technology()

class Display:
    """Simulate display output."""
    
    def __init__(self, width, height, refresh_rate=60):
        self.width = width
        self.height = height
        self.refresh_rate = refresh_rate
        self.frame_buffer = [[(0, 0, 0) for _ in range(width)] for _ in range(height)]
        self.frames_rendered = 0
    
    def set_pixel(self, x, y, rgb):
        """Set pixel color."""
        if 0 <= x < self.width and 0 <= y < self.height:
            self.frame_buffer[y][x] = rgb
    
    def clear(self, rgb=(0, 0, 0)):
        """Clear screen to color."""
        self.frame_buffer = [[rgb for _ in range(self.width)] for _ in range(self.height)]
    
    def draw_rectangle(self, x, y, width, height, rgb):
        """Draw filled rectangle."""
        for dy in range(height):
            for dx in range(width):
                self.set_pixel(x + dx, y + dy, rgb)
    
    def render_frame(self):
        """Render current frame."""
        self.frames_rendered += 1
        print(f"Frame {self.frames_rendered} rendered ({self.width}×{self.height} @ {self.refresh_rate}Hz)")
    
    def get_specs(self):
        """Get display specifications."""
        total_pixels = self.width * self.height
        bytes_per_frame = total_pixels * 3  # RGB
        bytes_per_second = bytes_per_frame * self.refresh_rate
        
        return {
            'resolution': f"{self.width}×{self.height}",
            'total_pixels': total_pixels,
            'refresh_rate': f"{self.refresh_rate} Hz",
            'bytes_per_frame': bytes_per_frame,
            'bandwidth': f"{bytes_per_second / (1024**2):.1f} MB/s"
        }

# Create display
display = Display(1920, 1080, 60)

specs = display.get_specs()
print("\nDisplay Specifications:")
for key, value in specs.items():
    print(f"  {key}: {value}")

# Draw something
display.clear((0, 0, 0))  # Clear to black
display.draw_rectangle(100, 100, 200, 150, (255, 0, 0))  # Red rectangle
display.render_frame()
```

### Printer

```python
class Printer:
    """Simulate printer operations."""
    
    def __init__(self, printer_type='inkjet'):
        self.printer_type = printer_type  # 'inkjet', 'laser', '3d'
        self.paper_loaded = True
        self.ink_level = 100  # percentage
        self.pages_printed = 0
    
    def check_status(self):
        """Check printer status."""
        print(f"{self.printer_type.upper()} Printer Status:")
        print(f"  Paper: {'Loaded' if self.paper_loaded else 'Empty'}")
        print(f"  Ink: {self.ink_level}%")
        print(f"  Pages printed: {self.pages_printed}")
    
    def print_page(self, content):
        """Print a page."""
        if not self.paper_loaded:
            print("ERROR: No paper loaded")
            return False
        
        if self.ink_level < 5:
            print("ERROR: Low ink")
            return False
        
        print(f"\nPrinting page {self.pages_printed + 1}...")
        print(f"Content: {content[:50]}...")
        
        # Simulate printing process
        if self.printer_type == 'inkjet':
            print("  - Moving print head...")
            print("  - Spraying ink droplets...")
            self.ink_level -= 2
        elif self.printer_type == 'laser':
            print("  - Charging drum...")
            print("  - Applying toner...")
            print("  - Fusing with heat...")
            self.ink_level -= 1
        elif self.printer_type == '3d':
            print("  - Heating nozzle...")
            print("  - Extruding filament...")
            print("  - Building layer by layer...")
            self.ink_level -= 5
        
        print("  - Feeding paper...")
        print("  ✓ Page printed")
        
        self.pages_printed += 1
        return True
    
    def refill_ink(self):
        """Refill ink/toner."""
        self.ink_level = 100
        print("Ink refilled to 100%")
    
    def load_paper(self, sheets):
        """Load paper."""
        self.paper_loaded = True
        print(f"Loaded {sheets} sheets of paper")

# Simulate printing
printer = Printer('inkjet')
printer.check_status()
printer.print_page("Hello, World! This is a test document.")
printer.print_page("Second page content here.")
printer.check_status()
```

### Speaker

```python
class Speaker:
    """Simulate audio output."""
    
    def __init__(self):
        self.volume = 50  # 0-100
        self.muted = False
        self.sample_rate = 44100  # Hz
        self.bit_depth = 16
    
    def set_volume(self, volume):
        """Set volume level."""
        self.volume = max(0, min(100, volume))
        print(f"Volume set to {self.volume}%")
    
    def mute(self):
        """Mute audio."""
        self.muted = True
        print("Audio muted")
    
    def unmute(self):
        """Unmute audio."""
        self.muted = False
        print("Audio unmuted")
    
    def play_tone(self, frequency, duration):
        """Play a tone at given frequency."""
        if self.muted:
            print(f"Playing {frequency}Hz tone (muted)")
        else:
            print(f"Playing {frequency}Hz tone for {duration}s at {self.volume}% volume")
            print(f"  Sample rate: {self.sample_rate} Hz")
            print(f"  Bit depth: {self.bit_depth} bit")
            
            # Calculate samples needed
            samples = self.sample_rate * duration
            print(f"  Samples: {samples:,}")
    
    def play_audio(self, filename):
        """Play audio file."""
        if self.muted:
            print(f"Playing '{filename}' (muted)")
        else:
            print(f"Playing '{filename}' at {self.volume}% volume")

# Simulate audio
speaker = Speaker()
speaker.set_volume(75)
speaker.play_tone(440, 1)  # A4 note, 1 second
speaker.mute()
speaker.play_audio("song.mp3")
speaker.unmute()
```

## Device Interfaces

```python
def explain_device_interfaces():
    """Explain common device connection types."""
    print("Device Interfaces:")
    
    interfaces = [
        ("USB 2.0", "480 Mbps", "Keyboard, mouse, printer", "Universal Serial Bus"),
        ("USB 3.0", "5 Gbps", "External drives, cameras", "10x faster than USB 2.0"),
        ("USB-C", "40 Gbps", "Modern devices, charging", "Reversible, multi-purpose"),
        ("HDMI", "18 Gbps", "Monitors, TVs", "Video + audio"),
        ("DisplayPort", "32 Gbps", "High-end monitors", "Better than HDMI for PC"),
        ("Bluetooth", "3 Mbps", "Wireless peripherals", "Short-range wireless"),
        ("Wi-Fi 6", "9.6 Gbps", "Wireless networking", "Latest Wi-Fi standard"),
        ("Thunderbolt", "40 Gbps", "Pro displays, storage", "Fastest connection"),
    ]
    
    print(f"\n{'Interface':<15} {'Speed':<12} {'Common Use':<25} {'Notes'}")
    print("-" * 80)
    
    for interface, speed, use, notes in interfaces:
        print(f"{interface:<15} {speed:<12} {use:<25} {notes}")

explain_device_interfaces()
```

## Device Drivers

```python
class DeviceDriver:
    """Simplified device driver concept."""
    
    def __init__(self, device_name, device_type):
        self.device_name = device_name
        self.device_type = device_type
        self.initialized = False
    
    def initialize(self):
        """Initialize device."""
        print(f"Initializing {self.device_type}: {self.device_name}")
        print(f"  - Loading driver")
        print(f"  - Detecting hardware")
        print(f"  - Configuring settings")
        print(f"  ✓ Device ready")
        self.initialized = True
    
    def read(self):
        """Read data from device."""
        if not self.initialized:
            return "ERROR: Device not initialized"
        
        print(f"Reading from {self.device_name}...")
        return f"Data from {self.device_name}"
    
    def write(self, data):
        """Write data to device."""
        if not self.initialized:
            print("ERROR: Device not initialized")
            return False
        
        print(f"Writing to {self.device_name}: {data}")
        return True
    
    def shutdown(self):
        """Shutdown device safely."""
        print(f"Shutting down {self.device_name}")
        print(f"  - Flushing buffers")
        print(f"  - Releasing resources")
        print(f"  ✓ Device stopped")
        self.initialized = False

# Simulate device driver
print("\nDevice Driver Example:")
keyboard_driver = DeviceDriver("USB Keyboard", "Input Device")
keyboard_driver.initialize()
data = keyboard_driver.read()
print(f"Received: {data}")
keyboard_driver.shutdown()
```

## Python Input/Output

```python
def python_io_examples():
    """Show Python's I/O capabilities."""
    print("Python I/O Examples:")
    
    # 1. Keyboard input (stdin)
    print("\n1. Standard Input (stdin):")
    print("   name = input('Enter name: ')")
    print("   - Reads from keyboard")
    print("   - Returns string")
    
    # 2. Screen output (stdout)
    print("\n2. Standard Output (stdout):")
    print("   print('Hello')")
    print("   - Writes to terminal/console")
    
    # 3. File I/O
    print("\n3. File Input/Output:")
    print("   with open('file.txt', 'r') as f:")
    print("       data = f.read()")
    print("   - Read from disk")
    print("   - Write to disk")
    
    # 4. Network I/O
    print("\n4. Network I/O:")
    print("   import requests")
    print("   response = requests.get('https://...')")
    print("   - Send/receive over network")
    
    # 5. System I/O
    print("\n5. System Devices:")
    print("   import pyaudio  # Audio I/O")
    print("   import cv2      # Camera I/O")
    print("   import serial   # Serial port I/O")

python_io_examples()
```

## Summary

**Input Devices:**
- **Keyboard**: Sends scan codes for key presses
- **Mouse**: Reports position changes and button states
- **Touchscreen**: Multi-touch with gestures (tap, swipe, pinch)
- **Camera**: Captures video frames
- **Microphone**: Samples audio

**Output Devices:**
- **Display**: Grid of pixels, refresh rate (60+ Hz)
- **Printer**: Transfers digital to physical (inkjet, laser, 3D)
- **Speaker**: Converts digital audio to sound waves

**Interfaces:**
- **USB**: Universal Serial Bus (most common)
- **HDMI/DisplayPort**: Video + audio
- **Bluetooth/Wi-Fi**: Wireless connections
- **Thunderbolt/USB-C**: High-speed modern connections

**Device Drivers:**
- Software that lets OS communicate with hardware
- Translates generic commands to device-specific operations
- Handles initialization, data transfer, error handling

Understanding I/O devices helps you work with hardware in Python and appreciate the full stack from user interaction to data processing.
