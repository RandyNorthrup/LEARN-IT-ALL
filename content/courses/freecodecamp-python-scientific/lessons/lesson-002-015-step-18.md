---
id: lesson-002-015
title: Step 18
chapterId: chapter-02
order: 15
duration: 5
objectives:
  - Step 18
---

# Step 18

Remove the last `print()` call. Then, instead of `text[0]`, pass `text[0].lower()` as the argument to your `.find()` call and see the output.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
index = alphabet.find(text[0])
print(index)
print(text.lower())
--fcc-editable-region--
```

## Hints

1. You should not have `print(text.lower())` in your code.
2. You should still print your `index` variable.
3. You should update your `alphabet.find(text[0])` call to use `text[0].lower()` as the argument. Pay attention to place the method call at the beginning of the line.
4. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65520e6f2b9678799977f24d*
