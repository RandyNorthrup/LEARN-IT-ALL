---
id: "79-operating-systems"
title: "Operating Systems Basics"
chapterId: ch3-computing
order: 10
duration: 30
objectives:
  - Understand what operating systems do and why they're needed
  - Learn about processes, threads, and multitasking
  - Recognize different OS types and their purposes
  - Work with Python's OS interaction capabilities
  - Understand file systems and permissions
---

# Operating Systems Basics

An operating system (OS) is the software that manages computer hardware and provides services for programs. Understanding OS concepts helps you write better, more efficient code.

## What is an Operating System?

```python
def explain_operating_system():
    """Explain operating system fundamentals."""
    print("Operating System:")
    
    print("\n1. What Does an OS Do?")
    responsibilities = [
        "Hardware Management: CPU, memory, storage, devices",
        "Process Management: Running multiple programs",
        "Memory Management: Allocating RAM to programs",
        "File System: Organizing and storing files",
        "Security: User accounts and permissions",
        "User Interface: GUI or command line",
        "Device Drivers: Communicating with hardware",
        "Networking: Internet and network connections",
    ]
    
    for responsibility in responsibilities:
        print(f"   - {responsibility}")
    
    print("\n2. OS Architecture:")
    print("   ┌─────────────────────────────┐")
    print("   │    Applications/Programs    │  (Your Python code)")
    print("   ├─────────────────────────────┤")
    print("   │      System Libraries       │  (Python standard library)")
    print("   ├─────────────────────────────┤")
    print("   │      Operating System       │  (Windows, macOS, Linux)")
    print("   │   (Kernel + System Services)│")
    print("   ├─────────────────────────────┤")
    print("   │  Hardware (CPU, RAM, Disk)  │")
    print("   └─────────────────────────────┘")
    
    print("\n3. Kernel:")
    print("   - Core of the operating system")
    print("   - Runs with highest privileges")
    print("   - Directly controls hardware")
    print("   - Manages system resources")
    
    print("\n4. Common Operating Systems:")
    systems = [
        ("Windows", "Microsoft", "Desktop/Server", "88% desktop market"),
        ("macOS", "Apple", "Desktop", "Mac computers only"),
        ("Linux", "Open Source", "Server/Desktop/Embedded", "Most servers"),
        ("Android", "Google", "Mobile", "72% mobile market"),
        ("iOS", "Apple", "Mobile", "iPhone/iPad"),
        ("Unix", "Various", "Server/Workstation", "Legacy systems"),
    ]
    
    print(f"\n   {'OS':<12} {'Company':<15} {'Target':<20} {'Notes'}")
    print("   " + "-" * 75)
    for os_name, company, target, notes in systems:
        print(f"   {os_name:<12} {company:<15} {target:<20} {notes}")

explain_operating_system()
```

## Processes and Programs

