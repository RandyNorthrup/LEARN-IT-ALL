---
id: lesson-002-039
title: Step 48
chapterId: chapter-02
order: 39
duration: 5
objectives:
  - Step 48
---

# Step 48

Right before the `print` call, add another one and pass `'plain text:', text` as the arguments to `print()`. Use the same indentation.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello Zaira'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
encrypted_text = ''

for char in text.lower():
    if char == ' ':
        encrypted_text += char
    else:
        index = alphabet.find(char)
        new_index = (index + shift) % len(alphabet)
        encrypted_text += alphabet[new_index]
print('encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should print `'plain text:', text` after your for loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553f6b4ec51112d44d737c8*
