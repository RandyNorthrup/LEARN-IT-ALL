---
id: lesson-136-set-integration-projects
title: "Set Integration and Mini-Projects"
chapterId: ch10-sets
order: 12
duration: 30
objectives:
  - Build projects using sets
  - Integrate sets with other data structures
  - Solve real-world problems with sets
  - Practice set-based algorithms
---

# Set Integration and Mini-Projects

Apply your set knowledge by building practical mini-projects that demonstrate the power of sets in real applications.

## Project 1: Duplicate File Finder

Find duplicate files by comparing file hashes using sets.

```python
import hashlib
from pathlib import Path
from collections import defaultdict

def create_duplicate_finder():
    """Create a duplicate file finder"""
    return {"file_hashes": defaultdict(set)}

def hash_file(filepath):
    """Calculate MD5 hash of file"""
    md5 = hashlib.md5()
    with open(filepath, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            md5.update(chunk)
    return md5.hexdigest()

def scan_directory(finder, directory):
    """Scan directory for files"""
    path = Path(directory)
    
    for file_path in path.rglob('*'):
        if file_path.is_file():
            try:
                file_hash = hash_file(file_path)
                finder["file_hashes"][file_hash].add(str(file_path))
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

def find_duplicates(finder):
    """Return files with duplicate hashes"""
    duplicates = {}
    
    for file_hash, file_paths in finder["file_hashes"].items():
        if len(file_paths) > 1:
            duplicates[file_hash] = file_paths
    
    return duplicates

def report_duplicates(finder):
    """Print duplicate file report"""
    duplicates = find_duplicates(finder)
    
    if not duplicates:
        print("No duplicate files found!")
        return
    
    print(f"\nFound {len(duplicates)} sets of duplicate files:\n")
    
    for i, (file_hash, file_paths) in enumerate(duplicates.items(), 1):
        print(f"Duplicate Set {i} (hash: {file_hash[:8]}...):")
        for path in sorted(file_paths):
            print(f"  - {path}")
        print()

# Usage
finder = create_duplicate_finder()
scan_directory(finder, "./documents")
report_duplicates(finder)
```

## Project 2: Social Network Friend Suggestions

Suggest friends based on mutual connections using set operations.

```python
def create_social_network():
    """Create a simple social network with friend suggestions"""
    return {"users": {}}  # username -> set of friends

def network_add_user(network, username):
    """Add user to network"""
    if username not in network["users"]:
        network["users"][username] = set()

def network_add_friendship(network, user1, user2):
    """Create bidirectional friendship"""
    network_add_user(network, user1)
    network_add_user(network, user2)
    
    network["users"][user1].add(user2)
    network["users"][user2].add(user1)

def network_get_friends(network, username):
    """Get user's friends"""
    return network["users"].get(username, set())

def network_get_mutual_friends(network, user1, user2):
    """Find mutual friends"""
    friends1 = network_get_friends(network, user1)
    friends2 = network_get_friends(network, user2)
    return friends1 & friends2

def network_suggest_friends(network, username, limit=5):
    """Suggest friends based on mutual connections"""
    if username not in network["users"]:
        return []
    
    user_friends = network["users"][username]
    suggestions = {}
    
    # Find friends of friends
    for friend in user_friends:
        friend_friends = network["users"][friend]
        
        # Potential friends are friends of friends
        # excluding current user and existing friends
        potential = friend_friends - user_friends - {username}
        
        for potential_friend in potential:
            if potential_friend not in suggestions:
                suggestions[potential_friend] = set()
            suggestions[potential_friend].add(friend)
    
    # Sort by number of mutual friends
    ranked = sorted(
        suggestions.items(),
        key=lambda x: len(x[1]),
        reverse=True
    )
    
    return [
        {
            "username": user,
            "mutual_friends": len(mutuals),
            "through": list(mutuals)
        }
        for user, mutuals in ranked[:limit]
    ]

def network_get_statistics(network):
    """Calculate network statistics"""
    if not network["users"]:
        return {}
    
    all_users = set(network["users"].keys())
    friend_counts = [len(friends) for friends in network["users"].values()]
    
    return {
        "total_users": len(all_users),
        "total_friendships": sum(friend_counts) // 2,
        "avg_friends": sum(friend_counts) / len(friend_counts),
        "most_connected": max(network["users"].items(), key=lambda x: len(x[1]))[0],
        "isolated_users": [u for u, f in network["users"].items() if len(f) == 0]
    }

# Usage
network = create_social_network()

# Add friendships
friendships = [
    ("Alice", "Bob"),
    ("Alice", "Charlie"),
    ("Bob", "Charlie"),
    ("Bob", "David"),
    ("Charlie", "David"),
    ("Charlie", "Eve"),
    ("David", "Frank")
]

for user1, user2 in friendships:
    network_add_friendship(network, user1, user2)

# Get suggestions for Alice
suggestions = network_suggest_friends(network, "Alice")
print("Friend suggestions for Alice:")
for suggestion in suggestions:
    print(f"  {suggestion['username']}: {suggestion['mutual_friends']} mutual friends")
    print(f"    Through: {', '.join(suggestion['through'])}")

# Network stats
stats = network_get_statistics(network)
print(f"\nNetwork Statistics:")
print(f"  Total users: {stats['total_users']}")
print(f"  Total friendships: {stats['total_friendships']}")
print(f"  Average friends: {stats['avg_friends']:.1f}")
```

