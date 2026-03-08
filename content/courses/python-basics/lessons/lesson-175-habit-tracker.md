---
id: lesson-175-habit-tracker
title: "Habit Tracker with Streaks"
chapterId: ch13-practice
order: 10
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
from datetime import date, datetime, timedelta
from typing import List, Set, Dict, Optional
import uuid

# Habit frequency constants
FREQ_DAILY = "daily"
FREQ_WEEKLY = "weekly"
FREQ_MONTHLY = "monthly"

# Habit category constants
CAT_HEALTH = "health"
CAT_PRODUCTIVITY = "productivity"
CAT_LEARNING = "learning"
CAT_SOCIAL = "social"
CAT_FINANCE = "finance"
CAT_OTHER = "other"


def create_habit(name, description, category, frequency,
                 target_days_per_week, created_date=None,
                 habit_id=None, is_active=True):
    """Create a habit definition"""
    return {
        "id": habit_id or str(uuid.uuid4()),
        "name": name,
        "description": description,
        "category": category,
        "frequency": frequency,
        "target_days_per_week": target_days_per_week,
        "created_date": created_date or date.today(),
        "is_active": is_active,
    }


def habit_should_do_today(habit, completed_dates):
    """Check if habit should be done today"""
    today = date.today()

    if habit["frequency"] == FREQ_DAILY:
        return today not in completed_dates

    elif habit["frequency"] == FREQ_WEEKLY:
        # Check this week's progress
        week_start = today - timedelta(days=today.weekday())
        week_dates = [week_start + timedelta(days=i) for i in range(7)]
        completed_this_week = sum(1 for d in week_dates if d in completed_dates)
        return completed_this_week < habit["target_days_per_week"]

    elif habit["frequency"] == FREQ_MONTHLY:
        # Once per month
        month_dates = [d for d in completed_dates
                      if d.year == today.year and d.month == today.month]
        return len(month_dates) == 0

    return True


def create_habit_entry(habit_id, completion_date=None,
                       completion_time=None, notes="", entry_id=None):
    """Create a single habit completion entry"""
    return {
        "id": entry_id or str(uuid.uuid4()),
        "habit_id": habit_id,
        "completion_date": completion_date or date.today(),
        "completion_time": completion_time or datetime.now(),
        "notes": notes,
    }


def create_streak_info(current_streak=0, longest_streak=0,
                       current_streak_start=None, longest_streak_start=None,
                       longest_streak_end=None):
    """Create streak information record"""
    return {
        "current_streak": current_streak,
        "longest_streak": longest_streak,
        "current_streak_start": current_streak_start,
        "longest_streak_start": longest_streak_start,
        "longest_streak_end": longest_streak_end,
    }


def is_streak_alive(streak):
    """Check if current streak is still active"""
    if not streak["current_streak_start"]:
        return False

    # Streak alive if completed today or yesterday
    today = date.today()
    days_since_start = (today - streak["current_streak_start"]).days
    return (days_since_start == streak["current_streak"] - 1
            or days_since_start == streak["current_streak"])


def create_habit_statistics(habit_id, total_completions=0, completion_rate=0.0,
                            current_streak=0, longest_streak=0,
                            average_per_week=0.0, days_tracked=0,
                            first_completion=None, last_completion=None,
                            best_day_of_week=None):
    """Create habit statistics record"""
    return {
        "habit_id": habit_id,
        "total_completions": total_completions,
        "completion_rate": completion_rate,
        "current_streak": current_streak,
        "longest_streak": longest_streak,
        "average_per_week": average_per_week,
        "days_tracked": days_tracked,
        "first_completion": first_completion,
        "last_completion": last_completion,
        "best_day_of_week": best_day_of_week,
    }
```

## Streak Calculator

```python
# streak_calculator.py
from datetime import date, timedelta
from typing import Set, List, Tuple, Dict


def calculate_streaks(completion_dates):
    """Calculate current and longest streaks from a set of dates"""
    if not completion_dates:
        return create_streak_info()

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

    return create_streak_info(
        current_streak=current_streak_length,
        longest_streak=longest_streak_length,
        current_streak_start=current_streak_start,
        longest_streak_start=longest_streak_start,
        longest_streak_end=longest_streak_end,
    )


def get_completion_calendar(completion_dates, start_date, end_date):
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


