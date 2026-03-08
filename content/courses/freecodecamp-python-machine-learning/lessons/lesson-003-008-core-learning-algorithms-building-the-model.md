---
id: lesson-003-008
title: Core Learning Algorithms: Building the Model
chapterId: chapter-03
order: 8
duration: 5
objectives:
  - Describe the tf.estimator API and its role in simplifying model building
  - Compare LinearClassifier, LinearRegressor, and DNNClassifier estimators and their use cases
  - Follow the complete model building workflow from feature columns to prediction
  - Build, train, evaluate, and use a LinearClassifier on the Titanic survival dataset
  - Understand how pre-made estimators abstract away the training loop
---

# Core Learning Algorithms: Building the Model

TensorFlow provides the `tf.estimator` API as a high-level way to build, train, evaluate, and make predictions with machine learning models. Estimators handle much of the boilerplate code for you — managing the training loop, checkpointing, logging, and distributed training. This lesson covers how to use pre-made estimators to build complete models.

## The tf.estimator API

Estimators are TensorFlow’s high-level representation of a complete model. A pre-made estimator is a ready-to-use implementation of a common algorithm. You just need to configure it with feature columns and hyperparameters.

### Available Pre-Made Estimators

| Estimator | Task | Use When |
|-----------|------|----------|
| `tf.estimator.LinearClassifier` | Classification | Features have a linear relationship to the label |
| `tf.estimator.LinearRegressor` | Regression | Predicting a continuous value with linear features |
| `tf.estimator.DNNClassifier` | Classification | Complex non-linear relationships between features |
| `tf.estimator.DNNRegressor` | Regression | Complex non-linear regression tasks |
| `tf.estimator.DNNLinearCombinedClassifier` | Classification | Mix of sparse linear and dense features (wide & deep) |

## The Model Building Workflow

Building a model with estimators follows a consistent 5-step workflow:

```
Step 1: Define Feature Columns
    │  What features does the model see? What types are they?
    ▼
Step 2: Create an Input Function
    │  How is data fed to the model? (batching, shuffling, repeating)
    ▼
Step 3: Instantiate the Estimator
    │  Which algorithm? What hyperparameters?
    ▼
Step 4: Train the Model
    │  Call estimator.train() with the training input function
    ▼
Step 5: Evaluate and Predict
       Call estimator.evaluate() and estimator.predict()
```

## Complete Example: Titanic Survival Prediction

Let’s walk through the entire workflow using the Titanic dataset, predicting whether a passenger survived:

### Step 1: Load Data and Define Feature Columns

```python
import tensorflow as tf
import pandas as pd

# Load pre-split Titanic data
df_train = pd.read_csv('https://storage.googleapis.com/tf-datasets/titanic/train.csv')
df_eval = pd.read_csv('https://storage.googleapis.com/tf-datasets/titanic/eval.csv')

y_train = df_train.pop('survived')
y_eval = df_eval.pop('survived')

# Define feature columns
CATEGORICAL_COLUMNS = ['sex', 'n_siblings_spouses', 'parch',
                        'class', 'deck', 'embark_town', 'alone']
NUMERIC_COLUMNS = ['age', 'fare']

feature_columns = []
for col in CATEGORICAL_COLUMNS:
    vocabulary = df_train[col].unique()
    cat_col = tf.feature_column.categorical_column_with_vocabulary_list(col, vocabulary)
    feature_columns.append(tf.feature_column.indicator_column(cat_col))

for col in NUMERIC_COLUMNS:
    feature_columns.append(tf.feature_column.numeric_column(col))
```

### Step 2: Create Input Functions

```python
def make_input_fn(data_df, label_df, num_epochs=10, shuffle=True, batch_size=32):
    def input_function():
        ds = tf.data.Dataset.from_tensor_slices((dict(data_df), label_df))
        if shuffle:
            ds = ds.shuffle(1000)
        ds = ds.batch(batch_size).repeat(num_epochs)
        return ds
    return input_function

train_input_fn = make_input_fn(df_train, y_train)
eval_input_fn = make_input_fn(df_eval, y_eval, num_epochs=1, shuffle=False)
```

### Step 3: Create the Estimator

```python
# Linear classifier
linear_est = tf.estimator.LinearClassifier(
    feature_columns=feature_columns
)

# Or a DNN classifier for more complex patterns
dnn_est = tf.estimator.DNNClassifier(
    feature_columns=feature_columns,
    hidden_units=[128, 64, 32]  # Three hidden layers
)
```

### Step 4: Train the Model

```python
linear_est.train(train_input_fn)
print("Training complete.")
```

### Step 5: Evaluate and Predict

```python
# Evaluate on test data
result = linear_est.evaluate(eval_input_fn)
print(f"Accuracy: {result['accuracy']:.4f}")
print(f"AUC:      {result['auc']:.4f}")
print(f"Loss:     {result['loss']:.4f}")
```

Making predictions for individual passengers:

```python
# Predict survival for specific passengers
pred_input_fn = make_input_fn(df_eval, y_eval, num_epochs=1, shuffle=False)

predictions = list(linear_est.predict(pred_input_fn))

# Show first 5 predictions
for i in range(5):
    prob = predictions[i]['probabilities'][1]  # Probability of survival
    actual = y_eval.iloc[i]
    print(f"Predicted survival: {prob:.2%} | Actual: {'Survived' if actual else 'Died'}")
```

## Comparing Estimators

You can easily swap estimators to compare performance:

```python
# Train both models and compare
linear_est.train(train_input_fn)
linear_result = linear_est.evaluate(eval_input_fn)

train_input_fn = make_input_fn(df_train, y_train)  # Recreate (consumed)
eval_input_fn = make_input_fn(df_eval, y_eval, num_epochs=1, shuffle=False)

dnn_est.train(train_input_fn)
dnn_result = dnn_est.evaluate(eval_input_fn)

print(f"Linear accuracy: {linear_result['accuracy']:.4f}")
print(f"DNN accuracy:    {dnn_result['accuracy']:.4f}")
```

The estimator API makes it straightforward to experiment with different model architectures while keeping the rest of your code the same.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
