---
id: lesson-003-007
title: Core Learning Algorithms: Classification
chapterId: chapter-03
order: 7
duration: 5
objectives:
  - Distinguish between classification and regression tasks based on the output type
  - Explain binary versus multi-class classification and the algorithms suited to each
  - Define and calculate accuracy, precision, recall, and F1 score for a classifier
  - Build and train a DNNClassifier using TensorFlow's estimator API on the Iris dataset
  - Interpret a classification model's predictions and evaluate its performance
---

# Core Learning Algorithms: Classification

Classification is the task of predicting which category (class) an input belongs to. Unlike regression, which outputs a continuous number, classification outputs a discrete label. This lesson covers the theory behind classification, key evaluation metrics, and a hands-on example using TensorFlow.

## Classification vs. Regression

| Aspect | Regression | Classification |
|--------|-----------|----------------|
| Output | Continuous number | Discrete category |
| Example | Predict house price: $325,000 | Predict flower species: "setosa" |
| Loss function | MSE, MAE | Cross-entropy |
| Evaluation | R², RMSE | Accuracy, precision, recall, F1 |

## Binary vs. Multi-Class Classification

**Binary classification** has exactly two classes:
- Spam or not spam
- Tumor is malignant or benign
- Customer will churn or not

**Multi-class classification** has three or more classes:
- Classify a flower as setosa, versicolor, or virginica
- Recognize a handwritten digit (0–9)
- Categorize a news article (sports, politics, technology, etc.)

## Logistic Regression and Decision Boundaries

Despite its name, **logistic regression** is a classification algorithm. It applies the sigmoid function to a linear combination of features to produce a probability between 0 and 1:

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

where $z = w_1 x_1 + w_2 x_2 + ... + b$.

If the probability is above a threshold (typically 0.5), the model predicts class 1; otherwise, class 0. The line (or surface) where the probability equals the threshold is called the **decision boundary**.

## Evaluation Metrics

Accuracy alone can be misleading, especially with imbalanced datasets. Consider a model that always predicts "not fraud" on a dataset where 99% of transactions are legitimate — it achieves 99% accuracy while catching zero fraud cases.

### Confusion Matrix

```
                  Predicted
                  Pos    Neg
Actual   Pos      TP     FN
         Neg      FP     TN

TP = True Positive   (correctly predicted positive)
FP = False Positive  (incorrectly predicted positive)
FN = False Negative  (incorrectly predicted negative)
TN = True Negative   (correctly predicted negative)
```

### Key Metrics

- **Accuracy** = (TP + TN) / (TP + TN + FP + FN) — overall correctness.
- **Precision** = TP / (TP + FP) — of all positive predictions, how many were correct?
- **Recall** = TP / (TP + FN) — of all actual positives, how many did we find?
- **F1 Score** = 2 × (Precision × Recall) / (Precision + Recall) — harmonic mean of precision and recall.

## Building a Classifier with TensorFlow

The Iris dataset contains 150 flower samples with 4 features (sepal length, sepal width, petal length, petal width) and 3 species (setosa, versicolor, virginica). Here is how to build a classifier:

```python
import tensorflow as tf
import pandas as pd

# Column names for the Iris dataset
CSV_COLUMN_NAMES = ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth', 'Species']
SPECIES = ['Setosa', 'Versicolor', 'Virginica']

# Load training and test data
train_path = tf.keras.utils.get_file(
    "iris_training.csv",
    "https://storage.googleapis.com/download.tensorflow.org/data/iris_training.csv"
)
test_path = tf.keras.utils.get_file(
    "iris_test.csv",
    "https://storage.googleapis.com/download.tensorflow.org/data/iris_test.csv"
)

train = pd.read_csv(train_path, names=CSV_COLUMN_NAMES, header=0)
test = pd.read_csv(test_path, names=CSV_COLUMN_NAMES, header=0)

# Separate features and labels
train_y = train.pop('Species')
test_y = test.pop('Species')

# Define feature columns
feature_columns = []
for key in train.keys():
    feature_columns.append(tf.feature_column.numeric_column(key=key))

# Create input functions
def input_fn(features, labels, training=True, batch_size=256):
    dataset = tf.data.Dataset.from_tensor_slices((dict(features), labels))
    if training:
        dataset = dataset.shuffle(1000).repeat()
    return dataset.batch(batch_size)

# Build a DNN classifier with two hidden layers
classifier = tf.estimator.DNNClassifier(
    feature_columns=feature_columns,
    hidden_units=[30, 10],     # Two layers: 30 and 10 neurons
    n_classes=3                 # Three species
)

# Train the model
classifier.train(
    input_fn=lambda: input_fn(train, train_y, training=True),
    steps=5000
)

# Evaluate on test data
eval_result = classifier.evaluate(
    input_fn=lambda: input_fn(test, test_y, training=False)
)
print(f"\nTest accuracy: {eval_result['accuracy']:.4f}")
```

## Making Predictions

```python
# Predict species for new flowers
def input_fn_predict(features, batch_size=256):
    return tf.data.Dataset.from_tensor_slices(dict(features)).batch(batch_size)

predict_data = {
    'SepalLength': [5.1, 5.9, 6.9],
    'SepalWidth':  [3.3, 3.0, 3.1],
    'PetalLength': [1.7, 4.2, 5.4],
    'PetalWidth':  [0.5, 1.5, 2.1],
}

predictions = classifier.predict(
    input_fn=lambda: input_fn_predict(predict_data)
)

for pred in predictions:
    class_id = pred['class_ids'][0]
    probability = pred['probabilities'][class_id]
    print(f"Predicted: {SPECIES[class_id]} ({probability:.1%} confidence)")
```

Classification is one of the most widely used machine learning tasks. Understanding evaluation metrics like precision and recall is essential for building models that work well in real-world applications.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
