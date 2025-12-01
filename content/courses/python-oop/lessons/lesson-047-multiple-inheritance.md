---
id: "047"
title: "Multiple Inheritance"
chapterId: "05"
order: 5
duration: "18 minutes"
objectives:
  - "Understand multiple inheritance and when to use it"
  - "Master Method Resolution Order (MRO) in depth"
  - "Learn to design effective multiple inheritance hierarchies"
  - "Recognize and avoid the diamond problem"
  - "Apply cooperative multiple inheritance patterns"
---

# Multiple Inheritance

Multiple inheritance allows a class to inherit from more than one parent class. While powerful, it introduces complexity that must be carefully managed. This lesson explores multiple inheritance in depth, including best practices and common pitfalls.

## Introduction

Unlike languages like Java that restrict classes to single inheritance, Python supports multiple inheritance — a class can inherit from multiple parent classes simultaneously. This enables powerful design patterns but also introduces challenges like the diamond problem and complex method resolution.

Understanding how Python handles multiple inheritance through its Method Resolution Order (MRO) is essential for using this feature effectively.

## Basic Multiple Inheritance

### Syntax

```python
class Parent1:
    def method1(self):
        return "Parent1.method1"


class Parent2:
    def method2(self):
        return "Parent2.method2"


class Child(Parent1, Parent2):  # Inherit from both
    def method3(self):
        return "Child.method3"


child = Child()
print(child.method1())  # From Parent1
print(child.method2())  # From Parent2
print(child.method3())  # From Child
```

### Multiple Parents with Same Method

When multiple parents have the same method, the **Method Resolution Order (MRO)** determines which is called:

```python
class Parent1:
    def greet(self):
        return "Hello from Parent1"


class Parent2:
    def greet(self):
        return "Hello from Parent2"


class Child(Parent1, Parent2):
    pass


child = Child()
print(child.greet())  # "Hello from Parent1" - Parent1 comes first in MRO
```

Order matters — the leftmost parent has priority:

```python
class ChildReversed(Parent2, Parent1):  # Reversed order
    pass


child2 = ChildReversed()
print(child2.greet())  # "Hello from Parent2" - Now Parent2 is first
```

## Method Resolution Order (MRO)

### What is MRO?

The **Method Resolution Order** is the order in which Python searches for methods in the inheritance hierarchy. Python uses the **C3 Linearization algorithm** to compute the MRO.

```python
class A:
    def method(self):
        return "A"


class B(A):
    def method(self):
        return "B"


class C(A):
    def method(self):
        return "C"


class D(B, C):
    def method(self):
        return "D"


# View MRO
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)

print([cls.__name__ for cls in D.mro()])
# ['D', 'B', 'C', 'A', 'object']
```

### MRO Rules

The C3 algorithm ensures:
1. **Children before parents**: Child class searched before parent classes
2. **Left-to-right**: Parents searched in the order listed
3. **Parent appears only after all children**: No parent appears before all its children have been checked

```python
class A:
    pass

class B(A):
    pass

class C(A):
    pass

class D(B, C):
    pass


# MRO: D -> B -> C -> A -> object
# D is child, so comes first
# B comes before C (left-to-right)
# A comes after both B and C (parent after children)
print(D.mro())
```

### The Diamond Problem

The diamond problem occurs when a class inherits from two classes that share a common ancestor:

```python
class A:
    def __init__(self):
        print("A.__init__")


class B(A):
    def __init__(self):
        print("B.__init__")
        super().__init__()


class C(A):
    def __init__(self):
        print("C.__init__")
        super().__init__()


class D(B, C):
    def __init__(self):
        print("D.__init__")
        super().__init__()


# Diamond shape:
#     A
#    / \
#   B   C
#    \ /
#     D

print("MRO:", [cls.__name__ for cls in D.mro()])
# MRO: ['D', 'B', 'C', 'A', 'object']

d = D()
# Output:
# D.__init__
# B.__init__
# C.__init__
# A.__init__  <- Called only once! MRO prevents duplication
```

Python's MRO ensures `A.__init__` is called only once, even though both B and C inherit from A.

## Cooperative Multiple Inheritance

### The Problem with Direct Calls

```python
class A:
    def method(self):
        print("A.method")


class B(A):
    def method(self):
        print("B.method")
        A.method(self)  # Direct call to A


class C(A):
    def method(self):
        print("C.method")
        A.method(self)  # Direct call to A


class D(B, C):
    def method(self):
        print("D.method")
        B.method(self)
        C.method(self)


d = D()
d.method()
# Output:
# D.method
# B.method
# A.method  <- Called from B
# C.method
# A.method  <- Called again from C (duplicate!)
```

### Solution: Use super() Cooperatively

