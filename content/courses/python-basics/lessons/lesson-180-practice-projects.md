---
id: practice-projects
title: Practice Projects
chapterId: ch13-practice
order: 42
duration: 60
objectives:
  - Apply all Python fundamentals to real projects
  - Build a number guessing game
  - Create a to-do list manager
  - Implement a word counter
  - Practice problem-solving skills
---

# Practice Projects

Now that you've learned Python fundamentals, it's time to build complete projects that combine everything you've learned. These projects will solidify your skills and give you confidence.

## Project 1: Number Guessing Game

Build a game where the computer picks a random number and the player tries to guess it.

### Requirements
- Computer picks random number between 1-100
- Player gets unlimited guesses
- After each guess, tell player if too high or too low
- Count number of guesses
- Ask if player wants to play again

### Solution

```python
import random

def number_guessing_game():
    """Number guessing game"""
    print("Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100.")
    
    # Generate random number
    secret_number = random.randint(1, 100)
    guesses = 0
    
    while True:
        # Get player's guess
        try:
            guess = int(input("Enter your guess: "))
        except ValueError:
            print("Please enter a valid number!")
            continue
        
        guesses += 1
        
        # Check guess
        if guess < secret_number:
            print("Too low! Try again.")
        elif guess > secret_number:
            print("Too high! Try again.")
        else:
            print(f"Congratulations! You guessed it in {guesses} guesses!")
            break
    
    # Ask to play again
    play_again = input("Play again? (yes/no): ").lower()
    if play_again == "yes":
        number_guessing_game()
    else:
        print("Thanks for playing!")

# Run the game
if __name__ == "__main__":
    number_guessing_game()
```

### Enhancements
- Add difficulty levels (easy: 1-50, hard: 1-200)
- Limit number of guesses
- Track high scores
- Add hints after 5 guesses

## Project 2: To-Do List Manager

Create a command-line to-do list application.

### Requirements
- Add tasks
- View all tasks
- Mark tasks as complete
- Delete tasks
- Save/load tasks from file

### Solution

```python
import json

class TodoList:
    """Simple to-do list manager"""
    
    def __init__(self, filename="todos.json"):
        self.filename = filename
        self.tasks = self.load_tasks()
    
    def load_tasks(self):
        """Load tasks from file"""
        try:
            with open(self.filename, 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            return []
    
    def save_tasks(self):
        """Save tasks to file"""
        with open(self.filename, 'w') as file:
            json.dump(self.tasks, file, indent=2)
    
    def add_task(self, description):
        """Add new task"""
        task = {
            "id": len(self.tasks) + 1,
            "description": description,
            "completed": False
        }
        self.tasks.append(task)
        self.save_tasks()
        print(f"Added task: {description}")
    
    def view_tasks(self):
        """Display all tasks"""
        if not self.tasks:
            print("No tasks yet!")
            return
        
        print("\nYour Tasks:")
        for task in self.tasks:
            status = "✓" if task["completed"] else " "
            print(f"[{status}] {task['id']}. {task['description']}")
        print()
    
    def complete_task(self, task_id):
        """Mark task as complete"""
        for task in self.tasks:
            if task["id"] == task_id:
                task["completed"] = True
                self.save_tasks()
                print(f"Completed: {task['description']}")
                return
        print("Task not found!")
    
    def delete_task(self, task_id):
        """Delete task"""
        for i, task in enumerate(self.tasks):
            if task["id"] == task_id:
                deleted = self.tasks.pop(i)
                self.save_tasks()
                print(f"Deleted: {deleted['description']}")
                return
        print("Task not found!")
    
    def run(self):
        """Main program loop"""
        while True:
            print("\n=== To-Do List Manager ===")
            print("1. View tasks")
            print("2. Add task")
            print("3. Complete task")
            print("4. Delete task")
            print("5. Exit")
            
            choice = input("\nEnter choice (1-5): ")
            
            if choice == "1":
                self.view_tasks()
            elif choice == "2":
                description = input("Enter task description: ")
                self.add_task(description)
            elif choice == "3":
                self.view_tasks()
                try:
                    task_id = int(input("Enter task ID to complete: "))
                    self.complete_task(task_id)
                except ValueError:
                    print("Invalid ID!")
            elif choice == "4":
                self.view_tasks()
                try:
                    task_id = int(input("Enter task ID to delete: "))
                    self.delete_task(task_id)
                except ValueError:
                    print("Invalid ID!")
            elif choice == "5":
                print("Goodbye!")
                break
            else:
                print("Invalid choice!")

# Run the app
if __name__ == "__main__":
    app = TodoList()
    app.run()
```

### Enhancements
- Add due dates
- Priority levels (high, medium, low)
- Categories/tags
- Search functionality
- Export to CSV

## Project 3: Word Counter

Analyze text files and count word frequencies.

### Requirements
- Read text from file or user input
- Count total words
- Count unique words
- Show most common words
- Calculate average word length

### Solution

