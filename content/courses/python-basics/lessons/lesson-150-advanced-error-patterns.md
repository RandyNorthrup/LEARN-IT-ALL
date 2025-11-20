---
id: "158-advanced-error-patterns"
title: "Advanced Error Handling Patterns"
chapterId: ch11-error-handling
order: 13
duration: 30
objectives:
  - Master sophisticated error patterns
  - Implement error recovery strategies
  - Build resilient systems
  - Apply advanced techniques
---

# Advanced Error Handling Patterns

Sophisticated patterns for production-grade error handling.

## Result Type Pattern

```python
from typing import Generic, TypeVar, Union
from dataclasses import dataclass

T = TypeVar('T')
E = TypeVar('E')

@dataclass
class Success(Generic[T]):
    """Successful result"""
    value: T
    
    def is_success(self) -> bool:
        return True
    
    def is_error(self) -> bool:
        return False

@dataclass
class Error(Generic[E]):
    """Error result"""
    error: E
    
    def is_success(self) -> bool:
        return False
    
    def is_error(self) -> bool:
        return True

Result = Union[Success[T], Error[E]]

# Functions return Result instead of raising
def divide(a: float, b: float) -> Result[float, str]:
    """Divide with Result type"""
    if b == 0:
        return Error("Cannot divide by zero")
    return Success(a / b)

def safe_int(value: str) -> Result[int, str]:
    """Parse int with Result type"""
    try:
        return Success(int(value))
    except ValueError:
        return Error(f"Invalid integer: {value}")

# Chain operations
def calculate(a_str: str, b_str: str) -> Result[float, str]:
    """Calculate with error propagation"""
    # Parse first number
    a_result = safe_int(a_str)
    if a_result.is_error():
        return Error(f"First number: {a_result.error}")
    
    # Parse second number
    b_result = safe_int(b_str)
    if b_result.is_error():
        return Error(f"Second number: {b_result.error}")
    
    # Divide
    return divide(float(a_result.value), float(b_result.value))

# Usage
result = calculate("10", "2")
if result.is_success():
    print(f"Result: {result.value}")
else:
    print(f"Error: {result.error}")

# With error
result = calculate("10", "0")
if result.is_error():
    print(f"Error: {result.error}")
```

## Option Type Pattern

```python
from typing import Optional, Callable, TypeVar

T = TypeVar('T')
U = TypeVar('U')

class Option(Generic[T]):
    """Optional value with safe operations"""
    
    def __init__(self, value: Optional[T] = None):
        self._value = value
    
    def is_some(self) -> bool:
        """Check if has value"""
        return self._value is not None
    
    def is_none(self) -> bool:
        """Check if no value"""
        return self._value is None
    
    def unwrap(self) -> T:
        """Get value or raise"""
        if self._value is None:
            raise ValueError("Called unwrap on None")
        return self._value
    
    def unwrap_or(self, default: T) -> T:
        """Get value or default"""
        return self._value if self._value is not None else default
    
    def map(self, func: Callable[[T], U]) -> 'Option[U]':
        """Map function over value"""
        if self._value is None:
            return Option()
        return Option(func(self._value))
    
    def and_then(self, func: Callable[[T], 'Option[U]']) -> 'Option[U]':
        """Chain operations"""
        if self._value is None:
            return Option()
        return func(self._value)

def safe_divide(a: float, b: float) -> Option[float]:
    """Divide returning Option"""
    if b == 0:
        return Option()
    return Option(a / b)

def safe_sqrt(x: float) -> Option[float]:
    """Square root returning Option"""
    if x < 0:
        return Option()
    return Option(x ** 0.5)

# Chain operations
result = (
    safe_divide(10, 2)
    .and_then(lambda x: safe_sqrt(x))
    .map(lambda x: x * 2)
)

if result.is_some():
    print(f"Result: {result.unwrap()}")
else:
    print("No result")

# Handle None case
result = safe_divide(10, 0).unwrap_or(0.0)
print(f"Result with default: {result}")
```

## Saga Pattern (Distributed Transactions)

