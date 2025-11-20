---
id: "144-set-with-other-modules"
title: "Sets with Standard Library Modules"
chapterId: ch10-sets
order: 11
duration: 25
objectives:
  - Use sets with collections module
  - Combine sets with itertools
  - Apply sets with functools
  - Integrate sets across standard library
---

# Sets with Standard Library Modules

Powerful combinations of sets with Python's standard library.

## Sets with collections Module

```python
from collections import Counter, defaultdict, ChainMap

# Counter + Sets
# Find unique elements with their counts
data = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
counter = Counter(data)

# Elements appearing exactly once
unique_once = {k for k, v in counter.items() if v == 1}
print(unique_once)  # {1}

# Elements appearing more than twice
frequent = {k for k, v in counter.items() if v > 2}
print(frequent)  # {3, 4}

# Most common as set
most_common_set = {k for k, v in counter.most_common(2)}
print(most_common_set)  # {3, 4}

# defaultdict with set values
def create_inverted_index(documents):
    """Create inverted index: word -> set of document IDs"""
    index = defaultdict(set)
    
    for doc_id, text in documents.items():
        words = text.lower().split()
        for word in words:
            index[word].add(doc_id)
    
    return dict(index)

docs = {
    "doc1": "Python is great for data science",
    "doc2": "Python is easy to learn",
    "doc3": "Data science uses Python extensively"
}

index = create_inverted_index(docs)
print(index["python"])  # {'doc1', 'doc2', 'doc3'}
print(index["data"])    # {'doc1', 'doc3'}

# Find documents with ALL words
def search_all_words(index, words):
    """Find documents containing all words"""
    if not words:
        return set()
    
    result = index.get(words[0].lower(), set()).copy()
    for word in words[1:]:
        result &= index.get(word.lower(), set())
    
    return result

docs_with_python_data = search_all_words(index, ["python", "data"])
print(docs_with_python_data)  # {'doc1', 'doc3'}

# ChainMap with sets
def merge_permissions(*role_permissions):
    """Merge permissions from multiple roles"""
    chain = ChainMap(*role_permissions)
    
    all_permissions = set()
    for perms in chain.values():
        all_permissions.update(perms)
    
    return all_permissions

admin_perms = {"users": {"read", "write", "delete"}}
editor_perms = {"posts": {"read", "write"}}
viewer_perms = {"posts": {"read"}}

all_perms = merge_permissions(admin_perms, editor_perms, viewer_perms)
print(all_perms)  # {'read', 'write', 'delete'}
```

## Sets with itertools

```python
from itertools import combinations, permutations, product, chain

# Generate all pairs
def find_all_pairs(items):
    """Find all unique pairs"""
    return set(combinations(items, 2))

items = ["A", "B", "C", "D"]
pairs = find_all_pairs(items)
print(f"All pairs: {pairs}")

# Generate all possible teams
def generate_teams(players, team_size):
    """Generate all possible teams of given size"""
    return [set(team) for team in combinations(players, team_size)]

players = ["Alice", "Bob", "Charlie", "David"]
teams = generate_teams(players, 2)
print(f"All 2-player teams: {teams}")

# Find common elements in combinations
def find_common_in_combinations(items, combo_size):
    """Find elements common to all combinations of given size"""
    combos = list(combinations(items, combo_size))
    
    if not combos:
        return set()
    
    common = set(combos[0])
    for combo in combos[1:]:
        common &= set(combo)
    
    return common

numbers = [1, 2, 3, 4, 5]
common = find_common_in_combinations(numbers, 3)
print(f"Common in all 3-combinations: {common}")

# Cartesian product with filtering
def filtered_product(set_a, set_b, predicate):
    """Cartesian product with predicate filter"""
    return {(a, b) for a, b in product(set_a, set_b) if predicate(a, b)}

set_a = {1, 2, 3}
set_b = {2, 3, 4}

# Only pairs where first > second
result = filtered_product(set_a, set_b, lambda a, b: a > b)
print(result)  # {(3, 2), (2, 1), (3, 1)}

# Chain multiple sets
def chain_sets(*sets):
    """Chain multiple sets into one"""
    return set(chain(*sets))

s1 = {1, 2, 3}
s2 = {3, 4, 5}
s3 = {5, 6, 7}

chained = chain_sets(s1, s2, s3)
print(chained)  # {1, 2, 3, 4, 5, 6, 7}

# Find unique permutations
def unique_permutations(items, r):
    """Find unique permutations (as sets)"""
    return [set(p) for p in permutations(items, r)]

items = [1, 2, 3]
perms = unique_permutations(items, 2)
print(f"Permutations: {len(perms)}")
# Note: permutations create duplicates as sets since {1,2} == {2,1}
```