```python
from collections import Counter
import re

def word_counter(text):
    """Analyze text and count words"""
    # Clean and split text
    words = re.findall(r'\b\w+\b', text.lower())
    
    if not words:
        print("No words found!")
        return
    
    # Calculate statistics
    total_words = len(words)
    unique_words = len(set(words))
    word_counts = Counter(words)
    avg_length = sum(len(word) for word in words) / total_words
    
    # Display results
    print("\n=== Word Analysis ===")
    print(f"Total words: {total_words}")
    print(f"Unique words: {unique_words}")
    print(f"Average word length: {avg_length:.2f} characters")
    
    # Top 10 most common words
    print("\nTop 10 most common words:")
    for word, count in word_counts.most_common(10):
        percentage = (count / total_words) * 100
        print(f"  {word}: {count} ({percentage:.1f}%)")
    
    return {
        "total_words": total_words,
        "unique_words": unique_words,
        "word_counts": word_counts,
        "avg_length": avg_length
    }

def read_from_file(filename):
    """Read text from file"""
    try:
        with open(filename, 'r') as file:
            return file.read()
    except FileNotFoundError:
        print(f"File {filename} not found!")
        return None

def main():
    """Main program"""
    print("=== Word Counter ===")
    print("1. Analyze text from file")
    print("2. Enter text directly")
    
    choice = input("\nChoose option (1-2): ")
    
    if choice == "1":
        filename = input("Enter filename: ")
        text = read_from_file(filename)
        if text:
            word_counter(text)
    elif choice == "2":
        print("Enter text (press Ctrl+D or Ctrl+Z when done):")
        lines = []
        try:
            while True:
                line = input()
                lines.append(line)
        except EOFError:
            text = "\n".join(lines)
            word_counter(text)
    else:
        print("Invalid choice!")

if __name__ == "__main__":
    main()
```

### Enhancements
- Ignore common stop words
- Find longest/shortest words
- Count sentences and paragraphs
- Reading level analysis
- Save report to file

## Project 4: Simple Calculator

Build an interactive calculator with history.

### Solution

```python
class Calculator:
    """Simple calculator with history"""
    
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        """Addition"""
        result = a + b
        self.record_operation(f"{a} + {b} = {result}")
        return result
    
    def subtract(self, a, b):
        """Subtraction"""
        result = a - b
        self.record_operation(f"{a} - {b} = {result}")
        return result
    
    def multiply(self, a, b):
        """Multiplication"""
        result = a * b
        self.record_operation(f"{a} × {b} = {result}")
        return result
    
    def divide(self, a, b):
        """Division"""
        try:
            result = a / b
            self.record_operation(f"{a} ÷ {b} = {result}")
            return result
        except ZeroDivisionError:
            print("Error: Cannot divide by zero!")
            return None
    
    def power(self, a, b):
        """Exponentiation"""
        result = a ** b
        self.record_operation(f"{a} ^ {b} = {result}")
        return result
    
    def record_operation(self, operation):
        """Add operation to history"""
        self.history.append(operation)
    
    def show_history(self):
        """Display calculation history"""
        if not self.history:
            print("No history yet!")
            return
        
        print("\n=== Calculation History ===")
        for i, operation in enumerate(self.history, 1):
            print(f"{i}. {operation}")
        print()
    
    def clear_history(self):
        """Clear calculation history"""
        self.history = []
        print("History cleared!")
    
    def run(self):
        """Main calculator loop"""
        print("=== Simple Calculator ===")
        
        while True:
            print("\nOperations:")
            print("1. Add")
            print("2. Subtract")
            print("3. Multiply")
            print("4. Divide")
            print("5. Power")
            print("6. Show history")
            print("7. Clear history")
            print("8. Exit")
            
            choice = input("\nChoose operation (1-8): ")
            
            if choice in ["1", "2", "3", "4", "5"]:
                try:
                    a = float(input("Enter first number: "))
                    b = float(input("Enter second number: "))
                    
                    if choice == "1":
                        result = self.add(a, b)
                    elif choice == "2":
                        result = self.subtract(a, b)
                    elif choice == "3":
                        result = self.multiply(a, b)
                    elif choice == "4":
                        result = self.divide(a, b)
                    elif choice == "5":
                        result = self.power(a, b)
                    
                    if result is not None:
                        print(f"Result: {result}")
                
                except ValueError:
                    print("Invalid input! Please enter numbers.")
            
            elif choice == "6":
                self.show_history()
            elif choice == "7":
                self.clear_history()
            elif choice == "8":
                print("Goodbye!")
                break
            else:
                print("Invalid choice!")

if __name__ == "__main__":
    calc = Calculator()
    calc.run()
```

## Key Learning Points

Through these projects, you've practiced:

1. **Variables and Data Types**
   - Storing game state, user input, calculations

2. **Control Flow**
   - if-elif-else for decisions
   - while loops for game/menu loops
   - try-except for error handling

3. **Functions**
   - Organizing code into reusable pieces
   - Parameters and return values

4. **Data Structures**
   - Lists for storing tasks/history
   - Dictionaries for structured data
   - Sets for unique items

5. **File Operations**
   - Reading from files
   - Writing/saving data
   - JSON for structured storage

6. **Error Handling**
   - Validating user input
   - Handling file errors
   - Graceful failure

## Next Steps

Continue practicing by:
- Adding features to these projects
- Building your own projects
- Learning more advanced Python topics
- Contributing to open-source projects
- Building web applications with Flask/Django
- Exploring data science with pandas/numpy

## Congratulations!

You've completed the Python Basics course and built real working projects. You now have a solid foundation in Python programming!

Keep coding, keep learning, and most importantly - keep building!