```python
from typing import List, Callable, Any
from abc import ABC, abstractmethod

class SagaStep(ABC):
    """Single step in saga"""
    
    @abstractmethod
    def execute(self, context: Dict[str, Any]) -> Any:
        """Execute step"""
        pass
    
    @abstractmethod
    def compensate(self, context: Dict[str, Any]):
        """Undo step"""
        pass

class ReserveSeat(SagaStep):
    """Reserve seat step"""
    
    def execute(self, context: Dict[str, Any]) -> Any:
        print(f"Reserving seat for user {context['user_id']}")
        # Simulate reservation
        reservation_id = "RES-123"
        context['reservation_id'] = reservation_id
        return reservation_id
    
    def compensate(self, context: Dict[str, Any]):
        print(f"Canceling reservation {context.get('reservation_id')}")
        # Undo reservation

class ChargePayment(SagaStep):
    """Charge payment step"""
    
    def execute(self, context: Dict[str, Any]) -> Any:
        print(f"Charging ${context['amount']} to user {context['user_id']}")
        
        # Simulate payment failure
        if context.get('fail_payment'):
            raise RuntimeError("Payment failed")
        
        payment_id = "PAY-456"
        context['payment_id'] = payment_id
        return payment_id
    
    def compensate(self, context: Dict[str, Any]):
        print(f"Refunding payment {context.get('payment_id')}")
        # Refund payment

class SendConfirmation(SagaStep):
    """Send confirmation step"""
    
    def execute(self, context: Dict[str, Any]) -> Any:
        print(f"Sending confirmation to user {context['user_id']}")
        context['confirmation_sent'] = True
        return True
    
    def compensate(self, context: Dict[str, Any]):
        print("Sending cancellation email")
        # Send cancellation

class Saga:
    """
    Saga coordinator for distributed transactions.
    
    Ensures all-or-nothing execution with compensation.
    """
    
    def __init__(self):
        self.steps: List[SagaStep] = []
    
    def add_step(self, step: SagaStep):
        """Add step to saga"""
        self.steps.append(step)
    
    def execute(self, context: Dict[str, Any]) -> tuple[bool, Optional[Exception]]:
        """
        Execute saga with automatic compensation on failure.
        
        Returns:
            Tuple of (success, error)
        """
        executed_steps = []
        
        try:
            # Execute all steps
            for step in self.steps:
                step.execute(context)
                executed_steps.append(step)
            
            return True, None
        
        except Exception as e:
            print(f"\nSaga failed: {e}")
            print("Starting compensation...")
            
            # Compensate in reverse order
            for step in reversed(executed_steps):
                try:
                    step.compensate(context)
                except Exception as comp_error:
                    print(f"Compensation failed: {comp_error}")
            
            return False, e

# Usage - successful saga
print("=== Successful Saga ===")
saga = Saga()
saga.add_step(ReserveSeat())
saga.add_step(ChargePayment())
saga.add_step(SendConfirmation())

context = {
    "user_id": "user123",
    "amount": 50.00
}

success, error = saga.execute(context)
if success:
    print("\n✓ Booking completed successfully")
    print(f"Context: {context}")
else:
    print(f"\n✗ Booking failed: {error}")

# Usage - failed saga with compensation
print("\n=== Failed Saga with Compensation ===")
saga2 = Saga()
saga2.add_step(ReserveSeat())
saga2.add_step(ChargePayment())
saga2.add_step(SendConfirmation())

context2 = {
    "user_id": "user456",
    "amount": 50.00,
    "fail_payment": True  # Simulate payment failure
}

success, error = saga2.execute(context2)
if not success:
    print(f"\n✓ Saga compensated successfully after error")
```

## Bulkhead Pattern

```python
from threading import Semaphore, Lock
from typing import Callable
import time

class Bulkhead:
    """
    Isolate resources to prevent cascade failures.
    
    Limits concurrent executions to protect system.
    """
    
    def __init__(self, max_concurrent: int, max_queue: int = 0):
        self.semaphore = Semaphore(max_concurrent)
        self.max_queue = max_queue
        self.queue_size = 0
        self.queue_lock = Lock()
        self.rejected_count = 0
    
    def execute(self, func: Callable, *args, **kwargs):
        """
        Execute function with bulkhead protection.
        
        Raises:
            RuntimeError: If queue is full
        """
        # Check queue size
        with self.queue_lock:
            if self.queue_size >= self.max_queue:
                self.rejected_count += 1
                raise RuntimeError("Bulkhead full - request rejected")
            self.queue_size += 1
        
        try:
            # Try to acquire semaphore
            acquired = self.semaphore.acquire(timeout=1.0)
            
            if not acquired:
                raise TimeoutError("Bulkhead timeout")
            
            try:
                # Execute function
                return func(*args, **kwargs)
            finally:
                self.semaphore.release()
        
        finally:
            with self.queue_lock:
                self.queue_size -= 1
    
    def get_stats(self) -> Dict[str, int]:
        """Get bulkhead statistics"""
        return {
            "rejected": self.rejected_count,
            "queue_size": self.queue_size
        }

# Example: Protect database from overload
database_bulkhead = Bulkhead(max_concurrent=10, max_queue=20)

def query_database(sql: str):
    """Database query"""
    time.sleep(0.1)  # Simulate query
    return f"Results for: {sql}"

# Execute with protection
try:
    result = database_bulkhead.execute(
        query_database,
        "SELECT * FROM users"
    )
    print(f"Query result: {result}")
except RuntimeError as e:
    print(f"Request rejected: {e}")
```

