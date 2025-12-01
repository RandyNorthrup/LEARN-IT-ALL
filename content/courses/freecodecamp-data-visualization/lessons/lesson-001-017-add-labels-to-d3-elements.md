---
id: lesson-001-017
title: Add Labels to D3 Elements
chapterId: chapter-01
order: 17
duration: 5
objectives:
  - Add Labels to D3 Elements
---

# Add Labels to D3 Elements

D3 lets you label a graph element, such as a bar, using the SVG `text` element.

Like the `rect` element, a `text` element needs to have `x` and `y` attributes, to place it on the SVG. It also needs to access the data to display those values.

D3 gives you a high level of control over how you label your bars.

## Instructions

The code in the editor already binds the data to each new `text` element. First, append `text` nodes to the `svg`. Next, add attributes for the `x` and `y` coordinates. They should be calculated the same way as the `rect` ones, except the `y` value for the `text` should make the label sit 3 units higher than the bar. Finally, use the D3 `text()` method to set the label equal to the data point value.

**Note:** For the label to sit higher than the bar, decide if the `y` value for the `text` should be 3 greater or 3 less than the `y` value for the bar.

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
      .attr('height', (d, i) => 3 * d)
      .attr('fill', 'navy');

    svg.selectAll('text').data(dataset).enter();
    // Add your code below this line




    // Add your code above this line
  </script>
  <body></body>
</body>
```

## Hints

1. The first `text` element should have a label of `12` and a `y` value of `61`.
2. The second `text` element should have a label of `31` and a `y` value of `4`.
3. The third `text` element should have a label of `22` and a `y` value of `31`.
4. The fourth `text` element should have a label of `17` and a `y` value of `46`.
5. The fifth `text` element should have a label of `25` and a `y` value of `22`.
6. The sixth `text` element should have a label of `18` and a `y` value of `43`.
7. The seventh `text` element should have a label of `29` and a `y` value of `10`.
8. The eighth `text` element should have a label of `14` and a `y` value of `55`.
9. The ninth `text` element should have a label of `9` and a `y` value of `70`.

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

    svg
      .selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 30)
      .attr('y', (d, i) => h - 3 * d - 3)
      .text(d => d);
  </script>
  <body></body>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7faa367417b2b2512bd2*
