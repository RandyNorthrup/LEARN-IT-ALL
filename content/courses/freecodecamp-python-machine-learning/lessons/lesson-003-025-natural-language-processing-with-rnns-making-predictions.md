---
id: lesson-003-025
title: Natural Language Processing With RNNs: Making Predictions
chapterId: chapter-03
order: 25
duration: 5
objectives:
  - Load and use a saved Keras model for text classification inference
  - Preprocess new raw text to match the model's expected input format
  - Interpret prediction probabilities and apply confidence thresholds
  - Perform batch predictions efficiently on multiple text samples
  - Understand practical considerations for deploying NLP models
---

# Natural Language Processing With RNNs: Making Predictions

Training a model is only half the story. To be useful, your sentiment analysis model needs to make predictions on **new, unseen text**. This lesson covers the complete inference pipeline: saving models, preprocessing raw input, interpreting results, and preparing for deployment.

## Saving and Loading Models

After training, save your model so it can be loaded later without retraining:

```python
import tensorflow as tf

# Save the entire model (architecture + weights + optimizer state)
model.save('sentiment_model.keras')

# Load the model later
loaded_model = tf.keras.models.load_model('sentiment_model.keras')

# Verify it works
loss, accuracy = loaded_model.evaluate(test_data, test_labels)
print(f"Loaded model accuracy: {accuracy:.4f}")
```

The `.keras` format (or legacy `.h5`) saves everything needed to recreate the model. You can also save just the weights with `model.save_weights()` if you want to load them into a different architecture.

## Preprocessing New Text

Raw text must go through the **exact same preprocessing** pipeline used during training. This is a critical step — any mismatch will produce garbage predictions.

```python
from tensorflow.keras.datasets import imdb
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Load the same word index used during training
word_index = imdb.get_word_index()

VOCAB_SIZE = 10000
MAXLEN = 250

def preprocess_text(text):
    """Convert raw text to the model's expected input format."""
    # Lowercase and split into words
    words = text.lower().split()
    
    # Encode words to integers using the same word index
    # Add 3 to each index because indices 0-2 are reserved:
    # 0=padding, 1=start, 2=unknown
    encoded = [word_index.get(word, 2) + 3 for word in words]
    
    # Replace out-of-vocabulary words (index >= VOCAB_SIZE) with unknown token
    encoded = [idx if idx < VOCAB_SIZE else 2 for idx in encoded]
    
    # Pad to the expected length
    padded = pad_sequences([encoded], maxlen=MAXLEN, padding='post', truncating='post')
    
    return padded
```

## Making Single Predictions

With preprocessing in place, you can classify any text:

```python
def predict_sentiment(model, text):
    """Predict sentiment and return human-readable result."""
    processed = preprocess_text(text)
    prediction = model.predict(processed, verbose=0)[0][0]
    
    sentiment = "Positive" if prediction >= 0.5 else "Negative"
    confidence = prediction if prediction >= 0.5 else 1 - prediction
    
    return {
        'text': text[:100] + '...' if len(text) > 100 else text,
        'sentiment': sentiment,
        'confidence': f"{confidence:.2%}",
        'raw_score': float(prediction)
    }

# Test with sample reviews
reviews = [
    "This movie was absolutely fantastic! The acting was superb and the plot kept me on the edge of my seat.",
    "Terrible film. Waste of time. The script was awful and the acting was wooden.",
    "It was okay. Some parts were good but overall nothing special."
]

for review in reviews:
    result = predict_sentiment(loaded_model, review)
    print(f"{result['sentiment']} ({result['confidence']}): {result['text']}")
```

Output might look like:
```
Positive (93.21%): This movie was absolutely fantastic! The acting was superb...
Negative (97.54%): Terrible film. Waste of time. The script was awful...
Negative (58.12%): It was okay. Some parts were good but overall nothing special.
```

## Interpreting Prediction Probabilities

The sigmoid output gives a probability between 0 and 1. Understanding what these scores mean is important:

- **> 0.8 or < 0.2**: High confidence predictions — the model is very sure
- **0.4 – 0.6**: Low confidence predictions — the review may be ambiguous or contain mixed sentiment
- **Exactly 0.5**: Maximum uncertainty — the model cannot decide

You can set a **confidence threshold** to filter out uncertain predictions:

```python
def predict_with_threshold(model, text, threshold=0.7):
    processed = preprocess_text(text)
    score = model.predict(processed, verbose=0)[0][0]
    
    if score > threshold:
        return "Positive"
    elif score < (1 - threshold):
        return "Negative"
    else:
        return "Uncertain"  # Flag for human review
```

## Batch Predictions

For processing many reviews at once, batch prediction is far more efficient than predicting one at a time:

```python
def batch_predict(model, texts, batch_size=32):
    """Efficiently predict sentiment for a list of texts."""
    # Preprocess all texts
    processed = [preprocess_text(text)[0] for text in texts]
    processed = np.array(processed)
    
    # Predict in batches (GPU-optimized)
    predictions = model.predict(processed, batch_size=batch_size, verbose=0)
    
    results = []
    for text, pred in zip(texts, predictions):
        score = pred[0]
        results.append({
            'text': text[:80],
            'sentiment': 'Positive' if score >= 0.5 else 'Negative',
            'score': float(score)
        })
    
    return results

# Process 1000 reviews efficiently
results = batch_predict(loaded_model, large_review_list)
```

Batch prediction leverages GPU parallelism and is typically **10-100x faster** than making individual predictions in a loop.

## Deployment Considerations

When preparing a model for production use, consider:

- **Model size**: LSTM models are relatively small (often < 50 MB), making them easy to deploy
- **Latency**: Single predictions typically take 10-50ms on CPU, faster on GPU
- **Preprocessing consistency**: Package your preprocessing logic with the model to avoid train-serve skew
- **TensorFlow Serving**: For production APIs, use TF Serving or convert to TensorFlow Lite for mobile
- **Monitoring**: Track prediction distributions over time to detect data drift

## Key Takeaways

- Always **save your model** after training so it can be reused without retraining
- New text must pass through the **identical preprocessing pipeline** used during training
- Prediction scores are **probabilities** — use confidence thresholds to handle uncertain cases
- **Batch predictions** are dramatically more efficient than individual predictions
- Consider model size, latency, and preprocessing consistency when planning deployment

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
