---
id: dependency-inversion
title: Dependency Inversion Principle
chapterId: ch4-abstraction
order: 37
duration: 17
objectives:
  - Understand dependency inversion principle
  - Learn to depend on abstractions not concrete classes
  - Master dependency injection patterns
---

# Dependency Inversion Principle

The **Dependency Inversion Principle (DIP)** states: **depend on abstractions, not concretions**. High-level modules should not depend on low-level modules—both should depend on abstractions.

## The Problem: Direct Dependencies

```python
# ❌ Bad: High-level class depends on low-level concrete class
class EmailService:
    def send_email(self, to, subject, body):
        print(f"Sending email to {to}")

class UserService:
    def __init__(self):
        self.email_service = EmailService()  # Direct dependency!
    
    def register_user(self, user):
        # User registration logic
        self.email_service.send_email(user.email, "Welcome", "...")

# PROBLEMS:
# - UserService is tightly coupled to EmailService
# - Can't swap email implementation
# - Hard to test (requires real email sending)
# - Can't use SMS, push notifications, etc.
```

## The Solution: Depend on Abstractions

```python
# ✅ Good: Depend on abstraction
from abc import ABC, abstractmethod

class NotificationService(ABC):
    """ABSTRACTION - both depend on this."""
    
    @abstractmethod
    def send(self, to, subject, body):
        pass

class EmailService(NotificationService):
    """LOW-LEVEL module implementing abstraction."""
    def send(self, to, subject, body):
        print(f"Sending email to {to}: {subject}")

class SMSService(NotificationService):
    """LOW-LEVEL module implementing abstraction."""
    def send(self, to, subject, body):
        print(f"Sending SMS to {to}: {body}")

class UserService:
    """HIGH-LEVEL module depending on abstraction."""
    
    def __init__(self, notification_service: NotificationService):
        self.notification_service = notification_service  # Injected!
    
    def register_user(self, user):
        # User registration logic
        self.notification_service.send(
            user.email,
            "Welcome",
            "Thanks for registering!"
        )

# BENEFITS:
# - UserService doesn't know about EmailService or SMSService
# - Can swap implementations easily
# - Easy to test with mock NotificationService
# - Open for extension (add PushService, etc.)

# Usage: Inject dependency
email_service = EmailService()
user_service = UserService(email_service)  # Inject email

# Or use SMS
sms_service = SMSService()
user_service = UserService(sms_service)  # Inject SMS
```

## Dependency Injection

### Constructor Injection (Most Common)

```python
class OrderProcessor:
    """Inject dependencies via constructor."""
    
    def __init__(
        self,
        payment_processor: PaymentProcessor,
        inventory_service: InventoryService,
        notification_service: NotificationService
    ):
        self.payment = payment_processor
        self.inventory = inventory_service
        self.notifications = notification_service
    
    def process_order(self, order):
        # Use injected dependencies
        self.inventory.reserve_items(order.items)
        self.payment.process(order.amount)
        self.notifications.send(order.user, "Order confirmed")

# Create with dependencies
processor = OrderProcessor(
    payment_processor=StripePayment(),
    inventory_service=DatabaseInventory(),
    notification_service=EmailService()
)
```

### Setter Injection

```python
class ReportGenerator:
    """Inject dependencies via setters."""
    
    def __init__(self):
        self._data_source = None
        self._formatter = None
    
    def set_data_source(self, data_source: DataSource):
        self._data_source = data_source
    
    def set_formatter(self, formatter: Formatter):
        self._formatter = formatter
    
    def generate(self):
        if not self._data_source or not self._formatter:
            raise ValueError("Dependencies not set")
        
        data = self._data_source.fetch()
        return self._formatter.format(data)

# Configure via setters
generator = ReportGenerator()
generator.set_data_source(SQLDataSource())
generator.set_formatter(PDFFormatter())
```

### Property Injection

```python
class CacheManager:
    """Inject dependency via property."""
    
    def __init__(self):
        self._storage: Optional[Storage] = None
    
    @property
    def storage(self) -> Storage:
        if self._storage is None:
            raise ValueError("Storage not configured")
        return self._storage
    
    @storage.setter
    def storage(self, storage: Storage):
        self._storage = storage
    
    def get(self, key):
        return self.storage.load(key)
    
    def set(self, key, value):
        self.storage.save(key, value)

# Configure via property
cache = CacheManager()
cache.storage = RedisStorage()
```

