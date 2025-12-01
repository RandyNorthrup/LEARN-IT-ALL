---
id: lesson-002-018
title: Step 26
chapterId: chapter-02
order: 18
duration: 5
objectives:
  - Step 26
---

# Step 26

Inside the `for` loop, before printing the current character, declare a variable called `index` and assign the value returned by `alphabet.find(char)` to this variable.

## Starter Code

```html
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
--fcc-editable-region--
for char in text:
    print(char)
--fcc-editable-region--
```

## Hints

1. You should declare a new variable named `index` at the beginning of your `for` loop.
2. You should assign `alphabet.find(char)` to your new `index` variable.
3. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65521fc818947e800bffe48a*
