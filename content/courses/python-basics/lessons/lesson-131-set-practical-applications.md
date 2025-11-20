---
id: "140-set-practical-applications"
title: "Set Practical Applications"
chapterId: ch10-sets
order: 7
duration: 30
objectives:
  - Apply sets to real-world problems
  - Build practical systems with sets
  - Master common set patterns
  - Solve data processing challenges
---

# Set Practical Applications

Real-world applications and patterns using Python sets.

## Duplicate Detection and Removal

```python
# Remove duplicates from list
def remove_duplicates(items):
    """Remove duplicates, preserve first occurrence order"""
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

numbers = [1, 2, 2, 3, 1, 4, 3, 5]
unique = remove_duplicates(numbers)
print(unique)  # [1, 2, 3, 4, 5]

# Find duplicates
def find_duplicates(items):
    """Return set of duplicate items"""
    seen = set()
    duplicates = set()
    for item in items:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    return duplicates

words = ["apple", "banana", "apple", "cherry", "banana"]
dupes = find_duplicates(words)
print(dupes)  # {"apple", "banana"}

# Count unique items
def count_unique(items):
    """Count unique items efficiently"""
    return len(set(items))

print(count_unique([1, 2, 2, 3, 3, 3]))  # 3

# Check for duplicates (boolean)
def has_duplicates(items):
    """Check if list contains any duplicates"""
    return len(items) != len(set(items))

print(has_duplicates([1, 2, 3, 4]))  # False
print(has_duplicates([1, 2, 2, 3]))  # True
```

## Data Validation and Filtering

```python
# Validate items against whitelist
class DataValidator:
    def __init__(self, valid_values):
        self.valid_set = set(valid_values)
    
    def validate(self, items):
        """Return only valid items"""
        return [item for item in items if item in self.valid_set]
    
    def get_invalid(self, items):
        """Return invalid items"""
        return [item for item in items if item not in self.valid_set]
    
    def all_valid(self, items):
        """Check if all items are valid"""
        return set(items) <= self.valid_set

# Usage
valid_statuses = ["pending", "approved", "rejected"]
validator = DataValidator(valid_statuses)

data = ["pending", "approved", "invalid", "rejected", "bad"]
print(validator.validate(data))  # ["pending", "approved", "rejected"]
print(validator.get_invalid(data))  # ["invalid", "bad"]

# Email domain filtering
class EmailFilter:
    def __init__(self, allowed_domains):
        self.allowed_domains = set(allowed_domains)
    
    def is_allowed(self, email):
        """Check if email domain is allowed"""
        domain = email.split('@')[-1].lower()
        return domain in self.allowed_domains
    
    def filter_emails(self, emails):
        """Return only allowed emails"""
        return [email for email in emails if self.is_allowed(email)]

filter = EmailFilter(["gmail.com", "yahoo.com", "outlook.com"])
emails = [
    "user@gmail.com",
    "test@yahoo.com",
    "spam@badsite.com",
    "admin@outlook.com"
]
allowed = filter.filter_emails(emails)
print(allowed)  # Only Gmail, Yahoo, Outlook emails
```

## Access Control and Permissions

```python
# Role-based access control
class PermissionSystem:
    def __init__(self):
        self.user_roles = {}  # user -> set of roles
        self.role_permissions = {}  # role -> set of permissions
    
    def assign_role(self, user, role):
        """Assign role to user"""
        if user not in self.user_roles:
            self.user_roles[user] = set()
        self.user_roles[user].add(role)
    
    def grant_permission(self, role, permission):
        """Grant permission to role"""
        if role not in self.role_permissions:
            self.role_permissions[role] = set()
        self.role_permissions[role].add(permission)
    
    def get_user_permissions(self, user):
        """Get all permissions for user"""
        if user not in self.user_roles:
            return set()
        
        permissions = set()
        for role in self.user_roles[user]:
            if role in self.role_permissions:
                permissions |= self.role_permissions[role]
        return permissions
    
    def has_permission(self, user, permission):
        """Check if user has specific permission"""
        return permission in self.get_user_permissions(user)
    
    def has_all_permissions(self, user, required_permissions):
        """Check if user has all required permissions"""
        user_perms = self.get_user_permissions(user)
        return set(required_permissions) <= user_perms

# Setup
perms = PermissionSystem()

# Define roles and permissions
perms.grant_permission("admin", "read")
perms.grant_permission("admin", "write")
perms.grant_permission("admin", "delete")
perms.grant_permission("editor", "read")
perms.grant_permission("editor", "write")
perms.grant_permission("viewer", "read")

# Assign roles to users
perms.assign_role("alice", "admin")
perms.assign_role("bob", "editor")
perms.assign_role("charlie", "viewer")

# Check permissions
print(perms.has_permission("alice", "delete"))  # True
print(perms.has_permission("bob", "delete"))    # False
print(perms.has_all_permissions("bob", ["read", "write"]))  # True
```

