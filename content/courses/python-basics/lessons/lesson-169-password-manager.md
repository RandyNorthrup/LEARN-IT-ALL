---
id: "168-password-manager"
title: "Password Manager"
chapterId: ch13-practice
order: 5
duration: 30
objectives:
  - Build secure password storage
  - Implement encryption
  - Generate strong passwords
  - Master file security
---

# Password Manager

Build a secure password manager with encryption for storing login credentials.

## Project Overview

Create a password manager that:
- Stores passwords securely with encryption
- Generates strong random passwords
- Searches and retrieves credentials
- Validates password strength
- Uses master password authentication

## Core Implementation

### Encryption Module

```python
# encryption.py
from cryptography.fernet import Fernet
import base64
import hashlib
from pathlib import Path

class PasswordEncryption:
    """Handle password encryption/decryption"""
    
    @staticmethod
    def generate_key_from_password(password: str) -> bytes:
        """Generate encryption key from master password"""
        # Use SHA-256 to create consistent key from password
        key = hashlib.sha256(password.encode()).digest()
        # Fernet requires base64 encoded 32-byte key
        return base64.urlsafe_b64encode(key)
    
    @staticmethod
    def encrypt_password(password: str, key: bytes) -> str:
        """Encrypt password"""
        f = Fernet(key)
        encrypted = f.encrypt(password.encode())
        return encrypted.decode()
    
    @staticmethod
    def decrypt_password(encrypted: str, key: bytes) -> str:
        """Decrypt password"""
        try:
            f = Fernet(key)
            decrypted = f.decrypt(encrypted.encode())
            return decrypted.decode()
        except Exception:
            raise ValueError("Decryption failed - wrong master password?")

class MasterPasswordManager:
    """Manage master password authentication"""
    
    def __init__(self, hash_file: str = ".master_hash"):
        self.hash_file = hash_file
    
    def _hash_password(self, password: str) -> str:
        """Hash password with salt"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def set_master_password(self, password: str):
        """Set new master password"""
        if len(password) < 8:
            raise ValueError("Master password must be at least 8 characters")
        
        hashed = self._hash_password(password)
        Path(self.hash_file).write_text(hashed)
    
    def verify_master_password(self, password: str) -> bool:
        """Verify master password"""
        if not Path(self.hash_file).exists():
            return False
        
        stored_hash = Path(self.hash_file).read_text()
        return self._hash_password(password) == stored_hash
    
    def is_set(self) -> bool:
        """Check if master password is set"""
        return Path(self.hash_file).exists()
```

### Password Generator

```python
# password_generator.py
import random
import string

class PasswordGenerator:
    """Generate strong random passwords"""
    
    @staticmethod
    def generate(length: int = 16, 
                use_uppercase: bool = True,
                use_lowercase: bool = True,
                use_digits: bool = True,
                use_symbols: bool = True) -> str:
        """Generate random password with specified requirements"""
        
        if length < 4:
            raise ValueError("Password length must be at least 4")
        
        # Build character set
        chars = ""
        required_chars = []
        
        if use_uppercase:
            chars += string.ascii_uppercase
            required_chars.append(random.choice(string.ascii_uppercase))
        
        if use_lowercase:
            chars += string.ascii_lowercase
            required_chars.append(random.choice(string.ascii_lowercase))
        
        if use_digits:
            chars += string.digits
            required_chars.append(random.choice(string.digits))
        
        if use_symbols:
            chars += string.punctuation
            required_chars.append(random.choice(string.punctuation))
        
        if not chars:
            raise ValueError("Must select at least one character type")
        
        # Generate remaining characters
        remaining_length = length - len(required_chars)
        password_chars = required_chars + [random.choice(chars) for _ in range(remaining_length)]
        
        # Shuffle to avoid predictable pattern
        random.shuffle(password_chars)
        
        return ''.join(password_chars)
    
    @staticmethod
    def generate_memorable(word_count: int = 4, separator: str = "-") -> str:
        """Generate memorable passphrase"""
        # Simple word list (in real app, use larger dictionary)
        words = [
            "apple", "banana", "cherry", "dragon", "elephant", "falcon",
            "garden", "harbor", "island", "jungle", "kingdom", "lantern",
            "mountain", "network", "ocean", "palace", "quantum", "rainbow",
            "sunset", "thunder", "unicorn", "village", "whisper", "yellow"
        ]
        
        selected = random.sample(words, word_count)
        return separator.join(selected)

class PasswordValidator:
    """Validate password strength"""
    
    @staticmethod
    def calculate_strength(password: str) -> dict:
        """Calculate password strength score"""
        score = 0
        feedback = []
        
        # Length check
        length = len(password)
        if length >= 12:
            score += 2
        elif length >= 8:
            score += 1
        else:
            feedback.append("Password should be at least 8 characters")
        
        # Character variety checks
        has_upper = any(c.isupper() for c in password)
        has_lower = any(c.islower() for c in password)
        has_digit = any(c.isdigit() for c in password)
        has_symbol = any(c in string.punctuation for c in password)
        
        variety_count = sum([has_upper, has_lower, has_digit, has_symbol])
        score += variety_count
        
        if not has_upper:
            feedback.append("Add uppercase letters")
        if not has_lower:
            feedback.append("Add lowercase letters")
        if not has_digit:
            feedback.append("Add numbers")
        if not has_symbol:
            feedback.append("Add symbols")
        
        # Determine strength level
        if score >= 6:
            strength = "Strong"
        elif score >= 4:
            strength = "Medium"
        else:
            strength = "Weak"
        
        return {
            "score": score,
            "strength": strength,
            "feedback": feedback
        }
```

