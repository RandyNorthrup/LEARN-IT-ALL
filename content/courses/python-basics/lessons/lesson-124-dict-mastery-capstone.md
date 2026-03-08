---
id: lesson-124-dict-mastery-capstone
title: "Dictionary Mastery: Comprehensive Capstone"
chapterId: ch9-dictionaries
order: 15
duration: 30
objectives:
  - Integrate all dictionary concepts
  - Build production-ready applications
  - Master advanced patterns
  - Review best practices comprehensively
---

# Dictionary Mastery: Comprehensive Capstone

Integrating all dictionary concepts into real-world applications.

## Complete Data Processing Pipeline

```python
from collections import defaultdict, Counter
from typing import Dict, List, Any
import json

# Complete data processing pipeline using functions and dicts
def create_pipeline():
    """Create a data processing pipeline"""
    return {
        "data": [],
        "indexes": {},
        "stats": {}
    }

def pipeline_load_data(pipeline, records):
    """Load and index data"""
    pipeline["data"] = records
    _pipeline_build_indexes(pipeline)
    _pipeline_calculate_stats(pipeline)

def _pipeline_build_indexes(pipeline):
    """Build indexes for fast lookups"""
    for field in ["id", "category", "status"]:
        pipeline["indexes"][field] = defaultdict(list)
        for idx, record in enumerate(pipeline["data"]):
            if field in record:
                pipeline["indexes"][field][record[field]].append(idx)

def _pipeline_calculate_stats(pipeline):
    """Calculate statistics"""
    data = pipeline["data"]
    pipeline["stats"] = {
        "total_records": len(data),
        "categories": Counter(r.get("category") for r in data),
        "status": Counter(r.get("status") for r in data),
        "avg_value": sum(r.get("value", 0) for r in data) / len(data) if data else 0
    }

def pipeline_find_by(pipeline, **kwargs):
    """Find records by criteria"""
    # Use index if available
    if len(kwargs) == 1:
        field, value = next(iter(kwargs.items()))
        if field in pipeline["indexes"]:
            indices = pipeline["indexes"][field].get(value, [])
            return [pipeline["data"][i] for i in indices]
    
    # Full scan for multiple criteria
    return [
        record for record in pipeline["data"]
        if all(record.get(k) == v for k, v in kwargs.items())
    ]

def pipeline_aggregate(pipeline, group_by, agg_field, operation="sum"):
    """Aggregate data by field"""
    groups = defaultdict(list)
    for record in pipeline["data"]:
        key = record.get(group_by)
        value = record.get(agg_field, 0)
        groups[key].append(value)
    
    if operation == "sum":
        return {k: sum(v) for k, v in groups.items()}
    elif operation == "avg":
        return {k: sum(v) / len(v) for k, v in groups.items()}
    elif operation == "count":
        return {k: len(v) for k, v in groups.items()}
    elif operation == "max":
        return {k: max(v) for k, v in groups.items()}
    elif operation == "min":
        return {k: min(v) for k, v in groups.items()}
    return {}

def pipeline_transform(pipeline, transformers):
    """Transform records"""
    transformed = []
    for record in pipeline["data"]:
        new_record = {}
        for field, transformer in transformers.items():
            if field in record:
                new_record[field] = transformer(record[field])
        transformed.append(new_record)
    return transformed

def pipeline_export_summary(pipeline):
    """Export complete summary"""
    return {
        "stats": pipeline["stats"],
        "sample": pipeline["data"][:5],
        "category_breakdown": dict(pipeline["stats"]["categories"]),
        "top_categories": pipeline["stats"]["categories"].most_common(3)
    }

# Example usage
pipeline = create_pipeline()

records = [
    {"id": 1, "category": "A", "status": "active", "value": 100},
    {"id": 2, "category": "B", "status": "active", "value": 150},
    {"id": 3, "category": "A", "status": "inactive", "value": 75},
    {"id": 4, "category": "C", "status": "active", "value": 200},
    {"id": 5, "category": "A", "status": "active", "value": 125},
]

pipeline_load_data(pipeline, records)

# Find records
active_records = pipeline_find_by(pipeline, status="active")
print(f"Active records: {len(active_records)}")

# Aggregate
totals = pipeline_aggregate(pipeline, "category", "value", "sum")
print(f"Totals by category: {totals}")  # {'A': 300, 'B': 150, 'C': 200}

# Transform
transformed = pipeline_transform(pipeline, {
    "value": lambda x: x * 1.1  # 10% increase
})
print(f"Transformed: {transformed[0]}")

# Export summary
summary = pipeline_export_summary(pipeline)
print(json.dumps(summary, indent=2))
```

