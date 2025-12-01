---
id: lesson-002-019
title: Step 27
chapterId: chapter-02
order: 19
duration: 5
objectives:
  - Step 27
---

# Step 27

Currently, the `print()` function is taking a single argument `char`, but it can take multiple arguments, separated by a comma.

Add a second argument to `print(char)` so that it prints the character and its index inside the alphabet.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

for char in text:
    index = alphabet.find(char)
    print(char)
--fcc-editable-region--
```

## Hints

1. You should add `index` as the second argument to your existing `print(char)` call. Don't forget to separate the arguments with a comma.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 655220953ba90d80514d7ee2*
