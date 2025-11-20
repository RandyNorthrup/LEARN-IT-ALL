---
id: "165-contact-book"
title: "Contact Book Manager"
chapterId: ch13-practice
order: 2
duration: 30
objectives:
  - Build contact management system
  - Practice CRUD operations
  - Handle file persistence
  - Implement search functionality
---

# Contact Book Manager

Build a contact book application to manage personal and professional contacts.

## Project Overview

Create a contact manager that can:
- Add new contacts
- View all contacts
- Search contacts
- Update contact details
- Delete contacts
- Save and load from file

## Core Features

### Contact Data Structure

```python
# contact.py
from dataclasses import dataclass
from typing import Optional

@dataclass
class Contact:
    """Represents a contact entry"""
    name: str
    phone: str
    email: str
    address: Optional[str] = None
    notes: Optional[str] = None
    
    def to_dict(self) -> dict:
        """Convert contact to dictionary"""
        return {
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "address": self.address,
            "notes": self.notes
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'Contact':
        """Create contact from dictionary"""
        return cls(
            name=data["name"],
            phone=data["phone"],
            email=data["email"],
            address=data.get("address"),
            notes=data.get("notes")
        )
    
    def __str__(self) -> str:
        """String representation"""
        result = f"Name: {self.name}\n"
        result += f"Phone: {self.phone}\n"
        result += f"Email: {self.email}\n"
        if self.address:
            result += f"Address: {self.address}\n"
        if self.notes:
            result += f"Notes: {self.notes}\n"
        return result
```

### Contact Manager

```python
# contact_manager.py
import json
from typing import List, Optional
from pathlib import Path

class ContactManager:
    """Manage contacts with file persistence"""
    
    def __init__(self, filename: str = "contacts.json"):
        self.filename = filename
        self.contacts: List[Contact] = []
        self.load_contacts()
    
    def add_contact(self, contact: Contact) -> None:
        """Add new contact"""
        # Check for duplicate
        existing = self.find_by_name(contact.name)
        if existing:
            raise ValueError(f"Contact '{contact.name}' already exists")
        
        self.contacts.append(contact)
        self.save_contacts()
        print(f"✓ Added contact: {contact.name}")
    
    def remove_contact(self, name: str) -> bool:
        """Remove contact by name"""
        for i, contact in enumerate(self.contacts):
            if contact.name.lower() == name.lower():
                removed = self.contacts.pop(i)
                self.save_contacts()
                print(f"✓ Removed contact: {removed.name}")
                return True
        
        print(f"✗ Contact '{name}' not found")
        return False
    
    def find_by_name(self, name: str) -> Optional[Contact]:
        """Find contact by exact name"""
        for contact in self.contacts:
            if contact.name.lower() == name.lower():
                return contact
        return None
    
    def search_contacts(self, query: str) -> List[Contact]:
        """Search contacts by name, phone, or email"""
        query = query.lower()
        results = []
        
        for contact in self.contacts:
            if (query in contact.name.lower() or
                query in contact.phone or
                query in contact.email.lower()):
                results.append(contact)
        
        return results
    
    def update_contact(self, name: str, **kwargs) -> bool:
        """Update contact fields"""
        contact = self.find_by_name(name)
        if not contact:
            print(f"✗ Contact '{name}' not found")
            return False
        
        # Update fields
        for field, value in kwargs.items():
            if hasattr(contact, field) and value is not None:
                setattr(contact, field, value)
        
        self.save_contacts()
        print(f"✓ Updated contact: {contact.name}")
        return True
    
    def list_all(self) -> List[Contact]:
        """Get all contacts sorted by name"""
        return sorted(self.contacts, key=lambda c: c.name.lower())
    
    def save_contacts(self) -> None:
        """Save contacts to JSON file"""
        data = [contact.to_dict() for contact in self.contacts]
        with open(self.filename, 'w') as f:
            json.dump(data, f, indent=2)
    
    def load_contacts(self) -> None:
        """Load contacts from JSON file"""
        if not Path(self.filename).exists():
            self.contacts = []
            return
        
        try:
            with open(self.filename, 'r') as f:
                data = json.load(f)
                self.contacts = [Contact.from_dict(item) for item in data]
        except (json.JSONDecodeError, KeyError):
            print(f"Warning: Could not load contacts from {self.filename}")
            self.contacts = []
    
    def get_statistics(self) -> dict:
        """Get contact statistics"""
        return {
            "total_contacts": len(self.contacts),
            "contacts_with_address": sum(1 for c in self.contacts if c.address),
            "contacts_with_notes": sum(1 for c in self.contacts if c.notes)
        }
```

### Command-Line Interface

