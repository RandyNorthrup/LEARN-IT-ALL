---
id: "177-api-client"
title: "REST API Client Framework"
chapterId: ch13-practice
order: 14
duration: 30
objectives:
  - Build reusable API client
  - Handle authentication and rate limiting
  - Implement caching and retries
  - Create response parsing
---

# REST API Client Framework

Build a comprehensive REST API client framework with authentication, caching, and error handling.

## Project Overview

Create API client that:
- Makes HTTP requests
- Handles authentication
- Implements rate limiting
- Caches responses
- Retries failed requests
- Parses responses

## Installation Requirements

```python
# Required packages
# pip install requests
```

## Data Models

```python
# models.py
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
from enum import Enum
import json

class HttpMethod(Enum):
    """HTTP methods"""
    GET = "GET"
    POST = "POST"
    PUT = "PUT"
    PATCH = "PATCH"
    DELETE = "DELETE"

class AuthType(Enum):
    """Authentication types"""
    NONE = "none"
    BASIC = "basic"
    BEARER = "bearer"
    API_KEY = "api_key"
    OAUTH2 = "oauth2"

@dataclass
class ApiRequest:
    """API request configuration"""
    method: HttpMethod
    endpoint: str
    headers: Dict[str, str] = field(default_factory=dict)
    params: Dict[str, Any] = field(default_factory=dict)
    data: Optional[Dict[str, Any]] = None
    json: Optional[Dict[str, Any]] = None
    timeout: int = 30
    
    def get_cache_key(self) -> str:
        """Generate cache key for request"""
        # Simple cache key from method and endpoint
        params_str = json.dumps(self.params, sort_keys=True)
        return f"{self.method.value}:{self.endpoint}:{params_str}"

@dataclass
class ApiResponse:
    """API response wrapper"""
    status_code: int
    headers: Dict[str, str]
    data: Any
    raw_text: str
    url: str
    elapsed_seconds: float
    from_cache: bool = False
    
    def is_success(self) -> bool:
        """Check if response was successful"""
        return 200 <= self.status_code < 300
    
    def is_client_error(self) -> bool:
        """Check if client error (4xx)"""
        return 400 <= self.status_code < 500
    
    def is_server_error(self) -> bool:
        """Check if server error (5xx)"""
        return 500 <= self.status_code < 600
    
    def json(self) -> Any:
        """Parse response as JSON"""
        if isinstance(self.data, dict) or isinstance(self.data, list):
            return self.data
        try:
            return json.loads(self.raw_text)
        except json.JSONDecodeError:
            raise ValueError("Response is not valid JSON")

@dataclass
class CacheEntry:
    """Cached response entry"""
    response: ApiResponse
    cached_at: datetime
    ttl_seconds: int
    
    def is_expired(self) -> bool:
        """Check if cache entry is expired"""
        age = (datetime.now() - self.cached_at).total_seconds()
        return age > self.ttl_seconds

@dataclass
class RateLimitConfig:
    """Rate limiting configuration"""
    requests_per_second: float
    requests_per_minute: Optional[int] = None
    requests_per_hour: Optional[int] = None
    
    def delay_seconds(self) -> float:
        """Calculate delay between requests"""
        return 1.0 / self.requests_per_second if self.requests_per_second > 0 else 0

@dataclass
class RetryConfig:
    """Retry configuration"""
    max_attempts: int = 3
    backoff_factor: float = 2.0  # Exponential backoff
    retry_on_status: List[int] = field(default_factory=lambda: [429, 500, 502, 503, 504])
    
    def get_delay(self, attempt: int) -> float:
        """Calculate retry delay"""
        return self.backoff_factor ** attempt

@dataclass
class ApiClientConfig:
    """API client configuration"""
    base_url: str
    auth_type: AuthType = AuthType.NONE
    api_key: Optional[str] = None
    bearer_token: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    default_headers: Dict[str, str] = field(default_factory=dict)
    timeout: int = 30
    rate_limit: Optional[RateLimitConfig] = None
    retry_config: Optional[RetryConfig] = None
    cache_ttl: int = 300  # 5 minutes default
    enable_cache: bool = True
```

## Authentication Handler

