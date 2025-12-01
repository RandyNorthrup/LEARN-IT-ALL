---
id: lesson-001-003
title: Set up Passport
chapterId: chapter-01
order: 3
duration: 5
objectives:
  - Set up Passport
---

# Set up Passport

It's time to set up *Passport* so you can finally start allowing a user to register or log in to an account. In addition to Passport, you will use Express-session to handle sessions. Express-session has a ton of advanced features you can use, but for now you are just going to use the basics. Using this middleware saves the session id as a cookie in the client, and allows us to access the session data using that id on the server. This way, you keep personal account information out of the cookie used by the client to tell to your server clients are authenticated and keep the *key* to access the data stored on the server.

`passport@~0.4.1` and `express-session@~1.17.1` are already installed, and are both listed as dependencies in your `package.json` file.

You will need to set up the session settings and initialize Passport. First, create the variables `session` and `passport` to require `express-session` and `passport` respectively.

Then, set up your Express app to use the session by defining the following options:

```javascript
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
```

Be sure to add `SESSION_SECRET` to your `.env` file, and give it a random value. This is used to compute the hash used to encrypt your cookie!

After you do all that, tell your express app to **use** `passport.initialize()` and `passport.session()`.

Submit your page when you think you've got it right. If you're running into errors, you can <a href="https://forum.freecodecamp.org/t/advanced-node-and-express/567135#set-up-passport-3" target="_blank" rel="noopener noreferrer nofollow">check out the project completed up to this point</a>.

## Hints

1. Passport and Express-session should be dependencies.
2. Dependencies should be correctly required.
3. Express app should use new dependencies.
4. Session and session secret should be correctly set up.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 5895f70cf9fc0f352b528e65*
