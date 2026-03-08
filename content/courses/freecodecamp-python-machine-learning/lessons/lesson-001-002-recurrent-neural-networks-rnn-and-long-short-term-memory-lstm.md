---
id: lesson-001-002
title: Recurrent Neural Networks RNN and Long Short Term Memory LSTM
chapterId: chapter-01
order: 2
duration: 5
objectives:
  - Explain why sequential data requires specialized neural network architectures
  - Describe how vanilla RNNs process sequences by maintaining hidden state
  - Identify the vanishing gradient problem and why it limits standard RNNs
  - Explain how LSTM cells use gates (forget, input, output) to preserve long-term memory
  - Recognize real-world applications of RNNs and LSTMs in text and time-series tasks
---

# Recurrent Neural Networks (RNN) and Long Short-Term Memory (LSTM)

Regular neural networks have a major limitation: they treat every input as independent. Feed them a sentence word by word, and they have no memory of what came before. But language, music, stock prices, and weather all depend on **sequence** — what happened before matters. Recurrent Neural Networks solve this by introducing memory.

## Why Sequences Need Special Treatment

Consider predicting the next word in a sentence:

- "The clouds are dark, it will probably ____"

A regular neural network sees each word in isolation. It has no idea that "clouds" and "dark" appeared earlier, so it can't predict "rain." Humans understand this because we remember the context.

Sequential data is everywhere:
- **Text**: Words depend on previous words
- **Speech**: Sounds depend on previous sounds
- **Stock prices**: Today's price depends on recent trends
- **Music**: Notes depend on the melody so far
- **Sensor data**: Current readings relate to recent readings

We need a network that can **remember** previous inputs as it processes new ones.

## Vanilla RNNs: Adding Memory

A Recurrent Neural Network adds a loop. At each time step, the network receives two things: the current input AND its own previous output (called the **hidden state**).

```
         ┌─────────────────────────────────┐
         │          Recurrence loop         │
         │                                 │
         ▼                                 │
  ┌─────────────┐                          │
  │  Hidden     │──── output (y_t) ────►   │
  │  State      │                          │
  │  (h_t)      │──── hidden state ────────┘
  └─────────────┘
         ▲
         │
  input (x_t)
```

**Unrolled across time**, this looks like a chain of copies of the same network:

```
  x_1          x_2          x_3          x_4
   │            │            │            │
   ▼            ▼            ▼            ▼
┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐
│ RNN  │─►  │ RNN  │─►  │ RNN  │─►  │ RNN  │─► ...
│ Cell │ h1 │ Cell │ h2 │ Cell │ h3 │ Cell │ h4
└──────┘    └──────┘    └──────┘    └──────┘
   │            │            │            │
   ▼            ▼            ▼            ▼
  y_1          y_2          y_3          y_4
```

At each step, the computation is:

```
h_t = activation(W_h · h_(t-1) + W_x · x_t + bias)
```

The hidden state `h_t` is a vector of numbers that acts as the network's **memory**. It accumulates information from all previous time steps.

Think of it like reading a book: you don't remember every word, but you maintain a running summary in your head. That running summary is the hidden state.

## The Vanishing Gradient Problem

Vanilla RNNs have a critical flaw. During training, the network learns by sending error signals backward through time (backpropagation through time). But as these signals travel back through many time steps, they get **multiplied** by the same weights over and over.

If those weights are less than 1, the signal **shrinks exponentially** — it vanishes. If they're greater than 1, it **explodes**.

In practice, this means vanilla RNNs struggle to learn connections between events that are far apart:

- "I grew up in **France**. I went to school there. I learned to cook. ... I speak fluent ____"

By the time the network reaches the blank, the information about "France" has faded from the gradient signal. The network can't connect distant context to the current prediction.

This is the **vanishing gradient problem**, and it's why vanilla RNNs fail on long sequences.

## LSTM: Long Short-Term Memory

LSTM networks, introduced by Hochreiter and Schmidhuber in 1997, solve the vanishing gradient problem with a clever redesign. Instead of a simple hidden state, each LSTM cell maintains two states:

- **Cell state (C_t)**: The long-term memory highway — information can flow along it unchanged
- **Hidden state (h_t)**: The short-term working memory

The key innovation is **three gates** that control information flow:

```
                    ┌───────────────────────────────┐
  C_(t-1) ────────►─┤─── × forget ──► + ──────────►─── C_t
                    │                  ▲             │
                    │           ┌──────┘             │
                    │           │ input gate          │
                    │           │ × new candidates    │
                    │           │                     │
  h_(t-1) ──┬─────►│  ┌────────┴────────┐           │
             │      │  │ Forget  Input   │           │
             │      │  │ Gate    Gate     │           │
             │      │  │ (f_t)  (i_t)    │           │
             │      │  └────────┬────────┘           │
  x_t ──────┼─────►│           │                     │
             │      │     Output Gate (o_t)          │
             │      │           │                     │
             │      └───────────┼─────────────────────┘
             │                  │
             │                  ▼
             │              h_t (output)
             │
```

### The Three Gates Explained

**1. Forget Gate** — "What should I throw away?"

The forget gate looks at the previous hidden state and the current input, then outputs a number between 0 and 1 for each value in the cell state. A value of 1 means "keep this entirely" and 0 means "forget this completely."

*Analogy*: You're reading a mystery novel. When you learn the suspect has an alibi, you "forget" (downweight) the earlier suspicion about them.

**2. Input Gate** — "What new information should I store?"

The input gate decides which new information is worth remembering. It has two parts: a sigmoid layer that decides *which* values to update, and a tanh layer that creates *candidate* new values.

*Analogy*: A new character is introduced in the novel. You decide this character is important (input gate = high) and encode their traits into your running mental summary.

**3. Output Gate** — "What should I output right now?"

The output gate decides which parts of the cell state are relevant to the current output. Not everything in long-term memory is useful at every moment.

*Analogy*: Someone asks you what's happening in the novel right now. You filter your full memory of the book and share only the currently relevant plot point.

## Conceptual Python Example

Here's a simplified view of what happens inside an LSTM cell at one time step:

```python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def lstm_cell(x_t, h_prev, C_prev, weights):
    """
    One time step of an LSTM cell (simplified).
    x_t: current input vector
    h_prev: previous hidden state
    C_prev: previous cell state
    """
    # Concatenate input and previous hidden state
    combined = np.concatenate([h_prev, x_t])
    
    # Forget gate: what to discard from cell state
    f_t = sigmoid(np.dot(weights['Wf'], combined) + weights['bf'])
    
    # Input gate: what new info to store
    i_t = sigmoid(np.dot(weights['Wi'], combined) + weights['bi'])
    candidates = np.tanh(np.dot(weights['Wc'], combined) + weights['bc'])
    
    # Update cell state: forget old + add new
    C_t = f_t * C_prev + i_t * candidates
    
    # Output gate: what to output
    o_t = sigmoid(np.dot(weights['Wo'], combined) + weights['bo'])
    h_t = o_t * np.tanh(C_t)
    
    return h_t, C_t

# Processing a sequence word by word:
# h, C = initial_state
# for word in sentence:
#     x = embed(word)
#     h, C = lstm_cell(x, h, C, weights)
# prediction = output_layer(h)
```

The critical insight is the cell state update: `C_t = f_t * C_prev + i_t * candidates`. Because the forget gate can be close to 1, the cell state can carry information forward **unchanged** across many time steps — solving the vanishing gradient problem.

## RNN vs. LSTM: When to Use What

| Feature | Vanilla RNN | LSTM |
|---------|-------------|------|
| Memory span | Short (5-10 steps) | Long (100+ steps) |
| Training stability | Gradient issues | Stable gradients |
| Complexity | Simple | More parameters |
| Use case | Simple short sequences | Text, speech, time series |

In practice, vanilla RNNs are rarely used today. LSTMs (and their simpler cousin, GRUs — Gated Recurrent Units) dominate sequential tasks, though Transformers have overtaken them in many natural language processing tasks.

## Real-World Applications

- **Machine translation**: Reading a sentence in English, outputting a sentence in French
- **Speech recognition**: Converting audio signals to text
- **Text generation**: Predicting the next word or character
- **Sentiment analysis**: Reading a review, outputting positive/negative
- **Time-series forecasting**: Predicting stock prices, weather, or energy demand

## Key Takeaways

- RNNs process sequences by maintaining a hidden state that carries information across time steps
- Vanilla RNNs suffer from the vanishing gradient problem, making them unable to learn long-range dependencies
- LSTMs solve this with a cell state highway and three gates: forget, input, and output
- The cell state allows information to flow across many time steps without degradation
- LSTMs are the workhorse architecture for sequential data in machine learning

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
