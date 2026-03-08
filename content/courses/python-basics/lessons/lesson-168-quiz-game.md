---
id: lesson-168-quiz-game
title: "Interactive Quiz Game"
chapterId: ch13-practice
order: 3
duration: 30
objectives:
  - Build quiz game system
  - Implement scoring logic
  - Handle multiple choice questions
  - Track user performance
---

# Interactive Quiz Game

Build a quiz game with multiple question types, scoring, and performance tracking.

## Project Overview

Create a quiz system that:
- Supports multiple question types
- Tracks scores and progress
- Provides immediate feedback
- Saves high scores
- Generates performance reports

## Core Data Structures

### Question Models

```python
# questions.py
import random

# Question type constants
QUESTION_MULTIPLE_CHOICE = "multiple_choice"
QUESTION_TRUE_FALSE = "true_false"
QUESTION_SHORT_ANSWER = "short_answer"

def create_multiple_choice(id, question_text, choices, correct_answer,
                           points=1, difficulty="medium"):
    """Create a multiple choice question dictionary"""
    return {
        "id": id,
        "question_text": question_text,
        "type": QUESTION_MULTIPLE_CHOICE,
        "choices": choices,
        "correct_answer": correct_answer,  # Index of correct choice
        "points": points,
        "difficulty": difficulty
    }

def create_true_false(id, question_text, correct_answer,
                      points=1, difficulty="easy"):
    """Create a true/false question dictionary"""
    return {
        "id": id,
        "question_text": question_text,
        "type": QUESTION_TRUE_FALSE,
        "correct_answer": correct_answer,  # Boolean
        "points": points,
        "difficulty": difficulty
    }

def create_short_answer(id, question_text, correct_answers,
                        points=2, difficulty="hard", case_sensitive=False):
    """Create a short answer question dictionary"""
    return {
        "id": id,
        "question_text": question_text,
        "type": QUESTION_SHORT_ANSWER,
        "correct_answers": correct_answers,  # List of acceptable answers
        "case_sensitive": case_sensitive,
        "points": points,
        "difficulty": difficulty
    }

def check_answer(question, answer):
    """Check if answer is correct for any question type"""
    q_type = question["type"]

    if q_type == QUESTION_MULTIPLE_CHOICE:
        try:
            selected = int(answer)
            return selected == question["correct_answer"]
        except ValueError:
            return False

    elif q_type == QUESTION_TRUE_FALSE:
        answer_lower = answer.lower()
        if answer_lower in ['true', 't', '1', 'yes']:
            return question["correct_answer"] is True
        elif answer_lower in ['false', 'f', '0', 'no']:
            return question["correct_answer"] is False
        return False

    elif q_type == QUESTION_SHORT_ANSWER:
        if question.get("case_sensitive"):
            return answer in question["correct_answers"]
        else:
            answer_lower = answer.lower().strip()
            return any(ans.lower().strip() == answer_lower
                       for ans in question["correct_answers"])

    return False

def question_to_dict(question):
    """Convert question to serializable dictionary"""
    # Questions are already dicts, but ensure date types etc. are handled
    return dict(question)

def question_from_dict(data):
    """Create question from dictionary"""
    q_type = data["type"]

    if q_type == QUESTION_MULTIPLE_CHOICE:
        return create_multiple_choice(
            id=data["id"],
            question_text=data["question_text"],
            choices=data["choices"],
            correct_answer=data["correct_answer"],
            points=data.get("points", 1),
            difficulty=data.get("difficulty", "medium")
        )
    elif q_type == QUESTION_TRUE_FALSE:
        return create_true_false(
            id=data["id"],
            question_text=data["question_text"],
            correct_answer=data["correct_answer"],
            points=data.get("points", 1),
            difficulty=data.get("difficulty", "easy")
        )
    elif q_type == QUESTION_SHORT_ANSWER:
        return create_short_answer(
            id=data["id"],
            question_text=data["question_text"],
            correct_answers=data["correct_answers"],
            points=data.get("points", 2),
            difficulty=data.get("difficulty", "hard"),
            case_sensitive=data.get("case_sensitive", False)
        )

    return data
```

### Quiz Manager

