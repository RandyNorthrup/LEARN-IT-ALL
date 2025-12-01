---
id: lesson-019-035
title: Step 45
chapterId: chapter-19
order: 35
duration: 5
objectives:
  - Step 45
---

# Step 45

Now you have a series of `#` characters, but the pyramid shape is still missing. Fortunately, the `i` variable represents the current "row" number in your loop, enabling you to use it for crafting a pyramid-like structure.

To achieve this, you will use the `.repeat()` method available to strings. This method accepts a number as an argument, specifying the number of times to repeat the target string. For example, using `.repeat()` to generate the string `"Code! Code! Code!"`:

```js
const activity = "Code! ";
activity.repeat(3);
```

Use the `.repeat()` method on your `character`, and give it `i` for the number.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
for (let i = 0; i < count; i = i + 1) {
  rows.push(character);
}
--fcc-editable-region--

let result = ""

for (const row of rows) {
  result = result + row + "\n";
}

console.log(result);
```

## Hints

1. You should use the `.repeat()` method.
2. You should use the `.repeat()` method on your `character` variable.
3. You should pass `i` to your `.repeat()` method.
4. You should use the `.repeat()` method in the `.push()` method

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f280dda5040f707c76b4a*
