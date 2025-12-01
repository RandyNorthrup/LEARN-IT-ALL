---
id: lesson-002-038
title: Step 56
chapterId: chapter-02
order: 38
duration: 5
objectives:
  - Step 56
---

# Step 56

At the bottom of your code, after your existing `caesar(text, shift)` call, call your function again.

This time, pass the `text` variable and the integer `13` as arguments.

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
--fcc-editable-region--
```

## Hints

1. You should call your function again, this time passing `text` and `13` as arguments.
2. You should keep the existing function call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553f6086add4b2cbb99fd78*
