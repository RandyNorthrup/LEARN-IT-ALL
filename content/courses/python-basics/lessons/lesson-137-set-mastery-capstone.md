---
id: "145-set-mastery-capstone"
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
class AdvancedPermissionSystem:
    """
    Production-ready RBAC system with sets.
    Features: roles, permissions, inheritance, caching.
    """
    def __init__(self):
        self.roles: dict[str, set[str]] = {}  # role -> permissions
        self.role_hierarchy: dict[str, set[str]] = {}  # role -> parent roles
        self.user_roles: dict[str, set[str]] = {}  # user -> roles
        self._permission_cache: dict[str, frozenset[str]] = {}
    
    def add_role(self, role: str, permissions: set[str] = None, 
                 inherits_from: set[str] = None):
        """Add role with optional permissions and inheritance"""
        if role not in self.roles:
            self.roles[role] = set()
        
        if permissions:
            self.roles[role].update(permissions)
        
        if inherits_from:
            if role not in self.role_hierarchy:
                self.role_hierarchy[role] = set()
            self.role_hierarchy[role].update(inherits_from)
        
        # Clear cache when roles change
        self._permission_cache.clear()
    
    def get_all_permissions(self, role: str) -> frozenset[str]:
        """Get all permissions including inherited (cached)"""
        if role in self._permission_cache:
            return self._permission_cache[role]
        
        # Direct permissions
        permissions = self.roles.get(role, set()).copy()
        
        # Inherited permissions (recursive)
        visited = {role}
        stack = list(self.role_hierarchy.get(role, set()))
        
        while stack:
            parent = stack.pop()
            if parent in visited:
                continue
            visited.add(parent)
            
            # Add parent permissions
            permissions.update(self.roles.get(parent, set()))
            
            # Add parent's parents
            stack.extend(self.role_hierarchy.get(parent, set()))
        
        # Cache and return
        result = frozenset(permissions)
        self._permission_cache[role] = result
        return result
    
    def assign_role(self, user_id: str, role: str):
        """Assign role to user"""
        if role not in self.roles:
            raise ValueError(f"Role {role} does not exist")
        
        if user_id not in self.user_roles:
            self.user_roles[user_id] = set()
        self.user_roles[user_id].add(role)
    
    def revoke_role(self, user_id: str, role: str):
        """Revoke role from user"""
        if user_id in self.user_roles:
            self.user_roles[user_id].discard(role)
    
    def get_user_permissions(self, user_id: str) -> frozenset[str]:
        """Get all permissions for user"""
        user_roles = self.user_roles.get(user_id, set())
        
        all_permissions = set()
        for role in user_roles:
            all_permissions.update(self.get_all_permissions(role))
        
        return frozenset(all_permissions)
    
    def has_permission(self, user_id: str, permission: str) -> bool:
        """Check if user has specific permission"""
        return permission in self.get_user_permissions(user_id)
    
    def has_all_permissions(self, user_id: str, permissions: set[str]) -> bool:
        """Check if user has all specified permissions"""
        user_perms = self.get_user_permissions(user_id)
        return permissions.issubset(user_perms)
    
    def has_any_permission(self, user_id: str, permissions: set[str]) -> bool:
        """Check if user has any of specified permissions"""
        user_perms = self.get_user_permissions(user_id)
        return bool(permissions & user_perms)
    
    def get_users_with_permission(self, permission: str) -> set[str]:
        """Find all users with specific permission"""
        users = set()
        for user_id, roles in self.user_roles.items():
            for role in roles:
                if permission in self.get_all_permissions(role):
                    users.add(user_id)
                    break
        return users
    
    def get_role_overlap(self, role1: str, role2: str) -> dict:
        """Analyze overlap between two roles"""
        perms1 = self.get_all_permissions(role1)
        perms2 = self.get_all_permissions(role2)
        
        return {
            "common": perms1 & perms2,
            "only_role1": perms1 - perms2,
            "only_role2": perms2 - perms1,
            "total_unique": perms1 | perms2
        }

# Example usage
system = AdvancedPermissionSystem()

# Define roles with inheritance
system.add_role("viewer", {"read", "view"})
system.add_role("editor", {"create", "update"}, inherits_from={"viewer"})
system.add_role("admin", {"delete", "manage_users"}, inherits_from={"editor"})
system.add_role("super_admin", {"system_config"}, inherits_from={"admin"})

# Assign roles
system.assign_role("user1", "viewer")
system.assign_role("user2", "editor")
system.assign_role("user3", "admin")

# Check permissions
print(f"user1 permissions: {system.get_user_permissions('user1')}")
print(f"user2 permissions: {system.get_user_permissions('user2')}")
print(f"user3 permissions: {system.get_user_permissions('user3')}")

# Analyze overlap
overlap = system.get_role_overlap("editor", "admin")
print(f"\nEditor vs Admin overlap:")
print(f"  Common: {overlap['common']}")
print(f"  Only editor: {overlap['only_role1']}")
print(f"  Only admin: {overlap['only_role2']}")

