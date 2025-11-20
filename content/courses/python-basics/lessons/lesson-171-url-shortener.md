---
id: "170-url-shortener"
title: "URL Shortener Service"
chapterId: ch13-practice
order: 7
duration: 30
objectives:
  - Build URL shortening service
  - Generate unique short codes
  - Track click analytics
  - Implement expiration
---

# URL Shortener Service

Build a URL shortening service with analytics and link management.

## Project Overview

Create URL shortener that:
- Generates short codes for long URLs
- Redirects short URLs to originals
- Tracks click statistics
- Manages link expiration
- Provides analytics dashboard

## Core Implementation

### URL Model and Storage

```python
# models.py
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Optional, List
import json
from pathlib import Path

@dataclass
class URLMapping:
    """URL shortening entry"""
    short_code: str
    original_url: str
    created_at: datetime
    expires_at: Optional[datetime] = None
    clicks: int = 0
    last_accessed: Optional[datetime] = None
    custom_code: bool = False
    click_history: List[dict] = field(default_factory=list)
    
    def is_expired(self) -> bool:
        """Check if URL has expired"""
        if self.expires_at is None:
            return False
        return datetime.now() > self.expires_at
    
    def record_click(self, user_agent: str = None, ip_address: str = None):
        """Record a click"""
        self.clicks += 1
        self.last_accessed = datetime.now()
        
        click_data = {
            "timestamp": datetime.now().isoformat(),
            "user_agent": user_agent,
            "ip_address": ip_address
        }
        self.click_history.append(click_data)
    
    def to_dict(self) -> dict:
        return {
            "short_code": self.short_code,
            "original_url": self.original_url,
            "created_at": self.created_at.isoformat(),
            "expires_at": self.expires_at.isoformat() if self.expires_at else None,
            "clicks": self.clicks,
            "last_accessed": self.last_accessed.isoformat() if self.last_accessed else None,
            "custom_code": self.custom_code,
            "click_history": self.click_history
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'URLMapping':
        return cls(
            short_code=data["short_code"],
            original_url=data["original_url"],
            created_at=datetime.fromisoformat(data["created_at"]),
            expires_at=datetime.fromisoformat(data["expires_at"]) if data.get("expires_at") else None,
            clicks=data.get("clicks", 0),
            last_accessed=datetime.fromisoformat(data["last_accessed"]) if data.get("last_accessed") else None,
            custom_code=data.get("custom_code", False),
            click_history=data.get("click_history", [])
        )

class URLDatabase:
    """Store and retrieve URL mappings"""
    
    def __init__(self, db_file: str = "urls.json"):
        self.db_file = db_file
        self.mappings: dict[str, URLMapping] = {}
        self.load()
    
    def save(self):
        """Save to file"""
        data = {code: mapping.to_dict() for code, mapping in self.mappings.items()}
        Path(self.db_file).write_text(json.dumps(data, indent=2))
    
    def load(self):
        """Load from file"""
        if not Path(self.db_file).exists():
            self.mappings = {}
            return
        
        try:
            data = json.loads(Path(self.db_file).read_text())
            self.mappings = {
                code: URLMapping.from_dict(mapping_data)
                for code, mapping_data in data.items()
            }
        except (json.JSONDecodeError, KeyError):
            self.mappings = {}
    
    def add(self, mapping: URLMapping):
        """Add URL mapping"""
        self.mappings[mapping.short_code] = mapping
        self.save()
    
    def get(self, short_code: str) -> Optional[URLMapping]:
        """Get URL mapping by short code"""
        mapping = self.mappings.get(short_code)
        
        if mapping and mapping.is_expired():
            return None
        
        return mapping
    
    def exists(self, short_code: str) -> bool:
        """Check if short code exists"""
        return short_code in self.mappings
    
    def delete(self, short_code: str) -> bool:
        """Delete URL mapping"""
        if short_code in self.mappings:
            del self.mappings[short_code]
            self.save()
            return True
        return False
    
    def get_all(self) -> List[URLMapping]:
        """Get all mappings"""
        return list(self.mappings.values())
    
    def cleanup_expired(self) -> int:
        """Remove expired URLs"""
        expired = [code for code, mapping in self.mappings.items() 
                  if mapping.is_expired()]
        
        for code in expired:
            del self.mappings[code]
        
        if expired:
            self.save()
        
        return len(expired)
```

### Short Code Generator