## Dead Letter Queue Pattern

```python
from dataclasses import dataclass
from datetime import datetime
from typing import List, Callable

@dataclass
class FailedMessage:
    """Failed message with context"""
    message: Any
    error: str
    timestamp: datetime
    retry_count: int
    original_queue: str

class DeadLetterQueue:
    """
    Store failed messages for later analysis.
    
    Messages that fail repeatedly go to DLQ.
    """
    
    def __init__(self):
        self.messages: List[FailedMessage] = []
    
    def add(self, message: Any, error: str, retry_count: int, queue: str):
        """Add failed message"""
        failed = FailedMessage(
            message=message,
            error=error,
            timestamp=datetime.now(),
            retry_count=retry_count,
            original_queue=queue
        )
        self.messages.append(failed)
    
    def get_messages(self) -> List[FailedMessage]:
        """Get all failed messages"""
        return self.messages.copy()
    
    def retry_message(self, index: int, processor: Callable):
        """Retry a failed message"""
        if index >= len(self.messages):
            raise IndexError("Message not found")
        
        message = self.messages[index]
        
        try:
            processor(message.message)
            # Success - remove from DLQ
            self.messages.pop(index)
            return True
        except Exception as e:
            # Still failing
            message.retry_count += 1
            message.error = str(e)
            message.timestamp = datetime.now()
            return False

class MessageProcessor:
    """Process messages with DLQ"""
    
    def __init__(self, max_retries: int = 3):
        self.max_retries = max_retries
        self.dlq = DeadLetterQueue()
    
    def process_with_retry(self, message: Any, processor: Callable):
        """Process message with retry and DLQ"""
        retry_count = 0
        last_error = None
        
        while retry_count < self.max_retries:
            try:
                processor(message)
                return True
            except Exception as e:
                last_error = e
                retry_count += 1
                print(f"Attempt {retry_count} failed: {e}")
                time.sleep(0.1 * retry_count)  # Backoff
        
        # Max retries exceeded - send to DLQ
        self.dlq.add(message, str(last_error), retry_count, "main_queue")
        print(f"Message sent to DLQ after {retry_count} retries")
        return False

# Usage
def unreliable_processor(message):
    """Processor that sometimes fails"""
    if "error" in str(message):
        raise ValueError(f"Cannot process: {message}")
    print(f"Processed: {message}")

processor = MessageProcessor(max_retries=3)

# Process messages
messages = ["message1", "error_message", "message2"]

for msg in messages:
    processor.process_with_retry(msg, unreliable_processor)

# Check DLQ
dlq_messages = processor.dlq.get_messages()
print(f"\nDead Letter Queue: {len(dlq_messages)} messages")
for msg in dlq_messages:
    print(f"  Failed: {msg.message} - {msg.error} ({msg.retry_count} retries)")
```

## Graceful Degradation

```python
from typing import Callable, Any, Optional

class GracefulDegrader:
    """
    Provide fallback functionality when primary fails.
    
    Maintains service even with degraded functionality.
    """
    
    def __init__(self):
        self.failure_counts = {}
        self.fallback_active = {}
    
    def execute_with_fallback(self,
                             primary: Callable[[], Any],
                             fallback: Callable[[], Any],
                             service_name: str) -> tuple[Any, bool]:
        """
        Execute with fallback.
        
        Returns:
            Tuple of (result, used_fallback)
        """
        try:
            result = primary()
            
            # Primary succeeded
            self.failure_counts[service_name] = 0
            self.fallback_active[service_name] = False
            
            return result, False
        
        except Exception as e:
            print(f"Primary failed: {e}, using fallback")
            
            # Track failure
            self.failure_counts[service_name] = \
                self.failure_counts.get(service_name, 0) + 1
            self.fallback_active[service_name] = True
            
            try:
                result = fallback()
                return result, True
            except Exception as fallback_error:
                print(f"Fallback also failed: {fallback_error}")
                raise

# Example: Recommendation service with fallback
degrader = GracefulDegrader()

def get_ml_recommendations(user_id: str):
    """Get ML-based recommendations (can fail)"""
    # Simulate ML service failure
    raise ConnectionError("ML service unavailable")

def get_popular_items(user_id: str):
    """Fallback: return popular items"""
    return ["item1", "item2", "item3"]

# Usage
try:
    recommendations, used_fallback = degrader.execute_with_fallback(
        lambda: get_ml_recommendations("user123"),
        lambda: get_popular_items("user123"),
        "recommendations"
    )
    
    if used_fallback:
        print("Using fallback recommendations (degraded mode)")
    print(f"Recommendations: {recommendations}")

except Exception as e:
    print(f"Complete failure: {e}")
```

