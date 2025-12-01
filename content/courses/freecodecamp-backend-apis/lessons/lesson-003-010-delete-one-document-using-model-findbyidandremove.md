---
id: lesson-003-010
title: Delete One Document Using model.findByIdAndRemove
chapterId: chapter-03
order: 10
duration: 5
objectives:
  - Delete One Document Using model.findByIdAndRemove
---

# Delete One Document Using model.findByIdAndRemove

`findByIdAndRemove` and `findOneAndRemove` are like the previous update methods. They pass the removed document to the db. As usual, use the function argument `personId` as the search key.

## Instructions

Modify the `removeById` function to delete one person by the person's `_id`. You should use one of the methods `findByIdAndRemove()` or `findOneAndRemove()`.

## Hints

1. Deleting an item should succeed

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb8367417b2b2512c10*
