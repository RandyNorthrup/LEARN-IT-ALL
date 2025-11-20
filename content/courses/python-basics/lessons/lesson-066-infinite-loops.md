---
id: "101-infinite-loops"
title: "Infinite Loops and When to Use Them"
chapterId: ch5-loops
order: 12
duration: 20
objectives:
  - Understand infinite loops and their use cases
  - Learn to control infinite loops safely
  - Master common infinite loop patterns
  - Avoid accidental infinite loops
---

# Infinite Loops and When to Use Them

Infinite loops run forever unless explicitly stopped. While they might seem dangerous, they're essential for many programs like servers, games, and interactive applications.

## Basic Infinite Loop

```python
# Infinite loop with while True
count = 0
while True:
    print(f"Iteration {count}")
    count += 1
    
    # Must have a way to break!
    if count >= 5:
        break

# Output:
# Iteration 0
# Iteration 1
# Iteration 2
# Iteration 3
# Iteration 4

# Alternative: while 1 (less readable)
count = 0
while 1:  # Any non-zero value is truthy
    print(count)
    count += 1
    if count >= 3:
        break
# 0 1 2
```

## When to Use Infinite Loops

```python
# 1. Server/daemon applications
def simple_server():
    """Server that runs forever."""
    print("Server starting...")
    while True:
        # Accept connections
        # Process requests
        # Handle clients
        # In real code, would handle connections here
        pass

# 2. Game main loop
def game_loop():
    """Game that runs until quit."""
    running = True
    while running:
        # Handle input
        # Update game state
        # Render graphics
        # Check for quit condition
        # running = check_quit_event()
        pass

# 3. Menu systems
def menu_loop():
    """Interactive menu."""
    while True:
        print("\n=== Main Menu ===")
        print("1. Option 1")
        print("2. Option 2")
        print("3. Exit")
        
        choice = input("Choose: ")
        
        if choice == "1":
            print("Option 1 selected")
        elif choice == "2":
            print("Option 2 selected")
        elif choice == "3":
            print("Goodbye!")
            break
        else:
            print("Invalid choice")

# 4. Event processing
def event_processor():
    """Process events as they arrive."""
    while True:
        # event = wait_for_event()
        # process(event)
        # if event.type == 'quit':
        #     break
        pass
```

## Safe Infinite Loop Patterns

```python
# Pattern 1: Break on condition
def read_until_done():
    """Read input until 'done'."""
    lines = []
    while True:
        line = input("Enter line (or 'done'): ")
        if line.lower() == 'done':
            break
        lines.append(line)
    return lines

# Pattern 2: Flag variable
def process_with_flag():
    """Use flag to control loop."""
    keep_running = True
    count = 0
    
    while keep_running:
        print(f"Processing {count}")
        count += 1
        
        if count >= 10:
            keep_running = False
    
    print("Finished")

# Pattern 3: Return from function
def search_forever(target):
    """Search until found, then return."""
    num = 0
    while True:
        if num == target:
            return num
        num += 1
        if num > 1000:  # Safety limit
            return None

result = search_forever(42)
print(f"Found: {result}")
# Found: 42

# Pattern 4: Exception handling
def robust_loop():
    """Loop with exception handling."""
    while True:
        try:
            # Do work
            # If critical error, break
            pass
        except KeyboardInterrupt:
            print("\nStopped by user")
            break
        except Exception as e:
            print(f"Error: {e}")
            # Decide whether to continue or break
```

## Input Validation Loop

```python
# Keep asking until valid input
def get_positive_number():
    """Get positive number from user."""
    while True:
        try:
            num = int(input("Enter a positive number: "))
            if num > 0:
                return num
            else:
                print("Must be positive!")
        except ValueError:
            print("Must be a number!")

# Use it
# number = get_positive_number()
# print(f"You entered: {number}")

# Get number in range
def get_number_in_range(min_val, max_val):
    """Get number within range."""
    while True:
        try:
            num = int(input(f"Enter number ({min_val}-{max_val}): "))
            if min_val <= num <= max_val:
                return num
            else:
                print(f"Must be between {min_val} and {max_val}")
        except ValueError:
            print("Invalid number")

# age = get_number_in_range(1, 120)

# Yes/No confirmation
def get_yes_no(prompt):
    """Get yes or no answer."""
    while True:
        answer = input(f"{prompt} (yes/no): ").lower()
        if answer in ('yes', 'y'):
            return True
        elif answer in ('no', 'n'):
            return False
        else:
            print("Please answer yes or no")

# confirmed = get_yes_no("Continue?")
```

## Retry Logic

