---
id: lesson-152-error-handling-mastery
title: "Error Handling Mastery Capstone"
chapterId: ch11-error-handling
order: 13
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
import logging
import time
from typing import Optional, Dict, Any
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)


def create_api_client(base_url: str, api_key: str,
                      max_retries: int = 3, timeout: int = 30):
    """
    Create a production-ready API client with comprehensive error handling.
    
    Features:
    - Retry logic with exponential backoff
    - Rate limit handling
    - Circuit breaker pattern
    - Request/response logging
    - Timeout handling
    """
    return {
        "base_url": base_url.rstrip('/'),
        "api_key": api_key,
        "max_retries": max_retries,
        "timeout": timeout,
        "failure_count": 0,
        "failure_threshold": 5,
        "circuit_open_until": None,
        "rate_limit_reset": None,
    }


def _check_circuit_breaker(client):
    """Check if circuit breaker is open"""
    if client["circuit_open_until"]:
        if datetime.now() < client["circuit_open_until"]:
            raise RuntimeError("Circuit breaker open. Service unavailable.")
        else:
            client["circuit_open_until"] = None
            client["failure_count"] = 0


def _check_rate_limit(client):
    """Check if rate limited"""
    if client["rate_limit_reset"]:
        if datetime.now() < client["rate_limit_reset"]:
            wait_seconds = (client["rate_limit_reset"] - datetime.now()).seconds
            raise RuntimeError(f"Rate limited. Retry after {wait_seconds}s")
        else:
            client["rate_limit_reset"] = None


def _handle_response(client, response):
    """Handle API response"""
    if response.status_code == 200:
        client["failure_count"] = 0
        return response.json()
    elif response.status_code == 401:
        raise PermissionError("Invalid API key")
    elif response.status_code == 429:
        retry_after = int(response.headers.get('Retry-After', 60))
        client["rate_limit_reset"] = datetime.now() + timedelta(seconds=retry_after)
        raise RuntimeError(f"Rate limited. Retry after {retry_after}s")
    elif response.status_code >= 500:
        raise RuntimeError(f"Server error: {response.status_code}")
    else:
        raise RuntimeError(f"Request failed: {response.status_code}")


