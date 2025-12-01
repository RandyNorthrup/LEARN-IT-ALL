---
id: lesson-002-047
title: Step 64
chapterId: chapter-02
order: 47
duration: 5
objectives:
  - Step 64
---

# Step 64

Inside the `else` clause, write a comment saying `Find the right key character to encode`.

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
            key_index += 1
--fcc-editable-region--
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)
```

## Hints

1. You should create a comment saying `Find the right key character to encode`. Don't forget  the `#` at the beginning.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554a57ec0a2c52106e7ee50*
