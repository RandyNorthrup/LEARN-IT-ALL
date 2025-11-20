---
id: "174-habit-tracker"
title: "Habit Tracker with Streaks"
chapterId: ch13-practice
order: 11
duration: 30
objectives:
  - Build habit tracking system
  - Calculate streaks and statistics
  - Track multiple habits
  - Generate progress reports
---

# Habit Tracker with Streaks

Build a comprehensive habit tracking system with streak calculation and analytics.

## Project Overview

Create habit tracker that:
- Tracks daily habits
- Calculates current/longest streaks
- Generates progress statistics
- Provides motivational insights
- Exports data

## Data Models

```python
# models.py
from dataclasses import dataclass, field
from datetime import date, datetime, timedelta
from typing import List, Set, Dict, Optional
from enum import Enum
import uuid

class HabitFrequency(Enum):
    """How often habit should be done"""
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"

class HabitCategory(Enum):
    """Habit categories"""
    HEALTH = "health"
    PRODUCTIVITY = "productivity"
    LEARNING = "learning"
    SOCIAL = "social"
    FINANCE = "finance"
    OTHER = "other"

@dataclass
class Habit:
    """Habit definition"""
    id: str
    name: str
    description: str
    category: HabitCategory
    frequency: HabitFrequency
    target_days_per_week: int  # For weekly habits
    created_date: date
    is_active: bool = True
    
    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())
    
    def should_do_today(self, completed_dates: Set[date]) -> bool:
        """Check if habit should be done today"""
        today = date.today()
        
        if self.frequency == HabitFrequency.DAILY:
            return today not in completed_dates
        
        elif self.frequency == HabitFrequency.WEEKLY:
            # Check this week's progress
            week_start = today - timedelta(days=today.weekday())
            week_dates = [week_start + timedelta(days=i) for i in range(7)]
            completed_this_week = sum(1 for d in week_dates if d in completed_dates)
            return completed_this_week < self.target_days_per_week
        
        elif self.frequency == HabitFrequency.MONTHLY:
            # Once per month
            month_dates = [d for d in completed_dates 
                          if d.year == today.year and d.month == today.month]
            return len(month_dates) == 0
        
        return True

@dataclass
class HabitEntry:
    """Single habit completion entry"""
    id: str
    habit_id: str
    completion_date: date
    completion_time: datetime
    notes: str = ""
    
    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())

@dataclass
class HabitStreak:
    """Streak information"""
    current_streak: int
    longest_streak: int
    current_streak_start: Optional[date]
    longest_streak_start: Optional[date]
    longest_streak_end: Optional[date]
    
    def is_streak_alive(self) -> bool:
        """Check if current streak is still active"""
        if not self.current_streak_start:
            return False
        
        # Streak alive if completed today or yesterday
        today = date.today()
        yesterday = today - timedelta(days=1)
        
        days_since_start = (today - self.current_streak_start).days
        return days_since_start == self.current_streak - 1 or days_since_start == self.current_streak

@dataclass
class HabitStatistics:
    """Habit statistics"""
    habit_id: str
    total_completions: int
    completion_rate: float  # Percentage
    current_streak: int
    longest_streak: int
    average_per_week: float
    days_tracked: int
    first_completion: Optional[date]
    last_completion: Optional[date]
    best_day_of_week: Optional[str]  # Monday, Tuesday, etc.
```

## Streak Calculator

