---
id: lesson-003-006
title: Core Learning Algorithms: The Training Process
chapterId: chapter-03
order: 6
duration: 5
objectives:
  - Describe the training loop: forward pass, loss calculation, backpropagation, and weight update
  - Explain common loss functions including MSE for regression and cross-entropy for classification
  - Define learning rate, epochs, and batch size and explain how they affect training
  - Recognize convergence, divergence, and oscillation during training
  - Implement a basic training loop using TensorFlow's GradientTape
---

# Core Learning Algorithms: The Training Process

Training a machine learning model means iteratively adjusting its internal parameters (weights and biases) so that its predictions become more accurate. This lesson breaks down the training process step by step and shows you how it works under the hood.

## The Training Loop

Every training process follows the same fundamental cycle:

```
┌─────────────────┐
│  1. Forward Pass  │  →  Input data flows through the model to produce predictions
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. Calculate Loss │  →  Measure how far predictions are from actual values
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. Backpropagation │  →  Compute gradients: how each weight contributed to error
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. Update Weights  │  →  Adjust weights to reduce the loss
└────────┬────────┘
         │
         └────▶ Repeat for many epochs
```

### Step 1: Forward Pass

During the forward pass, input data flows through the model. Each layer applies a mathematical transformation: multiply by weights, add bias, and apply an activation function. The output is a prediction.

### Step 2: Calculate Loss

The **loss function** (also called cost function) measures how wrong the model's predictions are. A lower loss means better predictions.

**Mean Squared Error (MSE)** — used for regression:

$$\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$

MSE penalizes large errors heavily because differences are squared.

**Binary Cross-Entropy** — used for binary classification:

$$\text{Loss} = -\frac{1}{n} \sum_{i=1}^{n} [y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i)]$$

Cross-entropy measures the difference between two probability distributions — the predicted probabilities and the true labels.

### Step 3: Backpropagation

Backpropagation calculates the gradient of the loss with respect to each weight in the model using the chain rule of calculus. The gradient tells you two things: which direction to adjust each weight and by how much.

### Step 4: Update Weights

The optimizer uses the gradients to update the weights. The simplest optimizer is **gradient descent**:

$$w_{\text{new}} = w_{\text{old}} - \alpha \cdot \frac{\partial \text{Loss}}{\partial w}$$

where $\alpha$ is the **learning rate**.

## Key Hyperparameters

### Learning Rate

The learning rate controls how large each weight update step is:

```
Learning rate too high:    Loss oscillates or diverges ↑↓↑↓
Learning rate too low:     Loss decreases very slowly →→→→
Learning rate just right:  Loss decreases smoothly ↘↘↘
```

Common starting values: 0.001 to 0.01. TensorFlow's Adam optimizer adapts the learning rate automatically, which is why it is the most popular choice.

### Epochs

An **epoch** is one complete pass through the entire training dataset. Training typically requires many epochs (often 10–100+). More epochs give the model more chances to learn, but too many can lead to overfitting.

### Batch Size

Rather than updating weights after seeing every sample, data is processed in **batches**:

```
Dataset: 1000 samples, Batch size: 32
→ 1000 / 32 ≈ 31 batches per epoch
→ Weights are updated 31 times per epoch
```

Smaller batches add noise to the gradient estimate, which can help escape local minima. Larger batches give more stable gradient estimates but use more memory.

## Training Loop in TensorFlow

Here is a complete training loop for simple linear regression using `tf.GradientTape`:

```python
import tensorflow as tf
import numpy as np

# Generate synthetic data: y = 3x + 2 + noise
np.random.seed(42)
X_data = np.random.rand(100).astype(np.float32)
y_data = 3 * X_data + 2 + np.random.normal(0, 0.1, 100).astype(np.float32)

# Model parameters (what the model will learn)
w = tf.Variable(0.0)  # weight (should converge to ~3)
b = tf.Variable(0.0)  # bias (should converge to ~2)

learning_rate = 0.1
epochs = 100

for epoch in range(epochs):
    with tf.GradientTape() as tape:
        # Forward pass
        y_pred = w * X_data + b

        # Calculate loss (MSE)
        loss = tf.reduce_mean(tf.square(y_data - y_pred))

    # Backpropagation: compute gradients
    gradients = tape.gradient(loss, [w, b])

    # Update weights
    w.assign_sub(learning_rate * gradients[0])
    b.assign_sub(learning_rate * gradients[1])

    if epoch % 20 == 0:
        print(f"Epoch {epoch:3d}: Loss={loss.numpy():.4f}, w={w.numpy():.4f}, b={b.numpy():.4f}")

print(f"\nLearned: y = {w.numpy():.2f}x + {b.numpy():.2f}")
# Expected output close to: y = 3.00x + 2.00
```

## Monitoring Convergence

During training, plot the loss over epochs to monitor progress:

- **Converging**: Loss steadily decreases and flattens — the model is learning.
- **Diverging**: Loss increases or fluctuates wildly — the learning rate is likely too high.
- **Plateauing too early**: Loss stops decreasing at a high value — the model may be too simple or the learning rate too low.

Understanding the training process gives you the ability to diagnose problems and tune your models effectively.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
