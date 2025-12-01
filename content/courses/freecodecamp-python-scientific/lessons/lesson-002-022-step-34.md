---
id: lesson-002-022
title: Step 34
chapterId: chapter-02
order: 22
duration: 5
objectives:
  - Step 34
---

# Step 34

Next, print `new_char` and see the output.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

for char in text.lower():
    index = alphabet.find(char)
    print(char, index)
    new_index = index + shift
    new_char = alphabet[new_index]
--fcc-editable-region--
```

## Hints

1. You should print your `new_char` variable.
2. You should print your `new_char` variable at the end of your loop body.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65524b3aa6a1938a069a91ab*
