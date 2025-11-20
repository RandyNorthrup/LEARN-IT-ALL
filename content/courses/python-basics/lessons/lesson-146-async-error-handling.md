---
id: "154-async-error-handling"
title: "Error Handling in Async Code"
chapterId: ch11-error-handling
order: 9
duration: 25
objectives:
  - Handle errors in async/await code
  - Manage task exceptions
  - Use asyncio error patterns
  - Debug async errors
---

# Error Handling in Async Code

Async error handling requires special patterns and understanding.

## Async Exceptions Basics

```python
import asyncio

async def fetch_data(url: str):
    """Async function that can fail"""
    # Simulate network request
    await asyncio.sleep(1)
    
    if "invalid" in url:
        raise ValueError(f"Invalid URL: {url}")
    
    return f"Data from {url}"

# Try-except in async function
async def safe_fetch():
    try:
        data = await fetch_data("https://api.example.com")
        print(f"Success: {data}")
    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

# Run
asyncio.run(safe_fetch())
```

## Task Exception Handling

```python
async def task_with_exception():
    """Task that raises exception"""
    await asyncio.sleep(1)
    raise RuntimeError("Task failed!")

# Exception not raised until awaited
async def main():
    # Create task
    task = asyncio.create_task(task_with_exception())
    
    # Do other work
    await asyncio.sleep(0.5)
    
    # Exception raised here when awaiting
    try:
        await task
    except RuntimeError as e:
        print(f"Task failed: {e}")

asyncio.run(main())
```

## Multiple Task Errors

```python
async def fetch_url(url: str):
    """Fetch URL with potential error"""
    await asyncio.sleep(1)
    if url.endswith("/error"):
        raise ValueError(f"Failed to fetch {url}")
    return f"Content from {url}"

# Wait for all tasks, collect errors
async def fetch_all_v1(urls):
    """Gather with return_exceptions=True"""
    tasks = [fetch_url(url) for url in urls]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Process results and exceptions
    successful = []
    errors = []
    
    for i, result in enumerate(results):
        if isinstance(result, Exception):
            errors.append((urls[i], result))
        else:
            successful.append(result)
    
    return successful, errors

# Usage
async def main():
    urls = [
        "https://example.com/page1",
        "https://example.com/error",
        "https://example.com/page2"
    ]
    
    successful, errors = await fetch_all_v1(urls)
    
    print(f"Successful: {len(successful)}")
    for content in successful:
        print(f"  - {content}")
    
    print(f"\nErrors: {len(errors)}")
    for url, error in errors:
        print(f"  - {url}: {error}")

asyncio.run(main())
```

## Task Groups (Python 3.11+)

```python
async def process_item(item: str):
    """Process item"""
    await asyncio.sleep(1)
    if item == "error":
        raise ValueError(f"Cannot process {item}")
    return f"Processed {item}"

# TaskGroup for error handling
async def process_all_v2(items):
    """Use TaskGroup for better error handling"""
    results = []
    
    try:
        async with asyncio.TaskGroup() as tg:
            tasks = [tg.create_task(process_item(item)) for item in items]
        
        # All tasks succeeded
        results = [task.result() for task in tasks]
    
    except* ValueError as eg:
        # Handle ValueError from any task
        print(f"Validation errors: {len(eg.exceptions)}")
        for exc in eg.exceptions:
            print(f"  - {exc}")
    
    except* Exception as eg:
        # Handle other errors
        print(f"Other errors: {len(eg.exceptions)}")
        for exc in eg.exceptions:
            print(f"  - {exc}")
    
    return results

# Usage (Python 3.11+)
async def main():
    items = ["item1", "error", "item2"]
    results = await process_all_v2(items)
    print(f"Results: {results}")

asyncio.run(main())
```

## Timeout Handling

```python
async def slow_operation():
    """Operation that might timeout"""
    await asyncio.sleep(10)
    return "Complete"

# Timeout with asyncio.wait_for
async def with_timeout_v1():
    try:
        result = await asyncio.wait_for(slow_operation(), timeout=2.0)
        print(f"Result: {result}")
    except asyncio.TimeoutError:
        print("Operation timed out!")

asyncio.run(with_timeout_v1())

# Timeout with async-timeout library pattern
from contextlib import asynccontextmanager

@asynccontextmanager
async def timeout(seconds: float):
    """Custom timeout context manager"""
    try:
        async with asyncio.timeout(seconds):  # Python 3.11+
            yield
    except TimeoutError:
        raise asyncio.TimeoutError(f"Operation exceeded {seconds}s")

async def with_timeout_v2():
    try:
        async with timeout(2.0):
            result = await slow_operation()
            print(f"Result: {result}")
    except asyncio.TimeoutError as e:
        print(f"Timeout: {e}")

asyncio.run(with_timeout_v2())
```

## Async Context Managers

