---
id: lesson-008-012
title: Convert HTML Entities
chapterId: chapter-08
order: 12
duration: 5
objectives:
  - Convert HTML Entities
---

# Convert HTML Entities

Convert the characters `&`, `<`, `>`, `"` (double quote), and `'` (apostrophe), in a string to their corresponding HTML entities.

## Starter Code

```html
function convertHTML(str) {
  return str;
}

convertHTML("Dolce & Gabbana");
```

## Hints

1. `convertHTML("Dolce & Gabbana")` should return the string `Dolce &amp; Gabbana`.
2. `convertHTML("Hamburgers < Pizza < Tacos")` should return the string `Hamburgers &lt; Pizza &lt; Tacos`.
3. `convertHTML("Sixty > twelve")` should return the string `Sixty &gt; twelve`.
4. `convertHTML('Stuff in "quotation marks"')` should return the string `Stuff in &quot;quotation marks&quot;`.
5. `convertHTML("Schindler's List")` should return the string `Schindler&apos;s List`.
6. `convertHTML("<>")` should return the string `&lt;&gt;`.
7. `convertHTML("abc")` should return the string `abc`.

## Solution

```html
```js
var MAP = { '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&apos;'};

function convertHTML(str) {
  return str.replace(/[&<>"']/g, function(c) {
    return MAP[c];
  });
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a6b0bb188d873cb2c8729495*
