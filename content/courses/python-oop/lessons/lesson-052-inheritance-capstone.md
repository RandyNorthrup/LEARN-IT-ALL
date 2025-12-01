---
id: "052"
title: "Inheritance Capstone Project"
chapterId: "05"
order: 10
duration: "25 minutes"
objectives:
  - "Build a complete plugin system using inheritance"
  - "Apply all inheritance concepts in a real project"
  - "Implement proper class hierarchies and mixins"
  - "Create extensible, maintainable architecture"
  - "Demonstrate inheritance best practices"
---

# Inheritance Capstone Project

Build a complete, extensible plugin system that demonstrates all inheritance concepts: ABC interfaces, mixins, cooperative multiple inheritance, MRO management, and composition where appropriate.

## Project Overview

We'll build a **Data Processing Pipeline System** with:

- **Plugin architecture**: Process data through configurable plugins
- **Multiple plugin types**: Readers, processors, writers
- **Mixin features**: Logging, caching, validation, metrics
- **Extensible design**: Easy to add new plugins
- **Best practices**: Proper inheritance, composition, and testing

### System Architecture

```
BasePlugin (ABC)
├── ReaderPlugin (ABC)
│   ├── CSVReader
│   ├── JSONReader
│   └── XMLReader
├── ProcessorPlugin (ABC)
│   ├── FilterProcessor
│   ├── TransformProcessor
│   └── AggregateProcessor
└── WriterPlugin (ABC)
    ├── CSVWriter
    ├── JSONWriter
    └── DatabaseWriter

Mixins:
- LoggingMixin
- CachingMixin
- ValidationMixin
- MetricsMixin
- ConfigurableMixin

Pipeline:
- PipelineBuilder
- PipelineExecutor
```

## Step 1: Base Plugin System