```python
import os
import time

def explain_processes():
    """Explain processes and programs."""
    print("\nProcesses:")
    
    print("\n1. Program vs Process:")
    print("   - Program: Code stored on disk (static)")
    print("   - Process: Running instance of program (dynamic)")
    print("   - One program → Multiple processes")
    print("   - Example: Open Chrome 3 times = 1 program, 3 processes")
    
    print("\n2. Process Components:")
    print("   - Process ID (PID): Unique identifier")
    print("   - Memory: Code, data, stack, heap")
    print("   - File Descriptors: Open files")
    print("   - Environment Variables: Configuration")
    print("   - Parent Process: Process that created it")
    
    print("\n3. Process States:")
    states = [
        ("New", "Being created"),
        ("Ready", "Waiting for CPU time"),
        ("Running", "Executing on CPU"),
        ("Waiting", "Waiting for I/O or event"),
        ("Terminated", "Finished execution"),
    ]
    
    for state, description in states:
        print(f"   {state:<12} {description}")

explain_processes()

class Process:
    """Simulate a process."""
    
    next_pid = 1000
    
    def __init__(self, name, parent_pid=None):
        self.pid = Process.next_pid
        Process.next_pid += 1
        
        self.name = name
        self.parent_pid = parent_pid
        self.state = "New"
        self.memory_mb = 0
        self.cpu_time = 0
        self.files = []
        self.created_at = time.time()
    
    def start(self):
        """Start process."""
        self.state = "Ready"
        print(f"Process {self.pid} ({self.name}) started")
    
    def run(self, duration):
        """Simulate running."""
        self.state = "Running"
        print(f"Process {self.pid} ({self.name}) running for {duration}s")
        self.cpu_time += duration
    
    def wait_io(self):
        """Wait for I/O."""
        self.state = "Waiting"
        print(f"Process {self.pid} ({self.name}) waiting for I/O")
    
    def allocate_memory(self, mb):
        """Allocate memory."""
        self.memory_mb += mb
        print(f"Process {self.pid} allocated {mb} MB (total: {self.memory_mb} MB)")
    
    def open_file(self, filename):
        """Open file."""
        self.files.append(filename)
        print(f"Process {self.pid} opened file: {filename}")
    
    def terminate(self):
        """Terminate process."""
        self.state = "Terminated"
        print(f"Process {self.pid} ({self.name}) terminated")
    
    def get_info(self):
        """Get process information."""
        return {
            'pid': self.pid,
            'name': self.name,
            'state': self.state,
            'parent_pid': self.parent_pid,
            'memory_mb': self.memory_mb,
            'cpu_time': self.cpu_time,
            'open_files': len(self.files),
        }

# Simulate processes
print("\nProcess Simulation:")
parent = Process("python", parent_pid=1)
parent.start()
parent.allocate_memory(50)
parent.open_file("script.py")
parent.run(2)

print()
child = Process("subprocess", parent_pid=parent.pid)
child.start()
child.allocate_memory(10)
child.run(1)
child.terminate()

print()
parent.terminate()

print("\nProcess Information:")
for proc in [parent, child]:
    info = proc.get_info()
    print(f"\nPID {info['pid']}: {info['name']}")
    print(f"  State: {info['state']}")
    print(f"  Parent PID: {info['parent_pid']}")
    print(f"  Memory: {info['memory_mb']} MB")
    print(f"  CPU Time: {info['cpu_time']}s")
```

## Threads

```python
def explain_threads():
    """Explain threads."""
    print("\nThreads:")
    
    print("\n1. What is a Thread?")
    print("   - Lightweight process")
    print("   - Shares memory with parent process")
    print("   - Multiple threads in one process")
    print("   - Concurrent execution within process")
    
    print("\n2. Process vs Thread:")
    print("   Process:")
    print("   - Heavy: Own memory space")
    print("   - Isolated: Separate address space")
    print("   - Creation: Slower")
    print("   - Communication: Complex (IPC)")
    
    print("\n   Thread:")
    print("   - Light: Shares memory")
    print("   - Shared: Same address space")
    print("   - Creation: Faster")
    print("   - Communication: Easy (shared variables)")
    
    print("\n3. Use Cases:")
    print("   - Web browser: One tab per thread")
    print("   - Text editor: UI thread + spell check thread")
    print("   - Video player: Video thread + audio thread")
    print("   - Server: One thread per client request")

explain_threads()

class Thread:
    """Simulate a thread."""
    
    next_tid = 1
    
    def __init__(self, process_pid, name):
        self.tid = Thread.next_tid
        Thread.next_tid += 1
        
        self.process_pid = process_pid
        self.name = name
        self.state = "New"
    
    def start(self):
        """Start thread."""
        self.state = "Running"
        print(f"Thread {self.tid} ({self.name}) started in process {self.process_pid}")
    
    def run_task(self, task):
        """Run a task."""
        print(f"Thread {self.tid} executing: {task}")
    
    def join(self):
        """Wait for thread to complete."""
        self.state = "Terminated"
        print(f"Thread {self.tid} ({self.name}) completed")

# Simulate multi-threading
print("\nMulti-threading Example:")
process_pid = 1234

main_thread = Thread(process_pid, "main")
main_thread.start()

worker1 = Thread(process_pid, "worker-1")
worker1.start()
worker1.run_task("Download file")
worker1.join()

worker2 = Thread(process_pid, "worker-2")
worker2.start()
worker2.run_task("Process data")
worker2.join()

main_thread.run_task("Display results")
main_thread.join()
```

