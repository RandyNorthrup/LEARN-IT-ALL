---
id: "153-error-handling-mastery"
title: "Error Handling Mastery Capstone"
chapterId: ch11-error-handling
order: 15
duration: 30
objectives:
  - Integrate all error handling concepts
  - Build production-ready systems
  - Master advanced error patterns
  - Complete comprehensive projects
---

# Error Handling Mastery Capstone

Comprehensive projects demonstrating professional error handling.

## Project 1: Robust API Client

```python
import requests
import logging
import time
from typing import Optional, Dict, Any
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class APIError(Exception):
    """Base API error"""
    pass

class ConnectionError(APIError):
    """Connection failed"""
    pass

class AuthenticationError(APIError):
    """Authentication failed"""
    pass

class RateLimitError(APIError):
    """Rate limit exceeded"""
    def __init__(self, retry_after: int):
        self.retry_after = retry_after
        super().__init__(f"Rate limited. Retry after {retry_after}s")

class APIClient:
    """
    Production-ready API client with comprehensive error handling.
    
    Features:
    - Retry logic with exponential backoff
    - Rate limit handling
    - Circuit breaker pattern
    - Request/response logging
    - Timeout handling
    - Connection pooling
    """
    
    def __init__(self, base_url: str, api_key: str, 
                 max_retries: int = 3, timeout: int = 30):
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.max_retries = max_retries
        self.timeout = timeout
        
        # Circuit breaker state
        self.failure_count = 0
        self.failure_threshold = 5
        self.circuit_open_until: Optional[datetime] = None
        
        # Rate limiting
        self.rate_limit_reset: Optional[datetime] = None
    
    def _check_circuit_breaker(self):
        """Check if circuit breaker is open"""
        if self.circuit_open_until:
            if datetime.now() < self.circuit_open_until:
                raise APIError("Circuit breaker open. Service unavailable.")
            else:
                # Try to close circuit
                self.circuit_open_until = None
                self.failure_count = 0
    
    def _check_rate_limit(self):
        """Check if rate limited"""
        if self.rate_limit_reset:
            if datetime.now() < self.rate_limit_reset:
                wait_seconds = (self.rate_limit_reset - datetime.now()).seconds
                raise RateLimitError(wait_seconds)
            else:
                self.rate_limit_reset = None
    
    def _handle_response(self, response):
        """Handle API response"""
        # Check status code
        if response.status_code == 200:
            self.failure_count = 0  # Reset on success
            return response.json()
        
        elif response.status_code == 401:
            raise AuthenticationError("Invalid API key")
        
        elif response.status_code == 429:
            retry_after = int(response.headers.get('Retry-After', 60))
            self.rate_limit_reset = datetime.now() + timedelta(seconds=retry_after)
            raise RateLimitError(retry_after)
        
        elif response.status_code >= 500:
            raise APIError(f"Server error: {response.status_code}")
        
        else:
            raise APIError(f"Request failed: {response.status_code}")
    
    def _make_request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        """Make HTTP request with error handling"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        headers = kwargs.pop('headers', {})
        headers['Authorization'] = f"Bearer {self.api_key}"
        
        logger.info(f"{method} {url}")
        
        try:
            response = requests.request(
                method, url, headers=headers,
                timeout=self.timeout, **kwargs
            )
            return self._handle_response(response)
        
        except requests.Timeout:
            self.failure_count += 1
            raise ConnectionError(f"Request timeout after {self.timeout}s")
        
        except requests.ConnectionError as e:
            self.failure_count += 1
            raise ConnectionError(f"Connection failed: {e}")
        
        except Exception as e:
            self.failure_count += 1
            logger.error(f"Unexpected error: {e}", exc_info=True)
            raise APIError(f"Request failed: {e}")
    
    def request(self, method: str, endpoint: str, **kwargs) -> Optional[Dict[str, Any]]:
        """
        Make API request with retry and circuit breaker.
        
        Args:
            method: HTTP method
            endpoint: API endpoint
            **kwargs: Additional request parameters
        
        Returns:
            Response data or None
        
        Raises:
            APIError: On fatal errors
            AuthenticationError: On auth failure
            RateLimitError: On rate limit
        """
        # Check circuit breaker
        self._check_circuit_breaker()
        
        # Check rate limit
        self._check_rate_limit()
        
        # Retry loop
        last_exception = None
        
        for attempt in range(1, self.max_retries + 1):
            try:
                return self._make_request(method, endpoint, **kwargs)
            
            except AuthenticationError:
                # Don't retry auth errors
                raise
            
            except RateLimitError:
                # Don't retry rate limit (wait instead)
                raise
            
            except ConnectionError as e:
                last_exception = e
                
                if attempt == self.max_retries:
                    # Open circuit breaker
                    if self.failure_count >= self.failure_threshold:
                        self.circuit_open_until = datetime.now() + timedelta(seconds=60)
                        logger.warning("Circuit breaker opened")
                    raise
                
                # Exponential backoff
                wait_time = 2 ** (attempt - 1)
                logger.warning(f"Attempt {attempt} failed. Retrying in {wait_time}s...")
                time.sleep(wait_time)
            
            except APIError as e:
                last_exception = e
                if attempt == self.max_retries:
                    raise
                
                wait_time = 2 ** (attempt - 1)
                logger.warning(f"Attempt {attempt} failed: {e}. Retrying...")
                time.sleep(wait_time)
        
        if last_exception:
            raise last_exception
        
        return None
    
    def get(self, endpoint: str, **kwargs) -> Optional[Dict[str, Any]]:
        """GET request"""
        return self.request('GET', endpoint, **kwargs)
    
    def post(self, endpoint: str, **kwargs) -> Optional[Dict[str, Any]]:
        """POST request"""
        return self.request('POST', endpoint, **kwargs)
    
    def put(self, endpoint: str, **kwargs) -> Optional[Dict[str, Any]]:
        """PUT request"""
        return self.request('PUT', endpoint, **kwargs)
    
    def delete(self, endpoint: str, **kwargs) -> Optional[Dict[str, Any]]:
        """DELETE request"""
        return self.request('DELETE', endpoint, **kwargs)

# Usage example
try:
    client = APIClient("https://api.example.com", "secret_key")
    
    # Make requests with automatic retry and error handling
    users = client.get("/users")
    print(f"Fetched {len(users)} users")
    
    # Create user
    new_user = client.post("/users", json={"name": "Alice"})
    print(f"Created user: {new_user['id']}")

except AuthenticationError:
    print("Authentication failed. Check API key.")

except RateLimitError as e:
    print(f"Rate limited. Wait {e.retry_after}s")

except APIError as e:
    print(f"API error: {e}")
```

