---
id: "178-python-mastery-capstone"
title: "Python Mastery: Final Capstone Project"
chapterId: ch13-practice
order: 15
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
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional
import uuid
import hashlib

@dataclass
class User:
    """User model - demonstrates dataclasses, type hints, validation"""
    id: str
    username: str
    email: str
    password_hash: str
    full_name: str
    created_at: datetime
    is_active: bool = True
    projects: List[str] = field(default_factory=list)
    
    def __post_init__(self):
        """Validation after initialization"""
        if not self.id:
            self.id = str(uuid.uuid4())
        
        if not self.username or len(self.username) < 3:
            raise ValueError("Username must be at least 3 characters")
        
        if '@' not in self.email:
            raise ValueError("Invalid email address")
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash password using SHA-256"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def check_password(self, password: str) -> bool:
        """Verify password"""
        return self.password_hash == User.hash_password(password)
    
    def to_dict(self) -> dict:
        """Convert to dictionary (excluding password)"""
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "full_name": self.full_name,
            "created_at": self.created_at.isoformat(),
            "is_active": self.is_active,
            "projects": self.projects
        }

# models/task.py
from enum import Enum

class TaskPriority(Enum):
    """Task priority levels"""
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    URGENT = 4

class TaskStatus(Enum):
    """Task status"""
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    REVIEW = "review"
    DONE = "done"
    ARCHIVED = "archived"

@dataclass
class Task:
    """Task model - demonstrates enums, dates, complex logic"""
    id: str
    title: str
    description: str
    priority: TaskPriority
    status: TaskStatus
    project_id: str
    assignee_id: Optional[str]
    created_by: str
    created_at: datetime
    due_date: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    tags: List[str] = field(default_factory=list)
    subtasks: List[str] = field(default_factory=list)
    attachments: List[str] = field(default_factory=list)
    
    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())
        
        if not self.title:
            raise ValueError("Task title is required")
    
    def is_overdue(self) -> bool:
        """Check if task is overdue"""
        if not self.due_date or self.status == TaskStatus.DONE:
            return False
        return datetime.now() > self.due_date
    
    def days_until_due(self) -> Optional[int]:
        """Calculate days until due date"""
        if not self.due_date:
            return None
        delta = self.due_date - datetime.now()
        return delta.days
    
    def complete(self):
        """Mark task as completed"""
        self.status = TaskStatus.DONE
        self.completed_at = datetime.now()
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "priority": self.priority.name,
            "status": self.status.value,
            "project_id": self.project_id,
            "assignee_id": self.assignee_id,
            "created_by": self.created_by,
            "created_at": self.created_at.isoformat(),
            "due_date": self.due_date.isoformat() if self.due_date else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "tags": self.tags,
            "is_overdue": self.is_overdue()
        }

# models/project.py
@dataclass
class Project:
    """Project model - demonstrates collections, aggregation"""
    id: str
    name: str
    description: str
    owner_id: str
    created_at: datetime
    members: Set[str] = field(default_factory=set)
    tasks: List[str] = field(default_factory=list)
    is_active: bool = True
    
    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())
        
        # Owner is always a member
        self.members.add(self.owner_id)
    
    def add_member(self, user_id: str):
        """Add member to project"""
        self.members.add(user_id)
    
    def remove_member(self, user_id: str):
        """Remove member from project"""
        if user_id == self.owner_id:
            raise ValueError("Cannot remove project owner")
        self.members.discard(user_id)
    
    def has_member(self, user_id: str) -> bool:
        """Check if user is member"""
        return user_id in self.members
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "owner_id": self.owner_id,
            "created_at": self.created_at.isoformat(),
            "members": list(self.members),
            "task_count": len(self.tasks),
            "is_active": self.is_active
        }
```

## Part 2: Database Layer (Chapters 8-10)

```python
# database/db_manager.py
import json
from pathlib import Path
from typing import Dict, List, Optional, Type, TypeVar
from collections import defaultdict

T = TypeVar('T')

