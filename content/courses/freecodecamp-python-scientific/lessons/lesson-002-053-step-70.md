---
id: lesson-002-053
title: Step 70
chapterId: chapter-02
order: 53
duration: 5
objectives:
  - Step 70
---

# Step 70

Encryption and decryption are opposite processes and your function can do both with a couple of tweaks.

Add a third parameter called `direction` to your function definition. Also, comment out the last two lines of code to avoid errors in the console.

## Starter Code

```html
--fcc-editable-region--
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
    
encryption = vigenere(text, custom_key)
print(encryption)
--fcc-editable-region--
```

## Hints

1. You should turn the last two lines in your code into comments. Put a `#` at the beginning of each line.
2. You should add `direction` as the third parameter of your function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554d25dc5ceaa354307a77e*
