---
id: lesson-001-023
title: Add Labels to Scatter Plot Circles
chapterId: chapter-01
order: 23
duration: 5
objectives:
  - Add Labels to Scatter Plot Circles
---

# Add Labels to Scatter Plot Circles

You can add text to create labels for the points in a scatter plot.

The goal is to display the comma-separated values for the first (`x`) and second (`y`) fields of each item in `dataset`.

The `text` nodes need `x` and `y` attributes to position it on the SVG. In this challenge, the `y` value (which determines height) can use the same value that the `circle` uses for its `cy` attribute. The `x` value can be slightly larger than the `cx` value of the `circle`, so the label is visible. This will push the label to the right of the plotted point.

## Instructions

Label each point on the scatter plot using the `text` elements. The text of the label should be the two values separated by a comma and a space. For example, the label for the first point is `34, 78`. Set the `x` attribute so it's `5` units more than the value you used for the `cx` attribute on the `circle`. Set the `y` attribute the same way that's used for the `cy` value on the `circle`.

## Starter Code

```html
<body>
  <script>
    const dataset = [
      [34, 78],
      [109, 280],
      [310, 120],
      [79, 411],
      [420, 220],
      [233, 145],
      [333, 96],
      [222, 333],
      [78, 320],
      [21, 123]
    ];

    const w = 500;
    const h = 500;

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => d[0])
      .attr('cy', (d, i) => h - d[1])
      .attr('r', 5);

    svg.selectAll('text').data(dataset).enter().append('text');
    // Add your code below this line



    // Add your code above this line
  </script>
</body>
```

## Hints

1. Your code should have 10 `text` elements.
2. The first label should have text of `34, 78`, an `x` value of `39`, and a `y` value of `422`.
3. The second label should have text of `109, 280`, an `x` value of `114`, and a `y` value of `220`.
4. The third label should have text of `310, 120`, an `x` value of `315`, and a `y` value of `380`.
5. The fourth label should have text of `79, 411`, an `x` value of `84`, and a `y` value of `89`.
6. The fifth label should have text of `420, 220`, an `x` value of `425`, and a `y` value of `280`.
7. The sixth label should have text of `233, 145`, an `x` value of `238`, and a `y` value of `355`.
8. The seventh label should have text of `333, 96`, an `x` value of `338`, and a `y` value of `404`.
9. The eighth label should have text of `222, 333`, an `x` value of `227`, and a `y` value of `167`.
10. The ninth label should have text of `78, 320`, an `x` value of `83`, and a `y` value of `180`.
11. The tenth label should have text of `21, 123`, an `x` value of `26`, and a `y` value of `377`.

## Solution

```html
```html
<body>
  <script>
    const dataset = [
      [34, 78],
      [109, 280],
      [310, 120],
      [79, 411],
      [420, 220],
      [233, 145],
      [333, 96],
      [222, 333],
      [78, 320],
      [21, 123]
    ];

    const w = 500;
    const h = 500;

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => d[0])
      .attr('cy', (d, i) => h - d[1])
      .attr('r', 5);

    svg
      .selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .attr('x', d => d[0] + 5)
      .attr('y', d => h - d[1])
      .text(d => d[0] + ', ' + d[1]);
  </script>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7fab367417b2b2512bd9*
