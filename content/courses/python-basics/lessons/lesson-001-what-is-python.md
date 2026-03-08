---
id: lesson-001-what-is-python
title: What is Python?
chapterId: ch1-intro
order: 1
duration: 30
objectives:
  - Understand what Python is and why it's popular
  - Learn about Python's history and design philosophy
  - Compare Python to other programming languages
  - Set up Python and run your first program
  - Explore Python's ecosystem and career opportunities
---

# What is Python?

Python is a **high-level, interpreted, general-purpose programming language** known for its clear syntax and readability. It is one of the most popular programming languages in the world and an excellent choice for beginners and professionals alike. In this lesson, we'll explore where Python came from, how it works, why it's so widely used, and how to get started.

## A Brief History of Python

Python was created by **Guido van Rossum**, a Dutch programmer, while he was working at Centrum Wiskunde & Informatica (CWI) in the Netherlands. He began developing the language in the late 1980s as a successor to the ABC programming language, and **Python 0.9.0 was first released in February 1991**.

### Why "Python"?

The name has nothing to do with snakes! Guido van Rossum was a fan of the British comedy group **Monty Python's Flying Circus**, and he chose the name "Python" because he wanted something short, unique, and slightly mysterious. You'll find Monty Python references scattered throughout Python's documentation and community culture (like using `spam` and `eggs` as example variable names instead of the traditional `foo` and `bar`).

### Key Milestones

- **1991**: Python 0.9.0 released with classes, exception handling, functions, and core data types
- **2000**: Python 2.0 released with list comprehensions, garbage collection, and Unicode support
- **2008**: Python 3.0 released — a major redesign that was intentionally **not** backward-compatible with Python 2
- **2020**: Python 2 reached **end of life** (no more updates or security patches)
- **2023–2024**: Python 3.12 and 3.13 released with significant performance improvements

### Python 2 vs. Python 3

If you encounter older tutorials or code, you may see Python 2 syntax. Here are the key differences:

```python
# Python 2 (OUTDATED — do not use)
print "Hello, World!"
result = 5 / 2   # Returns 2 (integer division)

# Python 3 (CURRENT — use this!)
print("Hello, World!")
result = 5 / 2   # Returns 2.5 (true division)
```

**Always use Python 3.** Python 2 has been officially retired since January 1, 2020. All modern libraries, frameworks, and tools target Python 3.

## Python's Design Philosophy: The Zen of Python

Python has a set of guiding principles known as **The Zen of Python**, written by Tim Peters. You can view it anytime by typing `import this` in a Python interpreter:

```python
import this
```

Here are some of the most important principles:

> **Beautiful is better than ugly.**
> **Explicit is better than implicit.**
> **Simple is better than complex.**
> **Readability counts.**
> **There should be one — and preferably only one — obvious way to do it.**

These principles shape how Python code is written. The language actively encourages clean, readable code. Unlike many languages where there are dozens of ways to accomplish the same task, Python generally favors one clear approach.

## Interpreted vs. Compiled Languages

Programming languages are typically either **compiled** or **interpreted**:

| Feature | Compiled (C, C++, Rust) | Interpreted (Python, JavaScript) |
|---------|------------------------|----------------------------------|
| Translation | Entire program compiled to machine code before running | Code translated line by line at runtime |
| Speed | Generally faster execution | Generally slower execution |
| Development | Requires compilation step | Run immediately — faster development cycle |
| Error Detection | Many errors caught at compile time | Errors found at runtime |
| Portability | Must recompile for each platform | Runs anywhere the interpreter is installed |

Python is an **interpreted language**. When you run a Python script:

1. You write code in a `.py` file
2. The Python interpreter reads your code
3. It compiles it to **bytecode** (an intermediate representation stored in `.pyc` files)
4. The Python Virtual Machine (PVM) executes the bytecode

This process happens automatically — you just run your file and see results. The tradeoff is that Python is slower than compiled languages like C++, but the development speed is much faster.

```python
# This is all you need to run a Python program!
# Save as hello.py, then run: python hello.py
print("Python handles all the compilation behind the scenes!")
```

## How Python Compares to Other Languages

### Python vs. Java

```python
# Python — simple and concise
name = "Alice"
print(f"Hello, {name}!")
```

```java
// Java — more verbose, requires class structure
public class Hello {
    public static void main(String[] args) {
        String name = "Alice";
        System.out.println("Hello, " + name + "!");
    }
}
```

### Python vs. C++

```python
# Python — dynamic typing, minimal boilerplate
numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(total)  # 15
```

```cpp
// C++ — manual type declarations, includes needed
#include <iostream>
#include <vector>
#include <numeric>
int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    int total = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << total << std::endl;
    return 0;
}
```

### Python vs. JavaScript

Python and JavaScript are both dynamically typed and interpreted, but they serve different primary roles. JavaScript dominates web browsers, while Python dominates data science, automation, and backend services. Python's syntax is generally considered more readable due to its use of indentation instead of braces.

```python
# Python
for i in range(5):
    print(i)
```

