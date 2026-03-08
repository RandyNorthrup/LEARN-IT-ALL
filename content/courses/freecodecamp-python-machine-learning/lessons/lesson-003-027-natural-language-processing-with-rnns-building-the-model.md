---
id: lesson-003-027
title: Natural Language Processing With RNNs: Building the Model
chapterId: chapter-03
order: 27
duration: 5
objectives:
  - Design a multi-layer LSTM architecture for character-level text generation
  - Understand why return_sequences=True is essential for sequence-to-sequence learning
  - Explain the teacher forcing training strategy and its benefits
  - Configure the output Dense layer with softmax for vocabulary-sized predictions
  - Make informed architecture decisions about embedding size, LSTM units, and layer count
---

# Natural Language Processing With RNNs: Building the Model

With our data prepared, we now design the neural network architecture for text generation. This model must learn to predict the next character given all preceding characters, requiring careful **sequence-to-sequence** design decisions.

## The Text Generation Architecture

Our model follows the pattern: **Embedding → LSTM → LSTM → Dense(vocab_size)**. Unlike the sentiment analysis model that outputs a single value, this model must output a prediction at **every position** in the sequence.

```python
import tensorflow as tf

def build_model(vocab_size, embedding_dim, rnn_units, batch_size):
    model = tf.keras.Sequential([
        # Layer 1: Embedding
        # Maps each character index to a dense vector
        tf.keras.layers.Embedding(
            vocab_size,
            embedding_dim,
            batch_input_shape=[batch_size, None]
        ),
        
        # Layer 2: First LSTM
        # return_sequences=True: outputs at every time step, not just the last
        # stateful=True: maintains state between batches for generation
        tf.keras.layers.LSTM(
            rnn_units,
            return_sequences=True,
            stateful=True,
            recurrent_initializer='glorot_uniform'
        ),
        
        # Layer 3: Second LSTM
        # Adds depth - learns higher-level patterns from the first LSTM's output
        tf.keras.layers.LSTM(
            rnn_units,
            return_sequences=True,
            stateful=True,
            recurrent_initializer='glorot_uniform'
        ),
        
        # Layer 4: Dense output
        # Outputs a probability distribution over the entire vocabulary
        tf.keras.layers.Dense(vocab_size, activation='softmax')
    ])
    return model

# Typical configuration
vocab_size = 65      # Number of unique characters in Shakespeare
embedding_dim = 256  # Dimension of character embeddings
rnn_units = 1024     # Number of LSTM units per layer
batch_size = 64      # Training batch size

model = build_model(vocab_size, embedding_dim, rnn_units, batch_size)
model.summary()
```

## Understanding return_sequences=True

This parameter is the single most important architectural decision for text generation. Here is why:

**Without `return_sequences=True`** (classification mode): the LSTM only outputs its hidden state at the final time step. This is what we used for sentiment analysis, where we needed a single summary vector.

**With `return_sequences=True`** (generation mode): the LSTM outputs its hidden state at **every** time step, producing a sequence of vectors with the same length as the input.

```
Input:      [H] [e] [l] [l] [o]
                    ↓
LSTM (return_sequences=True):
            [h1] [h2] [h3] [h4] [h5]   ← Output at every step
                    ↓
Dense(vocab_size):
            [p1] [p2] [p3] [p4] [p5]   ← Prediction at every step
                    ↓
Target:     [e]  [l]  [l]  [o]  [!]     ← Next character at each position
```

This means for a sequence of length 100, the model makes 100 simultaneous predictions, and the loss function compares all 100 predictions against their targets.

## Teacher Forcing

**Teacher forcing** is the training strategy used for text generation models. Instead of feeding the model's own predictions back as input (which could compound errors), we always feed the **ground truth** character from the training data:

```
Training with teacher forcing:
  Input:  T  h  e     c  a  t
  Target: h  e     c  a  t  .
  → Even if the model predicts 'x' at position 1, position 2 still receives 'e' (not 'x')

Generation without teacher forcing:
  Seed:   "The "
  Step 1: model("The ") → 'c'
  Step 2: model("c")    → 'a'    (uses its own prediction)
  Step 3: model("a")    → 't'
  ...
```

Teacher forcing speeds up training by preventing error accumulation, but it means the model never learns to recover from its own mistakes during training. This gap between training and inference is called **exposure bias**.

## Architecture Decisions

### Embedding Dimension

The embedding dimension maps each character to a dense vector. For character-level models:
- **64-128**: Sufficient for small character sets (< 50 characters)
- **256**: A good default for character-level text generation
- Characters are simpler than words, so embeddings don't need to be as large as word embeddings

### LSTM Units

The number of LSTM units controls the model's capacity:
- **256**: Lighter model, trains faster, may produce simpler text
- **512**: Good balance for most text generation tasks
- **1024**: Higher capacity, captures more complex patterns, slower to train
- More units = more parameters = more data needed to avoid overfitting

### Number of Layers

Stacking LSTM layers adds depth:
- **1 layer**: Can learn basic character patterns and common words
- **2 layers**: Can learn grammar, sentence structure, and style
- **3+ layers**: Diminishing returns for character-level models, risk of overfitting

Each layer theoretically learns higher-level abstractions: the first layer might learn character combinations (digrams, trigrams), while the second learns word-level patterns and sentence structure.

## Verifying the Model Output Shape

```python
# Check that output shape is correct
for input_example_batch, target_example_batch in dataset.take(1):
    example_batch_predictions = model(input_example_batch)
    print(f"Input shape:      {input_example_batch.shape}")       # (64, 100)
    print(f"Prediction shape: {example_batch_predictions.shape}")  # (64, 100, 65)
    print(f"Target shape:     {target_example_batch.shape}")       # (64, 100)
```

The prediction shape `(batch_size, sequence_length, vocab_size)` confirms the model outputs a probability distribution over the vocabulary at every position in the sequence.

## Key Takeaways

- Text generation models use **`return_sequences=True`** to produce predictions at every time step
- The output layer is **Dense(vocab_size, softmax)**, producing a probability distribution over all characters
- **Teacher forcing** feeds ground truth during training but the model uses its own predictions during generation
- **Stateful LSTMs** maintain their hidden state between batches, which is essential for generating long text sequences
- Architecture choices (embedding size, LSTM units, layer count) balance model capacity against training time and overfitting risk

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