```python
# streak_calculator.py
from datetime import date, timedelta
from typing import Set, List, Tuple

class StreakCalculator:
    """Calculate habit streaks"""
    
    @staticmethod
    def calculate_streaks(completion_dates: Set[date]) -> HabitStreak:
        """Calculate current and longest streaks"""
        if not completion_dates:
            return HabitStreak(
                current_streak=0,
                longest_streak=0,
                current_streak_start=None,
                longest_streak_start=None,
                longest_streak_end=None
            )
        
        # Sort dates
        sorted_dates = sorted(completion_dates)
        
        # Calculate all streaks
        streaks = []
        current_streak_dates = [sorted_dates[0]]
        
        for i in range(1, len(sorted_dates)):
            prev_date = sorted_dates[i - 1]
            curr_date = sorted_dates[i]
            
            # Check if consecutive days
            if (curr_date - prev_date).days == 1:
                current_streak_dates.append(curr_date)
            else:
                # End of streak
                if current_streak_dates:
                    streaks.append((current_streak_dates[0], current_streak_dates[-1]))
                current_streak_dates = [curr_date]
        
        # Add last streak
        if current_streak_dates:
            streaks.append((current_streak_dates[0], current_streak_dates[-1]))
        
        # Find longest streak
        longest_streak_length = 0
        longest_streak_start = None
        longest_streak_end = None
        
        for start_date, end_date in streaks:
            length = (end_date - start_date).days + 1
            if length > longest_streak_length:
                longest_streak_length = length
                longest_streak_start = start_date
                longest_streak_end = end_date
        
        # Calculate current streak
        current_streak_length = 0
        current_streak_start = None
        
        today = date.today()
        yesterday = today - timedelta(days=1)
        
        # Check if streak is active (completed today or yesterday)
        if today in completion_dates or yesterday in completion_dates:
            # Count backwards from today/yesterday
            check_date = today if today in completion_dates else yesterday
            current_streak_start = check_date
            current_streak_length = 1
            
            while True:
                prev_day = check_date - timedelta(days=1)
                if prev_day in completion_dates:
                    current_streak_length += 1
                    current_streak_start = prev_day
                    check_date = prev_day
                else:
                    break
        
        return HabitStreak(
            current_streak=current_streak_length,
            longest_streak=longest_streak_length,
            current_streak_start=current_streak_start,
            longest_streak_start=longest_streak_start,
            longest_streak_end=longest_streak_end
        )
    
    @staticmethod
    def get_completion_calendar(completion_dates: Set[date], 
                                start_date: date, end_date: date) -> Dict[date, bool]:
        """Get calendar of completions"""
        calendar = {}
        current = start_date
        
        while current <= end_date:
            calendar[current] = current in completion_dates
            current += timedelta(days=1)
        
        return calendar
```

## Statistics Calculator

```python
# statistics.py
from collections import Counter
from datetime import date, timedelta

class HabitStatisticsCalculator:
    """Calculate habit statistics"""
    
    @staticmethod
    def calculate_statistics(habit: Habit, entries: List[HabitEntry]) -> HabitStatistics:
        """Calculate comprehensive statistics"""
        if not entries:
            return HabitStatistics(
                habit_id=habit.id,
                total_completions=0,
                completion_rate=0.0,
                current_streak=0,
                longest_streak=0,
                average_per_week=0.0,
                days_tracked=0,
                first_completion=None,
                last_completion=None,
                best_day_of_week=None
            )
        
        # Get completion dates
        completion_dates = {entry.completion_date for entry in entries}
        sorted_dates = sorted(completion_dates)
        
        first_completion = sorted_dates[0]
        last_completion = sorted_dates[-1]
        
        # Calculate days tracked
        days_tracked = (date.today() - habit.created_date).days + 1
        
        # Calculate completion rate
        expected_completions = days_tracked
        if habit.frequency == HabitFrequency.WEEKLY:
            weeks_tracked = days_tracked / 7
            expected_completions = int(weeks_tracked * habit.target_days_per_week)
        elif habit.frequency == HabitFrequency.MONTHLY:
            months_tracked = (date.today().year - habit.created_date.year) * 12 + \
                           (date.today().month - habit.created_date.month) + 1
            expected_completions = months_tracked
        
        completion_rate = (len(completion_dates) / expected_completions * 100) if expected_completions > 0 else 0
        completion_rate = min(completion_rate, 100)  # Cap at 100%
        
        # Calculate streaks
        streaks = StreakCalculator.calculate_streaks(completion_dates)
        
        # Calculate average per week
        weeks = max(days_tracked / 7, 1)
        average_per_week = len(completion_dates) / weeks
        
        # Find best day of week
        day_counter = Counter(d.weekday() for d in completion_dates)
        if day_counter:
            best_day_num = day_counter.most_common(1)[0][0]
            days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            best_day = days[best_day_num]
        else:
            best_day = None
        
        return HabitStatistics(
            habit_id=habit.id,
            total_completions=len(completion_dates),
            completion_rate=round(completion_rate, 1),
            current_streak=streaks.current_streak,
            longest_streak=streaks.longest_streak,
            average_per_week=round(average_per_week, 1),
            days_tracked=days_tracked,
            first_completion=first_completion,
            last_completion=last_completion,
            best_day_of_week=best_day
        )
```

## Habit Tracker Manager

