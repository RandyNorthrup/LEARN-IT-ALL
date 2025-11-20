---
id: "143-set-advanced-patterns"
title: "Advanced Set Patterns and Techniques"
chapterId: ch10-sets
order: 10
duration: 30
objectives:
  - Master advanced set manipulation techniques
  - Learn set-based algorithms
  - Apply sets to complex problems
  - Optimize with advanced patterns
---

# Advanced Set Patterns and Techniques

Advanced techniques and patterns for sophisticated set operations.

## Chaining Set Operations

```python
# Complex set expressions
set_a = {1, 2, 3, 4, 5}
set_b = {3, 4, 5, 6, 7}
set_c = {5, 6, 7, 8, 9}

# Chain multiple operations
result = (set_a | set_b) & set_c
print(result)  # {5, 6, 7}

# Parentheses control order
result1 = (set_a | set_b) - set_c
result2 = set_a | (set_b - set_c)
print(result1)  # {1, 2, 3, 4}
print(result2)  # {1, 2, 3, 4, 5}

# Complex filter pattern
def filter_complex(data, included, excluded, required):
    """
    Complex filtering with three sets:
    - Must be in included
    - Must not be in excluded  
    - Must have at least one from required
    """
    candidates = set(data) & included  # In included
    candidates -= excluded  # Not in excluded
    
    # Has at least one required element
    result = {item for item in candidates if {item} & required}
    return result

data = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
included = {1, 2, 3, 4, 5, 6, 7}
excluded = {2, 4}
required = {1, 3, 5}

filtered = filter_complex(data, included, excluded, required)
print(filtered)  # {1, 3, 5} (in included, not excluded, in required)
```

## Set-Based Algorithms

```python
# Algorithm 1: Find all subsets (power set)
def powerset(s):
    """Generate all subsets of a set"""
    s = list(s)
    result = []
    
    # Binary representation approach
    for i in range(2 ** len(s)):
        subset = set()
        for j in range(len(s)):
            if i & (1 << j):
                subset.add(s[j])
        result.append(subset)
    
    return result

subsets = powerset({1, 2, 3})
print(f"Power set has {len(subsets)} subsets")
for subset in subsets:
    print(subset)
# {}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}

# Algorithm 2: Find common elements in multiple sets
def find_common_all(*sets):
    """Find elements common to all sets"""
    if not sets:
        return set()
    
    result = set(sets[0])
    for s in sets[1:]:
        result &= s
    return result

s1 = {1, 2, 3, 4, 5}
s2 = {3, 4, 5, 6, 7}
s3 = {4, 5, 6, 7, 8}
s4 = {5, 6, 7, 8, 9}

common = find_common_all(s1, s2, s3, s4)
print(common)  # {5}

# Algorithm 3: Find elements in exactly N sets
def in_exactly_n_sets(sets_list, n):
    """Find elements that appear in exactly n sets"""
    from collections import Counter
    
    # Count occurrences across sets
    counter = Counter()
    for s in sets_list:
        for element in s:
            counter[element] += 1
    
    # Return elements appearing exactly n times
    return {elem for elem, count in counter.items() if count == n}

sets = [
    {1, 2, 3, 4},
    {2, 3, 4, 5},
    {3, 4, 5, 6},
    {4, 5, 6, 7}
]

in_2_sets = in_exactly_n_sets(sets, 2)
in_3_sets = in_exactly_n_sets(sets, 3)
in_all_sets = in_exactly_n_sets(sets, 4)

print(f"In exactly 2 sets: {in_2_sets}")
print(f"In exactly 3 sets: {in_3_sets}")
print(f"In all 4 sets: {in_all_sets}")

# Algorithm 4: Set partitioning
def partition_by_predicate(s, predicate):
    """Partition set into two based on predicate"""
    true_set = {x for x in s if predicate(x)}
    false_set = s - true_set
    return true_set, false_set

numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
evens, odds = partition_by_predicate(numbers, lambda x: x % 2 == 0)
print(f"Evens: {evens}")
print(f"Odds: {odds}")
```

## Set-Based Graph Algorithms

