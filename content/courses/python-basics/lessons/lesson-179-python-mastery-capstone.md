---
id: lesson-179-python-mastery-capstone
title: "Python Mastery: Final Capstone Project"
chapterId: ch13-practice
order: 14
duration: 45
objectives:
  - Integrate all Python concepts learned
  - Build production-ready application
  - Demonstrate software engineering best practices
  - Apply testing, error handling, and optimization
---

# Python Mastery: Final Capstone Project

Build a complete, production-ready task management system that integrates every concept from this course.

## Project Overview

Create a comprehensive **Task Management System** with:
- User management and authentication
- Task CRUD operations with priorities and deadlines
- Project organization and collaboration
- Progress tracking and analytics
- File attachments and notes
- RESTful API
- Comprehensive testing
- Data persistence
- Error handling and logging

This capstone demonstrates mastery of all Python fundamentals covered in Chapters 1-12.

## Architecture Overview

```
task_manager/
├── models/           # Data models (Ch2: Variables, Ch8-10: Data Structures)
│   ├── user.py
│   ├── task.py
│   └── project.py
├── services/         # Business logic (Ch6: Functions, Ch7: Scope)
│   ├── auth_service.py
│   ├── task_service.py
│   └── project_service.py
├── database/         # Data persistence (Ch8-10: Collections)
│   ├── db_manager.py
│   └── migrations/
├── api/             # API endpoints (Ch6: Functions, Ch11: Error Handling)
│   ├── routes.py
│   └── middleware.py
├── utils/           # Utilities (Ch3: Computing, Ch4: Conditionals)
│   ├── validators.py
│   ├── logger.py
│   └── security.py
├── tests/           # Testing (Ch12: Testing)
│   ├── test_models.py
│   ├── test_services.py
│   └── test_api.py
└── main.py          # Entry point (Ch5: Loops, Ch11: Error Handling)
```

## Part 1: Data Models (Chapters 2, 8-10)

