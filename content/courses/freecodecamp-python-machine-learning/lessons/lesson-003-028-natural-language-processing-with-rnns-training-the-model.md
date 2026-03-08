---
id: lesson-003-028
title: Natural Language Processing With RNNs: Training the Model
chapterId: chapter-03
order: 28
duration: 5
objectives:
  - Configure categorical cross-entropy loss for character-level text generation
  - Use training callbacks for checkpointing and early stopping
  - Monitor training progress using loss and perplexity metrics
  - Generate sample text at different training stages to assess quality
  - Understand the time and compute requirements for training text generation models
---

# Natural Language Processing With RNNs: Training the Model

With the model architecture defined, we now train our Shakespeare text generator. Training a text generation model requires specific loss functions, careful monitoring, and patience — watching the model evolve from random gibberish to coherent text is one of the most rewarding experiences in deep learning.

## Loss Function: Sparse Categorical Cross-Entropy

Since our model predicts a probability distribution over the vocabulary at each time step, we use **sparse categorical cross-entropy** as the loss function:

```python
import tensorflow as tf

model.compile(
    optimizer='adam',
    loss=tf.keras.losses.SparseCategoricalCrossentropy(),
    metrics=['accuracy']
)
```

Why **sparse** categorical cross-entropy? Because our targets are integer-encoded character indices (e.g., 42), not one-hot vectors. The "sparse" variant handles the conversion internally, saving memory when the vocabulary is large.

## Checkpointing: Saving Progress During Training

Text generation models can take hours to train. **Checkpointing** saves the model at regular intervals so you don't lose progress if training is interrupted:

```python
import os

# Create a checkpoint directory
checkpoint_dir = './training_checkpoints'
os.makedirs(checkpoint_dir, exist_ok=True)
checkpoint_prefix = os.path.join(checkpoint_dir, "ckpt_{epoch}")

checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(
    filepath=checkpoint_prefix,
    save_weights_only=True,
    save_best_only=False,  # Save every epoch for text generation comparisons
    verbose=1
)
```

## Training Callbacks

Combine multiple callbacks for comprehensive training management:

```python
callbacks = [
    # Save checkpoints
    checkpoint_callback,
    
    # Stop early if loss plateaus
    tf.keras.callbacks.EarlyStopping(
        monitor='loss',
        patience=5,
        restore_best_weights=True
    ),
    
    # Reduce learning rate when loss plateaus
    tf.keras.callbacks.ReduceLROnPlateau(
        monitor='loss',
        factor=0.5,
        patience=2,
        min_lr=1e-6,
        verbose=1
    ),
    
    # Log training history for TensorBoard
    tf.keras.callbacks.TensorBoard(
        log_dir='./logs',
        histogram_freq=1
    )
]
```

## Training the Model

```python
EPOCHS = 30

history = model.fit(
    dataset,
    epochs=EPOCHS,
    callbacks=callbacks
)
```

Training time depends heavily on hardware:
- **CPU only**: 5-10 minutes per epoch (not recommended)
- **Single GPU**: 30-60 seconds per epoch
- **Google Colab (free GPU)**: ~1 minute per epoch

For 30 epochs on a GPU, expect total training time of 30-60 minutes.

## Monitoring Perplexity

**Perplexity** is the standard metric for language models. It represents how "surprised" the model is by the test data — lower perplexity means better predictions:

$$\text{Perplexity} = e^{\text{loss}}$$

```python
import numpy as np
import matplotlib.pyplot as plt

# Calculate perplexity from loss history
losses = history.history['loss']
perplexities = [np.exp(loss) for loss in losses]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

ax1.plot(losses)
ax1.set_title('Training Loss')
ax1.set_xlabel('Epoch')
ax1.set_ylabel('Loss')

ax2.plot(perplexities)
ax2.set_title('Perplexity')
ax2.set_xlabel('Epoch')
ax2.set_ylabel('Perplexity')

plt.tight_layout()
plt.show()

print(f"Final loss: {losses[-1]:.4f}")
print(f"Final perplexity: {perplexities[-1]:.2f}")
```

For a character-level Shakespeare model, expect perplexity to drop from ~65 (size of the vocabulary, essentially random guessing) to around 3-5 after training.

## Text Quality at Different Training Stages

One of the best ways to understand training progress is to generate sample text at different epochs. Here is what you might observe:

**After 1 epoch** (random patterns):
```
ROMEO:
thee the the the the and the the
the and the and and the the
```

**After 5 epochs** (learning word boundaries and common words):
```
ROMEO:
What shall be the seath and so
The death of the world be so
```

**After 20 epochs** (recognizable Shakespeare style):
```
ROMEO:
What shall I say? The noble lord
Hath in his heart a purpose dark,
And with the morning dew shall come
```

## Generating Text from Checkpoints

To generate text, we rebuild the model with `batch_size=1` and load saved weights:

```python
# Rebuild model with batch_size=1 for generation
gen_model = build_model(vocab_size, embedding_dim, rnn_units, batch_size=1)

# Load the latest checkpoint
gen_model.load_weights(tf.train.latest_checkpoint(checkpoint_dir))
gen_model.build(tf.TensorShape([1, None]))

# Generate text with different temperatures
for temp in [0.2, 0.5, 1.0, 1.5]:
    print(f"\n--- Temperature: {temp} ---")
    print(generate_text(gen_model, start_string="ROMEO: ", temperature=temp))
    print()
```

Comparing outputs at different temperatures:
- **0.2**: Very conservative, may repeat common phrases but rarely makes errors
- **0.5**: Good balance of coherence and variety
- **1.0**: Creative, occasionally surprising word choices
- **1.5**: Wild and experimental, may produce novel word-like sequences

## Common Training Issues

| Issue | Symptom | Solution |
|-------|---------|----------|
| **Loss not decreasing** | Loss stays flat after epoch 1 | Reduce learning rate, check data pipeline |
| **Loss oscillating** | Loss jumps up and down | Reduce learning rate or batch size |
| **Repetitive output** | Model generates the same phrases | Train longer, increase model capacity |
| **Garbled output** | Non-English characters or broken words | Check encoding, verify vocabulary mapping |
| **Overfitting** | Training loss decreases but generated text becomes worse | Add dropout, reduce model size, or use less training data per epoch |

## Key Takeaways

- Use **sparse categorical cross-entropy** when targets are integer-encoded rather than one-hot
- **Checkpointing** is essential for long training runs — save weights at every epoch
- **Perplexity** ($e^{\text{loss}}$) is the standard language model metric — lower is better
- Text quality improves dramatically over training: from random characters to recognizable prose
- Rebuild the model with **batch_size=1** for generation, then load the trained weights
- **Temperature sampling** is your primary tool for controlling the creativity-coherence trade-off

*Based on the [freeCodeCamp Machine Learning with Python Certification](https://www.freecodecamp.org/learn/machine-learning-with-python/)*
