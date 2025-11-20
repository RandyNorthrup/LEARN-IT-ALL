---
id: "75-storage-devices"
title: "Storage Devices and File Systems"
chapterId: ch3-computing
order: 6
duration: 25
objectives:
  - Understand different types of storage devices
  - Learn how data is stored persistently
  - Recognize file system organization
  - Understand storage capacity units
  - Relate storage concepts to file operations in Python
---

# Storage Devices and File Systems

Storage devices provide persistent memory that retains data even when power is off. Understanding storage helps you work with files effectively and appreciate performance differences.

## Types of Storage Devices

```python
def compare_storage_devices():
    """Compare different storage device types."""
    devices = {
        "Hard Disk Drive (HDD)": {
            "Technology": "Spinning magnetic platters",
            "Speed": "80-160 MB/s sequential",
            "Capacity": "500 GB - 8 TB",
            "Durability": "Vulnerable to physical shock",
            "Cost": "Cheapest per GB",
            "Lifespan": "3-5 years typical",
            "Use Case": "Bulk storage, backups"
        },
        "Solid State Drive (SSD)": {
            "Technology": "Flash memory chips",
            "Speed": "200-3500 MB/s sequential",
            "Capacity": "120 GB - 4 TB",
            "Durability": "No moving parts (shock resistant)",
            "Cost": "Moderate per GB",
            "Lifespan": "5-10 years typical",
            "Use Case": "Operating system, programs"
        },
        "NVMe SSD": {
            "Technology": "Flash memory via PCIe",
            "Speed": "3000-7000 MB/s sequential",
            "Capacity": "250 GB - 2 TB",
            "Durability": "No moving parts (shock resistant)",
            "Cost": "Expensive per GB",
            "Lifespan": "5-10 years typical",
            "Use Case": "High-performance applications"
        },
        "USB Flash Drive": {
            "Technology": "Flash memory",
            "Speed": "10-150 MB/s",
            "Capacity": "8 GB - 1 TB",
            "Durability": "Portable, shock resistant",
            "Cost": "Moderate per GB",
            "Lifespan": "10+ years (with limited writes)",
            "Use Case": "Portable data transfer"
        }
    }
    
    for device_name, specs in devices.items():
        print(f"\n{device_name}:")
        for spec_name, spec_value in specs.items():
            print(f"  {spec_name}: {spec_value}")

compare_storage_devices()
```

## Storage Capacity Units

```python
# Storage size units
def explain_storage_units():
    """Explain storage capacity units."""
    print("Storage Capacity Units:")
    print(f"{'Unit':<15} {'Bytes':<20} {'Explanation'}")
    print("-" * 60)
    
    units = [
        ("Byte (B)", 1, "8 bits, 1 character"),
        ("Kilobyte (KB)", 1024, "~1,000 bytes"),
        ("Megabyte (MB)", 1024**2, "~1 million bytes"),
        ("Gigabyte (GB)", 1024**3, "~1 billion bytes"),
        ("Terabyte (TB)", 1024**4, "~1 trillion bytes"),
        ("Petabyte (PB)", 1024**5, "~1 quadrillion bytes"),
    ]
    
    for unit_name, bytes_count, explanation in units:
        print(f"{unit_name:<15} {bytes_count:<20,} {explanation}")

explain_storage_units()
# Storage Capacity Units:
# Unit            Bytes                Explanation
# ------------------------------------------------------------
# Byte (B)        1                    8 bits, 1 character
# Kilobyte (KB)   1,024                ~1,000 bytes
# Megabyte (MB)   1,048,576            ~1 million bytes
# Gigabyte (GB)   1,073,741,824        ~1 billion bytes
# Terabyte (TB)   1,099,511,627,776    ~1 trillion bytes
# Petabyte (PB)   1,125,899,906,842,624 ~1 quadrillion bytes

# Real-world file sizes
print("\nCommon File Sizes:")
file_sizes = [
    ("Text file (.txt)", "1-100 KB"),
    ("Word document (.docx)", "50-500 KB"),
    ("Photo (JPEG)", "2-8 MB"),
    ("Song (MP3)", "3-10 MB"),
    ("HD Movie (MP4)", "1-4 GB"),
    ("4K Movie (MP4)", "4-20 GB"),
    ("Game installation", "20-100 GB"),
    ("Operating system", "10-30 GB"),
]

for file_type, typical_size in file_sizes:
    print(f"  {file_type:<25} {typical_size}")

# Storage calculations
def bytes_to_readable(bytes_count):
    """Convert bytes to human-readable format."""
    units = ['B', 'KB', 'MB', 'GB', 'TB']
    unit_index = 0
    size = float(bytes_count)
    
    while size >= 1024 and unit_index < len(units) - 1:
        size /= 1024
        unit_index += 1
    
    return f"{size:.2f} {units[unit_index]}"

# Examples
print("\nSize Conversions:")
sizes = [1024, 1_048_576, 1_073_741_824, 5_368_709_120]
for size in sizes:
    print(f"  {size:,} bytes = {bytes_to_readable(size)}")
# 1,024 bytes = 1.00 KB
# 1,048,576 bytes = 1.00 MB
# 1,073,741,824 bytes = 1.00 GB
# 5,368,709,120 bytes = 5.00 GB
```

