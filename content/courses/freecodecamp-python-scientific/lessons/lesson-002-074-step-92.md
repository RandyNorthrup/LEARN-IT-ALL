---
id: lesson-002-074
title: Step 92
chapterId: chapter-02
order: 74
duration: 5
objectives:
  - Step 92
---

# Step 92

Next, modify `print('Key: ' + custom_key)` to use an f-string.

## Starter Code

```html
text = 'mrttaqrhknsw ih puggrur'
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

def encrypt(message, key):
    return vigenere(message, key)
    
def decrypt(message, key):
    return vigenere(message, key, -1)
--fcc-editable-region--
print(f'Encrypted text: {text}')
print('Key: ' + custom_key)
--fcc-editable-region--
#decryption = decrypt(encryption, custom_key)
#print(decryption)
```

## Hints

1. You should modify the `print('Key: ' + custom_key)` call so that it prints the same result using an f-string.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6555e3f387381a19d5e00333*