## Advanced Cache System

```python
from collections import OrderedDict
from typing import Any, Optional, Callable, Dict
import time
import functools

# Multi-level cache with LRU and TTL using functions
def create_advanced_cache(max_size=100, ttl=3600):
    """Create an advanced cache with LRU eviction and TTL expiration"""
    return {
        "_max_size": max_size,
        "_ttl": ttl,
        "_cache": OrderedDict(),
        "_timestamps": {},
        "_hits": 0,
        "_misses": 0
    }

def cache_get(cache, key):
    """Get with LRU and TTL check"""
    if key not in cache["_cache"]:
        cache["_misses"] += 1
        return None
    
    # Check TTL
    if time.time() - cache["_timestamps"][key] > cache["_ttl"]:
        _cache_remove(cache, key)
        cache["_misses"] += 1
        return None
    
    # Move to end (most recently used)
    cache["_cache"].move_to_end(key)
    cache["_hits"] += 1
    return cache["_cache"][key]

def cache_set(cache, key, value):
    """Set with LRU eviction"""
    if key in cache["_cache"]:
        cache["_cache"].move_to_end(key)
    else:
        if len(cache["_cache"]) >= cache["_max_size"]:
            # Remove least recently used
            oldest = next(iter(cache["_cache"]))
            _cache_remove(cache, oldest)
    
    cache["_cache"][key] = value
    cache["_timestamps"][key] = time.time()

def _cache_remove(cache, key):
    """Remove from cache"""
    del cache["_cache"][key]
    del cache["_timestamps"][key]

def cache_clear_expired(cache):
    """Remove all expired entries"""
    current_time = time.time()
    expired = [
        k for k, t in cache["_timestamps"].items()
        if current_time - t > cache["_ttl"]
    ]
    for key in expired:
        _cache_remove(cache, key)

def cache_stats(cache):
    """Cache statistics"""
    total = cache["_hits"] + cache["_misses"]
    hit_rate = cache["_hits"] / total if total > 0 else 0
    return {
        "size": len(cache["_cache"]),
        "max_size": cache["_max_size"],
        "hits": cache["_hits"],
        "misses": cache["_misses"],
        "hit_rate": f"{hit_rate:.2%}"
    }

# Usage
cache = create_advanced_cache(max_size=3, ttl=60)

cache_set(cache, "user:1", {"name": "Alice", "age": 30})
cache_set(cache, "user:2", {"name": "Bob", "age": 25})
cache_set(cache, "user:3", {"name": "Charlie", "age": 35})

print(cache_get(cache, "user:1"))  # Hit
cache_set(cache, "user:4", {"name": "David", "age": 28})  # Evicts user:2 (LRU)
print(cache_get(cache, "user:2"))  # None (evicted)

print(cache_stats(cache))
# {'size': 3, 'max_size': 3, 'hits': 1, 'misses': 1, 'hit_rate': '50.00%'}

# Decorator for function caching
def cached(cache_instance):
    """Decorator for caching function results"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Create cache key from args
            key = f"{func.__name__}:{args}:{sorted(kwargs.items())}"
            
            # Try cache first
            result = cache_get(cache_instance, key)
            if result is not None:
                return result
            
            # Compute and cache
            result = func(*args, **kwargs)
            cache_set(cache_instance, key, result)
            return result
        return wrapper
    return decorator

@cached(cache)
def expensive_computation(n):
    """Simulated expensive function"""
    time.sleep(0.1)  # Simulate work
    return n * n

# First call: slow
start = time.time()
result = expensive_computation(10)
print(f"First call: {time.time() - start:.2f}s")

# Second call: fast (cached)
start = time.time()
result = expensive_computation(10)
print(f"Cached call: {time.time() - start:.4f}s")
```

## Complex State Machine

