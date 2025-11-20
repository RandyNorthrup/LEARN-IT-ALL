---
id: 52-docstrings
title: Function Documentation with Docstrings
chapterId: ch6-functions
order: 8
duration: 25
objectives:
  - Write effective docstrings
  - Follow docstring conventions (PEP 257)
  - Document parameters and return values
  - Use different docstring styles
  - Generate documentation from docstrings
---

# Function Documentation with Docstrings

## Introduction

**Docstrings** (documentation strings) are strings that document what your functions do. Good docstrings make your code professional and maintainable.

## Basic Docstring Syntax

Use triple quotes right after the function definition:

```python
def greet(name):
    """Say hello to someone."""
    return f"Hello, {name}!"

print(greet("Alice"))  # Hello, Alice!
print(greet.__doc__)   # Say hello to someone.
```

## One-Line Docstrings

For simple functions:

```python
def square(x):
    """Return the square of x."""
    return x ** 2

def is_even(number):
    """Check if a number is even."""
    return number % 2 == 0

def get_full_name(first, last):
    """Combine first and last names."""
    return f"{first} {last}"
```

### One-Line Docstring Rules

- Use complete sentence with period
- Describe what the function **does**, not how
- Use imperative mood ("Return", not "Returns")

```python
# Good
def add(a, b):
    """Add two numbers and return the sum."""
    return a + b

# Bad
def add(a, b):
    """This function adds"""  # Incomplete
    return a + b

# Bad
def add(a, b):
    """Adds two numbers"""  # Missing period
    return a + b
```

## Multi-Line Docstrings

For complex functions, include more details:

```python
def calculate_area(width, height):
    """
    Calculate the area of a rectangle.
    
    Args:
        width: The width of the rectangle in meters.
        height: The height of the rectangle in meters.
    
    Returns:
        The area of the rectangle in square meters.
    
    Example:
        >>> calculate_area(5, 10)
        50
    """
    return width * height
```

### Multi-Line Docstring Structure

```python
def function_name(param1, param2):
    """
    Brief summary on one line.
    
    Detailed description that can span multiple lines
    explaining what the function does in more detail.
    
    Args:
        param1: Description of first parameter.
        param2: Description of second parameter.
    
    Returns:
        Description of return value.
    
    Raises:
        ValueError: When invalid input is provided.
    
    Example:
        >>> function_name(1, 2)
        3
    """
    pass
```

## Documenting Parameters

### Style 1: Google Style

```python
def send_email(recipient, subject, body, cc=None):
    """
    Send an email to a recipient.
    
    Args:
        recipient (str): Email address of the recipient.
        subject (str): Subject line of the email.
        body (str): Body content of the email.
        cc (list, optional): List of CC recipients. Defaults to None.
    
    Returns:
        bool: True if email sent successfully, False otherwise.
    """
    pass
```

### Style 2: NumPy Style

```python
def calculate_distance(x1, y1, x2, y2):
    """
    Calculate the Euclidean distance between two points.
    
    Parameters
    ----------
    x1 : float
        X-coordinate of first point.
    y1 : float
        Y-coordinate of first point.
    x2 : float
        X-coordinate of second point.
    y2 : float
        Y-coordinate of second point.
    
    Returns
    -------
    float
        The distance between the two points.
    """
    return ((x2 - x1)**2 + (y2 - y1)**2) ** 0.5
```

### Style 3: reStructuredText (Sphinx)

```python
def divide(a, b):
    """
    Divide two numbers.
    
    :param a: The dividend
    :type a: float
    :param b: The divisor
    :type b: float
    :return: The quotient
    :rtype: float
    :raises ZeroDivisionError: If b is zero
    """
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b
```

## Documenting Return Values

```python
def get_user_info(user_id):
    """
    Retrieve user information from database.
    
    Args:
        user_id (int): The ID of the user to retrieve.
    
    Returns:
        dict: A dictionary containing user information with keys:
            - 'name' (str): User's full name
            - 'email' (str): User's email address
            - 'age' (int): User's age
        Returns None if user not found.
    """
    pass

def process_data(data):
    """
    Process input data.
    
    Args:
        data (list): List of numbers to process.
    
    Returns:
        tuple: A tuple containing (min_value, max_value, average).
    """
    pass
```

## Documenting Exceptions

```python
def validate_age(age):
    """
    Validate that age is within acceptable range.
    
    Args:
        age (int): The age to validate.
    
    Returns:
        bool: True if age is valid.
    
    Raises:
        ValueError: If age is negative or greater than 150.
        TypeError: If age is not an integer.
    """
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0 or age > 150:
        raise ValueError("Age must be between 0 and 150")
    return True
```

## Including Examples

