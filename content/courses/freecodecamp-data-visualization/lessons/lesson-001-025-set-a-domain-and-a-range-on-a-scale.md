---
id: lesson-001-025
title: Set a Domain and a Range on a Scale
chapterId: chapter-01
order: 25
duration: 5
objectives:
  - Set a Domain and a Range on a Scale
---

# Set a Domain and a Range on a Scale

By default, scales use the identity relationship. This means the input value maps to the output value. However, scales can be much more flexible and interesting.

Say a dataset has values ranging from 50 to 480. This is the input information for a scale, also known as the <dfn>domain</dfn>.

You want to map those points along the `x` axis on the SVG, between 10 units and 500 units. This is the output information, also known as the <dfn>range</dfn>.

The `domain()` and `range()` methods set these values for the scale. Both methods take an array of at least two elements as an argument. Here's an example:

```js
scale.domain([50, 480]);
scale.range([10, 500]);
scale(50);
scale(480);
scale(325);
scale(750);
d3.scaleLinear();
```

In order, the following values would be displayed in the console: `10`, `500`, `323.37`, and `807.67`.

Notice that the scale uses the linear relationship between the domain and range values to figure out what the output should be for a given number. The minimum value in the domain (50) maps to the minimum value (10) in the range.

## Instructions

Create a scale and set its domain to `[250, 500]` and range to `[10, 150]`.

**Note:** You can chain the `domain()` and `range()` methods onto the `scale` variable.

## Starter Code

```html
<body>
  <script>
    // Add your code below this line
    const scale = d3.scaleLinear();



    // Add your code above this line
    const output = scale(50);
    d3.select('body').append('h2').text(output);
  </script>
</body>
```

## Hints

1. Your code should use the `domain()` method.
2. The `domain()` of the `scale` should be set to `[250, 500]`.
3. Your code should use the `range()` method.
4. The `range()` of the `scale` should be set to `[10, 150]`.
5. The text in the `h2` should be `-102`.

## Solution

```html
```html
<body>
  <script>
    const scale = d3.scaleLinear();
    scale.domain([250, 500]);
    scale.range([10, 150]);
    const output = scale(50);
    d3.select('body').append('h2').text(output);
  </script>
</body>
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/data-visualization/)*
*Original Challenge ID: 587d7fac367417b2b2512bdb*
