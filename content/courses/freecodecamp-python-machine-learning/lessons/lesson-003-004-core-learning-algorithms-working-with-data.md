---
id: lesson-003-004
title: Core Learning Algorithms: Working with Data
chapterId: chapter-03
order: 4
duration: 5
objectives:
  - Load and inspect datasets using pandas and TensorFlow's tf.data API
  - Create numeric, categorical, and bucketized feature columns with tf.feature_column
  - Apply data preprocessing techniques including normalization and handling missing values
  - Convert a pandas DataFrame into a tf.data.Dataset for model training
  - Understand why proper data preparation is critical for model performance
---

# Core Learning Algorithms: Working with Data

Before any machine learning algorithm can learn, you need to load, inspect, and prepare your data. Poorly prepared data leads to poor models — the saying "garbage in, garbage out" is especially true in ML. This lesson covers how to load datasets, create feature columns, and preprocess data using pandas and TensorFlow.

## Loading Data with Pandas

Pandas is the standard Python library for tabular data manipulation. Most ML workflows start by loading a CSV file into a pandas DataFrame:

```python
import pandas as pd

# Load the Titanic dataset (a classic ML dataset)
df_train = pd.read_csv('https://storage.googleapis.com/tf-datasets/titanic/train.csv')
df_eval = pd.read_csv('https://storage.googleapis.com/tf-datasets/titanic/eval.csv')

# Separate labels from features
y_train = df_train.pop('survived')
y_eval = df_eval.pop('survived')

# Inspect the data
print(df_train.head())
print(df_train.describe())  # Statistical summary
print(df_train.shape)        # (number of rows, number of columns)
print(df_train.dtypes)       # Data types for each column
```

Always start by exploring your data. Check for missing values, understand the distribution of each feature, and look at a few sample rows:

```python
# Check for missing values
print(df_train.isnull().sum())

# Value counts for categorical columns
print(df_train['sex'].value_counts())
print(df_train['class'].value_counts())
```

## Feature Columns in TensorFlow

TensorFlow's `tf.feature_column` API defines how the model should interpret each input feature. This is especially important for the `tf.estimator` API. There are several types of feature columns:

### Numeric Columns

For continuous numerical data like age or fare:

```python
import tensorflow as tf

age = tf.feature_column.numeric_column('age')
fare = tf.feature_column.numeric_column('fare')
```

### Categorical Columns

For discrete categories like sex or embarkation port:

```python
# When you know all possible values
sex = tf.feature_column.categorical_column_with_vocabulary_list(
    'sex', ['male', 'female']
)

# For columns with many unique values, use a hash bucket
occupation = tf.feature_column.categorical_column_with_hash_bucket(
    'occupation', hash_bucket_size=100
)
```

Categorical columns cannot be fed directly into a model — they must be wrapped in an indicator (one-hot) or embedding column:

```python
# One-hot encoding for low-cardinality features
sex_indicator = tf.feature_column.indicator_column(sex)

# Embedding for high-cardinality features
occupation_embedding = tf.feature_column.embedding_column(
    occupation, dimension=8
)
```

### Bucketized Columns

Convert continuous values into categorical buckets. This is useful when the relationship between a numeric feature and the label is not linear:

```python
# Bucket age into groups
age_buckets = tf.feature_column.bucketized_column(
    age, boundaries=[18, 25, 35, 50, 65]
)
# Result: age 22 → bucket [18, 25), age 55 → bucket [50, 65)
```

## Building a Complete Feature Column List

For the Titanic dataset, you would define feature columns for every input feature:

```python
CATEGORICAL_COLUMNS = ['sex', 'n_siblings_spouses', 'parch',
                        'class', 'deck', 'embark_town', 'alone']
NUMERIC_COLUMNS = ['age', 'fare']

feature_columns = []

for col_name in CATEGORICAL_COLUMNS:
    vocabulary = df_train[col_name].unique()
    cat_col = tf.feature_column.categorical_column_with_vocabulary_list(
        col_name, vocabulary
    )
    feature_columns.append(tf.feature_column.indicator_column(cat_col))

for col_name in NUMERIC_COLUMNS:
    feature_columns.append(tf.feature_column.numeric_column(col_name))

print(f"Total feature columns: {len(feature_columns)}")
```

## Data Normalization

Normalization scales numeric features to a standard range, preventing features with large values from dominating the model:

```python
# Min-Max normalization: scales to [0, 1]
df_train['age_normalized'] = (
    (df_train['age'] - df_train['age'].min()) /
    (df_train['age'].max() - df_train['age'].min())
)

# Standard normalization (z-score): mean=0, std=1
df_train['fare_standardized'] = (
    (df_train['fare'] - df_train['fare'].mean()) /
    df_train['fare'].std()
)
```

## Creating a tf.data.Dataset

The `tf.data` API provides efficient data pipelines for feeding data into models:

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

This function creates a reusable input pipeline that batches, shuffles, and repeats the data as needed during training and evaluation.

With your data loaded, features defined, and input pipeline created, you are ready to train a model.

---

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
