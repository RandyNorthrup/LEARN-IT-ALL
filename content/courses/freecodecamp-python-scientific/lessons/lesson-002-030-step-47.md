---
id: lesson-002-030
title: Step 47
chapterId: chapter-02
order: 30
duration: 5
objectives:
  - Step 47
---

# Step 47

Next, modify your `print()` call to print `'encrypted text:', encrypted_text` and put it outside the `for` loop, so that the encrypted string is printed one time.

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
    print('char:', char, 'encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should print `'encrypted text:', encrypted_text` after your for loop.
2. You should not have `print('char:', char, 'encrypted text:', encrypted_text)` in your code.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553a44b1801991847d8cc69*
