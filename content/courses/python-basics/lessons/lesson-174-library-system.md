---
id: "173-library-system"
title: "Library Management System"
chapterId: ch13-practice
order: 10
duration: 30
objectives:
  - Build complete library system
  - Manage books and members
  - Track borrowing and returns
  - Generate overdue reports
---

# Library Management System

Build a comprehensive library management system for books, members, and borrowing.

## Project Overview

Create library system that:
- Manages book catalog
- Tracks members
- Handles borrowing/returns
- Calculates fines
- Generates reports

## Data Models

```python
# models.py
from dataclasses import dataclass, field
from datetime import date, timedelta
from typing import List, Optional
from enum import Enum
import uuid

class BookStatus(Enum):
    """Book availability status"""
    AVAILABLE = "available"
    BORROWED = "borrowed"
    RESERVED = "reserved"
    MAINTENANCE = "maintenance"

@dataclass
class Book:
    """Library book"""
    id: str
    title: str
    author: str
    isbn: str
    category: str
    publication_year: int
    status: BookStatus = BookStatus.AVAILABLE
    borrower_id: Optional[str] = None
    due_date: Optional[date] = None
    
    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())
    
    def is_available(self) -> bool:
        return self.status == BookStatus.AVAILABLE
    
    def is_overdue(self) -> bool:
        if self.status != BookStatus.BORROWED or not self.due_date:
            return False
        return date.today() > self.due_date
    
    def days_overdue(self) -> int:
        if not self.is_overdue():
            return 0
        return (date.today() - self.due_date).days

@dataclass
class Member:
    """Library member"""
    id: str
    name: str
    email: str
    phone: str
    membership_date: date
    borrowed_books: List[str] = field(default_factory=list)
    fines_owed: float = 0.0
    max_books: int = 3
    
    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())
    
    def can_borrow(self) -> bool:
        """Check if member can borrow more books"""
        return len(self.borrowed_books) < self.max_books and self.fines_owed == 0
    
    def add_fine(self, amount: float):
        """Add fine to member account"""
        self.fines_owed += amount

@dataclass
class BorrowTransaction:
    """Borrowing record"""
    id: str
    book_id: str
    member_id: str
    borrow_date: date
    due_date: date
    return_date: Optional[date] = None
    fine_amount: float = 0.0
    
    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())
    
    def is_returned(self) -> bool:
        return self.return_date is not None
    
    def was_late(self) -> bool:
        if not self.return_date:
            return False
        return self.return_date > self.due_date
```

## Library Manager

