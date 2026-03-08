---
id: lesson-003-014
title: Neural Networks: Optimizers
chapterId: chapter-03
order: 14
duration: 5
objectives:
  - Explain how gradient descent updates model weights
  - Compare SGD, Momentum, RMSprop, and Adam optimizers
  - Describe how each optimizer improves upon basic gradient descent
  - Configure optimizers and learning rate schedules in tf.keras
  - Choose an appropriate optimizer for different training scenarios
---

# Neural Networks: Optimizers

An **optimizer** is the algorithm that adjusts the weights of a neural network to minimize the loss function. The choice of optimizer can dramatically affect how fast your model trains and whether it converges to a good solution. All optimizers are variations of **gradient descent** — the process of computing the gradient of the loss with respect to each weight and updating the weights in the opposite direction.

## Stochastic Gradient Descent (SGD)

SGD is the simplest optimizer. On each training step, it computes the gradient on a mini-batch of data and updates the weights:

$$w_{t+1} = w_t - \eta \cdot \nabla L(w_t)$$

where η (eta) is the **learning rate** and ∇L is the gradient of the loss.

**Pros**: Simple and well-understood. Can generalize well with proper tuning.

**Cons**: Can be slow to converge, especially on loss surfaces with ravines (elongated valleys). The gradients oscillate back and forth across the narrow dimension while making slow progress along the long dimension.

```python
optimizer = tf.keras.optimizers.SGD(learning_rate=0.01)
```

## SGD with Momentum

Momentum adds a "velocity" term that accumulates past gradients. Think of it like a ball rolling downhill — it builds up speed in consistent directions and dampens oscillations:

$$v_{t+1} = \beta \cdot v_t + \nabla L(w_t)$$
$$w_{t+1} = w_t - \eta \cdot v_{t+1}$$

where β (beta) is the momentum coefficient, typically set to 0.9.

**How it helps**: If gradients consistently point in the same direction, momentum accelerates movement in that direction. If gradients oscillate, the oscillations cancel out. This dramatically speeds up convergence in practice.

```python
optimizer = tf.keras.optimizers.SGD(learning_rate=0.01, momentum=0.9)
```

## RMSprop (Root Mean Square Propagation)

RMSprop adapts the learning rate **per parameter** based on the recent magnitude of gradients for that parameter:

$$s_{t+1} = \beta \cdot s_t + (1 - \beta) \cdot (\nabla L)^2$$
$$w_{t+1} = w_t - \frac{\eta}{\sqrt{s_{t+1} + \epsilon}} \cdot \nabla L$$

**Key insight**: Parameters with large recent gradients get a smaller effective learning rate, while parameters with small gradients get a larger one. This prevents any single parameter from dominating the update and allows the optimizer to navigate complex loss landscapes more effectively.

**When to use**: RMSprop works well for recurrent neural networks and non-stationary problems. It was proposed by Geoffrey Hinton in a Coursera lecture.

```python
optimizer = tf.keras.optimizers.RMSprop(learning_rate=0.001)
```

## Adam (Adaptive Moment Estimation)

Adam combines the best ideas from **Momentum** and **RMSprop**. It maintains both:
- A running average of the gradients (first moment, like Momentum)
- A running average of the squared gradients (second moment, like RMSprop)

$$m_{t+1} = \beta_1 \cdot m_t + (1 - \beta_1) \cdot \nabla L$$
$$v_{t+1} = \beta_2 \cdot v_t + (1 - \beta_2) \cdot (\nabla L)^2$$

It also applies bias correction to account for the fact that the running averages are initialized at zero, then updates:

$$w_{t+1} = w_t - \frac{\eta}{\sqrt{\hat{v}_{t+1}} + \epsilon} \cdot \hat{m}_{t+1}$$

**Why Adam is the default**: Adam works well across a wide range of problems with minimal hyperparameter tuning. The default settings (learning_rate=0.001, β₁=0.9, β₂=0.999) are effective for most tasks.

```python
# The default and recommended starting point
optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)

model.compile(
    optimizer=optimizer,
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
```

## Learning Rate: The Most Important Hyperparameter

The **learning rate** controls the step size of weight updates:

- **Too high**: The model overshoots the minimum, loss oscillates or diverges.
- **Too low**: Training is extremely slow and may get stuck in poor local minima.
- **Just right**: The model converges efficiently to a good solution.

A good starting point is **0.001** for Adam and **0.01** for SGD.

## Learning Rate Scheduling

Instead of using a fixed learning rate, you can **decay** the rate during training. Start with a larger rate for fast initial progress, then reduce it for fine-grained convergence:

```python
# Exponential decay schedule
initial_learning_rate = 0.001
lr_schedule = tf.keras.optimizers.schedules.ExponentialDecay(
    initial_learning_rate,
    decay_steps=1000,
    decay_rate=0.9
)
optimizer = tf.keras.optimizers.Adam(learning_rate=lr_schedule)
```

Other scheduling options include:

```python
# Reduce learning rate when a metric plateaus (as a callback)
reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.2,
    patience=5,
    min_lr=0.00001
)

model.fit(X_train, y_train, epochs=50, callbacks=[reduce_lr])
```

## Optimizer Comparison Summary

| Optimizer | Adaptive LR | Momentum | Best For |
|---|---|---|---|
| **SGD** | No | No | Simple problems, when you can tune LR carefully |
| **SGD + Momentum** | No | Yes | When you want momentum but manual LR control |
| **RMSprop** | Yes | No | RNNs, non-stationary problems |
| **Adam** | Yes | Yes | **General default** — most problems |

## Setting Optimizers in tf.keras

You can specify optimizers as strings (using defaults) or as objects (for custom settings):

```python
# Using string shorthand (default hyperparameters)
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')

# Using an optimizer object (custom hyperparameters)
optimizer = tf.keras.optimizers.Adam(learning_rate=0.0005)
model.compile(optimizer=optimizer, loss='sparse_categorical_crossentropy')
```

**Practical advice**: Start with Adam at its default learning rate. If your model is not converging well, try lowering the learning rate. If you want to squeeze out the best generalization, consider switching to SGD with momentum and a learning rate schedule — SGD often generalizes slightly better than Adam when properly tuned, but requires more effort.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
