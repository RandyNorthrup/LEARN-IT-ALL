---
id: lesson-002-024
title: Step 28
chapterId: chapter-02
order: 24
duration: 5
objectives:
  - Step 28
---

# Step 28

`find` is again returning `-1` for uppercase letters, and for the space character, too. You are going to take care of the space later on.

For now, instead of iterating over `text`, change the `for` loop to iterate over `text.lower()`.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

for char in text:
    index = alphabet.find(char)
    print(char, index)
--fcc-editable-region--
```

## Hints

1. You should modify your `for` loop to iterate over `text.lower()` instead of `text`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65524d2a1a253b8bb5197ae2*
