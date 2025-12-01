---
id: "060"
title: "Testing Polymorphic Code"
chapterId: "06"
order: 8
duration: "20 minutes"
objectives:
  - "Write effective tests for polymorphic systems"
  - "Use mocks and test doubles properly"
  - "Test interface contracts thoroughly"
  - "Apply parameterized testing for multiple implementations"
  - "Measure and improve test coverage"
---

# Testing Polymorphic Code

Testing polymorphic systems requires special strategies to ensure all implementations behave correctly and fulfill their contracts. This lesson covers techniques for thorough, maintainable testing.

## Introduction

Testing polymorphic code involves:
- Testing interface contracts
- Testing all concrete implementations
- Using test doubles (mocks, stubs, fakes)
- Parameterized testing across implementations
- Integration testing with real objects

## Testing Interface Contracts

### Contract Test Base Class

```python
from abc import ABC, abstractmethod
import unittest

# Interface to test
class Storage(ABC):
    """Storage interface contract."""
    
    @abstractmethod
    def save(self, key: str, value: str) -> None:
        pass
    
    @abstractmethod
    def load(self, key: str) -> str:
        pass
    
    @abstractmethod
    def exists(self, key: str) -> bool:
        pass


# Base test class for contract
class StorageContractTests(unittest.TestCase):
    """Test contract that all Storage implementations must pass.
    
    Subclasses must implement create_storage() to provide
    the Storage implementation to test.
    """
    
    @abstractmethod
    def create_storage(self) -> Storage:
        """Create Storage instance to test."""
        pass
    
    def setUp(self):
        """Set up test fixture."""
        self.storage = self.create_storage()
    
    def test_save_and_load(self):
        """Test basic save and load."""
        self.storage.save("key1", "value1")
        result = self.storage.load("key1")
        self.assertEqual(result, "value1")
    
    def test_exists_after_save(self):
        """Test exists returns True after save."""
        self.storage.save("key1", "value1")
        self.assertTrue(self.storage.exists("key1"))
    
    def test_exists_without_save(self):
        """Test exists returns False for non-existent key."""
        self.assertFalse(self.storage.exists("nonexistent"))
    
    def test_load_nonexistent_raises(self):
        """Test loading non-existent key raises KeyError."""
        with self.assertRaises(KeyError):
            self.storage.load("nonexistent")
    
    def test_overwrite_value(self):
        """Test overwriting existing value."""
        self.storage.save("key1", "value1")
        self.storage.save("key1", "value2")
        result = self.storage.load("key1")
        self.assertEqual(result, "value2")


# Concrete implementations
class MemoryStorage(Storage):
    """In-memory storage."""
    
    def __init__(self):
        self._data = {}
    
    def save(self, key: str, value: str) -> None:
        self._data[key] = value
    
    def load(self, key: str) -> str:
        if key not in self._data:
            raise KeyError(f"Key '{key}' not found")
        return self._data[key]
    
    def exists(self, key: str) -> bool:
        return key in self._data


class FileStorage(Storage):
    """File-based storage."""
    
    def __init__(self, directory: str):
        self.directory = directory
        self._data = {}  # Simplified for example
    
    def save(self, key: str, value: str) -> None:
        self._data[key] = value
    
    def load(self, key: str) -> str:
        if key not in self._data:
            raise KeyError(f"Key '{key}' not found")
        return self._data[key]
    
    def exists(self, key: str) -> bool:
        return key in self._data


# Test each implementation against contract
class TestMemoryStorage(StorageContractTests):
    """Test MemoryStorage against Storage contract."""
    
    def create_storage(self) -> Storage:
        return MemoryStorage()


class TestFileStorage(StorageContractTests):
    """Test FileStorage against Storage contract."""
    
    def create_storage(self) -> Storage:
        return FileStorage("/tmp/test")


# Run tests
if __name__ == '__main__':
    unittest.main()
```

## Parameterized Testing

Test all implementations with same test cases:

