---
id: lesson-002-059
title: Step 76
chapterId: chapter-02
order: 59
duration: 5
objectives:
  - Step 76
---

# Step 76

Update your comments too. Your second comment should say `encode/decode` in place of `encode`. Your third comment should say `encrypted/decrypted` in place of `encrypted`.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello Zaira'
custom_key = 'python'

def vigenere(message, key, direction):
    key_index = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    final_message = ''

    for char in message.lower():
    
        # Append space to the message
        if char == ' ':
            final_message += char
        else:        
            # Find the right key character to encode
            key_char = key[key_index % len(key)]
            key_index += 1

            # Define the offset and the encrypted letter
            offset = alphabet.index(key_char)
            index = alphabet.find(char)
            new_index = (index + offset*direction) % len(alphabet)
            final_message += alphabet[new_index]
    
    return final_message
    
encryption = vigenere(text, custom_key, 1)
print(encryption)
decryption = vigenere(encryption, custom_key, -1)
print(decryption)
--fcc-editable-region--
```

## Hints

1. Your second comment should be `Find the right key character to encode/decode`.
2. Your third comment should be `Define the offset and the encrypted/decrypted letter`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 655516e410b8e30fb4fb64e8*
