---
id: lesson-002-044
title: Step 61
chapterId: chapter-02
order: 44
duration: 5
objectives:
  - Step 61
---

# Step 61

When coding, readability is key. Comments serve as effective notes, explaining the logic behind your code. They prove valuable when returning to a project after some time and also aid your colleagues in understanding the code.

In Python, you can write a comment using a `#`. Anything that comes after the `#` won't be executed.

Before your `if` statement, add a comment saying `Append space to the message`.

## Starter Code

```html
text = 'Hello Zaira'
custom_key = 'python'

def vigenere(message, key):
    key_index = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    encrypted_text = ''

    for char in message.lower():
--fcc-editable-region--
        
        if char == ' ':
            encrypted_text += char
--fcc-editable-region--            
        else:
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)
```

## Hints

1. You should add a comment saying `Append space to the message`. Don't forget the `#` character at the beginning.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65549f90cf78131c96ebcf28*
