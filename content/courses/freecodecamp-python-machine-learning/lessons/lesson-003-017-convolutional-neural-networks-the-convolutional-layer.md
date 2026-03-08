---
id: lesson-003-017
title: Convolutional Neural Networks: The Convolutional Layer
chapterId: chapter-03
order: 17
duration: 5
objectives:
  - Explain what filters and kernels do in a convolutional layer
  - Describe stride, padding (same vs valid), and their effect on output size
  - Calculate the output dimensions of a convolutional layer
  - Understand how multiple filters produce multiple feature maps
  - Configure tf.keras.layers.Conv2D with appropriate parameters
---

# Convolutional Neural Networks: The Convolutional Layer

The **convolutional layer** is the core building block of any CNN. It applies learnable filters to the input to extract spatial features. Understanding how this layer works internally is essential for designing effective CNN architectures.

## Filters and Kernels

A **filter** (or **kernel**) is a small matrix of learnable weights. Common sizes are 3×3, 5×5, and 7×7. The filter slides across the input image, computing element-wise multiplications and summing the results at each position.

### How a 3×3 Filter Works

Consider a 5×5 input and a 3×3 filter:

```
Input (5×5):              Filter (3×3):
1  2  3  0  1             1  0  1
0  1  2  3  0             0  1  0
1  0  1  2  1             1  0  1
2  1  0  1  0
0  1  2  0  1
```

At the top-left position, the filter overlays the top-left 3×3 region of the input:

```
Computation:
(1×1) + (2×0) + (3×1) +
(0×0) + (1×1) + (2×0) +
(1×1) + (0×0) + (1×1) = 1 + 0 + 3 + 0 + 1 + 0 + 1 + 0 + 1 = 7
```

This single value (7) becomes one element in the output **feature map**. The filter then slides to the next position and repeats the calculation. The result is a 2D feature map where each value indicates how strongly a particular pattern is detected at that spatial location.

## Stride

The **stride** controls how many pixels the filter moves at each step:

- **Stride 1** (default): The filter moves one pixel at a time, producing the maximum output size.
- **Stride 2**: The filter moves two pixels at a time, reducing the output dimensions by roughly half.

Larger strides produce smaller output feature maps and act as a form of downsampling. Stride 2 is sometimes used as an alternative to pooling layers.

## Padding

Padding determines what happens when the filter reaches the edges of the input:

### Valid Padding (No Padding)

The filter only operates where it fully overlaps the input. The output is **smaller** than the input:

- Input: 5×5, Filter: 3×3, Stride: 1 → Output: 3×3
- The input shrinks by (filter_size - 1) in each dimension.

### Same Padding (Zero Padding)

The input is padded with zeros around the border so the output has the **same** spatial dimensions as the input:

- Input: 5×5, Filter: 3×3, Stride: 1 → Output: 5×5
- Enough zeros are added to preserve the size.

Same padding is more common in practice because it preserves spatial dimensions, making it easier to design deep networks without tracking shrinking sizes.

## Calculating Output Dimensions

The output size of a convolutional layer can be calculated with this formula:

$$\text{output\_size} = \left\lfloor \frac{\text{input\_size} - \text{filter\_size} + 2 \times \text{padding}}{\text{stride}} \right\rfloor + 1$$

**Examples with valid padding (padding = 0):**

| Input | Filter | Stride | Output |
|---|---|---|---|
| 28×28 | 3×3 | 1 | 26×26 |
| 28×28 | 5×5 | 1 | 24×24 |
| 28×28 | 3×3 | 2 | 13×13 |

**With same padding**, the output matches the input size (when stride = 1):
- Input: 28×28, Filter: 3×3, Stride: 1 → Output: 28×28
- Input: 28×28, Filter: 3×3, Stride: 2 → Output: 14×14

## Multiple Filters = Multiple Feature Maps

A single filter detects one type of pattern (e.g., horizontal edges). To detect many different patterns, a convolutional layer uses **multiple filters**. Each filter produces its own feature map, and these are stacked along the depth dimension.

If you apply 32 filters of size 3×3 to a 28×28×1 grayscale input (same padding, stride 1):
- Output shape: **28×28×32**
- The spatial dimensions are preserved, and the depth dimension equals the number of filters.

For a color image with 3 channels (RGB), each filter has shape 3×3×3 — it spans all input channels. The output still has one feature map per filter.

## Conv2D in tf.keras

Here is how to configure convolutional layers in TensorFlow:

```python
import tensorflow as tf
from tensorflow import keras

# Basic Conv2D layer
keras.layers.Conv2D(
    filters=32,           # Number of filters (output depth)
    kernel_size=(3, 3),   # Filter dimensions (height, width)
    strides=(1, 1),       # Step size in each direction
    padding='same',       # 'same' preserves size, 'valid' shrinks
    activation='relu',    # Activation applied after convolution
    input_shape=(28, 28, 1)  # Only needed for the first layer
)
```

### Complete Example: Stacking Convolutional Layers

```python
model = keras.Sequential([
    # First conv layer: 28x28x1 -> 28x28x32
    keras.layers.Conv2D(32, (3, 3), padding='same', activation='relu',
                        input_shape=(28, 28, 1)),
    keras.layers.MaxPooling2D((2, 2)),  # 28x28x32 -> 14x14x32
    
    # Second conv layer: 14x14x32 -> 14x14x64
    keras.layers.Conv2D(64, (3, 3), padding='same', activation='relu'),
    keras.layers.MaxPooling2D((2, 2)),  # 14x14x64 -> 7x7x64
    
    # Flatten and classify
    keras.layers.Flatten(),             # 7x7x64 = 3136
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])
```

### Parameter Count

The number of trainable parameters in a Conv2D layer is:

$$\text{params} = \text{filters} \times (\text{kernel\_height} \times \text{kernel\_width} \times \text{input\_channels} + 1)$$

The +1 accounts for one bias term per filter.

- Conv2D(32, (3,3)) on a 1-channel input: 32 × (3 × 3 × 1 + 1) = **320 parameters**
- Conv2D(64, (3,3)) on a 32-channel input: 64 × (3 × 3 × 32 + 1) = **18,496 parameters**

Compare this to a Dense layer connecting 784 inputs to 128 neurons: 784 × 128 + 128 = **100,480 parameters**. Convolutional layers are dramatically more parameter-efficient thanks to weight sharing.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
