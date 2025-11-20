---
id: "133-dict-mastery-capstone"
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

class DataPipeline:
    """Complete data processing with dicts"""
    
    def __init__(self):
        self.data: List[Dict[str, Any]] = []
        self.indexes: Dict[str, Dict[Any, List[int]]] = {}
        self.stats: Dict[str, Any] = {}
    
    def load_data(self, records: List[Dict[str, Any]]):
        """Load and index data"""
        self.data = records
        self._build_indexes()
        self._calculate_stats()
    
    def _build_indexes(self):
        """Build indexes for fast lookups"""
        # Index by each field
        for field in ["id", "category", "status"]:
            self.indexes[field] = defaultdict(list)
            for idx, record in enumerate(self.data):
                if field in record:
                    self.indexes[field][record[field]].append(idx)
    
    def _calculate_stats(self):
        """Calculate statistics"""
        self.stats = {
            "total_records": len(self.data),
            "categories": Counter(r.get("category") for r in self.data),
            "status": Counter(r.get("status") for r in self.data),
            "avg_value": sum(r.get("value", 0) for r in self.data) / len(self.data) if self.data else 0
        }
    
    def find_by(self, **kwargs) -> List[Dict[str, Any]]:
        """Find records by criteria"""
        # Use index if available
        if len(kwargs) == 1:
            field, value = next(iter(kwargs.items()))
            if field in self.indexes:
                indices = self.indexes[field].get(value, [])
                return [self.data[i] for i in indices]
        
        # Full scan for multiple criteria
        return [
            record for record in self.data
            if all(record.get(k) == v for k, v in kwargs.items())
        ]
    
    def aggregate(self, group_by: str, agg_field: str, operation: str = "sum") -> Dict[Any, float]:
        """Aggregate data by field"""
        groups = defaultdict(list)
        for record in self.data:
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
    
    def transform(self, transformers: Dict[str, callable]) -> List[Dict[str, Any]]:
        """Transform records"""
        transformed = []
        for record in self.data:
            new_record = {}
            for field, transformer in transformers.items():
                if field in record:
                    new_record[field] = transformer(record[field])
            transformed.append(new_record)
        return transformed
    
    def export_summary(self) -> Dict[str, Any]:
        """Export complete summary"""
        return {
            "stats": self.stats,
            "sample": self.data[:5],
            "category_breakdown": dict(self.stats["categories"]),
            "top_categories": self.stats["categories"].most_common(3)
        }

# Example usage
pipeline = DataPipeline()

records = [
    {"id": 1, "category": "A", "status": "active", "value": 100},
    {"id": 2, "category": "B", "status": "active", "value": 150},
    {"id": 3, "category": "A", "status": "inactive", "value": 75},
    {"id": 4, "category": "C", "status": "active", "value": 200},
    {"id": 5, "category": "A", "status": "active", "value": 125},
]

pipeline.load_data(records)

# Find records
active_records = pipeline.find_by(status="active")
print(f"Active records: {len(active_records)}")

# Aggregate
totals = pipeline.aggregate("category", "value", "sum")
print(f"Totals by category: {totals}")  # {'A': 300, 'B': 150, 'C': 200}

# Transform
transformed = pipeline.transform({
    "value": lambda x: x * 1.1  # 10% increase
})
print(f"Transformed: {transformed[0]}")

# Export summary
summary = pipeline.export_summary()
print(json.dumps(summary, indent=2))
```

## Advanced Cache System

```python
from collections import OrderedDict
from typing import Any, Optional, Callable
import time
import functools

class AdvancedCache:
    """Multi-level cache with LRU and TTL"""
    
    def __init__(self, max_size=100, ttl=3600):
        self.max_size = max_size
        self.ttl = ttl
        self.cache: OrderedDict = OrderedDict()
        self.timestamps: Dict[str, float] = {}
        self.hits = 0
        self.misses = 0
    
    def get(self, key: str) -> Optional[Any]:
        """Get with LRU and TTL check"""
        if key not in self.cache:
            self.misses += 1
            return None
        
        # Check TTL
        if time.time() - self.timestamps[key] > self.ttl:
            self._remove(key)
            self.misses += 1
            return None
        
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        self.hits += 1
        return self.cache[key]
    
    def set(self, key: str, value: Any):
        """Set with LRU eviction"""
        if key in self.cache:
            self.cache.move_to_end(key)
        else:
            if len(self.cache) >= self.max_size:
                # Remove least recently used
                oldest = next(iter(self.cache))
                self._remove(oldest)
        
        self.cache[key] = value
        self.timestamps[key] = time.time()
    
    def _remove(self, key: str):
        """Remove from cache"""
        del self.cache[key]
        del self.timestamps[key]
    
    def clear_expired(self):
        """Remove all expired entries"""
        current_time = time.time()
        expired = [
            k for k, t in self.timestamps.items()
            if current_time - t > self.ttl
        ]
        for key in expired:
            self._remove(key)
    
    def stats(self) -> Dict[str, Any]:
        """Cache statistics"""
        total = self.hits + self.misses
        hit_rate = self.hits / total if total > 0 else 0
        return {
            "size": len(self.cache),
            "max_size": self.max_size,
            "hits": self.hits,
            "misses": self.misses,
            "hit_rate": f"{hit_rate:.2%}"
        }

