---
id: lesson-001-014
title: Dynamically Change the Height of Each Bar
chapterId: chapter-01
order: 14
duration: 5
objectives:
  - Dynamically Change the Height of Each Bar
---

# Dynamically Change the Height of Each Bar

The height of each bar can be set to the value of the data point in the array, similar to how the `x` value was set dynamically.

```js
selection.attr('property', (d, i) => {});
```

Here `d` would be the data point value, and `i` would be the index of the data point in the array.

## Instructions

Change the callback function for the `height` attribute to return the data value times 3.

**Note:** Remember that multiplying all data points by the same constant scales the data (like zooming in). It helps to see the differences between bar values in this example.

## Starter Code

```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    const w = 500;
    const h = 100;

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 30)
      .attr('y', 0)
      .attr('width', 25)
      .attr('height', (d, i) => {
        // Add your code below this line


        
        
        // Add your code above this line
      });
  </script>
</body>
```

## Hints

1. The first `rect` should have a `height` of `36`.
2. The second `rect` should have a `height` of `93`.
3. The third `rect` should have a `height` of `66`.
4. The fourth `rect` should have a `height` of `51`.
5. The fifth `rect` should have a `height` of `75`.
6. The sixth `rect` should have a `height` of `54`.
7. The seventh `rect` should have a `height` of `87`.
8. The eighth `rect` should have a `height` of `42`.
9. The ninth `rect` should have a `height` of `27`.

## Solution

```html
```html
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    const w = 500;
    const h = 100;

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 30)
      .attr('y', 0)
      .attr('width', 25)
      .attr('height', (d, i) => {
        return d * 3;
      });
  </script>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7fa9367417b2b2512bcf*
