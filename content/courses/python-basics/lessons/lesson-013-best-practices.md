---
id: 13-best-practices
title: Python Development Best Practices
chapterId: ch1-intro
order: 13
duration: 30
objectives:
  - Learn professional development practices
  - Organize projects effectively
  - Write maintainable code
  - Use virtual environments
  - Implement documentation standards
---

# Python Development Best Practices

## Introduction

Professional Python development involves more than just writing code that works. This lesson covers practices that make your code maintainable, scalable, and professional.

## Project Structure

```python
# ✓ Good project structure:
my_project/
    README.md              # Project documentation
    requirements.txt       # Dependencies
    .gitignore            # Files to ignore in Git
    setup.py              # Package configuration
    
    src/                  # Source code
        __init__.py
        main.py
        utils.py
        config.py
    
    tests/                # Test files
        __init__.py
        test_main.py
        test_utils.py
    
    docs/                 # Documentation
        api.md
        guide.md
    
    data/                 # Data files
        sample.csv
    
    venv/                 # Virtual environment (not in Git)

# ✗ Poor structure:
my_project/
    script1.py
    script2.py
    test.py
    backup_old.py
    temp.py
    stuff.py
```

## Virtual Environments

```bash
# Why use virtual environments?
# - Isolate project dependencies
# - Different projects need different versions
# - Don't pollute global Python installation
# - Reproducible environments

# Create virtual environment
python -m venv venv

# Activate (Mac/Linux)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install packages
pip install requests numpy pandas

# Save dependencies
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt

# Deactivate
deactivate
```

## Requirements Management

```python
# requirements.txt - Pin exact versions for reproducibility
requests==2.28.1
numpy==1.23.5
pandas==1.5.2

# requirements-dev.txt - Development dependencies
pytest==7.2.0
black==22.10.0
pylint==2.15.5

# Install production requirements
# pip install -r requirements.txt

# Install dev requirements
# pip install -r requirements-dev.txt

# Alternative: pyproject.toml (modern approach)
# [tool.poetry.dependencies]
# python = "^3.9"
# requests = "^2.28.1"
```

## Code Organization

```python
# ✓ Good: Organized into modules

# config.py - Configuration
DEBUG = True
DATABASE_URL = "sqlite:///app.db"
MAX_RETRIES = 3

# utils.py - Utility functions
def format_currency(amount):
    """Format number as currency."""
    return f"${amount:,.2f}"

def validate_email(email):
    """Validate email format."""
    return "@" in email and "." in email.split("@")[1]

# main.py - Main application logic
from config import DEBUG, MAX_RETRIES
from utils import format_currency, validate_email

def main():
    """Main application entry point."""
    if DEBUG:
        print("Running in debug mode")
    
    total = 1234.56
    print(f"Total: {format_currency(total)}")

if __name__ == "__main__":
    main()

# ✗ Bad: Everything in one file
# - Hard to navigate
# - Difficult to test
# - Poor reusability
```

## Documentation

```python
# Module-level docstring
"""
User authentication module.

This module provides functions for user login,
registration, and password management.
"""

import hashlib
from typing import Optional

def hash_password(password: str) -> str:
    """
    Hash a password using SHA-256.
    
    Args:
        password: Plain text password to hash
        
    Returns:
        str: Hashed password as hexadecimal string
        
    Example:
        >>> hashed = hash_password("secret123")
        >>> len(hashed)
        64
    """
    return hashlib.sha256(password.encode()).hexdigest()


class UserAccount:
    """
    Represents a user account with authentication.
    
    Attributes:
        username: Unique username for the account
        email: User's email address
        _password_hash: Hashed password (private)
    """
    
    def __init__(self, username: str, email: str):
        """
        Initialize a new user account.
        
        Args:
            username: Unique identifier for user
            email: Contact email address
        """
        self.username = username
        self.email = email
        self._password_hash = None
    
    def set_password(self, password: str) -> None:
        """Set user password (stores hash only)."""
        self._password_hash = hash_password(password)
```

## Error Handling

```python
# ✓ Good: Specific exception handling
def divide_numbers(a, b):
    """Divide two numbers with error handling."""
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero")
        return None
    except TypeError:
        print("Error: Both arguments must be numbers")
        return None
    else:
        return result
    finally:
        print("Division operation completed")

# ✗ Bad: Catching all exceptions
def divide_numbers(a, b):
    try:
        return a / b
    except:  # DON'T DO THIS!
        return None  # Hides all errors

# ✓ Good: Custom exceptions
class ValidationError(Exception):
    """Raised when data validation fails."""
    pass

def validate_age(age):
    """Validate age is within reasonable range."""
    if not isinstance(age, int):
        raise ValidationError("Age must be an integer")
    if age < 0 or age > 150:
        raise ValidationError("Age must be between 0 and 150")
    return True
```

## Configuration Management

```python
# config.py - Centralized configuration
import os
from typing import Final

# Environment-based configuration
ENV: Final = os.getenv("ENVIRONMENT", "development")
DEBUG: Final = ENV == "development"

# Database
DATABASE_URL: Final = os.getenv(
    "DATABASE_URL",
    "sqlite:///app.db"
)

# API Keys (from environment variables)
API_KEY: Final = os.getenv("API_KEY")
if not API_KEY and ENV == "production":
    raise ValueError("API_KEY must be set in production")

# Constants
MAX_UPLOAD_SIZE: Final = 10 * 1024 * 1024  # 10 MB
ALLOWED_EXTENSIONS: Final = {"txt", "pdf", "png", "jpg"}

# Feature flags
ENABLE_CACHE: Final = True
ENABLE_ANALYTICS: Final = ENV == "production"

# Usage in other files
from config import DEBUG, DATABASE_URL, MAX_UPLOAD_SIZE

if DEBUG:
    print(f"Connecting to {DATABASE_URL}")
```