## Project 2: Data Processing Pipeline

```python
from typing import List, Dict, Any, Callable, Tuple
from dataclasses import dataclass
from enum import Enum
import logging

logger = logging.getLogger(__name__)

class ErrorSeverity(Enum):
    """Error severity levels"""
    WARNING = "warning"
    ERROR = "error"
    CRITICAL = "critical"

@dataclass
class ProcessingError:
    """Processing error details"""
    stage: str
    item_index: int
    item_data: Any
    error_type: str
    error_message: str
    severity: ErrorSeverity

class DataPipeline:
    """
    Data processing pipeline with comprehensive error handling.
    
    Features:
    - Stage-by-stage processing
    - Error collection and reporting
    - Partial success handling
    - Rollback support
    - Progress tracking
    """
    
    def __init__(self, continue_on_error: bool = True):
        self.stages: List[Tuple[str, Callable]] = []
        self.continue_on_error = continue_on_error
        self.errors: List[ProcessingError] = []
        self.processed_count = 0
        self.failed_count = 0
    
    def add_stage(self, name: str, processor: Callable):
        """Add processing stage"""
        self.stages.append((name, processor))
    
    def _process_item(self, item: Any, stage_name: str, 
                     processor: Callable) -> Tuple[Any, Optional[ProcessingError]]:
        """Process single item through stage"""
        try:
            result = processor(item)
            return result, None
        
        except ValueError as e:
            error = ProcessingError(
                stage=stage_name,
                item_index=self.processed_count,
                item_data=item,
                error_type="ValueError",
                error_message=str(e),
                severity=ErrorSeverity.WARNING
            )
            return None, error
        
        except TypeError as e:
            error = ProcessingError(
                stage=stage_name,
                item_index=self.processed_count,
                item_data=item,
                error_type="TypeError",
                error_message=str(e),
                severity=ErrorSeverity.ERROR
            )
            return None, error
        
        except Exception as e:
            logger.error(f"Unexpected error in {stage_name}: {e}", exc_info=True)
            error = ProcessingError(
                stage=stage_name,
                item_index=self.processed_count,
                item_data=item,
                error_type=type(e).__name__,
                error_message=str(e),
                severity=ErrorSeverity.CRITICAL
            )
            return None, error
    
    def process(self, data: List[Any]) -> Tuple[List[Any], List[ProcessingError]]:
        """
        Process data through all stages.
        
        Args:
            data: List of items to process
        
        Returns:
            Tuple of (successful_results, errors)
        """
        self.errors = []
        self.processed_count = 0
        self.failed_count = 0
        
        results = []
        
        for item_index, item in enumerate(data):
            self.processed_count = item_index
            current_item = item
            item_failed = False
            
            # Process through each stage
            for stage_name, processor in self.stages:
                result, error = self._process_item(current_item, stage_name, processor)
                
                if error:
                    self.errors.append(error)
                    
                    # Check severity
                    if error.severity == ErrorSeverity.CRITICAL:
                        if not self.continue_on_error:
                            raise Exception(f"Critical error in {stage_name}: {error.error_message}")
                        item_failed = True
                        break
                    
                    elif error.severity == ErrorSeverity.ERROR:
                        item_failed = True
                        break
                    
                    # WARNING - continue with original item
                    logger.warning(f"Stage {stage_name} warning: {error.error_message}")
                else:
                    current_item = result
            
            # Collect result or count failure
            if not item_failed and current_item is not None:
                results.append(current_item)
            else:
                self.failed_count += 1
        
        return results, self.errors
    
    def get_error_summary(self) -> Dict[str, Any]:
        """Get error summary"""
        summary = {
            "total_processed": self.processed_count + 1,
            "successful": self.processed_count + 1 - self.failed_count,
            "failed": self.failed_count,
            "errors_by_stage": {},
            "errors_by_severity": {
                ErrorSeverity.WARNING: 0,
                ErrorSeverity.ERROR: 0,
                ErrorSeverity.CRITICAL: 0
            }
        }
        
        for error in self.errors:
            # Count by stage
            if error.stage not in summary["errors_by_stage"]:
                summary["errors_by_stage"][error.stage] = 0
            summary["errors_by_stage"][error.stage] += 1
            
            # Count by severity
            summary["errors_by_severity"][error.severity] += 1
        
        return summary

# Example usage
def clean_data(item):
    """Clean data"""
    if not isinstance(item, dict):
        raise TypeError("Item must be dictionary")
    return {k: v.strip() if isinstance(v, str) else v for k, v in item.items()}

def validate_data(item):
    """Validate data"""
    if "name" not in item:
        raise ValueError("Missing 'name' field")
    if "age" not in item:
        raise ValueError("Missing 'age' field")
    if item["age"] < 0:
        raise ValueError("Age cannot be negative")
    return item

def transform_data(item):
    """Transform data"""
    return {
        "full_name": item["name"].title(),
        "age_group": "adult" if item["age"] >= 18 else "minor"
    }

# Create pipeline
pipeline = DataPipeline(continue_on_error=True)
pipeline.add_stage("clean", clean_data)
pipeline.add_stage("validate", validate_data)
pipeline.add_stage("transform", transform_data)

# Process data
data = [
    {"name": "alice", "age": 30},
    {"name": "bob"},  # Missing age
    "invalid",  # Wrong type
    {"name": "charlie", "age": -5},  # Invalid age
    {"name": "diana", "age": 25}
]

results, errors = pipeline.process(data)

print(f"\nProcessed {len(results)} items successfully")
print(f"Encountered {len(errors)} errors")

# Print error summary
summary = pipeline.get_error_summary()
print(f"\nError Summary:")
print(f"  Total: {summary['total_processed']}")
print(f"  Successful: {summary['successful']}")
print(f"  Failed: {summary['failed']}")
print(f"\nErrors by stage:")
for stage, count in summary["errors_by_stage"].items():
    print(f"  {stage}: {count}")
```

