---
id: lesson-178-api-client
title: "REST API Client Framework"
chapterId: ch13-practice
order: 13
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
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
import json

# HTTP method constants
HTTP_GET = "GET"
HTTP_POST = "POST"
HTTP_PUT = "PUT"
HTTP_PATCH = "PATCH"
HTTP_DELETE = "DELETE"

# Authentication type constants
AUTH_NONE = "none"
AUTH_BASIC = "basic"
AUTH_BEARER = "bearer"
AUTH_API_KEY = "api_key"
AUTH_OAUTH2 = "oauth2"


def create_api_request(method, endpoint, headers=None, params=None,
                       data=None, json_body=None, timeout=30):
    """Create an API request configuration"""
    return {
        "method": method,
        "endpoint": endpoint,
        "headers": headers or {},
        "params": params or {},
        "data": data,
        "json": json_body,
        "timeout": timeout,
    }


def get_cache_key(request):
    """Generate cache key for request"""
    params_str = json.dumps(request["params"], sort_keys=True)
    return f"{request['method']}:{request['endpoint']}:{params_str}"


def create_api_response(status_code, headers, data, raw_text,
                        url, elapsed_seconds, from_cache=False):
    """Create an API response wrapper"""
    return {
        "status_code": status_code,
        "headers": headers,
        "data": data,
        "raw_text": raw_text,
        "url": url,
        "elapsed_seconds": elapsed_seconds,
        "from_cache": from_cache,
    }


def response_is_success(response):
    """Check if response was successful"""
    return 200 <= response["status_code"] < 300


def response_is_client_error(response):
    """Check if client error (4xx)"""
    return 400 <= response["status_code"] < 500


def response_is_server_error(response):
    """Check if server error (5xx)"""
    return 500 <= response["status_code"] < 600


def response_json(response):
    """Parse response as JSON"""
    if isinstance(response["data"], (dict, list)):
        return response["data"]
    try:
        return json.loads(response["raw_text"])
    except json.JSONDecodeError:
        raise ValueError("Response is not valid JSON")


def create_cache_entry(response, ttl_seconds):
    """Create a cached response entry"""
    return {
        "response": response,
        "cached_at": datetime.now(),
        "ttl_seconds": ttl_seconds,
    }


def cache_entry_is_expired(entry):
    """Check if cache entry is expired"""
    age = (datetime.now() - entry["cached_at"]).total_seconds()
    return age > entry["ttl_seconds"]


def create_rate_limit_config(requests_per_second,
                             requests_per_minute=None,
                             requests_per_hour=None):
    """Create rate limiting configuration"""
    return {
        "requests_per_second": requests_per_second,
        "requests_per_minute": requests_per_minute,
        "requests_per_hour": requests_per_hour,
    }


def rate_limit_delay_seconds(config):
    """Calculate delay between requests"""
    rps = config["requests_per_second"]
    return 1.0 / rps if rps > 0 else 0


def create_retry_config(max_attempts=3, backoff_factor=2.0,
                        retry_on_status=None):
    """Create retry configuration"""
    return {
        "max_attempts": max_attempts,
        "backoff_factor": backoff_factor,
        "retry_on_status": retry_on_status or [429, 500, 502, 503, 504],
    }


def get_retry_delay(retry_config, attempt):
    """Calculate retry delay"""
    return retry_config["backoff_factor"] ** attempt


def create_api_client_config(base_url, auth_type=AUTH_NONE, api_key=None,
                             bearer_token=None, username=None, password=None,
                             default_headers=None, timeout=30,
                             rate_limit=None, retry_config=None,
                             cache_ttl=300, enable_cache=True):
    """Create API client configuration"""
    return {
        "base_url": base_url,
        "auth_type": auth_type,
        "api_key": api_key,
        "bearer_token": bearer_token,
        "username": username,
        "password": password,
        "default_headers": default_headers or {},
        "timeout": timeout,
        "rate_limit": rate_limit,
        "retry_config": retry_config,
        "cache_ttl": cache_ttl,
        "enable_cache": enable_cache,
    }