```python
def factorial(n):
    """
    Calculate the factorial of n.
    
    Args:
        n (int): A non-negative integer.
    
    Returns:
        int: The factorial of n.
    
    Examples:
        >>> factorial(0)
        1
        >>> factorial(5)
        120
        >>> factorial(10)
        3628800
    
    Notes:
        Factorial of n is: n! = n × (n-1) × (n-2) × ... × 1
        By definition, 0! = 1
    """
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

## Practical Examples

### Example 1: Complete Function Documentation

```python
def calculate_bmi(weight, height):
    """
    Calculate Body Mass Index (BMI).
    
    BMI is calculated using the formula: BMI = weight / (height^2)
    where weight is in kilograms and height is in meters.
    
    Args:
        weight (float): Weight in kilograms.
        height (float): Height in meters.
    
    Returns:
        float: The calculated BMI value.
    
    Raises:
        ValueError: If weight or height is negative or zero.
    
    Examples:
        >>> calculate_bmi(70, 1.75)
        22.857142857142858
        >>> calculate_bmi(80, 1.80)
        24.691358024691358
    
    Notes:
        BMI Categories:
        - Underweight: BMI < 18.5
        - Normal: 18.5 <= BMI < 25
        - Overweight: 25 <= BMI < 30
        - Obese: BMI >= 30
    """
    if weight <= 0 or height <= 0:
        raise ValueError("Weight and height must be positive")
    
    return weight / (height ** 2)
```

### Example 2: Class Method Documentation

```python
class BankAccount:
    """
    A simple bank account class.
    
    Attributes:
        account_number (str): The account number.
        balance (float): Current account balance.
    """
    
    def __init__(self, account_number, initial_balance=0):
        """
        Initialize a new bank account.
        
        Args:
            account_number (str): Unique account identifier.
            initial_balance (float, optional): Starting balance. Defaults to 0.
        """
        self.account_number = account_number
        self.balance = initial_balance
    
    def deposit(self, amount):
        """
        Deposit money into the account.
        
        Args:
            amount (float): Amount to deposit (must be positive).
        
        Returns:
            float: New balance after deposit.
        
        Raises:
            ValueError: If amount is negative or zero.
        """
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount
        return self.balance
```

### Example 3: API Function Documentation

```python
def fetch_user_data(user_id, include_posts=False, include_comments=False):
    """
    Fetch user data from the API.
    
    This function retrieves user information from the remote API.
    Additional data can be included using optional parameters.
    
    Args:
        user_id (int): The unique identifier of the user.
        include_posts (bool, optional): Whether to include user posts. 
            Defaults to False.
        include_comments (bool, optional): Whether to include user comments. 
            Defaults to False.
    
    Returns:
        dict: User data with the following structure:
            {
                'id': int,
                'name': str,
                'email': str,
                'posts': list (if include_posts=True),
                'comments': list (if include_comments=True)
            }
    
    Raises:
        ConnectionError: If unable to connect to API.
        ValueError: If user_id is invalid.
        KeyError: If user not found.
    
    Examples:
        >>> fetch_user_data(123)
        {'id': 123, 'name': 'Alice', 'email': 'alice@example.com'}
        
        >>> fetch_user_data(123, include_posts=True)
        {'id': 123, 'name': 'Alice', 'email': 'alice@example.com', 
         'posts': [...]}
    
    Notes:
        - API rate limit: 100 requests per minute
        - Requires valid API key in environment variable
    """
    pass
```

## Accessing Docstrings

```python
def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

# Access docstring
print(greet.__doc__)  # Return a greeting message.

# Use help() to see full documentation
help(greet)

# In interactive Python
# >>> help(greet)
# Help on function greet in module __main__:
# 
# greet(name)
#     Return a greeting message.
```

## Docstring Best Practices

```python
# 1. Always include docstrings for public functions
def public_function():
    """This is a public function."""
    pass

# 2. Private functions can have shorter docstrings
def _internal_helper():
    """Helper function for internal use."""
    pass

# 3. Document edge cases
def divide(a, b):
    """
    Divide a by b.
    
    Args:
        a: Numerator
        b: Denominator (cannot be zero)
    
    Returns:
        Result of division
    
    Raises:
        ZeroDivisionError: If b is zero
    """
    return a / b

# 4. Use present tense imperatives
def calculate():
    """Calculate the result."""  # Good
    # Not: "Calculates the result"
    pass

# 5. Keep it concise but complete
def add(a, b):
    """Add two numbers."""  # Simple and clear
    return a + b
```

## Type Hints with Docstrings

Modern Python combines type hints with docstrings:

```python
def greet(name: str, age: int) -> str:
    """
    Generate a greeting message.
    
    Args:
        name: Person's name
        age: Person's age
    
    Returns:
        Formatted greeting string
    """
    return f"Hello, {name}! You are {age} years old."
```

## Summary

- **Docstrings**: Document what functions do
- **Syntax**: Triple quotes after function definition
- **One-line**: Simple summary with period
- **Multi-line**: Summary + details + Args + Returns + Examples
- **Styles**: Google, NumPy, Sphinx (choose one, be consistent)
- **Access**: Use `__doc__` attribute or `help()` function
- **Best practices**: 
  - Always document public functions
  - Use imperative mood
  - Document parameters, return values, exceptions
  - Include examples for complex functions

## Next Steps

Next, you'll learn about recursive functions and how they work.