```python
from typing import Dict, List, Callable, Any, Optional
from collections import defaultdict

# Production-ready state machine using functions and dicts
def create_state_machine(initial_state):
    """Create a production-ready state machine"""
    return {
        "state": initial_state,
        "transitions": defaultdict(dict),
        "handlers": {},
        "guards": {},
        "history": []
    }

def sm_add_transition(sm, from_state, event, to_state, guard=None):
    """Add state transition with optional guard"""
    sm["transitions"][from_state][event] = to_state
    if guard:
        sm["guards"][(from_state, event)] = guard

def sm_add_handler(sm, state, handler):
    """Add state entry handler"""
    sm["handlers"][state] = handler

def sm_trigger(sm, event, **context):
    """Trigger event with context"""
    if event not in sm["transitions"][sm["state"]]:
        return False
    
    # Check guard condition
    guard_key = (sm["state"], event)
    if guard_key in sm["guards"]:
        if not sm["guards"][guard_key](context):
            return False
    
    # Execute transition
    old_state = sm["state"]
    sm["state"] = sm["transitions"][sm["state"]][event]
    
    # Record history
    sm["history"].append({
        "from": old_state,
        "event": event,
        "to": sm["state"],
        "context": context.copy()
    })
    
    # Execute handler
    if sm["state"] in sm["handlers"]:
        sm["handlers"][sm["state"]](context)
    
    return True

def sm_can_trigger(sm, event, **context):
    """Check if event can be triggered"""
    if event not in sm["transitions"][sm["state"]]:
        return False
    
    guard_key = (sm["state"], event)
    if guard_key in sm["guards"]:
        return sm["guards"][guard_key](context)
    
    return True

def sm_get_available_events(sm):
    """Get available events in current state"""
    return list(sm["transitions"][sm["state"]].keys())

def sm_get_history(sm):
    """Get state transition history"""
    return sm["history"].copy()

# Order processing system
order_sm = create_state_machine("pending")

# Define transitions
sm_add_transition(order_sm, "pending", "confirm", "confirmed")
sm_add_transition(order_sm, "confirmed", "ship", "shipped",
                 guard=lambda ctx: ctx.get("payment_received", False))
sm_add_transition(order_sm, "shipped", "deliver", "delivered")
sm_add_transition(order_sm, "delivered", "return", "returned",
                 guard=lambda ctx: ctx.get("within_return_window", False))
sm_add_transition(order_sm, "pending", "cancel", "cancelled")
sm_add_transition(order_sm, "confirmed", "cancel", "cancelled")

# Add handlers
sm_add_handler(order_sm, "confirmed", lambda ctx: print(f"Order confirmed: {ctx.get('order_id')}"))
sm_add_handler(order_sm, "shipped", lambda ctx: print(f"Order shipped: {ctx.get('tracking')}"))
sm_add_handler(order_sm, "delivered", lambda ctx: print(f"Order delivered to: {ctx.get('address')}"))

# Process order
print(f"Current state: {order_sm['state']}")
print(f"Available events: {sm_get_available_events(order_sm)}")

sm_trigger(order_sm, "confirm", order_id="ORD-001")
print(f"State: {order_sm['state']}")

# Try shipping without payment
can_ship = sm_can_trigger(order_sm, "ship", payment_received=False)
print(f"Can ship without payment: {can_ship}")  # False

# Ship with payment
sm_trigger(order_sm, "ship", payment_received=True, tracking="TRK-123")
sm_trigger(order_sm, "deliver", address="123 Main St")

# View history
for entry in sm_get_history(order_sm):
    print(f"{entry['from']} --[{entry['event']}]--> {entry['to']}")
```

## Multi-Index Database

