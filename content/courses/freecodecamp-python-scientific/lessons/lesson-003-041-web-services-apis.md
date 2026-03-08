---
id: lesson-003-041
title: Web Services: APIs
chapterId: chapter-03
order: 41
duration: 5
objectives:
  - Work with real APIs using authentication and API keys
  - Handle rate limiting and pagination in API responses
  - Use the requests library to consume web APIs
  - Implement proper error handling for API interactions
---

# Web Services: APIs

Working with real-world APIs goes beyond simple GET requests. You need to handle **authentication**, **rate limiting**, **pagination**, and **errors** gracefully. This lesson covers the practical skills for interacting with production APIs.

## Using the Requests Library

While Python's `urllib` works, the third-party `requests` library is the standard for HTTP in Python:

```python
import requests

# Simple GET request
response = requests.get('https://api.github.com/users/octocat')

print(response.status_code)   # 200
print(response.headers['content-type'])  # application/json
user = response.json()        # Parse JSON directly
print(user['name'])           # The Octocat
```

The `requests` library handles encoding, headers, and connection management automatically.

## Authentication with API Keys

Most real APIs require authentication. The most common methods are:

### Query Parameter
```python
import requests

api_key = 'your_api_key_here'
url = f'https://api.example.com/data?api_key={api_key}'
response = requests.get(url)
```

### Header-Based Authentication
```python
import requests

headers = {
    'Authorization': 'Bearer your_token_here',
    'Accept': 'application/json'
}
response = requests.get('https://api.example.com/data', headers=headers)
```

### Best Practices for API Keys

Never hardcode API keys in your source code. Use environment variables:

```python
import os
import requests

api_key = os.environ.get('API_KEY')
if not api_key:
    print("Error: Set the API_KEY environment variable")
else:
    headers = {'Authorization': f'Bearer {api_key}'}
    response = requests.get('https://api.example.com/data', headers=headers)
```

## Passing Parameters

Use the `params` argument to add query parameters cleanly:

```python
import requests

params = {
    'q': 'python programming',
    'sort': 'stars',
    'order': 'desc',
    'per_page': 5
}

response = requests.get(
    'https://api.github.com/search/repositories',
    params=params
)

data = response.json()
for repo in data['items']:
    print(f"{repo['full_name']}: {repo['stargazers_count']} stars")
```

## Error Handling

Robust API code handles errors at every level:

```python
import requests

def fetch_data(url):
    """Fetch data from an API with proper error handling."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()  # Raises exception for 4xx/5xx
        return response.json()
    except requests.exceptions.Timeout:
        print("Error: Request timed out")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to server")
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e.response.status_code}")
        if e.response.status_code == 404:
            print("Resource not found")
        elif e.response.status_code == 401:
            print("Authentication failed")
    except requests.exceptions.JSONDecodeError:
        print("Error: Response is not valid JSON")
    return None

data = fetch_data('https://api.github.com/users/octocat')
if data:
    print(f"Name: {data['name']}")
```

## Rate Limiting

APIs limit how many requests you can make in a time period. Exceeding the limit returns a `429 Too Many Requests` status:

```python
import requests
import time

def fetch_with_rate_limit(url):
    """Respect API rate limits with retry logic."""
    response = requests.get(url)
    
    if response.status_code == 429:
        retry_after = int(response.headers.get('Retry-After', 60))
        print(f"Rate limited. Waiting {retry_after} seconds...")
        time.sleep(retry_after)
        response = requests.get(url)  # Retry
    
    return response

# Check rate limit headers (GitHub example)
response = requests.get('https://api.github.com/rate_limit')
print(f"Remaining: {response.headers.get('X-RateLimit-Remaining')}")
print(f"Reset at: {response.headers.get('X-RateLimit-Reset')}")
```

## Pagination

APIs return data in pages to avoid overwhelming responses. Common patterns:

```python
import requests

def fetch_all_pages(base_url):
    """Fetch all pages of results from a paginated API."""
    all_items = []
    page = 1
    
    while True:
        response = requests.get(base_url, params={'page': page, 'per_page': 30})
        data = response.json()
        
        if not data:  # Empty page means we've reached the end
            break
        
        all_items.extend(data)
        print(f"Fetched page {page} ({len(data)} items)")
        page += 1
    
    return all_items

# Fetch all repos for a user
repos = fetch_all_pages('https://api.github.com/users/octocat/repos')
print(f"Total repos: {len(repos)}")
```

## Practical Example: Public API Consumer

```python
import requests

def get_country_info(country_name):
    """Fetch country information from the REST Countries API."""
    url = f'https://restcountries.com/v3.1/name/{country_name}'
    
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        countries = response.json()
        
        for country in countries:
            name = country['name']['common']
            capital = country.get('capital', ['N/A'])[0]
            population = country.get('population', 0)
            region = country.get('region', 'Unknown')
            
            print(f"Country: {name}")
            print(f"  Capital: {capital}")
            print(f"  Population: {population:,}")
            print(f"  Region: {region}")
    except requests.exceptions.HTTPError:
        print(f"Country '{country_name}' not found")

get_country_info('Canada')
```

Mastering API consumption opens doors to an enormous ecosystem of data and services available on the internet.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