```python
import unittest
from typing import Callable, List

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass


class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius
    
    def area(self) -> float:
        return 3.14159 * self.radius ** 2


class Square(Shape):
    def __init__(self, side: float):
        self.side = side
    
    def area(self) -> float:
        return self.side ** 2


class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height
    
    def area(self) -> float:
        return self.width * self.height


# Parameterized test
class TestShapes(unittest.TestCase):
    """Test all Shape implementations."""
    
    def setUp(self):
        """Define shape factories and expected areas."""
        self.shape_tests = [
            {
                'name': 'Circle',
                'factory': lambda: Circle(5),
                'expected_area': 78.53975  # π * 5²
            },
            {
                'name': 'Square',
                'factory': lambda: Square(4),
                'expected_area': 16.0  # 4²
            },
            {
                'name': 'Rectangle',
                'factory': lambda: Rectangle(3, 5),
                'expected_area': 15.0  # 3 * 5
            }
        ]
    
    def test_all_shapes_area(self):
        """Test area calculation for all shapes."""
        for test in self.shape_tests:
            with self.subTest(shape=test['name']):
                shape = test['factory']()
                area = shape.area()
                self.assertAlmostEqual(
                    area,
                    test['expected_area'],
                    places=5,
                    msg=f"{test['name']} area calculation failed"
                )
    
    def test_all_shapes_positive_area(self):
        """Test all shapes have positive area."""
        for test in self.shape_tests:
            with self.subTest(shape=test['name']):
                shape = test['factory']()
                self.assertGreater(shape.area(), 0)
```

## Mocking and Test Doubles

### Mocks for External Dependencies

```python
from unittest.mock import Mock, MagicMock, patch
import unittest

class EmailSender(ABC):
    @abstractmethod
    def send(self, to: str, subject: str, body: str) -> bool:
        pass


class NotificationService:
    """Service using EmailSender."""
    
    def __init__(self, email_sender: EmailSender):
        self.email_sender = email_sender
    
    def notify_user(self, user_email: str, message: str) -> bool:
        """Send notification to user."""
        return self.email_sender.send(
            to=user_email,
            subject="Notification",
            body=message
        )


class TestNotificationService(unittest.TestCase):
    """Test NotificationService with mock."""
    
    def test_notify_user_sends_email(self):
        """Test notification sends email with correct parameters."""
        # Create mock EmailSender
        mock_sender = Mock(spec=EmailSender)
        mock_sender.send.return_value = True
        
        # Create service with mock
        service = NotificationService(mock_sender)
        
        # Call service
        result = service.notify_user("user@example.com", "Hello!")
        
        # Verify mock was called correctly
        mock_sender.send.assert_called_once_with(
            to="user@example.com",
            subject="Notification",
            body="Hello!"
        )
        self.assertTrue(result)
    
    def test_notify_handles_send_failure(self):
        """Test notification handles send failure."""
        mock_sender = Mock(spec=EmailSender)
        mock_sender.send.return_value = False
        
        service = NotificationService(mock_sender)
        result = service.notify_user("user@example.com", "Hello!")
        
        self.assertFalse(result)
```

### Fake Implementation for Testing

```python
class FakeEmailSender(EmailSender):
    """Fake email sender for testing."""
    
    def __init__(self):
        self.sent_emails = []
    
    def send(self, to: str, subject: str, body: str) -> bool:
        """Record email instead of sending."""
        self.sent_emails.append({
            'to': to,
            'subject': subject,
            'body': body
        })
        return True


class TestNotificationWithFake(unittest.TestCase):
    """Test with fake implementation."""
    
    def test_notify_records_email(self):
        """Test email is recorded by fake."""
        fake_sender = FakeEmailSender()
        service = NotificationService(fake_sender)
        
        service.notify_user("user@example.com", "Test message")
        
        self.assertEqual(len(fake_sender.sent_emails), 1)
        email = fake_sender.sent_emails[0]
        self.assertEqual(email['to'], "user@example.com")
        self.assertEqual(email['body'], "Test message")
```

## Testing Error Handling

