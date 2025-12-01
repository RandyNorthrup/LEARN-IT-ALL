---
id: lesson-002-011
title: Step 12
chapterId: chapter-02
order: 11
duration: 5
objectives:
  - Step 12
---

# Step 12

Key aspects of variable naming in Python are:

- Some words are reserved keywords (e.g. `for`, `while`, `True`). They have a special meaning in Python, so you cannot use them for variable names.
- Variable names cannot start with a number, and they can only contain alpha-numeric characters or underscores.
- Variable names are case sensitive, i.e. `my_var` is different from `my_Var` and `MY_VAR`.
- Finally, it is a common convention to write variable names using `snake_case`, where each space is replaced by an underscore character and the words are written in lowercase letters.

Remove both calls to `print()` and declare another variable called `alphabet`. Assign the string `'abcdefghijklmnopqrstuvwxyz'` to this variable.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
print(type(text))
shift = 3
print(type(shift))
--fcc-editable-region--
```

## Hints

1. You should not have `print(type(text))` in your code.
2. You should not have `print(type(shift))` in your code.
3. You should declare a variable called `alphabet`. Pay attention to place the variable name at the beginning of the line.
4. You should assign the string `'abcdefghijklmnopqrstuvwxyz'` to your `alphabet` variable. Remember to use either single or double quotes to enclose the string.
5. Your code contains invalid syntax and/or invalid indentation.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 6551fe3b1df7c9740f13f270*
