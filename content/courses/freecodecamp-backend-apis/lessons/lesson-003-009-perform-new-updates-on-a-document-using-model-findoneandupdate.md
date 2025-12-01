---
id: lesson-003-009
title: Perform New Updates on a Document Using model.findOneAndUpdate()
chapterId: chapter-03
order: 9
duration: 5
objectives:
  - Perform New Updates on a Document Using model.findOneAndUpdate()
---

# Perform New Updates on a Document Using model.findOneAndUpdate()

Recent versions of Mongoose have methods to simplify documents updating. Some more advanced features (i.e. pre/post hooks, validation) behave differently with this approach, so the classic method is still useful in many situations. `findByIdAndUpdate()` can be used when searching by id.

## Instructions

Modify the `findAndUpdate` function to find a person by `Name` and set the person's age to `20`. Use the function parameter `personName` as the search key.

**Note:** You should return the updated document. To do that, you need to pass the options document `{ new: true }` as the 3rd argument to `findOneAndUpdate()`. By default, these methods return the unmodified object.

## Hints

1. findOneAndUpdate an item should succeed

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb8367417b2b2512c0f*
