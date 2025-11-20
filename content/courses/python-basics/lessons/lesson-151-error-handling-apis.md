---
id: "159-error-handling-apis"
title: "Error Handling in APIs and Web Services"
chapterId: ch11-error-handling
order: 14
duration: 25
objectives:
  - Handle API errors properly
  - Return appropriate HTTP status codes
  - Create error response formats
  - Implement API error middleware
---

# Error Handling in APIs and Web Services

Proper error handling is crucial for API reliability and usability.

## HTTP Status Codes

```python
from enum import IntEnum

class HTTPStatus(IntEnum):
    """Common HTTP status codes"""
    # Success
    OK = 200
    CREATED = 201
    NO_CONTENT = 204
    
    # Client errors
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404
    METHOD_NOT_ALLOWED = 405
    CONFLICT = 409
    UNPROCESSABLE_ENTITY = 422
    TOO_MANY_REQUESTS = 429
    
    # Server errors
    INTERNAL_SERVER_ERROR = 500
    BAD_GATEWAY = 502
    SERVICE_UNAVAILABLE = 503
    GATEWAY_TIMEOUT = 504

# Map exception types to status codes
EXCEPTION_TO_STATUS = {
    ValueError: HTTPStatus.BAD_REQUEST,
    KeyError: HTTPStatus.NOT_FOUND,
    PermissionError: HTTPStatus.FORBIDDEN,
    NotImplementedError: HTTPStatus.NOT_IMPLEMENTED,
    TimeoutError: HTTPStatus.GATEWAY_TIMEOUT,
}

def get_status_code(exception: Exception) -> int:
    """Get appropriate status code for exception"""
    return EXCEPTION_TO_STATUS.get(type(exception), HTTPStatus.INTERNAL_SERVER_ERROR)
```

## Structured Error Responses

```python
from dataclasses import dataclass, asdict
from typing import Optional, List, Dict, Any
from datetime import datetime

@dataclass
class ErrorDetail:
    """Single error detail"""
    field: Optional[str]
    message: str
    code: Optional[str] = None

@dataclass
class APIError:
    """
    Structured API error response.
    
    Follows RFC 7807 Problem Details format.
    """
    status: int
    title: str
    detail: str
    type: Optional[str] = None
    instance: Optional[str] = None
    timestamp: str = None
    errors: List[ErrorDetail] = None
    
    def __post_init__(self):
        if self.timestamp is None:
            self.timestamp = datetime.utcnow().isoformat() + "Z"
        if self.errors is None:
            self.errors = []
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON response"""
        result = asdict(self)
        # Remove None values
        return {k: v for k, v in result.items() if v is not None}

# Create error responses
def bad_request_error(detail: str, errors: List[ErrorDetail] = None) -> APIError:
    """400 Bad Request"""
    return APIError(
        status=400,
        title="Bad Request",
        detail=detail,
        type="/errors/bad-request",
        errors=errors or []
    )

def not_found_error(resource: str, resource_id: str) -> APIError:
    """404 Not Found"""
    return APIError(
        status=404,
        title="Not Found",
        detail=f"{resource} with ID '{resource_id}' not found",
        type="/errors/not-found"
    )

def internal_error(detail: str = "An unexpected error occurred") -> APIError:
    """500 Internal Server Error"""
    return APIError(
        status=500,
        title="Internal Server Error",
        detail=detail,
        type="/errors/internal"
    )

# Examples
validation_error = bad_request_error(
    "Validation failed",
    errors=[
        ErrorDetail(field="email", message="Invalid email format", code="invalid_format"),
        ErrorDetail(field="age", message="Must be at least 18", code="min_value")
    ]
)

print(validation_error.to_dict())
```

## API Exception Classes

