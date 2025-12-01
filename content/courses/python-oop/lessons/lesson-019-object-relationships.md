---
id: object-relationships
title: Modeling Object Relationships
chapterId: ch2-classes-objects
order: 19
duration: 15
objectives:
  - Understand different types of object relationships
  - Learn one-to-one, one-to-many, and many-to-many relationships
  - Master relationship implementation patterns
---

# Modeling Object Relationships

Objects rarely exist in isolation. Understanding how to model relationships between objects is key to good system design.

## Types of Relationships

### 1. One-to-One (1:1)

Each object of Class A is related to exactly one object of Class B, and vice versa.

```python
class Person:
    def __init__(self, name):
        self.name = name
        self.passport = None  # One person has one passport
    
    def issue_passport(self, passport_number):
        self.passport = Passport(passport_number, self)

class Passport:
    def __init__(self, number, owner: Person):
        self.number = number
        self.owner = owner  # One passport belongs to one person

# One-to-one relationship
person = Person("Alice")
person.issue_passport("A12345678")

print(person.passport.number)  # "A12345678"
print(person.passport.owner.name)  # "Alice"
```

### 2. One-to-Many (1:N)

One object of Class A can be related to many objects of Class B.

```python
class Author:
    def __init__(self, name):
        self.name = name
        self.books = []  # One author has many books
    
    def write_book(self, title):
        book = Book(title, self)
        self.books.append(book)
        return book

class Book:
    def __init__(self, title, author: Author):
        self.title = title
        self.author = author  # Many books have one author

# One-to-many relationship
author = Author("J.K. Rowling")
book1 = author.write_book("Harry Potter 1")
book2 = author.write_book("Harry Potter 2")
book3 = author.write_book("Harry Potter 3")

print(f"{author.name} wrote {len(author.books)} books")
for book in author.books:
    print(f"  - {book.title}")
```

### 3. Many-to-Many (M:N)

Many objects of Class A can be related to many objects of Class B.

```python
class Student:
    def __init__(self, name):
        self.name = name
        self.courses = []  # Student enrolled in many courses
    
    def enroll(self, course):
        if course not in self.courses:
            self.courses.append(course)
            course.add_student(self)

class Course:
    def __init__(self, name):
        self.name = name
        self.students = []  # Course has many students
    
    def add_student(self, student):
        if student not in self.students:
            self.students.append(student)

# Many-to-many relationship
alice = Student("Alice")
bob = Student("Bob")

python = Course("Python")
java = Course("Java")

# Students can take multiple courses
alice.enroll(python)
alice.enroll(java)
bob.enroll(python)

print(f"{python.name} has {len(python.students)} students")
print(f"{alice.name} is taking {len(alice.courses)} courses")
```

## Bidirectional Relationships

### Maintaining Both Sides

```python
class Department:
    def __init__(self, name):
        self.name = name
        self.employees = []
    
    def hire(self, employee):
        if employee not in self.employees:
            self.employees.append(employee)
            employee.department = self  # Maintain both sides

class Employee:
    def __init__(self, name):
        self.name = name
        self.department = None
    
    def join_department(self, department):
        if self.department:
            self.department.employees.remove(self)
        department.hire(self)

# Relationship maintained from both sides
eng_dept = Department("Engineering")
alice = Employee("Alice")
alice.join_department(eng_dept)

print(alice.department.name)  # "Engineering"
print(eng_dept.employees[0].name)  # "Alice"
```

## Association with Additional Data

### Join Table Pattern

```python
class Enrollment:
    """Represents student enrollment in a course with additional data."""
    def __init__(self, student, course, grade=None):
        self.student = student
        self.course = course
        self.grade = grade
        self.attendance_count = 0
    
    def record_attendance(self):
        self.attendance_count += 1

class Student:
    def __init__(self, name):
        self.name = name
        self.enrollments = []
    
    def enroll(self, course, grade=None):
        enrollment = Enrollment(self, course, grade)
        self.enrollments.append(enrollment)
        course.enrollments.append(enrollment)
        return enrollment
    
    def get_courses(self):
        return [e.course for e in self.enrollments]

class Course:
    def __init__(self, name):
        self.name = name
        self.enrollments = []
    
    def get_students(self):
        return [e.student for e in self.enrollments]

# Enrollment with additional data
alice = Student("Alice")
python = Course("Python OOP")

enrollment = alice.enroll(python)
enrollment.grade = "A"
enrollment.record_attendance()
enrollment.record_attendance()

print(f"{alice.name} has grade {enrollment.grade} in {python.name}")
print(f"Attended {enrollment.attendance_count} classes")
```

## Aggregation vs Composition

### Aggregation (Weak "Has-A")

Objects can exist independently.

```python
class Classroom:
    def __init__(self, room_number):
        self.room_number = room_number
        self.students = []  # Aggregation
    
    def add_student(self, student):
        self.students.append(student)

class Student:
    def __init__(self, name):
        self.name = name

# Students exist independently of classroom
alice = Student("Alice")
bob = Student("Bob")

room_101 = Classroom("101")
room_101.add_student(alice)
room_101.add_student(bob)

# Students can move to different classroom
room_102 = Classroom("102")
room_102.add_student(alice)  # Alice can be in multiple rooms

del room_101  # Classroom deleted, students still exist
```

### Composition (Strong "Has-A")

Child objects cannot exist without parent.

