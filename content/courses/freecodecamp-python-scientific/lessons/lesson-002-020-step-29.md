---
id: lesson-002-020
title: Step 29
chapterId: chapter-02
order: 20
duration: 5
objectives:
  - Step 29
---

# Step 29

At the end of your loop body, declare a variable called `new_index` and assign the value of `index + shift` to this variable.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

for char in text.lower():
    index = alphabet.find(char)
    print(char, index)
--fcc-editable-region--
```

## Hints

1. You should declare a variable called `new_index` inside your `for` loop.
2. You should assign `index + shift` to your new variable at the end of your `for` loop body.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65522255d5b9cd80f335c6f2*