```python
class DatabaseConnection:
    """Async database connection"""
    
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.connected = False
    
    async def __aenter__(self):
        """Connect to database"""
        print("Connecting...")
        await asyncio.sleep(1)
        
        if "invalid" in self.connection_string:
            raise ConnectionError("Invalid connection string")
        
        self.connected = True
        print("Connected!")
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Disconnect from database"""
        print("Disconnecting...")
        await asyncio.sleep(0.5)
        self.connected = False
        print("Disconnected!")
        
        # Return False to propagate exception
        return False
    
    async def query(self, sql: str):
        """Execute query"""
        if not self.connected:
            raise RuntimeError("Not connected")
        
        await asyncio.sleep(0.5)
        return f"Results for: {sql}"

# Usage
async def main():
    try:
        async with DatabaseConnection("db://localhost") as db:
            result = await db.query("SELECT * FROM users")
            print(result)
    except ConnectionError as e:
        print(f"Connection failed: {e}")
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(main())
```

## Retry Pattern for Async

```python
from typing import TypeVar, Callable, Optional
import random

T = TypeVar('T')

async def retry_async(
    coro_func: Callable[..., T],
    max_retries: int = 3,
    delay: float = 1.0,
    backoff: float = 2.0,
    exceptions: tuple = (Exception,)
) -> Optional[T]:
    """
    Retry async function with exponential backoff.
    
    Args:
        coro_func: Async function to retry
        max_retries: Maximum retry attempts
        delay: Initial delay between retries
        backoff: Backoff multiplier
        exceptions: Tuple of exceptions to catch
    
    Returns:
        Result of function or None
    """
    last_exception = None
    
    for attempt in range(1, max_retries + 1):
        try:
            return await coro_func()
        
        except exceptions as e:
            last_exception = e
            
            if attempt == max_retries:
                raise
            
            wait_time = delay * (backoff ** (attempt - 1))
            print(f"Attempt {attempt} failed: {e}. Retrying in {wait_time}s...")
            await asyncio.sleep(wait_time)
    
    if last_exception:
        raise last_exception

# Example usage
async def flaky_api_call():
    """API call that fails randomly"""
    await asyncio.sleep(0.5)
    
    if random.random() < 0.7:  # 70% failure rate
        raise ConnectionError("API temporarily unavailable")
    
    return {"data": "success"}

async def main():
    try:
        result = await retry_async(
            flaky_api_call,
            max_retries=5,
            delay=1.0,
            backoff=2.0,
            exceptions=(ConnectionError,)
        )
        print(f"Success: {result}")
    except ConnectionError as e:
        print(f"All retries failed: {e}")

asyncio.run(main())
```

## Async Error Aggregation

```python
from dataclasses import dataclass
from typing import List, Any

@dataclass
class TaskResult:
    """Result of async task"""
    task_id: str
    success: bool
    result: Any = None
    error: Optional[Exception] = None

async def process_with_id(task_id: str, item: Any):
    """Process item with ID"""
    await asyncio.sleep(1)
    
    if isinstance(item, str) and item.startswith("error"):
        raise ValueError(f"Invalid item: {item}")
    
    return item * 2

async def process_batch(items: List[Any]) -> List[TaskResult]:
    """
    Process batch of items, collect all results and errors.
    
    Returns:
        List of TaskResult with success/failure info
    """
    tasks = []
    task_ids = []
    
    for i, item in enumerate(items):
        task_id = f"task_{i}"
        task_ids.append(task_id)
        tasks.append(process_with_id(task_id, item))
    
    # Gather with exceptions
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Build task results
    task_results = []
    
    for task_id, result in zip(task_ids, results):
        if isinstance(result, Exception):
            task_results.append(TaskResult(
                task_id=task_id,
                success=False,
                error=result
            ))
        else:
            task_results.append(TaskResult(
                task_id=task_id,
                success=True,
                result=result
            ))
    
    return task_results

# Usage
async def main():
    items = [1, 2, "error1", 3, "error2", 4]
    
    results = await process_batch(items)
    
    successful = [r for r in results if r.success]
    failed = [r for r in results if not r.success]
    
    print(f"Successful: {len(successful)}")
    for r in successful:
        print(f"  {r.task_id}: {r.result}")
    
    print(f"\nFailed: {len(failed)}")
    for r in failed:
        print(f"  {r.task_id}: {r.error}")

asyncio.run(main())
```

## Async Queue Error Handling

