---
id: "167-quiz-game"
title: "Interactive Quiz Game"
chapterId: ch13-practice
order: 4
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
from dataclasses import dataclass
from typing import List, Optional
from enum import Enum

class QuestionType(Enum):
    """Types of quiz questions"""
    MULTIPLE_CHOICE = "multiple_choice"
    TRUE_FALSE = "true_false"
    SHORT_ANSWER = "short_answer"

@dataclass
class Question:
    """Base question class"""
    id: str
    question_text: str
    type: QuestionType
    points: int
    difficulty: str  # "easy", "medium", "hard"
    
    def check_answer(self, answer: str) -> bool:
        """Check if answer is correct (override in subclasses)"""
        raise NotImplementedError

@dataclass
class MultipleChoiceQuestion(Question):
    """Multiple choice question"""
    choices: List[str]
    correct_answer: int  # Index of correct choice
    
    def __init__(self, id: str, question_text: str, choices: List[str], 
                 correct_answer: int, points: int = 1, difficulty: str = "medium"):
        super().__init__(id, question_text, QuestionType.MULTIPLE_CHOICE, points, difficulty)
        self.choices = choices
        self.correct_answer = correct_answer
    
    def check_answer(self, answer: str) -> bool:
        """Check if selected choice is correct"""
        try:
            selected = int(answer)
            return selected == self.correct_answer
        except ValueError:
            return False
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "question_text": self.question_text,
            "type": self.type.value,
            "choices": self.choices,
            "correct_answer": self.correct_answer,
            "points": self.points,
            "difficulty": self.difficulty
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'MultipleChoiceQuestion':
        return cls(
            id=data["id"],
            question_text=data["question_text"],
            choices=data["choices"],
            correct_answer=data["correct_answer"],
            points=data.get("points", 1),
            difficulty=data.get("difficulty", "medium")
        )

@dataclass
class TrueFalseQuestion(Question):
    """True/False question"""
    correct_answer: bool
    
    def __init__(self, id: str, question_text: str, correct_answer: bool,
                 points: int = 1, difficulty: str = "easy"):
        super().__init__(id, question_text, QuestionType.TRUE_FALSE, points, difficulty)
        self.correct_answer = correct_answer
    
    def check_answer(self, answer: str) -> bool:
        """Check if answer matches correct boolean"""
        answer_lower = answer.lower()
        if answer_lower in ['true', 't', '1', 'yes']:
            return self.correct_answer is True
        elif answer_lower in ['false', 'f', '0', 'no']:
            return self.correct_answer is False
        return False
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "question_text": self.question_text,
            "type": self.type.value,
            "correct_answer": self.correct_answer,
            "points": self.points,
            "difficulty": self.difficulty
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'TrueFalseQuestion':
        return cls(
            id=data["id"],
            question_text=data["question_text"],
            correct_answer=data["correct_answer"],
            points=data.get("points", 1),
            difficulty=data.get("difficulty", "easy")
        )

@dataclass
class ShortAnswerQuestion(Question):
    """Short answer question"""
    correct_answers: List[str]  # Multiple acceptable answers
    case_sensitive: bool = False
    
    def __init__(self, id: str, question_text: str, correct_answers: List[str],
                 points: int = 2, difficulty: str = "hard", case_sensitive: bool = False):
        super().__init__(id, question_text, QuestionType.SHORT_ANSWER, points, difficulty)
        self.correct_answers = correct_answers
        self.case_sensitive = case_sensitive
    
    def check_answer(self, answer: str) -> bool:
        """Check if answer matches any acceptable answer"""
        if self.case_sensitive:
            return answer in self.correct_answers
        else:
            answer_lower = answer.lower().strip()
            return any(ans.lower().strip() == answer_lower 
                      for ans in self.correct_answers)
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "question_text": self.question_text,
            "type": self.type.value,
            "correct_answers": self.correct_answers,
            "case_sensitive": self.case_sensitive,
            "points": self.points,
            "difficulty": self.difficulty
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'ShortAnswerQuestion':
        return cls(
            id=data["id"],
            question_text=data["question_text"],
            correct_answers=data["correct_answers"],
            points=data.get("points", 2),
            difficulty=data.get("difficulty", "hard"),
            case_sensitive=data.get("case_sensitive", False)
        )