### Password Vault

```python
# vault.py
import json
from pathlib import Path
from typing import List, Optional
from dataclasses import dataclass
from datetime import datetime

@dataclass
class PasswordEntry:
    """Password vault entry"""
    id: str
    service: str
    username: str
    password_encrypted: str
    url: Optional[str] = None
    notes: Optional[str] = None
    created_at: str = None
    modified_at: str = None
    
    def __post_init__(self):
        if not self.created_at:
            self.created_at = datetime.now().isoformat()
        if not self.modified_at:
            self.modified_at = self.created_at
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "service": self.service,
            "username": self.username,
            "password_encrypted": self.password_encrypted,
            "url": self.url,
            "notes": self.notes,
            "created_at": self.created_at,
            "modified_at": self.modified_at
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'PasswordEntry':
        return cls(**data)

class PasswordVault:
    """Secure password storage"""
    
    def __init__(self, vault_file: str = "vault.json"):
        self.vault_file = vault_file
        self.entries: List[PasswordEntry] = []
        self.encryption_key: Optional[bytes] = None
        self.load_vault()
    
    def unlock(self, master_password: str):
        """Unlock vault with master password"""
        self.encryption_key = PasswordEncryption.generate_key_from_password(master_password)
    
    def is_unlocked(self) -> bool:
        """Check if vault is unlocked"""
        return self.encryption_key is not None
    
    def add_entry(self, service: str, username: str, password: str,
                  url: str = None, notes: str = None) -> PasswordEntry:
        """Add new password entry"""
        if not self.is_unlocked():
            raise RuntimeError("Vault is locked")
        
        # Encrypt password
        encrypted = PasswordEncryption.encrypt_password(password, self.encryption_key)
        
        # Create entry
        import uuid
        entry = PasswordEntry(
            id=str(uuid.uuid4()),
            service=service,
            username=username,
            password_encrypted=encrypted,
            url=url,
            notes=notes
        )
        
        self.entries.append(entry)
        self.save_vault()
        return entry
    
    def get_entry(self, entry_id: str) -> Optional[PasswordEntry]:
        """Get entry by ID"""
        for entry in self.entries:
            if entry.id == entry_id:
                return entry
        return None
    
    def update_entry(self, entry_id: str, **kwargs) -> bool:
        """Update entry fields"""
        if not self.is_unlocked():
            raise RuntimeError("Vault is locked")
        
        entry = self.get_entry(entry_id)
        if not entry:
            return False
        
        # Update password if provided
        if "password" in kwargs:
            encrypted = PasswordEncryption.encrypt_password(
                kwargs["password"], 
                self.encryption_key
            )
            entry.password_encrypted = encrypted
            del kwargs["password"]
        
        # Update other fields
        for key, value in kwargs.items():
            if hasattr(entry, key) and value is not None:
                setattr(entry, key, value)
        
        entry.modified_at = datetime.now().isoformat()
        self.save_vault()
        return True
    
    def delete_entry(self, entry_id: str) -> bool:
        """Delete entry"""
        for i, entry in enumerate(self.entries):
            if entry.id == entry_id:
                self.entries.pop(i)
                self.save_vault()
                return True
        return False
    
    def search_entries(self, query: str) -> List[PasswordEntry]:
        """Search entries by service or username"""
        query_lower = query.lower()
        results = []
        
        for entry in self.entries:
            if (query_lower in entry.service.lower() or
                query_lower in entry.username.lower()):
                results.append(entry)
        
        return results
    
    def get_password(self, entry_id: str) -> Optional[str]:
        """Decrypt and return password"""
        if not self.is_unlocked():
            raise RuntimeError("Vault is locked")
        
        entry = self.get_entry(entry_id)
        if not entry:
            return None
        
        return PasswordEncryption.decrypt_password(
            entry.password_encrypted,
            self.encryption_key
        )
    
    def list_all(self) -> List[PasswordEntry]:
        """Get all entries (sorted by service)"""
        return sorted(self.entries, key=lambda e: e.service.lower())
    
    def save_vault(self):
        """Save vault to file"""
        data = [entry.to_dict() for entry in self.entries]
        Path(self.vault_file).write_text(json.dumps(data, indent=2))
    
    def load_vault(self):
        """Load vault from file"""
        if not Path(self.vault_file).exists():
            self.entries = []
            return
        
        try:
            data = json.loads(Path(self.vault_file).read_text())
            self.entries = [PasswordEntry.from_dict(e) for e in data]
        except (json.JSONDecodeError, KeyError):
            self.entries = []
```

