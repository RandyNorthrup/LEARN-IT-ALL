---
id: lesson-131-set-practical-applications
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
def create_validator(valid_values):
    """Create a validator with a set of valid values"""
    return {"valid_set": set(valid_values)}

def validate(validator, items):
    """Return only valid items"""
    return [item for item in items if item in validator["valid_set"]]

def get_invalid(validator, items):
    """Return invalid items"""
    return [item for item in items if item not in validator["valid_set"]]

def all_valid(validator, items):
    """Check if all items are valid"""
    return set(items) <= validator["valid_set"]

# Usage
valid_statuses = ["pending", "approved", "rejected"]
validator = create_validator(valid_statuses)

data = ["pending", "approved", "invalid", "rejected", "bad"]
print(validate(validator, data))  # ["pending", "approved", "rejected"]
print(get_invalid(validator, data))  # ["invalid", "bad"]

# Email domain filtering
def create_email_filter(allowed_domains):
    """Create an email filter with allowed domains"""
    return {"allowed_domains": set(allowed_domains)}

def is_email_allowed(email_filter, email):
    """Check if email domain is allowed"""
    domain = email.split('@')[-1].lower()
    return domain in email_filter["allowed_domains"]

def filter_emails(email_filter, emails):
    """Return only allowed emails"""
    return [email for email in emails if is_email_allowed(email_filter, email)]

email_filter = create_email_filter(["gmail.com", "yahoo.com", "outlook.com"])
emails = [
    "user@gmail.com",
    "test@yahoo.com",
    "spam@badsite.com",
    "admin@outlook.com"
]
allowed = filter_emails(email_filter, emails)
print(allowed)  # Only Gmail, Yahoo, Outlook emails
```

## Access Control and Permissions

```python
# Role-based access control
def create_permission_system():
    """Create a permission system with user roles and role permissions"""
    return {
        "user_roles": {},      # user -> set of roles
        "role_permissions": {} # role -> set of permissions
    }

def assign_role(perms, user, role):
    """Assign role to user"""
    if user not in perms["user_roles"]:
        perms["user_roles"][user] = set()
    perms["user_roles"][user].add(role)

def grant_permission(perms, role, permission):
    """Grant permission to role"""
    if role not in perms["role_permissions"]:
        perms["role_permissions"][role] = set()
    perms["role_permissions"][role].add(permission)

def get_user_permissions(perms, user):
    """Get all permissions for user"""
    if user not in perms["user_roles"]:
        return set()
    
    permissions = set()
    for role in perms["user_roles"][user]:
        if role in perms["role_permissions"]:
            permissions |= perms["role_permissions"][role]
    return permissions

def has_permission(perms, user, permission):
    """Check if user has specific permission"""
    return permission in get_user_permissions(perms, user)

def has_all_permissions(perms, user, required_permissions):
    """Check if user has all required permissions"""
    user_perms = get_user_permissions(perms, user)
    return set(required_permissions) <= user_perms

# Setup
perms = create_permission_system()

# Define roles and permissions
grant_permission(perms, "admin", "read")
grant_permission(perms, "admin", "write")
grant_permission(perms, "admin", "delete")
grant_permission(perms, "editor", "read")
grant_permission(perms, "editor", "write")
grant_permission(perms, "viewer", "read")

# Assign roles to users
assign_role(perms, "alice", "admin")
assign_role(perms, "bob", "editor")
assign_role(perms, "charlie", "viewer")

# Check permissions
print(has_permission(perms, "alice", "delete"))  # True
print(has_permission(perms, "bob", "delete"))    # False
print(has_all_permissions(perms, "bob", ["read", "write"]))  # True
```

## Tag and Category Management

```python
# Tagging system
def create_tag_system():
    """Create a tagging system with item-to-tag and tag-to-item mappings"""
    return {
        "item_tags": {},  # item_id -> set of tags
        "tag_items": {}   # tag -> set of item_ids
    }

def tag_add(tags, item_id, tag):
    """Add tag to item"""
    tag = tag.lower()
    
    if item_id not in tags["item_tags"]:
        tags["item_tags"][item_id] = set()
    tags["item_tags"][item_id].add(tag)
    
    if tag not in tags["tag_items"]:
        tags["tag_items"][tag] = set()
    tags["tag_items"][tag].add(item_id)

def tag_add_multiple(tags, item_id, tag_list):
    """Add multiple tags to item"""
    for tag in tag_list:
        tag_add(tags, item_id, tag)

def tag_remove(tags, item_id, tag):
    """Remove tag from item"""
    tag = tag.lower()
    
    if item_id in tags["item_tags"]:
        tags["item_tags"][item_id].discard(tag)
    if tag in tags["tag_items"]:
        tags["tag_items"][tag].discard(item_id)

def tag_get(tags, item_id):
    """Get all tags for item"""
    return tags["item_tags"].get(item_id, set()).copy()

def tag_find_by_tag(tags, tag):
    """Find all items with specific tag"""
    return list(tags["tag_items"].get(tag.lower(), set()))

