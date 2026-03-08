---
id: lesson-170-text-analyzer
title: "Text Analysis Tool"
chapterId: ch13-practice
order: 5
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

def extract_words(text):
    """Extract words from text"""
    # Remove punctuation and convert to lowercase
    words = re.findall(r'\b[a-zA-Z]+\b', text.lower())
    return words

def extract_sentences(text):
    """Extract sentences from text"""
    # Split on sentence terminators
    sentences = re.split(r'[.!?]+', text)
    return [s.strip() for s in sentences if s.strip()]

def get_stopwords():
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

def character_count(text, include_spaces=True):
    """Count characters"""
    if include_spaces:
        return len(text)
    else:
        return len(text.replace(' ', ''))

def word_count(text):
    """Count words"""
    return len(extract_words(text))

def sentence_count(text):
    """Count sentences"""
    return len(extract_sentences(text))

def paragraph_count(text):
    """Count paragraphs"""
    paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]
    return len(paragraphs)

def average_word_length(text):
    """Calculate average word length"""
    words = extract_words(text)
    if not words:
        return 0.0
    return sum(len(word) for word in words) / len(words)

def average_sentence_length(text):
    """Calculate average words per sentence"""
    words = extract_words(text)
    sentences = extract_sentences(text)
    if not sentences:
        return 0.0
    return len(words) / len(sentences)

def unique_word_count(text):
    """Count unique words"""
    return len(set(extract_words(text)))

def lexical_diversity(text):
    """Calculate lexical diversity (unique words / total words)"""
    words = extract_words(text)
    if not words:
        return 0.0
    return len(set(words)) / len(words)

def most_common_words(text, n=10, exclude_stopwords=True):
    """Get most frequent words"""
    words = extract_words(text)

    if exclude_stopwords:
        stopwords = get_stopwords()
        words = [w for w in words if w not in stopwords]

    counter = Counter(words)
    return counter.most_common(n)

def get_text_summary(text):
    """Get all statistics as a dictionary"""
    return {
        "total_characters": character_count(text, True),
        "characters_no_spaces": character_count(text, False),
        "words": word_count(text),
        "sentences": sentence_count(text),
        "paragraphs": paragraph_count(text),
        "unique_words": unique_word_count(text),
        "average_word_length": round(average_word_length(text), 2),
        "average_sentence_length": round(average_sentence_length(text), 2),
        "lexical_diversity": round(lexical_diversity(text), 3)
    }
```

### Readability Analysis

```python
# readability.py
import re
import math
from text_stats import extract_words, word_count, sentence_count

def count_word_syllables(word):
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

def count_total_syllables(text):
    """Count total syllables in text"""
    words = extract_words(text)
    total = 0
    for word in words:
        total += count_word_syllables(word)
    return total

def count_complex_words(text):
    """Count words with 3+ syllables"""
    words = extract_words(text)
    count = 0
    for word in words:
        if count_word_syllables(word) >= 3:
            count += 1
    return count

def flesch_reading_ease(text):
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
    words = word_count(text)
    sentences = sentence_count(text)
    syllables = count_total_syllables(text)

    if words == 0 or sentences == 0:
        return 0.0

    score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
    return round(max(0, min(100, score)), 2)

def flesch_kincaid_grade(text):
    """
    Calculate Flesch-Kincaid Grade Level
    0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59

    Result indicates US grade level needed to understand text
    """
    words = word_count(text)
    sentences = sentence_count(text)
    syllables = count_total_syllables(text)

    if words == 0 or sentences == 0:
        return 0.0

    grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
    return round(max(0, grade), 2)

def gunning_fog_index(text):
    """
    Calculate Gunning Fog Index
    0.4 * ((words/sentences) + 100 * (complex_words/words))

    Result indicates years of formal education needed
    """
    words = word_count(text)
    sentences = sentence_count(text)
    complex_words = count_complex_words(text)

    if words == 0 or sentences == 0:
        return 0.0

    fog = 0.4 * ((words / sentences) + 100 * (complex_words / words))
    return round(fog, 2)

def get_readability_level(text):
    """Get human-readable difficulty level"""
    score = flesch_reading_ease(text)

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

def get_readability_scores(text):
    """Get all readability scores"""
    return {
        "flesch_reading_ease": flesch_reading_ease(text),
        "flesch_kincaid_grade": flesch_kincaid_grade(text),
        "gunning_fog_index": gunning_fog_index(text),
        "readability_level": get_readability_level(text)
    }
```

### Keyword Extraction

```python
# keywords.py
from collections import Counter
import re
from text_stats import extract_words, most_common_words

def extract_keywords(text, n=10):
    """Extract top keywords (excluding stopwords)"""
    return most_common_words(text, n, exclude_stopwords=True)

