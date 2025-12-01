---
id: lesson-002-006
title: Step 5
chapterId: chapter-02
order: 6
duration: 5
objectives:
  - Step 5
---

# Step 5

Each string character can be referenced by a numerical index. The index count starts at zero. So the first character of a string has an index of `0`. For example, in the string `'Hello World'`, `'H'` is at index `0`, `'e'` is at index `1`, and so on. 

Each character of a string can be accessed by using bracket notation. You need to write the variable name followed by square brackets and add the index of the character between the brackets:

```py
text = 'Hello World'
r = text[8]
```

Now, instead of printing `text`, print just the character at index `6`.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
print(text)
--fcc-editable-region--
```

## Hints

1. You should still call the `print()` function.
2. You should pass `text[6]` to the `print()` function by including it between the parentheses. Pay attention to place the function call at the beginning of the line.
3. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6551f3bfed58796ebb1268dc*
