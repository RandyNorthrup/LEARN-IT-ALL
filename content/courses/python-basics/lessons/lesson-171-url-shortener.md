---
id: lesson-171-url-shortener
title: "URL Shortener Service"
chapterId: ch13-practice
order: 6
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
from datetime import datetime, timedelta
import json
from pathlib import Path

def create_url_mapping(short_code, original_url, created_at=None,
                       expires_at=None, custom_code=False):
    """Create a URL mapping dictionary"""
    return {
        "short_code": short_code,
        "original_url": original_url,
        "created_at": created_at or datetime.now(),
        "expires_at": expires_at,
        "clicks": 0,
        "last_accessed": None,
        "custom_code": custom_code,
        "click_history": []
    }

def is_mapping_expired(mapping):
    """Check if URL has expired"""
    if mapping["expires_at"] is None:
        return False
    return datetime.now() > mapping["expires_at"]

def record_click(mapping, user_agent=None, ip_address=None):
    """Record a click on a URL mapping"""
    mapping["clicks"] += 1
    mapping["last_accessed"] = datetime.now()

    click_data = {
        "timestamp": datetime.now().isoformat(),
        "user_agent": user_agent,
        "ip_address": ip_address
    }
    mapping["click_history"].append(click_data)

def mapping_to_dict(mapping):
    """Convert mapping to serializable dictionary"""
    return {
        "short_code": mapping["short_code"],
        "original_url": mapping["original_url"],
        "created_at": mapping["created_at"].isoformat(),
        "expires_at": mapping["expires_at"].isoformat() if mapping["expires_at"] else None,
        "clicks": mapping["clicks"],
        "last_accessed": mapping["last_accessed"].isoformat() if mapping["last_accessed"] else None,
        "custom_code": mapping["custom_code"],
        "click_history": mapping["click_history"]
    }

def mapping_from_dict(data):
    """Create mapping from dictionary"""
    return {
        "short_code": data["short_code"],
        "original_url": data["original_url"],
        "created_at": datetime.fromisoformat(data["created_at"]),
        "expires_at": datetime.fromisoformat(data["expires_at"]) if data.get("expires_at") else None,
        "clicks": data.get("clicks", 0),
        "last_accessed": datetime.fromisoformat(data["last_accessed"]) if data.get("last_accessed") else None,
        "custom_code": data.get("custom_code", False),
        "click_history": data.get("click_history", [])
    }

def create_url_database(db_file="urls.json"):
    """Create URL database state dictionary"""
    db = {
        "db_file": db_file,
        "mappings": {}
    }
    load_url_db(db)
    return db

def save_url_db(db):
    """Save to file"""
    data = {code: mapping_to_dict(mapping) for code, mapping in db["mappings"].items()}
    Path(db["db_file"]).write_text(json.dumps(data, indent=2))

def load_url_db(db):
    """Load from file"""
    if not Path(db["db_file"]).exists():
        db["mappings"] = {}
        return

    try:
        data = json.loads(Path(db["db_file"]).read_text())
        db["mappings"] = {
            code: mapping_from_dict(mapping_data)
            for code, mapping_data in data.items()
        }
    except (json.JSONDecodeError, KeyError):
        db["mappings"] = {}

def add_mapping(db, mapping):
    """Add URL mapping"""
    db["mappings"][mapping["short_code"]] = mapping
    save_url_db(db)

def get_mapping(db, short_code):
    """Get URL mapping by short code"""
    mapping = db["mappings"].get(short_code)

    if mapping and is_mapping_expired(mapping):
        return None

    return mapping

def mapping_exists(db, short_code):
    """Check if short code exists"""
    return short_code in db["mappings"]

def delete_mapping(db, short_code):
    """Delete URL mapping"""
    if short_code in db["mappings"]:
        del db["mappings"][short_code]
        save_url_db(db)
        return True
    return False

def get_all_mappings(db):
    """Get all mappings"""
    return list(db["mappings"].values())

def cleanup_expired(db):
    """Remove expired URLs"""
    expired = [code for code, mapping in db["mappings"].items()
               if is_mapping_expired(mapping)]

    for code in expired:
        del db["mappings"][code]

    if expired:
        save_url_db(db)

    return len(expired)
```

### Short Code Generator

```python
# generator.py
import random
import string

def generate_short_code(db, length=6):
    """Generate random short code"""
    characters = string.ascii_letters + string.digits

    max_attempts = 100
    for _ in range(max_attempts):
        code = ''.join(random.choices(characters, k=length))
        if not mapping_exists(db, code):
            return code

    # If still no unique code, increase length
    return generate_short_code(db, length + 1)

def generate_readable_code(db):
    """Generate readable short code (no ambiguous characters)"""
    # Exclude I, l, 1, O, 0 to avoid confusion
    characters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"

    code = ''.join(random.choices(characters, k=6))

    if mapping_exists(db, code):
        return generate_readable_code(db)

    return code

