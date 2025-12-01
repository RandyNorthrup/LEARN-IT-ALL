---
id: lesson-002-056
title: Step 73
chapterId: chapter-02
order: 56
duration: 5
objectives:
  - Step 73
---

# Step 73

Check if the function can decrypt the string back to the plain text.

Declare another variable called `decryption` and assign it `vigenere(encryption, custom_key, -1)`.

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
            new_index = (index + offset*direction) % len(alphabet)
            encrypted_text += alphabet[new_index]
    
    return encrypted_text
--fcc-editable-region--    
encryption = vigenere(text, custom_key, 1)
print(encryption)

--fcc-editable-region--
```

## Hints

1. You should call `vigenere` passing `encryption`, `custom_key` and `-1` as the arguments.
2. You should declare a `decryption` variable.
3. Your `decryption` variable should have the value of `vigenere(encryption, custom_key, -1)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554e0adc7bb193cbfdb36d5*
