---
id: lesson-002-021
title: Step 33
chapterId: chapter-02
order: 21
duration: 5
objectives:
  - Step 33
---

# Step 33

Now you need to create a `new_char` variable at the end of your loop body. Set its value to `alphabet[new_index]`.

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
--fcc-editable-region--
```

## Hints

1. You should create a `new_char` variable inside your `for` loop.
2. You should set your `new_char` variable to `alphabet[new_index]` at the end of your loop body.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6552487e689f6e895f658717*
