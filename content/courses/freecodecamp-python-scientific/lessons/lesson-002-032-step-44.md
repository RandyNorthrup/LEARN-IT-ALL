---
id: lesson-002-032
title: Step 44
chapterId: chapter-02
order: 32
duration: 5
objectives:
  - Step 44
---

# Step 44

Try to assign the string `'Hello Zaira'` to your `text` variable and see what happens in the terminal.

You'll see a `string index out of range` exception. Don't worry, you'll figure out how to fix it soon!

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
encrypted_text = ''

for char in text.lower():
    if char == ' ':
        encrypted_text += char
    else:
        index = alphabet.find(char)
        new_index = index + shift
        encrypted_text += alphabet[new_index]
    print('char:', char, 'encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should have a `text` variable.
2. You should assign the string `'Hello Zaira'` to your `text` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553a755879b131a445e664c*
