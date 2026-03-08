---
id: lesson-035-input-output-devices
title: "Input and Output Devices"
chapterId: ch3-computing
order: 9
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
    
    # Keyboard state as a dictionary
    keyboard = {
        'keys_pressed': set(),
        'modifiers': {'shift': False, 'ctrl': False, 'alt': False},
    }
    
    def key_down(kb, key):
        """Simulate key press."""
        kb['keys_pressed'].add(key)
        
        # Handle modifiers
        if key.upper() == 'SHIFT':
            kb['modifiers']['shift'] = True
        elif key.upper() == 'CTRL':
            kb['modifiers']['ctrl'] = True
        
        print(f"Key down: {key} (scan code: {scan_codes.get(key.upper(), '0x00')})")
    
    def key_up(kb, key):
        """Simulate key release."""
        kb['keys_pressed'].discard(key)
        
        # Handle modifiers
        if key.upper() == 'SHIFT':
            kb['modifiers']['shift'] = False
        elif key.upper() == 'CTRL':
            kb['modifiers']['ctrl'] = False
        
        print(f"Key up: {key}")
    
    def get_character(kb, key):
        """Convert key to character considering modifiers."""
        if kb['modifiers']['shift']:
            return key.upper()
        return key.lower()

    # Simulate typing "Hello"
    
    print("Simulating typing 'Hello':")
    keys = ['SHIFT', 'H', 'SHIFT', 'e', 'l', 'l', 'o']
    
    for key in keys:
        key_down(keyboard, key)
        if key not in ['SHIFT', 'CTRL', 'ALT']:
            char = get_character(keyboard, key)
            print(f"  Character: '{char}'")
        key_up(keyboard, key)
        print()

simulate_keyboard()
```

### Mouse

```python
def create_mouse(screen_width=1920, screen_height=1080):
    """Create a mouse input simulator."""
    return {
        'x': 0,
        'y': 0,
        'screen_width': screen_width,
        'screen_height': screen_height,
        'left_button': False,
        'right_button': False,
        'middle_button': False,
    }

def mouse_move(mouse, dx, dy):
    """Move mouse by delta (relative movement)."""
    mouse['x'] += dx
    mouse['y'] += dy
    
    # Constrain to screen bounds
    mouse['x'] = max(0, min(mouse['x'], mouse['screen_width'] - 1))
    mouse['y'] = max(0, min(mouse['y'], mouse['screen_height'] - 1))
    
    print(f"Mouse moved to ({mouse['x']}, {mouse['y']})")

def mouse_move_to(mouse, x, y):
    """Move mouse to absolute position."""
    mouse['x'] = max(0, min(x, mouse['screen_width'] - 1))
    mouse['y'] = max(0, min(y, mouse['screen_height'] - 1))
    
    print(f"Mouse at ({mouse['x']}, {mouse['y']})")

def mouse_button_down(mouse, button='left'):
    """Simulate button press."""
    if button == 'left':
        mouse['left_button'] = True
    elif button == 'right':
        mouse['right_button'] = True
    elif button == 'middle':
        mouse['middle_button'] = True
    
    print(f"  {button} button down")

def mouse_button_up(mouse, button='left'):
    """Simulate button release."""
    if button == 'left':
        mouse['left_button'] = False
    elif button == 'right':
        mouse['right_button'] = False
    elif button == 'middle':
        mouse['middle_button'] = False
    
    print(f"  {button} button up")

def mouse_click(mouse, button='left'):
    """Simulate mouse click."""
    print(f"{button.capitalize()} click at ({mouse['x']}, {mouse['y']})")
    mouse_button_down(mouse, button)
    mouse_button_up(mouse, button)

def mouse_scroll(mouse, amount):
    """Simulate scroll wheel."""
    direction = "up" if amount > 0 else "down"
    print(f"Scroll {direction} by {abs(amount)}")

def mouse_double_click(mouse):
    """Simulate double click."""
    print(f"Double click at ({mouse['x']}, {mouse['y']})")
    mouse_click(mouse, 'left')
    mouse_click(mouse, 'left')

# Simulate mouse operations
mouse = create_mouse()

print("Mouse Operations:")
mouse_move_to(mouse, 100, 200)
mouse_click(mouse, 'left')
mouse_move(mouse, 50, 30)  # Relative movement
mouse_click(mouse, 'right')
mouse_scroll(mouse, 3)
mouse_double_click(mouse)
```

### Touchscreen

```python
def create_touchscreen(width=1920, height=1080):
    """Create a touchscreen input simulator."""
    return {
        'width': width,
        'height': height,
        'active_touches': {},
        'next_touch_id': 0,
    }

def touch_down(ts, x, y):
    """Start a touch."""
    touch_id = ts['next_touch_id']
    ts['next_touch_id'] += 1
    
    ts['active_touches'][touch_id] = {'x': x, 'y': y, 'start': (x, y)}
    print(f"Touch {touch_id} down at ({x}, {y})")
    
    return touch_id

