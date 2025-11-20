---
id: "166-expense-tracker"
title: "Personal Expense Tracker"
chapterId: ch13-practice
order: 3
duration: 30
objectives:
  - Track income and expenses
  - Calculate budgets
  - Generate financial reports
  - Analyze spending patterns
---

# Personal Expense Tracker

Build an expense tracking application to manage personal finances.

## Project Overview

Create an expense tracker that can:
- Record income and expenses
- Categorize transactions
- Set budgets for categories
- Generate monthly reports
- Analyze spending trends

## Core Data Models

### Transaction Class

```python
# transaction.py
from dataclasses import dataclass
from datetime import datetime
from enum import Enum

class TransactionType(Enum):
    """Transaction types"""
    INCOME = "income"
    EXPENSE = "expense"

@dataclass
class Transaction:
    """Represents a financial transaction"""
    id: str
    type: TransactionType
    amount: float
    category: str
    description: str
    date: datetime
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "id": self.id,
            "type": self.type.value,
            "amount": self.amount,
            "category": self.category,
            "description": self.description,
            "date": self.date.isoformat()
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'Transaction':
        """Create from dictionary"""
        return cls(
            id=data["id"],
            type=TransactionType(data["type"]),
            amount=float(data["amount"]),
            category=data["category"],
            description=data["description"],
            date=datetime.fromisoformat(data["date"])
        )

@dataclass
class Budget:
    """Monthly budget for a category"""
    category: str
    amount: float
    month: str  # Format: "YYYY-MM"
    
    def to_dict(self) -> dict:
        return {
            "category": self.category,
            "amount": self.amount,
            "month": self.month
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'Budget':
        return cls(
            category=data["category"],
            amount=float(data["amount"]),
            month=data["month"]
        )
```

### Expense Tracker

```python
# expense_tracker.py
import json
import uuid
from pathlib import Path
from typing import List, Dict
from datetime import datetime
from collections import defaultdict

class ExpenseTracker:
    """Manage income and expenses"""
    
    def __init__(self, data_file: str = "expenses.json"):
        self.data_file = data_file
        self.transactions: List[Transaction] = []
        self.budgets: List[Budget] = []
        self.load_data()
    
    def add_transaction(self, 
                       type: TransactionType,
                       amount: float,
                       category: str,
                       description: str,
                       date: datetime = None) -> Transaction:
        """Add new transaction"""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        
        if not category:
            raise ValueError("Category is required")
        
        transaction = Transaction(
            id=str(uuid.uuid4()),
            type=type,
            amount=amount,
            category=category,
            description=description,
            date=date or datetime.now()
        )
        
        self.transactions.append(transaction)
        self.save_data()
        return transaction
    
    def remove_transaction(self, transaction_id: str) -> bool:
        """Remove transaction by ID"""
        for i, trans in enumerate(self.transactions):
            if trans.id == transaction_id:
                self.transactions.pop(i)
                self.save_data()
                return True
        return False
    
    def get_transactions(self,
                        type: TransactionType = None,
                        category: str = None,
                        start_date: datetime = None,
                        end_date: datetime = None) -> List[Transaction]:
        """Get filtered transactions"""
        results = self.transactions.copy()
        
        if type:
            results = [t for t in results if t.type == type]
        
        if category:
            results = [t for t in results if t.category == category]
        
        if start_date:
            results = [t for t in results if t.date >= start_date]
        
        if end_date:
            results = [t for t in results if t.date <= end_date]
        
        return sorted(results, key=lambda t: t.date, reverse=True)
    
    def set_budget(self, category: str, amount: float, month: str = None):
        """Set monthly budget for category"""
        if amount <= 0:
            raise ValueError("Budget amount must be positive")
        
        if not month:
            month = datetime.now().strftime("%Y-%m")
        
        # Remove existing budget for this category/month
        self.budgets = [b for b in self.budgets 
                       if not (b.category == category and b.month == month)]
        
        budget = Budget(category, amount, month)
        self.budgets.append(budget)
        self.save_data()
        return budget
    
    def get_budget(self, category: str, month: str = None) -> Budget:
        """Get budget for category and month"""
        if not month:
            month = datetime.now().strftime("%Y-%m")
        
        for budget in self.budgets:
            if budget.category == category and budget.month == month:
                return budget
        
        return None
    
    def calculate_balance(self) -> float:
        """Calculate total balance (income - expenses)"""
        income = sum(t.amount for t in self.transactions 
                    if t.type == TransactionType.INCOME)
        expenses = sum(t.amount for t in self.transactions 
                      if t.type == TransactionType.EXPENSE)
        return income - expenses
    
    def get_spending_by_category(self, month: str = None) -> Dict[str, float]:
        """Get spending totals by category"""
        if not month:
            month = datetime.now().strftime("%Y-%m")
        
        spending = defaultdict(float)
        
        for trans in self.transactions:
            if trans.type == TransactionType.EXPENSE:
                trans_month = trans.date.strftime("%Y-%m")
                if trans_month == month:
                    spending[trans.category] += trans.amount
        
        return dict(spending)
    
    def get_budget_status(self, month: str = None) -> List[Dict]:
        """Get budget vs actual spending"""
        if not month:
            month = datetime.now().strftime("%Y-%m")
        
        spending = self.get_spending_by_category(month)
        status = []
        
        for budget in self.budgets:
            if budget.month == month:
                spent = spending.get(budget.category, 0)
                remaining = budget.amount - spent
                percentage = (spent / budget.amount * 100) if budget.amount > 0 else 0
                
                status.append({
                    "category": budget.category,
                    "budget": budget.amount,
                    "spent": spent,
                    "remaining": remaining,
                    "percentage": percentage,
                    "over_budget": spent > budget.amount
                })
        
        return status
    
    def get_categories(self, type: TransactionType = None) -> List[str]:
        """Get unique categories"""
        categories = set()
        
        for trans in self.transactions:
            if type is None or trans.type == type:
                categories.add(trans.category)
        
        return sorted(categories)
    
    def save_data(self):
        """Save to JSON file"""
        data = {
            "transactions": [t.to_dict() for t in self.transactions],
            "budgets": [b.to_dict() for b in self.budgets]
        }
        
        with open(self.data_file, 'w') as f:
            json.dump(data, f, indent=2)
    
    def load_data(self):
        """Load from JSON file"""
        if not Path(self.data_file).exists():
            self.transactions = []
            self.budgets = []
            return
        
        try:
            with open(self.data_file, 'r') as f:
                data = json.load(f)
                self.transactions = [Transaction.from_dict(t) 
                                   for t in data.get("transactions", [])]
                self.budgets = [Budget.from_dict(b) 
                              for b in data.get("budgets", [])]
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Warning: Could not load data: {e}")
            self.transactions = []
            self.budgets = []
```

