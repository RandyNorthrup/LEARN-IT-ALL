---
id: lesson-019-024
title: Step 34
chapterId: chapter-19
order: 24
duration: 5
objectives:
  - Step 34
---

# Step 34

Your loop now needs a proper iterator. The <dfn>iterator</dfn> is a variable you can declare specifically in your `for` loop to control how the loop iterates or goes through your logic.

It is a common convention to use `i` as your iterator variable in a loop. A `for` loop allows you to declare this in the parentheses `()`. For example, here is a `for` loop that declares an `index` variable and assigns it the value `100`.

```js
for (let index = 100; "second"; "third") {

}
```

Replace the string `"iterator"` with a `let` declaration for the variable `i`. Assign it the value `0` to start. This will give the `i` variable the value `0` the **first time** your loop runs.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
for ("iterator"; "condition"; "iteration") {

}
--fcc-editable-region--
```

## Hints

1. You should use `let` to declare an `i` variable.
2. You should assign `0` to your `i` variable.
3. Your `for` loop should start an `i` iterator at `0`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f18f059fe0fda192ce394*