# Usage
cache = AdvancedCache(max_size=3, ttl=60)

cache.set("user:1", {"name": "Alice", "age": 30})
cache.set("user:2", {"name": "Bob", "age": 25})
cache.set("user:3", {"name": "Charlie", "age": 35})

print(cache.get("user:1"))  # Hit
cache.set("user:4", {"name": "David", "age": 28})  # Evicts user:2 (LRU)
print(cache.get("user:2"))  # None (evicted)

print(cache.stats())
# {'size': 3, 'max_size': 3, 'hits': 1, 'misses': 1, 'hit_rate': '50.00%'}

# Decorator for function caching
def cached(cache_instance: AdvancedCache):
    """Decorator for caching function results"""
    def decorator(func: Callable):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Create cache key from args
            key = f"{func.__name__}:{args}:{sorted(kwargs.items())}"
            
            # Try cache first
            result = cache_instance.get(key)
            if result is not None:
                return result
            
            # Compute and cache
            result = func(*args, **kwargs)
            cache_instance.set(key, result)
            return result
        return wrapper
    return decorator

@cached(cache)
def expensive_computation(n: int) -> int:
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
from typing import Dict, List, Callable, Any
from collections import defaultdict

class StateMachine:
    """Production-ready state machine"""
    
    def __init__(self, initial_state: str):
        self.state = initial_state
        self.transitions: Dict[str, Dict[str, str]] = defaultdict(dict)
        self.handlers: Dict[str, Callable] = {}
        self.guards: Dict[tuple, Callable] = {}
        self.history: List[Dict[str, Any]] = []
    
    def add_transition(self, from_state: str, event: str, to_state: str,
                      guard: Optional[Callable] = None):
        """Add state transition"""
        self.transitions[from_state][event] = to_state
        if guard:
            self.guards[(from_state, event)] = guard
    
    def add_handler(self, state: str, handler: Callable):
        """Add state entry handler"""
        self.handlers[state] = handler
    
    def trigger(self, event: str, **context) -> bool:
        """Trigger event with context"""
        if event not in self.transitions[self.state]:
            return False
        
        # Check guard condition
        guard_key = (self.state, event)
        if guard_key in self.guards:
            if not self.guards[guard_key](context):
                return False
        
        # Execute transition
        old_state = self.state
        self.state = self.transitions[self.state][event]
        
        # Record history
        self.history.append({
            "from": old_state,
            "event": event,
            "to": self.state,
            "context": context.copy()
        })
        
        # Execute handler
        if self.state in self.handlers:
            self.handlers[self.state](context)
        
        return True
    
    def can_trigger(self, event: str, **context) -> bool:
        """Check if event can be triggered"""
        if event not in self.transitions[self.state]:
            return False
        
        guard_key = (self.state, event)
        if guard_key in self.guards:
            return self.guards[guard_key](context)
        
        return True
    
    def get_available_events(self) -> List[str]:
        """Get available events in current state"""
        return list(self.transitions[self.state].keys())
    
    def get_history(self) -> List[Dict[str, Any]]:
        """Get state transition history"""
        return self.history.copy()

# Order processing system
order_sm = StateMachine("pending")

# Define transitions
order_sm.add_transition("pending", "confirm", "confirmed")
order_sm.add_transition("confirmed", "ship", "shipped", 
                       guard=lambda ctx: ctx.get("payment_received", False))
order_sm.add_transition("shipped", "deliver", "delivered")
order_sm.add_transition("delivered", "return", "returned",
                       guard=lambda ctx: ctx.get("within_return_window", False))
order_sm.add_transition("pending", "cancel", "cancelled")
order_sm.add_transition("confirmed", "cancel", "cancelled")

