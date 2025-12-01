---
id: lesson-036-006
title: The Cascade of CSS Lesson F
chapterId: chapter-36
order: 6
duration: 5
objectives:
  - The Cascade of CSS Lesson F
---

# The Cascade of CSS Lesson F

```css
/* rule 1 */
.class.second-class {
  font-size: 12px;
}

/* rule 2 */
.class .second-class {
  font-size: 24px;
}
```

Here both rule 1 and rule 2 have the same specificity. Rule 1 uses a chaining selector (no space) and rule 2 uses a descendant combinator (the empty space). But both rules have two classes and the combinator symbol itself does not add to the specificity.

```css
/* rule 1 */
.class.second-class {
  font-size: 12px;
}
/* rule 2 */
.class > .second-class {
  font-size: 24px;
}
```

This example shows the same thing. Even though rule 2 is using a child combinator (`>`), this does not change the specificity value. Both rules still have two classes so they have the same specificity values.

*Note:* Not everything adds to specificity

When comparing selectors, you may come across special symbols for the universal selector (`*`) as well as combinators (`+`, `~`, `>`, and an empty space). These symbols do not add any specificity in and of themselves.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6489cf6782cf2e4f86f03ae7*
