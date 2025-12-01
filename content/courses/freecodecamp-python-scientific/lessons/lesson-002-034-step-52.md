---
id: lesson-002-034
title: Step 52
chapterId: chapter-02
order: 34
duration: 5
objectives:
  - Step 52
---

# Step 52

To execute, a function needs to be called (or invoked) by appending a pair of parentheses after its name, like this:

```py
function_name()
```

At the end of your code, call your `caesar` function. Pay attention to the indentation.

## Starter Code

```html
text = 'Hello Zaira'
shift = 3

def caesar():
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    encrypted_text = ''

    for char in text.lower():
        if char == ' ':
            encrypted_text += char
        else:
            index = alphabet.find(char)
            new_index = (index + shift) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', text)
    print('encrypted text:', encrypted_text)

--fcc-editable-region--

--fcc-editable-region--
```

## Hints

1. You should call your `caesar` function. Make sure to write the function call at the beginning of the line.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553ed69ece88d29594748aa*
