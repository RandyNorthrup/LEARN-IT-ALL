---
id: lesson-002-017
title: Step 23
chapterId: chapter-02
order: 17
duration: 5
objectives:
  - Step 23
---

# Step 23

A loop allows you to systematically go through a sequence of elements and execute actions on each one.

In this case, you'll employ a `for` loop. Here's how you can iterate over `text`:

```py
for i in text:
```

`for` is the keyword denoting the loop type. `i` is a variable that sequentially takes the value of the elements in `text`. The statement ends with a colon, `:`.

Below the line where you declared `alphabet`, write a `for` loop to iterate over `text`. Use `i` as the loop variable.

Doing so, there is an error in the terminal. You will learn about it in the next step.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

--fcc-editable-region--
```

## Hints

1. You should use the `for` keyword to create a loop. Make sure to place the `for` keyword at the beginning of the line and leave a white space after the keyword.
2. You should write the `i` variable after the `for` keyword.
3. You should write the `in` keyword after `for i `. Make sure to leave a space around the `in` keyword.
4. You should write `text` after `for i in `. Don't forget to add the final `:`.
5. Your `for` loop should be placed below the line of code `alphabet = 'abcdefghijklmnopqrstuvwxyz'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65521203d7165c7b84b22ad4*
