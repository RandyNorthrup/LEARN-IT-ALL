---
id: lesson-001-008
title: Update the Height of an Element Dynamically
chapterId: chapter-01
order: 8
duration: 5
objectives:
  - Update the Height of an Element Dynamically
---

# Update the Height of an Element Dynamically

The previous challenges covered how to display data from an array and how to add CSS classes. You can combine these lessons to create a simple bar chart. There are two steps to this:

1. Create a `div` for each data point in the array

2. Give each `div` a dynamic height, using a callback function in the `style()` method that sets height equal to the data value

Recall the format to set a style using a callback function:

```js
selection.style('cssProperty', d => d);
```

## Instructions

Add the `style()` method to the code in the editor to set the `height` property for each element. Use a callback function to return the value of the data point with the string `px` added to it.

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

    d3.select('body')
      .selectAll('div')
      .data(dataset)
      .enter()
      .append('div')
      .attr('class', 'bar');
    // Add your code below this line



    // Add your code above this line
  </script>
</body>
```

## Hints

1. The first `div` should have a `height` of `12` pixels.
2. The second `div` should have a `height` of `31` pixels.
3. The third `div` should have a `height` of `22` pixels.
4. The fourth `div` should have a `height` of `17` pixels.
5. The fifth `div` should have a `height` of `25` pixels.
6. The sixth `div` should have a `height` of `18` pixels.
7. The seventh `div` should have a `height` of `29` pixels.
8. The eighth `div` should have a `height` of `14` pixels.
9. The ninth `div` should have a `height` of `9` pixels.

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
      .attr('class', 'bar')
      .style('height', d => `${d}px`);
  </script>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7fa8367417b2b2512bc9*
