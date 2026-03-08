---
id: lesson-174-library-system
title: "Library Management System"
chapterId: ch13-practice
order: 9
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
from datetime import date, timedelta
from typing import List, Optional
import uuid

# Book status constants
BOOK_AVAILABLE = "available"
BOOK_BORROWED = "borrowed"
BOOK_RESERVED = "reserved"
BOOK_MAINTENANCE = "maintenance"


def create_book(title, author, isbn, category, publication_year,
                book_id=None, status=BOOK_AVAILABLE, borrower_id=None, due_date=None):
    """Create a library book record"""
    return {
        "id": book_id or str(uuid.uuid4()),
        "title": title,
        "author": author,
        "isbn": isbn,
        "category": category,
        "publication_year": publication_year,
        "status": status,
        "borrower_id": borrower_id,
        "due_date": due_date,
    }


def book_is_available(book):
    """Check if book is available"""
    return book["status"] == BOOK_AVAILABLE


def book_is_overdue(book):
    """Check if book is overdue"""
    if book["status"] != BOOK_BORROWED or not book["due_date"]:
        return False
    return date.today() > book["due_date"]


def book_days_overdue(book):
    """Get number of days book is overdue"""
    if not book_is_overdue(book):
        return 0
    return (date.today() - book["due_date"]).days


def create_member(name, email, phone, member_id=None,
                  membership_date=None, borrowed_books=None,
                  fines_owed=0.0, max_books=3):
    """Create a library member record"""
    return {
        "id": member_id or str(uuid.uuid4()),
        "name": name,
        "email": email,
        "phone": phone,
        "membership_date": membership_date or date.today(),
        "borrowed_books": borrowed_books if borrowed_books is not None else [],
        "fines_owed": fines_owed,
        "max_books": max_books,
    }


def member_can_borrow(member):
    """Check if member can borrow more books"""
    return (len(member["borrowed_books"]) < member["max_books"]
            and member["fines_owed"] == 0)


def member_add_fine(member, amount):
    """Add fine to member account"""
    member["fines_owed"] += amount


def create_transaction(book_id, member_id, borrow_date, due_date,
                       transaction_id=None, return_date=None, fine_amount=0.0):
    """Create a borrowing transaction record"""
    return {
        "id": transaction_id or str(uuid.uuid4()),
        "book_id": book_id,
        "member_id": member_id,
        "borrow_date": borrow_date,
        "due_date": due_date,
        "return_date": return_date,
        "fine_amount": fine_amount,
    }


def transaction_is_returned(transaction):
    """Check if book has been returned"""
    return transaction["return_date"] is not None


def transaction_was_late(transaction):
    """Check if return was late"""
    if not transaction["return_date"]:
        return False
    return transaction["return_date"] > transaction["due_date"]
```

## Library Manager

```python
# library_manager.py
import json
from pathlib import Path
from datetime import date, timedelta
from typing import List, Optional, Dict

# Library configuration constants
FINE_PER_DAY = 0.50  # $0.50 per day overdue
BORROWING_PERIOD = 14  # 14 days


def create_library(data_dir="library_data"):
    """Create and initialize a library system state"""
    data_path = Path(data_dir)
    data_path.mkdir(exist_ok=True)

    library = {
        "data_dir": data_path,
        "books": {},
        "members": {},
        "transactions": [],
    }

    load_data(library)
    return library


# Book Management
def add_book(library, title, author, isbn, category, publication_year):
    """Add book to catalog"""
    # Check for duplicate ISBN
    for book in library["books"].values():
        if book["isbn"] == isbn:
            raise ValueError(f"Book with ISBN {isbn} already exists")

    book = create_book(
        book_id=str(uuid.uuid4()),
        title=title,
        author=author,
        isbn=isbn,
        category=category,
        publication_year=publication_year,
    )

    library["books"][book["id"]] = book
    save_data(library)
    return book


def search_books(library, query, field="all"):
    """Search books by title, author, ISBN, or category"""
    query_lower = query.lower()
    results = []

    for book in library["books"].values():
        if field == "all":
            if (query_lower in book["title"].lower() or
                query_lower in book["author"].lower() or
                query_lower in book["isbn"].lower() or
                query_lower in book["category"].lower()):
                results.append(book)
        elif field == "title" and query_lower in book["title"].lower():
            results.append(book)
        elif field == "author" and query_lower in book["author"].lower():
            results.append(book)
        elif field == "isbn" and query_lower in book["isbn"].lower():
            results.append(book)
        elif field == "category" and query_lower in book["category"].lower():
            results.append(book)

    return results


def get_available_books(library):
    """Get all available books"""
    return [b for b in library["books"].values() if book_is_available(b)]