## Timeout Decorator

```python
import signal
from functools import wraps

class TimeoutError(Exception):
    """Timeout exception"""
    pass

def timeout(seconds: int):
    """
    Decorator to add timeout to function.
    
    Args:
        seconds: Timeout in seconds
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Define timeout handler
            def timeout_handler(signum, frame):
                raise TimeoutError(f"Function timed out after {seconds}s")
            
            # Set signal handler
            old_handler = signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(seconds)
            
            try:
                result = func(*args, **kwargs)
            finally:
                # Restore old handler and cancel alarm
                signal.alarm(0)
                signal.signal(signal.SIGALRM, old_handler)
            
            return result
        
        return wrapper
    return decorator

# Usage
@timeout(2)
def slow_function():
    """Function that might take too long"""
    time.sleep(5)
    return "Done"

try:
    result = slow_function()
    print(f"Result: {result}")
except TimeoutError as e:
    print(f"Timeout: {e}")
```

## Error Recovery State Machine

```python
from enum import Enum

class RecoveryState(Enum):
    """Recovery states"""
    NORMAL = "normal"
    DEGRADED = "degraded"
    RECOVERY = "recovery"
    FAILED = "failed"

class RecoveryStateMachine:
    """
    Manage error recovery with state machine.
    
    States:
    - NORMAL: Everything working
    - DEGRADED: Some failures, using fallbacks
    - RECOVERY: Attempting to recover
    - FAILED: Complete failure
    """
    
    def __init__(self, failure_threshold: int = 3):
        self.state = RecoveryState.NORMAL
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.recovery_attempts = 0
        self.max_recovery_attempts = 3
    
    def record_success(self):
        """Record successful operation"""
        if self.state == RecoveryState.RECOVERY:
            print("Recovery successful!")
            self.state = RecoveryState.NORMAL
        
        self.failure_count = 0
        self.recovery_attempts = 0
    
    def record_failure(self):
        """Record failed operation"""
        self.failure_count += 1
        
        if self.state == RecoveryState.NORMAL:
            if self.failure_count >= self.failure_threshold:
                print("Entering degraded mode")
                self.state = RecoveryState.DEGRADED
        
        elif self.state == RecoveryState.DEGRADED:
            print("Attempting recovery")
            self.state = RecoveryState.RECOVERY
            self.recovery_attempts += 1
        
        elif self.state == RecoveryState.RECOVERY:
            if self.recovery_attempts >= self.max_recovery_attempts:
                print("Recovery failed - entering failed state")
                self.state = RecoveryState.FAILED
            else:
                self.recovery_attempts += 1
    
    def can_execute(self) -> bool:
        """Check if can execute operations"""
        return self.state != RecoveryState.FAILED
    
    def get_state(self) -> RecoveryState:
        """Get current state"""
        return self.state

# Usage
machine = RecoveryStateMachine(failure_threshold=2)

# Simulate failures
for i in range(10):
    if not machine.can_execute():
        print("System failed - cannot execute")
        break
    
    # Simulate operation
    success = i % 3 == 0  # Success every 3rd time
    
    if success:
        print(f"Operation {i}: Success")
        machine.record_success()
    else:
        print(f"Operation {i}: Failed")
        machine.record_failure()
    
    print(f"  State: {machine.get_state().value}\n")
```

## Summary

**Advanced Patterns:**
- **Result Type**: Explicit success/error without exceptions
- **Option Type**: Safe handling of optional values
- **Saga**: Distributed transaction with compensation
- **Bulkhead**: Resource isolation and protection
- **Dead Letter Queue**: Store failed messages for analysis
- **Graceful Degradation**: Fallback functionality
- **Timeout Decorator**: Automatic timeout handling
- **Recovery State Machine**: Systematic recovery process

**When to Use:**
- **Result/Option**: Functional-style error handling
- **Saga**: Distributed systems, microservices
- **Bulkhead**: Protect critical resources
- **DLQ**: Message processing systems
- **Degradation**: High-availability services
- **Timeout**: Network operations, external APIs
- **State Machine**: Complex recovery scenarios

**Benefits:**
- More explicit error handling
- Better resource protection
- Systematic recovery
- Graceful failure
- Better debugging
- Clear error propagation
- Improved resilience
- Predictable behavior