```

### Quiz Manager

```python
# quiz_manager.py
import json
import random
from typing import List, Dict
from datetime import datetime

@dataclass
class QuizResult:
    """Results from a quiz attempt"""
    score: int
    total_possible: int
    correct_count: int
    total_questions: int
    time_taken: float  # seconds
    timestamp: datetime
    
    @property
    def percentage(self) -> float:
        return (self.score / self.total_possible * 100) if self.total_possible > 0 else 0
    
    @property
    def grade(self) -> str:
        """Get letter grade"""
        pct = self.percentage
        if pct >= 90:
            return "A"
        elif pct >= 80:
            return "B"
        elif pct >= 70:
            return "C"
        elif pct >= 60:
            return "D"
        else:
            return "F"

class QuizManager:
    """Manage quiz questions and sessions"""
    
    def __init__(self, questions_file: str = "questions.json"):
        self.questions_file = questions_file
        self.questions: List[Question] = []
        self.load_questions()
    
    def load_questions(self):
        """Load questions from JSON file"""
        try:
            with open(self.questions_file, 'r') as f:
                data = json.load(f)
                
                for q_data in data:
                    q_type = QuestionType(q_data["type"])
                    
                    if q_type == QuestionType.MULTIPLE_CHOICE:
                        question = MultipleChoiceQuestion.from_dict(q_data)
                    elif q_type == QuestionType.TRUE_FALSE:
                        question = TrueFalseQuestion.from_dict(q_data)
                    elif q_type == QuestionType.SHORT_ANSWER:
                        question = ShortAnswerQuestion.from_dict(q_data)
                    else:
                        continue
                    
                    self.questions.append(question)
        
        except FileNotFoundError:
            self.questions = []
            print(f"Warning: Questions file '{self.questions_file}' not found")
    
    def save_questions(self):
        """Save questions to JSON file"""
        data = [q.to_dict() for q in self.questions]
        
        with open(self.questions_file, 'w') as f:
            json.dump(data, f, indent=2)
    
    def add_question(self, question: Question):
        """Add new question"""
        self.questions.append(question)
        self.save_questions()
    
    def get_questions_by_difficulty(self, difficulty: str) -> List[Question]:
        """Filter questions by difficulty"""
        return [q for q in self.questions if q.difficulty == difficulty]
    
    def get_random_questions(self, count: int, difficulty: str = None) -> List[Question]:
        """Get random selection of questions"""
        pool = self.questions if not difficulty else self.get_questions_by_difficulty(difficulty)
        
        if len(pool) < count:
            return pool.copy()
        
        return random.sample(pool, count)
    
    def create_quiz(self, question_count: int = 10, difficulty: str = None) -> 'Quiz':
        """Create a new quiz instance"""
        questions = self.get_random_questions(question_count, difficulty)
        return Quiz(questions)

class Quiz:
    """A quiz session"""
    
    def __init__(self, questions: List[Question]):
        self.questions = questions
        self.current_index = 0
        self.answers: Dict[str, str] = {}
        self.start_time: Optional[datetime] = None
        self.end_time: Optional[datetime] = None
    
    def start(self):
        """Start the quiz timer"""
        self.start_time = datetime.now()
        random.shuffle(self.questions)  # Randomize order
    
    def get_current_question(self) -> Optional[Question]:
        """Get current question"""
        if self.current_index < len(self.questions):
            return self.questions[self.current_index]
        return None
    
    def submit_answer(self, answer: str):
        """Submit answer for current question"""
        question = self.get_current_question()
        if question:
            self.answers[question.id] = answer
            self.current_index += 1
    
    def is_complete(self) -> bool:
        """Check if all questions answered"""
        return self.current_index >= len(self.questions)
    
    def calculate_result(self) -> QuizResult:
        """Calculate quiz results"""
        self.end_time = datetime.now()
        
        score = 0
        correct_count = 0
        total_possible = sum(q.points for q in self.questions)
        
        for question in self.questions:
            user_answer = self.answers.get(question.id, "")
            if question.check_answer(user_answer):
                score += question.points
                correct_count += 1
        
        time_taken = (self.end_time - self.start_time).total_seconds()
        
        return QuizResult(
            score=score,
            total_possible=total_possible,
            correct_count=correct_count,
            total_questions=len(self.questions),
            time_taken=time_taken,
            timestamp=self.end_time
        )