def remove_book(library, book_id):
    """Remove book from catalog"""
    if book_id in library["books"]:
        book = library["books"][book_id]
        if book["status"] == BOOK_BORROWED:
            raise ValueError("Cannot remove borrowed book")

        del library["books"][book_id]
        save_data(library)
        return True
    return False


# Member Management
def register_member(library, name, email, phone):
    """Register new library member"""
    # Check for duplicate email
    for member in library["members"].values():
        if member["email"] == email:
            raise ValueError(f"Member with email {email} already exists")

    member = create_member(
        member_id=str(uuid.uuid4()),
        name=name,
        email=email,
        phone=phone,
        membership_date=date.today(),
    )

    library["members"][member["id"]] = member
    save_data(library)
    return member


def search_members(library, query):
    """Search members by name or email"""
    query_lower = query.lower()
    return [m for m in library["members"].values()
            if query_lower in m["name"].lower() or query_lower in m["email"].lower()]


# Borrowing Operations
def borrow_book(library, book_id, member_id):
    """Process book borrowing"""
    # Validate book
    if book_id not in library["books"]:
        raise ValueError(f"Book {book_id} not found")

    book = library["books"][book_id]
    if not book_is_available(book):
        raise ValueError(f"Book '{book['title']}' is not available")

    # Validate member
    if member_id not in library["members"]:
        raise ValueError(f"Member {member_id} not found")

    member = library["members"][member_id]
    if not member_can_borrow(member):
        reasons = []
        if len(member["borrowed_books"]) >= member["max_books"]:
            reasons.append("maximum books borrowed")
        if member["fines_owed"] > 0:
            reasons.append(f"${member['fines_owed']:.2f} in fines owed")
        raise ValueError(f"Member cannot borrow: {', '.join(reasons)}")

    # Create transaction
    transaction = create_transaction(
        transaction_id=str(uuid.uuid4()),
        book_id=book_id,
        member_id=member_id,
        borrow_date=date.today(),
        due_date=date.today() + timedelta(days=BORROWING_PERIOD),
    )

    # Update book status
    book["status"] = BOOK_BORROWED
    book["borrower_id"] = member_id
    book["due_date"] = transaction["due_date"]

    # Update member
    member["borrowed_books"].append(book_id)

    # Record transaction
    library["transactions"].append(transaction)

    save_data(library)
    return transaction


def return_book(library, book_id):
    """Process book return"""
    if book_id not in library["books"]:
        raise ValueError(f"Book {book_id} not found")

    book = library["books"][book_id]
    if book["status"] != BOOK_BORROWED:
        raise ValueError(f"Book '{book['title']}' is not borrowed")

    # Find transaction
    transaction = None
    for trans in reversed(library["transactions"]):
        if trans["book_id"] == book_id and not transaction_is_returned(trans):
            transaction = trans
            break

    if not transaction:
        raise ValueError("No borrowing transaction found")

    # Calculate fine if overdue
    return_date = date.today()
    fine = 0.0

    if return_date > transaction["due_date"]:
        days_late = (return_date - transaction["due_date"]).days
        fine = days_late * FINE_PER_DAY

        member = library["members"][transaction["member_id"]]
        member_add_fine(member, fine)

    # Update transaction
    transaction["return_date"] = return_date
    transaction["fine_amount"] = fine

    # Update book
    book["status"] = BOOK_AVAILABLE
    book["borrower_id"] = None
    book["due_date"] = None

    # Update member
    member = library["members"][transaction["member_id"]]
    member["borrowed_books"].remove(book_id)

    save_data(library)

    return {
        "book": book,
        "transaction": transaction,
        "fine": fine,
        "days_late": (return_date - transaction["due_date"]).days if fine > 0 else 0,
    }


def pay_fine(library, member_id, amount):
    """Process fine payment"""
    if member_id not in library["members"]:
        raise ValueError(f"Member {member_id} not found")

    member = library["members"][member_id]

    if amount > member["fines_owed"]:
        amount = member["fines_owed"]

    member["fines_owed"] -= amount
    save_data(library)

    return member["fines_owed"]  # Return remaining balance


# Reports
def get_overdue_books(library):
    """Get all overdue books"""
    overdue = []

    for book in library["books"].values():
        if book_is_overdue(book):
            member = library["members"][book["borrower_id"]]
            overdue.append({
                "book": book,
                "member": member,
                "days_overdue": book_days_overdue(book),
                "fine_amount": book_days_overdue(book) * FINE_PER_DAY,
            })

    return sorted(overdue, key=lambda x: x["days_overdue"], reverse=True)


def get_member_history(library, member_id):
    """Get borrowing history for member"""
    return [t for t in library["transactions"] if t["member_id"] == member_id]


