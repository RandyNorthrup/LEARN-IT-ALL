---
id: lesson-002-082
title: Step 30
chapterId: chapter-02
order: 82
duration: 5
objectives:
  - Step 30
---

# Step 30

Strings are immutable, which means they cannot be changed once created. For example, you might think that the following code changes the value of `my_string` into the string `'train'`, but this is not valid:

```py
my_string = 'brain'
my_string[0] = 't'
```

Confirm that by using the bracket notation to access the first letter in `text` and try to change it into a character of your choice. You will see the ouput disappear and an error appear.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'

--fcc-editable-region--
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'

for char in text.lower():
    index = alphabet.find(char)
    print(char, index)
    new_index = index + shift
```

## Hints

1. You should still have `text = 'Hello World'` in your code.
2. You should access the first letter in `text` with `text[0]`.
3. You should use the `=` operator to assign a character of your choice to `text[0]`. Don't forget to enclose the character in either single or double quotes.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 65688a50e6c998a21d8e41d3*
