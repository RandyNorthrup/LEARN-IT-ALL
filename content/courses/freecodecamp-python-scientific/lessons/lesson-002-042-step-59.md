---
id: lesson-002-042
title: Step 59
chapterId: chapter-02
order: 42
duration: 5
objectives:
  - Step 59
---

# Step 59

Delete your `shift` variable. Then, declare a new variable called `custom_key` and assign the value of the string `'python'` to this variable.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello Zaira'
shift = 3
--fcc-editable-region--
def vigenere(message, key):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    encrypted_text = ''

    for char in message.lower():
        if char == ' ':
            encrypted_text += char
        else:
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)
```

## Hints

1. You should delete the `shift` variable and its value.
2. You should declare a variable called `custom_key`.
3. You should assign the string `'python'` to your `custom_key` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6554930320d70414e7b6acc6*