def calculate_statistics(habit, entries):
    """Calculate comprehensive statistics for a habit"""
    if not entries:
        return create_habit_statistics(habit_id=habit["id"])

    # Get completion dates
    completion_dates = {entry["completion_date"] for entry in entries}
    sorted_dates = sorted(completion_dates)

    first_completion = sorted_dates[0]
    last_completion = sorted_dates[-1]

    # Calculate days tracked
    days_tracked = (date.today() - habit["created_date"]).days + 1

    # Calculate completion rate
    expected_completions = days_tracked
    if habit["frequency"] == FREQ_WEEKLY:
        weeks_tracked = days_tracked / 7
        expected_completions = int(weeks_tracked * habit["target_days_per_week"])
    elif habit["frequency"] == FREQ_MONTHLY:
        months_tracked = ((date.today().year - habit["created_date"].year) * 12 +
                         (date.today().month - habit["created_date"].month) + 1)
        expected_completions = months_tracked

    completion_rate = (
        (len(completion_dates) / expected_completions * 100)
        if expected_completions > 0 else 0
    )
    completion_rate = min(completion_rate, 100)  # Cap at 100%

    # Calculate streaks
    streaks = calculate_streaks(completion_dates)

    # Calculate average per week
    weeks = max(days_tracked / 7, 1)
    average_per_week = len(completion_dates) / weeks

    # Find best day of week
    day_counter = Counter(d.weekday() for d in completion_dates)
    if day_counter:
        best_day_num = day_counter.most_common(1)[0][0]
        days = ["Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday"]
        best_day = days[best_day_num]
    else:
        best_day = None

    return create_habit_statistics(
        habit_id=habit["id"],
        total_completions=len(completion_dates),
        completion_rate=round(completion_rate, 1),
        current_streak=streaks["current_streak"],
        longest_streak=streaks["longest_streak"],
        average_per_week=round(average_per_week, 1),
        days_tracked=days_tracked,
        first_completion=first_completion,
        last_completion=last_completion,
        best_day_of_week=best_day,
    )
```

## Habit Tracker Manager

```python
# habit_tracker.py
import json
from pathlib import Path
from datetime import date, datetime
from typing import List, Dict, Optional


def create_tracker(data_dir="habit_data"):
    """Create and initialize a habit tracking system state"""
    data_path = Path(data_dir)
    data_path.mkdir(exist_ok=True)

    tracker = {
        "data_dir": data_path,
        "habits": {},
        "entries": [],
    }

    load_tracker_data(tracker)
    return tracker


# Habit Management
def add_habit(tracker, name, description, category, frequency,
              target_days_per_week=7):
    """Create and add a new habit"""
    habit = create_habit(
        habit_id=str(uuid.uuid4()),
        name=name,
        description=description,
        category=category,
        frequency=frequency,
        target_days_per_week=target_days_per_week,
        created_date=date.today(),
    )

    tracker["habits"][habit["id"]] = habit
    save_tracker_data(tracker)
    return habit


def get_active_habits(tracker):
    """Get all active habits"""
    return [h for h in tracker["habits"].values() if h["is_active"]]


def archive_habit(tracker, habit_id):
    """Archive habit (mark inactive)"""
    if habit_id in tracker["habits"]:
        tracker["habits"][habit_id]["is_active"] = False
        save_tracker_data(tracker)


# Entry Management
def log_completion(tracker, habit_id, completion_date=None, notes=""):
    """Log habit completion"""
    if habit_id not in tracker["habits"]:
        raise ValueError(f"Habit {habit_id} not found")

    if completion_date is None:
        completion_date = date.today()

    # Check if already logged
    existing = get_entries_for_habit(tracker, habit_id)
    if any(e["completion_date"] == completion_date for e in existing):
        raise ValueError(f"Habit already logged for {completion_date}")

    entry = create_habit_entry(
        entry_id=str(uuid.uuid4()),
        habit_id=habit_id,
        completion_date=completion_date,
        completion_time=datetime.now(),
        notes=notes,
    )

    tracker["entries"].append(entry)
    save_tracker_data(tracker)
    return entry


def remove_entry(tracker, entry_id):
    """Remove habit entry"""
    for i, entry in enumerate(tracker["entries"]):
        if entry["id"] == entry_id:
            del tracker["entries"][i]
            save_tracker_data(tracker)
            return True
    return False


def get_entries_for_habit(tracker, habit_id):
    """Get all entries for habit"""
    return [e for e in tracker["entries"] if e["habit_id"] == habit_id]


def get_entries_for_date(tracker, check_date):
    """Get all entries for specific date"""
    return [e for e in tracker["entries"] if e["completion_date"] == check_date]


# Statistics
def get_habit_statistics(tracker, habit_id):
    """Get statistics for habit"""
    if habit_id not in tracker["habits"]:
        raise ValueError(f"Habit {habit_id} not found")

    habit = tracker["habits"][habit_id]
    entries = get_entries_for_habit(tracker, habit_id)

    return calculate_statistics(habit, entries)


def get_streaks(tracker, habit_id):
    """Get streak information"""
    entries = get_entries_for_habit(tracker, habit_id)
    completion_dates = {e["completion_date"] for e in entries}
    return calculate_streaks(completion_dates)