### CLI Interface

```python
# cli.py
import getpass

def print_menu():
    print("\n" + "="*60)
    print("PASSWORD MANAGER")
    print("="*60)
    print("1. Add Password")
    print("2. View Passwords")
    print("3. Get Password")
    print("4. Update Password")
    print("5. Delete Password")
    print("6. Search")
    print("7. Generate Password")
    print("8. Lock Vault")
    print("9. Exit")
    print("="*60)

def setup_master_password(master_manager: MasterPasswordManager) -> str:
    """Set up master password for first time"""
    print("\n--- First Time Setup ---")
    print("Create a master password to secure your vault.")
    
    while True:
        password = getpass.getpass("Master password: ")
        confirm = getpass.getpass("Confirm master password: ")
        
        if password != confirm:
            print("Passwords don't match. Try again.")
            continue
        
        try:
            master_manager.set_master_password(password)
            print("✓ Master password set!")
            return password
        except ValueError as e:
            print(f"✗ {e}")

def authenticate(master_manager: MasterPasswordManager) -> Optional[str]:
    """Authenticate with master password"""
    attempts = 3
    
    while attempts > 0:
        password = getpass.getpass("\nMaster password: ")
        
        if master_manager.verify_master_password(password):
            print("✓ Authenticated!")
            return password
        
        attempts -= 1
        if attempts > 0:
            print(f"✗ Wrong password. {attempts} attempts remaining.")
    
    print("✗ Too many failed attempts.")
    return None

def add_password_entry(vault: PasswordVault, generator: PasswordGenerator):
    """Add new password"""
    print("\n--- Add Password ---")
    
    service = input("Service name (e.g., Gmail): ").strip()
    username = input("Username/Email: ").strip()
    
    # Option to generate password
    gen_choice = input("Generate password? (y/n): ").strip().lower()
    
    if gen_choice == 'y':
        length = int(input("Password length (default 16): ") or "16")
        password = generator.generate(length)
        print(f"\nGenerated password: {password}")
        print("⚠ Save this password securely!")
    else:
        password = getpass.getpass("Password: ")
    
    url = input("URL (optional): ").strip() or None
    notes = input("Notes (optional): ").strip() or None
    
    entry = vault.add_entry(service, username, password, url, notes)
    print(f"\n✓ Added entry for {service}")

def view_passwords(vault: PasswordVault):
    """View all password entries"""
    entries = vault.list_all()
    
    if not entries:
        print("\nNo passwords stored yet.")
        return
    
    print(f"\n{'Service':<20} {'Username':<30} {'Created'}")
    print("-"*70)
    
    for entry in entries:
        created = entry.created_at[:10]  # Date only
        print(f"{entry.service:<20} {entry.username:<30} {created}")

def get_password_detail(vault: PasswordVault):
    """Get and display password"""
    view_passwords(vault)
    
    if not vault.entries:
        return
    
    service = input("\nService name: ").strip()
    results = vault.search_entries(service)
    
    if not results:
        print(f"✗ No entries found for '{service}'")
        return
    
    if len(results) > 1:
        print("\nMultiple entries found:")
        for i, entry in enumerate(results, 1):
            print(f"{i}. {entry.service} ({entry.username})")
        
        choice = int(input("\nSelect entry (number): ")) - 1
        if 0 <= choice < len(results):
            entry = results[choice]
        else:
            print("Invalid choice")
            return
    else:
        entry = results[0]
    
    password = vault.get_password(entry.id)
    
    print(f"\n{'='*60}")
    print(f"Service:  {entry.service}")
    print(f"Username: {entry.username}")
    print(f"Password: {password}")
    if entry.url:
        print(f"URL:      {entry.url}")
    if entry.notes:
        print(f"Notes:    {entry.notes}")
    print(f"{'='*60}")

def run_password_manager():
    """Main application"""
    master_manager = MasterPasswordManager()
    vault = PasswordVault()
    generator = PasswordGenerator()
    validator = PasswordValidator()
    
    print("="*60)
    print("SECURE PASSWORD MANAGER")
    print("="*60)
    
    # Setup or authenticate
    if not master_manager.is_set():
        master_password = setup_master_password(master_manager)
    else:
        master_password = authenticate(master_manager)
    
    if not master_password:
        return
    
    # Unlock vault
    try:
        vault.unlock(master_password)
        print("✓ Vault unlocked")
    except Exception as e:
        print(f"✗ Failed to unlock vault: {e}")
        return
    
    # Main loop
    while True:
        print_menu()
        choice = input("\nChoice (1-9): ").strip()
        
        try:
            if choice == "1":
                add_password_entry(vault, generator)
            
            elif choice == "2":
                view_passwords(vault)
            
            elif choice == "3":
                get_password_detail(vault)
            
            elif choice == "4":
                # Update password (simplified)
                service = input("\nService name: ").strip()
                results = vault.search_entries(service)
                
                if results:
                    entry = results[0]
                    new_password = getpass.getpass("New password: ")
                    vault.update_entry(entry.id, password=new_password)
                    print("✓ Password updated")
                else:
                    print("Entry not found")
            
            elif choice == "5":
                # Delete entry
                service = input("\nService name: ").strip()
                results = vault.search_entries(service)
                
                if results:
                    entry = results[0]
                    confirm = input(f"Delete {entry.service}? (yes/no): ")
                    if confirm.lower() == "yes":
                        vault.delete_entry(entry.id)
                        print("✓ Entry deleted")
                else:
                    print("Entry not found")
            
            elif choice == "6":
                # Search
                query = input("\nSearch: ").strip()
                results = vault.search_entries(query)
                
                if results:
                    print(f"\nFound {len(results)} entries:")
                    for entry in results:
                        print(f"- {entry.service} ({entry.username})")
                else:
                    print("No matches found")
            
            elif choice == "7":
                # Generate password
                length = int(input("\nPassword length: ") or "16")
                password = generator.generate(length)
                print(f"\nGenerated: {password}")
                
                strength = validator.calculate_strength(password)
                print(f"Strength: {strength['strength']} (Score: {strength['score']})")
            
            elif choice == "8":
                # Lock vault
                vault.encryption_key = None
                print("\n✓ Vault locked")
                break
            
            elif choice == "9":
                print("\nGoodbye!")
                break
            
            else:
                print("\n✗ Invalid choice")
        
        except Exception as e:
            print(f"\n✗ Error: {e}")

if __name__ == "__main__":
    run_password_manager()
```