## Project 3: Tag-Based Search Engine

Build a simple search engine using sets for tag matching.

```python
def create_tag_search_engine():
    """Create a search engine that indexes documents by tags"""
    return {
        "documents": {},  # doc_id -> {title, content, tags}
        "tag_index": {}   # tag -> set of doc_ids
    }

def search_add_document(engine, doc_id, title, content, tags):
    """Add document to search engine"""
    engine["documents"][doc_id] = {
        "title": title,
        "content": content,
        "tags": tags
    }
    
    # Update tag index
    for tag in tags:
        if tag not in engine["tag_index"]:
            engine["tag_index"][tag] = set()
        engine["tag_index"][tag].add(doc_id)

def search_by_tags(engine, required_tags=None, 
                   optional_tags=None,
                   excluded_tags=None):
    """
    Search documents by tags
    - required_tags: document must have ALL these tags
    - optional_tags: boost ranking if document has these
    - excluded_tags: document must NOT have any of these
    """
    if required_tags is None:
        required_tags = set()
    if optional_tags is None:
        optional_tags = set()
    if excluded_tags is None:
        excluded_tags = set()
    
    # Start with all documents
    matching_docs = set(engine["documents"].keys())
    
    # Apply required tags (AND operation)
    for tag in required_tags:
        if tag in engine["tag_index"]:
            matching_docs &= engine["tag_index"][tag]
        else:
            return []  # No documents have this required tag
    
    # Exclude documents with excluded tags
    for tag in excluded_tags:
        if tag in engine["tag_index"]:
            matching_docs -= engine["tag_index"][tag]
    
    # Calculate relevance score
    results = []
    for doc_id in matching_docs:
        doc = engine["documents"][doc_id]
        
        # Count optional tags matched
        optional_matched = doc["tags"] & optional_tags
        score = len(optional_matched)
        
        results.append({
            "doc_id": doc_id,
            "title": doc["title"],
            "tags": doc["tags"],
            "score": score,
            "matched_optional": optional_matched
        })
    
    # Sort by score
    results.sort(key=lambda x: x["score"], reverse=True)
    return results

def search_find_related(engine, doc_id, limit=5):
    """Find related documents by tag similarity"""
    if doc_id not in engine["documents"]:
        return []
    
    doc_tags = engine["documents"][doc_id]["tags"]
    similarities = []
    
    for other_id, other_doc in engine["documents"].items():
        if other_id == doc_id:
            continue
        
        other_tags = other_doc["tags"]
        
        # Calculate Jaccard similarity
        intersection = doc_tags & other_tags
        union = doc_tags | other_tags
        
        if union:
            similarity = len(intersection) / len(union)
            similarities.append({
                "doc_id": other_id,
                "title": other_doc["title"],
                "similarity": similarity,
                "common_tags": intersection
            })
    
    # Sort by similarity
    similarities.sort(key=lambda x: x["similarity"], reverse=True)
    return similarities[:limit]

def search_get_tag_statistics(engine):
    """Get tag usage statistics"""
    return {
        "total_tags": len(engine["tag_index"]),
        "most_common": sorted(
            engine["tag_index"].items(),
            key=lambda x: len(x[1]),
            reverse=True
        )[:10],
        "tag_counts": {
            tag: len(docs) 
            for tag, docs in engine["tag_index"].items()
        }
    }

# Usage
search_engine = create_tag_search_engine()

# Add documents
search_add_document(
    search_engine,
    "doc1",
    "Introduction to Python",
    "Learn Python basics...",
    {"python", "programming", "beginner", "tutorial"}
)

search_add_document(
    search_engine,
    "doc2",
    "Advanced Python Patterns",
    "Master Python design patterns...",
    {"python", "programming", "advanced", "patterns"}
)

search_add_document(
    search_engine,
    "doc3",
    "JavaScript for Beginners",
    "Learn JavaScript...",
    {"javascript", "programming", "beginner", "web"}
)

# Search: must have "python" and "programming", prefer "advanced"
results = search_by_tags(
    search_engine,
    required_tags={"python", "programming"},
    optional_tags={"advanced", "patterns"}
)

print("Search results:")
for result in results:
    print(f"  {result['title']} (score: {result['score']})")
    print(f"    Tags: {result['tags']}")

# Find related documents
related = search_find_related(search_engine, "doc1")
print("\nRelated to 'Introduction to Python':")
for doc in related:
    print(f"  {doc['title']} (similarity: {doc['similarity']:.2f})")
    print(f"    Common tags: {doc['common_tags']}")
```