## How Data is Stored

```python
# Simplified explanation of how storage works
def explain_data_storage():
    """Explain how data is physically stored."""
    print("How Data is Stored:")
    
    print("\n1. Hard Disk Drive (HDD):")
    print("   - Spinning platters coated with magnetic material")
    print("   - Read/write head magnetizes tiny regions")
    print("   - Each region represents a bit (0 or 1)")
    print("   - Multiple platters stacked for more capacity")
    print("   - Mechanical movement = slower but cheaper")
    
    print("\n2. Solid State Drive (SSD):")
    print("   - Flash memory cells store electrical charge")
    print("   - Charged cell = 1, uncharged = 0")
    print("   - Multiple cells form pages (4-16 KB)")
    print("   - Pages grouped into blocks (256-512 KB)")
    print("   - No moving parts = faster but more expensive")
    
    print("\n3. Data Organization:")
    print("   - Files split into blocks (clusters)")
    print("   - File system tracks which blocks belong to which file")
    print("   - Blocks can be scattered across drive (fragmentation)")

explain_data_storage()

# Simulate simple block storage
class BlockStorage:
    """Simulate block-based storage."""
    
    BLOCK_SIZE = 64  # 64 bytes per block
    
    def __init__(self, num_blocks):
        self.blocks = [None] * num_blocks
        self.num_blocks = num_blocks
    
    def write_file(self, filename, data):
        """Write file data to blocks."""
        # Calculate how many blocks needed
        blocks_needed = (len(data) + self.BLOCK_SIZE - 1) // self.BLOCK_SIZE
        
        # Find free blocks
        free_blocks = [i for i, block in enumerate(self.blocks) if block is None]
        
        if len(free_blocks) < blocks_needed:
            print(f"ERROR: Not enough space for {filename}")
            return False
        
        # Allocate blocks
        allocated_blocks = free_blocks[:blocks_needed]
        
        # Write data to blocks
        for i, block_num in enumerate(allocated_blocks):
            start = i * self.BLOCK_SIZE
            end = start + self.BLOCK_SIZE
            chunk = data[start:end]
            self.blocks[block_num] = {
                'filename': filename,
                'data': chunk,
                'block_index': i
            }
        
        print(f"WROTE: {filename} ({len(data)} bytes) to blocks {allocated_blocks}")
        return True
    
    def read_file(self, filename):
        """Read file data from blocks."""
        # Find all blocks for this file
        file_blocks = []
        for block_num, block in enumerate(self.blocks):
            if block and block['filename'] == filename:
                file_blocks.append((block['block_index'], block['data']))
        
        if not file_blocks:
            print(f"ERROR: File {filename} not found")
            return None
        
        # Sort by block index and concatenate
        file_blocks.sort(key=lambda x: x[0])
        data = ''.join(chunk for _, chunk in file_blocks)
        
        print(f"READ: {filename} ({len(data)} bytes)")
        return data
    
    def delete_file(self, filename):
        """Delete file and free blocks."""
        freed = 0
        for i, block in enumerate(self.blocks):
            if block and block['filename'] == filename:
                self.blocks[i] = None
                freed += 1
        
        if freed > 0:
            print(f"DELETED: {filename} (freed {freed} blocks)")
        else:
            print(f"ERROR: File {filename} not found")
    
    def show_storage(self):
        """Visualize storage usage."""
        print("\nStorage Map (. = free, letter = file):")
        map_str = ""
        for block in self.blocks:
            if block is None:
                map_str += "."
            else:
                map_str += block['filename'][0]
        
        # Print in rows of 20
        for i in range(0, len(map_str), 20):
            print(f"  Blocks {i:2d}-{min(i+19, len(map_str)-1):2d}: {map_str[i:i+20]}")
        
        used = sum(1 for b in self.blocks if b is not None)
        print(f"\nUsage: {used}/{self.num_blocks} blocks ({used/self.num_blocks*100:.1f}%)")

# Demonstrate storage operations
storage = BlockStorage(20)

# Write some files
storage.write_file("readme.txt", "Hello, this is a readme file with some content!")
storage.write_file("data.csv", "name,age,city\nAlice,30,NYC\nBob,25,LA")
storage.write_file("notes.txt", "Short note")

storage.show_storage()

# Read a file
content = storage.read_file("data.csv")
print(f"Content: {content[:50]}...")

# Delete a file
storage.delete_file("readme.txt")

storage.show_storage()
```

