---
id: lesson-002-040
title: Step 57
chapterId: chapter-02
order: 40
duration: 5
objectives:
  - Step 57
---

# Step 57

Currently, every single letter is always encrypted with the same letter, depending on the specified offset. What if the offset were different for each letter? That would be much more difficult to decrypt. This algorithm is referred to as the Vigenère cipher, where the offset for each letter is determined by another text, called the *key*.

Start transforming your Caesar cipher into a Vigenère cipher by removing the two function calls.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello Zaira'
shift = 3

def caesar(message, offset):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    encrypted_text = ''

    for char in message.lower():
        if char == ' ':
            encrypted_text += char
        else:
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)

caesar(text, shift)
caesar(text, 13)
--fcc-editable-region--
```

## Hints

1. You should remove your two `caesar()` function calls.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553f8c570f9982e013a8886*
