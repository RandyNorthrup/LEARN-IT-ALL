---
id: lesson-003-003
title: Introduction: Python as a Language
chapterId: chapter-03
order: 3
duration: 15
objectives:
  - Describe Python's history and design philosophy
  - Explain the difference between interpreted and compiled languages
  - Understand why Python 3 is the standard
  - Use the Python REPL for interactive exploration
---

# Introduction: Python as a Language

## A Brief History of Python

Python was created by **Guido van Rossum** and first released in **1991**. Guido named it after the British comedy group Monty Python, not after the snake. He designed Python with a key goal: **readability**. Python code should be easy to read and write, almost like pseudocode.

Python has grown into one of the most popular programming languages in the world. It is used at companies like Google, Netflix, Instagram, and NASA.

## Interpreted vs. Compiled Languages

Programming languages fall into two broad categories:

- **Compiled languages** (C, C++, Go): Your source code is translated into machine code *before* running. The result is a standalone executable that runs very fast.
- **Interpreted languages** (Python, JavaScript, Ruby): Your source code is translated and executed *line by line* at runtime by an interpreter.

Python is an **interpreted language**. This means you can write code and run it immediately without a separate compilation step. The trade-off is that Python is generally slower than compiled languages, but for most applications, the speed is more than adequate.

```python
# You can run this immediately — no compilation needed
print("Python is interpreted!")
print("Each line is executed in order.")
```

## Python 3 vs. Python 2

Python 2 was released in 2000, and Python 3 in 2008. Python 3 fixed many design flaws in Python 2 but was **not fully backward-compatible**. Python 2 reached its end of life on January 1, 2020, and no longer receives updates or security patches.

**Always use Python 3.** All modern Python development is done in Python 3. This course uses Python 3 exclusively.

Key differences you may encounter in older resources:

```python
# Python 2 (DO NOT USE)
# print "Hello"          # print was a statement
# raw_input("Name: ")    # different function name

# Python 3 (USE THIS)
print("Hello")            # print is a function
input("Name: ")           # input() replaces raw_input()
```

## The Python REPL

Python comes with an interactive mode called the **REPL** (Read-Eval-Print Loop). You start it by typing `python3` (or `python`) in your terminal:

```
$ python3
Python 3.12.0 (main, Oct  2 2024, 00:00:00)
>>> 2 + 3
5
>>> "hello".upper()
'HELLO'
>>> len("Python")
6
>>> exit()
```

The REPL is perfect for experimenting with small pieces of code, testing ideas, and exploring how Python works. You type an expression, Python evaluates it, and prints the result immediately.

## Python's Philosophy

Python has a set of guiding principles written by Tim Peters called **The Zen of Python**. You can read it by running:

```python
import this
```

Some of the most important principles:

- **Beautiful is better than ugly.** — Write clean, readable code.
- **Explicit is better than implicit.** — Be clear about what your code does.
- **Simple is better than complex.** — Choose the straightforward approach.
- **Readability counts.** — Code is read far more often than it is written.
- **Errors should never pass silently.** — Handle errors, don't ignore them.

## Installing Python

To check if Python is installed on your system:

```bash
python3 --version
```

If you need to install it, visit [python.org](https://www.python.org/downloads/) and download the latest Python 3 release for your operating system. On Linux, you can usually install it with your package manager (`sudo apt install python3`).

Once installed, you can create a file called `hello.py` with your favorite text editor and run it:

```bash
python3 hello.py
```

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