class DatabaseManager:
    """In-memory database with JSON persistence"""
    
    def __init__(self, data_dir: str = "data"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(exist_ok=True)
        
        # In-memory storage
        self.users: Dict[str, User] = {}
        self.tasks: Dict[str, Task] = {}
        self.projects: Dict[str, Project] = {}
        
        # Indexes for fast lookup
        self.user_by_email: Dict[str, str] = {}  # email -> user_id
        self.user_by_username: Dict[str, str] = {}  # username -> user_id
        self.tasks_by_project: Dict[str, List[str]] = defaultdict(list)
        self.tasks_by_assignee: Dict[str, List[str]] = defaultdict(list)
        
        self.load_all()
    
    # User operations
    def create_user(self, user: User) -> User:
        """Create new user"""
        # Check for duplicates
        if user.email in self.user_by_email:
            raise ValueError(f"Email {user.email} already exists")
        
        if user.username in self.user_by_username:
            raise ValueError(f"Username {user.username} already exists")
        
        self.users[user.id] = user
        self.user_by_email[user.email] = user.id
        self.user_by_username[user.username] = user.id
        
        self.save_users()
        return user
    
    def get_user(self, user_id: str) -> Optional[User]:
        """Get user by ID"""
        return self.users.get(user_id)
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        user_id = self.user_by_email.get(email)
        return self.users.get(user_id) if user_id else None
    
    def get_user_by_username(self, username: str) -> Optional[User]:
        """Get user by username"""
        user_id = self.user_by_username.get(username)
        return self.users.get(user_id) if user_id else None
    
    # Task operations
    def create_task(self, task: Task) -> Task:
        """Create new task"""
        self.tasks[task.id] = task
        self.tasks_by_project[task.project_id].append(task.id)
        
        if task.assignee_id:
            self.tasks_by_assignee[task.assignee_id].append(task.id)
        
        # Add to project
        if task.project_id in self.projects:
            self.projects[task.project_id].tasks.append(task.id)
        
        self.save_tasks()
        self.save_projects()
        return task
    
    def get_task(self, task_id: str) -> Optional[Task]:
        """Get task by ID"""
        return self.tasks.get(task_id)
    
    def update_task(self, task: Task):
        """Update existing task"""
        if task.id not in self.tasks:
            raise ValueError(f"Task {task.id} not found")
        
        old_task = self.tasks[task.id]
        
        # Update indexes if assignee changed
        if old_task.assignee_id != task.assignee_id:
            if old_task.assignee_id:
                self.tasks_by_assignee[old_task.assignee_id].remove(task.id)
            if task.assignee_id:
                self.tasks_by_assignee[task.assignee_id].append(task.id)
        
        self.tasks[task.id] = task
        self.save_tasks()
    
    def delete_task(self, task_id: str):
        """Delete task"""
        if task_id not in self.tasks:
            raise ValueError(f"Task {task_id} not found")
        
        task = self.tasks[task_id]
        
        # Remove from indexes
        self.tasks_by_project[task.project_id].remove(task_id)
        if task.assignee_id:
            self.tasks_by_assignee[task.assignee_id].remove(task_id)
        
        # Remove from project
        if task.project_id in self.projects:
            self.projects[task.project_id].tasks.remove(task_id)
        
        del self.tasks[task_id]
        self.save_tasks()
        self.save_projects()
    
    def get_tasks_by_project(self, project_id: str) -> List[Task]:
        """Get all tasks in project"""
        task_ids = self.tasks_by_project.get(project_id, [])
        return [self.tasks[tid] for tid in task_ids if tid in self.tasks]
    
    def get_tasks_by_assignee(self, user_id: str) -> List[Task]:
        """Get all tasks assigned to user"""
        task_ids = self.tasks_by_assignee.get(user_id, [])
        return [self.tasks[tid] for tid in task_ids if tid in self.tasks]
    
    # Project operations
    def create_project(self, project: Project) -> Project:
        """Create new project"""
        self.projects[project.id] = project
        
        # Add to user's projects
        if project.owner_id in self.users:
            self.users[project.owner_id].projects.append(project.id)
        
        self.save_projects()
        self.save_users()
        return project
    
    def get_project(self, project_id: str) -> Optional[Project]:
        """Get project by ID"""
        return self.projects.get(project_id)
    
    def get_projects_by_user(self, user_id: str) -> List[Project]:
        """Get all projects user is member of"""
        return [p for p in self.projects.values() if p.has_member(user_id)]
    
    # Persistence
    def save_users(self):
        """Save users to disk"""
        data = [u.to_dict() for u in self.users.values()]
        (self.data_dir / "users.json").write_text(json.dumps(data, indent=2))
    
    def save_tasks(self):
        """Save tasks to disk"""
        data = [t.to_dict() for t in self.tasks.values()]
        (self.data_dir / "tasks.json").write_text(json.dumps(data, indent=2))
    
    def save_projects(self):
        """Save projects to disk"""
        data = [p.to_dict() for p in self.projects.values()]
        (self.data_dir / "projects.json").write_text(json.dumps(data, indent=2))
    
    def load_all(self):
        """Load all data from disk"""
        # Implementation for loading from JSON files
        # (Similar to previous examples, converts JSON back to objects)
        pass
```

## Part 3: Business Logic (Chapters 6-7, 11)

```python
# services/auth_service.py

class AuthenticationError(Exception):
    """Authentication error"""
    pass

class AuthService:
    """Authentication service - demonstrates functions, error handling"""
    
    def __init__(self, db: DatabaseManager):
        self.db = db
        self.active_sessions: Dict[str, str] = {}  # token -> user_id
    
    def register(self, username: str, email: str, password: str, full_name: str) -> User:
        """Register new user"""
        try:
            # Validate password strength
            if not self._is_password_strong(password):
                raise ValueError("Password must be at least 8 characters with letters and numbers")
            
            # Create user
            user = User(
                id=str(uuid.uuid4()),
                username=username,
                email=email,
                password_hash=User.hash_password(password),
                full_name=full_name,
                created_at=datetime.now()
            )
            
            return self.db.create_user(user)
        
        except ValueError as e:
            raise AuthenticationError(f"Registration failed: {e}")
    
    def login(self, username_or_email: str, password: str) -> str:
        """Login user, return session token"""
        try:
            # Find user
            user = self.db.get_user_by_username(username_or_email)
            if not user:
                user = self.db.get_user_by_email(username_or_email)
            
            if not user:
                raise AuthenticationError("Invalid credentials")
            
            # Check password
            if not user.check_password(password):
                raise AuthenticationError("Invalid credentials")
            
            if not user.is_active:
                raise AuthenticationError("Account is inactive")
            
            # Create session
            token = str(uuid.uuid4())
            self.active_sessions[token] = user.id
            
            return token
        
        except Exception as e:
            raise AuthenticationError(f"Login failed: {e}")
    
    def logout(self, token: str):
        """Logout user"""
        if token in self.active_sessions:
            del self.active_sessions[token]
    
    def get_current_user(self, token: str) -> Optional[User]:
        """Get user from session token"""
        user_id = self.active_sessions.get(token)
        return self.db.get_user(user_id) if user_id else None
    
    def _is_password_strong(self, password: str) -> bool:
        """Validate password strength"""
        if len(password) < 8:
            return False
        
        has_letter = any(c.isalpha() for c in password)
        has_number = any(c.isdigit() for c in password)
        
        return has_letter and has_number

# services/task_service.py

class TaskService:
    """Task management service"""
    
    def __init__(self, db: DatabaseManager):
        self.db = db
    
    def create_task(self, title: str, description: str, project_id: str,
                   created_by: str, priority: TaskPriority = TaskPriority.MEDIUM,
                   assignee_id: Optional[str] = None,
                   due_date: Optional[datetime] = None,
                   tags: List[str] = None) -> Task:
        """Create new task"""
        # Validate project exists
        project = self.db.get_project(project_id)
        if not project:
            raise ValueError(f"Project {project_id} not found")
        
        # Validate creator is member
        if not project.has_member(created_by):
            raise ValueError("User is not a project member")
        
        # Validate assignee if specified
        if assignee_id and not project.has_member(assignee_id):
            raise ValueError("Assignee is not a project member")
        
        task = Task(
            id=str(uuid.uuid4()),
            title=title,
            description=description,
            priority=priority,
            status=TaskStatus.TODO,
            project_id=project_id,
            assignee_id=assignee_id,
            created_by=created_by,
            created_at=datetime.now(),
            due_date=due_date,
            tags=tags or []
        )
        
        return self.db.create_task(task)
    
    def get_user_tasks(self, user_id: str, status: Optional[TaskStatus] = None,
                      priority: Optional[TaskPriority] = None) -> List[Task]:
        """Get user's tasks with optional filters"""
        tasks = self.db.get_tasks_by_assignee(user_id)
        
        # Apply filters
        if status:
            tasks = [t for t in tasks if t.status == status]
        
        if priority:
            tasks = [t for t in tasks if t.priority == priority]
        
        # Sort by priority and due date
        tasks.sort(key=lambda t: (
            -t.priority.value,
            t.due_date or datetime.max
        ))
        
        return tasks
    
    def get_overdue_tasks(self, user_id: str) -> List[Task]:
        """Get user's overdue tasks"""
        tasks = self.db.get_tasks_by_assignee(user_id)
        return [t for t in tasks if t.is_overdue()]
    
    def update_task_status(self, task_id: str, status: TaskStatus, user_id: str):
        """Update task status"""
        task = self.db.get_task(task_id)
        if not task:
            raise ValueError(f"Task {task_id} not found")
        
        # Check permission
        project = self.db.get_project(task.project_id)
        if not project.has_member(user_id):
            raise ValueError("User does not have permission")
        
        task.status = status
        
        if status == TaskStatus.DONE:
            task.complete()
        
        self.db.update_task(task)
    
    def assign_task(self, task_id: str, assignee_id: str, assigned_by: str):
        """Assign task to user"""
        task = self.db.get_task(task_id)
        if not task:
            raise ValueError(f"Task {task_id} not found")
        
        project = self.db.get_project(task.project_id)
        
        # Check permissions
        if not project.has_member(assigned_by):
            raise ValueError("User does not have permission")
        
        if not project.has_member(assignee_id):
            raise ValueError("Assignee is not a project member")
        
        task.assignee_id = assignee_id
        self.db.update_task(task)
    
    def get_project_statistics(self, project_id: str) -> Dict:
        """Get project statistics"""
        tasks = self.db.get_tasks_by_project(project_id)
        
        if not tasks:
            return {
                "total_tasks": 0,
                "by_status": {},
                "by_priority": {},
                "completion_rate": 0,
                "overdue_count": 0
            }
        
        # Count by status
        by_status = {}
        for status in TaskStatus:
            by_status[status.value] = sum(1 for t in tasks if t.status == status)
        
        # Count by priority
        by_priority = {}
        for priority in TaskPriority:
            by_priority[priority.name] = sum(1 for t in tasks if t.priority == priority)
        
        # Calculate metrics
        completed = sum(1 for t in tasks if t.status == TaskStatus.DONE)
        completion_rate = (completed / len(tasks)) * 100
        overdue = sum(1 for t in tasks if t.is_overdue())
        
        return {
            "total_tasks": len(tasks),
            "by_status": by_status,
            "by_priority": by_priority,
            "completion_rate": round(completion_rate, 1),
            "overdue_count": overdue
        }
```

## Part 4: Error Handling & Logging (Chapter 11)

```python
# utils/logger.py
import logging
from datetime import datetime
from pathlib import Path

class Logger:
    """Application logger"""
    
    def __init__(self, log_dir: str = "logs"):
        self.log_dir = Path(log_dir)
        self.log_dir.mkdir(exist_ok=True)
        
        # Configure logger
        self.logger = logging.getLogger("TaskManager")
        self.logger.setLevel(logging.DEBUG)
        
        # File handler
        log_file = self.log_dir / f"app_{datetime.now():%Y%m%d}.log"
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
        
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)
    
    def info(self, message: str):
        self.logger.info(message)
    
    def error(self, message: str, exc_info=None):
        self.logger.error(message, exc_info=exc_info)
    
    def warning(self, message: str):
        self.logger.warning(message)
    
    def debug(self, message: str):
        self.logger.debug(message)