```python
class DataProcessor(ABC):
    @abstractmethod
    def process(self, data: str) -> str:
        pass


class JSONProcessor(DataProcessor):
    def process(self, data: str) -> str:
        if not data:
            raise ValueError("Data cannot be empty")
        # Process JSON
        return f"Processed: {data}"


class TestDataProcessor(unittest.TestCase):
    """Test error handling in processors."""
    
    def test_empty_data_raises_error(self):
        """Test processing empty data raises ValueError."""
        processor = JSONProcessor()
        
        with self.assertRaises(ValueError) as context:
            processor.process("")
        
        self.assertIn("cannot be empty", str(context.exception))
    
    def test_valid_data_processes(self):
        """Test valid data processes successfully."""
        processor = JSONProcessor()
        result = processor.process("data")
        self.assertEqual(result, "Processed: data")
```

## Integration Testing

Test real implementations working together:

```python
class Repository(ABC):
    @abstractmethod
    def save(self, entity): pass
    
    @abstractmethod
    def find(self, id: str): pass


class UserService:
    """Service using repository."""
    
    def __init__(self, repository: Repository):
        self.repository = repository
    
    def create_user(self, id: str, name: str):
        user = {'id': id, 'name': name}
        self.repository.save(user)
        return user
    
    def get_user(self, id: str):
        return self.repository.find(id)


class InMemoryRepository(Repository):
    """Real in-memory repository."""
    
    def __init__(self):
        self._data = {}
    
    def save(self, entity):
        self._data[entity['id']] = entity
    
    def find(self, id: str):
        return self._data.get(id)


class TestUserServiceIntegration(unittest.TestCase):
    """Integration test with real repository."""
    
    def setUp(self):
        """Set up real dependencies."""
        self.repository = InMemoryRepository()
        self.service = UserService(self.repository)
    
    def test_create_and_retrieve_user(self):
        """Test complete user creation and retrieval flow."""
        # Create user
        user = self.service.create_user("1", "Alice")
        self.assertEqual(user['name'], "Alice")
        
        # Retrieve user
        retrieved = self.service.get_user("1")
        self.assertIsNotNone(retrieved)
        self.assertEqual(retrieved['name'], "Alice")
    
    def test_retrieve_nonexistent_user(self):
        """Test retrieving non-existent user returns None."""
        user = self.service.get_user("999")
        self.assertNone(user)
```

## Real-World Example: Payment System Testing

