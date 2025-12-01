---
id: lesson-005-006
title: Catch Mixed Usage of Single and Double Quotes
chapterId: chapter-05
order: 6
duration: 5
objectives:
  - Catch Mixed Usage of Single and Double Quotes
---

# Catch Mixed Usage of Single and Double Quotes

JavaScript allows the use of both single (`'`) and double (`"`) quotes to declare a string. Deciding which one to use generally comes down to personal preference, with some exceptions.

Having two choices is great when a string has contractions or another piece of text that's in quotes. Just be careful that you don't close the string too early, which causes a syntax error.

Here are some examples of mixing quotes:

```js
const grouchoContraction = "I've had a perfectly wonderful evening, but this wasn't it.";
const quoteInString = "Groucho Marx once said 'Quote me as saying I was mis-quoted.'";
const uhOhGroucho = 'I've had a perfectly wonderful evening, but this wasn't it.';
```

The first two are correct, but the third is incorrect.

Of course, it is okay to use only one style of quotes. You can escape the quotes inside the string by using the backslash (`\`) escape character:

```js
const allSameQuotes = 'I\'ve had a perfectly wonderful evening, but this wasn\'t it.';
```

## Instructions

Fix the string so it either uses different quotes for the `href` value, or escape the existing ones. Keep the double quote marks around the entire string.

## Starter Code

```html
let innerHtml = "<p>Click here to <a href="#Home">return home</a></p>";
console.log(innerHtml);
```

## Hints

1. Your code should fix the quotes around the `href` value `#Home` by either changing or escaping them.
2. Your code should keep the double quotes around the entire string.

## Solution

```html
```js
let innerHtml = "<p>Click here to <a href=\"#Home\">return home</a></p>";
console.log(innerHtml);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 587d7b84367417b2b2512b37*
