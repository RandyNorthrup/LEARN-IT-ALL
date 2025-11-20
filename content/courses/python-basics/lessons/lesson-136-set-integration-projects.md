---
id: "145.5-set-integration-projects"
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

class DuplicateFileFinder:
    """Find duplicate files in directories"""
    
    def __init__(self):
        self.file_hashes = defaultdict(set)
    
    def hash_file(self, filepath: Path) -> str:
        """Calculate MD5 hash of file"""
        md5 = hashlib.md5()
        with open(filepath, 'rb') as f:
            for chunk in iter(lambda: f.read(8192), b''):
                md5.update(chunk)
        return md5.hexdigest()
    
    def scan_directory(self, directory: str):
        """Scan directory for files"""
        path = Path(directory)
        
        for file_path in path.rglob('*'):
            if file_path.is_file():
                try:
                    file_hash = self.hash_file(file_path)
                    self.file_hashes[file_hash].add(str(file_path))
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    
    def find_duplicates(self) -> dict:
        """Return files with duplicate hashes"""
        duplicates = {}
        
        for file_hash, file_paths in self.file_hashes.items():
            if len(file_paths) > 1:
                duplicates[file_hash] = file_paths
        
        return duplicates
    
    def report_duplicates(self):
        """Print duplicate file report"""
        duplicates = self.find_duplicates()
        
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
finder = DuplicateFileFinder()
finder.scan_directory("./documents")
finder.report_duplicates()
```

## Project 2: Social Network Friend Suggestions

Suggest friends based on mutual connections using set operations.

```python
class SocialNetwork:
    """Simple social network with friend suggestions"""
    
    def __init__(self):
        self.users = {}  # username -> set of friends
    
    def add_user(self, username: str):
        """Add user to network"""
        if username not in self.users:
            self.users[username] = set()
    
    def add_friendship(self, user1: str, user2: str):
        """Create bidirectional friendship"""
        self.add_user(user1)
        self.add_user(user2)
        
        self.users[user1].add(user2)
        self.users[user2].add(user1)
    
    def get_friends(self, username: str) -> set:
        """Get user's friends"""
        return self.users.get(username, set())
    
    def get_mutual_friends(self, user1: str, user2: str) -> set:
        """Find mutual friends"""
        friends1 = self.get_friends(user1)
        friends2 = self.get_friends(user2)
        return friends1 & friends2
    
    def suggest_friends(self, username: str, limit: int = 5) -> list:
        """Suggest friends based on mutual connections"""
        if username not in self.users:
            return []
        
        user_friends = self.users[username]
        suggestions = {}
        
        # Find friends of friends
        for friend in user_friends:
            friend_friends = self.users[friend]
            
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
    
    def get_network_statistics(self) -> dict:
        """Calculate network statistics"""
        if not self.users:
            return {}
        
        all_users = set(self.users.keys())
        friend_counts = [len(friends) for friends in self.users.values()]
        
        return {
            "total_users": len(all_users),
            "total_friendships": sum(friend_counts) // 2,
            "avg_friends": sum(friend_counts) / len(friend_counts),
            "most_connected": max(self.users.items(), key=lambda x: len(x[1]))[0],
            "isolated_users": [u for u, f in self.users.items() if len(f) == 0]
        }

# Usage
network = SocialNetwork()

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
    network.add_friendship(user1, user2)

# Get suggestions for Alice
suggestions = network.suggest_friends("Alice")
print("Friend suggestions for Alice:")
for suggestion in suggestions:
    print(f"  {suggestion['username']}: {suggestion['mutual_friends']} mutual friends")
    print(f"    Through: {', '.join(suggestion['through'])}")

# Network stats
stats = network.get_network_statistics()
print(f"\nNetwork Statistics:")
print(f"  Total users: {stats['total_users']}")
print(f"  Total friendships: {stats['total_friendships']}")
print(f"  Average friends: {stats['avg_friends']:.1f}")
```

## Project 3: Tag-Based Search Engine

Build a simple search engine using sets for tag matching.

```python
class TagSearchEngine:
    """Search documents by tags"""
    
    def __init__(self):
        self.documents = {}  # doc_id -> {title, content, tags}
        self.tag_index = {}  # tag -> set of doc_ids
    
    def add_document(self, doc_id: str, title: str, content: str, tags: set):
        """Add document to search engine"""
        self.documents[doc_id] = {
            "title": title,
            "content": content,
            "tags": tags
        }
        
        # Update tag index
        for tag in tags:
            if tag not in self.tag_index:
                self.tag_index[tag] = set()
            self.tag_index[tag].add(doc_id)
    
    def search_by_tags(self, required_tags: set = None, 
                      optional_tags: set = None,
                      excluded_tags: set = None) -> list:
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
        matching_docs = set(self.documents.keys())
        
        # Apply required tags (AND operation)
        for tag in required_tags:
            if tag in self.tag_index:
                matching_docs &= self.tag_index[tag]
            else:
                return []  # No documents have this required tag
        
        # Exclude documents with excluded tags
        for tag in excluded_tags:
            if tag in self.tag_index:
                matching_docs -= self.tag_index[tag]
        
        # Calculate relevance score
        results = []
        for doc_id in matching_docs:
            doc = self.documents[doc_id]
            
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
    
    def find_related(self, doc_id: str, limit: int = 5) -> list:
        """Find related documents by tag similarity"""
        if doc_id not in self.documents:
            return []
        
        doc_tags = self.documents[doc_id]["tags"]
        similarities = []
        
        for other_id, other_doc in self.documents.items():
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
    
    def get_tag_statistics(self) -> dict:
        """Get tag usage statistics"""
        return {
            "total_tags": len(self.tag_index),
            "most_common": sorted(
                self.tag_index.items(),
                key=lambda x: len(x[1]),
                reverse=True
            )[:10],
            "tag_counts": {
                tag: len(docs) 
                for tag, docs in self.tag_index.items()
            }
        }

