---
id: "042"
title: "Abstraction Capstone Project"
chapterId: "04"
order: 9
duration: "18 minutes"
objectives:
  - "Apply all abstraction concepts in a comprehensive project"
  - "Design a multi-layer system with proper abstractions"
  - "Balance abstraction benefits against complexity costs"
  - "Create testable, maintainable, and extensible architecture"
  - "Synthesize ABC, interfaces, protocols, patterns, and SOLID principles"
---

# Abstraction Capstone Project

This capstone lesson brings together everything you've learned about abstraction. We'll design and implement a complete **Content Management System (CMS)** that demonstrates proper abstraction at every layer.

## Introduction

Building a Content Management System requires careful abstraction design:
- Multiple storage backends (file, database, cloud)
- Various content types (articles, pages, media)
- Different rendering formats (HTML, Markdown, PDF)
- Search and indexing capabilities
- User permissions and access control
- Caching and performance optimization

This project will show how abstraction enables flexibility while maintaining clarity.

## Project Requirements

### Functional Requirements

1. **Content Management**
   - Create, read, update, delete content
   - Support multiple content types (Article, Page, Media)
   - Version control for content changes

2. **Storage Flexibility**
   - Support file system storage
   - Support database storage
   - Support cloud storage (S3)
   - Easy to switch between storage backends

3. **Rendering System**
   - Render content to HTML
   - Render content to Markdown
   - Generate PDF exports
   - Extensible to new formats

4. **Search Capabilities**
   - Full-text search across content
   - Support different search engines (simple, Elasticsearch)
   - Index content for fast retrieval

5. **Access Control**
   - Role-based permissions
   - Content visibility rules
   - User authentication

### Non-Functional Requirements

1. **Testability**: Easy to unit test without external dependencies
2. **Maintainability**: Clear separation of concerns
3. **Extensibility**: Add new features without modifying existing code
4. **Performance**: Efficient with caching where appropriate

## System Architecture

### Layer Overview

```
┌─────────────────────────────────────────────┐
│          Application Layer (API)             │  ← Highest abstraction
├─────────────────────────────────────────────┤
│         Service Layer (Business Logic)       │
├─────────────────────────────────────────────┤
│      Repository Layer (Data Access)          │
├─────────────────────────────────────────────┤
│    Infrastructure Layer (Implementations)    │  ← Lowest abstraction
└─────────────────────────────────────────────┘
```

## Implementation

### Part 1: Domain Models

Define core business entities:

```python
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List
from enum import Enum
from abc import ABC, abstractmethod

class ContentType(Enum):
    """Content type enumeration."""
    ARTICLE = "article"
    PAGE = "page"
    MEDIA = "media"

class ContentStatus(Enum):
    """Content status enumeration."""
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"

@dataclass
class Content:
    """Core domain model for content."""
    id: str
    title: str
    body: str
    content_type: ContentType
    status: ContentStatus
    author_id: str
    created_at: datetime
    updated_at: datetime
    tags: List[str] = field(default_factory=list)
    metadata: dict = field(default_factory=dict)
    version: int = 1
    
    def publish(self) -> None:
        """Publish content - business logic."""
        if self.status == ContentStatus.DRAFT:
            self.status = ContentStatus.PUBLISHED
            self.updated_at = datetime.now()
    
    def archive(self) -> None:
        """Archive content - business logic."""
        self.status = ContentStatus.ARCHIVED
        self.updated_at = datetime.now()
    
    def add_tag(self, tag: str) -> None:
        """Add tag if not already present."""
        if tag not in self.tags:
            self.tags.append(tag)
    
    def is_published(self) -> bool:
        """Check if content is published."""
        return self.status == ContentStatus.PUBLISHED


@dataclass
class User:
    """User domain model."""
    id: str
    username: str
    email: str
    role: str
    created_at: datetime
    
    def can_edit_content(self, content: Content) -> bool:
        """Business rule: Who can edit content."""
        return (
            self.role == 'admin' or 
            (self.role == 'editor' and content.author_id == self.id)
        )
    
    def can_publish_content(self) -> bool:
        """Business rule: Who can publish."""
        return self.role in ('admin', 'editor')


@dataclass
class SearchResult:
    """Search result domain model."""
    content_id: str
    title: str
    snippet: str
    score: float
    content_type: ContentType
```

