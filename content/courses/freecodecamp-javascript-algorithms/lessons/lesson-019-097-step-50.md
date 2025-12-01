---
id: lesson-019-097
title: Step 50
chapterId: chapter-19
order: 97
duration: 5
objectives:
  - Step 50
---

# Step 50

Now add a log statement to print the value of your `call` variable.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
function padRow() {

}
const call = padRow();

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

1. You should add a `console.log` call.
2. You should log your `call` variable. Don't forget the semicolon.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610c1d97b1671140f95cfbb*
