---
id: lesson-002-062
title: Step 81
chapterId: chapter-02
order: 62
duration: 5
objectives:
  - Step 81
---

# Step 81

The `not` operator is used to negate an expression. When placed before a truthy value — a value that evaluates to `True` — it returns `False` and vice versa.

Add the `not` operator at the beginning of the `if` condition to check if the character is not alphabetic.

## Starter Code

```html
text = 'Hello Zaira!'
custom_key = 'python'

def vigenere(message, key, direction=1):
    key_index = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    final_message = ''

    for char in message.lower():
--fcc-editable-region--
        # Append space to the message
        if char.isalpha():
            final_message += char
--fcc-editable-region--
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
    
encryption = vigenere(text, custom_key)
print(encryption)
decryption = vigenere(encryption, custom_key, -1)
print(decryption)
```

## Hints

1. You should use the `not` operator in the condition of your `if` statement.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 655520c20cb1e6177b0641d6*
