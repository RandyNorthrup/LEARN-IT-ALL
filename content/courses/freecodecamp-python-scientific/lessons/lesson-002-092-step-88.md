---
id: lesson-002-092
title: Step 88
chapterId: chapter-02
order: 92
duration: 5
objectives:
  - Step 88
---

# Step 88

Since this time you are starting from an encrypted string to decrypt, you won't need the `encryption` variable anymore.

Delete `encryption` and the `print(encryption)` call. Also, comment out the last two lines of your code.

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
encryption = encrypt(text, custom_key)
print(encryption)
decryption = decrypt(encryption, custom_key)
print(decryption)
--fcc-editable-region--
```

## Hints

1. You should delete the `encryption` variable and its value.
2. You should not have `print(encryption)` in your code.
3. You should turn `decryption = decrypt(encryption, custom_key)` into a comment.
4. You should turn `print(decryption)` into a comment.
5. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65a450e8fb2c9d75c7378d28*
