---
id: lesson-002-012
title: Step 13
chapterId: chapter-02
order: 12
duration: 5
objectives:
  - Step 13
---

# Step 13

You are going to use the `.find()` method to find the position in the alphabet of each letter in your message. A method is similar to a function, but it belongs to an object.

```py
sentence = 'My brain hurts!'
sentence.find('r')
```

Above, the `.find()` method is *called on* `sentence` (the string to search in), and `'r'` (the character to locate) is passed as the argument. The `sentence.find('r')` call will return `4`, which is the index of the first occurrence of `'r'` in `sentence`.

At the end of your code, call `.find()` on `alphabet` and pass `'z'` as the argument to the method.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
--fcc-editable-region--
```

## Hints

1. You should call the `.find()` method.
2. You should call the `.find()` method on the `alphabet` variable.
3. You should call the `.find()` method on the `alphabet` variable and pass `'z'` to the method. Pay attention to place the method call at the beginning of the line.
4. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6552008c0d9d9075cbec9772*
