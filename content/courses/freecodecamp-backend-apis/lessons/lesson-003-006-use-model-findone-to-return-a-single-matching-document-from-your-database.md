---
id: lesson-003-006
title: Use model.findOne() to Return a Single Matching Document from Your Database
chapterId: chapter-03
order: 6
duration: 5
objectives:
  - Use model.findOne() to Return a Single Matching Document from Your Database
---

# Use model.findOne() to Return a Single Matching Document from Your Database

`Model.findOne()` behaves like `Model.find()`, but it returns only one document (not an array), even if there are multiple items. It is especially useful when searching by properties that you have declared as unique.

## Instructions

Modify the `findOneByFood` function to find just one person which has a certain food in the person's favorites, using `Model.findOne() -> Person`. Use the function argument `food` as search key.

## Hints

1. Find one item should succeed

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb7367417b2b2512c0c*
