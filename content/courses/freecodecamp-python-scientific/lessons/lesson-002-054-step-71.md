---
id: lesson-002-054
title: Step 71
chapterId: chapter-02
order: 54
duration: 5
objectives:
  - Step 71
---

# Step 71

All you need to do is multiply the `offset` by the `direction` in the `new_index` assignment. The multiplication operator in Python is `*`.

## Starter Code

```html
text = 'Hello Zaira'
custom_key = 'python'

def vigenere(message, key, direction):
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

            # Define the offset and the encrypted letter
            offset = alphabet.index(key_char)
            index = alphabet.find(char)
--fcc-editable-region--
            new_index = (index + offset) % len(alphabet)
--fcc-editable-region--
            encrypted_text += alphabet[new_index]
    
    return encrypted_text
    
#encryption = vigenere(text, custom_key)
#print(encryption)
```

## Hints

1. You should multiply `offset` by `direction` in the `new_index` assignment. Do not add other parentheses.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554de295ade563a069936a1*
