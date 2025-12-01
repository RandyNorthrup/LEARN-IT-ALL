---
id: lesson-002-028
title: Step 42
chapterId: chapter-02
order: 28
duration: 5
objectives:
  - Step 42
---

# Step 42

Now, instead of printing `'space!'`, use the addition assignment operator to add the space (currently stored in `char`) to the current value of `encrypted_text`.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
encrypted_text = ''

for char in text.lower():
    if char == ' ':
        print('space!')
    index = alphabet.find(char)
    new_index = index + shift
    encrypted_text += alphabet[new_index]
    print('char:', char, 'encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should not have `print('space!')` in your code.
2. You should use the `+=` operator to add `char` to the current value of `encrypted_text` inside your new `if` statement.
3. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553980e0527fa115c705646*
