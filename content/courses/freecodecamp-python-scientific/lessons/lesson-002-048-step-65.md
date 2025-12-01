---
id: lesson-002-048
title: Step 65
chapterId: chapter-02
order: 48
duration: 5
objectives:
  - Step 65
---

# Step 65

The `.index()` method is identical to the `.find()` method but it throws a `ValueError` exception if it is unable to find the substring.

A `ValueError` is a built-in exception that is raised when an argument with the right type but inappropriate value is passed to a function.

After incrementing `key_index`, declare a variable named `offset`. Find the index that `key_char` has in `alphabet` and assign it to `offset`. Use the `.index()` to find the index.

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
--fcc-editable-region--
        else:
            # Find the right key character to encode
            key_char = key[key_index % len(key)]
            key_index += 1
            
--fcc-editable-region--            
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)
```

## Hints

1. You should declare a variable called `offset`.
2. Your `offset` variable should store the value of `alphabet.index(key_char)`.
3. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554a88d5af937226f4a9121*
