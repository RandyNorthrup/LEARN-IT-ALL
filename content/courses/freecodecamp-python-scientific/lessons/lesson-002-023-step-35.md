---
id: lesson-002-023
title: Step 35
chapterId: chapter-02
order: 23
duration: 5
objectives:
  - Step 35
---

# Step 35

Clean the output a bit. Delete `print(char, index)`, and turn the last `print()` call into `print('char:', char, 'new char:', new_char)`.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

for char in text.lower():
    index = alphabet.find(char)
    print(char, index)
    new_index = index + shift
    new_char = alphabet[new_index]
    print(new_char)
--fcc-editable-region--
```

## Hints

1. You should not have `print(char, index)` in your code.
2. You should change `print(new_char)` into `print('char:', char, 'new char:', new_char)`.
3. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65524b790ba8558a2f1c9fe5*
