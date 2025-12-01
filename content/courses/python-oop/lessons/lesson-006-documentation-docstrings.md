---
id: documentation-docstrings
title: Documentation and Docstrings
chapterId: ch1-clean-code
order: 6
duration: 15
objectives:
  - Learn how to write effective docstrings
  - Understand documentation best practices
  - Master Python documentation standards
---

# Documentation and Docstrings

**Documentation** explains how to use code. Good documentation saves time and prevents confusion. In Python, we use **docstrings** to document modules, classes, and functions.

## What Are Docstrings?

Docstrings are string literals that appear as the first statement in a module, class, or function.

```python
def calculate_total(price, quantity):
    """Calculate the total cost.
    
    Args:
        price: Unit price as float
        quantity: Number of items as int
        
    Returns:
        Total cost as float
    """
    return price * quantity
```

## PEP 257 Docstring Conventions

### One-Line Docstrings

For simple, obvious functions:

```python
def get_user_name():
    """Return the user's full name."""
    return f"{first_name} {last_name}"
```

### Multi-Line Docstrings

For complex functions:

```python
def process_payment(amount, card_number):
    """Process a credit card payment.
    
    This function validates the card, checks for sufficient funds,
    processes the charge, and sends a confirmation email.
    
    Args:
        amount: Payment amount in dollars (float)
        card_number: 16-digit card number (str)
        
    Returns:
        dict: Transaction result with keys 'success', 'transaction_id'
        
    Raises:
        ValueError: If amount is negative or card_number is invalid
        PaymentError: If payment processing fails
        
    Example:
        >>> process_payment(99.99, "4111111111111111")
        {'success': True, 'transaction_id': 'TXN12345'}
    """
    pass
```

## Class Docstrings

Document what the class represents:

```python
class ShoppingCart:
    """A shopping cart for an e-commerce system.
    
    The cart stores items and calculates totals including
    discounts and taxes.
    
    Attributes:
        items: List of CartItem objects
        discount_code: Optional discount code string
        
    Example:
        >>> cart = ShoppingCart()
        >>> cart.add_item("Laptop", 999.99)
        >>> cart.get_total()
        999.99
    """
    pass
```

## Module Docstrings

Describe the module's purpose:

```python
"""Email notification utilities.

This module provides functions for sending various types
of email notifications including welcome emails, password
resets, and order confirmations.

Functions:
    send_welcome_email: Send welcome email to new users
    send_password_reset: Send password reset instructions
    send_order_confirmation: Send order confirmation with details
"""
```

## When to Document

### Always Document

- Public APIs and interfaces
- Complex algorithms
- Non-obvious behavior
- Parameters and return values
- Exceptions that can be raised

### Don't Over-Document

```python
# ❌ Bad: Obvious docstring
def add(a, b):
    """Add two numbers together."""
    return a + b

# ✅ Good: Code is self-explanatory
def add(a, b):
    return a + b

# ✅ Good: Complex logic needs explanation
def calculate_compound_interest(principal, rate, years):
    """Calculate compound interest using the formula A = P(1 + r)^t.
    
    Args:
        principal: Initial investment amount
        rate: Annual interest rate (0.05 = 5%)
        years: Number of years
        
    Returns:
        Final amount after compound interest
    """
    return principal * (1 + rate) ** years
```

## Documentation Standards

### Google Style

```python
def send_email(to, subject, body):
    """Send an email message.
    
    Args:
        to (str): Recipient email address
        subject (str): Email subject line
        body (str): Email body content
        
    Returns:
        bool: True if email sent successfully
        
    Raises:
        SMTPError: If email server connection fails
    """
    pass
```

### NumPy/SciPy Style

```python
def calculate_statistics(data):
    """Calculate basic statistics for a dataset.
    
    Parameters
    ----------
    data : list of float
        The dataset to analyze
        
    Returns
    -------
    dict
        Dictionary containing 'mean', 'median', 'std_dev'
        
    Examples
    --------
    >>> calculate_statistics([1, 2, 3, 4, 5])
    {'mean': 3.0, 'median': 3.0, 'std_dev': 1.41}
    """
    pass
```

## Type Hints with Docstrings

Combine type hints and docstrings:

```python
def create_user(name: str, age: int, email: str) -> dict:
    """Create a new user account.
    
    Args:
        name: User's full name
        age: User's age in years
        email: User's email address
        
    Returns:
        Dictionary with user details and generated ID
        
    Raises:
        ValueError: If age is negative or email is invalid
    """
    pass
```

## Summary

Use **docstrings** to document modules, classes, and functions. Follow **PEP 257** conventions with one-line docstrings for simple code and multi-line for complex functions. Always document **public APIs, complex logic, and non-obvious behavior**. Include **parameters, return values, exceptions, and examples**. Don't over-document obvious code. Use type hints alongside docstrings for complete documentation.