```

## Part 5: Testing (Chapter 12)

```python
# tests/test_models.py
import pytest
from datetime import datetime, timedelta

def test_user_creation():
    """Test user creation and validation"""
    user = User(
        id="",
        username="testuser",
        email="test@example.com",
        password_hash=User.hash_password("password123"),
        full_name="Test User",
        created_at=datetime.now()
    )
    
    assert user.id  # Should generate UUID
    assert user.username == "testuser"

def test_user_invalid_email():
    """Test user validation"""
    with pytest.raises(ValueError, match="Invalid email"):
        User(
            id="",
            username="testuser",
            email="invalid",
            password_hash="hash",
            full_name="Test",
            created_at=datetime.now()
        )

def test_task_overdue():
    """Test task overdue detection"""
    past_date = datetime.now() - timedelta(days=1)
    
    task = Task(
        id="",
        title="Test Task",
        description="Test",
        priority=TaskPriority.MEDIUM,
        status=TaskStatus.TODO,
        project_id="proj1",
        assignee_id=None,
        created_by="user1",
        created_at=datetime.now(),
        due_date=past_date
    )
    
    assert task.is_overdue() is True

def test_task_not_overdue_when_completed():
    """Test completed tasks are never overdue"""
    past_date = datetime.now() - timedelta(days=1)
    
    task = Task(
        id="",
        title="Test Task",
        description="Test",
        priority=TaskPriority.MEDIUM,
        status=TaskStatus.DONE,
        project_id="proj1",
        assignee_id=None,
        created_by="user1",
        created_at=datetime.now(),
        due_date=past_date
    )
    
    assert task.is_overdue() is False

