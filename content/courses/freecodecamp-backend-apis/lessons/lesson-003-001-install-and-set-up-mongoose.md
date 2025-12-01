---
id: lesson-003-001
title: Install and Set Up Mongoose
chapterId: chapter-03
order: 1
duration: 5
objectives:
  - Install and Set Up Mongoose
---

# Install and Set Up Mongoose

Working on these challenges will involve you writing your code using one of the following methods:

- Clone <a href="https://github.com/freeCodeCamp/boilerplate-mongomongoose/" target="_blank" rel="noopener noreferrer nofollow">this GitHub repo</a> and complete these challenges locally.
- Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.

In this challenge, you will set up a MongoDB Atlas database and import the required packages to connect to it.

Follow <a href='https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/' target="_blank" rel="noopener noreferrer nofollow">this tutorial</a> to set up a hosted database on MongoDB Atlas.

## Instructions

`mongoose@^5.11.15` has been added to your project’s `package.json` file. First, require mongoose as `mongoose` in `myApp.js`. Next, create a `.env` file and add a `MONGO_URI` variable to it. Its value should be your MongoDB Atlas database URI. Be sure to surround the URI with single or double quotes, and remember that you can't use spaces around the `=` in environment variables. For example, `MONGO_URI='VALUE'`.

When you are done, connect to the database by calling the `connect` method within your `myApp.js` file by using the following syntax:

```js
mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true });
```

## Hints

1. "mongoose version ^5.11.15" dependency should be in package.json
2. "mongoose" should be connected to a database

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/)*
*Original Challenge ID: 587d7fb6367417b2b2512c06*
