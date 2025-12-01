---
id: lesson-038-006
title: Find More Than the First Match
chapterId: chapter-38
order: 6
duration: 5
objectives:
  - Find More Than the First Match
---

# Find More Than the First Match

So far, you have only been able to extract or search a pattern once.

```js
let testStr = "Repeat, Repeat, Repeat";
let ourRegex = /Repeat/;
testStr.match(ourRegex);
```

Here `match` would return `["Repeat"]`.

To search or extract a pattern more than once, you can use the global search flag: `g`.

```js
let repeatRegex = /Repeat/g;
testStr.match(repeatRegex);
```

And here `match` returns the value `["Repeat", "Repeat", "Repeat"]`

## Instructions

Using the regex `starRegex`, find and extract both `Twinkle` words from the string `twinkleStar`.

**Note**  
You can have multiple flags on your regex like `/search/gi`

## Starter Code

```html
let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /change/; // Change this line
let result = twinkleStar; // Change this line
```

## Hints

1. Your regex `starRegex` should use the global flag `g`
2. Your regex `starRegex` should use the case insensitive flag `i`
3. Your match should match both occurrences of the word `Twinkle`
4. Your match `result` should have two elements in it.

## Solution

```html
```js
let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /twinkle/gi;
let result = twinkleStar.match(starRegex);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db4367417b2b2512b93*
