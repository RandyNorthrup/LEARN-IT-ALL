---
id: lesson-019-117
title: Step 56
chapterId: chapter-19
order: 117
duration: 5
objectives:
  - Step 56
---

# Step 56

With that quick review complete, you should remove your `addTwoNumbers` function, `sum` variable, and log statement.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

function padRow(name) {
  return name;
}
--fcc-editable-region--
function addTwoNumbers(num1, num2) {
  return num1 + num2;
}

const sum = addTwoNumbers(5, 10);
console.log(sum)

--fcc-editable-region--

const call = padRow();
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

1. You should not have a `addTwoNumbers` function in your code.
2. You should not have a `sum` variable in your code.
3. You should not log the `sum` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 66643c9a9e0ad1c787f5fe2b*
