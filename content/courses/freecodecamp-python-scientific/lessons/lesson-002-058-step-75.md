---
id: lesson-002-058
title: Step 75
chapterId: chapter-02
order: 58
duration: 5
objectives:
  - Step 75
---

# Step 75

Now, your function can be used both to encrypt and decrypt a message. Clean up your code with better variable names.

Change each occurrence of `encrypted_text` into `final_message`.

## Starter Code

```html
text = 'Hello Zaira'
custom_key = 'python'
--fcc-editable-region--
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
decryption = vigenere(encryption, custom_key, -1)
print(decryption)
```

## Hints

1. You should change each occurrence of `encrypted_text` into `final_message`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554e343caea913ffba7bec6*