# Find users with permission
users = system.get_users_with_permission("delete")
print(f"\nUsers with 'delete': {users}")
```

## Project 2: Content Recommendation Engine

```python
class RecommendationEngine:
    """
    Content recommendation using set-based similarity.
    Collaborative filtering with sets.
    """
    def __init__(self):
        self.user_interests: dict[str, set[str]] = {}
        self.item_tags: dict[str, set[str]] = {}
        self.user_interactions: dict[str, set[str]] = {}  # user -> items
    
    def add_user_interests(self, user_id: str, interests: set[str]):
        """Add or update user interests"""
        self.user_interests[user_id] = interests.copy()
    
    def add_item(self, item_id: str, tags: set[str]):
        """Add item with tags"""
        self.item_tags[item_id] = tags.copy()
    
    def record_interaction(self, user_id: str, item_id: str):
        """Record user-item interaction"""
        if user_id not in self.user_interactions:
            self.user_interactions[user_id] = set()
        self.user_interactions[user_id].add(item_id)
    
    def jaccard_similarity(self, set1: set, set2: set) -> float:
        """Calculate Jaccard similarity between two sets"""
        if not set1 or not set2:
            return 0.0
        
        intersection = len(set1 & set2)
        union = len(set1 | set2)
        return intersection / union if union > 0 else 0.0
    
    def content_based_recommendations(self, user_id: str, 
                                     top_n: int = 5) -> list[tuple[str, float]]:
        """
        Recommend items based on user interests.
        Returns list of (item_id, similarity_score).
        """
        if user_id not in self.user_interests:
            return []
        
        user_interests = self.user_interests[user_id]
        already_seen = self.user_interactions.get(user_id, set())
        
        # Calculate similarity for each unseen item
        scores = []
        for item_id, item_tags in self.item_tags.items():
            if item_id in already_seen:
                continue
            
            similarity = self.jaccard_similarity(user_interests, item_tags)
            if similarity > 0:
                scores.append((item_id, similarity))
        
        # Sort by similarity and return top N
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:top_n]
    
    def collaborative_recommendations(self, user_id: str, 
                                     top_n: int = 5) -> list[tuple[str, float]]:
        """
        Recommend items based on similar users.
        Returns list of (item_id, score).
        """
        if user_id not in self.user_interactions:
            return []
        
        user_items = self.user_interactions[user_id]
        
        # Find similar users
        similar_users = []
        for other_id, other_items in self.user_interactions.items():
            if other_id == user_id:
                continue
            
            similarity = self.jaccard_similarity(user_items, other_items)
            if similarity > 0:
                similar_users.append((other_id, similarity))
        
        # Get items from similar users
        candidate_items = {}
        for other_id, similarity in similar_users:
            other_items = self.user_interactions[other_id]
            new_items = other_items - user_items
            
            for item_id in new_items:
                if item_id not in candidate_items:
                    candidate_items[item_id] = 0.0
                candidate_items[item_id] += similarity
        
        # Sort and return top N
        scores = list(candidate_items.items())
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:top_n]
    
    def hybrid_recommendations(self, user_id: str, 
                              top_n: int = 5,
                              content_weight: float = 0.6) -> list[tuple[str, float]]:
        """
        Hybrid recommendations combining content and collaborative.
        """
        content_recs = self.content_based_recommendations(user_id, top_n * 2)
        collab_recs = self.collaborative_recommendations(user_id, top_n * 2)
        
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
    
    def explain_recommendation(self, user_id: str, item_id: str) -> dict:
        """Explain why an item is recommended"""
        if user_id not in self.user_interests:
            return {"error": "User not found"}
        
        if item_id not in self.item_tags:
            return {"error": "Item not found"}
        
        user_interests = self.user_interests[user_id]
        item_tags = self.item_tags[item_id]
        
        matching_tags = user_interests & item_tags
        user_only = user_interests - item_tags
        item_only = item_tags - user_interests
        
        return {
            "matching_interests": matching_tags,
            "user_other_interests": user_only,
            "item_other_tags": item_only,
            "similarity": self.jaccard_similarity(user_interests, item_tags)
        }

# Example usage
engine = RecommendationEngine()

# Add users with interests
engine.add_user_interests("user1", {"python", "data-science", "machine-learning"})
engine.add_user_interests("user2", {"python", "web-dev", "javascript"})
engine.add_user_interests("user3", {"python", "data-science", "statistics"})

# Add items
engine.add_item("course1", {"python", "data-science", "pandas"})
engine.add_item("course2", {"javascript", "react", "web-dev"})
engine.add_item("course3", {"python", "machine-learning", "tensorflow"})
engine.add_item("course4", {"python", "statistics", "data-science"})

# Record interactions
engine.record_interaction("user1", "course1")
engine.record_interaction("user2", "course2")
engine.record_interaction("user3", "course4")

# Get recommendations
print("Content-based recommendations for user1:")
for item_id, score in engine.content_based_recommendations("user1", 3):
    print(f"  {item_id}: {score:.3f}")

print("\nHybrid recommendations for user1:")
for item_id, score in engine.hybrid_recommendations("user1", 3):
    print(f"  {item_id}: {score:.3f}")