```python
# library_manager.py
import json
from pathlib import Path
from datetime import date, timedelta
from typing import List, Optional, Dict

class LibraryManager:
    """Main library management system"""
    
    FINE_PER_DAY = 0.50  # $0.50 per day overdue
    BORROWING_PERIOD = 14  # 14 days
    
    def __init__(self, data_dir: str = "library_data"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(exist_ok=True)
        
        self.books: Dict[str, Book] = {}
        self.members: Dict[str, Member] = {}
        self.transactions: List[BorrowTransaction] = []
        
        self.load_data()
    
    # Book Management
    def add_book(self, title: str, author: str, isbn: str, 
                 category: str, publication_year: int) -> Book:
        """Add book to catalog"""
        # Check for duplicate ISBN
        for book in self.books.values():
            if book.isbn == isbn:
                raise ValueError(f"Book with ISBN {isbn} already exists")
        
        book = Book(
            id=str(uuid.uuid4()),
            title=title,
            author=author,
            isbn=isbn,
            category=category,
            publication_year=publication_year
        )
        
        self.books[book.id] = book
        self.save_data()
        return book
    
    def search_books(self, query: str, field: str = "all") -> List[Book]:
        """Search books by title, author, ISBN, or category"""
        query_lower = query.lower()
        results = []
        
        for book in self.books.values():
            if field == "all":
                if (query_lower in book.title.lower() or
                    query_lower in book.author.lower() or
                    query_lower in book.isbn.lower() or
                    query_lower in book.category.lower()):
                    results.append(book)
            elif field == "title" and query_lower in book.title.lower():
                results.append(book)
            elif field == "author" and query_lower in book.author.lower():
                results.append(book)
            elif field == "isbn" and query_lower in book.isbn.lower():
                results.append(book)
            elif field == "category" and query_lower in book.category.lower():
                results.append(book)
        
        return results
    
    def get_available_books(self) -> List[Book]:
        """Get all available books"""
        return [b for b in self.books.values() if b.is_available()]
    
    def remove_book(self, book_id: str) -> bool:
        """Remove book from catalog"""
        if book_id in self.books:
            book = self.books[book_id]
            if book.status == BookStatus.BORROWED:
                raise ValueError("Cannot remove borrowed book")
            
            del self.books[book_id]
            self.save_data()
            return True
        return False
    
    # Member Management
    def register_member(self, name: str, email: str, phone: str) -> Member:
        """Register new library member"""
        # Check for duplicate email
        for member in self.members.values():
            if member.email == email:
                raise ValueError(f"Member with email {email} already exists")
        
        member = Member(
            id=str(uuid.uuid4()),
            name=name,
            email=email,
            phone=phone,
            membership_date=date.today()
        )
        
        self.members[member.id] = member
        self.save_data()
        return member
    
    def search_members(self, query: str) -> List[Member]:
        """Search members by name or email"""
        query_lower = query.lower()
        return [m for m in self.members.values() 
                if query_lower in m.name.lower() or query_lower in m.email.lower()]
    
    # Borrowing Operations
    def borrow_book(self, book_id: str, member_id: str) -> BorrowTransaction:
        """Process book borrowing"""
        # Validate book
        if book_id not in self.books:
            raise ValueError(f"Book {book_id} not found")
        
        book = self.books[book_id]
        if not book.is_available():
            raise ValueError(f"Book '{book.title}' is not available")
        
        # Validate member
        if member_id not in self.members:
            raise ValueError(f"Member {member_id} not found")
        
        member = self.members[member_id]
        if not member.can_borrow():
            reasons = []
            if len(member.borrowed_books) >= member.max_books:
                reasons.append("maximum books borrowed")
            if member.fines_owed > 0:
                reasons.append(f"${member.fines_owed:.2f} in fines owed")
            raise ValueError(f"Member cannot borrow: {', '.join(reasons)}")
        
        # Create transaction
        transaction = BorrowTransaction(
            id=str(uuid.uuid4()),
            book_id=book_id,
            member_id=member_id,
            borrow_date=date.today(),
            due_date=date.today() + timedelta(days=self.BORROWING_PERIOD)
        )
        
        # Update book status
        book.status = BookStatus.BORROWED
        book.borrower_id = member_id
        book.due_date = transaction.due_date
        
        # Update member
        member.borrowed_books.append(book_id)
        
        # Record transaction
        self.transactions.append(transaction)
        
        self.save_data()
        return transaction
    
    def return_book(self, book_id: str) -> Dict:
        """Process book return"""
        if book_id not in self.books:
            raise ValueError(f"Book {book_id} not found")
        
        book = self.books[book_id]
        if book.status != BookStatus.BORROWED:
            raise ValueError(f"Book '{book.title}' is not borrowed")
        
        # Find transaction
        transaction = None
        for trans in reversed(self.transactions):
            if trans.book_id == book_id and not trans.is_returned():
                transaction = trans
                break
        
        if not transaction:
            raise ValueError("No borrowing transaction found")
        
        # Calculate fine if overdue
        return_date = date.today()
        fine = 0.0
        
        if return_date > transaction.due_date:
            days_late = (return_date - transaction.due_date).days
            fine = days_late * self.FINE_PER_DAY
            
            member = self.members[transaction.member_id]
            member.add_fine(fine)
        
        # Update transaction
        transaction.return_date = return_date
        transaction.fine_amount = fine
        
        # Update book
        book.status = BookStatus.AVAILABLE
        book.borrower_id = None
        book.due_date = None
        
        # Update member
        member = self.members[transaction.member_id]
        member.borrowed_books.remove(book_id)
        
        self.save_data()
        
        return {
            "book": book,
            "transaction": transaction,
            "fine": fine,
            "days_late": (return_date - transaction.due_date).days if fine > 0 else 0
        }
    
    def pay_fine(self, member_id: str, amount: float) -> float:
        """Process fine payment"""
        if member_id not in self.members:
            raise ValueError(f"Member {member_id} not found")
        
        member = self.members[member_id]
        
        if amount > member.fines_owed:
            amount = member.fines_owed
        
        member.fines_owed -= amount
        self.save_data()
        
        return member.fines_owed  # Return remaining balance
    
    # Reports
    def get_overdue_books(self) -> List[Dict]:
        """Get all overdue books"""
        overdue = []
        
        for book in self.books.values():
            if book.is_overdue():
                member = self.members[book.borrower_id]
                overdue.append({
                    "book": book,
                    "member": member,
                    "days_overdue": book.days_overdue(),
                    "fine_amount": book.days_overdue() * self.FINE_PER_DAY
                })
        
        return sorted(overdue, key=lambda x: x["days_overdue"], reverse=True)
    
    def get_member_history(self, member_id: str) -> List[BorrowTransaction]:
        """Get borrowing history for member"""
        return [t for t in self.transactions if t.member_id == member_id]
    
    def get_book_history(self, book_id: str) -> List[BorrowTransaction]:
        """Get borrowing history for book"""
        return [t for t in self.transactions if t.book_id == book_id]
    
    def get_statistics(self) -> Dict:
        """Get library statistics"""
        total_books = len(self.books)
        available = len([b for b in self.books.values() if b.is_available()])
        borrowed = len([b for b in self.books.values() if b.status == BookStatus.BORROWED])
        
        total_members = len(self.members)
        active_borrowers = len([m for m in self.members.values() if m.borrowed_books])
        
        overdue_books = len([b for b in self.books.values() if b.is_overdue()])
        total_fines = sum(m.fines_owed for m in self.members.values())
        
        return {
            "books": {
                "total": total_books,
                "available": available,
                "borrowed": borrowed,
                "overdue": overdue_books
            },
            "members": {
                "total": total_members,
                "active_borrowers": active_borrowers
            },
            "fines": {
                "total_owed": round(total_fines, 2)
            }
        }
    
    # Data Persistence
    def save_data(self):
        """Save all data to files"""
        # Save books
        books_data = [
            {
                **b.__dict__,
                "status": b.status.value
            }
            for b in self.books.values()
        ]
        (self.data_dir / "books.json").write_text(json.dumps(books_data, indent=2, default=str))
        
        # Save members
        members_data = [m.__dict__ for m in self.members.values()]
        (self.data_dir / "members.json").write_text(json.dumps(members_data, indent=2, default=str))
        
        # Save transactions
        transactions_data = [t.__dict__ for t in self.transactions]
        (self.data_dir / "transactions.json").write_text(json.dumps(transactions_data, indent=2, default=str))
    
    def load_data(self):
        """Load all data from files"""
        # Load books
        books_file = self.data_dir / "books.json"
        if books_file.exists():
            data = json.loads(books_file.read_text())
            for book_data in data:
                book_data["status"] = BookStatus(book_data["status"])
                book_data["due_date"] = date.fromisoformat(book_data["due_date"]) if book_data.get("due_date") else None
                book = Book(**book_data)
                self.books[book.id] = book
        
        # Load members
        members_file = self.data_dir / "members.json"
        if members_file.exists():
            data = json.loads(members_file.read_text())
            for member_data in data:
                member_data["membership_date"] = date.fromisoformat(member_data["membership_date"])
                member = Member(**member_data)
                self.members[member.id] = member
        
        # Load transactions
        transactions_file = self.data_dir / "transactions.json"
        if transactions_file.exists():
            data = json.loads(transactions_file.read_text())
            for trans_data in data:
                trans_data["borrow_date"] = date.fromisoformat(trans_data["borrow_date"])
                trans_data["due_date"] = date.fromisoformat(trans_data["due_date"])
                if trans_data.get("return_date"):
                    trans_data["return_date"] = date.fromisoformat(trans_data["return_date"])
                trans = BorrowTransaction(**trans_data)
                self.transactions.append(trans)
```