```python
# habit_tracker.py
import json
from pathlib import Path
from datetime import date, datetime
from typing import List, Dict, Optional

class HabitTracker:
    """Main habit tracking system"""
    
    def __init__(self, data_dir: str = "habit_data"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(exist_ok=True)
        
        self.habits: Dict[str, Habit] = {}
        self.entries: List[HabitEntry] = []
        
        self.load_data()
    
    # Habit Management
    def create_habit(self, name: str, description: str, 
                    category: HabitCategory, frequency: HabitFrequency,
                    target_days_per_week: int = 7) -> Habit:
        """Create new habit"""
        habit = Habit(
            id=str(uuid.uuid4()),
            name=name,
            description=description,
            category=category,
            frequency=frequency,
            target_days_per_week=target_days_per_week,
            created_date=date.today()
        )
        
        self.habits[habit.id] = habit
        self.save_data()
        return habit
    
    def get_active_habits(self) -> List[Habit]:
        """Get all active habits"""
        return [h for h in self.habits.values() if h.is_active]
    
    def archive_habit(self, habit_id: str):
        """Archive habit (mark inactive)"""
        if habit_id in self.habits:
            self.habits[habit_id].is_active = False
            self.save_data()
    
    # Entry Management
    def log_completion(self, habit_id: str, completion_date: Optional[date] = None,
                      notes: str = "") -> HabitEntry:
        """Log habit completion"""
        if habit_id not in self.habits:
            raise ValueError(f"Habit {habit_id} not found")
        
        if completion_date is None:
            completion_date = date.today()
        
        # Check if already logged
        existing = self.get_entries_for_habit(habit_id)
        if any(e.completion_date == completion_date for e in existing):
            raise ValueError(f"Habit already logged for {completion_date}")
        
        entry = HabitEntry(
            id=str(uuid.uuid4()),
            habit_id=habit_id,
            completion_date=completion_date,
            completion_time=datetime.now(),
            notes=notes
        )
        
        self.entries.append(entry)
        self.save_data()
        return entry
    
    def remove_entry(self, entry_id: str) -> bool:
        """Remove habit entry"""
        for i, entry in enumerate(self.entries):
            if entry.id == entry_id:
                del self.entries[i]
                self.save_data()
                return True
        return False
    
    def get_entries_for_habit(self, habit_id: str) -> List[HabitEntry]:
        """Get all entries for habit"""
        return [e for e in self.entries if e.habit_id == habit_id]
    
    def get_entries_for_date(self, check_date: date) -> List[HabitEntry]:
        """Get all entries for specific date"""
        return [e for e in self.entries if e.completion_date == check_date]
    
    # Statistics
    def get_habit_statistics(self, habit_id: str) -> HabitStatistics:
        """Get statistics for habit"""
        if habit_id not in self.habits:
            raise ValueError(f"Habit {habit_id} not found")
        
        habit = self.habits[habit_id]
        entries = self.get_entries_for_habit(habit_id)
        
        return HabitStatisticsCalculator.calculate_statistics(habit, entries)
    
    def get_streaks(self, habit_id: str) -> HabitStreak:
        """Get streak information"""
        entries = self.get_entries_for_habit(habit_id)
        completion_dates = {e.completion_date for e in entries}
        return StreakCalculator.calculate_streaks(completion_dates)
    
    def get_today_progress(self) -> Dict:
        """Get today's progress"""
        today = date.today()
        active_habits = self.get_active_habits()
        today_entries = self.get_entries_for_date(today)
        completed_ids = {e.habit_id for e in today_entries}
        
        pending = []
        completed = []
        
        for habit in active_habits:
            entries = self.get_entries_for_habit(habit.id)
            completion_dates = {e.completion_date for e in entries}
            
            if habit.should_do_today(completion_dates):
                if habit.id in completed_ids:
                    completed.append(habit)
                else:
                    pending.append(habit)
        
        return {
            "pending": pending,
            "completed": completed,
            "completion_rate": len(completed) / len(active_habits) * 100 if active_habits else 0
        }
    
    def get_weekly_summary(self) -> Dict:
        """Get this week's summary"""
        today = date.today()
        week_start = today - timedelta(days=today.weekday())
        week_dates = [week_start + timedelta(days=i) for i in range(7)]
        
        summary = {}
        
        for habit in self.get_active_habits():
            entries = self.get_entries_for_habit(habit.id)
            completion_dates = {e.completion_date for e in entries}
            
            week_completions = [d for d in week_dates if d in completion_dates]
            
            summary[habit.name] = {
                "completions": len(week_completions),
                "dates": week_completions,
                "completion_rate": len(week_completions) / 7 * 100
            }
        
        return summary
    
    # Data Persistence
    def save_data(self):
        """Save all data"""
        # Save habits
        habits_data = [
            {
                **h.__dict__,
                "category": h.category.value,
                "frequency": h.frequency.value
            }
            for h in self.habits.values()
        ]
        (self.data_dir / "habits.json").write_text(json.dumps(habits_data, indent=2, default=str))
        
        # Save entries
        entries_data = [e.__dict__ for e in self.entries]
        (self.data_dir / "entries.json").write_text(json.dumps(entries_data, indent=2, default=str))
    
    def load_data(self):
        """Load all data"""
        # Load habits
        habits_file = self.data_dir / "habits.json"
        if habits_file.exists():
            data = json.loads(habits_file.read_text())
            for habit_data in data:
                habit_data["category"] = HabitCategory(habit_data["category"])
                habit_data["frequency"] = HabitFrequency(habit_data["frequency"])
                habit_data["created_date"] = date.fromisoformat(habit_data["created_date"])
                habit = Habit(**habit_data)
                self.habits[habit.id] = habit
        
        # Load entries
        entries_file = self.data_dir / "entries.json"
        if entries_file.exists():
            data = json.loads(entries_file.read_text())
            for entry_data in data:
                entry_data["completion_date"] = date.fromisoformat(entry_data["completion_date"])
                entry_data["completion_time"] = datetime.fromisoformat(entry_data["completion_time"])
                entry = HabitEntry(**entry_data)
                self.entries.append(entry)
```

