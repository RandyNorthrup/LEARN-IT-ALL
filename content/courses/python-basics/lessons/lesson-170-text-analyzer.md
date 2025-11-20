---
id: "169-text-analyzer"
title: "Text Analysis Tool"
chapterId: ch13-practice
order: 6
duration: 30
objectives:
  - Analyze text statistics
  - Process large text files
  - Generate readability scores
  - Extract keywords
---

# Text Analysis Tool

Build a comprehensive text analysis tool for statistics, readability, and content analysis.

## Project Overview

Create a text analyzer that:
- Calculates word/character statistics
- Analyzes reading level
- Extracts frequent words
- Identifies sentiment indicators
- Generates summary reports

## Core Analysis Module

### Text Statistics

```python
# text_stats.py
import re
from collections import Counter
from typing import Dict, List
import string

class TextStatistics:
    """Calculate basic text statistics"""
    
    def __init__(self, text: str):
        self.text = text
        self.words = self._extract_words()
        self.sentences = self._extract_sentences()
    
    def _extract_words(self) -> List[str]:
        """Extract words from text"""
        # Remove punctuation and convert to lowercase
        words = re.findall(r'\b[a-zA-Z]+\b', self.text.lower())
        return words
    
    def _extract_sentences(self) -> List[str]:
        """Extract sentences from text"""
        # Split on sentence terminators
        sentences = re.split(r'[.!?]+', self.text)
        return [s.strip() for s in sentences if s.strip()]
    
    def character_count(self, include_spaces: bool = True) -> int:
        """Count characters"""
        if include_spaces:
            return len(self.text)
        else:
            return len(self.text.replace(' ', ''))
    
    def word_count(self) -> int:
        """Count words"""
        return len(self.words)
    
    def sentence_count(self) -> int:
        """Count sentences"""
        return len(self.sentences)
    
    def paragraph_count(self) -> int:
        """Count paragraphs"""
        paragraphs = [p.strip() for p in self.text.split('\n\n') if p.strip()]
        return len(paragraphs)
    
    def average_word_length(self) -> float:
        """Calculate average word length"""
        if not self.words:
            return 0.0
        return sum(len(word) for word in self.words) / len(self.words)
    
    def average_sentence_length(self) -> float:
        """Calculate average words per sentence"""
        if not self.sentences:
            return 0.0
        return len(self.words) / len(self.sentences)
    
    def unique_word_count(self) -> int:
        """Count unique words"""
        return len(set(self.words))
    
    def lexical_diversity(self) -> float:
        """Calculate lexical diversity (unique words / total words)"""
        if not self.words:
            return 0.0
        return self.unique_word_count() / len(self.words)
    
    def most_common_words(self, n: int = 10, exclude_stopwords: bool = True) -> List[tuple]:
        """Get most frequent words"""
        words_to_count = self.words
        
        if exclude_stopwords:
            stopwords = self._get_stopwords()
            words_to_count = [w for w in self.words if w not in stopwords]
        
        counter = Counter(words_to_count)
        return counter.most_common(n)
    
    def _get_stopwords(self) -> set:
        """Get common English stopwords"""
        return {
            'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have',
            'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you',
            'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they',
            'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one',
            'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out',
            'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
            'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
            'take', 'people', 'into', 'year', 'your', 'good', 'some',
            'could', 'them', 'see', 'other', 'than', 'then', 'now',
            'look', 'only', 'come', 'its', 'over', 'think', 'also',
            'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
            'well', 'way', 'even', 'new', 'want', 'because', 'any',
            'these', 'give', 'day', 'most', 'us', 'is', 'was', 'are'
        }
    
    def get_summary(self) -> Dict:
        """Get all statistics"""
        return {
            "total_characters": self.character_count(True),
            "characters_no_spaces": self.character_count(False),
            "words": self.word_count(),
            "sentences": self.sentence_count(),
            "paragraphs": self.paragraph_count(),
            "unique_words": self.unique_word_count(),
            "average_word_length": round(self.average_word_length(), 2),
            "average_sentence_length": round(self.average_sentence_length(), 2),
            "lexical_diversity": round(self.lexical_diversity(), 3)
        }
```

### Readability Analysis

