---
id: lesson-002-014
title: Step 17
chapterId: chapter-02
order: 14
duration: 5
objectives:
  - Step 17
---

# Step 17

`.find()` returns the index of the matching character inside the string. If the character is not found, it returns `-1`. As you can see, the first character in `text`, uppercase `'H'`, is not found, since `alphabet` contains only lowercase letters.

You can transform a string into its lowercase equivalent with the `.lower()` method. Add another `print()` call to print `text.lower()` and see the output.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
index = alphabet.find(text[0])
print(index)
--fcc-editable-region--
```

## Hints

1. You should still have `print(index)` in your code. Pay attention to have the function call at the beginning of the line.
2. You should print `text.lower()`. Pay attention to place the function call at the beginning of the line.
3. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 655209a4a27dd37873c4cac3*
