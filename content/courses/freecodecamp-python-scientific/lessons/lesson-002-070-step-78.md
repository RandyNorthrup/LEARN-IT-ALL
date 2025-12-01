---
id: lesson-002-070
title: Step 78
chapterId: chapter-02
order: 70
duration: 5
objectives:
  - Step 78
---

# Step 78

Now you can remove the third argument from your first function call.

## Starter Code

```html
text = 'Hello Zaira'
custom_key = 'python'

def vigenere(message, key, direction=1):
    key_index = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    final_message = ''

    for char in message.lower():
    
        # Append space to the message
        if char == ' ':
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
encryption = vigenere(text, custom_key, 1)
print(encryption)
decryption = vigenere(encryption, custom_key, -1)
print(decryption)
--fcc-editable-region--
```

## Hints

1. You should remove the third argument from `vigenere(text, custom_key, 1)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6555d8b0b3d20b128bdadd37*
