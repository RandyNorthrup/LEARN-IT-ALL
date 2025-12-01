---
id: lesson-002-045
title: Step 62
chapterId: chapter-02
order: 45
duration: 5
objectives:
  - Step 62
---

# Step 62

Next, inside the `else` block, declare a variable called `key_char` and assign it the value of `key` at the index `key_index` mod(`%`) the length of `key`.

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
--fcc-editable-region--        
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)
```

## Hints

1. You should declare a variable called `key_char` at the beginning of your `else` clause body.
2. You should assign `key[key_index % len(key)]` to your `key_char` variable.
3. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554a334a40edb1fb4eff827*