### Part 2: Storage Abstraction

Define storage layer abstractions:

```python
from typing import Protocol, Optional, List

class ContentRepository(Protocol):
    """Repository abstraction for content storage.
    
    Uses Protocol instead of ABC for structural subtyping.
    """
    
    def save(self, content: Content) -> None:
        """Save or update content."""
        ...
    
    def find_by_id(self, content_id: str) -> Optional[Content]:
        """Find content by ID."""
        ...
    
    def find_all(self) -> List[Content]:
        """Retrieve all content."""
        ...
    
    def find_by_author(self, author_id: str) -> List[Content]:
        """Find content by author."""
        ...
    
    def find_by_tag(self, tag: str) -> List[Content]:
        """Find content by tag."""
        ...
    
    def find_by_status(self, status: ContentStatus) -> List[Content]:
        """Find content by status."""
        ...
    
    def delete(self, content_id: str) -> None:
        """Delete content."""
        ...


class FileSystemContentRepository:
    """Concrete implementation using file system."""
    
    def __init__(self, base_path: str):
        self.base_path = base_path
        self._ensure_directory_exists()
    
    def save(self, content: Content) -> None:
        """Save content to JSON file."""
        import json
        import os
        
        filepath = self._get_filepath(content.id)
        
        # Convert content to dictionary
        content_dict = {
            'id': content.id,
            'title': content.title,
            'body': content.body,
            'content_type': content.content_type.value,
            'status': content.status.value,
            'author_id': content.author_id,
            'created_at': content.created_at.isoformat(),
            'updated_at': content.updated_at.isoformat(),
            'tags': content.tags,
            'metadata': content.metadata,
            'version': content.version
        }
        
        # Write to file
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(content_dict, f, indent=2)
    
    def find_by_id(self, content_id: str) -> Optional[Content]:
        """Load content from JSON file."""
        import json
        import os
        
        filepath = self._get_filepath(content_id)
        
        if not os.path.exists(filepath):
            return None
        
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Convert dictionary to Content object
        return Content(
            id=data['id'],
            title=data['title'],
            body=data['body'],
            content_type=ContentType(data['content_type']),
            status=ContentStatus(data['status']),
            author_id=data['author_id'],
            created_at=datetime.fromisoformat(data['created_at']),
            updated_at=datetime.fromisoformat(data['updated_at']),
            tags=data.get('tags', []),
            metadata=data.get('metadata', {}),
            version=data.get('version', 1)
        )
    
    def find_all(self) -> List[Content]:
        """Load all content files."""
        import os
        
        content_list = []
        
        for filename in os.listdir(self.base_path):
            if filename.endswith('.json'):
                content_id = filename[:-5]  # Remove .json
                content = self.find_by_id(content_id)
                if content:
                    content_list.append(content)
        
        return content_list
    
    def find_by_author(self, author_id: str) -> List[Content]:
        """Filter content by author."""
        all_content = self.find_all()
        return [c for c in all_content if c.author_id == author_id]
    
    def find_by_tag(self, tag: str) -> List[Content]:
        """Filter content by tag."""
        all_content = self.find_all()
        return [c for c in all_content if tag in c.tags]
    
    def find_by_status(self, status: ContentStatus) -> List[Content]:
        """Filter content by status."""
        all_content = self.find_all()
        return [c for c in all_content if c.status == status]
    
    def delete(self, content_id: str) -> None:
        """Delete content file."""
        import os
        filepath = self._get_filepath(content_id)
        if os.path.exists(filepath):
            os.remove(filepath)
    
    def _get_filepath(self, content_id: str) -> str:
        """Get file path for content ID."""
        return f"{self.base_path}/{content_id}.json"
    
    def _ensure_directory_exists(self) -> None:
        """Create directory if it doesn't exist."""
        import os
        os.makedirs(self.base_path, exist_ok=True)


class DatabaseContentRepository:
    """Alternative implementation using database.
    
    Demonstrates same interface, different implementation.
    """
    
    def __init__(self, db_connection):
        self.db = db_connection
        self._ensure_table_exists()
    
    def save(self, content: Content) -> None:
        """Save content to database."""
        query = '''
            INSERT OR REPLACE INTO contents 
            (id, title, body, content_type, status, author_id, 
             created_at, updated_at, tags, metadata, version)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        '''
        
        import json
        self.db.execute(query, (
            content.id,
            content.title,
            content.body,
            content.content_type.value,
            content.status.value,
            content.author_id,
            content.created_at.isoformat(),
            content.updated_at.isoformat(),
            json.dumps(content.tags),
            json.dumps(content.metadata),
            content.version
        ))
        self.db.commit()
    
    def find_by_id(self, content_id: str) -> Optional[Content]:
        """Find content by ID in database."""
        query = 'SELECT * FROM contents WHERE id = ?'
        row = self.db.execute(query, (content_id,)).fetchone()
        
        if row is None:
            return None
        
        return self._row_to_content(row)
    
    def find_all(self) -> List[Content]:
        """Get all content from database."""
        query = 'SELECT * FROM contents'
        rows = self.db.execute(query).fetchall()
        return [self._row_to_content(row) for row in rows]
    
    def find_by_author(self, author_id: str) -> List[Content]:
        """Find by author using SQL query."""
        query = 'SELECT * FROM contents WHERE author_id = ?'
        rows = self.db.execute(query, (author_id,)).fetchall()
        return [self._row_to_content(row) for row in rows]
    
    def find_by_status(self, status: ContentStatus) -> List[Content]:
        """Find by status using SQL query."""
        query = 'SELECT * FROM contents WHERE status = ?'
        rows = self.db.execute(query, (status.value,)).fetchall()
        return [self._row_to_content(row) for row in rows]
    
    def find_by_tag(self, tag: str) -> List[Content]:
        """Find by tag - requires JSON parsing."""
        import json
        all_content = self.find_all()
        return [c for c in all_content if tag in c.tags]
    
    def delete(self, content_id: str) -> None:
        """Delete content from database."""
        query = 'DELETE FROM contents WHERE id = ?'
        self.db.execute(query, (content_id,))
        self.db.commit()
    
    def _row_to_content(self, row) -> Content:
        """Convert database row to Content object."""
        import json
        return Content(
            id=row['id'],
            title=row['title'],
            body=row['body'],
            content_type=ContentType(row['content_type']),
            status=ContentStatus(row['status']),
            author_id=row['author_id'],
            created_at=datetime.fromisoformat(row['created_at']),
            updated_at=datetime.fromisoformat(row['updated_at']),
            tags=json.loads(row['tags']),
            metadata=json.loads(row['metadata']),
            version=row['version']
        )
    
    def _ensure_table_exists(self) -> None:
        """Create table if not exists."""
        query = '''
            CREATE TABLE IF NOT EXISTS contents (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                body TEXT NOT NULL,
                content_type TEXT NOT NULL,
                status TEXT NOT NULL,
                author_id TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                tags TEXT NOT NULL,
                metadata TEXT NOT NULL,
                version INTEGER NOT NULL
            )
        '''
        self.db.execute(query)
        self.db.commit()
```

