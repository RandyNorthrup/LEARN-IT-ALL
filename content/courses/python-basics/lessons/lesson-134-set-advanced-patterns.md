---
id: lesson-134-set-advanced-patterns
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
def create_graph():
    """Create an empty graph with adjacency sets"""
    return {"adj": {}}

def graph_add_edge(graph, u, v):
    """Add undirected edge"""
    if u not in graph["adj"]:
        graph["adj"][u] = set()
    if v not in graph["adj"]:
        graph["adj"][v] = set()
    graph["adj"][u].add(v)
    graph["adj"][v].add(u)

def graph_bfs(graph, start):
    """Breadth-first search using sets"""
    visited = set()
    queue = [start]
    visited.add(start)
    
    while queue:
        node = queue.pop(0)
        for neighbor in graph["adj"].get(node, set()):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return visited

def graph_dfs(graph, start):
    """Depth-first search using sets"""
    visited = set()
    stack = [start]
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            for neighbor in graph["adj"].get(node, set()):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return visited

def graph_connected_components(graph):
    """Find all connected components"""
    unvisited = set(graph["adj"].keys())
    components = []
    
    while unvisited:
        start = next(iter(unvisited))
        component = graph_bfs(graph, start)
        components.append(component)
        unvisited -= component
    
    return components

def graph_find_cliques(graph, size):
    """Find all complete subgraphs of given size"""
    from itertools import combinations
    
    nodes = list(graph["adj"].keys())
    cliques = []
    
    for combo in combinations(nodes, size):
        combo_set = set(combo)
        # Check if all pairs are connected
        is_clique = all(
            v in graph["adj"].get(u, set())
            for i, u in enumerate(combo)
            for v in combo[i+1:]
        )
        if is_clique:
            cliques.append(combo_set)
    
    return cliques

# Example graph
g = create_graph()
graph_add_edge(g, "A", "B")
graph_add_edge(g, "B", "C")
graph_add_edge(g, "C", "A")  # Triangle
graph_add_edge(g, "D", "E")
graph_add_edge(g, "E", "F")

# Find components
components = graph_connected_components(g)
print(f"Connected components: {components}")

# Find triangles (size 3 cliques)
triangles = graph_find_cliques(g, 3)
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
def create_filter_pipeline(initial_data):
    """Create a pipeline for multi-stage set filtering"""
    data = set(initial_data)
    return {"data": data, "history": [data.copy()]}

def pipeline_filter_include(pipeline, include_set):
    """Keep only items in include_set"""
    pipeline["data"] &= include_set
    pipeline["history"].append(pipeline["data"].copy())
    return pipeline

def pipeline_filter_exclude(pipeline, exclude_set):
    """Remove items in exclude_set"""
    pipeline["data"] -= exclude_set
    pipeline["history"].append(pipeline["data"].copy())
    return pipeline

def pipeline_filter_predicate(pipeline, predicate):
    """Filter by predicate function"""
    pipeline["data"] = {x for x in pipeline["data"] if predicate(x)}
    pipeline["history"].append(pipeline["data"].copy())
    return pipeline

def pipeline_filter_require_any(pipeline, required_set):
    """Keep items that are in the required_set"""
    pipeline["data"] = {x for x in pipeline["data"] if {x} & required_set}
    pipeline["history"].append(pipeline["data"].copy())
    return pipeline

def pipeline_get_result(pipeline):
    """Get final filtered set"""
    return pipeline["data"].copy()

def pipeline_get_removed_at_stage(pipeline, stage):
    """Get items removed at specific stage"""
    if stage < 1 or stage >= len(pipeline["history"]):
        return set()
    return pipeline["history"][stage - 1] - pipeline["history"][stage]

# Usage
data = set(range(1, 101))
valid = set(range(10, 91))
exclude = {15, 25, 35, 45, 55}

pipeline = create_filter_pipeline(data)
pipeline_filter_include(pipeline, valid)           # Stage 1
pipeline_filter_exclude(pipeline, exclude)          # Stage 2
pipeline_filter_predicate(pipeline, lambda x: x % 2 == 0)  # Stage 3: evens only
result = pipeline_get_result(pipeline)

print(f"Final result: {len(result)} items")
print(f"Removed at stage 1: {pipeline_get_removed_at_stage(pipeline, 1)}")
print(f"Removed at stage 2: {pipeline_get_removed_at_stage(pipeline, 2)}")
```

## Set-Based Caching

```python
# LRU cache using sets
def create_lru_cache(capacity):
    """Create a simple LRU cache with hot/cold set tracking"""
    return {
        "capacity": capacity,
        "cache": {},        # key -> value
        "hot_keys": set(),  # Recently accessed
        "cold_keys": set()  # Less recently accessed
    }

