---
id: template-method-pattern
title: Template Method Pattern
chapterId: ch4-abstraction
order: 36
duration: 15
objectives:
  - Master template method design pattern
  - Learn algorithm skeleton with customizable steps
  - Understand inversion of control
---

# Template Method Pattern

The **Template Method Pattern** defines the skeleton of an algorithm in a base class, allowing subclasses to override specific steps without changing the algorithm's structure. It's **inversion of control**—the base class calls subclass methods.

## The Pattern

```python
from abc import ABC, abstractmethod

class DataProcessor(ABC):
    """Template method pattern."""
    
    def process(self, data):
        """
        Template method - defines algorithm structure.
        
        Subclasses customize individual steps.
        """
        # ALGORITHM SKELETON
        data = self.load_data(data)
        data = self.validate_data(data)
        data = self.transform_data(data)
        data = self.filter_data(data)
        return self.save_data(data)
    
    # ABSTRACT STEPS - subclasses must implement
    @abstractmethod
    def load_data(self, data):
        pass
    
    @abstractmethod
    def save_data(self, data):
        pass
    
    # CONCRETE STEPS - default implementation
    def validate_data(self, data):
        """Default validation."""
        if not data:
            raise ValueError("Data cannot be empty")
        return data
    
    def transform_data(self, data):
        """Default transformation (identity)."""
        return data
    
    def filter_data(self, data):
        """Default filter (no filtering)."""
        return data

# CONCRETE IMPLEMENTATION 1
class CSVProcessor(DataProcessor):
    def load_data(self, data):
        print("Loading CSV data")
        return data.split(',')
    
    def transform_data(self, data):
        """Override transform step."""
        print("Transforming CSV: uppercase")
        return [item.upper() for item in data]
    
    def save_data(self, data):
        print("Saving CSV data")
        return ','.join(data)

# CONCRETE IMPLEMENTATION 2
class JSONProcessor(DataProcessor):
    def load_data(self, data):
        import json
        print("Loading JSON data")
        return json.loads(data)
    
    def filter_data(self, data):
        """Override filter step."""
        print("Filtering JSON: remove nulls")
        return {k: v for k, v in data.items() if v is not None}
    
    def save_data(self, data):
        import json
        print("Saving JSON data")
        return json.dumps(data)

# USAGE: Same algorithm structure, different implementations
csv = CSVProcessor()
result1 = csv.process("a,b,c")  # Uses CSV-specific load/transform/save

json_proc = JSONProcessor()
result2 = json_proc.process('{"x": 1, "y": null}')  # Uses JSON-specific load/filter/save
```

## Benefits of Template Method

### 1. Code Reuse

```python
from abc import ABC, abstractmethod

class ReportGenerator(ABC):
    """Template for report generation."""
    
    def generate_report(self, data):
        """Template method - same structure for all reports."""
        # Common algorithm
        header = self.create_header()
        body = self.create_body(data)
        footer = self.create_footer()
        return self.format_report(header, body, footer)
    
    @abstractmethod
    def create_body(self, data):
        """Each report has unique body."""
        pass
    
    def create_header(self):
        """Common header for all reports."""
        return "=== REPORT ==="
    
    def create_footer(self):
        """Common footer for all reports."""
        return "=== END ==="
    
    def format_report(self, header, body, footer):
        """Common formatting."""
        return f"{header}\n{body}\n{footer}"

class SalesReport(ReportGenerator):
    def create_body(self, data):
        return f"Total Sales: ${sum(data)}"

class InventoryReport(ReportGenerator):
    def create_body(self, data):
        return f"Items in Stock: {len(data)}"

# Both reuse header, footer, format
sales = SalesReport()
print(sales.generate_report([100, 200, 300]))

inventory = InventoryReport()
print(inventory.generate_report(['item1', 'item2', 'item3']))
```

### 2. Consistent Structure

```python
from abc import ABC, abstractmethod

class TestCase(ABC):
    """Template for test cases."""
    
    def run_test(self):
        """Template method - ensures consistent test structure."""
        print("Setting up test...")
        self.setup()
        
        try:
            print("Running test...")
            self.test()
            print("✓ Test passed")
        except AssertionError as e:
            print(f"✗ Test failed: {e}")
        finally:
            print("Tearing down test...")
            self.teardown()
    
    def setup(self):
        """Hook method - override if needed."""
        pass
    
    @abstractmethod
    def test(self):
        """Each test implements this."""
        pass
    
    def teardown(self):
        """Hook method - override if needed."""
        pass

class DatabaseTest(TestCase):
    def setup(self):
        self.db = "connected"
        print("  Connected to database")
    
    def test(self):
        assert self.db == "connected"
    
    def teardown(self):
        print("  Closed database connection")

test = DatabaseTest()
test.run_test()  # Consistent structure guaranteed
```

