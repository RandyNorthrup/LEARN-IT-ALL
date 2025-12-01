---
id: lesson-019-021
title: Step 31
chapterId: chapter-19
order: 21
duration: 5
objectives:
  - Step 31
---

# Step 31

Declaring a variable with the `let` keyword allows it to be reassigned. This means you could change `character` later to be a completely different value.

For this project, you will not want to change these variable values. So instead, you should use `const` to declare them. `const` variables are special.

First, a `const` variable cannot be reassigned like a `let` variable. This code would throw an error:

```js
const firstName = "Naomi";
firstName = "Jessica";
```

A `const` variable also cannot be uninitialized. This code would throw an error:

```js
const firstName;
```

Replace your `let` keywords with `const`.

## Starter Code

```html
--fcc-editable-region--
let character = "Hello";
let count = 8;
let rows = [];
--fcc-editable-region--
```

## Hints

1. You should use `const` to declare your `character` variable.
2. You should use `const` to declare your `count` variable.
3. You should use `const` to declare your `rows` variable.
4. You should not use `let` in your code.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f165270622fd4ec0da3f7*