## Project 4: Email Domain Analyzer

Analyze email domains and find patterns using sets.

```python
def create_email_analyzer():
    """Create an email analyzer for domains and patterns"""
    return {
        "emails": set(),
        "domains": {}  # domain -> set of emails
    }

def analyzer_add_emails(analyzer, email_list):
    """Add emails to analyzer"""
    for email in email_list:
        email = email.lower().strip()
        if '@' in email:
            analyzer["emails"].add(email)
            domain = email.split('@')[1]
            
            if domain not in analyzer["domains"]:
                analyzer["domains"][domain] = set()
            analyzer["domains"][domain].add(email)

def analyzer_find_duplicate_users(analyzer):
    """Find users with multiple email addresses"""
    usernames = {}  # username -> set of full emails
    
    for email in analyzer["emails"]:
        username = email.split('@')[0]
        if username not in usernames:
            usernames[username] = set()
        usernames[username].add(email)
    
    # Return only duplicates
    return {
        username: emails 
        for username, emails in usernames.items() 
        if len(emails) > 1
    }

def analyzer_compare_domain_users(analyzer, domain1, domain2):
    """Compare users between two domains"""
    users1 = {email.split('@')[0] for email in analyzer["domains"].get(domain1, set())}
    users2 = {email.split('@')[0] for email in analyzer["domains"].get(domain2, set())}
    
    return {
        "domain1_only": users1 - users2,
        "domain2_only": users2 - users1,
        "both_domains": users1 & users2,
        "total_unique": users1 | users2
    }

def analyzer_find_corporate_patterns(analyzer):
    """Identify corporate email patterns"""
    corporate_domains = {
        "gmail.com", "yahoo.com", "hotmail.com", 
        "outlook.com", "icloud.com"
    }
    
    all_domains = set(analyzer["domains"].keys())
    
    return {
        "personal_email_domains": all_domains & corporate_domains,
        "corporate_domains": all_domains - corporate_domains,
        "unique_domains": len(all_domains),
        "largest_domain": max(
            analyzer["domains"].items(),
            key=lambda x: len(x[1])
        )[0] if analyzer["domains"] else None
    }

# Usage
analyzer = create_email_analyzer()

emails = [
    "john@company.com",
    "john@gmail.com",
    "jane@company.com",
    "bob@company.com",
    "bob@personal.net",
    "alice@company.com",
    "charlie@startup.io"
]

analyzer_add_emails(analyzer, emails)

# Find duplicates
duplicates = analyzer_find_duplicate_users(analyzer)
print("Users with multiple emails:")
for username, email_set in duplicates.items():
    print(f"  {username}: {email_set}")

# Compare domains
comparison = analyzer_compare_domain_users(analyzer, "company.com", "gmail.com")
print(f"\nUsers in both domains: {comparison['both_domains']}")

# Corporate patterns
patterns = analyzer_find_corporate_patterns(analyzer)
print(f"\nCorporate domains: {patterns['corporate_domains']}")
print(f"Largest domain: {patterns['largest_domain']}")
```

## Summary

These projects demonstrate practical applications of sets:

1. **Duplicate Finder**: Set operations for identifying duplicates
2. **Social Network**: Set intersection for mutual friends
3. **Search Engine**: Set operations for tag matching and filtering
4. **Email Analyzer**: Set comparison for pattern analysis

**Key techniques used:**
- Set intersection (`&`) for finding commonalities
- Set difference (`-`) for filtering
- Set union (`|`) for combining
- Sets with other data structures (dicts, lists)
- Real-world problem solving with sets

Sets excel at membership testing, removing duplicates, and mathematical operations on collections!