def _make_request(client, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
    """Make HTTP request with error handling"""
    import requests

    url = f"{client['base_url']}/{endpoint.lstrip('/')}"
    headers = kwargs.pop('headers', {})
    headers['Authorization'] = f"Bearer {client['api_key']}"

    logger.info(f"{method} {url}")

    try:
        response = requests.request(
            method, url, headers=headers,
            timeout=client["timeout"], **kwargs
        )
        return _handle_response(client, response)
    except requests.Timeout:
        client["failure_count"] += 1
        raise ConnectionError(f"Request timeout after {client['timeout']}s")
    except requests.ConnectionError as e:
        client["failure_count"] += 1
        raise ConnectionError(f"Connection failed: {e}")
    except (PermissionError, RuntimeError):
        raise
    except Exception as e:
        client["failure_count"] += 1
        logger.error(f"Unexpected error: {e}", exc_info=True)
        raise RuntimeError(f"Request failed: {e}")


def api_request(client, method: str, endpoint: str,
                **kwargs) -> Optional[Dict[str, Any]]:
    """
    Make API request with retry and circuit breaker.
    
    Args:
        client: API client dict
        method: HTTP method
        endpoint: API endpoint
        **kwargs: Additional request parameters
    
    Returns:
        Response data or None
    
    Raises:
        RuntimeError: On fatal errors
        PermissionError: On auth failure
    """
    _check_circuit_breaker(client)
    _check_rate_limit(client)

    last_exception = None

    for attempt in range(1, client["max_retries"] + 1):
        try:
            return _make_request(client, method, endpoint, **kwargs)
        except PermissionError:
            raise
        except ConnectionError as e:
            last_exception = e
            if attempt == client["max_retries"]:
                if client["failure_count"] >= client["failure_threshold"]:
                    client["circuit_open_until"] = (
                        datetime.now() + timedelta(seconds=60)
                    )
                    logger.warning("Circuit breaker opened")
                raise
            wait_time = 2 ** (attempt - 1)
            logger.warning(f"Attempt {attempt} failed. Retrying in {wait_time}s...")
            time.sleep(wait_time)
        except RuntimeError as e:
            last_exception = e
            if attempt == client["max_retries"]:
                raise
            wait_time = 2 ** (attempt - 1)
            logger.warning(f"Attempt {attempt} failed: {e}. Retrying...")
            time.sleep(wait_time)

    if last_exception:
        raise last_exception
    return None


def api_get(client, endpoint: str, **kwargs):
    """GET request"""
    return api_request(client, 'GET', endpoint, **kwargs)


def api_post(client, endpoint: str, **kwargs):
    """POST request"""
    return api_request(client, 'POST', endpoint, **kwargs)


def api_put(client, endpoint: str, **kwargs):
    """PUT request"""
    return api_request(client, 'PUT', endpoint, **kwargs)


def api_delete(client, endpoint: str, **kwargs):
    """DELETE request"""
    return api_request(client, 'DELETE', endpoint, **kwargs)


# Usage example
try:
    client = create_api_client("https://api.example.com", "secret_key")
    
    # Make requests with automatic retry and error handling
    users = api_get(client, "/users")
    print(f"Fetched {len(users)} users")
    
    # Create user
    new_user = api_post(client, "/users", json={"name": "Alice"})
    print(f"Created user: {new_user['id']}")

except PermissionError:
    print("Authentication failed. Check API key.")

except RuntimeError as e:
    if "Rate limited" in str(e):
        print(f"Rate limited. Please wait and retry.")
    else:
        print(f"API error: {e}")
```

## Project 2: Data Processing Pipeline

```python
from typing import List, Dict, Any, Callable, Tuple
from collections import namedtuple
import logging

logger = logging.getLogger(__name__)

# Error severity levels (string constants)
SEVERITY_WARNING = "warning"
SEVERITY_ERROR = "error"
SEVERITY_CRITICAL = "critical"

# Processing error info (namedtuple)
ProcessingError = namedtuple('ProcessingError', [
    'stage', 'item_index', 'item_data', 'error_type', 'error_message', 'severity'
])


def create_pipeline(continue_on_error=True):
    """
    Create a data processing pipeline with comprehensive error handling.
    
    Features:
    - Stage-by-stage processing
    - Error collection and reporting
    - Partial success handling
    - Progress tracking
    """
    return {
        "stages": [],
        "continue_on_error": continue_on_error,
        "errors": [],
        "processed_count": 0,
        "failed_count": 0,
    }


def add_stage(pipeline, name, processor):
    """Add processing stage to pipeline"""
    pipeline["stages"].append((name, processor))


def _process_item(pipeline, item, stage_name, processor):
    """Process single item through a stage"""
    try:
        result = processor(item)
        return result, None
    except ValueError as e:
        error = ProcessingError(
            stage=stage_name,
            item_index=pipeline["processed_count"],
            item_data=item,
            error_type="ValueError",
            error_message=str(e),
            severity=SEVERITY_WARNING,
        )
        return None, error
    except TypeError as e:
        error = ProcessingError(
            stage=stage_name,
            item_index=pipeline["processed_count"],
            item_data=item,
            error_type="TypeError",
            error_message=str(e),
            severity=SEVERITY_ERROR,
        )
        return None, error
    except Exception as e:
        logger.error(f"Unexpected error in {stage_name}: {e}", exc_info=True)
        error = ProcessingError(
            stage=stage_name,
            item_index=pipeline["processed_count"],
            item_data=item,
            error_type=type(e).__name__,
            error_message=str(e),
            severity=SEVERITY_CRITICAL,
        )
        return None, error


def process_pipeline(pipeline, data):
    """
    Process data through all stages.
    
    Args:
        data: List of items to process
    
    Returns:
        Tuple of (successful_results, errors)
    """
    pipeline["errors"] = []
    pipeline["processed_count"] = 0
    pipeline["failed_count"] = 0

    results = []

    for item_index, item in enumerate(data):
        pipeline["processed_count"] = item_index
        current_item = item
        item_failed = False

        for stage_name, processor in pipeline["stages"]:
            result, error = _process_item(
                pipeline, current_item, stage_name, processor
            )

            if error:
                pipeline["errors"].append(error)

                if error.severity == SEVERITY_CRITICAL:
                    if not pipeline["continue_on_error"]:
                        raise RuntimeError(
                            f"Critical error in {stage_name}: {error.error_message}"
                        )
                    item_failed = True
                    break
                elif error.severity == SEVERITY_ERROR:
                    item_failed = True
                    break

                logger.warning(
                    f"Stage {stage_name} warning: {error.error_message}"
                )
            else:
                current_item = result

        if not item_failed and current_item is not None:
            results.append(current_item)
        else:
            pipeline["failed_count"] += 1

    return results, pipeline["errors"]


def get_error_summary(pipeline):
    """Get error summary from pipeline"""
    summary = {
        "total_processed": pipeline["processed_count"] + 1,
        "successful": pipeline["processed_count"] + 1 - pipeline["failed_count"],
        "failed": pipeline["failed_count"],
        "errors_by_stage": {},
        "errors_by_severity": {
            SEVERITY_WARNING: 0,
            SEVERITY_ERROR: 0,
            SEVERITY_CRITICAL: 0,
        },
    }

    for error in pipeline["errors"]:
        if error.stage not in summary["errors_by_stage"]:
            summary["errors_by_stage"][error.stage] = 0
        summary["errors_by_stage"][error.stage] += 1
        summary["errors_by_severity"][error.severity] += 1

    return summary


# Example stage functions
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
pipeline = create_pipeline(continue_on_error=True)
add_stage(pipeline, "clean", clean_data)
add_stage(pipeline, "validate", validate_data)
add_stage(pipeline, "transform", transform_data)

# Process data
data = [
    {"name": "alice", "age": 30},
    {"name": "bob"},  # Missing age
    "invalid",  # Wrong type
    {"name": "charlie", "age": -5},  # Invalid age
    {"name": "diana", "age": 25}
]

results, errors = process_pipeline(pipeline, data)

print(f"\nProcessed {len(results)} items successfully")
print(f"Encountered {len(errors)} errors")

# Print error summary
summary = get_error_summary(pipeline)
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
from typing import Any, Optional, Dict, List
from pathlib import Path
import logging

logger = logging.getLogger(__name__)


def create_config_manager(config_file, schema):
    """
    Create a configuration manager with validation and error handling.
    
    Features:
    - Multiple config sources (file, env, defaults)
    - Type validation
    - Required field checking
    - Default values
    - Error reporting
    
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
    return {
        "config_file": Path(config_file),
        "schema": schema,
        "config": {},
        "errors": [],
    }


def load_config(manager):
    """
    Load configuration with error handling.
    
    Returns:
        True if successful, False otherwise
    """
    manager["errors"] = []

    try:
        config_data = _load_from_file(manager)
        config_data = _apply_env_overrides(manager, config_data)
        config_data = _apply_defaults(manager, config_data)
        _validate_config(manager, config_data)

        if manager["errors"]:
            logger.error(
                f"Configuration validation failed with "
                f"{len(manager['errors'])} errors"
            )
            return False

        manager["config"] = config_data
        logger.info("Configuration loaded successfully")
        return True

    except Exception as e:
        logger.error(f"Failed to load configuration: {e}", exc_info=True)
        manager["errors"].append(str(e))
        return False


def _load_from_file(manager):
    """Load config from file"""
    config_file = manager["config_file"]
    if not config_file.exists():
        logger.warning(f"Config file not found: {config_file}")
        return {}

    try:
        with open(config_file) as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Invalid JSON in config file: {e}")
    except PermissionError:
        raise RuntimeError("Permission denied reading config file")


def _apply_env_overrides(manager, config):
    """Apply environment variable overrides"""
    for field_name in manager["schema"]:
        env_var = f"APP_{field_name.upper()}"
        if env_var in os.environ:
            try:
                field_type = manager["schema"][field_name]["type"]
                config[field_name] = field_type(os.environ[env_var])
                logger.info(f"Override {field_name} from {env_var}")
            except (ValueError, TypeError) as e:
                manager["errors"].append(f"Invalid type for {env_var}: {e}")
    return config


def _apply_defaults(manager, config):
    """Apply default values"""
    for field_name, field_schema in manager["schema"].items():
        if field_name not in config and "default" in field_schema:
            config[field_name] = field_schema["default"]
            logger.debug(f"Applied default for {field_name}")
    return config


def _validate_config(manager, config):
    """Validate configuration"""
    for field_name, field_schema in manager["schema"].items():
        # Check required fields
        if field_schema.get("required", False):
            if field_name not in config:
                manager["errors"].append(f"Required field missing: {field_name}")
                continue

        # Skip if field not present and not required
        if field_name not in config:
            continue

        value = config[field_name]

        # Check type
        expected_type = field_schema["type"]
        if not isinstance(value, expected_type):
            manager["errors"].append(
                f"Invalid type for {field_name}: "
                f"expected {expected_type.__name__}, got {type(value).__name__}"
            )
            continue

        # Custom validation
        if "validate" in field_schema:
            try:
                validator = field_schema["validate"]
                if not validator(value):
                    manager["errors"].append(f"Validation failed for {field_name}")
            except Exception as e:
                manager["errors"].append(f"Validation error for {field_name}: {e}")


def config_get(manager, key, default=None):
    """Get config value"""
    return manager["config"].get(key, default)


def config_get_errors(manager):
    """Get validation errors"""
    return manager["errors"].copy()


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
manager = create_config_manager("app_config.json", schema)

if load_config(manager):
    print("Configuration loaded successfully!")
    print(f"API Key: {config_get(manager, 'api_key')}")
    print(f"Port: {config_get(manager, 'port')}")
    print(f"Debug: {config_get(manager, 'debug')}")
    print(f"Max Connections: {config_get(manager, 'max_connections')}")
else:
    print("Configuration failed to load:")
    for error in config_get_errors(manager):
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
