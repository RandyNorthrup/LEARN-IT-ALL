---
id: lesson-037-operating-systems
title: "Operating Systems Basics"
chapterId: ch3-computing
order: 11
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

_next_pid = [1000]  # Counter for process IDs

def create_process(name, parent_pid=None):
    """Create a process simulation."""
    pid = _next_pid[0]
    _next_pid[0] += 1
    
    return {
        'pid': pid,
        'name': name,
        'parent_pid': parent_pid,
        'state': "New",
        'memory_mb': 0,
        'cpu_time': 0,
        'files': [],
        'created_at': time.time(),
    }

def process_start(proc):
    """Start process."""
    proc['state'] = "Ready"
    print(f"Process {proc['pid']} ({proc['name']}) started")

def process_run(proc, duration):
    """Simulate running."""
    proc['state'] = "Running"
    print(f"Process {proc['pid']} ({proc['name']}) running for {duration}s")
    proc['cpu_time'] += duration

def process_wait_io(proc):
    """Wait for I/O."""
    proc['state'] = "Waiting"
    print(f"Process {proc['pid']} ({proc['name']}) waiting for I/O")

def process_allocate_memory(proc, mb):
    """Allocate memory."""
    proc['memory_mb'] += mb
    print(f"Process {proc['pid']} allocated {mb} MB (total: {proc['memory_mb']} MB)")

def process_open_file(proc, filename):
    """Open file."""
    proc['files'].append(filename)
    print(f"Process {proc['pid']} opened file: {filename}")

def process_terminate(proc):
    """Terminate process."""
    proc['state'] = "Terminated"
    print(f"Process {proc['pid']} ({proc['name']}) terminated")

def process_get_info(proc):
    """Get process information."""
    return {
        'pid': proc['pid'],
        'name': proc['name'],
        'state': proc['state'],
        'parent_pid': proc['parent_pid'],
        'memory_mb': proc['memory_mb'],
        'cpu_time': proc['cpu_time'],
        'open_files': len(proc['files']),
    }

# Simulate processes
print("\nProcess Simulation:")
parent = create_process("python", parent_pid=1)
process_start(parent)
process_allocate_memory(parent, 50)
process_open_file(parent, "script.py")
process_run(parent, 2)

print()
child = create_process("subprocess", parent_pid=parent['pid'])
process_start(child)
process_allocate_memory(child, 10)
process_run(child, 1)
process_terminate(child)

print()
process_terminate(parent)

print("\nProcess Information:")
for proc in [parent, child]:
    info = process_get_info(proc)
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

_next_tid = [1]  # Counter for thread IDs

def create_thread(process_pid, name):
    """Create a thread simulation."""
    tid = _next_tid[0]
    _next_tid[0] += 1
    
    return {
        'tid': tid,
        'process_pid': process_pid,
        'name': name,
        'state': "New",
    }

def thread_start(thread):
    """Start thread."""
    thread['state'] = "Running"
    print(f"Thread {thread['tid']} ({thread['name']}) started in process {thread['process_pid']}")

def thread_run_task(thread, task):
    """Run a task."""
    print(f"Thread {thread['tid']} executing: {task}")

def thread_join(thread):
    """Wait for thread to complete."""
    thread['state'] = "Terminated"
    print(f"Thread {thread['tid']} ({thread['name']}) completed")

# Simulate multi-threading
print("\nMulti-threading Example:")
process_pid = 1234

main_thread = create_thread(process_pid, "main")
thread_start(main_thread)

worker1 = create_thread(process_pid, "worker-1")
thread_start(worker1)
thread_run_task(worker1, "Download file")
thread_join(worker1)

worker2 = create_thread(process_pid, "worker-2")
thread_start(worker2)
thread_run_task(worker2, "Process data")
thread_join(worker2)

thread_run_task(main_thread, "Display results")
thread_join(main_thread)
```

## Multitasking

```python
def create_scheduler():
    """Create a process scheduler simulation."""
    return {
        'processes': [],
        'current_time': 0,
    }

def scheduler_add_process(scheduler, process):
    """Add process to scheduler."""
    scheduler['processes'].append(process)
    print(f"Added process {process['pid']} ({process['name']})")

def scheduler_round_robin(scheduler, time_quantum):
    """Round-robin scheduling."""
    print(f"\nRound-Robin Scheduling (time quantum: {time_quantum}s):")
    print("=" * 60)
    
    ready_queue = [p for p in scheduler['processes'] if p['state'] == "Ready"]
    
    while ready_queue:
        for process in ready_queue[:]:
            if process['state'] != "Ready":
                ready_queue.remove(process)
                continue
            
            print(f"\nTime {scheduler['current_time']}s: Running process {process['pid']} ({process['name']})")
            process['state'] = "Running"
            process['cpu_time'] += time_quantum
            scheduler['current_time'] += time_quantum
            
            # Simulate random termination
            if process['cpu_time'] >= 3:
                process['state'] = "Terminated"
                ready_queue.remove(process)
                print(f"  → Process {process['pid']} completed (total CPU: {process['cpu_time']}s)")
            else:
                process['state'] = "Ready"
                print(f"  → Process {process['pid']} preempted (CPU time: {process['cpu_time']}s)")
    
    print(f"\nAll processes completed at time {scheduler['current_time']}s")