```python
from abc import ABC, abstractmethod
from typing import Dict, Optional
import unittest
from unittest.mock import Mock, patch

# Payment system interfaces
class PaymentGateway(ABC):
    """Payment gateway interface."""
    
    @abstractmethod
    def charge(self, amount: float, token: str) -> Dict:
        """Charge payment."""
        pass
    
    @abstractmethod
    def refund(self, transaction_id: str, amount: float) -> bool:
        """Refund payment."""
        pass


class TransactionLogger(ABC):
    """Transaction logger interface."""
    
    @abstractmethod
    def log(self, transaction: Dict) -> None:
        """Log transaction."""
        pass


# Service using polymorphism
class PaymentService:
    """Payment service."""
    
    def __init__(
        self,
        gateway: PaymentGateway,
        logger: TransactionLogger
    ):
        self.gateway = gateway
        self.logger = logger
    
    def process_payment(
        self,
        amount: float,
        token: str
    ) -> Optional[Dict]:
        """Process payment."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        
        try:
            result = self.gateway.charge(amount, token)
            self.logger.log(result)
            return result
        except Exception as e:
            self.logger.log({
                'status': 'error',
                'error': str(e)
            })
            return None


# Real implementations
class StripeGateway(PaymentGateway):
    """Stripe payment gateway."""
    
    def charge(self, amount: float, token: str) -> Dict:
        # Simulate Stripe API call
        return {
            'transaction_id': 'stripe_123',
            'amount': amount,
            'status': 'success'
        }
    
    def refund(self, transaction_id: str, amount: float) -> bool:
        return True


class FileLogger(TransactionLogger):
    """File transaction logger."""
    
    def __init__(self):
        self.logs = []
    
    def log(self, transaction: Dict) -> None:
        self.logs.append(transaction)


# Contract test for PaymentGateway
class PaymentGatewayContractTests(unittest.TestCase):
    """Contract tests for PaymentGateway implementations."""
    
    @abstractmethod
    def create_gateway(self) -> PaymentGateway:
        pass
    
    def setUp(self):
        self.gateway = self.create_gateway()
    
    def test_charge_returns_dict(self):
        """Test charge returns dictionary."""
        result = self.gateway.charge(100.0, "token_123")
        self.assertIsInstance(result, dict)
        self.assertIn('transaction_id', result)
        self.assertIn('status', result)
    
    def test_charge_positive_amount(self):
        """Test charging positive amount works."""
        result = self.gateway.charge(50.0, "token_123")
        self.assertEqual(result['status'], 'success')
    
    def test_refund_returns_bool(self):
        """Test refund returns boolean."""
        result = self.gateway.refund("trans_123", 50.0)
        self.assertIsInstance(result, bool)


class TestStripeGateway(PaymentGatewayContractTests):
    """Test Stripe gateway against contract."""
    
    def create_gateway(self) -> PaymentGateway:
        return StripeGateway()


# Unit tests with mocks
class TestPaymentServiceUnit(unittest.TestCase):
    """Unit tests for PaymentService."""
    
    def setUp(self):
        """Set up mocks."""
        self.mock_gateway = Mock(spec=PaymentGateway)
        self.mock_logger = Mock(spec=TransactionLogger)
        self.service = PaymentService(
            self.mock_gateway,
            self.mock_logger
        )
    
    def test_successful_payment_charges_gateway(self):
        """Test successful payment calls gateway."""
        self.mock_gateway.charge.return_value = {
            'transaction_id': 'test_123',
            'status': 'success'
        }
        
        result = self.service.process_payment(100.0, "token_123")
        
        self.mock_gateway.charge.assert_called_once_with(100.0, "token_123")
        self.assertIsNotNone(result)
        self.assertEqual(result['status'], 'success')
    
    def test_successful_payment_logs_transaction(self):
        """Test successful payment logs transaction."""
        transaction = {
            'transaction_id': 'test_123',
            'status': 'success'
        }
        self.mock_gateway.charge.return_value = transaction
        
        self.service.process_payment(100.0, "token_123")
        
        self.mock_logger.log.assert_called_once_with(transaction)
    
    def test_negative_amount_raises_error(self):
        """Test negative amount raises ValueError."""
        with self.assertRaises(ValueError) as context:
            self.service.process_payment(-10.0, "token_123")
        
        self.assertIn("positive", str(context.exception))
        self.mock_gateway.charge.assert_not_called()
    
    def test_gateway_error_logs_error(self):
        """Test gateway error is logged."""
        self.mock_gateway.charge.side_effect = Exception("Gateway error")
        
        result = self.service.process_payment(100.0, "token_123")
        
        self.assertIsNone(result)
        self.mock_logger.log.assert_called_once()
        call_args = self.mock_logger.log.call_args[0][0]
        self.assertEqual(call_args['status'], 'error')


# Integration tests with real objects
class TestPaymentServiceIntegration(unittest.TestCase):
    """Integration tests with real implementations."""
    
    def setUp(self):
        """Set up real dependencies."""
        self.gateway = StripeGateway()
        self.logger = FileLogger()
        self.service = PaymentService(self.gateway, self.logger)
    
    def test_end_to_end_payment_flow(self):
        """Test complete payment flow."""
        result = self.service.process_payment(100.0, "token_123")
        
        # Verify result
        self.assertIsNotNone(result)
        self.assertEqual(result['status'], 'success')
        self.assertEqual(result['amount'], 100.0)
        
        # Verify logging
        self.assertEqual(len(self.logger.logs), 1)
        self.assertEqual(self.logger.logs[0]['status'], 'success')


# Fake implementation for testing
class FakePaymentGateway(PaymentGateway):
    """Fake gateway for testing."""
    
    def __init__(self):
        self.charges = []
        self.refunds = []
        self.should_fail = False
    
    def charge(self, amount: float, token: str) -> Dict:
        if self.should_fail:
            raise Exception("Gateway failure")
        
        transaction = {
            'transaction_id': f'fake_{len(self.charges)}',
            'amount': amount,
            'token': token,
            'status': 'success'
        }
        self.charges.append(transaction)
        return transaction
    
    def refund(self, transaction_id: str, amount: float) -> bool:
        self.refunds.append({
            'transaction_id': transaction_id,
            'amount': amount
        })
        return True


class TestPaymentServiceWithFake(unittest.TestCase):
    """Test with fake gateway."""
    
    def test_fake_gateway_records_charges(self):
        """Test fake gateway records all charges."""
        fake_gateway = FakePaymentGateway()
        logger = FileLogger()
        service = PaymentService(fake_gateway, logger)
        
        # Process multiple payments
        service.process_payment(100.0, "token1")
        service.process_payment(50.0, "token2")
        
        # Verify fake recorded everything
        self.assertEqual(len(fake_gateway.charges), 2)
        self.assertEqual(fake_gateway.charges[0]['amount'], 100.0)
        self.assertEqual(fake_gateway.charges[1]['amount'], 50.0)
    
    def test_fake_gateway_can_simulate_failures(self):
        """Test fake can simulate failures."""
        fake_gateway = FakePaymentGateway()
        fake_gateway.should_fail = True
        logger = FileLogger()
        service = PaymentService(fake_gateway, logger)
        
        result = service.process_payment(100.0, "token1")
        
        self.assertIsNone(result)
        self.assertEqual(len(fake_gateway.charges), 0)
```