## Real-World Example: Logging System

```python
from abc import ABC, abstractmethod
from datetime import datetime
from typing import List

# ABSTRACTION: Logger interface
class Logger(ABC):
    """Abstract logger - both high and low-level depend on this."""
    
    @abstractmethod
    def log(self, level: str, message: str) -> None:
        pass

# LOW-LEVEL: Concrete loggers
class ConsoleLogger(Logger):
    """Log to console."""
    def log(self, level: str, message: str) -> None:
        timestamp = datetime.now().isoformat()
        print(f"[{timestamp}] {level}: {message}")

class FileLogger(Logger):
    """Log to file."""
    def __init__(self, filename: str):
        self.filename = filename
    
    def log(self, level: str, message: str) -> None:
        timestamp = datetime.now().isoformat()
        with open(self.filename, 'a') as f:
            f.write(f"[{timestamp}] {level}: {message}\n")

class MultiLogger(Logger):
    """Log to multiple loggers."""
    def __init__(self, loggers: List[Logger]):
        self.loggers = loggers
    
    def log(self, level: str, message: str) -> None:
        for logger in self.loggers:
            logger.log(level, message)

# HIGH-LEVEL: Application class depending on abstraction
class Application:
    """Depends on Logger abstraction, not concrete implementation."""
    
    def __init__(self, logger: Logger):
        self.logger = logger  # Injected dependency
    
    def start(self):
        self.logger.log("INFO", "Application starting")
        # Application logic
        self.logger.log("INFO", "Application started")
    
    def process_data(self, data):
        self.logger.log("INFO", f"Processing {len(data)} items")
        try:
            # Process data
            result = len(data) * 2
            self.logger.log("INFO", f"Processed successfully: {result}")
            return result
        except Exception as e:
            self.logger.log("ERROR", f"Processing failed: {e}")
            raise
    
    def stop(self):
        self.logger.log("INFO", "Application stopping")
        # Cleanup
        self.logger.log("INFO", "Application stopped")

# USAGE: Dependency injection
# Development: Console logging
dev_logger = ConsoleLogger()
dev_app = Application(dev_logger)
dev_app.start()
dev_app.process_data([1, 2, 3])

# Production: File logging
prod_logger = FileLogger("/tmp/app.log")
prod_app = Application(prod_logger)
prod_app.start()

# Testing: Multiple loggers
test_logger = MultiLogger([
    ConsoleLogger(),
    FileLogger("/tmp/test.log")
])
test_app = Application(test_logger)
test_app.start()
```

## Benefits of Dependency Inversion

### 1. Testability

```python
# Easy to test with mock dependencies
class MockNotificationService(NotificationService):
    """Mock for testing."""
    def __init__(self):
        self.sent_messages = []
    
    def send(self, to, subject, body):
        self.sent_messages.append((to, subject, body))

# Test with mock
mock_notifier = MockNotificationService()
user_service = UserService(mock_notifier)
user_service.register_user(User("test@example.com"))

# Verify
assert len(mock_notifier.sent_messages) == 1
assert mock_notifier.sent_messages[0][0] == "test@example.com"
```

### 2. Flexibility

```python
# Easy to swap implementations
class ShoppingCart:
    def __init__(self, storage: Storage):
        self.storage = storage
    
    def add_item(self, item):
        items = self.storage.load("cart") or []
        items.append(item)
        self.storage.save("cart", items)

# Development: Use memory storage
cart1 = ShoppingCart(MemoryStorage())

# Production: Use Redis
cart2 = ShoppingCart(RedisStorage())

# Testing: Use mock storage
cart3 = ShoppingCart(MockStorage())
```

### 3. Extensibility

```python
# Easy to add new implementations without changing existing code
class NewPaymentMethod(PaymentProcessor):
    """New implementation - no changes to OrderProcessor needed."""
    def process(self, amount):
        print(f"Processing with new payment method: ${amount}")

# Works immediately with existing code
processor = OrderProcessor(
    payment_processor=NewPaymentMethod(),  # New!
    inventory_service=DatabaseInventory(),
    notification_service=EmailService()
)
```

