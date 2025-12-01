---
id: lesson-002-084
title: Step 32
chapterId: chapter-02
order: 84
duration: 5
objectives:
  - Step 32
---

# Step 32

As you can see, each character of the reassigned string gets printed inside the loop.

Go back to the original string by deleting the `text` reassignment.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
text = 'Albatross'
--fcc-editable-region--
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

for char in text.lower():
    index = alphabet.find(char)
    print(char, index)
    new_index = index + shift
```

## Hints

1. You should not have `text = 'Albatross'` in your code.
2. You should still have a `text` variable with the value `'Hello World'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6568b7a40c7ba0ccbc4b4425*
