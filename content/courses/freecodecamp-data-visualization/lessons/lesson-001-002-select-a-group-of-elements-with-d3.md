---
id: lesson-001-002
title: Select a Group of Elements with D3
chapterId: chapter-01
order: 2
duration: 5
objectives:
  - Select a Group of Elements with D3
---

# Select a Group of Elements with D3

D3 also has the `selectAll()` method to select a group of elements. It returns an array of HTML nodes for all the items in the document that match the input string. Here's an example to select all the anchor tags in a document:

```js
const anchors = d3.selectAll('a');
```

Like the `select()` method, `selectAll()` supports method chaining, and you can use it with other methods.

## Instructions

Select all of the `li` tags in the document, and change their text to the string `list item` by chaining the `.text()` method.

## Starter Code

```html
<body>
  <ul>
    <li>Example</li>
    <li>Example</li>
    <li>Example</li>
  </ul>
  <script>
    // Add your code below this line



    // Add your code above this line
  </script>
</body>
```

## Hints

1. There should be 3 `li` elements on the page, and the text in each one should say `list item`. Capitalization and spacing should match exactly.
2. Your code should access the `d3` object.
3. Your code should use the `selectAll` method.

## Solution

```html
```html
<body>
  <ul>
    <li>Example</li>
    <li>Example</li>
    <li>Example</li>
  </ul>
  <script>
    d3.selectAll('li').text('list item');
  </script>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7fa6367417b2b2512bc3*