# Explain recommendation
explanation = engine.explain_recommendation("user1", "course3")
print(f"\nWhy course3 for user1:")
print(f"  Matching interests: {explanation['matching_interests']}")
print(f"  Similarity: {explanation['similarity']:.3f}")
```

## Project 3: Data Deduplication System

```python
class DeduplicationSystem:
    """
    Advanced deduplication with multiple strategies.
    Handles exact, fuzzy, and semantic duplicates.
    """
    def __init__(self):
        self.exact_hashes: dict[int, set[int]] = {}  # hash -> record IDs
        self.fuzzy_signatures: dict[frozenset, set[int]] = {}  # signature -> record IDs
        self.records: dict[int, dict] = {}
    
    def add_record(self, record_id: int, data: dict):
        """Add record for deduplication"""
        self.records[record_id] = data.copy()
        
        # Exact hash
        exact_hash = self._exact_hash(data)
        if exact_hash not in self.exact_hashes:
            self.exact_hashes[exact_hash] = set()
        self.exact_hashes[exact_hash].add(record_id)
        
        # Fuzzy signature
        signature = self._fuzzy_signature(data)
        if signature not in self.fuzzy_signatures:
            self.fuzzy_signatures[signature] = set()
        self.fuzzy_signatures[signature].add(record_id)
    
    def _exact_hash(self, data: dict) -> int:
        """Generate exact hash from data"""
        # Sort keys for consistency
        items = tuple(sorted(data.items()))
        return hash(items)
    
    def _fuzzy_signature(self, data: dict) -> frozenset:
        """Generate fuzzy signature (set of normalized words)"""
        words = set()
        for value in data.values():
            if isinstance(value, str):
                # Normalize: lowercase, split, remove short words
                normalized = value.lower().split()
                words.update(word for word in normalized if len(word) > 2)
        return frozenset(words)
    
    def find_exact_duplicates(self) -> list[set[int]]:
        """Find groups of exact duplicates"""
        duplicates = []
        for record_ids in self.exact_hashes.values():
            if len(record_ids) > 1:
                duplicates.append(record_ids.copy())
        return duplicates
    
    def find_fuzzy_duplicates(self, min_similarity: float = 0.7) -> list[set[int]]:
        """Find groups of fuzzy duplicates"""
        # Group by signature
        signature_groups = [
            ids for ids in self.fuzzy_signatures.values()
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
                
                sig1 = self._fuzzy_signature(self.records[id1])
                
                for id2 in group_list[i+1:]:
                    if id2 in used:
                        continue
                    
                    sig2 = self._fuzzy_signature(self.records[id2])
                    similarity = self._jaccard(sig1, sig2)
                    
                    if similarity >= min_similarity:
                        subgroup.add(id2)
                        used.add(id2)
                
                if len(subgroup) > 1:
                    subgroups.append(subgroup)
            
            duplicates.extend(subgroups)
        
        return duplicates
    
    def _jaccard(self, set1: set, set2: set) -> float:
        """Calculate Jaccard similarity"""
        if not set1 or not set2:
            return 0.0
        intersection = len(set1 & set2)
        union = len(set1 | set2)
        return intersection / union if union > 0 else 0.0
    
    def merge_duplicates(self, duplicate_group: set[int], 
                        strategy: str = "first") -> int:
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
                count = sum(1 for v in self.records[record_id].values() if v)
                if count > best_count:
                    best_count = count
                    best_id = record_id
            keep_id = best_id
        else:
            raise ValueError(f"Unknown strategy: {strategy}")
        
        # Remove others
        for record_id in duplicate_group:
            if record_id != keep_id:
                del self.records[record_id]
        
        return keep_id
    
    def get_statistics(self) -> dict:
        """Get deduplication statistics"""
        exact_dupes = self.find_exact_duplicates()
        fuzzy_dupes = self.find_fuzzy_duplicates()
        
        return {
            "total_records": len(self.records),
            "exact_duplicate_groups": len(exact_dupes),
            "exact_duplicate_records": sum(len(g) for g in exact_dupes),
            "fuzzy_duplicate_groups": len(fuzzy_dupes),
            "fuzzy_duplicate_records": sum(len(g) for g in fuzzy_dupes),
        }

# Example usage
dedup = DeduplicationSystem()

# Add records
dedup.add_record(1, {"name": "John Doe", "email": "john@example.com"})
dedup.add_record(2, {"name": "John Doe", "email": "john@example.com"})  # Exact duplicate
dedup.add_record(3, {"name": "John D.", "email": "johndoe@example.com"})  # Fuzzy duplicate
dedup.add_record(4, {"name": "Jane Smith", "email": "jane@example.com"})
dedup.add_record(5, {"name": "Jane Smith", "email": "jane.smith@example.com"})  # Fuzzy duplicate

# Find duplicates
print("Exact duplicates:")
for group in dedup.find_exact_duplicates():
    print(f"  {group}")

print("\nFuzzy duplicates:")
for group in dedup.find_fuzzy_duplicates(min_similarity=0.5):
    print(f"  {group}")

# Statistics
stats = dedup.get_statistics()
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