```python
# models/user.py
from datetime import datetime
from typing import List, Optional
import uuid
import hashlib

# Task priority constants
PRIORITY_LOW = 1
PRIORITY_MEDIUM = 2
PRIORITY_HIGH = 3
PRIORITY_URGENT = 4

PRIORITY_NAMES = {
    PRIORITY_LOW: "LOW",
    PRIORITY_MEDIUM: "MEDIUM",
    PRIORITY_HIGH: "HIGH",
    PRIORITY_URGENT: "URGENT",
}

# Task status constants
STATUS_TODO = "todo"
STATUS_IN_PROGRESS = "in_progress"
STATUS_REVIEW = "review"
STATUS_DONE = "done"
STATUS_ARCHIVED = "archived"


def hash_password(password):
    """Hash password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()


def create_user(username, email, password_hash, full_name,
                user_id=None, created_at=None, is_active=True,
                projects=None):
    """Create a user record - demonstrates dicts, type hints, validation"""
    if not user_id:
        user_id = str(uuid.uuid4())

    if not username or len(username) < 3:
        raise ValueError("Username must be at least 3 characters")

    if '@' not in email:
        raise ValueError("Invalid email address")

    return {
        "id": user_id,
        "username": username,
        "email": email,
        "password_hash": password_hash,
        "full_name": full_name,
        "created_at": created_at or datetime.now(),
        "is_active": is_active,
        "projects": projects if projects is not None else [],
    }


def check_password(user, password):
    """Verify password"""
    return user["password_hash"] == hash_password(password)


def user_to_dict(user):
    """Convert to dictionary (excluding password)"""
    return {
        "id": user["id"],
        "username": user["username"],
        "email": user["email"],
        "full_name": user["full_name"],
        "created_at": user["created_at"].isoformat(),
        "is_active": user["is_active"],
        "projects": user["projects"],
    }


# models/task.py

def create_task(title, description, project_id, created_by,
                priority=PRIORITY_MEDIUM, status=STATUS_TODO,
                assignee_id=None, due_date=None, tags=None,
                subtasks=None, attachments=None,
                task_id=None, created_at=None, completed_at=None):
    """Create a task record - demonstrates complex data, dates, logic"""
    if not task_id:
        task_id = str(uuid.uuid4())

    if not title:
        raise ValueError("Task title is required")

    return {
        "id": task_id,
        "title": title,
        "description": description,
        "priority": priority,
        "status": status,
        "project_id": project_id,
        "assignee_id": assignee_id,
        "created_by": created_by,
        "created_at": created_at or datetime.now(),
        "due_date": due_date,
        "completed_at": completed_at,
        "tags": tags if tags is not None else [],
        "subtasks": subtasks if subtasks is not None else [],
        "attachments": attachments if attachments is not None else [],
    }


def task_is_overdue(task):
    """Check if task is overdue"""
    if not task["due_date"] or task["status"] == STATUS_DONE:
        return False
    return datetime.now() > task["due_date"]


def task_days_until_due(task):
    """Calculate days until due date"""
    if not task["due_date"]:
        return None
    delta = task["due_date"] - datetime.now()
    return delta.days


def task_complete(task):
    """Mark task as completed"""
    task["status"] = STATUS_DONE
    task["completed_at"] = datetime.now()


def task_to_dict(task):
    """Convert to dictionary"""
    return {
        "id": task["id"],
        "title": task["title"],
        "description": task["description"],
        "priority": PRIORITY_NAMES.get(task["priority"], "UNKNOWN"),
        "status": task["status"],
        "project_id": task["project_id"],
        "assignee_id": task["assignee_id"],
        "created_by": task["created_by"],
        "created_at": task["created_at"].isoformat(),
        "due_date": (task["due_date"].isoformat()
                    if task["due_date"] else None),
        "completed_at": (task["completed_at"].isoformat()
                        if task["completed_at"] else None),
        "tags": task["tags"],
        "is_overdue": task_is_overdue(task),
    }


# models/project.py

def create_project(name, description, owner_id, project_id=None,
                   created_at=None, members=None, tasks=None,
                   is_active=True):
    """Create a project record - demonstrates collections, aggregation"""
    if not project_id:
        project_id = str(uuid.uuid4())

    members_set = set(members) if members else set()
    # Owner is always a member
    members_set.add(owner_id)

    return {
        "id": project_id,
        "name": name,
        "description": description,
        "owner_id": owner_id,
        "created_at": created_at or datetime.now(),
        "members": members_set,
        "tasks": tasks if tasks is not None else [],
        "is_active": is_active,
    }


def project_add_member(project, user_id):
    """Add member to project"""
    project["members"].add(user_id)


def project_remove_member(project, user_id):
    """Remove member from project"""
    if user_id == project["owner_id"]:
        raise ValueError("Cannot remove project owner")
    project["members"].discard(user_id)


def project_has_member(project, user_id):
    """Check if user is member"""
    return user_id in project["members"]


def project_to_dict(project):
    """Convert to dictionary"""
    return {
        "id": project["id"],
        "name": project["name"],
        "description": project["description"],
        "owner_id": project["owner_id"],
        "created_at": project["created_at"].isoformat(),
        "members": list(project["members"]),
        "task_count": len(project["tasks"]),
        "is_active": project["is_active"],
    }
```

## Part 2: Database Layer (Chapters 8-10)