def tag_find_by_all_tags(tags, tag_list):
    """Find items that have ALL specified tags"""
    if not tag_list:
        return []
    
    tag_sets = [
        tags["tag_items"].get(tag.lower(), set())
        for tag in tag_list
    ]
    return list(set.intersection(*tag_sets) if tag_sets else set())

def tag_find_by_any_tag(tags, tag_list):
    """Find items that have ANY of the specified tags"""
    result = set()
    for tag in tag_list:
        result |= tags["tag_items"].get(tag.lower(), set())
    return list(result)

def tag_common_tags(tags, item1_id, item2_id):
    """Find tags common to both items"""
    tags1 = tags["item_tags"].get(item1_id, set())
    tags2 = tags["item_tags"].get(item2_id, set())
    return tags1 & tags2

# Usage
tags = create_tag_system()

# Add tags to posts
tag_add_multiple(tags, "post1", ["python", "programming", "tutorial"])
tag_add_multiple(tags, "post2", ["python", "web", "flask"])
tag_add_multiple(tags, "post3", ["javascript", "web", "tutorial"])

# Find posts
print(tag_find_by_tag(tags, "python"))  # ["post1", "post2"]
print(tag_find_by_all_tags(tags, ["python", "web"]))  # ["post2"]
print(tag_find_by_any_tag(tags, ["python", "javascript"]))  # All posts

# Common tags
print(tag_common_tags(tags, "post1", "post2"))  # {"python"}
```

## Visitor and Session Tracking

```python
from datetime import datetime, timedelta

def create_analytics_tracker():
    """Create an analytics tracker for daily visitors"""
    return {
        "daily_visitors": {},  # date -> set of user_ids
        "user_last_seen": {}   # user_id -> datetime
    }

def track_visit(tracker, user_id, date=None):
    """Track user visit"""
    if date is None:
        date = datetime.now().date()
    
    if date not in tracker["daily_visitors"]:
        tracker["daily_visitors"][date] = set()
    tracker["daily_visitors"][date].add(user_id)
    
    tracker["user_last_seen"][user_id] = datetime.now()

def get_unique_visitors(tracker, date):
    """Get unique visitor count for date"""
    return len(tracker["daily_visitors"].get(date, set()))

def get_new_visitors(tracker, date):
    """Get visitors who are new on this date"""
    today_visitors = tracker["daily_visitors"].get(date, set())
    all_previous = set()
    
    for d, visitors in tracker["daily_visitors"].items():
        if d < date:
            all_previous |= visitors
    
    return today_visitors - all_previous

def get_returning_visitors(tracker, date):
    """Get visitors who visited before"""
    today_visitors = tracker["daily_visitors"].get(date, set())
    all_previous = set()
    
    for d, visitors in tracker["daily_visitors"].items():
        if d < date:
            all_previous |= visitors
    
    return today_visitors & all_previous

def get_visitor_overlap(tracker, date1, date2):
    """Get visitors who visited on both dates"""
    visitors1 = tracker["daily_visitors"].get(date1, set())
    visitors2 = tracker["daily_visitors"].get(date2, set())
    return visitors1 & visitors2

def get_active_users(tracker, days=7):
    """Get users active in last N days"""
    cutoff = datetime.now().date() - timedelta(days=days)
    active = set()
    
    for date, visitors in tracker["daily_visitors"].items():
        if date >= cutoff:
            active |= visitors
    
    return active

# Usage
tracker = create_analytics_tracker()

# Track visits
today = datetime.now().date()
yesterday = today - timedelta(days=1)

track_visit(tracker, "user1", yesterday)
track_visit(tracker, "user2", yesterday)
track_visit(tracker, "user1", today)  # Returning
track_visit(tracker, "user3", today)  # New

print(f"Today's visitors: {get_unique_visitors(tracker, today)}")
print(f"New visitors: {len(get_new_visitors(tracker, today))}")
print(f"Returning visitors: {len(get_returning_visitors(tracker, today))}")
```

## Data Comparison and Reconciliation

```python
# Compare datasets
def create_data_comparer(dataset1, dataset2, key_field):
    """Create a comparer for two datasets keyed by a field"""
    keys1 = {item[key_field] for item in dataset1}
    keys2 = {item[key_field] for item in dataset2}
    return {
        "dataset1": dataset1,
        "dataset2": dataset2,
        "key_field": key_field,
        "keys1": keys1,
        "keys2": keys2
    }

def comparer_only_in_first(comparer):
    """Items only in first dataset"""
    unique_keys = comparer["keys1"] - comparer["keys2"]
    return [item for item in comparer["dataset1"] if item[comparer["key_field"]] in unique_keys]

def comparer_only_in_second(comparer):
    """Items only in second dataset"""
    unique_keys = comparer["keys2"] - comparer["keys1"]
    return [item for item in comparer["dataset2"] if item[comparer["key_field"]] in unique_keys]