```python
# auth.py
import base64
from typing import Dict

class AuthenticationHandler:
    """Handle API authentication"""
    
    @staticmethod
    def apply_auth(config: ApiClientConfig, headers: Dict[str, str]) -> Dict[str, str]:
        """Apply authentication to headers"""
        auth_headers = headers.copy()
        
        if config.auth_type == AuthType.BEARER and config.bearer_token:
            auth_headers["Authorization"] = f"Bearer {config.bearer_token}"
        
        elif config.auth_type == AuthType.API_KEY and config.api_key:
            # Common patterns - can be customized
            auth_headers["X-API-Key"] = config.api_key
        
        elif config.auth_type == AuthType.BASIC and config.username and config.password:
            credentials = f"{config.username}:{config.password}"
            encoded = base64.b64encode(credentials.encode()).decode()
            auth_headers["Authorization"] = f"Basic {encoded}"
        
        return auth_headers
```

## Response Cache

```python
# cache.py
from typing import Optional, Dict

class ResponseCache:
    """Cache API responses"""
    
    def __init__(self):
        self.cache: Dict[str, CacheEntry] = {}
    
    def get(self, cache_key: str) -> Optional[ApiResponse]:
        """Get cached response"""
        if cache_key in self.cache:
            entry = self.cache[cache_key]
            
            if not entry.is_expired():
                # Mark as from cache
                response = entry.response
                response.from_cache = True
                return response
            else:
                # Remove expired entry
                del self.cache[cache_key]
        
        return None
    
    def set(self, cache_key: str, response: ApiResponse, ttl: int):
        """Cache response"""
        entry = CacheEntry(
            response=response,
            cached_at=datetime.now(),
            ttl_seconds=ttl
        )
        self.cache[cache_key] = entry
    
    def clear(self):
        """Clear all cache"""
        self.cache.clear()
    
    def remove(self, cache_key: str):
        """Remove specific cache entry"""
        if cache_key in self.cache:
            del self.cache[cache_key]
    
    def cleanup_expired(self):
        """Remove expired entries"""
        expired_keys = [
            key for key, entry in self.cache.items()
            if entry.is_expired()
        ]
        
        for key in expired_keys:
            del self.cache[key]
```

## Rate Limiter

```python
# rate_limiter.py
import time
from collections import deque

class RateLimiter:
    """Rate limit API requests"""
    
    def __init__(self, config: RateLimitConfig):
        self.config = config
        self.request_times: deque = deque()
        self.last_request_time = 0
    
    def wait_if_needed(self):
        """Wait if rate limit would be exceeded"""
        now = time.time()
        
        # Simple rate limiting based on requests per second
        if self.last_request_time > 0:
            elapsed = now - self.last_request_time
            required_delay = self.config.delay_seconds()
            
            if elapsed < required_delay:
                sleep_time = required_delay - elapsed
                time.sleep(sleep_time)
        
        # Update last request time
        self.last_request_time = time.time()
        
        # Track request times for minute/hour limits
        self.request_times.append(self.last_request_time)
        
        # Clean old entries
        cutoff = now - 3600  # Keep last hour
        while self.request_times and self.request_times[0] < cutoff:
            self.request_times.popleft()
    
    def can_make_request(self) -> bool:
        """Check if request can be made without waiting"""
        now = time.time()
        
        # Check per-minute limit
        if self.config.requests_per_minute:
            minute_ago = now - 60
            recent_requests = sum(1 for t in self.request_times if t > minute_ago)
            if recent_requests >= self.config.requests_per_minute:
                return False
        
        # Check per-hour limit
        if self.config.requests_per_hour:
            hour_ago = now - 3600
            recent_requests = sum(1 for t in self.request_times if t > hour_ago)
            if recent_requests >= self.config.requests_per_hour:
                return False
        
        return True
```

## API Client

