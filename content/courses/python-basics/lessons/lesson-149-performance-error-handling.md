---
id: "157-performance-error-handling"
title: "Performance Considerations in Error Handling"
chapterId: ch11-error-handling
order: 12
duration: 25
objectives:
  - Understand error handling performance costs
  - Optimize exception usage
  - Balance safety and performance
  - Profile error handling code
---

# Performance Considerations in Error Handling

Error handling has performance implications that matter at scale.

## Exception Performance Cost

```python
import time

# Measure try-except overhead
def measure_try_except():
    """Measure try-except with no exception"""
    iterations = 1_000_000
    
    # No try-except
    start = time.perf_counter()
    for i in range(iterations):
        x = 10 + 5
    no_try_time = time.perf_counter() - start
    
    # With try-except (no exception)
    start = time.perf_counter()
    for i in range(iterations):
        try:
            x = 10 + 5
        except Exception:
            pass
    with_try_time = time.perf_counter() - start
    
    print(f"No try-except: {no_try_time:.4f}s")
    print(f"With try-except: {with_try_time:.4f}s")
    print(f"Overhead: {(with_try_time - no_try_time):.4f}s ({((with_try_time / no_try_time - 1) * 100):.1f}%)")

measure_try_except()
# Output: Try-except adds minimal overhead when no exception raised
```

## Exception Raising Cost

```python
def measure_exception_raising():
    """Measure cost of raising exceptions"""
    iterations = 10_000
    
    # Successful execution
    start = time.perf_counter()
    for i in range(iterations):
        x = 10 / 2
    success_time = time.perf_counter() - start
    
    # With exceptions
    start = time.perf_counter()
    for i in range(iterations):
        try:
            x = 10 / 0
        except ZeroDivisionError:
            pass
    exception_time = time.perf_counter() - start
    
    print(f"Successful execution: {success_time:.4f}s")
    print(f"With exceptions: {exception_time:.4f}s")
    print(f"Exception cost: {exception_time / success_time:.1f}x slower")

measure_exception_raising()
# Output: Raising exceptions is 100-1000x slower than normal execution
```

## LBYL vs EAFP Performance

```python
# Look Before You Leap (LBYL)
def lbyl_approach(data, key):
    """Check before accessing"""
    if key in data:
        return data[key]
    return None

# Easier to Ask Forgiveness than Permission (EAFP)
def eafp_approach(data, key):
    """Try and catch exception"""
    try:
        return data[key]
    except KeyError:
        return None

def benchmark_approaches():
    """Compare LBYL vs EAFP"""
    data = {str(i): i for i in range(1000)}
    iterations = 100_000
    
    # LBYL with existing key (common case)
    start = time.perf_counter()
    for i in range(iterations):
        lbyl_approach(data, "500")
    lbyl_success_time = time.perf_counter() - start
    
    # EAFP with existing key (common case)
    start = time.perf_counter()
    for i in range(iterations):
        eafp_approach(data, "500")
    eafp_success_time = time.perf_counter() - start
    
    # LBYL with missing key
    start = time.perf_counter()
    for i in range(iterations):
        lbyl_approach(data, "missing")
    lbyl_fail_time = time.perf_counter() - start
    
    # EAFP with missing key
    start = time.perf_counter()
    for i in range(iterations):
        eafp_approach(data, "missing")
    eafp_fail_time = time.perf_counter() - start
    
    print("Success case (key exists):")
    print(f"  LBYL: {lbyl_success_time:.4f}s")
    print(f"  EAFP: {eafp_success_time:.4f}s")
    print(f"  Winner: {'EAFP' if eafp_success_time < lbyl_success_time else 'LBYL'}")
    
    print("\nFailure case (key missing):")
    print(f"  LBYL: {lbyl_fail_time:.4f}s")
    print(f"  EAFP: {eafp_fail_time:.4f}s")
    print(f"  Winner: {'EAFP' if eafp_fail_time < lbyl_fail_time else 'LBYL'}")

benchmark_approaches()
# Result: EAFP faster when exceptions are rare
#         LBYL faster when exceptions are common
```

## Optimizing Exception Usage

```python
# ❌ BAD - Using exceptions for control flow
def bad_find_index(items, target):
    """Slow: uses exception for common case"""
    for i in range(len(items)):
        try:
            if items[i] == target:
                return i
        except IndexError:
            pass
    return -1

# ✅ GOOD - Only use exceptions for exceptional cases
def good_find_index(items, target):
    """Fast: normal control flow"""
    for i, item in enumerate(items):
        if item == target:
            return i
    return -1

# Benchmark
items = list(range(10000))

start = time.perf_counter()
for _ in range(1000):
    bad_find_index(items, 5000)
bad_time = time.perf_counter() - start

start = time.perf_counter()
for _ in range(1000):
    good_find_index(items, 5000)
good_time = time.perf_counter() - start

print(f"Bad approach: {bad_time:.4f}s")
print(f"Good approach: {good_time:.4f}s")
print(f"Speedup: {bad_time / good_time:.1f}x")
```

