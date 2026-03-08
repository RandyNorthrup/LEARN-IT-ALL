---
id: lesson-003-010
title: Core Learning Algorithms: Hidden Markov Models
chapterId: chapter-03
order: 10
duration: 5
objectives:
  - Explain the components of a Hidden Markov Model: states, observations, transition and emission probabilities
  - Describe how HMMs model sequential data where the true state is not directly observable
  - Walk through the classic weather example to illustrate HMM concepts
  - Understand the intuition behind the Viterbi algorithm for finding the most likely state sequence
  - Build a simple HMM using TensorFlow Probability to model weather transitions
---

# Core Learning Algorithms: Hidden Markov Models

Hidden Markov Models (HMMs) are probabilistic models for sequential data where the system being modeled transitions between hidden (unobservable) states over time. Each hidden state produces an observable output with a certain probability. HMMs are widely used in speech recognition, natural language processing, and bioinformatics.

## The Core Idea

Imagine you have a friend who lives far away and tells you each day whether they went for a walk, went shopping, or cleaned their house. You cannot observe the weather where they live, but you know their activity depends on the weather. From their sequence of activities (observations), you want to infer the sequence of weather states (hidden states).

```
Hidden States (you cannot see these):
   [Sunny] ───▶ [Rainy] ───▶ [Sunny] ───▶ [Sunny] ───▶ [Rainy]
      │             │             │             │             │
      ▼             ▼             ▼             ▼             ▼
Observations (you can see these):
   [Walk]       [Clean]       [Shop]        [Walk]       [Clean]
```

## Components of an HMM

Every HMM is defined by five components:

### 1. States (S)

The set of hidden states the system can be in. In the weather example:

```python
states = ['Sunny', 'Rainy']
```

### 2. Observations (O)

The set of possible outputs you can observe:

```python
observations = ['Walk', 'Shop', 'Clean']
```

### 3. Initial State Probabilities (π)

The probability of the system starting in each state:

```python
initial_distribution = {
    'Sunny': 0.6,   # 60% chance it starts sunny
    'Rainy': 0.4    # 40% chance it starts rainy
}
```

### 4. Transition Probabilities (A)

The probability of transitioning from one state to another:

```
                To:
            Sunny   Rainy
From: Sunny  0.7     0.3     (if sunny, 70% chance it stays sunny)
      Rainy  0.4     0.6     (if rainy, 60% chance it stays rainy)
```

```python
transition_matrix = {
    'Sunny': {'Sunny': 0.7, 'Rainy': 0.3},
    'Rainy': {'Sunny': 0.4, 'Rainy': 0.6}
}
```

### 5. Emission Probabilities (B)

The probability of each observation given the current state:

```
             Walk   Shop   Clean
    Sunny:   0.6    0.3    0.1    (sunny → most likely walking)
    Rainy:   0.1    0.4    0.5    (rainy → most likely cleaning)
```

```python
emission_matrix = {
    'Sunny': {'Walk': 0.6, 'Shop': 0.3, 'Clean': 0.1},
    'Rainy': {'Walk': 0.1, 'Shop': 0.4, 'Clean': 0.5}
}
```

## The Three Fundamental HMM Problems

1. **Evaluation**: Given a model and a sequence of observations, what is the probability of that sequence? (Forward algorithm)
2. **Decoding**: Given a model and observations, what is the most likely sequence of hidden states? (Viterbi algorithm)
3. **Learning**: Given observations, what model parameters best explain the data? (Baum-Welch algorithm)

## The Viterbi Algorithm (Intuition)

The Viterbi algorithm solves the decoding problem: given the observations [Walk, Clean, Shop], what were the most likely weather states?

Rather than checking every possible combination of states (which grows exponentially), Viterbi uses dynamic programming. At each time step, it tracks the most probable path to each state and discards unlikely paths early:

```
Time:          t=0          t=1          t=2
Observed:      Walk         Clean        Shop

Sunny: P=0.36 ───▶ P=0.025 ───▶ P=0.005
                 ╲         ╱ ╲
                  ╲       ╱   ╲
                   ╲     ╱     ╲
Rainy: P=0.04 ───▶ P=0.108 ───▶ P=0.026  ← winner

Most likely sequence: Sunny → Rainy → Rainy
```

## HMMs with TensorFlow Probability

TensorFlow Probability (TFP) provides an implementation of HMMs:

```python
import tensorflow as tf
import tensorflow_probability as tfp

tfd = tfp.distributions

# Define the HMM
initial_distribution = tfd.Categorical(probs=[0.6, 0.4])  # [Sunny, Rainy]

transition_distribution = tfd.Categorical(
    probs=[[0.7, 0.3],   # From Sunny: 70% stay sunny, 30% go rainy
           [0.4, 0.6]]   # From Rainy: 40% go sunny, 60% stay rainy
)

observation_distribution = tfd.Categorical(
    probs=[[0.6, 0.3, 0.1],  # Sunny: Walk=0.6, Shop=0.3, Clean=0.1
           [0.1, 0.4, 0.5]]  # Rainy: Walk=0.1, Shop=0.4, Clean=0.5
)

# Create the Hidden Markov Model
model = tfd.HiddenMarkovModel(
    initial_distribution=initial_distribution,
    transition_distribution=transition_distribution,
    observation_distribution=observation_distribution,
    num_steps=7  # Predict 7 days
)

# Calculate the expected (mean) observations over 7 days
mean = model.mean()
print("Expected observations over 7 days:")
print(mean.numpy())
# Values closer to 0 = Walk, 1 = Shop, 2 = Clean

# The mean tells us the expected average activity on each day
# given the model's probabilities and state transitions.
```

## Real-World Applications of HMMs

- **Speech recognition**: Hidden states are phonemes, observations are acoustic signals.
- **Part-of-speech tagging**: Hidden states are parts of speech (noun, verb), observations are words.
- **Gene prediction**: Hidden states are coding/non-coding regions, observations are nucleotide sequences.
- **Financial modeling**: Hidden states are market regimes (bull/bear), observations are price movements.

HMMs provide a principled way to reason about sequences where the true underlying process is not directly observable.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