### Report Generator

```python
# reports.py
from typing import List
from datetime import datetime, timedelta

class ReportGenerator:
    """Generate financial reports"""
    
    def __init__(self, tracker: ExpenseTracker):
        self.tracker = tracker
    
    def monthly_summary(self, month: str = None) -> str:
        """Generate monthly summary report"""
        if not month:
            month = datetime.now().strftime("%Y-%m")
        
        # Get transactions for month
        start = datetime.strptime(month, "%Y-%m")
        if start.month == 12:
            end = datetime(start.year + 1, 1, 1)
        else:
            end = datetime(start.year, start.month + 1, 1)
        
        transactions = self.tracker.get_transactions(
            start_date=start,
            end_date=end
        )
        
        # Calculate totals
        income = sum(t.amount for t in transactions 
                    if t.type == TransactionType.INCOME)
        expenses = sum(t.amount for t in transactions 
                      if t.type == TransactionType.EXPENSE)
        balance = income - expenses
        
        # Build report
        report = f"\n{'='*60}\n"
        report += f"MONTHLY SUMMARY - {month}\n"
        report += f"{'='*60}\n\n"
        report += f"Total Income:    ${income:>10.2f}\n"
        report += f"Total Expenses:  ${expenses:>10.2f}\n"
        report += f"{'-'*60}\n"
        report += f"Net Balance:     ${balance:>10.2f}\n\n"
        
        # Spending by category
        spending = self.tracker.get_spending_by_category(month)
        if spending:
            report += f"Spending by Category:\n"
            report += f"{'-'*60}\n"
            for category, amount in sorted(spending.items(), 
                                          key=lambda x: x[1], 
                                          reverse=True):
                percentage = (amount / expenses * 100) if expenses > 0 else 0
                report += f"{category:<30} ${amount:>10.2f} ({percentage:>5.1f}%)\n"
        
        # Budget status
        budget_status = self.tracker.get_budget_status(month)
        if budget_status:
            report += f"\nBudget Status:\n"
            report += f"{'-'*60}\n"
            for status in budget_status:
                report += f"\n{status['category']}:\n"
                report += f"  Budget:    ${status['budget']:>10.2f}\n"
                report += f"  Spent:     ${status['spent']:>10.2f}\n"
                report += f"  Remaining: ${status['remaining']:>10.2f}\n"
                
                if status['over_budget']:
                    report += f"  ⚠ OVER BUDGET by ${abs(status['remaining']):.2f}!\n"
                else:
                    report += f"  ✓ {100 - status['percentage']:.1f}% remaining\n"
        
        report += f"\n{'='*60}\n"
        return report
    
    def category_analysis(self, category: str, months: int = 3) -> str:
        """Analyze spending in category over time"""
        report = f"\n{'='*60}\n"
        report += f"CATEGORY ANALYSIS: {category}\n"
        report += f"{'='*60}\n\n"
        
        current = datetime.now()
        monthly_totals = []
        
        for i in range(months):
            # Calculate month
            month_date = datetime(current.year, current.month, 1) - timedelta(days=i*30)
            month_str = month_date.strftime("%Y-%m")
            
            # Get spending
            spending = self.tracker.get_spending_by_category(month_str)
            amount = spending.get(category, 0)
            monthly_totals.append((month_str, amount))
        
        # Display results
        monthly_totals.reverse()
        total = 0
        
        for month, amount in monthly_totals:
            report += f"{month}: ${amount:>10.2f}\n"
            total += amount
        
        average = total / len(monthly_totals)
        report += f"\n{'-'*60}\n"
        report += f"Total:   ${total:>10.2f}\n"
        report += f"Average: ${average:>10.2f}\n"
        report += f"{'='*60}\n"
        
        return report
    
    def recent_transactions(self, count: int = 10) -> str:
        """Show recent transactions"""
        transactions = self.tracker.get_transactions()[:count]
        
        report = f"\n{'='*60}\n"
        report += f"RECENT TRANSACTIONS (Last {count})\n"
        report += f"{'='*60}\n\n"
        
        for trans in transactions:
            date_str = trans.date.strftime("%Y-%m-%d")
            type_str = "+" if trans.type == TransactionType.INCOME else "-"
            
            report += f"{date_str} | {type_str}${trans.amount:>8.2f} | "
            report += f"{trans.category:<15} | {trans.description}\n"
        
        report += f"{'='*60}\n"
        return report
```