## File Systems

```python
def explain_file_systems():
    """Explain file system concepts."""
    print("File System Concepts:")
    
    print("\n1. File System Types:")
    file_systems = [
        ("NTFS", "Windows", "Supports large files, permissions, encryption"),
        ("FAT32", "Universal", "Compatible but 4 GB file size limit"),
        ("exFAT", "Universal", "Like FAT32 but no 4 GB limit"),
        ("APFS", "macOS", "Apple's modern file system, optimized for SSD"),
        ("ext4", "Linux", "Common Linux file system, reliable"),
    ]
    
    for fs_name, platform, features in file_systems:
        print(f"  {fs_name:<8} ({platform:<10}): {features}")
    
    print("\n2. File System Functions:")
    print("  - Organize files into directories (folders)")
    print("  - Track file metadata (name, size, dates, permissions)")
    print("  - Manage free space and allocation")
    print("  - Provide efficient file access")
    print("  - Handle file names and paths")
    
    print("\n3. File Metadata:")
    print("  - Name: Filename and extension")
    print("  - Size: Number of bytes")
    print("  - Created: When file was created")
    print("  - Modified: Last modification date")
    print("  - Permissions: Who can read/write/execute")
    print("  - Location: Which blocks/clusters contain the data")

explain_file_systems()

# Working with files in Python
import os
from datetime import datetime

def show_file_info(filepath):
    """Show file metadata."""
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    
    stat = os.stat(filepath)
    
    print(f"\nFile Information: {filepath}")
    print(f"  Size: {stat.st_size:,} bytes ({bytes_to_readable(stat.st_size)})")
    print(f"  Created: {datetime.fromtimestamp(stat.st_ctime)}")
    print(f"  Modified: {datetime.fromtimestamp(stat.st_mtime)}")
    print(f"  Accessed: {datetime.fromtimestamp(stat.st_atime)}")
    
    # Permissions (Unix/Mac)
    if hasattr(stat, 'st_mode'):
        mode = stat.st_mode
        print(f"  Permissions: {oct(mode)[-3:]}")

# Create a temporary file to demonstrate
temp_file = "temp_demo.txt"
with open(temp_file, 'w') as f:
    f.write("This is a test file.\n" * 100)

show_file_info(temp_file)

# Clean up
os.remove(temp_file)
print(f"\nDeleted {temp_file}")
```

## Directory Structure

```python
# Simulating a simple directory structure
class FileSystem:
    """Simple file system simulator."""
    
    def __init__(self):
        self.root = {
            'type': 'directory',
            'name': '/',
            'contents': {}
        }
        self.current_dir = self.root
    
    def mkdir(self, name):
        """Create directory."""
        if name in self.current_dir['contents']:
            print(f"ERROR: {name} already exists")
            return
        
        self.current_dir['contents'][name] = {
            'type': 'directory',
            'name': name,
            'contents': {}
        }
        print(f"Created directory: {name}")
    
    def create_file(self, name, size):
        """Create file."""
        if name in self.current_dir['contents']:
            print(f"ERROR: {name} already exists")
            return
        
        self.current_dir['contents'][name] = {
            'type': 'file',
            'name': name,
            'size': size
        }
        print(f"Created file: {name} ({size} bytes)")
    
    def ls(self):
        """List directory contents."""
        print(f"\nContents of {self.get_path()}:")
        if not self.current_dir['contents']:
            print("  (empty)")
            return
        
        for name, item in self.current_dir['contents'].items():
            if item['type'] == 'directory':
                print(f"  [DIR]  {name}/")
            else:
                size_str = bytes_to_readable(item['size'])
                print(f"  [FILE] {name} ({size_str})")
    
    def get_path(self):
        """Get current path (simplified)."""
        return self.current_dir['name']
    
    def tree(self, node=None, prefix=""):
        """Show tree structure."""
        if node is None:
            node = self.root
            print("Directory Tree:")
        
        for name, item in node['contents'].items():
            if item['type'] == 'directory':
                print(f"{prefix}├── {name}/")
                self.tree(item, prefix + "│   ")
            else:
                size_str = bytes_to_readable(item['size'])
                print(f"{prefix}├── {name} ({size_str})")

# Demonstrate file system
fs = FileSystem()

# Create directory structure
fs.mkdir("documents")
fs.mkdir("photos")
fs.mkdir("music")

# Create files
fs.create_file("readme.txt", 1024)
fs.create_file("notes.txt", 512)

# Show contents
fs.ls()

# Show tree
fs.tree()
```

