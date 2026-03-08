---
id: lesson-003-003
title: Core Learning Algorithms
chapterId: chapter-03
order: 3
duration: 5
objectives:
  - Identify the four core machine learning algorithm families covered in the TensorFlow curriculum
  - Explain when to use linear regression versus classification for a given problem
  - Distinguish between supervised algorithms (regression, classification) and unsupervised algorithms (clustering)
  - Describe real-world use cases for each of the four algorithm families
  - Understand how Hidden Markov Models use probability to model sequential data
---

# Core Learning Algorithms

TensorFlow and scikit-learn provide implementations of many machine learning algorithms, but most problems can be addressed with four fundamental algorithm families. Understanding when and why to use each one is more important than memorizing implementation details. This lesson provides an overview of all four families before we dive deep into each one.

## The Four Core Algorithm Families

```
Core ML Algorithms
├── 1. Linear Regression     (Supervised — predict a number)
├── 2. Classification         (Supervised — predict a category)
├── 3. Clustering             (Unsupervised — discover groups)
└── 4. Hidden Markov Models   (Probabilistic — model sequences)
```

## 1. Linear Regression

**What it does**: Predicts a continuous numeric value based on input features by fitting a straight line (or hyperplane) through the data.

**The core idea**: Find the line of best fit described by `y = mx + b` (or more generally, `y = w₁x₁ + w₂x₂ + ... + b`) that minimizes the distance between predictions and actual values.

**When to use it**:
- The output you want to predict is a continuous number.
- You suspect a roughly linear relationship between inputs and output.
- You need an interpretable model where you can understand feature contributions.

**Real-world use cases**:
- Predicting house prices based on square footage, location, and number of rooms.
- Estimating a person's salary based on years of experience.
- Forecasting sales revenue based on advertising spend.
- Predicting temperature based on historical weather data.

```python
# Simple linear regression concept
# y = weight * x + bias
# Goal: learn the best weight and bias from data
predicted_price = 150 * square_footage + 50000
```

## 2. Classification

**What it does**: Assigns input data to one of several predefined categories (classes).

**The core idea**: Learn a decision boundary that separates data points belonging to different classes. Rather than predicting a number, the model outputs a class label or a probability distribution over classes.

**When to use it**:
- The output is a discrete category, not a continuous number.
- You have labeled training data for each category.
- Binary (two classes) or multi-class (three or more classes) problems.

**Real-world use cases**:
- Email spam detection (spam or not spam — binary).
- Classifying flower species from petal measurements (multi-class).
- Diagnosing diseases from medical images.
- Sentiment analysis of product reviews (positive, negative, neutral).

```python
# Classification outputs a category
# Input: petal_length=1.4, petal_width=0.2
# Output: "setosa" (one of three iris species)
```

## 3. Clustering

**What it does**: Groups unlabeled data points into clusters based on similarity, without any predefined categories.

**The core idea**: Points within the same cluster are more similar to each other than to points in other clusters. The algorithm discovers structure in the data on its own — you do not provide labels.

**When to use it**:
- You do not have labeled data.
- You want to discover natural groupings or patterns.
- Exploratory data analysis before applying supervised methods.

**Real-world use cases**:
- Customer segmentation for targeted marketing.
- Grouping news articles by topic.
- Identifying anomalous network traffic (anomaly detection).
- Organizing a photo library by visual similarity.

```python
# Clustering discovers groups
# Input: customer purchase data (no labels)
# Output: 4 clusters (e.g., "budget shoppers", "premium buyers", ...)
```

## 4. Hidden Markov Models (HMMs)

**What it does**: Models systems that transition between hidden (unobservable) states over time, where each state produces observable outputs with certain probabilities.

**The core idea**: You cannot directly observe the true state of a system, but you can observe outputs that depend on the state. The model uses transition probabilities (how likely you are to move between states) and emission probabilities (how likely each observation is given a state) to make inferences.

**When to use it**:
- You are modeling sequential or time-series data.
- The underlying system has states you cannot directly observe.
- Probabilities of observations depend on the current state.

**Real-world use cases**:
- Weather prediction (hidden state: actual weather pattern; observation: reported conditions).
- Speech recognition (hidden: phonemes; observed: audio signals).
- Part-of-speech tagging in natural language processing.
- Stock market regime detection (bull vs. bear markets).

```python
# HMM concept
# Hidden states:  [Sunny, Rainy]  — you can't see these directly
# Observations:   [Happy, Grumpy] — you observe these
# Transition probabilities: Sunny→Sunny=0.8, Sunny→Rainy=0.2, ...
# Emission probabilities: Sunny→Happy=0.8, Sunny→Grumpy=0.2, ...
```

## Choosing the Right Algorithm

| Question | Answer | Algorithm |
|----------|--------|-----------|
| Do you have labeled data? | No | Clustering |
| Is the output a number? | Yes | Linear Regression |
| Is the output a category? | Yes | Classification |
| Is the data sequential with hidden states? | Yes | Hidden Markov Models |

In practice, the choice often starts with the type of output you need and the data you have available. The upcoming lessons will explore each of these algorithm families in detail, with hands-on TensorFlow code.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
