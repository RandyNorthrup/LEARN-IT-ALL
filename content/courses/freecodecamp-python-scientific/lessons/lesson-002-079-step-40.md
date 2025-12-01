---
id: lesson-002-079
title: Step 40
chapterId: chapter-02
order: 79
duration: 5
objectives:
  - Step 40
---

# Step 40

Comparison operators allow you to compare two objects based on their values. You can use a comparison operator by placing it between the objects you want to compare.
They return a *Boolean* value — namely `True` or `False` — depending on the truthfulness of the expression.

Python has the following comparison operators:

<table>
  <thead>
    <tr>
      <th>Operator</th>
      <th>Meaning</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>==</td>
      <td>Equal</td>
    </tr>
    <tr>
      <td>!=</td>
      <td>Not equal</td>
    </tr>
    <tr>
      <td>&gt;</td>
      <td>Greater than</td>
    </tr>
    <tr>
      <td>&lt;</td>
      <td>Less than</td>
    </tr>
    <tr>
      <td>&gt;=</td>
      <td>Greater than or equal to</td>
    </tr>
    <tr>
      <td>&lt;=</td>
      <td>Less than or equal to</td>
    </tr>
  </tbody>
</table>

At the beginning of your loop body, print the result of comparing `char` with a space (`' '`). Use the equality operator `==` for that.

## Starter Code

```html
--fcc-editable-region--
text = 'Hello World'
shift = 3
alphabet = 'abcdefghijklmnopqrstuvwxyz'
encrypted_text = ''

for char in text.lower():
    index = alphabet.find(char)
    new_index = index + shift
    encrypted_text += alphabet[new_index]
    print('char:', char, 'encrypted text:', encrypted_text)
--fcc-editable-region--
```

## Hints

1. You should compare `char` with a space using the equality operator inside your `for` loop.
2. You should print the result of comparing `char` with a space inside your `for` loop.
3. You should print the result of comparing `char` with a space at the beginning of your loop.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/scientific-computing-with-python/)*
*Original Challenge ID: 655a2a7210094920069b117c*
