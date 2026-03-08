---
id: lesson-166-contact-book
title: "Contact Book Manager"
chapterId: ch13-practice
order: 1
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

def create_contact(name, phone, email, address=None, notes=None):
    """Create a contact dictionary"""
    return {
        "name": name,
        "phone": phone,
        "email": email,
        "address": address,
        "notes": notes
    }

def contact_from_dict(data):
    """Create contact from dictionary"""
    return create_contact(
        name=data["name"],
        phone=data["phone"],
        email=data["email"],
        address=data.get("address"),
        notes=data.get("notes")
    )

def format_contact(contact):
    """String representation of a contact"""
    result = f"Name: {contact['name']}\n"
    result += f"Phone: {contact['phone']}\n"
    result += f"Email: {contact['email']}\n"
    if contact['address']:
        result += f"Address: {contact['address']}\n"
    if contact['notes']:
        result += f"Notes: {contact['notes']}\n"
    return result
```

### Contact Manager

```python
# contact_manager.py
import json
from pathlib import Path

def create_manager(filename="contacts.json"):
    """Create a contact manager state dictionary"""
    manager = {
        "filename": filename,
        "contacts": []
    }
    load_contacts(manager)
    return manager

def add_contact(manager, contact):
    """Add new contact"""
    # Check for duplicate
    existing = find_by_name(manager, contact["name"])
    if existing:
        raise ValueError(f"Contact '{contact['name']}' already exists")

    manager["contacts"].append(contact)
    save_contacts(manager)
    print(f"✓ Added contact: {contact['name']}")

def remove_contact(manager, name):
    """Remove contact by name"""
    for i, contact in enumerate(manager["contacts"]):
        if contact["name"].lower() == name.lower():
            removed = manager["contacts"].pop(i)
            save_contacts(manager)
            print(f"✓ Removed contact: {removed['name']}")
            return True

    print(f"✗ Contact '{name}' not found")
    return False

def find_by_name(manager, name):
    """Find contact by exact name"""
    for contact in manager["contacts"]:
        if contact["name"].lower() == name.lower():
            return contact
    return None

def search_contacts(manager, query):
    """Search contacts by name, phone, or email"""
    query = query.lower()
    results = []

    for contact in manager["contacts"]:
        if (query in contact["name"].lower() or
            query in contact["phone"] or
            query in contact["email"].lower()):
            results.append(contact)

    return results

def update_contact(manager, name, **kwargs):
    """Update contact fields"""
    contact = find_by_name(manager, name)
    if not contact:
        print(f"✗ Contact '{name}' not found")
        return False

    # Update fields
    for field, value in kwargs.items():
        if field in contact and value is not None:
            contact[field] = value

    save_contacts(manager)
    print(f"✓ Updated contact: {contact['name']}")
    return True

def list_all(manager):
    """Get all contacts sorted by name"""
    return sorted(manager["contacts"], key=lambda c: c["name"].lower())

def save_contacts(manager):
    """Save contacts to JSON file"""
    with open(manager["filename"], 'w') as f:
        json.dump(manager["contacts"], f, indent=2)

def load_contacts(manager):
    """Load contacts from JSON file"""
    if not Path(manager["filename"]).exists():
        manager["contacts"] = []
        return

    try:
        with open(manager["filename"], 'r') as f:
            data = json.load(f)
            manager["contacts"] = [contact_from_dict(item) for item in data]
    except (json.JSONDecodeError, KeyError):
        print(f"Warning: Could not load contacts from {manager['filename']}")
        manager["contacts"] = []

