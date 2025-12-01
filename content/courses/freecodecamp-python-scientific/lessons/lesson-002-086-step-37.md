---
id: lesson-002-086
title: Step 37
chapterId: chapter-02
order: 86
duration: 5
objectives:
  - Step 37
---

# Step 37

Now, replace `new_char` with `encrypted_text`. Also, modify the `print()` call into `print('char:', char, 'encrypted text:', encrypted_text)` to reflect this change.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
encrypted_text = ''

for char in text.lower():
    index = alphabet.find(char)    
    new_index = index + shift
    new_char = alphabet[new_index]
    print('char:', char, 'new char:', new_char)
--fcc-editable-region--
```

## Hints

1. You should replace `new_char` with `encrypted_text` inside your `for` loop.
2. You should turn your `print()` call into `print('char:', char, 'encrypted text:', encrypted_text)` inside your `for` loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6568cc9301a0c41058ed95c5*
