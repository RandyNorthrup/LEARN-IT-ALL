---
id: lesson-001-004
title: How Convolutional Neural Networks work
chapterId: chapter-01
order: 4
duration: 5
objectives:
  - Explain why fully connected networks are impractical for image data
  - Describe the convolution operation and how filters detect features in images
  - Understand the roles of feature maps, pooling layers, stride, and padding in a CNN
  - Trace how a simple edge-detection filter processes a small image grid
  - Recognize the overall architecture pattern of a CNN from input to classification
---

# How Convolutional Neural Networks Work

Convolutional Neural Networks (CNNs) are the reason computers can recognize faces, read handwriting, detect tumors in medical scans, and identify objects in self-driving car cameras. They're specifically designed to work with **spatial data** like images — and they do it brilliantly.

## Why Regular Neural Networks Fail for Images

Consider a modest 256×256 color image. It has 256 × 256 × 3 (RGB channels) = **196,608 pixels**. In a fully connected network, every one of those pixels connects to every neuron in the first hidden layer. If that layer has 1,000 neurons, that's 196 million weights — just in the first layer.

This causes two problems:
1. **Too many parameters**: The network is slow to train and prone to overfitting
2. **No spatial awareness**: A fully connected network treats pixel (0,0) and pixel (255,255) as equally related. But in images, nearby pixels are far more related to each other than distant ones.

CNNs solve both problems with a simple but powerful idea: instead of connecting every pixel to every neuron, use a **small sliding window** that scans across the image.

## The Flashlight Analogy

Imagine you're in a dark room with a large painting on the wall and a small flashlight. You can't see the whole painting at once — you can only illuminate a small patch at a time.

You systematically scan the flashlight across the painting, left to right, top to bottom. At each position, you examine the small patch and notice: "There's a vertical edge here" or "There's a curve here."

This is exactly how a CNN works. The flashlight is called a **filter** (or **kernel**), and the scanning process is called **convolution**.

## The Convolution Operation

A **filter** is a small grid of numbers, typically 3×3 or 5×5. It slides across the input image, and at each position, it performs an element-wise multiplication with the image patch underneath, then sums the result into a single number.

### Example: Edge Detection

Let's walk through a concrete example. Here's a simple 5×5 grayscale image (think of each number as a brightness value):

```
Image (5×5):            Vertical edge filter (3×3):
┌───┬───┬───┬───┬───┐   ┌────┬───┬────┐
│ 0 │ 0 │ 0 │ 1 │ 1 │   │ -1 │ 0 │  1 │
├───┼───┼───┼───┼───┤   ├────┼───┼────┤
│ 0 │ 0 │ 0 │ 1 │ 1 │   │ -1 │ 0 │  1 │
├───┼───┼───┼───┼───┤   ├────┼───┼────┤
│ 0 │ 0 │ 0 │ 1 │ 1 │   │ -1 │ 0 │  1 │
├───┼───┼───┼───┼───┤   └────┴───┴────┘
│ 0 │ 0 │ 0 │ 1 │ 1 │
├───┼───┼───┼───┼───┤
│ 0 │ 0 │ 0 │ 1 │ 1 │
└───┴───┴───┴───┴───┘
```

The image has a clear vertical edge down the middle (dark on the left, bright on the right). Let's apply the filter at the top-left position:

```
Patch:       Filter:      Element-wise multiply:
0  0  0      -1  0  1     0   0   0
0  0  0  ×   -1  0  1  =  0   0   0
0  0  0      -1  0  1     0   0   0

Sum = 0  (no edge here)
```

Now slide the filter one step right and apply it where the edge is:

```
Patch:       Filter:      Element-wise multiply:
0  0  1      -1  0  1     0   0   1
0  0  1  ×   -1  0  1  =  0   0   1
0  0  1      -1  0  1     0   0   1

Sum = 3  (strong vertical edge detected!)
```

The high value (3) indicates the filter found a vertical edge at that position. The output of sliding the filter across the entire image creates a **feature map** — a new grid showing where that feature was detected.

### Python Implementation

```python
import numpy as np

# A 5x5 grayscale image with a vertical edge
image = np.array([
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1]
], dtype=float)

# Vertical edge detection filter
filter_v = np.array([
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1]
], dtype=float)

# Apply convolution (no padding, stride=1)
def convolve2d(image, kernel):
    h, w = image.shape
    kh, kw = kernel.shape
    output_h = h - kh + 1
    output_w = w - kw + 1
    output = np.zeros((output_h, output_w))
    
    for i in range(output_h):
        for j in range(output_w):
            patch = image[i:i+kh, j:j+kw]
            output[i, j] = np.sum(patch * kernel)
    return output

feature_map = convolve2d(image, filter_v)
print("Feature map (vertical edges):")
print(feature_map)
# Output:
# [[0. 0. 3.]
#  [0. 0. 3.]
#  [0. 0. 3.]]
# The "3" column shows where the vertical edge is!
```