```python
class APIException(Exception):
    """Base API exception"""
    status_code = 500
    default_detail = "An error occurred"
    default_code = "error"
    
    def __init__(self, detail: str = None, code: str = None):
        self.detail = detail or self.default_detail
        self.code = code or self.default_code
        super().__init__(self.detail)

class BadRequest(APIException):
    """400 Bad Request"""
    status_code = 400
    default_detail = "Bad request"
    default_code = "bad_request"

class Unauthorized(APIException):
    """401 Unauthorized"""
    status_code = 401
    default_detail = "Authentication required"
    default_code = "unauthorized"

class Forbidden(APIException):
    """403 Forbidden"""
    status_code = 403
    default_detail = "Permission denied"
    default_code = "forbidden"

class NotFound(APIException):
    """404 Not Found"""
    status_code = 404
    default_detail = "Resource not found"
    default_code = "not_found"

class Conflict(APIException):
    """409 Conflict"""
    status_code = 409
    default_detail = "Resource conflict"
    default_code = "conflict"

class ValidationError(BadRequest):
    """422 Unprocessable Entity"""
    status_code = 422
    default_detail = "Validation failed"
    default_code = "validation_error"
    
    def __init__(self, errors: List[ErrorDetail]):
        self.errors = errors
        super().__init__("Validation failed")

# Usage in API endpoints
def create_user(data: dict):
    """Create user endpoint"""
    # Validate email
    if "email" not in data:
        raise BadRequest("Email is required")
    
    if not "@" in data["email"]:
        raise ValidationError([
            ErrorDetail(field="email", message="Invalid email format")
        ])
    
    # Check if user exists
    if user_exists(data["email"]):
        raise Conflict(f"User with email {data['email']} already exists")
    
    # Create user
    return {"id": "user123", "email": data["email"]}

def get_user(user_id: str):
    """Get user endpoint"""
    user = find_user(user_id)
    
    if not user:
        raise NotFound(f"User {user_id} not found")
    
    return user

# Mock functions
def user_exists(email: str) -> bool:
    return email == "existing@example.com"

def find_user(user_id: str):
    return None if user_id == "missing" else {"id": user_id, "name": "Alice"}
```

## Error Handler Middleware

```python
import logging
import traceback
from typing import Callable

logger = logging.getLogger(__name__)

class ErrorHandlerMiddleware:
    """
    Middleware to handle errors consistently across API.
    
    Features:
    - Catch all exceptions
    - Convert to APIError
    - Log with context
    - Return structured response
    """
    
    def __init__(self, app: Callable):
        self.app = app
    
    def __call__(self, request: Dict[str, Any]) -> Dict[str, Any]:
        """Handle request with error catching"""
        try:
            # Call the actual handler
            response = self.app(request)
            return response
        
        except APIException as e:
            # Known API exception
            logger.warning(
                f"API error: {e.detail}",
                extra={
                    "status_code": e.status_code,
                    "error_code": e.code,
                    "path": request.get("path"),
                    "method": request.get("method")
                }
            )
            
            error = APIError(
                status=e.status_code,
                title=e.__class__.__name__,
                detail=e.detail,
                type=f"/errors/{e.code}",
                instance=request.get("path")
            )
            
            if isinstance(e, ValidationError):
                error.errors = e.errors
            
            return {
                "status": e.status_code,
                "body": error.to_dict()
            }
        
        except ValueError as e:
            # Validation error
            logger.warning(f"Validation error: {e}")
            error = bad_request_error(str(e))
            return {
                "status": 400,
                "body": error.to_dict()
            }
        
        except KeyError as e:
            # Missing resource
            logger.warning(f"Resource not found: {e}")
            error = not_found_error("Resource", str(e))
            return {
                "status": 404,
                "body": error.to_dict()
            }
        
        except Exception as e:
            # Unexpected error
            logger.error(
                f"Unexpected error: {e}",
                exc_info=True,
                extra={
                    "path": request.get("path"),
                    "method": request.get("method")
                }
            )
            
            # Don't expose internal error details
            error = internal_error()
            
            return {
                "status": 500,
                "body": error.to_dict()
            }

# Example API handler
def user_handler(request: Dict[str, Any]) -> Dict[str, Any]:
    """Handle user requests"""
    method = request["method"]
    path = request["path"]
    
    if method == "GET" and "/users/" in path:
        user_id = path.split("/")[-1]
        user = get_user(user_id)
        return {"status": 200, "body": user}
    
    elif method == "POST" and path == "/users":
        user = create_user(request["body"])
        return {"status": 201, "body": user}
    
    else:
        raise NotFound(f"Endpoint {method} {path} not found")

# Wrap with middleware
protected_handler = ErrorHandlerMiddleware(user_handler)

# Test requests
test_requests = [
    {
        "method": "GET",
        "path": "/users/user123",
        "body": None
    },
    {
        "method": "GET",
        "path": "/users/missing",
        "body": None
    },
    {
        "method": "POST",
        "path": "/users",
        "body": {"email": "invalid"}
    }
]

for req in test_requests:
    print(f"\n{req['method']} {req['path']}")
    response = protected_handler(req)
    print(f"Status: {response['status']}")
    print(f"Body: {response['body']}")
```

