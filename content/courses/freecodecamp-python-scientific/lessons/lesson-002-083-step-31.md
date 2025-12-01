---
id: lesson-002-083
title: Step 31
chapterId: chapter-02
order: 83
duration: 5
objectives:
  - Step 31
---

# Step 31

When you try to change the individual characters of a string as you did in the previous step, you get a `TypeError`, which occurs when an object of inappropriate type is used in your code.

As you can see from the error message, strings do not support item assignment, because they are immutable. However, a variable can be reassigned another string:

```py
message = 'Hello World'
message = 'Hello there!'
```

Delete the `text[0]` line and reassign `text` the string `'Albatross'`.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
text[0] = 'C'
--fcc-editable-region--
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

for char in text.lower():
    index = alphabet.find(char)
    print(char, index)
    new_index = index + shift
```

## Hints

1. You should not have `text[0] = 'C'` in your code.
2. You should reassign `text` the string `'Albatross'`. Do not modify `text = 'Hello World'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65688b5a1655a7a6caede847*