```python
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from datetime import datetime
import json

# ============================================================================
# ABSTRACT BASE CLASSES - Clear Contracts
# ============================================================================

class BasePlugin(ABC):
    """Base plugin - all plugins inherit from this."""
    
    def __init__(self, name: str, **kwargs):
        super().__init__(**kwargs)
        self.name = name
        self._enabled = True
    
    @abstractmethod
    def execute(self, data: Any) -> Any:
        """Execute plugin - must implement."""
        pass
    
    def setup(self):
        """Setup hook - optional override."""
        pass
    
    def teardown(self):
        """Teardown hook - optional override."""
        pass
    
    def enable(self):
        """Enable plugin."""
        self._enabled = True
    
    def disable(self):
        """Disable plugin."""
        self._enabled = False
    
    @property
    def enabled(self) -> bool:
        """Check if plugin is enabled."""
        return self._enabled


class ReaderPlugin(BasePlugin):
    """Abstract reader - reads data from sources."""
    
    @abstractmethod
    def read(self, source: str) -> Any:
        """Read data from source."""
        pass
    
    def execute(self, data: Any) -> Any:
        """Execute reader - typically data is source path."""
        return self.read(data)


class ProcessorPlugin(BasePlugin):
    """Abstract processor - transforms data."""
    
    @abstractmethod
    def process(self, data: Any) -> Any:
        """Process data."""
        pass
    
    def execute(self, data: Any) -> Any:
        """Execute processor."""
        return self.process(data)


class WriterPlugin(BasePlugin):
    """Abstract writer - writes data to destinations."""
    
    @abstractmethod
    def write(self, data: Any, destination: str) -> bool:
        """Write data to destination."""
        pass
    
    def execute(self, data: Any) -> Any:
        """Execute writer - returns success status."""
        # Data should be tuple: (data, destination)
        if isinstance(data, tuple) and len(data) == 2:
            actual_data, destination = data
            return self.write(actual_data, destination)
        else:
            raise ValueError("Writer expects (data, destination) tuple")


# ============================================================================
# MIXINS - Reusable Functionality
# ============================================================================

class LoggingMixin:
    """Add logging capability."""
    
    def log(self, level: str, message: str):
        """Log a message."""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        plugin_name = getattr(self, 'name', self.__class__.__name__)
        print(f"[{timestamp}] [{level.upper()}] [{plugin_name}] {message}")
    
    def log_info(self, message: str):
        self.log('info', message)
    
    def log_warning(self, message: str):
        self.log('warning', message)
    
    def log_error(self, message: str):
        self.log('error', message)
    
    def log_debug(self, message: str):
        self.log('debug', message)


class CachingMixin:
    """Add caching capability."""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._cache: Dict[str, Any] = {}
    
    def get_cached(self, key: str) -> Optional[Any]:
        """Get cached value."""
        return self._cache.get(key)
    
    def set_cached(self, key: str, value: Any):
        """Set cached value."""
        self._cache[key] = value
    
    def has_cached(self, key: str) -> bool:
        """Check if key is cached."""
        return key in self._cache
    
    def clear_cache(self):
        """Clear all cached values."""
        self._cache.clear()


class ValidationMixin:
    """Add validation capability."""
    
    def validate_data(self, data: Any) -> bool:
        """Validate data - override in subclass."""
        return data is not None
    
    def validate_or_raise(self, data: Any):
        """Validate data or raise exception."""
        if not self.validate_data(data):
            plugin_name = getattr(self, 'name', self.__class__.__name__)
            raise ValueError(f"{plugin_name}: Invalid data")


class MetricsMixin:
    """Add metrics tracking."""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._execution_count = 0
        self._total_execution_time = 0.0
        self._last_execution_time = 0.0
    
    def _start_timer(self):
        """Start execution timer."""
        self._start_time = datetime.now()
    
    def _stop_timer(self):
        """Stop execution timer and update metrics."""
        if hasattr(self, '_start_time'):
            elapsed = (datetime.now() - self._start_time).total_seconds()
            self._last_execution_time = elapsed
            self._total_execution_time += elapsed
            self._execution_count += 1
    
    def get_metrics(self) -> Dict[str, Any]:
        """Get execution metrics."""
        avg_time = (self._total_execution_time / self._execution_count 
                    if self._execution_count > 0 else 0)
        return {
            'execution_count': self._execution_count,
            'total_time': self._total_execution_time,
            'average_time': avg_time,
            'last_execution_time': self._last_execution_time
        }


class ConfigurableMixin:
    """Add configuration capability."""
    
    def __init__(self, config: Dict = None, **kwargs):
        super().__init__(**kwargs)
        self._config = config or {}
    
    def get_config(self, key: str, default: Any = None) -> Any:
        """Get configuration value."""
        return self._config.get(key, default)
    
    def set_config(self, key: str, value: Any):
        """Set configuration value."""
        self._config[key] = value
    
    def update_config(self, config: Dict):
        """Update multiple configuration values."""
        self._config.update(config)


# ============================================================================
# CONCRETE READER PLUGINS
# ============================================================================

class CSVReader(LoggingMixin, CachingMixin, MetricsMixin, ReaderPlugin):
    """CSV reader with logging, caching, and metrics."""
    
    def __init__(self, name: str = "CSVReader", delimiter: str = ",", **kwargs):
        super().__init__(name=name, **kwargs)
        self.delimiter = delimiter
    
    def read(self, source: str) -> List[Dict]:
        """Read CSV file."""
        self._start_timer()
        self.log_info(f"Reading CSV from {source}")
        
        # Check cache
        cache_key = f"csv:{source}"
        if self.has_cached(cache_key):
            self.log_info("Using cached data")
            self._stop_timer()
            return self.get_cached(cache_key)
        
        try:
            # Simulate reading CSV (in real code, use csv module)
            data = [
                {'id': '1', 'name': 'Alice', 'value': '100'},
                {'id': '2', 'name': 'Bob', 'value': '200'},
                {'id': '3', 'name': 'Charlie', 'value': '300'}
            ]
            
            # Cache result
            self.set_cached(cache_key, data)
            
            self.log_info(f"Read {len(data)} rows")
            self._stop_timer()
            return data
            
        except Exception as e:
            self.log_error(f"Failed to read CSV: {e}")
            self._stop_timer()
            raise


class JSONReader(LoggingMixin, CachingMixin, MetricsMixin, ReaderPlugin):
    """JSON reader with logging, caching, and metrics."""
    
    def __init__(self, name: str = "JSONReader", **kwargs):
        super().__init__(name=name, **kwargs)
    
    def read(self, source: str) -> Any:
        """Read JSON file."""
        self._start_timer()
        self.log_info(f"Reading JSON from {source}")
        
        # Check cache
        cache_key = f"json:{source}"
        if self.has_cached(cache_key):
            self.log_info("Using cached data")
            self._stop_timer()
            return self.get_cached(cache_key)
        
        try:
            # Simulate reading JSON
            data = {
                'records': [
                    {'id': 1, 'name': 'Alice', 'value': 100},
                    {'id': 2, 'name': 'Bob', 'value': 200},
                    {'id': 3, 'name': 'Charlie', 'value': 300}
                ]
            }
            
            # Cache result
            self.set_cached(cache_key, data)
            
            self.log_info("JSON read complete")
            self._stop_timer()
            return data
            
        except Exception as e:
            self.log_error(f"Failed to read JSON: {e}")
            self._stop_timer()
            raise


# ============================================================================
# CONCRETE PROCESSOR PLUGINS
# ============================================================================

class FilterProcessor(LoggingMixin, ValidationMixin, ConfigurableMixin, 
                     MetricsMixin, ProcessorPlugin):
    """Filter processor with full feature set."""
    
    def __init__(self, name: str = "FilterProcessor", 
                 filter_key: str = None, filter_value: Any = None, **kwargs):
        config = kwargs.pop('config', {})
        config.setdefault('filter_key', filter_key)
        config.setdefault('filter_value', filter_value)
        super().__init__(name=name, config=config, **kwargs)
    
    def validate_data(self, data: Any) -> bool:
        """Validate data is a list."""
        return isinstance(data, (list, dict))
    
    def process(self, data: Any) -> Any:
        """Filter data based on configuration."""
        self._start_timer()
        self.log_info("Starting filter processing")
        
        # Validate input
        self.validate_or_raise(data)
        
        filter_key = self.get_config('filter_key')
        filter_value = self.get_config('filter_value')
        
        if filter_key is None:
            self.log_warning("No filter configured, returning all data")
            self._stop_timer()
            return data
        
        try:
            # Handle dict with 'records' key (from JSON)
            if isinstance(data, dict) and 'records' in data:
                records = data['records']
            else:
                records = data
            
            # Filter records
            filtered = [
                record for record in records
                if record.get(filter_key) == filter_value
            ]
            
            self.log_info(f"Filtered {len(records)} -> {len(filtered)} records")
            self._stop_timer()
            return filtered
            
        except Exception as e:
            self.log_error(f"Filter processing failed: {e}")
            self._stop_timer()
            raise


class TransformProcessor(LoggingMixin, ConfigurableMixin, MetricsMixin, 
                        ProcessorPlugin):
    """Transform processor - modifies records."""
    
    def __init__(self, name: str = "TransformProcessor", **kwargs):
        super().__init__(name=name, **kwargs)
    
    def process(self, data: Any) -> Any:
        """Transform data."""
        self._start_timer()
        self.log_info("Starting transform processing")
        
        try:
            # Convert string values to integers
            transformed = []
            for record in data:
                new_record = record.copy()
                if 'value' in new_record:
                    # Convert string to int if needed
                    if isinstance(new_record['value'], str):
                        new_record['value'] = int(new_record['value'])
                    # Apply transformation
                    new_record['value'] = new_record['value'] * 2
                transformed.append(new_record)
            
            self.log_info(f"Transformed {len(transformed)} records")
            self._stop_timer()
            return transformed
            
        except Exception as e:
            self.log_error(f"Transform processing failed: {e}")
            self._stop_timer()
            raise


# ============================================================================
# CONCRETE WRITER PLUGINS
# ============================================================================

class JSONWriter(LoggingMixin, ValidationMixin, MetricsMixin, WriterPlugin):
    """JSON writer with validation."""
    
    def __init__(self, name: str = "JSONWriter", **kwargs):
        super().__init__(name=name, **kwargs)
    
    def validate_data(self, data: Any) -> bool:
        """Validate data can be serialized to JSON."""
        try:
            json.dumps(data)
            return True
        except (TypeError, ValueError):
            return False
    
    def write(self, data: Any, destination: str) -> bool:
        """Write data to JSON file."""
        self._start_timer()
        self.log_info(f"Writing JSON to {destination}")
        
        # Validate
        self.validate_or_raise(data)
        
        try:
            # Simulate writing JSON
            json_str = json.dumps(data, indent=2)
            self.log_debug(f"JSON output:\n{json_str}")
            
            self.log_info(f"Wrote {len(data)} records")
            self._stop_timer()
            return True
            
        except Exception as e:
            self.log_error(f"Failed to write JSON: {e}")
            self._stop_timer()
            raise


class ConsoleWriter(LoggingMixin, MetricsMixin, WriterPlugin):
    """Console writer - prints to stdout."""
    
    def __init__(self, name: str = "ConsoleWriter", **kwargs):
        super().__init__(name=name, **kwargs)
    
    def write(self, data: Any, destination: str = "stdout") -> bool:
        """Write data to console."""
        self._start_timer()
        self.log_info("Writing to console")
        
        try:
            print(f"\n{'=' * 60}")
            print(f"PIPELINE OUTPUT: {destination}")
            print('=' * 60)
            
            if isinstance(data, list):
                for i, record in enumerate(data, 1):
                    print(f"{i}. {record}")
            else:
                print(data)
            
            print('=' * 60)
            
            self._stop_timer()
            return True
            
        except Exception as e:
            self.log_error(f"Failed to write to console: {e}")
            self._stop_timer()
            raise


# ============================================================================
# PIPELINE SYSTEM
# ============================================================================

class Pipeline:
    """Data processing pipeline."""
    
    def __init__(self, name: str):
        self.name = name
        self.plugins: List[BasePlugin] = []
    
    def add_plugin(self, plugin: BasePlugin):
        """Add plugin to pipeline."""
        self.plugins.append(plugin)
    
    def execute(self, initial_data: Any = None) -> Any:
        """Execute pipeline."""
        print(f"\n{'=' * 60}")
        print(f"EXECUTING PIPELINE: {self.name}")
        print('=' * 60)
        
        data = initial_data
        
        for plugin in self.plugins:
            if not plugin.enabled:
                print(f"Skipping disabled plugin: {plugin.name}")
                continue
            
            print(f"\nExecuting: {plugin.name}")
            try:
                plugin.setup()
                data = plugin.execute(data)
                plugin.teardown()
            except Exception as e:
                print(f"ERROR in {plugin.name}: {e}")
                raise
        
        print(f"\nPIPELINE COMPLETE: {self.name}")
        return data
    
    def get_metrics_summary(self) -> Dict[str, Any]:
        """Get metrics from all plugins."""
        summary = {}
        for plugin in self.plugins:
            if isinstance(plugin, MetricsMixin):
                summary[plugin.name] = plugin.get_metrics()
        return summary


# ============================================================================
# DEMONSTRATION
# ============================================================================

def demo_csv_pipeline():
    """Demonstrate CSV processing pipeline."""
    print("\n" + "=" * 60)
    print("DEMO 1: CSV PIPELINE")
    print("=" * 60)
    
    pipeline = Pipeline("CSV Processing Pipeline")
    
    # Add plugins
    pipeline.add_plugin(CSVReader(name="CSV Reader"))
    pipeline.add_plugin(FilterProcessor(
        name="Filter Alice",
        filter_key="name",
        filter_value="Alice"
    ))
    pipeline.add_plugin(TransformProcessor(name="Double Values"))
    pipeline.add_plugin(ConsoleWriter(name="Console Output"))
    
    # Execute
    pipeline.execute("data/input.csv")
    
    # Show metrics
    print("\n" + "-" * 60)
    print("PIPELINE METRICS:")
    print("-" * 60)
    metrics = pipeline.get_metrics_summary()
    for plugin_name, plugin_metrics in metrics.items():
        print(f"\n{plugin_name}:")
        for key, value in plugin_metrics.items():
            print(f"  {key}: {value}")


def demo_json_pipeline():
    """Demonstrate JSON processing pipeline."""
    print("\n" + "=" * 60)
    print("DEMO 2: JSON PIPELINE")
    print("=" * 60)
    
    pipeline = Pipeline("JSON Processing Pipeline")
    
    # Add plugins
    pipeline.add_plugin(JSONReader(name="JSON Reader"))
    pipeline.add_plugin(FilterProcessor(
        name="Filter Bob",
        config={'filter_key': 'name', 'filter_value': 'Bob'}
    ))
    pipeline.add_plugin(JSONWriter(name="JSON Writer"))
    
    # Execute (writer needs tuple: (data, destination))
    # We'll use a wrapper to convert
    class WriterAdapter(BasePlugin):
        def __init__(self, destination: str, **kwargs):
            super().__init__(name="WriterAdapter", **kwargs)
            self.destination = destination
        
        def execute(self, data: Any) -> Any:
            return (data, self.destination)
    
    pipeline.add_plugin(WriterAdapter(destination="output.json"))
    pipeline.add_plugin(JSONWriter(name="JSON Writer"))
    
    # Execute
    pipeline.execute("data/input.json")
    
    # Show metrics
    print("\n" + "-" * 60)
    print("PIPELINE METRICS:")
    print("-" * 60)
    metrics = pipeline.get_metrics_summary()
    for plugin_name, plugin_metrics in metrics.items():
        print(f"\n{plugin_name}:")
        for key, value in plugin_metrics.items():
            print(f"  {key}: {value}")


def demo_caching():
    """Demonstrate caching capability."""
    print("\n" + "=" * 60)
    print("DEMO 3: CACHING")
    print("=" * 60)
    
    reader = CSVReader()
    
    print("\nFirst read (cache miss):")
    data1 = reader.read("data/test.csv")
    
    print("\nSecond read (cache hit):")
    data2 = reader.read("data/test.csv")
    
    print("\nMetrics:")
    metrics = reader.get_metrics()
    for key, value in metrics.items():
        print(f"  {key}: {value}")


def demo_mro():
    """Demonstrate Method Resolution Order."""
    print("\n" + "=" * 60)
    print("DEMO 4: METHOD RESOLUTION ORDER")
    print("=" * 60)
    
    print("\nCSVReader MRO:")
    for i, cls in enumerate(CSVReader.mro()):
        print(f"  {i}. {cls.__name__}")
    
    print("\nFilterProcessor MRO:")
    for i, cls in enumerate(FilterProcessor.mro()):
        print(f"  {i}. {cls.__name__}")


# Run demonstrations
if __name__ == "__main__":
    demo_csv_pipeline()
    demo_json_pipeline()
    demo_caching()
    demo_mro()
```

