---
id: lesson-002-016
title: Repeat a String Repeat a String
chapterId: chapter-02
order: 16
duration: 5
objectives:
  - Repeat a String Repeat a String
---

# Repeat a String Repeat a String

Repeat a given string `str` (first argument) for `num` times (second argument). Return an empty string if `num` is not a positive number. For the purpose of this challenge, do _not_ use the built-in `.repeat()` method.

## Starter Code

```html
function repeatStringNumTimes(str, num) {
  return str;
}

repeatStringNumTimes('abc', 3);
```

## Hints

1. `repeatStringNumTimes("*", 3)` should return the string `***`.
2. `repeatStringNumTimes("abc", 3)` should return the string `abcabcabc`.
3. `repeatStringNumTimes("abc", 4)` should return the string `abcabcabcabc`.
4. `repeatStringNumTimes("abc", 1)` should return the string `abc`.
5. `repeatStringNumTimes("*", 8)` should return the string `********`.
6. `repeatStringNumTimes("abc", -2)` should return an empty string (`""`).
7. The built-in `repeat()` method should not be used.
8. `repeatStringNumTimes("abc", 0)` should return `""`.

## Solution

```html
```js
function repeatStringNumTimes(str, num) {
  if (num < 1) return '';
  return num === 1 ? str : str + repeatStringNumTimes(str, num - 1);
}

repeatStringNumTimes('abc', 3);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: afcc8d540bea9ea2669306b6*
