---
id: lesson-002-031
title: Step 49
chapterId: chapter-02
order: 31
duration: 5
objectives:
  - Step 49
---

# Step 49

A function is essentially a reusable block of code. You have already met some built-in functions, like `print()`, `find()` and `len()`. But you can also define custom functions like this:

```py
def function_name():
    <code>
```

A function declaration starts with the `def` keyword followed by the function name — a valid variable name — and a pair of parentheses. The declaration ends with a colon.

Right after your `shift` variable, declare a function called `caesar` and indent all the following lines to give your new function a body.

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
print('plain text:', text)
print('encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should use the `def` keyword to declare a new function.
2. You should write `caesar` as the function name after the `def` keyword. Remember to add a space after `def`.
3. You should add a pair of parentheses after the function name. Don't forget the final colon.
4. You should indent all the lines after `shift = 3` so that they become your new function body.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553a572f7a65718f1e42e18*
