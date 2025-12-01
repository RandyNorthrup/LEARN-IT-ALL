---
id: lesson-001-014
title: Implementation of Social Authentication II
chapterId: chapter-01
order: 14
duration: 5
objectives:
  - Implementation of Social Authentication II
---

# Implementation of Social Authentication II

The last part of setting up your GitHub authentication is to create the strategy itself. `passport-github@~1.1.0` has already been added as a dependency, so require it in your `auth.js` file as `GitHubStrategy` like this: `const GitHubStrategy = require('passport-github').Strategy;`. Do not forget to require and configure `dotenv` to use your environment variables.

To set up the GitHub strategy, you have to tell Passport to use an instantiated `GitHubStrategy`, which accepts 2 arguments: an object (containing `clientID`, `clientSecret`, and `callbackURL`) and a function to be called when a user is successfully authenticated, which will determine if the user is new and what fields to save initially in the user's database object. This is common across many strategies, but some may require more information as outlined in that specific strategy's GitHub README. For example, Google requires a *scope* as well which determines what kind of information your request is asking to be returned and asks the user to approve such access.

The current strategy you are implementing authenticates users using a GitHub account and OAuth 2.0 tokens. The client ID and secret obtained when creating an application are supplied as options when creating the strategy. The strategy also requires a `verify` callback, which receives the access token and optional refresh token, as well as `profile` which contains the authenticated user's GitHub profile. The `verify` callback must call `cb` providing a user to complete authentication.

Here's how your new strategy should look at this point:

```js
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: /*INSERT CALLBACK URL ENTERED INTO GITHUB HERE*/
},
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    //Database logic here with callback containing your user object
  }
));
```

Your authentication won't be successful yet, and it will actually throw an error without the database logic and callback, but it should log your GitHub profile to your console if you try it!

Submit your page when you think you've got it right. If you're running into errors, you can <a href="https://forum.freecodecamp.org/t/advanced-node-and-express/567135#implementation-of-social-authentication-ii-4" target="_blank" rel="noopener noreferrer nofollow">check out the project completed up to this point</a>.

## Hints

1. `passport-github` dependency should be added.
2. `passport-github` should be required.
3. GitHub strategy should be setup correctly thus far.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 589a69f5f9fc0f352b528e71*