### 3. Control Flow

```python
from abc import ABC, abstractmethod

class GameEngine(ABC):
    """Template for game loop."""
    
    def run_game(self):
        """Template method - game loop structure."""
        self.initialize()
        
        while not self.is_game_over():
            self.process_input()
            self.update_game_state()
            self.render()
        
        self.cleanup()
    
    @abstractmethod
    def initialize(self):
        """Setup game."""
        pass
    
    @abstractmethod
    def process_input(self):
        """Handle user input."""
        pass
    
    @abstractmethod
    def update_game_state(self):
        """Update game logic."""
        pass
    
    @abstractmethod
    def render(self):
        """Draw game."""
        pass
    
    @abstractmethod
    def is_game_over(self):
        """Check if game ended."""
        pass
    
    def cleanup(self):
        """Default cleanup."""
        print("Game over. Cleaning up...")

# Each game follows same loop structure
class PongGame(GameEngine):
    def __init__(self):
        self.frame = 0
    
    def initialize(self):
        print("Initializing Pong")
    
    def process_input(self):
        print(f"  Frame {self.frame}: Processing input")
    
    def update_game_state(self):
        print(f"  Frame {self.frame}: Updating state")
        self.frame += 1
    
    def render(self):
        print(f"  Frame {self.frame}: Rendering")
    
    def is_game_over(self):
        return self.frame >= 3  # End after 3 frames

game = PongGame()
game.run_game()
```

## Hook Methods

```python
from abc import ABC, abstractmethod

class OrderProcessor(ABC):
    """Template with hooks."""
    
    def process_order(self, order):
        """Template method."""
        self.validate_order(order)
        
        # HOOK: Can override
        self.before_payment(order)
        
        self.process_payment(order)
        
        # HOOK: Can override
        self.after_payment(order)
        
        self.ship_order(order)
    
    @abstractmethod
    def validate_order(self, order):
        pass
    
    @abstractmethod
    def process_payment(self, order):
        pass
    
    @abstractmethod
    def ship_order(self, order):
        pass
    
    # HOOK METHODS: Optional overrides
    def before_payment(self, order):
        """Hook - override if needed."""
        pass
    
    def after_payment(self, order):
        """Hook - override if needed."""
        pass

class DigitalProductOrder(OrderProcessor):
    def validate_order(self, order):
        print("Validating digital product order")
    
    def process_payment(self, order):
        print("Processing payment")
    
    def ship_order(self, order):
        print("Sending download link")  # Different from physical!
    
    def after_payment(self, order):
        """Override hook to add loyalty points."""
        print("  Adding loyalty points")

digital_order = DigitalProductOrder()
digital_order.process_order({"item": "ebook"})
```

## Real-World Example: Document Converter