def comparer_get_common(comparer):
    """Items in both datasets"""
    common_keys = comparer["keys1"] & comparer["keys2"]
    return [item for item in comparer["dataset1"] if item[comparer["key_field"]] in common_keys]

def comparer_get_differences(comparer):
    """All differences between datasets"""
    return {
        "only_in_first": comparer_only_in_first(comparer),
        "only_in_second": comparer_only_in_second(comparer),
        "common": comparer_get_common(comparer),
        "summary": {
            "first_count": len(comparer["dataset1"]),
            "second_count": len(comparer["dataset2"]),
            "only_first": len(comparer["keys1"] - comparer["keys2"]),
            "only_second": len(comparer["keys2"] - comparer["keys1"]),
            "common": len(comparer["keys1"] & comparer["keys2"])
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

comparer = create_data_comparer(old_users, new_users, "id")
diff = comparer_get_differences(comparer)

print(f"Removed users: {diff['only_in_first']}")  # [Alice]
print(f"Added users: {diff['only_in_second']}")    # [David]
print(f"Summary: {diff['summary']}")
```

## Graph and Network Operations

```python
# Simple graph using sets
def create_graph():
    """Create a graph with adjacency sets"""
    return {"adjacency": {}}

def graph_add_edge(graph, node1, node2):
    """Add undirected edge"""
    if node1 not in graph["adjacency"]:
        graph["adjacency"][node1] = set()
    if node2 not in graph["adjacency"]:
        graph["adjacency"][node2] = set()
    
    graph["adjacency"][node1].add(node2)
    graph["adjacency"][node2].add(node1)

def graph_get_neighbors(graph, node):
    """Get neighbors of node"""
    return graph["adjacency"].get(node, set()).copy()

def graph_common_neighbors(graph, node1, node2):
    """Find common neighbors (mutual friends)"""
    neighbors1 = graph["adjacency"].get(node1, set())
    neighbors2 = graph["adjacency"].get(node2, set())
    return neighbors1 & neighbors2

def graph_degree(graph, node):
    """Get degree (number of connections)"""
    return len(graph["adjacency"].get(node, set()))

def graph_is_connected(graph, node1, node2):
    """Check if nodes are directly connected"""
    return node2 in graph["adjacency"].get(node1, set())

def graph_all_nodes(graph):
    """Get all nodes in graph"""
    return set(graph["adjacency"].keys())

def graph_find_cliques(graph, size):
    """Find all cliques of given size"""
    # Simplified: finds fully connected subgraphs
    nodes = list(graph["adjacency"].keys())
    cliques = []
    
    # Check all combinations of 'size' nodes
    from itertools import combinations
    for combo in combinations(nodes, size):
        combo_set = set(combo)
        # Check if all pairs are connected
        is_clique = all(
            node2 in graph["adjacency"].get(node1, set())
            for i, node1 in enumerate(combo)
            for node2 in combo[i+1:]
        )
        if is_clique:
            cliques.append(combo_set)
    
    return cliques

# Social network example
network = create_graph()

# Add friendships
graph_add_edge(network, "Alice", "Bob")
graph_add_edge(network, "Alice", "Charlie")
graph_add_edge(network, "Bob", "Charlie")
graph_add_edge(network, "Bob", "David")
graph_add_edge(network, "Charlie", "David")

# Analysis
print(f"Alice's friends: {graph_get_neighbors(network, 'Alice')}")
print(f"Common friends of Alice and David: {graph_common_neighbors(network, 'Alice', 'David')}")
print(f"Triangle cliques: {graph_find_cliques(network, 3)}")
```

## Spell Checker and Dictionary Operations

```python
# Simple spell checker
def create_spell_checker(dictionary_words):
    """Create a spell checker with a dictionary set"""
    return {"dictionary": set(word.lower() for word in dictionary_words)}

def spell_is_correct(checker, word):
    """Check if word is in dictionary"""
    return word.lower() in checker["dictionary"]

def spell_check_text(checker, text):
    """Find misspelled words in text"""
    words = text.lower().split()
    misspelled = []
    
    for word in words:
        # Remove punctuation
        clean_word = ''.join(c for c in word if c.isalnum())
        if clean_word and not spell_is_correct(checker, clean_word):
            misspelled.append(clean_word)
    
    return set(misspelled)  # Return unique misspellings

def spell_suggest_corrections(checker, word, max_distance=1):
    """Suggest corrections (simplified)"""
    word = word.lower()
    suggestions = set()
    
    # One character different
    for dict_word in checker["dictionary"]:
        if len(dict_word) == len(word):
            diff_count = sum(c1 != c2 for c1, c2 in zip(word, dict_word))
            if diff_count <= max_distance:
                suggestions.add(dict_word)
    
    return suggestions

# Usage
dictionary = ["hello", "world", "python", "programming", "spell", "checker"]
checker = create_spell_checker(dictionary)

text = "Helo wrld, python programing is great"
misspelled = spell_check_text(checker, text)
print(f"Misspelled: {misspelled}")

for word in misspelled:
    suggestions = spell_suggest_corrections(checker, word)
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