```python
class A:
    def method(self):
        print("A.method")


class B(A):
    def method(self):
        print("B.method")
        super().method()  # Cooperative


class C(A):
    def method(self):
        print("C.method")
        super().method()  # Cooperative


class D(B, C):
    def method(self):
        print("D.method")
        super().method()  # Cooperative


d = D()
d.method()
# Output:
# D.method
# B.method
# C.method
# A.method  <- Called only once!
```

**Key Principle**: Every class in a multiple inheritance hierarchy should call `super()` to maintain the chain.

## Passing Arguments in Multiple Inheritance

### The Challenge

Different parents may expect different arguments:

```python
class TimestampMixin:
    def __init__(self, created_at, **kwargs):
        super().__init__(**kwargs)
        self.created_at = created_at


class UserMixin:
    def __init__(self, user_id, **kwargs):
        super().__init__(**kwargs)
        self.user_id = user_id


class Document(TimestampMixin, UserMixin):
    def __init__(self, title, created_at, user_id, **kwargs):
        super().__init__(created_at=created_at, user_id=user_id, **kwargs)
        self.title = title


# Usage
from datetime import datetime
doc = Document(
    title="Report",
    created_at=datetime.now(),
    user_id="user123"
)

print(doc.title)
print(doc.created_at)
print(doc.user_id)
```

**Pattern**: Use `**kwargs` to pass arguments through the MRO chain.

### Complete Example with **kwargs

```python
class Base:
    def __init__(self, **kwargs):
        # Base class consumes remaining kwargs
        if kwargs:
            print(f"Base: Unused kwargs: {kwargs}")


class Mixin1:
    def __init__(self, value1, **kwargs):
        super().__init__(**kwargs)
        self.value1 = value1
        print(f"Mixin1: value1={value1}")


class Mixin2:
    def __init__(self, value2, **kwargs):
        super().__init__(**kwargs)
        self.value2 = value2
        print(f"Mixin2: value2={value2}")


class Child(Mixin1, Mixin2, Base):
    def __init__(self, child_value, **kwargs):
        super().__init__(**kwargs)
        self.child_value = child_value
        print(f"Child: child_value={child_value}")


print("MRO:", [c.__name__ for c in Child.mro()])
print()

child = Child(
    child_value="C",
    value1="A",
    value2="B"
)
# Output:
# MRO: ['Child', 'Mixin1', 'Mixin2', 'Base', 'object']
#
# Child: child_value=C
# Mixin1: value1=A
# Mixin2: value2=B
```

## Mixins: A Common Pattern

**Mixins** are classes designed to add specific functionality when used in multiple inheritance:

```python
class JSONSerializableMixin:
    """Mixin to add JSON serialization."""
    
    def to_json(self) -> str:
        """Convert object to JSON."""
        import json
        # Get all attributes
        data = {
            key: value
            for key, value in self.__dict__.items()
            if not key.startswith('_')
        }
        return json.dumps(data)
    
    @classmethod
    def from_json(cls, json_str: str):
        """Create object from JSON."""
        import json
        data = json.loads(json_str)
        return cls(**data)


class ComparableMixin:
    """Mixin to add comparison functionality."""
    
    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        return self.__dict__ == other.__dict__
    
    def __ne__(self, other):
        return not self.__eq__(other)
    
    def __lt__(self, other):
        if not isinstance(other, self.__class__):
            return NotImplemented
        return str(self) < str(other)


class Person(JSONSerializableMixin, ComparableMixin):
    """Person class with mixin functionality."""
    
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"{self.name} ({self.age})"


# Use mixin methods
person1 = Person("Alice", 30)
person2 = Person("Bob", 25)

# JSON serialization from mixin
json_str = person1.to_json()
print(json_str)  # {"name": "Alice", "age": 30}

# Comparison from mixin
print(person1 == person2)  # False
print(person1 < person2)   # True (Alice < Bob alphabetically)

# Restore from JSON
person3 = Person.from_json('{"name": "Charlie", "age": 35}')
print(person3)  # Charlie (35)
```

### Mixin Naming Convention

Suffix mixin classes with "Mixin" to make their purpose clear:

```python
class LoggingMixin:
    """Adds logging functionality."""
    pass

class CachingMixin:
    """Adds caching functionality."""
    pass

class ValidationMixin:
    """Adds validation functionality."""
    pass
```

## Best Practices for Multiple Inheritance

### Practice 1: Keep Mixin Classes Simple

Mixins should provide focused functionality:

```python
# ✅ GOOD: Focused mixin
class TimestampMixin:
    """Single responsibility: Add timestamps."""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        from datetime import datetime
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
    
    def touch(self):
        """Update timestamp."""
        from datetime import datetime
        self.updated_at = datetime.now()


# ❌ BAD: Mixin doing too much
class UtilsMixin:
    """Too many responsibilities."""
    
    def save_to_db(self): pass
    def send_email(self): pass
    def validate(self): pass
    def calculate_total(self): pass
    # Mixin doing too many unrelated things!
```

