---
id: "150-debugging-techniques"
title: "Debugging and Troubleshooting Errors"
chapterId: ch11-error-handling
order: 6
duration: 25
objectives:
  - Master debugging techniques
  - Use Python debugger (pdb)
  - Implement effective logging
  - Troubleshoot common errors
---

# Debugging and Troubleshooting Errors

Essential techniques for finding and fixing errors in Python code.

## Print Debugging

```python
# Basic print debugging
def calculate_average(numbers):
    print(f"DEBUG: Input numbers: {numbers}")
    
    total = sum(numbers)
    print(f"DEBUG: Total: {total}")
    
    count = len(numbers)
    print(f"DEBUG: Count: {count}")
    
    average = total / count
    print(f"DEBUG: Average: {average}")
    
    return average

result = calculate_average([10, 20, 30])

# Print with context
def process_data(data):
    print(f"DEBUG [process_data]: Starting with {len(data)} items")
    
    for i, item in enumerate(data):
        print(f"DEBUG [process_data]: Processing item {i}: {item}")
        result = transform(item)
        print(f"DEBUG [process_data]: Result {i}: {result}")
    
    print(f"DEBUG [process_data]: Finished")

def transform(item):
    return item * 2

# Print with type information
def debug_value(name, value):
    """Print value with type info"""
    print(f"DEBUG: {name} = {value!r} (type: {type(value).__name__})")

x = "123"
debug_value("x", x)
y = int(x)
debug_value("y", y)

# Print stack trace manually
import traceback

def function_a():
    function_b()

def function_b():
    function_c()

def function_c():
    print("Current call stack:")
    traceback.print_stack()

# function_a()
```

## Using assert for Debugging

```python
# Assert for debugging assumptions
def calculate_discount(price, discount_percent):
    # Debug assertions
    assert price >= 0, f"Price must be positive: {price}"
    assert 0 <= discount_percent <= 100, f"Discount must be 0-100: {discount_percent}"
    
    discount = price * (discount_percent / 100)
    final_price = price - discount
    
    assert final_price >= 0, f"Final price negative: {final_price}"
    return final_price

# Assertions active by default
try:
    result = calculate_discount(100, 150)
except AssertionError as e:
    print(f"Assertion failed: {e}")

# Assertions can be disabled with: python -O script.py
# Use assertions for debugging, not for input validation!

# Assert invariants in loops
def process_items(items):
    """Process items maintaining invariant"""
    processed = 0
    
    for item in items:
        process_item(item)
        processed += 1
        
        # Invariant: processed count matches
        assert processed <= len(items), "Processed more than total!"
    
    assert processed == len(items), "Didn't process all items!"
    return processed

def process_item(item):
    pass

# Assert preconditions and postconditions
def sort_list(items):
    """Sort list with checks"""
    original_length = len(items)
    
    # Precondition
    assert isinstance(items, list), "Input must be a list"
    
    result = sorted(items)
    
    # Postconditions
    assert len(result) == original_length, "Length changed!"
    assert all(result[i] <= result[i+1] for i in range(len(result)-1)), "Not sorted!"
    
    return result

result = sort_list([3, 1, 4, 1, 5])
print(result)
```

## Python Debugger (pdb)

```python
# Basic pdb usage
import pdb

def buggy_function(x, y):
    """Function with potential bug"""
    # Set breakpoint
    # pdb.set_trace()  # Execution stops here
    
    result = x + y
    result = result * 2
    return result

# Python 3.7+ has built-in breakpoint()
def calculate(a, b, c):
    """Calculate with debugging"""
    # breakpoint()  # Better than pdb.set_trace()
    
    step1 = a + b
    step2 = step1 * c
    return step2

# Common pdb commands:
# n (next)      - Execute current line
# s (step)      - Step into function
# c (continue)  - Continue execution
# l (list)      - Show current location
# p var         - Print variable
# pp var        - Pretty-print variable
# w (where)     - Show stack trace
# u (up)        - Move up stack
# d (down)      - Move down stack
# b N           - Set breakpoint at line N
# cl            - Clear breakpoints
# q (quit)      - Exit debugger

# Conditional breakpoint
def process_numbers(numbers):
    for i, num in enumerate(numbers):
        # Only break when num is negative
        if num < 0:
            # breakpoint()
            pass
        
        result = num * 2

# Post-mortem debugging
def will_crash():
    """Function that crashes"""
    data = [1, 2, 3]
    return data[10]  # IndexError

# After crash, use pdb.pm() to debug
# >>> import pdb
# >>> will_crash()
# >>> pdb.pm()  # Enter post-mortem debugging
```

## Logging for Debugging

