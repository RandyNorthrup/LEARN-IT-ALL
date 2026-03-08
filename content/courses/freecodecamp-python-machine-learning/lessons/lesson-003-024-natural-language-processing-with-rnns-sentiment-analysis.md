---
id: lesson-003-024
title: Natural Language Processing With RNNs: Sentiment Analysis
chapterId: chapter-03
order: 24
duration: 5
objectives:
  - Handle class imbalance in text classification datasets
  - Evaluate NLP model performance using accuracy, precision, recall, and ROC-AUC
  - Understand how pre-trained word embeddings improve model quality
  - Recognize the concept of attention mechanisms in sequence models
  - Identify common pitfalls like data leakage and overfitting in NLP pipelines
---

# Natural Language Processing With RNNs: Sentiment Analysis

Building a basic sentiment analysis model is just the beginning. This lesson covers **advanced techniques** for improving model performance, choosing the right evaluation metrics, and avoiding common pitfalls that plague NLP projects.

## Handling Class Imbalance

In real-world sentiment analysis, datasets are often imbalanced — you may have far more positive reviews than negative ones (or vice versa). An imbalanced dataset causes the model to be biased toward the majority class.

**Strategies to handle imbalance:**

```python
import numpy as np
from sklearn.utils.class_weight import compute_class_weight

# Compute class weights inversely proportional to class frequency
class_weights = compute_class_weight(
    'balanced',
    classes=np.unique(train_labels),
    y=train_labels
)
class_weight_dict = {0: class_weights[0], 1: class_weights[1]}

# Pass class weights during training
history = model.fit(
    train_data, train_labels,
    epochs=5,
    batch_size=64,
    class_weight=class_weight_dict,  # Penalizes misclassifying minority class more
    validation_split=0.2
)
```

Other approaches include **oversampling** the minority class, **undersampling** the majority class, or using **focal loss** which down-weights easy examples and focuses training on hard misclassifications.

## Word Embeddings Quality

The quality of word embeddings significantly impacts model performance. Instead of learning embeddings from scratch, you can use **pre-trained embeddings** that capture semantic relationships learned from billions of words:

- **Word2Vec**: Trained on Google News (~100B words), captures word analogies
- **GloVe**: Trained on Wikipedia + Common Crawl, available in 50-300 dimensions
- **FastText**: Handles out-of-vocabulary words by using character n-grams

```python
# Using pre-trained GloVe embeddings
import numpy as np

embedding_dim = 100
embedding_matrix = np.zeros((vocab_size, embedding_dim))

# Load GloVe vectors (downloaded separately)
with open('glove.6B.100d.txt', encoding='utf-8') as f:
    for line in f:
        values = line.split()
        word = values[0]
        if word in word_index and word_index[word] < vocab_size:
            embedding_matrix[word_index[word]] = np.array(values[1:], dtype='float32')

# Create embedding layer with pre-trained weights
embedding_layer = tf.keras.layers.Embedding(
    vocab_size, embedding_dim,
    weights=[embedding_matrix],
    trainable=False  # Freeze embeddings, or set True to fine-tune
)
```

Pre-trained embeddings are especially valuable when your training dataset is small, as they provide semantic knowledge the model would otherwise need thousands of examples to learn.

## The Attention Mechanism Concept

Standard LSTMs compress an entire sequence into a single fixed-size vector, which creates an information bottleneck. The **attention mechanism** addresses this by allowing the model to focus on the most relevant parts of the input:

1. The model assigns an **attention weight** to each word in the sequence
2. The final representation is a **weighted sum** of all hidden states, not just the last one
3. Words more relevant to the task receive higher weights

For sentiment analysis, attention naturally learns to focus on sentiment-bearing words like "excellent," "terrible," or "disappointing" while ignoring neutral words like "the" or "movie."

## Evaluating NLP Models

Accuracy alone is insufficient for evaluating sentiment analysis models. Use multiple metrics:

```python
from sklearn.metrics import classification_report, roc_auc_score

# Get predictions
predictions = model.predict(test_data)
pred_labels = (predictions > 0.5).astype(int).flatten()

# Detailed classification report
print(classification_report(test_labels, pred_labels,
                          target_names=['Negative', 'Positive']))

# ROC-AUC score
auc_score = roc_auc_score(test_labels, predictions)
print(f"ROC-AUC: {auc_score:.4f}")
```

| Metric | What It Measures | When to Prioritize |
|--------|-----------------|--------------------|
| **Accuracy** | Overall correctness | Balanced datasets |
| **Precision** | Of predicted positives, how many are correct | When false positives are costly |
| **Recall** | Of actual positives, how many were found | When false negatives are costly |
| **F1-Score** | Harmonic mean of precision and recall | Imbalanced datasets |
| **ROC-AUC** | Discrimination ability across all thresholds | Comparing models, threshold-agnostic evaluation |

## Common Pitfalls in NLP

**Data leakage in text**: This occurs when information from the test set inadvertently influences training. Common sources include:
- Fitting tokenizers or vocabulary on the entire dataset (including test data) before splitting
- Using TF-IDF statistics computed on all data
- Duplicate or near-duplicate reviews appearing in both train and test sets

**Overfitting on text data**: Text models are prone to overfitting because they can memorize specific phrases rather than learn generalizable patterns. Mitigation strategies:
- Use dropout in both embedding and recurrent layers
- Apply regularization (L2) to dense layers
- Monitor the gap between training and validation accuracy
- Use early stopping to halt training when validation loss stops improving

```python
early_stop = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=3,
    restore_best_weights=True
)
```

## Key Takeaways

- **Class imbalance** is common in real-world NLP and requires explicit handling through class weights or sampling strategies
- **Pre-trained embeddings** like GloVe inject semantic knowledge and improve performance, especially on small datasets
- The **attention mechanism** lets models focus on relevant words instead of compressing everything into one vector
- Use **multiple evaluation metrics** (precision, recall, F1, ROC-AUC) to get a complete picture of model performance
- Guard against **data leakage** by fitting preprocessing steps only on training data

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