```python
# generator.py
import random
import string

class ShortCodeGenerator:
    """Generate unique short codes"""
    
    def __init__(self, database: URLDatabase):
        self.database = database
    
    def generate(self, length: int = 6) -> str:
        """Generate random short code"""
        characters = string.ascii_letters + string.digits
        
        max_attempts = 100
        for _ in range(max_attempts):
            code = ''.join(random.choices(characters, k=length))
            if not self.database.exists(code):
                return code
        
        # If still no unique code, increase length
        return self.generate(length + 1)
    
    def generate_readable(self) -> str:
        """Generate readable short code (no ambiguous characters)"""
        # Exclude I, l, 1, O, 0 to avoid confusion
        characters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        
        code = ''.join(random.choices(characters, k=6))
        
        if self.database.exists(code):
            return self.generate_readable()
        
        return code
    
    def validate_custom_code(self, code: str) -> tuple[bool, str]:
        """Validate custom short code"""
        if not code:
            return False, "Code cannot be empty"
        
        if len(code) < 3:
            return False, "Code must be at least 3 characters"
        
        if len(code) > 20:
            return False, "Code must be 20 characters or less"
        
        if not all(c.isalnum() or c in '-_' for c in code):
            return False, "Code can only contain letters, numbers, hyphens, and underscores"
        
        if self.database.exists(code):
            return False, "Code already in use"
        
        return True, "Valid"
```

### URL Shortener Service

```python
# shortener.py
from typing import Optional
from datetime import datetime, timedelta
import re

class URLShortener:
    """Main URL shortener service"""
    
    def __init__(self, database: URLDatabase):
        self.database = database
        self.generator = ShortCodeGenerator(database)
    
    def shorten(self, 
               original_url: str,
               custom_code: str = None,
               expires_in_days: int = None) -> URLMapping:
        """Create shortened URL"""
        
        # Validate URL
        if not self._is_valid_url(original_url):
            raise ValueError("Invalid URL format")
        
        # Generate or validate short code
        if custom_code:
            valid, message = self.generator.validate_custom_code(custom_code)
            if not valid:
                raise ValueError(f"Invalid custom code: {message}")
            short_code = custom_code
            is_custom = True
        else:
            short_code = self.generator.generate()
            is_custom = False
        
        # Calculate expiration
        expires_at = None
        if expires_in_days:
            expires_at = datetime.now() + timedelta(days=expires_in_days)
        
        # Create mapping
        mapping = URLMapping(
            short_code=short_code,
            original_url=original_url,
            created_at=datetime.now(),
            expires_at=expires_at,
            custom_code=is_custom
        )
        
        self.database.add(mapping)
        return mapping
    
    def expand(self, short_code: str) -> Optional[str]:
        """Get original URL from short code"""
        mapping = self.database.get(short_code)
        
        if not mapping:
            return None
        
        # Record click
        mapping.record_click()
        self.database.save()
        
        return mapping.original_url
    
    def get_stats(self, short_code: str) -> Optional[dict]:
        """Get statistics for short URL"""
        mapping = self.database.get(short_code)
        
        if not mapping:
            return None
        
        return {
            "short_code": mapping.short_code,
            "original_url": mapping.original_url,
            "created_at": mapping.created_at,
            "expires_at": mapping.expires_at,
            "total_clicks": mapping.clicks,
            "last_accessed": mapping.last_accessed,
            "is_expired": mapping.is_expired(),
            "clicks_today": self._count_clicks_today(mapping),
            "clicks_this_week": self._count_clicks_this_week(mapping)
        }
    
    def _is_valid_url(self, url: str) -> bool:
        """Validate URL format"""
        url_pattern = re.compile(
            r'^https?://'  # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain
            r'localhost|'  # localhost
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # IP
            r'(?::\d+)?'  # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE
        )
        return bool(url_pattern.match(url))
    
    def _count_clicks_today(self, mapping: URLMapping) -> int:
        """Count clicks from today"""
        today = datetime.now().date()
        return sum(1 for click in mapping.click_history
                  if datetime.fromisoformat(click["timestamp"]).date() == today)
    
    def _count_clicks_this_week(self, mapping: URLMapping) -> int:
        """Count clicks from past 7 days"""
        week_ago = datetime.now() - timedelta(days=7)
        return sum(1 for click in mapping.click_history
                  if datetime.fromisoformat(click["timestamp"]) > week_ago)
```

### Analytics