```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='debug.log'
)

logger = logging.getLogger(__name__)

# Logging levels
def demonstrate_logging():
    """Show different logging levels"""
    logger.debug("Detailed diagnostic information")
    logger.info("General informational message")
    logger.warning("Warning message")
    logger.error("Error message")
    logger.critical("Critical error message")

# demonstrate_logging()

# Logging with context
def process_user(user_id, action):
    """Process user with comprehensive logging"""
    logger.info(f"Processing user {user_id}: {action}")
    
    try:
        result = perform_action(user_id, action)
        logger.debug(f"Action result for {user_id}: {result}")
        return result
    except Exception as e:
        logger.error(f"Error processing user {user_id}: {e}", exc_info=True)
        raise

def perform_action(user_id, action):
    return f"Done: {action}"

# Logging function entry/exit
def log_function_call(func):
    """Decorator to log function calls"""
    def wrapper(*args, **kwargs):
        logger.debug(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        try:
            result = func(*args, **kwargs)
            logger.debug(f"{func.__name__} returned: {result}")
            return result
        except Exception as e:
            logger.error(f"{func.__name__} raised {type(e).__name__}: {e}")
            raise
    return wrapper

@log_function_call
def calculate_total(items):
    """Calculate total with logging"""
    return sum(items)

# result = calculate_total([1, 2, 3, 4, 5])

# Structured logging
def structured_log(event, **context):
    """Log with structured data"""
    context_str = ", ".join(f"{k}={v}" for k, v in context.items())
    logger.info(f"{event} | {context_str}")

# structured_log("user_login", user_id=123, ip="192.168.1.1", success=True)
# structured_log("payment_processed", order_id=456, amount=99.99, currency="USD")
```

## Exception Inspection

```python
# Inspect exception details
def inspect_exception():
    """Demonstrate exception inspection"""
    try:
        result = 10 / 0
    except Exception as e:
        print(f"Exception type: {type(e).__name__}")
        print(f"Exception value: {e}")
        print(f"Exception args: {e.args}")
        
        # Get traceback
        import traceback
        print("\nTraceback:")
        traceback.print_exc()

# inspect_exception()

# Extract traceback information
def detailed_exception_info():
    """Get detailed exception information"""
    try:
        data = {"name": "Alice"}
        value = data["age"]  # KeyError
    except Exception as e:
        import sys
        
        exc_type, exc_value, exc_traceback = sys.exc_info()
        
        print(f"Type: {exc_type.__name__}")
        print(f"Value: {exc_value}")
        print(f"Traceback object: {exc_traceback}")
        
        # Get traceback details
        tb = exc_traceback
        while tb:
            frame = tb.tb_frame
            print(f"\nFile: {frame.f_code.co_filename}")
            print(f"Function: {frame.f_code.co_name}")
            print(f"Line: {tb.tb_lineno}")
            print(f"Locals: {frame.f_locals}")
            tb = tb.tb_next

# detailed_exception_info()

# Format traceback as string
def get_traceback_string():
    """Get traceback as string"""
    import traceback
    
    try:
        buggy_operation()
    except Exception:
        tb_string = traceback.format_exc()
        print("Captured traceback:")
        print(tb_string)
        return tb_string

def buggy_operation():
    return 1 / 0

# get_traceback_string()
```

## Debugging Techniques

```python
# Technique 1: Binary search debugging
def binary_search_debug(data):
    """Find bug using binary search"""
    # Comment out half of the code
    # If bug persists, it's in remaining half
    # If bug disappears, it's in commented half
    # Repeat until bug location found
    
    step1 = data * 2  # Test this
    # step2 = step1 + 5  # Comment out
    # step3 = step2 / 2  # Comment out
    return step1

# Technique 2: Rubber duck debugging
def rubber_duck_debug(problem):
    """
    Explain code line by line (to a rubber duck or colleague).
    Often reveals the bug through explanation.
    """
    # Explain each line:
    # 1. "First, I get the user input..."
    # 2. "Then I convert it to int..." (Ah! What if it's not a number?)
    # 3. Found the bug!
    pass

# Technique 3: Simplify and isolate
def isolate_bug(complex_function):
    """Simplify function to isolate bug"""
    # Remove features one by one
    # Until you find which feature causes the bug
    
    # Start with minimal working version
    def minimal():
        return "works"
    
    # Add features back one at a time
    def with_feature1():
        # Add feature 1
        return "still works?"
    
    # Continue until bug appears

# Technique 4: Test inputs incrementally
def test_incrementally():
    """Test with increasingly complex inputs"""
    # Start simple
    test1 = process([1])  # Works?
    
    # Add complexity
    test2 = process([1, 2])  # Works?
    test3 = process([1, 2, 3])  # Works?
    
    # When it breaks, you know the threshold
    test4 = process([])  # Breaks! Empty list is the problem!

def process(data):
    return data[0]  # Bug: IndexError on empty list
```

## Common Debugging Scenarios

