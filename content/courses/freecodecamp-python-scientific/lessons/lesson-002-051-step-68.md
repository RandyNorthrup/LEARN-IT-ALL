---
id: lesson-002-051
title: Step 68
chapterId: chapter-02
order: 51
duration: 5
objectives:
  - Step 68
---

# Step 68

Call your function passing `text` and `custom_key` as the arguments. Store the return value of the function call in a variable called `encryption`.

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

            # Define the offset and the encrypted letter
            offset = alphabet.index(key_char)
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    
    return encrypted_text
--fcc-editable-region--

--fcc-editable-region--
```

## Hints

1. You should call `vigenere` passing `text` and `custom_key` as the arguments.
2. You should have an `encryption` variable.
3. You should assign your function call to the `encryption` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554d0332949b133a0b35eaa*
