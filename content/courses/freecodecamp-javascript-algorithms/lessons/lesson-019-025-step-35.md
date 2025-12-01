---
id: lesson-019-025
title: Step 35
chapterId: chapter-19
order: 25
duration: 5
objectives:
  - Step 35
---

# Step 35

The <dfn>condition</dfn> of a `for` loop tells the loop how many times it should iterate. When the `condition` becomes false, the loop will stop.

In JavaScript, a Boolean value can be either `true` or `false`. These are not strings - you will learn more about the difference later on.

For now, you will use the <dfn>less than</dfn> operator (`<`). This allows you to check if the value on the left is less than the value on the right. For example, `count < 3` would evaluate to `true` if `count` is `2`, and `false` if `count` is `4`.

Replace your `"condition"` string with a condition to check if `i` is less than `count`.

## Starter Code

```html
const character = "#";
const count = 8;
const rows = [];

--fcc-editable-region--
for (let i = 0; "condition"; "iteration") {

}
--fcc-editable-region--
```

## Hints

1. You should use the less than operator.
2. You should use the less than operator to check if `i` is less than `count`.
3. Your `for` loop should use `i < count` as the condition.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 660f1a00ac619ddc1e259a66*