def extract_ngrams(text, n=2, top_k=10):
    """Extract common n-grams (phrases)"""
    words = extract_words(text)

    # Generate n-grams
    ngrams = []
    for i in range(len(words) - n + 1):
        ngram = ' '.join(words[i:i+n])
        ngrams.append(ngram)

    # Count and return most common
    counter = Counter(ngrams)
    return counter.most_common(top_k)

def find_capitalized_phrases(text):
    """Find capitalized words/phrases (potential proper nouns)"""
    # Find sequences of capitalized words
    pattern = r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b'
    matches = re.findall(pattern, text)

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
from text_stats import extract_words

# Sentiment word lists (module-level data)
POSITIVE_WORDS = {
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
    'awesome', 'brilliant', 'superb', 'outstanding', 'perfect', 'best',
    'love', 'happy', 'joy', 'pleased', 'delighted', 'thrilled',
    'beautiful', 'impressive', 'remarkable', 'exceptional', 'splendid'
}

NEGATIVE_WORDS = {
    'bad', 'terrible', 'awful', 'horrible', 'poor', 'worst', 'hate',
    'dislike', 'disappointing', 'sad', 'unhappy', 'miserable', 'ugly',
    'dreadful', 'pathetic', 'useless', 'worthless', 'inferior', 'fail',
    'problem', 'issue', 'difficult', 'hard', 'wrong', 'error'
}

def analyze_sentiment(text):
    """Analyze sentiment of text"""
    words = extract_words(text)

    positive_count = sum(1 for word in words if word in POSITIVE_WORDS)
    negative_count = sum(1 for word in words if word in NEGATIVE_WORDS)

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
from text_stats import get_text_summary
from readability import get_readability_scores
from keywords import extract_keywords, extract_ngrams, find_capitalized_phrases
from sentiment import analyze_sentiment

def generate_analysis_report(text):
    """Generate comprehensive text analysis report"""
    report = []

    # Header
    report.append("="*70)
    report.append("TEXT ANALYSIS REPORT")
    report.append("="*70)
    report.append("")

    # Basic Statistics
    report.append("BASIC STATISTICS")
    report.append("-"*70)
    summary = get_text_summary(text)
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
    scores = get_readability_scores(text)
    report.append(f"Flesch Reading Ease:      {scores['flesch_reading_ease']}")
    report.append(f"Flesch-Kincaid Grade:     {scores['flesch_kincaid_grade']}")
    report.append(f"Gunning Fog Index:        {scores['gunning_fog_index']}")
    report.append(f"Readability Level:        {scores['readability_level']}")
    report.append("")

    # Keywords
    report.append("TOP KEYWORDS")
    report.append("-"*70)
    keywords = extract_keywords(text, 10)
    for i, (word, count) in enumerate(keywords, 1):
        report.append(f"{i:2}. {word:<20} ({count} occurrences)")
    report.append("")

    # Common Phrases
    report.append("COMMON PHRASES (2-grams)")
    report.append("-"*70)
    bigrams = extract_ngrams(text, 2, 5)
    for i, (phrase, count) in enumerate(bigrams, 1):
        report.append(f"{i}. {phrase} ({count}x)")
    report.append("")

    # Sentiment
    report.append("SENTIMENT ANALYSIS")
    report.append("-"*70)
    sentiment = analyze_sentiment(text)
    report.append(f"Overall Sentiment:        {sentiment['sentiment'].upper()}")
    report.append(f"Sentiment Score:          {sentiment['score']}")
    report.append(f"Positive Words:           {sentiment['positive_words']}")
    report.append(f"Negative Words:           {sentiment['negative_words']}")
    report.append("")

    # Proper Nouns
    proper_nouns = find_capitalized_phrases(text)
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
from report import generate_analysis_report

def analyze_file(filename):
    """Analyze text file"""
    try:
        text = Path(filename).read_text(encoding='utf-8')

        report = generate_analysis_report(text)
        print(report)

        # Ask to save report
        save = input("\nSave report to file? (y/n): ").strip().lower()
        if save == 'y':
            output_file = filename.replace('.txt', '_analysis.txt')
            Path(output_file).write_text(report)
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

    report = generate_analysis_report(text)
    print("\n" + report)

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
    assert word_count(text) == 6

def test_sentence_count():
    text = "First sentence. Second sentence! Third?"
    assert sentence_count(text) == 3

def test_readability():
    text = "The cat sat on the mat. It was a sunny day."
    score = flesch_reading_ease(text)
    assert 0 <= score <= 100

def test_keyword_extraction():
    text = "Python is great. Python is powerful. Python is easy."
    keywords = extract_keywords(text, 1)
    assert keywords[0][0] == "python"

def test_sentiment():
    positive = analyze_sentiment("This is great and wonderful!")
    assert positive["sentiment"] == "positive"

    negative = analyze_sentiment("This is terrible and awful!")
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
