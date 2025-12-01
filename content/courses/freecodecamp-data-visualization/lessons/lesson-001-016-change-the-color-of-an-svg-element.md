---
id: lesson-001-016
title: Change the Color of an SVG Element
chapterId: chapter-01
order: 16
duration: 5
objectives:
  - Change the Color of an SVG Element
---

# Change the Color of an SVG Element

The bars are in the right position, but they are all the same black color. SVG has a way to change the color of the bars.

In SVG, a `rect` shape is colored with the `fill` attribute. It supports hex codes, color names, and rgb values, as well as more complex options like gradients and transparency.

## Instructions

Add an `attr()` method to set the `fill` of all the bars to the color navy.

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
      .attr('y', (d, i) => h - 3 * d)
      .attr('width', 25)
      .attr('height', (d, i) => 3 * d);
    // Add your code below this line



    // Add your code above this line
  </script>
</body>
```

## Hints

1. The bars should all have a `fill` color of navy.

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
      .attr('y', (d, i) => h - 3 * d)
      .attr('width', 25)
      .attr('height', (d, i) => 3 * d)
      .attr('fill', 'navy');
  </script>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7fa9367417b2b2512bd1*