### Command-Line Interface

```python
# cli.py
def print_main_menu():
    print("\n" + "="*60)
    print("EXPENSE TRACKER")
    print("="*60)
    print("1. Add Income")
    print("2. Add Expense")
    print("3. View Transactions")
    print("4. Set Budget")
    print("5. Monthly Summary")
    print("6. Category Analysis")
    print("7. Budget Status")
    print("8. Exit")
    print("="*60)

def add_income(tracker: ExpenseTracker):
    """Add income transaction"""
    print("\n--- Add Income ---")
    amount = float(input("Amount: $"))
    category = input("Category (e.g., Salary, Freelance): ")
    description = input("Description: ")
    
    tracker.add_transaction(
        TransactionType.INCOME,
        amount,
        category,
        description
    )
    print(f"✓ Added income: ${amount:.2f}")

def add_expense(tracker: ExpenseTracker):
    """Add expense transaction"""
    print("\n--- Add Expense ---")
    amount = float(input("Amount: $"))
    category = input("Category (e.g., Food, Transport, Rent): ")
    description = input("Description: ")
    
    tracker.add_transaction(
        TransactionType.EXPENSE,
        amount,
        category,
        description
    )
    print(f"✓ Added expense: ${amount:.2f}")

def view_transactions(tracker: ExpenseTracker):
    """View recent transactions"""
    print("\n--- Filter Transactions ---")
    print("1. All")
    print("2. Income Only")
    print("3. Expenses Only")
    print("4. By Category")
    
    choice = input("\nChoice (1-4): ").strip()
    
    if choice == "1":
        transactions = tracker.get_transactions()
    elif choice == "2":
        transactions = tracker.get_transactions(type=TransactionType.INCOME)
    elif choice == "3":
        transactions = tracker.get_transactions(type=TransactionType.EXPENSE)
    elif choice == "4":
        category = input("Category: ").strip()
        transactions = tracker.get_transactions(category=category)
    else:
        print("Invalid choice")
        return
    
    if not transactions:
        print("\nNo transactions found.")
        return
    
    print(f"\n{'Date':<12} {'Type':<8} {'Amount':<12} {'Category':<15} {'Description'}")
    print("-"*70)
    
    for trans in transactions[:20]:  # Show last 20
        date_str = trans.date.strftime("%Y-%m-%d")
        type_str = "Income" if trans.type == TransactionType.INCOME else "Expense"
        
        print(f"{date_str:<12} {type_str:<8} ${trans.amount:<11.2f} "
              f"{trans.category:<15} {trans.description}")

def set_budget(tracker: ExpenseTracker):
    """Set category budget"""
    print("\n--- Set Budget ---")
    category = input("Category: ")
    amount = float(input("Monthly Budget: $"))
    
    tracker.set_budget(category, amount)
    print(f"✓ Set budget for {category}: ${amount:.2f}")

def show_budget_status(tracker: ExpenseTracker):
    """Display budget status"""
    status = tracker.get_budget_status()
    
    if not status:
        print("\nNo budgets set.")
        return
    
    print("\n--- Budget Status ---")
    for item in status:
        print(f"\n{item['category']}:")
        print(f"  Budget:    ${item['budget']:.2f}")
        print(f"  Spent:     ${item['spent']:.2f}")
        print(f"  Remaining: ${item['remaining']:.2f}")
        print(f"  Used:      {item['percentage']:.1f}%")
        
        if item['over_budget']:
            print(f"  ⚠ OVER BUDGET!")

def run_expense_tracker():
    """Main application loop"""
    tracker = ExpenseTracker()
    reporter = ReportGenerator(tracker)
    
    while True:
        print_main_menu()
        choice = input("\nChoice (1-8): ").strip()
        
        try:
            if choice == "1":
                add_income(tracker)
            elif choice == "2":
                add_expense(tracker)
            elif choice == "3":
                view_transactions(tracker)
            elif choice == "4":
                set_budget(tracker)
            elif choice == "5":
                report = reporter.monthly_summary()
                print(report)
            elif choice == "6":
                category = input("\nCategory: ").strip()
                report = reporter.category_analysis(category)
                print(report)
            elif choice == "7":
                show_budget_status(tracker)
            elif choice == "8":
                print("\nGoodbye!")
                break
            else:
                print("\n✗ Invalid choice")
        
        except ValueError as e:
            print(f"\n✗ Error: {e}")
        except KeyboardInterrupt:
            print("\n\nGoodbye!")
            break

if __name__ == "__main__":
    run_expense_tracker()
```