```python
from abc import ABC, abstractmethod
from typing import Any

class DocumentConverter(ABC):
    """
    Template for document conversion.
    
    Algorithm:
    1. Load source document
    2. Parse content
    3. Transform to intermediate format
    4. Convert to target format
    5. Save result
    """
    
    def convert(self, source_file: str, target_file: str) -> bool:
        """
        Template method - conversion algorithm.
        
        Returns:
            True if successful
        """
        print(f"Converting {source_file} -> {target_file}")
        
        # STEP 1: Load
        raw_data = self.load_file(source_file)
        
        # STEP 2: Parse
        parsed = self.parse_content(raw_data)
        
        # STEP 3: Transform (optional hook)
        transformed = self.transform_content(parsed)
        
        # STEP 4: Convert
        converted = self.convert_to_target(transformed)
        
        # STEP 5: Save
        success = self.save_file(target_file, converted)
        
        if success:
            self.on_success(source_file, target_file)
        else:
            self.on_failure(source_file, target_file)
        
        return success
    
    # ABSTRACT METHODS: Must implement
    @abstractmethod
    def parse_content(self, raw_data: str) -> Any:
        """Parse source format."""
        pass
    
    @abstractmethod
    def convert_to_target(self, data: Any) -> str:
        """Convert to target format."""
        pass
    
    # CONCRETE METHODS: Default implementation
    def load_file(self, filename: str) -> str:
        """Default file loading."""
        print(f"  Loading {filename}")
        try:
            with open(filename, 'r') as f:
                return f.read()
        except FileNotFoundError:
            raise ValueError(f"File not found: {filename}")
    
    def save_file(self, filename: str, content: str) -> bool:
        """Default file saving."""
        print(f"  Saving {filename}")
        try:
            with open(filename, 'w') as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"  Error saving: {e}")
            return False
    
    # HOOK METHODS: Optional overrides
    def transform_content(self, data: Any) -> Any:
        """Hook - override for intermediate transformations."""
        return data
    
    def on_success(self, source: str, target: str) -> None:
        """Hook - called on success."""
        print(f"✓ Conversion successful")
    
    def on_failure(self, source: str, target: str) -> None:
        """Hook - called on failure."""
        print(f"✗ Conversion failed")

# CONVERTER 1: Markdown to HTML
class MarkdownToHTMLConverter(DocumentConverter):
    def parse_content(self, raw_data: str) -> dict:
        """Parse markdown."""
        print("  Parsing Markdown")
        # Simplified parsing
        lines = raw_data.split('\n')
        return {'lines': lines}
    
    def convert_to_target(self, data: dict) -> str:
        """Convert to HTML."""
        print("  Converting to HTML")
        html_lines = []
        for line in data['lines']:
            if line.startswith('# '):
                html_lines.append(f"<h1>{line[2:]}</h1>")
            elif line:
                html_lines.append(f"<p>{line}</p>")
        return '\n'.join(html_lines)

# CONVERTER 2: CSV to JSON
class CSVToJSONConverter(DocumentConverter):
    def parse_content(self, raw_data: str) -> list:
        """Parse CSV."""
        print("  Parsing CSV")
        lines = raw_data.strip().split('\n')
        headers = lines[0].split(',')
        rows = []
        for line in lines[1:]:
            values = line.split(',')
            rows.append(dict(zip(headers, values)))
        return rows
    
    def convert_to_target(self, data: list) -> str:
        """Convert to JSON."""
        print("  Converting to JSON")
        import json
        return json.dumps(data, indent=2)
    
    def transform_content(self, data: list) -> list:
        """Override hook - clean data."""
        print("  Cleaning data")
        # Remove empty rows
        return [row for row in data if any(row.values())]

# USAGE
# Create markdown file
with open('/tmp/test.md', 'w') as f:
    f.write('# Hello\nThis is markdown.')

md_converter = MarkdownToHTMLConverter()
md_converter.convert('/tmp/test.md', '/tmp/test.html')

# Create CSV file
with open('/tmp/test.csv', 'w') as f:
    f.write('name,age\nAlice,30\nBob,25')

csv_converter = CSVToJSONConverter()
csv_converter.convert('/tmp/test.csv', '/tmp/test.json')
```

## Template Method vs Strategy Pattern

```python
# TEMPLATE METHOD: Base class controls algorithm
class Sorter(ABC):
    def sort(self, data):
        """Template method."""
        data = self.prepare(data)
        data = self.do_sort(data)  # Subclass implements
        return self.finalize(data)
    
    @abstractmethod
    def do_sort(self, data): pass

# STRATEGY PATTERN: Client controls algorithm
class Sorter:
    def __init__(self, strategy):
        self.strategy = strategy  # Inject algorithm
    
    def sort(self, data):
        return self.strategy.sort(data)
```

## When to Use Template Method

### Use Template Method When:

✅ **Common algorithm** with variable steps  
✅ **Control flow** should be in base class  
✅ **Code reuse** across similar algorithms  
✅ **Extension points** needed at specific steps  

### Don't Use When:

❌ **No common structure** exists  
❌ **Flexibility** to swap entire algorithm needed (use Strategy)  
❌ **Algorithm too simple** for abstraction  

## Summary

The **Template Method Pattern** defines an algorithm's skeleton in a base class, allowing subclasses to customize specific steps without changing the algorithm's structure. It provides **inversion of control**—the base class calls methods that subclasses implement. Use **abstract methods** for required customization points and **hook methods** (empty or default implementations) for optional customization. The pattern ensures **consistent algorithm structure** across implementations while enabling **controlled variation** at specific steps. It's ideal for scenarios with a **common workflow** but **variable details**—like data processing pipelines, test frameworks, or game loops. Template method promotes **code reuse**, **maintainability**, and **consistency** by keeping the algorithm's structure in one place.