def lru_get(lru, key):
    """Get value, promoting to hot set"""
    if key not in lru["cache"]:
        return None
    
    # Promote to hot
    lru["cold_keys"].discard(key)
    lru["hot_keys"].add(key)
    
    return lru["cache"][key]

def lru_put(lru, key, value):
    """Put value, evicting if necessary"""
    # Already exists - update
    if key in lru["cache"]:
        lru["cache"][key] = value
        lru["cold_keys"].discard(key)
        lru["hot_keys"].add(key)
        return
    
    # Need to evict
    if len(lru["cache"]) >= lru["capacity"]:
        # Evict from cold first
        if lru["cold_keys"]:
            evict_key = lru["cold_keys"].pop()
        else:
            # Move hot to cold and evict
            lru["cold_keys"] = lru["hot_keys"].copy()
            lru["hot_keys"].clear()
            evict_key = lru["cold_keys"].pop()
        
        del lru["cache"][evict_key]
    
    # Add new item
    lru["cache"][key] = value
    lru["hot_keys"].add(key)

def lru_stats(lru):
    """Get cache statistics"""
    return {
        "size": len(lru["cache"]),
        "capacity": lru["capacity"],
        "hot": len(lru["hot_keys"]),
        "cold": len(lru["cold_keys"])
    }

# Usage
cache = create_lru_cache(capacity=5)
for i in range(10):
    lru_put(cache, f"key{i}", f"value{i}")
    print(f"After adding key{i}: {lru_stats(cache)}")
```

## Set-Based State Machines

```python
# State machine with set-based transitions
def create_state_machine():
    """Create a state machine with set-based transitions"""
    return {
        "states": set(),
        "transitions": {},      # (from_state, event) -> to_state
        "valid_events": {},     # state -> set of valid events
        "current_state": None
    }

def sm_add_state(sm, state):
    """Add a state"""
    sm["states"].add(state)
    if state not in sm["valid_events"]:
        sm["valid_events"][state] = set()

def sm_add_transition(sm, from_state, event, to_state):
    """Add transition"""
    sm_add_state(sm, from_state)
    sm_add_state(sm, to_state)
    sm["transitions"][(from_state, event)] = to_state
    sm["valid_events"][from_state].add(event)

def sm_set_initial(sm, state):
    """Set initial state"""
    if state not in sm["states"]:
        raise ValueError(f"State {state} not defined")
    sm["current_state"] = state

def sm_trigger(sm, event):
    """Trigger event"""
    if sm["current_state"] is None:
        raise RuntimeError("No initial state set")
    
    if event not in sm["valid_events"][sm["current_state"]]:
        raise ValueError(f"Invalid event {event} for state {sm['current_state']}")
    
    key = (sm["current_state"], event)
    if key in sm["transitions"]:
        sm["current_state"] = sm["transitions"][key]
        return True
    return False

def sm_get_valid_events(sm):
    """Get valid events for current state"""
    if sm["current_state"] is None:
        return set()
    return sm["valid_events"][sm["current_state"]].copy()

def sm_can_reach(sm, target_state):
    """Check if target state is reachable from current"""
    if sm["current_state"] is None:
        return False
    
    visited = set()
    queue = [sm["current_state"]]
    
    while queue:
        state = queue.pop(0)
        if state == target_state:
            return True
        
        if state in visited:
            continue
        visited.add(state)
        
        # Add all reachable states
        for event in sm["valid_events"].get(state, set()):
            next_state = sm["transitions"].get((state, event))
            if next_state and next_state not in visited:
                queue.append(next_state)
    
    return False

# Example: Order processing
sm = create_state_machine()
sm_add_transition(sm, "created", "submit", "pending")
sm_add_transition(sm, "pending", "approve", "approved")
sm_add_transition(sm, "pending", "reject", "rejected")
sm_add_transition(sm, "approved", "ship", "shipped")
sm_add_transition(sm, "shipped", "deliver", "delivered")

sm_set_initial(sm, "created")
print(f"Valid events: {sm_get_valid_events(sm)}")
print(f"Can reach 'delivered'? {sm_can_reach(sm, 'delivered')}")

sm_trigger(sm, "submit")
print(f"Current state: {sm['current_state']}")
print(f"Can reach 'delivered'? {sm_can_reach(sm, 'delivered')}")
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
