---
id: "048"
title: "Method Resolution Order (MRO)"
chapterId: "05"
order: 6
duration: "20 minutes"
objectives:
  - "Master the C3 linearization algorithm"
  - "Understand MRO edge cases and constraints"
  - "Debug MRO-related issues effectively"
  - "Design hierarchies that work with MRO"
  - "Optimize method lookup performance"
---

# Method Resolution Order (MRO)

The Method Resolution Order (MRO) determines which method Python calls when multiple inheritance creates ambiguity. Understanding MRO deeply is essential for mastering multiple inheritance and avoiding subtle bugs.

## Introduction

When you call a method on an object, Python must decide which implementation to use. With single inheritance, the path is clear. With multiple inheritance, Python uses the **C3 Linearization algorithm** to create a consistent, predictable order.

This lesson explores MRO in depth — how it works, edge cases, debugging techniques, and how to design classes that work harmoniously with MRO.

## The Basics Revisited

### Simple Single Inheritance

```python
class A:
    def method(self):
        return "A"


class B(A):
    def method(self):
        return "B"


print(B.mro())
# [<class 'B'>, <class 'A'>, <class 'object'>]

b = B()
print(b.method())  # "B" - B comes before A in MRO
```

Search order: `B → A → object`

### Simple Multiple Inheritance

```python
class A:
    def method(self):
        return "A"


class B:
    def method(self):
        return "B"


class C(A, B):
    pass


print(C.mro())
# [<class 'C'>, <class 'A'>, <class 'B'>, <class 'object'>]

c = C()
print(c.method())  # "A" - A comes before B
```

Search order: `C → A → B → object`

Left-to-right: First parent (A) searched before second parent (B).

## The C3 Linearization Algorithm

### What is C3?

C3 is an algorithm that computes MRO while satisfying three properties:

1. **Children before parents**: A class appears before its parents
2. **Parent order preserved**: Parent order from class definition maintained
3. **Monotonicity**: If class X appears before Y in one MRO, X appears before Y in all subclass MROs

### C3 Algorithm Steps

Given `class C(B1, B2, ..., Bn)`:

1. Start with C itself
2. Merge MROs of parents (B1, B2, ..., Bn) plus parent list
3. At each step, select the first head that doesn't appear in any tail
4. Repeat until all classes merged

```python
# Example: class D(B, C)
class A:
    pass

class B(A):
    pass

class C(A):
    pass

class D(B, C):
    pass


# Manual C3 calculation:
# D's parents: B, C
# L(D) = D + merge(L(B), L(C), [B, C])
#      = D + merge([B, A, object], [C, A, object], [B, C])
#
# Step 1: B is head of first list, not in any tail -> take B
#      = D, B + merge([A, object], [C, A, object], [C])
#
# Step 2: A is head of first list, but appears in tail of second -> skip
#         C is head of third list, not in any tail -> take C
#      = D, B, C + merge([A, object], [A, object])
#
# Step 3: A is head, not in any tail -> take A
#      = D, B, C, A + merge([object], [object])
#
# Step 4: object is head, not in any tail -> take object
#      = D, B, C, A, object

print([cls.__name__ for cls in D.mro()])
# ['D', 'B', 'C', 'A', 'object']
```

### Visualizing MRO

```python
def print_mro(cls):
    """Pretty print MRO."""
    print(f"\n{cls.__name__} MRO:")
    for i, parent_cls in enumerate(cls.mro()):
        print(f"  {i}. {parent_cls.__name__}")


class A:
    pass

class B(A):
    pass

class C(A):
    pass

class D(B, C):
    pass


print_mro(D)
# D MRO:
#   0. D
#   1. B
#   2. C
#   3. A
#   4. object
```

## MRO Constraints and Edge Cases

### Constraint 1: Inconsistent Hierarchy

C3 will fail if the hierarchy is inconsistent:

```python
class A:
    pass

class B(A):
    pass

class C(A, B):  # Error!
    pass

# TypeError: Cannot create a consistent method resolution
# order (MRO) for bases A, B
```

**Why?** Class definition says "A before B", but B inherits from A, meaning "B before A" — contradiction!

```python
# C3 attempts:
# L(C) = C + merge(L(A), L(B), [A, B])
#      = C + merge([A, object], [B, A, object], [A, B])
#
# A is head of first list, but appears in tail of second -> skip
# B is head of second list, but appears in tail of third... stuck!
# Cannot satisfy all constraints -> Error
```

### Constraint 2: Diamond Problem Resolved

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
    pass


#     A
#    / \
#   B   C
#    \ /
#     D

print([cls.__name__ for cls in D.mro()])
# ['D', 'B', 'C', 'A', 'object']

d = D()
print(d.method())  # "B" - B comes before C
```

MRO ensures A appears only once, after both B and C.

### Constraint 3: Complex Diamond

```python
class A:
    pass

