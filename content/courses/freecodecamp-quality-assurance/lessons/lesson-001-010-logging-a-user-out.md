---
id: lesson-001-010
title: Logging a User Out
chapterId: chapter-01
order: 10
duration: 5
objectives:
  - Logging a User Out
---

# Logging a User Out

Creating the logout logic is easy. The route should just unauthenticate the user, and redirect to the home page instead of rendering any view.

In passport, unauthenticating a user is as easy as just calling `req.logout()` before redirecting. Add this `/logout` route to do that:

```js
app.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
});
```

You may have noticed that you are not handling missing pages (404). The common way to handle this in Node is with the following middleware. Go ahead and add this in after all your other routes:

```js
app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
});
```

Submit your page when you think you've got it right. If you're running into errors, you can <a href="https://forum.freecodecamp.org/t/advanced-node-and-express/567135#logging-a-user-out-10" target="_blank" rel="noopener noreferrer nofollow">check out the project completed up to this point</a>.

## Hints

1. `req.logout()` should be called in your `/logout` route.
2. `/logout` should redirect to the home page.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 58965611f9fc0f352b528e6c*