### Part 3: Rendering Abstraction

Abstract rendering to different formats:

```python
class ContentRenderer(ABC):
    """Abstract base class for content rendering."""
    
    @abstractmethod
    def render(self, content: Content) -> str:
        """Render content to specific format."""
        pass
    
    @abstractmethod
    def get_mime_type(self) -> str:
        """Get MIME type for rendered output."""
        pass


class HTMLRenderer(ContentRenderer):
    """Render content as HTML."""
    
    def render(self, content: Content) -> str:
        """Render to HTML."""
        html = f"""
<!DOCTYPE html>
<html>
<head>
    <title>{content.title}</title>
    <meta name="author" content="{content.author_id}">
    <meta name="created" content="{content.created_at.isoformat()}">
</head>
<body>
    <article>
        <h1>{content.title}</h1>
        <div class="metadata">
            <span class="type">{content.content_type.value}</span>
            <span class="status">{content.status.value}</span>
            <time datetime="{content.created_at.isoformat()}">
                {content.created_at.strftime('%Y-%m-%d')}
            </time>
        </div>
        <div class="tags">
            {self._render_tags(content.tags)}
        </div>
        <div class="content">
            {self._format_body(content.body)}
        </div>
    </article>
</body>
</html>
        """
        return html.strip()
    
    def get_mime_type(self) -> str:
        return "text/html"
    
    def _render_tags(self, tags: List[str]) -> str:
        """Render tags as HTML."""
        if not tags:
            return ""
        return " ".join(f'<span class="tag">{tag}</span>' for tag in tags)
    
    def _format_body(self, body: str) -> str:
        """Format body text as HTML paragraphs."""
        paragraphs = body.split('\n\n')
        return '\n'.join(f'<p>{p}</p>' for p in paragraphs if p.strip())


class MarkdownRenderer(ContentRenderer):
    """Render content as Markdown."""
    
    def render(self, content: Content) -> str:
        """Render to Markdown."""
        md_parts = [
            f"# {content.title}",
            "",
            f"**Type:** {content.content_type.value}",
            f"**Status:** {content.status.value}",
            f"**Author:** {content.author_id}",
            f"**Created:** {content.created_at.strftime('%Y-%m-%d')}",
            "",
        ]
        
        if content.tags:
            tags_str = ", ".join(f"`{tag}`" for tag in content.tags)
            md_parts.append(f"**Tags:** {tags_str}")
            md_parts.append("")
        
        md_parts.append("---")
        md_parts.append("")
        md_parts.append(content.body)
        
        return "\n".join(md_parts)
    
    def get_mime_type(self) -> str:
        return "text/markdown"


class JSONRenderer(ContentRenderer):
    """Render content as JSON."""
    
    def render(self, content: Content) -> str:
        """Render to JSON."""
        import json
        
        data = {
            'id': content.id,
            'title': content.title,
            'body': content.body,
            'contentType': content.content_type.value,
            'status': content.status.value,
            'authorId': content.author_id,
            'createdAt': content.created_at.isoformat(),
            'updatedAt': content.updated_at.isoformat(),
            'tags': content.tags,
            'metadata': content.metadata,
            'version': content.version
        }
        
        return json.dumps(data, indent=2)
    
    def get_mime_type(self) -> str:
        return "application/json"


class RenderingService:
    """Service to manage rendering."""
    
    def __init__(self):
        self._renderers = {}
    
    def register_renderer(self, format_name: str, renderer: ContentRenderer) -> None:
        """Register renderer for format."""
        self._renderers[format_name] = renderer
    
    def render(self, content: Content, format_name: str) -> tuple[str, str]:
        """Render content in specified format.
        
        Returns:
            tuple: (rendered_content, mime_type)
        """
        renderer = self._renderers.get(format_name)
        
        if renderer is None:
            raise ValueError(f"Unknown format: {format_name}")
        
        rendered = renderer.render(content)
        mime_type = renderer.get_mime_type()
        
        return rendered, mime_type
    
    def available_formats(self) -> List[str]:
        """Get list of available formats."""
        return list(self._renderers.keys())
```