## Logging

```python
# ✓ Good: Use logging module
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log'
)

logger = logging.getLogger(__name__)

def process_data(data):
    """Process data with proper logging."""
    logger.info(f"Processing {len(data)} items")
    
    try:
        result = perform_complex_operation(data)
        logger.info("Processing completed successfully")
        return result
    except Exception as e:
        logger.error(f"Processing failed: {e}", exc_info=True)
        raise

# ✗ Bad: Using print statements
def process_data(data):
    print(f"Processing {len(data)} items")  # No timestamp, level, etc.
    # ...

# Logging levels
logger.debug("Detailed debugging information")
logger.info("General information")
logger.warning("Warning message")
logger.error("Error occurred")
logger.critical("Critical error")
```

## Type Hints

```python
# ✓ Good: Use type hints for clarity
from typing import List, Dict, Optional, Union

def calculate_average(numbers: List[float]) -> float:
    """Calculate average of numbers."""
    if not numbers:
        return 0.0
    return sum(numbers) / len(numbers)

def find_user(user_id: int) -> Optional[Dict[str, str]]:
    """Find user by ID, return None if not found."""
    # Implementation
    pass

def process_value(value: Union[int, float, str]) -> str:
    """Process value of multiple possible types."""
    return str(value)

# Type hints help:
# - IDE autocomplete
# - Static type checkers (mypy)
# - Documentation
# - Catching bugs early
```

## Testing

```python
# tests/test_utils.py
import pytest
from src.utils import calculate_average, validate_email

def test_calculate_average():
    """Test average calculation."""
    assert calculate_average([1, 2, 3, 4, 5]) == 3.0
    assert calculate_average([10, 20]) == 15.0
    assert calculate_average([]) == 0.0

def test_validate_email():
    """Test email validation."""
    assert validate_email("user@example.com") is True
    assert validate_email("invalid") is False
    assert validate_email("no@domain") is False

def test_calculate_average_negative():
    """Test with negative numbers."""
    assert calculate_average([-5, -10, -15]) == -10.0

# Run tests
# pytest tests/

# With coverage
# pytest --cov=src tests/
```

## Constants and Magic Numbers

```python
# ✗ Bad: Magic numbers
def calculate_tax(amount):
    return amount * 0.08  # What is 0.08?

def check_password(password):
    return len(password) >= 8  # Why 8?

# ✓ Good: Named constants
TAX_RATE = 0.08
MIN_PASSWORD_LENGTH = 8

def calculate_tax(amount):
    """Calculate tax using standard rate."""
    return amount * TAX_RATE

def check_password(password):
    """Validate password meets minimum length."""
    return len(password) >= MIN_PASSWORD_LENGTH
```

## Code Reusability

```python
# ✗ Bad: Repeated code
def calculate_circle_area(radius):
    return 3.14159 * radius * radius

def calculate_circle_circumference(radius):
    return 2 * 3.14159 * radius

def calculate_sphere_volume(radius):
    return (4/3) * 3.14159 * radius * radius * radius

# ✓ Good: DRY (Don't Repeat Yourself)
import math

PI = math.pi  # Use standard library

def calculate_circle_area(radius):
    """Calculate circle area."""
    return PI * radius ** 2

def calculate_circle_circumference(radius):
    """Calculate circle circumference."""
    return 2 * PI * radius

def calculate_sphere_volume(radius):
    """Calculate sphere volume."""
    return (4/3) * PI * radius ** 3
```

## README.md Template

```markdown
# Project Name

Brief description of what this project does.

## Installation

```bash
# Clone repository
git clone https://github.com/username/project.git
cd project

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Mac/Linux
# or
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

## Usage

```python
from myproject import main

# Example usage
result = main.process_data([1, 2, 3, 4, 5])
print(result)
```

## Running Tests

```bash
pytest tests/
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Write tests
5. Submit pull request

## License

MIT License
```

## Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature-add-user-auth

# 2. Make changes
# Edit files...

# 3. Run tests
pytest tests/

# 4. Run linter
pylint src/

# 5. Format code
black src/

# 6. Commit changes
git add .
git commit -m "Add user authentication feature"

# 7. Push to remote
git push origin feature-add-user-auth

# 8. Create pull request
# On GitHub/GitLab
```

## Summary

**Project Organization:**
- Clear directory structure
- Separate source, tests, docs
- Use virtual environments
- Track dependencies in requirements.txt

**Code Quality:**
- Follow PEP 8
- Use type hints
- Write docstrings
- Add tests
- Use linting tools

**Configuration:**
- Centralize settings
- Use environment variables
- Never commit secrets
- Feature flags for features

**Documentation:**
- README.md with setup instructions
- Docstrings for all public functions
- API documentation
- Usage examples

**Development Workflow:**
- Use version control
- Write tests first
- Run linter before commit
- Review code
- Use branches for features

**Tools:**
- pytest: Testing
- black: Formatting
- pylint: Linting
- mypy: Type checking
- sphinx: Documentation

## Next Steps

You've completed Chapter 1! Next, you'll dive deeper into Python variables and data types.
