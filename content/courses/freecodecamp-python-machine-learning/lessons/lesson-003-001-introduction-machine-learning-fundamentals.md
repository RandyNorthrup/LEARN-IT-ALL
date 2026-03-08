---
id: lesson-003-001
title: Introduction: Machine Learning Fundamentals
chapterId: chapter-03
order: 1
duration: 5
objectives:
  - Distinguish between supervised, unsupervised, and reinforcement learning paradigms
  - Identify features and labels in a dataset and explain their roles in model training
  - Explain the train/test split methodology and why it prevents overfitting
  - Recognize the symptoms of overfitting and underfitting in a machine learning model
  - Describe the general machine learning workflow from data collection to prediction
---

# Introduction: Machine Learning Fundamentals

Machine learning is a subset of artificial intelligence that enables computers to learn patterns from data without being explicitly programmed for every scenario. Instead of writing rules by hand, you provide data and let algorithms discover the underlying structure. This lesson covers the foundational concepts you need before diving into TensorFlow.

## What Is Machine Learning?

Traditional programming follows a simple paradigm: you write rules, feed in data, and get answers. Machine learning flips this around — you provide data and answers (labels), and the algorithm learns the rules.

```
Traditional Programming:    Rules + Data      → Answers
Machine Learning:           Data + Answers     → Rules (Model)
```

A **model** is the output of a machine learning algorithm trained on data. Once trained, a model can make predictions on new, unseen data.

## The Three Types of Machine Learning

Machine learning algorithms fall into three broad categories:

```
Machine Learning
├── Supervised Learning
│   ├── Classification (predict a category)
│   │   └── Examples: spam detection, image recognition, diagnosis
│   └── Regression (predict a continuous value)
│       └── Examples: house prices, temperature forecasting, stock prices
├── Unsupervised Learning
│   ├── Clustering (group similar data)
│   │   └── Examples: customer segmentation, document grouping
│   └── Dimensionality Reduction
│       └── Examples: feature extraction, data visualization
└── Reinforcement Learning
    └── Agent learns by interacting with an environment
        └── Examples: game playing, robotics, autonomous vehicles
```

**Supervised learning** uses labeled data — every training example has an input paired with the correct output. The algorithm learns a mapping function from inputs to outputs. This is the most common type of machine learning in practice.

**Unsupervised learning** works with unlabeled data. The algorithm tries to find hidden patterns or groupings in the data without being told what to look for.

**Reinforcement learning** involves an agent that takes actions in an environment and receives rewards or penalties. The agent learns a strategy (policy) that maximizes cumulative reward over time.

## Features and Labels

In supervised learning, your dataset consists of **features** and **labels**:

- **Features** (X): The input variables used to make predictions. For a house price model, features might include square footage, number of bedrooms, and location.
- **Labels** (y): The output variable you want to predict. In the house price example, the label is the sale price.

```python
# Example dataset structure
# Features (X)                    | Label (y)
# sq_ft | bedrooms | location     | price
# 1500  | 3        | suburban      | 250000
# 2200  | 4        | urban         | 450000
# 800   | 1        | urban         | 180000
```

## Training and Evaluation

To evaluate how well a model performs, you split your data into two sets:

- **Training set** (typically 70-80%): Used to train the model.
- **Testing set** (typically 20-30%): Used to evaluate the model on data it has never seen.

This split is critical. If you evaluate a model on the same data it was trained on, you get an overly optimistic estimate of its performance. The test set simulates real-world, unseen data.

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    features, labels, test_size=0.2, random_state=42
)
```

## Overfitting and Underfitting

Two common problems arise during model training:

**Overfitting** occurs when a model learns the training data too well, including noise and outliers. The model performs excellently on training data but poorly on new data. Signs include a large gap between training accuracy and test accuracy. Imagine memorizing every answer on a practice test but failing the real exam because the questions are slightly different.

**Underfitting** occurs when a model is too simple to capture the underlying pattern in the data. It performs poorly on both training and test data. This often happens when the model lacks sufficient complexity or when training is stopped too early.

```
Model Complexity Spectrum:

Underfitting          Good Fit           Overfitting
(High Bias)          (Balanced)        (High Variance)
  ──────────────────────────────────────────────
  Too simple          Just right         Too complex
  Misses patterns     Captures signal    Memorizes noise
  Poor train acc.     Good train acc.    Perfect train acc.
  Poor test acc.      Good test acc.     Poor test acc.
```

The goal is to find the sweet spot — a model complex enough to capture real patterns but general enough to work on new data. Techniques like regularization, cross-validation, and early stopping help you find this balance.

## The Machine Learning Workflow

1. **Define the problem**: What are you trying to predict or discover?
2. **Collect and prepare data**: Gather data, clean it, handle missing values.
3. **Choose features**: Select the most relevant input variables.
4. **Split the data**: Divide into training and testing sets.
5. **Choose and train a model**: Select an algorithm and fit it to training data.
6. **Evaluate**: Measure performance on the test set.
7. **Tune and iterate**: Adjust hyperparameters, try different models, improve.

With these fundamentals in place, you are ready to start working with TensorFlow and implementing real machine learning models.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