```python
# readability.py
import re
import math

class ReadabilityAnalyzer:
    """Calculate readability scores"""
    
    def __init__(self, text: str):
        self.text = text
        self.stats = TextStatistics(text)
    
    def flesch_reading_ease(self) -> float:
        """
        Calculate Flesch Reading Ease score
        206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
        
        90-100: Very Easy
        80-89: Easy
        70-79: Fairly Easy
        60-69: Standard
        50-59: Fairly Difficult
        30-49: Difficult
        0-29: Very Confusing
        """
        words = self.stats.word_count()
        sentences = self.stats.sentence_count()
        syllables = self._count_syllables()
        
        if words == 0 or sentences == 0:
            return 0.0
        
        score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
        return round(max(0, min(100, score)), 2)
    
    def flesch_kincaid_grade(self) -> float:
        """
        Calculate Flesch-Kincaid Grade Level
        0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
        
        Result indicates US grade level needed to understand text
        """
        words = self.stats.word_count()
        sentences = self.stats.sentence_count()
        syllables = self._count_syllables()
        
        if words == 0 or sentences == 0:
            return 0.0
        
        grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
        return round(max(0, grade), 2)
    
    def gunning_fog_index(self) -> float:
        """
        Calculate Gunning Fog Index
        0.4 * ((words/sentences) + 100 * (complex_words/words))
        
        Result indicates years of formal education needed
        """
        words = self.stats.word_count()
        sentences = self.stats.sentence_count()
        complex_words = self._count_complex_words()
        
        if words == 0 or sentences == 0:
            return 0.0
        
        fog = 0.4 * ((words / sentences) + 100 * (complex_words / words))
        return round(fog, 2)
    
    def _count_syllables(self) -> int:
        """Count total syllables in text"""
        total = 0
        for word in self.stats.words:
            total += self._count_word_syllables(word)
        return total
    
    def _count_word_syllables(self, word: str) -> int:
        """Count syllables in a word"""
        word = word.lower()
        
        # Remove silent 'e' at end
        if word.endswith('e'):
            word = word[:-1]
        
        # Count vowel groups
        vowels = 'aeiouy'
        syllables = 0
        previous_was_vowel = False
        
        for char in word:
            is_vowel = char in vowels
            if is_vowel and not previous_was_vowel:
                syllables += 1
            previous_was_vowel = is_vowel
        
        # Every word has at least one syllable
        return max(1, syllables)
    
    def _count_complex_words(self) -> int:
        """Count words with 3+ syllables"""
        count = 0
        for word in self.stats.words:
            if self._count_word_syllables(word) >= 3:
                count += 1
        return count
    
    def get_readability_level(self) -> str:
        """Get human-readable difficulty level"""
        score = self.flesch_reading_ease()
        
        if score >= 90:
            return "Very Easy (5th grade)"
        elif score >= 80:
            return "Easy (6th grade)"
        elif score >= 70:
            return "Fairly Easy (7th grade)"
        elif score >= 60:
            return "Standard (8th-9th grade)"
        elif score >= 50:
            return "Fairly Difficult (10th-12th grade)"
        elif score >= 30:
            return "Difficult (College)"
        else:
            return "Very Difficult (College graduate)"
    
    def get_scores(self) -> Dict:
        """Get all readability scores"""
        return {
            "flesch_reading_ease": self.flesch_reading_ease(),
            "flesch_kincaid_grade": self.flesch_kincaid_grade(),
            "gunning_fog_index": self.gunning_fog_index(),
            "readability_level": self.get_readability_level()
        }
```

### Keyword Extraction

```python
# keywords.py
from collections import Counter
from typing import List, Tuple
import re

class KeywordExtractor:
    """Extract keywords and phrases"""
    
    def __init__(self, text: str):
        self.text = text
        self.stats = TextStatistics(text)
    
    def extract_keywords(self, n: int = 10) -> List[Tuple[str, int]]:
        """Extract top keywords (excluding stopwords)"""
        return self.stats.most_common_words(n, exclude_stopwords=True)
    
    def extract_ngrams(self, n: int = 2, top_k: int = 10) -> List[Tuple[str, int]]:
        """Extract common n-grams (phrases)"""
        words = self.stats.words
        
        # Generate n-grams
        ngrams = []
        for i in range(len(words) - n + 1):
            ngram = ' '.join(words[i:i+n])
            ngrams.append(ngram)
        
        # Count and return most common
        counter = Counter(ngrams)
        return counter.most_common(top_k)
    
    def find_capitalized_phrases(self) -> List[str]:
        """Find capitalized words/phrases (potential proper nouns)"""
        # Find sequences of capitalized words
        pattern = r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b'
        matches = re.findall(pattern, self.text)
        
        # Remove duplicates while preserving order
        seen = set()
        result = []
        for match in matches:
            if match not in seen:
                seen.add(match)
                result.append(match)
        
        return result
```

