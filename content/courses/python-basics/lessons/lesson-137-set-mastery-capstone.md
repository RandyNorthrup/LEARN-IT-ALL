---
id: lesson-137-set-mastery-capstone
title: "Set Mastery Capstone"
chapterId: ch10-sets
order: 13
duration: 30
objectives:
  - Integrate all set concepts
  - Build production-ready systems
  - Master advanced set patterns
  - Complete comprehensive projects
---

# Set Mastery Capstone

Comprehensive projects integrating all set concepts and patterns.

## Project 1: Advanced Permission System

```python
def create_permission_system():
    """
    Create a production-ready RBAC system with sets.
    Features: roles, permissions, inheritance, caching.
    """
    return {
        "roles": {},            # role -> permissions
        "role_hierarchy": {},   # role -> parent roles
        "user_roles": {},       # user -> roles
        "_permission_cache": {} # role -> frozenset of permissions
    }

def perm_add_role(system, role, permissions=None, inherits_from=None):
    """Add role with optional permissions and inheritance"""
    if role not in system["roles"]:
        system["roles"][role] = set()
    
    if permissions:
        system["roles"][role].update(permissions)
    
    if inherits_from:
        if role not in system["role_hierarchy"]:
            system["role_hierarchy"][role] = set()
        system["role_hierarchy"][role].update(inherits_from)
    
    # Clear cache when roles change
    system["_permission_cache"].clear()

def perm_get_all_permissions(system, role):
    """Get all permissions including inherited (cached)"""
    if role in system["_permission_cache"]:
        return system["_permission_cache"][role]
    
    # Direct permissions
    permissions = system["roles"].get(role, set()).copy()
    
    # Inherited permissions (recursive)
    visited = {role}
    stack = list(system["role_hierarchy"].get(role, set()))
    
    while stack:
        parent = stack.pop()
        if parent in visited:
            continue
        visited.add(parent)
        
        # Add parent permissions
        permissions.update(system["roles"].get(parent, set()))
        
        # Add parent's parents
        stack.extend(system["role_hierarchy"].get(parent, set()))
    
    # Cache and return
    result = frozenset(permissions)
    system["_permission_cache"][role] = result
    return result

def perm_assign_role(system, user_id, role):
    """Assign role to user"""
    if role not in system["roles"]:
        raise ValueError(f"Role {role} does not exist")
    
    if user_id not in system["user_roles"]:
        system["user_roles"][user_id] = set()
    system["user_roles"][user_id].add(role)

def perm_revoke_role(system, user_id, role):
    """Revoke role from user"""
    if user_id in system["user_roles"]:
        system["user_roles"][user_id].discard(role)

def perm_get_user_permissions(system, user_id):
    """Get all permissions for user"""
    user_roles = system["user_roles"].get(user_id, set())
    
    all_permissions = set()
    for role in user_roles:
        all_permissions.update(perm_get_all_permissions(system, role))
    
    return frozenset(all_permissions)

def perm_has_permission(system, user_id, permission):
    """Check if user has specific permission"""
    return permission in perm_get_user_permissions(system, user_id)

def perm_has_all_permissions(system, user_id, permissions):
    """Check if user has all specified permissions"""
    user_perms = perm_get_user_permissions(system, user_id)
    return permissions.issubset(user_perms)

def perm_has_any_permission(system, user_id, permissions):
    """Check if user has any of specified permissions"""
    user_perms = perm_get_user_permissions(system, user_id)
    return bool(permissions & user_perms)

def perm_get_users_with_permission(system, permission):
    """Find all users with specific permission"""
    users = set()
    for user_id, roles in system["user_roles"].items():
        for role in roles:
            if permission in perm_get_all_permissions(system, role):
                users.add(user_id)
                break
    return users

def perm_get_role_overlap(system, role1, role2):
    """Analyze overlap between two roles"""
    perms1 = perm_get_all_permissions(system, role1)
    perms2 = perm_get_all_permissions(system, role2)
    
    return {
        "common": perms1 & perms2,
        "only_role1": perms1 - perms2,
        "only_role2": perms2 - perms1,
        "total_unique": perms1 | perms2
    }

# Example usage
system = create_permission_system()

# Define roles with inheritance
perm_add_role(system, "viewer", {"read", "view"})
perm_add_role(system, "editor", {"create", "update"}, inherits_from={"viewer"})
perm_add_role(system, "admin", {"delete", "manage_users"}, inherits_from={"editor"})
perm_add_role(system, "super_admin", {"system_config"}, inherits_from={"admin"})

# Assign roles
perm_assign_role(system, "user1", "viewer")
perm_assign_role(system, "user2", "editor")
perm_assign_role(system, "user3", "admin")

# Check permissions
print(f"user1 permissions: {perm_get_user_permissions(system, 'user1')}")
print(f"user2 permissions: {perm_get_user_permissions(system, 'user2')}")
print(f"user3 permissions: {perm_get_user_permissions(system, 'user3')}")

# Analyze overlap
overlap = perm_get_role_overlap(system, "editor", "admin")
print(f"\nEditor vs Admin overlap:")
print(f"  Common: {overlap['common']}")
print(f"  Only editor: {overlap['only_role1']}")
print(f"  Only admin: {overlap['only_role2']}")

# Find users with permission
users = perm_get_users_with_permission(system, "delete")
print(f"\nUsers with 'delete': {users}")
```