```python
# quiz_manager.py
import json
import random
from datetime import datetime

def create_quiz_result(score, total_possible, correct_count,
                       total_questions, time_taken, timestamp):
    """Create a quiz result dictionary"""
    result = {
        "score": score,
        "total_possible": total_possible,
        "correct_count": correct_count,
        "total_questions": total_questions,
        "time_taken": time_taken,  # seconds
        "timestamp": timestamp
    }
    # Calculate derived values
    result["percentage"] = (score / total_possible * 100) if total_possible > 0 else 0
    result["grade"] = _calculate_grade(result["percentage"])
    return result

def _calculate_grade(percentage):
    """Get letter grade from percentage"""
    if percentage >= 90:
        return "A"
    elif percentage >= 80:
        return "B"
    elif percentage >= 70:
        return "C"
    elif percentage >= 60:
        return "D"
    else:
        return "F"

def create_quiz_manager(questions_file="questions.json"):
    """Create a quiz manager state dictionary"""
    manager = {
        "questions_file": questions_file,
        "questions": []
    }
    load_questions(manager)
    return manager

def load_questions(manager):
    """Load questions from JSON file"""
    try:
        with open(manager["questions_file"], 'r') as f:
            data = json.load(f)
            manager["questions"] = [question_from_dict(q_data) for q_data in data]
    except FileNotFoundError:
        manager["questions"] = []
        print(f"Warning: Questions file '{manager['questions_file']}' not found")

def save_questions(manager):
    """Save questions to JSON file"""
    data = [question_to_dict(q) for q in manager["questions"]]
    with open(manager["questions_file"], 'w') as f:
        json.dump(data, f, indent=2)

def add_question(manager, question):
    """Add new question"""
    manager["questions"].append(question)
    save_questions(manager)

def get_questions_by_difficulty(manager, difficulty):
    """Filter questions by difficulty"""
    return [q for q in manager["questions"] if q["difficulty"] == difficulty]

def get_random_questions(manager, count, difficulty=None):
    """Get random selection of questions"""
    pool = manager["questions"] if not difficulty else get_questions_by_difficulty(manager, difficulty)

    if len(pool) < count:
        return pool.copy()

    return random.sample(pool, count)

def create_quiz(manager, question_count=10, difficulty=None):
    """Create a new quiz instance"""
    questions = get_random_questions(manager, question_count, difficulty)
    return new_quiz(questions)

def new_quiz(questions):
    """Create a quiz session dictionary"""
    return {
        "questions": questions,
        "current_index": 0,
        "answers": {},
        "start_time": None,
        "end_time": None
    }

def start_quiz(quiz):
    """Start the quiz timer"""
    quiz["start_time"] = datetime.now()
    random.shuffle(quiz["questions"])  # Randomize order

def get_current_question(quiz):
    """Get current question"""
    if quiz["current_index"] < len(quiz["questions"]):
        return quiz["questions"][quiz["current_index"]]
    return None

def submit_answer(quiz, answer):
    """Submit answer for current question"""
    question = get_current_question(quiz)
    if question:
        quiz["answers"][question["id"]] = answer
        quiz["current_index"] += 1

def is_quiz_complete(quiz):
    """Check if all questions answered"""
    return quiz["current_index"] >= len(quiz["questions"])

def calculate_result(quiz):
    """Calculate quiz results"""
    quiz["end_time"] = datetime.now()

    score = 0
    correct_count = 0
    total_possible = sum(q["points"] for q in quiz["questions"])

    for question in quiz["questions"]:
        user_answer = quiz["answers"].get(question["id"], "")
        if check_answer(question, user_answer):
            score += question["points"]
            correct_count += 1

    time_taken = (quiz["end_time"] - quiz["start_time"]).total_seconds()

    return create_quiz_result(
        score=score,
        total_possible=total_possible,
        correct_count=correct_count,
        total_questions=len(quiz["questions"]),
        time_taken=time_taken,
        timestamp=quiz["end_time"]
    )
```

### Score Tracking