class B(A):
    pass

class C(A):
    pass

class D(B, C):
    pass

class E(A):
    pass

class F(D, E):
    pass


#       A
#      /|\
#     / | \
#    B  C  E
#     \ | /
#      \|/
#       F

print([cls.__name__ for cls in F.mro()])
# ['F', 'D', 'B', 'C', 'E', 'A', 'object']
```

F → D (first parent) → B (D's first parent) → C (D's second parent) → E (F's second parent) → A → object

## Method Lookup in Action

### Attribute Lookup Process

```python
class A:
    class_var = "A"
    
    def method(self):
        return "A.method"


class B(A):
    class_var = "B"


class C(A):
    pass


class D(B, C):
    pass


# Lookup D.class_var
print(D.class_var)  # "B"
# Search: D (not found) -> B (found "B") -> stop

# Lookup D.method
d = D()
print(d.method())  # "A.method"
# Search: D (not found) -> B (not found) -> C (not found) -> A (found) -> stop
```

### Instance vs Class Attributes

```python
class A:
    value = "A"


class B(A):
    value = "B"


class C(A):
    pass


class D(B, C):
    pass


# Class attribute
print(D.value)  # "B" - follows MRO


# Instance attribute (overrides class)
d = D()
d.value = "instance"
print(d.value)  # "instance" - instance attribute found first
print(D.value)  # "B" - class attribute unchanged
```

Instance attributes are checked before the MRO.

## Debugging MRO Issues

### Problem: Method Not Found

```python
class A:
    def method_a(self):
        return "A"


class B:
    def method_b(self):
        return "B"


class C(A, B):
    pass


c = C()
print(c.method_a())  # Works
print(c.method_b())  # Works

# But what if both A and B have the same method?
class A:
    def process(self):
        return "A"

class B:
    def process(self):
        return "B"

class C(A, B):
    pass


c = C()
print(c.process())  # "A" - first in MRO

# To get B's version, call explicitly:
print(B.process(c))  # "B"
```

### Problem: Unexpected Method Called

```python
class Base:
    def compute(self):
        return "Base"


class FeatureA(Base):
    def compute(self):
        return "FeatureA"


class FeatureB(Base):
    def compute(self):
        return "FeatureB"


class Combined(FeatureB, FeatureA):  # Note order!
    pass


c = Combined()
print(c.compute())  # "FeatureB" - FeatureB comes first

# Expected FeatureA? Check MRO:
print([cls.__name__ for cls in Combined.mro()])
# ['Combined', 'FeatureB', 'FeatureA', 'Base', 'object']
```

**Solution**: Verify parent order in class definition matches your intent.

### Problem: super() Not Working as Expected

```python
class A:
    def method(self):
        print("A.method")


class B(A):
    def method(self):
        print("B.method")
        super().method()


class C(A):
    def method(self):
        print("C.method")
        super().method()


class D(B, C):
    def method(self):
        print("D.method")
        super().method()


d = D()
d.method()
# Output:
# D.method
# B.method
# C.method  <- C called even though B didn't explicitly call C!
# A.method

# Why? super() follows MRO: D -> B -> C -> A
```

`super()` calls the **next class in MRO**, not the parent class!

## Designing for MRO

### Guideline 1: Keep Hierarchies Simple

```python
# ❌ COMPLEX: Hard to reason about
class A(B, C, D, E):
    pass

class F(A, G, H):
    pass

class I(F, J, K):
    pass


# ✅ SIMPLER: Easier to understand
class Base:
    pass

class FeatureSet1(Feature1, Feature2, Base):
    pass

class FeatureSet2(Feature3, Feature4, Base):
    pass

class Final(FeatureSet1, FeatureSet2):
    pass
```

### Guideline 2: Use Mixins for Orthogonal Features

```python
class Timestamped:
    """Mixin: Add timestamps."""
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        from datetime import datetime
        self.created_at = datetime.now()


class Versioned:
    """Mixin: Add versioning."""
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.version = 1


class Serializable:
    """Mixin: Add serialization."""
    def to_dict(self):
        return self.__dict__.copy()


class Document:
    """Base class."""
    def __init__(self, title, **kwargs):
        super().__init__(**kwargs)
        self.title = title


# Combine mixins with base
class Article(Timestamped, Versioned, Serializable, Document):
    """Article with all features."""
    pass


print([cls.__name__ for cls in Article.mro()])
# ['Article', 'Timestamped', 'Versioned', 'Serializable', 'Document', 'object']
```

Mixins first, base class last — ensures base `__init__` called after mixins set up their state.

### Guideline 3: Document Expected MRO

```python
class MyClass(MixinA, MixinB, BaseClass):
    """My class with features.
    
    MRO: MyClass -> MixinA -> MixinB -> BaseClass -> object
    
    Method resolution:
    - process(): MyClass implementation
    - validate(): MixinA implementation
    - save(): BaseClass implementation
    
    Note: MixinA.validate() overrides MixinB.validate()
    """
    pass