```python
# Retry with maximum attempts
def retry_with_limit():
    """Retry operation with limit."""
    max_attempts = 3
    attempts = 0
    
    while True:
        attempts += 1
        print(f"Attempt {attempts}")
        
        # Try operation
        success = attempts == 2  # Simulated success on 2nd try
        
        if success:
            print("Success!")
            break
        
        if attempts >= max_attempts:
            print("Max attempts reached")
            break
        
        print("Failed, retrying...")

retry_with_limit()
# Attempt 1
# Failed, retrying...
# Attempt 2
# Success!

# Retry with backoff
import time

def retry_with_backoff():
    """Retry with exponential backoff."""
    max_attempts = 5
    attempt = 0
    delay = 1
    
    while True:
        attempt += 1
        print(f"Attempt {attempt}")
        
        # Simulated operation
        success = attempt == 3
        
        if success:
            print("Operation successful!")
            return True
        
        if attempt >= max_attempts:
            print("Max attempts exceeded")
            return False
        
        print(f"Failed. Waiting {delay}s before retry...")
        time.sleep(delay)
        delay *= 2  # Exponential backoff

# Would use in real code:
# retry_with_backoff()
```

## State Machine Pattern

```python
# Infinite loop with state transitions
def traffic_light_simulator():
    """Simulate traffic light states."""
    state = 'green'
    cycles = 0
    max_cycles = 3
    
    while True:
        print(f"Light is {state.upper()}")
        
        # State transitions
        if state == 'green':
            time.sleep(3)
            state = 'yellow'
        elif state == 'yellow':
            time.sleep(1)
            state = 'red'
        elif state == 'red':
            time.sleep(3)
            state = 'green'
            cycles += 1
        
        if cycles >= max_cycles:
            print("Simulation complete")
            break

# Would run:
# traffic_light_simulator()

# Robot control state machine
def robot_controller():
    """Control robot through states."""
    state = 'idle'
    battery = 100
    
    while True:
        if state == 'idle':
            print("Robot idle")
            state = 'moving'
        
        elif state == 'moving':
            print("Robot moving")
            battery -= 10
            if battery <= 20:
                state = 'charging'
            else:
                state = 'working'
        
        elif state == 'working':
            print("Robot working")
            battery -= 5
            if battery <= 20:
                state = 'charging'
            else:
                state = 'idle'
        
        elif state == 'charging':
            print("Robot charging")
            battery += 30
            if battery >= 80:
                state = 'idle'
        
        if battery >= 100:
            print("Fully charged, stopping")
            break
        
        time.sleep(0.5)

# Would run:
# robot_controller()
```

## Producer-Consumer Pattern

```python
# Infinite loop processing queue
from collections import deque

def producer_consumer_demo():
    """Demonstrate producer-consumer with queue."""
    queue = deque()
    items_produced = 0
    items_consumed = 0
    max_items = 20
    
    while True:
        # Producer: Add items
        if items_produced < max_items and len(queue) < 5:
            queue.append(f"item_{items_produced}")
            print(f"Produced: item_{items_produced}")
            items_produced += 1
        
        # Consumer: Process items
        if queue:
            item = queue.popleft()
            print(f"Consumed: {item}")
            items_consumed += 1
        
        # Stop when all processed
        if items_produced >= max_items and len(queue) == 0:
            print(f"All {items_consumed} items processed")
            break
        
        time.sleep(0.1)

# Would run:
# producer_consumer_demo()
```

## Monitoring Loop

```python
# Monitor system/resource in infinite loop
def monitor_system():
    """Monitor system metrics."""
    check_count = 0
    max_checks = 10  # For demo
    
    while True:
        check_count += 1
        
        # Check metrics (simulated)
        cpu_usage = 45 + check_count * 5
        memory_usage = 60
        
        print(f"Check {check_count}: CPU={cpu_usage}%, MEM={memory_usage}%")
        
        # Alert on threshold
        if cpu_usage > 80:
            print("⚠️ High CPU usage!")
        
        if memory_usage > 90:
            print("⚠️ High memory usage!")
        
        # Demo limit
        if check_count >= max_checks:
            print("Monitoring stopped (demo)")
            break
        
        time.sleep(1)

# Would run:
# monitor_system()

# Monitor with statistics
def monitor_with_stats():
    """Monitor and track statistics."""
    readings = []
    duration = 5  # seconds
    start_time = time.time()
    
    while True:
        # Take reading (simulated)
        reading = 50 + len(readings) * 2
        readings.append(reading)
        print(f"Reading {len(readings)}: {reading}")
        
        # Calculate stats
        avg = sum(readings) / len(readings)
        print(f"  Average so far: {avg:.1f}")
        
        # Check duration
        if time.time() - start_time >= duration:
            print(f"\nFinal statistics:")
            print(f"  Total readings: {len(readings)}")
            print(f"  Average: {sum(readings)/len(readings):.1f}")
            print(f"  Min: {min(readings)}")
            print(f"  Max: {max(readings)}")
            break
        
        time.sleep(0.5)

# Would run:
# monitor_with_stats()
```

## Interactive REPL Pattern