## Project 2: Content Recommendation Engine

```python
def create_recommendation_engine():
    """
    Create a content recommendation engine using set-based similarity.
    Supports content-based and collaborative filtering.
    """
    return {
        "user_interests": {},      # user -> set of interests
        "item_tags": {},           # item -> set of tags
        "user_interactions": {}    # user -> set of items
    }

def rec_add_user_interests(engine, user_id, interests):
    """Add or update user interests"""
    engine["user_interests"][user_id] = interests.copy()

def rec_add_item(engine, item_id, tags):
    """Add item with tags"""
    engine["item_tags"][item_id] = tags.copy()

def rec_record_interaction(engine, user_id, item_id):
    """Record user-item interaction"""
    if user_id not in engine["user_interactions"]:
        engine["user_interactions"][user_id] = set()
    engine["user_interactions"][user_id].add(item_id)

def rec_jaccard_similarity(set1, set2):
    """Calculate Jaccard similarity between two sets"""
    if not set1 or not set2:
        return 0.0
    
    intersection = len(set1 & set2)
    union = len(set1 | set2)
    return intersection / union if union > 0 else 0.0

def rec_content_based(engine, user_id, top_n=5):
    """
    Recommend items based on user interests.
    Returns list of (item_id, similarity_score).
    """
    if user_id not in engine["user_interests"]:
        return []
    
    user_interests = engine["user_interests"][user_id]
    already_seen = engine["user_interactions"].get(user_id, set())
    
    # Calculate similarity for each unseen item
    scores = []
    for item_id, item_tags in engine["item_tags"].items():
        if item_id in already_seen:
            continue
        
        similarity = rec_jaccard_similarity(user_interests, item_tags)
        if similarity > 0:
            scores.append((item_id, similarity))
    
    # Sort by similarity and return top N
    scores.sort(key=lambda x: x[1], reverse=True)
    return scores[:top_n]

def rec_collaborative(engine, user_id, top_n=5):
    """
    Recommend items based on similar users.
    Returns list of (item_id, score).
    """
    if user_id not in engine["user_interactions"]:
        return []
    
    user_items = engine["user_interactions"][user_id]
    
    # Find similar users
    similar_users = []
    for other_id, other_items in engine["user_interactions"].items():
        if other_id == user_id:
            continue
        
        similarity = rec_jaccard_similarity(user_items, other_items)
        if similarity > 0:
            similar_users.append((other_id, similarity))
    
    # Get items from similar users
    candidate_items = {}
    for other_id, similarity in similar_users:
        other_items = engine["user_interactions"][other_id]
        new_items = other_items - user_items
        
        for item_id in new_items:
            if item_id not in candidate_items:
                candidate_items[item_id] = 0.0
            candidate_items[item_id] += similarity
    
    # Sort and return top N
    scores = list(candidate_items.items())
    scores.sort(key=lambda x: x[1], reverse=True)
    return scores[:top_n]

def rec_hybrid(engine, user_id, top_n=5, content_weight=0.6):
    """
    Hybrid recommendations combining content and collaborative.
    """
    content_recs = rec_content_based(engine, user_id, top_n * 2)
    collab_recs = rec_collaborative(engine, user_id, top_n * 2)
    
    # Combine scores
    combined = {}
    
    # Add content-based scores
    for item_id, score in content_recs:
        combined[item_id] = score * content_weight
    
    # Add collaborative scores
    collab_weight = 1.0 - content_weight
    for item_id, score in collab_recs:
        if item_id in combined:
            combined[item_id] += score * collab_weight
        else:
            combined[item_id] = score * collab_weight
    
    # Sort and return top N
    scores = list(combined.items())
    scores.sort(key=lambda x: x[1], reverse=True)
    return scores[:top_n]

def rec_explain(engine, user_id, item_id):
    """Explain why an item is recommended"""
    if user_id not in engine["user_interests"]:
        return {"error": "User not found"}
    
    if item_id not in engine["item_tags"]:
        return {"error": "Item not found"}
    
    user_interests = engine["user_interests"][user_id]
    item_tags = engine["item_tags"][item_id]
    
    matching_tags = user_interests & item_tags
    user_only = user_interests - item_tags
    item_only = item_tags - user_interests
    
    return {
        "matching_interests": matching_tags,
        "user_other_interests": user_only,
        "item_other_tags": item_only,
        "similarity": rec_jaccard_similarity(user_interests, item_tags)
    }

# Example usage
engine = create_recommendation_engine()

# Add users with interests
rec_add_user_interests(engine, "user1", {"python", "data-science", "machine-learning"})
rec_add_user_interests(engine, "user2", {"python", "web-dev", "javascript"})
rec_add_user_interests(engine, "user3", {"python", "data-science", "statistics"})

# Add items
rec_add_item(engine, "course1", {"python", "data-science", "pandas"})
rec_add_item(engine, "course2", {"javascript", "react", "web-dev"})
rec_add_item(engine, "course3", {"python", "machine-learning", "tensorflow"})
rec_add_item(engine, "course4", {"python", "statistics", "data-science"})

# Record interactions
rec_record_interaction(engine, "user1", "course1")
rec_record_interaction(engine, "user2", "course2")
rec_record_interaction(engine, "user3", "course4")

# Get recommendations
print("Content-based recommendations for user1:")
for item_id, score in rec_content_based(engine, "user1", 3):
    print(f"  {item_id}: {score:.3f}")

print("\nHybrid recommendations for user1:")
for item_id, score in rec_hybrid(engine, "user1", 3):
    print(f"  {item_id}: {score:.3f}")

# Explain recommendation
explanation = rec_explain(engine, "user1", "course3")
print(f"\nWhy course3 for user1:")
print(f"  Matching interests: {explanation['matching_interests']}")
print(f"  Similarity: {explanation['similarity']:.3f}")
```

