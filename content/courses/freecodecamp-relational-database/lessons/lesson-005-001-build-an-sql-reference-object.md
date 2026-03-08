---
id: lesson-005-001
title: "Git — Build an SQL Reference Object"
chapterId: chapter-05
order: 4
duration: 120
objectives:
  - Initialize Git repositories and understand the staging area workflow
  - Create commits with meaningful messages and view commit history
  - Create, switch between, and manage Git branches
  - Merge branches and resolve merge conflicts
  - Use rebase, stash, and other intermediate Git commands
  - Build a complete SQL reference JSON file using a branching workflow
---

# Git — Build an SQL Reference Object

Git is the industry-standard version control system used by developers worldwide. In this lesson, you will learn Git by building a JSON reference object that documents common SQL commands. Each category of SQL commands gets its own branch, which you will then merge into the main branch — mirroring real-world development workflows.

## What Is Git?

Git tracks changes to files over time, creating a history of your project. It allows you to:

- Revert to previous versions if something breaks
- Work on new features without affecting stable code
- Collaborate with others without overwriting each other's work

## Setting Up — `git init`

Create a new project directory and initialize a Git repository:

```bash
mkdir sql-reference
cd sql-reference
git init
```

Output:

```
Initialized empty Git repository in /home/user/sql-reference/.git/
```

Git creates a hidden `.git` folder that stores all version history. You never need to edit this folder directly.

Check the status of your repository:

```bash
git status
```

Output:

```
On branch main
No commits yet
nothing to commit
```

## The First Commit

Create the initial JSON file:

```bash
echo '{
  "database": {
    "description": "SQL command reference organized by category",
    "version": "1.0"
  }
}' > sql_reference.json
```

Now check the status:

```bash
git status
```

Git reports `sql_reference.json` as an **untracked** file. To start tracking it:

```bash
git add sql_reference.json
git status
```

The file is now **staged** — ready to be committed. Create the commit:

```bash
git commit -m "Initial commit: create sql_reference.json with metadata"
```

The `-m` flag lets you write the commit message inline. Commits are snapshots of your project at a specific point in time.

View the commit history:

```bash
git log
```

Output:

```
commit a1b2c3d (HEAD -> main)
Author: user <user@example.com>
Date:   Mon Jan 15 10:00:00 2025

    Initial commit: create sql_reference.json with metadata
```

Use `git log --oneline` for a compact view.

## Branching — Parallel Development

Branches let you work on features in isolation. Let's create branches for different SQL command categories.

### Creating a Branch for SELECT Commands

```bash
git branch feat/select
git checkout feat/select
```

Or use the shorthand to create and switch in one command:

```bash
git checkout -b feat/select
```

Now edit `sql_reference.json` to add SELECT commands:

```bash
cat > sql_reference.json << 'EOF'
{
  "database": {
    "description": "SQL command reference organized by category",
    "version": "1.0"
  },
  "select": {
    "description": "Retrieve data from a database",
    "commands": {
      "SELECT": {
        "syntax": "SELECT column1, column2 FROM table_name;",
        "description": "Select specific columns from a table"
      },
      "SELECT_ALL": {
        "syntax": "SELECT * FROM table_name;",
        "description": "Select all columns from a table"
      },
      "WHERE": {
        "syntax": "SELECT column FROM table WHERE condition;",
        "description": "Filter rows based on a condition"
      },
      "ORDER_BY": {
        "syntax": "SELECT column FROM table ORDER BY column ASC|DESC;",
        "description": "Sort results in ascending or descending order"
      },
      "LIMIT": {
        "syntax": "SELECT column FROM table LIMIT number;",
        "description": "Limit the number of rows returned"
      },
      "DISTINCT": {
        "syntax": "SELECT DISTINCT column FROM table;",
        "description": "Return only unique values"
      }
    }
  }
}
EOF
```

Stage and commit:

```bash
git add sql_reference.json
git commit -m "feat: add SELECT command references"
```

### Creating a Branch for INSERT Commands

Switch back to main and create a new branch:

```bash
git checkout main
git checkout -b feat/insert
```

Notice that when you switch to `main`, the file reverts to the version without SELECT commands — those changes only exist on the `feat/select` branch.

Add INSERT commands to the JSON file:

```bash
cat > sql_reference.json << 'EOF'
{
  "database": {
    "description": "SQL command reference organized by category",
    "version": "1.0"
  },
  "insert": {
    "description": "Add new records to a table",
    "commands": {
      "INSERT_INTO": {
        "syntax": "INSERT INTO table_name (col1, col2) VALUES (val1, val2);",
        "description": "Insert a new row with specified values"
      },
      "INSERT_MULTIPLE": {
        "syntax": "INSERT INTO table (col1, col2) VALUES (v1, v2), (v3, v4);",
        "description": "Insert multiple rows in a single statement"
      }
    }
  }
}
EOF

git add sql_reference.json
git commit -m "feat: add INSERT command references"
```

### Creating Branches for UPDATE and DELETE

Repeat the pattern for UPDATE and DELETE commands:

```bash
git checkout main
git checkout -b feat/update

cat > sql_reference.json << 'EOF'
{
  "database": {
    "description": "SQL command reference organized by category",
    "version": "1.0"
  },
  "update": {
    "description": "Modify existing records in a table",
    "commands": {
      "UPDATE": {
        "syntax": "UPDATE table SET column = value WHERE condition;",
        "description": "Update rows that match the condition"
      },
      "UPDATE_MULTIPLE": {
        "syntax": "UPDATE table SET col1 = val1, col2 = val2 WHERE condition;",
        "description": "Update multiple columns at once"
      }
    }
  }
}
EOF

git add sql_reference.json
git commit -m "feat: add UPDATE command references"
```

## Merging Branches

Now let's bring all the feature branches together.

```bash
git checkout main
git merge feat/select
```

Git uses **fast-forward** merging when there is a clean, linear path from the current branch to the target branch. If both branches have diverged, Git creates a **merge commit**.

Since both `feat/insert` and `feat/update` also modified `sql_reference.json` from different starting points, merging them will likely produce **merge conflicts**.

```bash
git merge feat/insert
```

If a conflict occurs, Git marks the conflicting sections in the file:

```
<<<<<<< HEAD
  (content from current branch)
=======
  (content from the merging branch)
>>>>>>> feat/insert
```

To resolve the conflict:

1. Open the file and manually combine the changes.
2. Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
3. Stage the resolved file and commit.

```bash
# After manually editing the file to combine both sections
git add sql_reference.json
git commit -m "merge: combine SELECT and INSERT references"
```

Repeat for the remaining branches.

## Viewing Branch History

```bash
# See all branches
git branch

# See a visual log of branches and merges
git log --oneline --graph --all
```

Output might look like:

```
*   e5f6g7h (HEAD -> main) merge: combine all SQL references
|\
| * c3d4e5f (feat/update) feat: add UPDATE command references
|/
| * a1b2c3d (feat/insert) feat: add INSERT command references
|/
* 9z8y7x6 feat: add SELECT command references
* 1a2b3c4 Initial commit: create sql_reference.json with metadata
```

## Git Stash — Save Work for Later

If you are in the middle of changes but need to switch branches, `git stash` saves your uncommitted work:

```bash
# Save current changes
git stash

# List stashed changes
git stash list

# Apply the most recent stash
git stash pop

# Apply without removing from stash list
git stash apply
```

## Git Rebase — A Cleaner History

Rebasing replays your commits on top of another branch, creating a linear history instead of merge commits:

```bash
git checkout feat/select
git rebase main
```

This moves the `feat/select` commits so they appear after the latest commit on `main`. Use rebase for local branches that have not been shared. Avoid rebasing branches that others are working on.

## Useful Git Commands Summary

```bash
git diff                    # Show unstaged changes
git diff --staged           # Show staged changes
git log --oneline           # Compact commit history
git log --oneline --graph   # Visual branch graph
git reset HEAD filename     # Unstage a file
git checkout -- filename    # Discard changes to a file
git branch -d branchname    # Delete a merged branch
git remote -v               # List remote repositories
```

## Key Takeaways

1. **`git init`** creates a repository; **`git add`** stages changes; **`git commit`** saves a snapshot.
2. **Branches** isolate features — create them with `git branch` or `git checkout -b`, switch with `git checkout`.
3. **Merging** combines branches. Conflicts arise when the same lines are modified on different branches.
4. **Conflict resolution** requires manually editing files, removing markers, staging, and committing.
5. **`git stash`** temporarily shelves changes so you can switch contexts without committing incomplete work.
6. **`git rebase`** creates a cleaner, linear history by replaying commits on top of another branch.
7. **Commit messages matter** — use clear, descriptive messages like `feat: add SELECT references` to make history readable.

---

*This lesson is based on the "Learn Git by Building an SQL Reference Object" project from the [freeCodeCamp Relational Database Certification](https://www.freecodecamp.org/learn/relational-database/).*