```python
# cli.py
def print_menu():
    """Display menu options"""
    print("\n" + "="*50)
    print("CONTACT BOOK MANAGER")
    print("="*50)
    print("1. Add Contact")
    print("2. View All Contacts")
    print("3. Search Contacts")
    print("4. Update Contact")
    print("5. Delete Contact")
    print("6. Statistics")
    print("7. Exit")
    print("="*50)

def get_contact_input() -> Contact:
    """Get contact details from user"""
    print("\n--- New Contact ---")
    name = input("Name: ").strip()
    phone = input("Phone: ").strip()
    email = input("Email: ").strip()
    address = input("Address (optional): ").strip() or None
    notes = input("Notes (optional): ").strip() or None
    
    return Contact(name, phone, email, address, notes)

def display_contact(contact: Contact) -> None:
    """Display contact details"""
    print("\n" + "-"*50)
    print(contact)
    print("-"*50)

def display_contacts(contacts: List[Contact]) -> None:
    """Display list of contacts"""
    if not contacts:
        print("\nNo contacts found.")
        return
    
    print(f"\n{'Name':<20} {'Phone':<15} {'Email':<30}")
    print("-"*65)
    for contact in contacts:
        print(f"{contact.name:<20} {contact.phone:<15} {contact.email:<30}")

def run_contact_book():
    """Main application loop"""
    manager = ContactManager()
    
    while True:
        print_menu()
        choice = input("\nEnter choice (1-7): ").strip()
        
        if choice == "1":
            # Add Contact
            try:
                contact = get_contact_input()
                manager.add_contact(contact)
            except ValueError as e:
                print(f"✗ Error: {e}")
        
        elif choice == "2":
            # View All Contacts
            contacts = manager.list_all()
            display_contacts(contacts)
            
            if contacts:
                view_choice = input("\nView details? (name or 'n'): ").strip()
                if view_choice.lower() != 'n':
                    contact = manager.find_by_name(view_choice)
                    if contact:
                        display_contact(contact)
                    else:
                        print(f"✗ Contact '{view_choice}' not found")
        
        elif choice == "3":
            # Search Contacts
            query = input("\nSearch query: ").strip()
            results = manager.search_contacts(query)
            display_contacts(results)
            
            if results:
                view_choice = input("\nView details? (name or 'n'): ").strip()
                if view_choice.lower() != 'n':
                    contact = manager.find_by_name(view_choice)
                    if contact:
                        display_contact(contact)
        
        elif choice == "4":
            # Update Contact
            name = input("\nContact name: ").strip()
            contact = manager.find_by_name(name)
            
            if not contact:
                print(f"✗ Contact '{name}' not found")
                continue
            
            print(f"\nCurrent details:")
            display_contact(contact)
            
            print("\nEnter new values (or press Enter to skip):")
            phone = input(f"Phone [{contact.phone}]: ").strip() or None
            email = input(f"Email [{contact.email}]: ").strip() or None
            address = input(f"Address [{contact.address}]: ").strip() or None
            notes = input(f"Notes [{contact.notes}]: ").strip() or None
            
            manager.update_contact(
                name,
                phone=phone,
                email=email,
                address=address,
                notes=notes
            )
        
        elif choice == "5":
            # Delete Contact
            name = input("\nContact name: ").strip()
            contact = manager.find_by_name(name)
            
            if contact:
                display_contact(contact)
                confirm = input("\nAre you sure? (yes/no): ").strip().lower()
                if confirm == "yes":
                    manager.remove_contact(name)
            else:
                print(f"✗ Contact '{name}' not found")
        
        elif choice == "6":
            # Statistics
            stats = manager.get_statistics()
            print("\n--- Statistics ---")
            print(f"Total Contacts: {stats['total_contacts']}")
            print(f"With Address: {stats['contacts_with_address']}")
            print(f"With Notes: {stats['contacts_with_notes']}")
        
        elif choice == "7":
            # Exit
            print("\nGoodbye!")
            break
        
        else:
            print("\n✗ Invalid choice. Please enter 1-7.")

if __name__ == "__main__":
    run_contact_book()
```

## Enhancements

### Contact Validation

```python
import re

class ContactValidator:
    """Validate contact information"""
    
    @staticmethod
    def validate_phone(phone: str) -> bool:
        """Validate phone number format"""
        # Remove common separators
        cleaned = re.sub(r'[\s\-\(\)\.]', '', phone)
        # Check if remaining characters are digits
        return cleaned.isdigit() and len(cleaned) >= 10
    
    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))
    
    @staticmethod
    def validate_contact(contact: Contact) -> List[str]:
        """Validate entire contact, return errors"""
        errors = []
        
        if not contact.name or len(contact.name) < 2:
            errors.append("Name must be at least 2 characters")
        
        if not ContactValidator.validate_phone(contact.phone):
            errors.append("Invalid phone number")
        
        if not ContactValidator.validate_email(contact.email):
            errors.append("Invalid email address")
        
        return errors

# Enhanced add_contact with validation
def add_contact_with_validation(self, contact: Contact) -> None:
    """Add contact with validation"""
    errors = ContactValidator.validate_contact(contact)
    
    if errors:
        raise ValueError("Validation failed:\n" + "\n".join(f"- {e}" for e in errors))
    
    if self.find_by_name(contact.name):
        raise ValueError(f"Contact '{contact.name}' already exists")
    
    self.contacts.append(contact)
    self.save_contacts()
```

