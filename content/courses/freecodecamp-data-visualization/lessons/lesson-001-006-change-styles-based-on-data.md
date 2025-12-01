---
id: lesson-001-006
title: Change Styles Based on Data
chapterId: chapter-01
order: 6
duration: 5
objectives:
  - Change Styles Based on Data
---

# Change Styles Based on Data

D3 is about visualization and presentation of data. It's likely you'll want to change the styling of elements based on the data.
For example, you may want to color a data point blue if it has a value less than 20, and red otherwise. You can use a callback function in the `style()` method and include the conditional logic. The callback function uses the `d` parameter to represent the data point:

```js
selection.style('color', d => {});
```

The `style()` method is not limited to setting the `color` - it can be used with other CSS properties as well.

## Instructions

Add the `style()` method to the code in the editor to set the `color` of the `h2` elements conditionally. Write the callback function so if the data value is less than 20, it returns red, otherwise it returns green.

**Note:** You can use if-else logic, or the ternary operator.

## Starter Code

```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select('body')
      .selectAll('h2')
      .data(dataset)
      .enter()
      .append('h2')
      .text(d => d + ' USD');
    // Add your code below this line

    // Add your code above this line
  </script>
</body>
```

## Hints

1. The first `h2` should have a `color` of red.
2. The second `h2` should have a `color` of green.
3. The third `h2` should have a `color` of green.
4. The fourth `h2` should have a `color` of red.
5. The fifth `h2` should have a `color` of green.
6. The sixth `h2` should have a `color` of red.
7. The seventh `h2` should have a `color` of green.
8. The eighth `h2` should have a `color` of red.
9. The ninth `h2` should have a `color` of red.

## Solution

```html
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    d3.select('body')
      .selectAll('h2')
      .data(dataset)
      .enter()
      .append('h2')
      .text(d => d + ' USD')
      .style('color', d => (d < 20 ? 'red' : 'green'));
  </script>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7fa7367417b2b2512bc7*
