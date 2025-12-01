---
id: lesson-002-065
title: Step 84
chapterId: chapter-02
order: 65
duration: 5
objectives:
  - Step 84
---

# Step 84

Delete the `pass` keyword, and return `vigenere(message, key)` from your new function.

## Starter Code

```html
text = 'Hello Zaira!'
custom_key = 'python'

def vigenere(message, key, direction=1):
    key_index = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    final_message = ''

    for char in message.lower():

        # Append any non-letter character to the message
        if not char.isalpha():
            final_message += char
        else:        
            # Find the right key character to encode/decode
            key_char = key[key_index % len(key)]
            key_index += 1

            # Define the offset and the encrypted/decrypted letter
            offset = alphabet.index(key_char)
            index = alphabet.find(char)
            new_index = (index + offset*direction) % len(alphabet)
            final_message += alphabet[new_index]
    
    return final_message
--fcc-editable-region--
def encrypt(message, key):
    pass

encryption = vigenere(text, custom_key)
print(encryption)
decryption = vigenere(encryption, custom_key, -1)
print(decryption)
--fcc-editable-region--
```

## Hints

1. Your `encrypt` function should return `vigenere(message, key)`. Remember to delete `pass`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65552a111190e11f0963949e*