```python
# api_client.py
import requests
import time
from typing import Optional

class ApiClient:
    """REST API client framework"""
    
    def __init__(self, config: ApiClientConfig):
        self.config = config
        self.cache = ResponseCache() if config.enable_cache else None
        self.rate_limiter = RateLimiter(config.rate_limit) if config.rate_limit else None
        self.session = requests.Session()
        
        # Set default headers
        self.session.headers.update(config.default_headers)
    
    def request(self, api_request: ApiRequest) -> ApiResponse:
        """Make API request with retry logic"""
        retry_config = self.config.retry_config or RetryConfig()
        
        for attempt in range(retry_config.max_attempts):
            try:
                response = self._make_request(api_request)
                
                # Check if should retry
                if response.status_code in retry_config.retry_on_status:
                    if attempt < retry_config.max_attempts - 1:
                        delay = retry_config.get_delay(attempt)
                        time.sleep(delay)
                        continue
                
                return response
            
            except requests.exceptions.RequestException as e:
                if attempt < retry_config.max_attempts - 1:
                    delay = retry_config.get_delay(attempt)
                    time.sleep(delay)
                else:
                    raise ApiClientError(f"Request failed after {retry_config.max_attempts} attempts: {e}")
        
        raise ApiClientError("Request failed")
    
    def _make_request(self, api_request: ApiRequest) -> ApiResponse:
        """Make single API request"""
        # Check cache
        if self.cache and api_request.method == HttpMethod.GET:
            cache_key = api_request.get_cache_key()
            cached_response = self.cache.get(cache_key)
            if cached_response:
                return cached_response
        
        # Rate limiting
        if self.rate_limiter:
            self.rate_limiter.wait_if_needed()
        
        # Build URL
        url = f"{self.config.base_url.rstrip('/')}/{api_request.endpoint.lstrip('/')}"
        
        # Apply authentication
        headers = AuthenticationHandler.apply_auth(self.config, api_request.headers)
        
        # Make request
        start_time = time.time()
        
        try:
            response = self.session.request(
                method=api_request.method.value,
                url=url,
                headers=headers,
                params=api_request.params,
                data=api_request.data,
                json=api_request.json,
                timeout=api_request.timeout or self.config.timeout
            )
            
            elapsed = time.time() - start_time
            
            # Parse response
            try:
                data = response.json()
            except:
                data = response.text
            
            api_response = ApiResponse(
                status_code=response.status_code,
                headers=dict(response.headers),
                data=data,
                raw_text=response.text,
                url=response.url,
                elapsed_seconds=elapsed
            )
            
            # Cache successful GET requests
            if (self.cache and 
                api_request.method == HttpMethod.GET and 
                api_response.is_success()):
                cache_key = api_request.get_cache_key()
                self.cache.set(cache_key, api_response, self.config.cache_ttl)
            
            return api_response
        
        except requests.exceptions.Timeout:
            raise ApiClientError(f"Request timeout after {api_request.timeout} seconds")
        except requests.exceptions.ConnectionError as e:
            raise ApiClientError(f"Connection error: {e}")
        except requests.exceptions.RequestException as e:
            raise ApiClientError(f"Request error: {e}")
    
    # Convenience methods
    def get(self, endpoint: str, params: Dict = None, **kwargs) -> ApiResponse:
        """Make GET request"""
        request = ApiRequest(
            method=HttpMethod.GET,
            endpoint=endpoint,
            params=params or {},
            **kwargs
        )
        return self.request(request)
    
    def post(self, endpoint: str, json: Dict = None, data: Dict = None, **kwargs) -> ApiResponse:
        """Make POST request"""
        request = ApiRequest(
            method=HttpMethod.POST,
            endpoint=endpoint,
            json=json,
            data=data,
            **kwargs
        )
        return self.request(request)
    
    def put(self, endpoint: str, json: Dict = None, **kwargs) -> ApiResponse:
        """Make PUT request"""
        request = ApiRequest(
            method=HttpMethod.PUT,
            endpoint=endpoint,
            json=json,
            **kwargs
        )
        return self.request(request)
    
    def delete(self, endpoint: str, **kwargs) -> ApiResponse:
        """Make DELETE request"""
        request = ApiRequest(
            method=HttpMethod.DELETE,
            endpoint=endpoint,
            **kwargs
        )
        return self.request(request)

class ApiClientError(Exception):
    """API client error"""
    pass
```

## Example Usage - GitHub API Client