```python
from typing import Dict, List, Set, Any, Optional
from collections import defaultdict

# In-memory database with multiple indexes using functions
def create_multi_index_db():
    """Create an in-memory database with multiple indexes"""
    return {
        "_data": {},               # Primary key -> record
        "_indexes": defaultdict(lambda: defaultdict(set)),
        "_unique_indexes": defaultdict(dict),
        "_next_id": 1
    }

def db_create_index(db, field, unique=False):
    """Create index on field"""
    if unique:
        db["_unique_indexes"][field] = {}
    else:
        db["_indexes"][field] = defaultdict(set)
    
    # Build index for existing data
    for pk, record in db["_data"].items():
        if field in record:
            value = record[field]
            if unique:
                db["_unique_indexes"][field][value] = pk
            else:
                db["_indexes"][field][value].add(pk)

def db_insert(db, record):
    """Insert record"""
    pk = str(db["_next_id"])
    db["_next_id"] += 1
    
    # Check unique constraints
    for field, index in db["_unique_indexes"].items():
        if field in record:
            value = record[field]
            if value in index:
                raise ValueError(f"Duplicate value for unique field {field}: {value}")
    
    # Store record
    db["_data"][pk] = record
    
    # Update indexes
    for field, value in record.items():
        if field in db["_indexes"]:
            db["_indexes"][field][value].add(pk)
        if field in db["_unique_indexes"]:
            db["_unique_indexes"][field][value] = pk
    
    return pk

def db_find_by_pk(db, pk):
    """Find by primary key"""
    return db["_data"].get(pk)

def db_find_by_index(db, field, value):
    """Find using index"""
    if field in db["_unique_indexes"]:
        pk = db["_unique_indexes"][field].get(value)
        return [db["_data"][pk]] if pk else []
    
    if field in db["_indexes"]:
        pks = db["_indexes"][field].get(value, set())
        return [db["_data"][pk] for pk in pks]
    
    # Full scan
    return [r for r in db["_data"].values() if r.get(field) == value]

def db_update(db, pk, updates):
    """Update record"""
    if pk not in db["_data"]:
        return False
    
    old_record = db["_data"][pk]
    
    # Remove from old indexes
    for field, value in old_record.items():
        if field in db["_indexes"]:
            db["_indexes"][field][value].discard(pk)
        if field in db["_unique_indexes"] and field not in updates:
            del db["_unique_indexes"][field][value]
    
    # Update record
    db["_data"][pk].update(updates)
    
    # Update indexes
    for field, value in db["_data"][pk].items():
        if field in db["_indexes"]:
            db["_indexes"][field][value].add(pk)
        if field in db["_unique_indexes"]:
            db["_unique_indexes"][field][value] = pk
    
    return True

def db_delete(db, pk):
    """Delete record"""
    if pk not in db["_data"]:
        return False
    
    record = db["_data"][pk]
    
    # Remove from indexes
    for field, value in record.items():
        if field in db["_indexes"]:
            db["_indexes"][field][value].discard(pk)
        if field in db["_unique_indexes"]:
            del db["_unique_indexes"][field][value]
    
    del db["_data"][pk]
    return True

def db_stats(db):
    """Database statistics"""
    return {
        "total_records": len(db["_data"]),
        "indexes": list(db["_indexes"].keys()),
        "unique_indexes": list(db["_unique_indexes"].keys())
    }

# Usage
db = create_multi_index_db()

# Create indexes
db_create_index(db, "email", unique=True)
db_create_index(db, "city", unique=False)

# Insert records
pk1 = db_insert(db, {"name": "Alice", "email": "alice@example.com", "city": "NYC"})
pk2 = db_insert(db, {"name": "Bob", "email": "bob@example.com", "city": "LA"})
pk3 = db_insert(db, {"name": "Charlie", "email": "charlie@example.com", "city": "NYC"})

# Find by unique index (fast O(1))
users = db_find_by_index(db, "email", "alice@example.com")
print(f"Found by email: {users[0]['name']}")

# Find by non-unique index (fast O(k) where k = matching records)
nyc_users = db_find_by_index(db, "city", "NYC")
print(f"NYC users: {[u['name'] for u in nyc_users]}")

# Update
db_update(db, pk1, {"city": "SF"})

# Stats
print(db_stats(db))
```

## Integration Example: Complete Application