## Storage Performance

```python
import time

def measure_storage_speed():
    """Measure file write/read speed."""
    filename = "speed_test.tmp"
    data_size = 10 * 1024 * 1024  # 10 MB
    data = "x" * data_size
    
    # Measure write speed
    start = time.perf_counter()
    with open(filename, 'w') as f:
        f.write(data)
    write_time = time.perf_counter() - start
    write_speed = data_size / write_time / (1024 * 1024)
    
    print(f"Write Speed: {write_speed:.2f} MB/s")
    
    # Measure read speed
    start = time.perf_counter()
    with open(filename, 'r') as f:
        _ = f.read()
    read_time = time.perf_counter() - start
    read_speed = data_size / read_time / (1024 * 1024)
    
    print(f"Read Speed: {read_speed:.2f} MB/s")
    
    # Clean up
    os.remove(filename)
    
    print("\nNote: Actual SSD speeds:")
    print("  SATA SSD: 200-550 MB/s")
    print("  NVMe SSD: 2000-7000 MB/s")
    print("  HDD: 80-160 MB/s")

# Uncomment to test (creates 10 MB file):
# measure_storage_speed()
```

## Best Practices for Storage

```python
def storage_best_practices():
    """Explain storage best practices."""
    print("Storage Best Practices:")
    
    print("\n1. File Management:")
    print("  - Close files after use (use 'with' statement)")
    print("  - Don't keep large files in memory unnecessarily")
    print("  - Use appropriate file formats (compressed when possible)")
    print("  - Clean up temporary files")
    
    print("\n2. Performance:")
    print("  - Read/write in large chunks, not byte-by-byte")
    print("  - Use SSD for frequently accessed data")
    print("  - Buffer data in memory when doing many small operations")
    print("  - Consider caching for repeatedly accessed files")
    
    print("\n3. Data Safety:")
    print("  - Keep backups on separate devices")
    print("  - Use version control for code (Git)")
    print("  - Verify important data after writing")
    print("  - Don't rely on single storage device")

storage_best_practices()

# Efficient file reading example
def read_large_file_efficient(filename):
    """Read large file efficiently (line by line)."""
    print(f"Reading {filename} line by line (memory efficient):")
    
    line_count = 0
    with open(filename, 'r') as f:
        for line in f:  # Reads one line at a time
            line_count += 1
            # Process line here
    
    print(f"Processed {line_count} lines")

# Inefficient approach (loads entire file into memory)
def read_large_file_inefficient(filename):
    """Read large file inefficiently (all at once)."""
    print(f"Reading {filename} all at once (memory intensive):")
    
    with open(filename, 'r') as f:
        lines = f.readlines()  # Loads ALL lines into memory
        line_count = len(lines)
    
    print(f"Processed {line_count} lines")
```

## Summary

- **Storage devices** provide persistent memory (data survives power off)
- **HDD** is cheap but slow (mechanical), **SSD** is fast but pricier (no moving parts)
- **Storage units**: Byte → KB → MB → GB → TB (each ~1000x larger)
- **File systems** organize data into files and directories
- **Blocks/clusters** are the minimum allocation unit on storage devices
- **Metadata** stores information about files (size, dates, permissions)
- **Performance** varies greatly: NVMe SSD much faster than HDD
- **Python file operations** interact with the file system

Understanding storage helps you work efficiently with files and make informed decisions about data organization and performance.