```

## Authentication Handler

```python
# auth.py
import base64
from typing import Dict


def apply_auth(config, headers):
    """Apply authentication to headers"""
    auth_headers = headers.copy()

    if config["auth_type"] == AUTH_BEARER and config["bearer_token"]:
        auth_headers["Authorization"] = f"Bearer {config['bearer_token']}"

    elif config["auth_type"] == AUTH_API_KEY and config["api_key"]:
        # Common patterns - can be customized
        auth_headers["X-API-Key"] = config["api_key"]

    elif (config["auth_type"] == AUTH_BASIC
          and config["username"] and config["password"]):
        credentials = f"{config['username']}:{config['password']}"
        encoded = base64.b64encode(credentials.encode()).decode()
        auth_headers["Authorization"] = f"Basic {encoded}"

    return auth_headers
```

## Response Cache

```python
# cache.py
from typing import Optional, Dict


def create_response_cache():
    """Create a response cache"""
    return {"entries": {}}


def cache_get(cache, cache_key):
    """Get cached response"""
    if cache_key in cache["entries"]:
        entry = cache["entries"][cache_key]

        if not cache_entry_is_expired(entry):
            # Mark as from cache
            response = entry["response"]
            response["from_cache"] = True
            return response
        else:
            # Remove expired entry
            del cache["entries"][cache_key]

    return None


def cache_set(cache, cache_key, response, ttl):
    """Cache response"""
    entry = create_cache_entry(response=response, ttl_seconds=ttl)
    cache["entries"][cache_key] = entry


def cache_clear(cache):
    """Clear all cache"""
    cache["entries"].clear()


def cache_remove(cache, cache_key):
    """Remove specific cache entry"""
    if cache_key in cache["entries"]:
        del cache["entries"][cache_key]


def cache_cleanup_expired(cache):
    """Remove expired entries"""
    expired_keys = [
        key for key, entry in cache["entries"].items()
        if cache_entry_is_expired(entry)
    ]

    for key in expired_keys:
        del cache["entries"][key]
```

## Rate Limiter

```python
# rate_limiter.py
import time
from collections import deque


def create_rate_limiter(config):
    """Create a rate limiter state"""
    return {
        "config": config,
        "request_times": deque(),
        "last_request_time": 0,
    }


def rate_limiter_wait_if_needed(limiter):
    """Wait if rate limit would be exceeded"""
    now = time.time()

    # Simple rate limiting based on requests per second
    if limiter["last_request_time"] > 0:
        elapsed = now - limiter["last_request_time"]
        required_delay = rate_limit_delay_seconds(limiter["config"])

        if elapsed < required_delay:
            sleep_time = required_delay - elapsed
            time.sleep(sleep_time)

    # Update last request time
    limiter["last_request_time"] = time.time()

    # Track request times for minute/hour limits
    limiter["request_times"].append(limiter["last_request_time"])

    # Clean old entries
    cutoff = now - 3600  # Keep last hour
    while (limiter["request_times"]
           and limiter["request_times"][0] < cutoff):
        limiter["request_times"].popleft()


def rate_limiter_can_make_request(limiter):
    """Check if request can be made without waiting"""
    now = time.time()
    config = limiter["config"]

    # Check per-minute limit
    if config["requests_per_minute"]:
        minute_ago = now - 60
        recent = sum(1 for t in limiter["request_times"] if t > minute_ago)
        if recent >= config["requests_per_minute"]:
            return False

    # Check per-hour limit
    if config["requests_per_hour"]:
        hour_ago = now - 3600
        recent = sum(1 for t in limiter["request_times"] if t > hour_ago)
        if recent >= config["requests_per_hour"]:
            return False

    return True
```

## API Client

```python
# api_client.py
import requests
import time
from typing import Optional


def create_api_client(config):
    """Create a REST API client"""
    session = requests.Session()
    session.headers.update(config["default_headers"])

    client = {
        "config": config,
        "cache": create_response_cache() if config["enable_cache"] else None,
        "rate_limiter": (create_rate_limiter(config["rate_limit"])
                        if config["rate_limit"] else None),
        "session": session,
    }

    return client


