---
id: lesson-001-019
title: Add a Hover Effect to a D3 Element
chapterId: chapter-01
order: 19
duration: 5
objectives:
  - Add a Hover Effect to a D3 Element
---

# Add a Hover Effect to a D3 Element

It's possible to add effects that highlight a bar when the user hovers over it with the mouse. So far, the styling for the rectangles is applied with the built-in D3 and SVG methods, but you can use CSS as well.

You set the CSS class on the SVG elements with the `attr()` method. Then the `:hover` pseudo-class for your new class holds the style rules for any hover effects.

## Instructions

Use the `attr()` method to add a class of `bar` to all the `rect` elements. This changes the `fill` color of the bar to brown when you mouse over it.

## Starter Code

```html
<style>
  .bar:hover {
    fill: brown;
  }
</style>
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
    // Add your code below this line



    // Add your code above this line

    svg
      .selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => i * 30)
      .attr('y', (d, i) => h - 3 * d - 3);
  </script>
</body>
```

## Hints

1. Your `rect` elements should have a class of `bar`.

## Solution

```html
```html
<style>
  .bar:hover {
    fill: brown;
  }
</style>
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
      .attr('fill', 'navy')
    // Add your code below this line
      .attr('class', 'bar');
    // Add your code above this line

    svg
      .selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => i * 30)
      .attr('y', (d, i) => h - 3 * d - 3);
  </script>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7faa367417b2b2512bd4*
