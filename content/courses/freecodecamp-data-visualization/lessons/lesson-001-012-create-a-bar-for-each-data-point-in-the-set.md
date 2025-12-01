---
id: lesson-001-012
title: Create a Bar for Each Data Point in the Set
chapterId: chapter-01
order: 12
duration: 5
objectives:
  - Create a Bar for Each Data Point in the Set
---

# Create a Bar for Each Data Point in the Set

The last challenge added only one rectangle to the `svg` element to represent a bar. Here, you'll combine what you've learned so far about `data()`, `enter()`, and SVG shapes to create and append a rectangle for each data point in `dataset`.

A previous challenge showed the format for how to create and append a `div` for each item in `dataset`:

```js
d3.select('body')?.selectAll('div').data(dataset).enter().append('div');
```

There are a few differences working with `rect` elements instead of `div` elements. The `rect` elements must be appended to an `svg` element, not directly to the `body`. Also, you need to tell D3 where to place each `rect` within the `svg` area. The bar placement will be covered in the next challenge.

## Instructions

Use the `data()`, `enter()`, and `append()` methods to create and append a `rect` for each item in `dataset`. The bars should display all on top of each other; this will be fixed in the next challenge.

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
      // Add your code below this line

      // Add your code above this line
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 25)
      .attr('height', 100);
  </script>
</body>
```

## Hints

1. Your document should have 9 `rect` elements.
2. Your code should use the `data()` method.
3. Your code should use the `enter()` method.
4. Your code should use the `append()` method.

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
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 25)
      .attr('height', 100);
  </script>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7fa8367417b2b2512bcd*