## Tag and Category Management

```python
# Tagging system
class TagSystem:
    def __init__(self):
        self.item_tags = {}  # item_id -> set of tags
        self.tag_items = {}  # tag -> set of item_ids
    
    def add_tag(self, item_id, tag):
        """Add tag to item"""
        tag = tag.lower()
        
        if item_id not in self.item_tags:
            self.item_tags[item_id] = set()
        self.item_tags[item_id].add(tag)
        
        if tag not in self.tag_items:
            self.tag_items[tag] = set()
        self.tag_items[tag].add(item_id)
    
    def add_tags(self, item_id, tags):
        """Add multiple tags to item"""
        for tag in tags:
            self.add_tag(item_id, tag)
    
    def remove_tag(self, item_id, tag):
        """Remove tag from item"""
        tag = tag.lower()
        
        if item_id in self.item_tags:
            self.item_tags[item_id].discard(tag)
        if tag in self.tag_items:
            self.tag_items[tag].discard(item_id)
    
    def get_tags(self, item_id):
        """Get all tags for item"""
        return self.item_tags.get(item_id, set()).copy()
    
    def find_by_tag(self, tag):
        """Find all items with specific tag"""
        return list(self.tag_items.get(tag.lower(), set()))
    
    def find_by_all_tags(self, tags):
        """Find items that have ALL specified tags"""
        if not tags:
            return []
        
        tag_sets = [
            self.tag_items.get(tag.lower(), set())
            for tag in tags
        ]
        return list(set.intersection(*tag_sets) if tag_sets else set())
    
    def find_by_any_tag(self, tags):
        """Find items that have ANY of the specified tags"""
        result = set()
        for tag in tags:
            result |= self.tag_items.get(tag.lower(), set())
        return list(result)
    
    def common_tags(self, item1_id, item2_id):
        """Find tags common to both items"""
        tags1 = self.item_tags.get(item1_id, set())
        tags2 = self.item_tags.get(item2_id, set())
        return tags1 & tags2

# Usage
tags = TagSystem()

# Add tags to posts
tags.add_tags("post1", ["python", "programming", "tutorial"])
tags.add_tags("post2", ["python", "web", "flask"])
tags.add_tags("post3", ["javascript", "web", "tutorial"])

# Find posts
print(tags.find_by_tag("python"))  # ["post1", "post2"]
print(tags.find_by_all_tags(["python", "web"]))  # ["post2"]
print(tags.find_by_any_tag(["python", "javascript"]))  # All posts

# Common tags
print(tags.common_tags("post1", "post2"))  # {"python"}
```

## Visitor and Session Tracking

