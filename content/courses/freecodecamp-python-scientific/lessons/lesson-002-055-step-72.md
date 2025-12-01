---
id: lesson-002-055
title: Step 72
chapterId: chapter-02
order: 55
duration: 5
objectives:
  - Step 72
---

# Step 72

Now you can uncomment the last two lines and modify your function call passing `1` as the third argument.

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
#encryption = vigenere(text, custom_key)
#print(encryption)
--fcc-editable-region--
```

## Hints

1. You should restore the last two lines of your code and pass `1` as the third argument to your function call.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554dfce1683be3c0c9609a6*