```python
# Scenario 1: Variable has unexpected value
def debug_unexpected_value(x):
    """Debug why variable has wrong value"""
    print(f"1. Input x: {x!r} (type: {type(x).__name__})")
    
    # Check each transformation
    y = x.strip()
    print(f"2. After strip: {y!r}")
    
    z = y.lower()
    print(f"3. After lower: {z!r}")
    
    result = z.split()
    print(f"4. Final result: {result!r}")
    
    return result

# Scenario 2: Function called with wrong arguments
def debug_function_call():
    """Debug function call issues"""
    def greet(name, title=""):
        return f"Hello, {title} {name}!"
    
    # See exactly what was passed
    import inspect
    
    sig = inspect.signature(greet)
    print(f"Function signature: {sig}")
    
    # Call with logging
    args = ("Alice",)
    kwargs = {"title": "Dr."}
    print(f"Calling with args={args}, kwargs={kwargs}")
    result = greet(*args, **kwargs)
    print(f"Result: {result}")

# Scenario 3: Loop not iterating correctly
def debug_loop():
    """Debug loop issues"""
    items = [1, 2, 3, 4, 5]
    
    print(f"Starting loop with {len(items)} items")
    
    for i, item in enumerate(items):
        print(f"Iteration {i}: item={item}")
        
        # Check conditions
        if item > 3:
            print(f"  -> Item {item} is > 3")
        else:
            print(f"  -> Item {item} is <= 3")
    
    print("Loop finished")

# Scenario 4: Exception occurs sometimes
def debug_intermittent_error():
    """Debug errors that occur randomly"""
    import random
    
    # Add extensive logging
    def risky_operation(data):
        logger.info(f"Starting with data: {data}")
        
        try:
            # Operation that sometimes fails
            if random.random() < 0.3:
                raise ValueError("Random failure")
            
            result = data * 2
            logger.info(f"Success: {result}")
            return result
        
        except Exception as e:
            # Log full context when error occurs
            logger.error(
                f"Error occurred: {e}",
                extra={
                    "data": data,
                    "random_seed": random.getstate()
                },
                exc_info=True
            )
            raise
    
    return risky_operation
```

## Debugging Tools and Tips

```python
# Tip 1: Use dir() and help()
def explore_object(obj):
    """Explore object attributes"""
    print(f"Type: {type(obj)}")
    print(f"Available attributes: {dir(obj)}")
    # help(obj)  # Full documentation

# Tip 2: Use vars() to see instance variables
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 30)
print(f"Instance variables: {vars(person)}")

# Tip 3: Use __dict__ for namespace
def check_namespace():
    """Check current namespace"""
    local_var = 42
    print(f"Local namespace: {locals()}")
    print(f"Global namespace keys: {list(globals().keys())}")

# Tip 4: Use sys.getsizeof() for memory debugging
import sys

def check_memory_usage():
    """Check memory usage of objects"""
    small_list = [1, 2, 3]
    large_list = list(range(10000))
    
    print(f"Small list: {sys.getsizeof(small_list)} bytes")
    print(f"Large list: {sys.getsizeof(large_list)} bytes")

# Tip 5: Use timeit for performance debugging
import timeit

def compare_performance():
    """Compare performance of different approaches"""
    # Approach 1
    time1 = timeit.timeit(
        'sum(range(100))',
        number=10000
    )
    
    # Approach 2
    time2 = timeit.timeit(
        'total = 0\nfor i in range(100): total += i',
        number=10000
    )
    
    print(f"Approach 1: {time1:.6f}s")
    print(f"Approach 2: {time2:.6f}s")

# compare_performance()
```

## Debugging Checklist

```python
"""
Debugging Checklist:

1. Read the error message carefully
   - What type of exception?
   - What line number?
   - What's the full traceback?

2. Check recent changes
   - What did you change last?
   - Can you revert and test?

3. Verify assumptions
   - Use print() or logging
   - Check variable types and values
   - Verify function inputs/outputs

4. Isolate the problem
   - Can you reproduce it?
   - Minimal example that shows bug?
   - Does it happen with simple inputs?

5. Use debugging tools
   - pdb for step-through debugging
   - logging for tracking flow
   - assert for checking assumptions

6. Search for solutions
   - Read documentation
   - Search error message
   - Check Stack Overflow

7. Ask for help
   - Explain problem clearly
   - Provide minimal reproducible example
   - Show what you've tried
"""
```

## Summary

**Debugging Techniques:**

1. **Print Debugging**
   - Simple and effective
   - Add context and types
   - Use logging for production

2. **Python Debugger (pdb)**
   - Step through code
   - Inspect variables
   - Set breakpoints
   - Post-mortem debugging

3. **Logging**
   - Different levels (DEBUG, INFO, WARNING, ERROR, CRITICAL)
   - Include context
   - Log exceptions with exc_info=True
   - Structured logging

4. **Exception Inspection**
   - sys.exc_info() for details
   - traceback module for stack traces
   - Extract and format tracebacks

5. **Debugging Strategies**
   - Binary search debugging
   - Rubber duck debugging
   - Simplify and isolate
   - Test incrementally

**Best Practices:**
- Read error messages carefully
- Check recent changes
- Verify assumptions with assertions
- Use appropriate debugging tools
- Log comprehensively in production
- Create minimal reproducible examples
- Use debugger for complex issues
