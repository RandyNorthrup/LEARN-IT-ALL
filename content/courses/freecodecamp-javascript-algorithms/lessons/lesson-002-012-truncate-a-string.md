---
id: lesson-002-012
title: Truncate a String
chapterId: chapter-02
order: 12
duration: 5
objectives:
  - Truncate a String
---

# Truncate a String

Truncate a string (first argument) if it is longer than the given maximum string length (second argument). Return the truncated string with a `...` ending.

## Starter Code

```html
function truncateString(str, num) {
  return str;
}

truncateString('A-tisket a-tasket A green and yellow basket', 8);
```

## Hints

1. `truncateString("A-tisket a-tasket A green and yellow basket", 8)` should return the string `A-tisket...`.
2. `truncateString("Peter Piper picked a peck of pickled peppers", 11)` should return the string `Peter Piper...`.
3. `truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length)` should return the string `A-tisket a-tasket A green and yellow basket`.
4. `truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length + 2)` should return the string `A-tisket a-tasket A green and yellow basket`.
5. `truncateString("A-", 1)` should return the string `A...`.
6. `truncateString("Absolutely Longer", 2)` should return the string `Ab...`.

## Solution

```html
```js
function truncateString(str, num) {
  if (num >= str.length) {
    return str;
  }

  return str.slice(0, num) + '...';
}

truncateString('A-tisket a-tasket A green and yellow basket', 8);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: ac6993d51946422351508a41*