## Caching Validation Results

```python
from functools import lru_cache

# Without caching
def validate_email_no_cache(email: str) -> bool:
    """Validate email (no cache)"""
    if not isinstance(email, str):
        raise TypeError("Email must be string")
    if "@" not in email:
        raise ValueError("Email must contain @")
    if not email.endswith((".com", ".org", ".net")):
        raise ValueError("Invalid domain")
    return True

# With caching
@lru_cache(maxsize=1000)
def validate_email_cached(email: str) -> bool:
    """Validate email (cached)"""
    if not isinstance(email, str):
        raise TypeError("Email must be string")
    if "@" not in email:
        raise ValueError("Email must contain @")
    if not email.endswith((".com", ".org", ".net")):
        raise ValueError("Invalid domain")
    return True

# Benchmark with repeated validations
emails = ["user@example.com", "admin@test.org"] * 5000

# No cache
start = time.perf_counter()
for email in emails:
    try:
        validate_email_no_cache(email)
    except ValueError:
        pass
no_cache_time = time.perf_counter() - start

# With cache
start = time.perf_counter()
for email in emails:
    try:
        validate_email_cached(email)
    except ValueError:
        pass
cache_time = time.perf_counter() - start

print(f"No cache: {no_cache_time:.4f}s")
print(f"With cache: {cache_time:.4f}s")
print(f"Speedup: {no_cache_time / cache_time:.1f}x")
```

## Batch Error Handling

```python
# ❌ BAD - Handle each error individually
def process_items_individual(items):
    """Process items one by one"""
    results = []
    for item in items:
        try:
            result = item * 2
            results.append(result)
        except TypeError as e:
            print(f"Error: {e}")
    return results

# ✅ GOOD - Batch error handling
def process_items_batch(items):
    """Validate all, then process"""
    # Quick validation pass (no exceptions)
    valid_items = [item for item in items if isinstance(item, (int, float))]
    
    # Process valid items (no error checking)
    results = [item * 2 for item in valid_items]
    
    return results

# Benchmark
items = [1, 2, "bad", 3, "bad", 4] * 1000

start = time.perf_counter()
results1 = process_items_individual(items)
individual_time = time.perf_counter() - start

start = time.perf_counter()
results2 = process_items_batch(items)
batch_time = time.perf_counter() - start

print(f"Individual: {individual_time:.4f}s")
print(f"Batch: {batch_time:.4f}s")
print(f"Speedup: {individual_time / batch_time:.1f}x")
```

## Lazy Exception Creation

```python
# ❌ BAD - Create exception objects unnecessarily
def bad_validate(value):
    """Always create exception object"""
    error = ValueError(f"Invalid value: {value}")
    if value < 0:
        raise error
    return value

# ✅ GOOD - Only create when needed
def good_validate(value):
    """Create exception only when raised"""
    if value < 0:
        raise ValueError(f"Invalid value: {value}")
    return value

# Benchmark
values = [i for i in range(10000)]

start = time.perf_counter()
for v in values:
    try:
        bad_validate(v)
    except ValueError:
        pass
bad_time = time.perf_counter() - start

start = time.perf_counter()
for v in values:
    try:
        good_validate(v)
    except ValueError:
        pass
good_time = time.perf_counter() - start

print(f"Bad approach: {bad_time:.4f}s")
print(f"Good approach: {good_time:.4f}s")
print(f"Speedup: {bad_time / good_time:.1f}x")
```

## Minimize Exception Context

```python
# ❌ BAD - Include expensive context
def bad_error_context(data):
    """Include full data in error"""
    if len(data) > 1000:
        raise ValueError(f"Data too large: {data}")  # Expensive string creation

# ✅ GOOD - Include minimal context
def good_error_context(data):
    """Include only essential info"""
    if len(data) > 1000:
        raise ValueError(f"Data too large: {len(data)} items")

# Benchmark
large_data = list(range(10000))

start = time.perf_counter()
for _ in range(1000):
    try:
        bad_error_context(large_data)
    except ValueError:
        pass
bad_time = time.perf_counter() - start

start = time.perf_counter()
for _ in range(1000):
    try:
        good_error_context(large_data)
    except ValueError:
        pass
good_time = time.perf_counter() - start

print(f"With full data: {bad_time:.4f}s")
print(f"With minimal context: {good_time:.4f}s")
print(f"Speedup: {bad_time / good_time:.1f}x")
```

## Early Validation

