---
id: lesson-002-091
title: Step 22
chapterId: chapter-02
order: 91
duration: 5
objectives:
  - Step 22
---

# Step 22

Repeating the process of locating the letter inside the alphabet and determine the shifted letter for each character in `text` can be tedious. Thankfully, you can simplify it using a loop.

For now, remove all the lines of code below the declaration of the `alphabet` variable.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
index = alphabet.find(text[0].lower())
print(index)
shifted = alphabet[index + shift]
print(shifted)
--fcc-editable-region--
```

## Hints

1. You should still have `text = 'Hello World'` in your code.
2. You should still have `shift = 3` in your code.
3. You should still have `alphabet = 'abcdefghijklmnopqrstuvwxyz'` in your code.
4. You should delete `index` variable and its value.
5. You should not have `print(index)` in your code.
6. You should delete the `shifted` variable and its value.
7. You should not have `print(shifted)` in your code.
8. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 659db3e3670d3e712be82593*
