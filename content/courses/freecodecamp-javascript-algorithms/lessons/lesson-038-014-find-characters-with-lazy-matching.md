---
id: lesson-038-014
title: Find Characters with Lazy Matching
chapterId: chapter-38
order: 14
duration: 5
objectives:
  - Find Characters with Lazy Matching
---

# Find Characters with Lazy Matching

In regular expressions, a <dfn>greedy</dfn> match finds the longest possible part of a string that fits the regex pattern and returns it as a match. The alternative is called a <dfn>lazy</dfn> match, which finds the smallest possible part of the string that satisfies the regex pattern.

You can apply the regex `/t[a-z]*i/` to the string `"titanic"`. This regex is basically a pattern that starts with `t`, ends with `i`, and has some letters in between.

Regular expressions are by default greedy, so the match would return `["titani"]`. It finds the largest sub-string possible to fit the pattern.

However, you can use the `?` character to change it to lazy matching. `"titanic"` matched against the adjusted regex of `/t[a-z]*?i/` returns `["ti"]`.

**Note:** Parsing HTML with regular expressions should be avoided, but pattern matching an HTML string with regular expressions is completely fine.

## Instructions

Fix the regex `/<.*>/` to return the HTML tag `<h1>` and not the text `"<h1>Winter is coming</h1>"`. Remember the wildcard `.` in a regular expression matches any character.

## Starter Code

```html
let text = "<h1>Winter is coming</h1>";
let myRegex = /<.*>/; // Change this line
let result = text.match(myRegex);
```

## Hints

1. The `result` variable should be an array with `<h1>` in it
2. `myRegex` should use lazy matching
3. `myRegex` should not include the string `h1`

## Solution

```html
```js
let text = "<h1>Winter is coming</h1>";
let myRegex = /<.*?>/; // Change this line
let result = text.match(myRegex);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7db6367417b2b2512b9b*
