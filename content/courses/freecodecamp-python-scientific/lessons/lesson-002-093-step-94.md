---
id: lesson-002-093
title: Step 94
chapterId: chapter-02
order: 93
duration: 5
objectives:
  - Step 94
---

# Step 94

Uncomment the `decryption` variable and change its value by passing `text` as the first argument to `decrypt`.

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
print(f'\nEncrypted text: {text}')
print(f'Key: {custom_key}')
#decryption = decrypt(encryption, custom_key)
--fcc-editable-region--
#print(decryption)
```

## Hints

1. Your `decryption` variable should have the value of `decrypt(text, custom_key)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65a51c9e000b660122b8b29e*
