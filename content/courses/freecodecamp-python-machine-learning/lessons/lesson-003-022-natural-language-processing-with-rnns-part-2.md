---
id: lesson-003-022
title: Natural Language Processing With RNNs: Part 2
chapterId: chapter-03
order: 22
duration: 5
objectives:
  - Build a sentiment analysis model using LSTM layers on the IMDB dataset
  - Preprocess raw text data using tf.keras.preprocessing utilities
  - Construct an Embedding → LSTM → Dense architecture for text classification
  - Evaluate binary classification performance on movie review data
  - Apply padding and truncation to create uniform-length input sequences
---

# Natural Language Processing With RNNs: Part 2

In this lesson, we move from RNN theory to practice by building a **sentiment analysis model** that classifies movie reviews as positive or negative. We will use the IMDB dataset, one of the most widely used benchmark datasets for text classification, and build a complete pipeline from raw text to trained model.

## The IMDB Movie Review Dataset

The IMDB dataset contains 50,000 movie reviews split evenly into 25,000 training and 25,000 testing samples. Each review is labeled as either positive (1) or negative (0), making this a **binary classification** problem.

TensorFlow provides this dataset directly through Keras:

```python
import tensorflow as tf
from tensorflow.keras.datasets import imdb
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Load the dataset - keep only the top 10,000 most frequent words
VOCAB_SIZE = 10000
(train_data, train_labels), (test_data, test_labels) = imdb.load_data(num_words=VOCAB_SIZE)

print(f"Training samples: {len(train_data)}")
print(f"Test samples: {len(test_data)}")
print(f"First review (encoded): {train_data[0][:20]}...")  # Shows integer-encoded words
```

The reviews come pre-encoded as sequences of integers, where each integer represents a specific word in the vocabulary. The `num_words=10000` parameter keeps only the 10,000 most frequent words, replacing rarer words with an out-of-vocabulary token.

## Preprocessing: Padding Sequences

Movie reviews vary in length, but neural networks need fixed-size inputs. We use **padding** to make all sequences the same length:

```python
MAXLEN = 250  # Maximum review length

# Pad sequences - shorter reviews get zeros, longer ones are truncated
train_data = pad_sequences(train_data, maxlen=MAXLEN, padding='post', truncating='post')
test_data = pad_sequences(test_data, maxlen=MAXLEN, padding='post', truncating='post')

print(f"Padded shape: {train_data.shape}")  # (25000, 250)
```

- **`padding='post'`**: Adds zeros at the end of shorter sequences
- **`truncating='post'`**: Cuts off the end of longer sequences
- **`maxlen=250`**: A common choice that captures most of a review's sentiment-bearing content without excessive computation

## Building the Sentiment Analysis Model

Our model follows the classic **Embedding → LSTM → Dense** pattern for text classification:

```python
model = tf.keras.Sequential([
    # Embedding layer: converts word indices to dense vectors
    tf.keras.layers.Embedding(VOCAB_SIZE, 64, input_length=MAXLEN),
    
    # LSTM layer: processes the sequence and outputs a single vector
    tf.keras.layers.LSTM(64, dropout=0.2, recurrent_dropout=0.2),
    
    # Dense output layer: binary classification
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

model.summary()
```

**Layer-by-layer breakdown:**

1. **Embedding(10000, 64)**: Maps each of the 10,000 vocabulary words to a 64-dimensional dense vector. The model learns these embeddings during training, capturing semantic relationships between words.

2. **LSTM(64)**: Reads through the embedded sequence one word at a time, maintaining a hidden state that captures context. By default, it returns only the final hidden state — a 64-dimensional summary of the entire review.

3. **Dense(1, sigmoid)**: Outputs a probability between 0 and 1, representing the likelihood that the review is positive.

## Training the Model

```python
history = model.fit(
    train_data, train_labels,
    epochs=5,
    batch_size=64,
    validation_split=0.2,
    verbose=1
)
```

We set aside 20% of training data for validation to monitor overfitting. With this architecture, you should see validation accuracy reach approximately **85-87%** within 5 epochs.

## Evaluating the Model

```python
loss, accuracy = model.evaluate(test_data, test_labels)
print(f"Test accuracy: {accuracy:.4f}")
```

## Decoding Reviews for Inspection

To understand what the model is processing, you can decode the integer sequences back to text:

```python
word_index = imdb.get_word_index()
reverse_word_index = {value + 3: key for key, value in word_index.items()}
reverse_word_index[0] = '<PAD>'
reverse_word_index[1] = '<START>'
reverse_word_index[2] = '<UNK>'

def decode_review(encoded_review):
    return ' '.join([reverse_word_index.get(i, '?') for i in encoded_review])

print(decode_review(train_data[0]))
```

## Key Takeaways

- The **IMDB dataset** provides a clean benchmark for binary text classification with 50,000 labeled reviews
- **Padding and truncation** are essential to create uniform-length inputs from variable-length text
- The **Embedding → LSTM → Dense** architecture is a foundational pattern for text classification
- **Dropout** in LSTM layers helps prevent overfitting on text data, where patterns can be sparse
- Even a simple single-layer LSTM model can achieve solid performance on sentiment analysis tasks

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