## Multitasking

```python
class ProcessScheduler:
    """Simulate process scheduling."""
    
    def __init__(self):
        self.processes = []
        self.current_time = 0
    
    def add_process(self, process):
        """Add process to scheduler."""
        self.processes.append(process)
        print(f"Added process {process.pid} ({process.name})")
    
    def round_robin(self, time_quantum):
        """Round-robin scheduling."""
        print(f"\nRound-Robin Scheduling (time quantum: {time_quantum}s):")
        print("=" * 60)
        
        ready_queue = [p for p in self.processes if p.state == "Ready"]
        
        while ready_queue:
            for process in ready_queue[:]:
                if process.state != "Ready":
                    ready_queue.remove(process)
                    continue
                
                print(f"\nTime {self.current_time}s: Running process {process.pid} ({process.name})")
                process.state = "Running"
                process.cpu_time += time_quantum
                self.current_time += time_quantum
                
                # Simulate random termination
                if process.cpu_time >= 3:
                    process.state = "Terminated"
                    ready_queue.remove(process)
                    print(f"  → Process {process.pid} completed (total CPU: {process.cpu_time}s)")
                else:
                    process.state = "Ready"
                    print(f"  → Process {process.pid} preempted (CPU time: {process.cpu_time}s)")
        
        print(f"\nAll processes completed at time {self.current_time}s")

# Simulate scheduling
print("\nProcess Scheduling:")
scheduler = ProcessScheduler()

p1 = Process("Process-1")
p1.state = "Ready"
scheduler.add_process(p1)

p2 = Process("Process-2")
p2.state = "Ready"
scheduler.add_process(p2)

p3 = Process("Process-3")
p3.state = "Ready"
scheduler.add_process(p3)

scheduler.round_robin(time_quantum=1)
```

## File Systems

```python
def explain_file_systems():
    """Explain file systems."""
    print("\nFile Systems:")
    
    print("\n1. What is a File System?")
    print("   - Organizes files on storage")
    print("   - Manages file metadata (name, size, date)")
    print("   - Controls access permissions")
    print("   - Handles directories/folders")
    
    print("\n2. Common File Systems:")
    filesystems = [
        ("NTFS", "Windows", "Journaling, encryption, large files"),
        ("FAT32", "Universal", "Compatible, limited (4GB files)"),
        ("exFAT", "Universal", "Better than FAT32, modern"),
        ("ext4", "Linux", "Journaling, fast, reliable"),
        ("APFS", "macOS", "Apple File System, SSD-optimized"),
        ("HFS+", "macOS", "Legacy Mac file system"),
        ("Btrfs", "Linux", "Advanced features, snapshots"),
    ]
    
    print(f"\n   {'Type':<10} {'OS':<12} {'Features'}")
    print("   " + "-" * 60)
    for fs_type, os_name, features in filesystems:
        print(f"   {fs_type:<10} {os_name:<12} {features}")
    
    print("\n3. File Permissions (Unix-style):")
    print("   - Read (r): View file contents")
    print("   - Write (w): Modify file")
    print("   - Execute (x): Run file as program")
    print("   - Format: rwxrwxrwx (owner, group, others)")
    print("   - Example: rwxr-xr-- = Owner:rwx, Group:rx, Others:r")

explain_file_systems()

class File:
    """Simulate a file."""
    
    def __init__(self, name, owner, size_bytes=0):
        self.name = name
        self.owner = owner
        self.size_bytes = size_bytes
        self.permissions = {
            'owner': {'read': True, 'write': True, 'execute': False},
            'group': {'read': True, 'write': False, 'execute': False},
            'others': {'read': False, 'write': False, 'execute': False},
        }
        self.created_at = time.time()
        self.modified_at = time.time()
    
    def chmod(self, user_type, permission, value):
        """Change file permissions."""
        if user_type in self.permissions and permission in self.permissions[user_type]:
            self.permissions[user_type][permission] = value
            print(f"Changed {self.name}: {user_type}.{permission} = {value}")
    
    def can_access(self, user, action):
        """Check if user can perform action."""
        if user == self.owner:
            return self.permissions['owner'].get(action, False)
        else:
            return self.permissions['others'].get(action, False)
    
    def get_permission_string(self):
        """Get Unix-style permission string."""
        def perms_to_str(perms):
            r = 'r' if perms['read'] else '-'
            w = 'w' if perms['write'] else '-'
            x = 'x' if perms['execute'] else '-'
            return r + w + x
        
        owner = perms_to_str(self.permissions['owner'])
        group = perms_to_str(self.permissions['group'])
        others = perms_to_str(self.permissions['others'])
        
        return owner + group + others

# File permissions example
print("\nFile Permissions Example:")
file = File("script.py", "alice", size_bytes=1024)

print(f"File: {file.name}")
print(f"Owner: {file.owner}")
print(f"Permissions: {file.get_permission_string()}")

print("\nAccess Tests:")
print(f"Alice can read: {file.can_access('alice', 'read')}")
print(f"Alice can write: {file.can_access('alice', 'write')}")
print(f"Bob can read: {file.can_access('bob', 'read')}")
print(f"Bob can write: {file.can_access('bob', 'write')}")

print("\nChanging permissions:")
file.chmod('others', 'read', True)
print(f"New permissions: {file.get_permission_string()}")
print(f"Bob can read now: {file.can_access('bob', 'read')}")
```

