---
id: lesson-002-016
title: Step 21
chapterId: chapter-02
order: 16
duration: 5
objectives:
  - Step 21
---

# Step 21

As you can see from the output, `'h'` is at index `7` in the `alphabet` string. Now you need to find the letter at index `7` plus the value of `shift`. For that, you can use the addition operator, `+`, in the same way you would use it for a mathematical addition.

Modify your `shifted` variable so that it stores the value of `alphabet` at index `index + shift`.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
index = alphabet.find(text[0].lower())
print(index)
shifted = alphabet[index]
print(shifted)
--fcc-editable-region--
```

## Hints

1. You should assign `alphabet[index + shift]` to your `shifted` variable.
2. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65520f8282faf57a0db4f7fe*
