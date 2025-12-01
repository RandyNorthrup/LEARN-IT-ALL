---
id: lesson-008-020
title: Missing letters
chapterId: chapter-08
order: 20
duration: 5
objectives:
  - Missing letters
---

# Missing letters

Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return `undefined`.

## Starter Code

```html
function fearNotLetter(str) {
  return str;
}

fearNotLetter("abce");
```

## Hints

1. `fearNotLetter("abce")` should return the string `d`.
2. `fearNotLetter("abcdefghjklmno")` should return the string `i`.
3. `fearNotLetter("stvwx")` should return the string `u`.
4. `fearNotLetter("bcdf")` should return the string `e`.
5. `fearNotLetter("abcdefghijklmnopqrstuvwxyz")` should return `undefined`.

## Solution

```html
```js
function fearNotLetter (str) {
  for (var i = str.charCodeAt(0); i <= str.charCodeAt(str.length - 1); i++) {
    var letter = String.fromCharCode(i);
    if (str.indexOf(letter) === -1) {
      return letter;
    }
  }

  return undefined;
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: af7588ade1100bde429baf20*
