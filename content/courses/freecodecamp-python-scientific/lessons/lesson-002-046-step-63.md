---
id: lesson-002-046
title: Step 63
chapterId: chapter-02
order: 46
duration: 5
objectives:
  - Step 63
---

# Step 63

You will need to increase the `key_index` count for the next iteration.
To do this, after the line you just added and in the same code block, use the addition assignment operator to increment `key_index` by one.

## Starter Code

```html
text = 'Hello Zaira'
custom_key = 'python'

def vigenere(message, key):
    key_index = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    encrypted_text = ''

    for char in message.lower():
--fcc-editable-region--
        # Append space to the message
        if char == ' ':
            encrypted_text += char
        else:
            key_char = key[key_index % len(key)]
--fcc-editable-region--
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)
```

## Hints

1. You should use the `+=` operator to add `1` to `key_index` inside the `else` clause body.
2. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554a49a4f782f208abcc87e*