def api_request(client, req):
    """Make API request with retry logic"""
    retry_cfg = client["config"]["retry_config"] or create_retry_config()

    for attempt in range(retry_cfg["max_attempts"]):
        try:
            response = _make_request(client, req)

            # Check if should retry
            if response["status_code"] in retry_cfg["retry_on_status"]:
                if attempt < retry_cfg["max_attempts"] - 1:
                    delay = get_retry_delay(retry_cfg, attempt)
                    time.sleep(delay)
                    continue

            return response

        except requests.exceptions.RequestException as e:
            if attempt < retry_cfg["max_attempts"] - 1:
                delay = get_retry_delay(retry_cfg, attempt)
                time.sleep(delay)
            else:
                raise RuntimeError(
                    f"Request failed after {retry_cfg['max_attempts']} "
                    f"attempts: {e}"
                )

    raise RuntimeError("Request failed")


def _make_request(client, req):
    """Make single API request"""
    config = client["config"]

    # Check cache
    if client["cache"] and req["method"] == HTTP_GET:
        key = get_cache_key(req)
        cached_response = cache_get(client["cache"], key)
        if cached_response:
            return cached_response

    # Rate limiting
    if client["rate_limiter"]:
        rate_limiter_wait_if_needed(client["rate_limiter"])

    # Build URL
    url = f"{config['base_url'].rstrip('/')}/{req['endpoint'].lstrip('/')}"

    # Apply authentication
    headers = apply_auth(config, req["headers"])

    # Make request
    start_time = time.time()

    try:
        response = client["session"].request(
            method=req["method"],
            url=url,
            headers=headers,
            params=req["params"],
            data=req["data"],
            json=req["json"],
            timeout=req["timeout"] or config["timeout"],
        )

        elapsed = time.time() - start_time

        # Parse response
        try:
            data = response.json()
        except Exception:
            data = response.text

        api_resp = create_api_response(
            status_code=response.status_code,
            headers=dict(response.headers),
            data=data,
            raw_text=response.text,
            url=response.url,
            elapsed_seconds=elapsed,
        )

        # Cache successful GET requests
        if (client["cache"]
            and req["method"] == HTTP_GET
            and response_is_success(api_resp)):
            key = get_cache_key(req)
            cache_set(client["cache"], key, api_resp, config["cache_ttl"])

        return api_resp

    except requests.exceptions.Timeout:
        raise RuntimeError(
            f"Request timeout after {req['timeout']} seconds"
        )
    except requests.exceptions.ConnectionError as e:
        raise RuntimeError(f"Connection error: {e}")
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"Request error: {e}")


# Convenience methods
def api_get(client, endpoint, params=None, **kwargs):
    """Make GET request"""
    req = create_api_request(
        method=HTTP_GET,
        endpoint=endpoint,
        params=params or {},
        **kwargs,
    )
    return api_request(client, req)


def api_post(client, endpoint, json_body=None, data=None, **kwargs):
    """Make POST request"""
    req = create_api_request(
        method=HTTP_POST,
        endpoint=endpoint,
        json_body=json_body,
        data=data,
        **kwargs,
    )
    return api_request(client, req)


def api_put(client, endpoint, json_body=None, **kwargs):
    """Make PUT request"""
    req = create_api_request(
        method=HTTP_PUT,
        endpoint=endpoint,
        json_body=json_body,
        **kwargs,
    )
    return api_request(client, req)


def api_delete(client, endpoint, **kwargs):
    """Make DELETE request"""
    req = create_api_request(
        method=HTTP_DELETE,
        endpoint=endpoint,
        **kwargs,
    )
    return api_request(client, req)
```

## Example Usage - GitHub API Client

```python
# github_client.py

def create_github_client(access_token=None):
    """Create a GitHub API client"""
    config = create_api_client_config(
        base_url="https://api.github.com",
        auth_type=AUTH_BEARER if access_token else AUTH_NONE,
        bearer_token=access_token,
        default_headers={
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "Python-API-Client",
        },
        rate_limit=create_rate_limit_config(requests_per_second=1),
        retry_config=create_retry_config(max_attempts=3),
        cache_ttl=600,  # 10 minutes
    )

    return create_api_client(config)


