---
id: lesson-003-011
title: Core Learning Algorithms: Using Probabilities to make Predictions
chapterId: chapter-03
order: 11
duration: 5
objectives:
  - Explain Bayesian thinking and the relationship between prior, likelihood, and posterior probabilities
  - Describe how probability distributions are used to represent uncertainty in ML predictions
  - Apply Bayes' theorem to update beliefs given new evidence
  - Connect probabilistic reasoning to Hidden Markov Models and real-world prediction tasks
  - Work through a practical example of probability-based weather prediction
---

# Core Learning Algorithms: Using Probabilities to Make Predictions

Many machine learning models are fundamentally probabilistic — they do not output a single definitive answer but instead provide a probability distribution over possible outcomes. Understanding how probabilities drive predictions is essential for interpreting model outputs and making informed decisions. This lesson explores Bayesian thinking, probability distributions, and how they connect to the HMMs we studied in the previous lesson.

## Bayesian Thinking

Bayesian reasoning is a framework for updating your beliefs as new evidence arrives. It answers the question: "Given what I have observed, what should I believe now?"

### Bayes' Theorem

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

Where:
- $P(A|B)$ is the **posterior** — the updated probability of A after observing B.
- $P(B|A)$ is the **likelihood** — how probable the evidence B is if A is true.
- $P(A)$ is the **prior** — your initial belief about A before seeing evidence.
- $P(B)$ is the **evidence** — the total probability of observing B.

### A Concrete Example

Suppose a medical test for a disease is 95% accurate (positive when sick, negative when healthy), and 1% of the population has the disease. If you test positive, what is the probability you actually have the disease?

```python
# Prior probability of having the disease
P_disease = 0.01
P_no_disease = 0.99

# Likelihood: probability of positive test given condition
P_positive_given_disease = 0.95     # True positive rate
P_positive_given_no_disease = 0.05  # False positive rate

# Total probability of a positive test
P_positive = (P_positive_given_disease * P_disease +
              P_positive_given_no_disease * P_no_disease)

# Posterior: probability of disease given positive test
P_disease_given_positive = (P_positive_given_disease * P_disease) / P_positive

print(f"P(disease | positive test) = {P_disease_given_positive:.2%}")
# Result: approximately 16.1%
```

Despite a 95% accurate test, a positive result only means a 16% chance of actually having the disease. This counterintuitive result occurs because the disease is rare (low prior), so most positive tests come from the large healthy population (false positives).

## Probability Distributions in ML

Machine learning models use probability distributions to represent uncertainty:

- **Classification models** output a probability distribution over classes. A classifier might say: "I am 85% confident this is a cat, 10% dog, 5% rabbit."
- **Regression models** can estimate not just a predicted value but also the uncertainty around it.
- **HMMs** use probability distributions for initial states, transitions, and emissions.

```python
import numpy as np

# A classifier's output for 3 classes
probabilities = [0.85, 0.10, 0.05]
classes = ['Cat', 'Dog', 'Rabbit']

# The predicted class is the one with highest probability
predicted_class = classes[np.argmax(probabilities)]
confidence = max(probabilities)

print(f"Prediction: {predicted_class} (confidence: {confidence:.0%})")
```

## Connecting to Hidden Markov Models

The HMM from our previous lesson is a direct application of probabilistic prediction. Let’s revisit the weather example and show how probabilities drive predictions at each step:

```python
import tensorflow as tf
import tensorflow_probability as tfp

tfd = tfp.distributions

# Define weather HMM
model = tfd.HiddenMarkovModel(
    initial_distribution=tfd.Categorical(probs=[0.6, 0.4]),
    transition_distribution=tfd.Categorical(probs=[[0.7, 0.3],
                                                     [0.4, 0.6]]),
    observation_distribution=tfd.Categorical(probs=[[0.6, 0.3, 0.1],
                                                      [0.1, 0.4, 0.5]]),
    num_steps=7
)

# The mean gives us expected observation indices over 7 days
mean_observations = model.mean().numpy()
print("Expected observation index per day:", mean_observations)

# Interpret: values closer to 0 mean 'Walk' is likely (sunny weather)
# Values closer to 2 mean 'Clean' is likely (rainy weather)
```

### Updating Predictions with New Evidence

The power of probabilistic models is that predictions update as new evidence arrives. Consider predicting weather on Day 3:

```
Before any observations:
  P(Sunny) = 0.53, P(Rainy) = 0.47  (based on initial + transitions)

After observing Day 1 = Walk, Day 2 = Walk:
  P(Sunny on Day 3) increases  (walking suggests sunny weather)
  P(Rainy on Day 3) decreases

After observing Day 1 = Walk, Day 2 = Clean:
  P(Sunny on Day 3) decreases  (cleaning suggests it turned rainy)
  P(Rainy on Day 3) increases
```

This sequential updating is exactly what the Forward algorithm does in an HMM.

## Practical Example: Weather Forecasting with Probability

Let’s build a simple probability-based weather predictor using the transition matrix:

```python
import numpy as np

# Transition matrix: rows = current state, cols = next state
# States: 0 = Sunny, 1 = Rainy
transition_matrix = np.array([
    [0.7, 0.3],  # Sunny → {Sunny: 0.7, Rainy: 0.3}
    [0.4, 0.6]   # Rainy → {Sunny: 0.4, Rainy: 0.6}
])

states = ['Sunny', 'Rainy']

# Start with today's state probabilities
current_state = np.array([1.0, 0.0])  # Today is definitely sunny

print(f"Today:     {states[np.argmax(current_state)]}")

# Predict the next 5 days
for day in range(1, 6):
    current_state = current_state @ transition_matrix
    most_likely = states[np.argmax(current_state)]
    print(f"Day {day}:     {most_likely} "
          f"(Sunny: {current_state[0]:.1%}, Rainy: {current_state[1]:.1%})")

# Over many steps, probabilities converge to the stationary distribution
# This represents the long-run proportion of sunny vs rainy days
```

Output:
```
Today:     Sunny
Day 1:     Sunny (Sunny: 70.0%, Rainy: 30.0%)
Day 2:     Sunny (Sunny: 61.0%, Rainy: 39.0%)
Day 3:     Sunny (Sunny: 58.3%, Rainy: 41.7%)
Day 4:     Sunny (Sunny: 57.5%, Rainy: 42.5%)
Day 5:     Sunny (Sunny: 57.2%, Rainy: 42.8%)
```

Notice how the probabilities converge toward the **stationary distribution** (~57% sunny, ~43% rainy). This represents the long-run equilibrium of the system, regardless of the starting state.

## Key Takeaways

- Probabilistic predictions quantify uncertainty, which is more useful than a single yes/no answer.
- Bayes’ theorem provides a principled way to update beliefs with new evidence.
- HMMs apply probabilistic reasoning to sequential data, combining transition and emission probabilities.
- As you collect more observations, your predictions become more refined and accurate.

Probabilistic thinking is the foundation of many advanced ML techniques including Bayesian neural networks, Gaussian processes, and variational autoencoders.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