```python
# database/db_manager.py
import json
from pathlib import Path
from typing import Dict, List, Optional, TypeVar
from collections import defaultdict

T = TypeVar('T')


def create_database(data_dir="data"):
    """Create an in-memory database with JSON persistence"""
    data_path = Path(data_dir)
    data_path.mkdir(exist_ok=True)

    db = {
        "data_dir": data_path,
        # In-memory storage
        "users": {},
        "tasks": {},
        "projects": {},
        # Indexes for fast lookup
        "user_by_email": {},       # email -> user_id
        "user_by_username": {},    # username -> user_id
        "tasks_by_project": defaultdict(list),
        "tasks_by_assignee": defaultdict(list),
    }

    load_all(db)
    return db


# User operations
def db_create_user(db, user):
    """Create new user"""
    # Check for duplicates
    if user["email"] in db["user_by_email"]:
        raise ValueError(f"Email {user['email']} already exists")

    if user["username"] in db["user_by_username"]:
        raise ValueError(f"Username {user['username']} already exists")

    db["users"][user["id"]] = user
    db["user_by_email"][user["email"]] = user["id"]
    db["user_by_username"][user["username"]] = user["id"]

    save_users(db)
    return user


def db_get_user(db, user_id):
    """Get user by ID"""
    return db["users"].get(user_id)


def db_get_user_by_email(db, email):
    """Get user by email"""
    user_id = db["user_by_email"].get(email)
    return db["users"].get(user_id) if user_id else None


def db_get_user_by_username(db, username):
    """Get user by username"""
    user_id = db["user_by_username"].get(username)
    return db["users"].get(user_id) if user_id else None


# Task operations
def db_create_task(db, task):
    """Create new task"""
    db["tasks"][task["id"]] = task
    db["tasks_by_project"][task["project_id"]].append(task["id"])

    if task["assignee_id"]:
        db["tasks_by_assignee"][task["assignee_id"]].append(task["id"])

    # Add to project
    if task["project_id"] in db["projects"]:
        db["projects"][task["project_id"]]["tasks"].append(task["id"])

    save_tasks(db)
    save_projects(db)
    return task


def db_get_task(db, task_id):
    """Get task by ID"""
    return db["tasks"].get(task_id)


def db_update_task(db, task):
    """Update existing task"""
    if task["id"] not in db["tasks"]:
        raise ValueError(f"Task {task['id']} not found")

    old_task = db["tasks"][task["id"]]

    # Update indexes if assignee changed
    if old_task["assignee_id"] != task["assignee_id"]:
        if old_task["assignee_id"]:
            db["tasks_by_assignee"][old_task["assignee_id"]].remove(task["id"])
        if task["assignee_id"]:
            db["tasks_by_assignee"][task["assignee_id"]].append(task["id"])

    db["tasks"][task["id"]] = task
    save_tasks(db)


def db_delete_task(db, task_id):
    """Delete task"""
    if task_id not in db["tasks"]:
        raise ValueError(f"Task {task_id} not found")

    task = db["tasks"][task_id]

    # Remove from indexes
    db["tasks_by_project"][task["project_id"]].remove(task_id)
    if task["assignee_id"]:
        db["tasks_by_assignee"][task["assignee_id"]].remove(task_id)

    # Remove from project
    if task["project_id"] in db["projects"]:
        db["projects"][task["project_id"]]["tasks"].remove(task_id)

    del db["tasks"][task_id]
    save_tasks(db)
    save_projects(db)


def db_get_tasks_by_project(db, project_id):
    """Get all tasks in project"""
    task_ids = db["tasks_by_project"].get(project_id, [])
    return [db["tasks"][tid] for tid in task_ids if tid in db["tasks"]]


def db_get_tasks_by_assignee(db, user_id):
    """Get all tasks assigned to user"""
    task_ids = db["tasks_by_assignee"].get(user_id, [])
    return [db["tasks"][tid] for tid in task_ids if tid in db["tasks"]]


# Project operations
def db_create_project(db, project):
    """Create new project"""
    db["projects"][project["id"]] = project

    # Add to user's projects
    if project["owner_id"] in db["users"]:
        db["users"][project["owner_id"]]["projects"].append(project["id"])

    save_projects(db)
    save_users(db)
    return project


def db_get_project(db, project_id):
    """Get project by ID"""
    return db["projects"].get(project_id)


def db_get_projects_by_user(db, user_id):
    """Get all projects user is member of"""
    return [p for p in db["projects"].values() if project_has_member(p, user_id)]


# Persistence
def save_users(db):
    """Save users to disk"""
    data = [user_to_dict(u) for u in db["users"].values()]
    (db["data_dir"] / "users.json").write_text(json.dumps(data, indent=2))


def save_tasks(db):
    """Save tasks to disk"""
    data = [task_to_dict(t) for t in db["tasks"].values()]
    (db["data_dir"] / "tasks.json").write_text(json.dumps(data, indent=2))


def save_projects(db):
    """Save projects to disk"""
    data = [project_to_dict(p) for p in db["projects"].values()]
    (db["data_dir"] / "projects.json").write_text(json.dumps(data, indent=2))


def load_all(db):
    """Load all data from disk"""
    projects_path = db["data_dir"] / "projects.json"
    if projects_path.exists():
        data = json.loads(projects_path.read_text())
        for item in data:
            project = {
                "id": item.get("id", ""),
                "name": item["name"],
                "description": item["description"],
                "owner_id": item.get("owner_id", ""),
                "created_at": item.get("created_at", ""),
                "members": set(item.get("members", [])),
                "tasks": item.get("tasks", []),
                "is_active": item.get("is_active", True),
            }
            db["projects"][project["id"]] = project
```