## Key Design Decisions

### 1. Clear Abstract Base Classes

```python
# All plugins inherit from BasePlugin
# Specific plugin types (Reader, Processor, Writer) extend BasePlugin
# Concrete implementations must implement abstract methods
```

**Benefits**:
- Clear contracts
- Type safety
- IDE support
- Enforced implementation

### 2. Focused Mixins

```python
# Each mixin does ONE thing:
# - LoggingMixin: logging only
# - CachingMixin: caching only
# - MetricsMixin: metrics only
```

**Benefits**:
- Reusable
- Composable
- Easy to test
- Clear responsibility

### 3. Cooperative Multiple Inheritance

```python
# All mixins call super().__init__(**kwargs)
# Allows proper MRO traversal
# Enables mixing multiple features
```

**Benefits**:
- No broken chains
- Predictable behavior
- Flexible composition

### 4. Composition Where Appropriate

```python
# Pipeline composes plugins (composition)
# Plugins inherit from BasePlugin (inheritance)
```

**Benefits**:
- Right tool for right job
- Flexibility where needed
- Structure where appropriate

## Extending the System

### Add New Plugin Type

```python
class ValidatorPlugin(BasePlugin):
    """New plugin type."""
    
    @abstractmethod
    def validate(self, data: Any) -> bool:
        """Validate data."""
        pass
    
    def execute(self, data: Any) -> Any:
        """Execute validator."""
        if not self.validate(data):
            raise ValueError("Validation failed")
        return data


class SchemaValidator(LoggingMixin, ConfigurableMixin, ValidatorPlugin):
    """Validate against schema."""
    
    def validate(self, data: Any) -> bool:
        self.log_info("Validating schema")
        # Validation logic
        return True
```

