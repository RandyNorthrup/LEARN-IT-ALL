---
id: lesson-002-029
title: Step 43
chapterId: chapter-02
order: 29
duration: 5
objectives:
  - Step 43
---

# Step 43

A conditional statement can also have an `else` clause. This clause can be added to the end of an `if` statement to execute alternative code if the condition of the `if` statement is false:

```py
if x != 0:
    print(x)
else:
    print('x = 0')
```

As you can see in your output, when the loop iterations reach the space, a space is added to the encrypted string. Then the code outside the `if` block executes and a `c` is added to the encrypted string.

To fix it, add an `else` clause after `encrypted_text += char` and indent all the subsequent lines of code except the `print()` call.

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
    index = alphabet.find(char)
    new_index = index + shift
    encrypted_text += alphabet[new_index]
    print('char:', char, 'encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should create an `else` clause. Remember to include the final colon.
2. You should indent the lines of code after your `else` clause except the `print()` call.
3. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6553995f412dd8122ed38e4a*
