---
id: lesson-002-049
title: Step 66
chapterId: chapter-02
order: 49
duration: 5
objectives:
  - Step 66
---

# Step 66

Above the `offset` variable, create another comment saying `Define the offset and the encrypted letter`.

## Starter Code

```html
text = 'Hello Zaira'
custom_key = 'python'

def vigenere(message, key):
    key_index = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    encrypted_text = ''

    for char in message.lower():
    
        # Append space to the message
        if char == ' ':
            encrypted_text += char
        else:
            # Find the right key character to encode
            key_char = key[key_index % len(key)]
            key_index += 1
--fcc-editable-region--
            
            offset = alphabet.index(key_char)
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should create a comment saying `Define the offset and the encrypted letter`. Don't forget the `#` at the beginning.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554ac937a49be2701af4f2f*
