---
id: lesson-002-041
title: Step 58
chapterId: chapter-02
order: 41
duration: 5
objectives:
  - Step 58
---

# Step 58

Now modify your function declaration: change the function name into `vigenere` and the second parameter into `key`.

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
--fcc-editable-region--
```

## Hints

1. You should modify your function name into `vigenere`.
2. Your `vigenere` function should take `message` and `key` as the parameters.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 655491bd5b98b813fa5bedca*
