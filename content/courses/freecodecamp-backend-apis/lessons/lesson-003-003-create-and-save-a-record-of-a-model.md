---
id: lesson-003-003
title: Create and Save a Record of a Model
chapterId: chapter-03
order: 3
duration: 5
objectives:
  - Create and Save a Record of a Model
---

# Create and Save a Record of a Model

In this challenge you will have to create and save a record of a model.

## Instructions

Within the `createAndSavePerson` function, create a document instance using the `Person` model constructor you built before. Pass to the constructor an object having the fields `name`, `age`, and `favoriteFoods`. Their types must conform to the ones in the `personSchema`. Then, call the method `document.save()` on the returned document instance. Pass to it a callback using the Node convention. This is a common pattern; all the following CRUD methods take a callback function like this as the last argument.

```js
/* Example */

// ...
person.save(function(err, data) {
  //   ...do your stuff here...
});
```

## Hints

1. Creating and saving a db item should succeed

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb6367417b2b2512c09*