## Part 3: Business Logic (Chapters 6-7, 11)

```python
# services/auth_service.py

def create_auth_service(db):
    """Create an authentication service"""
    return {
        "db": db,
        "active_sessions": {},  # token -> user_id
    }


def auth_register(auth, username, email, password, full_name):
    """Register new user"""
    try:
        # Validate password strength
        if not _is_password_strong(password):
            raise ValueError(
                "Password must be at least 8 characters "
                "with letters and numbers"
            )

        # Create user
        user = create_user(
            user_id=str(uuid.uuid4()),
            username=username,
            email=email,
            password_hash=hash_password(password),
            full_name=full_name,
            created_at=datetime.now(),
        )

        return db_create_user(auth["db"], user)

    except ValueError as e:
        raise ValueError(f"Registration failed: {e}")


def auth_login(auth, username_or_email, password):
    """Login user, return session token"""
    try:
        # Find user
        user = db_get_user_by_username(auth["db"], username_or_email)
        if not user:
            user = db_get_user_by_email(auth["db"], username_or_email)

        if not user:
            raise ValueError("Invalid credentials")

        # Check password
        if not check_password(user, password):
            raise ValueError("Invalid credentials")

        if not user["is_active"]:
            raise ValueError("Account is inactive")

        # Create session
        token = str(uuid.uuid4())
        auth["active_sessions"][token] = user["id"]

        return token

    except Exception as e:
        raise ValueError(f"Login failed: {e}")


def auth_logout(auth, token):
    """Logout user"""
    if token in auth["active_sessions"]:
        del auth["active_sessions"][token]


def auth_get_current_user(auth, token):
    """Get user from session token"""
    user_id = auth["active_sessions"].get(token)
    return db_get_user(auth["db"], user_id) if user_id else None


def _is_password_strong(password):
    """Validate password strength"""
    if len(password) < 8:
        return False

    has_letter = any(c.isalpha() for c in password)
    has_number = any(c.isdigit() for c in password)

    return has_letter and has_number


# services/task_service.py

def create_task_service(db):
    """Create a task management service"""
    return {"db": db}


def svc_create_task(service, title, description, project_id,
                    created_by, priority=PRIORITY_MEDIUM,
                    assignee_id=None, due_date=None, tags=None):
    """Create new task"""
    db = service["db"]

    # Validate project exists
    project = db_get_project(db, project_id)
    if not project:
        raise ValueError(f"Project {project_id} not found")

    # Validate creator is member
    if not project_has_member(project, created_by):
        raise ValueError("User is not a project member")

    # Validate assignee if specified
    if assignee_id and not project_has_member(project, assignee_id):
        raise ValueError("Assignee is not a project member")

    task = create_task(
        task_id=str(uuid.uuid4()),
        title=title,
        description=description,
        priority=priority,
        status=STATUS_TODO,
        project_id=project_id,
        assignee_id=assignee_id,
        created_by=created_by,
        created_at=datetime.now(),
        due_date=due_date,
        tags=tags or [],
    )

    return db_create_task(db, task)


def svc_get_user_tasks(service, user_id, status=None, priority=None):
    """Get user's tasks with optional filters"""
    tasks = db_get_tasks_by_assignee(service["db"], user_id)

    # Apply filters
    if status:
        tasks = [t for t in tasks if t["status"] == status]

    if priority:
        tasks = [t for t in tasks if t["priority"] == priority]

    # Sort by priority and due date
    tasks.sort(key=lambda t: (
        -t["priority"],
        t["due_date"] or datetime.max,
    ))

    return tasks


def svc_get_overdue_tasks(service, user_id):
    """Get user's overdue tasks"""
    tasks = db_get_tasks_by_assignee(service["db"], user_id)
    return [t for t in tasks if task_is_overdue(t)]


def svc_update_task_status(service, task_id, status, user_id):
    """Update task status"""
    db = service["db"]
    task = db_get_task(db, task_id)
    if not task:
        raise ValueError(f"Task {task_id} not found")

    # Check permission
    project = db_get_project(db, task["project_id"])
    if not project_has_member(project, user_id):
        raise ValueError("User does not have permission")

    task["status"] = status

    if status == STATUS_DONE:
        task_complete(task)

    db_update_task(db, task)


def svc_assign_task(service, task_id, assignee_id, assigned_by):
    """Assign task to user"""
    db = service["db"]
    task = db_get_task(db, task_id)
    if not task:
        raise ValueError(f"Task {task_id} not found")

    project = db_get_project(db, task["project_id"])

    # Check permissions
    if not project_has_member(project, assigned_by):
        raise ValueError("User does not have permission")

    if not project_has_member(project, assignee_id):
        raise ValueError("Assignee is not a project member")

    task["assignee_id"] = assignee_id
    db_update_task(db, task)


def svc_get_project_statistics(service, project_id):
    """Get project statistics"""
    tasks = db_get_tasks_by_project(service["db"], project_id)

    if not tasks:
        return {
            "total_tasks": 0,
            "by_status": {},
            "by_priority": {},
            "completion_rate": 0,
            "overdue_count": 0,
        }

    # Count by status
    all_statuses = [STATUS_TODO, STATUS_IN_PROGRESS, STATUS_REVIEW,
                    STATUS_DONE, STATUS_ARCHIVED]
    by_status = {}
    for s in all_statuses:
        by_status[s] = sum(1 for t in tasks if t["status"] == s)

    # Count by priority
    all_priorities = [PRIORITY_LOW, PRIORITY_MEDIUM,
                      PRIORITY_HIGH, PRIORITY_URGENT]
    by_priority = {}
    for p in all_priorities:
        by_priority[PRIORITY_NAMES[p]] = sum(
            1 for t in tasks if t["priority"] == p
        )

    # Calculate metrics
    completed = sum(1 for t in tasks if t["status"] == STATUS_DONE)
    completion_rate = (completed / len(tasks)) * 100
    overdue = sum(1 for t in tasks if task_is_overdue(t))

    return {
        "total_tasks": len(tasks),
        "by_status": by_status,
        "by_priority": by_priority,
        "completion_rate": round(completion_rate, 1),
        "overdue_count": overdue,
    }
```