def get_today_progress(tracker):
    """Get today's progress"""
    today = date.today()
    active_habits = get_active_habits(tracker)
    today_entries = get_entries_for_date(tracker, today)
    completed_ids = {e["habit_id"] for e in today_entries}

    pending = []
    completed = []

    for habit in active_habits:
        entries = get_entries_for_habit(tracker, habit["id"])
        completion_dates = {e["completion_date"] for e in entries}

        if habit_should_do_today(habit, completion_dates):
            if habit["id"] in completed_ids:
                completed.append(habit)
            else:
                pending.append(habit)

    return {
        "pending": pending,
        "completed": completed,
        "completion_rate": (
            len(completed) / len(active_habits) * 100 if active_habits else 0
        ),
    }


def get_weekly_summary(tracker):
    """Get this week's summary"""
    today = date.today()
    week_start = today - timedelta(days=today.weekday())
    week_dates = [week_start + timedelta(days=i) for i in range(7)]

    summary = {}

    for habit in get_active_habits(tracker):
        entries = get_entries_for_habit(tracker, habit["id"])
        completion_dates = {e["completion_date"] for e in entries}

        week_completions = [d for d in week_dates if d in completion_dates]

        summary[habit["name"]] = {
            "completions": len(week_completions),
            "dates": week_completions,
            "completion_rate": len(week_completions) / 7 * 100,
        }

    return summary


# Data Persistence
def save_tracker_data(tracker):
    """Save all data"""
    data_dir = tracker["data_dir"]

    # Save habits
    habits_data = list(tracker["habits"].values())
    (data_dir / "habits.json").write_text(
        json.dumps(habits_data, indent=2, default=str)
    )

    # Save entries
    entries_data = list(tracker["entries"])
    (data_dir / "entries.json").write_text(
        json.dumps(entries_data, indent=2, default=str)
    )


def load_tracker_data(tracker):
    """Load all data"""
    data_dir = tracker["data_dir"]

    # Load habits
    habits_file = data_dir / "habits.json"
    if habits_file.exists():
        data = json.loads(habits_file.read_text())
        for habit_data in data:
            habit_data["created_date"] = date.fromisoformat(habit_data["created_date"])
            tracker["habits"][habit_data["id"]] = habit_data

    # Load entries
    entries_file = data_dir / "entries.json"
    if entries_file.exists():
        data = json.loads(entries_file.read_text())
        for entry_data in data:
            entry_data["completion_date"] = date.fromisoformat(
                entry_data["completion_date"]
            )
            entry_data["completion_time"] = datetime.fromisoformat(
                entry_data["completion_time"]
            )
            tracker["entries"].append(entry_data)
```

## CLI Application

```python
# cli.py

def run_habit_tracker():
    """Main habit tracker interface"""
    tracker = create_tracker()

    while True:
        # Show today's progress
        progress = get_today_progress(tracker)

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
                    print(f"{i}. {habit['name']}")

                num = int(input("\nSelect habit (number): "))
                if 1 <= num <= len(pending):
                    habit = pending[num - 1]
                    notes = input("Notes (optional): ")

                    log_completion(tracker, habit["id"], notes=notes)

                    # Show streak info
                    streaks = get_streaks(tracker, habit["id"])
                    print(f"\n✓ Checked in: {habit['name']}")
                    print(f"🔥 Current streak: {streaks['current_streak']} days")

            elif choice == "3":
                # View streaks
                print("\n--- Streaks ---")
                for habit in get_active_habits(tracker):
                    streaks = get_streaks(tracker, habit["id"])
                    print(f"\n{habit['name']}")
                    print(f"  Current: {streaks['current_streak']} days 🔥")
                    print(f"  Best: {streaks['longest_streak']} days")

            elif choice == "4":
                # View statistics
                habits = get_active_habits(tracker)
                if not habits:
                    print("\nNo habits yet!")
                    continue

                print("\nSelect habit:")
                for i, habit in enumerate(habits, 1):
                    print(f"{i}. {habit['name']}")

                num = int(input("\nHabit number: "))
                if 1 <= num <= len(habits):
                    habit = habits[num - 1]
                    stats = get_habit_statistics(tracker, habit["id"])

                    print(f"\n--- {habit['name']} Statistics ---")
                    print(f"Total completions: {stats['total_completions']}")
                    print(f"Completion rate: {stats['completion_rate']}%")
                    print(f"Current streak: {stats['current_streak']} days")
                    print(f"Longest streak: {stats['longest_streak']} days")
                    print(f"Average per week: {stats['average_per_week']}")
                    print(f"Days tracked: {stats['days_tracked']}")
                    if stats['best_day_of_week']:
                        print(f"Best day: {stats['best_day_of_week']}")

            elif choice == "6":
                # Weekly summary
                summary = get_weekly_summary(tracker)
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
- Constants for category and frequency types
- Business logic
