---
id: 11-version-control-intro
title: Introduction to Version Control
chapterId: ch1-intro
order: 11
duration: 25
objectives:
  - Understand version control concepts
  - Learn basic Git operations
  - Create and manage repositories
  - Track changes in code
  - Collaborate with version control
---

# Introduction to Version Control

## Introduction

Version control tracks changes to your code over time. It's like "save points" in a video game—you can always go back to an earlier version if something breaks.

## Why Version Control?

```python
# Without version control:
# script_v1.py
# script_v2.py
# script_v3_final.py
# script_v3_final_ACTUAL.py
# script_v3_final_ACTUAL_fixed.py  # Chaos!

# With version control (Git):
# script.py with full history of all changes
# Can see what changed, when, and why
# Can go back to any previous version
```

## What is Git?

```bash
# Git: Most popular version control system
# - Tracks all changes to files
# - Stores complete history
# - Enables collaboration
# - Works offline
# - Free and open source

# GitHub/GitLab/Bitbucket: Cloud hosting for Git repositories
```

## Installing Git

```bash
# Check if Git is installed
git --version

# Mac (with Homebrew):
brew install git

# Windows:
# Download from https://git-scm.com/

# Linux:
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git      # Fedora/RHEL
```

## Git Basic Concepts

```python
# Repository (repo): Project folder tracked by Git
# Commit: Snapshot of your code at a point in time
# Branch: Separate line of development
# Remote: Online copy of your repository (e.g., GitHub)

# Example timeline:
# Commit 1: "Add hello world"
# Commit 2: "Add user input"
# Commit 3: "Fix typo in greeting"
# Each commit remembers what changed
```

## Creating a Repository

```bash
# Navigate to your project folder
cd my_python_project

# Initialize Git repository
git init

# Output:
# Initialized empty Git repository in /path/to/my_python_project/.git/
```

## Tracking Changes

```bash
# Create a Python file
echo 'print("Hello, World!")' > hello.py

# Check status
git status
# Output:
# Untracked files:
#   hello.py

# Stage the file (prepare for commit)
git add hello.py

# Check status again
git status
# Output:
# Changes to be committed:
#   new file: hello.py

# Commit the change
git commit -m "Add hello world program"
# Output:
# [main abc1234] Add hello world program
#  1 file changed, 1 insertion(+)
```

## Git Workflow

```bash
# Basic workflow:
# 1. Make changes to files
# 2. Stage changes (git add)
# 3. Commit changes (git commit)
# 4. Repeat

# Example:
# Edit hello.py
echo 'name = input("Name: ")' >> hello.py
echo 'print(f"Hello, {name}!")' >> hello.py

# Stage
git add hello.py

# Commit
git commit -m "Add user input feature"

# View history
git log
# Shows all commits with dates, authors, messages
```

## Viewing Changes

```bash
# See what changed in a file
git diff hello.py

# Output shows:
# +name = input("Name: ")
# +print(f"Hello, {name}!")
# Lines with + are additions
# Lines with - are deletions

# See changes staged for commit
git diff --staged

# View commit history
git log --oneline
# abc1234 Add user input feature
# def5678 Add hello world program
```

## Undoing Changes

```bash
# Scenario 1: Discard changes in working directory
# (haven't staged yet)
echo 'print("Bad code")' >> hello.py
git checkout -- hello.py  # Discard changes

# Scenario 2: Unstage file
git add hello.py
git reset HEAD hello.py  # Unstage

# Scenario 3: Undo last commit (keep changes)
git reset --soft HEAD~1

# Scenario 4: Undo last commit (discard changes)
git reset --hard HEAD~1  # CAREFUL! Loses changes permanently
```

## Branching Basics

```bash
# Create new branch
git branch feature-greeting

# Switch to branch
git checkout feature-greeting
# Or combine: git checkout -b feature-greeting

# Make changes on branch
echo 'def greet(name):' > greetings.py
echo '    return f"Hello, {name}!"' >> greetings.py

git add greetings.py
git commit -m "Add greet function"

# Switch back to main branch
git checkout main

# Merge branch into main
git merge feature-greeting
```

## Working with GitHub

