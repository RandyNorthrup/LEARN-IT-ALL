---
id: lesson-002-068
title: Step 87
chapterId: chapter-02
order: 68
duration: 5
objectives:
  - Step 87
---

# Step 87

It works! Now, you are going to start with an encrypted message to be decrypted.

Change the value of `text` to the string `'mrttaqrhknsw ih puggrur'`.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello Zaira!'
custom_key = 'python'
--fcc-editable-region--
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
    
encryption = encrypt(text, custom_key)
print(encryption)
decryption = decrypt(encryption, custom_key)
print(decryption)
```

## Hints

1. You should still have a `text` variable.
2. Your `text` variable should have the value of `'mrttaqrhknsw ih puggrur'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65553159615a8123b190ee43*
