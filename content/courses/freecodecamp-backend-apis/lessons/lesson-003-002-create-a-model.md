---
id: lesson-003-002
title: Create a Model
chapterId: chapter-03
order: 2
duration: 5
objectives:
  - Create a Model
---

# Create a Model

**C**RUD Part I - CREATE

First of all, we need a Schema. Each schema maps to a MongoDB collection. It defines the shape of the documents within that collection. Schemas are building blocks for Models. They can be nested to create complex models, but in this case, we'll keep things simple. A model allows you to create instances of your objects, called documents.

In servers, the interactions with the database happen in handler functions. These functions are executed when some event happens (e.g. someone hits an endpoint on your API). We'll follow the same approach in these exercises. The `done()` function is a callback that tells us that we can proceed after completing an asynchronous operation such as inserting, searching, updating, or deleting. It's following the Node convention, and should be called as `done(null, data)` on success, or `done(err)` on error.

Warning - When interacting with remote services, errors may occur!

```js
/* Example */

const someFunc = function(done) {
  //... do something (risky) ...
  if (error) return done(error);
  done(null, result);
};
```

## Instructions

Create a person schema called `personSchema` with the following shape:

* A required `name` field of type `String`
* An `age` field of type `Number`
* A `favoriteFoods` field of type `[String]`

Use the Mongoose basic schema types. If you want you can also add more fields, use simple validators like required or unique, and set default values. See our <a href="https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/" target="_blank" rel="noopener noreferrer nofollow">Mongoose article</a>.

Now, create a model from the `personSchema` and assign it to the existing variable `Person`.

## Hints

1. Creating an instance from a mongoose schema should succeed

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb6367417b2b2512c07*
