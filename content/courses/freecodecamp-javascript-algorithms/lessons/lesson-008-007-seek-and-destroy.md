---
id: lesson-008-007
title: Seek and Destroy
chapterId: chapter-08
order: 7
duration: 5
objectives:
  - Seek and Destroy
---

# Seek and Destroy

You will be provided with an initial array as the first argument to the `destroyer` function, followed by one or more arguments. Remove all elements from the initial array that are of the same value as these arguments.

The function must accept an indeterminate number of arguments, also known as a variadic function. You can access the additional arguments by adding a rest parameter to the function definition or using the `arguments` object.

## Starter Code

```html
function destroyer(arr) {
  return arr;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
```

## Hints

1. `destroyer([1, 2, 3, 1, 2, 3], 2, 3)` should return `[1, 1]`.
2. `destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3)` should return `[1, 5, 1]`.
3. `destroyer([3, 5, 1, 2, 2], 2, 3, 5)` should return `[1]`.
4. `destroyer([2, 3, 2, 3], 2, 3)` should return `[]`.
5. `destroyer(["tree", "hamburger", 53], "tree", 53)` should return `["hamburger"]`.
6. `destroyer(["possum", "trollo", 12, "safari", "hotdog", 92, 65, "grandma", "bugati", "trojan", "yacht"], "yacht", "possum", "trollo", "safari", "hotdog", "grandma", "bugati", "trojan")` should return `[12,92,65]`.

## Solution

```html
```js
function destroyer(arr) {
  var hash = Object.create(null);
  [].slice.call(arguments, 1).forEach(function(e) {
    hash[e] = true;
  });
  return arr.filter(function(e) { return !(e in hash);});
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a39963a4c10bc8b4d4f06d7e*
