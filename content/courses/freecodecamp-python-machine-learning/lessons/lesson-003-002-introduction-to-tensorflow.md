---
id: lesson-003-002
title: Introduction to TensorFlow
chapterId: chapter-03
order: 2
duration: 5
objectives:
  - Install TensorFlow 2.x and verify the installation in a Python environment
  - Explain what tensors are and distinguish between scalars, vectors, matrices, and n-d arrays
  - Create and manipulate tensors using tf.constant and tf.Variable
  - Perform basic tensor operations including arithmetic, reshaping, and type casting
  - Understand eager execution and how TensorFlow 2.x differs from TensorFlow 1.x
---

# Introduction to TensorFlow

TensorFlow is an open-source machine learning framework developed by Google Brain. It provides a comprehensive ecosystem for building and deploying ML models, from research prototypes to production systems. In this lesson, you will learn what TensorFlow is, how to install it, and how to work with its fundamental data structure: the tensor.

## Installing TensorFlow

TensorFlow 2.x can be installed via pip. It is recommended to use a virtual environment to avoid dependency conflicts:

```bash
# Create and activate a virtual environment (optional but recommended)
python3 -m venv ml_env
source ml_env/bin/activate

# Install TensorFlow
pip install tensorflow
```

Verify the installation:

```python
import tensorflow as tf
print(tf.__version__)  # e.g., 2.15.0
```

If you have a compatible NVIDIA GPU, TensorFlow will automatically use it for accelerated computation. The CPU version works for all the examples in this course.

## What Are Tensors?

A **tensor** is a generalization of vectors and matrices to higher dimensions. Tensors are the fundamental data structure in TensorFlow — every piece of data flowing through a model is represented as a tensor.

```
Tensor Hierarchy:

 Rank 0 — Scalar:    5                          shape: ()
 Rank 1 — Vector:    [1, 2, 3]                  shape: (3,)
 Rank 2 — Matrix:    [[1, 2], [3, 4]]           shape: (2, 2)
 Rank 3 — 3D Tensor: [[[1,2],[3,4]],[[5,6],[7,8]]]  shape: (2, 2, 2)
 Rank n — nD Tensor: data with n axes            shape: (d1, d2, ..., dn)
```

Every tensor has three key properties:
- **Rank (ndim)**: The number of axes (dimensions).
- **Shape**: The size along each axis.
- **Data type (dtype)**: The type of values stored (float32, int32, string, etc.).

## Creating Tensors

TensorFlow provides two primary ways to create tensors: `tf.constant` for immutable tensors and `tf.Variable` for mutable tensors.

```python
import tensorflow as tf

# Scalars (rank 0)
scalar = tf.constant(7)
print(scalar)           # tf.Tensor(7, shape=(), dtype=int32)
print(scalar.ndim)      # 0

# Vectors (rank 1)
vector = tf.constant([1.0, 2.0, 3.0])
print(vector)           # tf.Tensor([1. 2. 3.], shape=(3,), dtype=float32)
print(vector.shape)     # (3,)

# Matrices (rank 2)
matrix = tf.constant([[1, 2, 3],
                       [4, 5, 6]])
print(matrix.shape)     # (2, 3)

# 3D tensor (rank 3)
tensor_3d = tf.constant([[[1, 2], [3, 4]],
                          [[5, 6], [7, 8]]])
print(tensor_3d.shape)  # (2, 2, 2)
```

### tf.constant vs tf.Variable

`tf.constant` creates an immutable tensor — its values cannot change after creation. `tf.Variable` creates a mutable tensor that can be updated, which is essential for model parameters like weights and biases that change during training.

```python
# Constants cannot be changed
const_tensor = tf.constant([1, 2, 3])
# const_tensor[0].assign(10)  # This would raise an error

# Variables can be modified
var_tensor = tf.Variable([1, 2, 3])
var_tensor[0].assign(10)
print(var_tensor)  # <tf.Variable ... numpy=array([10, 2, 3], dtype=int32)>
```

## Basic Tensor Operations

TensorFlow supports all standard mathematical operations on tensors:

```python
a = tf.constant([1.0, 2.0, 3.0])
b = tf.constant([4.0, 5.0, 6.0])

# Element-wise operations
print(tf.add(a, b))       # [5.0, 7.0, 9.0]
print(tf.subtract(a, b))  # [-3.0, -3.0, -3.0]
print(tf.multiply(a, b))  # [4.0, 10.0, 18.0]
print(tf.divide(a, b))    # [0.25, 0.4, 0.5]

# You can also use Python operators
print(a + b)  # [5.0, 7.0, 9.0]
print(a * b)  # [4.0, 10.0, 18.0]

# Matrix multiplication
mat_a = tf.constant([[1, 2], [3, 4]])
mat_b = tf.constant([[5, 6], [7, 8]])
print(tf.matmul(mat_a, mat_b))  # [[19, 22], [43, 50]]

# Reshaping
tensor = tf.constant([1, 2, 3, 4, 5, 6])
reshaped = tf.reshape(tensor, (2, 3))
print(reshaped)  # [[1, 2, 3], [4, 5, 6]]

# Type casting
int_tensor = tf.constant([1, 2, 3])
float_tensor = tf.cast(int_tensor, dtype=tf.float32)
print(float_tensor)  # [1.0, 2.0, 3.0]
```

## Eager Execution

TensorFlow 2.x runs in **eager execution** mode by default. This means operations are evaluated immediately, and you can inspect results with standard Python print statements. In TensorFlow 1.x, you had to build a computational graph first and then run it inside a `tf.Session` — this is no longer necessary.

```python
# TensorFlow 2.x — eager execution (immediate results)
result = tf.add(2, 3)
print(result)        # tf.Tensor(5, shape=(), dtype=int32)
print(result.numpy()) # 5  — extract the Python value
```

The `.numpy()` method converts a tensor to a NumPy array, making it easy to integrate TensorFlow with other Python libraries.

## Hello World Example

Here is a minimal TensorFlow program that demonstrates the basics:

```python
import tensorflow as tf

# Create two constant tensors
hello = tf.constant("Hello")
world = tf.constant("TensorFlow!")

# String concatenation
message = tf.strings.join([hello, world], separator=" ")
print(message.numpy().decode())  # Hello TensorFlow!

# Simple computation
a = tf.constant(3.0)
b = tf.constant(4.0)
c = tf.sqrt(a**2 + b**2)
print(f"Hypotenuse: {c.numpy()}")  # Hypotenuse: 5.0
```

With TensorFlow installed and the basics of tensors understood, you are ready to start building machine learning models.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
