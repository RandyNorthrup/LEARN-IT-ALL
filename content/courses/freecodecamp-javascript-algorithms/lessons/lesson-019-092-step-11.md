---
id: lesson-019-092
title: Step 11
chapterId: chapter-19
order: 92
duration: 5
objectives:
  - Step 11
---

# Step 11

You can also assign the value of a variable to another variable. For example:

```js
let first = "One";
let second = "Two";
second = first;
```

The `second` variable would now have the value `"One"`.

To see this in action, change your `secondCharacter` assignment from `"Test"` to your `character` variable.

Then open the console to see what gets logged.

## Starter Code

```html
let character = 'Hello';
console.log(character);
character = "World";
let secondCharacter;
--fcc-editable-region--
secondCharacter = "Test";
--fcc-editable-region--
console.log(secondCharacter);
```

## Hints

1. You should not assign the value `"Test"` to your `secondCharacter` variable.
2. You should assign the value of the `character` variable to your `secondCharacter` variable. Don't forget your semicolon.
3. Your `secondCharacter` variable should now have the value `"World"`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610b9f7619764fad5fd516d*