## Project 3: Data Deduplication System

```python
def create_dedup_system():
    """
    Create a deduplication system with multiple strategies.
    Handles exact, fuzzy, and semantic duplicates.
    """
    return {
        "exact_hashes": {},        # hash -> set of record IDs
        "fuzzy_signatures": {},    # signature -> set of record IDs
        "records": {}              # record_id -> data dict
    }

def dedup_exact_hash(data):
    """Generate exact hash from data"""
    # Sort keys for consistency
    items = tuple(sorted(data.items()))
    return hash(items)

def dedup_fuzzy_signature(data):
    """Generate fuzzy signature (set of normalized words)"""
    words = set()
    for value in data.values():
        if isinstance(value, str):
            # Normalize: lowercase, split, remove short words
            normalized = value.lower().split()
            words.update(word for word in normalized if len(word) > 2)
    return frozenset(words)

def dedup_add_record(system, record_id, data):
    """Add record for deduplication"""
    system["records"][record_id] = data.copy()
    
    # Exact hash
    exact_hash = dedup_exact_hash(data)
    if exact_hash not in system["exact_hashes"]:
        system["exact_hashes"][exact_hash] = set()
    system["exact_hashes"][exact_hash].add(record_id)
    
    # Fuzzy signature
    signature = dedup_fuzzy_signature(data)
    if signature not in system["fuzzy_signatures"]:
        system["fuzzy_signatures"][signature] = set()
    system["fuzzy_signatures"][signature].add(record_id)

def dedup_find_exact(system):
    """Find groups of exact duplicates"""
    duplicates = []
    for record_ids in system["exact_hashes"].values():
        if len(record_ids) > 1:
            duplicates.append(record_ids.copy())
    return duplicates

def dedup_jaccard(set1, set2):
    """Calculate Jaccard similarity"""
    if not set1 or not set2:
        return 0.0
    intersection = len(set1 & set2)
    union = len(set1 | set2)
    return intersection / union if union > 0 else 0.0

def dedup_find_fuzzy(system, min_similarity=0.7):
    """Find groups of fuzzy duplicates"""
    # Group by signature
    signature_groups = [
        ids for ids in system["fuzzy_signatures"].values()
        if len(ids) > 1
    ]
    
    # Further refine by similarity within groups
    duplicates = []
    for group in signature_groups:
        # Check pairwise similarity
        group_list = list(group)
        subgroups = []
        used = set()
        
        for i, id1 in enumerate(group_list):
            if id1 in used:
                continue
            
            subgroup = {id1}
            used.add(id1)
            
            sig1 = dedup_fuzzy_signature(system["records"][id1])
            
            for id2 in group_list[i+1:]:
                if id2 in used:
                    continue
                
                sig2 = dedup_fuzzy_signature(system["records"][id2])
                similarity = dedup_jaccard(sig1, sig2)
                
                if similarity >= min_similarity:
                    subgroup.add(id2)
                    used.add(id2)
            
            if len(subgroup) > 1:
                subgroups.append(subgroup)
        
        duplicates.extend(subgroups)
    
    return duplicates

def dedup_merge(system, duplicate_group, strategy="first"):
    """
    Merge duplicate records.
    Strategy: 'first' (keep first), 'most_complete' (most fields).
    """
    if not duplicate_group:
        return None
    
    if strategy == "first":
        keep_id = min(duplicate_group)
    elif strategy == "most_complete":
        # Keep record with most non-empty fields
        best_id = None
        best_count = 0
        for record_id in duplicate_group:
            count = sum(1 for v in system["records"][record_id].values() if v)
            if count > best_count:
                best_count = count
                best_id = record_id
        keep_id = best_id
    else:
        raise ValueError(f"Unknown strategy: {strategy}")
    
    # Remove others
    for record_id in duplicate_group:
        if record_id != keep_id:
            del system["records"][record_id]
    
    return keep_id

def dedup_get_statistics(system):
    """Get deduplication statistics"""
    exact_dupes = dedup_find_exact(system)
    fuzzy_dupes = dedup_find_fuzzy(system)
    
    return {
        "total_records": len(system["records"]),
        "exact_duplicate_groups": len(exact_dupes),
        "exact_duplicate_records": sum(len(g) for g in exact_dupes),
        "fuzzy_duplicate_groups": len(fuzzy_dupes),
        "fuzzy_duplicate_records": sum(len(g) for g in fuzzy_dupes),
    }

# Example usage
dedup = create_dedup_system()

# Add records
dedup_add_record(dedup, 1, {"name": "John Doe", "email": "john@example.com"})
dedup_add_record(dedup, 2, {"name": "John Doe", "email": "john@example.com"})  # Exact duplicate
dedup_add_record(dedup, 3, {"name": "John D.", "email": "johndoe@example.com"})  # Fuzzy duplicate
dedup_add_record(dedup, 4, {"name": "Jane Smith", "email": "jane@example.com"})
dedup_add_record(dedup, 5, {"name": "Jane Smith", "email": "jane.smith@example.com"})  # Fuzzy duplicate

# Find duplicates
print("Exact duplicates:")
for group in dedup_find_exact(dedup):
    print(f"  {group}")

print("\nFuzzy duplicates:")
for group in dedup_find_fuzzy(dedup, min_similarity=0.5):
    print(f"  {group}")

# Statistics
stats = dedup_get_statistics(dedup)
print(f"\nStatistics:")
for key, value in stats.items():
    print(f"  {key}: {value}")
```

