---
id: lesson-003-013
title: Neural Networks: Activation Functions
chapterId: chapter-03
order: 13
duration: 5
objectives:
  - Explain why activation functions are essential for neural networks
  - Describe the behavior and formulas for sigmoid, tanh, ReLU, Leaky ReLU, and softmax
  - Identify the vanishing gradient problem caused by sigmoid and tanh
  - Choose the correct activation function for hidden vs. output layers
  - Apply activation functions in tf.keras layers
---

# Neural Networks: Activation Functions

Activation functions introduce **non-linearity** into neural networks. Without them, stacking multiple layers would be equivalent to a single linear transformation — no matter how many layers you add, the network could only learn linear relationships. Activation functions are what give neural networks the power to approximate complex, non-linear functions.

## Sigmoid

The sigmoid function squashes any input into the range (0, 1):

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

**Shape**: An S-shaped curve. For very negative inputs, the output approaches 0. For very positive inputs, the output approaches 1. At x = 0, the output is 0.5.

**When to use**: Historically popular, now mainly used in the **output layer for binary classification** where you need a probability between 0 and 1.

**Problem**: For very large or very small inputs, the gradient (derivative) of sigmoid is nearly zero. During backpropagation, these tiny gradients get multiplied together across layers, causing gradients to effectively vanish. This is the **vanishing gradient problem**, and it makes deep networks with sigmoid activations very difficult to train.

```python
# Binary classification output layer
keras.layers.Dense(1, activation='sigmoid')
```

## Tanh (Hyperbolic Tangent)

The tanh function squashes inputs to the range (-1, 1):

$$\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$$

**Shape**: Similar S-curve to sigmoid, but centered at zero. For very negative inputs, output approaches -1. For very positive inputs, output approaches 1. At x = 0, output is 0.

**Advantage over sigmoid**: Because it is zero-centered, the gradients are not biased in one direction, which can lead to faster convergence during training.

**Problem**: Tanh still suffers from the **vanishing gradient problem** at its extremes, just like sigmoid. Both functions saturate (flatten out) for large magnitude inputs.

```python
keras.layers.Dense(64, activation='tanh')
```

## ReLU (Rectified Linear Unit)

ReLU is the most widely used activation function for hidden layers:

$$f(x) = \max(0, x)$$

**Shape**: A simple piecewise function — zero for all negative inputs, and a straight line with slope 1 for positive inputs. Think of it as a ramp starting at the origin.

**Why ReLU dominates**:
- **No vanishing gradient** for positive values — the gradient is always 1 for positive inputs.
- **Computationally efficient** — just a comparison and a max operation.
- **Sparse activation** — neurons with negative inputs output exactly zero, leading to sparse representations that can be beneficial.

**Problem**: The **dying ReLU problem**. If a neuron's input is always negative (perhaps due to a large negative bias), the gradient is always zero, and the neuron permanently stops learning. This can happen with high learning rates.

```python
# Default choice for hidden layers
keras.layers.Dense(128, activation='relu')
```

## Leaky ReLU

Leaky ReLU addresses the dying ReLU problem by allowing a small, non-zero gradient for negative inputs:

$$f(x) = \begin{cases} x & \text{if } x > 0 \\ \alpha x & \text{if } x \leq 0 \end{cases}$$

where α is a small constant, typically 0.01.

**Shape**: Like ReLU, but instead of being flat at zero for negative inputs, it has a slight slope (almost flat, but not quite).

**Advantage**: Neurons can never completely die because they always have a non-zero gradient. In practice, Leaky ReLU sometimes outperforms standard ReLU, especially in deeper networks.

```python
# Using Leaky ReLU in Keras
keras.layers.Dense(128)
keras.layers.LeakyReLU(alpha=0.01)

# Or as a string activation
keras.layers.Dense(128, activation=tf.keras.layers.LeakyReLU(alpha=0.01))
```

## Softmax

Softmax converts a vector of raw scores (logits) into a probability distribution:

$$\text{softmax}(x_i) = \frac{e^{x_i}}{\sum_{j} e^{x_j}}$$

**Behavior**: Each output is between 0 and 1, and all outputs sum to exactly 1. The largest input value gets the highest probability, but all classes get some probability.

**When to use**: Always in the **output layer for multi-class classification**. If you have 10 classes, the softmax layer has 10 neurons and outputs 10 probabilities.

```python
# Multi-class classification output layer (e.g., 10 classes)
keras.layers.Dense(10, activation='softmax')
```

## Summary: Choosing Activation Functions

| Layer Type | Recommended Activation | Reason |
|---|---|---|
| Hidden layers | **ReLU** | Fast training, no vanishing gradient |
| Hidden layers (if dying ReLU is an issue) | **Leaky ReLU** | Prevents dead neurons |
| Output (binary classification) | **Sigmoid** | Outputs probability in (0, 1) |
| Output (multi-class classification) | **Softmax** | Outputs probability distribution |
| Output (regression) | **None (linear)** | Unrestricted output range |

## The Vanishing Gradient Problem Explained

During backpropagation, gradients are propagated from the output layer back through each hidden layer using the chain rule. At each layer, the gradient is multiplied by the derivative of that layer's activation function.

For sigmoid and tanh, the maximum derivative is 0.25 and 1.0 respectively. In practice, most neurons operate in the saturated regions where derivatives are much smaller. When you multiply many small numbers together across 5, 10, or 50 layers, the gradient shrinks exponentially — becoming so small that early layers learn extremely slowly or not at all.

ReLU solves this because its derivative is exactly 1 for all positive inputs — no matter how many layers you stack, the gradient flows through unchanged (for active neurons).

This is why ReLU (and its variants) became the default activation for hidden layers, enabling the training of much deeper networks.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