# tests/test_services.py
def test_auth_service_register():
    """Test user registration"""
    db = DatabaseManager("test_data")
    auth = AuthService(db)
    
    user = auth.register(
        username="newuser",
        email="new@example.com",
        password="secure123",
        full_name="New User"
    )
    
    assert user.username == "newuser"
    assert user.id in db.users

def test_auth_service_login():
    """Test user login"""
    db = DatabaseManager("test_data")
    auth = AuthService(db)
    
    # Register user
    auth.register("testuser", "test@example.com", "password123", "Test")
    
    # Login
    token = auth.login("testuser", "password123")
    
    assert token
    assert token in auth.active_sessions

def test_auth_service_invalid_login():
    """Test login with invalid credentials"""
    db = DatabaseManager("test_data")
    auth = AuthService(db)
    
    with pytest.raises(AuthenticationError):
        auth.login("nonexistent", "wrongpass")
```

## Part 6: Main Application (Chapters 5, 11)

```python
# main.py

def run_task_manager():
    """Main application - demonstrates loops, conditionals, error handling"""
    logger = Logger()
    db = DatabaseManager()
    auth_service = AuthService(db)
    task_service = TaskService(db)
    
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
                    
                    user = auth_service.register(username, email, password, full_name)
                    print(f"✓ Registered successfully: {user.username}")
                    logger.info(f"New user registered: {username}")
                
                elif choice == "2":
                    # Login
                    username = input("Username/Email: ")
                    password = input("Password: ")
                    
                    current_token = auth_service.login(username, password)
                    user = auth_service.get_current_user(current_token)
                    print(f"✓ Welcome, {user.full_name}!")
                    logger.info(f"User logged in: {user.username}")
                
                elif choice == "3":
                    logger.info("Application shutdown")
                    break
            
            else:
                # Logged in
                user = auth_service.get_current_user(current_token)
                
                # Get user tasks
                tasks = task_service.get_user_tasks(user.id)
                overdue = task_service.get_overdue_tasks(user.id)
                
                print(f"\n=== Dashboard - {user.full_name} ===")
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
                            status_icon = "✓" if task.status == TaskStatus.DONE else "○"
                            overdue_flag = " [OVERDUE]" if task.is_overdue() else ""
                            print(f"{i}. {status_icon} [{task.priority.name}] {task.title}{overdue_flag}")
                    else:
                        print("\nNo tasks assigned")
                
                elif choice == "5":
                    auth_service.logout(current_token)
                    current_token = None
                    print("✓ Logged out")
                    logger.info(f"User logged out: {user.username}")
        
        except AuthenticationError as e:
            print(f"✗ Authentication error: {e}")
            logger.error(f"Auth error: {e}")
        
        except ValueError as e:
            print(f"✗ Error: {e}")
            logger.error(f"Validation error: {e}")
        
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