def touch_move(ts, touch_id, x, y):
    """Move an active touch."""
    if touch_id in ts['active_touches']:
        old_x = ts['active_touches'][touch_id]['x']
        old_y = ts['active_touches'][touch_id]['y']
        
        ts['active_touches'][touch_id]['x'] = x
        ts['active_touches'][touch_id]['y'] = y
        
        dx = x - old_x
        dy = y - old_y
        
        print(f"Touch {touch_id} moved to ({x}, {y}) [Δ: ({dx}, {dy})]")

def touch_up(ts, touch_id):
    """End a touch."""
    if touch_id in ts['active_touches']:
        touch_info = ts['active_touches'][touch_id]
        start_x, start_y = touch_info['start']
        end_x, end_y = touch_info['x'], touch_info['y']
        
        # Calculate swipe distance
        distance = ((end_x - start_x)**2 + (end_y - start_y)**2)**0.5
        
        if distance > 50:
            print(f"Touch {touch_id} up - SWIPE detected (distance: {distance:.0f})")
        else:
            print(f"Touch {touch_id} up - TAP at ({end_x}, {end_y})")
        
        del ts['active_touches'][touch_id]

def touch_pinch(x1, y1, x2, y2):
    """Simulate pinch gesture (zoom)."""
    distance = ((x2 - x1)**2 + (y2 - y1)**2)**0.5
    center_x = (x1 + x2) // 2
    center_y = (y1 + y2) // 2
    
    print(f"Pinch gesture at ({center_x}, {center_y})")
    print(f"  Distance between fingers: {distance:.0f} pixels")

# Simulate touch operations
ts = create_touchscreen()

print("\nTouch Operations:")
# Single tap
tid = touch_down(ts, 500, 300)
touch_up(ts, tid)

print()
# Swipe
tid = touch_down(ts, 100, 500)
touch_move(ts, tid, 200, 500)
touch_move(ts, tid, 400, 500)
touch_up(ts, tid)

print()
# Pinch zoom
touch_pinch(400, 500, 600, 700)
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

def create_display(width, height, refresh_rate=60):
    """Create a display output simulator."""
    return {
        'width': width,
        'height': height,
        'refresh_rate': refresh_rate,
        'frame_buffer': [[(0, 0, 0) for _ in range(width)] for _ in range(height)],
        'frames_rendered': 0,
    }

def display_set_pixel(display, x, y, rgb):
    """Set pixel color."""
    if 0 <= x < display['width'] and 0 <= y < display['height']:
        display['frame_buffer'][y][x] = rgb

def display_clear(display, rgb=(0, 0, 0)):
    """Clear screen to color."""
    display['frame_buffer'] = [[rgb for _ in range(display['width'])] for _ in range(display['height'])]

def display_draw_rectangle(display, x, y, width, height, rgb):
    """Draw filled rectangle."""
    for dy in range(height):
        for dx in range(width):
            display_set_pixel(display, x + dx, y + dy, rgb)

def display_render_frame(display):
    """Render current frame."""
    display['frames_rendered'] += 1
    print(f"Frame {display['frames_rendered']} rendered ({display['width']}×{display['height']} @ {display['refresh_rate']}Hz)")

def display_get_specs(display):
    """Get display specifications."""
    total_pixels = display['width'] * display['height']
    bytes_per_frame = total_pixels * 3  # RGB
    bytes_per_second = bytes_per_frame * display['refresh_rate']
    
    return {
        'resolution': f"{display['width']}×{display['height']}",
        'total_pixels': total_pixels,
        'refresh_rate': f"{display['refresh_rate']} Hz",
        'bytes_per_frame': bytes_per_frame,
        'bandwidth': f"{bytes_per_second / (1024**2):.1f} MB/s"
    }

# Create display
display = create_display(1920, 1080, 60)

specs = display_get_specs(display)
print("\nDisplay Specifications:")
for key, value in specs.items():
    print(f"  {key}: {value}")

# Draw something
display_clear(display, (0, 0, 0))  # Clear to black
display_draw_rectangle(display, 100, 100, 200, 150, (255, 0, 0))  # Red rectangle
display_render_frame(display)
```

### Printer

```python
def create_printer(printer_type='inkjet'):
    """Create a printer simulator."""
    return {
        'printer_type': printer_type,  # 'inkjet', 'laser', '3d'
        'paper_loaded': True,
        'ink_level': 100,  # percentage
        'pages_printed': 0,
    }

def printer_check_status(printer):
    """Check printer status."""
    print(f"{printer['printer_type'].upper()} Printer Status:")
    print(f"  Paper: {'Loaded' if printer['paper_loaded'] else 'Empty'}")
    print(f"  Ink: {printer['ink_level']}%")
    print(f"  Pages printed: {printer['pages_printed']}")

