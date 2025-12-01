---
id: lesson-002-005
title: Find the Longest Word in a String
chapterId: chapter-02
order: 5
duration: 5
objectives:
  - Find the Longest Word in a String
---

# Find the Longest Word in a String

Return the length of the longest word in the provided sentence.

Your response should be a number.

## Starter Code

```html
function findLongestWordLength(str) {
  return str.length;
}

findLongestWordLength('The quick brown fox jumped over the lazy dog');
```

## Hints

1. `findLongestWordLength("The quick brown fox jumped over the lazy dog")` should return a number.
2. `findLongestWordLength("The quick brown fox jumped over the lazy dog")` should return `6`.
3. `findLongestWordLength("May the force be with you")` should return `5`.
4. `findLongestWordLength("Google do a barrel roll")` should return `6`.
5. `findLongestWordLength("What is the average airspeed velocity of an unladen swallow")` should return `8`.
6. `findLongestWordLength("What if we try a super-long word such as otorhinolaryngology")` should return `19`.

## Solution

```html
```js
function findLongestWordLength(str) {
  return str.split(' ').sort((a, b) => b.length - a.length)[0].length;
}

findLongestWordLength('The quick brown fox jumped over the lazy dog');
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a26cbbe9ad8655a977e1ceb5*
