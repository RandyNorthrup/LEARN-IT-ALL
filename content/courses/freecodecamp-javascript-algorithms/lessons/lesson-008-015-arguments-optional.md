---
id: lesson-008-015
title: Arguments Optional
chapterId: chapter-08
order: 15
duration: 5
objectives:
  - Arguments Optional
---

# Arguments Optional

Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, `addTogether(2, 3)` should return `5`, and `addTogether(2)` should return a function.

Calling this returned function with a single argument will then return the sum:

```js
var sumTwoAnd = addTogether(2);
```

`sumTwoAnd(3)` returns `5`.

If either argument isn't a valid number, return undefined.

## Starter Code

```html
function addTogether() {
  return false;
}

addTogether(2,3);
```

## Hints

1. `addTogether(2, 3)` should return 5.
2. `addTogether(23.4, 30)` should return 53.4.
3. `addTogether("2", 3)` should return `undefined`.
4. `addTogether(5, undefined)` should return `undefined`.
5. `addTogether("https://www.youtube.com/watch?v=dQw4w9WgXcQ")` should return `undefined`.
6. `addTogether(5)` should return a function.
7. `addTogether(5)(7)` should return 12.
8. `addTogether(2)([3])` should return `undefined`.
9. `addTogether(2, "3")` should return `undefined`.

## Solution

```html
```js
function addTogether() {
  const first = arguments[0];
  if (typeof(first) !== 'number') {
    return undefined;
  }
  if (arguments.length === 1) {
    return function(second) {
      if (typeof(second) !== 'number') {
        return undefined;
      }
      return first + second;
    };
  }
  const second = arguments[1];
  if (typeof(second) !== 'number') {
    return undefined;
  }
  return first + second;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a97fd23d9b809dac9921074f*