```python
# ❌ BAD - Deep validation in hot loop
def bad_process_loop(items):
    """Validate inside loop"""
    results = []
    for item in items:
        try:
            # Validate each time
            if not isinstance(item, dict):
                raise TypeError("Item must be dict")
            if "value" not in item:
                raise KeyError("Missing 'value'")
            
            results.append(item["value"] * 2)
        except (TypeError, KeyError) as e:
            print(f"Error: {e}")
    return results

# ✅ GOOD - Validate once before loop
def good_process_loop(items):
    """Validate before processing"""
    # Validate all items first
    if not all(isinstance(item, dict) and "value" in item for item in items):
        raise ValueError("Invalid items")
    
    # Process without error checking (fast)
    return [item["value"] * 2 for item in items]

# Benchmark
valid_items = [{"value": i} for i in range(10000)]

start = time.perf_counter()
results1 = bad_process_loop(valid_items)
bad_time = time.perf_counter() - start

start = time.perf_counter()
results2 = good_process_loop(valid_items)
good_time = time.perf_counter() - start

print(f"Validate in loop: {bad_time:.4f}s")
print(f"Validate before loop: {good_time:.4f}s")
print(f"Speedup: {bad_time / good_time:.1f}x")
```

## Profiling Error Handling

```python
import cProfile
import pstats
from io import StringIO

def function_with_errors():
    """Function with various error patterns"""
    results = []
    
    for i in range(1000):
        try:
            if i % 10 == 0:
                raise ValueError("Multiple of 10")
            results.append(i * 2)
        except ValueError:
            results.append(0)
    
    return results

# Profile the function
profiler = cProfile.Profile()
profiler.enable()

function_with_errors()

profiler.disable()

# Print stats
stream = StringIO()
stats = pstats.Stats(profiler, stream=stream)
stats.sort_stats('cumulative')
stats.print_stats(10)

print("Profile Results:")
print(stream.getvalue())
```

## Performance Best Practices

```python
class OptimizedValidator:
    """Validator with performance optimizations"""
    
    def __init__(self):
        # Cache validation results
        self._validation_cache = {}
        
        # Pre-compile patterns
        import re
        self._email_pattern = re.compile(r'^[\w\.-]+@[\w\.-]+\.\w+$')
    
    def validate_batch(self, items):
        """
        Validate items in batch for performance.
        
        Optimizations:
        - Single validation pass
        - Early termination on first error
        - No exception creation for valid items
        - Reuse compiled patterns
        """
        # Quick type check (no exceptions)
        if not all(isinstance(item, dict) for item in items):
            raise TypeError("All items must be dictionaries")
        
        # Check required fields
        for i, item in enumerate(items):
            if "email" not in item:
                raise ValueError(f"Item {i}: missing 'email' field")
            
            # Use cached validation if possible
            email = item["email"]
            if email in self._validation_cache:
                if not self._validation_cache[email]:
                    raise ValueError(f"Item {i}: invalid email {email}")
            else:
                # Validate and cache
                valid = bool(self._email_pattern.match(email))
                self._validation_cache[email] = valid
                if not valid:
                    raise ValueError(f"Item {i}: invalid email {email}")
        
        return True

# Usage
validator = OptimizedValidator()

items = [
    {"email": "user1@example.com"},
    {"email": "user2@example.com"},
    {"email": "user1@example.com"},  # Cache hit
]

try:
    validator.validate_batch(items)
    print("Validation successful")
except ValueError as e:
    print(f"Validation failed: {e}")
```

## Performance Checklist

**When to Use Exceptions:**
- ✅ For truly exceptional conditions
- ✅ For errors that must be handled
- ✅ For clear error communication
- ❌ For normal control flow
- ❌ In performance-critical loops
- ❌ For common cases

**Optimization Techniques:**
- Validate early, process fast
- Cache validation results
- Batch error handling
- Minimize exception context
- Use EAFP when exceptions are rare
- Use LBYL when exceptions are common
- Avoid exception creation in hot paths
- Profile to find bottlenecks

**Performance Guidelines:**
- Try-except adds minimal overhead when no exception
- Raising exceptions is expensive (100-1000x slower)
- Exception creation has cost
- String formatting in errors is expensive
- Deep stack traces are expensive
- Re-raising is cheaper than new exception

## Summary

**Key Insights:**
- Exceptions are for exceptional cases, not control flow
- Try-except has minimal overhead when no exception raised
- Raising exceptions is much slower than normal execution
- Choose EAFP vs LBYL based on exception frequency

**Optimization Strategies:**
- Validate early, outside hot loops
- Cache validation results when possible
- Batch error handling instead of per-item
- Minimize exception context (no large objects in messages)
- Use lazy exception creation
- Profile to identify bottlenecks

**Balance:**
- Don't sacrifice code clarity for micro-optimizations
- Exception handling overhead is acceptable for errors
- Focus optimization on hot paths
- Measure before optimizing
- Clear code > fast code (until proven slow)

**Remember:** Premature optimization is the root of all evil. Write clear error handling first, optimize only when measurements show it's needed.
