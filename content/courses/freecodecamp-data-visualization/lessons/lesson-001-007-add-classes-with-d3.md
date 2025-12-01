---
id: lesson-001-007
title: Add Classes with D3
chapterId: chapter-01
order: 7
duration: 5
objectives:
  - Add Classes with D3
---

# Add Classes with D3

Using a lot of inline styles on HTML elements gets hard to manage, even for smaller apps. It's easier to add a class to elements and style that class one time using CSS rules. D3 has the `attr()` method to add any HTML attribute to an element, including a class name.

The `attr()` method works the same way that `style()` does. It takes comma-separated values, and can use a callback function. Here's an example to add a class of `container` to a selection:

```js
selection.attr('class', 'container');
```

Note that the `class` parameter will remain the same whenever you need to add a class and only the `container` parameter will change.

## Instructions

Add the `attr()` method to the code in the editor and put a class of `bar` on the `div` elements.

## Starter Code

```html
<style>
  .bar {
    width: 25px;
    height: 100px;
    display: inline-block;
    background-color: blue;
  }
</style>
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select('body')?.selectAll('div').data(dataset).enter().append('div');
    // Add your code below this line



    // Add your code above this line
  </script>
</body>
```

## Hints

1. Your `div` elements should have a class of `bar`.
2. Your code should use the `attr()` method.

## Solution

```html
```html
<style>
  .bar {
    width: 25px;
    height: 100px;
    display: inline-block;
    background-color: blue;
  }
</style>
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select('body')
      .selectAll('div')
      .data(dataset)
      .enter()
      .append('div')
      // Add your code below this line
      .attr('class', 'bar');
    // Add your code above this line
  </script>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7fa7367417b2b2512bc8*