### Part 4: Search Abstraction

Abstract search capabilities:

```python
class SearchEngine(Protocol):
    """Protocol for search engines."""
    
    def index_content(self, content: Content) -> None:
        """Add content to search index."""
        ...
    
    def search(self, query: str, limit: int = 10) -> List[SearchResult]:
        """Search for content."""
        ...
    
    def remove_from_index(self, content_id: str) -> None:
        """Remove content from index."""
        ...


class SimpleSearchEngine:
    """Simple in-memory full-text search."""
    
    def __init__(self):
        self._index = {}  # content_id -> Content
    
    def index_content(self, content: Content) -> None:
        """Add to in-memory index."""
        self._index[content.id] = content
    
    def search(self, query: str, limit: int = 10) -> List[SearchResult]:
        """Simple text search."""
        query_lower = query.lower()
        results = []
        
        for content in self._index.values():
            # Search in title and body
            title_match = query_lower in content.title.lower()
            body_match = query_lower in content.body.lower()
            
            if title_match or body_match:
                # Calculate simple relevance score
                score = 0.0
                if title_match:
                    score += 2.0  # Title matches worth more
                if body_match:
                    score += 1.0
                
                # Extract snippet
                snippet = self._extract_snippet(content.body, query_lower)
                
                results.append(SearchResult(
                    content_id=content.id,
                    title=content.title,
                    snippet=snippet,
                    score=score,
                    content_type=content.content_type
                ))
        
        # Sort by score descending
        results.sort(key=lambda r: r.score, reverse=True)
        
        return results[:limit]
    
    def remove_from_index(self, content_id: str) -> None:
        """Remove from index."""
        self._index.pop(content_id, None)
    
    def _extract_snippet(self, text: str, query: str, context_chars: int = 100) -> str:
        """Extract snippet around query match."""
        text_lower = text.lower()
        index = text_lower.find(query)
        
        if index == -1:
            return text[:context_chars] + "..."
        
        start = max(0, index - context_chars // 2)
        end = min(len(text), index + len(query) + context_chars // 2)
        
        snippet = text[start:end]
        
        if start > 0:
            snippet = "..." + snippet
        if end < len(text):
            snippet = snippet + "..."
        
        return snippet
```

