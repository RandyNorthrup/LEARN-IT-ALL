---
id: 09-code-editors
title: Code Editors and IDEs
chapterId: ch1-intro
order: 9
duration: 25
objectives:
  - Understand code editors vs IDEs
  - Set up VS Code for Python
  - Learn essential editor features
  - Use code completion effectively
  - Configure extensions for productivity
---

# Code Editors and IDEs

## Introduction

A good code editor significantly improves your coding experience. This lesson covers choosing and configuring the right tools for Python development.

## Code Editor vs IDE

```python
# Code Editor: Lightweight, fast, customizable
# - VS Code, Sublime Text, Atom
# - Requires extensions for language support
# - Fast startup, minimal features by default

# IDE (Integrated Development Environment): Full-featured
# - PyCharm, Visual Studio, Eclipse
# - Built-in Python support
# - Heavier, more features out-of-box
```

## Popular Python Editors

**VS Code** (Recommended for beginners)
- Free and open source
- Excellent Python extension
- Large extension marketplace
- Integrated terminal
- Git integration

**PyCharm**
- Professional Python IDE
- Built-in debugging
- Code analysis
- Free Community Edition

**Jupyter Notebook**
- Interactive Python environment
- Great for data science
- Run code in cells
- Visualize results inline

## Setting Up VS Code

```bash
# 1. Download from https://code.visualstudio.com/
# 2. Install Python extension
# 3. Select Python interpreter

# Open VS Code terminal (Ctrl+`)
python --version
```

## Essential VS Code Features

```python
# 1. Code Completion (IntelliSense)
# Start typing, get suggestions
def calculate_area(width, height):
    return width * height

# Type 'calc' and it suggests the function name

# 2. Syntax Highlighting
# Different colors for keywords, strings, numbers
if True:  # 'if' and 'True' are colored differently
    print("Hello")  # 'print' is colored, "Hello" too

# 3. Error Detection
# Red squiggly lines show errors
x = 10
y = x + z  # z is undefined - shows error!

# 4. Auto-formatting (with Black or autopep8)
# Before:
def hello(  name  ):
  return"Hello, "+name

# After formatting:
def hello(name):
    return "Hello, " + name
```

## VS Code Keyboard Shortcuts

```python
# Essential shortcuts (Mac/Windows)
# Cmd+/ or Ctrl+/    - Comment/uncomment line
# Cmd+S or Ctrl+S    - Save file
# Cmd+Shift+P or Ctrl+Shift+P - Command palette
# Cmd+B or Ctrl+B    - Toggle sidebar
# Cmd+` or Ctrl+`    - Toggle terminal

# Multi-cursor editing
# Hold Alt/Option and click - Multiple cursors
# Cmd+D or Ctrl+D    - Select next occurrence

# Example: Change all 'x' to 'number'
x = 10
y = x * 2
z = x + 5
# Select 'x', press Cmd+D twice, type 'number'
```

## Code Completion Example

```python
# Type 'lis' and press Tab
numbers = [1, 2, 3, 4, 5]

# Type 'numbers.' and see available methods
numbers.append(6)  # Suggested by editor
numbers.sort()     # Suggested by editor
numbers.reverse()  # Suggested by editor

# Function parameter hints
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# When typing greet(, editor shows parameter hints
greet("Alice")  # Shows: name: str, greeting: str = "Hello"
```

## Linting (Code Quality Checks)

```python
# Install pylint or flake8
# pip install pylint

# Linter checks for:
# - Unused variables
x = 10  # Warning: unused variable

# - Missing imports
print(math.sqrt(16))  # Error: math not imported

# - Style issues
def BadFunctionName():  # Warning: should be snake_case
    pass

# - Potential bugs
if x = 10:  # Error: should be == not =
    print("Equal")
```

## Debugging in VS Code

```python
# Set breakpoint: Click left of line number
def calculate_total(prices):
    total = 0
    for price in prices:  # Set breakpoint here
        total += price
    return total

# Run debugger: F5
# Features:
# - Step through code line by line
# - Inspect variables
# - Watch expressions
# - Call stack

prices = [10, 20, 30]
result = calculate_total(prices)
```

## Useful VS Code Extensions

```python
# Essential Python Extensions:
# 1. Python (by Microsoft) - Core Python support
# 2. Pylance - Fast language server
# 3. Python Indent - Smart indentation
# 4. autoDocstring - Generate docstrings
# 5. Python Test Explorer - Run tests in UI

# Quality of Life:
# 6. GitLens - Git integration
# 7. Error Lens - Inline error messages
# 8. Bracket Pair Colorizer - Color matching brackets
# 9. indent-rainbow - Visualize indentation
# 10. Code Spell Checker - Catch typos
```

## Workspace Settings

```json
// .vscode/settings.json
{
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black",
    "editor.formatOnSave": true,
    "editor.rulers": [80, 120],
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 1000
}
```

## Terminal Integration

```python
# VS Code has integrated terminal
# Advantages:
# - Stay in editor while running code
# - Multiple terminals
# - Split terminals

# Run Python file from terminal:
# python script.py

# Interactive Python:
# python
# >>> print("Hello")
# >>> exit()

# Run specific lines (select and Shift+Enter)
x = 10
y = 20
print(x + y)  # Select these lines and run
```

## Code Snippets

```python
# Create custom snippets
# File > Preferences > User Snippets > python.json

# Example snippet for main guard:
# Type 'ifmain' and press Tab
if __name__ == "__main__":
    main()

# Snippet for function with docstring:
# Type 'deff' and press Tab
def function_name():
    """Function description."""
    pass
```

## Version Control Integration

```python
# VS Code has built-in Git support
# - See file changes in sidebar
# - Commit from UI
# - View diffs
# - Branch management

# Source Control panel shows:
# - Modified files (M)
# - New files (U - untracked)
# - Deleted files (D)

# Stage and commit without leaving editor
```

## Best Practices

```python
# 1. Use meaningful file names
# Good: calculate_statistics.py
# Bad: script1.py, temp.py

# 2. Organize with folders
# project/
#   src/
#     main.py
#   tests/
#     test_main.py
#   docs/

# 3. Use virtual environments
# python -m venv venv
# source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate     # Windows

# 4. Keep editor clean
# - Close unused tabs
# - Use split view for comparing files
# - Use workspace for multi-file projects

# 5. Learn keyboard shortcuts
# - Save time
# - Stay focused
# - Reduce mouse usage
```

## Summary

**Editor Features:**
- Code completion (IntelliSense)
- Syntax highlighting
- Error detection
- Auto-formatting
- Integrated terminal
- Debugging
- Git integration

**Essential Setup:**
- Install VS Code + Python extension
- Configure linter (pylint/flake8)
- Set up formatter (black/autopep8)
- Learn keyboard shortcuts
- Install useful extensions

**Best Practices:**
- Format on save
- Use linting
- Learn shortcuts
- Organize workspace
- Use version control

## Next Steps

Next, you'll learn Python debugging fundamentals and how to find and fix errors efficiently.
