---
id: lesson-003-020
title: Convolutional Neural Networks: Picking a Pretrained Model
chapterId: chapter-03
order: 20
duration: 5
objectives:
  - Explain why transfer learning is more practical than training from scratch
  - Compare popular pretrained architectures (VGG16, ResNet, MobileNet, Inception)
  - Load a pretrained model in TensorFlow and freeze its layers
  - Implement feature extraction and fine-tuning workflows
  - Classify custom images using a pretrained MobileNet model
---

# Convolutional Neural Networks: Picking a Pretrained Model

**Transfer learning** is the practice of taking a model trained on a large dataset and reusing it for a different but related task. Instead of training a CNN from scratch (which requires millions of images and days of compute time), you can leverage models that have already learned powerful visual features from millions of images on ImageNet.

## Why Not Train from Scratch?

Training a state-of-the-art CNN from scratch requires:
- **Massive datasets**: ImageNet has 1.2 million labeled images across 1,000 classes.
- **Enormous compute**: Training can take days or weeks on multiple GPUs.
- **Expertise**: Designing the right architecture, tuning hyperparameters, and preventing overfitting are all non-trivial.

With transfer learning, you can achieve excellent results with:
- **Small datasets**: Even a few hundred images per class can work.
- **Minimal compute**: Fine-tuning takes minutes to hours on a single GPU.
- **Less expertise needed**: The pretrained model already knows how to extract visual features.

The key insight is that the low-level and mid-level features learned on ImageNet (edges, textures, shapes, object parts) are **universal** — they transfer well to virtually any image recognition task.

## Popular Pretrained Architectures

### VGG16
- **Architecture**: 16 layers of 3×3 convolutions, simple and uniform.
- **Size**: ~138 million parameters, ~528 MB.
- **Strengths**: Simple to understand, good feature extractor.
- **Weaknesses**: Very large and slow compared to modern alternatives.

### ResNet (ResNet50, ResNet101, ResNet152)
- **Architecture**: Introduced **skip connections** (residual connections) that allow gradients to flow directly through the network.
- **Size**: ResNet50 has ~25 million parameters, ~98 MB.
- **Strengths**: Can train very deep networks (50-152 layers) without degradation. Excellent accuracy. A strong default choice.
- **Key innovation**: Skip connections solve the vanishing gradient problem in very deep networks.

### MobileNet (MobileNetV2)
- **Architecture**: Uses **depthwise separable convolutions** that dramatically reduce computation.
- **Size**: ~3.4 million parameters, ~14 MB.
- **Strengths**: Very fast and lightweight. Designed for mobile and edge devices.
- **Weaknesses**: Slightly lower accuracy than larger models.
- **Use when**: Speed or model size matters (mobile apps, embedded systems, real-time inference).

### Inception (InceptionV3)
- **Architecture**: Uses **inception modules** — parallel convolutions of different sizes (1×1, 3×3, 5×5) combined together.
- **Size**: ~23 million parameters, ~92 MB.
- **Strengths**: Good accuracy with efficient computation. Captures features at multiple scales simultaneously.

## Two Transfer Learning Strategies

### 1. Feature Extraction

Use the pretrained model as a **fixed feature extractor**. Freeze all pretrained layers and only train a new classification head on top:

```python
import tensorflow as tf
from tensorflow import keras

# Load MobileNetV2 pretrained on ImageNet, without the top classification layer
base_model = keras.applications.MobileNetV2(
    weights='imagenet',
    include_top=False,           # Remove the original 1000-class output layer
    input_shape=(224, 224, 3)
)

# Freeze all layers in the base model
base_model.trainable = False

# Add a custom classification head
model = keras.Sequential([
    base_model,
    keras.layers.GlobalAveragePooling2D(),  # Reduce spatial dims to a vector
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(5, activation='softmax')  # 5 custom classes
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()
```

**When to use feature extraction**: When your dataset is small (a few hundred to a few thousand images) and your task is similar to ImageNet (general object recognition).

### 2. Fine-Tuning

Start with feature extraction, then **unfreeze** some of the top layers of the base model and retrain them with a very low learning rate:

```python
# After initial training with frozen base, unfreeze the top layers
base_model.trainable = True

# Freeze all layers except the last 20
for layer in base_model.layers[:-20]:
    layer.trainable = False

# Re-compile with a much lower learning rate
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.00001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Continue training
history_fine = model.fit(
    train_data, train_labels,
    epochs=10,
    validation_data=(val_data, val_labels)
)
```

**When to use fine-tuning**: When you have a moderate amount of data and want to adapt the pretrained features to your specific domain. Always use a very low learning rate to avoid destroying the pretrained weights.

## Complete Example: Classifying Custom Images with MobileNet

```python
import tensorflow as tf
from tensorflow import keras
import numpy as np

# Load and preprocess a custom image
def load_and_preprocess_image(path):
    img = keras.preprocessing.image.load_img(path, target_size=(224, 224))
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = keras.applications.mobilenet_v2.preprocess_input(img_array)
    return img_array

# Load the full MobileNetV2 (with ImageNet classification head)
full_model = keras.applications.MobileNetV2(weights='imagenet')

# Classify an image
img = load_and_preprocess_image('my_photo.jpg')
predictions = full_model.predict(img)

# Decode the top-5 predictions
decoded = keras.applications.mobilenet_v2.decode_predictions(predictions, top=5)[0]
for rank, (imagenet_id, label, score) in enumerate(decoded, 1):
    print(f'{rank}. {label}: {score:.2%}')
```

## Choosing the Right Pretrained Model

| Criteria | Best Choice |
|---|---|
| **General purpose, best accuracy** | ResNet50 |
| **Mobile/edge deployment** | MobileNetV2 |
| **Simple and well-understood** | VGG16 |
| **Multi-scale feature extraction** | InceptionV3 |
| **Very small dataset (<500 images)** | Feature extraction with any model |
| **Medium dataset (1,000-10,000)** | Fine-tuning with ResNet50 or MobileNetV2 |

Transfer learning has made deep learning accessible to practitioners who don't have Google-scale datasets or compute budgets. In most real-world image classification projects, starting with a pretrained model is the right approach.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