def printer_print_page(printer, content):
    """Print a page."""
    if not printer['paper_loaded']:
        print("ERROR: No paper loaded")
        return False
    
    if printer['ink_level'] < 5:
        print("ERROR: Low ink")
        return False
    
    print(f"\nPrinting page {printer['pages_printed'] + 1}...")
    print(f"Content: {content[:50]}...")
    
    # Simulate printing process
    if printer['printer_type'] == 'inkjet':
        print("  - Moving print head...")
        print("  - Spraying ink droplets...")
        printer['ink_level'] -= 2
    elif printer['printer_type'] == 'laser':
        print("  - Charging drum...")
        print("  - Applying toner...")
        print("  - Fusing with heat...")
        printer['ink_level'] -= 1
    elif printer['printer_type'] == '3d':
        print("  - Heating nozzle...")
        print("  - Extruding filament...")
        print("  - Building layer by layer...")
        printer['ink_level'] -= 5
    
    print("  - Feeding paper...")
    print("  ✓ Page printed")
    
    printer['pages_printed'] += 1
    return True

def printer_refill_ink(printer):
    """Refill ink/toner."""
    printer['ink_level'] = 100
    print("Ink refilled to 100%")

def printer_load_paper(printer, sheets):
    """Load paper."""
    printer['paper_loaded'] = True
    print(f"Loaded {sheets} sheets of paper")

# Simulate printing
printer = create_printer('inkjet')
printer_check_status(printer)
printer_print_page(printer, "Hello, World! This is a test document.")
printer_print_page(printer, "Second page content here.")
printer_check_status(printer)
```

### Speaker

```python
def create_speaker():
    """Create an audio output simulator."""
    return {
        'volume': 50,  # 0-100
        'muted': False,
        'sample_rate': 44100,  # Hz
        'bit_depth': 16,
    }

def speaker_set_volume(speaker, volume):
    """Set volume level."""
    speaker['volume'] = max(0, min(100, volume))
    print(f"Volume set to {speaker['volume']}%")

def speaker_mute(speaker):
    """Mute audio."""
    speaker['muted'] = True
    print("Audio muted")

def speaker_unmute(speaker):
    """Unmute audio."""
    speaker['muted'] = False
    print("Audio unmuted")

def speaker_play_tone(speaker, frequency, duration):
    """Play a tone at given frequency."""
    if speaker['muted']:
        print(f"Playing {frequency}Hz tone (muted)")
    else:
        print(f"Playing {frequency}Hz tone for {duration}s at {speaker['volume']}% volume")
        print(f"  Sample rate: {speaker['sample_rate']} Hz")
        print(f"  Bit depth: {speaker['bit_depth']} bit")
        
        # Calculate samples needed
        samples = speaker['sample_rate'] * duration
        print(f"  Samples: {samples:,}")

def speaker_play_audio(speaker, filename):
    """Play audio file."""
    if speaker['muted']:
        print(f"Playing '{filename}' (muted)")
    else:
        print(f"Playing '{filename}' at {speaker['volume']}% volume")

# Simulate audio
speaker = create_speaker()
speaker_set_volume(speaker, 75)
speaker_play_tone(speaker, 440, 1)  # A4 note, 1 second
speaker_mute(speaker)
speaker_play_audio(speaker, "song.mp3")
speaker_unmute(speaker)
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
def create_device_driver(device_name, device_type):
    """Create a simplified device driver."""
    return {
        'device_name': device_name,
        'device_type': device_type,
        'initialized': False,
    }

def driver_initialize(driver):
    """Initialize device."""
    print(f"Initializing {driver['device_type']}: {driver['device_name']}")
    print(f"  - Loading driver")
    print(f"  - Detecting hardware")
    print(f"  - Configuring settings")
    print(f"  ✓ Device ready")
    driver['initialized'] = True

def driver_read(driver):
    """Read data from device."""
    if not driver['initialized']:
        return "ERROR: Device not initialized"
    
    print(f"Reading from {driver['device_name']}...")
    return f"Data from {driver['device_name']}"

def driver_write(driver, data):
    """Write data to device."""
    if not driver['initialized']:
        print("ERROR: Device not initialized")
        return False
    
    print(f"Writing to {driver['device_name']}: {data}")
    return True

def driver_shutdown(driver):
    """Shutdown device safely."""
    print(f"Shutting down {driver['device_name']}")
    print(f"  - Flushing buffers")
    print(f"  - Releasing resources")
    print(f"  ✓ Device stopped")
    driver['initialized'] = False

# Simulate device driver
print("\nDevice Driver Example:")
keyboard_driver = create_device_driver("USB Keyboard", "Input Device")
driver_initialize(keyboard_driver)
data = driver_read(keyboard_driver)
print(f"Received: {data}")
driver_shutdown(keyboard_driver)
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