```

### Guideline 4: Test MRO in Unit Tests

```python
import unittest

class TestMRO(unittest.TestCase):
    def test_article_mro(self):
        """Test Article MRO is as expected."""
        expected = ['Article', 'Timestamped', 'Versioned', 
                    'Serializable', 'Document', 'object']
        actual = [cls.__name__ for cls in Article.mro()]
        self.assertEqual(actual, expected)
    
    def test_method_resolution(self):
        """Test correct method is called."""
        article = Article(title="Test")
        
        # Should use Timestamped's created_at
        self.assertIsNotNone(article.created_at)
        
        # Should use Versioned's version
        self.assertEqual(article.version, 1)
        
        # Should use Serializable's to_dict
        data = article.to_dict()
        self.assertIn('title', data)
```

## Performance Considerations

### Method Lookup Cost

```python
import time

class A:
    def method(self):
        return "A"

class B(A):
    pass

class C(B):
    pass

class D(C):
    pass

class E(D):
    pass


# Deep hierarchy - longer lookup
e = E()

start = time.perf_counter()
for _ in range(1_000_000):
    e.method()
end = time.perf_counter()

print(f"Deep hierarchy: {end - start:.4f}s")


# Shallow hierarchy - faster lookup
class F(A):
    pass

f = F()

start = time.perf_counter()
for _ in range(1_000_000):
    f.method()
end = time.perf_counter()

print(f"Shallow hierarchy: {end - start:.4f}s")
```

### Optimization: Cache Method References

```python
class MyClass:
    def __init__(self):
        # Cache frequently used method from parent
        self._cached_method = super().expensive_method
    
    def process(self):
        # Use cached reference (faster)
        return self._cached_method()
```

## Advanced MRO Patterns

### Pattern 1: Cooperative Multiple Inheritance

All classes must cooperate for correct behavior:

```python
class A:
    def __init__(self, **kwargs):
        print("A.__init__")
        # No super() - base of hierarchy


class B(A):
    def __init__(self, b_value, **kwargs):
        print(f"B.__init__: b_value={b_value}")
        super().__init__(**kwargs)
        self.b_value = b_value


class C(A):
    def __init__(self, c_value, **kwargs):
        print(f"C.__init__: c_value={c_value}")
        super().__init__(**kwargs)
        self.c_value = c_value


class D(B, C):
    def __init__(self, d_value, **kwargs):
        print(f"D.__init__: d_value={d_value}")
        super().__init__(**kwargs)
        self.d_value = d_value


# All parameters passed via kwargs
d = D(d_value=1, b_value=2, c_value=3)
# Output:
# D.__init__: d_value=1
# B.__init__: b_value=2
# C.__init__: c_value=3
# A.__init__

print([cls.__name__ for cls in D.mro()])
# ['D', 'B', 'C', 'A', 'object']
```

### Pattern 2: Method Composition via MRO

```python
class LoggerMixin:
    """Mixin: Add logging."""
    def save(self):
        print(f"[LOG] Saving {self.__class__.__name__}")
        super().save()


class ValidationMixin:
    """Mixin: Add validation."""
    def save(self):
        print(f"[VALIDATE] Validating {self.__class__.__name__}")
        if not self.is_valid():
            raise ValueError("Invalid state")
        super().save()
    
    def is_valid(self):
        return True


class Model:
    """Base model."""
    def save(self):
        print(f"[SAVE] Saving to database")


class Article(LoggerMixin, ValidationMixin, Model):
    """Article with logging and validation."""
    pass


article = Article()
article.save()
# Output:
# [LOG] Saving Article
# [VALIDATE] Validating Article
# [SAVE] Saving to database

# MRO ensures correct order: Log -> Validate -> Save
```

### Pattern 3: Abstract Base with Multiple Implementations

```python
from abc import ABC, abstractmethod

class Renderer(ABC):
    """Abstract renderer."""
    @abstractmethod
    def render(self, content: str) -> str:
        pass


class HTMLRenderer(Renderer):
    """Render as HTML."""
    def render(self, content: str) -> str:
        return f"<div>{content}</div>"


class MarkdownRenderer(Renderer):
    """Render as Markdown."""
    def render(self, content: str) -> str:
        return f"**{content}**"


class Document:
    """Base document."""
    def __init__(self, content: str):
        self.content = content


class HTMLDocument(HTMLRenderer, Document):
    """Document rendered as HTML."""
    def display(self):
        return self.render(self.content)


class MarkdownDocument(MarkdownRenderer, Document):
    """Document rendered as Markdown."""
    def display(self):
        return self.render(self.content)


html_doc = HTMLDocument("Hello World")
print(html_doc.display())  # <div>Hello World</div>