```python
# Represent graph as adjacency sets
class Graph:
    def __init__(self):
        self.adj = {}  # node -> set of neighbors
    
    def add_edge(self, u, v):
        """Add undirected edge"""
        if u not in self.adj:
            self.adj[u] = set()
        if v not in self.adj:
            self.adj[v] = set()
        self.adj[u].add(v)
        self.adj[v].add(u)
    
    def bfs(self, start):
        """Breadth-first search using sets"""
        visited = set()
        queue = [start]
        visited.add(start)
        
        while queue:
            node = queue.pop(0)
            for neighbor in self.adj.get(node, set()):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return visited
    
    def dfs(self, start):
        """Depth-first search using sets"""
        visited = set()
        stack = [start]
        
        while stack:
            node = stack.pop()
            if node not in visited:
                visited.add(node)
                for neighbor in self.adj.get(node, set()):
                    if neighbor not in visited:
                        stack.append(neighbor)
        
        return visited
    
    def connected_components(self):
        """Find all connected components"""
        unvisited = set(self.adj.keys())
        components = []
        
        while unvisited:
            start = next(iter(unvisited))
            component = self.bfs(start)
            components.append(component)
            unvisited -= component
        
        return components
    
    def find_cliques(self, size):
        """Find all complete subgraphs of given size"""
        from itertools import combinations
        
        nodes = list(self.adj.keys())
        cliques = []
        
        for combo in combinations(nodes, size):
            combo_set = set(combo)
            # Check if all pairs are connected
            is_clique = all(
                v in self.adj.get(u, set())
                for i, u in enumerate(combo)
                for v in combo[i+1:]
            )
            if is_clique:
                cliques.append(combo_set)
        
        return cliques

# Example graph
g = Graph()
g.add_edge("A", "B")
g.add_edge("B", "C")
g.add_edge("C", "A")  # Triangle
g.add_edge("D", "E")
g.add_edge("E", "F")

# Find components
components = g.connected_components()
print(f"Connected components: {components}")

# Find triangles (size 3 cliques)
triangles = g.find_cliques(3)
print(f"Triangles: {triangles}")
```

## Set-Based Data Clustering

```python
# Cluster data based on similarity
def cluster_by_similarity(items, similarity_threshold):
    """
    Cluster items based on shared attributes.
    Items with similarity >= threshold are clustered together.
    """
    # Each item is a set of attributes
    clusters = []
    used = set()
    
    for i, item1 in enumerate(items):
        if i in used:
            continue
        
        cluster = {i}
        used.add(i)
        
        for j, item2 in enumerate(items[i+1:], start=i+1):
            if j in used:
                continue
            
            # Calculate Jaccard similarity
            intersection = len(item1 & item2)
            union = len(item1 | item2)
            similarity = intersection / union if union > 0 else 0
            
            if similarity >= similarity_threshold:
                cluster.add(j)
                used.add(j)
        
        clusters.append(cluster)
    
    return clusters

# Example: cluster users by shared interests
users = [
    {"python", "javascript", "docker"},     # User 0
    {"python", "java", "kubernetes"},       # User 1
    {"python", "javascript", "react"},      # User 2
    {"java", "spring", "kubernetes"},       # User 3
    {"javascript", "react", "vue"}          # User 4
]

clusters = cluster_by_similarity(users, 0.4)
print("User clusters:")
for i, cluster in enumerate(clusters):
    print(f"Cluster {i}: {cluster}")
    interests = set()
    for user_idx in cluster:
        interests |= users[user_idx]
    print(f"  Combined interests: {interests}")
```

## Advanced Filtering Patterns

```python
# Multi-stage filtering pipeline
class FilterPipeline:
    def __init__(self, initial_data):
        self.data = set(initial_data)
        self.history = [self.data.copy()]
    
    def filter_include(self, include_set):
        """Keep only items in include_set"""
        self.data &= include_set
        self.history.append(self.data.copy())
        return self
    
    def filter_exclude(self, exclude_set):
        """Remove items in exclude_set"""
        self.data -= exclude_set
        self.history.append(self.data.copy())
        return self
    
    def filter_predicate(self, predicate):
        """Filter by predicate function"""
        self.data = {x for x in self.data if predicate(x)}
        self.history.append(self.data.copy())
        return self
    
    def filter_require_any(self, required_set):
        """Keep items that share at least one element with required_set"""
        self.data = {x for x in self.data if {x} & required_set}
        self.history.append(self.data.copy())
        return self
    
    def get_result(self):
        """Get final filtered set"""
        return self.data.copy()
    
    def get_removed_at_stage(self, stage):
        """Get items removed at specific stage"""
        if stage < 1 or stage >= len(self.history):
            return set()
        return self.history[stage - 1] - self.history[stage]

# Usage
data = set(range(1, 101))
valid = set(range(10, 91))
exclude = {15, 25, 35, 45, 55}

pipeline = FilterPipeline(data)
result = (pipeline
    .filter_include(valid)  # Stage 1
    .filter_exclude(exclude)  # Stage 2
    .filter_predicate(lambda x: x % 2 == 0)  # Stage 3: evens only
    .get_result())

print(f"Final result: {len(result)} items")
print(f"Removed at stage 1: {pipeline.get_removed_at_stage(1)}")
print(f"Removed at stage 2: {pipeline.get_removed_at_stage(2)}")
```

## Set-Based Caching