## Set Mastery Checklist

### Core Concepts ✓
- [ ] Understand set properties (unique, unordered, mutable)
- [ ] Know hashability requirements
- [ ] Master O(1) membership testing
- [ ] Understand when to use sets vs other structures

### Operations ✓
- [ ] Mathematical operations (union, intersection, difference, symmetric difference)
- [ ] Comparison operations (subset, superset, disjoint)
- [ ] Modification methods (add, update, remove, discard, pop, clear)
- [ ] Operator vs method differences

### Advanced Techniques ✓
- [ ] Set comprehensions with complex logic
- [ ] frozenset for immutability and hashability
- [ ] Set-based algorithms (graph, clustering, filtering)
- [ ] Chaining operations effectively

### Performance ✓
- [ ] Know time complexities (O(1) for most operations)
- [ ] Understand memory trade-offs
- [ ] Optimize with batch operations
- [ ] Use sets for performance gains

### Integration ✓
- [ ] Use with collections module (Counter, defaultdict)
- [ ] Combine with itertools (combinations, product)
- [ ] Apply with functools (reduce, cache)
- [ ] Integrate across standard library

### Production Patterns ✓
- [ ] Permission and access control systems
- [ ] Data deduplication and validation
- [ ] Content recommendation engines
- [ ] Graph and network operations
- [ ] Caching strategies
- [ ] State machines

### Best Practices ✓
- [ ] Type hints for clarity
- [ ] Safe operations (discard vs remove)
- [ ] Immutability with frozenset
- [ ] Clear naming conventions
- [ ] Comprehensive error handling
- [ ] Performance optimization

## Summary

You've mastered sets by building three production systems:

1. **Permission System**: RBAC with inheritance, caching, and role analysis
2. **Recommendation Engine**: Content and collaborative filtering with sets
3. **Deduplication System**: Exact and fuzzy duplicate detection and merging

**Key Achievements:**
- Production-ready set-based architectures
- Advanced algorithms with sets
- Performance optimization techniques
- Integration with Python ecosystem
- Professional coding patterns

**Sets Excel At:**
- Membership testing (O(1))
- Removing duplicates
- Set operations (union, intersection, etc.)
- Tracking unique items
- Permission and access control
- Data comparison and validation
- Graph and network operations

**Remember:**
- Use sets for uniqueness and fast lookup
- Use frozenset when immutability needed
- Combine set operations for complex logic
- Profile performance for your use case
- Type hints improve code quality
- Cache expensive set computations

Congratulations on mastering Python sets!