# Add handlers
order_sm.add_handler("confirmed", lambda ctx: print(f"Order confirmed: {ctx.get('order_id')}"))
order_sm.add_handler("shipped", lambda ctx: print(f"Order shipped: {ctx.get('tracking')}"))
order_sm.add_handler("delivered", lambda ctx: print(f"Order delivered to: {ctx.get('address')}"))

# Process order
print(f"Current state: {order_sm.state}")
print(f"Available events: {order_sm.get_available_events()}")

order_sm.trigger("confirm", order_id="ORD-001")
print(f"State: {order_sm.state}")

# Try shipping without payment
can_ship = order_sm.can_trigger("ship", payment_received=False)
print(f"Can ship without payment: {can_ship}")  # False

# Ship with payment
order_sm.trigger("ship", payment_received=True, tracking="TRK-123")
order_sm.trigger("deliver", address="123 Main St")

# View history
for entry in order_sm.get_history():
    print(f"{entry['from']} --[{entry['event']}]--> {entry['to']}")
```

## Multi-Index Database

```python
from typing import Dict, List, Set, Any, Optional
from collections import defaultdict

class MultiIndexDB:
    """In-memory database with multiple indexes"""
    
    def __init__(self):
        self.data: Dict[str, Dict[str, Any]] = {}  # Primary key -> record
        self.indexes: Dict[str, Dict[Any, Set[str]]] = defaultdict(lambda: defaultdict(set))
        self.unique_indexes: Dict[str, Dict[Any, str]] = defaultdict(dict)
        self.next_id = 1
    
    def create_index(self, field: str, unique: bool = False):
        """Create index on field"""
        if unique:
            self.unique_indexes[field] = {}
        else:
            self.indexes[field] = defaultdict(set)
        
        # Build index for existing data
        for pk, record in self.data.items():
            if field in record:
                value = record[field]
                if unique:
                    self.unique_indexes[field][value] = pk
                else:
                    self.indexes[field][value].add(pk)
    
    def insert(self, record: Dict[str, Any]) -> str:
        """Insert record"""
        # Generate primary key
        pk = str(self.next_id)
        self.next_id += 1
        
        # Check unique constraints
        for field, index in self.unique_indexes.items():
            if field in record:
                value = record[field]
                if value in index:
                    raise ValueError(f"Duplicate value for unique field {field}: {value}")
        
        # Store record
        self.data[pk] = record
        
        # Update indexes
        for field, value in record.items():
            if field in self.indexes:
                self.indexes[field][value].add(pk)
            if field in self.unique_indexes:
                self.unique_indexes[field][value] = pk
        
        return pk
    
    def find_by_pk(self, pk: str) -> Optional[Dict[str, Any]]:
        """Find by primary key"""
        return self.data.get(pk)
    
    def find_by_index(self, field: str, value: Any) -> List[Dict[str, Any]]:
        """Find using index"""
        if field in self.unique_indexes:
            pk = self.unique_indexes[field].get(value)
            return [self.data[pk]] if pk else []
        
        if field in self.indexes:
            pks = self.indexes[field].get(value, set())
            return [self.data[pk] for pk in pks]
        
        # Full scan
        return [r for r in self.data.values() if r.get(field) == value]
    
    def update(self, pk: str, updates: Dict[str, Any]) -> bool:
        """Update record"""
        if pk not in self.data:
            return False
        
        old_record = self.data[pk]
        
        # Remove from old indexes
        for field, value in old_record.items():
            if field in self.indexes:
                self.indexes[field][value].discard(pk)
            if field in self.unique_indexes and field not in updates:
                del self.unique_indexes[field][value]
        
        # Update record
        self.data[pk].update(updates)
        
        # Update indexes
        for field, value in self.data[pk].items():
            if field in self.indexes:
                self.indexes[field][value].add(pk)
            if field in self.unique_indexes:
                self.unique_indexes[field][value] = pk
        
        return True
    
    def delete(self, pk: str) -> bool:
        """Delete record"""
        if pk not in self.data:
            return False
        
        record = self.data[pk]
        
        # Remove from indexes
        for field, value in record.items():
            if field in self.indexes:
                self.indexes[field][value].discard(pk)
            if field in self.unique_indexes:
                del self.unique_indexes[field][value]
        
        del self.data[pk]
        return True
    
    def stats(self) -> Dict[str, Any]:
        """Database statistics"""
        return {
            "total_records": len(self.data),
            "indexes": list(self.indexes.keys()),
            "unique_indexes": list(self.unique_indexes.keys())
        }