def get_book_history(library, book_id):
    """Get borrowing history for book"""
    return [t for t in library["transactions"] if t["book_id"] == book_id]


def get_statistics(library):
    """Get library statistics"""
    total_books = len(library["books"])
    available = len([b for b in library["books"].values() if book_is_available(b)])
    borrowed = len([b for b in library["books"].values()
                    if b["status"] == BOOK_BORROWED])

    total_members = len(library["members"])
    active_borrowers = len([m for m in library["members"].values()
                           if m["borrowed_books"]])

    overdue_count = len([b for b in library["books"].values() if book_is_overdue(b)])
    total_fines = sum(m["fines_owed"] for m in library["members"].values())

    return {
        "books": {
            "total": total_books,
            "available": available,
            "borrowed": borrowed,
            "overdue": overdue_count,
        },
        "members": {
            "total": total_members,
            "active_borrowers": active_borrowers,
        },
        "fines": {
            "total_owed": round(total_fines, 2),
        },
    }


# Data Persistence
def save_data(library):
    """Save all data to files"""
    data_dir = library["data_dir"]

    # Save books
    books_data = list(library["books"].values())
    (data_dir / "books.json").write_text(
        json.dumps(books_data, indent=2, default=str)
    )

    # Save members
    members_data = list(library["members"].values())
    (data_dir / "members.json").write_text(
        json.dumps(members_data, indent=2, default=str)
    )

    # Save transactions
    transactions_data = list(library["transactions"])
    (data_dir / "transactions.json").write_text(
        json.dumps(transactions_data, indent=2, default=str)
    )


def load_data(library):
    """Load all data from files"""
    data_dir = library["data_dir"]

    # Load books
    books_file = data_dir / "books.json"
    if books_file.exists():
        data = json.loads(books_file.read_text())
        for book_data in data:
            if book_data.get("due_date") and book_data["due_date"] != "None":
                book_data["due_date"] = date.fromisoformat(book_data["due_date"])
            else:
                book_data["due_date"] = None
            library["books"][book_data["id"]] = book_data

    # Load members
    members_file = data_dir / "members.json"
    if members_file.exists():
        data = json.loads(members_file.read_text())
        for member_data in data:
            member_data["membership_date"] = date.fromisoformat(
                member_data["membership_date"]
            )
            library["members"][member_data["id"]] = member_data

    # Load transactions
    transactions_file = data_dir / "transactions.json"
    if transactions_file.exists():
        data = json.loads(transactions_file.read_text())
        for trans_data in data:
            trans_data["borrow_date"] = date.fromisoformat(trans_data["borrow_date"])
            trans_data["due_date"] = date.fromisoformat(trans_data["due_date"])
            if trans_data.get("return_date") and trans_data["return_date"] != "None":
                trans_data["return_date"] = date.fromisoformat(trans_data["return_date"])
            else:
                trans_data["return_date"] = None
            library["transactions"].append(trans_data)
```

## CLI Application

```python
# cli.py

def run_library_system():
    """Main library system interface"""
    library = create_library()

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

                book = add_book(library, title, author, isbn, category, year)
                print(f"✓ Added: {book['title']}")

            elif choice == "2":
                # Search books
                query = input("\nSearch: ")
                results = search_books(library, query)

                if results:
                    print(f"\nFound {len(results)} books:")
                    for book in results:
                        status = book["status"]
                        print(f"- [{status}] {book['title']} by {book['author']}")
                else:
                    print("No books found")

            elif choice == "6":
                # Borrow book
                book_id = input("\nBook ID: ")
                member_id = input("Member ID: ")

                trans = borrow_book(library, book_id, member_id)
                book = library["books"][book_id]
                print(f"✓ Borrowed: {book['title']}")
                print(f"Due date: {trans['due_date']}")

            elif choice == "7":
                # Return book
                book_id = input("\nBook ID: ")
                result = return_book(library, book_id)

                print(f"✓ Returned: {result['book']['title']}")
                if result['fine'] > 0:
                    print(f"⚠ Late by {result['days_late']} days")
                    print(f"Fine: ${result['fine']:.2f}")

            elif choice == "9":
                # Overdue report
                overdue = get_overdue_books(library)

                if overdue:
                    print(f"\n{len(overdue)} Overdue Books:")
                    for item in overdue:
                        print(f"\n{item['book']['title']}")
                        print(f"  Borrower: {item['member']['name']}")
                        print(f"  Days overdue: {item['days_overdue']}")
                        print(f"  Fine: ${item['fine_amount']:.2f}")
                else:
                    print("\nNo overdue books!")

            elif choice == "10":
                # Statistics
                stats = get_statistics(library)
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
- Modular design with functions
- Constants for status values
- Data validation
- Business logic
- File persistence
- Complex data relationships