```python
from typing import Dict, List, Any, Optional
import json
import time

# Complete user management system using functions and dicts
def create_user_system():
    """Create a user management system"""
    return {
        "users": {},
        "email_index": {},           # email -> user_id
        "cache": create_advanced_cache(max_size=50, ttl=300),
        "activity_log": []
    }

def ums_create_user(system, user_data):
    """Create new user"""
    # Validate
    required = ["name", "email"]
    if not all(f in user_data for f in required):
        raise ValueError("Missing required fields")
    
    # Check duplicate
    if user_data["email"] in system["email_index"]:
        raise ValueError("Email already exists")
    
    # Generate ID
    user_id = f"user_{len(system['users']) + 1}"
    
    # Store user
    user = {
        "id": user_id,
        "name": user_data["name"],
        "email": user_data["email"],
        "created_at": time.time(),
        "profile": user_data.get("profile", {}),
        "preferences": user_data.get("preferences", {})
    }
    
    system["users"][user_id] = user
    system["email_index"][user["email"]] = user_id
    
    # Log activity
    _ums_log_activity(system, "create_user", user_id)
    
    return user_id

def ums_get_user(system, user_id):
    """Get user with caching"""
    # Try cache
    cached = cache_get(system["cache"], f"user:{user_id}")
    if cached:
        return cached
    
    # Load from storage
    user = system["users"].get(user_id)
    if user:
        cache_set(system["cache"], f"user:{user_id}", user.copy())
    
    return user

def ums_update_user(system, user_id, updates):
    """Update user"""
    if user_id not in system["users"]:
        return False
    
    # Update
    system["users"][user_id].update(updates)
    
    # Invalidate cache
    if f"user:{user_id}" in system["cache"]["_cache"]:
        _cache_remove(system["cache"], f"user:{user_id}")
    
    # Log
    _ums_log_activity(system, "update_user", user_id, updates)
    
    return True

def ums_find_by_email(system, email):
    """Find user by email (indexed)"""
    user_id = system["email_index"].get(email)
    return ums_get_user(system, user_id) if user_id else None

def ums_get_statistics(system):
    """Get system statistics"""
    return {
        "total_users": len(system["users"]),
        "cache_stats": cache_stats(system["cache"]),
        "recent_activity": system["activity_log"][-10:],
        "emails_registered": len(system["email_index"])
    }

def ums_export_data(system):
    """Export all data as JSON"""
    export = {
        "users": list(system["users"].values()),
        "statistics": ums_get_statistics(system)
    }
    return json.dumps(export, indent=2)

def _ums_log_activity(system, action, user_id, details=None):
    """Log user activity"""
    system["activity_log"].append({
        "action": action,
        "user_id": user_id,
        "details": details,
        "timestamp": time.time()
    })

# Usage
system = create_user_system()

# Create users
user1_id = ums_create_user(system, {
    "name": "Alice",
    "email": "alice@example.com",
    "profile": {"age": 30, "city": "NYC"}
})

user2_id = ums_create_user(system, {
    "name": "Bob",
    "email": "bob@example.com",
    "preferences": {"theme": "dark", "notifications": True}
})

# Get user (cached)
user = ums_get_user(system, user1_id)
print(f"User: {user['name']}")

# Find by email (indexed)
user = ums_find_by_email(system, "alice@example.com")
print(f"Found: {user['name']}")

# Update
ums_update_user(system, user1_id, {"profile": {"age": 31, "city": "SF"}})

# Statistics
stats = ums_get_statistics(system)
print(json.dumps(stats, indent=2))

# Export
exported = ums_export_data(system)
print("Data exported successfully")
```

## Summary

**Key Integration Points:**

1. **Data Management**
   - Indexing for fast lookups
   - Aggregation and statistics
   - Transformation pipelines

2. **Performance**
   - Caching with LRU and TTL
   - Multiple index types
   - Efficient lookups

3. **State Management**
   - State machines with guards
   - History tracking
   - Event handling

4. **Persistence**
   - JSON serialization
   - Configuration management
   - Data export/import

**Production Patterns:**

- ✅ Multiple indexes for different access patterns
- ✅ Caching for frequently accessed data
- ✅ Validation before data modification
- ✅ Activity logging for auditing
- ✅ Statistics for monitoring
- ✅ Clear error handling
- ✅ Type hints for documentation
- ✅ Comprehensive testing approach

**Complete Dict Mastery Checklist:**

- ✅ Creation and initialization
- ✅ Access and modification patterns
- ✅ Iteration techniques
- ✅ All built-in methods
- ✅ Keys and values requirements
- ✅ Copying and merging strategies
- ✅ Performance characteristics
- ✅ defaultdict and Counter
- ✅ Advanced techniques (OrderedDict, ChainMap)
- ✅ Best practices and anti-patterns
- ✅ Real-world applications
- ✅ Dict comprehensions
- ✅ JSON serialization
- ✅ Complete integration

**You now have mastery of Python dictionaries!** 🎯
