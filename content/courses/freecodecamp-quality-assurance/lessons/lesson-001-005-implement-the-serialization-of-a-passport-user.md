---
id: lesson-001-005
title: Implement the Serialization of a Passport User
chapterId: chapter-01
order: 5
duration: 5
objectives:
  - Implement the Serialization of a Passport User
---

# Implement the Serialization of a Passport User

You are not loading an actual user object since the database is not set up. Connect to the database once, when you start the server, and keep a persistent connection for the full life-cycle of the app. To do this, add your database's connection string (for example: `mongodb+srv://<username>:<password>@cluster0-jvwxi.mongodb.net/?retryWrites=true&w=majority`) to the environment variable `MONGO_URI`. This is used in the `connection.js` file.

*If you are having issues setting up a free database on MongoDB Atlas, check out this <a href="https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/" target="_blank" rel="noopener noreferrer nofollow">tutorial</a>.*

Now you want to connect to your database, then start listening for requests. The purpose of this is to not allow requests before your database is connected or if there is a database error. To accomplish this, encompass your serialization and app routes in the following code:

```javascript
myDB(async client => {
  const myDataBase = await client.db('database').collection('users');

  // Be sure to change the title
  app.route('/').get((req, res) => {
    // Change the response to render the Pug template
    res.render('index', {
      title: 'Connected to Database',
      message: 'Please login'
    });
  });

  // Serialization and deserialization here...

  // Be sure to add this...
}).catch(e => {
  app.route('/').get((req, res) => {
    res.render('index', { title: e, message: 'Unable to connect to database' });
  });
});
// app.listen out here...
```

Be sure to uncomment the `myDataBase` code in `deserializeUser`, and edit your `done(null, null)` to include the `doc`.

Submit your page when you think you've got it right. If you're running into errors, you can <a href="https://forum.freecodecamp.org/t/advanced-node-and-express/567135#implement-the-serialization-of-a-passport-user-5" target="_blank" rel="noopener noreferrer nofollow">check out the project completed up to this point</a>.

## Hints

1. Database connection should be present.
2. Deserialization should now be correctly using the DB and `done(null, null)` should be called with the `doc`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 5895f70cf9fc0f352b528e67*