```python
class House:
    def __init__(self, address):
        self.address = address
        self.rooms = [
            Room("Living Room", self),
            Room("Bedroom", self),
            Room("Kitchen", self)
        ]  # Rooms belong to house

class Room:
    def __init__(self, name, house: House):
        self.name = name
        self.house = house  # Room cannot exist without house
    
    def __del__(self):
        print(f"{self.name} destroyed")

house = House("123 Main St")
# If house is deleted, rooms are deleted too
```

## Parent-Child Relationships

```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.parent = None
        self.children = []
    
    def add_child(self, child_node):
        child_node.parent = self
        self.children.append(child_node)
    
    def get_path_to_root(self):
        """Get path from this node to root."""
        path = [self.value]
        current = self.parent
        while current:
            path.append(current.value)
            current = current.parent
        return path[::-1]

# Build tree
root = TreeNode("CEO")
vp1 = TreeNode("VP Engineering")
vp2 = TreeNode("VP Sales")

root.add_child(vp1)
root.add_child(vp2)

manager = TreeNode("Engineering Manager")
vp1.add_child(manager)

engineer = TreeNode("Engineer")
manager.add_child(engineer)

print(engineer.get_path_to_root())
# ['CEO', 'VP Engineering', 'Engineering Manager', 'Engineer']
```

## Dependency Injection

```python
class Database:
    def query(self, sql):
        return f"Executing: {sql}"

class Logger:
    def log(self, message):
        print(f"[LOG] {message}")

class UserService:
    def __init__(self, database: Database, logger: Logger):
        # Dependencies injected, not created internally
        self.db = database
        self.logger = logger
    
    def get_user(self, user_id):
        self.logger.log(f"Fetching user {user_id}")
        return self.db.query(f"SELECT * FROM users WHERE id = {user_id}")

# Inject dependencies
db = Database()
logger = Logger()
user_service = UserService(db, logger)

user_service.get_user(123)
```

## Circular Dependencies (Avoid!)

```python
# ❌ Bad: Circular dependency
class Order:
    def __init__(self, customer):
        self.customer = customer
        customer.order = self  # Circular reference!

class Customer:
    def __init__(self):
        self.order = None

# ✅ Better: One-way dependency
class Order:
    def __init__(self, customer):
        self.customer = customer  # Order knows Customer

class Customer:
    def __init__(self):
        pass  # Customer doesn't know Order
    
    def get_orders(self, order_repository):
        return order_repository.find_by_customer(self)
```

## Real-World Example: Social Network

```python
class User:
    def __init__(self, username):
        self.username = username
        self.posts = []
        self.following = []
        self.followers = []
    
    def create_post(self, content):
        post = Post(content, self)
        self.posts.append(post)
        return post
    
    def follow(self, other_user):
        if other_user not in self.following:
            self.following.append(other_user)
            other_user.followers.append(self)
    
    def unfollow(self, other_user):
        if other_user in self.following:
            self.following.remove(other_user)
            other_user.followers.remove(self)
    
    def get_feed(self):
        """Get posts from users we follow."""
        feed = []
        for user in self.following:
            feed.extend(user.posts)
        return sorted(feed, key=lambda p: p.timestamp, reverse=True)

class Post:
    def __init__(self, content, author: User):
        self.content = content
        self.author = author
        from datetime import datetime
        self.timestamp = datetime.now()
        self.likes = []
        self.comments = []
    
    def like(self, user):
        if user not in self.likes:
            self.likes.append(user)
    
    def add_comment(self, user, text):
        comment = Comment(text, user, self)
        self.comments.append(comment)
        return comment

class Comment:
    def __init__(self, text, author: User, post: Post):
        self.text = text
        self.author = author
        self.post = post
        from datetime import datetime
        self.timestamp = datetime.now()

# Use the system
alice = User("alice")
bob = User("bob")

# Follow relationship
alice.follow(bob)

# Create content
post = bob.create_post("Hello world!")
alice.like(post)
alice.add_comment(post, "Great post!")

# Get feed
feed = alice.get_feed()
print(f"Alice's feed has {len(feed)} posts")
```

## Best Practices

### 1. Keep Relationships Simple

```python
# ✅ Good - simple relationship
class Order:
    def __init__(self, customer_id):
        self.customer_id = customer_id

# ❌ Bad - overly complex
class Order:
    def __init__(self, customer):
        self.customer = customer
        customer.orders.append(self)
        customer.order_history.update(self)
        # Too much coupling
```

### 2. Use IDs for Loose Coupling

```python
# ✅ Good - loose coupling with IDs
class Order:
    def __init__(self, customer_id):
        self.customer_id = customer_id
    
    def get_customer(self, customer_repository):
        return customer_repository.find_by_id(self.customer_id)
```

### 3. Document Relationships

```python
class Department:
    """Department in an organization.
    
    Relationships:
        - One-to-many with Employee (department has many employees)
        - Many-to-one with Company (many departments in one company)
    """
    pass
```

## Summary

Model relationships between objects based on their real-world connections: **one-to-one** for unique pairings, **one-to-many** for ownership scenarios, and **many-to-many** for flexible associations. Maintain **bidirectional relationships** carefully by updating both sides. Use **aggregation** when objects can exist independently and **composition** when lifetime is tied together. Implement **join tables** to add data to many-to-many relationships. Inject dependencies rather than creating them internally to reduce coupling. Avoid circular dependencies and keep relationships as simple as possible for maintainability.