### Import/Export Features

```python
import csv

class ContactImporter:
    """Import contacts from CSV"""
    
    @staticmethod
    def import_from_csv(filename: str, manager: ContactManager) -> int:
        """Import contacts from CSV file"""
        imported = 0
        
        with open(filename, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                try:
                    contact = Contact(
                        name=row['name'],
                        phone=row['phone'],
                        email=row['email'],
                        address=row.get('address'),
                        notes=row.get('notes')
                    )
                    manager.add_contact(contact)
                    imported += 1
                except (KeyError, ValueError) as e:
                    print(f"Skipped row: {e}")
        
        return imported
    
    @staticmethod
    def export_to_csv(filename: str, manager: ContactManager) -> int:
        """Export contacts to CSV file"""
        contacts = manager.list_all()
        
        with open(filename, 'w', newline='') as f:
            fieldnames = ['name', 'phone', 'email', 'address', 'notes']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            
            writer.writeheader()
            for contact in contacts:
                writer.writerow(contact.to_dict())
        
        return len(contacts)
```

### Contact Groups

```python
@dataclass
class Contact:
    name: str
    phone: str
    email: str
    address: Optional[str] = None
    notes: Optional[str] = None
    groups: List[str] = None  # New field
    
    def __post_init__(self):
        if self.groups is None:
            self.groups = []

class ContactManager:
    # ... existing methods ...
    
    def add_to_group(self, name: str, group: str) -> bool:
        """Add contact to a group"""
        contact = self.find_by_name(name)
        if not contact:
            return False
        
        if group not in contact.groups:
            contact.groups.append(group)
            self.save_contacts()
        
        return True
    
    def get_group_members(self, group: str) -> List[Contact]:
        """Get all contacts in a group"""
        return [c for c in self.contacts if group in c.groups]
    
    def list_groups(self) -> List[str]:
        """Get all unique groups"""
        groups = set()
        for contact in self.contacts:
            groups.update(contact.groups)
        return sorted(groups)
```

### Advanced Search

```python
class ContactSearch:
    """Advanced search functionality"""
    
    @staticmethod
    def search_by_field(contacts: List[Contact], field: str, query: str) -> List[Contact]:
        """Search specific field"""
        query = query.lower()
        results = []
        
        for contact in contacts:
            value = getattr(contact, field, "")
            if value and query in str(value).lower():
                results.append(contact)
        
        return results
    
    @staticmethod
    def search_with_filters(contacts: List[Contact], 
                           name: str = None,
                           has_address: bool = None,
                           has_notes: bool = None,
                           group: str = None) -> List[Contact]:
        """Search with multiple filters"""
        results = contacts.copy()
        
        if name:
            results = [c for c in results if name.lower() in c.name.lower()]
        
        if has_address is not None:
            results = [c for c in results if bool(c.address) == has_address]
        
        if has_notes is not None:
            results = [c for c in results if bool(c.notes) == has_notes]
        
        if group:
            results = [c for c in results if group in c.groups]
        
        return results
```

## Testing

```python
# test_contact_book.py
import pytest
from pathlib import Path

def test_contact_creation():
    contact = Contact("Alice Smith", "555-1234", "alice@example.com")
    assert contact.name == "Alice Smith"
    assert contact.phone == "555-1234"

def test_add_contact(tmp_path):
    manager = ContactManager(str(tmp_path / "test_contacts.json"))
    contact = Contact("Bob Jones", "555-5678", "bob@example.com")
    
    manager.add_contact(contact)
    assert len(manager.contacts) == 1

def test_search_contacts(tmp_path):
    manager = ContactManager(str(tmp_path / "test_contacts.json"))
    manager.add_contact(Contact("Alice", "555-1111", "alice@example.com"))
    manager.add_contact(Contact("Bob", "555-2222", "bob@example.com"))
    
    results = manager.search_contacts("alice")
    assert len(results) == 1
    assert results[0].name == "Alice"

def test_contact_validation():
    validator = ContactValidator()
    
    assert validator.validate_phone("555-1234") is True
    assert validator.validate_phone("invalid") is False
    
    assert validator.validate_email("test@example.com") is True
    assert validator.validate_email("invalid") is False
```

## Summary

Built complete contact management system with:
- Contact CRUD operations
- File persistence (JSON)
- Search functionality
- Data validation
- Import/Export (CSV)
- Contact groups
- Command-line interface

**Key Skills Applied:**
- Object-oriented design
- File I/O
- Data structures
- Error handling
- User input validation
- Testing
