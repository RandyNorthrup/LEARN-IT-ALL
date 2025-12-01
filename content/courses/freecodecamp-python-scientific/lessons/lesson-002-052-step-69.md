---
id: lesson-002-052
title: Step 69
chapterId: chapter-02
order: 52
duration: 5
objectives:
  - Step 69
---

# Step 69

And now, try to print `encryption` to see the actual output on the terminal.

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
encryption = vigenere(text, custom_key)

--fcc-editable-region--
```

## Hints

1. You should print your `encryption` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554d15c8acb5f34499ad789*