## Part 4: Error Handling & Logging (Chapter 11)

```python
# utils/logger.py
import logging
from datetime import datetime
from pathlib import Path


def create_logger(log_dir="logs"):
    """Create an application logger"""
    log_path = Path(log_dir)
    log_path.mkdir(exist_ok=True)

    # Configure logger
    logger = logging.getLogger("TaskManager")
    logger.setLevel(logging.DEBUG)

    # File handler
    log_file = log_path / f"app_{datetime.now():%Y%m%d}.log"
    file_handler = logging.FileHandler(log_file)
    file_handler.setLevel(logging.DEBUG)

    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)

    # Formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger
```

## Part 5: Testing (Chapter 12)

```python
# tests/test_models.py
import pytest
from datetime import datetime, timedelta


def test_user_creation():
    """Test user creation and validation"""
    user = create_user(
        username="testuser",
        email="test@example.com",
        password_hash=hash_password("password123"),
        full_name="Test User",
        created_at=datetime.now(),
    )

    assert user["id"]  # Should generate UUID
    assert user["username"] == "testuser"


def test_user_invalid_email():
    """Test user validation"""
    with pytest.raises(ValueError, match="Invalid email"):
        create_user(
            username="testuser",
            email="invalid",
            password_hash="hash",
            full_name="Test",
            created_at=datetime.now(),
        )


def test_task_overdue():
    """Test task overdue detection"""
    past_date = datetime.now() - timedelta(days=1)

    task = create_task(
        title="Test Task",
        description="Test",
        priority=PRIORITY_MEDIUM,
        status=STATUS_TODO,
        project_id="proj1",
        assignee_id=None,
        created_by="user1",
        created_at=datetime.now(),
        due_date=past_date,
    )

    assert task_is_overdue(task) is True


def test_task_not_overdue_when_completed():
    """Test completed tasks are never overdue"""
    past_date = datetime.now() - timedelta(days=1)

    task = create_task(
        title="Test Task",
        description="Test",
        priority=PRIORITY_MEDIUM,
        status=STATUS_DONE,
        project_id="proj1",
        assignee_id=None,
        created_by="user1",
        created_at=datetime.now(),
        due_date=past_date,
    )

    assert task_is_overdue(task) is False


# tests/test_services.py
def test_auth_service_register():
    """Test user registration"""
    db = create_database("test_data")
    auth = create_auth_service(db)

    user = auth_register(
        auth,
        username="newuser",
        email="new@example.com",
        password="secure123",
        full_name="New User",
    )

    assert user["username"] == "newuser"
    assert user["id"] in db["users"]


def test_auth_service_login():
    """Test user login"""
    db = create_database("test_data")
    auth = create_auth_service(db)

    # Register user
    auth_register(auth, "testuser", "test@example.com",
                  "password123", "Test")

    # Login
    token = auth_login(auth, "testuser", "password123")

    assert token
    assert token in auth["active_sessions"]


def test_auth_service_invalid_login():
    """Test login with invalid credentials"""
    db = create_database("test_data")
    auth = create_auth_service(db)

    with pytest.raises(ValueError):
        auth_login(auth, "nonexistent", "wrongpass")
```

