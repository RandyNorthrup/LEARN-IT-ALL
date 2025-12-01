---
id: lesson-002-096
title: Step 51
chapterId: chapter-02
order: 96
duration: 5
objectives:
  - Step 51
---

# Step 51

Now, fix the error by removing the line that tries to print the `alphabet` variable outside of the `caesar` function.

## Starter Code

```html
text = 'Hello Zaira'
shift = 3

def caesar():
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

--fcc-editable-region--
print(alphabet)
--fcc-editable-region--
```

## Hints

1. You should remove the `print(alphabet)` line.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 666064e915eba7aa1de03f6b*