```python
from asyncio import Queue

async def producer(queue: Queue, items: List[Any]):
    """Produce items"""
    for item in items:
        try:
            # Validate item
            if item is None:
                raise ValueError("Item cannot be None")
            
            await queue.put(item)
            print(f"Produced: {item}")
        
        except ValueError as e:
            print(f"Producer error: {e}")
        
        await asyncio.sleep(0.5)
    
    # Signal completion
    await queue.put(None)

async def consumer(queue: Queue, consumer_id: int):
    """Consume items"""
    while True:
        try:
            item = await queue.get()
            
            # Check for completion signal
            if item is None:
                break
            
            # Process item
            if isinstance(item, str) and item.startswith("error"):
                raise RuntimeError(f"Cannot process {item}")
            
            print(f"Consumer {consumer_id} processed: {item}")
            await asyncio.sleep(1)
        
        except RuntimeError as e:
            print(f"Consumer {consumer_id} error: {e}")
        
        finally:
            queue.task_done()

async def main():
    queue = Queue()
    
    items = [1, 2, "error", 3, None, 4]
    
    # Start producer and consumers
    producer_task = asyncio.create_task(producer(queue, items))
    consumer_tasks = [
        asyncio.create_task(consumer(queue, i))
        for i in range(2)
    ]
    
    # Wait for producer
    await producer_task
    
    # Wait for queue to be processed
    await queue.join()
    
    # Cancel consumers
    for task in consumer_tasks:
        task.cancel()
    
    # Wait for cancellation
    await asyncio.gather(*consumer_tasks, return_exceptions=True)

asyncio.run(main())
```

## Debugging Async Errors

```python
import traceback
import sys

async def problematic_async():
    """Async function with error"""
    await asyncio.sleep(1)
    raise ValueError("Something went wrong")

# Enable asyncio debug mode
async def main():
    # Print full async stack trace
    try:
        await problematic_async()
    except Exception:
        print("Full async traceback:")
        traceback.print_exc()
        
        # Get exception info
        exc_type, exc_value, exc_tb = sys.exc_info()
        print(f"\nException type: {exc_type.__name__}")
        print(f"Exception value: {exc_value}")
        
        # Format traceback
        tb_lines = traceback.format_tb(exc_tb)
        print("\nStack trace:")
        for line in tb_lines:
            print(line.rstrip())

# Run with debug mode
asyncio.run(main(), debug=True)

# Show pending tasks
async def show_pending():
    """Show pending tasks for debugging"""
    # Create some tasks
    task1 = asyncio.create_task(asyncio.sleep(10))
    task2 = asyncio.create_task(asyncio.sleep(20))
    
    # Get all tasks
    pending = asyncio.all_tasks()
    
    print(f"Pending tasks: {len(pending)}")
    for task in pending:
        print(f"  - {task.get_name()}: {task}")
    
    # Clean up
    task1.cancel()
    task2.cancel()
    await asyncio.gather(task1, task2, return_exceptions=True)

asyncio.run(show_pending())
```

## Production Async Error Handler

```python
import logging
from typing import Coroutine, Any

logger = logging.getLogger(__name__)

class AsyncErrorHandler:
    """Production-ready async error handler"""
    
    def __init__(self):
        self.error_count = 0
        self.errors = []
    
    async def run_with_handler(self, coro: Coroutine) -> tuple[bool, Any]:
        """
        Run coroutine with error handling.
        
        Returns:
            Tuple of (success, result_or_error)
        """
        try:
            result = await coro
            return True, result
        
        except asyncio.CancelledError:
            logger.warning("Task was cancelled")
            raise
        
        except asyncio.TimeoutError as e:
            logger.error(f"Task timed out: {e}")
            self.error_count += 1
            self.errors.append(("timeout", e))
            return False, e
        
        except Exception as e:
            logger.error(f"Task failed: {e}", exc_info=True)
            self.error_count += 1
            self.errors.append((type(e).__name__, e))
            return False, e
    
    def get_stats(self):
        """Get error statistics"""
        return {
            "total_errors": self.error_count,
            "errors_by_type": {}
        }

# Usage
async def main():
    handler = AsyncErrorHandler()
    
    # Run multiple tasks
    async def task1():
        await asyncio.sleep(1)
        return "success"
    
    async def task2():
        await asyncio.sleep(1)
        raise ValueError("failed")
    
    success1, result1 = await handler.run_with_handler(task1())
    print(f"Task 1: {'Success' if success1 else 'Failed'} - {result1}")
    
    success2, result2 = await handler.run_with_handler(task2())
    print(f"Task 2: {'Success' if success2 else 'Failed'} - {result2}")
    
    print(f"\nStats: {handler.get_stats()}")

asyncio.run(main())
```

## Summary

**Async Error Handling:**
- Use try-except in async functions
- Handle task exceptions when awaiting
- Use `gather(return_exceptions=True)` for multiple tasks
- Use TaskGroup for Python 3.11+
- Handle timeouts with `wait_for` or `async_timeout`
- Create async context managers for resource management
- Implement retry patterns with exponential backoff
- Aggregate errors from multiple tasks
- Handle queue errors in producer-consumer
- Debug with asyncio debug mode

**Key Differences from Sync:**
- Exceptions not raised until `await`
- Tasks can fail silently if not awaited
- Need special patterns for concurrent errors
- Timeout handling is async-specific
- Context managers use `__aenter__`/`__aexit__`

**Best Practices:**
- Always await tasks to catch exceptions
- Use `return_exceptions=True` for parallel tasks
- Set timeouts for all network operations
- Log async errors with full context
- Clean up tasks on shutdown
- Test error paths in async code
