---
id: lesson-003-008
title: Perform Classic Updates by Running Find, Edit, then Save
chapterId: chapter-03
order: 8
duration: 5
objectives:
  - Perform Classic Updates by Running Find, Edit, then Save
---

# Perform Classic Updates by Running Find, Edit, then Save

In the good old days, this was what you needed to do if you wanted to edit a document, and be able to use it somehow (e.g. sending it back in a server response). Mongoose has a dedicated updating method: `Model.update()`. It is bound to the low-level mongo driver. It can bulk-edit many documents matching certain criteria, but it doesn’t send back the updated document, only a 'status' message. Furthermore, it makes model validations difficult, because it just directly calls the mongo driver.

## Instructions

Modify the `findEditThenSave` function to find a person by `_id` (use any of the above methods) with the parameter `personId` as search key. Add `"hamburger"` to the list of the person's `favoriteFoods` (you can use `Array.push()`). Then - inside the find callback - `save()` the updated `Person`.

**Note:** This may be tricky, if in your Schema, you declared `favoriteFoods` as an Array, without specifying the type (i.e. `[String]`). In that case, `favoriteFoods` defaults to Mixed type, and you have to manually mark it as edited using `document.markModified('edited-field')`. See our <a href="https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/" target="_blank" rel="noopener noreferrer nofollow">Mongoose article</a>.

## Hints

1. Find-edit-update an item should succeed

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb8367417b2b2512c0e*