## CLI Application

```python
# cli.py

def run_library_system():
    """Main library system interface"""
    library = LibraryManager()
    
    while True:
        print("\n" + "="*70)
        print("LIBRARY MANAGEMENT SYSTEM")
        print("="*70)
        print("Books:     1. Add Book    2. Search Books    3. Remove Book")
        print("Members:   4. Register    5. Search Members")
        print("Borrowing: 6. Borrow      7. Return          8. Pay Fine")
        print("Reports:   9. Overdue     10. Statistics     11. History")
        print("12. Exit")
        print("="*70)
        
        choice = input("\nChoice (1-12): ").strip()
        
        try:
            if choice == "1":
                # Add book
                print("\n--- Add Book ---")
                title = input("Title: ")
                author = input("Author: ")
                isbn = input("ISBN: ")
                category = input("Category: ")
                year = int(input("Publication Year: "))
                
                book = library.add_book(title, author, isbn, category, year)
                print(f"✓ Added: {book.title}")
            
            elif choice == "2":
                # Search books
                query = input("\nSearch: ")
                results = library.search_books(query)
                
                if results:
                    print(f"\nFound {len(results)} books:")
                    for book in results:
                        status = book.status.value
                        print(f"- [{status}] {book.title} by {book.author}")
                else:
                    print("No books found")
            
            elif choice == "6":
                # Borrow book
                book_id = input("\nBook ID: ")
                member_id = input("Member ID: ")
                
                trans = library.borrow_book(book_id, member_id)
                book = library.books[book_id]
                print(f"✓ Borrowed: {book.title}")
                print(f"Due date: {trans.due_date}")
            
            elif choice == "7":
                # Return book
                book_id = input("\nBook ID: ")
                result = library.return_book(book_id)
                
                print(f"✓ Returned: {result['book'].title}")
                if result['fine'] > 0:
                    print(f"⚠ Late by {result['days_late']} days")
                    print(f"Fine: ${result['fine']:.2f}")
            
            elif choice == "9":
                # Overdue report
                overdue = library.get_overdue_books()
                
                if overdue:
                    print(f"\n{len(overdue)} Overdue Books:")
                    for item in overdue:
                        print(f"\n{item['book'].title}")
                        print(f"  Borrower: {item['member'].name}")
                        print(f"  Days overdue: {item['days_overdue']}")
                        print(f"  Fine: ${item['fine_amount']:.2f}")
                else:
                    print("\nNo overdue books!")
            
            elif choice == "10":
                # Statistics
                stats = library.get_statistics()
                print("\n--- Library Statistics ---")
                print(f"Total Books: {stats['books']['total']}")
                print(f"  Available: {stats['books']['available']}")
                print(f"  Borrowed: {stats['books']['borrowed']}")
                print(f"  Overdue: {stats['books']['overdue']}")
                print(f"\nTotal Members: {stats['members']['total']}")
                print(f"  Active Borrowers: {stats['members']['active_borrowers']}")
                print(f"\nTotal Fines Owed: ${stats['fines']['total_owed']:.2f}")
            
            elif choice == "12":
                print("\nGoodbye!")
                break
        
        except ValueError as e:
            print(f"\n✗ Error: {e}")
        except Exception as e:
            print(f"\n✗ Unexpected error: {e}")

if __name__ == "__main__":
    run_library_system()
```

## Summary

Built complete library management system with:
- Book catalog management
- Member registration
- Borrowing/return processing
- Fine calculation
- Overdue tracking
- Comprehensive reporting

**Skills Applied:**
- Object-oriented design
- Enums for status
- Data validation
- Business logic
- File persistence
- Complex data relationships