## Part 6: Main Application (Chapters 5, 11)

```python
# main.py

def run_task_manager():
    """Main application - demonstrates loops, conditionals, error handling"""
    logger = create_logger()
    db = create_database()
    auth = create_auth_service(db)
    task_svc = create_task_service(db)

    current_token = None

    logger.info("Task Manager started")

    while True:
        try:
            if not current_token:
                # Not logged in
                print("\n=== Task Manager ===")
                print("1. Register")
                print("2. Login")
                print("3. Exit")

                choice = input("\nChoice: ").strip()

                if choice == "1":
                    # Register
                    username = input("Username: ")
                    email = input("Email: ")
                    password = input("Password: ")
                    full_name = input("Full Name: ")

                    user = auth_register(auth, username, email,
                                        password, full_name)
                    print(f"✓ Registered successfully: {user['username']}")
                    logger.info(f"New user registered: {username}")

                elif choice == "2":
                    # Login
                    username = input("Username/Email: ")
                    password = input("Password: ")

                    current_token = auth_login(auth, username, password)
                    user = auth_get_current_user(auth, current_token)
                    print(f"✓ Welcome, {user['full_name']}!")
                    logger.info(f"User logged in: {user['username']}")

                elif choice == "3":
                    logger.info("Application shutdown")
                    break

            else:
                # Logged in
                user = auth_get_current_user(auth, current_token)

                # Get user tasks
                tasks = svc_get_user_tasks(task_svc, user["id"])
                overdue = svc_get_overdue_tasks(task_svc, user["id"])

                print(f"\n=== Dashboard - {user['full_name']} ===")
                print(f"Tasks: {len(tasks)} | Overdue: {len(overdue)}")
                print("\n1. View My Tasks")
                print("2. Create Task")
                print("3. View Projects")
                print("4. Create Project")
                print("5. Logout")

                choice = input("\nChoice: ").strip()

                if choice == "1":
                    # View tasks
                    if tasks:
                        print("\nYour Tasks:")
                        for i, task in enumerate(tasks, 1):
                            status_icon = ("✓" if task["status"] == STATUS_DONE
                                          else "○")
                            overdue_flag = (" [OVERDUE]"
                                          if task_is_overdue(task) else "")
                            priority_name = PRIORITY_NAMES.get(
                                task["priority"], "?"
                            )
                            print(f"{i}. {status_icon} [{priority_name}] "
                                  f"{task['title']}{overdue_flag}")
                    else:
                        print("\nNo tasks assigned")

                elif choice == "5":
                    auth_logout(auth, current_token)
                    current_token = None
                    print("✓ Logged out")
                    logger.info(f"User logged out: {user['username']}")

        except ValueError as e:
            print(f"✗ Error: {e}")
            logger.error(f"Error: {e}")

        except Exception as e:
            print(f"✗ Unexpected error: {e}")
            logger.error(f"Unexpected error: {e}", exc_info=True)

if __name__ == "__main__":
    run_task_manager()
```