# Simulate scheduling
print("\nProcess Scheduling:")
scheduler = create_scheduler()

p1 = create_process("Process-1")
p1['state'] = "Ready"
scheduler_add_process(scheduler, p1)

p2 = create_process("Process-2")
p2['state'] = "Ready"
scheduler_add_process(scheduler, p2)

p3 = create_process("Process-3")
p3['state'] = "Ready"
scheduler_add_process(scheduler, p3)

scheduler_round_robin(scheduler, time_quantum=1)
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

def create_file_entry(name, owner, size_bytes=0):
    """Create a file simulation."""
    return {
        'name': name,
        'owner': owner,
        'size_bytes': size_bytes,
        'permissions': {
            'owner': {'read': True, 'write': True, 'execute': False},
            'group': {'read': True, 'write': False, 'execute': False},
            'others': {'read': False, 'write': False, 'execute': False},
        },
        'created_at': time.time(),
        'modified_at': time.time(),
    }

def file_chmod(f, user_type, permission, value):
    """Change file permissions."""
    if user_type in f['permissions'] and permission in f['permissions'][user_type]:
        f['permissions'][user_type][permission] = value
        print(f"Changed {f['name']}: {user_type}.{permission} = {value}")

def file_can_access(f, user, action):
    """Check if user can perform action."""
    if user == f['owner']:
        return f['permissions']['owner'].get(action, False)
    else:
        return f['permissions']['others'].get(action, False)

def file_get_permission_string(f):
    """Get Unix-style permission string."""
    def perms_to_str(perms):
        r = 'r' if perms['read'] else '-'
        w = 'w' if perms['write'] else '-'
        x = 'x' if perms['execute'] else '-'
        return r + w + x
    
    owner = perms_to_str(f['permissions']['owner'])
    group = perms_to_str(f['permissions']['group'])
    others = perms_to_str(f['permissions']['others'])
    
    return owner + group + others

# File permissions example
print("\nFile Permissions Example:")
file = create_file_entry("script.py", "alice", size_bytes=1024)

print(f"File: {file['name']}")
print(f"Owner: {file['owner']}")
print(f"Permissions: {file_get_permission_string(file)}")

print("\nAccess Tests:")
print(f"Alice can read: {file_can_access(file, 'alice', 'read')}")
print(f"Alice can write: {file_can_access(file, 'alice', 'write')}")
print(f"Bob can read: {file_can_access(file, 'bob', 'read')}")
print(f"Bob can write: {file_can_access(file, 'bob', 'write')}")

print("\nChanging permissions:")
file_chmod(file, 'others', 'read', True)
print(f"New permissions: {file_get_permission_string(file)}")
print(f"Bob can read now: {file_can_access(file, 'bob', 'read')}")
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

def create_memory_manager(total_mb):
    """Create a memory manager simulation."""
    return {
        'total_mb': total_mb,
        'free_mb': total_mb,
        'allocations': {},
    }

def mm_allocate(mm, process_pid, size_mb):
    """Allocate memory to process."""
    if size_mb > mm['free_mb']:
        print(f"ERROR: Cannot allocate {size_mb}MB (only {mm['free_mb']}MB free)")
        return False
    
    if process_pid not in mm['allocations']:
        mm['allocations'][process_pid] = 0
    
    mm['allocations'][process_pid] += size_mb
    mm['free_mb'] -= size_mb
    
    print(f"Allocated {size_mb}MB to process {process_pid}")
    print(f"  Process total: {mm['allocations'][process_pid]}MB")
    print(f"  System free: {mm['free_mb']}MB / {mm['total_mb']}MB")
    
    return True

def mm_free(mm, process_pid):
    """Free all memory for process."""
    if process_pid in mm['allocations']:
        freed = mm['allocations'][process_pid]
        mm['free_mb'] += freed
        del mm['allocations'][process_pid]
        
        print(f"Freed {freed}MB from process {process_pid}")
        print(f"  System free: {mm['free_mb']}MB / {mm['total_mb']}MB")
    else:
        print(f"Process {process_pid} has no allocations")

def mm_get_stats(mm):
    """Get memory statistics."""
    used_mb = mm['total_mb'] - mm['free_mb']
    used_percent = (used_mb / mm['total_mb']) * 100
    
    return {
        'total': mm['total_mb'],
        'used': used_mb,
        'free': mm['free_mb'],
        'used_percent': used_percent,
        'processes': len(mm['allocations']),
    }

# Simulate memory management
print("\nMemory Management Simulation:")
mem = create_memory_manager(1024)  # 1GB RAM

print("\nAllocating memory:")
mm_allocate(mem, 1001, 100)  # Process 1001 needs 100MB
mm_allocate(mem, 1002, 200)  # Process 1002 needs 200MB
mm_allocate(mem, 1003, 300)  # Process 1003 needs 300MB

print("\nMemory Statistics:")
stats = mm_get_stats(mem)
print(f"Total: {stats['total']}MB")
print(f"Used: {stats['used']}MB ({stats['used_percent']:.1f}%)")
print(f"Free: {stats['free']}MB")
print(f"Active processes: {stats['processes']}")

print("\nFreeing memory:")
mm_free(mem, 1002)

print("\nFinal Statistics:")
stats = mm_get_stats(mem)
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
