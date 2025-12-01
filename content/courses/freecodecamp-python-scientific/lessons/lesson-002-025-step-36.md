---
id: lesson-002-025
title: Step 36
chapterId: chapter-02
order: 25
duration: 5
objectives:
  - Step 36
---

# Step 36

At the moment, the encrypted character is updated in every iteration. It would be better to store the encrypted string in a new variable. Before your `for` loop, declare a variable called `encrypted_text` and assign an empty string (`''`) to this variable.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

for char in text.lower():
    index = alphabet.find(char)
    new_index = index + shift
    new_char = alphabet[new_index]
    print('char:', char, 'new char:', new_char)
--fcc-editable-region--
```

## Hints

1. You should declare a variable called `encrypted_text` before your `for` loop.
2. You should assign an empty string to your `encrypted_text` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 655251308f31958d06cdf267*