## Summary: Concepts Demonstrated

This capstone project integrates **every Python fundamental** from Chapters 1-12:

**Chapter 1-2: Basics & Variables**
- Variables, type hints, string operations
- Numbers, booleans, type conversion

**Chapter 3: Computing Fundamentals**
- Algorithms, logic, problem-solving
- Memory concepts, data representation

**Chapter 4: Comparisons & Conditionals**
- If/elif/else statements
- Boolean logic, comparison operators

**Chapter 5: Loops**
- For loops, while loops
- Loop control (break, continue)
- Iteration patterns

**Chapter 6: Functions**
- Function definition and calling
- Parameters, return values
- Docstrings, type hints

**Chapter 7: Scope**
- Local vs global scope
- Encapsulation, closures
- Module organization

**Chapter 8: Lists**
- List operations, comprehensions
- Sorting, filtering, mapping
- List as data structure

**Chapter 9: Dictionaries**
- Dictionary operations
- Key-value storage
- Nested structures

**Chapter 10: Sets**
- Set operations (union, intersection)
- Uniqueness, membership testing
- Set comprehensions

**Chapter 11: Error Handling**
- Try/except blocks
- Custom exceptions
- Error propagation, logging

**Chapter 12: Testing**
- Unit tests with pytest
- Test fixtures, assertions
- Test-driven development

**Chapter 13: Integration**
- Complete application architecture
- Production-ready code
- Software engineering best practices

## Next Steps

You've completed Python Basics! Continue your journey:
- **Advanced Python**: Decorators, generators, context managers
- **Web Development**: Django, Flask, FastAPI
- **Data Science**: Pandas, NumPy, Matplotlib
- **Machine Learning**: Scikit-learn, TensorFlow
- **Automation**: Selenium, BeautifulSoup

🎉 **Congratulations on mastering Python fundamentals!**