```python
# analytics.py
from datetime import datetime, timedelta
from collections import defaultdict

class URLAnalytics:
    """Analytics for shortened URLs"""
    
    def __init__(self, database: URLDatabase):
        self.database = database
    
    def get_total_links(self) -> int:
        """Get total number of links"""
        return len(self.database.get_all())
    
    def get_total_clicks(self) -> int:
        """Get total clicks across all links"""
        return sum(mapping.clicks for mapping in self.database.get_all())
    
    def get_most_clicked(self, limit: int = 10) -> List[URLMapping]:
        """Get most clicked URLs"""
        mappings = self.database.get_all()
        return sorted(mappings, key=lambda m: m.clicks, reverse=True)[:limit]
    
    def get_recent_links(self, limit: int = 10) -> List[URLMapping]:
        """Get recently created links"""
        mappings = self.database.get_all()
        return sorted(mappings, key=lambda m: m.created_at, reverse=True)[:limit]
    
    def get_clicks_by_day(self, days: int = 7) -> dict:
        """Get click count for each of the past N days"""
        clicks_by_day = defaultdict(int)
        cutoff = datetime.now() - timedelta(days=days)
        
        for mapping in self.database.get_all():
            for click in mapping.click_history:
                click_time = datetime.fromisoformat(click["timestamp"])
                if click_time > cutoff:
                    day = click_time.date().isoformat()
                    clicks_by_day[day] += 1
        
        return dict(clicks_by_day)
    
    def get_expiring_soon(self, days: int = 7) -> List[URLMapping]:
        """Get links expiring in the next N days"""
        expiring = []
        cutoff = datetime.now() + timedelta(days=days)
        
        for mapping in self.database.get_all():
            if mapping.expires_at and mapping.expires_at <= cutoff and not mapping.is_expired():
                expiring.append(mapping)
        
        return sorted(expiring, key=lambda m: m.expires_at)
```

### CLI Application