```

### Score Tracking

```python
# score_tracker.py
import json
from pathlib import Path
from typing import List
from datetime import datetime

class ScoreTracker:
    """Track quiz scores and history"""
    
    def __init__(self, scores_file: str = "scores.json"):
        self.scores_file = scores_file
        self.scores: List[dict] = []
        self.load_scores()
    
    def save_score(self, result: QuizResult, username: str = "Player"):
        """Save quiz result"""
        score_entry = {
            "username": username,
            "score": result.score,
            "total_possible": result.total_possible,
            "percentage": result.percentage,
            "grade": result.grade,
            "correct_count": result.correct_count,
            "total_questions": result.total_questions,
            "time_taken": result.time_taken,
            "timestamp": result.timestamp.isoformat()
        }
        
        self.scores.append(score_entry)
        self.save_scores()
    
    def get_high_scores(self, limit: int = 10) -> List[dict]:
        """Get top scores"""
        sorted_scores = sorted(self.scores, 
                              key=lambda s: (s["percentage"], -s["time_taken"]),
                              reverse=True)
        return sorted_scores[:limit]
    
    def get_user_scores(self, username: str) -> List[dict]:
        """Get all scores for a user"""
        return [s for s in self.scores if s["username"] == username]
    
    def get_average_score(self, username: str = None) -> float:
        """Calculate average score"""
        scores = self.scores if not username else self.get_user_scores(username)
        
        if not scores:
            return 0.0
        
        return sum(s["percentage"] for s in scores) / len(scores)
    
    def save_scores(self):
        """Save scores to file"""
        with open(self.scores_file, 'w') as f:
            json.dump(self.scores, f, indent=2)
    
    def load_scores(self):
        """Load scores from file"""
        if not Path(self.scores_file).exists():
            self.scores = []
            return
        
        try:
            with open(self.scores_file, 'r') as f:
                self.scores = json.load(f)
        except json.JSONDecodeError:
            self.scores = []
```

### Game Interface

```python
# game.py
import time

def display_question(question: Question, question_num: int, total: int):
    """Display a quiz question"""
    print(f"\n{'='*60}")
    print(f"Question {question_num}/{total} [{question.difficulty.upper()}] ({question.points} points)")
    print('='*60)
    print(f"\n{question.question_text}\n")
    
    if isinstance(question, MultipleChoiceQuestion):
        for i, choice in enumerate(question.choices):
            print(f"{i + 1}. {choice}")
        print("\nEnter choice number (1-{})".format(len(question.choices)))
    
    elif isinstance(question, TrueFalseQuestion):
        print("1. True")
        print("2. False")
        print("\nEnter 1 for True, 2 for False")
    
    elif isinstance(question, ShortAnswerQuestion):
        print("Enter your answer:")

def get_answer_input(question: Question) -> str:
    """Get answer input from user"""
    while True:
        answer = input("\nYour answer: ").strip()
        
        if not answer:
            print("Please enter an answer.")
            continue
        
        if isinstance(question, MultipleChoiceQuestion):
            try:
                choice_num = int(answer)
                if 1 <= choice_num <= len(question.choices):
                    return str(choice_num - 1)  # Convert to 0-indexed
                else:
                    print(f"Please enter a number between 1 and {len(question.choices)}")
            except ValueError:
                print("Please enter a valid number.")
        
        elif isinstance(question, TrueFalseQuestion):
            if answer in ['1', '2', 'true', 'false', 't', 'f']:
                return 'true' if answer in ['1', 'true', 't'] else 'false'
            else:
                print("Please enter 1 (True) or 2 (False)")
        
        else:
            return answer

