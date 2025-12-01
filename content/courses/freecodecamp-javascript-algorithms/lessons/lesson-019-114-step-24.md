---
id: lesson-019-114
title: Step 24
chapterId: chapter-19
order: 114
duration: 5
objectives:
  - Step 24
---

# Step 24

In the last few steps, you learned all about working with arrays. Take a moment to review what you have learned.

Start by declaring a `cities` variable and initializing it as an array of the strings `"London"`, `"New York"`, and `"Mumbai"`. Then log that variable to the console.

After logging, change the last element of `cities` to the string `"Mexico City"`, then log the `cities` variable again.

When done correctly, you should see this output in the console.

```js
[ "London", "New York", "Mumbai" ]
[ "London", "New York", "Mexico City" ]
```

## Starter Code

```html
let character = 'Hello';
let count = 8;
let rows = ["Naomi", "Quincy", "CamperChan"];
--fcc-editable-region--

--fcc-editable-region--
console.log(rows);
```

## Hints

1. You should use `let` to declare a `cities` variable.
2. You should assign an array of the strings `"London"`, `"New York"`, and `"Mumbai"` to the `cities` variable.
3. You should use `console.log()` to log the entire `cities` array to the console.
4. You should update the last element of the `cities` array to the string `"Mexico City"`. Remember that you can access the last element of an array using `array[array.length - 1]`.
5. You should have two `console.log(cities)` statements in your code.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 665732da4815b70bb083915e*