```python
from datetime import datetime, timedelta

class AnalyticsTracker:
    def __init__(self):
        self.daily_visitors = {}  # date -> set of user_ids
        self.user_last_seen = {}  # user_id -> datetime
    
    def track_visit(self, user_id, date=None):
        """Track user visit"""
        if date is None:
            date = datetime.now().date()
        
        if date not in self.daily_visitors:
            self.daily_visitors[date] = set()
        self.daily_visitors[date].add(user_id)
        
        self.user_last_seen[user_id] = datetime.now()
    
    def get_unique_visitors(self, date):
        """Get unique visitor count for date"""
        return len(self.daily_visitors.get(date, set()))
    
    def get_new_visitors(self, date):
        """Get visitors who are new on this date"""
        today_visitors = self.daily_visitors.get(date, set())
        all_previous = set()
        
        for d, visitors in self.daily_visitors.items():
            if d < date:
                all_previous |= visitors
        
        return today_visitors - all_previous
    
    def get_returning_visitors(self, date):
        """Get visitors who visited before"""
        today_visitors = self.daily_visitors.get(date, set())
        all_previous = set()
        
        for d, visitors in self.daily_visitors.items():
            if d < date:
                all_previous |= visitors
        
        return today_visitors & all_previous
    
    def get_visitor_overlap(self, date1, date2):
        """Get visitors who visited on both dates"""
        visitors1 = self.daily_visitors.get(date1, set())
        visitors2 = self.daily_visitors.get(date2, set())
        return visitors1 & visitors2
    
    def get_active_users(self, days=7):
        """Get users active in last N days"""
        cutoff = datetime.now().date() - timedelta(days=days)
        active = set()
        
        for date, visitors in self.daily_visitors.items():
            if date >= cutoff:
                active |= visitors
        
        return active

# Usage
tracker = AnalyticsTracker()

# Track visits
today = datetime.now().date()
yesterday = today - timedelta(days=1)

tracker.track_visit("user1", yesterday)
tracker.track_visit("user2", yesterday)
tracker.track_visit("user1", today)  # Returning
tracker.track_visit("user3", today)  # New

print(f"Today's visitors: {tracker.get_unique_visitors(today)}")
print(f"New visitors: {len(tracker.get_new_visitors(today))}")
print(f"Returning visitors: {len(tracker.get_returning_visitors(today))}")
```

## Data Comparison and Reconciliation

```python
# Compare datasets
class DataComparer:
    def __init__(self, dataset1, dataset2, key_field):
        self.dataset1 = dataset1
        self.dataset2 = dataset2
        self.key_field = key_field
        
        self.keys1 = {item[key_field] for item in dataset1}
        self.keys2 = {item[key_field] for item in dataset2}
    
    def get_only_in_first(self):
        """Items only in first dataset"""
        unique_keys = self.keys1 - self.keys2
        return [item for item in self.dataset1 if item[self.key_field] in unique_keys]
    
    def get_only_in_second(self):
        """Items only in second dataset"""
        unique_keys = self.keys2 - self.keys1
        return [item for item in self.dataset2 if item[self.key_field] in unique_keys]
    
    def get_common(self):
        """Items in both datasets"""
        common_keys = self.keys1 & self.keys2
        return [item for item in self.dataset1 if item[self.key_field] in common_keys]
    
    def get_differences(self):
        """All differences between datasets"""
        return {
            "only_in_first": self.get_only_in_first(),
            "only_in_second": self.get_only_in_second(),
            "common": self.get_common(),
            "summary": {
                "first_count": len(self.dataset1),
                "second_count": len(self.dataset2),
                "only_first": len(self.keys1 - self.keys2),
                "only_second": len(self.keys2 - self.keys1),
                "common": len(self.keys1 & self.keys2)
            }
        }

# Usage
old_users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Charlie"}
]

new_users = [
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Charlie"},
    {"id": 4, "name": "David"}
]

comparer = DataComparer(old_users, new_users, "id")
diff = comparer.get_differences()

print(f"Removed users: {diff['only_in_first']}")  # [Alice]
print(f"Added users: {diff['only_in_second']}")    # [David]
print(f"Summary: {diff['summary']}")
```

## Graph and Network Operations

