---
id: lesson-019-031
title: Step 41
chapterId: chapter-19
order: 31
duration: 5
objectives:
  - Step 41
---

# Step 41

To manipulate the `result` string, you will use a different type of loop. Specifically, a `for...of` loop, which iterates over each item in an iterable object and temporarily assigns it to a variable.

The syntax for a `for...of` loop looks like:

```js
for (const value of iterable) {

}
```

Note that you can use `const` because the variable only exists for a single iteration, not during the entire loop.

Create a `for...of` loop to iterate through your `rows` array, assigning each value to a `row` variable.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

for (let i = 0; i < count; i = i + 1) {
  rows.push(i);
}

let result = ""

--fcc-editable-region--

--fcc-editable-region--

console.log(result);
```

## Hints

1. You should use another `for` keyword.
2. You should declare a `row` variable.
3. You should use `const` to declare your `row` variable.
4. Your `for...of` loop should declare your `row` variable.
5. Your `row` variable should be extracted from `rows` using the `of` keyword.
6. Your `for...of` loop body should be empty.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f207334fabaeac3269c38*
