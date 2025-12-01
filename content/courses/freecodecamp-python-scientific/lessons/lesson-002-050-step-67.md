---
id: lesson-002-050
title: Step 67
chapterId: chapter-02
order: 50
duration: 5
objectives:
  - Step 67
---

# Step 67

At the moment, your function prints some strings, but these values cannot be used by other parts of code to perform any actions.

For that purpose, you need to use a `return` statement:

```python
def foo():
    return 'spam'
```

You need to write `return` followed by a space and the value that the function should return. Once the `return` statement is found, that value is returned and the execution of the function stops, proceeding to the next line of code after the function call. In the example above, the `foo` function returns the string `'spam'`.

Remove the two `print()` calls from your function and return `encrypted_text`.

## Starter Code

```html
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
--fcc-editable-region--
            # Define the offset and the encrypted letter
            offset = alphabet.index(key_char)
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should remove the two `print()` calls from your function.
2. Your function should return `encrypted_text`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554ad2463b8892748f8efdd*
