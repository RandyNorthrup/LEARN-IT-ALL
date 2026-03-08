---
id: lesson-003-005
title: Core Learning Algorithms: Training and Testing Data
chapterId: chapter-03
order: 5
duration: 5
objectives:
  - Explain the rationale behind splitting data into training and testing sets
  - Use sklearn's train_test_split to divide a dataset with appropriate parameters
  - Understand cross-validation and when it provides better evaluation than a single split
  - Identify data leakage and explain why it produces misleading model performance
  - Apply stratified splitting to maintain class distribution in imbalanced datasets
---

# Core Learning Algorithms: Training and Testing Data

How you split your data has a direct impact on how well you can evaluate your model. A poor split can give you a false sense of confidence or cause your model to miss important patterns. This lesson covers the principles and techniques for properly dividing data into training and testing sets.

## Why Split at All?

Imagine a student who only studies questions from a specific practice exam. They score 100% on that practice exam, but when they take the real exam with different questions, they fail. The student memorized answers rather than learning the underlying material.

The same thing happens with machine learning models. If you evaluate a model on the same data it was trained on, you cannot tell whether it learned general patterns or just memorized the training examples. Splitting ensures you measure real predictive ability.

```
Full Dataset
┌─────────────────────────────────────────────────┐
│  Training Data (80%)       │ Test (20%) │
│  Model learns from this   │ Evaluate   │
└─────────────────────────────────────────────────┘
```

## Using train_test_split

The `train_test_split` function from scikit-learn is the standard way to split data:

```python
from sklearn.model_selection import train_test_split
import pandas as pd

# Load a dataset
df = pd.read_csv('housing.csv')
X = df.drop('price', axis=1)  # Features
y = df['price']                # Labels

# Split: 80% training, 20% testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Training samples: {len(X_train)}")
print(f"Testing samples:  {len(X_test)}")
```

### Key Parameters

- **test_size**: Fraction of data reserved for testing (0.2 = 20%). Common values range from 0.15 to 0.3.
- **random_state**: A seed for reproducibility. Using the same seed always produces the same split.
- **shuffle**: Whether to shuffle before splitting (default True). Almost always leave this as True.

## The Danger of Data Leakage

**Data leakage** occurs when information from the test set inadvertently influences the training process. This leads to artificially inflated performance metrics that do not reflect real-world accuracy.

Common sources of leakage:

```python
# BAD: Normalizing before splitting (uses test data statistics)
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # Leaks test set statistics!
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y)

# GOOD: Normalize after splitting (only uses training data statistics)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)   # Learn from training only
X_test = scaler.transform(X_test)          # Apply same transformation
```

The rule is simple: **never use test data to make any decisions about preprocessing, feature selection, or model tuning.**

## Stratified Splitting

When your dataset has imbalanced classes (e.g., 95% negative, 5% positive), a random split might put all positive examples in the training set and none in the test set. Stratified splitting ensures each split maintains the same class proportions as the original dataset:

```python
# Without stratification (risky for imbalanced data)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# With stratification (preserves class ratios)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Verify the class distribution is preserved
print(f"Original:  {y.value_counts(normalize=True).to_dict()}")
print(f"Training:  {y_train.value_counts(normalize=True).to_dict()}")
print(f"Testing:   {y_test.value_counts(normalize=True).to_dict()}")
```

## Cross-Validation

A single train/test split can be unreliable, especially with small datasets. The split might accidentally put all the “easy” examples in the training set. **K-fold cross-validation** addresses this by performing multiple splits:

```
5-Fold Cross-Validation:

Fold 1: [Test] [Train] [Train] [Train] [Train]
Fold 2: [Train] [Test] [Train] [Train] [Train]
Fold 3: [Train] [Train] [Test] [Train] [Train]
Fold 4: [Train] [Train] [Train] [Test] [Train]
Fold 5: [Train] [Train] [Train] [Train] [Test]

Final score = average of all 5 fold scores
```

Each data point appears in the test set exactly once. The final evaluation metric is the average across all folds:

```python
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression

model = LinearRegression()

# 5-fold cross-validation
scores = cross_val_score(model, X, y, cv=5, scoring='r2')

print(f"Fold scores: {scores}")
print(f"Mean R²: {scores.mean():.4f} (+/- {scores.std():.4f})")
```

## Practical Guidelines

| Dataset Size | Recommended Approach |
|-------------|---------------------|
| < 1,000 samples | K-fold cross-validation (k=5 or 10) |
| 1,000 – 100,000 | Train/test split (80/20) or cross-validation |
| > 100,000 | Train/test split is sufficient |

- Always split **before** any preprocessing.
- Use stratified splitting for classification tasks.
- Set a `random_state` for reproducibility during development.
- For final model evaluation, consider a three-way split: train/validation/test.

Proper data splitting is one of the simplest yet most important practices in machine learning. Get this wrong and every metric you report will be misleading.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
