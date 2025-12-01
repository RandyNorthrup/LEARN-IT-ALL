---
id: lesson-002-085
title: Step 38
chapterId: chapter-02
order: 85
duration: 5
objectives:
  - Step 38
---

# Step 38

Instead of assigning `alphabet[new_index]` to `encrypted_text`, assign the current value of `encrypted_text` plus `alphabet[new_index]` to this variable.

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
    encrypted_text = alphabet[new_index]
    print('char:', char, 'encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should assign `encrypted_text + alphabet[new_index]` to your `encrypted_text` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6568c86dc9193000d11ca5e0*
