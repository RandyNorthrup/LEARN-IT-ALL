---
id: lesson-002-078
title: Step 46
chapterId: chapter-02
order: 78
duration: 5
objectives:
  - Step 46
---

# Step 46

If you wish to incorporate additional characters into the `alphabet` string, such as digits or special characters, you'll find it's necessary to manually modify the right operand of the modulo operation.

Replace `26` with `len(alphabet)` to avoid this issue.

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
        new_index = (index + shift) % 26
        encrypted_text += alphabet[new_index]
    print('char:', char, 'encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should modify the `new_index` value replacing `26` with `len(alphabet)`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 655619327c7b364166f8dd6f*