## CLI Application

```python
# cli.py

def run_habit_tracker():
    """Main habit tracker interface"""
    tracker = HabitTracker()
    
    while True:
        # Show today's progress
        progress = tracker.get_today_progress()
        
        print("\n" + "="*70)
        print("HABIT TRACKER")
        print("="*70)
        print(f"Today: {date.today().strftime('%A, %B %d, %Y')}")
        print(f"Completed: {len(progress['completed'])} / "
              f"{len(progress['pending']) + len(progress['completed'])} "
              f"({progress['completion_rate']:.0f}%)")
        print("="*70)
        
        print("\n1. Check In (Log Habit)")
        print("2. View Today's Habits")
        print("3. View Streaks")
        print("4. View Statistics")
        print("5. Create Habit")
        print("6. Weekly Summary")
        print("7. Exit")
        
        choice = input("\nChoice: ").strip()
        
        try:
            if choice == "1":
                # Log completion
                pending = progress["pending"]
                if not pending:
                    print("\n✓ All habits completed for today!")
                    continue
                
                print("\nPending Habits:")
                for i, habit in enumerate(pending, 1):
                    print(f"{i}. {habit.name}")
                
                num = int(input("\nSelect habit (number): "))
                if 1 <= num <= len(pending):
                    habit = pending[num - 1]
                    notes = input("Notes (optional): ")
                    
                    tracker.log_completion(habit.id, notes=notes)
                    
                    # Show streak info
                    streaks = tracker.get_streaks(habit.id)
                    print(f"\n✓ Checked in: {habit.name}")
                    print(f"🔥 Current streak: {streaks.current_streak} days")
            
            elif choice == "3":
                # View streaks
                print("\n--- Streaks ---")
                for habit in tracker.get_active_habits():
                    streaks = tracker.get_streaks(habit.id)
                    print(f"\n{habit.name}")
                    print(f"  Current: {streaks.current_streak} days 🔥")
                    print(f"  Best: {streaks.longest_streak} days")
            
            elif choice == "4":
                # View statistics
                habits = tracker.get_active_habits()
                if not habits:
                    print("\nNo habits yet!")
                    continue
                
                print("\nSelect habit:")
                for i, habit in enumerate(habits, 1):
                    print(f"{i}. {habit.name}")
                
                num = int(input("\nHabit number: "))
                if 1 <= num <= len(habits):
                    habit = habits[num - 1]
                    stats = tracker.get_habit_statistics(habit.id)
                    
                    print(f"\n--- {habit.name} Statistics ---")
                    print(f"Total completions: {stats.total_completions}")
                    print(f"Completion rate: {stats.completion_rate}%")
                    print(f"Current streak: {stats.current_streak} days")
                    print(f"Longest streak: {stats.longest_streak} days")
                    print(f"Average per week: {stats.average_per_week}")
                    print(f"Days tracked: {stats.days_tracked}")
                    if stats.best_day_of_week:
                        print(f"Best day: {stats.best_day_of_week}")
            
            elif choice == "6":
                # Weekly summary
                summary = tracker.get_weekly_summary()
                print("\n--- This Week ---")
                for habit_name, data in summary.items():
                    print(f"\n{habit_name}")
                    print(f"  Completions: {data['completions']}/7")
                    print(f"  Rate: {data['completion_rate']:.0f}%")
            
            elif choice == "7":
                print("\nKeep building those habits!")
                break
        
        except ValueError as e:
            print(f"\n✗ Error: {e}")
        except Exception as e:
            print(f"\n✗ Unexpected error: {e}")

if __name__ == "__main__":
    run_habit_tracker()
```

## Summary

Built comprehensive habit tracker with:
- Habit creation and management
- Daily completion tracking
- Streak calculation (current/longest)
- Progress statistics
- Weekly summaries
- Category organization

**Skills Applied:**
- Complex date calculations
- Streak algorithms
- Statistical analysis
- Data persistence
- Enums for types
- Business logic
