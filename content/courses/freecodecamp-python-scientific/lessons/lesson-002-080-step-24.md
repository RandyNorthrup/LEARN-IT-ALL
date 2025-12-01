---
id: lesson-002-080
title: Step 24
chapterId: chapter-02
order: 80
duration: 5
objectives:
  - Step 24
---

# Step 24

The code to execute at each iteration — placed after the `:` — constitutes the body of the loop. This code must be indented. In Python, it is recommended to use 4 spaces per indentation level. This indented level is a code block.

```py
for i in text:
    print(i)
```

Python relies on indentation to indicate blocks of code. A colon at the end of a line is a signal that a new indented block of code will follow.

So, when no indented block is found after the final colon, the code execution stops and an `IndentationError` is thrown. This code will not show the output and instead raise an `IndentationError`:

```py
for i in text:
print(i)
```

Give your `for` loop a body by adding a call to `print(i)`. Remember to indent the loop body.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

for i in text:

--fcc-editable-region--
```

## Hints

1. You should add `print(i)` to your `for` loop body. Pay attention to the indentation.
2. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65687d2f8c7ee27b0446cef3*