## Python OS Interaction

```python
import platform

def python_os_examples():
    """Show Python OS interaction."""
    print("\nPython OS Interaction:")
    
    print("\n1. Get System Information:")
    print(f"   - OS: {platform.system()}")
    print(f"   - Release: {platform.release()}")
    print(f"   - Machine: {platform.machine()}")
    print(f"   - Processor: {platform.processor()}")
    print(f"   - Python: {platform.python_version()}")
    
    print("\n2. Current Process:")
    print(f"   - Process ID: {os.getpid()}")
    print(f"   - Parent PID: {os.getppid()}")
    
    print("\n3. Environment Variables:")
    print("   os.environ['HOME']  # Home directory")
    print("   os.environ['PATH']  # Executable search path")
    print("   os.getenv('USER')   # Current user")
    
    print("\n4. File System Operations:")
    print("   os.getcwd()         # Current directory")
    print("   os.listdir('.')     # List files")
    print("   os.path.exists(f)   # Check if exists")
    print("   os.path.isfile(f)   # Is it a file?")
    print("   os.path.isdir(f)    # Is it a directory?")
    
    print("\n5. Process Management:")
    print("   import subprocess")
    print("   subprocess.run(['ls', '-l'])  # Run command")
    print("   subprocess.Popen(['python', 'script.py'])  # Start process")

python_os_examples()

# Get actual environment info
print("\nCurrent Environment:")
print(f"Current Directory: {os.getcwd()}")
print(f"User: {os.getenv('USER', 'Unknown')}")
print(f"Home: {os.getenv('HOME', 'Unknown')}")
```

## Memory Management