md_doc = MarkdownDocument("Hello World")
print(md_doc.display())    # **Hello World**
```

## Real-World Example: Plugin System with MRO

```python
from abc import ABC, abstractmethod
from typing import Any, Dict

# Base Plugin
class Plugin(ABC):
    """Base plugin class."""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.config = {}
    
    @abstractmethod
    def execute(self, data: Any) -> Any:
        """Execute plugin - must implement."""
        pass
    
    def setup(self):
        """Setup hook - optional."""
        pass
    
    def teardown(self):
        """Teardown hook - optional."""
        pass


# Mixins for plugin features
class ConfigurableMixin:
    """Add configuration management."""
    
    def __init__(self, config: Dict = None, **kwargs):
        super().__init__(**kwargs)
        self.config = config or {}
    
    def get_config(self, key: str, default: Any = None) -> Any:
        """Get configuration value."""
        return self.config.get(key, default)


class LoggingMixin:
    """Add logging capability."""
    
    def log(self, message: str):
        """Log a message."""
        plugin_name = self.__class__.__name__
        print(f"[{plugin_name}] {message}")


class CachingMixin:
    """Add caching capability."""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._cache = {}
    
    def get_cached(self, key: str) -> Any:
        """Get cached value."""
        return self._cache.get(key)
    
    def set_cached(self, key: str, value: Any):
        """Set cached value."""
        self._cache[key] = value


class MetricsMixin:
    """Add metrics tracking."""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.execution_count = 0
    
    def record_execution(self):
        """Record execution."""
        self.execution_count += 1


# Concrete plugins combining features
class DataProcessor(ConfigurableMixin, LoggingMixin, CachingMixin, 
                   MetricsMixin, Plugin):
    """Data processor with full feature set."""
    
    def execute(self, data: Any) -> Any:
        """Process data with caching and logging."""
        self.log(f"Processing data: {data}")
        
        # Check cache
        cache_key = str(data)
        cached = self.get_cached(cache_key)
        if cached is not None:
            self.log(f"Cache hit for {cache_key}")
            self.record_execution()
            return cached
        
        # Process
        multiplier = self.get_config('multiplier', 2)
        result = data * multiplier
        
        # Cache result
        self.set_cached(cache_key, result)
        self.record_execution()
        
        self.log(f"Result: {result}")
        return result


class DataValidator(LoggingMixin, MetricsMixin, Plugin):
    """Data validator with logging and metrics."""
    
    def execute(self, data: Any) -> bool:
        """Validate data."""
        self.log(f"Validating data: {data}")
        self.record_execution()
        
        # Validation logic
        is_valid = data is not None and data != ""
        
        self.log(f"Validation result: {is_valid}")
        return is_valid


# Usage
print("DataProcessor MRO:")
for i, cls in enumerate(DataProcessor.mro()):
    print(f"  {i}. {cls.__name__}")

print("\n" + "=" * 50)

processor = DataProcessor(config={'multiplier': 3})

# First call - cache miss
result1 = processor.execute(10)
print()

# Second call - cache hit
result2 = processor.execute(10)
print()

print(f"Execution count: {processor.execution_count}")
print(f"Cache: {processor._cache}")

print("\n" + "=" * 50)

validator = DataValidator()
validator.execute("test data")
validator.execute("")
print(f"\nValidation execution count: {validator.execution_count}")
```

## Summary

MRO is Python's solution to method resolution in multiple inheritance:

### Key Concepts

1. **C3 Linearization**: Algorithm that computes consistent MRO
2. **MRO Properties**: Children before parents, left-to-right order, monotonicity
3. **super()**: Follows MRO, not just parent class
4. **Diamond Problem**: MRO ensures methods called only once
5. **Inconsistent Hierarchies**: C3 fails if constraints can't be satisfied

### Best Practices

- ✅ Check MRO with `ClassName.mro()`
- ✅ Keep hierarchies simple and understandable
- ✅ Use mixins for orthogonal features
- ✅ Document expected MRO and method resolution
- ✅ Test MRO in unit tests
- ✅ All classes must call `super()` for cooperation
- ❌ Avoid creating inconsistent hierarchies
- ❌ Don't rely on implicit MRO behavior without checking

### Debugging MRO

- Print MRO: `print([c.__name__ for c in Class.mro()])`
- Verify method source: Check which class provides method
- Test explicitly: Write tests for expected method resolution
- Trace super() calls: Add logging to see call chain

### Design Guidelines

- **Mixins first, base last**: `class C(Mixin1, Mixin2, Base)`
- **Keep it simple**: Prefer shallow hierarchies
- **Test MRO**: Ensure it matches expectations
- **Document**: Explain MRO and method precedence

In the next lesson, we'll compare **Composition vs Inheritance**, exploring when to use each approach and how to make the choice.