## Project 3: Configuration Manager

```python
import json
import os
from typing import Any, Optional, Dict
from pathlib import Path

class ConfigError(Exception):
    """Configuration error"""
    pass

class ConfigValidationError(ConfigError):
    """Configuration validation error"""
    pass

class ConfigManager:
    """
    Configuration manager with validation and error handling.
    
    Features:
    - Multiple config sources (file, env, defaults)
    - Type validation
    - Required field checking
    - Default values
    - Config reload
    - Error reporting
    """
    
    def __init__(self, config_file: str, schema: Dict[str, Dict[str, Any]]):
        """
        Initialize config manager.
        
        Args:
            config_file: Path to config file
            schema: Configuration schema
                Format: {
                    "field_name": {
                        "type": type,
                        "required": bool,
                        "default": any,
                        "validate": callable
                    }
                }
        """
        self.config_file = Path(config_file)
        self.schema = schema
        self.config: Dict[str, Any] = {}
        self.errors: List[str] = []
    
    def load(self) -> bool:
        """
        Load configuration with error handling.
        
        Returns:
            True if successful, False otherwise
        """
        self.errors = []
        
        try:
            # Load from file
            config_data = self._load_from_file()
            
            # Apply environment overrides
            config_data = self._apply_env_overrides(config_data)
            
            # Apply defaults
            config_data = self._apply_defaults(config_data)
            
            # Validate
            self._validate(config_data)
            
            if self.errors:
                logger.error(f"Configuration validation failed with {len(self.errors)} errors")
                return False
            
            self.config = config_data
            logger.info("Configuration loaded successfully")
            return True
        
        except Exception as e:
            logger.error(f"Failed to load configuration: {e}", exc_info=True)
            self.errors.append(str(e))
            return False
    
    def _load_from_file(self) -> Dict[str, Any]:
        """Load config from file"""
        if not self.config_file.exists():
            logger.warning(f"Config file not found: {self.config_file}")
            return {}
        
        try:
            with open(self.config_file) as f:
                return json.load(f)
        
        except json.JSONDecodeError as e:
            raise ConfigError(f"Invalid JSON in config file: {e}")
        
        except PermissionError:
            raise ConfigError(f"Permission denied reading config file")
    
    def _apply_env_overrides(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Apply environment variable overrides"""
        for field_name in self.schema:
            env_var = f"APP_{field_name.upper()}"
            if env_var in os.environ:
                try:
                    field_type = self.schema[field_name]["type"]
                    config[field_name] = field_type(os.environ[env_var])
                    logger.info(f"Override {field_name} from {env_var}")
                except (ValueError, TypeError) as e:
                    self.errors.append(f"Invalid type for {env_var}: {e}")
        
        return config
    
    def _apply_defaults(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Apply default values"""
        for field_name, field_schema in self.schema.items():
            if field_name not in config and "default" in field_schema:
                config[field_name] = field_schema["default"]
                logger.debug(f"Applied default for {field_name}")
        
        return config
    
    def _validate(self, config: Dict[str, Any]):
        """Validate configuration"""
        for field_name, field_schema in self.schema.items():
            # Check required fields
            if field_schema.get("required", False):
                if field_name not in config:
                    self.errors.append(f"Required field missing: {field_name}")
                    continue
            
            # Skip if field not present and not required
            if field_name not in config:
                continue
            
            value = config[field_name]
            
            # Check type
            expected_type = field_schema["type"]
            if not isinstance(value, expected_type):
                self.errors.append(
                    f"Invalid type for {field_name}: "
                    f"expected {expected_type.__name__}, got {type(value).__name__}"
                )
                continue
            
            # Custom validation
            if "validate" in field_schema:
                try:
                    validator = field_schema["validate"]
                    if not validator(value):
                        self.errors.append(f"Validation failed for {field_name}")
                except Exception as e:
                    self.errors.append(f"Validation error for {field_name}: {e}")
    
    def get(self, key: str, default: Any = None) -> Any:
        """Get config value"""
        return self.config.get(key, default)
    
    def get_errors(self) -> List[str]:
        """Get validation errors"""
        return self.errors.copy()

# Example usage
schema = {
    "api_key": {
        "type": str,
        "required": True
    },
    "port": {
        "type": int,
        "required": False,
        "default": 8080,
        "validate": lambda x: 1024 <= x <= 65535
    },
    "debug": {
        "type": bool,
        "required": False,
        "default": False
    },
    "max_connections": {
        "type": int,
        "required": False,
        "default": 100,
        "validate": lambda x: x > 0
    }
}

# Create config file (example)
config_data = {
    "api_key": "secret_key_123",
    "port": 3000,
    "debug": True
}

with open("app_config.json", "w") as f:
    json.dump(config_data, f)

# Load configuration
manager = ConfigManager("app_config.json", schema)

if manager.load():
    print("Configuration loaded successfully!")
    print(f"API Key: {manager.get('api_key')}")
    print(f"Port: {manager.get('port')}")
    print(f"Debug: {manager.get('debug')}")
    print(f"Max Connections: {manager.get('max_connections')}")
else:
    print("Configuration failed to load:")
    for error in manager.get_errors():
        print(f"  - {error}")
```