## Layered Architecture with DIP

```python
# HIGH-LEVEL LAYER: Business logic
class OrderService:
    """Business logic - depends on abstractions."""
    def __init__(self, repository: OrderRepository, notifier: Notifier):
        self.repository = repository
        self.notifier = notifier
    
    def create_order(self, order_data):
        order = Order(order_data)
        order_id = self.repository.save(order)
        self.notifier.notify(order.customer, "Order created")
        return order_id

# ABSTRACTION LAYER: Interfaces
class OrderRepository(ABC):
    @abstractmethod
    def save(self, order): pass
    
    @abstractmethod
    def find(self, order_id): pass

class Notifier(ABC):
    @abstractmethod
    def notify(self, customer, message): pass

# LOW-LEVEL LAYER: Implementations
class DatabaseOrderRepository(OrderRepository):
    """Concrete implementation."""
    def save(self, order):
        # Database save logic
        return "ORDER-123"
    
    def find(self, order_id):
        # Database query logic
        return None

class EmailNotifier(Notifier):
    """Concrete implementation."""
    def notify(self, customer, message):
        print(f"Email to {customer}: {message}")

# COMPOSITION: Wire dependencies
repository = DatabaseOrderRepository()
notifier = EmailNotifier()
service = OrderService(repository, notifier)
```

## Dependency Injection Container (Advanced)

```python
class DIContainer:
    """Simple dependency injection container."""
    
    def __init__(self):
        self._services = {}
    
    def register(self, interface, implementation):
        """Register service."""
        self._services[interface] = implementation
    
    def resolve(self, interface):
        """Resolve service."""
        return self._services.get(interface)

# Configure container
container = DIContainer()
container.register(Logger, FileLogger("/tmp/app.log"))
container.register(NotificationService, EmailService())

# Resolve dependencies
logger = container.resolve(Logger)
notifier = container.resolve(NotificationService)

# Use resolved dependencies
app = Application(logger)
user_service = UserService(notifier)
```

## Common Mistakes

### Mistake 1: Depending on Concrete Classes

```python
# ❌ Bad: Depends on concrete EmailService
class UserManager:
    def __init__(self):
        self.email = EmailService()  # Tight coupling!

# ✅ Good: Depends on abstraction
class UserManager:
    def __init__(self, notifier: NotificationService):
        self.notifier = notifier  # Loose coupling!
```

### Mistake 2: Creating Dependencies Internally

```python
# ❌ Bad: Creates dependency internally
class ReportGenerator:
    def __init__(self):
        self.db = MySQLDatabase()  # Hard-coded!

# ✅ Good: Inject dependency
class ReportGenerator:
    def __init__(self, database: Database):
        self.db = database  # Injected!
```

### Mistake 3: Not Using Abstractions

```python
# ❌ Bad: No abstraction
class OrderProcessor:
    def __init__(self, stripe_payment: StripePayment):
        self.payment = stripe_payment  # Still coupled to Stripe!

# ✅ Good: Use abstraction
class OrderProcessor:
    def __init__(self, payment: PaymentProcessor):
        self.payment = payment  # Works with any payment processor!
```

## DIP Checklist

When designing dependencies:

- [ ] **Identify abstractions** - what's the core behavior?
- [ ] **Create interface** - ABC or Protocol
- [ ] **Depend on abstraction** - not concrete classes
- [ ] **Inject dependencies** - constructor, setter, or property
- [ ] **Use composition** - favor over inheritance
- [ ] **Test with mocks** - verify decoupling
- [ ] **Document contracts** - clear interface expectations

## Summary

The **Dependency Inversion Principle** promotes **depending on abstractions, not concretions**. High-level modules should not depend on low-level modules—both should depend on abstractions (interfaces). Use **dependency injection** to provide concrete implementations at runtime via constructor, setter, or property injection. This creates **loose coupling**, enabling **testability** (inject mocks), **flexibility** (swap implementations), and **extensibility** (add implementations without changing existing code). Define **clear interfaces** (ABC or Protocol) that both high-level and low-level modules depend on. DIP is essential for **maintainable**, **testable**, and **flexible** architectures, enabling true separation of concerns and **inversion of control**.