### Part 5: Service Layer (Business Logic)

Orchestrate operations at business logic level:

```python
class ContentService:
    """High-level business logic for content management."""
    
    def __init__(
        self,
        repository: ContentRepository,
        search_engine: SearchEngine,
        rendering_service: RenderingService
    ):
        self.repository = repository
        self.search = search_engine
        self.rendering = rendering_service
    
    def create_content(
        self,
        title: str,
        body: str,
        content_type: ContentType,
        author_id: str,
        tags: List[str] = None
    ) -> Content:
        """Create new content."""
        import uuid
        
        # Business logic: Generate ID, set defaults
        content = Content(
            id=str(uuid.uuid4()),
            title=title,
            body=body,
            content_type=content_type,
            status=ContentStatus.DRAFT,
            author_id=author_id,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            tags=tags or [],
            metadata={},
            version=1
        )
        
        # Persist
        self.repository.save(content)
        
        # Index for search
        self.search.index_content(content)
        
        return content
    
    def update_content(
        self,
        content_id: str,
        title: Optional[str] = None,
        body: Optional[str] = None,
        tags: Optional[List[str]] = None
    ) -> Content:
        """Update existing content."""
        content = self.repository.find_by_id(content_id)
        
        if content is None:
            raise ValueError(f"Content not found: {content_id}")
        
        # Business logic: Update fields, increment version
        if title is not None:
            content.title = title
        if body is not None:
            content.body = body
        if tags is not None:
            content.tags = tags
        
        content.updated_at = datetime.now()
        content.version += 1
        
        # Persist
        self.repository.save(content)
        
        # Update search index
        self.search.index_content(content)
        
        return content
    
    def publish_content(self, content_id: str, user: User) -> Content:
        """Publish content with permission check."""
        content = self.repository.find_by_id(content_id)
        
        if content is None:
            raise ValueError(f"Content not found: {content_id}")
        
        # Business rule: Check permissions
        if not user.can_publish_content():
            raise PermissionError(f"User cannot publish content")
        
        # Business logic: Publish
        content.publish()
        
        # Persist
        self.repository.save(content)
        
        # Update index
        self.search.index_content(content)
        
        return content
    
    def delete_content(self, content_id: str, user: User) -> None:
        """Delete content with permission check."""
        content = self.repository.find_by_id(content_id)
        
        if content is None:
            raise ValueError(f"Content not found: {content_id}")
        
        # Business rule: Check permissions
        if not user.can_edit_content(content):
            raise PermissionError("User cannot delete this content")
        
        # Remove from storage
        self.repository.delete(content_id)
        
        # Remove from search index
        self.search.remove_from_index(content_id)
    
    def search_content(self, query: str, limit: int = 10) -> List[SearchResult]:
        """Search for content."""
        return self.search.search(query, limit)
    
    def render_content(
        self,
        content_id: str,
        format_name: str
    ) -> tuple[str, str]:
        """Render content in specified format."""
        content = self.repository.find_by_id(content_id)
        
        if content is None:
            raise ValueError(f"Content not found: {content_id}")
        
        # Business rule: Only render published content
        if not content.is_published():
            raise ValueError("Cannot render unpublished content")
        
        return self.rendering.render(content, format_name)
    
    def get_user_content(self, author_id: str) -> List[Content]:
        """Get all content by author."""
        return self.repository.find_by_author(author_id)
    
    def get_published_content(self) -> List[Content]:
        """Get all published content."""
        return self.repository.find_by_status(ContentStatus.PUBLISHED)
```