## Test Coverage

Measure test coverage:

```python
# Install coverage.py
# pip install coverage

# Run tests with coverage
# coverage run -m unittest test_module.py
# coverage report
# coverage html  # Generate HTML report
```

## Best Practices

### Practice 1: Test Interface Contract First

```python
# ✅ GOOD: Base contract test
class StorageContractTests(unittest.TestCase):
    @abstractmethod
    def create_storage(self) -> Storage:
        pass
    
    def test_contract(self):
        # Test contract requirements
        pass


# Each implementation tests contract
class TestFileStorage(StorageContractTests):
    def create_storage(self) -> Storage:
        return FileStorage()
```

### Practice 2: Use Parameterized Tests

```python
# ✅ GOOD: Test all implementations
self.implementations = [
    Circle(5),
    Square(5),
    Triangle(5, 5)
]

for shape in self.implementations:
    with self.subTest(shape=type(shape).__name__):
        self.assertGreater(shape.area(), 0)
```

### Practice 3: Mock External Dependencies

```python
# ✅ GOOD: Mock external API
mock_api = Mock(spec=PaymentAPI)
service = PaymentService(mock_api)

# ❌ BAD: Test with real external API
real_api = StripeAPI(api_key="...")
service = PaymentService(real_api)
```

## Summary

Testing polymorphic systems requires comprehensive strategies:

### Testing Strategies

1. **Contract Testing**: Base test class for interface requirements
2. **Parameterized Testing**: Same tests for all implementations
3. **Mock Objects**: Isolate units from dependencies
4. **Fake Objects**: Simplified but realistic implementations
5. **Integration Testing**: Test with real implementations

### Test Types

| Type | Purpose | Uses |
|------|---------|------|
| Contract | Verify interface requirements | Abstract base test |
| Unit | Test single class | Mocks, fakes |
| Integration | Test components together | Real objects |
| Parameterized | Test all implementations | subTest |

### Best Practices

- ✅ Test interface contract with base test class
- ✅ Use parameterized tests for all implementations
- ✅ Mock external dependencies
- ✅ Use fakes for complex dependencies
- ✅ Test error handling thoroughly
- ✅ Measure test coverage
- ✅ Test edge cases
- ❌ Don't test implementation details
- ❌ Don't skip integration tests

### Testing Checklist

- [ ] Contract tests for interface
- [ ] Tests for each concrete implementation
- [ ] Tests for error handling
- [ ] Tests with mocks
- [ ] Integration tests
- [ ] Edge case coverage
- [ ] 80%+ code coverage

In the final lesson, we'll complete a **Polymorphism Capstone Project** that integrates all concepts from this chapter into a comprehensive, real-world application.

