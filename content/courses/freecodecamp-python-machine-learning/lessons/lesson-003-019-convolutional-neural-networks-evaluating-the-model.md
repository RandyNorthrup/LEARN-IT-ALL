---
id: lesson-003-019
title: Convolutional Neural Networks: Evaluating the Model
chapterId: chapter-03
order: 19
duration: 5
objectives:
  - Plot and interpret accuracy and loss curves from training history
  - Generate and interpret a confusion matrix for image classification
  - Identify overfitting from training curves
  - Apply strategies to improve model performance when issues are detected
  - Visualize what CNN filters have learned
---

# Convolutional Neural Networks: Evaluating the Model

Building a CNN is only half the work. **Evaluating** the model tells you how well it actually performs, where it fails, and what to do next. This lesson covers the essential evaluation techniques for image classification models.

## Accuracy and Loss Curves

The `history` object returned by `model.fit()` contains training and validation metrics for each epoch. Plotting these curves is the first thing you should do after training:

```python
import matplotlib.pyplot as plt

def plot_training_history(history):
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))
    
    # Accuracy curves
    ax1.plot(history.history['accuracy'], label='Training Accuracy')
    ax1.plot(history.history['val_accuracy'], label='Validation Accuracy')
    ax1.set_title('Model Accuracy')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Accuracy')
    ax1.legend()
    ax1.grid(True)
    
    # Loss curves
    ax2.plot(history.history['loss'], label='Training Loss')
    ax2.plot(history.history['val_loss'], label='Validation Loss')
    ax2.set_title('Model Loss')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Loss')
    ax2.legend()
    ax2.grid(True)
    
    plt.tight_layout()
    plt.show()

plot_training_history(history)
```

### How to Read the Curves

**Healthy training** looks like:
- Both training and validation accuracy increase and converge.
- Both training and validation loss decrease and converge.
- The gap between training and validation curves is small.

**Overfitting** looks like:
- Training accuracy continues to improve while validation accuracy plateaus or decreases.
- Training loss continues to decrease while validation loss starts increasing.
- A growing gap between the two curves.

**Underfitting** looks like:
- Both training and validation accuracy are low.
- Neither curve has converged — the model needs more capacity or more training.

## Confusion Matrix

A confusion matrix shows exactly which classes the model confuses with each other. This is invaluable for understanding model behavior beyond a single accuracy number:

```python
import numpy as np
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns

# Get predictions
y_pred = model.predict(X_test)
y_pred_classes = np.argmax(y_pred, axis=1)
y_true = y_test.flatten()

# Build confusion matrix
cm = confusion_matrix(y_true, y_pred_classes)

# Plot it
class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',
               'dog', 'frog', 'horse', 'ship', 'truck']

plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=class_names, yticklabels=class_names)
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.title('Confusion Matrix')
plt.tight_layout()
plt.show()

# Detailed per-class metrics
print(classification_report(y_true, y_pred_classes, target_names=class_names))
```

### Interpreting the Confusion Matrix

Each row represents the actual class, and each column the predicted class. The diagonal shows correct predictions.

- **High diagonal values**: Good performance on that class.
- **Off-diagonal clusters**: Systematic confusions. For example, if cats are frequently predicted as dogs, the model struggles to distinguish those two classes.
- **Per-class metrics**: Precision tells you "of everything predicted as X, how many were actually X?" Recall tells you "of all actual X samples, how many did the model find?"

## Visualizing What Filters Learn

You can visualize the feature maps produced by convolutional layers to understand what the network "sees" at different depths:

```python
from tensorflow import keras

# Create a model that outputs feature maps from each Conv2D layer
layer_outputs = [layer.output for layer in model.layers if 'conv2d' in layer.name]
visualization_model = keras.Model(inputs=model.input, outputs=layer_outputs)

# Get feature maps for a single test image
test_image = X_test[0:1]  # Keep batch dimension
feature_maps = visualization_model.predict(test_image)

# Plot feature maps from the first convolutional layer
fig, axes = plt.subplots(4, 8, figsize=(16, 8))
for i, ax in enumerate(axes.flat):
    if i < feature_maps[0].shape[-1]:
        ax.imshow(feature_maps[0][0, :, :, i], cmap='viridis')
    ax.axis('off')
plt.suptitle('Feature Maps from First Conv Layer')
plt.show()
```

Typically you will see:
- **First layer**: Feature maps resemble edge detectors, color detectors, and simple texture detectors. You can often recognize the original image.
- **Middle layers**: More abstract patterns — combinations of edges and textures. Less visually interpretable.
- **Deep layers**: Highly abstract, class-specific activations. Hard to interpret visually but crucial for classification.

## Identifying and Fixing Overfitting

Overfitting is the most common issue with CNNs. Here is a systematic approach to diagnosing and addressing it:

### Diagnosis from Training Curves

If validation loss starts increasing while training loss continues decreasing, your model is overfitting. The epoch where validation loss is lowest is your optimal stopping point.

### Strategies to Improve (in order of priority)

1. **More training data**: The single most effective fix. If you can’t collect more data, use data augmentation (random rotations, flips, shifts, zoom). Augmentation can substitute for 2-5x more real data.

2. **Regularization**: Add Dropout layers (0.25-0.5 rate) after pooling and dense layers. Add L2 regularization to convolutional layers:
```python
keras.layers.Conv2D(64, (3, 3), activation='relu',
                    kernel_regularizer=keras.regularizers.l2(0.001))
```

3. **Early stopping**: Stop training when validation loss stops improving:
```python
keras.callbacks.EarlyStopping(
    monitor='val_loss', patience=5, restore_best_weights=True
)
```

4. **Simplify the architecture**: Reduce the number of filters, remove layers, or use fewer dense neurons. A simpler model has less capacity to memorize.

5. **Batch normalization**: Add BatchNormalization after convolutional layers to stabilize training and provide a mild regularization effect.

### If the Model is Underfitting

If both training and validation accuracy are low:
- Increase model capacity (more filters, more layers).
- Train for more epochs.
- Reduce regularization strength.
- Check that your data preprocessing is correct.

## Putting It All Together

A thorough evaluation workflow:
1. Plot training/validation curves to check for overfitting.
2. Evaluate final test accuracy with `model.evaluate()`.
3. Generate a confusion matrix to find class-specific weaknesses.
4. Print a classification report for precision, recall, and F1 per class.
5. Visualize feature maps to verify the network is learning meaningful features.
6. Based on findings, iterate on the architecture, regularization, or data.

Model evaluation is an iterative process. Each round of evaluation should inform your next design decision.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