# Usage
db = MultiIndexDB()

# Create indexes
db.create_index("email", unique=True)
db.create_index("city", unique=False)

# Insert records
pk1 = db.insert({"name": "Alice", "email": "alice@example.com", "city": "NYC"})
pk2 = db.insert({"name": "Bob", "email": "bob@example.com", "city": "LA"})
pk3 = db.insert({"name": "Charlie", "email": "charlie@example.com", "city": "NYC"})

# Find by unique index (fast O(1))
users = db.find_by_index("email", "alice@example.com")
print(f"Found by email: {users[0]['name']}")

# Find by non-unique index (fast O(k) where k = matching records)
nyc_users = db.find_by_index("city", "NYC")
print(f"NYC users: {[u['name'] for u in nyc_users]}")

# Update
db.update(pk1, {"city": "SF"})

# Stats
print(db.stats())
```

## Integration Example: Complete Application

```python
from typing import Dict, List, Any
import json

class UserManagementSystem:
    """Complete user management with all dict techniques"""
    
    def __init__(self):
        self.users: Dict[str, Dict[str, Any]] = {}
        self.email_index: Dict[str, str] = {}  # email -> user_id
        self.cache = AdvancedCache(max_size=50, ttl=300)
        self.activity_log: List[Dict[str, Any]] = []
    
    def create_user(self, user_data: Dict[str, Any]) -> str:
        """Create new user"""
        # Validate
        required = ["name", "email"]
        if not all(f in user_data for f in required):
            raise ValueError("Missing required fields")
        
        # Check duplicate
        if user_data["email"] in self.email_index:
            raise ValueError("Email already exists")
        
        # Generate ID
        user_id = f"user_{len(self.users) + 1}"
        
        # Store user
        user = {
            "id": user_id,
            "name": user_data["name"],
            "email": user_data["email"],
            "created_at": time.time(),
            "profile": user_data.get("profile", {}),
            "preferences": user_data.get("preferences", {})
        }
        
        self.users[user_id] = user
        self.email_index[user["email"]] = user_id
        
        # Log activity
        self._log_activity("create_user", user_id)
        
        return user_id
    
    def get_user(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user with caching"""
        # Try cache
        cached = self.cache.get(f"user:{user_id}")
        if cached:
            return cached
        
        # Load from storage
        user = self.users.get(user_id)
        if user:
            self.cache.set(f"user:{user_id}", user.copy())
        
        return user
    
    def update_user(self, user_id: str, updates: Dict[str, Any]) -> bool:
        """Update user"""
        if user_id not in self.users:
            return False
        
        # Update
        self.users[user_id].update(updates)
        
        # Invalidate cache
        self.cache._remove(f"user:{user_id}")
        
        # Log
        self._log_activity("update_user", user_id, updates)
        
        return True
    
    def find_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Find user by email (indexed)"""
        user_id = self.email_index.get(email)
        return self.get_user(user_id) if user_id else None
    
    def get_statistics(self) -> Dict[str, Any]:
        """Get system statistics"""
        return {
            "total_users": len(self.users),
            "cache_stats": self.cache.stats(),
            "recent_activity": self.activity_log[-10:],
            "emails_registered": len(self.email_index)
        }
    
    def export_data(self) -> str:
        """Export all data as JSON"""
        export = {
            "users": list(self.users.values()),
            "statistics": self.get_statistics()
        }
        return json.dumps(export, indent=2)
    
    def _log_activity(self, action: str, user_id: str, details: Any = None):
        """Log user activity"""
        self.activity_log.append({
            "action": action,
            "user_id": user_id,
            "details": details,
            "timestamp": time.time()
        })

# Usage
system = UserManagementSystem()

# Create users
user1_id = system.create_user({
    "name": "Alice",
    "email": "alice@example.com",
    "profile": {"age": 30, "city": "NYC"}
})

user2_id = system.create_user({
    "name": "Bob",
    "email": "bob@example.com",
    "preferences": {"theme": "dark", "notifications": True}
})

# Get user (cached)
user = system.get_user(user1_id)
print(f"User: {user['name']}")

# Find by email (indexed)
user = system.find_by_email("alice@example.com")
print(f"Found: {user['name']}")

# Update
system.update_user(user1_id, {"profile": {"age": 31, "city": "SF"}})

# Statistics
stats = system.get_statistics()
print(json.dumps(stats, indent=2))

# Export
exported = system.export_data()
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