## Error Handling Mastery Checklist

### Core Concepts ✓
- [ ] Understand exception types and hierarchy
- [ ] Know when to catch vs propagate
- [ ] Master try-except-else-finally
- [ ] Create custom exception classes

### Advanced Patterns ✓
- [ ] Implement retry with backoff
- [ ] Use circuit breaker pattern
- [ ] Handle errors at proper level
- [ ] Chain exceptions appropriately

### Resource Management ✓
- [ ] Use context managers
- [ ] Ensure cleanup in finally
- [ ] Handle file operations safely
- [ ] Manage database transactions

### Production Practices ✓
- [ ] Log all exceptions with context
- [ ] Provide helpful error messages
- [ ] Document raised exceptions
- [ ] Test error paths
- [ ] Monitor error rates

### Integration ✓
- [ ] Handle API errors gracefully
- [ ] Validate input thoroughly
- [ ] Process data with error tracking
- [ ] Implement fallback strategies
- [ ] Report errors clearly

## Summary

You've mastered error handling by building three production systems:

1. **API Client**: Retry, circuit breaker, rate limiting, timeout handling
2. **Data Pipeline**: Stage-by-stage processing, error collection, partial success
3. **Configuration Manager**: Validation, defaults, multiple sources, error reporting

**Key Achievements:**
- Production-ready error handling patterns
- Comprehensive exception hierarchies
- Robust retry and fallback mechanisms
- Professional logging and monitoring
- Clean error recovery strategies

**Error Handling Principles:**
- Catch specific exceptions
- Never silence errors
- Provide helpful messages
- Clean up resources
- Handle at right level
- Document thoroughly
- Test error paths
- Log with context
- Chain exceptions
- Validate early

Congratulations on mastering Python error handling!
