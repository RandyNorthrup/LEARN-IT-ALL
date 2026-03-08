---
id: lesson-003-018
title: Creating a Convolutional Neural Network
chapterId: chapter-03
order: 18
duration: 5
objectives:
  - Build a complete CNN step by step using the Conv2D-MaxPooling pattern
  - Implement a CNN to classify CIFAR-10 images
  - Apply data augmentation using ImageDataGenerator to improve generalization
  - Understand why pooling layers and flatten layers are needed in a CNN
  - Train and evaluate a CNN on a real image dataset
---

# Creating a Convolutional Neural Network

In this lesson, we build a complete CNN step by step to classify images from the **CIFAR-10** dataset — a collection of 60,000 32×32 color images across 10 categories: airplane, automobile, bird, cat, deer, dog, frog, horse, ship, and truck.

## Step 1: Load and Prepare the Data

```python
import tensorflow as tf
from tensorflow import keras
import numpy as np

# Load CIFAR-10
(X_train, y_train), (X_test, y_test) = keras.datasets.cifar10.load_data()

# Class names
class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',
               'dog', 'frog', 'horse', 'ship', 'truck']

# Normalize pixel values to 0-1
X_train = X_train.astype('float32') / 255.0
X_test = X_test.astype('float32') / 255.0

# Verify shapes
print(f'Training data: {X_train.shape}')   # (50000, 32, 32, 3)
print(f'Test data: {X_test.shape}')         # (10000, 32, 32, 3)
```

CIFAR-10 images are small (32×32 pixels) and have 3 color channels (RGB). This is more challenging than grayscale MNIST — the images are in color, the objects vary in position and scale, and the classes are more complex.

## Step 2: Build the CNN Architecture

The standard CNN pattern alternates **convolutional layers** (feature extraction) with **pooling layers** (downsampling), followed by **dense layers** (classification):

```python
model = keras.Sequential([
    # --- Block 1 ---
    keras.layers.Conv2D(32, (3, 3), padding='same', activation='relu',
                        input_shape=(32, 32, 3)),
    keras.layers.MaxPooling2D((2, 2)),
    # Output: 16x16x32
    
    # --- Block 2 ---
    keras.layers.Conv2D(64, (3, 3), padding='same', activation='relu'),
    keras.layers.MaxPooling2D((2, 2)),
    # Output: 8x8x64
    
    # --- Block 3 ---
    keras.layers.Conv2D(128, (3, 3), padding='same', activation='relu'),
    keras.layers.MaxPooling2D((2, 2)),
    # Output: 4x4x128
    
    # --- Classification Head ---
    keras.layers.Flatten(),          # 4x4x128 = 2048
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(10, activation='softmax')
])

model.summary()
```

### Understanding Each Component

**Conv2D layers** extract spatial features. We increase the number of filters (32 → 64 → 128) as we go deeper. Early layers capture simple patterns; deeper layers capture complex patterns. More filters at deeper levels allow the network to represent richer combinations of features.

**MaxPooling2D((2, 2))** reduces the spatial dimensions by half by taking the maximum value in each 2×2 region. This has three benefits:
1. Reduces computational cost by shrinking the feature maps.
2. Provides a small degree of translation invariance.
3. Increases the effective receptive field of deeper layers.

**Flatten** converts the 3D feature maps (height × width × channels) into a 1D vector that can be fed into Dense layers.

**Dropout(0.5)** randomly deactivates 50% of neurons during training, preventing the dense layers from overfitting.

## Step 3: Compile and Train

```python
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

history = model.fit(
    X_train, y_train,
    epochs=20,
    batch_size=64,
    validation_split=0.2
)
```

This basic CNN should achieve roughly **70-75% accuracy** on CIFAR-10. We can do better with data augmentation.

## Step 4: Data Augmentation

Data augmentation artificially increases the diversity of your training data by applying random transformations to images during training. This is one of the most effective techniques for reducing overfitting:

```python
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define augmentation transformations
datagen = ImageDataGenerator(
    rotation_range=15,         # Random rotation up to 15 degrees
    width_shift_range=0.1,     # Random horizontal shift up to 10%
    height_shift_range=0.1,    # Random vertical shift up to 10%
    horizontal_flip=True,      # Randomly flip images horizontally
    zoom_range=0.1             # Random zoom up to 10%
)

# Fit the generator to training data (computes statistics if needed)
datagen.fit(X_train)
```

**Important considerations for augmentation:**
- Only augment the **training** data, never the test/validation data.
- Choose transformations that make sense for your domain. Horizontal flips work for most objects, but not for text recognition. Vertical flips work for satellite imagery, but not for faces.
- Augmentation creates new variations on the fly — it doesn't actually store extra images.

## Step 5: Train with Augmented Data

```python
# Split validation data manually (ImageDataGenerator doesn't support validation_split)
X_val = X_train[40000:]
y_val = y_train[40000:]
X_train_aug = X_train[:40000]
y_train_aug = y_train[:40000]

history = model.fit(
    datagen.flow(X_train_aug, y_train_aug, batch_size=64),
    epochs=30,
    validation_data=(X_val, y_val),
    callbacks=[
        keras.callbacks.EarlyStopping(
            monitor='val_loss', patience=5, restore_best_weights=True
        )
    ]
)
```

`datagen.flow()` generates augmented batches on the fly. Each epoch, the model sees different random variations of the training images, making it harder to memorize and encouraging it to learn generalizable features. With augmentation, this network can reach **75-80% accuracy** on CIFAR-10.

## Step 6: Evaluate

```python
test_loss, test_accuracy = model.evaluate(X_test, y_test)
print(f'Test accuracy: {test_accuracy:.4f}')

# Make predictions on sample images
predictions = model.predict(X_test[:5])
for i in range(5):
    predicted = class_names[np.argmax(predictions[i])]
    actual = class_names[y_test[i][0]]
    confidence = np.max(predictions[i]) * 100
    print(f'Predicted: {predicted} ({confidence:.1f}%), Actual: {actual}')
```

## Architecture Summary

```
Conv2D(32) → MaxPool → Conv2D(64) → MaxPool → Conv2D(128) → MaxPool → Flatten → Dense(128) → Dropout → Dense(10)
```

This pattern of alternating convolution and pooling, followed by dense layers, is the foundation of virtually all CNN architectures — from LeNet to VGG to modern designs. Deeper architectures with more blocks, skip connections (ResNet), or wider layers can achieve higher accuracy, but this structure is the essential starting point.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