### Add New Mixin

```python
class RetryMixin:
    """Add retry capability."""
    
    def __init__(self, max_retries: int = 3, **kwargs):
        super().__init__(**kwargs)
        self.max_retries = max_retries
    
    def execute_with_retry(self, func, *args, **kwargs):
        """Execute function with retry logic."""
        for attempt in range(self.max_retries):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                if attempt == self.max_retries - 1:
                    raise
                print(f"Retry {attempt + 1}/{self.max_retries}")


# Use in plugin
class RobustReader(RetryMixin, LoggingMixin, CSVReader):
    """Reader with retry capability."""
    pass
```

## Testing the System

```python
import unittest

class TestPluginSystem(unittest.TestCase):
    def test_csv_reader_inheritance(self):
        """Test CSVReader properly inherits."""
        reader = CSVReader()
        
        # Is a BasePlugin
        self.assertIsInstance(reader, BasePlugin)
        
        # Is a ReaderPlugin
        self.assertIsInstance(reader, ReaderPlugin)
        
        # Has mixin features
        self.assertTrue(hasattr(reader, 'log_info'))
        self.assertTrue(hasattr(reader, 'get_cached'))
        self.assertTrue(hasattr(reader, 'get_metrics'))
    
    def test_filter_processor_execution(self):
        """Test filter processor works."""
        processor = FilterProcessor(filter_key='name', filter_value='Alice')
        
        data = [
            {'name': 'Alice', 'value': 100},
            {'name': 'Bob', 'value': 200}
        ]
        
        result = processor.process(data)
        
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]['name'], 'Alice')
    
    def test_pipeline_execution(self):
        """Test pipeline executes correctly."""
        pipeline = Pipeline("Test Pipeline")
        pipeline.add_plugin(CSVReader())
        pipeline.add_plugin(TransformProcessor())
        
        result = pipeline.execute("test.csv")
        
        self.assertIsNotNone(result)
    
    def test_mro_correct(self):
        """Test MRO is as expected."""
        mro_names = [cls.__name__ for cls in CSVReader.mro()]
        
        # Check key classes in MRO
        self.assertIn('CSVReader', mro_names)
        self.assertIn('LoggingMixin', mro_names)
        self.assertIn('CachingMixin', mro_names)
        self.assertIn('ReaderPlugin', mro_names)
        self.assertIn('BasePlugin', mro_names)
```

