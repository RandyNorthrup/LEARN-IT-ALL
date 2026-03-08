---
id: lesson-003-015
title: Neural Networks: Creating a Model
chapterId: chapter-03
order: 15
duration: 5
objectives:
  - Build an end-to-end neural network from data preprocessing to evaluation
  - Apply regularization techniques including Dropout and L2 regularization
  - Use early stopping to prevent overfitting during training
  - Apply batch normalization to stabilize and accelerate training
  - Save and load trained models for later use
---

# Neural Networks: Creating a Model

This lesson walks through the complete lifecycle of building a neural network — from preparing your data to saving a trained model. Along the way, we will apply critical regularization techniques that prevent overfitting and improve generalization.

## Step 1: Data Preprocessing

Before feeding data into a neural network, you need to clean and prepare it:

```python
import tensorflow as tf
from tensorflow import keras
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load a dataset (using Fashion MNIST as our example)
fashion_mnist = keras.datasets.fashion_mnist
(X_train_full, y_train_full), (X_test, y_test) = fashion_mnist.load_data()

# Normalize pixel values to 0-1
X_train_full = X_train_full / 255.0
X_test = X_test / 255.0

# Create a validation split
X_train, X_val = X_train_full[:50000], X_train_full[50000:]
y_train, y_val = y_train_full[:50000], y_train_full[50000:]
```

**Why normalize?** Neural networks train faster and more reliably when input values are on a small, consistent scale. Raw pixel values (0-255) create large weight updates that destabilize training.

## Step 2: Architecture Design

Design the network architecture based on your problem:

```python
model = keras.Sequential([
    # Input: flatten 28x28 images to 784-dimensional vectors
    keras.layers.Flatten(input_shape=(28, 28)),
    
    # First hidden layer with batch normalization and dropout
    keras.layers.Dense(256, kernel_regularizer=keras.regularizers.l2(0.001)),
    keras.layers.BatchNormalization(),
    keras.layers.Activation('relu'),
    keras.layers.Dropout(0.3),
    
    # Second hidden layer
    keras.layers.Dense(128, kernel_regularizer=keras.regularizers.l2(0.001)),
    keras.layers.BatchNormalization(),
    keras.layers.Activation('relu'),
    keras.layers.Dropout(0.3),
    
    # Output layer
    keras.layers.Dense(10, activation='softmax')
])
```

Let's break down the regularization techniques used here.

### Dropout

Dropout randomly sets a fraction of neurons to zero during each training step. This forces the network to not rely on any single neuron and learn more robust features.

- `Dropout(0.3)` means 30% of neurons are randomly deactivated each step.
- Dropout is **only active during training** — at inference time, all neurons are used.
- Typical values range from 0.2 to 0.5.

### L2 Regularization (Weight Decay)

L2 regularization adds a penalty proportional to the square of the weight magnitudes to the loss function:

$$L_{\text{total}} = L_{\text{data}} + \lambda \sum w_i^2$$

This discourages large weights and produces simpler, more generalizable models. The `kernel_regularizer=keras.regularizers.l2(0.001)` parameter applies this directly to the layer's weights.

### Batch Normalization

Batch normalization normalizes the inputs to each layer by subtracting the batch mean and dividing by the batch standard deviation. Benefits include:

- **Faster training**: Allows higher learning rates.
- **Regularization effect**: Adds slight noise to each batch, acting as a mild regularizer.
- **Reduces internal covariate shift**: Each layer sees inputs with a stable distribution.

## Step 3: Compilation

```python
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# View model architecture
model.summary()
```

The `model.summary()` call prints the layer names, output shapes, and parameter counts — essential for verifying your architecture is correct.

## Step 4: Training with Early Stopping

Early stopping monitors a metric (usually validation loss) and stops training when it stops improving, preventing overfitting:

```python
# Define callbacks
early_stopping = keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=5,              # Wait 5 epochs for improvement
    restore_best_weights=True # Revert to the best model
)

history = model.fit(
    X_train, y_train,
    epochs=50,                # Maximum epochs (early stopping may end sooner)
    batch_size=32,
    validation_data=(X_val, y_val),
    callbacks=[early_stopping]
)
```

**patience=5** means training will stop if the validation loss doesn't improve for 5 consecutive epochs. The `restore_best_weights=True` parameter ensures you keep the model from the best epoch, not the last one.

## Step 5: Evaluation

```python
# Evaluate on held-out test data
test_loss, test_accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f'Test Loss: {test_loss:.4f}')
print(f'Test Accuracy: {test_accuracy:.4f}')

# Plot training history
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

ax1.plot(history.history['loss'], label='Training')
ax1.plot(history.history['val_loss'], label='Validation')
ax1.set_title('Loss Over Epochs')
ax1.legend()

ax2.plot(history.history['accuracy'], label='Training')
ax2.plot(history.history['val_accuracy'], label='Validation')
ax2.set_title('Accuracy Over Epochs')
ax2.legend()

plt.show()
```

The gap between training and validation curves tells you about overfitting. If training accuracy is much higher than validation accuracy, your model is memorizing the training data.

## Step 6: Saving and Loading Models

Once you have a trained model, save it for later use:

```python
# Save the entire model (architecture + weights + optimizer state)
model.save('my_fashion_model.keras')

# Load the model later
loaded_model = keras.models.load_model('my_fashion_model.keras')

# The loaded model is ready to use immediately
predictions = loaded_model.predict(X_test[:5])
```

You can also save just the weights if you want to recreate the architecture separately:

```python
# Save weights only
model.save_weights('my_model_weights.weights.h5')

# Rebuild architecture, then load weights
new_model = build_model()  # Your function that creates the architecture
new_model.load_weights('my_model_weights.weights.h5')
```

## Complete Pipeline Summary

1. **Preprocess**: Normalize inputs, split into train/validation/test.
2. **Design**: Choose layer sizes, add Dropout, BatchNormalization, and L2 regularization.
3. **Compile**: Set optimizer (Adam), loss function, and metrics.
4. **Train**: Use `model.fit` with early stopping callbacks.
5. **Evaluate**: Check test performance, plot learning curves.
6. **Save**: Persist the model for deployment or future use.

This workflow applies to virtually any supervised learning problem with neural networks. Start simple (fewer layers, no regularization) and add complexity only when you see underfitting. Add regularization when you see overfitting.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
