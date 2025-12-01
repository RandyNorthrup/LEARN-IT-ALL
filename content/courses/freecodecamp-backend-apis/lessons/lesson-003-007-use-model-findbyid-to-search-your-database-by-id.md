---
id: lesson-003-007
title: Use model.findById() to Search Your Database By _id
chapterId: chapter-03
order: 7
duration: 5
objectives:
  - Use model.findById() to Search Your Database By _id
---

# Use model.findById() to Search Your Database By _id

When saving a document, MongoDB automatically adds the field `_id`, and set it to a unique alphanumeric key. Searching by `_id` is an extremely frequent operation, so Mongoose provides a dedicated method for it.

## Instructions

Modify the `findPersonById` to find the only person having a given `_id`, using `Model.findById() -> Person`. Use the function argument `personId` as the search key.

## Hints

1. Find an item by Id should succeed

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb7367417b2b2512c0d*