## Summary

This capstone project demonstrates:

### Inheritance Concepts Applied

1. **Abstract Base Classes**: Clear contracts for plugin types
2. **Inheritance Hierarchy**: BasePlugin → Specific Plugin → Concrete Implementation
3. **Multiple Inheritance**: Combining mixins with base plugins
4. **Method Resolution Order**: Proper MRO with cooperative super()
5. **Mixins**: Reusable functionality across plugin types
6. **Composition**: Pipeline composes plugins
7. **Liskov Substitution**: Any plugin works in pipeline
8. **Extension Points**: Easy to add new plugins and mixins

### Best Practices Demonstrated

- ✅ Clear abstract interfaces
- ✅ Focused, single-purpose mixins
- ✅ Cooperative multiple inheritance
- ✅ Shallow hierarchies (2-3 levels)
- ✅ Proper super() usage
- ✅ Composition where appropriate
- ✅ Extensible architecture
- ✅ Testable design

### Architecture Principles

1. **Open/Closed**: Open for extension (new plugins), closed for modification
2. **Single Responsibility**: Each mixin does one thing
3. **Dependency Inversion**: Pipeline depends on abstractions (BasePlugin)
4. **Interface Segregation**: Specific plugin types for specific purposes

### Real-World Applicability

This pattern is used in:
- Web framework middleware
- Data processing pipelines
- Plugin systems (IDEs, browsers)
- ETL systems
- Testing frameworks

You now have a complete, production-ready plugin architecture demonstrating proper inheritance design!

**Next Steps**: Chapter 6 explores **Polymorphism** — using one interface for different implementations, building on the inheritance foundation we've established.

