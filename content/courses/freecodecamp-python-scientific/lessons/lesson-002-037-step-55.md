---
id: lesson-002-037
title: Step 55
chapterId: chapter-02
order: 37
duration: 5
objectives:
  - Step 55
---

# Step 55

Currently, your code raises a `TypeError`, because the `caesar` function is defined with two parameters (`message` and `offset`), therefore it expects to be called with two *arguments*.

Calling `caesar()` without the required arguments stops the execution of the code.

Give `message` and `offset` values, by passing `text` and `shift` as arguments to the `caesar` function call.

## Starter Code

```html
text = 'Hello Zaira'
shift = 3

def caesar(message, offset):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    encrypted_text = ''

    for char in message.lower():
        if char == ' ':
            encrypted_text += char
        else:
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)
--fcc-editable-region--
caesar()
--fcc-editable-region--
```

## Hints

1. You should pass `text` and `shift` as the arguments to your function call by including them inside the parentheses. Don't forget to separate the arguments with a comma.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553f4f66099802c6ae94613*