### Part 6: Application Layer (API)

Top-level orchestration:

```python
class ContentManagementSystem:
    """Application facade - highest level of abstraction."""
    
    def __init__(self, storage_type: str = 'filesystem'):
        """Initialize CMS with chosen storage backend."""
        
        # Set up repository based on type
        if storage_type == 'filesystem':
            repository = FileSystemContentRepository('./content_data')
        elif storage_type == 'database':
            import sqlite3
            db = sqlite3.connect('cms.db')
            db.row_factory = sqlite3.Row
            repository = DatabaseContentRepository(db)
        else:
            raise ValueError(f"Unknown storage type: {storage_type}")
        
        # Set up search engine
        search_engine = SimpleSearchEngine()
        
        # Set up rendering service
        rendering_service = RenderingService()
        rendering_service.register_renderer('html', HTMLRenderer())
        rendering_service.register_renderer('markdown', MarkdownRenderer())
        rendering_service.register_renderer('json', JSONRenderer())
        
        # Create service layer
        self.content_service = ContentService(
            repository,
            search_engine,
            rendering_service
        )
        
        # Initialize index
        self._initialize_search_index()
    
    def _initialize_search_index(self) -> None:
        """Index all existing content."""
        all_content = self.content_service.repository.find_all()
        for content in all_content:
            self.content_service.search.index_content(content)
    
    def create_article(
        self,
        title: str,
        body: str,
        author_id: str,
        tags: List[str] = None
    ) -> str:
        """Create new article - simplified API."""
        content = self.content_service.create_content(
            title=title,
            body=body,
            content_type=ContentType.ARTICLE,
            author_id=author_id,
            tags=tags
        )
        return content.id
    
    def update_article(
        self,
        content_id: str,
        title: Optional[str] = None,
        body: Optional[str] = None,
        tags: Optional[List[str]] = None
    ) -> None:
        """Update article."""
        self.content_service.update_content(content_id, title, body, tags)
    
    def publish_article(self, content_id: str, user: User) -> None:
        """Publish article."""
        self.content_service.publish_content(content_id, user)
    
    def delete_article(self, content_id: str, user: User) -> None:
        """Delete article."""
        self.content_service.delete_content(content_id, user)
    
    def search_articles(self, query: str) -> List[SearchResult]:
        """Search articles."""
        return self.content_service.search_content(query)
    
    def export_article(self, content_id: str, format: str = 'html') -> str:
        """Export article in specified format."""
        rendered, _ = self.content_service.render_content(content_id, format)
        return rendered
    
    def get_my_articles(self, author_id: str) -> List[Content]:
        """Get user's articles."""
        return self.content_service.get_user_content(author_id)
    
    def get_published_articles(self) -> List[Content]:
        """Get all published articles."""
        return self.content_service.get_published_content()
```