## Testing

```python
# test_expense_tracker.py
import pytest
from datetime import datetime

def test_add_income(tmp_path):
    tracker = ExpenseTracker(str(tmp_path / "test.json"))
    
    trans = tracker.add_transaction(
        TransactionType.INCOME,
        1000.0,
        "Salary",
        "Monthly salary"
    )
    
    assert trans.amount == 1000.0
    assert trans.type == TransactionType.INCOME

def test_calculate_balance(tmp_path):
    tracker = ExpenseTracker(str(tmp_path / "test.json"))
    
    tracker.add_transaction(TransactionType.INCOME, 2000, "Salary", "")
    tracker.add_transaction(TransactionType.EXPENSE, 500, "Rent", "")
    tracker.add_transaction(TransactionType.EXPENSE, 200, "Food", "")
    
    balance = tracker.calculate_balance()
    assert balance == 1300.0  # 2000 - 500 - 200

def test_budget_tracking(tmp_path):
    tracker = ExpenseTracker(str(tmp_path / "test.json"))
    month = datetime.now().strftime("%Y-%m")
    
    tracker.set_budget("Food", 500.0, month)
    tracker.add_transaction(TransactionType.EXPENSE, 300, "Food", "Groceries")
    
    budget = tracker.get_budget("Food", month)
    assert budget.amount == 500.0
    
    status = tracker.get_budget_status(month)
    assert len(status) == 1
    assert status[0]["spent"] == 300.0
    assert status[0]["remaining"] == 200.0
```

## Summary

Built comprehensive expense tracking system with:
- Income/expense recording
- Category budgeting
- Monthly reports
- Spending analysis
- Budget alerts
- Data persistence

**Skills Applied:**
- Enums for type safety
- Date/time handling
- Data aggregation
- Report generation
- File persistence