## Key CNN Concepts

### Filters Learn Automatically

In the example above, we hand-crafted an edge-detection filter. In a real CNN, the filter values are **learned during training**. The network discovers on its own that it needs edge detectors, curve detectors, texture detectors, and more. A typical layer might have 32, 64, or even 512 different filters, each detecting a different feature.

### Feature Maps

Each filter produces one feature map. If a layer has 32 filters, it produces 32 feature maps — 32 different "views" of the input, each highlighting a different feature. These feature maps become the input to the next layer.

### Stride

**Stride** is how many pixels the filter moves at each step. With stride=1, the filter moves one pixel at a time. With stride=2, it jumps two pixels, producing a smaller output. Larger strides reduce computation and output size.

```
Stride 1: slide one pixel at a time
[X X X] . .     . [X X X] .     . . [X X X]
. . . . .   →   . . . . .   →   . . . . .
. . . . .       . . . . .       . . . . .

Stride 2: skip every other position
[X X X] . .     . . [X X X]
. . . . .   →   . . . . .
. . . . .       . . . . .
```

### Padding

**Padding** adds zeros around the border of the input image. Without padding ("valid" padding), the output is smaller than the input. With "same" padding, enough zeros are added so the output has the same dimensions as the input. This prevents the image from shrinking with each layer.

### Pooling Layers

After convolution, **pooling layers** reduce the spatial dimensions. The most common type is **max pooling**: divide the feature map into non-overlapping patches (e.g., 2×2) and keep only the maximum value in each patch.

```
Input (4×4):              After 2×2 Max Pooling (2×2):
┌───┬───┬───┬───┐         ┌───┬───┐
│ 1 │ 3 │ 2 │ 8 │         │ 6 │ 8 │
├───┼───┼───┼───┤    →    ├───┼───┤
│ 6 │ 2 │ 4 │ 1 │         │ 9 │ 7 │
├───┼───┼───┼───┤         └───┴───┘
│ 9 │ 5 │ 3 │ 7 │
├───┼───┼───┼───┤   (keeps the max from each 2×2 block)
│ 4 │ 1 │ 6 │ 2 │
└───┴───┴───┴───┘
```

Pooling serves three purposes:
1. **Reduces computation** by shrinking the feature maps
2. **Provides translation invariance** — a feature is detected whether it's shifted slightly left or right
3. **Reduces overfitting** by providing an abstracted form of the representation

## The Full CNN Architecture

A typical CNN stacks several rounds of convolution + pooling, then feeds the result into fully connected layers for classification:

```
  Input Image (e.g., 224×224×3)
       │
       ▼
  ┌─────────────────┐
  │ Conv Layer (32   │  Detect edges, gradients
  │ filters, 3×3)   │
  │ + ReLU + Pool    │
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │ Conv Layer (64   │  Detect textures, shapes
  │ filters, 3×3)   │
  │ + ReLU + Pool    │
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │ Conv Layer (128  │  Detect parts of objects
  │ filters, 3×3)   │
  │ + ReLU + Pool    │
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │ Flatten          │  Convert 2D maps to 1D vector
  │ + Dense (256)    │  Learn combinations
  │ + Dense (10)     │  Output: one score per class
  │ + Softmax        │  Convert to probabilities
  └─────────────────┘
       │
       ▼
  Prediction: "cat" (92% confidence)
```

As data flows deeper through the network, the spatial dimensions shrink (due to pooling) while the number of feature maps grows (due to more filters). The network trades spatial detail for semantic richness.

## Why CNNs Work So Well

CNNs exploit three properties of images:

1. **Local connectivity**: Nearby pixels are more related than distant ones. Convolution captures local patterns.
2. **Parameter sharing**: The same filter is applied everywhere in the image. An edge detector learned in one corner works in all corners. This drastically reduces the number of parameters.
3. **Translation invariance**: Through pooling and shared filters, a CNN can recognize a cat whether it's in the top-left or bottom-right of the image.

## Key Takeaways

- CNNs use small learnable filters that slide across images to detect features like edges, textures, and shapes
- The convolution operation multiplies a filter with a patch of the image and sums the result to produce a feature map
- Pooling reduces the size of feature maps while preserving the most important information
- Stacking convolution and pooling layers creates a hierarchy from simple features (edges) to complex concepts (faces, objects)
- CNNs are vastly more efficient than fully connected networks for images because they share parameters and exploit spatial structure

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