```python
# score_tracker.py
import json
from pathlib import Path

def create_score_tracker(scores_file="scores.json"):
    """Create a score tracker state dictionary"""
    tracker = {
        "scores_file": scores_file,
        "scores": []
    }
    load_scores(tracker)
    return tracker

def save_score(tracker, result, username="Player"):
    """Save quiz result"""
    score_entry = {
        "username": username,
        "score": result["score"],
        "total_possible": result["total_possible"],
        "percentage": result["percentage"],
        "grade": result["grade"],
        "correct_count": result["correct_count"],
        "total_questions": result["total_questions"],
        "time_taken": result["time_taken"],
        "timestamp": result["timestamp"].isoformat()
    }

    tracker["scores"].append(score_entry)
    save_scores(tracker)

def get_high_scores(tracker, limit=10):
    """Get top scores"""
    sorted_scores = sorted(tracker["scores"],
                           key=lambda s: (s["percentage"], -s["time_taken"]),
                           reverse=True)
    return sorted_scores[:limit]

def get_user_scores(tracker, username):
    """Get all scores for a user"""
    return [s for s in tracker["scores"] if s["username"] == username]

def get_average_score(tracker, username=None):
    """Calculate average score"""
    scores = tracker["scores"] if not username else get_user_scores(tracker, username)

    if not scores:
        return 0.0

    return sum(s["percentage"] for s in scores) / len(scores)

def save_scores(tracker):
    """Save scores to file"""
    with open(tracker["scores_file"], 'w') as f:
        json.dump(tracker["scores"], f, indent=2)

def load_scores(tracker):
    """Load scores from file"""
    if not Path(tracker["scores_file"]).exists():
        tracker["scores"] = []
        return

    try:
        with open(tracker["scores_file"], 'r') as f:
            tracker["scores"] = json.load(f)
    except json.JSONDecodeError:
        tracker["scores"] = []
```

### Game Interface

```python
# game.py
import time

def display_question(question, question_num, total):
    """Display a quiz question"""
    print(f"\n{'='*60}")
    print(f"Question {question_num}/{total} [{question['difficulty'].upper()}] ({question['points']} points)")
    print('='*60)
    print(f"\n{question['question_text']}\n")

    if question["type"] == QUESTION_MULTIPLE_CHOICE:
        for i, choice in enumerate(question["choices"]):
            print(f"{i + 1}. {choice}")
        print("\nEnter choice number (1-{})".format(len(question["choices"])))

    elif question["type"] == QUESTION_TRUE_FALSE:
        print("1. True")
        print("2. False")
        print("\nEnter 1 for True, 2 for False")

    elif question["type"] == QUESTION_SHORT_ANSWER:
        print("Enter your answer:")

def get_answer_input(question):
    """Get answer input from user"""
    while True:
        answer = input("\nYour answer: ").strip()

        if not answer:
            print("Please enter an answer.")
            continue

        if question["type"] == QUESTION_MULTIPLE_CHOICE:
            try:
                choice_num = int(answer)
                if 1 <= choice_num <= len(question["choices"]):
                    return str(choice_num - 1)  # Convert to 0-indexed
                else:
                    print(f"Please enter a number between 1 and {len(question['choices'])}")
            except ValueError:
                print("Please enter a valid number.")

        elif question["type"] == QUESTION_TRUE_FALSE:
            if answer in ['1', '2', 'true', 'false', 't', 'f']:
                return 'true' if answer in ['1', 'true', 't'] else 'false'
            else:
                print("Please enter 1 (True) or 2 (False)")

        else:
            return answer

def play_quiz(quiz, show_feedback=True):
    """Play through a quiz"""
    print("\n" + "="*60)
    print("QUIZ STARTED!")
    print("="*60)

    start_quiz(quiz)

    while not is_quiz_complete(quiz):
        question = get_current_question(quiz)
        display_question(question, quiz["current_index"] + 1, len(quiz["questions"]))

        answer = get_answer_input(question)
        submit_answer(quiz, answer)

        if show_feedback:
            is_correct = check_answer(question, answer)
            if is_correct:
                print("\n✓ Correct! (+{} points)".format(question["points"]))
            else:
                print("\n✗ Incorrect!")

            time.sleep(1)

    return calculate_result(quiz)

def display_results(result):
    """Display quiz results"""
    print("\n" + "="*60)
    print("QUIZ COMPLETED!")
    print("="*60)
    print(f"\nScore: {result['score']}/{result['total_possible']} points")
    print(f"Correct: {result['correct_count']}/{result['total_questions']} questions")
    print(f"Percentage: {result['percentage']:.1f}%")
    print(f"Grade: {result['grade']}")
    print(f"Time: {result['time_taken']:.1f} seconds")
    print("\n" + "="*60)

def run_quiz_game():
    """Main game loop"""
    manager = create_quiz_manager()
    tracker = create_score_tracker()

    print("Welcome to the Quiz Game!")
    username = input("Enter your name: ").strip() or "Player"

    while True:
        print("\n" + "="*60)
        print("QUIZ GAME MENU")
        print("="*60)
        print("1. Start New Quiz")
        print("2. View High Scores")
        print("3. View Your Stats")
        print("4. Exit")
        print("="*60)

        choice = input("\nChoice (1-4): ").strip()

        if choice == "1":
            # Configure quiz
            print("\nSelect difficulty:")
            print("1. Easy")
            print("2. Medium")
            print("3. Hard")
            print("4. Mixed")

            diff_choice = input("\nChoice (1-4): ").strip()
            difficulty = None

            if diff_choice == "1":
                difficulty = "easy"
            elif diff_choice == "2":
                difficulty = "medium"
            elif diff_choice == "3":
                difficulty = "hard"

            count = int(input("Number of questions (5-20): ") or "10")
            count = max(5, min(20, count))

            # Create and play quiz
            quiz = create_quiz(manager, count, difficulty)

            if not quiz["questions"]:
                print("\nNo questions available!")
                continue

            result = play_quiz(quiz)
            display_results(result)

            # Save score
            save_score(tracker, result, username)

        elif choice == "2":
            # High scores
            high_scores = get_high_scores(tracker)

            print("\n" + "="*60)
            print("HIGH SCORES")
            print("="*60)

            if not high_scores:
                print("\nNo scores yet!")
            else:
                print(f"\n{'Rank':<6} {'Name':<15} {'Score':<10} {'Grade':<7} {'Time'}")
                print("-"*60)

                for i, score in enumerate(high_scores, 1):
                    print(f"{i:<6} {score['username']:<15} {score['percentage']:.1f}%    "
                          f"{score['grade']:<7} {score['time_taken']:.1f}s")

        elif choice == "3":
            # User stats
            user_scores = get_user_scores(tracker, username)
            avg = get_average_score(tracker, username)

            print(f"\n{username}'s Statistics:")
            print(f"Quizzes Taken: {len(user_scores)}")
            print(f"Average Score: {avg:.1f}%")

            if user_scores:
                best = max(user_scores, key=lambda s: s["percentage"])
                print(f"Best Score: {best['percentage']:.1f}% ({best['grade']})")

        elif choice == "4":
            print("\nThanks for playing!")
            break

        else:
            print("\nInvalid choice!")

if __name__ == "__main__":
    run_quiz_game()
```