def github_get_user(client, username):
    """Get user information"""
    response = api_get(client, f"/users/{username}")

    if not response_is_success(response):
        raise RuntimeError(f"Failed to get user: {response['status_code']}")

    return response_json(response)


def github_get_repos(client, username):
    """Get user repositories"""
    response = api_get(client, f"/users/{username}/repos")

    if not response_is_success(response):
        raise RuntimeError(f"Failed to get repos: {response['status_code']}")

    return response_json(response)


def github_search_repositories(client, query, sort="stars", order="desc"):
    """Search repositories"""
    response = api_get(client, "/search/repositories", params={
        "q": query,
        "sort": sort,
        "order": order,
    })

    if not response_is_success(response):
        raise RuntimeError(f"Search failed: {response['status_code']}")

    return response_json(response)


# Usage example
def demo_github_client():
    """Demo GitHub client"""
    client = create_github_client()

    # Get user
    user = github_get_user(client, "torvalds")
    print(f"User: {user['name']}")
    print(f"Followers: {user['followers']}")

    # Search repositories
    results = github_search_repositories(client, "python machine learning",
                                         sort="stars")
    print(f"\nTop Python ML repos:")
    for repo in results["items"][:5]:
        print(f"- {repo['full_name']} ({repo['stargazers_count']} stars)")
```

## Example Usage - Weather API Client

```python
# weather_client.py

def create_weather_client(api_key):
    """Create a Weather API client (OpenWeatherMap example)"""
    config = create_api_client_config(
        base_url="https://api.openweathermap.org/data/2.5",
        auth_type=AUTH_API_KEY,
        api_key=api_key,
        rate_limit=create_rate_limit_config(
            requests_per_second=0.5,  # 2 seconds between requests
            requests_per_minute=60,
        ),
        cache_ttl=1800,  # 30 minutes
    )

    client = create_api_client(config)
    # Store api_key for query params
    client["api_key"] = api_key
    return client


def weather_get_current(client, city, units="metric"):
    """Get current weather for city"""
    response = api_get(client, "/weather", params={
        "q": city,
        "appid": client["api_key"],
        "units": units,
    })

    if not response_is_success(response):
        raise RuntimeError(
            f"Failed to get weather: {response['status_code']}"
        )

    return response_json(response)


def weather_get_forecast(client, city, units="metric"):
    """Get 5-day forecast"""
    response = api_get(client, "/forecast", params={
        "q": city,
        "appid": client["api_key"],
        "units": units,
    })

    if not response_is_success(response):
        raise RuntimeError(
            f"Failed to get forecast: {response['status_code']}"
        )

    return response_json(response)


# Usage example
def demo_weather_client():
    """Demo weather client"""
    # API key would come from environment or config
    client = create_weather_client("YOUR_API_KEY")

    # Get current weather
    weather = weather_get_current(client, "London")
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
    config = create_api_client_config(
        base_url="https://jsonplaceholder.typicode.com",
        rate_limit=create_rate_limit_config(requests_per_second=2),
        retry_config=create_retry_config(max_attempts=2),
    )

    client = create_api_client(config)

    # Test GET
    print("Testing GET request...")
    response = api_get(client, "/posts/1")
    print(f"Status: {response['status_code']}")
    print(f"From cache: {response['from_cache']}")
    print(f"Elapsed: {response['elapsed_seconds']:.3f}s")

    # Test cache (should be faster)
    print("\nTesting cache...")
    response2 = api_get(client, "/posts/1")
    print(f"From cache: {response2['from_cache']}")
    print(f"Elapsed: {response2['elapsed_seconds']:.3f}s")

    # Test POST
    print("\nTesting POST request...")
    response = api_post(client, "/posts", json_body={
        "title": "Test Post",
        "body": "This is a test",
        "userId": 1,
    })
    print(f"Status: {response['status_code']}")
    print(f"Created ID: {response_json(response)['id']}")

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
