---
id: lesson-003-026
title: Natural Language Processing With RNNs: Create a Play Generator
chapterId: chapter-03
order: 26
duration: 5
objectives:
  - Distinguish between character-level and word-level text generation approaches
  - Prepare a text corpus for sequence-based training by creating input-target pairs
  - Implement temperature sampling to control text generation creativity
  - Build a character-level RNN text generator using Shakespeare's works
  - Generate novel text sequences from a trained language model
---

# Natural Language Processing With RNNs: Create a Play Generator

Text generation is one of the most creative applications of RNNs. In this lesson, we build a **Shakespeare text generator** that learns the patterns of his writing and produces new, original text in a similar style.

## Character-Level vs Word-Level Generation

There are two main approaches to text generation:

**Character-level generation:**
- Vocabulary = individual characters (a-z, punctuation, spaces) — typically 50-100 unique tokens
- Learns spelling, grammar, and style simultaneously
- Can generate any word, including novel ones
- Needs longer sequences to capture meaning
- Better for stylistic mimicry and smaller datasets

**Word-level generation:**
- Vocabulary = unique words — often 10,000-50,000+ tokens
- Each token carries more semantic meaning
- Cannot generate words outside its vocabulary
- Requires much larger training corpora
- Better for coherent, meaningful text

For our Shakespeare generator, we use **character-level generation** because the vocabulary is tiny and we want to capture his distinctive writing style, including archaic spelling and formatting.

## Loading the Shakespeare Dataset

TensorFlow provides a convenient dataset of Shakespeare's complete works:

```python
import tensorflow as tf
import numpy as np

# Download Shakespeare's works (~1.1MB of text)
path_to_file = tf.keras.utils.get_file(
    'shakespeare.txt',
    'https://storage.googleapis.com/download.tensorflow.org/data/shakespeare.txt'
)

text = open(path_to_file, 'rb').read().decode(encoding='utf-8')
print(f"Text length: {len(text)} characters")
print(f"First 200 characters:\n{text[:200]}")
```

## Building the Character Vocabulary

We create mappings between characters and integers:

```python
# Get unique characters
vocab = sorted(set(text))
print(f"Unique characters: {len(vocab)}")

# Create character-to-index and index-to-character mappings
char2idx = {char: idx for idx, char in enumerate(vocab)}
idx2char = np.array(vocab)

# Encode the entire text as integers
text_as_int = np.array([char2idx[c] for c in text])
print(f"'{text[:10]}' encodes to {text_as_int[:10]}")
```

## Creating Training Sequences

We split the text into input-target pairs where the target is the input shifted by one character:

```python
seq_length = 100  # Each training example is 100 characters

# Create a tf.data.Dataset from the encoded text
char_dataset = tf.data.Dataset.from_tensor_slices(text_as_int)

# Batch into sequences of seq_length + 1 (input + target)
sequences = char_dataset.batch(seq_length + 1, drop_remainder=True)

def split_input_target(sequence):
    """Split a sequence into input and target.
    Input:  'Hello Worl'
    Target: 'ello World'
    """
    input_text = sequence[:-1]
    target_text = sequence[1:]
    return input_text, target_text

dataset = sequences.map(split_input_target)

# Verify the structure
for input_example, target_example in dataset.take(1):
    print(f"Input:  {''.join(idx2char[input_example.numpy()[:30]])}")
    print(f"Target: {''.join(idx2char[target_example.numpy()[:30]])}")
```

This creates a dataset where for each position, the model learns to predict the **next character** given all preceding characters. A sequence of 100 characters provides 100 training examples simultaneously.

## Preparing the Dataset for Training

```python
BATCH_SIZE = 64
BUFFER_SIZE = 10000

dataset = dataset.shuffle(BUFFER_SIZE).batch(BATCH_SIZE, drop_remainder=True)
print(f"Batches per epoch: {len(list(dataset))}")
```

## Temperature Sampling

When generating text, we don't just pick the most likely character every time — that produces repetitive, boring output. Instead, we use **temperature sampling**:

```python
def generate_text(model, start_string, num_generate=500, temperature=1.0):
    """Generate text from a trained model."""
    input_eval = [char2idx[s] for s in start_string]
    input_eval = tf.expand_dims(input_eval, 0)
    
    text_generated = []
    model.reset_states()
    
    for _ in range(num_generate):
        predictions = model(input_eval)
        predictions = tf.squeeze(predictions, 0)
        
        # Temperature controls randomness:
        # Low (0.2): conservative, repetitive but grammatically correct
        # Medium (1.0): balanced creativity
        # High (2.0): wild, creative but often nonsensical
        predictions = predictions / temperature
        predicted_id = tf.random.categorical(predictions, num_samples=1)[-1, 0].numpy()
        
        input_eval = tf.expand_dims([predicted_id], 0)
        text_generated.append(idx2char[predicted_id])
    
    return start_string + ''.join(text_generated)
```

Temperature works by scaling the logits before applying softmax:
- **Temperature = 0.2**: Sharpens the distribution — the model almost always picks the highest-probability character
- **Temperature = 1.0**: Uses the original learned distribution
- **Temperature = 2.0**: Flattens the distribution — less likely characters get picked more often

## Key Takeaways

- **Character-level generation** works well for stylistic text with small vocabularies
- Training sequences are created by sliding a window through the text and predicting the **next character**
- **Temperature sampling** is the primary knob for controlling the creativity vs. coherence trade-off
- The Shakespeare dataset provides roughly 1.1 million characters — sufficient for a character-level model to learn basic English patterns and Shakespeare's style
- The data pipeline uses `tf.data.Dataset` for efficient batching and shuffling

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