## Request Validation

```python
from typing import Dict, Any, List

class RequestValidator:
    """Validate API requests"""
    
    @staticmethod
    def validate_required_fields(data: Dict[str, Any], required: List[str]):
        """Validate required fields present"""
        errors = []
        
        for field in required:
            if field not in data or data[field] is None:
                errors.append(ErrorDetail(
                    field=field,
                    message=f"{field} is required",
                    code="required"
                ))
        
        if errors:
            raise ValidationError(errors)
    
    @staticmethod
    def validate_email(email: str, field: str = "email") -> str:
        """Validate email format"""
        import re
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        
        if not re.match(email_pattern, email):
            raise ValidationError([
                ErrorDetail(
                    field=field,
                    message="Invalid email format",
                    code="invalid_format"
                )
            ])
        
        return email
    
    @staticmethod
    def validate_string_length(value: str, field: str, 
                              min_length: int = None, max_length: int = None):
        """Validate string length"""
        errors = []
        
        if min_length and len(value) < min_length:
            errors.append(ErrorDetail(
                field=field,
                message=f"Must be at least {min_length} characters",
                code="min_length"
            ))
        
        if max_length and len(value) > max_length:
            errors.append(ErrorDetail(
                field=field,
                message=f"Must be at most {max_length} characters",
                code="max_length"
            ))
        
        if errors:
            raise ValidationError(errors)
    
    @staticmethod
    def validate_range(value: int, field: str, 
                      minimum: int = None, maximum: int = None):
        """Validate numeric range"""
        errors = []
        
        if minimum is not None and value < minimum:
            errors.append(ErrorDetail(
                field=field,
                message=f"Must be at least {minimum}",
                code="min_value"
            ))
        
        if maximum is not None and value > maximum:
            errors.append(ErrorDetail(
                field=field,
                message=f"Must be at most {maximum}",
                code="max_value"
            ))
        
        if errors:
            raise ValidationError(errors)

# Usage
def validate_user_data(data: dict):
    """Validate user creation data"""
    validator = RequestValidator()
    
    # Required fields
    validator.validate_required_fields(data, ["email", "name", "age"])
    
    # Email format
    validator.validate_email(data["email"])
    
    # Name length
    validator.validate_string_length(data["name"], "name", min_length=2, max_length=100)
    
    # Age range
    validator.validate_range(data["age"], "age", minimum=18, maximum=120)

# Test validation
try:
    validate_user_data({
        "email": "invalid",
        "name": "A",
        "age": 15
    })
except ValidationError as e:
    print("Validation errors:")
    for error in e.errors:
        print(f"  {error.field}: {error.message}")
```

## Rate Limiting