```python
# cli.py
def print_menu():
    print("\n" + "="*70)
    print("URL SHORTENER")
    print("="*70)
    print("1. Shorten URL")
    print("2. Expand URL")
    print("3. View Statistics")
    print("4. List All Links")
    print("5. Delete Link")
    print("6. Analytics Dashboard")
    print("7. Cleanup Expired")
    print("8. Exit")
    print("="*70)

def shorten_url(shortener: URLShortener):
    """Shorten a URL"""
    print("\n--- Shorten URL ---")
    
    url = input("Enter URL: ").strip()
    
    custom = input("Custom code (or press Enter for random): ").strip() or None
    
    expires = input("Expiration in days (or press Enter for never): ").strip()
    expires_days = int(expires) if expires else None
    
    try:
        mapping = shortener.shorten(url, custom, expires_days)
        print(f"\n✓ URL shortened!")
        print(f"Short code: {mapping.short_code}")
        print(f"Original URL: {mapping.original_url}")
        if mapping.expires_at:
            print(f"Expires: {mapping.expires_at.strftime('%Y-%m-%d %H:%M')}")
    
    except ValueError as e:
        print(f"\n✗ Error: {e}")

def expand_url(shortener: URLShortener):
    """Expand a short URL"""
    print("\n--- Expand URL ---")
    
    code = input("Enter short code: ").strip()
    
    url = shortener.expand(code)
    
    if url:
        print(f"\n✓ Original URL: {url}")
    else:
        print(f"\n✗ Short code not found or expired")

def view_stats(shortener: URLShortener):
    """View statistics for a URL"""
    print("\n--- View Statistics ---")
    
    code = input("Enter short code: ").strip()
    
    stats = shortener.get_stats(code)
    
    if not stats:
        print(f"\n✗ Short code not found")
        return
    
    print(f"\n{'='*70}")
    print(f"Short Code: {stats['short_code']}")
    print(f"Original URL: {stats['original_url']}")
    print(f"Created: {stats['created_at'].strftime('%Y-%m-%d %H:%M')}")
    if stats['expires_at']:
        print(f"Expires: {stats['expires_at'].strftime('%Y-%m-%d %H:%M')}")
    print(f"\nTotal Clicks: {stats['total_clicks']}")
    print(f"Clicks Today: {stats['clicks_today']}")
    print(f"Clicks This Week: {stats['clicks_this_week']}")
    if stats['last_accessed']:
        print(f"Last Accessed: {stats['last_accessed'].strftime('%Y-%m-%d %H:%M')}")
    print(f"{'='*70}")

def list_all_links(database: URLDatabase):
    """List all shortened URLs"""
    mappings = database.get_all()
    
    if not mappings:
        print("\nNo links yet.")
        return
    
    print(f"\n{'Code':<12} {'Clicks':<8} {'Created':<12} {'Original URL'}")
    print("-"*70)
    
    for mapping in sorted(mappings, key=lambda m: m.created_at, reverse=True):
        created = mapping.created_at.strftime("%Y-%m-%d")
        url = mapping.original_url[:40] + "..." if len(mapping.original_url) > 40 else mapping.original_url
        expired = " [EXPIRED]" if mapping.is_expired() else ""
        
        print(f"{mapping.short_code:<12} {mapping.clicks:<8} {created:<12} {url}{expired}")

def show_analytics(analytics: URLAnalytics):
    """Show analytics dashboard"""
    print("\n" + "="*70)
    print("ANALYTICS DASHBOARD")
    print("="*70)
    
    print(f"\nTotal Links: {analytics.get_total_links()}")
    print(f"Total Clicks: {analytics.get_total_clicks()}")
    
    print("\n--- Most Clicked Links ---")
    most_clicked = analytics.get_most_clicked(5)
    for i, mapping in enumerate(most_clicked, 1):
        print(f"{i}. {mapping.short_code} - {mapping.clicks} clicks - {mapping.original_url[:50]}")
    
    print("\n--- Clicks by Day (Last 7 Days) ---")
    clicks_by_day = analytics.get_clicks_by_day(7)
    for day, count in sorted(clicks_by_day.items()):
        print(f"{day}: {count} clicks")
    
    expiring = analytics.get_expiring_soon(7)
    if expiring:
        print("\n--- Expiring Soon ---")
        for mapping in expiring:
            days_left = (mapping.expires_at - datetime.now()).days
            print(f"{mapping.short_code} - expires in {days_left} days")
    
    print("="*70)

def run_url_shortener():
    """Main application"""
    database = URLDatabase()
    shortener = URLShortener(database)
    analytics = URLAnalytics(database)
    
    while True:
        print_menu()
        choice = input("\nChoice (1-8): ").strip()
        
        if choice == "1":
            shorten_url(shortener)
        
        elif choice == "2":
            expand_url(shortener)
        
        elif choice == "3":
            view_stats(shortener)
        
        elif choice == "4":
            list_all_links(database)
        
        elif choice == "5":
            code = input("\nShort code to delete: ").strip()
            if database.delete(code):
                print("✓ Link deleted")
            else:
                print("✗ Link not found")
        
        elif choice == "6":
            show_analytics(analytics)
        
        elif choice == "7":
            count = database.cleanup_expired()
            print(f"\n✓ Removed {count} expired links")
        
        elif choice == "8":
            print("\nGoodbye!")
            break
        
        else:
            print("\n✗ Invalid choice")

if __name__ == "__main__":
    run_url_shortener()
```

## Testing

```python
# test_url_shortener.py
import pytest

def test_code_generation():
    db = URLDatabase(":memory:")
    gen = ShortCodeGenerator(db)
    
    code = gen.generate(6)
    assert len(code) == 6
    assert code.isalnum()

def test_shorten_url(tmp_path):
    db = URLDatabase(str(tmp_path / "test.json"))
    shortener = URLShortener(db)
    
    mapping = shortener.shorten("https://example.com")
    assert mapping.short_code is not None
    assert mapping.original_url == "https://example.com"

def test_expand_url(tmp_path):
    db = URLDatabase(str(tmp_path / "test.json"))
    shortener = URLShortener(db)
    
    mapping = shortener.shorten("https://example.com")
    expanded = shortener.expand(mapping.short_code)
    
    assert expanded == "https://example.com"
    assert mapping.clicks == 1

def test_custom_code(tmp_path):
    db = URLDatabase(str(tmp_path / "test.json"))
    shortener = URLShortener(db)
    
    mapping = shortener.shorten("https://example.com", custom_code="mylink")
    assert mapping.short_code == "mylink"

def test_expiration(tmp_path):
    db = URLDatabase(str(tmp_path / "test.json"))
    shortener = URLShortener(db)
    
    mapping = shortener.shorten("https://example.com", expires_in_days=1)
    assert mapping.expires_at is not None
```

## Summary

Built complete URL shortener with:
- Short code generation
- URL validation
- Click tracking
- Expiration handling
- Analytics dashboard
- Custom short codes

**Skills Applied:**
- Data modeling
- Algorithm design
- File persistence
- Analytics
- URL validation
- Command-line interface