```python
# LRU cache using sets
class SetBasedLRUCache:
    """Simple LRU cache tracking with sets"""
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> value
        self.hot_keys = set()  # Recently accessed
        self.cold_keys = set()  # Less recently accessed
    
    def get(self, key):
        """Get value, promoting to hot set"""
        if key not in self.cache:
            return None
        
        # Promote to hot
        self.cold_keys.discard(key)
        self.hot_keys.add(key)
        
        return self.cache[key]
    
    def put(self, key, value):
        """Put value, evicting if necessary"""
        # Already exists - update
        if key in self.cache:
            self.cache[key] = value
            self.cold_keys.discard(key)
            self.hot_keys.add(key)
            return
        
        # Need to evict
        if len(self.cache) >= self.capacity:
            # Evict from cold first
            if self.cold_keys:
                evict_key = self.cold_keys.pop()
            else:
                # Move hot to cold and evict
                self.cold_keys = self.hot_keys.copy()
                self.hot_keys.clear()
                evict_key = self.cold_keys.pop()
            
            del self.cache[evict_key]
        
        # Add new item
        self.cache[key] = value
        self.hot_keys.add(key)
    
    def stats(self):
        """Get cache statistics"""
        return {
            "size": len(self.cache),
            "capacity": self.capacity,
            "hot": len(self.hot_keys),
            "cold": len(self.cold_keys)
        }

# Usage
cache = SetBasedLRUCache(capacity=5)
for i in range(10):
    cache.put(f"key{i}", f"value{i}")
    print(f"After adding key{i}: {cache.stats()}")
```

## Set-Based State Machines

```python
# State machine with set-based transitions
class StateMachine:
    def __init__(self):
        self.states = set()
        self.transitions = {}  # (from_state, event) -> to_state
        self.valid_events = {}  # state -> set of valid events
        self.current_state = None
    
    def add_state(self, state):
        """Add a state"""
        self.states.add(state)
        if state not in self.valid_events:
            self.valid_events[state] = set()
    
    def add_transition(self, from_state, event, to_state):
        """Add transition"""
        self.add_state(from_state)
        self.add_state(to_state)
        self.transitions[(from_state, event)] = to_state
        self.valid_events[from_state].add(event)
    
    def set_initial(self, state):
        """Set initial state"""
        if state not in self.states:
            raise ValueError(f"State {state} not defined")
        self.current_state = state
    
    def trigger(self, event):
        """Trigger event"""
        if self.current_state is None:
            raise RuntimeError("No initial state set")
        
        if event not in self.valid_events[self.current_state]:
            raise ValueError(f"Invalid event {event} for state {self.current_state}")
        
        key = (self.current_state, event)
        if key in self.transitions:
            self.current_state = self.transitions[key]
            return True
        return False
    
    def get_valid_events(self):
        """Get valid events for current state"""
        if self.current_state is None:
            return set()
        return self.valid_events[self.current_state].copy()
    
    def can_reach(self, target_state):
        """Check if target state is reachable from current"""
        if self.current_state is None:
            return False
        
        visited = set()
        queue = [self.current_state]
        
        while queue:
            state = queue.pop(0)
            if state == target_state:
                return True
            
            if state in visited:
                continue
            visited.add(state)
            
            # Add all reachable states
            for event in self.valid_events.get(state, set()):
                next_state = self.transitions.get((state, event))
                if next_state and next_state not in visited:
                    queue.append(next_state)
        
        return False

# Example: Order processing
sm = StateMachine()
sm.add_transition("created", "submit", "pending")
sm.add_transition("pending", "approve", "approved")
sm.add_transition("pending", "reject", "rejected")
sm.add_transition("approved", "ship", "shipped")
sm.add_transition("shipped", "deliver", "delivered")

sm.set_initial("created")
print(f"Valid events: {sm.get_valid_events()}")
print(f"Can reach 'delivered'? {sm.can_reach('delivered')}")

sm.trigger("submit")
print(f"Current state: {sm.current_state}")
print(f"Can reach 'delivered'? {sm.can_reach('delivered')}")
```

## Summary

**Advanced Patterns:**

1. **Chaining Operations**
   - Complex set expressions
   - Multi-stage filtering
   - Pipeline processing

2. **Set-Based Algorithms**
   - Power sets
   - Common elements
   - Partitioning

3. **Graph Operations**
   - BFS/DFS with sets
   - Connected components
   - Clique detection

4. **Clustering**
   - Similarity-based grouping
   - Attribute matching
   - Jaccard similarity

5. **Advanced Filtering**
   - Multi-stage pipelines
   - History tracking
   - Predicate combinations

6. **Caching**
   - LRU with hot/cold sets
   - Set-based promotion
   - Efficient eviction

7. **State Machines**
   - Set-based transitions
   - Reachability analysis
   - Valid event tracking

**Key Techniques:**
- Use sets for membership tracking
- Combine set operations for complex logic
- Leverage set speed for algorithms
- Track state with sets
- Build pipelines with set operations
- Use sets for graph traversal
- Implement efficient caching with sets