### Sentiment Analysis

```python
# sentiment.py
from typing import Dict

class SimpleSentimentAnalyzer:
    """Basic sentiment analysis"""
    
    def __init__(self):
        self.positive_words = {
            'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
            'awesome', 'brilliant', 'superb', 'outstanding', 'perfect', 'best',
            'love', 'happy', 'joy', 'pleased', 'delighted', 'thrilled',
            'beautiful', 'impressive', 'remarkable', 'exceptional', 'splendid'
        }
        
        self.negative_words = {
            'bad', 'terrible', 'awful', 'horrible', 'poor', 'worst', 'hate',
            'dislike', 'disappointing', 'sad', 'unhappy', 'miserable', 'ugly',
            'dreadful', 'pathetic', 'useless', 'worthless', 'inferior', 'fail',
            'problem', 'issue', 'difficult', 'hard', 'wrong', 'error'
        }
    
    def analyze(self, text: str) -> Dict:
        """Analyze sentiment of text"""
        words = TextStatistics(text).words
        
        positive_count = sum(1 for word in words if word in self.positive_words)
        negative_count = sum(1 for word in words if word in self.negative_words)
        
        total_sentiment_words = positive_count + negative_count
        
        if total_sentiment_words == 0:
            sentiment = "neutral"
            score = 0.0
        else:
            score = (positive_count - negative_count) / total_sentiment_words
            
            if score > 0.2:
                sentiment = "positive"
            elif score < -0.2:
                sentiment = "negative"
            else:
                sentiment = "neutral"
        
        return {
            "sentiment": sentiment,
            "score": round(score, 3),
            "positive_words": positive_count,
            "negative_words": negative_count
        }
```

### Report Generator

```python
# report.py
from typing import Dict

class TextAnalysisReport:
    """Generate comprehensive analysis report"""
    
    def __init__(self, text: str):
        self.text = text
        self.stats = TextStatistics(text)
        self.readability = ReadabilityAnalyzer(text)
        self.keywords = KeywordExtractor(text)
        self.sentiment = SimpleSentimentAnalyzer()
    
    def generate_report(self) -> str:
        """Generate full text analysis report"""
        report = []
        
        # Header
        report.append("="*70)
        report.append("TEXT ANALYSIS REPORT")
        report.append("="*70)
        report.append("")
        
        # Basic Statistics
        report.append("BASIC STATISTICS")
        report.append("-"*70)
        summary = self.stats.get_summary()
        report.append(f"Characters (with spaces): {summary['total_characters']:,}")
        report.append(f"Characters (no spaces):   {summary['characters_no_spaces']:,}")
        report.append(f"Words:                    {summary['words']:,}")
        report.append(f"Sentences:                {summary['sentences']:,}")
        report.append(f"Paragraphs:               {summary['paragraphs']:,}")
        report.append(f"Unique Words:             {summary['unique_words']:,}")
        report.append(f"Average Word Length:      {summary['average_word_length']}")
        report.append(f"Average Sentence Length:  {summary['average_sentence_length']} words")
        report.append(f"Lexical Diversity:        {summary['lexical_diversity']}")
        report.append("")
        
        # Readability
        report.append("READABILITY ANALYSIS")
        report.append("-"*70)
        scores = self.readability.get_scores()
        report.append(f"Flesch Reading Ease:      {scores['flesch_reading_ease']}")
        report.append(f"Flesch-Kincaid Grade:     {scores['flesch_kincaid_grade']}")
        report.append(f"Gunning Fog Index:        {scores['gunning_fog_index']}")
        report.append(f"Readability Level:        {scores['readability_level']}")
        report.append("")
        
        # Keywords
        report.append("TOP KEYWORDS")
        report.append("-"*70)
        keywords = self.keywords.extract_keywords(10)
        for i, (word, count) in enumerate(keywords, 1):
            report.append(f"{i:2}. {word:<20} ({count} occurrences)")
        report.append("")
        
        # Common Phrases
        report.append("COMMON PHRASES (2-grams)")
        report.append("-"*70)
        bigrams = self.keywords.extract_ngrams(2, 5)
        for i, (phrase, count) in enumerate(bigrams, 1):
            report.append(f"{i}. {phrase} ({count}x)")
        report.append("")
        
        # Sentiment
        report.append("SENTIMENT ANALYSIS")
        report.append("-"*70)
        sentiment = self.sentiment.analyze(self.text)
        report.append(f"Overall Sentiment:        {sentiment['sentiment'].upper()}")
        report.append(f"Sentiment Score:          {sentiment['score']}")
        report.append(f"Positive Words:           {sentiment['positive_words']}")
        report.append(f"Negative Words:           {sentiment['negative_words']}")
        report.append("")
        
        # Proper Nouns
        proper_nouns = self.keywords.find_capitalized_phrases()
        if proper_nouns:
            report.append("PROPER NOUNS / ENTITIES")
            report.append("-"*70)
            for noun in proper_nouns[:15]:
                report.append(f"- {noun}")
            report.append("")
        
        report.append("="*70)
        
        return "\n".join(report)
```