```python
# Read-Eval-Print Loop
def simple_calculator():
    """Simple calculator REPL."""
    print("Simple Calculator (type 'quit' to exit)")
    
    while True:
        try:
            expression = input(">>> ")
            
            if expression.lower() in ('quit', 'exit', 'q'):
                print("Goodbye!")
                break
            
            if expression.lower() == 'help':
                print("Enter math expression: 2 + 2")
                continue
            
            # Evaluate (careful: eval can be dangerous!)
            # In production, use proper parsing
            result = eval(expression)
            print(f"= {result}")
            
        except Exception as e:
            print(f"Error: {e}")

# Would run:
# simple_calculator()

# Command processor
def command_processor():
    """Process commands in loop."""
    data = []
    
    print("Command Processor (type 'help' for commands)")
    
    while True:
        command = input("> ").strip().lower()
        
        if command == 'quit':
            print("Exiting...")
            break
        
        elif command == 'help':
            print("Commands: add, list, clear, count, quit")
        
        elif command.startswith('add '):
            item = command[4:]
            data.append(item)
            print(f"Added: {item}")
        
        elif command == 'list':
            if data:
                for i, item in enumerate(data, 1):
                    print(f"{i}. {item}")
            else:
                print("No items")
        
        elif command == 'clear':
            data.clear()
            print("Cleared all items")
        
        elif command == 'count':
            print(f"Total items: {len(data)}")
        
        else:
            print("Unknown command. Type 'help' for commands.")

# Would run:
# command_processor()
```

## Avoiding Accidental Infinite Loops

```python
# ❌ BAD - Accidental infinite loop
def bad_loop1():
    """Loop variable never changes."""
    i = 0
    while i < 10:
        print(i)
        # Forgot to increment i!
        # This runs forever

# ❌ BAD - Wrong condition
def bad_loop2():
    """Condition always true."""
    count = 0
    while count >= 0:  # Will always be true!
        print(count)
        count += 1  # Makes it worse

# ❌ BAD - Float comparison
def bad_loop3():
    """Float precision issues."""
    x = 0.0
    while x != 1.0:  # Might never be exactly 1.0
        x += 0.1
        print(x)
        if x > 2.0:  # Safety break
            break

# ✅ GOOD - Proper loop conditions
def good_loop1():
    """Loop variable updates correctly."""
    i = 0
    while i < 10:
        print(i)
        i += 1  # Always increment

def good_loop2():
    """Safe counter."""
    count = 0
    max_count = 100
    while count < max_count:
        print(count)
        count += 1

def good_loop3():
    """Float comparison with tolerance."""
    x = 0.0
    while x < 1.0:  # Use < instead of !=
        x += 0.1
        print(f"{x:.1f}")

good_loop3()
```

## Safety Patterns

```python
# Add maximum iteration counter
def safe_infinite_loop():
    """Infinite loop with safety counter."""
    max_iterations = 10000
    iterations = 0
    
    while True:
        iterations += 1
        
        # Your work here
        result = iterations * 2
        
        # Safety check
        if iterations >= max_iterations:
            print(f"Safety limit reached: {max_iterations} iterations")
            break
        
        # Normal exit condition
        if result > 100:
            print(f"Completed after {iterations} iterations")
            break

safe_infinite_loop()

# Add timeout
def loop_with_timeout():
    """Loop with time limit."""
    timeout = 5  # seconds
    start_time = time.time()
    iterations = 0
    
    while True:
        iterations += 1
        
        # Your work here
        time.sleep(0.1)
        
        # Check timeout
        if time.time() - start_time > timeout:
            print(f"Timeout after {iterations} iterations")
            break
        
        # Normal exit
        if iterations >= 20:
            print("Normal completion")
            break

# Would run:
# loop_with_timeout()
```

## Summary

**When to Use Infinite Loops:**
- **Servers and daemons** - Run until shutdown
- **Game loops** - Run until quit
- **Event processing** - Process events as they arrive
- **Menu systems** - Display until exit
- **Monitoring** - Check conditions continuously
- **REPLs** - Interactive command processing

**Safe Patterns:**
```python
# With break
while True:
    if condition:
        break

# With flag
running = True
while running:
    if condition:
        running = False

# With return
while True:
    if condition:
        return result

# With exception
try:
    while True:
        # work
        pass
except KeyboardInterrupt:
    pass
```

**Safety Measures:**
- Always have explicit exit condition
- Use break, return, or flag variable
- Add maximum iteration counter
- Add timeout for time-sensitive operations
- Handle KeyboardInterrupt (Ctrl+C)

**Common Mistakes:**
- Forgetting to update loop variable
- Wrong comparison operators
- Float equality comparisons
- No exit condition

**Best Practices:**
- Clear exit conditions
- Document why loop is infinite
- Add safety limits during development
- Handle cleanup properly
- Use appropriate pattern for use case

Infinite loops are powerful when used correctly - they're the backbone of interactive applications, servers, and real-time systems!