```python
# Simple graph using sets
class Graph:
    def __init__(self):
        self.adjacency = {}  # node -> set of neighbors
    
    def add_edge(self, node1, node2):
        """Add undirected edge"""
        if node1 not in self.adjacency:
            self.adjacency[node1] = set()
        if node2 not in self.adjacency:
            self.adjacency[node2] = set()
        
        self.adjacency[node1].add(node2)
        self.adjacency[node2].add(node1)
    
    def get_neighbors(self, node):
        """Get neighbors of node"""
        return self.adjacency.get(node, set()).copy()
    
    def common_neighbors(self, node1, node2):
        """Find common neighbors (mutual friends)"""
        neighbors1 = self.adjacency.get(node1, set())
        neighbors2 = self.adjacency.get(node2, set())
        return neighbors1 & neighbors2
    
    def degree(self, node):
        """Get degree (number of connections)"""
        return len(self.adjacency.get(node, set()))
    
    def is_connected(self, node1, node2):
        """Check if nodes are directly connected"""
        return node2 in self.adjacency.get(node1, set())
    
    def all_nodes(self):
        """Get all nodes in graph"""
        return set(self.adjacency.keys())
    
    def find_cliques(self, size):
        """Find all cliques of given size"""
        # Simplified: finds fully connected subgraphs
        nodes = list(self.adjacency.keys())
        cliques = []
        
        # Check all combinations of 'size' nodes
        from itertools import combinations
        for combo in combinations(nodes, size):
            combo_set = set(combo)
            # Check if all pairs are connected
            is_clique = all(
                node2 in self.adjacency.get(node1, set())
                for i, node1 in enumerate(combo)
                for node2 in combo[i+1:]
            )
            if is_clique:
                cliques.append(combo_set)
        
        return cliques

# Social network example
network = Graph()

# Add friendships
network.add_edge("Alice", "Bob")
network.add_edge("Alice", "Charlie")
network.add_edge("Bob", "Charlie")
network.add_edge("Bob", "David")
network.add_edge("Charlie", "David")

# Analysis
print(f"Alice's friends: {network.get_neighbors('Alice')}")
print(f"Common friends of Alice and David: {network.common_neighbors('Alice', 'David')}")
print(f"Triangle cliques: {network.find_cliques(3)}")
```

## Spell Checker and Dictionary Operations

```python
# Simple spell checker
class SpellChecker:
    def __init__(self, dictionary_words):
        self.dictionary = set(word.lower() for word in dictionary_words)
    
    def is_correct(self, word):
        """Check if word is in dictionary"""
        return word.lower() in self.dictionary
    
    def check_text(self, text):
        """Find misspelled words in text"""
        words = text.lower().split()
        misspelled = []
        
        for word in words:
            # Remove punctuation
            clean_word = ''.join(c for c in word if c.isalnum())
            if clean_word and not self.is_correct(clean_word):
                misspelled.append(clean_word)
        
        return set(misspelled)  # Return unique misspellings
    
    def suggest_corrections(self, word, max_distance=1):
        """Suggest corrections (simplified)"""
        word = word.lower()
        suggestions = set()
        
        # One character different
        for dict_word in self.dictionary:
            if len(dict_word) == len(word):
                diff_count = sum(c1 != c2 for c1, c2 in zip(word, dict_word))
                if diff_count <= max_distance:
                    suggestions.add(dict_word)
        
        return suggestions

# Usage
dictionary = ["hello", "world", "python", "programming", "spell", "checker"]
checker = SpellChecker(dictionary)

text = "Helo wrld, python programing is great"
misspelled = checker.check_text(text)
print(f"Misspelled: {misspelled}")

for word in misspelled:
    suggestions = checker.suggest_corrections(word)
    if suggestions:
        print(f"  {word} -> {suggestions}")
```

## Summary

**Common Set Applications:**

1. **Duplicate Management**
   - Remove duplicates
   - Find duplicates
   - Check for duplicates

2. **Data Validation**
   - Whitelist/blacklist filtering
   - Domain validation
   - Status checking

3. **Access Control**
   - Role-based permissions
   - Feature flags
   - Group memberships

4. **Tagging Systems**
   - Multiple tag management
   - Tag-based search
   - Tag overlap analysis

5. **Analytics**
   - Visitor tracking
   - User sessions
   - Activity monitoring

6. **Data Comparison**
   - Dataset reconciliation
   - Change detection
   - Overlap analysis

7. **Graph Operations**
   - Network connections
   - Common neighbors
   - Clique detection

8. **Text Processing**
   - Unique words
   - Spell checking
   - Dictionary operations

**Benefits:**
- O(1) membership testing
- Automatic duplicate removal
- Clean mathematical operations
- Memory-efficient for lookups
- Expressive code

**When to Apply:**
- Need uniqueness guarantee
- Frequent membership tests
- Set-based logic (union, intersection)
- Building collections incrementally
- Comparing datasets