```python
from collections import defaultdict
from time import time

class RateLimiter:
    """Rate limit API requests"""
    
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)
    
    def is_allowed(self, client_id: str) -> tuple[bool, Dict[str, Any]]:
        """
        Check if request is allowed.
        
        Returns:
            Tuple of (allowed, headers)
        """
        now = time()
        window_start = now - self.window_seconds
        
        # Clean old requests
        self.requests[client_id] = [
            req_time for req_time in self.requests[client_id]
            if req_time > window_start
        ]
        
        # Check limit
        current_count = len(self.requests[client_id])
        
        if current_count >= self.max_requests:
            # Rate limited
            oldest_request = min(self.requests[client_id])
            retry_after = int(oldest_request + self.window_seconds - now)
            
            return False, {
                "X-RateLimit-Limit": self.max_requests,
                "X-RateLimit-Remaining": 0,
                "X-RateLimit-Reset": int(oldest_request + self.window_seconds),
                "Retry-After": retry_after
            }
        
        # Allow request
        self.requests[client_id].append(now)
        
        return True, {
            "X-RateLimit-Limit": self.max_requests,
            "X-RateLimit-Remaining": self.max_requests - current_count - 1,
            "X-RateLimit-Reset": int(now + self.window_seconds)
        }

# Usage
limiter = RateLimiter(max_requests=5, window_seconds=60)

def handle_request_with_rate_limit(client_id: str, request: Dict[str, Any]):
    """Handle request with rate limiting"""
    allowed, headers = limiter.is_allowed(client_id)
    
    if not allowed:
        error = APIError(
            status=429,
            title="Too Many Requests",
            detail=f"Rate limit exceeded. Retry after {headers['Retry-After']} seconds",
            type="/errors/rate-limit"
        )
        
        return {
            "status": 429,
            "headers": headers,
            "body": error.to_dict()
        }
    
    # Process request
    response = user_handler(request)
    response["headers"] = headers
    
    return response

# Test rate limiting
client_id = "client123"
for i in range(7):
    request = {
        "method": "GET",
        "path": "/users/user123",
        "body": None
    }
    
    response = handle_request_with_rate_limit(client_id, request)
    print(f"Request {i + 1}: Status {response['status']}")
    if "headers" in response:
        print(f"  Remaining: {response['headers']['X-RateLimit-Remaining']}")
```

## API Error Logging

```python
import json

class APILogger:
    """Log API errors with context"""
    
    @staticmethod
    def log_error(request: Dict[str, Any], error: Exception, response: Dict[str, Any]):
        """Log API error with full context"""
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "request": {
                "method": request.get("method"),
                "path": request.get("path"),
                "client_id": request.get("client_id"),
                "headers": request.get("headers", {}),
                "body": request.get("body")
            },
            "error": {
                "type": type(error).__name__,
                "message": str(error),
                "status_code": response.get("status")
            },
            "response": {
                "status": response.get("status"),
                "body": response.get("body")
            }
        }
        
        # Log as JSON
        logger.error(json.dumps(log_entry))
        
        # In production, send to:
        # - ELK Stack
        # - Splunk
        # - CloudWatch
        # - Application Insights
        # etc.
```

## Summary

**API Error Handling:**
- Use appropriate HTTP status codes
- Return structured error responses (RFC 7807)
- Create custom exception classes
- Implement error middleware
- Validate requests thoroughly
- Rate limit to prevent abuse
- Log errors with context

**Error Response Format:**
```json
{
  "status": 400,
  "title": "Bad Request",
  "detail": "Validation failed",
  "type": "/errors/validation",
  "instance": "/users",
  "timestamp": "2024-01-01T12:00:00Z",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format",
      "code": "invalid_format"
    }
  ]
}
```

**Best Practices:**
- Return consistent error format
- Include helpful error messages
- Don't expose internal details
- Use proper status codes
- Validate all input
- Rate limit endpoints
- Log all errors with context
- Version your API
- Document error responses
- Test error scenarios

**Status Code Guidelines:**
- **2xx**: Success
- **4xx**: Client error (bad request, not found, etc.)
- **5xx**: Server error (internal error, service unavailable)
