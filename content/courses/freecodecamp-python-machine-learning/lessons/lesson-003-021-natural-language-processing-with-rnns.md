---
id: lesson-003-021
title: Natural Language Processing With RNNs
chapterId: chapter-03
order: 21
duration: 5
objectives:
  - Describe the text preprocessing pipeline from raw text to model input
  - Explain tokenization and sequence padding for neural network input
  - Compare bag-of-words and sequential approaches to text representation
  - Understand word embeddings and their role in capturing semantic meaning
  - Use tf.keras.layers.Embedding to learn word representations
---

# Natural Language Processing With RNNs

**Natural Language Processing (NLP)** is the field of machine learning that deals with text and language. Unlike images (which have a fixed grid structure), text is **sequential** — the order of words matters. "The dog bit the man" means something very different from "The man bit the dog." This is why sequential models like Recurrent Neural Networks (RNNs) are well-suited for language tasks.

## Text Preprocessing Pipeline

Before text can be fed into any neural network, it must be transformed from raw strings into numerical sequences. The standard pipeline is:

### 1. Tokenization

**Tokenization** converts text into a sequence of tokens (usually words or subwords) and maps each token to a unique integer:

```python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.text import Tokenizer

# Example sentences
sentences = [
    "I love machine learning",
    "Machine learning is amazing",
    "Deep learning is a subset of machine learning"
]

# Create tokenizer and build vocabulary
tokenizer = Tokenizer(num_words=10000, oov_token='<OOV>')
tokenizer.fit_on_texts(sentences)

# View the word-to-index mapping
print(tokenizer.word_index)
# {'<OOV>': 1, 'learning': 2, 'machine': 3, 'is': 4, 'i': 5,
#  'love': 6, 'amazing': 7, 'deep': 8, 'a': 9, 'subset': 10, 'of': 11}

# Convert sentences to sequences of integers
sequences = tokenizer.texts_to_sequences(sentences)
print(sequences)
# [[5, 6, 3, 2], [3, 2, 4, 7], [8, 2, 4, 9, 10, 11, 3, 2]]
```

`num_words=10000` keeps only the 10,000 most frequent words. `oov_token='<OOV>'` assigns a token for out-of-vocabulary words encountered at inference time.

### 2. Padding

Neural networks expect inputs of **uniform length**. Since sentences have different lengths, we **pad** shorter sequences with zeros (or truncate longer ones):

```python
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Pad sequences to the same length
padded = pad_sequences(sequences, maxlen=8, padding='post', truncating='post')
print(padded)
# [[ 5  6  3  2  0  0  0  0]
#  [ 3  2  4  7  0  0  0  0]
#  [ 8  2  4  9 10 11  3  2]]
```

- `maxlen`: Maximum sequence length. Choose based on your dataset (often the 95th percentile of sentence lengths).
- `padding='post'`: Add zeros at the end (after the sentence). `'pre'` adds them at the beginning.
- `truncating='post'`: Cut from the end if a sequence exceeds maxlen.

## Bag of Words vs. Sequential Approaches

### Bag of Words (BoW)

The simplest text representation counts word occurrences without considering order:

- "the cat sat on the mat" → {the: 2, cat: 1, sat: 1, on: 1, mat: 1}

**Pros**: Simple, fast, works surprisingly well for many classification tasks.

**Cons**: Loses all word order. "Dog bites man" and "Man bites dog" have identical representations. Cannot capture phrases, negation ("not good" vs "good"), or context.

### Sequential Approaches (RNNs, LSTMs)

Sequential models process words one at a time, maintaining a **hidden state** that captures context from all previous words:

- At each time step, the model reads one word and updates its internal state.
- The final state encodes the meaning of the entire sequence.

**Pros**: Captures word order, context, and long-range dependencies. "Not good" will be processed differently from "good" because the hidden state already contains the negation.

**Cons**: Slower to train (sequential processing can't be fully parallelized), can struggle with very long sequences.

For tasks where word order matters (sentiment analysis, translation, text generation), sequential models significantly outperform bag-of-words.

## Word Embeddings

Representing words as simple integers (word index 42, word index 107) doesn't capture any semantic meaning. Word **embeddings** map each word to a dense vector of real numbers (typically 50-300 dimensions) where similar words have similar vectors.

### Key Properties of Embeddings

- Words with similar meanings are close together in embedding space: vector("king") ≈ vector("queen"), vector("cat") ≈ vector("dog").
- Semantic relationships are encoded as directions: vector("king") - vector("man") + vector("woman") ≈ vector("queen").
- Embeddings capture syntactic patterns too: plural forms, verb tenses, etc.

### Word2Vec and GloVe

**Word2Vec** (Google, 2013) learns embeddings by predicting context words from a target word (Skip-gram) or a target word from context (CBOW). It trains on large text corpora and discovers semantic relationships automatically.

**GloVe** (Stanford, 2014) learns embeddings from global word co-occurrence statistics. It builds a co-occurrence matrix across the entire corpus and factorizes it to produce word vectors.

Both produce high-quality embeddings that can be used as pretrained features, similar to how pretrained CNNs provide visual features.

## tf.keras.layers.Embedding

The `Embedding` layer in Keras learns word embeddings as part of the model training process:

```python
model = keras.Sequential([
    # Embedding layer: vocab_size -> embedding_dim
    keras.layers.Embedding(
        input_dim=10000,      # Vocabulary size
        output_dim=64,        # Embedding dimension
        input_length=100      # Sequence length (after padding)
    ),
    # Each word is now a 64-dimensional vector
    # Input shape: (batch, 100) -> Output shape: (batch, 100, 64)
    
    keras.layers.GlobalAveragePooling1D(),  # Average across the sequence
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')  # Binary classification
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)
```

The `Embedding` layer creates a lookup table of shape (vocab_size, embedding_dim). For each word index in the input, it returns the corresponding embedding vector. These embeddings are **learned during training** alongside the rest of the model.

### Using Pretrained Embeddings

You can also initialize the Embedding layer with pretrained Word2Vec or GloVe vectors:

```python
# Load pretrained GloVe vectors (from file)
embedding_matrix = np.zeros((vocab_size, embedding_dim))
for word, index in tokenizer.word_index.items():
    if index < vocab_size and word in glove_vectors:
        embedding_matrix[index] = glove_vectors[word]

# Create Embedding layer with pretrained weights
embedding_layer = keras.layers.Embedding(
    input_dim=vocab_size,
    output_dim=embedding_dim,
    weights=[embedding_matrix],
    input_length=max_length,
    trainable=False  # Freeze to use as fixed features
)
```

Setting `trainable=False` uses the pretrained embeddings as fixed features. Setting `trainable=True` allows them to be fine-tuned during training, which often works better when you have sufficient data.

## Why Sequential Models Work for Language

Language has inherent sequential structure. The meaning of a word depends on the words that came before it:

- "I went to the **bank** to deposit money" → financial institution
- "I sat on the river **bank** and watched the water" → riverside

The same word has different meanings based on context. Sequential models like RNNs, LSTMs, and GRUs process text one token at a time, building up a representation that captures this context. This makes them naturally suited for tasks like sentiment analysis, language translation, text generation, and named entity recognition.

In the next lessons, we will explore recurrent layers (SimpleRNN, LSTM, GRU) that process these embedded sequences to perform NLP tasks.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
