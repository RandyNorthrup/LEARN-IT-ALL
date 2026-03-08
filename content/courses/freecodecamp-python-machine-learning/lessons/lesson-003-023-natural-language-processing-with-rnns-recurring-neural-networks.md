---
id: lesson-003-023
title: Natural Language Processing With RNNs: Recurring Neural Networks
chapterId: chapter-03
order: 23
duration: 5
objectives:
  - Explain how recurrent neural networks maintain hidden state across time steps
  - Compare SimpleRNN, LSTM, and GRU architectures and their trade-offs
  - Implement bidirectional RNN layers to capture context from both directions
  - Identify the vanishing gradient problem and how gated architectures solve it
  - Choose the appropriate RNN variant for different sequence modeling tasks
---

# Natural Language Processing With RNNs: Recurring Neural Networks

This lesson takes a deep dive into the **architecture of Recurrent Neural Networks (RNNs)**, explaining how they process sequential data and why different variants exist. Understanding these internals is essential for building effective NLP models.

## How RNNs Process Sequences

Unlike feedforward networks that process each input independently, an RNN maintains a **hidden state** that acts as a memory, carrying information from previous time steps:

$$h_t = \tanh(W_{hh} \cdot h_{t-1} + W_{xh} \cdot x_t + b)$$

At each time step $t$, the network takes the current input $x_t$ and the previous hidden state $h_{t-1}$, combines them through learned weight matrices, and produces a new hidden state $h_t$. This process is called **unrolling through time**.

```python
import tensorflow as tf

# SimpleRNN in Keras
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(10000, 64),
    tf.keras.layers.SimpleRNN(32),  # Returns only the last hidden state
    tf.keras.layers.Dense(1, activation='sigmoid')
])
```

## The Vanishing Gradient Problem

Simple RNNs suffer from the **vanishing gradient problem**: during backpropagation through time, gradients are multiplied at each step. Over long sequences, these gradients shrink exponentially, making it nearly impossible for the network to learn long-range dependencies.

For example, in the sentence "The cat, which sat on the mat beside the window overlooking the garden, **was** sleeping," a SimpleRNN may struggle to connect "cat" with "was" because they are separated by many words.

## LSTM: Long Short-Term Memory

LSTMs solve the vanishing gradient problem by introducing a **cell state** and three **gates** that control information flow:

- **Forget gate**: Decides what information to discard from the cell state
- **Input gate**: Decides what new information to store in the cell state
- **Output gate**: Decides what to output based on the filtered cell state

```python
# LSTM in Keras
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(10000, 64),
    tf.keras.layers.LSTM(64, dropout=0.2, recurrent_dropout=0.2),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
```

The key innovation is the cell state, which acts like a conveyor belt — information can flow along it unchanged, allowing gradients to propagate over long sequences without vanishing. Each gate uses a sigmoid activation to produce values between 0 and 1, controlling how much information passes through.

## GRU: Gated Recurrent Unit

GRUs are a simplified alternative to LSTMs that combine the forget and input gates into a single **update gate** and merge the cell state with the hidden state:

- **Update gate**: Controls how much of the previous hidden state to keep
- **Reset gate**: Controls how much of the previous state to use in computing the new candidate state

```python
# GRU in Keras
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(10000, 64),
    tf.keras.layers.GRU(64, dropout=0.2),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
```

GRUs have **fewer parameters** than LSTMs (two gates vs. three), making them faster to train. In practice, GRUs often perform comparably to LSTMs on many tasks.

## Bidirectional RNNs

Standard RNNs only process sequences left-to-right. **Bidirectional RNNs** process the sequence in both directions and concatenate the outputs, capturing context from both before and after each position:

```python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(10000, 64),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64)),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
# Output dimension: 128 (64 forward + 64 backward)
```

Bidirectional RNNs are especially useful for tasks where the full context matters, like sentiment analysis or named entity recognition. They cannot be used for tasks requiring real-time left-to-right processing, such as text generation.

## Choosing the Right RNN Variant

| Variant | Parameters | Long-Range Dependencies | Training Speed | Best For |
|---------|-----------|------------------------|----------------|----------|
| **SimpleRNN** | Fewest | Poor | Fastest | Short sequences, simple patterns |
| **GRU** | Moderate | Good | Fast | Medium-length sequences, limited compute |
| **LSTM** | Most | Excellent | Slowest | Long sequences, complex dependencies |
| **Bidirectional** | 2x base | Excellent | 2x slower | Classification tasks with full context |

## Stacking RNN Layers

You can stack multiple RNN layers for greater model capacity. When stacking, intermediate layers must return the full sequence using `return_sequences=True`:

```python
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(10000, 64),
    tf.keras.layers.LSTM(128, return_sequences=True),  # Returns output at every time step
    tf.keras.layers.LSTM(64),  # Returns only the final output
    tf.keras.layers.Dense(1, activation='sigmoid')
])
```

## Key Takeaways

- Simple RNNs maintain a hidden state but suffer from **vanishing gradients** on long sequences
- **LSTMs** use a cell state and three gates to preserve long-range information
- **GRUs** offer a simpler two-gate alternative that often matches LSTM performance
- **Bidirectional** wrappers double the context available to the model at the cost of 2x computation
- Use `return_sequences=True` when stacking RNN layers or when you need output at every time step

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
