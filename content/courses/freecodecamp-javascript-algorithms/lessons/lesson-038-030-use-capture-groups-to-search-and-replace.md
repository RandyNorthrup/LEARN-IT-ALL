---
id: lesson-038-030
title: Use Capture Groups to Search and Replace
chapterId: chapter-38
order: 30
duration: 5
objectives:
  - Use Capture Groups to Search and Replace
---

# Use Capture Groups to Search and Replace

Searching is useful. However, you can make searching even more powerful when it also changes (or replaces) the text you match.

You can search and replace text in a string using `.replace()` on a string. The inputs for `.replace()` is first the regex pattern you want to search for. The second parameter is the string to replace the match or a function to do something.

```js
let wrongText = "The sky is silver.";
let silverRegex = /silver/;
wrongText.replace(silverRegex, "blue");
```

The `replace` call would return the string `The sky is blue.`.

You can also access capture groups in the replacement string with dollar signs (`$`).

```js
"Code Camp".replace(/(\w+)\s(\w+)/, '$2 $1');
```

The `replace` call would return the string `Camp Code`.

## Instructions

Write a regex `fixRegex` using three capture groups that will search for each word in the string `one two three`. Then update the `replaceText` variable to replace `one two three` with the string `three two one` and assign the result to the `result` variable. Make sure you are utilizing capture groups in the replacement string using the dollar sign (`$`) syntax.

## Starter Code

```html
let str = "one two three";
let fixRegex = /change/; // Change this line
let replaceText = ""; // Change this line
let result = str.replace(fixRegex, replaceText);
```

## Hints

1. You should use `.replace()` to search and replace.
2. Your regex should change the string `one two three` to the string `three two one`
3. You should not change the last line.
4. `fixRegex` should use at least three capture groups.
5. `replaceText` should use parenthesized submatch string(s) (i.e. the nth parenthesized submatch string, $n, corresponds to the nth capture group).

## Solution

```html
```js
let str = "one two three";
let fixRegex = /(\w+) (\w+) (\w+)/g; // Change this line
let replaceText = "$3 $2 $1"; // Change this line
let result = str.replace(fixRegex, replaceText);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7dbb367417b2b2512bab*