def get_statistics(manager):
    """Get contact statistics"""
    return {
        "total_contacts": len(manager["contacts"]),
        "contacts_with_address": sum(1 for c in manager["contacts"] if c["address"]),
        "contacts_with_notes": sum(1 for c in manager["contacts"] if c["notes"])
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

def get_contact_input():
    """Get contact details from user"""
    print("\n--- New Contact ---")
    name = input("Name: ").strip()
    phone = input("Phone: ").strip()
    email = input("Email: ").strip()
    address = input("Address (optional): ").strip() or None
    notes = input("Notes (optional): ").strip() or None

    return create_contact(name, phone, email, address, notes)

def display_contact(contact):
    """Display contact details"""
    print("\n" + "-"*50)
    print(format_contact(contact))
    print("-"*50)

def display_contacts(contacts):
    """Display list of contacts"""
    if not contacts:
        print("\nNo contacts found.")
        return

    print(f"\n{'Name':<20} {'Phone':<15} {'Email':<30}")
    print("-"*65)
    for contact in contacts:
        print(f"{contact['name']:<20} {contact['phone']:<15} {contact['email']:<30}")

def run_contact_book():
    """Main application loop"""
    manager = create_manager()

    while True:
        print_menu()
        choice = input("\nEnter choice (1-7): ").strip()

        if choice == "1":
            # Add Contact
            try:
                contact = get_contact_input()
                add_contact(manager, contact)
            except ValueError as e:
                print(f"✗ Error: {e}")

        elif choice == "2":
            # View All Contacts
            contacts = list_all(manager)
            display_contacts(contacts)

            if contacts:
                view_choice = input("\nView details? (name or 'n'): ").strip()
                if view_choice.lower() != 'n':
                    contact = find_by_name(manager, view_choice)
                    if contact:
                        display_contact(contact)
                    else:
                        print(f"✗ Contact '{view_choice}' not found")

        elif choice == "3":
            # Search Contacts
            query = input("\nSearch query: ").strip()
            results = search_contacts(manager, query)
            display_contacts(results)

            if results:
                view_choice = input("\nView details? (name or 'n'): ").strip()
                if view_choice.lower() != 'n':
                    contact = find_by_name(manager, view_choice)
                    if contact:
                        display_contact(contact)

        elif choice == "4":
            # Update Contact
            name = input("\nContact name: ").strip()
            contact = find_by_name(manager, name)

            if not contact:
                print(f"✗ Contact '{name}' not found")
                continue

            print(f"\nCurrent details:")
            display_contact(contact)

            print("\nEnter new values (or press Enter to skip):")
            phone = input(f"Phone [{contact['phone']}]: ").strip() or None
            email = input(f"Email [{contact['email']}]: ").strip() or None
            address = input(f"Address [{contact['address']}]: ").strip() or None
            notes = input(f"Notes [{contact['notes']}]: ").strip() or None

            update_contact(
                manager,
                name,
                phone=phone,
                email=email,
                address=address,
                notes=notes
            )

        elif choice == "5":
            # Delete Contact
            name = input("\nContact name: ").strip()
            contact = find_by_name(manager, name)

            if contact:
                display_contact(contact)
                confirm = input("\nAre you sure? (yes/no): ").strip().lower()
                if confirm == "yes":
                    remove_contact(manager, name)
            else:
                print(f"✗ Contact '{name}' not found")

        elif choice == "6":
            # Statistics
            stats = get_statistics(manager)
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

def validate_phone(phone):
    """Validate phone number format"""
    # Remove common separators
    cleaned = re.sub(r'[\s\-\(\)\.]', '', phone)
    # Check if remaining characters are digits
    return cleaned.isdigit() and len(cleaned) >= 10

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_contact(contact):
    """Validate entire contact, return list of errors"""
    errors = []

    if not contact["name"] or len(contact["name"]) < 2:
        errors.append("Name must be at least 2 characters")

    if not validate_phone(contact["phone"]):
        errors.append("Invalid phone number")

    if not validate_email(contact["email"]):
        errors.append("Invalid email address")

    return errors

# Enhanced add_contact with validation
def add_contact_with_validation(manager, contact):
    """Add contact with validation"""
    errors = validate_contact(contact)

    if errors:
        raise ValueError("Validation failed:\n" + "\n".join(f"- {e}" for e in errors))

    if find_by_name(manager, contact["name"]):
        raise ValueError(f"Contact '{contact['name']}' already exists")

    manager["contacts"].append(contact)
    save_contacts(manager)
```

### Import/Export Features

```python
import csv

def import_from_csv(filename, manager):
    """Import contacts from CSV file"""
    imported = 0

    with open(filename, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                contact = create_contact(
                    name=row['name'],
                    phone=row['phone'],
                    email=row['email'],
                    address=row.get('address'),
                    notes=row.get('notes')
                )
                add_contact(manager, contact)
                imported += 1
            except (KeyError, ValueError) as e:
                print(f"Skipped row: {e}")

    return imported

def export_to_csv(filename, manager):
    """Export contacts to CSV file"""
    contacts = list_all(manager)

    with open(filename, 'w', newline='') as f:
        fieldnames = ['name', 'phone', 'email', 'address', 'notes']
        writer = csv.DictWriter(f, fieldnames=fieldnames)

        writer.writeheader()
        for contact in contacts:
            writer.writerow(contact)

    return len(contacts)
```

### Contact Groups

```python
def create_contact_with_groups(name, phone, email, address=None, notes=None, groups=None):
    """Create a contact dictionary with groups support"""
    return {
        "name": name,
        "phone": phone,
        "email": email,
        "address": address,
        "notes": notes,
        "groups": groups if groups is not None else []
    }

def add_to_group(manager, name, group):
    """Add contact to a group"""
    contact = find_by_name(manager, name)
    if not contact:
        return False

    if "groups" not in contact:
        contact["groups"] = []

    if group not in contact["groups"]:
        contact["groups"].append(group)
        save_contacts(manager)

    return True

def get_group_members(manager, group):
    """Get all contacts in a group"""
    return [c for c in manager["contacts"]
            if group in c.get("groups", [])]

def list_groups(manager):
    """Get all unique groups"""
    groups = set()
    for contact in manager["contacts"]:
        groups.update(contact.get("groups", []))
    return sorted(groups)
```

### Advanced Search

```python
def search_by_field(contacts, field, query):
    """Search specific field"""
    query = query.lower()
    results = []

    for contact in contacts:
        value = contact.get(field, "")
        if value and query in str(value).lower():
            results.append(contact)

    return results

def search_with_filters(contacts, name=None, has_address=None,
                       has_notes=None, group=None):
    """Search with multiple filters"""
    results = contacts.copy()

    if name:
        results = [c for c in results if name.lower() in c["name"].lower()]

    if has_address is not None:
        results = [c for c in results if bool(c["address"]) == has_address]

    if has_notes is not None:
        results = [c for c in results if bool(c["notes"]) == has_notes]

    if group:
        results = [c for c in results if group in c.get("groups", [])]

    return results
```

## Testing

```python
# test_contact_book.py
import pytest
from pathlib import Path

def test_contact_creation():
    contact = create_contact("Alice Smith", "555-1234", "alice@example.com")
    assert contact["name"] == "Alice Smith"
    assert contact["phone"] == "555-1234"

def test_add_contact(tmp_path):
    manager = create_manager(str(tmp_path / "test_contacts.json"))
    contact = create_contact("Bob Jones", "555-5678", "bob@example.com")

    add_contact(manager, contact)
    assert len(manager["contacts"]) == 1

def test_search_contacts(tmp_path):
    manager = create_manager(str(tmp_path / "test_contacts.json"))
    add_contact(manager, create_contact("Alice", "555-1111", "alice@example.com"))
    add_contact(manager, create_contact("Bob", "555-2222", "bob@example.com"))

    results = search_contacts(manager, "alice")
    assert len(results) == 1
    assert results[0]["name"] == "Alice"

def test_contact_validation():
    assert validate_phone("555-123-4567") is True
    assert validate_phone("invalid") is False

    assert validate_email("test@example.com") is True
    assert validate_email("invalid") is False
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
- Modular function design
- File I/O
- Data structures
- Error handling
- User input validation
- Testing