def play_quiz(quiz: Quiz, show_feedback: bool = True):
    """Play through a quiz"""
    print("\n" + "="*60)
    print("QUIZ STARTED!")
    print("="*60)
    
    quiz.start()
    
    while not quiz.is_complete():
        question = quiz.get_current_question()
        display_question(question, quiz.current_index + 1, len(quiz.questions))
        
        answer = get_answer_input(question)
        quiz.submit_answer(answer)
        
        if show_feedback:
            is_correct = question.check_answer(answer)
            if is_correct:
                print("\n✓ Correct! (+{} points)".format(question.points))
            else:
                print("\n✗ Incorrect!")
            
            time.sleep(1)
    
    return quiz.calculate_result()

def display_results(result: QuizResult):
    """Display quiz results"""
    print("\n" + "="*60)
    print("QUIZ COMPLETED!")
    print("="*60)
    print(f"\nScore: {result.score}/{result.total_possible} points")
    print(f"Correct: {result.correct_count}/{result.total_questions} questions")
    print(f"Percentage: {result.percentage:.1f}%")
    print(f"Grade: {result.grade}")
    print(f"Time: {result.time_taken:.1f} seconds")
    print("\n" + "="*60)

def run_quiz_game():
    """Main game loop"""
    manager = QuizManager()
    tracker = ScoreTracker()
    
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
            quiz = manager.create_quiz(count, difficulty)
            
            if not quiz.questions:
                print("\nNo questions available!")
                continue
            
            result = play_quiz(quiz)
            display_results(result)
            
            # Save score
            tracker.save_score(result, username)
        
        elif choice == "2":
            # High scores
            high_scores = tracker.get_high_scores()
            
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
            user_scores = tracker.get_user_scores(username)
            avg = tracker.get_average_score(username)
            
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
manager = QuizManager()

# Multiple choice questions
manager.add_question(MultipleChoiceQuestion(
    id="mc1",
    question_text="What is the capital of France?",
    choices=["London", "Berlin", "Paris", "Madrid"],
    correct_answer=2,
    difficulty="easy"
))

manager.add_question(MultipleChoiceQuestion(
    id="mc2",
    question_text="Which planet is known as the Red Planet?",
    choices=["Venus", "Mars", "Jupiter", "Saturn"],
    correct_answer=1,
    difficulty="easy"
))

# True/False questions
manager.add_question(TrueFalseQuestion(
    id="tf1",
    question_text="Python is a compiled language.",
    correct_answer=False,
    difficulty="medium"
))

# Short answer questions
manager.add_question(ShortAnswerQuestion(
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
    q = MultipleChoiceQuestion(
        "1", "Test question?", ["A", "B", "C"], 1
    )
    assert q.check_answer("1") is True
    assert q.check_answer("0") is False

def test_true_false_question():
    q = TrueFalseQuestion("2", "Python is great", True)
    assert q.check_answer("true") is True
    assert q.check_answer("false") is False

def test_quiz_scoring():
    questions = [
        MultipleChoiceQuestion("1", "Q1", ["A", "B"], 0, points=2),
        TrueFalseQuestion("2", "Q2", True, points=1)
    ]
    
    quiz = Quiz(questions)
    quiz.start()
    quiz.submit_answer("0")  # Correct (2 points)
    quiz.submit_answer("true")  # Correct (1 point)
    
    result = quiz.calculate_result()
    assert result.score == 3
    assert result.correct_count == 2
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
- Inheritance and polymorphism
- Enums for type safety
- Data persistence
- User interface design
- Performance metrics