### CLI Application

```python
# main.py
import sys
from pathlib import Path

def analyze_file(filename: str):
    """Analyze text file"""
    try:
        text = Path(filename).read_text(encoding='utf-8')
        
        report = TextAnalysisReport(text)
        print(report.generate_report())
        
        # Ask to save report
        save = input("\nSave report to file? (y/n): ").strip().lower()
        if save == 'y':
            output_file = filename.replace('.txt', '_analysis.txt')
            Path(output_file).write_text(report.generate_report())
            print(f"✓ Report saved to {output_file}")
    
    except FileNotFoundError:
        print(f"✗ File not found: {filename}")
    except Exception as e:
        print(f"✗ Error: {e}")

def analyze_text_input():
    """Analyze text from user input"""
    print("\nEnter/paste text (press Ctrl+D or Ctrl+Z when done):\n")
    
    lines = []
    try:
        while True:
            line = input()
            lines.append(line)
    except EOFError:
        pass
    
    text = '\n'.join(lines)
    
    if not text.strip():
        print("No text provided.")
        return
    
    report = TextAnalysisReport(text)
    print("\n" + report.generate_report())

def main():
    """Main application"""
    print("="*70)
    print("TEXT ANALYZER")
    print("="*70)
    print("\n1. Analyze File")
    print("2. Analyze Text Input")
    print("3. Exit")
    
    choice = input("\nChoice (1-3): ").strip()
    
    if choice == '1':
        filename = input("Enter filename: ").strip()
        analyze_file(filename)
    
    elif choice == '2':
        analyze_text_input()
    
    elif choice == '3':
        print("Goodbye!")
    
    else:
        print("Invalid choice")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # File provided as command line argument
        analyze_file(sys.argv[1])
    else:
        main()
```

## Usage Examples

```bash
# Analyze a file
python main.py myfile.txt

# Or run interactively
python main.py
```

## Testing

```python
# test_text_analyzer.py
import pytest

def test_word_count():
    text = "Hello world. This is a test."
    stats = TextStatistics(text)
    assert stats.word_count() == 6

def test_sentence_count():
    text = "First sentence. Second sentence! Third?"
    stats = TextStatistics(text)
    assert stats.sentence_count() == 3

def test_readability():
    text = "The cat sat on the mat. It was a sunny day."
    analyzer = ReadabilityAnalyzer(text)
    score = analyzer.flesch_reading_ease()
    assert 0 <= score <= 100

def test_keyword_extraction():
    text = "Python is great. Python is powerful. Python is easy."
    extractor = KeywordExtractor(text)
    keywords = extractor.extract_keywords(1)
    assert keywords[0][0] == "python"

def test_sentiment():
    analyzer = SimpleSentimentAnalyzer()
    
    positive = analyzer.analyze("This is great and wonderful!")
    assert positive["sentiment"] == "positive"
    
    negative = analyzer.analyze("This is terrible and awful!")
    assert negative["sentiment"] == "negative"
```

## Summary

Built comprehensive text analysis tool with:
- Word/character/sentence counting
- Readability scoring
- Keyword extraction
- N-gram analysis
- Sentiment analysis
- Report generation

**Skills Applied:**
- String processing
- Regular expressions
- Statistical analysis
- Algorithm implementation
- File I/O
- Data aggregation
