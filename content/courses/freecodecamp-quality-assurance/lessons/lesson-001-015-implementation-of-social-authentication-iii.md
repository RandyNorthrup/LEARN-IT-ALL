---
id: lesson-001-015
title: Implementation of Social Authentication III
chapterId: chapter-01
order: 15
duration: 5
objectives:
  - Implementation of Social Authentication III
---

# Implementation of Social Authentication III

The final part of the strategy is handling the profile returned from GitHub. We need to load the user's database object if it exists, or create one if it doesn't, and populate the fields from the profile, then return the user's object. GitHub supplies us a unique *id* within each profile which we can use to search with to serialize the user with (already implemented). Below is an example implementation you can use in your project--it goes within the function that is the second argument for the new strategy, right below where `console.log(profile);` currently is:

```js
myDataBase.findOneAndUpdate(
  { id: profile.id },
  {
    $setOnInsert: {
      id: profile.id,
      username: profile.username,
      name: profile.displayName || 'John Doe',
      photo: profile.photos[0].value || '',
      email: Array.isArray(profile.emails)
        ? profile.emails[0].value
        : 'No public email',
      created_on: new Date(),
      provider: profile.provider || ''
    },
    $set: {
      last_login: new Date()
    },
    $inc: {
      login_count: 1
    }
  },
  { upsert: true, new: true },
  (err, doc) => {
    return cb(null, doc.value);
  }
);
```

`findOneAndUpdate` allows you to search for an object and update it. If the object doesn't exist, it will be inserted and made available to the callback function. In this example, we always set `last_login`, increment the `login_count` by `1`, and only populate the majority of the fields when a new object (new user) is inserted. Notice the use of default values. Sometimes a profile returned won't have all the information filled out or the user will keep it private. In this case, you handle it to prevent an error.

You should be able to login to your app now. Try it!

Submit your page when you think you've got it right. If you're running into errors, you can <a href="https://forum.freecodecamp.org/t/advanced-node-and-express/567135#implementation-of-social-authentication-iii-5" target="_blank" rel="noopener noreferrer nofollow">check out the project completed up to this point</a>.

## Hints

1. GitHub strategy setup should be complete.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 589a8eb3f9fc0f352b528e72*