def validate_custom_code(db, code):
    """Validate custom short code, returns (is_valid, message)"""
    if not code:
        return False, "Code cannot be empty"

    if len(code) < 3:
        return False, "Code must be at least 3 characters"

    if len(code) > 20:
        return False, "Code must be 20 characters or less"

    if not all(c.isalnum() or c in '-_' for c in code):
        return False, "Code can only contain letters, numbers, hyphens, and underscores"

    if mapping_exists(db, code):
        return False, "Code already in use"

    return True, "Valid"
```

### URL Shortener Service

```python
# shortener.py
from datetime import datetime, timedelta
import re

def shorten_url(db, original_url, custom_code=None, expires_in_days=None):
    """Create shortened URL"""

    # Validate URL
    if not is_valid_url(original_url):
        raise ValueError("Invalid URL format")

    # Generate or validate short code
    if custom_code:
        valid, message = validate_custom_code(db, custom_code)
        if not valid:
            raise ValueError(f"Invalid custom code: {message}")
        short_code = custom_code
        is_custom = True
    else:
        short_code = generate_short_code(db)
        is_custom = False

    # Calculate expiration
    expires_at = None
    if expires_in_days:
        expires_at = datetime.now() + timedelta(days=expires_in_days)

    # Create mapping
    mapping = create_url_mapping(
        short_code=short_code,
        original_url=original_url,
        created_at=datetime.now(),
        expires_at=expires_at,
        custom_code=is_custom
    )

    add_mapping(db, mapping)
    return mapping

def expand_url(db, short_code):
    """Get original URL from short code"""
    mapping = get_mapping(db, short_code)

    if not mapping:
        return None

    # Record click
    record_click(mapping)
    save_url_db(db)

    return mapping["original_url"]

def get_url_stats(db, short_code):
    """Get statistics for short URL"""
    mapping = get_mapping(db, short_code)

    if not mapping:
        return None

    return {
        "short_code": mapping["short_code"],
        "original_url": mapping["original_url"],
        "created_at": mapping["created_at"],
        "expires_at": mapping["expires_at"],
        "total_clicks": mapping["clicks"],
        "last_accessed": mapping["last_accessed"],
        "is_expired": is_mapping_expired(mapping),
        "clicks_today": _count_clicks_today(mapping),
        "clicks_this_week": _count_clicks_this_week(mapping)
    }

def is_valid_url(url):
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

def _count_clicks_today(mapping):
    """Count clicks from today"""
    today = datetime.now().date()
    return sum(1 for click in mapping["click_history"]
               if datetime.fromisoformat(click["timestamp"]).date() == today)

def _count_clicks_this_week(mapping):
    """Count clicks from past 7 days"""
    week_ago = datetime.now() - timedelta(days=7)
    return sum(1 for click in mapping["click_history"]
               if datetime.fromisoformat(click["timestamp"]) > week_ago)
```

### Analytics

```python
# analytics.py
from datetime import datetime, timedelta
from collections import defaultdict

def get_total_links(db):
    """Get total number of links"""
    return len(get_all_mappings(db))

def get_total_clicks(db):
    """Get total clicks across all links"""
    return sum(mapping["clicks"] for mapping in get_all_mappings(db))

def get_most_clicked(db, limit=10):
    """Get most clicked URLs"""
    mappings = get_all_mappings(db)
    return sorted(mappings, key=lambda m: m["clicks"], reverse=True)[:limit]

def get_recent_links(db, limit=10):
    """Get recently created links"""
    mappings = get_all_mappings(db)
    return sorted(mappings, key=lambda m: m["created_at"], reverse=True)[:limit]

def get_clicks_by_day(db, days=7):
    """Get click count for each of the past N days"""
    clicks_by_day = defaultdict(int)
    cutoff = datetime.now() - timedelta(days=days)

    for mapping in get_all_mappings(db):
        for click in mapping["click_history"]:
            click_time = datetime.fromisoformat(click["timestamp"])
            if click_time > cutoff:
                day = click_time.date().isoformat()
                clicks_by_day[day] += 1

    return dict(clicks_by_day)

def get_expiring_soon(db, days=7):
    """Get links expiring in the next N days"""
    expiring = []
    cutoff = datetime.now() + timedelta(days=days)

    for mapping in get_all_mappings(db):
        if mapping["expires_at"] and mapping["expires_at"] <= cutoff and not is_mapping_expired(mapping):
            expiring.append(mapping)

    return sorted(expiring, key=lambda m: m["expires_at"])
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