## Sets with functools

```python
from functools import reduce, lru_cache, cached_property

# Reduce with sets - find intersection of all sets
def intersect_all(sets_list):
    """Find intersection of all sets"""
    if not sets_list:
        return set()
    return reduce(lambda a, b: a & b, sets_list)

sets = [{1, 2, 3}, {2, 3, 4}, {3, 4, 5}]
common = intersect_all(sets)
print(common)  # {3}

# Reduce - find union of all sets
def union_all(sets_list):
    """Find union of all sets"""
    return reduce(lambda a, b: a | b, sets_list, set())

all_elements = union_all(sets)
print(all_elements)  # {1, 2, 3, 4, 5}

# LRU cache with set results
@lru_cache(maxsize=128)
def get_factors(n):
    """Get factors of n (cached)"""
    factors = set()
    for i in range(1, int(n**0.5) + 1):
        if n % i == 0:
            factors.add(i)
            factors.add(n // i)
    return frozenset(factors)  # Return frozenset for hashability

# Usage
factors_12 = get_factors(12)
factors_18 = get_factors(18)
common_factors = factors_12 & factors_18
print(f"Common factors of 12 and 18: {common_factors}")

# Cached property with sets
class DataAnalyzer:
    def __init__(self, data):
        self.data = data
    
    @cached_property
    def unique_values(self):
        """Compute unique values once"""
        print("Computing unique values...")
        return set(self.data)
    
    @cached_property
    def unique_even(self):
        """Compute unique even values once"""
        print("Computing unique even...")
        return {x for x in self.unique_values if x % 2 == 0}
    
    @cached_property
    def unique_odd(self):
        """Compute unique odd values once"""
        print("Computing unique odd...")
        return {x for x in self.unique_values if x % 2 != 0}

analyzer = DataAnalyzer([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])
print(analyzer.unique_even)  # Computed
print(analyzer.unique_even)  # Cached
print(analyzer.unique_odd)   # Computed
```

## Sets with typing Module

```python
from typing import Set, FrozenSet, TypeVar, Generic

# Type hints for set functions
def merge_user_tags(user_tags: dict[str, Set[str]]) -> Set[str]:
    """Merge all user tags into one set"""
    all_tags = set()
    for tags in user_tags.values():
        all_tags.update(tags)
    return all_tags

# Generic set operations
T = TypeVar('T')

def safe_intersection(sets: list[Set[T]]) -> Set[T]:
    """Type-safe intersection"""
    if not sets:
        return set()
    result = sets[0].copy()
    for s in sets[1:]:
        result &= s
    return result

# Generic class with sets
class UniqueCollection(Generic[T]):
    """Collection that maintains uniqueness"""
    def __init__(self):
        self._items: Set[T] = set()
    
    def add(self, item: T) -> bool:
        """Add item, return True if new"""
        if item in self._items:
            return False
        self._items.add(item)
        return True
    
    def remove(self, item: T) -> bool:
        """Remove item, return True if existed"""
        if item in self._items:
            self._items.discard(item)
            return True
        return False
    
    def get_all(self) -> FrozenSet[T]:
        """Get immutable copy"""
        return frozenset(self._items)

# Usage
collection: UniqueCollection[str] = UniqueCollection()
collection.add("apple")
collection.add("banana")
print(collection.get_all())
```

## Sets with pathlib

```python
from pathlib import Path

# Find unique file extensions
def get_unique_extensions(directory):
    """Get all unique file extensions in directory"""
    path = Path(directory)
    extensions = {file.suffix for file in path.rglob("*") if file.is_file()}
    return extensions

# Find files in multiple directories
def files_in_all_directories(*directories):
    """Find files present in all directories"""
    if not directories:
        return set()
    
    # Get filenames from each directory
    file_sets = []
    for directory in directories:
        path = Path(directory)
        if path.exists():
            filenames = {file.name for file in path.iterdir() if file.is_file()}
            file_sets.append(filenames)
    
    if not file_sets:
        return set()
    
    # Find intersection
    common = file_sets[0]
    for file_set in file_sets[1:]:
        common &= file_set
    
    return common

# Find duplicate filenames across directories
def find_duplicate_filenames(*directories):
    """Find filenames that appear in multiple directories"""
    from collections import Counter
    
    all_files = []
    for directory in directories:
        path = Path(directory)
        if path.exists():
            files = [file.name for file in path.iterdir() if file.is_file()]
            all_files.extend(files)
    
    counter = Counter(all_files)
    return {name for name, count in counter.items() if count > 1}
```

## Sets with json Module

