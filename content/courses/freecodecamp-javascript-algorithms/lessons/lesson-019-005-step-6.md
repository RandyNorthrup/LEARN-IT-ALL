---
id: lesson-019-005
title: Step 6
chapterId: chapter-19
order: 5
duration: 5
objectives:
  - Step 6
---

# Step 6

When a variable is declared with the `let` keyword, you can <dfn>reassign</dfn> (or change the value of) that variable later on. In this example, the value of `programmer` is changed from `"Naomi"` to `"CamperChan"`.

```js
let programmer = "Naomi";
programmer = "CamperChan";
```

Note that when reassigning a variable, you do **not** use the `let` keyword again.

After your `console.log`, assign the value `"World"` to your `character` variable.

## Starter Code

```html
--fcc-editable-region--
let character = 'Hello';
console.log(character);

--fcc-editable-region--
```

## Hints

1. You should use `character` twice in your code.
2. You should use the assignment operator to reassign `character`.
3. You should use the string `"World"` in your code.
4. Your `character` variable should have the value `"World"`.
5. Your reassignment should not use `let`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660ef31a5be625914a0102cd*
