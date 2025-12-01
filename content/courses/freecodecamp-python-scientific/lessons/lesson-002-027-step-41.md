---
id: lesson-002-027
title: Step 41
chapterId: chapter-02
order: 27
duration: 5
objectives:
  - Step 41
---

# Step 41

Currently, spaces get encrypted as `'c'`. To maintain the original spacing in the plain message, you'll require a conditional `if` statement. This is composed of the `if` keyword, a condition, and a colon `:`.

```py
if x != 0:
    print(x)
```

In the example above, the condition of the `if` statement is `x != 0`. The code `print(x)`, inside the `if` statement body, runs only when the condition evaluates to `True` (in this example, meaning that `x` is different from zero).

At the top of your for loop, replace `print(char == ' ')` with an `if` statement.  The condition of this `if` statement should evaluate to `True` if `char` is an empty space and `False` otherwise. Inside the `if` body, print the string `'space!'`. Remember to indent this line.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
encrypted_text = ''

for char in text.lower():
    print(char == ' ')
    index = alphabet.find(char)
    new_index = index + shift
    encrypted_text += alphabet[new_index]
    print('char:', char, 'encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should not have `print(char == ' ')` in your code.
2. You should replace `print(char == ' ')` with an `if` statement that triggers when `char == ' '`. Do not use parentheses to enclose the `if` condition and remember to include the final colon.
3. You should print the string `'space!'` inside your new `if` statement.
4. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 655261b2e1f2c197093f3993*