## Usage Examples

### Example 1: Basic Operations

```python
# Initialize CMS with file system storage
cms = ContentManagementSystem(storage_type='filesystem')

# Create user
admin = User(
    id='user-1',
    username='admin',
    email='admin@example.com',
    role='admin',
    created_at=datetime.now()
)

# Create article
article_id = cms.create_article(
    title="Introduction to Python OOP",
    body="Object-oriented programming in Python...",
    author_id=admin.id,
    tags=['python', 'oop', 'tutorial']
)

# Update article
cms.update_article(
    article_id,
    title="Complete Guide to Python OOP",
    body="Updated content..."
)

# Publish article
cms.publish_article(article_id, admin)

# Export to different formats
html_output = cms.export_article(article_id, 'html')
markdown_output = cms.export_article(article_id, 'markdown')
json_output = cms.export_article(article_id, 'json')
```

### Example 2: Search

```python
# Create multiple articles
for i in range(5):
    cms.create_article(
        title=f"Article {i}",
        body=f"Content about Python programming topic {i}",
        author_id=admin.id,
        tags=['python']
    )

# Search articles
results = cms.search_articles("Python programming")

for result in results:
    print(f"{result.title} (score: {result.score})")
    print(f"  {result.snippet}")
    print()
```

### Example 3: Switching Storage Backends

```python
# Start with filesystem
cms_fs = ContentManagementSystem(storage_type='filesystem')
article_id = cms_fs.create_article("Test Article", "Content", admin.id)

# Later, switch to database - no code changes needed!
cms_db = ContentManagementSystem(storage_type='database')
article_id = cms_db.create_article("Test Article", "Content", admin.id)

# Both work exactly the same way
```

## Testing the System

The abstraction layers enable comprehensive testing:

```python
# === MOCK IMPLEMENTATIONS FOR TESTING ===

class MockContentRepository:
    """Mock repository for testing."""
    
    def __init__(self):
        self.contents = {}
        self.save_called = False
        self.delete_called = False
    
    def save(self, content: Content) -> None:
        self.save_called = True
        self.contents[content.id] = content
    
    def find_by_id(self, content_id: str) -> Optional[Content]:
        return self.contents.get(content_id)
    
    def find_all(self) -> List[Content]:
        return list(self.contents.values())
    
    def find_by_author(self, author_id: str) -> List[Content]:
        return [c for c in self.contents.values() if c.author_id == author_id]
    
    def find_by_status(self, status: ContentStatus) -> List[Content]:
        return [c for c in self.contents.values() if c.status == status]
    
    def find_by_tag(self, tag: str) -> List[Content]:
        return [c for c in self.contents.values() if tag in c.tags]
    
    def delete(self, content_id: str) -> None:
        self.delete_called = True
        self.contents.pop(content_id, None)


class MockSearchEngine:
    """Mock search engine for testing."""
    
    def __init__(self):
        self.indexed = []
        self.removed = []
    
    def index_content(self, content: Content) -> None:
        self.indexed.append(content.id)
    
    def search(self, query: str, limit: int = 10) -> List[SearchResult]:
        return []  # Return empty for tests
    
    def remove_from_index(self, content_id: str) -> None:
        self.removed.append(content_id)


# === TEST CASES ===

def test_create_content():
    """Test content creation."""
    # Arrange
    mock_repo = MockContentRepository()
    mock_search = MockSearchEngine()
    rendering = RenderingService()
    
    service = ContentService(mock_repo, mock_search, rendering)
    
    # Act
    content = service.create_content(
        title="Test",
        body="Test content",
        content_type=ContentType.ARTICLE,
        author_id="user-1",
        tags=['test']
    )
    
    # Assert
    assert mock_repo.save_called
    assert content.id in mock_repo.contents
    assert content.id in mock_search.indexed
    assert content.status == ContentStatus.DRAFT


def test_publish_content_requires_permission():
    """Test publish permission check."""
    # Arrange
    mock_repo = MockContentRepository()
    mock_search = MockSearchEngine()
    rendering = RenderingService()
    service = ContentService(mock_repo, mock_search, rendering)
    
    # Create content
    content = service.create_content(
        "Test", "Body", ContentType.ARTICLE, "user-1"
    )
    
    # User without permission
    user = User("user-2", "viewer", "viewer@test.com", "viewer", datetime.now())
    
    # Act & Assert
    try:
        service.publish_content(content.id, user)
        assert False, "Should have raised PermissionError"
    except PermissionError:
        pass  # Expected


def test_delete_content():
    """Test content deletion."""
    # Arrange
    mock_repo = MockContentRepository()
    mock_search = MockSearchEngine()
    rendering = RenderingService()
    service = ContentService(mock_repo, mock_search, rendering)
    
    admin = User("user-1", "admin", "admin@test.com", "admin", datetime.now())
    
    content = service.create_content(
        "Test", "Body", ContentType.ARTICLE, admin.id
    )
    
    # Act
    service.delete_content(content.id, admin)
    
    # Assert
    assert mock_repo.delete_called
    assert content.id in mock_search.removed
    assert content.id not in mock_repo.contents
```