# Usage
search_engine = TagSearchEngine()

# Add documents
search_engine.add_document(
    "doc1",
    "Introduction to Python",
    "Learn Python basics...",
    {"python", "programming", "beginner", "tutorial"}
)

search_engine.add_document(
    "doc2",
    "Advanced Python Patterns",
    "Master Python design patterns...",
    {"python", "programming", "advanced", "patterns"}
)

search_engine.add_document(
    "doc3",
    "JavaScript for Beginners",
    "Learn JavaScript...",
    {"javascript", "programming", "beginner", "web"}
)

# Search: must have "python" and "programming", prefer "advanced"
results = search_engine.search_by_tags(
    required_tags={"python", "programming"},
    optional_tags={"advanced", "patterns"}
)

print("Search results:")
for result in results:
    print(f"  {result['title']} (score: {result['score']})")
    print(f"    Tags: {result['tags']}")

# Find related documents
related = search_engine.find_related("doc1")
print("\nRelated to 'Introduction to Python':")
for doc in related:
    print(f"  {doc['title']} (similarity: {doc['similarity']:.2f})")
    print(f"    Common tags: {doc['common_tags']}")
```

## Project 4: Email Domain Analyzer

Analyze email domains and find patterns using sets.

```python
class EmailAnalyzer:
    """Analyze email addresses and domains"""
    
    def __init__(self):
        self.emails = set()
        self.domains = {}  # domain -> set of emails
    
    def add_emails(self, email_list: list):
        """Add emails to analyzer"""
        for email in email_list:
            email = email.lower().strip()
            if '@' in email:
                self.emails.add(email)
                domain = email.split('@')[1]
                
                if domain not in self.domains:
                    self.domains[domain] = set()
                self.domains[domain].add(email)
    
    def find_duplicate_users(self) -> dict:
        """Find users with multiple email addresses"""
        usernames = {}  # username -> set of full emails
        
        for email in self.emails:
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
    
    def compare_domain_users(self, domain1: str, domain2: str) -> dict:
        """Compare users between two domains"""
        users1 = {email.split('@')[0] for email in self.domains.get(domain1, set())}
        users2 = {email.split('@')[0] for email in self.domains.get(domain2, set())}
        
        return {
            "domain1_only": users1 - users2,
            "domain2_only": users2 - users1,
            "both_domains": users1 & users2,
            "total_unique": users1 | users2
        }
    
    def find_corporate_patterns(self) -> dict:
        """Identify corporate email patterns"""
        corporate_domains = {
            "gmail.com", "yahoo.com", "hotmail.com", 
            "outlook.com", "icloud.com"
        }
        
        all_domains = set(self.domains.keys())
        
        return {
            "personal_email_domains": all_domains & corporate_domains,
            "corporate_domains": all_domains - corporate_domains,
            "unique_domains": len(all_domains),
            "largest_domain": max(
                self.domains.items(),
                key=lambda x: len(x[1])
            )[0] if self.domains else None
        }

# Usage
analyzer = EmailAnalyzer()

emails = [
    "john@company.com",
    "john@gmail.com",
    "jane@company.com",
    "bob@company.com",
    "bob@personal.net",
    "alice@company.com",
    "charlie@startup.io"
]

analyzer.add_emails(emails)

# Find duplicates
duplicates = analyzer.find_duplicate_users()
print("Users with multiple emails:")
for username, email_set in duplicates.items():
    print(f"  {username}: {email_set}")

# Compare domains
comparison = analyzer.compare_domain_users("company.com", "gmail.com")
print(f"\nUsers in both domains: {comparison['both_domains']}")

# Corporate patterns
patterns = analyzer.find_corporate_patterns()
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