```python
import json

# Serialize sets to JSON
def serialize_set(obj):
    """Custom JSON encoder for sets"""
    if isinstance(obj, set):
        return {"__set__": list(obj)}
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

def deserialize_set(obj):
    """Custom JSON decoder for sets"""
    if "__set__" in obj:
        return set(obj["__set__"])
    return obj

# Example
data = {
    "user_id": "123",
    "tags": {"python", "programming", "tutorial"},
    "categories": {"tech", "education"}
}

# Serialize
json_str = json.dumps(data, default=serialize_set)
print(f"Serialized: {json_str}")

# Deserialize
loaded = json.loads(json_str, object_hook=deserialize_set)
print(f"Deserialized: {loaded}")
print(f"Tags type: {type(loaded['tags'])}")
```

## Sets with re Module

```python
import re

# Find unique patterns
def find_unique_emails(text):
    """Extract unique email addresses"""
    pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = set(re.findall(pattern, text))
    return emails

text = """
Contact us at support@example.com or sales@example.com.
You can also reach admin@example.com or support@example.com.
"""

emails = find_unique_emails(text)
print(f"Unique emails: {emails}")

# Find unique hashtags
def extract_hashtags(text):
    """Extract unique hashtags"""
    pattern = r'#\w+'
    return {tag.lower() for tag in re.findall(pattern, text)}

post = "#Python is great! Learn #python #programming #Python"
tags = extract_hashtags(post)
print(f"Unique tags: {tags}")

# Find unique words by pattern
def find_words_matching(text, pattern):
    """Find unique words matching regex pattern"""
    words = re.findall(r'\b\w+\b', text.lower())
    return {word for word in words if re.match(pattern, word)}

text = "Python programming is fun. Programming with Python is powerful."
# Words starting with 'p'
p_words = find_words_matching(text, r'^p')
print(f"Words starting with 'p': {p_words}")
```

## Sets with datetime Module

```python
from datetime import datetime, timedelta

# Find unique dates
def get_unique_dates(date_strings):
    """Parse and get unique dates"""
    dates = set()
    for date_str in date_strings:
        try:
            date = datetime.strptime(date_str, "%Y-%m-%d").date()
            dates.add(date)
        except ValueError:
            continue
    return dates

date_list = [
    "2024-01-01", "2024-01-02", "2024-01-01",
    "2024-01-03", "2024-01-02", "invalid"
]

unique_dates = get_unique_dates(date_list)
print(f"Unique dates: {unique_dates}")

# Find date gaps
def find_missing_dates(dates, start, end):
    """Find dates missing from a range"""
    # Generate all dates in range
    all_dates = set()
    current = start
    while current <= end:
        all_dates.add(current)
        current += timedelta(days=1)
    
    # Find missing
    date_set = set(dates)
    missing = all_dates - date_set
    return sorted(missing)

from datetime import date

dates = [date(2024, 1, 1), date(2024, 1, 2), date(2024, 1, 4)]
missing = find_missing_dates(dates, date(2024, 1, 1), date(2024, 1, 5))
print(f"Missing dates: {missing}")
```

## Sets with os Module

```python
import os

# Find common environment variables across systems
def get_common_env_vars(*env_dicts):
    """Find environment variables common to all systems"""
    if not env_dicts:
        return set()
    
    var_sets = [set(env.keys()) for env in env_dicts]
    common = var_sets[0]
    for var_set in var_sets[1:]:
        common &= var_set
    
    return common

# Current environment variables as set
current_env_vars = set(os.environ.keys())
print(f"Number of environment variables: {len(current_env_vars)}")

# Check for required variables
required = {"PATH", "HOME", "USER"}
missing = required - current_env_vars
if missing:
    print(f"Missing required variables: {missing}")
else:
    print("All required variables present")
```

## Summary

**Standard Library Integration:**

1. **collections Module**
   - Counter for frequency analysis
   - defaultdict with set values
   - ChainMap for merging

2. **itertools Module**
   - combinations/permutations
   - Cartesian products
   - Chaining sets

3. **functools Module**
   - reduce for set operations
   - lru_cache with frozensets
   - cached_property for set results

4. **typing Module**
   - Type hints: Set[T], FrozenSet[T]
   - Generic set operations
   - Type-safe collections

5. **pathlib Module**
   - File extension analysis
   - Directory comparison
   - Duplicate detection

6. **json Module**
   - Custom set serialization
   - Encoding/decoding patterns

7. **re Module**
   - Pattern-based extraction
   - Unique matches
   - Text analysis

8. **datetime Module**
   - Unique date parsing
   - Date range operations
   - Gap detection

**Key Patterns:**
- Sets work seamlessly with standard library
- Use frozenset for hashability when needed
- Combine modules for powerful operations
- Type hints improve code clarity
- Cache set operations for performance