## Sample Questions

```python
# Create sample questions
manager = create_quiz_manager()

# Multiple choice questions
add_question(manager, create_multiple_choice(
    id="mc1",
    question_text="What is the capital of France?",
    choices=["London", "Berlin", "Paris", "Madrid"],
    correct_answer=2,
    difficulty="easy"
))

add_question(manager, create_multiple_choice(
    id="mc2",
    question_text="Which planet is known as the Red Planet?",
    choices=["Venus", "Mars", "Jupiter", "Saturn"],
    correct_answer=1,
    difficulty="easy"
))

# True/False questions
add_question(manager, create_true_false(
    id="tf1",
    question_text="Python is a compiled language.",
    correct_answer=False,
    difficulty="medium"
))

# Short answer questions
add_question(manager, create_short_answer(
    id="sa1",
    question_text="What is 7 * 8?",
    correct_answers=["56", "fifty-six"],
    difficulty="medium"
))
```

## Testing

```python
# test_quiz.py
import pytest

def test_multiple_choice_question():
    q = create_multiple_choice("1", "Test question?", ["A", "B", "C"], 1)
    assert check_answer(q, "1") is True
    assert check_answer(q, "0") is False

def test_true_false_question():
    q = create_true_false("2", "Python is great", True)
    assert check_answer(q, "true") is True
    assert check_answer(q, "false") is False

def test_quiz_scoring():
    questions = [
        create_multiple_choice("1", "Q1", ["A", "B"], 0, points=2),
        create_true_false("2", "Q2", True, points=1)
    ]

    quiz = new_quiz(questions)
    start_quiz(quiz)
    submit_answer(quiz, "0")  # Correct (2 points)
    submit_answer(quiz, "true")  # Correct (1 point)

    result = calculate_result(quiz)
    assert result["score"] == 3
    assert result["correct_count"] == 2
```

## Summary

Built complete quiz game with:
- Multiple question types
- Scoring system
- Performance tracking
- High score leaderboard
- Difficulty levels
- Timed quizzes

**Skills Applied:**
- Constants for type safety
- Dictionary-based data modeling
- Data persistence
- User interface design
- Performance metrics
