---
id: lesson-002-036
title: Step 54
chapterId: chapter-02
order: 36
duration: 5
objectives:
  - Step 54
---

# Step 54

Inside your function body, rename the `text` and `shift` variables to `message` and `offset`, respectively.

## Starter Code

```html
text = 'Hello Zaira'
shift = 3
--fcc-editable-region--
def caesar(message, offset):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    encrypted_text = ''

    for char in text.lower():
        if char == ' ':
            encrypted_text += char
        else:
            index = alphabet.find(char)
            new_index = (index + shift) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', text)
    print('encrypted text:', encrypted_text)

caesar()
--fcc-editable-region--
```

## Hints

1. You should rename all occurrences of `text` to `message`.
2. You should rename `shift` to `offset`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553f3fc92741c2bf8ded140*