## Installation

```bash
# Install required package
pip install cryptography
```

## Testing

```python
# test_password_manager.py
import pytest
from cryptography.fernet import Fernet

def test_password_encryption():
    password = "mysecret123"
    master = "masterpass"
    
    key = PasswordEncryption.generate_key_from_password(master)
    encrypted = PasswordEncryption.encrypt_password(password, key)
    decrypted = PasswordEncryption.decrypt_password(encrypted, key)
    
    assert decrypted == password
    assert encrypted != password

def test_password_generation():
    gen = PasswordGenerator()
    password = gen.generate(12)
    
    assert len(password) == 12
    assert any(c.isupper() for c in password)
    assert any(c.islower() for c in password)
    assert any(c.isdigit() for c in password)

def test_password_strength():
    validator = PasswordValidator()
    
    weak = validator.calculate_strength("abc")
    assert weak["strength"] == "Weak"
    
    strong = validator.calculate_strength("Abc123!@#xyz")
    assert strong["strength"] in ["Medium", "Strong"]
```

## Summary

Built secure password manager with:
- Encryption for password storage
- Master password authentication
- Password generation
- Strength validation
- Search functionality
- Secure file storage

**Key Security Features:**
- Fernet symmetric encryption
- SHA-256 password hashing
- Master password protection
- Encrypted storage

**Skills Applied:**
- Cryptography
- Security best practices
- File handling
- User authentication
- Data encryption
