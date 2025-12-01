---
id: lesson-002-011
title: Title Case a Sentence
chapterId: chapter-02
order: 11
duration: 5
objectives:
  - Title Case a Sentence
---

# Title Case a Sentence

Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.

For the purpose of this exercise, you should also capitalize connecting words like `the` and `of`.

## Starter Code

```html
function titleCase(str) {
  return str;
}

titleCase("I'm a little tea pot");
```

## Hints

1. `titleCase("I'm a little tea pot")` should return a string.
2. `titleCase("I'm a little tea pot")` should return the string `I'm A Little Tea Pot`.
3. `titleCase("sHoRt AnD sToUt")` should return the string `Short And Stout`.
4. `titleCase("HERE IS MY HANDLE HERE IS MY SPOUT")` should return the string `Here Is My Handle Here Is My Spout`.

## Solution

```html
```js
function titleCase(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .join(' ');
}

titleCase("I'm a little tea pot");
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: ab6137d4e35944e21037b769*
