---
id: lesson-019-105
title: Step 60
chapterId: chapter-19
order: 105
duration: 5
objectives:
  - Step 60
---

# Step 60

Below the `return` statement, log the string `"This works!"` to the console.

After doing that, you will see that the string `"This works!"` does not display in the console, and the `console.log("This works!")` line is greyed out.

Copy the console log and paste it above the `return` statement. Now, the string `"This works!"` should appear in the console.

An important thing to know about the `return` keyword is that it does not just define a value to be returned from your function, it also stops the execution of your code inside a function or a block statement. This means any code after a `return` statement will not run.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow(name) {
  const test = "Testing";
  
  return test;

}

--fcc-editable-region--
const call = padRow("CamperChan");
console.log(call);


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

1. Your `padRow` function should return the `test` variable.
2. Your first `console.log` should come after your `return` keyword.
3. Your second `console.log` should come before your `return` keyword.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c77d50636722e5b6be17*