### Practice 2: Use Mixins Before Base Class

List mixins before the main base class:

```python
# ✅ GOOD: Mixins first, then base class
class MyModel(LoggingMixin, CachingMixin, ValidationMixin, BaseModel):
    pass


# Reasoning: Base class usually has __init__ that should be called last
```

### Practice 3: Document MRO Dependencies

```python
class AdvancedFeature(FeatureA, FeatureB, BaseClass):
    """Advanced feature combining multiple parents.
    
    MRO: AdvancedFeature -> FeatureA -> FeatureB -> BaseClass
    
    FeatureA provides: method_a, property_x
    FeatureB provides: method_b, property_y
    BaseClass provides: core functionality
    
    Note: FeatureA.method_common overrides FeatureB.method_common
    """
    pass
```

### Practice 4: Avoid Deep Multiple Inheritance

```python
# ❌ BAD: Too complex
class Child(A, B, C, D, E, F, G):
    pass


# ✅ BETTER: Compose in layers
class FeatureGroup1(A, B):
    pass

class FeatureGroup2(C, D):
    pass

class Child(FeatureGroup1, FeatureGroup2, BaseClass):
    pass
```

### Practice 5: Test MRO Explicitly

```python
class MyClass(Parent1, Parent2, Parent3):
    pass


# Verify MRO is what you expect
expected_mro = ['MyClass', 'Parent1', 'Parent2', 'Parent3', 'object']
actual_mro = [cls.__name__ for cls in MyClass.mro()]

assert actual_mro == expected_mro, f"MRO mismatch: {actual_mro}"
```

## Common Pitfalls

### Pitfall 1: Forgetting super() in Mixin

```python
# ❌ BAD: Mixin doesn't call super()
class BadMixin:
    def __init__(self, mixin_param):
        # Forgot super().__init__()!
        self.mixin_param = mixin_param

class MyClass(BadMixin, BaseClass):
    def __init__(self, mixin_param, base_param):
        super().__init__(mixin_param=mixin_param, base_param=base_param)


# BaseClass.__init__ never called! Chain broken.


# ✅ GOOD: Mixin calls super()
class GoodMixin:
    def __init__(self, mixin_param, **kwargs):
        super().__init__(**kwargs)  # Continue chain
        self.mixin_param = mixin_param
```

### Pitfall 2: Ambiguous Method Resolution

```python
# ❌ CONFUSING: Both parents have same method
class Parent1:
    def process(self):
        return "Parent1"

class Parent2:
    def process(self):
        return "Parent2"

class Child(Parent1, Parent2):
    pass


# Which process() is called? Parent1 (first in MRO)
# But this is confusing!


# ✅ BETTER: Explicitly override
class Child(Parent1, Parent2):
    def process(self):
        """Explicitly choose or combine parent methods."""
        # Option 1: Choose one
        return Parent2.process(self)
        
        # Option 2: Combine both
        # return f"{Parent1.process(self)} and {Parent2.process(self)}"
```

### Pitfall 3: Inconsistent super() Usage

```python
# ❌ BAD: Some classes use super(), some don't
class A:
    def __init__(self):
        print("A")

class B(A):
    def __init__(self):
        print("B")
        super().__init__()  # Uses super

class C(A):
    def __init__(self):
        print("C")
        A.__init__(self)  # Direct call - breaks cooperation!

class D(B, C):
    def __init__(self):
        print("D")
        super().__init__()


# Inconsistent - A called multiple times


# ✅ GOOD: All use super() consistently
class C(A):
    def __init__(self):
        print("C")
        super().__init__()  # Cooperative
```

## Real-World Example: Document Management System

