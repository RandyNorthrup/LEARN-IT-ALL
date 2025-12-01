---
id: lesson-019-037
title: Step 47
chapterId: chapter-19
order: 37
duration: 5
objectives:
  - Step 47
---

# Step 47

The logic for formatting this pyramid is likely going to get complicated, which means it's a great time to extract that code into a function.

A <dfn>function</dfn> is a block of code that can be reused throughout your application. Functions are declared with the following syntax:

```js
function name(parameter) {

}
```

The `function` keyword tells JavaScript that the `name` variable is going to be a function. `parameter` is a variable that represents a value that is passed into the function when it is used. A function may have as many, or as few, <dfn>parameters</dfn> as you'd like. Like a `for` loop, the space between the curly braces is the <dfn>function body</dfn>.

Declare a `padRow` function. Do not create any parameter variables yet. The function body should be empty. Remember that you need to use camel case for your naming convention.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--

--fcc-editable-region--


for (let i = 0; i < count; i = i + 1) {
  rows.push(character.repeat(i + 1))
}

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should use the `function` keyword.
2. You should declare a `padRow` function.
3. Your `padRow()` function should not have any parameters.
4. Your `padRow()` function should have an empty body.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f2b6fd54ac1fc142804dd*
