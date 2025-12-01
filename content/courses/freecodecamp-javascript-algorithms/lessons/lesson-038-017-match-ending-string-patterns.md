---
id: lesson-038-017
title: Match Ending String Patterns
chapterId: chapter-38
order: 17
duration: 5
objectives:
  - Match Ending String Patterns
---

# Match Ending String Patterns

In the last challenge, you learned to use the caret character to search for patterns at the beginning of strings. There is also a way to search for patterns at the end of strings.

You can search the end of strings using the dollar sign character `$` at the end of the regex.

```js
let theEnding = "This is a never ending story";
let storyRegex = /story$/;
storyRegex.test(theEnding);
let noEnding = "Sometimes a story will have to end";
storyRegex.test(noEnding);
```

The first `test` call would return `true`, while the second would return `false`.

## Instructions

Use the anchor character (`$`) to match the string `caboose` at the end of the string `caboose`.

## Starter Code

```html
let caboose = "The last car on a train is the caboose";
let lastRegex = /change/; // Change this line
let result = lastRegex.test(caboose);
```

## Hints

1. You should search for `caboose` with the dollar sign `$` anchor in your regex.
2. Your regex should not use any flags.
3. You should match `caboose` at the end of the string `The last car on a train is the caboose`

## Solution

```html
```js
let caboose = "The last car on a train is the caboose";
let lastRegex = /caboose$/; // Change this line
let result = lastRegex.test(caboose);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db7367417b2b2512b9e*