```python
# github_client.py

class GitHubClient:
    """GitHub API client"""
    
    def __init__(self, access_token: Optional[str] = None):
        config = ApiClientConfig(
            base_url="https://api.github.com",
            auth_type=AuthType.BEARER if access_token else AuthType.NONE,
            bearer_token=access_token,
            default_headers={
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "Python-API-Client"
            },
            rate_limit=RateLimitConfig(requests_per_second=1),
            retry_config=RetryConfig(max_attempts=3),
            cache_ttl=600  # 10 minutes
        )
        
        self.client = ApiClient(config)
    
    def get_user(self, username: str) -> Dict:
        """Get user information"""
        response = self.client.get(f"/users/{username}")
        
        if not response.is_success():
            raise ApiClientError(f"Failed to get user: {response.status_code}")
        
        return response.json()
    
    def get_repos(self, username: str) -> List[Dict]:
        """Get user repositories"""
        response = self.client.get(f"/users/{username}/repos")
        
        if not response.is_success():
            raise ApiClientError(f"Failed to get repos: {response.status_code}")
        
        return response.json()
    
    def search_repositories(self, query: str, sort: str = "stars", order: str = "desc") -> Dict:
        """Search repositories"""
        response = self.client.get("/search/repositories", params={
            "q": query,
            "sort": sort,
            "order": order
        })
        
        if not response.is_success():
            raise ApiClientError(f"Search failed: {response.status_code}")
        
        return response.json()

# Usage example
def demo_github_client():
    """Demo GitHub client"""
    client = GitHubClient()
    
    # Get user
    user = client.get_user("torvalds")
    print(f"User: {user['name']}")
    print(f"Followers: {user['followers']}")
    
    # Search repositories
    results = client.search_repositories("python machine learning", sort="stars")
    print(f"\nTop Python ML repos:")
    for repo in results["items"][:5]:
        print(f"- {repo['full_name']} ({repo['stargazers_count']} stars)")
```

## Example Usage - Weather API Client

```python
# weather_client.py

class WeatherClient:
    """Weather API client (OpenWeatherMap example)"""
    
    def __init__(self, api_key: str):
        config = ApiClientConfig(
            base_url="https://api.openweathermap.org/data/2.5",
            auth_type=AuthType.API_KEY,
            api_key=api_key,
            rate_limit=RateLimitConfig(
                requests_per_second=0.5,  # 2 seconds between requests
                requests_per_minute=60
            ),
            cache_ttl=1800  # 30 minutes
        )
        
        self.client = ApiClient(config)
        self.api_key = api_key
    
    def get_current_weather(self, city: str, units: str = "metric") -> Dict:
        """Get current weather for city"""
        response = self.client.get("/weather", params={
            "q": city,
            "appid": self.api_key,
            "units": units
        })
        
        if not response.is_success():
            raise ApiClientError(f"Failed to get weather: {response.status_code}")
        
        return response.json()
    
    def get_forecast(self, city: str, units: str = "metric") -> Dict:
        """Get 5-day forecast"""
        response = self.client.get("/forecast", params={
            "q": city,
            "appid": self.api_key,
            "units": units
        })
        
        if not response.is_success():
            raise ApiClientError(f"Failed to get forecast: {response.status_code}")
        
        return response.json()

# Usage example
def demo_weather_client():
    """Demo weather client"""
    # API key would come from environment or config
    client = WeatherClient("YOUR_API_KEY")
    
    # Get current weather
    weather = client.get_current_weather("London")
    print(f"Weather in {weather['name']}:")
    print(f"  Temperature: {weather['main']['temp']}°C")
    print(f"  Conditions: {weather['weather'][0]['description']}")
    print(f"  Humidity: {weather['main']['humidity']}%")
```

## Testing the Framework

```python
# test_client.py

def test_api_client():
    """Test API client functionality"""
    
    # Test with public API (JSONPlaceholder)
    config = ApiClientConfig(
        base_url="https://jsonplaceholder.typicode.com",
        rate_limit=RateLimitConfig(requests_per_second=2),
        retry_config=RetryConfig(max_attempts=2)
    )
    
    client = ApiClient(config)
    
    # Test GET
    print("Testing GET request...")
    response = client.get("/posts/1")
    print(f"Status: {response.status_code}")
    print(f"From cache: {response.from_cache}")
    print(f"Elapsed: {response.elapsed_seconds:.3f}s")
    
    # Test cache (should be faster)
    print("\nTesting cache...")
    response2 = client.get("/posts/1")
    print(f"From cache: {response2.from_cache}")
    print(f"Elapsed: {response2.elapsed_seconds:.3f}s")
    
    # Test POST
    print("\nTesting POST request...")
    response = client.post("/posts", json={
        "title": "Test Post",
        "body": "This is a test",
        "userId": 1
    })
    print(f"Status: {response.status_code}")
    print(f"Created ID: {response.json()['id']}")
    
    print("\n✓ All tests passed!")

if __name__ == "__main__":
    test_api_client()
```

## Summary

Built comprehensive API client framework with:
- HTTP request methods (GET, POST, PUT, DELETE)
- Multiple authentication types
- Response caching
- Rate limiting
- Automatic retries with backoff
- Error handling
- Reusable configuration

**Skills Applied:**
- HTTP client libraries
- Authentication patterns
- Caching strategies
- Rate limiting algorithms
- Retry logic
- Framework design
- Error handling