```python
from datetime import datetime
from abc import ABC, abstractmethod
import json

# Mixins
class TimestampMixin:
    """Add timestamp functionality."""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.created_at = datetime.now()
        self.modified_at = datetime.now()
    
    def touch(self):
        """Update modification timestamp."""
        self.modified_at = datetime.now()


class VersionMixin:
    """Add version control."""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.version = 1
        self.version_history = []
    
    def increment_version(self):
        """Increment version number."""
        self.version_history.append({
            'version': self.version,
            'timestamp': datetime.now()
        })
        self.version += 1


class SerializableMixin:
    """Add serialization functionality."""
    
    def to_dict(self) -> dict:
        """Convert to dictionary."""
        return {
            key: value.isoformat() if isinstance(value, datetime) else value
            for key, value in self.__dict__.items()
            if not key.startswith('_') and not callable(value)
        }
    
    def to_json(self) -> str:
        """Convert to JSON."""
        return json.dumps(self.to_dict(), indent=2)


class SearchableMixin:
    """Add search functionality."""
    
    def matches_query(self, query: str) -> bool:
        """Check if document matches search query."""
        query_lower = query.lower()
        searchable_text = f"{self.title} {self.content}".lower()
        return query_lower in searchable_text


# Base Document class
class Document(ABC):
    """Base document class."""
    
    def __init__(self, title: str, content: str, author: str, **kwargs):
        super().__init__(**kwargs)
        self.title = title
        self.content = content
        self.author = author
    
    @abstractmethod
    def render(self) -> str:
        """Render document - must be implemented."""
        pass
    
    def __str__(self):
        return f"{self.title} by {self.author}"


# Concrete document types with mixins
class Article(TimestampMixin, VersionMixin, SerializableMixin, 
              SearchableMixin, Document):
    """Article with full feature set."""
    
    def __init__(self, title: str, content: str, author: str,
                 category: str, tags: list, **kwargs):
        super().__init__(title=title, content=content, author=author, **kwargs)
        self.category = category
        self.tags = tags or []
    
    def render(self) -> str:
        """Render article as formatted text."""
        return f"""
{'=' * 50}
{self.title}
By: {self.author} | Category: {self.category}
Tags: {', '.join(self.tags)}
Version: {self.version}
Created: {self.created_at.strftime('%Y-%m-%d %H:%M')}
{'=' * 50}

{self.content}
        """.strip()


class Report(TimestampMixin, VersionMixin, SerializableMixin, Document):
    """Report (no search functionality)."""
    
    def __init__(self, title: str, content: str, author: str,
                 report_type: str, confidential: bool = False, **kwargs):
        super().__init__(title=title, content=content, author=author, **kwargs)
        self.report_type = report_type
        self.confidential = confidential
    
    def render(self) -> str:
        """Render report."""
        conf_marker = "[CONFIDENTIAL] " if self.confidential else ""
        return f"""
{conf_marker}{self.report_type.upper()} REPORT
{self.title}
Author: {self.author}
Version: {self.version}
Date: {self.created_at.strftime('%Y-%m-%d')}
{'-' * 50}

{self.content}
        """.strip()


# Usage
print("Creating article...")
article = Article(
    title="Understanding Multiple Inheritance",
    content="Multiple inheritance allows a class to inherit from multiple parents...",
    author="Jane Developer",
    category="Programming",
    tags=["python", "oop", "inheritance"]
)

print("\nMRO:", [cls.__name__ for cls in Article.mro()])
print()

# Use mixin methods
print(article.render())
print()

article.touch()  # From TimestampMixin
article.increment_version()  # From VersionMixin
print(f"Version: {article.version}")

# Serialization from SerializableMixin
print("\nJSON:")
print(article.to_json())

# Search from SearchableMixin
print(f"\nMatches 'inheritance': {article.matches_query('inheritance')}")
print(f"Matches 'database': {article.matches_query('database')}")

# Create report (no search capability)
report = Report(
    title="Q4 Financial Summary",
    content="Revenue increased by 15%...",
    author="John Analyst",
    report_type="financial",
    confidential=True
)

print("\n" + "=" * 50)
print(report.render())
```

## When to Use Multiple Inheritance

### ✅ Good Use Cases

1. **Mixins for orthogonal functionality**
```python
class MyClass(LoggingMixin, CachingMixin, BaseClass):
    pass
```

2. **Interface implementation** (via ABCs)
```python
from abc import ABC

class MyClass(Serializable, Comparable, BaseClass):
    pass
```

3. **Adding capabilities to existing classes**
```python
class EnhancedList(SortableMixin, FilterableMixin, list):
    pass
```

### ❌ When to Avoid

1. **Complex hierarchies** - Hard to understand and maintain
2. **Conflicting methods** - Ambiguous which method is called
3. **Can use composition** - Composition often clearer
4. **No clear relationship** - Parents unrelated conceptually

## Summary

Multiple inheritance is powerful but requires careful design:

### Key Takeaways

1. **MRO**: Python uses C3 linearization for method resolution
2. **Diamond problem**: MRO ensures methods called only once
3. **Cooperative inheritance**: All classes must call `super()`
4. **Mixins**: Small classes adding focused functionality
5. **`**kwargs`**: Pass arguments through MRO chain

### Best Practices

- ✅ Use mixins for orthogonal functionality
- ✅ Always call `super()` in all classes
- ✅ Use `**kwargs` for argument passing
- ✅ Keep mixins simple and focused
- ✅ Document MRO and method precedence
- ❌ Avoid deep multiple inheritance
- ❌ Don't mix direct calls with super()
- ❌ Prefer composition when relationship unclear

### MRO Guidelines

- Check MRO with `ClassName.mro()`
- Left-to-right order in class definition
- Children before parents
- Cooperative super() required for correctness

In the next lesson, we'll explore **Method Resolution Order** in greater depth, including edge cases and advanced MRO patterns.
