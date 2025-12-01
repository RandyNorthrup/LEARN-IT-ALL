---
id: lesson-002-043
title: Step 60
chapterId: chapter-02
order: 43
duration: 5
objectives:
  - Step 60
---

# Step 60

Since your key is shorter than the text that you will have to encrypt, you will need to repeat it to generate the whole encrypted text.
At the beginning of your function body, declare a `key_index` variable and set it to zero.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello Zaira'
custom_key = 'python'

def vigenere(message, key):
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

1. You should declare a variable called `key_index` at the beginning of your function body.
2. You should assign `0` to your `key_index` variable.
3. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65549561463f0016876e852c*
