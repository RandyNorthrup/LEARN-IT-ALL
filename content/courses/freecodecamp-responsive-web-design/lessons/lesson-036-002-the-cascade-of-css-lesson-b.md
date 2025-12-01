---
id: lesson-036-002
title: The Cascade of CSS Lesson B
chapterId: chapter-36
order: 2
duration: 5
objectives:
  - The Cascade of CSS Lesson B
---

# The Cascade of CSS Lesson B

A CSS declaration that is more specific will take precedence over less specific ones. Inline styles, which you went over in a previous lesson, have the highest specificity compared to selectors, while each type of selector has its own specificity level that contributes to how specific a declaration is. Other selectors contribute to specificity, but you're focusing only on the ones you’ve gone over so far:

1. ID selectors (most specific selector)
2. Class selectors
3. Type selectors

Specificity will only be taken into account when an element has multiple, conflicting declarations targeting it, sort of like a tie-breaker. An ID selector will always beat any number of class selectors, a class selector will always beat any number of type selectors, and a type selector will always beat any number of anything less specific than it. When no declaration has a selector with a higher specificity, a larger amount of a single selector will beat a smaller amount of that same selector.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design/)*
*Original Challenge ID: 6489c96782cf2e4f86f03ae2*
