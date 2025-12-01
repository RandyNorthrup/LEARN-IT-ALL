---
id: lesson-019-091
title: Step 10
chapterId: chapter-19
order: 91
duration: 5
objectives:
  - Step 10
---

# Step 10

The default value of an uninitialized variable is `undefined`. This is a special data type that represents a value that does not have a definition yet.

You can still assign a value to an uninitialized variable. Here is an example:

```js
let uninitialized;
uninitialized = "assigned";
```

Assign the string `"Test"` to your `secondCharacter` variable below your declaration. Open the console to see how your log has changed.

## Starter Code

```html
--fcc-editable-region--
let character = 'Hello';
console.log(character);
character = "World";
let secondCharacter;

console.log(secondCharacter);
--fcc-editable-region--
```

## Hints

1. You should not initialize `secondCharacter`. Remember that initialization means assigning a value when you declare the variable.
2. You should use the assignment operator on `secondCharacter`.
3. You should assign the string `"Test"` to your `secondCharacter` variable.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6610b8f6a98d25f4d485a94d*