```bash
# Create repository on GitHub
# Then connect local repo to GitHub

# Add remote
git remote add origin https://github.com/username/my_python_project.git

# Push to GitHub
git push -u origin main

# Clone repository from GitHub
git clone https://github.com/username/my_python_project.git

# Pull latest changes
git pull origin main
```

## .gitignore File

```python
# .gitignore: Tell Git which files to ignore

# Create .gitignore
# __pycache__/
# *.pyc
# .env
# venv/
# .DS_Store

# Why ignore files?
# - Generated files (__pycache__, *.pyc)
# - Environment files (.env with secrets)
# - Virtual environments (venv/)
# - IDE files (.vscode/, .idea/)

# Example structure:
# my_project/
#   .git/           # Git internal files
#   .gitignore      # Files to ignore
#   main.py         # Tracked
#   __pycache__/    # Ignored
#   venv/           # Ignored
```

## Commit Messages Best Practices

```bash
# Good commit messages:
git commit -m "Add user authentication"
git commit -m "Fix division by zero error"
git commit -m "Update documentation for API endpoints"

# Bad commit messages:
git commit -m "stuff"
git commit -m "changes"
git commit -m "asdf"

# Format:
# - Use present tense ("Add feature" not "Added feature")
# - Be specific about what changed
# - Keep under 50 characters for first line
# - Add details in body if needed

# Multi-line commit:
git commit -m "Add user login" -m "Implements authentication with password hashing"
```

## Common Git Commands

```bash
# Status and history
git status          # Show current status
git log             # Show commit history
git log --oneline   # Compact history
git diff            # Show changes

# Staging and committing
git add file.py     # Stage specific file
git add .           # Stage all changes
git commit -m "msg" # Commit staged changes

# Branches
git branch          # List branches
git branch name     # Create branch
git checkout name   # Switch branch
git merge name      # Merge branch

# Remote operations
git push            # Upload changes
git pull            # Download changes
git clone url       # Copy repository

# Undoing
git checkout -- file  # Discard changes
git reset HEAD file   # Unstage file
git reset --soft HEAD~1  # Undo commit
```

## Practical Example

```python
# Project: Calculator app

# Day 1: Initial commit
# calculator.py
def add(a, b):
    return a + b

# git add calculator.py
# git commit -m "Add addition function"

# Day 2: Add more functions
def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

# git add calculator.py
# git commit -m "Add subtract and multiply functions"

# Day 3: Oops, found a bug!
# (Use git log to see history)
# (Use git diff to see changes)
# (Fix bug)
# git commit -m "Fix bug in multiply function"

# Now you have complete history:
# - What changed?
# - When did it change?
# - Why was it changed? (commit message)
# - Who changed it? (author)
```

## Version Control Benefits

```python
# 1. Safety: Never lose code
# - Accidentally deleted a file? Restore it
# - Code broke? Go back to working version

# 2. History: Track all changes
# - See what changed over time
# - Understand why changes were made
# - Find when bug was introduced

# 3. Experimentation: Try new ideas safely
# - Create branch for new feature
# - If it works, merge it
# - If not, delete branch

# 4. Collaboration: Work with others
# - Multiple people work on same project
# - Git merges changes automatically
# - Resolve conflicts when needed

# 5. Backup: Code stored remotely
# - Push to GitHub/GitLab
# - Computer dies? Code is safe
# - Work from multiple computers
```

## Summary

**Core Concepts:**
- **Repository**: Project tracked by Git
- **Commit**: Snapshot of your code
- **Branch**: Separate line of development
- **Remote**: Online copy (GitHub, GitLab)

**Basic Workflow:**
1. Make changes
2. Stage changes (`git add`)
3. Commit changes (`git commit`)
4. Push to remote (`git push`)

**Essential Commands:**
- `git init`: Create repository
- `git add`: Stage changes
- `git commit`: Save snapshot
- `git status`: Check status
- `git log`: View history
- `git push/pull`: Sync with remote

**Best Practices:**
- Commit often
- Write clear commit messages
- Use `.gitignore`
- Create branches for features
- Push regularly to remote

## Next Steps

Next, you'll learn Python coding best practices and style guidelines.
