---
id: lesson-002-026
title: Step 39
chapterId: chapter-02
order: 26
duration: 5
objectives:
  - Step 39
---

# Step 39

You can obtain the same effect of `a = a + b` by using the addition assignment operator:

```py
a += b
```

The addition assignment operator enables you to add a value to a variable and then assign the result to that variable.

Use the `+=` operator to add a value and assign it at the same time to `encrypted_text`.

## Starter Code

```html
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
encrypted_text = ''
--fcc-editable-region--
for char in text.lower():
    index = alphabet.find(char)
    new_index = index + shift
    encrypted_text = encrypted_text + alphabet[new_index]
    print('char:', char, 'encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should use the addition assignment operator to add `alphabet[new_index]` to the current value of `encrypted_text` inside your loop body.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65525e359ca28d938baa82c5*