```python
def explain_memory_management():
    """Explain OS memory management."""
    print("\nMemory Management:")
    
    print("\n1. Virtual Memory:")
    print("   - Each process has own address space")
    print("   - Isolated from other processes")
    print("   - Uses both RAM and disk (swap)")
    print("   - Allows running more programs than RAM available")
    
    print("\n2. Memory Allocation:")
    print("   - Stack: Local variables, function calls (fast, limited)")
    print("   - Heap: Dynamic allocation (malloc/new in C/C++, automatic in Python)")
    print("   - Code: Program instructions (read-only)")
    print("   - Data: Global variables")
    
    print("\n3. Paging:")
    print("   - Memory divided into fixed-size pages (4KB typical)")
    print("   - Pages can be in RAM or on disk")
    print("   - OS swaps pages between RAM and disk")
    print("   - Page fault: Requested page not in RAM")
    
    print("\n4. Memory Protection:")
    print("   - Processes can't access each other's memory")
    print("   - Kernel memory protected from user processes")
    print("   - Prevents crashes from spreading")
    print("   - Segmentation fault: Illegal memory access")

explain_memory_management()

class MemoryManager:
    """Simulate memory management."""
    
    def __init__(self, total_mb):
        self.total_mb = total_mb
        self.free_mb = total_mb
        self.allocations = {}
    
    def allocate(self, process_pid, size_mb):
        """Allocate memory to process."""
        if size_mb > self.free_mb:
            print(f"ERROR: Cannot allocate {size_mb}MB (only {self.free_mb}MB free)")
            return False
        
        if process_pid not in self.allocations:
            self.allocations[process_pid] = 0
        
        self.allocations[process_pid] += size_mb
        self.free_mb -= size_mb
        
        print(f"Allocated {size_mb}MB to process {process_pid}")
        print(f"  Process total: {self.allocations[process_pid]}MB")
        print(f"  System free: {self.free_mb}MB / {self.total_mb}MB")
        
        return True
    
    def free(self, process_pid):
        """Free all memory for process."""
        if process_pid in self.allocations:
            freed = self.allocations[process_pid]
            self.free_mb += freed
            del self.allocations[process_pid]
            
            print(f"Freed {freed}MB from process {process_pid}")
            print(f"  System free: {self.free_mb}MB / {self.total_mb}MB")
        else:
            print(f"Process {process_pid} has no allocations")
    
    def get_stats(self):
        """Get memory statistics."""
        used_mb = self.total_mb - self.free_mb
        used_percent = (used_mb / self.total_mb) * 100
        
        return {
            'total': self.total_mb,
            'used': used_mb,
            'free': self.free_mb,
            'used_percent': used_percent,
            'processes': len(self.allocations),
        }

# Simulate memory management
print("\nMemory Management Simulation:")
mem = MemoryManager(1024)  # 1GB RAM

print("\nAllocating memory:")
mem.allocate(1001, 100)  # Process 1001 needs 100MB
mem.allocate(1002, 200)  # Process 1002 needs 200MB
mem.allocate(1003, 300)  # Process 1003 needs 300MB

print("\nMemory Statistics:")
stats = mem.get_stats()
print(f"Total: {stats['total']}MB")
print(f"Used: {stats['used']}MB ({stats['used_percent']:.1f}%)")
print(f"Free: {stats['free']}MB")
print(f"Active processes: {stats['processes']}")

print("\nFreeing memory:")
mem.free(1002)

print("\nFinal Statistics:")
stats = mem.get_stats()
print(f"Used: {stats['used']}MB ({stats['used_percent']:.1f}%)")
print(f"Free: {stats['free']}MB")
```

## Summary

**Operating System:**
- **Purpose**: Manages hardware and provides services for programs
- **Components**: Kernel (core) + system services + utilities
- **Functions**: Process management, memory management, file system, security

**Processes:**
- **Process**: Running instance of a program
- **PID**: Unique process identifier
- **States**: New, Ready, Running, Waiting, Terminated
- **Threads**: Lightweight processes sharing memory

**Scheduling:**
- **Multitasking**: Running multiple processes concurrently
- **Time Quantum**: CPU time slice per process
- **Algorithms**: Round-robin, priority-based, shortest job first

**File Systems:**
- **Purpose**: Organize files on storage
- **Types**: NTFS (Windows), ext4 (Linux), APFS (macOS)
- **Permissions**: Read, write, execute (owner, group, others)

**Memory Management:**
- **Virtual Memory**: Each process has isolated address space
- **Paging**: Memory divided into pages, swapped with disk
- **Protection**: Processes can't access each other's memory

Understanding operating systems helps you write efficient, system-aware Python programs that interact properly with the underlying platform.