## Key Design Decisions

### 1. Protocol vs ABC

Used Protocol for `ContentRepository` and `SearchEngine`:
- **Benefit**: Structural subtyping - implementations don't need to explicitly inherit
- **Trade-off**: Less explicit in code, but more flexible

### 2. Service Layer

Introduced `ContentService` between API and repositories:
- **Benefit**: Business logic centralized, reusable across different interfaces
- **Trade-off**: Additional layer, but improves testability and maintainability

### 3. Renderer Registration

Used registry pattern for renderers:
- **Benefit**: Easy to add new formats without changing code
- **Trade-off**: Runtime rather than compile-time checking

### 4. Domain Models

Separate domain models from storage:
- **Benefit**: Business logic in models, storage independent
- **Trade-off**: Translation layer needed between storage and domain

## Summary

This capstone project demonstrates:

### Abstraction Techniques Applied

1. **Abstract Base Classes**: `ContentRenderer` for rendering strategy
2. **Protocols**: `ContentRepository`, `SearchEngine` for flexible implementations
3. **Dependency Inversion**: High-level modules depend on abstractions
4. **Repository Pattern**: Abstract data access
5. **Strategy Pattern**: Different rendering strategies
6. **Facade Pattern**: `ContentManagementSystem` simplifies complex subsystems
7. **Layered Architecture**: Clear separation of concerns

### SOLID Principles

- **SRP**: Each class has single responsibility
- **OCP**: Open for extension (new renderers, storage backends), closed for modification
- **LSP**: All implementations correctly substitute abstractions
- **ISP**: Interfaces focused and minimal
- **DIP**: Depend on abstractions, not concretions

### Benefits Achieved

✅ **Testability**: Easy to mock all dependencies  
✅ **Maintainability**: Clear structure, easy to understand  
✅ **Extensibility**: New features added without changing existing code  
✅ **Flexibility**: Swap implementations easily  
✅ **Reusability**: Components reusable in different contexts

### Trade-offs Made

⚠️ More code than simple implementation  
⚠️ More indirection to trace through  
⚠️ Learning curve for new developers  
⚠️ Some runtime overhead

But these costs are justified by benefits in a real system that needs to evolve and scale.

Congratulations! You've completed the Abstraction chapter. You now understand how to design systems with appropriate abstraction levels that balance flexibility with clarity.
