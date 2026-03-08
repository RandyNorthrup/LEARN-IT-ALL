---
id: lesson-003-012
title: Neural Networks with TensorFlow
chapterId: chapter-03
order: 12
duration: 5
objectives:
  - Build neural networks using the tf.keras Sequential API
  - Configure Dense layers with appropriate units and activations
  - Compile models with loss functions, optimizers, and metrics
  - Train models using model.fit and evaluate with model.evaluate
  - Classify Fashion MNIST images with a complete neural network
---

# Neural Networks with TensorFlow

TensorFlow is Google's open-source machine learning framework, and **tf.keras** is its high-level API for building and training neural networks. With just a few lines of code, you can define, compile, train, and evaluate deep learning models.

## The Sequential API

The simplest way to build a neural network in Keras is with the **Sequential** model. It lets you stack layers one after another in a linear pipeline:

```python
import tensorflow as tf
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])
```

Each layer feeds its output directly into the next. This works great for most standard architectures.

## Dense Layers

The **Dense** layer (also called a fully connected layer) is the fundamental building block. Every neuron in a Dense layer connects to every neuron in the previous layer.

Key parameters:
- **units**: The number of neurons in the layer. More units = more capacity to learn complex patterns, but also more parameters to train.
- **activation**: The non-linear function applied after the linear transformation. Common choices include `'relu'`, `'sigmoid'`, and `'softmax'`.

```python
# Hidden layer with 128 neurons and ReLU activation
keras.layers.Dense(128, activation='relu')

# Output layer for 10-class classification
keras.layers.Dense(10, activation='softmax')
```

### Choosing Layer Architecture

A few rules of thumb for designing your layer architecture:

- **Input layer**: Use `Flatten` to convert 2D image data into a 1D vector, or match the shape of your input features.
- **Hidden layers**: Start with 128 or 256 units. Add more layers for more complex problems. Use ReLU activation for hidden layers.
- **Output layer**: Match the number of units to your task — 1 unit with sigmoid for binary classification, N units with softmax for N-class classification, 1 unit with no activation for regression.

## Compiling the Model

Before training, you must **compile** the model by specifying three things:

```python
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
```

- **optimizer**: The algorithm that updates weights during training. `'adam'` is a strong default.
- **loss**: The function the model tries to minimize. Use `'sparse_categorical_crossentropy'` when labels are integers, `'categorical_crossentropy'` when labels are one-hot encoded, and `'binary_crossentropy'` for binary classification.
- **metrics**: Values tracked during training for monitoring (not used for optimization).

## Training with model.fit

The `fit` method trains the model on your data:

```python
history = model.fit(
    train_images, train_labels,
    epochs=10,
    validation_split=0.2
)
```

- **epochs**: The number of complete passes through the training data.
- **validation_split**: Fraction of training data reserved for validation, so you can monitor overfitting.
- The returned `history` object contains loss and metric values for each epoch.

## Evaluating with model.evaluate

After training, evaluate on unseen test data:

```python
test_loss, test_accuracy = model.evaluate(test_images, test_labels)
print(f'Test accuracy: {test_accuracy:.4f}')
```

This gives you an unbiased estimate of how the model performs on new data.

## Complete Example: Fashion MNIST Classification

Here is a full end-to-end example that classifies clothing items from the Fashion MNIST dataset:

```python
import tensorflow as tf
from tensorflow import keras
import numpy as np

# Load the dataset (28x28 grayscale images of 10 clothing categories)
fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

# Class names for reference
class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

# Normalize pixel values to 0-1 range
train_images = train_images / 255.0
test_images = test_images / 255.0

# Build the model
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),   # 784 input features
    keras.layers.Dense(128, activation='relu'),    # Hidden layer
    keras.layers.Dense(10, activation='softmax')   # Output: 10 classes
])

# Compile
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train
model.fit(train_images, train_labels, epochs=10, validation_split=0.2)

# Evaluate
test_loss, test_acc = model.evaluate(test_images, test_labels)
print(f'Test accuracy: {test_acc:.4f}')

# Make predictions
predictions = model.predict(test_images[:5])
for i in range(5):
    predicted = class_names[np.argmax(predictions[i])]
    actual = class_names[test_labels[i]]
    print(f'Predicted: {predicted}, Actual: {actual}')
```

This simple three-layer network typically achieves around **87-88% accuracy** on Fashion MNIST. You can improve this by adding more hidden layers, using more neurons, applying dropout regularization, or switching to convolutional neural networks (covered in later lessons).

## Key Takeaways

- **Sequential API** makes it easy to stack layers linearly.
- **Dense layers** are fully connected — every neuron connects to every input.
- Always **normalize** your input data (e.g., divide pixel values by 255).
- **Compile** defines how the model learns; **fit** does the actual training; **evaluate** measures performance on held-out data.
- Start simple and add complexity only when needed.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