def shorten_url_ui(db):
    """Shorten a URL"""
    print("\n--- Shorten URL ---")

    url = input("Enter URL: ").strip()

    custom = input("Custom code (or press Enter for random): ").strip() or None

    expires = input("Expiration in days (or press Enter for never): ").strip()
    expires_days = int(expires) if expires else None

    try:
        mapping = shorten_url(db, url, custom, expires_days)
        print(f"\n✓ URL shortened!")
        print(f"Short code: {mapping['short_code']}")
        print(f"Original URL: {mapping['original_url']}")
        if mapping["expires_at"]:
            print(f"Expires: {mapping['expires_at'].strftime('%Y-%m-%d %H:%M')}")

    except ValueError as e:
        print(f"\n✗ Error: {e}")

def expand_url_ui(db):
    """Expand a short URL"""
    print("\n--- Expand URL ---")

    code = input("Enter short code: ").strip()

    url = expand_url(db, code)

    if url:
        print(f"\n✓ Original URL: {url}")
    else:
        print(f"\n✗ Short code not found or expired")

def view_stats_ui(db):
    """View statistics for a URL"""
    print("\n--- View Statistics ---")

    code = input("Enter short code: ").strip()

    stats = get_url_stats(db, code)

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

def list_all_links_ui(db):
    """List all shortened URLs"""
    mappings = get_all_mappings(db)

    if not mappings:
        print("\nNo links yet.")
        return

    print(f"\n{'Code':<12} {'Clicks':<8} {'Created':<12} {'Original URL'}")
    print("-"*70)

    for mapping in sorted(mappings, key=lambda m: m["created_at"], reverse=True):
        created = mapping["created_at"].strftime("%Y-%m-%d")
        url = mapping["original_url"][:40] + "..." if len(mapping["original_url"]) > 40 else mapping["original_url"]
        expired = " [EXPIRED]" if is_mapping_expired(mapping) else ""

        print(f"{mapping['short_code']:<12} {mapping['clicks']:<8} {created:<12} {url}{expired}")

def show_analytics_ui(db):
    """Show analytics dashboard"""
    print("\n" + "="*70)
    print("ANALYTICS DASHBOARD")
    print("="*70)

    print(f"\nTotal Links: {get_total_links(db)}")
    print(f"Total Clicks: {get_total_clicks(db)}")

    print("\n--- Most Clicked Links ---")
    most_clicked = get_most_clicked(db, 5)
    for i, mapping in enumerate(most_clicked, 1):
        print(f"{i}. {mapping['short_code']} - {mapping['clicks']} clicks - {mapping['original_url'][:50]}")

    print("\n--- Clicks by Day (Last 7 Days) ---")
    clicks_by_day = get_clicks_by_day(db, 7)
    for day, count in sorted(clicks_by_day.items()):
        print(f"{day}: {count} clicks")

    expiring = get_expiring_soon(db, 7)
    if expiring:
        print("\n--- Expiring Soon ---")
        for mapping in expiring:
            days_left = (mapping["expires_at"] - datetime.now()).days
            print(f"{mapping['short_code']} - expires in {days_left} days")

    print("="*70)

def run_url_shortener():
    """Main application"""
    db = create_url_database()

    while True:
        print_menu()
        choice = input("\nChoice (1-8): ").strip()

        if choice == "1":
            shorten_url_ui(db)

        elif choice == "2":
            expand_url_ui(db)

        elif choice == "3":
            view_stats_ui(db)

        elif choice == "4":
            list_all_links_ui(db)

        elif choice == "5":
            code = input("\nShort code to delete: ").strip()
            if delete_mapping(db, code):
                print("✓ Link deleted")
            else:
                print("✗ Link not found")

        elif choice == "6":
            show_analytics_ui(db)

        elif choice == "7":
            count = cleanup_expired(db)
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

def test_code_generation(tmp_path):
    db = create_url_database(str(tmp_path / "test.json"))

    code = generate_short_code(db, 6)
    assert len(code) == 6
    assert code.isalnum()

def test_shorten_url(tmp_path):
    db = create_url_database(str(tmp_path / "test.json"))

    mapping = shorten_url(db, "https://example.com")
    assert mapping["short_code"] is not None
    assert mapping["original_url"] == "https://example.com"

def test_expand_url(tmp_path):
    db = create_url_database(str(tmp_path / "test.json"))

    mapping = shorten_url(db, "https://example.com")
    expanded = expand_url(db, mapping["short_code"])

    assert expanded == "https://example.com"
    assert mapping["clicks"] == 1

def test_custom_code(tmp_path):
    db = create_url_database(str(tmp_path / "test.json"))

    mapping = shorten_url(db, "https://example.com", custom_code="mylink")
    assert mapping["short_code"] == "mylink"

def test_expiration(tmp_path):
    db = create_url_database(str(tmp_path / "test.json"))

    mapping = shorten_url(db, "https://example.com", expires_in_days=1)
    assert mapping["expires_at"] is not None
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
