---
id: lesson-002-076
title: Step 95
chapterId: chapter-02
order: 76
duration: 5
objectives:
  - Step 95
---

# Step 95

Uncomment your last `print()` call and change it to use the f-string `f'\nDecrypted text: {decryption}\n'` as the argument.

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
decryption = decrypt(text, custom_key)
#print(decryption)
--fcc-editable-region--
```

## Hints

1. You should uncomment your last `print()` call and change it to use `f'\nDecrypted text: {decryption}\n'` as the argument.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6555e547c18a2b1a7b795bd8*