```javascript
// JavaScript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

## Real-World Companies Using Python

Python isn't just a "beginner language" — it powers some of the world's most important technology:

- **Google**: Python is one of Google's three official languages. YouTube's backend was originally written in Python. Google uses Python extensively for internal tools, AI/ML systems, and automation.
- **Netflix**: Uses Python for content recommendation algorithms, data analysis pipelines, and operational automation.
- **Instagram**: Built on Django (a Python web framework) and serves over a billion users.
- **NASA**: Uses Python for scientific computing, data analysis, and mission planning.
- **Spotify**: Python powers Spotify's backend services and data analytics platform.
- **Dropbox**: The desktop client was written in Python. Guido van Rossum himself worked at Dropbox from 2013 to 2019.
- **Reddit**: Originally built with Python and continues to use it extensively.

## What Can You Build with Python?

Python's versatility is one of its greatest strengths:

- **Web Applications**: Django, Flask, FastAPI
- **Data Analysis & Visualization**: Pandas, NumPy, Matplotlib, Seaborn
- **Machine Learning & AI**: TensorFlow, PyTorch, scikit-learn
- **Automation & Scripting**: Automate file management, web scraping, email sending
- **Game Development**: Pygame library
- **Desktop Applications**: Tkinter, PyQt, Kivy
- **DevOps & System Administration**: Ansible, SaltStack
- **Scientific Computing**: SciPy, SymPy, Jupyter Notebooks

## Python's Ecosystem: PyPI and pip

One of Python's superpowers is its massive library ecosystem. The **Python Package Index (PyPI)** hosts over **500,000 packages** that you can install with a single command:

```bash
# pip is Python's package installer
pip install requests        # HTTP library
pip install pandas          # Data analysis
pip install flask           # Web framework
pip install matplotlib      # Plotting/charts
```

You can also see what's installed and manage packages:

```bash
pip list                    # See installed packages
pip install --upgrade numpy # Upgrade a package
pip uninstall package_name  # Remove a package
```

This ecosystem means you rarely need to build everything from scratch — there's almost always a well-tested library available.

## Career Opportunities

Python skills are in extremely high demand across many industries:

- **Data Scientist / Data Analyst**: One of the top skills required
- **Machine Learning Engineer**: Python is the dominant language in AI/ML
- **Backend Web Developer**: Django and FastAPI are popular choices
- **DevOps Engineer**: Automation scripts, infrastructure management
- **Cybersecurity Analyst**: Penetration testing, security automation
- **Quantitative Analyst**: Financial modeling and algorithmic trading

Python consistently ranks as one of the top 3 most in-demand programming languages in job postings worldwide.

## Setting Up Python

### Installing Python

1. **Visit** [python.org/downloads](https://www.python.org/downloads/)
2. **Download** the latest Python 3.x version for your operating system
3. **Run the installer** — on Windows, make sure to check **"Add Python to PATH"**
4. **Verify the installation** by opening a terminal:

```bash
python --version
# Output: Python 3.12.x (or newer)
```

### The Python REPL (Interactive Mode)

The **REPL** (Read-Eval-Print Loop) lets you type Python code and see results immediately. Start it by typing `python` in your terminal:

```bash
$ python
Python 3.12.0 (main, Oct 2 2023, 00:00:00)
>>> 2 + 3
5
>>> "Hello" + " " + "World"
'Hello World'
>>> len("Python")
6
>>> exit()
```

The REPL is perfect for quick experiments and testing ideas.

### Running .py Files

For real programs, you'll write code in `.py` files and run them from the terminal:

```bash
# Create a file called hello.py with your text editor
# Then run it:
python hello.py
```

## Your First Python Program — A Deeper Look

Let's look at the classic first program more carefully:

```python
# This is a comment — Python ignores it
# Comments help explain your code to other humans

print("Hello, World!")
```

Let's break this down:

- **`#`**: Starts a comment. Everything after `#` on that line is ignored by Python.
- **`print()`**: A built-in function that outputs text to the console. Functions have parentheses `()` that contain their **arguments**.
- **`"Hello, World!"`**: A **string** — a sequence of characters enclosed in quotes. You can use single quotes `'Hello, World!'` or double quotes `"Hello, World!"`.

Let's try something slightly more complex:

```python
# A program that introduces itself
print("Welcome to Python!")
print("Python version 3.12")
print("=" * 30)       # Prints ==============================
print("Let's learn to code!")

# Basic math
print(2 + 3)           # 5
print(10 * 4)          # 40
print(100 / 3)         # 33.333...
```

Notice how Python lets you multiply a string by a number (`"=" * 30`) — this kind of intuitive behavior is part of what makes Python so enjoyable to use.

## Try It Yourself

1. Open a Python REPL and try these expressions:
   - `print("Your name here")`
   - `2 ** 10` (exponentiation — what is 2 to the power of 10?)
   - `import this` (read The Zen of Python)
2. Create a file called `about_me.py` that prints your name, favorite food, and a fun fact about yourself.
3. Try using `type()` to check data types: `type(42)`, `type("hello")`, `type(3.14)`.

## Key Takeaways

- Python was created by **Guido van Rossum** in **1991**, named after **Monty Python**
- Python is an **interpreted language** — no separate compilation step needed
- **Python 3** is the only supported version; Python 2 is retired
- Python's design philosophy values **readability, simplicity, and explicitness**
- Major companies like **Google, Netflix, Instagram, and NASA** use Python in production
- Python has a massive ecosystem of packages available through **PyPI** and **pip**
- Python is versatile: web development, data science, AI, automation, and more
- The **REPL** allows interactive experimentation; `.py` files are for real programs
- Python is one of the most **in-demand** programming languages for careers

## What's Next?

Now that you know what Python is and why it matters, let's start writing real code. In the next lesson, we'll learn about **variables and assignment** — the foundation of every program!
