---
id: lesson-005-002
title: Understanding the Differences between the freeCodeCamp and Browser Console
chapterId: chapter-05
order: 2
duration: 5
objectives:
  - Understanding the Differences between the freeCodeCamp and Browser Console
---

# Understanding the Differences between the freeCodeCamp and Browser Console

You may have noticed that some freeCodeCamp challenges include their own console. This console behaves a little differently than the browser console.

There are many methods to use with `console` to output messages. `log`, `warn`, and `clear` to name a few. The freeCodeCamp console will only output `log` messages, while the browser console will output all messages. When you make changes to your code, it will automatically run and show the logs. The freeCodeCamp console is then cleared each time your code runs.

## Instructions

First, open your browser console so you can see the logs. To do that, you can right-click the freeCodeCamp navigation bar at the top and click `inspect` on most browsers. Then find the `console` tab in the window that opens.

After that, use `console.log` to log the `output` variable. View the two consoles to see the log. Finally, use `console.clear` after your log to clear the browser console. View the difference in the two consoles.

## Starter Code

```html
let output = "Get this to show once in the freeCodeCamp console and not at all in the browser console";
```

## Hints

1. You should use `console.log()` to print the `output` variable.
2. You should use `console.clear()` to clear the browser console.
3. You should clear the console after your log.

## Solution

```html
```js
let output = "Get this to show once in the freeCodeCamp console and not at all in the browser console";

console.log(output);
console.clear();
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b83367417b2b2512b37*
