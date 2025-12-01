---
id: lesson-003-004
title: Create Many Records with model.create()
chapterId: chapter-03
order: 4
duration: 5
objectives:
  - Create Many Records with model.create()
---

# Create Many Records with model.create()

Sometimes you need to create many instances of your models, e.g. when seeding a database with initial data. `Model.create()` takes an array of objects like `[{name: 'John', ...}, {...}, ...]` as the first argument, and saves them all in the db.

## Instructions

Modify the `createManyPeople` function to create many people using `Model.create()` with the argument `arrayOfPeople`.

**Note:** You can reuse the model you instantiated in the previous exercise.

## Hints

1. Creating many db items at once should succeed

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb7367417b2b2512c0a*
